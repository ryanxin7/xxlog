<template><div><p>Apache Dubbo 最初在 2008 年由 Alibaba 捐献开源，很快成为了国内开源服务框架选型的事实标准框架 ，得到了各行各业的广泛应用。在 2017 年，Dubbo 正式捐献到 Apache 软件基金会并成为 Apache 顶级项目 。</p>
<p>Apache Dubbo 是一款 RPC 服务开发框架，用于解决微服务架构下的服务治理与通信问题，官方提供了 Java、Golang 等多语言 SDK 实现。使用 Dubbo 开发的微服务原生具备相互之间的远程地址发现与通信能力， 利用 Dubbo 提供的丰富服务治理特性，可以实现诸如服务发现、负载均衡、流量调度等服务治理诉求。Dubbo 被设计为高度可扩展，用户可以方便的实现流量拦截、选址的各种定制逻辑。</p>
<p><strong>dubbo 简介</strong></p>
<p>**dubbo 架构 **</p>
<figure><img src="http://cdn1.ryanxin.live/1675737775849-f438cf10-e5c5-4a72-a68f-6206a722476f.png" alt="dubbo 架构" tabindex="0" loading="lazy"><figcaption>dubbo 架构</figcaption></figure>
<p><a name="RXB7W"></a></p>
<h2 id="_1-构建provider镜像" tabindex="-1"><a class="header-anchor" href="#_1-构建provider镜像" aria-hidden="true">#</a> 1.构建Provider镜像<br /><br /></h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#Dubbo provider</span>
FROM harbor.ceamg.com/pub-images/jdk8:3411
MAINTAINER XXXXXXXX
RUN <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /apps/dubbo/provider
ADD dubbo-demo-provider-2.1.5/ /apps/dubbo/provider/
ADD run_java.sh /apps/dubbo/provider/bin/
RUN <span class="token function">useradd</span> nginx <span class="token parameter variable">-u</span> <span class="token number">2023</span>
RUN <span class="token function">chown</span> <span class="token parameter variable">-R</span> nginx.nginx /apps/ <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x /apps/dubbo/provider/bin/*.sh

CMD <span class="token punctuation">[</span><span class="token string">"/apps/dubbo/provider/bin/run_java.sh"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>dubbo-demo-consumer-2.1.5是dubbo consumer的代码，也需要修改下配置，指定zookeeper的地址：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token comment">##</span>
<span class="token comment"># Copyright 1999-2011 Alibaba Group.</span>
<span class="token comment">#  </span>
<span class="token comment"># Licensed under the Apache License, Version 2.0 (the "License");</span>
<span class="token comment"># you may not use this file except in compliance with the License.</span>
<span class="token comment"># You may obtain a copy of the License at</span>
<span class="token comment">#  </span>
<span class="token comment">#      http://www.apache.org/licenses/LICENSE-2.0</span>
<span class="token comment">#  </span>
<span class="token comment"># Unless required by applicable law or agreed to in writing, software</span>
<span class="token comment"># distributed under the License is distributed on an "AS IS" BASIS,</span>
<span class="token comment"># WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</span>
<span class="token comment"># See the License for the specific language governing permissions and</span>
<span class="token comment"># limitations under the License.</span>
<span class="token comment">##</span>
dubbo.container=log4j<span class="token punctuation">,</span>spring
dubbo.application.name=demo<span class="token punctuation">-</span>provider
dubbo.application.owner=
dubbo.registry.address=zookeeper<span class="token punctuation">:</span>//zookeeper1.xin<span class="token punctuation">-</span>zk.svc.ceamg.local<span class="token punctuation">:</span>2181 <span class="token punctuation">|</span> zookeeper<span class="token punctuation">:</span>//zookeeper2.xin<span class="token punctuation">-</span>zk.svc.ceamg.local<span class="token punctuation">:</span>2181 <span class="token punctuation">|</span> zookeeper<span class="token punctuation">:</span>//zookeeper3.xin<span class="token punctuation">-</span>zk.svc.ceamg.local<span class="token punctuation">:</span><span class="token number">2181</span>
<span class="token comment">#dubbo.registry.address=zookeeper://127.0.0.1:2181</span>
<span class="token comment">#dubbo.registry.address=redis://127.0.0.1:6379</span>
<span class="token comment">#dubbo.registry.address=dubbo://127.0.0.1:9090</span>
dubbo.monitor.protocol=registry
dubbo.protocol.name=dubbo
dubbo.protocol.port=20880
dubbo.log4j.file=logs/dubbo<span class="token punctuation">-</span>demo<span class="token punctuation">-</span>provider.log
dubbo.log4j.level=WARN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><br />zk集群测试连通性</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>
<span class="token punctuation">---</span> zookeeper1.xin<span class="token punctuation">-</span>zk.svc.ceamg.local<span class="token punctuation">:</span>2181 ping statistics <span class="token punctuation">---</span>
2 packets transmitted<span class="token punctuation">,</span> 2 packets received<span class="token punctuation">,</span> 0% packet loss
round<span class="token punctuation">-</span>trip min/avg/max = 0.076/0.097/0.118 ms
bash<span class="token punctuation">-</span><span class="token number">4.3</span><span class="token comment"># ping zookeeper2.xin-zk.svc.ceamg.local:2181</span>
<span class="token key atrule">PING zookeeper2.xin-zk.svc.ceamg.local:2181 (10.10.101.183)</span><span class="token punctuation">:</span> 56 data bytes
<span class="token key atrule">64 bytes from 10.10.101.183</span><span class="token punctuation">:</span> seq=0 ttl=64 time=0.059 ms
<span class="token key atrule">64 bytes from 10.10.101.183</span><span class="token punctuation">:</span> seq=1 ttl=64 time=0.134 ms
^C
<span class="token punctuation">---</span> zookeeper2.xin<span class="token punctuation">-</span>zk.svc.ceamg.local<span class="token punctuation">:</span>2181 ping statistics <span class="token punctuation">---</span>
2 packets transmitted<span class="token punctuation">,</span> 2 packets received<span class="token punctuation">,</span> 0% packet loss
round<span class="token punctuation">-</span>trip min/avg/max = 0.059/0.096/0.134 ms
bash<span class="token punctuation">-</span><span class="token number">4.3</span><span class="token comment"># ping zookeeper3.xin-zk.svc.ceamg.local:2181</span>
<span class="token key atrule">PING zookeeper3.xin-zk.svc.ceamg.local:2181 (10.10.176.183)</span><span class="token punctuation">:</span> 56 data bytes
<span class="token key atrule">64 bytes from 10.10.176.183</span><span class="token punctuation">:</span> seq=0 ttl=64 time=0.049 ms
<span class="token key atrule">64 bytes from 10.10.176.183</span><span class="token punctuation">:</span> seq=1 ttl=64 time=0.151 ms

<span class="token punctuation">---</span> zookeeper3.xin<span class="token punctuation">-</span>zk.svc.ceamg.local<span class="token punctuation">:</span>2181 ping statistics <span class="token punctuation">---</span>
2 packets transmitted<span class="token punctuation">,</span> 2 packets received<span class="token punctuation">,</span> 0% packet loss
round<span class="token punctuation">-</span>trip min/avg/max = 0.049/0.100/0.151 ms
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>run_java.sh内容如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token function">su</span> - nginx <span class="token parameter variable">-c</span> <span class="token string">"/apps/dubbo/provider/bin/start.sh"</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">TAG</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token function">docker</span>  build <span class="token parameter variable">-t</span> harbor.ceamg.com/pub-images/dubbo-provider:<span class="token variable">${TAG}</span> <span class="token builtin class-name">.</span>
<span class="token function">docker</span> push harbor.ceamg.com/pub-images/dubbo-provider:<span class="token variable">${TAG}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@harbor01<span class="token punctuation">[</span><span class="token number">21</span>:28:43<span class="token punctuation">]</span>~/dubbo/dubbo-demo-consumer-2.1.5/conf <span class="token comment">#:chmod +x ./*.sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行构建，上传镜像</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@harbor01<span class="token punctuation">[</span><span class="token number">21</span>:37:19<span class="token punctuation">]</span>~/dubbo/provider <span class="token comment">#:bash build_image_command.sh v1</span>
Sending build context to Docker daemon  <span class="token number">11</span>.56MB
Step <span class="token number">1</span>/8 <span class="token builtin class-name">:</span> FROM harbor.ceamg.com/pub-images/jdk8:3411
 ---<span class="token operator">></span> 1328b4d79a67
Step <span class="token number">2</span>/8 <span class="token builtin class-name">:</span> MAINTAINER XXXXXXXX
 ---<span class="token operator">></span> Using cache
 ---<span class="token operator">></span> d68f684b20d3
Step <span class="token number">3</span>/8 <span class="token builtin class-name">:</span> RUN <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /apps/dubbo/provider
 ---<span class="token operator">></span> Using cache
 ---<span class="token operator">></span> 1eee7aae68c2
Step <span class="token number">4</span>/8 <span class="token builtin class-name">:</span> ADD dubbo-demo-provider-2.1.5/ /apps/dubbo/provider/
 ---<span class="token operator">></span> Using cache
 ---<span class="token operator">></span> 7d305495d592
Step <span class="token number">5</span>/8 <span class="token builtin class-name">:</span> ADD run_java.sh /apps/dubbo/provider/bin/
 ---<span class="token operator">></span> 93a53e745acc
Step <span class="token number">6</span>/8 <span class="token builtin class-name">:</span> RUN <span class="token function">useradd</span> nginx <span class="token parameter variable">-u</span> <span class="token number">2023</span>
 ---<span class="token operator">></span> Running <span class="token keyword">in</span> 6ce3cb1b6065
Removing intermediate container 6ce3cb1b6065
 ---<span class="token operator">></span> 5f0402802b5c
Step <span class="token number">7</span>/8 <span class="token builtin class-name">:</span> RUN <span class="token function">chown</span> <span class="token parameter variable">-R</span> nginx.nginx /apps/ <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x /apps/dubbo/provider/bin/*.sh
 ---<span class="token operator">></span> Running <span class="token keyword">in</span> 5e52acec648e
Removing intermediate container 5e52acec648e
 ---<span class="token operator">></span> 464dd347a8e2
Step <span class="token number">8</span>/8 <span class="token builtin class-name">:</span> CMD <span class="token punctuation">[</span><span class="token string">"/apps/dubbo/provider/bin/run_java.sh"</span><span class="token punctuation">]</span>
 ---<span class="token operator">></span> Running <span class="token keyword">in</span> 3ae6dd4ef0d7
Removing intermediate container 3ae6dd4ef0d7
 ---<span class="token operator">></span> c79f2c1a9fd3
Successfully built c79f2c1a9fd3
Successfully tagged harbor.ceamg.com/pub-images/dubbo-provider:v1
The push refers to repository <span class="token punctuation">[</span>harbor.ceamg.com/pub-images/dubbo-provider<span class="token punctuation">]</span>
78a2523488ca: Pushed 
aff40275a217: Pushed 
66f589639a2b: Pushed 
b7202c657fb7: Mounted from pub-images/dubbo-consumer 
6ee4ed148d1c: Mounted from pub-images/dubbo-consumer 
3ad8c5bef187: Mounted from pub-images/dubbo-consumer 
f4442a8d89b4: Mounted from pub-images/dubbo-consumer 
c185ef053da5: Mounted from pub-images/dubbo-consumer 
0002c93bdb37: Mounted from pub-images/dubbo-consumer 
v1: digest: sha256:27dc6e2e303f3d1eca2f330cedcb94669dbe78d31d4f2b25987f59a3177c393a size: <span class="token number">2202</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@harbor01<span class="token punctuation">[</span><span class="token number">21</span>:41:25<span class="token punctuation">]</span>~/dubbo/consumer <span class="token comment">#:bash build_image_command.sh v1</span>
Sending build context to Docker daemon  <span class="token number">11</span>.56MB
Step <span class="token number">1</span>/8 <span class="token builtin class-name">:</span> FROM harbor.ceamg.com/pub-images/jdk8:3411
 ---<span class="token operator">></span> 1328b4d79a67
Step <span class="token number">2</span>/8 <span class="token builtin class-name">:</span> MAINTAINER XXXXXXXX
 ---<span class="token operator">></span> Using cache
 ---<span class="token operator">></span> d68f684b20d3
Step <span class="token number">3</span>/8 <span class="token builtin class-name">:</span> RUN <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /apps/dubbo/consumer
 ---<span class="token operator">></span> Running <span class="token keyword">in</span> ae689963be67
Removing intermediate container ae689963be67
 ---<span class="token operator">></span> fd9b9c30a5c5
Step <span class="token number">4</span>/8 <span class="token builtin class-name">:</span> ADD dubbo-demo-consumer-2.1.5/ /apps/dubbo/consumer/
 ---<span class="token operator">></span> da8c837a310c
Step <span class="token number">5</span>/8 <span class="token builtin class-name">:</span> ADD run_java.sh /apps/dubbo/consumer/bin/
 ---<span class="token operator">></span> 6eab14874e6e
Step <span class="token number">6</span>/8 <span class="token builtin class-name">:</span> RUN <span class="token function">useradd</span> nginx <span class="token parameter variable">-u</span> <span class="token number">2023</span>
 ---<span class="token operator">></span> Running <span class="token keyword">in</span> 8b0ecedc3298
Removing intermediate container 8b0ecedc3298
 ---<span class="token operator">></span> c6c031c2ad4d
Step <span class="token number">7</span>/8 <span class="token builtin class-name">:</span> RUN <span class="token function">chown</span> <span class="token parameter variable">-R</span> nginx.nginx /apps/ <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x /apps/dubbo/consumer/bin/*.sh
 ---<span class="token operator">></span> Running <span class="token keyword">in</span> 1adf89e8a909
Removing intermediate container 1adf89e8a909
 ---<span class="token operator">></span> 0098b88d6f9d
Step <span class="token number">8</span>/8 <span class="token builtin class-name">:</span> CMD <span class="token punctuation">[</span><span class="token string">"/apps/dubbo/consumer/bin/run_java.sh"</span><span class="token punctuation">]</span>
 ---<span class="token operator">></span> Running <span class="token keyword">in</span> 315c79bd237b
Removing intermediate container 315c79bd237b
 ---<span class="token operator">></span> b2c7e5669a85
Successfully built b2c7e5669a85
Successfully tagged harbor.ceamg.com/pub-images/dubbo-consumer:v1
The push refers to repository <span class="token punctuation">[</span>harbor.ceamg.com/pub-images/dubbo-consumer<span class="token punctuation">]</span>
d0363e8f5978: Pushed 
142934daf2de: Pushed 
30b2759bc06d: Pushed 
449c2b429c70: Pushed 
ed197bc00295: Pushed 
3ad8c5bef187: Layer already exists 
f4442a8d89b4: Layer already exists 
c185ef053da5: Layer already exists 
0002c93bdb37: Layer already exists 
v1: digest: sha256:cbae406a2442c8682f23106383bdd8a681697336c7d896504d1ab21c42628a17 size: <span class="token number">2202</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部署应用</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>provider
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>xin
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>provider
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>provider
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>provider
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/pub<span class="token punctuation">-</span>images/dubbo<span class="token punctuation">-</span>provider<span class="token punctuation">:</span>v1
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
          <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">20880</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>svc
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>xin
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>provider
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">20880</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">20880</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>consumer
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>xin
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>consumer
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>consumer
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>consumer
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/pub<span class="token punctuation">-</span>images/dubbo<span class="token punctuation">-</span>consumer<span class="token punctuation">:</span>v1
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
          <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>svc
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>xin
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> dubbo<span class="token punctuation">-</span>consumer
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>root@master01<span class="token punctuation">[</span><span class="token datetime number">21:46:40</span><span class="token punctuation">]</span>~/dubbo<span class="token punctuation">-</span>yaml <span class="token comment">#:kubectl apply -f dubbo-provider.yaml </span>
deployment.apps/dubbo<span class="token punctuation">-</span>provider created
service/dubbo<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>svc created
root@master01<span class="token punctuation">[</span><span class="token datetime number">21:46:46</span><span class="token punctuation">]</span>~/dubbo<span class="token punctuation">-</span>yaml <span class="token comment">#:kubectl apply -f dubbo-consumer.yaml </span>
deployment.apps/dubbo<span class="token punctuation">-</span>consumer created
service/dubbo<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>svc created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看pod svc状态</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>root@master01<span class="token punctuation">[</span><span class="token datetime number">21:50:12</span><span class="token punctuation">]</span>~/dubbo<span class="token punctuation">-</span>yaml <span class="token comment">#:kubectl create namespace dubbo-xin</span>
namespace/dubbo<span class="token punctuation">-</span>xin created


root@master01<span class="token punctuation">[</span><span class="token datetime number">21:50:52</span><span class="token punctuation">]</span>~/dubbo<span class="token punctuation">-</span>yaml <span class="token comment">#:kubectl get pod -n dubbo-xin</span>
NAME                              READY   STATUS    RESTARTS   AGE
dubbo<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>5dff546c9c<span class="token punctuation">-</span>74qr5   1/1     Running   0          7s
dubbo<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>5dff546c9c<span class="token punctuation">-</span>plpx7   1/1     Running   0          7s
dubbo<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>768546b6b4<span class="token punctuation">-</span>7r94p   1/1     Running   0          13s
dubbo<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>768546b6b4<span class="token punctuation">-</span>nb46c   1/1     Running   0          13s

root@master01<span class="token punctuation">[</span><span class="token datetime number">21:50:59</span><span class="token punctuation">]</span>~/dubbo<span class="token punctuation">-</span>yaml <span class="token comment">#:kubectl get svc -n dubbo-xin</span>
NAME                 TYPE       CLUSTER<span class="token punctuation">-</span>IP      EXTERNAL<span class="token punctuation">-</span>IP   PORT(S)           AGE
dubbo<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>svc   NodePort   10.10.242.171   &lt;none<span class="token punctuation">></span>        80<span class="token punctuation">:</span>51934/TCP      18s
dubbo<span class="token punctuation">-</span>provider<span class="token punctuation">-</span>svc   NodePort   10.10.1.12      &lt;none<span class="token punctuation">></span>        20880<span class="token punctuation">:</span>41214/TCP   24s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试consumer</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>root@master01<span class="token punctuation">[</span><span class="token datetime number">21:54:17</span><span class="token punctuation">]</span>~/dubbo<span class="token punctuation">-</span>yaml <span class="token comment">#:kubectl exec -it dubbo-consumer-5dff546c9c-74qr5 -n dubbo-xin -- bash</span>
root@dubbo<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>5dff546c9c<span class="token punctuation">-</span>74qr5<span class="token punctuation">:</span>/<span class="token comment"># cd /apps/dubbo/consumer/logs/</span>
root@dubbo<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>5dff546c9c<span class="token punctuation">-</span>74qr5<span class="token punctuation">:</span>/apps/dubbo/consumer/logs<span class="token comment"># ls</span>
dubbo<span class="token punctuation">-</span>demo<span class="token punctuation">-</span>consumer.log  stdout.log
root@dubbo<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>5dff546c9c<span class="token punctuation">-</span>74qr5<span class="token punctuation">:</span>/apps/dubbo/consumer/logs<span class="token comment"># tail -f -n 10 stdout.log </span>
<span class="token punctuation">[</span><span class="token datetime number">13:54:28</span><span class="token punctuation">]</span> Hello world106<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:54:30</span><span class="token punctuation">]</span> Hello world107<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:54:32</span><span class="token punctuation">]</span> Hello world108<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:54:34</span><span class="token punctuation">]</span> Hello world109<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:54:36</span><span class="token punctuation">]</span> Hello world110<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:54:38</span><span class="token punctuation">]</span> Hello world111<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:54:40</span><span class="token punctuation">]</span> Hello world112<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:54:42</span><span class="token punctuation">]</span> Hello world113<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:54:44</span><span class="token punctuation">]</span> Hello world114<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:54:46</span><span class="token punctuation">]</span> Hello world115<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:54:48</span><span class="token punctuation">]</span> Hello world116<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:54:50</span><span class="token punctuation">]</span> Hello world117<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>扩容两个dubbo provider，验证dubbo consumer能否获取到新的provider地址并访问</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">21</span>:56:43<span class="token punctuation">]</span>~ <span class="token comment">#:kubectl scale deployment dubbo-provider -n dubbo-xin --replicas=3                </span>
deployment.apps/dubbo-provider scaled                                                                       
root@master01<span class="token punctuation">[</span><span class="token number">21</span>:56:53<span class="token punctuation">]</span>~ <span class="token comment">#:kubectl scale deployment dubbo-provider -n dubbo-xin --replicas=5                </span>
deployment.apps/dubbo-provider scaled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">21</span>:58:13<span class="token punctuation">]</span>~/dubbo-yaml <span class="token comment">#:kubectl get pod -n dubbo-xin</span>
NAME                              READY   STATUS    RESTARTS   AGE
dubbo-consumer-5dff546c9c-74qr5   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          7m31s
dubbo-consumer-5dff546c9c-plpx7   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          7m31s
dubbo-provider-768546b6b4-7mw8w   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          75s
dubbo-provider-768546b6b4-7r94p   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          7m37s
dubbo-provider-768546b6b4-jq29n   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          90s
dubbo-provider-768546b6b4-nb46c   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          7m37s
dubbo-provider-768546b6b4-rh9fl   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          75s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看日志可以访问到新的provider</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>root@dubbo<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>5dff546c9c<span class="token punctuation">-</span>74qr5<span class="token punctuation">:</span>/apps/dubbo/consumer/logs<span class="token comment"># tail -f -n 10 stdout.log </span>
<span class="token punctuation">[</span><span class="token datetime number">13:55:43</span><span class="token punctuation">]</span> Hello world143<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:55:45</span><span class="token punctuation">]</span> Hello world144<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:55:47</span><span class="token punctuation">]</span> Hello world145<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:55:49</span><span class="token punctuation">]</span> Hello world146<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:55:51</span><span class="token punctuation">]</span> Hello world147<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:55:53</span><span class="token punctuation">]</span> Hello world148<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:55:55</span><span class="token punctuation">]</span> Hello world149<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:55:57</span><span class="token punctuation">]</span> Hello world150<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:55:59</span><span class="token punctuation">]</span> Hello world151<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:01</span><span class="token punctuation">]</span> Hello world152<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:03</span><span class="token punctuation">]</span> Hello world153<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:05</span><span class="token punctuation">]</span> Hello world154<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:07</span><span class="token punctuation">]</span> Hello world155<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:09</span><span class="token punctuation">]</span> Hello world156<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:11</span><span class="token punctuation">]</span> Hello world157<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:13</span><span class="token punctuation">]</span> Hello world158<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:15</span><span class="token punctuation">]</span> Hello world159<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:17</span><span class="token punctuation">]</span> Hello world160<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:19</span><span class="token punctuation">]</span> Hello world161<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:21</span><span class="token punctuation">]</span> Hello world162<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:23</span><span class="token punctuation">]</span> Hello world163<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:25</span><span class="token punctuation">]</span> Hello world164<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:27</span><span class="token punctuation">]</span> Hello world165<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:29</span><span class="token punctuation">]</span> Hello world166<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:31</span><span class="token punctuation">]</span> Hello world167<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:33</span><span class="token punctuation">]</span> Hello world168<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:35</span><span class="token punctuation">]</span> Hello world169<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:37</span><span class="token punctuation">]</span> Hello world170<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:39</span><span class="token punctuation">]</span> Hello world171<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:41</span><span class="token punctuation">]</span> Hello world172<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:43</span><span class="token punctuation">]</span> Hello world173<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:45</span><span class="token punctuation">]</span> Hello world174<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:47</span><span class="token punctuation">]</span> Hello world175<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:49</span><span class="token punctuation">]</span> Hello world176<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:51</span><span class="token punctuation">]</span> Hello world177<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:53</span><span class="token punctuation">]</span> Hello world178<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:55</span><span class="token punctuation">]</span> Hello world179<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:57</span><span class="token punctuation">]</span> Hello world180<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:56:59</span><span class="token punctuation">]</span> Hello world181<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.156<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:01</span><span class="token punctuation">]</span> Hello world182<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:03</span><span class="token punctuation">]</span> Hello world183<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:05</span><span class="token punctuation">]</span> Hello world184<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.156<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:07</span><span class="token punctuation">]</span> Hello world185<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:09</span><span class="token punctuation">]</span> Hello world186<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:11</span><span class="token punctuation">]</span> Hello world187<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.156<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:13</span><span class="token punctuation">]</span> Hello world188<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.30<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:15</span><span class="token punctuation">]</span> Hello world189<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:17</span><span class="token punctuation">]</span> Hello world190<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.131<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:19</span><span class="token punctuation">]</span> Hello world191<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:21</span><span class="token punctuation">]</span> Hello world192<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.156<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:23</span><span class="token punctuation">]</span> Hello world193<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.30<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:25</span><span class="token punctuation">]</span> Hello world194<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:27</span><span class="token punctuation">]</span> Hello world195<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.131<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:29</span><span class="token punctuation">]</span> Hello world196<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:31</span><span class="token punctuation">]</span> Hello world197<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.156<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:33</span><span class="token punctuation">]</span> Hello world198<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.30<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:35</span><span class="token punctuation">]</span> Hello world199<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.5.3<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:37</span><span class="token punctuation">]</span> Hello world200<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.131<span class="token punctuation">:</span><span class="token number">20880</span>
<span class="token punctuation">[</span><span class="token datetime number">13:57:39</span><span class="token punctuation">]</span> Hello world201<span class="token punctuation">,</span> <span class="token key atrule">response form provider</span><span class="token punctuation">:</span> 10.20.30.147<span class="token punctuation">:</span><span class="token number">20880</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


