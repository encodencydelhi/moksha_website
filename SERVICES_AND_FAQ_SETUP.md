# Services और FAQ Setup Guide

## ✅ समस्या समाधान किया गया

### 1. Services List ❌ → ✅ Fixed

**समस्या:** Checkout पेज पर "सेवा चुनें" dropdown में कोई सेवा नहीं दिख रही थी

**समाधान:** सभी 8 सेवाएं database में add कर दी गई हैं:

- Ambulance Services - ₹500
- Pandit Services - ₹1000
- Prayer Hall Services - ₹800
- Funeral Services - ₹2000
- Fural Decoration - ₹1500
- Harsewan Services - ₹1200
- Calling Relatives - ₹300
- Special Services - ₹2500

**अब करें:**

1. http://localhost:3000/checkout पर जाएं
2. "सेवा चुनें" dropdown में सभी सेवाएं दिखेंगी
3. कोई भी सेवा चुनकर payment test करें

---

## 2. FAQ System ✅ Ready

**Status:** Complete FAQ system बनाया जा चुका है

**Features:**

- ✅ Backend FAQ Model, Controller, Routes
- ✅ Admin FAQ Management Page (`/admin/faq`)
- ✅ Website में FAQ Section (Homepage पर)
- ✅ Collapsible Q&A with Plus/Minus icons
- ✅ Category Filtering
- ✅ Real-time updates

**अब करें:**

1. Admin panel पर जाएं: http://localhost:3000/admin/faq
2. "Add New FAQ" button से नई FAQ add करें
3. Homepage खोलें - नई FAQ automatically दिखेगी

---

## 3. Backend Status ✅ Running

- ✅ Server: http://localhost:5000
- ✅ MongoDB: Connected
- ✅ All APIs: Working

---

## Next Steps

### Step 1: Verify Services (अभी करें)

```bash
# Backend terminal में यह command चलाएं:
curl http://localhost:5000/api/service | head -20
```

### Step 2: Test Checkout Flow

1. Website खोलें: http://localhost:3000
2. "Services" section से कोई सेवा चुनें
3. Checkout page खुलेगा
4. Services dropdown में अब सभी services दिखेंगी
5. कोई सेवा चुनकर test card से payment करें

**Test Card Details:**

- Card Number: 4111 1111 1111 1111
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)

### Step 3: Add FAQ

1. Admin panel खोलें: http://localhost:3000/admin/faq
2. "Add New FAQ" button दबाएं
3. Question और Answer भरें
4. Category चुनें (General, Services, etc.)
5. "Save" दबाएं
6. Homepage खोलें - FAQ automatically दिखेगी

### Step 4: Manage Services (Optional)

Admin panel में services manage करने के लिए:

1. http://localhost:3000/admin/services पर जाएं
2. Services को edit या delete कर सकते हैं
3. नई services add कर सकते हैं

---

## 📊 Files Modified/Created

### New Files Created:

1. `/moksha-backend/seed-services.js` - Services seed script
2. `/moksha-backend/models/FAQ.model.js` - FAQ database model
3. `/moksha-backend/controllers/faq.controller.js` - FAQ business logic
4. `/moksha-backend/routes/faq.routes.js` - FAQ API routes
5. `/components/FAQ/FAQ.tsx` - FAQ website component
6. `/app/admin/faq/page.tsx` - FAQ admin management page

### Files Modified:

1. `/moksha-backend/server.js` - Added FAQ routes
2. `/app/admin/layout.tsx` - Added FAQ menu item
3. `/app/page.tsx` - Added FAQ component to homepage

---

## ⚡ Important Notes

### Backend हमेशा चलना चाहिए:

```bash
# Terminal 1 (Backend)
cd moksha-backend
npm start
# Output: 🚀 Server running on http://localhost:5000

# Terminal 2 (Frontend)
npm run dev
# Output: ▲ Next.js app running on http://localhost:3000
```

### Database Reset करने के लिए:

```bash
# सभी services नए से add करने के लिए:
node seed-services.js
```

---

## 🔧 Troubleshooting

**Q: Services dropdown में कुछ नहीं दिखा रहा?**
A:

1. Backend चल रहा है? `ps aux | grep "npm start"`
2. Services database में हैं? `curl http://localhost:5000/api/service`
3. फिर से seed script चलाएं: `node seed-services.js`

**Q: FAQ homepage पर नहीं दिख रही?**
A:

1. Backend चल रहा है?
2. Admin panel से FAQ add की है?
3. Browser cache clear करें (Ctrl+Shift+Delete)

**Q: Payment test में error आ रही है?**
A:

1. Test card details सही हैं?
2. Form fields properly filled हैं?
3. Browser console में क्या error दिख रहा है?

---

## ✅ Checklist

- [ ] Backend running है (Port 5000)
- [ ] Services dropdown में 8 services दिख रही हैं
- [ ] Checkout page पर कोई service select कर सकते हैं
- [ ] Payment flow काम कर रहा है
- [ ] Admin panel से FAQ add कर सकते हैं
- [ ] Homepage पर FAQ दिख रही है

---

Created: 2 April 2026
Last Updated: 2 April 2026
