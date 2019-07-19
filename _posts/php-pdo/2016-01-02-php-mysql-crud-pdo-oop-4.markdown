---
layout: post
title: "PHP-PDO : Delete"
date: 2016-01-03 8:00 AM
author: alif fathon
categories: php
tags: [php-pdo]
---

## Bagian 4 : Form dan Fungsi Delete User ##

Pada Bagian kedua ini, kita akan membahas cara membuat form update untuk meng-edit informasi user lama,

<!--more-->

### Membuat Fungsi Delete ###

```php
<?php
require_once 'conn-pdo.php';
if(isset($_GET['action']) && $_GET['action']=='delete')
{
	$uid = $_GET['id']; //ambil uid
	$msg = '';
	if($uid !== '') //cek uid tidak kosong
	{
		$del = $conn->prepare("DELETE FROM user WHERE id = :uid"); //delete per uid
		$del->bindValue(uid, $uid); //define the uid
		if($del->execute())
		{ //execute delete
			// echo "sukses";
			$msg .= 'Data Berhasil Dihapus, <a href="php-pdo-view.php">Kembali</a>';
		} else {
			$msg .= 'Data GAGAL Dihapus, <a href="php-pdo-view.php">Kembali</a>';
		}
	} else {
		$msg .= 'Data Gagal Ditemukan, <a href="php-pdo-view.php">Kembali</a>';
		// echo "uid tidak boleh kosong";
	}
echo $msg;
} else {
	// jika action dan id tidak diisi, maka akan di-redirect ke view
	header('location: php-pdo-view.php');
}
?>
```

Keterangan Program :

- `$del = $conn->prepare("DELETE FROM user WHERE id = :uid");`
  siapkan query untuk delete user berdasarkan id
- `$del->bindValue(uid, $uid);`
  kaitkan id ke query
- `$del->execute`
  eksekusi query delete, jika sukses?
