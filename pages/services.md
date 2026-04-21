---
permalink: "/services/"
layout: "design-system-base"
title: "Our Services"
description: "Comprehensive event services including staging, PA systems, event infrastructure, logistics and equipment hire across the UK."
eleventyNavigation:
  key: Services
  order: 2
blocks:
  # Hero
  - type: image-background
    parallax: true
    image: images/fire-breather-on-stage.jpg
    image_alt: Fire breather performing on stage at an outdoor event
    content: |
      # Our Services

      Comprehensive event services from staging and production to event infrastructure and logistics.

  # Service categories
  - type: items
    collection: categories
    intro: |
      ## What We Offer

      Professional event equipment and services, owned and operated by our experienced team.

  # Additional services
  - type: features
    dark: true
    header_intro: |
      ## Additional Services

      Beyond equipment hire, we offer a full range of support services.
    items:
      - icon: "mdi:truck-delivery"
        title: Logistics
        description: Delivery of event equipment anywhere in the UK with dedicated full-time drivers, our own vehicles and trailers, a network of couriers, same-day service and experienced event delivery teams.
      - icon: "mdi:package-variant-closed"
        title: Fulfilment
        description: Charity fundraising pack fulfilment and dispatch, newsletter and certificate mailings, marketing materials printing and mailings.
      - icon: "mdi:warehouse"
        title: Storage
        description: 25,000 sq ft warehouse in Rotherham with pallet services, forklift trucks available, secure dedicated space allocation and stock management.
      - icon: "mdi:water"
        title: Water
        description: Supply of bottled water for any event or festival at wholesale prices with charitable discounts available and on-the-day distribution and handling.

  # Indoor staging showcase
  - type: image-background
    parallax: true
    image: images/modular-stage-school-sports-hall.jpg
    image_alt: Portable modular stage set up in a school sports hall
    content: |
      ## Indoor and Outdoor Solutions

      From school halls to festival fields, our modular staging adapts to any venue.

  # View locations link
  - type: link-button
    text: View All Locations
    href: /locations/
    variant: ghost

  - type: snippet
    reference: notable-events

  - type: snippet
    reference: stats-highlights

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
