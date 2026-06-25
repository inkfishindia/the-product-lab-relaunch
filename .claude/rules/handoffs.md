---
path: handoffs/**
---

# Handoff File Standards

Every file in `handoffs/` records an agent-to-agent transfer of work.

1. **Use the template.** Copy format from `templates/handoff-record.md`. Every handoff must include: from agent, to agent, artifact(s) delivered, quality assessment, instructions for receiver.

2. **from:/to: fields required.** The PostToolUse hook validates these exist. Include `from:` and `to:` in the file body.

3. **Reference actual artifact paths.** Link to the specific file(s) in `artifacts/phase-N/` being handed off. Do not reference files that do not exist.

4. **Phase-to-phase handoffs.** Name as `phase-N-to-M-handoff.md`. These are master handoff briefs for phase transitions.

5. **Agent-to-agent handoffs.** Name as `YYYY-MM-DD-[from]-to-[to].md` for specific artifact transfers within a phase.

6. **Quality must be honest.** If an artifact is incomplete, say so. A misleading handoff wastes the receiving agent's time.

7. **Approval status.** All handoffs default to "Pending review" until Harley or Dan approves.
