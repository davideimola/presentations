# presentations

Slides for my talks, built with [Slidev](https://sli.dev) and a custom personal-brand theme.

Each talk lives in its own folder as a pnpm workspace package. Newer talks also carry a `TALK.md` brief (thesis, audience, takeaways, outline) that drives the slide work.

## Talks

| Folder | Title | Event |
|--------|-------|-------|
| [`ai-defense`](./ai-defense) | Il security engineer che già AI | ComeToCode 2026 |
| [`securing-go`](./securing-go) | Securing Go for Production | GoLab 2026 |
| [`go-ddd`](./go-ddd) | Gophers Gone Domain-Driven: A Tale of Golang and DDD | |
| [`greenops`](./greenops) | GreenOps: Bridging the Gap Between DevOps and Sustainability | |
| [`how-to-gitops`](./how-to-gitops) | How to GitOps your cluster with Flux | |

## Theme

[`theme-davideimola/`](./theme-davideimola) is the current Slidev theme, matching the design system of [davideimola.dev](https://davideimola.dev):

- [`BRAND.md`](./theme-davideimola/BRAND.md) — colors, typography, brand mark, usage rules
- [`example.md`](./theme-davideimola/example.md) — the layout and component catalog, one slide per feature

Older decks still use [`theme/`](./theme), the previous theme, kept around so they keep building.

## Getting started

Toolchain (Node, pnpm, Slidev CLI) is pinned via [mise](https://mise.jdx.dev):

```sh
mise install
pnpm install
```

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Interactive picker, then runs the chosen deck locally |
| `pnpm demo` | Runs the theme catalog (`theme-davideimola/example.md`) |
| `pnpm build` | Builds every deck to `dist/<talk>/` plus the theme demo to `dist/demo/` |
| `pnpm export` | Exports every deck to PDF |

## Repository layout

```
<talk>/
  TALK.md          # talk brief (newer talks)
  src/slides.md    # the deck (workspace package: talk-<name>)
theme-davideimola/ # current theme: layouts, components, styles, catalog
theme/             # legacy theme
scripts/           # dev.mjs (picker), build.mjs (multi-deck build)
```

Any folder with a `src/slides.md` is picked up automatically by `pnpm dev` and `pnpm build` — no registration needed.

## Deployment

Deployed on Vercel: `scripts/build.mjs` builds each deck under `/<talk>/` and the theme demo under `/demo/`. The root path redirects to [davideimola.dev/sharing](https://davideimola.dev/sharing).

## Workflow

Talks are forged and edited with Claude Code skills living in `.claude/skills/`:

- `talk-forge` — grills the idea into a brief (`TALK.md` + tracking issue) and scaffolds the folder
- `slide-craft` — layout coach and structural editor for the deck itself
- `cfp-submit` — prepares CFP submissions for a forged talk (output stays local, gitignored)
