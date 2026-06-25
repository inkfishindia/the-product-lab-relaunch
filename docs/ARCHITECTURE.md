# System Architecture

<!-- last-updated: 2026-06-20 -->

The Product Lab relaunch operates two interconnected architectures:

1. **Commerce/Product Architecture** — powers the customer storefront, admin cockpit, and backend services (Medusa + Next.js active).
2. **Operating Architecture** — coordinates research, strategy, build, launch, and optimization through 25 agents across 9 pods.

---

## 1. Commerce Architecture (Active)

### System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Internet                                │
└────────┬──────────────────────────────┬─────────────────────────┘
         │                              │
         ▼                              ▼
┌─────────────────┐          ┌─────────────────────┐
│  Customer        │          │  Admin Operator      │
│  (Browser/Mobile)│          │  (Browser)           │
└────────┬─────────┘          └──────────┬──────────┘
         │                               │
         ▼                               ▼
┌──────────────────────────────────────────────────────────────────┐
│              Next.js 16 Storefront (storefront/)                 │
│                                                                  │
│  /collections  /products/[handle]  /cart  /checkout             │
│  /login  /register  /account/*  /admin/*  /track                │
│  /sets/*  /gifts/*  /drops  /about  /faq  /contact              │
│                                                                  │
│  SSR + ISR + Client components — Vercel deployment               │
└────────┬─────────────────────────────────────────┬───────────────┘
         │                                         │
         ▼                                         ▼
┌──────────────────┐              ┌──────────────────────────────┐
│  Medusa v2 API    │              │  External Services           │
│  (backend/medusa/)│              │                              │
│                   │              │  ┌─────────────────────┐    │
│  ┌─────────────┐  │  Webhooks   │  │ Razorpay            │    │
│  │ Store API   │◄─┼─────────────┼──┤ (payments/refunds)  │    │
│  │ (customer)  │  │             │  └─────────────────────┘    │
│  ├─────────────┤  │             │  ┌─────────────────────┐    │
│  │ Admin API   │  │  API calls  │  │ Shiprocket          │    │
│  │ (service    │◄─┼─────────────┼──┤ (shipping/tracking) │    │
│  │  account)   │  │             │  └─────────────────────┘    │
│  ├─────────────┤  │             │  ┌─────────────────────┐    │
│  │ Custom      │  │             │  │ Meta WhatsApp       │    │
│  │ Routes      │  │             │  │ Cloud API           │    │
│  └──────┬──────┘  │             │  └─────────────────────┘    │
│         │         │             │  ┌─────────────────────┐    │
│         ▼         │             │  │ SMTP/Resend/SendGrid│    │
│  ┌──────────────┐ │             │  │ (email fallback)    │    │
│  │ PostgreSQL    │ │             │  └─────────────────────┘    │
│  │ (Supabase)    │ │             │  ┌─────────────────────┐    │
│  │ + Redis       │ │             │  │ GA4 + Clarity       │    │
│  └──────────────┘ │             │  │ (analytics)         │    │
│                   │             │  └─────────────────────┘    │
│  Modules:         │             │  ┌─────────────────────┐    │
│  - COD provider   │             │  │ Airtable (ops       │    │
│  - Razorpay       │             │  │ workflow/exceptions)│    │
│  - Shiprocket     │             │  └─────────────────────┘    │
│  - WhatsApp       │             │                              │
│  - SMTP           │             │                              │
└──────────────────┘              └──────────────────────────────┘
```

### Platform Decision History

**Current: Medusa v2 + Next.js 16 (active launch platform)** — D-025 (2026-06-11) reversed D-022.

| Date | Decision | Status |
|------|----------|--------|
| 2026-05-30 | D-022: Fynd for launch, Medusa deferred | Superseded by D-025 |
| 2026-06-11 | D-025: Medusa + Supabase = active, Fynd dropped | **Active** |

**What changed:** Dan chose full control over platform lock-in. The storefront (16 routes) and backend were already built on Medusa and seeded with the real 502-product catalog. Fynd's managed checkout, shipping, and payments were lost, but the tradeoff avoided vendor dependency for India-specific integrations (Razorpay, Shiprocket, COD, GST).

### Component Responsibilities

| Component | Responsibility | Source Location |
|-----------|---------------|-----------------|
| Next.js storefront | Public shopping, account flows, cart/checkout UI, admin cockpit, guest order tracking | `storefront/` |
| Medusa v2 backend | Products, carts, orders, pricing, customers, inventory, fulfillment, auth | `backend/medusa/` |
| PostgreSQL (Supabase) | Persistent data: products, orders, customers, collections, regions | Managed Supabase project |
| Redis | Session cache, job queues, Medusa event bus | Managed Redis provider |
| Razorpay | Payment authorization, capture, refunds, webhook processing | External — Razorpay dashboard |
| Shiprocket | Shipping labels, courier tracking, COD/NDR data, AWB generation | External — Shiprocket API |
| Meta WhatsApp Cloud API | Transactional + marketing notifications (primary channel) | `backend/medusa/src/modules/whatsapp-notification/` |
| SMTP / Resend / SendGrid | Email fallback (password reset, order transfer, order confirmation) | `backend/medusa/src/modules/smtp-notification/` |
| Airtable | Human ops workflow — production stages, packing exceptions, order notes | External — Airtable base |
| GA4 + Clarity | Funnel events, marketing analytics, session recording | `storefront/src/lib/analytics.ts` |

### Data Ownership Rules

| Data Domain | System of Record | Notes |
|-------------|------------------|-------|
| Products & collections | **Medusa** | WooCommerce CSV → Medusa import pipeline. Static `catalogs/` files are legacy/dev fallback only. |
| Orders & carts | **Medusa** | Created through storefront checkout. Shiprocket fulfillment updates order status. |
| Customers & accounts | **Medusa** | JWT-authenticated. Password hashes, addresses, consent flags stored in Medusa. |
| Payments & refunds | **Razorpay** | Medusa records payment intent; Razorpay is payment truth with idempotent webhook processing. |
| Shipping execution & tracking | **Shiprocket** | AWB generation, courier assignment, tracking status, NDR data. |
| Human ops workflow | **Airtable** | Order notes, exception flags, packing queue — not customer-facing runtime data. |
| Notification delivery | **Medusa subscribers + Meta WhatsApp** | Medusa owns *what* to send; WhatsApp/Email own *delivery*. |
| Analytics | **GA4 + Clarity** | Customer behavior, funnels, conversion data. |
| Product curation & merchandising | **Artifacts + Medusa** | Curation decisions in `artifacts/phase-4/catalog-curation/`; runtime truth in Medusa DB. |

---

## 2. Storefront Architecture

### Route Map

```
storefront/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── page.tsx                 # Homepage
│   │   ├── layout.tsx               # Root layout + StorefrontChrome
│   │   ├── products/[handle]/       # Product detail page
│   │   ├── collections/             # Collection listing
│   │   ├── collections/[slug]/      # Single collection
│   │   ├── sets/                    # Set hubs
│   │   ├── sets/[slug]/             # Set detail
│   │   ├── gifts/                   # Gift shopping hub
│   │   ├── gifts/for-[persona]/     # Gift persona pages
│   │   ├── cart/                    # Shopping cart
│   │   ├── checkout/                # Checkout flow
│   │   ├── order-confirmed/         # Post-order success
│   │   ├── login/ register/         # Auth pages
│   │   ├── forgot-password/         # Password reset
│   │   ├── reset-password/          # Password reset confirm
│   │   ├── account/                 # Account dashboard
│   │   ├── account/profile/         # Profile editing
│   │   ├── account/orders/          # Order history
│   │   ├── track/                   # Guest order tracking
│   │   ├── drops/                   # Drop hub
│   │   ├── about/ faq/ contact/     # Info pages
│   │   ├── sell-your-art/           # Artist submission
│   │   ├── admin/                   # COD-first ops cockpit
│   │   └── mission-control/         # Agent dashboard (eval)
│   ├── components/                  # Shared React components
│   │   └── ui/                      # Design system components
│   ├── lib/
│   │   ├── medusa.ts                # Medusa store API client (unauthenticated)
│   │   ├── medusa-customer.ts       # Medusa customer API client (JWT per request)
│   │   ├── medusa-admin.ts          # Medusa admin API client (service account)
│   │   ├── medusa-auth.ts           # Auth helpers (login, register, logout, session)
│   │   ├── master-catalog.ts        # Local catalog fallback
│   │   ├── data.ts                  # Collection/set/persona mapping
│   │   └── analytics.ts             # GA4 + Clarity client
│   └── middleware.ts                # Route guards, admin role check
├── public/                          # Static assets
├── next.config.ts
└── package.json
```

### Auth Flow

**Customer Authentication (D-031):**
- Medusa JWT issued at login/register
- Stored in httpOnly `_medusa_jwt` cookie
- Every authenticated `/store/*` call passes `Authorization: Bearer` per request via `lib/medusa-customer.ts`
- No shared SDK singleton with in-memory token (eliminates cross-account leak)
- Supports: login, register, logout, forgot/reset password, change password, profile edit, address book, order history, guest `/track`, claim-by-email, checkout→customer attach
- WhatsApp consent toggle stored on customer metadata → flows into notification data

**Admin Authentication (D-030):**
- Server-side service account in `lib/medusa-admin.ts`
- Logs in with `MEDUSA_ADMIN_EMAIL` / `MEDUSA_ADMIN_PASSWORD`
- JWT cached and refreshed server-side
- Role sourced from Medusa user `metadata.role` (default `superadmin`)
- `requireRole()` — deny-by-default gate on every `/admin/*` page and `/api/admin/*` route
- Custom `/admin` owns COD-first daily ops (orders list/detail, mark-fulfilled, ship+AWB stub, cancel, mark COD collected, order notes, dashboard)
- Medusa admin at `:9000/app` owns catalog, inventory, customer edits, refunds, promotions, tax/shipping config, team/user management
- Legacy in-memory `auth-store.ts` deleted — no fake seed admins remain

### Render Strategy

- **SSR** for product pages, collection pages, order pages (SEO-critical)
- **ISR** for collection listing, drops hub, info pages (balance freshness vs build cost)
- **Client components** for cart, checkout, account forms, admin cockpit (interactive)
- **Static fallback** in `lib/master-catalog.ts` when Medusa API is unavailable (graceful degradation)

---

## 3. Commerce Backend Architecture

### Module System

```
backend/medusa/
├── src/
│   ├── api/                         # Custom API routes
│   │   ├── store/                   # Customer-facing custom endpoints
│   │   │   ├── track-order/         # Guest order tracking by phone
│   │   │   ├── claim-order/         # Claim order by email
│   │   │   ├── validate-payment-method/  # COD eligibility check
│   │   │   ├── razorpay-verify/     # Razorpay payment verification
│   │   │   ├── customer-password/   # Password change endpoint
│   │   │   ├── reset-password/      # Password reset token flow
│   │   │   ├── verify-reset-token/  # Validate reset token
│   │   │   ├── update-password/     # Set new password
│   │   │   ├── order-transfer-request/  # Transfer order ownership
│   │   │   └── accept-order-transfer/   # Accept order transfer
│   │   └── admin/                   # Admin custom endpoints
│   │       └── operator-password/   # Admin password change
│   ├── modules/                     # Medusa v2 modules
│   │   ├── cod-provider/            # COD payment provider
│   │   ├── razorpay-provider/       # Razorpay payment provider
│   │   ├── shiprocket-fulfillment/  # Shiprocket fulfillment provider
│   │   ├── whatsapp-notification/   # Notification module (D-033, D-034)
│   │   └── smtp-notification/       # Email notification module (D-032)
│   ├── subscribers/                 # Medusa event subscribers
│   │   ├── order-confirmation.ts    # Order placed → WhatsApp + Email
│   │   ├── fulfillment-notification.ts  # Fulfilled → tracking info
│   │   └── order-delivery.ts        # Delivered → confirmation
│   ├── scripts/                     # CLI scripts
│   │   ├── seed-tpl.ts              # Store infrastructure seed
│   │   ├── import-woo.ts            # WooCommerce → Medusa import
│   │   ├── prep-woo-catalog.py      # CSV preprocessing
│   │   ├── setup-shipping-cod.ts    # Shipping + COD setup
│   │   ├── curate-drop1.py          # Drop 1 curation
│   │   └── apply-drop1.ts           # Apply curation to Medusa
│   └── subscribers/                 # Event subscribers
├── medusa-config.ts                 # Medusa configuration
├── .env.template                    # Required env vars
├── Dockerfile
└── package.json
```

### Event System (Subscribers)

Medusa's event bus drives notification delivery:

| Event | Subscriber | Actions |
|-------|-----------|---------|
| `order.placed` | `order-confirmation.ts` | Send order confirmation (WhatsApp + Email), update Airtable |
| `fulfillment.created` | `fulfillment-notification.ts` | Send tracking + AWB info (WhatsApp) |
| `order.updated` → "completed" | `order-delivery.ts` | Send delivery confirmation, request review |
| `order.updated` → "canceled" | *(planned)* | Send cancellation notice, trigger refund |
| `order.updated` → "return_requested" | *(planned)* | Initiate return flow, send RMA instructions |

### Payment Providers

| Provider | Type | Status | Details |
|----------|------|--------|---------|
| COD (`pp_cod_cod`) | Manual capture | **Active** | Verified end-to-end (real order placed). COD fee ₹0-30 configurable per region. Minimum order ₹299 for COD. |
| Razorpay | Authorize + capture | **In progress** | Route scaffolded, `/store/razorpay-verify` exists. Webhook handler for `payment.captured` / `payment.failed`. Key/secret and webhook secret to be wired. |

### Payment Flow

**COD Flow:**
1. Customer selects COD at checkout
2. Storefront calls `/store/validate-payment-method` (reads computed cart total)
3. Medusa validates COD eligibility (min ₹299, address validity)
4. Order placed with `pending` payment status
5. Admin marks COD collected via `/admin` cockpit → payment captured in Medusa
6. Shiprocket fulfillment triggered

**Razorpay Flow (in progress):**
1. Customer selects Razorpay (UPI, cards, wallets, netbanking)
2. Medusa creates payment session via Razorpay provider
3. Storefront opens Razorpay checkout modal
4. On success: Razorpay fires `payment.captured` webhook
5. Medusa updates payment session to `captured`
6. Order transitions to `processing`

**Idempotency:** Razorpay webhooks use event ID deduplication. Each `payment.captured` event processed at most once.

---

## 4. Notification Architecture

### Channel Priority

| Priority | Channel | Use Case | Status |
|----------|---------|----------|--------|
| 1 | **WhatsApp** (Meta Cloud API) | Transactional (order confirmed, shipped, delivered) + marketing (opt-in) | Active (D-034) |
| 2 | **Email** (SMTP/Resend/SendGrid) | Password reset, order transfer, order confirmation fallback | Active (D-032) |
| 3 | **In-app** (planned) | Account notifications, order status banners | Planned |

### WhatsApp Dormancy Pattern

- **Transactional:** Always sent when phone number available — no opt-in needed for order confirmations, shipping updates, delivery confirmations
- **Marketing:** Respects `whatsapp_consent` flag on customer metadata. Consent collected during checkout and toggleable in profile settings
- **Templates:** 21 WhatsApp templates across 10 touchpoints. Template names auto-map from dot notation to underscores (`order.confirmed_prepaid` → `order_confirmed_prepaid`)
- **Transport:** Meta Cloud API direct (D-034) via `graph.facebook.com/v22.0/{phone-number-id}/messages`. Zero BSP markup. ~₹0.115/conv utility, ~₹0.785/conv marketing.
- **Fallback chain:** Meta → Gupshup → stub (dev mode logs to `notification-audit/whatsapp-*.jsonl`)

### Email Dormancy Pattern

- **Always send:** Password reset, order transfer requests (security-critical)
- **Transactional:** Order confirmation, shipping update (when WhatsApp unavailable)
- **Stub mode:** Logs to stdout + audit trail for development

---

## 5. Deployment Architecture

### Target Topology

| Service | Platform | Notes |
|---------|----------|-------|
| Next.js storefront | **Vercel** | Preview deploys per branch. Production domain: `theproductlab.in` |
| Medusa API | **Railway / Render / Fly.io** | Node.js service, exposed via custom domain. Dockerfile ready. |
| PostgreSQL | **Supabase** | Managed Postgres with point-in-time recovery. Medusa migrations run at deploy. |
| Redis | **Upstash / Railway Redis** | Medusa event bus, session cache, job queues. |
| File storage | **Supabase Storage / Cloudinary** | Product images (hotlinked from WooCommerce → must migrate pre-launch). |
| Docker compose | **Local dev** | `docker-compose.yml` orchestrates storefront + Medusa + Postgres + Redis. |

### Deployment Flow

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐
│  Developer   │────▶│  GitHub       │────▶│  CI (GitHub   │
│  pushes code │     │  (monorepo)   │     │   Actions)    │
└─────────────┘     └──────┬───────┘     └───────┬───────┘
                           │                     │
                           │                     ▼
                           │            ┌─────────────────────┐
                           │            │  Vercel (storefront) │
                           ├───────────▶│  Render (Medusa)     │
                           │            │  Supabase (DB)       │
                           │            └─────────────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Railway /   │
                    │  Fly.io      │
                    │  (alternative)│
                    └──────────────┘
```

### Dev Environment

```bash
# Start full local stack
docker compose up -d        # Postgres + Redis
cd backend/medusa && npm run dev    # Medusa API on :9000
cd storefront && npm run dev        # Storefront on :3000
```

### Env Management

- **Local dev:** `.env.local` (storefront) + `.env` (backend) — both in `.gitignore`
- **Templates:** `.env.template` at each level documents required vars without values
- **Production:** Vercel project env vars + Railway/Render env manager
- **Backup:** 1Password vault for all secrets

---

## 6. AI / Agent Commerce Surface

### Public (Unauthenticated) — Read-Only

| Surface | Purpose | File |
|---------|---------|------|
| XML Sitemap | Search engine discovery | `/sitemap.xml` |
| Robots.txt | Crawl directives | `/robots.txt` |
| `llms.txt` | LLM-friendly index of canonical content | `/llms.txt` |
| Product feeds | Google Merchant Center, comparison shopping | `backend/medusa/src/api/store/feed/` |
| JSON-LD structured data | Product schema, Organization schema, FAQ schema | In page `<head>` from Medusa product data |
| Collections RSS | Drop announcements, new arrivals | Planned |
| Open Graph / Twitter Cards | Social previews | `storefront/src/app/layout.tsx` |

### Authenticated (Agent Tools)

| Tool | Auth Required | Description |
|------|--------------|-------------|
| Product lookup by handle | None | Public product data |
| Collection listing | None | Public collection data |
| Order status by phone/email | Claim token | Guest order tracking |
| Catalog search | Admin service account | Full product search with draft products |
| Order management | Admin service account | Fulfill, cancel, update status |
| Customer lookup | Admin service account | Customer details, order history |
| Bulk product update | Admin service account | Price, inventory, status changes |

### AI Commerce Rules

1. **Data parity:** All AI-readable public surfaces must serve data identical to what users see — no inflated ratings, no fake reviews, no invisible offers
2. **Write operations:** Require authentication + audit logging + explicit user confirmation for destructive actions
3. **Rate limits:** Agent endpoints have stricter rate limits than browser endpoints to prevent abuse
4. **Safe defaults:** Read-only for unauthenticated access; write tools require admin service-account JWT
5. **No training on transactions:** Order/PII data is never exposed to public AI crawlers

---

## 7. Operating Architecture

```
Dan (CEO)
  │
  ▼
Harley — Program Director (you)
  │
  ├── Pod A: Claire, Maria (command)
  │   ├── Claire — Dependency tracking, blocker logs, status hygiene
  │   └── Maria — Audit, data analysis, research
  │
  ├── Pod B: Weiss, Heyward, Jenna (strategy)
  │   ├── Weiss — Customer insight, persona research
  │   ├── Heyward — Brand positioning, messaging
  │   └── Jenna — Competitive analysis, product hierarchy
  │
  ├── Pod C: Shreyas, Andy (product)
  │   ├── Shreyas — PMF, product strategy
  │   └── Andy — Catalog curation, merchandising
  │
  ├── Pod D: Sean, Joanna, Kurt, Julie (creative)
  │   ├── Sean — Visual identity, brand design
  │   ├── Joanna — Copy system, verbal identity
  │   ├── Kurt — UX, IA, wireframes
  │   └── Julie — UI system, high-fidelity design
  │
  ├── Pod E: Tobi, James (build/QA)
  │   ├── Tobi — Implementation, storefront, backend
  │   └── James — QA, launch sign-off (NO ONE overrules James)
  │
  ├── Pod F: Nik, Avinash, Eli (growth)
  │   ├── Nik — Launch narrative, campaigns
  │   ├── Avinash — Analytics infrastructure
  │   └── Eli — Email/WhatsApp flows, optimization
  │
  ├── Pod G: Andrew, Chase, Rachel (marketing)
  │   ├── Andrew — Launch runbook, operations
  │   ├── Chase — Content calendar, social
  │   └── Rachel — Seeding, influencer relations
  │
  ├── Pod H: Casey (content)
  │   └── Casey — Asset lists, customer comms, FAQ
  │
  └── Pod I: Patrick, Raj, Tony, Lenny (ops/finance)
      ├── Patrick — Financials, pricing
      ├── Raj — Logistics, fulfillment, shipping
      ├── Tony — Operations implementation, SOPs
      └── Lenny — Returns, exchanges, policy
```

### Operating Principles

- **File-based state:** No relying on conversation memory. Everything written to disk.
- **Sequential dependencies enforced:** Weiss→Heyward→Sean. Kurt→Tobi→James. No skipping.
- **Parallel when safe:** Multiple agents run simultaneously if no dependency exists.
- **Decision logging mandatory:** Every material decision goes to `decisions/decision-log.md`.
- **Escalation:** Budget >₹5K/mo, launch date, Drop 2 timing, paid advertising, hiring, pricing change. Brand/design/pricing already locked — do not re-escalate.
- **James controls launch sign-off.** No one overrules James on QA.
- **Locked decisions stay locked.** D-005 through D-017 (and D-025 onward) are not up for discussion.

### Information Flow

```
Raw context + imported docs (TPL DUMP, WooCommerce export, research)
  → knowledge/ curated truth (26-CURRENT-STATE.md, CROSS-REFERENCE-MAP.md)
  → artifacts/ phase outputs (structured deliverable per phase)
  → decisions/ locked direction (decision-log.md with cross-references)
  → handoffs/ downstream activation (agent-to-agent transfer records)
  → storefront/ + backend/ implementation
  → status/ current progress and blockers (sprint-board, weekly-status)
```

---

## 8. Phase Architecture

### Phase Pipeline

```
Phase 1: Audit ──→ Phase 2: Strategy ──→ Phase 3: Creative ──→ Phase 4: Build (Active)
                                                                    │
                                                                    ▼
                                                              Phase 5: Launch
                                                                    │
                                                                    ▼
                                                              Phase 6: Optimize
```

### Phase Gate Criteria

| Phase | Entry Gate | Exit Gate | Status |
|-------|-----------|-----------|--------|
| 1 — Audit | Project kickoff | All 11 audit artifacts approved (D-003) | Complete |
| 2 — Strategy | D-003 passed | All 5 strategy artifacts approved (D-008) | Complete |
| 3 — Creative | D-008 passed | All 7 creative artifacts approved (D-016) | Complete |
| 4 — Build | D-016 passed | Auth consolidated, COD flow verified, catalog curated, QA checklist passed, hosting deployed | **Active** |
| 5 — Launch | James sign-off (D-029 pass) | Drop 1 live, seeding distributed, analytics running | Planned |
| 6 — Optimize | D-007 validation metrics | 30-day review complete, Drop 2 scoped | Planned |

### Current Phase State

See `knowledge/26-CURRENT-STATE.md` for exact current state. See `status/sprint-board.md` for sprint-level tracking. See `status/weekly-status.md` for weekly progress.

---

## 9. Key File References

| Document | Purpose |
|----------|---------|
| `decisions/decision-log.md` | Every material decision, reverse chronological |
| `knowledge/26-CURRENT-STATE.md` | Living session-start document — read before any work |
| `knowledge/CROSS-REFERENCE-MAP.md` | Bi-directional links between decisions ↔ artifacts ↔ agents |
| `docs/GOVERNANCE.md` | Project governance rules — doc freshness, secrets, deprecation |
| `CLAUDE.md` | Claude Code project config + session-start protocol |
| `status/sprint-board.md` | Sprint-level task tracking |
| `status/weekly-status.md` | Weekly progress and blocker summary |
| `templates/artifact-header.md` | Standard artifact format |
| `templates/decision-entry.md` | Standard decision format |
