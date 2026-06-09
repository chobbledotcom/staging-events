#!/usr/bin/env bash
set -euo pipefail

echo "=== Pulling latest changes ==="
git pull

BLOCKS_LAYOUT_LOCAL=".blocks-layout-ref.md"
REVIEWS_LOCAL=".reviews-json"
cleanup() { rm -f "$BLOCKS_LAYOUT_LOCAL"; rm -rf "$REVIEWS_LOCAL"; }
trap cleanup EXIT

blocks_flag=""
if [ -f ../chobble-template/BLOCKS_LAYOUT.md ]; then
  cp ../chobble-template/BLOCKS_LAYOUT.md "$BLOCKS_LAYOUT_LOCAL"
  blocks_flag="BLOCKS_LAYOUT.md has been copied to ${BLOCKS_LAYOUT_LOCAL} in this directory. Use that local copy instead of fetching the URL in step 11."
fi

reviews_flag=""
if [ -d /home/user/git/google-reviews-frame/data/db-entertainment ]; then
  cp -r /home/user/git/google-reviews-frame/data/db-entertainment "$REVIEWS_LOCAL"
  reviews_flag="Reviews have been copied to ${REVIEWS_LOCAL}/ in this directory. Use that local copy instead of accessing the external repo in step 5."
fi

echo "=== Step 1: Executing PRODUCT_PLAN.md ==="
opencode run --thinking --agent executor "Read PRODUCT_PLAN.md and execute it fully. ${blocks_flag} ${reviews_flag}"

modified_files=$(git diff --name-only -- '*.md' | tr '\n' ', ' | sed 's/,$//')

echo ""
echo "=== Step 2: Verifying unstaged changes ==="
opencode run --thinking --agent verifier "Verify that the unstaged changes are accurate."

echo ""
echo "=== Done ==="
notify-send "Product Plan Complete" "Finished editing: ${modified_files:-unknown}. Ready for check-over."
