# Project Scope And Structure

This document scopes the full The Product Lab relaunch workspace and recommends a cleaner long-term folder structure.

## What This Project Contains

The workspace has four overlapping layers:

| Layer | What It Is | Current Paths |
|---|---|---|
| Live app | Next.js storefront and route/API implementation | `storefront/` |
| Platform planning | Medusa/Supabase architecture, Fynd launch decision, integrations | `backend/medusa-eval/`, `integrations/`, `docs/` |
| Operating system | Agents, pods, decisions, handoffs, status, templates | `agents/`, `pods/`, `decisions/`, `handoffs/`, `status/`, `templates/` |
| Knowledge/archive | Curated truth, approved artifacts, raw imported context | `knowledge/`, `artifacts/`, `TPL DUMP/`, `site-scrape/` |

## Current App Scope

The active app is a Next.js storefront with:

- Public shopping routes: home, products, collections, sets, gifts, drops, about, FAQ, contact, sell-your-art
- Commerce flows: cart, checkout, order confirmation
- Customer flows: login, registration, account, profile, orders
- Admin flows: dashboard, products, orders, users, customers
- API routes: auth and admin endpoints
- Shared libraries: Medusa client, auth, analytics, catalog/data helpers
- Shared UI: product card, header, footer, navigation, trust blocks, badges, buttons

## Current Platform Scope

Platform documentation currently preserves two realities:

- **Launch path:** Fynd-first is recorded as the active launch decision in `decisions/decision-log.md` under D-022.
- **Long-term path:** Medusa + Supabase is documented as a spike and ownership model in `backend/medusa-eval/`.

Keep both documented until the platform choice is fully resolved in implementation.

## Current Content Scope

| Content Type | Source Of Truth |
|---|---|
| Company and project facts | `knowledge/` |
| Phase deliverables | `artifacts/phase-N/` |
| Agent cards | `agents/` |
| Pod operating notes | `pods/` |
| Current work | `status/` |
| Decisions | `decisions/decision-log.md` |
| Raw history | `TPL DUMP/` |

## Recommended Target Structure

Use this as the cleanup target when the workspace is ready for a deliberate reorganization.

```text
the-product-lab-relaunch/
|-- apps/
|   `-- storefront/                 # Next.js app currently in storefront/
|-- services/
|   `-- commerce/                   # Medusa backend when promoted from spike to implementation
|-- packages/
|   |-- catalog/                    # Shared product/catalog data and transforms
|   `-- config/                     # Shared lint, TypeScript, and design tokens if needed
|-- content/
|   |-- knowledge/                  # Current source-of-truth docs
|   |-- artifacts/                  # Phase deliverables
|   |-- site-scrape/                # Site inventory references
|   `-- prototypes/                 # HTML/prototype explorations
|-- ops/
|   |-- agents/                     # 25 agent cards
|   |-- pods/                       # Pod workspaces
|   |-- decisions/                  # Decision log and ADR-style records
|   |-- handoffs/                   # Agent and phase handoffs
|   |-- status/                     # Sprint/phase state
|   `-- templates/                  # Standard templates
|-- brand/
|   |-- assets/                     # Brand/product/social/creative assets
|   `-- design/                     # Wireframes, UI system, reviews, visual identity
|-- docs/
|   |-- architecture/               # System architecture and platform docs
|   |-- ops-sop/                    # SOPs and customer support docs
|   `-- research/                   # Tooling/platform research
|-- integrations/
|   |-- airtable/
|   `-- shiprocket/
|-- archive/
|   `-- raw-dumps/                  # Current TPL DUMP contents
`-- scratch/                        # Temporary working notes, safe to prune
```

## Migration Plan

Do the cleanup in small passes.

1. **Document first:** Keep the current folder layout stable while README and index files point to the right sources.
2. **Archive raw dumps:** Move `TPL DUMP/` into `archive/raw-dumps/` after confirming no live docs link directly to old paths.
3. **Promote app code:** Move `storefront/` to `apps/storefront/` only when package scripts, deployment config, and docs can be updated together.
4. **Separate content:** Move `knowledge/`, `artifacts/`, `site-scrape/`, and `prototypes/` under `content/`.
5. **Separate ops:** Move `agents/`, `pods/`, `decisions/`, `handoffs/`, `status/`, and `templates/` under `ops/`.
6. **Separate brand:** Move `assets/` and `design/` under `brand/`.
7. **Add repo-level scripts:** Add root commands after the app path is stable.

## Keep As Is For Now

Avoid moving these until the app has a passing build and the active platform decision is final:

- `storefront/`
- `backend/medusa-eval/`
- `knowledge/`
- `artifacts/phase-4/`
- `decisions/decision-log.md`
- `status/sprint-board.md`

## Cleanup Rules

- Curated docs beat raw dumps.
- Live app code should never depend on `TPL DUMP/`.
- Prototypes should stay outside the app until promoted intentionally.
- Decisions should link to the artifact or code path they affect.
- Duplicate docs should be consolidated by keeping one source of truth and replacing the other with a short pointer.
- Archive before deleting.
