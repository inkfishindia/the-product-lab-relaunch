# SHARED.md — The Product Lab Relaunch

> Colin reads this every morning brief. Keep it current. Max 150 lines.

## What's Waiting on Dan
- **Fynd/Commerce.com store credentials** — Blocks Tobi's entire build (platform setup, CSS, catalog, checkout). Dan needs to request or retrieve these.
- **Product photography** — Dark posterboard + desk lamp setup. Asset list has exact shot list for 7 hero SKUs.
- **Product copy for hero SKUs** — Fill-in-the-blanks template handed off in `artifacts/phase-4/dan-copy-faststart-template.md`.

## Status
**Phase 4 Active (Build)** — Storefront now wired with real product data (67 products across 6 categories). TPL shared drive indexed. MVP compiles with 16 routes, 0 errors.

## What's Done
- **Storefront MVP wired** — 67 real TPL products in `catalogs/master-catalog.ts` with prices, PDP copy, themes. Collections/sets/gift pages now filter by actual product relationships. Medusa fallback renders local data when backend is down.
- **TPL shared drive fully indexed** — 24 folders, ~200+ files mapped in `TPL-SHARED-DRIVE-INDEX.md` + changelog in `TPL-SHARED-DRIVE-LOG.md`. Key discovery: `dan 25/` has 15 strategic Google Docs (SOPs, KB, business manual, org structure, warehouse ops).
- **Handoffs written** — `handoffs/2026-06-06-wired-mvp-handoff.md` (architecture, data flow, product mappings) and `handoffs/2026-06-06-build-list-updated.md` (26-item P0/P1/P2/P3 build list).
- Earlier: 16 storefront pages built, tooling research sprint (3 agents), command center dashboard, competitor threat deep dives, 3 Dan unblocker tools, Fynd/Medusa/open-source research.

## Recent Decisions
- D-024 (proposed): Drop 1 lead with Collect Sets + Gift Persona Shopping + Opinion Wall
- D-023: Competitor landscape completed
- D-022: Fynd for launch; Medusa deferred to Day 30

## Blockers
- **Dan: Fynd credentials** — #1 blocker; nothing starts until this is resolved
- **Dan: Photography** — 7 hero SKUs need shooting (asset-list.md has exact brief)
- **Dan: Copy** — Fast-start template created in Phase 4 artifacts

## Cross-Project Dependencies
- None active. TPL is independent from YDS per D-011.
