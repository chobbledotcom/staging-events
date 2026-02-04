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
    title: Our Clients
    lead: >-
      We work with a wide range of charity organisations and events.

  # Client list
  - type: split
    title: Charity Events
    reveal_content: left
    content: |
      We have proudly worked with some of the UK's leading charities and organisations:

      - [Alzheimer's Society Memory Walk](/clients/alzheimers-society/)
      - [The Children's Hospital Charity](/clients/childrens-hospital-charity/)
      - [Prostate Cancer UK](/clients/prostate-cancer-uk/)
      - [Epilepsy UK](/clients/epilepsy-uk/)
      - [CoppaFeel!](/clients/coppafeel/)
    figure_type: image
    figure_content:
      src: images/Festivals.jpg
      alt: Staging Events charity event

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
