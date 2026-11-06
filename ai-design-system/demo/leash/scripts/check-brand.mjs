// The gate: fails when a colour or a script outside the brand lands in src/.
// No model, no prompt: it cannot be talked out of anything.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;

const PALETTE =
  "red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone";
const UTILITY = "bg|text|border|ring|fill|stroke|from|to|via|outline|decoration";
const TAILWIND_PALETTE = new RegExp(`\\b(?:${UTILITY})-(?:${PALETTE})-\\d{2,3}\\b`, "g");

const RULES = [
  [/#[0-9a-f]{3,8}\b/gi, "raw hex colour"],
  [/\b(rgba?|hsla?|oklch)\(/g, "raw colour function"],
  [TAILWIND_PALETTE, "Tailwind palette colour"],
  [/\p{sc=Han}|\p{sc=Hira}|\p{sc=Kana}/gu, "kanji or kana"],
];

// Every .ts, .tsx and .css file under src/, except the stylesheet that imports the brand.
const sourceFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(tsx?|css)$/.test(name) && name !== "index.css" ? [path] : [];
  });

const matches = (file, rule) =>
  readFileSync(file, "utf8")
    .split("\n")
    .flatMap((text, i) => [...text.matchAll(rule)].map((m) => ({ line: i + 1, value: m[0] })));

let failures = 0;
const report = (file, hit, what) => {
  failures++;
  console.log(`✗ ${relative(ROOT, file)}:${hit.line}  ${what}: ${hit.value}`);
};

for (const file of sourceFiles(join(ROOT, "src")))
  for (const [rule, what] of RULES)
    for (const hit of matches(file, rule)) report(file, hit, what);

if (failures) {
  console.log(`\n${failures} off-brand ${failures === 1 ? "value" : "values"}. Use a brand role: text-fg, bg-surface, border-rule, ...`);
  process.exit(1);
}
console.log("✓ on brand");
