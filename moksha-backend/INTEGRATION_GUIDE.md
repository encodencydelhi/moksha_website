# Moksha Voyage - Backend Integration Guide

## 🗂️ File Structure

```
moksha-backend/           ← Backend (Node.js + Express + MongoDB)
frontend-integration/     ← Drop-in files for your Next.js frontend
  lib/api.ts              → Copy to: your-nextjs-app/lib/api.ts
  hooks/useMoksha.ts      → Copy to: your-nextjs-app/hooks/useMoksha.ts
  CONTACT_INTEGRATION.ts  → Read instructions inside
```

---

## ⚙️ Backend Setup

### 1. Install dependencies

```bash
cd moksha-backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
```

### 3. Start server

```bash
# Development
npm run dev

# Production
npm start
```

The server auto-seeds:

- Admin account
- Default settings
- All 8 service pages
- All component data (Hero, Topbar, Navbar, SideIcons, etc.)
- Sample blog posts

**Default admin login:**

- Email: `admin@mokshavoyage.com`
- Password: `Admin@123456`
- ⚠️ Change this after first login!

---

## 🔗 Frontend Integration (Zero UI Changes)

### Step 1: Add environment variable

In your Next.js app, add to `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 2: Copy integration files

```bash
# Copy to your Next.js project
cp frontend-integration/lib/api.ts your-nextjs-app/lib/api.ts
cp frontend-integration/hooks/useMoksha.ts your-nextjs-app/hooks/useMoksha.ts
```

### Step 3: Connect each component

#### Topbar.tsx

```tsx
import { useTopbar } from "@/hooks/useMoksha";

export default function TopInfoBar() {
  const { email, phone, audioPlaylist } = useTopbar();
  // Replace hardcoded: "info@mokshayatra.org" → email
  // Replace hardcoded: "+91 96549 00525" → phone
  // Replace hardcoded playlist array → audioPlaylist.map(a => a.file)
}
```

#### Hero.tsx

```tsx
import { useHero } from "@/hooks/useMoksha";

export default function Hero() {
  const { images, getSlideMantras, heroTrustBadge } = useHero();
  // Replace hardcoded images array → images
  // Replace shlokas.json import → getSlideMantras()
  // Replace "TRUSTED SINCE 2005" → heroTrustBadge
}
```

#### Sideicon.tsx

```tsx
import { useSideIcons } from "@/hooks/useMoksha";

const SocialSidebar = () => {
  const { sideIcons, phoneLink, emailLink, trackClick } = useSideIcons();
  // Replace hardcoded socialLinks array → sideIcons
  // Add onClick={() => trackClick(icon.platform)} to each link
  // Replace hardcoded phone/email → phoneLink / emailLink
};
```

#### Contact.tsx (handleSubmit only)

```tsx
import { contactApi } from "@/lib/api";

// Replace the mock setTimeout in handleSubmit with:
await contactApi.submit({
  firstName,
  lastName,
  email,
  phone,
  subject,
  message,
});
```

#### Footer.tsx

```tsx
import { useSettings } from "@/hooks/useMoksha";

export default function Footer() {
  const { settings } = useSettings();
  // Replace hardcoded social hrefs → settings?.socialLinks?.facebook etc.
  // Replace "info@mokshavoyage.com" → settings?.contactEmail
  // Replace "+91 123 456 7890" → settings?.contactPhone
  // Replace "Delhi NCR" → settings?.businessAddress
}
```

#### Service Pages (Ambulance, Pandit, etc.)

```tsx
import { useServicePage } from "@/hooks/useMoksha";

function AmbulanceServices() {
  const { service, loading } = useServicePage("ambulanceservices");
  // Replace hardcoded ambulanceServices array → service?.subServices
  // Replace hardcoded heroTitle → service?.heroTitle
  // Replace hardcoded officeLocations → service?.officeLocations
}
```

#### Blog.tsx

```tsx
import { useBlog } from "@/hooks/useMoksha";

// Replace hardcoded blog posts → blogs from useBlog()
```

#### Mokshagallery / Mokshavideogallery

```tsx
import { useGallery, useVideoGallery } from "@/hooks/useMoksha";
```

#### Analytics tracking (add to each page)

```tsx
import { usePageTracker } from "@/hooks/useMoksha";

export default function HomePage() {
  usePageTracker("home"); // tracks visits automatically
}
```

---

## 🛡️ Admin Panel APIs

All admin APIs require `Authorization: Bearer <token>` header.

### Authentication

| Method | Endpoint                  | Description     |
| ------ | ------------------------- | --------------- |
| POST   | /api/auth/login           | Admin login     |
| GET    | /api/auth/me              | Get profile     |
| POST   | /api/auth/refresh         | Refresh token   |
| POST   | /api/auth/logout          | Logout          |
| PUT    | /api/auth/update-password | Change password |

### Settings

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| GET    | /api/settings               | Get public settings    |
| PUT    | /api/settings               | Update all settings    |
| PUT    | /api/settings/social        | Update social links    |
| PUT    | /api/settings/payment       | Update payment keys    |
| PUT    | /api/settings/email         | Update SMTP config     |
| GET    | /api/settings/whatsapp-link | Get WhatsApp deep link |

### Components (CMS)

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| GET    | /api/components/hero      | Hero slides + mantras  |
| PUT    | /api/components/hero      | Update hero (admin)    |
| GET    | /api/components/topbar    | Topbar data            |
| GET    | /api/components/navbar    | Navbar items           |
| GET    | /api/components/sideicons | Social sidebar icons   |
| GET    | /api/components/:key      | Any component by key   |
| PUT    | /api/components/:key      | Update any component   |
| POST   | /api/components/bulk      | Fetch multiple at once |

**Component Keys:**

- `hero` — Hero slider + mantras
- `topbar` — Top bar links/email/phone
- `navbar` — Navigation items
- `sideicons` — Floating social sidebar
- `compassionsection` — Our Mission section
- `mantrasection` — Sanskrit shloka section
- `servingsection` — Who We Serve section
- `howwehelp` — How We Help cards
- `sacredjourney` — Sacred Journey section
- `testimonials` — Testimonials
- `faqs` — FAQs
- `mokshagallery` — Image gallery
- `mokshavideogallery` — Video gallery

### Services

| Method | Endpoint                                | Description           |
| ------ | --------------------------------------- | --------------------- |
| GET    | /api/services                           | All services (public) |
| GET    | /api/services/:pageKey                  | Service by page key   |
| PUT    | /api/services/:pageKey                  | Update service        |
| POST   | /api/services/:pageKey/sub-services     | Add sub-service       |
| PUT    | /api/services/:pageKey/sub-services/:id | Update sub-service    |
| DELETE | /api/services/:pageKey/sub-services/:id | Delete sub-service    |

**Service pageKeys:**
`furalservices`, `furaldecoration`, `panditservices`, `ambulanceservices`,
`harsevanservices`, `prayerhallservices`, `specialservices`, `callingrelativesservices`

### Enquiries

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | /api/contact       | Submit form (public)  |
| GET    | /api/contact       | All enquiries (admin) |
| GET    | /api/contact/stats | Enquiry stats         |
| PUT    | /api/contact/:id   | Mark read/resolved    |
| DELETE | /api/contact/:id   | Delete enquiry        |

### Payments

| Method | Endpoint                            | Description             |
| ------ | ----------------------------------- | ----------------------- |
| GET    | /api/payments/config                | Gateway public config   |
| POST   | /api/payments/razorpay/create-order | Create Razorpay order   |
| POST   | /api/payments/razorpay/verify       | Verify Razorpay payment |
| POST   | /api/payments/razorpay/webhook      | Razorpay webhook        |
| POST   | /api/payments/stripe/create-intent  | Stripe payment intent   |
| POST   | /api/payments/stripe/webhook        | Stripe webhook          |
| GET    | /api/payments                       | All payments (admin)    |

### Analytics

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| POST   | /api/analytics/track  | Track page visit |
| GET    | /api/analytics        | Dashboard data   |
| GET    | /api/analytics/visits | Visit logs       |

### Social Clicks

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| POST   | /api/social-clicks/track | Track click          |
| GET    | /api/social-clicks       | All counters (admin) |
| GET    | /api/social-clicks/today | Today's stats        |

---

## 🗄️ MongoDB Collections

| Collection          | Purpose                                 |
| ------------------- | --------------------------------------- |
| admins              | Admin accounts                          |
| settings            | Global site configuration               |
| components          | All component data (hero, navbar, etc.) |
| services            | 8 service pages with sub-services       |
| pages               | CMS pages with sections                 |
| enquiries           | Contact form submissions                |
| payments            | Payment transactions                    |
| visits              | Page visit analytics                    |
| analyticsummaries   | Daily aggregated stats                  |
| socialclicks        | Social click logs                       |
| socialclickcounters | Platform click totals                   |
| blogs               | Blog posts                              |

---

## 🔐 Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt (12 rounds)
- Rate limiting (200 req/15min, 10 login attempts/15min)
- MongoDB injection sanitization
- Helmet.js security headers
- CORS restricted to frontend URL
- Input validation on all routes
- File type validation for uploads

---

## 📧 Email Setup (Admin Panel)

1. Go to Settings → Email Config in admin
2. Enter your SMTP details:
   - Host: smtp.gmail.com (for Gmail)
   - Port: 587
   - User: your@gmail.com
   - Pass: your-app-password
3. Enable email and save
4. Confirmation emails will auto-send on enquiry submissions

---

## 💳 Payment Setup (Admin Panel)

### Razorpay

1. Settings → Payment → Razorpay
2. Enter Key ID and Key Secret from Razorpay dashboard
3. Enable Razorpay
4. Add webhook: `https://yourdomain.com/api/payments/razorpay/webhook`

### Stripe

1. Settings → Payment → Stripe
2. Enter Public Key and Secret Key
3. Enable Stripe
4. Add webhook: `https://yourdomain.com/api/payments/stripe/webhook`
