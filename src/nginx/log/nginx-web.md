---
title: Nginx Web快速入门
tag: 
    - 集群架构
    - Nginx

category: 
   - Nginx
date: 2019-9-15 16:56:11
---




# Nginx Web快速入门


## 1.Nginx 介绍

### 1.1什么是Nginx ？


**Nginx** 是一个开源且高性能、可靠的 Http Web 服务、代理服务。
- 开源，体现在直接获取Nginx的源代码。
- 高性能，体现在支持海量的并发。
- 高可靠，体现在服务稳定。


<br>

<br>

### 1.2为什么选择 Nginx ？

#### 1.2.1高性能、高并发
通常正常情况下，单次请求会得到更快的响应。另一方面在高峰期(如有数以万计的并发请求)，Nginx可以比其他Web服务器更快地响应请求。



<br>

#### 1.2.2高扩展性
Nginx功能模块化。Nginx官方提供了非常多的优秀模块提供使用。这些模块都可以实现快速增加和减少。


<br>

#### 1.2.3高可靠性
所谓高可靠性，是指Nginx可以在服务器上持续不间断的运行，而很多web服务器往往运行几周或几个月就需要进行一次重启。对于nginx这样的一一个高并发、高性能的反向代理服务器而言，他往往运行网站架构的最前端，那么此时如果我们企业如果想提供9999、99999,对于nginx持续运行能够宕机的时间，一年可能只能以秒来计算，所以在这样的一个角色中，nginx的高可靠性为我们提供了非常好的保证。


<br>

#### 1.2.4 热部署

`热部署`:是指在不停服务的情况下升级nginx,这个功能非常的重要。对于普通的服务，需要kill掉进程在启动，但对于Nginx而言，如果Nginx有 很多的客户端连接，那么kil掉Nginx。 Nginx会像客户端发送tcp reset复位包，但很多客户端无法很好的理解reset包，就会造成异常。由于Nginx的master管理进程与worker工作进程的分离设计，使得Nginx能够在7x24小时不间断服务的前提下，升级Nginx的可执行文件。当然，也支持不停止服务更新配置、更换日志文件等功能。

<br>

#### 1.2.5 应用广泛

首先Nginx技术成熟，具备企业最常使用的功能，如代理、代理缓存、负载均衡、静态资源、动静分离、Https、 Inmp、 nmt等等其次使用Nginx统一技术栈，降低维护成本，同时降低技术更新成本。

<br>

#### 1.2.6 网络模型

Nginx使用`Epool`网络模型，而常听到Apache 采用的是`Select`网络模型。
- Select:当用户发起一次请求，select模型就 会进行一次遍历扫描，从而导致性能低下。
- Epoll:当用户发起请求，epoll模型会直接进行处理，效率高效。

<br>

### 1.3 Nginx应用场景

Nginx的主要使用场景我归纳为三个，分为是静态资源服务、代理资源服务、安全服务，场景详细介绍如下：
如下图是一个网站的基本架构， 首先用户请求先到达nginx,然后在到tomcat或php这样的应用
服务器，然后应用服务器在去访问redis、mysq|l这样的数据库，提供基本的数据功能。
<br>


![nginx基本结构](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx基本结构.jpg)

<br>


#### 1.3.1 nginx 负载均衡

那么这里有一个问题，我们的程序代码要求开发效率高,所以他的运行效率是很低的，或者说它并发是受限，所以我们需要很多应用服务组成一个集群，为更多用户提供访问。而应用服务一但构成集群， 则需要我们的nginx 具有反向代理功能，这样可以将动态请求传倒给集群服务。

<br>

但很多应用构成集群，那么一定会带来两个需求。
1. 应用服务器需要动态扩展。
2. 有些服务出问题需要做容灾。
那么我们的反向代理必须具备负载均衡功能。


![nginx负载均衡](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx负载均衡.jpg)

<br>
<br>


#### 1.3.2 nginx 代理缓存

其次，随着我们网络链路的增长，用户体验到的时延则会增加。如果我们能把一段时间内不会发生变化的"动态"内容，缓存在Nginx,由Nginx 直接向用户提供访问，那么这样用户请求的时延就会减少很多，所以在这里反向代理会演生出另外一个功能"缓存"，因为它能加速我们的访问。


<br>

![nginx代理缓存](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx代理缓存.jpg)

<br>



#### 1.3.3 nginx 静态服务

在很多时候我们访问docs、pdf、mp4、 png等这样的`静态资源`时，是没有必要将这些请求通过Nginx交给后端的应用服务，我们只需要通过Nginx直接处理'`静态资源`"即可。这是Nginx的静态资源功能。


![nginx静态服务](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx静态服务.jpg)



<br>

#### 1.3.4 nginx 安全服务


当我们使用http网站时，可能会遭到劫持和篡改, 如果使用https安全通讯协议，那么数据在传输过程中是加密的，从而能有效的避免黑客窃取或者篡改数据信息，同时也能避免网站在传输过程中的信息泄露。大大的提升我们网站安全。


![nginx安全服务](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx安全服务.jpg)

<br>
<br>



### 1.4 Nginx组成部分

在这里我们将Nginx的组成架构比喻为-辆汽车:<br>

这个`汽车`提供了基本的驾驶功能，但是还需要一个`驾驶员`控制这辆汽车开往哪个方向,同时该汽车行驶过的地方还会形成`GPS轨迹`，如果汽车在行驶的过程中出现了任何问题，我们需要一个`黑匣子`，分析是汽车本身的问题，还是驾驶人员的操作出现了问题。

<br>

![nginx服务组成](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx服务组成.jpg)

<br>


1. 第一个组成部分`Nginx二进制可执行文件`:它是Nginx本身框架以及相关模块等构建的一个二进制文件，这个文件就相当于汽车本身，所有的功能都由它提供。


2. 第二个组成部分`Nginx.conf`文件:它相当于驾驶人员，虽然二进制可执行文件已经提供了许多的功能，但是这些功能究竟有没有开启，或者开启后定义怎样的行为去处理请求，都是由`nginx.conf`这个文件决定的，所以他就相当于这个汽车的驾驶员，控制这个汽车的行为。
3. 第三个组成部分`access.log`:它相当于这辆汽车经过所有地方形成的GPS轨迹，`access.log`会记录Nginx处理过的每一条HTTP的请求信息 响应信息。
4. 第四个组成部分`error.log`:它相当于黑匣子，当出现了- -些不可预期的问题时，可以通过error.log将问题定位出来。


<br>
<br>


### 1.5 Nginx组成部分小结: 

Nginx的组成部分是相辅相成，Nginx二进制可执行文件和Nginx.conf文件，它定义了Nginx处理请求的方式。
而如果我们想对nginx服务做一些web的运 营和运维，需要对access.log做进一步分析。而如果出现了任何未知的错误，或者预期的行为不-致时，应该通过error.log 去定位根本性的问
题。


<br>
<br>


## 2.Nginx快速安装

安装Nginx软件的方式有很多种，分为如下几种：
1. 源码编译👉Nginx (1.版本随意2.安装复杂3.升级繁琐)
2. epel仓库👉>Nginx (1.版本较低2.安装简单3.配置不易读)
3. 官方仓库👉Nginx (1.版本较新2.安装简单3.配置易读，推荐😊)


<br>
<br>

### 2.1 安装Nginx软件所需依赖包
```sh
[root@web ~]# yum install -y gcc gcc-c++ autoconf pcre pcre-devel make automake httpd-tools
```
<br>

### 2.2 配置nginx官方yum源
```sh
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/ keys/nginx_signing.key
```
<br>

### 2.3 安装Nginx服务,启动并加入开机自启
```sh
[root@web ~]# yum install nginx -y
[root@web ~]# systemctl enable nginx
[root@web ~]# systemctl start nginx
```
<br>
<br>

### 2.4 通过浏览器访问该服务器ip地址获取资源

![welcomnginx](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/welcomnginx.jpg)

<br>

### 2.5 检查Nginx软件版本以及编译参数
```sh
[root@web ~]# nginx -V
nginx version: nginx/1.16.0
```

<br>

<br>

### 2.6 Nginx软件目录结构


为了让大家更清晰的了解Nginx软件的全貌，可使用`rpm -ql nginx`查看整体的目录结构及对应的功能，如下表格整理了Nginx比较重要的配置文件.


<br>


#### 2.6.1 Nginx主配置文件
|路径|类型|作用|
|:--:|:--:|:--:|
|`/etc/nginx/nginx.conf`|配置文件|nginx主配置文件|
|`/etc/nginx/conf.d/default.conf`|配置文件|默认网站配置文件|


<br>

#### 2.6.2 Nginx代理相关参数文件
|路径|类型|作用|
|:--:|:--:|:--:|
|`/etc/nginx/fastcgi_ params`|配置文件|Fastcgi代理配置文件|
|`/etc/nginx/scgi params`|配置文件|scgi代理配置文件|
|`/etc/nginx/uwsgi_ params`|配置文件|uwsgi代理配置文件|


<br>

#### 2.6.3 Nginx编码相关配置文件
|路径|类型|作用|
|:--:|:--:|:--:|
|`/etc/nginx/win-utf`|配置文件|Nginx编码转换映射文件|
|`/etc/nginx/koi-utf`|配置文件|Nginx编码转换映射文件|
|`/etc/nginx/koi-win`|配置文件|Nginx编码转换映射文件|
|`/etc/nginx/mime.types`|配置文件|Content-Type与扩展名|

<br>

#### 2.6.4 Nginx管理相关命令

|路径|类型|作用|
|:--:|:--:|:--:|
|`/usr/sbin/nginx`|命令|Nginx命令行管理终端工具|
|`/usr/sbin/nginx-debug`|命令|Nginx命令行与终端调试工具|

<br>


#### 2.6.5 Nginx日志相关目录与文件

|路径|类型|作用|
|:--:|:--:|:--:|
|`/var/log/nginx`|目录|Nginx默认存放日志目录|
|`/etc/logrotate.d/nginx`|配置文件|Nginx默认的日志切割|
<br>


## 3.Nginx基本配置

Nginx主配置文件`/etc/nginx/nginx.conf`是一个纯文本类型的文件， 整个配置文件是以区块的形式组织的。
一般，每个区块以一 对大括号`{}`来表示开始与结束。

Nginx主配置文件整体分为三块进行学习，分别是CoreModule(核心模块)， EventModule(事件驱动模块)，HttpCoreModule(http内核模块)

<br>


`CoreModule`核心模块
```sh
user www;                        #Nginx进程所使用的用户
worker_ processes 1 ;            #Nginx运行的work进程数量(建议与CPU数量-致或auto)
error_ log /1og/nginx/error.log  #Nginx 错误日志存放路径
pid /var/run/nginx.pid           #Nginx服务运行后产生的pid进程号
```

<br>



`events`事件模块

```sh
events {
worker_ connections 25535; # 每个worker进程支持的最大连接数
use epoll;
#事件驱动模型，epoll默认
}
```

<br>
<br>

`http`内核模块

```sh
http { #http层开始
...
#使用Server配置网站，每个Server{}代表一个网站( 简称虚拟主机)
server {
   listen          80;         #监听端口，默认80
   server_ name  oldxu. com;   #提供的域名
   access_ log    access.log;  #该网站的访问日志


#控制网站访问的路径
    location / {
       root  /usr/share/nginx/html; #存放网站源代码的位置
       index index. html index.htm; #默认返回网站的文件
   }
}
...

#第二个虚拟主机配置
server {
...

  }

include /etc/nginx/conf.d/* .conf; #包含/etc/nginx/conf.d/目录 下所有以. conf结尾的文件

#include作用是:简化主配置文件写太多造成臃肿，这样会让整体的配置文件更加的清晰。


} #http层结束


```

<br>

**PS**: Nginx中的`http`、`server`、`location` 之间的关系是?<br>
`http标签` 主要用来解决用户的请求与响应。<br>
`server标签`主要用来响应具体的某一个网站。<br>
`location标签 `主要用于匹配网站具体URL路径。<br>
`http{}` 层下允许有多个 `Server{}`,一个`Server{}` 下又允许有多`locationf{}`<br>

<br>


## 4.Nginx搭建网站

### 4.1 新增nginx配置文件

```sh
server {
    listen 80;
    server_ name game.oldxu.com;
   
    location / {
        root /code;
        index index.html;
    }
}
```

### 4.2 放置游戏源代码文件至nginx配置文件root指定的目录


```sh
[root@web01 conf.d]# mkdir /code && cd /code
[root@web01 code]# wget http://fj.xuliangwei.com/public/html5.zip
[root@web01 code]# unzip html5.zip
[root@web01 code]# ls
ceshi game html5.zip img index.html readme.txt
```

<br>

### 4.3 检查nginx的语法是否存在错误

```sh
[root@web01 code]# nginx -t
nginx: the configuration file /etc/ nginx/nginx. conf syntax is ok
nginx: configuration file /etc/nginx/nginx. conf test is successful
```
<br>

### 4.4 重载Nginx 服务
```sh
[root@web01 code]# systemctl reload nginx
```


<br>

## 5.Nginx 虚拟主机

**Nginx 配置虚拟主机有如下三种方式**:
1. 基于主机多P方式
2. 基于端口的配置方式
3. 基于多个hosts名称方式(多域名方式)

<br>

### 5.1 Nginx 基于多网卡多IP方式配置实践


```sh
server {
    listen 80;
    ...
    server_ name 10.0.0.1:80;
    ...


server {
    listen 80;
    ...
    server_ name 10.0.0.2:80;
    ...    

```
<br>

### 5.2 Nginx 基于端口虚拟主机配置实践

Nginx多端口虚拟主机方式，具体配置如下：

```sh
#仅修改listen.监听端口即可，但不能和系统端口出现冲突
server {
    ...
listen 80;
    ...
}

server {
    ...
listen 81;
    ...
}

server {
    ...
listen 83;
    ...
}
```
<br>

### 5.2 Nginx 基于Host名称虚拟主机配置实践

1.创建对应的web站点目录以及程序代码
```sh
[root@web01 ~]# mkdir /code/{server1, server2}
[root@web01 ~]# echo "server1" > /code/server1/index. html
[root@web01 ~]# echo "server2” > /code/server2/ index. html
```

2.配置不同域名的虚拟主机
```sh

server {
    listen    80;
    server_ name   1.text.com;
    root /code/server1; 
    index index.html ;
    ...
}

server {
    listen    80;
    server_ name   2.text.com;
    root /code/ server2; 
    index index. html ;
}

```


<br>
<br>



## 6.Nginx常用模块
### 6.1 Nginx目录索引

当`ngx_http_jindex_module`模块找不到索引文件时，通常会将请求传递给`ngx_ http_autoindex_module`模块。<br>
`ngx_ http_autoindex_module`模块处理以斜杠字符(/)结尾的请求，并生成目录列表。<br>

<br>

#### 6.1.1 指令
```sh
#启用或禁用目录列表输出，on开启， off关闭。
Syntax: autoindex on|off;
Default:    autoindex off;
Context :   http，server, location


#指定是否应在目录列表中输出确切的文件大小，on显示字节，off显示大概单位。
Syntax: autoindex_ exact_ size on | off;
Default: autoindex_ exact_ size on;
Context:http,server,location

#指定目录列表中的时间是应以本地时区还是UTC输出。on本地时区，off UTC时间。
Syntax: autoindex_ localtime on|off;
Default: autoindex_ localtime off;
Context: http，server, location
```

<br>


#### 6.1.2 场景示例:目录索引
```sh
[root@web ~]# cat /etc/nginx/conf.d/mirror.jx.com.conf
server {
    listen 80;
    server_name mirror.jx.com;
    charset utf-8;
    #设定字符集，防止中文字符乱码显示。

    autoindex on;
    autoindex_exact_size off;
    autoindex_locatime on;

    location / {  root /code/;
}
```

<br>

#### 6.1.3 场景示例:模拟搭建企业内部yum仓库
```sh
server {
    listen 80;
    server_name mirror.jx.com;
    charset utf-8;
    root /mirror;

    location / {
    index index.html;
    }

    #提供yum仓库目录
    location /repo {
    autoindex on;
    autoindex_exact_size off;
    autoindex_localtime on;
    }
}
#使用rsync同步中国科学技术大学开源软件镜像
rsync -avz rsync://rsync.mirrors.ustc.edu.cn/repo/centos/ /mirror/repo/
```

<br>

<br>



### 6.2 Nginx访问控制

`ngx_http_access_module`模块允许限制对某些客户端地址的访问。




### 6.2.1 指令
```sh

#允许配置语法
Syntax: allow address | CIDR | unix: | all;
Default:  -
Context :  http,server,location,limit_except


#拒绝配置语法
Syntax: deny address| CIDR| unix:| all;
Default :  -
Context:http,server,location,limit_except
```


#### 6.2.2 场景示例，只允许指定的来源IP能访问/centos, 其它网段全部拒绝。

```sh
server {
    listen 80;
    server_ name mirror.jx.com;
    charset utf-8;     #设定字符集，防止中文字符乱码显示。
    autoindex on;
    autoindex_ exact_size off;
    autoindex_locatime on ;

    location / {
    index index.html;
    }

    location /centos {
    allow 127.0.0.1;
    allow 10.0.0.1/32; #允许地址或地址段
    deny all;   #拒绝所有人
    }
}
```
<br>

#### 6.2.3 场景示例，拒绝指定的IP访问该网站的/centos,其他IP全部允许访问。
```sh
server {
    listen 80;
    server_ name mirror.jx.com;
    charset utf-8;
    #设定字符集，防止中文字符乱码显示。
    autoindex on;
    autoindex_exact_size off;
    autoindex_locatime on;
    
    location / {
    index index.html ;
    
    location /centos{
    deny 10.0.0.1/32; #拒绝指定的地址或地址段
    allow all;        #允许所有的地址
    }
}
```   
<br>

`注意`:deny和allow的顺序是有影响的<br>

默认情况下，从第一条规则进行匹配,如果匹配成功，则不继续匹配下面的内容。如果匹配不成功，则继续往下寻找能匹配成功的内容。

<br>
<br>

`ngx_http__auth_basic_module` 模块允许使用HTTP基本身份验证，验证用户名和密码来限制对资源的访问.


#### 6.2.4 指令

```sh
#使用HTTP基本身份验证协议启用用户名和密码验证。
Syntax: auth_basic string | off;
Default: auth_basic off;
Context: http,server,location,limit_except

#指定保存用户名和密码的文件
Syntax: auth_basic__user_file file;
Default:  一
Context: http， server,location,limit_except
2.指定保存用户名和密码的文件，格式如下:


#可以使用htpasswd程序或"openssl passwd ”命令生成对应的密码;
name1: passwd1
name2: passwd2

#使用htpaaswd创建新的密码文件，-c创建新文件-b允许命令行输入密码
yum install httpd- tools
htpasswd -b -C /etc/nginx/auth_conf test 123456
```
<br>


#### 6.2.5 场景示例，基于用户名和密码认证实践。

```sh

server {
     listen 80;
     server_name mirror.jx.com;
     charset utf-8;
     #设定字符集，防止中文字符乱码显示。
     autoindex on;
     autoindex_exact_size off;
     autoindex_locatime on;
     
     location / {
     index index.html;
     
     }
     
     location /centos {
         auth_basic" Auth access Blog Input your Passwd!";
         auth_basic_user_file /etc/nginx/auth_conf; 
     }
}

```

<br>
<br>


### 6.3 Nginx请求限制与链接限制

#### 6.3.1 为什么要做限制?
限制某个用户在一定时间内能够产生的Http请求。或者说限制某个用户的下载速度。
<br>




<br>

#### 6.3.2 应用场景
- 下载限速:限制用户下载资源的速度，使用`Nginx ngx_http_core_module`。
- 请求限制:限制用户单位时间内所产生的Http请求数，使用`Nginx ngx_http_limit req_module`。
- 连接限制:限制同一时间的连接数,及并发数限制。使用`Nginx ngx_http_limit_conn_module`。


<br>

#### 6.3.3 请求频率限速实现的原理?

![nginx频率限速原理](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx频率限速原理.jpg)

<br>

如图：水(请求)从上方倒入水桶，从水桶下方流出(被处理) ;<br>
如果说水(请求) 流入的过快，水桶流出(被处理)的过慢，来不及流出的水存在水桶中(缓存)，然后以固定速率流出，水桶满后则水溢出(丢弃)<br>
<br>

**简单来说就是**:当处理速度,达不到请求的速度，则会将请求放置缓存， 然后持续处理。当缓存空间被沾满，如果还有大量的请求，则会被丢弃。<br>

<br>


**请求限制**

连接限制主要用于处理用户的连接，只算是一方面的限制，而且有时候这样一刀切不是很友好，比如限制了总共允许多少个连接，如果别人属于攻击该网站，一下子建立一万个线程发起连接，可能你连接池两下就撑爆了，真正的用户进步不进来，此时就需要这样一个限制，限制来自同一个客户端的请求我们每秒只给它处理多少个请求，想要请求更多，那就等着，这样连接池不会被占满，别人也能正常使用。

<br>
Nginx 的 `http_limit_req_module` 模块就可以实现该需求，并且默认编译。 <br>

|参数|说明|
|:--:|--|
|limit_req_zone|	设置一块共享内存用来保存键值的状态参数。只能 http 段，语法：`limit_req_zone $variable zone=name:size rate=rate`;|
|limit_req_log_level|	设置日志级别。语法：`limit_req_log_level (info) (notice) (warn) (error);|`
|limit_req_status|	设置拒绝请求的响应状态码，默认 503。语法：`limit_req_status code`;|
|limit_req|	设置对应的共享内存限制域和允许被处理的最大请求数阈值。语法：`limit_req zone=name [burst=number] [nodelay]`;|


<br>


**参数说明**：

- `limit_req_zone`：和之前的 `limit_conn_zone` 类似，只是多了个 rate 配置，用法也类似。
- `rate`：必须是整数，如 1r/s，如果是2秒处理1个只能换成 30r/m 这样来实现整数。
- `burst`：超出后允许的排队个数。
- `nodelay`：排队也能直接执行，但是再超出则马上返回 503。
 


<br>

#### 6.3.4 场景实践 限制单位时间内所产生的Http请求数。

1. 模块指令：
```sh
Syntax: limit_req_zone key zone=name:size rate=rate; 
Default: -
Context: http

Syntax: limit_conn zone number [ burst=number] [nodelay];
Default: -
Context: http,server,location

```

<br>


2. 基于来源IP对下载速率限制，限制每秒处理1次请求，但可以突发超过5个请求放入缓存区


```sh
# http标签段定义请求限制,rate限制速率，限制一秒钟最多一个IP请求

http {
   limit_req_zone $binary_remote_addr zone=req_one:10m rate=1r/s;
}

server {
    listen 80;
    server_name mirror.jx.com;
    #请求超过1r/s,剩下的将被延迟处理，请求数超过burst定义的数量，则返回503
    limit_req zone=req_one burst=3 nodelay; #nodelay 排队也能直接执行，但是再超出则马上返回 503
    location / {
        root /code;
        index index.html;
    }
}

limit_req_zone $binary_remote_addr zone=req_one:10m rate=1r/s;
#第一个参数: $binary_remote_gaddr 表示通过这个标识来做限制，限制同一客户端ip地址。
#第二个参数: zone=req_one:10m表示生成一个大小为10M，名为req_one的内存区域，用来存储访问的频次信息。
#第三个参数: rate=1r/s表示允许相同标识的客户端的访问频次，这里限制的是每秒1次。
limit_req zone=req_one burst=3 nodelay;
#第一个参数: zone=req_one设置使用哪个配置区域来做限制，与上面limit_req_zone里的name对应。
#第二个参数: burst=3，设置一个大小为3的缓冲区，当有大量请求过来时，超过了访问频次限制的请求可以先放到这个缓冲区内。
#第三个参数: nodelay,超过访问频次并且缓冲区也满了的时候，则会返回503， 如果没有设置，则所有请求会等待排队。

```

<br>

<br>


Nginx 默认包含了 `http_limit_conn_module` 模块，能够帮助我们对网站的用户请求量，网速，IP 等进行限制。防止不法分子而已对我们的网站进行攻击。<br>

**参数包含如下**：<br>


|参数|说明|
|:--:|--|
|`limit_conn_zone`|会话状态存储区域，只能 http 段配置，语法：`limit_conn_zone $variable zone=name:size`;|
|`limit_zone`|和 `limit_conn_zone` 同等意思，已被弃用
|`limit_conn_log_level`|当达到最大限制连接数后，记录日志的等级，语法：`limit_conn_log_level info ( notice )( warn) ( error)`|
|`limit_conn`|指定每个给定键值的最大同时连接数，当超过时返回 503，语法：`limit_conn zone_name number`|
|`limit_conn_status`|	指定当超过限制时，返回的状态码，默认是 503，语法：`limit_conn_status code;`|
|`limit_rate`|对每个连接限速。单位是字节/秒，设置为 0 将关闭限速，语法：`limit_rate rate`，实质是限制 IP 每个线程的网速|

<br>


**特别说明**：

- `limit_conn_zone` 一般用法：`limit_conn_zone $binary_remote_addr zone=addr:10m`;
- `$binary_remote_addr` 是二进制客户端地址，长度固定 4 字节，每个客户端以自己 IP 二进制作为键存储在空间中。
- 定义了一个空间，名称为 `addr`，给了 10M 共享内存，每 M 存大约 1.6 万。按需根据实际情况相应调整大小。
 



#### 6.3.5 场景实践 限制客户端同一时刻的并发连接数。


1. 模块指令
```sh
Syntax: limit_conn_zone key zone=name:size;
Default:  -
Context: http

Syntax: limit_conn zone number ;
Default:  -
Context: http,server,location
```
<br>

<br>



2. 设置共享内存区域和给定键值的最大允许个连接数2个，超过此限制时，服务器将返回503错误以回复请求

```sh
limit_conn_zone $binary_remote_addr zone=conn_mg:10m; 

server {
    listen 80;
    server_name mirror.jx.com;
    root /code;
    charset utf8;
    autoindex on;
    autoindex_ exact_ size off;
    autoindex_ localtime on;

    limit_conn conn_mg 2
    location / {
        index index.html
    }
}    
```

<br>

<br>

#### 6.3.6 场景实践三 限制下载速度。

```sh
server {
listen 80;
    server_name mirror.jx.com;
    root /code;
    charset utf8;
    autoindex on;
    autoindex_exact_size off;
    autoindex_localtime on;
    
    limit_rate_after 100m; #达到100m开始限速
    limit_rate 100k;
    
    location / {
    index index.html ;
    }
}
```
<br>

<br>

#### 6.3.7 综合案例

- 限制web服务器请求数处理为1秒一个，触发值为5、限制用户仅可同时下载一个文件。
- 当下载超过100M则限制下载速度为500k。如果同时下载超过2个视频，则返回提示"请联系站长进行会员充值"。



```sh
limit_req_zone $binary_remote_addr zone=req_mg:10m rate=1r/s;
limit_conn_zone $binary_remote_addr zone=conn_mg:10m;

server {
    listen 80;
    server_name mirror.jx.com;
    root /code;
    charset utf8;
    autoindex on;
    autoindex_exact_size off;
    autoindex_localtime on
    
    limit_req zone=req_mg burst=5 nodelay;
    limit_conn conn_mg 1;
    limit_rate_after 100m;
    limit_rate 500k;
    
    error_page 503 @errpage;
    location @errpage {
        default_type text/html;
        return 200 '温馨提示-->请联系站长进行会员充值';
    }
    location / {
       index index.html;
    }
}
```
<br>

<br>


### 6.4 Nginx 状态监控
`ngx_http_stub_status_module`模块提供对基本状态信息的访问。
默认情况下不集成该模块，需要使用--with-http_stub_status_module集成。

1. 指令

```sh
Syntax: stub_status;
Default: -
Context: server, location
```
<br>

 
2. 示例配置

```sh
server {
    listen 80;
    server_name mirror .oldxu. com;
    access_1og off;
    
    location /nginx_ status {  #不需要创建根目录
    stub_ status ;
}
```


<br>


### 6.4.1 提供以下状态信息

|状态|含义|
|:--:|--|
|Active connections|当前活跃连接数，包括Waiting等待连接数。|
|accepts|已接收的总TCP连接数量。|
|handled|已处理的TCP连接数量。|
|requests|当前总http请求数量。|
|Reading|当前读取的请求头数量。|
|Writing|当前响应的请求头数量。|
|Waiting|当前等待请求的空闲客户端连接数|


<br>

### 6.4.2 如何简单理解Reading、Writing、 Waiting。

假设现在有两条船分别为: C、S。C船需要S船的1个物品，那么此时C船就要给S船发送一个消息。
1. S船收到这个消息时就是reading。
2. S船将物资发送给C船，这个时候就是writing。
3. 如果C船需要S船很多个物品，那么需要C船和S船建立起一个物资传送管道，不断的传送物资。这个管道建立起来的时候，就是waiting状态了。


<br>

<br>



### 6.5 Nginx Location

1. 什么是Location
Location用来控制访问网站的uri路径

<br>

2. Location语法

```sh
location[=|~|~*|^~]uri{...}
location @name { ... }

```

|匹配符|匹配规则|优先级|
|:--:|:--:|:--:|
|`=`|精确匹配|1|
|`^~`|以某个字符串开头|2|
|`~`|区分大小写的正则匹配|3
|`~*`|不区分大小写的正则匹配|4|
|`/`|通用匹配，任何请求都会匹配到|5|

<br>
<br>

3. location优先级语法示例

```sh
server {
    listen 80;
    server_name location.xin.com; 
    
    
    location = / {
         default_type text/html;
         return 200 'location = /';


    location / {
        default_type text/html;
         return 200 'location /';
        }


    location /documents/ {
        default_type text/html;
         return 200 'location /documents/';
        }


    location ^~ /images/ {
        default_type text/html;
         mreturn 200 'location ^~ /images/' ;
        }

    location ~* \. (gif|jpgljpeg)$ {
        default_type text/html;
         return 200 'location ~* \. (gif|jpgljpeg)';
        }

```

```sh
#测试结果如下(建议是curL测试)

#1.请求http://location.xin.com/
会被Location =/匹配

#2.请求http://location.xin.com/index.html
会被Location /匹配

#3.请求http://location.xin.com/documents/1.html
会被Location /documents/匹配

#4.请求http://location.xin.com/images/1.gif
会被Location ^~ /images/匹配

#5.请求http://location.xin.com/documents/1.jpg
会被location ~* \.(gif|jpg|jpeg)$匹配

```




4. Locaiton 规则配置应用场景，可进行验证测试


```sh

server {
    listen 80;
    server_name location.xin.com; 
    
    
    
    #通用匹配，任何请求都会匹配到
    location / {
    root html;
    index index.html;
    }
    
    
    #精准匹配,必须请求的uri是/nginx_status
    location = /nginx_status {
    stub_status ;
    }

    #严格区分大小写，匹配以.php结尾的都走这个location
    location ~ \.php$ {
    default_type text/html;
    return 200 'php访问成功';
    }


    #严格区分大小写，匹配以.jsp结尾的都走这个location
    location ~ \.jsp$ {
    default_type text/html;
    return 200 'jsp访问成功';
    }


    #不区分大小写匹配，只要用户访问.jpg,gif,png,js,css都走这条location
    location ~* \. (jpg|gif|png|js|css)$ {
    return 403;
    
    
    #不区分大小写匹配
    location ~* \. (sq1|bak|tgz|tar.gz|.git)$ {
    deny all;
    }
}

```