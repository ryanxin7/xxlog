---
title: MHA 高可用部署
##intro:  集群架构环境统一规划说明
##featured_image: ss5.jpg
tag: 
    - DBA
    - RDBMS
    - MHA
category: 
 - DBA
date: 2020-7-22 2:13:01
---

# MHA 高可用部署

## 1.搭建MHA

<br>

(1) **配置关键程序软连接**

```sh
ln -s /data/mysql/bin/mysqlbinlog    /usr/bin/mysqlbinlog
ln -s /data/mysql/bin/mysql          /usr/bin/mysql
```



因为MHA软件里面默认路径就是/usr/bin下。



<br>

(2) **配置互信**

**db01**：

```sh
rm -rf /root/.ssh 
ssh-keygen
cd /root/.ssh 
mv id_rsa.pub authorized_keys
scp  -r  /root/.ssh  10.0.0.52:/root 
scp  -r  /root/.ssh  10.0.0.53:/root 
```

**各节点验证**

<br>

db01:

```sh
ssh 10.0.0.51 date
ssh 10.0.0.52 date
ssh 10.0.0.53 date
```

<br>

db02:

```sh
ssh 10.0.0.51 date
ssh 10.0.0.52 date
ssh 10.0.0.53 date
```

<br>db03:

```sh
ssh 10.0.0.51 date
ssh 10.0.0.52 date
ssh 10.0.0.53 date
```

<br>

(3)安装软件包 (所有节点)

```sh
yum install perl-DBD-MySQL -y
rpm -ivh mha4mysql-node-0.56-0.el6.noarch.rpm
```

<br>

(4) 在db01主库中创建mha需要的用户



```sql
grant all privileges on *.* to mha@'10.0.0.%' identified by 'mha';
```

<br>

(5) Manager 节点软件安装（db03）

```sql
yum install -y perl-Config-Tiny epel-release perl-Log-Dispatch perl-Parallel-ForkManager perl-Time-HiRes
rpm -ivh mha4mysql-manager-0.56-0.el6.noarch.rpm
```

<br>

(6) 配置文件准备(db03)
	

创建配置文件目录

```sh
mkdir -p /etc/mha
```

创建日志目录

```sh
mkdir -p /var/log/mha/app1
```


​	
编辑mha配置文件

```sh
cat > /etc/mha/app1.cnf <<EOF
[server default]
manager_log=/var/log/mha/app1/manager        
manager_workdir=/var/log/mha/app1            
master_binlog_dir=/data/binlog       
user=mha                                   
password=mha                               
ping_interval=2
repl_password=123
repl_user=repl
ssh_user=root                               
[server1]                                   
hostname=10.0.0.51
port=3306                                  
[server2]            
hostname=10.0.0.52
port=3306
[server3]
hostname=10.0.0.53
port=3306
EOF
```

(7)  状态检查(db03)

```sh
 masterha_check_ssh  --conf=/etc/mha/app1.cnf 
 masterha_check_repl  --conf=/etc/mha/app1.cnf 
```

(8) 开启MHA(db03)：

```sh
nohup masterha_manager --conf=/etc/mha/app1.cnf --remove_dead_master_conf --ignore_last_failover  < /dev/null> /var/log/mha/app1/manager.log 2>&1 &
```

(9)  查看MHA状态

```sh
masterha_check_status --conf=/etc/mha/app1.cnf
```

<br>

## 2. MHA 架构软件结构说明



**节点规划**:

- **manager端**: db03
- **node端**: db01,db02,db03 装node软件

- 数据库节点, 必须至少是1主2从,独立数据库实例

- MHA 管理节点，最好是独立一台机器



<br>

![MHA节点构架](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-1.png)

MHA-Manager 管理节点 管理所有数据库节点：

最终达到目的 管理节点对所有数据库节点进行检测，当主库宕机时



<br>

## 3. MHA软件的构成(perl语言)

<br>



**Manager 工具包主要包括以下几个工具**：

`mha4mysql-manager-0.56-0.el6.noarch.rpm`

**脚本**：

```sh
masterha_manger             #启动MHA 
masterha_stop --conf=/etc/mha/app1.cnf #关闭MHA
masterha_check_ssh          #检查MHA的SSH配置状况 
masterha_check_repl         #检查MySQL复制状况 
masterha_master_monitor     #检测master是否宕机 
masterha_check_status       #检测当前MHA运行状态 
masterha_master_switch  	#控制故障转移（自动或者手动）
masterha_conf_host      	#添加或删除配置的server信息
```

<br>

**Node工具包主要包括以下几个工具**：

`mha4mysql-node-0.56-0.el6.noarch.rpm`

这些工具通常由MHA Manager的脚本触发，无需人为操作

```sh
save_binary_logs            #保存和复制master的二进制日志 
apply_diff_relay_logs       #识别差异的中继日志事件并将其差异的事件应用于其他的
purge_relay_logs            #清除中继日志（不会阻塞SQL线程）
```



<br>

## 4.MHA 配置过程细节说明

### 4.1  软连接

```sh
\rm -rf /usr/bin/mysqlbinlog
\rm -rf /usr/bin/mysql
ln -s /application/mysql/bin/mysqlbinlog    /usr/bin/mysqlbinlog
ln -s /application/mysql/bin/mysql          /usr/bin/mysql
ls -l /usr/bin/mysql
ls -l /usr/bin/mysqlbinlog 
```

<br>

### 4.2 互信 多节点直接不需要用密码 ：

<br>

实现脚本免交互

db01：

```sh
rm -rf /root/.ssh 
ssh-keygen
cd /root/.ssh 
mv id_rsa.pub authorized_keys #默认定义的公钥名字
scp  -r  /root/.ssh  10.0.0.52:/root 
scp  -r  /root/.ssh  10.0.0.53:/root 
```

<br>

更改公钥默认文件名:

```sh
vim /etc/ssh/sshd_config 
AuthorizedKeysFile  .ssh/authorized_key
```

<br>

**各节点验证**

```sh
#db01:
ssh 10.0.0.51 date
ssh 10.0.0.52 date
ssh 10.0.0.53 date

#db02:
ssh 10.0.0.51 date
ssh 10.0.0.52 date
ssh 10.0.0.53 date

#db03:
ssh 10.0.0.51 date
ssh 10.0.0.52 date
ssh 10.0.0.53 date
```



<br>

### 4.3 安装软件包(所有节点)

<br>

```
yum install perl-DBD-MySQL -y
rpm -ivh mha4mysql-node-0.56-0.el6.noarch.rpm
```

<br>

### 4.4 在db01主库中创建mha需要的用户

<br>

```
grant all privileges on *.* to mha@'10.0.0.%' identified by 'mha';
```

<br>

### 4.5  Manager软件安装（db03）

<br>

```
yum install -y perl-Config-Tiny epel-release perl-Log-Dispatch perl-Parallel-ForkManager perl-Time-HiRes
rpm -ivh mha4mysql-manager-0.56-0.el6.noarch.rpm
```

<br>

### 4.6 配置文件准备(db03)

<br>

-- 创建配置文件目录

```
mkdir -p /etc/mha
```

-- 创建日志目录

```
mkdir -p /var/log/mha/app1
```


-- 编辑mha配置文件

```sh
cat > /etc/mha/app1.cnf <<EOF #名字 目录随便定义
[server default] #默认配置
manager_log=/var/log/mha/app1/manager  #记录日志文件       核心日志
manager_workdir=/var/log/mha/app1      #启动日志      
master_binlog_dir=/data/binlog #主库binlog （所有节点都要打开二进制日志并且目录名要一样）   
user=mha             #管理用户                     
password=mha         #密码                   
ping_interval=2      #探测心跳的间隔时间 一共给三次机会 也就是最多6秒无响应就算宕机
repl_password=123    #构建主从时的用户密码
repl_user=repl       #构建主从时的用户
ssh_user=root        #各节点互信用户                            

[server1]            #后端的三个节点（自动检测谁是主库）             
hostname=10.0.0.51
port=3306                                  
[server2]            #如果无压力的状况下根据顺序选中新主
hostname=10.0.0.52
port=3306
[server3]
hostname=10.0.0.53
port=3306
EOF
```

<br>

<br>



一台 Manager 节点可以负责多个业务组，通过多个不同的配置文件区分如：


![MHA节点构架2](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-2.png)



<br>

4.7 状态检查(db03)

```sh
masterha_check_ssh  --conf=/etc/mha/app1.cnf 
masterha_check_repl  --conf=/etc/mha/app1.cnf 
```

<br>

4.8 开启MHA(db03)：

```sh
nohup masterha_manager --conf=/etc/mha/app1.cnf --remove_dead_master_conf --ignore_last_failover  < /dev/null> /var/log/mha/app1/manager.log 2>&1 &

--remove_dead_master_conf  #自动在配置文件中去掉宕机的节点
--ignore_last_failover   #忽略上一次故障切换
```

<br>



## 4.MHA FailOver 过程详解

### 4.1 什么是Failover?

**故障转移**<br>

主库宕机一直到业务恢复正常的处理过程(自动)

<br>

![收到和执行了多少事务](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-3.png)

收到和执行了多少事务对比。

<br>

<br>

### 4.2 MHA的Failover如何实现?



从启动--->故障--->转移--->业务恢复

1. MHA通过`masterha_manger`脚本启动MHA的功能.

2. 在manager启动之前,会自动检查ssh互信(`masterha_check_ssh`)和主从状态(`masterha_check_repl`)

3. MHA-manager 通过 `masterha_master_monitor`脚本(每隔`ping_interval`秒配置文件中)

4. `masterha_master_monitor` 探测主库3次无心跳之后,就认为主库宕机了.

5. 进行选主过程采用如下

   [^算法]: 

   - 算法一: 
     读取配置文件中是否有强制选主的参数?<br>
     `candidate_master=1` 优先竞选<br>
     `check_repl_delay=0`  跳过检查差异<br>
     加在相应主机标签下面<br>
     
   - 算法二:
     自动判断所有从库的日志量.将最接近主库数据的从库作为新主.<br>
     
   - 算法三:
     按照配置文件先后顺序的进行选新主.<br>

   

6. 数据补偿，判断主库SSH的连通性在SSH能连的情况下调用 save_binary_logs脚本,立即保存缺失部分的binlog到各个从节点,恢复，针对主库缺失部分进行补全 GTID号判断。

   SSH无法连接调用 apply_diff_relay_logs 脚本,计算从库的relaylog的差异,恢复到2号从库，在其他从库 尽快能找到差异恢复一部分数据。

7. 解除从库身份

8. 剩余从库和新主库建立主从关系

9. 应用透明

10. 故障提醒



<br>

<br>

- 算法一: 
  读取配置文件中是否有强制选主的参数?<br>
  `candidate_master=1` 优先竞选<br>
  `check_repl_delay=0`  跳过检查差异<br>
  加在相应主机标签下面<br>
  
- 算法二:
  自动判断所有从库的日志量.将最接近主库数据的从库作为新主.<br>
  
- 算法三:
  按照配置文件先后顺序的进行选新主.<br>



**扩展一下**: 强制选主应用场景<br>
`candidate_master=1` 应用场景?<br>

(1) MHA+KeepAlive VIP(早期MHA架构) <br>
(2) 多地多中心 facebook架构 多节点在不同的机房<br>


![多数据中心](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-4.png)

<br>

<br>



## 5.应用透明

<br>

**db03:**

```shell
cp /root/master_ip_failover.txt /usr/local/bin/master_ip_failover #vip切换脚本
vim /usr/local/bin/master_ip_failover
my $vip = '10.0.0.55/24'; #设定那个地址为VIP
my $key = '1';
```



<br>

这里的变量 key 是指 `ifconfig eth0:1 10.0.0.55/24` 的那个网卡别名

```sh
my $ssh_start_vip = "/sbin/ifconfig eth0:$key $vip";  #生成地址 注意网卡名称
#等于 
ifconfig eth0:1 10.0.0.55/24
```



<br>

```sh
my $ssh_stop_vip = "/sbin/ifconfig eth0:$key down"; #注意网卡名称
#等于 
ifconfig eth0:1 down
```

<br>

<br>

上下线地址

```sh
yum install -y dos2unix
dos2unix /usr/local/bin/master_ip_failover 转换掉中文字符
chmod +x /usr/local/bin/master_ip_failover 
vim /etc/mha/app1.cnf
#在[server default] 下面加 在主库宕机时才会掉用
master_ip_failover_script=/usr/local/bin/master_ip_failover  
```



<br>

<br>

**db01主库:手工添加 vip**

 

**查看是主库**

```sh
masterha_check_status --conf=/etc/mha/wordpress.cnf
```



```sh
#db01:添加VIP
ifconfig eth0:1 10.0.0.55/24
 
#db03:重启MHA
masterha_stop --conf=/etc/mha/wordpress.cnf
nohup masterha_manager --conf=/etc/mha/app1.cnf --remove_dead_master_conf --ignore_last_failover < /dev/null> /var/log/mha/app1/manager.log 2>&1 &
#db03:检查
masterha_check_status --conf=/etc/mha/app1.cnf
app1 (pid:14410) is running(0:PING_OK), master:10.0.0.51
```

<br>

<br>



## 6.MHA 故障邮件提醒



```
[root@db03 ~]# cp -a email/* /usr/local/bin/
[root@db03 ~]# cd /usr/local/bin/
[root@db03 ]# chmod +x *

[root@db03 bin]# vim /etc/mha/app1.cnf 
report_script=/usr/local/bin/send
```


![故障提醒](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-5.png)



**重启MHA**

```sh
masterha_stop --conf=/etc/mha/app1.cnf
nohup masterha_manager --conf=/etc/mha/app1.cnf --remove_dead_master_conf --ignore_last_failover < /dev/null> /var/log/mha/app1/manager.log 2>&1 &
```

<br>

<br>

## 7.额外的数据补偿服务器



(binlog_server) 节点用于在SSH无法连接到主库时做额外的数据补偿

<br>

找一台额外的机器，必须要有5.6以上的版本，支持gtid并开启，这里我们直接用的第二个slave（db03）



```sh
vim /etc/mha/app1.cnf 
[binlog1]         #添加新节点
no_master=1 #不参与切换
hostname=10.0.0.53
master_binlog_dir=/data/mysql/binlog #日志路径
```

<br>


![数据补偿服务器](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-6.png)

<br>

**(2) 创建必要目录**

```sh
mkdir -p /data/mysql/binlog
chown -R mysql.mysql /data/*
```

<br>

**(3) 实时拉取主库binlog日志**

```sh
cd /data/mysql/binlog     #必须进入到自己创建好的目录
mysqlbinlog  -R --host=10.0.0.51 --user=mha --password=mha --raw  --stop-never mysql-bin.000001 & #主库一单有变动就来取
```

在切换新日志时也会实时抓取


![在切换新日志时也会实时抓取](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-7.png)

<br>

**注意**：
拉取日志的起点,需要按照目前主库正在使用的binlog为起点.

**(4) 重启MHA-manager** 

```sh
#db03
masterha_stop --conf=/etc/mha/app1.cnf
nohup masterha_manager --conf=/etc/mha/app1.cnf --remove_dead_master_conf --ignore_last_failover  < /dev/null> /var/log/mha/app1/manager.log 2>&1 &
```

<br>

<br>

## 8.故障模拟及故障处理

<br>

因为MHA故障转移是一次性的宕掉的节点不会自动添加回来，所有就需要实施监控并启动故障节点。

<br>

### 8.1 宕掉 db01 数据库

```sh
#db01
/etc/init.d/mysqld stop
```

<br>

### 8.2 恢复故障

**(1) 启动故障节点**

```sh
#db01
/etc/init.d/mysqld start
```

<br>

**(2) 恢复1主2从(db01)模式**

```sh
grep "CHANGE MASTER TO"  /var/log/mha/app1/manager #这时已经切到slave2节点
Thu Jul 18 18:31:54 2019 - [info]  All other slaves should start replication from here. Statement should be: CHANGE MASTER TO MASTER_HOST='10.0.0.52', MASTER_PORT=3306, MASTER_AUTO_POSITION=1, MASTER_USER='repl', MASTER_PASSWORD='xxx';
#重新添加db01到Manager中
db01 [(none)]>CHANGE MASTER TO MASTER_HOST='10.0.0.52', MASTER_PORT=3306, MASTER_AUTO_POSITION=1, MASTER_USER='repl', MASTER_PASSWORD='123';
db01 [(none)]>start slave; #启动线程
```

<br>

**(3) 恢复配置文件(db03)**

```sh
[server1]
hostname=10.0.0.51
port=3306
[server2]
hostname=10.0.0.52
port=3306
[server3]
hostname=10.0.0.53
port=3306
report_script=/usr/local/bin/send
```

<br>

**(4) 启动MHA** 

```sh
#db03
nohup masterha_manager --conf=/etc/mha/app1.cnf --remove_dead_master_conf --ignore_last_failover  < /dev/null> /var/log/mha/app1/manager.log 2>&1 &
[1] 16543
#db03
masterha_check_status --conf=/etc/mha/app1.cnf
app1 (pid:16543) is running(0:PING_OK), master:10.0.0.52
```

<br>

**(5)恢复 binlogserver** 

更换抓取目标

```sh
#binlogserver
cd /data/mysql/binlog    
rm -rf /data/mysql/binlog/*
mysqlbinlog  -R --host=10.0.0.52 --user=mha --password=mha --raw  --stop-never mysql-bin.000001 &
```

