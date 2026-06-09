---
description: Executes PRODUCT_PLAN.md to refine a product page
mode: primary
model: opencode-go/deepseek-v4-pro
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
  task: "allow"
  external_directory: "deny"
---

Read PRODUCT_PLAN.md in the project root and follow every step exactly. That file is your complete instruction set for this run.
