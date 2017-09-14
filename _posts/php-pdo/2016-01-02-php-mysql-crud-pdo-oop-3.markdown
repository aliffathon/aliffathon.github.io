---
layout: post
title: "PHP-PDO : Update"
date: 2016-01-03 8:00 AM
author: alif fathon
categories: php
tags: [php-pdo]
---

## Bagian 3 : Form dan Fungsi Update User ##

Pada Bagian kedua ini, kita akan membahas cara membuat form update untuk meng-edit informasi user lama,

<!--more-->

### Membuat Form Update ###

```html
<?php
require_once 'conn-pdo.php';
// buka koneksi ke database
if(isset($_GET['id']))
{
// cek id user yang akan di-update apa ada di url
	$uid = $_GET['id'];
// ambil value id dari url, tampung ke variabel $uid
	$q = $conn->prepare("SELECT * FROM user WHERE id = :uid");
// siapkan query untuk menampilkan user yang akan di update
	$q->bindValue(uid, $uid);
// taruh id user ke dalam query
	if($q->execute())
	{
// eksekusi query, jika berhasil :
		while($d = $q->fetch()){
// masukkkan hasil query berupa array ke dalam variable $array[]
			$arr[] = $d;
		}
	}
// tampilkan form update di browser dengan data dari array
?>
<!DOCTYPE html>
<html>
<head>
	<title>Form Update User</title>
</head>
<body>
<form action="php-pdo-update.php" method="post">
	<table>
	<tr>
		<td>Nama Depan</td>
		<td><input type="text" name="nama_dp" value="<?=$arr[0]['nama_dp']?>"></td>
	</tr>
	<tr>
		<td>Nama Belakang</td>
		<td><input type="text" name="nama_bl" value="<?=$arr[0]['nama_bl']?>"></td>
	</tr>
	<tr>
		<td>Username</td>
		<td><input type="text" name="username" value="<?=$arr[0]['username']?>"></td>
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
		<td><input type="hidden" name="id" value="<?=$arr[0]['id']?>"></td>
		<td>
			<button type="submit" name="update" value="update">Update User</button>
		</td>
	</tr>
	</table>
</form>
</body>
</html>
<?php
} else {
	echo 'Data Tidak ditemukan, <a href="php-pdo-view.php">Kembali</a>';
// jika data tidak ditemukan, maka tampilkan link menuju table view
}
?>
```
