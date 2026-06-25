<!-- last-updated: 2026-03-20 -->
# 24 — TPL Artist Platform & Creator Ecosystem (Consolidated)

**Phase:** 1 — Audit
**Producing Agent:** Maria (Research Librarian)
**Date:** 2026-03-20
**Status:** draft
**Reviewer:** Harley

---

## Purpose

Single canonical reference for all Artist Platform data extracted from the TPL DUMP. Supersedes individual source files. Downstream agents (strategy, creative, build) should reference this document rather than the originals.

---

## 1. Platform Scale — Current State

| Metric | Value | Source Confidence |
|--------|-------|-------------------|
| Active artists | 4 | Consistent across 3 sources — high |
| Pipeline / prospect artists | 12+ | From CEO Framework doc — medium |
| Average monthly revenue per artist | ₹5,000–6,200 | Range across sources — medium |
| Artist satisfaction score | 9.1/10 | CEO Strategic Command Center — medium (methodology unclear) |
| Next drop pre-orders on record | 234 units | CEO Strategic Command Center — medium |
| Drop quality pass rate on record | 98.4% | CEO Strategic Command Center — medium (single data point) |
| Production facility | Ink Fish (parent company, Est. 2013) | CEO Framework — high |

### Artist Count Contradiction — FLAG

**The internal data consistently states 4 active artists.** However, a pitch document prepared for Kyoorius Designyatra 2025 (file 12 in CEO DUMP) states: *"Artist ecosystem: 15+ digital artists with revenue-sharing."*

These figures cannot both be accurate at the same point in time. Possible explanations:
1. The Kyoorius figure is aspirational / inflated for pitch purposes.
2. "15+" counts all artists ever engaged (active + inactive + graduated), not current active.
3. The figure represents prospects in pipeline counted as ecosystem members.

**Recommendation for strategy:** Use 4 active artists as the verified baseline. Do not use the 15+ figure in internal planning. Flag for Dan to clarify before any public-facing claims.

---

## 2. Revenue Share Tier Structure

Three sources describe the same three-tier structure with consistent rates. The tier names differ across documents but the economics are consistent.

| Tier | CEO Framework Name | Command Center Name | Founders Office Name | Commission Rate | Duration / Criteria |
|------|-------------------|--------------------|--------------------|-----------------|---------------------|
| Entry | Emerging Artist | New | Rising Stars | 40% of net margin | First 3 months / <₹25k revenue/month |
| Mid | Established Artist | Proven | Established Artists | 50% of net margin | 3–12 months / ₹25k–₹1L revenue/month |
| Top | Signature Artist | Star | Cultural Icons | 60% of net margin | 12+ months / >₹1L revenue/month |

**Exclusivity bonus:** +10% commission for exclusivity period (90 days exclusive to TPL). Source: CEO Framework. Not confirmed in other documents — treat as medium confidence.

### Revenue Calculation Formula

Sourced from Founders Office (07-ARTIST-PLATFORM.md) — most detailed version:

```
Net Margin = Selling Price − (Base Cost + Customization Cost + Lab Fee)
Lab Fee = 20% of selling price (platform maintenance and operations)
Artist Share = Net Margin × Tier Commission Rate (40%, 50%, or 60%)
Platform Share = Net Margin × (100% − Tier Commission Rate)
```

**Platform fee (separate from lab fee):** CEO Framework also cites a 5–8% platform/transaction fee on top of the lab fee. This is not reflected in the Founders Office calculation model. Inconsistency to resolve before quoting economics to artists.

**Lab fee range:** CEO Framework states 15–25% based on product complexity. Founders Office uses a flat 20% example. Both may be correct (20% is the midpoint / standard; 15–25% is the actual range).

### Worked Example (from Founders Office)

Product: ₹199 keychain, Tier 1 artist

| Component | Amount |
|-----------|--------|
| Base material cost | ₹45 |
| Production labor | ₹20 |
| Customization cost | ₹15 |
| Packaging | ₹10 |
| Total direct cost | ₹90 |
| Lab fee (20%) | ₹40 |
| Net margin | ₹69 |
| Artist share (40%) | ₹27.60 |
| Platform share (60%) | ₹41.40 |

At 50 units/month: total artist payment = ₹1,380; platform revenue = ₹2,070; gross margin rate = 35%.

---

## 3. Target Scale

| Metric | Target | Source |
|--------|--------|--------|
| Active artists — near-term | 8 (Q1 2026 per CEO Framework) / 8 by Q2 2025 per Command Center | Conflicting timelines — see note |
| Active artists — launch cohort | 8–12 founding artists | CEO Command Center (Jun 17, 2025 conversation) |
| Active artists — long-term | 50+ creators | CEO Framework |
| Revenue per artist target | ₹8,000/month | CEO Framework and Founders Office |
| Drop frequency target | 2–3 per month | CEO Framework |
| Limited edition run size | 50–100 pieces per design | CEO Framework |
| Artist contribution to total revenue | 60–70% | CEO Command Center |

**Timeline note:** The "8 by Q2 2025" target from the Command Center document is a past date (Q2 2025 has passed). Current active count remains 4. The target appears not to have been met. For relaunch planning, the operative target is 8–12 founding artists at launch.

---

## 4. Onboarding Pipeline

Three sources describe onboarding. The Founders Office document is most detailed and operationally specific.

### Evaluation Criteria (Founders Office — weighted matrix)

| Criteria | Weight | Minimum Score |
|----------|--------|---------------|
| Artistic quality | 30% | 7/10 |
| Commercial viability | 25% | 6/10 |
| Brand alignment | 20% | 7/10 |
| Production feasibility | 15% | Pass/Fail |
| Audience reach | 10% | 1,000+ followers |

### Selection Process

1. Initial screening — Community Manager
2. Portfolio review — Creative Director
3. Production feasibility check — Operations
4. Final approval — CEO/Founder
5. Formal invitation to partnership

### 10-Week Onboarding Schedule (Founders Office — most detailed)

| Week | Activity | Responsible |
|------|----------|-------------|
| 1 | Contract finalization; account setup and systems training | Community Manager / Ops |
| 2 | Creative briefing; technical file specifications | Creative Director / 2D Designer |
| 3 | Initial concept development (5–10 concepts) | Artist |
| 4 | Design review and feedback; narrow to 3–5 | Creative Director |
| 5 | Final design approval; production-ready files | Creative Director + Artist |
| 6 | Production planning — timeline, quantities, materials | Operations |
| 7–8 | Production and QC | Production Team |
| 9 | Launch planning — marketing assets, drop date | Marketing Team |
| 10 | Drop execution — live sale | All Team |

**Time to first drop target:** 30–45 days (CEO Framework) / <45 days (Founders Office). Both sources consistent.

**Optimized process target (CEO Command Center):** 7–10 days with AI-assisted screening, standardized contracts, and parallel production setup. Claims 50% faster onboarding and 70% reduction in admin overhead. Reliability: low — these are projected efficiency gains, not measured outcomes.

**Current process baseline:** 14–21 days per CEO Command Center, but the 10-week Founders Office schedule describes a 70-day process. These are likely measuring different phases: 14–21 days may refer to contract-to-first-design-brief, not contract-to-first-drop.

---

## 5. Drop Mechanics

| Element | Detail | Source |
|---------|--------|--------|
| Drop naming | "Artist Drop #N — [Series Name]" format | Command Center |
| Run size | 50–100 pieces per design | CEO Framework |
| Exclusivity window | 90 days exclusive to TPL | CEO Framework |
| Pre-order system | Used for demand validation before full production | Command Center |
| Sell-through target | 80%+ | Both Command Center and Founders Office |
| Drop success rate target | 90% of drops meeting projections | Founders Office |
| Design revision rounds target | <2 average | Founders Office |

### Drop Launch Sequence (Founders Office)

| Phase | Timing | Activities |
|-------|--------|-----------|
| Teaser campaign | 2 weeks pre-launch | Social teasers, email hints |
| Artist spotlight | 1 week pre-launch | Artist story, behind-the-scenes |
| Product preview | 3 days pre-launch | Product shots, pricing reveal |
| Launch announcement | Day of | Full channel activation |
| Availability updates | Ongoing | Stock updates, social proof |
| Post-launch analysis | Week after | Sales data, channel comparison, artist debrief |

---

## 6. Collection Architecture

From CEO Command Center ("TPL Creator Studio" concept, Jun 17, 2025):

- Branded as **"TPL Creator Studio"** — positioned as India's first end-to-end creative collaboration platform
- Dual model: **Artist Collaborations** (limited drops, community-facing) + **Brand Partnerships** (B2B, higher guaranteed volumes)
- Artist collaborations drive 60–70% of total revenue at higher margins (70%+ vs 45% standard)
- Signature Artist tier gets access to corporate/brand partnership opportunities

### Artist Success Journey (Founders Office)

| Phase | Timeline | Focus |
|-------|----------|-------|
| Discovery & Onboarding | Months 1–3 | Contract, first collection, first drop, first revenue |
| Growth & Optimization | Months 4–9 | Performance analysis, category expansion |
| Advancement & Expansion | Months 10–18 | Tier advancement, signature collections |
| Maturity & Legacy | Months 19+ | Brand ambassador, mentorship, archive collections, passive revenue |

---

## 7. Payment Structure

| Detail | Policy | Source |
|--------|--------|--------|
| Payment cycle | Monthly (Founders Office) / Weekly for Established+Signature (CEO Framework) | Inconsistency — see note |
| Statement generation | By 5th of month | Founders Office |
| Payment processing | By 10th of month | Founders Office |
| Minimum threshold | ₹1,000 per payment cycle | CEO Framework |
| Preferred method | Direct bank transfer; UPI and digital wallet also accepted | Both sources |
| Automation | N8N workflow for commission calculation | CEO Framework |

**Payment cycle inconsistency:** CEO Framework states weekly payments for Established/Signature artists and bi-weekly for Emerging. Founders Office states a single monthly cycle. These may reflect an aspirational vs. operational system. Monthly is more operationally realistic at current scale.

### IP and Creative Rights

- Creative control remains with the artist
- Artist credit in all materials
- Clear usage rights and attribution standards
- Legal support and contract negotiation assistance
- Contract term: typically 12 months (Founders Office)

---

## 8. Creator Psychology — Indian Market Context

Source: TPL CMO Cultural Intelligence (08_TPL_CULTURAL_INTELLIGENCE.md) — creator psychology sections.

### The Family Validation Crisis

A documented behavioral pattern among Gen Z creators (18–25) in India. Key data points from this document:

- 73% of young creators mention family approval as a major concern (Instagram comment analysis)
- 8 out of 10 creators at a creator meetup shared stories of family dismissing their work
- Interviews with 5 TPL creators: they hide revenue figures from family who assume they "aren't making real money"

**Reliability note:** These figures come from TPL's own qualitative observation and community monitoring, not third-party research. Sample sizes are small (5 interviews, single meetup). Directionally valid but should not be cited as statistically representative.

Indian family concerns specifically documented:
- Marriage prospects and stability perception
- Financial stability and "real job" expectations
- Social respect and community standing
- Comparison with engineering/medicine career paths

**Strategic implication for artist recruitment messaging:** Move from "express yourself" positioning to "build a legitimate creative career" framing. This is identified as an unaddressed need that competitors are largely ignoring.

### Creator Motivation Hierarchy

| Level | Need |
|-------|------|
| 1 | Creative expression (primary, intrinsic) |
| 2 | Recognition and validation (peer, artistic credibility) |
| 3 | Financial sustainability |
| 4 | Impact and legacy |
| 5 | Creative leadership |

### Psychological Barriers to Monetization

Four documented barriers relevant to artist recruitment and retention:

1. **"Selling out" complex** — Fear that commercial success equals creative failure; community pressure against commercial motivations
2. **Imposter syndrome in business** — Creators feel unqualified for business decisions; discomfort with self-promotion
3. **Scarcity mindset** — Reluctance to charge premium prices; undervaluing creative contributions
4. **Platform dependency anxiety** — Fear of algorithm or policy changes affecting livelihood

### Macro Creator Economy Trends (2025 data from CMO doc)

| Trend | Data Point | Reliability |
|-------|-----------|-------------|
| Authenticity preference | 73% of Gen Z prefers brands that "keep it real" | Low — source not cited |
| Creator professionalization | 67% of creators consider creation primary income | Low — source not cited |
| Community over platform | Creator retention 5x higher in active communities | Low — source not cited |
| Platform diversification | Average creator active on 4.2 platforms | Low — source not cited |
| Values research | 89% of creators research platform values before joining | Low — source not cited |

**Note:** These statistics appear in the CMO document without primary source citations. They may be from industry reports (LinkedIn, Creator Economy reports) but are unverifiable as presented. Do not use as sourced claims without finding the underlying research.

---

## 9. Evidence Gaps

The following are undocumented or unverified as of this audit:

| Gap | Why It Matters | Priority |
|-----|---------------|----------|
| Individual artist identities | Cannot assess current portfolio quality, style range, or audience overlap | High |
| Actual revenue per artist (current) | ₹5,000–6,200 range from multiple sources; none shows individual breakdowns | High |
| Artist satisfaction methodology | 9.1/10 score is cited but no survey instrument or sample size given | Medium |
| Platform fee vs lab fee reconciliation | Two cost structures described; which one is operational? | High |
| Payment cycle actual practice | Monthly vs weekly discrepancy unresolved | Medium |
| 12+ pipeline artists | No names, stages, or timeline for these prospects | Medium |
| TPL Creator Studio platform status | Described as a concept from Jun 2025; no evidence it launched | High |
| Artist agreement/contract document | Checklist exists; actual signed template not in DUMP | Medium |
| Brand partnership names or status | Mentioned as a revenue stream; no specific brands documented | Medium |
| "15+ digital artists" Kyoorius figure | Origin and accuracy unclear; contradicts all other sources | High — must clarify before any external claims |

---

## 10. Contradictions Summary

| Topic | Version A | Version B | Resolution |
|-------|-----------|-----------|------------|
| Active artist count | 4 (all internal planning docs) | 15+ (Kyoorius pitch email) | Use 4; Kyoorius figure is likely pitch inflation or broader definition |
| Near-term target | 8 by Q1 2026 (CEO Framework) | 8 by Q2 2025 (Command Center) | Q2 2025 target was missed; Q1 2026 is current operative target |
| Onboarding timeline | 7–10 days optimized / 14–21 current (Command Center) | 10-week full process (Founders Office) | These measure different scopes; not a true contradiction |
| Payment schedule | Weekly (Signature/Established), bi-weekly (Emerging) — CEO Framework | Monthly cycle — Founders Office | Unresolved; monthly is more operationally realistic |
| Lab fee | 15–25% range — CEO Framework | Flat 20% — Founders Office | 20% is likely the standard; 15–25% is the full range by complexity |
| Platform fee | Additional 5–8% transaction fee — CEO Framework | Not mentioned — Founders Office | Unresolved; affects artist net earnings calculation |

---

## Sources

| File | Location | Reliability |
|------|----------|-------------|
| 04_TPL_Artist_Ecosystem_Framework.md | TPL DUMP/TPL CEO - claude/ | Medium — internal planning doc, no dates on most data |
| 04_TPL_Artist_Ecosystem.md | TPL DUMP/TPL CEO Strategic Command Center-claude/ | Medium — includes live operational data points (pre-orders, quality rate) but context unclear |
| 07-ARTIST-PLATFORM.md | TPL DUMP/TPL FOUNDERS OFFICE FILES - CLAUDE/ | Medium-High — most operationally detailed; appears to reflect actual system design |
| 08_TPL_CULTURAL_INTELLIGENCE.md (creator psychology sections) | TPL DUMP/TPL CMO - CLAUDE/ | Medium — qualitative observations from TPL's own community monitoring; statistics lack primary source citations |
| 12_TPL_Kyoorius_Event_Activations.md | TPL DUMP/TPL CEO - claude/ | Low for artist count claim — pitch/marketing document; "15+ digital artists" appears in follow-up email boilerplate |

All sources are internal TPL planning documents from the DUMP. No third-party verification of any figures in this document. All data reflects stated intentions and targets as of various 2025 dates; current (2026) operational state may differ.
