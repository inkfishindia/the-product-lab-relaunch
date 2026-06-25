<!-- last-updated: 2026-06-11 -->
# QA Checklist & Launch Gate — The Product Lab Phase 4

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build and Merchandising Implementation |
| **Producing Agent** | James (QA Lead) |
| **Date** | 2026-06-11 |
| **Status** | active — NO-GO (India commerce integration required; front-end build defects cleared) |
| **Reviewer** | Harley |

---

## Overview

This document is **James's launch gate**. Dan cannot flip the "go live" switch without James's written sign-off.

**James's authority:** If ANY P0 (critical) test fails, launch is blocked. P1 (high) failures must be fixed before go-live. P2 (medium) can be fixed within 7 days of launch.

**Sign-off format:**
```
✓ P0: All critical tests PASS
✓ P1: All high tests PASS
✓ P2: Logged for post-launch fixes (7-day deadline)
✓ Performance: <3s LCP achieved
✓ Staging review: Complete

SIGN-OFF: James signs launch approval
Date: [DATE]
Signed: [JAMES SIGNATURE/APPROVAL]

APPROVED FOR PRODUCTION GO-LIVE ✓
```

---

## Critical (P0) — LAUNCH BLOCKED IF ANY FAIL

P0 tests are non-negotiable. Without them passing, store cannot launch.

### P0.1 Checkout Flow — End-to-End

**Objective:** Verify customer can complete a purchase without errors.

**Test environment:** Staging store (pre-production).

**Test device:**
- Primary: Android phone (Pixel 4, Android 13+, Chrome)
- Secondary: iPhone (iOS 15+, Safari)

**Test steps:**

1. **UPI Payment Flow**
   - [ ] Add product to cart (any product)
   - [ ] Proceed to checkout
   - [ ] Enter customer details:
     - Name: Test User
     - Email: test@theproductlab.in
     - Phone: +91-9876543210
     - Address: Enter complete address
     - Pincode: 560001 (Bangalore)
   - [ ] Select shipping method (free if >₹499, else ₹50)
   - [ ] Select payment: UPI
   - [ ] Enter UPI ID: testmerchant@razorpay (Razorpay test UPI)
   - [ ] Complete payment
   - [ ] **VERIFY:** Order confirmation page loads
   - [ ] **VERIFY:** Order confirmation email sent to test@theproductlab.in
   - [ ] **VERIFY:** Order appears in Razorpay dashboard with status "captured"
   - [ ] **VERIFY:** Order created in Shiprocket with tracking number
   - [ ] **VERIFY:** Shipping label generated (PDF)

2. **Card Payment Flow (Visa)**
   - [ ] Add product to cart
   - [ ] Proceed to checkout
   - [ ] Enter same customer details (different email: test2@theproductlab.in)
   - [ ] Select payment: Credit/Debit Card
   - [ ] Enter test card: 4111 1111 1111 1111
   - [ ] Enter expiry: 12/25
   - [ ] Enter CVV: 100
   - [ ] Complete payment
   - [ ] **VERIFY:** Order confirmation page loads
   - [ ] **VERIFY:** Order confirmation email sent
   - [ ] **VERIFY:** Order appears in Razorpay as "captured"
   - [ ] **VERIFY:** Order in Shiprocket (shipping label generated)

3. **Card Payment Flow (Mastercard)**
   - [ ] Repeat with test card: 5555 5555 5555 4444
   - [ ] **VERIFY:** Order confirmation page loads
   - [ ] **VERIFY:** All backend integrations work

4. **Cash on Delivery (COD) Flow**
   - [ ] Add product (any product, order value >₹299)
   - [ ] Proceed to checkout
   - [ ] Select payment: Cash on Delivery
   - [ ] **VERIFY:** COD option only available for order >₹299
   - [ ] **VERIFY:** No payment processor appears
   - [ ] Complete checkout (click "Confirm Order")
   - [ ] **VERIFY:** Order confirmation page loads (with "COD" status)
   - [ ] **VERIFY:** Order confirmation email sent (with COD payment method)
   - [ ] **VERIFY:** Order in Shiprocket with COD flag enabled
   - [ ] **VERIFY:** Shiprocket order shows "COD" (Ecom Express will collect at delivery)

5. **Order Failure Flow**
   - [ ] Add product to cart
   - [ ] Proceed to checkout
   - [ ] Select payment: Card
   - [ ] Enter test card: 4000 0000 0000 0002 (Razorpay test failed card)
   - [ ] **VERIFY:** Payment fails with error message
   - [ ] **VERIFY:** Error message clear (not technical jargon)
   - [ ] **VERIFY:** Customer returned to checkout (can retry)
   - [ ] **VERIFY:** Order NOT created in Shiprocket

**Pass criteria:**
- All 5 flows complete without errors
- Order confirmation pages load correctly
- Emails send within 2 minutes
- Razorpay captures payment correctly
- Shiprocket creates orders with correct details
- All payment methods work in isolation

**Failure criteria:**
- Any flow breaks (error page, blank page, stuck loading)
- Order confirms but payment not captured
- Order not created in Shiprocket
- Email not sent
- Shipping label not generated

---

### P0.2 Razorpay Payment Processing

**Objective:** Verify Razorpay correctly authorizes, captures, and settles payments.

**Test environment:** Razorpay test mode (staging store).

**Test steps:**

1. **Test Transaction via Dashboard**
   - [ ] Log into Razorpay dashboard
   - [ ] Go to Payments → All transactions
   - [ ] Verify test transactions from P0.1 appear in list
   - [ ] Check transaction status: All should be "captured" (not "authorized" only)
   - [ ] Check amounts correct (e.g., ₹249 for product + shipping if applicable)

2. **Verify Test Mode Disabled on Production**
   - [ ] Log into production Razorpay account
   - [ ] Verify live API keys (not test keys) are in use
   - [ ] Verify test mode is OFF
   - [ ] Check that test transactions do NOT appear in production (clean separation)

3. **Payment Method Configuration**
   - [ ] Razorpay dashboard → Settings → Payment Methods
   - [ ] Verify enabled: UPI, Credit Cards, Debit Cards, Google Pay, PhonePe, Paytm
   - [ ] Verify disabled on customer-facing: None (all should be available)

4. **Refund Flow Test**
   - [ ] In Razorpay dashboard, refund one test transaction (from P0.1)
   - [ ] Select transaction → click "Refund"
   - [ ] Enter amount (full refund)
   - [ ] **VERIFY:** Refund processes immediately (test mode)
   - [ ] **VERIFY:** Transaction status changes to "refunded"
   - [ ] **VERIFY:** Customer receives refund notification (if email linked)

**Pass criteria:**
- All test transactions appear in Razorpay
- Amounts captured correctly
- Payment methods configured
- Refunds process successfully

**Failure criteria:**
- Test transactions missing from dashboard
- Amount mismatches
- Refund fails

---

### P0.3 Shiprocket Order Integration

**Objective:** Verify orders created in Commerce.com sync to Shiprocket correctly, shipping labels generate.

**Test environment:** Staging store → Test Shiprocket account.

**Test steps:**

1. **Order Creation via Webhook**
   - [ ] Create test order in staging store (from P0.1)
   - [ ] Wait 30 seconds
   - [ ] Log into Shiprocket dashboard
   - [ ] Go to Orders → All Orders
   - [ ] **VERIFY:** Order appears with correct:
     - Order ID (matches Commerce.com)
     - Customer name
     - Customer phone
     - Delivery address
     - Order value (₹)
     - Payment method (UPI, card, or COD)
     - Shipment status: "Pickup scheduled" or "Ready to ship"

2. **Shipping Label Generation**
   - [ ] Select the test order from Shiprocket
   - [ ] **VERIFY:** Shipping label automatically generated (PDF available)
   - [ ] **VERIFY:** Tracking number assigned (AWB number visible)
   - [ ] Download shipping label (PDF)
   - [ ] **VERIFY:** Label readable and printable

3. **Carrier Assignment**
   - [ ] Shiprocket should automatically assign a carrier (Ecom Express, DTDC, etc.)
   - [ ] **VERIFY:** Carrier name visible in order details
   - [ ] **VERIFY:** Tracking number belongs to correct carrier

4. **COD Orders Flagged**
   - [ ] Create test COD order (from P0.1)
   - [ ] **VERIFY:** In Shiprocket, order marked as "COD" or "Cash"
   - [ ] **VERIFY:** Payment method shows "COD" (driver collects cash)
   - [ ] **VERIFY:** No payment collection required before shipment

5. **Prepaid Orders Flagged**
   - [ ] Create test prepaid order (UPI payment)
   - [ ] **VERIFY:** In Shiprocket, order marked as "Prepaid"
   - [ ] **VERIFY:** Payment status shows "Completed"

**Pass criteria:**
- All orders appear in Shiprocket within 60 seconds
- Shipping labels generate automatically
- Tracking numbers assigned
- COD/prepaid flagged correctly

**Failure criteria:**
- Orders not syncing to Shiprocket
- Shipping labels fail to generate
- Tracking numbers missing
- Payment method misidentified

---

### P0.4 Mobile Rendering (Android & iOS)

**Objective:** Store renders correctly on mobile phones (80%+ traffic).

**Test devices:**
- Android: Pixel 4 (Android 13+) or Samsung Galaxy A12 (Android 11+)
- iOS: iPhone 12 or newer

**Test environment:** Staging store (full store URL or localhost on mobile).

**Key pages to test:**
1. Homepage
2. Product Detail Page (PDP)
3. Collection page
4. Cart
5. Checkout

**Test steps (per page):**

1. **Viewport & Layout**
   - [ ] Page loads in single column (mobile layout)
   - [ ] No horizontal scrolling required
   - [ ] All text readable (no text cut off)
   - [ ] Images scale proportionally (no distortion)
   - [ ] Buttons/links touch-friendly (min 44x44px)

2. **Typography**
   - [ ] Headings visible and readable (dark #1A1A1A bg, white #F5F0EB text)
   - [ ] Body text readable (16px+ on mobile)
   - [ ] No font loading issues (system fallback visible)

3. **Images**
   - [ ] All product images load (no broken image icons)
   - [ ] Images scale to screen width (responsive)
   - [ ] Images not pixelated (use srcset for Retina)

4. **Forms (Checkout)**
   - [ ] Input fields large enough to tap (44x44px minimum)
   - [ ] Keyboard appears correctly (email field → email keyboard, phone → number keyboard)
   - [ ] Form labels visible and clear

5. **Navigation**
   - [ ] Menu/navigation accessible (hamburger icon visible on mobile)
   - [ ] Menu expands/collapses correctly
   - [ ] All navigation links work

6. **Performance on Mobile 4G**
   - [ ] Homepage loads in <3 seconds (LCP target)
   - [ ] PDP loads in <3 seconds
   - [ ] No jank on scroll (smooth 60fps)
   - [ ] Buttons respond immediately to tap

**Test both browsers:**
- Chrome (Android)
- Safari (iOS)

**Pass criteria:**
- All pages render correctly on both Android and iOS
- All images visible and optimized
- Forms usable on mobile
- Performance <3s LCP
- No horizontal scrolling

**Failure criteria:**
- Page renders incorrectly (horizontal scroll required, text cut off, etc.)
- Images broken or slow to load
- Touch targets too small
- Performance >3s

---

### P0.5 Page Load Performance — <3s LCP on 4G

**Objective:** Verify pages load fast enough on slow Indian 4G networks.

**Test environment:** Chrome DevTools with throttling.

**Test procedure:**

1. **Set up throttling**
   - [ ] Open Chrome DevTools (F12)
   - [ ] Go to Network tab
   - [ ] Set throttling: Custom →
     - Download: 1.6 Mbps (typical Indian 4G)
     - Upload: 0.75 Mbps
     - Latency: 150ms
   - [ ] Check "Disable cache"

2. **Test Homepage LCP**
   - [ ] Navigate to staging store homepage
   - [ ] Open Lighthouse (DevTools → Lighthouse tab)
   - [ ] Run audit (Mobile, Throttling: Slow 4G)
   - [ ] Check metric: LCP (Largest Contentful Paint)
   - [ ] **VERIFY:** LCP <3 seconds
   - [ ] **VERIFY:** FID <100ms
   - [ ] **VERIFY:** CLS <0.1

3. **Test PDP LCP**
   - [ ] Navigate to any product page
   - [ ] Run Lighthouse audit (same settings)
   - [ ] **VERIFY:** LCP <3 seconds

4. **Test Cart LCP**
   - [ ] Add product to cart, navigate to cart page
   - [ ] Run Lighthouse audit
   - [ ] **VERIFY:** LCP <3 seconds

5. **Test Checkout LCP**
   - [ ] Proceed to checkout page
   - [ ] Run Lighthouse audit
   - [ ] **VERIFY:** LCP <3 seconds

6. **Manual Load Time Test**
   - [ ] With throttling ON, reload homepage (Ctrl+Shift+R hard refresh)
   - [ ] Open Network tab, watch waterfall
   - [ ] Time to first paint (FP): Should see color/bg appear <1s
   - [ ] Time to largest image appear: Should be <3s
   - [ ] No long tasks (JS blocking >50ms)

**Pass criteria:**
- All pages LCP <3s on simulated 4G
- FID <100ms
- CLS <0.1
- No layout shift on load

**Failure criteria:**
- Any page LCP >3s
- Images load slowly
- Layout shift causes jank

---

### P0.6 Images — All Present & Not Broken

**Objective:** Verify all product images load without 404 errors or broken links.

**Test environment:** Staging store, all pages with images.

**Test steps:**

1. **Product Pages**
   - [ ] Visit 10 random product pages (PDP)
   - [ ] **VERIFY:** Primary product image loads (not 404, not broken)
   - [ ] **VERIFY:** All secondary images load (lifestyle, detail shots)
   - [ ] **VERIFY:** Images not pixelated (use DevTools → inspect image width vs display width)

2. **Collection Pages**
   - [ ] Visit 4 collection pages
   - [ ] **VERIFY:** Hero image loads
   - [ ] **VERIFY:** All product grid images load (scroll to bottom, verify lazy-loaded images)
   - [ ] **VERIFY:** No alt text missing (accessibility)

3. **Homepage**
   - [ ] **VERIFY:** Hero image loads
   - [ ] **VERIFY:** All featured product images load
   - [ ] **VERIFY:** No broken images below fold (scroll to bottom)

4. **Browser Console Check**
   - [ ] Open DevTools Console (F12 → Console tab)
   - [ ] **VERIFY:** No 404 errors for images (look for "Image failed to load" or red X errors)
   - [ ] **VERIFY:** No CORS errors

**Pass criteria:**
- All images load without 404 errors
- No broken image icons visible
- No console errors for images

**Failure criteria:**
- Any broken images (404, CORS error, missing file)
- Broken image icons visible
- Images pixelated or distorted

---

### P0.7 Cart — Free Shipping Threshold Calculated Correctly

**Objective:** Verify shipping cost is calculated correctly at ₹499 threshold.

**Test environment:** Staging store.

**Shipping rules:**
- Free shipping: Order >₹499
- Flat ₹50: Order ₹299–₹499
- No shipping: Order <₹299 (checkout disabled)

**Test steps:**

1. **Order <₹299 (No Shipping)**
   - [ ] Add product with price ₹199 to cart
   - [ ] Go to cart
   - [ ] **VERIFY:** "Minimum order ₹299 for shipping" message appears
   - [ ] **VERIFY:** Checkout button disabled or hidden
   - [ ] **VERIFY:** Shipping cost shows ₹0 or "N/A"

2. **Order ₹299–₹499 (₹50 Shipping)**
   - [ ] Clear cart
   - [ ] Add product ₹349 to cart
   - [ ] Go to cart
   - [ ] **VERIFY:** Shipping cost calculated as ₹50
   - [ ] **VERIFY:** Total = ₹349 + ₹50 = ₹399
   - [ ] **VERIFY:** Checkout button enabled

3. **Order >₹499 (Free Shipping)**
   - [ ] Clear cart
   - [ ] Add product ₹499 + another ₹50 product to cart (total ₹549)
   - [ ] Go to cart
   - [ ] **VERIFY:** Shipping cost = ₹0 (FREE)
   - [ ] **VERIFY:** Total = ₹549 (no shipping added)
   - [ ] **VERIFY:** "Free Shipping" badge/message visible

4. **Order Exactly ₹499**
   - [ ] Clear cart
   - [ ] Add product(s) totaling exactly ₹499
   - [ ] **VERIFY:** Shipping = ₹0 (free)

**Pass criteria:**
- Shipping thresholds enforced correctly
- Free shipping applies at ₹499+
- ₹50 shipping applies ₹299–₹498
- No shipping <₹299

**Failure criteria:**
- Shipping calculated incorrectly
- Free shipping not triggered at ₹499
- Checkout allows <₹299 orders

---

### P0.8 COD Minimum Order Value (₹299) Enforced

**Objective:** Verify COD payment only available for orders ≥₹299.

**Test environment:** Staging store.

**Test steps:**

1. **Order <₹299 (COD Disabled)**
   - [ ] Add product ₹199 to cart
   - [ ] Proceed to checkout
   - [ ] **VERIFY:** Payment method dropdown does NOT include "Cash on Delivery"
   - [ ] **VERIFY:** Only prepaid methods visible (UPI, card, etc.)

2. **Order ≥₹299 (COD Enabled)**
   - [ ] Clear cart
   - [ ] Add product ₹349 to cart
   - [ ] Proceed to checkout
   - [ ] **VERIFY:** Payment method dropdown includes "Cash on Delivery"
   - [ ] **VERIFY:** COD can be selected and order completed

3. **Order >₹499 (COD Still Available)**
   - [ ] Clear cart
   - [ ] Add products totaling ₹599
   - [ ] Proceed to checkout
   - [ ] **VERIFY:** COD available (no upper limit)

**Pass criteria:**
- COD option only shown for ₹299+ orders
- COD unavailable for <₹299
- COD available for any amount >₹299

**Failure criteria:**
- COD shown for <₹299 orders
- COD missing for ₹299+ orders

---

### P0.9 Prepaid Discount Applied Correctly (₹30 off)

**Objective:** Verify prepaid discount (₹30) applied automatically for UPI/card payments (not COD).

**Test environment:** Staging store (if discount is configured).

**Assumption:** Discount configured as "Prepaid payment discount: ₹30".

**Test steps:**

1. **Prepaid Payment (UPI)**
   - [ ] Add product ₹349 to cart (free shipping)
   - [ ] Proceed to checkout
   - [ ] Select payment: UPI
   - [ ] **VERIFY:** In order summary, discount line shows "-₹30"
   - [ ] **VERIFY:** Final total = ₹349 - ₹30 = ₹319

2. **Prepaid Payment (Card)**
   - [ ] Clear cart
   - [ ] Add product ₹249 + ₹349 = ₹598 (free shipping)
   - [ ] Proceed to checkout
   - [ ] Select payment: Card
   - [ ] **VERIFY:** Discount "-₹30" applied
   - [ ] **VERIFY:** Total = ₹598 - ₹30 = ₹568

3. **COD Payment (No Discount)**
   - [ ] Clear cart
   - [ ] Add product ₹349 to cart
   - [ ] Proceed to checkout
   - [ ] Select payment: COD
   - [ ] **VERIFY:** No discount line shown
   - [ ] **VERIFY:** Total = ₹349 (no ₹30 off)

**Pass criteria:**
- ₹30 discount applied for prepaid (UPI, card)
- No discount for COD
- Discount clearly labeled

**Failure criteria:**
- Discount not applied for prepaid
- Discount applied to COD (should not be)
- Discount amount incorrect

---

### P0.10 GST Calculation Correct

**Objective:** Verify GST (18%) calculated correctly on orders.

**Note:** TPL is registered (GSTIN: 29APFPH6495C1ZP). GST should be included in product prices OR clearly separated on invoice.

**Assumption:** Product prices shown are ex-GST or inc-GST (clarify with Shreyas/Andy).

**Test steps:**

1. **Verify GST Registration Active**
   - [ ] In admin panel, verify GSTIN 29APFPH6495C1ZP stored and active
   - [ ] GST compliance enabled in Commerce.com settings

2. **Test GST on Order >₹50,000**
   - [ ] For this test, assume bulk order >₹50,000 (if applicable)
   - [ ] **VERIFY:** GST calculated and shown on invoice
   - [ ] **VERIFY:** GST rate 18% applied correctly

3. **Test GST on Small Order**
   - [ ] Create test order ₹349
   - [ ] **VERIFY:** GST shown on invoice (if tax calculation enabled)
   - [ ] **VERIFY:** GST = ₹349 × 18% = ₹62.82 (if inc-GST mode)

4. **Verify Invoice**
   - [ ] Download/view order invoice
   - [ ] **VERIFY:** GSTIN visible on invoice
   - [ ] **VERIFY:** GST amount and rate shown
   - [ ] **VERIFY:** Tax-inclusive total = product + GST

**Pass criteria:**
- GST calculated correctly
- GSTIN visible on invoices
- Tax compliance enabled

**Failure criteria:**
- GST missing or incorrect
- GSTIN not displayed
- Tax calculation wrong

---

### P0.11 GA4 Purchase Event Fires on Order Completion

**Objective:** Verify analytics event fires when customer completes purchase.

**Test environment:** Staging store with GA4 test property configured.

**Test steps:**

1. **Set up GA4 DebugView**
   - [ ] Go to GA4 property (test) → Admin → DebugView
   - [ ] Open staging store in browser on same machine
   - [ ] Device should appear in DebugView

2. **Complete Test Purchase**
   - [ ] Add product to cart, complete checkout (UPI or card)
   - [ ] On order confirmation page, wait 5 seconds
   - [ ] Check DebugView for event "purchase"

3. **Verify Purchase Event Details**
   - [ ] Event name: "purchase"
   - [ ] Parameters:
     - `transaction_id`: [Order ID from Shiprocket]
     - `value`: [Order total in ₹]
     - `currency`: "INR"
     - `items`: [Product array with item_id, item_name, price]
     - `coupon`: [If discount applied, show discount code]

4. **Example Purchase Event (DebugView):**
   ```
   Event: purchase
   transaction_id: "ORD123456"
   value: 319.00
   currency: "INR"
   items: [{
     item_id: "no-filter-keychain-red",
     item_name: "No Filter Attitude Keychain — Red",
     item_brand: "The Product Lab",
     item_category: "Attitude Keychains",
     price: 249.00,
     quantity: 1
   }]
   coupon: "" (empty if no discount)
   ```

**Pass criteria:**
- Purchase event fires on order completion
- All parameters populated correctly
- Event visible in DebugView within 10 seconds

**Failure criteria:**
- Purchase event missing
- Parameters incomplete or wrong
- Event not firing in DebugView

---

## High (P1) — Must Fix Before Launch

P1 tests are critical UX/functionality. If any P1 fails, fix before production.

### P1.1 All Collections Have Correct Products

**Test steps:**
- [ ] Visit /collections/card-stickers/ → Verify only card sticker products shown (no keychains or pins)
- [ ] Visit /collections/attitude-keychains/ → Verify only keychains shown
- [ ] Visit /collections/lapel-pins/ → Verify only pins shown
- [ ] Visit /bundles/ → Verify only bundle products shown
- [ ] Verify collection counts match expected (e.g., "25 products" label accurate)

**Pass criteria:** All collections display correct products only.

---

### P1.2 All Product Pages Have Copy, Images, Correct Price

**Test steps:**
- [ ] Visit 20 random product pages (PDP)
- [ ] For each, verify:
  - [ ] Product title present and matches catalog
  - [ ] Product description present (100+ words, not placeholder)
  - [ ] At least one product image present and correct
  - [ ] Price displayed correctly (e.g., "₹249")
  - [ ] No blank/empty fields
  - [ ] No placeholder copy ("TODO", "TBD", "Lorem ipsum")

**Pass criteria:** All product pages have complete copy, images, correct prices. No placeholders.

---

### P1.3 Email/WhatsApp Order Confirmation Sent

**Test steps:**
- [ ] Complete test order (from P0.1)
- [ ] **Verify:** Order confirmation email arrives within 2 minutes
- [ ] **Verify:** Email has:
  - Order ID
  - Order total
  - Product list
  - Delivery address
  - Link to track order (Shiprocket)
- [ ] **Verify:** Email from: noreply@theproductlab.in (or similar)
- [ ] **Verify:** WhatsApp message sent (if integrated) within 2 minutes

**Pass criteria:** Email/SMS confirmations sent reliably within 2 minutes.

---

### P1.4 404 Page Works & Links Home

**Test steps:**
- [ ] Navigate to non-existent page: /this-does-not-exist/
- [ ] **VERIFY:** 404 error page loads (not blank, not 500 error)
- [ ] **VERIFY:** 404 page has:
  - Message "Page Not Found" or similar
  - Button/link to return home
- [ ] Click "Home" link
- [ ] **VERIFY:** Redirected to homepage

**Pass criteria:** 404 page renders and navigation works.

---

### P1.5 Social Share Buttons Work (WhatsApp)

**Test steps:**
- [ ] Visit PDP (any product)
- [ ] **VERIFY:** WhatsApp share button visible
- [ ] Click WhatsApp button
- [ ] **VERIFY:** WhatsApp opens (web version or mobile app)
- [ ] **VERIFY:** Pre-filled message includes:
  - Product name
  - Product link
  - Price
  - Emoji/branding (optional)
- [ ] Test on Android + iOS

**Pass criteria:** Share buttons work and pre-fill message correctly.

---

### P1.6 About Page Live & Complete

**Test steps:**
- [ ] Navigate to /about/
- [ ] **VERIFY:** Page loads (not 404, not blank)
- [ ] **VERIFY:** About page has:
  - Brand story (copy, not TBD)
  - Team photos/info (if applicable)
  - Brand values/mission
  - Contact info or contact form
  - No placeholder copy

**Pass criteria:** About page complete and live.

---

### P1.7 Instagram Link in Bio Works

**Test steps:**
- [ ] From store, find Instagram link (footer, header, or link)
- [ ] Click link
- [ ] **VERIFY:** Instagram profile opens (@theproductlab or handle)
- [ ] **VERIFY:** Profile shows recent posts, follower count, bio

**Pass criteria:** Instagram link goes to correct profile.

---

## Medium (P2) — Fix Within 7 Days of Launch

P2 issues can be fixed after launch but must be tracked and resolved within 7 days.

### P2.1 Bundle Products Display Correctly

- [ ] Visit /bundles/ page
- [ ] Click any bundle
- [ ] Verify bundle shows component products with images
- [ ] Verify bundle price correct (less than sum of parts)
- [ ] Verify "Save ₹X" discount shown

### P2.2 The Drop Countdown Timer Works

- [ ] Visit /the-drop/
- [ ] Verify countdown timer displays and counts down (1 hour → 59 mins, etc.)
- [ ] Verify timer stops and product goes live at scheduled time
- [ ] Verify signup form works and email captured

### P2.3 Gifting Hub Pages Load Correctly

- [ ] Visit /gifts/
- [ ] Verify page loads
- [ ] Verify gift bundles/sets displayed
- [ ] Verify gift messaging/customization copy present (if applicable)

### P2.4 Email Flows Trigger Correctly

- [ ] Welcome email sent on newsletter signup ✓
- [ ] Abandoned cart email sent 1 hour after cart abandonment ✓
- [ ] Order shipped email sent when Shiprocket updates status ✓
- [ ] Re-engagement email sent to inactive users (30+ days no purchase) ✓

### P2.5 Microsoft Clarity Recording Sessions

- [ ] Visit staging store
- [ ] Check Clarity dashboard
- [ ] Verify session recordings appearing (minimum 5 sessions recorded)
- [ ] Verify heatmaps generating on priority pages

### P2.6 All UTM Parameters Passing Correctly to GA4

- [ ] Create test Instagram link with UTM: ?utm_source=instagram&utm_medium=social&utm_campaign=test
- [ ] Click link from another device
- [ ] Check GA4 → Traffic Source → should see "instagram / social" as source
- [ ] Verify UTM parameters decoded correctly (not URL-encoded garbled text)

---

## Testing Methodology — How Dan Tests Independently

James provides a simple testing playbook for Dan to run solo.

### Test Setup (15 mins)

**Devices:**
- Android phone (any phone Dan has)
- Laptop/desktop (Chrome or Safari)

**Accounts:**
- Razorpay test account (auto-created with test credentials)
- Shiprocket test account (if separate)
- GA4 test property (auto-created)

**Test store URL:** `staging-theproductlab.commerce.com` (or whatever Fynd provides)

### Test Checklist (Dan's Version)

**Run daily during build (skip until products live):**

1. **Every morning (5 mins):**
   - [ ] Visit homepage — any broken images or text?
   - [ ] Visit random PDP — image load? Price correct?
   - [ ] Cart page — can add product without error?

2. **Before go-live (1 hour):**
   - [ ] Complete one full order with UPI payment
   - [ ] Complete one full order with card payment
   - [ ] Complete one full order with COD
   - [ ] Verify all three appear in Razorpay dashboard
   - [ ] Verify all three appear in Shiprocket with tracking numbers
   - [ ] Verify confirmation emails arrived

3. **Staging store final test (2 hours, day before launch):**
   - [ ] Full homepage test (scroll top to bottom, no broken elements)
   - [ ] Full collection test (visit all 4 collections, check product counts)
   - [ ] Product search test (search for "red", "keychain", other terms)
   - [ ] Bundle test (add bundle to cart, verify all items included)
   - [ ] Checkout test (full UPI payment)
   - [ ] Mobile test (open store on phone, browse, add product, not full checkout)

4. **Final sign-off (James, 30 mins):**
   - [ ] Run through P0 checklist manually
   - [ ] Verify all P1 items pass
   - [ ] Document any P2 issues (7-day fix deadline)
   - [ ] Sign off document (below)

---

## QA Sign-Off Template

**Use this template when QA is complete.**

---

### QA SIGN-OFF — GO / NO-GO

**Test Date:** [DATE]
**Tested by:** James (QA Lead)
**Store:** theproductlab.in (Staging)
**Build version:** Phase 4 - Build (v1.0)

#### Critical (P0) Test Results

| Test | Status | Notes |
|------|--------|-------|
| P0.1 — Checkout flow (UPI, card, COD) | ✓ PASS | All flows tested, orders confirmed |
| P0.2 — Razorpay payment processing | ✓ PASS | 3 test transactions captured correctly |
| P0.3 — Shiprocket order integration | ✓ PASS | All orders synced, labels generated |
| P0.4 — Mobile rendering (Android + iOS) | ✓ PASS | Tested on Pixel 4 and iPhone 12 |
| P0.5 — Page load performance (<3s LCP) | ✓ PASS | Homepage 2.1s, PDP 2.4s on simulated 4G |
| P0.6 — Images (all present, not broken) | ✓ PASS | 50 product images checked, all load |
| P0.7 — Free shipping threshold (₹499) | ✓ PASS | Free shipping triggers correctly at ₹499 |
| P0.8 — COD minimum (₹299) enforced | ✓ PASS | COD unavailable for <₹299 orders |
| P0.9 — Prepaid discount (₹30) applied | ✓ PASS | Discount applies to UPI/card, not COD |
| P0.10 — GST calculation correct | ✓ PASS | GSTIN registered, GST calculated 18% |
| P0.11 — GA4 purchase event fires | ✓ PASS | Event visible in DebugView, all params present |

**P0 Summary:** ✓ ALL CRITICAL TESTS PASS — No blockers

#### High (P1) Test Results

| Test | Status | Notes |
|------|--------|-------|
| P1.1 — Collections have correct products | ✓ PASS | Card stickers, keychains, pins separated correctly |
| P1.2 — Product pages have copy, images, price | ✓ PASS | 25 products checked, all complete |
| P1.3 — Email/WhatsApp confirmation sent | ✓ PASS | Email arrived in 45 seconds |
| P1.4 — 404 page works | ✓ PASS | 404 renders, home link works |
| P1.5 — Social share buttons work | ✓ PASS | WhatsApp share pre-fills message correctly |
| P1.6 — About page live & complete | ✓ PASS | About page has brand story, contact info |
| P1.7 — Instagram link works | ✓ PASS | Links to @theproductlab correctly |

**P1 Summary:** ✓ ALL HIGH-PRIORITY TESTS PASS

#### Medium (P2) Test Results

| Test | Status | Notes |
|------|--------|-------|
| P2.1 — Bundle products display correctly | ✓ PASS | Bundles show component products, prices correct |
| P2.2 — Drop countdown timer works | ✓ PASS | Timer counts down, signup form works |
| P2.3 — Gifting hub pages load | ✓ PASS | Gift pages load, product listings visible |
| P2.4 — Email flows trigger | ✓ PASS | Welcome, abandoned cart tested and working |
| P2.5 — Clarity recording sessions | ✓ PASS | 12 sessions recorded, heatmaps generating |
| P2.6 — UTM parameters passing to GA4 | ✓ PASS | Instagram UTM tracked correctly in GA4 |

**P2 Summary:** ✓ ALL MEDIUM-PRIORITY TESTS PASS (7-day fix deadline not triggered)

#### Performance Summary

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Homepage LCP | <3.0s | 2.1s | ✓ PASS |
| PDP LCP | <3.0s | 2.4s | ✓ PASS |
| Cart LCP | <3.0s | 1.8s | ✓ PASS |
| Checkout LCP | <3.0s | 2.2s | ✓ PASS |
| Bounce rate | <40% | Est. 35% | ✓ PASS |

#### Overall QA Result

```
┌─────────────────────────────────────┐
│   ✓ APPROVED FOR GO-LIVE           │
│                                     │
│   All P0 tests PASS                │
│   All P1 tests PASS                │
│   All P2 tests PASS                │
│   Performance targets MET          │
│                                     │
│   LAUNCH GATE: OPEN ✓              │
└─────────────────────────────────────┘
```

#### Signature & Approval

**QA Lead:** James
**Date:** 2026-03-26
**Time:** 4:30 PM IST

**Signature:** [James Digital Signature or Approval Code]

```
APPROVED FOR PRODUCTION GO-LIVE ✓

This document certifies that all critical (P0) and high (P1) QA tests have
passed for The Product Lab Phase 4 Build. The store is ready for production
launch on theproductlab.in.

Issues marked P2 (medium) will be resolved within 7 days of launch per the
standard post-launch SLA.

James, QA Lead
The Product Lab Relaunch
```

---

## Blockers & Escalation

**If ANY P0 test fails:**
1. James blocks launch immediately
2. James notifies Harley and Dan in writing
3. Do NOT attempt to deploy to production
4. Tobi investigates and fixes issue in staging
5. James re-tests in staging
6. Repeat until P0 passes

**If multiple P1 tests fail:**
1. James flags launch at risk
2. Prioritize fixes by impact (e.g., checkout > about page)
3. Retest before launch

**If P2 tests fail:**
1. James logs issues for post-launch fix queue
2. Does NOT block launch
3. Dan tracks fixes in post-launch checklist
4. Resolve within 7 days

---

## QA Exit Criteria — When Testing is Complete

Testing is complete when:
- ✓ All P0 tests pass (zero blockers)
- ✓ All P1 tests pass (zero launch-blocking issues)
- ✓ James has signed off (document above)
- ✓ Harley has reviewed QA report
- ✓ Dan and Tobi acknowledge receipt of sign-off

**Only then:** Dan flips production switch with Harley's approval.

---

**Document status:** Draft for Harley and James review.
**Next steps:** James reviews and adds any additional test cases → Tobi implements features → James re-tests → Sign-off.

---

## Live Build Defect Log — localhost:3000 (2026-06-11)

**Reviewed by:** Kurt (UX/IA), Julie (UI System) — independent markup-level review of server-rendered HTML + compiled CSS. No Playwright available for this pass.
**Logged by:** James (QA Lead)
**Method:** Static HTML analysis + compiled CSS inspection
**Verdict:** NO-GO — P0 blockers present; Playwright cart/checkout/mobile-nav pass required before launch

---

### Current QA Status: NO-GO

The sign-off template at the top of this document (dated 2026-03-26) is a projected forward-looking template, not an actual pass record. The live build at localhost:3000 has not cleared P0 criteria. **Launch is blocked** until all P0 items below are resolved and a full Playwright pass against cart, checkout, and mobile navigation is completed.

---

### P0 — Launch Blockers

Both reviewers independently confirmed items LB-01 through LB-03. All six items below are confirmed launch blockers.

| ID | Area | Finding | File / Location | Owner | Status |
|----|------|---------|----------------|-------|--------|
| LB-01 | PDP / Add to Cart | Button renders raw template literal `Add to Cart — ₹{(product.variants?.[0]?.calculated_price?.calculated_amount \|\| 0) / 100}` as visible text in server HTML. Only resolves after JS hydration. Customer sees broken text on slow connections before hydration completes. Confirmed by both reviewers. | `storefront/src/app/products/[handle]/add-to-cart-button.tsx` | Tobi | Open |
| LB-02 | Product images | `thumbnail: null` across all seed products. Every product card and PDP renders a blank square (bg-surface-base, invisible against page). No placeholder image or fallback pattern exists. Customer cannot see any product. Confirmed by both reviewers. | Seed data + all product components | Shreyas (catalog data), Tobi (fallback pattern) | Open |
| LB-03 | Typography / Font loading | Barlow Condensed + Inter declared as design tokens but no Google Fonts `<link>` tag exists in document head and no `@font-face` declarations in globals.css. Falls back to system-ui, which is Roboto on Android — approximately all India traffic. Confirmed by both reviewers. Fix: implement via `next/font/google` in layout.tsx. | `storefront/src/app/layout.tsx`, `storefront/src/app/globals.css` | Tobi | Open |
| LB-04 | Accessibility / Focus states | globals.css applies `outline: none` to all buttons. The design spec's `--shadow-pop` focus ring is never implemented. Every interactive element fails WCAG 2.4.7 (Focus Visible). Legally and practically blocks keyboard and assistive-technology users. | `storefront/src/app/globals.css` | Tobi | Open |
| LB-05 | Mobile navigation | Desktop nav hidden with `md:flex`; no hamburger drawer found in markup. Bottom-nav items are `<button>` elements with no `href` attribute — they do not navigate without JS. Requires Playwright confirmation; flagged here because on-device browsing without JS hydration (slow 4G) leaves users with no navigation path. | Nav component markup | Tobi | Needs Playwright |
| LB-06 | Cart — full client render | Server HTML shows only "Loading cart..." text. Free-shipping progress bar, checkout button, COD ₹299 enforcement, prepaid ₹30 discount, quantity controls — all unverifiable from static HTML. Any failure in hydration leaves the cart completely non-functional. Cannot be cleared by markup review alone. | `storefront/src/app/cart/cart-client.tsx` | Tobi | Needs Playwright |

---

### P1 — Fix Before Launch

| ID | Area | Finding | Owner | Status |
|----|------|---------|-------|--------|
| P1-01 | Navigation — brand mechanic | Nav labels read "Shop / Sets / Gifts"; drops the Find/Collect/Gift framing established in the brand direction. No direct "The Drop" link in primary nav, reducing scarcity-item reachability. | Tobi (nav markup), Sean (confirm label spec) | Open |
| P1-02 | PDP — missing trust elements | No artist attribution on PDP. No WhatsApp share button (P1.5 in existing checklist marks this required). No trust micro-copy block (COD available / free shipping over ₹499 / 7-day returns) below the Add to Cart button. Breadcrumb is plain "← Back" text, not a structured breadcrumb. | Tobi | Open |
| P1-03 | SEO / page titles | Generic `<title>The Product Lab</title>` and identical meta description on every page. No per-page title or description differentiation. Hurts organic discoverability and creates confusing browser history. | Tobi | Open |
| P1-04 | Off-system CSS / leaked UI kit | Compiled CSS contains hardcoded off-system color values: `#2DD4BF` (teal), `#3B82F6` (blue), `#EAB308` (amber), `#22C55E` (green). Undefined `--font-mc-*` CSS variables also present. These appear to be residue from a dashboard UI component kit and are inconsistent with the D-015 visual system (Darkroom/Light+Bold). | Tobi (audit and purge) | Open |
| P1-05 | Accessibility — ARIA | Icon-only cart and search links have no `aria-label`. Cart "Loading..." state has no `aria-live` region and no skeleton screen. Screen reader users get no feedback during cart load. | Tobi | Open |
| P1-06 | Type scale — token resolution | Design tokens `text-opinion`, `text-h2`, and other scale tokens are not present in compiled CSS. Must verify Tailwind config resolves them to spec pixel values (text-opinion: 48px at 375px, 64px at 1024px). | Tobi (Tailwind config), Julie (confirm spec values) | Open |

---

### P2 — Fix Within 7 Days of Launch

| ID | Area | Finding | Owner | Status |
|----|------|---------|-------|--------|
| P2-01 | Footer / sitemap | Footer collection names ("The Loud Ones", "Main Character Set") do not match spec sitemap names. URL namespace `/sets/` diverges from spec's `/bundles/`. Creates broken internal links if either side is treated as canonical. | Tobi (markup), Sean (confirm naming) | Open |
| P2-02 | Gifts page URLs | Gift persona URLs diverge from spec. Gifts page is otherwise the most complete page in the build and closest to spec — the URL mismatch is the primary gap. | Tobi | Open |
| P2-03 | Footer — dead links + compliance | WhatsApp footer link is `href="#"` (dead). No GST number displayed in footer. Both are customer-trust issues; GST number is a compliance requirement for a registered entity (GSTIN: 29APFPH6495C1ZP). | Tobi | Open |
| P2-04 | Accessibility — skip link + alt text | No skip-to-content link. Hero image has `alt=""` (empty, not decorative-intentional). | Tobi | Open |
| P2-05 | Layout — container width | Container max-width is `max-w-6xl` (1152px) vs. spec value of 1280px. Causes layout compression on wider viewports. | Tobi | Open |
| P2-06 | Missing PDP features | No scarcity badges ("Only 3 left"). No empty review widget/placeholder for social proof. No cross-sell module ("You might also like"). No Instagram feed integration. All were in spec. | Tobi | Open |

---

### Pending Playwright Verification

The following items cannot be confirmed or cleared from static HTML analysis alone. A full Playwright pass is required before the launch gate can open. None of these may be assumed passing.

**Cart funnel**
- [ ] Free-shipping progress bar renders and updates on quantity change
- [ ] Checkout button is present and enabled when cart meets minimum
- [ ] COD ₹299 minimum enforced at checkout (COD option hidden below threshold)
- [ ] Prepaid ₹30 discount applies for UPI/card, absent for COD
- [ ] Quantity controls (increment/decrement/remove) function correctly
- [ ] Trust strip (COD / shipping / returns) visible in cart

**Mobile navigation**
- [ ] Hamburger icon visible and tappable at 375px viewport
- [ ] Drawer opens and displays full navigation menu
- [ ] Bottom-nav items navigate to correct routes (confirm href presence after hydration)
- [ ] Bottom-nav scroll-delay behavior on homepage scroll

**PDP interactions**
- [ ] Sticky Add to Cart bar appears on PDP scroll
- [ ] Two-tap tile behavior on collection grid (first tap = quick view or navigate)

**Collection pages**
- [ ] Mood Wall / horizontal scroll component functions on touch

**Checkout**
- [ ] Gift note field present and submits with order
- [ ] Pincode serviceability check fires and returns a carrier result

**Performance**
- [ ] Font rendering confirmed on Android Chrome at runtime (Barlow Condensed visible, not system-ui fallback) — contingent on LB-03 fix
- [ ] Type scale at 375px: `text-opinion` renders at 48px
- [ ] Type scale at 1024px: `text-opinion` renders at 64px
- [ ] Focus ring contrast meets WCAG 1.4.11 after LB-04 fix
- [ ] All tap targets >= 44px at 375px viewport
- [ ] Cart hydration timing on throttled 4G: full cart UI visible within 3s LCP target

---

### Live Build Verdict

**QA assessment as of 2026-06-11: NO-GO**

The storefront build at localhost:3000 has six confirmed P0 launch blockers (LB-01 through LB-06). Three are directly customer-visible in the critical purchase path: a broken Add to Cart price display, zero product images, and missing fonts on the device class that represents the majority of Indian traffic. Two more (focus states, mobile navigation) represent functional and compliance gaps. One (cart client-rendering) cannot be cleared until a Playwright pass is run.

The launch gate does not open until:
1. All six P0 items (LB-01 through LB-06) are resolved by Tobi and confirmed fixed
2. Shreyas provides real product image URLs in catalog data (resolves LB-02)
3. A full Playwright pass is run covering the cart funnel, mobile navigation, and checkout flows listed in the Pending Playwright Verification section above
4. James re-reviews the Playwright results and updates this document

P1 items must also be resolved before launch; they are not re-categorized as P2 here. P2 items are logged and tracked for the 7-day post-launch fix window.

**Owner of resolution:** Tobi (build fixes), Shreyas (catalog/image data), Sean (visual confirmations on specific items noted above).
**Reviewer for this log:** Harley
**Next action:** Tobi to triage LB-01 through LB-04 as the immediate unblock sequence.

---

### Playwright Live Pass Results (2026-06-11)

**Test environment:** localhost:3000 at 375px viewport (mobile simulation)
**Method:** Playwright runtime pass — live interaction, computed styles, network console
**Screenshots:** /home-mobile.png, /pdp-mobile.png (375px full-page)
**Logged by:** James (QA Lead)

---

#### New P0 Blocker Identified at Runtime

| ID | Area | Finding | Evidence | Owner | Status |
|----|------|---------|----------|-------|--------|
| LB-07 | Commerce backend — offline | Add to Cart fails with `ERR_CONNECTION_REFUSED` on `http://localhost:9000/store/carts`. Nothing is listening on :9000; Medusa is not running. Console error: "Failed to add to cart TypeError: Failed to fetch". Cart permanently shows "Your cart is empty" — no item can be added under any circumstance. This is the root-cause blocker for the entire purchase funnel. | Network tab + console, Playwright runtime | Tobi / James (start Medusa on :9000 before any further funnel testing) | Open |

---

#### Updated Status on Previously Logged P0 Blockers

| ID | Prior Status | Playwright Finding | New Status |
|----|-------------|-------------------|------------|
| LB-01 | Open (suspected pre-hydration flash) | ESCALATED. Raw template literal `Add to Cart — ₹{(product.variants?.[0]?.calculated_price?.calculated_amount \|\| 0) / 100}` renders at runtime, post-hydration. This is a broken JSX string literal in source — not a hydration-timing issue. The button label is permanently broken regardless of connection speed. Screenshot evidence: /pdp-mobile.png. | Open — severity confirmed worse than static review indicated |
| LB-02 | Open | CONFIRMED at runtime. Zero product card images site-wide (cardImgs=0 measured). EXTENDED: homepage hero `/hero-stickers.jpg` returns 404 (ERR_CONNECTION_REFUSED or file missing). Both product images AND hero image are broken. | Open |
| LB-03 | Open (P0) | REVISED — downgrade to P1. `document.fonts` at runtime registers only Geist (Next.js default); no Barlow Condensed or Inter FontFace registered. However, computed font-family on h1 = `"Barlow Condensed", system-ui, sans-serif` and renders acceptably on the test Mac because Barlow Condensed is system-available on that machine. The issue is real — fonts are not bundled or self-hosted and will fall back on most Android devices — but it is not a hard funnel-blocker in the same class as LB-01, LB-02, LB-05, or LB-07. Recommended fix: `next/font/google` in layout.tsx. | Downgraded to P1 |
| LB-04 | Open | Not retested in this pass (focus state behavior requires keyboard interaction; deprioritised while backend is down). | Open — carry forward |
| LB-05 | Open (Needs Playwright) | CONFIRMED at runtime. Clicked bottom-nav "Shop" button live: URL remained at `/`, no navigation occurred, no drawer opened. Bottom-nav buttons have no href and no working click handler. Header contains only logo + cart icon at 375px. No hamburger exists. On mobile the only persistent navigation is three non-functional buttons and a cart icon. This is a proven dead-end, not a suspicion. | Confirmed P0 — status changed from "Needs Playwright" to "Open" |
| LB-06 | Open (Needs Playwright) | BLOCKED by LB-07. Cart is entirely unreachable because no item can be added while Medusa is down. Cannot assess free-shipping bar, checkout button, COD enforcement, prepaid discount, or qty controls. | Blocked — see LB-07 |

---

#### Cart and Checkout Funnel — Playwright Verification Status

All items previously listed under "Pending Playwright Verification — Cart funnel" and "Checkout" are blocked by LB-07 and remain unverifiable. No result, pass or fail, can be recorded for any of the following until Medusa is running on :9000:

- Free-shipping progress bar renders and updates on quantity change — BLOCKED (LB-07)
- Checkout button present and enabled — BLOCKED (LB-07)
- COD ₹299 minimum enforced — BLOCKED (LB-07)
- Prepaid ₹30 discount applies for UPI/card, absent for COD — BLOCKED (LB-07)
- Quantity controls function correctly — BLOCKED (LB-07)
- Trust strip visible in cart — BLOCKED (LB-07)
- Gift note field at checkout — BLOCKED (LB-07)
- Pincode serviceability check — BLOCKED (LB-07)

These items must not be marked passing by assumption. They are unverified.

---

#### New P1 Defect Identified at Runtime

| ID | Area | Finding | Owner | Status |
|----|------|---------|-------|--------|
| P1-07 | Type scale — hero heading size | Computed font-size on hero h1 ("Small objects. Big opinions.") = 16px at 375px. Spec requires the opinion/h1 token to render at approximately 48px on mobile. The `text-opinion` Tailwind utility is not resolving to the specified size. Root cause is likely missing or incorrect `fontSize` entry in tailwind.config. This extends and confirms the static finding in P1-06. | Tobi (tailwind.config fontSize tokens) | Open |

---

#### Playwright-Confirmed P2 Items

The following P2 items logged in the static pass are now confirmed at runtime:

| ID | Confirmation |
|----|-------------|
| P2-03 (WhatsApp footer link) | Confirmed: `href="#"` observed live, click goes nowhere. |
| P1-05 / P2 accessibility (cart link) | Confirmed: icon-only cart link has no accessible name at runtime. |

---

#### Updated Verdict

**QA assessment as of 2026-06-11 (post-Playwright): NO-GO**

The Playwright pass surfaces a new root-cause blocker (LB-07: Medusa offline) that makes the entire purchase funnel untestable and confirms the most critical static findings. The effective launch-gating sequence is now explicit:

**Step 1 — Backend prerequisite (blocks all funnel testing)**
Bring Medusa up on :9000. Without this no cart operation is possible and the full funnel cannot be verified in any subsequent pass. Owner: Tobi / James.

**Step 2 — Fix confirmed P0 build defects**
- LB-01: Fix broken JSX string literal in `add-to-cart-button.tsx` (price display)
- LB-02: Supply real product image URLs via Shreyas; add fallback pattern in image component; fix homepage hero `/hero-stickers.jpg` 404
- LB-05: Implement working mobile navigation (hamburger drawer or functional bottom-nav routes)
- LB-04: Implement focus ring per spec (carry forward)

**Step 3 — Re-run full Playwright cart-to-checkout pass**
Once LB-07 and LB-01/02/05 are resolved, a complete second Playwright pass must cover: add-to-cart, free-shipping bar, qty controls, checkout, COD ₹299 enforcement, prepaid ₹30 discount, order confirmation. None of these carry a passing status until that pass is run and reviewed by James.

**Step 4 — P1 items before launch**
LB-03 (downgraded from P0): implement `next/font/google` — will affect Android rendering for the majority of traffic. P1-07: fix `text-opinion` token in tailwind.config to resolve to 48px at 375px. All other P1 items from the static pass remain open.

The launch gate does not open until Steps 1–3 are complete and James signs off on the re-test results.

**Status:** Draft — pending Harley review.
**Reviewer for this section:** Harley
**Next action:** Tobi starts Medusa on :9000 and addresses LB-01 before any further QA pass is scheduled.

---

### Playwright Re-Test Results (2026-06-11, post-remediation)

**Test environment:** localhost:3000 at 375px viewport (mobile simulation), Medusa backend :9000 live with 502 products
**Method:** Playwright runtime pass — live interaction, computed styles, network console, screenshot capture
**Evidence file:** `checkout-mobile-2026-06-11.png` (project root)
**Logged by:** James (QA Lead)

---

#### Resolution Status — Original P0 Build Blockers (LB-01 through LB-07)

All six original P0 build defects from the static and Playwright passes are now RESOLVED. This is a material change from the prior NO-GO verdict.

| ID | Defect | Prior Status | Re-Test Result |
|----|--------|-------------|----------------|
| LB-01 | Add to Cart button showed raw JSX literal instead of price | Open — confirmed at runtime | RESOLVED. Button renders "Add to Cart — ₹225" live. Price computed correctly from variant data. |
| LB-02 | Product images null/missing; hero 404 | Open | RESOLVED (with caveat). PDP `img` naturalWidth confirmed 1800 at runtime — product images load via WooCommerce hotlinks returning HTTP 200. Branded placeholder fallback added for null thumbnails. CAVEAT: images are hotlinked to `theproductlab.in/wp-content/` — this is fragile for production: depends on the old WordPress site staying live and not enabling hotlink protection. Images must be migrated to a self-hosted CDN path before scale. Hero image (`/hero-stickers.jpg`) still returns 404 — file is missing from `public/`. Asset must be supplied by Dan; this is the only remaining console error on the site. Logged below as open minor item. |
| LB-03 | Barlow Condensed + Inter not loaded; Android falls back to system-ui | Open (downgraded to P1 in prior pass) | RESOLVED. Both fonts confirmed registered at runtime via `document.fonts.check()`. Loaded via `next/font/google` in layout.tsx. Android fallback risk eliminated. |
| LB-04 | `outline: none` on all buttons; zero focus ring; WCAG 2.4.7 failure | Open | RESOLVED (with carry-forward note). `:focus-visible` focus ring implemented in globals.css. Red on cream contrast measures approximately 4.8:1, meeting WCAG 1.4.11 non-text contrast. NOTE: keyboard tab-through interaction was not exercised in this pass — focus ring visibility must be confirmed via a live keyboard walkthrough during final sign-off. Not a blocker; carry into sign-off checklist. |
| LB-05 | Mobile nav buttons non-functional; no hamburger; no navigation path at 375px | Open — confirmed P0 | RESOLVED. Clicked "Sets" bottom-nav link live: browser navigated to `/sets`. Hamburger icon confirmed present and opens full drawer. Dead `<button>` elements replaced with real `<Link>` components + Cart. Mobile navigation is functional. |
| LB-06 | Cart client-rendering unverifiable; entire funnel blocked | Blocked by LB-07 | RESOLVED. LB-07 (Medusa offline) is cleared — backend up on :9000 with 502 products. Add-to-Cart succeeds against live cart endpoint. `/cart` renders: line item (₹225), qty controls (minus / count / plus), REMOVE, subtotal, total, and Proceed to Checkout button. Funnel now navigable end-to-end. |
| LB-07 | Medusa :9000 offline; ERR_CONNECTION_REFUSED on all cart operations | Open — root-cause blocker | RESOLVED. Backend confirmed live on :9000. Add-to-Cart API call returns success. |

**LB-01 through LB-07: ALL CLEARED.**

---

#### Resolution Status — P1 Build Defects (from prior passes)

| ID | Defect | Re-Test Result |
|----|--------|----------------|
| P1-03 | Generic `<title>` on every page | RESOLVED. Per-page titles confirmed distinct: "Suck it Fridge magnet | The Product Lab", "Sets | The Product Lab", "Checkout | The Product Lab", homepage "The Product Lab — Small objects. Big opinions." |
| P1-07 | Hero h1 renders at 16px at 375px (should be 48px) | RESOLVED. Computed font-size on hero h1 confirmed 48px at 375px. Full `--text-*` scale added to Tailwind v4 `@theme`. Token resolves correctly. |
| P1-05 / P1-02 | Missing PDP trust micro-copy; missing ARIA labels on icon links | RESOLVED. Trust micro-copy confirmed present below Add to Cart: "COD available · Free shipping over ₹499 · 7-day returns". ARIA labels added to cart and search icon links. |

P1 items P1-01, P1-04, P1-06 from the static pass have not been re-tested in this pass. They remain open at P1 priority and must be resolved before launch sign-off.

---

#### New P0 Gate — India Commerce Integration Layer (UNBUILT)

The front-end build (browse, PDP, add-to-cart, cart, navigation) is now functional. The launch gate has shifted. The checkout source (`storefront/src/app/checkout/checkout-client.tsx`) and runtime behavior confirm that the India payments + commerce rules layer has not been built.

These are not defects in the remediated code — they are a known deferred build workstream, explicitly accepted as the tradeoff of D-025 (choosing Medusa over Fynd). They are listed here because they must be completed and re-tested before this document can be signed off.

| ID | Area | Finding | Owner | Status |
|----|------|---------|-------|--------|
| P0.1 / P0.2 | Razorpay — UPI and card payments | Checkout calls `sdk.store.cart.complete()` directly. On-screen text reads "No payment yet — using temporary test payment". No payment method selector exists. No Razorpay widget is initialized. A customer clicking "Complete Order" today does not pay. | Tobi | Open — build required |
| P0.8 | COD selection + ₹299 minimum | No COD payment option in the checkout UI. The phrase "COD available" appears only in PDP trust micro-copy. The ₹299 COD floor is not enforced anywhere in the checkout flow. | Tobi | Open — build required |
| P0.9 | Prepaid ₹30 discount | No discount mechanism in checkout. ₹30 prepaid discount is not applied for UPI or card, and not suppressed for COD. No discount line item appears at any cart total. | Tobi | Open — build required |
| P0.7 | Free-shipping ₹499 threshold rule | Cart renders "Free Shipping ₹0" on a ₹225 cart. No price-rule logic gates the Medusa shipping option. Storefront lists all shipping options returned by Medusa without any threshold enforcement. | Tobi | Open — build required |
| P0.10 | GST line at checkout | No GST line item, no tax calculation display, and no GSTIN shown in the checkout UI. Required for compliance (GSTIN: 29APFPH6495C1ZP). | Tobi | Open — build required |
| P0.3 | Shiprocket order integration | No Shiprocket API call in any checkout or order-confirmation code path. Orders placed via `cart.complete()` exist only in Medusa — no fulfillment routing occurs. | Tobi | Open — build required |

These six items map directly to the existing P0 test cases in this document (P0.1–P0.3, P0.7–P0.10). They were not previously testable because the funnel was blocked. Now that the funnel is open, the absence of this layer is confirmed.

---

#### Open Carry-Forward Items

| ID | Area | Item | Priority | Owner |
|----|------|------|----------|-------|
| — | Hero image | `/hero-stickers.jpg` returns 404. Only console error on the site. Dan to supply the asset and place in `public/`. | P1 | Dan |
| LB-04 carry | Keyboard focus | Focus ring is in CSS; keyboard tab-through not yet exercised in any pass. Must be walked through live before final sign-off. | P1 | James (verify) |
| P1-01 | Nav labels | "Shop / Sets / Gifts" does not match Find/Collect/Gift brand mechanic. "The Drop" not in primary nav. | P1 | Tobi |
| P1-04 | Off-system CSS | `#2DD4BF`, `#3B82F6`, `#EAB308`, `#22C55E` and undefined `--font-mc-*` variables still require audit and purge. | P1 | Tobi |
| P1-06 | Type scale tokens | Remaining `text-opinion`, `text-h2` etc. tokens to be confirmed across all breakpoints, not only 375px hero. | P1 | Tobi |
| P2-03 | WhatsApp footer link | `href="#"` dead link confirmed. | P2 | Tobi |
| LB-02 caveat | Image hosting | WooCommerce hotlink dependency is fragile at production scale. Migrate product images to CDN before or immediately after launch. | P2 (pre-scale) | Dan / Tobi |

---

#### Re-Test Verdict

**QA assessment as of 2026-06-11 (post-remediation Playwright pass): NO-GO — India commerce integration required.**

This verdict requires a clear two-part reading.

**What is now cleared.** The six original P0 build defects (LB-01 through LB-07) and the P1 build defects confirmed in the first Playwright pass are resolved. The storefront front-end is functional: browse, product images, fonts, mobile navigation, add-to-cart, cart line-item rendering, and per-page SEO titles all pass at 375px against a live Medusa backend with 502 products. The remediation sprint delivered. This is not a defect list anymore — those defects are gone.

**Why launch remains blocked.** The launch gate has not moved from NO-GO. The reason has changed. The blocking condition is now the India commerce integration layer: Razorpay (UPI, card), COD with ₹299 floor, prepaid ₹30 discount, ₹499 free-ship rule enforcement, GST at checkout, and Shiprocket fulfillment routing. None of these are built. This is a known build workstream — the direct consequence of D-025 — not a bug in code that exists. The work is scoped and owned by Tobi.

**The distinction matters for planning.** Harley and Dan should read this as: the storefront is ready for the payment/commerce integration sprint to begin. The front-end will not block that sprint. The remaining work is a build effort, not debugging.

**Conditions to re-open the launch gate:**
1. Razorpay integration built and tested with UPI and card test credentials (P0.1, P0.2)
2. COD payment option implemented with ₹299 minimum enforcement (P0.8)
3. Prepaid ₹30 discount applied for UPI/card, suppressed for COD (P0.9)
4. Free-shipping ₹499 threshold enforced in shipping option logic (P0.7)
5. GST line item displayed at checkout (P0.10)
6. Shiprocket order sync confirmed for at least one prepaid and one COD test order (P0.3)
7. Full end-to-end Playwright pass (add-to-cart → checkout → order confirmation) run after above are built
8. James reviews results and issues written sign-off

Until those eight conditions are met, this document reads NO-GO and launch is blocked.

**Document status:** Active — updated post-remediation. Awaiting India commerce integration build.
**Reviewer for this section:** Harley
**Next action:** Tobi to scope and begin India commerce integration sprint (Razorpay + COD + discount rules + Shiprocket). Dan to supply `hero-stickers.jpg` asset for `public/` immediately — it is the only remaining console error on a functional storefront.
