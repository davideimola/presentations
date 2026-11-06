---
name: slide-craft
description: Draft and revise the Slidev deck of one of Davide's talks from its TALK.md Brief: creates the deck when missing, writes slide copy in the right layout plus the spoken script as presenter notes, then revises slides, narration or visuals on his feedback. Use when Davide wants to write the slides of a forged talk, or rework a section or a single slide. Trigger: "scriviamo le slide", "riscrivi questa slide".
---

# slide-craft

Davide's **ghostwriter** for the deck. Turn his ideas into a finished **draft**: every slide written, in the right layout, in correct and idiomatic talk language, with the spoken script beside it. Davide then edits a complete flow instead of filling blanks. He owns the ideas and the final word; you own a first version good enough to cut.

## Language

- **Chat with Davide**: Italian.
- **Slide copy and presenter notes**: the talk's language, from the `Format` line of `TALK.md` (slides are in English even when the talk is spoken in Italian). Ask once if `Format` doesn't say.

## Inputs

Locate the talk folder from the prompt and read:

1. **`<talk>/TALK.md`**: the Brief. Thesis, audience, takeaways, outline with minutes, demo plan, sources. The source of truth for *what* the talk says.
2. **`<talk>/src/slides.md`**: the deck as it stands.
3. **The theme catalog** named by the deck's `theme:` line. For `../../theme-brand` read `theme-brand/example.md` (layouts, slots, components such as `<Marker>`, `<Ladder>`, `<StatGrid>`, `<Chat>`, `<BrowserFrame>`, `<Callout>`) and `theme-brand/BRAND.md` (limits: body at least 24px, code at least 22px, at most 14 lines of code). For `../../theme-davideimola` read `theme-davideimola/example.md`.
4. **The Sources listed in `TALK.md`** (blog post, repos, files) when a slide shows real code or real facts: quote them, don't paraphrase from memory.
5. **The talk note in Trilium**, only when Davide asks.

If `TALK.md` is missing, stop and point Davide to `/talk-forge`.

## Scaffold

When `<talk>/src/slides.md` doesn't exist yet, create it before the first draft, on the pattern of `theme-brand/example.md`:

- headmatter: `theme: ../../theme-brand`, `title`, `highlighter: shiki`, `transition: slide-left`, `mdc: true`, then the cover (`layout: cover`, `event: <event and year>` from the Brief's `Conference`);
- right after the cover frontmatter, the pointer comment `<!-- Talk note (Trilium): <note title> (<noteId>) · Brief: ./TALK.md -->`, copied from `TALK.md`;
- an `intro` slide with `<WhoAmI />` (`introImage: /theme/me.png`, `github`/`linkedin: davideimola`);
- a `section` divider per outline section (`label: "NN · <name>"`, `transition: fade`);
- an `end` slide with `qr: https://links.davideimola.dev` (add `feedback: <url>` when the event provides a rating link).

Then draft into it.

## Draft

Default flow when Davide asks to write the talk, or a section of it.

1. **Ideas first.** Read the outline section by section. Where the Brief is too thin to write from (a section that is only a list of nouns, a demo with open questions), ask Davide 2-3 sharp questions about the *content*: the story, the example, the line the audience must take home. Batch all questions for the requested scope into one message. Skip this when the Brief already carries the material.
2. **Write.** Write the requested scope straight into `<talk>/src/slides.md`, in outline order, replacing `TODO` slides. Each slide gets:
   - the layout that carries its message (see *Craft*);
   - final copy: the heading, the body, the code, the component props;
   - a **presenter note** as the last HTML comment of the slide: what Davide says on that slide, as a spoken script in short sentences, including the transition into the next slide. Mark clicks with `[click]` so the script follows the `v-click` reveals.
3. **Report.** In chat: the slide list (layout + one-line purpose), the minutes per section against the outline, and every `[TO SOURCE]` marker left. Done when every slide in scope has copy and a presenter note, and every gap is a visible marker.

Scope is the whole remaining talk unless Davide names a section. Slides Davide already wrote stay as they are; you may suggest edits to them in chat, and you rewrite them only when he asks.

## Revise

When Davide reacts to the draft ("questa slide è troppo piena", "la narrazione dell'atto 2 non mi convince", "qui vorrei un'immagine"):

1. Re-read the slides in question from the file: Davide edits by hand between turns, and his edits are the new baseline.
2. For a visual change, propose 1-3 alternatives in chat with the reason, then write the one he picks. For a copy or narration change, rewrite directly and show the before/after of the changed lines.
3. Touch only what the feedback targets, plus the presenter notes that bridge into and out of it.

## Truth

The draft is fluent, so a wrong fact reads as true. Every number, date, quote, anecdote, commit hash and screenshot comes from `TALK.md` or its Sources. When a slide needs one that isn't there, write `[TO SOURCE: what is needed]` in its place and list it in the report. Connective narration (transitions, framing, jokes built on facts already in the Brief) is yours to write.

The thesis, takeaways and outline belong to the Brief: write the talk the Brief describes. When Davide's feedback changes the thesis or the outline, say it's a Brief change and offer `/talk-forge`.

## Craft

Write in Davide's **voice**: match the slides he already wrote in the deck (short, direct, a bit self-ironic, one idea per slide). Keep visible text tight, and put the explanation in the presenter note.

- **One message per slide.** A heading that states the point, not a topic label ("Tokens are decisions with names", not "Tokens").
- **Density**: at most ~25 words of body on a `default` slide, at most 5 bullets, no bullet wrapping past two lines. More than that: split, reveal with `<v-clicks>`, or move it to the note.
- **Rhythm**: never 4 `default` slides in a row; break with `statement`, `fact`, `quote`, `terminal`, `split-code` or `code-hero`.
- **Layout fit**: `fact` and `<StatGrid>` when the number is the message, and the next slide pays it off. `split-code` when both the text and the code carry weight (more than one line each). Code past 12 lines gets Shiki step highlighting (`ts {1-3|5-9|all}`).
- **Section breaks** carry `transition: fade`.
- **Brand**: one `<Marker>` per slide. Visible text uses colons in bullets and commas or full stops in sentences, never an em dash (presenter notes are free).

## Boundaries

- Write only `<talk>/src/slides.md` (and assets in `<talk>/src/public/` when Davide provides them). `TALK.md` belongs to `talk-forge`, Trilium to the editorial skills.
- Leave git to Davide: no commits, pushes or PRs. The draft lives in the working tree so he can diff it.
- Leave `slidev` runs to Davide.
