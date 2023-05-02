<template><div><p>ceph集群配置、部署与运维<br /><a href="http://docs.ceph.org.cn/rados/" target="_blank" rel="noopener noreferrer">http://docs.ceph.org.cn/rados/<ExternalLinkIcon/></a></p>
<h2 id="_4-1-通过套接字进行单机管理" tabindex="-1"><a class="header-anchor" href="#_4-1-通过套接字进行单机管理" aria-hidden="true">#</a> 4.1:通过套接字进行单机管理</h2>
<p>每个node节点上都有不同数量的OSD数量</p>
<p>启动osd进程会在 /var/run/ceph下生成soke文件</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ls</span> /var/run/ceph
ceph-osd.0.asok<span class="token operator">=</span>
ceph-osd.1.asok<span class="token operator">=</span>
ceph-osd.2.asok<span class="token operator">=</span>
ceph-osd.3.asok<span class="token operator">=</span>
ceph-osd.4.asok<span class="token operator">=</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="可在node节点或者mon节点通过ceph命令进行单机管理本机的mon或者osd服务" tabindex="-1"><a class="header-anchor" href="#可在node节点或者mon节点通过ceph命令进行单机管理本机的mon或者osd服务" aria-hidden="true">#</a> 可在node节点或者mon节点通过ceph命令进行单机管理本机的mon或者osd服务</h3>
<p>先将admin认证文件同步到mon或者node节点</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph@ceph-deploy:/home/ceph/ceph-cluster<span class="token variable">$scp</span> ceph.client.admin.keyring root@172.31.6.101:/etc/ceph

<span class="token comment">#指定要管理的asok文件</span>
<span class="token punctuation">[</span>root@ceph-node1 ~<span class="token punctuation">]</span><span class="token comment"># ceph -- admin-socket /var/run/ceph/ceph-osd.0.asok --help</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/xxlog/1669618980856-1b869d03-8ae2-4b8b-9b2a-4125d7a4bb01.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p><code v-pre>-- admin-daemon</code>  在 mon节点获取daemon服务帮助:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#帮助信息: </span>
ceph-mon1~<span class="token punctuation">]</span><span class="token comment">#ceph --admin-daemon /var/run/ceph/ceph-mon.cephjmon1.asok help</span>

<span class="token comment">#mon状态:</span>
ceph-mon1~<span class="token punctuation">]</span><span class="token comment"># ceph --admin-daemon /var/run/ceph/ceph-mon.ceph-mon1.asok mon_ status</span>

<span class="token comment">#查看配置信息:</span>
ceph-mon1~<span class="token punctuation">]</span><span class="token comment"># ceph - admin-daemon /var/run/ceph/ceph-mon.ceph-mon1.asok config show</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-2-ceph集群的停止或重启" tabindex="-1"><a class="header-anchor" href="#_4-2-ceph集群的停止或重启" aria-hidden="true">#</a> 4.2 ceph集群的停止或重启</h2>
<p>重启之前按照正确的流程，要提前设置ceph集群不要将OSD标记为out,避免node节点关闭服务后被踢出ceph集群外</p>
<p>node节点每隔6s向mon节点汇报一次OSD状态，连续20秒后没有通告正常mon就会把OSD标记为OUT ，就会触发磁盘的高可用开始磁盘的选举和数据同步。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#关闭服务前设置noout</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph osd <span class="token builtin class-name">set</span> noout 
noout is <span class="token builtin class-name">set</span>

<span class="token comment">#启动服务后取消noout</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph osd <span class="token builtin class-name">unset</span> noout 
noout is <span class="token builtin class-name">unset</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-1-关闭顺序" tabindex="-1"><a class="header-anchor" href="#_4-2-1-关闭顺序" aria-hidden="true">#</a> 4.2.1 关闭顺序</h3>
<ol>
<li>关闭服务前设置noout</li>
<li>关闭存储客户端停止读写数据</li>
<li>如果使用RGW，关闭RGW</li>
<li>关闭cephfs 元数据服务</li>
<li>关闭ceph OSD</li>
<li>关闭ceph manager</li>
<li>关闭 ceph monitor</li>
</ol>
<h3 id="_4-2-2-启动顺序" tabindex="-1"><a class="header-anchor" href="#_4-2-2-启动顺序" aria-hidden="true">#</a> 4.2.2 启动顺序</h3>
<ol>
<li>启动 ceph monitor</li>
<li>启动 ceph manager</li>
<li>启动 ceph OSD</li>
<li>启动 ceph FS 元数据服务</li>
<li>启动RGW</li>
<li>启动存储客户端</li>
<li>启动服务后取消 noout</li>
</ol>
<h3 id="_4-2-3-服务时间偏差" tabindex="-1"><a class="header-anchor" href="#_4-2-3-服务时间偏差" aria-hidden="true">#</a> 4.2.3 服务时间偏差</h3>
<p><a href="http://docs.ceph.org.cn/rados/configuration/mon-config-ref/" target="_blank" rel="noopener noreferrer">http://docs.ceph.org.cn/rados/configuration/mon-config-ref/<ExternalLinkIcon/></a></p>
<p>重启发现：</p>
<blockquote>
<p>cluster:
id:5ac860ab- 9a4e- 4edd- 9da2 e3de293a8d44
health: HEALTH WARN
clock skew detected on mon. ceph-mon2, mon. ceph-mon3
noout flag(s) set</p>
</blockquote>
<p>通常由于服务器重启后导致时间不太一致，因为服务器有时间同步计划任务同步周期还没到</p>
<p>可以设置监视器运行的时钟漂移量，默认为0.050秒即50毫秒</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /ceph.conf
<span class="token comment">#设置监视器运行的时钟漂移量</span>
mon clock drift allowed <span class="token operator">=</span><span class="token number">3</span>

<span class="token comment">#时钟偏移警告的退避指數即连续多少次时间偏差后就出发警告</span>
mon clock drift warn <span class="token assign-left variable">backoff</span><span class="token operator">=</span> <span class="token number">10</span>


<span class="token comment">#同步配置文件mon服务器</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph-deploy --overwrite-conf config push stor01<span class="token punctuation">..</span><span class="token number">3</span><span class="token punctuation">)</span>

<span class="token comment">#重启mon</span>
<span class="token comment">#拷贝方式</span>
<span class="token comment">#ceph@ceph-deploy:~/ceph-cluster$ scp ceph.conf root@172.31.6.101: /etc/ceph/</span>
<span class="token comment">#ceph@ceph-deploy:~/ceph-cluster$ scp ceph.conf root@172.31.6.102: /etc/ceph/</span>
<span class="token comment">#ceph@ceph-deploy:~/ceph-cluster$ scp ceph.conf root@172.31.6.103: /etc/ceph/</span>


<span class="token punctuation">[</span>root@ceph-mon1 ~<span class="token punctuation">]</span><span class="token comment"># ntpdate timel.aliyun.com &amp;&amp; hwclock -W</span>
root@ceph-mon1:~<span class="token comment"># systemctl restart ceph-mon@ceph-mon1.service</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-3-ceph-配置文件" tabindex="-1"><a class="header-anchor" href="#_4-3-ceph-配置文件" aria-hidden="true">#</a> 4.3 ceph 配置文件</h2>
<p>Ceph的主配置文件是<code v-pre>/etc/ceph/ceph.conf </code>，ceph 服务在启动时会检查ceph.conf分号;和#在配置文件中都是注释，<strong>ceph.conf</strong> 主要由以下配置段组成:</p>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p><strong>[global] <strong>#全局配置<br /></strong>[osd]</strong> #osd专用配置，可以使用osd.N, 来表示某一个OSD专用配置，N为osd的编号，如0、2、1等，<br /><strong>[mon]</strong> #mon专用配置，也可以使用mon.A来为某一个monitor节点做专用配置，其中A为该节点的名称，ceph-monitor-2、 ceph-monitor-1 等，使用命令ceph mon dump可以获取节点的名称<br /><strong>[client]</strong> #客户端专用配置.</p>
</div>
<p><strong>ceph 文件的加載順序</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token variable">$CEPH_CONF</span> 环境变量
<span class="token parameter variable">-c</span> 指定配置文件位置
/etc/ceph/ceph.conf
~/.ceph/ceph.conf
./ceph.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-4-存储池、pg与crush" tabindex="-1"><a class="header-anchor" href="#_4-4-存储池、pg与crush" aria-hidden="true">#</a> 4.4 存储池、PG与CRUSH</h2>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p><strong>副本池:repicated</strong>,定义每个对象在集群中保存为多少个副本，默认为三个副本, 一主两备,实现高可用，副本池是ceph默认的存储池类型.</p>
</div>
<p>在创建存储池的时候可以指定默认是三副本<code v-pre>osd pool create pool --help [replicated]</code></p>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p><strong>纠删码池(erasure code)</strong>: ceph另一种数据可用性机制一定程度上实现数据高可用（使用的不多），存储机制类似于raid5 把一部分存储空间用于存放校验码实现数据恢复的目的，既可以提高磁盘空间利用率，又能实现一定程度上的数据高可用。和raid机制一样不能坏一定数量的磁盘所以高可用机制有限。</p>
</div>
<p><br />但是不是所有应用都支持纠删码池，RDB块存储只支持副本池而radosgw 可以支持纠删码池</p>
<p><strong>一部分存数据、一部分存校验码</strong><br /><img src="http://cdn1.ryanxin.live/xxlog/1669691960330-9d8aa14f-ec4b-4d76-a6df-2a40bfc26a09.png" alt="image.png" loading="lazy"></p>
<p>把各对象存储为<strong>N=K+M个块</strong>，其中K为数据块数量，M为编码快数量，因此存储池的尺寸为K+M.<br />即数据保存在K个数据块,并提供M个冗余块提供数据高可用，那么最多能故障的块就是M个,实际的磁盘占用就是K+M块，因此相比副本池机制比较节省存储资源。<br />一般采用8+4机制，即8个数据块+4个冗余块，那么也就是12个数据块有8个数据块保存数据,有4个实现数据冗余，即1/3的磁盘空间用于数据冗余，比默认副本池的三倍冗余节省空间,但是不能出现大于一定数据块故障。<br /><strong>但是不是所有的应用都支持纠删码池，RBD只支持副本池而Tjadosgw则可以支持纠删码池。</strong></p>
<p>创建<strong>纠删码池</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph osd pool create erasure-testpool <span class="token number">32</span> <span class="token number">32</span> erasure
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>写入数据</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> rados put <span class="token parameter variable">-p</span> erasure-testpool testfile1 /var/log/syslog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>验证数据</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph osd map erasure-testpool testfile1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>验证当前pg状态</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph pg ls-by-pool erasure-testpool <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $1,$2,$15}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-4-1-副本池" tabindex="-1"><a class="header-anchor" href="#_4-4-1-副本池" aria-hidden="true">#</a> 4.4.1 副本池</h3>
<p><strong>将一个数据对象存储为多个副本</strong><br />在客户端写入操作时，ceph使用CRUSH算法计算出与对象相对应的<strong>PG ID</strong>和<strong>primary OSD</strong><br />主OSD根据设置的副本数、对象名称、存储池名称和**集群运行图(cluster map)**计算出PG<br />的各辅助OSD，然后由OSD将数据再同步给辅助OSD.</p>
<p><strong>读取数据:</strong><br />1.客户端发送读请求，<strong>RADOS</strong> 将请求发送到主OSD.<br />2.主OSD从本地磁盘读取数据并返回数据，最终完成读请求。</p>
<p><strong>写入数据:</strong><br />1. 客户端<strong>APP</strong>请求写入数据，<strong>RADOS</strong>发送数据到主OSD.<br />2.主OSD识别副本OSDs,并发送数据到各副本OSD.<br />3. 副本OSDs写入数据，并发送写入完成信号给主OSD.<br />4. 主OSD发送写人完成信号给客户端APP.</p>
<p><img src="http://cdn1.ryanxin.live/xxlog/1669702054632-6c88be77-c67d-42d9-8253-ff988889159c.png" alt="image.png" loading="lazy"><img src="http://cdn1.ryanxin.live/xxlog/1669702079911-981a98c9-e7cd-42b2-80c5-f224c76ed860.png" alt="image.png" loading="lazy"></p>
<h3 id="_4-4-2-纠删码池" tabindex="-1"><a class="header-anchor" href="#_4-4-2-纠删码池" aria-hidden="true">#</a> 4.4.2 纠删码池</h3>
<p>纠删码池降低了数据保存所需要的磁盘总空间数量，但是读写数据的计算成本要比副本池高<br />RGW可以支持纠删码池，RBD 不支持纠删码池可以降低企业的前期TCO总拥有成本。</p>
<p><strong>纠删码写:</strong><br />数据将在主OSD进行编码然后分发到相应的OSDs.上去。<br />1.计算合适的数据块并进行编码<br />2.对每个数据块进行编码并写入OSD</p>
<p><strong>纠删码读:</strong><br />从相应的OSDs中获取数据后进行解码，如果此时有数据丢失，Ceph 会自动从存放校验码的OSD中读取数据进行解码。</p>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1669702129781-75cd2740-58be-4f4b-9f7d-22b25657463e.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="_4-5-pg与pgp" tabindex="-1"><a class="header-anchor" href="#_4-5-pg与pgp" aria-hidden="true">#</a> 4.5 PG与PGP</h2>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p><strong>PG = Placement Group</strong> 归置组<br /><strong>PGP = Placement Group for Placement purpose</strong> 归置组的组合， pgp 相当于是pg对应osd的一种排列组合关系。</p>
</div>
<p>**归置组(placement group)**是用于跨越多OSD将数据存储在每个存储池中的内部数据结构.<br />归置组在OSD守护进程和ceph客户端之间生成了一个中间层，<strong>CRUSH</strong> 算法负责将每个对象动态映射到一个归置组，然后再将每个归置组动态映射到一个或多个OSD守护进程,从而能够支持在新的OSD设备上线时进行数据重新平衡。</p>
<p>相对于存储池来说，PG是一个虚拟组件，它是对象映射到存储池时使用的虚拟层。根据业务的数据量分配PG 一般 几百个G16和32就可以，TB级 64 到128。2的次方<br />  <br /><img src="http://cdn1.ryanxin.live/xxlog/1669715338535-50c64e93-251b-4de6-bf56-0e529abb82e6.png" alt="image.png" loading="lazy"></p>
<p>想对于存储池来说，PG 是一个虚拟组件，它是对象映射到存储池时使用的虚拟层。<br />可以自定义存储池中的归置组数量。</p>
<p>ceph出于规模伸缩及性能方面的考虑，ceph 将存储池细分为多个归置组，把每个单独的对<br />象映射到归置组，并为归置组分配一个主OSD.</p>
<p>存储池由一系列的归置组组成，而CRUSH算法则根据集群运行图和集群状态，将个PG均<br />匀、伪随机(基于hash映射，每次的计算结果够 样)的分布到集群中的OSD之上。<br />如果某个OSD失败或需要对集群进行重新平衡，ceph 则移动或复制整个归置组而不需要<br />单独对每个镜像进行寻址。</p>
<h2 id="_4-6-pg与-osd的关系" tabindex="-1"><a class="header-anchor" href="#_4-6-pg与-osd的关系" aria-hidden="true">#</a> 4.6 PG与 OSD的关系</h2>
<p>ceph基于crush算法将归置组PG分配至OSD<br />当一个客户端存储对象的时候，CRUSH 算法映射每一个对象至归置组(PG)<br /> <img src="http://cdn1.ryanxin.live/xxlog/1669722018056-814dc21a-3afa-47a6-b007-9ca1238be466.png" alt="image.png" loading="lazy"></p>
<h2 id="_4-7-pg分配计算" tabindex="-1"><a class="header-anchor" href="#_4-7-pg分配计算" aria-hidden="true">#</a> 4.7 PG分配计算</h2>
<p><strong>归置组(PG)<strong>的数量是由管理员在创建存储池的时候指定的，然后由</strong>CRUSH</strong>负责创建和使<br />用，PG的数量是2的N次方的倍数,每个OSD的PG不要超出250个PG，官方是每个OSD<br />100个左右</p>
<p>一个磁盘可能属于多个PG分别担任不同的角色，<br /><a href="https://docs.ceph.com/en/mimic/rados/configuration/pool-pg-config-ref/" target="_blank" rel="noopener noreferrer">https://docs.ceph.com/en/mimic/rados/configuration/pool-pg-config-ref/<ExternalLinkIcon/></a></p>
<p><strong>recommend approximately</strong><br />确保设置了合适的归置组大小，我们建议每个OSD大约100个，例如，osd 总数乘以100<br />除以副本数量(即 osd池默认大小)，因此，对于10个osd、<strong>存储池为4个，我们建议每</strong><br /><strong>个存储池大约(100 * 10) /4= 250</strong></p>
<p><strong>先算磁盘数量是多少块，官方推荐每个OSD是100个PG左右，10块就是1000个PG</strong></p>
<p><strong>PG的数量在集群分发数据和重新平衡时扮演者重要的角色</strong></p>
<p>PG的数量过少，PG的数量在ceph同步数据时有短暂影响，一个OSD上保存的数据数据会相对加多，那么ceph同步数据的时候产生的网络负载将对集群的性能输出产生一定影响。  <strong>PG数量太少 数据量又大，那么必然同步是时间就长</strong><br /> <br />PG过多的时候，ceph将会占用过多的CPU和内存资源用于记录PG的状态信息</p>
<p>至于一个pool应该使用多少个PG，可以通过下面的公式计算后，将pool的PG值四舍<br />五人到最近的2的N次幂，如下先计算出ceph集群的总PG数:</p>
<p><strong>磁盘总数x每个磁盘PG数/副本数=&gt; ceph集群总PG数(略大于2^n次方)</strong><br /><strong>单个pool的PG计算如下:</strong></p>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>有100个osd,3副本，5个pool<br />Total PGS =100*100/3-3333<br />每个pool的PG=3333/5=512.那么创建pool的时候就指定pg为512</p>
</div>
<p>需要结合数据数量、磁盘数量及磁盘空间计算出PG数量，8、16、 32、64、128、 256<br />等2的N次方。<br />一个RADOS集群上会存在多个存储池，因此管理员还需要考虑所有存储池上的PG分布<br />后每个OSD需要映射的PG数量.</p>
<h2 id="_4-8-pg的状态" tabindex="-1"><a class="header-anchor" href="#_4-8-pg的状态" aria-hidden="true">#</a> 4.8 PG的状态</h2>
<h3 id="_4-8-1-peering" tabindex="-1"><a class="header-anchor" href="#_4-8-1-peering" aria-hidden="true">#</a> 4.8.1:Peering</h3>
<p>正在同步状态，同一个PG中的OSD需要将准备数据同步一致, 而Peering(对等)就是OSD同步过程中的状态。</p>
<h3 id="_4-8-2-activating" tabindex="-1"><a class="header-anchor" href="#_4-8-2-activating" aria-hidden="true">#</a> 4.8.2:Activating</h3>
<p>Peering已经完成，PG 正在等待所有PG实例同步Peering的结果(info、Log等)</p>
<h3 id="_4-8-3-clean" tabindex="-1"><a class="header-anchor" href="#_4-8-3-clean" aria-hidden="true">#</a> 4.8.3 Clean</h3>
<p>磁盘没有宕机  <br />干净态,PG当前不存在待修复的对象，并且大小等于存储池的副本数，即PG的活动集(Acting Set)和上行集(Up Set)为同一组OSD且内容一致。</p>
<p>活动集(Acting Set):由PG当前主的OSD和其余处于活动状态的备用OSD组成，当前PG内的OSD负责处理用户的读写请求。</p>
<p>上行集(Up Set):在某一个OSD故障时，需要将故障的OSD更换为可用的OSD,并主PG内部的主OSD同步数据到新的OSD上，例如PG内有OSD1、OSD2、OSD3，当OSD3故障后需要用OSD4替换OSD3,那么OSD1. OSD2、OSD3就是上行集，替换后OSD1、OSD2、OSD4就是活动集，OSD 替换完成后活动集最终要替换上行集。</p>
<h3 id="_4-8-4-active" tabindex="-1"><a class="header-anchor" href="#_4-8-4-active" aria-hidden="true">#</a> 4.8.4 Active</h3>
<p>正常<br />就绪状态或活跃状态，Active 表示主OSD和备OSD处于正常工作状态，此时的PG可以正常处理来自客户端的读写请求，正常的PG默认就是Active+Clean状态。</p>
<h3 id="_4-8-5-degraded-降级状态" tabindex="-1"><a class="header-anchor" href="#_4-8-5-degraded-降级状态" aria-hidden="true">#</a> 4.8.5 Degraded 降级状态</h3>
<p>一般出现在磁盘宕机后，并且一段时间没有恢复<br />降级状态出现于OSD被标记为down以后，那么其他映射到此OSD的PG都会转换到降级状态。<br />如果此OSD还能重新启动完成并完成Peering操作后,那么使用此OSD的PG将重新恢复为clean状态。<br />如果此OSD被标记为down的时间超过5分钟还没有修复，那么此OSD将会被ceph踢出集群，然后ceph会对被降级的PG启动恢复操作，直到所有由于此OSD而被降级的PG重新恢复为clean状态。<br />恢复数据会从PG内的主OSD恢复，如果是主OSD故障，那么会在剩下的两个备用OSD重新选择一个作为主OSD.</p>
<h3 id="_4-8-6-stale-过期状态" tabindex="-1"><a class="header-anchor" href="#_4-8-6-stale-过期状态" aria-hidden="true">#</a> 4.8.6 Stale:过期状态</h3>
<p>发生在OSD主宕了，数据不是最新<br />正常状态下，每个主OSD都要周期性的向RADOS集群中的监视器(Mon)报告其作为主OSD所持有的所有PG的最新统计数据，因任何原因导致某个OSD无法正常向监视器发送汇报信息的、或者由其他OSD报告某个OSD已经down的时候，则所有以此OSD为主PG则会立即被标记为stale 状态，即他们的主OSD已经不是最新的数据了，如果是备份的OSD发送down的时候，则ceph会执行修复而不会触发PG状态转换为stale状态不会切换主。</p>
<h3 id="_4-8-7-undersized" tabindex="-1"><a class="header-anchor" href="#_4-8-7-undersized" aria-hidden="true">#</a> 4.8.7 undersized</h3>
<p>一主两副本，备宕了 出现副本数太低了<br />PG当前副本数小于其存储池定义的值的时候，PG会转换为<strong>undersixed</strong>状态，比如两个备份OSD都down了，那么此时PG中就只有一个主OSD了，不符合ceph最少要求一个主OSD加一个备OSD的要求，那么就会导致使用此OSD的PG转换为undersized状态，直到添加备份OSD添加完成，或者修复完成。</p>
<h3 id="_4-8-8-scrubbing" tabindex="-1"><a class="header-anchor" href="#_4-8-8-scrubbing" aria-hidden="true">#</a> 4.8.8 Scrubbing</h3>
<p>每天进行数据的浅清理（整理元数据），每周进行数据的深清理（整理元数据和数据本身）<br />scrub是ceph对数据的清洗状态，用来保证数据完整性的机制, Ceph的OSD定期启动scrub线程来扫描部分对象，通过与其他副本比对来发现是否一致， 如果存在不一致,抛出异常提示用户手动解决。<br />scrub 以PG为单位，对于每一个pg, ceph 分析该pg下所有的object,产生一个类似于元数据信息摘要的数据结构,如对象大小，属性等,叫scrubmap,比较主与副scrubmap,来保证是不是有object丢失或者不匹配，扫描分为轻量级扫描和深度扫描，轻量级扫描也叫做<strong>light scrubs</strong>或者<strong>shallow scrubs</strong>或者simply scrubs即轻量级扫描.<br />Light scrub(daily)比较object size和属性，deep scrub (weekly)读取数据部分并通过checksum(CRC32算法)对比和数据的一致性,深度扫描过程中的PG会处scrubbing +deep状态.</p>
<h3 id="_4-8-9-recovering" tabindex="-1"><a class="header-anchor" href="#_4-8-9-recovering" aria-hidden="true">#</a> 4.8.9:Recovering:</h3>
<p>正在恢复态，集群正在执行迁移或同步对象和他们的副本，这可能是由于添加了一个新的OSD到集群中或者某个OSD宕掉后，PG可能会被CRUSH算法重新分配不同的OSD,而由于OSD更换导致PG发生内部数据同步的过程中的PG会被标记为Recovering.</p>
<h3 id="_4-8-10-backfilling" tabindex="-1"><a class="header-anchor" href="#_4-8-10-backfilling" aria-hidden="true">#</a> 4.8.10 Backfilling</h3>
<p>正在后台填充态,backfill是recovery的一种特殊场景, 指peering完成后，如果基于当前权威日志无法对Up Set (. 上行集)当中的某些PG实例实施增量同步(例如承载这些PG实例的OSD离线太久,或者是新的OSD加入集群导致的PG实例整体迁移)则通过完全拷贝当前Primary所有对象的方式进行<strong>全量同步</strong>，此过程中的PG会处于backilling.</p>
<h3 id="_4-8-11-backfill-toofull" tabindex="-1"><a class="header-anchor" href="#_4-8-11-backfill-toofull" aria-hidden="true">#</a> 4.8.11 Backfill-toofull</h3>
<p>某个需要被Backfill的PG实例，其所在的OSD可用空间不足，Backfill 流程当前被挂起时PG给的状态。</p>
<h2 id="_4-9-ceph存储池操作" tabindex="-1"><a class="header-anchor" href="#_4-9-ceph存储池操作" aria-hidden="true">#</a> 4.9 ceph存储池操作</h2>
<p>存储池的管理通常保存创建、列出、重命名和删除等操作，管理工具使用ceph osd pool<br />的子命令及参数，比如create/ls/rename/rm等。<br />ceph官方运维手册<br /><a href="http://docs.ceph.org.cn/rados/" target="_blank" rel="noopener noreferrer">http://docs.ceph.org.cn/rados/<ExternalLinkIcon/></a></p>
<h3 id="_4-9-1-常用命令" tabindex="-1"><a class="header-anchor" href="#_4-9-1-常用命令" aria-hidden="true">#</a> 4.9.1 常用命令</h3>
<p><strong>创建存储池命令格式</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token variable">$ceph</span> osd pool create <span class="token operator">&lt;</span>poolname<span class="token operator">></span> pg. num pgp_ num <span class="token punctuation">{</span>replicatedlerasure<span class="token punctuation">}</span>

<span class="token comment">#列出存储池:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph osd poolls <span class="token punctuation">[</span>detail<span class="token punctuation">]</span> <span class="token comment">#不带 pool ID</span>
mypool
myrdb1
.rgw.root
default.rgw.control 
default.rgw.meta
default.rgw.log
cephfs-metadata
cephfs-data

<span class="token comment">#带pool ID</span>
ceph osd poolls

<span class="token comment">#查看详细</span>
ceph osd pool <span class="token function">ls</span> detail

<span class="token comment">#查看存储池的事件信息</span>
ceph osd pool stats mypool

<span class="token comment">#重命名存储池</span>
ceph osd pool <span class="token function">rename</span> old-name new-name
ceph osd pool <span class="token function">rename</span> myrbd1 myrbd2

<span class="token comment">#显示存储池用量</span>
ceph <span class="token function">df</span>
rados <span class="token function">df</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-9-2-删除存储池" tabindex="-1"><a class="header-anchor" href="#_4-9-2-删除存储池" aria-hidden="true">#</a> 4.9.2 删除存储池</h3>
<p>ceph为了防止误删除存储池设置了两个机制来防止误删除操作。</p>
<p><strong>第一个机制</strong>是NODELETE 标志,需要设置为false 但是默认就是FALSE。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#创建一个测试pool</span>
ceph osd pool create mypool2 <span class="token number">32</span> <span class="token number">32</span>

ceph osd pool get mypool2 nodelete
nodelete：false
<span class="token comment">#如果设置了为true就表示不能删除，可以使用set指令重新设置为false</span>

ceph osd pool <span class="token builtin class-name">set</span> mypool2 nodelete <span class="token boolean">true</span>
<span class="token builtin class-name">set</span> pool <span class="token number">9</span> nodelete to <span class="token boolean">true</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二个机制</strong>是集群范围的配置参数<strong>mon allow pool delete</strong>,默认值为false,即监视器不允许删除存储池，可以在特定场合使用tell指令临时设置为(true)允许删除,在删除指定的pool之后再重新设置为false.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ ceph tell mon.* injectargs --mon-allow-pool-delete<span class="token operator">=</span>true
mon.ceph-mon1:injectargs:mon_allow_pool delete <span class="token operator">=</span> <span class="token string">'true'</span>
mon.ceph-mon2:injectargs:mon_allow_pool delete <span class="token operator">=</span> <span class="token string">'true'</span>
mon.ceph-mon3:injectargs:mon_allow_pool delete <span class="token operator">=</span> <span class="token string">'true'</span>
$ ceph osd pool <span class="token function">rm</span> mypool2 mypool2 --yes-i-really-really-mean-it
pool <span class="token string">'mypool2'</span> removed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-9-3-存储池配额" tabindex="-1"><a class="header-anchor" href="#_4-9-3-存储池配额" aria-hidden="true">#</a> 4.9.3 存储池配额</h3>
<p>存储池可以设置两个配对存储的对象进行限制，一个配额是<strong>最大空间(max_ bytes</strong>), 另外一个配额是对象<strong>最大数量(max_ objects)</strong>。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#查看存储池限制</span>
$ ceph osd pool get-quota mypool 
quotas <span class="token keyword">for</span> pool <span class="token string">'mypool'</span><span class="token builtin class-name">:</span>
   max objects: N/A <span class="token comment">#默认不限制对象数量</span>
   max bytes <span class="token builtin class-name">:</span> N/A <span class="token comment">#默认不限制空间大小</span>

----

$ ceph osd pool set-quota mypool max_objects <span class="token number">1000</span> <span class="token comment">#限制最大1000个对象</span>
set-quota max_objects <span class="token operator">=</span> <span class="token number">1000</span> <span class="token keyword">for</span> pool mypool


<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph osd pool set-quota mypool max_bytes <span class="token number">10737418240</span> <span class="token comment">#限制最大10737418240字节</span>
set-quota max_bytes <span class="token operator">=</span> <span class="token number">10737418240</span> <span class="token keyword">for</span> pool mypool

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-9-4-存储池可用参数" tabindex="-1"><a class="header-anchor" href="#_4-9-4-存储池可用参数" aria-hidden="true">#</a> 4.9.4 存储池可用参数</h3>
<p><code v-pre>size</code>: 存储池中的对象副本数，默认一主两个备3副本</p>
<p><code v-pre>min_size</code>: <strong>提供服务所需要的最小副本数</strong>，如果定义size为3, min_size 也为3,坏掉一个OSD,如果pool池中有副本在此块OSD上面，那么此pool将不提供服务，如果将min_size定义为2，那么还可以提供服务，如果提供为1.表示只要有一块副本都提供服务。</p>
<p><code v-pre>pg_num:</code> 查看当前PG的数量<br /><code v-pre>crush_rule:</code> 设置crush算法规则<br /><code v-pre>crush_ rule</code>:  默认为副本池<br /><code v-pre>nodelete</code>:控制是否可删除，默认可以<br /><code v-pre>nopgchange</code>: 控制是否可更改存储池的pg num和pgp num<br /><code v-pre>nosizechange</code>: 控制是否可以更改存储池的大小<br /><code v-pre>noscrub</code>和<code v-pre>nodeep-scrub</code>:控制是否不进行轻量扫描或是否深层扫描存储池，可临时解决高l/0问题<br /><code v-pre>scrub_min_interval</code>: 集群存储池的最小清理时间间隔，默认值没有设置，可以通过配置文件中的<code v-pre>osd_scrub_min_interval</code> 参数指定间隔时间.</p>
<p><code v-pre>scrub_max_interval</code>: 整理存储池的最大清理时间间隔，默认值没有设置，可以通过配置文件中的<code v-pre>osd_scrub_max_interval</code> 参数指定。</p>
<p><code v-pre>deep_scrub_interval</code>: 深层整理存储池的时间间隔，默认值没有设置，可以通过配置文件中的<code v-pre>osd_deep_scrub_interval</code> 参数指定。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#查看副本数</span>
ceph osd pool get mypool size
size:3
<span class="token comment">#修改副本数为2</span>
ceph osd pool get mypool size <span class="token number">2</span>

<span class="token comment">#为2就是允许挂一个OSD</span>
ceph osd pool mypool min_size
min_size:2


<span class="token comment">#pg_num:查看当前PG的数量</span>
$ ceph osd pool get mypool pg_num
pg num: <span class="token number">32</span>

<span class="token comment">#crush_rule: 设置crush算法规则</span>
$ ceph osd pool get mypool crush_rule
crush_ rule: replicated_rule <span class="token comment">#默认为副本池</span>

<span class="token comment">#nodelete:控制是否可删除，默认可以</span>
$ ceph osd pool get mypool nodelete
nodelete: <span class="token boolean">false</span>

<span class="token comment">#nopgchange:控制是否可更改存储池的pg num和pgp num</span>
S cenh osd pool get mypool nopgchange

<span class="token comment">#修改指定pool的pg数量</span>
$ ceph osd pool <span class="token builtin class-name">set</span> mypool pg_num <span class="token number">64</span> 
<span class="token builtin class-name">set</span> pool1 pg_num to <span class="token number">64</span>

<span class="token comment">##修改指定pool的pgp数量</span>
$ ceph osd pool <span class="token builtin class-name">set</span> mypool pgp_num <span class="token number">64</span> 
<span class="token comment">#nosizechange:控制是否可以更改存储池的大小</span>

$ ceph osd pool get mypool nosizechange
nosizechange: <span class="token boolean">false</span> <span class="token comment">#默认允许修改存储池大小</span>

$ ceph osd pool get-quota mypool
quotas <span class="token keyword">for</span> pool <span class="token string">'mypool'</span><span class="token builtin class-name">:</span>
max objects: <span class="token number">1</span> k objects
max bytes <span class="token builtin class-name">:</span> <span class="token number">10</span> GiB

<span class="token comment">#限制存储池最大写入大小</span>
ceph osd pool set-quota mypool max bytes <span class="token number">21474836480</span>


<span class="token comment">#noscrub和nodeep-scrub:控制是否不进行轻量扫描或是否深层扫描存储池，可临时解决高l/0问题</span>
<span class="token comment">#查看 当前是否关闭轻量扫描数据，默认为不关闭，即开启</span>
$ ceph osd pool get mypool noscrub
noscrub: <span class="token boolean">false</span> 
<span class="token comment">#可以修改某个指定的pool的轻量级扫描测量为true,即不执行轻量级扫描</span>
$ ceph osd pool <span class="token builtin class-name">set</span> mypool noscrub <span class="token boolean">true</span>
<span class="token builtin class-name">set</span> pool <span class="token number">1</span> noscrub to <span class="token boolean">true</span> 

<span class="token comment">#再次 查看就不进行轻量级扫描了</span>
$ ceph osd pool get mypool noscrub
noscrub: <span class="token boolean">true</span> 

<span class="token comment">#查看当前是否关闭深度扫描数据，默认为不关闭，即开启</span>
$ ceph osd pool get mypool nodeep-scrub
nodeep-scrub: <span class="token boolean">false</span>

<span class="token comment">#再次查看就不执行深度扫描了</span>
$ ceph osd pool get mypool nodeep-scrub
nodeep-scrub: <span class="token boolean">true</span> 


<span class="token comment">#scrub_ min_ interval: 集群存储池的最小清理时间间隔，默认值没有设置，可以通过配置文件中的osd_scrub_min_interval 参数指定间隔时间.</span>
$ ceph osd pool get mypool scrub min interval
Error ENOENT: option <span class="token string">'scrub_min_interval'</span> is not <span class="token builtin class-name">set</span> on pool <span class="token string">'mypool'</span>

<span class="token comment">#scrub_max_interval: 整理存储池的最大清理时间间隔，默认值没有设置，可以通过配置文件中的osd_scrub_max_interval 参数指定。</span>

$ ceph osd pool get mypool scrub max interval
Error ENOENT: option <span class="token string">'scrub_max_interval'</span> is not <span class="token builtin class-name">set</span> on pool <span class="token string">'mypool'</span>

<span class="token comment">#deep_scrub_interval: 深层整理存储池的时间间隔，默认值没有设置，可以通过配置文件中的osd_deep_scrub_interval 参数指定。</span>

$ ceph osd pool get mypool deep_scrub_interval
Error ENOENT: option <span class="token string">'deep_scrub_interval'</span> is not <span class="token builtin class-name">set</span> on pool <span class="token string">'mypool'</span>

<span class="token comment">#查看ceph node的默认配置:</span>
<span class="token punctuation">[</span>root@ceph-node1 ~<span class="token punctuation">]</span><span class="token comment"># ll /var/run/ceph/</span>
total <span class="token number">0</span>
Srxr-Xr-x <span class="token number">1</span> ceph ceph <span class="token number">0</span> Nov <span class="token number">3</span> <span class="token number">12</span>:22 ceph-osd.3.asok
SrwXr-Xr-x <span class="token number">1</span> ceph ceph <span class="token number">0</span> Nov <span class="token number">3</span> <span class="token number">12</span>:22 ceph-osd.6.asok
SrWXr-Xr-x <span class="token number">1</span> ceph ceph <span class="token number">0</span> Nov <span class="token number">3</span> <span class="token number">12</span>:23 ceph-osd.9.asok

<span class="token punctuation">[</span>root@ceph-node1 ~<span class="token punctuation">]</span><span class="token comment"># ceph daemon osd.3 config show | grep scrub</span>
    <span class="token string">"mds_max_scrub_ops_in_progress"</span><span class="token builtin class-name">:</span> <span class="token string">"5"</span>,
    <span class="token string">"mon_scrub_inject_crc_mismatch"</span><span class="token builtin class-name">:</span> <span class="token string">"0.000000"</span>,
    <span class="token string">"mon_scrub_inject_missing_keys"</span><span class="token builtin class-name">:</span> <span class="token string">"0.000000"</span>,
    <span class="token string">"mon_scrub_jinterval"</span><span class="token builtin class-name">:</span> <span class="token string">"86400"</span>，
    <span class="token string">"mon_scrub_max_keys"</span><span class="token builtin class-name">:</span> <span class="token string">"100"</span>，
    <span class="token string">"mon_scrub_timeout"</span><span class="token builtin class-name">:</span> <span class="token string">"300"</span>,，
    <span class="token string">"mon_warn_not_deep_scrubbed"</span><span class="token builtin class-name">:</span> <span class="token string">"0"</span>,
    <span class="token string">"mon_warn_not_scrubbed"</span><span class="token builtin class-name">:</span> <span class="token string">"0"</span>,
    <span class="token string">"osd_debug_deep_scrub_sleep"</span><span class="token builtin class-name">:</span> <span class="token string">"0.000000"</span>,
    <span class="token string">"osd_deep_scrub_jinterval"</span>:_<span class="token string">"604800.00000"</span>，<span class="token comment">#定义深度清洗间隔，604800秒=7天</span>
    <span class="token string">"osd_deep_scrub_keys"</span><span class="token builtin class-name">:</span> <span class="token string">"1024"</span>，
    <span class="token string">"osd_deep_scrub_Jarge_omap_object_key_threshold"</span><span class="token builtin class-name">:</span> <span class="token string">"200000"</span>,
    <span class="token string">"osd_deep_scrub_large_omap_object_value_sum_threshold"</span><span class="token builtin class-name">:</span> <span class="token string">"1073741824"</span>,
    <span class="token string">"osd_deep_scrub_randomize.ratio"</span><span class="token builtin class-name">:</span> <span class="token string">"0.150000"</span>,
    <span class="token string">"osd_deep_scrub.stride"</span><span class="token builtin class-name">:</span> <span class="token string">"524288"</span>,
    <span class="token string">"osd.deep_scrub.update_digest_min_age"</span><span class="token builtin class-name">:</span> <span class="token string">"7200"</span>，
    <span class="token string">"osd.max_scrubs"</span><span class="token builtin class-name">:</span> <span class="token string">"1"</span>， <span class="token comment">#定义一个ceph OSD daemon内能够同时进行scrubbing的操作数 （启用几个线程扫描 默认是一个）</span>
    <span class="token string">"osd_op_queue_mclock_scrub_lim"</span><span class="token builtin class-name">:</span> <span class="token string">"0.001000"</span>,
    <span class="token string">"osd_op_queue_mclock_scrub_res"</span><span class="token builtin class-name">:</span> <span class="token string">"0.000000"</span>,
    <span class="token string">"osd_op_queue_mclock_scrub_wgt"</span><span class="token builtin class-name">:</span> <span class="token string">"1.000000,
    "</span>osd_requested_scrub_priority<span class="token string">": "</span><span class="token number">120</span><span class="token string">"，
    "</span>osd_scrub_auto_repair<span class="token string">": "</span><span class="token boolean">false</span><span class="token string">",
    "</span>osd_scrub_auto_repair_num_errors<span class="token string">": "</span><span class="token number">5</span><span class="token string">"，
    "</span>osd_scrub_backoff_ratio<span class="token string">": "</span><span class="token number">0.660000</span><span class="token string">",
    "</span>osd_scrub_begin_hour<span class="token string">": "</span><span class="token number">0</span><span class="token string">"，
    "</span>osd_scrub_begin_week_day<span class="token string">": "</span><span class="token number">0</span><span class="token string">",
    "</span>osd_scrub_chunk_max<span class="token string">": "</span><span class="token number">25</span><span class="token string">",
    "</span>osd_scrub_chunk_min<span class="token string">": "</span><span class="token number">5</span><span class="token string">",
    "</span>osd_scrub_cost<span class="token string">": "</span><span class="token number">52428800</span><span class="token string">",
    "</span>osd_scrub_during_recovery<span class="token string">": "</span><span class="token boolean">false</span><span class="token string">",
    "</span>osd_scrub_end_hour<span class="token string">": "</span><span class="token number">24</span><span class="token string">",
    "</span>osd_scrub_end_week_day<span class="token string">": "</span><span class="token number">7</span><span class="token string">",
    "</span>osd_scrub_interval_randomize_ratio<span class="token string">": "</span><span class="token number">0.500000</span><span class="token string">",
    "</span>osd_scrub_invalid_stats<span class="token string">": "</span><span class="token boolean">true</span><span class="token string">", #定义scrub是否有效
    "</span>osd_scrub_load_threshold<span class="token string">": "</span><span class="token number">0.500000</span><span class="token string">",
    "</span>osd_scrub_max_interval<span class="token string">": "</span><span class="token number">60480000000</span><span class="token string">"，#定义最大执行scrub间隔，604800秒=7天
    "</span>osd_scrub_max_preemptions<span class="token string">": "</span><span class="token number">5</span><span class="token string">"，
    "</span>osd_scrub_min_interval<span class="token string">": 8640000000"</span> <span class="token comment">#定义最小执行普通scrub间隔，86400秒=1天</span>
    <span class="token string">"osd_scrub_priority"</span><span class="token builtin class-name">:</span> <span class="token string">"5"</span>,
    <span class="token string">"osd_scrub_sleep"</span><span class="token builtin class-name">:</span> <span class="token string">"0.000000"</span>,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-10-存储池快照" tabindex="-1"><a class="header-anchor" href="#_4-10-存储池快照" aria-hidden="true">#</a> 4.10 存储池快照</h2>
<p>快照用于读存储池中的数据进行备份与还原，创建快照需要占用的磁盘空间会比较大,取决于存储池中的数据大小，使用以下命令创建快照:</p>
<h3 id="_4-10-1-创建快照" tabindex="-1"><a class="header-anchor" href="#_4-10-1-创建快照" aria-hidden="true">#</a> 4.10.1 创建快照</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ ceph osd pool <span class="token function">ls</span>

<span class="token comment">#命令1: ceph osd pool mksnap {pool-name} {snap-name}</span>
$ ceph osd pool mksnap mypool mypool-snap
created pool mypool snap mypool-snap

<span class="token comment">#命令2: rados -P {pool-name} mksnap {snap-name}</span>
$ rados <span class="token parameter variable">-P</span> mypool mksnap mypool-snap2
created pool mypool snap mypool-snap2

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-10-2-验证快照" tabindex="-1"><a class="header-anchor" href="#_4-10-2-验证快照" aria-hidden="true">#</a> 4.10.2 验证快照</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ rados lssnap <span class="token parameter variable">-p</span> mypool
<span class="token number">1</span>  mypool-snap  <span class="token number">2020.11</span>.03 <span class="token number">16</span>:12:56
<span class="token number">2</span>  mypool-snap2 <span class="token number">2020.11</span>.03 <span class="token number">16</span>:13:40
<span class="token number">2</span> snaps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-10-3-回滚快照" tabindex="-1"><a class="header-anchor" href="#_4-10-3-回滚快照" aria-hidden="true">#</a> 4.10.3 回滚快照</h3>
<p>测试上传文件后创建快照，照后删除文件再还原文件,基于对象还原。<br /><code v-pre>rados rollback &lt;obj-name&gt; &lt;snap-name&gt; roll back object to snap &lt;snap-name&gt;</code></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#上传文件</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rados <span class="token parameter variable">-P</span> mypool put testile /etc/hosts

<span class="token comment">#验证文件</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rados <span class="token parameter variable">-P</span> mypool <span class="token function">ls</span> 
msg1
testfile
my.conf


<span class="token comment">#创建快照</span>
<span class="token punctuation">(</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph pool mksnap mypool
mypool-snapshot001
created pool mypool snap mypool-snapshot001


<span class="token comment">#验证快照</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rados lssnap <span class="token parameter variable">-p</span> mypool
<span class="token number">3</span>  mypool-snap   <span class="token number">2020.11</span>.04 <span class="token number">14</span>:11:41
<span class="token number">4</span>  mypool-snap2  <span class="token number">2020.11</span>.0414:1 <span class="token number">1</span>:49
<span class="token number">5</span>  mypool-conf-bak <span class="token number">2020.11</span>.04 <span class="token number">14</span>:18:41
<span class="token number">6</span>  mypool-snapshot001 <span class="token number">2020.11</span>.0414:38:50
<span class="token number">4</span> snaps



<span class="token comment">#删除文件</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rados <span class="token parameter variable">-P</span> mypool <span class="token function">rm</span> testile
<span class="token comment">#删除文件后，无法再次删除文件，提升文件不存在</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster$ rados <span class="token parameter variable">-P</span> mypool <span class="token function">rm</span> testfile
error removing mypool<span class="token operator">></span>testfile: <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> No such <span class="token function">file</span> or directory

<span class="token comment">#通过快照还原某个文件</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rados rollback <span class="token parameter variable">-P</span> mypool testfile mypool-snapshot001
rolled back pool mypool to snapshot mypool-snapshot001

<span class="token comment">#再次执行删除就可以执行成功</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-10-4-删除快照" tabindex="-1"><a class="header-anchor" href="#_4-10-4-删除快照" aria-hidden="true">#</a> 4.10.4 删除快照</h3>
<p><code v-pre>ceph osd pool rmsnap &lt;poolname&gt; &lt;snap&gt;</code></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster$ rados Issnap <span class="token parameter variable">-P</span> mypool
<span class="token number">3</span> mypool-snap <span class="token number">2020.11</span>.0414:11:41
<span class="token number">4</span> mypool-snap2 <span class="token number">2020.11</span>.04 <span class="token number">14</span>:11:49
<span class="token number">5</span> mypool-conf-bak <span class="token number">2020.11</span>.04 <span class="token number">14</span>:18:41
<span class="token number">6</span> mypool-snapshot001  <span class="token number">2020.1</span> <span class="token number">1.0414</span>:38:50
<span class="token number">4</span> snaps

<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph osd pool rmsnap mypool mypool-snap
removed pool mypool snap mypool-snap

<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster$ rados Issnap <span class="token parameter variable">-P</span> mypool
<span class="token number">4</span> mypool-snap2 <span class="token number">2020.11</span>.04 <span class="token number">14</span>:11:49
<span class="token number">5</span> mypool-conf-bak <span class="token number">2020.11</span>.04 <span class="token number">14</span>:18:41
<span class="token number">6</span> mvoool-snanshot001 <span class="token number">2020.11</span>.04 <span class="token number">14</span>:38:50

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-11-数据压缩" tabindex="-1"><a class="header-anchor" href="#_4-11-数据压缩" aria-hidden="true">#</a> 4.11 数据压缩</h2>
<p>如果使用<strong>bulestore</strong>存储引擎，ceph 支持称为&quot;实时数据压缩”即边压缩边保存数据的功能，<br />该功能有助于节省磁盘空间，可以在BlueStore OSD 上创建的每个Ceph池上启用或禁用压缩，以节约磁盘空间，默认没有开启压缩，需要后期配置并开启。</p>
<h3 id="_4-11-1-启用压缩并指定压缩算法" tabindex="-1"><a class="header-anchor" href="#_4-11-1-启用压缩并指定压缩算法" aria-hidden="true">#</a> 4.11.1 启用压缩并指定压缩算法</h3>
<p>压缩会导致CPU利用率偏高</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph-cluster<span class="token punctuation">]</span>$ ceph osd pool <span class="token builtin class-name">set</span> <span class="token operator">&lt;</span>pool name<span class="token operator">></span> compression_algorithm snappy <span class="token comment">#默认算</span>
法为snappy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>snappy:该配置为指定压缩使用的算法默认为<strong>sanppy</strong>,还有<strong>none、zlib、 lz4、 zstd</strong> 和<strong>snappy</strong>等算法，zstd压缩比好，但消耗CPU, lz4 和snappy对CPU占用较低，不建议使用zlib.</p>
</div>
<h3 id="_4-11-2-指定压缩模式" tabindex="-1"><a class="header-anchor" href="#_4-11-2-指定压缩模式" aria-hidden="true">#</a> 4.11.2 指定压缩模式</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph-cluster<span class="token punctuation">]</span>$ ceph osd pool <span class="token builtin class-name">set</span> <span class="token operator">&lt;</span>pool name<span class="token operator">></span> compression_mode aggressive
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>aggressive</strong>: 压缩的模式，有none、aggressive 、passive 和force 默认none <br /><strong>none</strong>: 从不压缩数据.<br /><strong>passive</strong>: 除非写操作具有可压缩的提示集，否则不要压缩数据.<br /><strong>aggressive</strong>: 压缩数据，除非写操作具有不可压缩的提示集。<br /><strong>force</strong>: 无论如何都尝试压缩数据，即使客户端暗示数据不可压缩也会压缩，也就是在所有情况下都使用压缩。</p>
<p><strong>存储池压缩设置参数:</strong><br /><code v-pre>compression_algorithm</code>  压缩算法<br /><code v-pre>compression_mode</code>  压缩模式</p>
<p><code v-pre>compression_required_ratio</code> #压缩后与压缩前的压缩比，默认为.875<br /><code v-pre>compression_max_blob_size</code>: #大于此的块在被压缩之前被分解成更小的blob(块)，此设置将覆盖bluestore压缩<strong>max blob <em><strong>的全局设置。<br /><code v-pre>compression_min_blob_size</code>: #小于此的块不压缩，此设置将覆盖bluestore压缩</strong>min blob</em></strong>的全局设置，</p>
<p><strong>全局压缩选项，这些可以配置到ceph.conf配置文件，作用于所有存储池</strong>:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>bluestore_compression_algorithm <span class="token comment">#压缩算法</span>
bluestore_compression_mode <span class="token comment">#压缩模式</span>
bluestore_compression_required_ratio <span class="token comment">#压缩后与压缩前的压缩比，默认为.875</span>
bluestore_compression_min_blob_size <span class="token comment">#小于它的块不会被压缩,默认0</span>
bluestore_compression_max_blob_size <span class="token comment">#大于它的块在压缩前会被拆成更小的块,默认0</span>
bluestore_compression_min_blob_size_ssd <span class="token comment">#默认 8k</span>
bluestore_compression_max_blob_size_ssd <span class="token comment">#默认 64k</span>
bluestore_compression_min_blob_size_hdd <span class="token comment">#默认 128k</span>
bluestore_compression_max_blob_size_hdd <span class="token comment">#默认 512k</span>


到node 节点验证
<span class="token punctuation">[</span>root@ceph-node3 ~<span class="token punctuation">]</span><span class="token comment"># ceph daemon osd.11 config show | grep compression</span>



<span class="token comment">#修改压缩算法</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ~<span class="token punctuation">]</span>$ ceph osd pool <span class="token builtin class-name">set</span> mypool compression algorithm snapy
<span class="token builtin class-name">set</span> pool <span class="token number">2</span> compression algorithm to snappy

<span class="token punctuation">[</span>ceph@ceph-deploy ~<span class="token punctuation">]</span>$ ceph osd pool get mypool compression algorithm compression_algorithm:snappy

<span class="token comment">#修改压缩模式: </span>
<span class="token punctuation">[</span>ceph@ceph-deploy ~<span class="token punctuation">]</span>$ ceph osd pool <span class="token builtin class-name">set</span> mypool compression mode passive
<span class="token builtin class-name">set</span> pool <span class="token number">2</span> compression mode to passive

<span class="token punctuation">[</span>ceph@ceph-deploy ~<span class="token punctuation">]</span>$ ceph osd pool get mypool compression_mode
compression_mode: passive
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


