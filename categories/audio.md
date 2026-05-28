---
name: Audio
header_text: PA Systems
subtitle: Professional sound systems for events
description: PA system hire including full rigs with mixers, microphones and monitors. Professional sound solutions for events.
header_image: images/band-performing-night-lights.jpg
featured: true
eleventyNavigation:
  key: Audio
  parent: Services
  order: 3
blocks:
  - type: image-background
    parallax: true
    image: images/band-performing-night-lights.jpg
    image_alt: PA Systems
    content: |-
      ## PA Systems

      Professional sound systems for events
  - type: items
    collection: products
    filter:
      property: data.categories
      includes: audio
  - type: markdown
    dark: true
    content: |-
      Professional PA system hire with full rigs including mixers, microphones and monitors for events of all sizes.
  - type: cta
    content: |
      ## Need PA Systems?
      Contact our team for availability and pricing.
    button:
      text: Get a Quote
      href: /contact/
      variant: secondary
      size: lg
---
