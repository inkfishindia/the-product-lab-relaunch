<!-- last-updated: 2026-06-20 -->
# Handoff: Desktop ↔ Drive Workspace Sync

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build |
| **Producing Agent** | Harley (Program Director) |
| **Date** | 2026-06-20 |
| **Status** | approved |
| **Reviewer** | Harley |

## Summary

Two copies of `the-product-lab-relaunch` existed side-by-side. The Drive workspace (`Google Drive/market/the-product-lab-relaunch`) is the living, developed copy. The Desktop copy (`/Users/danish/Desktop/1/the-product-lab-relaunch`) is stale.

## What Was in Desktop That Should Be Ported

| File | Verdict | Action |
|------|---------|--------|
| `storefront/middleware.ts` | **PORT** | Route guard for `/admin` and `/account` (checks `auth-token` cookie, redirects to `/login` on missing). Drive workspace had zero route-level protection for these pages — API routes handle their own auth but pages were unprotected. **Ported as part of D-035.** |
| `storefront/src/lib/auth-store.ts` | **DO NOT PORT** | Legacy in-memory seed user store (hardcoded `admin123`, `manager123`, etc.). Superseded by Medusa auth (D-030) via `medusa-admin.ts` and `medusa-customer.ts`. |
| Build artifacts (`.next`, `.medusa`, `node_modules`) | **DO NOT PORT** | Rebuilt from source. |

## What's Only in Drive Workspace (Not in Desktop)

- Full auth system: forgot/reset password flows, JWT-based sessions
- Backend: operator-password, claim-order, accept-order-transfer, track-order endpoints
- Notification modules: SMTP + WhatsApp event-driven subscribers
- New frontend pages: artists, forgot-password, orders, reset-password, track, account/addresses, account/orders/[id]
- New components: opinion-interrupt, opinion-wall, record-store-browse, sticker-wall
- Governance docs: GOVERNANCE.md, BUILD-WORKFLOW.md, CODING-STANDARDS.md
- docker-compose.prod.yml, index.html
- All Phase 4 artifacts (admin-auth-ops-audit, cto-codebase-assessment, customer-auth-account-audit, prototype-to-storefront-gap)

## Recommendation

Desktop copy can be kept as a read-only archive or deleted. All active development happens in the Drive workspace.
