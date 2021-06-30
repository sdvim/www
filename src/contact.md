---
title: Contact
updated: 2021-06-29
eleventyNavigation:
  key: Contact
  order: 2
---

You can find me in several places in the internet, often as **@sdvim**.

{% for social in socials %}
<a href="{{ social.url }}">{{ social.title }}</a>: {{ social.description }}
{% endfor %}
