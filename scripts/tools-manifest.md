# Tools Manifest — TPL Agent System
<!-- last-updated: 2026-03-26 -->

Every agent's required tools, availability status, and what Dan needs to provide.

---

## Tool Status Legend

| Status | Meaning |
|--------|---------|
| ✅ Ready | Available now — no setup needed |
| 🟡 Needs Key | Tool exists, needs API key/credential from Dan |
| 🔧 Needs Setup | Requires account creation or installation |
| ❌ Not Available | Requires workaround or alternative |

---

## Master Tool Map

| Tool | Available Via | Status | Who Uses It |
|------|-------------|--------|------------|
| Web search | Claude built-in (WebSearch) | ✅ Ready | Maria, Weiss, Heyward, Jenna, Nik, Chase |
| Web fetch / scraping | Claude built-in (WebFetch) + Chrome MCP | ✅ Ready | Maria, Weiss, Jenna |
| Browser automation | Claude in Chrome MCP | ✅ Ready | Maria, Tobi, James, Avinash |
| Figma | Figma MCP (connected) | ✅ Ready | Sean, Kurt, Julie |
| PDF reading/creation | PDF MCP (connected) | ✅ Ready | Patrick, Raj, Harley |
| Excel/Spreadsheets | xlsx skill | ✅ Ready | Patrick, Lenny, Avinash |
| Word documents | docx skill | ✅ Ready | Harley, Tony, Raj |
| Presentations | pptx skill | ✅ Ready | Harley, Nik |
| GA4 / Analytics | GA4 API or browser | 🟡 Needs Key | Avinash, Tobi |
| Microsoft Clarity | Clarity dashboard (browser) | 🟡 Needs Key | Avinash, James |
| Razorpay | Razorpay API + dashboard | 🟡 Needs Key | Tobi, Patrick |
| Shiprocket | Shiprocket API + dashboard | 🟡 Needs Key | Tobi, Raj |
| Fynd / Commerce.com | Fynd admin panel | 🟡 Needs Key | Tobi, Andy |
| Klaviyo | Klaviyo API | 🟡 Needs Key | Eli |
| MSG91 / Gupshup | WhatsApp Business API | 🟡 Needs Key | Eli |
| Instagram | Browser (no official API for posting) | 🔧 Needs Setup | Chase, Rachel, Andrew |
| Google Trends | WebFetch (public) | ✅ Ready | Maria, Weiss |
| SimilarWeb | WebFetch (limited free tier) | ✅ Ready | Maria, Jenna |
| Reddit / forums | WebFetch + browser | ✅ Ready | Weiss, Maria |
| NotebookLM | Browser automation via Chrome MCP | 🔧 Needs Setup | Maria, Weiss |
| Canva | Browser automation via Chrome MCP | 🔧 Needs Setup | Casey, Sean |
| Perplexity / deep research | WebSearch + WebFetch | ✅ Ready | Maria, Weiss |
| WhatsApp Business | MSG91 or Gupshup API | 🟡 Needs Key | Eli, Rachel |

---

## By Agent — Tools Required

### Pod A — Command

**Harley**
- WebSearch ✅ — market context, competitor checks
- WebFetch ✅ — reading docs, reports
- PDF ✅ — reading/creating reports
- docx ✅ — memos, briefs
- pptx ✅ — phase gate presentations (if needed)

**Claire**
- No external tools — works from project files only ✅

**Maria**
- WebSearch ✅ — primary research tool
- WebFetch ✅ — scraping competitor sites, reading reports
- Chrome browser MCP ✅ — full-page scraping when needed
- Google Trends (via WebFetch) ✅
- SimilarWeb (via WebFetch) ✅
- Reddit / IndiaMART / Amazon reviews (via WebFetch) ✅
- NotebookLM (via Chrome) 🔧 — for synthesizing large research dumps

---

### Pod B — Strategy

**Weiss**
- WebSearch ✅ — customer forum research, social listening
- WebFetch ✅ — Instagram profiles, Reddit, brand sites
- Chrome browser MCP ✅ — scraping review data, community posts
- NotebookLM (via Chrome) 🔧 — synthesis of Maria's research dumps

**Heyward**
- WebSearch ✅ — brand positioning references, market data
- WebFetch ✅ — reading competitor positioning

**Jenna**
- WebSearch ✅ — catalog research, pricing benchmarks
- WebFetch ✅ — competitor catalog structures
- xlsx skill ✅ — product hierarchy tables

---

### Pod C — Product

**Shreyas**
- WebSearch ✅ — PMF frameworks, market benchmarks
- WebFetch ✅

**Andy**
- Fynd admin panel 🟡 — needs Dan's Commerce.com credentials
- xlsx skill ✅ — catalog upload preparation

---

### Pod D — Creative

**Sean**
- Figma MCP ✅ — reading and creating design specs
- WebSearch ✅ — visual reference research
- WebFetch ✅ — mood board research, competitor visual audits

**Joanna**
- WebSearch ✅ — voice references, tone research
- WebFetch ✅ — reading competitor copy

**Kurt**
- Figma MCP ✅ — reading existing IA, creating sitemap
- WebSearch ✅ — UX pattern research, Fynd documentation
- WebFetch ✅ — competitor UX flows

**Julie**
- Figma MCP ✅ — reading and creating UI specs, components
- WebSearch ✅ — UI references
- WebFetch ✅ — component pattern research

---

### Pod E — Build/QA

**Tobi**
- Fynd / Commerce.com admin 🟡 — needs Dan's store credentials (BLOCKED)
- Razorpay dashboard + API 🟡 — needs Dan's Razorpay credentials
- Shiprocket dashboard + API 🟡 — needs Dan's Shiprocket credentials
- GA4 property 🟡 — needs Dan's GA4 property ID + admin access
- Clarity workspace 🟡 — needs Dan's Clarity project ID
- WebSearch ✅ — Fynd docs, Razorpay docs, integration guides
- WebFetch ✅ — reading API documentation
- Chrome browser MCP ✅ — testing the live store

**James**
- Chrome browser MCP ✅ — primary QA tool for testing store
- Fynd live store URL 🟡 — needs Tobi to share staging/live URL
- GA4 / Clarity 🟡 — to verify tracking is firing
- WebFetch ✅ — accessibility checks, performance scoring

---

### Pod F — Growth

**Nik**
- WebSearch ✅ — campaign benchmarks, Indian D2C case studies
- WebFetch ✅ — competitor campaign research
- xlsx skill ✅ — growth modeling, funnel analysis

**Avinash**
- GA4 API or dashboard 🟡 — needs Dan's GA4 property access
- Microsoft Clarity dashboard 🟡 — needs Dan's Clarity project access
- xlsx skill ✅ — performance dashboards
- Chrome browser MCP ✅ — accessing GA4 + Clarity dashboards

**Eli**
- Klaviyo account + API 🟡 — needs Dan to create account (free tier available)
- MSG91 or Gupshup account 🟡 — needs Dan to create account
- WebSearch ✅ — flow templates, WhatsApp marketing best practices
- WebFetch ✅ — reading Klaviyo docs, MSG91 docs

---

### Pod G — Marketing

**Andrew**
- Chrome browser MCP ✅ — scheduling and monitoring Instagram
- WebSearch ✅ — launch strategy references

**Chase**
- WebSearch ✅ — content strategy research, trend research
- WebFetch ✅ — competitor Instagram analysis
- Chrome browser MCP ✅ — Instagram profile analysis

**Rachel**
- WebSearch ✅ — seeding strategy, micro-influencer research
- WebFetch ✅ — scraping Instagram profiles for seeding targets
- Chrome browser MCP ✅ — Instagram outreach (manual assist)
- xlsx skill ✅ — seeding recipient tracking list

---

### Pod H — Content

**Casey**
- WebSearch ✅ — copy references, Indian consumer language
- WebFetch ✅ — competitor product descriptions
- Canva (via Chrome) 🔧 — social template production

---

### Pod I — Ops/Finance

**Patrick**
- xlsx skill ✅ — financial models, unit economics
- WebSearch ✅ — pricing benchmarks, market data
- WebFetch ✅ — competitor pricing research
- Razorpay reports 🟡 — post-launch analytics

**Raj**
- Shiprocket dashboard 🟡 — needs Dan's Shiprocket access
- WebSearch ✅ — carrier rates, logistics benchmarks
- xlsx skill ✅ — shipping cost models, zone tables
- docx skill ✅ — SOP documents

**Tony**
- docx skill ✅ — SOP creation
- WebSearch ✅ — operations references
- Shiprocket + Razorpay dashboards 🟡 — post-launch

**Lenny**
- GA4 + Clarity dashboards 🟡 — needs access
- xlsx skill ✅ — reporting, dashboards
- Razorpay + Shiprocket data exports 🟡 — post-launch
- WebSearch ✅ — benchmark data for context

---

## Dan's Credentials Checklist

These are the accounts/keys Dan needs to gather before agents can use platform tools.

### CRITICAL (Phase 4 — blocking build right now)
- [ ] **Fynd / Commerce.com** — store login credentials → give to Tobi
- [ ] **Razorpay** — API key + secret → give to Tobi
- [ ] **Shiprocket** — API key → give to Tobi + Raj
- [ ] **GA4** — property ID + admin access → give to Tobi + Avinash

### HIGH (Phase 4–5)
- [ ] **Microsoft Clarity** — project ID + access → give to Avinash + James
- [ ] **Klaviyo** — create account (free), get API key → give to Eli
- [ ] **MSG91 or Gupshup** — create WhatsApp Business API account → give to Eli

### MEDIUM (Phase 5)
- [ ] **Instagram Business account** — admin access → coordinate with Chase + Rachel + Andrew
- [ ] **WhatsApp Business** — set up via MSG91/Gupshup → Eli leads

---

## How to Use Chrome MCP for Web Research (Maria, Weiss)

When spawning Maria or Weiss for research, include this in their session:

```
Research tools available in this session:
- WebSearch: use for broad queries
- WebFetch: use to read specific URLs
- Chrome browser (Claude in Chrome MCP): use for JS-heavy sites,
  Instagram profiles, Google Trends, SimilarWeb, Amazon reviews

For deep synthesis of multiple sources, create a structured
summary document and store it in pods/pod-a-command/ or pods/pod-b-strategy/
for Harley's review.
```

## How to Use Figma MCP (Sean, Kurt, Julie)

Figma is connected. When spawning design agents, include:

```
Figma MCP is available. You can:
- get_design_context: read any Figma node
- get_screenshot: capture current selection
- get_metadata: get node structure overview
- get_variable_defs: read design tokens

TPL Figma file location: [Dan to provide Figma file URL]
```
