# Handoff: Harley / Maria to Build, Catalog, Growth, QA, and Ops Agents

| Field | Value |
|-------|-------|
| **Date** | 2026-06-11 |
| **Handoff ID** | H-027 |
| **From Agent** | Harley — Program Director; Maria — Research Librarian |
| **To Agent** | Tobi, Andy, Joanna, Kurt, James, Avinash, Tony, Lenny |

### Artifact(s) Delivered

| Artifact | Location | Status |
|----------|----------|--------|
| AEO and Agentic Commerce Readiness | `artifacts/phase-4/aeo-agent-commerce-readiness.md` | draft |

### Quality Assessment

The artifact is strong on implementation direction, current Google/Merchant Center requirements, crawler policy, and agent operating boundaries. It is intentionally conservative on Google Universal Cart because current public availability is not dependable for an India launch. It should be treated as readiness work, not a promise that TPL can launch inside Universal Cart on day one.

The weakest area is final platform-specific implementation detail for feed generation and internal agent tools. Tobi must convert the recommendations into concrete Next.js/Medusa routes, scripts, and tests.

### Instructions for Receiver

Tobi must convert this into build tasks:

- add `/robots.txt`
- add `/sitemap.xml`
- add `/llms.txt`
- add product feed route
- add PDP JSON-LD
- define internal catalog API or MCP plan
- protect all write operations behind auth and explicit confirmation

Andy must enrich the catalog fields before product import is considered launch-ready. The WooCommerce export is source material, not launch truth.

Joanna must add answerable PDP content blocks and image alt text. Copy should answer buyer questions without sounding like generic SEO.

Kurt must ensure the PDP and collection page structure places decision-support content in crawlable HTML.

James must add QA coverage for schema, feed/page mismatches, robots, sitemap, policy visibility, and public/private agent access boundaries.

Avinash must add monitoring for feed freshness, schema errors, crawl errors, bot traffic, zero-result searches, and agent tool calls.

Tony must make shipping, returns, COD, UPI/prepaid, support, order status, and return-start language operationally clear.

Lenny must review IP/licensing risk flags and crawler policy before launch.

### Open Questions

1. Will Dan allow or block AI training crawlers such as `GPTBot`?
2. Which Merchant Center account owns `theproductlab.in`, and is the domain already verified?
3. Will launch catalog include any products with third-party IP risk, such as sports/entertainment references?
4. Will internal agents use a lightweight API first, or should Tobi build an MCP server during Phase 4?

### Dependencies Resolved

- AEO and agentic commerce research is now translated into build-ready requirements.
- Google Universal Cart is framed as readiness work, not a blocking launch integration.
- Public crawler access and private agent tool boundaries are defined.

### Dependencies Created

- Tobi needs implementation tasks for feed, schema, sitemap, robots, llms, and agent API boundary.
- Andy and Joanna need enriched catalog fields before Merchant Center feed quality can pass.
- James needs QA criteria added to Phase 4 sign-off.
- Dan must decide crawler training policy and provide Merchant Center access.
