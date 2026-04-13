const Component = require("../models/Component.model");

// @desc    Get all components
// @route   GET /api/components
// @access  Public
exports.getAllComponents = async (req, res, next) => {
  try {
    const components = await Component.find({ isActive: true }).sort(
      "componentKey",
    );
    res.json({ success: true, count: components.length, data: components });
  } catch (err) {
    next(err);
  }
};

// @desc    Get component by key
// @route   GET /api/components/:key
// @access  Public
exports.getComponentByKey = async (req, res, next) => {
  try {
    const { key } = req.params;
    let component = await Component.findOne({ componentKey: key });

    if (!component) {
      // Fallback for core components to prevent 404s
      const fallbacks = {
        footer: {
          brandName: "Moksha Voyage",
          tagline: "Compassionate End-of-Life Guidance",
          description: "Providing respectful guidance with dignity, tradition and care for every family.",
          logo: "/assets/logoreal.jpeg",
          email: "info@mokshavoyage.com",
          phone: "+91 123 456 7890",
          address: "Delhi NCR",
          socialLinks: { facebook: "#", instagram: "#", twitter: "#", youtube: "#" }
        },
        about_page: {
          hero: { tag: "A Promise Born from Loss", title: "About", titleHighlight: "Moksha Voyage", quote: "Moksha Voyage was founded not in a boardroom, but in the quiet, aching moments following a deeply personal family loss." },
          founder: { title: "A Promise Born", titleHighlight: "from Loss", description: "Our founder experienced firsthand the devastating combination of grief and logistical chaos...", stats: [{ value: "Since 2015", label: "Founded" }, { value: "12,000 Cr", label: "Market Size" }, { value: "30M+", label: "NRI Served" }] },
          visionMission: [
            { title: "Our Vision", desc: "A world where every person can experience a dignified, peaceful end-of-life journey." },
            { title: "Our Mission", desc: "To build a trusted, transparent digital ecosystem connecting families with verified services." },
            { title: "Our Promise", desc: "Every family will receive the same standard of care, respect, and transparency we would want for our own." }
          ],
          objectives: [
            { title: "SIMPLIFY", desc: "Transform complexity into clear steps." },
            { title: "CONNECT", desc: "Build a verified 24/7 network." },
            { title: "PROTECT", desc: "Guarantee pricing transparency." },
            { title: "HONOUR", desc: "Create lasting digital legacies." },
            { title: "SERVE", desc: "Embed social impact via Seva Fund." }
          ]
        },
        contact_page: {
          header: { title: "Get in Touch", subtitle: "We are here to support you 24/7 with compassion and care." },
          infoCards: [
            { type: "Address", value: "A-53, Sector 6, Noida, Uttar Pradesh 201301", icon: "MapPin" },
            { type: "Phone", value: "+91 1800 123 4567", subValue: "24/7 Helpline", icon: "Phone" },
            { type: "Email", value: "support@mokshavoyage.com", subValue: "General Inquiries", icon: "Mail" },
            { type: "Working Hours", value: "Monday - Sunday", subValue: "Open 24 Hours", icon: "Clock" }
          ],
          googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4616233481235!2d77.3117565761004!3d28.58591348619999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f7823f009%3A0xea802521c7cb87a!2sNoida%20Sector%206!5e0!3m2!1sen!2sin!4v1709555555555!5m2!1sen!2sin",
          form: { title: "Send a Message", subtitle: "Fill out the form below and our coordinator will contact you." }
        },
        howwehelp: {
          tag: "Our Services",
          title: "End-to-End Cremation &",
          titleHighlight: "Ritual Services",
          subtitle: "Verified Service Network · NRI Cross-Border Coordination · Radical Pricing Transparency",
          cards: [
            { icon: "🔥", title: "Cremation Services", desc: "End-to-end cremation coordination with verified providers.", features: ["Cremation Ground Booking", "Pandit Services", "Ritual Materials"] },
            { icon: "🌏", title: "NRI Cross-Border", desc: "Dedicated local representatives managing all logistics.", features: ["Family Representative", "Legal Documentation", "Body/Ash Repatriation"] }
          ],
          stats: [{ value: "24/7", label: "Care Coordinators" }, { value: "30M+", label: "NRI Community Served" }]
        },
        serving: {
          tag: "Who We Serve",
          title: "Serving Humanity",
          titleHighlight: "Beyond Boundaries",
          description: "Families in India · Global NRI Community · Senior Citizens · Shelter Homes & NGO Partners",
          nriTitle: "NRI Community",
          nriSubtitle: "Our Beachhead Market",
          nriDescription: "30M+ Indians living in the UK, USA, UAE, Canada, Australia, Singapore, and the Gulf.",
          features: [{ title: "Pain Point Intensity", desc: "Managing sacred duties from thousands of miles away", icon: "PiHandHeart" }]
        },
        sacredjourney: {
          tag: "24/7 Care Coordination",
          title: "A Journey Guided by Love",
          description: "One trusted contact. Complete care. First response within 15 minutes, 24 hours a day, 365 days a year.",
          buttons: [{ label: "Get Immediate Support", type: "phone", value: "+9118001234567" }],
          footerText: "Toll-free 24/7 Helpline • Real-Time Family Tracking • Radical Pricing Transparency"
        },
        mantra: {
          symbol: "ॐ",
          title: "Moksha Voyage",
          subtitle: "Sacred Wisdom",
          tagline: "India's First End-to-End Cremation Platform",
          shlok: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः।",
          transliteration1: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja",
          transliteration2: "ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
          promise: "Every family will receive the same standard of care, respect, and transparency we would want for our own loved ones.",
          meaning: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
          pillars: ["SIMPLIFY", "CONNECT", "PROTECT", "HONOUR", "SERVE"],
          image: "/assets/grahpravesh.jpg"
        },
        compassion: {
          tag: "Our Mission",
          title: "A Journey Guided by Love",
          subtitle: "with Peace of Mind",
          description: "At Moksha Voyage — To build a trusted, transparent digital ecosystem that connects families with verified end-of-life service providers.",
          image: "/assets/chatgpt.png",
          stats: [
            { value: "500+", label: "Families Served", sub: "With Compassion" },
            { value: "50+", label: "Verified Pandits", sub: "Across India" },
            { value: "15+", label: "Cities Covered", sub: "Pan-India Network" }
          ],
          features: [
            { title: "Transparent Pricing", desc: "No hidden costs, upfront quotes" },
            { title: "Digital Agreements", desc: "Secure documentation" },
            { title: "Ritual Guidance", desc: "Step-by-step support" },
            { title: "NRI Services", desc: "Support from abroad" }
          ],
          primaryButton: "Learn More",
          secondaryButton: "Contact Our Team",
          badge1: "24/7 Support",
          badge2: "Cultural Sensitivity"
        }
      };

      if (fallbacks[key]) {
        return res.json({
          success: true,
          data: {
            componentKey: key,
            label: `${key.charAt(0).toUpperCase() + key.slice(1)} Section`,
            customData: fallbacks[key]
          }
        });
      }

      return res.status(404).json({
        success: false,
        message: `Component '${key}' not found`,
      });
    }
    res.json({ success: true, data: component });
  } catch (err) {
    next(err);
  }
};

// @desc    Get multiple components by keys (bulk fetch for page load)
// @route   POST /api/components/bulk
// @access  Public
exports.getBulkComponents = async (req, res, next) => {
  try {
    const { keys } = req.body;
    if (!keys || !Array.isArray(keys)) {
      return res
        .status(400)
        .json({ success: false, message: "Provide an array of keys" });
    }
    const components = await Component.find({ componentKey: { $in: keys } });
    // Return as key->data map for easy access in frontend
    const dataMap = {};
    components.forEach((c) => {
      dataMap[c.componentKey] = c;
    });
    res.json({ success: true, data: dataMap });
  } catch (err) {
    next(err);
  }
};

// @desc    Create component
// @route   POST /api/components
// @access  Private
exports.createComponent = async (req, res, next) => {
  try {
    const exists = await Component.findOne({
      componentKey: req.body.componentKey,
    });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Component with this key already exists",
      });
    }
    const component = await Component.create(req.body);
    res.status(201).json({ success: true, data: component });
  } catch (err) {
    next(err);
  }
};

// @desc    Update component by key (upsert)
// @route   PUT /api/components/:key
// @access  Private
exports.updateComponent = async (req, res, next) => {
  try {
    // Use raw MongoDB collection to bypass Mongoose schema casting for embedded arrays (navItems etc.)
    const result = await Component.collection.updateOne(
      { componentKey: req.params.key },
      { $set: req.body },
      { upsert: true }
    );
    const component = await Component.findOne({ componentKey: req.params.key }).lean();
    res.json({ success: true, message: "Component updated", data: component });
  } catch (err) {
    next(err);
  }
};


exports.deleteComponent = async (req, res, next) => {
  try {
    const component = await Component.findOneAndDelete({
      componentKey: req.params.key,
    });
    if (!component) {
      return res
        .status(404)
        .json({ success: false, message: "Component not found" });
    }
    res.json({ success: true, message: "Component deleted" });
  } catch (err) {
    next(err);
  }
};

// ─── Hero-specific ────────────────────────────────────────────────────────────
exports.getHero = async (req, res, next) => {
  try {
    let hero = await Component.findOne({ componentKey: "hero" });
    if (!hero) {
      hero = await Component.create({
        componentKey: "hero",
        componentType: "hero",
        label: "Hero Section",
        heroHeading: "A Journey Guided by Love",
        heroTrustBadge: "TRUSTED SINCE 2005",
        heroSlides: [
          {
            image: "/assets/image.webp",
            mantraTitle: "Morning Mantra",
            mantraSanskrit: "ॐ तत्सत्",
            mantraHindi: "वह परम सत्य है",
            order: 0,
            isActive: true,
          },
          {
            image: "/assets/image3.png",
            mantraTitle: "Evening Mantra",
            mantraSanskrit: "ॐ शान्तिः",
            mantraHindi: "शांति मिले",
            order: 1,
            isActive: true,
          },
          {
            image: "/assets/im3.jpeg",
            mantraTitle: "Peace Mantra",
            mantraSanskrit: "ॐ नमः शिवाय",
            mantraHindi: "शिव को नमस्कार",
            order: 2,
            isActive: true,
          },
          {
            image: "/assets/im4.jpeg",
            mantraTitle: "Blessing Mantra",
            mantraSanskrit: "गायत्री मंत्र",
            mantraHindi: "परमात्मा का आशीर्वाद",
            order: 3,
            isActive: true,
          },
        ],
      });
    }
    res.json({ success: true, data: hero });
  } catch (err) {
    next(err);
  }
};

// ─── Topbar-specific ──────────────────────────────────────────────────────────
exports.getTopbar = async (req, res, next) => {
  try {
    const Settings = require("../models/Settings.model");
    const settings = await Settings.findOne();
    const component = await Component.findOne({ componentKey: "topbar" });
    res.json({
      success: true,
      data: {
        email: settings?.topbarEmail || "info@mokshayatra.org",
        phone: settings?.topbarPhone || "+91 96549 00525",
        showUserLogin: settings?.showUserLogin ?? true,
        showVendorLogin: settings?.showVendorLogin ?? true,
        showMokshaSeva: settings?.showMokshaSeva ?? true,
        showMortalRecords: settings?.showMortalRecords ?? true,
        audioPlaylist: settings?.audioPlaylist || [],
        ...(component?.customData || {}),
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─── Navbar-specific ──────────────────────────────────────────────────────────
exports.getNavbar = async (req, res, next) => {
  try {
    // Use .lean() to get plain JS object — prevents Mongoose Document stripping nested dropdown arrays
    let navbar = await Component.findOne({ componentKey: "navbar" }).lean();

    if (!navbar || !Array.isArray(navbar.navItems) || navbar.navItems.length === 0) {
      // Return full default nav structure when no DB record exists
      return res.json({
        success: true,
        data: {
          logo: "/assets/logoreal-removebg-preview.png",
          brandName: "Moksha Voyage",
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
        },
      });
    }

    // Ensure each navItem has a proper dropdown array (safety guard)
    if (navbar.navItems) {
      navbar.navItems = navbar.navItems.map((item) => ({
        ...item,
        dropdown: Array.isArray(item.dropdown) ? item.dropdown : [],
      }));
    }

    res.json({ success: true, data: navbar });
  } catch (err) {
    next(err);
  }
};

// ─── SideIcons ────────────────────────────────────────────────────────────────
exports.getSideIcons = async (req, res, next) => {
  try {
    const Settings = require("../models/Settings.model");
    const settings = await Settings.findOne();
    const whatsapp =
      settings?.whatsappNumber?.replace(/\D/g, "") || "919310219283";
    const msg = encodeURIComponent(
      settings?.whatsappMessage || "Hello I need information",
    );

    let component = await Component.findOne({ componentKey: "sideicons" });
    if (
      !component ||
      !component.sideIcons ||
      component.sideIcons.length === 0
    ) {
      return res.json({
        success: true,
        data: {
          sideIcons: [
            {
              platform: "whatsapp",
              url: `https://wa.me/${whatsapp}?text=${msg}`,
              color: "#25D366",
              label: "WhatsApp",
              order: 0,
              isActive: true,
            },
            {
              platform: "telegram",
              url: `https://t.me/${settings?.telegramNumber || "9310219283"}`,
              color: "#0088cc",
              label: "Telegram",
              order: 1,
              isActive: true,
            },
            {
              platform: "facebook",
              url:
                settings?.socialLinks?.facebook || "https://www.facebook.com/",
              color: "#1877F2",
              label: "Facebook",
              order: 2,
              isActive: true,
            },
            {
              platform: "linkedin",
              url:
                settings?.socialLinks?.linkedin || "https://www.linkedin.com/",
              color: "#0077B5",
              label: "LinkedIn",
              order: 3,
              isActive: true,
            },
            {
              platform: "youtube",
              url: settings?.socialLinks?.youtube || "https://www.youtube.com/",
              color: "#FF0000",
              label: "YouTube",
              order: 4,
              isActive: true,
            },
          ],
          phoneLink: `tel:${settings?.contactPhone || "+919310219283"}`,
          emailLink: `mailto:${settings?.contactEmail || "info@mokshayatra.org"}`,
        },
      });
    }
    res.json({ success: true, data: component });
  } catch (err) {
    next(err);
  }
};
