<!-- last-updated: 2026-06-11 -->
# Build Brief — TPL Mission Control Dashboard

**from:** Harley (Program Director)
**to:** Tobi (Frontend Build Lead)
**Date:** 2026-06-11
**Phase:** 4 — Build
**Status:** ⛔ SHELVED 2026-06-11 — do NOT build. Superseded by the decision to trial the
real Mission Control tool (builderz-labs/mission-control) read-only as the live cockpit instead
of a static HTML board. See `mission-control-eval/EVALUATION-FOR-TPL.md`. This static spec is
retained only as a fallback if the live tool is rejected at the Day-30 review.
**Reviewer:** Harley

---

## What this is

The single shared cockpit that **Dan, Colin, and every agent** read to see program state at a
glance. It is not a new product — it is an **upgrade of the existing**
`prototypes/command-center.html` (built 2026-06-06, 7 sections, real data) into a tight,
7-panel "Mission Control" wired to the project's real source-of-truth files.

Goal: one honest screen that answers "what's done, what's blocked, what's waiting on Dan, and
are we winning" — without anyone reading ten markdown files.

## Why (the management logic)

Each panel maps to a decision Harley makes every session. Panels 1–3 decide *what moves*;
panel 4 is the gate to spend; 5 is load-balancing; 6 is the only thing that matters post-launch;
7 keeps everyone honest about decision drift. See `knowledge/27-OPERATING-CHARTER.md` for the
full doctrine this dashboard operationalizes.

---

## The 7 panels

| # | Panel | Must show | Source of truth (file) |
|---|-------|-----------|------------------------|
| 1 | **Phase & Gate** | Current phase; the exact Phase-4 gate criteria as a checklist; count checked/total | `knowledge/26-CURRENT-STATE.md` → "Phase 4 gate criteria" |
| 2 | **Blockers** | The 3 standing Dan-dependencies; owner; what each unblocks; link to its unblocker tool | `knowledge/26-CURRENT-STATE.md` → "Current Blockers" table |
| 3 | **Dan's Decision Queue** | Only items that need Dan: the 6 escalation items + any [PROPOSED] decision (e.g. D-024) | `knowledge/27-OPERATING-CHARTER.md` + `decisions/decision-log.md` |
| 4 | **Pre-Launch Validation (D-007)** | Live counters with progress bars: gifts _/20 · transactions _/10 · posts _/10 · subscribers _/500 | D-007 (targets) — counts entered manually until live |
| 5 | **Agent Board** | Each agent's status (active / ready / complete), grouped by pod | `knowledge/26-CURRENT-STATE.md` → "Agent Activation Status" |
| 6 | **KPI strip** (dim until launch) | Revenue · conversion vs target 1.5–2.5% · AOV vs ₹350+ · subscribers vs 500 | `artifacts/phase-6/optimization-plan.md` (targets); GA4 (live values, post-launch) |
| 7 | **Decision Feed** | Latest 5 decisions, newest first, with D-NNN + status + one-line | `decisions/decision-log.md` |

---

## Tech constraints

- **Single self-contained HTML file.** No build step, no framework, no external runtime deps
  (matching the existing `command-center.html` and `FILE-INDEX.html` pattern). Opens in any
  browser by double-click. Inline CSS/JS only; web fonts via CDN are fine.
- **Lives in the repo** at `prototypes/command-center.html` (replace/extend in place) so it is
  version-controlled and always reflects committed state.
- **Brand: Light+Bold** (D-018/D-021) — cream base `#F5F0EB`, Barlow Condensed headings + Inter
  body. Do NOT use the old Darkroom dark theme. Match tokens in `artifacts/phase-4/ui-system.md`.
- **Mobile-readable.** Dan checks this on his phone. Panels stack cleanly under ~768px.
- **Data approach:** values may be hardcoded constants in a JS block at the top of the file
  (clearly labelled, one object per panel) since the source files are markdown, not an API.
  The point is one editable place per panel. If you can `fetch()` and parse the markdown tables
  client-side instead, even better — but don't over-engineer; honesty beats automation.

## Refresh discipline (the part that makes it not-useless)

A dashboard nobody updates is just a prettier stale-state problem (which is exactly the bug we
just fixed in `26-CURRENT-STATE.md`). So:

- The dashboard's data constants are reconciled by **Harley at every session-end**, in the same
  pass that updates `26-CURRENT-STATE.md` and `.claude/memory/SHARED.md`.
- Add a visible `Last reconciled: YYYY-MM-DD` stamp at the top so anyone can see if it's stale.

## Acceptance criteria

- [ ] All 7 panels present and populated with current real data (not lorem/placeholder).
- [ ] Light+Bold theme, not Darkroom.
- [ ] Readable and usable on a phone (panels stack, text legible, no horizontal scroll).
- [ ] One clearly-labelled edit point per panel for fast manual reconciliation.
- [ ] `Last reconciled` date stamp visible at top.
- [ ] Opens correctly by double-clicking the file with no server/build.
- [ ] Linked from `FILE-INDEX.html` Live Pages and `knowledge/26-CURRENT-STATE.md`.

## References

- Existing dashboard to upgrade: `prototypes/command-center.html`
- Operating doctrine behind the panels: `knowledge/27-OPERATING-CHARTER.md`
- Live program state (panel data): `knowledge/26-CURRENT-STATE.md`
- Decisions: `decisions/decision-log.md`
- UI tokens / components: `artifacts/phase-4/ui-system.md`
