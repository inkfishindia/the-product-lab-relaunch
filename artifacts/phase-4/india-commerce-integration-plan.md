<!-- last-updated: 2026-06-11 -->
# India Commerce Integration Plan — Medusa v2

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build |
| **Producing Agent** | Tobi (Frontend Build Lead) |
| **Date** | 2026-06-11 |
| **Status** | draft — implementation complete, pending key verification |
| **Reviewer** | Harley |

## Build Status (2026-06-11 update)

| Integration | Plan Status | Build Status | Notes |
|-------------|------------|--------------|-------|
| Razorpay plugin evaluation | Planned | DONE | No v2 plugin exists on npm — custom provider built |
| Razorpay payment provider | Planned | BUILT — dormant | `src/modules/razorpay-payment/` — active when keys set |
| Razorpay webhook route | Planned | BUILT — dormant | `src/api/store/razorpay-webhook/route.ts` |
| `/store/razorpay-verify` route | Not planned (missed) | NOT BUILT | Needed for Razorpay go-live — 1-2h task when keys arrive |
| COD payment provider | Planned | BUILT — active | `src/modules/cod-payment/` — fully functional now |
| COD ₹299 validation endpoint | Planned | BUILT — active | `src/api/store/validate-payment-method/route.ts` |
| Prepaid ₹30 discount apply | Planned | BUILT — active | `src/api/store/prepaid-discount/route.ts` |
| Prepaid ₹30 discount remove | Planned | BUILT — active | `src/api/store/prepaid-discount-remove/route.ts` |
| Tax module (18% GST) | Planned | CONFIGURED | In medusa-config.ts; rate seeded via seed-shipping.ts |
| Shipping options (D-006 rules) | Planned | SEEDED | `src/scripts/seed-shipping.ts` — run after seed:tpl |
| Checkout rewrite | Planned | BUILT | `storefront/src/app/checkout/checkout-client.tsx` |
| Cart free shipping nudge | Planned | BUILT | `storefront/src/app/cart/cart-client.tsx` |
| Shiprocket subscriber | Planned | BUILT — dormant | `src/subscribers/shiprocket-sync.ts` — active when creds set |
| medusa-config.ts update | Planned | DONE | Payment + tax modules registered |
| .env.template | Planned | DONE | All new vars documented |
| Go-live handoff | Planned | DONE | `handoffs/2026-06-11-tobi-go-live-wiring.md` |

**COD path: E2E-testable now.** No external credentials required.
**Razorpay path: dormant** until `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET` set in `.env` + `/store/razorpay-verify` route built.
**Shiprocket: dormant** until `SHIPROCKET_EMAIL`/`SHIPROCKET_PASSWORD` set in `.env`.



---

## Situation Assessment

This plan is grounded in the actual state of the Medusa v2 backend as it exists today. Before planning, here is what the code says:

**medusa-config.ts (current):** The config is a bare-minimum stub. It sets database URL, CORS configs, and JWT/cookie secrets. There is no `modules` array, no `providers` array, no payment provider registered beyond the platform default, no tax module, no fulfillment provider, and no shipping options configured. Admin UI is disabled.

**package.json (current):** Medusa v2.15.3 is installed. The only Medusa packages present are `@medusajs/admin-sdk`, `@medusajs/cli`, `@medusajs/core-flows`, `@medusajs/framework`, and `@medusajs/medusa`. There is no Razorpay plugin, no Shiprocket plugin, no India-specific tax package, and no third-party payment or fulfillment provider of any kind.

**checkout-client.tsx (current):** The checkout flow collects contact details, shipping address, and shipping method selection, then calls `sdk.store.cart.complete(cartId)` directly. There is an explicit comment in the UI: "No payment yet — using temporary test payment". There is no payment step, no payment session initialization, no Razorpay SDK load, and no webhook handling.

**Conclusion:** The India commerce layer is entirely unbuilt. Every integration below is net-new work.

---

## Integration 1: Razorpay Payments (P0.1 / P0.2)

**Classification: Custom-code (high risk)**

### 1a. Plugin situation

As of mid-2026, there is no maintained, production-ready Medusa v2 (v2.x) Razorpay payment provider plugin in the official Medusa plugin registry. The `medusa-payment-razorpay` package that exists targets Medusa v1 and is not compatible with the v2 module system. A community port exists (`medusa2-payment-razorpay` or similar) but its maintenance status is uncertain and it has not been through Medusa team review.

**Decision required:** Either (a) audit the community v2 port and accept the risk of an unmaintained dependency in the payment path, or (b) write a custom payment provider module. Option (b) is more work upfront (estimated 8–12h vs 2–4h to evaluate and wire a community port) but gives full control over the code path. Given that payments are P0 and a broken payment provider breaks the entire store, the recommendation is to write the custom provider unless the community port can be verified functional on v2.15.x within a 2-hour evaluation window.

**Riskiest unknown in this entire plan:** Whether a working v2 Razorpay provider exists or must be written. This should be the first thing Dan verifies before any other build work begins — search `medusa2-payment-razorpay` on npm and GitHub, check last commit date and issues, test install against v2.15.3.

### 1b. Medusa-side work

**If writing a custom payment provider module:**

Create `backend/medusa/src/modules/razorpay-payment/index.ts` implementing the `AbstractPaymentProvider` interface from `@medusajs/framework/utils`. The provider must implement:

- `initiatePayment(context)` — Create a Razorpay order via the Razorpay REST API (`POST /v1/orders`). Return `{ id: razorpay_order_id, amount, currency }`. Store `razorpay_order_id` in the payment session data.
- `authorizePayment(paymentSessionData, context)` — Verify the payment signature from the Razorpay callback. Razorpay sends `razorpay_payment_id`, `razorpay_order_id`, and `razorpay_signature`. Validate HMAC-SHA256 signature using the key secret. If valid, return `{ status: "authorized" }`.
- `capturePayment(payment)` — For card/UPI, Razorpay auto-captures by default if the order is created with `payment_capture: 1`. This method can be a no-op or call `POST /v1/payments/{id}/capture` for manual capture setups.
- `cancelPayment(payment)` — Call Razorpay refund API if payment was captured.
- `refundPayment(payment, refundAmount)` — Call `POST /v1/payments/{id}/refund`.
- `getPaymentStatus(payment)` — Fetch payment status from Razorpay `GET /v1/payments/{id}`.
- `deletePayment(paymentSessionData)` — No-op or cancel Razorpay order.

Register the provider in `medusa-config.ts`:

```typescript
modules: [
  {
    resolve: "@medusajs/payment",
    options: {
      providers: [
        {
          resolve: "./src/modules/razorpay-payment",
          id: "razorpay",
          options: {
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
            webhook_secret: process.env.RAZORPAY_WEBHOOK_SECRET,
          },
        },
      ],
    },
  },
],
```

**Webhook subscriber:** Create `backend/medusa/src/subscribers/razorpay-webhook.ts`. Razorpay sends `payment.authorized`, `payment.failed`, `payment.captured` events via POST to a webhook URL you register in the Razorpay dashboard. The subscriber must:
1. Verify the `X-Razorpay-Signature` header using HMAC-SHA256 with the webhook secret.
2. On `payment.authorized` or `payment.captured`: update the Medusa payment session to authorized/captured state via `PaymentModuleService`.
3. On `payment.failed`: mark payment as failed, allowing the cart to retry.

Expose the webhook via a custom API route: `backend/medusa/src/api/store/razorpay-webhook/route.ts`.

**Seed/region setup:** After the provider is wired, run `medusa exec` to create a payment collection in the India region and associate the Razorpay provider with it. Alternatively do this via the admin API.

### 1c. Storefront-side work

The checkout flow needs a complete rewrite of the payment step. The current `cart.complete()` call must be replaced with a proper payment flow:

1. **Initiate payment session:** After shipping is selected, call `sdk.store.payment.initiatePaymentSession(cartId, { provider_id: "razorpay" })`. This triggers `initiatePayment` on the backend and returns a `razorpay_order_id`.
2. **Load Razorpay checkout.js:** `<script src="https://checkout.razorpay.com/v1/checkout.js">` loaded dynamically when the payment step renders.
3. **Open Razorpay modal:** Call `new Razorpay({ key: RAZORPAY_KEY_ID, order_id: razorpay_order_id, amount, currency: "INR", handler: onPaymentSuccess, ... }).open()`.
4. **On payment success:** The `handler` callback receives `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature`. POST these to the backend payment webhook or a dedicated verify endpoint, which calls `authorizePayment`.
5. **Complete cart:** Only after payment authorization succeeds, call `sdk.store.cart.complete(cartId)`.

The storefront also needs to handle the COD path (see Integration 2) — COD should show as a payment option that skips the Razorpay modal entirely.

**Test mode vs live mode:** Razorpay uses separate key pairs for test and live. Test keys (`rzp_test_*`) allow test card transactions without real money. Live keys (`rzp_live_*`) are used after KYC verification in the Razorpay dashboard. The `.env` file should have `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` set to test keys during development. Dan switches these to live keys at launch. The storefront needs `NEXT_PUBLIC_RAZORPAY_KEY_ID` (public, safe to expose) — the key secret must never go to the browser.

### 1d. Credentials Dan must provide

- Razorpay Test Key ID (`rzp_test_...`)
- Razorpay Test Key Secret
- Razorpay Live Key ID (`rzp_live_...`) — needed only at launch
- Razorpay Live Key Secret — needed only at launch
- Razorpay Webhook Secret (set in Razorpay dashboard when registering the webhook URL)

### 1e. How to test

1. With test keys, open checkout, select UPI or card.
2. Razorpay modal opens. Use test card `4111 1111 1111 1111` (Visa) or UPI `success@razorpay`.
3. Verify Razorpay dashboard shows the payment as captured.
4. Verify Medusa order is created with `payment_status: captured`.
5. Test failure: use card ending `0000` — payment should fail gracefully, cart remains open.
6. Test webhook delivery using Razorpay's webhook simulator in the dashboard.

**Effort:** 8–12h (custom provider) or 2–4h (community port, if verified working) + 3h storefront rewrite. Total: 11–15h.

---

## Integration 2: COD with ₹299 Minimum (P0.8)

**Classification: Custom-code (moderate complexity)**

### 2a. Medusa-side work

COD in Medusa v2 is implemented as a payment provider, same as Razorpay. Create a `cod-payment` module at `backend/medusa/src/modules/cod-payment/index.ts`. This is a simple provider:

- `initiatePayment()` — No-op. Returns `{ status: "pending" }`.
- `authorizePayment()` — Immediately returns `{ status: "authorized" }`. COD is "authorized" at order placement, collected on delivery.
- `capturePayment()` — Returns `{ status: "captured" }`. Mark as captured when Shiprocket confirms COD remittance (manual step or webhook from Shiprocket).
- All other methods are stubs returning success.

Register alongside Razorpay in `medusa-config.ts`.

**The ₹299 minimum:** This is a business rule from D-006. Medusa does not have a native "minimum order value per payment method" concept. The rule must be enforced in two places:

- **Storefront gate (UX layer):** In `checkout-client.tsx`, compute the cart total in INR. If the total is below ₹299, do not render the COD radio button — render a tooltip instead: "COD available on orders ₹299 and above." This is the primary enforcement point that the customer sees.
- **Server validation (integrity layer):** Create a custom API route `POST /store/validate-payment-method` that checks: if `provider_id === "cod"` and `cart.total < 29900` (Medusa stores amounts in paise), return a 400 error with message. Call this from the storefront before completing the cart. This prevents a crafty client from bypassing the frontend gate.

### 2b. Storefront-side work

The payment method selector component needs to:

1. Show "Razorpay (UPI / Cards)" as always-available option.
2. Show "Cash on Delivery" conditionally: only when `cart.total >= 29900` (₹299 × 100 paise).
3. When COD is selected: skip the Razorpay modal, call the server validation endpoint, then call `cart.complete()`.
4. Display "COD handling fee: ₹30" as a visible line item on COD orders (D-006, per Raj's recommendation in cod-strategy.md). This requires adding a fee to the cart — implement as a line item adjustment or a shipping option surcharge.

### 2c. Credentials needed

None beyond Razorpay credentials already listed.

### 2d. How to test

1. Add a ₹249 product to cart. Verify COD option does not appear.
2. Add a ₹499 product to cart. Verify COD option appears.
3. Attempt to POST a COD payment request with a sub-₹299 cart directly to the API. Verify 400 response.
4. Complete a COD order. Verify order created in Medusa with `payment_status: pending` (expected — payment collected on delivery).

**Effort:** 3–4h (COD provider + storefront gate + server validation).

---

## Integration 3: Prepaid ₹30 Discount (P0.9)

**Classification: Custom-code (low-moderate complexity)**

### 3a. Medusa-side work

The ₹30 discount for prepaid orders (UPI/card, not COD) per D-006.

Medusa v2 has a promotion/discount module. The simplest correct approach is a programmatic promotion that is auto-applied, not a coupon code. Create a promotion via the admin API or a seed script:

```
Type: automatic
Scope: order
Condition: payment method is NOT cod (this condition is not natively supported in Medusa's promotion engine)
```

The problem: Medusa's built-in promotion conditions do not filter by payment provider. Payment method is not a promotion eligibility criterion in the standard module.

**Recommended approach: custom cart line item adjustment.** After the customer selects a prepaid payment method (Razorpay), before completing the cart, the storefront calls a custom endpoint `POST /store/apply-prepaid-discount` which:
1. Reads the cart.
2. Verifies the selected payment provider is `razorpay` (not `cod`).
3. Applies a negative line item adjustment of ₹30 (3000 paise) to the cart using `CartModuleService.addLineItemAdjustments`.
4. If the customer switches to COD, call `POST /store/remove-prepaid-discount` to remove the adjustment.

Create these two endpoints in `backend/medusa/src/api/store/prepaid-discount/route.ts`.

**The discount must not apply to COD:** The server endpoint checks `provider_id !== "cod"` before applying. The storefront calls remove-discount immediately when the user selects COD.

### 3b. Storefront-side work

In `checkout-client.tsx`:
- When user selects "Razorpay" as payment method: call `apply-prepaid-discount`. Show "Prepaid discount: -₹30" in the order summary.
- When user selects "COD": call `remove-prepaid-discount`. Remove the discount line from the summary.
- Show the discount prominently: "You save ₹30 by paying online."

### 3c. Credentials needed

None. This is internal Medusa logic.

### 3d. How to test

1. Add ₹499 product. Select Razorpay. Verify order total shows ₹469 with -₹30 adjustment.
2. Switch to COD. Verify order total returns to ₹499.
3. Complete prepaid order. Verify Medusa order has the ₹30 adjustment in line items.
4. Complete COD order. Verify no adjustment on the order.

**Effort:** 2–3h.

---

## Integration 4: ₹499 Free Shipping Rule (P0.7)

**Classification: Config + minor custom-code**

### 4a. Current state

Medusa's shipping option system supports price rules. The India region currently has no shipping options configured — the storefront shows the shipping options list but it is empty unless Dan has seeded shipping options. The `checkout-client.tsx` calls `sdk.store.fulfillment.listCartOptions({ cart_id: cartId })` and renders whatever comes back, including a ₹0 "Free Shipping" option if one was seeded without a minimum.

### 4b. Medusa-side work

Configure two shipping options for the India region via seed script or admin API:

**Option 1: Standard Shipping (₹50)**
- Name: "Standard Shipping"
- Amount: 5000 (paise, = ₹50)
- Price type: flat_rate
- Condition: cart subtotal < 49900 (< ₹499)

**Option 2: Free Shipping**
- Name: "Free Shipping"
- Amount: 0
- Price type: flat_rate
- Condition: cart subtotal >= 49900 (>= ₹499)

Medusa v2's shipping option price rules support `cart_subtotal` conditions natively via the fulfillment module. Create a seed script at `backend/medusa/src/scripts/seed-shipping.ts` that creates these options in the India region and region's fulfillment set.

**Important:** The D-006 rule is: free shipping at ₹499+, flat ₹50 for ₹299–498. There is no mention of a rate below ₹299 because COD minimum is ₹299 and the brand doesn't target sub-₹299 orders. However, someone could add a ₹149 item to cart with prepaid. The ₹50 flat rate should apply for all sub-₹499 orders regardless, for simplicity.

### 4c. Storefront-side work

The current shipping option selector in `checkout-client.tsx` already renders whatever options are returned. Once the correct options are seeded with price rules, Medusa will only return the applicable option given the cart total. The display will automatically show the correct option.

Add one UX improvement: in the cart summary, show a progress bar or text nudge. "Add ₹X more for free shipping" when the cart is between ₹0 and ₹498. This is a standard ecommerce pattern. Implement in `cart-client.tsx` by comparing cart total to 49900.

### 4d. Credentials needed

None. This is internal Medusa config.

### 4e. How to test

1. Cart with ₹249 item: verify only "Standard Shipping ₹50" appears in checkout.
2. Cart with ₹499 item: verify only "Free Shipping ₹0" appears.
3. Cart with ₹498 item: verify "Standard Shipping ₹50" (boundary test).
4. Cart with ₹499 item: verify "Free Shipping" (boundary test).

**Effort:** 2–3h (seed script + storefront nudge).

---

## Integration 5: GST 18% Tax (P0.10)

**Classification: Config (low complexity) with GSTIN-on-invoice caveat**

### 5a. Medusa-side work

Medusa v2 includes a tax module (`@medusajs/tax`). It is not currently configured in `medusa-config.ts`. To enable GST:

Add to `medusa-config.ts`:

```typescript
modules: [
  // ... (alongside payment modules)
  {
    resolve: "@medusajs/tax",
    options: {
      providers: [
        {
          resolve: "@medusajs/tax-system-provider", // built-in flat-rate provider
          id: "system",
        },
      ],
    },
  },
],
```

Then configure the tax rate for the India region. In Medusa v2 this is done via the admin API or a seed script:

1. Create a tax region for India (country code `IN`).
2. Add tax rate: name "GST", rate 18, is_inclusive: false (GST is typically shown as added-on for B2C in India, though inclusive is also valid — confirm with Patrick/Tony on invoice format).
3. All products in the India region will have 18% GST applied automatically to the subtotal.

**GSTIN on invoice:** GSTIN `29APFPH6495C1ZP` must appear on every invoice/order confirmation. Medusa's built-in order invoice template does not include a custom seller GSTIN field. Two approaches:

- **Simple approach:** Add the GSTIN as static text to the email template in Klaviyo/Mailchimp order confirmation. No code change to Medusa itself. This is the simplest correct implementation for a solo operator.
- **Formal approach:** Create a custom order invoice PDF using a library like PDFKit or use a GST-compliant invoice service (e.g., Zoho Invoice or Vyapar). This is Phase 6 scope, not launch scope.

**Recommendation:** Simple approach for launch. GSTIN in email footer. Formal GST invoice system after Day 30 review.

### 5b. Storefront-side work

Once tax is configured in Medusa, `cart.tax_total` will be populated. Update the checkout order summary to show:
- Subtotal: ₹X
- GST (18%): ₹Y  
- Shipping: ₹Z
- **Total: ₹A**

This is a display-only change. The API already computes tax correctly once the module is configured.

### 5c. Credentials needed

None. GSTIN `29APFPH6495C1ZP` is already known and goes into the email template as static text.

### 5d. How to test

1. Add any product to cart. Verify `cart.tax_total` is populated at 18% of subtotal.
2. Verify order confirmation email shows GSTIN in footer.
3. Check that tax line appears in checkout summary.

**Effort:** 2–3h (tax module config + seed script + storefront display + email template update).

---

## Integration 6: Shiprocket Order Sync (P0.3)

**Classification: Custom-code (moderate complexity)**

### 6a. Plugin situation

There is no official or maintained Medusa v2 Shiprocket plugin. This must be a custom integration.

### 6b. Medusa-side work

**Event subscriber approach (recommended):** Medusa v2 has an event system. When an order is placed, Medusa emits `order.placed`. Create a subscriber at `backend/medusa/src/subscribers/shiprocket-sync.ts`:

```typescript
// On order.placed event:
// 1. Fetch the full order from Medusa (items, shipping address, payment method)
// 2. Determine COD vs prepaid from order.payment_collections[0].payment_provider_id
// 3. POST to Shiprocket API: POST https://apiv2.shiprocket.in/v1/external/orders/create/adhoc
//    with order details, pickup location, payment_method: "COD" or "Prepaid"
// 4. Store Shiprocket order ID and AWB number in order metadata
// 5. On error: log to console and send alert (email or Slack webhook) — do NOT block order completion
```

**Shiprocket API auth:** Shiprocket uses email+password to get a JWT token (`POST /v1/external/auth/login`). This token expires every 24 hours. The subscriber must handle token refresh. Store the token in a simple in-memory cache with expiry — fine for a single-instance server (D-012 is solo operator, no clustering needed).

**COD vs prepaid flag:** Read `order.payment_collections[0].payment_provider_id`. If `"cod"`, set Shiprocket `payment_method: "COD"`. If `"razorpay"`, set `payment_method: "Prepaid"`. This is the critical flag for Shiprocket remittance routing.

**Webhook from Shiprocket (optional for launch):** Shiprocket can POST shipment status updates (picked up, in transit, delivered, RTO) to a webhook URL. Create `backend/medusa/src/api/store/shiprocket-webhook/route.ts` to receive these and update order fulfillment status in Medusa. This is recommended but not strictly blocking launch — manual monitoring of Shiprocket dashboard is viable in the first month given expected order volume.

### 6c. Storefront-side work

No storefront changes required for Shiprocket sync. The integration is entirely server-side.

One UX addition: once an order has an AWB number (from Shiprocket), expose a tracking URL on the order confirmation page. This requires either polling Medusa order metadata or subscribing to a Shiprocket status webhook. For launch, a simple approach: show "Your order has been dispatched — track here: [Shiprocket tracking URL]" in the email template once the AWB is known. Full in-app tracking is Phase 6 scope.

### 6d. Credentials Dan must provide

- Shiprocket account email
- Shiprocket account password (for API auth — Shiprocket does not use API keys, it uses email/password to generate a JWT)
- Shiprocket pickup location ID (created when adding warehouse address in Shiprocket dashboard)
- Pickup address: full address of the Bengaluru fulfillment location (building, area, pincode)

### 6e. How to test

1. Place a test order (prepaid, via Razorpay test).
2. Verify `shiprocket-sync` subscriber fires (check Medusa server logs).
3. Log into Shiprocket dashboard. Verify the order appears under "Orders > New Orders".
4. Verify payment method shows "Prepaid".
5. Repeat with a COD test order. Verify "COD" in Shiprocket.
6. Generate a label in Shiprocket for the test order. Verify AWB number is returned.
7. Test error handling: temporarily break the Shiprocket credentials. Verify Medusa order still completes (Shiprocket failure must not block order placement).

**Effort:** 6–8h (subscriber + token refresh + COD flag + error handling + optional inbound webhook).

---

## Sprint Sequence and Critical Path

### Dependencies

```
[Razorpay provider] ──────────────────────────┐
[COD provider]  ──────────────────────────────┤
[Prepaid discount logic] ─── depends on both ─┤──► [Storefront checkout rewrite] ──► [E2E test]
[Shipping options seed] ──────────────────────┤
[Tax module config] ──────────────────────────┘
                                               
[Shiprocket sync] ─── depends on order.placed ─► [Triggered after checkout works]
```

### Recommended Sprint Order

**Sprint 1 — Foundation (start here, unblock everything else): 4–6h**
1. Evaluate community Razorpay v2 port (2h max). Go/no-go on custom provider.
2. Configure tax module in `medusa-config.ts` (1h). Run seed to create India tax rate.
3. Run seed script to create shipping options with price rules (2h to write script + test).

**Sprint 2 — Payment providers: 11–15h**
4. Build Razorpay custom payment provider (or wire community port) + webhook subscriber (8–12h).
5. Build COD payment provider + ₹299 minimum validation endpoint (3–4h).
These two can be built in parallel if there were two developers. Solo: do Razorpay first (P0.1 is harder), then COD (P0.8 is simpler).

**Sprint 3 — Checkout rewrite + discounts: 5–6h**
6. Rewrite `checkout-client.tsx` with Razorpay modal + COD conditional + payment session init (3h).
7. Build prepaid ₹30 discount endpoints + storefront wiring (2–3h).

**Sprint 4 — Shiprocket sync: 6–8h**
8. Build `shiprocket-sync` subscriber with token refresh and COD/prepaid flag (6–8h).
9. Wire AWB to email template (1h).

**Sprint 5 — E2E testing: 3–4h**
10. Full end-to-end test: UPI payment → order created → Shiprocket order created. Test all payment paths. Verify GST on invoice. Verify shipping rules.

### Rough Effort Totals

| Item | Effort |
|------|--------|
| Sprint 1: Tax + shipping options | 4–6h |
| Sprint 2: Razorpay + COD providers | 11–15h |
| Sprint 3: Checkout rewrite + prepaid discount | 5–6h |
| Sprint 4: Shiprocket sync | 6–8h |
| Sprint 5: E2E testing | 3–4h |
| **Total** | **29–39 hours** |

This is a solo operator estimate (D-012). The wide range is driven almost entirely by whether a working Razorpay v2 plugin exists (narrows the range by 6–8h) or must be custom-built.

**Critical path:** Razorpay payment provider → Checkout rewrite → E2E test. Everything else can be parallelized around this spine.

**The Shiprocket sync is not blocking launch.** If it slips, Dan can manually create Shiprocket orders from the Medusa admin for the first week. This is painful but viable for a solo operator at low launch volume. The payment flow IS blocking — no working checkout means no sales.

---

## Consolidated Credentials Checklist

All credentials Dan must provide before Tobi can complete each integration:

| Credential | Used For | When Needed | Status |
|------------|----------|-------------|--------|
| Razorpay Test Key ID (`rzp_test_...`) | Payment provider dev/test | Sprint 2 start | Not provided |
| Razorpay Test Key Secret | Payment provider dev/test | Sprint 2 start | Not provided |
| Razorpay Webhook Secret (test) | Webhook signature verification | Sprint 2 | Not provided |
| Razorpay Live Key ID (`rzp_live_...`) | Launch only | Before go-live | Not provided |
| Razorpay Live Key Secret | Launch only | Before go-live | Not provided |
| Razorpay Webhook Secret (live) | Launch webhook verification | Before go-live | Not provided |
| Shiprocket account email | Shiprocket API auth | Sprint 4 start | Not provided |
| Shiprocket account password | Shiprocket API auth | Sprint 4 start | Not provided |
| Shiprocket pickup location ID | Order creation API | Sprint 4 | Not provided after account setup |
| Bengaluru warehouse pincode + address | Shiprocket order creation | Sprint 4 | Not provided |
| GA4 Property ID (G-XXXXXXXXXX) | Analytics (separate effort) | Phase 5 | Not provided |

**Security note:** Do not paste credentials into this file or any tracked file. Store in a password manager (1Password or Bitwarden). Pass to Tobi by pasting directly into the agent session prompt.

---

## Budget and Escalation Flags

**Razorpay transaction fees:**
- Starter plan: 2% per transaction, no monthly fee. This is under ₹5K/month until monthly GMV exceeds ₹250K, which is well above launch volume. No escalation needed.
- If Dan chooses Growth plan (1.5% + ₹1,000/month): this is under ₹5K/month threshold. No escalation needed.
- Pro plan (1% + ₹5,000/month): this is exactly at the escalation threshold. Recommend starting on Starter and upgrading only when revenue justifies it.

**Shiprocket:**
- Business plan: ₹199/month. Well under ₹5K/month. No escalation needed.

**No integrations in this plan require a tool >₹5K/month.** No escalation needed on budget.

**Potential launch date impact:**
- If the Razorpay v2 plugin evaluation goes badly (no community port works, must build custom from scratch), the custom provider adds 6–8 hours to the critical path. This could push the launch readiness date by 1–2 days.
- Dan must decide whether to accept a community plugin risk or invest the build time. This is a launch-date-adjacent decision that should be surfaced to Dan before Sprint 2 begins.
- **Flag to Dan:** Do not set a public launch date until the Razorpay plugin situation is resolved and Sprint 2 effort is confirmed.

---

## Top 3 Risks

**Risk 1 (Highest): No maintained Medusa v2 Razorpay plugin exists.**
Probability: High. If the community port is not verified working against v2.15.3, building the custom provider is 8–12h of net-new code in the highest-stakes part of the system (money movement). A bug here means failed payments at launch. Mitigation: evaluate the plugin in Sprint 1, decide before committing to a timeline.

**Risk 2: Shiprocket API changes break the integration.**
Shiprocket uses email+password JWT auth that expires every 24h. If they rotate their API version or change the order creation payload between now and launch, the subscriber breaks silently. Mitigation: build robust error handling in the subscriber, alert immediately on failure, and ensure Dan can manually create Shiprocket orders as a fallback. Do not make the Shiprocket failure block order completion.

**Risk 3: COD and prepaid discount state gets out of sync.**
If a user selects prepaid (discount applied) then switches to COD, but the remove-discount API call fails due to a network error, the order completes with an incorrect ₹30 discount on a COD order. This is a revenue integrity issue. Mitigation: server-side validation at `cart.complete()` time must re-verify that discount is not present on COD orders. Do not rely solely on the client-side toggle.
