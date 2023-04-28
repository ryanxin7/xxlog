<template><div><p><strong>Ceph 是一个开源的分布式存储系统，同时支持对象存储、块设备、文件系统。</strong><br />ceph 是一个对象(object)式存储系统，它把每一个待管理的数据流(文件等数据)切分为一到多个固定大小(默认 4 兆)的对象数据,，并以其为原子单元(原子是构成元素的最小单元)完成数据的读写。<br />对象数据的底层存储服务是由多个存储主机(host)组成的存储集群，该集群也被称之为<strong>RADOS(reliable automatic distributed obiect store</strong>)存储集群，即可靠的、自动化的、分布式的对象存储系统。<br /><strong>librados</strong> 是 RADOS 存储集群的 API，支持 C/C++/JAVA/python/ruby/php/go等编程语言客户端</p>
</div></template>


