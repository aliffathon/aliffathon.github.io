---
layout:     post
title:      Perkenalan
date:       2022-02-10 11:45 +0800
chapter:    notes
urutan:     1
permalink:  /MyNotes/perkenalan/
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

## Docker Install via SNAP (Linux Mint)

### Linux Mint: Enable Snap on APT

```
sudo rm /etc/apt/preferences.d/snap.conf
sudo apt update && sudo apt install snapd
```

### install docker via snap

```
sudo snap info docker
sudo snap install docker
sudo snap list
```

add my current user to docker group

```
sudo addgroup --system docker
sudo adduser $USER docker #or sudo usermod -a -G docker $USER
# newgrp docker # change default $USER group to docker
sudo snap disable docker
sudo snap enable docker
```

[docker permission denied](https://askubuntu.com/questions/941816/permission-denied-when-running-docker-after-installing-it-as-a-snap)


## ThunderBird delete default SMTP outgoing server

ketika menambahkan akun email pada thunder bird, akan ada 1 akun outgoing yg tidak bisa dihapus, karena merupakan default outgoing account.

solusinya, dengan membuat profile baru dan menjadikannya default, kemudian menghapus profile lama tadi.

Preference -> Account Settings -> Delete Account (IMAP/POP)

Help -> More Troubleshooting Information -> Application Basics: Profiles (about:profiles) -> Create New Profile (Set Default Profile). Remove Old Profile

[solved-remove default outgoing smtp-thunderbird](https://support.mozilla.org/en-US/questions/1286050)

## Alpine Linux - Install on UEFI System

- create GPT Boot partition

```
apk add parted

parted --script /dev/sda mklabel gpt
parted --script --align=optimal /dev/sda mkpart ESP fat32 1MiB 100%
parted --script /dev/sda set 1 boot on
```

- create Fat32 filesystem

```
mkfs.vfat -n ALPINE /dev/sda1
```

- copy iso image to filesystem

```
mount -t vfat /dev/sda1 /mnt
cd /mnt
uniso < /path/to/alpine-3.11.2-x86_64.iso
```

[install alpine linux on uefi system with secure boot enabled](https://wiki.alpinelinux.org/wiki/Create_UEFI_secureboot_USB)

## DualBoot: Windows 10 + Linux Mint 20.3 XFCE (UEFI)

### partition reordering after windows booting

before install linux mint:

[nvme0n1p1-esp]()
[nvme0n1p2-windows 100mb]()
[nvme0n1p3-windows recovery]()
[nvme0n1p4-windows system c:]()
[nvme0n1p?-shrinked from c: as free space]()
[nvme0n1p5-windows data d:]()

i create linux partition on free space & detected on installation as `nvme0n1p6`
after install im successfully boot to linux mint.
but after i reboot to windows, bad things happen.
i cannt boot to linux mint, end up with `grub>` prompt.

here's what happen:
after booting to windows, it reordering the partition table, as my linux root / will be `nvme0n1p5` not `nvme0n1p6` anymore.
that cause problem to my linux mint installation

how i solve it?
on `grub>` prompt, i try to normal boot to linux with:

```
grub> ls
(hd0,gpt1) (hd0,gpt2) (hd0,gpt3) (hd0,gpt4) (hd0,gpt5) (hd0,gpt6)

# find my root fs
grub> set root=(hd0,gpt5)
grub> ls /
# content of my root fs
grub> set prefix=(hd0,gpt5)/boot/efi
grub> insmod normal
grub> normal
```

[solved: dualboot windows 10 + linuxmint , grub rescue](https://askubuntu.com/questions/1256897/grub-problem-on-dual-boot-uefi-installation-boot-on-grub-console-boot-repair)

then, reinstall grub

```
sudo apt update
sudo apt install --reinstall grub-efi
sudo efibootmgr
# it show OS in my pc & current priority to boot 1st
```

else, boot to installation usb/cd

```
sudo su
mount /dev/nvme0n1p5 /mnt
mount /dev/nvme0n1p1 /mnt/boot/efi
mount --bind /dev /mnt/dev
mount --bind /sys /mnt/sys
mount --bind /proc /mnt/proc
mount --bind /run /mnt/run
chroot /mnt
mv /etc/kernel/postrm.d/zz-update-grub /etc/kernel/zz-update-grub.bad
apt purge grub grub-pc grub-common grub-efi
mv /boot/grub /boot/grub_backup
mkdir /boot/grub
apt install grub grub-pc grub-common grub-efi
grub-install /dev/nvme0n1p5
udpate-grub
```

# (OLD) Python3 on Python2 default with PyENV

Installing Virtualenv (Pyenv) with Python 3.5 on Ubuntu
Linux already comes with python 2.7 installed, and in this tutorial we will update it to version 3.5.0, it is easy you just need to follow this steps:

Check python version on Terminal ( Ctrl + Alt + T open terminal)
`python -V`

Installing the pyenv
```
curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
```
Install dependencies before pyenv
```
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev git
```
Add to ~/.bashrc at the end of file
```
export PATH="~/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```
Test with the command(you may need to restart terminal):
```
pyenv versions
* 3.5.0 (set by /home/{user}/.pyenv/version)
```

Install python on pyenv
`pyenv install 3.5.0`
Set Python 3.5 as global pyenv
`pyenv global 3.5.0`
Check if version 3.5.0 is selected with the command
`pyenv versions`
Test the python version with:
`python -V`
Congratulations you have Python 3.5.0 configured on your machine!

[install python3 on python2 default system](https://mrdjangoblog.wordpress.com/2016/08/18/installing-pyenv-python-3-5/)

## Windows 10 / 11 Reset Password dg DLC Boot

1. boot vpc menggunakan dlc boot
2. pilih `other tools` 
3. pilih `active password changer pro 6.0`
4. klik `enter` untuk melanjutkan
5. pilih `1` untuk memilih partisi system windows
6. pilih `1` untuk memilih disk c
7. tunggu proses pencarian file selesai. klik `enter`
8. pilih user yg ingin dihapus passwordnya, misal `1` (administrators)
9. ketik `Y` utk mereset password, ceklis `clear this user password`

[https://www.senimantkj.com/2019/07/cara-mereset-password-windows-dengan.html?m=1](https://www.senimantkj.com/2019/07/cara-mereset-password-windows-dengan.html?m=1)

## Ubuntu / Linux Mint : X11VNC

[https://www.makeuseof.com/install-ubuntu-vnc-server-linux/](https://www.makeuseof.com/install-ubuntu-vnc-server-linux/)

- setup lightdm as default login screen

```
sudo apt update           # update repository
sudo apt install lightdm  # install display manager
sudo reboot
```

- install x11vnc server

```
sudo apt install x11vnc
sudo vim /lib/systemd/system/x11vnc.service
```

```
[Unit]
Description=x11vnc service
After=dispaly-manager.service network.target syslog.target

[Service]
Type=simple
ExecStart=/usr/bin/x11vnc -forever -display :0 -auth guess -passwd SomeRandomPassword
ExecStop=/usr/bin/killall x11vnc
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

- Reload Daemon Service

```
sudo systemctl daemon-reload
sudo systemctl enable x11vnc.service
sudo systemctl start x11vnc.service
sudo systemctl status x11vnc.service
```

- Enable Port in Firewall

```
sudo ufw allow 5900/tcp
```

## OpenSSL Synology-nas-02

```
root@SUNEO-01:/var/packages/Docker/etc/cert#  openssl genrsa 4096 > ca-key.pem
Generating RSA private key, 4096 bit long modulus
....................................................................................................++++
...++++
e is 65537 (0x10001)
root@SUNEO-01:/var/packages/Docker/etc/cert#  ls
ca-key.pem
root@SUNEO-01:/var/packages/Docker/etc/cert#  ls -la
total 12
drwxr-xr-x 2 root root 4096 Mar  1 13:55 .
drwxr-xr-x 3 root root 4096 Mar  1 13:34 ..
-rw-r--r-- 1 root root 3243 Mar  1 13:55 ca-key.pem
root@SUNEO-01:/var/packages/Docker/etc/cert#  openssl req -new -x509 -nodes -days 3650 -key ca-key.pem -out ca-cert.pem
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [TW]:ID
State or Province Name (full name) [Taiwan]:Jawa Barat
Locality Name (eg, city) [Taipei]:Purwakarta
Organization Name (eg, company) [Synology Inc.]:PT Kinenta Indonesia
Organizational Unit Name (eg, section) []:IT-DEPT
Common Name (e.g. server FQDN or YOUR name) []:synology-nas-02
Email Address [product@synology.com]:itdept@banshu-ind.com
root@SUNEO-01:/var/packages/Docker/etc/cert#  openssl req -newkey rsa:4096 -nodes -days 3650 -keyout server-key.pem -out server-req.pem 
Generating a RSA private key
............................................................................................................................................................................................++++
....................++++
writing new private key to 'server-key.pem'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [TW]:ID
State or Province Name (full name) [Taiwan]:Jawa Barat
Locality Name (eg, city) [Taipei]:Purwakarta
Organization Name (eg, company) [Synology Inc.]:PT Kinenta Indonesia
Organizational Unit Name (eg, section) []:IT-DEPT
Common Name (e.g. server FQDN or YOUR name) []:synology-nas-02
Email Address [product@synology.com]:itdept@banshu-ind.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
root@SUNEO-01:/var/packages/Docker/etc/cert#  openssl x509 -req -days 3650 -set_serial 01 -in server-req.pem -out server-cert.pem -CA ca-cert.pem -CAkey ca-key.pem 
Signature ok
subject=/C=ID/ST=Jawa Barat/L=Purwakarta/O=PT Kinenta Indonesia/OU=IT-DEPT/CN=synology-nas-02/emailAddress=itdept@banshu-ind.com
Getting CA Private Key
root@SUNEO-01:/var/packages/Docker/etc/cert#  ls
ca-cert.pem  ca-key.pem  server-cert.pem  server-key.pem  server-req.pem
root@SUNEO-01:/var/packages/Docker/etc/cert#  ls -la
total 28
drwxr-xr-x 2 root root 4096 Mar  1 13:59 .
drwxr-xr-x 3 root root 4096 Mar  1 13:34 ..
-rw-r--r-- 1 root root 2191 Mar  1 13:56 ca-cert.pem
-rw-r--r-- 1 root root 3243 Mar  1 13:55 ca-key.pem
-rw-r--r-- 1 root root 2061 Mar  1 13:59 server-cert.pem
-rw-r--r-- 1 root root 3272 Mar  1 13:58 server-key.pem
-rw-r--r-- 1 root root 1785 Mar  1 13:58 server-req.pem
root@SUNEO-01:/var/packages/Docker/etc/cert# 
```

## important notes

- [grafana cheatsheet](https://blog.ruanbekker.com/cheatsheets/grafana/)
- [prometheus cheatsheet](https://promlabs.com/promql-cheat-sheet/)
- [prometheus exporter - web config.yml - ssl](https://github.com/prometheus/exporter-toolkit/blob/master/docs/web-configuration.md)
- [prometheus - snmp exporter - pfSense](https://brendonmatheson.com/2021/02/07/step-by-step-guide-to-connecting-prometheus-to-pfsense-via-snmp.html)
- [windows 10 - nginx php mysql - binary zip manually - non xampp](https://codefaq.org/server/how-to-install-nginx-php-mysql-on-windows-10/)
- [nodejs expressjs mongodb - restful api](https://mfikri.com/artikel/restful-api-express-mongodb)
- [restful api - codeigniter4 - json web token](https://www.twilio.com/blog/create-secured-restful-api-codeigniter-php)
- [amlogic x96 air s905x3 4gb - manjaro armlinux](https://sepatufans.wordpress.com/2021/02/14/manjaro-arm-xfce-linux-pada-android-tv-box-x96air-x96max-amlogic-s905x3/)
- [code-server: systemd, docker, nginx reverse proxy](https://chanwkim01.medium.com/how-to-set-up-code-server-daemon-on-ubuntu-root-access-docker-systemd-nginx-reverse-proxy-and-a72fa80e02e9)
- [excel: spreadsheet vlookup hlookup](https://umardanny.com/penjelasan-mengenai-fungsi-vlookup-dan-hlookup-disertai-gambar/)
- [openvpn: port-share 443 with web server https](https://www.vpntutorials.com/tutorials/openvpn-sharing-a-port-with-a-webserver-on-port-80-443/)
- [docker: web-based filebrowser](https://github.com/filebrowser/filebrowser)
- [docker: linuxserver/docker-code-server, originally github/cdr/code-server](https://github.com/linuxserver/docker-code-server)
- [docker nginx proxy manager initial setup, letsencrypt * ssl, 502 error](https://www.thesmarthomebook.com/2021/08/25/nginx-proxy-manager-setup-and-a-fix-for-your-502-gateway-errors/)
- [docker: github nginx proxy manager](https://github.com/NginxProxyManager/nginx-proxy-manager)
- [github vscode on server (browser) coder/code-server](https://github.com/coder/code-server/)
- [panutan: ansible custom dynamic inventories](https://www.jeffgeerling.com/blog/creating-custom-dynamic-inventories-ansible)
- [rizkimufrizal: codeigniter restful API](https://rizkimufrizal.github.io/belajar-membuat-rest-api-dengan-codeigniter/)
- [santrikoding: codeigniter restful API + vuejs](https://santrikoding.com/restful-api-codeigniter-4)

## other notes

- [proxmox: network configuration](https://pve.proxmox.com/wiki/Network_Configuration)
- [github den-it ntmap: network topology visualize, netbox](https://github.com/den-it/ntmap)
- [windows 10 + cups over network](https://techblog.paalijarvi.fi/2020/05/25/making-windows-10-to-print-to-a-cups-printer-over-the-network/)
- [medium netshoot](https://medium.com/netshoot)
- [i putu hariyadi https://iputuhariyadi.net/](https://github.com/iputuhariyadi/codeigniter-mikrotik-api)
- [lukmanlab ansible mikrotik](https://www.lukmanlab.com/tutorial-ansible-routeros-mikrotik/)
- [ansible routeros module community collection mikrotik](https://github.com/ansible-collections/community.routeros)
- [rancher k3s docker https://github.com/rancher/install-docker](https://rancher.com/docs/k3s/latest/en/advanced/)
- [github rancher](https://github.com/rancher/rancher)
- [ubuntu kubernetes k3s](https://computingforgeeks.com/install-kubernetes-on-ubuntu-using-k3s/)
- [virsh virt-manager via ssh](https://www.google.com/amp/s/blog.desdelinux.net/en/virt-manager-virsh-remote-administration-via-ssh-SME-networks/amp/)
- [debian: KVM install](https://www.server-world.info/en/note?os=Debian_10&p=kvm&f=1)
- [mikrotik: LB ECMP](https://citraweb.com/artikel_lihat.php?id=76)
- [docker: linuxserver/heimdall github](https://github.com/linuxserver/heimdall)
- [OTP, mikrotik, basic firewall](https://rickfreyconsulting.com/rfc-mikrotik-firewall-6-1-for-ipv4-free-version/)
- [OTP, mikrotik, firewall](https://wiki.mikrotik.com/wiki/Basic_universal_firewall_script)
- [OTP, ansible dasar](https://www.google.com/amp/s/hosteko.com/blog/cara-menulis-membuat-dan-menjalankan-ansible-playbooks/amp)
- [mikrotik: l2tp+ipsec](https://citraweb.com/artikel_lihat.php?id=152)
- [mikrotik: openvpn site-to-site](https://citraweb.com/artikel_lihat.php?id=145)
- [mikrotik: openvpn + mobile](https://citraweb.com/artikel_lihat.php?id=354)
- [obsidian.md](https://obsidian.md/)
- [proxmox ve: passthrough physical disk to VM](https://pve.proxmox.com/wiki/Passthrough_Physical_Disk_to_Virtual_Machine_(VM))
- [cctv dvr nvr hikvision](https://www.tembolok.id/tutorial-cara-akses-dan-setting-dvr-cctv-secara-lokal-dan-remote/)
- [hugo static pages: theme ezhil](https://github.com/vividvilla/ezhil)
- [docker: github pages/jekyll livereload support](https://svrooij.io/2020/12/31/github-pages-live-reload/)
- [postgresql: pgadmin create role](https://chartio.com/learn/postgresql/create-a-user-with-pgadmin/)
- [docker: node-red + influxdb + grafana](https://qbee.io/docs/docker-nodered-influx-grafana.html)
- [synology nas + docker: install pihole](https://mariushosting.com/how-to-install-pi-hole-on-your-synology-nas/)
- [synology nas + docker: install rancher](https://mariushosting.com/how-to-install-rancher-on-your-synology-nas/)
- [heimdall dashboard on ubuntu 20.04](https://www.google.com/amp/s/varhowto.com/install-heimdall-dashboard-ubuntu-20-04/%3famp)
- [heimdall dashboard on ubuntu 20.04. with docker](https://varhowto.com/install-heimdall-dashboard-docker-ubuntu-20-04/?amp)
- [openvpn: behind apache reverse proxy: apache tcp mode/tcp connect proxy](https://openvpn-users.narkive.com/f2Qchar4/openvpn-trough-apache-reverse-proxy)
- [docker network macvlan & ipvlan](https://docs.docker.com/network/ipvlan/)
- [synology nas - docker - macvlan upstart script](https://community.synology.com/enu/forum/1/post/133969?reply=460399)
- [synology nas - arm node js binary](https://www.ibm.com/docs/en/z-chatops/1.1.0?topic=software-installing-nodejs)
- [nodejs download site](https://nodejs.org/en/download/)
- [mikhmonv3 - lib routeros_api php](https://github.com/laksa19/mikhmonv3/blob/master/lib/routeros_api.class.php)
- [prometheus - windows exporter](https://github.com/prometheus-community/windows_exporter)
- [prometheus - apache exporter](https://computingforgeeks.com/how-to-monitor-apache-web-server-with-prometheus-and-grafana-in-5-minutes/)
- [docker static image binary](https://download.docker.com/linux/static/stable/x86_64/)
- [influxdb - flux query](https://medium.com/schkn/sql-is-dead-hail-to-flux-8e8498756049)
- [tsdb time-series database](https://medium.com/@febriandwiputra/mengenal-tsdb-time-series-database-2ec7488efc36)
- [gitlab runner self hosted docker](https://docs.gitlab.com/runner/register/index.html#docker)
- [gitlab runner docker](https://docs.gitlab.com/runner/install/docker.html)
- [nvr dvr hikvision online cctv](https://www.tembolok.id/tutorial-cara-akses-dan-setting-dvr-cctv-secara-lokal-dan-remote/)
- [mikrotik forward smtp port 587](https://ptipd.iainambon.ac.id/tips/view/setting-mail-server-mikrotik)
- [php phpmailer send email gmail](https://netcorecloud.com/tutorials/send-an-email-via-gmail-smtp-server-using-php/)
- [balenaOS - production ready os for docker](https://www.balena.io/os/)
- [balena engine - docker engine alternative](https://www.balena.io/blog/announcing-balena-a-moby-based-container-engine-for-iot/)
- [balena engine - github release download](https://github.com/balena-os/balena-engine/releases/tag/v18.9.13)
- [balena engine - dockerfile](https://www.balena.io/docs/learn/develop/dockerfile/)
- [netbox community github](https://github.com/netbox-community/netbox)
- [cloudflare tunnel router kubernetes](https://www.marcolancini.it/2021/blog-kubernetes-lab-cloudflare-tunnel/)
- [cloudflare tunnel access ssh](https://danishshakeel.me/creating-an-ssh-tunnel-using-cloudflare-argo-and-access/)
- [docker portainer connect to docker remote host with ssl](https://lemariva.com/blog/2019/12/portainer-managing-docker-engine-remotely)
- [php codeigniter4 restful api server](https://github.com/chriskacerguis/codeigniter-restserver)
- [virtualbox download url](http://download.virtualbox.org/virtualbox/debian/)
- [virtualbox 5.1 on headless ubuntu server](https://www.howtoforge.com/tutorial/running-virtual-machines-with-virtualbox-5.1-on-a-headless-ubuntu-16.04-lts-server/)
- [virtualbox - remotebox remote virtualbox](https://www.unixmen.com/remotebox-graphical-client-manage-virtualbox-vms-remotely/)
- [virtualbox headless ubuntu - phpVirtualbox](https://ostechnix.com/install-oracle-virtualbox-ubuntu-16-04-headless-server/)
- [cloudinit - cloud config](https://github.com/number5/cloud-init/blob/main/doc/examples/cloud-config.txt)
- [github - php oop project](https://github.com/youns3510/php_oop_crud_project)
- [erwin github web landing page](https://erwinaris.github.io/)
- [docker install](https://docs.docker.com/engine/install/ubuntu/)
- [gitea linux service - systemd supervisor](https://docs.gitea.io/en-us/linux-service/)
- [openstack - horizon dashboard - create vm](https://www.itzgeek.com/how-tos/linux/centos-how-tos/how-to-launch-an-openstack-instance-using-horizon-dashboard.html)
- [ubuntu cloud - from scratch - debootstrap](https://mvallim.github.io/cloud-image-ubuntu-from-scratch/)
- [kata container](https://github.com/yusufalafid/Kata-Container-OSF-Metup)
- [ubuntu openstack - devstack](https://www.routecloud.net/blog/install-openstack-di-ubuntu-14-04-dengan-devstack/)
- [google hiba - host identity based authentication](https://github.com/google/hiba)
- [openstack - ubuntu 16 on virtualbox](https://www.bogotobogo.com/DevOps/OpenStack-Install-On-Ubuntu-16-Server.php)
- [openstack - cli linux](https://computingforgeeks.com/install-and-configure-openstack-client-on-linux/)
- [cloudinit - build linux system](https://timmydouglas.com/2019/12/29/cloud-init.html)
- [minimalcicd - github kubernetes](https://github.com/theJaxon/Minimal-CICD)
- [postgresql - multi master replication](https://hevodata.com/learn/postgresql-multi-master-replication/)
- [php restful api mysql](https://belajaraplikasi.com/membuat-rest-api-dengan-php-dan-mysql/)
- [php mysql oop crud](https://www.nicesnippets.com/blog/php-mysql-oop-crud-example-tutorial)
- [mikrotik - dhcpv6 server](https://wiki.mikrotik.com/wiki/Setting_up_DHCPv6)
- [mikrotik - dhcp server client ipv6](https://citraweb.com/artikel_lihat.php?id=214)
- [monkeytype github](https://github.com/Miodec/monkeytype)
- [digitalent kominfo scholarship](https://digitalent.kominfo.go.id/detail/akademi/152)
- [how to access mysql server remotely](https://linuxize.com/post/mysql-remote-access/)
- [how to access mysql via ssh tunnel](https://linuxize.com/post/mysql-ssh-tunnel/)
- [install ubuntu into external drive](https://www.58bits.com/blog/2020/02/28/how-create-truly-portable-ubuntu-installation-external-usb-hdd-or-ssd)
- [install ubuntu into external drive, support uefi & legacy bios](https://askubuntu.com/questions/1217832/how-to-create-a-full-install-of-ubuntu-20-04-to-usb-device-step-by-step)
- [ubuntu external drive : full disk encryption](https://askubuntu.com/questions/1086309/how-to-make-bios-uefi-flash-drive-with-full-disk-encryption)
- [termux - backup & restore](https://wiki.termux.com/wiki/Backing_up_Termux)
- [wiki coder vscode server](https://coder.com/docs/code-server/latest)
- [ubuntu: ip rule, ip route, multiple gateway per interface addr](https://brainscraps.fandom.com/wiki/Setup_Gateway_Routing_On_Multiple_Network_Interfaces)
- [ubuntu: ip rule simple](https://tldp.org/HOWTO/Adv-Routing-HOWTO/lartc.rpdb.multiple-links.html)
- [ubuntu: ip rute simple 2](https://www.thomas-krenn.com/en/wiki/Two_Default_Gateways_on_One_System)
- [openstack: heat, run docker container](https://hostadvice.com/amp/how-to/how-to-deploy-docker-containers-with-openstack-heat/)
- [escalate: reverse shell netcat nc](https://blog.ropnop.com/upgrading-simple-shells-to-fully-interactive-ttys/)
- [escalate: static binary](https://github.com/andrew-d/static-binaries/)
- [docker pihole adguard](https://smarthomepursuits.com/deploy-adguard-home-docker-in-ubuntu/)
- [webuzo: web hosting panel](https://belajarlinux.id/Install-Webuzo-pada-Ubuntu20-LTS/)
- [openstack kolla: hyper-v & docker containers](https://cloudbase.it/openstack-kolla-hyper-v/)
- [openstack nova instances: docker containers](http://onecloudclass.com/lab-5-deploy-docker-container-with-openstack/)
- [kurniawan jogja h4ck3r](https://github.com/kurniawandata/xcodephpshell)
- [idk fb](https://m.facebook.com/story.php?story_fbid=1529237387413939&id=100009830762359&m_entstream_source=feed_mobile)
- [android warpinator, linux mint file sharing tool (https://github.com/linuxmint/warpinator)](https://github.com/slowscript/warpinator-android)
- [ipv6 series](https://www.idipv6.com/2017/10/18/panduan-cepat-belajar-dasar-ipv6/)[1](https://devnull.web.id/networking/subnetting-ipv6-mudah.html)[2](http://zenhadi.lecturer.pens.ac.id/kuliah/Jarkom2/)
- [self signed certificate ssl ubuntu 18](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-18-04)
- [UT - Kalender Akademik](https://www.ut.ac.id/kalender-akademik/sarjana-diploma)[pendaftaran](https://sia.ut.ac.id/proses_pendaftaran)[alamat](https://www.ut.ac.id/upbjj-ut/alamat)[sistem registrasi](https://www.ut.ac.id/sistem-registrasi)[mahasiswa page](https://mahasiswa.ut.ac.id/)[umum](https://www.ut.ac.id/)
- [php session, simple](https://www.phptutorial.net/php-tutorial/php-session/)[jwt-based auth](https://hackernoon.com/using-session-cookies-vs-jwt-for-authentication-sd2v3vci)[jwt signup signin](https://www.techiediaries.com/php-jwt-authentication-tutorial/)[php jwt auth](https://www.sitepoint.com/php-authorization-jwt-json-web-tokens/)[php jwt auth, oop composer](https://dev.to/itsfaqih/membuat-otentikasi-jwt-dengan-php-native-2a2g)
- [php crud, native prosedural](https://codeshack.io/crud-application-php-pdo-mysql/)[DB oop class](https://codeshack.io/super-fast-php-mysql-database-class/)
- [buananetpbun github](https://github.com/buananetpbun/buananetpbun.github.io)
- [jekyll, static content generator, google ads analytic](https://flipdazed.github.io/blog/website/google-adsense-and-google-analytics)
- [tutorial gratis, achmatim.net](https://achmatim.net/)[require, require_once, include, include_once](https://achmatim.net/2013/10/20/php-perbedaan-fungsi-include-require-include_once-dan-require_once/)
- [web hosting login, dapurhosting](https://my.dapurhosting.com/clientarea.php)
- [nginx: socket vs tcp/ip stack + tweaking](https://rtcamp.com/tutorials/php/fpm-sysctl-tweaking/)
- [postgresql: change default user pass](https://chartio.com/resources/tutorials/how-to-set-the-default-user-password-in-postgresql/)
- [disable form autocomple & autofill](https://www.w3docs.com/snippets/html/how-to-disable-browser-autocomplete-and-autofill-on-html-form-and-input-fields.html)
- [open API lists, no auth](https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/)
- [docker alpine, haproxy image container](https://github.com/haproxytech/haproxy-docker-alpine)
- [reveal.js: html presentation w js](https://revealjs.com/#/30)
- [docker: filebrowser/filebrowser, web-based file browser](https://github.com/filebrowser/filebrowser)

```
/usr/local/bin/dockerd -H fd:// -H tcp://0.0.0.0:2375 --containerd=/var/run/containerd/containerd.sock --config-file /var/docker/etc/docker.json
 /usr/local/bin/dockerd --config-file=/var/docker/etc/docker.json --pidfile=/var/run/docker/docker.pid -H unix:///var/run/docker/docker.sock -H tcp://0.0.0.0:2375

 /usr/local/bin/dockerd --config-file=/var/docker/etc/docker.json --bridge=loop --metrics-addr=0.0.0.0:9121
 /usr/local/bin/snmp_exporter --config.file=/usr/local/bin/snmp.yml --web.listen-address=":9117"
```

```
# powershell, enable net-framework-2.0&3.5 on windows 10/11
powershell.exe
dism.exe /online /enable-feature /featurename:NetFX3 /all /source:d:\sources\sxs /limitaccess

# [create local account windows 10/11](https://www.google.com/amp/s/pureinfotech.com/create-local-account-windows-10/amp/)
cmd.exe / powershell.exe as administrator
net user USERNAME PASSWORD /ADD
net localgroup GROUPNAME USERNAME /ADD

net user IT-DEPT pass /add
net localgroup administrators it-dept /add
net localgroup administrators user1 /delete
net localgroup users user1 /add
net user Administrator /active:yes
net user Administrator /active:no
net user user1 /delete

New-LocalUser "username" -Password "password" -FullName "IT-DEPT" -Description "Administrator IT"
Add-LocalGroup -Group "Administrators" -Member "it-dept"
Remove-LocalGroup -Group "Administrators" -Member "user1"
Remove-LocalUser -Name "user1"

```

## AMLogic S905x3 X96 Max Plus

- [https://androidmtk.com/download-amlogic-usb-burning-tool](https://androidmtk.com/download-amlogic-usb-burning-tool)
- [https://xdafirmware.com/x96-max-plus](https://xdafirmware.com/x96-max-plus)
- [https://www.mediafire.com/file/c2ipwie449m6jig/X96Max_Plus2_20200901-1005.img/file](https://www.mediafire.com/file/c2ipwie449m6jig/X96Max_Plus2_20200901-1005.img/file)
- [https://www.getdroidtips.com/download-amlogic-burn-card-maker/](https://www.getdroidtips.com/download-amlogic-burn-card-maker/)
- [https://ugoos.com/firmware-upgrade-guide-for-amlogic-devices](https://ugoos.com/firmware-upgrade-guide-for-amlogic-devices)
- [https://forum.armbian.com/topic/12162-single-armbian-image-for-rk-aml-aw-aarch64-armv8/](https://forum.armbian.com/topic/12162-single-armbian-image-for-rk-aml-aw-aarch64-armv8/)
- [https://disk.yandex.ru/d/_rQgn_FosYuW0g/20.10/20201014](https://disk.yandex.ru/d/_rQgn_FosYuW0g/20.10/20201014)
- [https://users.armbian.com/balbes150/](https://users.armbian.com/balbes150/)
- [https://disk.yandex.ru/d/PIGjwjZ4m4HKqg](https://disk.yandex.ru/d/PIGjwjZ4m4HKqg)
- [https://www.mediafire.com/file/nv6e0x3vt6p6qkr/Pulpstone_Android_v3.1_rev1_B860H.7z/file](https://www.mediafire.com/file/nv6e0x3vt6p6qkr/Pulpstone_Android_v3.1_rev1_B860H.7z/file)
- [https://docs.google.com/uc?export=download&id=1dPN3MIdEu4aCAc88-17IgoUocQ5X80Ci](https://docs.google.com/uc?export=download&id=1dPN3MIdEu4aCAc88-17IgoUocQ5X80Ci)
- [https://www.mediafire.com/file/2zcft21kfelqqmd/Firmware_Xbox_onex_games_V_2.1.rar/file](https://www.mediafire.com/file/2zcft21kfelqqmd/Firmware_Xbox_onex_games_V_2.1.rar/file)
- [https://mega.nz/file/n51ggRpK#58tzApx9yOszsh2GIu0ewvmyIQGH6qlBAuvLkWQPN4w](https://mega.nz/file/n51ggRpK#58tzApx9yOszsh2GIu0ewvmyIQGH6qlBAuvLkWQPN4w)
- [https://disk.yandex.com/d/SLWV8RnEV0Hzkg?fbclid=IwAR1MixfPv2Gyi71tr4Ids-JNKFzVWnWLzPrQ5P88QTXEK8Ck1aAjez1SFwg](https://disk.yandex.com/d/SLWV8RnEV0Hzkg?fbclid=IwAR1MixfPv2Gyi71tr4Ids-JNKFzVWnWLzPrQ5P88QTXEK8Ck1aAjez1SFwg)
 
- [https://www.tecmint.com/create-network-bridge-in-ubuntu/#nmcli](https://www.tecmint.com/create-network-bridge-in-ubuntu/#nmcli)
- [https://docs.docker.com/config/daemon/](https://docs.docker.com/config/daemon/)

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
- [netlify victor-hugo -static-site-generator-](https://www.netlify.com/blog/2016/09/21/a-step-by-step-guide-victor-hugo-on-netlify/)
- [netlify hugo github deploy](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)
- [serverless hosting function as a service](https://www.mskog.com/posts/self-hosting-serverless-with-openfaas/)
- [serverless framework opensource](https://www.cncf.io/blog/2020/04/13/serverless-open-source-frameworks-openfaas-knative-more/)
- [kubeless.io -archived- vmware](https://github.com/vmware-archive/kubeless)
- [selfhosted faas](https://medium.com/@horatiujeflea/self-hosted-faas-9ae1d76f23d3)
- [openfaas github repo](https://github.com/openfaas/faas)
- [prometheus tutorial - external snmp server](https://sbcode.net/prometheus/snmp-second/)
- [prometheus tutorial - snmp cisco](https://sbcode.net/prometheus/snmp-cisco-switch/)
- [prometheus tutorial - snmp exporter config generator](https://sbcode.net/prometheus/snmp-exporter-generator/)
- [prometheus snmp exporter github repo](https://github.com/prometheus/snmp_exporter)
- [openfaas vs faasd, kubernetes-cluster vs single-host, github repo](https://github.com/openfaas/faasd)
- [openfaasd](https://openfaas.gumroad.com/l/serverless-for-everyone-else)
- [faasd - lightweight serverless on raspberry pi](https://blog.alexellis.io/faasd-for-lightweight-serverless/)
- [fly.io cheap vps](https://fly.io/docs/about/pricing/)
- [inlets dev to prod tunnel via vps](https://inlets.dev/blog/2021/08/08/private-tunnel.html)
- [openfaas - cli as function](https://blog.alexellis.io/cli-functions-with-openfaas/)
- [faasd install with multipass](https://github.com/openfaas/faasd/blob/master/docs/MULTIPASS.md)
- [faasd deploy with cloud-init](https://blog.alexellis.io/deploy-serverless-faasd-with-cloud-init/)
- [build containers without docker](https://blog.alexellis.io/building-containers-without-docker/)
- [k3c rancher - single binnary containerd, docker alternative, github repo](https://github.com/rancher/k3c)
- [**deploy** self serverless service](https://www.exoscale.com/syslog/self-hosted-serverless/)
- [restful API codeigniter 4](https://mfikri.com/artikel/restful-api-codeigniter4)
- [remote access to docker with docker context via ssh](https://qmacro.org/2021/06/12/remote-access-to-docker-on-my-synology-nas/)



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

