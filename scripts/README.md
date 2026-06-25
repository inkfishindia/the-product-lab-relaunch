# Scripts & Invocation Guide

How to work with the TPL agent system.

For the full project map, see `../README.md`. For the current workspace index and hygiene rules, see `../docs/WORKSPACE-INDEX.md`. For the clean folder-structure recommendation, see `../docs/PROJECT-SCOPE-AND-STRUCTURE.md`.

## Workspace Hygiene Check

Run this from the repo root before any cleanup or migration pass:

```bash
npm run check:workspace
```

The check reports nested Git repos, local runtime files, duplicate copy artifacts, root files duplicated in `knowledge/`, active folders missing README files, large top-level folders, and target structure folders that have not been created yet.

## Spawn Any Agent

1. Open a new Claude Code session (or new Cowork conversation)
2. Copy the agent's invocation prompt from `agents/[pod]/[agent].md`
3. Paste as first message - the agent loads its context and begins work
4. Save all outputs to `artifacts/phase-N/[filename].md`
5. File a handoff record in `handoffs/` when done

## Quick Agent Lookup

| I need to... | Spawn this agent |
|-------------|-----------------|
| Know current project status | Harley (you are Harley) |
| Track tasks and blockers | Claire |
| Research competitors / market | Maria |
| Customer insight and strategy | Weiss |
| Brand positioning work | Heyward |
| Product catalog structure | Jenna |
| PMF and growth strategy | Shreyas |
| Catalog operations in Fynd | Andy |
| Visual identity / art direction | Sean |
| Brand voice and copy | Joanna |
| UX and site architecture | Kurt |
| UI specs and component design | Julie |
| Platform/app build (storefront, Fynd/Medusa, Razorpay, etc.) | Tobi |
| QA and launch gating | James |
| Launch campaign strategy | Nik |
| Analytics and GA4 | Avinash |
| Email/WhatsApp retention flows | Eli |
| Launch campaign execution | Andrew |
| Content calendar and strategy | Chase |
| Seeding and community | Rachel |
| Content writing and captions | Casey |
| Finance and unit economics | Patrick |
| Logistics and fulfillment | Raj |
| Day-to-day operations and SOPs | Tony |
| Reporting and dashboards | Lenny |

## Phase Gate Command

To run a phase gate review, spawn Harley with:

```
You are Harley. Run a phase gate review for Phase [N].

Read:
- status/weekly-status.md
- All artifacts/phase-[N]/*.md
- decisions/decision-log.md
- templates/phase-gate-review.md

Check: are all required artifacts present and approved? Are blockers resolved? Output the gate review to artifacts/phase-[N]/phase-gate-review.md.
```

## New Decision Log Entry

When adding a decision to `decisions/decision-log.md`:

1. Get next ID (current highest + 1)
2. Add one-liner to the table at top
3. Create full entry file using `templates/decision-entry.md` if it's a complex decision
4. Tag all impacted agents in the entry

## Session Start Ritual (Claire)

Start every working session with:

```
You are Claire. Run the session start ritual.

Read:
- status/sprint-board.md
- status/weekly-status.md
- handoffs/ (all files, check for unprocessed handoffs)

Report: what's blocked, what's in progress, what's ready to start. Update sprint-board.md.
```

## File Paths Quick Reference

```
knowledge/           -> Source of truth docs (never delete)
artifacts/phase-N/   -> Agent outputs (N = 1-6)
storefront/          -> Active Next.js storefront app
backend/medusa-eval/ -> Medusa + Supabase platform decision package
catalogs/            -> Catalog and inventory source files
decisions/           -> Decision log
handoffs/            -> Agent-to-agent transfers
status/              -> Project state
templates/           -> Standard formats (never modify)
agents/              -> Agent cards (this system)
assets/              -> Brand assets
pods/                -> Pod working scratch space
scratch/             -> Temporary working notes
```
