---
theme: ./theme
title: "GreenOps: Bridging the Gap Between DevOps and Sustainability"
highlighter: shiki
transition: slide-left
mdc: true
website: links.davideimola.dev
handle: DavideImola
layout: intro
logoHeader: /logo.svg
introImage: /me.png
---

```go {all|3|4-5|6|7-8|9-13} twoslash
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

# A few years ago...

<div class="flex justify-center items-center mt-10">
    <img class="w-130" src="/56KModem.jpg" />
</div>

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# Now...

<div class="flex justify-center items-center mt-10">
    <img class="w-130" src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmhiMnMwd2ZnaDg1Y2R6c3JvZ2NjeXE1b2Z3ZHl5Y3U1ODBvcTNlaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fBEMsUeGHdpsClFsxM/giphy.webp" />
</div>

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# What's changed?

<v-clicks>

- <mdi-database-alert /> From simple HTML and CSS pages to Single Page Applications 
- <mdi-hammer-wrench /> More complex applications and more content (images, videos, etc.)
- <mdi-account-details /> More users and more data to manage
- <mdi-shield-off /> Scalability and security are more important than ever
- <mdi-application-braces-outline /> Spreading of services and applications across multiple environments

</v-clicks>

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
layout: statement
---

It's just a site, right?

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# A few numbers...

- **4 billion+** people use internet every day
- **up to 4%** greenhouse emissions to double by 2025
- **3rd** on the podium for electricity demand
- **1% global electricity** use just in data centers
- **356% growth** in webpage weight
- **196% growth** in internet speed

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# Analyze the environmental impact

- **316Kg (700 pounds)** CO<sub>2</sub> produced per year based on 120,000 page views
- **Same as 1,109Km (700 miles)** traveled on an airplane
- **Same as 2,377Km (1,470 miles)** traveled by car

<div v-click class="mt-10">
This is only one website: <strong>fridaysforfuture.org</strong>
</div>

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
layout: statement
---
 
Is this useful only for our planet?

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# Absolutely not!

By working on the environmental impact of our applications, we can also:

<v-clicks>

- **Reduce costs** for hosting and data transfer
- **Improve performance** and user experience
- **Improve SEO** and visibility
- **Improve security** and compliance
- **Improve the reputation** of our brand

</v-clicks>

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
layout: statement
---

So, what can we do?

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# We can do better on our applications!

<v-clicks>

- <mdi-package-down /> Reducing the bundle size (three shaking, compression, minification, etc.)
- <mdi-multimedia /> Optimizing images and videos
- <mdi-download-box /> Load only what is needed
- <mdi-cached /> Cache and reuse resources
- <mdi-database-alert /> Use efficient algorithms and data structures
- <mdi-lightning-bolt /> Use less energy-intensive technologies (GO, Rust, etc.)

</v-clicks>


---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# But at the beginning...

...we were talking about GreenOps.

Of course, all the optimizations we have seen are part of the GreenOps philosophy.

Because GreenOps is not just about reducing the environmental impact of our cloud, but also depends on how we build and manage our applications.

But there is also also a lot of work to do on the infrastructure side.

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# Reducing the infrastructure bundle size

let's take a look at the Dockerfile of a Node.js application for example.

````md magic-move
```dockerfile{*|1}
FROM node:22

COPY . .

RUN npm install

CMD ["node", "index.js"]
```

```dockerfile{1|*|5}
FROM node:22-slim ' use a distroless or slim image ' 

COPY . .

RUN npm install

CMD ["node", "index.js"]
```

```dockerfile{5|*|3}
FROM node:22-slim

COPY . .

RUN npm install --production ' install only production dependencies '

CMD ["node", "index.js"]
```

```dockerfile{3,7}
FROM node:22-slim

COPY package.json package-lock.json ./ 

RUN npm install --production

COPY src/ ./ ' copy only the things we need '

CMD ["node", "index.js"]
```
````

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# Infrastructure optimization

<v-clicks>

- Relies on **CDN** to serve and cache images and videos closer to the user
- Use **Serverless** to scale only when needed (AWS Lambda, Google Cloud Functions, etc.) 
- Monitor and optimize the **energy consumption** and **usage** of the cloud resources
- Select the right **data center** and **region** based on the demand and the energy consumption
- Seek for alternative projects (f.e. we moved from **Pulsar** to **NATS** and we have reduced the load for about **50%**)

</v-clicks>

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# Dear developers...

...it's time to sleep well!

Let's be honest, how much do we waste on keeping our applications up and running 24/7 in a development environment?

We can use tools like **Kubernetes** to scale our applications based on the demand and reduce the resources used when they are not needed.

**Knative**, **Horizontal Pod Autoscaling**, and **KubeGreen** can help us to reduce the energy consumption on a Kubernetes cluster.

Also, **FinOps** tools can help us to reduce all the waste in the cloud.

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
---

# In conclusion...

... I know that it's not easy to change the way we work and the way we build our applications.

But we can start with small steps and small changes, and we can make a big difference.

We can't change the world in one day, but we can start to make it better.

If you want to learn more: https://envirotechnical.eu/

---
transition: slide-left
handle: DavideImola
logoHeader: /logo.svg
website: links.davideimola.dev
layout: center
---

# Thank you for your attention!
