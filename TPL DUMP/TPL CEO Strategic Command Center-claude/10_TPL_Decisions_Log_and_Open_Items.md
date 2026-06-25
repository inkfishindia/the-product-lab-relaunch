# 10 — THE PRODUCT LAB: DECISIONS LOG, OPEN ITEMS & FLAGS

---

## CONFIRMED DECISIONS

| # | Decision | Date | Context | Status |
|---|----------|------|---------|--------|
| D1 | Architecture split: Notion (Strategic HQ) + Data Studio (Reports) + Airtable (Operations) + n8n (Sync) | Jun 15, 2025 | Dan confirmed after discussion on platform specialization | ✅ Decided |
| D2 | Hire automation specialist (₹50-80K project fee, 12 weeks) | Jun 15, 2025 | Role brief created with screening questions | 📋 Brief ready, not posted |
| D3 | Artist commission tiers: New 40% → Proven 50% → Star 60% | Pre-existing | Documented in Operations Guide v1.0 | ✅ Active |
| D4 | JIT inventory model with 45-day maximum stock policy | Pre-existing | Core operational philosophy | ✅ Active |
| D5 | No MOQ policy for customers | Pre-existing | Core business model differentiator | ✅ Active |
| D6 | WooCommerce as e-commerce platform | Pre-existing | Website launch planning references WooCommerce | ✅ Active |
| D7 | Build ops wing at HQ before scaling further | May 27, 2025 | Sales/marketing strong, factory strong, ops is bottleneck | 🟡 Planning stage |
| D8 | Use AI (Claude) for ops monitoring + bottleneck detection | May 27, 2025 | Add 5 AI columns to existing Airtable product line table | 🟡 Not implemented |
| D9 | Launch TPL Creator Studio (artist + brand collaboration module) | Jun 17, 2025 | 45-day sprint plan created | 🟡 Planning stage |
| D10 | Launch B2B channel targeting corporate gifting | Jun 16, 2025 | 5-project framework created | 🟡 Planning stage |
| D11 | Website launch in 90-day phased approach | Jun 16, 2025 | 3-phase plan with Notion project management | 🟡 Planning stage |
| D12 | Implement LLM Search Optimization (LLMO) | Jun 15, 2025 | 30-day rollout plan created | 🟡 Planning stage |
| D13 | Target 8 active artists by Q2 2025 | Jun 15, 2025 | Expansion from current 4 artists | 🟡 May be behind schedule |
| D14 | Expand connected task database (not expand time blocks table) | Jun 15, 2025 | Separate Tasks DB linked to Time Blocks via relation | 🟡 Recommended, not confirmed |
| D15 | Implement Kaizen daily/weekly/monthly improvement cycles | Pre-existing | Framework documented, activation recommended | 🔴 Not yet active |

---

## OPEN ITEMS REQUIRING DECISIONS

| # | Item | Context | Priority | Blocker |
|---|------|---------|----------|---------|
| O1 | **Specific pricing per SKU** | No actual ₹ values per product documented anywhere | High | Need data from Dan |
| O2 | **Cunningham Road retail store** — active or planned? | Mentioned once, status unclear | Medium | Need confirmation |
| O3 | **Amazon channel strategy** | Only percentage targets (20-25%), no specific strategy | Medium | Need dedicated plan |
| O4 | **Swiggy Instamart / Quick Commerce** | Mentioned as planned, no implementation details | Low | Future phase |
| O5 | **WooCommerce admin access** for webhook setup | Blocked automation specialist work | High | Dan to provide |
| O6 | **Airtable "Online orders line" table** permissions | Blocked data analysis | High | Dan to grant access |
| O7 | **Actual artist names and portfolios** | No artist identities documented | Medium | Privacy/timing |
| O8 | **Budget allocation across competing investments** | Multiple ₹2-8L investment areas overlap | Critical | Need prioritization |
| O9 | **Automation specialist hiring status** | Brief created Jun 15, 7-day application deadline — past due | High | Need update |
| O10 | **Notion database actual setup status** | Multiple recommendations, unclear what's actually built | High | Need Dan walkthrough |
| O11 | **n8n deployment status** | Referenced extensively, implementation unknown | Medium | Need confirmation |
| O12 | **WhatsApp Business API integration** | Referenced as planned, no confirmed setup | Medium | Need vendor/plan |
| O13 | **Data Studio / Looker Studio** setup | Planned but no confirmed configuration | Medium | Depends on Airtable |
| O14 | **B2B first pipeline targets** | 100+ enterprises identified, but no list or CRM | High | Needs execution |
| O15 | **Brand partnerships for Creator Studio** | 3-5 pilot mentioned, none named | Medium | Needs outreach |

---

## CONTRADICTIONS & INCONSISTENCIES FLAGGED

| # | Contradiction | Sources | Resolution Needed |
|---|--------------|---------|-------------------|
| C1 | **Investment totals don't add up consistently** | Tech automation: ₹10-16L; CEO Command Center: ₹14-22L; Ops wing: ₹8-12L; Total could be ₹32-50L but individual conversations position each as the primary investment | Clarify: Are these overlapping or additive? Total budget? |
| C2 | **Operating costs: 34% vs 54.7%** | Dashboard shows "Operating Costs: 34% of revenue ✅" but daily cost breakdown totals 54.7% | 34% likely = operating expenses only (facility+utilities+equipment); 54.7% = all costs including direct + variable. Both correct in context but terminology needs standardization |
| C3 | **Revenue ₹4L vs ₹48L** | Most chats say "₹4L monthly", one says "₹48L business" | ₹48L = annualized (₹4L × 12). Not a contradiction, just different framing |
| C4 | **"New factory is strong" vs shared Ink Fish facility** | May 27: "our new factory is strong"; multiple refs to "shared Ink Fish production facility" | May be a new/upgraded facility within Ink Fish, or a recently established dedicated space. Needs clarification |
| C5 | **Artist targets: "Q2 2025" but conversations are from May-Jun 2025** | Target 8 artists by Q2 2025, but Q2 ends Jun 30, 2025 and still at 4 artists | Likely behind schedule on this target. Needs updated timeline |
| C6 | **Daily revenue ₹15,200 vs ₹13,333 target** | CEO Dashboard snapshot shows ₹15,200 (↑12%); calculated daily target is ₹13,333 | Snapshot shows an above-target day. Consistent — ₹15,200 is a good day, ₹13,333 is the minimum target |
| C7 | **Gross margin 70%+ target but B2B is 65-70%** | D2C gross margin: 75%; B2B: 65-70% due to volume discounts; blended target: 70%+ | As B2B scales to 25-30% of mix, blended margin may dip below 70%. Needs monitoring |
| C8 | **Fulfillment: current 24-48h vs optimized 8-12h vs dashboard 18h** | Process Optimization says current is 24-48h; dashboard shows 18h avg; target is 8-12h | Dashboard data may represent optimized state vs historical baseline. Current actual likely ~18h |
| C9 | **Customer segments: 4 types vs channel mix** | Segments: Individuals, Retail, Designers, Companies. Channels: D2C, B2B, Amazon, Retail | Segments ≠ Channels. Designers and Companies both feed B2B channel. Individuals feed D2C + Amazon. Retail stores = Retail channel. Mapping needed |

---

## TIMELINE OF ALL CONVERSATIONS (Chronological)

| Date | Chat Title | Key Outputs |
|------|-----------|-------------|
| May 27, 2025 | Documenting Strategic Analysis | Full operational audit, ₹14.75L investment plan |
| May 27, 2025 | Optimizing Notion-Based Operations | Notion architecture recommendations, 5-database design |
| May 27, 2025 | Accessing The Product Lab's Operations | Notion page confirmed, still empty at time |
| May 27, 2025 | Accessing Notion Workspace | TPL Operations page populated with order IF-OF-00451 data |
| May 27, 2025 | Optimizing Production Workflows | CSV analysis: 22 orders, 50 line items, database fixes needed |
| May 27, 2025 | Streamlining Operations to Scale | Ops wing recommendation, AI ops manager, team hiring plan |
| Jun 15, 2025 | Print-on-Demand Business Strategy | MCQ assessment, automation specialist role brief |
| Jun 15, 2025 | Product Lab Operational Strategy Framework | Full business brief, hub leaders, architecture decision (Notion+DataStudio+Airtable) |
| Jun 15, 2025 | AI and WooCommerce D2C Automation | AI commerce roadmap 2025-2026 |
| Jun 15, 2025 | LLM Search Optimization Strategy | LLMO implementation guide |
| Jun 15, 2025 | E-commerce Platform Strategic Architecture | Airtable base structure, WooCommerce webhook plan |
| Jun 15, 2025 | Strategic Business Framework Assessment | Notion command center optimization |
| Jun 15, 2025 | Operational Infrastructure Analysis | Infrastructure gaps analysis |
| Jun 15, 2025 | Notion Productivity System Design | 5-database Notion command center |
| Jun 15, 2025 | Notion Productivity Framework | Kaizen sprint, artist expansion plan |
| Jun 15, 2025 | Product Labs Task Management System | Time blocks, energy management, task database |
| Jun 16, 2025 | Retail Order Reporting System Design | Airtable retail base, Data Studio setup |
| Jun 16, 2025 | Product Lab Website Launch Planning | 90-day website launch roadmap |
| Jun 16, 2025 | B2B Launch Strategic Planning | 5-project B2B framework |
| Jun 17, 2025 | Artist-Brand Collaboration Platform Launch | TPL Creator Studio, 45-day sprint |
| Jun 23, 2025 | Notion Database Access Request | Confirmed no direct Notion access |

---

## CRITICAL PATH ITEMS (Priority Order)

| Priority | Item | Why Critical | Dependency |
|----------|------|-------------|------------|
| P0 | **Hire Operations Manager** | Solo operation is single point of failure | Budget approval |
| P0 | **Grant Airtable/WooCommerce access** for integration | Blocks all automation work | Dan action |
| P1 | **Implement basic order tracking automation** | Foundation for everything else | Airtable access |
| P1 | **Activate daily Kaizen routines** | Zero cost, immediate operational visibility | Dan discipline |
| P1 | **Resolve investment budget allocation** | Multiple competing ₹2-8L requests | Dan decision |
| P2 | **Website launch Phase 1** | Primary revenue acceleration vehicle | Tech resources |
| P2 | **B2B pipeline activation** | Highest per-order revenue potential | Sales infrastructure |
| P2 | **Artist expansion to 8** | Revenue diversification, reduce concentration risk | Creator Studio |
| P3 | **Data Studio dashboard setup** | Reporting foundation | Airtable clean data |
| P3 | **LLM optimization rollout** | Future-proof customer acquisition | Content resources |

---

## KNOWLEDGE BASE DOCUMENTS (Project Files)

| Document | Version | Last Updated | Purpose |
|----------|---------|-------------|---------|
| TPL Process Optimization & Efficiency Framework | — | May 27, 2025 | Lean/Kaizen framework, 7 wastes, automation roadmap |
| TPL CEO Operational Command Center System | — | May 27, 2025 | Dashboard architecture, KPIs, alert system, AI forecasting |
| TPL Operations Guide & Legend — Complete Reference | v1.0 | May 27, 2025 | Database schemas, daily routines, KPI targets, troubleshooting, training |

---

## ⚠️ OVERALL ASSESSMENT

**Strengths:**
- Exceptional strategic documentation and framework quality
- Clear vision and growth trajectory
- Strong production infrastructure (Ink Fish legacy)
- Healthy margins (70%+) and proven market demand
- Artist-first positioning is genuinely differentiated

**Critical Gaps:**
- **Execution lag** — frameworks exist but implementation is behind
- **Solo dependency** — everything runs through Dan
- **Integration debt** — systems (Notion, Airtable, WooCommerce) not yet connected
- **No confirmed hires** as of Jun 2025
- **Budget prioritization needed** — too many competing investment areas

**Recommendation:**
Focus on 3 things only for next 30 days:
1. Hire operations manager
2. Connect WooCommerce → Airtable (basic automation)
3. Activate daily morning/evening operational routines
