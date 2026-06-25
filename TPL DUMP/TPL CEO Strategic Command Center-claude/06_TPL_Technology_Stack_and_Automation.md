# 06 — THE PRODUCT LAB: TECHNOLOGY STACK & AUTOMATION

---

## CURRENT TECH STACK

| Tool | Role | Status |
|------|------|--------|
| **Notion** | Strategic HQ, project management, team coordination, knowledge management | Active — being built out |
| **Airtable** | Single source of truth for all operational data (products, factory, sales, orders) | Active |
| **WooCommerce** | D2C e-commerce website | Active / Launching |
| **WhatsApp Business / API** | Customer communication, order intake | Active |
| **n8n** | Workflow automation engine | Planned / Partial |
| **Data Studio (Looker Studio)** | Real-time dashboards, operational metrics, automated reports | Planned |
| **Claude AI** | Content generation, decision support, strategic analysis | Active |
| **Google Sheets / Excel** | Backup manual tracking | Fallback |

---

## ARCHITECTURE DECISION (Confirmed Jun 15, 2025)

### Separation of Concerns
```
Airtable (Operations Data) → Data Studio (Reports/Dashboards) → N8N (Sync) → Notion (Strategic HQ)
```

| Platform | Focus Areas |
|----------|-------------|
| **Notion** | Project planning, team management, strategic documentation, knowledge management, process optimization, growth planning |
| **Data Studio** | Daily operational dashboards, revenue/performance metrics, customer analytics, channel performance, real-time alerts |
| **Airtable** | Single source of truth — products, inventory, orders, customers, production |
| **n8n** | Sync key insights from Data Studio back to Notion; automate workflows |

### Benefits of This Architecture
- Data Studio handles heavy visualization loads better than Notion
- Each tool optimized for its core strength
- Data Studio provides faster, more sophisticated reporting
- Notion becomes pure strategic command center

---

## AIRTABLE DATABASE ARCHITECTURE

### Known Bases
| Base ID | Name/Purpose |
|---------|-------------|
| `appD9h00GRcMVhCIc` | E-commerce / WooCommerce orders |
| `appfUSkhp5PeDFuHr` | Retail orders |
| (unknown) | Products, Factory, Sales (confirmed existing) |

### Recommended 3-Base Structure
| Base | Tables |
|------|--------|
| **Base 1: Business Performance Hub** | Revenue Tracking (daily/weekly/monthly), Channel Performance (website, WhatsApp, retail), Product Category Performance, Customer Acquisition Cost & LTV |
| **Base 2: Operations Control Center** | Order Management & Fulfillment, Inventory Status (JIT monitoring), Artist Collaboration Pipeline, Quality Control Tracking |
| **Base 3: Growth Intelligence** | Customer Segmentation & Behavior, Marketing Campaign Performance, Partnership Pipeline (brand collaborations), Content & Drop Performance |

### Known Table IDs
| Table ID | Table Name | Base |
|----------|------------|------|
| `tblcVobTtV3JHmC22` | Simple Products | appD9h00GRcMVhCIc |
| `tbl8pMrws4wJmHphn` | Product Variations | appD9h00GRcMVhCIc |
| — | Order-list | appD9h00GRcMVhCIc |
| — | Online orders line (imported) | appD9h00GRcMVhCIc |
| ❌ | ~~xline~~ | INVALID — does not exist |

---

## NOTION WORKSPACE ARCHITECTURE

### Known Page IDs
| Page ID | Page Name | Status |
|---------|-----------|--------|
| `200e9fa620768008862bcb801dbcd936` | TPL Operations | Exists — was empty (May 2025), later populated |
| `20fe9fa6207680dfa17ddffff5d31285` | Productivity System | Exists — not accessible externally |
| `20fe9fa6207681f1a4dad3f856a66e0d` | Time Blocks Database | Exists |
| `1f1e9fa6207681d0bc8ae84e43e88f89` | Unknown database | Referenced Jun 2025 |

### Recommended 5-Database Notion Architecture
1. **Products Database** — catalog, SKUs, pricing, status
2. **Artists Database** — relationships, commissions, performance
3. **Orders Database** — multi-channel tracking, fulfillment status
4. **Production Database** — batches, QC, scheduling
5. **Finance Database** — revenue, costs, P&L

### Notion Dashboard Levels (from CEO Command Center)
| Level | Purpose | Time |
|-------|---------|------|
| Level 1: Executive Summary | 30-second overview | Revenue, orders, efficiency, quality, NPS, cash flow |
| Level 2: Operational Metrics | 2-minute deep dive | Production, fulfillment, financial pulse |
| Level 3: Strategic Intelligence | 5-minute analysis | Trends, artist ecosystem, operational alerts |

---

## WOOCOMMERCE INTEGRATION

### Integration Architecture
```
WooCommerce → Webhook → n8n → Airtable
```

### Required Setup
1. **Webhook endpoint** configuration in WooCommerce
2. **n8n workflow** to capture webhook data
3. **Field mapping:** WooCommerce order → Airtable records
4. **Line items creation** in "Online orders line (imported)"
5. **Inventory reduction** automation on order creation

### Current Blockers
- WooCommerce admin access needed for webhook setup
- "Online orders line (imported)" table permissions restricted
- Line item → product SKU linking not yet implemented

---

## N8N AUTOMATION WORKFLOWS

### Planned Automations
| Workflow | Trigger | Action |
|----------|---------|--------|
| Order Processing | WooCommerce webhook | Create Airtable record, allocate inventory |
| Inventory Alert | Stock below reorder point | WhatsApp notification to team |
| Daily Report | Scheduled (9 AM) | Generate and send performance summary |
| Weekly Summary | Scheduled (Monday 8 AM) | Compile weekly metrics |
| Monthly Review | Scheduled (1st of month) | Generate strategic review |
| Customer Communication | Order status change | WhatsApp/email status update |
| Bottleneck Alert | Status unchanged >2 days | Alert to ops manager |
| AI Insights Sync | Data Studio update | Push key metrics to Notion |

---

## AI INTEGRATION ROADMAP

### Phase 1: Current (Active)
- Claude AI for strategic analysis and content generation
- Manual prompt-based decision support

### Phase 2: Near-term (6 months)
| Capability | Tool |
|------------|------|
| Conversational Commerce | WhatsApp AI bot |
| Product Recommendations | AI-driven suggestion engine |
| Content Automation | AI product descriptions, email campaigns, social posts |
| Demand Forecasting | Statistical + AI models |
| Bottleneck Detection | Automated monitoring with AI rules |

### Phase 3: Medium-term (6-12 months)
| Capability | Tool |
|------------|------|
| Visual AI | Customer image upload for style matching |
| Predictive Analytics | Demand forecasting for artist drops |
| Personalization Engine | Dynamic website per user behavior |
| Quality Control | Computer vision for defect detection |

### Phase 4: Long-term (12-24 months)
| Capability | Tool |
|------------|------|
| Autonomous Reordering | AI-managed inventory with supplier integration |
| Voice Commerce | Alexa/Google integration |
| AR/VR Preview | Virtual product try-on |
| Dynamic Fulfillment Routing | AI-optimized logistics |

---

## DATA STUDIO / LOOKER STUDIO SETUP

### Core Dashboard Components
- Real-time sales ticker
- Product performance heatmap
- Inventory status visualization
- Customer acquisition funnel
- Revenue trends with forecasting

### Data Sources
- WooCommerce Orders API
- WhatsApp Orders tracking
- In-store POS system
- Airtable as central database

### Report Automation
| Report | Frequency | Time |
|--------|-----------|------|
| Daily Report | Daily | 9:00 AM |
| Low Stock Alert | Real-time | Immediate |
| Weekly Summary | Weekly | Monday 8:00 AM |
| Monthly Strategic Review | Monthly | 1st of month |

---

## AUTOMATION SPECIALIST BRIEF (Hiring)

| Field | Detail |
|-------|--------|
| Position | Business Process Automation Specialist |
| Engagement | Project-based, 2-3 months initial |
| Budget | ₹50K-80K project fee |
| Location | Remote with periodic Bangalore visits |
| Core Stack | Notion + Airtable + n8n + WhatsApp API + AI |
| Success Metric | 6-8 hours daily admin → <1 hour |
| Scale Target | 200 orders/month → 1,000+ orders/month |
| Timeline | 12 weeks, 4 phases |
| Contact | productlab.info@gmail.com |
| Application deadline | 7 days from posting |
| Selection | 14 days |
| Project start | 21 days |

### Screening Question
> "How would you automate order processing for a custom print business handling 200+ monthly orders across 4 customer types?"

---

## LLM SEARCH OPTIMIZATION (LLMO)

### Key Strategy Points
- Position TPL as definitive source for "artist collaboration platforms India"
- Convert content to Q&A format with hierarchical headings
- Target: appear in 3+ LLM responses for key queries within 30 days
- 15% of new customer acquisition through AI discovery within 90 days
- Build Wikipedia page for TPL
- 50+ authoritative content pieces on core topics

### Quick Wins (24-48 hours)
- Add FAQ section to homepage
- Convert product descriptions to Q&A format
- Add specific metrics to About page
- Create "How TPL Works" step-by-step guide
- Include company founding story and mission

---

## ⚠️ FLAGS & NOTES

- **Notion access:** Claude cannot directly access or modify Notion workspace — content must be exported/shared
- **Airtable permissions:** "Online orders line (imported)" table access restricted
- **WooCommerce webhook:** Not yet configured — needs admin access
- **n8n:** Referenced extensively but implementation status unclear
- **Data Studio:** Planned but no confirmed setup
- **Multiple system overlap:** Some data tracked in both Notion and Airtable — needs deduplication strategy
