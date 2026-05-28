---
name: Trussing
header_text: Stage Trussing
subtitle: Professional rigging equipment
description: Professional rigging equipment hire from leading manufacturers. Extensive inventory of Litec truss stock for events.
header_image: images/stage-trussing-flightcase.jpg
featured: true
redirect_from:
  - /stage-trussing/
eleventyNavigation:
  key: Trussing
  parent: Services
  order: 5
blocks:
  - type: image-background
    parallax: true
    image: images/stage-trussing-flightcase.jpg
    image_alt: Stage Trussing
    content: |-
      ## Stage Trussing

      Professional rigging equipment
  - type: items
    collection: products
    filter:
      property: data.categories
      includes: trussing
  - type: markdown
    dark: true
    content: |-
      Extensive inventory of rigging equipment from leading manufacturers, appropriately packaged for protection, efficient transport and rapid deployment.
  - type: cta
    content: |
      ## Need Stage Trussing?
      Contact our team for availability and pricing.
    button:
      text: Get a Quote
      href: /contact/
      variant: secondary
      size: lg
---
