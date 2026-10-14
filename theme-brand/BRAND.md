# slidev-theme-brand

The Slidev theme for Davide Imola's talks, built on the personal brand.

**The source of truth is the brand repo: [davideimola/brand](https://github.com/davideimola/brand)**, in particular [`docs/brand.md`](https://github.com/davideimola/brand/blob/main/docs/brand.md) (read its Slides section first), `tokens/tokens.json` and `assets/svg/`. This file only explains how the theme applies it. When the two disagree, the brand repo wins: fix the theme.

## How the brand gets in

- `@davideimola/brand` is a dependency of this package (`github:davideimola/brand`). The theme imports `@davideimola/brand/tokens.css` and uses the `--di-*` custom properties everywhere. No colour or size in the theme should be a raw value when a token exists.
- The mark and the wordmark are the SVG files from `@davideimola/brand/assets/svg/`, used through `<BrandMark>` and `<Wordmark>`. They are never redrawn or typeset.
- To pick up a brand change: `pnpm --filter slidev-theme-brand update @davideimola/brand`, then check `example.md`.

Two values are not tokens yet and live in `styles/vars.css`: the progress graph line (`#C9C7C0`) and its past rings (`ash`), both from the approved code-slide mockup.

## Rules the theme enforces

- **Always light.** `colorSchema: light`, and the light token values are pinned even when the OS is dark.
- **Red is for the knot, the marker and code keywords.** Nothing else: callouts, badges, stats, links at rest, terminal windows are ink and hairlines.
- **Canvas 1280 x 720.** Body text at least 24px (26px by default), code at least 22px.
- **At most 14 lines of code per slide.** The `split-code` column fits about 52 columns at 22px; `two-cols` about 37. Longer lines wrap instead of clipping; treat a wrap as a cue to cut, never shrink the code.
- **One marker per slide**, on the word that matters most.
- **One tape per block**, never stacked; the tilt alternates (-1deg, 1deg, -0.5deg).
- **No git-graph decoration** anywhere except the mark and the footer progress bar.
- **Copy in English, no em dashes.**

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
- **Footer**: S mark and bold wordmark, the progress graph (a commit ring at each `section` slide, the red knot at the current slide) and the page counter in mono. It reads the slide's own page, so it is right in PDF and PNG exports too.
- **Section tape**: inherited from the last `section` slide's `label` (write it as `"03 · agents"`, the tape sets it in caps). Override per slide with `tape: "..."`, hide with `tape: false`.
- **End (`end`)**: thanks, `links`, up to two QR codes (`qr` for links, `feedback` for the talk rating), the event tape and the wordmark.

## Layouts

| Layout | Use |
|--------|-----|
| `cover` | Title slide. Frontmatter: `event`, `role` |
| `intro` | Speaker intro: grayscale portrait with a tape, `<WhoAmI />`, socials. Frontmatter: `introImage`, `github`, `bluesky`, `linkedin` |
| `section` | Section opener. Frontmatter: `label` (becomes the tape on the following slides and a ring on the progress graph) |
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
| `<Tape :n="0">label</Tape>` | Flat ink tape; `n` picks the tilt step, `tilt` forces an angle |
| `<BrandMark :size="26" />`, `<Wordmark bold />` | Brand assets from the package; the mark picks its cut by size |
| `<Callout type="note\|tip\|warning\|danger">` | Boxed aside, types differ by label and border weight, not colour |
| `<Badge type="default\|accent\|success\|warning">` | Small mono label; `accent` is filled ink |
| `<Chat>`, `<ChatBubble user>` | Chat mockup: user in ink, model on white |
| `<Rungs :active="2" />`, `<RungBadge :n="1" />` | Step indicator, active step in ink |
| `<Ladder>`, `<LadderRung :n title>` | Vertical list of steps split by hairlines; `compact` for one line per rung |
| `<StatGrid>`, `<Stat value source>` | Big numbers in ink under a rule |
| `<QRCode>`, `<QRBlock>` | Ink on paper QR code, the block adds a mono label |
| `<BrowserFrame url>` | Screenshot frame, hairline and mono url |
| `<WhoAmI />` | Name and key/value facts for the `intro` layout |

The catalog with one slide per layout and component is [`example.md`](./example.md): `pnpm demo:brand` from the repo root.
