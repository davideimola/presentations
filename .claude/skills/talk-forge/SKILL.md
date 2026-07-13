---
name: talk-forge
description: Forge a technical talk for Davide via aggressive grilling, open a brief issue on the presentations repo, and scaffold the Slidev folder. Use when the user wants to start a new talk, structure a talk idea, import an existing document into a talk, or build on top of an existing stub issue. Trigger: "voglio fare un talk", "talk forge", "nuovo talk", "forgiamo un talk", "aiutami a strutturare il talk", "ho un'idea di talk".
---

# talk-forge

Forge a technical talk via aggressive grilling. Output: an issue on `davideimola/presentations` + a scaffolded Slidev folder.

Be a demanding editor, not a stenographer. Davide is an experienced speaker (17+ talks): he wants pressure checks, not a questionnaire. Push back. Challenge vague theses, abstract takeaways, ambitious outlines, risky demos, generic titles.

## Output language

Davide works in Italian. **All user-facing output is in Italian**: chat replies, issue body, `TALK.md`. Placeholders inside `slides.md` are language-neutral (section titles taken from the outline, `TODO` as a marker). The talk itself can be in IT or EN — ask in phase 4.

This skill file is in English for clarity, but it does NOT change the output language.

## Entry points

Four ways to start. Figure out from the user's first prompt which one applies:

1. **Vague idea** — "I feel like talking about X but I don't know what to say". Run **Phase 0 brainstorm** before grilling.
2. **Clear thesis** — the user shows up with an articulated thesis. Skip Phase 0, go straight to grilling from Phase 1.
3. **External markdown** — the user passes a path (relative or absolute) or pastes text. Read it, extract what's already there, grill only on the gaps.
4. **Existing GitHub issue** — the user passes an issue number (`#42` or `42`). Read with `gh issue view <n> --repo davideimola/presentations`, extract, grill on the gaps. At the end you **update** the issue instead of creating a new one.

If you can't tell, ask one short question: "Parti da idea vaga, thesis chiara, documento esistente, o issue esistente?"

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

After grilling, **show the consolidated brief in chat (in Italian) and ask for explicit confirmation**. Only after a yes, run the actions:

### 1. GitHub issue

- **Entry points 1, 2, 3** → create new issue with `gh issue create --repo davideimola/presentations --title "<Title>" --label talk --body "<body>"`. If the `talk` label doesn't exist on the repo, create it first with `gh label create talk --repo davideimola/presentations --description "Talk brief / proposal" --color 5319E7`, then create the issue.
- **Entry point 4** → update existing issue with `gh issue edit <n> --repo davideimola/presentations --body "<body>"` (preserve any existing labels).

Issue body (sections in this order, content in Italian):
```markdown
## Title
<title>

## Audience & prerequisites
<audience + prerequisites>

## Core thesis
<one sentence>

## Takeaways
- <takeaway 1>
- <takeaway 2>
- <takeaway 3>

## Outline (con timing)
- (Xmin) <section 1>
- (Xmin) <section 2>
...

## Demo / code samples
<demo description + plan B>

## Open questions
<remaining open questions>

## Slidev folder
`./<slug>`

## Conference & date
<conference, date, language>
```

### 2. Folder slug

Derive from the title in kebab-case (strip articles, accents, punctuation). Example: "Domain-Driven Design in Go" → `go-ddd` (prefer compact). **Propose the slug and ask for confirmation** before scaffolding.

### 3. Folder scaffolding

Check if `<slug>/` already exists:
- **Exists** → idempotent re-run mode: do NOT touch the folder. Print explicitly "La cartella esiste già, non l'ho toccata. Differenze rispetto al brief aggiornato: [...]" and list what Davide needs to sync manually in `slides.md`.
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

**`<slug>/src/slides.md`** — clone the pattern of `theme-davideimola/example.md` (source of truth). The older talks `go-ddd/` and `greenops/` use `../../theme` (previous version of the theme): do NOT use them as reference for new talk scaffolds. The current theme for new talks is `theme-davideimola`.

Pattern: **cover** (title + terminal-style subtitle) → **intro WhoAmI** → **section** + **default** for each outline section → **final cover** "Thank you" with QRCode.

```markdown
---
theme: ../../theme-davideimola
title: "<Title>"
highlighter: shiki
transition: slide-left
mdc: true
layout: cover
defaults:
  website: davideimola.dev
---

# <Title>

go run talk.go --topic="<subtitle or short hook>"

---
layout: intro
introImage: /theme/me.png
github: davideimola
bluesky: "@davideimola.dev"
linkedin: davideimola
---

<WhoAmI />

---
layout: section
label: "01 / <section 1 name>"
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
label: "02 / <section 2 name>"
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
layout: cover
---

# Thank you

exit 0

<div class="absolute bottom-20 right-20 flex flex-col items-center gap-3">
  <QRCode value="https://links.davideimola.dev" :size="140" dark="#eae5df" light="#080807" />
  <span class="text-xs font-mono" style="color: #7E7874;">links.davideimola.dev</span>
</div>
```

For each section in the outline generate **two slides**: a `section` divider (numbered `NN / name`) followed by a `default` with `TODO` as marker. No scaffolded speaker notes. The `value` of the final QRCode is a placeholder — Davide will update it once he has the deployed URL of the specific talk.

**`<slug>/src/public/`** — empty folder (or create a `.gitkeep` if needed).

**`<slug>/TALK.md`** — readable mirror of the brief to give context to future Claude sessions. Content in Italian:

```markdown
# <Title>

- **Issue**: #<n>
- **Thesis**: <one sentence>
- **Audience**: <audience>
- **Takeaways**:
  - <takeaway 1>
  - <takeaway 2>
  - <takeaway 3>
- **Outline**:
  - (Xmin) <section 1>
  - (Xmin) <section 2>
- **Format**: <duration>, <language>
- **Conference**: <conference or "TBD">
```

### 4. Print summary

At the end, print a summary of what you did (in Italian):
- Issue created/updated with link (`gh issue view <n> --web` optional, or print the URL)
- Folder scaffolded or skipped (with reason)
- Suggested next steps (e.g.: "lavora a `<slug>/src/slides.md`, partendo dalla sezione 1")

## Things you do NOT do

- Don't write slide content (Davide writes it by hand).
- Don't create automatic speaker notes.
- Don't do external scraping.
- Don't commit anything, don't push, don't open PRs.
- Don't update `.gitignore` or other files outside the talk folder.
- Don't query GitHub for status of other issues/PRs.
- Don't do a "what I just did" recap at the end of every reply. Get to the point.

## After the forge

After scaffolding, Davide will work on `<slug>/src/slides.md` in a normal chat (without skill). The `TALK.md` file gives that Claude immediate context without calling `gh`.
