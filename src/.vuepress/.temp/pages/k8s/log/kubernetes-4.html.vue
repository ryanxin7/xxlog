<template><div><figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1673335368520-3d26b509-0ef8-42a6-8744-fcce0df96dee.png#averageHue=%23f7f7f7&amp;clientId=ufb618a72-0a24-4&amp;from=paste&amp;height=565&amp;id=u1cf7316b&amp;name=image.png&amp;originHeight=565&amp;originWidth=790&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=116754&amp;status=done&amp;style=none&amp;taskId=u33b5d0cd-dc79-488f-b704-6252b946830&amp;title=&amp;width=790" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p><a name="jzmM9"></a></p>
<h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1673335468699-d16c69d0-45ec-4c1e-8088-800238d2db49.png#averageHue=%23cbdaed&amp;clientId=ufb618a72-0a24-4&amp;from=paste&amp;height=758&amp;id=ua1a5f31b&amp;name=image.png&amp;originHeight=758&amp;originWidth=1357&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=172007&amp;status=done&amp;style=none&amp;taskId=ue891c13e-5d94-45f8-b2e6-d9a3304cd31&amp;title=&amp;width=1357" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p><a name="MKdje"></a></p>
<h2 id="k8s的几个重要概念" tabindex="-1"><a class="header-anchor" href="#k8s的几个重要概念" aria-hidden="true">#</a> K8S的几个重要概念</h2>
<p>1.用什么和k8s打交道？  通过k8s声明式API 调用K8S资源对象。<br />2.怎么打交道？  通过写yaml文件调用声明式API。<br />3.怎么声明？  yaml中必需的字段：</p>
<ul>
<li>apiVersion - 创建该对象所使用的Kubernetes API的版本</li>
<li>kind- 想要创建的对象的类型</li>
<li>metadata- 帮助识别对象唯一性的数据， 包括一个name名称、可选的namespace</li>
<li>spec 期望状态</li>
<li>status (Pod创建完成后k8s自动生成status状态)</li>
</ul>
<p><strong>spec和status的区别:</strong><br />spec是期望状态<br />status是实际状态</p>
<p><a name="Sl2Mt"></a></p>
<h3 id="pod-概述" tabindex="-1"><a class="header-anchor" href="#pod-概述" aria-hidden="true">#</a> Pod 概述</h3>
<ol>
<li>pod是k8s中的最小单元。</li>
<li>一个pod中可以运行一个容器， 也可以运行多个容器。</li>
<li>运行多个容器的话，这些容器是一起被调度的。</li>
<li>Pod的生命周期是短暂的， 不会自愈， 是用完就销毁的实体。</li>
<li>一般我们是通过Controller来创建和管理pod的。</li>
</ol>
<p><a name="aUTxs"></a></p>
<h4 id="pod生命周期" tabindex="-1"><a class="header-anchor" href="#pod生命周期" aria-hidden="true">#</a> Pod生命周期</h4>
<p>初始化容器、启动前操作、就绪探针、存活探针、删除pod操作<br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1673336189572-84786ce3-c99e-464f-aafa-b05287a15d02.png#averageHue=%23f4f4f4&amp;clientId=ufb618a72-0a24-4&amp;from=paste&amp;height=455&amp;id=udaded401&amp;name=image.png&amp;originHeight=455&amp;originWidth=808&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=76231&amp;status=done&amp;style=none&amp;taskId=u14a0c6f6-f593-4e48-bdec-c28affdfbd1&amp;title=&amp;width=808" alt="image.png" loading="lazy"></p>
<p><a name="YWK1X"></a></p>
<h4 id="livenessprobe和readinessprobe-探针" tabindex="-1"><a class="header-anchor" href="#livenessprobe和readinessprobe-探针" aria-hidden="true">#</a> livenessProbe和readinessProbe 探针</h4>
<ul>
<li><strong>livenessProbe</strong>：存活探针，检测应用发生故障时使用，不能提供服务、超时等检测失败重启pod</li>
<li><strong>readinessProbe</strong>：就绪探针，检测pod启动之后应用是否就绪，是否可以提供服务，检测成功，pod才开始接收流量。</li>
</ul>
<p><a name="d3P2G"></a></p>
<h4 id="controller-控制器" tabindex="-1"><a class="header-anchor" href="#controller-控制器" aria-hidden="true">#</a> Controller 控制器</h4>
<p><strong>Replication Controller</strong>   第一代pod副本控制器<br />**ReplicaSet  ** 第二代pod副本控制器<br /><strong>Deployment</strong>    第三代pod控制器</p>
<p><a name="N8PFX"></a></p>
<h4 id="rc-rs-和deployment-区别" tabindex="-1"><a class="header-anchor" href="#rc-rs-和deployment-区别" aria-hidden="true">#</a> Rc,Rs 和Deployment 区别：</h4>
<p><strong>Replication Controller</strong>：副本控制器（selector = !=）<br /><a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/replicationcontroller/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/replicationcontroller/<ExternalLinkIcon/></a><br />• <a href="https://kubernetes.io/zh/docs/concepts/overview/working-with-objects/labels/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh/docs/concepts/overview/working-with-objects/labels/<ExternalLinkIcon/></a></p>
<p><strong>ReplicaSet</strong>：副本控制集，和副本控制器的区别是：对选择器的支持（selector 还支持in notin）<br />• <a href="https://kubernetes.io/zh/docs/concepts/workloads/controllers/replicaset/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh/docs/concepts/workloads/controllers/replicaset/<ExternalLinkIcon/></a></p>
<p><strong>Deployment</strong>：比rs更高一级的控制器，除了有rs的功能之外，还有很多高级功能,，比如说最重要的：滚动升级、回滚等<br />• <a href="https://kubernetes.io/zh/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh/docs/concepts/workloads/controllers/deployment/<ExternalLinkIcon/></a></p>
<p><strong>以下是 Deployments 的典型用例：</strong></p>
<p>:::tips
<a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#creating-a-deployment" target="_blank" rel="noopener noreferrer">创建 Deployment 以将 ReplicaSet 上线<ExternalLinkIcon/></a>。ReplicaSet 在后台创建 Pod。 检查 ReplicaSet 的上线状态，查看其是否成功。</p>
<ol>
<li>
<p>通过更新 Deployment 的 PodTemplateSpec，<a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#updating-a-deployment" target="_blank" rel="noopener noreferrer">声明 Pod 的新状态<ExternalLinkIcon/></a> 。 新的 ReplicaSet 会被创建，Deployment 以受控速率将 Pod 从旧 ReplicaSet 迁移到新 ReplicaSet。 每个新的 ReplicaSet 都会更新 Deployment 的修订版本。</p>
</li>
<li>
<p>如果 Deployment 的当前状态不稳定，<a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment" target="_blank" rel="noopener noreferrer">回滚到较早的 Deployment 版本<ExternalLinkIcon/></a>。 每次回滚都会更新 Deployment 的修订版本。</p>
</li>
<li>
<p><a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#scaling-a-deployment" target="_blank" rel="noopener noreferrer">扩大 Deployment 规模以承担更多负载<ExternalLinkIcon/></a>。</p>
</li>
<li>
<p><a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#pausing-and-resuming-a-deployment" target="_blank" rel="noopener noreferrer">暂停 Deployment 的上线<ExternalLinkIcon/></a> 以应用对 PodTemplateSpec 所作的多项修改， 然后恢复其执行以启动新的上线版本。</p>
</li>
<li>
<p><a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#deployment-status" target="_blank" rel="noopener noreferrer">使用 Deployment 状态<ExternalLinkIcon/></a>来判定上线过程是否出现停滞。</p>
</li>
<li>
<p><a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#clean-up-policy" target="_blank" rel="noopener noreferrer">清理较旧的不再需要的 ReplicaSet<ExternalLinkIcon/></a> 。
:::</p>
</li>
</ol>
<p><a name="K5fxk"></a></p>
<h3 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> Service</h3>
<p>pod重启后ip地址就变了，如何保证pod间访问不受影响？</p>
<p>通过声明一个service对象，服务和应用进行解耦。</p>
<p><strong>一般常用的有两种：</strong></p>
<ol>
<li>k8s集群内的service：selector指定pod，自动创建Endpoints</li>
<li>k8s集群外的service：手动创建Endpoints，指定外部服务的ip，端口和协议</li>
</ol>
<p><a name="JreXo"></a></p>
<h4 id="kube-proxy和service的关系" tabindex="-1"><a class="header-anchor" href="#kube-proxy和service的关系" aria-hidden="true">#</a> kube-proxy和service的关系</h4>
<p>kube-proxy 监听着<strong>k8s-apiserver</strong>，一旦service资源发生变化（调用k8s-api修改service信息），kube-proxy就会生成对应的负载调度的调整，这样就保证service的最新状态。</p>
<p><strong>kube-proxy有三种调度模型：</strong></p>
<ul>
<li><strong>userspace</strong>：k8s1.1之前</li>
<li><strong>iptables</strong>：1.2-k8s1.11之前</li>
<li><strong>ipvs</strong>：k8s 1.11之后，如果没有开启ipvs，则自动降级为iptables</li>
</ul>
<p><a name="svKrO"></a></p>
<h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h3>
<p><a name="KgaaS"></a></p>
<h3 id="volume" tabindex="-1"><a class="header-anchor" href="#volume" aria-hidden="true">#</a> Volume</h3>
<p>k8s 抽象出的一个对象，用来保存数据，解耦数据和镜像（数据存镜像里面每次更新镜像会特别大），实现容器间数据共享。</p>
<p><strong>常用的几种卷：</strong></p>
<ul>
<li><strong>emptyDir</strong>：本地临时卷</li>
<li><strong>hostPath</strong>：本地卷</li>
<li><strong>nfs</strong>等：共享卷</li>
<li><strong>configmap</strong>: 配置文件</li>
</ul>
<p><a href="https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/<ExternalLinkIcon/></a></p>
<p><a name="yxkwB"></a></p>
<h4 id="emptydir" tabindex="-1"><a class="header-anchor" href="#emptydir" aria-hidden="true">#</a> emptyDir</h4>
<p>当 Pod 被分配给节点时，首先创建 emptyDir 卷，并且只要该Pod 在该节点上运行，该卷就会存在。正如卷的名字所述，它最初是空的。<br />Pod 中的容器可以读取和写入 emptyDir 卷中的相同文件，尽管该卷可以挂载到每个容器中的相同或不同路径上。<br />当出于任何原因从节点中删除 Pod 时，emptyDir 中的数据将被永久删除。</p>
<p><a name="oa5jV"></a></p>
<h4 id="hostpath" tabindex="-1"><a class="header-anchor" href="#hostpath" aria-hidden="true">#</a> hostPath</h4>
<p>hostPath 卷将主机节点的文件系统中的文件或目录挂载到集群中，pod删除的时候，卷不会被删除，但是pod可能调度到不同的node 数据会出现丢失。</p>
<p><a name="G3hMk"></a></p>
<h4 id="nfs等共享存储" tabindex="-1"><a class="header-anchor" href="#nfs等共享存储" aria-hidden="true">#</a> nfs等共享存储</h4>
<p>nfs 卷允许将现有的 NFS（网络文件系统）共享挂载到您的容器中。<br />不像 emptyDir，当删除 Pod 时，nfs 卷的内容被保留，卷仅仅是被卸载。<br />这意味着 NFS 卷可以预填充数据，并且可以在 pod 之间“切换”数据。 NFS可以被多个写入者同时挂载。</p>
<p><a name="AENtM"></a></p>
<h5 id="创建多个pod测试挂载同一个nfs" tabindex="-1"><a class="header-anchor" href="#创建多个pod测试挂载同一个nfs" aria-hidden="true">#</a> 创建多个pod测试挂载同一个NFS</h5>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
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
        <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/share/nginx/html/mysite
          <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>volume
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>volume
        <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
          <span class="token key atrule">server</span><span class="token punctuation">:</span> 172.31.7.109
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/magedu/n56
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">81</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30016</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="huf2m"></a></p>
<h5 id="创建多个pod测试每个pod挂载多个nfs" tabindex="-1"><a class="header-anchor" href="#创建多个pod测试每个pod挂载多个nfs" aria-hidden="true">#</a> 创建多个pod测试每个pod挂载多个NFS</h5>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
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
        <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/share/nginx/html/mysite
          <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>volume
        <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/share/nginx/html/js
          <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>js
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>volume
        <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
          <span class="token key atrule">server</span><span class="token punctuation">:</span> 172.31.7.109
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/magedu/n56
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>js
        <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
          <span class="token key atrule">server</span><span class="token punctuation">:</span> 172.31.7.109
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/magedu/js
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">81</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30016</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重点：</p>
<p>service 访问流程：</p>
<p>k8s内部服务对外发布一般有两种方式，nodeport和ingress ，如果使用nodeport方式就会在每台node节点都会监听一个端口通常是30000以上，nodeport为什么不直接转发给pod ？ 因为维护nodeport和pod绑定关系比较难，通过需要service进行转发，service相当于k8s内部的负载均衡器负责转发，基于label标签匹配和筛选那些具有标签的pod。 默认使用轮询调度方式</p>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1673402165869-231b571d-0e9f-46fa-bb0c-8931d2a1cc9d.png#averageHue=%234e4e4e&amp;clientId=uf0c85d93-f28c-4&amp;from=paste&amp;height=1023&amp;id=u0b5911b0&amp;name=image.png&amp;originHeight=1023&amp;originWidth=1817&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=109692&amp;status=done&amp;style=none&amp;taskId=uceaa7be8-ff08-4601-8f06-302ad47e08c&amp;title=&amp;width=1817" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p><a name="qoJQC"></a></p>
<h3 id="configmap" tabindex="-1"><a class="header-anchor" href="#configmap" aria-hidden="true">#</a> configmap</h3>
<p><strong>功能</strong>：将配置信息和镜像解耦<br />将配置信息放到<strong>configmap</strong>对象中，然后在pod的对象中导入configmap对象，实现导入配置文件的操作。<br />yaml声明一个ConfigMap的对象，作为Volume挂载到pod中</p>
<p><a name="Ct99F"></a></p>
<h4 id="使用-configmap-挂载nginx-配置文件" tabindex="-1"><a class="header-anchor" href="#使用-configmap-挂载nginx-配置文件" aria-hidden="true">#</a> 使用 Configmap 挂载nginx 配置文件</h4>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>config
<span class="token key atrule">data</span><span class="token punctuation">:</span>
 <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    server {
       listen       80;
       server_name  www.mysite.com;
       index        index.html;</span>

       location / <span class="token punctuation">{</span>
           root /data/nginx/html;
           if (<span class="token tag">!-e</span> $request_filename) <span class="token punctuation">{</span>
               rewrite ^/(.<span class="token important">*)</span> /index.html last;
           <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">---</span>
<span class="token comment">#apiVersion: extensions/v1beta1</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
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
        <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data/nginx/html
          <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>static<span class="token punctuation">-</span>dir
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>config
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span>  /etc/nginx/conf.d
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>static<span class="token punctuation">-</span>dir
        <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/nginx/linux39
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>config
        <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>config
          <span class="token key atrule">items</span><span class="token punctuation">:</span>
             <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> default
               <span class="token key atrule">path</span><span class="token punctuation">:</span> mysite.conf

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">81</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30019</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="fiv8m"></a></p>
<h4 id="使用-configmap-挂载环境变量到pod" tabindex="-1"><a class="header-anchor" href="#使用-configmap-挂载环境变量到pod" aria-hidden="true">#</a> 使用 Configmap 挂载环境变量到pod</h4>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>config
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">username</span><span class="token punctuation">:</span> user1


<span class="token punctuation">---</span>
<span class="token comment">#apiVersion: extensions/v1beta1</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx 
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MY_PASSWD
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"123123"</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MY_USERNAME
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>config
              <span class="token key atrule">key</span><span class="token punctuation">:</span> username
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="B0vUf"></a></p>
<h3 id="statefulset" tabindex="-1"><a class="header-anchor" href="#statefulset" aria-hidden="true">#</a> Statefulset</h3>
<p><strong>功能</strong>： 为了解决有状态服务的问题  <br />无状态服务（有主从关系、集群部署 ）</p>
<p>它所管理的Pod拥有固定的Pod名称，主机名，启停顺序  <br />和 <a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noopener noreferrer">Deployment<ExternalLinkIcon/></a> 类似， StatefulSet 管理基于相同容器规约的一组 Pod。但和 Deployment 不同的是， StatefulSet 为它们的每个 Pod 维护了一个有粘性的 ID。这些 Pod 是基于相同的规约来创建的， 但是不能相互替换：无论怎么调度，每个 Pod 都有一个永久不变的 ID。</p>
<p><a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/statefulset/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/statefulset/<ExternalLinkIcon/></a></p>
<p><a name="L5ZXz"></a></p>
<h3 id="daemonset" tabindex="-1"><a class="header-anchor" href="#daemonset" aria-hidden="true">#</a> DaemonSet</h3>
<p><a name="ufnck"></a></p>
<h3 id="pv-pvc" tabindex="-1"><a class="header-anchor" href="#pv-pvc" aria-hidden="true">#</a> PV/PVC</h3>
<p>对存储抽象 不直接存储数据而是在k8s层面做了一个隔离，权限控制、业务隔离，把不同是pod数据分开</p>
<p>用nfs挂载 那么每个pod都能看到相同数据，如何做数据隔离？</p>
<p>在存储和k8s直接封装一层 PV/PVC</p>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1673413439244-b1ef9fc6-ac17-42c4-8bbd-92d13d4a6504.png#averageHue=%23c65f18&amp;clientId=uf0c85d93-f28c-4&amp;from=paste&amp;height=955&amp;id=QQ7uZ&amp;name=image.png&amp;originHeight=955&amp;originWidth=1556&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=24793&amp;status=done&amp;style=none&amp;taskId=ua57fb876-778b-408f-83fa-f4115cf01da&amp;title=&amp;width=1556" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p><strong>PV是对底层⽹络存储的抽象，即将⽹络存储定义为⼀种存储资源</strong>，将⼀个整体的存储资源拆分成多份后给不同的业务使用。   PV是由管理员添加的的⼀个存储的描述，是⼀个全局资源即<strong>不⾪属于任何namespace</strong>，包含存储的类型，存储的⼤⼩和访问模式等，它的⽣命周期独⽴于Pod，例如当使⽤它的Pod销毁时对PV没有影响。</p>
<p>**PersistentVolumeClaim（PVC）**是⽤户存储的请求，它类似于pod，Pod消耗节点资源，PVC消耗存储资源， 就像 pod可以请求特定级别的资源（CPU和内存），PVC是namespace中的资源，可以设置特定的空间大小和访问模式。   pod是通过PVC将数据保存⾄PV，PV在保存⾄存储。  <br /> <br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1673420707945-cbb3d3e9-e20f-4a43-9e5d-57aeef5dfc16.png#averageHue=%23f9f9f9&amp;clientId=uf0c85d93-f28c-4&amp;from=paste&amp;height=420&amp;id=uf4ad35b7&amp;name=image.png&amp;originHeight=304&amp;originWidth=520&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=79453&amp;status=done&amp;style=none&amp;taskId=ua3ab26e0-30ab-41f7-a08f-5bc25b4a496&amp;title=&amp;width=718" alt="image.png" loading="lazy"></p>
<p><a name="IemzW"></a></p>
<h4 id="persistentvolume参数" tabindex="-1"><a class="header-anchor" href="#persistentvolume参数" aria-hidden="true">#</a> PersistentVolume参数：</h4>
<p><a name="KH2id"></a></p>
<h5 id="访问模式-accessmodes" tabindex="-1"><a class="header-anchor" href="#访问模式-accessmodes" aria-hidden="true">#</a> 访问模式 accessModes</h5>
<p>PersistentVolume 卷可以用资源提供者所支持的任何方式挂载到宿主系统上。 如下表所示，提供者（驱动）的能力不同，每个 PV 卷的访问模式都会设置为对应卷所支持的模式值。<br /> 例如，NFS 可以支持多个读写客户，但是某个特定的 NFS PV 卷可能在服务器上以只读的方式导出。<br /> 每个 PV 卷都会获得自身的访问模式集合，描述的是特定 PV 卷的能力。</p>
<p><strong>访问模式有：</strong><br /><strong>ReadWriteOnce</strong><br />卷可以被一个节点以读写方式挂载。 ReadWriteOnce 访问模式也允许运行在同一节点上的多个 Pod 访问卷。<br /><strong>ReadOnlyMany</strong><br />卷可以被多个节点以只读方式挂载。<br /><strong>ReadWriteMany</strong><br />卷可以被多个节点以读写方式挂载。<br /><strong>ReadWriteOncePod</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># kubectl explain PersistentVolume</span>
Capacity： <span class="token comment">#当前PV空间⼤⼩，kubectl explain PersistentVolume.spec.capacity</span>
accessModes ：访问模式，<span class="token comment">#kubectl explain PersistentVolume.spec.accessModes</span>
ReadWriteOnce – PV只能被单个节点以读写权限挂载，RWO
ReadOnlyMany – PV以可以被多个节点挂载但是权限是只读的,ROX
ReadWriteMany – PV可以被多个节点是读写⽅式挂载使⽤,RWX
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#access-modes" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#access-modes<ExternalLinkIcon/></a></p>
<p><strong>官⽅提供的基于各后端存储创建的PV⽀持的访问模式</strong></p>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1673421868807-b85faeed-f417-408f-8c0b-92bb351f28e4.png#averageHue=%23f7f7f7&amp;clientId=uf0c85d93-f28c-4&amp;from=paste&amp;height=750&amp;id=uc3d3994e&amp;name=image.png&amp;originHeight=750&amp;originWidth=847&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=40251&amp;status=done&amp;style=none&amp;taskId=u888db419-039f-4563-9c83-3bf9e5bc469&amp;title=&amp;width=847" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p><a name="hymYN"></a></p>
<h5 id="回收机制-persistentvolumereclaimpolicy" tabindex="-1"><a class="header-anchor" href="#回收机制-persistentvolumereclaimpolicy" aria-hidden="true">#</a> 回收机制 persistentVolumeReclaimPolicy</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>persistentVolumeReclaimPolicy <span class="token comment">#删除机制即删除存储卷卷时候，已经创建好的存储卷由以下删除操作：</span>

<span class="token comment">#kubectl explain PersistentVolume.spec.persistentVolumeReclaimPolicy</span>
 Retain – 删除PV后保持原装，最后需要管理员⼿动删除
 Recycle – 空间回收，及删除存储卷上的所有数据<span class="token punctuation">(</span>包括⽬录和隐藏⽂件<span class="token punctuation">)</span>,⽬前仅⽀持NFS和hostPath
 Delete – ⾃动删除存储卷


mountOptions <span class="token comment">#附加的挂载选项列表，实现更精细的权限控制</span>
 ro <span class="token comment">#等</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#reclaim-policy" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#reclaim-policy<ExternalLinkIcon/></a>
<a name="n5UOP"></a></p>
<h5 id="卷模式" tabindex="-1"><a class="header-anchor" href="#卷模式" aria-hidden="true">#</a> 卷模式</h5>
<p>针对 PV 持久卷，Kubernetes 支持两种卷模式（volumeModes）：Filesystem（文件系统） 和 Block（块）。 volumeMode 是一个可选的 API 参数。 如果该参数被省略，默认的卷模式是 Filesystem。<br />volumeMode 属性设置为 Filesystem 的卷会被 Pod <strong>挂载（Mount）</strong> 到某个目录。 如果卷的存储来自某块设备而该设备目前为空，Kuberneretes 会在第一次挂载卷之前在设备上创建文件系统。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>volumeMode <span class="token comment">#卷类型</span>
kubectl explain PersistentVolume.spec.volumeMode
定义存储卷使⽤的⽂件系统是块设备还是⽂件系统，默认为⽂件系统
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#volume-mode" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#volume-mode<ExternalLinkIcon/></a></p>
<p><a name="TOaVN"></a></p>
<h5 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a> </h5>
<p><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1673421245380-7d31902c-15fe-438e-bbb0-903154cceac9.png#averageHue=%23f8f7f7&amp;clientId=uf0c85d93-f28c-4&amp;from=paste&amp;height=761&amp;id=u42b86aef&amp;name=image.png&amp;originHeight=761&amp;originWidth=857&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=40460&amp;status=done&amp;style=none&amp;taskId=u3a65b06b-609a-4ed1-a854-28d3c0163e3&amp;title=&amp;width=857" alt="image.png" loading="lazy">
<a name="IRoju"></a></p>
<h4 id="persistentvolumeclaim-参数" tabindex="-1"><a class="header-anchor" href="#persistentvolumeclaim-参数" aria-hidden="true">#</a> PersistentVolumeClaim 参数</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#kubectl explain PersistentVolumeClaim</span>

accessModes ：PVC 访问模式，<span class="token comment">#kubectl explain PersistentVolumeClaim.spec.volumeMode</span>
ReadWriteOnce – PVC只能被单个节点以读写权限挂载，RWO
ReadOnlyMany – PVC以可以被多个节点挂载但是权限是只读的,ROX
ReadWriteMany – PVC可以被多个节点是读写⽅式挂载使⽤,RWX

resources： <span class="token comment">#定义PVC创建存储卷的空间⼤⼩</span>
selector： <span class="token comment">#标签选择器，选择要绑定的PV</span>

 matchLabels <span class="token comment">#匹配标签名称</span>
 matchExpressions <span class="token comment">#基于正则表达式匹配</span>

volumeName <span class="token comment">#要绑定的PV名称</span>

volumeMode <span class="token comment">#卷类型</span>
定义PVC使⽤的⽂件系统是块设备还是⽂件系统，默认为⽂件系统
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="y3crT"></a></p>
<h4 id="pv及pvc实战案例之zookeeper集群" tabindex="-1"><a class="header-anchor" href="#pv及pvc实战案例之zookeeper集群" aria-hidden="true">#</a> PV及PVC实战案例之zookeeper集群</h4>
<p>基于PV和PVC作为后端存储，实现zookeeper集群</p>
<p><a name="yoVLV"></a></p>
<h5 id="_1-下载jdk-镜像" tabindex="-1"><a class="header-anchor" href="#_1-下载jdk-镜像" aria-hidden="true">#</a> 1.下载JDK 镜像<br /><br /></h5>
<p><a href="https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html#license-lightbox" target="_blank" rel="noopener noreferrer">https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html#license-lightbox<ExternalLinkIcon/></a></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull elevy/slim_java:8
<span class="token function">docker</span> tag elevy/slim_java:8 harbor.ceamg.com/baseimages/slim_java:8
<span class="token function">docker</span> push harbor.ceamg.com/baseimages/slim_java:8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="IPZyn"></a></p>
<h5 id="_2-构建zookeeper-镜像" tabindex="-1"><a class="header-anchor" href="#_2-构建zookeeper-镜像" aria-hidden="true">#</a> 2.构建zookeeper 镜像</h5>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1673486581523-20c135bc-2fde-45aa-bc2b-c3fb840e5e15.png#averageHue=%23f6f3f0&amp;clientId=u0160c45a-58dc-4&amp;from=paste&amp;height=267&amp;id=u903794cf&amp;name=image.png&amp;originHeight=267&amp;originWidth=613&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=25415&amp;status=done&amp;style=none&amp;taskId=uf0dd8e2a-7cc9-40b3-aa1c-05ff50e5396&amp;title=&amp;width=613" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> a+x *.sh
<span class="token function">chmod</span> a+x bin/*.sh
<span class="token function">bash</span> build-command.sh  <span class="token function">bash</span> build-command.sh <span class="token number">2022</span>-1-12_9_16_32
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#FROM harbor-linux38.local.com/linux38/slim_java:8 </span>
FROM harbor.ceamg.com/baseimages/slim_java:8

ENV ZK_VERSION <span class="token number">3.4</span>.14
ADD repositories /etc/apk/repositories 
<span class="token comment"># Download Zookeeper</span>
COPY zookeeper-3.4.14.tar.gz /tmp/zk.tgz
COPY zookeeper-3.4.14.tar.gz.asc /tmp/zk.tgz.asc
COPY KEYS /tmp/KEYS
RUN apk <span class="token function">add</span> --no-cache <span class="token parameter variable">--virtual</span> .build-deps <span class="token punctuation">\</span>
      ca-certificates   <span class="token punctuation">\</span>
      gnupg             <span class="token punctuation">\</span>
      <span class="token function">tar</span>               <span class="token punctuation">\</span>
      <span class="token function">wget</span> <span class="token operator">&amp;&amp;</span>           <span class="token punctuation">\</span>
    <span class="token comment">#</span>
    <span class="token comment"># Install dependencies</span>
    apk <span class="token function">add</span> --no-cache  <span class="token punctuation">\</span>
      <span class="token function">bash</span> <span class="token operator">&amp;&amp;</span>           <span class="token punctuation">\</span>
    <span class="token comment">#</span>
    <span class="token comment">#</span>
    <span class="token comment"># Verify the signature</span>
    <span class="token builtin class-name">export</span> <span class="token assign-left variable">GNUPGHOME</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span>mktemp <span class="token parameter variable">-d</span><span class="token variable">)</span></span>"</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
    gpg <span class="token parameter variable">-q</span> <span class="token parameter variable">--batch</span> <span class="token parameter variable">--import</span> /tmp/KEYS <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
    gpg <span class="token parameter variable">-q</span> <span class="token parameter variable">--batch</span> --no-auto-key-retrieve <span class="token parameter variable">--verify</span> /tmp/zk.tgz.asc /tmp/zk.tgz <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
    <span class="token comment">#</span>
    <span class="token comment"># Set up directories</span>
    <span class="token comment">#</span>
    <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /zookeeper/data /zookeeper/wal /zookeeper/log <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
    <span class="token comment">#</span>
    <span class="token comment"># Install</span>
    <span class="token function">tar</span> <span class="token parameter variable">-x</span> <span class="token parameter variable">-C</span> /zookeeper --strip-components<span class="token operator">=</span><span class="token number">1</span> --no-same-owner <span class="token parameter variable">-f</span> /tmp/zk.tgz <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
    <span class="token comment">#</span>
    <span class="token comment"># Slim down</span>
    <span class="token builtin class-name">cd</span> /zookeeper <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
    <span class="token function">cp</span> dist-maven/zookeeper-<span class="token variable">${ZK_VERSION}</span>.jar <span class="token builtin class-name">.</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
    <span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token punctuation">\</span>
      *.txt <span class="token punctuation">\</span>
      *.xml <span class="token punctuation">\</span>
      bin/README.txt <span class="token punctuation">\</span>
      bin/*.cmd <span class="token punctuation">\</span>
      conf/* <span class="token punctuation">\</span>
      contrib <span class="token punctuation">\</span>
      dist-maven <span class="token punctuation">\</span>
      docs <span class="token punctuation">\</span>
      lib/*.txt <span class="token punctuation">\</span>
      lib/cobertura <span class="token punctuation">\</span>
      lib/jdiff <span class="token punctuation">\</span>
      recipes <span class="token punctuation">\</span>
      src <span class="token punctuation">\</span>
      zookeeper-*.asc <span class="token punctuation">\</span>
      zookeeper-*.md5 <span class="token punctuation">\</span>
      zookeeper-*.sha1 <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
    <span class="token comment">#</span>
    <span class="token comment"># Clean up</span>
    apk del .build-deps <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
    <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /tmp/* <span class="token string">"<span class="token variable">$GNUPGHOME</span>"</span>

COPY conf /zookeeper/conf/
COPY bin/zkReady.sh /zookeeper/bin/
COPY entrypoint.sh /

ENV <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/zookeeper/bin:<span class="token variable">${<span class="token environment constant">PATH</span>}</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">ZOO_LOG_DIR</span><span class="token operator">=</span>/zookeeper/log <span class="token punctuation">\</span>
    <span class="token assign-left variable">ZOO_LOG4J_PROP</span><span class="token operator">=</span><span class="token string">"INFO, CONSOLE, ROLLINGFILE"</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">JMXPORT</span><span class="token operator">=</span><span class="token number">9010</span>

ENTRYPOINT <span class="token punctuation">[</span> <span class="token string">"/entrypoint.sh"</span> <span class="token punctuation">]</span>

CMD <span class="token punctuation">[</span> <span class="token string">"zkServer.sh"</span>, <span class="token string">"start-foreground"</span> <span class="token punctuation">]</span>

EXPOSE <span class="token number">2181</span> <span class="token number">2888</span> <span class="token number">3888</span> <span class="token number">9010</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token builtin class-name">echo</span> <span class="token variable">${MYID<span class="token operator">:-</span>1}</span> <span class="token operator">></span> /zookeeper/data/myid

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">$SERVERS</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
	<span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span><span class="token punctuation">\</span>, <span class="token builtin class-name">read</span> <span class="token parameter variable">-a</span> servers <span class="token operator">&lt;&lt;&lt;</span><span class="token string">"<span class="token variable">$SERVERS</span>"</span>
	<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token string">"<span class="token variable">${<span class="token operator">!</span>servers<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>"</span><span class="token punctuation">;</span> <span class="token keyword">do</span> 
		<span class="token builtin class-name">printf</span> <span class="token string">"<span class="token entity" title="\n">\n</span>server.%i=%s:2888:3888"</span> <span class="token string">"<span class="token variable"><span class="token variable">$((</span><span class="token number">1</span> <span class="token operator">+</span> $i<span class="token variable">))</span></span>"</span> <span class="token string">"<span class="token variable">${servers<span class="token punctuation">[</span>$i<span class="token punctuation">]</span>}</span>"</span> <span class="token operator">>></span> /zookeeper/conf/zoo.cfg
	<span class="token keyword">done</span>
<span class="token keyword">fi</span>

<span class="token builtin class-name">cd</span> /zookeeper
<span class="token builtin class-name">exec</span> <span class="token string">"<span class="token variable">$@</span>"</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>https://mirrors.tuna.tsinghua.edu.cn/alpine/v3.6/main/
https://mirrors.tuna.tsinghua.edu.cn/alpine/v3.6/community/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">TAG</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> harbor.ceamg.com/baseimages/zookeeper:<span class="token variable">${TAG}</span> <span class="token builtin class-name">.</span>
<span class="token function">sleep</span> <span class="token number">1</span>
<span class="token function">docker</span> push  harbor.ceamg.com/baseimages/zookeeper:<span class="token variable">${TAG}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="v45qt"></a></p>
<h5 id="测试镜像" tabindex="-1"><a class="header-anchor" href="#测试镜像" aria-hidden="true">#</a> 测试镜像</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@harbor01:~/zookeeper<span class="token comment"># docker run -it --rm -p 2181:2181 harbor.ceamg.com/baseimages/zookeeper:2023-1-12_10_58_34</span>
ZooKeeper JMX enabled by default
ZooKeeper remote JMX Port <span class="token builtin class-name">set</span> to <span class="token number">9010</span>
ZooKeeper remote JMX authenticate <span class="token builtin class-name">set</span> to <span class="token boolean">false</span>
ZooKeeper remote JMX ssl <span class="token builtin class-name">set</span> to <span class="token boolean">false</span>
ZooKeeper remote JMX log4j <span class="token builtin class-name">set</span> to <span class="token boolean">true</span>
Using config: /zookeeper/bin/<span class="token punctuation">..</span>/conf/zoo.cfg
<span class="token number">2023</span>-01-12 03:07:17,632 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - INFO  <span class="token punctuation">[</span>main:QuorumPeerConfig@136<span class="token punctuation">]</span> - Reading configuration from: /zookeeper/bin/<span class="token punctuation">..</span>/conf/zoo.cfg
<span class="token number">2023</span>-01-12 03:07:17,638 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - INFO  <span class="token punctuation">[</span>main:DatadirCleanupManager@78<span class="token punctuation">]</span> - autopurge.snapRetainCount <span class="token builtin class-name">set</span> to <span class="token number">3</span>
<span class="token number">2023</span>-01-12 03:07:17,638 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - INFO  <span class="token punctuation">[</span>main:DatadirCleanupManager@79<span class="token punctuation">]</span> - autopurge.purgeInterval <span class="token builtin class-name">set</span> to <span class="token number">1</span>
<span class="token number">2023</span>-01-12 03:07:17,640 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - WARN  <span class="token punctuation">[</span>main:QuorumPeerMain@116<span class="token punctuation">]</span> - Either no config or no quorum defined <span class="token keyword">in</span> config, running  <span class="token keyword">in</span> standalone mode
<span class="token number">2023</span>-01-12 03:07:17,640 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - INFO  <span class="token punctuation">[</span>PurgeTask:DatadirCleanupManager<span class="token variable">$PurgeTask</span>@138<span class="token punctuation">]</span> - Purge task started.
<span class="token number">2023</span>-01-12 03:07:17,641 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - INFO  <span class="token punctuation">[</span>main:QuorumPeerConfig@136<span class="token punctuation">]</span> - Reading configuration from: /zookeeper/bin/<span class="token punctuation">..</span>/conf/zoo.cfg
<span class="token number">2023</span>-01-12 03:07:17,642 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - INFO  <span class="token punctuation">[</span>main:ZooKeeperServerMain@98<span class="token punctuation">]</span> - Starting server
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
<span class="token number">2023</span>-01-12 03:07:17,654 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - INFO  <span class="token punctuation">[</span>PurgeTask:DatadirCleanupManager<span class="token variable">$PurgeTask</span>@144<span class="token punctuation">]</span> - Purge task completed.
<span class="token number">2023</span>-01-12 03:07:17,654 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - INFO  <span class="token punctuation">[</span>main:Environment@100<span class="token punctuation">]</span> - Server environment:user.dir<span class="token operator">=</span>/zookeeper
<span class="token number">2023</span>-01-12 03:07:17,657 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - INFO  <span class="token punctuation">[</span>main:ZooKeeperServer@836<span class="token punctuation">]</span> - tickTime <span class="token builtin class-name">set</span> to <span class="token number">2000</span>
<span class="token number">2023</span>-01-12 03:07:17,657 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - INFO  <span class="token punctuation">[</span>main:ZooKeeperServer@845<span class="token punctuation">]</span> - minSessionTimeout <span class="token builtin class-name">set</span> to <span class="token parameter variable">-1</span>
<span class="token number">2023</span>-01-12 03:07:17,658 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - INFO  <span class="token punctuation">[</span>main:ZooKeeperServer@854<span class="token punctuation">]</span> - maxSessionTimeout <span class="token builtin class-name">set</span> to <span class="token parameter variable">-1</span>
<span class="token number">2023</span>-01-12 03:07:17,666 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - INFO  <span class="token punctuation">[</span>main:ServerCnxnFactory@117<span class="token punctuation">]</span> - Using org.apache.zookeeper.server.NIOServerCnxnFactory as server connection factory
<span class="token number">2023</span>-01-12 03:07:17,671 <span class="token punctuation">[</span>myid:<span class="token punctuation">]</span> - INFO  <span class="token punctuation">[</span>main:NIOServerCnxnFactory@89<span class="token punctuation">]</span> - binding to port <span class="token number">0.0</span>.0.0/0.0.0.0:2181
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="ThYAY"></a></p>
<h5 id="k8s-运行zookeeper服务" tabindex="-1"><a class="header-anchor" href="#k8s-运行zookeeper服务" aria-hidden="true">#</a> k8s 运行zookeeper服务</h5>
<p><a name="nGOsI"></a></p>
<h5 id="通过yaml文件将zookeeper集群服务运行k8s环境" tabindex="-1"><a class="header-anchor" href="#通过yaml文件将zookeeper集群服务运行k8s环境" aria-hidden="true">#</a> 通过yaml⽂件将zookeeper集群服务运⾏k8s环境  <br /><br /></h5>
<p><a name="kiXtn"></a></p>
<h5 id="编写yaml文件" tabindex="-1"><a class="header-anchor" href="#编写yaml文件" aria-hidden="true">#</a> 编写yaml文件</h5>
<p><a name="W3Fzv"></a></p>
<h5 id="nfs服务" tabindex="-1"><a class="header-anchor" href="#nfs服务" aria-hidden="true">#</a> nfs服务</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/exports 
/data/k8s/xinzk *<span class="token punctuation">(</span>rw,sync,no_root_squash<span class="token punctuation">)</span>

root@harbor01:~<span class="token comment"># systemctl start nfs-kernel-server.service</span>


root@harbor01:~<span class="token comment"># showmount -e</span>
Export list <span class="token keyword">for</span> harbor01:
/data/k8s/xinzk *


root@master01:~<span class="token comment"># showmount -e 10.1.0.38</span>
Export list <span class="token keyword">for</span> <span class="token number">10.1</span>.0.38:
/data/k8s/xinzk *


测试挂载
root@master01:~<span class="token comment"># mount 10.1.0.38:/data/k8s/xinzk /mnt</span>


root@harbor01:/data/k8s/xinzk<span class="token comment"># mkdir zookeeper-datadir-1</span>
root@harbor01:/data/k8s/xinzk<span class="token comment"># mkdir zookeeper-datadir-2</span>
root@harbor01:/data/k8s/xinzk<span class="token comment"># mkdir zookeeper-datadir-3</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>/data/k8s/xinzk</code>：指示要共享的目录；“<code v-pre>/data/k8s/xinzk</code>”目录需要自己创建。</li>
<li><code v-pre>*</code>：代表允许所有的网络段访问。</li>
<li><code v-pre>rw</code>：指示具有可读写的权限。</li>
<li><code v-pre>sync</code>：指示资料同步写入内存和硬盘</li>
<li><code v-pre>no_root_squash</code>：是 Ubuntu nfs 客户端分享目录使用者的权限。</li>
<li>例如：如果客户端使用的是 root 用户，那么对于该共享目录而言，该客户端就具有 root 权限。</li>
</ul>
<p><a name="zLFdw"></a></p>
<h5 id="创建pv" tabindex="-1"><a class="header-anchor" href="#创建pv" aria-hidden="true">#</a> 创建pv</h5>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pv<span class="token punctuation">-</span><span class="token number">1</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 20Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce 
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.1.0.38
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s/xinzk/zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span><span class="token number">1</span> 

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pv<span class="token punctuation">-</span><span class="token number">2</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 20Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.1.0.38 
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s/xinzk/zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span><span class="token number">2</span> 

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pv<span class="token punctuation">-</span><span class="token number">3</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 20Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.1.0.38
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s/xinzk/zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span><span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01:/zookeeper<span class="token comment"># kubectl apply -f zookeeper-persistentvolume.yaml </span>
persistentvolume/zookeeper-datadir-pv-1 created
persistentvolume/zookeeper-datadir-pv-2 created
persistentvolume/zookeeper-datadir-pv-3 created

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="fsPn9"></a></p>
<h5 id="验证pv" tabindex="-1"><a class="header-anchor" href="#验证pv" aria-hidden="true">#</a> 验证pv</h5>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>root@master01<span class="token punctuation">:</span>/zookeeper<span class="token comment"># kubectl get pv </span>
NAME                     CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>1   20Gi       RWO            Retain           Available                                   101s
zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>2   20Gi       RWO            Retain           Available                                   101s
zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>3   20Gi       RWO            Retain           Available                                   101s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="RXjU5"></a></p>
<h5 id="创建pvc" tabindex="-1"><a class="header-anchor" href="#创建pvc" aria-hidden="true">#</a> 创建pvc</h5>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pvc<span class="token punctuation">-</span><span class="token number">1</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>zk
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">volumeName</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pv<span class="token punctuation">-</span><span class="token number">1</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 10Gi
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pvc<span class="token punctuation">-</span><span class="token number">2</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>zk
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">volumeName</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pv<span class="token punctuation">-</span><span class="token number">2</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 10Gi
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pvc<span class="token punctuation">-</span><span class="token number">3</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>zk
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">volumeName</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pv<span class="token punctuation">-</span><span class="token number">3</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 10Gi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01:/zookeeper<span class="token comment"># kubectl create ns xin-zk</span>
namespace/xin-zk created
root@master01:/zookeeper<span class="token comment"># kubectl apply -f zookeeper-persistentvolumeclaim.yaml </span>
persistentvolumeclaim/zookeeper-datadir-pvc-1 created
persistentvolumeclaim/zookeeper-datadir-pvc-2 created
persistentvolumeclaim/zookeeper-datadir-pvc-3 created

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="DczvS"></a></p>
<h5 id="验证pvc" tabindex="-1"><a class="header-anchor" href="#验证pvc" aria-hidden="true">#</a> 验证pvc</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01:/zookeeper<span class="token comment"># kubectl get pvc -n xin-zk</span>
NAME                      STATUS   VOLUME                   CAPACITY   ACCESS MODES   STORAGECLASS   AGE
zookeeper-datadir-pvc-1   Bound    zookeeper-datadir-pv-1   20Gi       RWO                           16s
zookeeper-datadir-pvc-2   Bound    zookeeper-datadir-pv-2   20Gi       RWO                           16s
zookeeper-datadir-pvc-3   Bound    zookeeper-datadir-pv-3   20Gi       RWO                           16s

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="yDhMn"></a></p>
<h5 id="运行zookeeper集群" tabindex="-1"><a class="header-anchor" href="#运行zookeeper集群" aria-hidden="true">#</a> 运行zookeeper集群</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01:/zookeeper<span class="token comment"># kubectl apply -f zookeeper.yaml </span>
service/zookeeper1 created
service/zookeeper2 created
service/zookeeper3 created
deployment.apps/zookeeper1 created
deployment.apps/zookeeper2 created
deployment.apps/zookeeper3 created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="YOdjQ"></a></p>
<h5 id="验证zookeeper集群" tabindex="-1"><a class="header-anchor" href="#验证zookeeper集群" aria-hidden="true">#</a> 验证zookeeper集群</h5>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01:/zookeeper<span class="token comment"># kubectl get svc -A</span>
NAMESPACE              NAME                        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>                                        AGE
default                kubernetes                  ClusterIP   <span class="token number">10.10</span>.0.1       <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">443</span>/TCP                                        8d
kube-system            kube-dns                    NodePort    <span class="token number">10.10</span>.0.2       <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">53</span>:65421/UDP,53:65421/TCP,9153:30009/TCP       7d22h
kubernetes-dashboard   dashboard-metrics-scraper   ClusterIP   <span class="token number">10.10</span>.123.158   <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">8000</span>/TCP                                       7d20h
kubernetes-dashboard   kubernetes-dashboard        NodePort    <span class="token number">10.10</span>.92.205    <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">443</span>:30010/TCP                                  7d20h
xin-zk                 zookeeper1                  NodePort    <span class="token number">10.10</span>.233.13    <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">2181</span>:42181/TCP,2888:44954/TCP,3888:65337/TCP   28s
xin-zk                 zookeeper2                  NodePort    <span class="token number">10.10</span>.101.183   <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">2181</span>:42182/TCP,2888:51171/TCP,3888:60008/TCP   27s
xin-zk                 zookeeper3                  NodePort    <span class="token number">10.10</span>.176.183   <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">2181</span>:42183/TCP,2888:47408/TCP,3888:39107/TCP   27s


root@master01:/zookeeper<span class="token comment"># kubectl get deployments.apps -A</span>
NAMESPACE              NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
kube-system            calico-kube-controllers     <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           8d
kube-system            coredns                     <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           7d22h
kubernetes-dashboard   dashboard-metrics-scraper   <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           7d21h
kubernetes-dashboard   kubernetes-dashboard        <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           7d21h
xin-zk                 zookeeper1                  <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           31m
xin-zk                 zookeeper2                  <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           31m
xin-zk                 zookeeper3                  <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           31m


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1673500958747-eff6d385-4fe1-40ed-b37f-7cf55130f909.png#averageHue=%23fcfcfc&amp;clientId=ubf99294c-bf1e-4&amp;from=paste&amp;height=670&amp;id=u8dac0c78&amp;name=image.png&amp;originHeight=670&amp;originWidth=1620&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=55815&amp;status=done&amp;style=none&amp;taskId=u66e7a1f0-8711-4fbc-8acc-fbce124111a&amp;title=&amp;width=1620" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1673501722922-ecbd4d14-94cb-4e72-a577-8cdb28e7450e.png#averageHue=%23fcfcfc&amp;clientId=ubf99294c-bf1e-4&amp;from=paste&amp;height=760&amp;id=u45b53f77&amp;name=image.png&amp;originHeight=760&amp;originWidth=1010&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=21256&amp;status=done&amp;style=none&amp;taskId=u6aea8424-667e-41e3-b80d-853f49719cc&amp;title=&amp;width=1010" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
</div></template>


