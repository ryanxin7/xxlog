---
title: Rsync 数据镜像备份工具
intro: 基础知识
featured_image: ss8.jpg
tag:
  - 课程实战
  - Rsync
  - Linux 服务
category: linux
date: 2019-11-19 23:45:01
---
# Rsync 数据镜像备份工具

<br>

**[Rsync](https://mirrors.aliyun.com/centos/7.8.2003/os/x86_64/Packages/rsync-3.1.2-10.el7.x86_64.rpm?spm=a2c6h.13651111.0.0.5b472f70CV6308&file=rsync-3.1.2-10.el7.x86_64.rpm) 是一款实现全量及增量复制同步的软件**

具有开源，快速，多功能，全量及增量本地同步和多平台的特性

**增量本地同步以 delta-transfer 算法闻名可减少内网带宽。（具体实现方法见下文）**

<br>
<br>

## 什么是增量同步？
<br>

​    假如一个存储服务器要备份的目录大小为10G，第一次备份到备份服务器使用**全量备份**及所有数据全部备份到备份服务器中。

这时由于用户使用存储服务器目录大小增至15G，普通备份软件还是默认采用全量备份方式，效率较低浪费内网带宽。而使用 Rsync 备份采用**增量传输**方式，只传输增加的5G数据效率上大大提高。 



![linux-04-2](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linuxlinux-04-2.png)

<br>

## 服务命令简单应用
<br>

**Rsync 一个命令可以替换4个命令的应用效果**
<br>

**1.rsync = cp 效果**
<br>

```shell
rsync -a = cp -a
cp -a /etc/hosts /tmp/

[root@backup ~]# cp -a /etc/hosts /tmp/
[root@backup ~]# ll /tmp/

-rw-r--r--. 1 root root 352 Jan 17 21:25 hosts

[root@backup ~]# rsync -a /etc/sysconfig/network /tmp/
ll /tmp/

-rw-r--r--. 1 root root 352 Jan 27 01:15 hosts
```

**2.rsync = scp**
<br>

```shell
[root@backup ~]# scp -rp /tmp/ 172.16.1.31:/tmp/
-r 表示数据目录递归 -p 表示保持属性
[root@backup ~]# rsync -rp /tmp/ 172.16.1.31:/tmp/
```




<br>

**说明：**



同步数据时，`/tmp/`目录后有`/`，表示将目录下面的数据内容进行备份同步。<br>
同步数据时，`/tmp`目录后没有`/`，表示将目录及目录下面的数据内容进行备份同步。

<br>
<br>

**3.rsync = rm**
<br>

**说明：**


rsync实现删除目录中数据内容过程，就将一个空目录和一个有数据的目录进行同步
最终，会将有数据的目录中的文件进行清空。



```shell
rsync -r --delete /null/ /tmp/
```

**3.rsync == ls**

```
ls -l /etc/hosts
rsync /etc/hosts
```
<br>

## 七大特性总结
<br>

:::tip 特性总结



1. 支持拷贝普通文件与特殊文件如链接文件、设备文件等。

2. 支持排除指定文件目录，排除功能类似于tar打包命令中的排除。

3. 支持保持源文件或目录属性信息不变。

4. 支持增量同步，即只同步变化的数据，提升数据传输效率。

5. 支持使用rcp、rsh、ssh等方式来配合进行隧道加密传输文件。

6. 支持使用通过socket （守护进程方式）传输文件或目录数据信息。

7. 支持用户认证方式传输数据提升数据同步安全性。

   ::: 

   <br>

## 数据同步原理
<br>

​	**Quick check** 算法是根据文件或目录的权限、修改时间、发生变化的目录或文件、所有者、所有组等属性的变化进行的增量同步。

```sh
rsync 的参数说明

-v        详细模式输出，传输时显示信息
-z        传输时进行压缩，提高效率
-a        表示以递归方式传输文件，又包含了 rtopgDl参数
-r        递归
-t        保持文件时间信息
-o        保持文件属主信息
-p        保持文件权限
-g        保持文件属组信息
-D        设备文件信息
-l        保留软链接
-P        显示传输的进度信息        
-e        指定用什么隧道
```

隧道模式传输：

```shell
rsync -avz -e "ssh -p 22" /etc/hosts 172.16.1.31:/backup

--exclude               指定排除不需要的传输文件信息
--exclude-from=文件      文件所在的目录文件，即可实现排除多个文件
--bwlimit=速率           设置速率
--delete                无差异同步
```





<br>

指定相应的参数，可以实现只同步一个文件里有变化的内容部分。


**根据特定文件属性状态差异进行对比差异增量同步** 

<br>
<br>
<br>
<br>

##  工作方式
<br>

**本地数据同步（类似与cp）**

```sql
格式:  rsync [OPTION...] SRC... [DEST]

rsync            -- 数据同步命令

[OPTION...]      -- 命令参数信息

SRC              -- 要同步的数据信息（文件或目录）

[DEST]           -- 将数据传输到什么位置（目标）
```
<br>

**实际操作演示** 

```shell

[root@backup ~]# rsync /etc/hosts /tmp/<br>

[root@backup ~]# ls /tmp/hosts <br>

/tmp/hosts
```

<br>

**远程数据同步方式（类似scp）** 
<br>

**此类型又叫做隧道传输**

又分为拉和推两种方式
```sql
Pull: rsync [OPTION...] [USER@]HOST:SRC... [DEST]

Pull（拉）:
[USER@]      -- 表示以什么用户身份传输数据信息
HOST:        -- 远程主机信息（IP地址信息 主机名称信息）
SRC...       -- 表示远端要拉过来的数据信息
[DEST]       -- 拉到本地什么位置
Push: rsync [OPTION...] SRC... [USER@]HOST:DEST

Push（推）:
SRC...          -- 本地要推过去的数据信息
[DEST]        -- 推到什么位置
[USER@]             -- 表示以什么用户身份传输数据信息
HOST:        -- 远程主机信息（IP地址信息 主机名称信息）
```
<br>

**实际操作演示** 

```shell

rsync  /tmp/ root@10.0.0.1:/test 推

把本地的 /tmp/ 目录中的文件复制到10.0.0.1 的 /test 目录下


rsync  root@10.0.0.2:/tmp/ /test  拉

把10.0.0.2 的 /tmp/ 目录文件复制到本地的 /test目录中

```
<br>

## 守护进程部署——服务端

<br>

1. 确认软件安装 &nbsp;`rpm -qa rsyan` 或 `rpm -qa | grep rsyn*`
2. 配置文件编写 &nbsp;`vim /etc/rsyncd.conf`
3. 创建用户     &nbsp;`useradd -s /sbin/nologin -M rsync` 
4. 创建备份目录 &nbsp;`mkdir /backup -p && chown -R rsync.rsync /backup/`
5. 创建认证文件 &nbsp;`echo "rsync_backup:123456" >/etc/rsync.password && chmod 600 /etc/rsync.password`
6. 启动rsync服务&nbsp;命令：&nbsp;`rsync --daemon` 查看进程&nbsp;&nbsp;`ps -ef | grep rsync`

<br>

<br>

## 守护进程配置文件信息说明
<br>


![linux-04-1](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linuxlinux-04-1.png)

## 守护进程部署——客户端

<br>


1.确认软件安装   &nbsp;`rpm -qa rsyan` &nbsp;或&nbsp; `rpm -qa | grep rsyn*` <br>
2.创建认证密码文件  &nbsp;`echo "123456" >>/etc/rsync.password` &nbsp;&&&nbsp; `chmod 600 /etc/rsync.password`&nbsp;<br>
3.进行数据备份测试<br>
<br>


**客户端采取守护进程推送的方式来传输数据：**

```shell
rsync -avz /etc/hosts rsync_backup@10.0.0.2::backup --password-file=/etc/rsync.password
```


<br>
<br>

## 备份服务常见错误总结

<br>
<br>

**1.开启了 iptables防火墙 ：**`No route to host （113）`

**2.执行命令错误：** `The remote path must start with a module` 模块名称错误

**3.认证用户失败：** `auth failed no module user`




①密码或用户名错误
②密码文件名不一致
③rsync_backup:123456&nbsp;不要有空格
④认证文件权限不是600
⑤客户端认证文件不用输入用户名


<br>

**4.权限阻止问题： `Permisson denied `**
<br>



①属主、属组不是rsync
②备份目录权限不是755


<br>

**5.rsync服务位置模块错误**

【客户端的错误】

`Unknown module 'backup' ` 

【错误演示过程】



``` shell
[root@nfs01 tmp]# rsync -avz /etc/hosts rsync_backup@172.16.1.41::backup
@ERROR: Unknown module 'backup'
rsync error: error starting client-server protocol (code 5) at main.c(1503) [sender=3.0.6] 
```


【异常问题解决】

` /etc/rsyncd.conf`&nbsp;配置文件模块名称书写错误 

<br>

<br>

**6.rsync服务备份目录异常**

【客户端的错误】

` chdir failed`    

【错误演示过程】 

```shell
[root@nfs01 tmp]# rsync -avz /etc/hosts rsync_backup@172.16.1.41::backup
Password: 
@ERROR: chdir failed
rsync error: error starting client-server protocol (code 5) at main.c(1503) [sender=3.0.6]
```

【异常问题解决】

①备份存储目录没有建立
②建立的备份存储目录和配置文件定义不一致


<br>
<br>

**7.客户端执行慢**

连接慢问题&nbsp;&nbsp; IP   ===  域名    反向DNS解析

【错误日志信息】 

``` sql
2017/03/08 20:14:43 [3422] name lookup failed for 172.16.1.31: Name or service not known
2017/03/08 20:14:43 [3422] connect from UNKNOWN (172.16.1.31)
```


【异常问题解决】

在服务端 hosts文件中加入host主机地址与域名解析



<br>


## 备份扩展功能实践

<br>
<br>




**① 守护进程多模块功能配置**


第一步：修改配置文件

```shell
vim /etc/rsyncd.conf
[backup01]
comment = "backup dir by ryanxin"
path = /backup
[backup02]
comment = "backup dir by ryanxin"
path = /backup02
```

第二步：创建多模块目录

```shell
mkdir /backup02
chown -R rsync.rsync /backup02
```

第三步：重启服务程序

```shell
killall rsync
rsync --daemon
```

<br>


第四步：进行测试检查


<br>

**② 守护进程的排除功能**



<br>

**数据备份排除方式：`--exclude`**

<br>

```sh
rsync -avz /text_dir/ --exclude=b --exclude=d rsync_backup@10.0.0.1::back01 
--password-file=/etc/rsync.password
```

<br>

也可以写成  `--exclude ={b,d}` 或者连续表示  `--exclude = {b..d}`

<br>

**多个文件大量信息排除**

<br>

在要排除大量文件的时候你不可能一个一个排除就需要使用 `--exclude-from=file` 

指定一个文件在文件然后在文件里面写入你要排除的文件

<br>

**注意：要写相对路径！**

<br>

**例如：我想排除 a 和 b 文件**

`a`   每一行写一个文件的名字<br>

`b`   一个文件名字


文件名字为：`exclude_file.txt`

**命令如下：**

```sh
rsync -avz /test_dir/ --exclude-from=./exclude_file.txt rsync_backup@172.16.1.41::backup01 --password-file=/etc/rsync.password
```

<br>



**③守护进程创建备份目录**


<br>

在配置文件模块后面加入/dba 目录 就可实现不同的目录机构


`backup01/dba`

<br>

**命令如下：**

```sh
rsync -avz /etc/hosts --exclude-from=./exclude_file.txt rsync_backup@172.16.1.41::backup01/sa/ --password-file=/etc/rsync.password

rsync -avz /etc/hosts --exclude-from=./exclude_file.txt rsync_backup@172.16.1.41::backup01/dev/ --password-file=/etc/rsync.password

rsync -avz /etc/hosts --exclude-from=./exclude_file.txt rsync_backup@172.16.1.41::backup01/dba/ --password-file=/etc/rsync.password
```




<br>



**④ 守护进程的访问控制配置**


<br>

**三种情况：**



1. 只有白名单，白名单网段或主机信息允许。其余阻止

2. 只有黑名单，黑名单网段或主机信息阻止，其余允许

3. 有黑名单也要白名单，白名单网段或主机信息允许，黑名单网段或主机信息阻止，其余允许

   <br>

**建议只选择前两种方式配置**


```sh
hosts allow = 172.16.1.0/24

hosts deny = 0.0.0./32
```

<br>
<br>

 **⑤ 守护进程无差异同步配置**


<br>

 **我有的，你也有；我没有的，你也不能有**



```shell
 rsync -avz /test_dir/ --delete rsync_backup@172.16.1.41::backup01 
 --password-file=/etc/rsync.password
```

<br>

 **说明：一定要谨慎使用，否则可能会清空备份目录；
  如果要快速清空目录数据，也可以使用无差异同步清空**



<br>



**⑥ 守护进程的列表功能配置**

`list = false`

**说明：表示是否列表显示rsync服务端所有模块信息**

```shell
[root@nfs01 test_dir]# rsync rsync_backup@172.16.1.41::
backup01       	"backup dir by oldboy"
backup02       	"backup dir by oldboy"
会降低服务端安全性不建议开启
```

<br>

**文章来源：**

[路飞学城](https://www.luffycity.com)

[西门大官人](https://www.cnblogs.com/dadonggg/p/8608612.html)

::: warning 申明
本页资源来源于互联网及公开渠道，仅供学习参考，版权归原创者所有! 如侵犯到您的权益，请及时通知我们！我们将在第一时间内删除。
:::



 <br>
