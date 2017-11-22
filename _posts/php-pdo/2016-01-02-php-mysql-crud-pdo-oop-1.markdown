---
layout: post
title: "PHP-PDO : View"
date: 2016-01-03 8:00 AM
author: alif fathon
categories: php
tags: [php-pdo]
---

## Bagian 1 : Membuat Database, Table dan View ##


### Buat Design Database dan Table ###

```sql
CREATE DATABASE db_latihan;
CREATE TABLE users(
  id int(4) NOT NULL AUTO_INCREMENT,
  nama_dp varchar(32),
  nama_bl varchar(32),
  username varchar(32),
  password varchar(32),
  level enum "admin","gudang","kasir","user",
  PRIMARY KEY(id)
) Engine=InnoDB;
```

<!--more-->

### Isi tabel dengan beberapa data sample ###

```sql
INSERT INTO users (nama_dp, nama_bl, username, password, level) VALUES
('bruce', 'wayne', 'batman', md5('batman'), 'admin'),
('alfred', 'pennyworth', 'swat', md5('swat'), 'admin'),
('selina', 'kyle', 'cat', md5('cat'), 'gudang'),
('jim', 'gordon', 'police', md5('police'), 'user');
```

### Membuat File Koneksi ###

```php
<?php
$conn = new PDO('mysql:host=localhost;dbname=dblat','dblat','dblat');
?>
```

### Buat File tabel untuk Melihat User ###

```php
<?php
require_once 'conn-pdo.php';
$q = $conn->prepare("SELECT * FROM users");
$q->execute();
$table = '';
while($d = $q->fetch(PDO::FETCH_OBJ)){
	$table .= ' <tr>
					<td>'.$d->id.'</td>
					<td>'.$d->username.'</td>
					<td>'.$d->password.'</td>
					<td>'.$d->level.'</td>
					<td>
					<a href="php-pdo-delete.php?action=delete&id='.$d->id.'" onclick="return confirm(\'Apakah anda yakin?\');">Delete</a>
					||
					<a href="php-pdo-form-update.php?id='.$d->id.'">Edit</a>
				</tr>';
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Table | View Users</title>
	<link rel="stylesheet" href="">
</head>
<body>
<a href="php-pdo-form-insert.html">Add New User</a> | 
<a href="php-pdo-form-login.html">Login</a>
<p>
<table cellpadding="2" cellspacing="2" border="0">
	<tr>
		<th>##</th>
		<th>Username</th>
		<th>Password</th>
		<th>Level</th>
	</tr>
<?=$table?>
</table>
</body>
</html>
```

