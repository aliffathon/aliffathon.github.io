---
layout: post
title: Slim - RESTful API - PUT update data
categories: slim-restful
permalink: /slim-restful/06-PUT/
tags: [slim, restful, api]
date: 2016-01-31 7:53PM
description: RESTful API Server - Slim Framework Tutorial Series
---

## Memperbaharui Data dengan method PUT ##

### URL Route untuk method PUT ###

untuk memperbaharui data, kita akan menggunakan method PUT.

pada file `index.php` kita, tambahkan route berikut :


```
$app->put('/customers/','updateCustomers');
```

### Function untuk menangani PUT Request ###

```
function updateCustomers($req, $resp, $args){
    try {
        $input = file_get_contents("php://input");
        $data  = json_decode($input);
        $db  = getConnection();
        // query untuk meng-update data berdasarkan cust_id
        $sql = "UPDATE tbl_customer SET cust_name=?, cust_address=? WHERE cust_id=?";
        $ins = $db->prepare($sql);
        // lakukan perulangan untuk memasukkan data
        foreach ($data->data as $d) {
            $ins->bindParam(1, $d->cust_name);
            $ins->bindParam(2, $d->cust_address);
            $ins->bindParam(6, $d->cust_id);
            // eksekusi query
            if($ins->execute())
            {
                echo '{"status":[{"text":"sukses"}]}';
                // pesan yang ditampilkan jika query sukses
            } else {
                // pesan yang ditampilkan jika query gagal
                echo '{"status":[{"text":"eksekusi query gagal"}]}';
            }
            $db = null;
        };
    } catch (Exception $e) {
        echo '{"status":[{"text":"'. $e->getMessage() .'""}]}';
    }
};
```

### Mengetes Fungsi PUT data ###

buka `Advance RESTful Client Application` di `Chrome` Anda,
buat `REQUEST` bertipe `PUT` dengan URL `http://localhost:8082/customers/`
dengan data berupa JSON seperti berikut :

```
{"data":[
	{	"cust_id":"2"
		"cust_name":"Batman the Dark Knight",
		"cust_address":"Bat Cave"
	}
]}
```