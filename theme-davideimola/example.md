---
theme: ./
title: "slidev-theme-davideimola — example"
highlighter: shiki
transition: slide-left
mdc: true
website: davideimola.dev
layout: cover
---

# Talk Title

go run talk.go --topic="your subtitle here"

---
layout: intro
introImage: /me.png
website: davideimola.dev
---

```go
func main() {
  me := Person{
    Name:      "Davide Imola",
    Role:      "Tech Lead",
    Company:   "RedCarbon SA",
    Community: "Schrödinger Hat",
    Location:  "Verona, Italy",
    Interests: []string{
      "Go", "DevOps", "Security", "Open Source",
    },
  }
}
```

---
layout: default
website: davideimola.dev
---

# Content slide

A regular slide with text, list items, and inline code.

- First point with `inline code` embedded in text
- Second point with **bold text**
- Third point with a [link example](#)

> Use blockquotes to highlight quotes or callouts

---
layout: default
website: davideimola.dev
---

# Typography — weight & style

- **bold** — `**text**`
- *italic* — `*text*`
- ***bold italic*** — `***text***`
- ~~strikethrough~~ — `~~text~~`

---
layout: default
website: davideimola.dev
---

# Typography — decorations & code

- <u>underline</u> — `<u>text</u>`
- <mark>highlight</mark> — `<mark>text</mark>`
- `inline code` — `` `text` ``
- [link example](#) — `[text](#)`

---
layout: default
website: davideimola.dev
---

# Heading hierarchy

# H1 — JetBrains Mono Bold
## H2 — Semibold
### H3 — Semibold
###### H6 — comment-style label

---
layout: default
website: davideimola.dev
---

# Table

| Column A      | Column B      | Column C   |
|---------------|:-------------:|-----------:|
| Row one       | centered      | right      |
| Row two       | value         | `42`       |
| Row three     | other value   | `1337`     |

---
layout: default
website: davideimola.dev
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
website: davideimola.dev
---

# Section Break

Visual separator between talk sections

---
layout: statement
website: davideimola.dev
---

# A bold statement

---
layout: fact
website: davideimola.dev
---

# 17+

talks & conferences

---
layout: quote
website: davideimola.dev
---

# "What you learn, you must share."

Cit. — davideimola.dev/about

---
layout: center
website: davideimola.dev
---

# Centered slide

Horizontally and vertically centered content

---
layout: two-cols
website: davideimola.dev
---

# Two Columns

Use this layout to compare concepts or show code alongside text.

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
layout: image-right
image: /me.png
website: davideimola.dev
---

# Image Right

Image on the right, content on the left.

- Point one
- Point two
- Point three

---
layout: image-left
image: /me.png
website: davideimola.dev
---

# Image Left

Image on the left, content on the right.

- Point one
- Point two
- Point three

---
layout: terminal
title: "~/project $ go run main.go"
website: davideimola.dev
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
website: davideimola.dev
---

# Thank you

Q&A

`davideimola.dev` · `@DavideImola`
