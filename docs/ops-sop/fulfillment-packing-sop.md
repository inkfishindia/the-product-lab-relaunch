<!-- last-updated: 2026-03-27 -->
# Fulfillment & Packing SOP — Day-to-Day Operations

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build and Merchandising Implementation |
| **Producing Agent** | Raj (Logistics & Fulfillment Lead) |
| **Date** | 2026-03-27 |
| **Status** | draft |
| **Reviewer** | Dan |

---

## Overview

This document is Dan's daily operational manual for order fulfillment. Every step is designed for one person to execute solo in <10 minutes per order. No staff required. No custom software required. Use Fynd Commerce, Shiprocket, and basic supplies to receive, pack, label, and dispatch.

**Target:** Dan can pack and dispatch a single order in <10 minutes. Unboxing experience is branded and photogenic.

---

## Part 1: Order Receipt & Verification

### Step 1.1: Daily Order Sync (5 mins, Morning)

**When:** 9:00 AM daily
**Where:** Shiprocket dashboard
**Action:**

1. Log into [Shiprocket](https://www.shiprocket.in)
2. Go to **Orders** → **New Orders**
3. Review all orders placed since yesterday
4. For each order, verify:
   - [ ] Customer full name (first + last)
   - [ ] Delivery address is complete (street, pin code, state)
   - [ ] Phone number is valid (10-digit mobile)
   - [ ] COD vs Prepaid flag is correct
   - [ ] Special requests or notes captured in order comments

**If address is incomplete:**
- WhatsApp the customer immediately (use their phone number from order)
- Template: *"Hi [Name]! We got your order for [Product]. Just confirming your delivery address: [Address]. Should we proceed?"*
- Wait for confirmation before proceeding to packing
- Do NOT pack or dispatch incomplete addresses

**Output:** List of orders ready to pack (address verified)

---

### Step 1.2: Inventory Check (3 mins, Before Packing)

**When:** Before packing each order
**Where:** Fynd Commerce inventory dashboard
**Action:**

1. Log into [Fynd Commerce](https://commerce.fynd.com) (or equivalent platform)
2. For each SKU in the order, verify:
   - [ ] Product is in stock
   - [ ] Color/variant matches order
   - [ ] Deduct from inventory in Fynd (or keep manual count in Google Sheet)

**If out of stock:**
- Email or WhatsApp customer immediately
- Template: *"Hi [Name], the [Product] you ordered is currently out of stock. We can either: (a) refund your order, or (b) replace with [Similar Product]. Which would you prefer?"*
- Do NOT dispatch; escalate to Dan for decision

**Output:** Verified inventory; ready to pick

---

## Part 2: Picking (2 mins per order)

### Step 2.1: Physical Product Picking

**Where:** Product storage location (shelves, bins, or physical store area)
**What to do:**

1. Print order slip (from Fynd or write on paper):
   - Order number
   - SKU
   - Product name + variant (color, size)
   - Quantity

2. Locate product by SKU (use consistent labeling system)

3. Inspect product before packing:
   - [ ] No visible damage to item
   - [ ] Correct color/variant matches order
   - [ ] Seals/packaging intact (if applicable)
   - [ ] No manufacturing defects

4. If product is damaged: Do NOT pack. Set aside. Escalate to Dan.

5. Move verified product to packing station

---

## Part 3: Packing (5–7 mins per order)

### Step 3.1: Packing Station Setup

**Materials needed at station:**
- [ ] Kraft bubble mailers (16×22 cm or 18×25 cm — two sizes)
- [ ] Chipboard backing sheets (for card stickers, laptop stickers)
- [ ] Tissue wrap sheets (branded, if available; plain white acceptable)
- [ ] Poly inner bags (June–September monsoon season only)
- [ ] Thank-you cards (A6 size, printed, pre-filled with copy from voice system)
- [ ] Branded seal stickers (for mailer closure)
- [ ] Thermal label printer + blank thermal labels (4×6 inch)
- [ ] Marker (black, for backup order number marking)
- [ ] Scale (kitchen scale acceptable; measure grams)
- [ ] Packing tape (clear)
- [ ] Scissors

---

### Step 3.2: Packing Checklist (Per Order)

**Start with one order. Work top to bottom. Check each box.**

#### 3.2.1: Product Preparation (1 min)

- [ ] Product inspected for damage ✓ (already done in Step 2.1)
- [ ] If monsoon season (June–Sept): wrap product in poly inner bag, seal with sticker
- [ ] If flat sticker/card sticker order: place chipboard backing inside poly bag (prevents creasing)
- [ ] Wrap product gently in tissue sheet (one layer; optional if tissue is fragile)

#### 3.2.2: Mailer Packing (2 mins)

- [ ] Select mailer size:
  - Small (16×22 cm): Single pin, single keychain, single card sticker
  - Medium (18×25 cm): Multiple items, bundles, gift sets
- [ ] Place product + tissue into bubble mailer
- [ ] Add thank-you card into mailer (place flat, on top of or beside product)
- [ ] Gently seal mailer closure with packing tape or adhesive strip
- [ ] Apply branded seal sticker at closure (design should face outward)

#### 3.2.3: Weight & Slab Verification (1 min)

- [ ] Weigh packaged order on scale
- [ ] Record weight (example: 150g)
- [ ] Verify falls within 0–500g slab (almost all orders will be <300g)
- [ ] If order exceeds 500g: escalate to Dan (rare for accessories; unlikely)

---

### Step 3.3: Quality Check Before Labeling

Before printing shipping label, verify once more:

- [ ] Order number matches packing slip
- [ ] Correct product in mailer (visual check — can see through mailer or check weight)
- [ ] Mailer sealed properly (no gaps)
- [ ] Branded sticker applied at closure
- [ ] Thank-you card included (you'll see edge of card inside mailer)

**If anything is wrong, unseal, correct, and re-seal.**

---

## Part 4: Label Generation & Dispatch (3–4 mins per order)

### Step 4.1: Shipping Label Generation (Shiprocket)

**When:** After packing and quality check
**Where:** [Shiprocket Orders Dashboard](https://www.shiprocket.in)
**Action:**

1. In Shiprocket, find the order (by order number)
2. Click **Generate Label** or **Create Shipment**
3. Review auto-populated fields:
   - [ ] Delivery address matches order (verify pin code especially)
   - [ ] Weight matches package weight
   - [ ] COD status correct (COD orders have ₹ symbol; prepaid do not)
   - [ ] Shipping method selected: Auto-select (Shiprocket picks best carrier by pin/weight)

4. Click **Generate AWB** (Airway Bill number)
5. Print shipping label:
   - Thermal printer: Print directly to label
   - Inkjet/laser: Print to paper, cut to 4×6", tape to mailer

**Label placement:** Stick thermal label on top-right corner of mailer. Ensure barcode is fully visible and not crumpled.

6. Write order number in marker on mailer backup (in case label is torn in transit)

### Step 4.2: Carrier Selection Logic

Shiprocket's auto-select uses this priority (you don't need to manually choose):

| Pin Code | Carrier Priority | Speed | Cost |
|----------|------------------|-------|------|
| Bengaluru (560001–560104) | Delhivery Surface / Shadowfax | 1–2 days | ₹25–₹40 |
| Karnataka metro (560xxx) | Delhivery / DTDC | 2–3 days | ₹35–₹50 |
| South India (Zone C: Mumbai, Chennai, Hyderabad) | Delhivery / BlueDart | 2–3 days | ₹50–₹70 |
| Rest of India (Tier 2/3, Zone D) | Delhivery / Ecom Express / DTDC | 4–6 days | ₹65–₹90 |
| Remote (Northeast, J&K, Himachal, Zone E) | India Post (fallback) | 7–10 days | ₹90–₹140 |

**Why auto-select?** Shiprocket's algorithm routes based on real-time carrier capacity. Manual selection often picks slower/more expensive options.

**For COD orders:** Add ₹26–₹36 COD fee (charged by carrier; collected by Shiprocket from customer at door, remitted to you D+8 to D+10).

### Step 4.3: Dispatch Handoff (1 min)

**When:** After label is printed
**Action:**

1. Place labeled mailer in **dispatch pile** (separate area, ready for pickup)
2. In Shiprocket, mark order as **Ready to Ship**
3. **Schedule carrier pickup** (if not auto-scheduled):
   - Go to Shiprocket **Pickup Schedule**
   - Set pickup time for 2–4 PM (most carriers prefer afternoon pickups)
   - Confirm pickup location (your address or drop-point)

4. Log dispatch in simple Google Sheet (or Fynd order record):
   - Date | Order # | Customer | AWB # | Carrier | Weight | COD? | Status

**Photo for records (optional but recommended):**
- Take quick phone photo of labeled mailer with AWB visible
- Use for records in case of disputes

---

## Part 5: Post-Dispatch — Tracking & NDR Management

### Step 5.1: Tracking & Customer Notification (1 min per order)

**When:** After dispatch (same day or next morning)
**What happens automatically:** Shiprocket auto-sends SMS + email tracking link to customer

**What you monitor:** Shiprocket NDR (Non-Delivery Report) dashboard

1. Log into Shiprocket daily at **9 AM** (check for overnight NDRs)
2. Go to **Tracking** → **NDR (Non-Delivery)**
3. For every NDR generated:
   - [ ] Read reason code (address unclear, customer unavailable, phone switched off, etc.)
   - [ ] WhatsApp customer immediately (within 1 hour, critical for COD)

**NDR WhatsApp template:**
- *"Hi [Name], our delivery partner visited your address but couldn't find you. They'll retry [Day/Time]. Can you confirm you'll be available? Reply CONFIRM or call [Your Number]."*

### Step 5.2: NDR Log (For Pattern Analysis)

Keep a simple Google Sheet with NDRs:

| Date | AWB | Customer Mobile | Reason | Re-delivery Date | Outcome |
|------|-----|-----------------|--------|------------------|---------|
| 2026-03-28 | SR0012345 | 9876543210 | Address unclear | 2026-03-29 | Delivered |
| 2026-03-28 | SR0012346 | 9876543211 | Customer unavailable | 2026-03-29 | RTO (refused) |

**Why:** Patterns in NDRs help improve COD strategy (address verification, timing, etc.).

### Step 5.3: RTO (Return to Origin) — If Delivery Fails 3x

**When:** Order bounces back after 3 failed delivery attempts
**What happens:** Carrier auto-initiates RTO in Shiprocket

**Your actions:**

1. Shiprocket notifies you of RTO via email
2. Receive package back in 5–7 days (depends on zone)
3. On receipt:
   - [ ] Inspect packaging for transit damage
   - [ ] Open and inspect product:
     - Undamaged → return to inventory, mark as restockable
     - Damaged → photograph, file insurance claim via Shiprocket
   - [ ] Update inventory count in Fynd (add back if restockable)
   - [ ] If customer refund due: process via Razorpay (see Section 7)

4. Log in RTO register:
   - Date | AWB | Customer | Product | Reason | Restockable | Resolution

**Refund for RTO orders:**
- Prepaid: Full refund to original payment method (5–7 days via Razorpay)
- COD: No refund owed (customer never paid)
- Escalate failed deliveries to Dan if rate exceeds 10% (sign of address quality issue)

---

## Part 6: Problem Resolution — Edge Cases

### Case 1: Damaged Product in Transit

**Scenario:** Customer receives product and sends photo of damage (via WhatsApp)

**Steps:**
1. Request photo from customer via WhatsApp
2. Assess: Is damage carrier's fault or manufacturing?
3. Replacement decision:
   - Carrier damage: Create replacement order in Shiprocket, dispatch within 1 business day, no cost to customer, no return of damaged item
   - Manufacturing defect: Same process (replacement) — escalate to Dan for pattern tracking
4. Log in damage register:
   - Date | Order # | Product | Issue | Cause | Resolution

**Do NOT ask customer to return damaged item** (return logistics cost exceeds product value)

### Case 2: Wrong Product Dispatched

**Scenario:** Customer reports wrong SKU was in package

**Steps:**
1. Verify order details (what was ordered vs. what was packed)
2. If error confirmed: Create replacement order with correct product, dispatch within 1 business day
3. Customer keeps wrong item (return not cost-effective)
4. Log: Date | Order # | Error | Root Cause (e.g., "Picking error," "Inventory label confusion")
5. Update picking/labeling process if systematic error

### Case 3: Lost in Transit

**Scenario:** Order has been in transit 7+ days beyond SLA, customer can't locate package (tracking shows "in transit" stuck)

**Steps:**
1. Request proof of non-delivery (screenshot of tracking stuck, etc.)
2. File carrier claim in Shiprocket within 10 days of dispatch (after this, not claimable)
3. Shiprocket investigates with carrier (takes 10–15 days typically)
4. Outcome options:
   - Carrier reimburses Shiprocket, you refund customer
   - Carrier unable to locate, send replacement + refund
5. Customer can choose: Refund or re-dispatch to correct address
6. Log: Date | AWB | Claim Filed | Resolution

**Note on timing:** India Post can take 20–30 days for investigations. Plan accordingly.

### Case 4: COD Order — Customer Refuses at Door

**Scenario:** Carrier reports customer refused to pay or refused delivery

**Steps:**
1. Shiprocket marks order as RTO
2. Contact customer within 1 hour: *"We notice you declined the delivery. Can we help? Would you prefer a refund, or should we redeliver?"*
3. If customer confirms refund:
   - No cash refund (never paid)
   - Escalate to Dan; record as customer refusal
   - Add customer phone to COD blacklist in Shiprocket Smart COD (prevents future COD orders)
4. If customer wants re-delivery:
   - Contact carrier to redeliver next day, confirm timing with customer via WhatsApp
   - Log re-delivery attempt

---

## Part 7: Unboxing Experience & Social Content

### Step 7.1: Packaging Photography Brief

Every order is an opportunity for social proof. Dan or a helper should photograph the unboxing once per week to capture authentic unboxing content.

**Photography checklist:**

1. **Setup:**
   - Dark background (dark table or dark posterboard) — matches Darkroom visual system
   - Natural light from side (avoid direct overhead light)
   - Phone camera acceptable; use portrait mode for depth

2. **Sequence to capture:**
   - [ ] Sealed mailer (closed, branded sticker visible)
   - [ ] Opening the mailer (hands in frame if possible)
   - [ ] Contents revealed (product + tissue + thank-you card visible)
   - [ ] Thank-you card close-up (text readable)
   - [ ] Product display (on dark background, isolated)
   - [ ] Detail shot (if enamel/print, show craftsmanship close-up)
   - [ ] Full flat-lay of all contents together

3. **Captions (use copy-system voice rules):**
   - For unboxing post: "Wear your opinion. [Product name]. Ordered [date]. Arrived [date]. What do you think?"
   - For product close-up: [Use WhatsApp line from product page copy]
   - For thank-you card: "Handwritten gratitude inside every order."

4. **Posting:**
   - Instagram Reel (15–30 sec unboxing clip, music, minimal captions)
   - Instagram Story (multi-frame story: mailer → open → product → thank-you card)
   - WhatsApp broadcast (photo + copy: *"This is what order [#] looked like inside"*)

---

### Step 7.2: Thank-You Card Copy

**Where the thank-you card appears:** Inside every mailer
**Format:** A6 card (105×148mm), printed, 250gsm cardstock
**Copy rules:** Use voice rules from `artifacts/phase-3/copy-system.md` — warm, brief, private, no sharp edge (this is a private moment)

**Template copy (customize by collection/product):**

---

**Front of card:**

*Thanks for the impulse.*

*Or the careful decision.*

*Either way, you made a choice.*

---

**Inside (left panel):**

*Wear it. Share it. Argue about it.*

*— The Product Lab*

---

**Inside (right panel):**

*P.S. Stick a photo of you with it somewhere public. We're collecting proof that opinions look better when they're worn.*

**Questions?** Send us a message at [WhatsApp link] or @theproductlab

---

**Notes:**
- This copy matches the voice system: opinionated, conversational, short enough to read in one sit, not gushing
- Include Instagram handle so customers know where to tag/find the brand
- Optional: Print artist name on back (if featuring an artist collaboration)

---

## Part 8: Daily Operations Checklist

**Print this and check off daily:**

### Morning (9–10 AM)
- [ ] Sync new orders from Fynd/Shiprocket
- [ ] Verify all addresses (WhatsApp incomplete ones)
- [ ] Check inventory stock levels
- [ ] Check Shiprocket NDR dashboard for overnight failures

### Mid-Morning (10 AM–2 PM) — Packing Window
- [ ] Pick products from inventory
- [ ] Pack orders (target: 1 per 10 mins)
- [ ] Generate Shiprocket labels
- [ ] Quality check each mailer
- [ ] Place labeled mailers in dispatch pile

### Afternoon (2–4 PM) — Dispatch
- [ ] Schedule carrier pickup (if manual)
- [ ] Deliver mailers to pickup point or place in designated area
- [ ] Confirm pickup scheduled in Shiprocket
- [ ] Update Google Sheet with dispatch log

### Evening (4–5 PM) — Wrap-up
- [ ] Update inventory in Fynd (deduct all shipped items)
- [ ] Check for any same-day issues (complaints, quality alerts)
- [ ] Pack any damaged/RTO products received
- [ ] Review order count for the day

### Weekly (Friday)
- [ ] Review NDR patterns in log
- [ ] Photo unboxing if possible
- [ ] Check stock levels, flag low SKUs for reorder
- [ ] Share weekly metrics with Dan (orders shipped, NDR rate, RTO count)

---

## Part 9: Key Metrics to Track

**Monitor these daily to catch operational issues early:**

| Metric | Target | Action if Exceeded |
|--------|--------|-------------------|
| Pack time per order | <10 mins | Review picking/packing workflow, consider batch packing |
| NDR rate | <10% | Implement address OTP, improve address verification |
| RTO rate | <5% | Review COD confirmation workflow, improve pre-dispatch verification |
| Order-to-dispatch time | <1 business day | Increase packing window or prioritize rush orders |
| Damaged item rate | <2% | Review packaging materials, improve handling instructions |

---

## Part 10: Tools & Integrations Checklist

| Tool | Purpose | Setup Status |
|------|---------|--------------|
| Fynd Commerce | Order management, inventory | [Complete before launch] |
| Shiprocket Business plan | Shipping, labels, carrier routing | [Complete before launch] |
| Thermal label printer (Zebra ZD220 or equiv.) | 4×6" label printing | [Procure before launch] |
| Razorpay dashboard | Refund processing | [Live with payment setup] |
| Google Sheets (inventory + NDR log) | Manual tracking | [Create before launch] |
| WhatsApp Business (phone + Gupshup/MSG91) | Customer notifications | [Setup before launch] |
| Scale (kitchen scale acceptable) | Weight verification | [Procure before launch] |

---

## Part 11: Supplies Checklist (Before Launch)

**Procure and stock before Day 1:**

- [ ] Kraft bubble mailers: 200 units (16×22 cm size)
- [ ] Kraft bubble mailers: 200 units (18×25 cm size)
- [ ] Chipboard backing sheets: 200 units
- [ ] Tissue wrap sheets (white or branded): 500 units
- [ ] Thank-you cards (A6, printed): 500 units
- [ ] Branded seal stickers: 500 units
- [ ] Thermal label printer (Zebra ZD220 or compatible)
- [ ] Thermal labels (4×6"): 1 roll (1000 labels)
- [ ] Packing tape (clear, 2-inch): 2 rolls
- [ ] Markers (black, fine-tip): 3 pens
- [ ] Kitchen scale (for weight verification): 1 unit
- [ ] Poly inner bags (clear, if monsoon launch): 200 units
- [ ] Scissors: 1 pair

**Storage:**
- Designate a shelf or cabinet for packing supplies (keep organized)
- Keep mailers flat to prevent deformation
- Store thank-you cards in sealed bag to prevent moisture

---

## Part 12: Troubleshooting — Common Issues

| Problem | Solution |
|---------|----------|
| **Thermal label won't print** | Check printer is connected to power; check Shiprocket connection to printer; restart printer. If persistent, print to paper and tape. |
| **Order stuck in "Processing" in Shiprocket** | Click "Regenerate Label"; if persists, contact Shiprocket support chat (live support available). |
| **Carrier pickup not scheduled** | Go to Shiprocket Pickup Schedule, manually select pickup time for 2–4 PM. Confirm the day before. |
| **Customer address too long for label** | Abbreviate state name (e.g., "MH" for Maharashtra), remove apartment name if possible. Shiprocket auto-formats. |
| **Package weight exceeds 500g** | Rare for accessories. Verify scale is accurate. Check for extra packing material inside. If confirmed >500g, reach out to Dan. |
| **Can't reach customer for NDR confirmation** | Try WhatsApp, SMS, then phone call. If unreachable after 24 hours, escalate to RTO (return process begins). |
| **Return/RTO received, customer wants refund** | Log RTO in register. If prepaid: issue refund via Razorpay (5–7 days). If COD: no refund owed. Confirm with Dan. |

---

## Summary — Daily Time Estimate

| Activity | Time | Frequency |
|----------|------|-----------|
| Order sync + verification | 5 mins | Daily (morning) |
| Inventory check (per order) | 3 mins | Per order |
| Picking (per order) | 2 mins | Per order |
| Packing (per order) | 5–7 mins | Per order |
| Label generation (per order) | 2 mins | Per order |
| Carrier pickup coordination | 5 mins | Daily (afternoon) |
| NDR management (per NDR) | 5 mins | As needed |
| **Total per order** | **~20–22 mins** | — |
| **Time to dispatch 10 orders** | ~3 hours | Daily (if volume is 10/day) |

**Reality check:** At launch, expect 5–10 orders/day. By Day 30, target 15–20/day. Scale process if volume exceeds 30/day.

---

## Contact & Escalation

**For questions or blockers:**
- Shiprocket support: Live chat in dashboard (usually <10 mins response)
- Razorpay support: Email or live chat
- Fynd Commerce: Check knowledge base; escalate to Tobi if platform issue
- Shipping/logistics questions: Escalate to Raj or Harley
- Customer service issues: Escalate to Tony (customer support lead, Phase 6)

---

*Next artifact: `pre-launch-validation.md` — Checklist to confirm Phase 4 gate before Phase 5 launch*
