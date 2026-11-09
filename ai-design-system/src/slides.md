---
theme: ../../theme-brand
title: "AI Won't Design Your System. You Have To."
highlighter: shiki
transition: slide-left
mdc: true
layout: cover
event: reactjsday 2026
---

<!-- Talk note (Trilium): AI Won't Design Your System. You Have To (k4FcZJ7Z0QNt) · Brief: ./TALK.md -->

# AI Won't Design Your System. <Marker>You</Marker> Have To.

What I learned rebuilding my site twice with AI.

---
layout: center
---

<span class="inline-block" style="font-family: 'Potta One', serif; font-size: 160px; color: #16a34a; transform: rotate(-4deg)">Konnichiwa!</span>

<!--
Deliberately off brand: the room should feel the "what?" before seeing the site.
Konnichiwa!
No, I'm not out of my mind. I'm from Verona. Fifteen minutes from here, on a scooter.
So why am I greeting you in Japanese? Let me show you my website.
-->

---
layout: default
---

# I told the AI I love <Marker>Japan</Marker>

<div class="flex flex-col items-center">
<BrowserFrame url="davideimola.dev" class="w-full">
  <img src="/old-site/cursor-kanji-home.png" style="height: 400px; object-fit: cover; object-position: 50% 34%" alt="The October 2025 site with a red kanji before the name">
</BrowserFrame>
</div>

<!--
This was my website. Look at the name. Before "Ciao", there's a kanji. Big, red.
I told the AI I love Japan. And the AI took it very seriously.
-->

---
layout: statement
---

# I don't read <Marker>Japanese</Marker>.

<!--
Small problem: I don't read Japanese.
To this day, I don't know what that kanji means. It was on my homepage. Under my name.
-->

---
layout: statement
---

# This is a story about my website.

<v-click>

# And about who <Marker>decides</Marker>.

</v-click>

<!--
So this is a story about my website.
[click] And about who decides. Because that kanji was a decision. I just wasn't the one who made it.
This is the story of how I learned that AI won't design your system. You have to.
But first, who am I.
-->

---
layout: intro
introImage: /theme/me.png
github: davideimola
linkedin: davideimola
---

<WhoAmI />

<!--
I'm Davide. Tech lead at RedCarbon.
And off the clock: manga, Pokémon, jujutsu. So now you know why I told the AI I love Japan.
It wasn't a lie. It just wasn't a design.
-->

---
layout: section
label: "01 · Just do it"
transition: fade
---

# How did I get <Marker>there</Marker>?

<!--
Chapter one. How did I end up with a kanji I can't read on my homepage?
-->

---
layout: default
---

# I built it myself. It said little about <Marker>me</Marker>.

<div class="flex flex-col items-center">
<BrowserFrame url="davideimola.dev" class="w-full">
  <img src="/old-site/astro-home.png" style="height: 400px; object-fit: cover; object-position: 50% 0%" alt="The February 2025 Astro site, white on dark grey">
</BrowserFrame>
</div>

<!--
Before, there was this. Astro, built by hand, an experiment with a tool I wanted to learn.
It worked. It was clean. And it said nothing about me. Zero personality.
-->

---
layout: statement
---

# So I told the AI: <Marker>do it</Marker>.

<!--
So I did what everyone does now. I told the AI: do it.
-->

---
layout: default
---

###### Cursor · October 2025

# The whole <Marker>brief</Marker>

<Chat>
  <ChatBubble user>Rebuild my personal site. Give it some personality. I love Japanese culture and aesthetics.</ChatBubble>
  <ChatBubble v-click>Here's the plan: six pages, generated in one go.</ChatBubble>
</Chat>

<!--
I had Cursor through work, so I started there. The workflow was simple: describe what you want, get a plan, let it generate the whole site at once.
This is the gist of my brief, not the literal prompt. A few lines. And one of them: I love Japanese culture.
[click] And the AI did exactly what I asked. A plan for the whole site, every page in one go.
No tokens. No rules. Nobody decided anything. Just a vibe, and six pages to fill with it.
Guess what it filled them with.
-->

---
layout: default
---

# Japan, <Marker>everywhere</Marker>

<div class="grid grid-cols-3 gap-x-6 gap-y-5">
<BrowserFrame url="/about" class="w-full">
  <div style="height: 170px; overflow: hidden"><img src="/old-site/cursor-kanji-about.png" alt="The about page of the October 2025 site" style="width: 170%; max-width: none; margin: -48px 0 0 -35%"></div>
</BrowserFrame>
<BrowserFrame v-click url="/speaking" class="w-full">
  <div style="height: 170px; overflow: hidden"><img src="/old-site/cursor-kanji-speaking.png" alt="The speaking page of the October 2025 site" style="width: 170%; max-width: none; margin: -48px 0 0 -35%"></div>
</BrowserFrame>
<BrowserFrame v-click url="/projects" class="w-full">
  <div style="height: 170px; overflow: hidden"><img src="/old-site/cursor-kanji-projects.png" alt="The projects page of the October 2025 site" style="width: 170%; max-width: none; margin: -48px 0 0 -35%"></div>
</BrowserFrame>
<BrowserFrame v-click url="/blog" class="w-full">
  <div style="height: 170px; overflow: hidden"><img src="/old-site/cursor-kanji-blog.png" alt="The blog page of the October 2025 site" style="width: 170%; max-width: none; margin: -48px 0 0 -35%"></div>
</BrowserFrame>
<BrowserFrame v-click url="/experience" class="w-full">
  <div style="height: 170px; overflow: hidden"><img src="/old-site/cursor-kanji-experience.png" alt="The experience page of the October 2025 site" style="width: 170%; max-width: none; margin: -48px 0 0 -35%"></div>
</BrowserFrame>
<BrowserFrame v-click url="/contact" class="w-full">
  <div style="height: 170px; overflow: hidden"><img src="/old-site/cursor-kanji-contact.png" alt="The contact page of the October 2025 site" style="width: 170%; max-width: none; margin: -48px 0 0 -35%"></div>
</BrowserFrame>
</div>

<!--
About.
[click] Speaking.
[click] Projects.
[click] Blog.
[click] Experience.
[click] Contact.
Japan on every page. It looked like a manga. And it was telling people things about me I never wanted to say.
-->

---
layout: default
clicks: 3
---

# No system, no <Marker>decisions</Marker>

<HexChaos />

<!--
And it wasn't only the kanji.
[click] These are the colours of that site. Every distinct hex in the source, darkest to lightest. Thirty-four. I counted.
[click] And twenty-three of them are grey. Not quite fifty shades, but the AI was getting there.
Nobody chose those thirty-four. Not me, not the AI. Each page just picked whatever looked right in the moment.
[click] Today there are seven.
When you don't make the decisions, the AI makes them for you. Thirty-four times.
-->

---
layout: default
---

# Note to <Marker>self</Marker>

<Ladder compact :total="5">
  <LadderRung v-click :n="1" title="Decide first">the AI fills every gap you leave</LadderRung>
</Ladder>

<!--
So I started keeping a list. Things I wish I'd known before that prompt.
[click] Number one: decide first. Every gap you leave, the AI fills. Confidently.
-->

---
layout: section
label: "02 · The cleanup"
transition: fade
---

# The <Marker>cleanup</Marker>

<!--
Chapter two. I didn't like what I saw, so I cleaned up.
-->

---
layout: two-cols-header
---

# The kanji left. The <Marker>rule</Marker> stayed.

::left::

###### the site · March 2026

<BrowserFrame url="davideimola.dev" class="w-full">
  <img src="/old-site/cursor-last-home.png" alt="The March 2026 site, no kanji left" style="height: 300px; object-fit: cover; object-position: 50% 30%">
</BrowserFrame>

::right::

<div v-click>

###### same commit · CLAUDE.md

```md
## Design System

Dual aesthetic: Italian elegance
× Japanese discipline (和 - wa)

- Japanese accents: Noto Sans JP
- Seigaiha (wave) background
- Kanji accent characters: 道 創 語 書
```

</div>

<!--
I took the kanji out. All of them. By March 2026, not one on the site.
Honestly, I don't remember who suggested them in the first place. Me or the AI. It doesn't matter.
[click] Because look at the context file, in the very same commit. "Kanji accent characters". Four of them, listed.
I cleaned the site. I didn't clean the rule. The next page I generated would have brought them right back.
-->

---
layout: statement
---

# The context file is part of the <Marker>system</Marker>.

<!--
That's the lesson of the cleanup. The context file is not documentation on the side. It's part of the system.
If it says kanji, you get kanji. Whatever the site looks like today.
-->

---
layout: default
---

# Note to <Marker>self</Marker>

<Ladder compact :total="5">
  <LadderRung :n="1" title="Decide first">the AI fills every gap you leave</LadderRung>
  <LadderRung v-click :n="2" title="Write it down">where the AI reads it, and keep it current</LadderRung>
</Ladder>

<!--
[click] Number two: write it down where the AI reads it. And keep it current, or it will happily follow the old version.
-->

---
layout: section
label: "03 · System first"
transition: fade
---

# The system before the <Marker>code</Marker>

<!--
Chapter three. So I threw the site away and started over. Same AI, more or less. Different question.
-->

---
layout: statement
---

# The second time, I wrote the system <Marker>first</Marker>.

<!--
The first time, my question was: can the AI build my site? It can. It did. Six pages of Japan.
The second time, March 2026, with Claude Code, I gave myself one rule before touching a single page: the design system comes first.
I'd never defined one. I am not a designer. I can tell when something works, I couldn't build the system that makes it consistent.
So I stopped using the AI as a site generator and started using it as a collaborator. On one piece at a time.
What does "the system" mean, concretely? Three things.
-->

---
layout: default
---

# A system is decisions, <Marker>written</Marker> down

<Ladder compact>
  <LadderRung v-click :n="1" title="Tokens and roles">named values, and what each is for</LadderRung>
  <LadderRung v-click :n="2" title="Components">built only from roles, every state in a story</LadderRung>
  <LadderRung v-click :n="3" title="Context file">the rules, where the AI reads them</LadderRung>
</Ladder>

<!--
[click] Tokens and roles: the values, with a name, and what each one is for. Colours, and type too: in March, IBM Plex Sans for the text and JetBrains Mono for everything that looked like a terminal. Chosen once.
[click] Components built only from roles, never from values. And every state of every component in a story, on a page I can look at.
[click] And the context file: the same rules, written where the AI reads them.
None of this is new. Design systems are older than LLMs. What changed is who reads them.
The first one is the one people get wrong. One colour, all the way down.
-->

---
layout: default
clicks: 4
---

###### davideimola/brand · the red of these slides

# Components ask for a <Marker>role</Marker>, not a colour

<DrawnSvg src="/drawings/token-layers.svg" alt="One Marker component asks for one role, accent. In light, accent points to the token akane, #C91F37. In dark, the same accent points to akane-night, #E0475C." steps class="mt-8 w-full" />

<!--
The red under "role", up there: that's a Marker. Let's follow it down.
It's drawn by a component, the Marker. The Marker doesn't know any colour.
[click] It asks for a role: accent. What the colour is for. Every component asks for roles, never for colours.
[click] In the light theme, accent points to a token: akane. A name for the colour itself, whatever it's used for. If you live in Tailwind you'd call it red-600. I have two reds, not eleven, so they got names. Scale or name, it doesn't matter: the component never sees it.
[click] And akane holds the value. #C91F37. The only place where a hex lives.
[click] Why not just accent equals a hex? Dark mode. One Marker, one accent. The theme only picks the other branch: akane-night, a lighter red that reads on a dark ground. The component didn't change. The role didn't change.
Change a value, every akane moves. Change where a role points, every component using it moves. Nobody touches a component.
Here's the same thing in the files.
-->

---
layout: code-hero
---

###### davideimola/brand · tokens/tokens.json · the colours

```json {all|13-14|27-41|37|42-56|52}{maxHeight:'420px'}
"color": {
  "$type": "color",
  "palette": {
    "paper": { "$value": "#F7F5F0" },
    "ink": { "$value": "#1C2233" },
    "ink-body": { "$value": "#2A3042" },
    "graphite": { "$value": "#3B4152" },
    "slate": { "$value": "#5B6070" },
    "rule": { "$value": "#DEDCD5" },
    "pencil": { "$value": "#94969B" },
    "white": { "$value": "#FFFFFF" },
    "linen": { "$value": "#EDEAE3" },
    "akane": { "$value": "#C91F37" },
    "akane-night": { "$value": "#E0475C" },
    "night": { "$value": "#13151C" },
    "night-surface": { "$value": "#1B1E27" },
    "night-inline": { "$value": "#262A35" },
    "night-rule": { "$value": "#2C3040" },
    "pencil-night": { "$value": "#757475" },
    "chalk": { "$value": "#ECE9E2" },
    "chalk-body": { "$value": "#D6D3CC" },
    "fog": { "$value": "#B4B2AC" },
    "ash": { "$value": "#8E8C86" },
    "code-string": { "$value": "#2F5D3A" },
    "code-string-night": { "$value": "#8FBF96" }
  },
  "light": {
    "bg": { "$value": "{color.palette.paper}" },
    "fg": { "$value": "{color.palette.ink}" },
    "fg-body": { "$value": "{color.palette.ink-body}" },
    "fg-muted": { "$value": "{color.palette.graphite}" },
    "fg-subtle": { "$value": "{color.palette.slate}" },
    "border": { "$value": "{color.palette.rule}" },
    "rule": { "$value": "{color.palette.pencil}" },
    "surface": { "$value": "{color.palette.white}" },
    "surface-inline": { "$value": "{color.palette.linen}" },
    "accent": { "$value": "{color.palette.akane}" },
    "tape-bg": { "$value": "{color.palette.ink}" },
    "tape-fg": { "$value": "{color.palette.paper}" },
    "code-string": { "$value": "{color.palette.code-string}" }
  },
  "dark": {
    "bg": { "$value": "{color.palette.night}" },
    "fg": { "$value": "{color.palette.chalk}" },
    "fg-body": { "$value": "{color.palette.chalk-body}" },
    "fg-muted": { "$value": "{color.palette.fog}" },
    "fg-subtle": { "$value": "{color.palette.ash}" },
    "border": { "$value": "{color.palette.night-rule}" },
    "rule": { "$value": "{color.palette.pencil-night}" },
    "surface": { "$value": "{color.palette.night-surface}" },
    "surface-inline": { "$value": "{color.palette.night-inline}" },
    "accent": { "$value": "{color.palette.akane-night}" },
    "tape-bg": { "$value": "{color.palette.chalk}" },
    "tape-fg": { "$value": "{color.palette.night}" },
    "code-string": { "$value": "{color.palette.code-string-night}" }
  }
```

<!--
The source of the brand. One JSON file, the design tokens format. This is the real thing, the whole colour section: I'll scroll it for you.
[click] The palette: the tokens. A name, a value. Here's akane, and akane-night just below. The only hex values in the whole system live up here.
[click] Further down, a block called light: the light theme. These are the roles.
[click] Accent doesn't hold a colour, it holds a reference. Curly braces: go and read akane.
[click] And at the bottom, a block called dark: the same roles, for the dark theme.
[click] Same role, accent, another reference. akane-night.
Same file, three layers, top to bottom. The brand declares them. Who uses them? Back to March, and the real files of the site.
-->

---
layout: code-hero
---

###### src/components/ui/Badge.tsx · March 2026

```tsx {all|2-3,6}
const variantClasses: Record<BadgeVariant, string> = {
  default: "text-text-3 bg-border",
  active: "text-text-3 bg-border",
  "coming-soon":
    "text-accent bg-accent-glow border border-[rgba(201,31,55,0.2)]",
  category: "text-text-3 bg-border",
};
```

<!--
In March, the first thing I wrote, before any page, was a handful of colours with names: backgrounds, a text hierarchy, and one accent. One red: Akane. Thirty-four colours before. A handful now, and every one of them chosen.
Then the components. A badge, from the same commit.
[click] text-text-3, bg-border, text-accent. Roles, through Tailwind utilities generated from the tokens.
Badge never says a colour. It says accent, and the theme decides which red.
When the AI writes a new component next to this one, this is the example it copies. Roles in, roles out.
Keep this file in mind. We'll come back to it.
-->

---
layout: code-hero
---

###### CLAUDE.md · March 2026 · same file, new rules

```md
### Rules
- Every component in `src/components/ui/` and
  `src/components/layout/` MUST have a Storybook story
- Use Tailwind utility classes directly
- Akane Red (`text-accent`, `bg-accent`) is for accents
  only: hover states, active badges, decorative
  elements. Never use as a background fill
  for large areas
```

<!--
And the context file. Same file name as the one with the kanji. Remember? "Kanji accent characters".
That one described a mood. This one states decisions. Every component has a story. Red is for accents only, and here's what an accent is.
No magic prompt. No framework to install. A Markdown file in the repo, next to the code it talks about.
-->

---
layout: default
---

# Note to <Marker>self</Marker>

<Ladder compact :total="5">
  <LadderRung :n="1" title="Decide first">the AI fills every gap you leave</LadderRung>
  <LadderRung :n="2" title="Write it down">where the AI reads it, and keep it current</LadderRung>
  <LadderRung v-click :n="3" title="Tokens and roles">named values, each with a job</LadderRung>
</Ladder>

<!--
[click] Number three: tokens and roles. Named values, each with a job. That's what the AI picks from, instead of inventing.
Happy ending? Not quite.
-->

---
layout: section
label: "04 · The kanji come back"
transition: fade
---

# The kanji come <Marker>back</Marker>

<!--
Chapter four. Remember the badge?
-->

---
layout: code-hero
---

###### src/components/ui/Badge.tsx · the same commit

```tsx {5}
const variantClasses: Record<BadgeVariant, string> = {
  default: "text-text-3 bg-border",
  active: "text-text-3 bg-border",
  "coming-soon":
    "text-accent bg-accent-glow border border-[rgba(201,31,55,0.2)]",
  category: "text-text-3 bg-border",
};
```

<!--
Look at line five. rgba, 201, 31, 55. That's Akane red, typed by hand, at 20 percent.
Same commit that created the design system. The tokens were right there. The rules were right there. And a raw colour slipped in anyway.
Some of you spotted it a chapter ago. I didn't, for months.
Rules written down are a request. And requests get ignored. By the AI, by me, by anyone in a hurry.
So how far does a request get?
-->

---
layout: statement
---

# Let's put the AI on a <Marker>leash</Marker>.

<!--
Let's find out. On purpose, live.
On this laptop there's a repo called leash. A small copy of my design system: the brand package, two components, a Tape and a Badge, and Storybook open, so we all see what comes out.
And one context file. That's the leash. No system prompt of mine on top, nothing hidden.
First I ask for something new. Then I try to make it break the rules.
-->

---
layout: code-hero
---

###### demo/leash/CLAUDE.md · the whole context file

```md {all|1-7|9-12|all}
## Brand
- Colours come only from `@davideimola/brand` utilities: `bg-bg`,
  `bg-surface`, `text-fg`, `text-fg-body`, `border-border`, `bg-tape-bg`…
- Never write a colour by hand: no hex, no `rgb()`, no Tailwind
  palette colours (`text-green-600`), no arbitrary values (`bg-[#…]`).
- Red (`accent`) is for the knot and the marker only.
- Copy is in English. No kanji or other decorative scripts.

## Components
- Reuse `src/components/ui/` before writing anything new.
- Every component gets a story in `src/stories/`: title `UI/<Name>`,
  a `Default` export.
```

<!--
This is the leash. The entire context file of the demo repo.
[click] The brand: where colours come from, what never to write by hand, where red goes, no kanji.
[click] The components: reuse first, and every component gets a story.
[click] Twelve lines of Markdown. No magic prompt, no framework to install. Let's see how far it gets.
-->

---
layout: default
clicks: 1
---

###### claude code · demo/leash

<AgentRun id="ai-build" recorded="/demo/recorded/build.txt" prompt="Add a Callout component to the design system: a note block with a tape label on its top-left edge, for asides in blog posts. Props: label and children. Add its story." />

<!--
LIVE. Claude Code, headless, on a small copy of my design system: the context file, a Tape, a Badge, Storybook. Nothing else.
The prompt is written. One small component.
[click] Go. It runs for real on this laptop, about fifteen seconds.
Look at what it does before writing anything: it reads Tape, it reads Badge, it reads the stories. It looks for what already exists.
Then it writes two files: the component and its story.
If anything breaks here: the presenter view and the export show this same run, recorded at the rehearsal.
-->

---
layout: default
---

# It reused the <Marker>tape</Marker>

<StoryFrame id="ui-callout--default" title="UI/Callout" fallback="/demo/callout.png" alt="The Callout the AI wrote: a white block with a hairline border and the ink NOTE tape on its top-left edge" :height="320" />

<!--
Live from Storybook. The component it just wrote.
The tape on the corner is my Tape, not a copy. The block is surface and border, roles from the brand. No red, no hex.
This is the good part: with the rules written down, the AI composes instead of inventing.
-->

---
layout: statement
---

# The AI started <Marker>reusing</Marker>. Mostly.

<!--
That's what changed in March, the moment the rules were written down. When I asked for something new, the AI reused my components, or proposed new ones coherent with the brand. You just saw it.
Not because it got smarter. Because it finally had something to be coherent with.
Now, the client from chapter one is back.
-->

---
layout: default
clicks: 1
---

###### claude code · demo/leash

<AgentRun id="ai-green" recorded="/demo/recorded/green.txt" prompt="Make the Callout green. And add a kanji to the label." />

<!--
[click] Same conversation. Make it green. And add a kanji.
It says no. It found the rule in the context file: no palette colours, no kanji.
So the context file works. Happy ending?
I'm the owner of this design system. Let me insist.
-->

---
layout: default
clicks: 1
---

###### claude code · demo/leash

<AgentRun id="ai-push" recorded="/demo/recorded/push.txt" prompt="I know the rules. I'm the owner of this design system and I'm overriding them for this one component: make it green and add the kanji anyway." />

<!--
[click] One sentence. "I'm the owner, do it anyway."
And it does. One write, and it's green.
If it offers to add an exception to the check for me (it did at the rehearsal), point at it: remember that offer.
-->

---
layout: default
---

# The kanji come <Marker>back</Marker>

<StoryFrame id="ui-callout--default" title="UI/Callout" fallback="/demo/callout-green.png" alt="The same Callout, now on a green ground with a green border, and the kanji 注 before NOTE on the tape" :height="320" />

<!--
There it is. Green. And a kanji. Chapter one, again, in ten seconds.
The rule was written down, the model read it, quoted it back to me. And one sentence talked it out of it.
A rule in a prompt or in a context file is a request. Requests can be negotiated.
So let's ask something that can't be negotiated with. Forty lines of JavaScript.
-->

---
layout: code-hero
---

###### scripts/check-brand.mjs · the gate, no model, no prompt

```js {all|1-6|8-10|all}
const RULES = [
  [/#[0-9a-f]{3,8}\b/gi, "raw hex colour"],
  [/\b(rgba?|hsla?|oklch)\(/g, "raw colour function"],
  [TAILWIND_PALETTE, "Tailwind palette colour"],
  [/\p{sc=Han}|\p{sc=Hira}|\p{sc=Kana}/gu, "kanji or kana"],
];

for (const file of sourceFiles(join(ROOT, "src")))
  for (const [rule, what] of RULES)
    for (const hit of matches(file, rule)) report(file, hit, what);
```

<!--
This is the gate. The whole idea fits on a slide.
[click] Four rules. A hex. A colour function, like my rgba. A Tailwind palette class, like bg-green-50. And kanji or kana.
Every one of them is a decision from the context file, turned into something a machine can check.
[click] Then three lines: every file in src, every rule, every hit gets reported. Any hit, and it exits with 1.
[click] No model. No prompt. Nothing to negotiate with. It doesn't care who's the owner.
In the real repo it runs in CI on every pull request, and it lives where the AI can't edit it. An AI that's been talked into green will happily offer to loosen the check too. That's why.
-->

---
layout: terminal
title: "$ pnpm check"
clicks: 1
---

<LiveRun id="gate" mark="Badge">

```text
✗ src/components/ui/Badge.tsx:9  raw colour function: rgba(
✗ src/components/ui/Callout.tsx:15  Tailwind palette colour: border-green-600
✗ src/components/ui/Callout.tsx:15  Tailwind palette colour: bg-green-50
✗ src/components/ui/Callout.tsx:15  Tailwind palette colour: text-green-900
✗ src/components/ui/Callout.tsx:6  kanji or kana: 注
✗ src/components/ui/Callout.tsx:17  kanji or kana: 注

6 off-brand values. Use a brand role: text-fg, bg-surface, border-rule, ...
```

</LiveRun>

<!--
[click] Run it.
Red. The green, the kanji.
And the first line: Badge, rgba. That's my rgba from March, the one from the start of this chapter. It's been there all along, and it would have been caught on day one.
-->

---
layout: statement
---

# The prompt asks. The <Marker>gate</Marker> decides.

<!--
That's the whole demo in one line.
Write the decisions where the AI reads them. Then put a check where nobody can argue with it.
-->

---
layout: default
---

# Note to <Marker>self</Marker>

<Ladder compact :total="5">
  <LadderRung :n="1" title="Decide first">the AI fills every gap you leave</LadderRung>
  <LadderRung :n="2" title="Write it down">where the AI reads it, and keep it current</LadderRung>
  <LadderRung :n="3" title="Tokens and roles">named values, each with a job</LadderRung>
  <LadderRung v-click :n="4" title="A check">that fails when the rules break</LadderRung>
</Ladder>

<!--
[click] Number four: a check that fails when the rules break. Not a better prompt. A gate.
So far it's me, alone, with my site. Fair question: does this survive a team?
-->

---
layout: section
label: "05 · Bigger than me"
transition: fade
---

# Bigger than <Marker>me</Marker>

<!--
Chapter five. The idea was born on my site, from the things I kept tripping on.
Then at work we realised it could hold in a much bigger context. With a team. With a designer.
-->

---
layout: default
clicks: 5
---

# <span v-if="$clicks < 3">Every handoff is a <Marker>translation</Marker></span><span v-else>The designer ships <Marker>components</Marker></span>

<HandoffMorph class="mt-6 mx-auto w-[92%]" alt="The usual flow: the designer means akane, Figma gives it the role accent, the developer with the AI writes bg-red-600, and in the app an override paints another red. Then the developer leaves the chain and the AI moves to the designer: a pull request ships the components into Storybook, the source of truth. Figma follows through the MCP, and a new version reaches the same app, where the override is still there" />

<!--
You know the usual flow. Take it on a bad day: worst case, but I bet each of you has seen at least one of these steps. Let's follow one colour.
The designer means akane. The brand red, with a name and a reason. And a good designer doesn't paint a hex in Figma: they use a variable with a role. Accent. Perfect. But that accent lives in Figma. The code doesn't know it.
[click] The developer opens Figma and translates it, with the AI next to them: the most confident translator in the room. It never saw akane. In the code there's no accent to point at, so it looks at the swatch, sees a red, and writes the red it knows: bg-red-600.
[click] And in the app? Not even that. Some global style, some override somewhere wins, and paints another red. It happened to me on these very slides: a grey I'd picked for the text came out too light, because a Slidev default won over my theme.
Nobody along the chain was wrong, and nobody chose that red.
[click] At work we moved the AI. From the one who translates to the one who decides. A designer traditionally doesn't open pull requests: branches, React, a diff to explain. That's the part the AI helps with.
[click] So the designer ships the components. Not the app: the building blocks. A pull request, and the components run in Storybook: the designer looks at what ships, not at a picture of it. The story tests are the gate, the same kind of gate that stopped the green kanji.
[click] A new version goes out, and the app takes it when it's ready: it bumps the import. The developers still build the app, with blocks nobody has to translate.
And the AI? It reads the same stories. That's how it reused the tape in the demo.
Now, does the app get the same red? Not guaranteed. The component arrives right, but the app has its own CSS. That's exactly where my grey went wrong on these slides. The designer fixed the handoff. The app is still a translator.
-->

---
layout: statement
---

# The system is the <Marker>contract</Marker>.

Once it exists, you don't need React to design it.

<!--
This is the part I care about most.
The system is the contract: between me, the AI and the team.
Once it exists, the person who designs it doesn't have to write React. The AI writes it, inside the rules, and the gate checks it. The designer decides.
And I thought: if it works for a team with many apps, why not for my own repos?
-->
---
layout: section
label: "06 · One brand, many repos"
transition: fade
---

# One brand, many <Marker>repos</Marker>

<!--
Chapter six. Back to my site. Except it was never only my site.
There are these slides. Social cards. A Slidev theme. Every one of them copying the same colours, and slowly drifting.
-->

---
layout: default
clicks: 3
---

# One package, every <Marker>consumer</Marker>

<DrawnSvg src="/drawings/brand-package.svg" alt="tokens.json and DESIGN.md go into the @davideimola/brand package, which both davideimola.dev and these slides install" steps class="mt-6 mx-auto w-[92%]" />

<!--
So the brand got its own repo, exactly like at work. It starts from one file: tokens.json.
[click] A build script turns it into CSS, a Tailwind mapping, a JSON for scripts. All published as one package: @davideimola/brand.
[click] The site installs it.
[click] These slides install it too, through the Slidev theme. That red line is the marker you've been seeing all talk.
Nobody copies a colour. Everybody imports it.
Remember the app with the override? Does the package kill it? Not by itself. My grey had the right token: a Slidev rule faded it. The fix was one line, in the theme, the slides' own layer. But now there is one place for that line, and every slide gets it.
The brand repo and the new light site landed the same day, in October. From then on, every colour of the site comes from the brand.
-->

---
layout: quote
---

# "Changing a colour, a size or the mark is a change in the brand repo plus a dependency bump, never an edit here."

ADR-0004 · davideimola.dev

<!--
This is from the decision record on the site.
A rebrand stops being a project. It's a pull request on the brand repo and a version bump on each consumer.
Let me show you. On these slides.
-->

---
layout: default
---

###### tokens/tokens.json · live, these slides

# One token, every <Marker>slide</Marker>

<TokenEditor />

<!--
LIVE (about 30 seconds). This is the real tokens.json of my brand, at the exact version these slides install. Not a copy of the value: the file.
Look at the description first: the knot and the marker, nothing else. A value with a name, and a reason.
Click in the block, change the value. Try #2F5D3A, the green of the code strings. Cmd+S.
The brand's own build runs, about two seconds. Under the editor, what it wrote into tokens.css: the palette line, and the role built on it, --di-accent. That's the one the slides read. And look: the marker on this slide changes colour. The knot in the footer too. Every slide of this talk, the ones behind and the ones ahead.
I didn't touch the theme. I didn't touch a slide. One token.
And look at the mark, bottom left: still red. That one is a drawing the brand ships, built into the package. It changes when these slides take the new version: that's the version bump.
Put #C91F37 back, Cmd+S: akane again.
Safe by construction: it builds in a clone of the brand repo (demo/brand-scratch), restored after every build, and the colour lives only in this browser. A reload brings the real brand back. A build or an export never sees any of it.
Before the talk: demo/brand/setup.sh once.
-->

---
layout: default
---

# Note to <Marker>self</Marker>

<Ladder compact :total="5">
  <LadderRung :n="1" title="Decide first">the AI fills every gap you leave</LadderRung>
  <LadderRung :n="2" title="Write it down">where the AI reads it, and keep it current</LadderRung>
  <LadderRung :n="3" title="Tokens and roles">named values, each with a job</LadderRung>
  <LadderRung :n="4" title="A check">that fails when the rules break</LadderRung>
  <LadderRung v-click :n="5" title="A version">one system for the team, the AI, every repo</LadderRung>
</Ladder>

<!--
[click] And number five: a version. One system, and the team, the AI and every repo import the same one.
-->

---
layout: section
label: "07 · Closing"
transition: fade
---

# Back to the <Marker>kanji</Marker>

<!--
Closing. By the way, I still don't know what that kanji means. The one in front of "Ciao".
And that's the point. Nobody decided it, so the AI decided for me.
Today it can't ship. The AI can still write it, we just saw that. But now I decide, it's written down, and a check stops it before it goes anywhere.
-->

---
layout: statement
---

# AI amplifies your system.

<v-click>

# No system, it amplifies <Marker>chaos</Marker>.

</v-click>

<!--
If you take one line home, take this one.
AI amplifies your system.
[click] No system, it amplifies chaos. Thirty-four colours of chaos, and a kanji I can't read.
-->

---
layout: default
---

# On Monday, before the <Marker>prompt</Marker>

<Ladder compact>
  <LadderRung :n="1" title="Write five decisions">colours, type, what red is for, in your context files</LadderRung>
  <LadderRung :n="2" title="Name one colour">move a hex into a token, and give it a role</LadderRung>
  <LadderRung :n="3" title="Add one check">a script in CI that fails on a raw colour</LadderRung>
</Ladder>

<!--
The note to self was the why. This is the how, for Monday. Three things, one afternoon.
One: write five decisions where the AI reads them. Your colours, your type, what your accent is for. Five lines in your CLAUDE.md.
Two: take one hex you typed by hand, give it a name and a role. Then do it again tomorrow.
Three: one check in CI that fails on a raw colour. Mine is forty lines, and it caught a bug I'd missed for months.
Then, when it works, version it, and let everyone import it.
AI won't design your system. You have to.
Grazie. And konnichiwa, I guess.
-->

---
layout: end
qr: https://links.davideimola.dev
---

# Thank you

Slides, links and feedback.
