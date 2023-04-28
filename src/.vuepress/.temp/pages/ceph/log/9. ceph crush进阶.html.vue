<template><div><p>场景：集群内有固态和机械硬盘 如何让不重要的业务放到机械盘。 <br /><img src="https://cdn.nlark.com/yuque/0/2022/png/33538388/1670239925327-b0a6d81f-d49f-457f-ab71-329245a2c645.png#averageHue=%23393b32&amp;clientId=ufb959e2a-6a7c-4&amp;from=paste&amp;height=597&amp;id=u46e8ba1b&amp;originHeight=597&amp;originWidth=627&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=570319&amp;status=done&amp;style=none&amp;taskId=uf860e4b3-a99e-4ee3-9a9d-e44aecef7e5&amp;title=&amp;width=627" alt="image.png" loading="lazy"></p>
<p><strong>Ceph 集群中由 mon 服务器维护的的五种运行图</strong>:</p>
<ul>
<li>Monitor map  监视器运行图</li>
<li>OSD map  OSD运行图   各个每隔6s汇报状态同时监控其他OSD的状态，超过20秒就会被踢出去</li>
<li>PG map  PG运行图   （一个存储池有哪些pg）</li>
<li>Crush map  (Controllers replication under scalable hashing)  可控的、可复制的、可伸缩的一致性hash算法。crush运行图，当新建存储池时会基于OSD map创建出新的PG组合列表用于存储数据</li>
<li>MDS map  cephfs metadata运行图</li>
</ul>
<p>数据的访问：</p>
<p>obj--&gt;pg hash(oid)%pg=pgid   先将文件计算成一个hash值，这个数取pg数量的余数 最终得到分配到那个pg中<br />Obj--&gt;OSD crush 根据当前的mon运行图返回pg内的最新的OSD组合,数据即可开始往主的写然后往副本OSD同步</p>
<p><strong>crush 算法针对目的节点的选择</strong>:<br />目前有5种算法来实现节点的选择，包括Uniform、List、 Tree、 Straw、 Straw2, 早期版<br />本使用的是ceph项目的发起者发明的算法straw,目前已经发展到straw2版本。<br />抽签算法</p>
<h2 id="_9-1-pg与osd映射调整" tabindex="-1"><a class="header-anchor" href="#_9-1-pg与osd映射调整" aria-hidden="true">#</a> 9.1  PG与OSD映射调整</h2>
<p>默认情况下,crush算法自行对创建的pool中的PG分配OSD,但是可以手动基于权重设置 crush 算法分配数据的倾向性， 比如1T 的磁盘权重是1,  2T 的就是2, 推荐使用相同大小的设备。</p>
<p>调整的方法有两种：<br />  1. 调整weight值</p>
<ol start="2">
<li>调整reweight值</li>
</ol>
<h3 id="_9-1-1-查看当前状态" tabindex="-1"><a class="header-anchor" href="#_9-1-1-查看当前状态" aria-hidden="true">#</a> 9.1.1 查看当前状态</h3>
<p><code v-pre>ceph osd df</code></p>
<p>基于存储空间<br />**weight **表示设备(device)的容量相对值，比如 1TB 对应1.00 ,那么500G的 OSD 的 weight 就应该是0.5, weight 是基于磁盘空间分配PG的数量，让crush算法尽可能往磁盘空间大的OSD多分配OSD。往磁盘空间小的OSD分配较少的OSD。</p>
<p>那个磁盘快满了调整一下释放资源<br />**Reweight **参数的目的是重新平衡 ceph的CRUSH算法随机分配的PG,默认的分配是概率上的均衡，即使OSD都是一 样的磁盘空间也会产生一些PG分布不均匀的情况， 此时可以通过调整reweight参数，让ceph集群立即重新平衡当前磁盘的PG,以达到数据均衡分布的目的，REWEIGHT 是PG已经分配完成，要在cepg集群重新平衡PG的分布。</p>
<h3 id="_9-1-2-修改weight并验证" tabindex="-1"><a class="header-anchor" href="#_9-1-2-修改weight并验证" aria-hidden="true">#</a> 9.1.2 修改WEIGHT并验证</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#修改某个指定ID的osd的权重 调整完立即生效</span>
root@ceph-deploy:~<span class="token comment"># ceph osd crush reweight osd.10 1.5 </span>

<span class="token comment">#验证OSD权重:</span>
root@ceph-deploy:~<span class="token comment"># ceph osd df</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-1-3-修改-reweight-并验证" tabindex="-1"><a class="header-anchor" href="#_9-1-3-修改-reweight-并验证" aria-hidden="true">#</a> 9.1.3 修改 REWEIGHT 并验证</h3>
<p>OSD 的 <strong>REWEIGHT</strong>的值默认为1 ,值可以调整，范围在0~1之间，值越低PG越小，如果调整了任何一个OSD的REWEIGHT值，那么OSD的PG会立即和其它OSD进行重新平衡，即数据的重新分配，用于当某个OSD的PG相对较多需要降低其PG 数量的场景。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># ceph osd reweight 9 0.6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cdn.nlark.com/yuque/0/2022/png/33538388/1670241465024-9c13f208-cb26-418d-9bcf-3fab74f0a0b1.png#averageHue=%23474b48&amp;clientId=ufb959e2a-6a7c-4&amp;from=paste&amp;height=331&amp;id=ua26a932c&amp;originHeight=331&amp;originWidth=699&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=336929&amp;status=done&amp;style=none&amp;taskId=u93f09ed3-ca9c-4e9d-9ec9-11299a1b67c&amp;title=&amp;width=699" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="_9-2-crush运行图管理" tabindex="-1"><a class="header-anchor" href="#_9-2-crush运行图管理" aria-hidden="true">#</a> 9.2   crush运行图管理</h2>
<p>通过工具将 ceph 的crush 运行图导出并进行编辑，然后导入</p>
<h3 id="_9-2-1-导出crush运行图" tabindex="-1"><a class="header-anchor" href="#_9-2-1-导出crush运行图" aria-hidden="true">#</a> 9.2.1 导出crush运行图</h3>
<p>注:  导出的 crush 运行图为二进制格式,无法通过文本编辑器直接打开，需要使用<strong>crushtool</strong>工具转换为文本格式后才能通过vim等文本编辑宫工具打开和编辑。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># mkdir /data/ceph -p </span>
<span class="token comment">#导出</span>
root@ceph-deploy:~<span class="token comment"># ceph osd getcrushmap -o /data/ceph/crushmap </span>
<span class="token number">67</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-2-2-将运行图转换为文本" tabindex="-1"><a class="header-anchor" href="#_9-2-2-将运行图转换为文本" aria-hidden="true">#</a> 9.2.2 将运行图转换为文本:</h3>
<p>导出的运行图不能直接编辑，需要转换为文本格式再进行查看与编辑</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># apt install ceph-base</span>
root@ceph-deploy:~<span class="token comment"># crushtool -d /data/ceph/crushmap > /data/ceph/crushmap.txt</span>
root@ceph-deploy:~<span class="token comment"># file /data/ceph/crushmap.txt</span>
/data/ceph/crushmap.txt: ASCII text
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-2-3-编辑文本" tabindex="-1"><a class="header-anchor" href="#_9-2-3-编辑文本" aria-hidden="true">#</a> 9.2.3 编辑文本</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#自定义修改</span>
root@ceph-deploy:~<span class="token comment"># vim /data/ceph/crushmap.txt </span>

<span class="token comment"># begin crush map </span>
<span class="token comment">#可调整的crush map参数</span>
tunable choose <span class="token builtin class-name">local</span> tries <span class="token number">0</span>

<span class="token comment"># devices #当前的设备列表</span>
device <span class="token number">0</span> osd.0 class hdd
device <span class="token number">1</span> osd.1 class hdd


<span class="token comment"># types #当前支持的bucket类型 以什么为单位</span>
<span class="token builtin class-name">type</span> <span class="token number">0</span> osd  <span class="token comment">#osd守护进程，对应到一个磁盘设备 </span>
<span class="token builtin class-name">type</span> <span class="token number">1</span> <span class="token function">host</span> <span class="token comment">#一个主机 (默认放在不同的主机)</span>
<span class="token builtin class-name">type</span> <span class="token number">2</span> chassis <span class="token comment">#刀片服务器的机箱</span>
<span class="token builtin class-name">type</span> <span class="token number">3</span> rack  <span class="token comment">#包含若干个服务器的机柜/机架</span>
<span class="token builtin class-name">type</span> <span class="token number">4</span> row  <span class="token comment">#包含若干个机柜的一排机柜</span>
<span class="token builtin class-name">type</span> <span class="token number">5</span> pdu  <span class="token comment">#机柜的接入电源插座</span>
<span class="token builtin class-name">type</span> <span class="token number">7</span> room <span class="token comment">#包含若干机柜的房间，一个数据中心有好多这样的房间组成</span>
<span class="token builtin class-name">type</span> <span class="token number">8</span> datacenter <span class="token comment">#一个数据中心或IDS</span>
<span class="token builtin class-name">type</span> <span class="token number">9</span> region <span class="token comment">#一个区域，比如AWS宁夏中卫数据中心</span>
<span class="token builtin class-name">type</span> <span class="token number">10</span> root <span class="token comment">#bucket分层的最顶部，根算法</span>

        item osd.0 weight <span class="token number">0.098</span> <span class="token comment">#osd0权重比例，crush 会自动根据磁盘空间计算，不同的磁盘空间的权重不一样</span>
        tem osd.1 weight <span class="token number">0.098</span>
        tem osd.2 weight <span class="token number">0.098</span>
        tem osd.3 weight <span class="token number">0.098</span>
        tem osd.4 weight <span class="token number">0.098</span>
        
<span class="token punctuation">}</span>

<span class="token punctuation">..</span>.

root default <span class="token punctuation">{</span>  <span class="token comment">#根的配置</span>
         <span class="token function">id</span> <span class="token parameter variable">-1</span> <span class="token comment"># do not change unnecessarily</span>
         <span class="token function">id</span> <span class="token parameter variable">-2</span> class hdd  <span class="token comment"># do not change unnecessarily</span>
         <span class="token comment"># weight 3.256</span>
         alg straw2
         <span class="token builtin class-name">hash</span> <span class="token number">0</span> <span class="token comment"># rjenkins1</span>
         item ceph-node1 weight <span class="token number">0.488</span>
         item ceph-node2 weight <span class="token number">0.488</span>
         item ceph-node3 weight <span class="token number">0.488</span>
         item ceph-node4 weight <span class="token number">0.488</span>
<span class="token punctuation">}</span>



<span class="token comment"># buckets</span>
<span class="token function">host</span> ceph-node1 <span class="token punctuation">{</span> 类型Host 名称为ceph-node1
        <span class="token function">id</span> <span class="token parameter variable">-3</span> <span class="token comment"># do not change unnecessarily #ceph生成的OSD ID,非必要不要改</span>
        <span class="token function">id</span> <span class="token parameter variable">-4</span> class hdd <span class="token comment"># do not change unnecessarily</span>
        <span class="token comment"># weight 0.488</span>
        alg straw2 <span class="token comment">#crush算法，管理OSD角色</span>
        <span class="token builtin class-name">hash</span> <span class="token number">0</span> <span class="token comment"># rjenkins1 #使用是哪个hash算法，0表示选择rjenkins1这种hash算法</span>
        item osd.0 weight <span class="token number">0.098</span> <span class="token comment">#osd 0 权重比例，crush 会自动根据磁盘空间计算，不同的磁盘空间的权重不一样</span>
        item osd.1 weight <span class="token number">0.098</span>
        item osd.2 weight <span class="token number">0.098</span>
        item osd.3 weight <span class="token number">0.098</span>
        item osd.4 weight <span class="token number">0.098</span>
<span class="token punctuation">}</span>


<span class="token function">host</span> ceph-node2 <span class="token punctuation">{</span>
        <span class="token function">id</span> <span class="token parameter variable">-5</span> <span class="token comment"># do not change unnecessarily</span>
        <span class="token function">id</span> <span class="token parameter variable">-6</span> class hdd <span class="token comment"># do not change unnecessarily</span>
        <span class="token comment"># weight 0.461</span>
        alg st raw2
        <span class="token builtin class-name">hash</span> <span class="token number">0</span> <span class="token comment"># rjenkins1</span>
        item osd.5 weight <span class="token number">0.098</span>
        item osd.6 weight <span class="token number">0.098</span>
        item osd.7 weight <span class="token number">0.070</span>
        item osd.8 weight <span class="token number">0.098</span>
        item osd.9 weight <span class="token number">0.098</span>
<span class="token punctuation">}</span>



root default <span class="token punctuation">{</span> <span class="token comment">#根的配置</span>
        <span class="token function">id</span> <span class="token parameter variable">-1</span> <span class="token comment"># do not change unnecessarily</span>
        <span class="token function">id</span> <span class="token parameter variable">-2</span> class hdd  <span class="token comment"># do not change unnecessarily</span>
        <span class="token comment"># weight 3.256</span>
        alg straw2
        hash0 <span class="token comment"># rjenkins1</span>
        item ceph-node1 weight <span class="token number">0.488</span>
        item ceph-node2 weight <span class="token number">0.488</span>
        item ceph-node3 weight <span class="token number">0.488</span>
        item ceph-node4 weight <span class="token number">0.488</span>
<span class="token punctuation">}</span>


<span class="token comment"># rules</span>
rule replicated _rule <span class="token punctuation">{</span> <span class="token comment">#副本池的默认配置</span>
        <span class="token function">id</span> <span class="token number">0</span>
        <span class="token builtin class-name">type</span> replicated
        min_size <span class="token number">1</span>
        max_size <span class="token number">10</span> <span class="token comment">#默认最大副本为10</span>
        step take default <span class="token comment">#基于default定义的主机分配OSD</span>
        step chooseleaf firstn <span class="token number">0</span> <span class="token builtin class-name">type</span> <span class="token function">host</span> <span class="token comment">#选择主机，故障域类型为主机</span>
        step emit <span class="token comment">#弹出配置即返回给客户端</span>
<span class="token punctuation">}</span>

rule erasure-code <span class="token punctuation">{</span> <span class="token comment">#纠删码池的默认配置</span>
        <span class="token builtin class-name">type</span> erasure
        min_size <span class="token number">3</span>
        max_size <span class="token number">4</span>
        step set_chooseleaf_tries <span class="token number">5</span>
        step set_choose_tries <span class="token number">100</span>
        step take default
        step chooseleaf indep <span class="token number">0</span> <span class="token builtin class-name">type</span> <span class="token function">host</span>
        step emit
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># rules </span>
rule replicated rule <span class="token punctuation">{</span>
         <span class="token function">id</span> <span class="token number">0</span>
         <span class="token builtin class-name">type</span> rep Licated
         min_size <span class="token number">1</span>
         max_size <span class="token number">6</span> <span class="token comment">#修改最大副本数</span>
         step take default
         step chooseleaf firstn <span class="token number">0</span> <span class="token builtin class-name">type</span> <span class="token function">host</span>
         step emit
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-2-3-将文本转换为crush格式" tabindex="-1"><a class="header-anchor" href="#_9-2-3-将文本转换为crush格式" aria-hidden="true">#</a> 9.2.3 将文本转换为crush格式</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># crushtool -c /data/ceph/crushmap.txt -o /data/ceph/newcrushmap</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_9-2-4-导入新的crush" tabindex="-1"><a class="header-anchor" href="#_9-2-4-导入新的crush" aria-hidden="true">#</a> 9.2.4 导入新的crush</h3>
<p>导入的运行图会立即覆盖原有的运行图并立即生效.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># ceph osd setcrushmap -i /data/ceph/newcrushmap</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_9-2-5-验证crush运行图是否生效" tabindex="-1"><a class="header-anchor" href="#_9-2-5-验证crush运行图是否生效" aria-hidden="true">#</a> 9.2.5 验证crush运行图是否生效</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># ceph osd crush rule dump</span>
<span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string">"rule_id"</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
        <span class="token string">"rule_name"</span><span class="token builtin class-name">:</span> <span class="token string">"replicated_rule"</span>,
        <span class="token string">"ruleset"</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
        <span class="token string">"type"</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
        <span class="token string">"min_size"</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
        <span class="token string">"max_size"</span><span class="token builtin class-name">:</span> <span class="token number">6</span>,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cdn.nlark.com/yuque/0/2022/png/33538388/1670291279565-a52a21c1-3232-44ef-a78c-5acf15757a98.png#averageHue=%23232b24&amp;clientId=u7189bb3e-5654-4&amp;from=paste&amp;height=409&amp;id=ud71efe4d&amp;originHeight=409&amp;originWidth=652&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=82316&amp;status=done&amp;style=none&amp;taskId=ufcd67ccb-8b86-4e24-8fdd-02f7cc817c4&amp;title=&amp;width=652" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="_9-3-crush数据分类管理" tabindex="-1"><a class="header-anchor" href="#_9-3-crush数据分类管理" aria-hidden="true">#</a> 9.3 crush数据分类管理</h2>
<p>Cephcrush 算法分配的PG的时候可以将PG分配到不同主机的OSD上，以实现以主机为单位的高可用，这也是默认机制，但是无法保证不同PG位于不同机柜或者机房的主机。</p>
<p>如果要实现基于机柜或者是更高级的IDC等方式的数据高可用，而且也不能实现A项目的数据在SSD,B项目的数据在机械磁盘，如果想要实现此功能则需要导出crush运行图并手动编辑，之后再导入并覆盖原有的crush运行图。</p>
<figure><img src="https://cdn.nlark.com/yuque/0/2022/png/33538388/1670291396515-8d89ed36-5dd5-44df-a502-56b54f9a0c47.png#averageHue=%23a7c5e1&amp;clientId=u7189bb3e-5654-4&amp;from=paste&amp;height=309&amp;id=uc6e609d5&amp;originHeight=309&amp;originWidth=689&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=161572&amp;status=done&amp;style=none&amp;taskId=u71ab1d78-b9c5-4278-84c7-164672dc618&amp;title=&amp;width=689" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_9-3-1-导出cursh运行图" tabindex="-1"><a class="header-anchor" href="#_9-3-1-导出cursh运行图" aria-hidden="true">#</a> 9.3.1 导出cursh运行图</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># mkdir /opt/ceph/</span>
root@ceph-deploy:~<span class="token comment"># ceph osd getcrushmap -o /opt/ceph/crushmap</span>
<span class="token number">68</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-2-将运行图转换为文本" tabindex="-1"><a class="header-anchor" href="#_9-3-2-将运行图转换为文本" aria-hidden="true">#</a> 9.3.2 将运行图转换为文本</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># crushtool -d /opt/ceph/crushmap > /opt/ceph/crushmap.txt</span>
root@ceph-deploy:- <span class="token comment"># file /opt/ceph/crushmap.txt</span>
/opt/ceph/crushmap.txt: ASCII text
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-3-添加自定义配置" tabindex="-1"><a class="header-anchor" href="#_9-3-3-添加自定义配置" aria-hidden="true">#</a> 9.3.3 添加自定义配置</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># cat topt/ceph/crushmap.txt</span>
<span class="token comment"># begin crush map</span>
tunable choose_local_tries <span class="token number">0</span>
tunable choose_local_fallback_tries <span class="token number">0</span>
tunable choose_total_tries <span class="token number">50</span>
tunable chooseleaf_descend_once <span class="token number">1</span>
tunable chooseleaf_vary_r <span class="token number">1</span>
tunable chooseleaf_stable <span class="token number">1</span> 
tunable straw_calc_version <span class="token number">1</span>
tunable allowed_bucket_algs <span class="token number">54</span>

<span class="token comment"># devices</span>
device <span class="token number">0</span> osd.0 class hdd
device <span class="token number">1</span> osd.1 class hdd
device <span class="token number">2</span> osd.2 class hdd
device <span class="token number">3</span> osd.3 class hdd
device <span class="token number">4</span> osd.4 class hdd
device <span class="token number">5</span> osd.5 class hdd
device <span class="token number">6</span> osd.6 class hdd
device <span class="token number">7</span> osd.7 class hdd
device <span class="token number">8</span> osd.8 class hdd
device <span class="token number">9</span> osd.9 class hdd
device <span class="token number">10</span> osd.10 class hdd
device <span class="token number">11</span> osd.11 class hdd
device <span class="token number">12</span> osd.12 class hdd
device <span class="token number">13</span> osd.13 class hdd
device <span class="token number">14</span> osd.14 class hdd
device <span class="token number">15</span> osd.15 class hdd
device <span class="token number">16</span> osd.16 class hdd
device <span class="token number">17</span> osd.17 class hdd
device <span class="token number">18</span> osd.18 class hdd
device <span class="token number">19</span> osd.19 class hdd


<span class="token comment"># types</span>
<span class="token builtin class-name">type</span> <span class="token number">0</span> osd
<span class="token builtin class-name">type</span> <span class="token number">1</span> <span class="token function">host</span>
<span class="token builtin class-name">type</span> <span class="token number">2</span> chassis
<span class="token builtin class-name">type</span> <span class="token number">3</span> rack
<span class="token builtin class-name">type</span> <span class="token number">4</span> row
<span class="token builtin class-name">type</span> <span class="token number">5</span> pdu
<span class="token builtin class-name">type</span> <span class="token number">6</span> pod
<span class="token builtin class-name">type</span> <span class="token number">7</span> room
<span class="token builtin class-name">type</span> <span class="token number">8</span> datacenter
<span class="token builtin class-name">type</span> <span class="token number">9</span> zone
<span class="token builtin class-name">type</span> <span class="token number">10</span> region
<span class="token builtin class-name">type</span> <span class="token number">11</span> root

<span class="token comment"># buckets</span>
<span class="token function">host</span> ceph-node1 <span class="token punctuation">{</span>
        <span class="token function">id</span> <span class="token parameter variable">-3</span>         <span class="token comment"># do not change unnecessarily</span>
        <span class="token function">id</span> <span class="token parameter variable">-4</span> class hdd   <span class="token comment"># do not change unnecessarily</span>
        <span class="token comment"># weight 0.490</span>
        alg straw2
        hash0 <span class="token comment"># rjenkins1</span>
        item osd.0 weight <span class="token number">0.098</span>
        item osd.1 weight <span class="token number">0.098</span>
        item osd.2 weight <span class="token number">0.098</span>
        item osd.3 weight <span class="token number">0.098</span>
<span class="token punctuation">}</span>

<span class="token function">host</span> ceph-node2 <span class="token punctuation">{</span>
        <span class="token function">id</span> <span class="token parameter variable">-5</span>     <span class="token comment"># do not change unnecessarily</span>
        <span class="token function">id</span> <span class="token parameter variable">-6</span> class hdd   <span class="token comment"># do not change unnecessarily</span>
        <span class="token comment"># weight 0.490</span>
        alg straw2
        hash0 <span class="token comment"># rjenkins1</span>
        item osd.5 weight <span class="token number">0.098</span>
        item osd.6 weight <span class="token number">0.098</span>
        item osd.7 weight <span class="token number">0.098</span>
        item osd.8 weight <span class="token number">0.098</span>
        item osd.9 weight <span class="token number">0.098</span>
<span class="token punctuation">}</span>

<span class="token function">host</span> ceph-node3 <span class="token punctuation">{</span>
        <span class="token function">id</span> <span class="token parameter variable">-7</span>   <span class="token comment"># do not change unnecessarily</span>
        <span class="token function">id</span> <span class="token parameter variable">-8</span> class hdd   <span class="token comment"># do not change unnecessarily</span>
        <span class="token comment"># weight 1.792</span>
        alg straw2
        <span class="token builtin class-name">hash</span> <span class="token number">0</span> <span class="token comment"># rjenkins1</span>
        item osd.10 weight <span class="token number">1.400</span>
        item osd.11 weight <span class="token number">0.098</span>
        item osd.12 weight <span class="token number">0.098</span>
        item osd.13 weight <span class="token number">0.098</span>
        item osd.14 weight <span class="token number">0.098</span>
<span class="token punctuation">}</span>

<span class="token function">host</span> ceph-node4 <span class="token punctuation">{</span>
        <span class="token function">id</span> <span class="token parameter variable">-9</span>   <span class="token comment"># do not change unnecessarily</span>
        <span class="token function">id</span> <span class="token parameter variable">-10</span> class hdd  <span class="token comment"># do not change unnecessarily</span>
        <span class="token comment"># weight 0.490</span>
        alg straw2
        <span class="token builtin class-name">hash</span> <span class="token number">0</span> <span class="token comment"># rjenkins1</span>
        item osd.15 weight <span class="token number">0.098</span>
        item osd.16 weight <span class="token number">0.098</span>
        item osd.17 weight <span class="token number">0.098</span>
        item osd.18 weight <span class="token number">0.098</span>
        item osd.19 weight <span class="token number">0.098</span>
<span class="token punctuation">}</span>

root default <span class="token punctuation">{</span>
         <span class="token function">id</span> <span class="token parameter variable">-1</span>  <span class="token comment"># do not change unnecessarily</span>
         <span class="token function">id</span> <span class="token parameter variable">-2</span> class hdd  <span class="token comment"># do not change unnecessarily</span>
         <span class="token comment"># weight 3.255</span>
         alg straw2
         <span class="token builtin class-name">hash</span> <span class="token number">0</span> <span class="token comment"># rjenkins1</span>
         item ceph-node1 weight <span class="token number">0.488</span>
         item ceph-node2 weight <span class="token number">0.488</span>
         item ceph-node3 weight <span class="token number">1.791</span>
         item ceph-node4 weight <span class="token number">0.488</span>
<span class="token punctuation">}</span>

<span class="token comment">#前面是机械节点，后面定义ssd节点，ID不能冲突</span>
<span class="token comment">#magedu ssd node</span>
<span class="token function">host</span> ceph-ssdnode1 <span class="token punctuation">{</span>
        <span class="token function">id</span> <span class="token parameter variable">-103</span>  <span class="token comment"># do not change unnecessarily</span>
        <span class="token function">id</span> <span class="token parameter variable">-104</span> class hdd  <span class="token comment"># do not change unnecessarily</span>
        <span class="token comment"># weight 0.098</span>
        alg straw2
        <span class="token builtin class-name">hash</span> <span class="token number">0</span> <span class="token comment"># rjenkins1</span>
        item osd.0 weight <span class="token number">0.098</span>
<span class="token punctuation">}</span>


<span class="token function">host</span> ceph-ssdnode2 <span class="token punctuation">{</span>
        <span class="token function">id</span> <span class="token parameter variable">-105</span>
        <span class="token comment"># do not change unnecessarily</span>
        <span class="token function">id</span> <span class="token parameter variable">-106</span> class hdd
        <span class="token comment"># do not change unnecessarily</span>
        <span class="token comment"># weight 0.098</span>
        alg straw2
        hash0 <span class="token comment"># rjenkins1</span>
        item osd.5 weight <span class="token number">0.098</span>
<span class="token punctuation">}</span>


<span class="token function">host</span> ceph-ssdnode3 <span class="token punctuation">{</span>
        <span class="token function">id</span> <span class="token parameter variable">-107</span>   <span class="token comment"># do not change unnecessarily</span>
        <span class="token function">id</span> <span class="token parameter variable">-108</span> class hdd  <span class="token comment"># do not change unnecessarily</span>
        <span class="token comment"># weight 0.098</span>
        alg straw2
        <span class="token builtin class-name">hash</span> <span class="token number">0</span> <span class="token comment"># rjenkins1</span>
        item osd.10 weight <span class="token number">0.098</span>
<span class="token punctuation">}</span>
<span class="token function">host</span> ceph-ssdnode4 <span class="token punctuation">{</span>
        <span class="token function">id</span> <span class="token parameter variable">-109</span>   <span class="token comment"># do not change unnecessarily</span>
        <span class="token function">id</span> <span class="token parameter variable">-110</span> class hdd  <span class="token comment"># do not change unnecessarily</span>
        <span class="token comment"># weight 0.098</span>
        alg straw2
        <span class="token builtin class-name">hash</span> <span class="token number">0</span> <span class="token comment"># rjenkins1</span>
        item osd.15 weight <span class="token number">0.098</span>
<span class="token punctuation">}</span>


<span class="token comment">#magedu bucket 把定义node加进来</span>
root ssd <span class="token punctuation">{</span>
        <span class="token function">id</span> <span class="token parameter variable">-127</span>      <span class="token comment"># do not change unnecessarily</span>
        <span class="token function">id</span> <span class="token parameter variable">-111</span> class hdd    <span class="token comment"># do not change unnecessarily</span>
        <span class="token comment"># weight 1.952</span>
        alg straw
        <span class="token builtin class-name">hash</span> <span class="token number">0</span> <span class="token comment"># rjenkins1</span>
        item ceph-ssdnode1 weight <span class="token number">0.488</span>
        item ceph-ssdnode2 weight <span class="token number">0.488</span>
        item ceph-ssdnode3 weight <span class="token number">0.488</span>
        item ceph-ssdnode4 weight <span class="token number">0.488</span>
<span class="token punctuation">}</span>


<span class="token comment">#magedu ssd-rules</span>
rule magedu_ssd_rule <span class="token punctuation">{</span>
        <span class="token function">id</span> <span class="token number">20</span>
        <span class="token builtin class-name">type</span> replicated  <span class="token comment">#类型副本池</span>
        min_size <span class="token number">1</span>
        max_size <span class="token number">5</span>
        step take ssd <span class="token comment">#定义使用的bucket</span>
        step chooseleaf firstn <span class="token number">0</span> <span class="token builtin class-name">type</span> <span class="token function">host</span> <span class="token comment">#选择方法 选择当前副本数个主机下的OSD， 高可用类型host</span>
        step emit
<span class="token punctuation">}</span>

<span class="token comment">## chooseleaf表示在确定故障域后，还必须选出该域下面的OSD节点</span>




rule replicated rule <span class="token punctuation">{</span>
          <span class="token function">id</span> <span class="token number">0</span>
          <span class="token builtin class-name">type</span> replicated
          min_size <span class="token number">1</span>
          max_size <span class="token number">10</span>
          step take default
          step chooseleaf firstn <span class="token number">0</span> <span class="token builtin class-name">type</span> <span class="token function">host</span>
          step emit
<span class="token punctuation">}</span>

rule erasure-code <span class="token punctuation">{</span>
        <span class="token function">id</span> <span class="token number">1</span>
        <span class="token builtin class-name">type</span> erasure
        min_size <span class="token number">3</span>
        max_size <span class="token number">4</span>
        step set_chooseleaf_tries <span class="token number">5</span>
        step set_choose_tries <span class="token number">100</span>
        step take default
        step chooseleaf indep <span class="token number">0</span> <span class="token builtin class-name">type</span> <span class="token function">host</span>
        step emit
<span class="token punctuation">}</span>

rule erasure-code <span class="token punctuation">{</span>
         <span class="token function">id</span> <span class="token number">1</span>
         <span class="token builtin class-name">type</span> erasure
         min_size <span class="token number">3</span>
         max_size <span class="token number">4</span>
         step set_chooseleaf_tries <span class="token number">5</span>
         step set_choose_tries <span class="token number">100</span>
         step take default
         step chooseleaf indep <span class="token number">0</span> <span class="token builtin class-name">type</span> <span class="token function">host</span>
         step emit
<span class="token comment"># end crush map</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>rule data <span class="token punctuation">{</span>
        ruleset <span class="token number">0</span>                             //ruleset 编号
        <span class="token builtin class-name">type</span> replicated                       //多副本类型
        min_size <span class="token number">1</span>                            //副本最小值为1
        max_size <span class="token number">10</span>                           //副本最大值为10
        step take default                     //选择default buket输入<span class="token punctuation">{</span>take<span class="token punctuation">(</span>default<span class="token punctuation">)</span><span class="token punctuation">}</span>
        step chooseleaf firstn <span class="token number">0</span> <span class="token builtin class-name">type</span> <span class="token function">host</span>    //选择当前副本数个主机下的OSD<span class="token punctuation">{</span>select<span class="token punctuation">(</span>replicas,                                                 <span class="token builtin class-name">type</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
        step emit                             //输出将要分布的bucket的列表<span class="token punctuation">{</span>emit<span class="token punctuation">(</span>void<span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-4-转换为crush二进制格式" tabindex="-1"><a class="header-anchor" href="#_9-3-4-转换为crush二进制格式" aria-hidden="true">#</a> <br />9.3.4 转换为crush二进制格式</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># crushtool -C /opt/ceph/crushmap.txt -o /opt/ceph/newcrushmap</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-5-导入新的crush运行图" tabindex="-1"><a class="header-anchor" href="#_9-3-5-导入新的crush运行图" aria-hidden="true">#</a> 9.3.5 导入新的crush运行图</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># ceph osd setcrushmap -i /opt/ceph/crushmap</span>
<span class="token number">70</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-6-验证crush运行图是否生效" tabindex="-1"><a class="header-anchor" href="#_9-3-6-验证crush运行图是否生效" aria-hidden="true">#</a> 9.3.6 验证crush运行图是否生效</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># ceph osd crush rule dump</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_9-3-7-测试创建存储池" tabindex="-1"><a class="header-anchor" href="#_9-3-7-测试创建存储池" aria-hidden="true">#</a> 9.3.7 测试创建存储池</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># peph osd pool create magedu-ssdpool 32 32 magedu_ssd_rule</span>
pool <span class="token string">'magedu-ssdpool'</span> created

<span class="token comment">#指定存储池 rule 默认是defuse</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-8-验证pgp状态" tabindex="-1"><a class="header-anchor" href="#_9-3-8-验证pgp状态" aria-hidden="true">#</a> 9.3.8 验证pgp状态</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph pg ls-by-pool magedu-ssdpool <span class="token function">awk</span> <span class="token string">'{print $1, $2,$15} '</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cdn.nlark.com/yuque/0/2022/png/33538388/1670295323891-1d92b007-cefb-449a-a54d-38d366d62bf9.png#averageHue=%230c0c0c&amp;clientId=u7189bb3e-5654-4&amp;from=paste&amp;height=490&amp;id=uecabf300&amp;originHeight=490&amp;originWidth=922&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=190007&amp;status=done&amp;style=none&amp;taskId=ube10dc9c-421b-413f-af67-33222c1de04&amp;title=&amp;width=922" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
</div></template>


