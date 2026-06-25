<!-- last-updated: 2026-03-15 -->
# Logistics & Fulfillment Baseline

| Field | Value |
|-------|-------|
| **Phase** | 1 — Audit |
| **Producing Agent** | Raj (Logistics & Fulfillment Lead) |
| **Date** | 2026-03-15 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## 1. Executive Summary

The Product Lab (TPL) is a Bengaluru-based small accessories brand shipping lapel pins, keychains, card stickers, fridge magnets, laptop stickers, and earrings. These are low-weight (under 100g per item, likely 50–200g per order), low-AOV (₹49–₹249 per item) products. The logistics challenge is not serviceability — it is economics. At these price points, every cost decision at the per-order level directly determines whether the business is profitable or not.

The single largest margin risk is COD-driven RTO. A COD order for a ₹149 sticker pack that is returned costs ₹180–240 in logistics alone, wiping out the entire product revenue. This is not a theoretical risk; it is a structural threat at TPL's current price point and likely order mix.

The recommended approach: use Shiprocket's aggregator platform on the Business plan, implement aggressive prepaid incentives from launch day, deploy WhatsApp COD confirmation within 5 minutes of every COD order, and hold the RTO rate below 10% through process discipline rather than expensive technology.

---

## 2. Current State Assessment

| Dimension | Current State | Assessment |
|-----------|--------------|------------|
| Shipping partner | Not confirmed. Likely manual dispatch via local courier or unstructured multi-courier | Not set up for D2C at scale |
| Platform | WooCommerce (migrating to Commerce.com / Fynd) | Shiprocket integrates with both |
| COD infrastructure | Not confirmed — no COD-specific system observed | Must be built before launch |
| Packaging | Unknown — no evidence of branded packaging | Must define before launch |
| Returns process | Terms & Conditions state 7-day return window (confirmed in T&C page, Nov 2024) | Policy exists but process unclear |
| Fulfillment location | Bengaluru (Bore Bank Road / Vasanth Nagar) | Single origin, manageable for Phase 1 |
| Volume | ₹0–40 lakh annual turnover; low order volume, likely under 200 orders/month | Low-volume plan is correct starting point |

### Key Challenges

1. **COD-to-RTO economics are punishing at this AOV.** At ₹149–₹249 product prices, a single RTO costs more than the product's revenue. COD management is not optional — it is survival infrastructure.
2. **Weight-based pricing creates a cost cliff.** Products cross from the 0–500g slab into 500g–1kg if items are combined carelessly. Packaging weight must be minimized.
3. **Thin catalog + low AOV = low average order value without bundling.** Shipping costs are nearly flat regardless of whether the customer buys one ₹149 item or three ₹249 items. Bundle mechanics are a logistics lever, not just a revenue lever.
4. **Festival season capacity risk.** Oct–Dec (Diwali, Raksha Bandhan) will be TPL's peak gifting season. Shiprocket volume surges cause pickup delays and RTO spikes during this period. Early capacity communication is required.
5. **Single pickup location.** All orders dispatch from Bengaluru. Zone D and E shipments (Northeast, J&K) will be disproportionately expensive per order.

---

## 3. Product-Specific Logistics Profile

| Product Type | Estimated Weight (item only) | Estimated Weight (packaged) | Notes |
|---|---|---|---|
| Lapel pin (single) | 5–15g | 30–50g | Poly mailer or rigid envelope sufficient |
| Keychain (single) | 20–40g | 50–80g | May need bubble cushioning for enamel/acrylic types |
| Card sticker | 3–8g | 20–30g | Flat; no cushioning needed; fits standard poly mailer |
| Fridge magnet | 15–40g | 40–70g | Needs thin foam/bubble layer to prevent surface scratching |
| Laptop sticker (sheet) | 5–20g | 25–40g | Flat; minimal packaging; fragile to moisture |
| Earrings | 5–20g | 35–60g | Needs card backing and protective envelope |
| **Typical single-item order** | 20–50g | **80–150g** | Comfortably within 0–500g slab |
| **Typical 2–3 item order** | 50–150g | **150–300g** | Still within 0–500g slab |
| **Bundle of 4–5 items** | 100–200g | **250–450g** | Approaches 500g ceiling; packaging weight is critical |

**Practical implication:** TPL's product profile is highly favorable for logistics — nearly all realistic single and multi-item orders will fall within the 0–500g weight slab. The most important packaging discipline is keeping packaging materials light (no unnecessary cardboard inserts, no thick boxes for pin orders).

---

## 4. Delivery SLA Targets by Zone

Based on Shiprocket's zone structure and standard carrier SLAs for a Bengaluru origin:

| Zone | Definition | Target Delivery | Realistic Range | Key Carrier |
|------|-----------|----------------|----------------|-------------|
| Zone A | Within Bengaluru city | 1–2 days | Same day to 2 days | Delhivery Surface, Shadowfax |
| Zone B | Within Karnataka | 2–3 days | 2–4 days | Delhivery Surface, DTDC |
| Zone C | Metro-to-metro (Mumbai, Delhi, Chennai, Kolkata, Hyderabad) | 2–3 days | 2–4 days | Delhivery, Ecom Express, BlueDart |
| Zone D | Rest of India (Tier 2, Tier 3, non-metro) | 4–6 days | 4–7 days | Delhivery, DTDC, Ecom Express |
| Zone E | Northeast states, J&K, Himachal Pradesh, Andaman | 7–10 days | 7–12 days | India Post fallback for unserviceable pins |

**Target:** 5-day average nationally. Metro customers (Zone A–C) should receive in 2–3 days. Tier 2 / Zone D in 5–6 days. Zone E in 7–10 days with transparent communication at checkout.

---

## 5. Pin Code Serviceability

Shiprocket aggregates 25+ courier partners and covers 19,000+ serviceable pin codes across India. Delhivery alone covers 18,500+ pin codes. The practical coverage gaps are:

- **Deep rural and tribal belt:** Small villages in states like Chhattisgarh, Odisha, interior MP, and parts of UP where no private courier operates
- **Northeast states:** Arunachal Pradesh, Manipur, Mizoram, Nagaland — serviceable but slow (7–12 days, higher rates)
- **J&K and Ladakh:** Limited private carrier coverage; surface-only in many areas
- **Island territories:** Andaman and Nicobar, Lakshadweep — India Post is often the only option

**Action required:** Enable Shiprocket's pin code serviceability check at checkout. Configure India Post as fallback carrier on Shiprocket for pin codes not serviced by Delhivery, DTDC, or Ecom Express. India Post's Speed Post covers all 19,101 post offices in India, making it the ultimate last-mile fallback.

**Known risk:** Approximately 1 in 3 pin codes have had delivery failures on some carriers (Shiprocket's own RADAR data). Using multi-carrier routing via Shiprocket's algorithm auto-selects the best carrier per pin code, reducing this risk significantly versus single-carrier.

---

## 6. Return and Exchange Policy Recommendation

**Recommended policy for TPL's low-AOV accessories business:**

Given the economics — products priced ₹49–₹249, logistics cost ₹50–₹150 per forward shipment, reverse shipment cost ₹60–₹100 — a full return-with-refund policy on all orders is financially unsustainable.

**Recommended policy:**

| Scenario | TPL Policy |
|----------|-----------|
| Damaged product on arrival | Full replacement dispatched within 3 business days. Customer sends photo evidence via WhatsApp. No return of damaged item required. |
| Wrong product dispatched | Replacement dispatched immediately. Customer keeps wrong item (the logistics cost of return exceeds item value). |
| Customer changed mind (prepaid) | No return accepted. Store credit only, valid 6 months. Communicate clearly at checkout. |
| Customer changed mind (COD) | Not accepted — order was confirmed at door. No return window post-delivery for preference changes. |
| Product defect (non-damage in transit) | Replacement or store credit at brand's discretion. Evaluate case by case. |
| Not delivered within SLA | Full refund or re-dispatch. |

**Legal note:** The Consumer Protection (E-Commerce) Rules, 2020 require a clearly stated return/exchange/refund policy on the website. This policy must be displayed at product page level and at checkout, not just in T&C. Current T&C states a 7-day return window — this should be revised to match the above policy before launch. Flag for Patrick (legal/commercial) and Harley for approval.

**Exchange-only approach:** Encourage exchanges over refunds by making exchange the primary CTA in any post-delivery support flow. A brand reducing refund requests by 66% after promoting exchanges as default was documented in Indian D2C research — the model is proven.

---

## 7. Key Risk Register

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| RTO rate exceeds 15% | High (industry average for COD is 28–35%) | Critical | WhatsApp COD confirmation + prepaid incentive + address verification |
| COD cash flow crunch | Medium | High | Standard remittance is D+8 to D+10. Plan cash flow for 10-day float. Use Early COD if needed. |
| Festival season shipping delays (Oct–Dec) | High | Medium | Book Delhivery/Ecom Express capacity early. Communicate extended SLAs at checkout during Oct–Dec. |
| Packaging weight pushing orders into higher slab | Low | Medium | Discipline: packaging total under 50g per order. No rigid cardboard boxes at launch phase. |
| Single carrier failure during volume spike | Medium | Medium | Shiprocket multi-carrier auto-routing protects against single carrier downtime |
| COD fraud (fake addresses, refusal at door) | Medium | High | WhatsApp confirmation + address OTP verification + COD blacklist for repeat-refusal addresses |
| Zone E / remote pin code failures | Low | Low | India Post fallback via Shiprocket. Customer communication at checkout for extended SLAs. |
| Shiprocket service degradation | Low | High | Maintain Shipway or NimbusPost as backup aggregator account. Do not be 100% dependent on one platform. |

---

## 8. Recommendations for Patrick (Cost Input)

For Patrick's margin model, use these per-order shipping cost benchmarks:

**Shipping cost input for margin calculations (Bengaluru origin, Shiprocket Business plan):**

| Zone | Weight Slab | Estimated Shipping Cost | COD Add-on | Total Logistics Cost (COD) |
|------|------------|------------------------|-----------|--------------------------|
| Zone A (intra-Bengaluru) | 0–500g | ₹35–₹45 | ₹26–₹36 | ₹61–₹81 |
| Zone C (metro-to-metro) | 0–500g | ₹50–₹70 | ₹26–₹36 | ₹76–₹106 |
| Zone D (Tier 2/3) | 0–500g | ₹65–₹90 | ₹26–₹36 | ₹91–₹126 |
| Zone E (remote) | 0–500g | ₹90–₹140 | ₹26–₹36 | ₹116–₹176 |
| Any zone (prepaid) | 0–500g | ₹35–₹90 | Nil | ₹35–₹90 |

**Assumptions flagged:**
- Rates based on Shiprocket Business plan (₹199/month) estimated average of ₹41/shipment for prepaid
- COD charge estimated at ₹26 flat or 2% of order value, whichever is higher (illustrative from Shiprocket support data; exact rate depends on courier selection)
- Packaging cost is additional (see packaging section in fulfillment-sop.md)
- RTO reverse logistics cost: ₹50–₹80 per returned shipment (charged by carrier)
- These are planning estimates. Actual rates confirmed only after Shiprocket account setup and rate calculator verification.

**Escalation trigger:** If actual shipping rates confirmed in Shiprocket account show costs materially above these estimates for the most common order profile (single item, Zone D, COD), this must be escalated to Patrick and Harley immediately, as it affects the viability of the current price range.

---

## 9. Commerce.com / Fynd + Shiprocket Integration

Shiprocket offers a native Commerce.com (Fynd) integration through its Commerce Hub. Key integration points:

- Auto-sync orders from Fynd Commerce to Shiprocket dashboard
- Multi-channel order aggregation (Fynd + Instagram Shopping + any other sales channel)
- AWB (Airway Bill) generation and label printing from Shiprocket
- Real-time tracking updates pushed back to Fynd storefront customer-facing tracking page
- COD order flagging and NDR (Non-Delivery Report) management through Shiprocket dashboard

**Action item for Tobi (Build Lead):** Confirm Shiprocket API compatibility with Commerce.com during Phase 4 build. Shiprocket has documented integrations with WooCommerce; Fynd integration may require webhook configuration. Request Shiprocket integration documentation during account setup.

---

## 10. Data Sources and Assumptions Log

| Claim | Source | Confidence |
|-------|--------|-----------|
| COD accounts for 50–60% of D2C orders | Market-Xcel India data via customer-insight-report.md | High |
| COD generates 76–83% of total RTO volume | bepragma.ai COD RTO analysis | High |
| COD RTO costs ₹180–240 in logistics per event | bepragma.ai + customer insight report | High |
| Shiprocket Business plan ₹199/month; average ₹41/shipment | Shiprocket pricing page (direct fetch, 2026-03-15) | High |
| Standard COD remittance D+8 to D+10 days | Shiprocket support knowledge base | High |
| COD charge: higher of flat ₹36 or 2.5% (illustrative) | Shiprocket support documentation | Medium — actual rate varies by courier |
| WhatsApp COD confirmation reduces RTO 30–40% | CampaignHQ D2C research | Medium (cited brands not named) |
| ₹50–₹100 prepaid discount converts 31–38% of COD orders | bepragma.ai RTO analysis | Medium |
| India Post Speed Post: ₹70–80 for 500g long distance | WareIQ India Post rate article | Medium (pre-Oct 2025 rates cited) |
| Zone E shipments 7–12 days | Shiprocket zone documentation | High |
| 1 in 3 pin codes have had delivery failures | Shiprocket RADAR blog | High (Shiprocket's own data) |
| Packaging materials: poly mailer ₹1.50–₹2, bubble mailer ₹5–₹12 | IndiaMart + packaging search | Medium |

---

*Related artifacts: shipping-partner-evaluation.md, cod-strategy.md, fulfillment-sop.md*
*Feed to: Patrick (margin model inputs in Section 8), Tony (customer support workflows for NDR/RTO), Tobi (Shiprocket-Fynd integration note in Section 9)*
