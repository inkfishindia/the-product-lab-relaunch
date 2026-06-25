# REPO-MAP — The Product Lab Relaunch
<!-- last-updated: 2026-03-26 -->

Complete directory and file index. Start here to navigate the project.

---

## Project Vitals

| Field | Value |
|-------|-------|
| **Company** | The Product Lab (theproductlab.in) |
| **Operator** | Dan (CEO — sole human) |
| **AI Director** | Harley (Program Director) |
| **Phase** | 4 — Build & Merchandising (ACTIVE) |
| **Platform** | Commerce.com (Fynd) |
| **Payments** | Razorpay (UPI + cards + COD) |
| **Shipping** | Shiprocket |
| **Analytics** | GA4 + Microsoft Clarity |
| **Primary Channel** | Instagram |
| **Brand Position** | "Small objects. Big opinions." / "Wear your opinion." |
| **Budget Rule** | No tool >₹5,000/month |

---

## 🗺️ Directory Map

```
the-product-lab-relaunch/
│
├── CLAUDE.md               ← Operating rules (read first, always)
├── HARLEY.md               ← Program Director operating brief
├── REPO-MAP.md             ← This file — full directory index
├── README.md               ← Project overview
│
├── knowledge/              ← Source of truth docs (00–25 + INDEX)
│   ├── INDEX.md            ← Master knowledge index
│   ├── 00-MASTER-BRIEF.md
│   ├── 01-AGENT-ORG-CHART.md
│   ├── 02-AGENT-PERSONAS.md
│   ├── ... (03–14, planning docs)
│   ├── 15-HANDOFF-INTAKE.md
│   ├── 16-COMPANY-FACTS.md
│   ├── 17-PRODUCTION-COSTS.md
│   ├── 18-ARTIST-PLATFORM.md
│   ├── 19-TECH-STACK-LEGACY.md
│   ├── 20-MARKETING-BASELINE.md
│   ├── 20-TPL-COMPANY-PROFILE-CONSOLIDATED.md
│   ├── 22-TPL-FINANCIALS-CONSOLIDATED.md
│   ├── 23-TPL-TECH-SYSTEMS-CONSOLIDATED.md
│   ├── 24-TPL-ARTIST-PLATFORM-CONSOLIDATED.md
│   └── 25-AGENT-BRIEFING-PACKAGES.md
│
├── agents/                 ← All 25 agent cards with invocation prompts
│   ├── README.md           ← Quick lookup table
│   ├── pod-a/              ← Command: harley.md, claire.md, maria.md
│   ├── pod-b/              ← Strategy: weiss.md, heyward.md, jenna.md
│   ├── pod-c/              ← Product: shreyas.md, andy.md
│   ├── pod-d/              ← Creative: sean.md, joanna.md, kurt.md, julie.md
│   ├── pod-e/              ← Build: tobi.md, james.md
│   ├── pod-f/              ← Growth: nik.md, avinash.md, eli.md
│   ├── pod-g/              ← Marketing: andrew.md, chase.md, rachel.md
│   ├── pod-h/              ← Content: casey.md
│   └── pod-i/              ← Ops/Finance: patrick.md, raj.md, tony.md, lenny.md
│
├── artifacts/              ← All agent outputs, by phase
│   ├── phase-1/            ← Audit outputs (11 files, all approved)
│   ├── phase-2/            ← Strategy outputs (4 files, all approved)
│   ├── phase-3/            ← Creative outputs (7 files, all approved)
│   ├── phase-4/            ← Build outputs (3 files, draft — Tobi/James)
│   ├── phase-5/            ← Campaign outputs (5 files, draft — planned ahead)
│   └── phase-6/            ← Optimization outputs (1 file, draft — planned)
│
├── decisions/
│   └── decision-log.md     ← All 17 decisions (D-001 through D-017)
│
├── handoffs/               ← Agent-to-agent transfer records
│   ├── phase-1-to-2-handoff.md      (H-001)
│   ├── phase-2-to-3-handoff.md      (H-002)
│   ├── phase-3-to-4-handoff.md      (H-003, exists)
│   ├── phase-4-to-5-handoff.md      (H-004, exists)
│   ├── phase-5-to-6-handoff.md      (H-005, planned)
│   └── handoff-intake-pod-briefs.md
│
├── status/                 ← Live project state
│   ├── weekly-status.md    ← Master status (last updated 2026-03-26)
│   ├── sprint-board.md     ← Task board (blocked / in progress / done)
│   └── phase-tracker.md    ← Phase-by-phase progress dashboard
│
├── templates/              ← Standard formats (NEVER modify originals)
│   ├── artifact-header.md
│   ├── decision-entry.md
│   ├── handoff-record.md
│   └── phase-gate-review.md
│
├── assets/                 ← Brand assets
│   ├── README.md           ← Asset overview and status
│   ├── brand/              ← brand-tokens.md (colors, type, logo specs)
│   ├── product/            ← Product photography (EMPTY — Dan to shoot)
│   ├── social/             ← social-templates-brief.md (Canva execution)
│   └── creative/           ← seeding-kit-brief.md + campaign assets
│
├── pods/                   ← Pod working spaces (scratch + notes)
│   ├── pod-a-command/
│   ├── pod-b-strategy/
│   ├── pod-c-product/
│   ├── pod-d-creative/
│   ├── pod-e-build/
│   ├── pod-f-growth/
│   ├── pod-g-marketing/
│   ├── pod-h-content/
│   └── pod-i-ops/
│
├── scripts/
│   └── README.md           ← How to invoke agents, quick lookup, phase gate commands
│
├── docs/
│   └── ARCHITECTURE.md     ← System architecture doc
│
├── scratch/                ← Temporary working notes (session-level only)
│
└── TPL DUMP/               ← Original source material from Dan's prior Claude projects
    ├── TPL optimizer- claude/
    ├── TPL IG-claude/
    └── TPL CEO - claude/
```

---

## 🔑 Key Files by Use Case

| I want to... | Go to |
|-------------|-------|
| Understand current project state | `status/weekly-status.md` |
| See what's blocked right now | `status/sprint-board.md` |
| See phase-by-phase progress | `status/phase-tracker.md` |
| Spawn an agent | `agents/[pod]/[agent].md` → copy invocation prompt |
| Know what agent to use | `agents/README.md` or `scripts/README.md` |
| Read all decisions made | `decisions/decision-log.md` |
| Check a brand color or font | `assets/brand/brand-tokens.md` |
| Read the brand voice rules | `artifacts/phase-3/copy-system.md` |
| Read the visual identity | `artifacts/phase-3/visual-identity.md` |
| See what Tobi needs to build | `artifacts/phase-4/technical-implementation-plan.md` |
| See the QA checklist | `artifacts/phase-4/qa-checklist.md` |
| See the launch runbook | `artifacts/phase-5/launch-runbook.md` |
| Understand the pricing rules | `artifacts/phase-2/pricing-framework.md` |
| Understand the product structure | `artifacts/phase-2/product-hierarchy.md` |
| See what assets Dan needs to make | `artifacts/phase-3/asset-list.md` |
| Add a new decision | `decisions/decision-log.md` (log table + template from `templates/decision-entry.md`) |
| File a handoff | `handoffs/` + use `templates/handoff-record.md` |
| Run a phase gate review | `templates/phase-gate-review.md` |

---

## 🔴 Active Blockers (as of 2026-03-26)

1. **Fynd credentials** — Tobi cannot start the platform build without Commerce.com store access. Dan must provide this.
2. **Hero product photography** — Dan must shoot dark-background product photos. Brief in `artifacts/phase-3/asset-list.md`.
3. **Hero product copy** — Core descriptions for card stickers, lapel pins, No Filter items. Voice rules in `artifacts/phase-3/copy-system.md`.

---

## 📋 What Can Start Right Now (No Blockers)

| Task | Agent | Artifact |
|------|-------|---------|
| Write 10 pre-launch post captions | Casey | pods/pod-h-content/ → artifacts/phase-5/ |
| Build email/WhatsApp flows in Klaviyo | Eli | artifacts/phase-5/email-whatsapp-flows.md |
| Finalize seeding recipient list | Rachel | artifacts/phase-5/seeding-plan.md |
| Sharpen launch runbook | Andrew + Tony | artifacts/phase-5/launch-runbook.md |
| Seeding kit design execution | Dan + Casey | assets/creative/ |

---

## ✅ Locked Decisions Quick Ref

| Decision | What's Locked |
|----------|--------------|
| D-005 | Brand territory: "Small objects. Big opinions." + "Wear your opinion." |
| D-006 | Pricing: ₹149 floor, entry/core/premium/bundle tiers, free ship ₹499 |
| D-007 | Pre-launch validation: 30+ gifts, 500 subscribers, 10 posts, price test |
| D-011 | Scope: accessories only, TPL separate from YDS, Cunningham Road store open |
| D-012 | Solo operator: Dan alone, no staff, AI handles strategy/creative/analytics |
| D-014 | Operating model: build systems first, then hire one person |
| D-015 | Visual direction: Darkroom hybrid, #1A1A1A/#F5F0EB/#E63B2E/#F2D024, Barlow Condensed + Inter |
| D-016 | Phase 3 gate: PASSED. GO for Phase 4. |
| D-017 | Phase 4 activated. Tobi leads build. |

**Change any of the above → escalate to Dan first.**
