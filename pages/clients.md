---
permalink: "/clients/"
layout: "design-system-base.html"
title: "Our Clients"
description: "Our charity events clients including Alzheimer's Society Memory Walk, The Children's Hospital Charity, Prostate Cancer UK, and more."
eleventyNavigation:
  key: Clients
  order: 3
blocks:
  # Hero
  - type: hero
    full_width: true
    class: gradient
    badge: Trusted Partners
    title: Our Clients
    lead: >-
      We work with a wide range of charity organisations and events.

  # Client list
  - type: split
    title: Charity Events
    reveal_content: left
    reveal_figure: scale
    content: |
      We have proudly worked with some of the UK's leading charities and organisations, providing full event production, staging, PA systems, gantry hire and logistics for mass participation events nationwide.
    figure_type: image
    figure_src: images/Festivals.jpg
    figure_alt: Staging Events charity event
    button:
      text: Get in Touch
      href: /contact/
      variant: secondary

  # Client cards
  - type: items
    collection: clients
    section_class: alt
    intro: |
      ## Who We Work With

  # Notable stats
  - type: stats
    section_class: dark
    items:
      - value: "110,000"
        label: Event Participants
      - value: "7 weeks"
        label: Memory Walk Programme
      - value: "UK-wide"
        label: Event Coverage
      - value: "25+"
        label: Years Experience

  # CTA
  - type: cta
    title: Work With Us
    description: >-
      Whatever event size you have planned, we are here to help.
    button:
      text: Contact Us
      href: /contact/
      variant: secondary
      size: lg
---
