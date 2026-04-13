const mongoose = require("mongoose");

// Hero Slides
const HeroSlideSchema = new mongoose.Schema({
  image: { type: String, required: true },
  mantraTitle: { type: String, default: "" },
  mantraSanskrit: { type: String, default: "" },
  mantraHindi: { type: String, default: "" },
  audio: { type: String, default: "" },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
});

// Testimonial
const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, default: "" },
  review: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  avatar: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

// FAQ
const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: "general" },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
});

// Generic component for banners, cards, sliders etc.
const ComponentSchema = new mongoose.Schema(
  {
    componentKey: {
      type: String,
      required: true,
      unique: true,
      // e.g. "hero", "topbar", "navbar", "footer", "compassion", "mantra",
      //      "serving", "howwehelp", "sacredjourney", "blog", "gallery",
      //      "videogallery", "sideicons", "testimonials", "faqs"
    },
    componentType: {
      type: String,
      enum: ["hero", "banner", "card", "slider", "testimonial", "faq", "gallery", "custom"],
      default: "custom",
    },
    label: { type: String, required: true }, // human-readable name
    isActive: { type: Boolean, default: true },

    // ─── Hero Specific ─────────────────────────────────────────────────────────
    heroSlides: [HeroSlideSchema],
    heroHeading: { type: String, default: "A Journey Guided by Love" },
    heroSubheading: { type: String, default: "" },
    heroTrustBadge: { type: String, default: "TRUSTED SINCE 2005" },

    // ─── Topbar Specific ───────────────────────────────────────────────────────
    topbarEmail: { type: String, default: "" },
    topbarPhone: { type: String, default: "" },
    topbarLinks: [
      {
        label: String,
        href: String,
        icon: String,
        showOnMobile: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
      },
    ],

    // ─── Navbar Specific ───────────────────────────────────────────────────────
    navItems: [
      {
        name: String,
        path: String,
        icon: String,
        type: { type: String, enum: ["page", "dropdown", "hash"], default: "page" },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        dropdown: [
          {
            name: String,
            path: String,
            icon: String,
            type: String,
            isActive: { type: Boolean, default: true },
          },
        ],
      },
    ],

    // ─── CompassionSection / Generic Text Section ──────────────────────────────
    sectionTag: { type: String, default: "" },
    sectionTitle: { type: String, default: "" },
    sectionSubtitle: { type: String, default: "" },
    sectionDescription: { type: String, default: "" },
    sectionImage: { type: String, default: "" },
    sectionButtons: [{ label: String, href: String, variant: String }],

    // ─── Mantra / Shloka Section ───────────────────────────────────────────────
    mantras: [
      {
        symbol: { type: String, default: "ॐ" },
        titleLine1: { type: String, default: "" },
        titleLine2: { type: String, default: "" },
        sanskrit: { type: String, default: "" },
        hindi: { type: String, default: "" },
        meaning: { type: String, default: "" },
        source: { type: String, default: "" },
        audio: { type: String, default: "" },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
      },
    ],

    // ─── Stats / Counters ──────────────────────────────────────────────────────
    stats: [
      {
        label: String,
        value: String,
        icon: String,
        order: { type: Number, default: 0 },
      },
    ],

    // ─── Cards / Features ──────────────────────────────────────────────────────
    cards: [
      {
        title: String,
        description: String,
        icon: String,
        image: String,
        link: String,
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        customData: { type: mongoose.Schema.Types.Mixed, default: {} },
      },
    ],

    // ─── Testimonials ──────────────────────────────────────────────────────────
    testimonials: [TestimonialSchema],

    // ─── FAQs ──────────────────────────────────────────────────────────────────
    faqs: [FAQSchema],

    // ─── Gallery ───────────────────────────────────────────────────────────────
    galleryImages: [
      {
        url: String,
        alt: String,
        caption: String,
        category: String,
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
      },
    ],

    // ─── Video Gallery ─────────────────────────────────────────────────────────
    videos: [
      {
        title: String,
        thumbnailUrl: String,
        videoUrl: String,
        embedUrl: String,
        description: String,
        duration: String,
        category: String,
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
      },
    ],

    // ─── Side Icons / Social Sidebar ───────────────────────────────────────────
    sideIcons: [
      {
        platform: String,
        url: String,
        color: String,
        hoverColor: String,
        label: String,
        icon: String,
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
      },
    ],

    // ─── Flexible JSON for any extra data ─────────────────────────────────────
    customData: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Component", ComponentSchema);
