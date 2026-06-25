# The Product Lab Claude Code Runtime

## 1. Architecture

Claude Code is the orchestration layer. You (Dan) talk to the Program Director (Harley). Harley spawns, coordinates, and reviews all other agents as sub-agents within Claude Code.

```
Dan (CEO / Owner)
  └── Harley (Program Director) ← main Claude Code session
        ├── Claire (Chief of Staff) ← sub-agent
        ├── Maria (Research Librarian) ← sub-agent + web search
        ├── Weiss (Customer Insight) ← sub-agent + web search
        ├── Heyward (Brand Strategist) ← sub-agent
        ├── Jenna (Merchandising) ← sub-agent
        ├── Shreyas (Product Manager) ← sub-agent
        ├── Andy (Catalog Ops) ← sub-agent + file system
        ├── Sean (Creative Director) ← sub-agent + Figma MCP
        ├── Joanna (Copy Strategist) ← sub-agent + file system
        ├── Kurt (UX/IA) ← sub-agent + Figma MCP
        ├── Julie (UI System) ← sub-agent + Figma MCP
        ├── Tobi (Frontend Build) ← sub-agent + code execution
        ├── James (QA) ← sub-agent + web fetch
        ├── Nik (Growth Launch) ← sub-agent + web search
        ├── Avinash (Analytics) ← sub-agent
        ├── Eli (Retention) ← sub-agent
        ├── Andrew (Performance Marketing) ← sub-agent
        ├── Chase (Email/SMS) ← sub-agent
        ├── Rachel (Social Media) ← sub-agent + Canva MCP
        ├── Casey (Content Production) ← sub-agent + Canva MCP
        ├── Patrick (Finance) ← sub-agent
        ├── Raj (Logistics) ← sub-agent + web search
        ├── Tony (Customer Support) ← sub-agent
        └── Lenny (Community) ← sub-agent
```

## 2. MCP Tool Mapping

Each agent gets access to specific MCP integrations based on their role:

| Agent | MCP Tools |
|---|---|
| Maria, Weiss, Raj | Web Search, Web Fetch (research) |
| Sean, Kurt, Julie | Figma (design read/write) |
| Rachel, Casey | Canva (asset creation) |
| Joanna, Andy | File system (write deliverables) |
| Tobi | File system + Bash (code), Vercel (deploy) |
| James | Web Fetch (site testing) |
| Harley, Claire | Notion (project management), Slack (comms) |
| Chase | Gmail (email drafts/review) |
| All agents | File system read (access briefs and artifacts) |

## 3. Agent Invocation Pattern

When Harley needs to activate an agent, it spawns a sub-agent with:

1. **System prompt** — the agent's full persona from 13-EXPANDED-AGENT-ROSTER.md + operating prompt from 09-AI-AGENT-PROMPTS.md
2. **Context injection** — relevant approved decisions, upstream artifacts, current phase
3. **Explicit task** — one clear ask with expected output format
4. **Constraints** — scope limits, platform constraints, budget constraints

### Example: Spawning Weiss for customer research

```
Agent: Weiss — Customer Insight Lead
Phase: 1 — Audit and Truth-Finding
Reference inheritance: Emily Weiss layer

Context:
- Project: The Product Lab relaunch (theproductlab.in)
- Platform: Commerce.com (Fynd)
- Market: India
- Category: Lifestyle products, expressive objects, gifting

Task:
Audit theproductlab.in. Mine all visible customer reviews, social comments,
and product feedback. Produce a customer insight pack with:
1. Customer language patterns
2. Purchase motivations
3. Common objections
4. Product attachment patterns
5. Strategic implications

Constraints:
- Use only publicly available data
- Separate evidence from interpretation
- Flag where evidence is thin
```

## 4. Artifact Storage

All agent outputs are written to the project directory:

```
the-product-lab-relaunch/
├── 00-13 (system docs — already exist)
├── artifacts/
│   ├── phase-1/
│   │   ├── site-audit.md
│   │   ├── customer-insight-pack.md
│   │   ├── competitor-scan.md
│   │   ├── baseline-metrics.md
│   │   └── logistics-baseline.md
│   ├── phase-2/
│   │   ├── positioning-statement.md
│   │   ├── audience-segmentation.md
│   │   ├── message-architecture.md
│   │   ├── category-hierarchy.md
│   │   ├── pricing-strategy.md
│   │   └── brand-narrative.md
│   ├── phase-3/
│   │   ├── visual-territory.md
│   │   ├── sitemap.md
│   │   ├── wireframes/
│   │   ├── identity-system.md
│   │   ├── copy-deck.md
│   │   └── content-production-plan.md
│   ├── phase-4/
│   │   ├── technical-architecture.md
│   │   ├── catalog-data/
│   │   ├── build-status.md
│   │   ├── qa-report.md
│   │   └── analytics-schema.md
│   ├── phase-5/
│   │   ├── launch-plan.md
│   │   ├── channel-calendar.md
│   │   ├── email-flows.md
│   │   ├── social-calendar.md
│   │   ├── ad-creative-briefs.md
│   │   └── launch-runbook.md
│   └── phase-6/
│       ├── performance-review.md
│       ├── optimization-backlog.md
│       ├── retention-plan.md
│       └── community-strategy.md
├── decisions/
│   └── decision-log.md
├── handoffs/
│   └── (agent-to-agent handoff records)
└── status/
    └── weekly-status.md
```

## 5. Parallel Execution Rules

Claude Code can run multiple sub-agents in parallel when their work is independent.

### Safe to parallelize
- Maria (research) + Weiss (customer mining) in Phase 1
- Sean (visual) + Joanna (copy) after strategy approval
- Kurt (UX) + Julie (UI) after page goals are stable
- Andrew (ads) + Chase (email) + Rachel (social) in launch prep
- Patrick (pricing) + Raj (logistics) baselines in Phase 1

### Must run sequentially
- Weiss → Heyward (insight before strategy)
- Heyward → Sean (strategy before creative)
- Kurt → Tobi (UX before build)
- Tobi → James (build before QA)
- All strategy → Nik (strategy before launch plan)

## 6. Review and Approval Flow in Claude Code

1. Sub-agent produces artifact → writes to `artifacts/phase-N/`
2. Harley reviews the artifact in the main session
3. Harley approves, requests revision, or rejects
4. Decision is logged to `decisions/decision-log.md`
5. Approved artifact is handed off to the next agent with explicit context

### Approval format
```
Decision: [approved / revise / rejected]
Artifact: [name]
Agent: [who produced it]
Reason: [short explanation]
Changes required: [list if revise]
Next agent: [who receives this]
Next action: [explicit ask]
```

## 7. Session Management

Each major work session should:

1. Start with Claire summarizing current state, blockers, and pending decisions
2. Harley deciding what to activate
3. Relevant agents spawned with full context
4. Outputs reviewed before session ends
5. Claire updating status and decision log

### Context preservation between sessions

Between Claude Code sessions, state is preserved through:
- Written artifacts in the file system
- Decision log
- Weekly status notes
- Phase-specific deliverable folders

No agent should rely on conversation memory. Everything is file-based.

## 8. Human Touchpoints

Dan (you) intervenes at:

| Touchpoint | When |
|---|---|
| Phase gate approval | End of each phase — Harley presents, you decide go/no-go |
| Budget decisions | Any tool or spend commitment over ₹5,000/month |
| Brand position sign-off | Phase 2 exit — final positioning choice |
| Visual direction sign-off | Phase 3 — creative territory selection |
| Launch date confirmation | Phase 5 entry — go-live commitment |
| Pricing approval | Before any pricing goes live |
| Content tone check | First batch of copy and social content |

Everything else is agent-autonomous.

## 9. Error Handling

If an agent produces weak or off-target work:

1. Harley identifies the failure mode (wrong inputs? wrong scope? poor quality?)
2. If inputs were wrong → fix upstream and re-run
3. If scope was wrong → Claire redefines the task
4. If quality was poor → Harley revises the prompt with sharper constraints
5. If the agent is fundamentally misaligned → rebuild the agent prompt

No agent is allowed to silently change upstream decisions. If an agent disagrees with an approved decision, it must escalate to Harley, not work around it.
