---
Author: Ryan
title: Ceph
tag: 
    - 分布式存储
category: 
   - Ceph
date: 2023-1-1 12:12:22
lastUpdated: true
#sidebar: false
breadcrumb: false
#contributors: false
---

**Ceph 是一个开源的分布式存储系统，同时支持对象存储、块设备、文件系统。**<br />ceph 是一个对象(object)式存储系统，它把每一个待管理的数据流(文件等数据)切分为一到多个固定大小(默认 4 兆)的对象数据,，并以其为原子单元(原子是构成元素的最小单元)完成数据的读写。<br />对象数据的底层存储服务是由多个存储主机(host)组成的存储集群，该集群也被称之为**RADOS(reliable automatic distributed obiect store**)存储集群，即可靠的、自动化的、分布式的对象存储系统。<br />**librados** 是 RADOS 存储集群的 API，支持 C/C++/JAVA/python/ruby/php/go等编程语言客户端
