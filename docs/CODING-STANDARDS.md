# Coding Standards — The Product Lab

**Last updated:** 2026-06-20
**Applies to:** `storefront/` (Next.js 16), `backend/medusa/` (Medusa v2.15.x)
**Enforcement:** Automated via `npm run lint`, `npm run typecheck`, `npm run build` in CI

---

## 1. Language & Runtime

### 1.1 TypeScript Only

Every file in `storefront/` and `backend/medusa/` **must** be authored in TypeScript. No plain `.js` files (exception: `medusa-config.ts` uses `module.exports` for CJS interop).

### 1.2 Target Runtimes

| Scope | Target | Config |
|---|---|---|
| Storefront | `ES2017` | `storefront/tsconfig.json:target` |
| Backend | `ES2021` | `backend/medusa/tsconfig.json:target` |

### 1.3 Strict Mode

**Storefront** (`storefront/tsconfig.json`):
```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "skipLibCheck": true
  }
}
```

**Backend** (`backend/medusa/tsconfig.json`):
```json
{
  "compilerOptions": {
    "strictNullChecks": true,
    "esModuleInterop": true,
    "moduleResolution": "Node16",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

The backend lags in strictness — new modules and API routes should adopt the storefront standard (`strict: true`). When adding a new backend file, explicitly declare types everywhere. Avoid `any` casts; prefer `unknown` with type guards.

### 1.4 Module Systems

| Scope | Module | Resolution |
|---|---|---|
| Storefront | `esnext` | `bundler` with path alias `@/*` → `./src/*` |
| Backend | `Node16` | `Node16` |

Storefront imports use the `@/` alias:
```typescript
// Do
import { getProduct } from "@/lib/medusa"
import { Button } from "@/components/ui/button"

// Don't
import { getProduct } from "../lib/medusa"
```

Backend imports resolve from the module root — no alias:
```typescript
// Do — within a subscriber
import { Modules } from "@medusajs/framework/utils"

// Do — within a module
import { AbstractPaymentProvider } from "@medusajs/framework/utils"
```

---

## 2. Component Architecture (Storefront)

### 2.1 Server Components by Default

Every component is a **Server Component** unless interactivity demands otherwise. Only add `"use client"` when the component uses:
- Event handlers (`onClick`, `onChange`, etc.)
- React hooks (`useState`, `useEffect`, `useCallback`)
- Browser-only APIs (`localStorage`, `window`)
- Context providers

```typescript
// ProductPage — server component (storefront/src/app/products/[handle]/page.tsx)
export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const product = await getProduct(handle)
  return <AddToCartButton product={product} variantId={variant.id} />
}

// AddToCartButton — client boundary (storefront/src/app/products/[handle]/add-to-cart-button.tsx)
"use client"
export default function AddToCartButton({ product, variantId }: { ... }) {
  const handleClick = () => { ... }
  return <button onClick={handleClick}>Add to Cart</button>
}
```

**Do not** propagate `"use client"` up the tree. Keep the client boundary as narrow as possible.

### 2.2 Component Directory Structure

```
storefront/src/
  components/
    index.ts                    # Barrel exports
    ui/                         # Primitives (Button, Badge, NavBar, Footer)
      button.tsx
      badge.tsx
      site-header.tsx
      nav-bar.tsx
      footer.tsx
      trust-block.tsx
      announcement-bar.tsx
      chrome-wrapper.tsx
    domain-name.tsx             # Shared domain components
    product-card.tsx
    hero-image.tsx
    opinion-interrupt.tsx
    sticker-wall.tsx
    record-store-browse.tsx
    opinion-wall.tsx
  app/                          # Page-specific components colocated with routes
    products/[handle]/
      add-to-cart-button.tsx    # Client boundary, scoped to PDP
      page.tsx                  # Server component, fetches data
    checkout/
      checkout-client.tsx       # Entire checkout flow client component
      page.tsx
    cart/
      cart-client.tsx
      page.tsx
    collections/[slug]/
      collection-content.tsx
      page.tsx
```

**Rules:**
- `components/ui/` — widest reuse. No business logic. Accept props only (no data fetching).
- `components/` root — shared domain logic (product-card, hero-image).
- `app/` subdirectories — page-scoped. Don't import these from outside their route.
- Barrel file: `components/index.ts` re-exports only the most commonly used components.

### 2.3 UI Primitives Convention

UI primitives use Tailwind v4 utility classes directly. No CSS modules, styled-components, or runtime CSS-in-JS.

```typescript
// Do (storefront/src/components/ui/button.tsx)
import { type ButtonHTMLAttributes } from "react"

type ButtonVariant = "primary" | "secondary" | "ghost"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "rounded-radius-md bg-accent-primary px-6 py-3 font-heading text-body-sm font-bold uppercase tracking-wider text-text-on-red hover:bg-accent-primary/90",
  secondary:
    "rounded-radius-md border-2 border-border-strong bg-transparent px-6 py-3 font-heading text-body-sm font-bold uppercase tracking-wider text-text-primary hover:bg-text-primary hover:text-text-on-dark",
  ghost:
    "font-heading text-body-sm font-bold uppercase tracking-wider text-accent-primary hover:underline",
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button className={`${variantStyles[variant]} ${className ?? ""}`} {...props}>
      {children}
    </button>
  )
}
```

### 2.4 No Global State Libraries

This project does not use Redux, Zustand, or any global state manager. Use:
- React `useState` / `useCallback` for local UI state
- React Context for auth (`AuthProvider` in `lib/auth-context.tsx`) and other truly global concerns
- Medusa backend for persistent state (cart, orders, customer)
- `localStorage` for the cart ID (client-only)

No new state management libraries may be introduced without a decision log entry.

---

## 3. Data Fetching & API Routes

### 3.1 Server Component Data Fetching

Server components call the Medusa SDK directly via the singleton in `storefront/src/lib/medusa.ts`. The SDK uses `jwtTokenStorageMethod: "memory"` — safe for unauthenticated storefront reads.

```typescript
// Do — server component, direct SDK call
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = await getCollectionByHandle(slug)
  const products = await getProductsByCollectionId(collection.id)
}
```

For **customer-authenticated Medusa requests**, always use the per-request `medusaFetch` pattern from `storefront/src/lib/medusa-customer.ts` — never mutate the shared SDK singleton's auth state. See Section 4.

### 3.2 Client Component Data Fetching

Client components must **not** import the SDK singleton directly. Use `fetch()` to call the storefront's own API routes at `/api/*`:

```typescript
// Do — client component
async function handleLogin(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) return { ok: false, error: data.error }
  return { ok: true }
}

// Don't — client component importing server-only SDK
import { sdk } from "@/lib/medusa" // may contain process.env.MEDUSA_BACKEND_URL
```

### 3.3 Storefront API Routes

API routes in `storefront/src/app/api/` use the Next.js `NextRequest` / `Response` pattern:

```typescript
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return Response.json({ error: "Email and password required" }, { status: 400 })
    }
    const result = await loginCustomer(email, password)
    return createAuthResponse({ user: result.user }, result.token)
  } catch (e) {
    const message = e instanceof Error ? e.message : "Login failed"
    return Response.json({ error: message }, { status: 401 })
  }
}
```

**Rules:**
- `request.json()` body parsing wrapped in try/catch
- Error responses use `Response.json({ error: string }, { status })` — consistent shape
- Auth endpoints use `createAuthResponse` / `createErrorResponse` helpers from `lib/auth.ts`
- Admin mutation routes validate admin role first via `requireRole`

### 3.4 Backend API Routes

Backend API routes in `backend/medusa/src/api/` use Medusa's `MedusaRequest` / `MedusaResponse`:

```typescript
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { cart_id, provider_id } = req.body as { cart_id?: string; provider_id?: string }

  if (!cart_id || !provider_id) {
    res.status(400).json({ valid: false, reason: "cart_id and provider_id are required" })
    return
  }

  try {
    const query = req.scope.resolve("query")
    const { data: [cart] } = await query.graph({
      entity: "cart",
      filters: { id: cart_id },
      fields: ["id", "total"],
    })
    if (!cart) {
      res.status(400).json({ valid: false, reason: "cart_not_found" })
      return
    }
    res.status(200).json({ valid: true })
  } catch (err) {
    console.error("[route-name] Error:", err)
    res.status(500).json({ valid: false, reason: "internal_error" })
  }
}
```

**Rules:**
- Use `req.scope.resolve(Modules.X)` or `ContainerRegistrationKeys.QUERY` for Medusa services
- Never call `req.body` without type assertion
- Return early pattern: validate input, return 400, then proceed
- All external service calls wrapped in try/catch
- Status codes: 200 success, 400 validation, 401/403 auth, 404 not found, 500 internal, 502 upstream failure

### 3.5 Backend Route File Names and Method Exports

```
backend/medusa/src/api/store/validate-payment-method/route.ts
```

Each method is a named export:
```typescript
export async function GET(req: MedusaRequest, res: MedusaResponse) { ... }
export async function POST(req: MedusaRequest, res: MedusaResponse) { ... }
```

---

## 4. Auth & Security Patterns

### 4.1 Per-Request Auth (Never Shared Singleton)

The SDK singleton in `lib/medusa.ts` uses `jwtTokenStorageMethod: "memory"` — safe for anonymous store requests but must **never** be used for authenticated calls.

```typescript
// Do — per-request auth (lib/medusa-customer.ts)
async function medusaFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (opts.token) headers["Authorization"] = `Bearer ${opts.token}`
}

// Don't — mutating singleton auth
sdk.auth.setToken(token) // affects every concurrent request!
```

The admin client (`lib/medusa-admin.ts`) is the one exception — it caches a single service-account token in `cachedToken`. This is safe because (D-012) there is exactly one operator.

### 4.2 HTTP-Only Cookies

Customer auth tokens are stored in httpOnly cookies:
- `auth-token` — custom JWT for role/identity (used by `proxy.ts` route guard and `/api/auth/me`)
- `_medusa_jwt` — Medusa customer JWT for Medusa API calls

```typescript
// Do (lib/auth.ts)
cookieStore.set(COOKIE_NAME, token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60,
  path: "/",
})
```

### 4.3 Admin: Deny-by-Default RBAC

Three layers enforce admin access:

1. **Proxy** (`storefront/src/proxy.ts`): edge-level guard, checks JWT role against `ADMIN_ROLES`.
2. **Route handler** (`requireRole`): every `/api/admin/*` route calls `requireRole(request, ["superadmin", "admin"])`.
3. **Admin layout**: client-side re-verification.

Roles: `superadmin` | `admin` | `manager` | `customer`. Manager can view but not mutate.

### 4.4 Rate Limiting, CSRF & Origin Checks

Mutation API routes (POST/PUT/DELETE) should verify the `Origin` header in production:

```typescript
if (process.env.NODE_ENV === "production") {
  const origin = request.headers.get("origin")
  const allowed = (process.env.STORE_CORS || "").split(",").map((s) => s.trim())
  if (origin && !allowed.includes(origin)) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }
}
```

### 4.5 Secrets Management

- **Never** hardcode secrets in code, comments, or documentation
- **Never** commit `.env` files — they are in `.gitignore`
- **Never** paste secrets into agent prompts or run notes
- Store secrets only in: `.env.local` (local dev), Vercel/Render env vars (prod), 1Password (backup)
- Default dev-only fallbacks must be guarded:

```typescript
// Do — guard with NODE_ENV check (lib/auth.ts)
function getSecret(): Uint8Array {
  if (process.env.NODE_ENV === "production" && !JWT_SECRET) {
    throw new Error("JWT_SECRET is required in production")
  }
  return new TextEncoder().encode(JWT_SECRET || "tpl-dev-jwt-secret-change-in-prod")
}
```

### 4.6 Webhook Signature Verification

All webhooks must verify against the **raw request body** — never use `JSON.stringify(req.body)` for HMAC computation, as re-stringification may differ from the original byte stream.

```typescript
// Required pattern — raw body verification
// Do: read raw body from request stream before JSON parsing
// Don't use: JSON.stringify(req.body) — this is a P0 bug in the current codebase
```

### 4.7 Idempotent Webhook Processing

Webhook handlers must be idempotent. Track processed events to prevent duplicates:

```typescript
const alreadyProcessed = await paymentModuleService.listPaymentSessions({
  data: { razorpay_order_id: payment.order_id, status: "authorized" },
})
if (alreadyProcessed.length > 0) return // already handled
```

### 4.8 Agent/AI Tool Security

- Public agents may read public content only (products, collections, FAQ, policies)
- Protected agents (cart, checkout, account, admin) require JWT auth + explicit user consent
- Write tools require: authentication → audit log → explicit user confirmation before execution
- Never expose agent endpoints that mutate orders, refund payments, or modify user accounts without admin role verification

---

## 5. Payment & Order Patterns

### 5.1 COD Minimum Enforced Server-Side

The ₹299 minimum for COD is enforced in two layers:

1. **UX gate** (storefront): COD option hidden when `cart.total < 29900` paise
2. **Integrity gate** (backend): `POST /store/validate-payment-method` returns 400 if violated

```typescript
// Backend gate (backend/medusa/src/api/store/validate-payment-method/route.ts)
if (provider_id === "cod" && cartTotal < COD_MINIMUM_PAISE) {
  res.status(400).json({
    valid: false,
    reason: "COD is only available on orders of ₹299 or more.",
  })
  return
}
```

### 5.2 Prepaid Discount

The ₹30 prepaid discount is a **line item adjustment** (not a coupon code) so it cannot be manually entered:

- Apply: `POST /store/prepaid-discount` — validates provider_id, checks for duplicate (`ADJUSTMENT_KEY`), adds -3000 paise
- Remove: `POST /store/prepaid-discount-remove` — deletes adjustments matching the key
- Always idempotent: checks `alreadyApplied` before adding
- Only applies for `provider_id !== "cod"` — server-side guard

### 5.3 Razorpay Webhook

The webhook at `POST /store/razorpay-webhook` must:
1. Verify `X-Razorpay-Signature` header against raw body with HMAC-SHA256
2. On `payment.captured` / `payment.authorized`: update Medusa payment session to authorized
3. On `payment.failed`: log and return — cart stays open for retry
4. Always return 200 to Razorpay (they retry on non-200)

### 5.4 Shiprocket Sync

The subscriber (`backend/medusa/src/subscribers/shiprocket-sync.ts`):
- Fires on `order.placed`
- **Dormancy gate**: returns silently if `SHIPROCKET_EMAIL` / `SHIPROCKET_PASSWORD` not set
- **Non-blocking**: all API calls wrapped in try/catch — failure never breaks order fulfillment
- **Token cache**: in-memory with 23h expiry (safe for single-instance D-012 deployment)
- **Idempotent**: Shiprocket order_id derived from Medusa display_id (`TPL-{display_id}`)

---

## 6. Module Patterns (Backend)

### 6.1 All Custom Modules Extend Medusa Abstract Providers

```typescript
// Do (backend/medusa/src/modules/cod-payment/index.ts)
import {
  AbstractPaymentProvider,
  ModuleProvider,
  Modules,
  PaymentSessionStatus,
} from "@medusajs/framework/utils"

class CODPaymentProvider extends AbstractPaymentProvider<Record<string, never>> {
  static identifier = "cod"
  // ...implement all required methods
}

export default ModuleProvider(Modules.PAYMENT, {
  services: [CODPaymentProvider],
})
```

### 6.2 Static Identifier

Each module declares a `static identifier` — this matches the `id` in `medusa-config.ts`:

```typescript
static identifier = "cod"            // CODPaymentProvider
static identifier = "razorpay"       // RazorpayPaymentProvider
static identifier = "smtp-notification"  // SMTPNotificationProviderService
```

### 6.3 Constructor Pattern

```typescript
// Do — payment provider
constructor(container: Record<string, unknown>, options: RazorpayOptions) {
  super(container, options)
  this.keyId = options.key_id
  this.keySecret = options.key_secret
}

// Do — notification provider
constructor(container: Record<string, unknown>, options: Record<string, never>) {
  super()
  // ...setup transport
}
```

### 6.4 Dormancy Contracts

All integration modules follow the dormancy pattern: **zero code changes at go-live**:

```typescript
// In medusa-config.ts — provider registration gated by env var presence
const RAZORPAY_ENABLED = !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
const paymentProviders = [{ resolve: "./src/modules/cod-payment", id: "cod", options: {} }]
if (RAZORPAY_ENABLED) {
  paymentProviders.push({ resolve: "./src/modules/razorpay-payment", id: "razorpay", options: {...} })
}

// In subscriber — return silently when creds not set
const WHATSAPP_ENABLED = !!(process.env.GUPSHUP_API_KEY || ...)
export default async function handler(...) {
  if (!WHATSAPP_ENABLED) return
}
```

### 6.5 Audit Logging

Notification providers write daily JSONL audit trails:

```typescript
// Pattern (backend/medusa/src/modules/smtp-notification/index.ts)
const AUDIT_DIR = path.join(process.cwd(), "notification-audit")

private _writeAuditLog(entry: LogEntry): void {
  try {
    if (!fs.existsSync(AUDIT_DIR)) fs.mkdirSync(AUDIT_DIR, { recursive: true })
    const dateStr = new Date().toISOString().split("T")[0]
    const filePath = path.join(AUDIT_DIR, `${dateStr}.jsonl`)
    fs.appendFileSync(filePath, JSON.stringify(entry) + "\n")
  } catch {
    // Non-fatal — never throw from audit logging
  }
}
```

---

## 7. Subscriber Patterns (Backend)

### 7.1 Standard Contract

```typescript
import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function myHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  // ...handle event
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
```

### 7.2 Non-Blocking Guarantee

Every external API call in a subscriber must be wrapped in try/catch. An outage must **never** break order fulfillment:

```typescript
export default async function handler({ event: { data }, container }: SubscriberArgs<...>) {
  if (!credentials) return // dormancy gate
  try {
    // ...all external API calls
  } catch (err) {
    console.error(`[handler] FAILED for ${data.id} — order NOT affected.`)
  }
}
```

### 7.3 Dormancy Gates

Check credentials at the top of the handler. Return silently if not configured:

```typescript
const WHATSAPP_ENABLED = !!(
  process.env.GUPSHUP_API_KEY || process.env.MSG91_AUTH_KEY
)

export default async function handler(...) {
  if (!WHATSAPP_ENABLED) return
  // ...rest
}
```

### 7.4 Event-Driven

Subscribers respond to Medusa domain events:

| Event | Subscriber | Purpose |
|---|---|---|
| `order.placed` | `order-confirmation.ts` | WhatsApp order confirmation |
| `order.placed` | `shiprocket-sync.ts` | Push order to Shiprocket |
| `fulfillment.created` | `fulfillment-notification.ts` | Tracking/shipping notification |
| `order.updated` | `order-delivery.ts` | Delivery confirmation |

---

## 8. Naming Conventions

### 8.1 Files

| Type | Convention | Examples |
|---|---|---|
| Component files | PascalCase | `button.tsx`, `product-card.tsx` |
| Utility/lib files | kebab-case | `auth-context.tsx`, `medusa-customer.ts` |
| API route files | `route.ts` in named directory | `login/route.ts`, `validate-payment-method/route.ts` |
| Backend modules | hyphenated | `cod-payment/`, `razorpay-payment/` |
| Subscribers | hyphenated | `order-confirmation.ts`, `shiprocket-sync.ts` |
| Type definitions | `.types.ts` suffix | `auth-types.ts` |

### 8.2 Variables & Functions

```typescript
// Do — camelCase
const cartTotalPaise = getCartTotalPaise(cart)
const freeShippingThreshold = 499
async function loadCart() { ... }
function handleSelectPayment(method: PaymentMethod) { ... }
```

### 8.3 Types & Interfaces

```typescript
// Do — PascalCase with domain prefix
type StoreProduct = { ... }
type MedusaCustomer = { ... }
type SafeUser = { ... }
type AuthTokenPayload = { ... }
type PaymentMethod = "cod" | "razorpay" | ""
type AdminOrderListItem = { ... }
```

**Prefix conventions by domain:**

| Prefix | Domain |
|---|---|
| `Store*` | Medusa storefront entities |
| `Medusa*` | Medusa customer/order entities |
| `Admin*` | Admin panel entities |
| `Auth*` | Auth context, tokens, payloads |
| `Safe*` | Sanitized (non-sensitive) projections |

### 8.4 Constants

```typescript
// Do — UPPER_SNAKE_CASE for module-level constants
const COD_MINIMUM_PAISE = 29900
const PREPAID_DISCOUNT_PAISE = 3000
const ADJUSTMENT_KEY = "prepaid_discount"
const COOKIE_NAME = "auth-token"
const TOKEN_MAX_AGE = 7 * 24 * 60 * 60
```

### 8.5 Backend API Route Exports

```typescript
export async function POST(req: MedusaRequest, res: MedusaResponse) { ... }
export async function GET(req: MedusaRequest, res: MedusaResponse) { ... }
export async function DELETE(req: MedusaRequest, res: MedusaResponse) { ... }
```

---

## 9. Responsive Design Standards

### 9.1 Mobile-First CSS

All CSS assumes mobile by default. Desktop overrides use `min-width` breakpoints:

```css
/* globals.css — @theme defines mobile sizes */
@theme {
  --text-h1: 2rem;      /* 32px mobile */
  --text-h2: 1.5rem;    /* 24px mobile */
}

/* Desktop override at 1024px */
@media (min-width: 1024px) {
  :root {
    --text-h1: 3.5rem;  /* 56px desktop */
    --text-h2: 2.5rem;  /* 40px desktop */
  }
}
```

### 9.2 Breakpoint Contract

| Range | Width | Notes |
|---|---|---|
| Small phone | 320–374px | Minimum supported — no horizontal scroll |
| Phone | 375–479px | iPhone SE / standard mobile |
| Large phone | 480–767px | Landscape phones |
| Tablet | 768–1023px | iPad portrait |
| Small desktop | 1024–1279px | Type scale bumps up |
| Desktop | 1280–1535px | Standard desktop |
| Large desktop | 1536px+ | Wide screens |

**Tailwind v4 responsive utilities:**
```html
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
hidden md:block              <!-- hide on mobile, show on tablet+ -->
flex md:hidden               <!-- show on mobile only -->
```

### 9.3 Touch Target Sizes (WCAG 2.2)

All interactive touch targets must be at least **44x44px**:

```html
<!-- Do — minimum 44px target size -->
<button class="min-h-[44px] min-w-[44px] ...">Tap me</button>

<!-- Don't — too small -->
<button class="p-1 text-xs ...">X</button>
```

### 9.4 Mobile Bottom Navigation

- Bottom nav is mobile-only. Never rendered alongside desktop navigation.
- Mobile drawers behave as dialogs: `aria-expanded`, `aria-controls`, `Escape` closes, focus trap.

### 9.5 No Horizontal Scroll at 320px

Test every page at 320px viewport width. No horizontal scrollbars allowed. Use `overflow-x-hidden` on body only as a last resort — prefer responsive layouts that shrink gracefully.

### 9.6 Design Tokens via `@theme`

All visual tokens live in the `@theme` block in `globals.css`. Never hardcode colors, spacing, or type sizes in utility classes — reference the custom tokens:

```css
/* Do — custom token */
--color-accent-primary: #E63B2E;
--text-h1: 2rem;
--radius-md: 4px;

/* In components */
className="bg-surface-raised text-text-primary font-heading text-h2"
```

---

## 10. Testing Standards

### 10.1 Storefront Tests (To Be Implemented)

Priority order for test coverage:
1. Auth routes: login, register, logout, session validation
2. Account ownership: address CRUD, order history, payment method restriction
3. Cart: add, update, remove items; cart persistence across sessions
4. Checkout: COD path, Razorpay path (mocked), validation gates
5. Admin: order mutations with role verification

### 10.2 Backend Tests (Jest — Medusa Integration Test Suite)

The backend uses Jest with `@medusajs/test-utils`. Tests live in `backend/medusa/integration-tests/`:

```
backend/medusa/integration-tests/http/health.spec.ts
```

Priority order for backend testing:
1. COD payment: minimum enforced, no-op captures
2. Prepaid discount: apply, remove, idempotent, COD guard
3. Razorpay webhook: signature verification, session state update, idempotency
4. Shiprocket sync: dormancy gate, non-blocking, payload shapes
5. Guest tracking: guest cart, order claiming, transfer

### 10.3 CI Gates

Every PR must pass:
1. `npm run lint` (ESLint — storefront)
2. `npm run typecheck` (TypeScript — both storefront and backend)
3. `npm run build` (Build integrity — both)
4. Secret scan (pre-commit hook — block if any `.env` or secret pattern detected)
5. Dependency audit (`npm audit`)

---

## 11. AI/Agent Commerce Patterns

### 11.1 Storefront Routes for Agents

The following routes are designed for AI agent consumption (crawlable, semantic, server-rendered):

| Route | Content |
|---|---|
| `/products/{handle}` | Server-rendered PDP with full content |
| `/collections/{slug}` | Collection listing |
| `/gifts/for-{persona}` | Gift persona pages |
| `/faq` | FAQ content |
| `/contact` | Support information |
| `/about` | Brand story |
| `/sell-your-art` | Artist onboarding |
| `/mission-control` | Public program status |

### 11.2 Structured Data (JSON-LD)

Every PDP must include JSON-LD with `Product`, `Offer`, and `BreadcrumbList` schemas:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "...",
  "offers": {
    "@type": "Offer",
    "price": "249.00",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

### 11.3 AI Discovery Surface

The following files must exist at the storefront root:
- `/robots.txt` — allows all crawlers, points to sitemap
- `/sitemap.xml` — lists all product, collection, content pages
- `/llms.txt` — provides concise site summary for LLM crawlers (per Anthropic's llms.txt spec)
- Product feed (JSON/XML) — for structured ingestion

### 11.4 Canonical URLs

All content pages must have canonical `<link rel="canonical">` tags pointing to stable, unique URLs. Never generate duplicate content paths.

### 11.5 Agent Endpoint Security

- Public agent endpoints: read-only, no auth required, access public content only
- Protected agent endpoints: require JWT auth, audit-log every access
- Write agent tools: require auth + audit log + explicit user confirmation (never auto-execute)

---

## 12. Directory Structure Conventions

### 12.1 Storefront

```
storefront/src/
  app/                        # Next.js App Router
    layout.tsx                # Root layout (fonts, GA4, chrome)
    page.tsx                  # Homepage
    globals.css               # Tailwind v4 @theme + global styles
    analytics-events.tsx      # ViewItemEvent / ViewItemListEvent server components
    [...route]/page.tsx       # Standard page routes
    api/                      # API route handlers
      auth/                   # Auth endpoints (login, register, logout, me, etc.)
      account/                # Customer endpoints (profile, orders, addresses)
      admin/                  # Admin endpoints (orders, products, customers)
    products/[handle]/
      page.tsx
      add-to-cart-button.tsx
    collections/[slug]/
      page.tsx
      collection-content.tsx
    cart/
      page.tsx
      cart-client.tsx
    checkout/
      page.tsx
      checkout-client.tsx
  components/
    index.ts                  # Barrel exports
    ui/                       # UI primitives
    domain-name.tsx           # Shared components
  lib/                        # Libraries, utilities, types
    medusa.ts                 # SDK singleton + unauthenticated helpers
    medusa-customer.ts        # Per-request customer auth + API
    medusa-admin.ts           # Admin service-account client
    medusa-auth.ts            # Auth orchestration (login, register, etc.)
    auth.ts                   # JWT, cookies, RBAC helpers
    auth-context.tsx          # React AuthProvider (client)
    auth-types.ts             # Type definitions
    data.ts                   # Static content (collections, sets, gifts)
    master-catalog.ts         # Local catalog fallback
    analytics.ts              # GA4 client helpers
  proxy.ts                    # Route protection (Next 16)
```

### 12.2 Backend

```
backend/medusa/src/
  api/                        # Custom API routes
    admin/                    # Admin routes
      operator-password/route.ts
      custom/route.ts
    store/                    # Storefront routes
      validate-payment-method/route.ts
      prepaid-discount/route.ts
      prepaid-discount-remove/route.ts
      razorpay-webhook/route.ts
      track-order/route.ts
      claim-order/route.ts
      reset-password/route.ts
      update-password/route.ts
      customer-password/route.ts
      order-transfer-request/route.ts
      accept-order-transfer/route.ts
      custom/route.ts
  modules/                    # Custom Medusa modules
    cod-payment/index.ts
    razorpay-payment/index.ts
    smtp-notification/index.ts
    whatsapp-notification/
      index.ts
      templates.ts
      meta-transport.ts
  subscribers/                # Event subscribers
    order-confirmation.ts
    shiprocket-sync.ts
    fulfillment-notification.ts
    order-delivery.ts
  scripts/                    # CLI/seed scripts
  workflows/                  # Custom workflows (future)
  jobs/                       # Scheduled jobs (future)
```

---

## 13. Environment Configuration

### 13.1 India-First Defaults

The entire codebase assumes India as the primary market:

```typescript
// Do — always use INR, India region, 18% GST
export const INDIA_REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID || ""
const CURRENCY = "inr"
const GST_RATE = 18
```

### 13.2 Feature Flags via Env Var Presence

Feature flags are driven entirely by environment variable presence — never by build-time constants or config files:

```typescript
// Pattern (backend/medusa/medusa-config.ts)
const RAZORPAY_ENABLED = !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
const SHIPROCKET_ENABLED = !!(process.env.SHIPROCKET_EMAIL && process.env.SHIPROCKET_PASSWORD)
const WHATSAPP_ENABLED = !!(process.env.GUPSHUP_API_KEY || ...)
```

### 13.3 Public vs Server Env Vars

| Scope | Prefix | Examples |
|---|---|---|
| Client-safe | `NEXT_PUBLIC_*` | `NEXT_PUBLIC_MEDUSA_BACKEND_URL`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` |
| Server-only | Not prefixed | `MEDUSA_BACKEND_URL`, `JWT_SECRET`, `RAZORPAY_KEY_SECRET` |

**Never expose server-only env vars to the client bundle.** Storefront files that reference server-only env vars must include a comment barring client import (see `lib/medusa-admin.ts`, `lib/medusa-customer.ts`).

---

## 14. Error Handling Patterns

### 14.1 Structured Responses

```typescript
// Storefront API routes
{ error: "Human-readable message" }  // 400, 401, 403, 404, 500

// Backend API routes
{ reason: "machine_readable_reason" }  // or
{ valid: false, reason: "..." }
```

### 14.2 All External Calls Wrapped

```typescript
try {
  const result = await externalService.call()
  return result
} catch (err) {
  console.error(`[service-name] FAILED for ${id}:`, (err as Error).message)
  // Never throw — return fallback or empty
  return defaultValue
}
```

### 14.3 Southbound Gate Failure (Dormancy)

When credentials are absent, return silently — do not throw, do not log errors:

```typescript
if (!credentialsConfigured) return  // silent no-op
```

### 14.4 Northbound Error Propagation

When a caller must know about failure (e.g., payment webhook), throw typed errors:

```typescript
class MedusaApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}
```

---

## 15. Linting & Formatting

### 15.1 ESLint (Storefront)

The storefront uses ESLint v9 with `eslint-config-next`:
```
npm run lint  # Run eslint on storefront/
```

**Current violations:** 34 errors, 9 warnings (must be addressed before launch). Key categories:
- Unused imports and variables
- Missing `key` props in iterated elements
- `any` type usage where stricter types are available

### 15.2 No Formatting Tool

This project does not use Prettier. Formatting consistency is enforced through ESLint rules and code review. All agents must manually format their output to match the conventions in this document.

---

## 16. Commit Conventions (Git)

### 16.1 Commit Message Format

```
<type>: <short description>

<optional body — why not what>
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `config`

### 16.2 What to Commit

- **Do commit:** source code, tests, configuration, documentation
- **Do not commit:** `.env` files, `node_modules/`, `.next/`, build output, secrets, large binary files
- **Do not commit:** commented-out code, debugging statements (`console.log` outside of intentional patterns)

### 16.3 Branch Naming

```
<type>/<short-description>
```

Examples: `feat/razorpay-webhook`, `fix/cod-validation`, `chore/tsconfig-strict`

---

## Appendix: Key Files Reference

| File | Purpose |
|---|---|
| `storefront/tsconfig.json` | Storefront TypeScript config (strict: true) |
| `backend/medusa/tsconfig.json` | Backend TypeScript config (strictNullChecks: true) |
| `storefront/eslint.config.mjs` | ESLint v9 config |
| `storefront/src/proxy.ts` | Next 16 proxy (edge route guard) |
| `storefront/src/lib/medusa.ts` | SDK singleton + unauthenticated helpers |
| `storefront/src/lib/medusa-customer.ts` | Per-request customer auth |
| `storefront/src/lib/medusa-admin.ts` | Admin service-account client |
| `storefront/src/lib/medusa-auth.ts` | Auth orchestration |
| `storefront/src/lib/auth.ts` | JWT + cookie + RBAC helpers |
| `storefront/src/lib/auth-context.tsx` | React AuthProvider |
| `storefront/src/lib/auth-types.ts` | Auth type definitions |
| `storefront/src/lib/analytics.ts` | GA4 client helpers |
| `storefront/src/app/globals.css` | Tailwind v4 @theme + design tokens |
| `backend/medusa/medusa-config.ts` | Medusa config + feature flags |
| `backend/medusa/src/modules/cod-payment/index.ts` | COD payment provider |
| `backend/medusa/src/modules/razorpay-payment/index.ts` | Razorpay payment provider |
| `backend/medusa/src/modules/smtp-notification/index.ts` | SMTP notification provider |
| `backend/medusa/src/subscribers/shiprocket-sync.ts` | Shiprocket order sync |
| `backend/medusa/src/subscribers/order-confirmation.ts` | WhatsApp confirmation |
| `backend/medusa/src/api/store/validate-payment-method/route.ts` | COD floor validator |
| `backend/medusa/src/api/store/prepaid-discount/route.ts` | Prepaid discount apply/remove |
| `backend/medusa/src/api/store/razorpay-webhook/route.ts` | Razorpay webhook handler |
