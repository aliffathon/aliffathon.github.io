---
title: tanpa layout
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
      <li><a href="#{{ tag[0] }}">{{ category[0] | capitalize }} ({{ category[1].size }})</a></li>
    {% endfor %}
  {% endif %}
{% assign categories_list = nil %}
</ul>
---
{% for tag in site.categories %}
  <h3 id="{{ tag[0] }}">{{ tag[0] | capitalize }}</h3>
  <ul>
    {% assign pages_list = tag[1] %}
    {% for post in pages_list %}
      {% if post.title != null %}
      {% if group == null or group == post.group %}
      <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}<span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished">{{ post.date | date: "%B %d, %Y" }}</time></span></a></li>
      {% endif %}
      {% endif %}
    {% endfor %}
    {% assign pages_list = nil %}
    {% assign group = nil %}
  </ul>
{% endfor %}


----
kategori alpabet:

{% comment %}
#
#  Change date order by adding '| reversed'
#  To sort by title or other variables use {% assign sorted_posts = category[1] | sort: 'title' %}
#
{% endcomment %}
{% assign sorted_cats = site.categories | sort %}
{% for category in sorted_cats %}
{% assign sorted_posts = category[1] | reversed %}
<h2 id="{{category[0] | uri_escape | downcase }}">{{category[0] | capitalize}}</H2>
<ul>
  {% for post in sorted_posts %}
 	<li><a href="{{ site.url }}{{ site.baseurl }}{{  post.url }}">{{  post.title }}</a></li>
  {% endfor %}
</ul>
{% endfor %}

----

archive year:

{% comment %}
*
*   List Archive by Year
*
{% endcomment %}
<section id="archive">
  <h3>This year's posts</h3>
  {%for post in site.posts %}
    {% unless post.next %}
      <ul class="this">
    {% else %}
      {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
      {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
      {% if year != nyear %}
        </ul>
        <h3>{{ post.date | date: '%Y' }}</h3>
        <ul class="past">
      {% endif %}
    {% endunless %}
      <li><time>{{ post.date | date:"%d %b" }}</time><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
  </ul>
</section>

[post counter](https://gist.github.com/Phlow/b31f3a8d292aa63081c6)

{% assign counter = 1 %}
{% for item in site.posts %}
  {% unless item.published == false %}
    {% assign counter=counter | plus:1 %}
  {% endunless %}
{% endfor %}
{{ counter }}


----

Kategori:
<!--sukses:filter-if:kateori=javascript; then order/sort:series-->
{% assign sorted_cats = site.categories | sort %}
{% for category in sorted_cats %}
{% if category[0] == "javascript" %}
{% assign sorted_posts = category[1] | sort %}
<ul>
  {% for post in sorted_posts %}
 	<li><a href="{{ site.url }}{{ site.baseurl }}{{  post.url }}">{{ post.series }} - {{  post.title }}</a></li>
  {% endfor %}
</ul>
{% endif %}
{% endfor %}



object post:
.author:
categories: []
collection: post
content: "html"
date: "date"
excerpt: "desc"
output: "html"
previous.url