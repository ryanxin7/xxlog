import{_ as t,V as l,W as p,$ as n,a0 as a,Y as e,Z as i,C as c}from"./framework-91fce522.js";const o={},u=i(`<p><a name="Ti5Lf"></a></p><h2 id="自定义镜像-运行nginx与tomcat实现动静分离" tabindex="-1"><a class="header-anchor" href="#自定义镜像-运行nginx与tomcat实现动静分离" aria-hidden="true">#</a> 自定义镜像-运行nginx与tomcat实现动静分离</h2><figure><img src="http://cdn1.ryanxin.live/1673526070905-fa3a6810-3329-4dbd-9896-e1da10114b61.png" alt="构建流程图" tabindex="0" loading="lazy"><figcaption>构建流程图</figcaption></figure><p><a name="IRPqD"></a></p><h3 id="_1-系统基础镜像" tabindex="-1"><a class="header-anchor" href="#_1-系统基础镜像" aria-hidden="true">#</a> 1. 系统基础镜像</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>harbor.ceamg.com/baseimages/centos:7.8.2003
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="YVToe"></a></p><h3 id="_2-构建-nginx-基础镜像" tabindex="-1"><a class="header-anchor" href="#_2-构建-nginx-基础镜像" aria-hidden="true">#</a> 2. 构建 nginx 基础镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01:/dockerfile/web/pub-images<span class="token comment"># pwd</span>
/dockerfile/web/pub-images
root@harbor01:/dockerfile/web/pub-images<span class="token comment"># tree</span>
<span class="token builtin class-name">.</span>
├── build-command.sh
├── Dockerfile
└── nginx-1.22.1.tar.gz

<span class="token number">0</span> directories, <span class="token number">3</span> files

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">TAG</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> harbor.ceamg.com/pub-images/nginx-base:<span class="token variable">\${TAG}</span>  <span class="token builtin class-name">.</span>
<span class="token function">sleep</span> <span class="token number">1</span>
<span class="token function">docker</span> push  harbor.ceamg.com/pub-images/nginx-base:<span class="token variable">\${TAG}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#Nginx 1.22.1</span>
FROM harbor.ceamg.com/pub-images/nginx-base:1.22.1

ADD nginx.conf /usr/local/nginx/conf/nginx.conf
ADD app1.tar.gz  /usr/local/nginx/html/webapp/
ADD index.html  /usr/local/nginx/html/index.html

<span class="token comment">#静态资源挂载路径</span>
RUN <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/nginx/html/webapp/static /usr/local/nginx/html/webapp/images <span class="token operator">&amp;&amp;</span> <span class="token function">useradd</span> nginx <span class="token parameter variable">-u</span> <span class="token number">2023</span> <span class="token parameter variable">-s</span> /sbin/nologin <span class="token parameter variable">-M</span>

EXPOSE <span class="token number">80</span> <span class="token number">443</span>

CMD <span class="token punctuation">[</span><span class="token string">&quot;nginx&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="GYfPI"></a></p><h3 id="_3-构建-nginx-业务镜像" tabindex="-1"><a class="header-anchor" href="#_3-构建-nginx-业务镜像" aria-hidden="true">#</a> 3. 构建 nginx 业务镜像</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@harbor01:/dockerfile/web/xin-01/nginx# pwd
/dockerfile/web/xin-01/nginx
root@harbor01:/dockerfile/web/xin-01/nginx# tree
.
├── app1.tar.gz
├── bulid-command.sh
├── Dockerfile
├── index.html
└── nginx.conf

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash
TAG=$1
docker build -t harbor.ceamg.com/xinweb11/nginx-web1:\${TAG}  .
sleep 1
docker push  harbor.ceamg.com/xinweb11/nginx-web1:\${TAG}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>xxx in xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxx /usr/local/nginx/html/index.html xx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>user  nginx nginx<span class="token punctuation">;</span>
worker_processes  auto<span class="token punctuation">;</span>

<span class="token comment">#error_log  logs/error.log;</span>
<span class="token comment">#error_log  logs/error.log  notice;</span>
<span class="token comment">#error_log  logs/error.log  info;</span>

<span class="token comment">#pid        logs/nginx.pid;</span>
daemon off<span class="token punctuation">;</span>

events <span class="token punctuation">{</span>
    worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


http <span class="token punctuation">{</span>
    include       mime.types<span class="token punctuation">;</span>
    default_type  application/octet-stream<span class="token punctuation">;</span>

    <span class="token comment">#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
    <span class="token comment">#                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
    <span class="token comment">#                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span>

    <span class="token comment">#access_log  logs/access.log  main;</span>

    sendfile        on<span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>

    <span class="token comment">#keepalive_timeout  0;</span>
    keepalive_timeout  <span class="token number">65</span><span class="token punctuation">;</span>

    <span class="token comment">#gzip  on;</span>

upstream  tomcat_webserver <span class="token punctuation">{</span>
        server   magedu-tomcat-app1-service.magedu.svc.magedu.local:80<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

    server <span class="token punctuation">{</span>
        listen       <span class="token number">80</span><span class="token punctuation">;</span>
        server_name  localhost<span class="token punctuation">;</span>

        <span class="token comment">#charset koi8-r;</span>

        <span class="token comment">#access_log  logs/host.access.log  main;</span>

        location / <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        location /webapp <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        location /myapp <span class="token punctuation">{</span>
             proxy_pass  http://tomcat_webserver<span class="token punctuation">;</span>
             proxy_set_header   Host    <span class="token variable">$host</span><span class="token punctuation">;</span>
             proxy_set_header   X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span>
             proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#error_page  404              /404.html;</span>

        <span class="token comment"># redirect server error pages to the static page /50x.html</span>
        <span class="token comment">#</span>
        error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span>
        location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    proxy_pass   http://127.0.0.1;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    root           html;</span>
        <span class="token comment">#    fastcgi_pass   127.0.0.1:9000;</span>
        <span class="token comment">#    fastcgi_index  index.php;</span>
        <span class="token comment">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span>
        <span class="token comment">#    include        fastcgi_params;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># deny access to .htaccess files, if Apache&#39;s document root</span>
        <span class="token comment"># concurs with nginx&#39;s one</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ /\\.ht {</span>
        <span class="token comment">#    deny  all;</span>
        <span class="token comment">#}</span>
    <span class="token punctuation">}</span>


    <span class="token comment"># another virtual host using mix of IP-, name-, and port-based configuration</span>
    <span class="token comment">#</span>
    <span class="token comment">#server {</span>
    <span class="token comment">#    listen       8000;</span>
    <span class="token comment">#    listen       somename:8080;</span>
    <span class="token comment">#    server_name  somename  alias  another.alias;</span>

    <span class="token comment">#    location / {</span>
    <span class="token comment">#        root   html;</span>
    <span class="token comment">#        index  index.html index.htm;</span>
    <span class="token comment">#    }</span>
    <span class="token comment">#}</span>


    <span class="token comment"># HTTPS server</span>
    <span class="token comment">#</span>
    <span class="token comment">#server {</span>
    <span class="token comment">#    listen       443 ssl;</span>
    <span class="token comment">#    server_name  localhost;</span>

    <span class="token comment">#    ssl_certificate      cert.pem;</span>
    <span class="token comment">#    ssl_certificate_key  cert.key;</span>

    <span class="token comment">#    ssl_session_cache    shared:SSL:1m;</span>
    <span class="token comment">#    ssl_session_timeout  5m;</span>

    <span class="token comment">#    ssl_ciphers  HIGH:!aNULL:!MD5;</span>
    <span class="token comment">#    ssl_prefer_server_ciphers  on;</span>

    <span class="token comment">#    location / {</span>
    <span class="token comment">#        root   html;</span>
    <span class="token comment">#        index  index.html index.htm;</span>
    <span class="token comment">#    }</span>
    <span class="token comment">#}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#Nginx 1.22.1
FROM harbor.ceamg.com/pub-images/nginx-base:1.22.1

ADD nginx.conf /usr/local/nginx/conf/nginx.conf
ADD app1.tar.gz  /usr/local/nginx/html/webapp/
ADD index.html  /usr/local/nginx/html/index.html

#静态资源挂载路径
RUN mkdir -p /usr/local/nginx/html/webapp/static /usr/local/nginx/html/webapp/images

EXPOSE 80 443

CMD [&quot;nginx&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="bO4dq"></a></p><h4 id="测试nginx业务镜像" tabindex="-1"><a class="header-anchor" href="#测试nginx业务镜像" aria-hidden="true">#</a> 测试nginx业务镜像</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01:/dockerfile/web/xin-01/nginx<span class="token comment"># docker run -it --rm -p 8888:80 harbor.ceamg.com/xinweb11/nginx-web1:v1.6</span>
<span class="token function">curl</span> http://10.1.0.38:8888
<span class="token function">curl</span> http://10.1.0.38:8888/webapp/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="lL5xN"></a></p><h3 id="_4-ubuntu基础镜像" tabindex="-1"><a class="header-anchor" href="#_4-ubuntu基础镜像" aria-hidden="true">#</a> 4. ubuntu基础镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull ubuntu:20.04
<span class="token function">docker</span> tag docker.io/library/ubuntu:20.04 harbor.ceamg.com/baseimages/ubuntu:20.04
<span class="token function">docker</span> push harbor.ceamg.com/baseimages/ubuntu:20.04
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="mFO0Y"></a></p><h3 id="_5-构建jdk8" tabindex="-1"><a class="header-anchor" href="#_5-构建jdk8" aria-hidden="true">#</a> 5. 构建jdk8</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01:/dockerfile/web/pub-images/jdk<span class="token comment"># pwd</span>
/dockerfile/web/pub-images/jdk

root@harbor01:/dockerfile/web/pub-images/jdk<span class="token comment"># tree </span>
<span class="token builtin class-name">.</span>
├── build-command.sh
├── Dockerfile
├── jdk-8u212-linux-x64.tar.gz
├── jdk-8u341-linux-x64.tar.gz
└── profile


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#JDK Base Image</span>
FROM harbor.ceamg.com/baseimages/ubuntu:20.04

MAINTAINER Ryan <span class="token string">&quot;ryanxin.com&quot;</span>


ADD jdk-8u341-linux-x64.tar.gz /usr/local/src/
RUN <span class="token function">ln</span> <span class="token parameter variable">-sv</span> /usr/local/src/jdk1.8.0_341 /usr/local/jdk
ADD profile /etc/profile

ENV JAVA_HOME /usr/local/jdk
ENV JRE_HOME <span class="token variable">$JAVA_HOME</span>/jre
ENV CLASSPATH <span class="token variable">$JAVA_HOME</span>/lib/:<span class="token variable">$JRE_HOME</span>/lib/
ENV <span class="token environment constant">PATH</span> <span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$JAVA_HOME</span>/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">TAG</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> harbor.ceamg.com/pub-images/jdk8:<span class="token variable">\${TAG}</span> <span class="token builtin class-name">.</span>
<span class="token function">sleep</span> <span class="token number">3</span>
<span class="token function">docker</span> push  harbor.ceamg.com/pub-images/jdk8:<span class="token variable">\${TAG}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># /etc/profile: system-wide .profile file for the Bourne shell (sh(1))</span>
<span class="token comment"># and Bourne compatible shells (bash(1), ksh(1), ash(1), ...).</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${<span class="token environment constant">PS1</span>-}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${<span class="token environment constant">BASH</span>-}</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token environment constant">$BASH</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;/bin/sh&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token comment"># The file bash.bashrc already sets the default PS1.</span>
    <span class="token comment"># PS1=&#39;\\h:\\w\\$ &#39;</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> /etc/bash.bashrc <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token builtin class-name">.</span> /etc/bash.bashrc
    <span class="token keyword">fi</span>
  <span class="token keyword">else</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span>&quot;</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token assign-left variable"><span class="token environment constant">PS1</span></span><span class="token operator">=</span><span class="token string">&#39;# &#39;</span>
    <span class="token keyword">else</span>
      <span class="token assign-left variable"><span class="token environment constant">PS1</span></span><span class="token operator">=</span><span class="token string">&#39;$ &#39;</span>
    <span class="token keyword">fi</span>
  <span class="token keyword">fi</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> /etc/profile.d <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> /etc/profile.d/*.sh<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> <span class="token variable">$i</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token builtin class-name">.</span> <span class="token variable">$i</span>
    <span class="token keyword">fi</span>
  <span class="token keyword">done</span>
  <span class="token builtin class-name">unset</span> i
<span class="token keyword">fi</span>

<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">LANG</span></span><span class="token operator">=</span>en_US.UTF-8
<span class="token builtin class-name">export</span> <span class="token assign-left variable">HISTTIMEFORMAT</span><span class="token operator">=</span><span class="token string">&quot;%F %T <span class="token variable"><span class="token variable">\`</span><span class="token function">whoami</span><span class="token variable">\`</span></span> &quot;</span>

<span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/usr/local/jdk
<span class="token builtin class-name">export</span> <span class="token assign-left variable">JRE_HOME</span><span class="token operator">=</span><span class="token variable">\${JAVA_HOME}</span>/jre
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CLASSPATH</span><span class="token operator">=</span>.:<span class="token variable">\${JAVA_HOME}</span>/lib:<span class="token variable">\${JRE_HOME}</span>/lib
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token variable">\${JAVA_HOME}</span>/bin:<span class="token environment constant">$PATH</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="YzF5w"></a></p><h4 id="测试镜像" tabindex="-1"><a class="header-anchor" href="#测试镜像" aria-hidden="true">#</a> 测试镜像</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01:/dockerfile/web/pub-images/jdk<span class="token comment"># docker run -it --rm harbor.ceamg.com/pub-images/jdk8:3411</span>
root@494e5aeb25af:/<span class="token comment"># java -v</span>
Unrecognized option: <span class="token parameter variable">-v</span>
Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit.
root@494e5aeb25af:/<span class="token comment"># java -version</span>
<span class="token function">java</span> version <span class="token string">&quot;1.8.0_341&quot;</span>
Java<span class="token punctuation">(</span>TM<span class="token punctuation">)</span> SE Runtime Environment <span class="token punctuation">(</span>build <span class="token number">1.8</span>.0_341-b10<span class="token punctuation">)</span>
Java HotSpot<span class="token punctuation">(</span>TM<span class="token punctuation">)</span> <span class="token number">64</span>-Bit Server VM <span class="token punctuation">(</span>build <span class="token number">25.341</span>-b10, mixed mode<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="a5dVg"></a></p><h3 id="_6-构建-tomcat-镜像" tabindex="-1"><a class="header-anchor" href="#_6-构建-tomcat-镜像" aria-hidden="true">#</a> 6. 构建 Tomcat 镜像<br><br></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01:/dockerfile/web/pub-images/tomcat<span class="token comment"># pwd</span>
/dockerfile/web/pub-images/tomcat

root@harbor01:/dockerfile/web/pub-images/tomcat<span class="token comment"># tree</span>
<span class="token builtin class-name">.</span>
├── apache-tomcat-8.5.43.tar.gz
├── build-command.sh
└── Dockerfile


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> harbor.ceamg.com/pub-images/tomcat-base:v8.5.43  <span class="token builtin class-name">.</span>
<span class="token function">sleep</span> <span class="token number">3</span>
<span class="token function">docker</span> push  harbor.ceamg.com/pub-images/tomcat-base:v8.5.43
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#Tomcat 8.5.43基础镜像</span>
FROM harbor.ceamg.com/pub-images/jdk8:3411

MAINTAINER Ryanxin ryanxin@outlook.com

RUN <span class="token function">mkdir</span> /apps /data/tomcat/webapps /data/tomcat/logs <span class="token parameter variable">-pv</span>
ADD apache-tomcat-8.5.43.tar.gz  /apps
RUN <span class="token function">useradd</span> nginx <span class="token parameter variable">-u</span> <span class="token number">2022</span>  <span class="token operator">&amp;&amp;</span> <span class="token function">ln</span> <span class="token parameter variable">-sv</span> /apps/apache-tomcat-8.5.43 /apps/tomcat <span class="token operator">&amp;&amp;</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> nginx.nginx /apps /data <span class="token parameter variable">-R</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="UJ03d"></a></p><h3 id="_7-构建tomcat-业务镜像" tabindex="-1"><a class="header-anchor" href="#_7-构建tomcat-业务镜像" aria-hidden="true">#</a> 7. 构建Tomcat 业务镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01:/dockerfile/web/xin-01/tomcat-app1<span class="token comment"># tree </span>
<span class="token builtin class-name">.</span>
├── app1.tar
├── app1.tar.gz
├── build-command.sh
├── catalina.sh
├── Dockerfile
├── run_tomcat.sh
└── server.xml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#tomcat web1</span>
FROM harbor.ceamg.com/pub-images/tomcat-base:v8.5.43.1

ADD catalina.sh /apps/tomcat/bin/catalina.sh
ADD server.xml /apps/tomcat/conf/server.xml
ADD app1.tar /data/tomcat/webapps/myapp/
ADD run_tomcat.sh /apps/tomcat/bin/run_tomcat.sh
RUN  <span class="token function">mkdir</span> /home/nginx <span class="token parameter variable">-p</span> <span class="token punctuation">\\</span>
 <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> <span class="token number">755</span> /home/nginx <span class="token punctuation">\\</span>
 <span class="token operator">&amp;&amp;</span> <span class="token function">cp</span> <span class="token parameter variable">-a</span> /etc/skel/. /home/nginx <span class="token punctuation">\\</span>
 <span class="token operator">&amp;&amp;</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> nginx.nginx /data/ /apps/


EXPOSE <span class="token number">8080</span> <span class="token number">8443</span>

CMD <span class="token punctuation">[</span><span class="token string">&quot;/apps/tomcat/bin/run_tomcat.sh&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#echo &quot;nameserver 223.6.6.6&quot; &gt; /etc/resolv.conf</span>
<span class="token comment">#echo &quot;192.168.7.248 k8s-vip.example.com&quot; &gt;&gt; /etc/hosts</span>

<span class="token comment">#/usr/share/filebeat/bin/filebeat -e -c /etc/filebeat/filebeat.yml -path.home /usr/share/filebeat -path.config /etc/filebeat -path.data /var/lib/filebeat -path.logs /var/log/filebeat &amp;</span>
<span class="token function">su</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;/apps/tomcat/bin/catalina.sh start&quot;</span> nginx
<span class="token function">tail</span> <span class="token parameter variable">-f</span> /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,43),r={href:"https://www.yuque.com/attachments/yuque/0/2023/xml/33538388/1673854723038-1fb64bbb-a47b-4f74-ac00-bd3214431354.xml?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2023%2Fxml%2F33538388%2F1673854723038-1fb64bbb-a47b-4f74-ac00-bd3214431354.xml%22%2C%22name%22%3A%22server.xml%22%2C%22size%22%3A6462%2C%22ext%22%3A%22xml%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22type%22%3A%22text%2Fxml%22%2C%22taskId%22%3A%22u139d0bf4-5c28-4279-9691-56c5ddd0557%22%2C%22taskType%22%3A%22upload%22%2C%22__spacing%22%3A%22both%22%2C%22mode%22%3A%22title%22%2C%22id%22%3A%22u87658630%22%2C%22margin%22%3A%7B%22top%22%3Atrue%2C%22bottom%22%3Atrue%7D%2C%22card%22%3A%22file%22%7D",target:"_blank",rel:"noopener noreferrer"},d={href:"https://www.yuque.com/attachments/yuque/0/2023/sh/33538388/1673854730922-84c6b682-5e8c-4bfe-97ad-7cd79f876c34.sh?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2023%2Fsh%2F33538388%2F1673854730922-84c6b682-5e8c-4bfe-97ad-7cd79f876c34.sh%22%2C%22name%22%3A%22catalina.sh%22%2C%22size%22%3A23611%2C%22ext%22%3A%22sh%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22type%22%3A%22text%2Fx-sh%22%2C%22taskId%22%3A%22u45ebc374-f725-49d7-980e-219328df912%22%2C%22taskType%22%3A%22upload%22%2C%22__spacing%22%3A%22both%22%2C%22mode%22%3A%22title%22%2C%22id%22%3A%22u54cb5acb%22%2C%22margin%22%3A%7B%22top%22%3Atrue%2C%22bottom%22%3Atrue%7D%2C%22card%22%3A%22file%22%7D",target:"_blank",rel:"noopener noreferrer"},v=i(`<p><a name="dl30s"></a></p><h4 id="测试镜像-1" tabindex="-1"><a class="header-anchor" href="#测试镜像-1" aria-hidden="true">#</a> 测试镜像</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> <span class="token parameter variable">-p</span> <span class="token number">9900</span>:8080 harbor.ceamg.com/xinweb11/tomcat-app1:1.9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/1673854826003-6af01184-b520-4ed6-b187-ecaf9c803a00.png" alt="访问测试" tabindex="0" loading="lazy"><figcaption>访问测试</figcaption></figure><p><a name="IyXG7"></a></p><h3 id="在k8s中跑起来" tabindex="-1"><a class="header-anchor" href="#在k8s中跑起来" aria-hidden="true">#</a> 在k8s中跑起来</h3><p>启动tomcat pod</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token comment">#apiVersion: extensions/v1beta1</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>deployment<span class="token punctuation">-</span>label
  <span class="token key atrule">name</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>deployment
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>web
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>selector
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>selector
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>container
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/xinweb11/tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">:</span><span class="token number">1.9</span>
        <span class="token comment">#command: [&quot;/apps/tomcat/bin/run_tomcat.sh&quot;]</span>
        <span class="token comment">#imagePullPolicy: IfNotPresent</span>
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
          <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
          <span class="token key atrule">name</span><span class="token punctuation">:</span> http
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;password&quot;</span>
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;123456&quot;</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;age&quot;</span>
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;18&quot;</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token number">1</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">&quot;512Mi&quot;</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 500m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">&quot;512Mi&quot;</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>images
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/local/nginx/html/webapp/images
          <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>static
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/local/nginx/html/webapp/static
          <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>images
        <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
          <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.1.0.38
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s/web1/images
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>static
        <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
          <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.1.0.38
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s/web1/static
<span class="token comment">#      nodeSelector:</span>
<span class="token comment">#        project: xin</span>
<span class="token comment">#        app: tomcat</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>service<span class="token punctuation">-</span>label
  <span class="token key atrule">name</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>service
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>web
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">40003</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>selector
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>检测后端Tomcat SVC 连通性</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ping</span> xin-tomcat-app1-service.xin-web.svc.ceamg.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/1673869796202-9de30c77-d621-466e-ab4c-e8a5060d9ed9.png" alt="检测后端TomcatSVC连通性" tabindex="0" loading="lazy"><figcaption>检测后端TomcatSVC连通性</figcaption></figure><p>启动nginx pod</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> web1<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>deployment<span class="token punctuation">-</span>label
  <span class="token key atrule">name</span><span class="token punctuation">:</span> web1<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>deployment
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>web
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> web1<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>selector
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> web1<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>selector
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> web1<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>container
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/xinweb11/nginx<span class="token punctuation">-</span>web1<span class="token punctuation">:</span>v1.0
        <span class="token comment">#command: [&quot;/apps/tomcat/bin/run_tomcat.sh&quot;]</span>
        <span class="token comment">#imagePullPolicy: IfNotPresent</span>
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
          <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
          <span class="token key atrule">name</span><span class="token punctuation">:</span> http
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">443</span>
          <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
          <span class="token key atrule">name</span><span class="token punctuation">:</span> https
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;password&quot;</span>
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;123456&quot;</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;age&quot;</span>
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;20&quot;</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token number">2</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 2Gi
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 500m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 1Gi

        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>images
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/local/nginx/html/webapp/images
          <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>static
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/local/nginx/html/webapp/static
          <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>images
        <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
          <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.1.0.38
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s/web1/images
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>static
        <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
          <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.1.0.38
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s/web1/static
      <span class="token comment">#nodeSelector:</span>
      <span class="token comment">#  group: magedu</span>



<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> web1<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>service<span class="token punctuation">-</span>label
  <span class="token key atrule">name</span><span class="token punctuation">:</span> web1<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>service
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>web
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">40002</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> https
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">443</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">40443</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> web1<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>selector
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nginx 配置文件启用location 和 upstream 后端主机</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>upstream  tomcat_webserver <span class="token punctuation">{</span>
        server   xin-tomcat-app1-service.xin-web.svc.ceamg.local:80<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

    server <span class="token punctuation">{</span>
        listen       <span class="token number">80</span><span class="token punctuation">;</span>
        server_name  localhost<span class="token punctuation">;</span>

        <span class="token comment">#charset koi8-r;</span>

        <span class="token comment">#access_log  logs/host.access.log  main;</span>

        location / <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        location /webapp <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        location /myapp <span class="token punctuation">{</span>
             proxy_pass  http://tomcat_webserver<span class="token punctuation">;</span>
             proxy_set_header   Host    <span class="token variable">$host</span><span class="token punctuation">;</span>
             proxy_set_header   X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span>
            proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://cdn1.ryanxin.live/1673872226767-dd34b982-4e75-4aa6-b700-eb761d4f4dfd.png" alt="访问测试" loading="lazy"><br><img src="http://cdn1.ryanxin.live/1673872214571-9e2fc591-cfbb-4368-8d65-1072d5a9b297.png" alt="访问测试" loading="lazy"></p>`,16);function m(k,b){const s=c("ExternalLinkIcon");return l(),p("div",null,[u,n("p",null,[n("a",r,[a("server.xml"),e(s)])]),n("p",null,[n("a",d,[a("catalina.sh"),e(s)])]),v])}const g=t(o,[["render",m],["__file","kubernetes-5.html.vue"]]);export{g as default};
