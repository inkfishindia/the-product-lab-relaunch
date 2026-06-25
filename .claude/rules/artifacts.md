---
path: artifacts/**
---

# Artifact File Standards

Every file created in the `artifacts/` directory must follow these rules:

1. **Standard header required.** Use the format from `templates/artifact-header.md`. Every artifact must include: Title, Phase, Producing Agent, Date, Status, and Reviewer.

2. **Last-updated timestamp.** Include `<!-- last-updated: YYYY-MM-DD -->` within the first 5 lines of the file. Update this timestamp on every revision.

3. **Producing agent and phase.** Every artifact must identify which agent produced it and which phase it belongs to. Do not create artifacts without this attribution.

4. **Draft until reviewed.** All artifacts start with `Status: draft`. Only the designated reviewer (Harley or Dan) can change status to `review` or `approved`. The producing agent must never self-approve.

5. **File location.** Place artifacts in the correct phase subdirectory: `artifacts/phase-{N}/{filename}.md`. Do not place artifacts in the root artifacts/ directory.
