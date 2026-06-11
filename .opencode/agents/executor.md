---
description: Executes PRODUCT_PLAN.md to refine a product page
mode: primary
model: neuralwatt/kimi-k2.6-fast
permission:
  read:
    "*": "allow"
    "*.md": "allow"
    "*.markdown": "allow"
    "*.jpg": "allow"
    "*.jpeg": "allow"
    "*.json": "allow"
    "*.png": "allow"
    "*.gif": "allow"
    "*.webp": "allow"
    "*.svg": "allow"
  edit:
    "*": "deny"
    "*.jpg": "allow"
    "*.md": "allow"
  bash:
    "*": "deny"
    "llm-img": "allow"
    "llm-img *": "allow"
    "ls": "allow"
    "ls *": "allow"
    "cat *": "allow"
    "kagi-search *": "allow"
    "curl *": "allow"
    "git *": "allow"
    "sort": "allow"
    "head": "allow"
    "wc": "allow"
  glob: "allow"
  grep: "allow"
  webfetch: "allow"
  websearch: "deny"
  task: "allow"
  external_directory: "deny"
---

Read PRODUCT_PLAN.md in the project root and follow every step exactly. That file is your complete instruction set for this run.
