# TPL Airtable Schema — Complete Documentation

> **Last Updated**: 2026-03-20
> **Source**: Project file `airtable-schema.md` + conversation analysis

---

## System Architecture Overview

TPL runs **7 interconnected Airtable bases** that form the operational backbone of the business. Data flows from a master product database through inventory systems into three parallel order channels.

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

---

## Base 1: TPL Inventory Management

**Purpose**: Product inventory tracking, stock management, and purchase orders.

### Tables

| Table | Purpose | Key Fields (Inferred) |
|-------|---------|----------------------|
| Product Inventory | Main inventory tracking | Product ID, SKU, quantity, reorder level |
| Parts Inventory | Individual product parts | Part ID, linked product, stock area, quantity |
| TPL Inventory Usage | Consumption tracking | Usage date, parts consumed, order reference |
| Stock Area Management | Physical location tracking | Area code, location, capacity |
| Manufacturers | Supplier info | Manufacturer name, contact, lead time |
| Purchase Orders | Procurement tracking | PO number, manufacturer, parts, status, date |

### Relationships

```
Parts Inventory ──► Product Inventory
Parts Inventory ──► Stock Area Management
Purchase Orders ──► Manufacturers
Purchase Orders ──► Parts Inventory
TPL Inventory Usage ──► Parts Inventory
```

---

## Base 2: TPL Reminders

**Purpose**: Task reminders, follow-ups, and notifications for the TPL team.

### Tables

| Table | Purpose | Key Fields (Inferred) |
|-------|---------|----------------------|
| Internal Reminders | Tasks for internal team | Task, assignee, due date, status |
| Client Reminders | Client-facing tasks/follow-ups | Client, task, due date, status |
| TPL Reminders | Calendar integration | Reminder date, linked task, calendar sync |
| All Clients | Client information | Client ID, name, contact info |
| Users Synced | Team member information | User ID, name, role, department |
| Status Manager | Status tracking | Status name, color, category |
| TPL Factory Locations | Manufacturing locations | Factory code, location, capacity |

### Relationships

```
Internal Reminders ──► All Clients
Internal Reminders ──► Users Synced (assignee)
Internal Reminders ──► Status Manager
Client Reminders ──► All Clients
Client Reminders ──► Users Synced
Client Reminders ──► Status Manager
TPL Factory Locations ──► Internal Reminders
```

---

## Base 3: TPL Packaging Inventory

**Purpose**: Packaging materials inventory and usage management.

### Tables

| Table | Purpose | Key Fields (Inferred) |
|-------|---------|----------------------|
| Parts List | Main catalog of packaging parts | Part name, type, specifications |
| Parts Inventory | Detailed packaging inventory | Part, quantity, stock area, batch |
| Inventory Management | Usage tracking | Date, parts used, order reference |
| Stock Area Management | Location tracking | Area code, warehouse, shelf |
| Manufacturers | Supplier info for packaging | Supplier name, MOQ, lead time |
| Purchase Orders | Procurement tracking | PO number, supplier, items, ETA |

### Relationships

```
Parts Inventory ──► Parts List
Parts Inventory ──► Stock Area Management
Purchase Orders ──► Manufacturers
Purchase Orders ──► Parts Inventory
Inventory Management ──► Parts Inventory
```

---

## Base 4: TPL Factory & Products

**Purpose**: Master product database — manufacturing info, factory relationships, product specifications. This is the **source of truth** for all product data across the system.

### Tables

| Table | Purpose | Key Fields (Inferred) |
|-------|---------|----------------------|
| Factory | Manufacturing locations | Factory code, name, location, capabilities |
| Factory Teams | Personnel at facilities | Team member, factory, role, contact |
| Product Category | Product categorization | Category name, description, parent |
| Products Range | **Master product catalog** | Product ID, SKU, name, category, factory, materials |
| Product Variations | Specific product variants | Variation ID, parent product, size/color/variant |
| TPL Materials | Raw materials for production | Material name, type, supplier, cost |
| TPL Packaging | Packaging information | Package type, product, specifications |
| Parts Inventory | Component inventory | Part, product, quantity |
| Status Manager | Product status tracking | Status name, stage |
| Key Processes & Capabilities | Manufacturing capabilities | Process name, factory, capacity |

### Relationships

```
Products Range ──► Product Category
Products Range ──► Factory
Products Range ──► TPL Materials
Product Variations ──► Products Range
TPL Packaging ──► Products Range
Factory Teams ──► Factory
```

---

## Base 5: TPL — Offline Orders Management

**Purpose**: In-person/B2B orders, production tracking, and fulfillment. **Most complex base** — includes production scheduling, BIN management, and analytics engines.

### Tables

| Table | Purpose | Key Fields (Inferred) |
|-------|---------|----------------------|
| Offline Orders | Main order tracking | Order ID, client, date, status, total |
| Orders Product Line Item | Individual products in orders | Line item ID, order, product, quantity, price |
| Status Manager | Order status tracking | Status name, sequence, color |
| IF Clients Synced | Customer information | Client ID, name, contact, history |
| TPL Products Synced | Product info from Factory base | Product ID, SKU, name (synced) |
| Active Team | Team member assignments | Member, role, assigned orders |
| Parts Inventory | Inventory tracking for orders | Part, quantity, allocated |
| TPL Packaging | Packaging for orders | Package type, order, status |
| Production Schedule | Manufacturing timeline | Order, factory, start date, end date, status |
| BIN Management System | Production batch tracking | BIN code, order line item, stage, status |
| Intelligent Alerts System | Notifications | Alert type, trigger, recipient, status |
| Performance Intelligence Engine | Analytics | Metric, value, period, trend |

### Relationships

```
Offline Orders ──► IF Clients Synced
Offline Orders ──► Orders Product Line Item
Orders Product Line Item ──► TPL Products Synced
Orders Product Line Item ──► Production Schedule
Production Schedule ──► Factory
Production Schedule ──► Orders Product Line Item
BIN Management System ──► Orders Product Line Item
```

---

## Base 6: TPL Retail Orders

**Purpose**: Retail store orders, inventory, and customer management.

### Tables

| Table | Purpose | Key Fields (Inferred) |
|-------|---------|----------------------|
| Retail Store Orders | Main order tracking | Order ID, customer, store, date, status |
| TPL RSO Product Line Item | Products within retail orders | Line item, order, product, qty, price |
| TPL Retail Customer | Customer information | Customer ID, name, contact, purchase history |
| Master Order Management | **Cross-system order integration** | Master order ID, source system, linked order |
| Retail Product Variations | Product variant tracking | Variation, product, attributes |
| Retail Products | Product catalog for retail | Product ID, name, price, category |
| Status Manager | Order status tracking | Status, sequence |
| Store Order Inventory Usage | Inventory tracking for retail | Order, parts consumed, date |

### Relationships

```
Retail Store Orders ──► TPL Retail Customer
Retail Store Orders ──► TPL RSO Product Line Item
TPL RSO Product Line Item ──► Retail Products
Master Order Management ──► (cross-system links)
Retail Product Variations ──► Retail Products
```

**Note**: Master Order Management is the **unification layer** — it links orders from Offline, Online, and Retail into a single view.

---

## Base 7: TPL Online Orders

**Purpose**: E-commerce orders via WooCommerce, online product listings, digital fulfillment.

### Tables

| Table | Purpose | Key Fields (Inferred) |
|-------|---------|----------------------|
| Online Orders Line | Imported order data from WooCommerce | WC order ID, date, customer, items, total |
| Order List | Master order tracking | Order ID, status, fulfillment stage |
| Line | Individual order line items | Line item, order, product, qty, price |
| Status Manager | Order status tracking | Status name, sequence |
| Online Order Coupon Code | Discount tracking | Coupon code, discount type, amount, usage |
| Product Variation | Product variant tracking | Variation ID, product, attributes |
| Category | Product category management | Category name, parent, slug |
| TPL Product Sheet | Product data for online store | Product, description, images, price |
| Factory | Factory info for online orders | Factory code, linked products |
| Woocom Products | WooCommerce product data | WC product ID, name, price, status |
| Woocom Products Variation | WooCommerce variant data | Variation ID, parent product, attributes |

### Relationships

```
Order List ──► Online Orders Line
Order List ──► Line
Line ──► Online Orders Line
Line ──► Factory
Woocom Products ──► Product Variation
Woocom Products ──► Category
TPL Product Sheet ──► Online Orders Line
```

---

## Cross-Base Data Flows

### 1. Product Data Flow
```
TPL Factory & Products (Base 4)
  └──► [sync] TPL Inventory Management (Base 1)
  └──► [sync] TPL Products Synced in Offline Orders (Base 5)
  └──► [sync] Retail Products in Retail Orders (Base 6)
  └──► [sync] Woocom Products in Online Orders (Base 7)
```

### 2. Inventory Flow
```
TPL Inventory Management (Base 1) ◄── tracks overall product inventory
TPL Packaging Inventory (Base 3) ◄── tracks packaging materials
  │
  ▼ consumed by:
Offline Orders (Base 5) ──► Parts Inventory + TPL Packaging
Retail Orders (Base 6) ──► Store Order Inventory Usage
Online Orders (Base 7) ──► (inventory deducted on fulfillment)
```

### 3. Order Processing Flow
```
Order Entry ──► [Offline/Online/Retail respective base]
  └──► Inventory Allocation
  └──► Production Schedule (Base 5)
  └──► BIN Management System (Base 5)
  └──► Master Order Management (Base 6) ◄── unified view
```

### 4. Task Management Flow
```
TPL Reminders (Base 2)
  ├── Internal Reminders ──► Users Synced / Active Team
  └── Client Reminders ──► All Clients / IF Clients Synced
```

---

## Key Identifiers Cross-Reference

| Identifier | Created In | Used In |
|------------|-----------|---------|
| Product ID / SKU | Factory & Products (4) | Inventory (1), Offline (5), Retail (6), Online (7) |
| Order ID | Each order base | Respective order base + Master Order Management (6) |
| Factory Code | Factory & Products (4) | Offline (5), Online (7), Reminders (2) |
| Client / Customer ID | Reminders (2), respective order bases | Cross-referenced in all order + reminder systems |
| BIN Code | Offline Orders (5) | BIN Management System within Offline Orders |
| PO Number | Inventory (1), Packaging (3) | Purchase Orders tables |
