#!/bin/bash

# 🧪 Complete Payment Flow Test Script
# This script tests the entire system end-to-end

set -e

echo "═══════════════════════════════════════════════════════════"
echo "🧪 MOKSHA VOYAGE - COMPLETE PAYMENT FLOW TEST"
echo "═══════════════════════════════════════════════════════════"
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0

# Test 1: Backend Health
echo -e "${BLUE}[TEST 1] Backend Health Check${NC}"
echo -n "  Checking http://localhost:5000/api/health ... "
if curl -s http://localhost:5000/api/health | grep -q "success"; then
  echo -e "${GREEN}✓ PASS${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ FAIL${NC}"
  echo "  Start backend: cd moksha-backend && npm run dev"
  ((FAILED++))
  exit 1
fi
echo ""

# Test 2: MongoDB Connection
echo -e "${BLUE}[TEST 2] MongoDB Connection${NC}"
echo -n "  Checking MongoDB ... "
if mongosh mongodb://localhost:27017/moksha_voyage --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
  echo -e "${GREEN}✓ PASS${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ FAIL${NC}"
  echo "  Start MongoDB: mongod"
  ((FAILED++))
  exit 1
fi
echo ""

# Test 3: Services Endpoint
echo -e "${BLUE}[TEST 3] Services Endpoint${NC}"
echo -n "  Fetching /api/service ... "
SERVICES=$(curl -s http://localhost:5000/api/service)
if echo "$SERVICES" | grep -q '"services"'; then
  SERVICE_COUNT=$(echo "$SERVICES" | grep -o '"_id"' | wc -l)
  echo -e "${GREEN}✓ PASS${NC} ($SERVICE_COUNT services)"
  ((PASSED++))
  
  # Extract first service ID
  SERVICE_ID=$(echo "$SERVICES" | grep -o '"_id":"[^"]*' | head -1 | cut -d'"' -f4)
else
  echo -e "${RED}✗ FAIL${NC}"
  ((FAILED++))
fi
echo ""

# Test 4: Admin Login
echo -e "${BLUE}[TEST 4] Admin Login${NC}"
echo -n "  Testing /api/auth/login ... "
LOGIN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mokshavoyage.com",
    "password": "Admin@123456"
  }')

if echo "$LOGIN" | grep -q '"success":true'; then
  TOKEN=$(echo "$LOGIN" | grep -o '"token":"[^"]*' | head -1 | cut -d'"' -f4)
  echo -e "${GREEN}✓ PASS${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ FAIL${NC}"
  echo "  Response: $LOGIN"
  ((FAILED++))
fi
echo ""

# Test 5: Create Payment Order
if [ ! -z "$SERVICE_ID" ]; then
  echo -e "${BLUE}[TEST 5] Create Payment Order${NC}"
  echo -n "  Creating Razorpay order ... "
  
  ORDER=$(curl -s -X POST http://localhost:5000/api/payment/create-order \
    -H "Content-Type: application/json" \
    -d "{
      \"serviceId\": \"$SERVICE_ID\",
      \"amount\": 1000,
      \"email\": \"test@example.com\",
      \"phone\": \"9876543210\",
      \"name\": \"Test User\",
      \"description\": \"Test Payment\"
    }")
  
  if echo "$ORDER" | grep -q '"success":true'; then
    ORDER_ID=$(echo "$ORDER" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
    echo -e "${GREEN}✓ PASS${NC} (Order: $ORDER_ID)"
    ((PASSED++))
  else
    echo -e "${RED}✗ FAIL${NC}"
    echo "  Response: $ORDER"
    ((FAILED++))
  fi
  echo ""
fi

# Test 6: Email Configuration
echo -e "${BLUE}[TEST 6] Email Configuration${NC}"
echo -n "  Checking SMTP settings in .env ... "
if grep -q "SMTP_HOST" moksha-backend/.env; then
  SMTP_HOST=$(grep "SMTP_HOST" moksha-backend/.env | cut -d'=' -f2)
  SMTP_USER=$(grep "SMTP_USER" moksha-backend/.env | cut -d'=' -f2)
  
  if [ "$SMTP_USER" != "your-email@gmail.com" ]; then
    echo -e "${GREEN}✓ PASS${NC}"
    echo "  Host: $SMTP_HOST"
    echo "  User: $SMTP_USER"
    ((PASSED++))
  else
    echo -e "${YELLOW}⚠ WARNING${NC} - Using default SMTP user"
    echo "  Configure real Gmail credentials for email to work"
    ((FAILED++))
  fi
else
  echo -e "${RED}✗ FAIL${NC}"
  ((FAILED++))
fi
echo ""

# Test 7: Razorpay Configuration
echo -e "${BLUE}[TEST 7] Razorpay Configuration${NC}"
echo -n "  Checking Razorpay keys in .env ... "
if grep -q "RAZORPAY_KEY_ID=rzp_test_RTd9y3ngRanKxq" moksha-backend/.env; then
  echo -e "${GREEN}✓ PASS${NC}"
  echo "  Real Razorpay test keys detected"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠ WARNING${NC} - Using default Razorpay keys"
  ((FAILED++))
fi
echo ""

# Test 8: Frontend Running
echo -e "${BLUE}[TEST 8] Frontend Check${NC}"
echo -n "  Checking http://localhost:3000 ... "
if curl -s http://localhost:3000 > /dev/null 2>&1; then
  echo -e "${GREEN}✓ PASS${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠ WARNING${NC} - Frontend not running"
  echo "  Start frontend: npm run dev"
  ((FAILED++))
fi
echo ""

# Summary
echo "═══════════════════════════════════════════════════════════"
echo "📊 TEST SUMMARY"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}✓ Passed: $PASSED${NC}"
echo -e "${RED}✗ Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}🎉 ALL TESTS PASSED - System Ready!${NC}"
  echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo ""
  echo "📝 Next Steps:"
  echo "1. Open: http://localhost:3000/furalservices"
  echo "2. Click 'खरीदें' on any service"
  echo "3. Fill form with:"
  echo "   - Name: Test User"
  echo "   - Email: test@example.com"
  echo "   - Phone: 9876543210"
  echo "4. Click 'Pay' button"
  echo "5. Use test card: 4111 1111 1111 1111"
  echo "6. Check email for receipt"
  echo ""
  exit 0
else
  echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
  echo -e "${RED}❌ Some tests failed. Fix issues above and retry.${NC}"
  echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
  exit 1
fi
