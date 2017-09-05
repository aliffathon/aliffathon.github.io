---
layout: post
title: AJAX dengan JQuery
date: 2016-01-02 11:00 AM
author: alif fathon
categories: jquery
tags: [javascript, jquery, ajax, json]
---

## Buat Dokumen HTML Baru ##

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>AJAX | JQuery</title>
</head>
<body>
<script src="/www/libs/jquery/jquery-2.1.4.min.js"></script>
<!-- cdn jquery
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
-->
</body>
</html>
```

<!--more-->

### AJAX dengan fungsi AJAX ###

- buat `div` baru untuk menampilkan data ajax dengan method `ajax()`

```html
<h3>AJAX</h3>
<input type="text" id="ajGet"  placeholder="Letakkan GET Disini"><br>
<input type="text" id="ajPost" placeholder="Letakkan POST Disini"><br>
<div id="ajaxAjax"></div>
<button type="button" onclick="AjaxMe()">Post Me</button>
<hr>
```

- buat file php untuk menampung post data `ajaxAjax.php`

```php
<?php
$ajGet  = $_GET['ajGet'];
$ajPost = $_POST['ajPost'];
echo "<h1>".$sidebar."</h1>";
?>
```

- fungsi `ajax()` untuk mengirim data ajax dengan method AJAX

```js
function AjaxMe()
{
	var ajGet  = $('#ajGet').val();
	var ajPost = $('#ajPost').val();
	dataGet  = {ajGet:ajGet};
	dataPost = {ajPost:ajPost};
	$.ajax(
		type: 'GET',
		url:  'ajaxAjax.php',
		data: dataGet
		).done(
			function(resp)
			{
				$('#ajaxAjax').html(resp);
			}
		);
	$.ajax(
		type: 'POST',
		url:  'ajaxAjax.php'
	);
}
```

Keterangan :
 - `AjaxMe()`      : fungsi ajax method GET
 - `var header`    : buat variable baru untuk menampung `val()` dari input id `header`
 - `$('#header')`  : input id `header` yang akan diambil `val()` nya
 - `$.post(url, data, callback)` : syntaks untuk mengirim data via POST
 - `data`          : data untuk di-kirim berupa array `{ field : value }`
 - `.done()`       : fungsi jika `post()` berhasil dieksekusiselesai
 - `$('#ajaxPost')`: tempat menampilkan data yang diambil oleh `post()`
 - `.html(resp)`   : responseTxt yang di-return untuk ditampilkan