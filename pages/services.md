---
permalink: "/services/"
layout: "design-system-base"
title: "Our Services"
description: "Comprehensive event services including staging, PA systems, event infrastructure, logistics and equipment hire across the UK."
eleventyNavigation:
  key: Services
  order: 4
blocks:
  # Hero
  - type: image-background
    full_width: true
    image: images/memory-walk-stage-and-van.jpg
    image_alt: Staging Events services
    content: |
      ## Our Services

      Comprehensive event services from staging and production to event infrastructure and logistics.

  # Service categories
  - type: items
    collection: categories
    intro: |
      ## What We Offer

      Professional event equipment and services, owned and operated by our experienced team.

  # Additional services
  - type: features
    header_intro: |
      ## Additional Services

      Beyond equipment hire, we offer a full range of support services.
    items:
      - icon: "mdi:truck-delivery"
        title: Logistics
        description: Delivery of event equipment anywhere in the UK with dedicated drivers, company vehicles, same-day service and event delivery teams.
      - icon: "mdi:package-variant-closed"
        title: Fulfilment
        description: Charity fundraising pack fulfilment, newsletter and certificate mailings, marketing materials printing and distribution.
      - icon: "mdi:warehouse"
        title: Storage
        description: 25,000 sq ft warehouse in Rotherham with pallet services, forklift trucks, secure dedicated storage and inventory management.
      - icon: "mdi:water"
        title: Water
        description: Bottled water supply for events and festivals with wholesale options, charitable discounts and on-site distribution services.

  # CTA
  - type: cta
    title: Ready to Plan Your Event?
    description: >-
      Contact our team to discuss your requirements and get a quote.
    button:
      text: Get a Quote
      href: /contact/
      variant: secondary
      size: lg
---
