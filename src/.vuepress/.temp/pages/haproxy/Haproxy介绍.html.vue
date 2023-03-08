<template><div><p><a name="rwDmz"></a></p>
<h2 id="一、负载均衡简介" tabindex="-1"><a class="header-anchor" href="#一、负载均衡简介" aria-hidden="true">#</a> 一、负载均衡简介 <br /></h2>
<p>负载均衡(Load Balance，简称LB)是一种服务或基于硬件设备等实现的高可用反向代理技术，负载均衡将特定的业务(web服务、网络流量等)分担给指定的一个或多个后端特定的服务器或设备，从而提高了公司业务的并发处理能力、保证了业务的高可用性、方便了业务后期的水平动态扩展 。</p>
<p><a name="yfLnN"></a></p>
<h3 id="_1-1-为什么使用负载均衡" tabindex="-1"><a class="header-anchor" href="#_1-1-为什么使用负载均衡" aria-hidden="true">#</a> 1.1 为什么使用负载均衡 <br /></h3>
<ul>
<li>Web服务器的动态水平扩展--&gt;对用户无感知</li>
<li>增加业务并发访问及处理能力--&gt;解决单服务器瓶颈问题</li>
<li>节约公网IP地址--&gt;降低IT支出成本</li>
<li>隐藏内部服务器IP--&gt;提高内部服务器安全性</li>
<li>配置简单--&gt;固定格式的配置文件</li>
<li>功能丰富--&gt;支持四层和七层，支持动态下线主机</li>
<li>性能较强--&gt;并发数万甚至数十万 <br /> <br />
<a name="EO2f2"></a></li>
</ul>
<h3 id="_1-2-负载均衡类型" tabindex="-1"><a class="header-anchor" href="#_1-2-负载均衡类型" aria-hidden="true">#</a> 1.2 负载均衡类型 <br /><br /></h3>
<p>四层：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>LVS(Linux Virtual Server)
HAProxy(High Availability Proxy)
Nginx(1.9)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><br /> 七层：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>HAProxy
Nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>硬件：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>F5          <span class="token comment">#https://f5.com/zh</span>
Netscaler   <span class="token comment">#https://www.citrix.com.cn/products/citrix-adc/</span>
Array       <span class="token comment">#https://www.arraynetworks.com.cn/</span>
深信服      <span class="token comment">#http://www.sangfor.com.cn/</span>
北京灵州    <span class="token comment">#http://www.lingzhou.com.cn/cpzx/llfzjh/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="PazV4"></a></p>
<h3 id="_1-3-应用场景" tabindex="-1"><a class="header-anchor" href="#_1-3-应用场景" aria-hidden="true">#</a> 1.3 应用场景</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>四层：Redis、Mysql、RabbitMQ、Memcache等
七层：Nginx、Tomcat、Apache、PHP、图片、动静分离、API等
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="AfNXm"></a></p>
<h2 id="二、haproxy介绍" tabindex="-1"><a class="header-anchor" href="#二、haproxy介绍" aria-hidden="true">#</a> 二、HAProxy介绍</h2>
<p>HAProxy是法国开发者威利塔罗(Willy Tarreau)在2000年使用C语言开发的一个开源软件，是一款具备高并发(一万以上)、高性能的TCP和HTTP负载均衡器，支持基于cookie的持久性，自动故障切换，支持正则表达式及web状态统计，目前最新TLS版本为2.6.8</p>
<p><strong>官方网站：</strong><a href="http://www.haproxy.org/" target="_blank" rel="noopener noreferrer">HAProxy - The Reliable, High Performance TCP/HTTP Load Balancer<ExternalLinkIcon/></a></p>
<p>从2013年HAProxy分为社区版和企业版，企业版将提供更多的特性和功能以及全天24小时的技术支持等服务。</p>
<p><a name="Xt2Eg"></a></p>
<h3 id="_2-1-企业版" tabindex="-1"><a class="header-anchor" href="#_2-1-企业版" aria-hidden="true">#</a> 2.1 企业版：</h3>
<p>企业版官网：<a href="https://www.haproxy.com/#" target="_blank" rel="noopener noreferrer">https://www.haproxy.com/<ExternalLinkIcon/></a><br /><img src="http://cdn1.ryanxin.live/1675995545498-77850ef5-6d73-4ffe-882f-691ef3713f9c.png" alt="" loading="lazy"><br /><img src="http://cdn1.ryanxin.live/1675995574359-095aeba5-52d9-40e1-873f-64163e87433c.png" alt="" loading="lazy">
<a name="MlhwI"></a></p>
<h3 id="_2-2-社区版" tabindex="-1"><a class="header-anchor" href="#_2-2-社区版" aria-hidden="true">#</a> 2.2 社区版</h3>
<p>社区版官网：<a href="http://www.haproxy.org/#" target="_blank" rel="noopener noreferrer">http://www.haproxy.org/<ExternalLinkIcon/></a></p>
<figure><img src="http://cdn1.ryanxin.live/1675995482362-7d86eefe-80f7-458d-af6a-061526093643.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><a name="aCQ46"></a></p>
<h3 id="_2-3-版本对比" tabindex="-1"><a class="header-anchor" href="#_2-3-版本对比" aria-hidden="true">#</a> 2.3 版本对比</h3>
<figure><img src="http://cdn1.ryanxin.live/1675996454936-d6a599c3-3a34-402a-9e0b-8923159e50b7.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><a name="GssQV"></a></p>
<h3 id="haproxy功能" tabindex="-1"><a class="header-anchor" href="#haproxy功能" aria-hidden="true">#</a> HAProxy功能</h3>
<p><strong>具备功能</strong></p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>TCP和HTTP反向代理
SSL/TSL服务器
可以针对HTTP请求添加cookie，进行路由后端服务器可平衡负载至后端服务器，并支持持久连接
支持所有主服务器故障切换至备用服务器
支持专用端口实现监控服务
支持不影响现有连接情况下停止接受新连接请求
可以在双向添加，修改或删除HTTP报文首部
响应报文压缩
支持基于pattern实现连接请求的访问控制
通过特定的URI为授权用户提供详细的状态信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>不具备的功能</strong></p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>正向代理<span class="token punctuation">-</span><span class="token punctuation">-</span>squid，nginx
缓存代理<span class="token punctuation">-</span><span class="token punctuation">-</span>varnish
web服务<span class="token punctuation">-</span><span class="token punctuation">-</span>nginx、tengine、apache、php、tomcat
单机性能<span class="token punctuation">-</span><span class="token punctuation">-</span>不如LVS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/1675996850629-020a7d3b-31ed-42f2-892e-1b6f742dad79.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><a name="KxAtH"></a></p>
<h2 id="三、haproxy安装及基础配置" tabindex="-1"><a class="header-anchor" href="#三、haproxy安装及基础配置" aria-hidden="true">#</a> 三、HAProxy安装及基础配置</h2>
<p>介绍HAProxy的基础安装及基础配置</p>
<p><a name="lz77Z"></a></p>
<h3 id="_3-1-源码包安装" tabindex="-1"><a class="header-anchor" href="#_3-1-源码包安装" aria-hidden="true">#</a> 3.1 源码包安装</h3>
<p>官方提供了Ubuntu和Debian的包，没有Centos的包<br /><img src="http://cdn1.ryanxin.live/1675997727329-efbe55ed-cb1e-4446-b7d2-40fd13d1031b.png" alt="" loading="lazy"></p>
<hr>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1675997822880-a7a98a7a-9d66-4040-902e-4575f17bcaf5.png#averageHue=%23dedddc&amp;clientId=u5305db92-c2f2-4&amp;from=paste&amp;height=717&amp;id=u17b5b1fb&amp;name=image.png&amp;originHeight=717&amp;originWidth=1001&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=94764&amp;status=done&amp;style=none&amp;taskId=u6a352590-2238-493b-a951-644948b1a6e&amp;title=&amp;width=1001" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p><a name="lXWmr"></a></p>
<h4 id="ubuntu-安装" tabindex="-1"><a class="header-anchor" href="#ubuntu-安装" aria-hidden="true">#</a> ubuntu 安装</h4>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>apt<span class="token punctuation">-</span>get install <span class="token punctuation">-</span><span class="token punctuation">-</span>no<span class="token punctuation">-</span>install<span class="token punctuation">-</span>recommends software<span class="token punctuation">-</span>properties<span class="token punctuation">-</span>common 
<span class="token comment">#--no-install-recommends 参数来避免安装非必须的文件，从而减小镜像的体积</span>
add<span class="token punctuation">-</span>apt<span class="token punctuation">-</span>repository ppa<span class="token punctuation">:</span>vbernat/haproxy<span class="token punctuation">-</span><span class="token number">2.6</span>
apt<span class="token punctuation">-</span>get install haproxy=2.6.\*

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#安装常用软件包</span>
<span class="token function">apt-get</span> <span class="token function">install</span> --no-install-recommends software-properties-common <span class="token parameter variable">-y</span>
<span class="token comment">#--no-install-recommends 参数来避免安装非必须的文件，从而减小镜像的体积</span>


<span class="token comment">#安装源</span>
root@etcd01<span class="token punctuation">[</span><span class="token number">11</span>:10:22<span class="token punctuation">]</span>~ <span class="token comment">#:add-apt-repository ppa:vbernat/haproxy-2.6</span>
 HAProxy is a free, very fast and reliable solution offering high availability, load balancing, and proxying <span class="token keyword">for</span> TCP and HTTP-based applications. It is particularly suited <span class="token keyword">for</span> web sites crawling under very high loads <span class="token keyword">while</span> needing persistence or Layer7 processing. Supporting tens of thousands of connections is clearly realistic with todays hardware. Its mode of operation makes its integration into existing architectures very easy and riskless, <span class="token keyword">while</span> still offering the possibility not to expose fragile web servers to the Net.

This PPA contains packages <span class="token keyword">for</span> HAProxy <span class="token number">2.6</span>.
 More info: https://launchpad.net/~vbernat/+archive/ubuntu/haproxy-2.6
Press <span class="token punctuation">[</span>ENTER<span class="token punctuation">]</span> to <span class="token builtin class-name">continue</span> or Ctrl-c to cancel adding it.

Get:1 http://ppa.launchpad.net/vbernat/haproxy-2.6/ubuntu focal InRelease <span class="token punctuation">[</span><span class="token number">23.8</span> kB<span class="token punctuation">]</span>
Hit:2 http://cn.archive.ubuntu.com/ubuntu focal InRelease 
Hit:3 http://cn.archive.ubuntu.com/ubuntu focal-updates InRelease
Hit:4 http://cn.archive.ubuntu.com/ubuntu focal-backports InRelease
Hit:5 http://cn.archive.ubuntu.com/ubuntu focal-security InRelease         
Get:6 http://ppa.launchpad.net/vbernat/haproxy-2.6/ubuntu focal/main amd64 Packages <span class="token punctuation">[</span><span class="token number">1,000</span> B<span class="token punctuation">]</span>
Get:7 http://ppa.launchpad.net/vbernat/haproxy-2.6/ubuntu focal/main Translation-en <span class="token punctuation">[</span><span class="token number">704</span> B<span class="token punctuation">]</span>
Fetched <span class="token number">25.5</span> kB <span class="token keyword">in</span> 2s <span class="token punctuation">(</span><span class="token number">14.0</span> kB/s<span class="token punctuation">)</span>                     
Reading package lists<span class="token punctuation">..</span>. Done


<span class="token comment">#查看可用版本</span>
root@etcd01<span class="token punctuation">[</span><span class="token number">11</span>:11:01<span class="token punctuation">]</span>~ <span class="token comment">#:apt-cache madison haproxy</span>
   haproxy <span class="token operator">|</span> <span class="token number">2.6</span>.8-1ppa1~focal <span class="token operator">|</span> http://ppa.launchpad.net/vbernat/haproxy-2.6/ubuntu focal/main amd64 Packages
   haproxy <span class="token operator">|</span> <span class="token number">2.0</span>.29-0ubuntu1.1 <span class="token operator">|</span> http://cn.archive.ubuntu.com/ubuntu focal-updates/main amd64 Packages
   haproxy <span class="token operator">|</span> <span class="token number">2.0</span>.29-0ubuntu1.1 <span class="token operator">|</span> http://cn.archive.ubuntu.com/ubuntu focal-security/main amd64 Packages
   haproxy <span class="token operator">|</span>   <span class="token number">2.0</span>.13-2 <span class="token operator">|</span> http://cn.archive.ubuntu.com/ubuntu focal/main amd64 Packages

<span class="token comment">#安装2.6</span>
<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token assign-left variable">haproxy</span><span class="token operator">=</span><span class="token number">2.6</span>.<span class="token punctuation">\</span>* <span class="token parameter variable">-y</span>


<span class="token comment">#验证haproxy版本</span>
root@etcd01<span class="token punctuation">[</span><span class="token number">13</span>:50:48<span class="token punctuation">]</span>~ <span class="token comment">#:haproxy -v</span>
HAProxy version <span class="token number">2.6</span>.8-1ppa1~focal <span class="token number">2023</span>/01/24 - https://haproxy.org/
Status: long-term supported branch - will stop receiving fixes around Q2 <span class="token number">2027</span>.
Known bugs: http://www.haproxy.org/bugs/bugs-2.6.8.html
Running on: Linux <span class="token number">5.4</span>.0-135-generic <span class="token comment">#152-Ubuntu SMP Wed Nov 23 20:19:22 UTC 2022 x86_64</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="O6GRy"></a></p>
<h4 id="centos安装" tabindex="-1"><a class="header-anchor" href="#centos安装" aria-hidden="true">#</a> Centos安装</h4>
<p>在centos系统上通过yum、编译等多种安装方式。<br /><strong>默认yum源</strong><br />默认的base仓库中包含haproxy的安装包文件，但是版本比较旧，是1.5.18的版本，距离当前版本已经有较长时间没有更新，由于版本比较旧所以有很多功能不支持，如果对功能和性能没有要求可以使用此版本，否则推荐使用新版本。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># yum install haproxy -y</span>
<span class="token comment">#验证haproxy版本</span>
<span class="token comment"># haproxy -v</span>
HA-Proxy version <span class="token number">1.5</span>.18 <span class="token number">2016</span>/05/10
Copyright <span class="token number">2000</span>-2016 Willy Tarreau <span class="token operator">&lt;</span>willy@haproxy.org<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="tp9NK"></a></p>
<h3 id="_3-2-编译安装haproxy" tabindex="-1"><a class="header-anchor" href="#_3-2-编译安装haproxy" aria-hidden="true">#</a> 3.2 编译安装HAProxy</h3>
<p>编译安装HAProxy 2.0 LTS版本，源码包下载地址：<a href="http://www.haproxy.org/download/" target="_blank" rel="noopener noreferrer">http://www.haproxy.org/download/<ExternalLinkIcon/></a></p>
<p><a name="lz3vV"></a></p>
<h4 id="_3-2-1-解决lua环境" tabindex="-1"><a class="header-anchor" href="#_3-2-1-解决lua环境" aria-hidden="true">#</a> 3.2.1 解决lua环境</h4>
<p>HAProxy支持基于lua实现功能扩展，lua是一种小巧的脚本语言，于1993年由巴西里约热内卢天主教大学（Pontiﬁcal Catholic University of Rio de Janeiro）里的一个研究小组开发，其设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。</p>
<p>Lua 官网：<a href="http://www.lua.org" target="_blank" rel="noopener noreferrer">www.lua.org<ExternalLinkIcon/></a></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Lua应用场景
游戏开发
独立应用脚本
Web应用脚本
扩展和数据库插件，如MySQL Proxy
安全系统，如入侵检测系统
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p><strong>Centos 环境</strong>：<br />由于centos自带的lua版本比较低并不符合HAProxy要求的lua最低版本(5.3)的要求，因此需要编译安装较新版本的lua环境，然后才能编译安装HAProxy，过程如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#当前系统版本</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#lua -v </span>
Lua <span class="token number">5.1</span>.4  Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">1994</span>-2008 Lua.org, PUC-Rio

<span class="token comment">#安装基础命令及编译依赖环境</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment"># yum install gcc readline-devel</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment"># wget http://www.lua.org/ftp/lua-5.3.5.tar.gz</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment"># tar xvf  lua-5.3.5.tar.gz -C /usr/local/src</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment"># cd /usr/local/src/lua-5.3.5</span>
<span class="token punctuation">[</span>root@centos7 lua-5.3.5<span class="token punctuation">]</span><span class="token comment"># make linux test</span>


<span class="token punctuation">[</span>root@localhost lua-5.3.5<span class="token punctuation">]</span><span class="token comment"># make linux test</span>
<span class="token builtin class-name">cd</span> src <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> linux
make<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: 进入目录“/usr/local/src/lua-5.3.5/src”
<span class="token function">make</span> all <span class="token assign-left variable">SYSCFLAGS</span><span class="token operator">=</span><span class="token string">"-DLUA_USE_LINUX"</span> <span class="token assign-left variable">SYSLIBS</span><span class="token operator">=</span><span class="token string">"-Wl,-E -ldl -lreadline"</span>
make<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>: 进入目录“/usr/local/src/lua-5.3.5/src”
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lapi.o lapi.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lcode.o lcode.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lctype.o lctype.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> ldebug.o ldebug.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> ldo.o ldo.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> ldump.o ldump.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lfunc.o lfunc.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lgc.o lgc.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> llex.o llex.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lmem.o lmem.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lobject.o lobject.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lopcodes.o lopcodes.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lparser.o lparser.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lstate.o lstate.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lstring.o lstring.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> ltable.o ltable.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> ltm.o ltm.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lundump.o lundump.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lvm.o lvm.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lzio.o lzio.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lauxlib.o lauxlib.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lbaselib.o lbaselib.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lbitlib.o lbitlib.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lcorolib.o lcorolib.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> ldblib.o ldblib.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> liolib.o liolib.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lmathlib.o lmathlib.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> loslib.o loslib.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lstrlib.o lstrlib.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> ltablib.o ltablib.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lutf8lib.o lutf8lib.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> loadlib.o loadlib.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> linit.o linit.c
ar rcu liblua.a lapi.o lcode.o lctype.o ldebug.o ldo.o ldump.o lfunc.o lgc.o llex.o lmem.o lobject.o lopcodes.o lparser.o lstate.o lstring.o ltable.o ltm.o lundump.o lvm.o lzio.o lauxlib.o lbaselib.o lbitlib.o lcorolib.o ldblib.o liolib.o lmathlib.o loslib.o lstrlib.o ltablib.o lutf8lib.o loadlib.o linit.o 
ranlib liblua.a
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> lua.o lua.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-o</span> lua   lua.o liblua.a <span class="token parameter variable">-lm</span> -Wl,-E <span class="token parameter variable">-ldl</span> <span class="token parameter variable">-lreadline</span> 
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-O2</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Wextra</span> <span class="token parameter variable">-DLUA_COMPAT_5_2</span> <span class="token parameter variable">-DLUA_USE_LINUX</span>    <span class="token parameter variable">-c</span> <span class="token parameter variable">-o</span> luac.o luac.c
gcc <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu99 <span class="token parameter variable">-o</span> luac   luac.o liblua.a <span class="token parameter variable">-lm</span> -Wl,-E <span class="token parameter variable">-ldl</span> <span class="token parameter variable">-lreadline</span> 
make<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>: 离开目录“/usr/local/src/lua-5.3.5/src”
make<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: 离开目录“/usr/local/src/lua-5.3.5/src”
src/lua <span class="token parameter variable">-v</span>
Lua <span class="token number">5.3</span>.5  Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">1994</span>-2018 Lua.org, PUC-Rio


<span class="token comment">#查看编译安装的版本</span>
<span class="token punctuation">[</span>root@localhost lua-5.3.5<span class="token punctuation">]</span><span class="token comment"># ./src/lua -v </span>
Lua <span class="token number">5.3</span>.5  Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">1994</span>-2018 Lua.org, PUC-Rio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p><strong>Ubuntu 基础环境</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#安装基础命令及编译依赖环境</span>
$ <span class="token function">apt</span>  <span class="token function">install</span> gcc iproute2  ntpdate  tcpdump telnet <span class="token function">traceroute</span> nfs-kernel-server nfs-common  lrzsz tree  openssl libssl-dev libpcre3 libpcre3-dev zlib1g-dev  openssh-server  libreadline-dev libsystemd-dev

$ <span class="token builtin class-name">cd</span> /usr/local/src
$ <span class="token function">wget</span> http://www.lua.org/ftp/lua-5.3.5.tar.gz
$ <span class="token function">tar</span> xvf  lua-5.3.5.tar.gz
$ <span class="token builtin class-name">cd</span> lua-5.3.5
$ <span class="token function">make</span> linux <span class="token builtin class-name">test</span>

$ <span class="token builtin class-name">pwd</span>
/usr/local/src/lua-5.3.5
$ ./src/lua <span class="token parameter variable">-v</span>
Lua <span class="token number">5.3</span>.5  Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">1994</span>-2018 Lua.org, PUC-Rio

<span class="token comment">#或安装系统自带的lua</span>
$ <span class="token function">apt</span> <span class="token function">install</span>  <span class="token assign-left variable">lua5.3</span><span class="token operator">=</span><span class="token number">5.3</span>.3-1ubuntu0.18.04.1
$ lua5.3  <span class="token parameter variable">-v</span>
Lua <span class="token number">5.3</span>.3  Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">1994</span>-2016 Lua.org, PUC-Rio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="suUyR"></a></p>
<h4 id="_3-2-2-开始编译安装" tabindex="-1"><a class="header-anchor" href="#_3-2-2-开始编译安装" aria-hidden="true">#</a> 3.2.2 开始编译安装</h4>
<p><strong>Centos 环境</strong><br /><strong>ubuntu 系统推荐使用包管理器安装</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#HAProxy  1.8及1.9版本编译参数：</span>
<span class="token function">make</span>  <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>x86_64 <span class="token assign-left variable">TARGET</span><span class="token operator">=</span>linux2628 <span class="token assign-left variable">USE_PCRE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">USE_OPENSSL</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">USE_ZLIB</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">USE_SYSTEMD</span><span class="token operator">=</span><span class="token number">1</span>  <span class="token assign-left variable">USE_CPU_AFFINITY</span><span class="token operator">=</span><span class="token number">1</span>  <span class="token assign-left variable">PREFIX</span><span class="token operator">=</span>/usr/local/haproxy 

<span class="token comment">#HAProxy 2.0以上版本编译参数：</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span>$ yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc openssl-devel pcre-devel systemd-devel
已安装:
  openssl-devel.x86_64 <span class="token number">1</span>:1.0.2k-25.el7_9                              systemd-devel.x86_64 <span class="token number">0</span>:219-78.el7_9.7                             

作为依赖被安装:
  keyutils-libs-devel.x86_64 <span class="token number">0</span>:1.5.8-3.el7       krb5-devel.x86_64 <span class="token number">0</span>:1.15.1-55.el7_9        libcom_err-devel.x86_64 <span class="token number">0</span>:1.42.9-19.el7      
  libkadm5.x86_64 <span class="token number">0</span>:1.15.1-55.el7_9              libselinux-devel.x86_64 <span class="token number">0</span>:2.5-15.el7       libsepol-devel.x86_64 <span class="token number">0</span>:2.5-10.el7           
  libverto-devel.x86_64 <span class="token number">0</span>:0.2.5-4.el7           

作为依赖被升级:
  e2fsprogs.x86_64 <span class="token number">0</span>:1.42.9-19.el7            e2fsprogs-libs.x86_64 <span class="token number">0</span>:1.42.9-19.el7         krb5-libs.x86_64 <span class="token number">0</span>:1.15.1-55.el7_9         
  libcom_err.x86_64 <span class="token number">0</span>:1.42.9-19.el7           libgudev1.x86_64 <span class="token number">0</span>:219-78.el7_9.7             libss.x86_64 <span class="token number">0</span>:1.42.9-19.el7               
  openssl.x86_64 <span class="token number">1</span>:1.0.2k-25.el7_9            openssl-libs.x86_64 <span class="token number">1</span>:1.0.2k-25.el7_9         systemd.x86_64 <span class="token number">0</span>:219-78.el7_9.7            
  systemd-libs.x86_64 <span class="token number">0</span>:219-78.el7_9.7        systemd-python.x86_64 <span class="token number">0</span>:219-78.el7_9.7        systemd-sysv.x86_64 <span class="token number">0</span>:219-78.el7_9.7 


------------------------------------------------------------------

<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span>$ <span class="token function">tar</span> xvf haproxy-2.6.8.tar.gz <span class="token parameter variable">-C</span> /usr/local/src/
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span>$ <span class="token builtin class-name">cd</span> /usr/local/src/haproxy-2.6.8/
<span class="token punctuation">[</span>root@centos7 haproxy-2.6.8<span class="token punctuation">]</span>$ <span class="token function">cat</span> README 

The HAProxy documentation has been <span class="token function">split</span> into a number of different files <span class="token keyword">for</span>
ease of use.

Please refer to the following files depending on what you<span class="token string">'re looking for :

  - INSTALL for instructions on how to build and install HAProxy
  - BRANCHES to understand the project'</span>s life cycle and what version to use
  - LICENSE <span class="token keyword">for</span> the project<span class="token string">'s license
  - CONTRIBUTING for the process to follow to submit contributions

The more detailed documentation is located into the doc/ directory :

  - doc/intro.txt for a quick introduction on HAProxy
  - doc/configuration.txt for the configuration'</span>s reference manual
  - doc/lua.txt <span class="token keyword">for</span> the Lua<span class="token string">'s reference manual
  - doc/SPOE.txt for how to use the SPOE engine
  - doc/network-namespaces.txt for how to use network namespaces under Linux
  - doc/management.txt for the management guide
  - doc/regression-testing.txt for how to use the regression testing suite
  - doc/peers.txt for the peers protocol reference
  - doc/coding-style.txt for how to adopt HAProxy'</span>s coding style
  - doc/internals <span class="token keyword">for</span> developer-specific documentation <span class="token punctuation">(</span>not all up to <span class="token function">date</span><span class="token punctuation">)</span>

----------------------------------------------------------------------------

<span class="token punctuation">[</span>root@centos7 haproxy-2.6.8<span class="token punctuation">]</span>$ <span class="token function">cat</span> INSTALL




<span class="token comment">#参考INSTALL文件进行编译安装</span>
$ <span class="token function">make</span>  <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>x86_64 <span class="token assign-left variable">TARGET</span><span class="token operator">=</span>linux-glibc  <span class="token assign-left variable">USE_PCRE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">USE_OPENSSL</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">USE_ZLIB</span><span class="token operator">=</span><span class="token number">1</span>  <span class="token assign-left variable">USE_SYSTEMD</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">USE_CPU_AFFINITY</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">USE_LUA</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">LUA_INC</span><span class="token operator">=</span>/usr/local/src/lua-5.3.5/src/  <span class="token assign-left variable">LUA_LIB</span><span class="token operator">=</span>/usr/local/src/lua-5.3.5/src/ <span class="token assign-left variable">PREFIX</span><span class="token operator">=</span>/usr/local/haproxy
  CC      src/ev_poll.o
  CC      src/ev_epoll.o
  CC      src/cpuset.o
  CC      src/ssl_sample.o
  CC      src/ssl_sock.o
  CC      src/ssl_crtlist.o
  CC      src/ssl_ckch.o
  CC      src/ssl_utils.o
  CC      src/cfgparse-ssl.o
  CC      src/jwt.o
  CC      src/hlua.o
  CC      src/hlua_fcn.o
  CC      src/namespace.o
  CC      src/mux_h2.o
  CC      src/mux_fcgi.o
  CC      src/mux_h1.o
  CC      src/tcpcheck.o
  CC      src/stream.o
  CC      src/stats.o
  CC      src/http_ana.o
  CC      src/server.o
  CC      src/stick_table.o
  CC      src/sample.o
  CC      src/flt_spoe.o
  CC      src/tools.o
  CC      src/log.o
  CC      src/cfgparse.o
  CC      src/peers.o
  CC      src/backend.o
  CC      src/resolvers.o
  CC      src/cli.o
  CC      src/connection.o
  CC      src/proxy.o
  CC      src/http_htx.o
  CC      src/cfgparse-listen.o
  CC      src/pattern.o
  CC      src/check.o
  CC      src/haproxy.o
  CC      src/cache.o
  CC      src/stconn.o
  CC      src/http_act.o
  CC      src/http_fetch.o
  CC      src/http_client.o
  CC      src/listener.o
  CC      src/dns.o
  CC      src/vars.o
  CC      src/debug.o
  CC      src/tcp_rules.o
  CC      src/sink.o
  CC      src/h1_htx.o
  CC      src/task.o
  CC      src/mjson.o
  CC      src/h2.o
  CC      src/filters.o
  CC      src/server_state.o
  CC      src/payload.o
  CC      src/fcgi-app.o
  CC      src/map.o
  CC      src/htx.o
  CC      src/h1.o
  CC      src/pool.o
  CC      src/cfgparse-global.o
  CC      src/trace.o
  CC      src/tcp_sample.o
  CC      src/flt_http_comp.o
  CC      src/mux_pt.o
  CC      src/flt_trace.o
  CC      src/mqtt.o
  CC      src/acl.o
  CC      src/sock.o
  CC      src/mworker.o
  CC      src/tcp_act.o
  CC      src/ring.o
  CC      src/session.o
  CC      src/proto_tcp.o
  CC      src/fd.o
  CC      src/channel.o
  CC      src/activity.o
  CC      src/queue.o
  CC      src/lb_fas.o
  CC      src/http_rules.o
  CC      src/extcheck.o
  CC      src/thread.o
  CC      src/http.o
  CC      src/lb_chash.o
  CC      src/applet.o
  CC      src/compression.o
  CC      src/raw_sock.o
  CC      src/ncbuf.o
  CC      src/frontend.o
  CC      src/errors.o
  CC      src/uri_normalizer.o
  CC      src/http_conv.o
  CC      src/lb_fwrr.o
  CC      src/sha1.o
  CC      src/proto_sockpair.o
  CC      src/mailers.o
  CC      src/lb_fwlc.o
  CC      src/ebmbtree.o
  CC      src/cfgcond.o
  CC      src/action.o
  CC      src/xprt_handshake.o
  CC      src/protocol.o
  CC      src/proto_uxst.o
  CC      src/proto_udp.o
  CC      src/lb_map.o
  CC      src/fix.o
  CC      src/ev_select.o
  CC      src/arg.o
  CC      src/sock_inet.o
  CC      src/mworker-prog.o
  CC      src/hpack-dec.o
  CC      src/cfgparse-tcp.o
  CC      src/sock_unix.o
  CC      src/shctx.o
  CC      src/proto_uxdg.o
  CC      src/fcgi.o
  CC      src/eb64tree.o
  CC      src/clock.o
  CC      src/chunk.o
  CC      src/cfgdiag.o
  CC      src/signal.o
  CC      src/regex.o
  CC      src/lru.o
  CC      src/eb32tree.o
  CC      src/eb32sctree.o
  CC      src/cfgparse-unix.o
  CC      src/hpack-tbl.o
  CC      src/ebsttree.o
  CC      src/ebimtree.o
  CC      src/base64.o
  CC      src/auth.o
  CC      src/uri_auth.o
  CC      src/time.o
  CC      src/ebistree.o
  CC      src/dynbuf.o
  CC      src/wdt.o
  CC      src/pipe.o
  CC      src/init.o
  CC      src/http_acl.o
  CC      src/hpack-huff.o
  CC      src/hpack-enc.o
  CC      src/dict.o
  CC      src/freq_ctr.o
  CC      src/ebtree.o
  CC      src/hash.o
  CC      src/dgram.o
  CC      src/version.o
  LD      haproxy
  CC      dev/flags/flags.o
  LD      dev/flags/flags

$ <span class="token function">make</span> <span class="token function">install</span> <span class="token assign-left variable">PREFIX</span><span class="token operator">=</span>/usr/local/haproxy
$ <span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/haproxy/sbin/haproxy /usr/sbin/


<span class="token comment">#验证版本</span>

<span class="token punctuation">[</span>root@localhost haproxy<span class="token punctuation">]</span><span class="token comment"># haproxy -v</span>
HAProxy version <span class="token number">2.6</span>.8-ab6ee7f <span class="token number">2023</span>/01/24 - https://haproxy.org/
Status: long-term supported branch - will stop receiving fixes around Q2 <span class="token number">2027</span>.
Known bugs: http://www.haproxy.org/bugs/bugs-2.6.8.html
Running on: Linux <span class="token number">3.10</span>.0-1127.8.2.el7.x86_64 <span class="token comment">#1 SMP Tue May 12 16:57:42 UTC 2020 x86_64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="oWaGF"></a></p>
<h4 id="_3-2-3-haproxy启动脚本" tabindex="-1"><a class="header-anchor" href="#_3-2-3-haproxy启动脚本" aria-hidden="true">#</a> 3.2.3 HAProxy启动脚本</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span>   /usr/lib/systemd/system/haproxy.service
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>HAProxy Load Balancer
<span class="token assign-left variable">After</span><span class="token operator">=</span>syslog.target network.target

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">ExecStartPre</span><span class="token operator">=</span>/usr/sbin/haproxy <span class="token parameter variable">-f</span> /etc/haproxy/haproxy.cfg  <span class="token parameter variable">-c</span> <span class="token parameter variable">-q</span>
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/sbin/haproxy <span class="token parameter variable">-Ws</span> <span class="token parameter variable">-f</span> /etc/haproxy/haproxy.cfg <span class="token parameter variable">-p</span> /var/lib/haproxy/haproxy.pid
<span class="token assign-left variable">ExecReload</span><span class="token operator">=</span>/bin/kill <span class="token parameter variable">-USR2</span> <span class="token variable">$MAINPID</span>

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="XOK2n"></a></p>
<h4 id="_3-2-4-创建配置文件" tabindex="-1"><a class="header-anchor" href="#_3-2-4-创建配置文件" aria-hidden="true">#</a> 3.2.4 创建配置文件</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span>  /etc/haproxy
<span class="token function">vim</span> /etc/haproxy/haproxy.cfg

global
    maxconn <span class="token number">100000</span>
    <span class="token function">chroot</span> /apps/haproxy
    stats socket /var/lib/haproxy/haproxy.sock mode <span class="token number">600</span> level admin
    <span class="token comment">#uid 99</span>
    <span class="token comment">#gid 99</span>
    user  haproxy
    group haproxy
    daemon
    <span class="token comment">#nbproc 4</span>
    <span class="token comment">#cpu-map 1 0</span>
    <span class="token comment">#cpu-map 2 1</span>
    <span class="token comment">#cpu-map 3 2</span>
    <span class="token comment">#cpu-map 4 3</span>
    pidfile /var/lib/haproxy/haproxy.pid
    log <span class="token number">127.0</span>.0.1 local2 info

defaults
    option http-keep-alive
    option  forwardfor
    maxconn <span class="token number">100000</span>
    mode http
    <span class="token function">timeout</span> connect 300000ms
    <span class="token function">timeout</span> client  300000ms
    <span class="token function">timeout</span> server  300000ms

listen stats
    mode http
    <span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:9999
    stats <span class="token builtin class-name">enable</span>
    log global
    stats uri     /haproxy-status
    stats auth    haadmin:123456

listen  web_port
    <span class="token builtin class-name">bind</span> <span class="token number">10.1</span>.0.6:30013
    mode http
    option forwardfor
    log global
    server web1  <span class="token number">10.1</span>.0.31:30013  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="merQc"></a></p>
<h4 id="_3-2-5-启动haproxy" tabindex="-1"><a class="header-anchor" href="#_3-2-5-启动haproxy" aria-hidden="true">#</a> 3.2.5  启动haproxy</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span>  /var/lib/haproxy
<span class="token function">chown</span>  <span class="token parameter variable">-R</span> <span class="token number">99.99</span> /var/lib/haproxy/ 

<span class="token function">useradd</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-s</span> /sbin/nologin <span class="token parameter variable">-d</span> /var/lib/haproxy haproxy
systemctl daemon-reload

systemctl start haproxy
systemctl <span class="token builtin class-name">enable</span> haproxy
systemctl status haproxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="gpyFm"></a></p>
<h3 id="_3-3-验证haproxy状态" tabindex="-1"><a class="header-anchor" href="#_3-3-验证haproxy状态" aria-hidden="true">#</a> 3.3 验证haproxy状态</h3>
<p><a name="IOACl"></a></p>
<h4 id="_3-3-1-验证监听端口" tabindex="-1"><a class="header-anchor" href="#_3-3-1-验证监听端口" aria-hidden="true">#</a> 3.3.1 验证监听端口</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost haproxy<span class="token punctuation">]</span><span class="token comment"># ss -tnl</span>
State       Recv-Q Send-Q          Local Address:Port      Peer Address:Port              
LISTEN      <span class="token number">0</span>      <span class="token number">128</span>                 <span class="token number">127.0</span>.0.1:631                  *:*                  
LISTEN      <span class="token number">0</span>      <span class="token number">100</span>                         *:8088                 *:*                  
LISTEN      <span class="token number">0</span>      <span class="token number">3</span>                   <span class="token number">127.0</span>.0.1:31769                *:*                  
LISTEN      <span class="token number">0</span>      <span class="token number">100</span>                 <span class="token number">127.0</span>.0.1:25                   *:*                  
LISTEN      <span class="token number">0</span>      <span class="token number">128</span>                         *:1883                 *:*                  
LISTEN      <span class="token number">0</span>      <span class="token number">128</span>                         *:30013                *:*                  
LISTEN      <span class="token number">0</span>      <span class="token number">50</span>                          *:8161                 *:*                  
LISTEN      <span class="token number">0</span>      <span class="token number">1</span>                   <span class="token number">127.0</span>.0.1:8005                 *:*                  
LISTEN      <span class="token number">0</span>      <span class="token number">128</span>                         *:5672                 *:*                  
LISTEN      <span class="token number">0</span>      <span class="token number">50</span>                          *:43178                *:*                  
LISTEN      <span class="token number">0</span>      <span class="token number">128</span>                         *:6379                 *:*                  
LISTEN      <span class="token number">0</span>      <span class="token number">128</span>                         *:61613                *:*                  
LISTEN      <span class="token number">0</span>      <span class="token number">50</span>                          *:61614                *:*                  
LISTEN      <span class="token number">0</span>      <span class="token number">128</span>                         *:9999                 *:* 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="CE44W"></a></p>
<h4 id="_3-3-2-查看haproxy的状态页面" tabindex="-1"><a class="header-anchor" href="#_3-3-2-查看haproxy的状态页面" aria-hidden="true">#</a> 3.3.2 查看haproxy的状态页面</h4>
<p>浏览器访问：<a href="http://www.yunweipai.com/go?_=84a56fb1feaHR0cDovL2hhcHJveHktc2VydmVyOjk5OTkvaGFwcm94eS1zdGF0dXM%3D" target="_blank" rel="noopener noreferrer">http://haproxy-server:9999/haproxy-status<ExternalLinkIcon/></a><br /><img src="http://cdn1.ryanxin.live/1676021477593-8a91dd15-dde3-4cc1-a009-f117f39f08f9.png" alt="" loading="lazy"></p>
<p><a name="pjkah"></a></p>
<h4 id="_3-3-3-测试转发" tabindex="-1"><a class="header-anchor" href="#_3-3-3-测试转发" aria-hidden="true">#</a> 3.3.3 测试转发</h4>
<p>10.1.0.6:30013 转发到 10.1.0.31:30013 ✅</p>
<figure><img src="http://cdn1.ryanxin.live/1676254179452-d15ddfd6-e6e2-4d2c-8d3a-691d48309fcf.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><a name="HaR1B"></a></p>
<h2 id="四、基础配置详解" tabindex="-1"><a class="header-anchor" href="#四、基础配置详解" aria-hidden="true">#</a> 四、基础配置详解</h2>
<p>官方文档：<a href="http://cbonte.github.io/haproxy-dconv/2.6/configuration.html" target="_blank" rel="noopener noreferrer">http://cbonte.github.io/haproxy-dconv/2.6/configuration.html<ExternalLinkIcon/></a></p>
<p>HAProxy 的配置文件<strong>haproxy.cfg</strong>由两大部分组成，分别是<strong>global</strong>和<strong>proxies</strong>部分</p>
<p>**global ：全局配置段  **</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>进程及安全配置相关的参数
性能调整相关参数
Debug参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>** proxies：代理配置段  **</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>defaults：为frontend, backend, listen提供默认配置
frontend：前端，相当于nginx中的server <span class="token punctuation">{</span><span class="token punctuation">}</span>
backend：后端，相当于nginx中的upstream <span class="token punctuation">{</span><span class="token punctuation">}</span>
listen：同时拥有前端和后端配置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="uAz1l"></a></p>
<h3 id="_4-1-global配置" tabindex="-1"><a class="header-anchor" href="#_4-1-global配置" aria-hidden="true">#</a> 4.1 global配置</h3>
<p><a name="lWVLb"></a></p>
<h4 id="_4-1-1-global-配置参数说明" tabindex="-1"><a class="header-anchor" href="#_4-1-1-global-配置参数说明" aria-hidden="true">#</a> 4.1.1 global 配置参数说明</h4>
<p>官方文档：<a href="http://cbonte.github.io/haproxy-dconv/2.6/configuration.html" target="_blank" rel="noopener noreferrer">http://cbonte.github.io/haproxy-dconv/2.6/configuration.html<ExternalLinkIcon/></a></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chroot</span> <span class="token comment">#锁定运行目录</span>
deamon <span class="token comment">#以守护进程运行</span>
stats socket /var/lib/haproxy/haproxy.sock mode <span class="token number">600</span> level admin process <span class="token number">1</span> <span class="token comment">#链接本机的socket文件，定义权限方便对负载进行动态调整</span>
user, group, uid, gid  <span class="token comment">#运行haproxy的用户身份</span>
nbproc    n     <span class="token comment">#多进程模式，开启worker进程数，建议与cpu个数相同，默认为1。开启时就不在支持线程模式，没开启时，一个进程下面有多个线程</span>
<span class="token comment">#nbthread  1    #指定每个haproxy进程开启的线程数，默认为每个进程一个线程,和nbproc互斥（版本有关）</span>
<span class="token comment">#如果同时启用nbproc和nbthread 会出现以下日志的错误，无法启动服务</span>
Apr  <span class="token number">7</span> <span class="token number">14</span>:46:23 haproxy haproxy: <span class="token punctuation">[</span>ALERT<span class="token punctuation">]</span> 097/144623 <span class="token punctuation">(</span><span class="token number">1454</span><span class="token punctuation">)</span> <span class="token builtin class-name">:</span> config <span class="token builtin class-name">:</span> cannot <span class="token builtin class-name">enable</span> multiple processes <span class="token keyword">if</span> multiple threads are configured. Please use either nbproc or nbthread but not both.

cpu-map <span class="token number">1</span> <span class="token number">0</span>     <span class="token comment">#绑定haproxy 进程至指定CPU，将第一个work进程绑定至0号CPU</span>
cpu-map <span class="token number">2</span> <span class="token number">1</span>     <span class="token comment">#绑定haproxy 进程至指定CPU，将第二个work进程绑定至1号CPU</span>
maxconn  <span class="token number">100000</span>      <span class="token comment">#每个haproxy进程的最大并发连接数</span>
maxsslconn  n   <span class="token comment">#每个haproxy进程ssl最大连接数,用于haproxy配置了证书的场景下</span>
maxconnrate n   <span class="token comment">#每个进程每秒创建的最大连接数量</span>
spread-checks n <span class="token comment">#后端server状态check随机提前或延迟百分比时间，建议2-5(20%-50%)之间，默认值0</span>
pidfile         <span class="token comment">#指定pid文件路径</span>
log <span class="token number">127.0</span>.0.1  local2 info <span class="token comment">#定义全局的syslog服务器；日志服务器需要开启UDP协议，最多可以定义两个</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="EuFfx"></a></p>
<h4 id="_4-4-2-多进程和线程" tabindex="-1"><a class="header-anchor" href="#_4-4-2-多进程和线程" aria-hidden="true">#</a> 4.4.2 多进程和线程</h4>
<p>范例：多进程和socket文件  <br /><strong>查看CPU核心数量</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost haproxy<span class="token punctuation">]</span><span class="token comment"># cat /proc/cpuinfo  | grep "cores" | uniq                                                                       </span>
cpu cores       <span class="token builtin class-name">:</span> <span class="token number">8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#vim /etc/haproxy/haproxy.cfg</span>
global
maxconn <span class="token number">100000</span>
<span class="token function">chroot</span> /apps/haproxy
stats socket /var/lib/haproxy/haproxy.sock1 mode <span class="token number">600</span> level admin process <span class="token number">1</span>               
stats socket /var/lib/haproxy/haproxy.sock2 mode <span class="token number">600</span> level admin process <span class="token number">2</span>
uid <span class="token number">99</span>
gid <span class="token number">99</span>
daemon
nbproc <span class="token number">2</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#systemctl restart haproxy</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#pstree -p |grep haproxy</span>
           <span class="token operator">|</span>-haproxy<span class="token punctuation">(</span><span class="token number">2634</span><span class="token punctuation">)</span>-+-haproxy<span class="token punctuation">(</span><span class="token number">2637</span><span class="token punctuation">)</span>
           <span class="token operator">|</span>               `-haproxy<span class="token punctuation">(</span><span class="token number">2638</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#ll /var/lib/haproxy/</span>
total <span class="token number">4</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">5</span> Mar <span class="token number">31</span> <span class="token number">18</span>:49 haproxy.pid
srw------- <span class="token number">1</span> root root <span class="token number">0</span> Mar <span class="token number">31</span> <span class="token number">18</span>:49 haproxy.sock1
srw------- <span class="token number">1</span> root root <span class="token number">0</span> Mar <span class="token number">31</span> <span class="token number">18</span>:49 haproxy.sock2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="H2JCH"></a></p>
<h4 id="_4-4-3-配置haproxy记录日志到指定日志文件中" tabindex="-1"><a class="header-anchor" href="#_4-4-3-配置haproxy记录日志到指定日志文件中" aria-hidden="true">#</a> 4.4.3  配置HAProxy记录日志到指定日志文件中</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#在global配置项定义：</span>
log <span class="token number">127.0</span>.0.1  local<span class="token punctuation">{</span><span class="token number">1</span>-7<span class="token punctuation">}</span> info <span class="token comment">#基于syslog记录日志到指定设备，级别有(err、warning、info、debug)</span>

listen  web_port
  <span class="token builtin class-name">bind</span> <span class="token number">127.0</span>.0.1:80
  mode http
  log global   <span class="token comment">#开启当前web_port的日志功能，默认不记录日志</span>
  server web1  <span class="token number">127.0</span>.0.1:8080  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>

<span class="token comment"># systemctl  restart haproxy</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="ESfie"></a></p>
<h5 id="rsyslog配置" tabindex="-1"><a class="header-anchor" href="#rsyslog配置" aria-hidden="true">#</a> <strong>Rsyslog配置</strong></h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/rsyslog.conf 
<span class="token variable">$ModLoad</span> imudp
<span class="token variable">$UDPServerRun</span> <span class="token number">514</span>

<span class="token comment"># Save boot messages also to boot.log</span>
local7.*                                                /var/log/boot.log
local5.*                                                /var/log/haproxy.log
local0.*                                                /var/log/haproxy.log
<span class="token comment"># systemctl  restart rsyslog</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="oKsmk"></a></p>
<h5 id="验证haproxy日志" tabindex="-1"><a class="header-anchor" href="#验证haproxy日志" aria-hidden="true">#</a> 验证HAProxy日志</h5>
<p>重启syslog服务并访问app页面，然后验证是否生成日志</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost log<span class="token punctuation">]</span><span class="token comment"># tail -f haproxy.log </span>
Feb <span class="token number">13</span> <span class="token number">11</span>:11:57 localhost haproxy<span class="token punctuation">[</span><span class="token number">3127</span><span class="token punctuation">]</span>: Connect from <span class="token number">172.16</span>.32.242:64058 to <span class="token number">10.1</span>.0.6:30013 <span class="token punctuation">(</span>web_port/HTTP<span class="token punctuation">)</span>
Feb <span class="token number">13</span> <span class="token number">11</span>:11:57 localhost haproxy<span class="token punctuation">[</span><span class="token number">3127</span><span class="token punctuation">]</span>: Connect from <span class="token number">172.16</span>.32.242:64058 to <span class="token number">10.1</span>.0.6:30013 <span class="token punctuation">(</span>web_port/HTTP<span class="token punctuation">)</span>
Feb <span class="token number">13</span> <span class="token number">11</span>:11:59 localhost haproxy<span class="token punctuation">[</span><span class="token number">3127</span><span class="token punctuation">]</span>: Connect from <span class="token number">172.16</span>.32.242:64058 to <span class="token number">10.1</span>.0.6:30013 <span class="token punctuation">(</span>web_port/HTTP<span class="token punctuation">)</span>
Feb <span class="token number">13</span> <span class="token number">11</span>:11:59 localhost haproxy<span class="token punctuation">[</span><span class="token number">3127</span><span class="token punctuation">]</span>: Connect from <span class="token number">172.16</span>.32.242:64058 to <span class="token number">10.1</span>.0.6:30013 <span class="token punctuation">(</span>web_port/HTTP<span class="token punctuation">)</span>
Feb <span class="token number">13</span> <span class="token number">11</span>:11:59 localhost haproxy<span class="token punctuation">[</span><span class="token number">3127</span><span class="token punctuation">]</span>: Connect from <span class="token number">172.16</span>.32.242:64058 to <span class="token number">10.1</span>.0.6:30013 <span class="token punctuation">(</span>web_port/HTTP<span class="token punctuation">)</span>
Feb <span class="token number">13</span> <span class="token number">11</span>:11:59 localhost haproxy<span class="token punctuation">[</span><span class="token number">3127</span><span class="token punctuation">]</span>: Connect from <span class="token number">172.16</span>.32.242:64058 to <span class="token number">10.1</span>.0.6:30013 <span class="token punctuation">(</span>web_port/HTTP<span class="token punctuation">)</span>
Feb <span class="token number">13</span> <span class="token number">11</span>:11:59 localhost haproxy<span class="token punctuation">[</span><span class="token number">3127</span><span class="token punctuation">]</span>: Connect from <span class="token number">172.16</span>.32.242:64061 to <span class="token number">10.1</span>.0.6:30013 <span class="token punctuation">(</span>web_port/HTTP<span class="token punctuation">)</span>
Feb <span class="token number">13</span> <span class="token number">11</span>:11:59 localhost haproxy<span class="token punctuation">[</span><span class="token number">3127</span><span class="token punctuation">]</span>: Connect from <span class="token number">172.16</span>.32.242:64061 to <span class="token number">10.1</span>.0.6:30013 <span class="token punctuation">(</span>web_port/HTTP<span class="token punctuation">)</span>
Feb <span class="token number">13</span> <span class="token number">11</span>:11:59 localhost haproxy<span class="token punctuation">[</span><span class="token number">3127</span><span class="token punctuation">]</span>: Connect from <span class="token number">172.16</span>.32.242:64061 to <span class="token number">10.1</span>.0.6:30013 <span class="token punctuation">(</span>web_port/HTTP<span class="token punctuation">)</span>
Feb <span class="token number">13</span> <span class="token number">11</span>:11:59 localhost haproxy<span class="token punctuation">[</span><span class="token number">3127</span><span class="token punctuation">]</span>: Connect from <span class="token number">172.16</span>.32.242:64061 to <span class="token number">10.1</span>.0.6:30013 <span class="token punctuation">(</span>web_port/HTTP<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="QimZ3"></a></p>
<h3 id="_4-2-proxies配置" tabindex="-1"><a class="header-anchor" href="#_4-2-proxies配置" aria-hidden="true">#</a> 4.2 Proxies配置</h3>
<p>官方文档：<a href="http://docs.haproxy.org/2.6/configuration.html#4" target="_blank" rel="noopener noreferrer">http://docs.haproxy.org/2.6/configuration.html#4<ExternalLinkIcon/></a></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>defaults <span class="token punctuation">[</span><span class="token operator">&lt;</span>name<span class="token operator">></span><span class="token punctuation">]</span> <span class="token comment">#默认配置项，针对以下的frontend、backend和listen生效，可以多个name也可以没有name</span>
frontend <span class="token operator">&lt;</span>name<span class="token operator">></span>   <span class="token comment">#前端servername，类似于Nginx的一个虚拟主机 server和LVS服务集群。</span>
backend  <span class="token operator">&lt;</span>name<span class="token operator">></span>   <span class="token comment">#后端服务器组，等于nginx的upstream和LVS中的RS服务器</span>
listen   <span class="token operator">&lt;</span>name<span class="token operator">></span>   <span class="token comment">#将frontend和backend合并在一起配置，相对于frontend和backend配置更简洁，生产常用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**注意：name字段只能使用大小写字母，数字，‘-’(dash)，’_‘(underscore)，’.’ (dot)和 ‘:'(colon)，并且严格区分大小写 **</p>
<p><a name="W2ZMc"></a></p>
<h4 id="_4-2-1-proxies配置-frontend" tabindex="-1"><a class="header-anchor" href="#_4-2-1-proxies配置-frontend" aria-hidden="true">#</a> 4.2.1 Proxies配置-frontend</h4>
<p><strong>frontend 配置参数：</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>bind：   <span class="token comment">#指定HAProxy的监听地址，可以是IPV4或IPV6，可以同时监听多个IP或端口，可同时用于listen字段中</span>

<span class="token comment">#格式：</span>
<span class="token builtin class-name">bind</span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>address<span class="token operator">></span><span class="token punctuation">]</span>:<span class="token operator">&lt;</span>port_range<span class="token operator">></span> <span class="token punctuation">[</span>, <span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token punctuation">[</span>param*<span class="token punctuation">]</span>

<span class="token comment">#注意：如果需要绑定在非本机的IP，需要开启内核参数：net.ipv4.ip_nonlocal_bind=1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>listen http_proxy                           <span class="token comment">#监听http的多个IP的多个端口和sock文件</span>
    <span class="token builtin class-name">bind</span> :80,:443,:8801-8810
    <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.1:10080,10.0.0.1:10443
    <span class="token builtin class-name">bind</span> /var/run/ssl-frontend.sock user root mode <span class="token number">600</span> accept-proxy

listen http_https_proxy                     <span class="token comment">#https监听</span>
    <span class="token builtin class-name">bind</span> :80
    <span class="token builtin class-name">bind</span> :443 ssl crt /etc/haproxy/site.pem <span class="token comment">#公钥和私钥公共文件</span>

listen http_https_proxy_explicit            <span class="token comment">#监听ipv6、ipv4和unix sock文件</span>
    <span class="token builtin class-name">bind</span> ipv6@:80
    <span class="token builtin class-name">bind</span> ipv4@public_ssl:443 ssl crt /etc/haproxy/site.pem
    <span class="token builtin class-name">bind</span> unix@ssl-frontend.sock user root mode <span class="token number">600</span> accept-proxy

listen external_bind_app1                   <span class="token comment">#监听file descriptor</span>
    <span class="token builtin class-name">bind</span> <span class="token string">"fd@<span class="token variable">${FD_APP1}</span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>** 生产示例：**</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>frontend  magedu_web_port               <span class="token comment">#可以采用后面形式命名：业务-服务-端口号</span>
    <span class="token builtin class-name">bind</span> :80,:8080
    <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:10080,:8801-8810,10.0.0.17:9001-9010
    mode  http<span class="token operator">|</span>tcp              <span class="token comment">#指定负载协议类型</span>
    use_backend <span class="token operator">&lt;</span>backend_name<span class="token operator">></span>  <span class="token comment">#调用的后端服务器组名称</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="ZeD03"></a></p>
<h4 id="_4-2-2-proxies配置-backend" tabindex="-1"><a class="header-anchor" href="#_4-2-2-proxies配置-backend" aria-hidden="true">#</a> 4.2.2 Proxies配置-backend</h4>
<p>定义一组后端服务器，backend服务器将被frontend进行调用。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mode  http<span class="token operator">|</span>tcp      <span class="token comment">#指定负载协议类型,和对应的frontend必须一致</span>
option              <span class="token comment">#配置选项</span>
server              <span class="token comment">#定义后端real server</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：option后面加** httpchk，smtpchk,mysql-check,pgsql-check，ssl-hello-chk**方法，可用于实现更多应用层检测功能。</p>
<p><a name="P9DQB"></a></p>
<h5 id="option-配置" tabindex="-1"><a class="header-anchor" href="#option-配置" aria-hidden="true">#</a> option 配置</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>check               <span class="token comment">#对指定real进行健康状态检查，如果不加此设置，默认不开启检查</span>
    addr  <span class="token operator">&lt;</span>IP<span class="token operator">></span>        <span class="token comment">#可指定的健康状态监测IP，可以是专门的数据网段，减少业务网络的流量</span>
    port  <span class="token operator">&lt;</span>num<span class="token operator">></span>   <span class="token comment">#指定的健康状态监测端口</span>
    inter <span class="token operator">&lt;</span>num<span class="token operator">></span>   <span class="token comment">#健康状态检查间隔时间，默认2000 ms</span>
    fall  <span class="token operator">&lt;</span>num<span class="token operator">></span>       <span class="token comment">#后端服务器从线上转为线下的检查的连续失效次数，默认为3</span>
    rise  <span class="token operator">&lt;</span>num<span class="token operator">></span>       <span class="token comment">#后端服务器从下线恢复上线的检查的连续有效次数，默认为2</span>
weight  <span class="token operator">&lt;</span>weight<span class="token operator">></span>  <span class="token comment">#默认为1，最大值为256，0表示不参与负载均衡，但仍接受持久连接</span>
backup              <span class="token comment">#将后端服务器标记为备份状态,只在所有非备份主机down机时提供服务，类似Sorry Server</span>
disabled            <span class="token comment">#将后端服务器标记为不可用状态，即维护状态，除了持久模式，将不再接受连接</span>
redirect prefix  http://www.baidu.com/      <span class="token comment">#将请求临时(302)重定向至其它URL，只适用于http模式</span>
redir http://www.baidu.com                  <span class="token comment">#将请求临时(302)重定向至其它URL，只适用于http模式</span>
maxconn <span class="token operator">&lt;</span>maxconn<span class="token operator">></span>     <span class="token comment">#当前后端server的最大并发连接数</span>
backlog <span class="token operator">&lt;</span>backlog<span class="token operator">></span> <span class="token comment">#当前端服务器的连接数达到上限后的后援队列长度，注意：不支持backend</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="LKKi7"></a></p>
<h4 id="_4-2-3-frontend-backend配置实例" tabindex="-1"><a class="header-anchor" href="#_4-2-3-frontend-backend配置实例" aria-hidden="true">#</a> 4.2.3 frontend+backend配置实例</h4>
<p>范例1：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>frontend xin-test-http
 <span class="token builtin class-name">bind</span> :80,:8080
 mode tcp
 use_backend magedu-test-http-nodes

backend magedu-test-http-nodes
 mode tcp
 default-server inter <span class="token number">1000</span> weight <span class="token number">6</span>  
 server web1 <span class="token number">10.0</span>.0.17:80 check weight <span class="token number">2</span> addr <span class="token number">10.0</span>.0.117 port <span class="token number">8080</span>
 server web1 <span class="token number">10.0</span>.0.27:80 check
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>范例2：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#官网业务访问入口</span>
frontend  WEB_PORT_80
    <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:80
    mode http
    use_backend  web_prot_http_nodes

backend web_prot_http_nodes
    mode  http
    option forwardfor
    server <span class="token number">10.0</span>.0.17 <span class="token number">10.0</span>.0.17:8080   check inter <span class="token number">3000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>  
    server <span class="token number">10.0</span>.0.27 <span class="token number">10.0</span>.0.27:8080   check inter <span class="token number">3000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="jVeG5"></a></p>
<h4 id="_4-2-4-proxies配置-listen替代frontend-backend" tabindex="-1"><a class="header-anchor" href="#_4-2-4-proxies配置-listen替代frontend-backend" aria-hidden="true">#</a> 4.2.4 Proxies配置-listen替代frontend+backend</h4>
<p>使用listen替换上面的frontend和backend的配置方式，可以简化设置，通常只用于TCP协议的应用</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#官网业务访问入口</span>
listen  WEB_PORT_80 
    <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:80  
    mode http
    option  forwardfor
    server web1   <span class="token number">10.0</span>.0.17:8080   check inter <span class="token number">3000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
    server web2   <span class="token number">10.0</span>.0.27:8080   check inter <span class="token number">3000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="PN7I4"></a></p>
<h3 id="_4-3-使用子配置文件保存配置" tabindex="-1"><a class="header-anchor" href="#_4-3-使用子配置文件保存配置" aria-hidden="true">#</a> 4.3 使用子配置文件保存配置</h3>
<p>当业务众多时，将所有配置都放在一个配置文件中，会造成维护困难。可以考虑按业务分类，将配置信息拆分，放在不同的子配置文件中，从而达到方便维护的目的。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#创建子配置目录</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#mkdir /etc/haproxy/conf.d/</span>

<span class="token comment">#创建子配置文件，注意：必须为cfg后缀</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#vim  /etc/haproxy/conf.d/test.cfg</span>
listen WEB_PORT_80
    <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:80
    mode http
    balance roundrobin
    server web1  <span class="token number">10.0</span>.0.17:80  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
    server web2  <span class="token number">10.0</span>.0.27:80  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>

<span class="token comment">#添加子配置目录到unit文件中</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#vim  /lib/systemd/system/haproxy.service</span>
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>HAProxy Load Balancer
<span class="token assign-left variable">After</span><span class="token operator">=</span>syslog.target network.target

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">ExecStartPre</span><span class="token operator">=</span>/usr/sbin/haproxy <span class="token parameter variable">-f</span> /etc/haproxy/haproxy.cfg <span class="token parameter variable">-f</span> /etc/haproxy/conf.d/ <span class="token parameter variable">-c</span> <span class="token parameter variable">-q</span>
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/sbin/haproxy <span class="token parameter variable">-Ws</span> <span class="token parameter variable">-f</span> /etc/haproxy/haproxy.cfg <span class="token parameter variable">-f</span> /etc/haproxy/conf.d/  <span class="token parameter variable">-p</span> /var/lib/haproxy/haproxy.pid
<span class="token assign-left variable">ExecReload</span><span class="token operator">=</span>/bin/kill <span class="token parameter variable">-USR2</span> <span class="token variable">$MAINPID</span>

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target

<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#systemctl daemon-reload </span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#systemctl restart haproxy</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="pz6z2"></a></p>
<h2 id="五、haproxy调度算法" tabindex="-1"><a class="header-anchor" href="#五、haproxy调度算法" aria-hidden="true">#</a> 五、HAProxy调度算法</h2>
<p>HAProxy通过固定参数  **balance ** 指明对后端服务器的调度算法，该参数可以配置在listen或backend选项中。  <br /> HAProxy的调度算法分为静态和动态调度算法，但是有些算法可以根据参数在静态和动态算法中相互转换。</p>
<p>官方文档：<a href="http://cbonte.github.io/haproxy-dconv/2.6/configuration.html#balance" target="_blank" rel="noopener noreferrer">http://cbonte.github.io/haproxy-dconv/2.6/configuration.html#balance<ExternalLinkIcon/></a></p>
<p><a name="XL31m"></a></p>
<h3 id="_5-1-静态算法" tabindex="-1"><a class="header-anchor" href="#_5-1-静态算法" aria-hidden="true">#</a> 5.1 静态算法</h3>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>** 静态算法**：按照事先定义好的规则轮询公平调度，不关心后端服务器的当前负载、链接数和响应速度等，且无法实时修改权重，只能靠重启HAProxy生效。</p>
</div>
<p>可以利用 <strong>socat</strong>工具对服务器动态权重和其它状态的调整，Socat 是 Linux 下的一个多功能的网络工具，名字来由是Socket CAT，Socat 的主要特点就是在两个数据流之间建立通道，且支持众多协议和链接方式。如 IP、TCP、 UDP、IPv6、Socket文件等</p>
<p>**利用工具socat 对服务器动态权重调整 **</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#yum -y install socat</span>

<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#echo "show info" | socat stdio /var/lib/haproxy/haproxy.sock</span>
Name: HAProxy
Version: <span class="token number">2.1</span>.3
Release_date: <span class="token number">2020</span>/02/12
Nbthread: <span class="token number">4</span>
Nbproc: <span class="token number">1</span>
Process_num: <span class="token number">1</span>
Pid: <span class="token number">2279</span>
Uptime: 0d 0h46m07s
Uptime_sec: <span class="token number">2767</span>
Memmax_MB: <span class="token number">0</span>
PoolAlloc_MB: <span class="token number">0</span>
PoolUsed_MB: <span class="token number">0</span>
PoolFailed: <span class="token number">0</span>
Ulimit-n: <span class="token number">200041</span>
Maxsock: <span class="token number">200041</span>
Maxconn: <span class="token number">100000</span>
Hard_maxconn: <span class="token number">100000</span>
CurrConns: <span class="token number">0</span>
CumConns: <span class="token number">1</span>
CumReq: <span class="token number">1</span>
MaxSslConns: <span class="token number">0</span>
CurrSslConns: <span class="token number">0</span>
CumSslConns: <span class="token number">0</span>
Maxpipes: <span class="token number">0</span>
PipesUsed: <span class="token number">0</span>
PipesFree: <span class="token number">0</span>
ConnRate: <span class="token number">0</span>
ConnRateLimit: <span class="token number">0</span>
MaxConnRate: <span class="token number">0</span>
SessRate: <span class="token number">0</span>
SessRateLimit: <span class="token number">0</span>
MaxSessRate: <span class="token number">0</span>
SslRate: <span class="token number">0</span>
SslRateLimit: <span class="token number">0</span>
MaxSslRate: <span class="token number">0</span>
SslFrontendKeyRate: <span class="token number">0</span>
SslFrontendMaxKeyRate: <span class="token number">0</span>
SslFrontendSessionReuse_pct: <span class="token number">0</span>
SslBackendKeyRate: <span class="token number">0</span>
SslBackendMaxKeyRate: <span class="token number">0</span>
SslCacheLookups: <span class="token number">0</span>
SslCacheMisses: <span class="token number">0</span>
CompressBpsIn: <span class="token number">0</span>
CompressBpsOut: <span class="token number">0</span>
CompressBpsRateLim: <span class="token number">0</span>
ZlibMemUsage: <span class="token number">0</span>
MaxZlibMemUsage: <span class="token number">0</span>
Tasks: <span class="token number">19</span>
Run_queue: <span class="token number">1</span>
Idle_pct: <span class="token number">100</span>
node: centos7.wangxiaochun.com
Stopping: <span class="token number">0</span>
Jobs: <span class="token number">7</span>
Unstoppable Jobs: <span class="token number">0</span>
Listeners: <span class="token number">6</span>
ActivePeers: <span class="token number">0</span>
ConnectedPeers: <span class="token number">0</span>
DroppedLogs: <span class="token number">0</span>
BusyPolling: <span class="token number">0</span>
FailedResolutions: <span class="token number">0</span>
TotalBytesOut: <span class="token number">0</span>
BytesOutRate: <span class="token number">0</span>
DebugCommandsIssued: <span class="token number">0</span>



<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#echo "show servers state" | socat stdio /var/lib/haproxy/haproxy.sock1</span>
<span class="token comment"># be_id be_name srv_id srv_name srv_addr srv_op_state srv_admin_state srv_uweight srv_iweight srv_time_since_last_change srv_check_status srv_check_result srv_check_health srv_check_state srv_agent_state bk_f_forced_id srv_f_forced_id srv_fqdn srv_port srvrecord</span>
<span class="token number">2</span> magedu-test-80 <span class="token number">1</span> web1 <span class="token number">10.0</span>.0.17 <span class="token number">2</span> <span class="token number">0</span> <span class="token number">2</span> <span class="token number">1</span> <span class="token number">812</span> <span class="token number">6</span> <span class="token number">3</span> <span class="token number">7</span> <span class="token number">6</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span> - <span class="token number">80</span> -
<span class="token number">2</span> magedu-test-80 <span class="token number">2</span> web2 <span class="token number">10.0</span>.0.27 <span class="token number">2</span> <span class="token number">0</span> <span class="token number">2</span> <span class="token number">3</span> <span class="token number">812</span> <span class="token number">6</span> <span class="token number">3</span> <span class="token number">4</span> <span class="token number">6</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span> - <span class="token number">80</span> -
<span class="token number">4</span> web_port <span class="token number">1</span> web1 <span class="token number">127.0</span>.0.1 <span class="token number">0</span> <span class="token number">0</span> <span class="token number">1</span> <span class="token number">1</span> <span class="token number">810</span> <span class="token number">8</span> <span class="token number">2</span> <span class="token number">0</span> <span class="token number">6</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span> - <span class="token number">8080</span> -


<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#echo "get weight magedu-test-80/web2" | socat stdio /var/lib/haproxy/haproxy.sock</span>
<span class="token number">3</span> <span class="token punctuation">(</span>initial <span class="token number">3</span><span class="token punctuation">)</span>

<span class="token comment">#修改weight，注意只针对单进程有效</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#echo "set weight magedu-test-80/web2 2" | socat stdio /var/lib/haproxy/haproxy.sock</span>

<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#echo "get weight magedu-test-80/web2" | socat stdio /var/lib/haproxy/haproxy.sock</span>
<span class="token number">2</span> <span class="token punctuation">(</span>initial <span class="token number">3</span><span class="token punctuation">)</span>


<span class="token comment">#将后端服务器禁用，注意只针对单进程有效</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#echo "disable server magedu-test-80/web2" | socat stdio /var/lib/haproxy/haproxy.sock</span>

<span class="token comment">#将后端服务器软下线，即weight设为0</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#echo "set weight magedu-test-80/web1 0" | socat stdio /var/lib/haproxy/haproxy.sock</span>


<span class="token comment">#将后端服务器禁用，针对多进程</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#vim /etc/haproxy/haproxy.cfg</span>
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
stats socket /var/lib/haproxy/haproxy1.sock mode <span class="token number">600</span> level admin process <span class="token number">1</span>
stats socket /var/lib/haproxy/haproxy2.sock mode <span class="token number">600</span> level admin process <span class="token number">2</span>               nbproc <span class="token number">2</span>
<span class="token punctuation">..</span><span class="token punctuation">..</span>.

<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#echo "disable server  magedu-test-80/web2" | socat stdio /var/lib/haproxy/haproxy1.sock</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#echo "disable server  magedu-test-80/web2" | socat stdio /var/lib/haproxy/haproxy2.sock</span>

<span class="token punctuation">[</span>root@haproxy ~<span class="token punctuation">]</span><span class="token comment">#for i in {1..2};do echo "set weight magedu-test-80/web$i 10" | socat stdio /var/lib/haproxy/haproxy$i.sock;done</span>

<span class="token comment">#如果静态算法，如:static-rr，可以更改weight为0或1，但不支持动态更改weight为其它值，否则会提示下面信息</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#echo "set weight magedu-test-80/web1 0" | socat stdio /var/lib/haproxy/haproxy.sock</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#echo "set weight magedu-test-80/web1 1" | socat stdio /var/lib/haproxy/haproxy.sock</span>

<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#echo "set weight magedu-test-80/web1 2" | socat stdio /var/lib/haproxy/haproxy.sock</span>
Backend is using a static LB algorithm and only accepts weights <span class="token string">'0%'</span> and <span class="token string">'100%'</span><span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="AG2bv"></a></p>
<h4 id="_5-1-1-static-rr" tabindex="-1"><a class="header-anchor" href="#_5-1-1-static-rr" aria-hidden="true">#</a> 5.1.1 static-rr</h4>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>static-rr：基于权重的轮询调度，不支持权重的运行时利用socat进行动态调整及后端服务器慢启动，其后端主机数量没有限制，相当于LVS中的 wrr</p>
</div>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>listen  web_host
  <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:80,:8801-8810,10.0.0.7:9001-9010
  mode http
  log global
  balance static-rr
  server web1  <span class="token number">10.0</span>.0.17:80 weight <span class="token number">1</span> check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
  server web2  <span class="token number">10.0</span>.0.27:80 weight <span class="token number">2</span> check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="PL2FN"></a></p>
<h4 id="_5-1-2-first" tabindex="-1"><a class="header-anchor" href="#_5-1-2-first" aria-hidden="true">#</a> 5.1.2 first</h4>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>first：根据服务器在列表中的位置，自上而下进行调度，但是其只会当第一台服务器的连接数达到上限，新请求才会分配给下一台服务，因此会忽略服务器的权重设置，此方式使用较少</p>
</div>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>listen  web_host
  <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:80,:8801-8810,10.0.0.7:9001-9010
  mode http
  log global
  balance first
  server web1  <span class="token number">10.0</span>.0.17:80 maxconn <span class="token number">2</span> weight <span class="token number">1</span> check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
  server web2  <span class="token number">10.0</span>.0.27:80 weight <span class="token number">1</span> check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="T3wms"></a></p>
<h3 id="_5-2-动态算法" tabindex="-1"><a class="header-anchor" href="#_5-2-动态算法" aria-hidden="true">#</a> 5.2 动态算法</h3>
<p>:::success
动态算法：基于后端服务器状态进行调度适当调整，优先调度至当前负载较低的服务器，且权重可以在haproxy运行时动态调整无需重启。<br>
:::</p>
<p><a name="Gr8Gw"></a></p>
<h4 id="_5-2-1-roundrobin" tabindex="-1"><a class="header-anchor" href="#_5-2-1-roundrobin" aria-hidden="true">#</a> 5.2.1 roundrobin</h4>
<p>roundrobin：基于权重的轮询动态调度算法，支持权重的运行时调整，不同于lvs中的rr轮训模式，HAProxy中的roundrobin支持慢启动(新加的服务器会逐渐增加转发数)，其每个后端backend中<strong>最多支持4095个real server</strong>，支持对real server权重动态调整，<strong>roundrobin为默认调度算法。</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>listen web_host
  <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:80,:8801-8810,10.0.0.7:9001-9010
  mode http
  log global
  balance roundrobin
  server web1  <span class="token number">10.0</span>.0.17:80 weight <span class="token number">1</span>  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
  server web2  <span class="token number">10.0</span>.0.27:80 weight <span class="token number">2</span>  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>** 支持动态调整权重：  **</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># echo "get weight web_host/web1" | socat stdio /var/lib/haproxy/haproxy.sock </span>
<span class="token number">1</span> <span class="token punctuation">(</span>initial <span class="token number">1</span><span class="token punctuation">)</span>

<span class="token comment"># echo "set weight web_host/web1 3" | socat stdio /var/lib/haproxy/haproxy.sock </span>

<span class="token comment"># echo "get weight web_host/web1" | socat stdio /var/lib/haproxy/haproxy.sock </span>
<span class="token number">3</span> <span class="token punctuation">(</span>initial <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="OyctY"></a></p>
<h4 id="_5-2-2-leastconn" tabindex="-1"><a class="header-anchor" href="#_5-2-2-leastconn" aria-hidden="true">#</a> 5.2.2 leastconn</h4>
<p>leastconn加权的最少连接的动态，支持权重的运行时调整和慢启动，即当前后<strong>端服务器连接最少的优先调度</strong>(新客户端连接)，<strong>比较适合长连接的场景使用</strong>，比如：MySQL等场景。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>listen  web_host
  <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:80,:8801-8810,10.0.0.7:9001-9010
  mode http
  log global
  balance leastconn
  server web1  <span class="token number">10.0</span>.0.17:80 weight <span class="token number">1</span>  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
  server web2  <span class="token number">10.0</span>.0.27:80 weight <span class="token number">1</span>  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="OshWG"></a></p>
<h4 id="_5-2-3-random" tabindex="-1"><a class="header-anchor" href="#_5-2-3-random" aria-hidden="true">#</a> 5.2.3 random</h4>
<p>在1.9版本开始增加一个叫做random的负载平衡算法，其<strong>基于随机数作为一致性hash的key</strong>，随机负载平衡对于大型服务器场或经常添加或删除服务器非常有用，支持weight的动态调整，weight较大的主机有更大概率获取新请求。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>listen  web_host
  <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:80,:8801-8810,10.0.0.7:9001-9010
  mode http
  log global
  balance  random
  server web1  <span class="token number">10.0</span>.0.17:80 weight <span class="token number">1</span>  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
  server web2  <span class="token number">10.0</span>.0.27:80 weight <span class="token number">1</span>  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="aVdfq"></a></p>
<h3 id="_5-3-其他算法" tabindex="-1"><a class="header-anchor" href="#_5-3-其他算法" aria-hidden="true">#</a> 5.3 其他算法</h3>
<p>其它算法即可作为静态算法，又可以通过选项成为动态算法</p>
<p><a name="qlZVC"></a></p>
<h4 id="_5-3-1-source" tabindex="-1"><a class="header-anchor" href="#_5-3-1-source" aria-hidden="true">#</a> 5.3.1 source</h4>
<p>源地址hash，<strong>基于用户源地址hash并将请求转发到后端服务器，后续同一个源地址请求将被转发至同一个后端web服务器。</strong><br />此方式当后端服务器数据量发生变化时，会导致很多用户的请求转发至新的后端服务器，默认为静态方式，但是可以通过hash-type支持的选项更改。<br />这个算法一般是在不插入Cookie的TCP模式下使用，也可给拒绝会话cookie的客户提供最好的会话粘性，适用于session会话保持但不支持cookie和缓存的场景<br />源地址有两种转发客户端请求到后端服务器的服务器选取计算方式，分别是取模法和一致性hash</p>
<p><a name="Tnufu"></a></p>
<h4 id="_5-3-2-map-base取模法" tabindex="-1"><a class="header-anchor" href="#_5-3-2-map-base取模法" aria-hidden="true">#</a> 5.3.2 map-base取模法</h4>
<p>map-based：取模法，对source地址进行hash计算，再基于服务器总权重的取模，最终结果决定将此请求转发至对应的后端服务器。<br />此方法是静态的，即不支持在线调整权重，不支持慢启动，可实现对后端服务器均衡调度。<br /><strong>缺点是当服务器的总权重发生变化时，即有服务器上线或下线，都会因总权重发生变化而导致调度结果整体改变</strong>，hash-type 指定的默认值为此算法  。</p>
<blockquote>
<p>所谓取模运算，就是计算两个数相除之后的余数，**10%7=3, 7%4=3 **
map-based算法：基于权重取模，hash(source_ip)%所有后端服务器相加的总权重</p>
</blockquote>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>listen  web_host
  <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:80,:8801-8810,10.0.0.7:9001-9010
  mode tcp
  log global
  balance <span class="token builtin class-name">source</span>
  hash-type map-based 
  server web1  <span class="token number">10.0</span>.0.17:80 weight <span class="token number">1</span>  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">3</span>
  server web2  <span class="token number">10.0</span>.0.27:80 weight <span class="token number">1</span>  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">3</span>

<span class="token punctuation">[</span>root@haproxy ~<span class="token punctuation">]</span><span class="token comment">#echo "set weight web_host/10.0.0.27 10" | socat stdio /var/lib/haproxy/haproxy.sock </span>
Backend is using a static LB algorithm and only accepts weights <span class="token string">'0%'</span> and <span class="token string">'100%'</span><span class="token builtin class-name">.</span>

<span class="token punctuation">[</span>root@haproxy ~<span class="token punctuation">]</span><span class="token comment">#echo "set weight web_host/10.0.0.27 0" | socat stdio /var/lib/haproxy/haproxy.sock </span>

<span class="token punctuation">[</span>root@haproxy conf.d<span class="token punctuation">]</span><span class="token comment">#echo "get weight web_host/10.0.0.27" | socat stdio /var/lib/haproxy/haproxy.sock </span>
<span class="token number">0</span> <span class="token punctuation">(</span>initial <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="fSbEt"></a></p>
<h4 id="_5-3-3-一致性hash" tabindex="-1"><a class="header-anchor" href="#_5-3-3-一致性hash" aria-hidden="true">#</a> 5.3.3 一致性hash</h4>
<p>一致性哈希，<strong>当服务器的总权重发生变化时，对调度结果影响是局部的，不会引起大的变动</strong>，hash（o）mod n ，该hash算法是动态的，支持使用 socat等工具进行在线权重调整，支持慢启动 。</p>
<p>算法：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">1</span>、key1<span class="token operator">=</span>hash<span class="token punctuation">(</span>source_ip<span class="token punctuation">)</span>%<span class="token punctuation">(</span><span class="token number">2</span>^32<span class="token punctuation">)</span>  <span class="token punctuation">[</span><span class="token number">0</span>---4294967295<span class="token punctuation">]</span>
<span class="token number">2</span>、keyA<span class="token operator">=</span>hash<span class="token punctuation">(</span>后端服务器虚拟ip<span class="token punctuation">)</span>%<span class="token punctuation">(</span><span class="token number">2</span>^32<span class="token punctuation">)</span>
<span class="token number">3</span>、将key1和keyA都放在hash环上，将用户请求调度到离key1最近的keyA对应的后端服务器
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>** hash环偏斜问题 **</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>增加虚拟服务器IP数量，比如：一个后端服务器根据权重为1生成1000个虚拟IP，再hash。而后端服务器权重为2则生成2000的虚拟IP，再hash,最终在hash环上生成3000个节点，从而解决hash环偏斜问题
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>hash对象</p>
<p>Hash对象到后端服务器的映射关系：  <br /><img src="http://cdn1.ryanxin.live/1676269845062-cd498fcb-971f-4446-b3a5-524a0ab84182.png" alt="" loading="lazy"></p>
<p>一致性hash示意图<br />后端服务器在线与离线的调度方式<br /><img src="http://cdn1.ryanxin.live/1676269866029-afd24654-75c6-4b26-9d9d-5e7a37d18737.png" alt="" loading="lazy"></p>
<p>一致性hash配置示例</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>listen  web_host
  <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:80,:8801-8810,10.0.0.7:9001-9010
  mode tcp
  log global
  balance <span class="token builtin class-name">source</span>
  hash-type consistent
  server web1  <span class="token number">10.0</span>.0.17:80 weight <span class="token number">1</span>  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
  server web2  <span class="token number">10.0</span>.0.27:80 weight <span class="token number">1</span>  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="PyKn5"></a></p>
<h2 id="六、haproxy-https实现" tabindex="-1"><a class="header-anchor" href="#六、haproxy-https实现" aria-hidden="true">#</a> 六、HAProxy https实现</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#配置HAProxy支持https协议，支持ssl会话；</span>
<span class="token builtin class-name">bind</span> *:443 ssl crt /<span class="token environment constant">PATH</span>/TO/SOME_PEM_FILE   

<span class="token comment">#crt 后证书文件为PEM格式，且同时包含证书和所有私钥   </span>
 <span class="token function">cat</span>  demo.crt demo.key <span class="token operator">></span> demo.pem 

<span class="token comment">#把80端口的请求重向定443</span>
<span class="token builtin class-name">bind</span> *:80
redirect scheme https <span class="token keyword">if</span> <span class="token operator">!</span><span class="token punctuation">{</span> ssl_fc <span class="token punctuation">}</span>    

<span class="token comment">#向后端传递用户请求的协议和端口（frontend或backend）</span>
http_request set-header X-Forwarded-Port %<span class="token punctuation">[</span>dst_port<span class="token punctuation">]</span>
http_request add-header X-Forwared-Proto https <span class="token keyword">if</span> <span class="token punctuation">{</span> ssl_fc <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="WvK6d"></a></p>
<h3 id="_6-1-证书制作" tabindex="-1"><a class="header-anchor" href="#_6-1-证书制作" aria-hidden="true">#</a> 6.1 证书制作</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#方法1</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span>mkdir /etc/haproxy/certs/
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span>cd /etc/haproxy/certs/
<span class="token punctuation">[</span>root@centos7 certs<span class="token punctuation">]</span><span class="token comment">#openssl  genrsa -out haproxy.key 2048</span>
<span class="token punctuation">[</span>root@centos7 certs<span class="token punctuation">]</span><span class="token comment">#openssl  req -new -x509 -key haproxy.key  -out haproxy.crt -subj "/CN=www.xinblog.org"</span>
<span class="token comment">#或者用下一条命令实现</span>
<span class="token punctuation">[</span>root@centos7 certs<span class="token punctuation">]</span><span class="token comment">#openssl req  -x509 -newkey rsa:2048 -subj "/CN=www.magedu.org" -keyout haproxy.key -nodes -days 365 -out haproxy.crt</span>

<span class="token punctuation">[</span>root@centos7 certs<span class="token punctuation">]</span><span class="token comment">#cat haproxy.key  haproxy.crt  > haproxy.pem</span>
<span class="token punctuation">[</span>root@centos7 certs<span class="token punctuation">]</span><span class="token comment">#openssl  x509 -in  haproxy.pem -noout -text        #查看证书</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="ipX7G"></a></p>
<h3 id="_6-2-https配置示例" tabindex="-1"><a class="header-anchor" href="#_6-2-https配置示例" aria-hidden="true">#</a> 6.2 https配置示例</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#cat  /etc/haproxy/conf.d/test.cfg</span>
frontend  magedu_http_port
  <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:80
  <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:443 ssl crt /etc/haproxy/certs/haproxy.pem
  redirect scheme https <span class="token keyword">if</span> <span class="token operator">!</span><span class="token punctuation">{</span> ssl_fc <span class="token punctuation">}</span>        <span class="token comment"># 注意{ }内的空格</span>
  http-request  set-header  X-forwarded-Port   %<span class="token punctuation">[</span>dst_port<span class="token punctuation">]</span>
  http-request  add-header  X-forwarded-Proto  https <span class="token keyword">if</span> <span class="token punctuation">{</span> ssl_fc <span class="token punctuation">}</span> 
  mode http
  balance  roundrobin
  log global
  option httplog
<span class="token comment">###################### acl setting ###############################</span>
  acl mobile_domain hdr_dom<span class="token punctuation">(</span>host<span class="token punctuation">)</span>   <span class="token parameter variable">-i</span> mobile.magedu.org
<span class="token comment">###################### acl hosts #################################</span>
  default_backend pc_hosts 
<span class="token comment">################### backend hosts #################################</span>
backend mobile_hosts
  mode http
  server web1 <span class="token number">10.0</span>.0.17:80 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>

backend pc_hosts
  mode http
  <span class="token comment">#http-request  set-header  X-forwarded-Port   %[dst_port] 也可加在此处</span>
  <span class="token comment">#http-request  add-header  X-forwarded-Proto  https if { ssl_fc } </span>
  server web2 <span class="token number">10.0</span>.0.27:80 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>

<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#ss -ntl</span>
State      Recv-Q Send-Q          Local Address:Port   Peer Address:Port              
LISTEN     <span class="token number">0</span>      <span class="token number">100</span>                 <span class="token number">127.0</span>.0.1:25                 *:*                  
LISTEN     <span class="token number">0</span>      <span class="token number">128</span>                  <span class="token number">10.0</span>.0.7:443                *:*                  
LISTEN     <span class="token number">0</span>      <span class="token number">128</span>                         *:9999               *:*                  
LISTEN     <span class="token number">0</span>      <span class="token number">128</span>                  <span class="token number">10.0</span>.0.7:80                 *:*                  
LISTEN     <span class="token number">0</span>      <span class="token number">128</span>                         *:22                 *:*                  
LISTEN     <span class="token number">0</span>      <span class="token number">128</span>                      <span class="token punctuation">[</span>::<span class="token punctuation">]</span>:22                 <span class="token punctuation">[</span>::<span class="token punctuation">]</span>:*   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>global
    maxconn <span class="token number">100000</span>
    <span class="token function">chroot</span> /var/lib/haproxy
    stats socket /var/lib/haproxy/haproxy.sock mode <span class="token number">600</span> level admin
    <span class="token comment">#uid 99</span>
    <span class="token comment">#gid 99</span>
    user  haproxy
    group haproxy
    daemon
    <span class="token comment">#nbproc 4</span>
    <span class="token comment">#cpu-map 1 0</span>
    <span class="token comment">#cpu-map 2 1</span>
    <span class="token comment">#cpu-map 3 2</span>
    <span class="token comment">#cpu-map 4 3</span>
    pidfile /var/lib/haproxy/haproxy.pid
    log <span class="token number">127.0</span>.0.1 local2 info

defaults
    option http-keep-alive
    maxconn <span class="token number">100000</span>
    option  forwardfor
    mode http
    <span class="token function">timeout</span> connect 300000ms
    <span class="token function">timeout</span> client  300000ms
    <span class="token function">timeout</span> server  300000ms

listen stats
    mode http
    <span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:9999
    stats <span class="token builtin class-name">enable</span>
    log global
    stats uri     /haproxy-status
    stats auth    haadmin:123456


listen http_80
    mode http
    <span class="token builtin class-name">bind</span> <span class="token number">10.1</span>.0.6:30013
    <span class="token builtin class-name">bind</span> <span class="token number">10.1</span>.0.6:443 ssl crt /etc/haproxy/certs/haproxy.pem
    redirect scheme https <span class="token keyword">if</span> <span class="token operator">!</span><span class="token punctuation">{</span> ssl_fc <span class="token punctuation">}</span>
    http-request set-header X-forwarded-Port %<span class="token punctuation">[</span>dst_port<span class="token punctuation">]</span>
    http-request add-header X-forwarded-Proto https <span class="token keyword">if</span> <span class="token punctuation">{</span> ssl_fc <span class="token punctuation">}</span>
    balance roundrobin
    log global
    option  forwardfor

    server web1 <span class="token number">10.1</span>.0.31:30013 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
    server web2 <span class="token number">10.1</span>.0.32:30013 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/1676360033704-f88d33b8-5094-44d7-af63-0e04b1a88ae1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</div></template>


