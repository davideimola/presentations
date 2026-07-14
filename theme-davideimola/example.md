---
theme: ./
title: "slidev-theme-davideimola — example"
highlighter: shiki
transition: slide-left
mdc: true
layout: cover
defaults:
  website: davideimola.dev
---

# Talk Title

go run talk.go --topic="your subtitle here"

---
layout: intro
introImage: /theme/me.png
github: davideimola
bluesky: "@davideimola.dev"
linkedin: davideimola
---

<WhoAmI />

---
layout: default
---

# Content slide

A regular slide with text, list items, and inline code.

- First point with `inline code` embedded in text
- Second point with **bold text**
- Third point with a [link example](#)

> Use blockquotes to highlight quotes or callouts

---
layout: default
---

# Typography — weight & style

- **bold** — `**text**`
- *italic* — `*text*`
- ***bold italic*** — `***text***`
- ~~strikethrough~~ — `~~text~~`

---
layout: default
---

# Typography — decorations & code

- <u>underline</u> — `<u>text</u>`
- <mark>highlight</mark> — `<mark>text</mark>`
- `inline code` — `` `text` ``
- [link example](#) — `[text](#)`

---
layout: default
---

# Heading hierarchy

# H1 — JetBrains Mono Bold
## H2 — Semibold
### H3 — Semibold
###### H6 — comment-style label

---
layout: default
---

# Badges <Badge>default</Badge> <Badge type="accent">accent</Badge> <Badge type="success">success</Badge> <Badge type="warning">warning</Badge>

Use badges inline to label technologies, status, or versions.

- Go <Badge type="accent">v1.23</Badge> — latest stable release
- Feature X <Badge type="warning">beta</Badge> — not production ready
- Migration <Badge type="success">done</Badge> — completed last sprint

---
layout: default
---

# Callouts

<Callout type="note">Use this for neutral context or background information.</Callout>

<Callout type="tip">This is a best practice or recommended approach.</Callout>

<Callout type="warning">Pay attention — this might have side effects.</Callout>

<Callout type="danger">Breaking change — requires immediate action.</Callout>

---
layout: default
---

# Chat mockup

Simulate an AI chat exchange — for prompts, anti-patterns, or dialogue examples.

<Chat>
  <ChatBubble user>is my app secure?</ChatBubble>
  <ChatBubble>Great question! It looks quite secure to me 👍</ChatBubble>
</Chat>

---
layout: default
---

<Rungs :active="2" label="optional label" />

# Step indicator — Rungs

Keeps the audience oriented inside a multi-step section: active step lit, every other step neutral.

- `<Rungs :active="2" />` — 4 steps by default
- `<Rungs :active="3" :total="5" />` — custom total
- `<Rungs :active="2" label="real case" />` — optional suffix label
- Inline in a sentence: step <RungBadge :n="1" /> works today — `<RungBadge :n="1" />`

---
layout: default
---

# Ladder — the map

Vertical map of a multi-step section, same visual language as `<Rungs>`.

<Ladder class="mt-4">
  <LadderRung v-click :n="1" title="First step">what this step gives you</LadderRung>
  <LadderRung v-click :n="2" title="Second step">what this step gives you</LadderRung>
  <LadderRung v-click :n="3" title="Third step">what this step gives you</LadderRung>
</Ladder>

---
layout: default
---

# Ladder — compact

With `<Ladder compact>` each rung is a single line: use it when the ladder grows past 4-5 rungs.

<Ladder compact class="mt-4">
  <LadderRung :n="1" title="First step">what this step gives you</LadderRung>
  <LadderRung :n="2" title="Second step">what this step gives you</LadderRung>
  <LadderRung :n="3" title="Third step">what this step gives you</LadderRung>
  <LadderRung :n="4" title="Fourth step">what this step gives you</LadderRung>
  <LadderRung :n="5" title="Fifth step">what this step gives you</LadderRung>
  <LadderRung :n="6" title="Sixth step">what this step gives you</LadderRung>
</Ladder>

---
layout: default
---

# Click animations — v-click

Reveal content step by step. Each `v-click` advances on <kbd>Space</kbd> or <kbd>→</kbd>.

<v-clicks>

- First point — visible immediately
- Second point — appears on first click
- Third point — appears on second click

</v-clicks>

<v-click>

<Callout type="tip">This callout appears after all list items.</Callout>

</v-click>

---
layout: default
---

# Keyboard shortcuts — kbd

Use `<kbd>` to show keyboard shortcuts in your slides.

- Advance: <kbd>Space</kbd> or <kbd>→</kbd>
- Go back: <kbd>←</kbd>
- Overview: <kbd>O</kbd>
- Fullscreen: <kbd>F</kbd>
- Open terminal: <kbd>Ctrl</kbd>+<kbd>`</kbd>
- Run command: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>

---
layout: default
---

# Table

| Column A      | Column B      | Column C   |
|---------------|:-------------:|-----------:|
| Row one       | centered      | right      |
| Row two       | value         | `42`       |
| Row three     | other value   | `1337`     |

---
layout: default
---

# Code with step highlighting

```go {all|1-3|5-9}
type Repository[T any] interface {
  FindByID(ctx context.Context, id uuid.UUID) (T, error)
  Save(ctx context.Context, entity T) error
}

type userRepository struct {
  db *sql.DB
}

func (r *userRepository) FindByID(ctx context.Context, id uuid.UUID) (User, error) {
  // ...
}
```

---
layout: section
label: "01 / section"
transition: fade
---

# Section Break

Visual separator between talk sections

---
layout: statement
---

# A bold statement

---
layout: statement
---

# Setup line.

<v-click>

# <span class="accent">Payoff line, in accent.</span>

</v-click>

---
layout: fact
---

# 17+

talks & conferences

---
layout: default
---

# Stat grid

Big numbers side by side — each `<Stat>` takes a value, a description (slot) and an optional source.

<StatGrid class="mt-12">
  <Stat v-click value="17+" source="Source A · 2026">talks & conferences</Stat>
  <Stat v-click value="42" source="Source B · 2026">the answer to everything</Stat>
  <Stat v-click value="9k+" source="Source C · 2024">lines of YAML written</Stat>
</StatGrid>

---
layout: quote
---

# "What you learn, you must share."

Cit. — davideimola.dev/about

---
layout: center
---

# Centered slide

Horizontally and vertically centered content

---
layout: two-cols
---

# Two Columns

Use this to compare concepts or pair text with code.

- Left point one
- Left point two
- Left point three

::right::

```go
// Right side — code example
func NewService(repo Repository) *Service {
  return &Service{repo: repo}
}
```

---
layout: two-cols-header
---

# Title spanning both columns

::left::

Left column content — text, lists, context.

- First point
- Second point

::right::

```go
// Right column — code
func example() error {
  return nil
}
```

---
layout: split-code
---

###### concept

# Repository Pattern

Separates data access logic from business logic. The domain layer depends on an abstraction, not a concrete implementation.

<Badge type="accent">Go</Badge> <Badge>DDD</Badge>

::right::

```go
type UserRepository interface {
  FindByID(ctx context.Context, id uuid.UUID) (User, error)
  Save(ctx context.Context, u User) error
}

type userRepo struct{ db *sql.DB }

func (r *userRepo) FindByID(
  ctx context.Context,
  id uuid.UUID,
) (User, error) {
  // query db...
}
```

---
layout: code-hero
---

###### spot the bug

```go {all|6}
func getReport(w http.ResponseWriter, r *http.Request) {
  user := session.From(r)
  report := db.FindReport(chi.URLParam(r, "id"))

  canAccess := user.Role == "admin" ||
    user.Prefs.SharedReports // ← the user decides?

  if !canAccess {
    http.Error(w, "forbidden", http.StatusForbidden)
    return
  }
  json.NewEncoder(w).Encode(report)
}
```

---
layout: image-right
image: /theme/me.png
---

# Image Right

Image on the right, content on the left.

- Point one
- Point two
- Point three

---
layout: image-left
image: /theme/me.png
---

# Image Left

Image on the left, content on the right.

- Point one
- Point two
- Point three

---
layout: terminal
title: "~/project $ go run main.go"
---

```sh
$ go run main.go
> starting HTTP server on :8080
> connected to database
> loaded 42 routes

$ curl -s localhost:8080/health | jq
{
  "status": "ok",
  "version": "1.2.0"
}
```

---
layout: cover
---

# Thank you

exit 0

<div class="absolute bottom-20 right-20">
  <QRBlock value="https://links.davideimola.dev" />
</div>
