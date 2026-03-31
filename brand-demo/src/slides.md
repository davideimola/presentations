---
theme: ../../theme-davideimola
title: "Brand Demo — slidev-theme-davideimola"
highlighter: shiki
transition: slide-left
mdc: true
website: davideimola.dev
handle: DavideImola
layout: cover
logoHeader: /logo.svg
---

# Titolo della presentazione

Una riga di sottotitolo che descrive il talk

---
layout: intro
introImage: /me.png
logoHeader: /logo.svg
website: davideimola.dev
handle: DavideImola
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
logoHeader: /logo.svg
website: davideimola.dev
handle: DavideImola
---

# Slide di contenuto

Una slide normale con testo, lista e codice inline.

- Primo punto con `codice inline` integrato nel testo
- Secondo punto con **testo in evidenza**
- Terzo punto con un [link di esempio](#)

> Nota: puoi usare blockquote per evidenziare citazioni o warning

---
layout: section
label: "01 / problema"
logoHeader: /logo.svg
website: davideimola.dev
handle: DavideImola
---

# Section Break

Separatore visivo tra le sezioni del talk

---
layout: default
logoHeader: /logo.svg
website: davideimola.dev
handle: DavideImola
---

# Slide con codice

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
layout: fact
logoHeader: /logo.svg
website: davideimola.dev
handle: DavideImola
---

# 17+

talks & conference al mio attivo

---
layout: quote
logoHeader: /logo.svg
website: davideimola.dev
handle: DavideImola
---

# "What you learn, you must share."

Cit. — davideimola.dev/about

---
layout: cover
logoHeader: /logo.svg
website: davideimola.dev
handle: DavideImola
---

# Grazie

#️ Q&A

`davideimola.dev` · `@DavideImola`
