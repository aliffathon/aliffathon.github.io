---
layout: post
title: PHP PDO - CRUD - INSERT data
date: 2017-02-02 01:30
author: fathon
permalink: /php-pdo/01-insert-data/
categories: php-pdo
tags: php pdo
---

# PHP Series :: 02 :: Memasukkan INSERT Data dengan PDO - PHP Data Object #

1. Buat Form input data karyawan, dan script untuk memasukkan data ke database

```php
<?php
include 'db.php';
if(isset($_POST['submit'])
	{
	// saat tombol submit di tekan, isi form akan di POST
	$nik = htmlentities($_POST['nik']);
	$nama = htmlentities($_POST['nama']);
	$tempat = htmlentities($_POST['tempat']);
	$tgl = htmlentities($_POST['tgl']);
	// siapkan query untuk insert data
	$query = $db->prepare("INSERT INTO karyawan VALUES(:nik,:nama,:tempat,:tgl");
	$query->bindParam(":nik", $nik);
	$query->bindParam(":nama", $nama);
	$query->bindParam(":tempat", $tempat);
	$query->bindParam(":tgl", $tgl);
	// eksekusi query tadi
	$query->execute();
	// arahkan ke index.php
	header("location: index.php");
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Tambah Karyawan</title>
</head>
<body>
<form method="post" action="">
	Nik: <input required type="text" name="nik" placeholder="Nik" /> <br/>
	Nama: <input required type="text" name="nama" placeholder="Nama" /> <br/>
	Tempat Lahir: <input required type="text" name="tempat" placeholder="Tempat Lahir" /> <br/>
	Tanggal Lahir: <input required type="text" name="tgl" placeholder="31-12-1999" /> <br/>
	<input type="submit" name="submit" value="Kirim" />
</form>
</body>
</html>
```