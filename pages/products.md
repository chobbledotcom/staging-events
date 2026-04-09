---
permalink: "/products/"
layout: "design-system-base"
title: "Our Products"
description: "Browse our full range of event hire products including stages, PA systems, generators, lighting, gantries and more."
eleventyNavigation:
  key: Products
  order: 3
blocks:
  - type: image-background
    container_width: full
    parallax: true
    image: images/band-trussed-stage-spotlit-side-view.jpg
    image_alt: Band performing on stage with dramatic green and purple lighting
    content: |
      # Our Products

      Browse our full range of event hire equipment, from stages and PA systems to lighting and power solutions.

  - type: items
    collection: products
    masonry: true

  - type: link-button
    text: View by Category
    href: /services/
    variant: ghost

  - type: include
    file: snippets/stats-highlights

  - type: cta
    title: Need Equipment for Your Event?
    description: >-
      Contact our team for availability, pricing and package deals.
    button:
      text: Get a Quote
      href: /contact/
      variant: secondary
      size: lg

  - type: include
    file: snippets/contact-info
---
