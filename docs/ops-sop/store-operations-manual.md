<!-- last-updated: 2026-03-27 -->
# Store Operations Manual — Daily Fulfillment & Customer Service Guide

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build and Implementation |
| **Producing Agent** | Andy (Product Operations) |
| **Date** | 2026-03-27 |
| **Status** | draft |
| **Reviewer** | Dan |

---

## How to Use This Manual

This is your daily playbook. Every procedure is designed to be executed solo, without external help. Each section includes:

1. **Step count** — How many discrete actions
2. **Estimated time** — Wall-clock time (not rushed, not optimized)
3. **Decision tree** — If X happens, do Y
4. **Platform links** — Where to log in, what button to press
5. **Examples** — Real-world sample scenarios

**Print section 1.0 (Daily Order Workflow) and keep it within reach.** Most of your day will cycle through those 5 steps.

---

## Section 1: Daily Order Fulfillment Workflow

### 1.0 Overview — How Orders Arrive & Leave

**The loop (happens 1–20+ times per day):**

1. **Receive** (platform: Fynd dashboard) — Order lands in your Fynd account
2. **Verify** (physical + platform) — Check stock, confirm payment, flag issues
3. **Pack** (physical + documentation) — Find item, pack, seal, insert thank-you
4. **Label** (Shiprocket) — Generate AWB, print label, stick to box
5. **Dispatch** (physical + Shiprocket) — Hand to carrier, mark as shipped in both systems

**Total time per order:** 7–12 minutes (once you've done 5–10)

**Estimated daily volume at launch:** 5–15 orders. By Day 30, expect 20–40.

---

### 1.1 Step 1: Receive Order (In Fynd)

**What happens:** Customer completes purchase on site. Order appears in your Fynd dashboard.

**How to access:**
- Log in to Commerce.com (Fynd) at https://services.fynd.com/cp/
- Username: `[Dan's email registered with Fynd]`
- Password: `[Fynd login credentials stored separately in password manager]`
- Navigate to **Orders** section (usually left sidebar)

**What you'll see:**
- Order number (e.g., `TPL-001247`)
- Customer name and phone
- Delivery address (city, state, postal code)
- Items ordered (SKU, quantity, price)
- Payment method (UPI, card, COD)
- Payment status (paid/pending/failed)
- Order date/time

**Your action — Check immediately:**
1. **Payment status:** Is it showing as "paid" or "pending"?
   - If **paid** (UPI or prepaid card): Safe to pack. Proceed to Step 2.
   - If **COD** (Cash on Delivery): Safe to pack. Mark mentally — customer will pay carrier.
   - If **pending/failed**: Do NOT pack yet. Jump to Section 3 (Payment Processing) to investigate.

2. **Delivery address quality:** Can you read the pincode? Is the state clear?
   - If incomplete or suspicious (e.g., pincode missing): Contact customer immediately (Section 5.1) before packing.

3. **Items in stock?** Check your inventory tracker (Section 3.0).
   - If **in stock**: Proceed to Step 2 (Verify).
   - If **out of stock**: Jump to Section 6 (Customer Service Escalation) → Out of Stock scenario.

**Decision tree:**

```
Order arrives in Fynd
  ├─ Payment status = PAID or COD?
  │    ├─ YES → Go to Step 2 (Verify)
  │    └─ NO (Pending/Failed) → Jump to Section 3 (Payment Investigation)
  ├─ Address complete & clear?
  │    ├─ YES → Go to Step 2
  │    └─ NO → Contact customer (Section 5.1) before packing
  └─ Items in stock?
       ├─ YES → Go to Step 2
       └─ NO → Handle OOS (Section 6, Escalation)
```

**Time estimate:** 2 minutes per order (scan payment, address, inventory)

---

### 1.2 Step 2: Verify Inventory & Condition

**What you're doing:** Physically locate the item, confirm it's in sellable condition, and reserve it for this order.

**Where items are stored:**
- Card stickers: Shelf A (darkroom office, right wall, labeled tray)
- Pins/keychains: Shelf B (small cardboard organizer, top shelf, sorted by design)
- Magnets: Drawer 1 (desk filing cabinet, middle drawer)
- Bundles (pre-packed gift boxes): Shelf C (office back corner, stacked horizontally)

**Verification checklist (30 seconds per item):**

- [ ] **Color/design match:** Does the physical item match the SKU on the Fynd order? (If you ordered "red pin" and the stock shows "black pin," STOP.)
- [ ] **Condition:** No creases, tears, fading, or manufacturing defects? (Acceptable: minor sticker curl if it's on a sticker pack. Not acceptable: torn enamel, bent pin clasp.)
- [ ] **Packaging intact:** If item came in original packaging from Ink Fish, is the seal/wrap undamaged?
- [ ] **Quantity correct:** If order is for 2 units, do you have 2?

**If any issue found (damaged, wrong SKU, qty mismatch):**
1. **Do not pack it.**
2. Note the issue (e.g., "pin clasp bent").
3. Jump to Section 6 (Escalation) → Damage/Wrong Item scenario.

**If all green:**
1. Remove item from shelf (physically move it to the packing station).
2. Update your inventory tracker (Section 3.0) — reduce quantity by 1.
3. Proceed to Step 3 (Pack).

**Time estimate:** 1 minute per item (usually 1 item per order, so 1 minute total)

---

### 1.3 Step 3: Pack Order

**What you're doing:** Seal the product in a box with thank-you note and care card, ready for label.

**Materials you need (restock these weekly):**

- Small white cardboard boxes (2×2×2 inches, from Ink Fish supplier or Amazon, ₹2–3 per box)
- Kraft tape (brown, 48mm width, ₹50 for roll of 100m — lasts 2–3 months)
- Thank-you card (pre-printed, Canva template designed by Joanna in Section 8)
- Care instruction card (product-specific, printed + laminated if possible, ₹10 per 50-pack)
- Tissue paper (optional but recommended — ₹20 per pack) — adds unboxing polish
- Sticker seals if bundled (red sticker seal per D-006, for gift bundles)

**Packing SOP (5 steps, 3 minutes):**

1. **Place product in box** — Centered, with tissue paper underneath for cushioning.
2. **Add thank-you card** — Handwritten personalization or pre-printed? (Recommended: pre-print with customer first name from Fynd order, hand-sign with your name "— Dan")
   - **Example thank-you copy:** "Thanks, [First Name]. You just told 47 people who they are. Wear it proud. — Dan"
3. **Add care card** — If product is a pin, include "How to Wear" card (clasp goes to the back, check before each wear). If card sticker, include "Stick anywhere" guide.
4. **Seal box** — Use kraft tape across the top seam and each side seam (H-tape pattern). No loose edges.
5. **Prepare for label** — Set box aside on "Ready to Label" shelf. Write customer phone number with marker on top-left corner (helps Shiprocket if label peels during transit).

**Quality gate — Before labeling:**
- Box is fully sealed? ✓
- No shifting when you shake it? ✓
- Thank-you card and care card inside? ✓

**Time estimate:** 3 minutes per order

---

### 1.4 Step 4: Generate Shipping Label (Shiprocket)

**What you're doing:** Create a shipping document (AWB — Airway Bill) that tells the carrier where to take the package.

**How to access Shiprocket:**
- Log in to Shiprocket at https://dashboard.shiprocket.in/
- Username: `[Dan's Shiprocket account email]`
- Password: `[Shiprocket credentials in password manager]`
- Navigate to **Orders** (left sidebar)

**Key platform features for TPL:**
- **Integrations tab:** Fynd is integrated (orders sync automatically)
- **Fulfillment tab:** Orders waiting to be shipped
- **AWB creation:** Automatic or manual

**Step-by-step label generation:**

1. **Find your order in Shiprocket** — Refresh the Orders list. Your Fynd order should appear within 5 minutes of purchase (auto-sync).
   - If it doesn't appear: Log back into Fynd, confirm the order exists, then refresh Shiprocket.

2. **Verify order details in Shiprocket:**
   - Customer name spelled correctly?
   - Phone number correct? (This is what the carrier uses to reach customer)
   - Address: Pincode, city, state correct?
   - Items match Fynd order?

3. **Select carrier** — Shiprocket shows you 3–5 carrier options. Which to choose?
   - **For prepaid orders (UPI/card paid):** Choose fastest option that fits your timeline goal
     - Default: Delhivery or Ecom Express (2–4 day delivery to most metros)
     - If customer is out-of-state or remote: Allow 5–7 days, choose "Economy" option to save cost
   - **For COD orders:** Check carrier COD availability (Shiprocket flags this)
     - Recommended: Delhivery or Ecom Express (both have strong COD network)
     - Avoid: Shiprocket's own "Quick Relay" for COD (slower, riskier)

4. **Confirm dimensions & weight** — Shiprocket estimates based on order. Verify:
   - Weight: A pin + box + card = ~50g. A sticker pack = ~10g. If Shiprocket shows >500g, it's wrong — correct it.
   - Dimensions: Your box is 2×2×2 inches (approximately 5×5×5 cm). If Shiprocket shows larger, correct it (affects shipping cost).

5. **Generate AWB** — Click "Generate AWB" button.
   - Shiprocket assigns an AWB number (e.g., `SHP12345678`).
   - A label PDF downloads automatically. Keep this on screen or save it.

6. **Print label immediately** — You need a thermal label printer.
   - **Option 1 (Recommended):** Thermal printer (Zebra or similar, ₹3,000–5,000 one-time, prints 4×6 labels fast)
   - **Option 2 (Budget):** Regular inkjet printer + label sheets (Avery 4×6, ₹150 per 50-pack) — slower, less durable
   - Print the label at 4×6 inches (Shiprocket's standard format)

7. **Stick label on box** — Place the printed label on the top-right corner of your box, covering any previous marks. Smooth it down to avoid peeling.

**Critical check before dispatch:**
- AWB number visible and readable on the label?
- Customer phone number still visible (you wrote it with marker earlier)?
- Label is secure (not peeling, not wrinkled)?

**Decision tree — Carrier Selection:**

```
Order placed
  ├─ Prepaid payment?
  │    ├─ YES, metros (Delhi/Mumbai/Bangalore/Hyderabad) → Delhivery (2–3 days)
  │    ├─ YES, tier-2 cities → Ecom Express (3–5 days)
  │    └─ YES, remote areas → Ecom Express Economy (5–7 days)
  └─ COD payment?
       ├─ Customer metro area → Delhivery or BlueDart (strong COD network)
       ├─ Customer tier-2 → Ecom Express COD
       └─ Customer remote → Clarify with customer if they can pay COD; if unsure, offer UPI link instead
```

**Time estimate:** 3–4 minutes per label (including printing)

**Troubleshooting:**
- Label printer not printing? → Use inkjet backup or drive to nearby print shop (₹5–10 per label)
- AWB not generating? → Check internet connection, retry. If persistent, contact Shiprocket support (details in Section 7).
- Address too long for label? → Shiprocket auto-wraps; if it shows truncated, verify it's readable (carrier will verify with customer)

---

### 1.5 Step 5: Dispatch & Mark as Shipped

**What you're doing:** Physically hand the box to the carrier (or arrange pickup), then update both Shiprocket and Fynd to mark it as "shipped."

**How carrier pickup works (depends on your setup):**

**Option A — Carrier pickup from store:**
- Register your store address with each carrier (do this once, before first shipment)
- Shiprocket will show "Schedule Pickup" button
- Choose pickup time (e.g., 3 PM same day)
- Carrier arrives and collects box; they scan AWB in their system
- You get notification

**Option B — You drop off at carrier hub:**
- Find nearest Delhivery/Ecom Express pickup point (Google Maps)
- Hours: Usually 9 AM–5 PM
- Walk in with box + printed label
- Tell them the AWB number
- They scan and weigh it (charge applies if weight >claimed)
- You get receipt with AWB

**Option C — Scheduled handoff (if volume grows):**
- Coordinate with Shiprocket for daily pickup
- Place labeled boxes in a designated area
- Carrier collects daily (e.g., 4 PM pickup)
- You update Shiprocket when they collect

**Your action when box leaves:**

1. **Take a photo** — Phone photo of the box with label, showing AWB number clearly. Save with filename: `[Order-Number]-dispatch-[YYYY-MM-DD].jpg` (e.g., `TPL-001247-dispatch-2026-04-05.jpg`)
   - Why? If customer later claims they never received it, you have proof it left.

2. **Update Shiprocket:**
   - Go to the order in Shiprocket
   - Click "Mark as Shipped" or "Dispatch"
   - Confirm pickup happened
   - System auto-updates AWB status

3. **Update Fynd:**
   - Go to the order in Fynd
   - Navigate to "Shipping" or "Fulfillment" tab
   - Enter AWB number (Shiprocket usually syncs this automatically, but verify)
   - Mark order status as "Shipped"
   - System auto-sends SMS to customer with tracking link (you configure this once in Fynd settings)

4. **Log it** — In your inventory tracker, mark the order as "Dispatched" with date/time

5. **Update customer (optional but recommended):**
   - Send WhatsApp message with tracking details (template in Section 8)
   - Example: "Order #TPL-001247 is on the way! Track here: [AWB link]"

**Customer proof points:**
- They get SMS from carrier (auto-sent by Shiprocket)
- They get WhatsApp from you (optional, builds relationship)
- They can track on Shiprocket's public tracking portal

**Time estimate:** 2 minutes per order (take photo, update both platforms, message customer)

---

### 1.6 Daily Fulfillment Checklist

**Do this every morning before starting:**
- [ ] Check Fynd for overnight orders (refresh dashboard)
- [ ] Verify your inventory tracker matches physical stock (spot-check 3 items)
- [ ] Test Shiprocket login (ensure no password issues)
- [ ] Confirm label printer is on, connected, and has paper
- [ ] Ensure thank-you cards and care cards are stocked

**After every dispatch:**
- [ ] Photo of box taken and filed
- [ ] Both Fynd and Shiprocket marked as shipped
- [ ] Customer notification sent (SMS via Fynd or WhatsApp manually)
- [ ] Inventory tracker updated

**End of day (before closing):**
- [ ] Count daily orders fulfilled (goal: 100% same-day dispatch if order received by 11 AM)
- [ ] Note any blockers or delays
- [ ] Prepare tomorrow's order list (identify what to pack first)

---

## Section 2: Payment Processing Checklist

### 2.0 Payment Methods You Accept

Based on D-006 (locked pricing decision):

| Payment Method | Notes | Your Role |
|---|---|---|
| **UPI** | Razorpay integration; fastest for Indian market | Automatic — customer enters UPI ID on checkout |
| **Credit/Debit Card** | Razorpay integration; online processing | Automatic — customer enters card on checkout |
| **Wallet** (PhonePe, Google Pay, etc.) | Razorpay integration; common for young users | Automatic — customer selects wallet on checkout |
| **COD (Cash on Delivery)** | Carrier collects cash at delivery | You verify Razorpay flagged it correctly; carrier handles collection |

**Payment success rate target:** 95% + (3 failures per 60 orders is acceptable)

---

### 2.1 Understanding Payment Statuses in Fynd

**When order lands in Fynd, it shows one of these statuses:**

| Status | Meaning | Your Action |
|---|---|---|
| **Paid** | Money is in your Razorpay account (UPI/card). Proceed to pack. | Pack immediately. No payment risk. |
| **COD** | Customer has chosen to pay the carrier. Proceed to pack. | Pack immediately. Carrier collects payment. |
| **Pending** | Payment was initiated but didn't complete (customer abandoned checkout, network issue, etc.). | Wait 5 minutes for retry. If still pending, contact customer. |
| **Failed** | Payment failed (insufficient balance, wrong PIN, card declined, etc.). | Contact customer immediately with payment link. |
| **Refund Initiated** | You or customer started a refund process. | See Section 4 (Returns & Refunds). |

---

### 2.2 Prepaid Discount (UPI/Card Only)

Per D-006: Customers who choose prepaid (UPI/card) get ₹30 discount.

**How this works in Fynd:**
1. System automatically applies discount if payment method is UPI or card
2. Order total shows reduced price (e.g., ₹249 item becomes ₹219)
3. Razorpay receives the reduced amount

**Your role:**
- Nothing. System handles it automatically.
- Just verify the customer's receipt matches the discounted total.

**Example:**
- Customer buys 1 keychain (₹249)
- Selects UPI payment
- Fynd shows total: ₹219 (₹30 discount)
- Razorpay processes ₹219
- Customer pays ₹219
- You receive ₹219 minus Razorpay fee (~2.36% = ~₹5)

---

### 2.3 Free Shipping Threshold (₹499+)

Per D-006: Orders ₹499+ ship free. Orders <₹499 include shipping cost.

**Shipping costs (Shiprocket-handled):**
- Default: ₹40–60 for metro delivery (2–3 days)
- Default: ₹60–100 for non-metro (3–5 days)
- Fynd auto-adds this to order total if customer hasn't hit ₹499

**Your role:**
- Nothing. Fynd and Shiprocket handle this.
- Just verify customer sees shipping cost before checkout (review checkout screenshots in Section 8).

---

### 2.4 COD Verification & Risk

**Cash on Delivery = payment at the door.**

**How it works:**
1. Customer orders, chooses COD at checkout
2. Fynd marks order as "COD"
3. You pack and dispatch (no payment from you; no payment processing)
4. Carrier collects cash from customer at delivery
5. Carrier remits cash to Shiprocket (their account)
6. Shiprocket remits to your Razorpay account (within 3–7 days)

**COD payment minimum per D-006:** ₹299 (to avoid handling cost > profit)

**Your verification checklist (COD orders):**

When you see a COD order in Fynd:
- [ ] Order total ≥ ₹299? (If <₹299, contact customer and request prepaid instead)
- [ ] Customer location is serviceable by carrier? (Delhivery/Ecom Express don't service all areas; Shiprocket will flag)
- [ ] Customer phone number is correct and reachable? (Carrier will call customer before delivery to confirm)

**COD risks (why we have minimum):**

1. **Refusal at delivery** — Customer refuses to accept order after carrier arrives. You lose the order (product goes back to you, shipping cost is lost, no payment received).
2. **Cash loss risk** — If carrier loses cash, you might need to dispute.
3. **Shipping cost > order profit** — A ₹199 item costs ₹40 to ship. COD payment collection adds ₹10–15 fee. Total cost: ₹55. Your profit: ₹19 (very slim). Minimum ₹299 ensures ₹100+ profit.

**COD handling best practices:**

- Prioritize packing COD orders with urgency (same-day dispatch if possible)
- Send WhatsApp message to customer: "Order confirmed! You'll pay the courier ₹[total] when it arrives. Tracking: [AWB]"
- This confirms the amount and sets expectation before carrier calls

---

### 2.5 Payment Failure Scenarios — Decision Tree

**Scenario 1: Order shows "Pending" payment**

```
Status = Pending
  └─ Wait 5 minutes (customer might retry)
      ├─ Status changes to Paid? → Pack order
      └─ Status still Pending after 5 min?
          ├─ Send WhatsApp to customer: "Hi [Name], order is on hold. Can you retry payment at [link]?"
          ├─ Customer retries & succeeds? → Pack order
          └─ Customer doesn't retry in 30 min? → Mark as "Payment Failed" (see next scenario)
```

**Scenario 2: Order shows "Failed" payment**

```
Status = Failed
  └─ Do NOT pack order
      ├─ Check Razorpay dashboard (see 2.6 below) to understand why
      ├─ Send WhatsApp: "Payment didn't go through. Retry here: [payment-link-from-Fynd]"
      ├─ Customer pays? → Fynd updates to Paid → Pack order
      └─ Customer doesn't pay in 24 hours?
          └─ Cancel order in Fynd (Fulfillment → Cancel Order)
          └─ Send WhatsApp: "Cancelling order due to non-payment. Link to retry if you'd like to place a new order: [shop-link]"
```

---

### 2.6 Razorpay Dashboard — Your Payment Hub

**What it is:** Central place to see all transactions, refunds, settlements.

**How to access:**
- Go to https://dashboard.razorpay.com/
- Login with `[Dan's Razorpay account email]`
- Password: `[Razorpay credentials in password manager]`

**Key sections you'll use:**

1. **Transactions** — All payments in/out. Shows:
   - Payment ID (Razorpay reference)
   - Amount
   - Status (Authorized, Captured, Failed, Refunded)
   - Date/time
   - Order ID (links to your Fynd order)

2. **Settlements** — Money paid to your bank account. Shows:
   - Settlement date (usually every business day)
   - Amount transferred
   - Razorpay fees deducted (~2.36% + ₹0 for UPI; ~1.99% + ₹0 for card)

3. **Refunds** — All refund requests. Shows:
   - Refund ID
   - Original payment amount
   - Refund amount
   - Status (Authorized, Processed, Failed)
   - Date created / date completed

**Your daily Razorpay check (3 minutes):**

- [ ] Go to Transactions
- [ ] Sort by "Most Recent"
- [ ] Scan last 24 hours of transactions
- [ ] Confirm every transaction matches a Fynd order
- [ ] Confirm no unexpected failed payments
- [ ] If any discrepancy, note it in your daily log

**Monthly Razorpay check (once per month, ~5 min):**

- [ ] Go to Settlements
- [ ] Verify total deposits match your expected revenue (should be ≈ sum of all Fynd orders minus failed orders)
- [ ] Spot-check fee percentages (2.36% for UPI, 1.99% for cards — standard rates)

---

### 2.7 Settlement Timing — When Money Hits Your Bank

**Standard timeline:**

- **Order paid (UPI/card):** Customer pays → Razorpay captures payment → Your bank receives within 24 hours (often same day)
- **COD order collected:** Carrier collects cash → Shiprocket remits to Razorpay (3–5 business days) → Your bank receives (1–2 days after that)

**Your bank account:** Set this up once with Razorpay. It's in your Razorpay settings under "Payouts."

---

## Section 3: Inventory Management

### 3.0 Your Inventory Tracker (Spreadsheet)

**What it is:** A live spreadsheet (Excel or Google Sheets) that tracks every SKU's quantity, cost, price, and reorder point.

**Location:** `artifacts/phase-4/inventory-tracker.xlsx` (Patrick's ownership; you update it daily)

**What's in it:**

| Column | Example | Your Role |
|---|---|---|
| **SKU Code** | `TPL-PIN-001` | Reference only (you don't use this for packing, but good for internal tracking) |
| **Product Name** | `Bullshit Remover Pin` | Reference |
| **Collection** | `Attitude Starters` | Reference |
| **Unit Cost** | ₹80 | Reference (your margin = selling price − cost) |
| **Selling Price** | ₹249 | Reference |
| **Qty on Hand** | `15` | UPDATE THIS EVERY DAY |
| **Reorder Point** | `5` | Alert level (when qty falls below this, you need to reorder) |
| **Lead Time (days)** | `7` | How long Ink Fish takes to produce & deliver once you order |
| **Status** | In Stock / Low / Reorder | UPDATE THIS (formula-based if possible) |

**Daily inventory update (2 minutes):**

1. After you pack an order, reduce that item's "Qty on Hand" by 1
   - Example: 15 pins → 14 pins
2. Spot-check: Physically verify 1–2 items match the sheet (optional but good)
3. Check "Status" column: Any items below reorder point? (Spreadsheet formula should flag these as RED)

**Reorder point logic:**

- Reorder point = (Lead time in days × Daily sales forecast) + Safety stock
- Example: 7-day lead time, ~1 pin sold per day, 5 units safety = Reorder at 5 units
- You have 5 units. You order today. Day 7 it arrives. By then you've sold ~7 units. You're at -2, so you need to reorder before you hit 0.

**Reordering from Ink Fish (Section 3.3):**

When an item hits the reorder point:
1. Note the SKU and quantity needed
2. Email Ink Fish production: `[Ink Fish contact email — from knowledge/16]`
3. Message: "Hi [Contact name], please produce [Qty] of [SKU name]. Needed by [date — 7 days from today]."
4. Ink Fish confirms lead time
5. Receive production notification (usually via email/WhatsApp)
6. Receive physical stock
7. Update spreadsheet with new quantity

**Ink Fish lead times (estimate):**

- Card stickers: 3–5 days (existing plates)
- Pins/keychains: 5–7 days (new enamel batches)
- Custom designs: 7–14 days (design + production)

---

### 3.1 Hero Products (Launch Day Stock)

Per D-007 (locked validation requirement), you need to validate pricing and stock 20+ products before launch.

**Hero products (must be in stock at launch):**

1. **Bullshit Remover Pin** (₹249) — 10 units
2. **Your Card Has a Personality — Half Sticker** (₹199) — 15 units
3. **Your Card Has a Personality — Full Sticker** (₹249) — 10 units
4. **No Filter Keychain** (₹249) — 8 units
5. **No Filter Magnet** (₹149) — 12 units
6. **Lapel Pin Sample #2** (₹249) — 5 units
7. **Lapel Pin Sample #3** (₹249) — 5 units
8. **Opinion Starter Pack Bundle** (₹499) — 3 units
9. **Birthday Box Bundle** (₹699) — 2 units

**Stock commitment:** Minimum 70 units total across 9 SKUs

**Current status:** [To be filled by Dan after inventory audit]

**Reorder timeline:** If any hero product drops below 3 units during launch week, reorder immediately (you'll receive in 5–7 days; meanwhile, you're selling from existing stock).

---

### 3.2 Inventory Locations (Physical Storage)

**Where each collection lives in store:**

| Collection | Location | Container | Access Notes |
|---|---|---|---|
| **Card Stickers** | Shelf A, right wall | Clear acrylic tray, 3 compartments (half, full, bundle) | Keep tray at eye level for quick picking |
| **Pins & Keychains** | Shelf B, top shelf | Small cardboard organizer box, labeled by design | Delicate items; handle carefully |
| **Magnets** | Drawer 1, desk | Filing cabinet middle drawer, ziplock bags by design | Compact; easy to restock |
| **Bundles (gift boxes)** | Shelf C, back corner | Stacked horizontally, labeled with bundle name + price | Heavy; stack max 3 high |
| **Packaging materials** | Drawer 2, desk | Kraft tape, label sheets, thank-you cards, tissue | Restock weekly |
| **Backup stock** | Storage closet, back room | Overflow inventory (if you order large batches) | First in / first out system |

**Stock movement best practice:**

- Move packing-ready items from main shelves to "Packing Station" area (designated table/shelf)
- After packing, move to "Ready to Label" area
- After labeling, move to "Ready to Dispatch" area
- After dispatch, log in spreadsheet and clear space

This way, you have 3 visual stations and always know which orders are at which stage.

---

### 3.3 Reorder Process from Ink Fish

**When to initiate:** When inventory hits reorder point (Qty on Hand ≤ Reorder Point)

**Step 1: Prepare reorder list**

Check your inventory tracker. Identify all items below reorder point.

Example:
```
Bullshit Remover Pin: 4 units (reorder point 5) → Reorder 20 units
No Filter Keychain: 2 units (reorder point 5) → Reorder 15 units
```

**Step 2: Email Ink Fish**

Send to: `[Ink Fish production email from knowledge/16 — likely Dan's own email or Ink Fish production contact]`

Subject: `Production Order — [Date] — [Your name]`

Body:
```
Hi [Contact name],

Please produce the following for The Product Lab:

1. Bullshit Remover Pin (TPL-PIN-001) — Qty: 20 units
2. No Filter Keychain (TPL-KEY-005) — Qty: 15 units

Needed by: [Date — 7 days from today]

Let me know if you need design files or have questions.

Thanks,
Dan
```

**Step 3: Confirm lead time**

Ink Fish responds with production timeline. Update your spreadsheet with expected delivery date.

**Step 4: Receive stock**

Ink Fish delivers (or you pick up from Cunningham Road office). Verify:
- [ ] All SKUs accounted for
- [ ] Quantities match order
- [ ] Quality checks (colors, enamel, print quality)
- [ ] Packaging intact

**Step 5: Update spreadsheet**

Log new quantity received. Mark reorder status as "In Stock."

---

### 3.4 Slow-Moving Stock Decision

If an item isn't selling after 2 weeks (e.g., fewer than 1 per week), you have options:

1. **Feature it** — Create a WhatsApp story, Instagram post, or email featuring the slow item
2. **Bundle it** — Add to a gift bundle at a discount
3. **Discount it** — Reduce price by ₹20–50 to move it (document this as a one-time promotion)
4. **Discontinue** — If no movement after 4 weeks, remove from site and consider it stock loss

Decision to discontinue requires Harley/Dan sign-off (could affect strategy). Document the call in decision log.

---

## Section 4: Customer Service & Support

### 4.0 Customer Contact Channels

You'll receive customer inquiries through these channels (in order of priority):

| Channel | Response Time | Your Tool |
|---|---|---|
| **WhatsApp** | 30 min (during business hours) | WhatsApp Business app (linked to +91 phone) |
| **Email** | 2 hours | Gmail (productlab.info@gmail.com) |
| **Instagram DM** | 2 hours | Instagram app or Creator Studio |
| **Shopify/Fynd Chat** (if enabled) | 1 hour | Fynd dashboard Chat section |
| **Phone call** | During business hours only | Personal phone (set hours when you're available) |

**Your hours:** 10 AM–6 PM IST, Monday–Friday (escalate weekend inquiries to Monday morning)

---

### 4.1 Common Support Questions — Quick Answers

**Copy these and save to phone notes for fast responses.**

**Q: When will my order arrive?**
A: "Most orders arrive in 3–5 days. You'll get a tracking link via SMS. Check the link for live location. Can you share your order number?"

**Q: How do I track my order?**
A: "You got a text with a tracking link. Click it and you'll see where it is. Can't find the text? What's your order number?"

**Q: I paid but don't see an order confirmation.**
A: "Let me check. What's your email and phone number? Sometimes confirmation takes a minute to send."

**Q: Can I change my address?**
A: "If your order hasn't shipped yet, yes. What's your order number? If it's already dispatched, we can't change it, but get back to me — we'll figure something out."

**Q: Do you ship outside India?**
A: "Not yet. We're shipping to all Indian states right now."

**Q: What payment methods do you accept?**
A: "UPI, debit/credit card, or cash when the order arrives (COD). Pick whichever is easiest for you."

**Q: Do I get a discount if I buy multiple items?**
A: "Not on individual purchases yet, but we have bundle packs that save you money. Check the Gifts section on the site."

**Q: Can I return an item?**
A: "Yes, 30 days to return. Needs to be unworn, original packaging intact. Returns are free to us. Once we get it, refund takes 5–7 business days."

**Q: The item arrived damaged. What do I do?**
A: "So sorry! Send me a photo of the damage. We'll replace it or refund. Can you WhatsApp me a picture?"

**Q: Can you gift-wrap?**
A: "We send everything in a plain black box with a thank-you card. Perfect for gifting. You can add a personal note — just let us know."

---

### 4.2 Escalation Scenarios — When to Escalate to Dan

**When you can handle it yourself:**
- General questions (shipping time, payment options, product details)
- Tracking inquiries
- Thank-you messages
- Simple complaints (small issue, easy resolution)

**When to escalate to Dan (via WhatsApp/email):**
- Damage or defect claim with photo
- Refund request >₹500
- Customer is angry or threatens public complaint
- Return initiated but customer has questions about condition
- Multiple contacts from same customer (more than 3 messages = high effort)
- Request for exception (price override, free shipping on small order, etc.)
- Technical issue with website/payment

**How to escalate:**
1. Screenshot the full conversation
2. WhatsApp to Dan: "Escalation: [Scenario]. See attached. How should I respond?"
3. Wait for Dan's guidance before responding to customer

---

### 4.3 Refund & Return Procedure

**Refund policy (customer-facing):**

Per Patrick's returns-exchange-policy.md:
- 30 days from purchase to initiate return
- Item must be unworn, original packaging intact, no stickers or damage
- Free return to us (we cover return shipping via Shiprocket label)
- Refund within 5–7 business days of us receiving returned item

**Your role in refunds:**

**Step 1: Customer requests return**

Customer sends WhatsApp: "I want to return the pin I bought."

Response: "No problem. Which order? (Send order number or I can look it up.)"

**Step 2: Verify return eligibility**

- [ ] Purchase date ≤ 30 days ago? (Check Fynd)
- [ ] Item unworn? (Customer confirms or sends photo)
- [ ] Original packaging intact? (Customer confirms or sends photo)
- [ ] No damage/defect? (Customer confirms)

If all yes → Proceed to Step 3.
If any no → Explain why (e.g., "It's been 35 days, so it's outside our return window") and offer exception path: escalate to Dan if customer is upset.

**Step 3: Initiate return in Fynd**

- Go to order in Fynd
- Click "Return / Exchange" (usually under Fulfillment tab)
- Select reason: "Customer Return" or "Defective"
- Confirm amount (full order price)
- Fynd generates a return AWB (you'll get a PDF label to send to customer)

**Step 4: Send return label to customer**

"Print this label and drop the box at any Delhivery/Ecom Express location. It's free for you. Let me know when you send it back."

**Step 5: Receive returned item**

When it arrives back at you:
- [ ] Check condition (should be unworn, packaging intact)
- [ ] If condition matches return reason → Approve return in Fynd
- [ ] If condition is worse than reported → Escalate to Dan

**Step 6: Initiate refund in Fynd**

Once you approve the return:
- Click "Initiate Refund" in Fynd
- Razorpay automatically processes it
- If prepaid (card/UPI): Refund hits customer's account within 24 hours
- If COD: Refund initiated but customer must provide bank details

**Step 7: Message customer**

"Return received and verified. Refund of ₹[amount] has been processed. You'll see it in your account within 24 hours. Thanks for giving us a shot!"

**Time estimate:** 5 minutes per return (not including waiting for item to arrive back)

---

### 4.4 Damage Claims

**If customer reports damage upon arrival:**

**Step 1: Get evidence**

Send WhatsApp: "I'm sorry the item arrived damaged! Can you send me 2–3 photos? I want to see what happened."

Wait for photos.

**Step 2: Assess severity**

- **Minor** (cosmetic): Dent on box, slight color fade, sticker curl — likely still usable
- **Major** (functional): Pin clasp broken, sticker torn, enamel chipped — not usable

**Step 3: Decide action**

| Severity | Your Action |
|---|---|
| **Minor** | Offer: "I can send you a replacement or give a ₹30 credit to your account. Your choice." |
| **Major** | "I'll send you a replacement at no cost. Return this one at our expense." (Then do the return SOP above.) |

**Step 4: Replacement process**

If you're sending replacement:
- Do NOT require them to return first (build goodwill)
- Take replacement from inventory (mark in spreadsheet as "Replacement — Damage")
- Pack fresh item with thank-you note: "This one's on us. Sorry for the trouble!"
- Dispatch via Shiprocket (you eat the ₹40 shipping cost as goodwill)
- Message customer: "Replacement is on the way, AWB: [number]. Again, apologies."

---

### 4.5 Angry Customer / Complaint Escalation

**When a customer is upset (angry tone, multiple messages, threats):**

**Step 1: Do not engage in back-and-forth**

Response template: "I hear you. Let me talk to the owner and get back to you with a solution within 2 hours."

Then immediately escalate to Dan with the full conversation.

**Step 2: Dan decides action**

Dan responds with: refund, replacement, discount on future purchase, apology + gift, etc.

**Step 3: You implement and close**

Follow Dan's guidance and confirm with customer: "We're [specific action]. Here's what to expect."

**Why escalate:** An angry customer on social media or review sites can hurt the brand. Better to over-respond early than have a public complaint.

---

## Section 5: Shipping Label Generation (Deep Dive)

### 5.0 Shiprocket Setup (One-Time)

**You should have done this before launch, but here's the checklist:**

- [ ] Shiprocket account created (free)
- [ ] Fynd integrated with Shiprocket (orders auto-sync)
- [ ] Thermal label printer connected to your computer (or plan to use inkjet backup)
- [ ] Your store address added as origin point
- [ ] At least 2 carrier accounts set up (Delhivery + Ecom Express, minimum)
- [ ] Your bank account linked for settlements
- [ ] Test label generated and printed (to verify printer works)

---

### 5.1 Carrier Selection Logic (Detailed)

**Shiprocket will show you 3–5 carrier options for each order. Choose using this logic:**

**For prepaid orders (UPI/Card):**

Goal: Get to customer as fast as possible (builds confidence, reduces "where is it" inquiries).

```
Customer location
  ├─ Metro (Delhi, Mumbai, Bangalore, Hyderabad, Pune)
  │    └─ Choose: Delhivery Express or BlueDart (2–3 day delivery)
  │         → Costs: ₹40–60 (Shiprocket negotiated rates)
  │         → Pick Delhivery if cheaper; BlueDart if customer is very far from Delhivery hub
  │
  ├─ Tier-2 cities (Jaipur, Lucknow, Chandigarh, Coimbatore, Indore)
  │    └─ Choose: Ecom Express or Delhivery (3–4 day delivery)
  │         → Costs: ₹50–80
  │         → Ecom Express usually slightly cheaper for non-metros
  │
  └─ Tier-3/Remote areas
       └─ Choose: Ecom Express Economy (5–7 day delivery)
            → Costs: ₹60–100
            → Slower but covers remote pincodes; ask customer if they can wait
            → If customer is impatient, ask: "Would you like to pay ₹50 extra for faster shipping?" (offer prepaid discount instead)
```

**For COD orders:**

Goal: Choose carrier with strong COD network (won't lose cash; reliable collection).

```
Carrier COD capability
  ├─ Delhivery (strongest COD network in India)
  │    └─ Choose if available (most pincodes)
  │         → They have agents everywhere, trained in cash handling
  │
  └─ Ecom Express (good COD, slightly less coverage than Delhivery)
       └─ Choose if Delhivery not available or too expensive
            → Still reliable; good backup
```

**Avoid for COD:**
- Shiprocket's "Quick Relay" (their in-house service — slower, riskier cash handling)
- Multiple small carriers (each has less infrastructure; higher risk)

---

### 5.2 Common Shiprocket Errors & Fixes

| Error | Why It Happens | Fix |
|---|---|---|
| "Pincode not serviceable" | Carrier doesn't deliver to that area | Try a different carrier. If none available, ask customer for alternate address or offer prepaid + faster refund only |
| "Address incomplete" | Missing pincode, city, or state | Contact customer: "Can you confirm your pincode/city? I need it to ship." |
| "Weight mismatch" | You entered wrong weight (too heavy) | Edit weight in Shiprocket to match actual package (pin+box = ~50g) |
| "Label printer offline" | Printer not connected or out of paper | Restart printer, check connection. If still fails, print from browser as PDF and use regular printer |
| "AWB not generating" | Fynd-Shiprocket sync issue or internet | Wait 2 min, refresh page. If still failing, restart browser. If persistent (>5 min), contact Shiprocket support |

---

### 5.3 Printing Labels — Troubleshooting

**Problem: Thermal printer not printing**

1. Restart printer (power off 30 seconds, power on)
2. Check connection (USB or network) — should show "Connected" in Shiprocket
3. Test print small label (see if anything comes out)
4. If still nothing: Use backup (inkjet printer + label sheets, slower but works)
5. If total printer failure: Drive to nearest print shop (₹5–10 per label, slower but reliable)

**Problem: Labels not sticking**

1. Ensure box is clean and dry (dust reduces adhesion)
2. Press label firmly for 5 seconds (initial bond)
3. Smooth with your hand to remove air bubbles
4. Wait 1 minute before handling (adhesive needs time)

**Problem: Label text faded or unclear**

1. Check thermal printer toner/ink levels
2. Clean printer head (consult printer manual)
3. For inkjet: Ensure paper is genuine label stock (not regular paper)
4. Test print single label before printing batch

---

## Section 6: Emergency Procedures

### 6.0 When Things Break — Decision Trees

---

### 6.1 Payment Failed (Customer Can't Pay)

```
Customer tries to pay; payment fails
  │
  ├─ Did Razorpay return an error code? (Check Fynd or Razorpay dashboard)
  │    ├─ YES → Note the code (e.g., "Insufficient balance," "Invalid PIN")
  │    │        Send customer: "[Error message]. Try a different card or UPI?"
  │    │        (You're not a tech support team; don't troubleshoot the card company)
  │    │
  │    └─ NO → Random network glitch
  │            Send customer: "Try again in a minute. If still stuck, clear your browser cache and try."
  │
  └─ Customer has tried 3+ times and still failing?
       └─ Escalate to Dan. Options:
          - Generate manual payment link via Razorpay (if Dan approves)
          - Suggest COD (if customer is comfortable)
          - Offer to try tomorrow
```

---

### 6.2 Fynd/Platform Down

```
You try to log into Fynd; it's down
  │
  └─ Check Fynd status: Go to https://status.fynd.com/ or DM @fynd on Twitter
       ├─ Status says DOWN → Wait for them to fix it. Usually 30 min–2 hours.
       │    In the meantime:
       │    - Message customers in waiting orders: "Slight delay on our end. Will ship your order once platform is back. Thanks for patience."
       │    - Log the outage time (for later reporting)
       │
       └─ Status says UP, but you can't log in?
            └─ Clear browser cache (Ctrl+Shift+Delete, clear all)
            └─ Try a different browser (Firefox vs Chrome)
            └─ Restart your computer
            └─ If still stuck: Contact Fynd support (link in Section 7)
```

---

### 6.3 Out of Stock (Item Not in Store)

```
You try to pick item for order; it's not on shelf
  │
  ├─ Did you reorder it? Check email with Ink Fish for production status.
  │    ├─ Still in production → Tell customer: "This item is in production. Should arrive [date]. Would you like to wait or switch to a different item?"
  │    │
  │    ├─ Lost in transit → Escalate to Dan. Dan contacts Ink Fish to trace shipment.
  │    │
  │    └─ You forgot to update inventory tracker? Find the item (maybe it's been moved), update spreadsheet.
  │
  └─ Item will not restock soon?
       └─ Offer customer:
          1. "I can refund you" (mark order as canceled in Fynd, initiate refund)
          2. "I can substitute with [similar item at same price]"
          3. "I can put you on a waitlist for restock in [X days]" (notify when back in stock)
```

---

### 6.4 Angry Customer (Threats, Complaints)

```
Customer is upset (angry tone, threatens review/social media, wants refund immediately)
  │
  ├─ What's the issue?
  │    ├─ Item hasn't arrived yet (>7 days) → Check tracking; confirm ETD; offer ₹50 credit if delayed >10 days
  │    │
  │    ├─ Item is damaged → Offer replacement at no cost or refund (see Section 4.4)
  │    │
  │    ├─ Wrong item shipped → Your mistake. Apologize sincerely. Offer:
  │    │    1. "I'll ship the correct item immediately (expedited)"
  │    │    2. "You keep this one as an apology; return the wrong one"
  │    │
  │    └─ Price was different on site vs order → Check if discount applied correctly
  │         (Usually Fynd error; escalate to Dan to approve refund/credit)
  │
  └─ Customer is still upset after your offer?
       └─ Escalate to Dan immediately. No more back-and-forth from you.
```

---

### 6.5 Website/Store Issues

```
Customer reports website is broken (e.g., can't checkout, product page not loading)
  │
  ├─ Try yourself: Go to theproductlab.in
  │    ├─ YOU see the problem → Technical issue. Escalate to Tobi (build lead).
  │    │                        Message Tobi with screenshot: "Checkout page not loading, see attached."
  │    │
  │    └─ YOU don't see the problem → Customer's browser cache or internet
  │         Send customer: "Try clearing your browser cache (hold Ctrl+Shift+Delete). If still stuck, try a different device?"
  │
  └─ If multiple customers report same issue → Definitely a platform problem.
       Contact Tobi + Fynd support immediately.
```

---

### 6.6 Shiprocket Carrier Problems

```
Your dispatch order disappeared from Shiprocket; label won't generate
  │
  └─ Refresh Shiprocket dashboard. Often a sync delay.
       ├─ Appears after refresh → Proceed normally.
       │
       └─ Still missing?
            ├─ Check if order was manually canceled in Fynd → If yes, generate new order (escalate to Dan)
            │
            ├─ Check Fynd-Shiprocket sync setting (should be ON) → If OFF, turn ON and sync
            │
            └─ If persists > 10 min → Contact Shiprocket support (Section 7)
```

---

### 6.7 Customer Data Loss / Wrong Address Shipped

```
You discover you shipped to the wrong address
  │
  └─ Did carrier collect yet? (Check Shiprocket AWB status)
       ├─ Status = "Picked Up" or "In Transit" → Too late to stop.
       │    ├─ Contact carrier support immediately: "Order [AWB] shipped to wrong address. Can you reroute?"
       │    │  (They can sometimes intercept before final delivery.)
       │    │
       │    ├─ If reroute fails → Apologize to customer, offer:
       │    │   1. "Refund once it's marked as undelivered" (after ~10 days)
       │    │   2. "Replacement shipment to correct address" (you eat the cost)
       │    │
       │    └─ Escalate to Dan for final decision on resolution.
       │
       └─ Status = "Pending" (not yet collected) → STOP immediately
            └─ Edit address in Shiprocket if possible (check settings)
            └─ If not editable, cancel this AWB and create new one with correct address
            └─ Message customer: "Caught a mix-up before it shipped. Re-shipping to correct address now."
```

---

## Section 7: Tools & Support Contacts

### 7.0 Platform Login Reference

| Platform | URL | Credentials | Support Contact |
|---|---|---|---|
| **Fynd / Commerce.com** | https://services.fynd.com/cp/ | [Email/password in manager] | support@fynd.com or @fynd on Twitter |
| **Shiprocket** | https://dashboard.shiprocket.in/ | [Email/password in manager] | support@shiprocket.in or 9718999111 |
| **Razorpay** | https://dashboard.razorpay.com/ | [Email/password in manager] | support@razorpay.com or 1800-1208-9999 |
| **Ink Fish Production** | [Email / WhatsApp] | [Dan's contact info] | [Ink Fish contact name + phone] |
| **Gmail** (Customer inquiries) | https://mail.google.com | productlab.info@gmail.com | Gmail support built-in |
| **WhatsApp** (Customer support) | [Mobile app] | +91 [Dan's phone] | WhatsApp support built-in |
| **Instagram** | https://instagram.com/the.product.lab | [Dan's account] | Instagram support built-in |

---

### 7.1 When to Escalate & How

| Issue | Escalate To | Method | Example |
|---|---|---|---|
| **Technical platform issue** | Tobi (build lead) | WhatsApp + screenshot | "Checkout page won't load, see attached. Customers can't complete purchase." |
| **Fynd configuration** | Dan + Fynd support | Email to support@fynd.com, CC Dan | "Free shipping threshold not applying to orders >₹499. SKU shows ₹499 but shipping still charged." |
| **Payment processing issue** | Dan + Razorpay | Razorpay dashboard support + Dan WhatsApp | "Payment stuck in Pending status for 30+ min. Customer ID: [X]. AWB: [Y]" |
| **Shiprocket carrier issue** | Shiprocket support directly | support@shiprocket.in or phone 9718999111 | "AWB [X] showing wrong delivery date. Can you investigate with carrier?" |
| **Out of stock / production delay** | Dan + Ink Fish | Dan contacts Ink Fish | "Bullshit Remover Pin not received. Was ordered [date], due [date]. Status?" |
| **Angry customer / complaint** | Dan | WhatsApp screenshot of convo | "Customer is upset, threatening negative review. See attached convo. How should I respond?" |
| **Data discrepancy** | Dan + Patrick (finance) | Email + spreadsheet | "Order total in Fynd (₹249) doesn't match Razorpay settlement (₹219). Which is correct?" |

---

### 7.2 Shiprocket Support

**Phone:** +91-971-899-9111 (Mon–Fri, 10 AM–7 PM IST)

**Email:** support@shiprocket.in

**Chat:** In Shiprocket dashboard (bottom right, usually)

**What they can help with:**
- Carrier issues (delivery delays, lost package, COD payment failure)
- AWB generation errors
- Pickup scheduling
- Address corrections before dispatch
- Settlement/payment tracking

**What you should handle yourself:**
- Label printing (technical issue → contact printer support, not Shiprocket)
- Fynd sync issues (contact Fynd support)
- Refund processing (use Fynd/Razorpay, not Shiprocket)

---

### 7.3 Razorpay Support

**Phone:** 1800-1208-9999 (Mon–Fri, 9 AM–6 PM IST)

**Email:** support@razorpay.com

**Chat:** In Razorpay dashboard (bottom right, usually)

**What they can help with:**
- Payment authorization issues (card declined, UPI timeout, etc.)
- Settlement tracking
- Refund processing
- Webhook/integration issues

**What you should handle yourself:**
- Customer payment issues (advise customer to contact their bank, not Razorpay)
- Order payment verification (use Fynd or Razorpay dashboard to check)

---

### 7.4 Fynd Support

**Email:** support@fynd.com

**Twitter:** @fynd (for urgent issues)

**In-platform:** Fynd CP usually has a "Help" section with live chat

**Response time:** 4–12 hours (they're good, but slower than Shiprocket)

**What they can help with:**
- Order sync issues
- Payment gateway configuration
- Shipping integration setup
- Site performance/crashes
- Inventory sync with third-party tools
- Collections, categories, SEO

---

## Section 8: End-of-Day Checklist & Weekly Review

### 8.0 Daily End-of-Day (5 minutes)

**Do this every day before closing:**

- [ ] Count orders dispatched today (goal: 100% if received before 11 AM)
- [ ] Update inventory tracker with all items used
- [ ] Confirm both Fynd and Shiprocket show all orders as "Shipped"
- [ ] Check Razorpay for any failed payments from the day
- [ ] Respond to any outstanding customer inquiries (2+ hours old)
- [ ] Note any blockers or issues for tomorrow (e.g., "Out of Magnet designs")
- [ ] Prepare tomorrow's order list (sort by order time, identify hero products)
- [ ] Take a photo of tomorrow's stack of boxes to pack (for motivation)

**Time:** 5 minutes

---

### 8.1 Weekly Review (Every Friday, 30 minutes)

**Do this once a week to spot trends and adjust:**

- [ ] **Volume:** Orders this week vs last week (trending up or stable?)
- [ ] **Geography:** Which states are selling most? (Use Fynd analytics)
- [ ] **Products:** Which SKUs are top 3 sellers? Which are slow?
- [ ] **Payments:** % prepaid vs COD (goal: 60% prepaid, 40% COD)
- [ ] **Returns:** Any returns this week? Why? (Build learnings)
- [ ] **Customer feedback:** Any complaints? Common questions?
- [ ] **Inventory:** Which items need reorder in next 7 days?
- [ ] **Fulfillment speed:** Average days from order to dispatch? (Goal: 1 day)
- [ ] **Issues:** Any operational hiccups? How to fix next week?

**Output:** Brief notes for Dan (WhatsApp or email)

Example: "Week of March 30: 47 orders, 65% prepaid, 35% COD. Bullshit pin = top seller. Half sticker = slow, consider bundling. No returns. Avg dispatch: 0.8 days (good!). Inventory reorder: Lapel pins needed by Tuesday."

---

### 8.2 Monthly Financial Review (With Patrick/Dan, 1 hour)

**Do this once a month (last Friday) to track profitability:**

- [ ] Revenue: Total orders × avg price (should trend up)
- [ ] COGS: Total units sold × cost per unit (track margin)
- [ ] Shipping costs: Shiprocket settlement (should be 8–12% of revenue)
- [ ] Razorpay fees: From Razorpay dashboard (~2–3% of revenue)
- [ ] Returns: Refund amounts (should be <5% of revenue)
- [ ] Net profit: Revenue − COGS − Shipping − Fees − Returns

Example:
```
March 30 – April 30
Orders: 200
Revenue: ₹60,000
COGS (@ 73% margin): ₹16,200
Shipping: ₹6,000
Razorpay fees: ₹1,600
Returns: ₹2,000
_________________________________
Net profit: ₹34,200
Margin %: 57% (good target)
```

---

## Section 9: Templates & Sample Messaging

### 9.0 Order Confirmation (Auto-sent by Fynd, but verify tone)

**Customer sees this in email/SMS:**

```
Your order is confirmed!

Order #TPL-[XXXX]
Total: ₹[XXX]

What you bought:
- [Product name] × [qty]

Shipping to: [Address]

Your tracking will land here in 2–3 hours.
We're packing it now.

Questions? Hit reply. — Dan
```

---

### 9.1 Shipping Notification (Manual WhatsApp, recommended)

**Send after you dispatch (with AWB number):**

```
Hey [First Name]! 📦

Your order is on the way.

Order: TPL-[XXXX]
Tracking: [AWB link or tracking number]

Arrives in 3–5 days. Check the link to see where it is.

Anything else? Just message me.
— Dan, The Product Lab
```

---

### 9.2 Delivery Notification (Manual WhatsApp, optional)

**Send when tracking shows "Delivered":**

```
[First Name]! 📬 Your box arrived.

Hope you love it. This one comes with a care card — read it.

Any issues? Hit me back. Otherwise, keep doing you.

— Dan
```

---

### 9.3 Thank-You Card (Inside Box)

**Handwritten or pre-printed:**

```
Thanks, [First Name].

You just told 47 people who they are.
Wear it proud.

— Dan
```

---

### 9.4 COD Payer Notification (Send before dispatch)

**WhatsApp to COD customer:**

```
Hey [First Name]! Quick heads up:

Your order is coming COD (pay when it arrives).
Total: ₹[XXX] in cash

The courier will call before delivery.
Pick up soon, yeah?

Tracking: [AWB link]

— Dan
```

---

### 9.5 Return Initiated (Automated by Fynd, but confirm with customer)

**WhatsApp after they request return:**

```
Got it — returning [product name].

Here's your return label (print & stick on box):
[Return label PDF link]

Drop it at any Delhivery/Ecom spot. It's free.

Once we get it back (3–5 days), refund within 24 hours.

Questions? LMK.

— Dan
```

---

## Section 10: Appendix — Forms & Checklists

### 10.0 Order Packing Checklist (Laminate this)

**Print and stick to your packing station:**

```
ORDER PACKING CHECKLIST

Order #: ________
Customer: ________________
Packing date: ________

PRODUCT
[ ] Correct item? (Check against Fynd order)
[ ] No damage/defects? (Visual inspection)
[ ] Right quantity? (If >1 item, count)
[ ] Placed in box?

PACKAGING
[ ] Kraft tape sealed all seams?
[ ] Thank-you card inside?
[ ] Care instruction card inside?
[ ] Tissue paper added? (optional, for premium feel)
[ ] Customer phone # written on top-left corner?

READY FOR LABEL
[ ] Box sealed and stable?
[ ] No shifting when shaken?
[ ] Moved to "Ready to Label" shelf?

Packed by: ________
Time: ________
```

---

### 10.1 Daily Fulfillment Log (Track daily activity)

| Date | Orders Received | Orders Dispatched | Avg Pack Time | Inventory Issues | Notes |
|---|---|---|---|---|---|
| 2026-04-05 | 12 | 11 | 8 min | Magnet design OOS | One return requested; processing |
| 2026-04-06 | 8 | 8 | 7 min | None | All smooth |

---

### 10.2 Carrier Performance Tracker (Monthly review)

| Carrier | Total Shipped | Delivery Delays | Damaged in Transit | COD Success % | Cost per Item |
|---|---|---|---|---|---|
| **Delhivery** | 65 | 2 | 1 | 98% | ₹48 |
| **Ecom Express** | 35 | 1 | 0 | 95% | ₹45 |

---

### 10.3 Contact Reference Card (Print & laminate)

```
EMERGENCY CONTACTS

Dan (You): [phone]
Fynd Support: support@fynd.com
Shiprocket Support: 9718999111 / support@shiprocket.in
Razorpay Support: 1800-1208-9999 / support@razorpay.com
Ink Fish Production: [contact name + phone]

SHIPROCKET CARRIER SUPPORT
Delhivery: 1800-123-8888
Ecom Express: 1800-208-9999
```

---

## Section 11: Assumptions & Limitations

This manual assumes:

1. **Fynd platform access:** You have login credentials and the store is configured
2. **Shiprocket account:** Created, integrated with Fynd, 2+ carriers set up
3. **Razorpay account:** Live, processing real payments (not test mode)
4. **Label printer:** Thermal printer set up or inkjet backup available
5. **Packaging materials:** In stock (boxes, tape, cards); restock weekly
6. **Inventory:** 20+ hero products in stock at launch (per D-007)
7. **One person (Dan):** Executing this solo; no staff support
8. **Business hours:** 10 AM–6 PM IST, Mon–Fri (weekends/nights = escalate to Monday)
9. **Shipping network:** Delhivery + Ecom Express serviceable across India (covers 99% of pincodes)

**Out of scope (escalate to Harley/Dan):**
- Website design changes
- Product catalog edits or new SKU additions
- Pricing changes
- Major operational changes (e.g., switching fulfillment centers, hiring staff)
- Paid advertising or marketing campaigns

---

## Section 12: How to Use This Manual

**Read this first:** Sections 1.0 (Daily Order Workflow) and 2.0 (Payment Processing)

**Print and keep nearby:** 10.0 (Packing Checklist)

**Reference as needed:** Sections 4–7 (when issues arise)

**Weekly review:** Section 8.1 (spot-check performance)

**Update this document:** Every month with new learnings or platform changes. Date your edits with comments (e.g., "2026-05-15: Added Razorpay settlement delay notes").

---

## Revision History

| Date | Change | Reason |
|---|---|---|
| 2026-03-27 | Initial draft | Andy produces for Phase 4 launch |
| [Future] | [Change] | [Reason] |

---

**Ready to go live, Dan. This is your daily playbook. Use it, iterate it, own it.**

**Any questions about a procedure, message Andy. Any operational decisions, escalate to Harley.**

**You've got this.**

