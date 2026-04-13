# Complete Admin Panel Setup Guide

## ✅ System Overview

Your admin panel now manages **100% of website content**:

- Blog posts and categories
- Services and pricing
- Gallery images and videos
- Hero section content
- FAQ questions and answers
- Website settings and configuration

**Every change in admin immediately reflects on the website!**

---

## 🚀 Quick Start

### 1. **Start Backend Server**

```bash
cd moksha-backend
npm install
npm start
# Server runs on: http://localhost:5000
```

### 2. **Start Frontend**

```bash
npm install
npm run dev
# Website runs on: http://localhost:3000
```

### 3. **Login to Admin**

- URL: `http://localhost:3000/login`
- Email: `admin@mokshavoyage.com`
- Password: `Admin@123456`

---

## 📋 Admin Panel Sections

### **Dashboard**

- View statistics: Blogs, Services, Gallery items, Users, Payments, Revenue
- See recent payment activity
- Track website analytics

### **Blog Management** (`/admin/blog`)

**Features:**

- ✅ Create new blog posts
- ✅ Edit existing posts
- ✅ Delete posts
- ✅ Search posts by title/description
- ✅ Publish/Draft status

**What you can set:**

- Title, Description, Content
- Category, Cover Image
- Publication status (Published/Draft)

**Website Display:**

- Posts appear on `/blog` page immediately
- Featured posts get priority
- Search functionality works in real-time

### **Services Management** (`/admin/services`)

**Features:**

- ✅ Create service packages
- ✅ Edit pricing and details
- ✅ Add/change service images
- ✅ Delete services
- ✅ Activate/Deactivate services

**What you can set:**

- Service Name, Price (₹)
- Description and detailed information
- Category, Cover Image
- Active status

**Website Impact:**

- ✅ Services appear in dropdown on funeral/pandit pages
- ✅ Prices update in real-time
- ✅ "Book Now" buttons link to checkout with correct service ID
- ✅ Only active services show on website

### **Categories** (`/admin/categories`)

**Features:**

- ✅ Create content categories
- ✅ Edit category names and descriptions
- ✅ Delete unused categories
- ✅ Manage active status

**Website Impact:**

- Blog categories filter on blog page
- Service categories organize offerings

### **Gallery** (`/admin/gallery`)

**Features:**

- ✅ Upload/link gallery images
- ✅ Mark as Image or Video
- ✅ Add tags and descriptions
- ✅ Organize with search and filter
- ✅ Activate/Deactivate items

**Website Display:**

- Gallery appears on `/mokshagallery` page
- Video gallery appears on `/mokshavediogallery` page
- Only active items display

### **FAQ Management** (`/admin/faq`)

**Features:**

- ✅ Add questions and answers
- ✅ Categorize FAQs
- ✅ Reorder items (Up/Down buttons)
- ✅ Activate/Deactivate FAQs
- ✅ Edit and delete

**Categories Available:**

- General
- Services
- Payment
- Booking
- Technical

**Website Display:**

- FAQs shown on dedicated FAQ section
- Filter by category
- Collapsible accordion design
- Plus/Minus icons for expand/collapse

### **Hero Section** (`/admin/hero`)

**Features:**

- ✅ Set main heading and subheading
- ✅ Add hero image
- ✅ Create multiple slides (with mantras)
- ✅ Set trust badge text

**Website Impact:**

- Hero section updates on homepage
- Mantras with audio on slides
- Background images change immediately

### **Navigation** (`/admin/navbar`)

**Features:**

- ✅ Manage navigation menu items
- ✅ Add/remove menu links
- ✅ Set active status
- ✅ Organize menu order

### **Footer** (`/admin/footer`)

**Features:**

- ✅ Update footer text and links
- ✅ Add social media links
- ✅ Change footer image
- ✅ Set copyright information

### **About Section** (`/admin/about`)

**Features:**

- ✅ Edit about page content
- ✅ Upload about section image
- ✅ Add video embed
- ✅ Update description

---

## 💰 Payment Integration

### Setup

1. Admin panel already has Razorpay test credentials configured
2. Users can book services → Checkout page → Razorpay payment
3. Admin receives email notifications for each payment
4. Payment records visible in Admin Dashboard

### Payment Flow

```
Service Page (funeral, pandit, etc.)
    ↓
Click "खरीदें" (Buy Now)
    ↓
Checkout Page (shows service details)
    ↓
Fill form (name, email, phone)
    ↓
Razorpay Payment Modal
    ↓
Payment confirmation email
    ↓
Order tracked in Admin Dashboard
```

### Test Card for Payments

```
Card Number: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123
```

---

## 📧 Email Notifications

### Automated Emails Sent:

1. **Payment Confirmation** → Customer receives receipt
2. **Payment Notification** → Admin receives alert
3. **Contact Form Confirmation** → Inquiry acknowledgment
4. **OTP Email** → For future authentication

### Configuration

Update in `/moksha-backend/.env`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
ADMIN_NOTIFICATION_EMAIL=admin@mokshavoyage.com
```

---

## 🔄 Real-Time Data Sync

### How It Works

```
Admin Changes Data
    ↓
API Request to Backend
    ↓
MongoDB Database Updated
    ↓
Frontend Fetches Latest Data
    ↓
Website Automatically Updates
```

### Components with Live Updates

- ✅ Blog page → Shows latest blogs
- ✅ Services dropdown → Updated service list
- ✅ Gallery page → New images appear
- ✅ FAQ section → New FAQs visible
- ✅ Hero section → Image/text changes live
- ✅ Footer/Navbar → Navigation updates

---

## 🛡️ Security Features

1. **Admin Authentication**
   - Email/password login
   - JWT tokens for API security
   - Automatic logout after inactivity

2. **Data Protection**
   - Passwords hashed with bcrypt
   - Protected admin endpoints require authentication
   - CORS enabled for safe cross-origin requests

3. **Validation**
   - Server-side input validation
   - Field length limits
   - Special character sanitization

---

## 📱 Responsive Design

All admin pages are:

- ✅ Mobile-friendly
- ✅ Tablet optimized
- ✅ Desktop full-featured
- ✅ Touch-friendly buttons

---

## 🧪 Testing the Admin Panel

### Test 1: Add a Blog Post

1. Go to Admin → Blog
2. Click "Create New Blog Post"
3. Fill details and save
4. Visit `/blog` page → **Post appears immediately!**

### Test 2: Add a Service

1. Go to Admin → Services
2. Click "Create New Service"
3. Add name, price, description
4. Visit `/furalservices` → **Service appears in dropdown!**
5. Click "खरीदें" → Checkout shows your service!

### Test 3: Add FAQ

1. Go to Admin → FAQ
2. Click "Add New FAQ"
3. Fill question and answer
4. Visit FAQ section on website → **Question appears with collapsible answer!**

### Test 4: Update Hero

1. Go to Admin → Hero Section
2. Change heading/image
3. Refresh homepage → **Changes visible immediately!**

---

## ❌ Common Issues & Solutions

### Issue: "Backend not running"

**Solution:** Start backend with `npm start` in `moksha-backend` folder

### Issue: Services not showing in dropdown

**Solution:** Make sure service status is "Active" in admin panel

### Issue: Changes not appearing on website

**Solution:**

- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check browser console for errors

### Issue: Admin login fails

**Solution:** Verify credentials:

- Email: `admin@mokshavoyage.com`
- Password: `Admin@123456`

### Issue: Emails not sending

**Solution:** Update `.env` with valid Gmail credentials:

- Generate app password from Google Account settings
- Add to SMTP_PASS in .env

---

## 🎨 Customization

### Add New Service Categories

1. Go to Admin → Categories
2. Click "Create New Category"
3. Enter name and description
4. Services can now use this category

### Add New FAQ Categories

- Predefined: General, Services, Payment, Booking, Technical
- Edit in `/moksha-backend/models/FAQ.model.js` to add more

### Change Admin Colors

- Primary color: `#8B6A3E` (Moksha Bronze)
- Secondary: `#FDF8F2` (Light Cream)
- Edit in Tailwind classes in admin pages

---

## 📊 API Endpoints Reference

### Public APIs

```
GET  /api/blog              - Get all published blogs
GET  /api/blog/:id          - Get single blog
GET  /api/service           - Get all active services
GET  /api/gallery           - Get gallery items
GET  /api/faq               - Get all FAQs
GET  /api/category          - Get categories
```

### Admin APIs (Require Authentication)

```
POST   /api/blog            - Create blog
PUT    /api/blog/:id        - Update blog
DELETE /api/blog/:id        - Delete blog

POST   /api/service         - Create service
PUT    /api/service/:id     - Update service
DELETE /api/service/:id     - Delete service

POST   /api/faq             - Create FAQ
PUT    /api/faq/:id         - Update FAQ
DELETE /api/faq/:id         - Delete FAQ
```

---

## 🚀 Deployment

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email notifications

### Deployment Steps

1. Set environment variables in `.env`
2. Update CORS origins in `server.js`
3. Update `FRONTEND_URL` in backend config
4. Deploy backend to Heroku/Railway/Vercel
5. Deploy frontend to Vercel
6. Update API URLs in frontend code

---

## 📞 Support

For any issues or questions:

1. Check error messages in browser console
2. Check backend logs
3. Verify MongoDB connection
4. Confirm email credentials
5. Review this guide

---

**🎉 Your admin panel is now fully functional! Start managing your website content today!**
