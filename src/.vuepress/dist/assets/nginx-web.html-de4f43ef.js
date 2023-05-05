import{_ as s,V as a,W as e,Z as i,X as n}from"./framework-8eb1d601.js";const t={},l=n(`<h1 id="nginx-web快速入门" tabindex="-1"><a class="header-anchor" href="#nginx-web快速入门" aria-hidden="true">#</a> Nginx Web快速入门</h1><h2 id="_1-nginx-介绍" tabindex="-1"><a class="header-anchor" href="#_1-nginx-介绍" aria-hidden="true">#</a> 1.Nginx 介绍</h2><h3 id="_1-1什么是nginx" tabindex="-1"><a class="header-anchor" href="#_1-1什么是nginx" aria-hidden="true">#</a> 1.1什么是Nginx ？</h3><p><strong>Nginx</strong> 是一个开源且高性能、可靠的 Http Web 服务、代理服务。</p><ul><li>开源，体现在直接获取Nginx的源代码。</li><li>高性能，体现在支持海量的并发。</li><li>高可靠，体现在服务稳定。</li></ul><br><br><h3 id="_1-2为什么选择-nginx" tabindex="-1"><a class="header-anchor" href="#_1-2为什么选择-nginx" aria-hidden="true">#</a> 1.2为什么选择 Nginx ？</h3><h4 id="_1-2-1高性能、高并发" tabindex="-1"><a class="header-anchor" href="#_1-2-1高性能、高并发" aria-hidden="true">#</a> 1.2.1高性能、高并发</h4><p>通常正常情况下，单次请求会得到更快的响应。另一方面在高峰期(如有数以万计的并发请求)，Nginx可以比其他Web服务器更快地响应请求。</p><br><h4 id="_1-2-2高扩展性" tabindex="-1"><a class="header-anchor" href="#_1-2-2高扩展性" aria-hidden="true">#</a> 1.2.2高扩展性</h4><p>Nginx功能模块化。Nginx官方提供了非常多的优秀模块提供使用。这些模块都可以实现快速增加和减少。</p><br><h4 id="_1-2-3高可靠性" tabindex="-1"><a class="header-anchor" href="#_1-2-3高可靠性" aria-hidden="true">#</a> 1.2.3高可靠性</h4><p>所谓高可靠性，是指Nginx可以在服务器上持续不间断的运行，而很多web服务器往往运行几周或几个月就需要进行一次重启。对于nginx这样的一一个高并发、高性能的反向代理服务器而言，他往往运行网站架构的最前端，那么此时如果我们企业如果想提供9999、99999,对于nginx持续运行能够宕机的时间，一年可能只能以秒来计算，所以在这样的一个角色中，nginx的高可靠性为我们提供了非常好的保证。</p><br><h4 id="_1-2-4-热部署" tabindex="-1"><a class="header-anchor" href="#_1-2-4-热部署" aria-hidden="true">#</a> 1.2.4 热部署</h4><p><code>热部署</code>:是指在不停服务的情况下升级nginx,这个功能非常的重要。对于普通的服务，需要kill掉进程在启动，但对于Nginx而言，如果Nginx有 很多的客户端连接，那么kil掉Nginx。 Nginx会像客户端发送tcp reset复位包，但很多客户端无法很好的理解reset包，就会造成异常。由于Nginx的master管理进程与worker工作进程的分离设计，使得Nginx能够在7x24小时不间断服务的前提下，升级Nginx的可执行文件。当然，也支持不停止服务更新配置、更换日志文件等功能。</p><br><h4 id="_1-2-5-应用广泛" tabindex="-1"><a class="header-anchor" href="#_1-2-5-应用广泛" aria-hidden="true">#</a> 1.2.5 应用广泛</h4><p>首先Nginx技术成熟，具备企业最常使用的功能，如代理、代理缓存、负载均衡、静态资源、动静分离、Https、 Inmp、 nmt等等其次使用Nginx统一技术栈，降低维护成本，同时降低技术更新成本。</p><br><h4 id="_1-2-6-网络模型" tabindex="-1"><a class="header-anchor" href="#_1-2-6-网络模型" aria-hidden="true">#</a> 1.2.6 网络模型</h4><p>Nginx使用<code>Epool</code>网络模型，而常听到Apache 采用的是<code>Select</code>网络模型。</p><ul><li>Select:当用户发起一次请求，select模型就 会进行一次遍历扫描，从而导致性能低下。</li><li>Epoll:当用户发起请求，epoll模型会直接进行处理，效率高效。</li></ul><br><h3 id="_1-3-nginx应用场景" tabindex="-1"><a class="header-anchor" href="#_1-3-nginx应用场景" aria-hidden="true">#</a> 1.3 Nginx应用场景</h3><p>Nginx的主要使用场景我归纳为三个，分为是静态资源服务、代理资源服务、安全服务，场景详细介绍如下： 如下图是一个网站的基本架构， 首先用户请求先到达nginx,然后在到tomcat或php这样的应用 服务器，然后应用服务器在去访问redis、mysq|l这样的数据库，提供基本的数据功能。 <br></p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx基本结构.jpg" alt="nginx基本结构" tabindex="0" loading="lazy"><figcaption>nginx基本结构</figcaption></figure><br><h4 id="_1-3-1-nginx-负载均衡" tabindex="-1"><a class="header-anchor" href="#_1-3-1-nginx-负载均衡" aria-hidden="true">#</a> 1.3.1 nginx 负载均衡</h4><p>那么这里有一个问题，我们的程序代码要求开发效率高,所以他的运行效率是很低的，或者说它并发是受限，所以我们需要很多应用服务组成一个集群，为更多用户提供访问。而应用服务一但构成集群， 则需要我们的nginx 具有反向代理功能，这样可以将动态请求传倒给集群服务。</p><br><p>但很多应用构成集群，那么一定会带来两个需求。</p><ol><li>应用服务器需要动态扩展。</li><li>有些服务出问题需要做容灾。 那么我们的反向代理必须具备负载均衡功能。</li></ol><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx负载均衡.jpg" alt="nginx负载均衡" tabindex="0" loading="lazy"><figcaption>nginx负载均衡</figcaption></figure><br><br><h4 id="_1-3-2-nginx-代理缓存" tabindex="-1"><a class="header-anchor" href="#_1-3-2-nginx-代理缓存" aria-hidden="true">#</a> 1.3.2 nginx 代理缓存</h4><p>其次，随着我们网络链路的增长，用户体验到的时延则会增加。如果我们能把一段时间内不会发生变化的&quot;动态&quot;内容，缓存在Nginx,由Nginx 直接向用户提供访问，那么这样用户请求的时延就会减少很多，所以在这里反向代理会演生出另外一个功能&quot;缓存&quot;，因为它能加速我们的访问。</p><br><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx代理缓存.jpg" alt="nginx代理缓存" tabindex="0" loading="lazy"><figcaption>nginx代理缓存</figcaption></figure><br><h4 id="_1-3-3-nginx-静态服务" tabindex="-1"><a class="header-anchor" href="#_1-3-3-nginx-静态服务" aria-hidden="true">#</a> 1.3.3 nginx 静态服务</h4><p>在很多时候我们访问docs、pdf、mp4、 png等这样的<code>静态资源</code>时，是没有必要将这些请求通过Nginx交给后端的应用服务，我们只需要通过Nginx直接处理&#39;<code>静态资源</code>&quot;即可。这是Nginx的静态资源功能。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx静态服务.jpg" alt="nginx静态服务" tabindex="0" loading="lazy"><figcaption>nginx静态服务</figcaption></figure><br><h4 id="_1-3-4-nginx-安全服务" tabindex="-1"><a class="header-anchor" href="#_1-3-4-nginx-安全服务" aria-hidden="true">#</a> 1.3.4 nginx 安全服务</h4><p>当我们使用http网站时，可能会遭到劫持和篡改, 如果使用https安全通讯协议，那么数据在传输过程中是加密的，从而能有效的避免黑客窃取或者篡改数据信息，同时也能避免网站在传输过程中的信息泄露。大大的提升我们网站安全。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx安全服务.jpg" alt="nginx安全服务" tabindex="0" loading="lazy"><figcaption>nginx安全服务</figcaption></figure><br><br><h3 id="_1-4-nginx组成部分" tabindex="-1"><a class="header-anchor" href="#_1-4-nginx组成部分" aria-hidden="true">#</a> 1.4 Nginx组成部分</h3><p>在这里我们将Nginx的组成架构比喻为-辆汽车:<br></p><p>这个<code>汽车</code>提供了基本的驾驶功能，但是还需要一个<code>驾驶员</code>控制这辆汽车开往哪个方向,同时该汽车行驶过的地方还会形成<code>GPS轨迹</code>，如果汽车在行驶的过程中出现了任何问题，我们需要一个<code>黑匣子</code>，分析是汽车本身的问题，还是驾驶人员的操作出现了问题。</p><br><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx服务组成.jpg" alt="nginx服务组成" tabindex="0" loading="lazy"><figcaption>nginx服务组成</figcaption></figure><br><ol><li><p>第一个组成部分<code>Nginx二进制可执行文件</code>:它是Nginx本身框架以及相关模块等构建的一个二进制文件，这个文件就相当于汽车本身，所有的功能都由它提供。</p></li><li><p>第二个组成部分<code>Nginx.conf</code>文件:它相当于驾驶人员，虽然二进制可执行文件已经提供了许多的功能，但是这些功能究竟有没有开启，或者开启后定义怎样的行为去处理请求，都是由<code>nginx.conf</code>这个文件决定的，所以他就相当于这个汽车的驾驶员，控制这个汽车的行为。</p></li><li><p>第三个组成部分<code>access.log</code>:它相当于这辆汽车经过所有地方形成的GPS轨迹，<code>access.log</code>会记录Nginx处理过的每一条HTTP的请求信息 响应信息。</p></li><li><p>第四个组成部分<code>error.log</code>:它相当于黑匣子，当出现了- -些不可预期的问题时，可以通过error.log将问题定位出来。</p></li></ol><br><br><h3 id="_1-5-nginx组成部分小结" tabindex="-1"><a class="header-anchor" href="#_1-5-nginx组成部分小结" aria-hidden="true">#</a> 1.5 Nginx组成部分小结:</h3><p>Nginx的组成部分是相辅相成，Nginx二进制可执行文件和Nginx.conf文件，它定义了Nginx处理请求的方式。 而如果我们想对nginx服务做一些web的运 营和运维，需要对access.log做进一步分析。而如果出现了任何未知的错误，或者预期的行为不-致时，应该通过error.log 去定位根本性的问 题。</p><br><br><h2 id="_2-nginx快速安装" tabindex="-1"><a class="header-anchor" href="#_2-nginx快速安装" aria-hidden="true">#</a> 2.Nginx快速安装</h2><p>安装Nginx软件的方式有很多种，分为如下几种：</p><ol><li>源码编译👉Nginx (1.版本随意2.安装复杂3.升级繁琐)</li><li>epel仓库👉&gt;Nginx (1.版本较低2.安装简单3.配置不易读)</li><li>官方仓库👉Nginx (1.版本较新2.安装简单3.配置易读，推荐😊)</li></ol><br><br><h3 id="_2-1-安装nginx软件所需依赖包" tabindex="-1"><a class="header-anchor" href="#_2-1-安装nginx软件所需依赖包" aria-hidden="true">#</a> 2.1 安装Nginx软件所需依赖包</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@web ~<span class="token punctuation">]</span><span class="token comment"># yum install -y gcc gcc-c++ autoconf pcre pcre-devel make automake httpd-tools</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><h3 id="_2-2-配置nginx官方yum源" tabindex="-1"><a class="header-anchor" href="#_2-2-配置nginx官方yum源" aria-hidden="true">#</a> 2.2 配置nginx官方yum源</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>nginx-stable<span class="token punctuation">]</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span>nginx stable repo
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>http://nginx.org/packages/centos/<span class="token variable">$releasever</span>/<span class="token variable">$basearch</span>/
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">gpgkey</span><span class="token operator">=</span>https://nginx.org/ keys/nginx_signing.key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="_2-3-安装nginx服务-启动并加入开机自启" tabindex="-1"><a class="header-anchor" href="#_2-3-安装nginx服务-启动并加入开机自启" aria-hidden="true">#</a> 2.3 安装Nginx服务,启动并加入开机自启</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@web ~<span class="token punctuation">]</span><span class="token comment"># yum install nginx -y</span>
<span class="token punctuation">[</span>root@web ~<span class="token punctuation">]</span><span class="token comment"># systemctl enable nginx</span>
<span class="token punctuation">[</span>root@web ~<span class="token punctuation">]</span><span class="token comment"># systemctl start nginx</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><br><h3 id="_2-4-通过浏览器访问该服务器ip地址获取资源" tabindex="-1"><a class="header-anchor" href="#_2-4-通过浏览器访问该服务器ip地址获取资源" aria-hidden="true">#</a> 2.4 通过浏览器访问该服务器ip地址获取资源</h3><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/welcomnginx.jpg" alt="welcomnginx" tabindex="0" loading="lazy"><figcaption>welcomnginx</figcaption></figure><br><h3 id="_2-5-检查nginx软件版本以及编译参数" tabindex="-1"><a class="header-anchor" href="#_2-5-检查nginx软件版本以及编译参数" aria-hidden="true">#</a> 2.5 检查Nginx软件版本以及编译参数</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@web ~<span class="token punctuation">]</span><span class="token comment"># nginx -V</span>
nginx version: nginx/1.16.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br><br><h3 id="_2-6-nginx软件目录结构" tabindex="-1"><a class="header-anchor" href="#_2-6-nginx软件目录结构" aria-hidden="true">#</a> 2.6 Nginx软件目录结构</h3><p>为了让大家更清晰的了解Nginx软件的全貌，可使用<code>rpm -ql nginx</code>查看整体的目录结构及对应的功能，如下表格整理了Nginx比较重要的配置文件.</p><br><h4 id="_2-6-1-nginx主配置文件" tabindex="-1"><a class="header-anchor" href="#_2-6-1-nginx主配置文件" aria-hidden="true">#</a> 2.6.1 Nginx主配置文件</h4><table><thead><tr><th style="text-align:center;">路径</th><th style="text-align:center;">类型</th><th style="text-align:center;">作用</th></tr></thead><tbody><tr><td style="text-align:center;"><code>/etc/nginx/nginx.conf</code></td><td style="text-align:center;">配置文件</td><td style="text-align:center;">nginx主配置文件</td></tr><tr><td style="text-align:center;"><code>/etc/nginx/conf.d/default.conf</code></td><td style="text-align:center;">配置文件</td><td style="text-align:center;">默认网站配置文件</td></tr></tbody></table><br><h4 id="_2-6-2-nginx代理相关参数文件" tabindex="-1"><a class="header-anchor" href="#_2-6-2-nginx代理相关参数文件" aria-hidden="true">#</a> 2.6.2 Nginx代理相关参数文件</h4><table><thead><tr><th style="text-align:center;">路径</th><th style="text-align:center;">类型</th><th style="text-align:center;">作用</th></tr></thead><tbody><tr><td style="text-align:center;"><code>/etc/nginx/fastcgi_ params</code></td><td style="text-align:center;">配置文件</td><td style="text-align:center;">Fastcgi代理配置文件</td></tr><tr><td style="text-align:center;"><code>/etc/nginx/scgi params</code></td><td style="text-align:center;">配置文件</td><td style="text-align:center;">scgi代理配置文件</td></tr><tr><td style="text-align:center;"><code>/etc/nginx/uwsgi_ params</code></td><td style="text-align:center;">配置文件</td><td style="text-align:center;">uwsgi代理配置文件</td></tr></tbody></table><br><h4 id="_2-6-3-nginx编码相关配置文件" tabindex="-1"><a class="header-anchor" href="#_2-6-3-nginx编码相关配置文件" aria-hidden="true">#</a> 2.6.3 Nginx编码相关配置文件</h4><table><thead><tr><th style="text-align:center;">路径</th><th style="text-align:center;">类型</th><th style="text-align:center;">作用</th></tr></thead><tbody><tr><td style="text-align:center;"><code>/etc/nginx/win-utf</code></td><td style="text-align:center;">配置文件</td><td style="text-align:center;">Nginx编码转换映射文件</td></tr><tr><td style="text-align:center;"><code>/etc/nginx/koi-utf</code></td><td style="text-align:center;">配置文件</td><td style="text-align:center;">Nginx编码转换映射文件</td></tr><tr><td style="text-align:center;"><code>/etc/nginx/koi-win</code></td><td style="text-align:center;">配置文件</td><td style="text-align:center;">Nginx编码转换映射文件</td></tr><tr><td style="text-align:center;"><code>/etc/nginx/mime.types</code></td><td style="text-align:center;">配置文件</td><td style="text-align:center;">Content-Type与扩展名</td></tr></tbody></table><br><h4 id="_2-6-4-nginx管理相关命令" tabindex="-1"><a class="header-anchor" href="#_2-6-4-nginx管理相关命令" aria-hidden="true">#</a> 2.6.4 Nginx管理相关命令</h4><table><thead><tr><th style="text-align:center;">路径</th><th style="text-align:center;">类型</th><th style="text-align:center;">作用</th></tr></thead><tbody><tr><td style="text-align:center;"><code>/usr/sbin/nginx</code></td><td style="text-align:center;">命令</td><td style="text-align:center;">Nginx命令行管理终端工具</td></tr><tr><td style="text-align:center;"><code>/usr/sbin/nginx-debug</code></td><td style="text-align:center;">命令</td><td style="text-align:center;">Nginx命令行与终端调试工具</td></tr></tbody></table><br><h4 id="_2-6-5-nginx日志相关目录与文件" tabindex="-1"><a class="header-anchor" href="#_2-6-5-nginx日志相关目录与文件" aria-hidden="true">#</a> 2.6.5 Nginx日志相关目录与文件</h4><table><thead><tr><th style="text-align:center;">路径</th><th style="text-align:center;">类型</th><th style="text-align:center;">作用</th></tr></thead><tbody><tr><td style="text-align:center;"><code>/var/log/nginx</code></td><td style="text-align:center;">目录</td><td style="text-align:center;">Nginx默认存放日志目录</td></tr><tr><td style="text-align:center;"><code>/etc/logrotate.d/nginx</code></td><td style="text-align:center;">配置文件</td><td style="text-align:center;">Nginx默认的日志切割</td></tr><tr><td style="text-align:center;"><br></td><td style="text-align:center;"></td><td style="text-align:center;"></td></tr></tbody></table><h2 id="_3-nginx基本配置" tabindex="-1"><a class="header-anchor" href="#_3-nginx基本配置" aria-hidden="true">#</a> 3.Nginx基本配置</h2><p>Nginx主配置文件<code>/etc/nginx/nginx.conf</code>是一个纯文本类型的文件， 整个配置文件是以区块的形式组织的。 一般，每个区块以一 对大括号<code>{}</code>来表示开始与结束。</p><p>Nginx主配置文件整体分为三块进行学习，分别是CoreModule(核心模块)， EventModule(事件驱动模块)，HttpCoreModule(http内核模块)</p><br><p><code>CoreModule</code>核心模块</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>user www<span class="token punctuation">;</span>                        <span class="token comment">#Nginx进程所使用的用户</span>
worker_ processes <span class="token number">1</span> <span class="token punctuation">;</span>            <span class="token comment">#Nginx运行的work进程数量(建议与CPU数量-致或auto)</span>
error_ log /1og/nginx/error.log  <span class="token comment">#Nginx 错误日志存放路径</span>
pid /var/run/nginx.pid           <span class="token comment">#Nginx服务运行后产生的pid进程号</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p><code>events</code>事件模块</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>events <span class="token punctuation">{</span>
worker_ connections <span class="token number">25535</span><span class="token punctuation">;</span> <span class="token comment"># 每个worker进程支持的最大连接数</span>
use epoll<span class="token punctuation">;</span>
<span class="token comment">#事件驱动模型，epoll默认</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><br><p><code>http</code>内核模块</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>http <span class="token punctuation">{</span> <span class="token comment">#http层开始</span>
<span class="token punctuation">..</span>.
<span class="token comment">#使用Server配置网站，每个Server{}代表一个网站( 简称虚拟主机)</span>
server <span class="token punctuation">{</span>
   listen          <span class="token number">80</span><span class="token punctuation">;</span>         <span class="token comment">#监听端口，默认80</span>
   server_ name  oldxu. com<span class="token punctuation">;</span>   <span class="token comment">#提供的域名</span>
   access_ log    access.log<span class="token punctuation">;</span>  <span class="token comment">#该网站的访问日志</span>


<span class="token comment">#控制网站访问的路径</span>
    location / <span class="token punctuation">{</span>
       root  /usr/share/nginx/html<span class="token punctuation">;</span> <span class="token comment">#存放网站源代码的位置</span>
       index index. html index.htm<span class="token punctuation">;</span> <span class="token comment">#默认返回网站的文件</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">..</span>.

<span class="token comment">#第二个虚拟主机配置</span>
server <span class="token punctuation">{</span>
<span class="token punctuation">..</span>.

  <span class="token punctuation">}</span>

include /etc/nginx/conf.d/* .conf<span class="token punctuation">;</span> <span class="token comment">#包含/etc/nginx/conf.d/目录 下所有以. conf结尾的文件</span>

<span class="token comment">#include作用是:简化主配置文件写太多造成臃肿，这样会让整体的配置文件更加的清晰。</span>


<span class="token punctuation">}</span> <span class="token comment">#http层结束</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p><strong>PS</strong>: Nginx中的<code>http</code>、<code>server</code>、<code>location</code> 之间的关系是?<br><code>http标签</code> 主要用来解决用户的请求与响应。<br><code>server标签</code>主要用来响应具体的某一个网站。<br><code>location标签 </code>主要用于匹配网站具体URL路径。<br><code>http{}</code> 层下允许有多个 <code>Server{}</code>,一个<code>Server{}</code> 下又允许有多<code>locationf{}</code><br></p><br><h2 id="_4-nginx搭建网站" tabindex="-1"><a class="header-anchor" href="#_4-nginx搭建网站" aria-hidden="true">#</a> 4.Nginx搭建网站</h2><h3 id="_4-1-新增nginx配置文件" tabindex="-1"><a class="header-anchor" href="#_4-1-新增nginx配置文件" aria-hidden="true">#</a> 4.1 新增nginx配置文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_ name game.oldxu.com<span class="token punctuation">;</span>
   
    location / <span class="token punctuation">{</span>
        root /code<span class="token punctuation">;</span>
        index index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-放置游戏源代码文件至nginx配置文件root指定的目录" tabindex="-1"><a class="header-anchor" href="#_4-2-放置游戏源代码文件至nginx配置文件root指定的目录" aria-hidden="true">#</a> 4.2 放置游戏源代码文件至nginx配置文件root指定的目录</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@web01 conf.d<span class="token punctuation">]</span><span class="token comment"># mkdir /code &amp;&amp; cd /code</span>
<span class="token punctuation">[</span>root@web01 code<span class="token punctuation">]</span><span class="token comment"># wget http://fj.xuliangwei.com/public/html5.zip</span>
<span class="token punctuation">[</span>root@web01 code<span class="token punctuation">]</span><span class="token comment"># unzip html5.zip</span>
<span class="token punctuation">[</span>root@web01 code<span class="token punctuation">]</span><span class="token comment"># ls</span>
ceshi game html5.zip img index.html readme.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="_4-3-检查nginx的语法是否存在错误" tabindex="-1"><a class="header-anchor" href="#_4-3-检查nginx的语法是否存在错误" aria-hidden="true">#</a> 4.3 检查nginx的语法是否存在错误</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@web01 code<span class="token punctuation">]</span><span class="token comment"># nginx -t</span>
nginx: the configuration <span class="token function">file</span> /etc/ nginx/nginx. conf syntax is ok
nginx: configuration <span class="token function">file</span> /etc/nginx/nginx. conf <span class="token builtin class-name">test</span> is successful
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="_4-4-重载nginx-服务" tabindex="-1"><a class="header-anchor" href="#_4-4-重载nginx-服务" aria-hidden="true">#</a> 4.4 重载Nginx 服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@web01 code<span class="token punctuation">]</span><span class="token comment"># systemctl reload nginx</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><h2 id="_5-nginx-虚拟主机" tabindex="-1"><a class="header-anchor" href="#_5-nginx-虚拟主机" aria-hidden="true">#</a> 5.Nginx 虚拟主机</h2><p><strong>Nginx 配置虚拟主机有如下三种方式</strong>:</p><ol><li>基于主机多P方式</li><li>基于端口的配置方式</li><li>基于多个hosts名称方式(多域名方式)</li></ol><br><h3 id="_5-1-nginx-基于多网卡多ip方式配置实践" tabindex="-1"><a class="header-anchor" href="#_5-1-nginx-基于多网卡多ip方式配置实践" aria-hidden="true">#</a> 5.1 Nginx 基于多网卡多IP方式配置实践</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    <span class="token punctuation">..</span>.
    server_ name <span class="token number">10.0</span>.0.1:80<span class="token punctuation">;</span>
    <span class="token punctuation">..</span>.


server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    <span class="token punctuation">..</span>.
    server_ name <span class="token number">10.0</span>.0.2:80<span class="token punctuation">;</span>
    <span class="token punctuation">..</span>.    

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="_5-2-nginx-基于端口虚拟主机配置实践" tabindex="-1"><a class="header-anchor" href="#_5-2-nginx-基于端口虚拟主机配置实践" aria-hidden="true">#</a> 5.2 Nginx 基于端口虚拟主机配置实践</h3><p>Nginx多端口虚拟主机方式，具体配置如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#仅修改listen.监听端口即可，但不能和系统端口出现冲突</span>
server <span class="token punctuation">{</span>
    <span class="token punctuation">..</span>.
listen <span class="token number">80</span><span class="token punctuation">;</span>
    <span class="token punctuation">..</span>.
<span class="token punctuation">}</span>

server <span class="token punctuation">{</span>
    <span class="token punctuation">..</span>.
listen <span class="token number">81</span><span class="token punctuation">;</span>
    <span class="token punctuation">..</span>.
<span class="token punctuation">}</span>

server <span class="token punctuation">{</span>
    <span class="token punctuation">..</span>.
listen <span class="token number">83</span><span class="token punctuation">;</span>
    <span class="token punctuation">..</span>.
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="_5-2-nginx-基于host名称虚拟主机配置实践" tabindex="-1"><a class="header-anchor" href="#_5-2-nginx-基于host名称虚拟主机配置实践" aria-hidden="true">#</a> 5.2 Nginx 基于Host名称虚拟主机配置实践</h3><p>1.创建对应的web站点目录以及程序代码</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># mkdir /code/{server1, server2}</span>
<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># echo &quot;server1&quot; &gt; /code/server1/index. html</span>
<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># echo &quot;server2” &gt; /code/server2/ index. html</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.配置不同域名的虚拟主机</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
server <span class="token punctuation">{</span>
    listen    <span class="token number">80</span><span class="token punctuation">;</span>
    server_ name   <span class="token number">1</span>.text.com<span class="token punctuation">;</span>
    root /code/server1<span class="token punctuation">;</span> 
    index index.html <span class="token punctuation">;</span>
    <span class="token punctuation">..</span>.
<span class="token punctuation">}</span>

server <span class="token punctuation">{</span>
    listen    <span class="token number">80</span><span class="token punctuation">;</span>
    server_ name   <span class="token number">2</span>.text.com<span class="token punctuation">;</span>
    root /code/ server2<span class="token punctuation">;</span> 
    index index. html <span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><br><h2 id="_6-nginx常用模块" tabindex="-1"><a class="header-anchor" href="#_6-nginx常用模块" aria-hidden="true">#</a> 6.Nginx常用模块</h2><h3 id="_6-1-nginx目录索引" tabindex="-1"><a class="header-anchor" href="#_6-1-nginx目录索引" aria-hidden="true">#</a> 6.1 Nginx目录索引</h3><p>当<code>ngx_http_jindex_module</code>模块找不到索引文件时，通常会将请求传递给<code>ngx_ http_autoindex_module</code>模块。<br><code>ngx_ http_autoindex_module</code>模块处理以斜杠字符(/)结尾的请求，并生成目录列表。<br></p><br><h4 id="_6-1-1-指令" tabindex="-1"><a class="header-anchor" href="#_6-1-1-指令" aria-hidden="true">#</a> 6.1.1 指令</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#启用或禁用目录列表输出，on开启， off关闭。</span>
Syntax: autoindex on<span class="token operator">|</span>off<span class="token punctuation">;</span>
Default:    autoindex off<span class="token punctuation">;</span>
Context <span class="token builtin class-name">:</span>   http，server, location


<span class="token comment">#指定是否应在目录列表中输出确切的文件大小，on显示字节，off显示大概单位。</span>
Syntax: autoindex_ exact_ size on <span class="token operator">|</span> off<span class="token punctuation">;</span>
Default: autoindex_ exact_ size on<span class="token punctuation">;</span>
Context:http,server,location

<span class="token comment">#指定目录列表中的时间是应以本地时区还是UTC输出。on本地时区，off UTC时间。</span>
Syntax: autoindex_ localtime on<span class="token operator">|</span>off<span class="token punctuation">;</span>
Default: autoindex_ localtime off<span class="token punctuation">;</span>
Context: http，server, location
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="_6-1-2-场景示例-目录索引" tabindex="-1"><a class="header-anchor" href="#_6-1-2-场景示例-目录索引" aria-hidden="true">#</a> 6.1.2 场景示例:目录索引</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@web ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/nginx/conf.d/mirror.jx.com.conf</span>
server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name mirror.jx.com<span class="token punctuation">;</span>
    charset utf-8<span class="token punctuation">;</span>
    <span class="token comment">#设定字符集，防止中文字符乱码显示。</span>

    autoindex on<span class="token punctuation">;</span>
    autoindex_exact_size off<span class="token punctuation">;</span>
    autoindex_locatime on<span class="token punctuation">;</span>

    location / <span class="token punctuation">{</span>  root /code/<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="_6-1-3-场景示例-模拟搭建企业内部yum仓库" tabindex="-1"><a class="header-anchor" href="#_6-1-3-场景示例-模拟搭建企业内部yum仓库" aria-hidden="true">#</a> 6.1.3 场景示例:模拟搭建企业内部yum仓库</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name mirror.jx.com<span class="token punctuation">;</span>
    charset utf-8<span class="token punctuation">;</span>
    root /mirror<span class="token punctuation">;</span>

    location / <span class="token punctuation">{</span>
    index index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">#提供yum仓库目录</span>
    location /repo <span class="token punctuation">{</span>
    autoindex on<span class="token punctuation">;</span>
    autoindex_exact_size off<span class="token punctuation">;</span>
    autoindex_localtime on<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">#使用rsync同步中国科学技术大学开源软件镜像</span>
<span class="token function">rsync</span> <span class="token parameter variable">-avz</span> rsync://rsync.mirrors.ustc.edu.cn/repo/centos/ /mirror/repo/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><br><h3 id="_6-2-nginx访问控制" tabindex="-1"><a class="header-anchor" href="#_6-2-nginx访问控制" aria-hidden="true">#</a> 6.2 Nginx访问控制</h3><p><code>ngx_http_access_module</code>模块允许限制对某些客户端地址的访问。</p><h3 id="_6-2-1-指令" tabindex="-1"><a class="header-anchor" href="#_6-2-1-指令" aria-hidden="true">#</a> 6.2.1 指令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment">#允许配置语法</span>
Syntax: allow address <span class="token operator">|</span> CIDR <span class="token operator">|</span> unix: <span class="token operator">|</span> all<span class="token punctuation">;</span>
Default:  -
Context <span class="token builtin class-name">:</span>  http,server,location,limit_except


<span class="token comment">#拒绝配置语法</span>
Syntax: deny address<span class="token operator">|</span> CIDR<span class="token operator">|</span> unix:<span class="token operator">|</span> all<span class="token punctuation">;</span>
Default <span class="token builtin class-name">:</span>  -
Context:http,server,location,limit_except
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-2-2-场景示例-只允许指定的来源ip能访问-centos-其它网段全部拒绝。" tabindex="-1"><a class="header-anchor" href="#_6-2-2-场景示例-只允许指定的来源ip能访问-centos-其它网段全部拒绝。" aria-hidden="true">#</a> 6.2.2 场景示例，只允许指定的来源IP能访问/centos, 其它网段全部拒绝。</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_ name mirror.jx.com<span class="token punctuation">;</span>
    charset utf-8<span class="token punctuation">;</span>     <span class="token comment">#设定字符集，防止中文字符乱码显示。</span>
    autoindex on<span class="token punctuation">;</span>
    autoindex_ exact_size off<span class="token punctuation">;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="_6-2-3-场景示例-拒绝指定的ip访问该网站的-centos-其他ip全部允许访问。" tabindex="-1"><a class="header-anchor" href="#_6-2-3-场景示例-拒绝指定的ip访问该网站的-centos-其他ip全部允许访问。" aria-hidden="true">#</a> 6.2.3 场景示例，拒绝指定的IP访问该网站的/centos,其他IP全部允许访问。</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p><code>注意</code>:deny和allow的顺序是有影响的<br></p><p>默认情况下，从第一条规则进行匹配,如果匹配成功，则不继续匹配下面的内容。如果匹配不成功，则继续往下寻找能匹配成功的内容。</p><br><br><p><code>ngx_http__auth_basic_module</code> 模块允许使用HTTP基本身份验证，验证用户名和密码来限制对资源的访问.</p><h4 id="_6-2-4-指令" tabindex="-1"><a class="header-anchor" href="#_6-2-4-指令" aria-hidden="true">#</a> 6.2.4 指令</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#使用HTTP基本身份验证协议启用用户名和密码验证。</span>
Syntax: auth_basic string <span class="token operator">|</span> off<span class="token punctuation">;</span>
Default: auth_basic off<span class="token punctuation">;</span>
Context: http,server,location,limit_except

<span class="token comment">#指定保存用户名和密码的文件</span>
Syntax: auth_basic__user_file <span class="token function">file</span><span class="token punctuation">;</span>
Default:  一
Context: http， server,location,limit_except
<span class="token number">2</span>.指定保存用户名和密码的文件，格式如下:


<span class="token comment">#可以使用htpasswd程序或&quot;openssl passwd ”命令生成对应的密码;</span>
name1: passwd1
name2: passwd2

<span class="token comment">#使用htpaaswd创建新的密码文件，-c创建新文件-b允许命令行输入密码</span>
yum <span class="token function">install</span> httpd- tools
htpasswd <span class="token parameter variable">-b</span> <span class="token parameter variable">-C</span> /etc/nginx/auth_conf <span class="token builtin class-name">test</span> <span class="token number">123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="_6-2-5-场景示例-基于用户名和密码认证实践。" tabindex="-1"><a class="header-anchor" href="#_6-2-5-场景示例-基于用户名和密码认证实践。" aria-hidden="true">#</a> 6.2.5 场景示例，基于用户名和密码认证实践。</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
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
         auth_basic<span class="token string">&quot; Auth access Blog Input your Passwd!&quot;</span><span class="token punctuation">;</span>
         auth_basic_user_file /etc/nginx/auth_conf<span class="token punctuation">;</span> 
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><br><h3 id="_6-3-nginx请求限制与链接限制" tabindex="-1"><a class="header-anchor" href="#_6-3-nginx请求限制与链接限制" aria-hidden="true">#</a> 6.3 Nginx请求限制与链接限制</h3><h4 id="_6-3-1-为什么要做限制" tabindex="-1"><a class="header-anchor" href="#_6-3-1-为什么要做限制" aria-hidden="true">#</a> 6.3.1 为什么要做限制?</h4><p>限制某个用户在一定时间内能够产生的Http请求。或者说限制某个用户的下载速度。 <br></p><br><h4 id="_6-3-2-应用场景" tabindex="-1"><a class="header-anchor" href="#_6-3-2-应用场景" aria-hidden="true">#</a> 6.3.2 应用场景</h4><ul><li>下载限速:限制用户下载资源的速度，使用<code>Nginx ngx_http_core_module</code>。</li><li>请求限制:限制用户单位时间内所产生的Http请求数，使用<code>Nginx ngx_http_limit req_module</code>。</li><li>连接限制:限制同一时间的连接数,及并发数限制。使用<code>Nginx ngx_http_limit_conn_module</code>。</li></ul><br><h4 id="_6-3-3-请求频率限速实现的原理" tabindex="-1"><a class="header-anchor" href="#_6-3-3-请求频率限速实现的原理" aria-hidden="true">#</a> 6.3.3 请求频率限速实现的原理?</h4><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nginx频率限速原理.jpg" alt="nginx频率限速原理" tabindex="0" loading="lazy"><figcaption>nginx频率限速原理</figcaption></figure><br><p>如图：水(请求)从上方倒入水桶，从水桶下方流出(被处理) ;<br> 如果说水(请求) 流入的过快，水桶流出(被处理)的过慢，来不及流出的水存在水桶中(缓存)，然后以固定速率流出，水桶满后则水溢出(丢弃)<br><br></p><p><strong>简单来说就是</strong>:当处理速度,达不到请求的速度，则会将请求放置缓存， 然后持续处理。当缓存空间被沾满，如果还有大量的请求，则会被丢弃。<br></p><br><p><strong>请求限制</strong></p><p>连接限制主要用于处理用户的连接，只算是一方面的限制，而且有时候这样一刀切不是很友好，比如限制了总共允许多少个连接，如果别人属于攻击该网站，一下子建立一万个线程发起连接，可能你连接池两下就撑爆了，真正的用户进步不进来，此时就需要这样一个限制，限制来自同一个客户端的请求我们每秒只给它处理多少个请求，想要请求更多，那就等着，这样连接池不会被占满，别人也能正常使用。</p><br>`,203),c=n(`<br><table><thead><tr><th style="text-align:center;">参数</th><th>说明</th></tr></thead><tbody><tr><td style="text-align:center;">limit_req_zone</td><td>设置一块共享内存用来保存键值的状态参数。只能 http 段，语法：<code>limit_req_zone $variable zone=name:size rate=rate</code>;</td></tr><tr><td style="text-align:center;">limit_req_log_level</td><td>设置日志级别。语法：\`limit_req_log_level (info) (notice) (warn) (error);</td></tr><tr><td style="text-align:center;">limit_req_status</td><td>设置拒绝请求的响应状态码，默认 503。语法：<code>limit_req_status code</code>;</td></tr><tr><td style="text-align:center;">limit_req</td><td>设置对应的共享内存限制域和允许被处理的最大请求数阈值。语法：<code>limit_req zone=name [burst=number] [nodelay]</code>;</td></tr></tbody></table><br><p><strong>参数说明</strong>：</p><ul><li><code>limit_req_zone</code>：和之前的 <code>limit_conn_zone</code> 类似，只是多了个 rate 配置，用法也类似。</li><li><code>rate</code>：必须是整数，如 1r/s，如果是2秒处理1个只能换成 30r/m 这样来实现整数。</li><li><code>burst</code>：超出后允许的排队个数。</li><li><code>nodelay</code>：排队也能直接执行，但是再超出则马上返回 503。</li></ul><br><h4 id="_6-3-4-场景实践-限制单位时间内所产生的http请求数。" tabindex="-1"><a class="header-anchor" href="#_6-3-4-场景实践-限制单位时间内所产生的http请求数。" aria-hidden="true">#</a> 6.3.4 场景实践 限制单位时间内所产生的Http请求数。</h4><ol><li>模块指令：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Syntax: limit_req_zone key <span class="token assign-left variable">zone</span><span class="token operator">=</span>name:size <span class="token assign-left variable">rate</span><span class="token operator">=</span>rate<span class="token punctuation">;</span> 
Default: -
Context: http

Syntax: limit_conn zone number <span class="token punctuation">[</span> <span class="token assign-left variable">burst</span><span class="token operator">=</span>number<span class="token punctuation">]</span> <span class="token punctuation">[</span>nodelay<span class="token punctuation">]</span><span class="token punctuation">;</span>
Default: -
Context: http,server,location

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><ol start="2"><li>基于来源IP对下载速率限制，限制每秒处理1次请求，但可以突发超过5个请求放入缓存区</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># http标签段定义请求限制,rate限制速率，限制一秒钟最多一个IP请求</span>

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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><br><p>Nginx 默认包含了 <code>http_limit_conn_module</code> 模块，能够帮助我们对网站的用户请求量，网速，IP 等进行限制。防止不法分子而已对我们的网站进行攻击。<br></p><p><strong>参数包含如下</strong>：<br></p><table><thead><tr><th style="text-align:center;">参数</th><th>说明</th></tr></thead><tbody><tr><td style="text-align:center;"><code>limit_conn_zone</code></td><td>会话状态存储区域，只能 http 段配置，语法：<code>limit_conn_zone $variable zone=name:size</code>;</td></tr><tr><td style="text-align:center;"><code>limit_zone</code></td><td>和 <code>limit_conn_zone</code> 同等意思，已被弃用</td></tr><tr><td style="text-align:center;"><code>limit_conn_log_level</code></td><td>当达到最大限制连接数后，记录日志的等级，语法：<code>limit_conn_log_level info ( notice )( warn) ( error)</code></td></tr><tr><td style="text-align:center;"><code>limit_conn</code></td><td>指定每个给定键值的最大同时连接数，当超过时返回 503，语法：<code>limit_conn zone_name number</code></td></tr><tr><td style="text-align:center;"><code>limit_conn_status</code></td><td>指定当超过限制时，返回的状态码，默认是 503，语法：<code>limit_conn_status code;</code></td></tr><tr><td style="text-align:center;"><code>limit_rate</code></td><td>对每个连接限速。单位是字节/秒，设置为 0 将关闭限速，语法：<code>limit_rate rate</code>，实质是限制 IP 每个线程的网速</td></tr></tbody></table><br><p><strong>特别说明</strong>：</p><ul><li><code>limit_conn_zone</code> 一般用法：<code>limit_conn_zone $binary_remote_addr zone=addr:10m</code>;</li><li><code>$binary_remote_addr</code> 是二进制客户端地址，长度固定 4 字节，每个客户端以自己 IP 二进制作为键存储在空间中。</li><li>定义了一个空间，名称为 <code>addr</code>，给了 10M 共享内存，每 M 存大约 1.6 万。按需根据实际情况相应调整大小。</li></ul><h4 id="_6-3-5-场景实践-限制客户端同一时刻的并发连接数。" tabindex="-1"><a class="header-anchor" href="#_6-3-5-场景实践-限制客户端同一时刻的并发连接数。" aria-hidden="true">#</a> 6.3.5 场景实践 限制客户端同一时刻的并发连接数。</h4><ol><li>模块指令</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Syntax: limit_conn_zone key <span class="token assign-left variable">zone</span><span class="token operator">=</span>name:size<span class="token punctuation">;</span>
Default:  -
Context: http

Syntax: limit_conn zone number <span class="token punctuation">;</span>
Default:  -
Context: http,server,location
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><br><ol start="2"><li>设置共享内存区域和给定键值的最大允许个连接数2个，超过此限制时，服务器将返回503错误以回复请求</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>limit_conn_zone <span class="token variable">$binary_remote_addr</span> <span class="token assign-left variable">zone</span><span class="token operator">=</span>conn_mg:10m<span class="token punctuation">;</span> 

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><br><h4 id="_6-3-6-场景实践三-限制下载速度。" tabindex="-1"><a class="header-anchor" href="#_6-3-6-场景实践三-限制下载速度。" aria-hidden="true">#</a> 6.3.6 场景实践三 限制下载速度。</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><br><h4 id="_6-3-7-综合案例" tabindex="-1"><a class="header-anchor" href="#_6-3-7-综合案例" aria-hidden="true">#</a> 6.3.7 综合案例</h4><ul><li>限制web服务器请求数处理为1秒一个，触发值为5、限制用户仅可同时下载一个文件。</li><li>当下载超过100M则限制下载速度为500k。如果同时下载超过2个视频，则返回提示&quot;请联系站长进行会员充值&quot;。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>limit_req_zone <span class="token variable">$binary_remote_addr</span> <span class="token assign-left variable">zone</span><span class="token operator">=</span>req_mg:10m <span class="token assign-left variable">rate</span><span class="token operator">=</span>1r/s<span class="token punctuation">;</span>
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
        <span class="token builtin class-name">return</span> <span class="token number">200</span> <span class="token string">&#39;温馨提示--&gt;请联系站长进行会员充值&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    location / <span class="token punctuation">{</span>
       index index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><br><h3 id="_6-4-nginx-状态监控" tabindex="-1"><a class="header-anchor" href="#_6-4-nginx-状态监控" aria-hidden="true">#</a> 6.4 Nginx 状态监控</h3><p><code>ngx_http_stub_status_module</code>模块提供对基本状态信息的访问。 默认情况下不集成该模块，需要使用--with-http_stub_status_module集成。</p><ol><li>指令</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Syntax: stub_status<span class="token punctuation">;</span>
Default: -
Context: server, location
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><ol start="2"><li>示例配置</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name mirror .oldxu. com<span class="token punctuation">;</span>
    access_1og off<span class="token punctuation">;</span>
    
    location /nginx_ status <span class="token punctuation">{</span>  <span class="token comment">#不需要创建根目录</span>
    stub_ status <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="_6-4-1-提供以下状态信息" tabindex="-1"><a class="header-anchor" href="#_6-4-1-提供以下状态信息" aria-hidden="true">#</a> 6.4.1 提供以下状态信息</h3><table><thead><tr><th style="text-align:center;">状态</th><th>含义</th></tr></thead><tbody><tr><td style="text-align:center;">Active connections</td><td>当前活跃连接数，包括Waiting等待连接数。</td></tr><tr><td style="text-align:center;">accepts</td><td>已接收的总TCP连接数量。</td></tr><tr><td style="text-align:center;">handled</td><td>已处理的TCP连接数量。</td></tr><tr><td style="text-align:center;">requests</td><td>当前总http请求数量。</td></tr><tr><td style="text-align:center;">Reading</td><td>当前读取的请求头数量。</td></tr><tr><td style="text-align:center;">Writing</td><td>当前响应的请求头数量。</td></tr><tr><td style="text-align:center;">Waiting</td><td>当前等待请求的空闲客户端连接数</td></tr></tbody></table><br><h3 id="_6-4-2-如何简单理解reading、writing、-waiting。" tabindex="-1"><a class="header-anchor" href="#_6-4-2-如何简单理解reading、writing、-waiting。" aria-hidden="true">#</a> 6.4.2 如何简单理解Reading、Writing、 Waiting。</h3><p>假设现在有两条船分别为: C、S。C船需要S船的1个物品，那么此时C船就要给S船发送一个消息。</p><ol><li>S船收到这个消息时就是reading。</li><li>S船将物资发送给C船，这个时候就是writing。</li><li>如果C船需要S船很多个物品，那么需要C船和S船建立起一个物资传送管道，不断的传送物资。这个管道建立起来的时候，就是waiting状态了。</li></ol><br><br><h3 id="_6-5-nginx-location" tabindex="-1"><a class="header-anchor" href="#_6-5-nginx-location" aria-hidden="true">#</a> 6.5 Nginx Location</h3><ol><li>什么是Location Location用来控制访问网站的uri路径</li></ol><br><ol start="2"><li>Location语法</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>location<span class="token punctuation">[</span><span class="token operator">=</span><span class="token operator">|</span>~<span class="token operator">|</span>~*<span class="token operator">|</span>^~<span class="token punctuation">]</span>uri<span class="token punctuation">{</span><span class="token punctuation">..</span>.<span class="token punctuation">}</span>
location @name <span class="token punctuation">{</span> <span class="token punctuation">..</span>. <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th style="text-align:center;">匹配符</th><th style="text-align:center;">匹配规则</th><th style="text-align:center;">优先级</th></tr></thead><tbody><tr><td style="text-align:center;"><code>=</code></td><td style="text-align:center;">精确匹配</td><td style="text-align:center;">1</td></tr><tr><td style="text-align:center;"><code>^~</code></td><td style="text-align:center;">以某个字符串开头</td><td style="text-align:center;">2</td></tr><tr><td style="text-align:center;"><code>~</code></td><td style="text-align:center;">区分大小写的正则匹配</td><td style="text-align:center;">3</td></tr><tr><td style="text-align:center;"><code>~*</code></td><td style="text-align:center;">不区分大小写的正则匹配</td><td style="text-align:center;">4</td></tr><tr><td style="text-align:center;"><code>/</code></td><td style="text-align:center;">通用匹配，任何请求都会匹配到</td><td style="text-align:center;">5</td></tr></tbody></table><br><br><ol start="3"><li>location优先级语法示例</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name location.xin.com<span class="token punctuation">;</span> 
    
    
    location <span class="token operator">=</span> / <span class="token punctuation">{</span>
         default_type text/html<span class="token punctuation">;</span>
         <span class="token builtin class-name">return</span> <span class="token number">200</span> <span class="token string">&#39;location = /&#39;</span><span class="token punctuation">;</span>


    location / <span class="token punctuation">{</span>
        default_type text/html<span class="token punctuation">;</span>
         <span class="token builtin class-name">return</span> <span class="token number">200</span> <span class="token string">&#39;location /&#39;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>


    location /documents/ <span class="token punctuation">{</span>
        default_type text/html<span class="token punctuation">;</span>
         <span class="token builtin class-name">return</span> <span class="token number">200</span> <span class="token string">&#39;location /documents/&#39;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>


    location ^~ /images/ <span class="token punctuation">{</span>
        default_type text/html<span class="token punctuation">;</span>
         mreturn <span class="token number">200</span> <span class="token string">&#39;location ^~ /images/&#39;</span> <span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    location ~* <span class="token punctuation">\\</span>. <span class="token punctuation">(</span>gif<span class="token operator">|</span>jpgljpeg<span class="token punctuation">)</span>$ <span class="token punctuation">{</span>
        default_type text/html<span class="token punctuation">;</span>
         <span class="token builtin class-name">return</span> <span class="token number">200</span> <span class="token string">&#39;location ~* \\. (gif|jpgljpeg)&#39;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#测试结果如下(建议是curL测试)</span>

<span class="token comment">#1.请求http://location.xin.com/</span>
会被Location <span class="token operator">=</span>/匹配

<span class="token comment">#2.请求http://location.xin.com/index.html</span>
会被Location /匹配

<span class="token comment">#3.请求http://location.xin.com/documents/1.html</span>
会被Location /documents/匹配

<span class="token comment">#4.请求http://location.xin.com/images/1.gif</span>
会被Location ^~ /images/匹配

<span class="token comment">#5.请求http://location.xin.com/documents/1.jpg</span>
会被location ~* <span class="token punctuation">\\</span>.<span class="token punctuation">(</span>gif<span class="token operator">|</span>jpg<span class="token operator">|</span>jpeg<span class="token punctuation">)</span>$匹配

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>Locaiton 规则配置应用场景，可进行验证测试</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name location.xin.com<span class="token punctuation">;</span> 
    
    
    
    <span class="token comment">#通用匹配，任何请求都会匹配到</span>
    location / <span class="token punctuation">{</span>
    root html<span class="token punctuation">;</span>
    index index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    
    <span class="token comment">#精准匹配,必须请求的uri是/nginx_status</span>
    location <span class="token operator">=</span> /nginx_status <span class="token punctuation">{</span>
    stub_status <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">#严格区分大小写，匹配以.php结尾的都走这个location</span>
    location ~ <span class="token punctuation">\\</span>.php$ <span class="token punctuation">{</span>
    default_type text/html<span class="token punctuation">;</span>
    <span class="token builtin class-name">return</span> <span class="token number">200</span> <span class="token string">&#39;php访问成功&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token comment">#严格区分大小写，匹配以.jsp结尾的都走这个location</span>
    location ~ <span class="token punctuation">\\</span>.jsp$ <span class="token punctuation">{</span>
    default_type text/html<span class="token punctuation">;</span>
    <span class="token builtin class-name">return</span> <span class="token number">200</span> <span class="token string">&#39;jsp访问成功&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token comment">#不区分大小写匹配，只要用户访问.jpg,gif,png,js,css都走这条location</span>
    location ~* <span class="token punctuation">\\</span>. <span class="token punctuation">(</span>jpg<span class="token operator">|</span>gif<span class="token operator">|</span>png<span class="token operator">|</span>js<span class="token operator">|</span>css<span class="token punctuation">)</span>$ <span class="token punctuation">{</span>
    <span class="token builtin class-name">return</span> <span class="token number">403</span><span class="token punctuation">;</span>
    
    
    <span class="token comment">#不区分大小写匹配</span>
    location ~* <span class="token punctuation">\\</span>. <span class="token punctuation">(</span>sq1<span class="token operator">|</span>bak<span class="token operator">|</span>tgz<span class="token operator">|</span>tar.gz<span class="token operator">|</span>.git<span class="token punctuation">)</span>$ <span class="token punctuation">{</span>
    deny all<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,67);function d(o,r){return a(),e("div",null,[l,i(" Nginx 的 `http_limit_req_module` 模块就可以实现该需求，并且默认编译。 "),c])}const u=s(t,[["render",d],["__file","nginx-web.html.vue"]]);export{u as default};
