// Gets both demos ready, so nothing has to be remembered on the day.
// Idempotent and quick when everything is already in place; `pnpm dev` in
// src/ runs it before the slides, `pnpm demo:prep` runs it alone.
//   - demo 3a: the brand clone at the commit the deck installs
//   - demo 3b: the demo repo installed and reset to its start
//   - Claude Code signed in, and still signed in on the day of the talk
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";

const TALK_DAY = "2026-11-19";

const here = fileURLToPath(new URL(".", import.meta.url));
const root = fileURLToPath(new URL("../..", import.meta.url));
const scratch = `${here}brand-scratch`;
const leash = `${here}leash`;

const problems = [];
const ok = (msg) => console.log(`  ✓ ${msg}`);
const warn = (msg) => {
  problems.push(msg);
  console.log(`  ✗ ${msg}`);
};
const run = (cmd, args, cwd) => spawnSync(cmd, args, { cwd, stdio: "inherit" }).status === 0;

console.log("demos:");

// 3a: brand clone at the pinned commit.
const lock = readFileSync(`${root}pnpm-lock.yaml`, "utf8");
const pinned = lock.match(/davideimola\/brand\/tar\.gz\/([0-9a-f]{40})/)?.[1];
const head = existsSync(`${scratch}/.git`)
  ? execFileSync("git", ["-C", scratch, "rev-parse", "HEAD"], { encoding: "utf8" }).trim()
  : "";
if (pinned && head === pinned) ok(`3a brand clone at ${pinned.slice(0, 7)}`);
else if (run("bash", [`${here}brand/setup.sh`], here)) ok("3a brand clone ready");
else warn("3a brand clone failed: run demo/brand/setup.sh and read the error");

// 3b: demo repo installed and back to its start.
if (!existsSync(`${leash}/node_modules`)) {
  if (!run("pnpm", ["install", "--frozen-lockfile", "--ignore-workspace", "--silent"], leash))
    warn("3b demo repo install failed: pnpm install --ignore-workspace in demo/leash");
}
if (run(process.execPath, [`${here}ai.mjs`, "reset"], here)) ok("3b demo repo reset to its start");
else warn("3b reset failed: node demo/ai.mjs reset");

// Claude Code: signed in, and the sign-in outlives the talk.
try {
  const auth = JSON.parse(execFileSync("claude", ["auth", "status"], { encoding: "utf8" }));
  const expires = auth.loginExpiresAt ? new Date(auth.loginExpiresAt) : null;
  const dayAfter = new Date(`${TALK_DAY}T23:59:59Z`);
  if (!auth.loggedIn) warn("Claude Code is signed out: run claude auth login");
  else if (expires && expires < dayAfter)
    warn(`Claude Code sign-in expires ${expires.toISOString().slice(0, 10)}, before the talk (${TALK_DAY}): run claude auth login, or claude setup-token`);
  else ok(`Claude Code signed in${expires ? ` until ${expires.toISOString().slice(0, 10)}` : ""}`);
} catch {
  warn("Claude Code not found: install it, or the 3b demo shows the recording");
}

// Ports: an old deck or Storybook still running would answer instead of the
// new one, without the live demos.
const free = (port) =>
  new Promise((resolve) => {
    const server = createServer().once("error", () => resolve(false));
    server.listen(port, "127.0.0.1", () => server.close(() => resolve(true)));
  });
for (const [port, what] of [[3030, "slides"], [6006, "Storybook"]]) {
  if (await free(port)) ok(`port ${port} free for ${what}`);
  else warn(`port ${port} is taken: an old ${what} still running? lsof -i :${port}, then stop it`);
}

if (problems.length) console.log(`\n${problems.length} to fix before the talk. The slides start anyway; the demos fall back to the recordings.\n`);
else console.log("\nall set.\n");
