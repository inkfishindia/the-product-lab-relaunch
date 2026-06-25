# CTO Codebase Assessment And Improvement Plan

**Date:** 2026-06-20  
**Reviewer:** CTO audit pass with architecture, backend, storefront, security/testing, mission-control, and documentation lenses  
**Scope:** Full workspace at `the-product-lab-relaunch`

## Executive Verdict

The project has strong strategic material and a real commerce implementation, but it is not yet production-clean. The core risk is not lack of direction; it is fragmented ownership across code, docs, repos, decisions, generated artifacts, and secrets.

The active launch path is Medusa + Next.js, per D-025 and later decisions, but several top-level docs still describe Fynd as current or Medusa as deferred. The storefront can build, but lint fails and launch-critical checkout issues remain. The Medusa backend does not currently build. Secrets exist in local workspace files and should be treated as compromised. Mission Control is a capable but separate product/workbench with its own security hardening backlog before any production exposure.

**CTO call:** hold launch until P0 gates below are closed. Continue feature work only behind the stabilization lane.

## Systems Found

| Area | Path | Role | Current State |
|---|---|---|---|
| Storefront | `storefront/` | Next.js 16 customer store, account flows, checkout, admin cockpit | Builds successfully, lint fails, no tests |
| Commerce backend | `backend/medusa/` | Medusa v2 backend, custom COD/Razorpay/Shiprocket/auth routes | Build failing, only health smoke test |
| Commerce planning | `backend/medusa-eval/` | Platform architecture and Medusa evaluation docs | Useful but partly superseded by active build |
| Mission Control | `mission-control-eval/` | Standalone agent orchestration app | Large mature app, not clearly integrated with launch |
| Knowledge/ops | `knowledge/`, `docs/`, `artifacts/`, `status/`, `decisions/`, `handoffs/` | File-based operating system | Rich, but stale and duplicated in places |
| Catalog/data | `catalogs/`, `artifacts/phase-4/catalog-curation/`, Medusa scripts | Product truth, import/curation material | Fragmented between legacy static files and Medusa |
| Deployment | `docker-compose.yml`, app Dockerfiles | Local stack for Postgres, Redis, Medusa, storefront | Dev-oriented; not production-hardened |
| Responsive/product experience | `storefront/src/app/`, `storefront/src/components/`, `storefront/src/app/globals.css` | Device-adaptive shopping, account, checkout, admin UX | Needs explicit breakpoint, layout, and device QA contract |
| AI/agent commerce surface | `artifacts/phase-4/aeo-agent-commerce-readiness.md`, storefront public routes, Medusa APIs | Search, answer-engine, and agent-readable buying surface | Good draft exists; needs implementation and QA gates |

## Health Checks Run

| Check | Result | Notes |
|---|---|---|
| `storefront`: `npm run build` | Pass | Production build completed and generated 46 routes |
| `storefront`: `npm run lint` | Fail | 34 errors, 9 warnings |
| `backend/medusa`: `npm run build` | Fail | TypeScript/build errors in notification module and scripts |
| `mission-control-eval`: `pnpm run typecheck` | Not run | `pnpm` is not installed in local environment |
| `mission-control-eval`: `pnpm run lint` | Not run | `pnpm` is not installed in local environment |
| Root `git status` | Not available | Workspace root is not a Git repository |
| Nested repo status | Dirty/untracked | `storefront/` and `mission-control-eval/` have separate Git state |

## Strengths To Preserve

1. **Recent decision trail is strong.** D-025 through D-031 record key platform, catalog, checkout, admin auth, and customer auth decisions.
2. **Correct commerce boundary is emerging.** Medusa owns commerce truth; Razorpay owns payment truth; Shiprocket owns shipping execution; Airtable remains human ops workflow.
3. **Storefront has meaningful flows built.** Product browsing, cart, COD checkout, account, order history, address book, admin ops, and guest order tracking exist.
4. **Auth design has improved.** Customer Medusa JWT is passed per request instead of mutating a shared SDK singleton; admin service account is server-side.
5. **Mission Control has serious engineering depth.** It has many tests, security primitives, route patterns, and agent orchestration features.
6. **Operational knowledge base is unusually rich.** Agents, pods, decisions, handoffs, SOPs, and phase artifacts give the project a strong operating spine once cleaned.

## P0 Launch Blockers

These block production launch.

### 1. Backend Does Not Build

`backend/medusa` currently fails `npm run build`.

Known causes:
- `smtp-notification` appears incomplete/incompatible with Medusa v2.15 and references a missing `nodemailer` dependency.
- `src/scripts/apply-pdp-copy.ts` has a TypeScript error around nullable `description`.
- `tsconfig.json` includes scripts in the build surface.

Required outcome:
- `cd backend/medusa && npm run build` passes cleanly.
- Notification module is either completed with correct dependency/API usage or removed from active build until ready.
- Build scripts are typed correctly or excluded from production compile if appropriate.

### 2. Payment Flow Is Not Authoritative

Razorpay webhook currently verifies/logs but does not complete Medusa payment-session/order state update. It also signs `JSON.stringify(req.body)` rather than the raw request body, which can break valid webhook signatures.

Required outcome:
- Raw-body signature verification.
- Idempotent webhook processing.
- Payment session/order state update on authorized/captured events.
- Alerting on bad signatures, failed payments, and reconciliation mismatch.
- Tests for success, bad signature, replay, failed payment, and duplicate event.

### 3. COD And Prepaid Rules Are Partly Advisory

COD minimum validation and prepaid discount logic are not fully enforced at the authoritative payment/checkout layer. The COD provider authorizes without checking the cart rule. Prepaid discount can be applied by a custom route and may be race-prone.

Required outcome:
- COD minimum enforced server-side at payment authorization or order creation, not only preflight/UI.
- Prepaid discount accepts only approved provider state, is idempotent, and cannot double-apply.
- Checkout UI display matches the server-computed cart total.

### 4. Secrets Exposure And Local State Hygiene

Live/local secrets are present in workspace files such as `.env.local`, `.env`, and run notes. Do not copy values into docs or tickets; treat them as compromised.

Required outcome:
- Rotate storefront, Medusa, Mission Control, API, admin, JWT/cookie, payment, and gateway secrets that appear in local files.
- Remove secrets from run notes and local docs.
- Add secret scanning before commits and in CI.
- Decide where secrets live: 1Password, Doppler, Vercel/Render env manager, or equivalent.

### 5. Storefront Lint And Launch Defects

Storefront builds but lint fails. More importantly, audit found launch-impacting issues:
- Cart creation from PDP may omit `region_id`.
- Prepaid checkout total may subtract discount twice.
- Admin product UI exposes add/edit/delete flows while API intentionally rejects writes.
- No first-party tests or test script.
- Auth and mutation routes lack visible rate limit/CSRF/origin strategy.
- Responsive risks remain: bottom navigation can duplicate desktop/tablet nav, checkout stays single-column too long, some checkout fields are side-by-side below safe mobile width, cart quantity controls are below the practical 44px touch target, and admin tables rely too heavily on horizontal scroll.

Required outcome:
- `cd storefront && npm run lint` passes.
- Cart creation always uses India region.
- Prepaid total display equals server truth.
- Admin product UI is read-only or routes are implemented intentionally.
- Basic auth/checkout/admin tests exist.
- Responsive QA passes for storefront, account, checkout, and admin flows across mobile, tablet, laptop, desktop, and large-screen viewports.

### 6. Governance Truth Is Inconsistent

Top-level docs still say Fynd is current or Medusa is deferred, while D-025 says Medusa is the active launch platform. Decision log also has duplicate D-029 IDs.

Required outcome:
- README, `docs/ARCHITECTURE.md`, `CLAUDE.md`, and project structure docs all state Medusa + Next.js as active.
- Duplicate D-029 resolved and cross-reference map updated.
- Current status files reflect D-030/D-031 auth completion and remaining payment/fulfillment blockers.

### 7. AI Discovery Surface Is Not Implemented

The Phase 4 AEO artifact already requires public discovery surfaces, but the storefront does not yet appear to have matching `robots.txt`, `sitemap.xml`, `llms.txt`, product feed, or PDP JSON-LD implementation.

Required outcome:
- Implement `storefront/src/app/robots.ts`.
- Implement `storefront/src/app/sitemap.ts`.
- Implement `storefront/src/app/llms.txt/route.ts`.
- Implement a product feed route such as `storefront/src/app/feed/products.json/route.ts` or XML equivalent.
- Add PDP JSON-LD for `Product`, `Offer`, `BreadcrumbList`, canonical URL, SKU/handle, INR price, image, availability, shipping, return policy, and variants where relevant.
- Add missing policy/search surfaces or remove links to missing pages before launch.

## P1 Stabilization Priorities

These should follow immediately after P0.

### Repository And Ownership

- Decide monorepo vs separate repos.
- If monorepo: move toward `apps/storefront`, `services/commerce`, `packages/catalog`, `ops/*`, `content/*`, `archive/*`.
- If separate repos: document boundaries and deployment ownership.
- Add root orchestration scripts or workspace tooling for common checks.
- Ensure generated folders and runtime files are ignored and absent from committed source.

### Testing And CI

Storefront:
- Add test script and basic test runner.
- Cover auth routes, account ownership, cart, checkout, COD floor, admin order mutations, and key UI regressions.

Medusa:
- Add integration tests for COD, prepaid discount, Razorpay webhook, guest tracking, claim-order, customer/admin password routes, and Shiprocket failure/idempotency.

Mission Control:
- Install/use pinned pnpm in CI/local setup.
- Add regression test for agent-scoped bulk task updates.
- Add contract tests comparing API index, OpenAPI, proxy public routes, and route auth requirements.

All:
- Add CI gates for lint, typecheck, build, tests, secret scan, dependency audit, and container scan.

### Deployment And Observability

- Split dev and prod compose/config.
- Make Postgres/Redis internal-only in prod.
- Add health checks, restart policies, resource limits, log rotation, and backup/restore runbook.
- Harden Medusa Dockerfile with non-root runtime and no build tools in final image.
- Add structured logs, uptime checks, error reporting, payment reconciliation alerts, and Shiprocket failure alerts.

### Data And Catalog

- Declare Medusa as canonical runtime product/order/customer source.
- Mark old static catalog files as legacy/dev fallback unless still actively used.
- Document catalog import/export contract: SKU, handle, title, price, image, published/draft, licensing flags.
- Keep `artifacts/phase-4/catalog-curation/` as curation history and Medusa as live truth.

### Responsive Experience Structure

The storefront should use one responsive HTML/content surface across devices, not separate mobile/desktop routes. This keeps humans, crawlers, and AI agents reading the same canonical product truth.

Breakpoint contract:

| Device class | Width band | Primary layout requirement |
|---|---:|---|
| Small mobile | 320-374px | Single-column shopping, sticky cart/checkout action, no horizontal scroll |
| Standard mobile | 375-479px | Single-column PDP/cart/checkout, thumb-safe controls, compact nav |
| Large mobile | 480-767px | Larger product media, 2-column small cards only when text remains readable |
| iPad/tablet portrait | 768-1023px | 2-column grids, split PDP summary below/alongside media, full account forms |
| Laptop | 1024-1279px | Desktop nav, 3-column product grids, PDP image/details split |
| Desktop | 1280-1535px | 4-column product grids, constrained reading widths, persistent cart/admin affordances |
| Large desktop | 1536px+ | Max-width containers, avoid stretched cards/text, optional 5-column merchandising grids |

Layout rules:

- Use mobile-first CSS with container max-widths, not viewport-scaled font sizes.
- Keep page content equivalent across device sizes; mobile may use accordions/tabs, but must not remove product, policy, price, availability, schema, or metadata content.
- PDP must keep image, title, price, stock, variants, shipping promise, returns note, quantity, and add-to-cart visible or reachable within the first mobile scroll.
- Cart and checkout must use sticky bottom actions on mobile and a right-side order summary on tablet/desktop.
- Account and admin pages should become dense tables only from laptop width up; mobile/tablet should use stacked records with clear actions.
- Header must provide mobile navigation, cart, account/login, and search without relying on hidden desktop-only links.
- Bottom navigation must be mobile-only and must not appear alongside desktop nav on tablet/laptop widths.
- All interactive targets should meet WCAG 2.2 target-size guidance; use 44px as TPL's practical minimum for touch controls even when the formal minimum allows less.
- Use real responsive images with stable aspect ratios, descriptive alt text, and no layout shift.
- Large-screen layouts must cap text line length and card width; do not let product grids stretch until product cards look sparse or unreadable.
- Checkout field pairs such as first/last name and city/pincode should stack on XS mobile and only become two-column from `sm` upward.
- Cart quantity, remove, checkout, drawer, filter, and admin action controls should be at least 44x44px on touch devices.
- Mobile drawers must behave as dialogs: `aria-expanded`, `aria-controls`, Escape close, focus trap, and focus return to trigger.

Device QA matrix:

| Flow | Mobile | Tablet/iPad | Laptop | Desktop | Large screen |
|---|---|---|---|---|---|
| Homepage | 320, 375, 430 | 768, 834 | 1024, 1280 | 1440 | 1728, 1920 |
| PDP | Add to cart, image, price, schema | Media/detail split | Sticky summary | Grid recommendations | Max-width discipline |
| Collections/gifts/sets | Filters and cards | 2-col grid | 3-col grid | 4-col grid | Optional 5-col only if readable |
| Cart | Quantity, remove, totals | Split summary | Summary sidebar | Full summary | No stretched empty states |
| Checkout | Address/payment with sticky CTA | Split form/summary | Full split flow | Full split flow | Summary remains readable |
| Account/orders | Stacked records | Wider forms | Tables allowed | Tables allowed | Tables capped |
| Admin | Cards/actions | Hybrid cards/table | Dense tables | Dense tables | No ultra-wide table drift |

Responsive launch gate:

- No horizontal scroll at 320px.
- No clipped buttons, prices, product titles, nav labels, or form fields at any tested width.
- All product cards have stable dimensions and do not reflow on hover/loading.
- Lighthouse/Core Web Vitals checked on mobile and desktop.
- Playwright screenshots taken for at least 390x844, 768x1024, 1280x800, 1440x900, and 1920x1080.
- Keyboard navigation and visible focus pass on mobile-sized and desktop-sized viewports.

### AI-Readable And Agentic Commerce Readiness

The goal is not to make a separate "AI store." The goal is to make the same commerce surface legible, trustworthy, and safely actionable for humans, search engines, answer engines, and authenticated agents.

Public AI-readable surface:

- Server-render product, collection, gift, set, policy, FAQ, and support content.
- Add JSON-LD to PDPs using `Product`, `Offer`, `BreadcrumbList`, and Organization-level policy data where supported.
- Keep product schema, visible PDP data, Merchant Center feed, cart, and Medusa backend values in sync.
- Add `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and a product feed route such as `/feed/products.json` or `/feed/products.xml`.
- Use canonical, stable URLs for products, collections, sets, gifts, drops, FAQ, shipping, returns, contact, and policy pages.
- Publish only claims visible to users: no fake reviews, no unsupported ratings, no invisible offers, no stale availability.
- Ensure mobile and desktop expose the same structured data and primary product content.
- Fix trust-critical policy contradictions before schema/feed publication: PDP, FAQ, footer, shipping, returns, and checkout must state the same return and shipping rules.
- Do not link to non-existent discovery or policy routes such as search/shipping/returns; either create the routes or remove/block them.

Product data required for agent readability:

| Data | Why agents need it |
|---|---|
| Stable product ID, SKU, handle, canonical URL | Reliable retrieval and de-duplication |
| Title, short description, long description | Answer quality and product comparison |
| Price, currency, availability, inventory status | Purchase eligibility |
| Product type, collection, gift persona, set eligibility | Guided browsing and recommendations |
| Images, alt text, dimensions, material, weight | Visual and practical buying confidence |
| Shipping promise, COD/prepaid eligibility, return eligibility | Checkout confidence and policy clarity |
| IP/licensing risk flag | Prevent unsafe merchandising exposure |

Agent interaction model:

- Public agents may read PDPs, collections, policies, sitemap, `llms.txt`, and product feed.
- Public agents must not access cart, checkout, account, orders, admin, preview URLs, internal APIs, or crawl-trap search facets.
- Internal agents should use authenticated APIs/tools instead of scraping storefront HTML for operations.
- Read tools can include `search_products`, `get_product`, `compare_variants`, `check_inventory`, `get_shipping_policy`, `get_return_policy`, and `calculate_shipping`.
- Write tools should be limited, authenticated, audited, and consent-gated: `create_draft_cart`, `create_support_ticket`, `get_order_status`, and `start_return`.
- Agents must never place orders, change addresses, cancel orders, issue refunds, or trigger payment without authenticated user session and explicit confirmation.
- Agent-created carts should be draft carts with clear expiry, source attribution, and human confirmation before payment.
- Add read-only agent endpoints before any write/action endpoints: `/api/agent/products`, `/api/agent/search`, `/api/agent/product/[handle]`, `/api/agent/policies`, and `/api/agent/shipping-estimate`.

Agentic commerce QA:

- Validate structured data with Google Rich Results / Schema validators.
- Validate feed/page/schema parity for every launch SKU.
- Confirm crawler access for public pages and crawler blocks for private/account/admin surfaces.
- Check that `llms.txt` contains only public, non-sensitive links and concise site guidance.
- Add logs/analytics for feed generation time, feed item count, schema mismatches, crawl errors, bot traffic, draft cart source, and agent tool calls.
- Add abuse protection for agent-readable endpoints: rate limits, bot allow/deny policy, signed internal tools, audit logs, and anomaly alerts.
- Add answer-engine friendly `ItemList` JSON-LD and visible buying-guide copy for collection, gift, and set pages where relevant.

External guidance used:

- Google recommends responsive design as the easiest mobile pattern to maintain and expects mobile and desktop to expose equivalent content, metadata, and structured data.
- Google product structured data guidance supports merchant listing/product markup for purchasable products, with price, availability, shipping, returns, and variant details where applicable.
- Schema.org provides the canonical vocabulary for `Product`, `Offer`, and related commerce entities.
- WCAG 2.2 target-size guidance should inform touch controls, especially on mobile checkout, cart, nav, and admin actions.
- `llms.txt` is useful as an experimental AI-readable index, but it is not a substitute for accessible HTML, structured data, feeds, and sitemaps.

## P2 Cleanup And Scale Work

- Consolidate SOPs into one canonical location, preferably `docs/ops-sop/`, and turn duplicate artifact copies into historical pointers.
- Replace `backend/medusa/README.md` starter content with a TPL commerce service runbook.
- Refresh `storefront/README.md` to remove deleted/local auth references and explain current Medusa customer/admin auth.
- Archive raw dump and duplicate-suffix files after confirming nothing active references them.
- Clarify Mission Control: active internal tool, future product, or archived evaluation.
- Add ADRs for platform reversal, repo topology, deployment target, auth model, payment ownership, and catalog source-of-truth.
- Create a responsive UI system addendum covering breakpoints, page templates, device QA, and large-screen behavior.
- Create an agent-commerce implementation spec that turns `artifacts/phase-4/aeo-agent-commerce-readiness.md` into routes, schema, feeds, robots policy, and internal agent tools.

## Mission Control Specific Call

`mission-control-eval/` should not be treated as part of the commerce launch until a product decision is made.

If it is promoted:
- Fix production host allowlist fail-open behavior.
- Apply agent task access checks to bulk task updates.
- Make local terminal/workstation controls admin-only or feature-flagged.
- Treat runtime installation as privileged remote code execution with explicit approval, audit metadata, and pinned sources.
- Keep its strong test posture and add security/contract gates.

If it is not promoted:
- Archive it as `archive/evals/mission-control` or move it outside the launch repo.
- Keep only the storefront `/mission-control` dashboard if that is the active command center.

## 30-Day Improvement Plan

### Days 1-3: Stop The Bleeding

- Rotate exposed secrets.
- Remove secrets from run notes and local docs.
- Fix Medusa build.
- Fix storefront lint or explicitly suppress only non-risky legacy rules.
- Patch cart region and prepaid total display.
- Resolve duplicate D-029 and stale Fynd references.

### Days 4-10: Make Orders Safe

- Complete Razorpay webhook and reconciliation.
- Enforce COD/prepaid server-side.
- Add route rate limits and CSRF/origin checks.
- Add Shiprocket timeout, idempotency, retry/alert path.
- Add tests around payment, checkout, tracking, claim-order, and admin order ops.
- Add mobile checkout/PDP/cart fixes and screenshot tests for the responsive launch matrix.
- Make mobile bottom nav conditional by breakpoint, enlarge cart quantity controls, and convert admin mobile table rows into stacked cards where needed.

### Days 11-20: Make The System Operable

- Replace backend starter README with TPL service runbook.
- Add env matrix and production runbook.
- Harden Docker and compose.
- Add CI for storefront and backend.
- Add secret/dependency/container scans.
- Document backup/restore and launch rollback.
- Implement sitemap, robots, JSON-LD, product feed, canonical metadata, and first `llms.txt`.
- Create missing shipping/returns/search pages or remove their links before crawler/agent QA.

### Days 21-30: Clean The Operating System

- Decide repo topology.
- Consolidate docs and SOPs.
- Archive raw/generated/duplicate artifacts.
- Clarify Mission Control role.
- Lock catalog source-of-truth and import/export process.
- Add ADRs for the decisions that will matter six months from now.
- Implement internal agent read tools and draft-cart flow with audit logging and explicit human confirmation.

## Launch Gate Checklist

Launch should not proceed until all are true:

- [ ] `storefront`: build passes.
- [ ] `storefront`: lint passes.
- [ ] `storefront`: auth/cart/checkout/admin smoke tests pass.
- [ ] `backend/medusa`: build passes.
- [ ] `backend/medusa`: payment and shipping integration tests pass.
- [ ] Razorpay webhook updates Medusa state and is idempotent.
- [ ] COD minimum and prepaid discount enforced server-side.
- [ ] Shiprocket sync cannot duplicate orders and alerts on failure.
- [ ] No known live secrets remain in docs/run notes/local committed files.
- [ ] Production env matrix is complete.
- [ ] Deployment runbook and rollback path exist.
- [ ] Current docs say Medusa + Next.js is active launch platform.
- [ ] Decision log IDs are unique and cross-references are current.
- [ ] Responsive QA passes for mobile, iPad/tablet, laptop, desktop, and large-screen viewports.
- [ ] PDP, collection, cart, checkout, account, and admin surfaces have no horizontal scroll or clipped controls at required widths.
- [ ] Product JSON-LD, sitemap, robots, canonical metadata, and product feed are live in staging.
- [ ] `/llms.txt` exists, is public, and contains no sensitive/internal links.
- [ ] Agent-readable surfaces are read-only by default; any write/action tools require auth, audit logging, and explicit user confirmation.

## Immediate Owner Map

| Lane | Owner | First Deliverable |
|---|---|---|
| Commerce backend | Build pod / CTO | Passing Medusa build and payment hardening plan |
| Storefront | Build pod | Lint clean plus cart/prepaid/admin UI fixes |
| Security | CTO / ops | Secret rotation and secret scanning |
| Docs/governance | Command pod | Current platform truth, unique decisions, refreshed status |
| QA | Build + ops | Checkout/payment/account/admin smoke suite |
| Deployment | CTO | Production architecture and rollback runbook |
| Responsive UX | Design + build | Breakpoint contract, page templates, screenshot matrix |
| AI/agent commerce | Growth + build + CTO | Structured data/feed/llms/internal-tool implementation plan |

## Bottom Line

The codebase is salvageable and the product direction is coherent. The next move is disciplined stabilization: build green, payment authoritative, secrets rotated, docs truthful, and tests around money/order flows. Once that spine is steady, the relaunch system can move fast without every agent inheriting a different version of reality.
