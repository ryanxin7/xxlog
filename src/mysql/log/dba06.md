---
title: 常用日志文件类型介绍
tag: 
    - DBA
    - RDBMS
category: 
 - DBA
date: 2020-7-18 2:13:01
---
# 常用日志文件类型介绍

## 日志管理

<br>


![日志管理1](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1.png)

<br>

- 错误日志是用来拍错
- 慢速查询用来调优
- 二进制日志恢复数据另外与主从复制相关

<br>

### **1. 错误日志**

#### 1.1 作用

用来排查 MySQL 服务运行过程中的故障。

<br>

<br>

#### 1.2 默认配置

**默认开启**

**默认路径和名字**: `datadir/hostname.err`

**查看方法**: `[ERROR]` 重点关注

<br>


![日志管理2](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-2.png)

<br>

#### 1.3 自定义日志存储位置



建议异地存放，日志位置和数据存储分开，避免目录磁盘坏了时日志文件也丢失了可能导致无法恢复。



![日志管理3](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-3.png)

`vim /etc/my.cnf`  添加到配置文件

![日志管理4](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-4.png)


可以看到已经有这个文件了


![日志管理5](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-5.png)

```sql
log_error=/tmp/mysql3306.log -- 重启生效
select @@log_error; --查询错误日志位置
```



<br>



1. ### 二进制日志（重要知识点:star2:）

<br>

#### 2.1 作用

- 部署主从复制依赖二进制日志
- 数据恢复时需要依赖于二进制日志



### 2.2 如何配置？

(1) 参数介绍

 默认没有开启需要手动定义开启。

```sh
server_id=6    一共65535
log_bin=/data/binlog/mysql-bin  设置二进制日志的位置
```



**说明**：

`/data/binlog` : 提前定制好的目录, 而且要有`mysql.mysql` 的权限
`mysql-bin` 	 : 二进制日志文件名的前缀
例如: `mysql-bin.000001`  ,`mysql-bin.000002` ......



(2) 参数配置

```sh
server_id=6
log_bin=/data/binlog/mysql-bin
binlog_format=row
```



(3) 创建目录和授权

```sh
mkdir -p /data/binlog/
chown -R mysql.mysql /data
```



(4)重启生效

```sh
[root@db01 tmp]# /etc/init.d/mysqld restart
Shutting down MySQL.. SUCCESS! 
Starting MySQL. SUCCESS! 
```

<br>

<br>

### 3. 二进制文件记录了什么？



#### 3.1 概括

记录的数据库所有变更类的操作日志  如：

- DDL 以语句的方式,原模原样的记录.
- DCL 以语句的方式,原模原样的记录.
- DML insert  update delete 操作 （记录的已提交的事务DML语句）



DML记录格式(statement,row,mixed),通过`binlog_format=row`参数控制

<br>

**说明:**

- **statement**:SBR,语句模式记录日志,做什么命令,记录什么命令.
- **row**  :RBR,行模式, 记录数据行的变化 记录数据行 由A=1 变成 A=2的变化过程 redo是记录数据页的变化
- **mixed**:MBR,混合模式由MySQL自己调整决定用那种模式 。 一般不用



<br>

**面试问题:** SBR和RBR什么区别?  怎么选择?

**SBR**:  可读性较强,对于范围操作日志量少,但是可能会出现记录不准确的情况.          

**如**：`update t1 set name='zs'  where id > 5` 对五行数据进行修改，但只记录命令。

`instart into t1 values （1，'zs',now()）`; 时间列录入时是以前的时间，有可能出现记录不准确问题

<br>

**RBR**:  可读性较弱,对于范围操作日志大,不会出现记录错误.
	 
 高可用环境中的新特性要依赖于RBR
	
**如**：同一个语句要记录5行操作  哪一行变动了就记录几行
	
我们公司对数据的严谨性要求较高,也用用到了新型的架构,所以选择RBR。

<br>

<br>

### 4  二进制日志记录单元

#### 4.1 event 事件

二进制日志的最小单元

<br>

**如**：DDL   `create database xin;`  事件1

对于DDL等语句是每一个语句就是一个事件

<br>

而 DML: 一个事务包含了多个语句

`begin;`     事件1
`a` 			事件2
`b`			 事件3
`commit;`   事件4 

<br>



#### 4.2 event 事件的开始和结束位置



方便我们从日志中截取我们想要的日志事件.

<br>

<br>



### 5. 二进制日志的管理



#### 5.1 查看二进制日志存储位置

```sql
mysql> show variables like '%log_bin%';
```

<br>

![Section6-1-6.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-6.png)

![Section6-1-7.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-7.png)
<br>

#### 5.2 查看所有已存在的二进制日志

<br>

```sql
show binary logs;
flush logs; --滚动一个新的日志
show binary logs;
```

![Section6-1-8.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-8.png)


<br>

**查看正在使用的二进制日志**

```sql
mysql> show master status ;
```


![Section6-1-9.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-9.png)
<br>

**查看二进制日志事件** 

```sql
模拟建表操作
mysql> create database binlog charset utf8mb4;
mysql> use binlog
mysql> create table t1(id int);
mysql> insert into t1 values(1);
```

:hammer_and_wrench:注意：二进制日志只记录事务提交后的日志 



```sql
mysql> show master status ;
+------------------+----------+--------------+------------------+-------------------+
| File       | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000004 |   501 |       |         |          |
+------------------+----------+--------------+------------------+-------------------+
1 row in set (0.00 sec)
```



**查看日志：**

```sql
mysql> show binlog events in 'mysql-bin.000004' limit 5; 只看前五行内容
```



**前两行为二进制文件的头部格式信息何版本信息**



![Section6-1-10.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-10.png)



经过查找从第三行开始

根据Position号码截取事务 219-335 标识事务开始位置和结束位置

 只记录事务提交后的日志提交后：




![Section6-1-11.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-11.png)


#### 5.3 **查看二进制文件内容**



```sh
mysqlbinlog mysql-bin.000004 | grep -v '^SET'
```




![Section6-1-12.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-12.png)


**翻译一下：**

```sh
mysqlbinlog --base64-output=decode-rows -vvv mysql-bin.000004 
```

sssss


![Section6-1-13.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-13.png)

意思是 在1号列插入值1

```sh
mysqlbinlog -d haoge mysql-bin.000004 按库过滤日志 
```

<br>

#### 5.4 截取二进制日志

```sh
[root@db01 binlog]# mysqlbinlog --start-position=219 --stop-position=335 mysql-bin.000004 >/tmp/a.sql
```

<br>

#### 5.5 通过binlog恢复数据

只要二进制日志全就会恢复任何时间点的数据，因为记录日志还做一遍就恢复了

**(1) 模拟数据**

```sql
mysql> create database test11 charset utf8mb4;
mysql> use haoge;
mysql> create table t1(id int);
mysql> insert into t1 values(1);
mysql> commit;
```


**(2)模拟故障** 

```sql
mysql> drop database test11;
```



**(3)分析和截取 binlog**

```sql
mysql> show master status ;    		--->确认使用的是哪一个日志 确认是004号日志文件
mysql> show binlog events in 'mysql-bin.000004' ;   --->查看事件
```



![日志截取](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-14.png)

**说明:** 找到起点和终点,进行截取

```sh
mysqlbinlog --start-position=823 --stop-position=1420 /data/binlog/mysql-bin.000004 >/tmp/bin.sql
```


![日志截取2](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-15.png)


**(4) 恢复binlog**

```sql
mysql> set sql_log_bin=0;    --->在此会话中临时关闭二进制日志    避免恢复时产生的新日志
mysql> source /tmp/bin.sql
mysql> set sql_log_bin=1; set sql_log_bin=1;    --->改回来
```




![日志截取](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-16.png)


**问题来了， 如果业务跑了两年了，怎么找日志？** 

二进制虽然可以数据恢复，但是它的功能性上是有缺陷的导致它只能作为数据恢复的辅助手段

**如**： 全备份 +二进制日志恢复，先找到最新的全备份然后在用二进制日志恢复到今天的数据就行。

<br>

<br>



### 6. GTID 记录模式管理  :star:

#### 6.1 GTID 介绍

- 对于binlog中的每一个事务,都会生成一个GTID号码
- DDL ,DCL 一个event就是一个事务,就会有一个GTID号.

- DML语句来讲,begin到commit,是一个事务,就是一个GTID号

<br>

#### **6.2 GTID的组成**

由两部分组成
**severi_uuid:TID** 事务的号码

**severi_uuid** 在 `auto.cnf` 中查看

```sh
[root@db01 data]# cat auto.cnf 
[auto]
server-uuid=d60b549f-9e10-11e9-ab04-000c294a1b3b
```



**TID **是一个自增长的数据,从1开始  如：

```bash
d60b549f-9e10-11e9-ab04-000c294a1b3b:1-15
```

<br>

<br>

#### 6.3 GTID的幂等性

如果拿有GTID的日志去恢复时,检查当前系统中是否有相同GTID号,有相同的就自动跳过  

同Ansible剧本跳过同理会影响到binlog恢复和主从复制。

<br>

<br>

#### 6.4 GTID的开启和配置

```bash
vim /etc/my.cnf
gtid-mode=on
enforce-gtid-consistency=true 强制gtid一致性
```


![GTID](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-17.png)

**注意**：开启后止影响以后的事务 以前的管不着

<br>


#### 6.5 查看GTID信息

```sql
mysql> create database gtid charset utf8mb4; 创建一个库
mysql> show master status; 查看gtid号码 已经产生gtid
mysql> use gtid;
mysql> create table t1(id int); 创建一个表
mysql> show master status;  查看gtid号码 已经产生gtid 1-2
```


![GTID2](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-18.png)


```sql
mysql> insert into t1 values(1);
mysql> commit;
mysql> show master status; 
```

**提交之后才算一个事务**  


![GTID3](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-19.png)
<br>



**开了GTID 后的日志信息**

```sql
mysql> show binlog events in 'mysql-bin.000005' 
```



![GTID3](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-20.png)

<br>

<br>

### 7. 基于GTID 恢复数据

开启GTID 后只需截取GTID日志就可以了，GTID是全局事务唯一标号。

<br>

#### 7.1 **截取日志**

```sh
[root@db01 data]# cd /data/binlog/
[root@db01 binlog]# mysqlbinlog --include-gtids='d60b549f-9e10-11e9-ab04-000c294a1b3b:1-3' mysql-bin.000005 >/tmp/gtid.sql
```

<br>

#### 7.2 恢复数据

```sql
mysql> set sql_log_bin=0; 暂时关闭日志
mysql> source /tmp/gtid.sql 恢复
mysql> set sql_log_bin=1; 开启日志
```


![GTID恢复](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-21.png)
<br>

<br>

#### 7.3 报错



```sql
ERROR 1049 (42000): Unknown database 'gtid'
Query OK, 0 rows affected (0.00 sec)
ERROR 1046 (3D000): No database selected
```



![GTID恢复报错](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-22.png)
<br>

**为什么报错?**

因为幂等性的检查,1-3事务已经做过了。



**正确的做法**：

在导出的时候应该忽略GTID的幂等性。 当成新的事务来对待 1-4  跳过并记录新ID号

```bash
mysqlbinlog --skip-gtids --include-gtids='d60b549f-9e10-11e9-ab04-000c294a1b3b:1-3' mysql-bin.000005 >/tmp/gtid.sql
--skip-gtids 
```

**作用**:在导出时,忽略原有的gtid信息,恢复时生成最新的 GTID 信息

**恢复数据**

```sql
set sql_log_bin=0;
source /tmp/gtid.sql
set sql_log_bin=1;
```

<br>

**GTID相关的参数**：

```bash
--skip-gtids #忽略原有的GTID 信息,恢复时生成最新的 GTID 信息
--include-gtids='d60b549f-9e10-11e9-ab04-000c294a1b3b:6','d60b549f-9e10-11e9-ab04-000c294a1b3b:8' #只截取6和8
--exclude-gtids='d60b549f-9e10-11e9-ab04-000c294a1b3b:6','d60b549f-9e10-11e9-ab04-000c294a1b3b:8' #排除
```



<br>

<br>



### 8. 慢日志 （slow-log ）

<br>



**作用**：记录运行较慢的语句,优化过程中常用的工具日志。



#### 8.1 慢日志配置

**开关**

`slow_query_log=1` 

**文件位置及名字** 

`slow_query_log_file=/data/mysql/slow.log`

**设定慢查询时间**

`long_query_time=0.1`

**没走索引的语句也记录**

`log_queries_not_using_indexes`

```bash
vim /etc/my.cnf
slow_query_log=1 
slow_query_log_file=/data/mysql/slow.log
long_query_time=0.1
log_queries_not_using_indexes
```


默认定义慢语句的时间 十秒


![GTID恢复报错](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-23.png)

<br>

<br>

#### 8.2 模拟慢查询分析日志



![慢日志分析](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-24.png)
<br>

**分析慢日志**

`mysqldumpslow -s c -t 10 /data/mysql/slow.log`  优化前十个 自动以时间为第二维度
`-s`  排序
`-c` 次数
`-t` 前十个记录

- 不显示重复的 最慢的优先处理
- 优先处理优化使用次数最多的语句

<br>

![慢日志分析](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-25.png)
<br>

**超过01秒的和不走索引的语句**


![慢日志分析2](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-26.png)

**结论**：以查询时间和运行次数为分析结论

1.运行次数
2.时间



### 9.  第三方工具

<br>

[Percona Toolkit 3.2.0](https://www.percona.com/downloads/percona-toolkit/LATEST/ ) 



Pt-query-digest是用于分析MySQL慢查询的一个工具，它也可以分析binlog、General log、slowlog，也可以通过SHOWPROCESSLIST或者通过tcpdump抓取的MySQL协议数据来进行分析。可以把分析结果输出到文件中，分析过程是先对查询语句的条件进行参数化，然后对参数化以后的查询进行分组统计，统计出各查询的执行时间、次数、占比等，可以借助分析结果找出问题进行优化。

<br>

<br>

#### 9.1 下载安装

```shell
wget https://www.percona.com/downloads/percona-toolkit/3.2.0/binary/redhat/7/x86_64/percona-toolkit-3.2.0-1.el7.x86_64.rpm
```

```bash
安装依赖
yum install -y perl-DBI perl-DBD-MySQL perl-Time-HiRes perl-IO-Socket-SSL perl-Digest-MD5
rpm -ivh percona-toolkit-3.2.0-1.el7.x86_64.rpm 
```

<br>



#### 9.2 使用说明

<br>

`shell> pt-query-digest [OPTIONS] [DSN]`

**详情可参考**

 `shell>pt-query-digest --help`

**常用参数**：

```bash
--create-review-table ：当使用--review参数把分析结果输出到表中时，如果没有表就自动创建。
--create-history-table：当使用--history参数把分析结果输出到表中时，如果没有表就自动创建。
--filter ： 对输入的慢查询按指定的字符串进行匹配过滤后再进行分析
--limit：限制输出结果百分比或数量，默认值是20,即将最慢的20条语句输出，如果是95%则按总响应时间占比从大到小排序，输出到总和达到95%位置截止。
--log=s ：指定输出的日志文件
--history 将分析结果保存到表中，分析结果比较详细，下次再使用--history时，如果存在相同的语句，且查询所在的时间区间和历史表中的不同，则会记录到数据表中，可以通过查询同一CHECKSUM来比较某类型查询的历史变化。
--review：将分析结果保存到表中，这个分析只是对查询条件进行参数化，一个类型的查询一条记录，比较简单。当下次使用--review时，如果存在相同的语句分析，就不会记录到数据表中。
--output 分析结果输出类型，值可以是report(标准分析报告)、slowlog(Mysql slow log)、json、json-anon，一般使用report，以便于阅读。
--since：从该指定日期开始分析。
--until：截止时间，配合—since可以分析一段时间内的慢查询。
```

<br>

<br>

**9.3 使用示例**

<br>

**Toolkit工具包中的命令:**

```shell
pt-query-diagest  /data/mysql/slow.log
#pt-query-digest分析慢查询日志
shell> pt-query-digest --report slow.log
#报告最近半个小时的慢查询：
shell> pt-query-digest --report --since 1800s slow.log
#报告一个时间段的慢查询：
shell> pt-query-digest --report --since '2013-02-10 21:48:59' --until '2013-02-16 02:33:50' slow.log
#报告只含select语句的慢查询:
shell> pt-query-digest --filter '$event->{fingerprint} =~ m/^select/i' slow.log
#报告针对某个用户的慢查询:
shell> pt-query-digest --filter '($event->{user} || "") =~ m/^root/i' slow.log
#报告所有的全表扫描或full join的慢查询:
shell> pt-query-digest --filter '(($event->{Full_scan} || "") eq "yes") || (($event->{Full_join} || "") eq "yes")' slow.log
#把查询保存到query_review表
shell> pt-query-digest --user=root –password=abc123 --review h=localhost,D=test,t=query_review --create-review-table  slow.log
#把查询保存到query_history表
shell> pt-query-digest --user=root –password=abc123 --history  h=localhost,D=test,t=query_history --create-history-table  slow.log
#通过tcpdump抓取mysql的tcp协议数据，然后再分析
shell> tcpdump -s 65535 -x -nn -q -tttt -i any -c 1000 port 3306 > mysql.tcp.txt
shell> pt-query-digest --type tcpdump mysql.tcp.txt> slow_report.log
#分析binlog
shell> mysqlbinlog mysql-bin.000093 > mysql-bin000093.sql
shell> pt-query-digest --type=binlog mysql-bin000093.sql > slow_report.log
#分析general log
shell> pt-query-digest --type=genlog localhost.log > slow_report.log
```

<br>

<br>

如下为输入结果示例：



<br>

<br>

#### 9.4 将分析结果可视化



**原理**：使用pt-query-digest分析慢查询日志并将查询分析数据保存到MySQL数据库表中，然后使用应用程序来展示分析结果.

目前有基于LAMP的Query-Digest-UI、Anemometer开源项目支持。

<br>

<br>



**介绍：**

[Anemometer](https://github.com/box/Anemometer) 是一个图形化显示MySQL慢日志的工具。

结合Percona-toolkit中pt-query-digest，Anemometer可以很轻松的帮你去分析慢查询日志，让你很容易就能找到哪些SQL需要优化。

<br>

**需要安装的步骤如下：**

1. percona-toolkit工具的安装
2. php web环境的搭建
3. 安装Anemometer并配置
4. 导入慢查询日志
5. 访问界面，查看慢查询
6. 其他相关和问题解决

<br>

![Anemomete构架图](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-34.png)
<br>

<br>

**php&web环境的搭建**

 **LAMP环境的安装**

<br>

**安装apache**

```shell
yum install httpd httpd-devel -y
```

<br>

**安装php**

```sh
yum install php php-mysql php-common php-bcmath php-dba php-cli php-gd php-mbstring php-mcrypt php-devel php-xml php-pdo -y
```

<br>

**修改时区**

```sh
vim /etc/php.ini，
#修改为 
date.timezone = PRC
```

<br>

**LAMP环境启动**

```shell
systemctl start httpd
systemctl stop httpd
systemctl restart httpd
systemctl status httpd
```



<br>

<br>



**安装Anemometer并配置**



**1.下载安装**

**下载地址**：https://github.com/box/Anemometer

<br>

**下载后上传到服务器并解压**

```shell
unzip Anemometer.master.zip
```

<br>

**移动到web根目录**

```shell
mv Anemometer /var/www/html/anemometer
```



<br>

**2.授予权限**

目标慢查询数据库上需要授予Anemometer主机对应的权限，用于分析目标慢查询数据库**explain**执行计划

```sql
grant select on *.* to 'anemometer'@'$ip' identified by '123456';
flush privileges;  --（$ip为Anemometer主机对应ip地址）
```

<br>

<br>

**3.修改配置文件**

增加**explain**读取用户密码信息

```sh
cp conf/sample.config.inc.php conf/config.inc.php
vim conf/config.inc.php
```

<br>



<br>

![修改配置文件2](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-28.png)

<br>

修改配置文件指向数据源文件

![修改配置文件2](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-41.png)

初始化数据源的数据库表的配置

![修改配置文件3](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-40.png)
<br>

**4.推送慢语句分析**

```sh
pt-query-digest --user=slowlog --password=1 
--review h=10.0.0.51,D=slow_query_log,t=global_query_review
--history h=10.0.0.51,D=slow_query_log,t=global_query_review_history --no-report 
--limit=0% --filter=" \$event->{Bytes} = length(\$event->{arg}) and \$event->{hostname}=\"$HOSTNAME\"" 
slow.log
```

<br>

<br>

**5.访问网页，查看慢语句可视化分析**



[http://127.0.0.1/anemometer](http://127.0.0.1/anemometer)


![web界面1](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-32.png)

![web界面2](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-33.png)



**Query-Digest-UI** 应用

![Query-Digest-UI](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-31.png)

<br>

<br>



**6.踩坑问题解决**



**MySQL 5.7 时间格式问题**

MySQL升级5.7后，出现异常`Invalid default value for 'create_time'` <br>

5.7之后版本 datetime 默认值设置 '0000-00-00'<br>

<br>

**解决方案**：

打开MySQL安装位置，找到`my.ini`配置文件，添加或修改如下配置：<br>

在 `[mysqld]` 中添加<br>

```sh
sql-mode=ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,
NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

 <br>

**临时解决方案**

 

```sql
mysql> set session sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
```

 <br>  <br>

 

`Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggre` 问题解决



**问题出现的原因：** 

**MySQL 5.7.5及以上功能依赖检测功能。如果启用了ONLY_FULL_GROUP_BY SQL模式（默认情况下），MySQL将拒绝选择列表，HAVING条件或ORDER BY列表的查询引用在GROUP BY子句中既未命名的非集合列，也不在功能上依赖于它们。（5.7.5之前，MySQL没有检测到功能依赖关系，默认情况下不启用ONLY_FULL_GROUP_BY。有关5.7.5之前的行为的说明，请参见“MySQL 5.6参考手册”。）**

 

**解决方法一：**



```sql
select @@global.sql_mode
```

查询出来的值为：

```sql
'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
```

 去掉 **ONLY_FULL_GROUP_BY**，重新设置值。

```sql
set @@global.sql_mode ='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
```

 

**解决方法二：**

```shell
 vim /etc/mysql/conf.d/mysql.cnf
```

```shell
[mysqld] 
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
service mysqld restart
```

 

<br>

<br>

**3.时间不同步问题**

 

**问题描述**：MySQL 5.7 开启慢日志后发现日志的时间与系统时间相差8小时

<br>

**Time**: **2020-08-05T05:35:50.667976K**，实际时间应该是**12:24:30**<br>

这是由于**log_timestamps**这个参数设置造成的，查询当前设置<br>

<br> 

```sql
mysql> show variables like '%log_time%';
+----------------+-------+
| Variable_name | Value  |
+----------------+-------+
| log_timestamps | UTC   |
+----------------+-------+
1 row in set (0.01 sec)
```

 

 

**UTC**是世界统一时间，而现在的系统为北京时间是东八区，比**UTC**早了8个小时，所以这里设置为**SYSTEM**

 

```sql
mysql> set global log_timestamps=SYSTEM;

Query OK, 0 rows affected (0.00 sec)

 mysql> show variables like '%log_time%';
+----------------+--------+
| Variable_name | Value |
+----------------+--------+
| log_timestamps | SYSTEM |
+----------------+--------+
1 row in set (0.01 sec)
```

 

  <br>

<br>

 

Mysql 5.7 时间字段不得为空或0000-00-00 00:00:00

  

**问题原因：**

`NO_ZERO_IN_DATE`,`NO_ZERO_DATE` 限制无法默认为 `0000-00-00 00:00:`00

`NO_ZERO_IN_DATE`：在严格模式下，不接受月或日部分为0的日期

`NO_ZERO_DATE`：在严格模式，`0000-00-00`报错

 <br>

<br>

**解决方法：**

1、使用root登陆数据库，命令界面执行 ，查看sql_mode

 

```sql
select @@sql_mode;
```

返回结果如下：

```sql
'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
```

 修改 `sql_mode`

```sql
SET GLOBAL sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
```



### 10. 慢查询可视化帮助文档

 [文章来源](https://www.jianshu.com/p/092fd6359e43)

该系统使用pt-query-digest搜集慢查询日志，目前策略是每10分钟搜集分析一次。

将数据存储在两张表中：该系统使用pt-query-digest搜集慢查询日志，目前策略是每10分钟搜集分析一次。将数据存储在两张表中：`global_query_review` 和 `global_query_review_history`。将数据展现出来，方便查询分析。

<br>

表结构

`global_query_review` 表结构：


![表结构1](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-35.png)

<br><br>

**主要字段说明**：

- checksum : 主键，是按fingerprint算出来的hash值
- finger : 是每条sql语句的指纹，去掉了一些变化的值同一类型的sql语句，条件值不一样在该表中只会存在一条记录
- sample: 符合finger的一条sql示例

<br>

<br>

`global_query_review_history` 表结构

![表结构2](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-36.png)

**主要字段说明**：

- **hostname_max** :  MySQL服务所在主机名称
- **db_max**: 数据库名称
- **checksum** :     同global_query_review表中的checksum，两张表通过该值关联
- **sample** : sql示例
- **ts_min** :     本次统计(每10分钟一次)该类型sql语句出现的最小时间
- **ts_max**:     本次统计(每10分钟一次)该类型sql语句出现的最大时间
- **ts_cnt** :     本次统计该sql语句出现的次数
- **Query_time_sum** :     本次统计该类型sql语句花费的总时间
- **Query_time_min** :     本次统计该类型sql语句执行最快的那个sql语句花费的时间
- **Query_time_max**:     本次统计该类型sql语句执行最慢的那个sql语句花费的时间
- **Query_time_pct_95**:     本次统计该类型sql语句执行时间位于95%分位的sql执行时间
- **Query_time_stddev**:     本次统计该类型sql语句执行时间标准差（统计学概念）
- **Query_time_median**:     本次统计该类型sql语句执行时间位于中位数位置的sql执行时间
- **index_ratio**：表示的是扫描的行数/返回的结果行数



<br><br>



**Anemometer** 应用


**1.主页面说明如下**

![界面1](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-37.png)
<br>


**2.点击checksum值进入分析页面**

![界面2](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-38.png)

<br>

**下面图形是该页面的中间部分**



![界面3](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-39.png)

