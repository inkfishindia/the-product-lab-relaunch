# TPL Brand Tokens

> Source of truth for all design tokens. Use these values everywhere — Figma, CSS, Canva, Fynd theme.

## Colors

```css
:root {
  /* Core Palette */
  --tpl-black:  #1A1A1A;   /* Primary background */
  --tpl-white:  #F5F0EB;   /* Warm white — primary text, light surfaces */
  --tpl-red:    #E63B2E;   /* Signal red — CTAs, accent, alerts */
  --tpl-yellow: #F2D024;   /* Electric yellow — highlights, tags, energy */

  /* Supporting */
  --tpl-gray-dark:  #2D2D2D;   /* Slightly lifted black — cards, nav */
  --tpl-gray-mid:   #6B6B6B;   /* Secondary text on dark */
  --tpl-gray-light: #D4CFCA;   /* Muted elements on white */
  --tpl-off-white:  #FAF7F3;   /* Alt background — slight warmth */
}
```

## Typography

```css
/* Display — Headlines, product names, section titles */
font-family: 'Barlow Condensed', sans-serif;
font-weight: 700 | 800 | 900;
text-transform: uppercase;

/* Body — Descriptions, UI text, captions */
font-family: 'Inter', sans-serif;
font-weight: 400 | 500 | 600;
```

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

## Spacing Scale

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-6:  24px;
--space-8:  32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
```

## Border Radius

```css
--radius-sm: 2px;    /* Sharp — preferred for most elements */
--radius-md: 4px;    /* Slight round for buttons */
--radius-lg: 8px;    /* Cards */
--radius-pill: 999px; /* Tags, badges */
```

## Logo Expressions

Three approved lockups — never create variants without Sean's approval.

1. **Wordmark** — `THE PRODUCT LAB` in Barlow Condensed 900 uppercase
2. **TPL Monogram** — Compact 3-letter mark
3. **Tagline Lockup** — Wordmark + `Wear your opinion.` in Inter 400

### Logo Colors

| Background | Logo Color |
|-----------|------------|
| Dark (#1A1A1A) | Warm white (#F5F0EB) |
| White/Light | Off-black (#1A1A1A) |
| Red (#E63B2E) | Warm white (#F5F0EB) |
| Yellow (#F2D024) | Off-black (#1A1A1A) |

## Photography Direction

- **Background:** Dark — black posterboard or dark wall. No light backgrounds.
- **Lighting:** Dramatic, directional. One strong light source.
- **Products:** Centered, clean. Let the product speak.
- **Props:** Minimal. Hands OK. No fake lifestyle clutter.
- **Format:** Square (1:1) for Instagram. 4:5 for IG feed. 16:9 for headers.
- **Phone camera:** Acceptable for launch. No need for DSLR.

## Approved Taglines

- Primary: **"Wear your opinion."**
- Extended: **"Small objects. Big opinions."**
- Campaign: **[see artifacts/phase-5/launch-narrative.md]**
