---
theme: ./theme
title: "Gophers Gone Domain-Driven: A Tale of Golang and DDD"
highlighter: shiki
transition: slide-left
mdc: true
website: links.davideimola.dev
handle: DavideImola
layout: intro
logoHeader: /logo.svg
introImage: /me.png
---

```go {all|3|4-5|6|7-8|9-14|12} twoslash
func main() {
    me := Person{
        Name:      "Davide Imola",
        Role:      "Software Engineer",
        Company:   "RedCarbon SA",
        Community: "Schrödinger Hat",
        Location:  "Verona, Italy",
        Site:      "https://links.davideimola.dev",
        Interests: []string{
            "Kubernetes",
            "Go",
            "Open Source",
            "BBQ",
            "Cybersecurity",
        },
    } 
}
```

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# Once upon a time...

...an epic journey began. A journey that would take us through the realms of Golang and Domain-Driven Design.

Our hero, the Gopher, during his adventures, one day stumbled upon a mysterious land called Domain-Driven Design.

What secrets would he uncover? What challenges would he face? And most importantly, what would he learn?

Join me (your's today Bard) on this epic quest as we explore the world of Gophers Gone Domain-Driven!

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# The Domain-Driven Land

A land where the domain is law, and the code is its faithful servant.

<div grid="~ cols-2 gap-4">
<div>

Here, the Gopher learned that the key to building great software lies in understanding the domain.

By modeling the domain accurately, we can create software that reflects the real world, making it easier to reason about
and maintain.

</div>

<div class="flex items-center justify-center">
    <img class="w-70" src="/go-ddd/kingdom.png" />
</div>
</div>

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# The Fabled Boundaries

At the edge of the domain lie the <span v-mark="{ at: 1, color: '#f00', type: 'underline' }">Bounded Context</span>,
territories clearly marked to divide the land into distinct kingdoms.

<v-switch>
  <template #1> 
<div>
<h3>Orderland</h3>

In the kingdom of Orderland, everyone is focused on one thing: keeping track of
orders.

Here, Order has a very specific meaning. They track the items included, the customer who placed it, the total price, and
the status.

Orderland uses a term called “Order ID” to uniquely identify each order. For Orderland, an Order ID is sacred; it
represents an entire transaction, and every citizen of Orderland knows what it means.
</div>
</template>
<template #2>
<div>
<h3>Inventoryia</h3>

On the other side of the mountains lies the kingdom of Inventoryia. Here, they don’t care about who placed an order or
when it was shipped. Instead, they’re focused on managing stock and supplies—making sure items are available, in the
right quantities, and restocked as needed.

In Inventoryia, they also have a concept called “Order,” but it means something very different here! In Inventoryia, an
“Order” refers to a purchase order—the items they need to bring in from suppliers to keep their inventory full. It has
its own set of details: supplier names, quantities, costs, and delivery dates. And while they also have IDs, their
“Order ID” refers specifically to supply orders rather than customer purchases.
</div>
</template>
</v-switch>

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# One Language, to Rule Them All

As any kingdom is free to use its own language, rules, and models that make sense within its borders. They must agree on
a common language when they need to communicate.

This common language is called the <span v-mark="{ at: 1, color: '#f00', type: 'underline' }">Ubiquitous
Language</span> - a shared vocabulary that everyone in the kingdom understands.

From the dwarves in the mines (developers in their code) to the elves in the forests (business stakeholders in their
meetings), everyone uses the same terms and concepts to ensure clear communication and understanding.

The language becomes part of the kingdom's "spellbooks"! It's used in code, documentation, and conversations, ensuring
that everyone is on the same page and reducing the risk of misunderstandings.

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# Mixing the Kingdoms

But what happens when the kingdoms need to work together?

When a visitor from Orderland tries to talk to someone from Inventoryia, they might find themselves speaking different
when mentioning the word "Order ID".

Without understanding the cultural context, the Inventoryian may assume this Order ID refers to a purchase order for
stocking goods, not a customer purchase.

As you might guess, this could lead to all sorts of chaos—incorrect items being shipped, double restocks, or even
shortages, with the two kingdoms misunderstanding each other’s needs and goals.

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# Boundaries and Translations

To keep peace and clarity, the leaders of Orderland and Inventoryia established a Bounded Context for each kingdom,
agreeing that:

- Orderland’s “Order” will only ever refer to customer purchases.
- Inventoryia’s “Order” will only ever mean supply restocking.

When they need to communicate, they use translators (often known as context mapping in DDD).
Translators help convert Orderland's “Order ID” for purchases into Inventoryia's “Supply Order ID” for restocking, so
each kingdom can understand the other without confusion.

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# The Hexagonal Castle

In the heart of the Domain-Driven Land lies the <span v-mark="{ at: 1, color: '#f00', type: 'underline' }">Hexagonal Architecture</span>.

This architectural pattern is like a castle with six sides, each representing a different layer of the system:

- **Domain Model**: The core of the castle, where the domain logic resides.
- **Application Services**: The gatekeepers of the castle, handling requests and coordinating the domain.
- **Adapters**: The bridges between the castle and the outside world, translating requests and responses.
- **Ports**: The drawbridges that allow external systems to interact with the castle.
- **Infrastructure**: The moat and walls that protect the castle, handling persistence, communication, and other
  technical concerns.

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# Pros of DDD

Let's take a look at some of the benefits of Domain-Driven Design:

<v-clicks>

- **Clearer Communication**: By using a common language, everyone can understand each other better.
- **Better Modeling**: By focusing on the domain, we can create more accurate models that reflect the real world.
- **Easier Maintenance**: With a clear domain model, it's easier to maintain and update the codebase.
- **Reduced Risk**: By focusing on the domain, we can reduce the risk of misunderstandings and miscommunications.
- **Scalability**: DDD can help us build more scalable systems by focusing on the domain and its boundaries.

</v-clicks>


---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# Cons of DDD

Let's take a look at some of the challenges of Domain-Driven Design:

<v-clicks>

- **Complexity**: DDD can be complex, especially for large systems with many domains and bounded contexts.
- **Learning Curve**: DDD has a steep learning curve, and it can take time to fully understand and implement.
- **Huge Effort**: DDD requires a significant effort to implement correctly, and it may not be suitable for all projects.

</v-clicks>

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# A few suggestions from your friendly Bard

If you're considering embarking on your own journey into the world of Domain-Driven Design, here are a few tips to help

<v-clicks>

- **Start Small**: Begin by identifying a single domain and creating a bounded context around it.
- **Collaborate**: Work closely with domain experts and stakeholders to ensure you're modeling the domain accurately.
- **Iterate**: Don't try to model the entire domain at once. Start with a small part and iterate as you learn more!! All the kingdoms were not built in a day.
- **Learn**: Take the time to learn about DDD and its concepts. There are many great resources available to help you get started.

</v-clicks>

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
layout: center
---

# Thank you for your attention!

## Questions?
