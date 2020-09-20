---
author: fathon
title: "Kirim Email Dari Terminal Linux"
date: 2017-09-29 15:42
categories: linux-server
tags: linux-server
---

source:
- [mail](https://servernesia.com/1817/cara-kirim-email-linux/)



## Email Dengan Subject ##

```
mail -s "Notif" username@domain.com < /dev/null
```

## Email dengan Konten ##

```
echo "Konten data email body" | mail -s "Terjadi Kesalahan Sistem" admin@domain.com < /dev/null
```

## Email dengan Lampiran

```
echo "SysLog September 29, 2017 @ Email Server" | mail -s "SysLog" -l syslog.tgz admin@domain.com < /dev/null
```

