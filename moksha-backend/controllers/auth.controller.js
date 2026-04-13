const Admin = require("../models/Admin.model");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service");

const sendTokenResponse = (admin, statusCode, res) => {
  const token = admin.getSignedJwtToken();
  const refreshToken = admin.getRefreshToken();

  admin.refreshTokens = admin.refreshTokens || [];
  admin.refreshTokens.push(refreshToken);

  if (admin.refreshTokens.length > 5) {
    admin.refreshTokens = admin.refreshTokens.slice(-5);
  }
  admin.lastLogin = new Date();
  admin.save({ validateBeforeSave: false });

  res.status(statusCode).json({
    success: true,
    token,
    refreshToken,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      avatar: admin.avatar,
    },
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }

    const admin = await Admin.findOne({ email }).select(
      "+password +refreshTokens",
    );

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (!admin.isActive) {
      return res
        .status(401)
        .json({ success: false, message: "Account has been deactivated" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    sendTokenResponse(admin, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide name, email and password",
        });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }
    const user = await User.create({ name, email, password });
    const token = user.getSignedJwtToken();
    res
      .status(201)
      .json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (err) {
    next(err);
  }
};

exports.requestOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: "Guest",
        email,
        password: Math.random().toString(36).slice(-8),
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();
    emailService.sendOtpEmail(email, otp).catch(console.error);
    res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    next(err);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }
    const user = await User.findOne({ email });
    if (
      !user ||
      user.otp !== otp ||
      !user.otpExpires ||
      user.otpExpires < new Date()
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }
    user.otp = "";
    user.otpExpires = null;
    await user.save();
    const token = user.getSignedJwtToken();
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    res.json({
      success: true,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar,
        lastLogin: admin.lastLogin,
        createdAt: admin.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const admin = await Admin.findById(decoded.id).select("+refreshTokens");

    if (!admin || !admin.refreshTokens.includes(refreshToken)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid refresh token" });
    }

    admin.refreshTokens = admin.refreshTokens.filter((t) => t !== refreshToken);
    sendTokenResponse(admin, 200, res);
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired refresh token" });
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const admin = await Admin.findById(req.admin.id).select("+refreshTokens");
    if (admin && refreshToken) {
      admin.refreshTokens = admin.refreshTokens.filter(
        (t) => t !== refreshToken,
      );
      await admin.save({ validateBeforeSave: false });
    }
    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin.id).select("+password");

    if (!(await admin.matchPassword(currentPassword))) {
      return res
        .status(401)
        .json({ success: false, message: "Current password is incorrect" });
    }

    admin.password = newPassword;
    await admin.save();

    sendTokenResponse(admin, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.admin.id,
      { name, avatar },
      { new: true, runValidators: true },
    );
    res.json({ success: true, data: admin });
  } catch (err) {
    next(err);
  }
};
