const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    author: { type: String, default: "Moksha Voyage Team" },
    authorAvatar: { type: String, default: "" },
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    readTime: { type: String, default: "5 min read" },
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    lastEditedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
