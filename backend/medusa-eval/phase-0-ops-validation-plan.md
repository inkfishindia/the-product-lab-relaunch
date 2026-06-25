# Phase 0 Ops Validation Plan: Medusa + Supabase

<!-- last-updated: 2026-05-29 -->
<!-- author: Andy (Operations Systems Lead) -->

## 1. Ops Validation Objective

Validate whether Medusa + Supabase can connect to TPL's real operations backbone — Airtable, Shiprocket, COD handling, packing, fulfillment, and daily order management — without introducing unacceptable operational drag, duplicate systems, or manual re-entry.

This is not a strategy memo. It answers a specific question: **Can Dan run daily ops on Medusa without Fynd, using Airtable as the ops cockpit and Shiprocket for shipping?**

The existing Phase 4 ops plan (artifacts/phase-4/ops-implementation-plan.md) assumes Fynd as the order source that feeds Shiprocket. Every ops SOP, daily checklist, and failure scenario is built on that assumption. Medusa replaces Fynd but inherits none of its integrations. This plan validates whether the replacement path is operationally viable.

## 2. Systems Under Review

| System | Role in Ops | What Changes With Medusa |
|---|---|---|
| Airtable Base 7 (Online Orders) | Ops cockpit for online D2C orders | Must accept Medusa orders instead of WooCommerce/Fynd orders |
| Airtable Base 1 (Inventory) | Stock tracking, reorder management | Inventory truth moves to Medusa; Airtable tracks raw/production stock |
| Airtable Base 2 (Reminders) | Task management, NDR follow-ups | No change |
| Airtable Base 4 (Factory & Products) | Master product catalog | Medusa becomes source of truth for sellable products; Airtable retains cost, supplier, raw material data |
| Shiprocket | AWB, labels, tracking, COD, NDR/RTO | Must receive orders from Medusa instead of Fynd |
| Razorpay | Payment capture, refunds, webhook | Must integrate with Medusa instead of Fynd/WooCommerce |
| WhatsApp Business / Gupshup | COD confirmation, NDR follow-up, tracking | No change — triggered by Shiprocket or order events |
| Google Sheets (inventory register) | Launch-phase stock tracking | No change — Dan continues using this |

## 3. Airtable Test Base/Table Requirement

### Base: `TPL Online Orders (Medusa Spike)`
**Type:** New test base — do NOT use production Base 7 during spike.

### Table: `Medusa Order Mirror`
**Single table.** Do not replicate the 15-table Base 5 (Offline Orders) complexity. One flat table per order.

### Table Configuration

| Setting | Value | Reason |
|---|---|---|
| Base name | TPL Online Orders (Medusa Spike) | Isolated from production ops data |
| Table name | Medusa Order Mirror | Clear purpose |
| Primary field | Medusa Order ID | Idempotency key |
| Record linking | None in Phase 0 | Prevent accidental cross-base writes |
| Airtable permissions | Dan only (creator), Ops read-only | Limit risk during spike |
| Airtable Personal Access Token scope | `data.records:read` and `data.records:write` on this base only | Minimum privilege |

### Why a Flat Table Works for Phase 0

The existing Base 5 (Offline Orders) has 15 tables and 140+ fields because it manages production scheduling, BIN tracking, raw materials allocation, and multi-stage QC. Online D2C orders are simpler:
- No production scheduling (products are pre-manufactured)
- No BIN tracking
- No material allocation workflow
- No multi-stage QC (single QC at packing)

A flat order mirror with ops status fields is sufficient for launch volume.

## 4. Airtable Field Map Review

### Minimum Required Fields

| # | Airtable Field | Type | Source | Required for Phase 0? |
|---|---|---|---|---|
| 1 | Medusa Order ID | Text (primary) | Medusa | Yes — idempotency key |
| 2 | Display Order Number | Text | Medusa | Yes — human reference |
| 3 | Order Date | Date | Medusa | Yes |
| 4 | Customer Name | Text | Medusa | Yes |
| 5 | Customer Phone | Text | Medusa | Yes — fulfillment contact |
| 6 | Customer Email | Text | Medusa | Yes — notification |
| 7 | Shipping Address | Long text | Medusa | Yes |
| 8 | Pincode | Text | Medusa | Yes — Shiprocket requirement |
| 9 | Payment Method | Select (Prepaid / COD) | Medusa/Razorpay | Yes |
| 10 | Payment Status | Select | Razorpay mirror | Yes |
| 11 | Razorpay Payment ID | Text | Razorpay | Yes — reconciliation |
| 12 | Order Value | Currency (INR) | Medusa mirror | Yes |
| 13 | Line Items | Long text / JSON | Medusa mirror | Yes |
| 14 | SKUs | Text (comma-separated) | Medusa mirror | Yes |
| 15 | Quantity Total | Number | Medusa mirror | Yes |
| 16 | Fulfillment Status | Select | Medusa/Shiprocket mirror | Yes |
| 17 | Production Status | Single select | Ops-editable | Yes |
| 18 | Packing Status | Single select | Ops-editable | Yes |
| 19 | QC Status | Single select | Ops-editable | Yes |
| 20 | Shiprocket AWB | Text | Shiprocket mirror | Yes |
| 21 | Courier Name | Text | Shiprocket mirror | Yes |
| 22 | Tracking URL | URL | Shiprocket mirror | Yes |
| 23 | Internal Notes | Long text | Ops-editable | Yes |
| 24 | Exception Status | Single select | Ops-editable | Yes |
| 25 | Last Synced At | Date | System-generated | Yes — sync audit |
| 26 | Sync Error | Long text | System-generated | Yes — error tracking |

### Optional Fields

| # | Airtable Field | Type | Source | When Needed |
|---|---|---|---|---|
| 27 | Shipping Address Line 2 | Text | Medusa | If needed for delivery |
| 28 | City | Text | Medusa | Recommended for Shiprocket mapping |
| 29 | State | Text | Medusa | Recommended for Shiprocket mapping |
| 30 | COD Amount | Currency (INR) | Medusa/Razorpay | Launch — for COD orders |
| 31 | NDR Status | Text | Shiprocket mirror | Launch — NDR handling |
| 32 | RTO Initiated | Date | Shiprocket mirror | Launch — RTO tracking |
| 33 | WhatsApp Confirmed | Checkbox | System-generated | Launch — COD workflow |
| 34 | Weight (g) | Number | Medusa/Manual | If using Shiprocket weight-based pricing |
| 35 | Dispatch Date | Date | Ops-editable | Launch — fulfillment tracking |

### Fields NOT in Airtable (By Design)

| Field | Why Not In Airtable | Where It Lives |
|---|---|---|
| Inventory available to sell | Airtable would compete with Medusa truth | Medusa |
| Raw material inventory | Not relevant for online D2C spike | Airtable Base 1 |
| Customer account password | Security — PII minimization | Medusa |
| Cart state | Would become stale mirror | Medusa |
| Refund state | Never editable in Airtable | Razorpay + Medusa |
| Shipping cost breakdown | Would create reconciliation complexity | Medusa + Shiprocket |

## 5. Read-Only vs Ops-Editable Field Classification

### Medusa Mirror Fields — Do Not Edit In Airtable

These fields are synced from Medusa. Airtable changes would either be overwritten by the next sync or create conflicting truth.

| Field | Why Read-Only |
|---|---|
| Medusa Order ID | Idempotency key — never edit |
| Display Order Number | Human reference — never edit |
| Order Date | Financial record — never edit |
| Customer Name | PII — never edit in Airtable |
| Customer Phone | Fulfillment critical — edit only in Medusa |
| Customer Email | Notification critical — edit only in Medusa |
| Shipping Address | Fulfillment critical — edit only in Medusa |
| Pincode | Shiprocket requirement — edit only in Medusa |
| Order Value | Financial truth — never edit in Airtable |
| Line Items | Commerce truth — never edit in Airtable |
| SKUs | Commerce truth — never edit in Airtable |
| Quantity Total | Derived from line items — never edit manually |
| Fulfillment Status | Mirror from Medusa/Shiprocket — do not edit directly |
| Weight (g) | Shipping calculation input — edit in Medusa |

### Razorpay Mirror Fields — Do Not Edit In Airtable

| Field | Why Read-Only |
|---|---|
| Payment Method | Razorpay/Medusa truth — never edit |
| Payment Status | Razorpay webhook truth — never edit |
| Razorpay Payment ID | Reconciliation reference — never edit |
| COD Amount | If different from order value — Razorpay truth |

### Shiprocket Mirror Fields — Read-Only (Synced From Shiprocket)

| Field | Sync Direction |
|---|---|
| Shiprocket AWB | Shiprocket → Airtable |
| Courier Name | Shiprocket → Airtable |
| Tracking URL | Shiprocket → Airtable |
| NDR Status | Shiprocket → Airtable |
| RTO Initiated | Shiprocket → Airtable |

### Ops-Editable Fields — Safe For Dan To Change

| Field | Editable Values | Who Edits |
|---|---|---|
| Production Status | Not Started, In Production, Complete | Dan |
| Packing Status | Not Packed, Packing, Packed | Dan |
| QC Status | Pending, Passed, Failed | Dan |
| Internal Notes | Free text | Dan |
| Exception Status | None, Address Issue, Stock Shortage, Damaged, Other | Dan |
| Dispatch Date | Date picker | Dan |

### System-Generated Fields — Airtable Automation

| Field | Who Sets It |
|---|---|
| Last Synced At | Sync worker timestamp |
| Sync Error | Sync worker error message |
| WhatsApp Confirmed | WhatsApp automation webhook |

## 6. Medusa-to-Airtable Sync Rules

### Sync Trigger

- **Preferred:** Medusa event subscriber on `order.placed` or `payment.captured` events.
- **Fallback:** Lightweight polling worker every 30 seconds for new orders (acceptable for spike).
- **Not acceptable:** Manual CSV export and import.

### Sync Direction

```
Medusa order created
  -> payment captured (prepaid) or order confirmed (COD)
  -> sync worker fires
  -> Airtable record created (mirror fields populated)
  -> Ops edits only: production, packing, QC, notes, exception
  -> Shiprocket AWB/tracking pushed back to Airtable
```

### Sync Timing Requirements

| Phase | Acceptable Delay | Notes |
|---|---|---|
| Phase 0 spike | Up to 5 minutes | Acceptable for validation |
| Launch | < 30 seconds | Customer may contact support before order appears |
| Post-launch | < 10 seconds | Scaling to higher volume |

### Sync Error Handling

| Error | Behavior | Notification |
|---|---|---|
| Airtable API rate limit | Retry with exponential backoff (3 attempts) | Log to `integration_event_log` table |
| Airtable field mismatch | Log error, flag for manual review | Dan gets Slack/WhatsApp alert |
| Network failure during sync | Retry 3 times, then mark sync as failed | Order visible in admin with sync error status |
| Duplicate idempotency key | Update existing record (upsert) | No alert — expected behavior |
| Payment not yet captured | Do not sync to Airtable | Order held in queue until payment confirmed |

### What Does NOT Trigger an Airtable Sync

- Cart creation (no commerce record yet)
- Abandoned checkout
- Failed payment (unless order was created with pending status)
- Refund (sync existing record update only)
- Fulfillment status change from Airtable to Medusa (not supported in Phase 0)

## 7. Idempotency Rules

### Idempotency Key

**Key:** `medusa_order_id` (Medusa's order ID string)

### Behavior

| Scenario | Expected Result |
|---|---|
| First sync for order ID `ord_abc123` | Create new Airtable record |
| Second sync for same `ord_abc123` | Find existing by `medusa_order_id`, update mirror fields, do NOT create duplicate |
| Sync for `ord_abc123` after manual Airtable record deletion | Create new record (re-create) |
| Concurrent syncs for same `ord_abc123` | First write wins; second finds existing record, updates it |

### Implementation Requirement

- Sync worker must query Airtable by `medusa_order_id` before creating.
- Airtable primary field must be `medusa_order_id` (unique).
- Airtable base must enforce unique values on the primary field.
- Multiple sync workers must not race on the same order ID.

### Retry Behavior

| Attempt | Timing | Action |
|---|---|---|
| 1 | Immediate (on event) | Create/update Airtable record |
| 2 | 5 seconds after failure | Retry with same idempotency key |
| 3 | 30 seconds after failure | Retry with same idempotency key |
| Final | After 3 failures | Log to `airtable_sync_log` with error, set `Sync Error` field on order |

## 8. Duplicate Prevention Rules

### Causes of Duplicates (and Prevention)

| Cause | Prevention |
|---|---|
| Sync worker fires twice for same event | Idempotency key — lookup by `medusa_order_id` before insert |
| Medusa webhook retry creates second event | Same idempotency key protects against this |
| Manual re-run of sync script | Idempotency key handles re-runs |
| Two sync workers processing same order | Idempotency check is atomic; second attempt updates existing |
| Airtable base reset/re-import | Sync sees records missing, re-creates them — correct behavior |
| Human accidentally creates duplicate Airtable record | Training: primary field is unique, Airtable will reject duplicate `medusa_order_id` |

### Table-Level Protection

- Airtable primary field: `Medusa Order ID` set as unique.
- Sync worker: always lookup by `medusa_order_id` before create.
- Sync worker: use Airtable API `typecast` to ensure field types match.
- Sync worker: log every create/update action to `airtable_sync_log`.

## 9. Shiprocket Payload Requirements

### Required Payload Fields for Shiprocket Order Creation

| Shiprocket Field | Medusa Source | Required | Notes |
|---|---|---|---|
| `order_id` | Medusa order ID | Yes | Must be unique per Shiprocket account |
| `order_date` | Medusa `created_at` | Yes | ISO format |
| `billing_customer_name` | Medusa `shipping_address.first_name` + `last_name` | Yes | Concatenated |
| `billing_last_name` | Medusa `shipping_address.last_name` | Optional | Can be empty |
| `billing_address` | Medusa `shipping_address.address_1` | Yes | |
| `billing_address_2` | Medusa `shipping_address.address_2` | Yes if present | |
| `billing_isd_code` | Fixed: "91" | Yes | India country code |
| `billing_phone` | Medusa `shipping_address.phone` | Yes | |
| `billing_email` | Medusa `email` | Yes | |
| `billing_city` | Medusa `shipping_address.city` | Yes | |
| `billing_state` | Medusa `shipping_address.province` | Yes | |
| `billing_country` | Medusa `shipping_address.country_code` | Yes | Expected: "IN" |
| `billing_pincode` | Medusa `shipping_address.postal_code` | Yes | |
| `order_items` | Array of line items | Yes | See item fields below |
| `payment_method` | `"Prepaid"` or `"COD"` | Yes | Critical for correct fulfillment |
| `sub_total` | Medusa order subtotal | Yes | In paise? Check Shiprocket docs |
| `shipping_charges` | Medusa `shipping_total` | Recommended | 0 if free shipping |
| `discount` | Medusa `discount_total` | Recommended | 0 if no discount |
| `tax` | Medusa `tax_total` | Recommended | May be 0 for spike |
| `grand_total` | Medusa `total` | Yes | Must match order |
| `cod_amount` | Order total if COD | Conditional | Zero for prepaid; full total for COD |
| `weight` | Product weight (g) | Yes | TPL typical: 80–150g per order |
| `length`, `breadth`, `height` | Fixed dimensions | Recommended | Use standard mailer size: 25x18x2 cm |
| `pickup_location` | Configured in Shiprocket | Yes | "TPL Bengaluru" |
| `reseller_name` | "The Product Lab" | Optional | |
| `return_address` | Same as pickup | Recommended | |

### Order Item Fields (Per Line Item)

| Shiprocket Field | Medusa Source | Required |
|---|---|---|
| `name` | Product title | Yes |
| `sku` | Variant SKU | Yes |
| `units` | Quantity | Yes |
| `selling_price` | Unit price | Yes |
| `tax` | Item tax | Recommended |

### Payload Validation Checks

| Check | What To Verify |
|---|---|
| Phone format | 10-digit Indian mobile; no leading +91 in value |
| Pincode | 6-digit; valid Indian pincode |
| Address completeness | Street, city, state, pincode all present |
| COD amount | Exact match to order total for COD; zero for prepaid |
| SKU list | All line items have SKUs |
| Weight | Must be in grams; TPL typical < 500g |
| Grand total | Must match order total in Medusa |

### Minimum Spike Validation

| Validation | Pass Condition |
|---|---|
| Payload constructed from Medusa order | All required fields mapped with correct values |
| Pincode serviceability check | At least 3 pincodes return serviceable carriers |
| Pickup location valid | Shiprocket accepts the configured pickup location |
| COD payload separate from prepaid | COD payload has `payment_method: "COD"` and `cod_amount` set |

## 10. Shiprocket AWB/Label Validation Steps

### Step 1: Shiprocket Order Creation

**Test:** Create a Shiprocket order from a Medusa paid order.

**Pass condition:** Shiprocket returns `shipment_id` and order appears in Shiprocket dashboard.

**Fail condition:** Shiprocket returns validation error (missing field, invalid data, auth failure).

### Step 2: AWB Generation

**Test:** Request AWB for the created Shiprocket order.

**Method:** Use Shiprocket `generate_awb` endpoint with the `shipment_id` from Step 1.

**Pass condition:** Shiprocket returns AWB number (14-digit numeric) and assigned carrier.

**Fail condition:** No AWB generated — carrier not available for pincode, COD not supported, pickup not configured.

### Step 3: Label Generation

**Test:** Download label PDF for the generated AWB.

**Method:** Use Shiprocket `generate_label` or `print_label` endpoint.

**Pass condition:** Label PDF is downloadable, contains correct address, AWB barcode is scannable.

**Fail condition:** Label PDF unavailable, address is incorrect, barcode is missing or damaged.

### Step 4: Tracking Confirmation

**Test:** Verify tracking number is active.

**Method:** Use Shiprocket `track_shipment` endpoint or check tracking URL.

**Pass condition:** Tracking shows "Pickup Scheduled" or "In Transit" status.

**Fail condition:** Tracking number returns "Not Found" or "Invalid."

### Step 5: Return Label (Optional for Spike)

**Test:** Verify return label generation works.

**Pass condition:** Return label generates with TPL return address.

**Fail condition:** Return address not configured or label generation fails.

### Fallback if Shiprocket API Is Not Available During Spike

Document everything below as a **confirmed feasibility memo**:

1. Exact payload mapping table (Section 9 above).
2. Authentication method: email/password → token or API key.
3. Known API endpoint URLs (from Shiprocket public docs).
4. Rate limits (typically 10 req/min on Business plan).
5. COD payload specifics (separate flag for COD orders).
6. AWB generation flow (order → AWB → label → tracking).
7. Spike confidence rating.

## 11. COD Handling Requirements

### COD Rules (Current TPL Policy)

| Rule | Value | Source |
|---|---|---|
| COD minimum order value | Rs. 299 | D-006, cod-strategy.md |
| Prepaid discount | Rs. 30 | D-006 |
| Free shipping threshold | Rs. 499 | D-006 |
| COD confirmation | WhatsApp within 5 minutes | Fulfillment SOP |
| COD max value | Rs. 1,999 | cod-strategy.md |
| Zone E COD | Optional — consider prepaid-only | cod-strategy.md |

### What Medusa Must Handle for COD

| Requirement | Medusa Scope | Spike Validation |
|---|---|---|
| Disable COD below Rs. 299 | Medusa payment provider logic | Must test: cart < Rs. 299 shows only prepaid |
| Flag COD in order metadata | Medusa order metadata field | Must verify COD flag exists in order |
| Sync COD flag to Airtable | Sync worker field mapping | Must verify Airtable shows "COD" payment method |
| Sync COD flag to Shiprocket | Shiprocket payload `payment_method: "COD"` | Must verify Shiprocket receives COD flag |
| Do NOT fulfill COD before WhatsApp confirmation | Ops workflow (Airtable) | Airtable shows "Awaiting Confirmation" status |
| Handle COD partial payment reconciliation | Razorpay + Shiprocket | Out of spike scope — Phase 3 |

### COD Order State in Medusa

Medusa does not natively have a "COD" payment method. This means:

1. A custom payment provider or plugin is needed.
2. COD orders must be created with a "pending" or "awaiting" payment state (no payment captured).
3. The Shiprocket sync must distinguish COD from prepaid by payment state + metadata flag.
4. Fulfillment should not proceed until payment is "captured" (prepaid) or "awaiting" with COD flag + WhatsApp confirmation (COD).

**This is a critical design point.** If Medusa treats COD orders as unpaid orders requiring payment capture, the fulfillment workflow must treat COD differently from failed payments.

### COD Validation Tests

| Test | Pass Condition |
|---|---|
| Cart < Rs. 299 does not offer COD | COD option hidden; only prepaid shown |
| Cart >= Rs. 299 shows COD option | COD is selectable at checkout |
| COD order is created in Medusa | Order exists with COD payment flag in metadata |
| COD order syncs to Airtable | Airtable shows `Payment Method: COD`, `Payment Status: Awaiting` |
| COD order syncs to Shiprocket | Shiprocket has `payment_method: "COD"` and `cod_amount` = order total |
| Prepaid discount offered at checkout | Rs. 30 discount shown for prepaid selection |
| WhatsApp confirmation field in Airtable | Checkbox field exists; not checked by default |

## 12. NDR/RTO Handling Requirements

### NDR Flow With Medusa

Current Fynd-based flow:
1. Shiprocket generates NDR.
2. Dan sees NDR in Shiprocket dashboard.
3. Dan triggers WhatsApp follow-up.
4. Re-delivery scheduled or RTO initiated.

With Medusa:
1. Shiprocket generates NDR (same — Shiprocket owns this).
2. **NDR status must sync from Shiprocket to Airtable.**
3. Dan still sees NDR in Shiprocket dashboard (same).
4. **Airtable exception status updated:** "NDR — Customer Contacted" etc.
5. Dan triggers WhatsApp follow-up (same).
6. Re-delivery or RTO (same).

### What Must Change

| Aspect | Fynd Flow | Medusa Flow |
|---|---|---|
| NDR visibility | Shiprocket dashboard | Shiprocket dashboard + Airtable exception status |
| NDR-to-Airtable sync | Fynd handled this | Custom Shiprocket webhook or polling needed |
| RTO tracking | Fynd marked order as returned | Custom tracking needed |
| Restock on RTO | Manual via Fynd | Manual via Medusa admin |
| COD blacklist | Shiprocket Smart COD handles this | Shiprocket Smart COD still works (independent of Medusa) |

### Validation Requirements

| Requirement | Spike Scope | Launch Scope |
|---|---|---|
| Shiprocket NDR webhook received | Optional | Required |
| Airtable `Exception Status` updated on NDR | Optional | Required |
| Airtable `RTO Initiated` date set on RTO | Optional | Required |
| Dan notified of NDR via WhatsApp/Slack | Optional | Required |
| NDR-to-Shiprocket tracking status in Airtable | Not in scope | Required |

**NDR handling is out of scope for Phase 0 spike.** The spike proves the shipping path exists. NDR/RTO automation is Phase 3 work.

## 13. Packing/QC Workflow for Phase 0

### Dan's Daily Workflow (With Medusa + Airtable)

```
Morning (9:00 AM):
1. Open Airtable → Medusa Order Mirror
2. Filter by: Packing Status = "Not Packed", Exception Status = "None"
3. For each order:
   a. Verify phone, address, pincode in Airtable (mirrored from Medusa)
   b. For COD: check WhatsApp Confirmed checkbox
   c. Update Production Status → "In Production" (if needed)
4. Open Shiprocket dashboard for AWB generation

Mid-morning (10:00 AM - 12:00 PM):
5. Generate AWB from Shiprocket for each order
6. Copy AWB back to Airtable field (or auto-synced)
7. Pick product from inventory
8. QC product (Inspect for damage)
9. Update Airtable: QC Status → "Passed"

Packing (12:00 PM - 2:00 PM):
10. Pack per fulfillment SOP
11. Affix AWB label
12. Update Airtable: Packing Status → "Packed"
13. Update Airtable: Dispatch Date

Afternoon (3:00 PM):
14. Mark orders as "Ready for Pickup" in Shiprocket
15. Carrier pickup at 4:00 PM

Evening:
16. Update Inventory in Google Sheets
17. Flag any exceptions in Airtable
```

### Comparison: Fynd-Based Workflow vs Medusa-Based Workflow

| Step | Fynd (Baseline) | Medusa | Delta |
|---|---|---|---|
| Check new orders | One dashboard: Shiprocket | Two dashboards: Airtable + Shiprocket | Worse — Dan needs to check Airtable first, then Shiprocket |
| Verify order details | Fynd order screen | Airtable (mirror) or Medusa admin | Similar — Airtable mirror is sufficient |
| Generate AWB | In Shiprocket (order auto-synced) | In Shiprocket (order created via API) | Similar — Shiprocket is same |
| AWB in ops view | Auto-synced to Fynd | Auto-synced to Airtable | Similar |
| COD confirmation | WhatsApp automation | WhatsApp automation | Same — independent of Fynd/Medusa |
| Packing status | Was not tracked in Fynd | Tracked in Airtable | Better — Airtable tracks this now |
| Exception handling | Was not tracked in Fynd | Tracked in Airtable | Better — Airtable tracks this now |
| Closing the loop | Fynd order status updated | Medusa fulfillment status updated + Airtable | More steps — Dan must update two systems |

### Verdict

For Phase 0 / low volume: **Acceptable.** Dan can manage 2-3 dashboards for 5-10 orders/day.

For launch volume (200+ orders/month): **Unacceptable friction.** Every order requiring Airtable + Shiprocket + Medusa admin + Google Sheets creates too many switches.

## 14. Manual Steps Dan Must Perform During Spike

### Daily Manual Steps

| Step | Tool | Time per Order | Notes |
|---|---|---|---|
| Check new orders | Airtable (Medusa Order Mirror) | 30s | Filter by Packing Status |
| Verify COD confirmation | Airtable (WhatsApp Confirmed field) | 10s | Only for COD orders |
| Generate AWB | Shiprocket dashboard | 30s | Order auto-synced from Medusa |
| Print label | Thermal printer | 20s | Same as Fynd workflow |
| Pick product | Physical inventory | 20s | Same as Fynd workflow |
| QC product | Physical inspection | 30s | Same as Fynd workflow |
| Update Airtable QC status | Airtable | 10s | New step — not in Fynd workflow |
| Pack | Physical | 3-5 min | Same as Fynd workflow |
| Update Airtable Packing status | Airtable | 10s | New step — not in Fynd workflow |
| Mark ready for pickup | Shiprocket | 10s | Same as Fynd workflow |
| Update inventory sheet | Google Sheets | 30s | Same as Fynd workflow |
| Update Medusa fulfillment status | Medusa admin | 20s | New step — not in Fynd workflow |

### Weekly Manual Steps

| Step | Tool | Time | Notes |
|---|---|---|---|
| Reconcile Razorpay payouts | Razorpay dashboard vs Airtable | 15 min | Same as Fynd workflow |
| Reconcile COD remittances | Shiprocket dashboard vs bank | 15 min | Same as Fynd workflow |
| Inventory count | Physical + Google Sheets | 30 min | Same as Fynd workflow |

### Additional Manual Steps for Spike (Not Production)

| Step | Reason | Duration |
|---|---|---|
| Verify sync is working | No monitoring in spike | 5 min daily |
| Check for duplicate Airtable records | Manual idempotency audit | 5 min weekly |
| Restart sync worker if failing | No auto-recovery in spike | As needed |

## 15. What Must Be Automated Before Launch

### P0 Automations — Block Launch If Missing

| Automation | Reason | Owner |
|---|---|---|
| Medusa → Airtable auto-sync | Ops cannot manually re-enter orders | Tobi |
| Shiprocket AWB auto-generation | Cannot generate AWBs per order manually | Tobi |
| Shiprocket tracking → Airtable sync | Ops needs tracking visible in one place | Tobi |
| COD order WhatsApp confirmation trigger | RTO reduction requires sub-5-min trigger | Eli |
| Failed sync alert | Dan must know when sync breaks | Tobi |
| Airtable idempotency enforcement | Duplicates destroy ops trust | Tobi |

### P1 Automations — Fix Within 1 Week of Launch

| Automation | Reason | Owner |
|---|---|---|
| Shiprocket NDR status → Airtable exception | Ops cannot monitor NDR across two systems | Tobi |
| Payment status auto-sync (Razorpay → Medusa → Airtable) | Ops may fulfill unpaid orders | Tobi |
| Inventory auto-decrement on paid order | Prevent overselling | Tobi |
| Medusa fulfillment status update from Airtable | Dan should not update two systems | Tobi |
| Prepaid discount auto-application at checkout | Cannot manually apply per order | Tobi |

### P2 Automations — Build Within 30 Days

| Automation | Reason | Owner |
|---|---|---|
| RTO → auto-restock in Medusa | Prevent stock discrepancy | Tobi |
| COD blacklist from Shiprocket Smart COD | Fraud reduction (Shiprocket handles natively) | Andy |
| Daily reconciliation report | Patrick needs financial data | Tobi |
| WhatsApp tracking link to customer post-dispatch | Customer communication | Eli |

## 16. Ops Failure Thresholds

### Immediate "Do Not Proceed" — Any One Triggers This

| Failure | Why |
|---|---|
| Airtable sync requires manual order re-entry or CSV import | Ops cannot scale with manual data entry |
| Duplicate order records in Airtable are likely | Ops loses trust in system; every order needs verification |
| Shiprocket requires manual order creation for every order | 5-10 min per order × 50 orders = 4+ hours daily |
| AWB/label generation cannot be proven from Medusa → Shiprocket path | Cannot ship products; no fulfillment path |
| COD creates unclear order states (Medusa treats COD as unpaid/failed) | COD orders stuck in limbo; cannot fulfill |
| Dan has to manage 4+ dashboards per order (Medusa + Airtable + Shiprocket + Razorpay + Sheets) | Cognitive overload at >10 orders/day |
| Fynd clearly reduces ops risk for launch (per comparison in Section 18) | Pragmatic choice for launch safety |

### "Conditional Proceed" Thresholds

Allow if all these hold:

| Condition | What Must Be True |
|---|---|
| Medusa → Airtable sync works | Event-driven or polling, creates correct mirror records |
| Idempotency holds | Re-runs do not duplicate |
| Shiprocket API path is clear | Payload mapping documented, auth confirmed, AWB path understood |
| COD handling is documented | Medusa COD state approach is clear even if not fully automated |
| Dan can operate the workflow at low volume | < 10 orders/day, 2-3 dashboards, no manual re-entry |
| Fynd comparison is documented honestly | This document section 18 completed |

### "Proceed" Thresholds

ALL of these must be true:

| Condition | Evidence Needed |
|---|---|
| Medusa → Airtable sync is clean and idempotent | Tested with 5+ orders, no duplicates |
| Shiprocket order/AWB/label path is proven | At least 1 order → AWB → label → tracking completed |
| COD handling is clear | Medusa COD state documented, Shiprocket COD flag tested |
| Manual work is acceptable for launch volume | Dan can process 20 orders/day with < 2 hours total |
| Ops status is visible in one cockpit | Airtable shows all ops-status fields for every order |
| Dan can check ops status without touching Medusa admin | Airtable is sufficient for daily ops check |
| Fynd does not offer clearly lower ops risk | Section 18 comparison favors Medusa or is equal |

## 17. Fynd Comparison From Ops Perspective

### Side-by-Side: Operations

| Factor | Fynd (Commerce.com) | Medusa + Supabase | Advantage |
|---|---|---|---|
| **Order intake** | Fynd receives order natively | Medusa receives order, sync to Airtable | Fynd — one fewer system hop |
| **Airtable sync** | Existing WooCommerce → n8n → Airtable tested; Fynd → Airtable needs mapping | Custom sync needs full build and testing | Fynd — existing WooCommerce pattern informs migration; Medusa sync is net new |
| **Shiprocket integration** | Commerce.com has a native Shiprocket integration via Commerce Hub | Custom Shiprocket API integration; no native Medusa Shiprocket provider known | Fynd — tested, documented integration path |
| **AWB generation** | Shiprocket auto-syncs from Fynd | Custom Shiprocket order creation from Medusa | Fynd — proven path |
| **COD handling** | Fynd supports COD natively as payment method | Custom COD payment provider needed in Medusa | Fynd — natively supports COD |
| **Dashboard count per order** | 2 (Shiprocket + Google Sheets) | 3-4 (Airtable + Shiprocket + Medusa admin optional + Sheets) | Fynd — fewer dashboards |
| **Admin usability for Dan** | Fynd admin is commerce-operator focused | Medusa admin is developer-tool focused | Fynd — Dan can likely navigate Fynd more easily |
| **NDR/RTO handling** | Shiprocket handles; Fynd mirrors status | Shiprocket handles; custom sync to Airtable needed | Fynd — status sync already works |
| **Inventory management** | Fynd manages sellable inventory | Medusa manages sellable inventory | Tie — both need configuration |
| **Order modification** | Fynd allows admin order edits | Medusa admin allows order edits | Tie — both support this |
| **Refund processing** | Razorpay → Fynd → customer | Razorpay → Medusa → customer (custom) | Fynd — refund flow is established |
| **Multi-channel orders** | Fynd aggregates Fynd + Instagram + others | Medusa is online-only; offline orders stay in Airtable Base 5 | Fynd — single view of all orders |
| **Disaster recovery** | Fynd manages infrastructure | Medusa deployment managed by TPL | Fynd — less ops burden on Dan |
| **Learning curve for Dan** | Low — commerce admin similar to WooCommerce | Medium-High — unfamiliar admin, new sync concepts | Fynd |

### What Fynd Cannot Do That Medusa Can

| Capability | Benefit |
|---|---|
| Full data ownership (Postgres) | TPL owns the database; no platform lock-in |
| Custom storefront experiences | Full control over UI/UX |
| No per-transaction platform fees | Only pay for hosting + integrations |
| Extensible via custom code | Unlimited integration possibilities |
| No platform migration risk later | Already on the open-source stack |

### What Medusa Cannot Do That Fynd Can (Ops-Relevant)

| Capability | Ops Impact |
|---|---|
| Native Shiprocket integration | Medusa needs custom build; Fynd works out of box |
| Native COD payment method | Medusa needs custom COD provider |
| Single dashboard for all ops | Medusa splits truth across Medusa + Airtable + Shiprocket |
| Tested India ecommerce path | Fynd is India-native; Medusa is US/Europe-native |
| Official support for India tax/GST | Fynd handles Indian tax; Medusa needs custom config |
| Multi-channel order aggregation | Fynd shows all channels in one view |

### Verdict

**From a pure operations standpoint, Fynd reduces risk at launch.** Every ops document — fulfillment SOP, daily workflow, COD strategy, Shiprocket configuration — was written for Fynd. Medusa replaces a tested integration layer with custom code that must be built, tested, and maintained.

The trade-off is long-term flexibility vs launch speed. If TPL's priority is launching fast with low ops risk, Fynd is the correct choice. If TPL can accept 4-8 weeks of custom integration work and 2-3 extra dashboards per order, Medusa is viable at low volume.

## 18. Final Ops Recommendation

# Ops Recommendation

**Recommendation: Do Not Proceed (for launch) / Conditional Proceed (for spike continuation only)**

## Brutal Honesty Summary

From a pure operations standpoint, Medusa + Supabase cannot match Fynd's launch-readiness for TPL's first D2C relaunch. The existing ops implementation plan (artifacts/phase-4/ops-implementation-plan.md) assumes Fynd as the order source that feeds Shiprocket. Every daily workflow, every automation trigger, every failure scenario in that document relies on the Fynd → Shiprocket integration path.

Medusa replaces Fynd but adds:
- A custom Airtable sync that must be built from scratch (Fynd has an existing WooCommerce → Airtable pattern that informs their Fynd migration; Medusa starts at zero).
- A custom Shiprocket integration (Fynd's Commerce Hub has a documented Shiprocket integration; Medusa has no maintained Shiprocket provider).
- A custom COD payment provider (Fynd handles COD natively; Medusa requires custom payment logic).
- A fourth dashboard (Airtable + Shiprocket + Medusa admin + Razorpay = 4 systems Dan must check per order).
- An unknown amount of integration maintenance going forward.

The spike should continue — the technical value of understanding whether Medusa + Supabase is viable for TPL long-term is real. But the launch platform should remain Fynd unless the spike proves something transformative that the current docs don't anticipate.

## Evidence Summary

| Area | Status | Evidence | Risk |
|---|---|---|---|
| Airtable field map | CLEAR | Field map defined (24 fields); classification done | LOW — Airtable schema is understood and documented |
| Medusa-to-Airtable sync | UNTESTED | Sync approach defined but not implemented | MEDIUM — depends on event subscriber reliability and error handling |
| Duplicate prevention | DESIGNED | Idempotency key (Medusa order ID), upsert behavior, retry rules defined | MEDIUM — unproven in practice; race conditions possible |
| Shiprocket payload | MAPPED | Full payload mapping from Medusa to Shiprocket complete | MEDIUM — needs testing; field format mismatches possible |
| AWB/label path | UNTESTED | No Shiprocket API access confirmed for spike | HIGH — cannot validate until API access is obtained |
| COD handling | UNTESTED | COD rules documented; Medusa COD payment approach unknown | HIGH — Medusa has no native COD support; custom provider needed |
| NDR/RTO handling | UNTESTED | Out of spike scope; placeholder only | HIGH — NDR sync from Shiprocket to Airtable is net-new work |
| Dan daily workflow | ACCEPTABLE AT LOW VOLUME | 3-4 dashboards for <10 orders/day is workable | MEDIUM — becomes unacceptable at 200+ orders/month |
| Fynd comparison | FAVORS FYND | Fynd has tested Shiprocket integration, native COD, single ops view | LOW — honest assessment; Fynd reduces ops risk at launch |

## Required Fixes Before Launch

1. **Medusa → Airtable sync built and tested** — event-driven, idempotent, with error logging and alerts.
2. **Shiprocket integration built** — order creation, AWB generation, label download, tracking sync.
3. **COD payment provider built for Medusa** — or COD handling documented with clear order state design.
4. **Airtable ops dashboard configured** — views for Dan by fulfillment stage, exception filter, daily workflow.
5. **Sync monitoring built** — failed syncs alert Dan via WhatsApp/Slack.
6. **Deployment automation** — Medusa backend deployable in <15 minutes with env vars and migrations.

## Manual Work Accepted During Spike

- Dan checks Airtable + Shiprocket daily (two dashboards).
- Dan verifies sync is working (no monitoring in spike).
- Dan generates AWB from Shiprocket (order auto-synced from Medusa).
- Dan copies Shiprocket AWB to Airtable if auto-sync not yet built.
- Dan updates Medusa fulfillment status manually.
- Dan manages COD confirmation via WhatsApp manually (or Gupshup if already configured).

## Manual Work Not Acceptable At Launch

- Dan manually re-entering orders into Airtable or Shiprocket.
- Dan checking for duplicate Airtable records.
- Dan restarting failed sync workers without alert.
- Dan calculating shipping charges per order.
- Dan manually tracking COD confirmation per order outside Airtable.
- Dan switching between 4+ systems to process one order.

## Final CTO Gate Input

### Summary

Medusa + Supabase is architecturally sound for TPL's long-term open-source commerce ambitions. The data ownership model (Medusa owns commerce truth, Airtable owns ops workflow, Shiprocket owns shipping, Razorpay owns payments) is clean and correctly designed. The Airtable field map and idempotency rules are validated. The Shiprocket payload mapping is complete.

However, from an operations perspective, Medusa requires custom integrations for everything Fynd provides natively — Shiprocket, COD, Airtable sync, order management — and adds dashboard complexity that Dan will feel on day one. The existing ops plan assumes Fynd. Every automation, every daily checklist, every escalation path relies on Fynd as the order source. Switching to Medusa means rebuilding that ops layer before launch.

The spike should continue for technical validation, but the launch recommendation should be Fynd, with Medusa revisited post-launch when TPL has revenue, clearer ops requirements, and engineering capacity to absorb the integration work.

### My Recommendation

```
DO NOT PROCEED — Medusa + Supabase is not launch-ready from an operations perspective.
Launch should use Fynd (Commerce.com).
Medusa should be revisited post-launch when TPL has revenue and engineering capacity.
```

### Ops Lead Sign-Off

```
Ops Lead: Andy
Date: 2026-05-29
Status: DO NOT PROCEED
Rationale: Fynd provides tested Shiprocket integration, native COD handling,
and a single operations view. Medusa requires custom builds for all three.
The ops risk of launching on Medusa is higher than the ops risk of
migrating from Fynd post-launch.
```
