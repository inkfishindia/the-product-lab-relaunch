# Workspace Index And Cleanliness Map

**Last updated:** 2026-06-25

This is the practical navigation layer for the current workspace. It documents what exists today and how to keep it clean while the repo migrates toward the cleaner structure in `docs/PROJECT-SCOPE-AND-STRUCTURE.md`.

## Current Source Map

| Area | Current Path | Role | Cleanliness Rule |
|---|---|---|---|
| Storefront app | `storefront/` | Active Next.js storefront, account, cart, checkout, and admin routes | Keep live app code here until an intentional `apps/storefront/` migration |
| Commerce backend | `backend/medusa/` | Active Medusa v2 backend | Treat as a nested app/service repo; do not move without Docker/script updates |
| Commerce evaluation | `backend/medusa-eval/` | Platform notes, architecture, validation plans | Keep as reference until promoted or archived |
| Mission control | `mission-control-eval/` | Separate evaluation app with its own Git repo | Keep isolated unless adopted as `apps/mission-control/` |
| Catalog data | `catalogs/` (now holds `cleaned_catalog.json` + `generate_clean_catalog.py` / `process_catalog.py`, consolidated from root 2026-06-25) | Product imports, cleaned catalog, inventory references | Consolidate into future `commerce/catalog/` or `packages/catalog/`. Source CSV stays in `TPL DUMP/`; backend seed scripts read `catalogs/cleaned_catalog.json` by absolute path. |
| Knowledge base | `knowledge/` | Curated company/project source of truth | Prefer this over root duplicates and `TPL DUMP/` |
| Raw imports | `TPL DUMP/`, `site-scrape/`, `tpl ref/` | Historical source material and scrape references | Archive-only; do not use as default working source |
| Brand/design | `assets/`, `design/` | Brand tokens, visual identity, wireframes, reviews, creative briefs | Future home is `brand/` |
| Growth/sales | `artifacts/phase-5/`, growth handoffs, marketing docs | Launch, campaign, social, seeding, email/WhatsApp work | Future home is `growth/` with marketing and sales subfolders |
| Operations | `agents/`, `pods/`, `handoffs/`, `decisions/`, `status/`, `templates/` | Agent system, project control, decision records, status | Future home is `ops/` |
| Integrations | `integrations/` | Airtable, Shiprocket, and future platform notes | Split by provider and link to app/service code when implemented |
| Prototypes | `prototypes/`, root HTML dashboards | Experimental HTML and design proofs | Promote into apps only when production-ready |
| Scratch | `scratch/`, generated screenshots/logs | Temporary working material | Safe to prune after review |

## Target Domains

Use these domain boundaries for new files immediately, even before moving old files.

| Domain | Future Folder | Belongs Here |
|---|---|---|
| Apps | `apps/` | Storefront, admin, mission-control, dashboards |
| Services | `services/` | Medusa, workers, webhooks, sync services |
| Brand | `brand/` | Identity, design system, assets, product/social creative |
| Growth | `growth/` | Marketing, launch, content, email/WhatsApp, sales, partnerships |
| Commerce Ops | `commerce/` | Catalog, pricing, inventory, fulfillment, returns, support |
| Company Ops | `ops/` | Agents, pods, decisions, status, handoffs, templates, SOPs |
| Knowledge | `knowledge/` | Curated truth and cross-references |
| Archive | `archive/` | Raw dumps, old screenshots, deprecated files |

## Current Hygiene Findings

- The workspace root is not currently a Git repository.
- `storefront/`, `backend/medusa/`, and `mission-control-eval/` are nested Git repos.
- Generated/runtime data exists in app folders: `.next/`, `node_modules/`, logs, env files, local DB files, and `.data/`.
- Several root docs duplicate files in `knowledge/`; `knowledge/` should remain canonical.
- Several Drive-style duplicate files exist, such as files ending in ` 2`.
- Large folders are mostly app/build/dependency related: `backend/`, `storefront/`, and `mission-control-eval/`.

Run the hygiene check any time before a cleanup pass:

```bash
npm run check:workspace
```

## Cleanliness Rules

1. New source-of-truth documents go in `knowledge/`, `docs/`, or the relevant domain folder, not the root.
2. New app code goes inside the app/service that owns it.
3. New launch, marketing, or sales work should be tagged for future `growth/`.
4. New brand/design work should be tagged for future `brand/`.
5. Raw imports and scrape outputs are references, not working documents.
6. Do not delete duplicate files until a human confirms the canonical copy.
7. Do not move nested Git repos without updating build scripts, Docker compose files, deployment paths, and README links.
8. Every active top-level folder should have a `README.md` that names its owner, purpose, and source of truth.

## Safe Migration Sequence

> **Execution-ready version:** see [POST-LAUNCH-RESTRUCTURE-PLAN.md](POST-LAUNCH-RESTRUCTURE-PLAN.md)
> for the gated, step-by-step move map, lockstep edit list, and rollback. That plan supersedes the
> high-level sequence below once the workspace is ready for a deliberate reorganization.


1. Keep paths stable and update indexes first.
2. Add README files to active folders missing one.
3. Archive raw dumps and old generated exports.
4. Consolidate duplicated root docs into `knowledge/` with pointer files if needed.
5. Consolidate catalog files and scripts into one catalog area.
6. Move docs/assets into `brand/`, `growth/`, `commerce/`, and `ops/`.
7. Move apps/services only after tests/builds pass and config references are updated.
