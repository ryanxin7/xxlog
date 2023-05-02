<template><div><h2 id="_6-1-rbd架构图" tabindex="-1"><a class="header-anchor" href="#_6-1-rbd架构图" aria-hidden="true">#</a> 6.1 RBD架构图</h2>
<p>Ceph可以同时提供对象存储<strong>RADOSGW</strong> 、<strong>块存储RBD</strong>、<strong>文件系统存储Ceph FS</strong><br />RBD即<strong>RADOS Block Device</strong>的简称，RIBD 块存储是常用的存储类型之一，RBD块设备类似磁盘可以被挂载，RBD 块设备具有快照、多副本、克隆和一致性等特性，数据以条带化的方式存储在Ceph集群的多个OSD中，<br /><strong>条带化技术</strong>就是一种自动的将1/0 的负载均衡到多个物理磁盘上的技术，条带化技术就是将一块连续的数据分成很多小部分并把他们分别存储到不同磁盘上去.这就能使多个进程同时访问数据的多个不同部分而不会造成磁盘冲突，而且在需要对这种数据进行顺序访问的时候可以获得最大程度上的/O并行能力，从而获得非常好的性能。</p>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1669948660767-92e57330-688f-40eb-b794-bfe6f0629769.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="_6-2-创建存储池" tabindex="-1"><a class="header-anchor" href="#_6-2-创建存储池" aria-hidden="true">#</a> 6.2 创建存储池</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph osd pool create rbd-data1 <span class="token number">32</span> <span class="token number">32</span>
pool <span class="token string">'rbd-data1'</span> created


<span class="token comment">#在存储池启用rbd</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph osd pool appliclition <span class="token builtin class-name">enable</span> rbd-data1 rbd
enabled application <span class="token string">'rbd'</span> on pool <span class="token string">'rbd-data1'</span>

<span class="token comment">#初始化rbd:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd pool init <span class="token parameter variable">-P</span> rbd-data1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-3-创建img镜像" tabindex="-1"><a class="header-anchor" href="#_6-3-创建img镜像" aria-hidden="true">#</a> 6.3 创建img镜像</h2>
<p>rbd存储池并不能直接用于块设备，而是需要事先在其中按需创建映像(image) ，并把映像文件作为块设备使用。<br />rbd 命令可用于创建、查看及删除块设备相在的映像(image) ，以及克隆映像、创建快照.将映像回滚到快照和查看快照等管理操作。<br />例如，下面的命令能够在指定的RBD即rbd-data1创建一个名为myimg1的映像:</p>
<h3 id="_6-3-1-创建镜像" tabindex="-1"><a class="header-anchor" href="#_6-3-1-创建镜像" aria-hidden="true">#</a> 6.3.1 创建镜像</h3>
<p>创建镜像命令格式:<br /></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#创建两个镜像:</span>
$ rbd create data-img1 <span class="token parameter variable">--size</span> 3G <span class="token parameter variable">--pool</span> rbd-data1 --image-format <span class="token number">2</span> --image-feature layering
$ rbd create data-img2 <span class="token parameter variable">--size</span> 5G <span class="token parameter variable">--pool</span> rbd-data1 --image-format <span class="token number">2</span> --image-feature layering

<span class="token comment">#验证镜像:</span>
$ rbd <span class="token function">ls</span> <span class="token parameter variable">--pool</span> rbd-data1
data-img1
data-img2

<span class="token comment">#列出镜像个多信息:</span>
$ rbd Is <span class="token parameter variable">--pool</span> rbd-data1 -<span class="token operator">|</span> <span class="token number">1</span>
NAME       SIZE PARENT FMT PROT LOCK
data-img1  <span class="token number">3</span> GiB        <span class="token number">2</span>
data-img2  <span class="token number">5</span> GiB        <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-2-查看镜像详细信息" tabindex="-1"><a class="header-anchor" href="#_6-3-2-查看镜像详细信息" aria-hidden="true">#</a> 6.3.2 查看镜像详细信息</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ rbd <span class="token parameter variable">--image</span> data-img2 <span class="token parameter variable">--pool</span> rbd-data1 info
rbd image <span class="token string">'data-img2'</span><span class="token builtin class-name">:</span>
        size <span class="token number">5</span> GiB <span class="token keyword">in</span> <span class="token number">1280</span> objects
        order <span class="token number">22</span> <span class="token punctuation">(</span><span class="token number">4</span> MiB objects<span class="token punctuation">)</span> <span class="token comment">#对象大小，每个对象是2^22/1024/1024=4MiB</span>
        id: d42b6b8b4567 <span class="token comment">#镜像id</span>
        block_name_prefix: rbd_data.d42b6b8b4567 <span class="token comment">#size里面的1280个对象名称前缀</span>
        format:2 <span class="token comment">#镜像文件格式版本</span>
        features:layering <span class="token comment">#特性，layering 支持分层快照以写时复制</span>
        op_features:
        flags:
        create timestamp: Mon Dec <span class="token number">14</span> <span class="token number">12</span>:22:27 <span class="token number">2020</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-3-以json格式显示镜像信息" tabindex="-1"><a class="header-anchor" href="#_6-3-3-以json格式显示镜像信息" aria-hidden="true">#</a> 6.3.3 以json格式显示镜像信息:</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ rbd <span class="token function">ls</span> <span class="token parameter variable">--pool</span> rbd-data1 -<span class="token operator">|</span> <span class="token parameter variable">--format</span> json --pretty-format
<span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string">"image"</span><span class="token builtin class-name">:</span> <span class="token string">"data-img1"</span>,
        <span class="token string">"size"</span><span class="token builtin class-name">:</span> <span class="token number">3221225472</span>,
        <span class="token string">"format"</span><span class="token builtin class-name">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>,
    <span class="token punctuation">{</span>
        <span class="token string">"image"</span><span class="token builtin class-name">:</span> <span class="token string">"data-img2"</span>,
        <span class="token string">"size"</span><span class="token builtin class-name">:</span> <span class="token number">5368709120</span>,
        <span class="token string">"format"</span><span class="token builtin class-name">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-4-镜像的其他特性" tabindex="-1"><a class="header-anchor" href="#_6-3-4-镜像的其他特性" aria-hidden="true">#</a> 6.3.4 镜像的其他特性</h3>
<p><strong>特性简介</strong><br /><strong>layering</strong>:支持镜像分层快照特性，用于快照及写时复制，可以对image创建快照并保护，然后从快照克隆出新的image出来，父子image之间采用COW技术，共享对象数据。<br /><strong>striping</strong>:支持条带化v2，类似raid 0 ，只不过在ceph环境中的数据被分散到不同的对象中，可改善顺序读写场景较多情况下的性能。</p>
<p><strong>exclusive-lock</strong>: 支持独占锁，限制-一个镜像只能被一个客户端 使用.<br /><strong>object-map</strong>: 支持对象映射(依赖<strong>exclusive-lock</strong>),加速数据导人导出及已用空间统计等，此特性开启的时候，会记录image所有对象的一个位图，用以标记对象是否真的存在，在一些场景下可以加速io。</p>
<p><strong>fast-diff</strong>: 快速计算镜像与快照数据差异对比(依赖object-map).<br /><strong>deep-flatten</strong>: 支持快照扁平化操作，用于快照管理时解决快照依赖关系等。<br /><strong>journaling</strong>: 修改数据是否记录日志，该特性可以通过记录日志并通过日志恢复数据(依赖独占锁)，开启此特性会增加系统磁盘I0使用.</p>
<p>jewel默认开启的特性包括: <strong>layering/exlcusive lock/object map/fast diff/deep flatten</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd <span class="token builtin class-name">help</span> feature <span class="token builtin class-name">enable</span>
usage: rbd feature <span class="token builtin class-name">enable</span> <span class="token punctuation">[</span>--pool <span class="token operator">&lt;</span>pool<span class="token operator">></span><span class="token punctuation">]</span> <span class="token punctuation">[</span>-image <span class="token operator">&lt;</span>image<span class="token operator">></span><span class="token punctuation">]</span>
                             <span class="token punctuation">[</span>--journal-splay-width <span class="token operator">&lt;</span>jourmal-splay-width<span class="token operator">></span><span class="token punctuation">]</span>
                             <span class="token punctuation">[</span>--jourmal-object- size <span class="token operator">&lt;</span>journal-object- size<span class="token operator">></span><span class="token punctuation">]</span>
                             <span class="token punctuation">[</span>--journal-pool <span class="token operator">&lt;</span>journal-pool<span class="token operator">></span><span class="token punctuation">]</span>
                             <span class="token operator">&lt;</span>image-spec<span class="token operator">></span> <span class="token operator">&lt;</span>features<span class="token operator">></span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>features<span class="token operator">></span> <span class="token punctuation">..</span>. <span class="token punctuation">]</span>
Enable the specified image feature.

Positional arguments
<span class="token operator">&lt;</span>image-spec<span class="token operator">></span>                  image specification
                              <span class="token punctuation">(</span>example: <span class="token punctuation">[</span><span class="token operator">&lt;</span>pool-name<span class="token operator">></span>/<span class="token operator">&lt;</span>image-name<span class="token operator">></span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span>features<span class="token operator">></span>                    image features
                              <span class="token punctuation">[</span>exclusive-lock, object-map, fast-diff, journaling<span class="token punctuation">]</span>
Optional arguments
<span class="token parameter variable">-P</span> <span class="token punctuation">[</span>--pool<span class="token punctuation">]</span> arg    pool name
<span class="token parameter variable">--image</span> arg        image name
--journal-splay-width arg number of active journal objects
--joumal-object-size arg size of journal objects <span class="token punctuation">[</span>4K <span class="token operator">&lt;=</span> size <span class="token operator">&lt;=</span> 64M<span class="token punctuation">]</span>
--joumnal-pool arg  pool <span class="token keyword">for</span> journal objects
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-6-镜像特性的启用" tabindex="-1"><a class="header-anchor" href="#_6-3-6-镜像特性的启用" aria-hidden="true">#</a> 6.3.6 镜像特性的启用</h3>
<p>启用指定存储池中的指定镜像的特性:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ rbd feature <span class="token builtin class-name">enable</span> exclusive-lock <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img1
$ rbd feature <span class="token builtin class-name">enable</span> object-map <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img1
$ rbd feature <span class="token builtin class-name">enable</span> fast-diff <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img1


<span class="token comment">#验证镜像特性:</span>
$ rbd <span class="token parameter variable">-imnage</span> data-img1 <span class="token parameter variable">--pool</span> rbd-data1 info
rbd image <span class="token string">'data-img1'</span><span class="token builtin class-name">:</span>
        size <span class="token number">3</span> GiB <span class="token keyword">in</span> <span class="token number">768</span> objects
        order <span class="token number">22</span> <span class="token punctuation">(</span><span class="token number">4</span> MiB objects<span class="token punctuation">)</span>
        id: d45b6b8b4567
        block_name_prefix: rbd_data.d45b6b8b4567
        format: <span class="token number">2</span>
        features: layering, exclusive-lock, object-map, fast-diff
        op_features:
        flags: object map invalid, fast <span class="token function">diff</span> invalid
        create_ timestamp: Mon Dec <span class="token number">14</span> <span class="token number">12</span>:35:44 <span class="token number">2020</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-7-镜像特性的禁用" tabindex="-1"><a class="header-anchor" href="#_6-3-7-镜像特性的禁用" aria-hidden="true">#</a> 6.3.7 镜像特性的禁用</h3>
<p>禁用指定存储池中指定镜像的特性</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ rbd feature disable fast-diff <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img1

<span class="token comment">#验证镜像特性:</span>
$ rbd <span class="token parameter variable">--image</span> data-img1 <span class="token parameter variable">--pool</span> rbd-data1 info
            rbd image <span class="token string">'data-img1'</span><span class="token builtin class-name">:</span>
            size <span class="token number">3</span> GiB <span class="token keyword">in</span> <span class="token number">768</span> objects
            order <span class="token number">22</span> <span class="token punctuation">(</span><span class="token number">4</span> MiB objects<span class="token punctuation">)</span>
            id: d45b6b8b4567
            block_name_prefix: rbd_data.d45b6b8b4567
            format: <span class="token number">2</span>
            features: layering, exclusive-lock, object-map <span class="token comment">#少了一个fast-diff 特性</span>
            op_features:
            flags: object map invalid
            create_timestamp: Mon Dec <span class="token number">14</span> <span class="token number">12</span>:35:44 <span class="token number">2020</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-4-配置客户端使用rbd" tabindex="-1"><a class="header-anchor" href="#_6-4-配置客户端使用rbd" aria-hidden="true">#</a> 6.4 配置客户端使用RBD</h2>
<p>在centos客户端挂载RBD，并分别使用admin及普通用户挂载RBD并验证使用.</p>
<h3 id="_6-4-1-客户端配置yum源" tabindex="-1"><a class="header-anchor" href="#_6-4-1-客户端配置yum源" aria-hidden="true">#</a> 6.4.1 客户端配置yum源</h3>
<p>客户端要想挂载使用ceph RBD，需要安装ceph客户端组件<strong>ceph-common</strong>，但是<br />ceph-common不在cenos的yum仓库，因此需要单独配置yum源。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#配置yum源:</span>
yum <span class="token function">install</span> epel-release
yum <span class="token function">install</span> htps://mirrors.aliyun.com/ceph/rpm-octopus/el7/noarch/ceph-release-1-1.el7.noarch.rpm <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-2-客户端安装ceph-common" tabindex="-1"><a class="header-anchor" href="#_6-4-2-客户端安装ceph-common" aria-hidden="true">#</a> 6.4.2 客户端安装ceph-common:</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> ceph-common
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6-4-3-客户端使用普通用户挂载并使用rbd" tabindex="-1"><a class="header-anchor" href="#_6-4-3-客户端使用普通用户挂载并使用rbd" aria-hidden="true">#</a> 6.4.3  客户端使用普通用户挂载并使用RBD</h3>
<p>创建普通账户并授权:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#创建普通账户</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth <span class="token function">add</span> clientshjie mon <span class="token string">'allow r'</span> osd <span class="token string">'allow rwx pool=rbd-data1'</span>
added key <span class="token keyword">for</span> client.lije

<span class="token comment">#验证用户信息</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster$ ceph auth get client.shijie
exported keyring <span class="token keyword">for</span> client.shijie
<span class="token punctuation">[</span>client.shijie<span class="token punctuation">]</span>
          key <span class="token operator">=</span> AQDHE9hfhzPVCRAAIlRuUIkWQW8YXv/JiLizFuA<span class="token operator">==</span>
          caps mon <span class="token operator">=</span> <span class="token string">"allow r"</span>
          caps osd <span class="token operator">=</span> <span class="token string">"allow rwx pool=rbd-data1"</span>

<span class="token comment">#创建空的keyring文件</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph-authtool --riate-keyring ceph.client.shijie.keyring
creating ceph.clent.shije.keyring

<span class="token comment">#导出用户keyring</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth get client.shijie <span class="token parameter variable">-o</span> ceph.client.shiie.keyring
exported keyring <span class="token keyword">for</span> client.shjjie

<span class="token comment">#验证指定用户的keyring文件</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ <span class="token function">cat</span> ceph.client.shiie.keyring
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拷贝配置文件与普通账户keyring文件到客户端</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">scp</span> ceph.cpnf ceph.client.shiie.keyring root@172.31.6.201:/etc/ceph
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6-4-4-在客户端验证权限" tabindex="-1"><a class="header-anchor" href="#_6-4-4-在客户端验证权限" aria-hidden="true">#</a> 6.4.4 在客户端验证权限</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># cd /etc/ceph/</span>
root@ceph-client2 ceph<span class="token punctuation">]</span><span class="token comment"># ls</span>
ceph.client.shije.keyring ceph.conf rbdmap
root@ceph-client2 ceph<span class="token punctuation">]</span><span class="token comment"># ceph --user shijie -s #默认使用admin账户</span>
cluster:
   id:  23b0f9f2 -8db3-477f-99a7 <span class="token parameter variable">-35a90eaf3dab</span>
   health: HEALTH_ OK

mgr: ceph-mgr1<span class="token punctuation">(</span>active<span class="token punctuation">)</span>, standbys: ceph-mgr2
mds: mycephfs-1/1/1 up <span class="token punctuation">{</span><span class="token number">0</span><span class="token operator">=</span>ceph-mgr1<span class="token operator">=</span>up:active<span class="token punctuation">}</span>
osd: <span class="token number">12</span> osds: <span class="token number">12</span> up, <span class="token number">12</span> <span class="token keyword">in</span>
rgw.1 daemon active
data:
pools: <span class="token number">9</span> pools, <span class="token number">256</span> pgs
objects: <span class="token number">400</span> objects, <span class="token number">455</span> MiB
usage: <span class="token number">14</span> GiB used, <span class="token number">1.2</span> TiB / <span class="token number">1.2</span> TiB avail
pgs: <span class="token number">256</span> active+clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-5-映射rbd" tabindex="-1"><a class="header-anchor" href="#_6-4-5-映射rbd" aria-hidden="true">#</a> 6.4.5 映射rbd</h3>
<p>使用普通用户权限映射rbd</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#映射rbd</span>
root@ceph-client2 ceph<span class="token punctuation">]</span><span class="token comment"># rbd --user shijie -p rbd-data1 map data-img2 /dev/rbd0</span>

<span class="token comment">#验证rbd</span>
root@ceph- client2 ceph<span class="token punctuation">]</span><span class="token comment"># fdisk - /dev/rbd0</span>

Disk /dev/rbd0: <span class="token number">5368</span> MB, <span class="token number">5368709120</span> bytes, <span class="token number">10485760</span> sectors
Units <span class="token operator">=</span> sectors of <span class="token number">1</span> * <span class="token number">512</span> <span class="token operator">=</span> <span class="token number">512</span> bytes
Sector size <span class="token punctuation">(</span>logical/physical<span class="token punctuation">)</span>: <span class="token number">512</span> bytes / <span class="token number">512</span> bytes
I/O size <span class="token punctuation">(</span>minimum/optimal<span class="token punctuation">)</span>: <span class="token number">4194304</span> bytes / <span class="token number">4194304</span> bytes

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/xxlog/1669957144116-253e56a8-a026-400c-bc6f-b54aae46f5a7.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_6-4-6-格式化并使用rbd镜像" tabindex="-1"><a class="header-anchor" href="#_6-4-6-格式化并使用rbd镜像" aria-hidden="true">#</a> 6.4.6 格式化并使用rbd镜像</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-client2 ceph<span class="token punctuation">]</span><span class="token comment"># mkfs.ext4 /dev/rbd0</span>
<span class="token punctuation">[</span>root@ceph-client2 ceph<span class="token punctuation">]</span><span class="token comment"># mkdir /data</span>
<span class="token punctuation">[</span>root@ceph-client2 ceph<span class="token punctuation">]</span><span class="token comment"># mount /dev/rbd0 /data/</span>
<span class="token punctuation">[</span>root@ceph-client2 ceph<span class="token punctuation">]</span><span class="token comment"># cp /var/log/messages /data/</span>
root@ceph-client2 ceph<span class="token punctuation">]</span><span class="token comment"># df -TH</span>

<span class="token comment">#管理端验证镜像状态</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd <span class="token function">ls</span> <span class="token parameter variable">-p</span> rbd-data1 <span class="token parameter variable">-l</span>
NAME  SIZE PARENT FMT PROT LOCK
data-img1 <span class="token number">3</span> GiB    <span class="token number">2</span>      excl  <span class="token comment">#施加锁文件，已经被客户端映射</span>
data-img2 <span class="token number">5</span> GiB    <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-7-验证ceph内核模块" tabindex="-1"><a class="header-anchor" href="#_6-4-7-验证ceph内核模块" aria-hidden="true">#</a> 6.4.7 验证ceph内核模块</h3>
<p>挂载rbd之后系统内核会自动加载 <strong>libceph.ko</strong> 模块</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#centos </span>
lsmod <span class="token operator">|</span> <span class="token function">grep</span> ceph 

modinfo libceph


<span class="token comment">#ubuntu </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-8-rbd镜像空间拉伸" tabindex="-1"><a class="header-anchor" href="#_6-4-8-rbd镜像空间拉伸" aria-hidden="true">#</a> 6.4.8 rbd镜像空间拉伸</h3>
<p>可以扩展空间，不建议缩小空间</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#当前rbd镜像空间大小</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster$ rbd <span class="token function">ls</span> <span class="token parameter variable">-p</span> rbd-data1 <span class="token parameter variable">-l</span>
NAME  SIZE PARENT FMT PROT LOCK
data-img1 <span class="token number">3</span> GiB     <span class="token number">2</span>   excl
data-ima2 <span class="token number">5</span> GiB     <span class="token number">2</span>

<span class="token comment">#rbd镜像空间拉伸命令</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd <span class="token builtin class-name">help</span> resize
usage: rbd resize <span class="token punctuation">[</span>--pool <span class="token operator">&lt;</span>pool<span class="token operator">></span><span class="token punctuation">]</span> <span class="token punctuation">[</span>--image <span class="token operator">&lt;</span>image<span class="token operator">></span><span class="token punctuation">]</span> <span class="token parameter variable">--size</span> <span class="token operator">&lt;</span>size<span class="token operator">></span>
                     <span class="token punctuation">[</span>--allow-shrink<span class="token punctuation">]</span> <span class="token punctuation">[</span>--no-progress<span class="token punctuation">]</span>
                     <span class="token operator">&lt;</span>image-spec<span class="token operator">></span>
<span class="token comment">#拉伸rbd镜像空间</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd resize <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img2 <span class="token parameter variable">-size</span> 8G
Resizing image: <span class="token number">100</span>% complete<span class="token punctuation">..</span>done.
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd <span class="token function">ls</span> <span class="token parameter variable">-p</span> rbd-data1 <span class="token parameter variable">-l</span>
NAME  SIZE PARENT FMT PROT LOCK
data-img1 <span class="token number">3</span> GiB   <span class="token number">2</span>        excl
data-img2 <span class="token number">8</span> GiB   <span class="token number">2</span>

客户端验证镜像空间:

<span class="token punctuation">[</span>root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># fdisk -l /dev/rbd0</span>
Disk /dev/rbd0: <span class="token number">8589</span> MB, <span class="token number">8589934592</span> bytes, <span class="token number">16777216</span> sectors
Units <span class="token operator">=</span> sectors of <span class="token number">1</span> * <span class="token number">512</span> <span class="token operator">=</span> <span class="token number">512</span> bytes
Sector size <span class="token punctuation">(</span>logical/physical<span class="token punctuation">)</span>: <span class="token number">512</span> bytes/ <span class="token number">512</span> bytes
I/O size <span class="token punctuation">(</span>minimum/optimal<span class="token punctuation">)</span>: <span class="token number">4194304</span> bytes / <span class="token number">4194304</span> bytes

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-9-开机自动挂载" tabindex="-1"><a class="header-anchor" href="#_6-4-9-开机自动挂载" aria-hidden="true">#</a> 6.4.9 开机自动挂载</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/rc.d/rc.local</span>

ripod <span class="token parameter variable">--user</span> shijie <span class="token parameter variable">-p</span> rbd-data1 map data-img1
<span class="token function">mount</span> /dev/rbd0 /data/

<span class="token punctuation">[</span>root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># chmod a+x /etc/rc.d/rc.local</span>
<span class="token punctuation">[</span>root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># reboot</span>

<span class="token comment">#查看映射</span>
<span class="token punctuation">[</span>root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># rbd showmapped</span>
<span class="token function">id</span> pool image  snap device
<span class="token number">0</span> rbd-data1 data-img2 -   /dev/rbd0

<span class="token comment">#验证挂载</span>
<span class="token punctuation">[</span>root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># df -TH</span>
Filesystem    Type   Size Used Avail Use% Mounted on
devtmpfs     devtmpfs 942M  <span class="token number">0</span>    942M    <span class="token number">0</span>% /dev

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-10-卸载rbd镜像" tabindex="-1"><a class="header-anchor" href="#_6-4-10-卸载rbd镜像" aria-hidden="true">#</a> 6.4.10 卸载rbd镜像</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-client2 ceph<span class="token punctuation">]</span><span class="token comment"># umount /data</span>
root@ceph-client2 ceph<span class="token punctuation">]</span><span class="token comment"># rbd --user shijie -p rbd-data1 unmap data-img2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-11-删除rbd镜像" tabindex="-1"><a class="header-anchor" href="#_6-4-11-删除rbd镜像" aria-hidden="true">#</a> 6.4.11 删除rbd镜像</h3>
<p>镜像删除后数据也会被删除而且是无法恢复，因此在执行删除操作的时候要慎重。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd <span class="token builtin class-name">help</span> <span class="token function">rm</span>
usage: rbd <span class="token function">rm</span> <span class="token punctuation">[</span>--pool <span class="token operator">&lt;</span>pool<span class="token operator">></span><span class="token punctuation">]</span> <span class="token punctuation">[</span>--image <span class="token operator">&lt;</span>image<span class="token operator">></span><span class="token punctuation">]</span> <span class="token punctuation">[</span>--no-progress<span class="token punctuation">]</span>
              <span class="token operator">&lt;</span>image-spec<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-12-rbd镜像回收站机制" tabindex="-1"><a class="header-anchor" href="#_6-4-12-rbd镜像回收站机制" aria-hidden="true">#</a> 6.4.12 rbd镜像回收站机制</h3>
<p>删除的镜像数据无法恢复,但是还有另外一种方法可以先把镜像移动到回收站，后期确认删除的时候再从回收站删除即可。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster$ rbd <span class="token builtin class-name">help</span> trash 
status       Show the status of this image.
trash list <span class="token punctuation">(</span>trash <span class="token function">ls</span><span class="token punctuation">)</span>  List trash images.
trash move <span class="token punctuation">(</span>trash <span class="token function">mv</span><span class="token punctuation">)</span>  Move an image to the trash.
trash purge  Remove all expired images from trash.
trash remove <span class="token punctuation">(</span>trash <span class="token function">rm</span><span class="token punctuation">)</span>  Remove an image from trash.
trash restore  Restore an image from trash.

<span class="token comment">#查看镜像状态:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd status <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img2
Watchers:
       <span class="token assign-left variable">watcher</span><span class="token operator">=</span><span class="token number">172.31</span>.6.1 <span class="token number">10</span>:0/2342274731  client.54552
<span class="token assign-left variable">cookie</span><span class="token operator">=</span><span class="token number">18446462598732840961</span>
       <span class="token assign-left variable">watcher</span><span class="token operator">=</span><span class="token number">1</span> <span class="token number">72.31</span>.6.111:0/2165319040 client.54558
<span class="token assign-left variable">cookie</span><span class="token operator">=</span><span class="token number">18446462598732840961</span>

<span class="token comment">#将镜像移动到回收站:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd trash move <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img2

<span class="token comment">#查看回收站的镜像:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster$ rbd trash list <span class="token parameter variable">--pool</span> rbd-data1
d42b6b8b4567 data-img2


<span class="token comment">#从回收站删除镜像</span>
如果镜像不再使用，可以直接使用trash remove将其从回收站删除

<span class="token comment">#还原镜像</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span><span class="token variable">$lybd</span> trash restore <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img2 --image-id d42b6b8b4567

<span class="token comment">#验证镜像:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd Is <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">-1</span>
NAME SIZE PARENT FMT PROT LOCK
data-img2 <span class="token number">8</span> GiB  <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-5-镜像快照" tabindex="-1"><a class="header-anchor" href="#_6-5-镜像快照" aria-hidden="true">#</a> 6.5 镜像快照</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd <span class="token builtin class-name">help</span> snap
snap create <span class="token punctuation">(</span>snap <span class="token function">add</span><span class="token punctuation">)</span> <span class="token comment">#创建快照</span>
snap limit <span class="token function">clear</span>  <span class="token comment">#清除镜像的快照数量限制</span>
snap limit <span class="token builtin class-name">set</span> <span class="token comment">#设置一个镜像的快照上限</span>
snap list <span class="token punctuation">(</span>snap <span class="token function">ls</span><span class="token punctuation">)</span> <span class="token comment">#列出快照</span>
snap protect <span class="token comment">#保护快 照被删除</span>
snap purge <span class="token comment">#删除所有未保护的快照</span>
snap remove <span class="token punctuation">(</span>snap <span class="token function">rm</span><span class="token punctuation">)</span>  <span class="token comment">#删除一个快照</span>
snap <span class="token function">rename</span>  <span class="token comment">#重命名快照</span>
snap rollback <span class="token punctuation">(</span>snap revert<span class="token punctuation">)</span> <span class="token comment">#还原快照</span>
snap unprotect  <span class="token comment">#允许一个快照被删除(取消快照保护)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-5-1-创建快照" tabindex="-1"><a class="header-anchor" href="#_6-5-1-创建快照" aria-hidden="true">#</a> 6.5.1 创建快照</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd <span class="token builtin class-name">help</span> snap create
usage: rbd snap create <span class="token punctuation">[</span>--pool <span class="token operator">&lt;</span>poob<span class="token operator">></span><span class="token punctuation">]</span> <span class="token punctuation">[</span>--image <span class="token operator">&lt;</span>image<span class="token operator">></span><span class="token punctuation">]</span> <span class="token punctuation">[</span>--snap <span class="token operator">&lt;</span>snap<span class="token operator">></span><span class="token punctuation">]</span>
                          <span class="token operator">&lt;</span>snap-spec<span class="token operator">></span>
<span class="token comment">#创建快照</span>
$ rbd snap create <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img2 - snap
img2-snap-20201215

<span class="token comment">#验证快照</span>
$ rbd snap list <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img2
SNAPID NAME        SIZE TIMESTAMP
    <span class="token number">4</span> img2-snap-20201215 <span class="token number">8</span> GiB Tue Dec <span class="token number">15</span> <span class="token number">15</span>:26:20 <span class="token number">2020</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-5-2-删除数据并还原快照" tabindex="-1"><a class="header-anchor" href="#_6-5-2-删除数据并还原快照" aria-hidden="true">#</a> 6.5.2 删除数据并还原快照</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>关闭服务<span class="token operator">></span>取消挂载 <span class="token operator">></span> 取消映射 

<span class="token comment">#卸载rbd</span>
root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># umount /data</span>
root@ceph-client2 ~<span class="token punctuation">]</span><span class="token comment"># rbd unmap /dev/rbd0</span>

<span class="token comment">#回滚命令:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd <span class="token builtin class-name">help</span> snap rollback
usage: rbd snap rollback <span class="token punctuation">[</span>--pool <span class="token operator">&lt;</span>pool<span class="token operator">></span><span class="token punctuation">]</span> <span class="token punctuation">[</span>-image <span class="token operator">&lt;</span>image<span class="token operator">></span><span class="token punctuation">]</span> <span class="token punctuation">[</span>--snap <span class="token operator">&lt;</span>snap<span class="token operator">></span><span class="token punctuation">]</span>
                         <span class="token punctuation">[</span>--no-progress<span class="token punctuation">]</span>
                         <span class="token operator">&lt;</span>snap-spec<span class="token operator">></span>
                         

<span class="token comment">#回滚快照</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-clusterI$ rbd snap rollbaci <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img2 <span class="token parameter variable">--snap</span> img2-snap-20201215
Rolling back to snapshot: <span class="token number">100</span>% complete<span class="token punctuation">..</span>done.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-5-3-删除快照" tabindex="-1"><a class="header-anchor" href="#_6-5-3-删除快照" aria-hidden="true">#</a> 6.5.3 删除快照</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#删除指定快照</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span><span class="token variable">$I</span> rbd snap remove <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img2 <span class="token parameter variable">--snap</span> img2-snap-20201215
Removing snap: <span class="token number">100</span>% complet<span class="token punctuation">..</span>.done.

<span class="token comment">#验证快照是否删除</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd snap list <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img2



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-5-4-快照数量限制" tabindex="-1"><a class="header-anchor" href="#_6-5-4-快照数量限制" aria-hidden="true">#</a> 6.5.4 快照数量限制</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#设置与修改快照数量限制</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd snap limit <span class="token builtin class-name">set</span> <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img2 <span class="token parameter variable">--limit</span> <span class="token number">30</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd snap limit <span class="token builtin class-name">set</span> <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img2 <span class="token parameter variable">--limit</span> <span class="token number">20</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ rbd snap limit <span class="token builtin class-name">set</span> <span class="token parameter variable">--pool</span> rbd-data1 <span class="token parameter variable">--image</span> data-img2 <span class="token parameter variable">--limit</span> <span class="token number">15</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


