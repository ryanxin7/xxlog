<template><div><h2 id="五、haproxy调度算法" tabindex="-1"><a class="header-anchor" href="#五、haproxy调度算法" aria-hidden="true">#</a> 五、HAProxy调度算法</h2>
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
</div></template>


