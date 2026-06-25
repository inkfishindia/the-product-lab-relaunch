# Phase 0 QA Validation Plan: Medusa + Supabase Technical Spike

<!-- last-updated: 2026-05-29 -->
<!-- author: James (QA Lead), Launch-Gate Owner -->

## 1. QA Objective

Validate whether Medusa + Supabase/Postgres can serve as TPL's production commerce stack for the first D2C relaunch. This is not a cosmetic review. This is a CTO-level technical validation gate. Every test below exists to answer one question: **can TPL launch revenue, fulfill orders, and operate daily without Fynd?**

The spike passes only if:

1. A real customer can browse a real SKU, add it to cart, complete a Razorpay test payment, and create a correct Medusa order.
2. That order mirrors into Airtable for ops without duplication or corruption.
3. The Shiprocket fulfillment path is either working or proven feasible.
4. GA4 events fire with correct SKU/item data.
5. Dan can use the Medusa admin for daily product/order review without engineering help.
6. The deployment path is clear enough that the team can ship to production.

If any of these cannot be proven, the recommendation is "Do Not Proceed" with Medusa, and TPL should launch on Fynd.

## 2. Authority

**James blocks launch if any P0 test fails.** This authority extends to the Phase 0 spike verdict. If I recommend "Do Not Proceed," Dan must not commit to Medusa for production. If I recommend "Conditional Proceed," Dan must accept the conditions in writing before a Phase 1 build begins.

## 3. Systems Under Test

| System | Role in Spike | Owns |
|---|---|---|
| Medusa backend | Commerce engine | Products, carts, orders, pricing, inventory |
| Supabase Postgres | Database hosting | Medusa schema, integration logs |
| Next.js storefront | Customer-facing UI | PDP, cart, checkout shell |
| Razorpay (test mode) | Payment processing | Payment authorization, capture, webhooks |
| Shiprocket API | Shipping fulfillment | AWB, labels, tracking, COD flags |
| Airtable | Ops cockpit | Mirrored order records, production/QC status |
| GA4/GTM | Analytics | Ecommerce events, funnel tracking |

## 4. Test Environments Needed

| Environment | Purpose | Configuration |
|---|---|---|
| **Local dev** | Spike execution, initial validation | Medusa backend on `localhost:9000`, storefront on `localhost:3000`, Supabase Postgres (remote), local Redis if required |
| **Staging (optional spike)** | Deployment proof, webhook testing | Medusa backend on Render/Fly.io/Railway, storefront on Vercel preview, Supabase Postgres (same project), ngrok for webhook tunneling |
| **Razorpay test mode** | Payment validation | Test key ID, test key secret, test webhook secret |
| **Shiprocket test/sandbox** | Shipping validation | Test API token or sandbox account |
| **Airtable test base** | Sync validation | Dedicated spike base/table, not production ops |
| **GA4 test property** | Event validation | Test measurement ID, DebugView access |

**Critical requirement:** The spike must not use production Airtable bases, production Razorpay keys, or production Shiprocket accounts. All test environments must be isolated.

## 5. Credentials/Access Needed

| Credential | Owner | Blocking? | Notes |
|---|---|---|---|
| Supabase project URL + Postgres connection string | Dan/CTO | Yes | Direct connection for migrations, pooler if needed |
| Supabase SQL editor access | Dan/CTO | Yes | Verify schema, debug issues |
| Razorpay test key ID + secret | Dan | Yes | Required for payment proof |
| Razorpay test webhook secret | Dan | Yes | Required for webhook verification |
| Airtable personal access token | Dan | Yes | Required for sync proof |
| Airtable base/table ID for test orders | Dan/Ops | Yes | Must be created before spike Day 5 |
| Airtable field schema confirmation | Dan/Ops | Yes | Must match `integrations/airtable/order-field-map.md` |
| Shiprocket API credentials (test) | Dan/Andy | Yes for proof, no for documented feasibility | If unavailable, document payload mapping only |
| GA4 test measurement ID | Dan/Eli | Yes for DebugView | Can use existing GA4 test property |
| 10 SKU final approval + image URLs | Dan/Catalog | Yes | Selected SKUs in spike execution plan |
| Test addresses + pincodes | Tobi/James | Yes | Bangalore 560001, Mumbai 400001, Delhi 110001 |

## 6. Acceptable Technical Debt During Spike

The following are acceptable during Phase 0. They are NOT acceptable for production launch:

| Debt | Acceptable for spike? | Must fix before launch? |
|---|---|---|
| Placeholder product copy | Yes | Yes |
| Low-res product images | Yes | Yes |
| Unstyled/unbranded storefront | Yes | Yes |
| Manual inventory values (no real-time sync) | Yes | Yes |
| Manual shipping method entry | Yes | Yes |
| Flat-rate shipping only | Yes | No (acceptable if product is lightweight) |
| No email/SMS confirmation | Yes | Yes |
| No returns/refunds flow | Yes | Yes (P1) |
| No COD automation | Yes | Yes |
| No production deployment | Yes | N/A (spike only) |
| Manual seed script (no migration pipeline) | Yes | Yes |
| Limited error handling in sync code | Yes | Yes |
| No monitoring/alerting | Yes | Yes |
| No disaster recovery plan | Yes | Yes |

## 7. Unacceptable Launch Risk

The following are NEVER acceptable, even during the spike:

- Payment state that cannot be reconciled between Razorpay and Medusa
- Airtable sync that creates duplicate or conflicting order records
- Order totals that do not match between Medusa and Razorpay
- Inventory decremented before payment is captured
- Admin interface that requires command-line operations for daily use
- Supabase connection that drops under repeated checkout load
- Missing or incorrect GA4 purchase events
- COD path that creates unfinishable orders
- Shiprocket integration that requires manual order re-entry
- Deployment process that requires more than 30 minutes of engineering time per deploy

## 8. P0 Tests — Must Pass

### P0.1 Medusa Runs Against Supabase Postgres

**Objective:** Prove Medusa backend connects to Supabase-hosted Postgres and stays connected.

**Method:**
1. Scaffold Medusa backend with `DATABASE_URL` pointing to Supabase Postgres direct connection.
2. Run Medusa migrations. Verify all expected tables are created in Supabase (check Supabase SQL editor for `medusa_*` tables).
3. Start Medusa backend. Verify no connection errors in startup logs.
4. Perform 10 consecutive product queries through Store API.
5. Restart Medusa backend. Verify it re-connects without migration re-run or data loss.
6. Simulate brief Supabase connection interruption (if possible via Supabase dashboard connection limit). Verify Medusa retries gracefully.

**Pass criteria:**
- Medusa starts and connects to Supabase Postgres without errors.
- All migrations complete. Expected tables exist in Supabase.
- 10 consecutive queries succeed with <500ms response time.
- Backend restart does not require migration re-run.
- Connection interruption does not corrupt Medusa runtime state.

**Fail criteria:**
- Medusa fails to start due to Postgres connection.
- Migrations fail or produce unexpected schema.
- Connection drops during normal operation.
- Pooler connection conflicts with Medusa transaction patterns.

---

### P0.2 Admin Is Accessible

**Objective:** Confirm Medusa admin UI opens and is usable without CLI.

**Method:**
1. Start Medusa backend with admin enabled.
2. Open `http://localhost:9000/app` (or configured admin URL) in browser.
3. Log in with admin credentials created during scaffold.
4. Navigate to Products section. Confirm product list renders.
5. Navigate to Orders section. Confirm order list renders (even if empty).
6. Navigate to Settings. Confirm region, currency, tax settings are visible.

**Pass criteria:**
- Admin login works with browser-only interaction.
- Product and order list pages render without JavaScript errors.
- Settings pages are navigable.

**Fail criteria:**
- Admin requires terminal commands to start or access.
- Admin pages have blank/error states.
- Admin requires developer tools to debug basic pages.

---

### P0.3 10 SKUs Import Correctly

**Objective:** Import 10 real TPL SKUs into Medusa and verify data integrity.

**Method:**
1. Create seed script using `data/spike-products-10-skus.csv`.
2. Import 10 products with:
   - Title
   - SKU in Medusa variant SKU field
   - Category
   - Price in INR
   - Image URLs (from catalog or placeholder)
   - Inventory quantity set to 10
3. Query Medusa Store API: `GET /store/products`.
4. Query admin API: `GET /admin/products`.
5. For each of the 10 SKUs, verify via Store API:
   - `title` matches CSV
   - `variants[0].sku` matches CSV SKU
   - `variants[0].prices[0].amount` matches CSV price in INR
   - `thumbnail` URL resolves (200 status)
   - `categories` includes correct category

**Pass criteria:**
- All 10 SKUs appear in both Store API and admin.
- Every field (title, SKU, price, category, image) is correct for every product.
- No duplicate SKUs exist.
- Prices are in INR (not default USD).

**Fail criteria:**
- Any SKU missing from Store API.
- Any field incorrect (wrong price, missing image, wrong SKU).
- Duplicate SKUs created.
- Prices in wrong currency.

---

### P0.4 Product Data Retrievable from Store API

**Objective:** Confirm storefront can read all product data needed for PDP rendering.

**Method:**
1. From storefront, call `GET /store/products?limit=10`.
2. Verify response contains 10 products.
3. For one product, call `GET /store/products/{id}`.
4. Verify response contains:
   - `id`, `title`, `handle`, `description`
   - `variants[]` with `id`, `sku`, `prices[]`, `inventory_quantity`
   - `thumbnail`, `images[]`
   - `categories[]`

**Pass criteria:**
- Store API returns paginated product list.
- Single product endpoint returns full variant/pricing data.
- All fields needed for PDP rendering are present.

**Fail criteria:**
- Store API returns errors or empty responses.
- Product data is missing fields needed for PDP (variant, price, image).

---

### P0.5 PDP Displays Correct Product Data

**Objective:** Customer-facing PDP renders correct product information.

**Method:**
1. Navigate to `http://localhost:3000/products/{handle}`.
2. Verify:
   - Product title is correct.
   - Price is displayed in INR (₹ symbol).
   - Product image loads.
   - Product description is present (may be placeholder).
   - SKU is visible (or accessible in page source).
   - Add to cart button is present and enabled.
3. Repeat for 3 products across different categories.

**Pass criteria:**
- PDP renders without 404 or 500 errors.
- All 3 tested PDPs show correct title, price, and image.
- Add to cart button is present.

**Fail criteria:**
- PDP shows wrong product data.
- Price missing, in wrong currency, or incorrect.
- Image fails to load.
- Server error on PDP route.

---

### P0.6 Add to Cart Works

**Objective:** Customer can add a product to cart through the storefront.

**Method:**
1. From PDP, click "Add to Cart".
2. Verify cart state updates:
   - Cart contains 1 item with correct variant ID.
   - Cart quantity is 1.
   - Cart total matches product price.
3. Add same product again. Verify quantity becomes 2.
4. Add a different product. Verify cart contains 2 line items.
5. Verify cart persists across page navigation (navigate to home, return to cart).
6. Verify cart total calculation: sum of (price × quantity) for all items.

**Pass criteria:**
- "Add to Cart" creates/updates Medusa cart correctly.
- Cart persists between page loads (Medusa cart ID stored in cookie/session).
- Cart totals are correct.
- Multiple line items work.

**Fail criteria:**
- Add to cart returns an error.
- Cart does not persist across navigation.
- Cart totals are wrong.
- Cannot add multiple items.

---

### P0.7 Checkout Shell Starts

**Objective:** Customer can reach a checkout form from cart.

**Method:**
1. Navigate to cart with items.
2. Click "Proceed to Checkout".
3. Verify checkout page renders with:
   - Customer information form (name, email, phone).
   - Shipping address form (address, city, state, pincode).
   - Shipping method selection.
   - Payment method selection.
   - Order summary (items, totals).
4. Enter test customer data.
5. Select shipping method.
6. Proceed to payment step.

**Pass criteria:**
- Checkout page loads without errors.
- All required forms are present and functional.
- Order summary shows correct items and totals.
- Can proceed from customer info to shipping to payment.

**Fail criteria:**
- Checkout page fails to render.
- Forms missing or non-functional.
- Cannot advance past checkout stages.

---

### P0.8 Medusa Order Can Be Created

**Objective:** A complete order can be created through Medusa's checkout workflow.

**Method:**
1. Use manual/test payment method (no Razorpay for this test — prove the commerce record first).
2. Complete checkout: customer info → shipping → payment → place order.
3. Verify Medusa creates an order with:
   - Correct line items (matching cart).
   - Correct customer data.
   - Correct shipping address.
   - Correct order total (items + shipping - discounts).
   - Correct payment status (pending or awaiting for test payment).
4. Verify order can be retrieved via Store API: `GET /store/orders/{id}`.
5. Verify order appears in Medusa admin.

**Pass criteria:**
- Order is created in Medusa with correct total, line items, customer, and address.
- Order is retrievable via Store API.
- Order appears in admin.

**Fail criteria:**
- Order creation fails.
- Order totals are incorrect.
- Line items do not match cart.
- Customer/address data is missing or wrong.
- Order not visible in admin.

---

### P0.9 Order Totals Are Correct

**Objective:** Verify mathematical accuracy of order pricing.

**Method:**
1. Create a cart with 1 product at ₹199.
2. Complete order. Verify:
   - `total` = ₹199 (item) + shipping (if any) - discounts (if any).
3. Create a cart with 3 products at different prices (e.g., ₹199 + ₹149 + ₹225 = ₹573).
4. Complete order. Verify:
   - `subtotal` = ₹573.
   - `shipping_total` = correct amount.
   - `total` = subtotal + shipping_total.
   - No hidden fees.
5. Compare Medusa order total against expected manual calculation.

**Pass criteria:**
- Order totals match manual calculations for single-item and multi-item orders.
- Subtotal, shipping, discount, and total fields are internally consistent.
- No hidden or missing charges.

**Fail criteria:**
- Order totals do not match expected values.
- Subtotal + shipping ≠ total.
- Missing or extra charges.

---

### P0.10 Inventory Decrements Correctly

**Objective:** Verify sellable inventory decreases after order creation.

**Note:** This test acknowledges that Medusa's default inventory behavior may need plugin or configuration. The spike must document the approach taken.

**Method:**
1. Before order: note `inventory_quantity` for a test variant (expected: 10).
2. Complete an order containing that variant.
3. After order: query `GET /store/products/{id}` or admin API.
4. Verify `inventory_quantity` has decremented by the ordered quantity.
5. If inventory does NOT decrement, document:
   - Whether this is a Medusa configuration issue (can be fixed).
   - Whether this requires a plugin (e.g., `medusa-plugin-inventory` or `medusa-inventory` module).
   - Whether this is a fundamental limitation of the current setup.

**Pass criteria for spike:**
- Inventory decrements after paid order is created.
- OR: The spike clearly documents the inventory approach, what is blocked, and what work is needed before launch.

**Fail criteria for spike:**
- Inventory does not decrement AND the path to fix it is unclear.
- Inventory state is inconsistent between Store API and admin.

---

### P0.11 Airtable Receives One Order Record Per Medusa Order

**Objective:** Prove that a Medusa order creates exactly one Airtable ops record.

**Method:**
1. Complete a Medusa order (paid or test payment).
2. Verify sync function fires (e.g., Medusa event subscriber, worker, or manual trigger).
3. Check Airtable test base for the order record.
4. Verify:
   - Exactly 1 record exists with the Medusa order ID.
   - Fields mapped correctly per `integrations/airtable/order-field-map.md`:
     - Medusa Order ID matches.
     - Customer Name matches.
     - Order Total matches.
     - SKU List contains correct items.
     - Payment Status matches.
     - Ops Status is blank or default.
   - No duplicate records with the same Medusa order ID.

**Pass criteria:**
- One Medusa order = one Airtable record.
- All mirrored fields match Medusa source data.
- No duplicates.

**Fail criteria:**
- No Airtable record created.
- Multiple Airtable records for one Medusa order.
- Mirrored fields are incorrect (wrong total, wrong customer, etc.).

---

### P0.12 Airtable Sync Is Idempotent

**Objective:** Re-running sync does not duplicate the Airtable record.

**Method:**
1. Trigger sync for a Medusa order that was already synced (re-run subscriber, re-trigger worker).
2. Check Airtable for that Medusa order ID.
3. Verify: still exactly 1 record. The existing record was updated (not duplicated).
4. If the sync is event-driven (not replayable), simulate a webhook retry scenario: same Medusa order, second event.
5. Verify idempotency holds.

**Pass criteria:**
- Re-running sync does not create a second Airtable record.
- Idempotency key (Medusa order ID) works correctly.
- Retry scenario does not produce duplicates.

**Fail criteria:**
- Re-running sync creates a duplicate Airtable record.
- Idempotency check fails or is missing.
- Retry produces inconsistent state.

---

### P0.13 GA4 Ecommerce Events Fire with SKU Data

**Objective:** Verify `view_item`, `add_to_cart`, `begin_checkout`, and `purchase` events fire correctly.

**Method:**
1. Set up GA4 test property with DebugView open.
2. Enable debug mode in browser (install GA4 DebugView Chrome extension or set `?gtm_debug=x`).
3. Navigate to a PDP. Verify `view_item` fires with:
   - `items[].item_id`: Medusa variant SKU.
   - `items[].item_name`: Product title.
   - `items[].price`: Correct INR price.
   - `currency`: "INR".
   - `value`: Product price.
4. Click "Add to Cart". Verify `add_to_cart` fires with same item data + `quantity`.
5. Go to cart. Verify `view_cart` fires (if implemented).
6. Begin checkout. Verify `begin_checkout` fires with cart value and items.
7. Complete a payment (Razorpay test). Verify `purchase` fires with:
   - `transaction_id`: Medusa order ID.
   - `value`: Order total.
   - `currency`: "INR".
   - `items[]`: All line items with correct SKU, price, quantity.

**Pass criteria:**
- All 4 core events (`view_item`, `add_to_cart`, `begin_checkout`, `purchase`) appear in GA4 DebugView.
- Each event has correct `items[]` array with SKU in `item_id`.
- `currency` is always "INR".
- `purchase` event has correct `transaction_id` and `value`.
- No JavaScript errors on event fire.

**Fail criteria:**
- Events missing from DebugView.
- Events fire but without SKU data in `items[]`.
- `transaction_id` is missing or incorrect in `purchase`.
- Currency is not INR.
- JavaScript errors prevent events from firing.

---

### P0.14 Razorpay Success Path Works

**Objective:** A Razorpay test payment creates a correct paid Medusa order.

**Method:**
1. Add product to cart.
2. Proceed to checkout, enter customer data, select shipping.
3. Select Razorpay payment method.
4. Complete Razorpay test payment:
   - Card: 4111 1111 1111 1111, expiry 12/25, CVV 100.
   - OR UPI: testmerchant@razorpay.
5. After payment, verify:
   - Razorpay dashboard shows payment as "captured" (not "authorized" only).
   - Razorpay webhook received and verified server-side.
   - Medusa order has payment status "captured" or "paid".
   - Medusa order total matches the Razorpay payment amount.
   - Storefront shows order confirmation page.
6. Verify amount mismatch rejection:
   - If possible, attempt to complete payment for a different amount than the order total.
   - Verify payment is rejected or flagged.

**Pass criteria:**
- Razorpay test payment succeeds.
- Razorpay dashboard shows captured payment.
- Medusa order payment state is correct.
- Order total matches payment amount.
- Amount mismatch is rejected.

**Fail criteria:**
- Payment fails with unclear error.
- Payment succeeds but webhook not received.
- Medusa order payment state does not update to captured/paid.
- Amount mismatch not detected.
- Payment state requires custom fragile hacks.

---

### P0.15 Razorpay Failure Path Does Not Create a False Paid Order

**Objective:** A failed Razorpay payment must not create a ready-to-fulfill order.

**Method:**
1. Add product to cart, proceed to checkout.
2. Select Razorpay payment.
3. Use failed payment method:
   - Card: 4000 0000 0000 0002 (Razorpay test failed card).
   - OR close the Razorpay checkout modal without completing.
4. Verify:
   - Payment fails with clear user-facing error message (not technical jargon).
   - Customer is returned to checkout (can retry).
   - Medusa order is NOT created with "paid" or "captured" status.
   - Airtable does NOT receive a ready-to-fulfill order record.
   - No false inventory decrement for unpaid order.
5. If Medusa creates the order in "pending" or "requires_action" state, verify that:
   - Order is clearly marked as not paid.
   - Order cannot proceed to fulfillment without payment confirmation.

**Pass criteria:**
- Failed payment does not create a paid Medusa order.
- Customer sees clear error and can retry.
- No false inventory decrement.
- Airtable does not get a fulfillment-ready record.

**Fail criteria:**
- Order created as "paid" despite failed payment.
- No error shown to customer.
- Inventory decremented for unpaid order.
- Airtable shows order as ready to fulfill.

---

### P0.16 Shiprocket Order/AWB Path Is Proven or Clearly Blocked

**Objective:** Determine whether Medusa orders can reach Shiprocket.

**Method:**
1. Authenticate with Shiprocket API using provided credentials.
2. Map a completed Medusa paid order to Shiprocket order payload:
   - Shipping address, customer info, SKU list, order value, payment method.
3. Attempt Shiprocket order creation via API.
4. If order creation succeeds:
   - Verify Shiprocket dashboard shows order with correct details.
   - Attempt AWB generation.
   - Attempt label PDF download.
   - Verify tracking number is assigned.
5. If order creation fails:
   - Document the exact API error.
   - Document what is missing or misconfigured.
   - Assign a confidence level for feasibility:
     - **High confidence:** API accessible, payload fields documented, blocker is config/auth only.
     - **Medium confidence:** API accessible, but payload mapping has gaps or unclear fields.
     - **Low confidence:** API inaccessible, auth fails, or required fields cannot be mapped.

**Pass criteria:**
- Shiprocket order created with correct Medusa order data.
- AWB generated and tracking number assigned.
- OR: High-confidence path documented with specific blockers.

**Fail criteria:**
- Shiprocket API authentication fails without resolution path.
- Payload mapping has unresolvable gaps.
- AWB/label generation requirements are unclear.
- COD/prepaid flags cannot be set correctly.

---

### P0.17 Admin Is Usable by a Non-Engineer

**Objective:** Dan must be able to perform daily operations through Medusa admin without CLI.

**Method:**
1. Give Dan access to Medusa admin URL with his credentials.
2. Ask Dan to perform (without engineering guidance):
   - Log in.
   - View the product list.
   - Search for a product by name.
   - View order details for a test order.
   - Update product inventory quantity.
   - Check payment status of an order.
3. Observe and document:
   - Can Dan complete each task without help?
   - Where does he get stuck or confused?
   - Does the admin UI make sense for a commerce operator?

**Pass criteria:**
- Dan can log in, view products, view orders, and check payment status without CLI.
- Basic operations do not require developer intervention.
- Admin navigation is intuitive enough for daily use.

**Fail criteria:**
- Dan cannot log in without CLI.
- Product or order views require command-line operations.
- Admin UI has confusing terminology or missing critical information.
- Inventory or order status updates require database queries.

---

## 9. P1 Tests — Must Fix Before Production Build

| ID | Test | Method | Pass criteria |
|---|---|---|---|
| P1.1 | Product search works | Search by name, SKU, partial match | Returns expected results |
| P1.2 | Category filtering works | Filter products by category | Only products in that category returned |
| P1.3 | Cart update and remove | Change quantity, remove item | Cart recalculates correctly |
| P1.4 | Coupon/discount code | Apply test coupon | Discount reflected in order total |
| P1.5 | Shipping method selection | Choose between available methods | Method applied to order correctly |
| P1.6 | Order confirmation page | After payment, confirmation loads | Shows order ID, items, total |
| P1.7 | Customer email capture | Order has customer email | Email stored and retrievable |
| P1.8 | Mobile viewport rendering | Test storefront on 375px width | No horizontal scroll, touch targets ≥44px |
| P1.9 | Loading/error states | Slow network, API failure | User sees spinner or error message, not blank page |
| P1.10 | Airtable sync retry | Simulate failed first sync attempt | Second attempt succeeds without duplicates |
| P1.11 | GA4 event parameters complete | All events have all required params | No missing item_id, price, currency |
| P1.12 | Razorpay UPI payment | Test UPI ID payment in Razorpay test mode | Payment succeeds, captured |
| P1.13 | Razorpay card payment | Test Visa and Mastercard test cards | Both succeed |
| P1.14 | Pincode serviceability check | Validate pincode endpoint if Shiprocket supports | Returns serviceable or not |
| P1.15 | Medusa admin order filtering | Filter orders by date, status, payment | Filters work correctly |

## 10. P2 Tests — Fix Within 7 Days of Production Build

| ID | Test | Method | Pass criteria |
|---|---|---|---|
| P2.1 | Multiple shipping addresses | Customer can change address during checkout | Address updates correctly |
| P2.2 | Order history | Customer can view past orders | Orders listed with correct data |
| P2.3 | Product variant selection | Product with multiple variants | Variant switch changes price/image |
| P2.4 | Image gallery on PDP | Multiple product images | Gallery navigable, all images load |
| P2.5 | 404 page | Visit non-existent route | User-friendly 404 page shown |
| P2.6 | Meta tags/SEO | Check page title, meta description, Open Graph | Present on PDP and collection pages |
| P2.7 | Admin bulk product edit | Update multiple products at once | Changes apply correctly |
| P2.8 | Export order data from admin | Export orders to CSV | File downloads with correct data |
| P2.9 | Integration log audit trail | Check integration_event_log table | Events logged with timestamps |

## 11. Test Data Requirements

| Data | Source | Quantity | Notes |
|---|---|---|---|
| Products | `data/spike-products-10-skus.csv` | 10 SKUs | Confirmed, stable SKUs only |
| Product images | Existing URLs or local assets | 10+ | May be placeholder for spike |
| Customer profiles | Created during test | 3+ | Different name, email, phone |
| Shipping addresses | Bangalore, Mumbai, Delhi | 3+ | Test pincodes |
| Test cards | Razorpay test card list | 3+ | Success, fail, UPI |
| Order set | Created during spike | 10+ | Mix of single and multi-item |
| Shiprocket test orders | Created during spike | 2+ | Prepaid and COD if possible |
| Airtable records | Created during spike | 5+ | Verify idempotency |

## 12. Product Import Validation

After import, validate each of the 10 SKUs against:

| Field | Source of truth | Check |
|---|---|---|
| SKU | CSV → Medusa variant.sku | Stable, matches catalog |
| Title | CSV → Medusa product.title | Correct spelling, no placeholders |
| Price | CSV → Medusa variant.prices[] | INR, correct amount |
| Image | URL → Medusa product.thumbnail | Loads, not broken |
| Category | CSV → Medusa product.categories[] | Correct collection assignment |
| Inventory | CSV → Medusa variant.inventory_quantity | 10 (test quantity) |
| Status | Medusa product.status | "published" (not "draft") |

## 13. Storefront Validation

| Route | Must render | Must fetch from | Must not show |
|---|---|---|---|
| `/` (home) | Product grid | Medusa Store API | Static/hardcoded product data |
| `/products/[handle]` | PDP with title, price, image, add to cart | Medusa Store API | Wrong SKU data |
| `/cart` | Line items, totals, quantity controls | Medusa Store API (existing cart) | Cart from Airtable or Supabase |
| `/checkout` | Forms, shipping selection, payment, summary | Medusa Store API | Hardcoded shipping options |
| `/order-confirmed` | Order ID, items, total | Medusa Store API | Data from non-Medusa sources |

**Rule:** Storefront reads from Medusa only. No direct Supabase reads for commerce data.

## 14. Cart Validation

| Test | Expected |
|---|---|
| Empty cart | Shows "Your cart is empty" message |
| Add single item | Cart contains 1 item, total = item price |
| Add different item | 2 line items, total = sum |
| Update quantity | Total recalculates, line item shows correct subtotal |
| Remove item | Item removed, total recalculated |
| Cart persists | Survives page navigation, survives browser tab close (if using cookies) |
| Cart totals | subtotal = sum of (price × qty), shipping = calculated, total = subtotal + shipping |

## 15. Order Creation Validation

| Aspect | Pass condition |
|---|---|
| Order ID | Unique, retrievable |
| Customer | Name, email, phone stored correctly |
| Shipping address | Full address, pincode, city, state stored correctly |
| Line items | SKU, title, quantity, unit price, total per item |
| Subtotal | Sum of line item totals |
| Shipping total | Matching selected shipping method |
| Discount total | Correct discount amount, if any |
| Total | subtotal + shipping - discount |
| Payment status | "pending", "captured", or "paid" (not "requires_action" for completed) |
| Fulfillment status | "not_fulfilled" (until Shiprocket integration) |
| Created at | Correct timestamp |

## 16. Airtable Sync Validation

| Test | Pass condition | Fail condition |
|---|---|---|
| New order sync | 1 Airtable record created with all mapped fields | No record, missing fields |
| Sync idempotency | Re-sync does not create duplicate | Duplicate record created |
| Failed payment sync | No fulfillment-ready Airtable record | Record shows order as ready |
| Field accuracy | All mirrored fields match Medusa | Any field mismatch |
| Ops status blank | Ops Status and QC Status are empty/null | Populated with incorrect defaults |
| Financial field protection | Order total, payment status not editable in Airtable | Editable (schema issue, flag and fix) |

**Idempotency test procedure:**
1. Create Medusa order → sync to Airtable → verify 1 record.
2. Trigger sync again (simulate webhook retry or re-run subscriber) → verify still 1 record.
3. Manually delete the Airtable record → trigger sync again → verify 1 new record (recreated).
4. If sync updates existing records: verify `last_modified` timestamp updates, no data loss.

## 17. GA4 Event Validation

| Event | Trigger | Must have | Must NOT have |
|---|---|---|---|
| `view_item` | PDP load | `items[].item_id` = SKU, `currency` = "INR", `value` = price | Missing item_id, wrong currency |
| `add_to_cart` | Add to cart click | Same as view_item + `items[].quantity` | Missing quantity |
| `view_cart` | Cart page load | `currency`, `value` (cart total), `items[]` | Missing items array |
| `begin_checkout` | Checkout start | `currency`, `value`, `items[]` | Missing transaction data |
| `purchase` | Order confirmation | `transaction_id` = order ID, `currency` = "INR", `value` = total, `items[]` | Missing transaction_id |

**Validation method per event:**
1. Open GA4 DebugView.
2. Perform triggering action on storefront.
3. Confirm event appears in DebugView within 5 seconds.
4. Expand event parameters and verify each required field.
5. Screenshot DebugView for evidence.

**Acceptable if missing during spike:** `view_collection`, `search`, `share`, `drop_signup`, `newsletter_signup`, `view_bundle` (custom events).

## 18. Razorpay Validation

| Test | Pass condition |
|---|---|
| Test mode authentication | Razorpay test key + secret work with API |
| Card payment (Visa) | 4111...1111 succeeds, payment captured |
| Card payment (Mastercard) | 5555...4444 succeeds, payment captured |
| UPI payment | testmerchant@razorpay succeeds |
| Failed card | 4000...0002 fails, order not marked paid |
| Payment modal open/close | Modal opens, can be closed without error |
| Webhook receipt | Razorpay webhook received by backend |
| Webhook signature verification | Webhook secret validates request |
| Payment capture status | Razorpay dashboard shows "captured" (not "authorized") |
| Amount match | Razorpay payment amount = Medusa order total |
| Payment ID stored | Razorpay payment ID stored in order metadata |
| Duplicate webhook | Second identical webhook does not change order state incorrectly |

**Critical test:** After payment, check Medusa admin → order detail → payment section. Payment status should show the correct state. If it shows "awaiting" or "requires_action" for a captured payment, that is a failure.

## 19. Shiprocket Validation

| Proof level | Test | Pass condition | Notes |
|---|---|---|---|
| Level 1 | API authentication | Shiprocket API returns 200 with valid token | Minimum acceptable if higher levels blocked |
| Level 1 | Pincode serviceability | 560001 returns serviceable couriers | Test 3 pincodes minimum |
| Level 2 | Create prepaid order | Shiprocket order created from Medusa order payload | Full address, items, value mapped correctly |
| Level 2 | Create COD order | COD order created with `payment_method: COD` | COD flag set correctly |
| Level 3 | AWB generation | Tracking number assigned | Proves full shipping path |
| Level 3 | Label generation | Label PDF downloadable | Required for ops workflow |
| Level 4 | COD + prepaid flags | Shiprocket order shows prepaid vs COD correctly | Payment method truth must flow correctly |

**Fallback for incomplete Shiprocket access:**
If Shiprocket API credentials are not available during the spike, document:
- Exact payload mapping from Medusa order to Shiprocket API.
- Known required fields and their Medusa sources.
- Authentication method documented from Shiprocket API docs.
- Any API constraints (rate limits, required pickup location, etc.).
- Confidence rating: High / Medium / Low based on available documentation.

**This is NOT a pass.** It is a documented risk assessment. The go/no-go decision must account for this gap.

## 20. Admin Usability Validation

| Task | Must be possible without... |
|---|---|
| Log in | CLI, terminal, database access |
| View product list | SQL queries, API calls |
| Search products by name | Developer assistance |
| View order details | Database access |
| Check order payment status | Razorpay dashboard cross-reference |
| Update inventory quantity | Code changes, database queries |
| Change product publish status | Developer intervention |
| View customer details | Separate system lookup |

**Admin usability scoring:**
- **Pass:** Dan can complete all listed tasks without assistance. Admin navigation is intuitive.
- **Marginal:** Dan needs basic training (30-minute walkthrough) but can work independently after.
- **Fail:** Dan needs developer help for daily tasks, or admin requires CLI/terminal access.

**Test procedure:** Sit with Dan (or observe remotely). Give him the admin URL and credentials. Ask him to perform the list above. Document every moment of confusion or friction. Do NOT help him unless he is stuck for more than 2 minutes — and document that stuck point.

## 21. Deployment Feasibility Validation

| Question | Assessment |
|---|---|
| Medusa backend deploy target chosen? | Render / Fly.io / Railway / AWS |
| Supabase Postgres accessible from deploy target? | Network/security group config needed? |
| Environment variables manageable? | How many? Any secrets rotation concerns? |
| Webhook URLs configurable post-deploy? | Razorpay and Shiprocket need stable URLs |
| Migrations run on deploy? | Automated or manual? |
| Redis required for production? | If yes, cost and management overhead? |
| File storage for product images? | Supabase Storage or S3? Migration path? |
| Storefront deploy target? | Vercel (confirmed? any blockers?) |
| Custom domain setup? | DNS, SSL, redirects documented? |
| Deploy rollback procedure? | Can you revert a broken deploy in <15 minutes? |
| Monitoring/logging? | Any observability in place? |
| Cost estimate per month? | Supabase, host, Redis, storage, Vercel |

**Pass criteria for spike:**
- At least one viable deploy path identified for Medusa backend.
- Supabase Postgres connectivity works from the chosen deploy target (tested or high confidence).
- Environment variable strategy is clear.
- Webhook URLs are addressable (ngrok for dev, real URL for staging).
- Vercel deployment for storefront is proven (or trivially inferred from existing projects).
- Rollback path exists or is straightforward.

**Fail criteria:**
- No viable deploy target identified.
- Supabase connectivity from deploy target is uncertain.
- Environment variables require manual intervention for every deploy.
- Webhooks require engineering to update URLs.
- Deployment cost is >₹5,000/month without clear budget.

## 22. Source-of-Truth Enforcement Tests

These tests verify that no system oversteps its source-of-truth boundaries.

| Test | What it verifies | Pass condition |
|---|---|---|
| Storefront reads product from Medusa API, not Supabase | Storefront correctly connected | No direct Supabase product queries in storefront code |
| Order total from Airtable = Order total from Medusa | Airtable mirrors, does not own | Values match; if different, Medusa is truth |
| Payment status from Airtable = Payment status from Razorpay | Airtable mirrors payment truth | Values match; if different, Razorpay is truth |
| Changing Airtable total field does not change Medusa order | No writeback | Medusa order total unchanged after Airtable edit |
| Cart exists only in Medusa, not in Airtable | No cart in Airtable | Airtable has no cart records |
| Inventory truth is Medusa, not Airtable | Inventory not in Airtable | Airtable has no inventory fields being used for commerce |

## 23. Failure Thresholds

### Immediate "Do Not Proceed" (Any One)

| Condition | Why |
|---|---|
| Payment state cannot be reconciled cleanly between Razorpay and Medusa | Can't ship unpaid orders, can't hold payment truth |
| Medusa order totals are mathematically wrong | Can't charge customers incorrectly |
| Airtable sync creates duplicate or conflicting records | Ops loses trust in system, manual cleanup needed |
| Airtable sync writes financial data back to Medusa | Multiple systems become competing truth |
| Shiprocket AWB/label generation impossible | Can't ship products, no fulfillment path |
| Shiprocket COD flag cannot be set correctly | COD is 40-60% of expected orders |
| Supabase connection/churn unstable under repeated checkout | Production checkout will fail unpredictably |
| Medusa admin requires CLI for daily operations | Dan cannot run the business, blocked on engineering |
| GA4 purchase event does not fire | Cannot track revenue, conversion, or funnel |
| Inventory decrements before payment capture | Risk of overselling on failed payments |
| Deployment path requires >30 minutes engineering per deploy | Cannot iterate or fix production issues quickly |

### "Conditional Proceed" Thresholds

Allow if ALL P0 pass and:
- Razorpay works with a documented limitation (e.g., no UPI in test mode but confirmed in docs).
- Shiprocket path is high-confidence but not tested end-to-end (API access was delayed).
- Airtable sync works but has a minor field mapping gap.
- Admin is marginal but fixable with training or configuration.
- Deployment path needs one more decision (choose host, DNS setup).
- GA4 events work but have parameter gaps that are tracked.

### "Proceed" Thresholds

ALL of:
- Commerce spine works (Medusa + Supabase + storefront + order).
- Payment path is clean (Razorpay success + failure + webhook + reconciliation).
- Ops sync is clean (Airtable idempotent, correct, no writeback).
- Shipping path is proven (Shiprocket order + AWB + labels).
- Admin is usable by non-engineer.
- Deployment path is clear and under ₹5,000/month.
- GA4 events are firing correctly.
- No unresolved P0 or P1 issues.

## 24. Final Go/No-Go Decision Format

At the end of Phase 0 spike testing, produce this decision document:

---

# QA Recommendation

Recommendation: **[Proceed / Conditional Proceed / Do Not Proceed]**

## Evidence Summary

| Area | Status | Evidence | Risk |
|---|---|---|---|
| Medusa + Supabase |  |  |  |
| Product import |  |  |  |
| Storefront |  |  |  |
| Cart/order |  |  |  |
| Airtable sync |  |  |  |
| GA4 |  |  |  |
| Razorpay |  |  |  |
| Shiprocket |  |  |  |
| Admin usability |  |  |  |
| Deployment |  |  |  |

## Bloquers

[List every P0 failure with specific evidence. If none, state "No P0 blockers."]

## Required Fixes Before Launch

[If Conditional Proceed: list each condition with owner and effort estimate.]
[If Proceed: list P1 items and P2 log.]
[If Do Not Proceed: this section is moot.]

## Fynd Comparison

| Factor | Medusa + Supabase | Fynd (Commerce.com) |
|---|---|---|
| Time to launch |  |  |
| Payment integration |  |  |
| Shipping integration |  |  |
| Admin usability |  |  |
| Ops workflow (Airtable) |  |  |
| Engineering ownership |  |  |
| Deploy/DevOps burden |  |  |
| Flexibility post-launch |  |  |
| Monthly cost |  |  |
| India-specific readiness |  |  |
| Launch risk (estimated) |  |  |

## Final CTO Gate Input

### Summary

[1-2 paragraphs. Brutal honesty. No hedging.]

### My Recommendation

```
[PROCEED] / [CONDITIONAL PROCEED — conditions below] / [DO NOT PROCEED]
```

### Conditions (if Conditional Proceed)

1. [Condition 1 with owner and deadline]
2. [Condition 2 with owner and deadline]
3. [Condition 3 with owner and deadline]

### Sign-Off

```
QA Lead: James
Date: [DATE]
Status: [PASS / CONDITIONAL PASS / BLOCKED]

This document certifies that Phase 0 technical spike testing is complete.
The recommendation above is my professional assessment as launch-gate owner.
Dan must accept this recommendation in writing before Phase 1 begins.
```

---

## 25. Brutal Honesty Reminder

If you are reading this and considering a "Conditional Proceed" when a P0 test is failing, stop. Reread section 23. The thresholds are there for a reason.

**Fynd is not a failure.** It is a pragmatic choice. TPL can revisit Medusa after launch when there is revenue, sharper ops requirements, and less time pressure.

**Medusa is not a victory.** It is a bet on long-term flexibility. If the spike proves it is not ready, the correct answer is "not yet," not "try harder."

**This document is James's authority.** Dan cannot flip the go-live switch without James's written sign-off. That authority applies to Phase 0 just as it applies to production launch.
