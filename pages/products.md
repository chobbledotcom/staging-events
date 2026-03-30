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
    full_width: true
    parallax: true
    image: images/2024-02-17-16.17.26.jpg
    image_alt: Band performing on stage with dramatic green and purple lighting
    content: |
      # Our Products

      Browse our full range of event hire equipment, from stages and PA systems to lighting and power solutions.

  - type: items
    collection: products

  - type: link-button
    text: View by Category
    href: /services/
    variant: ghost

  - type: cta
    title: Need Equipment for Your Event?
    description: >-
      Contact our team for availability, pricing and package deals.
    button:
      text: Get a Quote
      href: /contact/
      variant: secondary
      size: lg
---
