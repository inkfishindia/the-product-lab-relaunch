<!-- last-updated: 2026-03-15 -->
# Baseline Financials & Unit Economics

| Field | Value |
|-------|-------|
| **Phase** | 1 -- Audit |
| **Producing Agent** | Patrick (Finance & Pricing Lead) |
| **Date** | 2026-03-15 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## 1. Revenue Baseline

### 1.1 What We Know

The Product Lab is operated by Ink Fish, a sole proprietorship (GST: 29APFPH6495C1ZP) registered in Bengaluru. IndiaMart declares annual turnover at INR 0-40 lakh. Instagram shows 2,943 followers across 55 posts. No public customer reviews exist on any platform.

**Declared turnover range:** INR 0-40 lakh per annum.

For modeling purposes, I will use three revenue scenarios:

| Scenario | Annual Revenue | Monthly Revenue |
|----------|---------------|-----------------|
| Low | INR 2 lakh | INR 16,667 |
| Mid | INR 15 lakh | INR 1,25,000 |
| High | INR 40 lakh | INR 3,33,333 |

### 1.2 Implied Order Volume

Using the confirmed price range of INR 49-249 per item.

**Assumption:** Average items per order = 1.5 (conservative for this category). This gives an estimated Average Order Value (AOV) range of INR 74 to INR 374.

For modeling, I will use three AOV assumptions based on Indian price psychology clusters and the current catalog:

| AOV Assumption | Basis |
|----------------|-------|
| INR 149 | Single-item order at mid-range (1 pin or keychain) |
| INR 249 | 1-2 items or one higher-end product |
| INR 399 | Multi-item order or bundle purchase |

**Implied monthly orders at mid-revenue scenario (INR 1.25L/month):**

| AOV | Monthly Orders |
|-----|---------------|
| INR 149 | ~839 |
| INR 249 | ~502 |
| INR 399 | ~313 |

**Implied monthly orders at low-revenue scenario (INR 16,667/month):**

| AOV | Monthly Orders |
|-----|---------------|
| INR 149 | ~112 |
| INR 249 | ~67 |
| INR 399 | ~42 |

**Assessment:** Given the brand's minimal social footprint (under 3K Instagram followers, zero public reviews), the low-revenue scenario (INR 2-5 lakh annual) is the most likely current state. This implies roughly 2-5 orders per day at current AOV levels.

---

## 2. Cost Structure -- COGS Analysis

### 2.1 Manufacturing Costs (India)

These estimates are based on publicly available Indian manufacturer pricing from IndiaMart, TradeIndia, and Alibaba India for small-batch orders (100-500 unit MOQs typical for a brand this size).

| Product | Estimated COGS/unit | Basis |
|---------|-------------------|-------|
| Enamel lapel pins (soft enamel, 25-35mm) | INR 15-30 | IndiaMart listings: INR 12-40/piece at 200+ MOQ; smaller batches skew higher |
| Metal keychains (die-cast, enamel fill) | INR 20-40 | IndiaMart listings: INR 15-50/piece at 200+ MOQ |
| Card stickers (vinyl, printed) | INR 5-12 | Vinyl sticker printing: INR 3-15/piece depending on finish and quantity |
| Fridge magnets (metal, printed) | INR 10-25 | IndiaMart: INR 8-30/piece at 200+ MOQ |
| Laptop sticker packs | INR 8-15 | Vinyl sheet printing, die-cut: INR 5-20/piece |
| Earrings (metal, enamel) | INR 15-35 | IndiaMart: INR 10-40/piece at 200+ MOQ |

**Weighted average COGS estimate:** INR 18/unit (assumption: product mix skews toward pins and keychains, which are the confirmed hero categories).

**COGS as percentage of selling price:**

| Selling Price | COGS (INR 18) | COGS % |
|--------------|--------------|--------|
| INR 49 | INR 18 | 36.7% |
| INR 99 | INR 18 | 18.2% |
| INR 149 | INR 18 | 12.1% |
| INR 199 | INR 18 | 9.0% |
| INR 249 | INR 18 | 7.2% |

**Note:** At small batch sizes (under 200 units), COGS could be 30-50% higher. As volume scales, COGS drops. The INR 18 estimate assumes moderate batch sizes of 200-500 units per design.

### 2.2 Packaging Cost Per Order

| Component | Estimated Cost |
|-----------|---------------|
| Branded poly mailer or small box | INR 8-15 |
| Bubble wrap / protective padding | INR 3-5 |
| Thank-you card / insert | INR 2-4 |
| Sticker seal / tape | INR 1-2 |
| **Total packaging per order** | **INR 14-26** |

**Working estimate:** INR 18 per order (mid-range, includes basic branded packaging but not premium unboxing experience).

### 2.3 Shipping Cost

Based on Shiprocket published rates and Indian ecommerce courier aggregator pricing for lightweight shipments (under 500g, which covers all TPL products).

| Shipping Scenario | Cost per Shipment |
|-------------------|------------------|
| Shiprocket standard (0-500g, within zone) | INR 28-45 |
| Shiprocket standard (0-500g, inter-zone) | INR 45-75 |
| Speed Post / India Post (lightweight) | INR 35-55 |
| Delhivery / Ecom Express direct | INR 35-65 |

**Working estimate:** INR 50 per shipment (blended average across zones, using Shiprocket aggregated rates for a 0-500g package).

**Reverse shipping (RTO):** INR 50-70 per return (same weight class, return leg).

### 2.4 Payment Processing Fees

Based on Razorpay published pricing (standard plan, no custom negotiation at this volume):

| Payment Method | Fee |
|---------------|-----|
| UPI | 2% of transaction value |
| Debit cards (RuPay) | 2% |
| Debit cards (Visa/MC) | 2% |
| Credit cards (domestic) | 2% |
| Netbanking | 2% + INR 3 flat |
| Wallets (Paytm, PhonePe) | 2% |
| COD (via shipping partner) | INR 15-30 flat fee per order + 1.5-2% of order value on remittance |

**Note on Razorpay pricing:** As of 2025-2026, Razorpay charges 2% as standard across most methods for businesses on the standard plan. GST of 18% applies on the payment gateway fee itself. Effective rate = 2% x 1.18 = 2.36%.

**Working estimate:** 2.36% of order value for prepaid orders. For COD orders, add INR 20 flat + 1.75% remittance fee.

### 2.5 Platform Fees (Fynd Commerce.com)

Based on publicly available Fynd Commerce pricing:

| Plan | Monthly Fee | Transaction Fee |
|------|------------|----------------|
| Free / Starter | INR 0 | ~2% per transaction (may vary) |
| Growth | INR 999-2,499/month | Reduced transaction fee |
| Enterprise | Custom | Custom |

**Working estimate for TPL:** Free/Starter plan at launch. Platform transaction fee of approximately 1.5-2% on each order. This is an assumption that must be confirmed with Fynd directly.

**Combined platform + payment fee:** Approximately 4-4.5% of order value (Razorpay 2.36% + Fynd ~1.5-2%).

### 2.6 GST Impact

TPL's products fall under HSN codes for fashion/novelty accessories:

| Product Category | Likely HSN | GST Rate |
|-----------------|-----------|----------|
| Enamel pins / badges | 7117 (Imitation jewellery) or 8308 (clasps, buckles) | 12% or 18% |
| Keychains (metal) | 7326 or 8306 | 12% or 18% |
| Card stickers / laptop stickers | 4911 (Printed matter) | 12% |
| Fridge magnets | 8505 | 18% |
| Earrings (non-precious metal) | 7117 | 12% |

**Working assumption:** Blended GST rate of 12% across the product mix. GST is included in the MRP in India, so pricing must account for this.

**What this means:** If the MRP is INR 199, the GST-exclusive revenue is INR 199 / 1.12 = INR 177.68. The INR 21.32 goes to GST. All margin calculations below use GST-exclusive revenue.

---

## 3. Unit Economics Per Order

### 3.1 Contribution Margin Model -- Prepaid Orders

All figures in INR. Assumes single-item order with 1 unit shipped.

| Line Item | AOV 149 | AOV 249 | AOV 399 | AOV 799 |
|-----------|---------|---------|---------|---------|
| **Selling price (MRP)** | 149 | 249 | 399 | 799 |
| GST (12% inclusive) | (15.95) | (26.68) | (42.75) | (85.63) |
| **Net revenue** | 133.05 | 222.32 | 356.25 | 713.37 |
| COGS (weighted avg) | (18.00) | (25.00) | (35.00) | (55.00) |
| Packaging | (18.00) | (18.00) | (20.00) | (22.00) |
| Shipping (brand-paid if free shipping offered) | (50.00) | (50.00) | (50.00) | (50.00) |
| Payment gateway (2.36% of MRP) | (3.52) | (5.88) | (9.42) | (18.86) |
| Platform fee (1.75% of MRP) | (2.61) | (4.36) | (6.98) | (13.98) |
| **Contribution margin** | **40.92** | **119.08** | **234.85** | **553.53** |
| **Contribution margin %** | **27.5%** | **47.8%** | **58.9%** | **69.3%** |

**Note on COGS scaling:** At AOV 399 and 799, I assume multi-item orders (2-3 items), hence higher COGS. Packaging scales modestly.

### 3.2 Contribution Margin Model -- COD Orders

COD adds three cost layers:
1. **COD fee:** INR 20 flat per order + 1.75% of order value on remittance
2. **RTO rate:** 15-25% of COD orders are returned-to-origin (industry data for accessories category; Weiss's report cites 76-83% of all RTOs come from COD)
3. **RTO cost:** Forward shipping (wasted) + reverse shipping + repackaging = INR 100-140 per RTO

| Line Item | AOV 149 (COD) | AOV 249 (COD) | AOV 399 (COD) | AOV 799 (COD) |
|-----------|--------------|--------------|--------------|--------------|
| **Selling price (MRP)** | 149 | 249 | 399 | 799 |
| GST (12% inclusive) | (15.95) | (26.68) | (42.75) | (85.63) |
| **Net revenue** | 133.05 | 222.32 | 356.25 | 713.37 |
| COGS | (18.00) | (25.00) | (35.00) | (55.00) |
| Packaging | (18.00) | (18.00) | (20.00) | (22.00) |
| Shipping | (50.00) | (50.00) | (50.00) | (50.00) |
| COD fee (flat) | (20.00) | (20.00) | (20.00) | (20.00) |
| COD remittance fee (1.75%) | (2.61) | (4.36) | (6.98) | (13.98) |
| Platform fee (1.75%) | (2.61) | (4.36) | (6.98) | (13.98) |
| **Contribution margin (delivered)** | **21.83** | **99.92** | **217.29** | **538.41** |
| **Contribution margin % (delivered)** | **14.6%** | **40.1%** | **54.5%** | **67.4%** |

### 3.3 RTO-Adjusted COD Economics

Applying a 20% RTO rate to COD orders (conservative for accessories category):

For every 10 COD orders at AOV 149:
- 8 are delivered: 8 x INR 21.83 = INR 174.64
- 2 are RTO'd: 2 x INR 120 (forward + reverse shipping + repack) = INR (240.00)
- **Net from 10 COD orders at INR 149 AOV:** INR (65.36) -- a LOSS

For every 10 COD orders at AOV 249:
- 8 are delivered: 8 x INR 99.92 = INR 799.36
- 2 are RTO'd: 2 x INR 120 = INR (240.00)
- **Net from 10 COD orders at INR 249 AOV:** INR 559.36 -- thin but positive

For every 10 COD orders at AOV 399:
- 8 are delivered: 8 x INR 217.29 = INR 1,738.32
- 2 are RTO'd: 2 x INR 120 = INR (240.00)
- **Net from 10 COD orders at INR 399 AOV:** INR 1,498.32 -- healthy

**Critical finding:** COD orders at AOV below INR 200 are unprofitable after accounting for RTO rates. This is the single most important unit economics constraint for TPL's current pricing.

---

## 4. Shipping as a Percentage of Order Value

This is the structural problem for low-AOV Indian D2C brands.

| AOV | Shipping Cost | Shipping as % of AOV |
|-----|--------------|---------------------|
| INR 99 | INR 50 | 50.5% |
| INR 149 | INR 50 | 33.6% |
| INR 249 | INR 50 | 20.1% |
| INR 399 | INR 50 | 12.5% |
| INR 499 | INR 50 | 10.0% |
| INR 799 | INR 50 | 6.3% |
| INR 999 | INR 50 | 5.0% |

**Industry benchmark:** Shipping should be under 15% of AOV for a sustainable D2C business. This means TPL needs AOV above INR 350 to make free shipping viable.

**Competitor reference:** Dot Badges offers free delivery above INR 499. This is the market-set expectation.

**Recommendation:** Free shipping threshold at INR 499. Charge INR 49-69 shipping below this threshold. This incentivizes bundling and pushes AOV above the profitable zone.

---

## 5. Pricing Landscape Analysis

### 5.1 Where TPL Sits vs. Competitors

| Brand | Pins | Keychains | Stickers | Magnets | Positioning |
|-------|------|-----------|----------|---------|-------------|
| **TPL (current)** | INR 99-249 | INR 99-249 | INR 49-149 | INR 99-199 | Artist-led, unstructured |
| **Dot Badges** | INR 99-349 | -- | INR 69+ | INR 99+ | Volume, affordable, trend-chasing |
| **Chumbak** | -- | INR 283-795 | -- | INR 293-995 | Premium gifting, Indian cultural |
| **The Souled Store** | -- | INR 249-499 | INR 149-299 | -- | Pop culture mainstream |
| **Hamee India** | -- | -- | INR 99-299 | -- | Licensed IP, marketplace-native |

### 5.2 Pricing Power Assessment

**TPL's current pricing (INR 49-249) is at the bottom of the market.** This creates three problems:

1. **Margin compression:** At INR 49-99, shipping and fulfillment costs exceed the product's gross margin. Every single-item order at this price is a loss-maker after all costs.

2. **Brand perception:** Pricing below Dot Badges (INR 99-349) and well below Chumbak (INR 283-795) positions TPL as the cheapest option in a space where cheapest does not equal desirable. For a brand that claims artist-led positioning, the pricing undermines the brand promise.

3. **No pricing headroom for promotion:** If the everyday price is INR 99, there is no room to offer a meaningful discount without going below cost.

**White space identified:** INR 149-499 per item. Above Dot Badges' commodity pricing, below Chumbak's premium tier. This is where an artist-led brand with strong design identity and cultural resonance should sit.

### 5.3 Willingness-to-Pay Evidence

From Weiss's customer insight report:

- 68% of Indian Gen Z prioritize price at initial purchase -- but 80% would pay a premium if certain about quality (Bain/ShopFlo data)
- The INR 299-499 gifting band is the dominant "thoughtful but affordable" range
- 67% of Indian millennials are open to spending more on personalized gifts (Mintel)
- BCG (2024): Gen Z spends on items that enable self-expression and identity signaling

**Interpretation:** There is willingness to pay INR 199-499 for a single accessory if the design story, quality communication, and brand packaging justify it. The constraint is not price sensitivity -- it is value legibility. Customers will pay more if they can see and feel why.

---

## 6. Break-Even Analysis

### 6.1 Estimated Fixed Costs (Monthly)

| Cost | Monthly Estimate | Notes |
|------|-----------------|-------|
| Platform (Fynd Commerce.com) | INR 0-2,499 | Free tier to start |
| Domain + hosting | INR 500 | Approximate |
| Email/SMS tool | INR 0-1,000 | Free tier initially |
| Design tools (Canva Pro) | INR 500 | If needed |
| Accounting/GST filing | INR 1,500 | CA fees for sole proprietorship |
| Inventory holding / storage | INR 2,000-5,000 | Home/small warehouse |
| Misc (internet, phone, supplies) | INR 2,000 | |
| **Total fixed costs (lean)** | **INR 7,000-12,000** | |
| **Total fixed costs (moderate)** | **INR 15,000-25,000** | Adds paid tools, packaging upgrades |

**Note:** This excludes paid marketing spend, which is variable. Also excludes salary/founder draw -- this is a sole proprietorship where the owner's compensation comes from profit.

### 6.2 Break-Even Orders Per Month

Using moderate fixed costs of INR 20,000/month:

| AOV | Contribution Margin (prepaid) | Orders to Break Even | Orders to Break Even (assuming 50% COD) |
|-----|------------------------------|---------------------|----------------------------------------|
| INR 149 | INR 40.92 | 489 orders | Not viable (COD orders at this AOV are negative) |
| INR 249 | INR 119.08 | 168 orders | 224 orders (blended margin lower due to COD) |
| INR 399 | INR 234.85 | 85 orders | 98 orders |
| INR 799 | INR 553.53 | 36 orders | 40 orders |

**Assessment:** At the current AOV range (INR 149-249), TPL needs 168-489 orders/month just to cover fixed costs. This does not include any marketing spend, inventory investment, or founder compensation. The business is only viable at scale if AOV moves above INR 300.

### 6.3 Break-Even With Paid Acquisition

If TPL spends INR 50,000/month on paid ads:

| AOV | Contribution Margin (prepaid) | Orders Needed (fixed + ad spend) | Required Revenue |
|-----|------------------------------|--------------------------------|-----------------|
| INR 249 | INR 119.08 | 588 orders | INR 1,46,412 |
| INR 399 | INR 234.85 | 298 orders | INR 1,18,902 |
| INR 799 | INR 553.53 | 126 orders | INR 1,00,614 |

At a typical Indian D2C CAC of INR 200-400 for accessories, INR 50,000 in ad spend yields 125-250 acquired customers. This barely covers the break-even requirement at AOV 249, and is insufficient at AOV 149.

**Bottom line:** Paid acquisition is not viable until AOV is consistently above INR 350-400.

---

## 7. COD Economics -- Deep Dive

### 7.1 Expected COD Mix

Industry data for Indian D2C (ShopFlo, bepragma.ai):
- First-time buyers: 58-65% choose COD
- Repeat buyers: 25-35% choose COD
- Blended for a new brand with no trust signals: 50-60% COD expected

**Working assumption:** 55% COD at launch, declining to 40% over 6-12 months as brand trust builds.

### 7.2 COD Cash Flow Impact

COD creates a cash flow gap:

| Stage | Timeline |
|-------|---------|
| Order placed | Day 0 |
| Order shipped | Day 1-2 |
| Order delivered | Day 4-7 |
| Cash collected by courier | Day 4-7 |
| Remittance to brand | Day 10-15 (Shiprocket: typically T+7 to T+10 after delivery) |
| **Total cash cycle** | **10-15 days** |

For prepaid orders, cash is received instantly (Razorpay settlement: T+2 business days).

**At 55% COD and INR 1.25 lakh monthly revenue:**

- INR 68,750/month is tied up in COD cash cycle at any given time
- Approximately INR 23,000-34,000 is "in float" on any given day (not yet remitted)
- This creates working capital pressure for inventory replenishment

### 7.3 RTO Financial Impact

**RTO rate assumption:** 20% of COD orders (industry average for accessories; could be higher for an unknown brand).

At INR 1.25 lakh monthly revenue, 55% COD:
- COD orders: ~275 orders/month (at AOV 249)
- RTOs: ~55 orders/month
- Cost per RTO: INR 120 (forward shipping wasted + reverse shipping + repackaging labor)
- **Monthly RTO cost: INR 6,600**
- **As % of revenue: 5.3%**

This is a hidden margin killer that most small D2C brands do not account for.

### 7.4 COD Mitigation Strategies (to be detailed in Phase 2 guardrails)

- Offer prepaid discounts (INR 20-30 off for prepaid orders)
- Minimum order value for COD (INR 299+)
- COD confirmation via WhatsApp/SMS before shipping
- Partial prepaid (small advance on COD orders)
- Build trust signals to reduce COD preference over time

---

## 8. Key Financial Risks

### Risk 1: Margin Squeeze at Current AOV

**Severity: Critical**

At the current price range (INR 49-249), the all-in contribution margin after shipping, packaging, payment fees, platform fees, and GST is dangerously thin. A single-item order at INR 99 has a negative contribution margin after shipping. Even at INR 149, the margin is INR 41 (27.5%) -- barely enough to cover any marketing or overhead costs.

**Mitigation:** Increase AOV through bundles, collections, and free shipping thresholds. Consider repricing upward to INR 149-499 range.

### Risk 2: COD Dependency

**Severity: High**

With 55% COD expected at launch, the business faces: (a) cash flow delays of 10-15 days on over half of revenue, (b) 20% RTO rate eating INR 6,600+/month, (c) additional COD fees of INR 20+ per order. A new brand with no trust signals will struggle to shift customers to prepaid.

**Mitigation:** Implement prepaid incentives, COD confirmation flows, minimum COD order value, and invest heavily in building social proof before launch.

### Risk 3: Shipping Cost as Percentage of Order Value

**Severity: High**

At INR 50/shipment and current AOV of INR 149-249, shipping represents 20-34% of order value. This is 2-3x the sustainable threshold (under 15%). Free shipping at any order value below INR 400 is unprofitable.

**Mitigation:** Set free shipping threshold at INR 499. Charge INR 49-69 for orders below threshold. Design bundles and collections that naturally push AOV above INR 499.

### Risk 4: Paid Acquisition Is Not Yet Viable

**Severity: High**

At Indian D2C CACs of INR 200-400 for this category, the current contribution margins do not support profitable paid acquisition. A INR 250 CAC on an order with INR 41 contribution margin (AOV 149) means the brand loses INR 209 on every acquired customer. Even at AOV 399, a INR 250 CAC leaves only INR (15) negative contribution after acquisition cost if we include COD and RTO blended impact.

**Mitigation:** Do not launch paid acquisition until AOV is above INR 400 and prepaid ratio is above 50%. Focus on organic growth (Instagram, WhatsApp, word-of-mouth) for the first 3-6 months post-relaunch.

### Risk 5: No Pricing Headroom for Promotions

**Severity: Medium**

At INR 49-149 base prices, any discount of 15-20% pushes the product below cost when fulfillment is included. There is no room for festival discounting, flash sales, or acquisition offers without going margin-negative.

**Mitigation:** Reprice upward before launch to create promotional headroom. A product priced at INR 299 can absorb a 15% discount (sale price INR 254) and remain margin-positive.

### Risk 6: Festival Discounting Pressure

**Severity: Medium**

Indian consumers expect deep discounts during Diwali, Raksha Bandhan, and other festivals. Competitors like Bewakoof and The Souled Store run 30-50% off sales. TPL cannot match these discounts at current pricing without destroying margins.

**Mitigation:** Use festival drops and limited editions rather than price discounts. Create festival-specific bundles at full price rather than discounting existing products. Set absolute floor prices below which no product may be sold.

### Risk 7: Marketplace Price Parity

**Severity: Low-Medium**

Indian consumers compare prices across Flipkart, Amazon, and brand sites. If TPL sells on marketplaces, marketplace commissions (15-25%) will further compress margins. If TPL does not sell on marketplaces, it loses discoverability.

**Mitigation:** Price marketplace listings at MRP. Offer exclusive bundles, collections, or early access only on the brand site. Use marketplaces for discoverability, not margin.

---

## 9. Strategic Financial Recommendations

### 9.1 Reprice Upward Before Launch

The current INR 49-249 range is unsustainable for a D2C brand with shipping costs. The relaunch is the correct moment to reset pricing without customer expectation baggage. Recommended new price architecture:

| Tier | Price Range | Products | Purpose |
|------|-----------|----------|---------|
| Entry | INR 149-199 | Single stickers, small card stickers | Trial, low-barrier entry |
| Core | INR 249-399 | Pins, keychains, earrings, magnets | Primary purchase range |
| Premium | INR 499-799 | Bundles, curated sets, limited editions | AOV driver, gifting |
| Collection | INR 999-1,499 | Multi-item gift boxes, artist collaborations | Gifting, high-AOV anchor |

This positions TPL above Dot Badges (commodity) and below Chumbak (premium), directly in the white space identified by Maria's competitive analysis.

### 9.2 Design for AOV Above INR 499

Every commercial decision -- collection structure, product page layout, cart upsells, free shipping threshold -- should be oriented toward pushing AOV above INR 499. At this AOV:
- Shipping is 10% of order value (sustainable)
- Contribution margin is INR 200+ per order (healthy)
- Free shipping becomes viable
- Paid acquisition math starts to work

### 9.3 Build Toward a 60%+ Prepaid Mix

Target: 60% prepaid orders within 6 months of relaunch. Tactics:
- Prepaid discount of INR 20-30
- UPI as default payment option (friction-free)
- Trust signals on product pages (reviews, Instagram embeds, creator stories)
- WhatsApp order confirmation to reduce COD anxiety

### 9.4 Do Not Spend on Paid Acquisition Until Unit Economics Are Positive

Paid acquisition should not begin until:
- AOV is consistently above INR 400
- Prepaid ratio exceeds 50%
- Blended contribution margin (including COD and RTO costs) exceeds INR 150/order
- At least 100 customer reviews exist on the site

### 9.5 Target Metrics for Relaunch

| Metric | Target | Rationale |
|--------|--------|-----------|
| AOV | INR 450+ | Above free shipping threshold; margins work |
| Contribution margin % (prepaid) | 55%+ | Covers overhead and acquisition at scale |
| Contribution margin % (blended) | 45%+ | Accounts for COD and RTO drag |
| Prepaid order ratio | 55%+ by month 3 | Reduces cash flow risk and RTO costs |
| Monthly orders (month 1) | 100+ | Validates market demand |
| Monthly orders (month 6) | 500+ | Supports fixed cost base and small ad spend |
| RTO rate | Under 15% | Industry-best for accessories COD |
| CAC (when ads start) | Under INR 200 | Viable at INR 450 AOV |

---

## 10. Data Gaps and Assumptions Log

| Item | Status | Impact | Action Required |
|------|--------|--------|----------------|
| Actual current revenue | Unknown (INR 0-40L declared) | High -- all volume estimates are ranges | Request from Dan: Woo Commerce order history export |
| Actual product-level COGS | Estimated from market data | Medium -- could be 30% off in either direction | Request from Dan: supplier invoices or per-unit costs |
| Fynd Commerce.com transaction fees | Estimated at 1.5-2% | Medium -- affects margin by INR 2-8/order | Confirm with Fynd during platform setup |
| Actual shipping rates (Shiprocket) | Estimated from published rates | Medium -- volume discounts may apply | Request from Raj: Shiprocket rate card once account is set up |
| Current COD/prepaid split | Industry estimate (55% COD) | High -- drives margin and cash flow models | Request from Dan: payment method breakdown from WooCommerce |
| Current RTO rate | Industry estimate (20%) | High -- drives COD profitability model | Request from Dan: return/RTO data from shipping partner |
| Actual order frequency / customer data | None available | High -- repeat purchase rate affects LTV entirely | Request from Dan: customer order history |
| GST classification of products | Estimated (12% blended) | Medium -- could be 18% for some items | Confirm with CA: HSN codes for each product type |

---

## 11. Summary for Harley

**The Product Lab's current financial position is pre-viable.** The business has been operating at very low volume (likely 2-5 orders/day) at price points (INR 49-249) where unit economics do not work after accounting for shipping, COD fees, RTO costs, and payment processing.

**Three things must change before relaunch:**

1. **Pricing must move up.** The INR 49-249 range cannot sustain a D2C business with Indian shipping costs. The relaunch should reset pricing to INR 149-799, with a core range of INR 249-399 per item.

2. **AOV must be engineered above INR 499.** Through bundles, collections, and a free shipping threshold at INR 499, the business must ensure the average order generates enough margin to cover fulfillment and contribute to overhead.

3. **COD must be managed, not accepted.** Every COD order below INR 200 loses money. Prepaid incentives, COD minimums, and trust-building must be part of the relaunch plan from day one.

**Without these changes, paid acquisition is not economically viable, and organic growth alone at current margins will not sustain the business.**

These findings will feed directly into the Phase 2 pricing strategy, margin analysis, and promotional guardrails documents.

---

*All cost estimates are based on publicly available data from Shiprocket, Razorpay, IndiaMart, and industry reports. Assumptions are flagged in Section 10. This document should be updated with actual cost data from Dan as it becomes available.*
