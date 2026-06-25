# THE PRODUCT LAB — FACTORY & VENDOR NETWORK

---

## FACTORY ROSTER

| Factory Code | Factory Name | Specialization | Lead Time | Products |
|-------------|-------------|----------------|-----------|----------|
| **IF** | Ink Fish (In-house) | Assembly | 1 day | Final assembly, QC, packing |
| **AC** | Arun CADD | Laser cutting / engraving | 1 day | Keychains, magnets, pins (fiber/wood base) |
| **YD** | Your Design | Apparel manufacturing | 2 days | T-Shirts, custom apparel |
| **OD** | Om Digital | Print / Stationery | 1 day + 1 day finishing | Stickers, printed items, stationery |

---

## FACTORY ROUTING LOGIC

### Core Principle
**Factory routing is PRODUCT-BASED, not CLIENT-BASED.** All keychains go to the keychain factory regardless of which client ordered them. This enables batch production efficiency.

```
ORDER RECEIVED
├── Keychains → Factory AC (Arun CADD) — Laser
├── Fridge Magnets → Factory AC (Arun CADD) — Laser
├── Lapel Pins → Factory AC (Arun CADD) — Laser
├── T-Shirts → Factory YD (Your Design) — Apparel
├── Laptop Stickers → Factory OD (Om Digital) — Print
├── 3D Stickers → Factory OD (Om Digital) — Print
├── Coasters → Factory OD (Om Digital) — Print + Finishing
└── All items → Factory IF (In-house) — Assembly + QC + Packing
```

### Batch Production Flow
```
Multiple client orders arrive
├── All keychain orders (Client A + Client B + Client C) → Factory AC as single batch
├── All sticker orders (Client A + Client D) → Factory OD as single batch
├── Factory returns mixed batch → Ops Manager sorts into client-specific bins
└── Bin-specific items → Assembly → QC → Packing → Ship
```

---

## FACTORY DATABASE SCHEMA (DESIGNED)

```sql
Table: factories
- factory_id (Primary Key)
- factory_name
- factory_code (AC/YD/OD/IF)
- contact_person
- phone
- email
- address
- specialization
- capabilities
- standard_lead_time_days
- payment_terms
- preferred_communication
- quality_rating (1-5)
- on_time_delivery_rate
- cost_competitiveness (1-5)
- capacity_per_day
- working_days_pattern
- factory_status (Active/Inactive)
```

---

## AIRTABLE FACTORY INTEGRATION

### Existing Table: TPL Factory synced
**Referenced in Line Items via:** `fldp9957OBVdUi1Rt` — TPL Factory Production 1

### Factory-Related Fields in Line Items Table (`tbl0iL9jPlWWdZTMw`)

| Field Name | Field ID | Type | Purpose |
|------------|----------|------|---------|
| TPL Factory Production 1 | `fldp9957OBVdUi1Rt` | Multiple Record Links | Factory assignment |
| FACTORY_RECEIVED | `fldd5uDWxaAxcwTpR` | Checkbox | Factory confirmed receipt |
| FACTORY_DELIVERY_RECEIVED | `fldWPsBQZ5XhXCamK` | Checkbox | Items returned from factory |
| FACTORY_COORDINATOR | `fldshM9TLaYegtduU` | Collaborator | Assigned coordinator |
| FACTORY_TIMELINE_START | `fldkzczXdUrE3sB8h` | DateTime | Production start timestamp |
| FACTORY_TIMELINE_END | `fldIwqxpaBLPcuQzz` | DateTime | Production end timestamp |

### Production Schedule Table (`tblUGH2mrRpkMe6If`)

| Field Name | Field ID | Type |
|------------|----------|------|
| Name | `fldeyLCbbckeuWmxd` | Text |
| Task info | `fldKnnvFtmSCZs6MF` | Text |
| Task category | `fldhAVA3lWuKxWRvm` | Select |
| Status | `fldXyTZjfPymGEoYX` | Select |
| factory | `fld6P6ddDXxHlv7kq` | Link |
| Product | `fldZk0Gu0UbMeJjoy` | Link |
| Factory code (from factory) | `fldTOfs4t3nVTN54k` | Lookup |
| Created by | `fldwUEAaIfZGkWuR5` | Collaborator |
| Allocated to | `fldca8c7bWJbN005H` | Collaborator |
| Production request date | `fldQlD63IakODph3x` | Date |
| Completed qty | `flddYWbwHS8whRx53` | Number |
| Completed by | `fldmUsByJm0e3NhQ5` | Collaborator |

---

## FACTORY COMMUNICATION PROTOCOL

### Outgoing to Factory (Standard Template)
```
PRODUCTION ORDER: [Product Code]-[Batch Number]
PRODUCT: [Product Type]
TOTAL QUANTITY: [Number] pieces
VARIATIONS: [Count] designs (quantities in attached sheet)
QUALITY STANDARD: [Client] grade
DELIVERY DATE: [Date]
RETURN PACKAGING: Sorted by design type
```

### Factory Return Organization (Expected)
```
FACTORY RETURNS:
├── Box 1: Design A - [Destination] (X pieces)
├── Box 2: Design B - [Destination] (Y pieces)
├── Box 3: Design C - [Destination] (Z pieces)
└── [Separate boxes by design, not by final destination]
```

> **⚠️ OPERATIONAL NOTE:** Factories return mixed batches sorted by design/product type. The Ops Manager must then sort these into client-specific and city-specific bins. This is the critical sorting bottleneck that the bin allocation system addresses.

---

## FACTORY PERFORMANCE TRACKING (DESIGNED, NOT YET IMPLEMENTED)

### KPIs to Track

| Metric | Target |
|--------|--------|
| On-time delivery rate | >90% |
| Quality pass rate at receipt | >95% |
| Lead time consistency | Within ±0.5 days of standard |
| Communication responsiveness | Same-day acknowledgment |

### Factory Capacity Planning

| Factory | Current Capacity | Target Capacity (12 months) |
|---------|-----------------|----------------------------|
| AC (Arun CADD) | Not formally tracked | 5 orders/division/day |
| YD (Your Design) | Not formally tracked | 5 orders/division/day |
| OD (Om Digital) | Not formally tracked | 5 orders/division/day |
| IF (In-house) | 6 orders simultaneous | 15 orders simultaneous |

> **⚠️ NOTE:** Formal factory capacity metrics are not currently tracked. This was identified as a gap in the operations analysis.
