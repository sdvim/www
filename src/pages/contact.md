---
layout: ../layouts/base.astro
title: Contact
updated: 2021-06-29
setup: |
  import socials from '../data/socials.json'
---
You can find me in several places in the internet, often as **@sdvim**.

{socials.map(({ url, title, description }) => (
  <p>
    <a href={url}>{title}</a>: {description}
  </p>
))}

### Related pages
- [About](/about)
