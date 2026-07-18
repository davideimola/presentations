---
name: cfp-submit
description: Generate answers for a conference CFP (Call For Papers), reusing the talk's Brief from its TALK.md (the Artifact) and tracking it as a CFP on content-os (create-if-missing + Outcome write-back). Calibrated answers stay local and gitignored, never on content-os. Use when Davide needs to submit an existing talk to a conference. Trigger: "submit cfp", "submit alla conferenza", "cfp submit", "rispondiamo alla CFP", "preparare submission".
---

# cfp-submit

Produce calibrated CFP answers by reusing a talk's consolidated **Brief** (its `TALK.md`). Track the CFP on the **Editorial source of truth** (content-os); the answers stay local and gitignored, never public.

Be a demanding editor here too. The CFP answers that get thrown out are the generic, buzzword-stuffed ones. Push back hard on the bio, on "why you", on "why now".

## Where things live

- **Brief** → `<slug>/TALK.md` in this repo (the Factory). It's the source of truth for *what* the talk says. Don't read `presentations` issues for the Brief.
- **CFP** → issue on `davideimola/content-os` (the Editorial source of truth): it tracks the deadline and the **Outcome**. One CFP = one **Talk Piece** submitted to one conference; a Talk Piece has many CFPs (one per conference).
- **Calibrated answers** → local gitignored file `<slug>/cfp/<conf-slug>.md`. **Never** on content-os: only editorial metadata + Outcome go there.

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

### 3. Resolve the Talk Piece (content-os#<n>)

The CFP links the **Talk Piece** it submits. Find it like this:

- Look in `TALK.md` for a `content-os#<n>` reference (talk-forge will write it there once `presentations#7` lands).
- If it's missing (the interim state, until clean Talk Pieces exist — `content-os#42`), **ask Davide** which content-os issue represents the talk. If no Talk Piece exists yet, leave the field empty and say so — don't invent one.

### 4. CFP on content-os: create-if-missing

Look for an existing CFP for this talk + conference:

```
gh issue list --repo davideimola/content-os --label cfp --state all \
  --json number,title,body --jq '[.[] | {number, title, body}]'
```

Match on the conference (name in the title / `Conference / event` field) and, when known, the Talk Piece (`content-os#<n>` in the `Talk Piece (content-os)` field). If the Talk Piece is still empty (interim), match on conference + talk title alone — enough to avoid a duplicate.

- **Already exists** → read it, don't recreate it. Reuse its number for the Outcome write-back (see "10. Outcome write-back").
- **Doesn't exist** → create it:

```
gh issue create --repo davideimola/content-os \
  --title "[CFP] <Conference Year> — <Talk title>" \
  --label cfp --label talk \
  --body-file <scratch-body.md>
```

The body must mirror the shape rendered by `cfp.yml` (one `### <label>` section per field; empty fields are omitted):

```markdown
### Conference / event
<Conference Year>

### CFP deadline
<YYYY-MM-DD>

### CFP link
<public homepage URL>

### Outcome
to submit

### Talk Piece (content-os)
content-os#<n>

### Talk brief (presentations Factory)
https://github.com/davideimola/presentations/blob/main/<slug>/TALK.md

### Notes
<optional logistics only: dates, location, language, format>
```

Note: the `cfp.yml` `Talk brief (presentations Factory)` field is still described as a link to a `presentations` issue, but here you write the **Artifact path** (`TALK.md`) into it instead — a deliberate discrepancy, tracked on `content-os#42`.

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
cfp_issue: content-os#<n>
---

# <Conference name>

## <Question 1>

<Consolidated answer 1>

## <Question 2>

<Consolidated answer 2>

...
```

**NO answer text on content-os.** **NO** push or commit.

Check that `**/cfp/` is in the repo `.gitignore` before writing (it already is). If it were missing, **warn Davide** before creating the file: "the `**/cfp/` pattern isn't in .gitignore. Add it yourself, or should I proceed anyway?". Don't add it automatically.

### 10. Outcome write-back

The only thing you write to content-os is the authoring-time **Outcome**, in the `### Outcome` section of the CFP body:

- **On create** → `to submit` (already set in the body at step 4).
- **When Davide confirms he has submitted** → flip `to submit` → `submitted`:

```
gh issue view <n> --repo davideimola/content-os --json body -q .body   # read the body
# in the body, change ONLY the value under "### Outcome" from "to submit" to "submitted"
gh issue edit <n> --repo davideimola/content-os --body-file <scratch-body.md>
```

**Never** set `accepted` / `rejected`: those transitions live on content-os via `/desk` (an accepted CFP drives the Piece's slotting). Don't ask about or touch those states.

### 11. Print a summary

- The content-os CFP number (created or existing) + its current Outcome
- The path of the local file created/updated
- Conference, deadline
- Reminder: "I don't touch `accepted`/`rejected`: handle those on content-os with `/desk`"

## Questions in steps

Davide can add questions across several sessions. When you re-run the skill on the same conference:
- Read the existing local file
- Show Davide which questions are already covered
- Ask which new ones he wants to add
- New questions follow the same draft → pressure check → refine cycle
- Already-finalized questions aren't touched without an explicit request

## Things you do NOT do

- Don't read the Brief from a `presentations` issue: the Brief is in `TALK.md`.
- Don't write answer text to content-os (it's public, the answers are private). Only editorial metadata + Outcome go to content-os.
- Never set `accepted` / `rejected`: only `to submit` / `submitted`. The rest belongs to `/desk`.
- Don't recreate a CFP that already exists (create-if-missing: if it's there, read it).
- Don't write files outside `<slug>/cfp/`.
- Don't commit, push, or open PRs.
- Don't overwrite already-finalized answers without confirmation.
- Don't scrape authenticated CFP portals (Sessionize speaker, Pretalx admin). Public conference homepage only, for framing.
- Don't summarize what you just said at the end of every answer.

## Language

- **CFP answers** follow the conference's language (IT or EN). Ask if it isn't clear from the framing.
- **Chat with Davide**: in Italian.
- **Skill instructions** (this file): English for clarity.
