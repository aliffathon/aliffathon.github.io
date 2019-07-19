---
layout: post
title: AngularJS - RESTful - GET pull data
categories: angular-restful
permalink: /angular-restful/02-GET/
tags: [angular]
date: 2016-01-31 8:30PM
description: RESTful API Client - AngularJS JavaScript Framework Tutorial Series
---

## Menampilkan Data dengan AngularJS menggunakan method GET ##

### Membuat Table untuk menampilkan Data ###

untuk menampilkan data dengan angularjs, pertama-tama kita buat table terlebih dahulu.

pada file `angular-client.html` kita, tambahkan script berikut didalam tag `<div ng-app>`

```
<table>
	<tr>
		<td>##</td>
		<td>Nama Pelanggan</td>
		<td>Alamat Pelanggan</td>
		<td>AKSI</td>
	</tr>
	<tr ng-repeat="x in (res = (daftarPelanggan))">
		<td>\{\{$index+1\}\}</td>
		<td>\{\{x.cust_name\}\}</td>
		<td>\{\{x.cust_address\}\}</td>
		<td>
			<a href="" ng-click="delete(x.cust_id)">D</a> |
			<a href="" ng-click="update(x.cust_id)">U</a>
		</td>
	</tr>
</table>
```

berikut sedikit penjelasan dari kode diatas :

- `ng-repeat` digunakan untuk melakukan perulangan isi array
- `\{\{$index\}\}` adalah index dari array
- `\{\{x.cust_name\}\}` adalah key dari array untuk ditampilkan

### Membuat Fungsi JavaScript untuk mengambil data ###

pada file `apps.js` kita, tambahkan script berikut :

```
$scope.getAll = function(){
	$http({
		method: "GET",
		url: "http://localhost:8082/customers/",
	}).then(
		function(resp){ 
			$scope.daftarPelanggan = angular.fromJson(resp.data.data);
	},	function(){ console.log("Data Gagal Diambil"); }
	);
};
```

berikut sedikit penjelasan dari kode diatas :

- `$http` adalah service dari angular untuk melakukan request AJAX
- `method: "GET"` adalah request method yang digunakan
- `url: "http://localhost:8082/customers/"` adalah url untuk me-request AJAX
- `.then(fungsiSukses, fungsiGagal);` fungsi yang dijalankan setelah request AJAX
- `function(resp){}` adalah fungsiSukses dimana
- `$scope.daftarPelanggan` adalah variable yang akan kita gunakan untuk menyimpan data
- `angular.fromJson(resp.data.data)` fungsi ini akan meng-konversi data dari format JSON agar dapat diproses oleh angular
- `function(){console.log("Data Gagal Diambil"); }` adalah fungsiGagal untuk memberitahu kita jika request AJAX kita gagal

### Menerapkan dan Mengetes fungsi `getAll` ###

pada baris paling atas di script java kita, dibawah baris controller,
tambahkan script berikut :

```
$scope.getAll();
```
