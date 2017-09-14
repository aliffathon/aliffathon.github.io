---
layout: post
title: AJAX dengan JQuery method GET
date: 2016-01-02 9:00 AM
author: alif fathon
categories: jquery
tags: [jquery-ajax]
permalink: /jquery-ajax/02-GET/
---

### AJAX dengan fungsi GET ###

- buat `div` baru untuk menampilkan data dengan fungsi `get()`

```html
<h3>AJAX GET</h3>
<input type="text" id="title" placeholder="Letakkan Judul Disini"> <br>
<input type="text" id="content" placeholder="Letakkan Konten Disini"> <br>
<div id="ajaxGet"></div>
<button type="button" onclick="GetMe()">Get Me</button>
<hr>
```

<!--more-->

- buat file `ajaxGet.php` yang akan diambil

```php
<?php
$title   = $_GET['title'];
$content = $_GET['content'];
echo "<hr>judul halaman yang diminta : ".$title;
echo "<br> content halaman diminta : ".$content;
?>
```

- script ajax dengan fungsi GET()

```js
function GetMe()
{
	var title   = $('#title').val();
	var content = $('#content').val();
	data = {title:title, content:content};
	$.get('ajaxGet.php', data)
		.done(
			function(responseTxt)
			{
				$('#ajaxGet').html(responseTxt);
			}
		);
}
```

Keterangan :

  - `GetMe()`      : fungsi ajax method GET
  - `var title`    : buat variable baru untuk menampung `val()` dari input id `title`
  - `$('#title')`  : input id `title` yang akan diambil `val()` nya
  - `$.get(url, data, callback)` : syntaks untuk mengirim data via GET
  - `data`         : data untuk di-kirim berupa array `{ field : value }`
  - `.done()`      : fungsi jika `get()` berhasil dieksekusi
  - `.fail()`      : tambahkan jika terdapat error
  - `.always()`    : tambahkan jika anda ingin melakukan sesuatu setelah selesai
  - `$('#ajaxGet')`: tempat menampilkan data yang diambil oleh `get()`
  - `.html(resp)`  : responseTxt yang di-return untuk ditampilkan


