/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║          MOKSHA VOYAGE - COMPLETE DATABASE SEED FILE                ║
 * ║  Seeds: Services, Blog, FAQs, Components (Hero, Footer, etc.)       ║
 * ║  Run: node seed.js                                                  ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */
require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/moksha";

// ─── Models ───────────────────────────────────────────────────────────────────
const Service  = require("./models/Service.model");
const Blog     = require("./models/Blog.model");
const FAQ      = require("./models/FAQ.model");

// ─── SERVICES DATA ────────────────────────────────────────────────────────────
const SERVICES = [
  // ── Funeral Samagri (furalservices) ─────────────────────────────────────────
  {
    name: "Pooja Samagri Kit - Basic",
    slug: "pooja-samagri-kit-basic",
    description: "Complete basic pooja samagri kit for funeral rituals including dhoop, agarbatti, ghee, kapur, and roli.",
    details: "This kit contains all essential items required for the first day of funeral rituals. Includes 500ml pure cow ghee, dhoop sticks, agarbatti, kapur, roli, chawal, kalash, sindoor, and cotton wicks.",
    image: "/assets/image.webp",
    icon: "🪔",
    pageCategory: "funeralsamagri",
    price: 499,
    currency: "INR",
    features: ["Pure Cow Ghee 500ml", "Dhoop Sticks", "Agarbatti Pack", "Kapur", "Roli & Chawal", "Kalash", "Cotton Wicks"],
    isActive: true,
    order: 1,
  },
  {
    name: "Pooja Samagri Kit - Complete",
    slug: "pooja-samagri-kit-complete",
    description: "Full complete samagri kit for 13-day funeral rituals with all puja items, flowers, and ritual materials.",
    details: "This comprehensive kit covers all 13 days of funeral ceremonies. Includes all items from the basic kit plus: flower garlands, tulsi leaves, paan, supari, narial, clothes for the pandit, and special items for antim sanskar.",
    image: "/assets/image.webp",
    icon: "🙏",
    pageCategory: "funeralsamagri",
    price: 2499,
    currency: "INR",
    features: ["All Basic Kit Items", "Flower Garlands (13 days)", "Tulsi & Paan Leaves", "Narial & Supari", "Pandit Vastram", "Antim Sanskar Samaan", "Free Delivery" ],
    isActive: true,
    order: 2,
  },
  {
    name: "Shraddha Samagri Kit",
    slug: "shraddha-samagri-kit",
    description: "Special kit for shraddha and pind daan rituals with sesame seeds, barley, and all required items.",
    details: "Carefully curated shraddha kit with all items needed for the annual shraddha ceremony. Includes til (sesame), jau (barley), kusha grass, black sesame, and specific items according to scripture.",
    image: "/assets/image.webp",
    icon: "⚱️",
    pageCategory: "funeralsamagri",
    price: 899,
    currency: "INR",
    features: ["Til & Jau", "Kusha Grass", "Panchamrit Ingredients", "Akshata", "Diyas & Wicks", "Puja Thali"],
    isActive: true,
    order: 3,
  },

  // ── Ambulance Services (ambulanceservices) ───────────────────────────────────
  {
    name: "Standard Ambulance Service",
    slug: "standard-ambulance-service",
    description: "24/7 standard ambulance service for body transportation within city limits with trained staff.",
    details: "Our standard ambulance service is available round the clock. The vehicle is equipped with basic life support equipment and is driven by trained professionals. Service covers up to 50 km within city limits.",
    image: "/assets/image.webp",
    icon: "🚑",
    pageCategory: "ambulance",
    price: 1500,
    currency: "INR",
    features: ["24/7 Availability", "Trained Driver & Assistant", "Up to 50 km Coverage", "AC Vehicle", "15-Min Response Time", "Documentation Support"],
    isActive: true,
    order: 1,
  },
  {
    name: "Premium Ambulance Service",
    slug: "premium-ambulance-service",
    description: "Premium AC ambulance with full body preparation, refrigeration unit, and attendant for long-distance transport.",
    details: "Our premium service includes a fully equipped AC ambulance with refrigeration unit for body preservation, professional embalming service, and one dedicated family attendant. Best for long-distance and interstate body transportation.",
    image: "/assets/image.webp",
    icon: "🚐",
    pageCategory: "ambulance",
    price: 4500,
    currency: "INR",
    features: ["Refrigeration Unit", "AC Vehicle", "Body Preservation", "Family Attendant", "Interstate Available", "24/7 Support", "GPS Tracking"],
    isActive: true,
    order: 2,
  },
  {
    name: "Air Ambulance Coordination",
    slug: "air-ambulance-coordination",
    description: "End-to-end coordination for international and domestic air repatriation of mortal remains.",
    details: "We coordinate the complete process of air transportation of mortal remains including embalming certificate, NOC from police, death certificate attestation, airline coordination, and airport formalities.",
    image: "/assets/image.webp",
    icon: "✈️",
    pageCategory: "ambulance",
    price: 25000,
    currency: "INR",
    features: ["NOC & Legal Documents", "Embalming Certificate", "Airline Coordination", "Airport Assistance", "NRI Special Support", "Embassy Liaison"],
    isActive: true,
    order: 3,
  },

  // ── Pandit Services (panditservices) ────────────────────────────────────────
  {
    name: "Antim Sanskar Pandit",
    slug: "antim-sanskar-pandit",
    description: "Experienced Vedic pandit for antim sanskar (last rites) rituals performed with complete Sanskrit mantras.",
    details: "Our verified pandits perform the complete antim sanskar procedure including mukhagni, asti visarjan mantras, and day-1 rituals. The pandit arrives with full samagri kit and performs all rituals as per your family tradition.",
    image: "/assets/image.webp",
    icon: "🕉️",
    pageCategory: "pandit",
    price: 2100,
    currency: "INR",
    features: ["Vedic Mantras", "Complete Ritual Support", "Samagri Included", "On-time Arrival", "Available in 50+ Cities", "24/7 Booking"],
    isActive: true,
    order: 1,
  },
  {
    name: "13-Day Ritual Package",
    slug: "13-day-ritual-package",
    description: "Complete 13-day post-cremation ritual package with daily puja, terahvi ceremony, and pind daan.",
    details: "This package includes a dedicated pandit for all 13 days of mourning rituals starting from day 1 to terahvi (13th day). Covers: roz ki puja, asthi sanchayana, pind daan at Haridwar/Prayagraj, and terahvi ceremony.",
    image: "/assets/image.webp",
    icon: "📿",
    pageCategory: "pandit",
    price: 11000,
    currency: "INR",
    features: ["13-Day Dedicated Pandit", "Daily Puja", "Asthi Sanchayana", "Pind Daan Coordination", "Terahvi Ceremony", "Haridwar/Prayagraj Trip"],
    isActive: true,
    order: 2,
  },
  {
    name: "Shradh & Pind Daan Package",
    slug: "shradh-pind-daan-package",
    description: "Annual Shraddha and Pind Daan ritual package performed at Haridwar, Prayagraj, or Gaya.",
    details: "Annual shraddha puja performed at the holy ghats with complete rituals. Our pandits at these holy cities perform the rituals while you can join in person or virtually. Package includes all samagri and river pind daan.",
    image: "/assets/image.webp",
    icon: "🌊",
    pageCategory: "pandit",
    price: 5100,
    currency: "INR",
    features: ["Haridwar / Prayagraj / Gaya", "River Pind Daan", "All Samagri Included", "Virtual Participation Option", "Video Recording", "Prasad Delivery"],
    isActive: true,
    order: 3,
  },

  // ── Funeral Decoration (furaldecoration) ─────────────────────────────────────
  {
    name: "Phool Bungla Decoration",
    slug: "phool-bungla-decoration",
    description: "Traditional phool bungla setup with fresh marigold, rose, and jasmine flowers for the body.",
    details: "A beautifully arranged phool bungla (flower house) made with fresh seasonal flowers including marigold, rose, jasmine, lotus, and champa. The arrangement includes a decorated plinth, flower canopy, and garlands.",
    image: "/assets/image.webp",
    icon: "🌸",
    pageCategory: "furaldecoration",
    price: 3500,
    currency: "INR",
    features: ["Fresh Seasonal Flowers", "Flower Canopy", "Decorated Plinth", "Garlands & Wreaths", "Setup Included", "Same-Day Delivery"],
    isActive: true,
    order: 1,
  },
  {
    name: "Premium Funeral Decoration",
    slug: "premium-funeral-decoration",
    description: "Luxurious full venue decoration for the prayer hall with flowers, lights, and traditional motifs.",
    details: "Transform the prayer hall into a serene and dignified space with our premium decoration service. Includes floral backdrop, candle arrangement, rangoli, marigold draping, and LED ambient lighting.",
    image: "/assets/image.webp",
    icon: "🕯️",
    pageCategory: "furaldecoration",
    price: 8500,
    currency: "INR",
    features: ["Full Venue Decoration", "Floral Backdrop", "LED Ambient Lighting", "Rangoli & Diya", "Marigold Draping", "White Flower Arrangements", "Candle Décor"],
    isActive: true,
    order: 2,
  },

  // ── Hearse Van (harsevanservices) ────────────────────────────────────────────
  {
    name: "Standard Hearse Van",
    slug: "standard-hearse-van",
    description: "Clean and dignified standard hearse van for body transportation to cremation ground.",
    details: "Our standard hearse van service provides dignified transportation of mortal remains. The vehicle is properly maintained, cleaned, and driven by a trained professional. Seating for 4 family members is available.",
    image: "/assets/image.webp",
    icon: "🚐",
    pageCategory: "hearsevan",
    price: 1200,
    currency: "INR",
    features: ["Dignified Transportation", "Family Seating (4 Persons)", "Clean & Sanitized Vehicle", "Smooth Ride", "Within City Limits", "24/7 Available"],
    isActive: true,
    order: 1,
  },
  {
    name: "Premium Decorated Hearse Van",
    slug: "premium-decorated-hearse-van",
    description: "Beautifully decorated hearse van with flowers and white draping for a dignified final journey.",
    details: "Our premium hearse van is decorated with white and marigold flowers, white fabric draping, and carries the body in a dignified manner. The vehicle is AC-equipped and can accommodate 6 family members.",
    image: "/assets/image.webp",
    icon: "🌼",
    pageCategory: "hearsevan",
    price: 3000,
    currency: "INR",
    features: ["Floral Decoration", "White Fabric Draping", "AC Vehicle", "Family Seating (6 Persons)", "Same-Day Booking", "Professional Driver"],
    isActive: true,
    order: 2,
  },

  // ── Prayer Hall (prayerhallservices) ─────────────────────────────────────────
  {
    name: "Prayer Hall - 2 Hours",
    slug: "prayer-hall-2-hours",
    description: "Peaceful air-conditioned prayer hall for 2-hour prayer meeting, seating up to 100 people.",
    details: "A serene and clean prayer hall available for 2-hour sessions. Equipped with chairs for 100 guests, a PA system for bhajans, projector for photos, and basic decoration. Tea/water service included.",
    image: "/assets/image.webp",
    icon: "🏛️",
    pageCategory: "prayerhall",
    price: 4000,
    currency: "INR",
    features: ["Seating for 100 Guests", "AC Hall", "PA Sound System", "Photo Projector", "Tea & Water Service", "Basic Decoration"],
    isActive: true,
    order: 1,
  },
  {
    name: "Prayer Hall - Full Day",
    slug: "prayer-hall-full-day",
    description: "Full-day prayer hall booking with complete arrangements for up to 300 guests.",
    details: "Our premium full-day prayer hall is ideal for large gatherings. Seating for 300 guests, stage setup for bhajan kirtan, projector and sound system, catering coordination available, and full floral decoration.",
    image: "/assets/image.webp",
    icon: "🏟️",
    pageCategory: "prayerhall",
    price: 15000,
    currency: "INR",
    features: ["Seating for 300 Guests", "Full-Day Booking", "Stage Setup", "Live Kirtan Sound", "Catering Coordination", "Full Floral Decoration", "Parking Available"],
    isActive: true,
    order: 2,
  },

  // ── Calling Relatives (callingrelativesservices) ──────────────────────────────
  {
    name: "Relative Calling Service - Basic",
    slug: "relative-calling-basic",
    description: "Dedicated team to inform and coordinate with all relatives during the difficult time.",
    details: "Our compassionate team handles all phone calls to inform relatives and friends about the sad news. We maintain a list of contacts and make calls on your behalf, saving your family from this difficult task.",
    image: "/assets/image.webp",
    icon: "📞",
    pageCategory: "callingrelatives",
    price: 500,
    currency: "INR",
    features: ["Up to 50 Calls", "Hindi & English Support", "Call Log Provided", "8 AM - 10 PM Service", "Compassionate Communication"],
    isActive: true,
    order: 1,
  },
  {
    name: "NRI Family Coordination Package",
    slug: "nri-family-coordination",
    description: "Complete coordination service for NRI families - international calls, WhatsApp updates, and live video feed.",
    details: "Specifically designed for NRI families, this package provides international calling support, WhatsApp live updates, video calls with family abroad during rituals, and complete logistics coordination so your family abroad stays informed.",
    image: "/assets/image.webp",
    icon: "🌍",
    pageCategory: "callingrelatives",
    price: 2500,
    currency: "INR",
    features: ["International Calling", "WhatsApp Live Updates", "Video Call During Rituals", "24/7 Availability", "Hindi/English/Punjabi", "Dedicated Coordinator"],
    isActive: true,
    order: 2,
  },

  // ── Special Services ─────────────────────────────────────────────────────────
  {
    name: "Digital Memorial Page",
    slug: "digital-memorial-page",
    description: "Create a lasting digital tribute page for your loved one with photos, memories, and condolences.",
    details: "Honor your loved one's memory with a beautiful digital memorial page. Share photos, videos, and memories. Invite friends and family to leave condolences. The page stays live for 1 year and can be renewed.",
    image: "/assets/image.webp",
    icon: "💻",
    pageCategory: "specialservices",
    price: 999,
    currency: "INR",
    features: ["Personalized Memorial Page", "Unlimited Photos & Videos", "Online Condolence Book", "Share Link", "1-Year Hosting", "Mobile Friendly"],
    isActive: true,
    order: 1,
  },
  {
    name: "Legal Documentation Assistance",
    slug: "legal-documentation",
    description: "Expert help with death certificate, property transfer, bank documentation, and insurance claims.",
    details: "Our legal assistance team helps families with all post-death documentation including death certificate processing, bank account closure/transfer, insurance claim filing, property mutation, and other government paperwork.",
    image: "/assets/image.webp",
    icon: "📋",
    pageCategory: "specialservices",
    price: 3500,
    currency: "INR",
    features: ["Death Certificate", "Bank Documentation", "Insurance Claim Help", "Property Transfer", "Government Forms", "Expert Legal Guidance"],
    isActive: true,
    order: 2,
  },
];

// ─── BLOG DATA ────────────────────────────────────────────────────────────────
const BLOGS = [
  {
    title: "Understanding Antim Sanskar - The Hindu Last Rites Explained",
    slug: "understanding-antim-sanskar-hindu-last-rites",
    excerpt: "A compassionate guide explaining the 16 steps of Hindu funeral rituals, their meaning, and how Moksha Voyage can help your family during this difficult time.",
    content: `<h2>What is Antim Sanskar?</h2>
<p>Antim Sanskar, also known as the last rites or funeral rituals in Hinduism, is the 16th and final samskara (rite of passage) in a Hindu's life. It is considered a sacred duty of the family to perform these rituals properly to ensure the peaceful departure of the soul.</p>

<h2>The Key Steps</h2>
<p>The process begins immediately after death and continues for 13 days. The key rituals include:</p>
<ul>
<li><strong>Mukhagni (Lighting of the funeral pyre)</strong> - Performed by the eldest son</li>
<li><strong>Asthi Sanchayana (Collecting the ashes)</strong> - Done on the 3rd day</li>
<li><strong>Pind Daan</strong> - Offering of food to the soul</li>
<li><strong>Terahvi</strong> - The 13th day ceremony marking the end of mourning</li>
</ul>

<h2>How Moksha Voyage Helps</h2>
<p>We understand that during this difficult time, your family should be focused on grieving, not logistics. Our team handles everything from the arrival of the pandit to the final ceremony, with complete transparency in pricing.</p>`,
    author: "Moksha Voyage Team",
    category: "Rituals & Traditions",
    tags: ["antim sanskar", "last rites", "hindu funeral", "cremation", "rituals"],
    readTime: "8 min read",
    isFeatured: true,
    isPublished: true,
  },
  {
    title: "Guide for NRI Families: How to Manage Funeral Arrangements from Abroad",
    slug: "nri-guide-funeral-arrangements-from-abroad",
    excerpt: "If you lost a loved one in India while living abroad, this comprehensive guide walks you through every step—from the first call to the final ceremony—so you can fulfill your duties even from thousands of miles away.",
    content: `<h2>The Pain of Distance</h2>
<p>For the 30+ million Non-Resident Indians living across the world, the sudden loss of a loved one in India brings an overwhelming combination of grief and logistical chaos. Time zones, international flights, and language barriers can feel insurmountable during these moments.</p>

<h2>What You Can Do Immediately</h2>
<ol>
<li>Call Moksha Voyage's 24/7 helpline: +91 1800 123 4567</li>
<li>Assign a trusted local family member as a contact person</li>
<li>Obtain the death certificate at the earliest</li>
<li>Contact the Indian Embassy/Consulate if needed for leave</li>
</ol>

<h2>Our NRI Coordination Services</h2>
<p>Moksha Voyage was founded specifically to solve this problem. We assign a dedicated Family Coordinator who acts as your eyes and ears on the ground, providing live updates via WhatsApp, video calls during ceremonies, and complete accounting of all expenses.</p>`,
    author: "Priya Sharma",
    category: "NRI Services",
    tags: ["nri", "abroad", "funeral india", "coordination", "international"],
    readTime: "12 min read",
    isFeatured: true,
    isPublished: true,
  },
  {
    title: "What is Pind Daan and Why is it Performed at Haridwar?",
    slug: "pind-daan-haridwar-significance",
    excerpt: "Discover the spiritual significance of Pind Daan, the sacred ritual at Haridwar and Gaya, and how it helps the soul of the departed attain moksha.",
    content: `<h2>The Meaning of Pind Daan</h2>
<p>Pind Daan is one of the most important post-cremation rituals in Hinduism. The word 'Pind' means a ball of rice mixed with sesame seeds, and 'Daan' means offering. This ritual is believed to help the departed soul cross the bridge to the afterlife.</p>

<h2>Why Haridwar and Gaya?</h2>
<p>According to Hindu scriptures, certain tirthas (holy places) are considered especially powerful for performing pind daan. Haridwar is considered the gateway to the divine, while Gaya is mentioned in the Mahabharata as the place where Lord Vishnu himself received pind daan.</p>

<h2>How Moksha Voyage Arranges It</h2>
<p>Our pandits at Haridwar, Prayagraj, and Gaya perform these rituals on your behalf. You can be present in person or participate via live video call. We provide complete documentation and offer prasad delivery to your home.</p>`,
    author: "Pandit Ramesh Sharma",
    category: "Rituals & Traditions",
    tags: ["pind daan", "haridwar", "gaya", "shraddha", "moksha"],
    readTime: "6 min read",
    isFeatured: false,
    isPublished: true,
  },
  {
    title: "Transparent Pricing in Funeral Services: What You Should Know",
    slug: "transparent-pricing-funeral-services",
    excerpt: "Hidden charges during funeral arrangements are unfortunately common. Learn how to protect your family and why Moksha Voyage's pricing transparency promise is different.",
    content: `<h2>The Problem with Current Funeral Services</h2>
<p>During one of the most vulnerable moments of a family's life, unscrupulous service providers often quote low prices initially and then add hidden charges. A funeral that was quoted at ₹15,000 can easily balloon to ₹50,000 with add-ons.</p>

<h2>What Moksha Voyage Promises</h2>
<p>We pioneered the concept of upfront, transparent pricing in the funeral service industry in India. Every service you book comes with a detailed breakdown of costs, no surprise additions, and a written confirmation before any work begins.</p>

<h2>How to Protect Your Family</h2>
<ul>
<li>Always ask for a written quote before confirming any service</li>
<li>Check for GST and other taxes in the final bill</li>
<li>Compare prices with at least 2 other providers</li>
<li>Never pay 100% upfront to an unknown service provider</li>
</ul>`,
    author: "Moksha Voyage Team",
    category: "Consumer Advice",
    tags: ["pricing", "transparency", "funeral costs", "consumer rights"],
    readTime: "7 min read",
    isFeatured: false,
    isPublished: true,
  },
];

// ─── MORE BLOG POSTS ─────────────────────────────────────────────────────────
const EXTRA_BLOGS = [
  {
    title: "Complete Guide to Hearse Van Services in India",
    slug: "hearse-van-service-guide-india",
    excerpt: "Everything you need to know about booking a hearse van in India — what to expect, how to choose the right service, and what questions to ask.",
    content: `<h2>What is a Hearse Van?</h2>
<p>A hearse van (also called a mortuary van) is a specially designed vehicle used for transporting mortal remains from the place of death to the cremation ground, burial site, or mortuary. In India, hearse vans range from basic vehicles to premium flower-decorated ones.</p>
<h2>Types Available</h2>
<ul>
<li><strong>Standard Hearse Van</strong> — Clean, basic vehicle for city transportation</li>
<li><strong>AC Hearse Van</strong> — Air-conditioned for longer distances</li>
<li><strong>Decorated Hearse Van</strong> — Adorned with marigold flowers and white draping</li>
<li><strong>Refrigerated Hearse</strong> — For body preservation over long distances</li>
</ul>
<h2>How to Book</h2>
<p>Call Moksha Voyage's 24/7 helpline for immediate assistance. Provide the pickup location, destination, and estimated time. We will have a vehicle dispatched within 30-45 minutes.</p>`,
    author: "Moksha Voyage Team",
    category: "Services Guide",
    tags: ["hearse van", "body transport", "funeral vehicle", "mortuary van"],
    readTime: "5 min read",
    isFeatured: false,
    isPublished: true,
  },
  {
    title: "Shraddha Paksha 2025: A Complete Guide to the 16-Day Ritual",
    slug: "shraddha-paksha-2025-complete-guide",
    excerpt: "Shraddha Paksha is the sacred 16-day period when Hindus perform rituals to honor their ancestors. Learn the dates, rituals, and significance of each day.",
    content: `<h2>What is Shraddha Paksha?</h2>
<p>Shraddha Paksha (also called Pitru Paksha or Mahalaya) is a 16-day lunar period in the Hindu calendar dedicated to the remembrance of ancestors. Families perform shraddha rituals, offer pind daan, and feed Brahmins in memory of their departed loved ones.</p>
<h2>Key Rituals</h2>
<ul>
<li><strong>Tarpan</strong> — Offering of water with sesame seeds to ancestors</li>
<li><strong>Pind Daan</strong> — Offering of rice balls at holy tirthas</li>
<li><strong>Brahmin Bhojan</strong> — Feeding of Brahmins as a surrogate for ancestors</li>
<li><strong>Daan</strong> — Charitable giving in the name of deceased</li>
</ul>
<h2>Our Shraddha Services</h2>
<p>Moksha Voyage provides complete shraddha ritual packages at Haridwar, Prayagraj, and Gaya. Our pandits are available throughout Shraddha Paksha for home rituals and ghat ceremonies.</p>`,
    author: "Pandit Ramesh Sharma",
    category: "Rituals & Traditions",
    tags: ["shraddha paksha", "pitru paksha", "ancestor rituals", "pind daan", "tarpan"],
    readTime: "10 min read",
    isFeatured: true,
    isPublished: true,
  },
  {
    title: "How to Choose the Right Cremation Ground in Delhi NCR",
    slug: "choose-cremation-ground-delhi-ncr",
    excerpt: "A practical guide to choosing the right cremation ground in Delhi NCR — locations, facilities, costs, and what to expect on the day.",
    content: `<h2>Major Cremation Grounds in Delhi NCR</h2>
<p>Delhi NCR has several cremation grounds (shamshaan ghats) managed by the Municipal Corporation of Delhi (MCD) and other bodies:</p>
<ul>
<li><strong>Lodhi Road Electric Crematorium</strong> — Modern electric and gas cremation, central location</li>
<li><strong>Nigambodh Ghat</strong> — Delhi's oldest and most famous ghat on the Yamuna river</li>
<li><strong>Punjabi Bagh Crematorium</strong> — West Delhi, well-maintained electric facility</li>
<li><strong>Sarai Kale Khan</strong> — South Delhi, suitable for CNG cremation</li>
</ul>
<h2>What to Consider</h2>
<p>Consider the type of cremation (traditional wood fire, electric, or CNG), distance from home, availability on the date, and facilities for family members. Moksha Voyage coordinates with all major cremation grounds in Delhi NCR.</p>`,
    author: "Vikram Singh",
    category: "Consumer Advice",
    tags: ["cremation ground", "delhi", "shamshan ghat", "electric cremation"],
    readTime: "8 min read",
    isFeatured: false,
    isPublished: true,
  },
  {
    title: "The Role of Women in Hindu Mourning Rituals: Traditions and Changes",
    slug: "women-hindu-mourning-rituals-traditions",
    excerpt: "An insightful look at the traditional role of women in Hindu funeral and mourning rituals, and how these customs are evolving in modern India.",
    content: `<h2>Historical Role of Women</h2>
<p>In traditional Hindu funeral customs, women played central roles — from preparing the body, singing lamentations (rudali), to observing specific mourning practices. However, many rituals like lighting the funeral pyre were traditionally restricted to men.</p>
<h2>Modern Changes</h2>
<p>Today, many families choose to include women in all aspects of the funeral, including lighting the pyre. This change reflects both modernization and a re-reading of scriptures that scholars argue never explicitly excluded women.</p>
<h2>Our Inclusive Approach</h2>
<p>At Moksha Voyage, we respect your family's traditions while being open to modern inclusive practices. Our pandits are trained to accommodate your family's preferences with complete respect and without judgment.</p>`,
    author: "Dr. Meena Iyer",
    category: "Rituals & Traditions",
    tags: ["women rituals", "funeral traditions", "hinduism", "mourning customs"],
    readTime: "9 min read",
    isFeatured: false,
    isPublished: true,
  },
  {
    title: "Pre-Planning Your Funeral: Why It's an Act of Love",
    slug: "pre-planning-funeral-act-of-love",
    excerpt: "Pre-planning your own funeral is one of the most caring things you can do for your family. Learn how to do it thoughtfully and what Moksha Voyage offers.",
    content: `<h2>Why Pre-Plan?</h2>
<p>Planning your own funeral while you are alive and well is a profound act of love for your family. It removes the burden of decision-making from grief-stricken relatives, ensures your wishes are honored, and can save your family significant money and stress.</p>
<h2>What to Include in Your Plan</h2>
<ul>
<li>Type of ceremony (traditional/modern, religion-specific)</li>
<li>Preferred cremation or burial</li>
<li>Specific pandits or priests if preferred</li>
<li>Music, prayers, or readings during the ceremony</li>
<li>Charitable donations in lieu of flowers</li>
<li>Digital memorial page setup</li>
</ul>
<h2>Moksha Voyage Pre-Planning Service</h2>
<p>We offer a confidential pre-planning consultation where we help you document all your wishes, store them securely, and notify your family when the time comes — ensuring everything is carried out exactly as you intended.</p>`,
    author: "Counselor Ananya Bose",
    category: "Planning & Advice",
    tags: ["pre-planning", "funeral planning", "legacy", "family care"],
    readTime: "7 min read",
    isFeatured: false,
    isPublished: true,
  },
  {
    title: "What to Do in the First 24 Hours After a Loved One Passes Away",
    slug: "first-24-hours-after-death-guide",
    excerpt: "A step-by-step compassionate guide for families on exactly what needs to be done in the first 24 hours after the death of a loved one in India.",
    content: `<h2>Take a Breath First</h2>
<p>The first moments after losing a loved one are overwhelming. Before anything else, take a moment to gather yourself and designate one calm family member to coordinate the practical steps.</p>
<h2>Hour 1-4: Immediate Steps</h2>
<ol>
<li>If death occurs at home, call an MBBS doctor for death certificate</li>
<li>If in hospital, collect death summary and speak to the discharge team</li>
<li>Contact Moksha Voyage: +91 1800 123 4567 for full coordination support</li>
<li>Inform immediate family members</li>
</ol>
<h2>Hour 4-12: Arrangements</h2>
<ol>
<li>Book ambulance/hearse van for body transportation</li>
<li>Book cremation ground or burial site</li>
<li>Arrange pandit for last rites</li>
<li>Purchase funeral samagri kit</li>
</ol>
<h2>Hour 12-24</h2>
<p>Begin informing extended family, arrange for food and accommodation for visiting relatives, and start planning the post-cremation rituals.</p>
<p>Moksha Voyage handles all of this coordination for you — one call is all it takes.</p>`,
    author: "Moksha Voyage Team",
    category: "Consumer Advice",
    tags: ["after death steps", "first 24 hours", "emergency guide", "coordination"],
    readTime: "11 min read",
    isFeatured: true,
    isPublished: true,
  },
];

// ─── GALLERY DATA ─────────────────────────────────────────────────────────────
const GALLERY_IMAGES = [
  // Ritual & Ceremony Photos
  { title: "Sacred Antim Sanskar Ceremony", description: "A serene view of the antim sanskar ceremony performed with full Vedic rituals at sunrise.", type: "image", url: "/assets/image.webp", thumbnail: "/assets/image.webp", tags: ["ceremony", "rituals", "antim sanskar"], order: 1, isActive: true },
  { title: "Phool Bungla Arrangement", description: "Beautiful marigold and rose phool bungla arrangement prepared for the final journey.", type: "image", url: "/assets/image3.png", thumbnail: "/assets/image3.png", tags: ["decoration", "flowers", "phool bungla"], order: 2, isActive: true },
  { title: "Vedic Pandit Performing Rituals", description: "Our verified Vedic pandit performing the complete antim sanskar with Sanskrit mantras.", type: "image", url: "/assets/im3.jpeg", thumbnail: "/assets/im3.jpeg", tags: ["pandit", "vedic", "rituals"], order: 3, isActive: true },
  { title: "River Pind Daan at Haridwar", description: "The sacred pind daan ritual being performed at the holy ghats of Haridwar.", type: "image", url: "/assets/im4.jpeg", thumbnail: "/assets/im4.jpeg", tags: ["pind daan", "haridwar", "ghat"], order: 4, isActive: true },
  { title: "Prayer Hall Decoration", description: "Elegantly decorated prayer hall with white flowers, candles, and soft lighting for the prayer service.", type: "image", url: "/assets/image.webp", thumbnail: "/assets/image.webp", tags: ["prayer hall", "decoration", "white flowers"], order: 5, isActive: true },
  { title: "Shraddha Ceremony Setup", description: "Complete shraddha table setup with all required materials for the annual shraddha puja.", type: "image", url: "/assets/image3.png", thumbnail: "/assets/image3.png", tags: ["shraddha", "puja", "ceremony"], order: 6, isActive: true },
  { title: "Ambulance at Service", description: "Our premium ambulance service providing dignified transportation for mortal remains.", type: "image", url: "/assets/im3.jpeg", thumbnail: "/assets/im3.jpeg", tags: ["ambulance", "transport", "service"], order: 7, isActive: true },
  { title: "Decorated Hearse Van", description: "Our beautifully flower-decorated hearse van ready for the final procession.", type: "image", url: "/assets/im4.jpeg", thumbnail: "/assets/im4.jpeg", tags: ["hearse van", "flowers", "procession"], order: 8, isActive: true },
  { title: "Funeral Samagri Kit", description: "Complete funeral samagri kit with all essential items neatly arranged for the ceremony.", type: "image", url: "/assets/image.webp", thumbnail: "/assets/image.webp", tags: ["samagri", "kit", "puja items"], order: 9, isActive: true },
  { title: "Family Prayer Session", description: "A family gathered together in prayer and remembrance at our beautifully arranged prayer hall.", type: "image", url: "/assets/chatgpt.png", thumbnail: "/assets/chatgpt.png", tags: ["family", "prayer", "gathering"], order: 10, isActive: true },
  { title: "Grahpravesh After Cremation", description: "The sacred grahpravesh ritual performed after completion of antim sanskar.", type: "image", url: "/assets/grahpravesh.jpg", thumbnail: "/assets/grahpravesh.jpg", tags: ["grahpravesh", "ritual", "ceremony"], order: 11, isActive: true },
  { title: "Terahvi Ceremony", description: "The 13th day terahvi ceremony bringing closure and beginning the path to healing.", type: "image", url: "/assets/image3.png", thumbnail: "/assets/image3.png", tags: ["terahvi", "13th day", "ceremony"], order: 12, isActive: true },
  { title: "NRI Virtual Participation", description: "An NRI family participating in the funeral rituals via live video call from abroad.", type: "image", url: "/assets/im3.jpeg", thumbnail: "/assets/im3.jpeg", tags: ["nri", "virtual", "video call"], order: 13, isActive: true },
  { title: "Flower Offering at Ghat", description: "Families offering flowers and prayers at the sacred ghats after immersing ashes.", type: "image", url: "/assets/im4.jpeg", thumbnail: "/assets/im4.jpeg", tags: ["flowers", "ghat", "offering"], order: 14, isActive: true },
  { title: "Moksha Voyage Coordinator at Work", description: "Our dedicated family coordinator providing on-ground support during a difficult time.", type: "image", url: "/assets/image.webp", thumbnail: "/assets/image.webp", tags: ["coordinator", "support", "team"], order: 15, isActive: true },
  { title: "Candle Light Memorial", description: "A touching candle light memorial prayer service organized by the Moksha Voyage team.", type: "image", url: "/assets/image3.png", thumbnail: "/assets/image3.png", tags: ["memorial", "candle", "prayer"], order: 16, isActive: true },
];

const GALLERY_VIDEOS = [
  { title: "Understanding Antim Sanskar - Complete Guide", description: "A complete video guide explaining each step of the Hindu antim sanskar (last rites) ceremony with expert commentary.", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/assets/image.webp", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", tags: ["antim sanskar", "guide", "rituals"], order: 1, isActive: true },
  { title: "Pind Daan at Haridwar - Sacred Ritual", description: "Watch the sacred pind daan ritual being performed at the holy ghats of Haridwar by our experienced pandits.", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/assets/im3.jpeg", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", tags: ["pind daan", "haridwar", "ghat"], order: 2, isActive: true },
  { title: "NRI Family Coordination - Real Story", description: "Hear how Moksha Voyage helped an NRI family in London coordinate their father's funeral in Ahmedabad from thousands of miles away.", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/assets/image3.png", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", tags: ["nri", "coordination", "testimonial"], order: 3, isActive: true },
  { title: "Our Premium Ambulance Fleet", description: "A walkthrough of our premium ambulance and hearse van fleet, showing the care we take in maintaining our vehicles.", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/assets/im4.jpeg", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", tags: ["ambulance", "fleet", "service"], order: 4, isActive: true },
  { title: "Shraddha Paksha - Why It Matters", description: "Pandit Ramesh Sharma explains the spiritual significance of Shraddha Paksha and why these rituals are important for the departed soul.", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/assets/chatgpt.png", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", tags: ["shraddha", "spiritual", "pandit"], order: 5, isActive: true },
  { title: "Phool Bungla Decoration Timelapse", description: "Watch our skilled team create a beautiful phool bungla decoration in time-lapse — from bare space to fully decorated in under 2 hours.", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/assets/grahpravesh.jpg", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", tags: ["decoration", "flowers", "phool bungla", "timelapse"], order: 6, isActive: true },
  { title: "Mahamrityunjaya Mantra - Full Chanting", description: "45-minute full chanting of the Mahamrityunjaya Mantra, one of the most powerful mantras for healing and liberation.", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/assets/image.webp", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", tags: ["mantra", "mahamrityunjaya", "chanting", "spiritual"], order: 7, isActive: true },
  { title: "Transparent Pricing at Moksha Voyage", description: "Our founder explains the pricing philosophy at Moksha Voyage and how we ensure zero hidden charges for every family.", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "/assets/image3.png", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", tags: ["pricing", "transparency", "founder"], order: 8, isActive: true },
];

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
const FAQS = [
  // General
  { question: "What is Moksha Voyage?", answer: "Moksha Voyage is India's first end-to-end funeral and cremation service platform. We provide verified, compassionate, and transparent end-of-life services including pandits, ambulance, hearse van, funeral samagri, and prayer hall — all in one place.", category: "General", order: 1, isActive: true },
  { question: "Are your services available 24/7?", answer: "Yes, absolutely. Death can happen at any hour, and our helpline (+91 1800 123 4567) is available 24 hours a day, 7 days a week, 365 days a year. Most of our services can be arranged within 2-4 hours of your call.", category: "General", order: 2, isActive: true },
  { question: "In which cities does Moksha Voyage operate?", answer: "We currently operate in Delhi NCR, Mumbai, Bangalore, Hyderabad, Pune, Kolkata, Chennai, Jaipur, Lucknow, Ahmedabad, and 30+ other cities. For NRI services, we cover all major locations in India.", category: "General", order: 3, isActive: true },
  { question: "Is Moksha Voyage only for Hindus?", answer: "No, we serve families of all religions. While our name reflects our Hindu roots, we respect and cater to the funeral traditions of all communities including Muslims (Janaza), Christians (Burial), Sikhs (Antim Ardas), and others.", category: "General", order: 4, isActive: true },
  // Services
  { question: "How do I book a pandit for last rites?", answer: "You can book a pandit directly through our website or by calling our helpline. Provide the date, location, and type of ceremony required. We will assign a verified Vedic pandit who arrives with complete samagri.", category: "Services", order: 1, isActive: true },
  { question: "What is included in the antim sanskar package?", answer: "Our antim sanskar package includes: a Vedic pandit, all required samagri, hearse van coordination, cremation ground assistance, asthi sanchayana (collecting ashes), and post-ceremony guidance for 13-day rituals.", category: "Services", order: 2, isActive: true },
  { question: "Can I book services for my loved one who passed away in a different city?", answer: "Yes! We have partner vendors across India. You can book all services remotely. Our Family Coordinator will be your local representative in the city where the person passed away.", category: "Services", order: 3, isActive: true },
  { question: "Do you provide international air repatriation services?", answer: "Yes, we specialize in NRI services including international air repatriation of mortal remains. We handle embalming certificates, NOC from police, embassy coordination, and airline paperwork.", category: "Services", order: 4, isActive: true },
  // Payment
  { question: "What payment methods are accepted?", answer: "We accept all major payment methods: UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and NEFT/RTGS for large amounts. For emergency services, we also accept cash payment on delivery.", category: "Payment", order: 1, isActive: true },
  { question: "Is there any advance payment required?", answer: "We typically require a 50% advance for most services to confirm the booking. The remaining amount is due at the time of service completion. For emergency services, the full payment can be made after the service.", category: "Payment", order: 2, isActive: true },
  { question: "Do you provide itemized bills?", answer: "Absolutely. Transparency in pricing is our core commitment. Every booking comes with a detailed itemized bill showing each service and its cost. There are no hidden charges ever.", category: "Payment", order: 3, isActive: true },
  // Booking
  { question: "How quickly can you arrange emergency services?", answer: "For emergency ambulance and body transportation, we respond within 30 minutes in major cities. Pandit services can be arranged within 2-3 hours. We understand time is critical and treat every request as urgent.", category: "Booking", order: 1, isActive: true },
  { question: "Can I make advance bookings for planned ceremonies?", answer: "Yes, advance bookings are available for ceremonies like Shraddha, Pind Daan, and Terahvi. We recommend booking at least 3-5 days in advance for planned ceremonies, and 7 days for Haridwar/Gaya trips.", category: "Booking", order: 2, isActive: true },
];

// ─── COMPONENTS DATA ──────────────────────────────────────────────────────────
const COMPONENTS = [
  // Hero
  {
    componentKey: "hero",
    label: "Hero Section",
    componentType: "hero",
    heroHeading: "A Journey Guided by Love",
    heroSubheading: "Compassionate End-of-Life Care for Every Family",
    heroTrustBadge: "TRUSTED BY 10,000+ FAMILIES",
    heroSlides: [
      { image: "/assets/image.webp", mantraTitle: "Morning Mantra", mantraSanskrit: "ॐ तत्सत् ब्रह्मार्पणम्", mantraHindi: "वह परम सत्य है — सब ब्रह्म को अर्पित", order: 0, isActive: true },
      { image: "/assets/image3.png", mantraTitle: "Shanti Mantra", mantraSanskrit: "ॐ शान्तिः शान्तिः शान्तिः", mantraHindi: "तन, मन और आत्मा को शांति मिले", order: 1, isActive: true },
      { image: "/assets/im3.jpeg", mantraTitle: "Moksha Mantra", mantraSanskrit: "ॐ नमः शिवाय", mantraHindi: "भगवान शिव को प्रणाम — मोक्ष दाता", order: 2, isActive: true },
      { image: "/assets/im4.jpeg", mantraTitle: "Mahamrityunjaya", mantraSanskrit: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्", mantraHindi: "मृत्यु पर विजय का महान मंत्र", order: 3, isActive: true },
    ],
  },
  // Navbar
  {
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
        name: "Services", path: "#services", type: "dropdown", isActive: true,
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
        name: "Moksha Gallery", path: "/mokshagallery", type: "dropdown", isActive: true,
        dropdown: [
          { name: "Moksha Gallery", path: "/mokshagallery", isActive: true },
          { name: "Moksha Video Gallery", path: "/mokshavediogallery", isActive: true },
        ],
      },
      { name: "Contact", path: "/contact", type: "page", isActive: true, dropdown: [] },
    ],
  },
  // Footer
  {
    componentKey: "footer",
    label: "Footer",
    componentType: "custom",
    customData: {
      brandName: "Moksha Voyage",
      tagline: "Compassionate End-of-Life Guidance",
      description: "India's first end-to-end funeral & cremation platform. Providing respectful guidance with dignity, tradition and care for every family. Available 24/7 across India.",
      logo: "/assets/logoreal-removebg-preview.png",
      email: "support@mokshavoyage.com",
      phone: "+91 1800 123 4567",
      address: "A-53, Sector 6, Noida, Uttar Pradesh 201301",
      socialLinks: {
        facebook: "https://www.facebook.com/mokshavoyage",
        instagram: "https://www.instagram.com/mokshavoyage",
        twitter: "https://twitter.com/mokshavoyage",
        youtube: "https://www.youtube.com/mokshavoyage",
      },
      quickLinks: [
        { label: "About Us", href: "/about" },
        { label: "All Services", href: "/services" },
        { label: "Blog", href: "/blog" },
        { label: "Gallery", href: "/mokshagallery" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
      services: [
        { label: "Funeral Samagri", href: "/furalservices" },
        { label: "Ambulance Service", href: "/ambulanceservices" },
        { label: "Pandit Service", href: "/panditservices" },
        { label: "Funeral Decoration", href: "/furaldecoration" },
        { label: "Hearse Van", href: "/harsevanservices" },
        { label: "Prayer Hall", href: "/prayerhallservices" },
      ],
    },
  },
  // Testimonials
  {
    componentKey: "testimonials",
    label: "Testimonials",
    componentType: "custom",
    testimonials: [
      { name: "Rahul Sharma", location: "Delhi", review: "Moksha Voyage helped us during the most difficult time of our lives. Their coordinator was with us every step of the way, from the ambulance to the terahvi ceremony. The pricing was transparent with no surprises.", rating: 5, isActive: true, order: 1 },
      { name: "Priya Patel", location: "UK (NRI)", review: "I was in London when my father passed away in Ahmedabad. Moksha Voyage's NRI team arranged everything — pandit, ambulance, cremation — while keeping me on a video call the whole time. I could pay my last respects from abroad.", rating: 5, isActive: true, order: 2 },
      { name: "Amit Gupta", location: "Mumbai", review: "The pandit they provided was very knowledgeable and performed all rituals with complete devotion. The samagri kit came with everything we needed. I highly recommend Moksha Voyage to every family in need.", rating: 5, isActive: true, order: 3 },
      { name: "Sunita Agarwal", location: "Bangalore", review: "What sets Moksha Voyage apart is their compassion. They don't treat this as just a business transaction. Every person we spoke to was gentle, informative, and truly caring about our family's wellbeing.", rating: 5, isActive: true, order: 4 },
      { name: "Rajesh Mehta", location: "USA (NRI)", review: "My mother passed away in Jaipur while I was in California. Moksha Voyage handled the air repatriation to bring her back to the US seamlessly. All embassy and airline paperwork was done perfectly.", rating: 5, isActive: true, order: 5 },
    ],
  },
  // About Page
  {
    componentKey: "about_page",
    label: "About Page",
    componentType: "custom",
    customData: {
      hero: {
        tag: "A Promise Born from Loss",
        title: "About",
        titleHighlight: "Moksha Voyage",
        quote: "Moksha Voyage was founded not in a boardroom, but in the quiet, aching moments following a deeply personal family loss — when we realized India desperately needed a compassionate, transparent alternative to the chaotic funeral service industry.",
      },
      founder: {
        title: "Born from",
        titleHighlight: "Personal Loss",
        description: "Our founder experienced firsthand the devastating combination of grief and logistical chaos during a family funeral. Unscrupulous vendors, opaque pricing, and the absence of any trustworthy coordinator inspired the vision for Moksha Voyage.",
        stats: [
          { value: "Since 2020", label: "Founded" },
          { value: "12,000 Cr", label: "Market Size" },
          { value: "30M+", label: "NRI Community" },
        ],
      },
      visionMission: [
        { title: "Our Vision", desc: "A India where every person, regardless of location or economic status, can experience a dignified and peaceful end-of-life journey for their loved ones." },
        { title: "Our Mission", desc: "To build a trusted, transparent digital ecosystem connecting grieving families with verified, compassionate end-of-life service providers across India." },
        { title: "Our Promise", desc: "Every family will receive the same standard of care, respect, and pricing transparency we would want for our own loved ones during this difficult time." },
      ],
    },
  },
  // HowWeHelp
  {
    componentKey: "howwehelp",
    label: "How We Help Section",
    componentType: "custom",
    customData: {
      tag: "Our Services",
      title: "End-to-End Cremation &",
      titleHighlight: "Ritual Services",
      subtitle: "Verified Service Network · NRI Cross-Border Coordination · Radical Pricing Transparency",
      cards: [
        { icon: "🕉️", title: "Pandit & Ritual Services", desc: "Verified Vedic pandits for all rituals from antim sanskar to annual shraddha. Available in 50+ cities.", features: ["Antim Sanskar Pandit", "13-Day Ritual Package", "Shraddha & Pind Daan"] },
        { icon: "🚑", title: "Ambulance & Transport", desc: "24/7 ambulance, hearse van, and air repatriation services with trained staff.", features: ["City Ambulance Service", "Hearse Van with Flowers", "Air Repatriation (NRI)"] },
        { icon: "🌸", title: "Funeral Decoration", desc: "Beautiful, dignified floral arrangements and venue decoration for the prayer service.", features: ["Phool Bungla", "Full Venue Decoration", "LED Ambient Lighting"] },
        { icon: "🌍", title: "NRI Cross-Border", desc: "Dedicated coordinators for NRI families managing all logistics from abroad.", features: ["Live Video Updates", "WhatsApp Coordination", "International Calling"] },
      ],
      stats: [
        { value: "24/7", label: "Care Coordinators" },
        { value: "50+", label: "Verified Pandits" },
        { value: "30+", label: "Cities Covered" },
        { value: "30M+", label: "NRI Community Served" },
      ],
    },
  },
  // Compassion Section
  {
    componentKey: "compassion",
    label: "Compassion Section",
    componentType: "custom",
    customData: {
      tag: "Our Mission",
      title: "Bringing Peace",
      subtitle: "When It Matters Most",
      description: "At Moksha Voyage, we believe that the last journey of a loved one deserves the same care and love you gave them in life. Our team of compassionate professionals is available 24/7 to handle every detail — so your family can focus on grieving and healing.",
      image: "/assets/chatgpt.png",
      stats: [
        { value: "10,000+", label: "Families Served", sub: "With Compassion" },
        { value: "50+", label: "Verified Pandits", sub: "Across India" },
        { value: "30+", label: "Cities Covered", sub: "Pan-India Network" },
        { value: "24/7", label: "Support Available", sub: "Never Alone" },
      ],
      features: [
        { title: "Transparent Pricing", desc: "No hidden costs, complete upfront quotes before any work begins" },
        { title: "Digital Agreements", desc: "Secure documentation and billing for every service" },
        { title: "Ritual Guidance", desc: "Step-by-step support through every ceremony and tradition" },
        { title: "NRI Services", desc: "Full support coordination for families located abroad" },
      ],
      primaryButton: "Learn More",
      secondaryButton: "Contact Our Team",
    },
  },
  // Sacred Journey
  {
    componentKey: "sacredjourney",
    label: "Sacred Journey Section",
    componentType: "custom",
    customData: {
      tag: "24/7 Care Coordination",
      title: "A Journey Guided by Love",
      description: "One trusted contact. Complete care. First response within 15 minutes, 24 hours a day, 365 days a year. No family should navigate the last journey alone.",
      buttons: [{ label: "Get Immediate Support", type: "phone", value: "+911800123456" }],
      footerText: "Toll-free 24/7 Helpline • Real-Time Family Updates • Transparent Pricing Guarantee",
    },
  },
  // Mantra Section
  {
    componentKey: "mantra",
    label: "Mantra Section",
    componentType: "custom",
    customData: {
      symbol: "ॐ",
      title: "Moksha Voyage",
      subtitle: "Sacred Wisdom",
      tagline: "India's First End-to-End Cremation Platform",
      shlok: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः।।",
      transliteration1: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja",
      transliteration2: "ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
      meaning: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear. — Bhagavad Gita 18.66",
      promise: "Every family will receive the same standard of care, respect, and transparency we would want for our own loved ones.",
      pillars: ["SIMPLIFY", "CONNECT", "PROTECT", "HONOUR", "SERVE"],
      image: "/assets/grahpravesh.jpg",
    },
  },
  // Serving Section
  {
    componentKey: "serving",
    label: "Serving Section",
    componentType: "custom",
    customData: {
      tag: "Who We Serve",
      title: "Serving Humanity",
      titleHighlight: "Beyond Boundaries",
      description: "Whether you are a grieving family in Delhi, an NRI in London, a senior citizen in Mumbai, or an NGO supporting shelter homes — Moksha Voyage is here for you.",
      nriTitle: "NRI Community",
      nriSubtitle: "Our Primary Beachhead Market",
      nriDescription: "Over 30 million Indians living in the UK, USA, UAE, Canada, Australia, Singapore, and the Gulf face the impossible challenge of managing funeral arrangements from thousands of miles away.",
      features: [
        { title: "Grieving Families in India", desc: "Complete end-to-end funeral coordination at verified, transparent pricing", icon: "🏠" },
        { title: "NRI Diaspora Worldwide", desc: "Remote coordination with live updates, video calls, and international support", icon: "🌍" },
        { title: "Senior Citizens", desc: "Pre-planned funeral arrangements for peace of mind", icon: "👴" },
        { title: "NGOs & Shelter Homes", desc: "Subsidized funeral services for those in need through our Seva Fund", icon: "❤️" },
      ],
    },
  },
];

// ─── MAIN SEED FUNCTION ───────────────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB Connected\n");

    // ── 1. Seed Services ─────────────────────────────────────────────────────
    console.log("📦 Seeding Services...");
    await mongoose.connection.db.collection("services").deleteMany({});
    await mongoose.connection.db.collection("services").insertMany(
      SERVICES.map(s => ({ ...s, createdAt: new Date(), updatedAt: new Date() }))
    );
    console.log(`   ✅ ${SERVICES.length} services inserted\n`);

    // ── 2. Seed Blogs ────────────────────────────────────────────────────────
    const allBlogs = [...BLOGS, ...EXTRA_BLOGS];
    console.log("📝 Seeding Blog Posts...");
    await mongoose.connection.db.collection("blogs").deleteMany({});
    await mongoose.connection.db.collection("blogs").insertMany(
      allBlogs.map(b => ({ ...b, publishedAt: new Date(), createdAt: new Date(), updatedAt: new Date() }))
    );
    console.log(`   ✅ ${allBlogs.length} blog posts inserted\n`);

    // ── 3. Seed FAQs ─────────────────────────────────────────────────────────
    console.log("❓ Seeding FAQs...");
    await mongoose.connection.db.collection("faqs").deleteMany({});
    await mongoose.connection.db.collection("faqs").insertMany(
      FAQS.map(f => ({ ...f, createdAt: new Date(), updatedAt: new Date() }))
    );
    console.log(`   ✅ ${FAQS.length} FAQs inserted\n`);

    // ── 4. Seed Components ───────────────────────────────────────────────────
    console.log("🧩 Seeding Components (Hero, Navbar, Footer, etc.)...");
    for (const comp of COMPONENTS) {
      await mongoose.connection.db.collection("components").updateOne(
        { componentKey: comp.componentKey },
        { $set: { ...comp, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
        { upsert: true }
      );
      console.log(`   ✅ Component: ${comp.componentKey}`);
    }

    // ── 5. Seed Gallery Images ───────────────────────────────────────────────
    console.log("\n🖼️  Seeding Gallery Images...");
    await mongoose.connection.db.collection("galleries").deleteMany({ type: "image" });
    await mongoose.connection.db.collection("galleries").insertMany(
      GALLERY_IMAGES.map(g => ({ ...g, createdAt: new Date(), updatedAt: new Date() }))
    );
    console.log(`   ✅ ${GALLERY_IMAGES.length} gallery images inserted\n`);

    // ── 6. Seed Gallery Videos ───────────────────────────────────────────────
    console.log("🎬 Seeding Gallery Videos...");
    await mongoose.connection.db.collection("galleries").deleteMany({ type: "video" });
    await mongoose.connection.db.collection("galleries").insertMany(
      GALLERY_VIDEOS.map(g => ({ ...g, createdAt: new Date(), updatedAt: new Date() }))
    );
    console.log(`   ✅ ${GALLERY_VIDEOS.length} gallery videos inserted\n`);

    const totalBlogs = allBlogs.length;
    const totalGallery = GALLERY_IMAGES.length + GALLERY_VIDEOS.length;

    console.log("🎉 ═══════════════════════════════════════════════════════");
    console.log("   ALL SEED DATA INSERTED SUCCESSFULLY!");
    console.log("   📦 Services:       " + SERVICES.length + " items across 8 categories");
    console.log("   📝 Blog Posts:     " + totalBlogs + " articles");
    console.log("   ❓ FAQs:           " + FAQS.length + " questions");
    console.log("   🧩 Components:     " + COMPONENTS.length + " CMS components");
    console.log("   🖼️  Gallery Images: " + GALLERY_IMAGES.length + " photos");
    console.log("   🎬 Gallery Videos: " + GALLERY_VIDEOS.length + " videos");
    console.log("   Total Gallery:    " + totalGallery + " items");
    console.log("   ═══════════════════════════════════════════════════════\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed Error:", err);
    process.exit(1);
  }
}

seed();
