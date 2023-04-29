<template><div><h1 id="_1-nginx-访问限制" tabindex="-1"><a class="header-anchor" href="#_1-nginx-访问限制" aria-hidden="true">#</a> 1. Nginx 访问限制</h1>
<p><code v-pre>ngx_http_access_module</code>模块允许限制对某些客户端地址的访问。</p>
<p>这里所说的访问限制主要就是限制来源的客户端 IP 地址，可以设置类似 IP 黑白名单一样的东西，比如某些内部的服务，我们只希望在我们办公室的 IP 能够访问，也比如有个不法分子的 IP 一直在疯狂的请求我们网站，需要把它封了，这些都需要用到该功能。</p>
<p>Nginx 的 <code v-pre>ngx_http_access_module</code> 模块提供了这样的功能，默认编译。主要两个参数：</p>
<table>
<thead>
<tr>
<th style="text-align:center">参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">allow	允许某个 ip 或者一个 ip 段访问，如果指定 unix: ，那将允许 socket 的访问。语法：allow address</td>
<td>CIDR</td>
</tr>
<tr>
<td style="text-align:center">deny	和 allow 相反。语法：deny address</td>
<td>CIDR</td>
</tr>
</tbody>
</table>
<h2 id="_1-1-模块指令" tabindex="-1"><a class="header-anchor" href="#_1-1-模块指令" aria-hidden="true">#</a> 1.1 模块指令</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>
<span class="token comment">#允许配置语法</span>
Syntax: allow address <span class="token operator">|</span> CIDR <span class="token operator">|</span> unix: <span class="token operator">|</span> all<span class="token punctuation">;</span>
Default:  -
Context <span class="token builtin class-name">:</span>  http,server,location,limit_except


<span class="token comment">#拒绝配置语法</span>
Syntax: deny address<span class="token operator">|</span> CIDR<span class="token operator">|</span> unix:<span class="token operator">|</span> all<span class="token punctuation">;</span>
Default <span class="token builtin class-name">:</span>  -
Context:http,server,location,limit_except
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-2-场景示例-只允许指定的来源ip能访问-其它网段全部拒绝。" tabindex="-1"><a class="header-anchor" href="#_1-2-场景示例-只允许指定的来源ip能访问-其它网段全部拒绝。" aria-hidden="true">#</a> 1.2 场景示例，只允许指定的来源IP能访问, 其它网段全部拒绝。</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_ name mirror.jx.com<span class="token punctuation">;</span>
    charset utf-8<span class="token punctuation">;</span>     <span class="token comment">#设定字符集，防止中文字符乱码显示。</span>
    autoindex on<span class="token punctuation">;</span>
    autoindex_exact_size off<span class="token punctuation">;</span>
    autoindex_locatime on <span class="token punctuation">;</span>

    location / <span class="token punctuation">{</span>
    index index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    location /centos <span class="token punctuation">{</span>
    allow <span class="token number">127.0</span>.0.1<span class="token punctuation">;</span>
    allow <span class="token number">10.0</span>.0.1/32<span class="token punctuation">;</span> <span class="token comment">#允许地址或地址段</span>
    deny all<span class="token punctuation">;</span>   <span class="token comment">#拒绝所有人</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h2 id="_1-3-场景示例-拒绝指定的ip访问该网站的-其他ip全部允许访问。" tabindex="-1"><a class="header-anchor" href="#_1-3-场景示例-拒绝指定的ip访问该网站的-其他ip全部允许访问。" aria-hidden="true">#</a> 1.3 场景示例，拒绝指定的IP访问该网站的,其他IP全部允许访问。</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_ name mirror.jx.com<span class="token punctuation">;</span>
    charset utf-8<span class="token punctuation">;</span>
    <span class="token comment">#设定字符集，防止中文字符乱码显示。</span>
    autoindex on<span class="token punctuation">;</span>
    autoindex_exact_size off<span class="token punctuation">;</span>
    autoindex_locatime on<span class="token punctuation">;</span>
    
    location / <span class="token punctuation">{</span>
    index index.html <span class="token punctuation">;</span>
    
    location /centos<span class="token punctuation">{</span>
    deny <span class="token number">10.0</span>.0.1/32<span class="token punctuation">;</span> <span class="token comment">#拒绝指定的地址或地址段</span>
    allow all<span class="token punctuation">;</span>        <span class="token comment">#允许所有的地址</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><code v-pre>注意</code>:deny和allow的顺序是有影响的<br></p>
<p>默认情况下，从第一条规则进行匹配,如果匹配成功，则不继续匹配下面的内容。如果匹配不成功，则继续往下寻找能匹配成功的内容。</p>
<br>
<br>
<h1 id="_2-身份验证" tabindex="-1"><a class="header-anchor" href="#_2-身份验证" aria-hidden="true">#</a> 2.身份验证</h1>
<p><code v-pre>ngx_http__auth_basic_module</code> 模块允许使用HTTP基本身份验证，验证用户名和密码来限制对资源的访问.</p>
<h2 id="_2-1-指令" tabindex="-1"><a class="header-anchor" href="#_2-1-指令" aria-hidden="true">#</a> 2.1 指令</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#使用HTTP基本身份验证协议启用用户名和密码验证。</span>
Syntax: auth_basic string <span class="token operator">|</span> off<span class="token punctuation">;</span>
Default: auth_basic off<span class="token punctuation">;</span>
Context: http,server,location,limit_except

<span class="token comment">#指定保存用户名和密码的文件</span>
Syntax: auth_basic_user_file <span class="token function">file</span><span class="token punctuation">;</span>
Default:  -
Context: http,server,location,limit_except
<span class="token number">2</span>.指定保存用户名和密码的文件，格式如下:


<span class="token comment">#可以使用htpasswd程序或"openssl passwd ”命令生成对应的密码;</span>
name1: passwd1
name2: passwd2

<span class="token comment">#使用htpaaswd创建新的密码文件，-c创建新文件-b允许命令行输入密码</span>
yum <span class="token function">install</span> httpd- tools
htpasswd <span class="token parameter variable">-b</span> <span class="token parameter variable">-C</span> /etc/nginx/auth_conf <span class="token builtin class-name">test</span> <span class="token number">123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h2 id="_2-2-场景示例-基于用户名和密码认证实践" tabindex="-1"><a class="header-anchor" href="#_2-2-场景示例-基于用户名和密码认证实践" aria-hidden="true">#</a> 2.2 场景示例，基于用户名和密码认证实践</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>
server <span class="token punctuation">{</span>
     listen <span class="token number">80</span><span class="token punctuation">;</span>
     server_name mirror.jx.com<span class="token punctuation">;</span>
     charset utf-8<span class="token punctuation">;</span>
     <span class="token comment">#设定字符集，防止中文字符乱码显示。</span>
     autoindex on<span class="token punctuation">;</span>
     autoindex_exact_size off<span class="token punctuation">;</span>
     autoindex_locatime on<span class="token punctuation">;</span>
     
     location / <span class="token punctuation">{</span>
     index index.html<span class="token punctuation">;</span>
     
     <span class="token punctuation">}</span>
     
     location /centos <span class="token punctuation">{</span>
         auth_basic<span class="token string">" Auth access Blog Input your Passwd!"</span><span class="token punctuation">;</span>
         auth_basic_user_file /etc/nginx/auth_conf<span class="token punctuation">;</span> 
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h1 id="_3-nginx-连接限制" tabindex="-1"><a class="header-anchor" href="#_3-nginx-连接限制" aria-hidden="true">#</a> 3. Nginx 连接限制</h1>
<br>
<p>Nginx 默认包含了 <code v-pre>http_limit_conn_module</code> 模块，能够帮助我们对网站的用户在一定时间内能够产生的Http请求量，网速,IP等进行限制。防止不法分子而已对我们的网站进行攻击。<br></p>
<p><strong>参数包含如下</strong>：<br></p>
<table>
<thead>
<tr>
<th style="text-align:center">参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code v-pre>limit_conn_zone</code></td>
<td>会话状态存储区域，只能 http 段配置，语法：<code v-pre>limit_conn_zone $variable zone=name:size</code>;</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>limit_zone</code></td>
<td>和 <code v-pre>limit_conn_zone</code> 同等意思，已被弃用</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>limit_conn_log_level</code></td>
<td>当达到最大限制连接数后，记录日志的等级，语法：<code v-pre>limit_conn_log_level info ( notice )( warn) ( error)</code></td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>limit_conn</code></td>
<td>指定每个给定键值的最大同时连接数，当超过时返回 503，语法：<code v-pre>limit_conn zone_name number</code></td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>limit_conn_status</code></td>
<td>指定当超过限制时，返回的状态码，默认是 503，语法：<code v-pre>limit_conn_status code;</code></td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>limit_rate</code></td>
<td>对每个连接限速。单位是字节/秒，设置为 0 将关闭限速，语法：<code v-pre>limit_rate rate</code>，实质是限制 IP 每个线程的网速</td>
</tr>
</tbody>
</table>
<br>
<p><strong>特别说明</strong>：</p>
<ul>
<li><code v-pre>limit_conn_zone</code> 一般用法：<code v-pre>limit_conn_zone $binary_remote_addr zone=addr:10m</code>;</li>
<li><code v-pre>$binary_remote_addr</code> 是二进制客户端地址，长度固定 4 字节，每个客户端以自己 IP 二进制作为键存储在空间中。</li>
<li>定义了一个空间，名称为 <code v-pre>addr</code>，给了 10M 共享内存，每 M 存大约 1.6 万。按需根据实际情况相应调整大小。</li>
</ul>
<h2 id="_3-1-场景实践-限制客户端同一时刻的并发连接数。" tabindex="-1"><a class="header-anchor" href="#_3-1-场景实践-限制客户端同一时刻的并发连接数。" aria-hidden="true">#</a> 3.1 场景实践-限制客户端同一时刻的并发连接数。</h2>
<ol>
<li>模块指令</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Syntax: limit_conn_zone key <span class="token assign-left variable">zone</span><span class="token operator">=</span>name:size<span class="token punctuation">;</span>
Default:  -
Context: http

Syntax: limit_conn zone number <span class="token punctuation">;</span>
Default:  -
Context: http,server,location
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<ol start="2">
<li>设置共享内存区域和给定键值的最大允许个连接数2个，超过此限制时，服务器将返回503错误以回复请求</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>limit_conn_zone <span class="token variable">$binary_remote_addr</span> <span class="token assign-left variable">zone</span><span class="token operator">=</span>conn_mg:10m<span class="token punctuation">;</span> 

server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name mirror.jx.com<span class="token punctuation">;</span>
    root /code<span class="token punctuation">;</span>
    charset utf8<span class="token punctuation">;</span>
    autoindex on<span class="token punctuation">;</span>
    autoindex_ exact_ size off<span class="token punctuation">;</span>
    autoindex_ localtime on<span class="token punctuation">;</span>

    limit_conn conn_mg <span class="token number">2</span>
    location / <span class="token punctuation">{</span>
        index index.html
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h2 id="_3-2-场景实践-限制下载速度。" tabindex="-1"><a class="header-anchor" href="#_3-2-场景实践-限制下载速度。" aria-hidden="true">#</a> 3.2 场景实践-限制下载速度。</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>server <span class="token punctuation">{</span>
listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name mirror.jx.com<span class="token punctuation">;</span>
    root /code<span class="token punctuation">;</span>
    charset utf8<span class="token punctuation">;</span>
    autoindex on<span class="token punctuation">;</span>
    autoindex_exact_size off<span class="token punctuation">;</span>
    autoindex_localtime on<span class="token punctuation">;</span>
    
    limit_rate_after 100m<span class="token punctuation">;</span> <span class="token comment">#达到100m开始限速</span>
    limit_rate 100k<span class="token punctuation">;</span>
    
    location / <span class="token punctuation">{</span>
    index index.html <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h1 id="_4-nginx-请求限制" tabindex="-1"><a class="header-anchor" href="#_4-nginx-请求限制" aria-hidden="true">#</a> 4. Nginx 请求限制</h1>
<p>连接限制主要用于处理用户的连接，只算是一方面的限制，而且有时候这样一刀切不是很友好，比如限制了总共允许多少个连接，如果别人属于攻击该网站，一下子建立一万个线程发起连接，可能你连接池两下就撑爆了，真正的用户进步不进来，此时就需要这样一个限制，限制来自同一个客户端的请求我们每秒只给它处理多少个请求，想要请求更多，那就等着，这样连接池不会被占满，别人也能正常使用。</p>
<h2 id="_4-1-请求频率限速实现的原理" tabindex="-1"><a class="header-anchor" href="#_4-1-请求频率限速实现的原理" aria-hidden="true">#</a> 4.1 请求频率限速实现的原理?</h2>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx频率限速原理.jpg" alt="nginx频率限速原理" tabindex="0" loading="lazy"><figcaption>nginx频率限速原理</figcaption></figure>
<br>
<p>如图：水(请求)从上方倒入水桶，从水桶下方流出(被处理) ;<br>
如果说水(请求) 流入的过快，水桶流出(被处理)的过慢，来不及流出的水存在水桶中(缓存)，然后以固定速率流出，水桶满后则水溢出(丢弃)<br>
<br></p>
<p><strong>简单来说就是</strong>:当处理速度,达不到请求的速度，则会将请求放置缓存， 然后持续处理。当缓存空间被沾满，如果还有大量的请求，则会被丢弃。<br></p>
<br>
<br>
<p><strong>Nginx</strong> 的 <code v-pre>http_limit_req_module</code> 模块就可以实现该需求，并且默认编译。 <br></p>
<table>
<thead>
<tr>
<th style="text-align:center">参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">limit_req_zone</td>
<td>设置一块共享内存用来保存键值的状态参数。只能 http 段，语法：<code v-pre>limit_req_zone $variable zone=name:size rate=rate</code>;</td>
</tr>
<tr>
<td style="text-align:center">limit_req_log_level</td>
<td>设置日志级别。语法：`limit_req_log_level (info) (notice) (warn) (error);</td>
</tr>
<tr>
<td style="text-align:center">limit_req_status</td>
<td>设置拒绝请求的响应状态码，默认 503。语法：<code v-pre>limit_req_status code</code>;</td>
</tr>
<tr>
<td style="text-align:center">limit_req</td>
<td>设置对应的共享内存限制域和允许被处理的最大请求数阈值。语法：<code v-pre>limit_req zone=name [burst=number] [nodelay]</code>;</td>
</tr>
</tbody>
</table>
<br>
<p><strong>参数说明</strong>：</p>
<ul>
<li><code v-pre>limit_req_zone</code>：和之前的 <code v-pre>limit_conn_zone</code> 类似，只是多了个 rate 配置，用法也类似。</li>
<li><code v-pre>rate</code>：必须是整数，如 1r/s，如果是2秒处理1个只能换成 30r/m 这样来实现整数。</li>
<li><code v-pre>burst</code>：超出后允许的排队个数。</li>
<li><code v-pre>nodelay</code>：排队也能直接执行，但是再超出则马上返回 503。</li>
</ul>
<br>
<h2 id="_4-2-场景实践-限制单位时间内所产生的http请求数。" tabindex="-1"><a class="header-anchor" href="#_4-2-场景实践-限制单位时间内所产生的http请求数。" aria-hidden="true">#</a> 4.2 场景实践-限制单位时间内所产生的Http请求数。</h2>
<ol>
<li>模块指令：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Syntax: limit_req_zone key <span class="token assign-left variable">zone</span><span class="token operator">=</span>name:size <span class="token assign-left variable">rate</span><span class="token operator">=</span>rate<span class="token punctuation">;</span> 
Default: -
Context: http

Syntax: limit_conn zone number <span class="token punctuation">[</span> <span class="token assign-left variable">burst</span><span class="token operator">=</span>number<span class="token punctuation">]</span> <span class="token punctuation">[</span>nodelay<span class="token punctuation">]</span><span class="token punctuation">;</span>
Default: -
Context: http,server,location

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<ol start="2">
<li>基于来源IP对下载速率限制，限制每秒处理1次请求，但可以突发超过5个请求放入缓存区</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># http标签段定义请求限制,rate限制速率，限制一秒钟最多一个IP请求</span>

http <span class="token punctuation">{</span>
   limit_req_zone <span class="token variable">$binary_remote_addr</span> <span class="token assign-left variable">zone</span><span class="token operator">=</span>req_one:10m <span class="token assign-left variable">rate</span><span class="token operator">=</span>1r/s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name mirror.jx.com<span class="token punctuation">;</span>
    <span class="token comment">#请求超过1r/s,剩下的将被延迟处理，请求数超过burst定义的数量，则返回503</span>
    limit_req <span class="token assign-left variable">zone</span><span class="token operator">=</span>req_one <span class="token assign-left variable">burst</span><span class="token operator">=</span><span class="token number">3</span> nodelay<span class="token punctuation">;</span> <span class="token comment">#nodelay 排队也能直接执行，但是再超出则马上返回 503</span>
    location / <span class="token punctuation">{</span>
        root /code<span class="token punctuation">;</span>
        index index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

limit_req_zone <span class="token variable">$binary_remote_addr</span> <span class="token assign-left variable">zone</span><span class="token operator">=</span>req_one:10m <span class="token assign-left variable">rate</span><span class="token operator">=</span>1r/s<span class="token punctuation">;</span>
<span class="token comment">#第一个参数: $binary_remote_gaddr 表示通过这个标识来做限制，限制同一客户端ip地址。</span>
<span class="token comment">#第二个参数: zone=req_one:10m表示生成一个大小为10M，名为req_one的内存区域，用来存储访问的频次信息。</span>
<span class="token comment">#第三个参数: rate=1r/s表示允许相同标识的客户端的访问频次，这里限制的是每秒1次。</span>
limit_req <span class="token assign-left variable">zone</span><span class="token operator">=</span>req_one <span class="token assign-left variable">burst</span><span class="token operator">=</span><span class="token number">3</span> nodelay<span class="token punctuation">;</span>
<span class="token comment">#第一个参数: zone=req_one设置使用哪个配置区域来做限制，与上面limit_req_zone里的name对应。</span>
<span class="token comment">#第二个参数: burst=3，设置一个大小为3的缓冲区，当有大量请求过来时，超过了访问频次限制的请求可以先放到这个缓冲区内。</span>
<span class="token comment">#第三个参数: nodelay,超过访问频次并且缓冲区也满了的时候，则会返回503， 如果没有设置，则所有请求会等待排队。</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h1 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结" aria-hidden="true">#</a> 5.总结</h1>
<h2 id="_5-1-访问限制应用场景" tabindex="-1"><a class="header-anchor" href="#_5-1-访问限制应用场景" aria-hidden="true">#</a> 5.1 访问限制应用场景</h2>
<ul>
<li>下载限速:限制用户下载资源的速度，使用<code v-pre>Nginx ngx_http_core_module</code>。</li>
<li>请求限制:限制用户单位时间内所产生的Http请求数，使用<code v-pre>Nginx ngx_http_limit req_module</code>。</li>
<li>连接限制:限制同一时间的连接数,及并发数限制。使用<code v-pre>Nginx ngx_http_limit_conn_module</code>。</li>
</ul>
<br>
<h2 id="_5-2-综合案例" tabindex="-1"><a class="header-anchor" href="#_5-2-综合案例" aria-hidden="true">#</a> 5.2 综合案例</h2>
<ul>
<li>限制web服务器请求数处理为1秒一个，触发值为5、限制用户仅可同时下载一个文件。</li>
<li>当下载超过100M则限制下载速度为500k。如果同时下载超过2个视频，则返回提示&quot;请联系站长进行会员充值&quot;。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>limit_req_zone <span class="token variable">$binary_remote_addr</span> <span class="token assign-left variable">zone</span><span class="token operator">=</span>req_mg:10m <span class="token assign-left variable">rate</span><span class="token operator">=</span>1r/s<span class="token punctuation">;</span>
limit_conn_zone <span class="token variable">$binary_remote_addr</span> <span class="token assign-left variable">zone</span><span class="token operator">=</span>conn_mg:10m<span class="token punctuation">;</span>

server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name mirror.jx.com<span class="token punctuation">;</span>
    root /code<span class="token punctuation">;</span>
    charset utf8<span class="token punctuation">;</span>
    autoindex on<span class="token punctuation">;</span>
    autoindex_exact_size off<span class="token punctuation">;</span>
    autoindex_localtime on
    
    limit_req <span class="token assign-left variable">zone</span><span class="token operator">=</span>req_mg <span class="token assign-left variable">burst</span><span class="token operator">=</span><span class="token number">5</span> nodelay<span class="token punctuation">;</span>
    limit_conn conn_mg <span class="token number">1</span><span class="token punctuation">;</span>
    limit_rate_after 100m<span class="token punctuation">;</span>
    limit_rate 500k<span class="token punctuation">;</span>
    
    error_page <span class="token number">503</span> @errpage<span class="token punctuation">;</span>
    location @errpage <span class="token punctuation">{</span>
        default_type text/html<span class="token punctuation">;</span>
        <span class="token builtin class-name">return</span> <span class="token number">200</span> <span class="token string">'温馨提示-->请联系站长进行会员充值'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    location / <span class="token punctuation">{</span>
       index index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
</div></template>


