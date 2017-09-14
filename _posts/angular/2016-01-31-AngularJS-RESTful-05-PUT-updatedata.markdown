---
layout: post
title: AngularJS - RESTful - PUT update data
categories: angular-restful
permalink: /angular-restful/05-PUT/
tags: [angular]
date: 2016-01-31 9:30PM
description: RESTful API Client - AngularJS JavaScript Framework Tutorial Series
---

## Memperbaharui data dengan method PUT ##

Untuk memperbaharui data, pertama-tama kita harus memilih data mana yang akan kita perbarui, kita akan mengambil data tertentu dengan fungsi `getById` dan menampikan data tersebut ke `form input` untuk diproses, dan kemudian di kirim kembali untuk disimpan dengan method PUT.

### Mengambil data tertentu ###

untuk mengambil data tertentu, kita akan membuat fungsi baru, data yang akan kita ambil adalah berdasarkan `cust_id` yang telah kita buat `button` untuk memanggil fungsi `getById` yang telah kita siapkan [sebelumnya](/angular/angularjs-restful-api-client-2), langsung saja buka `apps.js` kita dan tambahkan script berikut :

```
$scope.getById = function(d){
	$http({
		method: "GET",
		url: "http://localhost:8082/customers/" + d,
		}).then(
			function(resp){
				$scope.cust = angular.fromJson(resp.data.data[0]);
		},	function(){
				console.log("gagal");
		});
};
```

berikut penjelasan kode diatas :

- `url: "http://localhost:8082/customers/" + d` disini `d` adalah nilai dari `cust_id` yang kita kirimkan saat kita meng-klik tombol `getById(cust_id)` di table daftar pelanggan kita
- `$scope.cust = angular.fromJson(resp.data.data[0]);` angular.fromJson akan meng-konversi data dari format json agar dapat dibaca dan di letakkan pada form input \($scope.cust\)

### Menyimpan data setelah diperbaharui ###

untuk menyimpan data setelah dilakukan pembaruan, dapat dengan meng-klik `update`, untuk mengirim data terbaru ke server api, berikut kode fungsi `update` tersebut.

```
$scope.update = function(){
	var dataJson = $scope.parseToJson();
	$http({
		method: "PUT",
		url: "http://localhost:8082/customers/",
		data: dataJson
	}).then(
		function(res){
			$scope.ulangi();
			$scope.getAll();
	},	function(){
			console.log("gagal");
	});
};
```

berikut penjelasan kode diatas :

- `var dataJson = $scope.parseToJson();` meng-konversi ke format JSON data dari form input
- `method: "PUT"` $http Request menggunakan method "PUT"
- `data: dataJson` data yang dikirimkan sebagai pembaharuan
- `$scope.ulangi()` untuk membersihkan form-input kita
- `$scope.getAll()` untuk me-refresh kembali table data kita