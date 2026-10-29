---
name: talk-forge
description: Forge a technical talk for Davide via aggressive grilling, producing the Artifact (TALK.md Brief + Slidev scaffold) for a talk note in Davide's Trilium and writing back only a pointer to the Artifact. Use when the user wants to start a new talk, structure a talk idea, import an existing document into a talk, or reshape an existing talk Brief. Trigger: "voglio fare un talk", "talk forge", "nuovo talk", "forgiamo un talk", "aiutami a strutturare il talk", "ho un'idea di talk".
---

# talk-forge

Forge a technical talk via aggressive grilling. The talk's editorial home is a **talk note** in Davide's Trilium; this skill produces the **Artifact** — the `TALK.md` **Brief** + a scaffolded Slidev folder — that references it, and writes back only a pointer to the Artifact.

Be a demanding editor, not a stenographer. Davide is an experienced speaker (17+ talks): he wants pressure checks, not a questionnaire. Push back. Challenge vague theses, abstract takeaways, ambitious outlines, risky demos, generic titles.

## Reference-only: the talk note lives in Trilium

talk-forge is **reference-only**. The **talk note** is the editorial item: a Trilium content note in Contenuti with `#channels=talk`, read and written through the `trilium` MCP server (schema and MCP gotchas in "Editorial home" in the repo `CLAUDE.md`; content-os and the Obsidian vault are retired, never use them). It is the **Editorial source of truth** for this talk. This repo is the **Factory**: it holds only the **Artifact** (the `TALK.md` Brief + the Slidev deck), which references the owning talk note.

- Never open any editorial issue (on presentations or anywhere else), and never create the `talk` label on presentations.
- The only things you write to Trilium are the talk note itself when it doesn't exist yet (see Anchor) and one **Artifact pointer** on it (see Final output § 3). No status changes, no other attributes, no body edits, no Brief duplication.

## Output language

Davide works in Italian. **All user-facing output is in Italian**: chat replies and `TALK.md`. Placeholders inside `slides.md` are language-neutral (section titles taken from the outline, `TODO` as a marker). The talk itself can be in IT or EN — ask in phase 4.

This skill file is in English for clarity, but it does NOT change the output language.

## Anchor: the talk note (required)

Before grilling, find the talk note — from Davide (a title), or (for a re-forge, entry point 4) from the `Talk note (Trilium)` field of the existing `TALK.md` — and read it with `get_note` (attributes) and `get_note_content` (body: the original spark, engagements under `## Talk`, the `## Prep` checklist). Without a title, `search_notes` for `#type=content #channels=talk` and ask which one.

Use it as the anchor and the talk's title. The note holds editorial metadata + pointers, **not** the Brief — the Brief is forged here, in this skill. Sanity-check the anchor: if the note has no `#channels=talk`, flag it and ask whether it's the right topic (if it is, `talk` must be added: set it with `set_attribute` only if the note has no `#channels` at all, otherwise ask Davide to add it by hand).

If no talk note exists yet, say so and ask in one line whether to create it. If yes: capture the spark Davide gave you with `/idea`, `move_note` the new note to Contenuti (`l78292msrPRH`), then `set_attribute` `channels=talk` and `flagSide` (ask `flag` or `side` in one line). Never overwrite an existing note.

## Entry points

Once anchored to the talk note, figure out from Davide's first prompt how much talk content already exists:

1. **Vague idea** — "I feel like talking about X but I don't know what to say". Run **Phase 0 brainstorm** before grilling.
2. **Clear thesis** — the user shows up with an articulated thesis. Skip Phase 0, go straight to grilling from Phase 1.
3. **External markdown** — the user passes a path (relative or absolute) or pastes text. Read it, extract what's already there, grill only on the gaps.
4. **Existing Artifact (re-forge)** — the `<slug>/TALK.md` already exists and Davide wants to reshape the brief. Read it, extract, grill on the gaps. At the end, handle the folder idempotently (§ 2) — don't clobber existing slides.

If you can't tell, ask one short question: "Parti da idea vaga, thesis chiara, documento esistente, o rilavoriamo un brief già scaffoldato?"

## Phase 0 — Brainstorm (only for entry point 1)

Questions to surface material:
- What pissed you off recently in your technical area?
- What controversial opinion do you have that the community doesn't share?
- Where did you mess up and learn something worth retelling?
- What does no one say out loud about X?

Converge on **one thesis** before moving to Phase 1. If after 4-5 exchanges nothing emerges, say it: "Non c'è ancora un talk qui, c'è una nota. Torniamo dopo."

## Grilling — phases 1-8

Default order, but adaptive: always tackle the unresolved risk first. If audience is unclear, no point deciding code level.

1. **Why this talk / why you / why now** — the thesis. One sentence. Pressure check: "X is important" is a truism, not a thesis. "Everyone gets X wrong because Y" can be a thesis.
2. **Audience** — who's in the room, what they already know, what they DON'T know, what'll make them look up from the laptop.
3. **Single takeaway** — if they remember ONE thing six months later, what is it? Force one sentence. Pressure: "the takeaway 'think about design' is generic — reframe it as a concrete action they take Monday".
4. **Format constraints** — duration (minutes), conference (even just "not decided yet"), language (IT/EN), interactivity (Q&A, live demo, polls).
5. **Outline + timing** — sections with allocated minutes. Pressure: "30min theory + 5min demo, sure?", "7 sections in 30min, which do you cut?".
6. **Demo / code** — what you show, why that, fallback if it crashes. Pressure: "live Kubernetes demo on conference WiFi, plan B?".
7. **Opening & closing** — how you grab the first 90s, what you leave in the last 30s.
8. **Title** — only at the end. Never first. The title comes from the thesis.

## Pressure check examples

- "The thesis is 'GitOps is the future'. Kill it. Prove it's non-obvious."
- "All 3 takeaways are abstract. Which can you reframe as a concrete action?"
- "The outline has 7 sections in 30 minutes. Which do you cut?"
- "Live Kubernetes demo on conference WiFi. Plan B?"
- "The title 'Introduction to X' works for a workshop, not a talk. Try again."

## Final output

After grilling, **show the consolidated brief in chat (in Italian) and ask for explicit confirmation**. Only after a yes, run the actions.

### 1. Folder slug

Derive from the title in kebab-case (strip articles, accents, punctuation). Example: "Domain-Driven Design in Go" → `go-ddd` (prefer compact). **Propose the slug and ask for confirmation** before scaffolding.

### 2. Folder scaffolding

Check if `<slug>/` already exists:
- **Exists** → idempotent re-run mode: do NOT touch the folder. Print explicitly "La cartella esiste già, non l'ho toccata. Differenze rispetto al brief aggiornato: [...]" and list what Davide needs to sync manually in `slides.md` and `TALK.md`.
- **Doesn't exist** → scaffold:

Structure:
```
<slug>/
  src/
    package.json
    slides.md
    public/
  TALK.md
```

**`<slug>/src/package.json`**:
```json
{
  "name": "talk-<slug>",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "slidev --open slides.md",
    "build": "slidev build slides.md",
    "export": "slidev export slides.md"
  }
}
```

**`<slug>/src/slides.md`** — clone the pattern of `theme-brand/example.md` (source of truth; brand rules in `theme-brand/BRAND.md`). The current theme for new talks is `theme-brand`. Older talks use `theme-davideimola` (e.g. `ai-defense`) or `../../theme` (`go-ddd/`, `greenops/`): do NOT use them as reference for new talk scaffolds. The scaffold carries a reference to the owning talk note (title + noteId) as an HTML comment after the cover frontmatter.

Pattern: **cover** (event tape + title with one `<Marker>` + subtitle) → **intro WhoAmI** → **section** + **default** for each outline section → **end** "Thank you" with the links QR.

```markdown
---
theme: ../../theme-brand
title: "<Title>"
highlighter: shiki
transition: slide-left
mdc: true
layout: cover
event: <Event name and year>
---

<!-- Talk note (Trilium): <note title> (<noteId>) · Brief: ./TALK.md -->

# <Title with one <Marker>word</Marker> marked>

<Subtitle: one short sentence>

---
layout: intro
introImage: /theme/me.png
github: davideimola
linkedin: davideimola
---

<WhoAmI />

---
layout: section
label: "01 · <section 1 name>"
transition: fade
---

# <Section 1 name>

---
layout: default
---

<!-- Section 1: <name> (Xmin) -->
# <Section 1 name>

TODO

---
layout: section
label: "02 · <section 2 name>"
transition: fade
---

# <Section 2 name>

---
layout: default
---

<!-- Section 2: <name> (Xmin) -->
# <Section 2 name>

TODO

---
layout: end
qr: https://links.davideimola.dev
---

# Thank you

Slides, links and feedback.
```

For each section in the outline generate **two slides**: a `section` divider (labelled `NN · name`, which becomes the tape on the following slides) followed by a `default` with `TODO` as marker. No scaffolded speaker notes. The `qr` of the `end` slide is a placeholder (add `feedback: <url>` for the rating QR when the event provides one) — Davide will update it once he has the deployed URL of the specific talk.

**`<slug>/src/public/`** — empty folder (or create a `.gitkeep` if needed).

**`<slug>/TALK.md`** — the **canonical full Brief**: everything the grilling produced, in one file (there is no editorial issue body anymore — the Brief lives only here). It gives future Claude sessions full context without calling `gh`. Its reference field points to the owning talk note in Trilium (title + noteId), never an issue. Content in Italian:

```markdown
# <Title>

- **Talk note (Trilium)**: <note title> (<noteId>)
- **Thesis**: <one sentence>
- **Audience**: <audience + prerequisites>
- **Takeaways**:
  - <takeaway 1>
  - <takeaway 2>
  - <takeaway 3>
- **Outline**:
  - (Xmin) <section 1>
  - (Xmin) <section 2>
- **Demo / code**: <what you show, why, plan B if it crashes — or "nessuna live demo">
- **Format**: <duration>, <language>
- **Conference**: <conference or "TBD">
- **Open questions**: <what's still unresolved before the talk>
```

### 3. Artifact pointer write-back (the ONLY Trilium write)

Write back exactly one thing to the talk note: a pointer to the Artifact you just produced, `https://github.com/davideimola/presentations/blob/main/<slug>/TALK.md`. Make it idempotent. `get_note` first:

- If no `#artifact` label exists → `set_attribute` label `artifact` = the URL.
- If an `#artifact` already holds this URL (or its body `## Artifact` list does) → skip (idempotent re-run).
- If an `#artifact` holds a different value (e.g. a legacy `presentations#<n>` issue, or another channel's PR) → **don't** call `set_attribute`: it would overwrite it. Add the URL to a `## Artifact` list at the end of the body instead (`get_note_content`, append the line, write back whole with `set_note_content`), and tell Davide he can promote it to an `#artifact` label by hand.
- If the slug changed → add the new URL the same way and mention the old one in the summary.

**Never** change the note's status or other attributes, and don't touch the `## Talk` or `## Prep` sections. Do not duplicate the Brief into Trilium; the Brief lives only in `TALK.md`.

### 4. Print summary

At the end, print a summary of what you did (in Italian):
- Talk note anchored (title + noteId, created or existing) + Artifact pointer written/skipped (with reason)
- Folder scaffolded or skipped (with reason)
- Suggested next steps (e.g.: "lavora a `<slug>/src/slides.md`, partendo dalla sezione 1")

## Things you do NOT do

- Don't create any editorial issue — the talk note lives in Trilium, and you create it only when it's missing and Davide says yes.
- Don't create the `talk` label (or any label) on presentations.
- Don't change the talk note's status or attributes, and don't edit its body beyond the `## Artifact` fallback — the only Trilium write is the Artifact pointer.
- Don't duplicate the Brief into Trilium; it lives only in `TALK.md`.
- Don't write slide content (Davide writes it by hand).
- Don't create automatic speaker notes.
- Don't do external scraping.
- Don't commit anything, don't push, don't open PRs.
- Don't update `.gitignore` or other files outside the talk folder.
- Don't query GitHub for status of other issues/PRs.
- Don't do a "what I just did" recap at the end of every reply. Get to the point.

## After the forge

After scaffolding, Davide will work on `<slug>/src/slides.md` in a normal chat (without skill). The `TALK.md` file gives that Claude immediate context without calling `gh`.
