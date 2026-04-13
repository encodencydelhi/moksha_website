# 🔍 Complete System Verification Guide

## Moksha Voyage - Admin Data to Website Flow

---

## ✅ Prerequisites Check

Before starting, ensure you have:

- [ ] MongoDB running locally (`mongodb://localhost:27017/moksha_voyage`)
- [ ] Node.js v14+ installed
- [ ] Backend dependencies installed (`npm install` in moksha-backend)
- [ ] Frontend dependencies installed (`npm install` in root)

---

## 📋 Part 1: Backend Setup & Configuration

### Step 1.1: Verify Environment Variables

**File:** `/moksha-backend/.env`

```env
# MongoDB connection
MONGO_URI=mongodb://localhost:27017/moksha_voyage

# Server env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRE=30d

# Email Configuration (IMPORTANT FOR NOTIFICATIONS)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SECURE=false
FROM_NAME=Moksha Voyage
FROM_EMAIL=noreply@mokshavoyage.com
ADMIN_NOTIFICATION_EMAIL=admin@mokshavoyage.com

# Payment keys (REAL RAZORPAY CREDENTIALS)
RAZORPAY_KEY_ID=rzp_test_RTd9y3ngRanKxq
RAZORPAY_KEY_SECRET=bxH0R4Mbz5x3lC7XMWPezN4m
```

**Required Actions:**

- [ ] Update `SMTP_USER` with your Gmail address
- [ ] Generate Gmail App Password and add to `SMTP_PASS`
- [ ] Verify Razorpay keys are correct

### Step 1.2: Setup Email (SMTP) for Notifications

**Gmail Setup Instructions:**

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Create App Password for "Mail" and "Windows Computer"
4. Copy the generated 16-character password
5. Paste it in `.env` as `SMTP_PASS`

**Test Email Configuration:**

```bash
cd moksha-backend

# Start MongoDB in another terminal
mongod

# Run backend
npm run dev
```

Visit: `http://localhost:5000/api/health`
Expected Response: `{"success": true, "message": "Server running"}`

### Step 1.3: Seed Database with Initial Data

```bash
npm run seed
```

**Expected Output:**

```
✅ MongoDB Connected
✅ Admin created: admin@mokshavoyage.com
✅ Services seeded: 8 items
✅ Categories seeded: 5 items
✅ Gallery items seeded: 12 items
✅ Settings initialized
```

---

## 🔐 Part 2: Admin Authentication Verification

### Step 2.1: Test Admin Login

**Endpoint:** `POST /api/auth/login`

**Request:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mokshavoyage.com",
    "password": "Admin@123456"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Super Admin",
    "email": "admin@mokshavoyage.com",
    "role": "superadmin",
    "avatar": null
  }
}
```

### Step 2.2: Verify Token

**Endpoint:** `GET /api/auth/me`

**Request:**

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**

```json
{
  "success": true,
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Super Admin",
    "email": "admin@mokshavoyage.com",
    "role": "superadmin"
  }
}
```

- [ ] Login successful
- [ ] Token received
- [ ] Token verification works

---

## 📱 Part 3: Frontend Login & Dashboard

### Step 3.1: Start Frontend

```bash
# In root directory (not moksha-backend)
npm run dev
```

Expected: App runs on `http://localhost:3000`

### Step 3.2: Admin Login Page Test

1. Navigate to: `http://localhost:3000/login`
2. Enter credentials:
   - Email: `admin@mokshavoyage.com`
   - Password: `Admin@123456`
3. Click Login

**Expected Results:**

- [ ] Form validates input
- [ ] Submit button shows loading spinner
- [ ] Redirects to `/admin/dashboard`
- [ ] Token saved to localStorage (check DevTools → Storage)

### Step 3.3: Dashboard Verification

Navigate to: `http://localhost:3000/admin/dashboard`

**Check these elements:**

- [ ] Admin name displays in header
- [ ] Sidebar loads with all menu items
- [ ] Stats cards load with data:
  - Total Blogs
  - Total Services
  - Total Gallery Items
  - Total Users
  - Total Payments
  - Total Revenue
- [ ] Recent Payments table displays data
- [ ] No 404 errors in console

**Console Check:**
Open DevTools → Console, should see NO red errors.

---

## 🛍️ Part 4: Dynamic Content Management (Admin → Website)

### Step 4.1: Update Service via Admin

**API Endpoint:** `PUT /api/service/{id}`

```bash
curl -X PUT http://localhost:5000/api/service/{SERVICE_ID} \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Funeral Service",
    "description": "Premium funeral service with all facilities",
    "price": 15000,
    "features": ["Professional staff", "Transport", "Rituals guidance"]
  }'
```

### Step 4.2: Verify Frontend Shows Updated Data

1. Go to: `http://localhost:3000/ambulanceservices` (or service page)
2. Check if updated service name/description appears
3. Refresh page and verify data persists

**Expected:** Service details match what admin updated

### Step 4.3: Update Settings (Logo, Footer, etc.)

**API Endpoint:** `POST /api/settings`

```bash
curl -X POST http://localhost:5000/api/settings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "footer_email",
    "value": "newemail@moksha.com",
    "type": "string",
    "section": "footer"
  }'
```

### Step 4.4: Verify Footer Updates

1. Go to: `http://localhost:3000/`
2. Scroll to footer
3. Check if new email appears

**Expected:** Footer shows updated email from database

- [ ] Services update dynamically
- [ ] Settings reflect on website
- [ ] No hardcoded values in UI
- [ ] Changes persist after page refresh

---

## 💳 Part 5: Razorpay Payment Integration

### Step 5.1: Verify Razorpay Keys

**File:** Check `/moksha-backend/.env`

```
RAZORPAY_KEY_ID=rzp_test_RTd9y3ngRanKxq
RAZORPAY_KEY_SECRET=bxH0R4Mbz5x3lC7XMWPezN4m
```

### Step 5.2: Test Payment Order Creation

**Endpoint:** `POST /api/payment/create-order`

```bash
curl -X POST http://localhost:5000/api/payment/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "serviceId": "SERVICE_MONGODB_ID",
    "amount": 100,
    "email": "customer@example.com",
    "phone": "+919876543210",
    "name": "John Doe",
    "description": "Funeral Service Premium"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "order": {
    "id": "order_XXXXXXXXX",
    "amount": 10000,
    "currency": "INR",
    "paymentId": "60d5ec49c1234567890abcd",
    "key_id": "rzp_test_RTd9y3ngRanKxq"
  }
}
```

### Step 5.3: Frontend Payment Page Integration

Create/Update file: `/app/checkout/page.tsx`

```tsx
"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Create order
      const orderRes = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId: "YOUR_SERVICE_ID",
            amount: 100,
            email: "test@example.com",
            phone: "+919876543210",
            name: "Test User",
            description: "Test Service",
          }),
        },
      );

      const orderData = await orderRes.json();

      if (!orderData.success) throw new Error("Order creation failed");

      // Load Razorpay
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const options = {
          key: orderData.order.key_id,
          amount: orderData.order.amount,
          currency: orderData.order.currency,
          order_id: orderData.order.id,
          handler: async (response) => {
            // Verify payment
            const verifyRes = await fetch(
              "http://localhost:5000/api/payment/verify",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              },
            );

            const result = await verifyRes.json();
            if (result.success) {
              alert("✓ Payment successful! Check your email for receipt.");
            } else {
              alert("Payment verification failed");
            }
          },
          prefill: {
            email: "test@example.com",
            contact: "+919876543210",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Test Payment</h1>
      <p>Amount: ₹100</p>
      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#8B6A3E",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay with Razorpay"}
      </button>
    </div>
  );
}
```

### Step 5.4: Test Payment Flow

1. Open: `http://localhost:3000/checkout`
2. Click "Pay with Razorpay"
3. Use test card: `4111 1111 1111 1111`
4. Any future date and any CVV
5. Complete payment

**Expected Results:**

- [ ] Razorpay form opens
- [ ] Payment processes
- [ ] Success message appears
- [ ] Check email for payment confirmation

---

## 📧 Part 6: Email Notifications Verification

### Step 6.1: Check Email Service Configuration

**File:** `/moksha-backend/services/email.service.js`

Verify these functions exist:

- [ ] `sendPaymentConfirmation()` - Customer receipt
- [ ] `sendPaymentNotificationToAdmin()` - Admin alert
- [ ] `sendEnquiryConfirmation()` - Contact form confirmation
- [ ] `sendOtpEmail()` - OTP delivery

### Step 6.2: Test Email on Payment Success

After completing payment:

1. **Check Customer Email:**
   - Inbox should have: "✓ Payment Confirmed - Moksha Voyage"
   - Email contains:
     - [ ] Transaction ID
     - [ ] Payment ID
     - [ ] Amount Paid
     - [ ] Service Name
     - [ ] Date & Time
     - [ ] Branded footer with team info

2. **Check Admin Email:**
   - Inbox should have: "🔔 New Payment Received - [Customer Name]"
   - Email contains:
     - [ ] Customer details
     - [ ] Amount
     - [ ] Service info
     - [ ] "View in Dashboard" link

### Step 6.3: Test Contact Form Email

1. Go to: `http://localhost:3000/contact`
2. Fill form and submit
3. Check:
   - [ ] Customer receives confirmation email
   - [ ] Admin receives notification

### Step 6.4: Email Template Verification

**Customer Payment Email should include:**

```
✓ Payment Confirmed
- Transaction details table
- Service information
- "What's Next?" section
- Contact information
```

**Admin Payment Email should include:**

```
🔔 New Payment Received
- Customer details table
- Payment confirmation
- "View in Dashboard" button
```

---

## 🔄 Part 7: Data Sync Flow Testing

### Complete End-to-End Test

**Scenario:** Admin updates service price → Website shows new price

**Steps:**

1. **Admin Updates Service**
   - Go to: `http://localhost:3000/admin/blog` (or relevant section)
   - Edit a service
   - Change price from 10,000 to 15,000
   - Save

2. **Verify Database Update**

   ```bash
   # Connect to MongoDB
   mongosh mongodb://localhost:27017/moksha_voyage
   db.services.findOne()
   # Check if price = 15000
   ```

3. **Verify Website Update**
   - Go to service page
   - Refresh
   - Check if price shows 15,000
   - No 404 errors in console

4. **Check Logs**
   - Backend logs should show API call
   - Frontend console should show fetch success

**Result:**

- [ ] Data flows: Admin Input → MongoDB → Frontend Display
- [ ] No hardcoded values
- [ ] Changes instant after save

---

## ⚠️ Part 8: Error Handling Verification

### Test 404 Prevention

1. **Stop Backend Temporarily**
   - Kill backend server (Ctrl+C)
2. **Visit Website**
   - Components should NOT crash
   - Should show cached data or fallback UI
   - No visible errors to users

3. **Restart Backend**
   - Website should sync with database again

**Result:**

- [ ] Graceful degradation
- [ ] No user-facing 404 errors
- [ ] Fallback data prevents crashes

---

## 📊 Part 9: Admin Panel Verification Checklist

### Check All Admin Pages Load Without 404

```
Dashboard: /admin/dashboard
├─ ✓ Stats load
├─ ✓ Charts render
└─ ✓ No API errors

Blog: /admin/blog
├─ ✓ List loads
├─ ✓ Create works
├─ ✓ Edit works
└─ ✓ Delete works

Gallery: /admin/gallery
├─ ✓ Images load
├─ ✓ Upload works
└─ ✓ Management works

Services: /admin/services
├─ ✓ List loads
├─ ✓ CRUD operations work
└─ ✓ Email triggered on purchase

Settings: /admin/settings
├─ ✓ General settings save
├─ ✓ Email config updates
└─ ✓ Razorpay keys saved

Payments: /admin/payments
├─ ✓ List shows transactions
├─ ✓ Status updates work
└─ ✓ Admin email notifications received

Analytics: /admin/analytics
├─ ✓ Stats display
├─ ✓ Charts render
└─ ✓ Data refreshes
```

---

## 🚀 Part 10: Go-Live Checklist

Before deploying to production:

### Backend

- [ ] All environment variables configured
- [ ] Database backups enabled
- [ ] Email service tested and working
- [ ] Razorpay production keys set
- [ ] Error logging enabled
- [ ] Rate limiting configured
- [ ] CORS properly configured

### Frontend

- [ ] API calls use backend domain (not localhost)
- [ ] Error boundaries implemented
- [ ] Loading states show
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Images optimized
- [ ] Analytics tracking added

### Security

- [ ] HTTPS enabled
- [ ] JWT tokens validated
- [ ] CORS whitelist updated
- [ ] Admin endpoints protected
- [ ] Input sanitization enabled
- [ ] No sensitive data in code

### Testing

- [ ] Full payment flow tested
- [ ] Email notifications working
- [ ] Admin all CRUD operations
- [ ] User frontend functions
- [ ] Mobile compatibility
- [ ] Browser compatibility

---

## 📞 Troubleshooting

### Email Not Sending

**Solution:**

```bash
# 1. Check Gmail app password (16 chars)
# 2. Enable "Less secure app access"
# 3. Verify SMTP settings in .env
# 4. Test with: npm test -- --email
```

### Payment Not Processing

**Solution:**

```bash
# 1. Verify Razorpay keys
# 2. Check MongoDB payment record
# 3. Validate signature verification
# 4. Check backend logs for errors
```

### Frontend Not Getting Data

**Solution:**

```bash
# 1. Check backend is running (port 5000)
# 2. Verify CORS allowed
# 3. Check browser console for fetch errors
# 4. Verify API endpoint URLs
```

### MongoDB Connection Error

**Solution:**

```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas
# Update MONGO_URI=mongodb+srv://user:pass@cluster...
```

---

## 📝 Final Verification Summary

Complete these checks:

- [ ] ✅ Backend running and connected to MongoDB
- [ ] ✅ Admin can login with credentials
- [ ] ✅ Dashboard displays data without errors
- [ ] ✅ Services update dynamically (admin → website)
- [ ] ✅ Payment flow works end-to-end
- [ ] ✅ Customer gets confirmation email
- [ ] ✅ Admin gets notification email
- [ ] ✅ All admin pages load without 404
- [ ] ✅ Contact form submits and sends email
- [ ] ✅ No hardcoded data in components
- [ ] ✅ Responsive design works on mobile
- [ ] ✅ Error handling is graceful

**If all checked:** ✅ System is READY FOR PRODUCTION!

---

## 📧 Support & Documentation

**Admin Credentials:**

```
Email: admin@mokshavoyage.com
Password: Admin@123456
```

**API Base URL:** `http://localhost:5000`

**Frontend URL:** `http://localhost:3000`

**Razorpay Test Cards:**

- Success: `4111 1111 1111 1111`
- Any future date, any CVV

---

**Last Updated:** April 1, 2026
**Version:** 1.0.0 - Complete Production Ready
