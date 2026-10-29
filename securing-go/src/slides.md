---
theme: ../../theme-brand
title: "Securing Go for Production"
highlighter: shiki
transition: slide-left
mdc: true
layout: cover
event: GoLab 2026
---

# Securing Go for <Marker>Production</Marker>

Best practices, supply chain, testing

---
layout: intro
introImage: /theme/me.png
github: davideimola
linkedin: davideimola
---

<WhoAmI hiring />

---
layout: default
---

# Attacks now run at machine <Marker>speed</Marker>

<Ledger class="mt-8">
  <LedgerRow v-click value="80-90%" source="anthropic · nov 2025" :n="0">of a cyber espionage campaign,<br>run by an AI agent</LedgerRow>
  <LedgerRow v-click value="27s" source="crowdstrike gtr 2026" :n="1">the fastest breakout ever observed,<br>from first access to lateral movement</LedgerRow>
</Ledger>

<!-- ~1min. The why now, before the teaser. One row per click.
     Click 1: Anthropic, 2025-11-13: the AI performed "80-90% of the campaign", humans only at a few decision points. The agent was a coding agent, the same kind of tool you use every day. The "GTG-1002" name is not on the Anthropic news page: don't say it unless verified.
     Click 2: CrowdStrike Global Threat Report 2026: 27 seconds from initial access to moving to another system. It's the record, not the average: say "fastest".
     Sources verified 2026-07 for ai-defense.
     Bridge to the teaser: "They are fast, and they go for the holes we don't know we have. Like this one." -->

---
layout: code-hero
---

###### this shipped

# The bug you don't <Marker>know</Marker> you have

```go
func canManageOrg(u User, orgID string) bool {
	if u.IsSuperAdmin {
		return true
	}
	if orgID == "" {
		return true
	}
	return u.OrgID == orgID
}
```

<!-- ~30s. Go port of the real bug (the original was a GraphQL directive). Don't explain it here: the audience gets 10 seconds to spot it, then we move on. It comes back in section 01, on this same layout.
     Say it, it's not on the slide: "Thirteen months in production. Code review approved it. Tests were green. Hold that thought." -->

---
layout: statement
---

# The compiler won't save you. Your process might.

---
layout: default
---

# What we'll <Marker>cover</Marker>

<Ladder class="mt-6">
  <LadderRung v-click :n="1" title="The code you write">a real bug, and how we proved it</LadderRung>
  <LadderRung v-click :n="2" title="The code you use">dependencies, the checksum database, govulncheck</LadderRung>
  <LadderRung v-click :n="3" title="Make it routine">a checklist, CI, and skills for your agent</LadderRung>
</Ladder>

<!-- ~30s. The numbers match the section tapes. One click per section. -->

---
layout: section
label: "01 · the code you write"
transition: fade
---

# The code you write

---
layout: statement
---

# Go is safe by default.

<v-click>

# Your <Marker>application</Marker> isn't.

</v-click>

<!-- ~30s. Pause between the two lines. -->

---
layout: two-cols-header
---

# What the compiler can't <Marker>know</Marker>

::left::

###### go build checks

- Types
- Memory safety
- Bounds and nil, at runtime
- Data races, with `-race`

::right::

###### nobody checks

<v-clicks>

- Who may read this resource <Tape v-click="4" :n="0" :size="14" class="ml-2">bac</Tape>
- Where this request is going <Tape v-click="4" :n="1" :size="14" class="ml-2">ssrf</Tape>
- How much this request costs <Tape v-click="4" :n="2" :size="14" class="ml-2">dos</Tape>

</v-clicks>

<!-- ~1min. Left side: what Go gives you for free, be generous, it's a Go room.
     Right side, one click each: the three questions the next slides answer.
     Click 4, the tapes. Say it: "Let's look at a few examples." Say BAC in full the first time: broken access control. The 100% slide spells it out next. Then: where → trust boundaries (SSRF), how much → resource exhaustion, who → authorization, our bug story. -->


---
layout: split-code
---

###### trust boundaries

# The client chose this <Marker>URL</Marker>

<dl class="beats">
  <div><dt>the claim</dt><dd>Whatever the client typed.</dd></div>
  <div v-click="2"><dt>the attack</dt><dd>Ask for <code>169.254.169.254</code>, get cloud credentials.</dd></div>
  <div v-click="3"><dt>the fix</dt><dd>Allow-list the host. Deny the rest.</dd></div>
</dl>

::right::

````md magic-move
```go {all|2|3}
func preview(w http.ResponseWriter, r *http.Request) {
	target := r.URL.Query().Get("url")
	resp, err := http.Get(target) // 169.254.169.254?
	if err != nil {
		w.WriteHeader(http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()
	io.Copy(w, resp.Body)
}
```

```go {2-6|7}
func preview(w http.ResponseWriter, r *http.Request) {
	u, err := url.Parse(r.URL.Query().Get("url"))
	if err != nil || !allowed[u.Host] {
		w.WriteHeader(http.StatusForbidden)
		return
	}
	resp, err := client.Get(u.String())
	if err != nil {
		w.WriteHeader(http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()
	io.Copy(w, resp.Body)
}
```
````

<!-- ~1min30. SSRF as ONE example of client-controlled data, not a tutorial.
     Every ID, URL and header in a request is a claim, not a fact: net/http fetches whatever you hand it, internal IPs, cloud metadata, redirects included.
     Clicks 1-2: the claim (line 2) goes straight into the request (line 3).
     Click 3, the code morphs into the fix: check the claim before you act on it. Parse, then allow-list the host: anything not on the list is forbidden, deny by default again.
     Click 4, line 7: `client`, not http.Get. Not shown: its CheckRedirect runs the same allow-list on every redirect, or an allowed host can bounce you to 169.254.169.254.
     If you can't allow-list (user-supplied webhooks): resolve the host and reject private and link-local IPs at dial time, not before.
     appsec-audit in the skills repo (section 03) looks for this pattern. -->


---
layout: split-code
---

###### resource exhaustion

# Valid request. Unbounded <Marker>cost</Marker>.

<dl class="beats">
  <div><dt>the request</dt><dd>Well-formed, just bigger than planned.</dd></div>
  <div v-click="1"><dt>the cost</dt><dd><code>io.ReadAll</code> keeps it all in memory, until the process dies.</dd></div>
  <div v-click="2"><dt>the fix</dt><dd>One line sets the limit.</dd></div>
</dl>

::right::

````md magic-move
```go {all|2-3}
func upload(w http.ResponseWriter, r *http.Request) {
	// as big as the client wants
	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	store(body)
}
```

```go {2-3}
func upload(w http.ResponseWriter, r *http.Request) {
	// 1 MB, then Read fails
	r.Body = http.MaxBytesReader(w, r.Body, 1<<20)
	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	store(body)
}
```
````

<!-- ~1min15. Click 1: io.ReadAll reads whatever the client sends, all of it in memory. Click 2, the code morphs into the fix: one line, the limit.
     MaxBytesReader does not answer 413 on its own: Read fails with *http.MaxBytesError and the connection closes. For a proper 413, check it with errors.As.
     Same family: http.Server without ReadHeaderTimeout, unbounded goroutines per request, regex on user input.
     Seed for section 02, said not shown, optional: "Keep this one in mind." The payoff is "Valid zip. Unbounded cost.", same title, inside the standard library (archive/zip, CVE-2025-61728, super-linear file name indexing, CPU DoS). -->

---
layout: fact
---

# 100%

of the applications OWASP tested had some form of broken access control

<Tape :n="0" class="mt-6">owasp top 10:2025 · a01</Tape>


<!-- Exact wording on the A01 page: "100% of the applications tested were found to have some form of broken access control".
     Number one category, 1,839,701 occurrences, 40 CWEs.
     https://top10.owasp.org/2025/A01_2025-Broken_Access_Control
     (Don't quote the incidence %: 3.73% on the intro page vs 3.74% on A01.)
     Say it, don't show it: "Including ours." Deadpan, after a pause. Then on to the report: access control broken somewhere, nobody said where. -->

---
layout: default
---

<Rungs :active="1" :total="4" label="signal" />

<div class="signal">

# We knew something was wrong. Not <Marker>where</Marker>.

<div v-click class="signal__next">

# So we asked an AI.

</div>

</div>

<style>
/* Set like a statement, but on a default slide so the step indicator
   sits where it does on the other three steps of the story. */
.signal { height: 100%; max-width: 1080px; display: flex; flex-direction: column; justify-content: center; padding-bottom: 60px; }
.signal h1 { font-size: var(--di-type-display-size); line-height: var(--di-type-display-line-height); letter-spacing: var(--di-type-display-tracking); margin: 0; }
.signal__next { margin-top: 28px; }
</style>

<!-- ~20s. ONE line about the trigger: an external security report said access control was broken somewhere. It didn't say where.
     Don't dwell on "pen test": the point is what we did next. -->

---
layout: default
---

<Rungs :active="2" :total="4" label="hypothesis" />

# Assume the caller is <Marker>hostile</Marker>

<Chat>
  <ChatBubble user>Review our authentication and authorization layer. For each check, list the logic errors that could grant access to the wrong user. Assume the caller is hostile.</ChatBubble>
  <ChatBubble v-click>canManageOrg returns true when orgID can't be resolved. It also checks membership, never the admin role.</ChatBubble>
</Chat>

<!-- ~1min. The original prompts are gone: this one is reconstructed, say it out loud ("something like this").
     What matters is the shape: targeted on the auth layer, asking for logic errors, and the line in the title: assume the caller is hostile. Not "find bugs in my repo". -->

---
layout: code-hero
---

###### what the AI pointed at

```go {all|5-7|8}
func canManageOrg(u User, orgID string) bool {
	if u.IsSuperAdmin {
		return true
	}
	if orgID == "" {
		return true // org not resolved
	}
	return u.OrgID == orgID // membership, not role
}
```

<!-- ~1min30. The AI's answer, read on the code. Callback to the intro teaser ("Hold that thought"): did you spot it?
     Two logic errors, one click each.
     1) Fail-open: if the target org can't be resolved from the request, access granted. To anyone.
     2) Role never checked: membership is enough. A viewer can use admin-only features.
     Never exploited. About 13.5 months in production.
     Original was not Go: don't make it a point. "This bug compiles in every language." -->

---
layout: default
---

# Every test asked who gets <Marker>in</Marker>

| Case | Tested |
|---|:---:|
| Super admin manages any org | ✓ |
| Org admin manages their org | ✓ |
| Viewer manages their org | ✗ |
| Admin manages another org | ✗ |
| Org can't be resolved | ✗ |

<v-click>

**None asked who stays out.**

</v-click>

<!-- ~1min. THE meta-takeaway: why it survived 13 months. Review approved it, tests were green, because every test was a positive case.
     The three ✗ rows are exactly the tests on the next slide. -->

---
layout: split-code
---

<Rungs :active="3" :total="4" label="evidence" />

# Make it <Marker>red</Marker>

We asked for tests on who must be denied.

Generated by the AI. Read line by line by us.

::right::

```go {all|5-7}
func TestCanManageOrgDenies(t *testing.T) {
	viewer := User{OrgID: "acme"}
	admin := User{IsOrgAdmin: true, OrgID: "acme"}

	deny(t, "member, not admin", viewer, "acme")
	deny(t, "admin of another org", admin, "globex")
	deny(t, "org not resolved", admin, "")
}
```

<!-- ~1min. `deny` is a 4-line helper (t.Helper + t.Errorf("granted: %s", name) if access is granted), not shown. -->

---
layout: terminal
title: "$ go test -run TestCanManageOrgDenies"
---

```sh
--- FAIL: TestCanManageOrgDenies (0.00s)
    authz_test.go:16: granted: member, not admin
    authz_test.go:18: granted: org not resolved
FAIL
```

Two of three. That's not an opinion anymore.

<!-- ~30s. Real output from the Go port. Hypothesis → evidence. -->

---
layout: split-code
---

<Rungs :active="4" :total="4" label="guard" />

# Deny by <Marker>default</Marker>

Two explicit ways in. Everything else stays out, including the request we can't place.

Red to green, released right away.

::right::

```go {all|2-4|8}
func canManageOrg(u User, orgID string) bool {
	if orgID == "" {
		return false
	}
	if u.IsSuperAdmin {
		return true
	}
	return u.IsOrgAdmin && u.OrgID == orgID
}
```

<!-- ~1min. Note the order: the deny check comes BEFORE the super admin shortcut.
     The follow-up PR added negative tests, multi-role scenarios and edge cases to every authorization check, not only this one. -->

---
layout: statement
---

# We wrote those tests after we knew.

<v-click>

# What would have caught it on <Marker>day one</Marker>?

</v-click>

<!-- ~15s. The deny tests came from the AI's hypothesis: they guard a bug we had already found.
     The question that matters: what would have caught it before anyone told us where to look. -->

---
layout: default
clicks: 2
---

# Who picks the <Marker>inputs</Marker>?

<DrawnSvg src="/drawings/input-space.svg" alt="Inside the space of every possible input: three dots are the cases a table test writes by hand; a dashed grid adds every combination of the values you listed, the matrix; the fuzzer scatters inputs nobody listed outside the grid, and one of them, in red, breaks the rule" steps class="mt-4 mx-auto w-[92%]" />

<!-- ~45s. On enter: the table test. Three cases, picked by hand. Ours were all "who gets in".
     Click 1: the matrix. Every combination of the values you listed: super yes/no, admin yes/no, same org, other org. Better, and for this function it would have been enough.
     But it only holds values someone thought of. Nobody lists the empty org.
     Click 2: the fuzzer. Go makes up the inputs: flips the bools, cuts, adds, swaps characters in the strings. The red one is outside every list.
     What matrix and fuzzer share: you don't write an expected result per case, you write one rule and check it on every input. -->

---
layout: default
clicks: 3
---

# How a fuzzer <Marker>works</Marker>

<DrawnSvg src="/drawings/fuzz-loop.svg" alt="The fuzzer picks an input from its corpus, which starts from your seed, acme and acme, mutates it and runs the rule. If the rule holds, acme and globex for instance, and the input reached code no earlier input had, it goes back into the corpus to be mutated next. If the rule breaks, acme and an empty org, the fuzzer shrinks the input and saves it to testdata" steps class="mt-6 mx-auto w-[92%]" />

<p v-click="3" class="text-center mt-12">Hundreds of thousands of times a second, until the rule breaks or time runs out.</p>

<!-- ~1min. On enter: the corpus. At first it holds only the seed you give it, the happy path: an admin of acme on acme.
     Click 1: it picks an input from the corpus, mutates it (flips a bool, changes characters in a string) and runs the rule on it.
     Click 2, yes: the rule holds. "acme","globex": an admin of another org, denied, fine. Go instruments the code and knows which branches each input ran. If this one reached code no earlier input had, it goes into the corpus and new mutations start from it too; if not, it's dropped.
     On our function: the seed only runs the last line. super=true opens the IsSuperAdmin branch, an empty org opens the orgID == "" branch, where the bug is. The corpus ends up with one input per branch, and the fuzzer mutates from there: coverage-guided, not blind. It's the "new interesting: 3" on the terminal slide after the fix.
     Click 3, no: the rule breaks. "acme","": granted with no org. It shrinks the input to the smallest one that still fails and writes it to testdata/. Commit it: from then on, plain go test replays it.
     The rule is the whole point: without it, the fuzzer only finds panics. With it, it finds logic bugs like ours.
     Q&A, if asked:
       Where is the corpus? In the Go cache, $(go env GOCACHE)/fuzz/<package>/FuzzXxx, not in the repo. Only failures go to testdata/.
       One file per bug? Yes: a run stops at the first failure and writes one file. Fix it, run again: go test replays testdata first, then fuzzes, and the next bug adds a second file. Each file is a regression test from then on. -->

---
layout: default
---

# Now ask who stays <Marker>out</Marker>

```go {1|2|4-6|7-12}
f.Add(false, true, "acme", "acme") // the seed
f.Fuzz(func(t *testing.T, super, admin bool, uOrg, org string) {
	u := User{super, admin, uOrg}
	if !canManageOrg(u, org) {
		return // denied is always safe
	}
	if org == "" {
		t.Fatalf("granted with no org: %v", u)
	}
	if !super && !(admin && uOrg == org) {
		t.Fatalf("granted to a non-admin of %q: %v", org, u)
	}
})
```

<!-- ~1min15. Callback to "Every test asked who gets in. None asked who stays out.": this is the answer.
     Each highlight is a box of the drawing on the previous slide.
     On enter, f.Add: the seed, the corpus box. The happy path, the only case the old tests had.
     Click 1, the parameters: the mutated input box. These four values are what the fuzzer changes, millions of times.
     Click 2: a denial is always safe, so the fuzzer only cares about grants.
     Click 3, the rule holds? box, written as denials: each t.Fatalf is the no branch. The failure message IS the rule.
     No oracle that copies the fix: each check is a sentence you'd say out loud. -->

---
layout: terminal
title: "$ go test -fuzz=FuzzCanManageOrg"
clicks: 2
---

<LiveRun id="fuzz-authz" mark="granted">

```sh
fuzz: minimizing 70-byte failing input file
--- FAIL: FuzzCanManageOrg (0.04s)
    --- FAIL: FuzzCanManageOrg (0.00s)
        authz_test.go:29: granted with no org: {false false acme}

    Failing input written to testdata/fuzz/FuzzCanManageOrg/a8949c542c89c1fa
FAIL
```

<template #mark>
<DrawnSvg src="/drawings/no-role.svg" alt="An arrow points at the failing user: not super, not admin" steps class="absolute pointer-events-none" style="left: 562px; top: -106px; width: 400px" />
</template>

</LiveRun>

<!-- LIVE: the first click (remote "next") runs the fuzzer for real on securing-go/demo/authz, the original code from these slides, and streams the output here. Next click moves on.
     Point at the red line and read the user out loud: "false, false: not a super admin, not an admin. Granted anyway."
     Say it: "This is the day-one code. No report, no AI, no hint."
     Then: "Fix only that, and it finds the second one in five hundredths of a second."
     Runs only from `pnpm dev` in the audience window; the presenter view, the static build and any error show the recorded output below instead.
     Before the talk: `go version` in securing-go/demo/authz, and one dry run so the Go build cache is warm.
     Recorded output: against the VULNERABLE version (go1.26, M-series Mac).
     Read the failing user out loud: {super, admin, org}, the same order as User{super, admin, uOrg} on the property slide.
     Live, either bug can come out (6 runs: 4 "granted with no org: {false false acme}", 2 "granted to a non-admin of "0": {false false 0}"). The spoken line holds for both: never a super admin, never an admin.
     If you fix only the fail-open, the fuzzer finds "granted to a non-admin of ..." in ~0.05s.
     Against the fixed version: 8 to 12M execs in 10s depending on the machine, clean (next slide).
     The failing input lands in testdata/: commit it and it becomes a regression test forever. -->

---
layout: default
---

# Same bug, two <Marker>clocks</Marker>

<Ledger class="mt-8" :value-width="620">
  <LedgerRow value="13 months" :n="0">green tests,<br>each one asking who gets in</LedgerRow>
  <LedgerRow v-click value="< 0.1s" :n="1">the fuzzer,<br>asking who stays out</LedgerRow>
</Ledger>

<!-- On enter: thirteen months of green tests, every one asking who gets in. Blame the method, not the people.
     Click: the fuzzer, asking who stays out. "Under a tenth of a second." Pause.
     The live run varies between 0.04 and 0.09s in tests: "under a tenth of a second" stays true whatever comes out. -->

---
layout: terminal
title: "$ go test -fuzz=FuzzCanManageOrg -fuzztime=10s"
---

<div class="relative">

```sh
fuzz: elapsed: 3s, execs: 2273114 (757675/sec), new interesting: 3 (total: 4)
fuzz: elapsed: 6s, execs: 4791577 (839219/sec), new interesting: 3 (total: 4)
fuzz: elapsed: 9s, execs: 7173884 (794115/sec), new interesting: 3 (total: 4)
fuzz: elapsed: 10s, execs: 8131813 (880762/sec), new interesting: 3 (total: 4)
PASS
```

<DrawnSvg src="/drawings/none-gets-in.svg" alt="An arrow from the last execs count: after the fix, 8 million inputs and none gets in" class="absolute pointer-events-none" style="left: 312px; top: calc(100% - 60px); width: 640px" />

</div>

<!-- ~20s. Recorded, not live: the same property against the fixed version (go1.26, M-series Mac, 15 workers). Numbers vary by machine.
     "new interesting: 3": the inputs that took a new path, the "keep it" arrow of the loop.
     This is what runs in CI: appsec-ci schedules a weekly bounded fuzz run, and every committed failing input replays on each go test. -->

---
layout: default
clicks: 4
---

# <Marker>Red</Marker> or it didn't happen

<DrawnSvg src="/drawings/red-or-it-didnt-happen.svg" alt="Tools raise signals; the AI reads them with the code, dismisses some and keeps hypotheses; a test turns one red, which is evidence and leads to a fix, while a green one stays as a test; both end in CI, which keeps guarding every PR" steps class="mt-1 mx-auto w-[86%]" />

<p v-click="4" class="text-center mt-2"><strong>Dismissed:</strong> a real bug in a deprecated feature nobody calls. True, but unreachable.</p>

<!-- ~1min. Open with "then we did it on purpose": the story, turned into a process. This is not TDD: the developer doesn't know what to test. The AI proposes it, and a human filters it twice.
     On enter: the tools raise signals (govulncheck, gosec, scanners). Many, cheap, noisy.
     Say it: "In our story the signal was a report. When you do this on purpose, tools raise them."
     Click 1: the AI reads those signals together with the code. Some are dismissed on the spot, with a reason; the rest become hypotheses. Reading the code it can also raise its own, as it did with our bug.
     Click 2: the test. Red is evidence, the only red on the slide. Green is not wasted: the test stays and guards the rule.
     Click 3: the red one gets its fix. Both end in CI, and the arrow back: they keep guarding the whole class of bug, every PR.
     This is what appsec-audit and appsec-prove do, step by step (section 03).
     Every piece is something they just saw on our bug: the prompt was a hypothesis, the red test the evidence, the property in CI the guard. The dismissed branch is the deprecated feature.
     Click 4, the dismissed example: ~45s, the hypothesis that leaves the AI's reading crossed out. After this bug we ran the same process on purpose, with no report to start from: it found things nobody had reported (missing security headers, broken logic).
     It also flagged a real issue in a deprecated feature we would never call again. A true finding that doesn't matter.
     Bridge to section 02: govulncheck draws exactly this line, using the call graph. -->

---
layout: statement
---

# Tools give you signals.

<v-click>

# AI gives you hypotheses.

</v-click>

<v-click>

# Tests give you <Marker>evidence</Marker>.

</v-click>

<!-- The guiding line of the talk. It comes back in the closing. Pause after "evidence". -->

---
layout: section
label: "02 · the code you use"
transition: fade
---

# The code you use

---
layout: default
clicks: 3
---

###### axios · 100M downloads a week

# Three hours on <Marker>npm</Marker>

<Timeline class="mt-6" :from="0" :to="210" :ticks="[[0, '00:00'], [60, '01:00'], [120, '02:00'], [180, '03:00']]">
  <TimelineEvent v-click :at="21" time="00:21" title="axios@1.14.1" mark>stolen token</TimelineEvent>
  <TimelineEvent v-click :at="60" time="~01:00" title="axios@0.30.4">same payload</TimelineEvent>
  <TimelineEvent v-click="3" :at="195" time="03:15" title="removed" align="end">both versions</TimelineEvent>
  <template #spans>
    <TimelineSpan v-click="3" :from="21" :to="195">31 march 2026, utc · every install drops a trojan</TimelineSpan>
  </template>
</Timeline>

<!-- ~1min30. 31 March 2026, UTC. On enter: the axis. Click 1: 00:21, the first release, stolen token. Click 2: ~01:00, the second branch, same payload. Click 3: removed at 03:15, and the bracket: on install, a new dependency's postinstall dropped a remote access trojan.
     100,340,121 downloads in the week of 23-29 March 2026 (npm downloads API).
     How it got in: the lead maintainer was socially engineered. Fake founder, real-looking Slack workspace, a Teams "meeting" asking him to install an "update": a RAT. npm credentials stolen, 2FA on. Published by hand with a token, bypassing the project's OIDC CI publishing.
     Payload: axios code untouched. package.json added plain-crypto-js@4.2.1, whose postinstall ran an obfuscated dropper (RAT for macOS, Windows, Linux) and then swapped package.json back to a clean one.
     Detected by StepSecurity Harden-Runner (outbound connection in CI) and the community.
     Attribution: North Korea-linked (GTIG: UNC1069, Microsoft: Sapphire Sleet).
     Sources: github.com/axios/axios/issues/10636 · stepsecurity.io blog · cloud.google.com/blog/topics/threat-intelligence/north-korea-threat-actor-targets-axios-npm-package -->

---
layout: quote
---

# "There was no automated way to detect an unauthorized publish."

axios maintainer, post-mortem

<!-- ~20s. Let it land. Source: github.com/axios/axios/issues/10636 -->

---
layout: default
---

# "But that's npm." Is <Marker>it</Marker>?

| | npm | Go |
|---|---|---|
| A new release | `^1.14.0` pulls `1.14.1` on the next install | `go.mod` pins `v1.14.0` until you ask |
| Getting it | `postinstall` runs code the moment it lands | fetching and building never run its code |

<p v-click class="mt-8"><strong>Until you update.</strong> Then it's yours.</p>

<!-- ~1min. Go makes it slow and deliberate, not impossible: go get -u or a Dependabot PR would have pulled 1.14.1 too, and its init functions run the moment the program starts. Review dependency bumps like code.
     Go blog, "How Go Mitigates Supply Chain Attacks" (2022-03-31): "neither fetching nor building code will let that code execute". A new release reaches nobody until they explicitly update (go get -u, go mod tidy, a manual edit).
     https://go.dev/blog/supply-chain -->

---
layout: default
clicks: 3
---

# The trust <Marker>chain</Marker>

<DrawnSvg src="/drawings/trust-chain.svg" alt="go.mod, then the module proxy, then the checksum database, then go.sum" steps class="mt-6" />

<p v-click="3">Same version, same bytes, for everyone, forever. <code>go mod verify</code> checks your module cache still matches <code>go.sum</code>.</p>

<!-- ~45s. Walk left to right, one click per hop: go.mod declares exact versions, the proxy serves the module, the checksum db checks its hash (the red seal), go.sum records it. sumdb is a transparent, append-only log: nobody can swap the contents of a version that already exists, not even the author.
     Deep dive from a past GoLab: Katie Hockman, "Go Module Proxy: Life of a Query" (2019) https://www.youtube.com/watch?v=kqMxaO9d1NM -->

---
layout: default
---

# What the checksum database <Marker>guarantees</Marker>

<div class="grid grid-cols-2 gap-12">
<div>

###### it does

- Same bytes for everyone
- Nobody can swap a version

</div>
<div>

###### it doesn't

- That the bytes are **honest**
- That the bytes are **safe**

</div>
</div>

<div v-click class="mt-8">

<Callout type="note" label="boltdb-go/bolt">A typo of boltdb with a backdoor, cached by the proxy. Then its GitHub tag was moved to a clean commit: for three years the repo looked fine, and the proxy kept serving the backdoor.</Callout>

</div>

<!-- ~1min30. Top: the map for the rest of the section. Honest and safe are the two holes.
     Click: the story of "not honest". A typosquat of github.com/boltdb/bolt (8,367 dependents), v1.3.1 cached by the proxy in Nov 2021. Backdoor on Open(): remote shell over C2.
     Nothing was rewritten in the proxy: the checksum db forbids that. The attacker rewrote the GitHub tag, so whoever reviewed the repo saw clean code while the proxy kept serving the original, malicious bytes. The immutability that protects us kept the backdoor alive.
     Reported by Socket in Feb 2025 (GO-2025-3451). Today proxy.golang.org answers 403: "The module proxy considers this module to be malicious and will not serve it".
     Lesson: review the code the proxy serves (go mod download, pkg.go.dev source), not the repo.
     "Safe" is the next slide: honest bytes with a known CVE.
     Source: socket.dev/blog/malicious-package-exploits-go-module-proxy-caching-for-persistence (2025-02-04) -->

---
layout: statement
---

# Honest bytes can still be <Marker>vulnerable</Marker>.

<!-- Bridge to "not safe": an honest module, a known CVE. That's what govulncheck answers. -->

---
layout: split-code
---

###### GO-2026-4342 · CVE-2025-61728

# Valid zip. Unbounded <Marker>cost</Marker>.

A file name nested thousands of folders deep.

One upload: **26 seconds of CPU**.

Like the unbounded request body, this time inside the standard library.

::right::

<dl class="cve-facts">
  <div><dt>affected</dt><dd><code>go1.25.0</code> to <code>go1.25.5</code><br>and everything before <code>go1.24.12</code></dd></div>
  <div><dt>fixed in</dt><dd><code>go1.24.12</code> · <code>go1.25.6</code></dd></div>
  <div><dt>released</dt><dd>15 January 2026</dd></div>
  <div><dt>impact</dt><dd>CPU denial of service</dd></div>
</dl>

<style>
.cve-facts { margin: 0; border-top: 1px solid var(--di-fg); }
.cve-facts div { display: grid; grid-template-columns: 150px minmax(0, 1fr); align-items: baseline; padding: 14px 0; border-bottom: 1px solid var(--di-border); }
.cve-facts dt { font-family: var(--di-font-family-mono); font-size: 18px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--di-slide-meta); }
.cve-facts dd { margin: 0; font-size: 26px; line-height: 1.4; color: var(--di-fg); }
</style>

<!-- ~45s. Don't say which call triggers it yet: the next slide asks the room. The title echoes "Valid request. Unbounded cost." from the code you write.
     Official text: "archive/zip uses a super-linear file name indexing algorithm that is invoked the first time a file in an archive is opened. This can lead to a denial of service when consuming a maliciously constructed ZIP archive."
     How it works: zip.Reader is an fs.FS, so on the first Open it indexes every file's parent folders. The old loop called path.Dir at each level (re-scanning the whole name) and never stopped early, even for folders already indexed: cost ~ depth x length per file. A zip name can be 64 KB, so "a/a/a/..." thousands of levels deep is cheap to send.
     26 s: the fix's own benchmark, ReaderOneDeepDir on an Apple M4 Pro, 25.98 s before, 46 ms after (commit bb7c0c7, "archive/zip: reduce CPU usage in index construction").
     The fix: strings.LastIndex slicing instead of path.Dir, and stop at the first folder already indexed.
     CPU only, not memory, nothing written to disk. NO exploit PoC on stage.
     Issue go.dev/issue/77102, fix CL 736713, credit Jakub Ciolek. -->

---
layout: default
clicks: 2
---

# Same import. Which one is <Marker>affected</Marker>?

```go
zr, err := zip.NewReader(upload, size) // a user's upload
```

<div class="grid grid-cols-2 gap-x-10 gap-y-3 items-stretch mt-4">

<div><Tape v-click="2" :n="0">not affected</Tape></div>
<div><Tape v-click="1" :n="1">affected</Tape></div>

<div class="snippet">

```go {all|all|2}
for _, f := range zr.File {
	rc, err := f.Open()
}
```

</div>
<div class="snippet">

```go
f, err := zr.Open("manifest.json")
```

</div>

<Callout v-click="2" type="note" label="why"><code>File.Open</code> reads one entry. The index is never built.</Callout>
<Callout v-click="1" type="note" label="why"><code>Reader.Open</code> indexes the whole archive first.</Callout>

</div>

<style>
.snippet, .snippet > .slidev-code-wrapper, .snippet .slidev-code { height: 100%; margin: 0 !important; }
</style>

<!-- ~1min. Ask the room first. Both import archive/zip, both run on go1.25.5: a scanner that reads go.mod flags both.
     Line for the stage: "You open manifest.json, a harmless file, and the server burns 26 seconds of CPU on a file you never asked for." The first Open indexes the whole archive, so the poisoned entry can sit anywhere in the zip.
     The left one reads entry by entry: File.Open decompresses that one entry and never asks which folders it lives in. A long name is just a long string nobody walks.
     Click 1: the right one. zr.Open is Reader.Open, the fs.FS method that builds the file name index: that's the vulnerable symbol.
     Click 2: the left one is not. Iterating zr.File and calling File.Open never reaches it (verified with govulncheck on go1.25.5: 0 affected).
     Only a tool that reads the call graph can tell them apart.
     If someone says "I never call zr.Open": http.FileServer(http.FS(zr)) or template.ParseFS(zr, ...) reach Reader.Open inside the standard library, and govulncheck follows the call graph in there too.
     The code is securing-go/demo/unzip (right-hand version). -->

---
layout: terminal
title: "$ govulncheck ./..."
clicks: 1
---

<LiveRun id="govulncheck-unzip">

```text
Vulnerability #1: GO-2026-4342
    Excessive CPU consumption when building archive index in archive/zip
    Found in: archive/zip@go1.25.5
    Fixed in: archive/zip@go1.25.6
    Example traces found:
      #1: main.go:17:19: unzip.handleUpload calls zip.Reader.Open

Your code is affected by 1 vulnerability from the Go standard library.
```

</LiveRun>

<!-- LIVE: the first click runs govulncheck for real on securing-go/demo/unzip (go1.25.5 via GOTOOLCHAIN) and streams the output here, with the same lines cut as below. Takes a few seconds: talk over it ("it's building the call graph").
     It reads the vulnerability database from securing-go/demo/vulndb: run securing-go/demo/fetch-vulndb.sh the day before, then no Wi-Fi needed. Without it, it falls back to vuln.go.dev over the network.
     Before the talk: one dry run so go1.25.5 is downloaded and the build cache is warm. Presenter view, static build or any error show the recorded output below.
     Recorded output: on the right-hand code: securing-go/demo/unzip, handleUpload(upload, size) called by a tiny main. Real output, trimmed: the "=== Symbol Results ===" header, the More info link and the "also found" paragraph are cut (the paragraph is the next slide). Exit code 3.
     Point at the trace: the file, the line, the call that reaches the vulnerable symbol.
     On the left-hand code the same scan says "Your code is affected by 0 vulnerabilities."
     Setup BEFORE the talk: export GOTOOLCHAIN=go1.25.5+auto (a toolchain line in go.mod does NOT downgrade; +auto lets the fix work), pre-download go1.25.5, build govulncheck with the newest Go you scan with, re-run the morning of the talk (the counts grow with the database).
     Why a CLI and not net/http: on go1.25.5 an HTTP server gets 22 reachable stdlib findings, ~400 lines of output. -->

---
layout: default
clicks: 2
---

# Known isn't <Marker>reachable</Marker>

<DrawnSvg src="/drawings/reachable.svg" alt="Your code calls into Go and its modules, where 47 functions are known to be vulnerable; only one call path, handleUpload to Reader.Open, reaches a vulnerable one" steps class="mt-4" />

<p v-click="2" class="text-center">govulncheck follows the calls, and reports only the red one.</p>

<!-- ~1min. The call graph, simplified.
     On enter: Go and the modules this build carries. The filled dots are vulnerable functions: 47 known (42 in packages the code never imports, 4 imported but never called, 1 called).
     Click 1: our code. main calls handleUpload, which calls zip.NewReader and io.Copy: safe functions.
     Click 2: the one call that reaches a vulnerable function, Reader.Open. That red dot is the only finding govulncheck reports.
     A scanner that reads go.mod would report every filled dot. govulncheck follows the arrows.
     Callback to "True. But unreachable.": the same line, drawn by the call graph.
     Numbers from govulncheck on 2026-10-21; re-run the morning of the talk, the database grows. -->

---
layout: split-code
---

###### the fix, and the catch

# Scan the Go you <Marker>ship</Marker>

The bug ships with Go. Updating modules never fixes it: the fix is a newer Go.

<p v-click="1">In CI, the action scans with the latest stable Go. It never sees the Go you build with.</p>

::right::

```yaml {all|9-10}
name: govulncheck
on: [pull_request, push]

jobs:
  govulncheck:
    runs-on: ubuntu-latest
    steps:
      - uses: golang/govulncheck-action@v1
        with:
          go-version-file: go.mod
```

<!-- ~1min. Two blind spots, one cause: nobody treats the Go version as a dependency.
     On enter, the fix: the bug is in the standard library, so it ships with Go. go get -u ./... leaves go.mod unchanged and the finding stays (verified). The fix is a newer Go: go get toolchain@go1.26.10 adds "toolchain go1.26.10" to go.mod, then govulncheck says "No vulnerabilities found." (real output, exit 0). Why 1.26.10 and not the minimum 1.25.6: go1.25 is out of support since go1.27.0 (2026-08-19). For a service what matters is the Go you actually build with: the CI image, the Dockerfile (golang:1.27.3), the toolchain line.
     Click 1, the catch: golang/govulncheck-action installs the latest stable Go by default, so in CI it would never have reported this bug. go-version-file: go.mod makes it scan the Go you ship.
     golang/govulncheck-action, current major v1 (v1.1.0, 2026-07-10), README still says experimental. It checks out the repo and installs govulncheck itself. Fails the job on findings with text output (not with json/sarif). -->

---
layout: default
---

# Beyond the <Marker>toolchain</Marker>

- **SBOM**: know what's actually in your build (`cyclonedx-gomod`, `syft`)
- **SLSA**: prove that what you shipped is what you built

<Callout type="tip" label="watch next">GoLab 2023: "Essential security checks for your Go project", Cosmin Cojocar.<br>Yesterday: "Trust nothing: how to audit third-party Go binaries securely", Ivan Pesenti.</Callout>

<!-- ~45s. Don't teach SBOM/SLSA, acknowledge them.
     Schedule checked 2026-10-21 (marked "not final"): no SBOM/SLSA talk at GoLab 2026, so the old "GoLab has them" line was wrong.
     Related talks: Pesenti, Nov 2 15:30 Golab #2. Also "Your tests pass, but do they work? Mutation testing in Go" (Takuma Shibuya, Nov 2 14:45 Golab #1) pairs with "nobody tested the right assumption".
     Re-check the schedule the day before.
     Past GoLabs (YouTube, channel UCMEvzoHTIdZI7IM8LoRbLsQ): no talk covers SBOM/SLSA directly. Closest:
       Cojocar (gosec maintainer), GoLab 2023: gosec, govulncheck, sigstore/cosign on gosec's own release pipeline. https://www.youtube.com/watch?v=OpspliszWDg
       Katie Hockman, GoLab 2019, "Go Module Proxy: Life of a Query" (proxy + sumdb), fits section 02. https://www.youtube.com/watch?v=kqMxaO9d1NM
     Honest framing: don't say GoLab covered SBOM/SLSA. -->

---
layout: section
label: "03 · make it routine"
transition: fade
---

# Make it routine

One run is a demo. Every PR is a habit.

---
layout: two-cols-header
---

# What to <Marker>keep</Marker>

::left::

###### the code you write

- Treat request data as a claim
- Bound every resource
- Deny by default
- Test who stays out <Tape v-click="4" :n="0" :size="14" class="ml-2">day 1</Tape>
- Prove every AI finding red <Tape v-click="4" :n="1" :size="14" class="ml-2">day 1</Tape>

::right::

###### the code you use

<v-clicks>

- Scan the Go you ship <Tape v-click="4" :n="2" :size="14" class="ml-2">day 1</Tape>
- Upgrade Go, not the module
- `go mod verify` before you build <Tape v-click="4" :n="0" :size="14" class="ml-2">day 1</Tape>

</v-clicks>

<!-- ~1min30. The best practices of the title, in one place, and where to start. Every line is a slide they already saw: don't explain, point back.
     Left, on enter: the SSRF slide (check the claim, allow-list), MaxBytesReader (and ReadHeaderTimeout, time is a resource too), deny by default, the fuzz property, red or it didn't happen.
     Right, one click each: govulncheck with go-version-file, the archive/zip fix lives in a Go release, the checksum database.
     Click 4, the day 1 tapes: "Your next working day, four things."
       govulncheck in CI on every PR, scanning the Go you ship: go-version-file: go.mod.
       One fuzz property on your most critical auth path, written as who must be denied.
       go mod verify in the release pipeline, before anything gets built.
       One AI pass on one critical path: every finding needs a red test. -->

---
layout: statement
---

# Attackers already use AI to find bugs.

<v-click>

# Make yours <Marker>red</Marker> before they find them.

</v-click>

<!-- Callback to the opening ("Attacks now run at machine speed"): don't repeat the numbers, point back to them. -->

---
layout: default
---

# Give your AI the <Marker>tools</Marker>

<Ladder class="mt-6">
  <LadderRung v-click :n="1" title="Shell">let it run <code>govulncheck</code> and <code>go test -fuzz</code> itself</LadderRung>
  <LadderRung v-click :n="2" title="Your own MCP server">typed tools instead of a raw shell</LadderRung>
  <LadderRung v-click :n="3" title="Argus" tag="built by me">an open source MCP server that runs <code>govulncheck</code> and <code>gosec</code> for your agent, or as an agent itself</LadderRung>
</Ladder>

<!-- ~1min30. Red or it didn't happen from section 01, made routine: the AI proposes, the tools give signals, the tests give evidence.
     Argus: ONE option among three, ~60s max, no demo. Present it in Toolbox mode: an MCP server that runs the scanners and serves skills, no LLM provider needed; your agent does the reasoning. "Or as an agent itself": it can also review PRs on its own; one clause, not a pitch. "If you want it ready-made, I built one. Use it, fork it, or build your own." Go tooling is on main since 2026-10-15 (run_govulncheck, gosec via the Tool Catalog, #118) but NOT in a release yet (latest v0.3.0, 2026-07-30): cut a release before the talk. The built-in authz-audit skill hunts exactly the bug from section 01.
     Next in Golab #1 at 12:15: "Your AGENTS.md Is a Lie (And Here's How to Fix It)" by Dario Castañé. Good hand-off if the timing works. -->

---
layout: split-code
---

###### open source, take it

# This talk, as <Marker>skills</Marker>

Every practice from this talk, packaged as Agent Skills for your agent.

One skill per step of the process. Everything they write is tested.

::right::

```text
skills/
  appsec-setup/   # start here
  appsec-audit/   # hypotheses
  appsec-prove/   # red or it didn't happen
  appsec-ci/      # keeps guarding
```

<!-- ~1min30. github.com/davideimola/appsec-skills (formerly go-security-skills, the old URL redirects), MIT, open Agent Skills format: Claude Code, Codex, Copilot, Cursor, Gemini CLI.
     One skill per purpose, one pack per ecosystem: Go is the pack today, born from this talk; TypeScript is next. You don't call them by name: ask your agent in plain words ("check the security of my Go service") and it picks the right one.
     appsec-setup: run it first. A couple of questions: finds the Go modules (and TypeScript packages), asks where the audit gets govulncheck and gosec from. Writes configuration only, no CI, no code.
     appsec-audit: govulncheck, gosec triaged against the code, timeouts and body limits, fail-open authz, trust boundaries, unpinned actions. Reports findings, applies only the fixes you confirm.
     appsec-prove: the section 01 story, packaged. Deny-by-default tests plus a fuzz property, run on today's code: reproduced or not. Works on TypeScript too (fast-check), if anyone asks.
     appsec-ci: installs security.yml (verify, vet, govulncheck, tests, weekly bounded fuzzing) and grouped Dependabot, checks the toolchain is patched, adds SECURITY.md.
     The point for the room: a skill that writes CI is itself supply chain. Every file these skills write already exists in the repo and is verified by its CI, actions pinned to full commit SHAs.
     "and with Argus" (Toolbox mode, skills in ~/.argus/skills/, appsec-setup picks run_govulncheck and run_gosec as the scanners) only if the end-to-end test passed. -->

---
layout: default
---

# Give them to your <Marker>agent</Marker>

<div class="grid grid-cols-[minmax(0,1fr)_auto] gap-16 items-center mt-8">
<div>

Four skills. Claude Code, Codex, Copilot, Cursor, Gemini CLI: any agent that reads `SKILL.md`.

```sh
npx skills add davideimola/appsec-skills
```

</div>
<QRBlock value="https://github.com/davideimola/appsec-skills" label="appsec-skills" :size="240" />
</div>

<!-- ~20s. Leave it on screen long enough for phones to come out. Claude Code plugin install is in the README, not on the slide. -->

---
layout: statement
---

# The compiler won't save you.

<v-click>

# Signals, hypotheses and <Marker>evidence</Marker> will.

</v-click>

<!-- The opening thesis, kept: "Your process might" at the start, and here is the process. Pause after "will". -->

---
layout: statement
---

# Don't aim for perfect. Aim for paranoid and fix <Marker>fast</Marker>.

<!-- THE closing line. Pause. Then the end slide. -->

---
layout: end
qr: https://links.davideimola.dev
---

# Thank you

Slides, links and feedback.
