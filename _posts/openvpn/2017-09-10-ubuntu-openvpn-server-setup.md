---
layout: post
title: How to Setup OpenVPN Server with MySQL Auth
date: 2017-09-10 08:00 AM
author: fathon
categories: openvpn
tags: server
---

# How To Install OpenVPN Server on Ubuntu Server #
[source](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-openvpn-server-on-ubuntu-16-04)

## 1. Install OpenVPN ##

```
apt-get update
apt-get install openvpn easy-rsa
```

----

## 2. CA Certificate ##

### Membuat Directory CA ###

```
cd /etc/openvpn
make-cadir ovpn-ca
ls -la ovpn-ca
drwx------ 3 root root 4096 Sep 18 09:23 .
drwxr-xr-x 4 root root 4096 Sep 18 09:21 ..
lrwxrwxrwx 1 root root   28 Sep 18 09:21 build-ca -> /usr/share/easy-rsa/build-ca
lrwxrwxrwx 1 root root   28 Sep 18 09:21 build-dh -> /usr/share/easy-rsa/build-dh
lrwxrwxrwx 1 root root   31 Sep 18 09:21 build-inter -> /usr/share/easy-rsa/build-inter
lrwxrwxrwx 1 root root   29 Sep 18 09:21 build-key -> /usr/share/easy-rsa/build-key
lrwxrwxrwx 1 root root   34 Sep 18 09:21 build-key-pass -> /usr/share/easy-rsa/build-key-pass
lrwxrwxrwx 1 root root   36 Sep 18 09:21 build-key-pkcs12 -> /usr/share/easy-rsa/build-key-pkcs12
lrwxrwxrwx 1 root root   36 Sep 18 09:21 build-key-server -> /usr/share/easy-rsa/build-key-server
lrwxrwxrwx 1 root root   29 Sep 18 09:21 build-req -> /usr/share/easy-rsa/build-req
lrwxrwxrwx 1 root root   34 Sep 18 09:21 build-req-pass -> /usr/share/easy-rsa/build-req-pass
lrwxrwxrwx 1 root root   29 Sep 18 09:21 clean-all -> /usr/share/easy-rsa/clean-all
lrwxrwxrwx 1 root root   33 Sep 18 09:21 inherit-inter -> /usr/share/easy-rsa/inherit-inter
lrwxrwxrwx 1 root root   28 Sep 18 09:21 list-crl -> /usr/share/easy-rsa/list-crl
-rw-r--r-- 1 root root 7859 Sep 18 09:21 openssl-0.9.6.cnf
-rw-r--r-- 1 root root 8416 Sep 18 09:21 openssl-0.9.8.cnf
-rw-r--r-- 1 root root 8313 Sep 18 09:21 openssl-1.0.0.cnf
lrwxrwxrwx 1 root root   27 Sep 18 09:21 pkitool -> /usr/share/easy-rsa/pkitool
lrwxrwxrwx 1 root root   31 Sep 18 09:21 revoke-full -> /usr/share/easy-rsa/revoke-full
lrwxrwxrwx 1 root root   28 Sep 18 09:21 sign-req -> /usr/share/easy-rsa/sign-req
-rw-r--r-- 1 root root 2075 Sep 18 09:23 vars
lrwxrwxrwx 1 root root   35 Sep 18 09:21 whichopensslcnf -> /usr/share/easy-rsa/whichopensslcnf

```

### Membuat Variable untuk CA ###

```
cd ovpn-ca
nano vars
```

Sesuaikan nilai dari parameter berikut:

```
export KEY_COUNTRY="ID"
export KEY_PROVINCE="DKIJakarta"
export KEY_CITY="Cengkareng"
export KEY_ORG="Bestprint"
export KEY_EMAIL="ovpn@bestprint.id"
export KEY_OU="IT"
```

untuk server, cari baris `export KEY_NAME=""`

```
export KEY_NAME="bestprintvpn"
```

### Build Certificate Authority ###

```
source vars
./clean-all
./build-ca
```

-----

## 3. Build Server Key ##

```
./build-key-server bestprintvpn
./build-dh
```

Catatan:

sampai pada titik ini, kita sudah selesai membuat certificate ca dan server.crt, tapi kita akan buat standar dalam peletakkan file certificate, dimana semua certificate akan diletakkan di bawah directory `keys` dibawah directory `/etc/openvpn` di dalam directory dengan nama certificate server tersebut.
misal, certificate untuk server `bestprintvpn` akan diletakkan di `/etc/openvpn/keys/bestprintvpn` dan didalam nya akan berisi:

```
mv /etc/openvpn/ovpn-ca/keys/bestprintvpn /etc/openvpn/keys/
cd /etc/openvpn/keys/bestprintvpn/
ls -la
drwx------ 2 root root 4096 Sep 18 09:24 .
drwxr-xr-x 3 root root 4096 Sep 18 11:45 ..
-rw-r--r-- 1 root root 5657 Sep 18 09:24 01.pem
-rw-r--r-- 1 root root 5657 Sep 18 09:24 bestprintvpn.crt
-rw-r--r-- 1 root root 1090 Sep 18 09:24 bestprintvpn.csr
-rw------- 1 root root 1704 Sep 18 09:24 bestprintvpn.key
-rw-r--r-- 1 root root 1757 Sep 18 09:23 ca.crt
-rw------- 1 root root 1704 Sep 18 09:23 ca.key
-rw-r--r-- 1 root root  143 Sep 18 09:24 index.txt
-rw-r--r-- 1 root root    3 Sep 18 09:24 serial
```

Jadi, jika kita ingin membuat certificate baru untuk server yang berbeda, kita tetap akan memiliki certificate lama kita.
jika kita ingin membuat certificate baru dari ca dir yg sudah ada tadi, maka saat kita eksekusi `./clean-all` akan menghapus certificate server (bestprintvpn) yang telah kita buat tadi, kecuali kita membuat `make-cadir` baru untuk certificate baru dan melakukan config pada `vars` dengan variable yang baru juga.

Selanjutnya, untuk konfigurasi server, kita akan buat directory baru di dalam parent openvpn `/etc/openvpn` dengan nama `servers` yang akan menjadi `home` untuk konfigurasi dan log openvpn server.
Misal, untuk server `bestprintvpn` kita akan buat directory `/etc/openvpn/servers/bestprintvpn`

```
mkdir /etc/openvpn/servers
mkdir /etc/openvpn/servers/bestprintvpn
```

kemudian, kita buat juga child directory didalam nya, `ccd` untuk menyimpan konfigurasi client, seperti static ip dan internal route

```
mkdir /etc/openvpn/servers/bestprintvpn/ccd
```

kemudian, buat juga directory untuk menyimpan log koneksi openvpn kita, (opsional) bisa juga disimpan di `/var/log`

```
mkdir /etc/openvpn/servers/bestprintvpn/logs
```

----

## 4. Server Config ##

Server VPN yang akan dibuat kali ini, akan menggunakan database MySQL sebagai otentikasi user, jadi tidak menggunakan certificate client.

Berikut Konfigurasi Disisi server: `nano /etc/openvpn/bestprintvpn.conf`

```
# server config
local 128.199.66.210	
port 21194				
proto tcp 				
dev tun 				
server 10.10.0.0 255.255.255.0
management 127.0.0.1 21194 
topology subnet 				

# certificate
ca /etc/openvpn/keys/bestprintvpn/ca.crt 			
cert /etc/openvpn/keys/bestprintvpn/bestprintvpn.crt 
key /etc/openvpn/keys/bestprintvpn/bestprintvpn.key
dh /etc/openvpn/keys/bestprintvpn/dh2048.pem 		

# server detail config
user nobody 					
group nogroup 						
verb 3 								
keepalive 10 20 					
status /etc/openvpn/servers/bestprintvpn/logs/openvpn-status.log 				
log-append /etc/openvpn/servers/bestprintvpn/logs/openvpn.log 		

# client config options
script-security 3
auth-user-pass-verify /etc/openvpn/script/login.sh via-env
client-connect /etc/openvpn/script/connect.sh
client-disconnect /etc/openvpn/script/disconnect.sh
client-config-dir /etc/openvpn/servers/bestprintvpn/ccd
ccd-exclusive
username-as-common-name
client-cert-not-required

# client options
client-to-client 				
max-clients 32 					
duplicate-cn 					
persist-key 					
persist-tun 					
auth sha1 						
cipher aes-128-cbc 				

# tweaking
sndbuf 0 			
rcvbuf 0 			

# routing jaringan pada vpn
push "route 10.0.0.0 255.255.255.0"
push "route 192.168.39.0 255.255.255.0"
push "route 192.168.101.0 255.255.255.0"
route 192.168.39.0 255.255.255.0
route 192.168.101.0 255.255.255.0
```

Keterangan:


- server config
  alamat public vpn server
  port service vpn
  protocol: tcp/udp
  device: tun/tap
  jaringan lokal untuk interface tun vpn nantinya
  management console, untuk melihat status dan memutus koneksi client
  topology menggunakan subnet, seperti jaringan lokal biasa, bukan model point-to-point

- server logging
  user yang menjalankan service openvpn
  dan group user tersebut
  log/verbose 12345
  ping dan ping-restart untuk menjamin client masih terkoneksi
  status berisi informasi klien username yang terkoneksi, ip private vpn, dan ip public client
  berisi log koneksi/diskonek, otentikasi dll

- certificate
  directory ca pada server relative bisa juga ditulis /etc/openvpn/ovpnca

- config klien:
  untuk menjalankan script koneksi ke database mysql, kita akan menggunakan script bash pada server
  login: otentikasi username dan password, status user: enable/disable dan status online: online/offline
  connect: akan dieksekusi setelah user login, dan terkoneksi ke server
  disconnect: akan dieksekusi setelah user logout/terputus dari server
  client config dir [ccd] : file konfigurasi client[username]; berisi ip static dan internal route jika diinginkan
  ccd-exclusive : memastikan username login memiliki ccd di server, tanpa ccd, maka login akan selalu failed, nantinya ini akan digunakan untuk men-disable/blok akses login dari user tertentu
  username-as-common-name dan client-cert-not-required memaksa server tidak meminta client cert saat koneksi dan menggunakan username sebagai common name

- opsi klien
  sesama klien dapat saling berhubungan, untuk memantau cabang lain
  jumlah maximal client yang dapat terhubung
  memastikan tidak ada login ganda untuk satu username
  memastikan key tidak di remove
  memastikan interface tidak di remove
  otentikasi sha1 md5 none
  cipher aes-128-cbc aes-256-cbc blowfish
  `#push "redirect-gateway def1"` 	jadikan vpn sebagai default gateway semua traffic ke internet, transparent
  `#push "dhcp-option DNS 8.8.8.8"` publikasi ke client untuk
  `#push "dhcp-option DNS 8.8.4.4"` menggunakan dns server ini

- tweaking
  setting buffer pada client, default dari OS

- routing
  push route: melakukan publikasi rute kepada client, bahwa ini adalah jaringan/rute pada jaringan vpn
  route: modifikasi tabel routing pada sisi server ke arah client
  ccd/user39 => iroute 192.168.39.0 255.255.255.0
  server akan me-rute-kan request ke jaringan 192.168.39.0/24 melalui user39

----

## 5. Script Otentikasi Login & Log Koneksi Klien ##

### Desain Database ###

```sql
CREATE TABLE `user` (
  `u_id` int(8) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_pass` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1234',
  `user_online` tinyint(1) NOT NULL DEFAULT '0',
  `user_enable` tinyint(1) NOT NULL DEFAULT '1',
  `ip_vpn` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `total_received` bigint(20) NOT NULL DEFAULT '0',
  `total_sent` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`u_id`),
  KEY `user_pass` (`user_pass`)
  ) ENGINE=MyISAM;

CREATE TABLE `log` (
  `log_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `log_trusted_ip` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `log_trusted_port` varchar(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `log_start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `log_end_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB;

INSERT INTO user (user_id,user_pass) VALUES ('test','test1234');
```

### MySQL Connect Config ###

```
#!/bin/bash
##Dababase Server
HOST='localhost'
#Default port = 3306
PORT='3306'
#Username
USER='ovpn'
#Password
PASS='RHy7jeelTdLmHMJ1'
#database name
DB='ovpn'
#connect to mysql, diikuti query sql
_mysql="mysql -h$HOST -P$PORT -u$USER -p$PASS -D$DB -e "
```
simpan di `/etc/openvpn/script` sebagai `config.sh`

### OpenVPN MySQL Login ###

```
#!/bin/bash
. /etc/openvpn/script/config.sh
# auth check
user_id=$_mysql "select user_id from user where user_id = '$username' AND user_pass = '$password' AND user_enable=1 AND user_online=0"
# check user
if [ "$user_id" != '' ] && [ "$user_id" = "$username" ];then
    echo "user : $username OK"
    exit 0
else
    #echo "authentication failed, user $username already online"
    #echo "please disconnect/logout from $username first"
    echo "gagal melakukan otentikasi, user $username sudah online"
    echo "harap disconnect/logout dari $username terlebih dulu"
    #echo $username $password
    exit 1
fi
#exit 0
```

simpan di `/etc/openvpn/script` sebagai `login.sh` otentikasi ke database

### OpenVPN MySQL Connect ###

```
#!/bin/bash
. /etc/openvpn/script/config.sh
# masukkan log user yang melakukan koneksi, beserta ip public asal koneksi
$_mysql "INSERT INTO log(user_id,log_trusted_ip,log_trusted_port) VALUES('$common_name','$trusted_ip','$trusted_port')"
[ $? -ne 0 ] && echo "Connect: LOG FAILED"
# [ $? -eq 0 ] && echo "Connect: OK" || echo "Connect: LOG FAILED"
# masukkan ip address local vpn ke tabel user
$_mysql "UPDATE user SET ip_vpn='$ifconfig_pool_remote_ip' WHERE user_id='$common_name'"
[ $? -ne 0 ] && echo "IP Update : FAILED"
#[ $? -eq 0 ] && echo "IP Update : Done" || echo "IP Update : FAILED"
# 
$_mysql "UPDATE user SET user_online=1 WHERE user_id='$common_name'"
[ $? -ne 0 ] && echo "User: Update FAILED"
# [ $? -eq 0 ] && echo "User Online : $common_name" || echo "User: Update FAILED"
#exit $?;
echo -e "User : '$common_name' Has Been Connected.";
```

simpan di `/etc/openvpn/script` sebagai `connect.sh`, script ini akan di eksekusi setelah user berhasil login, tujuan dari script ini adalah untuk mencatat aktivitas login dari user,
dan melakukan update pada tabel user untuk mencatat ip_address yang diberikan oleh openvpn server, juga melakukan update pada status user ke `online`

### OpenVPN MySQL Disconnect ###

```
#!/bin/bash
. /etc/openvpn/script/config.sh
# masukkan log disconnect time dari user
$_mysql "UPDATE log SET log_end_time=now() WHERE user_id='$common_name' AND log_trusted_ip='$trusted_ip' AND log_trusted_port='$trusted_port'"
[ $? -ne 0 ] && echo "Update Log : Update FAILED"
# [ $? -eq 0 ] && echo "Update Log : Done" || echo "Update Log : Update FAILED"

$_mysql "UPDATE user SET total_received=total_received+$bytes_received, total_sent=total_sent+$bytes_sent WHERE user_id='$common_name'"
[ $? -ne 0 ] && echo "Update Total Usage : FAILED"
# [ $? -eq 0 ] && echo "Update Total Usage : Done" || echo "Update Total Usage : FAILED"

$_mysql "UPDATE user SET user_online=0 WHERE user_id='$common_name'"
[ $? -ne 0 ] && echo "Update Disconnect Status : FAILED"
# [ $? -eq 0 ] && echo "User: '$common_name' Disconnected" || echo "Failed Disconnect"
echo "User : '$common_name' Has Been Disconnected.";
```

simpan di `/etc/openvpn/script` sebagai `disconnect.sh`, script ini akan dieksekusi jika user melakukan disconnect/terputus dari server, script ini akan mengupdate log dengan menambah
jam diskonek, dan mengupdate status user yang tadi nya `online` menjadi `offline`

----

## 6. Server Networking ##

Enable ip forwarding dan buat rule masquerade pada iptables

```
nano /etc/sysctl.conf
> net.ipv4.ip_forward=1
sysctl -p
```

```
iptables -I INPUT 1 -i tun0 -j ACCEPT
iptables -I INPUT 2 -i eth0 -p tcp -d 128.199.66.210/32 --dport 21194 -j ACCEPT
iptables -I FORWARD 1 -i tun0 -o eth0 -j ACCEPT
iptables -I FORWARD 2 -i eth0 -o tun0 -j ACCEPT
iptables -t nat -I POSTROUTING -s 10.0.0.0/24 -o eth0 -j MASQUERADE
iptables -t nat -I POSTROUTING -d 10.0.0.0/24 -o tun0 -j MASQUERADE
iptables -t nat -I POSTROUTING -d 192.168.39.0/24 -o tun0 -j MASQUERADE
iptables -t nat -I POSTROUTING -d 192.168.101.0/24 -o tun0 -j MASQUERADE
```

Keterangan:
- Ijinkan akses masuk ke tun0, interface openvpn
- Ijinkan akses masuk ke ip public melalui port 21194 tcp untuk koneksi ke server vpn
- Ijinkan akses dari vpn ke internet (tun0 to eth0 -> transparent vpn)
- Ijinkan akses dari internet ke vpn (eth0 to tun0 -> reverse proxy)
- NAT dari vpn ke internet
- NAT dari internet ke vpn
- NAT dari local di belakang client vpn akses ke vpn

Perintah SystemD ke Server OpenVPN

Start, Stop, Restart, Enable dan Disable Service:

```
systemctl start   openvpn@bestprintvpn
systemctl stop    openvpn@bestprintvpn
systemctl restart openvpn@bestprintvpn
systemctl status  openvpn@bestprintvpn
systemctl enable  openvpn@bestprintvpn
systemctl disable openvpn@bestprintvpn
```

Melihat status interface tun0:

```
# ifconfig tun0
tun0      Link encap:UNSPEC  HWaddr 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00  
          inet addr:10.0.0.1  P-t-P:10.0.0.1  Mask:255.255.255.0
          UP POINTOPOINT RUNNING NOARP MULTICAST  MTU:1500  Metric:1
          RX packets:337509 errors:0 dropped:0 overruns:0 frame:0
          TX packets:470138 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:100 
          RX bytes:71753850 (71.7 MB)  TX bytes:537813652 (537.8 MB)
```

```
# ip addr show tun0
208: tun0: <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UNKNOWN group default qlen 100
    link/none 
    inet 10.0.0.1/24 brd 10.0.0.255 scope global tun0
       valid_lft forever preferred_lft forever
```

Melihat rute pada server

```
# route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         128.199.64.1    0.0.0.0         UG    0      0        0 eth0
10.0.0.0        *               255.255.255.0   U     0      0        0 tun0
10.15.0.0       *               255.255.0.0     U     0      0        0 eth0
128.199.64.0    *               255.255.192.0   U     0      0        0 eth0
192.168.23.0    10.0.0.2        255.255.255.0   UG    0      0        0 tun0
192.168.24.0    10.0.0.2        255.255.255.0   UG    0      0        0 tun0
192.168.25.0    10.0.0.2        255.255.255.0   UG    0      0        0 tun0
192.168.33.0    10.0.0.2        255.255.255.0   UG    0      0        0 tun0
192.168.39.0    10.0.0.2        255.255.255.0   UG    0      0        0 tun0
192.168.88.0    10.0.0.10       255.255.255.0   UG    0      0        0 tun0
192.168.101.0   10.0.0.2        255.255.255.0   UG    0      0        0 tun0
```

```
# ip route show
default via 128.199.64.1 dev eth0 onlink 
10.0.0.0/24 dev tun0  proto kernel  scope link  src 10.0.0.1 
10.15.0.0/16 dev eth0  proto kernel  scope link  src 10.15.0.5 
128.199.64.0/18 dev eth0  proto kernel  scope link  src 128.199.66.210 
192.168.23.0/24 via 10.0.0.2 dev tun0 
192.168.24.0/24 via 10.0.0.2 dev tun0 
192.168.25.0/24 via 10.0.0.2 dev tun0 
192.168.33.0/24 via 10.0.0.2 dev tun0 
192.168.39.0/24 via 10.0.0.2 dev tun0 
192.168.88.0/24 via 10.0.0.10 dev tun0 
192.168.101.0/24 via 10.0.0.2 dev tun0 

```

----

## 7. Membuat Config untuk Client ##

File Konfigurasi pada setiap client adalah sama, yang membedakan adalah username dan password yang digunakan untuk login,
pada metode `auth-user-pass` secara default openvpn akan meminta username dan password pada saat koneksi dilakukan/dimulai,
hal ini dapat di buat otomatis dengan membuat file otentikasi di directory yang sama dengan file config client, dan sedikit
modifikasi pada file client config, file client config dapat di download di `wget fathon.my.id/client.ovpn` atau di directory
`/etc/openvpn/clients/base-client.conf`

```
client
proto tcp
dev tun
remote 128.199.66.210 21194
cipher aes-128-cbc
auth sha1
# otentikasi interaktif, input user pass saat login
auth-user-pass				
# otentikasi dari file, baris pertama username, baris kedua password
# auth-user-pass auth.txt
verb 2
mute 20
keepalive 10 120
persist-key
persist-tun
float
resolv-retry infinite
nobind
key-direction 1
reneg-sec 0
sndbuf 0
rcvbuf 0

<ca>
## paste dari /etc/openvpn/keys/bestprintvpn/ca.crt ##
</ca>
```

jika diperlukan, tambahkan juga certificate tls-auth di dalam tag `<tls-auth></tls-auth>` dari file `ta.key`.
untuk client dengan otentikasi client.crt dan client.key, bukan `auth-user-pass`, bisa paste kan di dalam tag `<cert></cert>` isi file `client.crt` dan `<key></key>` isi file `client.key`

jalankan openvpn sebagai mode `client`
pada protokol `tcp`
menggunakan device `tun`
ke remote server `128.199.66.210` port `21194`
menggunakan cipher `AES-128-CBC` yang juga di support oleh mikrotik, opsi lain `blowfish` dan `aes-256-cbc`
dengan otentikasi `sha1` bisa juga dengan `md5`
pada opsi `auth-user-pass` jika tidak diikuti nama file, misal `auth.txt` maka akan meminta username password saat memulai koneksi
untuk otentikasi username dan password otomatis, buat file `auth.txt` di directory yg sama dengan file `client.ovpn` tadi, dan isikan username pada baris pertama, diikuti password pada baris kedua
opsi `verb` untuk logging error dan output openvpn, verb dari 1 sampai 5, makin tinggi makin banyak pesan log
opsi `mute`
opsi `keepalive ping-every-sec notice-disconnect-after-no-ping-sec`
opsi `persist-key`
opsi `persist-tun`
opsi `float`
opsi `resolv-retry-infinite` lakukan re-konek setiap kali dis-konek
opsi `nobind` tidak perlu melakukan bind pada sisi klien
opsi `key-direction 1` membaca certificate dari dalam file config, <ca>`cat server.ca`</ca><cert>`cat client.cert`</cert><key>`cat client.key`</key><tls-auth>`cat ta.key`</tls-auth>
opsi `reneg-sec 0` re-negosiasi certificate, hanya dilakukan dari arah server ke client,
opsi `sndbuf 0` dan `rcvbuf 0` membuat buffer pada interface openvpn disesuaikan dengan buffer pada sistem operasi


### Menjalankan openvpn sebagai client ###

```
cd ~/ovpn
openvpn --config client.conf --daemon --log-append /var/log/openvpn-client.log
```

perintah diatas akan menjalankan openvpn sebagai client, anda dapat memastikan apakah sudah terkoneksi ke server, dengan mengecek
interface tun, biasanya `tun0`, berikut hasil log dari openvpn client tadi,

```
Thu Sep 14 09:28:51 2017 OpenVPN 2.3.6 arm-openwrt-linux-gnu [SSL (OpenSSL)] [LZO] [EPOLL] [MH] [IPv6] built on Jun 18 2015
Thu Sep 14 09:28:51 2017 library versions: OpenSSL 1.0.2d 9 Jul 2015, LZO 2.08
Thu Sep 14 09:28:51 2017 WARNING: file 'housing.txt' is group or others accessible
Thu Sep 14 09:28:51 2017 WARNING: No server certificate verification method has been enabled.  See http://openvpn.net/howto.html#mitm for more info.
Thu Sep 14 09:28:51 2017 WARNING: normally if you use --mssfix and/or --fragment, you should also set --tun-mtu 1500 (currently it is 1401)
Thu Sep 14 09:28:51 2017 Attempting to establish TCP connection with [AF_INET]128.199.66.210:21194 [nonblock]
Thu Sep 14 09:28:52 2017 TCP connection established with [AF_INET]128.199.66.210:21194
Thu Sep 14 09:28:52 2017 TCPv4_CLIENT link local: [undef]
Thu Sep 14 09:28:52 2017 TCPv4_CLIENT link remote: [AF_INET]128.199.66.210:21194
Thu Sep 14 09:28:52 2017 WARNING: this configuration may cache passwords in memory -- use the auth-nocache option to prevent this
Thu Sep 14 09:28:52 2017 VERIFY OK: depth=1, C=ID, ST=DKI Jakarta, L=Cengkareng, O=Bestprint, emailAddress=me@my.org
Thu Sep 14 09:28:52 2017 VERIFY OK: depth=0, C=ID, ST=DKI Jakarta, L=Cengkareng, O=Bestprint, OU=Office, CN=openvpn1, emailAddress=me@my.org
Thu Sep 14 09:28:52 2017 Data Channel Encrypt: Cipher 'AES-128-CBC' initialized with 128 bit key
Thu Sep 14 09:28:52 2017 Data Channel Encrypt: Using 160 bit message hash 'SHA1' for HMAC authentication
Thu Sep 14 09:28:52 2017 Data Channel Decrypt: Cipher 'AES-128-CBC' initialized with 128 bit key
Thu Sep 14 09:28:52 2017 Data Channel Decrypt: Using 160 bit message hash 'SHA1' for HMAC authentication
Thu Sep 14 09:28:52 2017 Control Channel: TLSv1, cipher TLSv1/SSLv3 DHE-RSA-AES256-SHA, 2048 bit RSA
Thu Sep 14 09:28:52 2017 [openvpn1] Peer Connection Initiated with [AF_INET]128.199.66.210:21194
Thu Sep 14 09:28:55 2017 TUN/TAP device tun0 opened
Thu Sep 14 09:28:55 2017 do_ifconfig, tt->ipv6=0, tt->did_ifconfig_ipv6_setup=0
Thu Sep 14 09:28:55 2017 /sbin/ifconfig tun0 10.0.0.21 netmask 255.255.255.0 mtu 1401 broadcast 10.0.0.255
Thu Sep 14 09:28:55 2017 Initialization Sequence Completed
```

### Melihat interface tun0 pada vpn client ###

```
# ip addr show tun0
# ifconfig tun0
tun0      Link encap:UNSPEC  HWaddr 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00  
          inet addr:10.0.0.21  P-t-P:10.0.0.21  Mask:255.255.255.0
          UP POINTOPOINT RUNNING NOARP MULTICAST  MTU:1401  Metric:1
          RX packets:919605 errors:0 dropped:0 overruns:0 frame:0
          TX packets:2654993 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:100 
          RX bytes:44344552 (42.2 MiB)  TX bytes:1511950996 (1.4 GiB)
```

dan untuk melihat rute yang tersedia dari server vpn, jaringan yang disediakan/tunnel oleh open vpn

```
# ip route show
# route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         192.168.39.1    0.0.0.0         UG    0      0        0 eth0
10.0.0.0        10.0.0.1 	255.255.255.0   UG    0      0        0 tun0
10.0.0.0        *               255.255.255.0   U     0      0        0 tun0
192.168.23.0    10.0.0.1 	255.255.255.0   UG    0      0        0 tun0
192.168.24.0    10.0.0.1 	255.255.255.0   UG    0      0        0 tun0
192.168.25.0    10.0.0.1 	255.255.255.0   UG    0      0        0 tun0
192.168.26.0    10.0.0.1 	255.255.255.0   UG    0      0        0 tun0
192.168.27.0    10.0.0.1 	255.255.255.0   UG    0      0        0 tun0
192.168.33.0    10.0.0.1 	255.255.255.0   UG    0      0        0 tun0
192.168.39.0    *               255.255.255.0   U     0      0        0 eth0
192.168.101.0   10.0.0.1 	255.255.255.0   UG    0      0        0 tun0
```

perhatikan destination network dengan gateway dari ip address vpn kita, dan perhatikan juga pada device yang menggunakkan interface tun0
selanjutnya adalah dengan melakukan ping ke arah server vpn, ip address vpn client lain [cabang] dan jaringan dibelakang client lain [tunnel ke cabang]
10.0.0.1   			ip gateway/server vpn
10.0.0.11  			ip client vpn sedayu/ho
10.0.0.21  			ip client vpn ubm housing
192.168.101.1		ip gateway router sedayu/ho
192.168.101.111		ip bestprint.web.id
192.168.39.190 		ip gateway router orangepi/openwrt ubm housing
192.168.39.172 		ip pc operator ubm housing

```
ping 10.0.0.1
ping 10.0.0.21
ping 192.168.39.190
ping 192.168.39.172
```

Untuk melihat Jalur yang di lewati paket data untuk sampai pada jaringan tujuan, lakukan dengan `traceroute`.

Berikut contoh traceroute dari belakang router vpn gateway sedayu.

Trace ke IP VPN pada Gateway Router

```
traceroute 10.0.0.11
traceroute to 10.0.0.11 (10.0.0.11), 30 hops max, 60 byte packets
 1  10.0.0.11 (10.0.0.11)  0.318 ms  0.410 ms  0.490 ms
```

Trace ke IP VPN pada Server OpenVPN

```
traceroute 10.0.0.1
traceroute to 10.0.0.1 (10.0.0.1), 30 hops max, 60 byte packets
 1  router (192.168.101.1)  0.330 ms  0.381 ms  0.426 ms
 2  10.0.0.1 (10.0.0.1)  22.524 ms  43.196 ms  43.279 ms
```

Trace ke IP VPN pada Gateway Router VPN di Cabang

```
traceroute 10.0.0.21
traceroute to 10.0.0.21 (10.0.0.21), 30 hops max, 60 byte packets
 1  router (192.168.101.1)  0.297 ms  0.371 ms  0.426 ms
 2  10.0.0.21 (10.0.0.21)  42.568 ms  65.556 ms  86.177 ms
```

Trace ke IP Lokal Gateway Router Cabang

```
traceroute 192.168.39.190
traceroute to 192.168.39.190 (192.168.39.190), 30 hops max, 60 byte packets
 1  router (192.168.101.1)  0.309 ms  0.380 ms  0.431 ms
 2  192.168.39.190 (192.168.39.190)  49.139 ms  70.231 ms  90.703 ms
```

Trace ke IP Lokal dibelakang Gateway Router Cabang

```
traceroute 192.168.39.172
traceroute to 192.168.39.172 (192.168.39.172), 30 hops max, 60 byte packets
 1  router (192.168.101.1)  0.301 ms  0.383 ms  0.426 ms
 2  10.0.0.21 (10.0.0.21)  47.619 ms  68.602 ms  118.661 ms
 3  192.168.39.172 (192.168.39.172)  118.759 ms  118.820 ms  119.056 ms
```

Terakhir, Trace ke ip public server vpn

```
traceroute 128.199.66.210
traceroute to 128.199.66.210 (128.199.66.210), 30 hops max, 60 byte packets
 1  router (192.168.101.1)  0.277 ms  0.346 ms  0.398 ms
 2  192.168.100.1 (192.168.100.1)  1.297 ms  2.889 ms  2.916 ms
 3  61.94.50.1 (61.94.50.1)  7.378 ms  7.688 ms  7.808 ms
 4  125.160.0.113 (125.160.0.113)  7.267 ms  7.319 ms  25.996 ms
 5  61.94.171.69 (61.94.171.69)  7.737 ms  7.826 ms  8.220 ms
 6  180.240.191.42 (180.240.191.42)  32.058 ms  28.051 ms  26.591 ms
 7  180.240.191.41 (180.240.191.41)  20.803 ms  20.813 ms  19.310 ms
 8  180.240.204.96 (180.240.204.96)  19.697 ms  19.975 ms 180.240.204.104 (180.240.204.104)  20.915 ms
 9  14061.sgw.equinix.com (27.111.228.201)  25.338 ms  35.828 ms  25.564 ms
10  138.197.250.221 (138.197.250.221)  25.239 ms 138.197.250.229 (138.197.250.229)  25.408 ms 138.197.250.215 (138.197.250.215)  23.542 ms
11  bestprint.id (128.199.66.210)  24.173 ms  24.286 ms  24.928 ms
```

Pada percobaan diatas, rute ke ip public server tetap menggunakan jalur internet pada modem, tidak melalui tunnel vpn, karena kita menggunakan openvpn sebagai `transparent gateway`.

Sedangkan jaringan yang terkoneksi dengan tunnel vpn, adalah jaringan yang di deklarasikan pada file server config.

Jika di terapkan opsi `redirect-gateway def1` (client) atau `push "redirect-gateway def1"` (server), maka semua paket keluar menuju internet akan dikenali berasal dari ip public server vpn (128.....).