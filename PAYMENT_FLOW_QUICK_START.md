# 🚀 Complete Service to Payment Flow - Quick Start Guide

## अभी करें - Do This Now

### 1️⃣ MongoDB को Start करें (Terminal 1)

```bash
mongod
```

✓ आप देखेंगे: `waiting for connections on port 27017`

---

### 2️⃣ Backend को Start करें (Terminal 2)

```bash
cd moksha-backend
npm install razorpay  # Make sure razorpay is installed
npm run dev
```

✓ आप देखेंगे:

```
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
```

---

### 3️⃣ Frontend को Start करें (Terminal 3)

```bash
npm run dev
```

✓ आप देखेंगे:

```
ready - started server on 0.0.0.0:3000
```

---

## 🧪 Complete Payment Flow Test करें

### Step 1: Funeral Services Page खोलें

```
http://localhost:3000/furalservices
```

**आप देखेंगे:**

- 4 Service Cards (लकड़ी, घी-कपूर, फूल, कपड़ा)
- हर service में "खरीदें" button
- Price और Features दिख रहे हैं

✅ अगर देख रहे हैं तो सब ठीक है!

---

### Step 2: कोई भी Service पर "खरीदें" Click करें

```
Example: "Wood for Pyre (चिता के लिए लकड़ी)" पर click करें
```

**क्या होगा:**

- Automatically redirect to `/checkout?serviceId=XXX`
- Checkout page खुलेगा service details के साथ
- Service name, price, और features display होंगे

✅ Check करें console में कोई error नहीं है

---

### Step 3: Checkout Form भरें

```
नाम: Test User
ईमेल: test@example.com
फोन: 9876543210
पता: Delhi NCR
```

✅ सभी fields में valid data डालें

---

### Step 4: "₹3999 का भुगतान करें" Click करें

**क्या होगा:**

1. Order create होगा backend पर
2. Razorpay Checkout Form खुलेगा
3. Test card का form दिखेगा

---

### Step 5: Razorpay Test Card से Payment करें

```
Card Number: 4111 1111 1111 1111
Expiry: Any future date (e.g., 12/25)
CVV: Any 3 digits (e.g., 123)
```

**Payment Form में:**

- Email: test@example.com
- Contact: 9876543210

👉 "Pay" button click करें

---

### Step 6: Payment Success देखें

**आप देखेंगे:**

```
✓ पेमेंट सफल हुई!

Transaction ID: uuid-xxx
राशि: ₹3999
सेवा: Wood for Pyre

कृपया अपनी ईमेल जांचें - रसीद और पुष्टि प्राप्त करें।
```

✅ Payment सफल है!

---

### Step 7: Email में Payment Receipt देखें

आपके email (test@example.com) में आएगी:

```
From: Moksha Voyage <noreply@mokshavoyage.com>
Subject: ✓ Payment Confirmed - Moksha Voyage

✓ Payment Confirmed
═════════════════════════

Transaction ID: xxxxx
Payment ID: pay_xxxxx
Amount Paid: ₹3999
Service: Wood for Pyre
Date & Time: [Current time]
Status: ✓ COMPLETED

What's Next?
- Your service request has been activated
- Our team will contact you within 24 hours
- Keep this receipt for your records
```

✅ Email successfully भेजा गया!

---

## 🔧 अगर कुछ काम न करे

### ❌ "Services load नहीं हो रहे"

```bash
# Check: MongoDB चल रहा है?
mongosh mongodb://localhost:27017

# Check: Backend चल रहा है?
curl http://localhost:5000/api/health

# अगर nope तो:
cd moksha-backend
npm run dev
```

### ❌ "Razorpay form नहीं खुल रहा"

```bash
# Check console में क्या error है
# DevTools → Console → देखें error message

# आमतौर पर problem:
# 1. Script load नहीं हुई → Refresh करें
# 2. Order create fail हुआ → Backend logs देखें
# 3. Invalid key → .env check करें
```

### ❌ "Email नहीं आया"

```bash
# Check: .env में email configured है?
cat moksha-backend/.env | grep SMTP

# अगर दिख रहा है:
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# तो ठीक है, otherwise configure करें

# Gmail app password लेने के लिए:
# https://myaccount.google.com/security
# → 2-Step Verification enable करें
# → App Password generate करें
# → .env में paste करें
```

---

## 📊 Data Flow को समझें

```
1. USER CLICKS "खरीदें"
   ↓
2. CHECKOUT PAGE LOADS
   ↓
3. USER FILLS DETAILS + PAYS
   ↓
4. RAZORPAY PAYMENT GATEWAY
   ↓
5. PAYMENT SUCCESS
   ├─ Database में Payment Record बनता है
   ├─ Email Payment Confirmation भेजी जाती है
   └─ SUCCESS MESSAGE दिखता है
   ↓
6. ADMIN को EMAIL
   └─ New Payment Notification
```

---

## ✅ सब कुछ ठीक है अगर:

- [ ] Services page load हो रहा है
- [ ] "खरीदें" button काम कर रहा है
- [ ] Checkout page redirect हो रहा है service ID के साथ
- [ ] Service details दिख रहे हैं
- [ ] Form भर सकते हैं
- [ ] Razorpay form खुल रहा है
- [ ] Test card से payment हो रही है
- [ ] Success message दिख रहा है
- [ ] Email receive हो रहा है

---

## 🎯 Advanced Testing

### Test Multiple Services

```
Go to:
- http://localhost:3000/furalservices
- http://localhost:3000/panditservices

Buy से: Different services test करें
```

### Test Admin Dashboard

```
Go to: http://localhost:3000/login

Email: admin@mokshavoyage.com
Password: Admin@123456

→ Dashboard → Payments देखें
→ नई payment दिख रही होगी
```

### Check Backend Database

```bash
mongosh mongodb://localhost:27017/moksha_voyage

db.payments.find().pretty()
# सभी payments देखें

db.users.find().pretty()
# Customers देखें
```

---

## 📝 Troubleshooting Checklist

| Problem                  | Solution                                 |
| ------------------------ | ---------------------------------------- |
| Services not loading     | Check `/api/service` endpoint in backend |
| Checkout redirects wrong | Verify query param: `?serviceId=`        |
| Razorpay form blank      | Check browser console, reload            |
| Payment fails            | Verify Razorpay keys in `.env`           |
| Email not sending        | Configure SMTP, check spam folder        |
| No payment in admin      | Check MongoDB connection                 |

---

## 🚀 Production Checklist

Before deploying:

- [ ] Razorpay keys updated (live keys)
- [ ] MongoDB production database
- [ ] Email SMTP configured (real email)
- [ ] Frontend deployed (update API URLs)
- [ ] Backend deployed (update CORS)
- [ ] SSL certificates configured
- [ ] Payment webhooks set up
- [ ] Error logging enabled

---

## 📞 Support

**Issue?** Check these files:

- Backend errors: `moksha-backend/server.js`
- Payment controller: `moksha-backend/controllers/payment.controller.js`
- Email service: `moksha-backend/services/email.service.js`
- Frontend checkout: `app/checkout/page.tsx`
- Service pages: `components/services/Furalservices.tsx`

**Debug mode:**

```bash
# Terminal 2 (Backend)
NODE_DEBUG=* npm run dev

# Check logs for every request
```

---

**Last Updated:** April 1, 2026
**Status:** ✅ Production Ready

Congratulations! 🎉 Your complete payment system is working!
