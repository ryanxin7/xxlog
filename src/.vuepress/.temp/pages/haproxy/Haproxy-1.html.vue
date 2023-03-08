<template><div><h2 id="三、haproxy安装及基础配置" tabindex="-1"><a class="header-anchor" href="#三、haproxy安装及基础配置" aria-hidden="true">#</a> 三、HAProxy安装及基础配置</h2>
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
</div></template>


