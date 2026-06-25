# 10 — Technology Stack

## Current Stack Assessment (from conversations)

| Component | Tool | Utilization | Integration | Growth Impact |
|-----------|------|-------------|-------------|---------------|
| Central Database/CRM | Airtable | 60% of potential | Isolated | Medium bottleneck |
| Automation Engine | n8n | 20% of potential | Limited workflows | High opportunity |
| Documentation | Notion | 70% of potential | Manual updates | Low efficiency |
| AI Assistant | Claude | 30% of potential | No integration | Massive opportunity |
| Collaboration | Google Workspace | 50% of potential | Fragmented | Medium bottleneck |
| E-commerce | WooCommerce | 80% of potential | Manual processes | High bottleneck |
| Custom App | Softr | Active | Backed by Airtable | Operational tool |
| Communication | WhatsApp Business | Active | Manual | Customer channel |
| Email Marketing | Mailchimp | ❓ TBD | ❓ | ❓ |
| Payment | Razorpay | Active | WooCommerce integrated | Functional |
| Analytics | Google Analytics 4 | ❓ | ❓ | ❓ |
| Design | Midjourney | Active | None | Creative tool |
| Design | Adobe Creative Cloud | ❓ | None | Production files |

---

## Airtable Architecture

### Base: "TPL B2B Operations" (designed in conversations)

**Primary Tables:**
1. 🏢 CLIENTS — Company info, contacts, payment terms, order history
2. 📋 OFFLINE ORDERS — Order management, client linkage, timeline, payment, fulfillment
3. 📦 PRODUCT LINE ITEMS — Individual product details, factory assignments, production status, QC
4. 🎨 PRODUCTS MASTER — Specifications, pricing, factory capabilities, components
5. 🏭 FACTORIES — Contact info, capabilities, workload, performance, communications
6. 📎 ATTACHMENTS HUB — Design files, production specs, client approvals
7. 📦 PACKAGING SPECS — Product-specific packaging, client branding, assembly instructions

**Key Relationships:**
```
CLIENT → OFFLINE ORDERS (One-to-Many)
OFFLINE ORDERS → PRODUCT LINE ITEMS (One-to-Many)
PRODUCT LINE ITEMS → PRODUCTS MASTER (Many-to-One)
PRODUCT LINE ITEMS → FACTORIES (Many-to-One)
PRODUCTS MASTER → PACKAGING SPECS (One-to-One)
```

### Airtable Views by Role 📌 DECISION

| View | Filter | Purpose |
|------|--------|---------|
| TPL-x-Dan | Status = "Lead" OR "Confirmed" | Business development + order approvals |
| TPL-x-Muskan | Status = "Production" OR "Processing" OR "Shipped" OR "Delivered" | Coordination dashboard |
| TPL-x-Kalpana | Status = "Packed" | Order assembly queue |
| TPL-Processing Queue | Status = "Processing" | Track orders in active production |
| TPL-Escalated & Hold | Status = "Escalated" OR "On Hold" | Problem resolution (Dan) |

### Order ID Format 🔢
`IF-OF-XXXXX` (e.g., IF-OF-00412)

### Product Line Item Naming 🔢
`IF-OF-XXXXX-ProductType-##` (e.g., IF-OF-00412-KeyChain-01)

---

## Base: "Dan's Digital Environment Management" (created in Airtable)

**Tables Created:**
1. Chrome Profiles Master
2. Google Accounts Management
3. Claude Projects Organization
4. Platform & Tool Inventory
5. Workflow Processes
6. Context Switching Log
7. Daily Context Performance
8. System Maintenance Schedule

---

## WooCommerce Integration

| Component | Tool | Purpose |
|-----------|------|---------|
| E-commerce Platform | WooCommerce | Storefront, catalog, checkout |
| CMS | WordPress | Website content, blog |
| Inventory | Airtable | Stock tracking, SKU management |
| Order Processing | WooCommerce + Airtable | Order capture → fulfillment |
| Email Marketing | Mailchimp | Customer comms, promotions |
| Analytics | GA4 | Performance tracking |
| Payment | Razorpay | Secure payment collection |

### Integration Points
- WooCommerce → Airtable: Product sync, inventory updates, order data flow
- GA4 + Facebook Pixel: Marketing attribution
- Mailchimp: Customer sync
- Shipping: Label generation, tracking sync

---

## Softr App

- Custom-built order management app backed by Airtable
- Used for daily operational tracking
- Backed by physical sheets and templates for team use
- User permissions: Admin (Dan), Manager (Muskan/Hajira), Operations, Production, Assembly

---

## n8n Automation (Planned/Partial)

### Priority Automations Identified
1. Order Processing Pipeline: WooCommerce → Airtable → Factory notification → Tracking
2. Artist Revenue Calculations: Automatic commission calculations
3. Inventory Synchronization: Real-time across all channels
4. Daily Briefing: Morning report automation
5. Low Inventory Alerts
6. Status update notifications
7. Report generation and distribution

### Current State: ~20% utilized

---

## WhatsApp Communication Structure

### Groups Referenced in Conversations
- **TPL Daily Operations** — Morning messages, urgent focus, task assignments
- **Command Center** — CEO-level updates and decisions
- Factory-specific coordination channels

### Message Templates (designed in conversations)
- Message 1 (9:00 AM): Daily numbers count
- Message 2 (9:05 AM): Urgent focus with client-factory mapping
- Message 3 (9:10 AM): Task assignments by person

---

## Technology Roadmap (from conversations)

| Phase | Timeline | Focus |
|-------|----------|-------|
| Phase 1 | Weeks 1-2 | Centralized operations dashboard in Airtable |
| Phase 2 | Weeks 3-4 | Automated workflow integration via n8n |
| Phase 3 | Weeks 5-6 | Team empowerment systems |
| Phase 4 | Weeks 7-8 | Performance monitoring and real-time dashboards |

**Expected Impact**: 60-80% reduction in manual coordination time, 40% improvement in team efficiency
