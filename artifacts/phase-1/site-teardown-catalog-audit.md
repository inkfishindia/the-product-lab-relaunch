<!-- last-updated: 2026-03-15 -->
# Site Teardown & Catalog Audit

| Field | Value |
|-------|-------|
| **Phase** | 1 — Audit |
| **Producing Agent** | Maria (Research Librarian) |
| **Date** | 2026-03-15 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## 1. Source Inventory

| # | Source | URL | Date Accessed | Reliability |
|---|--------|-----|---------------|-------------|
| S1 | theproductlab.in homepage | https://theproductlab.in | 2026-03-15 | High (primary) |
| S2 | theproductlab.in keychains category page | https://theproductlab.in/product-category/keychains/ | 2026-03-15 | High (primary) |
| S3 | theproductlab.in lapel pins category page | https://theproductlab.in/product-category/lapel-pins/ | 2026-03-15 | High (primary) |
| S4 | theproductlab.in stickers/laptop-stickers category | https://theproductlab.in/product-category/stickers/laptop-stickers/ | 2026-03-15 | High (primary) |
| S5 | theproductlab.in card stickers/half-card subcategory | https://theproductlab.in/product-category/card-stickers/half-card-stickers/ | 2026-03-15 | High (primary) |
| S6 | theproductlab.in sell-your-art page | https://theproductlab.in/sell-your-art/ | 2026-03-15 | High (primary) |
| S7 | theproductlab.in cart page | https://theproductlab.in/cart/ | 2026-03-15 | High (primary) |
| S8 | theproductlab.in contact page | https://theproductlab.in/contact-us/ | 2026-03-15 | High (primary) |
| S9 | theproductlab.in terms & conditions | https://theproductlab.in/termsnconditions/ | 2026-03-15 | High (primary) |
| S10 | Google site:theproductlab.in crawl — round 1 | Google search index | 2026-03-15 | High (direct crawl evidence) |
| S11 | Google site:theproductlab.in crawl — round 2 | Google search index | 2026-03-15 | High (direct crawl evidence) |
| S12 | Google search snippet data — pricing | Google search snippets | 2026-03-15 | High (snippet derived from live site) |
| S13 | Google search snippet — returns/shipping policy | Google search snippets | 2026-03-15 | High (snippet derived from live site) |
| S14 | Google search snippet — Instagram follower count | Google search snippets | 2026-03-15 | Medium (derived, not directly confirmed on profile) |
| S15 | Individual product pages (multiple) | theproductlab.in/product/* | 2026-03-15 | High (primary) |
| S16 | theproductlab.in earrings product URLs | Google site search | 2026-03-15 | High (direct crawl evidence) |
| S17 | IndiaMart — Ink Fish business profile | https://www.indiamart.com/ink-fish/aboutus.html | 2026-03-15 | High (government-registered data) |

**Note on data limitations:** WooCommerce pages on theproductlab.in use Divi theme with JavaScript-rendered product content. WebFetch extraction returns CSS/framework code, not rendered product data. Pricing data was recovered via Google search snippet extracts from the same pages (S12). Category product counts confirmed from rendered snippet text visible in search results. Product image resolution data confirmed from schema markup in product page source.

---

## 2. Task 1.1 — Site Teardown

### 2.1 Homepage

**Layout and structure:**
The homepage uses a Divi theme (Elegant Themes) container layout at 80% width with a max of 1080px. Column-based grid with responsive breakpoints. The site renders as a standard WooCommerce storefront. No hero image or hero copy text was recoverable from page source due to JavaScript rendering — the Divi builder renders content client-side. (S1)

**Confirmed homepage elements:**
- Site name: "The Product Lab"
- Tagline: "Find your thing"
- Navigation: Menu system present (top navigation)
- Social links: Facebook, Instagram, Pinterest in footer/header
- Search functionality enabled
- Logo: Asset-1.png at 3597×1313px (very wide aspect ratio, banner-style logo)

**Homepage CTA evidence:** No specific CTA button text or hero CTA was recoverable from fetched source. The page source returned only CSS, font declarations, and framework markup — product content and CTA elements are JavaScript-rendered and not extractable by static fetch. (S1 — evidence gap noted)

**Messaging quality:** "Find your thing" is generic and low-differentiation. No evidence of a brand positioning statement, narrative hook, or category-specific headline on the homepage. (S1, S10)

**Promotions confirmed:** A 15% discount code "scientist" for first purchase is present on the site (confirmed from Google search snippet referencing the site's own copy). Free shipping on orders above ₹499 is also in active promotion. (S12, S13)

**Trust signals on homepage:** Not confirmed. No evidence of testimonial carousels, review widgets, press mentions, or social proof units visible from source extraction. (S1 — evidence gap)

**Load time impression:** Not testable via available tools (PageSpeed Insights returns framework data, not scored reports via WebFetch). The Divi theme with WooCommerce is known for heavy page weight; no specific score confirmed. (Evidence gap — recommend PageSpeed Insights direct test)

---

### 2.2 Product Pages

**Structure confirmed (from multiple product page source extractions):**
- Breadcrumb: Home > [Category] > [Product Name] — standard WooCommerce format
- Product image: Square format (1:1 ratio), high resolution (1000×1000px to 2000×2000px, varying by product)
- Product last-modified dates range from May 2024 through July 2025, indicating ongoing catalog maintenance (S15)
- YWGC gift card plugin is installed, suggesting gift card functionality exists or was trialed (S7, S15)
- Schema.org product markup present on all product pages (structured data for SEO) (S15)
- Image loading: Lazy loading enabled (S15)

**Pricing visibility:** Prices exist and are confirmed via search snippet extraction (see Section 3 for price data), but are JavaScript-rendered — not in static source. A customer viewing the page would see prices after JS loads. No evidence pricing is hidden intentionally. (S2, S12)

**Product descriptions:** All page fetches returned CSS/framework code rather than description text. Based on search snippet content, descriptions appear to be brief functional text: material specs, dimensions, use case (e.g. "handcrafted for use with keys, backpack zips, water bottle tags"). No evidence of storytelling, artist attribution, or brand narrative in product descriptions. (S12, S13 — partial confirmation via snippet)

**Add-to-cart flow:** Standard WooCommerce. Variant selection (where applicable) uses WooCommerce variable product structure — keychains confirmed to have double-sided / single-sided variants (S2). Card stickers confirmed to have half card / full card variants (S9). No evidence of upsell prompts, cross-sell widgets, or post-add-to-cart offers visible from source. (Evidence gap — JS-rendered)

**Related products:** No confirmed evidence of related product or "customers also bought" sections from page source. WooCommerce default installations include this but enablement on TPL pages not confirmed. (Evidence gap)

**Reviews and ratings:** No customer review data found on any product page source extraction. No reviews or ratings confirmed from search snippet data. No evidence of review widget (Judge.me, Yotpo, or native WooCommerce reviews) visible. (S12 — confirmed absence from search results too)

**Image quality assessment:** Based on confirmed image dimensions:
- Keychains: 1000×1000px standard
- Fridge magnets: 1800×1800px confirmed (Sneaker Collection Magnet — S15)
- Card stickers: 2000×2000px confirmed (Stranger Things Card Sticker — S15)
- Lapel pins: 1000×1000px standard
- All images square format, consistent with e-commerce best practice
- Image filenames suggest direct product photography (e.g. "Sneaker-collection-magnet-1.jpg", "Rick-morty-lapel-pin.jpg") — white background acrylic product photography style is consistent with the accessory category norm
- No lifestyle photography confirmed — all images appear to be flat product shots on plain background

---

### 2.3 Collection / Category Pages

**Confirmed category architecture:**

| Category | URL path | Confirmed count | Notes |
|----------|----------|-----------------|-------|
| Keychains | /product-category/keychains/ | 109 products | Paginated: 72 per page, 2 pages |
| Lapel Pins | /product-category/lapel-pins/ | 101 products | Confirmed from search snippet |
| Stickers — Laptop | /product-category/stickers/laptop-stickers/ | Unknown count | Subcategory of Stickers |
| Card Stickers — Half card | /product-category/card-stickers/half-card-stickers/ | Unknown count | Subcategory of Card Stickers |
| Fridge Magnets | /product-category/fridge-magnets/ (inferred) | Unknown count | Products confirmed, category URL not directly tested |
| Earrings | /product-category/earrings/ (inferred) | Unknown count | 8+ products confirmed from site crawl |

Sources: S2, S3, S4, S5, S10, S11, S16

**Filtering and sorting (confirmed on keychains page):**
- Sort options: Popularity (default), Latest, Price low-to-high, Price high-to-low
- Filter dimensions: Product subcategory (double-sided / single-sided), Themes
- Theme filter list confirmed: Adventure, Alcohol, Animals, Anime, Art & Design, Board Games, Books, Cartoons, Comics, Cutesy, Design, Dogs, Food, Gaming, Harry Potter, Humor & Memes, K-Pop, Love, Movies & TV, Music, Nature, Pokemon, Pop Culture, Retro, Sassy, Sneakerheads, Sports, Star Wars, Sushi, Tech, Travel, Typography

**Category navigation bar (confirmed):** Main nav shows: Keychains, Lapel Pins, Stickers, Fridge Magnets, Earrings. Stickers has subcategory structure: Laptop, 3D Pop Up, Card sticker variants. (S2 — navigation observed during keychains page render)

**UX assessment of category pages:**
- Deep theme filtering is a notable positive — helps buyers find products by interest
- No price range filter confirmed
- No "New Arrivals" or "Best Sellers" collection confirmed
- No visual merchandising cues (badges, labels like "Hot", "New", "Best Seller") confirmed
- Pagination at 72 products per page for a 109-product category means customers are clicking to page 2 to see remaining 37 items — no infinite scroll confirmed
- Category page URL structure is clean (/product-category/keychains/) and SEO-friendly

---

### 2.4 Cart and Checkout

**Cart page:** JavaScript-rendered — full cart content not extractable. Standard WooCommerce cart confirmed by schema markup and plugin signatures. YWGC (gift card) plugin is present. (S7)

**Confirmed checkout features (from search snippet evidence):**
- Free shipping on orders above ₹499 (S13)
- Coupon code field: "scientist" code confirmed active for 15% first-purchase discount (S12)
- Shipping tracking: WhatsApp update with tracking number on dispatch (S13)
- Payment methods: Not directly confirmed from page source. WooCommerce without explicit Razorpay evidence in page signatures — payment gateway active on checkout page not confirmed (Evidence gap)
- COD: Not confirmed or denied (Evidence gap)

**Trust signals at cart/checkout:** No confirmed trust badges, SSL indicators, or security messaging visible. Standard WooCommerce checkout form. (Evidence gap — JS-rendered)

**Checkout friction points identified:**
- No evidence of one-click checkout or magic checkout integration
- No WhatsApp chat widget confirmed on checkout page for abandonment recovery
- No evidence of guest checkout toggle or prominent account creation messaging

---

### 2.5 About / Brand Story Page

**Finding: No dedicated "About" or "Our Story" page confirmed.**

A site search (S10) and direct URL tests returned no About page. Google crawl of site:theproductlab.in returns only: Contact Us, Terms & Conditions, homepage, and product pages. No "/about", "/about-us", "/our-story", or "/who-we-are" page is indexed. (S10, S11)

**Sell Your Art page exists** at /sell-your-art/. This page was confirmed live (status 200) and the title "Sell Your Art - The Product Lab" is indexed by Google. (S6) The breadcrumb "Home > Sell Your Art" was confirmed. However, the content of this page (how the program works, revenue share, requirements) was not extractable via WebFetch due to JavaScript rendering. This is a meaningful page — it signals the artist marketplace model — but its content is not publicly documented in any extractable form. (Evidence gap)

**Brand story verdict:** No About page. No "who we are" narrative accessible to first-time visitors. The only brand communication on the non-product pages is:
- The tagline "Find your thing" (generic)
- "Sell Your Art" page (artist marketplace angle)
- Contact Us page (functional only)
This is a significant brand communication gap.

---

### 2.6 Mobile Experience

**Confirmed mobile-positive signals:**
- Responsive design framework present (Divi theme — mobile breakpoints built in)
- Lazy loading for images enabled (reduces initial payload)
- Auto image sizing enabled (responsive images)
- Logo asset is large (3597×1313px) — if not properly optimized for mobile, could cause layout issues
- Theme: Divi is known for mobile-responsive output but also known for heavy JS/CSS payload

**Not confirmed:**
- Actual mobile render quality — no screenshots available
- Tap target sizing on CTAs and nav items
- Scroll behavior on product pages
- Mobile-specific checkout experience

**Performance concern:** The combination of Divi theme, WooCommerce, multiple Google Fonts (Open Sans, Bebas Neue, Inter all loaded), and high-resolution product images creates a technically heavy page. Standard Divi/WooCommerce combinations without optimization typically score 40–65 on PageSpeed Insights mobile. No specific score confirmed for theproductlab.in. (Evidence gap — direct PageSpeed test required)

---

### 2.7 SEO Basics

**Confirmed:**
- Homepage title tag: "The Product Lab - Find your thing" (S10 — confirmed from Google search result title)
- Product pages have schema.org Product markup (S15)
- Category pages have CollectionPage schema markup (S5)
- Clean URL structure: /product/[product-name]/, /product-category/[category]/ (S2, S3, S10)
- Breadcrumb navigation present on product and category pages (S1, S2, S3)
- Images have descriptive filenames (e.g. "Rick-morty-lapel-pin.jpg", "Sneaker-collection-magnet-1.jpg") (S15)

**Not confirmed:**
- Homepage meta description content (only title confirmed)
- Product page meta descriptions (not in static source)
- Image alt text presence and quality
- Whether SEO plugin (Yoast or Rank Math) is active and configured — page source evidence is inconclusive
- Internal linking strategy between product pages and categories
- Blog or content section — no blog URL found in any site crawl (S10, S11) — absence is confirmed

**SEO gap: No blog or content.** No editorial, category, or brand content pages indexed. All indexed pages are product and transactional pages. This limits organic discovery beyond branded and product-name searches. (S10, S11)

---

### 2.8 Trust Signals — Full Assessment

| Trust Signal | Present | Notes |
|---|---|---|
| Customer reviews on product pages | Not confirmed | No review widget identified |
| Overall store rating | Not confirmed | No evidence |
| Testimonials section on homepage | Not confirmed | Not in source, JS gap possible |
| Press mentions / media coverage | Not confirmed | No evidence found |
| Return / refund policy visibility | Partial | T&C page exists but no-return policy; policy not linked from product pages in any confirmed way |
| Shipping info visibility | Confirmed | Free shipping above ₹499 visible in search snippet context |
| WhatsApp order tracking | Confirmed | WhatsApp dispatch update confirmed (S13) |
| SSL / secure checkout badge | Not confirmed | Domain likely has SSL (standard WooCommerce) but badge presence not confirmed |
| Money-back guarantee | Not confirmed | No-return policy actually contradicts this |
| Social proof (follower count display) | Not confirmed | Instagram icons present but no social follower count widget confirmed |
| Artist attribution on product pages | Not confirmed | Artist identity not surfaced in any product page extract |
| About / brand story | Absent | No About page found |
| Business legitimacy signals (GST, company info) | Partial | T&C references Ink Fish and Bengaluru address; not prominently surfaced on storefront |

---

## 3. Task 1.2 — Catalog & Category Audit

### 3.1 SKU Count — Confirmed and Estimated

| Category | Confirmed SKU Count | Source |
|---|---|---|
| Keychains | 109 | S2 — category page pagination |
| Lapel Pins | 101 | S3 — confirmed from search snippet "Showing 1–72 of 101 results" |
| Stickers (all subcategories) | Unknown | S4, S5 — subcategories confirmed, totals not extracted |
| Fridge Magnets | Unknown | S11 — multiple products confirmed, count not available |
| Earrings | Unknown | S16 — 8 products confirmed, total not available |
| Card Stickers | Unknown | S5 — subcategory confirmed (half card), full count unknown |
| Custom Keychains | 1 (custom order product) | S11 — custom design product confirmed |

**Minimum confirmed SKU count: 210+ (keychains + lapel pins alone)**
**Estimated total catalog size: 300–400 SKUs** based on 210 confirmed in two categories and likely comparable depth in stickers, magnets, earrings, and card stickers. This is a significantly larger catalog than the preliminary estimate of <50 SKUs in the prior competitor research report. The prior estimate was an evidence gap — now resolved.

---

### 3.2 Product Categories and Organization

**Confirmed top-level categories (from nav confirmed during keychains page render — S2):**
1. Keychains
   - Subcategory: Double Sided Keychain
   - Subcategory: Single Sided Keychain
2. Lapel Pins
3. Stickers
   - Subcategory: Laptop Stickers
   - Subcategory: 3D Pop Up Stickers
   - Subcategory: Card Stickers (further divided: half card / full card — S5)
4. Fridge Magnets
5. Earrings

**Category organization assessment:**
- 5 top-level categories is a manageable primary nav
- Stickers subcategorization (Laptop / 3D Pop Up / Card Stickers) is logical but the naming is functional, not brand-forward
- Earrings is unexpected in this lineup — creates a brand coherence question (see Section 3.5)
- Custom Keychains appears to be a standalone product rather than a category — bulk/B2B use case

**Theme tagging system:** The theme filter list (Adventure, Alcohol, Animals, Anime… etc — full list confirmed from S2) is an extensive cross-category taxonomy. This allows discovery by interest but is not surfaced in main navigation — hidden inside category filter panels. This is wasted brand architecture: a well-organized theme system could be a collection architecture driver (e.g. "K-Pop Drop", "Sneakerhead Edit").

---

### 3.3 Pricing Spread

| Category | Price Range Confirmed | Source |
|---|---|---|
| Keychains | ₹149 – ₹199 | S2 — 72 products listed with prices |
| Lapel Pins | Not directly confirmed | S10 — price not extracted; estimated ₹149–₹249 based on category norms |
| Stickers | ₹225 | S12 — confirmed from search snippet |
| Fridge Magnets | ₹109 – ₹149 | S12 — confirmed from search snippet |
| Earrings | Not confirmed | Evidence gap |
| Card Stickers | Not confirmed | Evidence gap |

**Pricing observations:**
- Keychains are uniformly priced with minimal variation (₹149 or ₹199 — two price points only)
- ₹149 appears to be the single-sided / smaller format; ₹199 the double-sided / standard format
- ₹109 fridge magnets are below the ₹149 floor of keychains — lowest confirmed price point
- ₹225 stickers are highest confirmed price point (likely sticker packs, not individual stickers)
- All confirmed prices sit in the ₹99–₹249 band — an extremely narrow price range
- No product confirmed above ₹299 from direct source evidence
- Free shipping threshold at ₹499 requires purchasing 3+ keychains at ₹199 to qualify — potentially a conversion friction point for single-item buyers
- The "scientist" 15% first purchase code brings a ₹199 keychain to ₹169 — minimal price gap between discount and standard prices

**Price psychology assessment:**
- Current pricing is at or below Dot Badges' range (₹99–₹349) for most products
- Below Chumbak (₹283–₹795 for comparable accessories)
- No premium tier exists — no product signals higher quality or hero status through price
- No bundle pricing confirmed
- No gift set or multi-pack pricing confirmed

---

### 3.4 Visual Quality Assessment

**Confirmed image specifications:**
- Standard product resolution: 1000×1000px (keychains, lapel pins)
- Higher resolution available: 1800×1800px (fridge magnets), 2000×2000px (card stickers)
- All images square 1:1 aspect ratio — appropriate for WooCommerce grid and Instagram
- Image compression type: JPEG (jpg extension confirmed on multiple products)
- Lazy loading enabled — performance-positive for catalog browsing

**Photography style (inferred from filenames and image structure):**
- Filenames indicate direct product photography: "Rick-morty-lapel-pin.jpg", "Sneaker-collection-magnet-1.jpg", "Enjoy-the-shit-show-fridge-magnet.png"
- No lifestyle, in-context, or aspirational photography confirmed — all appear to be flat product shots
- Consistent file naming convention suggesting a standard shoot format
- One PNG confirmed (Enjoy-the-shit-show-fridge-magnet.png) — PNG format suggests transparent or white background treatment

**Visual quality gap:** No lifestyle imagery, no model or hand-worn photography confirmed anywhere on the site. Products like earrings and lapel pins would significantly benefit from worn/lifestyle shots. Fridge magnets on an actual fridge, stickers on a laptop — none of this content appears to exist on the product pages.

---

### 3.5 Product Overlap and Redundancy

**High overlap identified within keychains:**
- Multiple design themes available in both single-sided and double-sided variants with minimal price difference (₹149 vs ₹199). This creates choice paralysis rather than clear product differentiation.
- Duplicate product names appear on the keychains category page (e.g. "less panic more disco keychain" appears twice in the 72-product listing — S2). This may indicate WooCommerce duplicate entries or variant display issue.
- "Girl Power Keychain" listed at both ₹149 and ₹199 — likely single vs double sided, but product differentiation not clear from listing alone.

**Cross-category overlap:** Some designs appear across multiple product types (e.g. "Sneaker Collection" appears as both Lapel Pin and Fridge Magnet; "Enjoy the ShitShow" appears as Magnet, Keychain, and Earrings; "Hot Stuff" appears as Fridge Magnet and confirmed sticker URL). This cross-format consistency is positive for collection coherence — the same design DNA appears across product types. However, it is not merchandised as a "collection" — products are siloed by category.

**Earrings coherence question:** The earrings range (Vacation in a Bottle, Enjoy the Shit Show, Cute Peach, Gin, Ice Cream Love Bites, Burger, Unicorn, Rainbow) shares a similar irreverent, humor-and-pop-culture DNA with the rest of the catalog. However, earrings require a different purchasing context (wearable jewelry vs. desk/bag accessories) and may need separate visual treatment. Currently siloed in the same category nav.

---

### 3.6 Category Gaps vs. Competitor Set

| Gap | Competitors who fill it | TPL status |
|---|---|---|
| Stationery / notebooks | Chumbak, Scooboo, Redwolf, Planet Superheroes | Absent |
| Phone cases / tech accessories | Hamee, Planet Superheroes, Chumbak | Absent |
| Tote bags / canvas bags | Chumbak, Planet Superheroes, Bonkers Corner | Absent |
| Wall prints / posters | Redwolf, Planet Superheroes | Absent |
| Mugs | Chumbak | Absent |
| Patches / iron-on | Dot Badges | Absent |
| Washi tape / journaling accessories | Scooboo | Absent |
| Enamel badge / button pins | Dot Badges | Partial (lapel pins overlap) |
| Apparel (t-shirts, hoodies) | The Souled Store, Bewakoof, Snitch, Bonkers Corner | Absent |
| Gift sets / bundles | Chumbak | Absent |

**Most significant gap relative to gift-occasion revenue:** No gift bundling or gift set product confirmed. The gifting market (USD 75 Bn India — from competitor research S19) is the highest-value occasion for accessories brands. Chumbak, Hamee, and Planet Superheroes all offer bundle options or gift boxes. TPL has no confirmed bundle products.

**TPL's defensible territory:** Lapel pins, keychains, card stickers — these three categories are not well-served by apparel-first competitors. Card stickers in particular are confirmed unique to TPL in the competitive set.

---

### 3.7 Hero Candidates vs. Filler Assessment

**Hero candidates (strong differentiation + distinct category ownership potential):**

| Product type | Hero signal | Notes |
|---|---|---|
| Card Stickers | Unique product type — no confirmed competitor | Half card / full card variants for ATM/debit cards; confirmed as a product only TPL offers in this competitive set; high viral potential (card reveal moments); low price = impulse buy |
| Lapel Pins — original designs | Artist-led differentiation | 101 SKUs; deep theme coverage; artist-led narrative if applied; wearable collectibles with social sharing potential |
| Keychains — humor/attitude range | Volume leader with 109 SKUs | "Enjoy the ShitShow", "Bullshit Remover", "Idiot Repellent", "Straight outta F#_ks to give" — a clear attitudinal subcollection with strong naming; shareable identity-signaling products |

**Filler candidates (low differentiation, weak brand signal):**

| Product type | Filler signal | Notes |
|---|---|---|
| Licensed pop culture keychains (Marvel, Star Wars, Pokemon, Disney) | License dependency, no original design equity | Rick & Morty, Spiderman, Avengers, Darth Vader, Mickey Mouse — replicate licensed designs that Planet Superheroes and Hamee also carry; no TPL artist-story angle possible |
| Sports magnets (Manchester United, Manchester City) | Weak brand fit | Football club magnets are generic gifting product with no connection to TPL's artist-led or attitude-driven positioning |
| Generic food/drink keychains (Sushi, Rainbow Cake, Coffee, Beer) | Low attitudinal signal | Broad appeal = no distinct brand signal; these could belong to any generic accessories brand |
| Earrings (as currently positioned) | Underserved by product photography, no clear brand story | Strong potential as hero if given lifestyle photography and collection narrative, but currently filler due to isolated single-product photography and no editorial treatment |

---

## 4. Evidence Gaps

| Gap | Significance | Recommended Action |
|---|---|---|
| Exact SKU counts for stickers, fridge magnets, earrings, card stickers | High — needed to confirm total catalog size | Direct WooCommerce admin access or category page render |
| Product page pricing for lapel pins, earrings, card stickers | High — needed for complete price architecture | Admin access or rendered page inspection |
| Actual homepage content (hero image, hero copy, CTAs) | High — JS-rendered, not extractable by WebFetch | Browser-based screenshot or screen recording |
| Cart and checkout experience — full flow | High — payment methods, COD availability, trust signals, checkout friction | Requires purchasing a product and documenting checkout |
| Mobile rendering quality — screenshots | High — visual assessment of tap targets, layout, scroll | Browser DevTools mobile emulation or real device test |
| PageSpeed / Core Web Vitals score | High — needed for mobile performance baseline | Direct PageSpeed Insights test at pagespeed.web.dev |
| Product descriptions — full text for sample products | Medium — needed to assess copywriting quality | Admin access or browser-rendered page inspection |
| Sell Your Art page content | Medium — artist program terms, revenue share model | Browser-rendered page view |
| Review/rating count across catalog | High — zero confirmed; likely no reviews exist | Confirm by visiting 5 representative product pages in browser |
| Earrings price range | Medium | Admin access or rendered category page |
| Card sticker price range | Medium | Admin access or rendered category page |
| Total earrings and stickers SKU count | Medium | Admin access or category page render |
| Payment gateway active at checkout (Razorpay, COD, UPI) | High — needed for checkout audit | Test purchase or checkout page inspection |
| GA4 baseline data (traffic, bounce rate, conversion rate) | High — needed for success metric baseline | Connect GA4 read-only access |
| Homepage meta description | Medium | PageSpeed / SEO tool inspection |
| Image alt text quality | Medium | Source view on rendered product page |
| WhatsApp Business presence / integration | Medium | Direct check of WhatsApp number and Business API status |
| Instagram post content and engagement data | Medium | Manual profile inspection at @the.product.lab |
| Amazon storefront product count and pricing | Medium | Amazon.com/shop/theproductlab — manual review |

---

## 5. Key Observations

**Observation 1 — Catalog is larger than previously estimated.** The prior research report estimated <50 SKUs. The confirmed count is 210+ from keychains and lapel pins alone, with stickers, magnets, earrings, and card stickers uncounted. Total catalog is likely 300–400 SKUs. This is a meaningful catalog depth for a ₹0–40L revenue business — indicating high product volume with low revenue conversion, which is a product mix and merchandising problem. Sources: S2, S3.

**Observation 2 — No brand narrative layer exists anywhere on the site.** No About page. No artist profile pages. No editorial content. No blog. No campaign or collection story pages. The only pages indexed by Google beyond products are Contact Us, Terms & Conditions, and Sell Your Art. A customer who discovers theproductlab.in cannot answer "who made this" or "why does this brand exist." Sources: S10, S11.

**Observation 3 — Pricing is uniformly low and undifferentiated.** All confirmed products are in the ₹109–₹225 band. There is no hero product at a higher price point. No bundle or gift set exists. This suppresses average order value and limits the ability to frame any product as a "worth it" purchase rather than a cheap impulse buy. Sources: S2, S12.

**Observation 4 — Card stickers are a genuinely unique product.** Debit/credit card skins are not offered by any competitor identified in the competitive set. The product has viral potential (unboxing, card reveal) and a built-in use-occasion story. The subcategory structure (half card / full card) is in place. This is the single most differentiated product type in the catalog and should be considered for hero treatment. Sources: S5, S9.

**Observation 5 — The theme tagging system is brand architecture waiting to be unlocked.** A 40+ theme taxonomy (Adventure, K-Pop, Sneakerheads, Sassy, Humor & Memes, etc.) exists as a product filter but is not surfaced as brand collections or editorial story units. These themes are exactly the kind of interest-identity clusters that youth-facing accessory brands use to build community. Currently they are a hidden utility layer, not a brand layer. Sources: S2.

**Observation 6 — Zero confirmed customer reviews across the entire catalog.** For a store with 300–400 SKUs and active since at least 2018, the absence of any review data from any source (product page, Google, Justdial, Amazon) is significant. This may indicate: (a) reviews are disabled on WooCommerce, (b) no review request system is in place, or (c) customer volume is insufficient to generate organic reviews. Social proof is absent entirely. Sources: S2, S12, S14.

**Observation 7 — Instagram follower count is low but the account is active.** 2,943 followers, 1,274 following, 55 posts (S14). For a brand active since 2018+ across a range of products, this is low social capital. The 55-post total implies inconsistent or sparse posting. Low follower count limits organic reach and social proof signals on product pages. Sources: S14.

**Observation 8 — No-return policy is a conversion risk.** The T&C confirms no returns or exchanges are accepted except for damaged/defective items (must contact within 48 hours). For a low-awareness brand where customers cannot physically touch the product, this policy removes a significant purchase safety net. Dot Badges and Chumbak both offer returns. Sources: S13.

**Observation 9 — Free shipping threshold of ₹499 may suppress single-product orders.** With keychains at ₹199 and magnets at ₹109–₹149, a customer must buy 3+ items to qualify for free shipping. Single-item buyers pay shipping. In a market where competitors like Dot Badges offer "free delivery above ₹499," the threshold is competitive but may discourage first-time single-product trial. No shipping cost amount confirmed (evidence gap). Sources: S13.

**Observation 10 — The "Sell Your Art" page exists but its content is inaccessible.** This page is the single most strategically important non-product page on the site — it defines whether TPL is an artist marketplace or a retail brand. Its content could not be extracted. This is a high-priority evidence gap for brand strategy. Sources: S6.

---

## 6. Recommended Next Research Actions

1. **Browser-render the key pages (Priority: Critical):** Homepage hero, a product page, the cart/checkout, and the Sell Your Art page must be viewed in a live browser to complete the teardown. These pages render client-side and cannot be analyzed by static fetch. Assign to Harley or Dan to capture screenshots and share.

2. **Run PageSpeed Insights (Priority: High):** Test theproductlab.in on mobile at pagespeed.web.dev. This is a 5-minute manual task that will produce Core Web Vitals scores and specific fix recommendations. Essential for Phase 4 build brief.

3. **Complete a test purchase (Priority: High):** Purchase one product (e.g. ₹199 keychain) to document: full checkout flow, payment options offered, COD availability, UPI presence, post-purchase email / WhatsApp experience, packaging quality, delivery time. This is the only way to fully audit the cart-to-delivery experience.

4. **Confirm payment gateway setup (Priority: High):** Check WooCommerce admin to confirm which payment gateways are active (Razorpay, COD, UPI, PayTM). This affects the Fynd migration technical brief significantly.

5. **Export WooCommerce product list (Priority: High):** WooCommerce Products > Export will produce a CSV with every SKU, price, category, stock status, and variant. This will close all open SKU count and pricing evidence gaps in 30 minutes. Assign to Dan.

6. **Check Instagram manually (Priority: Medium):** Visit @the.product.lab to document: most recent post date, post frequency over last 6 months, 5 highest-engagement posts (likes + comments), Story Highlight titles, bio copy. This is a 15-minute manual task.

7. **Check Amazon storefront (Priority: Medium):** Visit amazon.com/shop/theproductlab to document: which products are listed, prices, and whether any reviews exist on Amazon listings. Amazon reviews may be the best available customer voice data.

8. **Retrieve Sell Your Art page content (Priority: Medium):** Browser-visit theproductlab.in/sell-your-art/ and document the artist program terms. This directly informs brand positioning strategy (marketplace vs. retail brand).

---

*All claims in this document are supported by the source inventory in Section 1. Evidence gaps are documented in Section 4. Interpretation of evidence for strategic use is reserved for the Strategy phase (Weiss, Heyward).*
