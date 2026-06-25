<!-- last-updated: 2026-03-20 -->
# 22 — TPL Financials: Consolidated Reference

**Phase:** 1 — Audit
**Producing Agent:** Maria (Research Librarian)
**Date:** 2026-03-20
**Status:** draft
**Reviewer:** Harley

---

## Purpose

This document consolidates all financial and metric data found across the TPL DUMP source files into a single canonical reference. All contradictions are flagged explicitly. Downstream agents (Weiss, Heyward, Patrick) should use this document as the single source of truth for Phase 2 strategy work.

**Confirmed baseline:** ₹48L annual revenue / ₹4L monthly (confirmed by Dan, 2026-03-20, via handoff intake).

---

## 1. Revenue Baseline

| Metric | Value | Source | Reliability |
|--------|-------|--------|-------------|
| Annual Revenue | **₹48L** | Multiple sources, confirmed by Dan | High — use this |
| Monthly Revenue | **₹4L** | Multiple sources, confirmed by Dan | High |
| Daily Revenue (implied) | ₹13,333 | Calculated from ₹4L ÷ 30 | Medium |
| Orders per month | ~200 | CEO Command Center (automation brief) | Medium |
| Current daily output | 156 units/day | CEO Command Center | Medium — pre-relaunch ops state |
| Production capacity | 200 units/day | CEO Command Center | Medium — in-house facility |

**Note on Accounts Wizard partial-year figure:** The Founders Office handoff document 10-TPL-CONTRADICTIONS-GAPS.md references an Accounts Wizard figure of ₹12-14L — this appears to be a partial-year snapshot, not full-year revenue. Dan's confirmed ₹48L is the correct annual baseline.

---

## 2. Revenue Mix by Channel

### ⚠️ CONTRADICTION: Two incompatible channel splits exist in the source data.

**Version A — "Strategy Target" (40/30/20/10 split)**

Source: `TPL CEO - claude/03_TPL_Revenue_Financial_Strategy.md`

| Channel | Monthly Target (post-relaunch) | % Mix |
|---------|-------------------------------|-------|
| D2C Direct Sales | ₹2.8L | 40% |
| B2B Corporate | ₹2.1L | 30% |
| Artist Platform | ₹1.4L | 20% |
| Quick Commerce / Amazon | ₹0.7L | 10% |
| **TOTAL** | **₹7.0L** | **100%** |

Context: This is a **Q4 relaunch target**, not a current state description. Revenue base is ₹7L/month (75% above current ₹4L).

**Version B — "Accounts Wizard Actuals" (80/20 split)**

Source: `knowledge/15-HANDOFF-INTAKE.md` (citing Accounts Wizard data)

| Channel | Current Actual Share |
|---------|---------------------|
| B2B / Wholesale (B2B2C) | ~80% |
| D2C (direct consumer) | ~20% |

Context: This reflects actual current revenue composition. The D2C relaunch is building the **minority** revenue channel. The Master Framework's earlier claim of "75% D2C / 25% B2B" has been superseded by handoff actuals.

**Resolution:** Version B reflects current reality. Version A is a relaunch aspiration. Both should be retained — they are answering different questions. Strategic work should start from Version B actuals.

**Additional channel target data (from `02_TPL_Financial_Intelligence.md`):**

| Channel | Target % (at ₹4L/month) | Post-90-day D2C push |
|---------|------------------------|----------------------|
| D2C Website | 30-35% | 40-50% |
| B2B | 25-30% | — |
| Amazon | 20-25% | — |
| Retail Store | 10-15% | — |

This third version (Founders Office / Financial Intelligence) is a **planning target**, not actuals. It conflicts with both Version A and the Accounts Wizard data, adding additional ambiguity.

---

## 3. COGS Structure

### ⚠️ CONTRADICTION: Three different COGS figures exist, all from internal sources.

| Figure | Source | Context |
|--------|--------|---------|
| **27% of revenue** | Accounts Wizard (handoff) | Calculated on actual orders — likely accessories-only, in-house production, favorable batch |
| **30% of revenue** | Financial projections table (CEO - 03) | Used in relaunch P&L model |
| **45-55% of revenue** | "Financial Reality Check" (contradictions doc) | Includes full operational cost load — direct + indirect |

**⚠️ These figures are not measuring the same thing.** The 27% appears to be product COGS only. The 45-55% includes operating costs (facility, utilities, equipment, labor overhead). The 30% is a planning assumption for relaunch projections.

### Daily Cost Breakdown (from `02_TPL_Financial_Intelligence.md`, CEO Command Center data)

| Cost Category | Daily Amount | % of Revenue (~₹13,333/day) |
|---------------|-------------|------------------------------|
| Materials | ₹3,200 | 24.0% |
| Labor | ₹1,800 | 13.5% |
| Packaging | ₹600 | 4.5% |
| **Subtotal Direct Costs** | **₹5,600** | **42.0%** |
| Facility | ₹1,200 | 9.0% |
| Utilities | ₹400 | 3.0% |
| Equipment | ₹300 | 2.3% |
| **Subtotal Operating Costs** | **₹1,900** | **14.3%** |
| Shipping | ₹300 | 2.3% |
| Processing | ₹120 | 0.9% |
| **Subtotal Variable Costs** | **₹420** | **3.2%** |
| **TOTAL DAILY COSTS** | **~₹7,920** | **~54.7%** |

Note: This cost breakdown implies gross margin of ~58% (not 70%+), which partially explains the COGS contradiction. The 70%+ gross margin target may apply to accessories only, or may exclude operating costs from the calculation.

### Actual Unit Cost Calculator (In-House Production — Ink Fish / TPL)

Source: `knowledge/15-HANDOFF-INTAKE.md` (from handoff production data)

**Materials:**

| Material | Cost/sq ft |
|----------|-----------|
| Acrylic (3mm) | ₹90 |
| Birch | ₹43 |
| MDF | ₹30 |

**Print Costs:**

| Method | A4 | A3 |
|--------|----|----|
| Digital Print (acrylic only) | ₹150 | ₹250 |
| UV Print (all materials) | ₹200 | ₹350 |

**Attachments and Packaging:**

| Component | Cost/piece |
|-----------|-----------|
| Rubber pin back | ₹6 |
| Magnetic pin back | ₹15 |
| Keychain ring | ₹2.5 |
| Fridge magnet | ₹4 |
| Plain card (MOQ 100) | ₹5 |
| Printed card (MOQ 100) | ₹8 |
| Die-cut card (MOQ 100) | ₹11 |
| Labor base | ₹3/piece |

**Unit Cost Formula:**
```
Unit Cost = Material Cost + (Print Cost ÷ pieces per sheet) + Attachment + Packaging + Labor

Material Cost = (size_inches² ÷ 144) × material_rate × wastage_factor
Pieces per Sheet = floor(sheet_width_mm ÷ (product_width_mm + 6mm)) × floor(sheet_height_mm ÷ (product_height_mm + 6mm))
```

**Worked Example — 1"×1" Lapel Pin (Acrylic, UV A4, Rubber Back, Plain Card):**

| Component | Calculation | Cost |
|-----------|------------|------|
| Material | (1/144) × ₹90 | ₹0.63 |
| Print | ₹200 ÷ 54 pieces/sheet | ₹3.70 |
| Rubber back | — | ₹6.00 |
| Plain card | — | ₹5.00 |
| Labor | — | ₹3.00 |
| **UNIT COST** | | **₹18.33** |

**Implied margin on ₹199 keychain:** If COGS ≈ ₹25-35 (including keychain ring + slightly larger material), gross margin = 82-87% on product only. This aligns with the Accounts Wizard 73% figure when blended with lower-margin SKUs.

---

## 4. Gross Margin

### ⚠️ CONTRADICTION: Two gross margin figures exist.

| Figure | Source | Context |
|--------|--------|---------|
| **73% gross margin** | Accounts Wizard (handoff) | Calculated on actual orders |
| **51% gross margin** | ₹6L projection scenario (contradictions doc) | Based on full-cost model including overheads |
| **70%+ target** | Multiple strategic documents | Planning target, cited in CEO and OPS docs |
| **71.2% actual** | CEO Dashboard snapshot (May 2025) | Single-day actual reading |

**Resolution per handoff:** "Accounts Wizard on actuals, projection on full costs." The 73% figure is product-level gross margin on accessory orders using in-house production. The 51% applies when full operational overhead is included.

**For Phase 2 use:** Distinguish between (a) product gross margin (~73-80% for accessories) and (b) contribution margin after all operating costs (~45-55%). Both are valid — they measure different things.

**Gross Margin by Product Category/Vertical** (source: CEO Revenue Strategy doc — aspirational targets, not actuals):

| Category | Gross Margin Target |
|----------|-------------------|
| E-Commerce D2C (accessories) | 75-80% |
| B2B Enterprise | 60-65% |
| Creative Operations / Artist | 70-75% |
| Retail Partnerships | 45-50% |
| Accessories (OPS doc) | 70-75% |
| Apparel (OPS doc) | 60-65% |
| Stationery (OPS doc) | 65-70% |

---

## 5. Average Order Value (AOV)

| Context | AOV | Source |
|---------|-----|--------|
| Current D2C | **₹501** | Multiple sources — consistent across docs |
| D2C relaunch target | ₹850 | CEO Revenue Strategy |
| D2C long-term target | ₹750-1,200 | Founders Office KPIs |
| B2B/Corporate average | ₹25,000-75,000 | Financial Intelligence doc |
| PR Kit category | ₹808 | Handoff (actual) |
| Service category | ₹12,000 | Handoff (only 12 units sold) |
| B2B gifting economy tier | ₹500-1,000/recipient | B2B Clients doc |
| B2B gifting premium tier | ₹2,500-5,000/recipient | B2B Clients doc |

---

## 6. Conversion Rate

| Context | Value | Source |
|---------|-------|--------|
| Current D2C conversion | **0.63%** | Multiple sources — consistent |
| Target (relaunch) | 2.5% | CEO Revenue Strategy |
| Target range | 2-3% | Founders Office KPIs |
| Gap to target | 68-75% below target | Consistent across sources |

The 0.63% conversion rate is flagged as "critical" across multiple source documents. D2C ad spend was paused until ROAS exceeded 2x (decision logged in CMO doc).

---

## 7. ROAS and Marketing Spend

| Metric | Value | Source |
|--------|-------|--------|
| Current ROAS | **0.78x** | Multiple sources — consistent |
| ROAS target (relaunch) | 4.5x | CEO Revenue Strategy |
| ROAS target range | 4-5x | Founders Office KPIs |
| ROAS emergency threshold | Falls below 1.5x | CEO Revenue doc alert thresholds |

**Ad Budget (current/near-term):**

| Channel | Monthly Budget |
|---------|---------------|
| Instagram / Facebook | ₹20,000 |
| Google Ads | ₹10,000 |
| Amazon PPC | ₹20,000 (when active) |
| **Total** | ₹25,000-30,000 |

**Decision logged:** D2C ad spend paused until ROAS >2x (CMO financials doc, status: approved).

---

## 8. Customer Acquisition Cost (CAC)

| Metric | Value | Source |
|--------|-------|--------|
| CAC target | ₹250-400 | Founders Office KPIs |
| Current CAC | ❓ Not documented | — |
| LTV:CAC target | 8:1 to 12:1 | Founders Office KPIs |
| Current LTV:CAC | ❓ Not documented | — |

**Gap:** Actual CAC not captured in any source document. This is a known data gap.

---

## 9. Operational Cost Targets

| Metric | Target | Source |
|--------|--------|--------|
| Gross Profit Margin | 65-70% | Founders Office KPIs |
| Operating Profit Margin | 25-30% | Multiple sources |
| Net Profit Margin | 20-25% | Multiple sources |
| Operating Expense Ratio | 35-40% | Founders Office KPIs |
| Fulfillment Cost | <8% of revenue | Financial Intelligence doc |
| Quality Cost | <2% of revenue | Financial Intelligence doc |
| Operational Cost Ratio | <35% of revenue | Financial Intelligence doc |
| Break-even monthly revenue | ₹9.7L | CEO Revenue Strategy (based on ₹6.8L fixed costs + 70% gross margin) |

**Monthly Fixed Costs (planning assumption):** ₹6.8L (team + operating) — from relaunch projection model. Note: This assumes a 22-person team, which does not reflect current reality (Dan is currently the sole operator).

---

## 10. Relaunch Financial Projections

Source: `TPL CEO - claude/03_TPL_Revenue_Financial_Strategy.md`

| Month | Revenue | COGS (30%) | Team Cost | OpEx | Net |
|-------|---------|-----------|-----------|------|-----|
| Month 1 | ₹5L | ₹1.5L | ₹3L | ₹1.5L | (₹1L) loss |
| Month 2 | ₹7L | ₹2.1L | ₹4.6L | ₹1.5L | (₹1.2L) loss |
| Month 3 | ₹10L | ₹3L | ₹5.3L | ₹1.5L | ₹0.2L profit |

**⚠️ Critical caveat:** These projections assume a 22-person team (₹3-5L+ monthly team costs). Dan confirmed he is currently the sole operator. Team costs shown are planning-scenario costs for a scaled operation, not current reality. Solo-operator projections would show significantly different (better near-term) unit economics.

**90-Day Launch Capital Required (per CEO strategy doc):** ₹25L
- Infrastructure Setup: ₹8L
- Working Capital: ₹10L
- Operational Expenses: ₹5L
- Contingency: ₹2L

**Gap:** No solo-operator financial model exists. Patrick (ops/finance) should build one for Phase 2.

---

## 11. Revenue Growth Targets

| Milestone | Monthly Revenue | Timeframe |
|-----------|----------------|-----------|
| Current (baseline) | ₹4L | Now |
| Q4 relaunch target | ₹7L | 90 days |
| 2x growth | ₹8L | 90 days (Financial Intelligence doc) |
| 5x growth | ₹20L | Primary strategic target |
| 10x growth | ₹40L | Long-term vision |
| 12-month target (OPS doc) | ₹8.3L+ | 12 months |
| 12-month target (Founders KPI) | ₹12.5L | 12 months (₹1.5Cr annual) |
| Long-term annual | ₹5-10 Cr | Multi-year strategic vision |
| 5-year GMV | ₹150 Cr | By 2030 (artist marketplace vision) |

**⚠️ Inconsistency on 12-month targets:** OPS doc targets ₹8.3L/month (₹1Cr annual), while Founders KPI doc targets ₹12.5L/month (₹1.5Cr annual). These may reflect different planning scenarios or be from different time periods.

**Month-over-month growth rate target:** 8-12% (multiple sources, consistent).

---

## 12. B2B Financial Model

| Metric | B2B | D2C (comparison) |
|--------|-----|-----------------|
| Average Order Value | ₹25,000-75,000 | ₹501 |
| Gross Margin | 60-65% | 73-80% (accessories) |
| Customer LTV | 5-8x higher | Baseline |
| Sales Cycle | 2-4 weeks | 24-48 hours |
| Minimum Order | ₹25,000 | None |

**B2B Wholesale Discount Structure** (from `06-BUSINESS-MODELS-AND-CHANNELS.md`):

| Category | Standard Discount | Margin Retention |
|----------|------------------|-----------------|
| Accessories | 40% off retail | 60% of MRP |
| Apparel | 35% off retail | 65% of MRP |
| Stationery | 40% off retail | 60% of MRP |
| Home & Decor | 30% off retail | 70% of MRP |

**Known B2B clients (via Ink Fish/TPL):** Meta, Diageo, Coca-Cola, Amazon. These are corporate merchandise clients, not necessarily ongoing retainer relationships.

**Active B2B pipeline (May 2025 snapshot):** Volvo, Amoeba, multiple regional clients. Pipeline value mentioned: ₹15L qualified pipeline in CEO doc (target state, not confirmed actuals).

---

## 13. Product Pricing Reference

### Current D2C Catalog Pricing (Accessories — confirmed scope for relaunch)

| Product | Price |
|---------|-------|
| Keychains | ₹199 |
| Fridge Magnets | ₹225 |
| Coasters (Set of 2) | ₹399 |
| Laptop/3D/Card Stickers | ₹100 |
| Notebooks | ₹300 |
| Music Plaques | ₹699 |
| Wooden Clocks | ₹799 |

### Broader Catalog (out of scope for D2C MVL — accessories only confirmed)

| Category | Price Range |
|----------|------------|
| T-Shirts | ₹999-1,499 |
| Totes/Bags | ₹399-699 |
| Caps | ₹999 |
| Mugs | Varied |
| Coffee Mugs | Varied |

### Customization Premium Tiers

| Level | Premium |
|-------|---------|
| Basic (name/text on existing) | +10% |
| Medium (design elements modified) | +20% |
| Premium (fully custom) | +25%+ |
| Rush order | +20% |

---

## 14. Operational KPIs — Current State vs Target

Source: `TPL OPS - CLAUDE/11_TPL_OPERATIONAL_KPIS_AND_TARGETS.md`

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Order delay rate | 60% | 10% | Month 2-3 |
| Quality rejection rate | 15% | 5% | Month 2-3 |
| Order processing time | 2 days | 1.5 days | Month 3 |
| Simultaneous orders (peak) | 6 | 15 | Month 4 |
| Customer return/exchange rate | 5% | <2% | Month 6 |
| Customer satisfaction | 4.2/5 | 4.8/5 | Month 3 |
| QR scan automation | 0% | 95% | Month 2 |
| Airtable field utilization | ~70% | 90%+ | — |
| Unit_Price population | 80% | 100% | — |

**Revenue per team member:**
- Current: ₹8L/year
- Target: ₹16.7L+/year

---

## 15. Artist Platform Economics

| Metric | Current | Target |
|--------|---------|--------|
| Active artists | 4 | 8-12 |
| Monthly artist revenue (total) | ₹20,000 | ₹40,000 |
| Revenue per artist | ₹5,000/month | ₹8,000/month |
| Artists in pipeline | 12+ | — |
| Drop frequency | Bi-monthly | 2-3/month |

**Artist revenue share structure:**

| Tier | Revenue Share | Lab Fee |
|------|-------------|---------|
| New artist | 40% | 15-25% |
| Proven artist | 50% | 15-25% |
| Star artist | 60% | 15-25% |
| Exclusivity bonus | +10% | — |

---

## 16. Technology Investment (Planning Data)

Source: `02_TPL_Financial_Intelligence.md`

Note: The following figures are planning estimates from pre-relaunch strategic conversations. Given Dan is now sole operator with no staff, these investment requirements are aspirational and pre-date the current operating reality.

| Investment Area | Amount | Timeline |
|-----------------|--------|----------|
| Website Launch | ₹3-5L | — |
| Tech Automation (Phase 1) | ₹2-3L | 0-3 months |
| Tech Automation (Phase 2) | ₹3-5L | 3-6 months |
| Tech Automation (Phase 3) | ₹5-8L | 6-12 months |
| N8N Agent System | ₹2L setup + ₹1.8L annual | — |
| B2B Sales Infrastructure | ₹3-5L | — |
| Full Operational Transformation | ₹14.75L | 12-month plan |

---

## 17. Key Financial Ratios — Targets (Summary)

Source: `08-FINANCIAL-METRICS-AND-KPIs.md` (Founders Office)

| Ratio | Target |
|-------|--------|
| Gross Profit Margin | 65-70% |
| Operating Profit Margin | 25-30% |
| Net Profit Margin | 20-25% |
| Operating Expense Ratio | 35-40% |
| Current Ratio | 1.5-2.0 |
| Quick Ratio | 1.0-1.5 |
| Cash Ratio | 0.5-0.8 |
| Cash Runway | 6-12 months |
| Return on Assets | 15-20% |
| Inventory Turnover | 8-12x annually |
| Receivables Turnover | 8-12x |
| Revenue Per Employee | ₹12L+ annually |
| Fulfillment Cost | <8% of revenue |

---

## 18. Evidence Gaps (What We Do Not Know)

| Gap | Impact | Who Needs This |
|-----|--------|----------------|
| Actual CAC (current) | Cannot calculate real LTV:CAC | Nik, Heyward |
| Channel revenue split — actual ₹ by channel for FY24/25 | Strategy relies on 80/20 estimate, not confirmed ₹ breakdown | Weiss, Patrick |
| Actual net profit margin (vs targets) | No confirmed P&L exists | Patrick |
| COGS breakdown by product category (actuals) | Margin by SKU unknown — cost calculator only covers accessories | Shreyas, Patrick |
| Repeat purchase rate (actual) | Only targets documented (30-40%), no actual | Heyward, Eli |
| Cart abandonment rate (actual) | Only target documented (<70%) | Tobi |
| LTV by customer segment | Not documented anywhere | Heyward, Eli |
| Solo-operator financial model | All projections assume team of 6-22 | Patrick |
| B2B revenue by client (FY actuals) | Pipeline value estimated, not confirmed | Patrick, Weiss |
| Accounts Wizard full P&L | Referenced but not extracted into handoff | Patrick |
| Marketing spend by channel (actuals) | Budget targets exist, actual spend distribution unknown | Nik |

---

## Sources

| Document | Date | Reliability |
|----------|------|-------------|
| `TPL CEO - claude/03_TPL_Revenue_Financial_Strategy.md` | ~Jun 2025 (internal) | Medium — aspirational targets mixed with actuals |
| `TPL CEO Strategic Command Center-claude/02_TPL_Financial_Intelligence.md` | ~Jun 2025 (internal) | Medium — planning data with some actuals |
| `TPL CMO - CLAUDE/04_TPL_FINANCIALS_AND_METRICS.md` | ~May-Jun 2025 (internal) | Medium — campaign-era snapshot |
| `TPL FOUNDERS OFFICE FILES - CLAUDE/08-FINANCIAL-METRICS-AND-KPIs.md` | ~Jun 2025 (internal) | Medium — target framework, minimal actuals |
| `TPL IG-claude/06_TPL_Strategic_Goals_Execution.md` | ~Jun 2025 (internal) | Low for financials — strategic vision doc |
| `TPL OPS - CLAUDE/11_TPL_OPERATIONAL_KPIS_AND_TARGETS.md` | ~Jun 2025 (internal) | Medium-High — operational data more granular |
| `TPL FOUNDERS OFFICE FILES - CLAUDE/04-PRODUCT-CATALOG-AND-PRICING.md` | ~Jun 2025 (internal) | High for pricing — catalog is factual |
| `TPL FOUNDERS OFFICE FILES - CLAUDE/06-BUSINESS-MODELS-AND-CHANNELS.md` | ~Jun 2025 (internal) | High for discount structure — operational policy |
| `TPL FOUNDERS OFFICE FILES - CLAUDE/13-B2B-CLIENTS-AND-ACTIVE-ORDERS.md` | May 2025 (internal) | High — specific order-level data |
| `knowledge/15-HANDOFF-INTAKE.md` | 2026-03-20 | High — Dan-confirmed answers to specific questions |

**Reliability note on all TPL DUMP sources:** All source documents are internal planning conversations from Claude.ai projects (~May-Jun 2025). They reflect a combination of aspirational targets, planning assumptions, and actual operational data. Where a figure appears in multiple documents consistently, reliability is higher. Where figures conflict, they are flagged with ⚠️ above and the underlying source difference explained.
