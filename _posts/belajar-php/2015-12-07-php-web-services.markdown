# LINUX RAW IMAGES MOUNT #

## backup image dengan `dd`

`# dd if=/dev/sda of=/home/sda.img`

`# file sda.img`
output :

`
harddrive.img: x86 boot sector; GRand Unified Bootloader, stage1 version 0x3, stage2 
address 0x2000, stage2 segment 0x200, GRUB version 0.97; partition 1: ID=0x83, 
active, starthead 1, startsector 63, 33640047 sectors, code offset 0x48
`

- cek tabel partisi

`# fdisk -l harddrive.img`
```
				Device Boot      Start         End      Blocks   Id  System
harddrive.img            *          63    33640109    16820023+  83  Lin
```

- mount di loop dev dan mount ke directory

```
# mount -o ro,loop,offset=32256 harddrive.img /mnt/loop
# mount | grep harddrive.img
/root/harddrive.img on /mnt/loop type ext3 (ro,loop=/dev/loop1,offset=32256)
```

```
# losetup --offset 32256 /dev/loop2 harddrive.img
# fsck /dev/loop2
```

```
# mount /dev/loop2 /mnt/loop
```