---
name: cfp-submit
description: Generate answers for a conference CFP (Call For Papers), reusing the talk's Brief from its TALK.md (the Artifact) and tracking it as a CFP line on the talk's note in Davide's Trilium (create-if-missing + Outcome write-back). Calibrated answers stay local and gitignored, never in Trilium. Use when Davide needs to submit an existing talk to a conference. Trigger: "submit cfp", "submit alla conferenza", "cfp submit", "rispondiamo alla CFP", "preparare submission".
---

# cfp-submit

Produce calibrated CFP answers by reusing a talk's consolidated **Brief** (its `TALK.md`). Track the CFP on the **Editorial source of truth** (Davide's Trilium, through the `trilium` MCP server; schema and MCP gotchas in "Editorial home" in the repo `CLAUDE.md`); the answers stay local and gitignored. content-os and the Obsidian vault are retired: never use them.

Be a demanding editor here too. The CFP answers that get thrown out are the generic, buzzword-stuffed ones. Push back hard on the bio, on "why you", on "why now".

## Where things live

- **Brief** → `<slug>/TALK.md` in this repo (the Factory). It's the source of truth for *what* the talk says. Don't read `presentations` issues for the Brief.
- **CFP** → one line in the `## Talk` section of the **talk note**'s body in Trilium (the Editorial source of truth): it records the conference, dates, homepage and the **Outcome**. One CFP = one talk submitted to one conference; a talk note has many CFP lines.
- **Calibrated answers** → local gitignored file `<slug>/cfp/<conf-slug>.md`. **Never** in Trilium: only the CFP line + Outcome go there.

Running this skill *is* the act of submitting the talk to a conference — so it is the honest birth moment of the CFP.

## Required input

Ask the user up front (in a single message):

1. **Talk** — the talk's folder/slug in this repo (e.g. `securing-go`), which is where I read `TALK.md` from.
2. **CFP questions** — ask them to paste them. If Davide has a file with the questions, accept a path too.
3. **Conference** — name, public homepage URL, deadline (format `YYYY-MM-DD`).

## Process

### 1. Read the Brief from TALK.md

Read `<slug>/TALK.md`. Extract: title, thesis, audience, takeaways, outline, demo, format/language, conference if present. This is the Brief — your only source for *what* the talk says.

If `<slug>/TALK.md` doesn't exist, stop and tell Davide to run `/talk-forge` first.

### 2. Determine slug and conf-slug

- `<slug>` = the talk folder (user input).
- `<conf-slug>` = conference name in kebab-case with year (e.g. `codeway-2026`, `golab-2026`).

### 3. Resolve the talk note

The CFP lives on the talk's note in Trilium. Find it like this:

- Look in `TALK.md` for the `Talk note (Trilium)` field (`<title> (<noteId>)`) and `get_note` it.
- If it's missing (older Briefs reference a legacy issue or nothing), `search_notes` for `#type=content #channels=talk` plus the talk title, and confirm the match with Davide. If no talk note exists, stop and tell Davide to run `/talk-forge` (which creates it) or to create it in Contenuti — don't invent one.

Sanity-check the note: it must carry `#channels=talk`. Read its body with `get_note_content`.

### 4. CFP line: create-if-missing

Look in the `## Talk` section of the body for a line about this conference (match on the conference name, ignoring the year only if Davide confirms it's the same edition).

- **Already exists** → don't add another. Reuse it for the Outcome write-back (see "10. Outcome write-back").
- **Doesn't exist** → add it. Edit the Markdown you just read and write it back whole with `set_note_content`, changing nothing else (keep every link and line exactly as read). If there is no `## Talk` section, add one right after the opening spark paragraph(s). The line follows the shape the existing lines use:

```markdown
*   **<Conference Year>** (<YYYY-MM-DD> or <start → end>, <City, Country>) — CFP da inviare (scadenza <YYYY-MM-DD>) — <public homepage URL>
```

Leave out the dates or city if not known yet. Logistics only: no abstract, no answer text.

### 5. Local re-run check

Check whether `<slug>/cfp/<conf-slug>.md` already exists:
- **Exists** → ask: "Add new questions, reword existing ones, or neither?". Proceed only after an answer. **Never overwrite already-finalized answers without explicit confirmation.**
- **Doesn't exist** → proceed normally.

### 6. Framing — the conference's public homepage

Use `WebFetch` on the conference homepage URL (public page only). Look for signals about:
- Typical audience (junior/senior/mix, dev-only/manager-mix)
- Main language (IT/EN)
- Past editions, last year's talks (to read the editorial angle)
- Sponsor track / community track / keynote

If the homepage is a SPA that renders no useful content, say "I couldn't extract framing from the homepage" and ask Davide to describe the audience and angle himself. **Do not** scrape authenticated CFP portals (Sessionize speaker, Pretalx admin): public conference homepage only.

### 7. Adapting the talk to the conference

Before the real answers, ask (with your own draft based on the framing):
- Is this conference more senior/junior than average? Do you want to adjust the depth?
- Does the Brief's thesis hold for this audience, or does it need reframing?
- Does the original title work, or is a different title worth it for this CFP?

Typical pressure check: "GoLab is 90% senior Go. Your talk is DDD applied to Go. The Brief's thesis says 'DDD is useful in Go' — that's trivial for that audience. Reframe it."

### 8. Answers one at a time

For each CFP question:
1. Generate a **draft** based on the Brief + the conference framing.
2. Show it to Davide.
3. **Pressure check**: identify whether it's generic, buzzword-stuffed, valid for any talk, or not specific to this conference. Say so explicitly.
4. Davide replies / corrects.
5. Reword. Iterate until "ok".

Example pressure checks on answers:
- "The bio says 'passionate developer'. Delete it. What have you concretely done in the last 12 months?"
- "The 'why this talk?' answer is generic, it fits any talk. What makes it specific to *this* conference?"
- "The abstract is 350 characters but the CFP allows up to 500. Sure you want to leave that margin empty, or do we add the hook?"
- "The takeaway 'you'll learn X, Y, Z' is didactic. For Codeway it works. For GoLab it's a keynote in disguise."

### 9. Final output — local gitignored file

Write the answers **only** into the local file `<slug>/cfp/<conf-slug>.md`:

```markdown
---
conference: <Conference name year>
url: <homepage URL>
deadline: <YYYY-MM-DD>
talk_note: <note title> (<noteId>)
---

# <Conference name>

## <Question 1>

<Consolidated answer 1>

## <Question 2>

<Consolidated answer 2>

...
```

**NO answer text in Trilium.** **NO** push or commit.

Check that `**/cfp/` is in the repo `.gitignore` before writing (it already is). If it were missing, **warn Davide** before creating the file: "the `**/cfp/` pattern isn't in .gitignore. Add it yourself, or should I proceed anyway?". Don't add it automatically.

### 10. Outcome write-back

The only thing you write to Trilium is the authoring-time **Outcome**, on the CFP line in the talk note:

- **On create** → `CFP da inviare (scadenza <YYYY-MM-DD>)` (already set at step 4).
- **When Davide confirms he has submitted** → change it to `CFP inviato`: `get_note_content`, replace **only** that outcome on that line, write the body back whole with `set_note_content`.

**Never** set `CFP accettato` / `CFP rifiutato` on your own: Davide records those in Trilium himself (an accepted CFP is also when `#talkDate` gets set). Do it only if he explicitly asks.

### 11. Print a summary

- The talk note (title + noteId) and the CFP line (created or existing) with its current Outcome
- The path of the local file created/updated
- Conference, deadline
- Reminder: "Non tocco `accettato`/`rifiutato`: li aggiorni tu in Trilium (o chiedimelo)"

## Questions in steps

Davide can add questions across several sessions. When you re-run the skill on the same conference:
- Read the existing local file
- Show Davide which questions are already covered
- Ask which new ones he wants to add
- New questions follow the same draft → pressure check → refine cycle
- Already-finalized questions aren't touched without an explicit request

## Things you do NOT do

- Don't read the Brief from a `presentations` issue: the Brief is in `TALK.md`.
- Don't write answer text to Trilium (the answers stay local and private). Only the CFP line + Outcome go there.
- Never set `CFP accettato` / `CFP rifiutato` unless Davide asks: only `CFP da inviare` / `CFP inviato`.
- Don't add a CFP line that already exists (create-if-missing: if it's there, reuse it).
- Don't touch anything else in the talk note: not its attributes, not the other lines of its body.
- Don't write files outside `<slug>/cfp/`.
- Don't commit, push, or open PRs.
- Don't overwrite already-finalized answers without confirmation.
- Don't scrape authenticated CFP portals (Sessionize speaker, Pretalx admin). Public conference homepage only, for framing.
- Don't summarize what you just said at the end of every answer.

## Language

- **CFP answers** follow the conference's language (IT or EN). Ask if it isn't clear from the framing.
- **Chat with Davide**: in Italian.
- **Skill instructions** (this file): English for clarity.
