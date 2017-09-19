---
title: "Linux:: Minimal Root File System"
categories: linux-server
tags: linux-server
---

source:
[0](https://www.debian.org/releases/jessie/amd64/apds03.html.en)

[1](https://www.prahladyeri.com/blog/2016/02/minimal-debian-desktop-setup.html)
[3](http://linuxforcynics.com/how-to/minimal-debian-install)
[6](https://olimex.wordpress.com/2014/07/21/how-to-create-bare-minimum-debian-wheezy-rootfs-from-scratch/)
[8](http://stray-notes.blogspot.co.id/2010/11/debian-minimal-install-xfce4.html)
[10](https://gist.github.com/DazWorrall/4277257)

[11](https://musaamin.web.id/cara-install-vagrant-di-ubuntu/)

----

# 1. Requirements #

1. Linux Mint 18.1 x64
2. Package: debootstrap chroot terminal ssh

```
apt-get install debootstrap
```

# 2. Debootstrap #

```
nano create-rootfs.sh
bash create-rootfs.sh chroot
```

```
#!/bin/bash
set -e
DEFAULT_PACKAGES=ssh,language-pack-en-base
DEFAULT_COMPONENTS=main,universe
DEBOOTSTRAP=/usr/sbin/debootstrap
DEFAULT_MIRROR=http://archive.ubuntu.com/ubuntu
DEFAULT_VARIANT=minbase

MIRROR=${STRAP_MIRROR:-$DEFAULT_MIRROR}
ROOTFS=$1
PACKAGES=${STRAP_PACKAGES:-$DEFAULT_PACKAGES} 
COMPONENTS=${STRAP_COMPONENTS:-$DEFAULT_COMPONENTS}
SUITE=${STRAP_SUITE:-precise}
VARIANT=${STRAP_VARIANT:-$DEFAULT_VARIANT}

type $DEBOOTSTRAP >/dev/null
if [ $? -ne 0 ]; then
    echo "debootstrap not installed"
    exit 1
fi

if [ "x$ROOTFS" == "x" ]; then 
    echo "Usage: $0 <path_to_root>"
    exit 1
fi

$DEBOOTSTRAP --include $PACKAGES --components $COMPONENTS --variant $VARIANT $SUITE $ROOTFS $MIRROR

cat > $ROOTFS/etc/apt/sources.list << EOF
deb $MIRROR $SUITE ${COMPONENTS//,/ }
deb $MIRROR $SUITE-updates ${COMPONENTS//,/ }
deb $MIRROR $SUITE-security ${COMPONENTS//,/ }
EOF

cp /etc/resolv.conf $ROOTFS/etc
chroot $ROOTFS mount -t proc /proc /proc
# chroot $ROOTFS apt-get update
# chroot $ROOTFS apt-get dist-upgrade -y
umount $ROOTFS/proc
```

3. Create Rootfs

- Create Raw Disk

```
dd if=/dev/zero of=rootfs.ext4 bs=1M count=1024
```

Output:
```
1024+0 records in
1024+0 records out
1073741824 bytes (1,1 GB, 1,0 GiB) copied, 6,98196 s, 154 MB/s
```

Atau, bisa menggunakan partisi pada pendrive usb, misal `/dev/sdb1`

- Format to EXT4:

```
mkfs.ext4 -L "rootfs" rootfs.ext4 
mkfs.ext4 -L "rootfs" /dev/sdb1
```

Output:
```
mke2fs 1.42.13 (17-May-2015)
Discarding device blocks: done                            
Creating filesystem with 262144 4k blocks and 65536 inodes
Filesystem UUID: 3747a6f3-76b8-4f1f-9aae-09d2ee3e1376
Superblock backups stored on blocks: 
	32768, 98304, 163840, 229376

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (8192 blocks): done
Writing superblocks and filesystem accounting information: done
```

- Create rootfs mount point

```
mkdir rootfs
```

- Mount Raw disk to mount point

```
mount -t ext4 rootfs.ext4 rootfs
mount | grep rootfs
```

Output:
```
/root/qemu/rootfs.ext4 on /root/qemu/rootfs type ext4 (rw,relatime,data=ordered)
```

- Transfer the debootstrap to rootfs disk

```
rsync -azvh --progress xenial-min/ rootfs/
```

Output:
```
sent 94.15M bytes  received 132.48K bytes  4.39M bytes/sec
total size is 199.53M  speedup is 2.12
```

Perhatikan tanda `/` pada akhir directory sumber `xenial-min`, jika tidak di akhiri tanda `/`, maka pada directory target `rootfs` akan dibuat directory sumber `xenial-main` pada directory target `rootfs`

Hasilnya akan menjadi `rootfs/xenial-min`, berarti anda gagal, silahkan format dan ulangi proses transfer rootfs kembali

- Entering CHROOT

kita bisa masuk ke konsol chroot dan bekerja didalamnya, kita juga bisa melakukan beberapa perintah untuk di jalankan didalamnya, sebagai contoh, sebagai langkah isolasi terhadap bug/error, kita bisa menjalankan program ssh server di dalam chroot, dan saat user login ke ssh server tersebut, meskipun telah masuk di root directory, tetap tidak dapat naik lagi ke root directory fisik dari system yg berjalan.

```
mount -o bind /dev rootfs/dev
mount -o bind /dev/pts rootfs/dev/pts
chroot new_root_filesystem command_to_execute
chroot rootfs/ /bin/bash --rcfile /root/.bashrc
mount -t proc proc /proc
mount -t tmpfs none /tmp
mount -t tmpfs none /run
mount -t sysfs sys /sys
```

- Exiting Chroot

Berbanding terbalik, untuk keluar dari chroot, tidak semudah mengetik perintah `poweroff` atau `shutdown`; kita perlu mematikkan semua service yang berjalan di dalam lingkungan chroot

bisa dilihat dengan `ps auxwww` dikombinasikan dengan `grep rootfs` dari luar chroot misal. dapat juga dengan perintah `lsof` untuk melihat file/akses yang sedang dibuka

setelah semua proses dan service di dalam chroot dihentikan, kita unmount isi dari chroot, dan device chroot tadi.

```
umount /proc
umount /tmp
umount /run
umount /sys
exit
umount rootfs/dev/pts
umount rootfs/dev
```

Penting: untuk melakukan `umount` pada sub directory terlebih dahulu, atau akan terjadi error `device is busy`.

```
#!/bin/bash
_target=$2
_m=0
case "$1" in
  mount)
	_m=$(mount | grep -c $_target)
    if [ $_m -eq 1 ]; then
	    for x in dev dev/pts; do
	      mount -o bind /$x $_target/$x
	    done
	    mount -t proc proc $_target/proc
	    mount -t tmpfs none $_target/tmp
	    mount -t tmpfs none $_target/run
	    mount -t sysfs sys $_target/sys
	fi
	echo "chroot is ready"
  ;;
  umount)
    _m=$(mount | grep -c $_target)
    if [ $_m -gt 1 ]; then
    	for x in dev/pts dev; do
	      umount $_target/$x
        sleep 0.5
	    done
	    umount $_target/proc
	    umount $_target/tmp
	    umount $_target/run
	    umount $_target/sys
	fi
	echo "chroot in unmounted"
  ;;
  status)
      mount | grep $_target
  ;;
  *)
    [ -z $_target ] && _target=rootfs
    _m=$(mount | grep -c $_target)
    if [ $_m -lt 1 ]; then
    	echo "Please re run the program"
    	exit 1
    else 
    	chroot $_target /bin/bash --rcfile /root/.bashrc
    fi
  ;;
esac
```

----

Hal yang harus dilakukan setelah membuat chroot:

- mengatur fstab

```
nano rootfs/fstab
```

```
# device 	mount_point		filesystem 	options	dump	pass
/dev/sda1	/				ext4 		defaults 	0	1
#/dev/sda2	none			swap		sw 			0	0
proc		/proc 			proc		defaults 	0	0
```

untuk mount semua sekaligus dari dalam chroot

```
mount -a
```

- mengatur domain dns

```
echo 'nameserver 8.8.8.8' > rootfs/etc/resolv.conf
echo 'nameserver 8.8.4.4' >> rootfs/etc/resolv.conf
```

atau

```
cp /etc/resolv.conf rootfs/etc/resolv.conf
```

- Mengatur TimeZone/Zona Waktu

```
nano rootfs/etc/adjtime
```

```
0.0 0 0.0
0
UTC
```

Atau

```
dpkg-reconfigure tzdata
```

- Mengatur interface/jaringan

```
nano rootfs/etc/network/interfaces
```

Static:

```
auto eth0
iface eth0 inet static
	address 192.168.0.2
	network 192.168.0.0
	netmask 255.255.255.0
	broadcast 192.168.0.255
	gateway 192.168.0.1
	dns-nameserver 8.8.8.8
```

Dinamis:

```
auto eth0
iface eth0 inet dhcp
```

- Mengatur nama host

```
nano rootfs/etc/hosts
```

```
127.0.0.1 localhost
127.0.1.1 xenial
```

- Mengatur repository

```
nano rootfs/etc/apt/source.list
```

```
deb http://archive.ubuntu.com/ubuntu xenial main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu xenial-updates main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu xenial-security main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu xenial-backports main restricted universe multiverse
```

- Mengatur Keyboard dan Bahasa

```
apt-get install locales
dpkg-reconfigure locales
```

```
apt-get install console-setup
dpkg-reconfigure keyboard-configuration
```

- Menginstall Kernel

kita bisa menggunakan kernel dari sistem yang sama dengan saat kita membuat chroot, bisa juga dengan menginstall kernel dari repo.

```
apt-cache search linux-image
apt-get install linux-image-versiKernel
```

- Menginstall bootloader, masuk chroot terlebih dahulu

```
apt-get install grub-pc
grub install /dev/sdb
update-grub
```

```
nano rootfs/boot/grub/grub.cfg
```

- Remote akses dengan SSH

```
apt-get install ssh openssh-server openssh-sftp-server
```

- Buat user baru

```
adduser xenial
passwd xenial
> xenial
> xenial
```

- Beri password pada root

```
passwd
> toor
> toor
```

- Install sudo

```
apt-get install sudo
adduser xenial sudo
```
