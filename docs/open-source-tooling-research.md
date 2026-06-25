# Open-Source Tooling Research — The Product Lab

**Prepared:** 2026-06-06 | **For:** Dan (CEO) | **By:** Harley (Program Director)

---

## Executive Summary (for Dan)

Dan, here's the short version: you can replace or supplement most of your current paid/internal stack with self-hosted open-source tools for **under ₹3,000–5,000/month total** on a single VPS, versus what you're likely paying now. The key insight is that the tools that matter most to replace **first** are (1) Softr → **Appsmith/ToolJet** for order management UI, (2) Airtable → **NocoDB** (sits on top of your existing Postgres, no migration needed), and (3) your analytics → **Umami** (lightweight, MIT license). Everything else can be phased.

**Your biggest risk:** self-hosting means **you own the ops**. Updates, backups, security patches, and uptime are on you. For a solo founder, each extra tool adds maintenance surface area. The recommended stack starts **small** — one ₹590/month VPS from Vultr Mumbai, Docker Compose, and the 4-5 highest-impact tools only.

**Recommended first move:** Deploy NocoDB on top of your existing database → give your team an Airtable-like UI without migrating data. This alone saves you Airtable seat costs (₹20K+/yr at 5 users) and gives you a data layer that Appsmith/ToolJet can then build order management UIs on top of.

**Do NOT self-host email sending.** Use Amazon SES (₹0.40/1K emails) as the SMTP relay behind any self-hosted email tool. Running your own MTA from a cold IP in India is a months-long deliverability nightmare.

---

## Infrastructure Cost Model

### Recommended VPS Options (Indian Market)

| Provider | Plan | Specs | Price (INR/mo) | Latency to India | Best For |
|----------|------|-------|---------------|-----------------|----------|
| Vultr | Mumbai/Delhi 2GB | 1 vCPU, 2GB RAM, 50GB NVMe, 2TB transfer | ~₹1,180 | 5-15ms | **Best pick** for Indian users |
| Vultr | Mumbai/Delhi 1GB | 1 vCPU, 1GB RAM, 25GB NVMe, 1TB transfer | ~₹590 | 5-15ms | Lightweight start |
| DigitalOcean | Bangalore Basic | 2 vCPU, 4GB RAM, 80GB SSD, 4TB transfer | ~₹2,360 | 10-20ms | If you already use DO |
| Hetzner | CX22 (Singapore) | 2 vCPU, 4GB RAM, 40GB NVMe, 20TB transfer | ~₹460 | 40-60ms | Cheapest, but latency |
| MilesWeb | Mumbai V2 | 2 vCPU, 2GB RAM, 50GB SSD, 2TB transfer | ~₹730 | 5-15ms | UPI/INR billing |
| HostGator India | Mumbai Starter | 2 vCPU, 2GB RAM, 120GB SSD, Unmetered | ~₹599 | 5-15ms | Unmetered bandwidth |

**Recommendation:** Start with **Vultr Mumbai 2GB (₹1,180/mo)** or **MilesWeb V2 (₹730/mo)**. Both accept UPI, have Indian data centres, and sub-15ms latency across India. Hetzner Singapore (₹460/mo) is tempting on price but 40-60ms latency matters for internal tools your team uses daily.

### Monthly Budget Allocation (₹5,000/mo ceiling)

| Item | Cost (INR/mo) | Notes |
|------|---------------|-------|
| VPS (Vultr Mumbai 2GB) | ₹1,180 | Single box for Docker Compose stacks |
| Domain (amortized) | ~₹85/yr = ₹7/mo | Or use existing |
| Hetzner Backup Space (optional) | ~₹200 | Offsite encrypted backups |
| SMTP relay (AWS SES) | ₹0–500 | Usage-based; ~₹40/100K emails |
| Monitoring (UptimeRobot free) | ₹0 | Free tier sufficient |
| **Total base infra** | **~₹1,400–1,900/mo** | Leaves ₹3,100–3,600 for paid add-ons |
| **Headroom** | **₹3,100–3,600/mo** | For optional managed DB, backups, etc. |

---

## Category-by-Category Comparison

### 1. Softr Replacement — Internal Web App Builder

**Current:** Softr on Airtable for retail/B2B order management
**Need:** Drag-and-drop internal app builder connected to database

| Tool | License | Stack | GitHub Stars | Self-Host Ease | Mobile | Indian Readiness | Verdict |
|------|---------|-------|-------------|----------------|--------|-----------------|---------|
| **Appsmith** | Apache 2.0 | JS/React | 37K+ | Easy (Docker) | Manual responsive | No specific India issues | **Best for devs** who know JS |
| **ToolJet** | AGPL 3.0 | JS/React | 38K+ | Easy (Docker) | Manual | Good RBI support | **Best balanced** — 80+ integrations |
| **Budibase** | GPL 3.0 | JS/Svelte | 25K+ | Easy (Docker) | Auto-responsive | Fastest CRUD gen | **Best for non-tech** team members |
| **DronaHQ** | Proprietary | - | - | Cloud only | Good | Indian company | Paid, closed source — skip |

**Recommendation:** **ToolJet** for the balance of integrations (80+), JS + Python scripting, built-in workflow engine, and no user limits on self-hosted CE. Appsmith if your team prefers JavaScript. Budibase if the person building the app has zero coding experience.

**Self-hosting:** Single Docker container, ~1GB RAM, connects to PostgreSQL. Deploy alongside NocoDB or directly to your Postgres.

**Risk:** ToolJet's AI features are cloud-only; self-hosted CE lacks some polish. Appsmith requires JavaScript for complex logic — non-devs will struggle.

---

### 2. Airtable Replacement — Database GUI / Low-Code DB

**Current:** 7 interconnected Airtable bases for inventory, production, orders
**Need:** Self-hosted Airtable-like interface on existing database

| Tool | License | Stack | GitHub Stars | Self-Host Ease | Connects to Existing DB | Mobile | Verdict |
|------|---------|-------|-------------|----------------|------------------------|--------|---------|
| **NocoDB** | AGPL 3.0 | Node.js/TS | 51K+ | **Very easy** (1 container, 512MB RAM) | **Yes** — Postgres, MySQL, SQL Server, SQLite | Responsive web | **Best pick** — sits on your existing DB |
| **Baserow** | MIT | Python/Django | 9K+ | Medium (3+ containers, 2GB RAM) | No — own Postgres only | Responsive web | Cleanest UI, but requires migration |
| **Teable** | AGPL 3.0 | TS/React | 15K+ | Easy (Docker) | Postgres-native | Good | Newer, real-time collab |
| **Grist** | Apache 2.0 | Python/Node | 7K+ | Easy (Docker) | Postgres/SQLite | Good | Best for spreadsheet power users |
| **Supabase Dashboard** | Apache 2.0 | TS/React | 75K+ | Medium (13 containers) | Postgres only | Good | Overkill for just Airtable replacement |

**Recommendation:** **NocoDB** — it's the only tool that connects directly to your existing PostgreSQL/MySQL database without migrating a single row. Your 7 Airtable bases become views on your own database. Your team gets Airtable-style grids, forms, kanban, calendar — but the data never leaves your infra. 512MB RAM, single Docker container, 20-minute setup.

**Risk:** NocoDB switched from AGPL to "Sustainable Use License" in v0.301 (fair-code, not true OSS). For internal use this doesn't matter, but be aware. Formula migration from Airtable doesn't transfer automatically — you rebuild formulas as SQL expressions.

---

### 3. n8n Enhancement — Workflow Automation

**Current:** n8n self-hosted (partially implemented)
**Need:** Supplement or evaluate alternatives

| Tool | License | Stack | Ease | Key Strength | Mobile | Verdict |
|------|---------|-------|------|-------------|--------|---------|
| **n8n** (keep) | Sustainable Use | Node.js/TS | Easy | 400+ integrations, mature | Read-only web | **Keep as primary** |
| **Activepieces** | MIT | TypeScript | Easy (512MB RAM) | Modern UI, AI steps, high throughput | Responsive | **Best supplement** for high-volume flows |
| **Node-RED** | Apache 2.0 | Node.js | Easy (256MB RAM) | IoT, MQTT, hardware | Web only | Niche — not needed |
| **Huginn** | MIT | Ruby | Medium | Web scraping, RSS monitoring | Functional | Overlap with n8n |
| **Windmill** | AGPL 3.0 | Rust + Python/TS | Medium | Code-first, auto-generated UIs | Functional | If you write scripts |
| **Temporal** | MIT | Go | Hard | Durable execution, exactly-once | N/A | **Overkill** — for mission-critical only |

**Recommendation:** **Keep n8n** as your primary automation engine — it's already partially implemented and has the broadest integration catalog. Add **Activepieces** as a supplement IF you have high-volume workflows (it handles thousands of executions/hour better) or if n8n's fair-code license becomes an issue for embedding.

**Risk:** Don't replace n8n with Activepieces unless you have a specific reason — the migration cost exceeds any benefit for a partially-deployed system. Temporal is massive overkill for a D2C brand.

---

### 4. Self-Hosted Analytics — Privacy-Friendly GA4 Replacement

**Current:** GA4 + Microsoft Clarity
**Need:** Privacy-compliant analytics for Indian mobile users

| Tool | License | Stack | RAM | Self-Host | Cookieless | Mobile Tracking | Verdict |
|------|---------|-------|-----|-----------|------------|---------------|---------|
| **Umami** | MIT | Node.js + Postgres | ~150MB idle | **Very easy** (Docker, 15 min) | **Yes (default)** | Excellent | **Best pick** for lightweight needs |
| **Plausible** | AGPL 3.0 | Elixir + ClickHouse + Postgres | ~500MB-2GB | Medium (ClickHouse) | Yes (default) | Excellent | Best UX, but heavier |
| **Matomo** | GPL 3.0 | PHP + MySQL/MariaDB | ~1-4GB | Medium (PHP stack) | Configurable | Good | GA feature parity, overkill |
| **PostHog** | MIT | Python + ClickHouse + Kafka | 4GB+ (**min 16GB**) | Hard (7+ services) | Configurable | Good | **Product** analytics, not web analytics |
| **OpenPanel** | AGPL 3.0 | Go + ClickHouse | ~2GB | Medium | Yes (default) | Good | Newer, combined web+product |

**Recommendation:** **Umami** — it's the lightest (150MB RAM, runs on a ₹590 VPS), MIT licensed, cookieless by default (no consent banner needed in India/Europe), and the data lives in PostgreSQL (you can query it with SQL). Setup is literally one Docker Compose file in 15 minutes. If Umami's basic metrics aren't enough, upgrade to **Plausible** for goal tracking and UTM campaigns.

**Skip PostHog** for web analytics — it's built for SaaS product analytics (feature flags, session replay, A/B testing), requires 16GB+ RAM, and is genuinely painful to self-host. Use PostHog Cloud free tier only if you later need product analytics.

**Risk for India:** None of these tools have built-in Indian traffic segmentation (state-level, language). That data comes from device geo-IP, which all support. Umami's data is in Postgres so you can build custom queries.

---

### 5. Self-Hosted Email Marketing — D2C Email/SMS Flows

**Current:** Probably Mailchimp or Klaviyo
**Need:** Self-hosted alternative for email campaigns, drip sequences

| Tool | License | Stack | RAM | Automation Depth | Mobile | Verdict |
|------|---------|-------|-----|-----------------|--------|---------|
| **Listmonk** | AGPL 3.0 | Go + Postgres | **~50MB idle** | Basic (broadcasts, segments) | Responsive | **Best pick** — light, fast, handles millions |
| **Mautic** | GPL 3.0 | PHP + MySQL | ~1-4GB | **Full** (lead scoring, multi-channel, landing pages) | Responsive | Overkill for D2C |
| **Keila** | AGPL 3.0 | Elixir + Postgres | ~512MB | Moderate (segments, schedules) | Responsive | Clean UI, EU origin |
| **Sendportal** | MIT | PHP/Laravel | ~256MB | Moderate | Responsive | Good middle ground |
| **Postal** | MIT | Ruby + MariaDB | ~2GB+ | N/A (MTA, not campaign tool) | N/A | **Skip** — use SES instead |

**Recommendation:** **Listmonk** — single Go binary, 50MB RAM, handles millions of subscribers on a ₹1,180/mo VPS. Connect it to **Amazon SES** (₹0.40/1K emails) as the SMTP relay. Total cost: ~₹1,500/mo for the stack vs ₹20K+/mo for Klaviyo at 10K subscribers. Listmonk's limitation is no drip sequences — you'd use n8n to trigger timed sends via Listmonk's API.

**If you need full automation** (drip sequences, lead scoring, landing pages): use **Mautic**, but expect heavier ops (4 containers, cron jobs, 2-4GB RAM, ~1hr/week maintenance).

**CRITICAL WARNING:** Do NOT self-host the MTA (Postal, Postfix, etc.). Running your own email server from an Indian IP with no reputation means months of warm-up, and 90% of your emails will land in spam. Always use a managed SMTP relay (SES, SendGrid, Mailgun).

---

### 6. Open-Source CRM — Simple Customer Management

**Current:** Unknown (possibly Notion or Google Sheets)
**Need:** Lightweight CRM for order customers and wholesale buyers

| Tool | License | Stack | RAM | Mobile App | Email Sync | Indian Readiness | Verdict |
|------|---------|-------|-----|-----------|-----------|-----------------|---------|
| **Twenty** | AGPL 3.0 | TS/React + Postgres + Redis | ~800MB | Responsive web | Gmail/Outlook | Good, growing | **Best modern** CRM, API-first |
| **EspoCRM** | AGPL 3.0 | PHP + MySQL | **~200MB** | Responsive web | Full IMAP | Good documentation | **Best balanced** — mature, stable |
| **SuiteCRM** | AGPL 3.0 | PHP + MySQL | ~500MB | Mobile app | Full | Enterprise-ready | **Overkill** for now |
| **ERPNext CRM** | GPL 3.0 | Python + MariaDB | ~1-2GB | PWA | Basic | **Best India** (GST, TDS native) | Only if using full ERPNext |

**Recommendation:** **EspoCRM** — it's the most pragmatic choice for a solo founder. 200MB RAM (runs on smallest VPS), full email sync (critical for sales), no-code customization, web forms for lead capture, and well-documented Docker setup. It's less flashy than Twenty but more battle-tested.

**Twenty** if you want a modern, Notion-like experience and your tech comfort is high. It's VC-backed (YC) and developing fast, but still missing quotes/invoices, customer portal, and mobile app.

**ERPNext CRM** only if you're also adopting ERPNext for inventory/manufacturing (next section).

---

### 7. Inventory / Manufacturing ERP

**Current:** Airtable bases for inventory, production tracking
**Need:** Raw materials, production batches, BOM, batch tracking

| Tool | License | Stack | RAM | Manufacturing MRP | GST/TDS Native | Mobile | Verdict |
|------|---------|-------|-----|-------------------|---------------|--------|---------|
| **ERPNext** | GPL 3.0 | Python (Frappe) + MariaDB | ~2GB | **Full** BOM, work orders, MRP, quality | **Yes** — built-in CGST/SGST/IGST, e-invoicing, e-Way Bill | PWA (functional) | **Best pick** for Indian manufacturing |
| **Dolibarr** | GPL 3.0 | PHP + MySQL | ~256MB | Basic (BOM, MOs) | Third-party modules | Responsive | Lightest, but manufacturing weak |
| **Tryton** | GPL 3.0 | Python + Postgres | ~1GB | Solid (BOM, routings, cost rollups) | Limited India support | Web + GTK | Accounting rigor, small India ecosystem |
| **Odoo Community** | LGPL 3.0 | Python + Postgres | ~2GB | Limited in Community | Modules available | Excellent | Paywalled features in Enterprise |

**Recommendation:** **ERPNext** — it's literally built in India (Frappe Technologies, Mumbai), has native GST/e-invoicing/e-Way Bill support that's updated for Indian compliance, and the manufacturing module covers BOMs, work orders, production planning, quality checks, and batch/serial tracking. The Frappe Framework also lets you create custom "DocTypes" (database tables + forms) from the browser without code — useful for TPL-specific production workflows.

**Start small:** Deploy ERPNext for **inventory and production tracking only** (skip HR, accounting, website modules initially). Connect NocoDB as a view layer for ops who need spreadsheet-style access to ERPNext's data.

**Risk:** ERPNext is architecturally complex — multiple containers (Redis, MariaDB, Socket.io, workers), and the Bench CLI has a learning curve. Budget 2-3 days for initial setup if you're doing it solo. Consider Frappe Cloud (managed, from $50/user/mo) if self-hosting becomes overwhelming — but at your scale, a ₹1,180 VPS handles it fine.

**Skip Dolibarr** if manufacturing MRP matters — its module is basic. **Skip Tryton** for now — the India ecosystem is tiny, you'd be building GST compliance yourself.

---

### 8. Document / File Management

**Current:** Google Drive for internal docs
**Need:** Self-hosted document archive, PDF tools, eSignatures

| Tool | License | Purpose | RAM | Self-Host | Mobile | Verdict |
|------|---------|---------|-----|-----------|--------|---------|
| **Paperless-ngx** | GPL 3.0 | Document archive + OCR + search | ~500MB-1GB | Easy (3 containers) | Responsive + community Android app | **Best for document management** |
| **Stirling-PDF** | GPL 3.0 | PDF manipulation toolkit | ~150MB | **Very easy** (1 container) | Responsive web | **Best for PDF tools** — merge, split, sign |
| **DocuSeal** | AGPL 3.0 | eSignatures | ~200MB (SQLite mode) | **Very easy** (1 container) | Mobile-first responsive | **Best for eSigning** — contracts, NDAs |
| **Documenso** | AGPL 3.0 | eSignatures | ~400MB | Medium (PostgreSQL required) | Responsive | Better crypto, heavier setup |
| **Teedy** | GPL 2.0 | Document management | ~400-800MB | Easy | Web only | Lighter than Paperless, less features |

**Recommendation:** Run all three as a document stack — they each solve different problems:

1. **Paperless-ngx** — scan/OCR/tag/store all your supplier invoices, production documents, contracts. 42K GitHub stars, very active dev. ML-based auto-tagging improves over time.
2. **Stirling-PDF** — merge PDFs, split, convert formats, compress. 78K GitHub stars. Use it to prepare documents before filing in Paperless.
3. **DocuSeal** — self-hosted DocuSign replacement for contracts with suppliers, retailers, wholesale agreements. Single container with SQLite, 11.5K GitHub stars, supports 14+ languages, SMS delivery for signers.

**Risk:** Paperless-ngx resource spikes during OCR (~2GB RAM for batch processing). DocuSeal's free self-hosted edition is fully functional (AGPL) — no paywalls. For Indian eSignatures, DocuSeal's compliance with ESIGN/UETA/eIDAS is fine for business contracts; check with your lawyer for Aadhaar-based eSign requirements.

---

## Recommended Stack — Phased Implementation

### Tier 1: Launch Critical (Week 1-2)
| Tool | Purpose | Monthly Cost | Setup Time | Priority |
|------|---------|-------------|------------|----------|
| **NocoDB** | Airtable replacement on existing DB | ₹0 (on existing VPS) | 20 min | **P0** — immediate Airtable cost savings |
| **Umami** | Privacy-friendly analytics | ₹0 (same VPS) | 15 min | **P0** — start collecting data Day 1 |
| **ToolJet** | Softr replacement for order mgmt | ₹0 (self-hosted) | 1-2 days | **P0** — core ops workflow |
| **Vultr Mumbai VPS** | Infrastructure host | ₹1,180/mo | 1 hour | **P0** — foundation |

### Tier 2: Day 30
| Tool | Purpose | Monthly Cost | Setup Time | Priority |
|------|---------|-------------|------------|----------|
| **ERPNext** (inventory + mfg only) | Production tracking, batch mgmt | ₹0 (same VPS) | 2-3 days | **P1** — replaces Airtable bases |
| **Listmonk + SES** | Email marketing | ₹500-1,500/mo | 1 day | **P1** — replaces Mailchimp/Klaviyo |
| **DocuSeal** | eSignatures for suppliers/retailers | ₹0 (same VPS) | 30 min | **P1** — ops efficiency |
| **EspoCRM or Twenty** | Customer/wholesale CRM | ₹0 (same VPS) | 1-2 days | **P1** — replaces Notion CRM |

### Tier 3: Nice to Have (Day 60+)
| Tool | Purpose | Monthly Cost | Setup Time | Priority |
|------|---------|-------------|------------|----------|
| **Paperless-ngx** | Document archive | ₹0 (same VPS) | 1 hour | **P2** — ops SOP docs |
| **Stirling-PDF** | PDF toolkit | ₹0 (same VPS) | 10 min | **P2** — useful but non-critical |
| **Activepieces** | High-volume automation supplement | ₹0 (same VPS) | 1 hour | **P2** — if n8n hits limits |
| **Mautic** | Full marketing automation | ₹0 (same VPS) | 1-2 days | **P3** — only if Listmonk too basic |

### Monthly Cost Summary

| Phase | Tools | VPS Cost | Tool Licenses | SMTP/Other | **Total** |
|-------|-------|----------|--------------|------------|-----------|
| **Tier 1** | NocoDB + Umami + ToolJet | ₹1,180 | ₹0 (self-hosted) | ₹0 | **₹1,180/mo** |
| **Tier 2** | + ERPNext + Listmonk + DocuSeal + CRM | ₹1,180 (same VPS) | ₹0 | ~₹500 (SES) | **~₹1,680/mo** |
| **Tier 3** | + Paperless + Stirling + extras | ₹2,360 (may need bigger VPS) | ₹0 | ~₹500 | **~₹2,860/mo** |

**All within ₹5,000/mo ceiling**, with headroom.

---

## Risk Warnings

### 🔴 High Risk
1. **Self-hosting email delivery (Postal, Postfix, etc.).** Do NOT do this. Indian IPs have poor email reputation. You'll spend months warming IPs and 90% of sends will land in spam. Always use Amazon SES/SendGrid/Mailgun as relay.
2. **Running PostHog self-hosted.** It requires 16GB+ RAM, 7+ services (ClickHouse, Kafka, Redis, Postgres), and constant maintenance. Use PostHog Cloud free tier or skip entirely.
3. **ERPNext without commit.** Its complexity will consume you if you try to customize everything Day 1. Deploy with default settings, use only inventory + manufacturing modules, resist the urge to over-customize.

### 🟡 Medium Risk
4. **NocoDB license shift.** It's now "Sustainable Use License" (not true open source). Fine for internal use, but if you ever want to resell it as a service, you need a commercial license. Consider Baserow (MIT) if this bothers you.
5. **ToolJet self-hosted version lag.** Some AI features and integrations are cloud-only. Verify your needed connectors work in CE before committing.
6. **Backup discipline.** Self-hosting = you own backups. A corrupted database with 3 months of orders = business damage. Use automated encrypted offsite backups from Day 1.
7. **UPSERT into existing patterns.** Your team is used to Airtable and Softr. NocoDB and ToolJet will feel different. Budget 1-2 days for training on the new UI.

### 🟢 Low Risk
8. **Listmonk vs Mautic.** If you just need newsletters, Listmonk is perfect. If you later need drip sequences, you can add them via n8n → Listmonk API without migrating platforms.
9. **VPS sizing.** A Vultr 2GB handles all Tier 1-2 tools. If you add ERPNext with heavy concurrent users, bump to 4GB (₹2,360/mo on Vultr). Still under ₹5K.
10. **Mobile experience.** All recommended tools have responsive web UIs. None have native mobile apps (except Paperless-ngx has a community Android app). This is acceptable for internal ops tools — your team uses them on mobile for data lookup, not heavy data entry.

---

## Decision Framework for Dan

**If you only do ONE thing this month:**
Deploy **NocoDB** on your Vultr VPS. Connect it to your existing database. Give your team an Airtable-like UI. Kill your Airtable subscription. This alone pays for the VPS for 2 years.

**If you do TWO things:**
Add **ToolJet** (or Appsmith) to build the order management UI your team uses daily in Softr. Connect it to the same Postgres database that NocoDB surfaces.

**If you have bandwidth for THREE:**
Add **Umami** for analytics. Replace GA4 entirely. One Docker Compose file, 15 minutes, cookieless tracking.

The rest can wait. Deploy in this order and each step compounds — NocoDB gives you a data layer, ToolJet gives you a UI on it, Umami tells you if your launch traffic is real.
