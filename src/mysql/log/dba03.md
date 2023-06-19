---
title: SQL 基本概念引入
##intro:  集群架构环境统一规划说明
##featured_image: ss5.jpg
tag: 
    - DBA
    - RDBMS
category: 
 - DBA
date: 2020-7-13 2:13:01
---
# SQL 基本概念引入





## 1. MySQL数据库的内置功能

<br>

<br>

### 1.1 连接数据库

**参数介绍**

**-u**  &emsp;&emsp;指定登录用户

**-p**  &emsp; &emsp;指定密码

**-S**  &emsp;&emsp;使用Socket文件方式登录

**-h**  &emsp;&emsp;指定远程主机登录地址

**-P**  &emsp;&emsp;指定连接数据库的端口

**-e**  &emsp;&emsp;免交互执行SQL语句

**<**  &emsp;&emsp; 恢复数据  后面加要导入的数据库数据

<br>

**例子:**

1. `mysql -uroot -p -S /tmp/mysql.sock`

2. `mysql -uroot -p -h10.0.0.51 -P3306`

3. `mysql -uroot -p -e "show databases;"` **-e** 参数  免交互执行sql语句

4.  `mysql -uroot -p123     <  /root/world.sql`      **恢复数据**  后面加要导入的数据库数据

 

<br>



### 1.2 数据库内置命令

<br>



**help**                    &emsp; &emsp; &emsp;     打印mysql帮助

**\c**                &emsp;&emsp;&emsp;                ctrl+c    结束上个命令运行

**\q**                  &emsp;&emsp;&emsp;              quit; exit;   ctrl+d   退出mysql

**\G**                     &emsp;&emsp;&emsp;           将数据竖起来显示

**source**          &emsp;&emsp;&emsp;              恢复备份文件    



<br>

<br>

 

## 2.  SQL基础应用

<br>

### 2.1 SQL介绍

结构化的查询语言

关系型数据库通用的命令

遵循SQL92的标准(SQL_MODE)

<br>

### 2.2 SQL常用种类

<br>

**DDL** 数据定义语言

**DCL** 数据控制语言

**DML** 数据操作语言

**DQL** 数据查询语言

 <br>

## 3. SQL引入-数据库的逻辑结构

<br>

- **库的逻辑结构**

库名字

库属性:字符集,排序规则

 <br>

<br>

- **表的逻辑结构**

表名

表属性:存储引擎类型,字符集,排序规则

列名

列属性:数据类型,约束,其他属性

数据行

  <br>

<br>

## 4. 字符集 (charset)

  <br>

 

**Charset**   &emsp; 字符集

**字符集**相当于MySQL数据库的密码本(编码表) 负责把SQL英文语句，转换成**16进制存储**。

  <br>

**常用的字符集：** 

`show charset;` 查询字符集

**utf8**         : 占用3个字节

**utf8mb4**  (:triangular_flag_on_post:建议) : 占用 4个字节,支持emoji和一些特殊字符。 

 

   <br>

  <br>

## 5. 排序规则

  <br>

**collation**   &emsp; 排序规则  :baby_chick:

查看数据库支持的排序规则。

`mysql> show collation;`  



每一种字符集对应多个排序规则

   <br>

**utf8mb4 常见的字符规则：**

用于需求 对于英文字符串的,大小写的敏感的数据库  wW ü

**utf8mb4_general_ci**             大小写不敏感

**utf8mb4_bin**                 大小写敏感(存拼音,日文)

 

​    <br>

  <br>

## 6. 数据类型介绍

   <br>

### 6.1 数字类型

 

常用整数类型，如 **TINYINT,INT** 浮点数不太常用。

<br>

 ![数据类型介绍](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section3-1-1.png)

​    <br>

  <br>

### 6.2 字符串类型

 

- **char**(100)       
- 最多存储 **255** 个字符长度

   <br>

定长字符串类型,不管字符串长度多长,都**立即分配**100个字符长度的存储空间,未占满的空间使用"空格"填充

   <br>

- **varchar**(100)  
- 最多存储 **65535** 个字符长度

   <br>

变长字符串类型,每次存储数据之前,都要**先判断**一下长度,**按需分配**此盘空间.

会单独申请一个字符长度的空间存储字符长度 (:star:少于255,如果超过255以上,会占用两个存储空间):

   <br>

**如何选择这两个数据类型?**

   <br>

- 少于255个字符串长度,定长的列值,选择 **char**
- 多于255字符长度,变长的字符串,可以选择 **varchar**

   <br>

  <br>

**Enum** **枚举数据类型**

**作用：将某一列可能的字符串定义枚举，进行下标**

 <br>

**例如：** address enum('sz','sh','bj'.....)

下标成 1  2  3  顺序依次排列下去。

 

**悬念: 以上数据类型可能会影响到索引的性能​ :question:**

   <br>

  <br>

### 6.3 时间类型

 <br>

- **datetime** 

范围为从 1000-01-01 00:00:00.000000 至 9999-12-31 23:59:59.999999。

  

- **timestamp**

范围为从 1970-01-01 00:00:00.000000 至 2038-01-19 03:14:07.999999。

   <br>

**timestamp** 时区功能跟着时区自动变更时间



![时间类型介绍](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section3-1-2.png)



### **6.4 二进制类型**

<br>

关系型数据库不太擅长存储二进制类型数据。如：图片 、视频 、音频、文件。