<!-- last-updated: 2026-03-15 -->
# Fulfillment Standard Operating Procedures

| Field | Value |
|-------|-------|
| **Phase** | 1 — Audit |
| **Producing Agent** | Raj (Logistics & Fulfillment Lead) |
| **Date** | 2026-03-15 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## 1. Overview

This document defines the end-to-end fulfillment process for The Product Lab from order placement to delivery confirmation and returns. Designed for a single-operator / small-team setup at launch (under 200 orders/month). Process should be executable by one person without custom warehouse software.

All fulfillment originates from Bengaluru. No third-party fulfillment warehouse (3PL) at launch phase; reassess when orders exceed 300/month or when the team cannot manage packing within 1 business day.

---

## 2. Packaging Standards

### 2.1 Design Principles

Packaging for TPL must satisfy three objectives simultaneously:
1. **Protection:** Products arrive intact through India's logistics chain (rough handling, monsoon moisture, multiple courier handoffs)
2. **Brand experience:** Unboxing communicates that this is a considered, intentional brand — not a commodity dispatch
3. **Cost discipline:** Packaging cost should not exceed ₹15–₹20 per order at launch. Every rupee of packaging is a rupee off contribution margin.

**Note on unboxing experience design:** The visual and creative direction of packaging (color, graphic elements, tissue paper design, sticker design) is Sean's domain (Creative Director). The specs below define structural and cost requirements only. Sean should design within these constraints, not override them.

### 2.2 Primary Packaging: Bubble Mailer (Default)

**Recommended: Kraft bubble mailer (16cm × 22cm or 18cm × 25cm)**

| Spec | Detail |
|------|--------|
| Material | Kraft paper outer + bubble wrap interior |
| Size | 16×22cm for single-item orders; 18×25cm for 2–4 items |
| Protection | Bubble interior protects enamel pins, keychains, earrings from surface impact |
| Water resistance | Kraft mailer has moderate moisture resistance; sufficient for non-monsoon transit |
| Weight | ~20–30g per mailer (well within 500g slab) |
| Cost estimate | ₹8–₹15 per unit at 500+ unit order quantity |
| Branding potential | Kraft surface accepts custom print or sticker; Sean to design branded sticker or stamp |

Source: IndiaMart poly mailer data (₹1.50/unit for plain poly) + packaging research suggesting branded kraft bubble mailers at ₹8–₹15 in Indian market for D2C brands.

**When to use:** Single pins, keychains, card stickers, earrings, sticker packs. All standard single-item and multi-item orders under 300g.

### 2.3 Additional Packaging: Rigid Envelope or Chipboard Backing for Flat Items

Card stickers and laptop sticker sheets can be damaged by bending in transit. These require a rigid cardboard backer inside the bubble mailer.

| Spec | Detail |
|------|--------|
| Material | Recycled chipboard / greyboard, 1.5mm thickness |
| Size | Cut to fit mailer (15×20cm approximate) |
| Weight | ~25–40g per insert |
| Cost estimate | ₹2–₹5 per insert at bulk; cut from standard sheet |
| Purpose | Prevents fold/crease damage on flat sticker products |

**When to use:** Any order containing card stickers or sheet stickers. Insert into bubble mailer before sealing.

### 2.4 Monsoon-Proofing (June–September)

During monsoon season, kraft mailers absorb moisture. Add an inner poly sleeve (standard zipper or heat-sealed clear poly bag) for all shipments during June–September.

| Spec | Detail |
|------|--------|
| Material | Clear 50-micron poly bag with self-seal adhesive strip |
| Size | 14×20cm (inner wrap for product before placing in bubble mailer) |
| Cost | ₹0.80–₹1.50 per unit |
| Weight | Negligible (~5g) |

### 2.5 Brand Touches Within the Packaging Budget

These are the permitted brand elements within the ₹15–₹20 total packaging budget:

| Element | Description | Cost | Decision Owner |
|---------|------------|------|---------------|
| Branded exterior sticker | TPL logo/brand sticker applied to bubble mailer seal | ₹2–₹4 per sticker | Sean (design), Raj (spec) |
| Thank-you card | Small A6 card with brand message and QR code to Instagram | ₹3–₹6 per card (digital print, 250gsm) | Sean (design), Casey (copy) |
| Product tissue wrap | Single sheet of branded tissue around product | ₹1–₹2 per sheet | Sean (design) |
| Total per order | Target: under ₹20 | ₹14–₹27 range | Raj to approve final tally |

**Note:** Sean has design decision rights on what these elements look like. Raj has cost veto — if the creative direction requires packaging that exceeds ₹25/order at launch volume, this must be escalated to Harley for budget decision.

### 2.6 What Not to Use at Launch

The following packaging approaches are cost-inappropriate for TPL's current price range and volume:

- Rigid gift boxes (₹40–₹80 per box — exceeds product value for ₹149 items)
- Custom printed mailers with full-color exterior printing (₹30–₹50 minimum per unit; requires high MOQ)
- Magnetic closure boxes or drawer-style packaging (₹60–₹150 per unit)
- Foam inserts custom-cut per product (₹15–₹40 per insert)

These are valid aspirational options for future premium bundles priced above ₹999. Not for launch.

---

## 3. Order Processing SOP

### 3.1 Order Intake (Daily, 9 AM)

1. Open Shiprocket dashboard and sync new orders from Fynd Commerce
2. Review all orders for:
   - Complete delivery address (name, phone, full address with pin code)
   - COD vs prepaid flag
   - Any special requests in order notes
3. Flag incomplete addresses immediately — WhatsApp customer to confirm before dispatching
4. Batch COD orders separately from prepaid orders (for WhatsApp confirmation workflow)

### 3.2 COD Order Confirmation (Within 5 Minutes of Order)

**This step is non-negotiable for every COD order.**

1. Trigger WhatsApp COD confirmation via Gupshup/MSG91 automation
   - Message includes: order summary, delivery address, UPI switch offer, confirmation button
2. Monitor WhatsApp inbox for customer responses
3. If customer does not confirm within 4 hours: call once on registered mobile number
4. If no confirmation after 8 hours: hold order; do not pack or dispatch until confirmed
5. If customer cancels via WhatsApp: mark as cancelled in Shiprocket, do not dispatch

### 3.3 Packing (Daily, After COD Confirmation, 11 AM–2 PM Window)

**Packing checklist per order:**

- [ ] Verify product matches order (sku, design, colour)
- [ ] Inspect product for damage / defects before packing
- [ ] Apply monsoon inner poly wrap if date falls in June–September
- [ ] For flat sticker/card sticker orders: insert chipboard backer
- [ ] Wrap product in tissue sheet (one layer)
- [ ] Place thank-you card in mailer
- [ ] Seal mailer and apply branded TPL sticker at seal
- [ ] Apply shipping label (printed from Shiprocket — AWB label with barcode)
- [ ] Write order number on mailer in marker if label is thermal print (backup identification)

**Quality check:** Do not seal mailer before verifying: correct product, label matches order address, COD orders have COD marker visible on AWB label.

### 3.4 Carrier Pickup / Drop-off (Daily, 3–4 PM)

For Delhivery and most carriers via Shiprocket:
- Schedule pickup from Bengaluru origin in Shiprocket dashboard by 2 PM for same-day pickup
- Carriers typically pickup between 3–6 PM for next-morning dispatch
- If pickup slot missed, drop off at nearest Delhivery drop point (check Shiprocket for nearest point to Bore Bank Road or Vasanth Nagar address)

**Minimum dispatch SLA:** All confirmed orders (prepaid and COD confirmed) must be dispatched within 1 business day of order placement. Aim for same-day dispatch for orders received before 12 PM.

### 3.5 Post-Dispatch: Tracking and NDR Management

1. After AWB generation, Shiprocket auto-sends tracking link to customer via SMS/email
2. Monitor Shiprocket NDR dashboard daily (morning check, 9 AM)
3. For every NDR generated: trigger WhatsApp to customer within 1 hour (do not wait)
4. Log all NDRs with reason code in a simple Google Sheet: [Date | AWB | Customer Mobile | Reason | Resolution]
5. If NDR re-delivery scheduled: confirm pickup time with customer via WhatsApp
6. If third delivery attempt fails: initiate RTO in Shiprocket, update log

---

## 4. Returns Processing SOP

### 4.1 RTO Receipt (Return to Origin)

When a shipment is returned to Bengaluru origin:

1. Inspect packaging for damage during transit
2. Open and inspect product:
   - Undamaged: return to inventory, mark as restockable
   - Damaged in transit: photograph, log, file courier insurance claim via Shiprocket
   - Tampered / opened by customer: log, assess whether restockable
3. Update inventory count in Fynd Commerce system
4. Log in RTO register: [Date | AWB | Product | Return Reason | Restockable Y/N | Resolution]
5. If reason code is "customer refused" or "fake address": add mobile number to COD blacklist in Shiprocket Smart COD

### 4.2 Customer-Initiated Return / Exchange Requests

Per the returns policy recommended in logistics-baseline.md:

| Scenario | SOP |
|----------|-----|
| Damaged product (customer sends photo) | Verify photo authenticity. If valid: create replacement order in Shiprocket, dispatch within 1 business day. No collection of damaged item. Log: [Date | Order # | Issue | Resolution] |
| Wrong product dispatched | Create replacement with correct product. Mark original order in Fynd as "wrong product dispatched" for root cause tracking. No return collection needed (item value < logistics cost). |
| Defective product (manufacturing) | Assess via photo. If valid: replacement or store credit. Log for product quality pattern analysis. |
| Customer preference change (prepaid) | Issue store credit (valid 6 months) in Fynd Commerce. No refund unless required by consumer protection rules. Escalate any contested cases to Harley. |
| Not delivered (carrier failure) | Verify tracking. If confirmed non-delivery: full refund or re-dispatch at customer choice. File carrier claim via Shiprocket for reimbursement. |

### 4.3 Refund Processing

Refunds (when applicable under policy) are processed via Razorpay:
- Prepaid orders: refund to original payment method within 5–7 business days
- COD orders where refund is owed: NEFT to bank account; collect bank details via WhatsApp
- Log all refunds in Fynd Commerce and in a separate refund register

---

## 5. Inventory Management SOP (Launch Phase)

Simple inventory management for under 50 SKUs at launch:

1. Maintain a Google Sheet inventory register: [SKU | Product Name | Opening Stock | Units Sold | Units Returned | Current Stock | Reorder Point]
2. Update daily after packing (deduct shipped) and after RTO receipt (add back restockable)
3. Set reorder point at 5 units per SKU (order fresh stock when reaching 5 units remaining)
4. Before festival season (September): conduct full inventory count and pre-order sufficient stock for projected Diwali/Raksha Bandhan demand

---

## 6. Festival Season Preparedness (Oct–Dec)

The Oct–Dec window (Navratri, Diwali, Raksha Bandhan) will be TPL's peak gifting period. Shiprocket and all carriers experience volume surges during this period causing:
- Pickup delays (carriers deprioritize small sellers)
- Delivery SLA extension (add 1–2 days to standard zone times)
- Higher RTO rates from holiday household unavailability

**Actions to take by September 1 each year:**

1. Increase safety stock: 2–3x normal reorder quantities for hero SKUs
2. Book Delhivery priority pickup slot via Shiprocket account manager
3. Update website delivery estimate copy to reflect extended SLAs (Tony / front-end)
4. Activate Early COD on Shiprocket (D+2 remittance) for improved cash flow during high volume
5. Pre-prepare WhatsApp broadcast for "Order early for Diwali delivery" campaign (coordinate with Casey/Andrew)
6. Pause COD for Zone E destinations during peak week if carrier capacity is confirmed limited

---

## 7. Process Improvement Triggers

The following operational signals indicate the current SOP needs upgrading:

| Signal | Action |
|--------|--------|
| Orders exceed 300/month consistently | Evaluate 3PL partner in Bengaluru for pick/pack outsourcing |
| Packing time exceeds 2 hours/day | Hire part-time packing help or outsource |
| NDR rate exceeds 20% | Review address verification workflow; consider mandatory address OTP for all COD |
| RTO rate exceeds 15% | Escalate to Harley per escalation triggers; review COD strategy immediately |
| Single product accounts for >30% of RTOs | Flag potential product quality issue to Shreyas/Andy (product) |
| Shiprocket pickup misses >2 days/week | Evaluate switching to Delhivery direct pickup or identify drop-point location |

---

## 8. Tools and Systems Summary

| Function | Tool | Status |
|----------|------|--------|
| Order management | Fynd Commerce (Commerce.com) | Planned (Phase 4) |
| Shipping management | Shiprocket Business plan | To be set up (Phase 4) |
| Label printing | Thermal label printer (4×6 inch labels) or inkjet/laser | Required hardware — purchase before launch |
| COD WhatsApp automation | Gupshup or MSG91 | To be set up (Phase 4) |
| Inventory tracking | Google Sheets (launch phase) | Immediate; upgrade to Fynd inventory when available |
| RTO register | Google Sheets | Immediate |
| Refund processing | Razorpay dashboard | Configured with payment setup |
| Customer support (NDR/queries) | WhatsApp Business + ticketing (Tony's domain) | Coordinate with Tony in Phase 6 |

**Hardware required before launch:**
- Thermal label printer (Zebra ZD220 or equivalent: ~₹5,000–₹8,000 one-time) for clean AWB label printing. Manual handwriting of AWB numbers is not acceptable — it causes barcode scan failures and lost shipments.
- Bubble mailers (initial stock: 200 units of each size)
- Chipboard backer sheets (initial stock: 100 units for sticker orders)
- Branded stickers for mailer seal (Sean to design; print minimum 500 units)
- Thank-you cards (Sean to design; print minimum 500 units, A6 size)
- Poly inner bags for monsoon proofing (if launching between June–September: 200 units)

---

*Related artifacts: logistics-baseline.md, shipping-partner-evaluation.md, cod-strategy.md*
*Coordinate with:*
- *Tony: NDR and returns-related customer support workflows*
- *Tobi: Shiprocket-Fynd integration, WhatsApp automation setup*
- *Patrick: Packaging cost inputs for margin model; COD fee pass-through decision*
- *Sean: Packaging design within cost constraints defined in Section 2*
- *Casey: Thank-you card copy and festival season communication templates*
