<template><div><figure><img src="http://cdn1.ryanxin.live/image.png" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure>
<figure><img src="http://cdn1.ryanxin.live/1672022081914-b557ce9e-9475-4730-8f0b-7003f20cfd73.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p><a name="jhzMg"></a></p>
<h2 id="kubernetes-api-server简介" tabindex="-1"><a class="header-anchor" href="#kubernetes-api-server简介" aria-hidden="true">#</a> kubernetes API Server简介</h2>
<p>该端口默认值为6443，可通过启动参数<code v-pre>--secure-port</code>的值来修改默认值。  <br /> 默认IP地址为非本地（Non-Localhost）网络端口，通过启动参数 <code v-pre>--bind-address </code>设置该 值  <br /> 该端口用于接收客户端、dashboard等外部HTTPS请求。  <br /> 用于基于策略的授权。</p>
<pre><code>kubernetes API测试
</code></pre>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>curl --cacert /etc/kubernetes/ssl/ca.pem -H "Authorization: Bearer eyxxx https://127.0.0.1:6443
curl 127.0.0.1:6443/ #返回所有的API列表
curl 127.0.0.1:6443/apis #分组API
curl 127.0.0.1:6443/api/v1 #带具体版本号的API
curl 127.0.0.1:6443/version #API版本信息
curl 127.0.0.1:6443/healthz/etcd #与etcd的心跳监测
curl 127.0.0.1:6443/apis/autoscaling/v1 #API的详细信息
curl 127.0.0.1:6443/metrics #指标数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="jKVlK"></a></p>
<h2 id="kube-scheduler-简介" tabindex="-1"><a class="header-anchor" href="#kube-scheduler-简介" aria-hidden="true">#</a> kube-scheduler 简介</h2>
<p>Kubernetes 调度器是一个控制面进程，负责将 Pods 指派到节点上</p>
<p><a href="https://kubernetes.io/zh-cn/docs/reference/command-line-tools-reference/kube-scheduler/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh-cn/docs/reference/command-line-tools-reference/kube-scheduler/<ExternalLinkIcon/></a></p>
<p>通过调度算法为待调度Pod列表的每个Pod从可用Node列表中选择一个最适合的Node，并将 信息写入etcd中。</p>
<p>node节点上的kubelet通过API Server监听到kubernetes Scheduler产生的Pod绑定信息，然 后获取对应的Pod清单，下载Image，并启动容器。</p>
<p>策略</p>
<p>1.先排除不符合条件的节点 <br />2.在剩余的可用选出一个 最符合条件的节点</p>
<ul>
<li>** LeastRequestedPriority** 优先从备选节点列表中选择资源消耗最小的节点（CPU+内存）。 默认</li>
<li><strong>CalculateNodeLabelPriority</strong> 优先选择含有指定Label的节点。</li>
<li><strong>BalancedResourceAllocation</strong> 优先从备选节点列表中选择各项资源使用率最均衡的节点。</li>
</ul>
<p>第一步：创建pod</p>
<figure><img src="http://cdn1.ryanxin.live/1672103284221-c56ef642-3eea-4c1b-9aca-6e77065171c8.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>第二步：过滤掉资源不足的节点</p>
<figure><img src="http://cdn1.ryanxin.live/1672103299547-be22c211-0e9d-443a-bac7-95e505413d03.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>第三步：在剩余可用的节点中进行删选<br /><img src="http://cdn1.ryanxin.live/1672103313952-a6eafd96-cc96-41ba-8c22-0dd33e5d07ca.png" alt="image.png" loading="lazy"></p>
<p>第四步：选中节点</p>
<figure><img src="http://cdn1.ryanxin.live/1672103334334-4a15ff0a-621a-49ec-bf36-dd4bc890bfb0.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<figure><img src="http://cdn1.ryanxin.live/1672103977131-62e6ea80-5d00-4c33-8042-f0e39bfb71cf.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<figure><img src="http://cdn1.ryanxin.live/1672103988640-94e7cad6-e070-4b5f-be58-2ed79f41d965.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p><a name="kihVc"></a></p>
<h2 id="kube-controller-manager-简介" tabindex="-1"><a class="header-anchor" href="#kube-controller-manager-简介" aria-hidden="true">#</a> kube-controller-manager 简介</h2>
<hr>
<p><a href="https://kubernetes.io/zh/docs/reference/command-line-tools-reference/kube-controller-manager/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh/docs/reference/command-line-tools-reference/kube-controller-manager/<ExternalLinkIcon/></a></p>
<p>**Controller Manager **还包括一些子控制器(<strong>副本控制器、节点控制器、命名空间控制器和服务账号控制器等</strong>)，控制器作为集群内部的管理控制中心，负责集群内的Node、Pod副本、服务端点（Endpoint）、命名空间（Namespace）、服务账号（ServiceAccount）、资源定额（ResourceQuota）的管理，当某个Node意外宕机时， Controller Manager会及时发现并执行自动化修复流程，确保集群中的pod副本始终处于预期的工作状态。</p>
<p>controller-manager控制器每间隔5秒检查一次节点的状态。<br />如果controller-manager控制器没有收到自节点的心跳，则将该node节点被标记为不可达。</p>
<p>controller-manager将在标记为无法访问之前等待40秒。<br />如果该node节点被标记为无法访问后5分钟还没有恢复，controller-manager会删除当前node节点的所有pod并在其它可用节点重建这些pod。</p>
<p>pod 高可用机制:<br />node monitor period: 节点监视周期<br />node monitor grace period: 节点监视器宽限期<br />pod eviction timeout: pod 驱逐超时时间</p>
<figure><img src="http://cdn1.ryanxin.live/1672104826429-a48a7340-d7b8-4306-9ad3-cc330ca5cdaf.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p><a name="KW9k0"></a></p>
<h2 id="kube-proxy-简介" tabindex="-1"><a class="header-anchor" href="#kube-proxy-简介" aria-hidden="true">#</a> kube-proxy 简介</h2>
<p><a href="https://kubernetes.io/zh/docs/reference/command-line-tools-reference/kube-proxy/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh/docs/reference/command-line-tools-reference/kube-proxy/<ExternalLinkIcon/></a></p>
<p>kube-proxy：Kubernetes 网络代理运行在 node 上，它反映了 node 上 Kubernetes API中定义的服务，并可以通过一组后端进行简单的 TCP、UDP 和 SCTP 流转发或者在一组后端进行循环 TCP、UDP 和 SCTP 转发，用户必须使用 apiserver API 创建一个服务来配置代理，其实就是kube-proxy通过在主机上维护网络规则并执行连接转发来实现Kubernetes服务访问。</p>
<p>kube-proxy 运行在每个节点上，监听 API Server 中服务对象的变化，再通过管理 IPtables或者IPVS规则 来实现网络的转发。</p>
<p>Kube-Proxy 不同的版本可支持三种工作模式：<br />UserSpace：k8s v1.1之前使用,k8s 1.2及以后就已经淘汰<br />IPtables : k8s 1.1版本开始支持，1.2开始为默认<br />IPVS: k8s 1.9引入到1.11为正式版本，需要安装ipvsadm、ipset 工具包和加载 ipvs 内核模块</p>
<figure><img src="http://cdn1.ryanxin.live/1672105080341-033fbd6d-3559-425a-9f4e-772b487675e6.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>iptables 模式：</p>
<figure><img src="http://cdn1.ryanxin.live/1672105157054-64ef5bca-a487-4502-a88e-f380c413492a.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>IPVS 相对 IPtables 效率会更高一些，使用 IPVS 模式需要在运行 Kube-Proxy 的节点上安装ipvsadm、ipset 工具包和加载 ip_vs 内核模块，当 Kube-Proxy 以 IPVS 代理模式启动时， Kube-Proxy 将验证节点上是否安装了 IPVS 模块，如果未安装，则 Kube-Proxy 将回退到IPtables 代理模式。</p>
<p>使用IPVS模式，Kube-Proxy会监视Kubernetes Service对象和Endpoints，调用宿主机内核Netlink接口以相应地创建IPVS规则并定期与Kubernetes Service对象 Endpoints对象同步IPVS规则，以确保IPVS状态与期望一致，访问服务时，流量将被重定向到其中一个后端 Pod,IPVS使用哈希表作为底层数据结构并在内核空间中工作，这意味着IPVS可以更快地重定向流量，并且在同步代理规则时具有更好的性能，此外，IPVS 为负载均衡算法提供了更多选项，例如：rr (轮询调度)、lc (最小连接数)、dh (目标哈希)、sh (源哈希)、sed (最短期望延迟)、nq(不排队调度)等。</p>
<p>kube-apiserver   认证和授权<br />kube-controller-manager 维护pod副本<br />kube-scheduler  分配调度<br />kubelet  负责维护pod声明周期 汇报节点状态<br />kube-proxy 维护网络规则<br />kubectl 客户端工具<br />dashboard 提供web界面<br />coredns  进行内部svc域名解析</p>
</div></template>


