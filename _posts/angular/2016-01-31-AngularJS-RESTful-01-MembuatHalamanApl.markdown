---
layout: post
title: AngularJS - RESTful API - Membuat Halaman Aplikasi
categories: angular-restful
permalink: /angular-restful/01-Membuat-AppAJS/
tags: [angular]
date: 2016-01-31 8:30PM
description: RESTful API Client - AngularJS JavaScript Framework Tutorial Series
---

## Membuat Halaman dengan AngularJS ##

Pertama, buka text-editor/IDE kesukaan anda, disini saya menggunakan [Sublime Text Editor](http://sublime.org),

buat file baru di `/opt/lampp/htdocs/` dengan nama `angular-client.html`

``` html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>AngularJS - RESTful Client</title>
	<!-- disini saya menggunakan angular yang telah saya download -->
	<script type="text/javascript" src="/js/angular/angular.min.js"></script>
	<!-- disini saya memisahkan script angular dengan file html, agar lebih rapi -->
	<script type="text/javascript" src="/js/apps.js"></script>
</head>
<body>
	<div ng-app="myApp" ng-controller="AppController">
	...
	</div>
</body>
</html>
```

sekarang kita buat file `apps.js` yang akan berisi script java aplikasi kita, dan simpan script di `/opt/lampp/htdocs/js/apps.js`

``` js
// kita buat angular app kita
var app = angular.module('myApp',[]);
// kita buat controller untuk app kita
app.controller('AppController', function(){
	// script program aplikasi kita disini
});
```

bagian satu, selesai.