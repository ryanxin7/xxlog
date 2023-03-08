---
title: HAProxy简介
icon: fuzaijunheng
tag: HAproxy

#breadcrumb: false
---

<a name="rwDmz"></a>

## 一、负载均衡简介 <br /> 

负载均衡(Load Balance，简称LB)是一种服务或基于硬件设备等实现的高可用反向代理技术，负载均衡将特定的业务(web服务、网络流量等)分担给指定的一个或多个后端特定的服务器或设备，从而提高了公司业务的并发处理能力、保证了业务的高可用性、方便了业务后期的水平动态扩展 。


<a name="yfLnN"></a>

### 1.1 为什么使用负载均衡 <br /> 

- Web服务器的动态水平扩展-->对用户无感知
- 增加业务并发访问及处理能力-->解决单服务器瓶颈问题
- 节约公网IP地址-->降低IT支出成本
- 隐藏内部服务器IP-->提高内部服务器安全性
- 配置简单-->固定格式的配置文件
- 功能丰富-->支持四层和七层，支持动态下线主机
- 性能较强-->并发数万甚至数十万 <br /> <br /> 
  <a name="EO2f2"></a>

### 1.2 负载均衡类型 <br /><br />

四层： 

```yaml
LVS(Linux Virtual Server)
HAProxy(High Availability Proxy)
Nginx(1.9)
```

<br /> 七层：

```yaml
HAProxy
Nginx
```

硬件：

```yaml
F5          #https://f5.com/zh
Netscaler   #https://www.citrix.com.cn/products/citrix-adc/
Array       #https://www.arraynetworks.com.cn/
深信服      #http://www.sangfor.com.cn/
北京灵州    #http://www.lingzhou.com.cn/cpzx/llfzjh/
```


<a name="PazV4"></a>

### 1.3 应用场景

```yaml
四层：Redis、Mysql、RabbitMQ、Memcache等
七层：Nginx、Tomcat、Apache、PHP、图片、动静分离、API等
```

<a name="AfNXm"></a>

## 二、HAProxy介绍

HAProxy是法国开发者威利塔罗(Willy Tarreau)在2000年使用C语言开发的一个开源软件，是一款具备高并发(一万以上)、高性能的TCP和HTTP负载均衡器，支持基于cookie的持久性，自动故障切换，支持正则表达式及web状态统计，目前最新TLS版本为2.6.8


**官方网站：**[HAProxy - The Reliable, High Performance TCP/HTTP Load Balancer](http://www.haproxy.org/)


从2013年HAProxy分为社区版和企业版，企业版将提供更多的特性和功能以及全天24小时的技术支持等服务。


<a name="Xt2Eg"></a>

### 2.1 企业版：

企业版官网：[https://www.haproxy.com/](https://www.haproxy.com/#)<br />![](http://cdn1.ryanxin.live/1675995545498-77850ef5-6d73-4ffe-882f-691ef3713f9c.png)<br />![](http://cdn1.ryanxin.live/1675995574359-095aeba5-52d9-40e1-873f-64163e87433c.png)
<a name="MlhwI"></a>

### 2.2 社区版

社区版官网：[http://www.haproxy.org/](http://www.haproxy.org/#)

![](http://cdn1.ryanxin.live/1675995482362-7d86eefe-80f7-458d-af6a-061526093643.png)


<a name="aCQ46"></a>

### 2.3 版本对比

![](http://cdn1.ryanxin.live/1675996454936-d6a599c3-3a34-402a-9e0b-8923159e50b7.jpeg)

<a name="GssQV"></a>

### HAProxy功能

**具备功能**

```yaml
TCP和HTTP反向代理
SSL/TSL服务器
可以针对HTTP请求添加cookie，进行路由后端服务器可平衡负载至后端服务器，并支持持久连接
支持所有主服务器故障切换至备用服务器
支持专用端口实现监控服务
支持不影响现有连接情况下停止接受新连接请求
可以在双向添加，修改或删除HTTP报文首部
响应报文压缩
支持基于pattern实现连接请求的访问控制
通过特定的URI为授权用户提供详细的状态信息
```

**不具备的功能**

```yaml
正向代理--squid，nginx
缓存代理--varnish
web服务--nginx、tengine、apache、php、tomcat
单机性能--不如LVS
```

![](http://cdn1.ryanxin.live/1675996850629-020a7d3b-31ed-42f2-892e-1b6f742dad79.png)



<a name="KxAtH"></a>

