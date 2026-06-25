# 03 — THE PRODUCT LAB: PRODUCT CATALOG & INVENTORY MANAGEMENT

---

## PRODUCT CATEGORIES

| Category | Product Examples | Status |
|----------|-----------------|--------|
| **Accessories** | Coffee Coasters, Keychains, Magnets, Tote Bags | Active — 67% of mix |
| **Stationery** | Stickers, Notebooks | Active — 28% of mix |
| **Fashion** | T-Shirts | Active — 4% of mix |
| **Home & Decor** | Wall Art, Prints | In development |

### Product Performance Data (from CEO Command Center)

| Product | Performance Signal |
|---------|-------------------|
| Coffee Coasters | Best performing (+45% week) |
| Tote Bags | Emerging opportunity (+25% repeat orders) |
| T-Shirts | Medium demand probability |
| Stickers | Medium demand probability |
| Keychains | Low demand probability |
| Magnets | Low demand probability |

---

## PRODUCT DATABASE SCHEMA (from Operations Guide)

### Products Master Database Properties
| Property | Type | Description |
|----------|------|-------------|
| Product_Name | Title | Official product designation |
| SKU_Code | Text | Internal tracking identifier |
| Category | Select | Accessories / Fashion / Stationery / Home & Decor |
| Base_Cost | Currency (₹) | Production cost |
| Selling_Price | Currency (₹) | Current retail price |
| Status | Select | Active / Discontinued / Development |
| Launch_Date | Date | Product introduction date |

### Status Color Coding
- 🟢 **Active:** Currently selling
- 🔴 **Discontinued:** End-of-life
- 🟡 **Development:** In design phase

---

## INVENTORY MANAGEMENT SYSTEM

### Inventory Model: JIT (Just-In-Time)
- **Maximum stock policy:** 45 days
- **Production approach:** Pull-based (not push)
- **No MOQ** for customers

### Inventory Intelligence Database Properties
| Property | Type | Description |
|----------|------|-------------|
| SKU_ID | Title | Inventory tracking identifier |
| Location | Select | Main Store / Warehouse / In-Transit / Reserved |
| Current_Stock | Number | Physical inventory count |
| Reserved_Stock | Number | Allocated to pending orders |
| Reorder_Point | Number | Minimum stock threshold |
| Turnover_Rate | Number | Monthly sales velocity |

### Stock Status Indicators
| Indicator | Meaning |
|-----------|---------|
| 🟢 OK | Above reorder point |
| 🟡 Low Stock | At reorder point |
| 🔴 Reorder Needed | Below reorder point |
| ⚫ Out of Stock | Zero available |

### Inventory KPI Targets
| Metric | Target |
|--------|--------|
| Inventory Turnover | 8-12x annually (current: 11.2x) |
| Stockout Rate | <5% |
| Reorder Accuracy | 95%+ |
| Inventory Holding Cost Reduction | 25-30% (via optimization) |
| Stockout Reduction | 40% (via optimization) |

### Inventory Formula (from Airtable discussion)
```
Available Stock = Stock Quantity - Reserved Stock
```
- Rollup field in product tables: `SUM({Line Item Quantities})`
- Automation to reduce "Stock Quantity" when new line items created

---

## INVENTORY OPTIMIZATION FRAMEWORK (from Process Optimization doc)

### ABC Analysis for Prioritization
- **A Items:** High-velocity bestsellers (Coffee Coasters, Tote Bags) — tight control
- **B Items:** Medium velocity (T-Shirts, Stickers) — moderate control
- **C Items:** Slow movers (Keychains, Magnets) — loose control, minimize stock

### Current Issues Identified
1. Overstock of slow-moving artist designs
2. Understock of proven bestsellers
3. Lack of real-time inventory visibility
4. Batch production without demand validation
5. Excessive inventory of experimental designs

### Optimization Solutions
- Dynamic safety stock based on velocity analysis
- Real-time inventory tracking with automated alerts
- Pull-based production system
- Market validation before production
- Statistical demand forecasting
- Automated material replenishment

### Impact Projections
- 25-30% inventory holding cost reduction
- 40% stockout reduction
- 35% total inventory reduction
- 20% waste elimination

---

## AIRTABLE PRODUCT DATABASE STRUCTURE

### Known Airtable Bases
| Base ID | Purpose |
|---------|---------|
| `appD9h00GRcMVhCIc` | E-commerce / WooCommerce orders |
| `appfUSkhp5PeDFuHr` | Retail orders |

### Known Table IDs (from ecommerce base)
| Table ID | Table Name | Purpose |
|----------|------------|---------|
| `tblcVobTtV3JHmC22` | Simple Products | Product catalog |
| `tbl8pMrws4wJmHphn` | Product Variations | Standardized variations |
| — | Order-list | Online orders (confirmed accessible) |
| — | Online orders line (imported) | Line items (permission-restricted) |

### Required Linking (identified but not yet implemented)
- SKU field in line items → Product SKU in simple products table
- SKU field in line items → Standardized Variation SKU in variations table
- Rollup fields for inventory reduction when orders created

---

## DEMAND FORECASTING MODEL (from CEO Command Center)

```python
Forecast_Model_Output = {
    "Next_7_Days": {
        "Expected_Orders": 295,
        "Confidence_Level": 87,
        "Seasonal_Factor": 1.15,
        "Trend_Direction": "Upward"
    },
    "Product_Demand": {
        "High_Probability": ["Coffee Coasters", "Tote Bags"],
        "Medium_Probability": ["T-Shirts", "Stickers"],
        "Low_Probability": ["Keychains", "Magnets"]
    },
    "Risk_Factors": {
        "Supply_Chain": "Low Risk",
        "Capacity_Constraint": "Medium Risk",
        "Quality_Issues": "Low Risk"
    }
}
```

---

## ⚠️ FLAGS & NOTES

- **No actual pricing data** found in conversations — Base_Cost and Selling_Price fields defined but no specific ₹ values per SKU documented
- **"xline tables" confirmed invalid** in Airtable — corrected to "Online orders line (imported)"
- **Material reorder alert:** Canvas — 3 days stock remaining (from dashboard snapshot, May 2025)
- **Production capacity:** 200 units/day, current output 156 units/day — headroom exists
