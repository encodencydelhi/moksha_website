const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { protect } = require("../middleware/auth.middleware");

// Ensure upload dirs exist
const uploadDirs = [
  "public/uploads/images",
  "public/uploads/audio",
  "public/uploads/docs",
];
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isAudio = file.mimetype.startsWith("audio/");
    const isDoc = file.mimetype === "application/pdf";
    if (isAudio) return cb(null, "public/uploads/audio");
    if (isDoc) return cb(null, "public/uploads/docs");
    cb(null, "public/uploads/images");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "-")
      .toLowerCase();
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/ogg",
    "application/pdf",
  ];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(new Error(`File type ${file.mimetype} not allowed`), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 }, // 10MB
});

// @desc    Upload single file
// @route   POST /api/upload
// @access  Private
router.post("/", protect, upload.single("file"), (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  const url = `/uploads/${req.file.destination.replace("public/uploads/", "")}/${req.file.filename}`;
  res.json({
    success: true,
    message: "File uploaded successfully",
    data: {
      url,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    },
  });
});

// @desc    Upload multiple files (max 10)
// @route   POST /api/upload/multiple
// @access  Private
router.post("/multiple", protect, upload.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No files uploaded" });
  }
  const files = req.files.map((f) => ({
    url: `/uploads/${f.destination.replace("public/uploads/", "")}/${f.filename}`,
    filename: f.filename,
    originalName: f.originalname,
    mimetype: f.mimetype,
    size: f.size,
  }));
  res.json({ success: true, count: files.length, data: files });
});

// Error handler for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ success: false, message: "File too large. Max size is 10MB." });
    }
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err)
    return res.status(400).json({ success: false, message: err.message });
  next();
});

module.exports = router;
