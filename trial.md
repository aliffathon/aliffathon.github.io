---
layout: page
title: Trial
permalink: trial
---

{% assign tag = site.tags %}
{% assign post = site.posts %}

<!--belajar looping liquid-->
<ul>
{% assign category = site.categories %}	<!-- buat var category dari global var site.categories -->
{% for cs in category %}				<!-- buar var cs(categories) dan looping content dari array category -->
{% assign cp = cs[1] %}					<!-- buat var cp(category_post) dari array cs[1] yang berisi post -->
{% assign cc = cs[0] %}					<!-- buat var cc(category) dari array cs[0] yang berisi category_name -->
	{% for p in cp %}					<!-- looping cp sebagai p (konten post) -->
	<li>{{ cc }} - {{ p.url }} - {{ p.title }}</li> <!-- tampilkan property/value dari object p (post) yang berbentuk object -->
	{% endfor %}
{% endfor %}
</ul>
 
<ul>
{% assign jss = site.categories.javascript | sort:"url" %}
{% for js in jss %}
	<li>{{ js.series }} - {{ js.title }} - {{ js.url }}</li>
{% endfor %}
</ul>
 
<!--
  Keterangan:
- variable global `site` berupa `object`;
  akses object : `object.keyname` akan menghasilkan `value`
  dengan salah satu `key` bernama `categories` yang berisi daftar kategori;
  
- variable global `categories` berupa `array`
  akses array : `array_name[indexNo]` akan menghasilkan `value`
  array `categories` memiliki 2 index
  category[0]	: index pertama;	memiliki value `category_name`
  category[1]	: index kedua;		memiliki value `post` yang berada dalam `category_name` tersebut; dengan kata lain; `post` ini berupa object lagi; yang nantinya akan ditampilkan dalam bentuk halaman `post`
  beberapa key dari object post ini :
  .url: url post
  .title: judul post
  .
-->

<script type="text/javascript">
console.log("Log Kategori");
var cat = {{ category | jsonify }};
console.log(cat.javascript[0]);
//console.log("Log Tag");
//console.log({{ tag | jsonify }});
//console.log("Log Post");
//console.log({{ post | jsonify }});
</script>

