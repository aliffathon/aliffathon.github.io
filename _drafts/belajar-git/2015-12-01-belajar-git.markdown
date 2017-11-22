# Belajar Git #
----

- Membuat repo baru
```
git init
```
- clone repo
```
git clone /local/path/to/repo
git clone user@host:/path/to/repo
```

- work-flow : "trees" atau alur kerja git dibagi 3
  + working directory : menyimpan berkas aktual(plain file)
  + index : pengolah data
  + head : header dari commit terakhir

- menambahkan file dan komit perubahan ke __HEAD__
```
git add <nama-berkas> | *
git commit -m "pesan untuk komit"
git commit -a
```

- mengirim perubahan ke remote server
```
git push origin master
```

- menambah remote/origin repository
```
git remote add origin <server>
```

- percabangan; mengembangkan fitur secara terpisah; gabungkan kembali diakhir
  + membuat & berpindah ke cabang baru
  ```
  git checkout -b <fitur-x>
  ```
  + beralih ke master
  ```
  git checkout master
  ```
  + menghapus cabang
  ```
  git branch -d <fitur-x>
  ```
  + cabang tertutup; membuka cabang dengan mengirim ke remote;
  ```
  git push origin <cabang>
  ```

- perbaru lokal dan gabung
  + mengambil versi terbaru dari remote
  ```
  git pull
  ```
  + menggabungkan cabang aktif ke cabang lain/master
  ```
  git merge <cabang>
  ```
  + jika terdapat error, lakukan perbaikan secara manual
  ```
  git add <nama-berkas>
  ```
  + melakukan pratinjau sebelum penggabungan
  ```
  git diff <cabang-asal> <cabang-tujuan>
  ```

- menandai/tags
```
git tag 1.0.0 <10c-from-head>
```

- melihat log
  + bentuk paling sederhana
  ```
  git log
  ```
  + melihat log penulis
  ```
  git log --author=<nama-penulis>
  ```
  + melihat log satu baris
  ```
  git log --pretty=oneline
  ```
  + melihat pohon ASCII art seluruh cabang dengan nama dan tags
  ```
  git log --graph --oneline --decorate --all
  ```
  + melihat berkas yang berubah
  ```
  git log --name-status
  ```

- mengembalikan perubahan lokal
```
git checkout -- <nama-berkas>
git fetch origin
git reset --hard origin/master
```

- lain lain
  + git gui bawaan
  ```
  gitk
  ```
  + output colorfull git
  ```
  git config color.ui true
  ```
  + log satu beris per komit
  ```
  git config format.pretty oneline
  ```
  + penambahan interaktif
  ```
  git add -i
  ```
  + menambahkan informasi author
  git config --global user.name "nama-pengguna"
  git config --global user.email "nama@host"