---
layout: post
title: Slim - RESTful API - POST send data
categories: slim-restful
permalink: /slim-restful/04-POST/
tags: [slim]
date: 2016-01-31 7:53PM
description: RESTful API Server - Slim Framework Tutorial Series
---

## Membuat Data Baru dengan method POST ##


### URL Route untuk POST data ###

pada file `index.php` kita tambahkan script berikut 

~~~~ php
$app->post('/customers/','createCustomers');
~~~~

kemudian kita akan membuat fungsi untuk menangani request POST dari client

~~~~ php
function createCustomers($req, $resp, $args){
    try {
    	// ambil data yang dikirimkan client
        $input = file_get_contents("php://input");
        // parsing data dari client 
        $data = json_decode($input);
        $db  = getConnection();
        // query untuk insert data
        $sql = "INSERT INTO tbl_customer(cust_name,cust_address) VALUES(?,?)";
        $ins = $db->prepare($sql);
        // lakukan perulangan untuk memasukkan data
        foreach($data->data as $d){
        	// masukkan data ke dalam query
            $ins->bindParam(1, $d->cust_name);
            $ins->bindParam(2, $d->cust_address);
            // eksekusi query
            if($ins->execute())
            {
                $db = null;
                echo '{"status":[{"text":"sukses"}]}';
                // pesan yang dikembalikan jika query berhasil
            } else {
                // pesan kesalahan jika query gagal
                echo '{"status":[{"text":"eksekusi query gagal"}]}';
            }
        }
    } catch (Exception $e) {
        echo '{"status":[{"text":"'. $e->getMessage() .'"}]}'; 
    }
};
~~~~

### Mengecek Fungsi POST ###

buka aplikasi RESTful client di browser masing2, jika anda menggunakan Chrome, bisa menggunakan Extension `Advance RESTful Client Application`

untuk tipe `REQUEST` nya adl `POST` untuk data nya kita masukkan data dengan format JOSN seperti berikut :

```
{"data":[
	{	"cust_name":"the Flash",
		"cust_address":"Central City"
	}
]}
```

kemudian klik `Send`, jika berhasil akan ada response berupa JSON seperti berikut

```
{"status":[
	{
	"text":"sukses"
	}
]}
```

Selamat ! Anda telah berhasil !