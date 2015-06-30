Server#01: Lucy

eth0	localnet	172.16.1.2/28	

eth0	bridge		wlan0
eth1	internal	localnet
eth2	host-only	vboxnet0


User	Pass		System[y/n]
root	LuCy10.04.1	y
lucy	LuCy-S3rv3r	y
http	no shell	n
ftp	no shell	n
ssh	no shell	n
git	via ssh		n
mysql	root		y





Server Service Daemon :
Web Server	: Apache2 Php5 / nGinX	| Firefox Chrome
Database	: MySQL5-Server PostgreSQL | MySQL5-Client
Version		: GitLab Community	| Git Client
Secure Shell	: OpenSSH / Dropbear	| SSH Client
SSL/TLS		: OpenSSL
FTP		: tFTPd / proFTPd / vsFTPd | FileZilla
Cloud		: OwnCloud / WebDav / Apache2TomCat
Proxy		: Squid2.7 Squid3
Bandwidth	: tc [htb fifo]
Firewall	: iptables / ZoneMinder
DNS		: Bind9 & Utils
Virtual		: Qemu VirtualBox VMWareKit
Java Web	: TomCat
Mail		: postfix-imap4 postfix-pop3 courier
Printer		: CuPs
Cross File	: Samba
