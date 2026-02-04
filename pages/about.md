---
permalink: "/about/"
layout: "design-system-base.html"
title: "About Staging Events"
description: "For more than 25 years we have been involved in the event industry, providing expert guidance and reducing costs for clients."
eleventyNavigation:
  key: About
  order: 2
blocks:
  # Hero
  - type: hero
    full_width: true
    class: gradient
    title: About Staging Events
    lead: >-
      For more than 25 years we have been involved in the event industry,
      providing expert guidance and reducing costs for clients.

  # About split
  - type: split
    title: Our Background
    reveal_content: left
    content: |
      We provide expert guidance and reduce costs for clients while collaborating closely with major charities, emphasising personalised communication and flexible service delivery.

      We focus on large-scale multi-event delivery with in-house branding and artwork production capabilities.
    figure_type: image
    figure_content:
      src: images/Staging-Events-UK-Event-Hire-Production-Logistics-Stage-Hire-12.jpg
      alt: Staging Events event production

  # Sustainability split-full
  - type: split-full
    full_width: true
    variant: dark-left
    reveal_left: left
    reveal_right: right
    left_title: Hydration Stations
    left_content: |
      Our hydration stations have prevented over **100,000 single-use plastic bottles** from being used, eliminating approximately **2,500 kg of plastic waste**.
    right_title: Battery-Powered Generators
    right_content: |
      We introduced battery-powered generators (Instagrid 2.1 kWh) that reduce CO2 emissions by over **10 kg per hour** compared to diesel alternatives.

  # Stats
  - type: stats
    section_class: alt
    items:
      - value: "25+"
        label: Years in Events
      - value: "100,000+"
        label: Plastic Bottles Prevented
      - value: "2,500 kg"
        label: Plastic Waste Eliminated
      - value: "10+ kg/hr"
        label: CO2 Reduction vs Diesel

  # Image background
  - type: image-background
    full_width: true
    image: images/Hydration-Station.jpg
    image_alt: Hydration station at an event
    content: |
      ## Sustainability Commitment

      We are committed to environmental sustainability across all of our event services.

  # CTA
  - type: cta
    title: Work With Us
    description: >-
      Get in touch to discuss how we can support your next event.
    button:
      text: Contact Us
      href: /contact/
      variant: secondary
      size: lg
---
