<!-- last-updated: 2026-06-13 -->
# Drop 1 Merchandising Curation

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build |
| **Producing Agent** | Harley (Program Director, on behalf of Jenna/Andy scope) |
| **Date** | 2026-06-13 |
| **Status** | draft |
| **Reviewer** | Dan |

> Governs: D-028 (curation rules), interpreting D-020 (Drop 1 = text opinion), D-011 (accessories only), D-019 (Find. Collect. Gift.).
> Machine plan + reproducible classification: `artifacts/phase-4/catalog-curation/` (`drop1-plan.json`, `catalog-export-raw.tsv`, `curate-drop1.py`).
> Pre-change DB snapshot (reversible): `artifacts/phase-4/catalog-curation/backup-products-pre-drop1.csv`.

---

## What this pass did

Took the raw 502-product WooCommerce import (live in Medusa, all previously published, uncurated) and brought it to a curated launch state:

| Action | Count |
|--------|-------|
| **Published — Drop 1** (text-opinion designs, deduped, cleaned titles, in collections) | **67** |
| Draft — licensed IP (held for licensing review, excluded from launch) | 178 |
| Draft — object/illustration (no opinion; backlog) | 104 |
| Draft — duplicate variants of a published design (backlog) | 153 |
| Deleted — Medusa starter-seed demo apparel (D-011 junk) | 4 |

End state in Medusa: **67 published / 435 draft / 5 collections live.** Verified via DB and the `/store/collections` commerce API (Soft Serve returns its 17 products through the API).

---

## Collection structure (the merchandising spine)

Five mutually-exclusive Drop 1 collections (Medusa products carry a single `collection_id`, so membership is exclusive by design). Each is a giftable, collectible "mood set" — serving Find → Collect → Gift.

| Collection | Theme | Count |
|---|---|---|
| **Certified Disaster** | Burnout, chaos, self-deprecation — the group-chat villain era | 21 |
| **Soft Serve** | Love, wellness, wander, soft-with-edge | 17 |
| **Big Mood** | Everything-else attitude / one-liners | 10 |
| **Main Character Energy** | Confidence, flex, main-character one-liners | 10 |
| **Cat & Dog People** | Pet-person identity (gifting gold) | 9 |

Full per-product membership (by Medusa product id) is in `drop1-plan.json → publish[]`. Published titles by collection are listed at the bottom of this doc.

---

## Curation rules applied (D-028)

1. **Licensed IP → draft, never published.** Any recognizable brand, sports club, character, band, film/TV/anime/game IP (Nike, Star Wars, Disney/Marvel, Coca-Cola, football clubs, K-pop, Pokémon/Naruto, Brooklyn 99, Rolling Stones, the Adobe suite, etc.). Conservative call: when in doubt, treated as licensed. **These need a licensing review before any future drop** (see backlog flag below).
2. **Drop 1 = text-opinion designs across ALL accessory types** (magnets, keychains, pins, stickers, earrings) — not limited to sticker categories. A product qualifies if it *says something with attitude*, not merely depicts an object.
3. **Pure object/illustration → draft backlog.** Plain food/animal/aesthetic designs (Sushi, Coffee, Unicorn, Pancake, Cute cat…) with no opinion.
4. **Dedup to one canonical SKU per opinion.** The same slogan imported across multiple product types / import batches was collapsed to one published SKU; the rest stay draft. (Day-2: re-model these as product *variants* rather than separate SKUs.)
5. **Title cleanup:** stripped trailing category noise ("…Fridge magnet"), fixed HTML entities (`&amp;`→`&`) and typos (Everthing→Everything, repelent→Repellent), normalized to **sentence case** (on-brand group-chat register), preserving deliberate acronyms (AF, WASD).

### Classification corrections over the keyword first-pass
The auto keyword pass was ~75% right; merchandising overrides included: pulling licensed leaks into draft (Rolling Stones, Donald Duck, Pokéball, Gameboy, Polaroid, SNKRS/High AF1 = Nike, Brooklyn 99 "Nine Nine"/"Title of my Sex Tape", Adobe Photoshop/Illustrator/After Effects/Premiere); reclassifying object-looking opinions as Drop 1 ("Everything Sucks Mixtape", "Coffee made my day", "Give into beer pressure"); and moving cutesy non-opinions to object (Cute cat, Sushi love, Travel backpack, Bunny, Paw).

---

## Open flags for Dan

1. **Licensing review backlog (HIGH).** 178 products are held in draft because they use third-party IP. The old catalog already flagged football-club magnets as a licensing risk. Decision needed before Drop 2 / artist platform: pull permanently, license, or replace with original designs. None are on the live store now.
2. **~6 residual near-twins** survived auto-dedup because their design text differs slightly — quick manual merge candidates: "Enjoy shitshow" / "Enjoy the shit show"; "Straight outta F#cks" / "…to give"; "Warning feeling may arise" / "feelings may arise"; "Beer pressure" / "Give into beer pressure" / "I give into beer"; "Boy tears" / "Premium boy tears". "Straight outa" looks like a truncated source title — worth checking.
3. **Product images still hotlinked** from `theproductlab.in/wp-content/...` (pre-existing, parked) — must be ported to CDN before launch. Not a curation issue.
4. **25 published products had empty descriptions** at import; several Drop 1 winners need PDP copy (Dan's copy fast-start template covers the hero SKUs).
5. **Drop 1 size = 67.** Tight and on-brand. If you want a bigger launch wall, the fastest lever is promoting strong object/illustration designs (the 104 draft) — but that dilutes the "opinion-first" position. Recommend holding at 67.

---

## Published Drop 1 by collection

See DB / `drop1-plan.json` for ids. Titles (cleaned):

**Certified Disaster (21):** Always hungry · Always tired · Boy tears · Bullshit remover · Camping lighter · Crystal bullshit · Enjoy shitshow · Enjoy the shit show · Everything sucks mixtape · Fierce lighter · Forever alone · Idiot repellent · Monday morning · Premium boy tears · Professional binge watcher · Shit happens · Straight outta F#cks · Straight outta F#cks to give · Warning feeling may arise · Warning feelings may arise · World on fire

**Soft Serve (17):** All we need is love · Beer pressure · Coffee made my day · Explore more · First we eat · Give into beer pressure · Heart breaker · Ice cream love bites · Less panic more disco · Love bites · Self love sauce · Serotonin spray · Take me out · Travel backpack · Vacation in a bottle · Vitamin sea · World in a bottle

**Big Mood (10):** Chill pill · Don't stress meowt · Girl power · Hang on let me overthink · I give into beer · Munchies · No · Smokers access · Straight outa · WASD

**Main Character Energy (10):** Bibliophile · Boss babe · Hot stuff · Insta like · Noice · Rich AF · Shut up & take my money · Sneaker collection · Suck it · Watch me whip

**Cat & Dog People (9):** Always sleepy cat club · Cat fish bowl · Cat yin and yang · Crazy cat lady · Dog approved · Dogs go woof · Easily distracted by dogs · Sleepy cat · Woof woof
