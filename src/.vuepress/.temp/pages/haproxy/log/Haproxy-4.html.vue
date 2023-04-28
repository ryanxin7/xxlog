<template><div><p><a name="PyKn5"></a></p>
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


