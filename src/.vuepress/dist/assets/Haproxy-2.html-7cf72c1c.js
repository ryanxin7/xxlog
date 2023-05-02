import{_ as p,V as o,W as l,$ as n,a0 as s,Y as e,Z as t,C as c}from"./framework-91fce522.js";const i={},r=n("h2",{id:"四、基础配置详解",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#四、基础配置详解","aria-hidden":"true"},"#"),s(" 四、基础配置详解")],-1),d={href:"http://cbonte.github.io/haproxy-dconv/2.6/configuration.html",target:"_blank",rel:"noopener noreferrer"},u=t(`<p>HAProxy 的配置文件<strong>haproxy.cfg</strong>由两大部分组成，分别是<strong>global</strong>和<strong>proxies</strong>部分</p><p>**global ：全局配置段 **</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>进程及安全配置相关的参数
性能调整相关参数
Debug参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>** proxies：代理配置段 **</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>defaults：为frontend, backend, listen提供默认配置
frontend：前端，相当于nginx中的server <span class="token punctuation">{</span><span class="token punctuation">}</span>
backend：后端，相当于nginx中的upstream <span class="token punctuation">{</span><span class="token punctuation">}</span>
listen：同时拥有前端和后端配置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="uAz1l"></a></p><h3 id="_4-1-global配置" tabindex="-1"><a class="header-anchor" href="#_4-1-global配置" aria-hidden="true">#</a> 4.1 global配置</h3><p><a name="lWVLb"></a></p><h4 id="_4-1-1-global-配置参数说明" tabindex="-1"><a class="header-anchor" href="#_4-1-1-global-配置参数说明" aria-hidden="true">#</a> 4.1.1 global 配置参数说明</h4>`,9),m={href:"http://cbonte.github.io/haproxy-dconv/2.6/configuration.html",target:"_blank",rel:"noopener noreferrer"},b=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chroot</span> <span class="token comment">#锁定运行目录</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="EuFfx"></a></p><h4 id="_4-4-2-多进程和线程" tabindex="-1"><a class="header-anchor" href="#_4-4-2-多进程和线程" aria-hidden="true">#</a> 4.4.2 多进程和线程</h4><p>范例：多进程和socket文件 <br><strong>查看CPU核心数量</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost haproxy<span class="token punctuation">]</span><span class="token comment"># cat /proc/cpuinfo  | grep &quot;cores&quot; | uniq                                                                       </span>
cpu cores       <span class="token builtin class-name">:</span> <span class="token number">8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#vim /etc/haproxy/haproxy.cfg</span>
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
           <span class="token operator">|</span>               \`-haproxy<span class="token punctuation">(</span><span class="token number">2638</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span>root@centos7 ~<span class="token punctuation">]</span><span class="token comment">#ll /var/lib/haproxy/</span>
total <span class="token number">4</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">5</span> Mar <span class="token number">31</span> <span class="token number">18</span>:49 haproxy.pid
srw------- <span class="token number">1</span> root root <span class="token number">0</span> Mar <span class="token number">31</span> <span class="token number">18</span>:49 haproxy.sock1
srw------- <span class="token number">1</span> root root <span class="token number">0</span> Mar <span class="token number">31</span> <span class="token number">18</span>:49 haproxy.sock2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="H2JCH"></a></p><h4 id="_4-4-3-配置haproxy记录日志到指定日志文件中" tabindex="-1"><a class="header-anchor" href="#_4-4-3-配置haproxy记录日志到指定日志文件中" aria-hidden="true">#</a> 4.4.3 配置HAProxy记录日志到指定日志文件中</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#在global配置项定义：</span>
log <span class="token number">127.0</span>.0.1  local<span class="token punctuation">{</span><span class="token number">1</span>-7<span class="token punctuation">}</span> info <span class="token comment">#基于syslog记录日志到指定设备，级别有(err、warning、info、debug)</span>

listen  web_port
  <span class="token builtin class-name">bind</span> <span class="token number">127.0</span>.0.1:80
  mode http
  log global   <span class="token comment">#开启当前web_port的日志功能，默认不记录日志</span>
  server web1  <span class="token number">127.0</span>.0.1:8080  check inter <span class="token number">3000</span> fall <span class="token number">2</span> rise <span class="token number">5</span>

<span class="token comment"># systemctl  restart haproxy</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="ESfie"></a></p><h5 id="rsyslog配置" tabindex="-1"><a class="header-anchor" href="#rsyslog配置" aria-hidden="true">#</a> <strong>Rsyslog配置</strong></h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/rsyslog.conf 
<span class="token variable">$ModLoad</span> imudp
<span class="token variable">$UDPServerRun</span> <span class="token number">514</span>

<span class="token comment"># Save boot messages also to boot.log</span>
local7.*                                                /var/log/boot.log
local5.*                                                /var/log/haproxy.log
local0.*                                                /var/log/haproxy.log
<span class="token comment"># systemctl  restart rsyslog</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="oKsmk"></a></p><h5 id="验证haproxy日志" tabindex="-1"><a class="header-anchor" href="#验证haproxy日志" aria-hidden="true">#</a> 验证HAProxy日志</h5><p>重启syslog服务并访问app页面，然后验证是否生成日志</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost log<span class="token punctuation">]</span><span class="token comment"># tail -f haproxy.log </span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="QimZ3"></a></p><h3 id="_4-2-proxies配置" tabindex="-1"><a class="header-anchor" href="#_4-2-proxies配置" aria-hidden="true">#</a> 4.2 Proxies配置</h3>`,18),v={href:"http://docs.haproxy.org/2.6/configuration.html#4",target:"_blank",rel:"noopener noreferrer"},k=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>defaults <span class="token punctuation">[</span><span class="token operator">&lt;</span>name<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token comment">#默认配置项，针对以下的frontend、backend和listen生效，可以多个name也可以没有name</span>
frontend <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>   <span class="token comment">#前端servername，类似于Nginx的一个虚拟主机 server和LVS服务集群。</span>
backend  <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>   <span class="token comment">#后端服务器组，等于nginx的upstream和LVS中的RS服务器</span>
listen   <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>   <span class="token comment">#将frontend和backend合并在一起配置，相对于frontend和backend配置更简洁，生产常用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**注意：name字段只能使用大小写字母，数字，‘-’(dash)，’_‘(underscore)，’.’ (dot)和 ‘:&#39;(colon)，并且严格区分大小写 **</p><p><a name="W2ZMc"></a></p><h4 id="_4-2-1-proxies配置-frontend" tabindex="-1"><a class="header-anchor" href="#_4-2-1-proxies配置-frontend" aria-hidden="true">#</a> 4.2.1 Proxies配置-frontend</h4><p><strong>frontend 配置参数：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>bind：   <span class="token comment">#指定HAProxy的监听地址，可以是IPV4或IPV6，可以同时监听多个IP或端口，可同时用于listen字段中</span>

<span class="token comment">#格式：</span>
<span class="token builtin class-name">bind</span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>address<span class="token operator">&gt;</span><span class="token punctuation">]</span>:<span class="token operator">&lt;</span>port_range<span class="token operator">&gt;</span> <span class="token punctuation">[</span>, <span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token punctuation">[</span>param*<span class="token punctuation">]</span>

<span class="token comment">#注意：如果需要绑定在非本机的IP，需要开启内核参数：net.ipv4.ip_nonlocal_bind=1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>范例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>listen http_proxy                           <span class="token comment">#监听http的多个IP的多个端口和sock文件</span>
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
    <span class="token builtin class-name">bind</span> <span class="token string">&quot;fd@<span class="token variable">\${FD_APP1}</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>** 生产示例：**</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>frontend  magedu_web_port               <span class="token comment">#可以采用后面形式命名：业务-服务-端口号</span>
    <span class="token builtin class-name">bind</span> :80,:8080
    <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:10080,:8801-8810,10.0.0.17:9001-9010
    mode  http<span class="token operator">|</span>tcp              <span class="token comment">#指定负载协议类型</span>
    use_backend <span class="token operator">&lt;</span>backend_name<span class="token operator">&gt;</span>  <span class="token comment">#调用的后端服务器组名称</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="ZeD03"></a></p><h4 id="_4-2-2-proxies配置-backend" tabindex="-1"><a class="header-anchor" href="#_4-2-2-proxies配置-backend" aria-hidden="true">#</a> 4.2.2 Proxies配置-backend</h4><p>定义一组后端服务器，backend服务器将被frontend进行调用。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mode  http<span class="token operator">|</span>tcp      <span class="token comment">#指定负载协议类型,和对应的frontend必须一致</span>
option              <span class="token comment">#配置选项</span>
server              <span class="token comment">#定义后端real server</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：option后面加** httpchk，smtpchk,mysql-check,pgsql-check，ssl-hello-chk**方法，可用于实现更多应用层检测功能。</p><p><a name="P9DQB"></a></p><h5 id="option-配置" tabindex="-1"><a class="header-anchor" href="#option-配置" aria-hidden="true">#</a> option 配置</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>check               <span class="token comment">#对指定real进行健康状态检查，如果不加此设置，默认不开启检查</span>
    addr  <span class="token operator">&lt;</span>IP<span class="token operator">&gt;</span>        <span class="token comment">#可指定的健康状态监测IP，可以是专门的数据网段，减少业务网络的流量</span>
    port  <span class="token operator">&lt;</span>num<span class="token operator">&gt;</span>   <span class="token comment">#指定的健康状态监测端口</span>
    inter <span class="token operator">&lt;</span>num<span class="token operator">&gt;</span>   <span class="token comment">#健康状态检查间隔时间，默认2000 ms</span>
    fall  <span class="token operator">&lt;</span>num<span class="token operator">&gt;</span>       <span class="token comment">#后端服务器从线上转为线下的检查的连续失效次数，默认为3</span>
    rise  <span class="token operator">&lt;</span>num<span class="token operator">&gt;</span>       <span class="token comment">#后端服务器从下线恢复上线的检查的连续有效次数，默认为2</span>
weight  <span class="token operator">&lt;</span>weight<span class="token operator">&gt;</span>  <span class="token comment">#默认为1，最大值为256，0表示不参与负载均衡，但仍接受持久连接</span>
backup              <span class="token comment">#将后端服务器标记为备份状态,只在所有非备份主机down机时提供服务，类似Sorry Server</span>
disabled            <span class="token comment">#将后端服务器标记为不可用状态，即维护状态，除了持久模式，将不再接受连接</span>
redirect prefix  http://www.baidu.com/      <span class="token comment">#将请求临时(302)重定向至其它URL，只适用于http模式</span>
redir http://www.baidu.com                  <span class="token comment">#将请求临时(302)重定向至其它URL，只适用于http模式</span>
maxconn <span class="token operator">&lt;</span>maxconn<span class="token operator">&gt;</span>     <span class="token comment">#当前后端server的最大并发连接数</span>
backlog <span class="token operator">&lt;</span>backlog<span class="token operator">&gt;</span> <span class="token comment">#当前端服务器的连接数达到上限后的后援队列长度，注意：不支持backend</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="LKKi7"></a></p><h4 id="_4-2-3-frontend-backend配置实例" tabindex="-1"><a class="header-anchor" href="#_4-2-3-frontend-backend配置实例" aria-hidden="true">#</a> 4.2.3 frontend+backend配置实例</h4><p>范例1：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>frontend xin-test-http
 <span class="token builtin class-name">bind</span> :80,:8080
 mode tcp
 use_backend magedu-test-http-nodes

backend magedu-test-http-nodes
 mode tcp
 default-server inter <span class="token number">1000</span> weight <span class="token number">6</span>  
 server web1 <span class="token number">10.0</span>.0.17:80 check weight <span class="token number">2</span> addr <span class="token number">10.0</span>.0.117 port <span class="token number">8080</span>
 server web1 <span class="token number">10.0</span>.0.27:80 check
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>范例2：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#官网业务访问入口</span>
frontend  WEB_PORT_80
    <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:80
    mode http
    use_backend  web_prot_http_nodes

backend web_prot_http_nodes
    mode  http
    option forwardfor
    server <span class="token number">10.0</span>.0.17 <span class="token number">10.0</span>.0.17:8080   check inter <span class="token number">3000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>  
    server <span class="token number">10.0</span>.0.27 <span class="token number">10.0</span>.0.27:8080   check inter <span class="token number">3000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="jVeG5"></a></p><h4 id="_4-2-4-proxies配置-listen替代frontend-backend" tabindex="-1"><a class="header-anchor" href="#_4-2-4-proxies配置-listen替代frontend-backend" aria-hidden="true">#</a> 4.2.4 Proxies配置-listen替代frontend+backend</h4><p>使用listen替换上面的frontend和backend的配置方式，可以简化设置，通常只用于TCP协议的应用</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#官网业务访问入口</span>
listen  WEB_PORT_80 
    <span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.7:80  
    mode http
    option  forwardfor
    server web1   <span class="token number">10.0</span>.0.17:8080   check inter <span class="token number">3000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
    server web2   <span class="token number">10.0</span>.0.27:8080   check inter <span class="token number">3000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="PN7I4"></a></p><h3 id="_4-3-使用子配置文件保存配置" tabindex="-1"><a class="header-anchor" href="#_4-3-使用子配置文件保存配置" aria-hidden="true">#</a> 4.3 使用子配置文件保存配置</h3><p>当业务众多时，将所有配置都放在一个配置文件中，会造成维护困难。可以考虑按业务分类，将配置信息拆分，放在不同的子配置文件中，从而达到方便维护的目的。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#创建子配置目录</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="pz6z2"></a></p>`,33);function h(g,x){const a=c("ExternalLinkIcon");return o(),l("div",null,[r,n("p",null,[s("官方文档："),n("a",d,[s("http://cbonte.github.io/haproxy-dconv/2.6/configuration.html"),e(a)])]),u,n("p",null,[s("官方文档："),n("a",m,[s("http://cbonte.github.io/haproxy-dconv/2.6/configuration.html"),e(a)])]),b,n("p",null,[s("官方文档："),n("a",v,[s("http://docs.haproxy.org/2.6/configuration.html#4"),e(a)])]),k])}const y=p(i,[["render",h],["__file","Haproxy-2.html.vue"]]);export{y as default};
