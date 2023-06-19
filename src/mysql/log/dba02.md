---
title: 体系结构及管理
##intro:  集群架构环境统一规划说明
##featured_image: ss5.jpg
tag: 
    - DBA
    - RDBMS
category: 
 - DBA
date: 2020-7-12 12:43:01
---
#  体系结构及管理





## 1. MySQL C/S结构介绍

<br>

**两种连接方式：**

**TCP/IP：**`mysql -uroot -xin123 -h 10.0.0.51 -P3306`

**Socket：**`mysql -uroot -xin123 -S /tmp/mysql.sock`

<br>

<br>

## 2. MySQL实例的构成

<br>

**举例说明：**

**公司：** 老板 + 经理 + 员工 + 办公区

**实例：** mysqld + master thread + 干活的Thread + 预分配的内存

<br>



## 3. MySQL中 mysqld 进程结构

<br>

### **3.1 SQL语句引入**



**结构化的查询语言:**

- DQL 数据查询语言
- DDL 数据定义语言
- DML 数据操作语言
- DCL 数据控制语言

<br>

```sql
mysql> select user,host from mysql.user;
```

<br>

### **3.2** **连接层**

<br>

1. **提供连接协议** (两种方式)

​      Socket

​      TCPIP



2. 验证用户名（`root@localhost`）密码合法性，进行匹配专门的授权表。

3. 派生一个专用连接线程（接收SQL，返回结果）

​      使用命令  `mysql> show processlist;` 查看

<br>

**思考：**

**忘记密码的参数在哪做的手脚？**

```
--skip-grant-tables
--skip-networking
```

<br>

### 3.3 SQL层（在优化方面至关重要）

<br>

- 验证SQL语法和SQL_MODE
- 验证语义
- 验证权限
- 解析器进行语句解析，生成执行计划（解析树）
- 优化器（各种算法，基于执行代价），根据算法，找到代价最低的执行计划。代价是指：CPU 磁盘 IO
- 执行器按照优化器选择执行计划，执行SQL语句，得出获取数据的方法。
- 提供query cache(默认不开)，一般不开，会用redis
- 记录操作日志（binlog），默认没开

<br>

### **3.4** **存储引擎层**

**真正和磁盘打交道的一个层次**

根据SQL层提供的取数据的方法，拿到数据，返回给SQL，结构化成表，再又连接层线程返回给用户。

<br>

### **3.5 MySQL逻辑存储结构**

<br>

数据库逻辑结构与操作系统结构对照表：

| <img width=115/>数据库逻辑结构<img width=115/> | <img width=115/>操作系统<img width=115/> |
| ---------------------------------------------- | :--------------------------------------: |
| 库                                             |                Linux 目录                |
| create database wordpress charset utf8mb4;     |             mkdir /wordpress             |
| show databases;                                |                   ls /                   |
| use wordpress;                                 |              cd /wordpress               |
| 表                                             |               Linux 的文件               |
| 列（字段）                                     |                    无                    |
| 列属性                                         |                    无                    |
| 数据行（记录）                                 |               Linux数据行                |
| 表属性（元数据）                               |              Linux 文件属性              |

<br>

<br>

### **3.6 MySQL物理存储结构**

<br>

<br>

**库：** 使用文件系统上的目录来表示

<br>

**表：**

- **MyISAM(类似ext2)**<br>
  user.frm ： 存储的表结构（列，列属性）<br>
  user.MYD : 存储的数据记录<br>
  user.MYI ： 存储索引<br>

<br>

- **InnoDB(类似XFS)<br>**
  time_zone.frm ： 存储的表结构（列，列属性）<br>
  time_zone.ibd ： 存储的数据记录和索引<br>
  ibdata1 : 数据字典信息<br>

<br>

### **3.7 innodb** 段 区 页概念

<br>

- 一般情况下（非分区表）
- 一个表就是一个段
- 一个段由多个区构成
- 一个区在（16k），64个连续的页，1M大小

<br>

## 4. 用户和权限管理

### 4.1作用

<br>

- 登录MySQL

- 管理MySQL

  <br>

### **4.2** 用户的定义

<br>

```sql
--用户名@'白名单'
wordpress@'%'
wordpress@'localhost'
wordpress@'127.0.0.1'
wordpress@'10.0.0.%'
wordpress@'10.0.0.5%'
wordpress@'10.0.0.0/255.255.254.0'
wordpress@'10.0.%'
```

<br>

### 4.3 用户的操作

#### 4.3.1 创建用户

<br>

```sql
mysql> create user oldboy@'10.0.0.%' identified by '123';
Query OK, 0 rows affected (0.00 sec)
```

**说明：**

8.0以前，可以自动创建用户并授权

```sql
mysql> grant all on *.* to oldguo@'10.0.0.%' identified by '123';
```

<br>

#### 4.3.2 查询用户

```sql
mysql> select user,host from mysql.user;
```

<br>

#### 4.3.3 修改用户密码

```sql
mysql> alter user oldguo@'10.0.0.%' identified by '123456';
```

<br>

#### 4.3.4 删除用户

```sql
mysql> drop user oldguo@'10.0.0.%' ;
```

<br>



### 4.4 权限管理

#### 4.4.1 权限列表

<br>



```sql
ALL 
SELECT,INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, SHUTDOWN, PROCESS, FILE, REFERENCES, INDEX, ALTER, SHOW DATABASES, SUPER, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, REPLICATION SLAVE, REPLICATION CLIENT, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, CREATE USER, EVENT, TRIGGER, CREATE TABLESPACE
with grant option --授权管理权限
```

<br> 

#### 4.4.2 授权命令

```sql
grant all on *.* to oldguo@'10.0.0.%' identified by '123' with grant option;
 
grant 权限 on 作用目标 to 用户 identified by 密码 with grant option;
 
grant SELECT,INSERT, UPDATE, DELETE, CREATE on wordpress.* to 
 
-- 作用目标:
*.*
wordpress.* 
worpress.t1 
```

<br>

#### 4.4.3 授权需求

<br>

1. 创建一个管理员用户root，可以通过10网段，管理数据库.

```sql
grant all on *.* to root@'10.0.0.%' identified by '123' with grant option;
```



2. 创建一个应用用户wordpress，可以通过10网段，wordpress库下的所有表进行 `SELECT,INSERT, UPDATE, DELETE` 操作

```sql
grant SELECT,INSERT, UPDATE, DELETE on wordpress.* to wordpress@'10.0.0.%' identified by '123';
```

<br>

#### 4.4.4 回收权限

```sql
show grants for wordpress@'10.0.0.%';
mysql> revoke delete on wordpress.* from 'wordpress'@'10.0.0.%';
mysql> show grants for wordpress@'10.0.0.%';
```

<br>

<br>

#### 4.4.5 关于生产中开用户

<br>

**如何沟通开用户**

- 是否有邮件批复
- 对哪些库和表做操作
- 做什么操作
- 从什么地址来登录

<br>



**开发人员找你要root用户密码？**

- 走流程拒绝他
- 如果是金融类的公司

<br>

<br>



- **原则上是不允许任何非DBA人员持有或申请root**
- **如果有人私下索要root密码，及时举报。**

<br>

<br>

## 5. MySQL的启动和关闭

<br>


![MySQL的启动和关闭](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section2-2-1.png)

**把 mysql.server 拷贝到了 init.d下**

<br>

<br>

![把 mysql.server 拷贝到了 init.d](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section2-2-2.png)

<br>



### 5.1 日常启停

<br>

```sql
sys -v 启动方式 mysql.server start 脚本   启动过程：调用---> mysqld_safe --->启动实例 mysqld 
mysql.service   ---> mysqld 直接调用 mysqld 指定配置文件
```

<br>


![调用mysqld"](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section2-2-3.png)

需要依赖于 **/etc/my.cnf**

<br>


### 5.2 维护性的任务方式启动

<br>

```sql
mysqld_safe --skip-grant-tables --skip-networking &
```

<br>

- 启动时在命令行临时加入命令。

- 我们一般会将我们需要的参数临时加到命令行。也会读取`/etc/my.cnf` 的内容,但是如果冲突,命令行优先级最高。

  <br>


```shell
 mysqld_safe &
 mysqladmin -uroot -p123 shutdown 
```



<br>

<br>

### 5.3 初始化配置

<br>

#### 5.3.1 作用

- 影响数据库的启动
- 影响到客户端的功能

<br>

#### 5.3.2 初始化配置的方法

<br>

- 初始化配置文件(例如`/etc/my.cnf`)
- 启动命令行上进行设置(例如:`mysqld_safe mysqld`)
- 预编译时设置(仅限于编译安装时设置)
  <br>

#### 5.2.3 初始化配置文件的书写格式

<br>

```sh
[标签]
xxx=xxx
[标签]
xxx=xxx
```

<br>

#### 5.2.4 配置文件标签的归类

<br>

```yml
服务器端:
[mysqld]
[mysqld_safe]
[server]
 
客户端: 
[mysql]
[mysqladmin]
[mysqldump]
[client]
```

<br>

#### 5.2.5 配置文件设置样板（5.7版本)

<br>

**服务器端配置**

```shell
[mysqld]
#用户
user=mysql  
#软件安装目录        
basedir=/application/mysql 
#数据路径
datadir=/data/mysql/data 
#socket文件位置
socket=/tmp/mysql.sock
#服务器id号 用于主备
server_id=6
#端口号
port=3306
```

<br>

**客户端配置**

```sh
[mysql]
#socket文件位置
socket=/tmp/mysql.sock
```

<br>

###  5.4 配置文件读取顺序

<br>

```sql
mysqld --help --verbose |grep my.cnf
/etc/my.cnf /etc/mysql/my.cnf /usr/local/mysql/etc/my.cnf ~/.my.cnf 
```

<br>

**强制使用自定义配置文件**

```sql
--defautls-file 
mysqld_safe --defaults-file=/tmp/aa.txt &
```

<br>

### 5.5 MySQL的连接管理

<br>

#### 5.5.1 mysql 命令

<br>

**注意:提前应该将用户授权做好**

```sql
mysql> grant all on *.* to root@'10.0.0.%' identified by '123';
TCPIP :
mysql -uroot -p -h 10.0.0.51 -P3306 
Socket 
mysql -uroot -p -S /tmp/mysql.sock
show processlist; 查看登录情况
```

<br>

####  5.5.2 客户端工具

- **sqlyog**
- **navicat**


![客户端工具](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section2-2-4.png)
<br>

<br>

## 6. 多实例管理

<br>

### 6.1 准备环境

<br>

**准备多个目录**

<br>

```sh
mkdir -p /data/330{7,8,9}/data
```

<br>

**准备多个配置文件**

<br>

**实例一配置文件**

```php
cat > /data/3307/my.cnf <<EOF

[mysqld]

basedir=/application/mysql

datadir=/data/3307/data

socket=/data/3307/mysql.sock

log_error=/data/3307/mysql.log

port=3307

server_id=7

log_bin=/data/3307/mysql-bin

EOF
```

<br>

**实例二配置文件**

```php
cat > /data/3308/my.cnf <<EOF

[mysqld]

basedir=/application/mysql

datadir=/data/3308/data

socket=/data/3308/mysql.sock

log_error=/data/3308/mysql.log

port=3308

server_id=8

log_bin=/data/3308/mysql-bin

EOF
```

<br>

**实例三配置文件**

```php
实例三配置文件 

cat > /data/3309/my.cnf <<EOF

[mysqld]

basedir=/application/mysql

datadir=/data/3309/data

socket=/data/3309/mysql.sock

log_error=/data/3309/mysql.log

port=3309

server_id=9

log_bin=/data/3309/mysql-bin

EOF
```

<br>

<br>

### 6.2 初始化三套数据

<br>

```bash
mv /etc/my.cnf /etc/my.cnf.bak
mysqld --initialize-insecure --user=mysql --datadir=/data/3307/data --basedir=/application/mysql
mysqld --initialize-insecure --user=mysql --datadir=/data/3308/data --basedir=/application/mysql
mysqld --initialize-insecure --user=mysql --datadir=/data/3309/data --basedir=/application/mysql
```

<br>

### 6.3 Systemd 命令管理多实例

<br>

```bash
cd /etc/systemd/system

cp mysqld.service mysqld3307.service

cp mysqld.service mysqld3308.service

cp mysqld.service mysqld3309.service

 

vim mysqld3307.service

# 修改为:

ExecStart=/application/mysql/bin/mysqld --defaults-file=/data/3307/my.cnf

vim mysqld3308.service

# 修改为:

ExecStart=/application/mysql/bin/mysqld --defaults-file=/data/3308/my.cnf

vim mysqld3309.service

# 修改为:

ExecStart=/application/mysql/bin/mysqld --defaults-file=/data/3309/my.cnf


[root@db01 system]# grep "ExecStart" mysqld3309.service

ExecStart=/application/mysql/bin/mysqld --defaults-file=/data/3309/my.cnf

[root@db01 system]# grep "ExecStart" mysqld3308.service

ExecStart=/application/mysql/bin/mysqld --defaults-file=/data/3308/my.cnf

[root@db01 system]# grep "ExecStart" mysqld3307.service

ExecStart=/application/mysql/bin/mysqld --defaults-file=/data/3307/my.cnf
```



<br>

**对目录授权**

```bash
chown -R mysql.mysql /data/
```

<br>

### 6.4 启动多实例

<br>

```bash
systemctl start mysqld3307.service
systemctl start mysqld3308.service
systemctl start mysqld3309.service
```

<br>

<br>

**验证多实例**

```bash
netstat -lnp|grep 330

mysql -S /data/3307/mysql.sock -e "select @@server_id"
mysql -S /data/3308/mysql.sock -e "select @@server_id"
mysql -S /data/3309/mysql.sock -e "select @@server_id"
```



