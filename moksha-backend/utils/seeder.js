require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin.model");
const Settings = require("../models/Settings.model");
const Component = require("../models/Component.model");
const Service = require("../models/Service.model");
const Blog = require("../models/Blog.model");

exports.seedAdmin = async () => {
  try {
    const exists = await Admin.findOne({
      email: process.env.ADMIN_EMAIL || "admin@mokshavoyage.com",
    });
    if (!exists) {
      await Admin.create({
        name: "Super Admin",
        email: process.env.ADMIN_EMAIL || "admin@mokshavoyage.com",
        password: process.env.ADMIN_PASSWORD || "Admin@123456",
        role: "superadmin",
      });
      console.log(
        "✅ Default admin created:",
        process.env.ADMIN_EMAIL || "admin@mokshavoyage.com",
      );
    }
  } catch (err) {
    console.error("Admin seed error:", err.message);
  }
};

// ─── Seed Settings ────────────────────────────────────────────────────────────
const seedSettings = async () => {
  const exists = await Settings.findOne();
  if (!exists) {
    await Settings.create({
      siteName: "Moksha Voyage",
      siteTagline: "Compassionate End-of-Life Guidance",
      logo: "/assets/logoreal-removebg-preview.png",
      businessAddress:
        "12/52 Sunrise Industrial Area, Mohan Nagar, Ghaziabad - 201007",
      trustedSince: "2005",
      contactEmail: "info@mokshayatra.org",
      contactPhone: "+91 96549 00525",
      whatsappNumber: "919310219283",
      whatsappMessage: "Hello I need information",
      telegramNumber: "9310219283",
      topbarEmail: "info@mokshayatra.org",
      topbarPhone: "+91 96549 00525",
      socialLinks: {
        facebook: "https://www.facebook.com/",
        instagram: "https://www.instagram.com/",
        twitter: "https://twitter.com/",
        linkedin: "https://www.linkedin.com/",
        youtube: "https://www.youtube.com/",
        telegram: "https://t.me/",
      },
      audioPlaylist: [
        { name: "Om Chanting", file: "/audio/om.mp3", isActive: true },
        { name: "Sacred Mantra 1", file: "/audio/no.mp3", isActive: true },
        { name: "Nour", file: "/audio/nour.mp3", isActive: true },
        { name: "Semara", file: "/audio/semara.mp3", isActive: true },
        { name: "Shiv Mantra", file: "/audio/shiv.mp3", isActive: true },
      ],
      footerDescription:
        "Providing respectful guidance with dignity, tradition and care for every family.",
      footerCopyright: `© ${new Date().getFullYear()} Moksha Voyage • All rights reserved`,
      metaTitle: "Moksha Voyage - Compassionate End-of-Life Services",
      metaDescription:
        "Moksha Voyage provides compassionate funeral and end-of-life services across India, including ambulance, pandit, funeral samagri, hearse van and more.",
      metaKeywords:
        "funeral services, moksha, end of life care, pandit, ambulance, hearse van, funeral decoration, prayer hall",
    });
    console.log("✅ Default settings seeded");
  }
};

// ─── Seed Components ──────────────────────────────────────────────────────────
const seedComponents = async () => {
  const keys = await Component.find().distinct("componentKey");

  // Hero
  if (!keys.includes("hero")) {
    await Component.create({
      componentKey: "hero",
      componentType: "hero",
      label: "Hero Section",
      heroHeading: "A Journey Guided by Love",
      heroSubheading: "",
      heroTrustBadge: "TRUSTED SINCE 2005",
      heroSlides: [
        {
          image: "/assets/image.webp",
          mantraTitle: "Morning Mantra",
          mantraSanskrit: "ॐ तत्सत् ब्रह्म",
          mantraHindi: "वह परम सत्य ब्रह्म है",
          audio: "",
          order: 0,
          isActive: true,
        },
        {
          image: "/assets/image3.png",
          mantraTitle: "Evening Mantra",
          mantraSanskrit: "ॐ शान्तिः शान्तिः शान्तिः",
          mantraHindi: "सर्वत्र शांति हो",
          audio: "",
          order: 1,
          isActive: true,
        },
        {
          image: "/assets/im3.jpeg",
          mantraTitle: "Peace Mantra",
          mantraSanskrit: "ॐ नमः शिवाय",
          mantraHindi: "शिव को नमस्कार करते हैं",
          audio: "",
          order: 2,
          isActive: true,
        },
        {
          image: "/assets/im4.jpeg",
          mantraTitle: "Blessing Mantra",
          mantraSanskrit: "ॐ भूर्भुवः स्वः",
          mantraHindi: "गायत्री मंत्र - परमात्मा का आशीर्वाद",
          audio: "",
          order: 3,
          isActive: true,
        },
      ],
    });
    console.log("✅ Hero component seeded");
  }

  if (!keys.includes("compassionsection")) {
    await Component.create({
      componentKey: "compassionsection",
      componentType: "custom",
      label: "Compassion Section",
      sectionTag: "Our Mission",
      sectionTitle: "A Journey Guided by Love",
      sectionSubtitle: "with Peace of Mind",
      sectionDescription:
        "We understand that losing a loved one is one of life's most profound experiences. Moksha Voyage is here to guide you through every step with compassion, dignity, and respect.",
      sectionImage: "/assets/chatgpt.png",
      sectionButtons: [
        { label: "Our Services", href: "#services", variant: "primary" },
        { label: "Contact Us", href: "/contact", variant: "outline" },
      ],
      stats: [
        { label: "Families Served", value: "10,000+", icon: "FaUsers" },
        { label: "Years of Service", value: "20+", icon: "FaClock" },
        { label: "Cities Covered", value: "50+", icon: "FaGlobeAsia" },
        { label: "Expert Team", value: "200+", icon: "FaStar" },
      ],
    });
    console.log("✅ CompassionSection component seeded");
  }

  if (!keys.includes("mantrasection")) {
    await Component.create({
      componentKey: "mantrasection",
      componentType: "custom",
      label: "Mantra / Shloka Section",
      mantras: [
        {
          symbol: "ॐ",
          titleLine1: "श्रीमद्भगवद्गीता",
          titleLine2: "अध्याय 2, श्लोक 20",
          sanskrit:
            "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥",
          hindi:
            "यह आत्मा न तो कभी जन्म लेती है और न ही मरती है। यह न तो कभी उत्पन्न हुई और न होगी। यह अजन्मा, शाश्वत, अविनाशी और अनादि है।",
          meaning: "The soul is eternal and immortal",
          source: "Bhagavad Gita 2.20",
          isActive: true,
          order: 0,
        },
        {
          symbol: "ॐ",
          titleLine1: "मृत्युंजय मंत्र",
          titleLine2: "ऋग्वेद",
          sanskrit:
            "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात्॥",
          hindi:
            "हम त्रिनेत्र भगवान शिव की पूजा करते हैं जो सुगन्धित और सभी का पोषण करने वाले हैं।",
          meaning: "Maha Mrityunjaya Mantra for liberation",
          source: "Rigveda 7.59.12",
          isActive: true,
          order: 1,
        },
      ],
    });
    console.log("✅ Mantra section seeded");
  }

  if (!keys.includes("servingsection")) {
    await Component.create({
      componentKey: "servingsection",
      componentType: "custom",
      label: "Serving Section - Who We Serve",
      sectionTag: "Who We Serve",
      sectionTitle: "Serving Humanity",
      sectionSubtitle: "Beyond Boundaries",
      sectionDescription:
        "Families in India · Global NRI Community · Senior Citizens · Shelter Homes & NGO Partners",
      cards: [
        {
          title: "Families Across India",
          description:
            "Compassionate support for families during their most difficult times.",
          icon: "FaHeart",
          order: 0,
          isActive: true,
        },
        {
          title: "NRI Community",
          description:
            "Special support for Non-Resident Indians managing last rites from abroad.",
          icon: "FaGlobeAsia",
          order: 1,
          isActive: true,
        },
        {
          title: "Senior Citizens",
          description:
            "Dedicated care programs for elderly individuals and their families.",
          icon: "FaPrayingHands",
          order: 2,
          isActive: true,
        },
        {
          title: "NGO Partners",
          description:
            "Collaborating with shelter homes and NGOs to serve all sections of society.",
          icon: "FaUsers",
          order: 3,
          isActive: true,
        },
      ],
      stats: [
        { label: "Families Served", value: "10,000+", icon: "FaUsers" },
        { label: "Years Experience", value: "20+", icon: "FaClock" },
        { label: "5-Star Reviews", value: "4,800+", icon: "FaStar" },
      ],
    });
    console.log("✅ Serving section seeded");
  }

  if (!keys.includes("howwehelp")) {
    await Component.create({
      componentKey: "howwehelp",
      componentType: "card",
      label: "How We Help Section",
      sectionTag: "Our Support",
      sectionTitle: "How We Help",
      sectionSubtitle: "Guiding You Through Every Step",
      cards: [
        {
          title: "Immediate Response",
          description:
            "24/7 availability to assist you the moment you reach out to us.",
          icon: "FaClock",
          order: 0,
          isActive: true,
        },
        {
          title: "Ritual Guidance",
          description:
            "Expert guidance on all Hindu last rites and funeral rituals.",
          icon: "FaPrayingHands",
          order: 1,
          isActive: true,
        },
        {
          title: "Complete Documentation",
          description:
            "Assistance with death certificates and all official paperwork.",
          icon: "FaBookOpen",
          order: 2,
          isActive: true,
        },
        {
          title: "Logistics Support",
          description:
            "Ambulance, hearse van, and transportation arrangements.",
          icon: "FaAmbulance",
          order: 3,
          isActive: true,
        },
        {
          title: "Pandit Services",
          description:
            "Qualified pandits for all rituals, prayers and last rites.",
          icon: "FaHandHoldingHeart",
          order: 4,
          isActive: true,
        },
        {
          title: "Post-Funeral Care",
          description:
            "Support for 13-day rituals and subsequent puja ceremonies.",
          icon: "FaLeaf",
          order: 5,
          isActive: true,
        },
      ],
    });
    console.log("✅ HowWeHelp seeded");
  }

  if (!keys.includes("sacredjourney")) {
    await Component.create({
      componentKey: "sacredjourney",
      componentType: "custom",
      label: "Sacred Journey Section",
      sectionTag: "The Sacred Path",
      sectionTitle: "The Sacred Journey",
      sectionSubtitle: "From This World to the Next",
      sectionDescription:
        "In Hindu tradition, death is not an end but a transition. We honor this sacred passage with the care and reverence it deserves.",
      customData: {
        videoUrl: "",
        videoThumbnail: "/assets/chatgpt.png",
        ctaText: "Learn About Our Process",
        ctaLink: "/about",
      },
    });
    console.log("✅ SacredJourney seeded");
  }

  if (!keys.includes("sideicons")) {
    await Component.create({
      componentKey: "sideicons",
      componentType: "custom",
      label: "Social Sidebar Icons",
      sideIcons: [
        {
          platform: "whatsapp",
          url: "https://wa.me/919310219283?text=Hello%20I%20need%20information",
          color: "#25D366",
          hoverColor: "#20BA57",
          label: "WhatsApp",
          order: 0,
          isActive: true,
        },
        {
          platform: "telegram",
          url: "https://t.me/9310219283",
          color: "#0088cc",
          hoverColor: "#0077B5",
          label: "Telegram",
          order: 1,
          isActive: true,
        },
        {
          platform: "facebook",
          url: "https://www.facebook.com/",
          color: "#1877F2",
          hoverColor: "#0E5FBF",
          label: "Facebook",
          order: 2,
          isActive: true,
        },
        {
          platform: "linkedin",
          url: "https://www.linkedin.com/",
          color: "#0077B5",
          hoverColor: "#005582",
          label: "LinkedIn",
          order: 3,
          isActive: true,
        },
        {
          platform: "youtube",
          url: "https://www.youtube.com/",
          color: "#FF0000",
          hoverColor: "#CC0000",
          label: "YouTube",
          order: 4,
          isActive: true,
        },
      ],
      customData: {
        phoneLink: "tel:+919310219283",
        emailLink: "mailto:info@mokshayatra.org",
        lotusIcon: true,
        emailIcon: true,
      },
    });
    console.log("✅ SideIcons seeded");
  }

  if (!keys.includes("testimonials")) {
    await Component.create({
      componentKey: "testimonials",
      componentType: "testimonial",
      label: "Testimonials",
      testimonials: [
        {
          name: "Rajesh Sharma",
          location: "Delhi",
          review:
            "Moksha Voyage guided us through the most difficult time of our lives with exceptional care and compassion. Their team handled everything perfectly.",
          rating: 5,
          isActive: true,
          order: 0,
        },
        {
          name: "Priya Verma",
          location: "Ghaziabad",
          review:
            "The pandit arranged by Moksha Voyage performed all rituals with complete devotion. We felt our father received the most dignified farewell.",
          rating: 5,
          isActive: true,
          order: 1,
        },
        {
          name: "Suresh Kumar",
          location: "Noida",
          review:
            "Being an NRI, I was worried about managing the last rites from abroad. Moksha Voyage made everything seamless and kept me updated at every step.",
          rating: 5,
          isActive: true,
          order: 2,
        },
      ],
    });
    console.log("✅ Testimonials seeded");
  }

  if (!keys.includes("faqs")) {
    await Component.create({
      componentKey: "faqs",
      componentType: "faq",
      label: "FAQs",
      faqs: [
        {
          question: "What services does Moksha Voyage provide?",
          answer:
            "We provide complete funeral and end-of-life services including ambulance, pandit, funeral samagri, hearse van, funeral decoration, prayer hall, special services, and calling relatives.",
          category: "general",
          order: 0,
          isActive: true,
        },
        {
          question: "Are your services available 24/7?",
          answer:
            "Yes, our team is available 24 hours a day, 7 days a week to assist you during your time of need.",
          category: "general",
          order: 1,
          isActive: true,
        },
        {
          question: "Do you serve NRI families?",
          answer:
            "Yes, we have a dedicated team to help NRI families manage funeral arrangements in India remotely with full coordination and regular updates.",
          category: "nri",
          order: 2,
          isActive: true,
        },
        {
          question: "Which cities do you cover?",
          answer:
            "We primarily serve Delhi NCR including Delhi, Ghaziabad, Noida, Faridabad, and Gurugram. We also have partner networks in over 50 cities across India.",
          category: "general",
          order: 3,
          isActive: true,
        },
        {
          question: "How do I book a service?",
          answer:
            "You can book by calling us at +91 96549 00525, via WhatsApp, or through our contact form. Our team will respond within 30 minutes.",
          category: "booking",
          order: 4,
          isActive: true,
        },
      ],
    });
    console.log("✅ FAQs seeded");
  }
};

const seedServices = async () => {
  const count = await Service.countDocuments();
  if (count > 0) return;

  const services = [
    {
      pageKey: "furalservices",
      title: "Funeral Samagri",
      slug: "furalservices",
      category: "Funeral",
      shortDescription:
        "Complete funeral samagri for all Hindu last rites and rituals",
      heroTitle: "Funeral Samagri Services",
      heroTag: "Complete Ritual Materials",
      heroSubtitle: "Everything you need for a dignified farewell",
      status: "active",
      isPublished: true,
      order: 1,
      heroStats: [
        { label: "Items Available", value: "500+", icon: "FaStar" },
        { label: "Years Experience", value: "20+", icon: "FaClock" },
      ],
      officeLocations: [
        {
          city: "Head Office",
          address: "12/52 Sunrise Industrial Area, Mohan Nagar, Ghaziabad",
          pincode: "201007",
          type: "main",
        },
        {
          city: "Ghaziabad",
          address: "KK-1, Surdas Marg, Sector 17A, Kavi Nagar",
          pincode: "201001",
          type: "branch",
        },
      ],
    },
    {
      pageKey: "ambulanceservices",
      title: "Ambulance Service",
      slug: "ambulanceservices",
      category: "Transportation",
      shortDescription:
        "24/7 ambulance service with trained staff and medical equipment",
      heroTitle: "Ambulance Services",
      heroTag: "24/7 Emergency Response",
      heroSubtitle:
        "Prompt, reliable ambulance services when you need them most",
      status: "active",
      isPublished: true,
      order: 4,
      subServices: [
        {
          name: "Basic Life Support (BLS)",
          description:
            "Fully equipped ambulance with basic life support equipment and trained staff",
          price: "1,999",
          priceNumeric: 1999,
          features: [
            "Oxygen Cylinder",
            "Stretcher",
            "First Aid Kit",
            "Trained Staff",
          ],
          location: "Available 24/7",
          rating: 4.8,
          reviews: 245,
          responseTime: "30 mins",
          isActive: true,
          order: 0,
        },
        {
          name: "Advanced Life Support (ALS)",
          description:
            "ICU on wheels with ventilator, defibrillator, and emergency medications",
          price: "3,999",
          priceNumeric: 3999,
          features: [
            "Ventilator",
            "Defibrillator",
            "Cardiac Monitor",
            "Critical Care Paramedics",
          ],
          location: "Available 24/7",
          rating: 4.9,
          reviews: 189,
          responseTime: "20 mins",
          isActive: true,
          order: 1,
        },
      ],
    },
    {
      pageKey: "panditservices",
      title: "Pandit Service",
      slug: "panditservices",
      category: "Ritual",
      shortDescription:
        "Qualified pandits for all funeral rituals, last rites and prayer ceremonies",
      heroTitle: "Pandit Services",
      heroTag: "Authentic Ritual Guidance",
      heroSubtitle: "Qualified pandits for all Hindu funeral rites",
      status: "active",
      isPublished: true,
      order: 3,
    },
    {
      pageKey: "harsevanservices",
      title: "Hearse Van",
      slug: "harsevanservices",
      category: "Transportation",
      shortDescription:
        "Dignified hearse van services for transportation of the deceased",
      heroTitle: "Hearse Van Services",
      heroTag: "Dignified Transportation",
      heroSubtitle: "Respectful and timely transportation services",
      status: "active",
      isPublished: true,
      order: 5,
    },
    {
      pageKey: "prayerhallservices",
      title: "Prayer Hall",
      slug: "prayerhallservices",
      category: "Venue",
      shortDescription:
        "Well-equipped prayer halls for prayer meetings and antim ardas",
      heroTitle: "Prayer Hall Services",
      heroTag: "Sacred Spaces for Prayer",
      heroSubtitle: "Peaceful prayer halls for your final farewells",
      status: "active",
      isPublished: true,
      order: 6,
    },
    {
      pageKey: "furaldecoration",
      title: "Funeral Decoration",
      slug: "furaldecoration",
      category: "Decoration",
      shortDescription:
        "Beautiful and respectful funeral decoration arrangements",
      heroTitle: "Funeral Decoration Services",
      heroTag: "Dignified Farewell Arrangements",
      heroSubtitle: "Creating a respectful and serene environment",
      status: "active",
      isPublished: true,
      order: 2,
    },
    {
      pageKey: "specialservices",
      title: "Special Services",
      slug: "specialservices",
      category: "Special",
      shortDescription:
        "Specialized end-of-life services tailored to unique requirements",
      heroTitle: "Special Services",
      heroTag: "Customized Care",
      heroSubtitle: "Tailored services for unique needs",
      status: "active",
      isPublished: true,
      order: 7,
    },
    {
      pageKey: "callingrelativesservices",
      title: "Calling Relatives",
      slug: "callingrelativesservices",
      category: "Communication",
      shortDescription:
        "Notification and coordination services to inform relatives and close ones",
      heroTitle: "Calling Relatives Service",
      heroTag: "Seamless Communication",
      heroSubtitle: "We handle notifying your loved ones",
      status: "active",
      isPublished: true,
      order: 8,
    },
  ];

  await Service.insertMany(services);
  console.log("✅ Default services seeded (8 services)");
};

const seedBlogs = async () => {
  const count = await Blog.countDocuments();
  if (count > 0) return;

  await Blog.insertMany([
    {
      title: "Understanding Hindu Funeral Rites: A Complete Guide",
      slug: "understanding-hindu-funeral-rites-complete-guide",
      excerpt:
        "Hindu funeral traditions are rich with meaning and spiritual significance. This guide covers the essential rituals from the moment of passing to the final rites.",
      content:
        "<p>Hindu funeral traditions are rich with meaning and spiritual significance...</p>",
      coverImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      author: "Moksha Voyage Team",
      category: "Rituals",
      tags: ["funeral", "hindu", "rituals"],
      readTime: "8 min read",
      isPublished: true,
      isFeatured: true,
    },
    {
      title: "How to Cope with Grief: A Compassionate Guide",
      slug: "how-to-cope-with-grief-compassionate-guide",
      excerpt:
        "Grief is a deeply personal journey. Learn practical ways to navigate loss with compassion, support, and spiritual guidance.",
      content: "<p>Grief is a deeply personal journey...</p>",
      coverImage:
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800",
      author: "Moksha Voyage Team",
      category: "Wellness",
      tags: ["grief", "healing", "mental health"],
      readTime: "6 min read",
      isPublished: true,
      isFeatured: false,
    },
    {
      title: "Arranging Funeral Services for NRIs: What You Need to Know",
      slug: "funeral-services-nri-guide",
      excerpt:
        "Being abroad during a family member's passing is incredibly difficult. Here's how Moksha Voyage helps NRI families manage everything remotely.",
      content:
        "<p>Being abroad during a family member's passing is incredibly difficult...</p>",
      coverImage:
        "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800",
      author: "Moksha Voyage Team",
      category: "NRI Services",
      tags: ["nri", "funeral", "abroad"],
      readTime: "5 min read",
      isPublished: true,
      isFeatured: false,
    },
  ]);
  console.log("✅ Sample blog posts seeded");
};

const runFullSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding");

    await exports.seedAdmin();
    await seedSettings();
    await seedComponents();
    await seedServices();
    await seedBlogs();

    console.log("\n🌱 Database seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  runFullSeed();
}

// Export individual seeders for server.js auto-run
exports.seedSettings = seedSettings;
exports.seedComponents = seedComponents;
exports.seedServices = seedServices;
