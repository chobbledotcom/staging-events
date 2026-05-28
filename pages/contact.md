---
permalink: "/contact/"
layout: "design-system-base.html"
name: "Contact"
description: "Contact Staging Events for event hire, production and logistics services. Based centrally, serving events across the UK."
eleventyNavigation:
  key: Contact
  order: 6
blocks:
  # Hero
  - type: image-background
    parallax: true
    image: images/memory-walk-stage-and-pa.jpg
    image_alt: Staging Events PA system at event
    content: |
      # Contact Us

      Connect with our event specialists.

  # Contact form with details
  - type: contact-form
    content: |
      ## Get in Touch

      **Phone:** [0845 468 0610](tel:+448454680610)

      **Email:** [events@stagingevents.co.uk](mailto:events@stagingevents.co.uk)

      ### Address

      Head Office
      Bede House
      Salisbury Road
      Maltby
      Rotherham
      South Yorkshire
      S66 8JP
      United Kingdom

  - type: icon-links
    intro_content: |
      ### Follow Us
    items:
      - icon: "mdi:facebook"
        text: Facebook
        url: "https://facebook.com/stagingevents"
      - icon: "mdi:twitter"
        text: Twitter
        url: "https://twitter.com/stagingevents"
      - icon: "mdi:instagram"
        text: Instagram
        url: "https://instagram.com/stagingevents"
      - icon: "mdi:linkedin"
        text: LinkedIn
        url: "https://www.linkedin.com/company/staging-events"

  # UK coverage
  - type: split-full
    variant: dark-left
    left_content: |
      ## Based Centrally, Serving Events Across the UK
      Operating from our 25,000 sq ft warehouse, we deliver professional event production and equipment hire nationwide. From charity walks in London to festivals in Edinburgh — wherever your event is, we can be there.
    left_button:
      text: View Our Clients
      href: /clients/
      variant: secondary
    right_content: |
      ## Why Choose Us
      - **25+ years** of event production experience
      - **95% of equipment** owned and operated in-house
      - **Full logistics** — delivery, setup and collection UK-wide
      - **Single supplier** for staging, PA, power and infrastructure
    right_button:
      text: Get a Quote
      href: /contact/
      variant: primary

  - type: snippet
    reference: stats-highlights
---
