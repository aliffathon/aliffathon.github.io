---
title: Virtualisasi Qemu KVM
date: 2017/09/19 16:37
categories: linux-server
tags: linux-server
---

source:
- [networking](https://www.linux-kvm.org/page/Networking)
- [chroot-xhost](https://help.ubuntu.com/community/BasicChroot)
- [interfaces-set](https://wiki.debian.org/NetworkConfiguration)
- [qemu-docs](https://wiki.archlinux.org/index.php/QEMU)
- [qemu-bridge](http://turlucode.com/qemu-kvm-bridged-networking/)

- [kvm-bridge](https://wiki.ubuntu.com/KvmWithBridge)
- [bridge](http://blog.elastocloud.org/2015/07/qemukvm-bridged-network-with-tap.html)
- [libvirt](http://nandakpli.blogspot.co.id/2014/06/1.html)



- Sukses: Terbaca interface eth0 pada virtual machine

```
qemu-system-x86_64 \
-m 128M \
-kernel zImage \
-hda rootfs.ext4 \
-append "root=/dev/sda console=/dev/tty0,console=/dev/ttyS0 ro quiet" \
-net nic,model=virtio \
-net tap,ifname=tap0,script=qemu-ifup
```

- Gagal: interface eth0 tidak terdeteksi pada virtual machine

```
qemu-system-x86_64 \
-m 128M \
-kernel zImage \
-hda rootfs.ext4 \
-append "root=/dev/sda console=/dev/tty0,console=/dev/ttyS0 ro" \
-device e1000,netdev=tap0,mac=DE:AD:BE:EF:C1:40 \
-netdev tap,id=tap0,script=qemu-ifup
```

Catatan: jalankan `dhclient eth0` di dalam virtual machine, untuk mendapatkan ip address satu jaringan dengan ip address pada host machine.

Catatan: pada host machine, interface `eth0` atau `enp2s0` pada linux mint, akan mengalami sedikit error, seperti tidak mendapatkan ip dari dhcp server.

Catatan: pada kondisi bridge `br0`, hanya interface `br0` yang memiliki ip address, dan interface lain, `eth0`/`enp2s0` dan `tap0` tidak memiliki ip.

Cataan: jika `br0` tidak memiliki ip, dan `eth0`/`enp2s0` yang memiliki ip, matikan dan hidup kan kembali interface tersebut.

```
ip link eth0 down
ip link eth0 up
dhclient br0
```

- Melihat interface

```
ip link show
```

- Melihat ip address

```
ip address show
```

----

# Bridging #

## 1. Disable Network manager

```
sudo systemctl stop dhcpcd@<interface>.service
sudo systemctl disable dhcpcd@<interface>.service
# or
sudo systemctl stop NetworkManager.service
sudo systemctl disable NetworkManager.service
```

## 2. Install NetCtl

```
sudo apt-get install netctl bridge-utils
```

Skipp::

## 4. Config Qemu

```
sudo cp /etc/qemu/bridge.conf.sample /etc/qemu/bridge.conf
```

```
sudo nano /etc/qemu/bridge.conf
 
# add this
allow br0
```

## 5. Craete Bridge

Enable IP Forwarding

```
sudo sysctl net.ipv4.ip_forward=1
 
# and to make it permanent
sudo -s
echo "net.ipv4.ip_forward = 1" > /etc/sysctl.d/99-sysctl.conf
```

```
sudo -s
modprobe tun
echo "tun" > /etc/modules-load.d/tun.conf
```

- qemu-ifup script

```
#!/bin/sh
 
echo "Executing /etc/qemu-ifup"
echo "Bringing up $1 for bridged mode..."
sudo /usr/bin/ip link set $1 up promisc on
echo "Adding $1 to br0..."
sudo /usr/bin/brctl addif br0 $1
sleep 2
```

- qemu-ifdown script

```
#!/bin/sh
 
echo "Executing /etc/qemu-ifdown"
sudo /usr/bin/ip link set $1 down
sudo /usr/bin/brctl delif br0 $1
sudo /usr/bin/ip link delete dev $1
```

- beri exec permission

```
sudo chown root:kvm /etc/qemu-ifup
sudo chown root:kvm /etc/qemu-ifdown
 
sudo chmod 750 /etc/qemu-ifup
sudo chmod 750 /etc/qemu-ifdown
```

- sudo tanpa password

```
Cmnd_Alias      QEMU=/usr/bin/ip,/usr/bin/modprobe,/usr/bin/brctl
%kvm     ALL=NOPASSWD: QEMU
```

- disable firewall pada interface bridge

```
sudo nano /etc/sysctl.d/10-disable-firewall-on-bridge.conf
 
# add the following
net.bridge.bridge-nf-call-ip6tables = 0
net.bridge.bridge-nf-call-iptables = 0
net.bridge.bridge-nf-call-arptables = 0
```

```
sudo sysctl -p /etc/sysctl.d/10-disable-firewall-on-bridge.conf
```

- Script menjalankan qemu:

```
USERID=$(whoami)
 
# Get name of newly created TAP device; see https://bbs.archlinux.org/viewtopic.php?pid=1285079#p1285079
precreationg=$(/usr/bin/ip tuntap list | /usr/bin/cut -d: -f1 | /usr/bin/sort)
sudo /usr/bin/ip tuntap add user $USERID mode tap
postcreation=$(/usr/bin/ip tuntap list | /usr/bin/cut -d: -f1 | /usr/bin/sort)
IFACE=$(comm -13 <(echo "$precreationg") <(echo "$postcreation"))
 
# This line creates a random MAC address. The downside is the DHCP server will assign a different IP address each time
printf -v macaddr "52:54:%02x:%02x:%02x:%02x" $(( $RANDOM & 0xff)) $(( $RANDOM & 0xff )) $(( $RANDOM & 0xff)) $(( $RANDOM & 0xff ))
# Instead, uncomment and edit this line to set a static MAC address. The benefit is that the DHCP server will assign the same IP address.
# macaddr='52:54:be:36:42:a9'
 
qemu-system-i386 -net nic,macaddr=$macaddr -net tap,ifname="$IFACE" $*
 
sudo ip link set dev $IFACE down &> /dev/null
sudo ip tuntap del $IFACE mode tap &> /dev/null
```