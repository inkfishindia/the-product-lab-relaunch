# THE PRODUCT LAB — AMOEBA ORDER CASE STUDY

---

## ORDER OVERVIEW

| Attribute | Detail |
|-----------|--------|
| **Client** | Amoeba (Multi-location retail chain) |
| **Order Type** | Corporate / Enterprise |
| **Priority Level** | High |
| **Urgency Level** | VIP |
| **Channel Source** | B2B Portal |
| **Total Locations** | 18 cities across India |
| **Total Pieces** | 3,585 (later referenced as 3,905 in one instance) |
| **Product Categories** | 6 |
| **Estimated Order Value** | ₹7,81,000 |
| **Payment Status** | Pre Paid (Corporate terms) |
| **Order Structure Decision** | 1 Master Order + 18 line items (one per city bundle) |

> **⚠️ CONTRADICTION:** Total pieces quoted as 3,585 in one conversation and 3,905 in another. Verify with actual order data.

---

## PRODUCT CATEGORY TOTALS (CONSOLIDATED)

| Product Category | Total Qty | Production Type | Factory Routing |
|-----------------|-----------|-----------------|-----------------|
| Keychains | 1,200 | High-volume | Factory AC (Arun CADD) |
| Fridge Magnets | 885 | Standard | Factory AC (Arun CADD) |
| 3D Products | 785 | Specialized | Factory 2 (Specialized) |
| Laptop Stickers | 330 | Print | Factory OD (Om Digital) |
| Enamel Products | 205 | Premium | Factory 2 (Specialized) |
| Lapel Pins | 180 | Precision | Factory 3 (Print/Precision) |
| **TOTAL** | **3,585** | — | — |

---

## TIER-BASED CITY DISTRIBUTION

### TIER 1 CITIES — Priority Shipping (Express/Premium, 2–3 days post-production)

| # | Location | Pieces | Product Breakdown |
|---|----------|--------|-------------------|
| 1 | Church Street, Bangalore | 260 | KC:90, FM:75, 3D:50, LS:20, EN:15, LP:10 |
| 2 | Goa Location | 230 | KC:80, FM:65, 3D:50, LS:15, EN:10, LP:10 |
| 3 | Kurla, Mumbai | 230 | (Same mix as Goa) |
| 4 | Mantri Mall, Bangalore | 230 | (Same mix as Goa) |
| 5 | Meenakshi Mall, Bangalore | 230 | (Same mix as Goa) |
| 6 | Bhartiya Mall, Bangalore | 230 | (Same mix as Goa) |

### TIER 2 CITIES — Standard Shipping (Standard Express, 3–5 days post-production)

| # | Location | Pieces | Notes |
|---|----------|--------|-------|
| 7 | Cosmo Mall, Bangalore | 255 | Slightly higher allocation |
| 8 | MSQ, Bangalore | 220 | Standard Tier 2 mix |
| 9 | Hubli | 220 | Karnataka outstation |
| 10 | CC2, Bangalore | 220 | Standard Tier 2 mix |
| 11 | Metro World Mall, Bangalore | 220 | Standard Tier 2 mix |
| 12 | Hilite Mall, Kozhikode | 220 | Kerala location |

### TIER 3 CITIES — Economy Shipping (Standard/Economy, 5–7 days post-production)

| # | Location | Pieces | Notes |
|---|----------|--------|-------|
| 13 | Ranebennur | 110 | Smaller allocation |
| 14 | Dhanbad | 220 | Standard Tier 3 mix |
| 15 | Hyderabad | 220 | South India |
| 16 | Vadodra | 220 | Gujarat |
| 17 | Elpro, Pune | 110 | Smaller allocation |
| 18 | Noida | 110 | Delhi NCR |

---

## ORDER STRUCTURE DECISION

### Options Evaluated

**Option A: 18 Line Items (City Bundles)**
- 1 master order + 18 line items (one per city)
- Each line item bundles all 6 products for that city
- Customization details field holds product breakdown

**Option B: 108 Line Items (Product × City)**
- 1 master order + 108 line items (6 products × 18 cities)
- Each line item = single product for single city
- Granular tracking and bin allocation

**Option C: Hybrid (Tier Bundles)**
- 1 master order + 3 line items (Tier 1, Tier 2, Tier 3)
- Least granular

### Final Decision: Option A (18 Line Items) with Option B for Bin Allocation

**Rationale from Dan:**
> "I think if we did a hybrid it would have to be main order → line item → product-city, as the qty for each product is different, attachment and factory production would be different"

**Operational Reality:**
- Sales team creates 18 line items (manageable)
- Each line item has bundle details in customization field
- Factory receives consolidated production orders by product type (batch efficiency)
- Post-production: Ops Manager sorts into 108 bins (product × city)
- Assembly team works on single-product bins (simple, no decisions)
- Consolidation team assembles city boxes from completed bins

---

## PRODUCTION FLOW (AMOEBA-SPECIFIC)

### Stage 1: Order Entry
```
Sales team creates:
- 1 Master Order: "Amoeba Nationwide Rollout"
- 18 Line Items (one per city with bundle details)
- Links to Amoeba client record
```

### Stage 2: Production Planning
```
Extract totals by product type:
- Keychains: 1,200 total → Factory AC
- Fridge Magnets: 885 total → Factory AC
- 3D Products: 785 total → Factory 2
- Laptop Stickers: 330 total → Factory OD
- Enamel Products: 205 total → Factory 2
- Lapel Pins: 180 total → Factory 3
```

### Stage 3: Factory Coordination
```
OUTGOING TO FACTORY:
PRODUCTION ORDER: KC-B47
PRODUCT: Keychains
TOTAL QUANTITY: 1,200 pieces
VARIATIONS: 6 designs (quantities in attached sheet)
QUALITY STANDARD: Amoeba grade
DELIVERY DATE: [Date]
RETURN PACKAGING: Sorted by design type
```

### Stage 4: Factory Return Sorting (CRITICAL BOTTLENECK)
```
Factory returns mixed batch → Ops Manager sorts into bins:

Example: Keychain factory returns 1,200 mixed keychains
├── BIN-001-KC-CHU: 90 × Church Street design → Physical bin
├── BIN-007-KC-GOA: 80 × Goa design → Physical bin
├── BIN-013-KC-MUM: 80 × Mumbai design → Physical bin
└── [Continue for all 18 cities]
```

### Stage 5: Assembly (Per Bin — Dead Simple)
```
Assembly team receives single-product bin:

BIN-001: KC-Bangalore-CHU
├── Contents: 90 × Bangalore keychains
├── Components needed: 90 × key hooks
├── Assembly instruction card (with photos)
├── Quality check reference photos
└── Completion checklist

TASK: Assemble 90 keychains
TIME: 45-60 minutes
NO DECISIONS REQUIRED — FOLLOW PHOTOS ONLY
```

### Stage 6: City Consolidation
```
CHURCH STREET BANGALORE CONSOLIDATION:
├── BIN-001: 90 × Assembled Keychains ✅
├── BIN-002: 75 × Assembled Fridge Magnets ✅
├── BIN-003: 50 × 3D Products (no assembly) ✅
├── BIN-004: 20 × Laptop Stickers (no assembly) ✅
├── BIN-005: 15 × Enamel Products ✅
├── BIN-006: 10 × Assembled Lapel Pins ✅
│
└── CITY BOX: Church Street Bangalore
    ├── Pre-printed address label
    ├── Pre-printed packing list
    ├── All 260 pieces verified
    └── Shipping box: Medium
```

### Stage 7: Tiered Dispatch
```
DISPATCH QUEUE:
├── Zone 1: Tier 1 Cities (6 boxes) → Express shipping
├── Zone 2: Tier 2 Cities (6 boxes) → Standard express
└── Zone 3: Tier 3 Cities (6 boxes) → Economy shipping
```

---

## AIRTABLE IMPLEMENTATION DETAILS

### Master Order Record Fields
```
Table: Offline Orders (tblEF1T1QjiHu3HeJ)

Order Spec: "Amoeba Multi-Location Distribution - 18 Cities Nationwide Launch"
Category: "Corporate" (fldU2fieLjxH1dcrS → selrrG655fGw2nrua)
Order Type: "Corporate" (fld2ObKwIK15ONkLN → selCEVEUdE6DosDH7)
Priority Level: "High" (fldZEf8KDnyUSl3OO → sel5eq8DARXeu5DAH)
Urgency Level: "VIP" (fldmjFA3ADosxEZn9 → sel7zng609xt3TbgR)
Channel Source: "B2B Portal" (fldjTQwJUJi1B0cAi → selbpQRvaE4oau4pm)
Total Order Value: ₹7,81,000
Consolidated Buyer: Link to "Amoeba" client record
```

### Line Item Example (Church Street)
```
Table: Orders Product Line Item (tbl0iL9jPlWWdZTMw)

Product Name: "Amoeba Bundle - Church Street BLR"
Location Code: AMB-CHU-001
Requested Qty: 260 pieces
Customization Details: "90 Keychains, 75 Fridge Magnets, 50×3D Products,
                        20 Laptop Stickers, 15 Enamel, 10 Lapel Pins"
Shipping Address: "Church Street, Bangalore"
Notes: "Tier 1 City - Premium Mix"
```

### Bin Records (108 total for granular tracking)
```
Table: BIN_MANAGEMENT_SYSTEM (tblCsz1ekdROTkKqR)

Record 1:
├── BIN_CODE: "BIN-001-KC-CHU"
├── ORDER_REFERENCE: [Link to Amoeba master order]
├── LINE_ITEM_REFERENCE: [Link to Church St line item]
├── CITY_DESTINATION: "Church Street, Bangalore"
├── QUANTITY_ALLOCATED: 90
└── FACTORY_SORT_STATUS: "Pending Factory Return"

[× 108 records: 18 cities × 6 product types]
```

### Client Record
```
Table: IF Clients synced (tblbd86y3dmYakDDM)

Company Name: "Amoeba"
Client Type: Corporate/Enterprise
```

---

## KEY OPERATIONAL INSIGHTS FROM THIS ORDER

1. **Factory routing remains product-based** — keychains go to keychain factory regardless of destination city
2. **Sorting is the critical bottleneck** — Ops Manager must sort mixed factory returns into 108 granular bins
3. **Assembly becomes simple** — single-product bins with photo instructions = no decision-making
4. **Consolidation adds a phase** — city boxes assembled from multiple completed bins
5. **Staging space required** — physical space for 18-bin city sorting areas
6. **Dedicated shipping coordinator needed** — 18 simultaneous deliveries require focused logistics

> **This order structure became the primary use case for designing the enhanced BIN_MANAGEMENT_SYSTEM fields and the CITY_CONSOLIDATION_TRACKING table.**
