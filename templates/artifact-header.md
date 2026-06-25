# Artifact Header Template

Use this header at the top of every artifact file produced by any agent.

---

```markdown
<!-- last-updated: YYYY-MM-DD -->
# {Artifact Title}

| Field | Value |
|-------|-------|
| **Phase** | {N} — {Phase Name} |
| **Producing Agent** | {Agent Name} ({Role}) |
| **Date** | YYYY-MM-DD |
| **Status** | draft / review / approved |
| **Reviewer** | {Harley or Dan} |
```

---

**Rules:**
- The `<!-- last-updated -->` comment must appear within the first 5 lines of the file.
- Status begins as `draft` and remains so until the designated reviewer approves it.
- Only Harley or Dan can change status to `approved`.
- The producing agent must update the `last-updated` timestamp whenever the artifact is revised.
