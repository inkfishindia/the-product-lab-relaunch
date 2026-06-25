<!-- last-updated: 2026-03-15 -->
# Pricing Framework

| Field | Value |
|-------|-------|
| **Phase** | 2 — Brand Strategy |
| **Producing Agent** | Patrick (Finance & Pricing Lead) |
| **Date** | 2026-03-15 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## 1. Financial Assessment -- Current State

The Product Lab is priced to fail. My Phase 1 baseline financials established the core problem: at the current price range of INR 49-249, every single-item COD order below INR 200 loses money after shipping, packaging, COD fees, and RTO costs. The business has been operating at INR 0-40 lakh annual revenue with an estimated 2-5 orders per day -- volume that cannot sustain even minimal fixed costs at these margins.

The relaunch is the right moment to reset pricing. There is no customer expectation to manage -- the brand has under 3,000 Instagram followers, zero public reviews, and no established price anchors in the market. This is a greenfield pricing opportunity.

**Three constraints drive every pricing decision below:**

1. **Shipping floor:** INR 50/order average (Raj, logistics-baseline.md). This is a near-fixed cost regardless of order value. At INR 149 AOV, shipping is 33.6% of revenue. At INR 499, it drops to 10%. Every pricing decision must push AOV above INR 499.

2. **COD tax:** COD adds INR 26-36 flat plus 2-2.5% of order value per delivered order, and 20% of COD orders never deliver (RTO). Each RTO costs INR 120-180 in wasted logistics. COD orders below INR 250 are structurally unprofitable.

3. **Brand permission to price up:** Heyward's positioning -- "Small objects. Big opinions." -- explicitly rejects commodity positioning. The enemy is generic, not expensive. The white space between Dot Badges (INR 99-349, no brand story) and Chumbak (INR 283-995, premium gifting) is open. Weiss's evidence confirms 80% of target customers will pay a premium if they understand why.

---

## 2. Cost Structure Summary

All margin calculations in this document use the following cost inputs. These are the same figures from my Phase 1 baseline, updated with Raj's confirmed shipping data.

### 2.1 Per-Unit COGS

| Product Type | COGS/Unit | Basis |
|---|---|---|
| Card stickers (vinyl, printed) | INR 8 | IndiaMart: INR 5-12 at 200+ MOQ; using mid-point |
| Enamel lapel pins (25-35mm) | INR 22 | IndiaMart: INR 15-30 at 200+ MOQ |
| Metal keychains (die-cast, enamel) | INR 28 | IndiaMart: INR 20-40 at 200+ MOQ |
| Fridge magnets (metal, printed) | INR 18 | IndiaMart: INR 10-25 at 200+ MOQ |
| Earrings (metal, enamel) | INR 22 | IndiaMart: INR 15-35 at 200+ MOQ |
| Laptop sticker packs | INR 12 | IndiaMart: INR 8-15 at 200+ MOQ |

**Assumption flagged:** These are estimates from publicly available manufacturer pricing at 200-500 unit MOQs. Actual COGS may be 20-30% higher at smaller batch sizes or lower at larger volumes. Dan should provide actual supplier invoices to refine.

### 2.2 Per-Order Fixed Costs

| Cost Component | Amount | Source |
|---|---|---|
| Packaging (poly mailer, bubble wrap, insert, seal) | INR 18 | Phase 1 estimate; mid-range branded |
| Shipping -- prepaid (blended average, 0-500g) | INR 50 | Raj: Shiprocket Business plan average |
| Shipping -- COD (blended average, 0-500g) | INR 76 | Raj: INR 50 shipping + INR 26 COD flat fee |
| Payment gateway -- prepaid (Razorpay 2% + 18% GST) | 2.36% of MRP | Razorpay standard plan |
| Payment gateway -- COD remittance | 1.75-2.5% of order value | Shiprocket/courier remittance fee |
| Platform fee (Fynd Commerce) | 1.75% of MRP | Estimated; confirm with Fynd |
| GST (included in MRP) | 12% of MRP | Blended rate across product mix |

### 2.3 Per-Order Variable Costs

| Cost Component | Amount | Trigger |
|---|---|---|
| RTO cost (forward + reverse shipping + repack) | INR 130 | Per RTO event; 20% of COD orders |
| Gift-ready packaging upgrade | INR 15-25 | Bundle orders flagged as gifts |
| Drop/limited edition packaging premium | INR 10 | Special packaging for drop products |

---

## 3. Individual Product Pricing by Tier

### 3.1 Price Architecture Overview

| Tier | Price Range | Role | Products |
|---|---|---|---|
| Entry | INR 149-199 | Trial, impulse, add-on | Card stickers (individual), laptop stickers (individual) |
| Core | INR 249-299 | Primary purchase range | Attitude keychains, original lapel pins, earrings, fridge magnets |
| Premium | INR 349 | Limited edition, artist drops | Drop pins, artist collaboration items |
| Bundle | INR 399-999 | AOV driver, gifting | All 5 bundles from Jenna's hierarchy |

**Why these specific numbers:** Indian price psychology clusters at INR 149, 199, 249, 299, 349, 399, 499, 699, 999. Every price in this framework lands on or just below one of these thresholds. No price ends in an arbitrary number.

### 3.2 Hero Product Pricing

#### Hero 1: Card Stickers

| Item | Recommended Price | Current Price | Change | Rationale |
|---|---|---|---|---|
| Card sticker (individual, half card) | INR 149 | INR 49-99 (est.) | +50-100 | Entry price point; impulse trial; no competitor offers this product. Unique = pricing power. |
| Card sticker (individual, full card) | INR 199 | INR 99-149 (est.) | +50-100 | Full-card variant commands slight premium due to material and perceived value |
| Card sticker 3-pack | INR 399 | N/A (new bundle) | New | "Two Cards, One Statement" bundle. INR 133/sticker vs INR 149-199 individual. 25-33% perceived savings. Pushes AOV toward free shipping. |

**Unit economics -- individual card sticker at INR 149 (prepaid):**

| Line | Amount |
|---|---|
| MRP | 149.00 |
| GST (12% inclusive) | (15.95) |
| Net revenue | 133.05 |
| COGS | (8.00) |
| Packaging | (18.00) |
| Shipping | (50.00) |
| Payment (2.36%) | (3.52) |
| Platform (1.75%) | (2.61) |
| **Contribution margin** | **50.92** |
| **Contribution margin %** | **34.2%** |

At INR 149, a prepaid card sticker order is marginally profitable. This is acceptable as the entry/trial product -- its job is to introduce the brand, not generate maximum margin. The margin improves dramatically in bundles and multi-item orders because shipping and packaging costs are shared.

**Unit economics -- card sticker 3-pack at INR 399 (prepaid):**

| Line | Amount |
|---|---|
| MRP | 399.00 |
| GST (12% inclusive) | (42.75) |
| Net revenue | 356.25 |
| COGS (3 stickers at INR 8) | (24.00) |
| Packaging | (20.00) |
| Shipping | (50.00) |
| Payment (2.36%) | (9.42) |
| Platform (1.75%) | (6.98) |
| **Contribution margin** | **245.85** |
| **Contribution margin %** | **61.6%** |

This is healthy. The 3-pack is where card sticker economics actually work.

#### Hero 2: Attitude / "No Filter" Collection

| Item | Recommended Price | Current Price | Change | Rationale |
|---|---|---|---|---|
| Attitude keychain ("Bullshit Remover," "Idiot Repellent," etc.) | INR 249 | INR 149-199 (est.) | +50-100 | Core price point. Attitude franchise carries brand premium. Sits above Dot Badges (INR 99-199) and below Chumbak keychains (INR 283-795). |
| Attitude fridge magnet ("Enjoy the ShitShow") | INR 199 | INR 109-149 (est.) | +50-90 | Support product. Slightly lower than keychain because magnets are not wearable/portable (lower identity-signaling value). |
| Attitude earrings ("Enjoy the ShitShow") | INR 249 | Unknown | -- | Matches keychain pricing. Wearable = same identity signal value. |

**Unit economics -- attitude keychain at INR 249 (prepaid):**

| Line | Amount |
|---|---|
| MRP | 249.00 |
| GST (12% inclusive) | (26.68) |
| Net revenue | 222.32 |
| COGS | (28.00) |
| Packaging | (18.00) |
| Shipping | (50.00) |
| Payment (2.36%) | (5.88) |
| Platform (1.75%) | (4.36) |
| **Contribution margin** | **116.08** |
| **Contribution margin %** | **46.6%** |

**Unit economics -- attitude keychain at INR 249 (COD, delivered):**

| Line | Amount |
|---|---|
| MRP | 249.00 |
| GST (12% inclusive) | (26.68) |
| Net revenue | 222.32 |
| COGS | (28.00) |
| Packaging | (18.00) |
| Shipping | (50.00) |
| COD flat fee | (26.00) |
| COD remittance (2%) | (4.98) |
| Platform (1.75%) | (4.36) |
| **Contribution margin (delivered)** | **90.98** |
| **Contribution margin %** | **36.5%** |

**RTO-adjusted COD economics (20% RTO rate):** For every 10 COD orders at INR 249: 8 delivered at INR 90.98 = INR 727.84. 2 RTO'd at INR 130 cost = (INR 260.00). Net = INR 467.84. Effective margin per COD order = INR 46.78 (18.8%). Thin but positive.

#### Hero 3: Original-Design Lapel Pins

| Item | Recommended Price | Current Price | Change | Rationale |
|---|---|---|---|---|
| Original lapel pin (permanent collection) | INR 249 | INR 149-199 (est.) | +50-100 | Core collectible. Same tier as keychains. Collector segment values design, not metal weight. |
| Original lapel pin (limited drop) | INR 299 | N/A (new format) | New | Drop premium of INR 50 over permanent pins. Scarcity justifies the premium. Micro-Collector segment expects to pay more for limited items. |
| Artist collaboration pin (limited drop) | INR 349 | N/A (new format) | New | Named artist + limited quantity + 72-hour window. The highest individual-item price in the catalog. |

**Unit economics -- drop pin at INR 299 (prepaid):**

| Line | Amount |
|---|---|
| MRP | 299.00 |
| GST (12% inclusive) | (32.04) |
| Net revenue | 266.96 |
| COGS (premium enamel, small batch 75-100 units) | (30.00) |
| Packaging (drop-specific insert) | (28.00) |
| Shipping | (50.00) |
| Payment (2.36%) | (7.06) |
| Platform (1.75%) | (5.23) |
| **Contribution margin** | **146.67** |
| **Contribution margin %** | **49.1%** |

The drop premium more than covers the higher COGS of small-batch production and premium packaging.

### 3.3 Support Product Pricing

| Product | Recommended Price | Rationale |
|---|---|---|
| Identity/interest keychains (non-attitude, original design) | INR 199 | Below attitude keychains. No brand voice premium. Still above Dot Badges. |
| Fridge magnets (original design, non-attitude) | INR 199 | Matches non-attitude keychains. Home product, lower identity signal. |
| Laptop stickers (individual) | INR 199 | Single sticker; entry/trial price. Add-on product. |
| Laptop sticker pack (3-5 stickers) | INR 499 | AOV-driving pack. INR 100-166 per sticker in pack vs INR 199 individual. |
| Earrings (original design, non-attitude) | INR 249 | Wearable = higher identity signal = higher price tolerance. |
| 3D pop-up stickers | INR 199 | Placeholder; confirm product details with Andy before finalizing. |

### 3.4 Filler Product Pricing

| Product | Recommended Price | Rationale |
|---|---|---|
| Licensed IP products (all formats) | INR 149-199 | Do not reprice upward. These products have no pricing power because identical or better versions exist from competitors. Keep at accessible price for long-tail search traffic. Do not invest in promoting. |

**Note:** I am not recommending pricing licensed IP below INR 149. Even filler products must clear the minimum profitable order threshold. At INR 149, a prepaid order generates INR 51 contribution margin -- barely positive but not a loss. Below INR 149, every order loses money.

---

## 4. Bundle Pricing

Bundles are the primary mechanism for pushing AOV above INR 499. Every bundle must be priced to deliver three things simultaneously: (a) positive unit economics after all costs, (b) perceived value to the customer versus buying items individually, and (c) AOV at or above the free shipping threshold.

### 4.1 Bundle Economics -- Detailed

#### Bundle 1: "The Opinion Starter Pack" -- INR 499

| Component | COGS |
|---|---|
| 1x attitude keychain | 28.00 |
| 1x original lapel pin | 22.00 |
| 1x card sticker | 8.00 |
| **Total COGS** | **58.00** |

| Line | Prepaid | COD (delivered) |
|---|---|---|
| MRP | 499.00 | 499.00 |
| GST (12% inclusive) | (53.46) | (53.46) |
| Net revenue | 445.54 | 445.54 |
| COGS | (58.00) | (58.00) |
| Packaging | (22.00) | (22.00) |
| Shipping | (50.00) | (50.00) |
| Payment/COD fees | (20.38) | (35.96) |
| Platform (1.75%) | (8.73) | (8.73) |
| **Contribution margin** | **286.43** | **270.85** |
| **Contribution margin %** | **57.4%** | **54.3%** |

**Individual price of components:** INR 249 (keychain) + INR 249 (pin) + INR 149 (card sticker) = INR 647.
**Bundle savings:** INR 148 off (22.9% perceived discount).
**Customer story:** "Three ways to say what you are actually thinking." Three different product formats, one attitude. This is the self-purchase bundle for The Loud Whisper.

#### Bundle 2: "The Birthday Box" -- INR 699

| Component | COGS |
|---|---|
| 2x original lapel pins | 44.00 |
| 1x attitude keychain | 28.00 |
| 1x card sticker | 8.00 |
| Gift packaging upgrade | 20.00 |
| **Total COGS** | **100.00** |

| Line | Prepaid | COD (delivered) |
|---|---|---|
| MRP | 699.00 | 699.00 |
| GST (12% inclusive) | (74.89) | (74.89) |
| Net revenue | 624.11 | 624.11 |
| COGS | (100.00) | (100.00) |
| Packaging | (0 -- included in COGS above) | (0) |
| Shipping | (50.00) | (50.00) |
| Payment/COD fees | (28.72) | (45.47) |
| Platform (1.75%) | (12.23) | (12.23) |
| **Contribution margin** | **433.16** | **416.41** |
| **Contribution margin %** | **62.0%** | **59.6%** |

**Individual price of components:** INR 249 + 249 + 249 + 149 = INR 896.
**Bundle savings:** INR 197 off (22.0% perceived discount).
**Customer story:** "For the friend who has everything except something this specific." Gift-ready packaging makes this a complete gifting solution -- The Thoughtful Gifter does not need to wrap or supplement.

#### Bundle 3: "The Pin Set" (Drop-Specific) -- INR 999

| Component | COGS |
|---|---|
| 5x limited-edition drop pins | 150.00 |
| Drop packaging (branded box/insert) | 30.00 |
| **Total COGS** | **180.00** |

| Line | Prepaid | COD (delivered) |
|---|---|---|
| MRP | 999.00 | 999.00 |
| GST (12% inclusive) | (107.04) | (107.04) |
| Net revenue | 891.96 | 891.96 |
| COGS | (180.00) | (180.00) |
| Packaging | (0 -- included above) | (0) |
| Shipping | (50.00) | (50.00) |
| Payment/COD fees | (40.71) | (55.93) |
| Platform (1.75%) | (17.48) | (17.48) |
| **Contribution margin** | **603.77** | **588.55** |
| **Contribution margin %** | **60.4%** | **58.9%** |

**Individual price of components:** INR 299 x 5 = INR 1,495.
**Bundle savings:** INR 496 off (33.2% perceived discount).
**Customer story:** "The whole drop. All at once. Before it is gone." The Micro-Collector who wants completeness. The perceived savings is INR 496 -- nearly the cost of two extra pins -- which is a strong incentive to buy the set rather than cherry-pick.

**Note on drop COGS:** Drop pins are produced in small batches (75-100 units per design). COGS at INR 30/pin is higher than the INR 22 for permanent collection pins. This is factored in.

#### Bundle 4: "Two Cards, One Statement" (Card Sticker 3-Pack) -- INR 399

| Component | COGS |
|---|---|
| 3x card stickers | 24.00 |
| **Total COGS** | **24.00** |

| Line | Prepaid | COD (delivered) |
|---|---|---|
| MRP | 399.00 | 399.00 |
| GST (12% inclusive) | (42.75) | (42.75) |
| Net revenue | 356.25 | 356.25 |
| COGS | (24.00) | (24.00) |
| Packaging | (18.00) | (18.00) |
| Shipping | (50.00) | (50.00) |
| Payment/COD fees | (16.26) | (33.93) |
| Platform (1.75%) | (6.98) | (6.98) |
| **Contribution margin** | **241.01** | **223.34** |
| **Contribution margin %** | **60.4%** | **56.0%** |

**Individual price of 3 stickers:** INR 149 x 3 = INR 447 (half-card) or INR 199 x 3 = INR 597 (full-card).
**Bundle savings:** INR 48-198 off depending on variant mix.
**At INR 399, this bundle sits just below the INR 499 free shipping threshold.** This is intentional. The customer who buys this bundle sees "Add INR 100 more for free shipping" -- a natural upsell to a INR 149 card sticker or INR 199 magnet add-on, pushing total AOV to INR 499-599.

#### Bundle 5: "The Rakhi Bundle" (Festival -- August Activation) -- INR 599

| Component | COGS |
|---|---|
| 1x attitude keychain | 28.00 |
| 1x original lapel pin | 22.00 |
| 1x card sticker | 8.00 |
| Rakhi packaging | 25.00 |
| **Total COGS** | **83.00** |

| Line | Prepaid | COD (delivered) |
|---|---|---|
| MRP | 599.00 | 599.00 |
| GST (12% inclusive) | (64.18) | (64.18) |
| Net revenue | 534.82 | 534.82 |
| COGS | (83.00) | (83.00) |
| Packaging | (0 -- included above) | (0) |
| Shipping | (50.00) | (50.00) |
| Payment/COD fees | (24.53) | (41.47) |
| Platform (1.75%) | (10.48) | (10.48) |
| **Contribution margin** | **366.81** | **349.87** |
| **Contribution margin %** | **61.2%** | **58.4%** |

**Individual price of components:** INR 249 + 249 + 149 = INR 647 (without special packaging).
**Bundle savings:** INR 48 off (7.4%) -- but the real value proposition is the festival-ready packaging that makes it a complete gift. The Thoughtful Gifter is paying INR 599 for a finished gift that arrives ready to give. The comparison is not against buying three items individually -- it is against spending INR 300-500 at a generic gift shop.

### 4.2 Bundle Summary Table

| Bundle | Price | COGS | CM (Prepaid) | CM% | Individual Value | Perceived Savings |
|---|---|---|---|---|---|---|
| Opinion Starter Pack | 499 | 58 | 286 | 57.4% | 647 | 22.9% |
| Birthday Box | 699 | 100 | 433 | 62.0% | 896 | 22.0% |
| Pin Set (Drop) | 999 | 180 | 604 | 60.4% | 1,495 | 33.2% |
| Two Cards, One Statement | 399 | 24 | 241 | 60.4% | 447-597 | 11-33% |
| Rakhi Bundle | 599 | 83 | 367 | 61.2% | 647 | 7.4% |

**All bundles deliver 57-62% contribution margin on prepaid orders.** This is well above the 45% blended target established in Phase 1. The bundle pricing structure works.

---

## 5. Drop / Limited Edition Pricing

### 5.1 Should Drops Be Priced Higher?

Yes. The data supports a 20-40% premium on limited-edition drops over permanent collection equivalents.

**Evidence:**
- Weiss: "Limited-edition drops have become essential strategies for capturing Gen Z's attention" (BCG data). Scarcity is expected to carry a price premium in this audience.
- The drop format carries higher costs: smaller batch sizes (75-100 units vs 200-500), premium packaging, artist collaboration fees (if applicable), and 72-hour sale window management.
- The Micro-Collector segment is the least price-sensitive of the three segments. Collectors value completeness and scarcity over price.

**Drop pricing structure:**

| Item | Price | vs. Permanent Collection |
|---|---|---|
| Single drop pin | INR 299 | +20% over INR 249 permanent pin |
| Artist collaboration pin | INR 349 | +40% over INR 249 permanent pin |
| Full drop set (5 pins) | INR 999 | 33% discount vs 5x individual |
| Limited-edition card sticker (seasonal/festival) | INR 249 | +25-67% over INR 149-199 permanent sticker |

**Margin impact:** Drop pins at INR 299 with COGS of INR 30 (small-batch premium) deliver INR 147 contribution margin per unit on prepaid -- 49.1% margin. This is lower than the 62% on bundles but higher than any single-item permanent product. The lower margin is acceptable because drops serve three strategic purposes beyond unit economics: (a) Instagram content creation, (b) repeat-visit behavior in Micro-Collectors, and (c) sold-out signals that build brand desirability.

### 5.2 Drop Financial Model (Monthly)

Assumptions: 5 designs per drop, 75 units each, 50% sell-through in 72 hours, remaining 25% sell over following 4 weeks. 25% remain unsold (inventory risk).

| Line | Calculation | Amount |
|---|---|---|
| Units produced | 5 designs x 75 units | 375 |
| Units sold (75%) | 375 x 0.75 | 281 |
| Revenue (individual pins at INR 299) | 225 x 299 | 67,275 |
| Revenue (full sets at INR 999) | ~11 sets x 999 | 10,989 |
| **Total drop revenue** | | **78,264** |
| Production cost | 375 x 30 | (11,250) |
| Packaging (drop-specific) | 281 x 28 | (7,868) |
| Shipping | 225 + 11 = 236 orders x 50 | (11,800) |
| Payment/platform fees (4.11%) | 78,264 x 0.0411 | (3,217) |
| GST liability (12% inclusive) | 78,264 / 1.12 x 0.12 | (8,385) |
| Unsold inventory (25%) | 94 units x 30 | (2,820) |
| **Net contribution from monthly drop** | | **32,924** |

This assumes 75% sell-through. At 100% sell-through (the goal once the pattern is established), the unsold inventory line goes to zero and contribution rises to approximately INR 35,744/month. Over 12 months: INR 395,000-429,000 in contribution from drops alone.

---

## 6. Promotional Guardrails

### 6.1 Maximum Discount Rules

| Discount Type | Maximum | Floor Price | Duration | Who Approves |
|---|---|---|---|---|
| First-purchase incentive | 10% off first order | No product below INR 134 (from INR 149 entry) | Evergreen | Patrick |
| Prepaid discount | INR 30 flat off (not percentage) | N/A -- flat amount | Evergreen | Patrick |
| Festival sale (Diwali, Raksha Bandhan) | 15% off, applied to bundles only | No bundle below INR 339 (from INR 399) | 5 days maximum | Harley |
| Flash sale (clearing slow movers) | 20% off | No product below INR 119 | 48 hours maximum | Patrick |
| Bulk/gifting (10+ units) | 15% off | No unit below INR 127 | Case-by-case | Harley |
| Influencer/gifting codes | Free product (up to INR 499 value) | N/A | Per campaign | Nik + Patrick |

### 6.2 Absolute Floor Prices

No product may be sold below these prices under any discount, promotion, or sale event. These floor prices ensure every order remains contribution-positive after shipping and fulfillment costs on prepaid orders.

| Product | MRP | Floor Price | Max Discount from MRP |
|---|---|---|---|
| Card sticker (individual) | 149 | 119 | 20.1% |
| Attitude keychain | 249 | 199 | 20.1% |
| Original lapel pin | 249 | 199 | 20.1% |
| Drop pin | 299 | 269 | 10.0% |
| Fridge magnet | 199 | 159 | 20.1% |
| Earrings | 249 | 199 | 20.1% |
| Opinion Starter Pack | 499 | 399 | 20.0% |
| Birthday Box | 699 | 559 | 20.0% |
| Pin Set (Drop) | 999 | 899 | 10.0% |

**Rule: Drop/limited-edition products are never discounted more than 10%.** Scarcity and discounting are contradictory signals. A "limited edition" product at 30% off tells the customer it was not actually limited or desirable.

### 6.3 First-Purchase Incentive (Replacing "Scientist" 15% Code)

The current "scientist" promo code offering 15% off needs to be replaced. At old prices (INR 49-249), a 15% discount pushed products below cost. At new prices, 15% is still too aggressive as a blanket discount.

**Recommendation:** Replace with a tiered first-purchase offer:

| Offer | Condition | Effective Discount |
|---|---|---|
| INR 50 off your first order | Minimum order INR 399 | 12.5% at INR 399 AOV |
| INR 75 off your first order | Minimum order INR 599 | 12.5% at INR 599 AOV |
| INR 100 off your first order | Minimum order INR 799 | 12.5% at INR 799 AOV |

This structure: (a) caps the discount at a flat rupee amount rather than a percentage (protects low-price items), (b) incentivizes higher AOV (the bigger the order, the bigger the discount), and (c) keeps effective discount rate at 12.5% across all tiers -- below the 15% of the old code.

**Implementation:** Single code (e.g., "FIRSTOPINION") that auto-applies the appropriate tier based on cart value. Show the discount ladder on the cart page: "You are getting INR 50 off. Add INR 200 more to get INR 75 off."

### 6.4 Prepaid Discount

**INR 30 off for prepaid orders.** Flat amount, not percentage.

Rationale: INR 30 is enough to nudge price-sensitive customers toward UPI/card payment without materially eroding margins. At AOV 499, this is a 6% discount -- modest but visible. The COD cost savings (INR 26-36 flat fee + RTO risk) far exceeds the INR 30 discount cost.

**Math:** A COD order at INR 499 costs INR 26 flat + INR 10 remittance (2%) = INR 36 more than prepaid, plus 20% RTO risk (expected cost of INR 26 per order). Total expected COD cost premium: INR 62 per order. The INR 30 prepaid discount saves the business INR 32 net per order shifted from COD to prepaid.

### 6.5 Festival Pricing Rules

| Rule | Detail |
|---|---|
| Festival discounts apply to bundles only, not individual products | Protects per-unit pricing; bundles already have built-in discount |
| Maximum 15% off bundles during festivals | Floor prices enforced per Section 6.2 |
| Festival drops are priced at premium (INR 349), not discounted | Scarcity + festival exclusivity = premium, not sale |
| Festival bundles can be created with festival-specific packaging at same or higher price | Value comes from packaging and curation, not discount |
| No festival discount lasts longer than 5 days | Prevents margin erosion from extended sales |
| No stacking of festival discount with first-purchase or prepaid discounts | One discount per order, maximum |

**Alternative to discounting during festivals:** Create festival-exclusive bundles (like the Rakhi Bundle at INR 599) that feel special because of packaging and curation, not because of a lower price. Heyward's positioning is clear -- the enemy is generic, not expensive. Festival drops at premium prices with special packaging are more on-brand than 30% off stickers.

### 6.6 COD Minimum Order Value

**Minimum order for COD: INR 299.**

Rationale: COD orders below INR 250 are unprofitable even when delivered (Phase 1, Section 3.3). At INR 299 COD minimum:
- Contribution margin on delivered COD order at INR 299: approximately INR 95.
- After 20% RTO rate applied: effective margin approximately INR 50 per order.
- This is thin but not negative.

**Implementation:** At checkout, if cart total is below INR 299 and customer selects COD, show: "COD is available on orders above INR 299. Pay online and get INR 30 off." This serves double duty -- sets the COD floor and pushes toward prepaid.

---

## 7. Free Shipping Strategy

### 7.1 Free Shipping Threshold: INR 499

**Confirmed.** This aligns with:
- Dot Badges' free delivery threshold (INR 499) -- market parity
- Jenna's bundle pricing (INR 499-999 -- all bundles at or above threshold)
- Patrick's Phase 1 analysis: shipping is 10% of AOV at INR 499, which is at the sustainable benchmark

### 7.2 Shipping Charge Below Threshold

**INR 59 flat for orders below INR 499.**

Why INR 59:
- Covers approximately INR 50 blended shipping cost plus a small buffer
- Psychologically sits below INR 69 (which feels like paying nearly INR 70 for shipping on a INR 149 item)
- Creates a strong incentive to add one more item to reach INR 499: "Add INR 100 more for FREE shipping" is more compelling than "Add INR 100 to save INR 49"

### 7.3 Shipping Charge Revenue Model

At current estimated volume (low scenario), approximately 40% of orders may be below INR 499 (single-item purchases). For these orders:

| Scenario | Orders Below 499/month | Shipping Revenue | Shipping Cost | Net |
|---|---|---|---|---|
| Low volume (50 orders/month) | 20 orders | 20 x 59 = 1,180 | 20 x 50 = 1,000 | +180 |
| Moderate volume (200 orders/month) | 80 orders | 80 x 59 = 4,720 | 80 x 50 = 4,000 | +720 |

Shipping charges on sub-threshold orders are approximately cost-neutral. The real financial benefit is behavioral -- pushing customers toward INR 499+ orders where margins are strong.

---

## 8. Margin Targets by Channel

### 8.1 D2C (Fynd Store) -- Primary Channel

| Metric | Target | Basis |
|---|---|---|
| Gross margin (after COGS, before fulfillment) | 85-90% | Low COGS products; material cost is INR 8-30 on INR 149-349 selling prices |
| Contribution margin (prepaid, after all costs) | 50-62% | Modeled above for each product and bundle |
| Contribution margin (COD delivered, after all costs) | 36-59% | Modeled above; varies by AOV |
| Contribution margin (blended, after RTO adjustment) | 45%+ | Target from Phase 1; achievable at AOV 499+ |
| Operating margin (after fixed costs, before marketing) | 30-40% | At 200+ orders/month |

### 8.2 Marketplace (Amazon/Flipkart) -- If Applicable

| Metric | Target | Basis |
|---|---|---|
| Marketplace commission | 15-25% of selling price | Amazon India standard for accessories |
| Fulfillment by marketplace (FBA/FK) | INR 30-60 additional | Per-item fulfillment fee |
| Contribution margin (marketplace) | 20-35% | Significantly lower than D2C due to commissions |

**Pricing rule for marketplace:** List at MRP. No discounts specific to marketplace. The brand site must always be the best-value option. Marketplace serves as a discoverability channel, not a profit center.

**Exclusive to brand site:** All bundles, drop products, and limited editions should be brand-site exclusive. This gives customers a reason to visit theproductlab.in directly rather than buying through Amazon.

### 8.3 Gifting / B2B (Future)

Not viable at current scale (per Heyward: revisit at INR 50L+ annual revenue). If pursued:

| Metric | Target |
|---|---|
| Minimum order | 25 units |
| Bulk discount | 15% off MRP (floor prices still apply) |
| Custom packaging surcharge | INR 15-25 per unit additional |
| Target contribution margin | 35%+ after bulk discount |

---

## 9. Price Architecture Visualization

### 9.1 The Price Ladder

```
INR 999  |  The Pin Set (5 drop pins)
         |  Collection tier -- Micro-Collector anchor
         |
INR 699  |  The Birthday Box (2 pins + keychain + card sticker + gift packaging)
         |  Gifting tier -- Thoughtful Gifter anchor
         |
INR 599  |  The Rakhi Bundle (keychain + pin + card sticker + festival packaging)
         |  Festival gifting tier
         |
INR 499  |  The Opinion Starter Pack (keychain + pin + card sticker)
         |  ---- FREE SHIPPING THRESHOLD ----
         |  Laptop sticker pack (3-5 stickers)
         |
INR 399  |  Two Cards, One Statement (3 card stickers)
         |  Just below free shipping -- drives add-on purchase
         |
INR 349  |  Artist collaboration pin (limited drop)
         |
INR 299  |  Drop pin (limited edition)
         |  ---- COD MINIMUM THRESHOLD ----
         |
INR 249  |  Attitude keychain | Original lapel pin | Earrings
         |  CORE PRICE POINT -- primary purchase
         |
INR 199  |  Fridge magnet | Identity keychain | Laptop sticker | Card sticker (full card)
         |  Support/add-on price point
         |
INR 149  |  Card sticker (half card)
         |  ENTRY PRICE POINT -- impulse trial
         |
         |  ---- NOTHING BELOW INR 149 ----
```

### 9.2 Competitive Price Map

| Price Point | TPL (Proposed) | Dot Badges | Chumbak | The Souled Store |
|---|---|---|---|---|
| Under INR 149 | Nothing | Pins INR 99+ | Nothing | Nothing |
| INR 149-199 | Card stickers, support items | Pins/badges INR 149-199 | -- | Stickers INR 149-299 |
| INR 249-299 | Core keychains, pins, earrings | Pins INR 249-349 | Keychains INR 283-395 | Keychains INR 249-499 |
| INR 349-399 | Drop pins, card sticker 3-pack | -- | Keychains/magnets INR 395-595 | -- |
| INR 499-699 | Bundles | -- | Magnets/gifts INR 495-795 | -- |
| INR 999+ | Pin Set (drop) | -- | Gift sets INR 795-995 | -- |

**TPL's position:** Priced above Dot Badges (which has no brand story and competes on price) and overlapping with the lower end of Chumbak (which has a warm/cultural identity very different from TPL's attitude voice). The INR 249-399 core range is where TPL has the most competitive room -- above commodity, below premium gifting, with a brand voice that neither competitor can claim.

---

## 10. Unit Economics Summary

### 10.1 Target Metrics

| Metric | Target | When |
|---|---|---|
| AOV | INR 499+ | By month 2 post-relaunch |
| Contribution margin (prepaid) | 55%+ | Immediate at recommended prices |
| Contribution margin (blended incl. COD + RTO) | 45%+ | By month 3 (as prepaid ratio improves) |
| Prepaid order ratio | 45% at launch, 60% by month 6 | Progressive |
| RTO rate (COD) | Under 15% | With WhatsApp confirmation flow |
| CAC (when paid ads start) | Under INR 200 | Not before month 4 |
| LTV:CAC ratio | 3:1 minimum | After 12 months of data |
| Monthly break-even orders | 85-100 (at AOV 499, blended margin) | Fixed costs INR 20K |

### 10.2 LTV Model (Estimated)

| Assumption | Value | Basis |
|---|---|---|
| Average first order | INR 499 | Driven by bundles and free shipping threshold |
| Repeat purchase rate (12 months) | 25% | Conservative for accessories; Micro-Collectors higher |
| Average repeat orders in year 1 | 1.5 | 25% buy 2x, 10% buy 3x, rest buy 1x |
| Average repeat order value | INR 399 | Repeat buyers more likely to buy individual items |
| Gross LTV (year 1) | INR 499 + (0.25 x 1.5 x 399) = INR 649 | Blended across all segments |
| Contribution margin on LTV | INR 649 x 0.45 = INR 292 | At 45% blended margin |
| **LTV (contribution)** | **INR 292** | Conservative; increases with drops and community |

**Implication for CAC:** At INR 292 LTV, maximum allowable CAC for 3:1 LTV:CAC ratio is INR 97. At 2:1 ratio (acceptable for a growing brand): INR 146. This constrains paid acquisition spend significantly. Organic channels (Instagram, WhatsApp, word-of-mouth) must carry the growth load for the first 6 months.

**Micro-Collector segment LTV is higher:** A collector buying one drop per month at INR 299-999 generates INR 3,588-11,988 in year-1 revenue. Even 20 active collectors at INR 5,000 average annual spend = INR 100,000 from 20 customers. This segment justifies disproportionate investment in the drop framework and Instagram community building.

### 10.3 Payback Period

| Scenario | CAC | First-Order CM | Payback |
|---|---|---|---|
| Organic acquisition (CAC ~INR 0) | 0 | INR 250 (at AOV 499, blended) | Immediate |
| Low-cost paid (Instagram, INR 100 CAC) | 100 | INR 250 | Immediate (INR 150 surplus) |
| Standard paid (INR 200 CAC) | 200 | INR 250 | Immediate (INR 50 surplus) |
| High-cost paid (INR 300 CAC) | 300 | INR 250 | Requires repeat purchase to break even |

**Rule: Do not run paid acquisition at CAC above INR 200 until repeat purchase rate is validated.** At INR 200 CAC and INR 250 first-order contribution, the business is barely first-order profitable. Repeat purchases are required to justify the acquisition cost.

---

## 11. Risks and Sensitivity Analysis

### 11.1 Sensitivity to AOV

| AOV | Blended CM (45% prepaid, 55% COD, 20% RTO on COD) | Monthly Orders for INR 20K Break-Even |
|---|---|---|
| INR 299 | ~INR 85 | 235 orders |
| INR 399 | ~INR 145 | 138 orders |
| INR 499 | ~INR 205 | 98 orders |
| INR 699 | ~INR 310 | 65 orders |

**If AOV stays below INR 399, the business requires 138+ orders/month just to break even on fixed costs -- before any marketing spend.** Bundles and the free shipping threshold are not optional AOV levers; they are structural requirements.

### 11.2 Sensitivity to COD Ratio

| COD Ratio | Blended CM at AOV 499 | Impact vs. 45% Prepaid Baseline |
|---|---|---|
| 30% COD / 70% prepaid | INR 225 | +9.8% better |
| 45% COD / 55% prepaid | INR 205 (baseline) | -- |
| 55% COD / 45% prepaid | INR 190 | -7.3% worse |
| 70% COD / 30% prepaid | INR 170 | -17.1% worse |

**Every 10 percentage points of COD ratio shift costs approximately INR 15-20 per order in blended margin.** The prepaid discount and COD minimum order value are essential margin protection mechanisms.

### 11.3 Sensitivity to RTO Rate

| RTO Rate (COD orders) | Blended CM at AOV 499 | Monthly RTO Cost (200 orders/month, 55% COD) |
|---|---|---|
| 10% | INR 218 | INR 1,430 |
| 15% | INR 211 | INR 2,145 |
| 20% (baseline) | INR 205 | INR 2,860 |
| 30% | INR 191 | INR 4,290 |

**RTO rate above 25% is an escalation trigger.** At 30% RTO, the monthly cost at moderate volume is INR 4,290 -- more than 20% of the INR 20K fixed cost base. WhatsApp COD confirmation (which Raj estimates reduces RTO by 30-40%) is not optional; it is margin infrastructure.

### 11.4 Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Customers reject price increase (INR 49-249 to INR 149-349) | Low | Medium | No existing customer base to alienate. Brand relaunch resets expectations. Heyward's positioning supports premium. |
| AOV stays below INR 399 despite bundles | Medium | Critical | Monitor weekly. If AOV below INR 399 after month 1, adjust free shipping threshold to INR 399 and create lower-priced bundles at INR 349. |
| COD ratio exceeds 60% at launch | High | High | Aggressive prepaid incentives. UPI as default. WhatsApp confirmation. COD minimum INR 299. |
| RTO rate exceeds 25% | Medium | High | WhatsApp COD confirmation within 5 minutes. Address verification. Blacklist repeat-refusal addresses. |
| Dot Badges undercuts on price | Medium | Low | TPL does not compete on price. The positioning is attitude and originality, not affordability. If Dot Badges sells pins at INR 99, TPL sells opinions at INR 249. Different value proposition. |
| Festival discounting pressure erodes brand | High | Medium | Floor prices enforced. Festival drops at premium, not discounted. Bundles with special packaging instead of percentage-off sales. |
| Drop products do not sell through | Medium | Medium | Start with 75 units per design (low risk). Unsold inventory at INR 30 COGS per unit is INR 2,250 per drop -- manageable. Reduce quantities if sell-through below 50%. |

---

## 12. Decisions for Dan (Escalation Items)

The following pricing decisions require Dan's approval before implementation:

| Decision | Patrick's Recommendation | Why Dan Decides |
|---|---|---|
| Minimum product price INR 149 (no product below this) | Recommended | Sets the brand's price floor; signals market positioning |
| Core price point INR 249 for keychains and pins | Recommended | Primary revenue driver; must feel right for the brand |
| Drop pin pricing at INR 299-349 | Recommended | New format; no market validation yet |
| First-purchase code replacing "scientist" 15% | Tiered INR 50/75/100 off with minimum order | Changes the acquisition offer |
| COD minimum INR 299 | Recommended | May reduce order volume from price-sensitive COD buyers |
| Free shipping at INR 499 | Recommended | Matches Dot Badges; industry standard |
| No discounts on drop/limited products beyond 10% | Recommended | Protects scarcity signaling |

---

## 13. Handoff Notes

### For Nik (Growth Lead)
- Do not plan paid acquisition until AOV is confirmed above INR 400 and prepaid ratio exceeds 50%. Maximum allowable CAC is INR 200. These are hard constraints, not targets.
- First-purchase incentive is tiered at INR 50/75/100 off with order minimums. Build this into all acquisition messaging.
- The prepaid discount (INR 30 off) should be visible at every payment selection point.

### For Raj (Logistics)
- COD minimum order value is INR 299. Configure in Shiprocket/Fynd checkout flow.
- WhatsApp COD confirmation within 5 minutes of every COD order is margin infrastructure, not customer service. Prioritize.
- Shipping charge for sub-INR 499 orders is INR 59 flat.

### For Andy (Catalog Operations)
- Every product must be repriced before the store goes live. No product listed below INR 149. No hero product below INR 249.
- Bundle products need to be created as distinct SKUs with their own product pages, not just cart-level combinations.
- Floor prices from Section 6.2 must be configured as minimum sale prices in the Fynd backend.

### For Shreyas (Product)
- Drop products need to be produced at 75-100 units per design, not more. Unsold drop inventory is a margin risk at INR 30/unit COGS.
- Artist collaboration pins at INR 349 require the artist name and one-line bio on the product page. This is the justification for the premium.

---

*All cost inputs sourced from: Patrick baseline-financials.md (Phase 1), Raj logistics-baseline.md (Phase 1), Maria competitor-research.md (Phase 1), Weiss customer-insight-report.md (Phase 1), Heyward brand-positioning.md (Phase 2), Jenna product-hierarchy.md (Phase 2). Assumptions flagged throughout. This document should be updated with actual COGS and shipping rates as they are confirmed.*
