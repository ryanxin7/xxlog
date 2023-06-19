---
title: 数据库版本介绍与安装
tag: 
    - DBA
    - RDBMS
category: 
 - DBA
date: 2020-7-11 22:43:01
---

  数据库是数据管理的有效技术，是由一批数据构成的有序集合，这些数据被存放在结构化的数据表里。数据表之间相互关联，反映客观事物间的本质联系。数据库能有效地帮助一个组织或企业科学地管理各类信息资源。数据是数据库中存储的基本对象，是按一定顺序排列组合的物理符号。
  数据有多种表现形式，可以是数字、文字、图像，甚至是音频或视频，它们都可以经过数字化后存入计算机。数据库是数据的集合，具有统一的结构形式并存放于统一的存储介质内，是多种应用数据的集成，并可被各个应用程序所共享。


   

<!-- more -->

## 1. DBA 职业素养





**人品**:  权利越大责任越大，要禁得住诱惑，严禁私自偷卖企业数据或向他人泄露秘钥信息。

**严谨**:  操作数据库执行修改、删除类的命令时再三考虑，同事安排工作落实到笔头上，要有理论或者实践的支撑没测试过的参数绝对不能上生产环境。

**细心**：请收起好奇心，做到敏感内容不听、不看、不问学会保护自己，把最简单的事情做的最漂亮，最专业。

**心态**：在压力较大环境下做到不慌不乱，别惹事，出事别怕事。操作失误第一时间上报领导，不要自作主张操作。



<br>

### **1.1 职业技能**

- 熟悉操作系统
- 熟悉公司业务
- 产品的功能
- 用户的行为(热功能,热数据）


### **1.2 熟悉行业**

- 熟悉行业发展趋势
- 了解版本新特性及使用率
- 数据库产品类型
- 定期参加 [数据库大会](https://db-engines.com/en/ranking)

<br>

**喜欢数据库**：体验很重要 

<br>

**其实成功的门槛并不拥挤，因为大部分人在路上就放弃了。**—— [Oldguo](https://www.jianshu.com/u/44068ed972c7) 

<br>

<br>

##  2. 数据库产品 

4.1 什么是数据？

4.2 DBMS 数据库管理系统

RDBMS ： Oracle ，MySQL ，PG，MSSQL

NoSQL ： MongoDB ，Redis ，ES

NEWSQL （分布式）： TiDB，Spanner ，AliSQL(RDS+DRDS) ，OB ，PolarDB



###  2.1 MySQL 版本选择



| 现阶段企业生产主要版本 | 更新版本                                             |
| ---------------------- | ---------------------------------------------------- |
| 5.6                    | 5.6.34 ， 5.6.36 ，**5.6.38**（2017913） ，5.6.40    |
| 5.7                    | 5.7.18 ，**5.7.20**（2017913） ，5.7.24 ，**5.7.26** |
| 8.0                    | 8.0.14， 8.0.15 ，**8.0.16**                         |

[官网下载地址](https://downloads.mysql.com/archives/community/)

<br>

<br>

### **2.2 MySQL安装方式**


1. **二进制文件安装：** 💗 `较多使用`

   

![二进制文件安装](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day01-1.png)


1. **RHEL RPM 包安装：** 


![二进制文件安装](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day01-2.png)


1. **源代码编译**

![源代码编译](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day01-3.png)
<br>

<br>

## 3. MySQL 二进制版本安装

<br>

### 3.1 **下载并上传软件至目录**

```bash
[root@m01 ~]# mkdir -p /server/tools

[root@m01 ~]# cd /server/tools/

[root@m01 /server/tools]# yum install -y lrzsz

[root@m01 /server/tools]# ls

mysql-5.7.26-linux-glibc2.12-x86_64.tar.gz
```


**解压软件移动软件目录**


```bash
[root@m01 /server/tools]# tar xf mysql-5.7.26-linux-glibc2.12-x86_64.tar.gz 

[root@m01 ~]# mkdir /application

[root@m01 /server/tools]# mv mysql-5.7.26-linux-glibc2.12-x86_64 /application/mysql
```


**用户的创建处理原始环境**


```shell
[root@m01 ~]# yum remove mariadb-libs-5.5.64-1.el7.x86_64  #卸载mariadb软件包

[root@m01 ~]# rpm -qa |grep mariadb

[root@m01 ~]# useradd -s /sbin/nologin mysql
```


**数据和软件部分独立开 (贴近生产)**



![数据和软件部分独立开](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day01-4.png)



### **3.2 设置环境变量**


```shell
vim /etc/profile
export PATH=/application/mysql/bin:$PATH

[root@m01 ~]# source /etc/profile
[root@m01 ~]# mysql -V   #测试安装成功
mysql Ver 14.14 Distrib 5.7.26, for linux-glibc2.12 (x86_64) using EditLine wrapper
```


### **3.3 创建数据路径并授权**



**添加一块新磁盘模拟数据盘，格式化并挂载磁盘。**


```shell
[root@m01 ~]# mkfs.xfs /dev/sdc
[root@m01 ~]# mkdir /data
[root@m01 ~]# blkid  #查看硬盘UUID
[root@m01 ~]# vim /etc/fstab 
[root@m01 ~]# UUID="b7fde522-aa37-412a-9584-8313a673c5cc" /data xfs defaults 0 0
[root@m01 ~]# mount -a
[root@m01 ~]# df -h
```


**对目录授权**

```shell
 chown -R mysql.mysql /application/*
 chown -R mysql.mysql /data
```



### **3.4 初始化数据（创建系统数据）**



5.6 版本 数据库初始化命令：

```shell
 /application/mysql/scripts/mysql_install_db 
```


5.7 版本及之后版本数据库初始化命令：

```shell
[root@m01 ~]# mkdir /data/mysql/data -p 
[root@m01 ~]# chown -R mysql.mysql /data
[root@m01 ~]# mysqld --initialize --user=mysql --basedir=/application/mysql --datadir=/data/mysql/data 
```

<br>


**5.7 版本说明**

**--initialize 参数：** **做了什么？**

**对于密码复杂度进行定制：12位，4种** 

**密码过期时间：180天**

**给root@localhost用户设置临时密码**




<br>

<br>

```shell
报错:mysqld: error while loading shared libraries: libaio.so.1: cannot open shared object file: No such file or directory

解决：[root@m01 ~]# yum install -y libaio-devel
```

```shell
[root@m01 ~]# mysqld --initialize --user=mysql --basedir=/application/mysql --datadir=/data/mysql/data
2020-02-13T05:22:37.726244Z 1 [Note] A temporary password is generated for root@localhost: =srV_)56)s4s
```

<br>

<br>

**无临时密码方式 初始化方式**：

```shell
[root@m01 /data/mysql/data]# \rm -rf /data/mysql/data/*
[root@m01 ~]# mysqld --initialize-insecure --user=mysql --basedir=/application/mysql --datadir=/data/mysql/data
```


 **数据库配置文件的编写**

<br>

```shell
vim /etc/my.cnf 
[mysqld]
user=mysql
basedir=/application/mysql
datadir=/data/mysql/data
socket=/tmp/mysql.sock
server_id=6 
port=3306
[mysql]
socket=/tmp/mysql.sock
```

<br>

### **3.5 启动数据库**：


两种方式启动：


**1. sys-v** 

```shell
[root@db01 /etc/init.d]# cp /application/mysql/support-files/mysql.server /etc/init.d/mysqld 
[root@db01 /etc/init.d]# service mysqld restart
```



**2. systemd** 


注意： sysv方式启动过的话，需要先提前关闭，才能以下方式登录


```shell
cat >/etc/systemd/system/mysqld.service <<EOF
[Unit]
Description=MySQL Server
Documentation=man:mysqld(8)
Documentation=http://dev.mysql.com/doc/refman/en/using-systemd.html
After=network.target
After=syslog.target
[Install]
WantedBy=multi-user.target
[Service]
User=mysql
Group=mysql
ExecStart=/application/mysql/bin/mysqld --defaults-file=/etc/my.cnf
LimitNOFILE = 5000
EOF
```

<br>

<br>

### **3.6 如何分析处理无法启动问题**


without updating PID 类似错误 

**查看日志：**

`/data/mysql/data/主机名.err` 


**[ERROR] 上下文**

**可能情况：**

`/etc/my.cnf`  路径不对等

`/tmp/mysql.sock `文件修改过 或 删除过 

数据目录权限不是 mysql


![数据目录权限不是 mysql](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day01-5.png)


**第二种排错方法：**

数据库启动不了直接使用命令行启动 ，会把启动过程打印到屏幕

 

```shell
/application/mysql/bin/mysql --defaults-file=/etc/my.cnf
```



### **3.7 本地管理员密码的设定**


```shell
[root@db01 ~]# mysqladmin -uroot -p password xin123
Enter password: 
```

 

**管理员用户密码忘记了？**

临时性方法

`--skip-grant-tables 跳过授权表`

`--skip-networking  跳过远程登录`

 

**关闭数据库**

```shell
[root@db01 ~]# /etc/init.d/mysqld stop
Shutting down MySQL.. SUCCESS! 
```

 

**启动数据库到维护模式**

```
[root@db01 ~]# mysqld_safe --skip-grant-tables --skip-networking &
```


**登录数据库内并修改密码**


**第一种方法**

 

```sql
select user,host,authentication_string from mysql.user；
mysql.userflush privileges;
grant all on *.* to root@'localhost' identified by '1';
```

 

**第二种方法：**

```sql
mysql> alter user root@'localhost' identified by '1';
ERROR 1290 (HY000): The MySQL server is running with the --skip-grant-tables option so it cannot execute this statement
mysql> flush privileges;
mysql> alter user root@'localhost' identified by '1';

Query OK, 0 rows affected (0.01 sec)
```

 <br>

<br>

**关闭数据库，正常启动验证**

