---
layout: post
title: AJAX dengan JQuery load
date: 2016-01-02 7:00 AM
author: alif fathon
categories: jquery
tags: [jquery-ajax]
permalink: /jquery-ajax/04-LOAD/
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

## AJAX dengan JQuery ##

Terdapat 4 cara/method untuk melakukan AJAX dengan jQuery:

### ajax dom `load()` function ###

- buat `div` area untuk menampilkan konten

```html
<h3>DOM Load</h3>
<div id="domLoad"></div>
<button type="button" onclick="LoadMe()">Load Me</button>
<hr>
```

- fungsi ajax `LoadMe()` dalam file `ajax-jquery.html`

```js
function LoadMe(){
	$('#domLoad').load('domLoad.html',
		function(responseTxt, statusTxt, xhr){
			if(statusTxt === 'success')
			{
				console.log(responseTxt);
			}
			else
			{
				console.log(xhr.status + ' ' + xhr.statusTxt);
			}
		});
}
```

Keterangan :
 - function LoadMe()  : function yang akan dieksekusi oleh button `LoadMe`
 - $('#domLoad)       : data akan ditempatkan di elemen html dengan id: `domLoad`
 - load(url, data, callback): function ajax untuk me-load halaman web lain
 - `domLoad.html`     : halaman lain yang akan di-include ke halaman ini
 - function(...){}    : callback yang dilakukan saat `load()` dieksekusi
 - `responseTxt`      : raw-text yang diambil dengan fungsi `load()`
 - `statusTxt`        : status transfer ~~success~~ atau ~~failed~~
 - `xhr.status`       : status transfer XMLHttpRequest (200,404)
 - `xhr.statusTxt`    : status transfer XMLHttpRequest (OK, Not Found)
 - `console.log()`    : menampilkan log di console browser

- konten `domLoad.html` yang akan di load oleh fungsi `LoadMe()`

```html
<h2>DOM LOAD ME</h2>