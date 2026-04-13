
require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/moksha";

const CORRECT_NAVBAR = {
  componentKey: "navbar",
  label: "Navbar",
  componentType: "custom",
  brandName: "Moksha Voyage",
  logo: "/assets/logoreal-removebg-preview.png",
  ctaLabel: "Get Support",
  ctaPhone: "+91 1800 123 4567",
  navItems: [
    { name: "Home", path: "/", type: "page", isActive: true, dropdown: [] },
    { name: "About", path: "/about", type: "page", isActive: true, dropdown: [] },
    {
      name: "Services",
      path: "#services",
      type: "dropdown",
      isActive: true,
      dropdown: [
        { name: "Funeral Samagri", path: "/furalservices", isActive: true },
        { name: "Funeral Decoration", path: "/furaldecoration", isActive: true },
        { name: "Pandit Service", path: "/panditservices", isActive: true },
        { name: "Ambulance Service", path: "/ambulanceservices", isActive: true },
        { name: "Hearse Van", path: "/harsevanservices", isActive: true },
        { name: "Prayer Hall", path: "/prayerhallservices", isActive: true },
        { name: "Special Services", path: "/specialservices", isActive: true },
        { name: "Calling Relatives", path: "/callingrelativesservices", isActive: true },
      ],
    },
    { name: "Blog", path: "/blog", type: "page", isActive: true, dropdown: [] },
    {
      name: "Moksha Gallery",
      path: "/mokshagallery",
      type: "dropdown",
      isActive: true,
      dropdown: [
        { name: "Moksha Gallery", path: "/mokshagallery", isActive: true },
        { name: "Moksha Video Gallery", path: "/mokshavediogallery", isActive: true },
      ],
    },
    { name: "Contact", path: "/contact", type: "page", isActive: true, dropdown: [] },
  ],
};

async function resetNavbar() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB Connected");

    const db = mongoose.connection.db;
    const collection = db.collection("components");

    // Delete the old broken navbar document
    const deleteResult = await collection.deleteOne({ componentKey: "navbar" });
    console.log(`🗑️  Deleted old navbar: ${deleteResult.deletedCount} document(s)`);

    // Insert the correct one
    const insertResult = await collection.insertOne(CORRECT_NAVBAR);
    console.log("✅ Correct navbar inserted:", insertResult.acknowledged);
    console.log("🎉 Navbar reset successfully! All dropdowns are restored.");

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

resetNavbar();
