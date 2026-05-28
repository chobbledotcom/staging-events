---
permalink: "/products/"
layout: "design-system-base"
name: "Our Products"
description: "Browse our full range of event hire products including stages, PA systems, generators, lighting, gantries and more."
eleventyNavigation:
  key: Products
  order: 4
blocks:
  - type: image-background
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

  - type: snippet
    reference: stats-highlights

  - type: cta
    content: |
      ## Need Equipment for Your Event?
      Contact our team for availability, pricing and package deals.
    button:
      text: Get a Quote
      href: /contact/
      variant: secondary
      size: lg

  - type: snippet
    reference: contact-info
---
