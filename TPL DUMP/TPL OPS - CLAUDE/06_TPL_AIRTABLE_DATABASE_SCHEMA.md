# THE PRODUCT LAB — AIRTABLE DATABASE SCHEMA (COMPLETE)

---

## BASE OVERVIEW

| Attribute | Value |
|-----------|-------|
| **Base Name** | TPL - Offline orders management |
| **Base ID** | `appGElpttVt6nZlHe` |
| **Total Tables** | 15 operational tables |
| **Total Fields** | 290+ across core operations |

---

## TABLE DIRECTORY

| # | Table Name | Table ID | Purpose | Field Count |
|---|-----------|----------|---------|-------------|
| 1 | Offline orders | `tblEF1T1QjiHu3HeJ` | Master order management | 140+ |
| 2 | orders Product line item | `tbl0iL9jPlWWdZTMw` | Granular product-level workflow | 150+ |
| 3 | TPL Products synced | `tblAG00XINg9MCzyL` | Product master catalog | ~20 |
| 4 | IF Clients synced | `tblbd86y3dmYakDDM` | Client database | ~15 |
| 5 | Production schedule | `tblUGH2mrRpkMe6If` | Factory production tracking | ~25 |
| 6 | BIN_MANAGEMENT_SYSTEM | `tblCsz1ekdROTkKqR` | Physical bin workflow | 16 |
| 7 | INTELLIGENT_ALERTS_SYSTEM | `tbladYT56YcK85Bsw` | Process alerts | 13 |
| 8 | PERFORMANCE_INTELLIGENCE_ENGINE | `tblsIZQtN87xxuFky` | Performance analytics | 21 |
| 9 | Active Team | `tblfOCGGBIHHVW3qb` | Team assignment | — |
| 10 | TPL_Factory_synced | — | Factory master data | — |
| 11 | Cancellation & escalations - overview | `tblZ9Xt38WQTn0ohK` | Exception management | 7 |
| 12 | TPL Offline Inventory usage | — | Inventory tracking | — |
| 13 | Stock area management | — | Physical stock locations | — |
| 14 | Purchase Orders | — | Procurement | — |
| 15 | Inventory Management | — | Inventory lifecycle | — |

---

## TABLE 1: OFFLINE ORDERS (MASTER)
**Table ID:** `tblEF1T1QjiHu3HeJ`

### Primary Identification

| Field Name | Field ID | Type |
|------------|----------|------|
| Order ID | `flddZSQzNcqs0I5Kc` | Single Line Text |
| Autonumber | `fldiFkSsGgyx2B3yv` | Auto Number |
| Order Number (display) | `fld7O6zW2SgujTrko` | Formula |
| Order ID YY | `fldY7IAVL1Pc40Yti` | Formula |
| Order ID formatted and linked | `fldviL0iw0DupBM4j` | Formula |
| Order Spec | `fldVIf7PfiiZaxdvm` | Long Text |
| Order notes | `fldUKtqyj57AWmhAF` | Long Text |
| Master order management | `fldSLsF1qJyXfZY8R` | Link |

### Client & Relationship

| Field Name | Field ID | Type |
|------------|----------|------|
| Consolidated buyer | `fldpbQLEVIDtognrX` | Multiple Record Links → IF Clients synced |
| Client name (Linked) | `fldJUYMLb4WBSGCwV` | Multiple Record Links → IF Clients synced |
| UID (from Consolidated buyer) | `fld2ppQAoDP3a1GYd` | Lookup |
| Company name (from Consolidated buyer) | `fldMj7yQap7FJM8pP` | Lookup |
| client Logo | `fldK35lu9VVR9PN5m` | Attachment |

### Status & Workflow

| Field Name | Field ID | Type | Options |
|------------|----------|------|---------|
| Status | `fldTnuKO3MMforu0E` | Single Select | Lead/Processing/Confirmed/etc. |
| status tags (from Status) | `fldx3Y8iuB8yPlrHQ` | Lookup | — |
| Status name | `fldDaTBZcZVNeTxqg` | Formula | — |
| Status icon roll up | `fldxvILMjXSVtgt43` | Lookup | — |
| ORDER_STATUS_SMART | `fldZ461Rk1LetSQIL` | Formula | Intelligent status |
| Dispatch status | `fldrhMyxNDWuXSp66` | Select | — |
| Approval status | `fldhpQrDfzbTaOxZc` | Link | — |
| Payment status | `fldVRkHHh6zk3enLs` | Select | — |

### Dates & Timeline

| Field Name | Field ID | Type |
|------------|----------|------|
| Created date | `fldwz6vVOjDqzvV7B` | Created Time (Asia/Kolkata) |
| Requested date | `fldAPvdMlKUGjxCtN` | Date |
| Deadline date | `fldsKzd1JgCIsXXaC` | Date |
| Deadline date timer | `fldzJ38ESutYYCdoY` | Formula |
| date format | `fld7spPpouYnhcbGK` | Formula |
| Follow up date | `fld4jqOfb9WQ8qYwI` | Date |

### Category & Classification

| Field Name | Field ID | Type | Options |
|------------|----------|------|---------|
| Category | `fldU2fieLjxH1dcrS` | Single Select | Corporate (`selrrG655fGw2nrua`) etc. |
| Order Type | `fld2ObKwIK15ONkLN` | Single Select | Corporate (`selCEVEUdE6DosDH7`) etc. |
| Priority level | `fldZEf8KDnyUSl3OO` | Single Select | High (`sel5eq8DARXeu5DAH`) etc. |
| Urgency Level | `fldmjFA3ADosxEZn9` | Single Select | VIP (`sel7zng609xt3TbgR`) etc. |
| Channel Source | `fldjTQwJUJi1B0cAi` | Single Select | B2B Portal (`selbpQRvaE4oau4pm`) etc. |
| Product Category | `fldWO749xjxFeoekr` | Select | — |

### Financial

| Field Name | Field ID | Type |
|------------|----------|------|
| Total Order Value | `fldCb1sukMJijMarM` | Currency |
| Estimate | `fldVnxxuxD23C2wqm` | Currency |
| Shipping Amount | `fldrwQqBaSsL1ijpM` | Currency |
| FINAL_ORDER_VALUE_CONFIRMED | `fldCem6dr61PPUuKz` | Currency |
| Line item price Rollup | `fldRbN0A4pYAgfKrw` | Rollup |

### Shipping & Delivery

| Field Name | Field ID | Type |
|------------|----------|------|
| Shipping ID | `fldS8bPsUEnFjTojg` | Text |
| Dispatch method | `fld5BkqpSEuPkc9zb` | Select |
| ORDER_READY_FOR_SHIPPING | `fld9oib3BNkOTOfSD` | Checkbox |
| PARCEL_BOOKED | `fldvs7GXEClnJXCr0` | Checkbox |
| SHIPPING_DATE_ENHANCED | `fldCf5wcOMrx1M7fC` | DateTime |
| DELIVERY_STATUS_ENHANCED | `fldnCKzYz8vpvufnV` | Select |

### Intelligence & Automation

| Field Name | Field ID | Type | Status |
|------------|----------|------|--------|
| DELAY_RISK_INTELLIGENCE | `flduvh41oJw6Bw8Wk` | Formula | ✅ Working |
| NEXT_CRITICAL_ACTION_AUTO | `fldk6uE7uqE51LfUA` | Formula | ✅ Working |
| RESOURCE_BOTTLENECK_ALERT | `fldX3v58dYXJn1w0y` | Formula | ✅ Working |
| EXECUTIVE_PRIORITY_SCORE | `fldVnxSDq1wnSrB0H` | Formula | ✅ Working |
| Time in Current Status (Days) | `fldpdjevWU2gFnull` | Formula | ✅ Working |
| Is Bottleneck? | `fldVkezVT2Fkzwu3i` | Formula | ✅ Working |
| Priority_Score | `fldoCjWDYiI544W9v` | Formula | — |
| Escalation_Flag | `fld1rxKLpJ1wKyIbf` | Formula | — |
| Performance_Velocity_Score | `fldNMR2B3lSZUcAWM` | Formula | — |

### Team & Workflow Tracking

| Field Name | Field ID | Type |
|------------|----------|------|
| Created by | `fldUAdjJ3my3xLZMt` | Collaborator |
| Allocated to | `fld7oX91ggTsaxfDz` | Link |
| OF Team (All) | `fld03zUK93gh0CWJH` | Rollup |
| All teams | `fldVU23boFwU10Ewr` | Formula |

### Customer Experience

| Field Name | Field ID | Type |
|------------|----------|------|
| CUSTOMER_FEEDBACK | `fldepvyu3x3JDQbHR` | Long Text |
| CUSTOMER_SATISFACTION_RATING | `fldDK2gJ5utkqkHYs` | Rating (1-5, yellowBright) |
| CUSTOMER_UPDATE_REQUIRED | `fldSc5YrFic4qQyux` | Formula |

### Cross-Table Links

| Field Name | Field ID | Links To |
|------------|----------|----------|
| orders Product line item | `fldXWa1RpL3l6r7Sv` | → `tbl0iL9jPlWWdZTMw` |
| BIN_MANAGEMENT_SYSTEM | `fld81bHEPG93ctPFX` | → `tblCsz1ekdROTkKqR` |
| INTELLIGENT_ALERTS_SYSTEM | `fldzzOJoNpkygVeBE` | → `tbladYT56YcK85Bsw` |
| PERFORMANCE_INTELLIGENCE_ENGINE | `fldt2S39ReXSGtfhY` | → `tblsIZQtN87xxuFky` |

---

## TABLE 2: ORDERS PRODUCT LINE ITEM
**Table ID:** `tbl0iL9jPlWWdZTMw`

### Primary Identification

| Field Name | Field ID | Type |
|------------|----------|------|
| autonumber | `fldOfL8sPEcGcHimD` | Auto Number |
| Name(formulated) | `fldQ8iWUAAnmZru8G` | Formula |
| Product line id | `fldVxcEF7KlJVHJEt` | Single Line Text |
| Product line id (Formatted) | `fldHh9OFtXgtOs7Ai` | Formula |

### Relationships

| Field Name | Field ID | Links To |
|------------|----------|----------|
| Offline Orders | `fldcaJs4n1aZCeh7O` | → `tblEF1T1QjiHu3HeJ` |
| products synced | `fldw8ZRUnTpfgqAe6` | → `tblAG00XINg9MCzyL` |
| Product Name (from products synced) | `fld3FkcrCHOO1AfsX` | Lookup |

### Quantity & Pricing

| Field Name | Field ID | Type | Status |
|------------|----------|------|--------|
| Requested Qty | `fldJ9C1tbYYJrnJgl` | Number (precision 0) | — |
| Unit_Price | `fld0GdJCFapHqRcPy` | Currency (₹, precision 2) | ⚠️ 20% missing |
| Line_Total | `fldju2TdD009Pxz9y` | Formula | ⚠️ NEEDS FIX (Qty × Price) |
| Artist_Commission | `fldOvxQLJ6NIb0kWv` | Number (precision 2) | — |
| Customization Details | `fldN7bgL1Po0C0I0x` | Long Text | — |

### Design Workflow

| Field Name | Field ID | Type | Status |
|------------|----------|------|--------|
| DESIGN_STATUS | `fldneNjwxNT9pnVzO` | Single Select | — |
| DESIGN_STATUS_AUTO | `fldwW5HXaIxOaL8R5` | Formula | ✅ Working (file upload detection) |
| Mock up | `fldfg582PyUr3F9OD` | Attachment | — |
| Print file | `fldQ26a4i91fWdZ4s` | Attachment | — |
| CLIENT_APPROVAL_STATUS | `fldLKivCDf2gdf40V` | Single Select | — |
| APPROVAL_STATUS_AUTO | `fld63QLyUeJb5Ff9j` | Formula | ⚠️ NEEDS FORMULA |
| APPROVAL_TIMESTAMP | `fldkuhf3q0O3dVQ9B` | DateTime | — |

### Bin & Physical Workflow

| Field Name | Field ID | Type | Status |
|------------|----------|------|--------|
| BIN_CODE_GENERATED | `fldyg2mFEJ6IvNyad` | Formula | ✅ Working |
| BIN_CODE_AUTO | `fldDFmz7fJZbQZAUB` | Formula | ⚠️ NEEDS TRIGGER |
| BIN_STATUS | `fldDCdzb4MofFcumK` | Single Select | — |
| PHYSICAL_LOCATION | `fldPWqHq651U8DgAg` | Single Select | — |
| MATERIALS_CHECKLIST | `fldPltHnoxzNmKhmM` | Long Text | — |

### Materials & Allocation

| Field Name | Field ID | Type | Status |
|------------|----------|------|--------|
| MATERIALS_ALLOCATED | `fldRQeYOG47D47BqD` | Checkbox (greenBright) | ⚠️ Only 35% compliance |
| MATERIAL_ALLOCATION_DATE | `fldRCBv0WvTvWrtjX` | DateTime | — |

### Factory & Production

| Field Name | Field ID | Type |
|------------|----------|------|
| TPL Factory Production 1 | `fldp9957OBVdUi1Rt` | Multiple Record Links |
| FACTORY_RECEIVED | `fldd5uDWxaAxcwTpR` | Checkbox |
| FACTORY_DELIVERY_RECEIVED | `fldWPsBQZ5XhXCamK` | Checkbox |
| FACTORY_COORDINATOR | `fldshM9TLaYegtduU` | Collaborator |
| FACTORY_TIMELINE_START | `fldkzczXdUrE3sB8h` | DateTime |
| FACTORY_TIMELINE_END | `fldIwqxpaBLPcuQzz` | DateTime |

### Assembly & QC

| Field Name | Field ID | Type |
|------------|----------|------|
| ASSEMBLY_COMPLETE | `fldm8fmyME6HHgJY0` | Checkbox |
| ASSEMBLY_START_TIME | `fldHd1iZZmW3NI9d7` | DateTime |
| QC_STATUS_ENHANCED | `fldTAUlY4PCr8dPAF` | Select |
| QC_QUANTITY_PASSED | `fldGMRDKXcG709d7R` | Number |
| QC_QUANTITY_FAILED | `fldVA6JI9M0srGZma` | Number |

### Workflow Intelligence

| Field Name | Field ID | Type | Status |
|------------|----------|------|--------|
| WORKFLOW_STAGE_ULTRA_AUTO | `fldFLVFN9XChSCpkF` | Formula | ✅ Working (8-stage detection) |
| NEXT_ACTION_SPECIFIC | `fldWOe7lUfF7QMz6C` | Formula | ✅ Working |
| STAGE_HEALTH_INDICATOR | `fldxVBILU0cqWnrjW` | Formula | ⚠️ Needs time-based formula |

---

## TABLE 6: BIN_MANAGEMENT_SYSTEM
**Table ID:** `tblCsz1ekdROTkKqR`

| Field Name | Field ID | Type |
|------------|----------|------|
| BIN_CODE | `fldvO6gEF01CJlwbq` | Text (Primary) |
| ORDER_REFERENCE | `fldb5E2muvYU1IDFZ` | Link → Offline Orders |
| LINE_ITEM_REFERENCE | `fldAq0d7EONAdlJjH` | Link → Product Line Items |
| products synced (from LINE_ITEM_REFERENCE) | `fldo5Xx6AXfZ2TjM8` | Lookup |
| BIN_STATUS_ULTRA_SMART | `fld54jffgGSRppAMt` | Formula |
| CURRENT_LOCATION_AUTO | `fldz4tVQjYnQj7Gzh` | Formula |
| RESPONSIBLE_PERSON_AUTO | `fldAig9xfZ1fgrUWZ` | Formula |
| PRIORITY_SCORE_AUTO | `fldqPgrNwiyQRZtmm` | Formula |
| TIME_AT_CURRENT_STAGE | `fldNFpdeCgf9KGYIZ` | Formula |
| STAGE_EFFICIENCY_RATING | `fldjzFORAFY631jxP` | Formula |
| BOTTLENECK_RISK_LEVEL | `flde1HbuKQjy137jF` | Formula |
| NEXT_ACTION_DEADLINE | `fldWFiSAqqmbZe5iH` | Formula |
| QR_CODE_URL | `fldUheFJVzXrlqc3e` | Formula |
| INTELLIGENT_ALERTS_SYSTEM | `fldqm1Btd752pnIsk` | Link → Alerts |
| PERFORMANCE_INTELLIGENCE_ENGINE | `fldKi5b4j5FNXYimQ` | Link → Performance |
| Bin autonumber | `fldF37PZnwo5WPLbg` | Auto Number |

---

## TABLE 7: INTELLIGENT_ALERTS_SYSTEM
**Table ID:** `tbladYT56YcK85Bsw`

| Field Name | Field ID | Type |
|------------|----------|------|
| ALERT_ID | `fldwBvePeabYZGWKg` | Text |
| ALERT_TYPE_AUTO | `fldh7PC3QuF74t2Ok` | Formula |
| PRIORITY_INTELLIGENCE | `fldRp5bxXuA7vwWKX` | Formula |
| AFFECTED_ORDER | `fldnTVG5TvaSRT8gE` | Link |
| AFFECTED_LINE_ITEM | `fldOnn2Qj7Abfg2xp` | Link |
| AFFECTED_BIN | `fldzqBxHZI7rEPbtU` | Link |
| ALERT_MESSAGE_AUTO | `fldSy0bIbKwurC5CF` | Formula |
| RESPONSIBLE_TEAM_AUTO | `fldq1bjVp88HH6vvC` | Formula |
| SUGGESTED_ACTIONS_AUTO | `fldZIXgiB9VbrMFTc` | Formula |
| ESCALATION_TIMER_AUTO | `fldLUtVkF0CwcZRVD` | Formula |
| RESOLUTION_STATUS_AUTO | `fldbgk3OzfegyBora` | Formula |
| FINANCIAL_IMPACT_ESTIMATE | `flde015uBAj7p7kmH` | Formula |
| Resolution Notes | `fldSNbiJBQeZvAE2N` | Long Text |

---

## TABLE 8: PERFORMANCE_INTELLIGENCE_ENGINE
**Table ID:** `tblsIZQtN87xxuFky`

| Field Name | Field ID | Type |
|------------|----------|------|
| PERFORMANCE_ID | `fldxqckZdKktmdozm` | Text |
| ORDER_REFERENCE | `fldrRRdzzUIrToCmi` | Link |
| LINE_ITEM_REFERENCE | `flduDKsGe3CHbXHSZ` | Link |
| BIN_REFERENCE | `fldhKObJsSi5hU33l` | Link |
| STAGE_PERFORMANCE_AUTO | `fldX4coYiGi3KFIHM` | Formula |
| OVERALL_EFFICIENCY_SCORE | `fldfAjqadHaJrztku` | Formula |
| QUALITY_PERFORMANCE_AUTO | `fldLVl87hkYZ4tdqe` | Formula |
| COST_PERFORMANCE_AUTO | `fldDeP2uTF5HKW6TY` | Formula |
| TIMELINE_PERFORMANCE_AUTO | `fld4dJKBvx5VmRjXU` | Formula |
| BOTTLENECK_ANALYSIS_AUTO | `fldXrd0dLSdt0B7VT` | Formula |
| IMPROVEMENT_SUGGESTIONS_AUTO | `fldG14SLIGbTqLw1Q` | Formula |
| Actual Design Time | `fldDhIrwVTQpqbiA7` | Number |
| Actual Factory Time | `fldQH7tM80IhP1nPj` | Number |
| Actual Assembly Time | `fldhykK0z5TsIERj0` | Number |
| Actual QC Time | `fldmYuEtivqyKSsJq` | Number |
| Actual Packing Time | `fldAZcuRtU6XV99wW` | Number |
| Budgeted Cost | `fldHm0bNsuFbTTQgf` | Currency |
| Actual Cost | `fldh1xPF4bFczurf9` | Currency |
| Standard Timeline | `fldNlRnir0eKzNgcY` | Number |
| Actual Timeline | `fldVrIdeNfb5XmMj5` | Number |

---

## CRITICAL FIELD STATUS SUMMARY

### ✅ Fully Working Smart Fields
- `WORKFLOW_STAGE_ULTRA_AUTO` — 8-stage detection
- `DESIGN_STATUS_AUTO` — file upload triggered
- `EXECUTIVE_PRIORITY_SCORE` — risk-based scoring
- `ORDER_STATUS_SMART` — intelligent status
- `BIN_CODE_GENERATED` — auto-generates codes

### ⚠️ Needs Immediate Fixes
- `Line_Total` — missing Qty × Price calculation
- `APPROVAL_STATUS_AUTO` — no logic implemented
- `STAGE_HEALTH_INDICATOR` — no time-based formula
- `BIN_CODE_AUTO` — no trigger mechanism

### 🔴 Critical Data Gaps
- `MATERIALS_ALLOCATED` — only 35% compliance
- `QC_QUANTITY_PASSED/FAILED` — often empty
- `Unit_Price` — 20% missing
- `CUSTOMER_FEEDBACK` — 60% empty
