---
layout: post
title: "Linux :: Menjalankan Perintah SUDO tanpa Password"
permalink: linux/sudo-tanpa-password/
date: 2017-11-22 14:12:25
author: alif
categories: linux
tags: linux
---

pada terminal sebagai root/jalankan dengan menggunakan sudo :

```
# visudo
$ sudo visudo
```

Saat pertama kali, akan ditanya akan menggunakan text editor apa : beberapa pilihannya antara lain vim, nano, pico ...

Konten visudo kurang lebih nya seperti ini :

```
# This file MUST be edited with the 'visudo' command as root.
#
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
#
# See the man page for details on how to write a sudoers file.
#
Defaults        env_reset
Defaults        mail_badpass
Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# Host alias specification

# User alias specification

# Cmnd alias specification

# User privilege specification
root    ALL=(ALL:ALL) ALL
nicholsonjf    ALL=NOPASSWD: ALL

# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL

# See sudoers(5) for more information on "#include" directives:

#includedir /etc/sudoers.d
```

berikut adalah contoh untuk mengijinkan user `alif` melakukan sudo tanpa password pada beberapa perintah dan juga pada semua perintah.
tambahkan pada baris terakhir (hanya saran)

sudo tanpa password pada beberapa perintah :

```
alif	ALL=NOPASSWD: /bin/mount, /bin/umount, /usr/bin/blkid
alif	ALL=(ALL) NOPASSWD: /bin/mount, /bin/umount
```

sudo tanpa password untuk semua perintah :

```
alif	ALL=(ALL:ALL) NOPASSWD:ALL
```

ijinkan semua user pada group ngademin menjalankan sudo tanpa password :

```
%ngademin	ALL=(ALL) NOPASSWD:ALL
```



[sumber](https://askubuntu.com/questions/334318/sudoers-file-enable-nopasswd-for-user-all-commands)