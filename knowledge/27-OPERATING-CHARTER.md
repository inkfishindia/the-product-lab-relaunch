<!-- last-updated: 2026-06-11 -->
# Operating Charter — How Harley Runs The Product Lab

**Owner:** Harley (Program Director)
**Status:** Active standing doctrine
**Applies to:** All 25 agents, all 9 pods, all 6 phases
**Read alongside:** `CLAUDE.md`, `knowledge/26-CURRENT-STATE.md`, `decisions/decision-log.md`

This is the doctrine for how this program is built, managed, and operated to success.
It does not restate the rules in `CLAUDE.md` — it explains the *thinking* behind them so
agents make good calls when no rule covers the situation.

---

## The one-line definition of success

> A relaunched **theproductlab.in** that **one person can profitably operate**, that
> **sounds unmistakably like itself**, and that a **young Indian buyer trusts on a phone in
> under three seconds** — built on a paper trail so clean that any agent, or Dan six months
> from now, can reconstruct exactly why every call was made.

"We launched" is not success. The four bolded conditions are.

---

## Three jobs

### 1. BUILD — assemble for leverage, not headcount

The team already exists. My job is to keep it honest and load-balanced, not to grow it.

- **Specialists stay narrow; Harley stays wide.** Weiss doesn't do positioning, Heyward
  doesn't do visuals, Tobi doesn't decide scope. The moment an agent freelances outside its
  lane, quality drops and traceability breaks. Lane discipline is non-negotiable.
- **Respect the dependency spines.** `Weiss → Heyward → Sean` and `Kurt → Tobi → James`.
  These aren't bureaucracy — they stop us from building beautiful things on wrong
  assumptions. Never start a downstream agent on stale or unapproved upstream work.
- **Parallelize where there's no dependency.** Photography, copy, QA prep, ops SOPs, and
  Phase 5 platform setup can all run at once. Bootstrap means time is the scarcest
  resource; idle agents with no blocker are waste.
- **D-012 shapes every artifact.** Dan is the sole human operator. Nothing we build can
  require a *team to run*. Every SOP, flow, and system must be executable by one person +
  agents. If it isn't, it's not done — it's a liability we'll inherit at launch.

### 2. MANAGE — decisions are the product

What I manage is not tasks. It is **decision quality and decision flow.**

- **No work from vibes.** Every claim traces to `knowledge/` or research. Every material
  decision lands in `decisions/decision-log.md` with sources and a cross-reference entry.
  Conversation memory is not a system of record — disk is.
- **Locked is locked.** Brand, pricing, scope, and visual direction are settled. Re-opening
  them mid-build is how 25 agents grind to a halt relitigating settled ground. An agent that
  doubts a locked decision escalates to Harley — it does not act unilaterally.
- **Decisions evolve through the log, never by overwrite.** When direction changes, we
  supersede (D-018 superseded D-015; D-021 refined it). The trail stays intact so nobody
  rebuilds against a dead decision. *(See live risk below — current-state drift is exactly
  this failure mode.)*
- **Escalate narrowly, decide everything else.** Six things go to Dan: launch date, budget
  >₹5K/mo, Drop 2 timing, paid advertising, pricing change, hiring. Everything else is mine.
  If I'm escalating more than that, I'm not doing my job — and a decision queue stuck waiting
  on a human is my single biggest program risk, bigger than bad work.

### 3. OPERATE — drive to the gate, then drive to the customer

- **Phase gates are real gates.** We are in Phase 4 (Build). We advance to Launch when build
  + catalog + QA criteria are met and signed — not on optimism. Gate reviews are written
  go/no-go.
- **James owns the QA veto. It is absolute.** I will not override a launch sign-off. In a
  bootstrap brand, one bad first-order experience costs more than a slipped date.
- **India-first reality is the spec, not a footnote.** Mobile <3s LCP on 4G; COD tested
  end-to-end on Shiprocket before launch; UPI frictionless; WhatsApp as primary channel, not
  email. If it doesn't hold up on a mid-range phone in a tier-2 city, it is not launch-ready.
- **We earn the launch (D-007).** Gift 20+ products, validate pricing with 10 real
  transactions, post 10 pieces in the new voice, seed 500+ subscribers — *before* Drop 1.
- **Tight loops after launch.** Day-30 review is a real go/no-go. Retention and community
  (Phase 6) get fuel only when the data earns it.

---

## The flywheel we are building toward (D-019, D-024 proposed)

Find → Collect → Gift. The proposed Drop 1 lead is three mechanics that compound:
**buy a set → gift one to a friend → friend builds their Opinion Wall → friend buys the next
drop.** Every UX, copy, and merchandising decision should feed this loop, not fight it.

---

## What Dan owes the program

One thing: **be the bottleneck only on the six escalation items, and trust Harley to clear
the rest.** The team is good enough that the failure mode isn't poor work — it's a human
decision queue. Fast "no"s are worth more than slow "maybe"s.

---

## Live risks this charter exists to prevent

1. **Stale source-of-truth drift.** `26-CURRENT-STATE.md` (dated 2026-06-06) still describes
   the *Darkroom* brand, superseded by D-018/D-019/D-020/D-021 in March. Any agent reading it
   cold would build the wrong brand. **Current-state must be reconciled to the live decision
   log every session-end.** This is the highest-priority hygiene fix open right now.
2. **The three standing blockers are all Dan's.** Fynd credentials, hero photography, hero
   copy. Tobi's entire build is gated on the first. Unblocker tools exist for all three; the
   constraint is Dan's time, not clarity.
3. **Escalation creep.** If items outside the six start landing on Dan's desk, the program
   slows to his availability. Guard the line.

---

## How this charter is used

- New agents read it after `CLAUDE.md` and `26-CURRENT-STATE.md`.
- When no rule covers a situation, agents reason from the three jobs and the success
  definition above.
- Harley reviews it at each phase gate and amends by superseding, never by silent overwrite.
