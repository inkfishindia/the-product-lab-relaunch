# THE PRODUCT LAB — TECHNOLOGY, AUTOMATION & AI

## Core Tech Stack

| Layer | Tool | Purpose |
|---|---|---|
| E-commerce | WooCommerce | Website storefront, product catalog, orders |
| CRM/Data | Airtable (30+ bases) | Orders, customers, inventory, production, artists |
| App Frontend | Softr (tpl.softr.app) | Internal team dashboards, client portals |
| Project Mgmt | Notion | Docs, team wikis, SOPs, knowledge base |
| Automation | n8n (self-hosted) | Workflow automation, AI agents |
| AI Strategy | Claude API | Content, strategy, optimization, agents |
| Communication | Slack, Email, WhatsApp | Team and customer communication |
| Design | Canva, Figma, Adobe Suite, CorelDRAW | Product design, marketing materials |
| Payments | WooCommerce gateways | Online payments |

---

## WooCommerce Architecture

### Product Structure Decision
- **Using**: WooCommerce Simple Products (not Variable Products)
- **Rationale**: Better for JIT inventory, artist commissions, SEO, individual stock control
- **Mapping**: Each Airtable Design-Product-Variation record = one WooCommerce Simple Product

### WooCommerce Database Mapping
```sql
wp_posts          → Product records (post_type = 'product')
wp_postmeta       → SKU, price, stock, attributes
wp_terms          → Categories, tags, attributes
wp_term_taxonomy   → product_cat, product_tag, pa_[attribute]
wp_term_relationships → Product-to-category assignments
```

### Essential WooCommerce Plugins
1. AutomateWoo — Marketing automation (₹3K/year)
2. Omnisend — Email campaigns (₹3K/month)
3. Cart Abandonment Recovery — Free
4. Product Add-ons — Customization options
5. YITH Wishlist — Customer engagement (free)
6. PDF Invoices & Packing Slips — Free
7. WP Inventory Manager — (₹1.5K/year)
8. WooCommerce Boost Sales — Upsells
9. GetButton — Chatbot (free)
10. WooCommerce Instagram — Shopping integration

---

## Airtable System Architecture

### Data Flow Between Bases
```
TPL Factory & Products (Master)
    ↓
TPL Inventory Management
    ↓
┌─────────────┬──────────────┬─────────────┐
│ TPL Offline  │ TPL Online    │ TPL Retail   │
│ Orders       │ Orders (WC)   │ Orders       │
└──────┬──────┴──────┬───────┴──────┬──────┘
       └─────────────┼─────────────┘
                     ↓
         Master Order Management
                     ↓
         Production Schedule
                     ↓
         BIN Management System
```

### Key Identifiers Across System
- **Product ID/SKU** — Links products across all bases
- **Order ID** — Unique per system (offline/online/retail)
- **Factory Code** — Manufacturing facility identifier
- **Client/Customer ID** — CRM tracking
- **BIN Code** — Production tracking

### Order-to-Fulfillment Workflow
1. Order entry in respective system (offline/online/retail)
2. Inventory allocation
3. Production scheduling
4. Manufacturing at Ink Fish facility
5. Quality control
6. Packaging
7. Shipping

---

## n8n Workflow Architecture

### Priority Workflows

#### 1. Order Fulfillment Automation (Critical)
```
Trigger: WooCommerce webhook (new order)
→ Standardize order data (normalize across channels)
→ Create/update Airtable record
→ Route to production queue
   → If custom/artist: route to customization workflow
   → If standard: route to Ink Fish standard production
→ Customer notification (WhatsApp + Email)
→ Expected: 70% reduction in manual processing
```

#### 2. Inventory & Stock Management
```
Trigger: Product stock level change
→ WooCommerce inventory webhook → Airtable sync
→ If stock < 3: Slack/WhatsApp alert
→ Auto-create production order in Airtable
→ 45-day stock policy compliance check
→ Artist product low-stock notification
→ Expected: 40% reduction in overstock
```

#### 3. Customer Lifecycle Automation
```
Triggers: Multiple (order complete, cart abandoned, signup)
→ Welcome sequence
→ Post-purchase follow-up
→ Abandoned cart recovery
→ Drop launch broadcasts
→ Re-engagement campaigns
```

#### 4. AI Customer Service Agent
```
Trigger: Chat widget on theproductlab.in
→ n8n webhook captures visitor data
→ Claude API intent detection
→ Airtable data retrieval (customer/order info)
→ Claude generates personalized reply
→ Action execution (update CRM, create tickets, escalate)
→ Session management (context preservation)
→ Expected: 80% auto-resolved, 3-min response time, ₹9L annual savings
```

#### 5. Financial Tracking & Reporting
```
Daily: Cash position report
Weekly: Revenue vs target dashboard
Monthly: Full P&L with commentary, cash flow, balance sheet
```

### n8n Technical Configuration
- **Chat Model**: Anthropic Chat Model Node (Claude via LangChain integration)
- **Alternative**: HTTP Request Node for direct Claude API calls
- **Memory**: Buffer memory, Redis-backed, or vector stores
- **Tool Nodes**: Airtable operations, WooCommerce API, WhatsApp Business API, Email
- **Agent Pattern**: AI Agent node → Tools (sub-nodes) → Memory → Output

---

## Notion Workspace Architecture

### Core Structure (4 Interconnected Databases)
1. **Projects Hub** — Master database with velocity tags (SPRINT/RUN/WALK)
2. **Task Pipeline** — All tasks linked to projects, with ownership & follow-up
3. **Team Dashboard** — Real-time accountability per person
4. **Context Board** — Dan's daily mission control for mode-switching

### Project Velocity Classification
| Speed | Timeline | Examples |
|---|---|---|
| ⚡ SPRINT | 2-7 days | No Borders, Spirit caps |
| 🏃 RUN | 1-4 weeks | Fosite collaboration, sample development |
| 🚶 WALK | 1-3 months | Strategic partnerships, new product lines |

---

## Claude Integration Points

### Current Usage
- Content generation and strategy
- Business operations analysis
- Prompt engineering for specialized roles
- Financial modeling and analysis
- System architecture design

### Claude Projects (TPL-Specific)
| Project | Focus |
|---|---|
| TPL Strategic Operator | AI co-founder & business intelligence |
| TPL Accounts Wizard | CFO / financial expert |
| TPL Operations Manager | Daily task management |
| Chief Business Operations Officer | CEO-level strategic ops |
| COO Operations Leadership | Full operational oversight |
| AirForge Architect | Airtable database architecture |
| Notion Architect | Notion workspace management |

### AI Agent Architecture (DanOS Concept)
- **Primary Agent**: "The Co-Founder" — Strategic orchestrator
- **Sub-Agents**:
  1. Founder Agent (/founder mode) — Strategy, ops, financials
  2. Creative Agent (/flow mode) — Design, drops, artist work
  3. Operations Agent — Production, inventory, fulfillment
  4. Growth Agent — Marketing, sales, partnerships

---

## Softr App (tpl.softr.app)

### Pages/Modules
| Page | Function |
|---|---|
| /products | Product catalog browsing |
| /inventory | Inventory management dashboard |
| /online-orders | E-commerce order tracking |
| /offline-orders | Offline order management |
| /clients-details | Client CRM with resource buttons |

### Resource Buttons (per client record)
- WhatsApp direct link
- Google Drive project folder
- Softr details page
- Website link
- Google Business link

---

## ChatGPT Custom GPT (Planned/Explored)

### Product Lab GPT Configuration
- Upload: Business manual, product catalogs, brand guidelines, customer personas, process docs
- Actions: API endpoints on theproductlab.in for product info, order queries, design portfolio
- Integration: WooCommerce, Airtable via Actions/API
- Deployment: GPT Store (public) or private team access
