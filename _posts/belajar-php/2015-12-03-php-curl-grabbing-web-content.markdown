# Grabbing Content Website menggunakan cURL #

(sumber)[http://www.phpindonesia.net/Grabbing-Content-Website-menggunakan-cURL]

## Apa itu Grabbing ##

Menampilkan Output Web Lain di Web Kita

## cURL ##

- Protocol : http, https, ftp, gopher, telnet, dict, file, dan protokol ldap
- Sertificat: HTTPS, HTTP POST, HTTP PUT, FTP upload (hal ini juga bisa dilakukan dengan ekstensi ftp PHP), HTTP bentuk yang didasarkan upload, proxy, cookies, dan user + otentikasi password


- Fungsi Grabbing

```
<?php
function bacaHTML($url){
       // inisialisasi CURL
       $data = curl_init();
       // setting CURL
       curl_setopt($data, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($data, CURLOPT_URL, $url);
       // menjalankan CURL untuk membaca isi file
       $hasil = curl_exec($data);
       curl_close($data);
       return $hasil;
}
?>
```