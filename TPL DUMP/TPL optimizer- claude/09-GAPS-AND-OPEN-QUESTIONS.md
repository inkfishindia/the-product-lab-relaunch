# TPL Knowledge Base — Gaps, Open Questions & Next Steps

> **Last Updated**: 2026-03-20
> **Purpose**: Track what's missing, contradictions found, and items needing resolution

---

## Search Audit

The following keyword domains were searched exhaustively across this project's conversation history. All returned the same single conversation:

| Search Domain | Keywords Used | Unique Results |
|---------------|--------------|----------------|
| Business overview | "TPL The Product Lab business overview" | 1 conversation |
| Brands | "YDS brand products candles fragrance" | Same conversation |
| Team/People | "Dan founder team members roles" | Same conversation |
| Notion | "Notion database schema workspace" | Same conversation |
| Financials | "pricing revenue financial model costs" | Same conversation |
| Automation | "automation workflow Softr Make Zapier integration" | Same conversation |
| Manufacturing | "factory manufacturing production process" | Same conversation |
| E-commerce | "WooCommerce online store ecommerce website" | Same conversation |
| Partnerships | "artist collaboration brand partnership" | Same conversation |
| AI/Skills | "prompt engineering skill Claude AI tools" | Same conversation |
| Strategy | "GTM go-to-market strategy launch plan" | Same conversation |
| Operations | "retail store order BIN management production" | Same conversation |
| Location | "Mysuru India Bangalore operations" | Same conversation |
| Tech | "Supabase database API backend" | Same conversation |
| Skills | "skill builder custom skill creation" | Same conversation |

**Conclusion**: This project has **1 conversation** in its history. Richer business details (brands, financials, team, strategy) likely exist in conversations outside this project scope.

---

## Critical Gaps by Domain

### 🔴 HIGH PRIORITY — No Data Available

| Gap | Impact | How to Resolve |
|-----|--------|----------------|
| **YDS (Your Daily Scent) brand details** | Cannot document brand strategy, products, positioning | Share YDS conversations or documents |
| **Product catalog / product range** | Don't know actual products, categories, SKUs | Export from Airtable Base 4: Products Range |
| **Financial data** | No pricing, revenue, margins, COGS documented | Share financial discussions or models |
| **Team roster & org chart** | Don't know who does what | Share team data or Airtable Users table |
| **Factory locations & details** | Don't know how many factories, where, capacity | Export from Airtable Base 4: Factory table |
| **Customer data** | No client names, segments, or LTV data | Share client discussions or export from Airtable |
| **Notion workspace structure** | Referenced but no schema documented | Search Notion via MCP or share structure |

### 🟡 MEDIUM PRIORITY — Partial Data / Inferred

| Gap | What We Have | What's Missing |
|-----|-------------|----------------|
| **WooCommerce ↔ Airtable sync** | Know they're connected (Base 7 has Woocom tables) | Sync mechanism (Zapier? Make? Pipedream? Custom?) |
| **Softr apps** | Know Softr is connected (MCP server) | What apps/portals exist, who uses them |
| **Automation layer** | Pipedream + Rube connected | Specific automations, triggers, workflows |
| **BIN Management details** | Know it exists in Base 5 | BIN code format, stage definitions, lifecycle |
| **Intelligent Alerts System** | Know it exists in Base 5 | What triggers alerts, who receives them, channels |
| **Performance Intelligence Engine** | Know it exists in Base 5 | What metrics tracked, how calculated |
| **Status Manager definitions** | Know every base has one | Actual status values, sequences, transitions |
| **Artist collaboration model** | Referenced in conversation | Specific artists, terms, product lines |

### 🟢 LOW PRIORITY — Nice to Have

| Gap | Notes |
|-----|-------|
| Airtable field-level schema | We have tables but not individual field names/types |
| Historical order volume | Trends, seasonality, growth rates |
| Marketing channels & spend | Campaign details, ad platforms, budgets |
| Competitor landscape | Market positioning data |
| Supplier details | Specific manufacturer names, MOQs, lead times |
| Quality metrics | Defect rates, return rates, QC pass rates |

---

## Potential Contradictions / Items to Verify

| Item | Observation | Resolution Needed |
|------|-------------|-------------------|
| Customer tables are duplicated | IF Clients Synced (Base 5), TPL Retail Customer (Base 6), All Clients (Base 2), WooCommerce customers (Base 7) | Is there a single customer master? How are they synced? |
| Factory table appears in multiple bases | Base 4 (master), Base 5 (linked), Base 7 (linked) | Confirm these are synced copies, not independent tables |
| Parts Inventory exists in multiple bases | Bases 1, 3, 4, 5 | Are these synced or independent? Different purposes? |
| Status Manager in every base | Bases 1-7 all have Status Manager | Are statuses consistent across bases or independent? |
| Master Order Management only in Retail | Base 6 houses the unified view | Why not in a separate base? How do Offline/Online orders connect? |
| Packaging tracked in 2 places | Base 3 (dedicated) + TPL Packaging in Bases 4, 5 | What's the relationship? Sync or duplication? |

---

## Recommended Next Steps

### Immediate Actions
1. **Import conversations from main Claude chat space** — Richer YDS/TPL business discussions likely exist outside this project
2. **Export key Airtable data** — Products Range, Factory, Client tables would fill major gaps
3. **Document Notion workspace** — Use Notion MCP to pull structure

### Documentation Updates Needed
4. **Create YDS brand doc** (`10-YDS-BRAND.md`) — Once brand data is available
5. **Create financials doc** (`11-TPL-FINANCIALS.md`) — Once pricing/revenue data is shared
6. **Create team doc** (`12-TPL-TEAM-AND-ROLES.md`) — Once org data is available
7. **Create customer doc** (`13-TPL-CUSTOMERS.md`) — Once client data is available

### System Documentation
8. **Map all automations** — Catalog Airtable automations, Pipedream flows, Rube workflows
9. **Document Softr apps** — Screenshot and map all Softr portals/apps
10. **Map WooCommerce integration** — Document exact sync mechanism and data mapping

---

## File Manifest

| File | Status | Completeness |
|------|--------|-------------|
| `00-INDEX.md` | ✅ Complete | Will need updating as files are added |
| `01-TPL-BUSINESS-OVERVIEW.md` | ✅ Created | ~40% — needs brand, team, financial data |
| `02-TPL-AIRTABLE-SCHEMA.md` | ✅ Created | ~80% — missing field-level detail |
| `03-TPL-ORDER-MANAGEMENT.md` | ✅ Created | ~70% — missing actual order data/volumes |
| `04-TPL-INVENTORY-AND-PROCUREMENT.md` | ✅ Created | ~60% — missing actual stock data, thresholds |
| `05-TPL-FACTORY-AND-PRODUCTS.md` | ✅ Created | ~50% — missing actual product catalog, factory details |
| `06-TPL-DEPARTMENT-VIEWS-REPORTS.md` | ✅ Created | ~90% — complete recommendations, unknown implementation status |
| `07-TPL-TECH-STACK-AND-INTEGRATIONS.md` | ✅ Created | ~60% — missing specific app/automation details |
| `08-TPL-PROCESS-WORKFLOWS.md` | ✅ Created | ~70% — missing SLAs, exception handling |
| `09-GAPS-AND-OPEN-QUESTIONS.md` | ✅ Created | This file — living document |
