# Moksha Voyage - Complete CMS Setup Guide

## 🎯 System Overview

This is a fully dynamic, admin-controlled CMS for a funeral services website. All content is managed through the admin panel with no hardcoded data.

## 📋 Quick Start

### 1. **Admin Login**

- **URL**: `http://localhost:3000/login`
- **Default Credentials**:
  - Email: `admin@mokshavoyage.com`
  - Password: `Admin@123456`

### 2. **Admin Dashboard**

- **URL**: `http://localhost:3000/admin/dashboard`
- View statistics, recent payments, analytics
- Quick access to all management panels

✅ **NOTE:** No more infinite refresh on dashboard! Auth checks are now properly optimized with client-side hydration handling.

### 3. **Key Admin Sections**

#### Blog Management

- **URL**: `/admin/blog`
- Create, edit, delete blog posts
- Manage categories and tags
- Publish/draft status control

#### Gallery Management

- **URL**: `/admin/gallery`
- Upload images and videos
- Organize by categories
- Drag-drop file upload support

#### Services Management

- **URL**: `/admin/services`
- Create service packages
- Set pricing and features
- Manage service categories

#### Categories

- **URL**: `/admin/categories`
- Create category hierarchy
- Parent-child relationships
- Used across blog, gallery, services

#### Website Content Settings

- **Navbar Settings** (`/admin/content/navbar`)
  - Logo text, navigation items
  - Colors and styling
- **Footer Settings** (`/admin/content/footer`)
  - Company info, contact details
  - Social media links
- **Hero Section** (`/admin/content/hero`)
  - Title, subtitle, CTA button
  - Background images

- **About Page** (`/admin/content/about`)
  - Content management
- **Contact Page** (`/admin/content/contact`)
  - Contact form settings

#### Settings & Configuration

- **General Settings** (`/admin/settings/general`)
  - Site name, timezone, etc.
- **Razorpay Payment** (`/admin/settings/razorpay`)
  - API keys management (secure)
  - Webhook configuration
- **Email Configuration** (`/admin/settings/email`)
  - SMTP settings
  - Email provider selection
  - SendGrid/Mailgun integration
- **Social Media** (`/admin/settings/social`)
  - Facebook, Twitter, Instagram links
  - WhatsApp, LinkedIn

#### Analytics & Monitoring

- **Payments** (`/admin/payments`)
  - Transaction history
  - Revenue tracking
  - Payment status management
- **Activity Log** (`/admin/activity-log`)
  - Admin action tracking
  - Audit trail
- **Users** (`/admin/users`)
  - User list and management

## 🔧 Technical Stack

### Frontend

- **Next.js 13+** (App Router)
- **React Hooks** for state management
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Icons** for UI icons

### Backend (When Connected)

- **Express.js** with MongoDB
- **JWT** authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **Sharp** for image processing

### API Routes (Next.js)

All API routes are in `/app/api/`:

- `/api/auth/login` - Admin login
- `/api/auth/verify` - Token verification
- `/api/auth/logout` - Logout
- `/api/blog` - Blog management
- `/api/blog/[id]` - Single blog operations
- `/api/gallery` - Gallery items
- `/api/service` - Services
- `/api/service/[id]` - Single service
- `/api/category` - Categories
- `/api/settings` - Site settings
- `/api/analytics/dashboard-stats` - Dashboard stats
- `/api/contact` - Contact form
- `/api/payments` - Payment tracking

## 🛠️ How to Use the Admin Panel

### Adding a Blog Post

1. Go to `/admin/blog`
2. Click "Create Post"
3. Fill in:
   - Title (auto-generates slug)
   - Description
   - Content
   - Category
   - Meta tags for SEO
4. Choose status: Draft or Published
5. Click Save

### Managing Gallery

1. Go to `/admin/gallery`
2. Click "Upload"
3. Drag & drop or select images/videos
4. Assign to categories
5. Add titles and descriptions
6. Publish

### Creating Services

1. Go to `/admin/services`
2. Click "Create Service"
3. Enter:
   - Service name
   - Description
   - Price (in INR)
   - Features list
   - Category
4. Upload service image
5. Add SEO metadata
6. Save

### Configuring Website Content

1. Go to `/admin/content`
2. Select section (navbar, footer, hero, etc.)
3. Edit content and styling
4. Changes reflect on frontend immediately

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected admin routes
- ✅ Activity logging for all changes
- ✅ Secure API endpoints
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Input validation

## 📱 Responsive Design

All pages are fully responsive:

- Desktop: Full sidebar navigation
- Tablet: Collapsible sidebar
- Mobile: Bottom menu / mobile drawer

## 🎨 Color Scheme

- Primary: `#8B6A3E` (Bronze)
- Dark: `#2C1810` (Dark Brown)
- Medium: `#5A3E2B` (Medium Brown)
- Light: `#F5E9D9` (Cream)

## 🚀 Deployment

### Frontend

```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Backend (When using Express)

```bash
cd moksha-backend
npm install
npm run dev
```

## 📊 API Response Format

All API endpoints follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    /* actual data */
  }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

## 🔄 Data Flow

1. **Admin makes change** in admin panel
2. **Frontend submits** to API route
3. **API route** processes (mock or connects to backend)
4. **Data stored** in database
5. **Frontend page fetches** latest data
6. **Website updates** automatically

## 📝 Environment Variables

Create `.env.local` in root:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

## 🐛 Troubleshooting

### 404 Errors

- Ensure API routes exist in `/app/api/`
- Check route parameter names match
- Verify middleware configuration

### Network Errors

- Check CORS configuration
- Verify backend is running
- Check browser console for details
- Ensure fetch URLs are correct

### Auth Errors

- Clear localStorage and retry login
- Check token expiration
- Verify JWT_SECRET matches

### Styling Issues

- Clear `.next` folder
- Restart development server
- Check Tailwind CSS configuration

## 📞 Support

For issues or questions:

1. Check the documentation
2. Review error messages in console
3. Check API response in Network tab
4. Verify all files are created

## ✅ Checklist for Full Setup

- [ ] Admin can log in with credentials
- [ ] Dashboard loads with stats
- [ ] Can create blog post
- [ ] Can upload gallery image
- [ ] Can create service
- [ ] Can manage categories
- [ ] Can update website content
- [ ] Can configure settings
- [ ] Activity log shows actions
- [ ] Payment transactions visible
- [ ] Email settings configured
- [ ] Razorpay keys stored securely

## 🎉 You're All Set!

The complete CMS is now ready to use. All data is dynamic and controlled from the admin panel.

**Start by logging in and creating your first content!**
