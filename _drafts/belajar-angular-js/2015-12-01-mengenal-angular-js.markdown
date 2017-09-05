Mengenal AngularJS

May 12, 2015 - AngularJS, Codeigniter 3.x.x, Source Code, Tutorial

```
<script src="../angular.js" type="text/javascript"></script>
```
Ada beberapa perintah “directive” yang ada didalam angularjs, seperti :

- ng-app
  Berfungsi untuk mendeklarasi root element dari aplikasi AngularJS yang dapat digunakan untuk membinding dan menentukan perilaku.
- ng-bind
  Mengatur teks elemen DOM (Document Object Model) dengan nilai ekspresi.
  Contoh, <span ng-bind="nama_ekeprsi"></span> akan menampilkan nilai ‘nama_ekeprsi’ di dalam elemen span. Setiap perubahan variabel ‘nama_ekeprsi’ di lingkup aplikasi tercermin langsung dalam DOM.
- ng-model
  Hampir sama dengan ng-bind, namun ng-model menetapkan data dua arah yang mengikat antara tampilan (view) dan ruang lingkup (scope)
- ng-model-options
  Berfugsi untuk mengatur bagaimana ng-model di update
- ng-class
  Berfungsi agar atribut kelas dapat dimuat (loaded) secara dinamis
- ng-controller
  Berfungsi untuk menentukan JavaScript kontroler kelas yang mengevaluasi ekspresi HTML.
- ng-repeat
  Berfungsi untuk melakukan perulangan (looping) pada tiap item
- ng-show & ng-hide
  Berfungsi untuk menampilkan atau menyembunyikan elemen, tergantung pada nilai ekspresi boolean
- ng-switch
  Digunakan untuk memilih sebuah nilai dari beberapa pilihan, hampir sama dengan event onchange
- ng-view
  Directive dasar yang bertanggung jawab untuk menangani rute sebelum dikendalikan oleh controller tertentu
- ng-if
  Pernyataan if yang memungkinkan untuk menampilkan elemen berikut, jika kondisi benar. Ketika kondisi salah, elemen dihapus dari DOM. Ketika benar, tiruan dari unsur disusun ulang
- ng-aria
  Sebuah modul untuk dukungan aksesibilitas atribut ARIA
- ng-animate
  Modul menyediakan dukungan untuk JavaScript, CSS3 transisi dan CSS3 keyframe animasi kait dalam inti dan adat arahan yang ada

Mungkin kamu masih bingung tentang beberapa directive diatas, untuk lebih jelasnya coba kita buat sebuah aplikasi html standart.
```
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset="UTF-8">
    <title>Codeigniter - Angularjs</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
<script src="angular.js" type="text/javascript"></script>
  </head>
  <body ng-app="">
    
  </body>
</html>
```
Selanjutnya buatlah sebuah div didalam body, lalu masukkan kode dibawah ini :
```
<div>
  Mencoba menambah angka
  1 + 1 = \{\{ 1 + 1\}\}
</div>
```
Maka hasilnya akan tampak seperti ini
```
Mencoba menambah angka 1 + 1 = 2
```
Mengapa demikian ? karena didalam \{\{ \}\} akan dilakukan ekseksi yang akan menghasilkan bilangan 2. Selanjutnya mari kita buat sebuah inputan, buat sebuah div baru dan masukkan kode dibawah ini :
```
<div>
  Masukkan beberapa kata
  <input type="text" ng-model="mytext" >
  \{\{ mytext \}\}
</div>
```
Maka hasilnya pada saat kita memasukkan teks pada textbox, akan mucul teks yang sama persis dengan yang kita inputkan, hal ini dikarenakan kita sudah menetapkan data dua arah yang mengikat antara tampilan (view) dan ruang lingkup (scope) yaitu pada ng-model diberikan value mytext.

Selanjutnya kira akan mencoba membuat huruf menjadi kecil (lowercase) fungsi dasar dari AngularJS, buatlah sebuah div baru dan gunakan kode dibawah ini :
```
<div>
  Masukkan kata dengan huruf besar
  <input type="text" ng-model="mylowercase" >
  \{\{ mylowercase | lowercase \}\}
</div>
```
Setelah itu coba jalankan, masukkan huruf besar kedalam text, dan perhatikan hasilnya. Jika huruf yang muncul kecil semua, maka percobaan anda sukses .

Selanjutnya kita coba kebalikannya, menajadikan huruf menjadi besar (UPPERCASE), buat sebuah div baru dan gunakan kode dibawah ini :
```
<div>
  Masukkan kata dengan huruf kecil
  <input type="text" ng-model="myuppercase" >
  \{\{ myuppercase | uppercase \}\}
</div>
```
Lalu jalankan aplikasinya, masukkan huruf kecil kedalam text, jika huruf yang tampil adalah huruf besar semua maka percobaan anda sukses

Ada banyak lagi API yang dapat digunakan diadalam AngularJS, agar lebih jelas bisa langsung ke TKP

Agar lebih mudah dalam belajar AngularJS dan Codeigniter dengan template AdminLTE 2 , saya telah mengupload kedalam github.com .
Untuk setiap tutorial AngularJS akan ditambahkan kedalam git tersebut, sehingga dapat mempermudah para penggemar untuk belajar Codeigniter 3 dengan AngularJS.

Semoga bermanfaat

