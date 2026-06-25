<!-- last-updated: 2026-06-20 -->
# Customer Login & Account Management — Audit + Build Findings

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build |
| **Producing Agent** | Tobi (Frontend Build Lead) |
| **Date** | 2026-06-20 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## 1. Scope

End-to-end audit of every customer-facing authentication and account-management
touchpoint on the storefront (Next.js 16 + Medusa v2), followed by a build to make
each one production-correct on Medusa customer auth — without breaking the working
COD checkout (D-029) or the curated catalog (D-028).

## 2. Live state confirmed (Postgres `tpl_spike`, read-only inspection)

- **Registered customer:** `cus_01KVGQQ5D40KFDJTC8TDXVD7ET` / `danish0402@gmail.com` (`has_account = t`)
- **Guest customers:** `dan@theproductlab.in`, `test@theproductlab.in` (`has_account = f`)
- **Guest order:** `order_01KVGATWG2CVKDKFBE4P2W25K0` (display_id 1), email `dan@theproductlab.in`,
  attached to guest customer `cus_01KVG9GY51T640ARTDY2H5XZJM` — claimable by registering/logging in as that email.
- Stack up: storefront `:3000` (200), Medusa `:9000/health` (200). Razorpay key empty → COD-only. No notification/email provider configured in `medusa-config.ts`.

## 3. Root-cause architecture findings (the "why nothing downstream works")

1. **Medusa session token is never persisted.** `loginCustomer`/`registerCustomer`
   call `sdk.auth.login`, which returns the Medusa JWT, but only an **app-signed JWT**
   (`auth-token` cookie) is stored. The Medusa token is dropped. On any *later* request
   (`/account/orders`, profile, etc.) there is no Medusa credential, so no authenticated
   `/store/*` call can identify the customer. This is the single reason order history,
   profile, addresses, and change-password cannot work.
2. **Shared SDK singleton with `jwtTokenStorageMethod: "memory"`.** `src/lib/medusa.ts`
   exports one `sdk` imported by server components and route handlers. Authenticating it
   in-place writes the token into **process-wide memory shared across all concurrent
   users** — a cross-account leakage risk on the server. Authenticated customer calls
   must therefore pass `Authorization: Bearer <token>` **per request**, never mutate the
   singleton. (Every SDK store method accepts a per-call `headers` arg — confirmed in the
   2.15.5 type defs — so this is clean to do.)
3. **Two conflicting auth systems.** Medusa auth (`login`/`register`/`me`) vs a legacy
   in-memory `auth-store.ts` (seed users `admin123`/`customer123`). The customer login/
   register paths *fall back* to the in-memory store on any Medusa error, and
   `/api/auth/update-password` reads **only** the in-memory store → a real Medusa customer
   (`cus_…`) is never found → **"User not found."**

## 4. Touchpoint inventory — BEFORE

| # | Touchpoint | Status (before) | Evidence |
|---|-----------|-----------------|----------|
| 1 | Registration | ⚠️ Partial | `registerCustomer` creates Medusa customer, but token not persisted + legacy fallback |
| 2 | Login | ⚠️ Partial | `loginCustomer` works, token not persisted; legacy fallback masks failures |
| 3 | Logout | ✅ Working | clears `auth-token`; `sdk.auth.logout()` no-op on memory |
| 4 | Session / "me" | ⚠️ Partial | `/api/auth/me` succeeds only via JWT-payload fallback, not a real Medusa read |
| 5 | Forgot password (request reset) | ❌ Missing | no route, no UI |
| 6 | Reset password (via token) | ❌ Missing | no route, no UI |
| 7 | Change password (authenticated) | 🛑 Broken | `/api/auth/update-password` → in-memory store → "User not found" |
| 8 | Email verification | ❌ Missing | not wired (emailpass doesn't require it by default) |
| 9 | Profile view | ⚠️ Partial | shows JWT name/email/role only |
| 10 | Profile edit (name/email/phone) | ❌ Missing | only password form exists |
| 11 | Address book (list/add/edit/delete + defaults) | ❌ Missing | `/account/addresses` dir empty, no nav, no API |
| 12 | Order history (list) | 🛑 Stub | `/account/orders` hardcoded "No orders yet" |
| 13 | Order detail (status/items/totals/timeline/AWB) | ❌ Missing | no route |
| 14 | Reorder | ❌ Missing | — |
| 15 | Guest order tracking `/track` | ❌ Missing | dead footer link (`footer.tsx:30`) |
| 16 | Guest-order claim / link-to-account | ❌ Missing | — |
| 17 | Checkout ↔ customer attachment | 🛑 Missing | checkout is guest-only; never attaches customer → orders unclaimable |
| 18 | Saved-address prefill at checkout | ❌ Missing | prefills from cart only |
| 19 | Route protection on `/account/*` | ⚠️ Weak | client-side guard only (`account/layout.tsx`) |
| 20 | Account deletion + data export (DPDP) | ❌ Missing | — |
| 21 | WhatsApp / marketing consent | ❌ Missing | — |

## 5. Gap list (build targets)

- Persist Medusa customer JWT in an httpOnly cookie; add a server helper that issues
  authenticated `/store/*` calls per request (no singleton mutation).
- Remove the legacy in-memory store from the **customer** path (login/register fallback +
  update-password); delete the `customer@test.com` seed and demo-account UI.
- Build: forgot-password, reset-password, authenticated change-password (Medusa),
  profile edit, address book CRUD + defaults, real order history + order detail,
  reorder, `/track` guest lookup, guest-order claim, account deletion + data export,
  WhatsApp/marketing consent on profile + checkout.
- Checkout: attach the authenticated customer to the cart (transfer), offer to save the
  address, and prefill from saved addresses.
- All copy in TPL brand voice (verbal-identity), mobile-first, COD-aware, India-first.

## 6. Decisions

- **D-030 (logged):** Consolidate all **customer** auth on Medusa; remove the legacy
  in-memory `auth-store` from the customer path. The internal `/admin` panel (out of
  scope, D-012 sole operator) keeps its existing path for now — flagged as follow-up
  tech debt, not ripped out in this pass to avoid breaking the admin dashboard.

## 6b. Touchpoint inventory — AFTER (built on Medusa, D-031)

| # | Touchpoint | Status (after) | How |
|---|-----------|----------------|-----|
| 1 | Registration | ✅ Working | Medusa register → create customer → session cookie |
| 2 | Login | ✅ Working | `_medusa_jwt` httpOnly cookie persisted |
| 3 | Logout | ✅ Working | clears both cookies |
| 4 | Session / "me" | ✅ Working | real `/store/customers/me` per-request Bearer |
| 5 | Forgot password (request) | ✅ Built | `/api/auth/forgot-password` (always 200; needs email to deliver) |
| 6 | Reset password (token) | ✅ Built | `/reset-password?token=` → `/auth/.../update` (needs emailed token) |
| 7 | Change password (auth'd) | ✅ Working | **fixed** — verify-by-re-login + custom `/store/customer-password` |
| 8 | Email verification | ➖ N/A | emailpass doesn't require; no provider |
| 9 | Profile view | ✅ Working | real customer fetch |
| 10 | Profile edit (name/phone) | ✅ Working | `/api/account/profile` PUT |
| 11 | Address book CRUD + default | ✅ Working | `/account/addresses` + `/api/account/addresses[/id]` |
| 12 | Order history (list) | ✅ Working | real `/store/orders` |
| 13 | Order detail | ✅ Working | items/totals/timeline/tracking/WhatsApp |
| 14 | Reorder | ✅ Built | rebuilds cart from order line variants |
| 15 | Guest `/track` | ✅ Working | custom `/store/track-order`, email-gated |
| 16 | Guest-order claim | ✅ Working | custom `/store/claim-order`, email-match |
| 17 | Checkout ↔ customer attach | ✅ Working | `transferCart` before complete (guest path unchanged) |
| 18 | Saved-address prefill/save | ✅ Working | checkout loads + can save addresses |
| 19 | Route protection /account/* | ✅ Working | client guard + server 401 on all account APIs |
| 20 | Account deletion + export | ✅ Built | DPDP export (JSON) + deletion request (metadata flag + sign-out) |
| 21 | WhatsApp/marketing consent | ✅ Working | profile toggles → customer metadata |

## 6c. Live verification (Playwright + curl, 2026-06-20)

Driven against the live stack (storefront :3000, Medusa :9000), confirmed against the DB.

| Check | Result |
|-------|--------|
| Login (Medusa, `dan@theproductlab.in`) | ✅ session established, header shows account |
| Claim guest order #1 by email | ✅ "Claimed" → order appears in history (real `order_01KVGATWG2…`) |
| Order history list | ✅ #1, ₹500, 2 items, "Packed" |
| Order detail | ✅ timeline (Confirmed/Packed ✓), item ₹450, total ₹500, address, WhatsApp share, reorder |
| Address book add + default | ✅ saved, renders "Home / Default" |
| Change password — wrong current | ✅ 401 "Current password is incorrect" (no more "User not found") |
| Change password — correct current | ✅ 200; revert with new password also 200 (proves password actually changed) |
| Guest `/track` (order #1 + email) | ✅ 200, total ₹500, qty 2, status "Packed"; wrong email → 404 generic |
| Build | ✅ storefront `tsc --noEmit` clean; backend clean (only pre-existing `apply-pdp-copy.ts`) |

**Bug found & fixed during verification:** order **detail** + `/track` initially returned ₹50 / qty blank — order/item monetary fields are *computed* and only aggregate with the full item graph selected (`*items` for the Store API / `items.*` for `query.graph`); explicit `items.total` returned 0. Fixed in `medusa-customer.ts` and `track-order/route.ts`.

## 7. Known external dependencies / residual gaps

- **Email/notification provider not configured.** Medusa's password-reset token and
  order-transfer (claim) confirmation token are normally delivered by email. Flows are
  built correctly against the Medusa APIs; in this environment the token is not emailed.
  `/track` (guest, no token needed) and authenticated change-password (verifies current
  password by re-login, no token needed) work fully without email. Reset + claim-by-token
  are wired and will light up the moment a notification provider is added.
