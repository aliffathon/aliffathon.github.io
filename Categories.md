---
layout: page
title: Categories
permalink: categories/
intro: true
---


<h2>Categories</h2>
<ul>
{% assign categories_list = site.categories %}
  {% if categories_list.first[0] == null %}
    {% for category in categories_list %}
      <li><a href="#{{ category }}">{{ category | capitalize }} ({{ site.tags[category].size }})</a></li>
    {% endfor %}
  {% else %}
    {% for category in categories_list %}
      <li>{{ category[0] | capitalize }} ({{ category[1].size }})
      <ul>
      {% for cat_post in category[1] %}
      	<li>{{ cat_post.date | date: "%B %d, %Y" }} <a href="{{ site.url }}{{ site.baseurl }}{{ cat_post.url }}">{{ cat_post.title }}</a></li>
      {% endfor %}
      </ul>
      </li>
    {% endfor %}
  {% endif %}
{% assign categories_list = nil %}
</ul>