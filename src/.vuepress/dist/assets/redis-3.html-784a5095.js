import{_ as i,V as l,W as r,Y as n,Z as s,a0 as d,X as e,C as t}from"./framework-8eb1d601.js";const c={},p=e('<h1 id="redis-基础知识" tabindex="-1"><a class="header-anchor" href="#redis-基础知识" aria-hidden="true">#</a> Redis 基础知识</h1><p>Redis 是 Remote Dictionary Server(远程数据服务)的缩写，由意大利人 antirez(Salvatore Sanfilippo) 开发的一款 内存高速缓存数据库，该软件使用 C 语言编写,它的数据模型为 key-value。</p><br><p><strong>官方介绍</strong>：</p><p>Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker. Redis provides data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams. Redis has built-in replication, Lua scripting, LRU eviction, transactions, and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster.</p><br><p>Redis是一个开源（BSD许可）的内存数据结构存储，被用作数据库、缓存和消息代理。Redis提供的数据结构包括：字符串、哈希值、列表、集合、带范围查询的排序集合、位图、超日志、地理空间索引和流。Redis有内置的复制、Lua脚本、LRU驱逐、事务和不同级别的磁盘持久性，并通过Redis Sentinel和Redis Cluster的自动分区提供高可用性。</p><br><p><strong>关键点</strong>： 开源、基于内存的数据结构存储、可以作为数据库、缓存、消息代理 提供了 九种+ 的数据结构。</p><p>支持各种功能 - 复制、内部检测、事务操作、数据持久化、高可用功能(高可用、高扩展)</p><p><strong>趋势</strong>：</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/Redis趋势图1.jpg" alt="Redis趋势图1" tabindex="0" loading="lazy"><figcaption>Redis趋势图1</figcaption></figure><br><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/Redis趋势图2.jpg" alt="Redis趋势图2" tabindex="0" loading="lazy"><figcaption>Redis趋势图2</figcaption></figure>',14),o={href:"https://db-engines.com/en/ranking/key-value+store/all",target:"_blank",rel:"noopener noreferrer"},v=e(`<br><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2><p>我们直接从几种数据本身的应用特性来描述一下该软件的应用场景：</p><ul><li><p>Sort Set (有序集合)</p><p>有序集合在普通集合的基础上做了分数比较的特性，所以主要用来做一些分类排序等功能</p><p>比如：排行榜应用，取 top n 操作</p></li><li><p>List (列表)</p><p>列表本身具有排序、切片等特性，因为redis的基于内存的分布式特性，它主要来做一些数据筛选、排序等功能</p><p>比如：获得最新 N 个数据 或 某个分类的最新数据等</p></li><li><p>String (字符串)</p><p>字符串的其实就是数据的临时存储，借助于redis的内存特性，主要做一些共享之类的功能。</p><p>比如：计数器应用、会话共享、购物车状态数据等</p></li><li><p>Set (集合)</p><p>集合主要是数据的统计，由于数据本身具有权重的特性，所以判断数据是否存在的特性要比list好很多。</p><p>比如：获得共同数据、安全防御的ip判断、社交好友等</p></li></ul><br><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>以数据存储本身的角度来说场景
		有序集合	- 各种排行、topn
		list 	   - 数据的排布，顺序
		sort集合    - 范围数据列表
		string     - 数据的存储
		hash字典	  - 数据分类(子分类)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只要你有丰富的想象力，redis你想着么用就怎么用。</p><br><h2 id="redis-部署" tabindex="-1"><a class="header-anchor" href="#redis-部署" aria-hidden="true">#</a> Redis 部署</h2><p><strong>Redis</strong> 的安装有两种方式，一个是多主机环境下使用、一个是单台主机部署方便实验测试。</p><p><strong>通过软件源安装</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装源仓库</span>
add-apt-repository ppa:redislabs/redis
<span class="token function">apt-get</span> update

<span class="token comment"># 查看软件版本</span>
<span class="token function">apt</span> info redis
<span class="token function">apt</span> info redis-server
<span class="token comment"># 安装软件</span>
<span class="token function">apt</span> <span class="token function">install</span> redis
注意：会自动安装 redis-server、redis-tools 依赖软件

<span class="token comment"># 服务管理</span>
systemctl stop redisredis-server
systemctl disable redis-server
systemctl start redis-server

<span class="token comment"># 默认启动的端口号6379</span>

<span class="token comment"># 进入redis数据库</span>
redis-cli

<span class="token comment"># 查看信息</span>
info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>手工安装方式</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载软件</span>
<span class="token function">mkdir</span> /data/softs <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> /data/softs
<span class="token function">wget</span> https://download.redis.io/releases/redis-6.2.5.tar.gz

<span class="token comment"># 解压文件</span>
<span class="token function">tar</span> xf redis-6.2.5.tar.gz
<span class="token builtin class-name">cd</span> redis-6.2.5/

<span class="token comment"># 确认安装效果</span>
<span class="token function">grep</span> <span class="token string">&#39;make PREF&#39;</span> <span class="token parameter variable">-B</span> <span class="token number">2</span> README.md
% <span class="token function">make</span> <span class="token function">install</span>

<span class="token comment"># 指定安装路径</span>
You can use <span class="token variable"><span class="token variable">\`</span><span class="token function">make</span> <span class="token assign-left variable">PREFIX</span><span class="token operator">=</span>/some/other/directory <span class="token function">install</span><span class="token variable">\`</span></span> <span class="token keyword">if</span> you wish to use a

<span class="token comment"># 编译安装</span>
<span class="token function">make</span> <span class="token assign-left variable">PREFIX</span><span class="token operator">=</span>/data/server/redis <span class="token function">install</span>
<span class="token comment"># 此命令已经将make编译安装的步骤整合在一起</span>

<span class="token comment"># 查看效果</span>
<span class="token comment"># tree /data/server/redis/</span>
/data/server/redis/
└── bin
├── redis-benchmark
├── redis-check-aof -<span class="token operator">&gt;</span> redis-server
├── redis-check-rdb -<span class="token operator">&gt;</span> redis-server
├── redis-cli
├── redis-sentinel -<span class="token operator">&gt;</span> redis-server
└── redis-server
<span class="token number">1</span> directory, <span class="token number">6</span> files

<span class="token comment"># 配置环境变量</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;PATH=/data/server/redis/bin:$PATH&#39;</span> <span class="token operator">&gt;</span> /etc/profile.d/redis.sh
<span class="token builtin class-name">source</span> /etc/profile.d/redis.sh

<span class="token comment"># 创建基本目录</span>
<span class="token function">mkdir</span> /data/server/redis/<span class="token punctuation">{</span>etc,log,data,run<span class="token punctuation">}</span> <span class="token parameter variable">-p</span>
<span class="token comment"># 因为redis service 里面指定这几个路径因此要创建出来用于服务存放数据</span>
<span class="token function">cp</span> redis.conf /data/server/redis/etc/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>启动命令</strong></p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/Redis启动命令.jpg" alt="Redis启动命令" tabindex="0" loading="lazy"><figcaption>Redis启动命令</figcaption></figure><p><strong>前台方式启动 redis</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>redis-server /data/server/redis/etc/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/Redis前台方式启动.jpg" alt="Redis前台方式启动" tabindex="0" loading="lazy"><figcaption>Redis前台方式启动</figcaption></figure><p>检查效果</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/Redis启动端口.jpg" alt="Redis启动端口" tabindex="0" loading="lazy"><figcaption>Redis启动端口</figcaption></figure><p>redis在可以基于同一个配置文件启动多个程序</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动多个实例</span>
redis-server /data/server/redis/etc/redis.conf <span class="token parameter variable">--port</span> <span class="token number">6666</span>
redis-server /data/server/redis/etc/redis.conf <span class="token parameter variable">--port</span> <span class="token number">7777</span>
redis-server /data/server/redis/etc/redis.conf <span class="token parameter variable">--port</span> <span class="token number">8888</span>
redis-server /data/server/redis/etc/redis.conf <span class="token parameter variable">--port</span> <span class="token number">9999</span>
<span class="token comment"># 查看效果</span>
<span class="token function">netstat</span> <span class="token parameter variable">-tnulp</span> <span class="token operator">|</span> <span class="token function">grep</span> redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/Redis多实例.jpg" alt="Redis多实例" tabindex="0" loading="lazy"><figcaption>Redis多实例</figcaption></figure><p><strong>后台方式启动</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 定制redis配置文件</span>
root@python-auto:~<span class="token comment"># vim /data/server/redis/etc/redis.conf</span>

<span class="token comment"># daemonize no 将redis的启动设定为后台启动</span>
daemonize <span class="token function">yes</span>
<span class="token builtin class-name">bind</span> <span class="token number">10.0</span>.0.12 <span class="token number">127.0</span>.0.1 
<span class="token comment">#增加本地IP地址</span>

<span class="token comment"># 启动redis服务</span>
/data/server/redis/bin/redis-server /data/server/redis/etc/redis.conf

<span class="token comment"># 查看效果</span>
<span class="token function">netstat</span> <span class="token parameter variable">-tnulp</span> <span class="token operator">|</span> <span class="token function">grep</span> redis

<span class="token comment"># 关闭服务</span>
redis-cli <span class="token function">shutdown</span>
<span class="token comment">#注意此命令是将本机中的所有实例进程全部关闭</span>
redis-cli <span class="token parameter variable">-h</span> <span class="token number">127.0</span>.0.1 <span class="token parameter variable">-p</span> <span class="token number">6666</span>
<span class="token comment">#访问进程</span>
<span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">lsof</span> <span class="token parameter variable">-Pti</span> :6379<span class="token variable">)</span></span>

<span class="token comment">#启动多实例</span>

redis-server /data/server/redis/etc/redis.conf <span class="token parameter variable">--port</span> <span class="token number">6380</span>
redis-server /data/server/redis/etc/redis.conf <span class="token parameter variable">--port</span> <span class="token number">6381</span>
redis-server /data/server/redis/etc/redis.conf <span class="token parameter variable">--port</span> <span class="token number">6382</span>
redis-server /data/server/redis/etc/redis.conf <span class="token parameter variable">--port</span> <span class="token number">6383</span>

<span class="token comment">#伪集群效果</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简单实践" tabindex="-1"><a class="header-anchor" href="#简单实践" aria-hidden="true">#</a> 简单实践</h2><h3 id="查看配置" tabindex="-1"><a class="header-anchor" href="#查看配置" aria-hidden="true">#</a> 查看配置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@python-auto:/etc/redis<span class="token comment"># grep -Env &#39;#|^$&#39; redis.conf</span>
<span class="token number">75</span>:bind <span class="token number">127.0</span>.0.1 -::1 绑定地址
<span class="token number">94</span>:protected-mode <span class="token function">yes</span>
<span class="token number">98</span>:port <span class="token number">6379</span> 暴露端口
<span class="token number">107</span>:tcp-backlog <span class="token number">511</span> 连接队列
<span class="token number">119</span>:timeout <span class="token number">0</span>
<span class="token number">136</span>:tcp-keepalive <span class="token number">300</span>
<span class="token number">257</span>:daemonize <span class="token function">yes</span> 后台启动
<span class="token number">275</span>:supervised auto
<span class="token number">289</span>:pidfile /run/redis/redis-server.pid
<span class="token number">297</span>:loglevel notice
<span class="token number">302</span>:logfile /var/log/redis/redis-server.log
<span class="token number">327</span>:databases <span class="token number">16</span> 默认16个数据库
<span class="token number">336</span>:always-show-logo no
<span class="token number">341</span>:set-proc-title <span class="token function">yes</span>
<span class="token number">358</span>:proc-title-template <span class="token string">&quot;{title} {listen-addr} {server-mode}&quot;</span>
<span class="token number">398</span>:stop-writes-on-bgsave-error <span class="token function">yes</span>
<span class="token number">404</span>:rdbcompression <span class="token function">yes</span>
<span class="token number">413</span>:rdbchecksum <span class="token function">yes</span>
<span class="token number">431</span>:dbfilename dump.rdb 数据文件名称
<span class="token number">444</span>:rdb-del-sync-files no
<span class="token number">454</span>:dir /var/lib/redis 数据文件所在目录
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="常用操作命令" tabindex="-1"><a class="header-anchor" href="#常用操作命令" aria-hidden="true">#</a> 常用操作命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 连接数据库</span>
root@python-auto:/etc/redis<span class="token comment"># redis-cli 精简连接格式</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span>
root@python-auto:/etc/redis<span class="token comment"># redis-cli -h localhost -p 6379 标准连接格式</span>
localhost:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span>
root@python-auto:~<span class="token comment"># redis-cli --raw 中文连接格式</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span>
<span class="token comment"># 测试效果</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token function">ping</span>
PONG
<span class="token comment"># 退出效果</span>
<span class="token number">127.0</span>.0.1:6379<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> quit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看帮助信息" tabindex="-1"><a class="header-anchor" href="#查看帮助信息" aria-hidden="true">#</a> <strong>查看帮助信息</strong>：</h4><p>​</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span>
redis-cli <span class="token number">6.2</span>.5
To get <span class="token builtin class-name">help</span> about Redis commands type:
<span class="token string">&quot;help @&lt;group&gt;&quot;</span> to get a list of commands <span class="token keyword">in</span> <span class="token operator">&lt;</span>group<span class="token operator">&gt;</span>
<span class="token string">&quot;help &lt;command&gt;&quot;</span> <span class="token keyword">for</span> <span class="token builtin class-name">help</span> on <span class="token operator">&lt;</span>command<span class="token operator">&gt;</span>
<span class="token string">&quot;help &lt;tab&gt;&quot;</span> to get a list of possible <span class="token builtin class-name">help</span> topics
<span class="token string">&quot;quit&quot;</span> to <span class="token builtin class-name">exit</span>
To <span class="token builtin class-name">set</span> redis-cli preferences:
<span class="token string">&quot;:set hints&quot;</span> <span class="token builtin class-name">enable</span> online hints
<span class="token string">&quot;:set nohints&quot;</span> disable online hints
Set your preferences <span class="token keyword">in</span> ~/.redisclirc
注意：
历史操作命令在 ~/.rediscli_history 文件中
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="命令组解析" tabindex="-1"><a class="header-anchor" href="#命令组解析" aria-hidden="true">#</a> 命令组解析</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>redis将大量的命令进行了简单的分组操作，对于6.2.5来说，他有 <span class="token number">15</span>个命令组
@generic 通用的命令组
@string 字符相关命令组
@list 列表相关命令组
@set 集合相关命令组
@sorted_set 有序集合相关命令组
@hash hash相关命令组
@pubsub 发布订阅相关命令组
@transactions 事务相关命令组
@connection 连接相关命令组
@server 服务相关命令组
@scripting 脚本相关命令组
@hyperloglog 超级日志相关命令组
@cluster 集群相关命令组
@geo 基因类数据相关命令组
@stream 流数据相关命令组

——————————————————————————————————
<span class="token comment">#查看命令组</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span> @generic
<span class="token comment">#查看组中单独命令帮助</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span> ECHO
ECHO message
summary: Echo the given string
since: <span class="token number">1.0</span>.0
group: connection
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 选择数据库</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token keyword">select</span> <span class="token number">5</span>
OK
<span class="token number">127.0</span>.0.1:6379<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>
<span class="token comment"># 查看所有属性信息</span>
<span class="token number">127.0</span>.0.1:6379<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> info
<span class="token punctuation">..</span>.
<span class="token comment"># 查看部分属性信息</span>
<span class="token number">127.0</span>.0.1:6379<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> info cpu
<span class="token comment"># CPU</span>
used_cpu_sys:1.222606
used_cpu_user:0.905046
used_cpu_sys_children:0.000000
used_cpu_user_children:0.000000
used_cpu_sys_main_thread:1.221889
used_cpu_user_main_thread:0.904515
<span class="token comment"># 获取配置属性</span>
<span class="token number">127.0</span>.0.1:6379<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> CONFIG GET <span class="token builtin class-name">bind</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;bind&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;127.0.0.1 -::1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="key-相关命令" tabindex="-1"><a class="header-anchor" href="#key-相关命令" aria-hidden="true">#</a> <strong>Key 相关命令</strong></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 获取所有的key信息</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span> KEYS
KEYS pattern
summary: Find all keys matching the given pattern
since: <span class="token number">1.0</span>.0
group: generic
<span class="token comment"># 判断一个key是否存在</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span> EXISTS
EXISTS key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
summary: Determine <span class="token keyword">if</span> a key exists
since: <span class="token number">1.0</span>.0
group: generic
<span class="token comment"># 设置一个key</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span> <span class="token builtin class-name">set</span>
SET key value <span class="token punctuation">[</span>EX seconds<span class="token operator">|</span>PX milliseconds<span class="token operator">|</span>EXAT timestamp<span class="token operator">|</span>PXAT millisecondstimestamp<span class="token operator">|</span>
KEEPTTL<span class="token punctuation">]</span> <span class="token punctuation">[</span>NX<span class="token operator">|</span>XX<span class="token punctuation">]</span> <span class="token punctuation">[</span>GET<span class="token punctuation">]</span>
summary: Set the string value of a key
since: <span class="token number">1.0</span>.0
group: string
<span class="token comment"># 获取一个key</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span> get
GET key
summary: Get the value of a key
since: <span class="token number">1.0</span>.0
group: string
<span class="token comment"># 删除一个key</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span> DEL
DEL key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
summary: Delete a key
since: <span class="token number">1.0</span>.0
group: generic
<span class="token comment"># 查看key的类型</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span> TYPE
TYPE key
summary: Determine the <span class="token builtin class-name">type</span> stored at key
since: <span class="token number">1.0</span>.0
group: generic
<span class="token comment"># 设置一个有过期期限的key</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span> EXPIRE
EXPIRE key seconds
summary: Set a key&#39;s <span class="token function">time</span> to live <span class="token keyword">in</span> seconds
since: <span class="token number">1.0</span>.0
group: generic
<span class="token comment"># 查看一个key的有效时间</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span> TTL
TTL key
summary: Get the <span class="token function">time</span> to live <span class="token keyword">for</span> a key
since: <span class="token number">1.0</span>.0
group: generic
<span class="token comment"># 删除当前库的所有key</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span> FLUSHDB
FLUSHDB <span class="token punctuation">[</span>ASYNC<span class="token operator">|</span>SYNC<span class="token punctuation">]</span>
summary: Remove all keys from the current database
since: <span class="token number">1.0</span>.0
group: server
<span class="token comment"># 删除当前数据库所有的数据</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span> FLUSHALL
FLUSHALL <span class="token punctuation">[</span>ASYNC<span class="token operator">|</span>SYNC<span class="token punctuation">]</span>
summary: Remove all keys from all databases
since: <span class="token number">1.0</span>.0
group: server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> String</h3><p>string类型是实战中应用最多的数据类型，可以用于各种其他类型数据的值的存储，非常方便</p><p><strong>特点</strong>：</p><ul><li>其他数据类型的数据表现样式</li><li>简单的数据存储</li></ul><p><strong>示例</strong>： cookie、session、校验码等</p><p><strong>简单实践</strong></p><h4 id="设定key" tabindex="-1"><a class="header-anchor" href="#设定key" aria-hidden="true">#</a> 设定key</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>设定一个普通的key
<span class="token builtin class-name">set</span> key value

设定一个有过期时间的key

setex key seconds value

同时设定多个值
mset key1 value1 key2 value2 <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="获取key" tabindex="-1"><a class="header-anchor" href="#获取key" aria-hidden="true">#</a> 获取key</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>获取一个key
get key

获取多个key
mget key1 key2 <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="删除key" tabindex="-1"><a class="header-anchor" href="#删除key" aria-hidden="true">#</a> 删除key</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>删除一个key
del key1

删除多个key
del key1 key2 <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="list" tabindex="-1"><a class="header-anchor" href="#list" aria-hidden="true">#</a> List</h3><p>list 是一个string类型的 列表，redis的每个list都可以存储 2^32 -1 个元素，列表的元素方便排 序、获取、统计等相关操作。</p><p>各种各样的列表场景都可以</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/lish类型数据.jpg" alt="lish类型数据" tabindex="0" loading="lazy"><figcaption>lish类型数据</figcaption></figure><h4 id="设定key-1" tabindex="-1"><a class="header-anchor" href="#设定key-1" aria-hidden="true">#</a> <br>设定key</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>左侧添加数据
lpush key value1 value2
右侧添加数据
rpush key value1 value2
插入指定元素
linsert key before<span class="token operator">|</span>after 现有元素 新元素
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="获取key-1" tabindex="-1"><a class="header-anchor" href="#获取key-1" aria-hidden="true">#</a> 获取key</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>获取列表数据
lrange key start stop
注意：start 是从 <span class="token number">0</span>开始、stop如果为 -1的话，代表最后一个。

获取key指定位置的值
LINDEX key index

获取key列表的值的数量
LLEN key

根据key获取在当前列表的位置
LPOS key 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="删除key-1" tabindex="-1"><a class="header-anchor" href="#删除key-1" aria-hidden="true">#</a> 删除key</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>从key中删除指定的value
lrem key count value

注意：
count <span class="token operator">&gt;</span> <span class="token number">0</span>: 从头往尾移除指定数量个 value
count <span class="token operator">&lt;</span> <span class="token number">0</span>: 从尾往头移除指定数量个 value
count <span class="token operator">=</span> <span class="token number">0</span>: 移除所有的 value


从key的左侧删除指定个数的 value
LPOP key <span class="token punctuation">[</span>count<span class="token punctuation">]</span>


从key的右侧删除指定个数的 value
RPOP key <span class="token punctuation">[</span>count<span class="token punctuation">]</span>


保留范围数据，范围之外的都删除
LTRIM key 起始索引 结束索引



实践：
lpush mylist e b e b e b  在左侧插入 ebebebe
lrang mylist <span class="token number">0</span> <span class="token parameter variable">-1</span> 显示
lrem mylist <span class="token number">3</span> e 从左侧开始删除3个e
lrem mylist <span class="token number">3</span> b 从左侧开始删除3个b
lrem mylist <span class="token parameter variable">-1</span> <span class="token number">3</span> 从尾部右侧删除1个3
lrem mylist <span class="token number">0</span> a   <span class="token operator">=</span><span class="token number">0</span>删除所有的a 
ltrim mylist <span class="token number">2</span> <span class="token number">3</span> 只保留2到3 其他的都删除
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> set</h3><p>set 是一个string类型的 集合，redis的每个list都可以存储 2^32 -1 个元素，集合元素无序且不重 复，可以进行各种排序统计场景。</p><p>场景： 内容不重复的任何场景都可以</p><br><p><strong>无序集合</strong></p><h4 id="设定key-2" tabindex="-1"><a class="header-anchor" href="#设定key-2" aria-hidden="true">#</a> 设定key</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>添加数据
SADD key member <span class="token punctuation">[</span>member <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

注意：
因为是无序的，所以查看的时候，没有顺序
如果key中已经存在 member，那么不会重复增加

合并多个key
SUNION key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
将多个key的内容合并在一起，相同的member只会存在一个
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p><strong>获取key</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>获取set数据
SMEMBERS key

获取set中的member个数
SCARD key

获取多个key相同的内容 -- 取交集
SINTER key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

获取多个key不相同的内容 -- 取差集
SDIFF key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="删除key-2" tabindex="-1"><a class="header-anchor" href="#删除key-2" aria-hidden="true">#</a> <br>删除key</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>从key中删除指定的member
SREM key member [member ...]

从key的随机删除指定个数的 member
SPOP key [count]

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="sort-set" tabindex="-1"><a class="header-anchor" href="#sort-set" aria-hidden="true">#</a> Sort set</h3><p>set 是一个string类型的 集合，redis的每个list都可以存储 2^32 -1 个元素，集合元素无序且不重 复，可以进行各种排序统计场景。</p><p><strong>有序集合 sortset</strong></p><p>场景： 排行榜、topN</p><h4 id="设定key-3" tabindex="-1"><a class="header-anchor" href="#设定key-3" aria-hidden="true">#</a> 设定key</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>添加数据
ZADD key score member [score member ...]

注意：
因为每个member有score，所以查看的时候，有会按照score的值进行排序
如果key中已经存在 member，那么不会重复增加
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="获取key-2" tabindex="-1"><a class="header-anchor" href="#获取key-2" aria-hidden="true">#</a> 获取key</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>获取有序集合数据
ZRANGE key min max [REV]

注意：
min 是从 0开始、max如果为 -1的话，代表最后一个。
rev 代表反序

获取有序集合中的指定分数范围的元素
ZRANGEBYSCORE key min max

获取有序集合元素的权重
ZSCORE key member

获取有序集合元素个数
ZCARD key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="删除key-3" tabindex="-1"><a class="header-anchor" href="#删除key-3" aria-hidden="true">#</a> 删除key</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>从key中删除指定的member
ZREM key member [member ...]

从key的随机删除指定个数的 member
ZREMRANGEBYSCORE key min max
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sortset 实践

添加数据
zadd mysortset 89 zhangsan 67 lisi 76 wangwu 91 madong 100 chunpeng

正序查看
zrange mysortset 0 -1
倒序查看
zrange mysortset 0 -1 rev
查看有序集合key个数
zcard mysortset 
查看66-89对应范围的人
zrangebyscore mysortset 66 89
删除指定 zhangsan lisi
zrem mysortset lishi zhangsan
删除指定分数范围的key，删除60分以上的人
zremrangebyscore mysortset 60 100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> Hash</h3><p>hash 是一个string类型的 字段和值 的关联表，redis的每个hash都可以存储 2^32 -1 个键值对，非 常适合于存储对象场景。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/hash.jpg" alt="hash" tabindex="0" loading="lazy"><figcaption>hash</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>使用场景：
	某个对象的特定属性：
		person: {
			username: zhangsan,
			password: 123456,
			address: beijign,
			xxx: xxx
		}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="设定-key" tabindex="-1"><a class="header-anchor" href="#设定-key" aria-hidden="true">#</a> 设定 key</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>添加数据
HSET key field value [field value ...]

注意：在实践的时候、hset 也可以实现添加多个数据对的效果
添加多个数据
HMSET key field value [field value ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="获取-key" tabindex="-1"><a class="header-anchor" href="#获取-key" aria-hidden="true">#</a> <strong>获取 key</strong></h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>获取所有属性
HKEYS key

获取多个属性的值
HMGET key field [field ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p><strong>删除 key</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>从key中删除指定的value
HDEL key field [field ...]

直接删除key所有的内容
del key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>实践：
增加数据
hset person username zhangsan age 36 weight 140 height 1789 wife hanmeimei
查看集合
HKEYS person

HMGET person username age wife
晒选删除字段
hdel person wife
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,110);function u(m,b){const a=t("ExternalLinkIcon");return l(),r("div",null,[p,n("p",null,[s("资料来源："),n("a",o,[s("https://db-engines.com/en/ranking/key-value+store/all"),d(a)])]),v])}const g=i(c,[["render",u],["__file","redis-3.html.vue"]]);export{g as default};
