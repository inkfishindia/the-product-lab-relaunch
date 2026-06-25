# TPL Order Management — Complete Documentation

> **Last Updated**: 2026-03-20
> **Source**: Airtable schema + conversation analysis

---

## Order Channels Overview

TPL operates **three parallel order channels**, unified through Master Order Management:

| Channel | Airtable Base | Platform | Customer Type |
|---------|--------------|----------|---------------|
| **Offline** | Base 5: TPL Offline Orders Management | Direct/In-person | B2B clients, walk-ins |
| **Online** | Base 7: TPL Online Orders | WooCommerce | E-commerce customers |
| **Retail** | Base 6: TPL Retail Orders | Retail stores | Retail consumers |

---

## Channel 1: Offline Orders (Base 5)

**The most feature-rich order system** — includes production scheduling, BIN tracking, alerts, and analytics.

### Order Lifecycle

```
Order Created (Offline Orders)
  └──► Line Items Added (Orders Product Line Item)
      └──► Client Linked (IF Clients Synced)
      └──► Team Assigned (Active Team)
      └──► Inventory Allocated (Parts Inventory)
      └──► Production Scheduled (Production Schedule)
          └──► BIN Code Assigned (BIN Management System)
          └──► Manufacturing at Factory
          └──► Packaging (TPL Packaging)
          └──► Quality Check
          └──► Fulfillment / Shipping
```

### Key Tables & Their Roles

| Table | Role in Order Flow |
|-------|-------------------|
| Offline Orders | Master order record — client, date, status, totals |
| Orders Product Line Item | Individual products: SKU, quantity, unit price, line total |
| IF Clients Synced | Customer data synced from central client database |
| TPL Products Synced | Product data synced from Factory & Products base |
| Active Team | Who's handling the order |
| Production Schedule | Factory assignment, start/end dates, manufacturing timeline |
| BIN Management System | Batch tracking through production stages |
| Intelligent Alerts System | Automated notifications for delays, milestones, issues |
| Performance Intelligence Engine | Analytics: order metrics, team performance, cycle times |

### BIN Management System

The BIN system provides **granular production tracking** at the line-item level:

- Each order line item gets a unique **BIN Code**
- BIN tracks the production stage (queued → in-production → QC → packaging → shipped)
- Links directly to Orders Product Line Item
- Enables real-time production visibility

### Intelligent Alerts System

Automated notifications triggered by:
- Order status changes
- Production delays
- Inventory shortfalls
- Approaching deadlines
- Quality control flags

### Performance Intelligence Engine

Analytics layer providing:
- Order cycle time metrics
- Team performance tracking
- Production efficiency analysis
- Trend identification

---

## Channel 2: Online Orders (Base 7)

**WooCommerce-integrated** — order data imported from the e-commerce platform.

### Order Lifecycle

```
WooCommerce Order Placed
  └──► Imported to Online Orders Line
      └──► Order List (master tracking)
      └──► Line items broken out (Line table)
      └──► Coupon codes tracked (Online Order Coupon Code)
      └──► Factory assigned for production
      └──► Fulfillment & shipping
```

### Key Tables & Their Roles

| Table | Role in Order Flow |
|-------|-------------------|
| Online Orders Line | Raw imported order data from WooCommerce |
| Order List | Master order tracking with status management |
| Line | Individual line items: product, quantity, price |
| Online Order Coupon Code | Discount/promotion tracking |
| TPL Product Sheet | Product data served to online store |
| Woocom Products | WooCommerce product catalog sync |
| Woocom Products Variation | Variant data (size, color, etc.) |
| Factory | Factory assignment for production |

### WooCommerce Integration Points

| Airtable Table | WooCommerce Equivalent |
|---------------|----------------------|
| Woocom Products | WC Products |
| Woocom Products Variation | WC Product Variations |
| Online Orders Line | WC Orders (imported) |
| Category | WC Product Categories |
| Online Order Coupon Code | WC Coupon Codes |

---

## Channel 3: Retail Orders (Base 6)

**Retail store order management** with cross-system unification.

### Order Lifecycle

```
Retail Store Order Created
  └──► Line Items Added (TPL RSO Product Line Item)
      └──► Customer Linked (TPL Retail Customer)
      └──► Product matched (Retail Products + Variations)
      └──► Inventory consumed (Store Order Inventory Usage)
      └──► Status tracked
      └──► Added to Master Order Management
```

### Key Tables & Their Roles

| Table | Role in Order Flow |
|-------|-------------------|
| Retail Store Orders | Main retail order record |
| TPL RSO Product Line Item | Products within each retail order |
| TPL Retail Customer | Retail customer database |
| Retail Products | Product catalog for retail channel |
| Retail Product Variations | Size/color/variant tracking |
| Store Order Inventory Usage | Inventory deduction tracking |
| Master Order Management | **Cross-channel unification** |
| Status Manager | Order status workflow |

---

## Master Order Management (Unification Layer)

Located in **Base 6 (Retail Orders)** but serves as the **cross-channel order hub**:

- Links orders from Offline, Online, and Retail into a single view
- Provides unified order ID across systems
- Enables cross-channel reporting and analytics
- Source of truth for total business order volume

---

## Status Management

Each order channel uses a **Status Manager** table with consistent status tracking. Likely statuses (inferred from schema structure):

| Stage | Typical Statuses |
|-------|-----------------|
| Order Entry | New, Confirmed, Pending Payment |
| Production | Queued, In Production, QC |
| Fulfillment | Packaging, Ready to Ship, Shipped |
| Completion | Delivered, Completed, Cancelled, Returned |

---

## Recommended Views (from Conversation)

### Order Management Department Views
- **Unified Order Dashboard**: Consolidated view across all channels
- **Order Fulfillment Pipeline**: Kanban by status
- **Delivery Timeline Tracker**: Calendar view of shipments
- **Customer Communication Log**: Client interactions by order

### Recommended Reports
- **Daily Orders Summary**: New orders + fulfillment progress
- **Channel Performance Comparison**: Volume across Online, Offline, Retail
- **Delivery Performance Metrics**: On-time delivery %
- **Returns & Issues Analysis**: Problem patterns by product or channel

---

## ⚠️ Gaps & Open Questions

- How are orders from Online (WooCommerce) linked into Master Order Management?
- Is there a unified order ID scheme across all three channels?
- What triggers the sync from WooCommerce to Airtable (Zapier/Make/native)?
- How does inventory allocation differ between channels?
- Are Offline Orders the only channel with BIN tracking, or do Online/Retail also have production tracking?
