---
layout: post
title: Slim - RESTful API - GET pull data
categories: slim-restful
permalink: /slim-restful/03-GET/
tags: [slim]
date: 2016-01-31 7:27PM
description: RESTful API Server - Slim Framework Tutorial Series
---

## Membuat URL Route pada SLim ##

### Mengambil Data dengan Fungsi GET-all dan GET-by-ID ###

1. Pertama kita buat terlebih dahulu URL route yang akan kita gunakan

```php
$app->get('/customers/','getCustomers');
$app->get('/customers/{id}','getCustomersId');
```

2. sekarang kita buat `function getCustomers` dan `function getCustomersId` di file `index.php` kita.

pertama kita buat fungsi pertama kita, yaitu fungsi untuk mengambil semua data dari server database kita.

{% highlight php %}
function getCustomers($req, $res, $ar) {
	// query untuk mengambil semua data
    $sql = "SELECT * FROM tbl_customer";
    try {
    	// kita buat object koneksi ke database
        $db = getConnection();
        // eksekusi query mysql kita
        $stmt = $db->query($sql);
        // ambil data hasil query ke dalam vairable $cust
        $cust = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        // tampilkan data di browser dengan format JSON
        echo '{"data": ' . json_encode($cust) . '}';
    } catch(PDOException $e) {
    	// jika koneksi gagal dibuat maka tampilkan pesan kesalahan
        echo '{"error":[{"text":"'. $e->getMessage() .'"}]}';
    }
}
{% endhighlight %}

untuk mengambil data di server mysql kita, kita perlu membuat query ke server.
kemudian data yang didapat dari query tadi, kita tampilkan di browser dengan format JSON.
kemudian kita buat fungsi kedua kita, yaitu fungsi untuk mengambil data tertentu saja.

~~~~ php
function getCustomersId($req, $resp, $args) {
	// $args['id'] adalah ID yang didapat dari URL '/customers/{id}'
    $sql = "SELECT * FROM tbl_customer WHERE cust_id=".$args['id'];
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $cust = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"data": ' . json_encode($cust) . '}';
    } catch(PDOException $e) {
        echo '{"error":[{"text":'. $e->getMessage() .'}]}';
    }
}
~~~~

### Pengetesan Server ###

pertama, masuk ke directory project kita, lalu jalankan server php kita

```
cd /opt/lampp/htdocs/slim-api/
php -S localhost:8082
```

setelah server berjalan, kita buka browser dan arahkan URL ke `http://localhost:8082/customers/`

kita akan mendapatkan tampilan data dari database kita dengan format JSON.
kurang lebih seperti ini :

```
{"data":[
	{	"cust_id":"1",
		"cust_name":"Tony Stark",
		"cust_address":"Mallibu"
	},{	"cust_id":"2",
		"cust_name":"Bruce Wayne",
		"cust_address":"Gotham City"
	},{	"cust_id":"3",
		"cust_name":"Oliver Queen",
		"cust_address":"Starling City"
	}
]}
```

berarti kita telah berhasil,

selanjutnya arahkan browser ke URL `http://localhost:8082/customers/1`

data yang ditampilkan kurang lebih akan menjadi seperti ini :

```
{"data":[
	{	"cust_id":"1",
		"cust_name":"Tony Stark",
		"cust_address":"Mallibu"
	}
]}
```

Selamat! Kita telah berhasil !