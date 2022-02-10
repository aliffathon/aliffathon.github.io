---
layout: page
title: Tags
permalink: tags/
intro: true
---


<h2>Tags</h2>
<ul>
{% assign tags_list = site.tags %}
  {% if tags_list.first[0] == null %}
    {% for tag in tags_list %}
      <li><a href="#{{ tag }}">{{ tag | capitalize }} ({{ site.tags[tag].size }})</a></li>
    {% endfor %}
  {% else %}
    {% for tag in tags_list %}
      <li>{{ tag[0] | capitalize }} ({{ tag[1].size }})
      <ul>
      {% for tag_post in tag[1] %}
      	<li>{{ tag_post.date | date: "%B %d, %Y" }}: <a href="{{ site.url }}{{ site.baseurl }}{{ tag_post.url }}">{{ tag_post.title }}</a></li>
      {% endfor %}
      </ul>
      </li>
    {% endfor %}
  {% endif %}
{% assign tags_list = nil %}
</ul>