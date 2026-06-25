<!-- last-updated: 2026-06-11 -->
# AEO and Agentic Commerce Readiness

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build and Merchandising Implementation |
| **Producing Agent** | Harley + Maria |
| **Date** | 2026-06-11 |
| **Status** | draft |
| **Reviewer** | Dan |
| **Informed By** | D-025, product catalog exports, Google Search/Merchant Center docs, OpenAI crawler docs, agent research sprint |

## 1. Executive Direction

AEO is not a separate growth hack. For The Product Lab, AI-visible commerce means the same things that make the store trustworthy to humans and search engines:

- clean product truth
- crawlable product and collection pages
- complete structured data
- fresh product feeds
- clear shipping, return, payment, and support policies
- useful buying guidance on the page
- authenticated tools for internal agents

The launch platform is Medusa + Next.js per D-025. WooCommerce exports are migration input only. Medusa/catalog data becomes the source of truth for feeds, schema, storefront content, and agent tools.

Google Universal Cart / Universal Commerce Protocol should be treated as a readiness vector, not a launch dependency for India. The durable work is product data quality, feed quality, inventory accuracy, checkout clarity, and policy consistency.

## 2. Non-Negotiable Launch Requirements

### Public Discovery Surface

Tobi owns implementation, Andy owns catalog truth, James validates.

- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- product feed at `/feed/products.json` or `/feed/products.xml`
- server-rendered product facts on PDPs
- JSON-LD on PDP, collection, policy, FAQ, and organization pages
- stable canonical URLs for products, collections, sets, gifts, drops, and policy pages

### Product Page Structured Data

Every PDP must emit JSON-LD that matches visible page content and feed data:

- `Product`
- `Offer`
- SKU
- brand: `The Product Lab`
- price in `INR`
- availability
- canonical URL
- image URLs
- description
- category
- variants where applicable
- shipping policy where supported
- return policy where supported
- review/rating data only when real
- breadcrumb data

Do not publish schema for claims the visible page does not support.

### Merchant Center Feed

Avinash/Tobi own feed generation. Andy owns source data. James validates diagnostics.

Minimum feed fields:

- `id`
- `title`
- `description`
- `link`
- `image_link`
- `availability`
- `price`
- `brand`
- `google_product_category`
- `product_type`
- `condition`
- `shipping`
- `return_policy_label` or account-level policy equivalent
- `sale_price` where relevant
- `promotion_id` where relevant
- `item_group_id`, `color`, `size`, or other variant attributes where relevant
- India-only `maximum_retail_price` where operationally true

Feed, PDP, schema, cart, and checkout must agree on price, stock, currency, variant, shipping promise, and return promise.

## 3. Catalog Data Upgrade

The current cleaned catalog has the seed fields: SKU, title, category, price, image URL, and stock status.

Before launch, Andy and Joanna should enrich the launch catalog with:

| Field | Owner | Reason |
|-------|-------|--------|
| `slug` | Andy | Stable URLs and feed links |
| `brand` | Andy | Merchant feed and schema |
| `short_description` | Joanna | PDP scan value and AEO answerability |
| `long_description` | Joanna | PDP detail and AI citation quality |
| `material` | Andy | Product comparison and buyer confidence |
| `dimensions` | Andy | Buying decision support |
| `weight_g` | Andy | Shipping calculation |
| `gift_persona` | Jenna/Joanna | Gift pages and answer-engine matching |
| `collection_slug` | Jenna | Opinion-led merchandising |
| `set_eligibility` | Jenna | Build-your-set mechanics |
| `image_alt` | Joanna | Image search and accessibility |
| `canonical_url` | Tobi | Search consistency |
| `mrp_inr` | Patrick/Andy | India feed readiness |
| `sale_price_inr` | Patrick/Andy | Promotion readiness |
| `return_eligible` | Tony | Policy clarity |
| `ip_risk_flag` | Lenny/Andy | Avoid licensing issues |

No product should be promoted into the launch set with missing image, missing price, missing stock state, or unresolved IP risk.

## 4. Page Content Pattern for AEO

Each PDP should answer these questions in visible copy:

1. What is it?
2. Who is it for?
3. What is it made of?
4. How big is it?
5. What does it pair with?
6. Is it giftable?
7. When will it ship?
8. Can it be returned?
9. Is COD, UPI, or prepaid supported?
10. Why this product over a nearby alternative?

Collections should include a short buying guide, not just a product grid. The goal is to help both humans and answer engines understand why a collection exists.

Recommended launch guides:

- Best small gifts under Rs. 299
- Desk objects for people with too many opinions
- Fridge magnet gift guide
- Card stickers: full card vs half card
- Keychains by personality
- Starter sets for first-time TPL buyers
- How to build an Opinion Wall
- Gifts for the group chat

These guides must use original product knowledge and TPL voice. Do not publish generic search-first filler.

## 5. Agent Access Model

### Public Agents

Public agents and search crawlers can read PDPs, collection pages, gift pages, set pages, policy pages, `/llms.txt`, sitemap, and product feed.

They should not access cart, checkout, account, orders, admin, preview URLs, internal APIs, or search/facet crawl traps.

Recommended `robots.txt` baseline:

```txt
User-agent: *
Disallow: /cart
Disallow: /checkout
Disallow: /account
Disallow: /orders
Disallow: /admin
Disallow: /search?*
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Disallow: /

Sitemap: https://theproductlab.in/sitemap.xml
```

Dan can choose to allow or block AI training crawlers. Discovery crawlers should remain allowed unless there is a clear legal reason to block.

### Internal Agents

Internal agents should not scrape storefront HTML for operational work. They should use authenticated tools.

Read-only tools first:

- `search_products`
- `get_product`
- `compare_variants`
- `check_inventory`
- `get_shipping_policy`
- `get_return_policy`
- `calculate_shipping`

Write tools only after auth and audit logging:

- `create_draft_cart`
- `create_support_ticket`
- `get_order_status`
- `start_return`

Hard consent boundary:

Agents may not place orders, change addresses, cancel orders, issue refunds, or trigger payment without an authenticated user session and explicit confirmation.

## 6. Observability Requirements

Avinash and Tobi should add a small "agent-visible catalog health" dashboard or report. At minimum, track:

- feed generation time
- feed item count
- products missing required feed fields
- products with schema/feed/page mismatches
- rich result validation errors
- sitemap URL count
- crawl errors
- zero-result searches
- public bot traffic by user agent
- product feed access by user agent
- draft cart creation by source
- agent tool calls by user/action
- blocked bot/API requests

GA4 should retain standard commerce events and add events for search, collection views, set builder usage, gift finder usage, and product share actions.

## 7. Agent Assignments

| Agent | Workstream | Required Output |
|-------|------------|-----------------|
| Harley | Program control | Keep this artifact in Phase 4 gate scope |
| Claire | Task tracking | Add AEO/agent commerce tasks to sprint board |
| Maria | Source quality | Maintain source links and crawler/feed research |
| Andy | Catalog operations | Enriched catalog fields and feed data hygiene |
| Jenna | Merchandising | Collection, set, and gift-persona tagging |
| Joanna | Copy | PDP answer blocks, guide outlines, image alt text |
| Kurt | UX/IA | PDP/collection content placement and crawlable page structure |
| Tobi | Build | `/robots.txt`, `/sitemap.xml`, `/llms.txt`, feed route, JSON-LD, internal API/MCP plan |
| James | QA | Schema/feed/crawler/agent-access test coverage |
| Avinash | Analytics | Agent-visible catalog health metrics |
| Tony | Support/Ops | Policy clarity for shipping, returns, order status, support tickets |
| Lenny | Risk | IP/licensing and AI crawler policy review |

## 8. Phase 4 Gate Additions

Phase 4 cannot pass unless:

- Product feed exists and validates with required fields for the launch catalog.
- PDP JSON-LD exists and matches visible product data.
- Sitemap and robots.txt are live in staging.
- Policy pages exist and are linked in footer and feed/Merchant Center configuration.
- `/llms.txt` exists as a public, non-sensitive site map for AI systems.
- Merchant Center account is ready or has a documented blocker.
- Agent write operations are blocked behind auth and explicit confirmation.
- James has run crawlability, structured data, feed consistency, and policy visibility checks.

## 9. Sources

- Google Product structured data: https://developers.google.com/search/docs/appearance/structured-data/product
- Google Merchant product data specification: https://support.google.com/merchants/answer/7052112
- Google helpful content guidance: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google robots.txt handling: https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec
- OpenAI crawler controls: https://developers.openai.com/api/docs/bots
- Schema.org Product: https://schema.org/Product
- Schema.org Offer: https://schema.org/Offer
- Schema.org BuyAction: https://schema.org/BuyAction
