#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_DIR="$(cd "$ROOT_DIR/.." && pwd)"
STAMP="$(date +%Y%m%d_%H%M%S)"
ARCHIVE="${1:-/tmp/crea8iv-media-node-${STAMP}.zip}"
WORK_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$WORK_DIR"
}
trap cleanup EXIT

rsync -a "$ROOT_DIR/" "$WORK_DIR/" \
  --exclude "node_modules" \
  --exclude ".next" \
  --exclude ".next.bak.*" \
  --exclude ".next-build-verified-*" \
  --exclude ".next-corrupt-*" \
  --exclude "out" \
  --exclude ".deploy" \
  --exclude ".claude" \
  --exclude ".crea8iv-cms" \
  --exclude ".env*" \
  --exclude "qa-*.png" \
  --exclude "screenshot*.png" \
  --exclude "implementation-*.png" \
  --exclude "design-qa*.png" \
  --exclude "public/portfolio-assets"

mkdir -p "$WORK_DIR/project/documentation"
mkdir -p "$WORK_DIR/project/assets/blog-covers-2026-premium"
mkdir -p "$WORK_DIR/project/public-website/astro/src/data"

rsync -a "$REPO_DIR/project/documentation/blog-drafts" "$WORK_DIR/project/documentation/"
rsync -a "$REPO_DIR/project/documentation/crea8iv-editorial-calendar-status.md" "$WORK_DIR/project/documentation/"
rsync -a "$REPO_DIR/project/assets/blog-covers-2026-premium/manifest.json" "$WORK_DIR/project/assets/blog-covers-2026-premium/" 2>/dev/null || true
rsync -a "$REPO_DIR/project/public-website/astro/src/data/pages.json" "$WORK_DIR/project/public-website/astro/src/data/"

cd "$WORK_DIR"

zip -qr "$ARCHIVE" .

BYTES="$(wc -c < "$ARCHIVE" | tr -d ' ')"
WARN_LIMIT=$((100 * 1024 * 1024))

echo "$ARCHIVE"
echo "archive_bytes=$BYTES"

if [[ "$BYTES" -gt "$WARN_LIMIT" ]]; then
  echo "WARNING: archive is larger than 100MB. Hostinger may take longer to upload." >&2
fi
