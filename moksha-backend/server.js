// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(helmet({
//   crossOriginResourcePolicy: false,
// }));
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:3001",
//       process.env.FRONTEND_URL || "http://localhost:3000",
//     ],
//     credentials: true,
//   }),
// );
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

// // Rate Limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 1000, // Increased for dev/local testing
//   message: "Too many requests from this IP",
// });
// app.use("/api/", limiter);

// // Static Files
// app.use("/public", cors(), express.static("public"));
// app.use("/uploads", cors(), express.static("public/uploads"));

// // Database Connection
// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/moksha")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // Routes
// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/admin", require("./routes/admin.routes"));
// app.use("/api/blog", require("./routes/blog.routes"));
// app.use("/api/category", require("./routes/category.routes"));
// app.use("/api/services", require("./routes/services.routes"));
// app.use("/api/service", require("./routes/services.routes")); // Alias
// app.use("/api/gallery", require("./routes/gallery.routes"));
// app.use("/api/settings", require("./routes/settings.routes"));
// app.use("/api/analytics", require("./routes/analytics.routes"));
// app.use("/api/payments", require("./routes/payments.routes"));
// app.use("/api/payment", require("./routes/payments.routes")); // Alias
// app.use("/api/activity-log", require("./routes/activity-log.routes"));
// app.use("/api/faq", require("./routes/faq.routes"));
// app.use("/api/faqs", require("./routes/faq.routes")); // Alias
// app.use("/api/category", require("./routes/category.routes"));
// app.use("/api/categories", require("./routes/category.routes")); // Alias
// app.use("/api/contact", require("./routes/contact.routes"));
// app.use("/api/contacts", require("./routes/contact.routes")); // Alias
// app.use("/api/components", require("./routes/components.routes"));
// app.use("/api/pages", require("./routes/pages.routes"));
// app.use("/api/social-clicks", require("./routes/socialClicks.routes"));
// app.use("/api/upload", require("./routes/upload.routes"));

// // Health Check
// app.get("/api/health", (req, res) => {
//   res.json({ success: true, message: "Server running" });
// });

// // Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// 🔐 Security Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

// 🌐 CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      process.env.FRONTEND_URL || "http://localhost:3000",
    ],
    credentials: true,
  }),
);

// 📦 Body Parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 🚫 Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP",
});
app.use("/api/", limiter);

// 📁 Static Files
app.use("/public", express.static("public"));
app.use("/uploads", express.static("public/uploads"));

// 🗄️ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/moksha")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// 📌 Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/blog", require("./routes/blog.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/services", require("./routes/services.routes"));
app.use("/api/gallery", require("./routes/gallery.routes"));
app.use("/api/settings", require("./routes/settings.routes"));
app.use("/api/analytics", require("./routes/analytics.routes"));

// ✅ ✅ IMPORTANT FIX (Payment)
app.use("/api/payments", require("./routes/payment.routes")); // ✔ correct file

app.use("/api/activity-log", require("./routes/activity-log.routes"));
app.use("/api/faq", require("./routes/faq.routes"));
app.use("/api/contact", require("./routes/contact.routes"));
app.use("/api/components", require("./routes/components.routes"));
app.use("/api/pages", require("./routes/pages.routes"));
app.use("/api/social-clicks", require("./routes/socialClicks.routes"));
app.use("/api/upload", require("./routes/upload.routes"));

// ❤️ Health Check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server running" });
});

// ❌ Error Handler
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 🚀 Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
