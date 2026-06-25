# Agent Directory

All 25 agents across 9 pods. Each agent card contains: role, responsibilities, inputs, outputs, escalation rules, and invocation prompt.

## Quick Reference

| Pod | Agents | Focus |
|-----|--------|-------|
| [A — Command](pod-a/) | Harley, Claire, Maria | Program direction, coordination, research |
| [B — Strategy](pod-b/) | Weiss, Heyward, Jenna | Positioning, PMF, product architecture |
| [C — Product](pod-c/) | Shreyas, Andy | Catalog, merchandising, operations |
| [D — Creative](pod-d/) | Sean, Joanna, Kurt, Julie | Identity, copy, UX, UI |
| [E — Build/QA](pod-e/) | Tobi, James | Implementation, quality assurance |
| [F — Growth](pod-f/) | Nik, Avinash, Eli | Campaigns, performance, retention |
| [G — Marketing](pod-g/) | Andrew, Chase, Rachel | Launch, content, seeding |
| [H — Content](pod-h/) | Casey | Content production, asset briefs |
| [I — Ops/Finance](pod-i/) | Patrick, Raj, Tony, Lenny | Finance, logistics, ops, data |

## Invocation Protocol

To spawn an agent, start a new Claude Code session and paste the agent's invocation prompt from their card. All agents must:
1. Read their agent card fully before starting work
2. Read all relevant `knowledge/` docs cited in their card
3. Write all outputs to the correct `artifacts/phase-N/` path
4. Update `decisions/decision-log.md` for any material decisions
5. File a handoff record when passing work downstream

## Active Agents (Phase 4)

- **Tobi** — Platform build + integrations (blocked on Fynd credentials)
- **James** — QA environment prep
- **Dan** — Hero product photography + copy
