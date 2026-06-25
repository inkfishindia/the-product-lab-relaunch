<!-- last-updated: 2026-03-27 -->
# Phase 4 Pre-Launch Operations Batch — Master Brief

| Field | Value |
|-------|-------|
| **Date** | 2026-03-27 |
| **Briefing Agent** | Harley (Program Director) |
| **Execution Agents** | Andy, Joanna, Patrick, Raj |
| **Status** | Brief — awaiting execution |
| **Reviewer** | Dan |

---

## Situation

Phase 4 is active. Fynd platform access is the primary blocker for build work (Tobi waiting). While waiting, we need to prep operational infrastructure so Dan can execute solo on Day 1 launch.

**Key constraint:** D-012 locks Dan as sole operator. No staff. All workflows must be documented for one-person execution with AI agent support.

---

## Work Streams

### 1. Store Operations Manual
**Owner:** Andy (Product Operations)
**Output file:** `artifacts/phase-4/store-operations-manual.md`

Daily procedural guide for Dan. Include:
- Order fulfillment workflow (receive → verify → pack → label → dispatch)
- Payment processing checklist (UPI, cards, COD verification)
- Stock management by collection (card stickers, No Filter, lapel pins)
- Inventory reorder triggers and lead times (Ink Fish production turnaround)
- Customer service escalation paths (refunds, damage, lost shipments)
- Shipping label generation (Shiprocket walkthrough)
- Carrier handoff procedures (multiple carriers)
- End-of-day checklist
- Emergency procedures (payment failure, out of stock, angry customer, platform down)

**Success criteria:**
- One person (Dan) can execute daily operations without external help
- Each procedure has step count, expected time, and decision tree
- All screenshots/links to external platforms (Fynd, Shiprocket, Razorpay) included

---

### 2. FAQ & Customer Help Center
**Owner:** Joanna (Copy + Content)
**Output file:** `artifacts/phase-4/faq-and-help.md`

Customer-facing Q&A organized by topic. Include:
- Shipping & delivery (when will it arrive, tracking, different states, COD timing)
- Payment options (which cards/UPI/wallets, COD eligibility, prepaid discount)
- Returns & exchanges (30-day window, condition, process, COD refund delays)
- Product info (sizing for accessories, materials, care instructions, how to wear)
- Bulk/corporate inquiries (B2B point of contact, volume discounts)
- Tracking (where is my order, how to get AWB number)
- Technical (website down, payment failed, account issues)

**Success criteria:**
- 30+ Q&As covering 90% of expected customer questions
- Each answer uses voice rules from `artifacts/phase-3/copy-system.md`
- Answers are short enough to forward on WhatsApp
- Every answer solves the problem or gives clear escalation path

---

### 3. Inventory Management Spreadsheet
**Owner:** Patrick (Finance/Ops)
**Output file:** `artifacts/phase-4/inventory-tracker.xlsx` (XLSX format)

Live inventory tracking system for Dan. Include:
- SKU reference table (article number, name, collection, unit cost, selling price)
- Stock by location (online, physical store if relevant)
- Reorder triggers (when to alert Dan for Ink Fish production)
- Production lead times (Ink Fish turnaround days)
- Safety stock levels per SKU
- Historical stock movement (for optimization later)
- Formula for automated low-stock alerts

**Success criteria:**
- Dan can update stock once daily in <2 minutes
- Automated alerts flag when stock falls below threshold
- Tracks cost of goods for margin calculations
- Can forecast stock-out dates

---

### 4. Fulfillment & Packing SOP
**Owner:** Raj (Logistics/Ops)
**Output file:** `artifacts/phase-4/fulfillment-packing-sop.md`

Detailed packing procedures for Dan. Include:
- Order receipt workflow (how orders come into Fynd)
- Verification checklist (correct items, no damage)
- Picking procedure (where to find items in store/inventory)
- Packing standards (packaging materials, thank-you note, care cards)
- Label generation (Shiprocket integration, AWB, address format)
- Carrier selection logic (price vs speed, COD vs prepaid)
- Dispatch & handoff (carrier pickup, photo for records)
- Problem resolution (damaged item, wrong SKU, lost in transit)

**Success criteria:**
- Dan can pack and dispatch an order in <10 minutes
- Thank-you card copy uses voice from `artifacts/phase-3/copy-system.md`
- Unboxing experience is documented (what goes in the box, order)
- Photo requirements for records are clear

---

### 5. Pre-Launch Validation Checklist
**Owner:** Raj (Logistics/Ops)
**Output file:** `artifacts/phase-4/pre-launch-validation.md`

Checklist to confirm Phase 4 gate criteria are met before Phase 5 launches. Include:
- From D-007: Gift 20+ products, validate card sticker pricing with 10 real txns, post 10 content pieces, seed 500+ subscribers
- From Phase 4 gate: Staging site live, hero products uploaded, Razorpay live, Shiprocket AWBs generated, GA4 tracking, LCP <3s on 4G, James QA sign-off
- Tracking: Which items are complete, which are pending, what's the blocker

**Success criteria:**
- One document that Dan can reference daily to see progress
- Each item has owner (Dan, Tobi, James, etc.) and status
- No ambiguity on what "done" means for each item

---

### 6. Customer Communication Templates
**Owner:** Joanna (Copy + Content)
**Output file:** `artifacts/phase-4/customer-comms-templates.md`

Copy templates for common customer touchpoints. Include:
- Order confirmation email/SMS
- Shipping notification (with tracking)
- Delivery notification
- Post-delivery thank-you
- Refund initiated notification
- Return/exchange requested confirmation
- COD payment reminder (if delayed)
- Out of stock notification
- Back-in-stock alert

**Success criteria:**
- All templates use voice rules from `artifacts/phase-3/copy-system.md`
- Short enough for WhatsApp (Eli will use these for SMS/WA flows)
- Dan can copy/paste with minimal personalization
- Tone feels like brand, not robotic

---

### 7. Returns & Exchange Policy
**Owner:** Patrick (Finance/Legal)
**Output file:** `artifacts/phase-4/returns-exchange-policy.md`

Customer-facing policy + internal procedures. Include:
- Who can return / when (30 days, condition rules)
- How to initiate a return (process flow)
- Refund timeline (prepaid vs COD different)
- Exchange procedures (swap SKU, different size/color)
- Condition rules (unworn, tags on, packaging intact)
- Non-returnable items (if any)
- Shipping costs (prepaid return vs seller-paid)
- Internal verification (how to check returned item condition)
- Refund method (original payment method, bank account)
- COD-specific rules (cash refund timing)

**Success criteria:**
- Clear enough that customers self-serve (reduces support load)
- Dan can execute refunds/exchanges in <5 minutes per request
- Protects inventory (clear condition rules)
- Compliant with Indian ecommerce norms

---

## Execution Rules

1. **Use artifact headers.** Copy format from `templates/artifact-header.md` for all outputs. Status starts as `draft`.
2. **Phase 4 artifacts.** All files go to `artifacts/phase-4/` directory.
3. **Read upstream docs.** Before starting, read:
   - `artifacts/phase-3/copy-system.md` (voice rules)
   - `artifacts/phase-3/asset-list.md` (production context)
   - `knowledge/16-COMPANY-FACTS.md` (revenue, margin, team)
   - `knowledge/26-CURRENT-STATE.md` (current blockers, Dan's constraint)
4. **Dan-executable only.** Every procedure assumes one person, no staff. Include time estimates and decision trees.
5. **Coordination:**
   - Joanna and Patrick may need to coordinate on returns policy copy and FAQ alignment
   - Andy may need to reference Raj's fulfillment SOP for daily ops
   - Patrick's inventory sheet should integrate with Raj's stock verification procedure

---

## Success Metrics (Dan's Review)

✅ **Operational clarity:** Dan can execute any procedure without asking questions
✅ **Consistency:** All procedures reference the same inventory, pricing, and voice
✅ **Completeness:** Every customer touchpoint is covered
✅ **Completeness:** Every operational edge case has a documented procedure
✅ **Speed:** Procedures include time estimates; Dan can handle order volume solo

---

## Timeline

- **Day 1 (2026-03-27):** Agents execute briefs. Aim for rough drafts by end of day.
- **Day 2 (2026-03-28):** Dan reviews, sends feedback, agents iterate.
- **By 2026-03-30:** All operational docs finalized and locked.

Then: Phase 4 gate criteria can be tracked in pre-launch-validation.md

---

## Next Actions

1. **Andy** → Start store-operations-manual.md (estimate: 4-5 hours)
2. **Joanna** → Start FAQ and customer-comms-templates in parallel (estimate: 3-4 hours each)
3. **Patrick** → Start inventory-tracker.xlsx and returns-policy (estimate: 3-4 hours)
4. **Raj** → Start fulfillment-sop and pre-launch-validation (estimate: 3-4 hours)

All agents: Coordinate with Harley or Dan if you hit a blocker or need clarification on Dan's solo-operator constraint.
