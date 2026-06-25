<!-- last-updated: 2026-06-20 -->
# Admin Auth & Operations — Touchpoint Audit

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build |
| **Producing Agent** | Tobi (Frontend Build Lead) / James (QA) |
| **Date** | 2026-06-20 |
| **Status** | review |
| **Reviewer** | Harley / Dan |

> Scope: every endpoint and touchpoint for ADMIN/operator login and account management on the
> custom Next.js 16 storefront, and the deliberate split of ownership between the custom
> `/admin` area and the existing Medusa admin at `http://localhost:9000/app`. Verified against
> the **live** stack on 2026-06-20 (backend `:9000` health 200, storefront `:3000` 200, one real
> order `order_01KVGATWG2CVKDKFBE4P2W25K0`, display #1, COD/INR, status `pending`).

---

## 1. Architecture as-found

- **Two parallel auth systems, fused fragilely.** `medusa-auth.ts` tries Medusa first
  (`sdk.auth.login("user"|"customer", "emailpass")`) and on **any** exception silently falls back
  to a **legacy in-memory store** (`auth-store.ts`) seeded with fake admins (`admin123`,
  `manager123`, `customer123`). The store is process-memory only — it resets on every restart and
  is not shared across workers/serverless invocations.
- **Session token is the storefront's own JWT** (`jose`, cookie `auth-token`), carrying only
  `{userId, email, role, name}`. The Medusa session is **not** persisted. The shared `sdk`
  singleton uses `jwtTokenStorageMethod: "memory"`, so the admin Medusa JWT obtained at login is
  (a) global to the process and (b) gone on restart. **Consequence: admin API routes have no
  reliable Medusa admin credential** to call `sdk.admin.*` — which is exactly why the order
  endpoints are stubbed.
- **Medusa v2 `user` has no role model.** `sdk.admin.user.me()` returns no `role` array, so
  `adminUser.role?.[0] || "admin"` in `loginAdmin` always yields `"admin"`. The
  superadmin/admin/manager tiers exist **only** in storefront code + the fake seed store. RBAC
  role is therefore a storefront concern, not a Medusa one.
- **Admin user is real and correctly linked**: `user_01KST6TRVXJGK8TAHVDMBCJPMB` /
  `admin@theproductlab.in`, `auth_identity.app_metadata.user_id` set, emailpass provider present.
  Password was unknown; **reset 2026-06-20 to the known temp `TplAdmin#Temp2026`** via the
  existing `backend/medusa/src/scripts/reset-admin-pass.ts` (`authService.updateProvider`).

---

## 2. Touchpoint inventory — status & ownership

Legend: **Working** · **Stub** (returns empty/fake) · **Broken** (wrong/fragile) · **Missing**
Ownership: **Custom** = storefront `/admin` owns · **Medusa** = defer to `:9000/app`

| # | Touchpoint | Route / File | Status (as-found) | Owner (decided) |
|---|-----------|--------------|-------------------|-----------------|
| 1 | Admin login | `POST /api/auth/login` → `loginAdmin` | **Broken** — routes by `email.includes("admin")` heuristic; falls back to fake store | **Custom** (on Medusa user auth) |
| 2 | Logout | `POST /api/auth/logout` → `logoutUser` | **Working** (clears cookie; Medusa logout best-effort) | **Custom** |
| 3 | Session / "me" | `GET /api/auth/me` → `getCurrentUser` | **Working-ish** — falls back to in-memory `findUserById` | **Custom** |
| 4 | RBAC gate (pages) | `app/admin/layout.tsx` | **Working** client-side only (UX guard, not security) | **Custom** |
| 5 | RBAC gate (APIs) | `requireRole()` in `lib/auth.ts` | **Working** — deny-by-default, but several routes mis-scoped | **Custom** |
| 6 | Change password | `PUT /api/auth/update-password` | **Broken** — writes to in-memory store, not Medusa | **Custom → Medusa** |
| 7 | Forgot / reset password | — | **Missing** | **Custom (CLI/script)** — sole operator; no email service (₹5K ceiling) |
| 8 | Team/user mgmt (list/invite/role/delete) | `/api/admin/users[/id]`, `/admin/users` | **Broken** — CRUD against fake store; no Medusa effect | **Medusa** (`:9000/app` Settings → Users) |
| 9 | Orders list | `GET /api/admin/orders` + `/admin/orders` | **Stub** — `{ orders: [] }` | **Custom** |
| 10 | Order detail | `GET /api/admin/orders/[id]` + `/admin/orders/[id]` | **Stub** — `{ order: null }`; page is placeholder text | **Custom** |
| 11 | Status transition: mark fulfilled | — | **Missing** | **Custom** (Medusa `createFulfillment`) |
| 12 | Ship + capture AWB/tracking | — | **Missing** | **Custom** (Medusa `createShipment`; AWB free-text until Shiprocket creds) |
| 13 | Cancel order | `PUT /api/admin/orders/[id]` echoes body | **Broken** (fake) | **Custom** (Medusa `order.cancel`) |
| 14 | Refund | — | **Missing** | **Medusa** (`:9000/app` — rare for COD; full refund UI lives there) |
| 15 | COD reconciliation (mark collected) | — | **Missing** | **Custom** (capture COD payment `pp_cod_cod` + metadata flag) |
| 16 | Order notes / timeline | — | **Missing** | **Custom** (order `metadata.notes[]` + derived timeline) |
| 17 | Customers list | `/api/admin/customers` + `/admin/customers` | **Stub/Broken** — reads in-memory customers | **Custom** (read-only, real Medusa) |
| 18 | Customer detail / edit | `/api/admin/customers/[id]` | **Missing** route (page expects it) | **Medusa** (edit at `:9000/app`) |
| 19 | Catalog / inventory mgmt | `/api/admin/products[/handle]`, `/admin/products` | **Broken** — local `master-catalog`, not Medusa; edits go nowhere | **Medusa** (catalog is D-028's source of truth) |
| 20 | Ops dashboard | `/api/admin/dashboard` + `/admin` | **Stub** — `totalOrders:0`, `totalRevenue:0`, fake customers | **Custom** (real: today's orders, COD pending, revenue) |
| 21 | `/mission-control` | `app/mission-control/page.tsx` | Standalone program dashboard (not operator commerce ops) | **Custom** (leave as-is; out of scope) |

---

## 3. Gap list (what must change in Phase 2)

**P0 — operator cannot run the store from the custom admin:**
1. Orders list/detail are empty stubs → wire to **real Medusa orders**.
2. No COD-collected marking → the single most important India-ops action is missing.
3. No fulfillment / ship+AWB / cancel → cannot progress an order.
4. Change-password writes to a fake store → operator can't actually change their password.

**P0 — security / correctness:**
5. Silent fallback to a fake in-memory admin store (`admin123`/`manager123`) is a **credential
   backdoor risk** and a source of "works then doesn't" flakiness. Remove it.
6. Login routing by `email.includes("admin")` is brittle. Decide actor by attempting Medusa user
   auth, then customer.
7. Admin API routes have **no Medusa credential** server-side → need a service-account admin
   client.

**P1 — mis-scoped/abandoned surfaces:**
8. `/admin/users`, `/admin/products`, `/admin/customers` (write) operate on fantasy data. Defer
   to Medusa admin; convert customers to a **read-only real** list; link products/users out.
9. Dashboard shows zeros → wire real today/COD/revenue tiles.

**Won't-do (deliberate, logged):**
- Self-service forgot-password email flow — no transactional email within the ₹5K/mo ceiling and
  D-012 (sole operator). Reset stays a documented CLI script (`reset-admin-pass.ts`).
- Rebuilding catalog/customer/refund/promotions editors — Medusa admin already does these well.

---

## 4. Ownership decision (summary — full record: D-030)

- **Authentication consolidates on Medusa user/customer emailpass.** Delete `auth-store.ts` and
  all fake seed admins. Session stays the storefront httpOnly JWT (works in RSC/SSR), minted only
  **after** a successful Medusa auth.
- **Authorization (role) lives in the storefront**, sourced from Medusa **user `metadata.role`**
  (default `superadmin` for the sole operator); customers are always `customer`. `requireRole`
  stays the single deny-by-default gate on every `/admin/*` page and `/api/admin/*` route.
- **Server-side admin Medusa access** via a new `lib/medusa-admin.ts` service client that logs in
  with `MEDUSA_ADMIN_EMAIL/PASSWORD` (the operator's creds) and caches/refreshes the JWT.
- **Custom `/admin` owns the COD-first daily ops cockpit**: login, orders list/detail, fulfill,
  ship+AWB (stub input), cancel, **mark COD collected**, order notes, and a real ops dashboard.
- **Medusa admin (`:9000/app`) owns** catalog/inventory, customer edits, refunds, promotions,
  tax/region/shipping config, and **team/user management** (Medusa has no role model + sole
  operator → not worth rebuilding).

This is the minimal surface that lets one person run COD fulfillment without logging into two
systems for the daily loop, while not duplicating Medusa's heavy commerce editors.

---

## 5. Phase 2 build + Phase 3 verification outcome (2026-06-20)

**Built (D-030):**
- `lib/medusa-admin.ts` — server-side admin service-account client (login + token cache/refresh
  on 401) backing all `/api/admin/*` routes.
- `lib/medusa-auth.ts` — admin role now sourced from Medusa user `metadata.role` (default
  `superadmin`); legacy `auth-store.ts` **deleted** (no more `admin123` backdoor).
- Orders: `/api/admin/orders` (real list), `/api/admin/orders/[id]` (real detail + actions:
  note, cod-collected, fulfill, ship+AWB, cancel, complete). Admin pages rebuilt to consume them.
- Dashboard: real today/COD-pending/revenue/recent-orders. Customers + users: read-only real
  Medusa mirrors; product/user writes return **405 → Medusa admin**.
- `backend/.../api/admin/operator-password/route.ts` — email-independent admin password change
  via `authService.updateProvider`; wired into `/api/auth/update-password` for admin role.
- `src/proxy.ts` — single Next 16 page guard, **role-aware** for `/admin` + presence for
  `/account`. Replaced the pre-existing root `middleware.ts` which only checked token *presence*
  and therefore let any logged-in customer reach `/admin` (security bug — now fixed).

**Verified live (Playwright + curl + Medusa DB on order `order_01KVGATWG2…`):**
| Check | Result |
|-------|--------|
| Admin login (`admin@theproductlab.in` / reset temp `TplAdmin#Temp2026`) → role superadmin | ✅ |
| Orders list + detail show real Medusa order #1 (₹500, COD) | ✅ |
| Mark COD collected → payment captured (1 capture, ₹500), `payment_collection` completed | ✅ DB-confirmed |
| Add note → persisted in order `metadata.notes`, shown in timeline | ✅ DB-confirmed |
| Mark fulfilled → `fulfillment_status=fulfilled`, 1 fulfillment created | ✅ DB + :9000/app |
| Admin change-password (2026→2027) then restored to documented temp | ✅ (wrong-current → 400) |
| RBAC: customer token → 403 on every `/api/admin/*`; redirected from `/admin` pages | ✅ |
| RBAC: manager (metadata.role) → 403 on superadmin-only `/api/admin/users` + admin-only actions, 200 on orders | ✅ (metadata reverted) |

**Residual gaps (honest):**
- Ship+AWB writes the tracking number to the fulfillment label but is a **manual free-text**
  input until Shiprocket creds land (D-029) — no AWB auto-generation.
- Admin **self-service forgot-password** is intentionally not built (no email provider within the
  ₹5K ceiling); reset stays the `reset-admin-pass.ts` CLI script.
- The admin service account is the operator's own creds in `.env.local` — fine for sole-operator
  localhost; rotate/secret-manage before any hosted deploy.
- One real test customer (`rbac-test@example.com`) was registered in Medusa during RBAC testing.
