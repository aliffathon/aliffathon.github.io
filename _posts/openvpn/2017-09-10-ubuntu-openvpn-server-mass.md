---
layout: post
title: OpenVPN MASS - Management Access Server Script
date: 2017-09-10 08:00 AM
author: fathon
categories: openvpn
tags: server
---

Berikut cara penggunaan script `ovpn.sh`, agar lebih mudah di akses dari mana saja, kita buat link dari `/etc/openvpn/script/ovpn.sh` ke `/usr/bin/ovpn` 

```
ln -s /etc/openvpn/script/ovpn.sh /usr/bin/ovpn
```

## Melihat Status openvpn ##

```
# ovpn status
+------------+--------+--------+------------+----------------+------------+
| username   | online | enable | ip_vpn     | total_received | total_sent |
+------------+--------+--------+------------+----------------+------------+
| test       |      0 |      0 | NULL       |              0 |          0 |
| toni       |      0 |      1 |            |       20097901 |   10486269 |
| ovpnpusat  |      0 |      1 | NULL       |              0 |          0 |
| housing    |      1 |      1 | 10.0.0.21  |     8203025594 |  867034762 |
| mikrotik01 |      1 |      1 | 10.0.0.252 |         748192 |     612961 |
| ovpnsedayu |      1 |      1 | 10.0.0.11  |      274538210 | 8182125419 |
| mikrotik02 |      0 |      1 |            |         513773 |     580702 |
| obeng      |      1 |      1 | 10.0.0.251 |              0 |          0 |
+------------+--------+--------+------------+----------------+------------+
```

Dari sini kita dapat beberapa informasi, seperti:
- username yang sudah terdaftar di server
- status: 1: online; dan 0: offline
- enable: 1: enable; dan 0: disable
- total_received dan total_sent menuntukan besar bandwidth yang telah dipakai

## Membuat User Baru ##

```
# ovpn create <username> <password>
# ovpn create toni1234 password1234
```

## Mengganti Password User ##

```
# ovpn passwd <username> <password-lama> <password-baru>
# ovpn passwd toni1234 password1234 password_baru1234
```

## Melakukan Diskonek Paksa ke Klien ##

secara default, user yang terputus paksa atau gangguan internet, tidak akan mengirimkan perintah "disconnect" ke sisi server, server akan melakukan cek koneksi ke client dengan menggunakan ping, setiap 10 detik dan menunggu reply selama 120 detik/2 menit, jika tidak ada reply selama 120 detik pertama, server akan melakukan ping kedua, jika setelah 2x ping timeout secara berturut-turut / 240 detik / 4 menit tidak ada response dari client, maka client akan otomatis di disconnect dari server.
jika 4 menit dirasa terlalu lama, atau jika kita ingin memaksa user untuk terputus dari server, kita bisa menggunakan perintah `kill`

```
# ovpn kill <username>
# ovpn kill toni
```

## Menolak Login Client Terdaftar ##

```
# ovpn disable <username>
# ovpn disable toni
```

Perintah ini akan menghapus file `ccd` user, dan melakukan update table user, jadi pada saat otentikasi login dilakukan, user tidak akan dapat login, karena status di tabel adalah `disable` dan file `ccd` tidak ditemukan.

## Mengijinkan Kembali Login User ##


```
# ovpn enable <username>
# ovpn enable toni
```

Perintah `enable` akan membuat kembali file `ccd` kosong, dan melakukan update table user menjadi `enable` kembali, agar user bisa login, jika terjadi masalah login, pastikan di table user kolom `enable` berisi `1` dan terdapat file `ccd` user di directory server

## Melihat Detail CCD User ##

```
# ovpn show <username>
# ovpn show toni
# ovpn show toni-router
ifconfig-push 10.0.0.252 255.255.255.0
iroute 192.168.23.0 255.255.255.0
```

secara default, `ccd` file setiap user adalah kosong, dan client akan mendapatkan ip address secara acak/random `dhcp`, dan jaringan dibelakang client tidak akan dapat diakses dari jaringan vpn.
`ccd` adalah file konfigurasi untuk client, `ccd` dapat berisi ip static untuk masing masing user, dan dapat berisi informasi rute jaringan dibelakang client, informasi rute ini sangat penting, jika user vpn yang terkoneksi merupakan router, dan vpn ini digunakan untuk melakukan akses site-to-site / akses antar cabang.

Jika user `toni` belum memiliki konfigurasi, maka hanya akan tertampil halaman kosong atau akan langsung dikembalikan ke konsol perintah, sebaliknya akan tertampil konfigurasi pada user `toni`, seperti ip static dan rute lan dibelakang nya.

## Melakukan Setting IP Static ##

```
# ovpn static <username> <ip_static> <network-vpn>
# ovpn static toni 10.0.0.250 255.255.255.0
```

Untuk memberikan ip address static pada user vpn, pastikan `ip_static` dan `network-vpn` masih berada dalam satu jaringan/network yang sama dengan ip vpn (tun0) pada server.

Satu user hanya dapat memiliki satu ip address.

Catatan: Belum diterapkan filter pada saat input ip address dan netmask

## Melakukan Setting Rute ke Jaringan Internal Klien ##

```
# ovpn iroute <username> <local-network> <local-netmask>
# ovpn iroute toni 192.168.200.0 255.255.255.0
```

User dapat memiliki lebih dari satu internal route, jika terdapat internal route yang sama pada user yang berbeda, dan user user tersebut terkoneksi bersama, maka jaringan tersebut tidak akan dapat diakses dari jaringan vpn.

Pastikan, tidak ada user yang memiliki internal rute yang sama.

Catatan: Belum diterapkan filter pada saat input ip address dan netmask

## Menghapus Konfigurasi CCD ##

```
# ovpn clear <username>
# ovpn clear <toni>
```

Perintah ini akan menghapus konfigurasi yang telah kita buat diatas, jika kita ingin mengganti ip_static pada user yang sudah memiliki ip_static sebelumnya, maka kita harus menghapus konfigurasi `ccd` pada user tersebut terlebih dulu, baru kemudian menyetting kembali ip_static pada user tersebut.

----

Script bash sederhana untuk management server openvpn, simpan di directory `/etc/openvpn/script` dengan nama `ovpn.sh` dan berikan akses `executable`

```
#!/usr/bin/env bash
## =========================================== ##
## CRUD Create Read Update Delete User OpenVPN ##
## script by: fathon  date: 2017-09-11 4:16 PM ##
##          -------------------------          ## 
## Usage: $0 {create|delete|passwd|show}  	   ##
## Create User: $0 create nama_user_baru	   ##
## Delete User: $0 delete nama_user 		   ##
## Update Pass: $0 passwd username old new 	   ##
## User Status: $0 status | status username    ##
## Kill Connected: $0 kill username 		   ##
## Enable/Disable: $0 enable|disable username  ##
## Server Status : $0 server-status			   ##
## Static IP Set : $0 static username ip mask  ##
## Internal Route: $0 iroute username net mask ##
## Clear CCD User: $0 clear username 		   ##
## RealTime Log  : $0 log 					   ##
## =========================================== ##

_me=$0
_username=$2
_err=/var/log/mysql-err.log

. /etc/openvpn/script/config.sh

case "$1" in
	create)
		## Create User: Insert Query to MySQL
		#_username=$2
		_password=$3
		_ccd=/etc/openvpn/servers/tcp-21194/ccd
		if [ "x$_username" != "x" ]; then
			_u_select=`$_mysql "SELECT user_id FROM user WHERE user_id='$_username'" 2> $_err`
			if [ "x$_u_select" != "x" ];then
				echo "Username $_username Sudah Ada.!"
			else
				if [ "x$_username" != "x" ] && [ "x$_password" != "x" ]; then
					$_mysql "INSERT INTO user(user_id,user_pass) VALUES ('$_username','$_password')" 2> $_err
					[ ! -e "$_ccd/$_username" ] && touch $_ccd/$_username
					[ $? -eq 0 ] && echo "$_username berhasil dibuat" || echo "$_username gagal dibuat"
				fi
			fi
		else
			echo "Usage: $0 create username password"
			echo "Contoh: $0 create test test1234"
		fi
	;;
	delete)
		## Delete User: Delete From User Where User_id=?
		#_username=$2
		_ccd=/etc/openvpn/servers/tcp-21194/ccd
		if [ "x$_username" != "x" ]; then
			# cek apakah user ada di database
			_user=`$_mysql "SELECT user_id FROM user WHERE user_id='$_username'" 2> $_err`
			if [ "x$_user" == "x" ]; then
				echo "User Tidak Ditemukan"
			else
				$_mysql "DELETE FROM user WHERE user_id='$_username'" 2> $_err
				[ -e "$_ccd/$_username" ] && rm $_ccd/$_username
				[ $? -eq 0 ] && echo "$_username berhasil dihapus" || echo "$_username gagal dihapus"
			fi
		else
			echo "Usage: $0 delete username"
			echo "Contoh: $0 delete test"
		fi
	;;
	passwd)
		## Update password
		#_username=$2
		_oldpassword="${3##*( )}"
		_newpassword="${4##*( )}"
		#[ -z $_oldpassword ] && echo "password_lama tidak boleh kosong" || echo -e "passlama: $_oldpassword"
		#[ -z $_newpassword ] && echo "password_baru tidak boleh kosong" || echo -e "password_baru: $_newpassword\n"
		if [ "x$_username" != "x" ] && [ "x$_oldpassword" != "x" ]; then
			_u_select=`$_mysql "SELECT user_id FROM user WHERE user_id='$_username' AND user_pass='$_oldpassword'" 2> $_err`
			if [ "x$_u_select" != "x" ]; then
				if [ "x$_newpassword" == "x" ]; then
					echo -e "Anda Belum Memasukkan Password Baru untuk Akun anda"
				else
					$_mysql "UPDATE user SET user_pass='$_newpassword' WHERE user_id='$_username' AND user_pass='$_oldpassword'" 2> $_err
					[ $? -eq 0 ] && echo "berhasil ganti password $_username" || exit 1
				fi
			else
				echo "Periksa kembali Username dan Password Lama yang anda Masukkan"
			fi
		else
			echo -e "Usage: $0 passwd username password_lama password_baru.\nContoh: $0 passwd test test1234 test1234baru"
		fi
	;;
	status)
		## Melihat Satu atau Semua User pada database
		#_username=$2
		_sql="SELECT user_id as username,user_online as online,user_enable as enable,ip_vpn,total_received,total_sent FROM user"
		[ "x$_username" != "x" ] &&	_sql="$_sql WHERE user_id LIKE '%$_username%'"
		#echo "$_sql"
		$_mysql "$_sql" 2> $_err

	;;
	server-status)
		## melihat status dari telnet
		host="localhost"
		port="21194"
		cmd1="status"
		( echo open $host $port
		sleep 1
		echo $cmd1
		sleep 1
		echo quit
		) | telnet
		#_username="user_id as username"
		#_ip_vpn="log_remote_ip as ip_vpn"
		#_ip_public="log_trusted_ip as ip_public"
		#_rcv="sum(log_received) as total_received"
		#_snd="sum(log_send) as total_sent"
		#_id="ORDER BY log_id DESC"
		#_grup="GROUP BY user_id"
		#$_mysql "SELECT $_username,$_ip_vpn,$_ip_public,$_rcv,$_snd FROM log $_grup $_id" 2> $_err
	;;
	kill)
		#_username=$2
		if [ "x$_username" != "x" ]; then
			host="localhost"
			port="21194"
			cmd1="kill $2"
			( echo open $host $port
			sleep 0.2
			echo $cmd1
			echo quit
			) | telnet
		else
			echo -e "Usage: $0 kill username\nContoh: $0 kill test"
		fi
	;;
	enable)
		#_username=$2
		if [ "x$_username" != "x" ]; then
			_ccd="/etc/openvpn/servers/tcp-21194/ccd/$_username"
			# auth check
			$_mysql "UPDATE user SET user_enable=1 WHERE user_id='$_username'" 2> $_err
			# check user
			u_en=`$_mysql "SELECT user_enable FROM user WHERE user_id='$_username'" 2> $_err`
			[ "$u_en" == "1" ] && echo "User '$_username' Has Been Enabled"
			[ ! -e $_ccd ] && touch $_ccd && echo "$_ccd berhasil dibuat" || echo "$_ccd sudah ada"
			# cek pada database: untuk diteruskan pada waktu selanjutnya
			# apakah ada static ip ? jika ada: $0 static opsi dari database
			# apakah ada internal route ? jika ada: $0 iroute opsi dari database
		else
			echo -e "Usage: $0 enable username\nContoh: $0 enable test"
		fi
		#$_me status $_username
	;;
	disable)
		#_username=$2
		if [ "x$_username" != "x" ]; then
			_ccd="/etc/openvpn/servers/tcp-21194/ccd/$_username"
			# cek apakah user ada di database
			_user=`$_mysql "SELECT user_id FROM user WHERE user_id='$_username'" 2> $_err`
			if [ "x$_user" == "x" ]; then
				echo "User Tidak Ditemukan"
			else
				# auth check
				$_mysql "UPDATE user SET user_enable=0 WHERE user_id='$_username'" 2> $_err
				# check user
				u_dn=`$_mysql "SELECT user_enable FROM user WHERE user_id='$_username'" 2> $_err`
				[ "$u_dn" == "0" ] && echo "User '$_username' Has Been Disabled"
				# remove ccd to disable connection
				[ -e $_ccd ] && rm $_ccd && echo "File $_ccd berhasil Dihapus"
			fi
		else
			echo -e "Usage: $0 disable username\nContoh: $0 disable test"
		fi
		#$0 status $_username
	;;
	static)
		if [ "$2" == "" ]; then
	      echo "Usage: $0 static <username> <network> <netmask>"
	      echo "Sample: $0 static test1 10.10.0.14 255.255.255.0"
	    fi
	    _ccd=/etc/openvpn/servers/tcp-21194/ccd
	    #_username=$2
	    _ipaddr=$3
	    _netmask=$4
	    if [ -e "$_ccd/$_username" ] && [ "$_ipaddr" != "" ] && [ "$_netmask" != "" ];then
	      _ip=$(cat $_ccd/$_username | grep -oh "ifconfig-push")
	      [ -z $_ip ] && echo "ifconfig-push $_ipaddr $_netmask" >> $_ccd/$_username || echo -e "Username '$_username' sudah memiliki static ip, \ndan tidak boleh memiliki lebih dari satu"
	    else
	      echo "periksa kembali parameter yang anda masukkan"
	    fi
	;;
	iroute)
	    if [ "$2" == "" ]; then
	      echo "Usage: $0 iroute <username> <network> <netmask>"
	      echo "Sample: $0 iroute test1 192.168.200.0 255.255.255.0"
	    fi
	    #_username=$2
	    _ipaddr=$3
	    _netmask=$4
	    _ccd=/etc/openvpn/servers/tcp-21194/ccd
	    if [ -e "$_ccd/$_username" ] && [ "$_ipaddr" != "" ] && [ "$_netmask" != "" ];then
	      _iroute=$(cat $_ccd/$_username | grep "iroute $_ipaddr $_netmask")
	      [ "$_iroute" == "" ] && echo "iroute $_ipaddr $_netmask" >> $_ccd/$_username || echo $_iroute "sudah ada pada file"
	      else
	      echo "periksa kembali parameter yang anda masukkan"
	    fi
	 ;;
	clear)
	    #_username=$2
	    _ccd=/etc/openvpn/servers/tcp-21194/ccd
	    [ "$_username" == "" ] && echo -e "Usage: $0 clear <username>\nSample: $0 clear test1"
	    [ -e "$_ccd/$_username" ] && > $_ccd/$_username
	;;
	show)
	    #_username=$2
	    _ccd=/etc/openvpn/servers/tcp-21194/ccd
	    if [ "$_username" == "" ]; then
	    	echo -e "Usage: $0 show <username>\nSample: $0 show test1"
	    else
	    	[ -e "$_ccd/$_username" ] && cat $_ccd/$_username || echo -e "File $_ccd/$_username Tidak Ditemukan." && exit 1
	    fi
	;;
	log)
		_log=/etc/openvpn/servers/tcp-21194/logs/openvpn.log
		tailf $_log
	;;
	*)
		echo -e "Usage: $0 {create|delete|passwd|status|server-status|kill|enable|disable|static|iroute|clear|show}"
	;;
esac
```