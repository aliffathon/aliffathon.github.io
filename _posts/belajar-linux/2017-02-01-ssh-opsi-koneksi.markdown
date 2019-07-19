---
layout: 	post
title:  	"SSH :: Opsi Koneksi Client"
date:   	2017-02-01 08:39:24 +0000
categories: linux-server
tags:		ssh
permalink:	linux-server/ssh-connection-option/
---

Sering kali kita melakukan koneksi remote melalui protokol ssh ke
beberapa server sekaligus/dalam jumlah yang banyak, hal ini tidak
efisien jika kita masih menggunakan perintah terminal seperti

```
ssh -p 2222 -i /home/fathon/.ssh/id_rsa root@fathon.id_rsa
``` 

untuk satu server, perintah ini bisa dibilang tidak ada masalah,
tapi jika kita berhadapan dengan banyak server ssh, dengan opsi
port misalnya, yang berbeda beda, dan tentu nya user yang berbeda,
maka akan banyak perintah dan parameter yang harus di ingat, selain
password tentunya.

untuk menyiasati ini, disini akan dibahas tentang file ssh config
disisi client, yang terletak di /home/fathon/.ssh/config

```
touch ~/.ssh/config
nano ~/.ssh/config
```

dengan format penulisan konfig kurang lebih seperti ini

```
Host host1
	SSH_OPTION_1 value1
	SSH_OPTION_2 value2
	
Host *host
	LOCAL_OPTION1 value1
	
Host *
	GLOBAL_OPTION1 value1
```

berikut contoh konfigurasi nya

```
Host do-bp
	HostName www.bestprint.id
	Port 2210
	
Host do-root
	HostName www.bestprint.id
	Port 2210
	
Host web-bp
	HostName www.bestprint.web.id
	Port 2203
	
Host web-root
	HostName www.bestprint.web.id
	Port 2203
	
Host *bp
	User bestprint
	
Host *root
	User root
```

Basic Connection Options

```
ssh -p 2217 fathon@fathon.id
ssh -o "User=fathon" -o "Port=2217" -o "HostName=fathon.id" anything
```

Aturan Key-Value-Pair, untuk menyimpan value dari key dapat menggunakan
format

```
Port 4567
Port=4567
Port = 4567
```

- ServerAliveInterval
  Mengecek server dengan mengirim dummy paket untuk memastikan masih
  terkoneksi ke server atau tidak
- LogLevel
  Log di sisi client, mematikan atau menambah detail log to debug,
  QUIET, FATAL, ERROR, INFO, VERBOSE, DEBUG1, DEBUG2, DEBUG3
- StrictHostKeyChecking
  default ask, menyimpan host key yang terkoneksi ke .ssh/known_hosts,
  jika host terkoneksi tidak terdapat pada file known_hosts maka akan
  terjadi error saat koneksi, "no" | "yes"
- UserKnownHostsFile
  lokasi pengyimpanan known_hosts, untuk turnOff arahkan ke /dev/null
- VisualHostKey
  