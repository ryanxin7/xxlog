<template><div><h1 id="使用nginx构建文件仓库" tabindex="-1"><a class="header-anchor" href="#使用nginx构建文件仓库" aria-hidden="true">#</a> 使用Nginx构建文件仓库</h1>
<p>使用<code v-pre>Nginx autoindex</code> 配置一个文件下载站点，将一些常用的安装包放上去，以提供用户下载，适用于公司部门内部软件分享这种类似的工作，比 FTP 配置简单，能实现限制速度等，只是上传需要手动上传到服务器。</p>
<h2 id="编译安装nginx" tabindex="-1"><a class="header-anchor" href="#编译安装nginx" aria-hidden="true">#</a> 编译安装Nginx</h2>
<p>服务器版本为：Ubuntu 20.4</p>
<p>1、新建项目目录，其规划如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/<span class="token punctuation">{</span>logs,packages,services,backup,shell<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>目录规划说明如下：</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token operator">/</span>data<span class="token operator">/</span>       <span class="token comment">// 用户工作目录</span>
├── backup   <span class="token comment">// 文件，数据备份目录</span>
├── logs     <span class="token comment">// 日志目录</span>
├── packages <span class="token comment">// 安装包存放目录</span>
├── services <span class="token comment">// 服务安装目录</span>
└── shell    <span class="token comment">// 脚本存放目录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、安装服务编译所需依赖：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span>  <span class="token function">zip</span> <span class="token function">unzip</span> gcc gcc-c++ automake autoconf libtool <span class="token function">make</span> glibc gd-devel pcre-devel libmcrypt-devel mhash-devel libxslt-devel libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel libxml2 libxml2-devel zlib zlib-devel glibc glibc-devel glib2 glib2-devel <span class="token function">bzip2</span> bzip2-devel ncurses ncurses-devel <span class="token function">curl</span> curl-devel e2fsprogs e2fsprogs-devel krb5 krb5-devel libidn libidn-devel openssl openssl-devel libevent libevent-devel GeoIP GeoIP-devel GeoIP-data 
libssl-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>3、下载安装包并查看参数：</p>
<p>使用当前最新稳定版 <code v-pre>nginx 1.20.2</code></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code># 创建下载目录并下载安装包
cd /data/packages/
mkdir nginx-1.20.2
cd nginx-1.20.2/
wget http://nginx.org/download/nginx-1.20.2.tar.gz

# 解压并查看编译参数
tar -zxf nginx-1.20.2.tar.gz 
cd nginx-1.20.2
./configure --help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、需要准备的其它包</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code># PCRE
https://ftp.pcre.org/pub/pcre/

# Zlib
http://www.zlib.net/

# Openssl
https://www.openssl.org/source/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，安装包包含如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>/data/packages/
└── nginx-1.20.2
    ├── nginx-1.20.2.tar.gz
    ├── openssl-3.0.1.tar.gz
    ├── pcre-8.45.tar.gz
    └── zlib-1.2.11.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5、基本的编译安装参数：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 解压依赖包</span>
<span class="token builtin class-name">cd</span> /data/packages/
<span class="token function">tar</span> <span class="token parameter variable">-zxf</span> pcre-8.45.tar.gz 
<span class="token function">tar</span> <span class="token parameter variable">-zxf</span> openssl-3.0.1.tar.gz 
<span class="token function">tar</span> <span class="token parameter variable">-zxf</span> zlib-1.2.11.tar.gz 
<span class="token builtin class-name">cd</span> nginx-1.20.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>6、编译安装</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code># 编译安装
./configure --prefix=/data/services/nginx \
--user=root \
--group=root \
--with-http_stub_status_module \
--with-http_gzip_static_module \
--with-http_secure_link_module \
--with-http_flv_module \
--with-http_ssl_module \
--with-http_mp4_module \
--with-stream \
--with-http_realip_module \
--with-http_geoip_module \
--with-http_v2_module \
--with-http_sub_module \
--with-http_image_filter_module \
--with-pcre=/data/packages/nginx-1.20.2/pcre-8.45 \
--with-openssl=/data/packages/nginx-1.20.2/openssl-1.1.1g \
--with-zlib=/data/packages/nginx-1.20.2/zlib-1.2.11
make &amp;&amp; make install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>7、启动服务并访问测试：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>/data/services/nginx/sbin/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="定制归档前端主题" tabindex="-1"><a class="header-anchor" href="#定制归档前端主题" aria-hidden="true">#</a> 定制归档前端主题</h2>
<h3 id="添加模块" tabindex="-1"><a class="header-anchor" href="#添加模块" aria-hidden="true">#</a> 添加模块</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 文件下载界面美化模块</span>
https://github.com/aperezdc/ngx-fancyindex
<span class="token function">unzip</span> ngx-fancyindex-master.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重新编译" tabindex="-1"><a class="header-anchor" href="#重新编译" aria-hidden="true">#</a> 重新编译</h3>
<p><code v-pre>不安装，不安装，不安装</code></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>./configure --prefix=/data/services/nginx \
--user=root \
--group=root \
--with-http_stub_status_module \
--with-http_gzip_static_module \
--with-http_secure_link_module \
--with-http_flv_module \
--with-http_ssl_module \
--with-http_mp4_module \
--with-stream \
--with-http_realip_module \
--with-http_geoip_module \
--with-http_v2_module \
--with-http_sub_module \
--with-http_image_filter_module \
--with-pcre=/data/packages/nginx-1.20.2/pcre-8.45 \
--with-openssl=/data/packages/nginx-1.20.2/openssl-3.0.1 \
--with-zlib=/data/packages/nginx-1.20.2/zlib-1.2.11 \
--add-module=/data/packages/nginx-1.20.2/ngx-fancyindex-master

# 只编译，不安装
make
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="备份旧版本并替换" tabindex="-1"><a class="header-anchor" href="#备份旧版本并替换" aria-hidden="true">#</a> 备份旧版本并替换</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /data/services/nginx/sbin/
<span class="token function">mv</span> nginx nginx_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%F<span class="token variable">)</span></span>
<span class="token function">cp</span> /data/packages/nginx-1.20.2/nginx-1.20.2/objs/nginx <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、查看编译参数并重载" tabindex="-1"><a class="header-anchor" href="#_4、查看编译参数并重载" aria-hidden="true">#</a> 4、查看编译参数并重载：</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code># 查看编译参数
/data/services/nginx/sbin/nginx -V

# 停止服务再启动，否则模块可能无法加载
/data/services/nginx/sbin/nginx -s stop
/data/services/nginx/sbin/nginx
到此，动态添加编译参数完成！
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5、编译参数说明</p>
<table>
<thead>
<tr>
<th>配置</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>--prefix=PATH</td>
<td>指定安装路径，默认 /usr/local/nginx</td>
</tr>
<tr>
<td>--sbin-path=PATH</td>
<td>指定二进制命令的路径，默认安装目录下 sbin 目录</td>
</tr>
<tr>
<td>--modules-path=PATH</td>
<td>指定模块的路径，默认安装目录下 modules 目录</td>
</tr>
<tr>
<td>--conf-path=PATH</td>
<td>指定 nginx.conf 配置文件路径，默认安装目录下 conf 目录</td>
</tr>
<tr>
<td>--error-log-path=PATH</td>
<td>指定错误日志路径，默认安装目录下 logs 目录</td>
</tr>
<tr>
<td>--pid-path=PATH</td>
<td>指定 nginx.pid 路径，默认安装目录下 logs 目录</td>
</tr>
<tr>
<td>--lock-path=PATH</td>
<td>指定 nginx.lock 路径，默认安装目录下 logs 目录</td>
</tr>
<tr>
<td>--user=USER</td>
<td>指定运行用户</td>
</tr>
<tr>
<td>--group=GROUP</td>
<td>指定运行用户组</td>
</tr>
<tr>
<td>--with-threads</td>
<td>使用线程池</td>
</tr>
<tr>
<td>--with-file-aio</td>
<td>Linux 上允许使用异步文件I/O（AIO）</td>
</tr>
<tr>
<td>--with-http_ssl_module</td>
<td>启用 SSL 模块</td>
</tr>
<tr>
<td>--with-http_v2_module</td>
<td>支持 HTTP/2</td>
</tr>
<tr>
<td>--with-http_realip_module</td>
<td>将客户端IP更改为指定的头字段中发送的地址</td>
</tr>
<tr>
<td>--with-http_addition_module</td>
<td>在响应前后加上text的功能</td>
</tr>
<tr>
<td>--with-http_xslt_module</td>
<td>过滤转换 XML 请求</td>
</tr>
<tr>
<td>--with-http_image_filter_module</td>
<td>传输 JPEG/GIF/PNG 图片的一个过滤器</td>
</tr>
<tr>
<td>--with-http_geoip_module</td>
<td>创建变量，使用预编译的MaxMind数据库解析客户端IP地址，得到变量值</td>
</tr>
<tr>
<td>--with-http_sub_module</td>
<td>通过指定一个字符串替换另外一个字符串达到修改响应的目的</td>
</tr>
<tr>
<td>--with-http_dav_module</td>
<td>通过WebDAV的提供的管理协议自动化文件</td>
</tr>
<tr>
<td>--with-http_flv_module</td>
<td>为闪存视频（FLV）提供文件伪流式服务器端</td>
</tr>
<tr>
<td>--with-http_mp4_module</td>
<td>为MP4提供文件伪流式服务器端</td>
</tr>
<tr>
<td>--with-http_gunzip_module</td>
<td>为不支持 gzip 编码方法的客户端提供解压缩响应</td>
</tr>
<tr>
<td>--with-http_gzip_static_module</td>
<td>使用 gz 在线实时压缩输出数据流</td>
</tr>
<tr>
<td>--with-http_auth_request_module</td>
<td>客户端授权认证模块</td>
</tr>
<tr>
<td>--with-http_random_index_module</td>
<td>处理以斜线字符 / 结尾的请求，并在目录中选择一个随机文件作为索引文件</td>
</tr>
<tr>
<td>--with-http_secure_link_module</td>
<td>计算和检查要求所需的安全链接网址</td>
</tr>
<tr>
<td>--with-http_degradation_module</td>
<td>允许在内存不足的情况下返回204或444码</td>
</tr>
<tr>
<td>--with-http_slice_module</td>
<td>将请求拆分为子请求</td>
</tr>
<tr>
<td>--with-http_stub_status_module</td>
<td>访问基本状态信息</td>
</tr>
<tr>
<td>--with-http_perl_module</td>
<td>启动perl模块</td>
</tr>
<tr>
<td>--with-perl_modules_path=PATH</td>
<td>指定perl模块路径</td>
</tr>
<tr>
<td>--with-perl=PATH</td>
<td>配置 perl 二进制路径</td>
</tr>
<tr>
<td>--http-log-path=PATH</td>
<td>指定 access log 路径</td>
</tr>
<tr>
<td>--with-mail</td>
<td>启用邮件 POP3/IMAP4/SMTP 代理</td>
</tr>
<tr>
<td>--with-mail_ssl_module</td>
<td>启用邮件 SSL 模块</td>
</tr>
<tr>
<td>--with-stream</td>
<td>启用 TCP/UDP 代理</td>
</tr>
<tr>
<td>--with-stream_ssl_module</td>
<td>启用 TCP/UDP SSL 代理</td>
</tr>
<tr>
<td>--with-stream_realip_module</td>
<td>启用 TCP/UDP realip 模块</td>
</tr>
<tr>
<td>--with-stream_geoip_module</td>
<td>启用 TCP/UDP geoip 模块</td>
</tr>
<tr>
<td>--add-module=PATH</td>
<td>添加扩展模块</td>
</tr>
<tr>
<td>--with-pcre</td>
<td>强制使用PCRE库</td>
</tr>
<tr>
<td>--with-pcre=DIR</td>
<td>设置 pcre 位置</td>
</tr>
<tr>
<td>--with-zlib=DIR</td>
<td>设置 zlib 位置</td>
</tr>
<tr>
<td>--with-openssl=DIR</td>
<td>设置 openssl 位置</td>
</tr>
</tbody>
</table>
<br>
<h2 id="服务配置文件" tabindex="-1"><a class="header-anchor" href="#服务配置文件" aria-hidden="true">#</a> 服务配置文件</h2>
<h3 id="初始状态" tabindex="-1"><a class="header-anchor" href="#初始状态" aria-hidden="true">#</a> 初始状态</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen      <span class="token number">80</span><span class="token punctuation">;</span>
    server_name localhost<span class="token punctuation">;</span>

    location ^~ /download <span class="token punctuation">{</span>
        charset utf-8<span class="token punctuation">;</span>
        <span class="token builtin class-name">alias</span>   /data/packages/nginx-1.20.2<span class="token punctuation">;</span>
        <span class="token comment"># 目录索引和时间配置</span>
        autoindex             on<span class="token punctuation">;</span>
        autoindex_exact_size  on<span class="token punctuation">;</span>
        autoindex_localtime   on<span class="token punctuation">;</span>

        <span class="token comment"># 下载文件类型限制，我们这里允许常见的文档，压缩包下载</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$request_filename</span> ~* ^.*?<span class="token punctuation">\</span>.<span class="token punctuation">(</span>txt<span class="token operator">|</span>log<span class="token operator">|</span>pdf<span class="token operator">|</span>doc<span class="token operator">|</span>docx<span class="token operator">|</span>xls<span class="token operator">|</span>xlsx<span class="token operator">|</span>ppt<span class="token operator">|</span>pptx<span class="token operator">|</span><span class="token function">rar</span><span class="token operator">|</span><span class="token function">zip</span><span class="token operator">|</span>tar.gz<span class="token operator">|</span>tar.xz<span class="token operator">|</span>bz2<span class="token operator">|</span>iso<span class="token punctuation">)</span>$ <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            add_header  Content-Disposition attachment<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    location / <span class="token punctuation">{</span>
        <span class="token builtin class-name">return</span> <span class="token number">403</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="ui美化" tabindex="-1"><a class="header-anchor" href="#ui美化" aria-hidden="true">#</a> UI美化</h3>
<p>在安装 Nginx 的时候加入了 <code v-pre>ngx-fancyindex</code> 包，这个包就主要用于界面美化，新增配置如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen      <span class="token number">80</span><span class="token punctuation">;</span>
    server_name localhost<span class="token punctuation">;</span>

    location ^~ /download <span class="token punctuation">{</span>
        charset utf-8<span class="token punctuation">;</span>
        <span class="token builtin class-name">alias</span>   /data/packages/nginx-1.20.2<span class="token punctuation">;</span>
        
        <span class="token comment"># 目录索引和时间配置</span>
        fancyindex             on<span class="token punctuation">;</span>
        fancyindex_exact_size  on<span class="token punctuation">;</span>
        fancyindex_localtime   on<span class="token punctuation">;</span>

        <span class="token comment"># 下载文件类型限制，我们这里允许常见的文档，压缩包下载</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$request_filename</span> ~* ^.*?<span class="token punctuation">\</span>.<span class="token punctuation">(</span>txt<span class="token operator">|</span>log<span class="token operator">|</span>pdf<span class="token operator">|</span>doc<span class="token operator">|</span>docx<span class="token operator">|</span>xls<span class="token operator">|</span>xlsx<span class="token operator">|</span>ppt<span class="token operator">|</span>pptx<span class="token operator">|</span><span class="token function">rar</span><span class="token operator">|</span><span class="token function">zip</span><span class="token operator">|</span>tar.gz<span class="token operator">|</span>tar.xz<span class="token operator">|</span>bz2<span class="token operator">|</span>iso<span class="token punctuation">)</span>$ <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            add_header  Content-Disposition attachment<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    location / <span class="token punctuation">{</span>
        <span class="token builtin class-name">return</span> <span class="token number">403</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="ui高级定制" tabindex="-1"><a class="header-anchor" href="#ui高级定制" aria-hidden="true">#</a> UI高级定制</h3>
<p>这个主题是个人根据 GITHUB 别人分享的进行修改的，原主题的地址为：</p>
<blockquote>
<p><a href="https://github.com/alehaa/nginx-fancyindex-flat-theme" target="_blank" rel="noopener noreferrer">https://github.com/alehaa/nginx-fancyindex-flat-theme<ExternalLinkIcon/></a></p>
</blockquote>
<p>修改后的主题下载地址：</p>
<blockquote>
<p><a href="https://gitee.com/KU4NG/nginx-fancyindex-theme" target="_blank" rel="noopener noreferrer">https://gitee.com/KU4NG/nginx-fancyindex-theme<ExternalLinkIcon/></a></p>
</blockquote>
<p><strong>使用方法</strong>：</p>
<p>1、下载代码，将目录中的 theme 目录上传到 nginx 的根目录：</p>
<p>2、增加 nginx 配置：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>    server <span class="token punctuation">{</span>
    listen      <span class="token number">80</span><span class="token punctuation">;</span>
    server_name localhost<span class="token punctuation">;</span>

    location ^~ /download <span class="token punctuation">{</span>
        charset utf-8<span class="token punctuation">;</span>
        <span class="token builtin class-name">alias</span>   /data/packages/nginx-1.20.2<span class="token punctuation">;</span>
        
        fancyindex             on<span class="token punctuation">;</span>
        fancyindex_header      <span class="token string">"/theme/header.html"</span><span class="token punctuation">;</span>
        fancyindex_footer      <span class="token string">"/theme/footer.html"</span><span class="token punctuation">;</span>
        fancyindex_show_path   off<span class="token punctuation">;</span>
        fancyindex_name_length <span class="token number">255</span><span class="token punctuation">;</span>
        fancyindex_exact_size  off<span class="token punctuation">;</span>
        fancyindex_localtime   on<span class="token punctuation">;</span>

        <span class="token comment"># 下载文件类型限制，我们这里允许常见的文档，压缩包下载</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$request_filename</span> ~* ^.*?<span class="token punctuation">\</span>.<span class="token punctuation">(</span>txt<span class="token operator">|</span>log<span class="token operator">|</span>pdf<span class="token operator">|</span>doc<span class="token operator">|</span>docx<span class="token operator">|</span>xls<span class="token operator">|</span>xlsx<span class="token operator">|</span>ppt<span class="token operator">|</span>pptx<span class="token operator">|</span><span class="token function">rar</span><span class="token operator">|</span><span class="token function">zip</span><span class="token operator">|</span>tar.gz<span class="token operator">|</span>tar.xz<span class="token operator">|</span>bz2<span class="token operator">|</span>iso<span class="token punctuation">)</span>$ <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            add_header  Content-Disposition attachment<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    location /theme <span class="token punctuation">{</span>
        <span class="token builtin class-name">alias</span>  /data/services/nginx/theme<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    location / <span class="token punctuation">{</span>
        <span class="token builtin class-name">return</span> <span class="token number">403</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
配置主要增加了 theme 目录所在的位置，头文件和底部文件的引入。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_4、其他说明" tabindex="-1"><a class="header-anchor" href="#_4、其他说明" aria-hidden="true">#</a> 4、其他说明</h3>
<p><strong>关于自定义说明</strong>：</p>
<ul>
<li>如果想要修改顶部和底部的文字，可以修改 header.html 和 footer.html。</li>
<li>如果想要修改 CSS，可以修改 theme 目录下的 theme.css。</li>
<li>如果想修改 logo 可以替换 theme 目录下的图片。</li>
</ul>
<p>转自 <a href="http://nginx.ezops.cn/#/src/01/%E7%BE%8E%E5%8C%96%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD" target="_blank" rel="noopener noreferrer">美化文件下载 (ezops.cn)<ExternalLinkIcon/></a></p>
</div></template>


