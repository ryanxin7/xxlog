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
</div></template>


