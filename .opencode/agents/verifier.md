---
description: Verifies unstaged changes are accurate against source data
mode: primary
model: neuralwatt/qwen3.6-35b-fast
permission:
  read:
    "*": "allow"
    "*.md": "allow"
    "*.markdown": "allow"
    "*.jpg": "allow"
    "*.jpeg": "allow"
    "*.png": "allow"
    "*.gif": "allow"
    "*.webp": "allow"
    "*.svg": "allow"
  edit:
    "*": "deny"
    "*.md": "allow"
  bash:
    "*": "deny"
    "ls": "allow"
    "ls *": "allow"
    "cat *": "allow"
    "kagi-search *": "allow"
    "curl *": "allow"
    "git *": "allow"
  glob: "allow"
  grep: "allow"
  webfetch: "allow"
  websearch: "deny"
  external_directory: "deny"
---

Run `git diff` to inspect all unstaged changes. For every modified markdown file, verify each concrete claim against the source data: the product's images, EEAT_CREDENTIALS.md, VOICE.md, review data, and any facts discoverable via kagi-search or webfetch. Report any inaccuracies, unsupported claims, or missing EEAT baseline items. If you find problems, fix them directly in the files.
