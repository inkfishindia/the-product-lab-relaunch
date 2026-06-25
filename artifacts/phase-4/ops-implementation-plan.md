<!-- last-updated: 2026-03-26 -->
# Operations Implementation Plan — Phase 4

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build and Merchandising Implementation |
| **Producing Agent** | Andy (Operations Lead) |
| **Date** | 2026-03-26 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## Executive Summary

This document operationalizes the logistics baseline (artifacts/phase-1/logistics-baseline.md) into a working fulfillment system for Dan to execute solo. It covers:

1. **Shiprocket configuration** — Account setup, zone mapping, rate card validation, COD testing
2. **COD workflow validation** — End-to-end testing: order → Shiprocket → AWB → pickup
3. **Razorpay payout confirmation** — Settlement schedule and reconciliation process
4. **Packaging specification** — Materials, dimensions, unboxing QA
5. **Return/exchange SOP** — Public-facing policy and internal process
6. **Dan's pre-launch checklist** — Everything Dan executes before first order ships

**Success criteria (Phase 4 gate):** Razorpay processing real test transactions, Shiprocket generating AWBs (including COD tested end-to-end), shipping cost assumptions validated against live rates.

**Timeline:** All setup complete by Phase 4 gate. No launches without validated shipping.

---

## 1. Shiprocket Account Setup Checklist

### 1.1 Account Creation & Basic Configuration

**Owner:** Dan (self-service through Shiprocket dashboard)
**Timeline:** Can start immediately
**Estimated time:** 30 minutes

**Tasks:**

- [ ] Create Shiprocket account at www.shiprocket.in
  - **Email:** productlab.info@gmail.com (same as website)
  - **Business name:** The Product Lab
  - **GST number:** 29APFPH6495C1ZP
  - **Business address:** Cunningham Road, Bengaluru, India
  - **Phone:** Dan's mobile
  - **Business type:** Fashion/Accessories, D2C

- [ ] Complete KYC verification
  - PAN card (Dan)
  - Bank account details for COD remittance (see Section 3.1)
  - Address proof

- [ ] Activate Shiprocket Business Plan
  - **Plan:** Business (₹199/month) — supports multi-carrier, COD, unlimited shipments
  - **Billing:** Monthly, auto-renew
  - **Activate:** Yes, before first order ships

- [ ] Add pickup location
  - **Location name:** TPL Bengaluru
  - **Type:** Warehouse/Fulfillment Center
  - **Address:** Cunningham Road, Bengaluru, Karnataka (exact address from company facts)
  - **Pincode:** 560038 (Bengaluru, Vasanth Nagar area)
  - **Pickup contact:** Dan's mobile
  - **Pickup ready time:** 10:00 AM
  - **Pickup cut-off time:** 4:00 PM (daily)
  - **Holidays:** Define 2026 festival dates (Diwali Oct, Raksha Bandhan Aug, etc.) — Shiprocket allows holiday calendar setup

- [ ] **Confirmation checkpoint:** Screenshot KYC verified status and Business Plan active in Shiprocket dashboard. Send to Harley.

---

### 1.2 Zone Mapping & Rate Card Configuration

**Owner:** Andy (with Dan's verification)
**Timeline:** Day 2 of Shiprocket setup
**Estimated time:** 1 hour

**Context:** Shiprocket auto-detects zone based on customer pincode. No manual configuration needed for zones. However, Dan must verify that the rate cards displayed in checkout match our pricing assumptions.

**Tasks:**

- [ ] Verify Shiprocket zone structure in account settings
  - Shiprocket will display default zones for Bengaluru origin
  - Confirm the following are visible in Shiprocket's rate calculator:
    - **Zone A:** Bengaluru city — 1–2 day delivery
    - **Zone B:** Karnataka state — 2–3 days
    - **Zone C:** Metro cities (Delhi, Mumbai, Chennai, Kolkata, Hyderabad) — 2–4 days
    - **Zone D:** Tier 2/3 cities, rest of India — 4–7 days
    - **Zone E:** Northeast (Assam, Manipur, Mizoram, Nagaland, Arunachal Pradesh), J&K, Himachal — 7–12 days

- [ ] Access Shiprocket Rate Calculator
  - Log in to Shiprocket → Pricing → Rate Card
  - Filter by weight slabs: 0–500g, 500g–1kg, 1–2kg, 2–5kg
  - Record actual rates for each zone and weight slab
  - **Critical check:** Is the prepaid rate (no COD) within ₹35–₹90 for 0–500g across all zones? (per logistics baseline Section 8)
  - **Critical check:** Is COD addon ₹26–₹36 flat or ~2% of order value?

- [ ] Compare live rates vs. baseline assumptions
  - **Baseline expectation (from logistics-baseline.md Section 8):**
    - Zone A (0–500g): ₹35–₹45 prepaid
    - Zone C (0–500g): ₹50–₹70 prepaid
    - Zone D (0–500g): ₹65–₹90 prepaid
    - Zone E (0–500g): ₹90–₹140 prepaid (or India Post fallback)
    - COD addon: ₹26 flat or 2%

  - **If actual rates are significantly higher (>20%) than baseline:**
    - Flag immediately to Harley and Patrick (affects margin model)
    - Do NOT proceed without approval

- [ ] Enable preferred carriers
  - Select primary carriers: Delhivery, Ecom Express, DTDC, BlueDart
  - Enable India Post as fallback for unserviceable pins
  - In Shiprocket settings, set auto-routing to "Intelligent" (Shiprocket's algorithm selects best carrier per pin code)

- [ ] Configure pin code serviceability check at checkout
  - Enable Shiprocket's "Serviceable Pin Code" widget
  - This will allow customers to check if their location is serviceable before checkout
  - **Note:** Not mandatory but recommended to reduce failed deliveries and customer disappointment

- [ ] **Confirmation checkpoint:** Screenshot rate card showing 0–500g prepaid and COD costs across all zones. Send to Harley.

---

### 1.3 COD Configuration & Testing

**Owner:** Andy (setup guidance), Dan (execution)
**Timeline:** Day 3 of Shiprocket setup
**Estimated time:** 2 hours (including test orders)

**Critical requirement:** COD must be tested end-to-end before launch. Do not skip this.

**Tasks:**

- [ ] Enable COD in Shiprocket dashboard
  - Settings → Payment Methods → Enable Cash on Delivery
  - Max COD order value: ₹10,000 (default is fine; TPL's max order is ₹999)
  - Default COD mode: Auto-confirm (Shiprocket collects payment)

- [ ] Configure COD minimum order amount
  - Set to ₹299 (matching D-006 pricing decision: free shipping threshold ₹499, but COD minimum ₹299)
  - **Reason:** Shipping cost for sub-₹299 orders on COD would be loss-making

- [ ] Connect bank account for COD remittance
  - Bank name, account number, IFSC code
  - Remittance schedule: D+8 (standard for Shiprocket)
  - Shiprocket will settle COD collections automatically

- [ ] Test COD end-to-end (pre-launch)
  - **Test order creation:**
    - Use Fynd Commerce store (once Tobi sets up)
    - Create test order with COD as payment method
    - Product: ₹249 (within testing range)
    - Pincode: Any serviceable zone (e.g., own address)
    - Expected flow: Order placed → Razorpay offers COD option → Customer selects COD → Order appears in Shiprocket as COD

  - **In Shiprocket dashboard:**
    - Navigate to Orders
    - Verify test order appears
    - Check payment status: "COD Pending"
    - Check address populated correctly
    - Generate AWB (Airway Bill) — this is critical

  - **AWB generation (critical):**
    - Click "Assign shipment" in Shiprocket
    - Select a carrier (Delhivery recommended)
    - Shiprocket generates unique AWB number
    - Print label from Shiprocket dashboard
    - Check label format: barcode readable, address clear, COD amount printed

  - **Pickup scheduling:**
    - Shiprocket should auto-schedule pickup based on your configured pickup slot (4:00 PM cut-off)
    - Verify pickup showing in dashboard with scheduled time
    - If manual booking required, Shiprocket provides pickup booking link

  - **Failure scenarios to test:**
    - What if customer refuses delivery?
      - Shiprocket marks as NDR (Non-Delivery Report)
      - Status: "Return Initiated"
      - No payment collected; order marked as failed
      - Return process follows return SOP (Section 5)

    - What if package is damaged?
      - Shiprocket notes damage in carrier app
      - Dan must follow damage SOP (issue replacement, no refund — locked in Section 5)

- [ ] **Success criteria:**
  - At least 3 test COD orders placed → AWBs generated → Pickup scheduled
  - No errors in order sync Fynd → Shiprocket
  - AWB labels printable and readable
  - Status updates visible in Shiprocket dashboard

- [ ] **Confirmation checkpoint:** Send Harley screenshots of:
  - Test orders in Shiprocket (COD status visible)
  - Generated AWB labels
  - Pickup scheduled confirmation
  - Bank account connected for remittance

---

### 1.4 Returns Address Configuration

**Owner:** Dan (setup), Andy (verification)
**Timeline:** Day 4 of Shiprocket setup
**Estimated time:** 15 minutes

**Tasks:**

- [ ] Add return address in Shiprocket
  - **Address:** Same as pickup address (Cunningham Road, Bengaluru)
  - **Label:** TPL Returns
  - **Pin code:** 560038
  - **Contact:** Dan's mobile
  - **Purpose:** Generates return labels for damaged/defective items

- [ ] Enable auto-return labels in Shiprocket
  - When customer initiates return, Shiprocket auto-generates prepaid return label
  - **Policy decision (locked in Section 5):** TPL will NOT accept returns for preference changes. Only damaged goods get returns (and replacement, no refund).

- [ ] **Confirmation checkpoint:** Screenshot return address configured in Shiprocket dashboard.

---

## 2. COD Workflow Diagram & Validation

### 2.1 End-to-End COD Order Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ CUSTOMER PLACES ORDER (Fynd Storefront)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Customer adds product to cart (e.g., ₹249 keychain)         │
│  2. Proceeds to checkout                                         │
│  3. Enters delivery address & phone                             │
│  4. Selects payment method → sees "Cash on Delivery" option     │
│  5. If order value < ₹499 → free shipping NOT shown (add ₹70)  │
│  6. If order value ≥ ₹499 → free shipping applied              │
│  7. Confirms order with COD selected                            │
│                                                                  │
│  ⚠️ CRITICAL: Razorpay MUST show COD as option at checkout.     │
│     This depends on Tobi's integration (see Section 3.3).       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ FYND → SHIPROCKET AUTO-SYNC (Tobi's integration)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Order auto-appears in Shiprocket dashboard within 5 mins    │
│  2. Status: "COD Pending"                                       │
│  3. All address & product details synced                        │
│  4. COD amount calculated: product price + shipping - discount  │
│  5. Order ready for AWB generation                              │
│                                                                  │
│  ✓ Requires: Fynd ↔ Shiprocket API integration (Tobi)          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ DAN'S FULFILLMENT (Dan's daily workflow)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Morning routine (by 9:00 AM):                                  │
│  1. Check Shiprocket dashboard for new COD orders               │
│  2. For each order:                                             │
│     a) Verify address is complete (no missing details)         │
│     b) Check product is in stock                               │
│     c) If address suspicious (undeliverable), flag for review  │
│  3. Generate AWB label for each order in Shiprocket            │
│  4. Print labels (thermal printer or home inkjet)              │
│                                                                  │
│  Packing (Dan's responsibility):                               │
│  1. Pick product from inventory                                │
│  2. Pack per packaging SOP (Section 4.2)                       │
│  3. Affix AWB label to package                                 │
│  4. Mark status in Shiprocket: "Ready for Pickup"              │
│                                                                  │
│  Pickup (Shiprocket handles):                                  │
│  1. Carrier (Delhivery/Ecom Express) picks up at 4:00 PM      │
│  2. All packages scanned, handed to courier                    │
│  3. Shiprocket sends pickup confirmation to Dan                │
│  4. Tracking ID becomes active (customer gets WhatsApp link)   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ DELIVERY & PAYMENT COLLECTION (Carrier responsibility)         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  In-transit (Day 1-7):                                          │
│  • Carrier updates tracking in real-time                        │
│  • Shiprocket pushes updates to Fynd → customer sees tracking  │
│                                                                  │
│  At delivery (attempted):                                       │
│  • Carrier agent rings doorbell                                 │
│  • Customer arrives → delivery confirmed                        │
│  • Customer pays COD amount to carrier                          │
│  • Carrier scans delivery proof                                 │
│  • Shiprocket marks: "Delivered"                               │
│                                                                  │
│  ⚠️ Failure case — Customer refuses (NDR):                      │
│  • Carrier cannot reach customer or customer refuses            │
│  • Marked as NDR (Non-Delivery Report)                          │
│  • Shiprocket: Order → "RTO Initiated"                         │
│  • See Section 2.2 for RTO handling                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ PAYMENT SETTLEMENT (Shiprocket + Bank)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Day 1-3: Carrier collects COD                                  │
│  Day 4-8: Carrier remits to Shiprocket                         │
│  Day 9: Shiprocket credits Dan's bank account                  │
│                                                                  │
│  Flow:                                                           │
│  Customer pays ₹249 to courier → Courier remits to Shiprocket  │
│  → Shiprocket deducts COD fee (₹26–₹36) → Remits ₹213–223     │
│  → Dan receives in bank after D+8 to D+10                      │
│                                                                  │
│  Shiprocket provides:                                           │
│  • Detailed remittance report (daily)                           │
│  • Bank settlement reference in Shiprocket dashboard            │
│  • Reconciliation with order tracking                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Failure Scenarios & Resolution

**Scenario 1: Customer Refuses Delivery (NDR)**

| Trigger | Customer not home, refuses order, or address wrong |
|---------|-----|
| Carrier Action | Marks as NDR (Non-Delivery Report) in Shiprocket |
| Shiprocket Status | "RTO Initiated" (Return to Origin) |
| Dan's Action | Wait 2–3 days for package to return to Bengaluru |
| Upon Return | Inspect package → If undamaged, restock inventory |
| Refund Process | Shiprocket marks COD unpaid; no payment collected from customer |
| No Action Needed | Customer already warned at checkout about address accuracy |
| Prevention | Enable "WhatsApp pre-delivery confirmation" in Eli's flows (Phase 5) |

**Scenario 2: Package Damaged in Transit**

| Trigger | Customer reports damage upon delivery or discovers upon opening |
|---------|-----|
| Customer Reports | Via WhatsApp (Eli's customer support flow) |
| Dan's Response | Request photo evidence (inside of package, damage visible) |
| Policy (Locked) | Replacement shipped within 3 business days; customer keeps damaged item |
| No Refund | Even if prepaid; exchange-only policy per logistics baseline Section 6 |
| Dan's Action | Generate return label from Shiprocket (optional); customer can keep item |
| Follow-up | Send replacement in next batch shipment (next business day) |

**Scenario 3: Wrong Product Dispatched (Dan's Picking Error)**

| Trigger | Dan picked wrong SKU or variant |
|---------|-----|
| Customer Reports | Via WhatsApp |
| Policy (Locked) | Replacement dispatched immediately; customer keeps wrong item (reverse logistics cost > item value) |
| No Refund | Per logistics baseline Section 6 |
| Dan's Action | Verify error in fulfillment logs, dispatch correct product, mark in Shiprocket as "Replacement Sent" |

**Scenario 4: Prepaid Order Tracking URL Not Shared**

| Trigger | Razorpay integration incomplete or Shiprocket tracking not pushed to Fynd |
|---------|-----|
| Prevention | Tobi must test Shiprocket tracking sync in staging; James signs off on this in QA (P1 criteria) |
| Dan's Action | If customer texts asking for tracking, provide AWB from Shiprocket dashboard (manual fallback) |
| Escalation | Report to Tobi; this is a build issue, not ops issue |

---

### 2.3 COD Risk Mitigation Checklist

**Before launch, Dan should implement these:**

- [ ] Enable WhatsApp COD confirmation (Eli's responsibility in Phase 5)
  - Within 5 minutes of order placement, send: "Hi [name], we've received your order. Expecting delivery [date]. Pay ₹[amount] at door. Confirm or reply with questions."
  - Expected to reduce RTO rate 30–40% (logistics baseline Section 7)

- [ ] Address verification at checkout (Tobi's responsibility)
  - Fynd checkout should ask for pincode, locality, state
  - Suggest customer verify address before submitting
  - Minimizes wrong-address NDRs

- [ ] Prepaid incentive messaging (Joanna + Casey's responsibility)
  - Copy at checkout: "Pay now & save ₹30 + get guaranteed tracking"
  - Expected to convert 31–38% of COD intent to prepaid (logistics baseline)
  - Reduces RTO risk and speeds up cash flow

- [ ] Keep COD RTO below 10%
  - Target: <10% of COD orders returned
  - Industry average: 28–35% (logistics baseline)
  - Achieve through WhatsApp confirmation + address verification + prepaid incentive
  - Monitor weekly; if RTO climbs above 10%, escalate to Harley

---

## 3. Razorpay Payment Processing & Payout Confirmation

### 3.1 Razorpay Account Setup

**Owner:** Dan (self-service through Razorpay dashboard)
**Timeline:** Can start immediately (parallel with Shiprocket)
**Estimated time:** 45 minutes

**Tasks:**

- [ ] Create Razorpay Business Account
  - Go to www.razorpay.com
  - Sign up with email: productlab.info@gmail.com
  - Business name: The Product Lab
  - Business type: Retail / Fashion

- [ ] Complete KYC verification
  - PAN card (Dan)
  - Bank account for payouts
  - Address proof

- [ ] Add settlement bank account
  - **Bank account details (for payouts):**
    - Account holder: Dan / The Product Lab
    - Account number: [Dan to provide]
    - IFSC code: [Dan to provide]
    - Account type: Savings (preferred) or Current
  - Razorpay will verify account by sending micro-deposits (₹1 each) to confirm ownership
  - Confirmation takes 1–2 business days

- [ ] Enable payment methods in Razorpay
  - [ ] Credit cards (Visa, Mastercard, Amex)
  - [ ] Debit cards
  - [ ] UPI (critical for India D2C — 60%+ of online transactions)
  - [ ] Wallets (PhonePe, Google Pay, Amazon Pay)
  - [ ] EMI (12-month installments) — optional; attracts higher-value customers
  - [ ] Netbanking (fallback, lower conversion)

- [ ] **Do NOT enable:**
  - International cards (out of scope for this launch)
  - Razorpay Subscriptions (not yet needed)

- [ ] Set up Razorpay API keys
  - **Public key:** Shared with Tobi for Fynd integration
  - **Secret key:** Kept confidential; used by Tobi's backend only
  - **Store securely:** Use Fynd's secure environment variables (not GitHub, not email)

- [ ] Enable test mode for staging
  - Razorpay provides test credentials for sandbox testing
  - Tobi uses these for pre-launch testing (James verifies in QA)

- [ ] **Confirmation checkpoint:** Send Harley screenshots of:
  - KYC verified status
  - Settlement bank account verified
  - All payment methods enabled
  - Test mode API keys generated

---

### 3.2 Payout Schedule & Cash Flow Planning

**Context:** Razorpay doesn't instantly credit Dan's account. Understand the float.

**Standard Razorpay settlement:**

| Payment Method | Settlement Timeline | Example |
|---|---|---|
| Credit card | T+3 (3 days after transaction) | Order placed Wed → Money received Sat |
| Debit card | T+3 | Same as credit card |
| UPI | T+1 (next business day) | Order placed Wed → Money received Thu |
| Wallet | T+1 to T+3 | Depends on wallet issuer |
| EMI | T+3 to T+7 | Longer due to installment processing |
| **Prepaid average** | **T+2 (blended across all methods)** | Most orders arrive T+1 to T+3 |

**Cash flow implication:**
- Customer pays ₹249 on Wednesday
- Dan's account receives ₹249 on Friday (T+3, worst case)
- If bulk orders arrive (e.g., 20 orders Wed, 20 Thu), Dan has ₹2,500+ floating in Razorpay's account for 3 days
- This is normal; Razorpay holds no fee. No cost to Dan.

**For COD orders (separate from Razorpay):**
- Carrier collects cash
- Shiprocket remits on D+8
- Dan receives on D+10
- This is a longer float; plan cash accordingly

**Dan's cash flow expectation before Phase 5 goes live:**
- Minimal daily orders (validation phase)
- Prepaid: expect ₹500–2,000/day in orders
- COD: expect ₹300–1,000/day in orders
- Daily revenue: ₹800–3,000
- With T+2 payout, expect ₹1,600–6,000 cash sitting in Razorpay at any time

**No action required** — Razorpay handles this automatically. Dan simply monitors the Razorpay dashboard for incoming transactions.

---

### 3.3 Razorpay ↔ Fynd Integration (Tobi's Responsibility)

**Critical dependency for launch.**

**Integration requirements:**

- [ ] Razorpay plugin for Commerce.com / Fynd installed and configured
- [ ] Public API key configured in Fynd settings
- [ ] Test transactions processed successfully in staging
- [ ] Live API key activated (only after James approves QA sign-off)
- [ ] Checkout flow displays Razorpay payment options (cards, UPI, wallets, COD)
- [ ] Payment confirmation returns to Fynd order management
- [ ] Razorpay webhook configured to sync payment status to Fynd database

**Andy's role:** Verify that Tobi has completed this. Ask for confirmation before launch.

**Verification checklist (for Dan to do in staging):**
- [ ] Add ₹249 product to cart
- [ ] Proceed to checkout
- [ ] See Razorpay payment gateway (4+ payment method options)
- [ ] Click "UPI" → see NPCI UPI gateway
- [ ] Cancel and try credit card → see card form
- [ ] Cancel and select "COD" → confirm COD option available
- [ ] No errors during payment flow

---

### 3.4 Daily Payout Monitoring (Dan's Responsibility)

**Post-launch, Dan should:**

- [ ] Check Razorpay dashboard daily (5 min)
  - Navigate to Payouts section
  - View incoming payments from previous day
  - Cross-reference with Fynd orders placed

- [ ] Weekly reconciliation
  - Log in to Razorpay → Settlement report
  - Download settlement report (CSV)
  - Cross-reference with Fynd order export
  - Flag any discrepancies (missing payments, duplicate credits)

- [ ] Monthly financial record-keeping (Patrick's responsibility, but Dan initiates)
  - Export Razorpay settlement report → send to Patrick
  - Export Shiprocket COD settlement report → send to Patrick
  - Patrick reconciles against GST filing

**No advanced setup needed for launch.** Razorpay is automatic once activated.

---

## 4. Packaging Specification & QA

### 4.1 Packaging Materials (Per asset-list.md)

**Dan is sourcing these. Confirm before launch:**

| Material | Quantity | Source | Cost (estimate) | Notes |
|---|---|---|---|---|
| Matte black mailer bags | 500 | Amazon / packaging suppliers | ₹1,500–2,000 | 6x10" or 6x12" size for TPL products |
| Kraft tissue paper | 1 roll (min 500 sheets) | Amazon / packaging suppliers | ₹200–300 | For wrapping inside mailer |
| TPL sticker seal | 500 | Print vendor (see below) | ₹500–800 | Custom-printed sticker; closes mailer |
| Handwritten note card stock | 50 cards pre-printed | Print vendor | ₹300–400 | 3x5" cards; blank inside for Dan to write personal notes |
| Filler (crinkle fill, bubble wrap) | Optional | Amazon | ₹200–300 | For delicate items (keychains, pins) |

**Sticker seal custom printing:**
- Design: TPL red (#E63B2E) logo on kraft sticker
- Size: 1.5" × 1.5" square
- Quantity: 500 (₹5–10 per sticker)
- Vendor: Local print shop or PrintNinja
- Timeline: Order by April 4, delivery by April 8

**Handwritten note cards:**
- Pre-print: "Thank you for your order — [space for signature]"
- Design: Barlow Condensed font, small, bottom of card
- Quantity: 50 cards (small batch; Dan can reorder after first 50 orders)
- Vendor: Local print shop
- Timeline: Order by April 4, delivery by April 8

**Total packaging cost:** ~₹3,500–3,900 upfront; scales with volume

---

### 4.2 Packaging & Unboxing SOP (Dan's Daily Process)

**For every order, Dan follows this flow:**

**Before packing:**
1. Print AWB label from Shiprocket
2. Pull order from Fynd (order #, customer name, products)
3. Confirm product in stock
4. Set aside in fulfillment area

**Packing (per-order, ~3–5 min):**
1. **Place product in matte black mailer bag**
   - Single light item (card sticker, small pin): no cushioning needed
   - Heavier item (keychain, magnet): wrap in 1–2 sheets of kraft tissue first (protects + adds premium feel)

2. **Add kraft tissue fill**
   - Place 2–3 sheets of kraft tissue around product
   - Creates cushion; makes unboxing feel premium

3. **Add handwritten note**
   - Write personal note on card: "Hi [first name], thanks for supporting indie artists. – Dan"
   - Variation 1: "Wear this opinion. — Dan"
   - Variation 2: "[Product name] ready to make statements. — Dan"
   - Place note on top of product inside mailer

4. **Seal mailer with TPL sticker**
   - Fold mailer flap down
   - Apply TPL red sticker seal at fold (centered)
   - Press firmly to seal

5. **Affix AWB label**
   - Place printed AWB label on top-right of mailer (1" margin from edge)
   - Make sure barcode is clearly visible (not wrinkled, not covered)

6. **Weight & size check**
   - Typical order: 80–150g (well within 0–500g slab)
   - Mailer dimensions: 6×10" (standard; fits in all courier vehicles)

7. **Mark as ready**
   - In Shiprocket: Update order status to "Ready for Pickup"
   - Stack packages in pickup area

**Example unboxing sequence for customer:**
1. Receive black mailer at door (branded, recognizable)
2. Open mailer → See kraft tissue (premium texture)
3. Open tissue → See product + handwritten note
4. Read personalized message → Feel cared-for
5. Check product quality → Expect: enamel pins have sharp edges, card stickers flat and glossy, keychains solid feel
6. Keep mailer/tissue as part of brand memory

---

### 4.3 Packaging QA Checklist

**Before Phase 4 gate (before first order ships), Dan should QA the packaging end-to-end:**

- [ ] **Material quality check:**
  - [ ] Matte black mailers: Not shiny, no grease, folds smoothly without creasing
  - [ ] Kraft tissue: Right thickness (not too thin to tear, not so thick it's stiff)
  - [ ] TPL stickers: Red color matches #E63B2E, seal holds without peeling
  - [ ] Note cards: White/cream color, printing clear and centered

- [ ] **Pack a test order (5 packs):**
  - [ ] Select 5 different products (pin, card sticker, keychain, magnet, bundle)
  - [ ] Pack each following 4.2 SOP
  - [ ] Time each pack (target: 3–5 min each)
  - [ ] Inspect for:
    - [ ] AWB label readable and secure (not peeling)
    - [ ] No product damage inside
    - [ ] Tissue not compressed (room to breathe inside)
    - [ ] Note card visible at top
    - [ ] Sticker seal holding without gaps

- [ ] **Unboxing test (have someone else unbox):**
  - [ ] Ask a friend to unbox one of the 5 test packs
  - [ ] Collect feedback:
    - How does it feel opening the mailer?
    - Is the note card visible immediately?
    - Does the product feel protected?
    - Would they keep the mailer?
  - [ ] Iterate if feedback suggests improvements

- [ ] **Photo documentation:**
  - [ ] Take 3 photos: sealed mailer (front), opened mailer (tissue visible), unboxed (note + product)
  - [ ] Send to Harley for approval

- [ ] **Fulfillment time target:**
  - [ ] Dan should be able to pack 20 orders per hour (9 min each) once in rhythm
  - [ ] For Phase 1 (pre-launch validation): expect 5–10 orders/day; should take <1.5 hours total packing

---

## 5. Return & Exchange SOP (Public-Facing)

### 5.1 Return Policy (Locked Decision — Do Not Change)

This policy is the locked decision from logistics baseline Section 6. It is informed by unit economics (shipping cost > product cost for most items) and is approved by Patrick (financial).

---

## RETURNS & EXCHANGES POLICY

**Effective Date:** [Launch date]

The Product Lab is committed to quality. If something goes wrong, we'll make it right.

### What We Accept (Exchange Only)

**Damaged on Arrival**
- If your product arrived damaged, we'll send a replacement within 3 business days.
- Reply to this email or WhatsApp a photo showing the damage.
- Keep the damaged item; no need to return it.

**Wrong Product**
- If we shipped the wrong item, we'll correct it immediately.
- You can keep the wrong product as our apology for the mix-up.
- We'll send the correct product in the next batch (usually next business day).

**Defect in the Product**
- If the product has a manufacturer defect (enamel chipping, sticker peeling, etc.), we'll replace it or offer store credit.
- Send photo evidence to productlab.info@gmail.com or WhatsApp.
- We'll evaluate and respond within 2 business days.

### What We Don't Accept

**Changed Your Mind (Prepaid Order)**
- We can't accept returns for preference changes.
- But we can offer you store credit valid for 6 months if you'd like to try something else.

**Changed Your Mind (COD Order)**
- If you ordered COD, you confirmed the delivery at the door. No return window for preference changes.
- We can offer store credit or you can place a new order.

**Not Delivered Within SLA**
- Our standard delivery is 2–7 days depending on your location.
- If your order doesn't arrive within our promised timeframe, we'll re-dispatch or refund fully.

### How It Works

1. **Report an issue** → Reply to your confirmation email or WhatsApp [TPL WhatsApp number]
2. **Send proof** → Photo or description of the problem
3. **We evaluate** → Usually within 24 hours
4. **We resolve** → Replacement ships or credit issued
5. **Done** → Tracking sent; issue closed

### Refund Policy

**Full refunds are only issued for:**
- Not delivered within SLA (7+ days past promised date)
- Damaged items where replacement is not acceptable

**Why limited returns?** We're a small team shipping small items with real care. Reverse logistics costs ₹60–100 per shipment — often more than the product itself. We'd rather give you a fresh replacement or credit than charge back to you.

---

### 5.2 Internal Return SOP (What Dan Does)

When a customer reports a return/exchange:

**Step 1: Acknowledge (Within 4 hours)**
- Response via WhatsApp (primary) or email (secondary)
- Example: "Got your message about the damaged pin. We're on it. Can you send a quick photo? Reply here."

**Step 2: Evaluate (Within 24 hours)**
- Is it a legitimate damaged/defect case? (Check photo)
- Is customer trying to do a preference return? (Politely decline per policy)
- If legitimate: approve replacement or store credit

**Step 3: Process**
- **If replacement:**
  - Pick new unit from inventory
  - Pack per SOP (Section 4.2)
  - Generate Shiprocket label for replacement shipment
  - Send tracking link via WhatsApp
  - Mark original order in Fynd as "Replacement Issued"

- **If store credit:**
  - Issue ₹[amount] credit code in Fynd (or manually via email: "Use code CREDIT50 for ₹50 off your next order")
  - Valid for 6 months
  - Send via email + WhatsApp

- **If return label needed (rare):**
  - Use Shiprocket to generate return label
  - Email/WhatsApp return label to customer
  - Customer attaches label to original package
  - Arrange pickup or customer drops at nearest courier center

**Step 4: Closure**
- Once resolved, mark in CRM/order tracking: "Issue Resolved — [method]"
- Keep record for Harley's monthly review

**Timeline commitment:**
- Acknowledgment: 4 hours
- Evaluation: 24 hours
- Replacement shipped: 3 business days
- Refund (if applicable): 5–7 business days (Razorpay processing)

---

## 6. Dan's Pre-Launch Operational Checklist

**Timeline: Before Phase 4 gate is cleared, Dan must complete every item below.**

### 6.1 Account Activation & Verification (Days 1–2)

- [ ] Shiprocket account created
  - [ ] KYC verified
  - [ ] Business Plan activated (₹199/month)
  - [ ] Pickup location configured (Cunningham Road)
  - [ ] Bank account linked (for COD remittance)

- [ ] Razorpay account created
  - [ ] KYC verified
  - [ ] Settlement bank account linked
  - [ ] All payment methods enabled (cards, UPI, wallets, COD)
  - [ ] Test mode API keys generated

- [ ] Shiprocket rate cards validated
  - [ ] Live rates compared vs. baseline assumptions
  - [ ] No surprises (rates within ₹35–₹140 range per logistics baseline)

---

### 6.2 Shiprocket Configuration & Testing (Days 2–4)

- [ ] Zones & carriers configured
  - [ ] Preferred carriers selected (Delhivery, Ecom Express, DTDC, BlueDart)
  - [ ] India Post enabled as fallback

- [ ] COD workflow tested end-to-end
  - [ ] 3+ test COD orders created
  - [ ] All orders synced from Fynd to Shiprocket
  - [ ] AWBs generated successfully
  - [ ] Carrier selected and pickup scheduled
  - [ ] Screenshots sent to Harley

- [ ] Returns address configured
  - [ ] Same as pickup address set in Shiprocket

---

### 6.3 Packaging Materials Sourced & QA'd (Days 2–5)

- [ ] Matte black mailer bags ordered
  - [ ] Quantity: 500
  - [ ] Delivery: By April 8

- [ ] Kraft tissue ordered
  - [ ] Quantity: 1 roll (500+ sheets)
  - [ ] Delivery: By April 8

- [ ] TPL sticker seals custom-printed
  - [ ] Design: Red TPL logo on kraft
  - [ ] Quantity: 500
  - [ ] Delivery: By April 8

- [ ] Handwritten note cards custom-printed
  - [ ] Pre-printed: "Thank you for your order — [signature space]"
  - [ ] Quantity: 50 (initial batch)
  - [ ] Delivery: By April 8

- [ ] Packaging QA completed
  - [ ] 5 test packs assembled and inspected
  - [ ] Unboxing feedback collected
  - [ ] Photos sent to Harley for approval

---

### 6.4 Fulfillment Readiness (Days 5–6)

- [ ] Fulfillment area set up
  - [ ] Inventory storage organized (by product, easy to pick)
  - [ ] Packing station set up (table, materials, printer access)
  - [ ] Thermal or inkjet printer available for AWB labels
  - [ ] Shiprocket dashboard accessible from work location

- [ ] Daily workflow practiced
  - [ ] Simulated packing of 20 orders (timing)
  - [ ] Timing target: 3–5 min per pack, 4–6 packs/hour
  - [ ] Confirmed Shiprocket dashboard navigation for order management

---

### 6.5 Finance & Reconciliation Ready (Day 6)

- [ ] Razorpay payout account confirmed
  - [ ] Bank account verified (micro-deposits confirmed)
  - [ ] Daily payout schedule understood (T+1 to T+3 depending on payment method)
  - [ ] Shiprocket COD remittance account confirmed (D+8 timing)

- [ ] Monthly reconciliation process documented
  - [ ] Razorpay settlement export process tested (CSV download)
  - [ ] Shiprocket COD settlement export process tested
  - [ ] Patrick briefed on monthly reconciliation handoff

---

### 6.6 Launch Day Readiness (Day 7)

- [ ] All Shiprocket + Razorpay credentials secure
  - [ ] API keys stored securely (not on phone, not in email)
  - [ ] Dashboard login passwords reset (strong password)
  - [ ] Two-factor authentication enabled on both accounts

- [ ] Backup process confirmed
  - [ ] If Shiprocket down, manual AWB generation available (e.g., Shipway account as backup; optional but recommended)
  - [ ] If internet down, Fynd orders can still be exported and processed manually

- [ ] Daily operational checklist created (separate document for Dan)
  - [ ] Morning: Check Shiprocket for new orders (5 min)
  - [ ] Mid-morning: Generate AWBs and pack orders (30–60 min depending on volume)
  - [ ] Afternoon: Mark ready for pickup in Shiprocket; confirm pickup scheduled (5 min)
  - [ ] Evening: Document any issues or delays (5 min)

---

## 7. Open Questions for Dan & Harley

### For Dan

1. **Bank account for COD remittance:** Which bank account should Shiprocket use for COD settlements? (Shiprocket requires IFSC code and account number.)

2. **Thermal vs. inkjet printer:** Do you have a thermal label printer? (Strongly recommended; much faster for daily label printing.) If not, home inkjet is fine but slower.

3. **Return label preference:** Will you provide prepaid return labels for damaged items? (Recommended per logistics baseline: yes, because it builds trust even though customer keeps the item anyway.)

4. **Prepaid discount communication:** Joanna + Casey will write copy promoting ₹30 prepaid discount. Are you comfortable with that messaging?

5. **Customer support response time:** You'll handle all returns/exchanges directly (WhatsApp or email). Can you commit to 4-hour acknowledgment, 24-hour evaluation window?

6. **Shiprocket backup:** Would you like to set up a backup aggregator account (Shipway or NimbusPost) in case Shiprocket has downtime? (Optional but recommended for risk mitigation.)

### For Harley

1. **Launch date decision:** When should Phase 5 pre-launch content start publishing (Phase 4 gate date)? This determines when Rachel starts seeding gifts, when Chase publishes posts, etc.

2. **Prepaid discount confirmation:** Patrick approved ₹30 discount for prepaid orders (vs. COD). Confirmed locked, or revisit?

3. **Return policy approval:** The return SOP in Section 5.1 is locked per logistics baseline. Confirm no changes before publishing on website?

4. **Scaling beyond ₹10,000/month:** If Phase 5 launch succeeds and revenue grows to >₹10,000/month, should we hire a fulfillment assistant or explore 3PL (third-party logistics)? This is Phase 6 planning, but flagging now.

---

## 8. Success Criteria — Phase 4 Gate

Before James signs off on QA (Phase 4 gate), Andy must confirm:

- [ ] Shiprocket account fully configured and tested (COD + prepaid)
- [ ] At least 3 test COD orders placed, AWBs generated, pickup scheduled
- [ ] Razorpay live transactions processed (Tobi confirms in staging)
- [ ] Live shipping rate assumptions validated (within baseline ₹35–₹140 range)
- [ ] Packaging materials sourced and QA'd
- [ ] Dan's fulfillment workflow practiced and timed (<5 min per order)
- [ ] Return policy written and approved by Harley
- [ ] All Dan's pre-launch checklist items complete

**No launch without this.** Operational failures kill brands.

---

## 9. Handoff to Phase 5 (Pre-Launch Marketing)

Once Phase 4 gate clears:

- Andy creates Dan's daily operational checklist (separate doc — not this artifact)
- Handoff to Eli: Customer support workflows (Section 5 return SOP)
- Handoff to Rachel: Seeding plan (clarify COD min ₹293, free shipping ₹499)
- Handoff to Chase: Content calendar copy (prepaid discount messaging)
- Handoff to Tony: Ops runbook for Day 30 review

---

## Summary

This ops plan translates Raj's logistics baseline into executable tasks for Dan and verification points for Andy.

**What gets shipped:** Branded mailers with handwritten notes. Premium unboxing. Reliability.

**What gets measured:** RTO rate (target <10%), time-to-pack (target <5 min), payment settlement accuracy, return/exchange response time (<24 hours evaluation).

**What can go wrong:** Shiprocket outage (mitigated by multi-carrier), COD fraud (mitigated by WhatsApp confirmation), packaging quality dips (mitigated by QA), Dan overwhelmed at scale (Phase 6 hiring decision).

**Success metric:** Every order ships on schedule, customers receive working products, returns/exchanges resolved within 3 days. Trust = retention = word-of-mouth growth.

Launch with operational excellence, or don't launch.
