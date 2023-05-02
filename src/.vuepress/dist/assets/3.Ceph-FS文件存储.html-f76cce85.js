import{_ as i,V as c,W as l,$ as n,a0 as a,Y as e,Z as p,C as d}from"./framework-91fce522.js";const t={},o={href:"https://docs.ceph.com/en/latest/cephfs/",target:"_blank",rel:"noopener noreferrer"},r=n("br",null,null,-1),u={href:"https://docs.ceph.com/en/latest/cephfs/",target:"_blank",rel:"noopener noreferrer"},m=p(`<blockquote><p>Ceph FS即<strong>Ceph Filesy Stem</strong>,可以实现文件系统共享功能,客户端通过ceph协议挂载并使用ceph集群作为数据存储服务器。</p></blockquote><p>Ceph FS在公司中使用常场景相对比较多，主要用于动静分离，多服务数据共享例如Nginx 。</p><p>Ceph被多个服务同时挂载，写入数据时能实时同步，类似NFS。</p><figure><img src="http://cdn1.ryanxin.live/xxlog/1669602704359-0c6e3198-b50f-40e2-89dd-d5174582a165.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p><strong>客户端通过ceph协议挂载</strong><br>Linux内核版本&gt;2.6.34 就内置Cpeh模块无需安装</p><p><strong>MDS存储池用于存储Ceph FS上存储的文件相关的元数据</strong><br>Ceph FS需要运行Meta Data Services(MDS)服务，其守护进程为<strong>ceph-mds</strong>, ceph-mds进程管理与cephFS上存储的文件相关的元数据，并协调对ceph存储集群的访问。</p><p><strong>mate data pool</strong>：用于存储Ceph FS上存储的文件相关的元数据，pool名称可以随意指定。<br>**ceph data pool **：用来保存客户端上传到Ceph的数据。</p><figure><img src="http://cdn1.ryanxin.live/xxlog/1669603166367-c946e2e0-1a32-43b3-b0df-124d5d008899.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h2 id="_3-1-部署mds服务" tabindex="-1"><a class="header-anchor" href="#_3-1-部署mds服务" aria-hidden="true">#</a> 3.1 部署MDS服务</h2><p>在指定的ceph-mds服务器,部署ceph-mds服务，可以和其它服务器混用(如ceph-mon.<br>ceph-mgr)</p><p><strong>Ubuntu:</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看当前可用版本</span>
root@ceph-mgr1:~<span class="token comment"># sudo su - root</span>
root@ceph-mgr1:~<span class="token comment">#  apt-cache madison ceph-mds </span>
<span class="token comment">#选择版本安装</span>
root@ceph-mgr1:~<span class="token comment"># apt install ceph-mds=16.2.5-1bionic</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>CentOS:</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Centos:
<span class="token punctuation">[</span>root@ceph-mgr1 ~<span class="token punctuation">]</span><span class="token comment"># yum install ceph-mds -y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>部署：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph-deploymds create ceph-mgr1

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-2-验证-mds-服务" tabindex="-1"><a class="header-anchor" href="#_3-2-验证-mds-服务" aria-hidden="true">#</a> 3.2 验证 MDS 服务</h2><p>MDS服务目前还无法正常使用，需要为MDS创建存储池用于保存MDS的数据.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-clusterI$ ceph mds <span class="token function">stat</span>
<span class="token number">1</span> up:standby 
<span class="token comment">#当前为备用状态，需要分配pool才可以使用，</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-3-创建cephfs-metadata和data存储池" tabindex="-1"><a class="header-anchor" href="#_3-3-创建cephfs-metadata和data存储池" aria-hidden="true">#</a> 3.3 创建CephFS metadata和data存储池:</h2><p>使用CephFS之前需要事先于集群中创建一个文件系统，并为其分别指定<strong>元数据</strong>和<strong>数据相</strong><br><strong>关的存储池</strong>，如下命令将创建名为mycephfs的文件系统，它使用<strong>cephfs-metadata</strong>作为<br>元数据存储池，使用<strong>cephfs-data</strong>为数据存储池:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#保存 metadata的pool</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph osd pool create cephfs-metadata <span class="token number">32</span> <span class="token number">32</span>
pool <span class="token string">&#39;cephfs-metadata&#39;</span> created 

<span class="token comment">#生产环境下matedata数据的pg数量为16个就可以了（数据量小 10几个T的数量元数据才几个G）</span>

<span class="token comment">#保存客户端数据的pool</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph osd pool create cephfs-data <span class="token number">64</span> <span class="token number">64</span>
pool <span class="token string">&#39;cephfs-data&#39;</span> created 

<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph <span class="token parameter variable">-S</span>
<span class="token comment">#当前ceph状态</span>

<span class="token comment">#查看当前存储池</span>
ceph@ceph-dep Loy :~/ ceph-cluster$ ceph osd pool <span class="token function">ls</span>
device health_ metrics
<span class="token number">32</span>
mypool
myrbd1
.rgw.root
default.rgw.Log
default.rgw.control
default.rgw.meta
cephfs-metadata
cepnfs-data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-4-创建ceph-fs-并验证" tabindex="-1"><a class="header-anchor" href="#_3-4-创建ceph-fs-并验证" aria-hidden="true">#</a> 3.4 创建Ceph FS 并验证</h2><p>Ceph FS在早期版本中一个集群中只能创建一个，现在支持启用多个</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ceph fs new  fs_name metadata data 

<span class="token comment">#--allow-dangerous-metadata-overlay:允许非安全的元数据写入</span>

 <span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph fs new mycephfs cephfs-metadata cephfs-data

<span class="token comment">#查看Ceph FS状态</span>
cephaceph-dep Loy:~/ ceph-cluster$ ceph <span class="token parameter variable">-S</span>
cluster:
id:
5ac860ab- 9a4e- 4edd 9da2 e3de293a8d44
health: HEALTH 0K
se rvices <span class="token builtin class-name">:</span>
mon: <span class="token number">3</span> daemons, auorum ceph-mon1 , ceph-mon2 , ceph-mon3 <span class="token punctuation">(</span>age 48m<span class="token punctuation">)</span>
mgr: ceph-mg r1<span class="token punctuation">(</span>active, since 47m<span class="token punctuation">)</span>, standbys: ceph-mgr2
mds: <span class="token number">1</span>/1 daemons up
osd:20 osds: <span class="token number">20</span> up <span class="token punctuation">(</span>since 47m<span class="token punctuation">)</span>, <span class="token number">20</span> in<span class="token punctuation">(</span>since 6d<span class="token punctuation">)</span>
rgw: <span class="token number">1</span> daemon active <span class="token punctuation">(</span><span class="token number">1</span> hosts, <span class="token number">1</span> zones <span class="token punctuation">)</span>

data <span class="token builtin class-name">:</span>
voLumes: <span class="token number">1</span>/1 healthy 
pools:
<span class="token number">10</span> pools, <span class="token number">329</span> pgs
objects: <span class="token number">253</span> objects, <span class="token number">89</span> MiB
usage <span class="token builtin class-name">:</span> <span class="token number">562</span> MiB used, <span class="token number">2.0</span> TiB / <span class="token number">2.0</span> TiB avail
pgs: <span class="token number">329</span> act ive+c Lean

io: 
Client <span class="token builtin class-name">:</span> <span class="token number">1.3</span> KiB/S wr ,0 op/s rd, <span class="token number">4</span> op/s wr


cephaceph-deploy :~/ceph-cluster$ ceph mds <span class="token function">stat</span>
mycephfs:1 <span class="token punctuation">{</span><span class="token number">0</span><span class="token operator">=</span>ceph-mgr1<span class="token operator">=</span>up: active<span class="token punctuation">}</span>

<span class="token comment">#active表示启用成功</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-5-客户端挂载ceph-fs" tabindex="-1"><a class="header-anchor" href="#_3-5-客户端挂载ceph-fs" aria-hidden="true">#</a> 3.5 客户端挂载Ceph FS</h2><p>在ceph的客户端测试CephFS的挂载，需要指定mon节点（负责提供认证）的6789端口: <br>（6789就是CephFS对外提供挂载的端口）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#使用admin权限挂载</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-clusterl$ <span class="token function">cat</span> ceph.client.admin.keyring
<span class="token punctuation">[</span>client.admin<span class="token punctuation">]</span>
   key <span class="token operator">=</span> AQCrVhZhof2zKxAATltgtgAdDteHSAGFEyE/nw<span class="token operator">==</span>
   caps mds <span class="token operator">=</span> <span class="token string">&quot;allow *&quot;</span>
   caps mgr <span class="token operator">=</span> <span class="token string">&quot;allow *&quot;</span>
   caps mon <span class="token operator">=</span> <span class="token string">&quot;allow *&quot;</span>
   caps osd <span class="token operator">=</span> <span class="token string">&quot;allow *&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>ubuntu及centos client 挂载(内核版本2.6.34在3.6.34及以上)</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#使用key挂载</span>
<span class="token comment">#ip写mon集群中的任意一个都行，也可以写三个提供高可用</span>
<span class="token comment">#挂载到/mnt目录</span>
root@ceph-client3-ubuntu1 <span class="token number">804</span>:-<span class="token comment"># mount -t ceph 172.31.6.101:6789:/ /mnt</span>
<span class="token parameter variable">-o</span> <span class="token assign-left variable">name</span><span class="token operator">=</span>admin,secret<span class="token operator">=</span>AQCrVhZhof2zKxAATltgtgAdDteHSAGFEyE/mw<span class="token operator">==</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看挂载情况<br><img src="http://cdn1.ryanxin.live/xxlog/1669605911936-e6a7f84e-56d9-4da9-ad29-24d706599e3f.png" alt="image.png" loading="lazy"></p><p>在任何一个节点变更数据，会立即在其他客户端同步显示，非常适合多节点的web服务。</p><h3 id="模拟web多节点服务场景下-数据同步效果" tabindex="-1"><a class="header-anchor" href="#模拟web多节点服务场景下-数据同步效果" aria-hidden="true">#</a> 模拟web多节点服务场景下，数据同步效果</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#安装nginx</span>
yum <span class="token function">install</span> epel-release <span class="token parameter variable">-y</span>
yum <span class="token function">install</span> nginx <span class="token parameter variable">-y</span>
<span class="token comment">#创建数据目录</span>
<span class="token function">mkdir</span> /data/nginx/statics 
<span class="token comment">#挂载</span>
root@ceph-client3-ubuntu1804:~<span class="token comment"># mount一t ceph 172.31.6.101:6789:/ /data/nginx/statics -o name=admin ,secret=AQA3dhdhMd/UABAA2SNpJ+hcK1dD5L2Hj5XMg== </span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/ngxin.conf


server <span class="token punctuation">{</span>
    listen       <span class="token number">80</span><span class="token punctuation">;</span>
    listen       <span class="token punctuation">[</span>::<span class="token punctuation">]</span> <span class="token builtin class-name">:</span> <span class="token number">80</span><span class="token punctuation">;</span>
    server_name  _<span class="token punctuation">;</span>
    root         /data/nginx/statics<span class="token punctuation">;</span>

<span class="token builtin class-name">cd</span> /data/nginx/statics

<span class="token comment">#上传文件</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管内核中自带CephFS组件，因为性能关系还是建议使用最新的内核模块，安装Ceph ceph common （ceph 的公共组件）</p><p>Ubuntu源：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/
deb https://mirrors.tuna.tsinghua.edu.cn/ceph/debian-pacific bionic main

<span class="token comment">#导入key</span>
<span class="token function">wget</span> <span class="token parameter variable">-q</span> -O- <span class="token string">&#39;https ://download.ceph.com/keys/release.asc&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token function">apt</span> update

<span class="token comment">#导入key</span>
<span class="token function">wget</span> <span class="token parameter variable">-q</span> -O- <span class="token string">&#39;https://mirrors.tuna.tsinghua.edu.cn/ceph/keys/release.asc&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span>
apt-key <span class="token function">add</span> -


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CentOS 安装16版本之前的客户端</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://mirrors.tuna.tsinghua.edu.cn/ceph/rpm-15.2.15/el7/x86_64/ceph-common-15.2.15-0.el7.x86_64.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_16版本的cephfs状态" tabindex="-1"><a class="header-anchor" href="#_16版本的cephfs状态" aria-hidden="true">#</a> 16版本的CephFS状态</h3><figure><img src="http://cdn1.ryanxin.live/xxlog/1669605042090-f48f24ec-d38f-46c7-bf50-d120690729ec.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="_13版本的cephfs状态" tabindex="-1"><a class="header-anchor" href="#_13版本的cephfs状态" aria-hidden="true">#</a> 13版本的CephFS状态</h3><figure><img src="http://cdn1.ryanxin.live/xxlog/1669605075412-881c1d1a-cb39-4b96-b065-85fffd037559.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>压测工具：<br>Jmeter</p><h2 id="_3-6-命令总结" tabindex="-1"><a class="header-anchor" href="#_3-6-命令总结" aria-hidden="true">#</a> 3.6 命令总结</h2><p>列出存储池并显示id</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ceph osd lspools 
$ ceph osd Ispools
<span class="token number">1</span> device_ health metrics
<span class="token number">2</span> mypool
<span class="token number">3</span> cephfs-metadata
<span class="token number">4</span> cephfs-data

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看pg状态</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token variable">$ceph</span> pg <span class="token function">stat</span>
<span class="token variable">$ceph</span> pg <span class="token function">stat</span>
<span class="token number">129</span> pgs: <span class="token number">129</span> active+clean<span class="token punctuation">;</span> <span class="token number">319</span> KIB data, <span class="token number">1.1</span> GiB used, <span class="token number">2.0</span> TiB / <span class="token number">2.0</span> TiB avail
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看指定pool或所有的pool的状态</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ceph osd pool stats mypool 
pool myrdb1 <span class="token function">id</span> <span class="token number">2</span>
nothing is going on
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看集群存储状态</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ceph <span class="token function">df</span> detail
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看osd的状态</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ceph osd <span class="token function">stat</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显示OSD底层详细信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ceph osd dump
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显示OSD和node节点对于关系</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ceph osd tree
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看mon节点状态</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ceph mon <span class="token function">stat</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看mon详细信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ceph mon dump
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,64);function v(b,h){const s=d("ExternalLinkIcon");return c(),l("div",null,[n("p",null,[n("a",o,[a("https://docs.ceph.com/en/latest/cephfs/"),e(s)]),r,n("a",u,[a("链接"),e(s)])]),m])}const k=i(t,[["render",v],["__file","3.Ceph-FS文件存储.html.vue"]]);export{k as default};
