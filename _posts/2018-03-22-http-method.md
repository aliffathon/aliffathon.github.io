---
layout: post
title: HTTP Method
date: 2018-03-22 07:21:34 +0700
categories: other
tags: other
permalink: /javascript/http-method/
author: bertzzie
---

# Lampiran A: HTTP Method {#top1}

Pada bagian ini kita akan membahas method HTTP secara mendetail. Pada bagian Protokol HTTP kita telah melihat sedikit mengenai method HTTP, dengan tujuh buah method utama yang dispesifikasikan oleh HTTP sebagai berikut:

{:.table.table-hover.table-border}
| Method    | Deskripsi | Body wajib? |
|-|-|
| GET   | Ambil dokumen dari server | Tidak |
| HEAD  | Ambil header dokumen dari server  | Tidak |
| POST  | Kirimkan data ke server untuk diproses    | Ya    |
| PUT   | Simpan data yang ada di bagian Body ke server | Ya    |
| TRACE | Ikuti jejak pesan dari proxy server sampai ke server  | Tidak |
| OPTIONS   | Temukan method apa saja yang dapat dijalankan oleh server | Tidak |
| DELETE    | Hapus data dari server    | Tidak |

Di bagian ini kita akan membahas secara mendalam cara kerja dan kegunaan dari masing-masing method. Ingat bahwa tidak semua method diimplementasikan oleh setiap server HTTP yang ada. Agar dapat memenuhi standar HTTP versi 1.1, sebuah server hanya cukup mengimplementasikan GET dan HEAD saja.

Bahkan untuk server yang mengimplementasikan seluruh method, biasanya akan terdapat batasan-batasan penggunaan. Misalnya, method DELETE dan PUT hanya bisa dijalankan oleh pengguna-pengguna tertentu yang telah terautentikasi dengan hak akses tertentu. Pada mayoritas kasus, kita tidak ingin pengguna dapat secara bebas menambahkan dan menghapus data pada server, karena hal tersebut merupakan lobang keamanan yang besar. Tentu saja batasan seperti ini berbeda-beda untuk setiap kasus, dan seringkali menjadi fitur konfigurasi untuk pengguna.


### Safe and Idempotent Method {#safe-implement}

Sebuah method HTTP dikatakan safe (aman) jika method tersebut tidak mengubah data atau sumber daya yang ada pada server. Misalnya, GET dan HEAD merupakan method yang dianggap aman, yang berarti penggunaan GET maupun HEAD tidak akan mengubah representasi data atau memicu aksi tertentu pada server.

Maksud dari “tidak memicu aksi tertentu” di sini adalah server tidak melakukan apapun ketika request dikirimkan. Misalkan jika kita sedang mengunjungi situs belanja seperti Amazon atau Lazada, jika kita menekan tombol “Beli” maka biasanya browser akan mengirimkan request ke server untuk mengeksekusi pembelian, memasukkan data pembelian ke basis data, pembayaran kartu kredit, dan seterusnya. Pada kasus ini terjadi sebuah “aksi tertentu” yang mengubah representasi data (pengguna tidak membeli menjadi membeli). Bandingkan jika kita membuka sebuah halaman blog di mana server hanya akan mengambil dan mengembalikan data blog kepada kita.

Tentu saja perubahan akan data mungkin saja terjadi ketika kita melakukan pemanggilan request GET, misalnya server yang mencatat jumlah pembaca artikel blog. Yang paling penting ialah representasi data tidak berubah dan pengguna tidak meminta perubahan tersebut. Sebuah artikel blog tetap merupakan artikel blog setelah request, dengan isi yang tetap sama. Jumlah pembaca sedniri merupakan efek samping yang tidak diminta oleh pengguna, dan tidak merubah representasi, sehingga GET tetap dianggap aman. Hal ini berarti request seperti ini:

```
GET /blog/7777/delete HTTP/1.1
```

tidak tepat, karena pemanggilan request akan menghapus artikel yang dituliskan pada blog.

Karena representasi data akan selalu sama pada setiap kali pemanggilan method yang aman, maka method jenis ini akan sangat mudah disimpan dalam cache, tanpa efek samping yang berarti pada data.

Sebuah method HTTP dikatakan idempotent jika method tersebut dapat dipanggil sebanyak berapa kalipun tanpa mengubah keluaran. Tidak penting apakah method dipanggil satu kali atau ratusan kali, hasil eksekusi akan selalu sama. Sekali lagi, maksud “hasil” di sini adalah hasil dalam arti representasi dan jenis data, bukan *isi* dari data itu sendiri. Isi data tentu saja dapat berubah, dan jika data berubah pemanggilan method akan memberikan “hasil” yang berbeda, meskipun representasi dan maknanya sama. Misalkan sebuah artikel berita dapat diperbaharui isinya oleh penulis, tetapi pengambilan data melalui URL dan method yang sama akan tetap terus mengembalikan artikel berita dengan identitas yang sama - apapun isi berita tersebut.

Perhatikan kedua contoh berikut:

```
a = 4; // 1
a++;   // 2
```

Pada contoh kode di atas, kode yang ditandai 1 merupakan kode yang idempoten, karena nilai a akan selalu 4 berapa kalipun kode dijalankan. Kode yang bertanda 2 tidak idempoten karena nilai a akan berubah terus menerus pada tiap eksekusi baris tersebut. Kedua kode tersebut juga bukan merupakan kode yang aman, karena keduanya mengubah nilai a.

Sifat idempoten ini sangat penting untuk mengembangkan aplikasi server yang fault-tolerant (tahan banting). Misalnya ketika pengguna ingin memperbaharui sebuah data melalui POST. Karena POST bukan merupakan method yang idempoten, pengiriman request yang sama beberapa kali akan dapat menghasilkan pembaruan data yang salah. Akan terdapat banyak hal yang harus kita pertimbangkan ketika ingin memperbaharui data dengan method yang tidak idempoten, misalnya:

- Apa yang terjadi ketika request dikirimkan dan server mengalami timeout (terlalu lama memproses data sehingga dibatalkan)?
- Jika timeout terjadi, apakah data benar-benar telah diperbaharui? Bagaimana kita melakukan verifikasi terhadap hal ini?
- Bagaimana kita mengetahui apakah timeout terjadi ketika request dikirimkan atau ketika response dikirimkan?
- Jika timeout terjadi ketika request, apakah aman untuk mengirimkan request sekali lagi?

Dan masih banyak pertanyaan lainnya lagi. Dengan menggunakan method yang idempoten, kita tahu bahwa kita dapat mengirimkan request sekali algi dengan aman karena respon dan hasil eksekusi dijamin sama setiap kalinya.

Berikut adalah status dari sifat idempoten dan keamanan masing-masing method standar.

{:.table.table-hover.table-border}
| Method 	| Idempoten | Aman  |
|-|-|
| GET 	    | Ya 	    | Ya    |
| HEAD      | Ya 	    | Ya    |
| POST 	    | Tidak 	| Tidak |
| PUT 	    | Ya 	    | Tidak |
| TRACE 	| Ya 	    | Ya    |
| OPTIONS 	| Ya 	    | Ya    |
| DELETE 	| Ya 	    | Tidak |

### GET {#get}

GET merupakan method yang paling umum dan paling banyak digunakan. GET digunakan untuk meminta data tertentu dari server. HTTP/1.1 mewajibkan seluruh web server untuk mengimplementasikan method ini.

Contoh di bawah memperlihatkan request dan response dari sebuah pesan GET:

{% highlight raw %}
// request
GET /blog/to-be-or-not-to-be.html HTTP/1.1
Host: contoh.com
Accept: *

// response
HTTP/1.1 200 OK
Content-type: text/html
Content-length: 8372

<html>
<head><title>To be or Not to Be</title>
...
{% endhighlight %}

Pada contoh ini, response GET akan memberikan isi HTML kepada client, yang kemudian dapat ditampilkan kepada pengguna.

### HEAD {#head}

Method HEAD melakukan hal yang sama dengan GET, dengan perbedaan utama yaitu pada HEAD server hanya akan mengembalikan Header HTTP pada response saja. Tidak ada Entity Body yang dikembalikan oleh HEAD. Hal ini akan memungkinkan client untuk melakukan cek atau verifikasi header dari sebuah data tanpa harus mengambil data tersebut (yang tentunya akan menghemat bandwidth). Dengan menggunakan HEAD kita dapat:

    Mengetahui informasi tentang data (tipe data, ukuran, dst) tanpa harus mengambi data secara langsung.
    Mengetahui apakah data ada atau tidak dengan melihat kode status yang dikembalikan.
    Melihat apakah data telah diubah, melalui pembacaan Header.

Pengembang aplikasi web pada sisi server atau pengembang web server harus memastikan data Header yang dikembalikan oleh GET dan HEAD sama persis. Dukungan terhadap method HEAD juga diwajibkan oleh spesifikasi HTTP/1.1. Contoh berikut memperlihatkan request dan response dari HEAD:

```
// request
HEAD /blog/to-be-or-not-to-be.html HTTP/1.1
Host: contoh.com
Accept: *

// response
HTTP/1.1 200 OK
Content-type: text/html
Content-length: 8372
```

Perhatikan bagaimana perbedaan antara HEAD dengan GET hanya bahwa response HEAD tidak memiliki isi HTML.

### PUT {#put}

Method PUT menuliskan data pada server, sebagai kebalikan dari GET yang membaca data dari server. Beberapa sistem publikasi atau manajemen konten memungkinkan kita untuk membuat sebuah halaman web baru pada web server dengan menggunakan PUT.

Cara kerja PUT sangat sederhana, yaitu server membaca isi Entity Body dari request dan menggunakan isi tersebut untuk membuat halaman baru pada URL yang diberikan request, atau jika URL telah ada maka isi data akan ditimpakan. Karena PUT menggantikan data yang ada pada server, kebanyakan server biasanya mewajibkan autentikasi sebelum melakukan PUT. Pembahasan mengenai autentikasi akan dilakukan pada bagian selanjutnya.

Berikut adalah contoh dari request dan response dari PUT:

```
// request
PUT /data/pengguna.txt HTTP/1.1
Host: contoh.com
Content-type: text/plain
Content-length: 300

Daftar pengguna baru!

// response
HTTP/1.1 201 Created
Location: http://contoh.com/data/pengguna.txt
Content-type: text/plain
Content-length: 300

http://contoh.com/data/pengguna.txt
```

Perhatikan bagaimana pada PUT server dapat langsung memberikan lokasi data penyimpanan, dan bagaimana lokasi tersebut sama dengan URL yang diberikan oleh client pada request.


### POST {#post}

POST digunakan untuk mengirimkan data masukan pengguna ke server. Pada prakteknya, POST biasanya digunakan untuk mengambil data yang dimasukkan dari form HTML. Data yang diisikan pada form biasanya dikirimkan kepada server, dan server kemudian menentukan ke mana data akan dikirimkan selanjutnya (misal: disimpan ke *database atau diproses oleh aplikasi lain).

Gambar di bawah memperlihatkan contoh dan cara kerja dari POST.

![Cara kerja POST](/img/2018-03-22-http-post.png)

Cara Kerja POST

Perbedaan utama dari POST dan PUT adalah bahwa POST digunakan untuk mengirimkan data ke server dan server bebas menentukan apa yang akan dilakukan terhadap data tersebut. PUT digunakan hanya untuk menyimpan data ke dalam server, dalam bentuk apapun (misal: file, database, dst).

### TRACE {#trace}

Ketika client mengirimkan request ke server, request mungkin saja harus melewati banyak server lain seperti Firewall, Proxy, atau Gateway sebelum sampai ke server yang sebenarnya dituju. Setiap server yang dikunjungi sebelum request sampai ke server yang sebenarnya dapat saja memodifikasi request HTTP yang dikirimkan. Method TRACE memungkinkan client untuk melihat request paling akhir yang diterima oleh server tujuan.

Sebuah request TRACE akan memulai perputaran diagnostik pada server tujuan. Ketika menerima request TRACE, server tujuan akan mengembalikan sebuah respon berisi request terakhir yang diterima oleh server, sehingga client dapat melihat bagian mana dari request asli yang dikirimkan yang mengalami perubahan ketika sampai di server. Gambar berikut memperlihatkan contoh cara kerja sederhana dari TRACE.

![Cara kerja TRACE](/img/2018-03-22-http-trace.png)

Cara Kerja TRACE

TRACE digunakan terutama untuk diagnostik, misalnya untuk memastikan request yang dikirimkan sampai ke tujuan sesuai dengan keinginan. Hal ini terutama paling berguna karena terkadang server yang berada di tengah client dan server dapat mengubah request atau meneruskan request ke tempat yang tidak diinginkan (misalnya cache).

Meskipun merupakan alat diagnostik yang baik, TRACE memiliki satu kelemahan utama: TRACE mengasumsikan bahwa perangkat yang berada di antara client dan server memperlakukan semua request (GET, POST, PUT, dst) sama. Pada prakteknya, banyak apliaksi server di lapangan yang memperlakukan masing-masing request berbeda, misalnya membuka cache untuk GET dan meneruskan request tanpa perubahan untuk POST. TRACE tidak memiliki mekanisme untuk mendeteksi hal-hal seperti ini.

Hal lain yang perlu dicatat adalah bahwa sebuah request TRACE tidak boleh memiliki Entity Body. Entity Body pada response dari TRACE hanya boleh berisi request dengan sama persis.

### OPTIONS {#options}

OPTIONS bertanya kepada server untuk mengetahui kemampuan yang dimiliki oleh server. Kita dapat meminta informasi method yang didukung oleh server untuk data (URL) tertentu. Hal ini dilakukan untuk mengantisipasi beberapa server yang hanya memberikan dukungan terbatas terhadap beberapa URL atau objek tertentu.

Dengan begitu, OPTIONS memberikan cara bagi aplikasi client untuk menentukan cara terbaik mengakses berbagai data yang ada dalam server tanpa harus selalu mengakses data secara langsung. Berikut adalah contoh request dan response yang mungkin terjadi dengan menggunakan OPTIONS:

```
// request
OPTIONS * HTTP/1.1
Host: contoh.com
Accept: *

// response
HTTP/1.1 200 OK
Allow: GET, POST, PUT, OPTIONS
Context-length: 0
```

### DELETE {#delete}

DELETE, seperti namanya, meminta server untuk menghapus data yang ada pada server, sesuai dengan URL yang diberikan oleh client. Begitupun, client tidak diberi jaminan bahwa penghapusan akan dijalankan ketika menggunakan DELETE. Hal ini terjadi karena standar HTTP memperbolehkan server untuk menolak atau mengabaikan permintaan DELETE dari client.

Gambar di bawah memperlihatkan contoh request DELETE.
![Cara kerja DELETE](/img/2018-03-22-http-delete.png)

Cara Kerja DELETE


### Penutup {#penutup}

Pada lampiran ini kita telah membahas berbagai method standar yang ada pada HTTP. Ingat bahwa HTTP memungkinkan pengembang aplikasi server untuk mengembangkan method mereka sendiri. Hal ini berarti kita akan banyak menemukan method yang tidak ada dalam standar, dan cara kerjanya akan bergantung kepada pengembang aplikasi tersebut. Pastikan anda membaca dokumentasi method secara lengkap sebelum menggunakan method tambahan tersebut.

[source](https://bertzzie.com/knowledge/serverside-nodejs/LampiranAHTTPMethod.html)


