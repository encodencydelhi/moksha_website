const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  sectionKey: { type: String, required: true }, // e.g. "hero", "compassion", "mantra"
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  description: { type: String, default: "" },
  content: { type: mongoose.Schema.Types.Mixed, default: {} }, // flexible JSON content
  images: [{ url: String, alt: String, caption: String }],
  buttons: [{ label: String, href: String, variant: String, icon: String }],
  isVisible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  customData: { type: mongoose.Schema.Types.Mixed, default: {} },
});

const PageSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // e.g. "home", "about", "contact", "furalservices", "ambulanceservices"
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    sections: [SectionSchema],

    // SEO
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: String, default: "" },
    ogImage: { type: String, default: "" },

    isPublished: { type: Boolean, default: true },
    lastEditedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Page", PageSchema);
