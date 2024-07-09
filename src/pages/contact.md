---
title: Contact
description: You can find me in several places in the internet, often as @sdvim.
updated: 2022-12-31
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
