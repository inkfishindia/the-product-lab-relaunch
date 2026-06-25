---
path: status/**
---

# Status File Standards

Status files track program state across sessions.

1. **weekly-status.md** is the primary status file. Claire updates it at end of every session.

2. **Format.** Include: current phase, active workstreams with owners, blockers, decisions pending, next actions.

3. **Timestamp every update.** Use `## [YYYY-MM-DD]` section headers so the file serves as a time-ordered log.

4. **Be specific.** "Working on Phase 4" is not a status update. "Tobi building homepage (70% complete), James preparing QA checklist, blocking on product photography from Dan" is.

5. **Flag blockers.** Anything unresolved >24 hours gets an explicit blocker entry with owner and severity.
