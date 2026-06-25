# Post-Launch Workspace Restructure — Execution Plan

**Last updated:** 2026-06-25
**Status:** PLAN ONLY — do not execute until the gate below is met.
**Owner:** Harley (plan) / Dan (approval + the one manual step only he can do)

This is the deliberate, one-pass migration from the current flat layout to the target in
[PROJECT-SCOPE-AND-STRUCTURE.md](PROJECT-SCOPE-AND-STRUCTURE.md). It exists so the move is a
checklist, not an improvisation. Everything here is reversible; nothing here is safe to do casually.

---

## 0. Why this is gated (read first)

The workspace is path-dependent in ways that make a careless move destructive. Three hard blockers:

1. **The hook system references the moving folders AND is self-protected.**
   `.claude/settings.json` has hooks matching `Write(artifacts/**)`, `Write(decisions/**)`,
   `Write(handoffs/**)`, `Write(templates/**)`. If those folders move, the matchers silently stop
   firing. **And** a PreToolUse hook *blocks any agent edit to `.claude/**`* ("request Dan to make
   this change directly"). → **Only Dan can update the hook matchers.** No agent can. This is the
   single most important constraint: the migration cannot complete without Dan editing
   `.claude/settings.json` by hand.

2. **Nested Git repos + Docker/deploy paths.** `storefront/`, `backend/medusa/`, and
   `mission-control-eval/` are independent Git repos. `docker-compose.yml` / `.prod.yml` build from
   `./storefront` and `./backend/medusa`. Moving an app means updating compose files, deploy config,
   and the nested repo's own assumptions in lockstep.

3. **Absolute paths in code.** Backend seed scripts read catalog data by *absolute* path. Any moved
   data file referenced by absolute path must have every reader updated (we already hit this with
   `cleaned_catalog.json`).

### Gate — do NOT start until ALL are true
- [ ] Storefront has a passing production build.
- [ ] Launch is done (post Phase 4/5); not mid-build.
- [ ] Platform decision (Fynd vs Medusa, D-022/D-025) is settled enough that `backend/` isn't churning.
- [ ] Dan is available to make the one `.claude/settings.json` edit and approve.
- [ ] A full backup/snapshot of the workspace exists (Drive version history is not enough).

---

## 1. Target layout (canonical)

Per `PROJECT-SCOPE-AND-STRUCTURE.md`. Note: an older `WORKSPACE-INDEX.md` "Target Domains" table
proposes `growth/` and `commerce/` instead of `content/`+`packages/`. **Reconcile to the structure
below** and retire the competing one (see §6, step 7).

```text
the-product-lab-relaunch/
|-- apps/
|   |-- storefront/          # from storefront/
|   `-- mission-control/     # from mission-control-eval/ (if kept)
|-- services/
|   `-- commerce/            # from backend/medusa/ (only if promoted from spike)
|-- packages/
|   `-- catalog/             # from catalogs/
|-- content/
|   |-- knowledge/           # from knowledge/
|   |-- artifacts/           # from artifacts/
|   |-- site-scrape/         # from site-scrape/
|   `-- prototypes/          # from prototypes/
|-- ops/
|   |-- agents/  pods/  decisions/  handoffs/  status/  templates/
|-- brand/
|   |-- assets/              # from assets/
|   `-- design/              # from design/
|-- docs/                    # stays; add architecture/ ops-sop/ research/ subfolders
|-- integrations/            # stays; split airtable/ shiprocket/
|-- archive/
|   `-- raw-dumps/           # from TPL DUMP/
`-- scratch/                 # stays
```

---

## 2. Move map + lockstep cost

Reference counts are hardcoded path mentions found in `CLAUDE.md`, `.claude/rules/`,
`.claude/settings.json`, `FILE-INDEX.html`, `docker-compose*.yml`, `package.json` (measured 2026-06-25).
"Lockstep edits" = files that MUST change in the same commit/pass or things break.

| Move | Refs to fix | Lockstep edits (the non-negotiable ones) | Risk |
|---|---|---|---|
| `artifacts/` → `content/artifacts/` | **102** | `CLAUDE.md`, `.claude/rules/file-paths.md`, `.claude/rules/artifacts.md`, **`.claude/settings.json` hook matcher (Dan only)**, `FILE-INDEX.html`, `knowledge/artifact-map.md` | 🔴 High |
| `knowledge/` → `content/knowledge/` | **42** | `CLAUDE.md`, `.claude/rules/file-paths.md`, `FILE-INDEX.html`, all agent cards that cite knowledge files | 🔴 High |
| `backend/medusa/` → `services/commerce/` | **30** | `docker-compose.yml`, `docker-compose.prod.yml`, deploy config, nested-repo paths, absolute paths in seed scripts | 🔴 High |
| `agents/` → `ops/agents/` | **29** | `CLAUDE.md`, `FILE-INDEX.html`, `.claude/agents/*` if any reference sibling cards | 🔴 High |
| `handoffs/` → `ops/handoffs/` | **19** | `CLAUDE.md`, `.claude/rules/handoffs.md`, **settings.json hook matcher (Dan only)**, `FILE-INDEX.html` | 🟡 Med |
| `storefront/` → `apps/storefront/` | **16** | `docker-compose.yml`, `.prod.yml`, deploy/Vercel config, `package.json` workspace scripts | 🔴 High |
| `design/` → `brand/design/` | **16** | `CLAUDE.md`, `FILE-INDEX.html`, `artifact-map.md` | 🟡 Med |
| `decisions/` → `ops/decisions/` | **13** | `CLAUDE.md`, `.claude/rules/decisions.md`, **settings.json hook matcher (Dan only)**, `FILE-INDEX.html` | 🟡 Med |
| `status/` → `ops/status/` | **11** | `CLAUDE.md`, `.claude/rules/status.md`, `FILE-INDEX.html` | 🟡 Med |
| `templates/` → `ops/templates/` | **11** | `CLAUDE.md`, **settings.json hook matcher (Dan only)**, `FILE-INDEX.html` | 🟡 Med |
| `prototypes/` → `content/prototypes/` | **10** | `FILE-INDEX.html` (live-pages iframes), `CLAUDE.md` | 🟡 Med |
| `catalogs/` → `packages/catalog/` | ~6 | absolute paths in backend seed scripts + `.py` scripts (same class we just fixed) | 🟡 Med |
| `pods/` → `ops/pods/` | 1 | `CLAUDE.md` | 🟢 Low |
| `assets/` → `brand/assets/` | 0 | (verify storefront doesn't import from it) | 🟢 Low |
| `integrations/` (split only) | 0 | none external | 🟢 Low |
| `TPL DUMP/` → `archive/raw-dumps/` | **19 functional** | catalog `.py` scripts' `csv_path` (absolute), any doc linking the CSV | 🟡 Med — **NOT a dead dump; it's the catalog source CSV** |

> `site-scrape/` also has ~5 functional refs — update them when it moves under `content/`.

---

## 3. The order (dependencies matter)

Do low-blast-radius, self-contained moves first; touch the agent OS and apps last.

1. **Snapshot** the whole workspace (out-of-Drive copy).
2. **Green moves** (no config dependency): `pods/`, `assets/`, `integrations/` split, `TPL DUMP/`→`archive/raw-dumps/` (with `.py` `csv_path` updates).
3. **Brand**: `assets/` + `design/` → `brand/`. Update `CLAUDE.md`, `FILE-INDEX.html`, `artifact-map.md`.
4. **Content**: `knowledge/`, `artifacts/`, `site-scrape/`, `prototypes/` → `content/`. Heaviest doc churn (144 refs combined) — script the find/replace, then verify.
5. **Ops**: `agents/ pods/ decisions/ handoffs/ status/ templates/` → `ops/`.
   → **STOP. Hand to Dan**: he edits `.claude/settings.json` hook matchers
     (`artifacts/**`→`content/artifacts/**`, `decisions/**`→`ops/decisions/**`,
     `handoffs/**`→`ops/handoffs/**`, `templates/**`→`ops/templates/**`). Agents cannot do this.
6. **Packages**: `catalogs/` → `packages/catalog/`. Update backend absolute paths (same procedure as the 2026-06-25 catalog consolidation).
7. **Apps/services (last, riskiest)**: `storefront/`→`apps/storefront/`, optionally `backend/medusa/`→`services/commerce/`, `mission-control-eval/`→`apps/mission-control/`. Update docker-compose, deploy/Vercel, package scripts. Rebuild + redeploy to a preview before trusting it.
8. **Reconcile docs**: collapse `FILE-INDEX.html`, `REPO-MAP.md`, `WORKSPACE-INDEX.md`, `PROJECT-SCOPE-AND-STRUCTURE.md` into ONE map. Retire the rest to pointers.

Each step = its own pass: move → find/replace refs → run `npm run check:workspace` → spot-verify → only then next step.

---

## 4. Per-step verification

- After every move: `npm run check:workspace` must stay clean (no new duplicates/missing READMEs).
- After content/ops moves: grep for the OLD path across `*.md *.html *.json *.ts *.tsx` — must return **zero** outside `archive/`.
- After hook update (Dan): create a throwaway `content/artifacts/_hooktest.md` without a `last-updated` line → the PostToolUse warning must fire. Delete after.
- After apps/services moves: `docker compose config` parses, storefront `npm run build` passes, a preview deploy renders.
- Nested repos: confirm `.git` integrity inside each moved app (`git status` still works).

## 5. Rollback

- Every step is a `mv` + a find/replace. Reverse = move back + revert the same edits.
- Keep each step in its own commit (if Git is initialized at root by then) or its own archive snapshot.
- The §1 snapshot is the floor: worst case, restore wholesale.

## 6. Recommended pre-work (safe to do BEFORE the gate)

These reduce blast radius and can happen now, mid-build, with no risk:

- Initialize **Git at the workspace root** with the existing `.gitignore`. This alone gives the
  restructure an undo button it currently lacks — the biggest single safety upgrade.
- **Retire the duplicate indexes** down to one (keep `FILE-INDEX.html` OR a single `REPO-MAP.md`).
- **Tag new files by target domain now** (rule already in `WORKSPACE-INDEX.md` §Cleanliness Rules) so
  the future move shrinks.

## 7. What this plan deliberately does NOT do

- It does not move anything today. Execution is gated on §0.
- It does not delete; every "remove from root" is a move to its target or to `archive/`.
- It does not touch `.claude/settings.json` (agents are blocked; that step is Dan's).
- It does not resolve the Fynd-vs-Medusa platform question — `services/commerce/` is conditional on it.
</content>
