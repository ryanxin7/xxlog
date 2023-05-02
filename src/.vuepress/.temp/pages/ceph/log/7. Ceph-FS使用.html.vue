<template><div><p>ceph FS即<strong>ceph filesystem</strong>，<strong>可以实现文件系统共享功能</strong>，客户端通过ceph协议挂载并使用ceph集群作为数据存储服务器。 （类似NFS）</p>
<p><strong>Ceph FS需要运行Meta Data Services(MDS)服务</strong>，其守护进程为<strong>ceph-mds</strong>, <strong>ceph-mds</strong><br />进程管理与Ceph FS上存储的文件相关的元数据，并协调对ceph存储集群的访问。<br /><a href="http://docs.ceph.org.cn/cephfs/" target="_blank" rel="noopener noreferrer">http://docs.ceph.org.cn/cephfs/<ExternalLinkIcon/></a><br /><strong>Ceph FS</strong>的元数据使用的动态子树分区,把元数据划分名称空间对应到不同的mds,写入元数据的时候将元数据按照名称保存到不同主mds上，有点类似于nginx中的缓存目录分层一样。但是最终元数据都会保存在ceph 元数据池中。</p>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670032830978-7c4700c6-742c-4c85-985c-303502b3c04a.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670031679816-4f17d48b-c55b-46da-8e2c-9bbc7c330469.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670031795634-590ba06c-1248-4907-9d35-816f5541eef7.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="_7-1-部署mds-服务" tabindex="-1"><a class="header-anchor" href="#_7-1-部署mds-服务" aria-hidden="true">#</a> 7.1 部署MDS 服务</h2>
<p>如果要使用cephFS,需要部署cephfs服务。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Ubuntu:
root@ceph-mgr1:~<span class="token comment"># apt-cache madison ceph-mds</span>
root@ceph-mgr1:~<span class="token comment"># apt install ceph-mds</span>

Centos:
root@ceph-mgr1 ~<span class="token punctuation">]</span><span class="token comment"># yum install ceph-mds</span>
$ ceph-deploy mds create ceph-mgr1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-2-创建cephfs-metadata和data存储池" tabindex="-1"><a class="header-anchor" href="#_7-2-创建cephfs-metadata和data存储池" aria-hidden="true">#</a> 7.2 创建CephFS metadata和data存储池</h2>
<p>使用<strong>CephFS</strong>之前需要事先于集群中创建一个文件系统，并为其分别指定元数据和数据相关的存储池。下面创建一一个名为<strong>cephfs</strong>的文件系统用于测试，它使用<strong>cephfs-metadata</strong>为元数据存储池，使用<strong>cephfs-data</strong> 为数据存储池。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#保存metadata的pool</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph osd pool create cephfs-metadata <span class="token number">32</span> <span class="token number">32</span>
pool <span class="token string">'cephfs-metadata'</span> created 


<span class="token comment">#保存数据的pool</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph osd pool create cephfs data <span class="token number">64</span> <span class="token number">64</span>
pool <span class="token string">'cephfs-data'</span> created 


<span class="token punctuation">(</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph <span class="token parameter variable">-s</span> <span class="token comment">#当前ceph状态</span>
 cluster:
  id:80a34e06-4458-4 1a8- 8d19-1 c0501152d69
  health: HEALTH_ OK
services:
  mon: <span class="token number">3</span> daemons, quorum ceph-mon1 ,ceph-mon2,ceph-mon3
  mgr: ceph-mgr1<span class="token punctuation">(</span>active<span class="token punctuation">)</span>, standbys: ceph-mgr2
  osd: <span class="token number">12</span> osds: <span class="token number">12</span> up, <span class="token number">12</span> <span class="token keyword">in</span>
  rgw: <span class="token number">1</span> daemon active

data:
  pools: <span class="token number">8</span> pools, <span class="token number">224</span> pgs
  objects: <span class="token number">278</span> objects, <span class="token number">302</span> MiB
  usage: <span class="token number">13</span> GiB used, <span class="token number">1.2</span> TiB / <span class="token number">1.2</span> TiB avail
  pgs:  <span class="token number">224</span> active+clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-3-创建cephfs并验证" tabindex="-1"><a class="header-anchor" href="#_7-3-创建cephfs并验证" aria-hidden="true">#</a> 7.3 创建cephFS并验证</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph fs new mycephfs cephfs-metadata cephfs-data
new fs with metadata pool <span class="token number">7</span> and data pool <span class="token number">8</span>


<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph fs <span class="token function">ls</span>
name: mycephfs, metadata pool: cephfs-metadata, data pools: <span class="token punctuation">[</span>cephfs-data <span class="token punctuation">]</span>、

<span class="token comment">#查看指定cephFS状态</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster$ ceph fs status mycephfs 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-4-验证cepffs服务状态" tabindex="-1"><a class="header-anchor" href="#_7-4-验证cepffs服务状态" aria-hidden="true">#</a> 7.4 验证cepfFS服务状态</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#现在已经转变为活动状态</span>
$ ceph mds <span class="token function">stat</span>
mycephfs-1/1/1 up <span class="token punctuation">{</span><span class="token number">0</span><span class="token operator">=</span>ceph-mgr1<span class="token operator">=</span>up:active<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-5-创建客户端账户" tabindex="-1"><a class="header-anchor" href="#_7-5-创建客户端账户" aria-hidden="true">#</a> 7.5 创建客户端账户</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#创建账户</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth <span class="token function">add</span> client.yanyan mon <span class="token string">'allow r'</span> mds <span class="token string">'allow rw'</span> osd <span class="token string">'allow rwx pool=cephfs-data'</span>
added key <span class="token keyword">for</span> client.yanyan

<span class="token comment">#验证账户</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth get client.yanyan
exported keyring <span class="token keyword">for</span> client.yanyan
<span class="token punctuation">[</span>client.yanyan<span class="token punctuation">]</span>
          key <span class="token operator">=</span> <span class="token assign-left variable">AQCxpdhfjQt1OxAAGe0mqTMveNu2ZMEem3tb0g</span><span class="token operator">==</span>
          caps mds <span class="token operator">=</span> <span class="token string">"allow rw"</span>
          caps mon <span class="token operator">=</span> <span class="token string">"allow r"</span>
          caps osd <span class="token operator">=</span> <span class="token string">"allow rwx pool=cephfs-data"</span>

<span class="token comment">#创建用keyring文件</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span><span class="token variable">$ceph</span> auth get client.yanyan <span class="token parameter variable">-o</span> ceph.client.yanyan.keyring

<span class="token comment">#创建key文件:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth print-key client.yanyan <span class="token operator">></span> yanyan.key
<span class="token comment">#验证用户的keyring文件</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-clusterl$ <span class="token function">cat</span> ceph.client.yanyan.keyring
<span class="token punctuation">[</span>client.yanyan<span class="token punctuation">]</span>
          key <span class="token operator">=</span> <span class="token assign-left variable">AQCxpdhfjQt1OxAAGe0mqTMveNu2ZMEem3tb0g</span><span class="token operator">==</span>
          caps mds <span class="token operator">=</span> <span class="token string">"allow rw"</span>
          caps mon <span class="token operator">=</span> <span class="token string">"allow r"</span>
          caps osd <span class="token operator">=</span> <span class="token string">"allow rwx pool=cephfs-data"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-6-安装ceph客户端" tabindex="-1"><a class="header-anchor" href="#_7-6-安装ceph客户端" aria-hidden="true">#</a> 7.6 安装ceph客户端</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-client3 ~<span class="token punctuation">]</span><span class="token comment"># yum install epel-release -y</span>
<span class="token punctuation">[</span>root@ceph-client3~<span class="token punctuation">]</span><span class="token comment"># yum install htts://mirs.aliyun.com/ceph/rpm-octopus/el7/noarch/ceph-release- 1-1.el7.noarch.rpm</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-7-同步客户端认证文件" tabindex="-1"><a class="header-anchor" href="#_7-7-同步客户端认证文件" aria-hidden="true">#</a> 7.7 同步客户端认证文件</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ <span class="token function">scp</span> ceph.conf ceph.client.yanyan.keyring yanyan.key root@172.31.6.203:/etc/ceph/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_7-8-客户端验证权限" tabindex="-1"><a class="header-anchor" href="#_7-8-客户端验证权限" aria-hidden="true">#</a> 7.8 客户端验证权限</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-client3 ~<span class="token punctuation">]</span><span class="token comment"># ceph --user yanyan -s</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_7-9-内核空间挂载ceph-fs" tabindex="-1"><a class="header-anchor" href="#_7-9-内核空间挂载ceph-fs" aria-hidden="true">#</a> 7.9 内核空间挂载ceph-fs</h2>
<p>客户端挂载有两种方式，一是内核空间，二是用户空间,内核空间挂载需要内核支持ceph模块，用户空间挂载需要安装<strong>ceph-fuse。  内核&gt; 2.6.34默认支持ceph</strong></p>
<h3 id="_7-9-1-客户端通过key文件挂载" tabindex="-1"><a class="header-anchor" href="#_7-9-1-客户端通过key文件挂载" aria-hidden="true">#</a> 7.9.1 客户端通过key文件挂载</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-client3 ~<span class="token punctuation">]</span><span class="token comment"># mkdir /data</span>
<span class="token punctuation">[</span>root@ceph-client3~<span class="token punctuation">]</span><span class="token comment"># mount -t ceph 172.31.6.104:6789,172.31.6.105:6789,172.31.6.106:6789:/ /data -o name-yanyan,secretfile=/etc/ceph/yanyan.key</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/xxlog/1670036201261-4009e08b-2948-4d04-947e-f09a08a3da8c.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_7-9-2-客户端通过key挂载" tabindex="-1"><a class="header-anchor" href="#_7-9-2-客户端通过key挂载" aria-hidden="true">#</a> 7.9.2 客户端通过key挂载</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-client3 ~<span class="token punctuation">]</span><span class="token comment"># tail /etc/ceph/yanyan.key</span>
<span class="token assign-left variable">AQCxpdhfjQt1OxAAGe0mqTMveNu2ZMEem3tb0g</span><span class="token operator">==</span>
root@ceph-client3 ~<span class="token punctuation">]</span><span class="token comment"># umount /data/ </span>
<span class="token punctuation">[</span>root@ceph-client3 ~<span class="token punctuation">]</span><span class="token comment"># mount -t ceph 172.31.6.104:6789,172.31.6.105:6789,172.31.6.106:6789:/ /data -o name=yanyan,secret=AQCxpdhfjQt1OxAAGe0mqTMveiJu2ZMEem3tb0g==</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-9-3-开机挂载" tabindex="-1"><a class="header-anchor" href="#_7-9-3-开机挂载" aria-hidden="true">#</a> 7.9.3 开机挂载</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-client3 ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/fstab </span>
<span class="token number">172.31</span>.6.104:6789,172.31.6.105:6789,172.31.6.106:6789:/  /data ceph defaults,name<span class="token operator">=</span>yanyan,secretfile<span class="token operator">=</span>/etc/ceph/yanyan.key,_netdev <span class="token number">0</span> <span class="token number">0</span>
<span class="token punctuation">[</span>root@ceph-client3 ~<span class="token punctuation">]</span><span class="token comment"># mount -a</span>



<span class="token comment">#secret挂载</span>

<span class="token number">172.31</span>.6.101:6789,172.31.6.102:6789,172.31.6.103:6789:/ /data/cephfs ceph defaults ,name<span class="token operator">=</span>yanyan,secret<span class="token operator">=</span>AQBpxyBhUXlrIBAA9bW3UG2rdv6hQm0Is9MC7Q<span class="token operator">==</span>,_netdev <span class="token number">0</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-9-4-客户端模块" tabindex="-1"><a class="header-anchor" href="#_7-9-4-客户端模块" aria-hidden="true">#</a> 7.9.4 客户端模块</h3>
<p>客户端内核加载<strong>ceph.ko</strong>模块挂载<strong>cephfs</strong>文件系统<br /><img src="http://cdn1.ryanxin.live/xxlog/1670038472628-cd3e7bdd-23a7-4238-b1ec-ff6dd9ff8445.png" alt="image.png" loading="lazy"></p>
<h2 id="_7-10-用户空间挂载ceph-fs" tabindex="-1"><a class="header-anchor" href="#_7-10-用户空间挂载ceph-fs" aria-hidden="true">#</a> 7.10 用户空间挂载ceph-fs</h2>
<p>如果内核本较低而没有ceph模块,那么可以安装<strong>ceph-fuse</strong> 挂载，但是推荐使用内核模块挂载。</p>
<h3 id="_7-10-1-安装ceph-fuse" tabindex="-1"><a class="header-anchor" href="#_7-10-1-安装ceph-fuse" aria-hidden="true">#</a> 7.10.1 安装ceph-fuse</h3>
<p><a href="http://docs.ceph.org.cn/man/8/ceph-fuse/" target="_blank" rel="noopener noreferrer">http://docs.ceph.org.cn/man/8/ceph-fuse/<ExternalLinkIcon/></a><br />在一台新的客户端或还原快照，然后安装<strong>ceph-fuse</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph- client2 ~<span class="token punctuation">]</span><span class="token comment"># yum install epel-release -y</span>
<span class="token punctuation">[</span>root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># yum install https://mirrors.aliyun.com/ceph/rpm-octopus/el7/noarch/ceph-release-1-1.el7.noarch.rpm -y</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ <span class="token function">scp</span> /etc/yum.repos.d/ceph.repo /etc/yum.repos.d/epel*  root@172.31.6.111:/etc/yum.repos.d/

root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># yum install ceph-fuse ceph-common -y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-10-2-ceph-fuse-挂载" tabindex="-1"><a class="header-anchor" href="#_7-10-2-ceph-fuse-挂载" aria-hidden="true">#</a> 7.10.2 ceph-fuse 挂载</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#同步认证及配置文件: </span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ <span class="token function">scp</span> ceph.conf ceph.client.yanyan.keyring root@172.31 .6.111:/etc/ceph/
root@172.31.6.111's password:


<span class="token comment">#通过ceph-fuse挂载ceph</span>
<span class="token punctuation">[</span>root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># mkdir /data</span>
<span class="token punctuation">[</span>root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># ceph-fuse --name client.yanyan -m 172.31.6.104:6789,172.31.6.105:6789,172.31.6.106:6789 /data</span>
ceph-fuse<span class="token punctuation">[</span><span class="token number">1628</span><span class="token punctuation">]</span>: starting ceph client
<span class="token number">2021</span>-06-08 <span class="token number">10</span>:51:24.332 7f5a3898ec00 <span class="token parameter variable">-1</span> init, newargv <span class="token operator">=</span> 0x556a48c77da0 <span class="token assign-left variable">newargc</span><span class="token operator">=</span><span class="token number">7</span>
ceph-fuse<span class="token punctuation">[</span><span class="token number">1628</span><span class="token punctuation">]</span>: starting fuse



<span class="token comment">#开机挂载,指定用户会自动根据用户名称加载授权文件及配置文件ceph.conf</span>
root@ceph-cient2 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/fstab</span>
none              /data     fuse.ceph
<span class="token assign-left variable">ceph.id</span><span class="token operator">=</span>yanyan,ceph.conf<span class="token operator">=</span>/etc/ceph/ceph.conf,_netdev,defaults <span class="token number">0</span> <span class="token number">0</span>
<span class="token punctuation">[</span>root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># umount /data</span>
<span class="token punctuation">[</span>root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># mount -a</span>
ceph-fuse<span class="token punctuation">[</span><span class="token number">1760</span><span class="token punctuation">]</span>: starting ceph client
<span class="token number">2021</span>-06-08 <span class="token number">10</span>:56:57.602 7f24d91b9c00 <span class="token parameter variable">-1</span> init, newargv <span class="token operator">=</span> 0x55999f6cda40 <span class="token assign-left variable">newargc</span><span class="token operator">=</span><span class="token number">9</span>
ceph-fuse<span class="token punctuation">[</span><span class="token number">1</span> <span class="token number">7601</span>. startina fuse
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-11-ceph-mds高可用" tabindex="-1"><a class="header-anchor" href="#_7-11-ceph-mds高可用" aria-hidden="true">#</a> 7.11 ceph mds高可用</h2>
<p>基于多mds服务器，在业务高并发时频繁读写元数据的场景。 <br /><strong>Ceph mds(etadata service)<strong>作为ceph的访问入口，需要实现高性能及数据备份，假设启动4个MDS进程，设置2个</strong>Rank</strong>.这时候有2个MDS进程会分配给两个Rank，还剩下2个MDS进程分别作为另外个的备份。</p>
<p><strong>通过参数指定那主的备是谁</strong><br />设置每个Rank的备份MDS,也就是如果此Rank当前的MDS出现问题马上切换到另个MDS，设置备份的方法有很多，常用选项如下。<br /><code v-pre>mds_standby_replay</code>: 值为true或false, true 表示开启replay 模式，这种模式下主MDS内的数量将实时与从MDS同步，如果主宕机，从可以快速的切换，如果为false只有宕机的时候才去同步数据，这样会有一段时间的中断.<br /><code v-pre>mds_standby_for_name</code>:设置当前MDS进程只用于备份于指定名称的MDS.<br /><code v-pre>mds_standby_for_rank</code>: 设置当前MDS进程只用于备份于哪个Rank,通常为Rank编号<br />另外在存在之个CephFS文件系统中，还可以使用<code v-pre>mds_standby_for fscid</code> 参数来为指定不同的文件系统。<br /><code v-pre>mds_standby_for fscid</code>: 指定CephFS文件系统ID,需要联合<code v-pre>mds_standby_for_rank</code>生效，如果设置<code v-pre>mds_standby_for_rank</code>, 那么就是用于指定文件系统的指定Rank,如果没有设置，就是指定文件系统的所有Rank。</p>
<h3 id="_7-11-1-当前mds服务器状态" tabindex="-1"><a class="header-anchor" href="#_7-11-1-当前mds服务器状态" aria-hidden="true">#</a> 7.11.1 当前mds服务器状态</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph mds <span class="token function">stat</span>
mycephfs-1/1/1 up <span class="token punctuation">{</span><span class="token number">0</span><span class="token operator">=</span>ceph-mgr1<span class="token operator">=</span>up:active<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-11-2-添加mds服务器" tabindex="-1"><a class="header-anchor" href="#_7-11-2-添加mds服务器" aria-hidden="true">#</a> 7.11.2 添加MDS服务器</h3>
<p>将<strong>ceph-mgr2</strong>和<strong>ceph-mon2</strong>和<strong>ceph-mon3</strong>作为mds服务角色添加至ceph集群.<br />最后实现<strong>两主两备</strong>的mds高可用和高性能结构。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#mds服务器安装ceph-mds服务</span>
<span class="token punctuation">[</span>root@ceph-mgr2 ~<span class="token punctuation">]</span><span class="token comment"># yum install ceph-mds -y</span>
<span class="token punctuation">[</span>root@ceph-mon2 ~<span class="token punctuation">]</span><span class="token comment"># yum install ceph-mds -y</span>
<span class="token punctuation">[</span>root@ceph-mon3 ~<span class="token punctuation">]</span><span class="token comment"># yum install ceph-mds -y</span>

<span class="token comment">#添加mds服务器</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph-deploy mds create ceph-mgr2
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph-deploy mds create ceph-mon2
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph-deploy mds create ceph-mon3

<span class="token comment">#验证mds服务器当前状态:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph mds <span class="token function">stat</span>
mycephfs-1/1/1 up <span class="token punctuation">{</span><span class="token number">0</span><span class="token operator">=</span>ceph-mgr1 <span class="token operator">=</span>up:active<span class="token punctuation">}</span>, <span class="token number">3</span> up:standby
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-11-3-验证ceph集群当前状态" tabindex="-1"><a class="header-anchor" href="#_7-11-3-验证ceph集群当前状态" aria-hidden="true">#</a> 7.11.3 验证ceph集群当前状态</h3>
<p>当前处于激活状态的mds服务器有一台，处于备份状态的mds服务器有三台.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph fs status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/xxlog/1670041951106-d3c42f57-0357-4a1c-928e-088b46fdef38.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_7-11-4-当前的文件系统状态" tabindex="-1"><a class="header-anchor" href="#_7-11-4-当前的文件系统状态" aria-hidden="true">#</a> 7.11.4 当前的文件系统状态</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph fs get mycephfs
Filesystem <span class="token string">'mycephfs'</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
fs_name mycephfs
epoch <span class="token number">4</span>
flags
<span class="token number">12</span>
created <span class="token number">2021</span>-06-01 <span class="token number">17</span>:09:25.850256
modified <span class="token number">2021</span>-06-0117:09:26.854640
tableserver <span class="token number">0</span>
root <span class="token number">0</span>
session_timeout <span class="token number">60</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-11-5-设置处于激活状态的mds的数量" tabindex="-1"><a class="header-anchor" href="#_7-11-5-设置处于激活状态的mds的数量" aria-hidden="true">#</a> 7.11.5 设置处于激活状态的mds的数量</h3>
<p>目前有四个mds服务器，但是有一个主三个备，可以优化一 下部署架构，设置为为两主两备</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ cepn fs <span class="token builtin class-name">set</span> mycephfs max_mds <span class="token number">2</span> 
<span class="token comment">#设置同时活跃的主mds最大值为2</span>

cephaceph-dep loy :~/ ceph-c luster$ ceph fs status
mycephfs - <span class="token number">1</span> clients
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
RANK   STATE      MDS     ACTIVITY     DNS   INOS    DIRS    CAPS
<span class="token number">0</span>      active   ceph-mgr1 Reqs:  <span class="token number">0</span> /s  <span class="token number">32</span>     <span class="token number">19</span>      <span class="token number">12</span>       <span class="token number">7</span>
<span class="token number">1</span>      active   ceph-mon2 Reqs:  <span class="token number">0</span> /s  <span class="token number">10</span>     <span class="token number">13</span>      <span class="token number">11</span>       <span class="token number">0</span>
        POOL         TYPE    USED  AVAIL
cephfs-metadata   metadata    1347k   630G
cephfs-data           data    849M    630G
STANDBY MDS
ceph-mon1
ceph-mon3
MDS version: ceph version <span class="token number">16.2</span>.5 <span class="token punctuation">(</span> 0883bdea7337b95e4b611c768c0279868462204a<span class="token punctuation">)</span> pacific <span class="token punctuation">(</span>stable<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-11-6-mds高可用优化" tabindex="-1"><a class="header-anchor" href="#_7-11-6-mds高可用优化" aria-hidden="true">#</a> 7.11.6 MDS高可用优化</h3>
<p>目前的状态是<strong>ceph-mgr1</strong>和<strong>ceph-mon2</strong>分别是<strong>active</strong> 状态，<strong>ceph-mon3</strong> 和<strong>ceph-mgr2</strong>分别处于<strong>standby</strong>状态。<br />现在可以将ceph-mgr2设置为ceph-mgr1的standby,将ceph-mon3设置为ceph-mon2的standby,以实现每个主都有一个固定备份角色的结构，则修改配置文件如下:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ <span class="token function">vim</span> ceph.conf
<span class="token punctuation">[</span>global<span class="token punctuation">]</span>
fsid <span class="token operator">=</span> 23b0f9f2-8db3-477f-99a7-35a90eaf3dab
public_ network <span class="token operator">=</span> <span class="token number">172.31</span>.0.0/21
cluster_ network <span class="token operator">=</span> <span class="token number">192.168</span>.0.0/21
mon_ initial members <span class="token operator">=</span> ceph-mon1
<span class="token assign-left variable">monhost</span><span class="token operator">=</span> <span class="token number">172.31</span>.6.104
auth_ cluster_ required <span class="token operator">=</span> cephx
auth service_ required <span class="token operator">=</span> cephx
auth_ client required <span class="token operator">=</span> cephx

mon clock drift allowed <span class="token operator">=</span> <span class="token number">2</span>
mon clock drift warn backoff <span class="token operator">=</span> <span class="token number">30</span>

<span class="token punctuation">[</span>mds.ceph-mgr2<span class="token punctuation">]</span>  <span class="token comment">#指定mgr的配置</span>
<span class="token comment">#mds_standby_for_fscid = mycephfs</span>
mds_standby_for_name <span class="token operator">=</span> ceph-mgr1 <span class="token comment">#指定主是谁</span>
mds_standby_replay <span class="token operator">=</span> <span class="token boolean">true</span>

<span class="token punctuation">[</span>mds_ceph-mon3<span class="token punctuation">]</span>  <span class="token comment">#指定mon3的配置 </span>
mds_standby_for name <span class="token operator">=</span> ceph-mon2 <span class="token comment">#指定主是谁</span>
mds_standby_replay <span class="token operator">=</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-11-7-分发配置文件并重启mds服务" tabindex="-1"><a class="header-anchor" href="#_7-11-7-分发配置文件并重启mds服务" aria-hidden="true">#</a> 7.11.7 分发配置文件并重启mds服务</h3>
<p>#分发配置文件保证各mds服务重启有效</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ ceph-deploy --overwrite-conf config push ceph-mon3
$ ceph-deploy --overwrite-conf config push ceph-mon2
$ ceph-deploy --overwrite-conf config push ceph-mgr1
$ ceph-deploy --overwrite-conf config push ceph-mgr2

root@ceph-mon2 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart ceph-mds@ceph-mon2 .service</span>
root@ceph-mon3 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart ceph-mds@ceph-mon3.service</span>
root@ceph-mgr2 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart ceph-mds@ceph-mgr2.service</span>
root@ceph-mgr1 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart ceph-mds@ceph-mgr1.service</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-11-8-ceph集群mds高可用状态" tabindex="-1"><a class="header-anchor" href="#_7-11-8-ceph集群mds高可用状态" aria-hidden="true">#</a> 7.11.8 ceph集群mds高可用状态</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph fs status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_7-12-通过ganesha将cephfs导出为nfs" tabindex="-1"><a class="header-anchor" href="#_7-12-通过ganesha将cephfs导出为nfs" aria-hidden="true">#</a> 7.12 通过ganesha将cephfs导出为NFS</h2>
<p>通过<strong>ganesha</strong>将<strong>cephfs</strong>通过<strong>NFS</strong>协议共享使用。</p>
<blockquote>
<p><a href="https://www.server-world.info/en/note?os=Ubuntu_20.04&amp;p=ceph15&amp;f=8" target="_blank" rel="noopener noreferrer">https://www.server-world.info/en/note?os=Ubuntu_20.04&amp;p=ceph15&amp;f=8<ExternalLinkIcon/></a></p>
</blockquote>
<p>把Ceph Fs 中转成NFS协议<br /><img src="http://cdn1.ryanxin.live/xxlog/1670053186530-4c6a1261-8e83-4b2c-bd94-a455b5411136.png" alt="image.png" loading="lazy"></p>
<h3 id="_7-12-1-服务端配置" tabindex="-1"><a class="header-anchor" href="#_7-12-1-服务端配置" aria-hidden="true">#</a> 7.12.1 服务端配置</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-mgr1:~<span class="token comment"># apt install nfs-ganesha-ceph</span>
root@ceph-mgr1:~<span class="token comment"># cd /etc/ganesha/</span>
root@ceph-mgr1:/etc/ganesha<span class="token comment"># cat ganesha.conf</span>
<span class="token comment"># create new</span>
NFS_CORE_PARAM <span class="token punctuation">{</span>
   <span class="token comment"># disable NLM</span>
   Enable_ NLM <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
   <span class="token comment"># disable RQUOTA (not suported on CephFS)</span>
   Enable_ RQUOTA <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
   <span class="token comment"># NFS protocol</span>
   Protocols <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
EXPORT_DEFAULTS <span class="token punctuation">{</span>
   <span class="token comment"># default access mode</span>
   Access_Type <span class="token operator">=</span> RW<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
EXPORT <span class="token punctuation">{</span>
   <span class="token comment"># uniq ID</span>
   Export_ld <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
   <span class="token comment"># mount path of CephFS</span>
   Path <span class="token operator">=</span> <span class="token string">"/"</span><span class="token punctuation">;</span>
   FSAL <span class="token punctuation">{</span>
      name <span class="token operator">=</span> CEPH<span class="token punctuation">;</span>
      <span class="token comment"># hostname or IP address of this Node</span>
      <span class="token assign-left variable">hostname</span><span class="token operator">=</span><span class="token string">"172.31.6.104"</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
  <span class="token comment"># setting for root Squash</span>
  <span class="token assign-left variable">Squash</span><span class="token operator">=</span><span class="token string">"No_root_squash"</span><span class="token punctuation">;</span>
  <span class="token comment"># NFSv4 Pseudo path</span>
  <span class="token assign-left variable">Pseudo</span><span class="token operator">=</span> */magedu<span class="token string">";
  # allowed security options
  SecType = "</span>sys"<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
LOG <span class="token punctuation">{</span>
   <span class="token comment"># default log level</span>
   Default_ _Log_ Level <span class="token operator">=</span> WARN<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
root@ceph-mgr1:/etc/ganesha<span class="token comment"># systemctl restart nfs-ganesha</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-12-2-客户端挂载测试" tabindex="-1"><a class="header-anchor" href="#_7-12-2-客户端挂载测试" aria-hidden="true">#</a> 7.12.2 客户端挂载测试</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph- client3-ubuntu1804:~<span class="token comment"># mount -t nfs 172.31.6.104:/magedu /data</span>
验证挂载:
<span class="token function">df</span> <span class="token parameter variable">-TH</span>

<span class="token comment">#客户端测试写人数据:</span>
root@ceph-client3-ubuntu1804:~<span class="token comment"># echo "ganesha v11111111" >> /data/magedu/data/magedu.txt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


