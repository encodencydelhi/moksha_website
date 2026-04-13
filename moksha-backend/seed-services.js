require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("./models/Service.model");

const services = [
  {
    name: "Ambulance Services",
    slug: "ambulance-services",
    price: 500,
    description:
      "24/7 ambulance services with trained medical staff for emergency transportation",
    category: null,
    features: [
      "Professional medical staff",
      "Fast response time",
      "24/7 availability",
      "Clean and equipped vehicle",
      "Basic life support",
    ],
    icon: "🚑",
    isActive: true,
  },
  {
    name: "Pandit Services",
    slug: "pandit-services",
    price: 1000,
    description:
      "Expert pandit services for all religious ceremonies and rituals",
    category: null,
    features: [
      "Experienced pandits",
      "All ceremonies covered",
      "Vedic mantras",
      "Traditional rituals",
      "Religious guidance",
    ],
    icon: "🙏",
    isActive: true,
  },
  {
    name: "Prayer Hall Services",
    slug: "prayer-hall-services",
    price: 800,
    description: "Professional prayer hall services with complete arrangements",
    category: null,
    features: [
      "Spacious prayer hall",
      "Religious decorations",
      "Sound system",
      "Seating arrangements",
      "Catering options",
    ],
    icon: "⛪",
    isActive: true,
  },
  {
    name: "Funeral Services",
    slug: "funeral-services",
    price: 2000,
    description:
      "Complete funeral and cremation services with dignity and respect",
    category: null,
    features: [
      "Complete arrangements",
      "Experienced staff",
      "Transportation",
      "Documentation help",
      "Post-cremation rituals",
    ],
    icon: "🕯️",
    isActive: true,
  },
  {
    name: "Fural Decoration",
    slug: "fural-decoration",
    price: 1500,
    description:
      "Beautiful and meaningful decoration services for all occasions",
    category: null,
    features: [
      "Custom designs",
      "Fresh flowers",
      "Artistic arrangements",
      "Event coordination",
      "Quick setup",
    ],
    icon: "🌸",
    isActive: true,
  },
  {
    name: "Harsewan Services",
    slug: "harsewan-services",
    price: 1200,
    description: "Traditional Harsewan celebration and arrangement services",
    category: null,
    features: [
      "Traditional setup",
      "Expert coordination",
      "Ritual guidance",
      "Staff assistance",
      "Complete arrangements",
    ],
    icon: "🎉",
    isActive: true,
  },
  {
    name: "Calling Relatives",
    slug: "calling-relatives",
    price: 300,
    description:
      "Help in contacting and notifying your relatives during emergencies",
    category: null,
    features: [
      "Quick notification",
      "Contact management",
      "Message delivery",
      "Emergency support",
      "Available 24/7",
    ],
    icon: "☎️",
    isActive: true,
  },
  {
    name: "Special Services",
    slug: "special-services",
    price: 2500,
    description: "Customized special services tailored to your unique needs",
    category: null,
    features: [
      "Custom packages",
      "Flexible scheduling",
      "Dedicated support",
      "Professional team",
      "Full coordination",
    ],
    icon: "✨",
    isActive: true,
  },
];

async function seedServices() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/moksha",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );

    console.log("✅ MongoDB Connected");

    // Clear existing services
    await Service.deleteMany({});
    console.log("🗑️  Cleared existing services");

    // Insert new services
    const createdServices = await Service.insertMany(services);
    console.log(`✅ Created ${createdServices.length} services`);

    createdServices.forEach((service) => {
      console.log(`  ✓ ${service.name} - ₹${service.price}`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log("✅ Seed completed successfully");
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
}

seedServices();
