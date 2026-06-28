# The Product Lab AI Agent Team

## 1. Purpose

This document converts the human-inspired relaunch organization into an executable AI team. The goal is not to create many clever agents. The goal is to create a controlled system in which each agent has a narrow, useful mandate, explicit interfaces, and a predictable review path.

The AI team should help the business move from research through strategy, design, build, launch, and optimization with minimal ambiguity. It should not behave like a brainstorming room full of overlapping generalists.

This team should also inherit its judgment model from the reference-layer defined in [10-AGENT-REFERENCE-MODEL.md](/Users/dan/Library/CloudStorage/GoogleDrive-danish@yourdesignstore.in/My%20Drive/market/dan/the-product-lab-relaunch/10-AGENT-REFERENCE-MODEL.md#L1). The reference layer determines what each agent borrows from real-world operators and how those traits translate into useful behavior.

## 2. Operating Principle

Every agent should satisfy five conditions:

- it owns a distinct problem type
- it has known inputs and required outputs
- it has explicit decision limits
- it knows who reviews its work
- it knows when to escalate instead of improvising

The team should default to sequential orchestration with selective parallelization. Any work that depends on settled meaning or hierarchy should wait until the upstream decision is stable.

## 3. AI Team Layers

### Layer A: Command and Control

These agents coordinate work and preserve coherence.

#### Program Director Agent

- owns priorities, approvals, sequencing, and final recommendations
- decides scope cuts, timeline tradeoffs, and phase exits
- resolves cross-functional conflicts

#### Chief of Staff Agent

- tracks tasks, dependencies, deadlines, and pending decisions
- converts work into checklists and follow-through plans
- ensures meetings and reviews produce artifacts

#### Research Librarian Agent

- stores sources, evidence, references, competitor captures, and project memory
- ensures downstream agents work from documented facts rather than recall
- flags weak or missing evidence

### Layer B: Strategy and Offer

These agents decide what the brand is and what it should sell forward.

#### Customer Insight Agent

- mines reviews, comments, social language, interviews, support issues, and audience signals
- identifies motivations, objections, triggers, and product attachment patterns
- translates evidence into strategic implications

#### Brand Strategy Agent

- defines audience, territory, brand position, emotional job, and message hierarchy
- proposes strategic options and recommends one
- decides what the brand should not claim

#### Merchandising Strategy Agent

- categorizes products into hero, support, and filler
- recommends collection logic, bundles, launch sets, and category hierarchy
- aligns assortment with brand strategy and conversion potential

### Layer C: Creative and Experience

These agents shape how the brand looks, sounds, and behaves on the site.

#### Creative Direction Agent

- defines visual territory, identity direction, campaign language, and brand atmosphere
- ensures the brand looks distinct and ownable
- creates the principles that guide asset and interface design

#### Copy Strategy Agent

- converts strategy into voice principles, messaging structures, headlines, PDP narratives, and launch copy
- ensures language is specific, persuasive, and consistent
- adapts tone by context without losing identity

#### UX / IA Agent

- designs sitemap, navigation, page structure, merchandising logic, and decision flows
- identifies friction points and missing information
- translates business priorities into user journeys

#### UI System Agent

- translates visual direction and UX logic into reusable sections, components, layout rules, and content modules
- keeps the storefront design system consistent
- prepares implementation-ready specifications

### Layer D: Build, Launch, and Learning

These agents ship, validate, and improve the system.

#### Frontend Build Agent

- implements or specifies the storefront build
- handles component behavior, page assembly, integrations, and technical consistency
- protects maintainability and speed

#### QA Agent

- checks mobile behavior, broken states, content consistency, funnel integrity, SEO basics, and analytics presence
- turns defects into prioritized issue lists
- blocks launch when critical paths fail

#### Growth Launch Agent

- builds the launch narrative, campaign structure, creator plan, paid hooks, and channel sequencing
- ensures every acquisition touchpoint lands on a coherent on-site story
- owns prelaunch and launch momentum

#### Analytics Agent

- defines KPI framework, event schema, dashboard logic, and experiment readouts
- ensures the relaunch is measurable
- turns performance data into actionable learnings

#### Retention Agent

- designs post-purchase communication, repeat-purchase logic, bundles, drops, and lifecycle flows
- focuses on customer value after first conversion
- ensures launch energy turns into an ongoing revenue system

## 4. Agent Contracts

Each agent should operate under the same contract structure:

- `mission`: what type of problem the agent exists to solve
- `inputs`: what it must receive before acting
- `outputs`: what it must produce
- `decision rights`: what it may decide on its own
- `non-rights`: what it may not decide
- `reviewer`: who approves its work
- `escalation trigger`: when it must stop and escalate
- `quality bar`: what “good” means for that role

No agent should act outside its contract without explicit instruction from the Program Director Agent.

Each agent contract should also declare:

- `reference inheritance`: which real-world operator layer or layers this agent borrows from
- `active traits`: which of those inherited traits are relevant for the task
- `suppressed traits`: which traits should not dominate because they would distort the work

## 5. Orchestration Model

### Default Sequence

1. Research Librarian Agent compiles evidence.
2. Customer Insight Agent synthesizes customer truth.
3. Brand Strategy Agent defines strategic options.
4. Merchandising Strategy Agent aligns the catalog and category hierarchy.
5. Program Director Agent approves the strategic direction.
6. Creative Direction Agent and Copy Strategy Agent develop expression.
7. UX / IA Agent defines page structure and journeys.
8. UI System Agent converts approved concepts into reusable system logic.
9. Frontend Build Agent implements.
10. QA Agent validates.
11. Growth Launch Agent activates the launch plan.
12. Analytics Agent and Retention Agent drive optimization after go-live.

### Safe Parallelization

The following work can run in parallel:

- Research Librarian Agent with Customer Insight Agent once sources are flowing
- Creative Direction Agent with Copy Strategy Agent after strategy is approved
- UX / IA Agent with UI System Agent after high-level page goals are stable
- Growth Launch Agent with QA Agent in prelaunch, once the site is materially complete

The following work should not run in parallel:

- Brand Strategy before enough customer evidence exists
- final UI system decisions before UX logic is approved
- launch plans before hero products and landing destinations are stable

## 6. Handoff Rules

Each handoff should contain:

- artifact title
- owner
- purpose
- assumptions
- open questions
- exact requested next action

No handoff should say “thoughts?” or “take it from here.” The request to the next agent must be explicit.

## 7. Review and Approval Flow

### Strategic Work

- Customer Insight Agent submits evidence summary
- Brand Strategy Agent submits recommendation
- Merchandising Strategy Agent submits assortment implications
- Program Director Agent approves, rejects, or requests revision

### Design and Experience Work

- Creative Direction Agent and Copy Strategy Agent submit direction
- UX / IA Agent submits structural translation
- UI System Agent submits implementation framework
- Program Director Agent and Frontend Build Agent review for coherence and feasibility

### Build and Launch Work

- Frontend Build Agent submits implementation status
- QA Agent submits issue list
- Growth Launch Agent submits launch readiness
- Analytics Agent confirms instrumentation
- Program Director Agent decides go / no-go

## 8. Failure Modes

The AI team will fail if:

- too many agents are allowed to redefine strategy
- prompts make every agent “helpful” instead of role-bound
- research is skipped and opinions become evidence
- there is no final approval owner
- build work starts before category and page priorities are settled
- launch is treated as a marketing task instead of a system-wide event

## 9. Recommended Minimal Team

If you want to start lean, the minimum viable AI team is:

- Program Director Agent
- Research Librarian Agent
- Customer Insight Agent
- Brand Strategy Agent
- Creative Direction Agent
- UX / IA Agent
- Frontend Build Agent
- Growth Launch Agent
- Analytics Agent

That is enough to produce serious work without excessive coordination overhead.

## 10. Recommended Full Team

For the strongest execution quality, use:

- Program Director Agent
- Chief of Staff Agent
- Research Librarian Agent
- Customer Insight Agent
- Brand Strategy Agent
- Merchandising Strategy Agent
- Creative Direction Agent
- Copy Strategy Agent
- UX / IA Agent
- UI System Agent
- Frontend Build Agent
- QA Agent
- Growth Launch Agent
- Analytics Agent
- Retention Agent

## 11. Shared Standards

Every agent should follow these rules:

- be concise and recommendation-led
- state assumptions explicitly
- separate evidence from interpretation
- prefer sharp recommendations over broad option sets
- do not change upstream decisions silently
- escalate when inputs are weak or contradictory
- optimize for commercial usefulness, not intellectual theater
- rely on reference inheritance for judgment patterns, not identity imitation

## 12. Suggested Runtime Pattern

Use the AI team in phases:

- `Phase 1`: run Research Librarian, Customer Insight, and Program Director
- `Phase 2`: add Brand Strategy and Merchandising Strategy
- `Phase 3`: add Creative Direction, Copy Strategy, UX / IA, and UI System
- `Phase 4`: add Frontend Build and QA
- `Phase 5`: add Growth Launch, Analytics, and Retention

This keeps the system from becoming noisy too early.
