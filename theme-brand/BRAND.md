# slidev-theme-brand

The Slidev theme for Davide Imola's talks, built on the personal brand.

**The source of truth is the brand repo: [davideimola/brand](https://github.com/davideimola/brand)**, in particular [`docs/brand.md`](https://github.com/davideimola/brand/blob/main/docs/brand.md) (read its Slides section first), `tokens/tokens.json` and `assets/svg/`. This file only explains how the theme applies it. When the two disagree, the brand repo wins: fix the theme.

## How the brand gets in

- `@davideimola/brand` is a dependency of this package (`github:davideimola/brand`). The theme imports `@davideimola/brand/tokens.css` and uses the `--di-*` custom properties everywhere. No colour or size in the theme should be a raw value when a token exists.
- The mark and the wordmark are the SVG files from `@davideimola/brand/assets/svg/`, used through `<BrandMark>` and `<Wordmark>`. They are never redrawn or typeset.
- To pick up a brand change: `pnpm --filter slidev-theme-brand update @davideimola/brand`, then check `example.md`.

A few slide-only values are not brand tokens yet and live in `styles/vars.css`: the meta text colour, the progress bar colours and the darker code keyword red (see Projection). They should become tokens in the brand repo.

## Rules the theme enforces

- **Always light.** `colorSchema: light`, and the light token values are pinned even when the OS is dark.
- **Red is for the knot, the marker and code keywords.** Nothing else: callouts, badges, stats, links at rest, terminal windows are ink and hairlines. Code keywords use a darker akane (`#A8192E`); the knot and the marker keep `#C91F37`.
- **Canvas 1280 x 720.** Body text 28px at weight 500, code at least 22px at weight 500, titles 700. No text on a slide below 18px.
- **At most 14 lines of code per slide.** The `split-code` column fits about 54 columns at 22px; `two-cols` about 37. Longer lines wrap instead of clipping; treat a wrap as a cue to cut, never shrink the code.
- **One marker per slide**, on the word that matters most.
- **One tape per block**, never stacked; the tilt alternates (-1deg, 1deg, -0.5deg).
- **No git-graph decoration** anywhere except the mark.
- **Copy in English, no em dashes.**

## Projection

Slides are read through projectors that wash colours out. The theme checks contrast with a simple model, projected luminance = luminance * 0.8 + 0.06, and tunes the slide-only values in `styles/vars.css` against it:

| Element | Before | After |
|---------|--------|-------|
| Meta text (h6 kicker, page counter, captions, labels, urls) | slate `#5B6070`, 15-16px: 5.75:1, 4.12:1 projected | graphite `#3B4152`, 18px: 9.34:1, 5.51:1 projected |
| Progress bar, part ahead | `#C9C7C0`: 1.55:1, 1.48:1 projected | ash `#8E8C86` at 2px: 3.09:1, 2.63:1 projected; the part done is a 5px ink line |
| Code keywords on white | `#C91F37`: 5.62:1, 4.15:1 projected | `#A8192E`: 7.39:1, 4.95:1 projected |
| Callout and browser frame edges | rule `#DEDCD5`: 1.26:1 | 2px ink: 14.54:1, 6.83:1 projected |

Thin strokes bloom away on bright projectors, so body and code are set at weight 500 (Schibsted Grotesk is variable; code is IBM Plex Mono Medium). Schibsted Grotesk stays the sans: it has the tallest x-height of the candidates measured (0.527, against 0.516 for IBM Plex Sans and 0.496 for Atkinson Hyperlegible Next), and code in Plex Mono already separates `Il1` and `0O`.

**Reading distance.** Comfortable reading needs roughly 7 mm of cap height per metre of distance. On a screen 2.5 m tall (the 720px canvas):

| Text | Size | Reads to about |
|------|------|----------------|
| Titles | 60px | 21 m |
| Body | 28px | 10 m |
| Code | 22px | 7.5 m |

For rooms where the back rows sit past 10 m, put the code on `code-hero` (24px) or show fewer lines.

## Fonts

Loaded from Google Fonts through the theme's `fonts` defaults:

| Role | Family | Use |
|------|--------|-----|
| sans | Schibsted Grotesk | titles and running text |
| mono | IBM Plex Mono | code, meta, page counter, small labels |
| label | Barlow Condensed 700, caps | tape only |

## Slide anatomy

- **Title (`cover`)**: tape with the `event`, display title with one `<Marker>`, L mark top right, hairline, regular wordmark and `role` at the bottom. No footer.
- **Content slides**: section tape, title, content, and the footer.
- **Footer**: one row, S mark and bold wordmark | progress bar | current section name | page counter. It reads the slide's own page, so it is right in PDF and PNG exports too.
  - **Progress bar**: one segment per section, each as long as its share of the slides, 12px apart; slides before the first section belong to the first segment. Up to the current slide it is a 5px ink line with round caps, the rest a 2px ash line; finished sections are all ink. The red knot (16px, 3px radius) marks the current slide.
  - **Section name**: the current section's `label` in IBM Plex Mono 18px ink, capped at 300px with an ellipsis (full text on hover). None before the first section.
  - **No overlap by construction**: the bar is the only flexible item (min 240px), the name is capped, the counter (18px graphite, tabular numbers) never wraps and keeps 24px from the name.
- **Section tape**: inherited from the last `section` slide's `label` (write it as `"03 · agents"`, the tape sets it in caps). Override per slide with `tape: "..."`, hide with `tape: false`.
- **End (`end`)**: thanks, `links`, up to two QR codes (`qr` for links, `feedback` for the talk rating), the event tape and the wordmark.

## Layouts

| Layout | Use |
|--------|-----|
| `cover` | Title slide. Frontmatter: `event`, `role` |
| `intro` | Speaker intro: grayscale portrait with a tape, `<WhoAmI />`, socials. Frontmatter: `introImage`, `github`, `bluesky`, `linkedin` |
| `section` | Section opener. Frontmatter: `label` (becomes the tape on the following slides, the section name in the footer and a segment of the progress bar) |
| `default` | Tape, title, content |
| `two-cols` | Title and content left, `::right::` column |
| `two-cols-header` | Title across, then `::left::` and `::right::` |
| `split-code` | Text left (h6 kicker, title, 2-4 lines), code right at full height |
| `code-hero` | The code is the protagonist; only an h6 kicker above it |
| `terminal` | A terminal window; the command goes in `title` |
| `statement` | One sentence, display size, one `<Marker>` |
| `fact` | One huge number in ink and its label |
| `quote` | Large quote with a small ink square; the next line is the attribution |
| `center` | Centered content |
| `image-left`, `image-right` | Image beside text. `image`, and `grayscale: true` for portraits |
| `end` | Closing slide. Frontmatter: `event` (falls back to the cover's), `links`, `qr`, `qrLabel`, `feedback`, `feedbackLabel`, `role` |

## Components

| Component | Use |
|-----------|-----|
| `<Marker>word</Marker>` | The rough red skip-ink stroke. Draws itself once on first view, static in exports and with reduced motion |
| `<Tape :n="0">label</Tape>` | Flat ink tape; `n` picks the tilt step, `tilt` forces an angle, `inverse` gives paper tape with an ink outline for ink blocks |
| `<BrandMark :size="26" />`, `<Wordmark bold />` | Brand assets from the package; the mark picks its cut by size |
| `<Callout type="note\|tip\|warning\|danger" label>` | A block that stands out: white surface, 2px ink border, a flat tape on the top-left edge (the type, or `label`), body 28px in ink. `tip` on linen, `warning` with a 3px border, `danger` inverted (ink block, paper text and tape). Never red |
| `<Badge type="default\|accent\|success\|warning">` | Small mono label; `accent` is filled ink |
| `<Chat>`, `<ChatBubble user>` | Chat mockup: user in ink, model on white |
| `<Rungs :active="2" />`, `<RungBadge :n="1" />` | Step indicator, active step in ink |
| `<Ladder>`, `<LadderRung :n title>` | Vertical list of steps split by hairlines; `compact` for one line per rung |
| `<StatGrid>`, `<Stat value source>` | Big numbers in ink under a rule |
| `<QRCode>`, `<QRBlock>` | Ink on paper QR code, the block adds a mono label |
| `<BrowserFrame url bodyBg>` | Screenshot frame: 2px ink border, hard offset shadow, 44px linen bar with three ink-outlined dots and the url in a white field. Images fill the body edge to edge |
| `<DrawnSvg src alt steps />` | A drawing from `public/` that draws itself with the brand's `draw` module: ink traces in, red lands last. With `steps`, each `<g data-step="n">` draws on click n (0 on enter; set `clicks:` in the frontmatter). Drawn in exports and overview |
| `<WhoAmI />` | Name and key/value facts for the `intro` layout |

The catalog with one slide per layout and component is [`example.md`](./example.md): `pnpm demo:brand` from the repo root.
