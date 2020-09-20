---
layout: post
title: NodeJS Routing

permalink: /sample.html
---


# Routing {#routing}

Ketika mengembangkan sebuah aplikasi web, salah satu hal yang paling penting untuk dirancang dengan baik adalah routing. Dalam konteks pengembangan web, routing dapat kita definisikan sebagai pemetaan dari sebuah URL ke sumber daya tertentu. Misalnya, sebuah URL seperti berikut:

https://contoh.com/data/laporan/2015/laporan-keuangan

mungkin saja dipetakan di dalam direktori /home/web/laporan/2015/laporan-keuangan.pdf pada server. Seorang pengunjung web hanya perlu mengetahui URL yang merepresentasikan data tersebut (laporan-keuangan.pdf), dan server akan memberikan data yang tepat karena pemetaan melalui routing ini.

## Jenis Routing {#jenis-routing}

Secara umum, kita biasanya menemukan tiga jenis implementasi routing:

- Routing 1-1
- Routing Dinamis dengan Front Controller
- Routing Dinamis dengan Middleware

Bagaimana perbedaan dari ketiga jenis routing di atas? Apa kelebihan dan kekurangan dari masing-masing jenis router? Mari kita lihat secara lebih mendalam.

### Routing 1-1 {#by-one}

Routing 1-1 merupakan jenis routing yang paling sederhana, gampang dimengerti dan mudah diimplementasikan. Seperti namanya, Routing 1-1 memetakan sebuah URL ke sebuah file atau data tertentu. Data yang dipetakan biasanya berupa konten statik, yang tidak berubah isinya serta dapat langsung diakses dengan mudah oleh pengguna.

![Routing 1-1](file:///media/obengkumana/SANDISK/_images/routing-classic.png)

Karena pemetaannya yang langsung dan statik (1 URL memiliki hubungan ke dalam 1 file), implementasi dan bahkan optimasi Routing jenis ini sangat mudah dilakukan. Implementasi web server sederhana yang kita lakukan pada bagian sebelumnya pada dasarnya telah mengimplementasikan Routing 1-1 karena kita hanya dapat mengakses file yang letaknya sesuai dengan aturan dari web server, tanpa ada komponen dinamis.

### Routing Dinamis (Front Controller) {#dinamis}

Ketika kita menggunakan Routing 1-1, kita pada dasarnya menyediakan data untuk setiap jenis Request dan URL yang didukung. Misalnya, jika kita ingin mengembangkan aplikasi web yang memiliki halaman utama, halaman login, dan halaman register maka kita harus membuat 3 buah file (index, login, register) yang masing-masing merepresentasikan halaman tersebut.

Untuk sebuah website kecil dan sederhana, hal ini mungkin dapat dengan mudah dilakukan dan dapat menghasilkan kode yang mudah dirawat. Sayangnya, ketika jumlah halaman mulai membengkak, pemetaan 1-1 tak lagi cocok digunakan. Pada saat inilah kita dapat menggunakan Routing Dinamis yang mengimplementasikan design pattern Front Controller.

Cara kerja Front Controller sangat sederhana:

- Pengguna mengirimkan HTTP Request ke server.
- Apapun URL yang diminta dalam HTTP Request, server akan mengirimkan keseluruhan HTTP Request ini ke satu objek khusus (Front Controller) yang ditugaskan untuk menangani HTTP Request.
- Objek khusus tersebut kemudian menentukan fungsi atau objek mana yang harus dipanggil, berdasarkan URL dari HTTP Request yang diberikan.
- Fungsi yang dipanggil umumnya akan harus memberikan nilai kembalian berupa sebuah HTTP Response, yang dapat langsung dikirimkan oleh aplikasi web ke server, dan server ke pengguna.

Secara sederhana, berikut adalah ilustrasi dari cara kerja Front Controller:

![Routing Dinamis dengan Front Controller](file:///media/obengkumana/SANDISK/_images/routing-frontcontroller.png)

Routing Dinamis dengan Front Controller

Dari gambar di atas kita dapat melihat bagaimana segala permintaan dari pengguna akan dilayani oleh index.php, yang kemudian dapat memanggil satu atau banyak fungsi (bagian codes). Apakah fungsi akan berhubungan dengan database atau melakukan pemrosesan rumit tidak penting, tetapi pada akhirnya fungsi harus mengembalikan HTTP Request kepada pengguna.

Perhatikan juga bagaimana pada gambar di atas kita bergantung kepada web server untuk memberikan HTTP Request maupun Response. Untuk aplikasi yang telah memiliki web server tentunya pemetaan dapat dilakukan dengan mudah. Sayangnya aplikasi CGI tidak selalu mendapatkan kemudahan ini. Misalnya pada PHP, jika impelementasi Front Controller tidak disinergikan dengan web server kita akan sering menemukan URL seperti berikut:

```
https://website.com/index.php?module=profile&id=912387
https://website.com/index.php?module=manga&title=naruto&chapter=100
```

Karena PHP tidak memiliki kontrol langsung terhadap web server. Idealnya, kedua URL di atas dapat dipetakan ke dalam URL yang lebih sederhana dan elegan:

```
https://website.com/profile/912387
https://website.com/manga/naruto/100
```

Untungnya terdapat fitur khusus dari web server untuk menangani hal ini, yang dikenal dengan nama URL Rewriting. Pada dasarnya, URL Rewriting melakukan transformasi URL dari bentuk yang diakses pengguna (https://website.com/profile/912387) ke bentuk yang dikenal oleh apliaksi (https://website.com/index.php?module=profile&id=912387).

Pada implementasi Front Controller yang lebih kaya, objek Front Controller bahkan mungkin saja tidak hanya melanjutkan HTTP Request dan Response, tetapi juga melakukan modifikasi terhadap Request maupun Response untuk mendapatkan perilaku spesifik tertentu. Misalnya, kita dapat membangun Front Controller yang melakukan pengecekan apakah pengguna telah login atau belum sebelum memanggil fungsi lain yang menghasilkan HTTP Response.

Terdapat sangat banyak framework atau aplikasi web yang menggunakan Front Controller, misalnya:

- Framwork MVC pada bahasa PHP umumnya (misal: Symfony, Code Igniter).
- ASP MVC .Net buatan Microsoft.
- Spring Framework pada lingkungan Java.

Pada prakteknya terdapat sangat banyak sekali aplikasi web selain dari contoh di atas yang menggunakan Front Controller sebagai pola penanganan Routing-nya. Hal ini disebabkan karena kemudahan penggunaan dan efektifitas yang ditawarkan oleh Front Controller.

### Routing Dinamis (Middleware) {#middleware}

Metode lain untuk melakukan routing dinamis ialah dengan menggunakan middleware. Secara sederhana, sebuah middleware adalah fungsi-fungsi yang menangani HTTP Request. Dalam model middleware, sebuah server yang telah dibuat akan memiliki beberapa middleware yang terikat dengannya. Ketika HTTP Request masuk, middleware akan langsung dipanggil satu per satu, masing-masing memberikan respon terhadap HTTP Request yang masuk.

Ilustrasi berikut memperlihatkan cara kerja middleware:

![Routing Dinamis dengan Middleware](file:///media/obengkumana/SANDISK/_images/routing-middleware.png)

Seperti yang nampak pada gambar di atas, middleware bekerja di atas sebuah modul Request Handler, yang menangani HTTP Request. Modul ini dapat berbentuk apa saja, tetapi yang paling umum adalah web server. Middleware akan dieksekusi langsung di atas web server, dan kita dapat memiliki banyak middleware yang akan dieksekusi satu per satu secara berurutan.

Routing sendiri kemudian dapat diimplementasikan sebagai salah satu middleware, yang akan memanggil fungsi spesifik ketika HTTP Request diterima. Konsekuensi langsungnya ialah routing dapat diimplementasikan dengan lebih sederhana pada model middleware, dan lebih mudah dikembangkan jika memang diperlukan.

Beberapa contoh framework yang menggunakan middleware yaitu:

- ExpressJS pada NodeJS.
- Rack pada Ruby.

Perlu diingat juga bahwa walaupun middleware dapat digunakan untuk mendapatkan routing dinamis, kegunaan middleware tidak berhenti sampai di situ saja. Terdapat banyak hal yang dapat kita lakukan dengan middleware, misalnya pencatatan dan penanganan error. Sayangnya, pembahasan tentang hal ini baru dapat kita lakukan pada tulisan lain.

### Pendekatan Implemenatsi Routing {#implementasi}

Penerapan sistem routing pada dasarnya memiliki dua buah langkah yang harus dilakukan:

- Simpan daftar rute URL yang dapat ditangani.
- Bangun sistem untuk mencocokkan URL yang diberikan pengguna dan rute yang disimpan pada langkah 1.

Pada routing statik (1-1), kedua langkah ini dapat dilakukan dengan sangat mudah. Daftar rute merupakan daftar file pada web server, sementara sistem pencocokan dapat dilakukan hanya dengan pengambilan file.

Pada routing dinamis, terdapat sedikit komplikasi, karena rute yang ada biasanya bersifat pola. Misalkan, kita bisa saja memiliki beberapa pola pada URL aplikasi web kita:

```
# Halaman Profil
https://contoh.com/profile/18237
https://contoh.com/profile/901723
https://contoh.com/profile/217871

# Pola Halaman Profil
/profile/[id]

# Halaman Baca Manga
https://contoh.com/manga/naruto/100/12
https://contoh.com/manga/one-piece/234/19
https://contoh.com/manga/fairy-tail/322/12

# Pola Halaman Baca Manga
/manga/[judul]/[bab]/[halaman]
```

dan masih banyak pola lainnya. Umumnya beberapa hal yang perlu kita simpan untuk mendapatkan pola rute yang baik yaitu:

- HTTP Method untuk pola rute,
- pola URL yang berlaku untuk rute, dan
- fungsi yang dipanggil ketika URL dari HTTP Request cocok dengan rute.

Kebutuhan akan adanya penyimpanan dan pencocokan pola ini menyebabkan kita harus mempertimbangkan berbagai hal ketika ingin menerapkan sebuah sistem routing. Pada bagian ini, kita akan melihat beberapa contoh implementasi umum sebagai bahan referensi.

### Penyimpanan Rute dalam Daftar Sederhana {#route-list}

Cara yang paling mudah dan sederhana untuk menyimpan daftar pola rute adalah dengan menyimpan rute tersebut ke dalam sebuah daftar sederhana. Daftar ini dapat berupa apa saja, mulai dari file yang harus dibaca secara khusus sampai ke array sederhana.

Misalnya, kita dapat menyimpan informasi rute di dalam sebuah file dengan format berikut:

```
[HTTP Method] [Pola URL]
{controller: [Nama Controller], method: [Method]}
```

yang nantinya akan diulangi sesuai dengan kebutuhan. Berikut adalah contoh file rute yang dapat dibangun dari sintaks di atas:

```
GET /
{controller: HomeController, method: Index}

GET /{page}
{controller: HomeController, method: Index}

GET /profile/{id}
{controller: ProfileController, method: Show}

GET /read/{title}/{chapter}
{controller: MangaController, method: Read}
```

Kita kemudian dapat membaca file di atas dengan modul khusus yang akan menyimpan dan mencocokkan daftar rute yang ada. Pada contoh di atas, ketika pengguna masuk ke URL:

```
https://contoh.com/read/naruto/100
```

maka fungsi MangaController.Read akan dipanggil. Pendaftaran dan pencocokan daftar rute sendiri dapat dilakukan dengan algoritma yang cukup sederhana, misalnya:

- Baca (parse) file daftar rute.
- Ekstrak informasi rute yang ada (HTTP Method, pola URL, dst) ke dalam struktur data tertentu.
- Ambil URL pengguna yang masuk dari HTTP Request.
- Cocokkan URL pengguna terhadap pola URL.
- Jika terdapat pola yang cocok, panggil fungsi (controller dan method) yang bersangkutan.
- Jika tidak terdapat pola yang cocok, tampilkan kesalahan 404 (Page Not Found).

Cara kerja sistem rute seperti ini cukup sederhana, tetapi sayangnya terdapat beberapa kekurangan utama dari sistem seperti ini:

- Kompleksitas pencocokan rute adalah `O(n)`, di mana `n` adalah jumlah dari rute. Hal ini menyebabkan aplikasi menjadi lambat atau memakan banyak memori seiring dengan meningkatnya jumlah rute.
- Terdapat kemungkinan di mana rute dengan pola yang sama dimasukkan lebih dari satu kali. Solusi umum untuk masalah ini adalah sistem First Come First Serve di mana rute yang pertama kali cocok akan dipanggil fungsinya. Sayangnya solusi ini tidak menyelesaikan masalah pertama, yaitu jumlah rute menjadi membanyak.
- Implementasi perubahan rute secara dinamis akan sulit, karena kita harus menerapkan mekanisme pembacaan file dan pembaharuan daftar rute.

Sebuah studi kasus yang menarik dari permasalahan ini adalah masalah yang ditemui oleh Netflix, pada blog Node.JS in Flames. Beberapa catatan yang dapat kita ambil dari tulisan tersebut yaitu:

- Aplikasi Netflix menjadi lambat karena jumlah rute yang meledak.
- Jumlah rute yang meledak terjadi karena kesalahan programmer yang menambahkan semua rute statik yang ada ketika memperbaharui rute dinamis.
- Penambahan rute yang telah ada dalam daftar rute menambahkan jumlah rute total.
- Karena pengecekan rute memiliki kompleksitas `O(n)` dan alasan no 2 dan 3, maka waktu respon aplikasi menjadi sangat lambat. Aplikasi menghabiskan waktu pada pencocokan rute yang jumlahnya sangat banyak.

Meskipun permasalahan di atas diselesaikan oleh Netflix dengan memperbaiki bug yang ada pada no 2, tentunya akan jauh lebih baik jika kita dapat mencegah hal tersebut. Misalnya dengan memberikan pesan kesalahan atau peringatan ketika pengguna mencoba menambahkan rute yang telah ada.

Solusi lain dari permasalahan di atas adalah menyimpan rute dengan DFA (Deterministic Finite Automaton).

### Penyimpanan Rute dengan DFA {#dfa}

> Catatan: Jika belum mengetahui tentang DFA, artikel Wikipedia tentang DFA dapat menjadi titik awal yang baik.

Solusi penanganan rute dengan menggunakan DFA didasarkan pada alur pemikiran seperti berikut:

- Inti utama dari routing adalah pemetaan antara URL dengan konten.
- Pada prakteknya, jika konten yang diambil dinamis, URL untuk ke konten juga akan bersifat dinamis.
- Meskipun konten dan URL sama-sama dinamis, akan selalu ada bagian dari URL yang konsisten. Misalnya: bagian /profile dari /profile/[id].
- Untuk menangani pemetaan sesuai aturan no 3, kita dapat menggunakan sistem pencocokan pola.
- Salah satu sistem pencocokan pola yang cukup baik, mudah, dan efisien adalah Regular Expression.
- Regular Expression dapat diubah menjadi DFA, yang merupakan sebuah state machine.
- Jika semua pola dibangun dengan regular expression dan diubah menjadi DFA, kita dapat menggabungkan semua DFA tersebut menjadi 1 DFA besar.
- Pencocokan URL kemudian dilakukan dengan penelusuran DFA, yang hanya memiliki kompleksitas `O(n)`, di mana `n` adalah panjang URL.
- Pada prakteknya, batas panjang URL adalah 2000 karakter, yang adalah angka kecil bagi komputer.

Dari alur pemikiran di atas, kita dapat melihat bagaimana implementasi sistem rute menggunakan DFA akan memilki performa yang sangat cepat, dan dapat dengan mudah melakukan penambahan rute secara dinamis. Kekurangan utama dari model ini adalah bahwa implementasi sistem ini cukup kompleks dan sulit. Efektifnya kita akan menerapkan sebagian dari sebuah compiler untuk mendapatkan hal ini.

Sayangnya, kompleksitas implemetnasi yang tinggi ini menyebabkan kita belum dapat melakukan bahasa implementasi sekarang. Tetapi pada bagian berikutnya kita akan mengimplementasikan routing dengan list sederhana. Routing dengan DFA akan dibahas pada lain waktu (jika penulis menerbitkan tulisan tentang compiler).

### Implementasi Sistem Routing Sederhana {#sederhana}

Setelah melihat berbagai aspek dari penerapan sebuah sistem routing, mari kita coba mengembangkan sebuah sistem routing sederhana sebagai bahan pembelajaran. Untuk menyederhanakan, kita hanya akan mengimplementasikan sistem routing yang menyimpan daftar rute di dalam sebuah array sederhana. Sistem routing juga akan kita implementasikan di atas web server NodeJS sederhana yang kita kembangkan pada bagian sebelumnya.

Misalkan, kita ingin dapat menggunakan sistem routing dengan cara berikut:

``` js
var ws = require('./WebServer'),
    server = ws.WebServer({ 'port': 9000, 'hostname': 'localhost' });

server.AddRoute("GET", /^\/$/, function (request, response, params) {
    response.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': 5 });
    response.write('Hello');
    response.end();
});

server.AddRoute("GET", /profile\/(.*)/, function (request, response, id) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write("PROFILE ID: " + id);
    response.end();
});

server.Start();
```

Fungsi utama yang akan kita gunakan yaitu server.AddRoute yang akan menerima tiga buah parameter, yaitu:

- HTTP Method untuk rute tersebut.
- Pola URL yang diterima, dalam format regular expression.
- Fungsi yang dieksekusi ketika pola URL cocok dengan URL dari HTTP Request.

Sebuah fungsi yang cukup sederhana, bukan? Mari kita mulai pengembangan dengan membuat sebuah objek kosong pada modul tersendiri. Buat sebuah file Router.js, dan isikan dengan kode awal:

``` js
var _routes = [];

var Router = function () {
    var RouterObject = {};

    return RouterObject;
};

module.exports = Router();
```

Kode di atas membuat fungsi constructor Router yang akan mengembalikan objek router kita untuk digunakan oleh web server nantinya. Jika anda tidak familiar dengan cara pembuatan constructor ini, silahkan baca tentang pembuatan objek dengan closure pada Javascript. Variabel privat _rotues sendiri merupakan array yang akan menampung segala objek rute kita nanti.

Kita kemudian dapat menambahkan fungsi penambahan rute baru di dalam RouterObject, seperti berikut:

``` js
RouterObject.add = function (method, pattern, handler) {
    _routes.push({ 'method': method, 'pattern': pattern, 'handler': handler });
    return this;
};
```

Fungsi di atas juga cukup gamblang: kita hanya menyimpan ketiga parameter yang dibutuhkan ke dalam sebuah objek baru. Objek ini kemudian akan dimasukkan ke dalam _routes. Hal ini berarti setelah menjalankan contoh kode penggunaan rute di awal bagian ini _routes akan berisi:

``` js
[
    {'method': 'GET', 'pattern': /^\/$/, 'handler': function () { /* ... */ } },
    {'method': 'GET', 'pattern': /profile\/(.*)/, 'handler': function () { /* ... */ } }
]
```

Selanjutnya, setelah rute tersimpan dengan baik, kita kemudian dapat membuat fungsi untuk mencocokkan rute dengan URL pengguna. Kita akan menggunakan cara yang sederhana untuk ini, yaitu melakukan perulangan menelusuri array dan mencocokkan satu per satu pola pada array tersebut dengan URL pengguna:

``` js
RouterObject.dispatch = function (method, url, request, response) {
    var len = _routes.length,
        i = 0,
        match, rMeth;

    for (i = 0; i < len; i+=1) {
        match = url.match(_routes[i].pattern);
        rMeth = _routes[i].method === method;

        if (match && rMeth) {
            match.shift();
            _routes[i].handler.apply({}, [request, response].concat(match));
        }
    }
};
```

Seperti yang nampak pada kode di atas, fungsi RouterObject.dispatch menerima empat buah parameter:

- Method dari HTTP Request yang dikirimkan pengguna. Digunakan untuk mencocokkan method dari HTTP Request dengan method pada daftar rute.
- URL dari HTTP Request yang dikirimkan pengguna. Digunakan untuk mencocokkan URL dengan pola URL pada daftar rute.
- Objek HTTP Request dari web server. Untuk dikirimkan ke handler.
- Objek HTTP Response dari web server. Untuk dikirimkan ke handler.

Bagian yang paling menarik pada kode di atas adalah blok di dalam if (match && rMeth) yang berisi dua baris sederhana:

``` js
match.shift();
_routes[i].handler.apply({}, [request, response].concat(match))
```

Kode ini diadapatasi dari kode yang kita gunakan ketika membangun sistem routing pada sisi klien. Silahkan baca tulisan tersebut jika tidak mengerti dengan kedua baris kode ini.

Objek Router kita telah selesai. Kode akhir dari objek ini yaitu:

``` js
var _routes = [];

var Router = function () {
    var RouterObject = {};

    RouterObject.add = function (method, pattern, handler) {
        _routes.push({ 'method': method, 'pattern': pattern, 'handler': handler });
        return this;
    };

    RouterObject.dispatch = function (method, url, request, response) {
        var len = _routes.length,
            i = 0,
            match, rMeth;

        for (i = 0; i < len; i += 1) {
            match = url.match(_routes[i].pattern);
            rMeth = _routes[i].method === method;

            if (match && rMeth) {
                match.shift();
                _routes[i].handler.apply({}, [request, response].concat(match));
            }
        }
    };

    return RouterObject;
};

module.exports = Router();
```

Penambahan kode pada WebServer.js yang diambil dari bagian sebelumnya sendiri tidak terlalu banyak dan cukup gamblang:

``` js
var http = require('http'),
    router = require('./Router');

var _serverHandler = function (request, response) {
    var url = request.url,
        method = request.method;

    router.dispatch(method, url, request, response);
};

var WebServer = function(options) {
    var ServerObject = {};

    var _options = options || {},
        _port = _options.port || process.env.port || 1337,
        _hostname = _options.hostname || 'localhost',
        _server = http.createServer(_serverHandler);

    ServerObject.Server = _server;

    ServerObject.Start = function () {
        _server.listen(_port, _hostname);
    };

    ServerObject.Stop = function () {
        _server.close();
    };

    ServerObject.AddRoute = function (method, pattern, handler) {
        router.add(method, pattern, handler);
    };

    return ServerObject;
};

exports.WebServer = WebServer;
```

Bagian yang dicetak tebal merupakan bagian yang ditambahkan, berisi hanya pemanggilan fungsi dari Router dengan parameter yang tepat. Untuk mencoba kode, jalankan server dan coba kunjungi `http://localhost:9000/profile/testing`. Ingat bahwa nilai port bisa berubah sesuai dengan nilai yang diberikan ketika membuat server.

Keseluruhan kode yang kita kembangkan pada bagian ini dapat diambil pada repostory github bab ini.

## Penutup {#penutup}

Pada bagian ini kita telah melihat berbagai pendekatan yang dapat digunakan untuk membuat sistem routing, beserta dengan studi kasus implementasi sistem tersebut dengan sederhana. Jika tertarik, pembaca dapat mencoba meningkatkan penerapan yang kita lakukan dengan:

    Menambahkan sistem middleware di atas WebServer, dan mengubah Router menjadi sebuah middleware.
    Membuat sistem routing dengan DFA.

Pada bagian selanjutnya, kita akan melihat bagaimana mengembangkan dan menggunakan sistem template untuk menghasilkan HTML dari kode kita.

