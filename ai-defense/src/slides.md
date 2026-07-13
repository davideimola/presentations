---
theme: ../../theme-davideimola
title: "Il security engineer che già AI"
highlighter: shiki
transition: slide-left
mdc: true
layout: cover
defaults:
  website: davideimola.dev
---

# Il security engineer che già AI

go run defense.go --vendor=none --budget=0

---
layout: intro
introImage: /theme/me.png
github: davideimola
bluesky: "@davideimola.dev"
linkedin: davideimola
---

<WhoAmI />

---
layout: two-cols-header
---

<!-- Opening 1/7 (~1.5min): two buzzwords, opposite curves. The comedy beat lives here (vibe coding, il macellaio sotto casa, influencer apps) — the joke is mostly verbal, slide stays light -->
# Let's face the buzzwords!

::left::

###### AI

<v-clicks>

- Everyone uses it
- Vibe coding: anyone ships an app
- Influencers ship "secure" apps

</v-clicks>

::right::

###### Cybersecurity

<v-clicks>

- Everyone says it's important
- No one has budget for it
- Budget magically appears after the breach

</v-clicks>

---
layout: statement
---

<!-- Opening 2/7 (~45s): close the laugh, open the seriousness. Beat: ask the room, pause, click, the answer drops -->
<!-- Verbal follow-up on the answer: "se pensi di non essere un target — chiunque è un target" -->
# Feeling secure?

<v-click>

# <span style="color: var(--accent);">You just haven't been breached yet.</span>

</v-click>

---
layout: default
---

<!-- Opening 3/7 (~1.5min): the three numbers — attacks are fast, the surface is everywhere, nobody is watching -->
<!-- Sources verified 2026-07: CrowdStrike Global Threat Report 2026 / Sonatype State of the Software Supply Chain 2026 / ISC2 Workforce Study 2024 -->
# Let's face the truth

<div class="grid grid-cols-3 gap-10 mt-14 text-center">
  <div v-click>
    <div class="text-6xl font-bold font-mono" style="color: var(--accent);">27s</div>
    <div class="mt-4 text-sm" style="color: var(--text-2);">fastest breakout ever observed: access to lateral movement</div>
    <div class="mt-2 text-xs font-mono" style="color: var(--text-3);">CrowdStrike GTR 2026</div>
  </div>
  <div v-click>
    <div class="text-6xl font-bold font-mono" style="color: var(--accent);">454k+</div>
    <div class="mt-4 text-sm" style="color: var(--text-2);">new malicious OSS packages in 2025 alone</div>
    <div class="mt-2 text-xs font-mono" style="color: var(--text-3);">Sonatype 2026</div>
  </div>
  <div v-click>
    <div class="text-6xl font-bold font-mono" style="color: var(--accent);">4.8M</div>
    <div class="mt-4 text-sm" style="color: var(--text-2);">security professionals missing worldwide</div>
    <div class="mt-2 text-xs font-mono" style="color: var(--text-3);">ISC2 2024</div>
  </div>
</div>

---
layout: fact
---

<!-- Opening 4/7 (~1min): payoff — GTG-1002, first reported AI-orchestrated espionage campaign, ~30 targets (Anthropic, Nov 2025) -->
<!-- Beat: number lands naked → you ask the room "80-90%... of what?" → click reveals the caption -->
<!-- Verbal kicker (NOT on slide): the agent was a CODING agent — the same kind of tool you use every day. Same tool, other side. -->
<!-- Ammo for the thesis section: humans only initialized + approved key steps — attackers already run "AI colleague + human judgment". Claude even hallucinated findings: they too needed human validation. -->
# 80–90%

<v-click>

of a real cyber-espionage campaign, executed autonomously by AI

<span class="text-xs font-mono" style="color: var(--text-3);">Anthropic · GTG-1002 · Nov 2025</span>

</v-click>

---
layout: default
---

<!-- Opening 5/7 (~1.5min): the attack surface is everywhere — code is just the obvious layer. Progression: repo → deps → artifact → runtime -->
<!-- Each bullet maps to a tool in ladder rung ③: gitleaks→secrets, osv-scanner→dependencies, Trivy→images, semgrep→code. Callback when the tools slide arrives -->
# Is security only about your code?

Sure, your code is the obvious attack surface, but...

<v-clicks>

- **Your secrets**: that `.env` you committed once
- **Your dependencies**: CVEs and malware in your supply chain
- **Your images**: is that distroless image really secure?
- **Your infrastructure**: misconfigs, and CVEs in that unpatched NGINX or Postgres

</v-clicks>

---
layout: default
---

<!-- Opening 6/7 (~1min): nobody to watch it all — it always comes down to time + money -->
# Probably too much to handle alone

<v-clicks>

- **People**: security engineers are scarce (4.8M, remember?)
- **Tools**: plenty of them, at enterprise prices
- **Training**: security is a skill; you can learn it, but it takes time

</v-clicks>


---
layout: center
---

<!-- Opening 7/7 (~45s): the bridge + question to the room. Hold this slide during audience interaction, then section break -->
# You already use AI for code. Why not for security?

---
layout: section
label: "01 / The thesis"
transition: fade
---

# The thesis

---
layout: default
---

<!-- Thesis 1/4 (~1.5min): the answer to the bridge question — the H1 IS the thesis, no standalone statement (title payoff) -->
<!-- The anti-vendor beat lives here: no new vendor, no new budget line -->
# You already work with a security engineer

<v-clicks>

- **It knows security**: it's trained on CVEs, OWASP, exploit patterns
- **It covers every surface**: secrets, deps, images, infra, all at once
- **It reads YOUR code**: your repo, your context, not generic advice
- **Already in your pipeline**: no new vendor, no new budget line

</v-clicks>

---
layout: statement
---

<!-- Thesis 2/4 (~30s): the mock-dramatic beat. The setup line on screen is your cue to wind up "ora vi dirò una cosa che vi sconvolgerà..." — milk the pause, then click -->
<!-- The joke IS the anticlimax: the deck's most dramatic buildup for the least surprising news in tech. It also disarms the skeptic before HITL -->
# Brace yourselves.

<v-click>

# <span style="color: var(--accent);">AI hallucinates.</span>

</v-click>

---
layout: default
---

<!-- Thesis 3/4 (~1.5min): Human in the loop — the anti-skeptic moment -->
<!-- Callback ammo: GTG-1002 — even the attackers kept human approval on key steps, because the AI hallucinated findings to them too -->
# Keep yourself in the loop

Let's be honest: if a colleague tells you nonsense and you blindly trust them, that's on you.

<v-clicks>

- **A colleague, not an oracle**: it can be confidently wrong
- **You are the designer**: you decide what it checks and what to trust
- **Judgment is not delegated**: the final call is always yours

</v-clicks>

<v-click>

<Callout type="note">Even the GTG-1002 attackers kept a human approving the key steps: the AI hallucinated to them too.</Callout>

</v-click>

---
layout: two-cols-header
---

<!-- Thesis 4/4 (~1.5min): the engineering answer to fallibility — as a system, not an oracle. Sets up both the case study and the ladder without naming them -->
<!-- Right column deliberately plants the ladder vocabulary: skills, tools, agents. Verbal bridge out: "e ora vi racconto cosa succede quando lo usi così" → case study -->
# A system, not an oracle

::left::

###### As an oracle

<Chat class="mt-6 mr-8">
  <ChatBubble user>is my app secure?</ChatBubble>
  <ChatBubble v-click>Great question! I reviewed it and it looks quite secure to me 👍</ChatBubble>
</Chat>

<div v-click class="mt-4 text-xs font-mono" style="color: var(--text-3);">no tools, just vibes: nothing you can check</div>

::right::

###### As a system

<v-clicks>

- **The question**: scoped, one surface at a time
- **The work**: skills, deterministic tools, focused agents
- **The answer**: findings you can verify (file, line, fix)

</v-clicks>

---
layout: section
label: "02 / The ladder"
transition: fade
---

# The ladder

---
layout: default
---

<!-- Ladder 1/15 — the map (~1.5min): show the whole ladder BEFORE climbing it. Section total ~16min, case study lives inside rung ② -->
# The ladder

You scale effort, not budget.

<v-clicks>

- **① Ready-made skills**: zero code, works today
- **② Your own skills**: your context, your rules
- **③ MCP & tooling**: deterministic findings
- **④ Agents**: a colleague, not a chat

</v-clicks>

---
layout: two-cols-header
---

<!-- Ladder 2/15 — rung ① the catalog (~1min): ready-made skills exist everywhere, don't reinvent the wheel. The terminal slide right after is the proof -->
<!-- Verified 2026-07: Claude Code /security-review built-in; Codex /review built-in + official security plugin (security-diff-scan); OpenCode via community skills (e.g. opencode-power-pack) -->
###### rung 01

# Don't reinvent the wheel

Every major coding agent already ships a security review skill. You just have to run it.

::left::

###### Built into your agent

- Claude Code <Badge type="accent">/security-review</Badge>
- Codex <Badge>/review</Badge> + security plugin

::right::

###### Open source, ready to pull

<!-- Argus skills deliberately NOT named here (Argus not introduced yet) — section 03 does the callback: "the ready-made skills from rung ①? They live in this repo" -->
- OpenCode community skills
- Skill directories
- Awesome lists

---
layout: terminal
title: "~/your-repo $ claude"
---

<!-- Ladder 3/15 — rung ① the proof (~1min): REAL condensed run of /security-review, executed 2026-07 on a real personal Next.js site. Anonymized: file paths renamed, line numbers changed. Findings are real: unvalidated slug reaching readFileSync + missing CSP. Verbal beat: "categorie pulite dichiarate = onestà, non silenzio" + "il fix era UNA riga" -->

```sh
$ claude
> /security-review

⏺ Reviewed 97 source files, 4 entry points

  2 findings · 7 categories clean

● [MEDIUM] Path traversal: unvalidated slug reaches readFileSync
  src/lib/posts.ts:42 · fix: allowlist the slug, one line

● [MEDIUM] Security headers set, but no Content-Security-Policy
  next.config.ts:5
```

---
layout: default
---

<!-- Ladder 4/15 — rung ① cost & privacy (~1min): the objection killer, placed right after they SAW a run. TODO Davide: fill the cost cell with your real numbers -->
<!-- Verbal: "quel run che avete appena visto? Ecco quanto è costato, ed ecco dove è andato il codice" -->
###### rung 01

# What does it cost? Where does my code go?

| | |
|---|---|
| **That run you just saw** | order of cents, or flat inside the subscription you already pay |
| **Where the code goes** | To the same provider that already reads your code while you write it |
| **Not comfortable with that?** | The ladder is provider-agnostic: self-hosted models work too |

---
layout: split-code
---

<!-- Ladder 5/15 — rung ② your own skill (~2min). The next four slides are the real case that proves this rung -->
<!-- The example skill is deliberately funny (callback to "that .env you committed once") but the FORMAT is dead serious — that's what makes it land -->
<!-- Delivery: after the laugh, pivot: "questa è scema, ma il formato è identico a quella vera — e ora vi racconto cosa ha trovato quella vera" → real case slides -->

###### rung 02

# Your own skill

Sometimes, even with lots of skills out there, none really fits: your stack, your rules, or something is simply missing. That's when you write your own.

Of course AI can help you with that. Take a look at `/skill-creator`!

::right::

```md
---
name: env-committer-detector
description: Finds the .env you swore
  you never committed
---

# Instructions

1. Scan git history for .env, *.pem, id_rsa
2. Check .gitignore actually covers them
3. If found: report file, commit and how
   long it has been exposed.
   Do not judge. (Judge a little.)
```

---
layout: default
---

<!-- Ladder 6/15 — rung ② real case 1/4, the spot-the-bug beat (~1.5min): full-page code, the room hunts. Code is DEMONSTRATIVE (TS, invented) — the real case is RedCarbon's, this snippet mimics its shape. Confirm RedCarbon ok before the talk (open question on issue #2) -->
<!-- Delivery: "ci è capitata una cosa. Questo NON è il codice vero, ma il bug ha la stessa forma. Vi sembra tutto ok?" → let the room scan ~20-30s → click lights up line 10 -->
<!-- Escape hatch if someone spots it: "bravo — ora immagina di non sapere che c'è un bug, e che questa riga sia 1 su migliaia" -->
<!-- Reveal question (verbal, right before the click): "chi controlla il valore di preferences?" -->

###### rung 02 · real case

# Let's jump into some code

```ts {all|10}
// GET /api/reports/:id
export async function getReport(req: Request, res: Response) {
  const user = await getSession(req);
  const report = await db.reports.findById(req.params.id);
  if (!user || !report) return res.sendStatus(404);

  const canAccess =
    user.role === "admin" ||
    report.ownerId === user.id ||
    user.preferences.sharedReports;

  if (!canAccess) return res.sendStatus(403);
  return res.json(report);
}
```

---
layout: default
---

<!-- Ladder 7/15 — rung ② real case 2/4, the reveal (~45s): name the flaw, show the fix. Surgical: one answer, one diff, two bullets -->
###### rung 02 · real case

# Ouch, this bug hurts!

A user preference, used as an access grant: that's the hole in the system

```ts
user.preferences.sharedReports          // ✗ the USER decides
report.sharedWith.includes(user.id)     // ✓ the RESOURCE decides
```

<v-clicks>

- **What it is**: broken access control (OWASP A01), only the most common web flaw out there
- **Why it hurts**: any user, one setting, every report behind that API

</v-clicks>

---
layout: default
---

<!-- Ladder 8/15 — rung ② real case 3/4 (~1min): how the real one was caught. HITL applied: the finding was verified by humans FIRST, fix + tests then written with the AI -->
###### rung 02 · real case

# Curious how we caught it?

| | |
|---|---|
| **What we asked** | We wrote a skill to test our auth system, based on our own requirements |
| **When it runs** | Every time the auth code changes |
| **What it does** | Generates automated tests and reports findings |
| **How we verified** | We review each finding, test if it's real, and patch it when it is |

<v-click>

And that's how we found a real hole in a real API, fixed before anyone could exploit it. Luckily...

</v-click>

---
layout: default
---

<!-- Ladder 9/15 — rung ② real case 4/4, the habit (~45s): from OUR story to THEIR practice. Bullets deliberately say only what the table did NOT: context quality, automation, compounding -->
<!-- Verbal detail on bullet 1: your auth rules, how data must flow, what "authorized" means in YOUR system. On bullet 2: Claude Code hooks exist, name them. On bullet 3: the skill lives in the repo, goes through PR review like any code. Bridge out: "e se la skill si sbaglia?" → hinge -->
<!-- Title riffs on the "Luckily..." closing the previous slide -->
###### rung 02

# One run is luck. A habit is defense.

<v-clicks>

- **Write it rich**: the skill is only as good as the context you put in it
- **Automate it**: "we run it" becomes "it runs by itself"; a hook, not human memory
- **Maintain it**: it doubles as living documentation, and docs that run don't rot
- **Let it compound**: every run leaves tests behind, your safety net grows

</v-clicks>

---
layout: statement
---

<!-- Ladder 10/15 — the hinge (~1min): why climb from skills to tools. Deliberate echo of the "Brace yourselves / AI hallucinates" beat: same layout, same accent reveal — the thesis promise gets its answer here -->
# Skills can hallucinate.

<v-click>

# <span style="color: var(--accent);">Scanners can't.</span>

</v-click>

---
layout: two-cols-header
---

<!-- Ladder 11/15 — rung ③ MCP servers & tooling (~2min) -->
<!-- The toolbox deliberately echoes Opening 5/7: Trivy→images+deps (it covers what osv-scanner would, one tool less on stage), semgrep→code, gitleaks→secrets (same .env line!). Say it: "vi ricordate le superfici dell'inizio?" -->
<!-- Only one badge kept, on purpose: Trivy MCP = the proof that MCP servers for these tools exist -->
###### rung 03

# Deterministic eyes for your AI

::left::

###### How it works

<v-clicks>

- **Eyes**: the tools; a CVE is there, or it isn't
- **Socket**: MCP plugs any tool in, no shell
- **Brain**: your AI reads, prioritizes, patches

</v-clicks>

::right::

###### The toolbox

- **Trivy** <Badge type="accent">MCP</Badge>: images, containers and deps
- **semgrep**: bug patterns in your code
- **gitleaks**: that `.env` you committed once

---
layout: terminal
title: "~/your-repo $ claude"
---

<!-- Ladder 12/15 — rung ③ the proof (~45s): twin of the rung ① terminal, every rung gets its proof. Grounded in a REAL gitleaks run (2026-07, scratch repo with a planted realistic test key): rule generic-api-key, deploy.yml:3, 1 leak. Re-run on a real repo before the talk if you want full parity with rung ① -->
<!-- The last prompt line is the point, say it: "il finding non si guarda, si sistema" -->

```sh
$ claude
> any leaked secrets in this repo?

⏺ gitleaks · detect(".")
  ⎿ 2 commits scanned · leaks found: 1

● [generic-api-key] aws_secret_access_key · deploy.yml:3
  committed 81c6768, still live in git history

> rotate it, purge the history, add a pre-commit hook
```

---
layout: default
---

<!-- Ladder 13/15 — rung ④ 1/2, the knowledge base (~1min): the repo itself carries knowledge, every AI session starts warm. Bridge INTO the anatomy: docs are passive knowledge, an agent OWNS knowledge -->
<!-- Security tie, verbal: the AI that knows your auth model reviews auth better (callback to "Write it rich") -->
###### rung 04

# Don't start from day zero

Your repo can carry the knowledge: every AI session (and new hire) starts warm

<v-clicks>

- **ADRs**: the architectural decisions, and the why behind them
- **A living CONTEXT.md**: what the system is, in one read
- **Docs-as-code**: next to the code, reviewed like the code

</v-clicks>

<v-click>

<Callout type="note">Skills like grill-with-docs challenge your design and update the docs while you decide.</Callout>

</v-click>

---
layout: default
---

<!-- Ladder 14/15 — rung ④ 2/2, the anatomy (~1.5min): what the docs can't be. Verbal bridge in: "ma un manuale non è un collega". This slide deliberately sets up the Argus section -->
<!-- Honesty note on Daemon (Davide's point): it is NOT definitional. Most agents live in a terminal session; the one guarding an org should be always on. Say it: "non tutti gli agenti ce l'hanno, quello che sorveglia un'org sì" → Argus -->
###### rung 04

# Agents: what turns the AI into a real colleague

A new hire is not your tech lead. Same with AI.

<v-clicks>

- **Soul**: who it is: your org, your risk tolerance
- **Memory**: what it learned yesterday is still there tomorrow
- **Context**: your projects, your stack, how your services talk
- **Daemon**: always on duty, not a tab you open

</v-clicks>

---
layout: center
---

<!-- Ladder 15/15 — recap + bridge to Argus (~1min): numeric recap, double callback (the ladder + the "colleague" thread running through the whole deck). Beat: the line lands, pause, click drops the tease, hold, then section break -->
# Four rungs. Zero new budget. One new colleague.

<v-click>

Rung ① works this Monday. Rung ④? Someone already climbed it for you.

</v-click>

---
layout: section
label: "03 / Argus"
transition: fade
---

# Argus

---
layout: two-cols-header
---

<!-- Argus 1/6 (~1min): the disarm. The anti-vendor thread from the thesis lands here: nothing to buy, built for myself, it works. Tone: honest, zero hype -->
<!-- The logo caption is a real ask: temporary logo, contributions welcome (say it with a smile). Bonus dogfood callback, verbal: the Argus repo keeps CONTEXT.md + docs/adr — exactly the "Don't start from day zero" practice from rung ④ -->
# Not another tool to buy

I built Argus for myself. It works. And it's open source.

::left::

<v-clicks>

- **Yours**: use it, fork it, study it
- **Bring your own AI**: adding a new model is designed to be easy
- **Multi-channel**: it meets you where you already work

</v-clicks>

::right::

<div class="flex flex-col items-center gap-3 mt-6">
  <img src="/argus.svg" class="w-32" alt="Argus logo" />
  <span class="text-xs font-mono" style="color: var(--text-3);">temporary logo, PRs welcome</span>
</div>

---
layout: two-cols-header
---

<!-- Argus 2/6 (~1min): what it does TODAY, honestly. No roadmap. Each feature is a callback: PR reviewer = the daemon colleague (always on duty), MCP server = rung ③ vocabulary, plugs into the AI you already use -->
# What it does, today

Not a roadmap: this is what I run myself, right now

::left::

###### GitHub PR reviewer

- Security review on every pull request
- The colleague always on duty

::right::

###### MCP server

- Security reviews from your own Claude Code
- Plugs into the AI you already use

---
layout: default
---

<!-- Argus 3/6 (~30s): proof #1, the REAL PR review from argus-demo (public repo, PR #1): hardcoded creds + SQL injection, 2 findings on changed lines. Screenshot captured 2026-07, dark GitHub theme -->
<!-- Verbal: "repo demo, PR vera, review vera: la potete aprire anche voi" — github.com/argusappsec/argus-demo/pull/1 -->
# Straight from a real PR

<div class="mt-4 text-center">
  <BrowserFrame url="github.com/argusappsec/argus-demo/pull/1" body-bg="#0d1117">
    <img src="/argus-pr-review.png" class="max-h-56 w-auto" alt="Argus security review comment on a pull request" />
  </BrowserFrame>
</div>

---
layout: default
---

<!-- Argus 4/6 (~45s): proof #2, MEMORY in production, two beats on one slide. Beat 1: the teaching exchange on PR #1 (Davide tells Argus the creds are placeholders, Argus confirms it updated its knowledge). CLICK. Beat 2: PR #2's review, where it applies the rule by itself. This is the anatomy's Memory bullet, live -->
<!-- HITL bonus, say it: the skip was a HUMAN decision — the judgment stayed human, the agent carries it forward. Callback: "vi ricordate Memory nell'anatomia? Eccola." -->
# And it remembers

<div class="relative mt-4 text-center">
  <BrowserFrame v-click-hide="1" url="github.com/argusappsec/argus-demo/pull/1" body-bg="#0d1117">
    <img src="/argus-teaching.png" class="max-h-56 w-auto" alt="Teaching Argus: the credentials are placeholders" />
  </BrowserFrame>
  <BrowserFrame v-click="1" url="github.com/argusappsec/argus-demo/pull/2" body-bg="#0d1117" class="absolute top-0 left-1/2 -translate-x-1/2">
    <img src="/argus-memory.png" class="max-h-56 w-auto" alt="On the next PR, Argus applies the rule by itself" />
  </BrowserFrame>
</div>

---
layout: default
---

<!-- Argus 5/6 (~45s): rung ③ pre-assembled — the toolbox, built in and wired the safe way. Title is a direct callback to the "The toolbox" label on the rung ③ slide -->
<!-- Delivery precision: bash doesn't hallucinate, the MODEL does — with no shell exposed it can't improvise commands, only call the typed tools it was given (ADR 0006, public in the repo) -->
# The toolbox, built in

<v-clicks>

- **Scanners included**: semgrep, gitleaks and friends, wrapped as typed Go tools
- **Behind every review**: findings come from the tools, the model reasons on them
- **No shell to improvise**: the model can only call the tools it was given

</v-clicks>

---
layout: center
---

<!-- Argus 6/6 (~45s): CTA, humble. Verbal: "se ci buttate un occhio, una stellina fa piacere" -->
# Use it. Fork it. Study it.

If you take a look, a ⭐ is appreciated

<div class="mt-8 flex flex-col items-center gap-3">
  <QRCode value="https://github.com/argusappsec/argus" :size="140" dark="#eae5df" light="#080807" />
  <span class="text-xs font-mono" style="color: #7E7874;">github.com/argusappsec/argus</span>
</div>

---
layout: section
label: "04 / Closing"
transition: fade
---

# Closing

---
layout: statement
---

<!-- Closing 1/4 (~45s): the threat, flipped. Verbal callback to GTG-1002: "vi ricordate l'80-90%? Era un coding agent, lo stesso tipo di tool che usate ogni giorno. Era dall'altra parte." Pause, click -->
<!-- The reveal completes the opening kicker "same tool, other side": now it's on YOUR side too -->
# Attackers already have AI.

<v-click>

# <span style="color: var(--accent);">Now, so do you.</span>

</v-click>

---
layout: default
---

<!-- Closing 2/4 (~1.5min): the homework, one action per thread of the talk: Run=rung ①, Write=rung ② + knowledge base, Wire=rung ③, Verify=HITL thesis, Star=the fun one. Verbal: "questa è la vostra to-do di lunedì mattina" -->
# Your Monday morning

<v-clicks>

- **Run** a ready-made security skill on your repo: zero code, works today
- **Write** your rules down: your own skill, ADRs, a living CONTEXT.md
- **Wire** deterministic eyes into your AI: MCP, scanners
- **Verify** every finding yourself: the judgment stays human
- **Star** Argus: just for fun, and a ⭐ helps a lot

</v-clicks>

---
layout: default
---

<!-- Closing 3/4 (~30s): the no-excuses sweep for the browser-only crowd, right before the manifesto -->
# No CLI agent? Start anyway

<v-clicks>

- **A scoped audit prompt** beats nothing: one surface, one question, the relevant code
- **Demand verifiable findings**: file, line, why; refuse vibes
- **Upgrade when ready**: the ladder starts where you are

</v-clicks>

---
layout: statement
---

<!-- Closing 4/4 (~45s): THE manifesto, the very last thing they read before Thank you. SKILL in caps is a deliberate double meaning: the ability AND the SKILL.md they saw all talk long. Verbal wind-up: "e ricordatevi: ormai..." Callback to opening "Training: security is a skill": the time just got shorter. Deliver slow, let it sit -->
# Security is not a privilege.

<v-click>

# <span style="color: var(--accent);">It's a SKILL.</span>

</v-click>

---
layout: cover
---

# Thank you

exit 0

<div class="absolute bottom-20 right-20 flex flex-col items-center gap-3">
  <QRCode value="https://links.davideimola.dev" :size="140" dark="#eae5df" light="#080807" />
  <span class="text-xs font-mono" style="color: #7E7874;">links.davideimola.dev</span>
</div>
