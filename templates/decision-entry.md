# Decision Entry Template

## D-{NNN}: {Decision Title}

| Field | Value |
|-------|-------|
| **Date** | YYYY-MM-DD |
| **Decision ID** | D-{NNN} |
| **Decision** | {One-sentence statement of what was decided} |
| **Context** | {Why this decision was needed — what problem or question triggered it} |
| **Alternatives Considered** | {List other options that were evaluated} |
| **Rationale** | {Why this option was chosen over alternatives} |
| **Impact** | {What changes as a result — downstream effects on agents, artifacts, timeline} |
| **Linked Artifacts** | {List of artifact paths this decision affects, e.g. `artifacts/phase-4/site-build-brief.md`} |
| **Linked Knowledge** | {List of knowledge/* paths this decision connects to, e.g. `knowledge/16-COMPANY-FACTS.md`} |
| **Owner** | {Who owns execution of this decision} |
| **Reviewer** | {Who reviewed/approved — Harley or Dan} |
| **Reversibility** | easy / medium / hard |
| **Status** | active / superseded |

### Notes

{Any additional context, links to artifacts, or conditions under which this decision should be revisited.}

### Cross-Reference Update

When adding or updating a decision entry, you MUST also update:
1. The log table at the top of `decisions/decision-log.md`
2. `knowledge/CROSS-REFERENCE-MAP.md` §1 (Decisions → Artifacts Affected)
3. `knowledge/CROSS-REFERENCE-MAP.md` §2 (Artifacts → Source Decisions) for each linked artifact
