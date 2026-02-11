"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, Phone, Building } from "lucide-react";

export default function VendorRegisterPage() {
  const [businessName, setBusinessName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [showEmailOtp, setShowEmailOtp] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [tooltip, setTooltip] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showTooltip = (message: any, type: any) => {
    setTooltip({ show: true, message, type });
    setTimeout(() => setTooltip({ show: false, message: "", type: "" }), 3000);
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showTooltip("Passwords do not match", "error");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setShowPhoneOtp(true);
      showTooltip("OTP sent to your phone number", "phone");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneOtpVerify = async () => {
    if (phoneOtp === "") {
      showTooltip("Please enter OTP", "error");
      return;
    }

    if (phoneOtp === "123456") {
      setIsPhoneVerified(true);
      setShowPhoneOtp(false);
      setShowEmailOtp(true);
      showTooltip(
        "Phone verified successfully! OTP sent to your email",
        "success",
      );
    } else {
      showTooltip("Invalid OTP. Please try again", "error");
    }
  };

  const handleEmailOtpVerify = async () => {
    if (emailOtp === "") {
      showTooltip("Please enter OTP", "error");
      return;
    }

    if (emailOtp === "123456") {
      setIsEmailVerified(true);
      showTooltip(
        "Email verified successfully! Registration complete",
        "success",
      );
      setTimeout(() => {
        window.location.href = "/vendorlogin";
      }, 2000);
    } else {
      showTooltip("Invalid OTP. Please try again", "error");
    }
  };

  const handleResendPhoneOtp = () => {
    showTooltip("OTP resent to your phone", "phone");
  };

  const handleResendEmailOtp = () => {
    showTooltip("OTP resent to your email", "email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {tooltip.show && (
            <div
              className={`fixed top-5 right-5 z-50 px-3 py-2 rounded-lg text-xs font-medium shadow-lg ${
                tooltip.type === "phone"
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : tooltip.type === "email"
                    ? "bg-purple-50 text-purple-700 border border-purple-200"
                    : tooltip.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {tooltip.message}
            </div>
          )}

          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8B6A3E]/10 mb-3">
              <Building className="w-5 h-5 text-[#8B6A3E]" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Vendor Registration
            </h2>
            <p className="text-xs text-gray-600">
              Register your business with us
            </p>
          </div>

          {!showPhoneOtp && !showEmailOtp ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Building className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="block w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition"
                    placeholder="Your Business Name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Contact Person Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <User className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition"
                    placeholder="business@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition"
                    placeholder="+91 1234567890"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Lock className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-8 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Lock className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-8 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="vendorTerms"
                  className="h-3 w-3 text-[#8B6A3E] focus:ring-[#8B6A3E] border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="vendorTerms"
                  className="ml-1.5 text-xs text-gray-700"
                >
                  I agree to the{" "}
                  <Link
                    href="/vendor-terms"
                    className="text-[#8B6A3E] hover:underline"
                  >
                    Vendor Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-[#8B6A3E] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-[#8B6A3E] text-white text-sm font-medium rounded-lg hover:bg-[#755735] focus:outline-none focus:ring-1 focus:ring-[#8B6A3E] focus:ring-offset-1 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-1.5 h-3.5 w-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register as Vendor"
                )}
              </button>
            </form>
          ) : showPhoneOtp ? (
            <div className="space-y-4">
              <div className="text-center py-2">
                <Phone className="h-8 w-8 text-[#8B6A3E] mx-auto mb-2" />
                <h3 className="text-sm font-medium text-gray-800">
                  Verify Phone
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  OTP sent to {phone}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </div>

              <button
                onClick={handlePhoneOtpVerify}
                className="w-full py-2 px-4 bg-[#8B6A3E] text-white text-sm font-medium rounded-lg hover:bg-[#755735] focus:outline-none focus:ring-1 focus:ring-[#8B6A3E] focus:ring-offset-1 transition"
              >
                Verify Phone OTP
              </button>

              <p className="text-center text-xs text-gray-600">
                Didn't receive OTP?{" "}
                <button
                  onClick={handleResendPhoneOtp}
                  className="text-[#8B6A3E] hover:underline"
                >
                  Resend
                </button>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-2">
                <Mail className="h-8 w-8 text-[#8B6A3E] mx-auto mb-2" />
                <h3 className="text-sm font-medium text-gray-800">
                  Verify Email
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  OTP sent to {email}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B6A3E] focus:border-[#8B6A3E] focus:outline-none transition"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </div>

              <button
                onClick={handleEmailOtpVerify}
                className="w-full py-2 px-4 bg-[#8B6A3E] text-white text-sm font-medium rounded-lg hover:bg-[#755735] focus:outline-none focus:ring-1 focus:ring-[#8B6A3E] focus:ring-offset-1 transition"
              >
                Verify Email OTP
              </button>

              <p className="text-center text-xs text-gray-600">
                Didn't receive OTP?{" "}
                <button
                  onClick={handleResendEmailOtp}
                  className="text-[#8B6A3E] hover:underline"
                >
                  Resend
                </button>
              </p>
            </div>
          )}

          {!showPhoneOtp && !showEmailOtp && (
            <div className="mt-5 text-center">
              <p className="text-xs text-gray-600">
                Already a vendor?{" "}
                <Link
                  href="/vendorlogin"
                  className="font-medium text-[#8B6A3E] hover:text-[#755735] transition"
                >
                  Vendor Login
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
