<template><div><p><strong>Ceph dashboard</strong>是通过一个 web界面，对已经运行的ceph集群进行状态查看及功能配置等功能，早期ceph使用的是第三方的dashboard组件，如:</p>
<p>**Calamari: **<br /><strong>Calamari</strong> 对外提供了十分漂亮的Web管理和监控界面，以及一套改进的REST API接口(不同于Ceph自身的REST API)，在一定程度上简化了Ceph的管理，最初Calamari是作为 Inktank公司的Ceph企业级商业产品来销售，红帽2015年收购Inktank 后为了更好地推动Ceph的发展，对外宣布Calamari 开源<br /><a href="https://github.com/ceph/calamari" target="_blank" rel="noopener noreferrer">https://github.com/ceph/calamari<ExternalLinkIcon/></a><br /><strong>优点:</strong></p>
<ul>
<li>管理功能好</li>
<li>界面友好</li>
<li>可以利用它来部署Ceph和监控Ceph</li>
</ul>
<p><strong>缺点:</strong></p>
<ul>
<li>非官方</li>
<li>依赖OpenStack某些包</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph-deploy <span class="token parameter variable">-h</span>
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
calamari
                         Install and configure Calamari nodes. Assumes that a
                         repository with Calamari packages is already
                         configured. Refer to the docs <span class="token keyword">for</span> examples
                         <span class="token punctuation">(</span>http://ceph.com/ceph-deploy/docs/conf.html<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>VSM:</strong><br /><strong>Virtual Storage Manager</strong> (VSM)是Intel公司研发并且开源的一款Ceph集群管理和监控软件，简化了一些Ceph集群部署的一些步骤， 可以简单的通过 WEB页面来操作.<br /><a href="https://github.com/intel/virtual-storage-manager" target="_blank" rel="noopener noreferrer">https://github.com/intel/virtual-storage-manager<ExternalLinkIcon/></a></p>
<p><strong>优点:</strong></p>
<ul>
<li>易部署</li>
<li>轻量级</li>
<li>灵活(可以自定义开发功能)</li>
</ul>
<p><strong>缺点:</strong></p>
<ul>
<li>监控选项少</li>
<li>缺乏Ceph管理功能</li>
</ul>
<p><strong>Inkscope:</strong><br />Inkscope是一个Ceph的管理和监控系统，依赖于Ceph提供的API,使用MongoDB来存储实时的监控数据和历史信息。<br /><a href="https://github.com/inkscope/inkscope" target="_blank" rel="noopener noreferrer">https://github.com/inkscope/inkscope<ExternalLinkIcon/></a><br /><strong>优点:</strong></p>
<ul>
<li>易部署</li>
<li>轻量级</li>
<li>灵活(可以自定义开发功能)</li>
</ul>
<p><strong>缺点:</strong></p>
<ul>
<li>监控选项少</li>
<li>缺乏Ceph管理功能</li>
</ul>
<p><strong>Ceph-Dash:</strong></p>
<p>Ceph-Dash是用 Python 开发的一一个Ceph的监控面板，用来监控Ceph的运行状态。<br />同时提供REST API来访问状态数据。<br /><a href="http://cephdash.crapworks.de/" target="_blank" rel="noopener noreferrer">http://cephdash.crapworks.de/<ExternalLinkIcon/></a></p>
<p><strong>优点:</strong></p>
<ul>
<li>易部署</li>
<li>轻量级</li>
<li>灵活(可以自定义开发功能)</li>
</ul>
<p><strong>缺点:</strong></p>
<ul>
<li>功能相对简单</li>
</ul>
<h2 id="_10-1-启用dashboard插件" tabindex="-1"><a class="header-anchor" href="#_10-1-启用dashboard插件" aria-hidden="true">#</a> 10.1 启用dashboard插件</h2>
<p><a href="https://docs.ceph.com/en/mimic/mgr/" target="_blank" rel="noopener noreferrer">https://docs.ceph.com/en/mimic/mgr/<ExternalLinkIcon/></a><br /><a href="https://docs.ceph.com/en/latest/mgr/dashboard/" target="_blank" rel="noopener noreferrer">https://docs.ceph.com/en/latest/mgr/dashboard/<ExternalLinkIcon/></a><br /><a href="https://packages.debian.org/unstable/ceph-mgr-dashboard" target="_blank" rel="noopener noreferrer">https://packages.debian.org/unstable/ceph-mgr-dashboard<ExternalLinkIcon/></a> #15 版本有依赖需要单独解决<br />Ceph mgr 是一个多插件(模块化)的组件，其组件可以单独的启用或关闭,以下为在<br />ceph-deploy服务器操作:<br />新版本需要安装 dashboard 包，而且必须安装在mgr节点，否则报错如下:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>The following packages have unmet dependencies:
ceph-mgr-dashboard <span class="token builtin class-name">:</span> Depends: ceph-mgr <span class="token punctuation">(</span><span class="token operator">=</span> <span class="token number">15.2</span>.13-1-bpo10+1<span class="token punctuation">)</span> but it is not going to
be installed
E: Unable to correct problems, you have held broken packages.

root@ceph-mgr1:~<span class="token comment"># apt-cache madison ceph-mgr-dashboard</span>
root@ceph-mgr1:~<span class="token comment"># apt install ceph-mgr-dashboard</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph mgr module <span class="token parameter variable">-h</span> <span class="token comment">#查看帮助</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token operator">|</span>$ ceph mgr module <span class="token function">ls</span> <span class="token comment">#列出所有模块状态</span>
<span class="token punctuation">{</span>
    <span class="token string">"enabled_modules"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token comment">#已开启的模块</span>
        <span class="token string">"balancer"</span>,
        <span class="token string">"crash"</span>,
        <span class="token string">"iostat"</span>,
        <span class="token string">"restful"</span>,
        <span class="token string">"status"</span>
<span class="token punctuation">]</span>,
<span class="token string">"disabled_modules"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token comment">#已关闭的模块</span>
    <span class="token punctuation">{</span>
         <span class="token string">"name"</span><span class="token builtin class-name">:</span> <span class="token string">"dashboard"</span>，
         <span class="token string">"can_ run"</span><span class="token builtin class-name">:</span> true, <span class="token comment">#是否可以启用</span>
         <span class="token string">"error string"</span><span class="token builtin class-name">:</span> <span class="token string">""</span>
    <span class="token punctuation">}</span>,
<span class="token punctuation">{</span>
         <span class="token string">"name"</span><span class="token builtin class-name">:</span> <span class="token string">"hello"</span>,
         <span class="token string">"can_run"</span><span class="token builtin class-name">:</span> true,
         <span class="token string">"error_string"</span><span class="token builtin class-name">:</span><span class="token string">""</span>
<span class="token punctuation">}</span>,
------
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph mgr module <span class="token builtin class-name">enable</span> dashboard <span class="token comment">#启用模块</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注:模块启用后还不能直接访问，需要配置关闭SSL或启用SSL及指定监听地址.</p>
<h3 id="_10-1-2-启用dashboard模块" tabindex="-1"><a class="header-anchor" href="#_10-1-2-启用dashboard模块" aria-hidden="true">#</a> 10.1.2 启用dashboard模块</h3>
<p>Ceph dashboard在mgr节点进行开启设置，并且可以配置开启或者关闭SSL，如下:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph config <span class="token builtin class-name">set</span> mgr mgr/dashboard/ssl <span class="token boolean">false</span> <span class="token comment">#关闭mgr SSL</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-clusterl$ ceph config <span class="token builtin class-name">set</span> mgr mgr/dashboard/ceph-mgr1/server_addr <span class="token number">172.31</span>.6.107 <span class="token comment">#指定dashboard监听地址</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph config <span class="token builtin class-name">set</span> mgr mgr/dashboard/ceph-mgr1/server_port <span class="token number">9009</span> <span class="token comment">#指定dashboard监听端口</span>


<span class="token comment">#验证ceph集群状态:</span>
<span class="token punctuation">(</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph <span class="token parameter variable">-s</span>
cluster:
  id: 23b0f9f2-8db3-477f-99a7-35a90eaf3dab
  health: HEALTH_ OK

services: 
  mon: <span class="token number">3</span> daemons, quorum ceph-mon1 ,ceph-mon2,ceph-mon3
  mgr: ceph-mgr1<span class="token punctuation">(</span>active<span class="token punctuation">)</span>, standbys: ceph-mgr2
  mds: mycephfs-2/2/2 up <span class="token punctuation">{</span><span class="token number">0</span><span class="token operator">=</span>ceph-mgr1<span class="token operator">=</span>up:active, <span class="token assign-left variable">1</span><span class="token operator">=</span>ceph-mgr2<span class="token operator">=</span>upactive<span class="token punctuation">}</span>, <span class="token number">1</span>
up:standby
osd: <span class="token number">12</span> osds: <span class="token number">12</span> up, <span class="token number">12</span> <span class="token keyword">in</span>


如果有以下报错:
Module <span class="token string">'dashboard'</span> has failed: error<span class="token punctuation">(</span>"No socket could be created'，<span class="token punctuation">)</span>

需要检查mgr服务是否正常运行，可以重启一遍mgr服务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-1-3-在mgr节点验证端口与进程" tabindex="-1"><a class="header-anchor" href="#_10-1-3-在mgr节点验证端口与进程" aria-hidden="true">#</a> 10.1.3 在mgr节点验证端口与进程</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-mgr1 ~<span class="token punctuation">]</span><span class="token comment"># lsof -i:9009</span>
COMMAND  PID <span class="token environment constant">USER</span>  FD  TYPE DEVICE SIZE/OFF NODE NAME
ceph-mgr <span class="token number">2338</span> ceph  28u  IPv4 <span class="token number">23986</span> OtO TCP *:pichat <span class="token punctuation">(</span>LISTEN<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-1-4-dashboard访问验证" tabindex="-1"><a class="header-anchor" href="#_10-1-4-dashboard访问验证" aria-hidden="true">#</a> 10.1.4 dashboard访问验证</h3>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670298209849-75c0928e-eda3-472a-a5be-03c783e04eae.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_10-1-5-设置dashboard账户及密码" tabindex="-1"><a class="header-anchor" href="#_10-1-5-设置dashboard账户及密码" aria-hidden="true">#</a> 10.1.5 设置dashboard账户及密码</h3>
<p>Ubuntu:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph@ceph-deploy:/home/ceph/ceph-clustqr$ <span class="token function">touch</span> pass.txt
ceph@ceph-deploy:/home/ceph/ceph-cluster$ <span class="token builtin class-name">echo</span> <span class="token string">"12345678"</span> <span class="token operator">></span> pass.txt
ceph@ceph-deploy:/home/ceph/ceph-cluster$ ceph dashboard set-login-credentials jack <span class="token parameter variable">-i</span> pass.txt

********************************************************************************
***WARNING: this <span class="token builtin class-name">command</span> is deprecated.
*** Please use the ac-user-* related commands to manage users. ***
********************************************************************************
Username and password updated
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>早期方式：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph dashboard set-login-credentials <span class="token parameter variable">-h</span> <span class="token comment">#命令格式</span>
Monitor commands:
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
Dashboard  set-login-credentials  <span class="token operator">&lt;</span>username<span class="token operator">></span>  <span class="token operator">&lt;</span>password<span class="token operator">></span>
Set the login credentials

<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph dashboard set-login-credentials jack <span class="token number">123456</span>
Username and password updated <span class="token comment">#设置jack用户密码为123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/xxlog/1670298608499-507b64e7-c61e-42ba-a7f2-a9fb99c9ecca.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_10-1-7-dashboard-ssl" tabindex="-1"><a class="header-anchor" href="#_10-1-7-dashboard-ssl" aria-hidden="true">#</a> 10.1.7 dashboard SSL</h3>
<p>如果要使用SSL访问。则需要配置签名证书.证书可以使用ceph命令生成，或是opessl<br />命令生成.<br /><a href="https://docs.ceph.com/en/latest/mgr/dashboard/" target="_blank" rel="noopener noreferrer">https://docs.ceph.com/en/latest/mgr/dashboard/<ExternalLinkIcon/></a></p>
<h4 id="_10-1-7-1-ceph自签名证书" tabindex="-1"><a class="header-anchor" href="#_10-1-7-1-ceph自签名证书" aria-hidden="true">#</a> 10.1.7.1 ceph自签名证书</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#生成证书:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph dashboard create-self-signed-cert
<span class="token comment">#启用SSL:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph config <span class="token builtin class-name">set</span> mgr mgr/dashboard/ssl <span class="token boolean">true</span>

<span class="token comment">#查看当前dashboard状态:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph mgr services
<span class="token punctuation">{</span>
<span class="token string">"dashboard"</span><span class="token builtin class-name">:</span> <span class="token string">"http://172.31.6.107:9009/"</span>
<span class="token punctuation">}</span>


<span class="token comment">#重启mgr服务:</span>
<span class="token punctuation">[</span>root@ceph-mgr1 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart ceph-mgr@ceph-mgr1</span>

<span class="token comment">#再次验证dashboard:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">}</span>$ ceph mgr services
<span class="token punctuation">{</span>
<span class="token string">"dashboard"</span><span class="token builtin class-name">:</span> <span class="token string">"https://172.31.6.107:9009/"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_10-1-7-2-验证证书信息" tabindex="-1"><a class="header-anchor" href="#_10-1-7-2-验证证书信息" aria-hidden="true">#</a> 10.1.7.2 验证证书信息</h4>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670299090931-d92bafa4-9234-4898-a5b5-a29c500c1011.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h4 id="_10-1-7-4-登陆成功" tabindex="-1"><a class="header-anchor" href="#_10-1-7-4-登陆成功" aria-hidden="true">#</a> 10.1.7.4 登陆成功</h4>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670299082608-2c699348-a2d0-41be-97f0-a301f89f318d.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="_10-2-通过prometheus监控ceph-node节点" tabindex="-1"><a class="header-anchor" href="#_10-2-通过prometheus监控ceph-node节点" aria-hidden="true">#</a> 10.2 通过prometheus监控ceph node节点</h2>
<p><a href="https://prometheus.io/" target="_blank" rel="noopener noreferrer">https://prometheus.io/<ExternalLinkIcon/></a></p>
<h3 id="_10-2-1-部署prometheus" tabindex="-1"><a class="header-anchor" href="#_10-2-1-部署prometheus" aria-hidden="true">#</a> 10.2.1 部署prometheus</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-mgr1 ~<span class="token punctuation">]</span><span class="token comment"># mkdir /apps</span>
<span class="token punctuation">[</span>root@ceph-mgr1 ~<span class="token punctuation">]</span><span class="token comment"># cd /apps/</span>
root@ceph-mgr1 apps<span class="token punctuation">]</span><span class="token comment"># tar xvf prometheus-2.27.1.linux-amd64.tar.gz</span>
<span class="token punctuation">[</span>root@ceph-mgr1 apps<span class="token punctuation">]</span><span class="token comment"># ln -sv /apps/prometheus-2.27.1.linux-amd64 /apps/prometheus</span>
<span class="token string">'/apps/prometheus’->'</span> /apps/ prometheus-2.27.1.linux-amd64'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-node1 prometheus<span class="token punctuation">]</span><span class="token comment"># cat /etc/systemd/system/prometheus.service</span>
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Prometheus Server
<span class="token assign-left variable">Documentation</span><span class="token operator">=</span>https://prometheus.io/docs/introduction/overview/
<span class="token assign-left variable">After</span><span class="token operator">=</span>network.target

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Restart</span><span class="token operator">=</span>on-failure
<span class="token assign-left variable">WorkingDirectory</span><span class="token operator">=</span>/apps/prometheus/
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/apps/prometheus/prometheus
<span class="token parameter variable">--config.file</span><span class="token operator">=</span>/apps/prometheus/prometheus.yml

<span class="token punctuation">[</span>Istall<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target


root@ceph-mgr1 apps<span class="token punctuation">]</span><span class="token comment"># systemctl daemon-reload</span>
root@ceph-mgr1 apps<span class="token punctuation">]</span><span class="token comment"># systemctl restart prometheus</span>
root@ceph-mgr1 apps<span class="token punctuation">]</span><span class="token comment"># systemctl enable prometheus</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-2-2-访问prometheus" tabindex="-1"><a class="header-anchor" href="#_10-2-2-访问prometheus" aria-hidden="true">#</a> 10.2.2 访问prometheus</h3>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670299772271-f2be0ada-0aaa-4a20-9d58-30f560dbb4f5.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_10-2-3-部署node-exporter" tabindex="-1"><a class="header-anchor" href="#_10-2-3-部署node-exporter" aria-hidden="true">#</a> 10.2.3 部署node_exporter</h3>
<p>各node节点安装<code v-pre>node_exporter</code></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-node1 ~<span class="token punctuation">]</span><span class="token comment"># mkdir /apps</span>
<span class="token punctuation">[</span>root@ceph-node1 ~<span class="token punctuation">]</span><span class="token comment"># cd /apps/</span>

<span class="token punctuation">[</span>root@ceph-node1 apps<span class="token punctuation">]</span><span class="token comment"># tar xvf node_exporter-1.0.1.inux. amd64.tar.gz</span>
root@ceph-node1 apps<span class="token punctuation">]</span><span class="token comment"># ln -sv /apps/node_exporter-1.0.1.linux -amd64 /apps/node_exporter</span>


rootaceph-node1:/apps<span class="token comment"># scp node_exporter-1.0.1.linux-amd64.tar.gz 172.31.6.107:/apps/</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-node2 apps<span class="token punctuation">]</span><span class="token comment"># cat /etc/systemd/system/node-exporter.service</span>
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Prometheus Node Exporter
After-network.target
<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/apps/node_exporter/node_exporter
<span class="token punctuation">[</span>Instal<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target

root@ceph-node1 apps<span class="token punctuation">]</span><span class="token comment"># systemctl daemon-reload</span>
<span class="token punctuation">[</span>root@ceph-node1 apps<span class="token punctuation">]</span><span class="token comment"># systemctl restart node-exporter</span>
<span class="token punctuation">[</span>root@ceph-node1 apps<span class="token punctuation">]</span><span class="token comment"># svstemctl enable node-exporter</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/xxlog/1670300128904-aefde18a-bda6-4717-9d3d-c8bbc8880d0f.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_10-2-4-配置prometheus-server数据并验证" tabindex="-1"><a class="header-anchor" href="#_10-2-4-配置prometheus-server数据并验证" aria-hidden="true">#</a> 10.2.4 配置prometheus server数据并验证</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /apps/prometheus-2.23.0.linux-amd64/prometheus.yaml
scrape configs <span class="token builtin class-name">:</span>
<span class="token comment"># The job name is added as a Label. job=&lt;job_ name> to any timeseries scraped from this config.</span>

- job_name: <span class="token string">'prometheus'</span>

  <span class="token comment"># metrics_path defaults to ' /metrics'</span>
  <span class="token comment"># scheme defaults to 'http'.</span>

  static_configs:
  - targets: <span class="token punctuation">[</span><span class="token string">'localhost:9090'</span><span class="token punctuation">]</span>

- job_name: <span class="token string">'ceph-node monitor'</span>
  static_configs:
  - targets: <span class="token punctuation">[</span><span class="token string">'172.31.6.106:9100'</span>,<span class="token string">'172.31.6.107:9100'</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/xxlog/1670309235816-42ef6287-a231-4681-b27e-e88cb0cebac6.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="_10-3-通过prometheus监控ceph服务" tabindex="-1"><a class="header-anchor" href="#_10-3-通过prometheus监控ceph服务" aria-hidden="true">#</a> 10.3 通过prometheus监控ceph服务</h2>
<p>Ceph manager内部的模块中包含了prometheus 的监控模块,并监听在每个 manager 节点的9283端口，该端口用于将采集到的信息通过 http接口向prometheus 提供数据.<br /><a href="https://docs.ceph.com/en/mimic/mgr/prometheus/?highlight=" target="_blank" rel="noopener noreferrer">https://docs.ceph.com/en/mimic/mgr/prometheus/?highlight=<ExternalLinkIcon/></a>prometheus</p>
<h3 id="_10-3-1-启用-prometheus-监控模块" tabindex="-1"><a class="header-anchor" href="#_10-3-1-启用-prometheus-监控模块" aria-hidden="true">#</a> 10.3.1 启用 prometheus 监控模块</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph mgr module <span class="token builtin class-name">enable</span> prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/xxlog/1670309464900-7e8a5c84-498b-4c97-a9f3-ec42e443db03.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_10-3-2-验证manager-数据" tabindex="-1"><a class="header-anchor" href="#_10-3-2-验证manager-数据" aria-hidden="true">#</a> 10.3.2 验证manager 数据</h3>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670309967054-5606fd5e-8eba-48a8-82c7-3d4e6956c627.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_10-3-3-配置prometheus-采集数据" tabindex="-1"><a class="header-anchor" href="#_10-3-3-配置prometheus-采集数据" aria-hidden="true">#</a> 10.3.3 配置Prometheus 采集数据</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /apps/prometheus-2.23.0.linux-amd64/prometheus.yaml
- job_name: <span class="token string">'ceph-cluster-monitor'</span>
  static_configs:
  - targets:<span class="token punctuation">[</span><span class="token string">'172.31.6.105:9283'</span><span class="token punctuation">]</span>

systemctl restart prometheus.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-3-4-验证数据" tabindex="-1"><a class="header-anchor" href="#_10-3-4-验证数据" aria-hidden="true">#</a> 10.3.4 验证数据</h3>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670309789610-7a707999-aed8-4d09-a29f-9ec499465329.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="_10-4-通过grafana显示监控数据" tabindex="-1"><a class="header-anchor" href="#_10-4-通过grafana显示监控数据" aria-hidden="true">#</a> 10.4 通过grafana显示监控数据</h2>
<p>通过granfana 显示对ceph的集群监控数据及node 数据.</p>
<h3 id="_10-4-1-安装grafana" tabindex="-1"><a class="header-anchor" href="#_10-4-1-安装grafana" aria-hidden="true">#</a> 10.4.1 安装grafana</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-mgr1 apps<span class="token punctuation">]</span><span class="token comment"># yum localinstall grafana-7.5.7-1.x86_64.rpm</span>
<span class="token punctuation">[</span>root@ceph-mgr1 apps<span class="token punctuation">]</span><span class="token comment"># systemctl enable grafana-server</span>
<span class="token punctuation">[</span>root@ceph-mgr1 apps<span class="token punctuation">]</span><span class="token comment"># systemctl restart grafana-server</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-4-2-登陆-grafana" tabindex="-1"><a class="header-anchor" href="#_10-4-2-登陆-grafana" aria-hidden="true">#</a> 10.4.2 登陆 grafana</h3>
<p>账号admin  密码 admin</p>
<h3 id="_10-4-3-添加数据源" tabindex="-1"><a class="header-anchor" href="#_10-4-3-添加数据源" aria-hidden="true">#</a> 10.4.3 添加数据源</h3>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670310346426-df2cb042-cc2a-440b-918c-b2fa34b0f5ad.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670310447053-8bbcb8e2-1062-411e-9989-a18a413e4034.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_10-4-4-导入模板" tabindex="-1"><a class="header-anchor" href="#_10-4-4-导入模板" aria-hidden="true">#</a> 10.4.4 导入模板</h3>
<p>ceph OSD<br /><a href="https://grafana.com/grafana/dashboards/5336" target="_blank" rel="noopener noreferrer">https://grafana.com/grafana/dashboards/5336<ExternalLinkIcon/></a> <br />ceph pool <br /><a href="https://grafana.com/grafana/dashboards/5336" target="_blank" rel="noopener noreferrer">https://grafana.com/grafana/dashboards/53<ExternalLinkIcon/></a>42</p>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670310723247-4828c2a3-7327-4384-ab38-e57c67260aa2.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670310832350-d9daf174-93f8-4ee4-851e-6b92b7154db0.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
</div></template>


