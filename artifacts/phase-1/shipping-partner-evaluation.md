<!-- last-updated: 2026-03-15 -->
# Shipping Partner Evaluation

| Field | Value |
|-------|-------|
| **Phase** | 1 — Audit |
| **Producing Agent** | Raj (Logistics & Fulfillment Lead) |
| **Date** | 2026-03-15 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## 1. Evaluation Framework

TPL's logistics requirements at Phase 1 launch:

- Origin: Bengaluru, Karnataka
- Product profile: 0–500g per order (small accessories)
- Volume: Estimated under 200 orders/month at launch
- COD: Required (expected 50–60% of orders)
- Price sensitivity: High. Per-order shipping cost directly impacts margin on ₹149–₹249 products
- Technology: Needs to integrate with Commerce.com (Fynd) and Razorpay
- Management capacity: Single operator / small team. Minimal manual work preferred.

Partners evaluated: Shiprocket (aggregator), Delhivery (direct), BlueDart, DTDC, Ecom Express, India Post.

---

## 2. Partner Profiles

### 2.1 Shiprocket (Aggregator — Primary Recommendation)

**Type:** Multi-carrier aggregator platform
**Network:** 25+ courier partners accessible through one dashboard
**Pin codes:** 19,000+ (aggregated across all partner carriers)

**Plan structure (as of 2026-03-15):**

| Plan | Monthly Fee | Avg. Shipment Cost | Best For |
|------|------------|-------------------|---------|
| Lite | Free | ~₹45 | Under 5 orders/month |
| Business | ₹199/month | ~₹41 | Launch phase (up to ~500/month) |
| Advanced | ₹499/month | ~₹39 | 500–1,000 orders/month |
| Pro | ₹799/month | ~₹36 | 1,000–3,000 orders/month |

Source: Shiprocket pricing page (fetched 2026-03-15).

**COD handling:** COD charge = higher of (flat fee approx. ₹26–₹36) or (2–2.5% of order value). Exact rate depends on courier partner selected per shipment. COD remittance standard cycle: D+8 to D+10 days (8–10 days after delivery confirmation). Early COD plan available: remittance within D+2 for a fee. Instant COD: 70% of COD amount within 24 hours of shipment at up to 5% fee.

**Carriers accessible via Shiprocket (relevant for TPL):**

| Carrier | Strength | Typical Use via Shiprocket |
|---------|---------|--------------------------|
| Delhivery | Widest coverage, best for Tier 2/3 | Default for most Zone D shipments |
| Ecom Express | Strong Tier 2/3, now owned by Delhivery | Now merged into Delhivery network post-April 2025 |
| DTDC | Broad but variable quality | Budget fallback for Zone D |
| Xpressbees | Strong in South India, fast metro | Zone A/B/C shipments |
| Shadowfax | Same-day/next-day Bengaluru | Zone A same-day requirement |
| India Post (Speed Post) | Deep rural, lowest cost | Zone E and unserviceable remote pins |
| BlueDart | Premium speed, guaranteed SLA | High-value urgent shipments only |

**Integration:** Shiprocket has documented WooCommerce integration (current stack). Fynd/Commerce.com integration via API available — requires verification in Phase 4. Razorpay COD reconciliation compatible.

**Strengths for TPL:**
- Single dashboard for all shipping management; appropriate for a small team
- Auto-selects cheapest carrier per shipment by zone and weight
- NDR (Non-Delivery Report) automation built-in
- Smart COD features (address verification, COD blocking for flagged pins)
- Plan refund model: if Business plan seller hits 100 shipments in a month, monthly fee is refunded
- Branded tracking page included on Business plan and above

**Weaknesses / Risks:**
- Rate transparency: final per-shipment rate only visible in dashboard after login; published averages are illustrative
- Service quality depends on underlying carrier; Shiprocket's own SLAs do not override carrier failures
- Dispute resolution with carriers routed through Shiprocket, adding a layer of friction
- Festival season (Oct–Dec): Shiprocket-wide volume spikes slow pickup scheduling

**Verdict: Recommended as primary platform for launch.** Low commitment (₹199/month), covers all carriers, appropriate for sub-500-order/month volume. Re-evaluate at 500 shipments/month for direct Delhivery contract.

---

### 2.2 Delhivery (Direct Contract — Future Option)

**Type:** Direct carrier
**Network:** 18,500+ pin codes, 35 states, pan-India
**Acquired:** Ecom Express in April 2025 — combined network now the largest in Indian logistics

**Rate structure (approximate, without negotiated contract):**
- Intra-city (Zone A): ₹35–₹45 for 0–500g
- Metro-to-metro (Zone C): ₹55–₹75 for 0–500g
- Rest of India (Zone D): ₹65–₹95 for 0–500g
- Remote (Zone E): ₹90–₹140 for 0–500g

Source: GoodSeva courier charges guide + aggregated comparison data (2025).

**COD:** Available. COD charge approximately 2% of invoice value. Remittance cycle 5–7 days direct (faster than via Shiprocket aggregation layer).

**Strengths:**
- Directly negotiated rates at 300–500+ shipments/month can be 15–20% below aggregator rates
- Faster COD remittance when direct (5–7 days vs D+8–10 via aggregator)
- Best-in-class tracking and NDR management tools for direct customers
- Largest pin code coverage in India post-Ecom Express acquisition

**Weaknesses for TPL at launch:**
- Direct contract setup requires minimum volume commitment (typically 100–300 shipments/month)
- Separate dashboard and label system to manage; no auto-rate comparison
- Less flexibility to switch carriers if Delhivery performance degrades in a specific zone

**Verdict: Pursue direct Delhivery contract when TPL reaches 300+ shipments/month consistently.** Until then, access Delhivery through Shiprocket aggregator.

---

### 2.3 BlueDart

**Type:** Premium express carrier (DHL group)
**Network:** 35,000+ pin codes; strongest in metros
**Rate for 500g domestic (approximate):** ₹120–₹180 for metro-to-metro; ₹150–₹250 for national

**Assessment:** BlueDart is premium-positioned and priced. For TPL's ₹149–₹249 products, using BlueDart as a standard carrier would make shipping costs exceed product value on most orders. It is inapplicable as a general carrier.

**Appropriate use case for TPL:** High-value gift orders above ₹799 AOV (future bundle pricing), or B2B bulk orders where speed and assured SLA are justified. Even then, cost must be verified.

**Verdict: Not recommended for launch or standard D2C operations. Re-evaluate if AOV increases significantly via bundles or premium product lines.**

---

### 2.4 DTDC

**Type:** Direct carrier with franchise network
**Network:** 17,000+ pin codes
**Rate for 500g (approximate):**
- Lite tier: ₹40–₹100
- Plus tier: ₹60–₹150
- Prime tier: ₹80–₹250

Source: ClickPost DTDC charges guide.

**COD:** Available, charge approximately 1.5–2% of invoice value.

**Assessment:** DTDC is a legacy carrier with franchised last-mile agents. Quality is inconsistent — metro delivery is reasonable but Tier 2/3 handling is variable. Not a preferred primary carrier. However, DTDC is accessible via Shiprocket and may be auto-selected on routes where it offers the lowest rate.

**Verdict: Available through Shiprocket as fallback carrier. Not recommended as primary. Allow Shiprocket's algorithm to select DTDC only when it offers price advantage with acceptable SLA.**

---

### 2.5 India Post (Speed Post)

**Type:** Government postal service
**Network:** 19,101 post offices; largest delivery network in India by pin code coverage
**Rate for domestic Speed Post (as of post-Oct 2025 revision):**
- Local (same city): ₹15–₹30 for up to 500g
- Long distance (2,000+ km): ₹70–₹110 for up to 500g

Source: WareIQ India Post courier charges guide + Shiprocket Speed Post article.

**COD:** Available via India Post (known as "Value Payable" service). Remittance cycle is slow (10–21 days depending on region). COD fraud risk is higher due to limited tracking.

**Assessment:** India Post is the only carrier that can deliver to the deepest rural pin codes and remote northeastern areas. Speed is low (7–15 days), tracking is minimal, and COD is operationally complex. It is a coverage necessity, not a service differentiator.

**Verdict: Use as fallback-only carrier for pin codes unserviceable by private carriers. Accessible via Shiprocket. Do not offer as customer-facing choice — assign automatically as last resort. Consider disabling COD for India Post orders given remittance complexity and fraud risk.**

---

## 3. Rate Comparison Table: 0–500g Shipment, Bengaluru Origin

| Carrier | Intra-city (Zone A) | Metro-to-Metro (Zone C) | Tier 2/3 (Zone D) | Remote (Zone E) | COD Add-on |
|---------|-------------------|------------------------|------------------|----------------|-----------|
| Delhivery (via Shiprocket) | ₹35–₹45 | ₹55–₹70 | ₹65–₹90 | ₹90–₹130 | ₹26–₹36 |
| DTDC (via Shiprocket) | ₹40–₹60 | ₹60–₹80 | ₹70–₹100 | ₹95–₹140 | ₹25–₹35 |
| Xpressbees (via Shiprocket) | ₹35–₹45 | ₹55–₹70 | ₹70–₹95 | N/A (limited coverage) | ₹26–₹36 |
| BlueDart (via Shiprocket) | ₹80–₹100 | ₹120–₹160 | ₹150–₹200 | ₹180–₹250 | ₹40–₹60 |
| India Post Speed Post | ₹20–₹35 | ₹50–₹75 | ₹60–₹90 | ₹70–₹110 | Slow/complex |

**Important:** These are market-referenced estimates for planning purposes. Actual rates are confirmed only by using Shiprocket's rate calculator with the specific origin (560046 or 560051), destination pin, and weight. Rates are subject to revision by carriers and may differ with Shiprocket plan tier. All rates exclude fuel surcharges (typically 8–15% added by carriers).

**Assumption flagged:** Fuel surcharge is not reflected in the figures above. At 10% surcharge, a ₹70 Zone D shipment becomes ₹77 effective. Patrick should apply a 10% fuel surcharge buffer to all shipping cost estimates.

---

## 4. Recommendation Summary

| Decision | Recommendation | Rationale |
|----------|---------------|-----------|
| Primary platform | Shiprocket Business plan (₹199/month) | Multi-carrier, low commitment, appropriate for launch volume |
| Primary carrier | Delhivery (auto-selected via Shiprocket) | Widest network, consistent Tier 2/3 performance, best NDR tooling |
| Secondary carrier | Xpressbees / DTDC | Auto-selected by Shiprocket for specific routes where competitive |
| Premium/express | BlueDart via Shiprocket | Available as customer-paid upgrade option only; not default |
| Remote fallback | India Post Speed Post via Shiprocket | For Zone E and rural unserviceable pins only |
| Direct contract timing | When TPL reaches 300 shipments/month | Pursue direct Delhivery contract at that milestone for 15–20% savings |

---

## 5. Next Steps and Action Items

| Action | Owner | Timing |
|--------|-------|--------|
| Create Shiprocket Business plan account | Dan / ops | Before launch (Phase 4) |
| Verify Fynd-Shiprocket integration method | Tobi | Phase 4 build |
| Run rate calculator for top 10 destination pin codes to validate estimates | Raj / Dan | Phase 4 setup |
| Configure India Post as fallback carrier for unserviceable pins | Tobi / Raj | Phase 4 |
| Set COD charge pass-through rules in Shiprocket (decide: absorb or pass to customer) | Patrick + Harley | Phase 2 decision |
| Monitor Shiprocket service quality monthly post-launch | Raj | Phase 6 |

---

*Sources:*
- *Shiprocket pricing page — https://www.shiprocket.in/pricing/*
- *Shiprocket shipping zones — https://www.shiprocket.in/blog/shipping-zones-india-explained/*
- *Delhivery-Ecom Express acquisition — https://www.shipyaari.com/blogs/ecom-express-vs-competitors-choosing-the-right-logistics-partner-for-your-e-commerce-business/*
- *ILS Portal rate comparison — https://ilsportal.io/blogs/delivery-courier-shipping-charges-india*
- *WareIQ India Post rates — https://wareiq.com/resources/blogs/india-post-courier-charges/*
- *GoodSeva courier charges — https://www.goodseva.com/blog/top-10-cheapest-courier-services-india/*
- *ClickPost DTDC charges — https://www.clickpost.ai/blog/dtdc-courier-charges*
