# Phase 0 Analytics & Data Validation Plan: Medusa + Supabase

<!-- last-updated: 2026-05-29 -->
<!-- author: Avinash (Analytics & Data Validation Lead) -->

## 1. Analytics Validation Objective

Validate whether the Medusa + Supabase stack can produce **trustworthy data** for:

- **Launch decisions** — conversion rate, AOV, product mix, traffic sources
- **Funnel tracking** — PDP → add-to-cart → checkout → purchase drop-off
- **Attribution** — which channels drive orders (Instagram, WhatsApp, email, direct)
- **Order reporting** — daily revenue, order count, payment reconciliation
- **Operational visibility** — sync health, payment capture, fulfillment progress

This is not a dashboard exercise. This is a **data trust exercise**. The question is not "can we chart this?" but "can we bet money on this number?"

The spike passes the analytics gate only if:

1. GA4 `purchase` events fire with correct `transaction_id` and `value`
2. GA4 purchase value reconciles with Medusa order total
3. Razorpay captured amount matches Medusa order payment amount
4. Airtable mirrored order value matches Medusa order value
5. Duplicate purchase events are impossible under normal browsing
6. Failed payments never produce a `purchase` event
7. Integration sync failures are detectable within 5 minutes
8. UTM parameters persist through checkout and appear in GA4

## 2. Systems Under Review

| System | Role | Analytics Responsibility |
|---|---|---|
| Next.js storefront | Customer-facing UI | Client-side GA4 event firing via `analytics.ts` |
| Medusa backend | Commerce engine | Server-side order/payment confirmation for purchase event |
| Razorpay | Payment processing | Payment capture webhook triggers order completion |
| GA4 (test property) | Behavioral analytics | Event ingestion, funnel reports, attribution |
| Supabase Postgres | System data | Optional integration event logs, audit trail |
| Airtable | Ops cockpit | Mirrored order data for operational reconciliation |
| Shiprocket | Shipping | Shipment cost data for margin reporting |

## 3. Data Ownership Recap

| Domain | Source of Truth | Mirrored In | Must Never Be |
|---|---|---|---|
| Product, variant, price | Medusa | GA4 items[], Airtable | Supabase commerce tables |
| Cart state | Medusa | Storefront only | Airtable, Supabase |
| Order financial truth | Medusa | Airtable (read-only mirror) | Edited in Airtable |
| Payment capture amount | Razorpay | Medusa order metadata | Edited manually |
| Payment status | Razorpay | Medusa, Airtable | Written from Airtable |
| Refund state | Razorpay + Medusa | Airtable | Decided in Airtable |
| Shipping cost | Shiprocket | Medusa, reporting | Edited manually after sync |
| Behavioral events | GA4 | Reporting | Used as ops truth |
| Integration logs | Supabase | Debugging | Commerce decisions |

## 4. Required GA4 Events

### P0 Events — Must Work Before Launch

| Event | Trigger | Priority | Implemented By |
|---|---|---|---|
| `page_view` | Every page load | P0 | GA4 base snippet |
| `view_item_list` | Product grid/collection page | P0 | `analytics.ts` |
| `select_item` | Click on product from list | P0 | `analytics.ts` |
| `view_item` | PDP load | P0 | `analytics.ts` |
| `add_to_cart` | Add to cart click | P0 | `analytics.ts` |
| `remove_from_cart` | Remove item from cart | P0 | `analytics.ts` |
| `view_cart` | Cart page load | P0 | `analytics.ts` |
| `begin_checkout` | Checkout start | P0 | `analytics.ts` |
| `add_shipping_info` | Shipping method selected | P0 | `analytics.ts` |
| `add_payment_info` | Payment step reached | P0 | `analytics.ts` |
| `purchase` | Order confirmation after successful payment | P0 | `analytics.ts` |

### P1 Events — Must Work Within First Week of Launch

| Event | Trigger | Notes |
|---|---|---|
| `refund` | Refund processed in Medusa | Requires a refund flow; out of spike scope |
| `search` | Customer uses search | Requires a search UI; storefront shell may not have this |
| `share` | WhatsApp share click | Requires share button; can be added post-launch |

### P2 Events — Can Wait 30 Days

| Event | Trigger | Notes |
|---|---|---|
| `newsletter_signup` | Email signup form | Depends on email tool integration |
| `drop_signup` | Drop interest form | Depends on drop feature being built |

## 5. Required Event Parameters

Every ecommerce event must include where contextually relevant:

| Parameter | Type | Required On | Source |
|---|---|---|---|
| `currency` | string (INR) | All ecommerce events | Hardcoded "INR" |
| `value` | number | view_item, add_to_cart, view_cart, begin_checkout, purchase | Medusa product price / cart total / order total |
| `transaction_id` | string | purchase | Medusa order ID |
| `coupon` | string | purchase, begin_checkout | Medusa discount code if applied |
| `shipping` | number | purchase, add_shipping_info | Medusa shipping_total |
| `tax` | number | purchase | Medusa tax_total |
| `payment_type` | string | purchase, add_payment_info | "razorpay", "cod" |
| `items` | array | view_item, add_to_cart, remove_from_cart, view_cart, begin_checkout, purchase | Medusa line items |
| `item_id` | string | Each item in items[] | Medusa variant SKU |
| `item_name` | string | Each item in items[] | Medusa product title |
| `item_category` | string | Each item in items[] | Medusa collection/category |
| `item_variant` | string | Each item in items[] | Medusa variant title |
| `price` | number | Each item in items[] | Medusa unit price |
| `quantity` | number | add_to_cart, purchase items[] | Medusa cart/order quantity |
| `sku` | string | Each item in items[] | Medusa variant SKU (same as item_id for TPL) |
| `collection_name` | string | Each item in items[] | Medusa collection name |

### Parameter Validation Rules

- `currency` must always be "INR". Never default to USD.
- `value` must be in INR (not paise). Medusa stores amounts in minor units by default — divide by 100 if Medusa returns raw amounts.
- `transaction_id` must be the Medusa order ID string. Must be stable across page refreshes.
- `item_id` must be the variant SKU. TPL's SKU is the invariant identifier.
- `item_category` must map to Medusa collection name. If a product has multiple collections, use the primary collection.
- `items[].price` must be the unit price per item, not the line total.

## 6. Ecommerce Funnel Definition

### Standard Purchase Funnel

```
Session start (page_view)
  │
  ▼
Product discovery (view_item_list OR search OR direct URL)
  │
  ▼
Product detail (view_item)
  │
  ▼
Add to cart (add_to_cart)
  │
  ▼
Cart view (view_cart)
  │
  ▼
Begin checkout (begin_checkout)
  │
  ▼
Shipping info entered (add_shipping_info)
  │
  ▼
Payment info entered (add_payment_info)
  │
  ▼
Purchase confirmed (purchase)
```

### Drop-Off Points to Monitor

| Transition | Expected Rate | Alarming Rate | Action if Alarming |
|---|---|---|---|
| page_view → view_item | >30% | <15% | Discovery problem — PDP content or collection UX |
| view_item → add_to_cart | >15% | <8% | Product page conversion problem |
| add_to_cart → view_cart | >60% | <40% | Cart UX or unexpected behavior |
| view_cart → begin_checkout | >50% | <30% | Cart friction — shipping costs, unclear next step |
| begin_checkout → purchase | >40% | <20% | Checkout friction — payment failure, form complexity |

### Sessionization Rules

- GA4 session timeout: default 30 minutes. No change needed.
- Cross-device sessions: Not tracked. Accept for launch.
- Cross-session purchases: If user adds to cart, leaves, returns the next day and completes purchase, GA4 attributes the purchase to the session where `purchase` fired, not the session where cart was created. This is a known GA4 limitation. Accept for launch.

## 7. Revenue Reconciliation Rules

### Order Financial Field Map

| Concept | Medusa Field | GA4 Purchase Parameter | Razorpay Field | Airtable Field |
|---|---|---|---|---|
| Order ID | `order.id` | `transaction_id` | `order_id` (in notes/metadata) | Medusa Order ID |
| Order value | `order.total` | `value` | `amount` (captured) | Order Value |
| Subtotal | `order.subtotal` | N/A (GA4 uses `value`) | N/A | N/A |
| Shipping | `order.shipping_total` | `shipping` | N/A | N/A |
| Discount | `order.discount_total` | `coupon` (as string) | N/A | N/A |
| Tax | `order.tax_total` | `tax` | N/A | N/A |
| Payment amount | `order.payment_collections[].amount` | N/A | `amount` / `amount_refunded` | N/A |
| Currency | `order.currency_code` | `currency` | N/A | N/A |
| Line items | `order.items[]` | `items[]` | N/A | Line Items |
| Payment ID | `order.payment_collections[].metadata.razorpay_payment_id` | N/A | `id` (payment ID) | Razorpay Payment ID |

### Reconciliation Equation 1: GA4 Purchase Value vs Medusa Order Total

```
IF GA4_purchase.value == Medusa_order.total
THEN PASS
ELSE FLAG
```

Tolerance: **0%. Must match exactly.**
- GA4 `value` must equal Medusa `order.total` (not `subtotal`, not `payment_collections[].amount`).
- Medusa stores amounts in minor units (paise/cents). If raw Medusa value is 19900, GA4 value must be 199.00 (INR), not 19900.
- **Critical detail:** The storefront side must divide Medusa raw amounts by 100 before sending to GA4. If this conversion is wrong, every revenue number will be off by 100x.

### Reconciliation Equation 2: Razorpay Captured Amount vs Medusa Payment Amount

```
IF Razorpay_payment.amount == Medusa_payment_collection.amount
THEN PASS
ELSE FLAG
```

Tolerance: **0%. Must match exactly.**
- Compare `Razorpay_payment.captured_amount` (aggregate captured, not authorized) against `Medusa_payment_collection.amount`.
- Razorpay returns amounts in paise. Medusa stores amounts in minor units (paise/cents by default). Ensure unit comparison is apples-to-apples.
- If Razorpay shows a partial capture (e.g., item out of stock), this is a known discrepancy — log it, flag for manual review.

### Reconciliation Equation 3: Airtable Order Value vs Medusa Order Total

```
IF Airtable_order_value == Medusa_order.total
THEN PASS
ELSE FLAG
```

Tolerance: **0%. Must match exactly.**
- Airtable mirrors Medusa order total. If they diverge, Airtable sync is broken or someone edited the Airtable field.
- Airtable must protect financial fields from manual edits. This is a schema constraint.

### Reconciliation Equation 4: Shiprocket Shipment Cost Accuracy

```
IF Shiprocket_shipment.freight_charge + Shiprocket_shipment.cod_commission (+ applicable taxes) <= Shipping_collected
THEN MARGIN IS POSITIVE
ELSE FLAG
```

Tolerance: **Must not lose money on shipping.**
- This is a margin check, not a hard reconciliation. Not required for spike but must be dashboarded before launch.

## 8. Medusa-to-GA4 Validation

### Data Flow

```
Storefront action
  → Client-side analytics.ts captures event data from Medusa Store API responses
  → gtag() or dataLayer.push() sends to GA4
  → GA4 DebugView shows event within 1-3 seconds
  → GA4 standard reports show data within 24-48 hours
```

### Event-By-Event Validation Rules

| Event | Field Mapping Rule | Expected Value Example |
|---|---|---|
| `view_item` | `item_id` = `variant.sku` | "KC-001" |
| `view_item` | `price` = `variant.prices[0].amount / 100` | 199.00 |
| `view_item` | `item_category` = first collection name | "Keychains" |
| `add_to_cart` | `quantity` = user-selected quantity | 1 |
| `add_to_cart` | `value` = `variant.prices[0].amount / 100 × quantity` | 199.00 |
| `begin_checkout` | `value` = cart total from Medusa / 100 | 398.00 |
| `purchase` | `transaction_id` = `order.id` | "ord_01J8XYZ..." |
| `purchase` | `value` = `order.total / 100` | 448.00 |
| `purchase` | `shipping` = `order.shipping_total / 100` | 50.00 |
| `purchase` | `items[].item_id` = `order.items[].variant.sku` | "KC-001" |
| `purchase` | `items[].quantity` = `order.items[].quantity` | 2 |
| `purchase` | `items[].price` = `order.items[].unit_price / 100` | 199.00 |

### Unit Conversion Risk

Medusa uses **minor units** (paise) for all monetary fields by default. For example, an item priced at ₹199 in the admin stores as `19900` in the database.

**The storefront must divide by 100 before sending to GA4.** If this conversion is missed:

- GA4 will show ₹19,900 instead of ₹199.00 for a keychain
- All funnel value metrics will be wrong
- Revenue reconciliation will fail
- AOV calculations will be meaningless

**Mitigation:** Create a `centsToINR(cents: number): number` utility function in `analytics.ts`. Every monetary value must pass through this function before being sent to GA4. No exceptions.

### Purchase Event Timing Rule

The `purchase` event must fire **only after**:

1. The Razorpay checkout completes successfully (customer sees success screen)
2. The backend confirms payment capture (Razorpay webhook received and verified, or payment status confirmed server-side)
3. Medusa order state is "captured" or "paid"

**Do not fire `purchase`:**

- On order creation before payment
- On page load of order confirmation (use session storage to prevent duplicate)
- On payment failure (even if Medusa creates a pending order)

### Purchase Deduplication Strategy

**Problem:** If a customer refreshes the order confirmation page, `purchase` fires again. GA4 counts it as a second purchase.

**Strategy:**

1. **Server-side confirmation:** The order confirmation page must receive order data from the Medusa Store API, not from client-side cart state.
2. **Session storage flag:** After the first successful `purchase` event fires, set `sessionStorage.setItem('purchase_fired_' + orderId, 'true')`. On page load, check this flag before firing.
3. **Medusa status check:** Before firing `purchase`, verify that the order payment status is "captured" or "paid". If it is "pending" or "requires_action", do not fire.
4. **Transaction ID uniqueness:** GA4 deduplicates by `transaction_id` if enhanced measurement is configured correctly. This is a secondary safety net, not the primary one. Medusa order IDs are unique — GA4 will not count two events with the same `transaction_id` as separate purchases in standard reports.

**Rule:** Primary deduplication is session storage. Secondary deduplication is GA4 transaction_id uniqueness. Both are required.

## 9. Razorpay-to-Medusa Validation

### Data Flow

```
Razorpay checkout success
  → Razorpay webhook (payment.captured) sent to Medusa backend
  → Medusa verifies webhook signature
  → Medusa updates payment collection status to "captured"
  → Medusa order transitions to "captured"/"paid"
  → Storefront polls or receives order confirmation
  → GA4 purchase event fires
```

### Validation Checks

| Check | Method | Pass Condition |
|---|---|---|
| Amount match | Compare Razorpay captured amount vs Medusa payment collection amount | Exact match |
| Currency match | Both must be INR | "INR" === "INR" |
| Payment ID stored | Razorpay payment ID must be in Medusa order metadata | Present and matches Razorpay dashboard |
| Webhook signature | Razorpay webhook secret verifies each request | HMAC SHA256 verification passes |
| Duplicate webhook | Second webhook for same payment does not change order state | Order state unchanged |
| Failed payment | Razorpay failed/cancelled payment leaves Medusa order as "pending" or "requires_action" | No "captured" state change |
| Partial capture | If Razorpay captures less than order total (e.g., item OOS), flag for manual review | Flag in logs |

### Razorpay-to-Medusa Amount Check Procedure

1. After successful test payment, query Razorpay API: `GET /v1/payments/:payment_id`
2. Extract `amount` (in paise) and `status` (must be "captured")
3. Query Medusa: `GET /admin/orders/:id`
4. Extract `payment_collections[].amount` (in minor units / paise)
5. Compare: `Razorpay.amount === Medusa.payment_collection.amount`
6. Also extract `order.total` and compare against Razorpay captured amount
7. Document any mismatch immediately — do not proceed until resolved

**If amounts do not match, the payment trust chain is broken. Do not launch.**

## 10. Medusa-to-Airtable Validation

### Data Flow

```
Medusa order captured
  → Sync worker fires (event subscriber or polling)
  → Airtable record created/updated with mirrored fields
  → Ops status fields blank/ready for input
  → Sync log written to Supabase integration_events (if implemented)
```

### Validation Checks

| Check | Method | Pass Condition |
|---|---|---|
| Record creation | Complete Medusa order → check Airtable for record | Exactly 1 record exists |
| Field accuracy | Compare each mirrored field | All fields match Medusa source |
| Idempotency | Re-trigger sync → check for duplicate | Still exactly 1 record |
| Financial data protection | Edit Airtable order value → check Medusa | Medusa unchanged |
| Failed payment | Fail a Razorpay payment → check Airtable | No fulfillment-ready record |
| Order value match | Compare Airtable "Order Value" vs Medusa order total | Exact match |

### Airtable Financial Data Protection Rule

Airtable's "Order Value" field must be:
- **Read-only** for ops users
- **Synced from Medusa only**
- **Never editable** by human operators

If Dan or ops need to adjust an order value, the adjustment must happen in Medusa (order edit → refund → re-charge), not in Airtable. Airtable mirrors Medusa truth — if Airtable shows ₹500 and Medusa shows ₹449, the answer is always Medusa.

## 11. Shiprocket-to-Order Reporting Requirements

### What Must Be Reportable for Every Order

| Field | Source | Required For |
|---|---|---|
| Shiprocket order ID | Shiprocket response | Tracking |
| AWB number | Shiprocket AWB endpoint | Physical tracking |
| Courier name | Shiprocket | Ops insight |
| Freight charge | Shiprocket order | Margin calculation |
| COD commission | Shiprocket (for COD orders) | Margin calculation |
| COD collection amount | Shiprocket | Financial reconciliation |
| Tracking status | Shiprocket tracking API | Customer communication |
| NDR status | Shiprocket NDR endpoint | Exception handling |
| RTO flag | Shiprocket | Inventory restock trigger |

### Validation Checks for Spike

| Check | Pass Condition |
|---|---|
| Shiprocket freight charge is logged to Airtable | Freight visible in ops view |
| COD commission is logged for COD orders | Commission visible for margin calc |
| Tracking URL is pushed back to Airtable | Dan can click tracking from ops view |

## 12. Supabase Logging Recommendation

### Recommendation: Create a Minimal `integration_events` Table in Phase 0

**Decision:** CREATE a single `integration_events` table during the spike.

**Rationale:** The spike must prove that failed webhooks and syncs are detectable. Without any logging, a failed Razorpay webhook or broken Airtable sync will silently lose an order. The spike cannot validate that data is trustworthy if there is no way to detect when data stops flowing.

### Table Design

```sql
CREATE TABLE integration_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,        -- 'payment.webhook.received', 'payment.webhook.verified', 'airtable.sync.attempt', 'airtable.sync.success', 'airtable.sync.error', 'shiprocket.order.created', 'shiprocket.awb.generated', 'shiprocket.error', 'analytics.purchase.fired'
  source VARCHAR(50) NOT NULL,              -- 'razorpay', 'airtable', 'shiprocket', 'medusa', 'storefront'
  status VARCHAR(20) NOT NULL,              -- 'success', 'error', 'pending'
  summary VARCHAR(500),                     -- Human-readable description of what happened
  payload JSONB,                            -- Full event payload (for debugging)
  error_message TEXT,                       -- Error details if status = 'error'
  medusa_order_id VARCHAR(100),             -- Optional link to order
  external_id VARCHAR(255),                 -- Razorpay payment ID, Shiprocket order ID, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for order-specific debugging
CREATE INDEX idx_integration_events_order_id ON integration_events(medusa_order_id);
-- Index for event type filtering
CREATE INDEX idx_integration_events_type ON integration_events(event_type);
-- Index for time-range queries
CREATE INDEX idx_integration_events_created ON integration_events(created_at);
```

### What To Log

| Event Type | When | Payload Includes |
|---|---|---|
| `razorpay.webhook.received` | Razorpay POST received | Raw webhook body, headers, signature |
| `razorpay.webhook.verified` | Signature verified | payment_id, order_id, amount, status |
| `razorpay.webhook.verification_failed` | Signature mismatch | Raw webhook, expected vs actual signature |
| `medusa.order.payment_captured` | Payment captured in Medusa | order_id, total, payment status |
| `airtable.sync.attempt` | Sync triggered | order_id, fields being written |
| `airtable.sync.success` | Airtable record created/updated | airtable_record_id, order_id |
| `airtable.sync.error` | Airtable API error | error message, order_id, field mismatch details |
| `shiprocket.order.created` | Shiprocket order API call | shiprocket_order_id, order_id |
| `shiprocket.awb.generated` | AWB received | awb_number, courier, order_id |
| `shiprocket.error` | Shiprocket API failure | endpoint, status code, error body |
| `analytics.purchase.fired` | GA4 purchase event sent | order_id, value, currency |

### What NOT To Log (To Avoid Bloat)

- Every page_view event from the storefront (that belongs in GA4)
- Every add_to_cart event (GA4 owns behavioral data)
- Every API call to Medusa Store API (that belongs in Medusa logs)
- Full session replays (GA4 and Clarity own behavioral data)

### Log Retention

- Phase 0 spike: No retention limit
- Launch: Keep 30 days, then archive or prune older than 90 days
- Post-launch: Extend if debugging needs it

### Tables NOT to Create During Spike

| Table | Recommendation | Rationale |
|---|---|---|
| `analytics_debug_events` | DEFER | GA4 DebugView serves this purpose. Creating a separate debug table adds complexity with no clear benefit during spike. If GA4 is unreliable, fix GA4, not add a second analytics store. |
| `payment_webhook_logs` | MERGE INTO `integration_events` | A single table with `event_type` filtering is simpler than N tables. Query `WHERE event_type LIKE 'razorpay.%'` instead. |
| `airtable_sync_logs` | MERGE INTO `integration_events` | Same as above. Single table, filtered by event_type. |
| `shiprocket_sync_logs` | MERGE INTO `integration_events` | Same as above. Single table, filtered by event_type. |

### How Supabase Logging Is Used During Spike

```
1. Razorpay sends webhook to /webhooks/razorpay
2. Backend logs "razorpay.webhook.received" with raw payload
3. Backend verifies signature
4a. Success → logs "razorpay.webhook.verified"
4b. Failure → logs "razorpay.webhook.verification_failed"
5. Backend updates Medusa payment/order state
6. If Medusa update succeeds → logs "medusa.order.payment_captured"
7. Airtable sync fires
8. Success → logs "airtable.sync.success"
9. Failure → logs "airtable.sync.error" with error details
10. Dan checks integration_events WHERE status = 'error' daily during spike
```

This pattern means every failure path is queryable in Supabase within seconds. No silent failures.

## 13. UTM and Attribution Rules

### UTM Persistence Requirement

The Medusa storefront must persist UTM parameters through the entire customer journey. If a customer lands from an Instagram post with `?utm_source=instagram&utm_medium=social&utm_campaign=spring-drop`, that attribution must survive:

1. Page navigation (home → collection → PDP)
2. Add to cart
3. Checkout flow
4. Payment redirect (Razorpay opens in new window, returns to storefront)
5. Order confirmation page (where `purchase` fires)

### Implementation Requirements

| Requirement | Implementation | Failure Mode |
|---|---|---|
| UTM capture on landing | Parse `utm_*` params from URL on first page load | Attribution lost on first navigation |
| UTM persistence | Store in `sessionStorage` (not `localStorage` — session only) | Lost if user opens in new tab mid-funnel |
| UTM on purchase event | Read from `sessionStorage` and include in GA4 `purchase` event parameters | Purchase attributed to "direct" instead of real source |
| Cross-page navigation | UTM in `sessionStorage` survives SPA navigation | N/A if SPA |
| Razorpay return | After Razorpay redirect back, session storage is intact | UTM lost if Razorpay opens in same window and closes it |

### GA4 Auto-Tagging vs Custom UTMs

GA4 may automatically attribute sessions based on referrer and campaign data. This is independent of the UTM parameters in `sessionStorage`. The UTM parameters should be passed as event-level parameters on the `purchase` event:

```javascript
gtag('event', 'purchase', {
  'transaction_id': orderId,
  'value': total,
  'currency': 'INR',
  'items': items,
  'source': sessionStorage.getItem('utm_source'),    // Explicit override
  'medium': sessionStorage.getItem('utm_medium'),
  'campaign': sessionStorage.getItem('utm_campaign'),
  // GA4 will still auto-attribution based on session start
});
```

### Attribution Rules for Launch

| Traffic Source | GA4 Source/Medium | UTM Convention |
|---|---|---|
| Instagram organic post | instagram / social | `utm_source=instagram&utm_medium=social` |
| WhatsApp broadcast | whatsapp / social | `utm_source=whatsapp&utm_medium=social` |
| Email campaign | email / email | `utm_source=email&utm_medium=email` |
| Direct (no referrer) | direct / (none) | No UTM — auto-detected |
| Organic search | google / organic | No UTM — auto-detected |
| Unknown/other | (referrer) / referral | No UTM — GA4 auto-assigns |

### What Cannot Be Validated During Spike

- Cross-channel attribution (user sees Instagram ad, Googles brand, buys via direct) — requires 7+ days of data
- WhatsApp click → purchase attribution — requires Dan to use UTM consistently
- Email open → click → purchase — requires email tool integration

## 14. Test Cases

### P0-A01: `view_item` Fires on PDP with Correct SKU

**Objective:** Verify PDP load fires `view_item` with correct product data.

**Method:**
1. Open the Next.js storefront PDP for product with SKU "KC-001"
2. Check GA4 DebugView for `view_item` event
3. Verify parameters:
   - `items[0].item_id` = "KC-001"
   - `items[0].item_name` = "Coca Cola Keychain" (or correct title)
   - `items[0].price` = 199.00
   - `items[0].item_category` = "Keychains"
   - `currency` = "INR"
   - `value` = 199.00
4. Navigate to PDP for a different SKU ("ER-001") and repeat

**Pass condition:** Both PDPs fire `view_item` with correct, unique SKU, price in INR, and category.

---

### P0-A02: `add_to_cart` Fires with Correct SKU, Price, Quantity

**Objective:** Verify add-to-cart action fires the event with correct item data.

**Method:**
1. From PDP for "KC-001", select quantity 1 and click "Add to Cart"
2. Check GA4 DebugView for `add_to_cart` event
3. Verify parameters:
   - `items[0].item_id` = "KC-001"
   - `items[0].price` = 199.00
   - `items[0].quantity` = 1
   - `value` = 199.00
4. Navigate to another PDP, select quantity 3, add to cart
5. Verify `add_to_cart` fires with `quantity` = 3, `value` = 3 × unit price

**Pass condition:** Both add-to-cart actions fire with correct quantity and proportional value.

---

### P0-A03: `begin_checkout` Fires with Cart Value

**Objective:** Verify entering checkout fires event with correct cart data.

**Method:**
1. Add 2 different products to cart (e.g., KC-001 at ₹199 and FM-001 at ₹225 = ₹424)
2. Click "Proceed to Checkout" or equivalent
3. Check GA4 DebugView for `begin_checkout` event
4. Verify parameters:
   - `value` = 424.00 (or correct cart total)
   - `items[]` contains 2 items
   - `items[0].item_id` = "KC-001"
   - `items[1].item_id` = "FM-001"
   - `currency` = "INR"

**Pass condition:** Cart value matches manual calculation. All items present in `items[]`.

---

### P0-A04: `purchase` Fires Only After Successful Medusa Order/Payment Confirmation

**Objective:** Verify `purchase` event only fires when payment is confirmed, not on order creation or page refresh.

**Method:**
1. Complete a full checkout with Razorpay test card
2. On order confirmation page, check GA4 DebugView
3. Verify `purchase` event fires with:
   - `transaction_id` = Medusa order ID
   - `value` = order total
   - `currency` = "INR"
   - `items[]` with correct line items
   - `items[].price` as unit prices
4. **Critical:** Before completing payment, verify:
   - During checkout (payment modal open), NO `purchase` event has fired
   - On payment failure (use Razorpay test failed card 4000 0000 0000 0002), NO `purchase` event fires
5. Refresh the order confirmation page
6. Verify NO second `purchase` event fires (deduplication)

**Pass condition:** `purchase` fires exactly once — after successful payment confirmation only.

**Fail condition:** `purchase` fires before payment is captured, after refresh, or on failed payment.

---

### P0-A05: GA4 Transaction ID Equals Medusa Order ID

**Objective:** Ensure GA4 purchase can be linked back to the correct Medusa order.

**Method:**
1. Complete a purchase and capture the GA4 `purchase` event parameters
2. Note `transaction_id` from DebugView
3. Query Medusa admin or API for that order ID
4. Verify: Medusa order exists with matching `id`

**Pass condition:** Every GA4 `transaction_id` resolves to a valid Medusa order.

**Fail condition:** `transaction_id` is empty, undefined, or does not match a Medusa order.

---

### P0-A06: GA4 Purchase Value Equals Medusa Order Total

**Objective:** Revenue reconciliation — every rupee must match.

**Method:**
1. Complete 3 test purchases with different combinations:
   - Single item, no shipping (if possible)
   - Multiple items with shipping
   - Discounted order (if coupon/discount is implemented)
2. For each order:
   - Capture GA4 `purchase.value`
   - Capture Medusa `order.total` (after /100 conversion)
   - Compare: value === total
3. Document any mismatch

**Pass condition:** All 3 orders have GA4 `value` === Medusa `order.total` (after unit conversion).

**Fail condition:** Any single order has a mismatch. Revenue data cannot be trusted if even one order fails.

---

### P0-A07: Razorpay Captured Amount Equals Medusa Payment Amount

**Objective:** Payment reconciliation — the money collected matches the order value.

**Method:**
1. Complete a test payment using Razorpay test card
2. After payment, query Razorpay API: `GET /v1/payments/:payment_id`
3. Extract `amount` (in paise) and verify `status` is "captured"
4. Query Medusa: `GET /admin/orders/:id`
5. Extract `payment_collections[0].amount` (in minor units)
6. Compare: Razorpay `amount` === Medusa `payment_collection.amount`

**Pass condition:** Razorpay captured amount matches Medusa payment collection amount. If Medusa stores in minor units, both numbers are in the same unit.

**Fail condition:** Mismatch or Razorpay payment is "authorized" but not "captured."

---

### P0-A08: Airtable Mirrored Order Value Equals Medusa Order Value

**Objective:** Ops sees the correct financial data.

**Method:**
1. Complete a Medusa order
2. Wait for Airtable sync to complete
3. Open Airtable test base → Medusa Order Mirror table
4. Find the record by Medusa Order ID
5. Compare "Order Value" field against Medusa `order.total`
6. Repeat for 3 orders

**Pass condition:** All 3 orders have Airtable "Order Value" === Medusa `order.total`.

**Fail condition:** Any single mismatch. Opens ops to working with wrong financial data.

---

### P0-A09: Failed Payment Does Not Fire `purchase`

**Objective:** No false revenue attribution from failed payments.

**Method:**
1. Add product to cart, proceed to checkout
2. Use Razorpay test failed card: 4000 0000 0000 0002
3. Complete the (failed) payment flow
4. Check GA4 DebugView for any `purchase` event in the last 30 seconds
5. Check Medusa admin for any order with "captured" or "paid" status
6. Check Airtable for any new order record

**Pass condition:** No `purchase` event. No paid Medusa order. No Airtable fulfillment-ready record.

**Fail condition:** Any of the above exists despite failed payment.

---

### P0-A10: Duplicate `purchase` Events Are Prevented on Refresh

**Objective:** Order confirmation page refresh does not double-count revenue.

**Method:**
1. Complete a purchase and verify `purchase` fired once
2. Refresh the order confirmation page (F5 or browser reload)
3. Check GA4 DebugView — no new `purchase` event should appear
4. Check GA4 DebugView for the original `transaction_id` — still only one occurrence

**Pass condition:** Exactly one `purchase` event per `transaction_id` in GA4.

**Fail condition:** A second `purchase` event with the same `transaction_id` appears after refresh.

---

### P0-A11: Integration Events Are Logged in Supabase

**Objective:** The sync/debug trail exists and is queryable.

**Method:**
1. Complete a successful purchase flow
2. Query Supabase: `SELECT * FROM integration_events WHERE medusa_order_id = '<order_id>'`
3. Verify records exist for:
   - `razorpay.webhook.received`
   - `razorpay.webhook.verified`
   - `airtable.sync.success` (or `airtable.sync.attempt`)
4. Trigger a webhook failure scenario (send invalid signature to webhook endpoint)
5. Query: `SELECT * FROM integration_events WHERE event_type = 'razorpay.webhook.verification_failed'`
6. Verify error record exists with details

**Pass condition:** Every integration event in the purchase flow is logged. Error events are logged with sufficient detail to debug.

**Fail condition:** Integration events are missing, unclear, or not queryable.

---

### P0-A12: `value` Unit Conversion Is Correct

**Objective:** Minor unit (paise) to INR conversion is working.

**Method:**
1. Create a test where Medusa stores a known amount (e.g., ₹199 = 19900 paise)
2. Check the `analytics.ts` `centsToINR()` function output for this value
3. Verify: `centsToINR(19900) === 199.00`
4. Check GA4 DebugView for the `value` parameter on a `view_item` event for that product
5. Verify GA4 shows `value: 199.00`, not `19900`

**Pass condition:** All monetary values in GA4 are in INR (not paise), matching the storefront display.

**Fail condition:** Any GA4 event shows paise values (100x expected). This would corrupt all revenue data.

---

### P0-A13: Currency Is Always INR

**Objective:** No accidental USD or default currency events.

**Method:**
1. Fire each ecommerce event type (view_item, add_to_cart, begin_checkout, purchase)
2. For each event in GA4 DebugView, verify `currency: "INR"`
3. There must be no ecommerce event with `currency: "USD"` or missing `currency` entirely

**Pass condition:** Every ecommerce event has `currency: "INR"`.

**Fail condition:** Any event has `currency: "USD"` or missing currency.

---

### P0-A14: Event Fires Within 3 Seconds of User Action

**Objective:** Events are not delayed to the point of user drop-off.

**Method:**
1. Perform each event-triggering action (view PDP, add to cart, etc.)
2. Use browser DevTools → Network tab to monitor GA4 collection endpoint
3. Verify event appears in GA4 DebugView within 3 seconds of action
4. Verify no JavaScript errors appear in browser console

**Pass condition:** All events fire within 3 seconds. No console errors.

**Fail condition:** Events delayed >5 seconds, or console errors present.

---

### P0-A15: Multiple Line Items in Single Purchase

**Objective:** Multi-item orders produce correct `items[]` in `purchase`.

**Method:**
1. Add 3 different SKUs to cart (e.g., KC-001 × 2, ER-001 × 1, FM-001 × 1)
2. Complete purchase
3. Check GA4 DebugView `purchase` event
4. Verify:
   - `items[]` contains 4 item entries (not 3 — KC-001 has quantity 2)
   - Each entry has correct `item_id`, `price`, `quantity`
   - `value` = sum of all line totals

**Pass condition:** Line items array matches Medusa order items, including quantity expansion.

## 15. Failure Thresholds

### Immediate "Do Not Proceed" (Any One)

| Condition | Why |
|---|---|
| GA4 `purchase` event does not fire after successful payment | Zero revenue tracking capability. Cannot make launch decisions. |
| GA4 `value` does not match Medusa order total (after unit conversion) | Revenue data is unreliable. Cannot trust any financial metric. |
| Razorpay captured amount does not match Medusa payment amount | Payment reconciliation is broken. Cannot verify money movement. |
| Airtable mirrored order value drifts from Medusa | Ops loses financial data trust. Manual reconciliation needed. |
| Duplicate `purchase` events on page refresh cannot be prevented | Double-counted revenue. Cannot trust conversion rate or revenue. |
| Failed payment produces a `purchase` event | False revenue attribution. Funerals are untrustworthy. |
| Unit conversion (paise → INR) is wrong or inconsistent | Every dollar figure in GA4 is off by 100x. Data is dangerous. |
| `currency` parameter is not "INR" on any ecommerce event | GA4 may misclassify revenue in wrong currency. |
| Integration events are not logged in Supabase | Silent failures are undetectable. Cannot debug webhook or sync failures. |
| UTM parameters are not persisted through checkout | Traffic attribution is lost. All purchases appear as "direct." |

### "Conditional Proceed" Thresholds

Allow if ALL P0 tests pass AND:

| Condition | Rationale |
|---|---|
| Razorpay-to-Medusa reconciliation passes for prepaid but COD is not tested | COD is Phase 3 work. Prepaid trust is sufficient for launch. |
| Airtable sync passes but Shiprocket sync is delayed | Shiprocket does not affect GA4 or revenue data. Ops works with manual AWB in short term. |
| Some P1 events (search, share) are not implemented | These do not affect revenue tracking or funnel analysis. |
| GA4 reports are basic (no custom dashboards built) | Raw data in GA4 UI is sufficient for launch. Dashboards are convenience, not trust. |
| UTM persistence is implemented but not thoroughly tested across all browsers | Chrome/Firefox/safari coverage is sufficient for spike. Edge cases can be caught post-launch. |
| Unit conversion is verified for prepaid path only | COD payment amounts follow the same rule. Tested when COD is implemented. |

### "Proceed" Thresholds

ALL of:

- Every P0 test (P0-A01 through P0-A15) passes
- GA4 revenue reconciles with Medusa for 3+ test orders
- Razorpay captured amounts match Medusa for 3+ test payments
- Airtable mirrors match Medusa for all test orders
- No duplicate `purchase` events across any test scenario
- Failed payments never produce a `purchase` event
- Unit conversion is correct (paise → INR / 100)
- All monetary values in GA4 are in INR
- Integration events are queryable in Supabase
- UTM parameters survive the checkout flow

## 16. Launch Minimum Dashboard

### Pre-Built GA4 Reports — Must Exist Before Launch

Not custom dashboards. These are GA4 built-in reports configured correctly:

| Report | Must Show | Used By |
|---|---|---|
| **Real-time** | Live page views, active users | Launch day monitoring by Tobi |
| **Monetization → Ecommerce purchases** | Revenue, orders, AOV, items sold | Dan daily check |
| **Monetization → Ecommerce items** | Top products by views and revenue | Dan weekly check |
| **Acquisition → Traffic acquisition** | Sessions by source/medium | Eli marketing decisions |
| **Engagement → Events** | Event counts for all 11 P0 events | Tobi analytics health check |
| **Lifecycle → Conversion funnel** | funnel steps (page_view → purchase) | Harley funnel analysis |

### What These Reports Tell Dan

| Dan's Question | Report | Metric |
|---|---|---|
| How much revenue today? | Ecommerce purchases | Revenue (₹) |
| How many orders today? | Ecommerce purchases | Purchases (count) |
| What's my AOV? | Ecommerce purchases | Revenue / Purchases |
| What's my conversion rate? | Conversion funnel | (Purchases / Sessions) × 100 |
| Where are customers coming from? | Traffic acquisition | Sessions by source/medium |
| What products are selling? | Ecommerce items | Revenue by item name |
| Where are people dropping off? | Conversion funnel | Users at each step |

### What Dan Does NOT Need (Before Launch)

| Tool | Why Not Needed | When Needed |
|---|---|---|
| Looker Studio dashboard | GA4 built-in reports are sufficient | Post-launch Day 30 |
| Supabase reporting views | Reporting should come from GA4 for behavioral, Medusa/Airtable for ops | Phase 6 |
| Revenue dashboard in Notion | Dan checks GA4 directly or asks Tobi | Not yet |
| Live order feed | Dan uses Airtable for ops view | Post-launch Day 1 |

## 17. Post-Launch Analytics Roadmap

### Day 1-7: Validation & Trust Building

| Task | Owner | Depends On |
|---|---|---|
| Verify all P0 events fire in production | Tobi | Launch |
| Check GA4 revenue matches Medusa daily | Avinash/Dan | First day of orders |
| Check Razorpay payout amounts against GA4 revenue | Patrick | First Razorpay payout |
| Fix any event parameter gaps found in production | Tobi | Production data |
| Set up integration event monitoring (watch `integration_events` for errors) | Tobi | Supabase logging |

### Day 8-30: Expansion

| Task | Owner | Priority |
|---|---|---|
| Implement P1 events (refund, search, share) | Tobi | Medium |
| Build custom GA4 dashboard (Sales Overview, Traffic Source, Product Performance) | Tobi | High |
| Add Microsoft Clarity for session recordings & heatmaps | Tobi | High |
| Connect Klaviyo/Mailchimp to GA4 for email flow triggers | Eli/Tobi | Medium |
| Set up UTM parameter tracking spreadsheet for Dan | Eli | Medium |
| Verify attribution with 2+ weeks of data | Avinash/eli | Low |

### Day 31-60: Reporting

| Task | Owner | Priority |
|---|---|---|
| Build Looker Studio or Supabase reporting if needed | Tobi/Avinash | Low |
| Build daily revenue/ops dashboard for Dan | Tobi | Medium |
| Set up automated alerts for reconciliation failures | Tobi | Low |
| Run first 30-day performance review per optimization plan | Nik/Eli | High |
| Build product performance reporting | Avinash | Medium |

### Day 61+: Hardening (Phase 6 Alignment)

| Task | Owner |
|---|---|
| Integration error alerting (WhatsApp/Slack when sync fails) | Tobi |
| Inventory reconciliation reporting | Andy |
| Refund/replacement analytics | Tobi |
| Artist/drop performance reporting | Eli |

## 18. Fynd Comparison from Analytics Perspective

### Side-by-Side: Analytics Readiness

| Factor | Fynd (Commerce.com) | Medusa + Supabase | Advantage |
|---|---|---|---|
| **GA4 event implementation** | Auto-fires standard ecommerce events (purchase, view_item, add_to_cart, begin_checkout) via platform integration | Custom implementation via `analytics.ts`. Tobi writes and owns every event. | FYND — zero implementation effort. Events fire as soon as Fynd is configured. |
| **GA4 purchase event reliability** | Proven — thousands of merchants use Fynd's GA4 integration. Purchase fires only after Fynd confirms order. | Untested — depends on storefront implementation. Risk of multiple purchase events, wrong values, or missing params. | FYND — proven at scale. Medusa is unproven. |
| **Revenue reconciliation** | Fynd provides order reporting with GA4-pushed data. Reconciliation is in-platform. | Manual: GA4 vs Medusa vs Razorpay vs Airtable. Four-way reconciliation needed. | FYND — single source for order financial data. Medusa requires cross-system checks. |
| **Payment reconciliation** | Razorpay integrated into Fynd checkout. Amount matching is platform-verified. | Custom Razorpay integration. Amount matching depends on correct unit conversion and webhook handling. | FYND — payment integration is platform-managed. Medusa builds it from scratch. |
| **Deduplication of purchase events** | Fynd manages this. One order = one purchase event. | Must be implemented manually (session storage + transaction_id). Risk of double-counting on refresh. | FYND — built-in. Medusa requires custom logic. |
| **Event schema coverage** | Auto-fires ~8 standard ecommerce events. Custom events need GTM/extra code. | Full control — can implement any event schema. P0 events are implementable but require code. | TIE — Fynd covers standard needs. Medusa can be more flexible but requires more work. |
| **Funnel tracking** | Fynd events flow into GA4. Standard funnel works out of box. | Custom events flow into GA4. Funnel works if events are implemented correctly. | FYND — proven funnel pipeline. Medusa funnel depends on implementation quality. |
| **UTM/attribution persistence** | Fynd storefront is Fynd-managed. UTM persistence is platform-handled. | Storefront is custom Next.js. UTM persistence must be built into `analytics.ts` and session storage. | FYND — handled by platform. Medusa requires custom implementation. |
| **Integration logging** | Fynd provides platform logs for orders, payments, and syncs. | Custom `integration_events` table in Supabase. Built during spike. | FYND — logging exists as platform feature. Medusa requires conscious engineering investment. |
| **COD analytics** | Fynd handles COD orders natively. COD analytics flow through same event pipeline. | Custom COD payment provider needed. COD analytics events must mirror prepaid path. Not implemented in spike scope. | FYND — COD is native. Medusa COD analytics is undefined. |
| **Refund tracking** | Refunds in Fynd → GA4 refund event. | Refund event requires custom implementation in Medusa + GA4. | FYND — refund tracking exists. Medusa refund tracking is Phase 3 work. |
| **Multi-channel order view** | Fynd aggregates online + some offline channels | Medusa is online-only. Offline orders remain in Airtable Base 5. | FYND — single order view. Medusa requires separate reconciliation. |
| **Dashboards before launch** | Fynd GA4 integration: events fire in DebugView after platform config. | Events fire in DebugView after custom code implementation and testing. | FYND — faster dashboard readiness. Medusa requires build-test cycles. |
| **India-specific reliability** | Fynd is India-native. Tested with Indian payment gateways, Indian tax structures, Indian traffic patterns. | Medusa is US/Europe-native. India-specific behavior depends on custom configuration. | FYND — built for India ecommerce. Medusa needs India adaptation. |

### What Fynd Cannot Do That Medusa Can (Analytics)

| Capability | Why It Matters |
|---|---|
| Full control over event schema | Custom events (drop_signup, bundle_view) can be implemented without platform constraints |
| Direct GA4 measurement ID control | Events can be sent directly, not through Fynd's proxy layer |
| Custom attribution models | Can implement server-side attribution or custom UTM persistence logic |
| Raw GA4 event data | Fynd may aggregate or transform events before sending to GA4. Medusa storefront sends raw, unmodified events. |
| Supabase integration log | Custom debugging and audit trail not available in Fynd |
| No analytics data leakage | All event data goes directly to TPL's GA4 property, not through any intermediary |

### What Medusa Cannot Do That Fynd Can (Analytics) at Launch

| Capability | Impact |
|---|---|
| Auto-fire GA4 events | Every Medusa event must be manually implemented and tested. Risk of missing events, wrong parameters, and JavaScript errors. |
| Proven purchase event deduplication | Fynd's purchase deduplication is battle-tested. Medusa's is custom code that has never run in production. |
| COD analytics pipeline | COD orders are a separate, untested analytics path. May introduce tracking gaps. |
| Single dashboard for all order analytics | Medusa splits analytics across GA4 (behavioral), Medusa admin (financial), Razorpay (payment), Airtable (ops). Dan loses a single-pane view. |

### Verdict (Analytics)

**From a pure analytics trust perspective, Fynd is safer for launch.**

Fynd's GA4 integration is proven, auto-fires standard ecommerce events, handles purchase deduplication, and does not require custom event schema implementation during the highest-risk period (first launch).

Medusa + Supabase can produce equally trustworthy analytics data, but only if:
1. Every event is correctly implemented (Tobi writes bug-free `analytics.ts`)
2. Unit conversion is correct (every monetary value ÷ 100)
3. Purchase deduplication works (no double-counting on refresh)
4. Failed payments never produce false events
5. UTM persistence works across the entire checkout flow
6. Integration logging catches every failure

**That is six conditions that must all be met before a single rupee of launch revenue flows through the system.** Fynd meets all six by default.

**The analytics advantage of Medusa is long-term flexibility, not launch-day readiness.** If the spike proves the analytics path works, Medusa's custom event schema and full data ownership are superior post-launch. But the first 30 days of launch data must be trustworthy — and Fynd reduces the risk of untrustworthy data near zero without any custom code.

## 19. Final Analytics Recommendation

# Analytics Recommendation

Recommendation: **Conditional Proceed**

## Brutal Honesty Summary

The Medusa + Supabase stack can produce trustworthy analytics data, but it requires significant custom implementation that Fynd provides out of the box. The core vulnerability is not the architecture — Medusa owning commerce truth and GA4 owning behavioral data is correct — it is the implementation risk: every GA4 event must be custom-coded, unit conversion must be exact, purchase deduplication must prevent double-counting, and integration failures must be logged and detectable.

If all P0 analytics tests pass during the spike, the data will be trustworthy enough for launch decisions. But the margin for error is near zero. A single missing `÷ 100` in the analytics utility function will corrupt every revenue number in GA4. A single missed session storage check will double-count every purchase on page refresh. These are not architectural problems — they are implementation quality problems that can only be caught by rigorous testing.

**The spike should continue.** The analytics validation tests defined in this document will either prove or disprove data trust. If the spike produces clean event firing, correct unit conversion, exact revenue reconciliation, and no duplicate events, then Medusa's analytics path is viable.

**But Fynd is the safer choice for launch analytics.** There is no shame in launching on Fynd, getting clean data from Day 1, and migrating to Medusa post-launch when there is revenue, live traffic to test against, and no time pressure on the analytics implementation.

## Evidence Summary

| Area | Status | Evidence | Risk |
|---|---|---|---|
| GA4 event schema | UNTESTED | Schema defined for 11 P0 events. Event names, parameters, and data types documented. | LOW — schema is well-defined. Risk is in implementation, not design. |
| PDP events | UNTESTED | `view_item` mapping from Medusa product to GA4 items[] defined. | MEDIUM — depends on correct SKU mapping and unit conversion. |
| Cart events | UNTESTED | `add_to_cart`, `remove_from_cart`, `view_cart` defined with quantity-aware value calculation. | MEDIUM — quantity × price aggregation must be correct. |
| Checkout events | UNTESTED | `begin_checkout`, `add_shipping_info`, `add_payment_info` defined. | MEDIUM — checkout linear flow must be event-complete. |
| Purchase event | UNTESTED | Conditional on payment capture. Deduplication via session storage + transaction_id. | HIGH — most critical event. Deduplication is unproven. |
| Revenue reconciliation | UNTESTED | GA4 value must match Medusa total must match Razorpay amount. Three-way check defined. | HIGH — depends on unit conversion correctness. 100x error risk. |
| Razorpay reconciliation | UNTESTED | Amount match rule defined. Webhook verification and payment ID storage required. | HIGH — payment data trust depends on webhook handling. |
| Airtable reconciliation | UNTESTED | Mirrored order value must match Medusa. Financial field protection needed. | MEDIUM — sync idempotency and field protection are unproven. |
| Supabase logging | PLANNED | Single `integration_events` table recommended. Event types defined. | MEDIUM — simple implementation but requires developer effort. |
| Attribution/UTM | UNTESTED | sessionStorage-based persistence defined. Implementation depends on storefront. | MEDIUM — simple pattern but must survive checkout redirect. |
| Fynd comparison | COMPLETE | Fynd is safer for launch analytics. Medusa offers post-launch flexibility. | LOW — comparison is documented honestly. No denial of the trade-off. |

## Required Fixes Before Launch

1. **Implement `centsToINR()` utility** — Every monetary value must be divided by 100 before reaching GA4. Any event that bypasses this function will have 100x inflated values. This is the single highest-risk implementation detail.
2. **Implement purchase deduplication** — Session storage flag + transaction_id uniqueness. Test with page refresh, back-button, and browser restart mid-funnel.
3. **Implement UTM persistence** — sessionStorage for utm_source, utm_medium, utm_campaign. Must survive checkout redirect.
4. **Create `integration_events` table** — Single table in Supabase for all integration event logging. Log every webhook receipt, sync attempt, and error.
5. **Test reconciliation for 5+ orders** — Three-way match: GA4 purchase value === Medusa order total === Razorpay captured amount. All three must match.
6. **Test failed payment path** — Verify no `purchase` event fires, no paid order created, no Airtable fulfillment record.
7. **Test multi-item order** — Verify `items[]` has correct count and values for orders with 2+ SKUs and quantities.
8. **Verify currency = "INR" on every event** — Any event with missing or "USD" currency is a blocking defect.

## Can Wait Until Post-Launch

- P1 events (refund, search, share) — not needed for launch funnel trust
- Custom GA4 dashboards — built-in reports are sufficient for first 7 days
- Microsoft Clarity heatmaps/recordings — helpful but not launch-critical
- Klaviyo/Mailchimp-GA4 connection — email flows can start post-launch
- COD analytics pipeline — COD is Phase 3 work
- Looker Studio or Supabase reporting views — GA4 is sufficient for launch
- Automated reconciliation alerts — manual daily check is acceptable at low volume
- Multi-touch attribution analysis — requires 30+ days of data before analysis is meaningful

## What Would Make Data Untrustworthy (Summary)

1. **Unit conversion failure** — not dividing by 100. Every number is 100x off.
2. **Purchase deduplication failure** — double-counted revenue on page refresh.
3. **Failed payment creates false purchase event** — attributed revenue that never existed.
4. **Missing `transaction_id` on purchase** — no link between GA4 and Medusa for reconciliation.
5. **Currency not INR** — GA4 may apply incorrect exchange rates.
6. **UTM persistence failure** — all traffic attributed to "direct."
7. **No integration logging** — silent failures undetectable.
8. **Airtable financial fields editable** — ops accidentally changes order values.

## Final CTO Gate Input

### Analytics Verdict

Medusa + Supabase can work for analytics, but every data path requires custom implementation that Fynd provides natively. The core risk is implementation quality, not architecture. If the spike proves all P0 tests pass, the data is trustworthy. But the path to trust passes through unit conversion, deduplication, UTM persistence, and integration logging — four implementation details that must all be correct simultaneously.

**The spike should test this rigorously. Blind trust in custom analytics code is not acceptable for launch revenue data.**

### My Recommendation

```
CONDITIONAL PROCEED — Subject to all P0 analytics tests passing
Data trust depends on correct unit conversion, purchase deduplication, 
UTM persistence, and integration logging. Fynd is safer for launch analytics.
If the spike proves clean event firing and exact reconciliation, proceed.
Do NOT skip any P0 analytics test. No compromises on revenue data trust.
```

### Conditions

1. **All 15 P0 analytics tests (P0-A01 through P0-A15) must pass** before the analytics path is considered viable. No exceptions.
2. **Revenue reconciliation must be demonstrated with 5+ test orders** spanning single-item, multi-item, and discounted scenarios. All three sources (GA4, Medusa, Razorpay) must match on every order.
3. **Integration event logging must be functional and queryable** in Supabase. Failed webhooks must leave a detectable trail.
4. **Fynd comparison must be presented to Dan** with the honest assessment that Fynd provides more reliable launch analytics with zero custom implementation risk.

### Sign-Off

```
Analytics Lead: Avinash
Date: 2026-05-29
Status: CONDITIONAL PROCEED
Rationale: Architecture is sound. Implementation risk is high.
Data trust requires all 15 P0 analytics tests to pass.
No compromises on revenue reconciliation or purchase deduplication.
```
