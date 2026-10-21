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
bluesky: "@davideimola.dev"
linkedin: davideimola
---

<WhoAmI />

---
layout: section
label: "01 · why now"
transition: fade
---

# Why now

Security is becoming more and more important.

---
layout: fact
---

# 31%

of breaches start with vulnerability exploitation

<div class="mt-6 text-base opacity-60">Verizon DBIR 2026</div>

<!-- Source: Verizon DBIR 2026 news release (2026-05-19): "Nearly a third (31%) of all breaches start with vulnerability exploitation". For the first time in 19 years it has passed stolen credentials as the number one entry point.
     https://www.verizon.com/about/news/breach-industry-wide-dbir-finds
     Bridge: a third of breaches start with a bug somebody shipped. In code we wrote, or code we pulled in. That is the whole talk.
     Alternative: Mandiant M-Trends 2026, mean time to exploit "an estimated -7 days" (exploited before the patch exists). -->

---
layout: split-code
---

###### intro / teaser

# We shipped <Marker>this</Marker>

Thirteen months in production.

Code review approved it. Tests were green.

Hold that thought.

<!-- Go port of the real bug (the original was a GraphQL directive). Don't explain it here: the audience gets 10 seconds to spot it, then we move on. It comes back in section 02. -->

::right::

```go
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

---
layout: statement
---

# The compiler won't save you. Your toolchain might.

---
layout: default
---

# What we'll cover

<div class="space-y-5 mt-8">

<v-click>
<div class="flex items-baseline gap-4">
  <span class="text-2xl font-mono opacity-40">01</span>
  <h3 class="text-2xl m-0">The code you write</h3>
</div>
</v-click>

<v-click>
<div class="flex items-baseline gap-4">
  <span class="text-2xl font-mono opacity-40">02</span>
  <h3 class="text-2xl m-0">The code you use</h3>
</div>
</v-click>

<v-click>
<div class="flex items-baseline gap-4">
  <span class="text-2xl font-mono opacity-40">03</span>
  <h3 class="text-2xl m-0">Make it routine</h3>
</div>
</v-click>

</div>

---
layout: section
label: "02 · the code you write"
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

- Who may read this resource
- Where this request is going
- How much this request costs

</v-clicks>

<!-- ~1min. Left side: what Go gives you for free, be generous, it's a Go room.
     Right side, one click each: these three questions are the next three slides
     (who → authorization, where → trust boundaries, how much → resource exhaustion). -->

---
layout: split-code
---

###### trust boundaries

# The client chose this <Marker>URL</Marker>

Every ID, URL and header in a request is a claim, not a fact.

`net/http` fetches whatever you hand it: internal IPs, cloud metadata, redirects included.

::right::

```go {all|2|3}
func preview(w http.ResponseWriter, r *http.Request) {
	target := r.URL.Query().Get("url")
	resp, err := http.Get(target) // 169.254.169.254?
	if err != nil {
		http.Error(w, "bad gateway", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()
	io.Copy(w, resp.Body)
}
```

<!-- ~1min15. SSRF as ONE example of client-controlled data, not a tutorial.
     The fix in one breath: allow-list the destinations, resolve and reject private/link-local IPs, control redirects with CheckRedirect.
     The fix pattern lives in the template repo (section 04). -->

---
layout: split-code
---

###### resource exhaustion

# Valid request. Unbounded <Marker>cost</Marker>.

No malformed input. No exploit.

Just a request bigger than you planned for.

<v-click>

We'll meet this again, inside the standard library.

</v-click>

::right::

```go {1-2|4-6}
// as big as the client wants
body, err := io.ReadAll(r.Body)

// 1 MB, then 413
r.Body = http.MaxBytesReader(w, r.Body, 1<<20)
body, err = io.ReadAll(r.Body)
```

<!-- ~1min15. Same family: http.Server without ReadHeaderTimeout, unbounded goroutines per request, regex on user input.
     The v-click line plants the seed for section 03: archive/zip, CVE-2025-61728, super-linear file name indexing → CPU DoS. -->

---
layout: fact
---

# 100%

of the applications OWASP tested had some form of broken access control

<div class="mt-6 text-base opacity-60">OWASP Top 10:2025 · A01</div>

<!-- Exact wording on the A01 page: "100% of the applications tested were found to have some form of broken access control".
     Number one category, 1,839,701 occurrences, 40 CWEs.
     https://top10.owasp.org/2025/A01_2025-Broken_Access_Control
     (Don't quote the incidence %: 3.73% on the intro page vs 3.74% on A01.) -->

---
layout: statement
---

# Including <Marker>ours</Marker>.

<!-- Deadpan. Then click back to the teaser code. -->

---
layout: code-hero
---

###### the bug · 13 months in production

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

<!-- ~1min30. Two logic errors, one click each.
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

<!-- ~1min. THE meta-takeaway. Review approved it, tests were green, because every test was a positive case. -->

---
layout: statement
---

# We knew something was wrong. Not <Marker>where</Marker>.

<!-- ~20s. ONE line about the trigger: an external security report said access control was broken somewhere. It didn't say where.
     Don't dwell on "pen test": the point is what we did next. -->

---
layout: default
---

# The <Marker>loop</Marker>

<Ladder compact>
  <LadderRung v-click :n="1" title="Analyze">give the AI the context, not the whole codebase</LadderRung>
  <LadderRung v-click :n="2" title="Find">it points to where it could break</LadderRung>
  <LadderRung v-click :n="3" title="Test">it writes the test that would prove it</LadderRung>
  <LadderRung v-click :n="4" title="Verify">a human reads the red test</LadderRung>
  <LadderRung v-click :n="5" title="Fix">test first, then the code</LadderRung>
</Ladder>

<!-- ~45s. This loop is the spine of the talk: the next slides walk it once on this bug. -->

---
layout: default
---

<Rungs :active="2" :total="5" label="analyze · find" />

# Ask a narrow <Marker>question</Marker> <Badge>reconstructed</Badge>

<Chat>
  <ChatBubble user>Review our authentication and authorization layer. For each check, list the logic errors that could grant access to the wrong user. Assume the caller is hostile.</ChatBubble>
  <ChatBubble>canManageOrg returns true when orgID can't be resolved. It also checks membership, never the admin role.</ChatBubble>
</Chat>

<!-- ~1min. The original prompts are gone: say it, that's why the badge is there.
     What matters is the shape: targeted on the auth layer, asking for logic errors, hostile caller. Not "find bugs in my repo". -->

---
layout: split-code
---

<Rungs :active="3" :total="5" label="test" />

# Make it <Marker>red</Marker>

We asked for tests on who must be denied.

Generated by the AI. Read line by line by us.

::right::

```go {all|5-7}
func TestCanManageOrgDenies(t *testing.T) {
	viewer := User{OrgID: "acme"}
	admin := User{IsOrgAdmin: true, OrgID: "acme"}

	deny(t, viewer, "acme")  // member, not admin
	deny(t, admin, "globex") // admin of another org
	deny(t, admin, "")       // org not resolved
}
```

<!-- ~1min. `deny` is a 4-line helper (t.Helper + t.Errorf if access is granted), not shown. -->

---
layout: terminal
title: "$ go test -run TestCanManageOrgDenies"
---

```sh
--- FAIL: TestCanManageOrgDenies (0.00s)
    authz_test.go:16: granted: {IsSuperAdmin:false IsOrgAdmin:false OrgID:acme} on "acme"
    authz_test.go:18: granted: {IsSuperAdmin:false IsOrgAdmin:true OrgID:acme} on ""
FAIL
```

Two of three. That's not an opinion anymore.

<!-- ~30s. Real output from the Go port. Hypothesis → evidence. -->

---
layout: split-code
---

<Rungs :active="5" :total="5" label="verify · fix" />

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

# A bug can survive 13 months.

<v-click>

# Not because the code is complex. Because nobody tested the right <Marker>assumption</Marker>.

</v-click>

---
layout: code-hero
---

###### make it stay fixed

```go {all|2|6-7|9-11}
func FuzzCanManageOrg(f *testing.F) {
	f.Add(false, true, "acme", "acme") // the happy path
	f.Fuzz(func(t *testing.T,
		super, admin bool, userOrg, org string) {

		u := User{super, admin, userOrg}
		allowed := org != "" &&
			(super || (admin && userOrg == org))

		if canManageOrg(u, org) && !allowed {
			t.Fatalf("granted: %+v on %q", u, org)
		}
	})
}
```

<!-- ~1min15. The table test checks the cases we thought of. The fuzzer checks the ones we didn't.
     Click 1: the seed is the ONLY case the old tests had, the happy path. The fuzzer starts from there.
     Click 2: the property. Deny by default, written once.
     Click 3: the assertion. -->

---
layout: terminal
title: "$ go test -fuzz=FuzzCanManageOrg"
clicks: 1
---

<LiveRun id="fuzz-authz">

```sh
fuzz: elapsed: 0s, gathering baseline coverage: 1/1 completed, now fuzzing with 15 workers
fuzz: minimizing 70-byte failing input file
--- FAIL: FuzzCanManageOrg (0.03s)
    authz_test.go:31: granted: {IsSuperAdmin:false IsOrgAdmin:false OrgID:acme} on ""

    Failing input written to testdata/fuzz/FuzzCanManageOrg/a8949c542c89c1fa
    To re-run:
    go test -run=FuzzCanManageOrg/a8949c542c89c1fa
FAIL
```

</LiveRun>

<!-- LIVE: the first click (remote "next") runs the fuzzer for real on securing-go/demo/authz, the vulnerable code from these slides, and streams the output here. Next click moves on.
     Runs only from `pnpm dev` in the audience window; the presenter view, the static build and any error show the recorded output below instead.
     Before the talk: `go version` in securing-go/demo/authz, and one dry run so the Go build cache is warm.
     Recorded output: against the VULNERABLE version (go1.26, M-series Mac).
     If you fix only the fail-open, the fuzzer finds the viewer case in the same ~0.05s.
     Against the fixed version: 11.6M execs in 10s, clean.
     The failing input lands in testdata/: commit it and it becomes a regression test forever. -->

---
layout: fact
---

# 0.03s

for the fuzzer. Thirteen months for us.

<!-- After the live run the time on screen varies (0.03-0.08s in tests). If it's far from 0.03s, say "a few hundredths of a second" instead of reading the number. -->


---
layout: statement
---

# It also found a real bug in code nobody calls.

<v-click>

# True. But <Marker>unreachable</Marker>.

</v-click>

<!-- ~45s. After this bug we ran the loop on purpose, with no report to start from: it found things nobody had reported (missing security headers, broken logic).
     It also flagged a real issue in a deprecated feature we would never call again. A true finding that doesn't matter.
     Bridge to section 03: govulncheck draws exactly this line, using the call graph. -->

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
label: "03 · the code you use"
transition: fade
---

# The code you use

---
layout: fact
---

# 100M

weekly downloads of axios, the week it shipped a backdoor

<div class="mt-6 text-base opacity-60">npm downloads API · 23 to 29 March 2026</div>

<!-- Exact figure: 100,340,121 downloads, week of 23-29 March 2026 (npm downloads API). -->

---
layout: default
---

# Three hours on <Marker>npm</Marker>

| 31 March 2026, UTC | |
|---|---|
| 00:21 | `axios@1.14.1` published with a stolen token |
| ~01:00 | `axios@0.30.4`, same payload |
| on install | a new dependency's `postinstall` drops a remote access trojan |
| 03:15 | both versions removed |

<!-- ~1min30. How it got in: the lead maintainer was socially engineered. Fake founder, real-looking Slack workspace, a Teams "meeting" asking him to install an "update": a RAT. npm credentials stolen, 2FA on. Published by hand with a token, bypassing the project's OIDC CI publishing.
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
layout: statement
---

# "But that's npm."

<v-click>

# Is <Marker>it</Marker>?

</v-click>

---
layout: two-cols-header
---

# Same attack, different <Marker>defaults</Marker>

::left::

###### npm

- `^1.14.0` pulls `1.14.1` on the next install
- `postinstall` runs code the moment it lands

::right::

###### go

<v-clicks>

- `go.mod` pins `v1.14.0` until you ask
- Fetching and building never run the module's code

</v-clicks>

<!-- ~1min. Go blog, "How Go Mitigates Supply Chain Attacks" (2022-03-31): "neither fetching nor building code will let that code execute". A new release reaches nobody until they explicitly update (go get -u, go mod tidy, a manual edit).
     https://go.dev/blog/supply-chain -->

---
layout: default
clicks: 3
---

# The trust <Marker>chain</Marker>

<DrawnSvg src="/drawings/trust-chain.svg" alt="go.mod, then the module proxy, then the checksum database, then go.sum" steps class="mt-6" />

<p v-click="3">Same version, same bytes, for everyone, forever.</p>

<!-- ~45s. Walk left to right, one click per hop: go.mod declares exact versions, the proxy serves the module, the checksum db checks its hash (the red seal), go.sum records it. sumdb is a transparent, append-only log: nobody can swap the contents of a version that already exists, not even the author.
     Deep dive from a past GoLab: Katie Hockman, "Go Module Proxy: Life of a Query" (2019) https://www.youtube.com/watch?v=kqMxaO9d1NM -->

---
layout: terminal
title: "$ go mod verify"
---

```sh
all modules verified
```

`go.sum` records the hashes. `go mod verify` checks your module cache still matches them.

<!-- ~20s. One command, belongs in the release pipeline. -->

---
layout: statement
---

# Forever cuts both <Marker>ways</Marker>.

---
layout: default
---

# Typo. Cached. <Marker>Served</Marker> for years.

| When | What |
|---|---|
| Nov 2021 | `boltdb-go/bolt` v1.3.1, backdoored, cached by the proxy |
| later | the GitHub tag is rewritten to point at clean code |
| 3+ years | the proxy keeps serving the backdoor |
| Feb 2025 | reported by Socket, now GO-2025-3451 |

<!-- ~1min. Typosquat of github.com/boltdb/bolt (8,367 dependents). Backdoor triggers on Open(): remote shell over C2.
     Reviewing the repo on GitHub showed nothing: the code you get is the code in the proxy, not the code on GitHub.
     Today proxy.golang.org answers 403: "The module proxy considers this module to be malicious and will not serve it". A screenshot of that would work well here.
     Source: socket.dev/blog/malicious-package-exploits-go-module-proxy-caching-for-persistence (2025-02-04) -->

---
layout: statement
---

# The checksum database proves you got the same bytes.

<v-click>

# Not <Marker>good</Marker> bytes.

</v-click>

<!-- Bridge: integrity is solved. Knowing whether those bytes are vulnerable is the next question. -->

---
layout: code-hero
---

###### demo · unzipper, go1.25.5

```go {all|2|7}
func main() {
	zr, err := zip.OpenReader(os.Args[1])
	if err != nil {
		panic(err)
	}
	defer zr.Close()
	f, err := zr.Open("manifest.json")
	if err != nil {
		panic(err)
	}
	defer f.Close()
	io.Copy(os.Stdout, f)
}
```

<!-- LIVE DEMO start (~5min with the next slides). "Imagine this is behind your upload endpoint."
     Why a CLI and not net/http: on go1.25.5 an HTTP server gets 22 reachable stdlib findings, ~400 lines of output. Unusable live.
     Setup BEFORE the talk:
       export GOTOOLCHAIN=go1.25.5+auto   (a toolchain line in go.mod does NOT downgrade; +auto lets the live fix work)
       pre-download go1.25.5, build govulncheck with the newest Go you scan with
       re-run the morning of the talk: the "4 ... 42" counts grow with the database
     Plan B: GOVULNDB local mirror + asciinema + these slides. -->

---
layout: terminal
title: "$ govulncheck ./..."
---

```sh
=== Symbol Results ===

Vulnerability #1: GO-2026-4342
    Excessive CPU consumption when building archive index in archive/zip
  More info: https://pkg.go.dev/vuln/GO-2026-4342
  Standard library
    Found in: archive/zip@go1.25.5
    Fixed in: archive/zip@go1.25.6
    Example traces found:
      #1: main.go:15:19: unzipper.main calls zip.Reader.Open

Your code is affected by 1 vulnerability from the Go standard library.
This scan also found 4 vulnerabilities in packages you import and 42
vulnerabilities in modules you require, but your code doesn't appear to call
these vulnerabilities.
```

<!-- Real output, govulncheck on go1.25.5, 2026-10-21. Exit code 3.
     Point at the trace: file, line, the call that reaches the vulnerable symbol. -->

---
layout: default
---

# Known isn't <Marker>reachable</Marker>

<StatGrid class="mt-6">
  <Stat v-click value="47" source="this build, 2026-10-21">known vulnerabilities in the stdlib and modules</Stat>
  <Stat v-click value="1" source="govulncheck ./...">that this code actually calls</Stat>
</StatGrid>

<!-- ~45s. Callback to section 02: "True. But unreachable." The AI flagged a real bug in code nobody calls. govulncheck draws the same line, with the call graph instead of a guess.
     47 = 1 reachable + 4 in imported packages + 42 in required modules. -->

---
layout: two-cols-header
---

# Same import. Different <Marker>verdict</Marker>.

::left::

###### not reported

```go
for _, f := range zr.File {
	rc, _ := f.Open()
	io.Copy(os.Stdout, rc)
}
```

::right::

###### reported

```go
f, _ := zr.Open("manifest.json")
io.Copy(os.Stdout, f)
```

<!-- ~45s. Verified on go1.25.5: iterating zr.File and calling File.Open never reaches the vulnerable symbol (0 affected). zr.Open is Reader.Open, the fs.FS method that builds the file name index: reported.
     A scanner that reads go.mod would flag both. govulncheck reads the call graph. -->

---
layout: split-code
---

###### GO-2026-4342 · CVE-2025-61728

# Valid zip. Unbounded <Marker>cost</Marker>.

The first `Open` builds a file name index, and that index is super-linear.

A crafted archive burns the CPU.

Section 02 again, this time inside the standard library.

::right::

```text
Affected:  before go1.24.12
           go1.25.0 to go1.25.5
Fixed:     go1.24.12, go1.25.6
Released:  15 January 2026
Severity:  CPU denial of service
```

<!-- ~45s. Official text: "archive/zip uses a super-linear file name indexing algorithm that is invoked the first time a file in an archive is opened. This can lead to a denial of service when consuming a maliciously constructed ZIP archive."
     CPU only, not memory. NO exploit PoC on stage.
     Issue go.dev/issue/77102, fix CL 736713, credit Jakub Ciolek. -->

---
layout: terminal
title: "$ go get toolchain@go1.26.10 && govulncheck ./..."
---

```sh
go: added toolchain go1.26.10

No vulnerabilities found.
```

A stdlib fix is a toolchain upgrade. `go get -u` won't touch it.

<!-- Real output (GOTOOLCHAIN=go1.25.5+auto, so the toolchain line takes effect). Exit 0.
     Verified: go get -u ./... leaves go.mod unchanged and the finding stays.
     go1.25 is out of support since go1.27.0 (2026-08-19): that's why we jump to go1.26.10 and not to the minimum go1.25.6.
     For a service what matters is the Go you build with: CI image, Dockerfile golang:1.27.3, the toolchain line. -->

---
layout: split-code
---

###### in CI

# Scan the Go you <Marker>ship</Marker>

By default the action scans with the latest stable Go.

It won't see the stdlib bugs of the version you build with.

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

<!-- ~45s. golang/govulncheck-action, current major v1 (v1.1.0, 2026-07-10), README still says experimental.
     It checks out the repo and installs govulncheck itself. Fails the job on findings with text output (not with json/sarif). -->

---
layout: statement
---

# One run is a demo. Every PR is a <Marker>habit</Marker>.

<!-- Transition to section 04: make it routine. -->

---
layout: section
label: "04 · make it routine"
transition: fade
---

# Make it routine

---
layout: default
---

# Monday <Marker>morning</Marker>

<v-clicks>

- Add `govulncheck` to CI, scanning the Go you ship
- Write one fuzz test on your most critical auth path: who must be denied
- Run `go mod verify` in your release pipeline
- Run the loop once on a critical path: analyze, find, test, verify, fix

</v-clicks>

<!-- ~1min30. Read each item, half a beat between. They already saw all of it: the point is to make it small and concrete. -->

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
       Katie Hockman, GoLab 2019, "Go Module Proxy: Life of a Query" (proxy + sumdb), fits section 03. https://www.youtube.com/watch?v=kqMxaO9d1NM
     Honest framing: don't say GoLab covered SBOM/SLSA. -->

---
layout: default
---

# Give your AI the <Marker>tools</Marker>

<Ladder compact>
  <LadderRung v-click :n="1" title="Shell">let it run govulncheck and go test -fuzz itself</LadderRung>
  <LadderRung v-click :n="2" title="Your own MCP server">typed tools instead of a raw shell</LadderRung>
  <LadderRung v-click :n="3" title="Argus">an open source MCP server that runs govulncheck and gosec for your agent</LadderRung>
</Ladder>

<!-- ~1min30. The loop from section 02, made routine: the AI proposes, the tools give signals, the tests give evidence.
     Argus: ONE option among three, ~60s max, no demo. Present it in Toolbox mode: an MCP server that runs the scanners and serves skills, no LLM provider needed; your agent does the reasoning. "If you want it ready-made, I built one. Use it, fork it, or build your own." Go tooling is on main since 2026-10-15 (run_govulncheck, gosec via the Tool Catalog, #118) but NOT in a release yet (latest v0.3.0, 2026-07-30): cut a release before the talk. The built-in authz-audit skill hunts exactly the bug from section 02.
     Next in Golab #1 at 12:15: "Your AGENTS.md Is a Lie (And Here's How to Fix It)" by Dario Castañé. Good hand-off if the timing works. -->

---
layout: split-code
---

###### take this

# Everything, in one <Marker>repo</Marker>

Every practice from this talk, as Agent Skills.

Give them to your agent. Everything they write is tested.

::right::

```text
skills/
  go-security-audit/   # analyze, find
  verify-with-fuzz/    # hypothesis → evidence
  go-security-setup/   # make it routine
```

<!-- ~1min30. github.com/davideimola/go-security-skills, MIT, open Agent Skills format: Claude Code, Codex, Copilot, Cursor, Gemini CLI.
     go-security-audit: govulncheck, gosec triaged against the code, timeouts and body limits, fail-open authz, trust boundaries, unpinned actions. Reports findings, applies only the fixes you confirm.
     verify-with-fuzz: the section 02 story, packaged. Deny-by-default tests plus a fuzz property, run on today's code: reproduced or not.
     go-security-setup: installs security.yml (verify, vet, govulncheck, tests, weekly bounded fuzzing) and grouped Dependabot, checks the toolchain is patched, adds SECURITY.md.
     The point for the room: a skill that writes CI is itself supply chain. Every file these skills write already exists in the repo and is verified by its CI, actions pinned to full commit SHAs.
     "and with Argus" (Toolbox mode, skills in ~/.argus/skills/) only if the end-to-end test passed. -->

---
layout: center
---

# Give them to your <Marker>agent</Marker>

```sh
npx skills add davideimola/go-security-skills
```

<QRBlock value="https://github.com/davideimola/go-security-skills" label="github.com/davideimola/go-security-skills" />

<!-- ~20s. Leave it on screen long enough for phones to come out. Claude Code plugin install is in the README, not on the slide. -->

---
layout: fact
---

# 80-90%

of a cyber espionage campaign, executed by an AI agent

<div class="mt-6 text-base opacity-60">Anthropic · November 2025</div>

<!-- Anthropic, 2025-11-13: the AI performed "80-90% of the campaign", humans only at a few decision points.
     The "GTG-1002" name is not on the news page (maybe in the full PDF): don't say it unless verified. -->

---
layout: statement
---

# Attackers already run the loop.

<v-click>

# Run it <Marker>first</Marker>.

</v-click>

---
layout: statement
---

# Signals. Hypotheses. Evidence.

<v-click>

# Don't aim for perfect. Aim for paranoid and fix <Marker>fast</Marker>.

</v-click>

<!-- THE closing. First line recalls the guiding line from section 02, then the payoff. Pause. Then the end slide. -->

---
layout: end
qr: https://links.davideimola.dev
---

# Thank you

Slides, links and feedback.
