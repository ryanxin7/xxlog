<template><div><h1 id="redis-sentinel-哨兵" tabindex="-1"><a class="header-anchor" href="#redis-sentinel-哨兵" aria-hidden="true">#</a> Redis Sentinel（哨兵）</h1>
<h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h3>
<p>主从复制奠定了Redis分布式的基础，但是普通的主从复制并不能达到高可用的状态。在普通的主从复制模式下，如果主服务器宕机，就只能通过运维人员手动切换主服务器，很显然这种方案并不可取。</p>
<p>针对上述情况，Redis官方推出了可抵抗节点故障的高可用方案——Redis Sentinel（哨兵）。Redis Sentinel（哨兵）：由一个或多个Sentinel实例组成的Sentinel系统，它可以监视任意多个主从服务器，当监视的主服务器宕机时，自动下线主服务器，并且择优选取从服务器升级为新的主服务器。</p>
<p>Sentinel 进程是用于监控redis集群中Master主服务器工作的状态，在Master主服务器发生故障的时候，可以实现Master和Slave服务器的切换，保证系统的高可用，其已经被集成在redis2.6+的版本中，Redis的哨兵模式到了2.8版本之后就稳定了下来。一般在生产环境也建议使用Redis的2.8版本的以后版本。</p>
<p>哨兵(Sentinel) 是一个分布式系统，可以在一个架构中运行多个哨兵(sentinel) 进程，这些进程使用流言协议(gossip protocols)来接收关于Master主服务器是否下线的信息，并使用投票协议(Agreement Protocols)来决定是否执行自动故障迁移,以及选择哪个Slave作为新的Master。每个哨兵(Sentinel)进程会向其它哨兵(Sentinel)、Master、Slave定时发送消息，以确认对方是否”活”着，如果发现对方在指定配置时间(可配置的)内未得到回应，则暂时认为对方已掉线，也就是所谓的”主观认为宕机” ，主观是每个成员都具有的独自的而且可能相同也可能不同的意识，英文名称：<strong>Subjective Down</strong>，简称<strong>SDOWN</strong>。有主观宕机，肯定就有客观宕机。</p>
<p>当“哨兵群”中的多数Sentinel进程在对Master主服务器做出<strong>SDOWN</strong> 的判断，并且通过 <strong>SENTINEL is-master-down-by-addr</strong> 命令互相交流之后，得出的Master Server下线判断，这种方式就是“客观宕机”，客观是不依赖于某种意识而已经实际存在的一切事物，英文名称是：<strong>ObjectivelyDown</strong>， 简称 <strong>ODOWN</strong>。通过一定的vote算法，从剩下的slave从服务器节点中，选一台提升为Master服务器节点，然后自动修改相关配置，并开启故障转移（failover）。
Sentinel 机制可以解决master和slave角色的切换问题。</p>
<h4 id="sentinel-组件" tabindex="-1"><a class="header-anchor" href="#sentinel-组件" aria-hidden="true">#</a> Sentinel 组件</h4>
<p %="" note="" primary="" %=""></p>
<ul %="" endnote="" %="">
<li><strong>Monitoring</strong> : 监控Master节点、Slave节点以及其他Sentine节点是否正常工作。</li>
<li><strong>Automatic failover</strong>: 当Master故障时，Sentinel会选择一个Slave节点来替换当前Master，
并配置其他的Slave节点成为新的Master节点的从节点。同时Sentinel会
通知客户端新的Master的地址。</li>
<li><strong>Notification</strong>: 当监控的集群节点出故障时，Sentinel可通过执行特定脚本或者订阅来
告知系统管理员或者其他应用程序来通知相应信息。</li>
<li><strong>Configuration provider</strong>：如果 从redis 仅仅是断开了 主redis，那么不会删除已经同步过的数据。</li>
</ul>
<br>
<p><strong>Sentinel 流程</strong>：当旧Master下线时长超过用户设定的下线时长上限，Sentinel系统就会对旧Master执行故障转移操作，故障转移操作包含三个步骤：</p>
<ol>
<li>在Slave中选择数据最新的作为新的Master</li>
<li>向其他Slave发送新的复制指令，让其他从服务器成为新的Master的Slave</li>
<li>继续监视旧Master，如果其上线则将旧Master设置为新Master的Slave</li>
</ol>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/redis哨兵.png" alt="redis哨兵" tabindex="0" loading="lazy"><figcaption>redis哨兵</figcaption></figure>
<h3 id="实践操作" tabindex="-1"><a class="header-anchor" href="#实践操作" aria-hidden="true">#</a> 实践操作</h3>
<p><strong>实践要点</strong>：</p>
<ol>
<li>准备主从环境</li>
<li>定制 sentinel 配置</li>
</ol>
<h4 id="配置主从环境" tabindex="-1"><a class="header-anchor" href="#配置主从环境" aria-hidden="true">#</a> 配置主从环境</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1 bind 开放本机的ip
2 replicaof 指定主角色
修改redis.conf 文件中
relicaof &lt;masterip> &lt;msterport>
relicaof 192.168.10.110 6379
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p %="" gi="" total="" n1-n2-...="" %=""></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211203155905298.png" alt="主节点" tabindex="0" loading="lazy"><figcaption>主节点</figcaption></figure>
<img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211203155930783.png" alt="备节点1" style="zoom:100%;" />
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211203160132325.png" alt="备节点2" tabindex="0" loading="lazy"><figcaption>备节点2</figcaption></figure>
<p %="" endgi="" %=""></p>
<h4 id="配置sentinel-节点" tabindex="-1"><a class="header-anchor" href="#配置sentinel-节点" aria-hidden="true">#</a> 配置Sentinel  节点</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>
<span class="token function">cp</span> /data/softs/redis-6.2.5/sentinel.conf /data/server/redis/etc/
<span class="token function">vim</span> /data/server/redis/etc/sentinel.conf

节点1

<span class="token builtin class-name">bind</span>  <span class="token number">192.168</span>.10.110 <span class="token comment">#注意去掉127的地址发生冲突</span>
port <span class="token number">26379</span>
daemonize <span class="token function">yes</span>
pidfile /data/server/redis/run/redis-sentinel.pid   
logfile <span class="token string">"/data/server/redis/log/redis-sentinel.log"</span>  <span class="token comment">#定制log路径</span>
<span class="token function">dir</span> <span class="token string">"/data/server/redis/data"</span>                        <span class="token comment">#定制数据文件路径   </span>
sentinel monitor mymaster <span class="token number">192.168</span>.10.110 <span class="token number">6379</span> <span class="token number">2</span>   <span class="token comment">#法定人数限制(quorum)，即有几个slave认为master down了就进行故障转移 </span>
sentinel down-after-milliseconds mymaster <span class="token number">3000</span>    <span class="token comment">#(SDOWN)主观下线的时间</span>
acllog-max-len <span class="token number">128</span>
sentinel parallel-syncs mymaster <span class="token number">1</span>   <span class="token comment">#发生故障转移时候同时向新master同步数据的slave数量，数字越小总同步时间越长</span>
sentinel failover-timeout mymaster <span class="token number">3000</span>  <span class="token comment">#所有slaves指向新的master所需的超时时间</span>
sentinel deny-scripts-reconfig <span class="token function">yes</span> <span class="token comment">#禁止修改脚本</span>
SENTINEL resolve-hostnames no
SENTINEL announce-hostnames no


节点2
<span class="token builtin class-name">bind</span> <span class="token number">192.168</span>.10.113
port <span class="token number">26379</span>
daemonize <span class="token function">yes</span>
pidfile <span class="token string">"/data/server/redis/run/redis-sentinel.pid"</span>
logfile <span class="token string">"/data/server/redis/log/redis-sentinel.log"</span>
<span class="token function">dir</span> <span class="token string">"/data/server/redis/data"</span>
sentinel deny-scripts-reconfig <span class="token function">yes</span>
sentinel monitor mymaster <span class="token number">192.168</span>.10.110 <span class="token number">6379</span> <span class="token number">2</span>


节点3 

<span class="token builtin class-name">bind</span> <span class="token number">192.168</span>.10.114
port <span class="token number">26379</span>
daemonize <span class="token function">yes</span>
pidfile <span class="token string">"/data/server/redis/run/redis-sentinel.pid"</span>
logfile <span class="token string">"/data/server/redis/log/redis-sentinel.log"</span>
<span class="token function">dir</span> <span class="token string">"/data/server/redis/data"</span>
sentinel deny-scripts-reconfig <span class="token function">yes</span>
sentinel monitor mymaster <span class="token number">192.168</span>.10.110 <span class="token number">6379</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="启动节点" tabindex="-1"><a class="header-anchor" href="#启动节点" aria-hidden="true">#</a> 启动节点</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#启动redis</span>
root@redis-master:redis-server /data/server/redis/etc/redis.conf
root@redis-slave1：redis-server /data/server/redis/etc/redis.conf
root@redis-slave2：redis-server /data/server/redis/etc/redis.conf
<span class="token comment">#启动哨兵</span>
root@redis-master:redis-sentinel /data/server/redis/etc/sentinel.conf
root@redis-slave1：redis-sentinel /data/server/redis/etc/sentinel.conf
root@redis-slave2：redis-sentinel /data/server/redis/etc/sentinel.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看集群状态" tabindex="-1"><a class="header-anchor" href="#查看集群状态" aria-hidden="true">#</a> 查看集群状态</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>
节点2
redis-cli <span class="token parameter variable">-h</span> <span class="token number">192.168</span>.10.113 <span class="token parameter variable">-p</span> <span class="token number">6379</span> info Replication
<span class="token comment"># Replication</span>
role:master
connected_slaves:2
slave0:ip<span class="token operator">=</span><span class="token number">192.168</span>.10.110,port<span class="token operator">=</span><span class="token number">6379</span>,state<span class="token operator">=</span>online,offset<span class="token operator">=</span><span class="token number">242697</span>,lag<span class="token operator">=</span><span class="token number">0</span>
slave1:ip<span class="token operator">=</span><span class="token number">192.168</span>.10.114,port<span class="token operator">=</span><span class="token number">6379</span>,state<span class="token operator">=</span>online,offset<span class="token operator">=</span><span class="token number">242550</span>,lag<span class="token operator">=</span><span class="token number">1</span>
master_failover_state:no-failover
master_replid:d19f968c80d72a23ca373943dc166942a125758a
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:242697
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:61752
repl_backlog_histlen:180946


节点3
redis-cli <span class="token parameter variable">-h</span> <span class="token number">192.168</span>.10.114 <span class="token parameter variable">-p</span> <span class="token number">6379</span> info Replication
<span class="token comment"># Replication</span>
role:slave
master_host:192.168.10.113
master_port:6379
master_link_status:up
master_last_io_seconds_ago:0
master_sync_in_progress:0
slave_repl_offset:251426
slave_priority:100
slave_read_only:1
replica_announced:1
connected_slaves:0
master_failover_state:no-failover
master_replid:d19f968c80d72a23ca373943dc166942a125758a
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:251426
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:174421
repl_backlog_histlen:77006

节点1
redis-cli <span class="token parameter variable">-h</span> <span class="token number">192.168</span>.10.110 <span class="token parameter variable">-p</span> <span class="token number">6379</span> info Replication
<span class="token comment"># Replication</span>
role:slave
master_host:192.168.10.113
master_port:6379
master_link_status:up
master_last_io_seconds_ago:1
master_sync_in_progress:0
slave_repl_offset:254674
slave_priority:100
slave_read_only:1
replica_announced:1
connected_slaves:0
master_failover_state:no-failover
master_replid:d19f968c80d72a23ca373943dc166942a125758a
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:254674
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:62216
repl_backlog_histlen:192459

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="故障切换效果" tabindex="-1"><a class="header-anchor" href="#故障切换效果" aria-hidden="true">#</a> 故障切换效果</h4>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211203173450840.png" alt="image-20211203173450840" tabindex="0" loading="lazy"><figcaption>image-20211203173450840</figcaption></figure>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>
 redis-cli <span class="token parameter variable">-h</span> <span class="token number">192.168</span>.10.110 <span class="token parameter variable">-p</span> <span class="token number">6379</span> info Replication
<span class="token comment"># Replication</span>
role:master
connected_slaves:2   <span class="token comment">#slave 节点</span>
slave0:ip<span class="token operator">=</span><span class="token number">192.168</span>.10.113,port<span class="token operator">=</span><span class="token number">6379</span>,state<span class="token operator">=</span>online,offset<span class="token operator">=</span><span class="token number">361163</span>,lag<span class="token operator">=</span><span class="token number">1</span>
slave1:ip<span class="token operator">=</span><span class="token number">192.168</span>.10.114,port<span class="token operator">=</span><span class="token number">6379</span>,state<span class="token operator">=</span>online,offset<span class="token operator">=</span><span class="token number">361163</span>,lag<span class="token operator">=</span><span class="token number">1</span>
master_failover_state:no-failover
master_replid:c4b564add75141ccb26517b40194e48cc99e92e3
master_replid2:1f7ace84161dad00c20d156113b7db01cd449503
master_repl_offset:361163
second_repl_offset:342489
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:62216
repl_backlog_histlen:298948

redis-cli <span class="token parameter variable">-h</span> <span class="token number">192.168</span>.10.113 <span class="token parameter variable">-p</span> <span class="token number">6379</span> <span class="token function">shutdown</span>
redis-cli <span class="token parameter variable">-h</span> <span class="token number">192.168</span>.10.114 <span class="token parameter variable">-p</span> <span class="token number">6379</span> <span class="token function">shutdown</span>
redis-server /data/server/redis/etc/redis.conf

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="测试主从效果" tabindex="-1"><a class="header-anchor" href="#测试主从效果" aria-hidden="true">#</a> 测试主从效果</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
从节点
root@redis-slave2:/data/server/redis/etc# redis-cli -h 192.168.10.114 -p 6379
192.168.10.114:6379> set 1111 123123asdasd
(error) READONLY You can't write against a read only replica.

从节点仍然不能写操作

主节点
root@redis01:/data/server/redis/etc# redis-cli -h 192.168.10.110 -p 6379
192.168.10.110:6379>
192.168.10.110:6379>
192.168.10.110:6379>
192.168.10.110:6379>
192.168.10.110:6379> set text zjd
OK
192.168.10.110:6379>
192.168.10.110:6379>
192.168.10.110:6379> KEYS *
 1) "13233"
 2) "sasd"
 3) "saqwessd"
 4) "sassd"
 5) "asd"
 6) "1"
 7) "as"
 8) "text"
 9) "a"
10) "sa3123ssd"

切换过来的主节点可以进行写操作

从节点2

root@redis01:~# redis-cli -h 192.168.10.113 -p 6379
192.168.10.113:6379> KEYS *
 1) "a"
 2) "sa3123ssd"
 3) "as"
 4) "saqwessd"
 5) "sassd"
 6) "sasd"
 7) "text"
 8) "13233"
 9) "1"
10) "asd"
192.168.10.113:6379> get text
"zjd"
获取到了主节点写入的key

可见通过哨兵模式，故障转移时主从角色也随着转移。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
</div></template>


