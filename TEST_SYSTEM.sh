#!/bin/bash

# 🔍 Complete System Test Script
# Moksha Voyage - Admin Data to Website Verification

set -e

echo "═══════════════════════════════════════════════════════════"
echo "🔍 MOKSHA VOYAGE - COMPLETE SYSTEM TEST"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results
PASSED=0
FAILED=0
WARNINGS=0

# Function to test API endpoint
test_endpoint() {
  local method=$1
  local url=$2
  local data=$3
  local expected_field=$4
  local token=$5
  
  echo -n "Testing: $method $url ... "
  
  if [ "$method" == "GET" ]; then
    response=$(curl -s -w "\n%{http_code}" -X GET "$url" \
      -H "Authorization: Bearer $token" \
      -H "Content-Type: application/json")
  else
    response=$(curl -s -w "\n%{http_code}" -X $method "$url" \
      -H "Authorization: Bearer $token" \
      -H "Content-Type: application/json" \
      -d "$data")
  fi
  
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | head -n-1)
  
  if [[ "$http_code" =~ ^2[0-9]{2}$ ]]; then
    if [ -z "$expected_field" ] || echo "$body" | grep -q "$expected_field"; then
      echo -e "${GREEN}✓ PASS${NC} (HTTP $http_code)"
      ((PASSED++))
      return 0
    else
      echo -e "${RED}✗ FAIL${NC} (HTTP $http_code - Missing: $expected_field)"
      ((FAILED++))
      return 1
    fi
  else
    echo -e "${RED}✗ FAIL${NC} (HTTP $http_code)"
    ((FAILED++))
    return 1
  fi
}

# ═══════════════════════════════════════════════════════════
# PART 1: Backend Health Check
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}═══ PART 1: Backend Health Check ===${NC}"
echo ""

echo "Checking backend at http://localhost:5000..."
if curl -s http://localhost:5000/api/health > /dev/null; then
  echo -e "${GREEN}✓ Backend is running${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ Backend is NOT running on port 5000${NC}"
  echo "Start backend with: cd moksha-backend && npm run dev"
  ((FAILED++))
  exit 1
fi

# ═══════════════════════════════════════════════════════════
# PART 2: Admin Authentication
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}═══ PART 2: Admin Authentication ===${NC}"
echo ""

# Login
echo -n "Testing Admin Login... "
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mokshavoyage.com",
    "password": "Admin@123456"
  }')

if echo "$LOGIN_RESPONSE" | grep -q '"success":true'; then
  ADMIN_TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
  echo -e "${GREEN}✓ PASS${NC}"
  ((PASSED++))
  
  if [ -z "$ADMIN_TOKEN" ]; then
    echo -e "${YELLOW}⚠ Warning: Could not extract token${NC}"
    ((WARNINGS++))
  fi
else
  echo -e "${RED}✗ FAIL${NC}"
  echo "Response: $LOGIN_RESPONSE"
  ((FAILED++))
  exit 1
fi

# ═══════════════════════════════════════════════════════════
# PART 3: Database & Services
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}═══ PART 3: Database & Services ===${NC}"
echo ""

# Get all services
test_endpoint "GET" "http://localhost:5000/api/service" "" '"services"' "$ADMIN_TOKEN"

# Get categories
test_endpoint "GET" "http://localhost:5000/api/category" "" '"categories"' "$ADMIN_TOKEN"

# Get gallery
test_endpoint "GET" "http://localhost:5000/api/gallery" "" '"gallery"' "$ADMIN_TOKEN"

# Get settings
test_endpoint "GET" "http://localhost:5000/api/settings/all" "" '"settings"' "$ADMIN_TOKEN"

# ═══════════════════════════════════════════════════════════
# PART 4: Payment Integration
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}═══ PART 4: Payment Integration ===${NC}"
echo ""

echo -n "Testing Razorpay Order Creation... "

# Get a service ID first
SERVICE_ID=$(curl -s http://localhost:5000/api/service | grep -o '"_id":"[^"]*' | head -1 | cut -d'"' -f4)

if [ -z "$SERVICE_ID" ]; then
  echo -e "${YELLOW}⚠ No services found, skipping payment test${NC}"
  ((WARNINGS++))
else
  ORDER_RESPONSE=$(curl -s -X POST http://localhost:5000/api/payment/create-order \
    -H "Content-Type: application/json" \
    -d "{
      \"serviceId\": \"$SERVICE_ID\",
      \"amount\": 100,
      \"email\": \"test@example.com\",
      \"phone\": \"+919876543210\",
      \"name\": \"Test User\",
      \"description\": \"Test Payment\"
    }")
  
  if echo "$ORDER_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASSED++))
    
    # Extract order ID for display
    ORDER_ID=$(echo "$ORDER_RESPONSE" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
    echo "Order ID: $ORDER_ID"
  else
    echo -e "${RED}✗ FAIL${NC}"
    echo "Response: $ORDER_RESPONSE"
    ((FAILED++))
  fi
fi

# ═══════════════════════════════════════════════════════════
# PART 5: Email Service
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}═══ PART 5: Email Configuration ===${NC}"
echo ""

echo -n "Checking Email Service Configuration... "

# Read .env file
if [ -f "moksha-backend/.env" ]; then
  if grep -q "SMTP_HOST" moksha-backend/.env; then
    SMTP_USER=$(grep "SMTP_USER" moksha-backend/.env | cut -d'=' -f2)
    SMTP_HOST=$(grep "SMTP_HOST" moksha-backend/.env | cut -d'=' -f2)
    
    if [ ! -z "$SMTP_USER" ] && [ "$SMTP_USER" != "your-email@gmail.com" ]; then
      echo -e "${GREEN}✓ PASS${NC}"
      echo "SMTP Host: $SMTP_HOST"
      echo "SMTP User: $SMTP_USER"
      ((PASSED++))
    else
      echo -e "${YELLOW}⚠ WARNING${NC} - SMTP User not configured"
      ((WARNINGS++))
    fi
  else
    echo -e "${YELLOW}⚠ WARNING${NC} - SMTP not configured in .env"
    ((WARNINGS++))
  fi
else
  echo -e "${YELLOW}⚠ WARNING${NC} - .env file not found"
  ((WARNINGS++))
fi

# Check Razorpay Keys
echo -n "Checking Razorpay Configuration... "

if grep -q "RAZORPAY_KEY_ID=rzp_test_RTd9y3ngRanKxq" moksha-backend/.env; then
  if grep -q "RAZORPAY_KEY_SECRET=bxH0R4Mbz5x3lC7XMWPezN4m" moksha-backend/.env; then
    echo -e "${GREEN}✓ PASS${NC} - Real Razorpay keys detected"
    ((PASSED++))
  else
    echo -e "${YELLOW}⚠ WARNING${NC} - Razorpay keys incomplete"
    ((WARNINGS++))
  fi
else
  echo -e "${YELLOW}⚠ WARNING${NC} - Razorpay keys not configured"
  ((WARNINGS++))
fi

# ═══════════════════════════════════════════════════════════
# PART 6: Frontend Connectivity
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}═══ PART 6: Frontend Connectivity ===${NC}"
echo ""

echo -n "Checking frontend at http://localhost:3000... "
if curl -s http://localhost:3000 > /dev/null 2>&1; then
  echo -e "${GREEN}✓ PASS${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠ WARNING${NC} - Frontend not running (start with: npm run dev)"
  ((WARNINGS++))
fi

# ═══════════════════════════════════════════════════════════
# PART 7: Data Persistence Test
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}═══ PART 7: Database Persistence ===${NC}"
echo ""

echo -n "Testing MongoDB Connection... "

# Try to connect to MongoDB
if mongosh mongodb://localhost:27017/moksha_voyage --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
  echo -e "${GREEN}✓ PASS${NC}"
  ((PASSED++))
  
  # Count collections
  echo -n "Checking Collections... "
  COUNT=$(mongosh mongodb://localhost:27017/moksha_voyage --eval "db.getCollectionNames()" 2>/dev/null | grep -c ":" || echo "0")
  if [ "$COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ Collections exist${NC}"
  fi
else
  echo -e "${YELLOW}⚠ WARNING${NC} - MongoDB not running"
  echo "Start MongoDB with: mongod"
  ((WARNINGS++))
fi

# ═══════════════════════════════════════════════════════════
# RESULTS SUMMARY
# ═══════════════════════════════════════════════════════════
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "📊 TEST SUMMARY"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}✓ Passed:${NC}  $PASSED"
echo -e "${RED}✗ Failed:${NC}  $FAILED"
echo -e "${YELLOW}⚠ Warnings:${NC} $WARNINGS"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}🎉 ALL TESTS PASSED - System is ready for verification!${NC}"
  echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
  echo ""
  echo "📝 Next Steps:"
  echo "1. Start backend: cd moksha-backend && npm run dev"
  echo "2. Start frontend: npm run dev"
  echo "3. Visit: http://localhost:3000/checkout to test payment"
  echo "4. Login to admin: http://localhost:3000/login"
  echo "   Email: admin@mokshavoyage.com"
  echo "   Password: Admin@123456"
  echo "5. Check email for payment confirmations"
  echo ""
else
  echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
  echo -e "${RED}❌ Some tests failed. Fix issues above and retry.${NC}"
  echo -e "${RED}═══════════════════════════════════════════════════════════${NC}"
  exit 1
fi
