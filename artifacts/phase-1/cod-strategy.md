<!-- last-updated: 2026-03-15 -->
# COD Strategy & RTO Reduction Plan

| Field | Value |
|-------|-------|
| **Phase** | 1 — Audit |
| **Producing Agent** | Raj (Logistics & Fulfillment Lead) |
| **Date** | 2026-03-15 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## 1. The COD Problem Defined for TPL

This is a financial problem, not a preference problem.

| Metric | Data | Source |
|--------|------|--------|
| COD share of D2C orders (India) | 50–60% of all orders | Market-Xcel / customer-insight-report.md |
| COD share of total RTO volume | 76–83% | bepragma.ai |
| Average COD RTO rate (industry) | 28–35% | bepragma.ai |
| Average prepaid RTO rate | 4–8% | bepragma.ai |
| RTO logistics cost per event | ₹180–240 | bepragma.ai + customer-insight-report.md |

**TPL-specific math:**

At a ₹149 product selling price:
- Forward shipping (Zone D, COD): ~₹90–₹120 (shipping + COD charge)
- Product COGS (estimated ₹30–₹60 for accessories of this type): ~₹45
- Gross margin before RTO: ~₹44–₹74 per successful delivery
- RTO event cost (reverse logistics): ~₹50–₹80
- Net loss on one COD RTO: ₹94–₹154 per returned order

**At 25% COD RTO, for every 100 COD orders: 25 are RTOs, each costing the brand ₹94–₹154. The entire category of COD orders becomes a net-loss channel at this price point unless RTO is held below 10–12%.**

At a ₹249 product:
- Gross margin before RTO: ~₹80–₹120
- Still underwater at 25% RTO (25 RTOs × ₹94–₹154 = net drag of ₹2,350–₹3,850 per 100 orders)
- Break-even RTO for COD viability at ₹249 AOV: approximately 8–10%

**Target: Hold COD RTO below 10%.** Industry average without intervention is 28–35%. This requires active management, not passive hope.

**The COD paradox:** Eliminating COD entirely would reduce RTO but would also reduce order volume by an estimated 40–60% — a worse outcome for a new brand trying to acquire customers. The strategy must manage COD, not eliminate it.

---

## 2. COD Rate Card on Shiprocket

| Component | Rate | Notes |
|-----------|------|-------|
| COD handling charge | Higher of: flat ₹26–₹36 OR 2–2.5% of order value | Illustrative; varies by courier partner on Shiprocket |
| Standard COD remittance | D+8 to D+10 days post delivery | "D" = delivery date |
| Early COD plan | D+2 days post delivery | Small additional fee; exact amount plan-dependent |
| Instant COD | 70% within 24 hrs of dispatch; remainder at standard cycle | Up to 5% fee on remitted amount |

**Example COD cost at ₹249 order value:**
- 2.5% COD charge = ₹6.23 — below flat floor of ₹36
- Effective COD charge = ₹36 (flat floor applies)
- Effective COD charge as % of ₹249 order = 14.5% — significant margin drag

**Example COD cost at ₹749 bundle order:**
- 2.5% COD charge = ₹18.75 — still below ₹36 flat floor
- Effective COD charge = ₹36
- Effective COD charge as % of ₹749 = 4.8% — more tolerable

**Implication:** COD charges as a proportion of revenue are most damaging on single-item low-AOV orders. This is another argument for bundle mechanics to increase AOV before COD economics destroy margins.

**Cash flow note:** At D+8 to D+10 remittance, if TPL ships 100 COD orders in a week worth ₹24,900 total, that cash is locked for 10 working days. For a bootstrap business this is a meaningful float constraint. Early COD (D+2) should be activated if cash flow tightens, even at the fee cost.

---

## 3. Prepaid-to-COD Strategy: Shifting the Mix

The goal is to move the COD percentage from a likely 55–65% launch mix toward a healthier 35–40% over 6 months. Every percentage point shifted to prepaid reduces RTO exposure.

### 3.1 At Checkout: Prepaid Incentive

**Tactic:** Offer a fixed-amount incentive for choosing UPI/card/wallet payment.

Evidence from Indian D2C research (bepragma.ai):
- Flat ₹50–₹100 discount converts 31–38% of COD customers to prepaid
- Percentage discounts (e.g., 10% off) perform significantly worse (18–23% conversion)
- 68–74% of price-sensitive buyers choose prepaid when offered ₹75–₹125 savings

**Recommended implementation for TPL:**

| AOV Range | Prepaid Incentive | Rationale |
|----------|-------------------|-----------|
| ₹49–₹149 | ₹20 off or free shipping | ₹20 discount vs ₹36 COD charge = net saving regardless; positions it as a clear win for customer |
| ₹150–₹299 | ₹30 off | Meaningful enough to notice; affordable for brand |
| ₹300–₹499 (bundle) | ₹50 off | Strong enough to tip decision |
| ₹500+ (bundle) | ₹75 off | Significant; justifies push to prepaid |

**Copy note (for Sean/Casey):** Frame as "Pay with UPI, save ₹30" — not as a discount off retail price. Customers should see it as an immediate saving, not a future-redeemable voucher.

**Decision right:** The specific discount amounts are a pricing/margin decision requiring Patrick and Harley sign-off before checkout configuration. The above are inputs to that decision, not final numbers.

### 3.2 Post-Order WhatsApp Message for COD Orders

Every COD order should receive an automated WhatsApp message within 5 minutes of order placement. Evidence is clear: "If you send the confirmation message 12 hours after the order, the customer has already forgotten or lost interest. Within 5 minutes is the rule." (CampaignHQ D2C research, 2024)

**Three-message flow:**

**Message 1 (within 5 minutes of COD order):**
- Confirm order details (product name, delivery address, mobile number)
- Offer a UPI prepaid switch: "Pay now with UPI and save ₹30 — tap here: [UPI link]"
- Confirmation button: "Yes, confirm my order"

**Message 2 (day before expected delivery):**
- Delivery reminder with tracking link
- Confirm "I'll be available to receive" — creates commitment

**Message 3 (day of delivery, morning):**
- Estimated delivery window
- Contact number for rider
- Reschedule option

**Expected outcome:** WhatsApp COD confirmation reduces RTO from 28–35% to 18–22% in the first month (CampaignHQ data). Combined with other tactics, target is below 10%.

**Tech implementation:** Gupshup or MSG91 WhatsApp Business API (already in planned tech stack per CLAUDE.md). Cost: ₹0.50–₹1.50 per conversation. ROI vs. ₹200+ RTO cost is 60–100x positive.

Coordinate with Tony (customer support) to ensure NDR follow-up flows are also built in this same WhatsApp system.

### 3.3 Address Verification at Order Placement

**Tactic:** Before dispatch, for COD orders from first-time buyers, send an OTP or address confirmation request.

Evidence:
- Phone OTP verification reduces RTO by 34–41% without significant conversion drop (bepragma.ai)
- Address confirmation catches incomplete addresses responsible for 18–24% of all RTOs

**Implementation:** Shiprocket's Smart COD feature (available on Business plan and above) can automatically flag high-risk orders and trigger verification. Configure to:
- Require address OTP confirmation for all COD orders from new customers (first order ever with TPL)
- Flag COD orders above ₹500 for manual review if customer has no order history
- Block COD automatically for pin codes with >30% historical RTO rate (Shiprocket's NDR data feeds this)

### 3.4 Partial Prepayment for High-Risk Orders (Future Phase)

Some D2C brands in India require a token advance (₹99) for COD orders above a threshold. Evidence suggests this nearly eliminates RTO for orders where the customer commits even a small amount. This is a more friction-adding approach and is not recommended at launch (where acquiring customers is the priority). Consider implementing in Phase 6 if RTO remains above 12% after other tactics.

---

## 4. RTO Management: When It Happens

Despite best efforts, some RTO will occur. The process for handling returned shipments:

### 4.1 NDR (Non-Delivery Report) Response

When a shipment fails first delivery attempt, Shiprocket generates an NDR. **NDR management is critical — 60–70% of RTOs can be prevented at the NDR stage with rapid response.**

**NDR workflow:**
1. NDR generated by carrier (customer unavailable / address issue / refused)
2. Shiprocket auto-notifies via dashboard and email
3. TPL sends WhatsApp to customer immediately: "We tried to deliver your order today. Please confirm your address or reschedule: [link]"
4. If customer responds within 12 hours, coordinate re-delivery with carrier
5. If no response within 24 hours, initiate re-delivery attempt anyway (default carrier behavior)
6. If three attempts fail, initiate RTO

**Target:** Convert 50% of NDRs to successful delivery via active follow-up.

### 4.2 Returned Inventory Processing

When an RTO shipment arrives back at the Bengaluru origin:
1. Inspect for damage (product integrity)
2. If undamaged and re-sellable: restock to inventory
3. If damaged in transit: photograph and file Shiprocket insurance claim (if insured)
4. Log RTO with reason code in a simple spreadsheet (reason codes: address invalid, customer refused, customer unavailable ×3, fake address)
5. Flag customer mobile number for COD block on next order if "refused" is the reason code

### 4.3 COD Fraud Management

Patterns that indicate likely fraud / serial refusal:
- Same mobile number or address associated with multiple RTOs
- Orders placed late at night from Tier 3 pins with no prior order history
- Multiple orders placed in quick succession from same address (carting abuse)

**Action:** Maintain a rolling COD blacklist. Shiprocket's Smart COD feature can auto-flag based on historical NDR data. Supplement with manual entries from TPL's own RTO log.

---

## 5. Metrics to Track (COD Health Dashboard)

| Metric | Target | Escalation Trigger |
|--------|--------|-------------------|
| Overall RTO rate | < 10% | > 15% = escalate to Harley |
| COD RTO rate specifically | < 15% | > 25% = review COD policy |
| Prepaid order % | > 50% at 6 months | < 35% at 6 months = increase prepaid incentive |
| NDR conversion rate (NDR to successful delivery) | > 50% | < 30% = review NDR workflow |
| COD remittance float (days cash locked) | 8–10 days standard | > 12 days = activate Early COD |
| WhatsApp COD confirmation open rate | > 70% | < 40% = review message timing or template |

---

## 6. Recommended COD Policy at Launch

| Policy Element | Decision |
|---------------|---------|
| COD available | Yes — required for first-time buyer acquisition |
| COD minimum order value | ₹99 (prevents single-item ₹49 COD orders where logistics cost exceeds order value) |
| COD maximum order value | ₹1,999 (cap to limit exposure on high-value bundle orders where RTO loss is larger) |
| Free shipping threshold for prepaid | Recommend ₹499 (Patrick to confirm) |
| COD shipping fee to customer | Recommend passing through COD charge as small visible fee (₹30–₹40) to disincentivize COD without blocking it |
| WhatsApp confirmation required | Yes — all COD orders |
| Address OTP verification | Yes — first-time COD buyers |
| COD available for Zone E | Optional — consider prepaid-only for Northeast and J&K given high RTO + slow remittance |

**Note on COD fee pass-through:** Showing the COD charge as a visible line item at checkout ("COD handling fee: ₹30") performs two jobs — it recovers the cost and it nudges the customer toward prepaid. Multiple Indian D2C brands use this mechanic. This requires Patrick's pricing decision.

---

## 7. 90-Day COD Improvement Roadmap

| Week | Action | Expected Outcome |
|------|--------|----------------|
| Pre-launch (Phase 4) | Set up Shiprocket Smart COD + address verification | Foundation in place |
| Launch week | WhatsApp COD confirmation flow live (Gupshup/MSG91) | Immediate RTO intercept |
| Week 2–4 | Monitor first COD RTO events; identify reason codes | Baseline data |
| Month 2 | Analyse prepaid vs COD conversion data; adjust incentive amount if needed | Optimise incentive |
| Month 3 | Review COD blacklist; add NDR-flagged pins | Reduce fraud exposure |
| Month 3 | Festival season (if Oct–Dec): pre-book Delhivery capacity, extend delivery SLAs at checkout | Avoid SLA failures |
| 90-day review | Measure: prepaid %, RTO rate, NDR conversion. Report to Harley. | Data-driven policy update |

---

*Sources:*
- *bepragma.ai COD RTO analysis — https://www.bepragma.ai/blogs/getting-in-bed-with-cod-cash-on-delivery*
- *bepragma.ai RTO reduction strategies — https://www.bepragma.ai/blogs/how-to-reduce-rto-in-indian-e-commerce-without-hurting-cod-orders*
- *CampaignHQ WhatsApp COD confirmation — https://blog.campaignhq.co/cod-confirmation-whatsapp-reduce-rto*
- *Shiprocket Early COD — https://www.shiprocket.in/early-cod/*
- *Shiprocket COD charges support — https://support.shiprocket.in/support/solutions/articles/152000000168-how-to-check-the-applied-cod-charges-*
- *Shiprocket Instant COD FAQs — https://support.shiprocket.in/support/solutions/articles/152000000970-instant-cod-faqs*
- *Customer Insight Report (Weiss) — artifacts/phase-1/customer-insight-report.md*
