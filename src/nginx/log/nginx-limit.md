---
title: Nginx 访问限制
tag: 
    - 集群架构
    - Nginx

category: 
   - Nginx
date: 2019-9-17 13:56:11
---



# 1. Nginx 访问限制

`ngx_http_access_module`模块允许限制对某些客户端地址的访问。


这里所说的访问限制主要就是限制来源的客户端 IP 地址，可以设置类似 IP 黑白名单一样的东西，比如某些内部的服务，我们只希望在我们办公室的 IP 能够访问，也比如有个不法分子的 IP 一直在疯狂的请求我们网站，需要把它封了，这些都需要用到该功能。

Nginx 的 `ngx_http_access_module` 模块提供了这样的功能，默认编译。主要两个参数：


|参数|说明|
|:--:|--|
|allow	允许某个 ip 或者一个 ip 段访问，如果指定 unix: ，那将允许 socket 的访问。语法：allow address | CIDR | unix: | all;
|deny	和 allow 相反。语法：deny address | CIDR | unix: | all;


## 1.1 模块指令
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


## 1.2 场景示例，只允许指定的来源IP能访问, 其它网段全部拒绝。

```sh
server {
    listen 80;
    server_ name mirror.jx.com;
    charset utf-8;     #设定字符集，防止中文字符乱码显示。
    autoindex on;
    autoindex_exact_size off;
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

## 1.3 场景示例，拒绝指定的IP访问该网站的,其他IP全部允许访问。
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


# 2.身份验证

`ngx_http__auth_basic_module` 模块允许使用HTTP基本身份验证，验证用户名和密码来限制对资源的访问.


## 2.1 指令

```sh
#使用HTTP基本身份验证协议启用用户名和密码验证。
Syntax: auth_basic string | off;
Default: auth_basic off;
Context: http,server,location,limit_except

#指定保存用户名和密码的文件
Syntax: auth_basic_user_file file;
Default:  -
Context: http,server,location,limit_except
2.指定保存用户名和密码的文件，格式如下:


#可以使用htpasswd程序或"openssl passwd ”命令生成对应的密码;
name1: passwd1
name2: passwd2

#使用htpaaswd创建新的密码文件，-c创建新文件-b允许命令行输入密码
yum install httpd- tools
htpasswd -b -C /etc/nginx/auth_conf test 123456
```
<br>


## 2.2 场景示例，基于用户名和密码认证实践

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


# 3. Nginx 连接限制


<br>

Nginx 默认包含了 `http_limit_conn_module` 模块，能够帮助我们对网站的用户在一定时间内能够产生的Http请求量，网速,IP等进行限制。防止不法分子而已对我们的网站进行攻击。<br>

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
 



## 3.1 场景实践-限制客户端同一时刻的并发连接数。


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

## 3.2 场景实践-限制下载速度。

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



# 4. Nginx 请求限制

连接限制主要用于处理用户的连接，只算是一方面的限制，而且有时候这样一刀切不是很友好，比如限制了总共允许多少个连接，如果别人属于攻击该网站，一下子建立一万个线程发起连接，可能你连接池两下就撑爆了，真正的用户进步不进来，此时就需要这样一个限制，限制来自同一个客户端的请求我们每秒只给它处理多少个请求，想要请求更多，那就等着，这样连接池不会被占满，别人也能正常使用。


## 4.1 请求频率限速实现的原理?

![nginx频率限速原理](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx频率限速原理.jpg)

<br>

如图：水(请求)从上方倒入水桶，从水桶下方流出(被处理) ;<br>
如果说水(请求) 流入的过快，水桶流出(被处理)的过慢，来不及流出的水存在水桶中(缓存)，然后以固定速率流出，水桶满后则水溢出(丢弃)<br>
<br>

**简单来说就是**:当处理速度,达不到请求的速度，则会将请求放置缓存， 然后持续处理。当缓存空间被沾满，如果还有大量的请求，则会被丢弃。<br>

<br>
<br>

**Nginx** 的 `http_limit_req_module` 模块就可以实现该需求，并且默认编译。 <br>

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

## 4.2 场景实践-限制单位时间内所产生的Http请求数。

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


# 5.总结


## 5.1 访问限制应用场景

- 下载限速:限制用户下载资源的速度，使用`Nginx ngx_http_core_module`。
- 请求限制:限制用户单位时间内所产生的Http请求数，使用`Nginx ngx_http_limit req_module`。
- 连接限制:限制同一时间的连接数,及并发数限制。使用`Nginx ngx_http_limit_conn_module`。



<br>



## 5.2 综合案例

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

