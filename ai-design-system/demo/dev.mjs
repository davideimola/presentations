// `pnpm dev` for this talk: prepares the demos, starts the demo repo's
// Storybook in the background (port 6006, log in demo/storybook.log), then
// the slides. Quitting the slides stops Storybook too. Extra arguments go to
// Slidev: `pnpm dev --remote --bind <ip>`.
import { spawn, spawnSync } from "node:child_process";
import { openSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const src = fileURLToPath(new URL("../src", import.meta.url));

spawnSync(process.execPath, [`${here}prep.mjs`], { stdio: "inherit" });

const log = openSync(`${here}storybook.log`, "w");
const storybook = spawn("pnpm", ["storybook"], { cwd: `${here}leash`, stdio: ["ignore", log, log], detached: true });
console.log("storybook: http://localhost:6006 (log in demo/storybook.log)\n");

const slides = spawn("pnpm", ["exec", "slidev", "--open", ...process.argv.slice(2), "slides.md"], { cwd: src, stdio: "inherit" });

const stop = () => {
  try { process.kill(-storybook.pid); } catch {}
};
slides.on("exit", (code) => { stop(); process.exit(code ?? 0); });
process.on("SIGINT", () => slides.kill("SIGINT"));
process.on("SIGTERM", () => { slides.kill("SIGTERM"); stop(); });
