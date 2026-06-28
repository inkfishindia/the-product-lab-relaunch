# The Product Lab Relaunch

This workspace is the operating system and build environment for relaunching `theproductlab.in`: a Next.js storefront, a Medusa/Supabase commerce evaluation path, launch artifacts, brand assets, SOPs, and a 25-agent project team for planning and execution.

## Current Shape

| Area | Status | Start Here |
|---|---|---|
| Storefront app | Active Next.js 16 implementation | [`storefront/README.md`](storefront/README.md) |
| Commerce architecture | **Medusa v2 + Next.js 16 active launch platform** (D-025, superseded D-022) | [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`decisions/decision-log.md`](decisions/decision-log.md) |
| Knowledge base | Consolidated source-of-truth docs for company, product, agents, platform, and current state | [`knowledge/INDEX.md`](knowledge/INDEX.md) |
| Execution artifacts | Phase-by-phase strategy, creative, build, launch, and optimization outputs | [`artifacts/`](artifacts/) |
| Agent system | 25 operator-style agents across 9 pods | [`agents/README.md`](agents/README.md), [`pods/`](pods/) |
| Project status | Sprint board, weekly status, phase tracker | [`status/sprint-board.md`](status/sprint-board.md) |
| Recommended structure | Cleanup plan for turning this workspace into a cleaner repo | [`docs/POST-LAUNCH-RESTRUCTURE-PLAN.md`](docs/POST-LAUNCH-RESTRUCTURE-PLAN.md) |
| Workspace hygiene | Current folder map, source-of-truth rules, and cleanup checks | [`REPO-MAP.md`](REPO-MAP.md) |

## How To Work In This Repo

1. Check current state in [`knowledge/26-CURRENT-STATE.md`](knowledge/26-CURRENT-STATE.md), [`status/sprint-board.md`](status/sprint-board.md), and [`decisions/decision-log.md`](decisions/decision-log.md).
2. For app work, enter [`storefront/`](storefront/) and use its README.
3. For strategy or source-of-truth questions, use [`knowledge/INDEX.md`](knowledge/INDEX.md) instead of raw dump files.
4. For phase deliverables, write or update files inside `artifacts/phase-N/`.
5. For major decisions, update [`decisions/decision-log.md`](decisions/decision-log.md) and cross-link the affected artifact.

## App Quick Start

```bash
cd storefront
npm install
npm run dev
```

Open `http://localhost:3000`.

For the full local commerce stack, run the backend and storefront separately:

```bash
cd backend/medusa
npm install
npm run dev
```

```bash
cd storefront
npm install
npm run dev
```

Medusa runs on `http://localhost:9000`; the storefront runs on `http://localhost:3000`.

Useful app commands:

```bash
npm run lint
npm run build
```

Workspace hygiene command from the repo root:

```bash
npm run check:workspace
```

## Docker Quick Start

Docker is optional for everyday app work, but useful for verifying a reproducible stack with Postgres, Redis, Medusa, and the storefront.

```bash
docker compose build
docker compose up
```

Then open `http://localhost:3000`. The Medusa API is exposed at `http://localhost:9000`.

Public storefront values can be passed at build/runtime:

```bash
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_... \
NEXT_PUBLIC_MEDUSA_REGION_ID=reg_... \
docker compose up --build
```

## Workspace Map

| Path | Purpose |
|---|---|
| `storefront/` | Next.js storefront, admin pages, account flows, auth API routes, cart and checkout UI |
| `backend/medusa/` | Active Medusa v2 commerce backend (D-025) |
| `catalogs/` | Product catalog sources, SKU data, inventory tracker, TypeScript catalog module |
| `integrations/` | Airtable and Shiprocket integration notes and field maps |
| `knowledge/` | Curated project memory and reference docs; prefer this over `TPL DUMP/` |
| `artifacts/` | Approved and draft deliverables by execution phase |
| `agents/` | Individual agent cards and invocation context |
| `pods/` | Pod-level working areas and readmes |
| `assets/` | Brand, product, social, and creative assets or briefs |
| `design/` | Visual identity, wireframes, UI system, and design reviews |
| `docs/` | Architecture, tooling research, SOPs, and project-structure documentation |
| `handoffs/` | Agent-to-agent and phase-to-phase handoff records |
| `status/` | Current sprint, phase, and weekly status files |
| `templates/` | Standard artifact, handoff, decision, and phase-gate templates |
| `site-scrape/` | Site inventory and scrape references |
| `prototypes/` | HTML prototypes, roadmap views, and experimental screens |
| `TPL DUMP/` | Raw imported context; archive only, not the default working source |

## Operating Model

The project is managed through 6 phases:

1. Audit and truth-finding
2. Strategy and positioning
3. Creative and experience design
4. Build and merchandising implementation
5. Launch campaign
6. Optimization

Harley owns orchestration, Claire owns status hygiene, and Dan keeps final phase-gate authority. The complete roster lives in [`agents/README.md`](agents/README.md).

## Clean Structure Recommendation

Do not reorganize files blindly. The workspace contains raw imported history, active app code, approved artifacts, and living status documents. The recommended migration plan is documented in [`docs/POST-LAUNCH-RESTRUCTURE-PLAN.md`](docs/POST-LAUNCH-RESTRUCTURE-PLAN.md).

High-level target:

```text
apps/storefront/
services/commerce/
packages/catalog/
content/knowledge/
content/artifacts/
ops/status/
ops/decisions/
ops/handoffs/
brand/assets/
docs/
archive/raw-dumps/
```

## Maintenance Rules

- Prefer `knowledge/` for current truth and `TPL DUMP/` only for source tracing.
- Keep live code separate from planning docs.
- Keep generated experiments in `prototypes/` until promoted into `storefront/`.
- Update status and decisions when changing project direction.
- Avoid duplicating the same artifact in both root and `knowledge/`; link instead.
- Run `npm run check:workspace` before cleanup passes to catch duplicate copies, runtime files, root/knowledge duplication, and missing README files.
