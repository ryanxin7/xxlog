import{_ as n,V as s,W as e,Z as i}from"./framework-91fce522.js";const a={},l=i(`<h1 id="redis-主从同步" tabindex="-1"><a class="header-anchor" href="#redis-主从同步" aria-hidden="true">#</a> Redis 主从同步</h1><p>redis 作为一个分布式的数据缓存平台，我们可以借助于redis的多实例机制，让多个实例间的数据， 达成一个同步的效果，这样即使某个实例出现异常，也不影响数据整体的使用。</p><h3 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识" aria-hidden="true">#</a> 基础知识</h3><h4 id="复制特性" tabindex="-1"><a class="header-anchor" href="#复制特性" aria-hidden="true">#</a> 复制特性</h4><ul><li>redis 如果想要实现主从复制的效果，我们需要为它划分 主角色和从角色，实现数据 由主向从的单向传递。</li><li>对于 从redis，一旦发现 主redis 更换了，那么将本地数据清空，从新主上同步数据。</li><li>如果 从redis 仅仅是断开了 主redis，那么不会删除已经同步过的数据。</li></ul><h4 id="实践要点" tabindex="-1"><a class="header-anchor" href="#实践要点" aria-hidden="true">#</a> 实践要点</h4><p>把多个主机节点，关联在一起让这些主机节点当中有一个主角色，专门负载数据的写、删除、更新 剩下的两个从节点只用于读数据。因为在大部分场景下都是读多写少。</p><p>所以通过从节点做到大范围的读操作，运行三台redis 通过一条命令把从库挂到主库上。</p><p>谁是我的老大？</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1 主角色redis 必须开启持久化功能
2 从角色redis 指定谁是主，以及自己作为从的唯一标识。

redis4.0之前用 slaveof
redis4.0之后用 replicaof

我是谁的副本 谁是我的老大

relicaof &lt;masterip&gt; &lt;msterport&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="实践操作" tabindex="-1"><a class="header-anchor" href="#实践操作" aria-hidden="true">#</a> 实践操作</h3><h4 id="复制命令方式同步" tabindex="-1"><a class="header-anchor" href="#复制命令方式同步" aria-hidden="true">#</a> 复制命令方式同步</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:6379&gt; help SLAVEOF
SLAVEOF host port
summary: Make the server a replica of another instance, or promote it as
master. Deprecated starting with Redis 5. Use REPLICAOF instead.
since: 1.0.0
group: server
127.0.0.1:6379&gt; help REPLICAOF
REPLICAOF host port
summary: Make the server a replica of another instance, or promote it as
master.
since: 5.0.0
group: server
注意：
关闭复制关系可以通过 replicaof no one 命令
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，任何一个redis实例启动时候，会自动将自己作为主角色而存在</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> info Replication
<span class="token comment"># Replication</span>
role:master
connected_slaves:0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="同步实践" tabindex="-1"><a class="header-anchor" href="#同步实践" aria-hidden="true">#</a> <strong>同步实践</strong></h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#开启一个redis实例
redis-server /data/server/redis/etc/redis.conf --port 6666 --daemonize yes

#连接新实例查看效果

# redis-cli -h 127.0.0.1 -p 6666
&gt; info replication
# Replication
role:master
connected_slaves:0
...

#新实例同步主角色

# 设置主角色
127.0.0.1:6666&gt; REPLICAOF 127.0.0.1 6379
OK

# 查看状态
127.0.0.1:6666&gt; info replication
# Replication
role:slave
master_host:127.0.0.1
master_port:6379
master_link_status:up
master_last_io_seconds_ago:3
master_sync_in_progress:0
slave_repl_offset:0
slave_priority:100
...

# 查看同步效果
127.0.0.1:6666&gt; KEYS *
1) &quot;a1&quot;
2) &quot;a3&quot;
3) &quot;a2&quot;
结果显示：
数据同步成功
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="效果验证" tabindex="-1"><a class="header-anchor" href="#效果验证" aria-hidden="true">#</a> 效果验证</h5><p>从角色只能查看数据，不能修改数据</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:666<span class="token operator"><span class="token file-descriptor important">6</span>&gt;</span> FLUSHALL
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> READONLY You can&#39;t <span class="token function">write</span> against a <span class="token builtin class-name">read</span> only replica.
<span class="token comment"># 主角色删除数据</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> keys *
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;a2&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;a1&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;a3&quot;</span>


<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> DEL a1
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token comment"># 从角色查看效果</span>
<span class="token number">127.0</span>.0.1:666<span class="token operator"><span class="token file-descriptor important">6</span>&gt;</span> keys *
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;a3&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;a2&quot;</span>
结果显示：
自动同步成功。


<span class="token comment">#同步状态查看</span>

<span class="token comment"># 同步后主角色查看效果</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> info Replication
<span class="token comment"># Replication</span>
role:master
connected_slaves:1
slave0:ip<span class="token operator">=</span><span class="token number">127.0</span>.0.1,port<span class="token operator">=</span><span class="token number">6666</span>,state<span class="token operator">=</span>online,offset<span class="token operator">=</span><span class="token number">1038</span>,lag<span class="token operator">=</span><span class="token number">0</span>
master_failover_state:no-failover
master_replid:571bcaecc7eeb590326fc5a9262df569f3623b36
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:1038 <span class="token comment"># 同步的偏移量</span>
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:1038
<span class="token comment"># 同步后从角色查看效果</span>
<span class="token number">127.0</span>.0.1:666<span class="token operator"><span class="token file-descriptor important">6</span>&gt;</span> info replication
<span class="token comment"># Replication</span>
role:slave
master_host:127.0.0.1
master_port:6379
master_link_status:up
master_last_io_seconds_ago:10
master_sync_in_progress:0
slave_repl_offset:1038 <span class="token comment"># 同步的偏移量</span>
slave_priority:100
slave_read_only:1
replica_announced:1
connected_slaves:0
master_failover_state:no-failover
master_replid:571bcaecc7eeb590326fc5a9262df569f3623b36
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:1038
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:1038
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="配置文件方式主从同步" tabindex="-1"><a class="header-anchor" href="#配置文件方式主从同步" aria-hidden="true">#</a> 配置文件方式主从同步</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>简介
对于主从同步来说，
      主角色不用做任何配置
         - 开放自己的怀抱即可



从角色需要做两个方面的配置


<span class="token number">1</span> <span class="token builtin class-name">bind</span> 开放本机的ip
<span class="token number">2</span> replicaof 指定主角色

修改redis.conf 文件中

relicaof <span class="token operator">&lt;</span>masterip<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>msterport<span class="token operator">&gt;</span>


relicaof 主 IP 端口

实践
       主角色
           数据的增删改查
       从角色
           从主角色主机里获取数据
           
           数据的查看


特点：
如果从角色主机故障，那么主角色主机中的从主机状态会自动消除
如果主角色主机故障，那么整个集群就崩溃了<span class="token punctuation">(</span>相对于数据更改来说<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),d=[l];function r(c,t){return s(),e("div",null,d)}const o=n(a,[["render",r],["__file","redis-6.html.vue"]]);export{o as default};
