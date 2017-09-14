---
layout: post
title: AngularJS - RESTful - POST send data
categories: angular-restful
permalink: /angular-restful/03-POST/
tags: [angular]
date: 2016-01-31 8:30PM
description: RESTful API Client - AngularJS JavaScript Framework Tutorial Series
---

## Membuat Form Input dan Mengirim data ##

### Membuat Form Input ###

sekarang, kita akan membuat form input data untuk aplikasi kecil kita, langsung saja letakkan script berikut didalam tag `ng-app` di file `angular-client.html` kita.

```
<hr/> <input type="text" ng-model="cust.cust_id" placeholder="customer id" readonly>
<br/> <input type="text" ng-model="cust.cust_name" placeholder="customer name">
<br/> <input type="text" ng-model="cust.cust_address" placeholder="alamat">
<br/> <button type="button" ng-click="simpan()">Simpan</button>
	  <button type="button" ng-click="ulangi()">Ulangi?</button>
```


### Mengirim data 

setelah form input kita siap, sekarang saatnya kita mulai membuat script untuk mengirim data dari form tersebut ke server api kita.

berikut script java yang perlu kita tambahkan ke `apps.js` kita.

```
$scope.tambah = function(){
	var dataJson = $scope.parseToJson();
	$http({
		method: "POST",
		url: "http://localhost:8082/customers/",
		data: dataJson
	}).then(
		function(res){
			$scope.clear();
			$scope.getAll();
	},	function(){
			console.log("gagal");
	});
};
```

keterangan dari script diatas : 

- `dataJson` adalah data dari form kita yang sudah di-konversi ke format JSON
- `$scope.parseToJson()` adalah script yang kita gunakan untuk konversi ke format JSON
- `method: "POST"` method yang kita gunakan kali ini adalah "POST" untuk mengirim data
- `data: dataJson` memberitahu $http untuk mengirim `dataJson` ke `url`
- `$scope.ulangi();` adalah fungsi untuk membersikan form input kita setelah data selesai dikirim
- `$scope.getAll()` akan menampilkan data di server setelah kita berhasil menambah data baru

### Script/Fungsi Tambahan ###

di atas, saya menggunakan beberapa script/fungsi tambahan yang belum saya tulis sebelum nya, karena itu saya akan menuliskannya langsung disini, berikut dengan penjelasannya.

- fungsi untuk membersihkan form input

```
$scope.ulangi = function(){
	$scope.cust = {};
}
```

untuk memastikan form input kosong saat halaman dibuka, pastikan anda mengeksekusi fungsi `$scope.ulangi()` dengan memanggil fungsi langsung dari controller.

- fungsi untuk meng-konversi data dari form ke format JSON

```
$scope.parseToJson = function(){
	// format json {"data":[{object:object}]}
	var data = {data: [$scope.cust]};
	// konversi ke format json
	var json = angular.toJson(data);
	// kembalikan data
	return json;
}
```