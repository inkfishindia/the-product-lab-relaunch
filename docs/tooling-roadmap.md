# TPL Tooling Roadmap — Consolidated

**Date:** 2026-06-06 | **Author:** Harley
**Status:** Complete — research done, pending Dan review + decision

---

## What This Is

A consolidated, phased tooling plan for The Product Lab drawn from three research streams:
- Medusa.js ecosystem research (`backend/medusa-eval/2026-06-medusa-ecosystem-research.md`)
- Open-source internal tools research (`docs/open-source-tooling-research.md`)
- Fynd platform research (`docs/fynd-platform-research.md`)

---

## The Big Picture

TPL has three distinct tooling horizons:

```
NOW (Fynd launch)        DAY 30 (migration eval)     DAY 60+ (optimization)
─────────────────        ──────────────────────      ─────────────────────
Fynd Commerce.com         Medusa + Supabase spike     Medusa production
NocoDB                    Listmonk + SES              ERPNext
Umami analytics           ToolJet ops UI              Paperless-ngx
n8n (keep)                DocuSeal                    Activepieces
                          EspoCRM/Twenty
```

**The rule:** Don't over-invest before PMF. Deploy Tier 1 now (₹0-1,180/mo). Deploy Tier 2 after 30 days of revenue data. Deploy Tier 3 only when existing tools hit limits.

---

## Tier 1: Now (Pre-Launch / Fynd Build)

These should be deployed this week. All run on one ₹1,180/mo Vultr Mumbai VPS.

| Tool | Purpose | Replaces | Cost | Setup | Why Now |
|------|---------|----------|------|-------|---------|
| **NocoDB** | Airtable-like GUI on your existing database | Airtable seats (₹20K+/yr) | ₹0 on VPS | 20 min | Kills Airtable cost Day 1. Data stays in your DB. |
| **Umami** | Privacy-friendly analytics | GA4 supplement | ₹0 on VPS | 15 min | Cookieless, no consent banner, data in your Postgres |
| **n8n** (keep) | Workflow automation | — | Already deployed | Existing | Don't replace what's working |
| **Fynd** (active) | E-commerce platform | WooCommerce | ₹22K/yr | In progress | Launch target |

**Total incremental cost: ₹0/mo** (all on same VPS as NocoDB + Umami).

---

## Tier 2: Day 30 (Post-Launch / Revenue-Proven)

Deploy these after you have 30 days of sales data and can justify the setup time.

| Tool | Purpose | Replaces | Cost | Setup | Trigger |
|------|---------|----------|------|-------|---------|
| **ToolJet** | Internal order mgmt UI (Softr replacement) | Softr | ₹0 self-hosted | 1-2 days | When ops needs better order flow |
| **Listmonk + SES** | Email marketing (Klaviyo/Mailchimp replacement) | Klaviyo/Mailchimp | ₹500-1,500/mo | 1 day | When you need email flows at scale |
| **DocuSeal** | eSignatures for supplier/retailer contracts | DocuSign | ₹0 self-hosted | 30 min | First wholesale contract |
| **EspoCRM** or **Twenty** | Customer/wholesale CRM | Notion/Sheets CRM | ₹0 self-hosted | 1-2 days | When customer count exceeds memory |
| **Medusa spike** | Eval migration from Fynd | (Eval only) | $5-10/mo | 10 days spike | Day 30 CTO gate review |

**Total incremental cost: ~₹500-1,500/mo** (Listmonk SES sends).

---

## Tier 3: Day 60+ (Scale / Optimization)

Only deploy when existing tools genuinely limit you.

| Tool | Purpose | Cost | Setup | Skip If |
|------|---------|------|-------|---------|
| **ERPNext** (inventory + mfg only) | Production tracking, batch mgmt, BOM | ₹0 on VPS | 2-3 days | NocoDB + Airtable still works |
| **Paperless-ngx** | Document archive, OCR, search | ₹0 on VPS | 1 hour | Google Drive is fine |
| **Medusa production migration** | Full commerce platform ownership | $10-30/mo | 4-6 weeks dev | Fynd meets all needs |
| **Activepieces** | High-volume automation supplement | ₹0 on VPS | 1 hour | n8n handles load |

---

## Cost Summary

| Phase | Monthly Cost | Cumulative |
|-------|-------------|-----------|
| Tier 1 (Now) | ₹1,180 (VPS) | ₹1,180/mo |
| Tier 2 (Day 30) | +₹500-1,500 (SES + optional) | ~₹1,680-2,680/mo |
| Tier 3 (Day 60+) | +₹0-1,180 (bigger VPS if needed) | ~₹2,860-3,860/mo |

**All within ₹5,000/mo ceiling.**

---

## Quick Decisions for Dan

| Decision | Options | Recommendation |
|----------|---------|---------------|
| **Deploy NocoDB now?** | Yes / No | **Yes** — kills Airtable seat cost, 20 min setup |
| **Deploy Umami now?** | Yes / No | **Yes** — cookieless analytics, no legal risk |
| **Replace Softr?** | Now / Day 30 / Skip | **Day 30** — not urgent, Softr works |
| **Medusa migration path?** | Fynd forever / Medusa at Day 30 / Medusa now | **Day 30 eval** — launch on Fynd, spike at Day 30 |
| **Replace Klaviyo/Mailchimp?** | Now / Day 30 / Skip | **Day 30** — not urgent before launch |
| **ERPNext for production?** | Now / Day 30-60 / Skip | **Day 60** — don't add complexity pre-launch |

---

## What's Waiting on Implementation

**Can do now (no Dan dependency):**
- Deploy Vultr VPS (~60 min)
- Install Docker + NocoDB + Umami (~45 min combined)
- Keep n8n running as-is

**Requires Dan:**
- Fynd credentials (#1 blocker, everything builds on this)
- Product photography + copy (content for the store)
- Decision on NocoDB/Umami deployment (rubber stamp)
