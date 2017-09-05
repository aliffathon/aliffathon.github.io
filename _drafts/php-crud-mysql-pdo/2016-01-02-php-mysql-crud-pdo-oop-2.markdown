---
layout: post
title: CRUD dengan PHP MySQL metode OOP dengan PDO
date: 2016-01-03 8:00 AM
author: alif fathon
categories: php
tags: [php, mysql, pdo, oop]
---

## Bagian 2 : Form dan Fungsi Insert User Baru ##

Pada Bagian kedua ini, kita akan membahas cara membuat form insert untuk menambahkan user baru ke database,

<!--more-->

### Membuat Form Insert User Baru ###

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Form Tambah User</title>
</head>
<body>
<form action="php-pdo-insert.php" method="post">
	<table>
	<tr>
		<td>Nama Depan</td>
		<td><input type="text" name="nama_dp"></td>
	</tr>
	<tr>
		<td>Nama Belakang</td>
		<td><input type="text" name="nama_bl"></td>
	</tr>
	<tr>
		<td>Username</td>
		<td><input type="text" name="username"></td>
	</tr>
	<tr>
		<td>Password</td>
		<td><input type="password" name="password"></td>
	</tr>
	<tr>
		<td>Level</td>
		<td>
			<input type="radio" name="level" value="Admin"> admin
			<input type="radio" name="level" value="Gudang"> gudang
			<input type="radio" name="level" value="User"> user
			<input type="radio" name="level" value="Kasir"> kasir
		</td>
	</tr>
	<tr>
		<td></td>
		<td>
			<button type="submit" name="tambah" value="tambah">Tambah User</button>
		</td>
	</tr>
	</table>
</form>
</body>
</html>
```

Keterangan :

  - `<form>`   : method pengiriman `POST`, data dikirim ke `php-pdo-insert.php`
  - `<input>`  : data yang akan dikirim adl `nama_dp`, `nama_bl`, `username`, `password` dan `level`
  - `<button>` : input yang akan memicu form untk mengirim data ke tujuan


### Membuat Fungsi Insert User Baru ###

```php
<?php
require_once 'conn-pdo.php';
if(isset($_POST['tambah']))
{
	$nama_dp = $_POST['nama_dp'];
	$nama_bl = $_POST['nama_bl'];
	$username= $_POST['username'];
	$password= md5($_POST['password']);
	$level	 = $_POST['level'];
	$q = $conn->prepare("INSERT INTO user(nama_dp,nama_bl,username,password,level) VALUES(:nm_dp,:nm_bl,:user,:pass,:lvl)");
	$q->bindValue(nm_dp, $nama_dp);
	$q->bindValue(nm_bl, $nama_bl);
	$q->bindValue(user, $username);
	$q->bindValue(pass, $password);
	$q->bindValue(lvl, $level);
	if($q->execute()){
		header('location: php-pdo-view.php');
	} else {
		echo "data gagal masuk";
	}
} else {
	header('location: php-pdo-form-insert.html');
}
?>
```

Keterangan :

  - `require_once` : memanggil koneksi database
  - `isset($_POST['tambah'])` : cek jika form telah disubmit oleh button `tambah`
  - `$nama_dp = $_POST['nama_dp'];` : tampung data yang di-POST ke variable untuk di-proses
  - `$conn->prepare(QUERY)` : query yang akan dieksekusi untuk meng-insert data ke database
  - `$q->bindValue(nm_dp, $nama_dp)` : meng-input data yang akan di-insert kedalam query
  - `$q->execute()` : meng-eksekusi query dengan data yang telah ter-input
  - `header('location: php-pdo-view.php')` : redirect ke lokasi ini jika eksekusi query berhasil
