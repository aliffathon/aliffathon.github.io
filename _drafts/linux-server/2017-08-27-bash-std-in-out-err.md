---
layout: post
title: "Bash: StdIn[0], StdOut[1] & StdErr[2]"
date: 2017-08-27 08:00:01
categories: linux
tags: bash
---

Note : 
- 0 stdin
- 1 stdout
- 2 stderr

## Normal Command: ##
```
$ ls
file1
file2
```

## Silence StdOut[1] to /dev/null ##

```
ls file1 > /dev/null
```

## Silence StdOut, But Return StdErr to terminal ##
  Solution: redir stderr[2] to same dest as stdout[1]
```
ls file12 > /dev/null
ls: cannot access file12: No such file or directory
ls file1 file12 >/dev/null 2>&1
ls file1 file12 2>/dev/null 1>&2
ls file1 file12 >& /dev/null
```

source:
[stackexchange](https://unix.stackexchange.com/questions/267536/why-we-need-to-have-21-in-dev-null-21)
