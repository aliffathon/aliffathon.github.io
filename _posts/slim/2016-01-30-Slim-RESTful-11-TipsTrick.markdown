---
layout: post
title: Slim - RESTful API - Tips Trick
categories: slim-restful
permalink: /slim-restful/11-tips-trick/
tags: [slim]
date: 2016-01-31 8:15PM
description: RESTful API Server - Slim Framework Tutorial Series
---


pada pembuatan RESTful Server API, jika aplikasi client yang digunakan tidak berada di server yang sama dengan server api, maka akan terjadi beberapa error, seperti: Client tidak dapat meng-akses server api, server tidak tahu cara merespon request dari client, dan lain lain.

berikut beberapa tips yang dapat saya berikan,

- jika terdapat error "Access-Control-Allow-Origin", maka tambahkan header berikut pada file `index.php` kita :

```
header("Access-Control-Allow-Origin: *");
```

- untuk memberitahu client, data yang dikirimkan berupa text/JSON, tambahkan header berikut :

```
header("Content-Type: application/json");
```

- untuk mengijinkan client membaca header content yang dikirimkan server, tambahkan header berikut :

```
header("Access-Control-Allow-Headers: accept, content-type");
```

- untuk memberitahukan client method apa saja yang dapat digunakan, tambahkan header berikut :

```
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT");
```

Sekian, :-)