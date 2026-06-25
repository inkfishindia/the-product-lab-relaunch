---
path: decisions/**
---

# Decision Log Standards

The decision log at `decisions/decision-log.md` is append-only.

1. **Use the template.** Follow format from `templates/decision-entry.md`. Every entry needs: D-NNN ID, decision statement, context, rationale, impact, owner, reversibility.

2. **D-NNN identifier required.** The PostToolUse hook validates this. Number sequentially from the last entry.

3. **Never modify existing entries.** To reverse or amend a decision, create a new entry that references the original (e.g., "Supersedes D-012").

4. **Locked decisions.** Decisions listed in CLAUDE.md under "Locked Decisions" are final. Any agent that questions them must escalate to Harley, not act unilaterally.

5. **Who can decide what.** Each agent's definition specifies their decision rights. Decisions outside an agent's scope must be escalated.

6. **Material decisions only.** Log decisions that affect scope, strategy, design, timeline, budget, or agent output approval. Do not log routine task completion.
