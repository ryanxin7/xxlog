<template><div><h1 id="lnmp网站架构实战" tabindex="-1"><a class="header-anchor" href="#lnmp网站架构实战" aria-hidden="true">#</a> LNMP网站架构实战</h1>
<nav class="table-of-contents"><ul><li><router-link to="#_1-实施步骤说明">1. 实施步骤说明</router-link><ul><li><router-link to="#_1-1-nginx-模块回顾">1.1 Nginx 模块回顾</router-link></li><li><router-link to="#_1-2-企业应用-网站-location应用案例">1.2 企业应用: 网站 location应用案例</router-link></li><li><router-link to="#_1-3-网站页面跳转功能">1.3 网站页面跳转功能</router-link></li></ul></li><li><router-link to="#_2-lnmp-架构介绍">2.  LNMP 架构介绍</router-link></li><li><router-link to="#_3-网站的-lnmp-架构部署">3. 网站的 LNMP 架构部署</router-link><ul><li><router-link to="#_3-1创建虚拟用户和根目录">3.1创建虚拟用户和根目录</router-link></li><li><router-link to="#_3-2-编写-nginx-配置文件">3.2 编写 Nginx 配置文件</router-link></li><li><router-link to="#_3-3-安装数据库软件">3.3 安装数据库软件</router-link></li></ul></li><li><router-link to="#_4-php服务部署流程">4. PHP服务部署流程</router-link><ul><li><router-link to="#_4-1-更新-源卸载系统自带的php软件">4.1 更新 源卸载系统自带的PHP软件</router-link></li><li><router-link to="#_4-2-安装-php">4.2 安装 PHP</router-link></li><li><router-link to="#_4-3-编写配置文件">4.3 编写配置文件</router-link></li></ul></li><li><router-link to="#_5-实现-lnmp-架构服务之间建立关系">5. 实现 LNMP 架构服务之间建立关系</router-link><ul><li><router-link to="#_5-1-实现-nginx与-php-建立关系">5.1 实现 Nginx与 PHP 建立关系</router-link></li><li><router-link to="#_5-2-编写动态资源文件测试页面">5.2 编写动态资源文件测试页面</router-link></li></ul></li><li><router-link to="#_6-实现-php-与数据库建立关系">6. 实现 PHP 与数据库建立关系</router-link><ul><li><router-link to="#_6-1-编写-php-连接数据库测试文件">6.1 编写 PHP 连接数据库测试文件</router-link></li><li><router-link to="#_6-2-访问测试">6.2 访问测试</router-link></li></ul></li><li><router-link to="#_7-部署搭建网站页面-代码上线">7. 部署搭建网站页面 代码上线</router-link><ul><li><router-link to="#_7-1-常用的开源源码网站">7.1 常用的开源源码网站</router-link></li><li><router-link to="#_7-3-将源码解压后放入到站点目录中">7.3 将源码解压后放入到站点目录中</router-link></li><li><router-link to="#_7-4-进行网站页面初始化操作">7.4 进行网站页面初始化操作</router-link></li><li><router-link to="#_7-5-对数据库服务进行配置">7.5 对数据库服务进行配置</router-link></li></ul></li><li><router-link to="#_8-常见问题解决">8. 常见问题解决</router-link></li></ul></nav>
<h2 id="_1-实施步骤说明" tabindex="-1"><a class="header-anchor" href="#_1-实施步骤说明" aria-hidden="true">#</a> 1. 实施步骤说明</h2>
<br>
<br>
<div class="hint-container tip">
<p class="hint-container-title">服务实施步骤</p>
<ul>
<li>了解LNMP架构的组成作用</li>
<li>架构的部署</li>
<li>架构通讯原理</li>
<li>LNMP服务之间如何建立管理</li>
<li>运维人员代码上线</li>
<li>NFS服务器和Web服务器建立联系</li>
<li>数据库、存储远端迁移</li>
</ul>
</div>
<br>
<br>
<h3 id="_1-1-nginx-模块回顾" tabindex="-1"><a class="header-anchor" href="#_1-1-nginx-模块回顾" aria-hidden="true">#</a> 1.1 Nginx 模块回顾</h3>
<br>
<p><strong>Nginx 服务的企业应用 (nginx模块)</strong></p>
<ul>
<li>
<p>实现网站页面目录索引功能  (yum仓库搭建)</p>
</li>
<li>
<p>实现网站访问别名功能     server_name</p>
</li>
</ul>
<br>
<br>
<p><strong>实现网站页面用户访问监控</strong></p>
<p><code v-pre>keepalived_timeout 65s</code></p>
<ul>
<li>
<p>HTTP请求报文: 请求头---connection: keepalived.../closed 短连接</p>
</li>
<li>
<p>HTTP响应报文: 响应头---connection: closed 短连接</p>
</li>
<li>
<p>VPN---无法访问外网/xshell无法远程连接</p>
</li>
</ul>
<br>
   <br>
<p><strong>实现网站服务日志功能配置</strong></p>
<p>错误日志: 错误日志级别</p>
<p>访问日志: 日志的格式信息 自动化分析日志(ELK 三个软件)</p>
  <br>
  <br>
<p><strong>根据用户访问uri进行匹配处理</strong></p>
<ul>
<li>
<p><code v-pre>location = xxx</code>    精确匹配			优先级01</p>
</li>
<li>
<p><code v-pre>location ^~ xxx</code>   优先匹配   		    优先级02</p>
</li>
<li>
<p><code v-pre>location ~</code>        区分大小写匹配 	优先级03</p>
</li>
<li>
<p>​	 <code v-pre>location ~*</code>  	   不区分大小写		优先级03</p>
</li>
<li>
<p>​	 <code v-pre>location uri</code> 	   根据uri进行匹配	优先级03</p>
</li>
<li>
<p>​	 <code v-pre>location /</code> 	   默认匹配        	     优先级最低</p>
</li>
</ul>
<p>​</p>
  <br>
  <br>
<h3 id="_1-2-企业应用-网站-location应用案例" tabindex="-1"><a class="header-anchor" href="#_1-2-企业应用-网站-location应用案例" aria-hidden="true">#</a> 1.2 企业应用: 网站 location应用案例</h3>
<p>例如在活动时期打折促销，网站的页面信息和平常不一样。我们不可能把平常的页面为活动直接进行修改，这时我们就需要调用一个专门在活动时上线的页面作为主站广告。
<br></p>
<p><strong>有两个站点目录:</strong></p>
<ul>
<li>平常网站的站点目录   <code v-pre>/html/jd-normal</code></li>
<li>节日网站的站点目录   <code v-pre>/html/jd-teshu</code></li>
<li>​    <code v-pre>location / { root /html/jd-normal }</code></li>
<li><code v-pre>  location / 特殊	 { root /html/jd-teshu }</code></li>
</ul>
<br>
  <br>
<h3 id="_1-3-网站页面跳转功能" tabindex="-1"><a class="header-anchor" href="#_1-3-网站页面跳转功能" aria-hidden="true">#</a> 1.3 网站页面跳转功能</h3>
<p>​</p>
<p>第一种方法：</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span>
<span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">rewrite</span> ^/(.*)$ https://www.ryanxin.com/<span class="token variable">$1</span> permanent</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p>第二种方法：</p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span>
<span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://www.ryanxin.com</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h2 id="_2-lnmp-架构介绍" tabindex="-1"><a class="header-anchor" href="#_2-lnmp-架构介绍" aria-hidden="true">#</a> 2.  LNMP 架构介绍</h2>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-LinuxLNMP-2.png" alt="LNMP-2" tabindex="0" loading="lazy"><figcaption>LNMP-2</figcaption></figure>
<br>
<br>
<p><strong>L  代表 Linux系统</strong></p>
<p><strong>注意:</strong></p>
<ul>
<li><code v-pre>selinux</code>必须关闭  防火墙关闭</li>
<li><code v-pre>/tmp 1777 mysql</code> 服务无法启动</li>
</ul>
<br>
<p><strong>N 代表 Nginx服务</strong></p>
<p><strong>作用:</strong></p>
<p>处理用户的静态请求 <code v-pre>html</code> <code v-pre>jpg</code> <code v-pre>txt</code> <code v-pre>mp4/avi</code></p>
<br>
<p><strong>P  代表  php 服务</strong></p>
<p><strong>作用:</strong></p>
<ul>
<li>
<p>处理动态的页面请求</p>
</li>
<li>
<p>负责和数据库建立关系</p>
<br>
</li>
</ul>
<p><strong>M  代表  mysql服务部署</strong></p>
<br>
<p><strong>作用:</strong></p>
<p>存储用户的字符串数据信息</p>
<br>
<br>
<h2 id="_3-网站的-lnmp-架构部署" tabindex="-1"><a class="header-anchor" href="#_3-网站的-lnmp-架构部署" aria-hidden="true">#</a> 3. 网站的 LNMP 架构部署</h2>
<h3 id="_3-1创建虚拟用户和根目录" tabindex="-1"><a class="header-anchor" href="#_3-1创建虚拟用户和根目录" aria-hidden="true">#</a> 3.1创建虚拟用户和根目录</h3>
<p><strong>创建用户</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">useradd</span> <span class="token parameter variable">-M</span> <span class="token parameter variable">-s</span> /sbin/nologin www <span class="token parameter variable">-u</span> <span class="token number">1002</span>
<span class="token function">id</span> www
systemctl restart nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>创建战点根目录</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /html/bbs/
<span class="token function">chown</span> <span class="token parameter variable">-R</span> www.www /html/bbs/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_3-2-编写-nginx-配置文件" tabindex="-1"><a class="header-anchor" href="#_3-2-编写-nginx-配置文件" aria-hidden="true">#</a> 3.2 编写 Nginx 配置文件</h3>
<br>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">vim</span> /etc/nginx/nginx.conf

server</span> <span class="token punctuation">{</span>
<span class="token directive"><span class="token keyword">server_name</span>    ryanxin.com</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">rewrite</span> ^/(.*) http://www.ryanxin.com/<span class="token variable">$1</span> permanent</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
      <span class="token directive"><span class="token keyword">listen</span>    <span class="token number">80</span></span><span class="token punctuation">;</span>
      <span class="token directive"><span class="token keyword">server_name</span>   www.ryanxin.com</span><span class="token punctuation">;</span>
      <span class="token directive"><span class="token keyword">error_page</span>    <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span> /50x.html</span><span class="token punctuation">;</span>
      <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
      <span class="token directive"><span class="token keyword">root</span>  /html/bbs</span><span class="token punctuation">;</span>
      <span class="token directive"><span class="token keyword">index</span>   index.html</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_3-3-安装数据库软件" tabindex="-1"><a class="header-anchor" href="#_3-3-安装数据库软件" aria-hidden="true">#</a> 3.3 安装数据库软件</h3>
<br>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> mariadb-server mariadb <span class="token parameter variable">-y</span>

<span class="token comment">#补充: 数据库初始化过程 mysql_install_db</span>
	
<span class="token parameter variable">--basedir</span><span class="token operator">=</span>path       The path to the MariaDB installation directory.
	                     <span class="token comment">#指定mysql程序目录</span>
<span class="token parameter variable">--datadir</span><span class="token operator">=</span>path       The path to the MariaDB data directory.
	                     <span class="token comment">#指定数据信息保存的目录</span>
<span class="token parameter variable">--user</span><span class="token operator">=</span>mysql             <span class="token comment">#让mysql管理数据目录  700	</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p><strong>创建数据库的密码信息:</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>/application/mysql/bin/mysqladmin <span class="token parameter variable">-u</span> root      password <span class="token string">'new-password'</span>  <span class="token comment"># 给本地数据库设置密码</span>
/application/mysql/bin/mysqladmin <span class="token parameter variable">-u</span> root <span class="token parameter variable">-h</span> web01 password <span class="token string">'new-password'</span>  <span class="token comment"># 给远程数据库设置密码</span>

mysqladmin <span class="token parameter variable">-u</span> root  password <span class="token string">'xin123'</span>    --- 设置密码  	
mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-pxin123</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>启动数据库服务</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl start mariadb.service 
systemctl <span class="token builtin class-name">enable</span> mariadb.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h2 id="_4-php服务部署流程" tabindex="-1"><a class="header-anchor" href="#_4-php服务部署流程" aria-hidden="true">#</a> 4. PHP服务部署流程</h2>
<br>
<h3 id="_4-1-更新-源卸载系统自带的php软件" tabindex="-1"><a class="header-anchor" href="#_4-1-更新-源卸载系统自带的php软件" aria-hidden="true">#</a> 4.1 更新 源卸载系统自带的PHP软件</h3>
<p>​	<br></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum remove php-mysql php php-fpm php-common	
<span class="token function">rpm</span> <span class="token parameter variable">-Uvh</span> https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-Uvh</span> https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_4-2-安装-php" tabindex="-1"><a class="header-anchor" href="#_4-2-安装-php" aria-hidden="true">#</a> 4.2 安装 PHP</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> php71w php71w-cli php71w-common php71w-devel php71w-embedded php71w-gd php71w-mcrypt php71w-mbstring php71w-pdo php71w-xml php71w-fpm php71w-mysqlnd php71w-opcache php71w-pecl-memcached php71w-pecl-redis php71w-pecl-mongodb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<br>
<h3 id="_4-3-编写配置文件" tabindex="-1"><a class="header-anchor" href="#_4-3-编写配置文件" aria-hidden="true">#</a> 4.3 编写配置文件</h3>
<div class="language-BASH line-numbers-mode" data-ext="BASH"><pre v-pre class="language-BASH"><code>vim /etc/php-fpm.d/www.conf
user = www  
group = www
#保证nginx进程的管理用户和php服务进程的管理用户保持一致
systemctl start php-fpm 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p><strong>LNMP 服务间调用图</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-LinuxLNMP-1.png" alt="LNMP-1" tabindex="0" loading="lazy"><figcaption>LNMP-1</figcaption></figure>
<br>
<p>Nginx 通过location匹配以PHP结尾的文件，调用Fastcgi接口执行fastcgi_pass 命令发送给PHP的php-fam进程接收，wrapper进程进行处理，处理后在原路返回给nginx最后客户端可以看到动态页面，如果需要调用数据库在通过php解析器解析成sql语句与数据库进行调用数据操作。最后生成动态页面返回给nginx客户端可以看到页面。</p>
 <br>
<p><strong>调用流程</strong></p>
<p>用户访问网站 --- &gt; nginx(fastcgi_pass) --  FastCGI--&gt;  (php-fpm -- wrapper) php (php解析器) ---&gt;  mysql(读取或写入)</p>
 <br>
 <br>
<h2 id="_5-实现-lnmp-架构服务之间建立关系" tabindex="-1"><a class="header-anchor" href="#_5-实现-lnmp-架构服务之间建立关系" aria-hidden="true">#</a> 5. 实现 LNMP 架构服务之间建立关系</h2>
 <br>
<p>Nginx无法直接 和 数据库建立联系，因此要先和PHP 建立关系。</p>
 <br>
<h3 id="_5-1-实现-nginx与-php-建立关系" tabindex="-1"><a class="header-anchor" href="#_5-1-实现-nginx与-php-建立关系" aria-hidden="true">#</a> 5.1 实现 Nginx与 PHP 建立关系</h3>
<p><strong>编写 nginx 配置文件</strong></p>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> ~ \.php$</span> <span class="token punctuation">{</span> 
<span class="token directive"><span class="token keyword">root</span> /www</span><span class="token punctuation">;</span> 
<span class="token directive"><span class="token keyword">fastcgi_index</span> index.php</span><span class="token punctuation">;</span>  
<span class="token directive"><span class="token keyword">fastcgi_param</span> SCRIPT_FILENAME <span class="token variable">$document_root</span><span class="token variable">$fastcgi_script_name</span></span><span class="token punctuation">;</span> 
<span class="token directive"><span class="token keyword">fastcgi_pass</span> 127.0.0.1:9000</span><span class="token punctuation">;</span> 
<span class="token directive"><span class="token keyword">include</span> fastcgi_params</span><span class="token punctuation">;</span>  <span class="token comment">#变量配置文件 </span>
 <span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div> <br>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">systemctl</span> nginx restart <span class="token comment">#重启服务</span>

server</span> <span class="token punctuation">{</span>
<span class="token directive"><span class="token keyword">server_name</span> ryanxin.com
rewrite ^/(.*) http://www.ryanxin.com/<span class="token variable">$1</span> permanent</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>   <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> www.ryanxin.com</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">error_page</span>  <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span> /50x.html</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">location</span> /</span><span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">root</span> /html/bbs</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
   <span class="token directive"><span class="token keyword">location</span> ~ \.php$</span> <span class="token punctuation">{</span> 
               <span class="token directive"><span class="token keyword">root</span> /bbs</span><span class="token punctuation">;</span> 
               <span class="token directive"><span class="token keyword">fastcgi_index</span> index.php</span><span class="token punctuation">;</span>  
               <span class="token directive"><span class="token keyword">fastcgi_param</span> SCRIPT_FILENAME <span class="token variable">$document_root</span><span class="token variable">$fastcgi_script_name</span></span><span class="token punctuation">;</span> 
               <span class="token directive"><span class="token keyword">fastcgi_pass</span> 127.0.0.1:9000</span><span class="token punctuation">;</span> 
               <span class="token directive"><span class="token keyword">include</span> fastcgi_params</span><span class="token punctuation">;</span>   
    <span class="token punctuation">}</span>   
 <span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><br> <br></p>
<h3 id="_5-2-编写动态资源文件测试页面" tabindex="-1"><a class="header-anchor" href="#_5-2-编写动态资源文件测试页面" aria-hidden="true">#</a> 5.2 编写动态资源文件测试页面</h3>
 <br>
<div class="language-php line-numbers-mode" data-ext="php"><pre v-pre class="language-php"><code>vim /html/blog/test_php.php  
<span class="token php language-php"><span class="token delimiter important">&lt;?php</span> 
<span class="token function">phpinfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token delimiter important">?></span></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div> <br>
<p><strong>浏览器输入地址进行访问测试</strong></p>
<p><a href="https://www.ryanxin.com" target="_blank" rel="noopener noreferrer">http://www.ryanxin.com/index.php<ExternalLinkIcon/></a></p>
<p><strong>注意</strong> ： 要在本地Host文件手动添加域名地址，才能实现本地域名解析访问。</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-LinuxLNMP-3.png" alt="LNMP-3" tabindex="0" loading="lazy"><figcaption>LNMP-3</figcaption></figure>
 <br>
 <br>
<h2 id="_6-实现-php-与数据库建立关系" tabindex="-1"><a class="header-anchor" href="#_6-实现-php-与数据库建立关系" aria-hidden="true">#</a> 6. 实现 PHP 与数据库建立关系</h2>
 <br>
<h3 id="_6-1-编写-php-连接数据库测试文件" tabindex="-1"><a class="header-anchor" href="#_6-1-编写-php-连接数据库测试文件" aria-hidden="true">#</a> 6.1 编写 PHP 连接数据库测试文件</h3>
 <br>
<div class="language-php line-numbers-mode" data-ext="php"><pre v-pre class="language-php"><code># vim test_mysql.php 

<span class="token php language-php"><span class="token delimiter important">&lt;?php</span> 
<span class="token variable">$servername</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"localhost"</span><span class="token punctuation">;</span> 
<span class="token variable">$username</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"root"</span><span class="token punctuation">;</span> 
<span class="token variable">$password</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"oldboy123"</span><span class="token punctuation">;</span> 
<span class="token comment">//$link_id=mysql_connect('主机名','用户','密码'); </span>
<span class="token comment">//mysql -u用户 -p密码 -h 主机 </span>
<span class="token variable">$conn</span> <span class="token operator">=</span> <span class="token function">mysqli_connect</span><span class="token punctuation">(</span><span class="token variable">$servername</span><span class="token punctuation">,</span> <span class="token variable">$username</span><span class="token punctuation">,</span> <span class="token variable">$password</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$conn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
<span class="token keyword">echo</span> <span class="token string double-quoted-string">"mysql successful by root !\n"</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span> 
<span class="token keyword">die</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"Connection failed: "</span> <span class="token operator">.</span> <span class="token function">mysqli_connect_error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span> 
<span class="token delimiter important">?></span></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div> <br>
 <br>
<h3 id="_6-2-访问测试" tabindex="-1"><a class="header-anchor" href="#_6-2-访问测试" aria-hidden="true">#</a> 6.2 访问测试</h3>
<p><a href="https://www.ryanxin.com/" target="_blank" rel="noopener noreferrer">http://www.ryanxin.com/test_mysql.php<ExternalLinkIcon/></a></p>
<p><strong>如果连接成功</strong> ：提示 Mysql successful by root！</p>
<p>失败则提示报错信息</p>
<br>
 <br>
<h2 id="_7-部署搭建网站页面-代码上线" tabindex="-1"><a class="header-anchor" href="#_7-部署搭建网站页面-代码上线" aria-hidden="true">#</a> 7. 部署搭建网站页面 代码上线</h2>
 <br>
<h3 id="_7-1-常用的开源源码网站" tabindex="-1"><a class="header-anchor" href="#_7-1-常用的开源源码网站" aria-hidden="true">#</a> 7.1 常用的开源源码网站</h3>
 <br>
<ul>
<li>​	<strong>主站网站页面</strong>: <a href="http://www.dedecms.com/" target="_blank" rel="noopener noreferrer">http://www.dedecms.com/<ExternalLinkIcon/></a></li>
<li>​	<strong>论坛网站页面</strong>: <a href="http://www.discuz.net/forum.php" target="_blank" rel="noopener noreferrer">http://www.discuz.net/forum.php<ExternalLinkIcon/></a></li>
<li>​	<strong>博客网站页面</strong>: <a href="https://cn.wordpress.org/" target="_blank" rel="noopener noreferrer">https://cn.wordpress.org/<ExternalLinkIcon/></a></li>
<li>​	<strong>知乎类型网站页面</strong>: <a href="http://www.wecenter.com/?copyright" target="_blank" rel="noopener noreferrer">http://www.wecenter.com/?copyright<ExternalLinkIcon/></a></li>
</ul>
 <br>
<h3 id="_7-3-将源码解压后放入到站点目录中" tabindex="-1"><a class="header-anchor" href="#_7-3-将源码解压后放入到站点目录中" aria-hidden="true">#</a> 7.3 将源码解压后放入到站点目录中</h3>
 <br>
<p>这里演示的是 <a href="https://cn.wordpress.org" target="_blank" rel="noopener noreferrer">Wordpress<ExternalLinkIcon/></a> 博客系统</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">tar</span> xf wordpress-5.2.1.tar.gz
<span class="token function">mv</span> ./* /html/bbs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div> <br>
<p><strong>修改站点目录权限</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chown</span> <span class="token parameter variable">-R</span> www.www blog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div> <br>
 <br>
<h3 id="_7-4-进行网站页面初始化操作" tabindex="-1"><a class="header-anchor" href="#_7-4-进行网站页面初始化操作" aria-hidden="true">#</a> 7.4 进行网站页面初始化操作</h3>
 <br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-LinuxLNMP-4.png" alt="LNMP-4" tabindex="0" loading="lazy"><figcaption>LNMP-4</figcaption></figure>
<br>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-LinuxLNMP-5.png" alt="LNMP-5" loading="lazy">
<br></p>
<h3 id="_7-5-对数据库服务进行配置" tabindex="-1"><a class="header-anchor" href="#_7-5-对数据库服务进行配置" aria-hidden="true">#</a> 7.5 对数据库服务进行配置</h3>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">--创建数据库</span>
<span class="token keyword">create</span> <span class="token keyword">databases</span> wordpress<span class="token punctuation">;</span>  

<span class="token comment">--检查</span>
<span class="token keyword">show</span> <span class="token keyword">databases</span><span class="token punctuation">;</span>

<span class="token comment">--创建数据库管理用户: </span>
<span class="token keyword">grant</span> <span class="token keyword">all</span> <span class="token keyword">on</span> wordpress<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> <span class="token string">'wordpress'</span><span class="token variable">@'localhost'</span> identified <span class="token keyword">by</span> <span class="token string">'xin123'</span><span class="token punctuation">;</span>

<span class="token comment">--检查</span>
<span class="token keyword">select</span> <span class="token keyword">user</span><span class="token punctuation">,</span>host <span class="token keyword">from</span> mysql<span class="token punctuation">.</span><span class="token keyword">user</span> 

<span class="token comment">--优化: 删除无用的用户信息</span>

<span class="token keyword">delete</span> <span class="token keyword">from</span> mysql<span class="token punctuation">.</span><span class="token keyword">user</span> <span class="token keyword">where</span> <span class="token keyword">user</span><span class="token operator">=</span><span class="token string">""</span> <span class="token operator">and</span> host<span class="token operator">=</span><span class="token string">"localhost"</span><span class="token punctuation">;</span>
<span class="token keyword">delete</span> <span class="token keyword">from</span> mysql<span class="token punctuation">.</span><span class="token keyword">user</span> <span class="token keyword">where</span> <span class="token keyword">user</span><span class="token operator">=</span><span class="token string">""</span> <span class="token operator">and</span> host<span class="token operator">=</span><span class="token string">"web01"</span><span class="token punctuation">;</span>

flush <span class="token keyword">privileges</span><span class="token punctuation">;</span> 

<span class="token comment">--刷新</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>利用blog网站发布博文</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-LinuxLNMP-6.png" alt="LNMP-6" tabindex="0" loading="lazy"><figcaption>LNMP-6</figcaption></figure>
<br>
<h2 id="_8-常见问题解决" tabindex="-1"><a class="header-anchor" href="#_8-常见问题解决" aria-hidden="true">#</a> 8. 常见问题解决</h2>
<p><strong>上传wordpress主题,报413错误,如何解决?</strong></p>
<p>1.修改nginx配置文件</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> blog.conf
server <span class="token punctuation">{</span>
client_max_body_size 50m<span class="token punctuation">;</span>  <span class="token comment">#指定用户上传数据的大小限制(默认1M)	</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>修改php.ini配置文件</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>upload_max_filesize <span class="token operator">=</span> 50M   <span class="token comment">#使PHP接收用户上传的更大的数据(默认2M)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div> <br></div></template>


