---
layout: post
title: Slim - RESTful API - DELETE remove data
categories: slim-restful
permalink: /slim-restful/05-DELETE/
tags: [slim]
date: 2016-01-31 7:53PM
description: RESTful API Server - Slim Framework Tutorial Series
---

## Menghapus Data dengan method DELETE ##

### URL Route untuk method DELETE ###

untuk menghapus data, akan mirip dengan penggunaan method GET-by-ID tetapi menggunakan method DELETE.

pada file `index.php` kita, tambahkan route berikut :


```
$app->delete('/customers/{id}','deleteCustomers');
```

### Function untuk menangani DELETE Request ###

```
function deleteCustomers($req, $resp, $args){
	// query untuk delete data
    $sql = "DELETE FROM tbl_customer WHERE cust_id=?";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        // $args['id'] adalah ID yang didapat dari URL '/customers/{id}'
        $stmt->bindParam(1, $args['id']);
        if($stmt->execute())
        {
            echo '{"status":[{"text":"sukses"}]}';
            $db = null;
        }else{
            echo '{"status":[{"text":"eksekusi query gagal"}]}';
        }
    } catch(PDOException $e) {
        echo '{"status":[{"text":'. $e->getMessage() .'}]}';
    }
};
```

### Mengetes Fungsi DELETE data ###

buka `Advance RESTful Client Application` di `Chrome` Anda,
buat `REQUEST` bertipe `DELETE` dengan URL `http://localhost:8082/customers/4`
request tersebut digunakan untuk menghapus data customer dengan `cust_id` sama dengan `4`.