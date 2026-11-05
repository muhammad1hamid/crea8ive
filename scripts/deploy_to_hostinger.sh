#!/usr/bin/env bash
# deploy_to_hostinger.sh
# Deploys frontend/out/ to Hostinger via rsync.
# Primary:  SSH key auth  (no password prompt, automation-safe)
# Fallback: sshpass + password auth (if key fails or is missing)
# All credentials read from PROJECT_ROOT/.env.local
#
# Options:
#   --check             Fail fast by testing SSH connectivity only.
#   --manifest <file>   Deploy only the listed out/ relative paths.

set -euo pipefail

CHECK_ONLY=false
MANIFEST_FILE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --check)
      CHECK_ONLY=true
      shift
      ;;
    --manifest)
      MANIFEST_FILE="${2:-}"
      if [[ -z "$MANIFEST_FILE" ]]; then
        echo "ERROR: --manifest requires a file path." >&2
        exit 1
      fi
      shift 2
      ;;
    *)
      echo "ERROR: Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

# ── Locate project root (one level up from this script) ──────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
ENV_FILE="$ROOT/.env.local"
OUT_DIR="$ROOT/frontend/out"

# ── Load .env.local ───────────────────────────────────────────────────────────
if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: .env.local not found at $ENV_FILE" >&2
  exit 1
fi

while IFS= read -r line || [[ -n "$line" ]]; do
  [[ "$line" =~ ^\s*# ]] && continue
  [[ -z "${line// }" ]] && continue
  if [[ "$line" == *"="* ]]; then
    key="${line%%=*}"
    value="${line#*=}"
    key="${key// /}"
    export "$key"="$value"
  fi
done < "$ENV_FILE"

# ── Required vars ─────────────────────────────────────────────────────────────
SSH_HOST="${SSH_HOST:?SSH_HOST not set in .env.local}"
SSH_PORT="${SSH_PORT:-65002}"
SSH_USER="${SSH_USER:?SSH_USER not set in .env.local}"
SSH_REMOTE_PATH="${SSH_REMOTE_PATH:-domains/crea8ivmedia.com/public_html}"
SSH_KEY="${SSH_KEY:-}"
SSH_PASSWORD="${SSH_PASSWORD:-}"

if [[ ! -d "$OUT_DIR" && "$CHECK_ONLY" != "true" ]]; then
  echo "ERROR: Build output not found at $OUT_DIR — run the build first." >&2
  exit 1
fi

if [[ -n "$MANIFEST_FILE" && ! -f "$MANIFEST_FILE" ]]; then
  echo "ERROR: Manifest file not found: $MANIFEST_FILE" >&2
  exit 1
fi

RSYNC_BASE=(rsync -avz --omit-dir-times --perms --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r)
SSH_COMMON_OPTS=(-p "$SSH_PORT" -o StrictHostKeyChecking=no -o ConnectTimeout=15 -o BatchMode=yes)
REMOTE="${SSH_USER}@${SSH_HOST}:${SSH_REMOTE_PATH}/"
SOURCE_DIR="$OUT_DIR"
STAGE_DIR=""

cleanup() {
  if [[ -n "$STAGE_DIR" && -d "$STAGE_DIR" ]]; then
    rm -rf "$STAGE_DIR"
  fi
}

trap cleanup EXIT

require_sshpass() {
  if command -v sshpass >/dev/null 2>&1; then
    return 0
  fi
  echo "ERROR: sshpass is not installed. Install it once before relying on password deploys." >&2
  exit 1
}

prepare_source_dir() {
  if [[ -z "$MANIFEST_FILE" ]]; then
    return 0
  fi

  STAGE_DIR="$(mktemp -d "${TMPDIR:-/tmp}/crea8iv-deploy-stage.XXXXXX")"
  while IFS= read -r raw || [[ -n "$raw" ]]; do
    rel="${raw#"${raw%%[![:space:]]*}"}"
    rel="${rel%"${rel##*[![:space:]]}"}"
    [[ -z "$rel" ]] && continue
    [[ "$rel" =~ ^# ]] && continue
    source_path="$OUT_DIR/$rel"
    target_path="$STAGE_DIR/$rel"

    if [[ ! -e "$source_path" ]]; then
      echo "ERROR: Manifest entry not found in export output: $rel" >&2
      exit 1
    fi

    mkdir -p "$(dirname "$target_path")"
    if [[ -d "$source_path" ]]; then
      mkdir -p "$target_path"
      rsync -a "$source_path/" "$target_path/"
    else
      cp "$source_path" "$target_path"
    fi
  done < "$MANIFEST_FILE"

  # mktemp creates a private directory; never propagate mode 700 to public_html.
  chmod 755 "$STAGE_DIR"
  SOURCE_DIR="$STAGE_DIR"
}

preflight_key() {
  [[ -n "$SSH_KEY" && -f "$SSH_KEY" ]] || return 1
  echo "▶ Checking SSH key auth: $SSH_KEY"
  ssh -i "$SSH_KEY" "${SSH_COMMON_OPTS[@]}" "$SSH_USER@$SSH_HOST" "exit" >/dev/null
}

preflight_password() {
  [[ -n "$SSH_PASSWORD" ]] || return 1
  require_sshpass
  echo "▶ Checking password auth (sshpass)"
  SSHPASS="$SSH_PASSWORD" sshpass -e ssh "${SSH_COMMON_OPTS[@]}" "$SSH_USER@$SSH_HOST" "exit" >/dev/null
}

deploy_with_key() {
  [[ -n "$SSH_KEY" && -f "$SSH_KEY" ]] || return 1
  echo "▶ Trying SSH key auth: $SSH_KEY"
  "${RSYNC_BASE[@]}" \
    -e "ssh -i \"$SSH_KEY\" -p $SSH_PORT -o StrictHostKeyChecking=no -o ConnectTimeout=15 -o BatchMode=yes" \
    "$SOURCE_DIR/" "$REMOTE"
}

deploy_with_password() {
  [[ -n "$SSH_PASSWORD" ]] || return 1
  require_sshpass
  echo "▶ Trying password auth (sshpass)..."
  SSHPASS="$SSH_PASSWORD" sshpass -e "${RSYNC_BASE[@]}" \
    -e "ssh -p $SSH_PORT -o StrictHostKeyChecking=no -o ConnectTimeout=15" \
    "$SOURCE_DIR/" "$REMOTE"
}

echo "=============================="
echo " Crea8iv Media Deploy Script"
echo "=============================="
echo "  Source : $SOURCE_DIR/"
echo "  Target : $REMOTE"
echo "  Port   : $SSH_PORT"
if [[ -n "$MANIFEST_FILE" ]]; then
  echo "  Mode   : Selective deploy via $MANIFEST_FILE"
fi
if [[ "$CHECK_ONLY" == "true" ]]; then
  echo "  Mode   : Connectivity preflight"
fi
echo ""

if [[ "$CHECK_ONLY" == "true" ]]; then
  if preflight_key; then
    echo ""
    echo "✅ SSH preflight passed (SSH key auth)"
    exit 0
  fi
  if preflight_password; then
    echo ""
    echo "✅ SSH preflight passed (password auth)"
    exit 0
  fi
  echo "ERROR: SSH preflight failed for both key and password auth." >&2
  exit 1
fi

(cd "$ROOT/frontend" && node scripts/verify-release.mjs)
prepare_source_dir

if deploy_with_key; then
  echo ""
  echo "Upload finished; checking all live sitemap and internal links..."
  node "$ROOT/frontend/scripts/verify-live-routes.mjs"
  echo "✅ Deploy complete and live routes verified (SSH key auth)"
  exit 0
fi

if deploy_with_password; then
  echo ""
  echo "Upload finished; checking all live sitemap and internal links..."
  node "$ROOT/frontend/scripts/verify-live-routes.mjs"
  echo "✅ Deploy complete and live routes verified (password auth)"
  exit 0
fi

echo "ERROR: Both SSH key and password auth failed. Deploy aborted." >&2
exit 1
