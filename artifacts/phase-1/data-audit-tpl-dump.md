<!-- last-updated: 2026-03-20 -->
# TPL DUMP — Data Audit & Agent Mapping

| Field | Value |
|-------|-------|
| **Phase** | 1 — Audit |
| **Producing Agent** | Harley (Program Director) |
| **Date** | 2026-03-20 |
| **Status** | draft |
| **Reviewer** | Dan |

---

## Overview

7 Claude project dumps containing ~84 files. Massive overlap on company/product/team/finance basics across all 7. Unique operational data concentrated in specific projects.

**Source projects:**
| # | Project | Files | Unique Value |
|---|---------|-------|-------------|
| 1 | TPL CEO | 14 | Q4 roadmap/OKRs, B2B partnerships, Kyoorius event, CEO energy blocks |
| 2 | TPL CEO Strategic Command Center | 11 | Decisions log, strategic roadmap |
| 3 | TPL CMO | 11 | Campaigns library, cultural intelligence, YDS brand, Notion system, expression archetypes |
| 4 | TPL Founders Office | 17 | Retail experience center, B2B clients & active orders, Ink Fish facility layout, AI prompt architecture, digital environment management |
| 5 | TPL IG | 10 | Brand content guide, visual guide, target audience segments, IG strategy, copy/phrase bank |
| 6 | TPL OPS | 12 | Airtable schema (field IDs), order management workflow, bin allocation, assembly SOPs, Amoeba case study |
| 7 | TPL Optimizer | 9 | Airtable 7-base architecture, inventory & procurement, process workflows |

---

## Data Classification

### OVERLAPPING (appears in 4+ dumps — consolidate to single source of truth)
- Company profile / brand identity
- Product catalog & categories
- Team structure & roles
- Financial overview / revenue figures
- Technology stack overview
- Artist platform basics
- Production capabilities / Ink Fish overview

### UNIQUE BY PROJECT (actionable data that only exists in one dump)

#### From CEO
- **Q4 MOMENTUM roadmap** — OKR targets, 12-month revenue ladder, weekly rhythm
- **B2B corporate partnerships** — service tiers, pricing (₹50-800/piece), proven clients (Nike, Puma, Meta, Diageo, Coca-Cola, Amazon), Diageo case study, payment terms
- **Kyoorius Designyatra** — progressive badge system, 3 activation pillars, sponsor model, reference activations
- **CEO energy blocks** — 5 daily blocks, 87 recurring tasks, priority scoring formula

#### From CMO
- **Expression Archetypes** — 6 customer psychographic segments (Witty Rebel, Pop Culture Devotee, etc.)
- **Campaigns Library** — 6 detailed campaign briefs ("Card Statement," "Everyday Expression," "The Lab Begins," etc.)
- **Cultural Intelligence** — Family validation crisis data (73% Gen Z), creator motivation hierarchy, psychological barriers, Indian market specifics
- **Notion system** — 7 databases, cultural momentum score, sprint cadence
- **YDS brand profile** — relationship to TPL, policy rewrites, legal gaps

#### From Founders Office
- **Retail experience center** — space allocation (Entry 20%/Product 40%/Custom 25%/Workshop 15%), ₹145K resource budget, 5 staffing roles at ₹92-115K/month
- **B2B active orders** — live pipeline (Geetika, Still Circle, Errol, Volvo, Ammar, Amoeba, etc.), factory assignments, overdue items
- **Ink Fish facility** — 5-room layout, material flow, QC station specs, role assignments (Muskan, Kalpana, Sara, Anthony)
- **AI prompt architecture** — 5 TPL Claude projects, 7+ specialized prompts, implementation priorities
- **Digital environment management** — 5 Chrome profiles, 4 Google accounts, Airtable base for context switching

#### From IG
- **Brand content guide** — 5 personality traits, tone standards, DO/DON'T framework, platform-specific rules
- **Visual guide** — CMYK palette (6 colors), typography (Futura/Bebas Neue + Myriad Pro/Montserrat), mystery box system, 7-point design checklist
- **8 audience segments** — with vertical-to-segment mapping
- **Copy phrase bank** — 7 master taglines, CTAs by context (IG/web/packaging/campaign), 6 campaign hooks
- **IG strategy** — 4 pillars (Creative Chaos/Artist Universe/Merch Culture/Lab Experiments), 60/25/15 format mix

#### From OPS
- **Airtable field-level schema** — 15 tables in Base 5 (Offline Orders), 140-150+ fields, intelligent automation fields, data quality issues (20% missing Unit_Price, 35% Materials compliance, 60% empty feedback)
- **10-stage order lifecycle** — status progression map, smart cascades, factory lead times (IF: 1 day, AC: 1 day, YD: 2 days, OD: 1+1 days)
- **BIN allocation system** — 7 physical zones, QR scanning workflow, 16 formula fields, bottleneck risk levels
- **Assembly & packing SOPs** — station specs (6×3 ft table), 6-compartment tray, complexity zones (30s to 4min), color-coded dispatch, ₹25-35K setup budget
- **Amoeba case study** — 18-city, 3,585 pieces, ₹7.81L order, hybrid bin approach (18 line items + 108 bins)

#### From Optimizer
- **7-base Airtable architecture** — cross-base data flows, master product source (Base 4), unified order view (Base 6)
- **JIT inventory model** — hierarchy, consumption points, purchase order tracking
- **4 major process workflows** — order-to-fulfillment, inventory management, product development, customer management

---

## Agent Mapping

### Pod B: Strategy (Weiss, Heyward, Jenna)
| Source | Data | Priority |
|--------|------|----------|
| CMO / Cultural Intelligence | Family validation crisis, creator psychology, Indian market insights | HIGH |
| CMO / Marketing Strategy | Expression Archetypes framework, DISCOVER content flywheel | HIGH |
| IG / Audience Segments | 8 customer segments, vertical-to-segment mapping | HIGH |
| CEO / B2B Partnerships | Service tiers, proven clients, Diageo case study | MEDIUM |
| CMO / YDS Brand Profile | TPL-YDS relationship, positioning distinctions | MEDIUM |

### Pod C: Product (Shreyas, Andy)
| Source | Data | Priority |
|--------|------|----------|
| OPS / Assembly SOPs | Product complexity zones, assembly times, materials | HIGH |
| OPS / Airtable Schema | Product data structure, field-level specs | HIGH |
| Optimizer / Inventory | JIT model, procurement, reorder logic | HIGH |
| Founders / B2B Orders | Active pipeline, factory assignments | MEDIUM |
| CEO / B2B Partnerships | Corporate gifting tiers, production capacity claims | MEDIUM |

### Pod D: Creative (Sean, Joanna, Kurt, Julie)
| Source | Data | Priority |
|--------|------|----------|
| IG / Visual Guide | CMYK palette, typography, mystery box system, design checklist | HIGH |
| IG / Content Guide | Brand personality, tone, DO/DON'T, platform rules | HIGH |
| IG / Copy Bank | Taglines, CTAs, campaign hooks | HIGH |
| CMO / Campaigns Library | 6 campaign briefs (reference, not necessarily for reuse) | MEDIUM |
| Founders / Retail Center | Experience design, sensory elements, customization bar | LOW (deferred — not MVL) |

### Pod E: Build/QA (Tobi, James)
| Source | Data | Priority |
|--------|------|----------|
| OPS / Airtable Schema | Field IDs, automation fields, data quality issues | HIGH |
| OPS / Order Workflow | 10-stage lifecycle, smart cascades, validation rules | HIGH |
| Optimizer / 7-Base Architecture | Cross-base data flows, integration points | HIGH |
| OPS / BIN System | Zone mapping, QR workflow, formula fields | MEDIUM |
| Founders / Digital Environment | Chrome profiles, Google accounts (context for system setup) | LOW |

### Pod F: Growth (Nik, Avinash, Eli)
| Source | Data | Priority |
|--------|------|----------|
| CMO / Cultural Intelligence | Market trends, creator economy data, generational strategies | HIGH |
| IG / IG Strategy | 4 pillars, format mix, KPIs | HIGH |
| CEO / Q4 Roadmap | Revenue ladder, channel expansion (Amazon, Swiggy) | MEDIUM |
| CEO / Kyoorius Event | Contacts for pre-launch seeding, activation learnings | MEDIUM |

### Pod G: Marketing (Andrew, Chase, Rachel)
| Source | Data | Priority |
|--------|------|----------|
| CMO / Marketing Strategy | Content mix targets, sprint cadence, A/B testing hypotheses | HIGH |
| IG / IG Strategy | Campaign structure, content pillars | HIGH |
| IG / Copy Bank | CTAs, hooks, hashtags | HIGH |
| CMO / Campaigns Library | Past campaign concepts (evaluate, don't blindly reuse) | MEDIUM |

### Pod H: Content (Casey)
| Source | Data | Priority |
|--------|------|----------|
| IG / Content Guide | Tone, personality, platform-specific rules | HIGH |
| IG / Visual Guide | Template ratios, design checklist | HIGH |
| IG / Copy Bank | Full phrase bank, campaign hooks | HIGH |

### Pod I: Ops/Finance (Patrick, Raj, Tony, Lenny)
| Source | Data | Priority |
|--------|------|----------|
| CEO / B2B Partnerships | Payment terms, pricing tiers, wholesale discounts | HIGH |
| OPS / Order Workflow | Factory lead times, status management | HIGH |
| Founders / B2B Orders | Active pipeline, overdue items, factory routing | HIGH |
| Founders / Facility Layout | Room assignments, material flow, QC stations | HIGH |
| OPS / Assembly SOPs | Setup budget, packing materials, dispatch coding | MEDIUM |
| Optimizer / Inventory | JIT model, procurement, PO tracking | MEDIUM |

### Pod A: Command (Claire, Maria)
| Source | Data | Priority |
|--------|------|----------|
| CEO / Energy Blocks | Dan's daily rhythm, task limits per block | HIGH |
| CMO / Notion System | Database structure, sprint cadence, automations | MEDIUM |
| Founders / AI Architecture | Claude project configurations (historical reference) | LOW |

---

## Contradictions Requiring Dan's Confirmation

### CRITICAL — Blocks agent work

| # | Issue | Source A | Source B | Impact |
|---|-------|---------|---------|--------|
| 1 | **Revenue mix** | 40% D2C / 30% B2B / 20% Artist / 10% QC (CEO) | 80% B2B / 20% D2C (Accounts Wizard) | Affects all financial modeling |
| 2 | **COGS** | 45-55% (Financial Reality Check) | 27% (Accounts Wizard) | Patrick can't build pricing model |
| 3 | **Gross margin** | 73% (Accounts Wizard) | 51% (projection) | Same as above |
| 4 | **Mission statement** | "Empower creators and brands through friction-free design-to-product experiences" (Business Overview) | "Empower creators and fans with expressive, collectible merchandise" (Creative Guide) | Sean/Joanna need one canonical version |
| 5 | **Brand tone** | "Creative, community-first, tech-enabled, design innovation" (Business docs) | "Bold, playful, culturally sharp, creative-first" (Creative docs) | Same — which voice are we building? |
| 6 | **Amoeba order count** | 3,585 pieces | 3,905 pieces (other reference) | 13% variance — ops data integrity |

### IMPORTANT — Needs clarification but doesn't block immediately

| # | Issue | Question | Impact |
|---|-------|----------|--------|
| 7 | **YDS/TPL relationship** | Shared inventory? Shared Fynd store? Legal entity overlap? | Tobi can't build without knowing scope |
| 8 | **B2B in relaunch scope?** | Active B2B pipeline exists — do we surface it on theproductlab.in? | Jenna, Kurt, Tobi need to know |
| 9 | **Team status (Muskan, Sara, Kalpana, Anthony)** | These names appear in ops docs from mid-2025. Are any still active? | Raj, Tobi need current state |
| 10 | **Amazon/Swiggy plans** | Q1 2026 was the target for Amazon launch. Status? | Nik needs to know channel scope |
| 11 | **Notion vs. Airtable** | Both are documented as operational systems. Which is current? | Tobi, Claire need to know what to build on |
| 12 | **IG strategy execution** | June 2025 IG strategy proposed but never confirmed as executed. Any learnings? | Rachel, Casey need to know what was tried |
| 13 | **Font "Webly Sleek"** | Referenced in visual guide but may not be a real font. What was intended? | Sean, Julie need clarity for design system |
| 14 | **"El Patio Flagship"** | Referenced in audience segments but not defined anywhere. What is it? | Jenna needs to know if it's in scope |
| 15 | **Campus ambassadors** | Referenced in card statement campaign. Was this tried? Any contacts? | Nik, Rachel for launch seeding |

---

## Incoming Data Protocol

Dan has indicated more data is coming. To maintain order:

### For each new data drop:
1. **Maria** catalogs the files — what's new vs. what overlaps with existing data
2. **Harley** maps new data to receiving agents
3. **Contradictions** get added to the table above and flagged for Dan
4. **This artifact gets updated** with new entries

### Data we're still expecting (based on gaps identified):
- [ ] Current product catalog with live pricing
- [ ] Current Instagram analytics / social metrics
- [ ] Airtable base access or exports (for live data validation)
- [ ] Fynd Commerce current state (what's live now)
- [ ] Any campaign results or post-mortems from 2025
- [ ] Artist roster details (names, portfolios, status)
- [ ] Customer data (email list, WhatsApp contacts)
- [ ] Photography / visual assets inventory

---

## Next Steps

1. **Dan reviews contradictions table** (items 1-15 above) — resolves or deprioritizes
2. **Maria consolidates overlapping data** into single source-of-truth docs in `knowledge/`
3. **Agents receive their mapped data** as part of Phase 1 briefings
4. **New data drops** get processed through the protocol above
