# Knowledge Index

This index maps the relaunch workspace by purpose, source of truth, and likely reader. Use it before searching raw dumps.

## Fast Paths

| Need | Read |
|---|---|
| Project overview | [`../README.md`](../README.md) |
| Current state | [`26-CURRENT-STATE.md`](26-CURRENT-STATE.md), [`../status/sprint-board.md`](../status/sprint-board.md) |
| Live storefront app | [`../storefront/README.md`](../storefront/README.md) |
| Platform decision | [`../decisions/decision-log.md`](../decisions/decision-log.md), [`../backend/medusa-eval/README.md`](../backend/medusa-eval/README.md) |
| Folder cleanup plan | [`../docs/PROJECT-SCOPE-AND-STRUCTURE.md`](../docs/PROJECT-SCOPE-AND-STRUCTURE.md) |
| Agent roster | [`../agents/README.md`](../agents/README.md), [`13-EXPANDED-AGENT-ROSTER.md`](13-EXPANDED-AGENT-ROSTER.md) |
| Phase artifacts | [`../artifacts/`](../artifacts/) |
| Decision log | [`../decisions/decision-log.md`](../decisions/decision-log.md) |

## Workspace Sources

| Path | Purpose | Primary Readers |
|---|---|---|
| `../storefront/` | Active Next.js storefront and admin implementation | Tobi, James, Andy |
| `../backend/medusa-eval/` | Medusa + Supabase architecture/spike package | Tobi, Harley, Avinash |
| `../catalogs/` | Product catalog, SKUs, inventory, catalog module | Andy, Jenna, Patrick |
| `../integrations/` | Airtable and Shiprocket notes | Andy, Raj, Tobi |
| `../knowledge/` | Curated operating memory and source-of-truth docs | All agents |
| `../artifacts/` | Phase deliverables and approved outputs | All agents |
| `../agents/` | Individual agent cards | Harley, Claire |
| `../pods/` | Pod workspaces and operating notes | Pod leads |
| `../assets/` | Brand, product, creative, social assets and briefs | Sean, Julie, Casey, Rachel |
| `../design/` | Visual identity, UI system, wireframes, reviews | Sean, Kurt, Julie |
| `../status/` | Sprint and weekly status | Harley, Claire |
| `../handoffs/` | Phase and agent handoff records | Harley, Claire, downstream owners |
| `../templates/` | Standard artifact templates | All agents |
| `../TPL DUMP/` | Raw imported history; archive/reference only | Maria, Harley |

## Core Knowledge Documents

| Doc | Title | Purpose | Key Agents |
|---|---|---|---|
| `00` | Master Brief | Initiative mandate, goals, constraints, success metrics, 6-phase structure, governance | All agents |
| `01` | Agent Org Chart | Team design, pod structure, reporting lines, decision rights | Harley, Claire |
| `02` | Agent Personas | Persona definitions, voice, judgment patterns | All agents |
| `03` | Workflows | Cross-agent workflows, handoffs, execution patterns | Harley, Claire |
| `04` | Rituals and Cadence | Session rhythm, reviews, escalation rules | Harley, Claire |
| `05` | Prompts | Agent prompt templates and conventions | Harley |
| `06` | Deliverables By Phase | Expected outputs, owners, dependencies, acceptance criteria | All agents |
| `07` | Brand Relaunch Playbook | Relaunch strategy and launch plan | Heyward, Sean, Joanna, Nik |
| `08` | AI Agent Team | Capability mapping and collaboration model | Harley, Claire |
| `09` | AI Agent Prompts | Production system prompts | Harley, all agents |
| `10` | Agent Reference Model | Reference figure mapping and behavior models | All agents |
| `11` | Platform and Tooling | Platform decisions, integrations, tooling direction | Tobi, Kurt, Andy, Shreyas |
| `12` | Claude Code Runtime | Sub-agent architecture, file state, MCP mappings | Harley, Claire |
| `13` | Expanded Agent Roster | Full 25-agent roster, pods, outputs, authority | Harley, Claire |
| `14` | Agent Builder Spec | Agent construction manual and quality bar | Harley, Claire |

## Added Context And Consolidated Truth

| Doc | Title | Purpose | Key Agents |
|---|---|---|---|
| `15` | Handoff Intake | Cross-reference analysis, contradictions, open questions | Harley, Claire |
| `16` | Company Facts | Entity info, revenue, team, production, milestones | All agents |
| `17` | Production Costs | Material costs, unit economics, calculator data | Patrick, Jenna, Andy |
| `18` | Artist Platform | Revenue share, onboarding, drop mechanics | Nik, Rachel, Casey, Eli, Lenny |
| `19` | Tech Stack Legacy | WooCommerce, Airtable, n8n, migration context | Tobi, James, Andy, Avinash |
| `20` | Marketing Baseline | Current metrics, channels, budget, target KPIs | Nik, Andrew, Chase, Rachel |
| `20` | Company Profile Consolidated | Company profile and operating summary | All agents |
| `21` | Products/Pricing/Production Consolidated | Product, pricing, and manufacturing truth | Jenna, Andy, Patrick |
| `22` | Financials Consolidated | Financial baseline and performance context | Patrick, Harley |
| `23` | Tech Systems Consolidated | Current and future technology systems | Tobi, Avinash |
| `24` | Artist Platform Consolidated | Artist program model and activation notes | Nik, Rachel, Lenny |
| `25` | Agent Briefing Packages | Context packages for agent activation | Harley, Claire |
| `26` | Current State | Living program state; read at the start of each session | Harley, Claire, all active agents |

## App And Platform Docs

| File | Purpose |
|---|---|
| [`../storefront/README.md`](../storefront/README.md) | Storefront developer guide and route map |
| [`../storefront/ROUTES-INDEX.html`](../storefront/ROUTES-INDEX.html) | Human-readable route inventory |
| [`../backend/medusa-eval/README.md`](../backend/medusa-eval/README.md) | Medusa + Supabase platform decision package |
| [`../backend/medusa-eval/01-platform-decision.md`](../backend/medusa-eval/01-platform-decision.md) | CTO-level platform rationale |
| [`../backend/medusa-eval/02-target-architecture.md`](../backend/medusa-eval/02-target-architecture.md) | Target system architecture and ownership rules |
| [`../backend/medusa-eval/03-data-ownership.md`](../backend/medusa-eval/03-data-ownership.md) | Source-of-truth boundaries |
| [`../backend/medusa-eval/phase-0-technical-spike.md`](../backend/medusa-eval/phase-0-technical-spike.md) | Medusa proof-of-concept plan |
| [`../integrations/airtable/order-field-map.md`](../integrations/airtable/order-field-map.md) | Airtable order field mapping |
| [`../integrations/shiprocket/feasibility-notes.md`](../integrations/shiprocket/feasibility-notes.md) | Shiprocket feasibility notes |

## Artifact Map

| Phase | Status | Key Artifacts |
|---|---|---|
| 1 - Audit | Complete | Site teardown, customer insight, competitor research, problem statement, financials, logistics |
| 2 - Strategy | Complete | Brand positioning, product hierarchy, pricing framework, PMF assessment |
| 3 - Creative | Complete | Visual identity, copy system, UX/IA, UI system, hi-fi designs, asset list |
| 4 - Build | Active | Site build brief, technical plan, catalog/CMS workflow, analytics schema, QA checklist, ops docs |
| 5 - Launch | Planned/draft | Launch narrative, content calendar, seeding plan, email/WhatsApp flows, launch runbook |
| 6 - Optimize | Planned/draft | Optimization plan |

## Handoff Map

| File | From / To | Activates |
|---|---|---|
| `../handoffs/handoff-intake-pod-briefs.md` | Context intake to all pods | All pods |
| `../handoffs/phase-3-to-4-handoff.md` | Creative to Build | Tobi, James, Andy |
| `../handoffs/phase-4-to-5-handoff.md` | Build to Launch | Nik, Andrew, Chase, Rachel, Eli |
| `../handoffs/phase-5-to-6-handoff.md` | Launch to Optimize | Avinash, Eli, Nik |
| `../handoffs/2026-06-06-wired-mvp-handoff.md` | MVP handoff | Build and product owners |
| `../handoffs/2026-06-06-build-list-updated.md` | Updated build list | Tobi, James, Andy |

## Agent Session Context

When spawning an agent, Harley should inject only the minimum required context:

1. Agent card from `../agents/[pod]/[agent].md`
2. Persona from `02-AGENT-PERSONAS.md`
3. System prompt from `09-AI-AGENT-PROMPTS.md`
4. Current state from `26-CURRENT-STATE.md`
5. Relevant decisions from `../decisions/decision-log.md`
6. Phase deliverables from `06-DELIVERABLES-BY-PHASE.md`
7. Relevant handoff from `../handoffs/`
8. Upstream approved artifacts from `../artifacts/`
9. App/platform docs only when the task touches implementation

Agents should not read the entire workspace by default.
