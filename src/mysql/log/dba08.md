---
title: 高可用架构方案
tag: 
    - DBA
        - RDBMS
        - 高可用
category: 
- DBA
date: 2020-7-21 2:13:01
---

# MySQL Replication



#高可用架构方案

- 负载均衡：有一个定的高可用性

​       LVS  Nginx

- 主备系统：有高可用性，但是需要别换，是单活的构架

​       KA ， MHA ,MMM

- 真正的高可用（多活系统）

​       NDB Cluster Oracle RAC Sysbase cluster ，InnoDB Cluster （MGR） ，PXC , MGC

<br>

## 1. 职责介绍

- 搭建主从复制   
- 主从原理熟悉   
- 主从的故障处理 
- 主从延时 	
- 主从的特殊架构的配置使用 
- 主从架构的演变 

<br>

<br>

## 2. 主从复制介绍

(1) 主从复制基于binlog来实现的
(2) 主库发生新的操作,都会记录binlog
(3) 从库取得主库的binlog进行回放
(4) 主从复制的过程是异步

<br>

<br>

## 3. 主从复制的前提 (搭建主从复制) 

(1) 2个或以上的数据库实例
(2) 主库需要开启二进制日志 
(3) server_id要不同,区分不同的节点
(4) 主库需要建立专用的复制用户 (replication slave)
(5) 从库应该通过备份主库,恢复的方法进行"补课"
(6) 人为告诉从库一些复制信息(ip port user pass,二进制日志起点)
(7) 从库应该开启专门的复制线程

<br>

<br>

## 4.主从复制搭建过程(生产)

### 4.1 准备多实例

```shell
pkill mysqld 
systemctl start mysqld3307
\rm -rf /data/3308/data/*
\rm -rf /data/3308/mysql-bin.*
mysqld --initialize-insecure --user=mysql --basedir=/application/mysql --datadir=/data/3308/data 初始化数据库
systemctl start mysqld3308
mysql -S /data/3308/mysql.sock -e "select @@port"   查看端口
mysql -uroot -p123 -S /data/3307/mysql.sock -e "select @@port"; 

3307主库 3308从库
```

<br>

### 4.2 检查配置文件

**主库**: 二进制日志是否开启

两个节点: `server_id`

```shell
cat /data/3308/my.cnf 
[mysqld]
basedir=/application/mysql
datadir=/data/3308/data
socket=/data/3308/mysql.sock
log_error=/data/3308/mysql.log
port=3308
server_id=8
log_bin=/data/3308/mysql-bin
```

```shell
cat /data/3307/my.cnf 
[mysqld]
basedir=/application/mysql
datadir=/data/3307/data
socket=/data/3307/mysql.sock
log_error=/data/3307/mysql.log
port=3307
server_id=7  主库要小些
log_bin=/data/3307/mysql-bin
[root@db01 data]# 
```

<br>

<br>



### 4.3 主库创建复制用户

```shell
mysql -uroot -p123 -S /data/3307/mysql.sock -e "grant replication slave on *.* to repl@'10.0.0.%' identified by '123'"
```

<br>

<br>



### 4.4 补课

主库数据做备份恢复到从库

**主**: 

```shell
mysqldump -uroot -p123 -S /data/3307/mysql.sock -A --master-data=2 --single-transaction -R -E --triggers >/tmp/full.sql
```

**从**:

```shell
mysql -S /data/3308/mysql.sock 
mysql> set sql_log_bin=0;
mysql> source /tmp/full.sql
```

<br>

<br>



### 4.5 告诉从库信息

从库：

```shell
help change master to
mysql -S /data/3308/mysql.sock 

CHANGE MASTER TO 
MASTER_HOST='10.0.0.51', 地址或域名
MASTER_USER='repl', 用户名
MASTER_PASSWORD='123',  密码
MASTER_PORT=3307,  端口号
MASTER_LOG_FILE='mysql-bin.000004', 二进制日志
MASTER_LOG_POS=444,
MASTER_CONNECT_RETRY=10; 自动重连次数
```

```shell
vim /tmp/full.sql 查看日志提取备份记录点
-- CHANGE MASTER TO MASTER_LOG_FILE='mysql-bin.000004', MASTER_LOG_POS=444;
```



<br>

<br>





### 4.6 从库开启复制线程(IO,SQL)

```shell
mysql -S /data/3308/mysql.sock 
mysql> start slave;
```



### 4.7 检查主从复制状态

```shell
mysql -S /data/3308/mysql.sock 
mysql> show slave status \G
            Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
```

主库:

```shell
mysql -uroot -p123 -S /data/3307/mysql.sock -e "create database alexsb"
```

从库:

```shell
mysql -S /data/3308/mysql.sock -e "show databases"
```





<br>

<br>





## 5.主从复制原理

<br>



### 5.1 主从复制中涉及的文件

<br>



**主库**: 
	`binlog` 

**从库**: 
	`relaylog`  中继日志
	`master.info`  主库信息文件
	`relaylog.info relaylog`   从库应用的信息



### 5.2 主从复制中涉及的线程

**主库**:
	`Binlog_Dump Thread : DUMP_T`

**从库**: 
	`SLAVE_IO_THREAD     : IO_T`
	`SLAVE_SQL_THREAD    : SQL_T`

<br>



<br>



### 5.3 主从复制工作(过程)原理

<br>



1. 从库执行change master to 命令(主库的连接信息+复制的起点)
2. 从库会将以上信息,记录到master.info文件
3. 从库执行 start slave 命令,立即开启IO_T和SQL_T
4. 从库 IO_T,读取master.info文件中的信息获取到IP,PORT,User,Pass,binlog的位置信息
5. 从库IO_T请求连接主库,主库专门提供一个DUMP_T,负责和IO_T交互
6. IO_T根据binlog的位置信息(mysql-bin.000004 , 444),请求主库新的binlog
7. 主库通过DUMP_T将最新的binlog,通过网络TP给从库的IO_T
8. IO_T接收到新的binlog日志,存储到TCP/IP缓存,立即返回ACK给主库,并更新master.info
9. IO_T将TCP/IP缓存中数据,转储到磁盘relaylog中.
10. SQL_T读取relay.info中的信息,获取到上次已经应用过的relaylog的位置信息
11. SQL_T会按照上次的位置点回放最新的relaylog,再次更新relay.info信息
12. 从库会自动purge应用过relay进行定期清理

<br>

![主从搭建原理](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section8-1.png)

<br>

**补充说明**:

一旦主从复制构建成功,主库当中发生了新的变化,都会通过dump_T发送信号给IO_T,增强了主从复制的实时性.



### 5.4 主从复制监控

<br>

命令:

```sql
show slave status \G 从库执行

主库有关的信息(master.info):
Master_Host: 10.0.0.51
Master_User: repl
Master_Port: 3307
Connect_Retry: 10
*******************************
Master_Log_File: mysql-bin.000004
Read_Master_Log_Pos: 609
*******************************
```



![主从状态监控](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section8-1-1.png)

<br>

<br>

**从库relay应用信息有关的**(`relay.info`):



```shell
Relay_Log_File: db01-relay-bin.000002
Relay_Log_Pos: 320  #上次已经运行到320
Relay_Master_Log_File: mysql-bin.000004 #对应主库binlog文件
```

<br>

**从库线程运行状态(排错)**

```shell
Slave_IO_Running: Yes
Slave_SQL_Running: Yes
Last_IO_Errno: 0
Last_IO_Error: 
Last_SQL_Errno: 0
Last_SQL_Error: 	
```

​		<br>

<br>			
**过滤复制有关的信息**:			

```sql
Replicate_Do_DB: 
Replicate_Ignore_DB: 
Replicate_Do_Table: 
Replicate_Ignore_Table: 
Replicate_Wild_Do_Table: 
Replicate_Wild_Ignore_Table: 
```

<br>
**从库延时主库的时间(秒)**:  

```sh
Seconds_Behind_Master: 0
```

<br>				

**延时从库**:

```sh
SQL_Delay: 0
SQL_Remaining_Delay: NULL
```

<br>

**GTID复制有关的状态信息**		  

```sh
Retrieved_Gtid_Set: 
Executed_Gtid_Set: 
Auto_Position: 0
```

<br>

<br>

### 5.5 主从复制故障 

<br>

#### 5.5.1 IO 线程故障 

(1) 连接主库: connecting

网络,连接信息错误或变更了,防火墙,连接数上线

**排查思路**:

1. 使用复制用户手工登录

  ```sh
  mysql -urepl -p12321321 -h 10.0.0.51 -P 3307
  mysql: [Warning] Using a password on the command line interface can be insecure.
  ERROR 1045 (28000): Access denied for user 'repl'@'db01' (using password: YES)
  ```

  

密码错误

```sh
mysql -urep -p123 -h 10.0.0.51 -P 3307
mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 1045 (28000): Access denied for user 'rep'@'db01' (using password: YES)
```

用户名错误

```sh
mysql -urepl -p123 -h 10.0.0.52 -P 3307
mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 2003 (HY000): Can't connect to MySQL server on '10.0.0.52' (113)
```

ip地址错误

```sh
mysql -urepl -p123 -h 10.0.0.51 -P 3309
mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 2003 (HY000): Can't connect to MySQL server on '10.0.0.51' (111)
[root@db01 data]# 
```


端口错误

解决: 
```sql
stop slave 
reset slave all; 清空 master.info信息
change master to 
start slave
```



(2) 请求Binlog

binlog 没开
binlog 损坏,不存在，不完整

主库 reset master 处理: （清理binlog日志）
从库 

```sql
stop slave ;
reset slave all; 
CHANGE MASTER TO 
MASTER_HOST='10.0.0.51',
MASTER_USER='repl',
MASTER_PASSWORD='123',
MASTER_PORT=3307,
MASTER_LOG_FILE='mysql-bin.000001',
MASTER_LOG_POS=154,
MASTER_CONNECT_RETRY=10;
start slave;
```

(3) 存储binlog到relaylog

<br>

#### 5.5.2 SQL线程故障



- relay-log 损坏
- 回放 relaylog

**实际上就是 研究一条SQL语句为什么执行失败**?

```sql
insert delete  update     ---> t1 表 不存在
create table  xin     --->  xin 已存在
```

**约束冲突(主键,唯一键,非空..)**

**合理处理方法**: 
把握一个原则,一切以主库为准进行解决.
如果出现问题,尽量进行反操作
最直接稳妥办法,重新构建主从

**暴力的解决方法**
方法一：

```shell
stop slave; 
set global sql_slave_skip_counter = 1;
start slave;
```

#将同步指针向下移动一个，如果多次不同步，可以重复操作。
start slave;

方法二： 直接写在配置文件里面 跳过以下错误

```sh
/etc/my.cnf
slave-skip-errors = 1032,1062,1007

#常见错误代码:
1007:对象已存在
1032:无法执行DML
1062:主键冲突,或约束冲突
```

但是，以上操作有时是有**风险**的，最安全的做法就是重新构建主从。把握一个原则,一切以主库为主.



<br>

**对于主键冲突问题**：

错误的在从库插入的已有数据行的主键值重复导致主从不同步

**解决方法**：找到主从两个数据库手动改为一致后 跳过

<br>

<br>



**为了很大程度的避免SQL线程故障**

(1) 从库只读

**read_only**
**super_read_only**


![从库只读](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section8-1-2.png)


(2) 使用读写分离中间件

- atlas 
- mycat
- ProxySQL 
- MaxScale

写得数据发往主库，读的操作发往从库





## 6. 主从延时监控及原因 

### 6.1 主库方面原因

(1) binlog写入不及时

`sync_binlog=1` 直接刷写到磁盘

(2) 默认情况下dump_t 是串行传输 binlog 
在并发事务量大时或者大事务,由于dump_t 是串型工作的,导致传送日志较慢

由于串行工作大事务导致阻塞会越堆越多

**如何解决问题**?
必须GTID,使用**Group commit**方式.可以支持DUMP_T并行



(3) 主库极其繁忙
慢语句
锁等待
从库个数
网络延时



### 6.2 从库方面原因


(1) 传统复制(Classic)中

主库并发事务，但是从库SQL还是单线程。

如果主库并发事务量很大,或者出现大事务
由于从库是单SQL线程,导致,不管传的日志有多少,只能一次执行一个事务.
5.6 版本,有了GTID,可以实现多SQL线程,但是只能基于不同库的事务进行并发回放.(database)  （不能保证同一库内事务无法保证顺序按一定逻辑顺序执行）

所以在 5.7 版本中,有了增强的GTID,增加了seq_no（通线程下的序列号码）标记,增加了新型的并发SQL线程模式(logical_clock),MTS技术   逻辑时钟


![从库的SQL工作线程](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section8-1-3.png)

从库的SQL工作线程



(2) 主从硬件差异太大
(3) 主从的参数配置
(4) 从库和主库的索引不一致
(5) 版本有差异



<br>


## 7. 主从延时的监控

```sql
show slave  status\G
Seconds_Behind_Master: 0
```

<br>

**主库方面原因的监控**

**主库**: 传输了这些

```
mysql> show master status ;
File: mysql-bin.000001
Position: 1373
```

<br>

**从库**: 接收了这些

```sql
Master_Log_File: mysql-bin.000001
Read_Master_Log_Pos: 1373
```



**主库对应从库的Position 号是否一致**



**从库方面原因监控**:

拿了多少:

```
Master_Log_File: mysql-bin.000001
Read_Master_Log_Pos: 691688
```

看的是binlaog  从库对应的Relay_log 号 找对应关系

执行了多少:

```
Relay_Log_File: db01-relay-bin.000004
Relay_Log_Pos: 690635
Exec_Master_Log_Pos: 691688
Relay_Log_Space: 690635
```



