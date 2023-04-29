---
title: 逻辑备份与恢复
##intro:  集群架构环境统一规划说明
##featured_image: ss5.jpg
tags: 
    - DBA
    - RDBMS
categories: 
 - DBA
date: 2020-7-20 2:13:01
---
# 逻辑备份与恢复

## 1. 上节回顾

<br>

### 1.1  日志 

**binlog** 如何开启?

`binlog_format=row`    SBR 模式参数   

<br>

**RBR 与 SBR  模式之间的区别**：

例如要更新大于2000的数据行 ，此时需要更新1000行数据，RBR记录每一行的变化，SBR则只记录这一条命令，但是SBR有可能会记录错误的日志，如在函数 now 当前时间的命令会有错误。

 <br>

 <br>



**双一标准的其中一个**：

`sync_binlog=1` 每次事务提交都立即刷写binlog到磁盘 

  <br>

**双一标准的另一个：**

`innodb_flush_log_at_trx_commit=1`    在事务提交时刷写 redo 到磁盘策略 

**查看日志：**

```sql
show master status ;
show binlog events in '日志名称'
```

非GTID 截取日志

```sh
mysqlbinlog --start-position  --stop-position  #截取日志
--base64-output=decode-rows  -vvv  #(--help可以查到)   翻译成人话
```

 <br>

 <br>

 **GTID** 5.6版本出现 **5.7版本** 推荐使用

 <br>

**GTID的开启和配置**

```sh
vim /etc/my.cnf
gtid-mode=on
enforce-gtid-consistency=true #强制gtid一致性
```

 <br>

```sql
不知道参数的情况下：
mysql> show variables like '%gtid%'; --查看GTIT有有关的参数
```

 <br>

```sh
# mysqlbinlog --help |grep gtid 帮助
 --skip-gtids  跳过GTIP检查 导出日志时不记录日志  
 --include-gtids=''   想截取哪一段日志
 --exclude-gtids=''  想排除哪一段日志
 
set sql_log_bin=0;    临时关闭当前窗口的二进制日志
source ..             恢复命令
```

  <br>

 

**幂等性**：在数据恢复时检查幂等性功能做过的事情就不会再做了

 <br>

 <br>

### 1.2 二进制日志清理

  <br>

### 1.2.1 自动清理

**设置的依据**: 至少1轮全备周期长度的过期时间.  7天一个全备 两轮加一天

```sh
show variables like '%expire%'；
expire_logs_days=15 
```


![日志清理1](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-1.png)



 <br>

 <br>

### 1.2.2 手动清理

```sql
mysql> help purge --手工
PURGE BINARY LOGS TO 'mysql-bin.000032'; --删除到那个日志为止
PURGE BINARY LOGS BEFORE '2008-04-02 22:46:26'; --按照时间删除
mysql> reset master ; --全清了 主从主库绝对不能删
```


![日志清理2](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-1-1.png)

 <br>

 <br>

### 1.3 **日志如何滚动**

 <br>

```sql
 flush logs; --重新的一个文件开始记录日志
```

 

**数据库重启**

```sql
show variables like '%max%'
max_binlog_size=1073741824  --二进制文件的最大大小
```

  <br>

  <br>

### 1.4 slow log 慢语句分析

 <br>

慢语句开关

![慢语句开关](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-1-2.png)


 <br>

文件位置



```sql
mysql> show variables like 'slow_query_log%';
```


![慢语句位置](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-1-3.png)

 <br>

![慢语句位置](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-1-4.png)


![慢语句位置](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-1-5.png)

```sql
mysql> show variables like 'long%'; --时间阈值超过这个时间就算慢语句
mysql> show variables like '%using_indexes%'; --是否记录不走索引的语句
```

```sql
mysqldumpslow -s c -t 10 /xxxxx --分析慢语句
```

 <br>

 <br>



### 1.5 innodb 核心参数 

**双一参数**

```sh
innodb_flush_log_at_trx_commit=1  #最安全模式 为1时每次提交事务都刷新到磁盘
innodb_flush_method=o_direct      #数据刷新到磁盘绕过系统缓存由于不走缓存性能较慢 直通模式
innodb_flush_log_at_trx_commit=0  #最高性能模式
innodb_flush_method=fsync         #为0 时事务每秒刷写到磁盘不管提交没提交
                                  #但是每秒发生无数事务断电可能导致事务丢失。 
```

 <br>

 <br>

## 2. 在备份恢复中的职责

 <br>

### 2.1 备份策略的设计

通过三个方面设计 

**(1) 备份周期:** 

根据数据量设计备份周期 



**例如**：

60G数据大小所需备份时间大约为30分钟尽量每天备份一次

而到达 9T 数据量就应该是按照每周备份一次了。

  <br>

 **(2)备份工具**:

- mysqldump (MDP) 用于每天 
- XBK (PBK) percona Xtrabackup 用于每周 
- MEB(MySQL Enterprise BACKUP MEB官方企业版工具) 
- MySQL binlog 二进制日志截取恢复

  <br>

**(3)备份方式**:

**逻辑备份**:

- 全备  mysqldump 整个备份
- 增量  binlog (flush logs 滚动日志拷贝最后一个文件之前的日志 ,cp靠走) 增量备份

 

 <br>

**物理备份**:

- 全备 : XBK 
- 增量 : XBK



 <br>

### 2.2 检查备份可用性

 <br>

一般晚上11点执行 



**检查流程**：

- crontab -l 
- 备份脚本 
- 备份路径 
- 看备份日志,检查备份文件(大小,内容)
- 定期的恢复演练

  <br>

 <br>



 

### 2.3 数据恢复

只要备份和日志是完整的,恢复到故障之前的时间点(快速)

 <br>

 <br>

### 2.4 数据迁移



**操作系统不同的迁移**



- mysql 同平台迁移 
- 其他操作系统数据库软件  迁移到 mysql  异构平台
- mysql  迁移到  其他操作系统数据库软件

  <br>

 <br>

### 2.5 备份情况介绍

 <br>

- 热备 : 对于业务影响最小  InnoDB
- 温备 : 长时间锁表备份   MyISAM
- 冷备 : 业务关闭情况下备份 

 <br>



## 3 . 逻辑备份操作 

### mysqldump 参数介绍



### 3.1  **连接数据库参数** 

 <br>

- -u 指定用户登录 
- -p 账户密码
- -S 使用Soket文件登录
- -h 登录网段
- P 指定端口 

 <br>

### 3.2 基础备份参数

**-A**  **全备**

```shell
mysqldump -uroot -p123 -A >/backup/full.sql
```

  <br>

-**B** **单库**

```shell
mysqldump -uroot -p123 -B world oldguo wordpress >/backup/db.sql
```

 

  <br>

**分库分表备份**

```shell
mysqldump -uroot -p123 world city country > /backup/tab.sql
# 第一个是库名 其他都是表名
```

   <br>

  <br>

###  3.3 特殊备份参数

   <br>

- `-R` 存储过程和函数 类型与shell脚本
- `-E` 事件 类似Linux中计划任务
- `--triggers` 触发器
- `--master-data=2`  自动记录日志起点

   <br>

**案例模拟**：

备份计划每天全备，大约60G数据。有一次周三下午数据库损坏。

   <br>

**恢复思路**：

**1.首先找到周二的全备恢复**

**2.截取全备到损坏之前的 binlog**

**找起点问题**： 

`--master-data=2` 参数会自动把全备结束时二进制日志起点记下来但是他会自动锁表

**终点：**

查询二进制文件最后的位置

 

<br>

<br>

### 3.4 恢复 binlog

 <br>

(1) 记录备份时刻的binlog信息

(2) 自动锁表

不加`--single-transaction` ,全局锁表温备份，长时间锁表备份。

加了`--single-transaction`,对于InnoDB存储引擎的表不锁表备份，(快照备份)但是其他引擎锁表。

`--single-transaction` 对于InnoDB的表,进行一致性快照备份,不锁表. 备份的是快照的数据

  <br>

 <br>

## 4. 恢复案例

  <br>

### 4.1 背景环境

正在运行的网站系统，mysql-5.7.20 数据库，数据量50G，日业务增量1-5M。

  <br>

### 4.2 备份策略

每天23:00点，计划任务调用mysqldump执行全备脚本

 

  <br>

### 4.3 故障时间点

**年底故障演练**: 模拟周三上午10点误删除数据库.

 

   <br>

### 4.4  思路

  <br>

1. 停业务，挂维护页,避免数据的二次伤害
2. 找一个临时库，恢复周二 23：00 点的全备
3. 截取周二23：00 到 周三10点误删除之间的 binlog，恢复到临时库
4. 测试可用性和完整性
5.  **方法一** 直接使用临时库顶替原生产库，前端应用割接到新库
6.  **方法二** 将误删除的表导出，导入到原生产库
7. 开启业务
8. 经过20分钟的处理，最终业务恢复正常

 

  <br>

### 4.5  故障模拟演练

  <br>

#### 4.5.1 准备数据

```sql
create database backup;
use backup
create table t1 (id int);
insert into t1 values(1),(2),(3);
commit;
rm -rf /backup/*
```

 

#### 4.5.2 准备周二 23：00点的全备

 

```sql
mysqldump -uroot -p123 -A -R --triggers --set-gtid-purged=OFF --master-data=2 --single-transaction|gzip > /backup/full_$(date +%F).sql.gz
```

 

 

**检查备份可用性**

```shell
cd /backup/ ll*
#注意查看备份文件大小和时间点必要时打开文件查看是否备份正确
```


![检查备份完整性](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-1-7.png)

  <br>

#### 4.5.3 模拟周二 23：00到周三 10点之间数据变化

```sql
use backup
insert into t1 values(11),(22),(33);
commit;
create table t2 (id int);
insert into t2 values(11),(22),(33);
commit;
```

 

#### 4.5.4 模拟故障,删除表(只是模拟，不代表生产操作)

```sql
drop database backup;
```

   <br>

  <br>

### 4.6 恢复过程

#### 4.6.1 准备临时数据库（多实例3307）

```sql
systemctl start mysqld3307
```

 

#### 4.6.2 准备备份

（1）准备全备：

```shell
cd /backup
gunzip full_2018-10-14.sql.gz 
```

 

（2）截取二进制日志

```sql
 
-- CHANGE MASTER TO MASTER_LOG_FILE='mysql-bin.000002', MASTER_LOG_POS=753;
起点 753
show master status; --查看日志 
```

![查找日志起点](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-1-8.png)



```sql
#找终点 

show binlog event in "mysql-bin.000002" 
 
#找到终点为：1519 
 
#截取日志
mysqlbinlog --skip-gtids  --start-position=753 --stop-position=1519 /data/binlog/mysql-bin.000002 >/backup/bin.sql
```

 

#### 4.6.3 恢复备份到临时库

```sql
mysql -S /data/3307/mysql.sock
set sql_log_bin=0; --关闭二进制日志
source /backup/full_2019-07-15.sql
source /backup/bin.sql
```

 

#### 4.6.4 将故障表导出并恢复到生产

```sql
mysqldump  -S /data/3307/mysql.sock -B backup >/backup/bak.sql
mysql -uroot -p123 
set sql_log_bin=0
source /backup/bak.sql;
```

  <br>

  <br>

## 5.恢复练习



#### 5.1 创建一个数据库 test001

**检查日志是否开启** ： `select @@sql_log_bin;` 

```sql
create database test001 charset utf8mb4;
```

 

#### 5.2 在test001下创建一张表t1

 

```sql
use test001;
create table t1 (id int);
```

 

#### 5.3 插入5行任意数据

```sql
 insert into ti values (1),(2),(3),(4),(5);
```

 

#### 5.4 进行全备

```shell
cd /backup/ 
mysqldump -uroot -p123 -A --master-data=2 --single-transaction -R -E --triggers > /backup/full.sql
```

 

#### 5.5 检查备份完整性

```sh
vim full.sql  
```

![查看日志完整性](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-1-9.png)





#### 5.6 插入两行数据，任意修改3行数据，删除1行数据

```sql
insert into t1 values(6),(7),(8);
commit;
update t1 set id=10 where id > 5
commit;
delete from t1 where id=5;
commit;
```

 

#### 5.7 删除所有数据

```sql
delete from t1;
commit;
```

 

#### 5.8 再t1中又插入5行新数据，修改3行数据

```sql
insert into t1 values(1),(2),(3),(4),(5);
commit;
update t1 set id=10 where id>2;
commit;
```

 

**需求**：跳过第六步恢复表数据，（第六步为错误插入数据 需要排除）

**确认**：1-5 步操作 是日志 12 -17 号 跳过第六步是15号


![跳过第六步恢复表数据](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-1-10.png)



#### 5.9 按照需求恢复数据

```sql
 set sql_log_bin=0  --关闭日志
 source /backup/full.sql --恢复全备
```



## 6.扩展参数

 

在构建主从时,使用 AUTO/ON

`--set-gtid-purged=AUTO/ON`

 仅是做普通的本机备份恢复时,可以添加

`--set-gtid-purged=OFF` 

`SET @@GLOBAL.GTID_PURGED='aa648280-a6a6-11e9-949f-000c294a1b3b:1-11';`

`--max_allowed_packet=128M` 控制的是备份时传输数据包的大小.

```shell
mysqldump -uroot -p123 -A -R --max_allowed_packet=128M --triggers --set-gtid-purged=OFF --master-data=2 --single-transaction|gzip > /backup/full_$(date +%F).sql.gz
```

