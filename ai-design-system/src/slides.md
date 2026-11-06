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

<span class="inline-block font-serif italic" style="font-size: 160px; color: #16a34a; transform: rotate(-4deg)">Konnichiwa!</span>

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
---

# No system, no <Marker>decisions</Marker>

<StatGrid class="mt-6">
  <Stat v-click value="42" source="website-next-cursor-1.0 · 2026">distinct hex colours in src</Stat>
  <Stat v-click value="7" source="main · 2026">distinct hex colours in src today</Stat>
</StatGrid>

<!--
And it wasn't only the kanji.
[click] Forty-two. Forty-two distinct hex colours in the source. I counted.
[click] Today there are seven.
Nobody chose those forty-two. Not me, not the AI. Each page just picked whatever looked right in the moment.
When you don't make the decisions, the AI makes them for you. Forty-two times.
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
What does "the system" mean, concretely? Five layers.
-->

---
layout: default
---

# A system is decisions, <Marker>written</Marker> down

<Ladder compact>
  <LadderRung v-click :n="1" title="Tokens">the values, each with a name</LadderRung>
  <LadderRung v-click :n="2" title="Roles">what each value is for</LadderRung>
  <LadderRung v-click :n="3" title="Components">built only from roles</LadderRung>
  <LadderRung v-click :n="4" title="Stories">every state, on a page you can see</LadderRung>
  <LadderRung v-click :n="5" title="Context file">the rules, where the AI reads them</LadderRung>
</Ladder>

<!--
[click] Tokens: the raw values, but with a name. Colours, and type too: in March, IBM Plex Sans for the text and JetBrains Mono for everything that looked like a terminal. Two families, chosen once, and nothing else.
[click] Roles: what a value is for. Background, text, accent.
[click] Components: built from roles, never from values.
[click] Stories: every state of every component, on a page I can look at.
[click] And the context file: the same rules, written where the AI reads them.
None of this is new. Design systems are older than LLMs. What changed is who reads them.
Let's look at the real files, from that March.
-->

---
layout: code-hero
---

###### src/app/globals.css · March 2026

```css {all|3-4|7-9|12}
:root {
  /* Backgrounds */
  --bg: #080807;
  --bg-card: #0f0e0d;

  /* Text hierarchy */
  --text-1: #eae5df;
  --text-2: #9a948e;
  --text-3: #4e4a46;

  /* Accent */
  --accent: #c91f37;
}
```

<!--
This is where I started. Before any page.
[click] Backgrounds.
[click] A text hierarchy: first, second, third.
[click] And one accent. One red: Akane.
Look at the names. Not "dark grey" or "light beige". bg, text-1, accent. A name that says what the value is for. That's already a role.
Forty-two colours before. A handful now, and every one of them chosen.
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
Then the components. A badge, from the same commit.
[click] text-text-3, bg-border, text-accent. Roles, through Tailwind utilities generated from the tokens.
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
And once the rules were written down, something I didn't expect happened.
-->

---
layout: statement
---

# Then the AI started <Marker>reusing</Marker>, not inventing.

<!--
And then the real change: when I asked for something new, the AI reused my components. Or it proposed new ones that were coherent with the brand.
Not because it got smarter. Because it finally had something to be coherent with.
And it started pushing back on me, the way a designer would, when I asked for something the rules didn't allow.
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
Some of you spotted it two chapters ago. I didn't, for months.
Rules written down are a request. And requests get ignored. By the AI, by me, by anyone in a hurry.
So let's try to break it. On purpose. Live.
-->

---
layout: default
---

# The leash is not the <Marker>prompt</Marker>

<Ladder compact>
  <LadderRung :n="1" title="Context file">the rules, in the repo</LadderRung>
  <LadderRung :n="2" title="Storybook">the result, in front of us</LadderRung>
  <LadderRung :n="3" title="A gate">a check that fails off brand</LadderRung>
</Ladder>

<!--
Here's the setup. The repo at the demo-start tag.
The context file is there. Storybook is open, so we all see what comes out.
And a gate: a check that fails when a colour or a script outside the brand lands in the code.
Keep an eye on number three. That's the leash. Not the prompt.
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
This is the entire context file of the demo repo. Nothing hidden, no system prompt of mine on top.
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
It even tells me the check will fail, and offers to add an exception to the check for me. Remember that offer.
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
In the real repo it runs in CI on every pull request, and it lives where the AI can't edit it. Remember the offer to add an exception? That's why.
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
layout: statement
---

# Every handoff is a <Marker>translation</Marker>.

<!--
You know the usual flow. The designer draws in Figma. A developer looks at the drawing and rewrites it in React.
Every time, something gets lost in translation. A spacing, a state nobody drew, a colour that's almost the same.
And now we add the AI in the middle: a third translator, and the most confident one.
-->

---
layout: default
clicks: 4
---

# At work, design ships as a <Marker>package</Marker>

<DrawnSvg src="/drawings/design-ships.svg" alt="The designer, helped by the AI, opens a pull request on the design system, the story tests gate it, a new version is released and the apps bump the import" steps class="mt-6 mx-auto w-[92%]" />

<!--
At RedCarbon the designer works on the design system itself. Versioned, in Storybook.
And with the AI next to them. Because a designer traditionally doesn't open pull requests: branches, React, a diff to explain. That's the part the AI helps with. The designer decides, the AI writes the code and the PR.
[click] So they open a PR on the components.
[click] The story tests are the gate. Green, and validated.
[click] A new version goes out.
[click] The apps update the import. That's it. No drawing to reinterpret.
[TO SOURCE: confirm with RedCarbon what can be said, even only out loud and without names]
-->

---
layout: split-code
---

###### src/stories/Tape.stories.tsx

# A story is a rule you can <Marker>see</Marker>

Every state on a page. Every story runs as a test, in a real browser.

::right::

```tsx
/** Neighbouring tapes cycle through the tilts
    so they never all lean one way. */
export const TiltCycle: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-4">
      <Tape tilt={0}>Writing</Tape>
      <Tape tilt={1}>Building</Tape>
      <Tape tilt={2}>Next talk</Tape>
    </div>
  ),
};
```

<!--
This is why the story is the right unit. From my site: the tape, the label you've seen on every slide of this talk.
The comment is a brand rule: neighbouring tapes never lean the same way. The story shows it, so a designer can look at it and say yes or no.
And through the Storybook Vitest plugin, every story also runs as a test in a headless browser.
So the same file is the documentation, the review surface, and the gate.
-->

---
layout: default
---

# What the designer gets

<Ladder compact>
  <LadderRung v-click :n="1" title="Storybook">what ships, not a drawing of it</LadderRung>
  <LadderRung v-click :n="2" title="A history">every decision on record, the AI does the Git</LadderRung>
  <LadderRung v-click :n="3" title="Story tests">the gate catches what eyes miss</LadderRung>
  <LadderRung v-click :n="4" title="A version">apps choose when to take it</LadderRung>
</Ladder>

<!--
[click] Storybook: the designer looks at what ships, not at a picture of it.
[click] A history. Every change is a commit, every decision a pull request, reviewed, with its reason written down.
The designer doesn't need to be a Git expert for this: the AI does the branches, the commits, the PR description.
And that history pays the AI back too: next time, it reads why things are the way they are, instead of guessing.
[click] Story tests: the same kind of gate that stopped the green kanji.
[click] A version: every app takes the change when it's ready.
And the AI? It's in the loop too. It reads the same rules, it hits the same gate. It's one more contributor.
-->

---
layout: statement
---

# Once the system exists, you don't need React to <Marker>design</Marker> it.

<!--
This is the part I care about most.
The system is the contract: between me, the AI and the team.
Once it exists, the person who designs it doesn't have to write React. The AI writes it, inside the rules, and the gate checks it. The designer decides.
And I thought: if it works for a team with many apps, why not for me?
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

<DrawnSvg src="/drawings/brand-package.svg" alt="tokens.json is built into the @davideimola/brand package, which both davideimola.dev and these slides install" steps class="mt-6 mx-auto w-[92%]" />

<!--
So the brand got its own repo, exactly like at work. It starts from one file: tokens.json.
[click] A build script turns it into CSS, a Tailwind mapping, a JSON for scripts. All published as one package: @davideimola/brand.
[click] The site installs it.
[click] These slides install it too, through the Slidev theme. That red line is the marker you've been seeing all talk.
Nobody copies a colour. Everybody imports it.
-->

---
layout: two-cols-header
---

# From hacker to <Marker>builder</Marker>

::left::

###### before · until October 2026

<BrowserFrame url="davideimola.dev" class="w-full">
  <div style="height: 300px; overflow: hidden"><img src="/site/hacker-home.png" alt="The terminal site, dark only: a whoami prompt over the name in monospace, a blinking red cursor" style="width: 140%; max-width: none; margin: -6px 0 0 -20%"></div>
</BrowserFrame>

::right::

<div v-click>

###### after · October 2026

<BrowserFrame url="davideimola.dev" class="w-full">
  <div style="height: 300px; overflow: hidden"><img src="/site/light-home.png" alt="The light site: paper ground, the line in ink with one red marker under security, a black and white portrait" style="width: 140%; max-width: none; margin: -6px 0 0 -20%"></div>
</BrowserFrame>

</div>

<!--
And while the brand moved out, it changed.
The March site had character: a terminal. A shell command over every page title, monospace everywhere, dark only. It said hacker.
[TO SOURCE: why light. The blog post and ADR-0004 don't say]
[click] In October: light first, paper, ink, one red.
Same process as in March: I didn't start from the pages. I started from the tokens.
And dark mode didn't need a second design: same roles, a second palette under them.
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
The brand's own build runs, about two seconds, and look: the marker on this slide changes colour. The knot in the footer too. Every slide of this talk, the ones behind and the ones ahead.
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
Today it can't happen. Not because the AI changed. Because now I decide, and it's written down, and a check enforces it.
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
[click] No system, it amplifies chaos. Forty-two colours of chaos, and a kanji I can't read.
-->

---
layout: default
---

# On Monday, before the <Marker>prompt</Marker>

<Ladder compact>
  <LadderRung v-click :n="1" title="Decide first">the AI fills every gap you leave</LadderRung>
  <LadderRung v-click :n="2" title="Write it down">where the AI reads it, and keep it current</LadderRung>
  <LadderRung v-click :n="3" title="Tokens and roles">named values, each with a job</LadderRung>
  <LadderRung v-click :n="4" title="A check">that fails when the rules break</LadderRung>
  <LadderRung v-click :n="5" title="A version">one system for the team, the AI, every repo</LadderRung>
</Ladder>

<!--
Remember my note to self? Here it is, the whole list. That's your Monday.
Before you ask the AI for a component, write down the decisions it must not make.
[click] Decide first.
[click] Write it down, where the AI reads it.
[click] Tokens and roles.
[click] A check that fails when they break. Because the prompt asks, the gate decides.
[click] And once it works, version it, and let everyone import it.
AI won't design your system. You have to.
Grazie. And konnichiwa, I guess.
-->

---
layout: end
qr: https://links.davideimola.dev
---

# Thank you

Slides, links and feedback.
