# THE PRODUCT LAB — BIN ALLOCATION SYSTEM

---

## SYSTEM OVERVIEW

The Bin Allocation System is TPL's physical-digital integration layer. Each order line item receives a dedicated physical bin that moves through the facility. QR scanning at each station triggers automatic digital status updates, eliminating communication gaps and the "goldfish memory" problem.

### Why Bins? (Confirmed Rationale)
- **Toyota-Proven:** Kanban bin system from Toyota Production System
- **Eliminates Goldfish Memory:** Physical bins serve as persistent visual reminders
- **Reduces Communication Overhead:** Visual system replaces WhatsApp coordination
- **Prevents Material Mix-ups:** Each order's materials isolated in dedicated container
- **Enables Mobile Tracking:** QR codes allow instant status updates via phone scanning

---

## BIN CODE FORMAT

```
Format: TPL-[Order#]-[LineItem#]-[ProductCode]

Product Codes:
- KC = Keychain
- FM = Fridge Magnet
- LP = Lapel Pin
- TS = T-Shirt
- LS = Laptop Sticker
- 3D = 3D Sticker
- CS = Coaster
- EM = Enamel Mug

Examples:
- TPL-412-01-KC → Order 412, Line Item 1, Keychain
- TPL-412-02-FM → Order 412, Line Item 2, Fridge Magnet
- TPL-413-01-TS → Order 413, Line Item 1, T-Shirt
- BIN-001-KC-CHU → Amoeba order, Keychain, Church Street
- BIN-002-FM-CHU → Amoeba order, Fridge Magnet, Church Street
```

**Physical Label:** Waterproof labels with order details and QR code
**QR Code:** Auto-generated via `fldUheFJVzXrlqc3e` (QR_CODE_URL formula)

---

## 7 PHYSICAL LOCATION ZONES

| # | Zone Code | Zone Name | Responsible Person | Bin Action |
|---|-----------|-----------|-------------------|------------|
| 1 | CREATION_STATION | Manager's desk area | Dan | Bin created, labeled |
| 2 | MATERIALS_INVENTORY | Kalpana's prep area | Kalpana | Materials allocated into bin |
| 3 | FACTORY_PICKUP | Sara's coordination zone | Sara | Bin sent to factory |
| 4 | AT_FACTORY | External factory floor | Factory | Production in progress |
| 5 | ASSEMBLY_STATION | Sara/Anthony work area | Sara/Anthony | Assembly performed |
| 6 | QC_CHECKPOINT | Manager's inspection area | Dan/Sara | Quality control |
| 7 | PACKING_STATION | Kalpana's final prep | Kalpana | Final packing |
| 8 | SHIPPING_READY | Dispatch staging area | Muskan | Awaiting dispatch |

---

## QR SCANNING WORKFLOW

### Location Change Scans
| Scan Action | Auto-Triggers |
|-------------|---------------|
| "Moved to Materials" | Update location + notify Kalpana |
| "Ready for Factory" | Update location + notify pickup coordinator |
| "Assembly Started" | Update location + start timer |
| "QC Started" | Update location + start inspection timer |
| "Packing Started" | Update location + start packing timer |
| "Shipping Ready" | Update location + notify dispatch team |

### Status Progression Scans
| Scan Action | Auto-Triggers |
|-------------|---------------|
| "Materials Complete" | Advance status + trigger factory notification |
| "Assembly Complete" | Advance status + trigger QC notification |
| "QC Pass" | Advance status + trigger packing notification |
| "Packing Complete" | Advance status + trigger shipping notification |

### Issue Reporting Scans
| Scan Action | Auto-Triggers |
|-------------|---------------|
| "Issue Encountered" | Create alert + notify manager |
| "Rework Required" | Reassign + update timeline |
| "Material Shortage" | Create procurement alert |

---

## BIN_MANAGEMENT_SYSTEM TABLE SCHEMA
**Table ID:** `tblCsz1ekdROTkKqR`

### Existing Fields (16 fields)

| Field Name | Field ID | Type | Formula Logic |
|------------|----------|------|---------------|
| BIN_CODE | `fldvO6gEF01CJlwbq` | Text | Primary key |
| ORDER_REFERENCE | `fldb5E2muvYU1IDFZ` | Link → Offline Orders | — |
| LINE_ITEM_REFERENCE | `fldAq0d7EONAdlJjH` | Link → Product Line Items | — |
| products synced | `fldo5Xx6AXfZ2TjM8` | Lookup | From LINE_ITEM_REFERENCE |
| BIN_STATUS_ULTRA_SMART | `fld54jffgGSRppAMt` | Formula | Rollup from line item WORKFLOW_STAGE |
| CURRENT_LOCATION_AUTO | `fldz4tVQjYnQj7Gzh` | Formula | Based on BIN_STATUS |
| RESPONSIBLE_PERSON_AUTO | `fldAig9xfZ1fgrUWZ` | Formula | Based on CURRENT_LOCATION |
| PRIORITY_SCORE_AUTO | `fldqPgrNwiyQRZtmm` | Formula | Deadline urgency + customer importance + order value |
| TIME_AT_CURRENT_STAGE | `fldNFpdeCgf9KGYIZ` | Formula | Current time − last status change |
| STAGE_EFFICIENCY_RATING | `fldjzFORAFY631jxP` | Formula | Standard duration / actual × 100 |
| BOTTLENECK_RISK_LEVEL | `flde1HbuKQjy137jF` | Formula | HIGH/MEDIUM/LOW based on time thresholds |
| NEXT_ACTION_DEADLINE | `fldWFiSAqqmbZe5iH` | Formula | Calculated next milestone |
| QR_CODE_URL | `fldUheFJVzXrlqc3e` | Formula | Generates scannable QR code |
| INTELLIGENT_ALERTS_SYSTEM | `fldqm1Btd752pnIsk` | Link → Alerts table | — |
| PERFORMANCE_INTELLIGENCE_ENGINE | `fldKi5b4j5FNXYimQ` | Link → Performance table | — |
| Bin autonumber | `fldF37PZnwo5WPLbg` | Auto Number | — |

### Formula Details

**CURRENT_LOCATION_AUTO logic:**
```
CREATED → "CREATION_STATION"
MATERIALS_READY → "FACTORY_PICKUP"
AT_FACTORY → "FACTORY_FLOOR"
ASSEMBLY_READY → "ASSEMBLY_STATION"
QC_PENDING → "QC_CHECKPOINT"
PACKING_READY → "PACKING_STATION"
SHIPPING_READY → "SHIPPING_AREA"
```

**RESPONSIBLE_PERSON_AUTO logic:**
```
CREATION_STATION → "Dan"
FACTORY_PICKUP → "Sara"
ASSEMBLY_STATION → "Sara/Anthony"
QC_CHECKPOINT → "Dan/Sara"
PACKING_STATION → "Kalpana"
SHIPPING_AREA → "Muskan"
```

**PRIORITY_SCORE_AUTO logic (1-10):**
```
Order_deadline_urgency: 0-4 points
Customer_importance_level: 0-3 points
Order_value_tier: 0-3 points
```

**BOTTLENECK_RISK_LEVEL logic:**
```
IF(TIME_AT_CURRENT_STAGE > Standard_duration × 2, "HIGH_RISK",
   IF(TIME_AT_CURRENT_STAGE > Standard_duration × 1.5, "MEDIUM_RISK", "LOW_RISK"))
```

**BIN_STATUS_HEALTH formula:**
```
"🟢 ON_TRACK" | "🟡 ATTENTION" | "🔴 DELAYED"
Based on time at location vs standard duration
```

---

## PLANNED ADDITIONAL FIELDS FOR BIN TABLE

These 16 fields were designed for the Amoeba multi-city order enhancement:

| Field Name | Proposed ID | Type | Purpose |
|------------|-------------|------|---------|
| CITY_DESTINATION | `fld_CITY_DEST_BIN` | Single Line Text | Final shipping destination |
| QUANTITY_ALLOCATED | `fld_QTY_ALLOCATED_BIN` | Number | Pieces assigned to bin |
| QUANTITY_CONFIRMED | `fld_QTY_CONFIRMED_BIN` | Number | Verified count |
| PRODUCT_TYPE | `fld_PRODUCT_TYPE_BIN` | Single Select | Product category |
| FACTORY_BATCH_REFERENCE | `fld_FACTORY_BATCH_BIN` | Single Line Text | Links to factory batch |
| FACTORY_SORT_STATUS | `fld_FACTORY_SORT_BIN` | Single Select | Pending/Sorting/Complete |
| ASSIGNED_SORTER | `fld_ASSIGNED_SORTER_BIN` | Collaborator | Who is sorting |
| SORTING_START_TIME | `fld_SORT_START_BIN` | DateTime | When sorting began |
| SORTING_END_TIME | `fld_SORT_END_BIN` | DateTime | When sorting completed |
| ASSEMBLY_PROGRESS | `fld_ASSEMBLY_PROG_BIN` | Single Select | Assembly status |
| ASSEMBLY_ASSIGNED_TO | `fld_ASSEMBLY_ASSIGN_BIN` | Collaborator | Assembly person |
| ASSEMBLY_COMPLETE_TIME | `fld_ASSEMBLY_DONE_BIN` | DateTime | Completion timestamp |
| QC_BIN_STATUS | `fld_QC_BIN_STATUS` | Single Select | QC result |
| CONSOLIDATION_STATUS | `fld_CONSOLIDATION_BIN` | Single Select | City consolidation status |
| CONSOLIDATION_BOX_ID | `fld_CONSOL_BOX_BIN` | Single Line Text | City box reference |
| ESTIMATED_WEIGHT | `fld_ESTIMATED_WEIGHT` | Rollup | Total package weight |

---

## BIN SCAN LOG TABLE (DESIGNED, NOT YET CREATED)

```
Table: BIN_SCAN_LOG
Fields:
- SCAN_ID (Auto Number)
- BIN_CODE (Link → BIN_MANAGEMENT_SYSTEM)
- SCAN_TIMESTAMP (DateTime — auto)
- SCANNED_BY (Link → Active Team)
- SCAN_LOCATION (Auto-detected or manual)
- SCAN_ACTION (Select: Location_Change / Status_Update / Issue_Report / Completion)
- SCAN_NOTES (Long Text — optional)
- AUTOMATED_ACTIONS_TRIGGERED (Long Text — auto-log of cascade effects)
```

---

## CITY CONSOLIDATION TRACKING (DESIGNED FOR MULTI-CITY ORDERS)

```
Table: CITY_CONSOLIDATION_TRACKING
Fields:
- CITY_BOX_ID (Text — e.g., "CITY-CHU-BLR")
- ORDER_REFERENCE (Link → Offline Orders)
- CITY_NAME (Text)
- BINS_INCLUDED (Link → BIN_MANAGEMENT_SYSTEM — multiple)
- TOTAL_PRODUCTS_IN_BOX (Rollup)
- TOTAL_WEIGHT (Rollup)
- SHIPPING_BOX_SIZE (Select: Small/Medium/Large)
- CONSOLIDATION_STATUS (Select: Collecting/Complete/Shipped)
- SHIPPING_LABEL_GENERATED (Checkbox)
- TRACKING_NUMBER (Text)
```

---

## IMPLEMENTATION ROADMAP

### Phase 1: Physical Infrastructure (Week 1)
- Purchase 50 standardized plastic bins with clear labels
- Install location signage throughout facility (7 zones)
- Set up QR code generation and printing system
- Create mobile scanning stations
- Add bin-related fields to existing Airtable tables
- Create BIN_MANAGEMENT_SYSTEM table (already done: `tblCsz1ekdROTkKqR`)

### Phase 2: Workflow Integration (Week 2)
- Team training on bin creation and labeling
- QR scanning workflow for all team members
- Location-based handoff procedures
- Implement QR scan triggers
- Set up automatic notifications

### Phase 3: Optimization (Week 3)
- Predictive bottleneck detection activation
- Intelligent bin prioritization
- Performance analytics dashboards
- Continuous improvement tracking

### Phase 4: Mastery (Week 4)
- Fine-tune automation triggers
- Optimize team workflows from data
- Implement predictive scheduling
- Scale preparation for 5 orders/division

---

## EXPECTED TRANSFORMATION RESULTS

### Month 1
- 95% elimination of "Where is my order?" questions
- 80% reduction in coordination overhead
- 90% decrease in material mix-ups

### Month 2-3
- Delay rate: 60% → 10%
- Processing capacity: 6 → 15 orders with same team
- Quality rejection: 15% → 5%
- Team coordination: 70% less time on status updates

### Month 4+
- Scalable to ₹1Cr+ revenue
- New team member productivity in days vs weeks
- Data-driven optimization through bin tracking

### KPI Targets
| Metric | Current | Target |
|--------|---------|--------|
| Bin Cycle Time | ~4.0 days | 2.0 days |
| QR Scanning Adoption | 0% | 95% |
| Location Accuracy | Unknown | 99% |
| Handoff Efficiency | Variable | <5 minutes |
| Bottleneck Detection | Reactive | 24-hour early warning |
