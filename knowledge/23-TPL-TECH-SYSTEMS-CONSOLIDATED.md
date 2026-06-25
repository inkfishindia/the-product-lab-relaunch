<!-- last-updated: 2026-03-20 -->
# 23 — TPL Technology Systems: Consolidated Reference

**Phase:** 1 — Audit
**Producing Agent:** Maria (Research Librarian)
**Date:** 2026-03-20
**Status:** draft
**Reviewer:** Harley

---

## Platform Migration Notice

> **IMPORTANT:** TPL is migrating its e-commerce platform from **WooCommerce to Commerce.com (Fynd)**. WooCommerce is the **legacy platform** — it remains relevant for understanding current data flows, integration patterns, and migration requirements, but all new build decisions are made against Commerce.com/Fynd. Sections below are marked **[LEGACY]** or **[CURRENT]** accordingly.

---

## 1. Current Tech Stack Overview

| Tool | Role | Status |
|------|------|--------|
| **Airtable** | Core operations database — 7 interconnected bases | CURRENT — Active (primary system) |
| **Commerce.com (Fynd)** | E-commerce platform (replacing WooCommerce) | CURRENT — Migration target |
| **WooCommerce** | E-commerce platform | LEGACY — being replaced |
| **Notion** | Strategic HQ, project management, knowledge base, CMO system | CURRENT — Active |
| **Softr (TPL APP)** | Retail/B2B order management app built on Airtable | CURRENT — Active |
| **n8n** | Workflow automation engine | PARTIAL — planned/partially implemented |
| **WhatsApp Business** | Customer communication, order intake, team comms | CURRENT — Active |
| **Shiprocket** | Shipping and dispatch (multi-carrier) | CURRENT — Active |
| **Razorpay** | Payments (UPI, cards, wallets) | CURRENT — Active (WooCommerce-integrated, carries to Fynd) |
| **Google Analytics 4** | Website traffic and conversion tracking | CURRENT — Active |
| **Canva** | Marketing materials and social media design | CURRENT — Active |
| **Figma** | Product design, packaging, UI/UX | CURRENT — Active |
| **Slack** | Team communication | CURRENT — Active (MCP-connected) |
| **Gmail / Google Workspace** | Email and document management | CURRENT — Active |
| **Looker Studio (Data Studio)** | Dashboards and automated reporting | PLANNED — not confirmed active |
| **Claude (Anthropic)** | Content, strategy, decision support | CURRENT — Active |
| **Midjourney** | Creative/image generation | CURRENT — Active |

### Additional Tools (MCP-Connected, Confirmed Active)

The following tools are connected via MCP servers, indicating active use in the Claude workspace:

| Tool | Role |
|------|------|
| **Asana** | Project/task management |
| **Supabase** | Database/backend for custom apps |
| **Vercel** | Web app hosting/deployment |
| **Fireflies** | Meeting transcription |
| **Hugging Face** | AI model access (image generation) |
| **Pipedream** | Automation middleware (hosts Softr + Notion MCP connections) |
| **Rube** | Workflow automation |

### Architecture Principle (Confirmed Jun 15, 2025)

```
Airtable (Operations Data) → Looker Studio (Reports/Dashboards) → n8n (Sync) → Notion (Strategic HQ)
```

Each tool stays in its lane: Airtable as single source of truth for operational data; Looker Studio for heavy visualization; Notion for strategic documentation; n8n for workflow glue.

---

## 2. Airtable — 7-Base Architecture

TPL runs **7 interconnected Airtable bases** forming the operational backbone. Data flows from a master product database through inventory systems into three parallel order channels.

```
┌─────────────────────────────────────────────────────────────┐
│                  TPL AIRTABLE ECOSYSTEM                      │
│                                                              │
│   ┌──────────────────────┐                                   │
│   │ TPL Factory &        │◄── Master Product Database        │
│   │ Products (Base 4)    │                                   │
│   └──────┬───────────────┘                                   │
│          │ Product data syncs to:                             │
│          ▼                                                   │
│   ┌──────────────────┐    ┌──────────────────────┐          │
│   │ TPL Inventory    │    │ TPL Packaging         │          │
│   │ Management (1)   │    │ Inventory (3)         │          │
│   └──────┬───────────┘    └──────────┬───────────┘          │
│          │ Inventory consumed by:     │                      │
│          ▼                            ▼                      │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│   │ Offline      │ │ Online       │ │ Retail        │       │
│   │ Orders (5)   │ │ Orders (7)   │ │ Orders (6)    │       │
│   └──────────────┘ └──────────────┘ └──────────────┘       │
│          │                │                │                 │
│          └────────────────┼────────────────┘                 │
│                           ▼                                  │
│                  ┌─────────────────┐                         │
│                  │ TPL Reminders   │                         │
│                  │ (Base 2)        │                         │
│                  └─────────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

### Base 1: TPL Inventory Management

**Purpose:** Product inventory tracking, stock management, purchase orders.

| Table | Purpose |
|-------|---------|
| Product Inventory | Main inventory tracking — Product ID, SKU, quantity, reorder level |
| Parts Inventory | Individual product parts — Part ID, linked product, stock area, quantity |
| TPL Inventory Usage | Consumption tracking — usage date, parts consumed, order reference |
| Stock Area Management | Physical location tracking — area code, location, capacity |
| Manufacturers | Supplier info — name, contact, lead time |
| Purchase Orders | Procurement tracking — PO number, manufacturer, parts, status, date |

### Base 2: TPL Reminders

**Purpose:** Task reminders, follow-ups, and notifications for the TPL team.

| Table | Purpose |
|-------|---------|
| Internal Reminders | Tasks for internal team — assignee, due date, status |
| Client Reminders | Client-facing tasks and follow-ups |
| TPL Reminders | Calendar integration for scheduling |
| All Clients | Client information directory |
| Users Synced | Team member info — user ID, name, role |
| Status Manager | Status tracking |
| TPL Factory Locations | Manufacturing location directory |

### Base 3: TPL Packaging Inventory

**Purpose:** Packaging materials inventory and usage management — mirrors Base 1 structure but for packaging specifically.

| Table | Purpose |
|-------|---------|
| Parts List | Master catalog of packaging parts |
| Parts Inventory | Detailed packaging inventory with stock area |
| Inventory Management | Usage tracking by order |
| Stock Area Management | Location/warehouse tracking |
| Manufacturers | Packaging suppliers — MOQ, lead time |
| Purchase Orders | Packaging procurement |

### Base 4: TPL Factory & Products

**Purpose:** Master product database — manufacturing info, factory relationships, product specifications. **Source of truth for all product data across the system.**

| Table | Purpose |
|-------|---------|
| Factory | Manufacturing locations — code, name, location, capabilities |
| Factory Teams | Personnel at facilities |
| Product Category | Product categorization hierarchy |
| Products Range | **Master product catalog** — Product ID, SKU, name, category, factory, materials |
| Product Variations | Specific variants — size, color, variant |
| TPL Materials | Raw materials — type, supplier, cost |
| TPL Packaging | Packaging specifications per product |
| Parts Inventory | Component inventory |
| Status Manager | Product status tracking |
| Key Processes & Capabilities | Manufacturing capabilities by factory |

### Base 5: TPL — Offline Orders Management

**Purpose:** In-person and B2B orders, production tracking, and fulfillment. Most complex base — includes production scheduling, BIN management, and intelligence engines.

**Base ID:** `appGElpttVt6nZlHe` | 15 tables | 290+ fields

| Table | Table ID | Purpose |
|-------|----------|---------|
| Offline Orders | `tblEF1T1QjiHu3HeJ` | Master order management — 140+ fields |
| Orders Product Line Item | `tbl0iL9jPlWWdZTMw` | Granular product-level workflow — 150+ fields |
| TPL Products Synced | `tblAG00XINg9MCzyL` | Product catalog synced from Base 4 |
| IF Clients Synced | `tblbd86y3dmYakDDM` | Client database |
| Production Schedule | `tblUGH2mrRpkMe6If` | Factory production timeline |
| BIN Management System | `tblCsz1ekdROTkKqR` | Physical production batch tracking |
| Intelligent Alerts System | `tbladYT56YcK85Bsw` | Automated process alerts |
| Performance Intelligence Engine | `tblsIZQtN87xxuFky` | Performance analytics engine |
| Active Team | `tblfOCGGBIHVW3qb` | Team assignment tracking |
| TPL Factory Synced | — | Factory master data |
| Cancellation & Escalations | `tblZ9Xt38WQTn0ohK` | Exception management |
| TPL Offline Inventory Usage | — | Inventory tracking |
| Stock Area Management | — | Physical stock locations |
| Purchase Orders | — | Procurement |
| Inventory Management | — | Inventory lifecycle |

**Order ID Format:** `IF-OF-XXXXX` (e.g., IF-OF-00412)
**Line Item ID Format:** `IF-OF-XXXXX-ProductType-##` (e.g., IF-OF-00412-KeyChain-01)

**Intelligence Fields (working):**
- `WORKFLOW_STAGE_ULTRA_AUTO` — 8-stage automated detection
- `EXECUTIVE_PRIORITY_SCORE` — risk-based priority scoring
- `DELAY_RISK_INTELLIGENCE` — proactive delay prediction
- `NEXT_CRITICAL_ACTION_AUTO` — next action recommendation
- `RESOURCE_BOTTLENECK_ALERT` — bottleneck flagging
- `BIN_CODE_GENERATED` — automatic bin code creation

**Known Data Quality Issues:**
- `MATERIALS_ALLOCATED` — only 35% compliance
- `Unit_Price` — 20% of records missing
- `QC_QUANTITY_PASSED/FAILED` — often empty
- `CUSTOMER_FEEDBACK` — 60% empty
- `Line_Total` formula needs fix (Qty × Price)

> See `TPL DUMP/TPL OPS - CLAUDE/06_TPL_AIRTABLE_DATABASE_SCHEMA.md` for complete field-level detail including all field IDs, formulas, and status flags.

**Role-Based Views:**
| View | Assigned To | Filter |
|------|-------------|--------|
| TPL-x-Dan | Dan (CEO) | Status = Lead OR Confirmed |
| TPL-x-Muskan | Muskan | Status = Production, Processing, Shipped, Delivered |
| TPL-x-Kalpana | Kalpana | Status = Packed |
| TPL-Processing Queue | Ops | Status = Processing |
| TPL-Escalated & Hold | Dan | Status = Escalated OR On Hold |

### Base 6: TPL Retail Orders

**Purpose:** Retail store orders, inventory, and customer management.

**Known Airtable ID:** `appfUSkhp5PeDFuHr`

| Table | Purpose |
|-------|---------|
| Retail Store Orders | Main order tracking |
| TPL RSO Product Line Item | Products within retail orders |
| TPL Retail Customer | Customer information |
| Master Order Management | **Cross-system order unification** — links Offline, Online, Retail orders into single view |
| Retail Product Variations | Product variant tracking |
| Retail Products | Product catalog for retail |
| Status Manager | Order status |
| Store Order Inventory Usage | Inventory consumption tracking |

### Base 7: TPL Online Orders [LEGACY — WooCommerce integration, migrating to Fynd]

**Purpose:** E-commerce orders via WooCommerce, online product listings, digital fulfillment.

**Known Airtable ID:** `appD9h00GRcMVhCIc`

| Table | Table ID | Purpose |
|-------|----------|---------|
| Online Orders Line | — | Imported WooCommerce order data |
| Order List | — | Master order tracking |
| Line | — | Individual order line items |
| Status Manager | — | Order status |
| Online Order Coupon Code | — | Discount tracking |
| Product Variation | — | Variant tracking |
| Category | — | Product category management |
| TPL Product Sheet | — | Product data for online store |
| Factory | — | Factory info for online orders |
| Woocom Products | `tblcVobTtV3JHmC22` | WooCommerce product data |
| Woocom Products Variation | `tbl8pMrws4wJmHphn` | WooCommerce variant data |

**Migration Note:** When TPL moves to Commerce.com (Fynd), Base 7 will need to be rebuilt or re-integrated to connect Fynd's order data. Field-mapping work required.

### Cross-Base Data Flows

```
Product Data:
  Factory & Products (Base 4) → [sync] → Inventory (1), Offline (5), Retail (6), Online (7)

Inventory Consumption:
  Inventory Management (Base 1) + Packaging (Base 3) → consumed by orders in Bases 5, 6, 7

Order Processing:
  Order Entry [any base] → Inventory Allocation → Production Schedule (Base 5)
    → BIN Management (Base 5) → Master Order Management (Base 6) [unified view]

Task/Reminder Management:
  TPL Reminders (Base 2) → Internal Reminders → Users Synced / Active Team
                         → Client Reminders → All Clients / IF Clients Synced
```

---

## 3. WooCommerce [LEGACY — Being Replaced]

WooCommerce is the current live e-commerce platform at theproductlab.in. It is being replaced by Commerce.com (Fynd). Documentation here is retained for migration reference.

**Integration Architecture:**
```
WooCommerce → Webhook → n8n → Airtable Base 7 (Online Orders)
```

**API Details:**
- Endpoint: `/wp-json/wc/v3/orders`
- Authentication: Consumer Key + Consumer Secret
- Data: Orders from last 24 hours (daily pull)

**Active WooCommerce Plugins (Legacy):**
- Core: WooCommerce Subscriptions, Bookings, Product Add-Ons, Quick View, Wishlist
- Performance: WP Rocket, Smush, WP-Optimize
- SEO & Marketing: Yoast SEO Premium, MonsterInsights, OptinMonster

**Payment Integration:** Razorpay (UPI, cards, wallets) — integrated directly with WooCommerce.

**Mobile Traffic Distribution (from WooCommerce-era data):**
- Mobile (320–768px): 70% of traffic
- Tablet (768–1024px): 15%
- Desktop (1024px+): 15%

**Known Integration Blockers (as of last documented state):**
- WooCommerce admin access needed for webhook setup
- "Online orders line (imported)" table permissions restricted in Airtable
- Line item → product SKU linking not yet fully implemented

---

## 4. n8n Automation Workflows

**Current State:** Partially implemented — approximately 20% of planned workflows active. Status of individual workflows varies between "designed," "planned," and "active."

### Documented Workflows

| Workflow | Trigger | Status | Actions |
|----------|---------|--------|---------|
| Order Processing (Core) | New WooCommerce order webhook | Planned/partial | Extract order + artist attribution → validate commission → check inventory → create Airtable record → update Notion dashboard → send WhatsApp confirmation → schedule follow-up |
| Daily Performance Update | Daily 9:00 AM | Planned | Pull WooCommerce sales (last 24h) → calculate metrics → update Notion → check alerts → notify Dan via Slack |
| Weekly CEO Report | Monday 8:00 AM | Planned | Aggregate week's data → calculate variance → generate trend analysis → create Notion report → send WhatsApp summary to Dan |
| Artist Performance Monitoring | Weekly, Sundays | Planned | Calculate artist revenue → update Artist Ecosystem DB → flag top/bottom performers → send appreciation messages |
| B2B Pipeline Management | Tuesdays + Fridays | Planned | Review pipeline stages → identify stale opportunities (>7 days inactive) → generate follow-up reminders → send pipeline summary |
| Inventory Reorder | Stock below reorder point | Planned | Sale recorded → stock updated → reorder trigger → supplier notified (JIT policy: 45-day max stock) |
| Customer Journey Automation | Various triggers | Planned | Welcome series (5 emails over 2 weeks) → Abandoned cart (Day 0, 2, 5) → Post-purchase sequence |
| Bottleneck Alert | Status unchanged >2 days | Planned | Alert to ops manager |
| AI Insights Sync | Data Studio update | Planned | Push key metrics from Data Studio to Notion |

### Integration Points

```
WooCommerce → Webhook → n8n → Airtable
Airtable → n8n → Looker Studio (planned)
Looker Studio → n8n → Notion (planned)
n8n → WhatsApp Business (customer/team notifications)
```

**Note on Automation Middleware:** Pipedream appears to be in use as additional automation middleware (hosts Softr and Notion MCP connections). Rube.app is also connected. Zapier and Make are not confirmed but are common alternatives for WooCommerce↔Airtable sync.

---

## 5. Softr / TPL APP

**Purpose:** Custom-built, no-code order management application for retail and B2B operational use. Built on top of Airtable (Bases 5 and 6) with a Softr front-end layer.

**Primary Use Cases:**
- Retail store order management (in-store)
- B2B offline order entry and tracking
- Team-facing dashboards for daily operations

**User Roles and Permissions:**
| Role | Assigned To | Access |
|------|-------------|--------|
| Admin | Dan | Full access |
| Manager | Muskan / Hajira | Order management, coordination |
| Operations | Ops team | Order processing views |
| Production | Production team | Factory/production status |
| Assembly | Assembly team | Packing/assembly queue |

**Backend:** Airtable (reads/writes directly to Offline Orders Base 5 and Retail Orders Base 6).

**MCP Connection:** Softr is connected via `mcp.pipedream.net` — indicating active integration in the Claude workspace.

---

## 6. Notion System

**Purpose:** Strategic command center, project management, SOPs, team coordination, and marketing/content planning.

**TPL Strategic Command Center URL:**
`https://www.notion.so/TPL-Strategic-Command-Center-20de9fa62076816284f2f7f8e1984deb`

**CMO Page URL:**
`https://www.notion.so/CMO-20de9fa62076804b9d61dc7e2cf7da78`

### Core 7 Databases (CMO / Strategic System)

| Database | Purpose |
|----------|---------|
| Master Strategy Dashboard | Single source of truth for strategic progress — Cultural Momentum Score, Initiative Progress |
| Strategic Phases Database | Phase planning — Foundation / Momentum / Leadership phases with timelines and success criteria |
| Weekly Sprints Database | Sprint management — focus themes, goals, team capacity, retrospectives |
| Task Management Database | All tasks linked to sprints and initiatives — priority levels, owners, due dates |
| Cultural Intelligence Database | Market/audience insights — Family Dynamics, Creator Trends, Community Sentiment, Regional Patterns |
| Content Calendar Database | Content planning — Blog, Social, Video, Workshop, Event across cultural themes |
| Performance Tracking Database | Metric tracking — Cultural, Community, Business, Operational metrics with targets |

### Additional Marketing Databases (5)

| Database | Purpose |
|----------|---------|
| Campaign Management | Campaign tracking with cultural focus and budget |
| Content Calendar (Marketing) | Content types: Creator Story, Tutorial, BTS, Product Showcase, Community Spotlight, Industry Insight |
| Creator Community Database | Creator relationships — discipline, influence, collaboration history |
| Marketing Performance Database | Metrics by category: Cultural, Community, Commerce, Channel |
| Cultural Intelligence (Marketing) | Marketing-specific insights |

### Known Page IDs

| Page ID | Page Name | Status |
|---------|-----------|--------|
| `200e9fa620768008862bcb801dbcd936` | TPL Operations | Exists |
| `20fe9fa6207680dfa17ddffff5d31285` | Productivity System | Exists |
| `20fe9fa6207681f1a4dad3f856a66e0d` | Time Blocks Database | Exists |
| `20de9fa62076816284f2f7f8e1984deb` | TPL Strategic Command Center | Exists |
| `20de9fa62076804b9d61dc7e2cf7da78` | CMO Page | Exists |
| `20de9fa6207681b1b1baef10c5306c3b` | Campaign Management DB | Exists |
| `20de9fa6207681f68f8cd9cc2a8bdaab` | Content Calendar DB | Exists |

### Notion Automations

| Automation | Trigger | Action |
|------------|---------|--------|
| Weekly Sprint Creation | Every Friday | Auto-generate next week's sprint template |
| Task Priority Scoring | New task added | Auto-calculate cultural impact |
| Performance Dashboard Updates | Every Monday AM | Auto-refresh key metrics |
| Cultural Insight Alerts | High-impact insight added | Auto-notify Dan |

### Notion ↔ Airtable Integration

- Data flows from Airtable (operations) into Notion (strategic reporting)
- Instagram Analytics → Performance DB
- WhatsApp Business → Cultural Intelligence DB
- Email Analytics → Performance DB
- n8n planned as the sync layer between Airtable/Looker Studio and Notion

**Known Limitation:** Claude cannot directly access or modify the Notion workspace — content must be exported/shared manually or via API.

---

## 7. Order Management Channel Summary

| Channel | Platform | Tracking System | Notes |
|---------|----------|-----------------|-------|
| Online D2C | WooCommerce → Commerce.com (Fynd) | Airtable Base 7 | Migrating |
| Retail (in-store) | TPL APP (Softr) | Airtable Base 6 | Active |
| B2B / Offline | TPL APP (Softr) | Airtable Base 5 | Active — most complex |
| Shipping | Shiprocket (multi-carrier) | Automated dispatch + tracking | Active |

---

## 8. Evidence Gaps

The following are known unknowns — not confirmed in any source document:

- **Commerce.com/Fynd integration plan:** No documentation found on how Airtable Base 7 will be re-mapped to Fynd. Migration field-mapping work is unconfirmed.
- **n8n actual implementation status:** Most workflows are documented as designed/planned, not confirmed active. Actual running workflow count is unknown.
- **WooCommerce → Airtable sync mechanism:** Whether Zapier, Make, Pipedream, or custom webhook is handling live sync is not confirmed.
- **Supabase usage:** What databases/tables exist in Supabase is undocumented.
- **Vercel deployments:** What is currently deployed on Vercel is undocumented.
- **Asana workspace structure:** Active projects/workspaces not documented.
- **Rube workflows:** What Rube automations are running is undocumented.
- **Looker Studio:** Described as planned in one source, not confirmed as active.
- **Mailchimp status:** Listed in one source as "TBD" — whether Klaviyo or Mailchimp will be used for email/SMS is unresolved.
- **Data duplication between Notion and Airtable:** Multiple sources flag that some data is tracked in both systems — deduplication strategy not documented.

---

## Sources

| Source File | Origin | Reliability |
|-------------|--------|-------------|
| `TPL DUMP/TPL CEO - claude/05_TPL_Technology_Automation_Database.md` | CEO Claude project export | Medium — AI-generated summary of conversations; designed/aspirational content mixed with confirmed |
| `TPL DUMP/TPL CEO Strategic Command Center-claude/06_TPL_Technology_Stack_and_Automation.md` | CEO Strategic Command Center export | Medium — includes confirmed architecture decision (Jun 15, 2025) and known Airtable IDs |
| `TPL DUMP/TPL FOUNDERS OFFICE FILES - CLAUDE/10-TECHNOLOGY-STACK.md` | Founders Office export | Medium — includes confirmed Airtable base for B2B ops and Softr user roles |
| `TPL DUMP/TPL optimizer- claude/07-TPL-TECH-STACK-AND-INTEGRATIONS.md` | Optimizer project export, last updated 2026-03-20 | High — most current; based on live MCP server connections, confirms active tools |
| `TPL DUMP/TPL OPS - CLAUDE/06_TPL_AIRTABLE_DATABASE_SCHEMA.md` | Ops Claude project export | High — field-level Airtable schema with actual field IDs; directly extracted from live base |
| `TPL DUMP/TPL optimizer- claude/02-TPL-AIRTABLE-SCHEMA.md` | Optimizer project export, last updated 2026-03-20 | High — 7-base architecture diagram and table-level detail; best architectural overview |
| `TPL DUMP/TPL CMO - CLAUDE/07_TPL_NOTION_SYSTEM.md` | CMO Claude project export | Medium — Notion system is designed/documented but implementation completeness unknown |
