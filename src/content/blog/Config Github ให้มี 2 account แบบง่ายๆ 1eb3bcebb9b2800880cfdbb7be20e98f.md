---
title: 'Config Github ให้มี 2 account แบบง่ายๆ'
description: 'ทำไมเราต้องมี github 2 account ในเครื่องเดียวกันล่ะ'
pubDate: 'May 7 2025'
heroImage: 
  src: '/blog-placeholder-3.jpg'
  alt: 'blog placeholder'
tags: ["git", "version-control", "software-development"]
updatedDate: 'May 7 2025'
order: 1
series: "knowledge"
---


# Config Github ให้มี 2 account แบบง่ายๆ

ทำไมเราต้องมี github 2 account ในเครื่องเดียวกันล่ะ ก็เผื่อแยกทำงานส่วนตัวกับงานของบริษัทไง แต่ทีนี้เดี๋ยวเรามาลอง set account github ของบริษัทไว้เป็น default แล้วส่วนตัวเป็น personal ดีกว่า เริ่มเลยยย

1. สร้าง ssh key สำหรับคนที่ยังไม่มีนะครับ

```bash
# สร้าง SSH key สำหรับ Account บริษัท
ssh-keygen -t ed25519 -C "email@company.com" -f ~/.ssh/id_ed25519_work

# สร้าง SSH key สำหรับบัญชีที่สอง
ssh-keygen -t ed25519 -C "persnal@gmail.com" -f ~/.ssh/id_ed25519_personal
```

1. สร้าง file config ใน `~/.ssh`

```bash
touch ~/.ssh/config
```

จากนั้นเพิ่ม config ตามนี้

```bash
# Account บริษัท (default)
Host github-work
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_ed25519_work

# Account ส่วนตัว
Host github-personal
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_ed25519_personal
```

1. เพิ่ม ssh key เข้าไปตามลำดับ

```bash
ssh-add ~/.ssh/id_ed25519_work
ssh-add ~/.ssh/id_ed25519_personal
```

ลองตรวจดูสิมี key อะไรที่เพิ่มไปบ้าง

```bash
ssh-add -l
```

1. มาลองทดสอบเชื่อม Github ดู

```bash
# ทดสอบ Account บริษัท (default)
ssh -T git@github-work

# ทดสอบ Account ส่วนตัว (secondary)
ssh -T git@github-personal
```

มาลอง clone repository ของเรากัน

```bash
# clone Account ของบริษัท
git clone git@github-work:organization/repository.git

# clone Account ส่วนตัว
git clone git@github-personal:username/repository_name.git
```

ถ้ายังไม่ได้งั้นแสดงว่า เราน่าจะลืมเพิ่ม SSH ใน Account Github แบบนี้ลุย

```bash
# Copy ไปไว้ที่ Account Work
cat ~/.ssh/id_ed25519_work.pub

# Copy ไปไว้ที่ Account Personal
cat ~/.ssh/id_ed25519_personal.pub
```

แล้วไปที่ Github 

- GitHub Settings > SSH and GPG keys
- Add new SSH key
- วาง public key ที่เรา copy มาลงไปเลย

## แล้วถ้ามันติดปัญหาแบบ login ยังไงก็ยังอยู่ Account เดิม มาแก้กัน

ก่อนอื่นเรามา clear ssh key ที่เคยเพิ่มมาแล้ว กันก่อนดีกว่าจะได้ clear ที่สุด

```bash
ssh-add -D
```