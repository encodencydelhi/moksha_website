require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin.model");

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/moksha_voyage";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    const email = "admin@moksha.com";
    const password = "admin123";

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("⚠️  Admin already exists, updating password...");
      existingAdmin.password = password;
      await existingAdmin.save();
      console.log("✅ Admin password updated!");
    } else {
      await Admin.create({
        name: "Moksha Admin",
        email,
        password,
        role: "superadmin"
      });
      console.log("✅ Admin created successfully!");
    }

    console.log("-----------------------------------");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log("-----------------------------------");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    process.exit(1);
  }
};

seedAdmin();
