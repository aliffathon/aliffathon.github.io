---
layout:		post
title: 		"Email Zoho dengan Domain Pribadi"
author:		alif
date:		2018-03-08 10:22 +0700
categories:	default
tags:		["email", "zoho", "domain"]
permalink:	/email-domain-pribadi/
---

Dokumentasi membuat email dengan extensi domain pribadi.

Daftar Layanan dan Peralatan yg digunakan:
- Zoho Mail Services (gratis dengan beberapa batasan)
- DNS Pribadi (saya beli dan konfig di cloudkilat, alternatif bisa menggunakan cloudflare)

# Step by Step Registrasi Layanan Email di [Zoho](https://www.zoho.com/signup.html)


# Step by Step Konfigurasi Domain dan Layanan Email

## Login ke Akun [Zoho](https://accounts.zoho.com/signin?servicename=ZohoHome&serviceurl=https://home.zoho.com&signupurl=https://www.zoho.com/signup.html)

> catatan: saat saya registrasi, sudah lama dan saya lupa password login saya, alhasil dokumentasi ini saya sekalian sertakan cara reset password nya saja ya :V
> selain untuk me-reset password yg lupa, dapat juga untuk melakukan setting password pada akun yg terdaftar langsung via gmail (signup/signin via google)


Buka Email anda, misal [Login Gmail](https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin)


setelah berhasil login, akan diarahkan ke [Home](https://home.zoho.com/home)

klik pada icon [Mail](https://mail.zoho.com/zm/)

berikut adalah contoh tampilan dashboard webmail client
![13](13)

karena saya malas untuk menghapus dan membuat domain baru untuk dokumentasi kali ini, ya sudah isi nya cuman "liat-liat" konfigurasi yg sudah ada aja ya :V

Halaman [Dashboard cPanel Mail Server](https://mailadmin.zoho.com/cpanel/index.do#dashboard/general)

![14](14)

Masuk ke Menu [Domain](https://mailadmin.zoho.com/cpanel/index.do#domains)
dapat dilihat daftar domain yg terhubung dengan akun ini

> catatan: untuk akun gratis, hanya boleh memiliki satu domain

Lanjut ke Halaman [User]()
disini kita bisa melakukan managemen user yg dapat menggunakan layanan email dengan domain kita.

![15](15)

Tambah user Email baru

![16](16)

Setting DKIM dan SPF

![DKIM](17)


Login Domain Control Panel

![24](24)

Setup Domain

![25](25)
![26](26)
![27](27)
![28](28)
![29](29)


Check Domain yg Telah didaftarkan:

maximal 2x24 jam dari waktu konfig/perubahan terakhir

https://www.mail-tester.com/spf-dkim-check

http://dkimvalidator.com
----------
https://github.com/epsi-rns?tab=repositories
https://github.com/epsi-rns/epsi-rns.github.io/blob/master/_posts/webdev/2018-02-21-jekyll-basic.markdown
http://epsi-rns.github.io/
http://epsi-rns.github.io/webdev/2018/02/21/jekyll-basic.html
http://192.168.101.111:4000/about.html