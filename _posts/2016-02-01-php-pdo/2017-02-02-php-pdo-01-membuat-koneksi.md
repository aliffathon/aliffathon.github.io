---
layout: post
title: PHP PDO - Membuat Koneksi
date: 2017-02-02 01:30
author: fathon
permalink: /php-pdo/01-membuat-koneksi/
categories: php-pdo
tags: php pdo
---

# PHP Series :: 01 :: Membuat Koneksi dengan PDO - PHP Data Object #

1. Menyiapkan DSN - Data Source Name untuk koneksi ke server database

```php
<?php
$host = "host=localhost";
$user = "user=myuser";
$pass = "password=mypass";
$base = "dbname=mydbase";
$myport = "port=3309";
$pgport = "port=5432";
// dsn untuk koneksi ke postgresql
$pgsql = "pgsql:$host;$pgport;$base;$user;$pass";
// dsn untuk koneksi ke mysql
$mysql = "mysql:$host;$myport;$base;$user;$pass";
try {
	$db = new PDO($pgsql);
	//$db = new PDO($mysql);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
catch ( PDOException $e){
	die("Connection Error: ". $e->getMessage());
	}
?>
```

2. Siapkan database dan tabel untuk menyimpan data

```bash
root@localhost:~# su postgres
postgres@localhost:~# createuser --interactive -h localhost -p 5432 --pwprompt --superuser --echo joe
postgres@localhost:~# createdb joe_db;
```

```bash
root@localhost:~# adduser tom
root@localhost:~# passwd tom
root@localhost:~# psql -U postgres -h localhost -p 5432 -d postgres
postgres=# CREATE USER tom WITH PASSWORD 'mypass';
postgres=# CREATE DATABASE tom_db;
postgres=# GRANT ALL PRIVILEGES ON DATABASE tom_db TO tom;
postgres=# \q
root@localhost:~# su - tom
root@localhost:~# psql -d tom_db -U tom
```

```sql
CRAETE TABLE karyawan(
nik character varying(20) NOT NULL,
nm_karyawan character varying(40),
tempat_lahir character varying(30),
tgl_lahir date
);
```

---

sumber:
[1](https://www.postgresql.org/docs/9.2/static/app-createuser.html)
[2](https://setyongr.com/membuat-crud-menggunakan-pdo-di-php/)
