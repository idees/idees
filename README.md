# Idees
[![Build Status](https://travis-ci.org/idees/idees.svg?branch=master)](https://travis-ci.org/idees/idees)  
A markdown editor which support several cloud file storage backends.

---

![idees](_images/idees.png)  

---

@[TOC]

## 0x01 What is Idees?
In our daily life, we have so many idées to write down, and many of us are suffering from the work of complicated text formatting.  
[Makrdown](https://github.com/topics/markdown) is a lightweight markup language which is a great way to save us from it.   
  
We usually save our data on many cloud file storage service, such as Dropbox, Google drive, 百度云, and so on. But what has happened did prove that these cloud storage is not reliable.  
They would  
* **peep your files**,   
* **block you download** your files due to their policy,   
* **delete your files**,   
* **leak out your secure files**.  

So we need a **self deployed file storage service**, like [Owncloud](https://github.com/owncloud/core), [Nextcloud](https://github.com/nextcloud/server)  
  
[Idees](https://github.com/idees/idees) is a **markdown editor** and support these **self deployed file storage services**.  
It named as idees which is the translate of ideas in French.  
It can catch your idées directly.  

## 0x02 Features
1. Full [Makrdown](https://github.com/topics/markdown) language support
2. Several cloud file backend: Local, [Webdav](https://en.wikipedia.org/wiki/WebDAV), [Owncloud](https://github.com/owncloud/core), [Nextcloud](https://github.com/nextcloud/server), [坚果云](https://www.jianguoyun.com/), and so on.  
3. Real time preview
4. Content searching

## 0x03 How to use
1. You should add a master password, which will secure your all configuration, and you'll be asked for this at anytime you open idees.  
![input password](_images/BD11AE50A432A1EBAEC04ABD21B6764D.jpg)
2. Select a file storage service, such as [坚果云](https://www.jianguoyun.com/).   
![select file storage](_images/C2EFB1D39AA74C0CDC90843328996222.jpg)
3. Fill in the `remote_url`, `username` and `passowrd` you have in [坚果云](https://www.jianguoyun.com/).    
![input remote_url username password](_images/33D8F38059583C899CD847FD0F1E93D8.jpg)  
![username password valid](_images/A9ECE53B18AF7A45507913637DF9AA1C.jpg)  
4. Press `CMD + N` to new a file.  
![new a file](_images/A5DF4A5E23AD9BA95523A7673FD76E75.jpg)  
5. Insert file content.  
![insert content](_images/6FB97487F1C22556DF812F4DD2D99C72.jpg)  
6. Press `CMD + S` to save the content.  
![save content](_images/2F77B550C0D542F23B49375DB54CC6F2.jpg)  
![select content](_images/5B903DC8A8ACA59C74D29935A6E55ADB.jpg)  

---  

## Article quotes
> * Accessing [Nextcloud](https://github.com/nextcloud/server) Files Using WebDAV
> [https://docs.nextcloud.com/server/9/user_manual/files/access_webdav.html](https://docs.nextcloud.com/server/9/user_manual/files/access_webdav.html)
> * Accessing [Owncloud](https://github.com/owncloud/core) Files Using WebDAV  
> [https://doc.owncloud.org/server/latest/user_manual/files/access_webdav.html](https://doc.owncloud.org/server/latest/user_manual/files/access_webdav.html)
