---
layout: post
title: Slim - RESTful API - Membuat Aplikasi SLIM
categories: slim-restful
permalink: /slim-restful/02-CreateApp/
tags: [slim, restful, api]
date: 2016-01-31 7:03PM
description: RESTful API Server - Slim Framework Tutorial Series
---

## Membuat Aplikasi SLim ##
Sekarang kita buat file `index.php` baru di dalam directory project kita, dan tambahkan script berikut :

```php
/* Slim Main Class */
require 'Slim/App.php';

/* Register Autoloader dan Slim obj */
\Slim\App::registerAutoloader();
$app = new Slim\App();

/* letakkan paling akhir */
$app->run();
```

### Membuat Fungsi Koneksi ke Database ###

buka file `index.php` kita dan tambahkan diatas `$app->run()` script berikut

```
function getConnection() {
    $dbhost="localhost";
    $dbuser="root";
    $dbpass="";
    $dbname="db_latihan";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}
```

script adalah sebuah `function`/fungsi yang akan kita gunakan untuk membuat koneksi ke server database kita

### Design Database kita di Server ###

silahkan login dengan username dan password mysql kalian, misal

```
$ mysql -uroot -p
```

setelah masuk ke shell mysql `mysql>` kita akan membuat database dan table baru untuk aplikasi kita,
Untuk Membuat database baru, silahkan jalankan perintah berikut :

```
CREATE DATABASE db_latihan;
use db_latihan;
```

kemudian kita akan membuat table baru dengan perintah :

```
CREATE TABLE tbl_customer(
	cust_id int(4) AUTO_INCREMENT,
	cust_name varchar(255),
	cust_address varchar(255),
	PRIMARY KEY(cust_id)
);
```

sebagai data awal agar aplikasi dapat terlihat sudah berjalan kita bisa meng-inputkan data sekarang, dengan perintah :

```
INSERT INTO tbl_customer(cust_id,cust_name,cust_address) VALUES
(1,'Tony Stark', 'Mallibu'),
(2,'Bruce Wayne','Gotham City'),
(3,'Oliver Queen','Starling City');
```
