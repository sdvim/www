---
layout: ../layouts/base.astro
title: Contact
description: You can find me in several places in the internet, often as @sdvim.
updated: 2021-06-29
related:
  About: /about
setup: |
  import socials from '../data/socials.json'
---

{socials.map(({ url, title, description }) => (
  <p>
    <a href={url}>{title}</a>: {description}
  </p>
))}