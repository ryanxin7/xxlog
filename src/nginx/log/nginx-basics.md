---
title: Nginx基础-Http协议
tags: 
    - 集群架构
    - Nginx

categories: 
   - Nginx
date: 2019-9-14 11:56:11
---



# Nginx基础-Http协议


## 1.Http协议介绍

### 1.1什么是URL?

通常我们在访问一个网站页面时，请求到的内容通称为"资源"。而”资源“这一概念非常宽泛，它可以是一份文档，一张图片，或所有其他你能够想到的格式。每个资源都由一个URI来进行标
识;比如:`http://fj.xuliangwei.com/public/tt.jpeg`这样的资源，我们会将该其称为URL地址;
<br>

**百度百科解释**: URL 简称统一资源定位符，用来唯-地标识万维网中的某一个资源。URL由协议、主机名称、端口以及文件名几部分构成。深入理解URL的组成部分。

<br>

### 1.2什么是HTML?
Html简称Web Page,一个完整的Html页面可能会包含很多个URL的资源。(反之:我们也可以理解一个HTML文件是由多个不同的URL资源拼接而成的。)

<br>
<br>


### 1.3什么是HTTP?
HTTP (Hyper Text Transfer Protocol) 中文名为超文本传输协议。<br>
是一种能够获取如HTML 这样网络资源的通讯协议。它是在Web.上进行数据交换的基础。
<br>


[HTTP的概述参考](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview) 
URL简单理解: HTTP 协议就是将用户请求的HTML页面从一台Web服务器传输到客户端浏览器的一种协议。

![web-get](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/web-get.jpg)


<br>


### 1.4 URL、HTML、HTTP之间关系
一个完整的HTML 页面是由多个不同的Url资源组成的;而HTTP 协议主要是用来传输这种HTML 页面的;

<br>
<br>

## 2.Http工作原理

### 2.1 图解HTTP工作原理
我们详细的了解下HTTP的工作原理，我们到底是如何获取到服务器上的页面。

![http原理](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/http原理.jpg)

<br>
整个用户访问网站过程就是DNS-TCP-HTTP 

<br>
![http工作原理](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/http工作原理.jpg)


## 3. Http请求Request

HTTP请求的一个例子: 

![http请求](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/http请求.jpg)


### 3.1 Method方法

客户端向服务端发送请求时，会根据不同的资源发送不同的请求方法Method : <br>

- GET :用于获取URI对应的资源; (比如看朋友圈)
- POST :用于提交请求，可以更新或者创建资源，是非幂等的; (发布朋友圈)
- PUT :用于向指定的URI传送更新资源，是幂等的; (更新朋友圈)
- DELETE :用于向指定的URI删除资源; (比如删朋友圈)
- HEAD :用于检查

<br>

般创建对象时用POST，更新对象时用PUT ;<br>

- PUT是幂等的，POST是非幂等的;
- 幂等:对于相同的输入，每次得到的结果都是相等的;
<br>


### 3.2 请求Header

```sh
:authority: Www . oldxu. com
:method: GET
:path: /
: scheme: https
Accept: text/html ，  #请求的类型
Accept- Encoding: gzip, deflate  #是否进行压缩
Accept- Language: zh-CN, zh;q=0.9  #请求的语言
Cache-Control: max-age=0  #缓存
Connection:
keep-alive # TCP长连接
Host: www.oldxu.com  #请求的域名
If -Modified-Since: Fri, 04 May 2018 08:13:44 GMT #修改的时间
User-Agent: Mozilla/5.0 #请求浏览器的工具
"===请求一个空行==="
"===请求内容主体==="
```
<br>
<br>


### 3.3请求Connection

Http请求中的长连接与短连接是什么:
- http1.0
协议使用的是短连接:建立-次tcp的连接，发起一次http的请求，结束，tcp 断开。
- http1.1协议使用的是长连接:建立- -次tcp的连接，发起多次http的请求，结束，tcp 断开。
- [HTTP协议版本参考URL、HTTP1.1与HTTP2.0速度对比](https://http2.akamai.com/demo/http2-lab.html)
<br>

![http-connection类型](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/http-connection类型.jpg)
<br>
<br>



## 4.Http响应Response

- HTTP响应的一个例子: 

![http-response](https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/http-response.jpg)

<br>

<br>



### 4.1 相应头部header


```s
#服务端响应的头部信息
HTTP/1.1 200 OK #返回服务器的http协议，状态码
Date: Fri， 14 Sep 2018 09:14:28 GMT #返回服务器的时间
Server: Apache/2.4. 6  #返回服务器使用的软件Apache
Connection: Keep-Alive  # TCP长连接
Keep-Alive: timeout=5， max=100  #长连接的超时时间
"===返回一个空行==="
"=== 返回内容主体==="
```


<br>

<br>


### 4.2 响应Status

http响应状态码Status -Code以3位数字组成，用来标识该请求是否成功，比如是正常还是错误等，HTTP/1.1 中状
态码可以分为五大类。

<div class="center">


| 状态码 |                      说明                      |
| :----: | -------------------------------------------- |
|  1xx   |  信息，服务器收到请求，需要请求者继续执行操作  |
|  2xx   |           成功，操作被成功接收并处理           |
|  3xx   |       重定向，需要进一步的操作以完成请求       |
|  4xx   |   客户端错误，请求包含语法错误或无法完成请求   |
|  5xx   | 服务器错误，服务器在处理请求的过程中发生了错误 |

</div>







<br>

<br>



### 4.4 响应Code

**以下是常见状态码**




| 状态码 |                                                            说明                                                            |
| :----: | ------------------------------------------------------------------------------------------------------------------------ |
|  200   |                               表示成功客户端成功接收到了服务端返回的数据，这是最常见的状态码                               |
|  206   | 客户端发完请求后，服务端只是返回了部分数据，就会出现该状态码，例如当下载一个很大的文件时，在没有下载完成前就会出现该状态码 |
|  301   |                                                    永久重定向(redirect)                                                    |
|  302   |                                                    临时重定向(redirect)                                                    |
|  400   |                                            客户端请求语法错误，服务端无法理解;                                             |
|  401   |                                    服务端开启了用户认证，而客户端没有提供正确的验证信息                                    |
|  403   |                                      服务端不允许客户端访问，或者没有找到默认返回页面                                      |
|  404   |                                                   客户端请求的资源不存在                                                   |
|  413   |                             客户端向服务端上传一个比较大的文件, 并且文件大小超过了服务端的限制                             |
|  500   |                                         服务端出现了内部错误，需要进行人为排查故障                                         |
|  502   |                               服务器充当代理角色时，后端被代理的服务器不可用或者没有正常回应                               |
|  503   |                             服务当前不可用，由于超载或系统维护，服务器暂时的无法处理客户端请求                             |
|  504   |                                 服务器充当代理角色时，后端的服务端没有按时返回数据，超时了                                 |

