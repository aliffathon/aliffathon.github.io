---
layout: page
title: Archive
permalink: /archive/
intro: true
---

<ul>
{% for post in site.posts %}
  <li>{{ post.date | date: "%b %-d, %Y" }}: <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></li>
{% endfor %}
</ul>