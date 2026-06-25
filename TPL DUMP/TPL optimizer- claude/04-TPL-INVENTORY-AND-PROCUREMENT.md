# TPL Inventory & Procurement — Complete Documentation

> **Last Updated**: 2026-03-20
> **Source**: Airtable schema + conversation analysis

---

## Inventory System Architecture

TPL manages inventory through **two dedicated bases** plus inventory tables embedded within order bases:

| Base | Scope | Focus |
|------|-------|-------|
| **Base 1: TPL Inventory Management** | Product inventory | Finished goods, components, parts |
| **Base 3: TPL Packaging Inventory** | Packaging materials | Boxes, labels, wrapping, inserts |
| **Base 5: Offline Orders** (embedded) | Order-level inventory | Parts allocated per order |
| **Base 6: Retail Orders** (embedded) | Store-level inventory | Store Order Inventory Usage |

---

## Base 1: TPL Inventory Management

### Table Structure

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| Product Inventory | Main inventory — SKU-level stock tracking | Top-level view of all products |
| Parts Inventory | Detailed parts/components inventory | → Product Inventory, → Stock Area Management |
| TPL Inventory Usage | Consumption log — what was used, when, for what | → Parts Inventory |
| Stock Area Management | Physical warehouse locations (zones, shelves, bins) | → Parts Inventory |
| Manufacturers | Supplier master list | → Purchase Orders |
| Purchase Orders | Procurement orders to suppliers | → Manufacturers, → Parts Inventory |

### Inventory Hierarchy

```
Product Inventory (finished goods level)
  └──► Parts Inventory (component level)
      └──► Stock Area Management (physical location)
      └──► TPL Inventory Usage (consumption log)
      └──► Purchase Orders (replenishment)
          └──► Manufacturers (supplier)
```

### JIT (Just-In-Time) Inventory Model

TPL operates a **JIT inventory system** (referenced in conversation analysis). Key implications:

- Minimal stock holding — order-driven procurement
- Reorder points tied to production schedule
- Supplier lead times are critical data
- Stock-out risk management is essential
- Fast inventory turnover expected

---

## Base 3: TPL Packaging Inventory

### Table Structure

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| Parts List | Master catalog of all packaging parts | Catalog/reference |
| Parts Inventory | Actual stock of packaging materials | → Parts List, → Stock Area Management |
| Inventory Management | Usage/consumption tracking for packaging | → Parts Inventory |
| Stock Area Management | Location tracking for packaging materials | → Parts Inventory |
| Manufacturers | Packaging suppliers | → Purchase Orders |
| Purchase Orders | Packaging procurement | → Manufacturers, → Parts Inventory |

### Key Difference from Base 1

Base 3 has a **Parts List** (master catalog) separate from **Parts Inventory** (actual stock). This two-tier structure allows:
- Defining packaging part specifications once in Parts List
- Tracking multiple stock entries per part in Parts Inventory
- Supporting multiple stock locations per part

---

## Procurement Workflow

```
Stock Level Drops Below Threshold
  └──► Alert Triggered
      └──► Purchase Order Created
          └──► Linked to Manufacturer
          └──► Linked to Parts Inventory (what to order)
          └──► PO Sent to Supplier
              └──► Goods Received
                  └──► Parts Inventory Updated
                  └──► Stock Area Assigned
```

### Purchase Order Tracking

Both Base 1 and Base 3 have Purchase Orders tables with:

| Field (Inferred) | Purpose |
|------------------|---------|
| PO Number | Unique identifier |
| Manufacturer | Linked supplier record |
| Parts/Items | What's being ordered |
| Quantity | How much |
| Status | Draft → Sent → Acknowledged → Shipped → Received |
| Expected Date | Delivery ETA |
| Actual Date | When received |
| Cost | Total PO value |

---

## Stock Area Management

Both inventory bases include physical location tracking:

| Field (Inferred) | Purpose |
|------------------|---------|
| Area Code | Unique location identifier |
| Location | Warehouse / zone / shelf |
| Capacity | Max storage capacity |
| Current Stock | Items currently stored |
| Linked Parts | Which parts are stored here |

---

## Inventory Consumption Points

Inventory is consumed at three points in the order flow:

| Consumption Point | Base | Table |
|-------------------|------|-------|
| Offline order production | Base 5 | Parts Inventory, TPL Packaging |
| Retail order fulfillment | Base 6 | Store Order Inventory Usage |
| Online order fulfillment | Base 7 | (Implied — no explicit usage table) |
| General usage tracking | Base 1 | TPL Inventory Usage |
| Packaging usage | Base 3 | Inventory Management |

---

## Recommended Views (from Conversation)

### Inventory & Procurement Department Views
- **Inventory Dashboard**: Consolidated low stock alerts across all inventory bases
- **Purchase Order Tracker**: Filter by status and due date
- **Parts Consumption Analysis**: Usage rates by product line
- **Manufacturer Performance**: Lead times and quality metrics

### Recommended Reports
- **Weekly Stock Level Report**: Items below reorder threshold
- **Monthly Inventory Turnover Report**: Slow-moving vs. fast-moving items
- **Quarterly Supplier Performance**: Manufacturer reliability and quality
- **Inventory Value Assessment**: Total current inventory value by category

---

## ⚠️ Gaps & Open Questions

- What are the actual reorder point thresholds?
- How is JIT implemented in practice — is it order-triggered or forecast-based?
- What's the average supplier lead time?
- Are there safety stock buffers despite JIT model?
- How does packaging inventory link to product inventory for BOM (Bill of Materials)?
- Is there a unified inventory view across Base 1 and Base 3?
- How does online order fulfillment deduct inventory (no explicit usage table in Base 7)?
- What automation exists for low-stock alerts and PO generation?
