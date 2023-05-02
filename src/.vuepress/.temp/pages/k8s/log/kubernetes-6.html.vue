<template><div><p><a name="nlbOU"></a></p>
<h2 id="rbd结合k8s提供存储卷及动态存储卷使用案例" tabindex="-1"><a class="header-anchor" href="#rbd结合k8s提供存储卷及动态存储卷使用案例" aria-hidden="true">#</a> rbd结合k8s提供存储卷及动态存储卷使用案例</h2>
<blockquote>
<p><strong>目的：</strong>
让k8s 中的 pod 可以访问 ceph中rbd 提供的镜像作为存储设备。</p>
</blockquote>
<p>需要在 ceph 创建rbd并且让 k8s node 节点能够通过 ceph 的认证k8s在使用 ceph 作为动态存储卷的时候，需要 **kube-controller-manager **组件能够访问ceph，因此需要在包括k8s master及 node节点在内的每一个node 同步认证文件。</p>
<p><a name="eTh1Y"></a></p>
<h2 id="_1-创建初始化rbd" tabindex="-1"><a class="header-anchor" href="#_1-创建初始化rbd" aria-hidden="true">#</a> 1.创建初始化RBD</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#创建新的rbd</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ~<span class="token punctuation">]</span>$ ceph osd pool create shijie-rbd-pool1 <span class="token number">32</span> <span class="token number">32</span>
pool<span class="token string">'xin-rbd-pool1'</span> created

<span class="token comment">#验证存储池:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ~<span class="token punctuation">]</span>$ ceph osd pool <span class="token function">ls</span>
mypool
myrdb1
.rgw.root
default.rgw.controldefault.rgw.meta
default.rgw.log
cephfs-metadata
cephfs-datarbd-data1
xin-rbd-pool1 

<span class="token comment">#确认存储池已经存在</span>

<span class="token comment">#存储池启用rbd</span>
ceph@ceph-deploy ~<span class="token punctuation">]</span>$ ceph osd pool application <span class="token builtin class-name">enable</span> xin-rbd-pool1 
rbd enabled application <span class="token string">'rbd'</span> on pool 'xin-rbd-pool1
<span class="token comment">#初始化</span>
rbdceph@ceph-deploy ~<span class="token punctuation">]</span>$ rbd pool init <span class="token parameter variable">-p</span> xin-rbd-pool1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="cyD3t"></a></p>
<h2 id="_2-创建image" tabindex="-1"><a class="header-anchor" href="#_2-创建image" aria-hidden="true">#</a> 2 创建image</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#创建镜像</span>
<span class="token punctuation">[</span>ceph@ceph-deploy -<span class="token punctuation">]</span>$ rbd create xin-img-img1 <span class="token parameter variable">--size</span> 3G <span class="token parameter variable">--pool</span> xin-rbd-pool1 --image-format <span class="token number">2</span> --image-feature layering

<span class="token comment">#验证镜像</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ~<span class="token punctuation">]</span>$ rbd <span class="token function">ls</span> <span class="token parameter variable">--pool</span> xin-rbd-pool1 
shijie-img-img1


<span class="token comment">#验证镜像信息</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ~<span class="token punctuation">]</span>$ rbd <span class="token parameter variable">--image</span> xin-img-img1 <span class="token parameter variable">--pool</span> xin-rbd-pool1 
inforbd image <span class="token string">'xin-img-img1'</span><span class="token builtin class-name">:</span>

   size <span class="token number">3</span> GiBin <span class="token number">768</span> objects
   order <span class="token number">22</span> <span class="token punctuation">(</span><span class="token number">4</span> MiB objects<span class="token punctuation">)</span>
   id:1e7356b8b4567b
   lock_name_prefix:rbd_data.1e7356b8b4567
   format: <span class="token number">2</span>
   features: layering
   op_features:
   flags:
   create timestamp: Wed Jan <span class="token number">611</span>:01:51 <span class="token number">2021</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="meygs"></a></p>
<h2 id="客户端安装ceph-common" tabindex="-1"><a class="header-anchor" href="#客户端安装ceph-common" aria-hidden="true">#</a> 客户端安装ceph-common<br /><br /></h2>
<p>分别在 k8s master 与各 node 节点安装 ceph-common 组件包</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#下载key文件</span>
root@k8s-master1:$ <span class="token function">wget</span> <span class="token parameter variable">-q</span> -0- <span class="token string">'https://download.ceph.com/keys/release.asc'</span> <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
root@k8s-master2:$ <span class="token function">wget</span> <span class="token parameter variable">-q</span> -0- <span class="token string">'https://download.ceph.com/keys/release.asc'</span> <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
root@k8s-worker1:$ <span class="token function">wget</span> <span class="token parameter variable">-q</span> -0- <span class="token string">'https://download.ceph.com/keys/release.asc'</span> <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
root@k8s-worker2:$ <span class="token function">wget</span> <span class="token parameter variable">-q</span> -0- <span class="token string">'https://download.ceph.com/keys/release.asc'</span> <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -


<span class="token comment">#各 master与node 节点配置apt源</span>

root@k8s-master1:~$ <span class="token function">cat</span> /etc/apt/sources.list
<span class="token comment"># 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释</span>
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse</span>
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse</span>
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse</span>
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse</span>


<span class="token comment">#更新软件源</span>
root@k8s-node3:~$ <span class="token function">apt</span> update

<span class="token comment">#验证 ceph 版本</span>
root@k8s-master1:~$ <span class="token function">apt-cache</span> madison ceph-common

<span class="token comment">#各节点安装和当前 ceph 集群相同版本的 ceph-common</span>

root@k8s-node3:~$ <span class="token function">apt</span> <span class="token function">install</span> ceph-common<span class="token operator">=</span><span class="token number">13.2</span>.10-1bionic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="yXbkC"></a></p>
<h2 id="创建ceph-用户与授权" tabindex="-1"><a class="header-anchor" href="#创建ceph-用户与授权" aria-hidden="true">#</a> 创建ceph 用户与授权</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph@ceph-deploy ceph-clusterl$ ceph auth get-or-create client.xinceph-zcc mon <span class="token string">'allow r'</span> osd <span class="token string">'allow * pool=xin-rbd-pool1'</span> 
client.xinceph-zcc<span class="token punctuation">]</span>
    <span class="token assign-left variable">key</span><span class="token operator">=</span>AQB4L79g/he7HBAAvJQ7sl3zdSsTUL21Nx6zLQ<span class="token operator">==</span>


<span class="token comment">#验证用户</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth get client.xinceph-zcc
exported keyring <span class="token keyword">for</span> client.xinceph-zcc 
<span class="token punctuation">[</span>clientmagedu-shijie<span class="token punctuation">]</span>
   <span class="token assign-left variable">key</span><span class="token operator">=</span> AQB4L79g/he7HBAAvJQ7sl3zdSsTUL21Nx6zLQ<span class="token operator">==</span>
   caps mon <span class="token operator">=</span><span class="token string">"allow r"</span>
   caps osd <span class="token operator">=</span><span class="token string">"allow* pool=xin-rbd-pool1"</span>

<span class="token comment">#导出用户信息至keyring文件</span>
ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span><span class="token variable">$ceph</span> auth get client.xinceph-zcc <span class="token parameter variable">-o</span> client.xinceph-zcc.keyring 
exported keyring <span class="token keyword">for</span> client.xinceph-zcc


<span class="token comment">#同步认证文件到 k8s各master 及node节点</span>
ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ <span class="token function">scp</span> ceph.conf ceph.client.xinceph-zcc.keyring root@10.1.0.30:/etc/ceph
ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ <span class="token function">scp</span> ceph.conf ceph.client.xinceph-zcc.keyring root@10.1.0.31:/etc/ceph
ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ <span class="token function">scp</span> ceph.conf ceph.client.xinceph-zcc.keyring root@10.1.0.32:/etc/ceph
ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ <span class="token function">scp</span> ceph.conf ceph.client.xinceph-zcc.keyring root@10.1.0.33:/etc/ceph

<span class="token comment">#添加hosts</span>

<span class="token number">172.31</span>.6.101 ceph-node1.jie.local ceph-node1
<span class="token number">172.31</span>.6.102 ceph-node2.jie.ocal ceph-node2
<span class="token number">172.31</span>.6.103 ceph-node3.jie.ocal ceph-node3
<span class="token number">172.31</span>.6.104 ceph-mon1.jie.local ceph-mon1
<span class="token number">172.31</span>.6.105 ceph-mon2.jie.local ceph-mon2
<span class="token number">172.31</span>.6.106 ceph-mon3.jie.local ceph-mon3
<span class="token number">172.31</span>.6.107 ceph-mgr1.jie.local ceph-mgr1
<span class="token number">172.31</span>.6.108 ceph-mgr2.jie.local ceph-mgr2
<span class="token number">172.31</span>.6.109 ceph-deploy.jie.local ceph-deploy


<span class="token comment">#在k8snode节点验证用户权限</span>
root@k8s-node1:~$ ceph <span class="token parameter variable">--user</span> xinceph-zcc <span class="token parameter variable">-s</span> 



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="yOaKY"></a></p>
<h2 id="通过-keyring-文件挂载-rbd" tabindex="-1"><a class="header-anchor" href="#通过-keyring-文件挂载-rbd" aria-hidden="true">#</a> 通过 keyring 文件挂载 rbd</h2>
<p>基于 ceph 提供的rbd 实现存储卷的动态提供，<strong>由两种实现方式，一是通过宿主机的 keyring文件挂载rbd</strong>，另外<strong>一个是通过将 keyring 中key 定义为 k8s中的 secret</strong>,然后 pod 通过secret 挂载 rbd。</p>
<p><a name="LNSLN"></a></p>
<h3 id="通过-keyring-文件直接挂载-busybox" tabindex="-1"><a class="header-anchor" href="#通过-keyring-文件直接挂载-busybox" aria-hidden="true">#</a> 通过 keyring 文件直接挂载-busybox</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token comment">#podyaml文件</span>
root@k8s<span class="token punctuation">-</span>master1<span class="token punctuation">:</span>/opt/ceph<span class="token punctuation">-</span>case<span class="token comment"># cat case1-busybox-keyring.yaml</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox 
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> sleep
      <span class="token punctuation">-</span> <span class="token string">"3600"</span>
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always 
    <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token comment">#restartPolicy: Always</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> rbd<span class="token punctuation">-</span>data1
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> rbd<span class="token punctuation">-</span>data1
      <span class="token key atrule">rbd</span><span class="token punctuation">:</span>
        <span class="token key atrule">monitors</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token string">'172.31.6.101:6789'</span>
        <span class="token punctuation">-</span> <span class="token string">'172.31.6.102:6789'</span>
        <span class="token punctuation">-</span> <span class="token string">'172.31.6.103:6789'</span>
        <span class="token key atrule">pool</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>rbd<span class="token punctuation">-</span>pool1
        <span class="token key atrule">image</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>img<span class="token punctuation">-</span>img1
        <span class="token key atrule">fsType</span><span class="token punctuation">:</span> ext4
        <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
        <span class="token key atrule">user</span><span class="token punctuation">:</span> xinceph<span class="token punctuation">-</span>zcc
        <span class="token key atrule">keyring</span><span class="token punctuation">:</span> /etc/ceph/ceph.client.xinceph<span class="token punctuation">-</span>zcc.keyring



<span class="token comment">#创建 pod</span>
root@k8s<span class="token punctuation">-</span>master1<span class="token punctuation">:</span>/opt/ceph<span class="token punctuation">-</span>case<span class="token comment"># kubectl apply -f case1-busybox-keyring.yamlpod/busybox created</span>
pod/busybox created
<span class="token comment">#到pod验证rbd是否挂载成功</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/1674889936820-b1e98d87-5f4b-4363-870d-770e69014658.png" alt="验证挂载" tabindex="0" loading="lazy"><figcaption>验证挂载</figcaption></figure>
<p><a name="M2LZb"></a></p>
<h2 id="通过secret-挂载rbd" tabindex="-1"><a class="header-anchor" href="#通过secret-挂载rbd" aria-hidden="true">#</a> 通过secret 挂载rbd</h2>
<p>将key定义为secret ，然后在挂载至pod，每个k8s node 就不用保存keyring文件了。</p>
<p><a name="W3DTh"></a></p>
<h3 id="创建secret" tabindex="-1"><a class="header-anchor" href="#创建secret" aria-hidden="true">#</a> 创建secret</h3>
<p>首先创建secret ，secret中主要就是包含ceph中被授权用户的keyring文件中的key,需要将key内容通过 base64编码后即可创建secret。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#将 key 进行编码</span>

ceph auth print-key client.xinceph-zcc
AQB4L79g/he7HBAAvJQ7sl3zdSsTUL21Nx6zLQ<span class="token operator">==</span>

ceph auth print-key client.xinceph-zcc <span class="token operator">|</span> base64
<span class="token assign-left variable">QVFDbm1HSmg2L0dCTGhBQWtXQlRUTmg2R1RHWGpreXFtdFo5RHc9PQo</span><span class="token operator">=</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ceph<span class="token punctuation">-</span>secret<span class="token punctuation">-</span>xinceph<span class="token punctuation">-</span>zcc
<span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">"kubernetes.io/rbd"</span>
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">key</span><span class="token punctuation">:</span> QVFDbm1HSmg2L0dCTGhBQWtXQlRUTmg2R1RHWGpreXFtdFo5RHc9PQo= 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#查看secret</span>
root@k8s-master1:~/ceph-case$ kubectl get secrets
NAME                     TYPE                                DATA          AGE
ceph-secret-xinceph-zcc  kubernetes.io/service-account-token <span class="token number">1</span>             3s

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span> <span class="token comment">#rs or deployment</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>

        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> rbd<span class="token punctuation">-</span>data1
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> rbd<span class="token punctuation">-</span>data1
          <span class="token key atrule">rbd</span><span class="token punctuation">:</span>
            <span class="token key atrule">monitors</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token string">'172.31.6.101:6789'</span>
            <span class="token punctuation">-</span> <span class="token string">'172.31.6.102:6789'</span>
            <span class="token punctuation">-</span> <span class="token string">'172.31.6.103:6789'</span>
            <span class="token key atrule">pool</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>rbd<span class="token punctuation">-</span>pool1
            <span class="token key atrule">image</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>img<span class="token punctuation">-</span>img1
            <span class="token key atrule">fsType</span><span class="token punctuation">:</span> ext4
            <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
            <span class="token key atrule">user</span><span class="token punctuation">:</span> xinceph<span class="token punctuation">-</span>zcc
            <span class="token key atrule">secretRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> ceph<span class="token punctuation">-</span>secret<span class="token punctuation">-</span>xinceph<span class="token punctuation">-</span>zcc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看pod挂载情况<br /><img src="http://cdn1.ryanxin.live/xxlog/1674891101243-0f2488ce-778a-4dda-87b4-90b3c1b1cf9a.png" alt="查看pod挂载情况" loading="lazy"></p>
<p><a name="ZFqiV"></a></p>
<h2 id="ceph-持久化存储" tabindex="-1"><a class="header-anchor" href="#ceph-持久化存储" aria-hidden="true">#</a> ceph 持久化存储</h2>
<p><strong>admin secret</strong> 用于k8s master 节点 连接到ceph 自动创建pv ，并关联pvc提供给pod 使用。<br />uer  secret 用于pod挂载。</p>
<figure><img src="http://cdn1.ryanxin.live/1674891447209-73e1dade-be4a-4a07-bbfe-f4c1ecb67858.png" alt="后端存储流程图" tabindex="0" loading="lazy"><figcaption>后端存储流程图</figcaption></figure>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ceph<span class="token punctuation">-</span>secret<span class="token punctuation">-</span>admin
<span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">"kubernetes.io/rbd"</span>
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">key</span><span class="token punctuation">:</span> QVFBM2RoZGhNZC9VQUJBQXIyU05wSitoY0sxZEQ1bDJIajVYTWc9PQo= 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="vsb0A"></a></p>
<h3 id="创建存储类" tabindex="-1"><a class="header-anchor" href="#创建存储类" aria-hidden="true">#</a> 创建存储类</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> storage.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StorageClass
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ceph<span class="token punctuation">-</span>storage<span class="token punctuation">-</span>class<span class="token punctuation">-</span>xin
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">storageclass.kubernetes.io/is-default-class</span><span class="token punctuation">:</span> <span class="token string">"true"</span> <span class="token comment">#设置为默认存储类</span>
<span class="token key atrule">provisioner</span><span class="token punctuation">:</span> kubernetes.io/rbd
<span class="token key atrule">parameters</span><span class="token punctuation">:</span>
  <span class="token key atrule">monitors</span><span class="token punctuation">:</span> 172.31.6.101<span class="token punctuation">:</span><span class="token number">6789</span><span class="token punctuation">,</span>172.31.6.102<span class="token punctuation">:</span><span class="token number">6789</span><span class="token punctuation">,</span>172.31.6.103<span class="token punctuation">:</span><span class="token number">6789</span>
  <span class="token key atrule">adminId</span><span class="token punctuation">:</span> admin
  <span class="token key atrule">adminSecretName</span><span class="token punctuation">:</span> ceph<span class="token punctuation">-</span>secret<span class="token punctuation">-</span>admin
  <span class="token key atrule">adminSecretNamespace</span><span class="token punctuation">:</span> default 
  <span class="token key atrule">pool</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>rbd<span class="token punctuation">-</span>pool1
  <span class="token key atrule">userId</span><span class="token punctuation">:</span> xinceph<span class="token punctuation">-</span>zcc
  <span class="token key atrule">userSecretName</span><span class="token punctuation">:</span> ceph<span class="token punctuation">-</span>secret<span class="token punctuation">-</span>xinceph<span class="token punctuation">-</span>zcc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="tDGmn"></a></p>
<h3 id="创建-secret" tabindex="-1"><a class="header-anchor" href="#创建-secret" aria-hidden="true">#</a> 创建 secret</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@k8s-master1:~/ceph-cease$ kubectl apply <span class="token parameter variable">-f</span> case3-secret-client-shijie.yaml
root@k8s-master1:~/ceph-cease$ kubectl apply <span class="token parameter variable">-f</span> case4-secret-client-admin.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="D1dNe"></a></p>
<h3 id="创建pvc" tabindex="-1"><a class="header-anchor" href="#创建pvc" aria-hidden="true">#</a> 创建pvc</h3>
<p>关联</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data<span class="token punctuation">-</span>pvc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> ceph<span class="token punctuation">-</span>storage<span class="token punctuation">-</span>class<span class="token punctuation">-</span>xin 
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> <span class="token string">'5Gi'</span>



<span class="token comment">#查看pvc</span>

root@k8s<span class="token punctuation">-</span>master1<span class="token punctuation">:</span>~/ceph<span class="token punctuation">-</span>cease$ kubectl get pvc 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Recreate
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span>5.6.46 
        <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token comment"># Use secret in real usage</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token number">123456</span>
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>persistent<span class="token punctuation">-</span>storage
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>persistent<span class="token punctuation">-</span>storage
        <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
          <span class="token key atrule">claimName</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data<span class="token punctuation">-</span>pvc 


<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>service<span class="token punctuation">-</span>label 
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>service
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">43306</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看ceph使用空间</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph <span class="token function">df</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="cym4r"></a></p>
<h2 id="cephfs" tabindex="-1"><a class="header-anchor" href="#cephfs" aria-hidden="true">#</a> cephFs</h2>
<p>实现多主机的挂载共享数据</p>
<p><a name="KvfKl"></a></p>
<h3 id="配置cephfs" tabindex="-1"><a class="header-anchor" href="#配置cephfs" aria-hidden="true">#</a> 配置cephfs</h3>
<p>步骤如下：<br /><a href="https://www.yuque.com/ryanxx/ga3673/bz0645hbae3emovp" target="_blank" rel="noopener noreferrer">https://www.yuque.com/ryanxx/ga3673/bz0645hbae3emovp<ExternalLinkIcon/></a></p>
<p><a name="n6eJq"></a></p>
<h3 id="创建nginx-pod同时挂载cephfs" tabindex="-1"><a class="header-anchor" href="#创建nginx-pod同时挂载cephfs" aria-hidden="true">#</a> 创建nginx pod同时挂载cephfs</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span> <span class="token comment">#rs or deployment</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>

        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xinceph<span class="token punctuation">-</span>staticdata<span class="token punctuation">-</span>cephfs 
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/share/nginx/html/ 
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xinceph<span class="token punctuation">-</span>staticdata<span class="token punctuation">-</span>cephfs
          <span class="token key atrule">cephfs</span><span class="token punctuation">:</span>
            <span class="token key atrule">monitors</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token string">'172.31.6.101:6789'</span>
            <span class="token punctuation">-</span> <span class="token string">'172.31.6.102:6789'</span>
            <span class="token punctuation">-</span> <span class="token string">'172.31.6.103:6789'</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /
            <span class="token key atrule">user</span><span class="token punctuation">:</span> admin
            <span class="token key atrule">secretRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> ceph<span class="token punctuation">-</span>secret<span class="token punctuation">-</span>admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


