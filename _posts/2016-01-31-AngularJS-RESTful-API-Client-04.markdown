---
layout: post
title: AngularJS - RESTful API Client Bagian 4
categories: angular
tags: [angular, restful, api]
date: 2016-01-31 9:30PM
description: RESTful API Client - AngularJS JavaScript Framework Tutorial Series
---

## Menghapus data dengan method DELETE ##

kembali pada [tutorial sebelumnya](/angular/angularjs-restful-api-client-02) telah di buat table dengan `button` untuk memanggil fungsi `delete()`, tapi belum dibuat fungsi `delete()` tersebut, sekarang mari kita buat fungsi `delete()` tersebut untuk menghapus data.

langsung saja, pada `apps.js` kita tambahkan script fungsi berikut :

```
$scope.delete = function(d){
	$http({
		method: "DELETE",
		url: "http://localhost:8082/customers/" + d,
	}).then(
		// jika berhasil; refresh list customers
		function(){ $scope.getList();
		// jika gagal; berikan pesan di console
	},	function(){ console.log("gagal");
	});
};
```

untuk menjalankan fungsi ini diperlukan parameter tambahan, berupa nilai dari `cust_id` yang ikut di ambil saat menampilkan data di table, nilai `cust_id` ini kita masukkan sebagai parameter di fungsi ini, dan disimpan sementara sebagai variable lokal `d`, kemudian ikut dikirimkan melalui AJAX dengan method REQUEST berupa `DELETE`.
jika request berhasil, maka list akan di-refresh dan data yang di-delete tadi telah hilang/terhapus.