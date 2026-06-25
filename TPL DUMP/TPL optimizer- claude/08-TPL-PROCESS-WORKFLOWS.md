# TPL Process Workflows — Complete Documentation

> **Last Updated**: 2026-03-20
> **Source**: Airtable schema process workflows section + conversation analysis

---

## Workflow 1: Order-to-Fulfillment

The end-to-end process from order placement to customer delivery.

### Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    ORDER-TO-FULFILLMENT                          │
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐                  │
│  │ OFFLINE  │    │ ONLINE   │    │ RETAIL   │                  │
│  │ Base 5   │    │ Base 7   │    │ Base 6   │                  │
│  └────┬─────┘    └────┬─────┘    └────┬─────┘                  │
│       │               │               │                         │
│       └───────────────┼───────────────┘                         │
│                       ▼                                          │
│              ┌─────────────────┐                                 │
│              │ ORDER ENTRY     │                                 │
│              │ Order created   │                                 │
│              │ Line items added│                                 │
│              │ Client linked   │                                 │
│              └────────┬────────┘                                 │
│                       ▼                                          │
│              ┌─────────────────┐                                 │
│              │ INVENTORY       │                                 │
│              │ ALLOCATION      │                                 │
│              │ Check stock     │                                 │
│              │ Reserve parts   │                                 │
│              │ Flag shortages  │                                 │
│              └────────┬────────┘                                 │
│                       ▼                                          │
│              ┌─────────────────┐                                 │
│              │ PRODUCTION      │                                 │
│              │ SCHEDULING      │                                 │
│              │ Assign factory  │                                 │
│              │ Set dates       │                                 │
│              │ Assign BIN code │                                 │
│              └────────┬────────┘                                 │
│                       ▼                                          │
│              ┌─────────────────┐                                 │
│              │ MANUFACTURING   │                                 │
│              │ Production runs │                                 │
│              │ BIN tracking    │                                 │
│              │ Progress updates│                                 │
│              └────────┬────────┘                                 │
│                       ▼                                          │
│              ┌─────────────────┐                                 │
│              │ QUALITY CONTROL │                                 │
│              │ Inspection      │                                 │
│              │ Pass/Fail       │                                 │
│              │ Rework if needed│                                 │
│              └────────┬────────┘                                 │
│                       ▼                                          │
│              ┌─────────────────┐                                 │
│              │ PACKAGING       │                                 │
│              │ Package product │                                 │
│              │ Packaging inv.  │                                 │
│              │ consumed        │                                 │
│              └────────┬────────┘                                 │
│                       ▼                                          │
│              ┌─────────────────┐                                 │
│              │ SHIPPING        │                                 │
│              │ Ship to customer│                                 │
│              │ Status → Done   │                                 │
│              └─────────────────┘                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Airtable Tables Involved (per stage)

| Stage | Tables | Base |
|-------|--------|------|
| Order Entry | Offline Orders / Retail Store Orders / Online Orders Line | 5 / 6 / 7 |
| Line Items | Orders Product Line Item / TPL RSO Product Line Item / Line | 5 / 6 / 7 |
| Client Link | IF Clients Synced / TPL Retail Customer / (WooCommerce customer) | 5 / 6 / 7 |
| Inventory Allocation | Parts Inventory | 1, 5 |
| Production Scheduling | Production Schedule | 5 |
| BIN Tracking | BIN Management System | 5 |
| Manufacturing | Factory (linked), Production Schedule | 4, 5 |
| Packaging | TPL Packaging, Packaging Inventory | 3, 5 |
| Status Updates | Status Manager (all bases) | All |
| Alerts | Intelligent Alerts System | 5 |
| Analytics | Performance Intelligence Engine | 5 |
| Unified View | Master Order Management | 6 |

---

## Workflow 2: Inventory Management

Stock monitoring, procurement, receiving, and consumption cycle.

### Flow

```
┌─────────────────────────────────────────────────────────┐
│                INVENTORY MANAGEMENT CYCLE                 │
│                                                          │
│  ┌──────────────────┐                                    │
│  │ STOCK MONITORING  │◄─────────────────────────┐       │
│  │ Check levels      │                           │       │
│  │ Compare to        │                           │       │
│  │ reorder points    │                           │       │
│  └────────┬─────────┘                           │       │
│           │ Below threshold?                     │       │
│           ▼                                      │       │
│  ┌──────────────────┐                           │       │
│  │ PURCHASE ORDER    │                           │       │
│  │ CREATION          │                           │       │
│  │ Select supplier   │                           │       │
│  │ Set quantities    │                           │       │
│  │ Send to mfg       │                           │       │
│  └────────┬─────────┘                           │       │
│           ▼                                      │       │
│  ┌──────────────────┐                           │       │
│  │ INVENTORY RECEIPT │                           │       │
│  │ Goods received    │                           │       │
│  │ Quality check     │                           │       │
│  │ Stock area assign │                           │       │
│  └────────┬─────────┘                           │       │
│           ▼                                      │       │
│  ┌──────────────────┐                           │       │
│  │ USAGE TRACKING    │                           │       │
│  │ Consumed by       │                           │       │
│  │ orders/production │───────────────────────────┘       │
│  └──────────────────┘                                    │
│                                                          │
│  Tables: Parts Inventory, Purchase Orders,               │
│  Stock Area Management, TPL Inventory Usage,             │
│  Manufacturers                                           │
└─────────────────────────────────────────────────────────┘
```

### Parallel: Packaging Inventory Cycle

Same flow applies to Base 3 (Packaging Inventory):
- Parts List → Parts Inventory → Inventory Management → Purchase Orders → Manufacturers

---

## Workflow 3: Product Development

From concept to catalog-ready product.

### Flow

```
┌─────────────────────────────────────────────────────────┐
│                 PRODUCT DEVELOPMENT                      │
│                                                          │
│  ┌──────────────────┐                                    │
│  │ CONCEPT           │                                   │
│  │ New product idea  │                                   │
│  │ Artist collab?    │                                   │
│  │ Market research   │                                   │
│  └────────┬─────────┘                                    │
│           ▼                                              │
│  ┌──────────────────┐                                    │
│  │ PRODUCT CREATION  │ ◄── Base 4: TPL Factory & Products│
│  │ Products Range    │                                   │
│  │ record created    │                                   │
│  │ Category assigned │                                   │
│  └────────┬─────────┘                                    │
│           ▼                                              │
│  ┌──────────────────┐                                    │
│  │ MATERIAL          │                                   │
│  │ ALLOCATION        │                                   │
│  │ TPL Materials     │                                   │
│  │ linked            │                                   │
│  │ BOM defined       │                                   │
│  └────────┬─────────┘                                    │
│           ▼                                              │
│  ┌──────────────────┐                                    │
│  │ FACTORY ASSIGNMENT│                                   │
│  │ Match to factory  │                                   │
│  │ capabilities      │                                   │
│  │ (Key Processes)   │                                   │
│  └────────┬─────────┘                                    │
│           ▼                                              │
│  ┌──────────────────┐                                    │
│  │ SAMPLE PRODUCTION │                                   │
│  │ Prototype run     │                                   │
│  │ Review & refine   │                                   │
│  └────────┬─────────┘                                    │
│           ▼                                              │
│  ┌──────────────────┐                                    │
│  │ VARIATIONS        │                                   │
│  │ Create size/color │                                   │
│  │ /scent variants   │                                   │
│  │ Define packaging  │                                   │
│  └────────┬─────────┘                                    │
│           ▼                                              │
│  ┌──────────────────┐                                    │
│  │ CATALOG           │                                   │
│  │ INTEGRATION       │                                   │
│  │ Sync to inventory │                                   │
│  │ Sync to order     │                                   │
│  │ systems           │                                   │
│  │ WooCommerce push  │                                   │
│  │ Status → Active   │                                   │
│  └──────────────────┘                                    │
└─────────────────────────────────────────────────────────┘
```

---

## Workflow 4: Customer Management

Customer lifecycle from first contact through ongoing relationship.

### Flow

```
┌─────────────────────────────────────────────────────────┐
│                 CUSTOMER MANAGEMENT                      │
│                                                          │
│  ┌──────────────────┐                                    │
│  │ CUSTOMER INFO     │                                   │
│  │ TRACKING          │                                   │
│  │ IF Clients Synced │ (Base 5)                          │
│  │ TPL Retail Cust.  │ (Base 6)                          │
│  │ All Clients       │ (Base 2)                          │
│  │ WooCommerce cust. │ (Base 7)                          │
│  └────────┬─────────┘                                    │
│           ▼                                              │
│  ┌──────────────────┐                                    │
│  │ ORDER HISTORY     │                                   │
│  │ Offline orders    │                                   │
│  │ Retail orders     │                                   │
│  │ Online orders     │                                   │
│  │ Master Order Mgmt │                                   │
│  └────────┬─────────┘                                    │
│           ▼                                              │
│  ┌──────────────────┐                                    │
│  │ COMMUNICATION     │                                   │
│  │ Client Reminders  │ (Base 2)                          │
│  │ Email (Gmail)     │                                   │
│  │ Slack (internal)  │                                   │
│  └────────┬─────────┘                                    │
│           ▼                                              │
│  ┌──────────────────┐                                    │
│  │ TASK/REMINDER     │                                   │
│  │ TRACKING          │                                   │
│  │ Internal tasks    │                                   │
│  │ Client follow-ups │                                   │
│  │ Calendar sync     │                                   │
│  └──────────────────┘                                    │
└─────────────────────────────────────────────────────────┘
```

### Customer Data Locations

| Customer Type | Primary Table | Base |
|---------------|--------------|------|
| B2B/Offline clients | IF Clients Synced | Base 5 |
| Retail customers | TPL Retail Customer | Base 6 |
| Online customers | (within WooCommerce orders) | Base 7 |
| All clients (reminders) | All Clients | Base 2 |

---

## Cross-Workflow Integration Points

| Integration Point | From → To | Mechanism |
|-------------------|-----------|-----------|
| Product → Inventory | Base 4 → Base 1 | Airtable Sync |
| Product → Orders | Base 4 → Bases 5, 6, 7 | Airtable Sync |
| Order → Production | Bases 5, 6, 7 → Production Schedule | Record linking |
| Production → Inventory | Production Schedule → Parts Inventory | Usage tracking |
| Order → Reminder | Bases 5, 6, 7 → Base 2 | Client/task linking |
| All Orders → Unified View | Bases 5, 6, 7 → Master Order Mgmt | Cross-base aggregation |

---

## ⚠️ Gaps & Open Questions

- Are there SOP documents for each workflow?
- What are the actual SLA targets for order fulfillment?
- How are exceptions handled (stock-outs, production delays, quality failures)?
- What escalation paths exist for overdue tasks/orders?
- Is there a returns/refund workflow documented?
- How does the Intelligent Alerts System trigger — Airtable automations or external?
- What's the average cycle time for each workflow?
