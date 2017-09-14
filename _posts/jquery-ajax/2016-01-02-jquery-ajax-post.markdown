---
layout: post
title: AJAX dengan JQuery method POST
date: 2016-01-02 10:00 AM
author: alif fathon
categories: jquery
tags: [jquery-ajax]
permalink: /jquery-ajax/03-POST/
---

### AJAX dengan fungsi POST ###

- buat `div` baru untuk menampilkan data ajax dengan method `POST()`

```html
<h3>AJAX POST</h3>
<input type="text" id="header" placeholder="Letakkan Header Disini"> <br>
<input type="text" id="footer" placeholder="Letakkan Footer Disini"> <br>
<div id="ajaxPost"></div>
<button type="button" onclick="PostMe()">Post Me</button>
<hr>
```

<!--more-->

- buat file php untuk menampung post data `ajaxPost.php`

```php
<?php
$header = $_POST['header'];
$footer = $_POST['footer'];
echo "<h1>".$header."</h1>";
echo "<h2>".$footer."</h2>";
?>
```

- fungsi `post()` untuk mengirim data ajax dengan method POST

```js
function PostMe()
{
	var header = $('#header').val();
	var footer = $('#footer').val();
	data = {header:header, footer:footer};
	$.post('ajaxPost.php', data)
		.done(
			function(resp)
			{
				$('#ajaxPost').html(resp);
			}
		);
}
```

Keterangan :

  - `PostMe()`      : fungsi ajax method GET
  - `var header`    : buat variable baru untuk menampung `val()` dari input id `header`
  - `$('#header')`  : input id `header` yang akan diambil `val()` nya
  - `$.post(url, data, callback)` : syntaks untuk mengirim data via POST
  - `data`          : data untuk di-kirim berupa array `{ field : value }`
  - `.done()`       : fungsi jika `post()` berhasil dieksekusiselesai
  - `$('#ajaxPost')`: tempat menampilkan data yang diambil oleh `post()`
  - `.html(resp)`   : responseTxt yang di-return untuk ditampilkan
