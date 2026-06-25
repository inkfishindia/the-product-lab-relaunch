# Handoff Record: Go-Live Wiring — India Commerce Layer

| Field | Value |
|-------|-------|
| **Date** | 2026-06-11 |
| **Handoff ID** | H-007 |
| **From Agent** | Tobi — Frontend Build Lead |
| **To Agent** | Dan — Sole Operator / CEO |
| **Status** | Pending review |

from: Tobi
to: Dan

---

## Artifact(s) Delivered

| Artifact | Location | Status |
|----------|----------|--------|
| COD payment provider | `backend/medusa/src/modules/cod-payment/index.ts` | draft |
| Razorpay payment provider skeleton | `backend/medusa/src/modules/razorpay-payment/index.ts` | draft |
| Razorpay webhook route | `backend/medusa/src/api/store/razorpay-webhook/route.ts` | draft |
| COD floor validation route | `backend/medusa/src/api/store/validate-payment-method/route.ts` | draft |
| Prepaid discount apply route | `backend/medusa/src/api/store/prepaid-discount/route.ts` | draft |
| Prepaid discount remove route | `backend/medusa/src/api/store/prepaid-discount-remove/route.ts` | draft |
| Shiprocket sync subscriber | `backend/medusa/src/subscribers/shiprocket-sync.ts` | draft |
| Shipping seed script | `backend/medusa/src/scripts/seed-shipping.ts` | draft |
| Updated medusa-config.ts | `backend/medusa/medusa-config.ts` | draft |
| Updated checkout-client.tsx | `storefront/src/app/checkout/checkout-client.tsx` | draft |
| Updated cart-client.tsx | `storefront/src/app/cart/cart-client.tsx` | draft |
| Env template | `backend/medusa/.env.template` | draft |
| Integration plan (updated) | `artifacts/phase-4/india-commerce-integration-plan.md` | draft |

---

## Quality Assessment

**What is strong:**
- COD path is fully functional and E2E-testable right now against the running Medusa backend. No external credentials required.
- All Razorpay and Shiprocket code is scaffolded and correct — dormancy is enforced by env var presence checks, not code flags. Going live requires only credential paste + restart.
- The ₹299 COD minimum is enforced in two independent layers (storefront hide + server 400).
- The prepaid ₹30 discount desync risk (Risk 3 from the integration plan) is mitigated: server removes the discount unconditionally when COD is selected.
- Shiprocket failure is non-blocking: a Shiprocket API error logs to console and does NOT prevent order creation. Dan can manually create Shiprocket orders as fallback.
- Free shipping nudge added to cart page per D-006.
- GSTIN 29APFPH6495C1ZP shown on checkout summary.

**What is approximate / unverified without live keys:**
- Razorpay `initiatePaymentSession` call from the storefront — the exact session response shape depends on how Medusa v2.15.x wraps the payment provider response. The path `session.payment_collection.payment_sessions[0].data.razorpay_order_id` is correct per Medusa v2 docs but needs live verification.
- The `/store/razorpay-verify` endpoint is referenced in checkout-client.tsx but NOT yet built. It must be created before Razorpay goes live. This is a go-live task, not a blocker for COD.
- Medusa's `AbstractPaymentProvider` v2 interface has subtle method signature differences between patch versions. The provider code is written to the v2.15.x documented interface but should be tested when Razorpay keys are available.
- `sdk.store.payment.initiatePaymentSession` is the correct Medusa JS SDK v2 call — verify the SDK version in `storefront/package.json` matches.

**What must not be changed:**
- D-006 thresholds: ₹299 COD minimum (29900 paise), ₹499 free shipping (49900 paise), ₹30 prepaid discount (3000 paise).
- GSTIN: 29APFPH6495C1ZP.
- The dormancy pattern: providers disabled by env var absence. Never hard-code credentials.

---

## Part 1: Env Vars to Set

### Backend (`backend/medusa/.env`)

Add these lines. Current `.env` has none of them.

```
# ── Razorpay (TEST — paste before development testing) ────────────────────
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
RAZORPAY_WEBHOOK_SECRET=<set after registering webhook in Razorpay dashboard>

# ── Razorpay (LIVE — paste only at go-live, after KYC approved) ──────────
# Replace test values above:
# RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
# RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
# RAZORPAY_WEBHOOK_SECRET=<live webhook secret>

# ── Shiprocket ──────────────────────────────────────────────────────────────
SHIPROCKET_EMAIL=your-shiprocket-account@email.com
SHIPROCKET_PASSWORD=your-shiprocket-password
SHIPROCKET_PICKUP_LOCATION=Primary
```

Where to get these values:
- Razorpay test keys: https://dashboard.razorpay.com/app/keys (toggle "Test Mode" in dashboard)
- Razorpay live keys: Same URL, toggle "Live Mode" (requires KYC approval)
- Shiprocket credentials: Your Shiprocket account email and password

### Storefront (`storefront/.env.local`)

Create this file if it doesn't exist:

```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
# At go-live: change to rzp_live_XXXXXXXXXXXXXXXX
```

This is the SAME value as `RAZORPAY_KEY_ID` in the backend. It is the public key — safe to expose in the browser. Never put `RAZORPAY_KEY_SECRET` in a `.env.local` file.

---

## Part 2: Webhook URLs to Register in Razorpay Dashboard

**When to do this:** After backend is deployed to its production URL (not localhost).

Steps in Razorpay dashboard:
1. Go to: Settings → Webhooks → + Add New Webhook
2. Webhook URL: `https://<your-backend-domain>/store/razorpay-webhook`
3. Secret: Generate a random string (e.g., `openssl rand -hex 32` in terminal). Paste this EXACT string into `RAZORPAY_WEBHOOK_SECRET` in your backend `.env`.
4. Select events to subscribe:
   - `payment.authorized`
   - `payment.captured`
   - `payment.failed`
5. Save. Razorpay will verify the URL responds with 200.

**Test the webhook:**
1. In Razorpay dashboard → Webhooks → select your webhook → "Send Test Event"
2. Check Medusa server logs for `[razorpay-webhook] Received event: payment.captured`
3. If you see "not_configured" in the response, RAZORPAY_WEBHOOK_SECRET is not set in env.

---

## Part 3: Shiprocket Pickup Location Setup

This must be done BEFORE the first real COD order (not blocking for prepaid-only launch).

Steps:
1. Log into https://app.shiprocket.in/
2. Go to: Settings → Manage Pickup Addresses → Add Pickup Address
3. Add the Bengaluru warehouse address (Cunningham Road or your actual dispatch location).
4. Note the "Location Name" exactly as you save it. This value goes into `SHIPROCKET_PICKUP_LOCATION` env var.
5. Verify the pickup location is active (green status in Shiprocket dashboard).

If pickup location name is not "Primary", update `SHIPROCKET_PICKUP_LOCATION` accordingly.

---

## Part 4: Step That Still Needs Code (Before Razorpay Goes Live)

**One route is missing:** `/store/razorpay-verify`

The checkout client calls `POST /store/razorpay-verify` after the Razorpay modal closes. This route must be created to:
1. Accept `{ cart_id, razorpay_order_id, razorpay_payment_id, razorpay_signature }`.
2. Call `RazorpayPaymentProvider.authorizePayment()` with those fields.
3. Update the Medusa payment session to `authorized` status.
4. Return `{ authorized: true }` or `{ authorized: false, reason }`.

This is a 1-2 hour task. It is NOT needed for COD testing. Tobi will build this when Dan provides Razorpay test keys.

---

## Part 5: Final Go-Live E2E Checklist

Run these tests in order BEFORE setting the site to public.

### COD Flow (test NOW, no keys needed)

- [ ] Add ₹149 item to cart (single item below COD minimum)
- [ ] Go to checkout → confirm COD option is NOT shown
- [ ] Add another ₹199 item (total ₹348) → COD option appears
- [ ] Fill contact + address → select shipping method → select COD
- [ ] Click "Place Order — Pay on Delivery"
- [ ] Confirm redirect to /order-confirmed with order ID
- [ ] Log into Medusa admin (http://localhost:9000/app) → verify order created
- [ ] Verify order `payment_status` is `captured` (COD authorises immediately)
- [ ] If Shiprocket is configured: log into Shiprocket dashboard → verify order appears
- [ ] Verify Shiprocket order shows payment_method = "COD"

### Free Shipping Rule (test NOW)

- [ ] Cart with ₹498 in items → checkout → shipping selector shows "Standard Shipping ₹50"
- [ ] Cart with ₹499 in items → checkout → shipping selector shows "Free Shipping"
- [ ] Cart with ₹249 (single item) → cart page shows "Add ₹250 more for free shipping" nudge

### Prepaid Discount (test NOW — COD side)

- [ ] Add ₹499 item → go to checkout
- [ ] Select COD → confirm NO "Prepaid discount" line in order summary
- [ ] Total should be ₹499 + shipping (not ₹469)

### Razorpay Flow (test AFTER keys are pasted)

- [ ] Paste `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` into backend `.env`
- [ ] Paste `NEXT_PUBLIC_RAZORPAY_KEY_ID` into storefront `.env.local`
- [ ] Restart backend (`npm run dev` in backend/medusa)
- [ ] Restart storefront (`npm run dev` in storefront)
- [ ] Add item to cart → checkout → confirm "UPI / Cards / Wallets" option is now active
- [ ] Select Razorpay → confirm "-₹30 Prepaid discount" appears in order summary
- [ ] Click "Pay Now" → Razorpay modal opens
- [ ] Pay with test card: `4111 1111 1111 1111`, expiry any future date, CVV `123`
- [ ] Confirm redirect to /order-confirmed
- [ ] Verify order in Medusa admin shows `payment_status: captured`
- [ ] Switch to COD → confirm discount disappears from summary
- [ ] Switch back to Razorpay → confirm discount reappears

### GST Verification

- [ ] Run `npm run seed:shipping` (after seed:tpl) to create 18% GST rate
- [ ] Add item to cart → checkout → confirm "GST (18%)" line appears in order summary
- [ ] Verify total = subtotal + 18% GST + shipping

### Razorpay Webhook

- [ ] Register webhook URL in Razorpay dashboard (see Part 2)
- [ ] Set `RAZORPAY_WEBHOOK_SECRET` in `.env`
- [ ] Use Razorpay dashboard "Send Test Event" → check Medusa logs

---

## Part 6: Image Self-Hosting Hardening

**Current state:** 502 products in the seed data hotlink to `theproductlab.in/wp-content/` URLs. This creates two problems:
1. **Performance:** Every PDP image loads from WordPress, adding ~200-400ms latency for Indian users.
2. **Reliability:** If WordPress goes down or URL structure changes, all product images break.

**Recommendation:** Before scaling beyond seed validation, download product images from the WooCommerce export and serve locally or via CDN.

Steps:
1. The WooCommerce export is at: `TPL DUMP/wc-product-export-11-6-2026-1781128734010.csv`
2. Extract all image URLs from the `Images` column.
3. Download them using a script: `wget -i image-urls.txt -P ./public/product-images/`
4. Upload to Cloudflare R2 or AWS S3 + CloudFront (recommended: Cloudflare R2 — free egress, Indian PoP coverage).
5. Update `seed-data.ts` image URLs to point to the CDN.
6. Re-run `npm run seed:tpl` on a fresh database.

**Priority:** Do this before any public traffic. The current hotlink situation is acceptable only for internal testing.

---

## Open Questions

1. Has Razorpay KYC been completed? Live keys require a verified business account. If not done, initiate immediately — KYC can take 5-7 business days.
2. Shiprocket pickup location created? If not, COD remittance routing is undefined.
3. GST invoice format: Patrick/Tony should confirm whether the GSTIN-in-email approach is sufficient for compliance or if a proper GST invoice PDF is needed before launch.
4. RAZORPAY_WEBHOOK_SECRET: this must be set BEFORE the webhook route returns meaningful results. Currently returns `{ status: "not_configured" }` when secret is absent.

---

## Dependencies Resolved

- Phase 4 integration plan scoping (artifact created 2026-06-11) — this handoff implements everything in that plan's scope.
- COD checkout path is now E2E testable. James can run QA against the COD flow immediately.

## Dependencies Created

- James / QA: Run the COD E2E checklist above against localhost before marking Phase 4 checkout as QA-cleared.
- Dan: Provide Razorpay credentials to unblock the Razorpay path. The `/store/razorpay-verify` route must be built by Tobi before Razorpay goes live.
- Dan: Create Shiprocket pickup location and set `SHIPROCKET_PICKUP_LOCATION` env var.
- Dan / Tony: Confirm GST invoice compliance approach.
