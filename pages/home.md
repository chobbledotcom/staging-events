---
permalink: "/"
layout: "design-system-base.html"
title: "Production, Event Hire and Logistics across the UK"
description: "UK's leading staging and event hire company. Over 25 years experience in full production, equipment hire and logistics for mass participation charity events."
eleventyNavigation:
  key: Home
  order: 1
blocks:
  # Video hero
  - type: video-background
    full_width: true
    video_id: "https://player.mediadelivery.net/embed/587812/5e0c1006-a0c4-4a75-9198-b1b4414cceb0?autoplay=true&loop=true&muted=true&preload=true&responsive=true"
    video_title: Staging Events production
    aspect_ratio: "21/9"
    content: |
      ## Production, Event Hire and Logistics across the UK

      We provide full production, equipment hire and logistics services nationwide, specialising in mass participation charity events.

  # Featured products slider
  - type: items
    collection: featuredProducts
    intro: |
      ## Our Services
    horizontal: true

  # Stats
  - type: stats
    section_class: alt
    items:
      - value: "25+"
        label: Years Experience
      - value: "110,000"
        label: Event Participants
      - value: "120,000"
        label: Water Units Annually

  # Notable events
  - type: features
    header_title: Notable Events
    header_subtitle: >-
      We manage major initiatives for leading charities across the UK.
    items:
      - icon: "mdi:walk"
        title: Alzheimer's Society Memory Walk
        description: 110,000 participants over 7 weeks
      - icon: "mdi:ribbon"
        title: Prostate Cancer March for Men
        description: Full production and logistics support
      - icon: "mdi:hospital-building"
        title: The Children's Hospital Charity
        description: Event hire and production services
      - icon: "mdi:heart-pulse"
        title: Epilepsy UK
        description: Nationwide event support

  # Services split
  - type: split
    title: What We Offer
    reveal_content: left
    content: |
      - **Stage hire** - Modular deck staging and trailer stages
      - **PA systems** - Professional sound for events of all sizes
      - **Generator hire** - Standard and battery-powered options
      - **Gantry hire** - Start/finish gantries for mass participation events
      - **Bottled water delivery** - 120,000 units annually
      - **Secure warehouse storage** - Dedicated space with inventory management
      - **Event staffing** - Experienced crew for events nationwide
      - **MC services** - Professional event hosting
    button:
      text: View All Services
      href: /services/
      variant: secondary
    figure_type: image
    figure_content:
      src: images/Staging-Events-UK-Event-Hire-Production-Logistics-Stage-Hire-7.jpg
      alt: Staging Events service delivery

  # CTA
  - type: cta
    title: Ready to Plan Your Event?
    description: >-
      Contact our event specialists to discuss your requirements.
    button:
      text: Contact Us
      href: /contact/
      variant: secondary
      size: lg
---
