#!/bin/sh
# Downloads the Go vulnerability database next to the demos, so the live
# govulncheck run reads it from disk instead of the conference Wi-Fi.
# Run it the day before the talk (or the morning of it): the database grows.
set -eu
dir="$(cd "$(dirname "$0")" && pwd)/vulndb"
rm -rf "$dir"
mkdir -p "$dir"
curl -fsSL https://vuln.go.dev/vulndb.zip -o "$dir.zip"
unzip -q "$dir.zip" -d "$dir"
rm "$dir.zip"
echo "vulndb ready in $dir"
