---
name: Power
header_text: Generator Hire
subtitle: Standard and battery-powered generators
description: Generator hire from 2.2kva to 20kva including battery-powered eco-friendly options. Power solutions for events UK-wide.
header_image: images/fan-party-stage-crowd.jpg
featured: true
eleventyNavigation:
  key: Power
  parent: Services
  order: 4
blocks:
  - type: image-background
    parallax: true
    image: images/fan-party-stage-crowd.jpg
    image_alt: Generator Hire
    content: |-
      ## Generator Hire

      Standard and battery-powered generators
  - type: items
    collection: products
    filter:
      property: data.categories
      includes: power
  - type: markdown
    dark: true
    content: |-
      Range of generators available from 2.2kva to 20kva, including battery-powered options for eco-friendly events.
  - type: cta
    content: |
      ## Need Generator Hire?
      Contact our team for availability and pricing.
    button:
      text: Get a Quote
      href: /contact/
      variant: secondary
      size: lg
---
