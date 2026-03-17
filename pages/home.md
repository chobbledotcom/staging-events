---
permalink: "/"
layout: "design-system-base.html"
title: "Event Hire, Staging, Entertainment and Logistics across the UK"
description: "UK's leading event hire and entertainment company. Over 25 years experience in staging, corporate entertainment, equipment hire and logistics for events nationwide."
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
      ## Event Hire, Staging, Entertainment and Logistics across the UK

      From stage hire and PA systems to bouncy castles, climbing walls and photo booths. Full production, entertainment and logistics services nationwide.

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
      - value: "95%"
        label: Equipment Owned & Operated
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
      - **Stage hire** - Modular deck staging, trailer stages and marquees
      - **Entertainment** - Bouncy castles, rodeo bulls, assault courses
      - **Photo booths** - Traditional, selfie mirror, AI and 360 booths
      - **Team building** - It's a Knockout, climbing walls, laser tag
      - **Interactive games** - Arcade machines, racing simulators, dance games
      - **PA systems** - Professional sound for events of all sizes
      - **Generator hire** - Standard and battery-powered options
      - **Gantry hire** - Start/finish gantries for events
      - **Event staffing** - Experienced crew nationwide
      - **Logistics** - Storage, fulfilment and water delivery
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
