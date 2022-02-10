---
layout:     post
title:      Perkenalan
date:       2022-02-10 11:45 +0800
chapter:    catatan
urutan:     1
permalink:  /:chapter/:title.html
---


Javascript: Pembahasan Lanjutan

## Raspberry Pi

- [Raspberry PI - Music Player Daemon - Docker](https://hub.docker.com/r/tobi312/rpi-mpd/)
  `docker run --name mpd -p 6600:6600 -p 8000:8000 --device=/dev/snd:/dev/snd --cap-add=sys_nice -v $(pwd)/music:/var/lib/mpd/music:rw -v $(pwd)/playlists:/var/lib/mpd/playlists:rw -v $(pwd)/playlists:/var/lib/mpd/playlists:rw -v $(pwd)/data:/var/lib/mpd/data:rw -d tobi312/rpi-mpd:debian`
  [mpd.conf](https://github.com/Tob1asDocker/rpi-mpd/blob/master/mpd.conf)
  add `-v $(pwd)/mpd.conf:/etc/mpd.conf`
  docker-compose
  ```
  version: '2.4'
  services:
    mpd:
      image: tobi312/rpi-mpd:latest
      #image: tobi312/rpi-mpd:alpine
      #image: tobi312/rpi-mpd:alpine-nocap
      container_name: mpd
      ports:
      - 6600:6600
      - 8000:8000
      volumes:
      - ./music:/var/lib/mpd/music:rw
      - ./playlists:/var/lib/mpd/playlists:rw
      - ./data:/var/lib/mpd/data:rw
      #- ./mpd.conf:/etc/mpd.conf:rw
      devices:
      - "/dev/snd:/dev/snd"
      cap_add:
      - SYS_NICE
      restart: unless-stopped
  ```


## Ubuntu - UEFI - Windows Boot Manager

- [Install Ubuntu alongside Windows 10](https://itectec.com/ubuntu/ubuntu-how-to-install-boot-ubuntu-with-windows-boot-mgr-and-not-grub2/)
  Install with `ubiquity -b` to install ubuntu without bootloader,
  or install bootloader to root '/' partition (e.g /dev/nvme0n1p5)
  do not install bootloader to device (e.g /dev/nvme0n1)
  and, on linux from install media:
  ```
  sudo mount /dev/nvme0n1p1 /mnt
  dd if=/dev/nvme0n1p5 of=/mnt/linux.bin bs=512 count=1
  ```
  then, on windows:
  ```
  bcdedit /create  /d name /application bootsector
  bcdedit /set {****} device partition=c:
  bcdedit /set {****} path \linux.bin
  ```
  note:
  - `name` = nama sistem utk boot, misal 'ubuntu'
  - `****` = identifier new entry bcd store
  - `nvme0n1p1` = drive c windows
  - `nvme0n1p5` = root / partition

  else, ubuntu akan membuat menu entry pada uefi firmware, pada boot menu (F10), pilih untuk 'ubuntu' sebagai boot pertama.

## Linux

### Music Player Daemon - Docker

[vimagick/mpd](https://hub.docker.com/r/vimagick/mpd)
[mpdoid](https://play.google.com/store/apps/details?id=com.namelessdev.mpdroid)
docker-compose.yml

```
version: "3.8"

services:

  mpd:
    image: vimagick/mpd
    ports:
      - "6600:6600"
      - "8800:8800"
    volumes:
      - ./data/config:/root/.config
      - ./data/music:/var/lib/mpd/music
      - ./data/playlists:/var/lib/mpd/playlists
    devices:
      - /dev/snd
    restart: unless-stopped
```

## CodeIgniter

### Laravel Source Code App - WhatsApp Server

- [facebook codeigniter](https://m.facebook.com/groups/codeigniter.id/permalink/10160133706075337/)
- [github laravel](https://github.com/saifulcoder/laravel-whatsapp-server)
- [admin panel crudbooster](https://github.com/crocodic-studio/crudbooster)
- [whatsapp web w websocket](https://github.com/adiwajshing/Baileys)
- [simple restful whatsapp api](https://github.com/ookamiiixd/baileys-api)
- [restful api docs](https://documenter.getpostman.com/view/18988925/UVRHiNne)
- [demo](https://youtu.be/T_xMvLKK4i4)

## not openned

- [testing node menggunakan mocha & chai - buildwithangga](https://buildwithangga.com/tips/testing-node-menggunakan-mocha-dan-chai)
- [deploy drone, docker base ci/cd](https://github.com/auxilincom/deploy-drone/blob/master/local/docker-compose.yml)
- [building ccd pipeline w drone and kubernetes](https://www.magalix.com/blog/building-a-cd-pipeline-with-drone-ci-and-kubernetes)
- [uninstall microsoft windows store app](https://windowsloop.com/uninstall-microsoft-store-apps/) [1](https://lazyadmin.nl/it/uninstall-microsoft-store-and-default-apps/)
- search google: raspberry pi docker gpio
- [control gpio w docker swarm](https://blog.alexellis.io/gpio-on-swarm/amp/)
- [docker, access to raspberry pi 4 gpio](https://discourse.mozilla.org/t/docker-access-to-raspberry-pi4-gpio-pins/58872/18)
- [how to setup influxdb, telegraf and grafana on docker: part 1](https://thenewstack.io/how-to-setup-influxdb-telegraf-and-grafana-on-docker-part-1/)
- [munin-node to monitor nginx apache](https://www.jeffgeerling.com/blog/2017/getting-munin-node-monitor-nginx-and-apache-easy-way)
- [linuxserver: docker plex media server](https://github.com/linuxserver/docker-plex)
- [linuxserver: docker wireguard vpn](https://github.com/linuxserver/docker-wireguard)
- [linuxserver: docker openvpn as](https://hub.docker.com/r/linuxserver/openvpn-as)
- [membangun server openvpn dg docker](https://www.linuxsec.org/2021/02/openvpn-docker.html?m=1)
- [docker local registry WebUI/Frontend w PORTUS](https://dockerlabs.collabnix.com/beginners/portus/)
- [daftar registry docker](https://simply-how.com/free-docker-container-registry)
- [portus home page](http://port.us.org/docs/first-steps.html)
- [github docker container registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [kanboard - trello-like project management - docker](https://docs.kanboard.org/en/latest/admin_guide/docker.html)
- [glitch home page](https://glitch.com/)
- [mikrotik - implementasi proxy-arp](https://citraweb.com/artikel_lihat.php?id=267)
- [mikrotik - mengamankan jaringan dg arp](https://citraweb.com/artikel_lihat.php?id=56)


----

Daftar Isi:

    [Pengenalan](https://bertzzie.com/knowledge/javascript-lanjut/Pengenalan-Dan-Tools.html)
        NodeJS
        Build Tools
        Penguji HTTP Request
    [XMLHttpRequest dan AJAX](https://bertzzie.com/knowledge/javascript-lanjut/XMLHttpRequest-AJAX.html)
        Apa itu AJAX?
        Pembuatan XMLHttpRequest
        Mengirimkan Perintah ke Server
        Menangani Respon Server
        Pengolahan Data JSON
    [WebSocket](https://bertzzie.com/knowledge/javascript-lanjut/WebSocket.html]
        Komponen Server WebSocket
        Persiapan Eksperimen WebSocket
        Membuat Objek WebSocket
        Menanggapi Server WebSocket
        Berbicara dengan Server
        Studi kasus
    [Pemrograman Asinkron](https://bertzzie.com/knowledge/javascript-lanjut/Pemrograman-Asinkron.html)
        Promise
        Pembuatan Objek Promise
        Mengambil Hasil Eksekusi Promise
        Promise Berantai
        Perlombaan Promise
    [Javascript History API](https://bertzzie.com/knowledge/javascript-lanjut/Javascript-History-API.html)
        Penelusuran Sejarah Browser
        Manipulasi Sejarah Browser
        Kegunaan Praktis History API
    [Javascript Routing](https://bertzzie.com/knowledge/javascript-lanjut/Javascript-Routing.html)
        Contoh penggunaan
        Persiapan Awal
        Objek Pendukung
        Objek Router Utama
        Penambahan dan Penghapusan Rute
        Masuk ke Rute Baru
        Navigasi Link Otomatis
        Penutup
    [Javascript Module System](https://bertzzie.com/knowledge/javascript-lanjut/Javascript-Module-System.html)
        Persiapan Module System: Script Loader
        AMD (Asynchronous Module Definition)
        CommonJS
        Perbandingan AMD dan CommonJS
        ES6 Harmony
        Penutup
    [Framework Javascript](https://bertzzie.com/knowledge/javascript-lanjut/Framework-Javascript.html)
        Library
        Widget Toolkit
        Framework
    [React JS (Pengenalan)](https://bertzzie.com/knowledge/javascript-lanjut/ReactJS-Pengenalan.html)
        Hello, React!
        Pembangunan Elemen Antarmuka ReactJS
        Mengambil Data Dari Server
    [React JS (Studi Kasus 1)](https://bertzzie.com/knowledge/javascript-lanjut/ReactJS-Studi-Kasus-1.html)
    [ReactJS (Studi Kasus 2)](https://bertzzie.com/knowledge/javascript-lanjut/ReactJS-Studi-Kasus-2.html)
    [BackboneJS (Pengenalan)](https://bertzzie.com/knowledge/javascript-lanjut/BackboneJS-Pengenalan.html)
    [BackboneJS Routing](https://bertzzie.com/knowledge/javascript-lanjut/BackboneJS-Routing.html)
    [ReactJS dan Backbone Route](https://bertzzie.com/knowledge/javascript-lanjut/ReactJS-Backbone-Route.html)

