# REPO-MAP — The Product Lab Relaunch
<!-- last-updated: 2026-06-25 -->

**This is the single canonical text map of the workspace. Start here to navigate.**

Two companions, each with one job — don't duplicate them here:
- **[FILE-INDEX.html](FILE-INDEX.html)** — interactive browser for every file (search + preview). Open in a browser.
- **[docs/POST-LAUNCH-RESTRUCTURE-PLAN.md](docs/POST-LAUNCH-RESTRUCTURE-PLAN.md)** — the gated plan for the *future* `apps/services/packages/content/ops/brand` layout. Until that runs, the layout below is reality.

> Consolidation note (2026-06-25): this file replaces four overlapping maps. `docs/WORKSPACE-INDEX.md`
> and `docs/PROJECT-SCOPE-AND-STRUCTURE.md` are now pointer stubs that redirect here. Do not recreate them.

---

## Project Vitals

| Field | Value |
|-------|-------|
| **Company** | The Product Lab (theproductlab.in) |
| **Operator** | Dan (CEO — sole human, D-012) |
| **AI Director** | Harley (Program Director) |
| **Phase** | 4 — Build & Merchandising (ACTIVE) |
| **Platform** | **Medusa v2 backend + Next.js 16 storefront** (D-025 reversed Fynd/D-022) |
| **Infra (planned)** | Vercel (storefront) + Railway/Render/Fly (Medusa API) + Supabase Postgres + managed Redis |
| **Payments** | Razorpay (UPI + cards + wallets), COD via Shiprocket |
| **Shipping** | Shiprocket (multi-carrier) |
| **Notifications** | WhatsApp (Meta Cloud API primary — D-033/D-034) + Email (SMTP/Resend/SendGrid fallback) |
| **Analytics** | GA4 + Microsoft Clarity |
| **Primary Channel** | Instagram |
| **Brand** | **Light+Bold** — "Small objects. Big opinions." / "Wear your opinion." / *Find. Collect. Gift.* (D-018–D-021; supersedes Darkroom/D-015) |
| **Drop 1 scope** | Text-opinion stickers only; 67 published across 5 collections (D-028) |
| **Latest decision** | D-035 (`decisions/decision-log.md` is the running log) |
| **Budget rule** | No tool >₹5,000/month unless revenue-generating |

> Brand caution: the old **Darkroom** system (dark #1A1A1A background, D-015) is **dead**. Current visual system is
> Light+Bold (cream #F5F0EB base). Canonical specs: `artifacts/phase-4/visual-identity-rebrand.md`,
> `artifacts/phase-4/copy-system-rebrand.md`, `artifacts/phase-4/ui-system.md`.

---

## Current Directory Map (today's reality)

```
the-product-lab-relaunch/
│
├── CLAUDE.md / HARLEY.md / README.md   ← operating rules (read CLAUDE.md first, always)
├── REPO-MAP.md                         ← this file (canonical text map)
├── FILE-INDEX.html                     ← interactive file browser
│
├── Apps & services (nested git repos — excluded from root repo, see .gitignore)
│   ├── storefront/                     ← Next.js 16 storefront (16 routes, live on Medusa catalog)
│   ├── backend/medusa/                 ← Medusa v2 backend (active launch platform)
│   ├── backend/medusa-eval/            ← platform evaluation docs (reference)
│   └── mission-control-eval/           ← program dashboard app (own repo)
│
├── Knowledge & artifacts
│   ├── knowledge/                      ← curated source of truth (00–27 + INDEX); read 26-CURRENT-STATE every session
│   ├── artifacts/phase-{1..6}/         ← agent outputs by phase (1–3 approved; 4 active; 5–6 ready)
│   ├── catalogs/                       ← cleaned_catalog.json + catalog scripts
│   ├── site-scrape/ · prototypes/      ← scrape references · HTML explorations
│   └── TPL DUMP/                        ← raw source CSVs (catalog source — NOT dead; archive-only otherwise)
│
├── Agent OS (the program control plane)
│   ├── agents/ (25 cards, pod-a..pod-i) · pods/ (workspaces)
│   ├── decisions/decision-log.md (D-001..D-035) · handoffs/ · status/ · templates/
│   └── .claude/ (rules, settings.json hooks, agents, memory)
│
├── Brand & design
│   ├── design/  (visual identity, UI system, wireframes, reviews)
│   └── assets/  (brand tokens, product/social/creative)
│
├── Ops & integrations
│   ├── docs/ (ARCHITECTURE, GOVERNANCE, ops-sop/, research, this restructure plan)
│   └── integrations/ (Airtable, Shiprocket)
│
└── archive/ · scratch/                 ← deprecated/raw · temporary (safe to prune)
```

The **future** target layout (`apps/`, `services/`, `packages/`, `content/`, `ops/`, `brand/`) and the gated
migration to it live in **`docs/POST-LAUNCH-RESTRUCTURE-PLAN.md`** — not here.

---

## "I want to…" → go to

| I want to… | Go to |
|-------------|-------|
| Understand current program state | `knowledge/26-CURRENT-STATE.md` |
| Read operating rules | `CLAUDE.md` |
| See current status / blockers | `status/weekly-status.md` · `status/sprint-board.md` |
| Read all decisions | `decisions/decision-log.md` (D-001..D-035) |
| Browse every file interactively | `FILE-INDEX.html` |
| Spawn an agent | `agents/[pod]/[agent].md` (persona: `knowledge/02`, prompt: `knowledge/09`) |
| Check brand colours / type / logo | `assets/brand/brand-tokens.md` + `artifacts/phase-4/visual-identity-rebrand.md` |
| Read brand voice rules | `artifacts/phase-4/copy-system-rebrand.md` |
| Read the UI/component system | `artifacts/phase-4/ui-system.md` |
| See what Tobi is building | `artifacts/phase-4/technical-implementation-plan.md` · `artifacts/phase-4/deploy-checklist.md` |
| See the QA gate | `artifacts/phase-4/qa-checklist.md` (James owns sign-off) |
| Understand pricing / product structure | `artifacts/phase-2/pricing-framework.md` · `artifacts/phase-2/product-hierarchy.md` |
| See the Drop 1 catalog curation | `artifacts/phase-4/drop-1-merchandising-curation.md` |
| See the launch runbook | `artifacts/phase-5/launch-runbook.md` |
| Add a decision | `decisions/decision-log.md` (+ `templates/decision-entry.md`) |
| File a handoff | `handoffs/` (+ `templates/handoff-record.md`) |
| Plan the workspace restructure | `docs/POST-LAUNCH-RESTRUCTURE-PLAN.md` |

---

## Cleanliness Rules

1. New source-of-truth docs go in `knowledge/`, `docs/`, or the owning domain folder — **never the root**.
2. New app code goes inside the app/service that owns it (`storefront/`, `backend/medusa/`).
3. Tag new files by their **future** target domain (per the restructure plan) so the eventual move shrinks.
4. Raw imports and scrape outputs (`TPL DUMP/`, `site-scrape/`, `tpl ref/`) are references, not working documents.
5. `knowledge/` beats root duplicates. Do not delete a duplicate until a human confirms the canonical copy.
6. Do not move the nested git repos (`storefront/`, `backend/medusa/`, `mission-control-eval/`) without updating Docker/compose, deploy paths, and README links — see restructure plan §0.
7. Every active top-level folder should have a `README.md` naming its owner, purpose, and source of truth.
8. Decisions link to the artifact or code path they affect (`Source / Artifacts` column).

Run the hygiene check before any cleanup pass:

```bash
npm run check:workspace
```

---

## Locked Decisions — Quick Ref (full text in `decisions/decision-log.md`)

| Decision | What's Locked |
|----------|--------------|
| D-005 | Brand territory: "Small objects. Big opinions." + "Wear your opinion." |
| D-006 | Pricing: ₹149 floor; entry/core/premium/bundle tiers; free ship ₹499; COD min ₹299; prepaid −₹30 |
| D-007 | Pre-launch validation: 20+ gifts, 500+ subscribers, 10 posts, price test |
| D-011 | Scope: accessories only; TPL separate from YDS; production owned by TPL |
| D-012 | Solo operator: Dan alone + AI agents; everything executable by one person |
| D-018 / D-021 | Visual system: **Light+Bold** (cream #F5F0EB), supersedes Darkroom/D-015 |
| D-019 | Purchase mechanic: **Find. Collect. Gift.** drives all UX/copy |
| D-020 | Drop 1 = text-opinion stickers only; characters/artist platform → Drop 2 |
| D-025 | Launch platform: **Medusa + Next.js** (reverses Fynd/D-022) |
| D-028 | Drop 1 curation: 67 published / 5 collections; meets the ≥3-collections gate |
| D-030 / D-031 | Auth consolidated on Medusa (admin + customer), verified live |
| D-033 / D-034 | WhatsApp notifications (Meta Cloud API direct transport) |

**Change any locked decision → escalate to Dan first (CLAUDE.md operating rule 7).**
