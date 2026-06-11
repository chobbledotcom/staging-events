---
permalink: false
layout: ""
---

# Refine a Product Page — Working Prompt

## Goals (what the refined content must hit)

- **Balanced objective** — serve conversion, search, and accuracy roughly equally; none wins at the others' expense.
- **Audience: let the product decide** — read the product and pitch to whoever it genuinely suits. Staging Events serves charity event organisers (mass participation walks, runs), corporate/exhibition clients, local councils and community events, and private hirers. Let the product find its own audience rather than forcing one.
- **Thorough depth** — cover specs, use cases, who it's for, and reviews; length scales with how much there is genuinely to say. Don't pad.
- **Verifiable facts only** — every concrete claim traces to the product description, the images, a review, a client page, or a source found online. No invented dimensions, no inferred specs, no "perfect for any occasion" filler.
- **Always include a CTA** — every page nudges toward enquiry/contact via the `contact-form` block or a `cta` block, woven in naturally per VOICE.md (not a bolted-on "Book now today!").
- **Use the blocks layout heavily** — `split-image`, `split-html`, `gallery`, `features`, `stats`, `product-specs` where they add real signal. Not a wall of prose, and not every block on every page — use them where they earn their place.
- **Hit a fixed EEAT baseline** on every page (where verifiable): 25+ years trading since 1999 / 25,000 sq ft warehouse in Rotherham off the M1 and M18 / own around 95% of the kit; £5M public liability + risk assessments and method statements / what's-included; manufacturer or brand name where applicable (e.g. Intelistage, Instagrid); at least one synonym or alternate name; relevant location pages (Sheffield, Rotherham, Leeds, Doncaster, Barnsley) and venue links (NEC Birmingham, Manchester Central, ExCel London etc.) — not just category links.
- **Scope: one product, end-to-end** — fully refine a single product page this run as a reviewable template.

## Process

1. Find the least-recently-updated product or category page.
2. Read its description and extract **every concrete, verifiable fact** about the product into a temporary markdown file.
3. **Use the `llm-img` tool to save product image descriptions to the temp file.** This script is available system-wide and will generate a very detailed description of the image, with a model specifically tuned to describing images.
4. **Verify the product images.** You are good at describing images in context, but you are not as detailed as `llm-img` is. Ensure that your understanding of the images matches the more detailed description provided by `llm-img`.
5. Search the internet for the same product on other sites and add any **critical missing facts** — recording the source for each so it stays verifiable. Note the manufacturer/brand and any synonyms or alternate names. Use the Kagi search API (`KAGI_API_KEY` is in the environment):

   ```bash
   # first try this:
   kagi-search query
   # if that doesn't work, you can curl
   curl https://kagi.com/api/v1/search \
     -H "Authorization: Bearer $KAGI_API_KEY" \
     -H 'Content-Type: application/json' \
     -d '{ "query": "<your query goes here>", "format": "markdown" }'
   ```

6. **Find relevant reviews.** Staging Events is a division of DB Entertainment but trades under its own name, so the reviews live in `chobbledotcom/google-reviews-iframe`, under `data/db-entertainment/` — one JSON file per review (`[name]-[date].json`), each with `author`, `rating`, `content`, `date`, `source`. Search that directory for reviews whose `content` relates to staging hire, large-scale event production, or the product in question (loose match). **Filter strictly**: skip any review that mentions "DB Entertainment" by name — we can't quote those on the Staging Events site without implying they're about a different company. Note the relevant ones in the temp file. When quoting, use short excerpts (a sentence or two), not the whole review — we don't want to duplicate content that already appears on the DB Entertainment site.
7. **Cross-reference client pages.** Check the `clients/` directory for any client pages that mention the product or depend on it (e.g. the Alzheimer's Society Memory Walk page references staging, gantries, PA, and water supply). Note relevant client context — real charity names and real event figures are some of the strongest EEAT signals available.
8. Read SELLING_POINTS.md if it exists and copy any relevant points into the temp file.
9. Compile the new description from the collected data. Update the product's file so it:
   1. uses VOICE.md for tone — plain-spoken, dry, sceptical of marketing-speak, with a quiet South Yorkshire register and no dialect cosplay. Apply the WhatsApp test to each line. Complete sentences only — no fragments, no punchline closers, no cinematic one-liners.
   2. describes the product thoroughly and accurately with specifics over abstractions: the Intelistage system by name, not "a portable staging system"; the Instagrid ONE max at 2.1 kWh, not "an eco-friendly generator".
   3. **quotes the relevant part(s) of any matching review** — fix typos but otherwise verbatim; you needn't quote the whole review, just the relevant bit. Attribute as "John D said", or "John D from [Company]" if a company is named in the review `content` (there's no separate company field). Skip if no review genuinely relates to the product.
   4. hits the EEAT baseline (see Goals) and addresses searcher intent
   5. includes the synonyms / alternate names found
   6. intra-links to relevant products, categories, **client pages**, and **location/venue pages** — link to `/clients/alzheimers-society/` not just `/categories/staging/`; link to `/locations/sheffield/` not just "South Yorkshire".
   7. includes a natural CTA toward enquiry/contact (`contact-form` block preferred on product pages, `cta` block as alternative)
   8. uses the blocks layout to structure the page visually — prefer `split-image`, `split-html`, `gallery` for visual variety; `features` for lists; `stats` and `product-specs` selectively where they add real signal, not as boilerplate
   9. **updates the meta fields freely** (`title`, `meta_title`, `meta_description`) — prime searcher-intent space; keep synonyms in them. The `description` front matter field feeds page subtitles and meta — make it specific and search-relevant.
   10. **leaves the filename alone** unless it's absolutely terrible (last resort) — and if it must change, add a `redirect_from` for the old path _and_ update every internal reference to it
10. **FAQ block — only when it earns its place.** Add a `faqs` block **only if there are at least 3 genuinely product-specific questions** worth answering. Before writing any Q&A, sanity-check it against two tests:
    - **Specificity test:** does the answer say something _specific to this product_ (its mechanics, dimensions, manufacturer, branding, suitability quirks)? If the same answer would fit any hire company's page, cut it. No generic, found-everywhere-on-the-web answers.
    - **Triviality/maintenance test:** would the answer go stale if a trivial business detail changed? Avoid churny business facts — we do **not** want FAQs we'll have to update across dozens of pages when something minor changes.
    - If fewer than 3 questions survive both tests, **skip the FAQ block entirely** — no boilerplate FAQs, ever.
    - **⚠️ Property names: use `question` and `answer`, never `q` and `a`.** The chobble-template faqs block reads `faq.question` and `faq.answer`. Using `q`/`a` causes a render error.
11. Read over it. Check **every line, line-by-line, against the temp file** — each concrete claim must trace to a source. Run the EEAT baseline as a checklist.
12. Remove inaccuracies, assumptions, and unsupported inferences; tighten everything up.
13. Use the chobble-template blocks layout where it makes the page more visually interesting: https://raw.githubusercontent.com/chobbledotcom/chobble-template/refs/heads/main/BLOCKS_LAYOUT.md — consider `stats` and `product-specs` where they add real signal, but use them selectively, not as boilerplate.
14. Update each gallery image's caption to accurately reflect what's actually in the image.
15. **Image descriptions for public-facing content.** When describing images in front matter — captions, alt text, etc. — describe the product itself, not its surroundings. Do not mention the warehouse, storage equipment, or any unglamorous background context. The `llm-img` tool may describe surroundings in detail, but that's for internal verification only; strip that context from public-facing copy.
16. Re-check the whole thing against VOICE.md — you have a tendency to ignore it. Apply the WhatsApp test to each line. Watch for: sentence fragments, punchline closers, cinematic one-liners, rule-of-three lists, deflating undercuts, handle-the-objection moves, and generic northern markers. The voice lives in content and structure, not word choice.
17. You're done!
