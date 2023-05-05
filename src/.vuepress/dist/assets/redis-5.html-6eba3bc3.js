import{_ as n,V as s,W as a,X as e}from"./framework-8eb1d601.js";const i={},l=e(`<h1 id="redis-持久复制" tabindex="-1"><a class="header-anchor" href="#redis-持久复制" aria-hidden="true">#</a> Redis 持久复制</h1><p>Redis虽然是一个内存级别的缓存程序，但是其可以将内存的数据按照一定的策略保存到硬盘上，从而实现数据持久保存的目的。</p><p>目前，redis支持两种不同方式的数据持久化保存机制：</p><p><strong>RDB</strong></p><ul><li><p>基于时间，生成某个时间点的快照文件，默认只保留最近的一次快照。</p></li><li><p>恢复速度非常快，但是可能丢失之前的快照数据，非实时同步。</p></li></ul><p><strong>AOF</strong></p><ul><li>AppendOnlyFile(日志追加模式),基于Redis协议格式保存信息到指定日志文件的末尾</li><li>基于写时复制的机制，每隔x秒将新执行的命令同步到对应的文件中</li><li>默认是禁用的，需要开启数据保存全，时间过长导致文件过大，恢复时候速度比RDB慢。</li></ul><p>数据保存时有两个命令，</p><p>实践效果，先执行一个bgsave把同步过后的文件拷贝到一个临时文件里面，然后再当前环境下做一些操作，把redis 关闭，然后把之前保存的文件拷贝到redis 数据目录，redis在启动的时候会读取db文件，由于这个文件是拷贝回来的所以还原的数据应该是没有执行操作之前的数据。</p><br><h3 id="rdb原理" tabindex="-1"><a class="header-anchor" href="#rdb原理" aria-hidden="true">#</a> RDB原理</h3><p>Redis从master主进程中创建一个子进程，基于写时复制机制，子进程将内存的数据保存到.rdb文件中，数据保存完毕后，再将上次保存的rdb文件覆盖替换掉，最后关闭子进程。 Redis提供了手工的机制，我们可以执行命令实现文件的保存</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/redis-RDB.jpg" alt="redis-RDB" tabindex="0" loading="lazy"><figcaption>redis-RDB</figcaption></figure><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/redis-RDB2.jpg" alt="redis-RDB2" tabindex="0" loading="lazy"><figcaption>redis-RDB2</figcaption></figure><br><h3 id="aof-原理" tabindex="-1"><a class="header-anchor" href="#aof-原理" aria-hidden="true">#</a> <strong>AOF 原理</strong></h3><p>AOF 以协议文本的方式，将所有对数据库进行过写入的命令（及其参数）记录到 AOF 文件，以此达到记录数据库状态的目的。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/redis-AOF.jpg" alt="redis-AOF" tabindex="0" loading="lazy"><figcaption>redis-AOF</figcaption></figure><br><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rdb
	优势：
        - 基于数据的快照来进行存储
        - 数据完整
        - 策略非常灵活
	劣势：
		- 数据量大的时候，快照文件也大
		- bgsave的时候，会以覆盖的方式同步数据，有可能导致部分数据丢失
			对于此我们可以借助于 定时备份的方式将数据额外保存
aof
	优势：
		- 基于操作命令的方式进行数据的存储
		- 容量非常小
	劣势：
		- 对于基础的数据有一定的依赖
		
使用场景：
	rdb 做基础数据的备份
	aof 做实时数据的备份
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简单实践" tabindex="-1"><a class="header-anchor" href="#简单实践" aria-hidden="true">#</a> 简单实践</h2><h4 id="rdb-实践" tabindex="-1"><a class="header-anchor" href="#rdb-实践" aria-hidden="true">#</a> RDB 实践</h4><p>RDB配置解析</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>自动保存机制
root@python-auto:~<span class="token comment"># grep -Env &#39;#|^$&#39; /etc/redis/redis.conf</span>
<span class="token punctuation">..</span>.
save <span class="token string">&#39;&#39;</span> 关闭该功能
<span class="token number">381</span>:save <span class="token number">3600</span> <span class="token number">1</span>  <span class="token comment"># 3600秒内提交一次数据</span>
<span class="token number">382</span>:save <span class="token number">300</span> <span class="token number">100</span>
<span class="token number">383</span>:save <span class="token number">60</span> <span class="token number">10000</span>
<span class="token number">398</span>:stop-writes-on-bgsave-error <span class="token function">yes</span>
<span class="token number">404</span>:rdbcompression <span class="token function">yes</span>
<span class="token number">413</span>:rdbchecksum <span class="token function">yes</span>
<span class="token number">431</span>:dbfilename dump.rdb  <span class="token comment">#保存文件名</span>
<span class="token number">444</span>:rdb-del-sync-files no
<span class="token number">454</span>:dir /var/lib/redis <span class="token comment">#保存路径</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p><strong>RDB持久化命令</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 数据同步操作，执行时候，会导致其他命令无法执行</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">&gt;</span> <span class="token builtin">help</span> SAVE
SAVE <span class="token operator">-</span>
summary<span class="token punctuation">:</span> Synchronously save the dataset to disk
since<span class="token punctuation">:</span> <span class="token number">1.0</span><span class="token number">.0</span>
group<span class="token punctuation">:</span> server

<span class="token comment"># 异步方式后台执行数据的同步，不影响其他命令的执行</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">&gt;</span> <span class="token builtin">help</span> BGSAVE
BGSAVE <span class="token punctuation">[</span>SCHEDULE<span class="token punctuation">]</span>
summary<span class="token punctuation">:</span> Asynchronously save the dataset to disk
since<span class="token punctuation">:</span> <span class="token number">1.0</span><span class="token number">.0</span>
group<span class="token punctuation">:</span> server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单测试</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 执行备份前查看效果</span>
root@python-auto:~<span class="token comment"># ll -h /var/lib/redis/*.rdb</span>
-rw-rw---- <span class="token number">1</span> redis redis <span class="token number">268</span> <span class="token number">7</span>月 <span class="token number">28</span> <span class="token number">18</span>:31 /var/lib/redis/dump.rdb
<span class="token comment"># 执行备份</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> bgsave

Background saving started

<span class="token comment"># 执行备份后查看效果</span>
root@python-auto:~<span class="token comment"># ll -h /var/lib/redis/*.rdb</span>
-rw-rw---- <span class="token number">1</span> redis redis <span class="token number">268</span> <span class="token number">7</span>月 <span class="token number">29</span> 09:38 /var/lib/redis/dump.rdb

<span class="token comment"># 备份文件</span>
root@python-auto:/var/lib/redis<span class="token comment"># cp dump.rdb /tmp</span>

<span class="token comment"># 在做一些操作</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">set</span> xxx xxx
<span class="token punctuation">..</span>.
<span class="token comment"># 关闭redis</span>
systemctl stop redis

查看效果
root@python-auto:~<span class="token comment"># ll -h /var/lib/redis/*.rdb</span>
-rw-rw---- <span class="token number">1</span> redis redis <span class="token number">488</span> <span class="token number">7</span>月 <span class="token number">29</span> 09:41 /var/lib/redis/dump.rdb

还原配置文件
<span class="token function">cp</span> /tmp/dump.rdb ./

启动redis
systemctl start redis

查看效果
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> keys *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="aof实践" tabindex="-1"><a class="header-anchor" href="#aof实践" aria-hidden="true">#</a> AOF实践</h4><p><strong>配置解析</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@python-auto:~<span class="token comment"># grep -Env &#39;#|^$&#39; /etc/redis/redis.conf</span>
<span class="token punctuation">..</span>.
<span class="token number">1252</span>:appendonly no
<span class="token number">1256</span>:appendfilename <span class="token string">&quot;appendonly.aof&quot;</span>
<span class="token number">1282</span>:appendfsync everysec
<span class="token number">1304</span>:no-appendfsync-on-rewrite no
<span class="token number">1323</span>:auto-aof-rewrite-percentage <span class="token number">100</span>
<span class="token number">1324</span>:auto-aof-rewrite-min-size 64mb
<span class="token number">1348</span>:aof-load-truncated <span class="token function">yes</span>
<span class="token number">1359</span>:aof-use-rdb-preamble <span class="token function">yes</span>
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p>AOF持久化命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 数据同步操作，执行时候，会导致其他命令无法执行</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">help</span> BGREWRITEAOF


BGREWRITEAOF -
summary: Asynchronously rewrite the append-only <span class="token function">file</span>
since: <span class="token number">1.0</span>.0
group: server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p>简单测试</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查现状</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> CONFIG GET appendonly
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;appendonly&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;no&quot;</span>
root@python-auto:~<span class="token comment"># ll -h /var/lib/redis/*.rdb</span>
-rw-rw---- <span class="token number">1</span> redis redis <span class="token number">92</span> <span class="token number">7</span>月 <span class="token number">29</span> <span class="token number">10</span>:06 /var/lib/redis/dump.rdb

<span class="token comment"># 修改持久化模式</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> CONFIG SET appendonly <span class="token function">yes</span>
OK

<span class="token comment"># 确认效果</span>
root@python-auto:~<span class="token comment"># ll -h /var/lib/redis/</span>
总用量 16K
-rw-rw---- <span class="token number">1</span> redis redis <span class="token number">92</span> <span class="token number">7</span>月 <span class="token number">29</span> <span class="token number">10</span>:09 appendonly.aof
-rw-rw---- <span class="token number">1</span> redis redis <span class="token number">92</span> <span class="token number">7</span>月 <span class="token number">29</span> <span class="token number">10</span>:06 dump.rdb

<span class="token comment"># 开始备份</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> MSET a1 v1 a2 v2 a3 v3
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> BGREWRITEAOF
Background append only <span class="token function">file</span> rewriting started


<span class="token comment"># 检查效果</span>
root@python-auto:~<span class="token comment"># ll -h /var/lib/redis/*.aof</span>
-rw-rw---- <span class="token number">1</span> redis redis <span class="token number">118</span> <span class="token number">7</span>月 <span class="token number">29</span> <span class="token number">10</span>:11 /var/lib/redis/appendonly.aof
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,38),r=[l];function d(p,t){return s(),a("div",null,r)}const o=n(i,[["render",d],["__file","redis-5.html.vue"]]);export{o as default};
