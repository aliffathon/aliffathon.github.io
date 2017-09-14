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
ls -la
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
ca /etc/openvpn/ovpn-ca/keys/ca.crt 			
cert /etc/openvpn/ovpn-ca/keys/bestprintvpn.crt 
key /etc/openvpn/ovpn-ca/keys/bestprintvpn.key
dh /etc/openvpn/ovpn-ca/keys/dh2048.pem 		

# server detail config
user nobody 					
group nogroup 						
verb 3 								
keepalive 10 20 					
status logs/status.log 				
log-append logs/openvpn.log 		

# client config options
script-security 3
auth-user-pass-verify /etc/openvpn/script/login.sh via-env
client-connect /etc/openvpn/script/connect.sh
client-disconnect /etc/openvpn/script/disconnect.sh
client-config-dir /etc/openvpn/servers/server-tcp-22/ccd
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
push "route 10.10.0.0 255.255.254.0"
push "route 10.10.2.0 255.255.254.0"
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

## 5. Script Otentikasi Login, Log Koneksi Masuk dan Keluar Klien ##

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
_mysql="mysql -h$HOST -P$PORT -u$USER -p$PASS -D$DB -e "
```
simpan di `/etc/openvpn/script` sebagai `config.sh`

### OpenVPN MySQL Login ###

```
#!/bin/bash
. /etc/openvpn/script/config.sh
# auth check
user_id=$(mysql -h$HOST -P$PORT -u$USER -p$PASS $DB -sN -e "select user_id from user where user_id = '$username' AND user_pass = '$password' AND user_enable=1 AND user_online=0")
# check user
if [ "$user_id" != '' ] && [ "$user_id" = "$username" ];then
    echo "user : $username OK"
    exit 0
else
    echo 'authentication failed.'
    echo $username $password
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


## 6. Server Networking ##

Enable ip forwarding dan buat rule masquerade pada iptables

```
nano /etc/sysctl.conf
> net.ipv4.ip_forward=1
sysctl -p
```

```
iptables -I INPUT 1 -i tun0 -j ACCEPT
iptables -I INPUT 2 -i eth0 -p tcp -d 128.199.66.210 --dport 21194 -j ACCEPT
iptables -I FORWARD 1 -o eth0 -j ACCEPT
iptables -I FORWARD 2 -o tun0 -j ACCEPT
iptables -t nat -I POSTROUTING -o eth0 -j MASQUERADE
iptables -t nat -I POSTROUTING -o tun0 -j MASQUERADE
```

Start, Stop, Restart, Enable dan Disable Service:

```
systemctl start   openvpn@bestprintvpn
systemctl stop    openvpn@bestprintvpn
systemctl restart openvpn@bestprintvpn
systemctl status  openvpn@bestprintvpn
systemctl enable  openvpn@bestprintvpn
systemctl disable openvpn@bestprintvpn
```

melihat status interface tun0:

```
ifconfig tun0
ip addr show tun0
```

melihat rute pada server

```
route
ip route show
```

Membuat Config untuk Client:

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
auth-user-pass				# otentikasi interaktif, input user pass saat login
#auth-user-pass auth.txt 	# otentikasi dari file, buat file baru, baris pertama username, baris kedua password
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
-----BEGIN CERTIFICATE-----
MIIEGzCCAwOgAwIBAgIJAM7NHN04NHREMA0GCSqGSIb3DQEBCwUAMGYxCzAJBgNV
BAYTAklEMRQwEgYDVQQIEwtES0kgSmFrYXJ0YTETMBEGA1UEBxMKQ2VuZ2thcmVu
ZzESMBAGA1UEChMJQmVzdHByaW50MRgwFgYJKoZIhvcNAQkBFgltZUBteS5vcmcw
HhcNMTcwNjE0MDkyMTIzWhcNMjcwNjEyMDkyMTIzWjBmMQswCQYDVQQGEwJJRDEU
MBIGA1UECBMLREtJIEpha2FydGExEzARBgNVBAcTCkNlbmdrYXJlbmcxEjAQBgNV
BAoTCUJlc3RwcmludDEYMBYGCSqGSIb3DQEJARYJbWVAbXkub3JnMIIBIjANBgkq
hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA01jU3xmAwZp2EFgtYyQliZcrRGjDgZVs
W/4bErY5kPiSMBOMuBvPLfB3Gut8q/dT9ZsmRrshP3Um+lr8zDjXpiY5EebSxjEM
Yw1nT6cwFMvrcCJL/8KqugnJ3BMBomQh4CWygx8X2i8tTJGpQLZUak2CGJbGPEax
ZRC1YwiqM1U0c1oryFJyHomFIZmvElPrKIx/WloabGYAw9T6HMugzpto5yXpk0SB
WDWWKP+T+qnf9u2UzKH53ZvFr8YJhfmZXYYT6GgvsgS2LIfpMf5dcNnIEqFLvdY4
YwH0/hK0RYtrEP4K9am6cW/No+9+QVx9o3TVFIjxBUzwxDPhFKe7SwIDAQABo4HL
MIHIMB0GA1UdDgQWBBQcRpK5LBSArcyGvUrNtfm/sxJl5DCBmAYDVR0jBIGQMIGN
gBQcRpK5LBSArcyGvUrNtfm/sxJl5KFqpGgwZjELMAkGA1UEBhMCSUQxFDASBgNV
BAgTC0RLSSBKYWthcnRhMRMwEQYDVQQHEwpDZW5na2FyZW5nMRIwEAYDVQQKEwlC
ZXN0cHJpbnQxGDAWBgkqhkiG9w0BCQEWCW1lQG15Lm9yZ4IJAM7NHN04NHREMAwG
A1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHO+Zk/RV2CyUZt1EKLsDpe7
Xhobzt27QRwNBoHrLMOivK6KDtJC6zS7iBJJFeKSwZiTVjKi7BQTP1MbmHw0LWyp
4HYuaqHbVDEvssXgGomthxx7JAgFCgaz+tD9OAk33FkEl/awCPVEAb/3/wAhw9O9
V9V0BABTmpUSxQGy3+jx6B4SdkGIvV1zOCMXlGUpBmTsQ3+TUWNLcjEz+DWC1B7K
25oGbAt0b0D11xjrS4TcAkEtH1m824Oh5eYeAGV8raQCeHF8+Yn4DNjmkxYbvGO5
Vtg+O6yvFmShf7vzC97/GK0PTZHfaUm7s4ogLo8XeuBD5esWzvb0B/8wpA3r+HY=
-----END CERTIFICATE-----
</ca>
```

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
opsi `key-direction 1` membaca certificate dari dalam file config, <ca>server.ca</ca><cert>client.cert</cert><key>client.key</key><tls-auth>ta.key</tls-auth>
opsi `reneg-sec 0` re-negosiasi certificate, hanya dilakukan dari arah server ke client,
opsi `sndbuf 0` dan `rcvbuf 0` membuat buffer pada interface openvpn disesuaikan dengan buffer pada sistem operasi


menjalankan openvpn sebagai client:

```
cd ~/ovpn
openvpn --config client.conf
```

perintah diatas akan menjalankan openvpn sebagai client, anda dapat memastikan apakah sudah terkoneksi ke server, dengan mengecek
interface tun, biasanya `tun0`

```
ifconfig tun0
ip addr show tun0
```

dan untuk melihat rute yang tersedia dari server vpn, jaringan yang disediakan/tunnel oleh open vpn

```
route
ip route show
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
192.168.39.190
192.168.39.172
```