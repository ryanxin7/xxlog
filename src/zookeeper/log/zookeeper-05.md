---
Author: Ryan
title: zookeeper 企业面试真题（面试重点）
tag: 
    - zookeeper
category: 
 - 运维技术栈
date: 2021-10-9 21:13:01
#banner_img: /img/bg1.png
---

# 企业面试真题（面试重点）

## 选举机制

半数机制，超过半数的投票通过，即通过。

 （1）第一次启动选举规则： 投票过半数时，服务器 id 大的胜出<br>

 （2）第二次启动选举规则：<br>

①EPOCH 大的直接胜出 <br>

②EPOCH 相同，事务 id 大的胜出<br>

③事务 id 相同，服务器 id 大的胜出<br>

<br>

## 生产集群安装多少 zk 合适？

 安装奇数台。

 生产经验：

⚫ 10 台服务器：3 台 zk； 

⚫ 20 台服务器：5 台 zk；

⚫ 100 台服务器：11 台 zk； 

⚫ 200 台服务器：11 台 zk

服务器台数多：好处，提高可靠性；坏处：提高通信延时

<br>

## 常用命令

ls、get、create、delete