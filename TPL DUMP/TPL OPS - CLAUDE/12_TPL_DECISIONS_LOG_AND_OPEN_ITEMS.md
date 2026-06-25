# THE PRODUCT LAB — DECISIONS LOG, CONTRADICTIONS & OPEN ITEMS

---

## DECISIONS MADE (CONFIRMED BY DAN)

### Business & Operations Decisions

| # | Decision | Context | Conversation |
|---|----------|---------|-------------|
| D1 | Order processing time is 2 days (confirmation to dispatch) | Dan's answer to Q1 of 20 questions | Comprehensive Ops Analysis |
| D2 | 6 simultaneous orders during peak (2 per division: merch, stationery, apparel) | Q2 answer | Comprehensive Ops Analysis |
| D3 | 90% custom orders vs 10% catalog | Q3 answer | Comprehensive Ops Analysis |
| D4 | Low stocking model: 1–2 pcs, rest is made-to-order | Q4 answer | Comprehensive Ops Analysis |
| D5 | Target: 5 orders per division for next 12 months | Q5 answer | Comprehensive Ops Analysis |
| D6 | Factory lead times: IF=1 day, AC=1 day, YD=2 days, OD=1+1 days | Q6 answer | Comprehensive Ops Analysis |
| D7 | 60% of orders delayed due to communication gaps and errors | Q7 answer | Comprehensive Ops Analysis |
| D8 | Track materials by tagging items on offline orders product list | Q8 answer | Comprehensive Ops Analysis |
| D9 | 15% quality rejection rate across all categories | Q9 answer | Comprehensive Ops Analysis |
| D10 | Real-time order tracking integrated with 3rd party platforms | Q10 answer | Comprehensive Ops Analysis |
| D11 | B2B AOV: ₹25k–45k / B2C AOV: ₹200–500 | Q11 answer | Comprehensive Ops Analysis |
| D12 | 2 design revision cycles for both B2B and B2C | Q12 answer | Comprehensive Ops Analysis |
| D13 | "Almost everything is a rush order" | Q13 answer | Comprehensive Ops Analysis |
| D14 | No individual product profitability tracking currently | Q14 answer | Comprehensive Ops Analysis |
| D15 | 5% customer return/exchange rate | Q15 answer | Comprehensive Ops Analysis |
| D16 | Managers use order level, teams use product level; bin and tray all things in inventory including parts and accessories once order confirmed | Q16 answer | Comprehensive Ops Analysis |
| D17 | Seasonal lift during Indian festivals | Q17 answer | Comprehensive Ops Analysis |
| D18 | No automated notifications currently | Q18 answer | Comprehensive Ops Analysis |
| D19 | Target margins unknown — asked for guidance (recommended 70–75% accessories, 60–65% apparel, 65–70% stationery) | Q19 answer | Comprehensive Ops Analysis |
| D20 | Core pain: data/knowledge transfers, goldfish memory team, not equipped to overview, need allocations broken down with strong specifications | Q20 answer | Comprehensive Ops Analysis |

### System & Architecture Decisions

| # | Decision | Context |
|---|----------|---------|
| D21 | Implement Kanban bin system with QR codes for physical-digital integration | Recommended by advisor, confirmed by Dan |
| D22 | BIN_CODE format: TPL-[Order#]-[LineItem#]-[ProductCode] | Confirmed in workflow design |
| D23 | 7 physical location zones in facility | Confirmed in workflow design |
| D24 | Enhance existing Airtable tables — do NOT rebuild from scratch | Dan's explicit instruction: "do not edit existing information, only enhance columns" |
| D25 | Human-driven workflow with intelligent automation support (not full automation) | Corrected understanding after initial over-automation proposal |
| D26 | Factory routing is product-based, not client-based | Dan confirmed batch production approach |

### Amoeba Order Decisions

| # | Decision | Context |
|---|----------|---------|
| D27 | Amoeba: 1 Master Order + 18 line items (one per city bundle) for order management | Dan's preference after evaluating 3 options |
| D28 | Amoeba: 108 bins (6 products × 18 cities) for granular operational tracking | Operational necessity for assembly simplification |
| D29 | Amoeba: Estimated total value ₹7,81,000 | Calculated during order planning |
| D30 | Amoeba: 3-tier city distribution (Tier 1/2/3) with staggered shipping | Operational strategy |

---

## ⚠️ CONTRADICTIONS & INCONSISTENCIES FLAGGED

| # | Contradiction | Sources | Resolution Needed |
|---|--------------|---------|-------------------|
| C1 | **Amoeba total pieces:** 3,585 in one conversation vs 3,905 in another | Airtable Analysis chat vs Order Implementation chat | Verify against actual order data |
| C2 | **Team size:** Referenced as "6 core members" but specific named members are Dan, Kalpana, Sara, Anthony, Muskan + "Design Team" (unnamed) | Multiple conversations | Confirm exact headcount and Design Team composition |
| C3 | **Factory routing for 3D Products and Enamel:** Sometimes attributed to "Factory 2 (Specialized)" without naming specific factory | Order planning conversations | Confirm which named factory (AC/YD/OD) handles 3D and Enamel |
| C4 | **Processing capacity:** "6 simultaneous orders" as current, but also "2 per division" (3 divisions × 2 = 6) — these match, but later mentions of "15 orders" as target sometimes referenced as "5 orders per division" (3 × 5 = 15) | Various | Confirm: is target 15 total or 5 per division? |
| C5 | **Notion vs Airtable:** One conversation attempted to analyze tables via Notion API (`API-retrieve-a-database`) before switching to Airtable tools | Database Analysis chat | Airtable is the confirmed platform. Notion references are errors. |
| C6 | **Fortune 500 clients:** Meta, Diageo, Coca-Cola, Amazon referenced as clients in system prompt context, but only Amoeba and Bolt Minor appear in actual conversation data | System prompt vs conversation data | Verify actual active client list |
| C7 | **Revenue figure consistency:** ₹48L annually used throughout, but no source data confirms this is current vs historical | All conversations | Verify current annual run rate |
| C8 | **Target margins (Q19):** Dan said "not sure, whats good?" — the margins (70-75% accessories, 60-65% apparel, 65-70% stationery) are RECOMMENDATIONS, not confirmed actuals | Comprehensive Ops Analysis | Dan needs to confirm or adjust |

---

## OPEN ITEMS & UNRESOLVED QUESTIONS

### High Priority

| # | Item | Status | Owner |
|---|------|--------|-------|
| O1 | Fix Line_Total formula in Airtable (Qty × Unit_Price) | ⚠️ Broken | Dan/Tech |
| O2 | Implement APPROVAL_STATUS_AUTO formula logic | ⚠️ Empty formula | Dan/Tech |
| O3 | Fix STAGE_HEALTH_INDICATOR time-based formula | ⚠️ No formula | Dan/Tech |
| O4 | Implement BIN_CODE_AUTO trigger mechanism | ⚠️ No trigger | Dan/Tech |
| O5 | Address 35% MATERIALS_ALLOCATED compliance | 🔴 Critical gap | Kalpana + Dan |
| O6 | Fill 20% missing Unit_Price data | 🔴 Revenue impact | Dan |
| O7 | Populate QC_QUANTITY fields consistently | 🔴 Quality tracking gap | Sara + Dan |
| O8 | Increase CUSTOMER_FEEDBACK from 40% to 80%+ | 🟡 Improvement needed | Dan |
| O9 | Purchase 50 physical bins for bin system rollout | 📦 Procurement | Dan |
| O10 | Set up QR code printing system | 📱 Technology | Dan/Tech |

### Medium Priority

| # | Item | Status | Owner |
|---|------|--------|-------|
| O11 | Create BIN_SCAN_LOG table in Airtable | 📋 Not yet created | Dan/Tech |
| O12 | Create CITY_CONSOLIDATION_TRACKING table | 📋 Not yet created | Dan/Tech |
| O13 | Hire Order & Operations Manager (₹6–9L salary) | 📋 Role defined, not hired | Dan |
| O14 | Activate INTELLIGENT_ALERTS_SYSTEM table with actual data | 📋 Table exists but empty | Dan/Tech |
| O15 | Activate PERFORMANCE_INTELLIGENCE_ENGINE with real metrics | 📋 Table exists but empty | Dan/Tech |
| O16 | Confirm all 18 Amoeba shipping addresses (some "TBC") | 📋 Addresses pending | Dan/Sales |
| O17 | Establish formal factory capacity tracking | 📋 Not currently tracked | Dan |
| O18 | Install location signage for 7 bin zones | 📋 Physical setup needed | Dan/Ops |

### Low Priority / Future

| # | Item | Status |
|---|------|--------|
| O19 | Implement predictive scheduling algorithms | Future (Month 3+) |
| O20 | Deploy AI-powered team assignment | Future (Week 3-4) |
| O21 | Build customer communication automation | Future (Week 2) |
| O22 | Create performance analytics dashboards | Future (Week 3) |
| O23 | Implement QR code scanning training for full team | Future (Week 2) |

---

## CONVERSATION INDEX (SOURCE CHATS)

| # | Chat Title | Key Topics | Date Range |
|---|-----------|------------|------------|
| 1 | Comprehensive Operations Analysis for The Product Lab | 20 questions, database architecture, bin system, role workflow, smart automation | Late May 2025 |
| 2 | Airtable Analysis for Order and Production Management | Airtable field analysis, Amoeba order planning, bin allocation, city consolidation | Late May 2025 |
| 3 | Print-on-Demand Assembly Workflow | Assembly SOPs, product specs, station layout, Ops Manager role, module design | Early June 2025 |
| 4 | Optimizing Workflows and Team Structures for Product Lab | Team views, dashboards, implementation steps, training protocol | Late May 2025 |
| 5 | Analyze Database Structure for Order, Product, and Production Management | Notion → Airtable analysis, database architecture gaps | Late May 2025 |
| 6 | Systematically Updating Airtable with Amoeba Order | Airtable API implementation, client/product table updates | Late May 2025 |
| 7 | Airtable API Order Logging | API-based order entry for Amoeba cities | Late May 2025 |
| 8 | Airtable Offline Order Base Schema | Complete schema confirmation with field types | June–July 2025 |
