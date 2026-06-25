# Project Governance — The Product Lab Relaunch

<!-- last-updated: 2026-06-20 -->

This document defines the governance rules for the The Product Lab relaunch project. All 25 agents across 9 pods must follow these rules. When in doubt, the rules here override convention.

---

## 1. Platform Source of Truth

### The Active Platform

**Medusa v2 + Next.js 16 + Supabase (Postgres) + managed Redis is the active launch platform.** This was established by D-025 (2026-06-11), which reversed D-022 (Fynd first, Medusa deferred).

All project documentation must reflect this reality. Any document that still says "Fynd is current" or "Medusa is deferred" without a deprecation banner is stale.

### Where the Platform Decision Is Documented

| File | Platform Content Required | Last Updated |
|------|--------------------------|-------------|
| `CLAUDE.md` | Must state current platform truth | 2026-03-26 (STALE — needs update) |
| `docs/ARCHITECTURE.md` | Architecture source of truth — see Platform Decision History §1 | Updated with this revision |
| `knowledge/26-CURRENT-STATE.md` | Updated after every working session | 2026-06-20 |
| `README.md` | Must state current platform (not Fynd) | STALE — currently says "launch decision currently favors Fynd first" |
| `decisions/decision-log.md` | D-025 active, D-022 superseded | 2026-06-20 |
| `knowledge/CROSS-REFERENCE-MAP.md` | D-025 → D-022 supersession shown | 2026-06-20 |

### Updating Platform Decisions

When the platform decision changes again (unlikely, but possible):

1. Log a new decision in `decisions/decision-log.md` that explicitly supersedes the previous platform decision (as D-025 superseded D-022)
2. Update the old decision's status to "Superseded by D-XXX" and append a `Superseded by:` note
3. Update all files listed in the table above within the same session
4. Add a deprecation banner to any file being replaced (see §10 Deprecation Policy)
5. Update the cross-reference map with new decision → artifact links

### Platform Independence Rule

All config, credentials, and environment-specific values must be environment-parameterized.

- **NEVER** hardcode API keys, database URLs, payment secrets, or service endpoints in source code.
- **NEVER** commit `.env` files (local or production).
- **ALWAYS** use `.env.template` files to document required environment variables.

---

## 2. Decision Log Hygiene

### Every Material Decision Gets an Entry

A "material decision" is any choice that:
- Affects the platform, architecture, or tech stack
- Changes scope, pricing, or brand direction
- Commits budget or resources
- Reverses a previous decision
- Changes launch criteria or timeline
- Creates a new artifact that affects downstream agents

### Decision Entry Format

Use `templates/decision-entry.md` for full records. At minimum, every entry in `decisions/decision-log.md` must include:

| Field | Required | Notes |
|-------|----------|-------|
| Date | Yes | ISO format (YYYY-MM-DD) |
| ID | Yes | Sequential D-XXX (D-001, D-002, ...) |
| Decision | Yes | Clear, one-line summary |
| Owner | Yes | Who decided |
| Status | Yes | Active / Superseded / Proposed / Resolved |
| Source / Artifacts | Yes | Links to key artifacts, code, knowledge files |
| Rationale | In template | Why this decision was made |
| Alternatives | In template | What was considered and rejected |
| Linked Knowledge | In template | Knowledge files that informed the decision |

### Unique IDs — NO DUPLICATES

D-029 was used twice in the log (2026-06-13 technical launch gate and 2026-06-19 COD fulfillment). This is a hygiene violation.

**Rule:** Every decision ID is unique. If a new decision must be logged on the same date as an active one, assign the next sequential ID.

### Supersession Tracking

When a decision reverses a previous one:

1. New entry status: **Active** with a note "Supersedes D-XXX"
2. Old entry status: Changed from **Active** to **Superseded by D-XXX**
3. Old entry gets a `Superseded by:` line referencing the new decision
4. The cross-reference map is updated to show the supersession chain

Example from the log: D-025 (Active, "Supersedes D-022") and D-022 (Superseded by D-025).

### Linking Decisions to Artifacts

Every decision entry must reference the key artifacts it creates or affects. This enables the cross-reference map to maintain bi-directional links. When creating an artifact, update both:

1. The decision entry's "Source / Artifacts" column
2. The cross-reference map's "Decisions → Artifacts Affected" section

---

## 3. Document Freshness Rules

### Required Freshness Table

| Document | Update Trigger | Responsible |
|----------|---------------|-------------|
| `CLAUDE.md` | Platform change, agent roster change, rule change | Harley |
| `docs/ARCHITECTURE.md` | Any architecture/decision change affecting systems | Harley |
| `knowledge/26-CURRENT-STATE.md` | **After every working session** — this is the living session-start doc | Harley |
| `status/weekly-status.md` | Every session (or at least weekly) | Harley |
| `status/sprint-board.md` | Task progression within Phase 4 | Claire |
| `README.md` | Platform change, major scope change | Harley |
| `decisions/decision-log.md` | Every material decision | Harley or deciding agent |
| `knowledge/CROSS-REFERENCE-MAP.md` | Every new artifact OR decision | Agent creating artifact or logging decision |
| Agent files (`agents/*.md`) | When agent role/scope changes | Harley |
| Pod files (`pods/*/`) | When pod deliverables change | Harley |

### The Stale Document Rule

Any document that:
- Mentions "Fynd" as the current platform AND
- Hasn't been updated since 2026-06-11 (D-025 date)

...is automatically stale and must be updated or deprecated on discovery.

### No Zombie Documents

If a document is no longer accurate and cannot be updated immediately:
1. Add a `<!-- STALE -->` HTML comment as the first line
2. Add a visible deprecation banner at the top (see §10)
3. Document what supersedes it
4. Schedule an update within the next working session

---

## 4. Cross-Reference Map Maintenance

The cross-reference map at `knowledge/CROSS-REFERENCE-MAP.md` is the project's nervous system. Without it, agents cannot navigate between decisions, artifacts, agents, and knowledge files.

### Update Rules

**When creating a new artifact:**
1. Add the artifact to §2 (Artifacts → Source Decisions & Producing Agent)
2. List the source decisions that shaped it
3. Identify which agent produced it
4. Add it to the producing agent's entry in §4 (Agents → Artifacts Produced)
5. If it's code, add it to §5 (Code ↔ Design Source Map)

**When logging a new decision:**
1. Add the decision to §1 (Decisions → Artifacts Affected)
2. List all affected artifacts with full paths
3. List all affected knowledge files
4. Update the old decision entry if this one supersedes it

**When a decision status changes:**
1. Update the status in §1
2. Add supersession notes to both old and new entries

**Bi-directional link rule:**
- Decision → Artifact links must be mirrored as Artifact → Decision links
- Agent → Artifact links must be mirrored as Artifact → Agent links
- Every entry in the decision log must be represented in §1 of the cross-reference map

---

## 5. Secrets Management

### What Counts as a Secret

- API keys and tokens (Razorpay, Shiprocket, Meta WhatsApp, SendGrid, Resend)
- Database connection strings with credentials
- JWT secrets and encryption keys
- Admin login credentials
- Third-party service passwords
- OAuth client secrets
- Payment gateway webhook secrets
- Any token that grants access to production data or services

### Where Secrets Live

| Environment | Secret Storage | Access Control |
|-------------|---------------|----------------|
| Local development | `.env.local` / `.env` (in `.gitignore`) | Developer's machine only |
| Production storefront | Vercel Environment Variables | Vercel project admins |
| Production Medusa | Railway/Render/Fly env manager | Service dashboard + 2FA |
| Backup/all | 1Password vault ("TPL Production") | Dan + Harley |

### Secret Hygiene Rules

1. **Never** commit secrets to any branch — not in code, not in docs, not in run notes, not in COMMENTS
2. **Always** use `.env.template` files (without values) to document required environment variables
3. **Always** add `.env`, `.env.local`, `.env.*.local` to `.gitignore` at every level
4. **Never** log secrets in console output, error messages, or audit trails
5. **Never** paste secrets into artifact files, knowledge files, or handoff documents
6. **Rotate immediately** if a secret is exposed in any commit, log, or shared document — revoke the old key, generate a new one, update all environments
7. **Pre-commit secret scanning** — when committing, inspect `git diff` for any accidental secret inclusion before committing

### Env Template Standards

Every `.env.template` must follow this format:

```bash
# Database
DATABASE_URL=postgres://user:password@host:5432/db

# Payment
RAZORPAY_KEY_ID=pk_live_xxx
RAZORPAY_KEY_SECRET=sk_live_xxx
RAZORPAY_WEBHOOK_SECRET=whsec_xxx

# Shipping
SHIPROCKET_EMAIL=partner@theproductlab.in
SHIPROCKET_PASSWORD=
SHIPROCKET_API_TOKEN=

# Auth
MEDUSA_ADMIN_EMAIL=admin@theproductlab.in
MEDUSA_ADMIN_PASSWORD=
MEDUSA_JWT_SECRET=

# Notifications
WHATSAPP_PROVIDER=meta
META_WHATSAPP_ACCESS_TOKEN=
META_WHATSAPP_PHONE_NUMBER_ID=
SMTP_HOST=
SMTP_USER=
RESEND_API_KEY=
```

---

## 6. Catalog Data Governance

### Systems of Record

| Data Type | Canonical Source | Notes |
|-----------|-----------------|-------|
| Runtime product data | **Medusa database** | Created via import pipeline, managed via Medusa admin |
| Historical/legacy catalog | `catalogs/` static files | Dev fallback only. NOT runtime truth. |
| Curation decisions | `artifacts/phase-4/catalog-curation/` | Drop 1 curation history. Not live data — decisions that were applied. |
| WooCommerce source | `TPL DUMP/wc-product-export-*.csv` | Import source. Not updated. Read-only reference. |

### Import Pipeline

```
WooCommerce CSV export
  → prep-woo-catalog.py (preprocess: group variants, filter, dedupe)
  → import-catalog.json (intermediate import format)
  → import-woo.ts (npx medusa exec) — writes to Medusa DB
  → curate-drop1.py (curation rules: draft licensed IP, publish text-opinion)
  → apply-drop1.ts (apply curation to Medusa)
```

### Catalog Governance Rules

1. **Medusa is the canonical runtime source.** Never edit static `catalogs/` files expecting them to propagate to production.
2. **Static catalog files are legacy/dev fallback only.** They exist for local development when Medusa is unavailable. They must NOT be treated as the source of truth.
3. **Curation artifacts are history, not runtime.** Documents in `artifacts/phase-4/catalog-curation/` record what was decided and why — they are NOT input to any running system.
4. **Import/export contract:** Every product in Medusa must have: `SKU`, `handle`, `title`, `price` (INR), `image` URL, `published`/`draft` status, `metadata.licensing_flag` (if applicable). Variant modeling choice (single vs multi-variant) is a curation-pass decision.
5. **Licensed IP products** (Nike, Star Wars, Disney, etc.) remain in **draft** status. They must pass licensing review before any Drop.
6. **Product images** hotlinked from WooCommerce must be ported to Supabase Storage / Cloudinary before launch. Hotlinked URLs are testing-only.

### Key Scripts

| Script | Location | Purpose |
|--------|----------|---------|
| `prep-woo-catalog.py` | `backend/medusa/src/scripts/` | CSV → JSON preprocessing |
| `import-woo.ts` | `backend/medusa/src/scripts/` | JSON → Medusa DB via `createProductsWorkflow` |
| `seed-tpl.ts` | `backend/medusa/src/scripts/` | Store infrastructure seed (regions, etc.) |
| `setup-shipping-cod.ts` | `backend/medusa/src/scripts/` | Shipping options + COD provider setup |
| `curate-drop1.py` | `backend/medusa/src/scripts/` | Drop 1 curation rules |
| `apply-drop1.ts` | `backend/medusa/src/scripts/` | Apply curation to Medusa |

**Dead scripts (do not use):** `convert_catalog.ts`, `seed-products.ts` — these exist in the repo but are superseded by the WooCommerce import pipeline.

---

## 7. Repository Guidelines

### Monorepo vs Separate Repos

**Current state:** Monorepo (one Git repository for everything).

**Status:** This is a working convention, not a finalized decision. The project is growing, and the monorepo approach may need revisiting.

**Interim rules:**
- Clear boundaries between `storefront/`, `backend/medusa/`, `docs/`, `knowledge/`, `artifacts/` and other top-level directories
- Each app has its own `package.json`, `.gitignore`, `Dockerfile`, and README
- Root-level scripts for common operations (proposed — not yet built)

### Recommended Directory Structure (Cleanup Target)

```
apps/storefront/       # Next.js 16 storefront
services/commerce/     # Medusa v2 backend
packages/catalog/      # Shared catalog types/utilities
ops/agents/            # Agent definitions
ops/status/            # Sprint boards, status reports
ops/decisions/         # Decision log (or linked from ops/decisions/ → decisions/)
content/knowledge/     # Current knowledge files
content/artifacts/     # Phase deliverables
brand/assets/          # Brand files
brand/design/          # Design files
archive/               # Deprecated/superseded content
```

This is aspirational. Until a cleanup pass is done, the current top-level structure stays.

### .gitignore Rules

Every sub-project must have its own `.gitignore` that at minimum ignores:

```
.env
.env.local
.env.*.local
node_modules/
.next/
dist/
build/
.medusa/
*.log
```

### Root Orchestration Scripts (Proposed)

These do not exist yet but should be added:

```bash
# In root package.json (if monorepo) or just-build.sh:
build-all       # Build storefront + backend
lint-all        # ESLint both projects
test-all        # Run test suites
dev             # Start storefront + backend + DB concurrently
check           # Pre-commit: lint + typecheck + test
```

---

## 8. Mission Control Governance

### Current Status

Mission Control (`storefront/src/app/mission-control/`) is a **standalone agent orchestration dashboard** — a dark-themed project command center with 6 tabs (Overview, Milestones, Goals, Agents, Decisions, Blockers). It was added as a prototype/integration artifact (D-026).

### Role Clarity Needed

Mission Control has an ambiguous role:
- **Active internal tool:** It renders real project data from the file system and provides an agent-facing dashboard.
- **Future product:** It could become the long-term agent ops interface.
- **Archived evaluation:** It could be relegated to `archive/` if it's not maintained.

### Until Role Is Decided

1. **If promoted:** Fix host allowlist, implement agent task access for bulk operations, add privilege escalation guards, and wire it to real Medusa data.
2. **If archived:** Move to `archive/evals/mission-control/` or remove from the launch storefront route. Add a deprecation banner to the route.
3. **Current:** It lives at `/mission-control` in the storefront. The root layout uses `StorefrontChrome` to conditionally hide storefront chrome on this route. Do NOT add it to any production navigation or menu.

---

## 9. AI / Agent Commerce Governance

### Public AI-Readable Surfaces

Files served to AI crawlers (sitemap, `llms.txt`, feeds, JSON-LD) must contain:

1. **Canonical, up-to-date product data** — matching what customers see on the storefront
2. **Published products only** — no draft, no unapproved, no licensed-IP-pending-review
3. **Accurate pricing** — INR values matching Medusa pricing
4. **Real availability** — no "in stock" for out-of-stock items

### Agent Endpoint Rules

| Surface | Auth | Rate Limit | Notes |
|---------|------|-----------|-------|
| Public product data | None | Standard | Matching storefront data |
| Public collection data | None | Standard | Matching storefront data |
| Guest order tracking | Claim token | 10/min per IP | By phone/email + order ID |
| Admin product search | Medusa service account | 60/min | Includes draft products |
| Admin order operations | Medusa service account | 30/min | Fulfill, cancel, update |
| Admin customer lookup | Medusa service account | 30/min | Customer details, order history |
| Bulk product update | Medusa service account | 10/min | Requires audit trail |

### Prohibited AI Commerce Practices

- **No fake reviews or ratings** — all AI-accessible review data must reflect genuine customer feedback
- **No unsupported ratings** — never generate star ratings, scores, or comparisons that don't exist in the data
- **No invisible offers** — any promotion or discount exposed via AI must also be visible to human customers
- **No hallucinated inventory** — AI must only report real SKU availability from Medusa
- **No customer PII exposure** — order lookup by token only; never expose email, phone, or address through public agent surfaces

### Audit Trail

All authenticated agent write operations must:
1. Log to the Medusa audit trail (via `metadata` or custom audit entry)
2. Record the agent identity (service account email)
3. Record the action, timestamp, and affected entities
4. Enable rollback where feasible

---

## 10. Deprecation & Archival Policy

### Principles

- **No deletion** — per project rules. Old files get deprecation banners, not deletion.
- **Archived files move to `archive/`** with a readme explaining what, why, and when.
- **Superseded files stay in place** but with a clear deprecation banner at the top.
- **Duplicate artifact copies** become historical pointers to the canonical copy.

### Deprecation Banner Format

For files that are stale but must remain in place:

```markdown
<!-- DEPRECATED: This file describes the Fynd-first approach. Superseded by D-025 (2026-06-11). -->
<!-- See docs/ARCHITECTURE.md §1 for current platform architecture. -->
> **⚠️ DEPRECATED** — This document reflects the pre-D-025 platform plan.
> The active launch platform is now **Medusa v2 + Next.js 16**.
> See [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) for the current architecture.
```

### Archival Process

1. **Identify** the file or directory to archive
2. **Verify** nothing in the running system depends on it
3. **Create** `archive/README.md` if it doesn't exist, with a log entry
4. **Move** the file to `archive/` preserving relative path:
   - `docs/fynd-platform-research.md` → `archive/docs/fynd-platform-research.md`
   - `backend/medusa-eval/` → `archive/backend/medusa-eval/`
5. **Leave a stub** at the original path with a deprecation banner and pointer
6. **Update** the cross-reference map to note the archival

### What Goes to Archive

| Candidate | Reason | Status |
|-----------|--------|--------|
| `docs/fynd-platform-research.md` | Fynd-first; superseded by D-025 | Not yet archived |
| `docs/open-source-tooling-research.md` | Research artifact; not active | Not yet archived |
| `backend/medusa-eval/` | Evaluation spike; superseded by active `backend/medusa/` | Not yet archived |
| `docs/PROJECT-SCOPE-AND-STRUCTURE.md` | May be superseded by this document | Review needed |
| Old static catalog files in `catalogs/` | Replaced by Medusa DB | Review needed |

### SOP Consolidation

- All operations SOPs live in `docs/ops-sop/`
- If SOP artifacts exist as duplicates in `artifacts/phase-4/`, the artifact copy becomes a historical pointer:
  ```markdown
  Full canonical copy: `docs/ops-sop/returns-exchange-policy.md`
  ```
- No SOP should exist in two places as an active document

---

## 11. Compliance and Auditing

### Change Control

- All architecture changes go through `decisions/decision-log.md`
- Code changes to storefront and backend go through standard PR/review flow
- Catalog changes go through curation artifacts before Medusa import
- Credential rotation must be logged in the decision log

### Quality Gates

| Gate | Owner | Criteria |
|------|-------|----------|
| Phase gate | Harley | All phase artifacts approved, exit criteria met |
| Launch readiness | James | P0 gates closed (D-029), QA checklist passed |
| Deployment | Tobi | Builds pass, migrations run, env vars configured |
| Auth audit | Tobi + James | No in-memory stores, no seed creds, deny-by-default RBAC |
| Payment test | Tobi + Dan | Razorpay webhook verified, COD flow verified |
| Catalog accuracy | Andy | Published products match curation decisions |

### What to Escalate to Dan

Only these topics require Dan's decision:
- Launch date
- Budget commitment >₹5,000/month
- Drop 2 timing
- Any paid advertising commitment
- Hiring decisions
- Pricing changes (D-006 locked, but Dan may adjust)
- Platform reversals (D-025 superseded D-022 — unlikely to happen again)

---

## 12. Stale Document Inventory (Current)

The following documents are known to be stale or inconsistent with D-025. Each needs a deprecation banner or update.

| Document | Issue | Action |
|----------|-------|--------|
| `CLAUDE.md` | Says "Last updated: 2026-03-26"; no mention of D-025 platform reversal | Needs platform truth update + last-updated bump |
| `README.md` | Says "launch decision currently favors Fynd first" | This is directly contradicted by D-025. Must be updated to state Medusa + Next.js as active. |
| `storefront/CLAUDE.md` | May reference Fynd path | Review and update |
| `backend/medusa/DEFERRED.md` | File exists implying Medusa was deferred; D-025 supersedes this | Deprecation banner + pointer to D-025 |
| `docs/fynd-platform-research.md` | Fynd research document; no longer relevant to active path | Deprecation banner + consider archival |
| Multiple `knowledge/` files pre-D-025 | May reference Fynd as future plan | Review during knowledge maintenance passes |

**Every agent that encounters a stale document must flag it** — either by updating directly (if trivial) or by logging the finding to `status/sprint-board.md` for Claire to track.

---

## 13. Governance Enforcement

These rules are enforced through:

1. **CLAUDE.md session-start protocol** — every agent reads the current state and relevant governance docs at session start
2. **Harley reviews** — all phase gates, decision logs, and handoffs are Harley-reviewed
3. **Cross-reference map update is mandatory** — agents must verify their update before completing a tool call
4. **No-deletion rule** — the file system is append-only for archival purposes
5. **James's launch veto** — no override possible, per project operating rules
6. **Shared memory** — `SHARED.md` syncs state with Colin (Dan's Chief of Staff) for cross-project awareness

Violations (committed secrets, stale docs in critical paths, duplicate decision IDs, missed cross-reference updates) should be logged as blockers in `status/sprint-board.md` and surfaced in the next weekly status.
