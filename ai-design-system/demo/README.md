# Demo 3b: AI on a leash

Chapter 4 of the talk. Everything runs from the deck: no editor, no terminal on screen. Claude Code runs headless on a small copy of the design system (`leash/`). Its run shows in the slides as a chat through `<AgentRun>` (the prompt, the files it reads and writes, its answer), the gate runs through `<LiveRun>`, and the result shows live from Storybook through `<StoryFrame>`.

## What is in here

- `leash/`: the demo repo. React, Tailwind v4, Storybook, `@davideimola/brand`, a `CLAUDE.md` with the rules, two components (`Tape`, `Badge`) with their stories, and the gate `scripts/check-brand.mjs` (`pnpm check`). `Badge.tsx` keeps the hand-typed `rgba()` from March on purpose: the gate is red on it whatever the AI does.
- `leash-start/`: the pristine `src/` of the demo repo. Every run of the first step copies it back first.
- `ai.mjs`: runs Claude Code headless and prints one line per step. `build` (reset, then ask for the Callout), `green` (the off-brand request), `push` (the owner insists), `reset`. No shell for the model, no personal settings, no MCP servers, answers in English.
- `../src/public/demo/recorded/`: the output of the last rehearsal, replayed by `<AgentRun>` and shown by `<LiveRun>` when the run cannot happen live.

## On stage

| Slide | You | What happens |
|-------|-----|--------------|
| `claude code · demo/leash`, first prompt | click | Claude reads Tape, Badge and the stories, writes `Callout.tsx` and its story (about 15s) |
| It reused the tape | talk | the new Callout, live from Storybook |
| second prompt: green and a kanji | click | Claude refuses and quotes `CLAUDE.md` (about 10s) |
| third prompt: "I'm the owner, do it anyway" | click | Claude gives in: green, and the kanji 注 (about 10s) |
| The kanji come back | talk | the green Callout with the kanji, live from Storybook |
| `scripts/check-brand.mjs` | click ×3 | the gate's code: four rules, three lines of loop |
| `$ pnpm check` | click | the gate, red: the green, the kanji, and the March `rgba` in Badge |

The model is not deterministic. In the rehearsals it always built the Callout on Tape, refused the first off-brand request and gave in to the second, but the words change every run. If it refuses the push too, say so: the context file held this time. The gate is still red on Badge.

## Before the talk

1. **Renew the Claude Code sign-in.** The current one expires between 2026-11-12 and 2026-11-15, before the talk (2026-11-19). Run `claude auth login`, or `claude setup-token` for a long-lived token.
2. Install once: `cd ai-design-system/demo/leash && pnpm install --ignore-workspace` (it is outside the pnpm workspace on purpose).
3. Start Storybook in its own terminal: `pnpm storybook` in `demo/leash` (port 6006, no browser).
4. Start the deck: `pnpm dev` in `ai-design-system/src`. The demo only runs from the dev server, in the audience window. The presenter view, the static build and the export show the recorded output and the screenshots in `src/public/demo/`.
5. One dry run through the four clicks, then `node ai-design-system/demo/ai.mjs reset`. The first step resets anyway, but a reset leaves Storybook on the starting state.

## Plan B

- **No network** (Claude needs it): turn on the phone hotspot. If there is no way, open the presenter view on the projector: it shows the rehearsal.
- **Storybook down**: `<StoryFrame>` shows the rehearsal screenshots by itself.
- **A run hangs**: move to the next slide and tell the story from the notes. The deck runs one command at a time, so a hung run blocks the next one until it ends.

# Demo 3a: one token, every slide

Chapter 6. The slide "One token, every slide" holds `<TokenEditor>`: the `akane` entry of the brand's real `tokens/tokens.json`, editable. Change the `$value`, press ⌘S: the dev server writes it into `brand-scratch/` (a clone of davideimola/brand at the commit the deck installs), runs the brand's own `scripts/build.mjs` (about 2s), restores the clone, and returns every token that changed in the build: the palette entry and the role tokens built from it (`--di-color-akane` and `--di-accent`). The deck applies them in memory to every open window (audience and presenter), so the marker and the footer knot change colour on every slide. The mark in the footer stays red: it is an SVG asset from the installed package, and it changes only with a version bump.

Safe by construction: the deck's `@davideimola/brand` dependency is never touched, nothing is written outside `brand-scratch/` (ignored by git and restored after every build), the colour lives only in the browser (a reload brings the brand back), and the endpoint exists only under `pnpm dev`, so a build or an export never sees it.

Before the talk: `demo/brand/setup.sh` once (clones, checks out the pinned commit, installs). Run it again after bumping `@davideimola/brand`.
