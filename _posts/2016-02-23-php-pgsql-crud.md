---
layout: post
title: Membuat CRUD dengan PostgreSQL
permalink: /php-crud-pgsql/
date: 2016-02-23 03:00 AM
author: fathon
categories: php-pgsql
tags: php pgsql
---

# CRUD PHP PgSQL
[Sumber](http://www.idiotinside.com/2015/07/25/postgres-crud-operations-in-php/)
PostgreSQL mendukung Object-Realtional Database Management System ORDBMS, 
Atomicity Consistency Isolation Durability ACID, dan 
Multiversion Concurrency Control MVVC 

1. Connect to PostgreSQL Database

```php
<?php
$host = "localhost";
$port = "5432";
$dbname = "dummy";
$user = "postgres";
$password = "pass";
$pg_options = "--client_encoding=UTF-8";
$conn_str = "host={$host} port={$port} dbname={$dbname} user={$user} password={$password}";
$db = pg_connect($conn_str);
if($db)	{ echo "Connected to ".pg_host($db); }
else	{ echo "Terjadi Kesalahan dalam menghubungkan ke server"; }
?>
```
2. Membuat Table di PostgreSQL

```php
require_once "conn.php";
$sql = "CREATE TABLE users (
		id		serial 		primary key,
		name	text		not null,
		age		text		not null,
		country	text		not null
		)";
$res = pg_query($db, $sql);
if(!$res)	{ echo pg_last_error($db); }
	else	{ echo "table created successfully"; }
$pg_close($db);
```
3. Insert Data ke Database
3.1 Menggunakan PG_INSERT($koneksi, 'nama_tabel', $array_assoc_key_value)

```php
$user1 	= array(
			'name' => "Alex",
			'age' => "24",
			'country' => "INDIA"
		);
$user2 	= array(
			'name' => "Ben",
			'age' => "30",
			'country' => "USA"
		);
$users = array( $user1, $user2 );
foreach $users as $k => $u) {
	$res = pg_insert($db, 'users', $u);
	if ($res)	{ echo $u['name']." Berhasil dimasukkan <br/>"; }
		else	{ echo pg_last_error($db); }
}
```
3.2 Menggunakan PG_QUERY();

```php
$sql = "INSERT INTO users (name, age, country) VALUES ('Dark Knight', 31, 'Gotham')";
$res = pg_query($sql);
if(!$res)	{ echo pg_last_error($db); }
	else	{ echo "Data berhasil dimasukkan<br/>"; }
```
4. Menampilkan Baris
4.1 Menggunakan pg_fetch_all() : mengambil semua data hasil query

```php
$res = pg_query($db, "SELECT * FROM users");
if(!$res)	{ echo "Tidak dapat menampilkan data"; }
$arr = pg_fetch_all($res);
echo "<pre>";
var_dump($arr);
echo "</pre>";
```
4.2 Menggunakan pg_fetch_array(): mengambil baris pertama dari hasil query
4.3 Menggunakan pg_fetch_row(): mengambil baris pertama, array numeric

```php
$arr = pg_fetch_array($query); // menghasilkan array numeric dan array assoc
$arr = pg_fetch_array($q, 1, PGSQL_NUM); //array num[0] index-dari-1
$arr = pg_fetch_array($q, NULL, PGSQL_ASSOC; //array assoc['key']
// cara akses array ini tidak perlu perulangan, (data hanya satu baris)
echo "NIK: ".$arr[0];
echo "Tanggal: ".$arr['tgl'];
```
5. Update data dengan pg_query()

```php
<?php
$sql = "UPDATE users SET name='Alexis', age='34' WHERE name='Alex'";
$upd = pg_query($sql);
if(@$upd) 	{ echo pg_last_error($db); }
	else	{ echo "Update data berhasil"; }
?>
```

6. Delete Data
6.1 Menggunakan pg_delete();

```php
<?php
$where = array( "name" => "Alexis" );
$del = pg_delete($db, 'users', $where);
if(!$del)	{ echo pg_last_error(); }
	else	{ echo "Data berhasil di hapus"; }
?>
```

6.2 Menggunakan pg_query()

```php
<?php
$sql = "DELETE FROM users WHERE name='alexis'";
?>
```

