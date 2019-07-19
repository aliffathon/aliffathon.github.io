# Belajar Octopress #
----

## Work Flow ##
1. Buka Text Editor
2. Edit source code
3. jalankan di local dan test
4. simpan di version control (commit) jika ok
5. kembali ke langkah 2
6. sharing dengan push ke pusan version control

## Proses migrasi dari wordpress ##
1. setup octopress
2. customize theme
3. unduh artikel lama di wordpress; [exitwp.py](https://github.com/thomasf/exitwp/)
4. bersihkan tag tidak kompatibel, seperti tabel, gist dan image
5. pindahkan artikel ke octopress
6. generate dan deploy

## 1. Setup Octopress ##

- Langkah :
  1. Install Ruby dengan RVM
  2. Install Jekyll
  3. Clone repository octopress
  4. konfigurasi octopress

- Informasi umum :
  ```
  ruby _config.yml
  url: http://endy.artivisi.com/blog
  title: Living life and make it better
  subtitle: life ,learn, contribute
  author: endy muhardin
  ```

- Permalink
  ```
  ruby _config.yml
  permalink: /:category/:title/
  ```

- Pagination
  ```
  ruby _config.yml
  paginate: 3 recent_posts:10
  ```

- Mengolah Artikel Lama
  menggunakan exitwp: - export artikel lama dengan format XML; - exitwp.py konvert ke format MARKDOWN

- Memproses tag image
  Berikut perintah untuk memperbaiki tag image yang tadinya seperti ini `!\[Synergy Screenshot](/images/uploads/2006/05/synergy.gif)` menjadi seperti ini `![Synergy Screenshot ](/uploads/2006/05/synergy.gif)`, sbb :
  Mereplace tag image
  `sh find . -name "*.markdown" -print | xargs sed -i "s|\[!\[\(.*\)\](\(.*\))\](\(.*\))|{\% img \2 \1\ %}|g"`
  Membersihkan tag caption
  `sh find . -name "*.markdown" -print | xargs sed -i "s|\[caption.*\]\(.*\)\[/caption\]|\1|g"`
  Secara default, exitwp akan menghasilkan tag image dengan URL lengkap, misalnya `http://endy.artivisi.com/blog/wp-content|/images/uploads/2006/05/synergy.gif` dan masih mengarah ke Wordpress. Saya ingin mengubah ini menjadi URL relatif, yaitu `/images/uploads/2006/05/synergy.gif`
  Berikut perintahnya :
  `sh find . -name "*.markdown" -print | xargs sed -i "s|http://endy.artivisi.com/blog/wp-content|/images|g"`

- Memproses tag gist
  `sh find . -name "*.markdown" -print | xargs sed -i "s|\[gist id=\(.*\) file=\(.*\)\]|{\% gist \1 \2 \%}|g" find . -name "*.markdown" -print | xargs sed -i "s| bump=.||g"`

- Facebook Comment
  bug pada `post.html` dan `page.html`
  ```
  {\% if site.facebook_appid and page.comments == true \%} 
  ```

- Comments
  ```
  {\% include post/facebook_comments.html \%}
  ```
