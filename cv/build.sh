#!/usr/bin/env bash
# Rebuild kevinNyawakira_CV.pdf from cv.html using headless Chrome.
# Usage: ./build.sh
set -euo pipefail
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="../kevinNyawakira_CV.pdf"

"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=10000 \
  --print-to-pdf="$OUT" \
  "file://$PWD/cv.html" 2>/dev/null

echo "built -> $(cd .. && pwd)/kevinNyawakira_CV.pdf"
