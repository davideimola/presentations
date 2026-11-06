#!/usr/bin/env bash
# Prepares demo 3a: a clone of davideimola/brand at the exact commit the deck
# installs (read from the pnpm lockfile), in demo/brand-scratch/, ignored by git.
# The live token editor writes and builds there; the deck's own dependency is
# never touched. Run it once before the talk, and again after a brand bump.
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$here/../../.." && pwd)"
scratch="$here/../brand-scratch"

sha="$(grep -o 'davideimola/brand/tar.gz/[0-9a-f]\{40\}' "$root/pnpm-lock.yaml" | head -1 | sed 's#.*/##')"
if [ -z "$sha" ]; then
  echo "no pinned @davideimola/brand commit in pnpm-lock.yaml" >&2
  exit 1
fi

if [ ! -d "$scratch/.git" ]; then
  git clone --quiet https://github.com/davideimola/brand.git "$scratch"
fi
git -C "$scratch" fetch --quiet origin
git -C "$scratch" checkout --quiet --force "$sha"
git -C "$scratch" clean --quiet -fd
(cd "$scratch" && pnpm install --frozen-lockfile --ignore-workspace --silent)
(cd "$scratch" && node scripts/build.mjs >/dev/null)
git -C "$scratch" checkout --quiet -- .

echo "brand-scratch ready at ${sha:0:7}"
