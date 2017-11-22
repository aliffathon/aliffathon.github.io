---
layout: post
title: "PHP-PDO : Delete 2"
date: 2016-01-03 8:00 AM
author: alif fathon
categories: php
tags: [php-pdo]
---

## Bagian 5 : Form dan Fungsi Delete User ##

Pada Bagian kedua ini, kita akan membahas cara membuat form update untuk meng-edit informasi user lama,

<!--more-->

### Membuat Fungsi Delete ###

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Form | Login User</title>
</head>
<body>
<form action="php-pdo-login.php" method="post">
	<table>
	<tr>
		<td>Username</td>
		<td><input type="text" name="username"></td>
	</tr>
	<tr>
		<td>Password</td>
		<td><input type="password" name="password"></td>
	</tr>
	<tr>
		<td></td>
		<td>
			<button type="submit" name="login" value="login">Login</button>
		</td>
	</tr>
	</table>
</form>
</body>
</html>
```


### Fungsi Login ###

```php
<?php
require_once 'conn-pdo.php';
if(isset($_POST['username']) && isset($_POST['password']))
{
	$username = $_POST['username'];
	$password = md5($_POST['password']);
	$q = $conn->prepare("SELECT * FROM user WHERE username = :username AND password = :password");
	$q->bindValue(username, $username);
	$q->bindValue(password, $password);
	if($q->execute())
	{
		$outp = "You're Logged in as ";
		while($d = $q->fetch(PDO::FETCH_ASSOC)){
			$outp[] .= $d->nama_dp;
		}
		$outp .= '.<br> Menuju Menu? <a href="php-pdo-view.php">Klik Disini</a>';
	} else {
		header('location: php-pdo-form-login.html');
	}
} else {
	$outp = 'login gagal, <a href="php-pdo-form-login.html">Klik Disini</a> untuk login.';
}
echo $outp;
?>
```

Keterangan Program : 

- Cek apa username dan password sudah diisi :

```php
if(isset($_POST['username']) && isset($_POST['password']))
```

- Ambil username dan password ke dalam variable

```php
$username = $_POST['username'];
$password = md5($_POST['password']);
```

- Siapkan Query select berdasarkan username dan password

```php
$q = $conn->prepare("SELECT * FROM user WHERE username = :username AND password = :password");
$q->bindValue(username, $username);
$q->bindValue(password, $password);
```

- Jika eksekusi Query berhasil, maka

```php
if($q->execute())
	{
```

- Dapatkan `nama_dp` dari query melalui `while`

```php
while($d = $q->fetch(PDO::FETCH_OBJ)){
	$outp .= $d->nama_dp;
}
```

- jika data tidak ditemukan maka,

```php
} else {
	header('location: php-pdo-form-login.html');
}
```

- jika username dan password belum diisi, maka

```php
} else {
	$outp = 'login gagal, <a href="php-pdo-form-login.html">Klik Disini</a> untuk login.';
}
```