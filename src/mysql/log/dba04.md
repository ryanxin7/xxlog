---
title: 第三章回顾 补充元数据查询部分
##intro:  集群架构环境统一规划说明
##featured_image: ss5.jpg
tag: 
    - DBA
    - RDBMS
category: 
 - DBA
date: 2020-7-15 3:13:01
---
# 第三章回顾 补充元数据查询部分 





## 1.上节回顾



### 1.1 group by name  分组   排序 对比 去重 


![day04-1.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-1.png)

### 1.2 关于group by 的sql_mode

:::tip 说明

`only_full_group_by ` 参数

- 在5.7版本中MySQL sql_mode参数中自带，5.6和8.0都没有
- 在带有group by 字句的select中，select 后的条件列（非主键列），
- 要么是group by后的列，要么需要在函数中包裹

:::



**关掉限制：** 编辑配置文件时去掉 `ONLY_FULL_GROUP_BY`



![day04-2.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-2.png)


### 1.3 group_concat 多列 转为一行

<br>

**列转行聚合函数**

```plsql
mysql> select user,group_concat(host) from mysql.user group by user;
```


![day04-3.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-3.png)

<br>



### **1.4 concat**  **拼接语句** 列值拼接



<br>

**做列值拼接**

```sql
mysql> select concat(user,"@",host) from mysql.user;
```

![day04-4.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-4.png)




### **1.5** 关于多表连接语法规则



:::tip 多表连接语法规则

- 1.首先找涉及到的所有表

- 2.找到表和表之间的关联列

- 3.关联条件写在 `on` 后面 `A join B on` 关联列

- 4.所有需要查询的信息放在select后 

- 5.其他的过滤条件 `where group by having order by limit` 往最后放

- 注意：对多表连接中，驱动表选择数据行少的表。后续所有表的关联列尽量是主键或唯一键（表设计），至少建立一个索引。

 :::



:::warning 注意 ❗

数据行较少的放在左边（驱动表） 因为他要拿整表的数据和右边的表进行关联

:::

### **1.6** 创建别名



**表别名**

**列别名**

count

oldguo  linux  a,b,c,d 

oldguo  python x，y,z 

oldboy  linux  10 

hsw   python 11



### **1.7 distinct** **去重复**

<br>



```sql
mysql> select count(distinct countrycode) from city; 
//在城市表中 查看所有国家代号 去重复
```

<br>

<br>

### **1.8 select** **执行顺序**

<br>

<br>

```sql
select user ,count(name) from 表  where 列  group by user having 列  order by 列 ;
```



:::tip 查询语句执行顺序

没有索引的情况下会把整表数据加载到内存中，进行过滤过滤后在内存中只留下满足条件的数据。 针对满足条件的数据进行分组 （group by ），在根据select 的条件列取列产生新的结果集，having会对结果集再进行一次过滤。order by 对列数据进行比较大小排列顺序 最后显示。

:::

<br>

## **2.** 扩展类内容 元数据获取

<br>

### **2.1** **元数据介绍及获取介绍**

<br>

::: tip 元数据

元数据是存储在"基表"中。

通过专用的DDL语句，DCL语句进行修改

通过专用视图和命令进行元数据的查询



`information_schema`中保存了大量元数据查询的试图

`show`  命令是封装好功能，提供元数据查询基础功能

:::

<br>



**创建视图：**

![day04-5.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-5.png)

<br>

<br>

**查询视图：**

![day04-6.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-6.png)



**2.1 information_schema 的基本应用**



**tables 视图的应用:**

```sql
mysql> use information_schema;
mysql> desc tables;
```


![day04-7.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-7.png)

![day04-8.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-8.png)

<br>


**TABLES 和表有关的元数据**

<br>

| <img width=100/>TABLE_SCHEMA<img width=100/> | <img width=100/>表所在的库名<img width=100/> |
| -------------------------------------------- | :------------------------------------------: |
| TABLE_NAME                                   |                     表名                     |
| ENGINE                                       |                   存储引擎                   |
| TABLE_ROWS                                   |                    数据行                    |
| AVG_ROW_LENGTH                               |                  平均行长度                  |
| INDEX_LENGTH                                 |                   索引长度                   |



**举例说明：**

```
USE information_schema; 
DESC TABLES;
```



- **显示所有的库和表的信息**

```sql
SELECT table_schema,table_name FROM information_schema.tables;
```



- **显示所有的库和表的信息（结果集多行转成一行）**  

world 库下  `city,country,country,language`

```sql
SELECT table_schema,GROUP_CONCAT(table_name) 
FROM information_schema.tables
GROUP BY table_schema;
```



- 查询所有**innodb**引擎的表



```sql
SELECT table_schema,table_name ,ENGINE
FROM information_schema.tables 
WHERE ENGINE='innodb';
```



- **统计world下的city表占用空间大小**

```
公式：表的数据量=平均行长度*行数+索引长度
```



 `AVG_ROW_LENGTH*TABLE_ROWS+INDEX_LENGTH`  统计整个city 表的真实数据量大小

```sql
SELECT table_name,(AVG_ROW_LENGTH*TABLE_ROWS+INDEX_LENGTH)/1024 //kb显示
FROM information_schema.TABLES
WHERE table_schema='world' AND table_name='city';
```



**统计每个库的数据量大小，并按数据量从大到小排序**



```sql
SELECT table_schema,SUM((AVG_ROW_LENGTH*TABLE_ROWS+INDEX_LENGTH))/1024 AS total_KB    ( 库中有多个表 所以需要加一起 使用 SUM 函数)
FROM information_schema.TABLES
GROUP BY table_schema 库名排队
ORDER BY AS total_KB DESC ; 排序
```





### **2.2.** **配合concat( )函数拼接语句或命令**



**举例说明：**



-  模仿以下语句,进行数据库的分库分表备份。

  

```sql
mysqldump -uroot -p123 world city >/bak/world_city.sql  //分库分表备份
```



**拼接语句：**

```sql
SELECT
CONCAT("mysqldump -uroot -p123 ",table_schema," ",table_name
," >/bak/",table_schema,"_",table_name,".sql")
FROM information_schema.tables;
```


![day04-9.png](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-9.png)


- **模仿以下语句,进行批量生成对world库下所有表进行操作**

```sql
ALTER TABLE world.city DISCARD TABLESPACE;
```



**拼接语句：**

```sql
SELECT 
CONCAT("ALTER TABLE ",table_schema,".",table_name," DISCARD TABLESPACE;")
FROM information_schema.tables
WHERE table_schema='world';
```



### **2.3 show 常用命令介绍**



| <img width=136/>主要命令<img width=136/> | <img width=136/>作用说明<img width=136/> |
| :--------------------------------------- | ---------------------------------------- |
| show databases;                          | 查看数据库名                             |
| show tables;                             | 查看表名                                 |
| show create database xx;                 | 查看建库语句                             |
| show create table xx;                    | 查看建表语句                             |
| show processlist;                        | 查看所有用户连接情况                     |
| show charset;                            | 查看支持的字符集                         |
| show collation;                          | 查看所有支持的校对规则                   |
| show grants for xx;                      | 查看用户的权限信息                       |
| show variables like '%xx%'               | 查看参数信息                             |
| show engines;                            | 查看所有支持的存储引擎类型               |
| show index from xxx                      | 查看表的索引信息                         |
| show engine innodb status\G              | 查看innoDB引擎详细状态信息               |
| show binary logs                         | 查看二进制日志的列表信息                 |
| show binlog events in '二进制文件名'     | 查看二进制日志的事件信息                 |
| show master status ;                     | 查看mysql当前使用二进制日志信息          |
| show slave status\G                      | 查看从库状态信息                         |
| show status like ''                      | 查看数据库整体状态信息                   |
| help show ;                              | 查看更多                                 |
| show relaylog events in ''               | 查看中继日志的事件信息                   |



 

