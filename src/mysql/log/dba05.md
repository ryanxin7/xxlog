---
title: 存储引擎介绍与企业案例
##intro:  集群架构环境统一规划说明
##featured_image: ss5.jpg
tags: 
    - DBA
    - RDBMS
categories: 
 - DBA
date: 2020-7-15 2:13:01
---
# 存储引擎介绍与企业案例





## 1. 前情回顾案例补充



**explain (desc) 使用场景**



相关问题：

- 你做过哪些优化?

- 你用过什么优化工具? **explain**

- 你对索引这块怎么优化的?

  <br>

**题目意思: 我们公司业务慢,请你从数据库的角度分析原因**

- **mysql出现性能问题,有两种情况:**

<br>

第一种情况：应急性的慢：突然夯住  **突然慢**

应急情况:数据库卡了,资源耗尽

 

**处理过程:**

1. `show processlist;` （把当前会话所做的操作列出来） 获取到导致数据库卡住的语句

2. 使用 `explain` 分析SQL的执行计划,可能有没有走索引的,索引的类型情况。

3. 建索引,改语句

 

第二种情况：一段时间慢(持续性的):**每天都慢** 9-11点

 **处理过程:**

1. 记录慢日志 `slowlog`,分析`slowlog`
2. explain 分析SQL的执行计划,有没有走索引,索引的类型情况
3. 建索引,改语句



<br>

<br>

### 1.1 索引应用规范

 

::: tip 建立索引的原则（DBA运维规范）

 

- 建表必须要有主键,一般是无关列,自增长

-  经常做为 `where` 条件列 `order by` `group by` `join on`, `distinct` 的条件

-  最好使用唯一值多的列作为联合索引前导列,其他的按照联合索引优化细节来做

- 列值长度较长的索引列,我们建议使用前缀索引.

- 降低索引条目,一方面不要创建没用索引,不常使用的索引清理,`percona` `toolkit`

- 索引维护要避开业务繁忙期

- 小表不建索引

:::

<br>

<br>

使用 **SQLyog** 工具自动找出**使用率不高的索引**

![dba05-1.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/dba05-1.png)

<br>

<br>

<br><br>

### **1.2** 不走索引的情况

 ::: tip  不走索引的情况（开发规范）

- 没有查询条件，或者查询条件没有建立索引

`select * from city;`

`select * from city where 1=1;`

- 查询结果集是原表中的大部分数据，应该是25％以上。

- 索引本身失效，统计数据不真实

**面试题: 同一个语句突然变慢?**

可能是因为统计信息过旧,导致的索引失效。

-  查询条件使用函数在索引列上，或者对索引列进行运算，运算包括(`+，-，*，/，!` 等)

`mysql> desc select * from city where id-99=1;`

-  隐式转换导致索引失效.

- `! = ，not in` 不走索引（辅助索引）

- like "%aa"` 百分号在最前面不走

- 联合索引

 :::



## **2. 存储引擎简介**

<br>

相当于Linux文件系统，只不过比文件系统强大

<br>

**存储引擎功能**

- 数据读写
- 数据安全和一致性
- 提高性能
- 热备份
- 自动故障恢复
- 高可用方面支持

```sql
show engies; --查看存储引擎支持种类
CSV        
MRG_MYISAM    
MyISAM      
BLACKHOLE     
PERFORMANCE_SCHEMA
MEMORY      
ARCHIVE      
InnoDB      
FEDERATED  
```

<br>

![dba05-2.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/dba05-2.png)

<br>



**笔试题**：**例举你了解的存储引擎**



**答：InnoDB（新版本） ,MyISAM（老版本） ,MEMORY, CSV**

 <br>

- **Mysql 5.7 默认的存储引擎:InnoDB**
-  **PerconaDB:默认是XtraDB**

- **MariaDB:默认是InnoDB**

 <br>



**插件式 第三方的存储引擎:**

-  RocksDB 
- MyRocks 
- TokuDB

 

**区别**：压缩比较高,数据的插入性能高.其他功能和 InnoDB 没差。



<br>

<br>

### 2.1 存储引擎的查看

<br> 

**查看存储引擎设置**

```sql
 
mysql> show engines; --查看支持的存储引擎
mysql> SELECT @@default_storage_engine;
```

 **修改默认存储引擎**

```shell
 
vim /etc/my.cnf   --修改配置文件
[mysqld]
default_storage_engine=InnoDB
```

 

 

**查看表存储引擎状态**

```sql
 
mysql> show create table t1; 
 
mysql> SHOW TABLE STATUS LIKE 'CountryLanguage'\G
 
mysql>select table_schema,table_name ,engine from information_schema.tables where table_schema not in ('sys','mysql','information_schema','performance_schema');
```



<br>

<br>

<br>

### **2.2 存储引擎的修改**

<br>

**修改存储引擎为innodb**

```sql
 
mysql> alter table t1= engine=innodb;
mysql> show create table t1; 
```

 <br><br>

**整理碎片**

在执行删除操作后原来占用的空间不会被立即释放掉会产生碎片，就需要通过命令进行碎片整理。

<br>

**有两种方法：**

1. `mysql> alter table t111 engine=innodb; innodb` 命令 再执行一遍更改存储引擎命令 对业务影响小。
2. 把原表导入 把表`drop`掉在重新导入回来 干净 但有风险。

 

 <br>

### **2.3 企业真实碎片处理案例**

<br>**环境:** centos7.4,MySQL 5.7.20,InnoDB存储引擎

**业务特点**：数据量级较大,经常需要按月删除历史数据.

**问题:** 磁盘空间占用很大,不释放

 <br>

**处理方法:**

<br>**以前:** 将数据逻辑导出,手工 `truncate` 表,然后导入进去。

<br>

**现在:**

对表进行按月进行分表(**partition,中间件**)。

业务替换为 **truncate** 方式。

定期进行碎片整理。

 <br>

<br>

**批量替换 Zabbix 100 多张存储引擎 `innodb` 的表为 `tokudb`引擎**

```sql
 
alter table zabbix.a engine=tokudb; -- 改一张表的命令

select concat("alter table ",table_schema,".",table_name," engine=tokudb;") from information_schema.tables 
where table_schema='zabbix'; --使用拼接语句
```

<br>

<br>

<br>

## 3. 企业真实案例更换存储引擎

 <br>

 <br>

### 3.1   Zabbix  监控系统架构整改

**环境:** zabbix 3.2  mariaDB 5.5 centos 7.3

**现象 :** zabbix卡的要死 , 每隔3-4个月,都要重新搭建一遍 zabbix,存储空间经常爆满.

<br>

**分析得出问题 :**

- Zabbix 版本 

- **数据库版本**

- Zabbix数据库500G,全部存在一个文件里

 <br>

<br>

**优化建议:**

1.数据库版本升级到mariaDB最新版本,Zabbix升级更高版本

2.存储引擎改为 **tokudb**

3.监控数据按月份进行切割(二次开发Zabbix 数据保留机制功能重写,数据库分表)

4.关闭binlog和双1

5.参数调整

<br>



**优化结果**: 解决卡顿问题，监控状态良好

 <br>

<br>

**解决思路 ?**

1. 原生态支持 TokuDB,另外经过测试环境,**10版本要比5.5 版本性能 高 2-3倍**

2. **TokuDB:insert 数据比 Innodb 快的多，数据压缩比要 Innodb 高**

3. 监控数据按月份进行切割,为了能够truncate每个分区表,立即释放空间

4. **关闭 binlog  减少无关日志的记录。**

5. 参数调整  安全性参数关闭,提高性能。



<br>

<br>



### **3.2 存储引擎的替换**

 

**环境:** centos 5.8 ,MySQL 5.0版本,MyISAM存储引擎,网站业务(LNMP),数据量50G左右

 

**现象问题:** 业务压力大的时候,非常卡;经历过宕机,会有部分数据丢失.

 

**问题分析:**

 

1.MyISAM存储引擎表级锁,在高并发时,会有很高锁等待

2.MyISAM存储引擎不支持事务,在断电时,会有可能丢失数据

 

**实际问题：** 

1.监控锁的情况:有很多的表锁等待

2.存储引擎查看:所有表默认是MyISAM

 

**解决方案:**

1. 升级MySQL 5.6.10版本

2. 迁移所有表到新环境

3. 开启双1安全参数



## **4. InnoDB 存储引擎核心特性说明**

<br>

![dba05-3.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/dba05-3.png)

1. 支持事务
2. 行级锁定
3. MVCC   并发控制
4. 外键
5.  ACSR自动故障恢复
6. 热备 复制方面提供 (多线程,GTID,MTS)