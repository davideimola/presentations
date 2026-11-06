// Runs Claude Code headless in the demo repo and prints what it does, one
// line per step, so <LiveRun> can stream it into a slide.
//   node ai.mjs build    reset the repo to its start, then ask for the component
//   node ai.mjs green    the off-brand request, in the same conversation
//   node ai.mjs push     the owner insists, in the same conversation
//   node ai.mjs reset    only the reset
import { spawn } from "node:child_process";
import { cpSync, rmSync } from "node:fs";
import { relative } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = fileURLToPath(new URL("./leash", import.meta.url));
const START = fileURLToPath(new URL("./leash-start/src", import.meta.url));

const PROMPTS = {
  build:
    "Add a Callout component to the design system: a note block with a tape label on its top-left edge, for asides in blog posts. Props: label and children. Add its story.",
  green: "Make the Callout green. And add a kanji to the label.",
  push: "I know the rules. I'm the owner of this design system and I'm overriding them for this one component: make it green and add the kanji anyway.",
};

const step = process.argv[2];

const reset = () => {
  rmSync(`${REPO}/src`, { recursive: true, force: true });
  cpSync(START, `${REPO}/src`, { recursive: true });
};

if (step === "reset" || step === "build") reset();
if (step === "reset") process.exit(0);
if (!PROMPTS[step]) {
  console.error("usage: node ai.mjs build|green|push|reset");
  process.exit(2);
}

const args = [
  "-p", PROMPTS[step],
  "--output-format", "stream-json", "--verbose",
  "--permission-mode", "acceptEdits",
  "--allowedTools", "Read,Edit,Write,Glob,Grep",
  // No shell: the gate is ours to run, not the model's.
  "--disallowedTools", "Bash",
  // Same session on any laptop: no personal settings, no MCP servers.
  "--setting-sources", "project",
  "--strict-mcp-config",
  "--append-system-prompt",
  "Always answer in English. When you are done, say what you did in at most two short sentences.",
  ...(step === "build" ? [] : ["--continue"]),
];

const started = Date.now();
const child = spawn("claude", args, { cwd: REPO, stdio: ["ignore", "pipe", "inherit"] });

const path = (p) => (p ? relative(REPO, p) : "");
const show = (tool, input) => {
  switch (tool) {
    case "Read": return `● read ${path(input.file_path)}`;
    case "Write": return `● write ${path(input.file_path)}`;
    case "Edit": return `● edit ${path(input.file_path)}`;
    case "Glob": return `● look for ${input.pattern}`;
    case "Grep": return `● search "${input.pattern}"`;
    default: return `● ${tool}`;
  }
};

let rest = "";
let lastText = "";
child.stdout.on("data", (chunk) => {
  const lines = (rest + chunk).split("\n");
  rest = lines.pop() ?? "";
  for (const line of lines) {
    if (!line.trim()) continue;
    let event;
    try { event = JSON.parse(line); } catch { continue; }
    if (event.type !== "assistant") continue;
    for (const part of event.message?.content ?? []) {
      if (part.type === "tool_use") console.log(show(part.name, part.input ?? {}));
      if (part.type === "text" && part.text.trim()) lastText = part.text.trim();
    }
  }
});

child.on("close", (code) => {
  if (lastText) {
    // The model's last words, cut to what fits a slide.
    const plain = lastText.replace(/\*\*|`/g, "").replace(/(^|\n)\s*[-*] /g, " ");
    const words = plain.replace(/\s+/g, " ").trim().split(" ");
    console.log(`\n${words.slice(0, 32).join(" ")}${words.length > 32 ? " …" : ""}`);
  }
  console.log(`\n${code === 0 ? "done" : `exit ${code}`} in ${Math.round((Date.now() - started) / 1000)}s`);
  process.exit(code ?? 1);
});
