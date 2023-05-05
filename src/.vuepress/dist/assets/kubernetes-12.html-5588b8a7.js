import{_ as i,V as p,W as l,Y as s,Z as n,a0 as e,X as t,C as c}from"./framework-8eb1d601.js";const o={},r=t('<p><a name="qARQK"></a></p><h2 id="ingress和ingress控制器介绍" tabindex="-1"><a class="header-anchor" href="#ingress和ingress控制器介绍" aria-hidden="true">#</a> Ingress和Ingress控制器介绍</h2><p>在k8s中将一个服务暴露出去通常会使用NodePort或LoadBalancer类型的Service，但随着服务数量的增多，使用NodePort会存在一些问题，可用作NodePort的端口是一个有限的范围，不容易记忆，不好管理。另外， 如果在公有云使用LoadBalancer类型的Service上会产生额外的成本。</p><p>所以k8s提供了另一种方式，使用Ingress和Ingress控制器来对外暴露服务，Ingress控制器作为统一的流量入口，管理内部各种必要的服务，并通过Ingress资源来描述如何区分流量及内部的路由逻辑。有了Ingress和Ingress控制器，就可以通过定义路由流量的规则来实现服务发布，而无需创建NodePort或LoadBalancer类型的Service，并且流量也会由Ingress控制器直达Pod，不需要再由Service转发。</p><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>Ingress资源就是基于HTTP虚拟主机或URL路径的流量转发规则（类似于nginx中的虚拟主机定义或location转发规则定义），它把需要暴露给集群外的每个Service对象，映射为Ingress控制器上的一个虚拟主机或某虚拟主机的一个URL路径。</p></div><p>如下图所示：</p><figure><img src="http://cdn1.ryanxin.live/1675821066302-e7f2e7a2-7032-4d52-b186-470babac7d1b.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',7),u={href:"https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/",target:"_blank",rel:"noopener noreferrer"},d=s("br",null,null,-1),k={href:"https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress-controllers/",target:"_blank",rel:"noopener noreferrer"},m=t('<p><a name="JgTFh"></a></p><h3 id="ingress控制器" tabindex="-1"><a class="header-anchor" href="#ingress控制器" aria-hidden="true">#</a> Ingress控制器</h3><p>但Ingress资源本身只是一组路由规则定义，这些规则想要真正的生效还需要借助其它功能的辅助，例如监听某套接字、根据路由规则匹配机制将客户端请求进行转发等。实现这些功能的组件就是Ingress控制器(Ingress Controller)。Ingress Controller是Kubernetes的一个附件需要单独部署。</p><p><a name="AQ8zJ"></a></p><h2 id="ingress-controller部署" tabindex="-1"><a class="header-anchor" href="#ingress-controller部署" aria-hidden="true">#</a> Ingress Controller部署</h2>',5),v={href:"https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress-controllers/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/kubernetes/ingress-nginx",target:"_blank",rel:"noopener noreferrer"},g=s("br",null,null,-1),h={href:"https://kubernetes.github.io/ingress-nginx/",target:"_blank",rel:"noopener noreferrer"},y=t(`<p>** 常用的的Ingress控制器部署方式有两种： **</p><p><a name="Cd3df"></a></p><h3 id="_1-以deployment方式部署ingress控制器pod资源" tabindex="-1"><a class="header-anchor" href="#_1-以deployment方式部署ingress控制器pod资源" aria-hidden="true">#</a> 1. 以Deployment方式部署Ingress控制器Pod资源</h3><p>通过NodePort或LoadBalancer类型的Service或者通过拥有外部IP地址（externalIP）的Service对象为其接入集群外部的客户端请求流量。<br>这意味着，在生产环境以这种方式部署一个Ingress控制器时，必须在其前端定义一个负载均衡器，这个负载均衡器可以是LoadBalancer类型的Service，也可以是用户自行管理的负载均衡器。</p><figure><img src="http://cdn1.ryanxin.live/1675822367503-e4adce9e-bfca-4bb3-9b2f-549eac4f60ed.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><a name="PTwIB"></a></p><h3 id="_2-以daemonset方式部署ingress控制器" tabindex="-1"><a class="header-anchor" href="#_2-以daemonset方式部署ingress控制器" aria-hidden="true">#</a> 2.以DaemonSet方式部署Ingress控制器</h3><p>Pod资源Ingress控制器的各Pod分别以单一实例的方式运行在集群的所有节点或部分专用节点之上，并配置这些Pod对象以hostPort或hostNetwork的方式在当前节点接入外部流量。在这种方式下，前端还是需要一个负载均衡器，作为客户端流量的统一入口，然后转发给Ingress控制器Pod</p><figure><img src="http://cdn1.ryanxin.live/1675822438502-f95a9c45-e281-47e8-b65f-fce5abecd40a.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在nginx Ingress控制器官方提供的部署文件中，默认使用第一种方式，使用Deployment+NodePort Service来部署。</p><p><a name="zJrih"></a></p><h3 id="_3-deployment方式部署" tabindex="-1"><a class="header-anchor" href="#_3-deployment方式部署" aria-hidden="true">#</a> 3. Deployment方式部署</h3><p>选定好版本，下载对应的部署文件</p><figure><img src="http://cdn1.ryanxin.live/1675833096495-64fbd3a8-e6ab-4eeb-9c19-063d0909ac07.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://github.com/kubernetes/ingress-nginx/archive/refs/tag/controller-v1.3.1.tar.gz
<span class="token function">tar</span> xvf controller-v1.3.1.tar.gz
<span class="token builtin class-name">cd</span> ingress-nginx-controller-v1.3.1/deploy/static/provider/baremetal/
<span class="token comment">#修改当前目录下的deploy.yaml，将镜像修改未国内镜像源</span>
<span class="token function">cat</span> deploy.yaml <span class="token operator">|</span><span class="token function">grep</span> image
        image: registry.cn-hangzhou.aliyuncs.com/google_containers/nginx-ingress-controller:v1.3.1
        imagePullPolicy: IfNotPresent
        image: registry.cn-hangzhou.aliyuncs.com/google_containers/kube-webhook-certgen:v1.3.0
        imagePullPolicy: IfNotPresent
        image: registry.cn-hangzhou.aliyuncs.com/google_containers/kube-webhook-certgen:v1.3.0
        imagePullPolicy: IfNotPresent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改nodeport地址</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app.kubernetes.io/component</span><span class="token punctuation">:</span> controller
    <span class="token key atrule">app.kubernetes.io/instance</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>nginx
    <span class="token key atrule">app.kubernetes.io/name</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>nginx
    <span class="token key atrule">app.kubernetes.io/part-of</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>nginx
    <span class="token key atrule">app.kubernetes.io/version</span><span class="token punctuation">:</span> 1.3.1
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>controller
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ipFamilies</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> IPv4
  <span class="token key atrule">ipFamilyPolicy</span><span class="token punctuation">:</span> SingleStack
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">appProtocol</span><span class="token punctuation">:</span> http
    <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> http
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30020</span>
  <span class="token punctuation">-</span> <span class="token key atrule">appProtocol</span><span class="token punctuation">:</span> https
    <span class="token key atrule">name</span><span class="token punctuation">:</span> https
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> https
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30021</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> deploy.yaml
amespace/ingress-nginx created
serviceaccount/ingress-nginx created
serviceaccount/ingress-nginx-admission created
role.rbac.authorization.k8s.io/ingress-nginx created
role.rbac.authorization.k8s.io/ingress-nginx-admission created
clusterrole.rbac.authorization.k8s.io/ingress-nginx created
clusterrole.rbac.authorization.k8s.io/ingress-nginx-admission created
rolebinding.rbac.authorization.k8s.io/ingress-nginx created
rolebinding.rbac.authorization.k8s.io/ingress-nginx-admission created
clusterrolebinding.rbac.authorization.k8s.io/ingress-nginx created
clusterrolebinding.rbac.authorization.k8s.io/ingress-nginx-admission created
configmap/ingress-nginx-controller created
service/ingress-nginx-controller created
service/ingress-nginx-controller-admission created
deployment.apps/ingress-nginx-controller created
job.batch/ingress-nginx-admission-create created
job.batch/ingress-nginx-admission-patch created
ingressclass.networking.k8s.io/nginx created
validatingwebhookconfiguration.admissionregistration.k8s.io/ingress-nginx-admission created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看状态</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>NAME                                        READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create-cnccm        <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          21s
ingress-nginx-admission-patch-j4l68         <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          21s
ingress-nginx-controller-79658555f4-r2pz5   <span class="token number">0</span>/1     Running     <span class="token number">0</span>          21s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>root@master01<span class="token punctuation">[</span><span class="token datetime number">14:23:04</span><span class="token punctuation">]</span>~ <span class="token comment">#:kubectl get service -n ingress-nginx</span>
NAME                                 TYPE        CLUSTER<span class="token punctuation">-</span>IP      EXTERNAL<span class="token punctuation">-</span>IP   PORT(S)                      AGE
ingress<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>controller             NodePort    10.10.79.136    &lt;none<span class="token punctuation">&gt;</span>        80<span class="token punctuation">:</span>30020/TCP<span class="token punctuation">,</span>443<span class="token punctuation">:</span>30021/TCP   74m
ingress<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>controller<span class="token punctuation">-</span>admission   ClusterIP   10.10.133.115   &lt;none<span class="token punctuation">&gt;</span>        443/TCP                      74m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，ingress-nginx-controller只有一个副本，可以按需调整</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>root@master01<span class="token punctuation">[</span><span class="token datetime number">14:54:09</span><span class="token punctuation">]</span>~ <span class="token comment">#:kubectl scale -n ingress-nginx deployment ingress-nginx-controller --replicas=3</span>

root@master01<span class="token punctuation">[</span><span class="token datetime number">14:54:09</span><span class="token punctuation">]</span>~ <span class="token comment">#:kubectl get pod -n ingress-nginx </span>
NAME                                        READY   STATUS      RESTARTS   AGE
ingress<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>admission<span class="token punctuation">-</span>create<span class="token punctuation">-</span>cnccm        0/1     Completed   0          105m
ingress<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>admission<span class="token punctuation">-</span>patch<span class="token punctuation">-</span>j4l68         0/1     Completed   0          105m
ingress<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>controller<span class="token punctuation">-</span>79658555f4<span class="token punctuation">-</span>gd2zj   1/1     Running     0          22s
ingress<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>controller<span class="token punctuation">-</span>79658555f4<span class="token punctuation">-</span>r2pz5   1/1     Running     0          105m
ingress<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>controller<span class="token punctuation">-</span>79658555f4<span class="token punctuation">-</span>r6l8s   0/1     Running     0          22s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl scale <span class="token parameter variable">-n</span> ingress-nginx deployment ingress-nginx-controller <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span>

root@master01<span class="token punctuation">[</span><span class="token number">15</span>:44:40<span class="token punctuation">]</span>~ <span class="token comment">#:kubectl get pod -n ingress-nginx</span>
NAME                                        READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create-cnccm        <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          6d2h
ingress-nginx-admission-patch-j4l68         <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          6d2h
ingress-nginx-controller-79658555f4-gd2zj   <span class="token number">1</span>/1     Running     <span class="token number">0</span>          6d
ingress-nginx-controller-79658555f4-r2pz5   <span class="token number">1</span>/1     Running     <span class="token number">0</span>          6d2h
ingress-nginx-controller-79658555f4-r6l8s   <span class="token number">1</span>/1     Running     <span class="token number">0</span>          6d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在负载均衡器中添加ingress-nginx-controller后端，以haproxy为例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /etc/haproxy/harpoxy.cfg
<span class="token comment">#################################</span>
listen ingress-nginx-controller-80
       <span class="token builtin class-name">bind</span> <span class="token number">10.1</span>.0.6:80
       option  tcplog
       mode tcp
       balance <span class="token builtin class-name">source</span>
       server ingress-controller-server1 <span class="token number">10.1</span>.0.31:30020 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
       server ingress-controller-server2 <span class="token number">10.1</span>.0.32:30020 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>

listen ingress-nginx-controller-443
       <span class="token builtin class-name">bind</span> <span class="token number">10.1</span>.0.6:443
       option  tcplog
       mode tcp
       balance <span class="token builtin class-name">source</span>
       server ingress-controller-server1 <span class="token number">10.1</span>.0.31:30021 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
       server ingress-controller-server2 <span class="token number">10.1</span>.0.32:30021 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/1676361150547-2ea0c07b-1974-4351-9488-f601238b0a2c.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><a name="bH2vb"></a></p><h3 id="_4-daemonset方式部署" tabindex="-1"><a class="header-anchor" href="#_4-daemonset方式部署" aria-hidden="true">#</a> 4.DaemonSet方式部署</h3><p>对前面的<strong>deploy.yaml</strong>进行修改，主要修改3个配置</p><ol><li>删除掉ingress-ingress-controller Service资源定义</li><li>将Deployment修改未DaemonSet</li><li>配置Pod使用<strong>hostNetwork</strong>和<strong>hostPID</strong></li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: apps/v1
kind: DaemonSet		<span class="token comment">#类型修改为DaemonSet</span>
metadata:
  labels:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: <span class="token number">1.3</span>.1
  name: ingress-nginx-controller
  namespace: ingress-nginx
spec:
  minReadySeconds: <span class="token number">0</span>
  revisionHistoryLimit: <span class="token number">10</span>
  selector:
    matchLabels:
      app.kubernetes.io/component: controller
      app.kubernetes.io/instance: ingress-nginx
      app.kubernetes.io/name: ingress-nginx
  template:
    metadata:
      labels:
        app.kubernetes.io/component: controller
        app.kubernetes.io/instance: ingress-nginx
        app.kubernetes.io/name: ingress-nginx
    spec:
      hostPID: <span class="token boolean">true</span>		<span class="token comment">#Pod使用主机PID名称空间</span>
      hostNetwork: <span class="token boolean">true</span>	<span class="token comment">#Pod使用主机网络</span>
      containers:

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的，也需要在负载均衡器中添加ingress-nginx-controller后端，以haproxy为例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /etc/haproxy/harpoxy.cfg
<span class="token comment">#################################</span>
listen ingress-nginx-controller-80
       <span class="token builtin class-name">bind</span> <span class="token number">10.1</span>.0.6:80
       option  tcplog
       mode tcp
       balance <span class="token builtin class-name">source</span>
       server ingress-controller-server1 <span class="token number">10.1</span>.0.31:30020 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
       server ingress-controller-server2 <span class="token number">10.1</span>.0.32:30020 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>

listen ingress-nginx-controller-443
       <span class="token builtin class-name">bind</span> <span class="token number">10.1</span>.0.6:443
       option  tcplog
       mode tcp
       balance <span class="token builtin class-name">source</span>
       server ingress-controller-server1 <span class="token number">10.1</span>.0.31:30021 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
       server ingress-controller-server2 <span class="token number">10.1</span>.0.32:30021 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="Bd8wp"></a></p><h2 id="_3-ingress示例" tabindex="-1"><a class="header-anchor" href="#_3-ingress示例" aria-hidden="true">#</a> 3.Ingress示例</h2><p><a name="bIkUq"></a></p><h3 id="_3-1-ingress资源规范" tabindex="-1"><a class="header-anchor" href="#_3-1-ingress资源规范" aria-hidden="true">#</a> 3.1 Ingress资源规范</h3><p>Ingress资源的可用字段和含义如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: networkking.k8s.io/v1
kind: Ingress
metadata:
  name: <span class="token punctuation">..</span>.
  namespace: <span class="token punctuation">..</span>.
  annotations: 	<span class="token comment">#资源注解</span>
    kubernetes.io/ingress.class: <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>	<span class="token comment">#指明此Ingress资源由哪个Ingress控制器来解析，目前也可以使用spec.ingressClassName字段代替</span>
spec:
  rules:	<span class="token comment">#Ingress路由规则列表</span>
  - host: <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>	<span class="token comment">#虚拟主机的域名，支持*前缀匹配，但不支持IP，不支持端口</span>
    http:
      paths:	<span class="token comment">#虚拟主机的PATH路径列表，由path和backend组成</span>
      - path: <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>	<span class="token comment">#流量匹配的HTTP URL路径，必须以/开头</span>
        pathType: <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>	<span class="token comment">#URL路径匹配方式，支持Exact(精准匹配)、Prefix(前缀匹配)和ImplementationSpecific，详细介绍可以参考官网文档</span>
        backend:	<span class="token comment">#匹配到的流量要转发到的后端定义</span>
          service:	<span class="token comment">#后端关联的Service对象定义</span>
            name: <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>	<span class="token comment">#Service对象名称</span>
            port:	<span class="token comment">#Service对象端口</span>
              number: <span class="token operator">&lt;</span>int<span class="token operator">&gt;</span>		<span class="token comment">#端口号</span>
              name: <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>	<span class="token comment">#端口名称</span>
  tls:	<span class="token comment">#tls配置，用于指定上边rules字段下哪些host需要使用https</span>
  - hosts: <span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token operator">&gt;</span>	<span class="token comment">#使用同一组证书的主机名称列表</span>
    secretName: <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>	<span class="token comment">#保存证书的Secret资源名称</span>
  defaultBackend: <span class="token operator">&lt;</span>Object<span class="token operator">&gt;</span>	<span class="token comment">#默认后端定义，可嵌套使用字段与上面的backend字段相同</span>
  ingressClassName: <span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>	<span class="token comment">#ingressClass资源名称，作用类似于上面的注解信息，用于指定适配的Ingress控制器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="hgQMr"></a></p><h3 id="_3-2-单域名访问示例" tabindex="-1"><a class="header-anchor" href="#_3-2-单域名访问示例" aria-hidden="true">#</a> 3.2 单域名访问示例</h3><p>先创建一下资源，用于测试Ingress功能，部署文件如下，包含两个tomcat-pod和两个对应的Svc<br></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app1
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app1
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app1
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/xinweb11/tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">:</span><span class="token number">1.9</span>
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
          <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>svc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app1
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app2
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app2
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app2
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/xinweb11/tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">:</span><span class="token number">1.9</span>
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
          <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app2<span class="token punctuation">-</span>svc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app2
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>pod创建成功后 到里面创建一个测试页面</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span>
root@tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>6fd79cfbd4<span class="token punctuation">-</span>8tg64<span class="token punctuation">:</span>/data/tomcat/webapps/myapp1<span class="token comment"># echo &quot;tomcat app1 ingress&quot; &gt; index.jsp</span>
root@tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>6fd79cfbd4<span class="token punctuation">-</span>8tg64<span class="token punctuation">:</span>/data/tomcat/webapps/myapp1<span class="token comment"># ls</span>
index.jsp


root@master01<span class="token punctuation">[</span><span class="token datetime number">17:13:13</span><span class="token punctuation">]</span>~/ingress<span class="token punctuation">-</span>test <span class="token comment">#:curl 10.10.103.87:8080/myapp1/</span>
tomcat app1 ingress

<span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app2<span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span>

root@tomcat<span class="token punctuation">-</span>app2<span class="token punctuation">-</span>54b548dfbf<span class="token punctuation">-</span>zsgpd<span class="token punctuation">:</span>/apps/tomcat/bin<span class="token comment"># mkdir /data/tomcat/webapps/myapp2 </span>
root@tomcat<span class="token punctuation">-</span>app2<span class="token punctuation">-</span>54b548dfbf<span class="token punctuation">-</span>zsgpd<span class="token punctuation">:</span>/apps/tomcat/bin<span class="token comment"># echo &quot;tomcat app2 ingress&quot; &gt; /data/tomcat/webapps/myapp2/index.jsp</span>

root@tomcat<span class="token punctuation">-</span>app2<span class="token punctuation">-</span>54b548dfbf<span class="token punctuation">-</span>zsgpd<span class="token punctuation">:</span>/apps/tomcat/bin<span class="token comment"># ./catalina.sh stop</span>
root@tomcat<span class="token punctuation">-</span>app2<span class="token punctuation">-</span>54b548dfbf<span class="token punctuation">-</span>zsgpd<span class="token punctuation">:</span>/apps/tomcat/bin<span class="token comment"># ./catalina.sh start</span>

root@master01<span class="token punctuation">[</span><span class="token datetime number">17:19:14</span><span class="token punctuation">]</span>~/ingress<span class="token punctuation">-</span>test <span class="token comment">#:curl 10.10.219.108:8080/myapp2/</span>
tomcat app2 ingress
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="sPXIg"></a></p><h4 id="_3-2-1-单域名-ingress-资源" tabindex="-1"><a class="header-anchor" href="#_3-2-1-单域名-ingress-资源" aria-hidden="true">#</a> 3.2.1 单域名 ingress 资源</h4>`,49),x={href:"http://xn--www-zr0fl02s60m.app1.com",target:"_blank",rel:"noopener noreferrer"},f=t(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app1
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">kubernetes.io/ingress.class</span><span class="token punctuation">:</span> <span class="token string">&quot;nginx&quot;</span>   <span class="token comment">#指定由哪个Ingress Controller解析</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/use-regex</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span> <span class="token comment">##指定后面rules定义的path可以使用正则表达式</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-connect-timeout</span><span class="token punctuation">:</span> <span class="token string">&quot;600&quot;</span> <span class="token comment">##连接超时时间,默认为5s</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-send-timeout</span><span class="token punctuation">:</span> <span class="token string">&quot;600&quot;</span> <span class="token comment">##后端服务器回转数据超时时间,默认为60s</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-read-timeout</span><span class="token punctuation">:</span> <span class="token string">&quot;600&quot;</span> <span class="token comment">##后端服务器响应超时时间,默认为60s</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-body-size</span><span class="token punctuation">:</span> <span class="token string">&quot;50m&quot;</span> <span class="token comment">##客户端上传文件，最大大小，默认为20m</span>
    <span class="token comment">#nginx.ingress.kubernetes.io/rewrite-target: / ##URL重写</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/app-root</span><span class="token punctuation">:</span> /index.html
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> www.app1.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>svc
            <span class="token key atrule">port</span><span class="token punctuation">:</span>
              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="fSKZN"></a></p><h4 id="_3-2-2-多域名-ingress-资源" tabindex="-1"><a class="header-anchor" href="#_3-2-2-多域名-ingress-资源" aria-hidden="true">#</a> 3.2.2 多域名 ingress 资源</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">kubernetes.io/ingress.class</span><span class="token punctuation">:</span> <span class="token string">&quot;nginx&quot;</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/use-regex</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-connect-timeout</span><span class="token punctuation">:</span> <span class="token string">&quot;600&quot;</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-send-timeout</span><span class="token punctuation">:</span> <span class="token string">&quot;600&quot;</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-read-timeout</span><span class="token punctuation">:</span> <span class="token string">&quot;600&quot;</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-body-size</span><span class="token punctuation">:</span> <span class="token string">&quot;50m&quot;</span>
    <span class="token comment">#nginx.ingress.kubernetes.io/rewrite-target: /</span>
    <span class="token comment">#nginx.ingress.kubernetes.io/app-root: /index.html</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> www.myapp1.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>svc
            <span class="token key atrule">port</span><span class="token punctuation">:</span>
              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">8080</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> www.myapp2.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app2<span class="token punctuation">-</span>svc
            <span class="token key atrule">port</span><span class="token punctuation">:</span>
              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>root@master01<span class="token punctuation">[</span><span class="token datetime number">17:24:26</span><span class="token punctuation">]</span>~/ingress<span class="token punctuation">-</span>test <span class="token comment">#:kubectl apply -f tomcat-app-ingress1-ingress.yaml </span>
ingress.networking.k8s.io/ingress<span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app1 created

root@master01<span class="token punctuation">[</span><span class="token datetime number">17:24:34</span><span class="token punctuation">]</span>~/ingress<span class="token punctuation">-</span>test <span class="token comment">#:kubectl get ingress </span>
NAME                 CLASS    HOSTS                           ADDRESS               PORTS   AGE
ingress<span class="token punctuation">-</span>tomcat<span class="token punctuation">-</span>app   &lt;none<span class="token punctuation">&gt;</span>   www.myapp1.com<span class="token punctuation">,</span>www.myapp2.com   10.1.0.32<span class="token punctuation">,</span>10.1.0.33   80      4m34s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="Vuw1T"></a></p><h4 id="_3-2-3-配置haproxy-keepalived-实现负载均衡" tabindex="-1"><a class="header-anchor" href="#_3-2-3-配置haproxy-keepalived-实现负载均衡" aria-hidden="true">#</a> 3.2.3 配置Haproxy+ keepalived 实现负载均衡</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> keepalived haproxy <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>keepalived 配置文件如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">##################################Master##################################</span>
global_defs <span class="token punctuation">{</span>
   notification_email <span class="token punctuation">{</span>
     <span class="token number">123123</span>@qq.com
   <span class="token punctuation">}</span>
   notification_email_from Alexandre.Cassen@firewall.loc
   smtp_server <span class="token number">192.168</span>.200.1
   smtp_connect_timeout <span class="token number">30</span>
   router_id harbor-lvs1
<span class="token punctuation">}</span>

vrrp_instance VI_1 <span class="token punctuation">{</span>
    state MASTER
    interface eth0
    garp_master_delay <span class="token number">10</span>
    smtp_alert
    virtual_router_id <span class="token number">51</span>
    priority <span class="token number">100</span>
    advert_int <span class="token number">1</span>
    authentication <span class="token punctuation">{</span>
        auth_type PASS
        auth_pass <span class="token number">1111</span>
    <span class="token punctuation">}</span>
    virtual_ipaddress <span class="token punctuation">{</span>
        <span class="token number">10.1</span>.0.100
        <span class="token number">10.1</span>.0.101
        <span class="token number">10.1</span>.0.102
        <span class="token number">10.1</span>.0.103
        <span class="token number">10.1</span>.0.104

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">##################################BACKUP##################################</span>
global_defs <span class="token punctuation">{</span>
   notification_email <span class="token punctuation">{</span>
     <span class="token number">123123</span>@qq.com
   <span class="token punctuation">}</span>
   notification_email_from Alexandre.Cassen@firewall.loc
   smtp_server <span class="token number">192.168</span>.200.1
   smtp_connect_timeout <span class="token number">30</span>
   router_id lvs2
<span class="token punctuation">}</span>

vrrp_instance VI_1 <span class="token punctuation">{</span>
    state BACKUP
    interface eth0
    garp_master_delay <span class="token number">10</span>
    smtp_alert
    virtual_router_id <span class="token number">51</span>
    priority <span class="token number">99</span>
    advert_int <span class="token number">1</span>
    authentication <span class="token punctuation">{</span>
        auth_type PASS
        auth_pass <span class="token number">1111</span>
    <span class="token punctuation">}</span>
    virtual_ipaddress <span class="token punctuation">{</span>
        <span class="token number">10.1</span>.0.100
        <span class="token number">10.1</span>.0.101
        <span class="token number">10.1</span>.0.102
        <span class="token number">10.1</span>.0.103
        <span class="token number">10.1</span>.0.104

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Haproxy 配置使用VIP代理 <strong>ingress controler service</strong> <br>Haproxy配置如下： 两个节点一样</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>listen k8s-xin-ingress-80
  <span class="token builtin class-name">bind</span> <span class="token number">10.1</span>.0.100:80
  mode tcp
  server k8s1 <span class="token number">10.1</span>.0.32:30020 check inter 3s fall <span class="token number">3</span> rise <span class="token number">5</span>
  server k8s2 <span class="token number">10.1</span>.0.33:30020 check inter 3s fall <span class="token number">3</span> rise <span class="token number">5</span>

listen k8s-xin-ingress-443
  <span class="token builtin class-name">bind</span> <span class="token number">10.1</span>.0.100:443
  mode tcp
  server k8s1 <span class="token number">10.1</span>.0.32:30021 check inter 3s fall <span class="token number">3</span> rise <span class="token number">5</span>
  server k8s2 <span class="token number">10.1</span>.0.33:30021 check inter 3s fall <span class="token number">3</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://cdn1.ryanxin.live/1676441359881-2d49ba70-9af5-4d2a-b4c4-e5bba389aa3c.png" alt="" loading="lazy"><br><img src="http://cdn1.ryanxin.live/1676441343917-040c8c97-7dc3-4f51-ac74-3671a2f8651d.png" alt="" loading="lazy"></p><p><a name="IyYla"></a></p><h3 id="_3-3-ingress-配置tls" tabindex="-1"><a class="header-anchor" href="#_3-3-ingress-配置tls" aria-hidden="true">#</a> 3.3 Ingress 配置TLS</h3><p><a name="XuS8z"></a></p><h4 id="_3-3-1-创建证书" tabindex="-1"><a class="header-anchor" href="#_3-3-1-创建证书" aria-hidden="true">#</a> 3.3.1 创建证书</h4>`,17),w={href:"http://xn--www-ps1eowg26al27i.myapp1.com",target:"_blank",rel:"noopener noreferrer"},_=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> ingress-cert <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ingress-cert
openssl genrsa <span class="token parameter variable">-out</span> ca.key <span class="token number">4096</span>
openssl req <span class="token parameter variable">-x509</span> <span class="token parameter variable">-new</span> <span class="token parameter variable">-nodes</span> <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-days</span> <span class="token number">100</span> <span class="token punctuation">\\</span>
 <span class="token parameter variable">-subj</span> <span class="token string">&quot;/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=www.myapp1.com&quot;</span> <span class="token punctuation">\\</span>
 <span class="token parameter variable">-key</span> ca.key <span class="token punctuation">\\</span>
 <span class="token parameter variable">-out</span> ca.crt
openssl genrsa <span class="token parameter variable">-out</span> www.myapp1.com.key <span class="token number">4096</span>
openssl req <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-new</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-subj</span> <span class="token string">&quot;/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=www.myapp1.com&quot;</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-key</span> www.myapp1.com.key <span class="token punctuation">\\</span>
    <span class="token parameter variable">-out</span> www.myapp1.com.csr
openssl x509 <span class="token parameter variable">-req</span> <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-days</span> <span class="token number">3650</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-CA</span> ca.crt <span class="token parameter variable">-CAkey</span> ca.key <span class="token parameter variable">-CAcreateserial</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-in</span> www.myapp1.com.csr <span class="token punctuation">\\</span>
    <span class="token parameter variable">-out</span> www.myapp1.com.crt
<span class="token function">rm</span> <span class="token parameter variable">-f</span> www.myapp1.com.csr
kubectl create secret tls cert-www.myapp1.com <span class="token parameter variable">--cert</span> ./www.myapp1.com.crt <span class="token parameter variable">--key</span> ./www.myapp1.com.key

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看Secret</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">14</span>:41:14<span class="token punctuation">]</span>~/ingress-cert <span class="token comment">#:kubectl describe secrets cert-www.myapp1.com </span>
Name:         cert-www.myapp1.com
Namespace:    default
Labels:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

Type:  kubernetes.io/tls

Data
<span class="token operator">==</span><span class="token operator">==</span>
tls.crt:  <span class="token number">1931</span> bytes
tls.key:  <span class="token number">3243</span> bytes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="DC9cn"></a></p><h4 id="_3-3-2-ingress使用tls证书示例" tabindex="-1"><a class="header-anchor" href="#_3-3-2-ingress使用tls证书示例" aria-hidden="true">#</a> 3.3.2 Ingress使用TLS证书示例</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>tls<span class="token punctuation">-</span>url
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">kubernetes.io/ingress.class</span><span class="token punctuation">:</span> <span class="token string">&quot;nginx&quot;</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/use-regex</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-connect-timeout</span><span class="token punctuation">:</span> <span class="token string">&quot;600&quot;</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-send-timeout</span><span class="token punctuation">:</span> <span class="token string">&quot;600&quot;</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-read-timeout</span><span class="token punctuation">:</span> <span class="token string">&quot;600&quot;</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-body-size</span><span class="token punctuation">:</span> <span class="token string">&quot;50m&quot;</span>
    <span class="token comment">#nginx.ingress.kubernetes.io/rewrite-target: /</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/app-root</span><span class="token punctuation">:</span> /index.html
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> www.myapp1.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /tls1
        <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app1<span class="token punctuation">-</span>svc
            <span class="token key atrule">port</span><span class="token punctuation">:</span>
              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">8080</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /tls2
        <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span>app2<span class="token punctuation">-</span>svc
            <span class="token key atrule">port</span><span class="token punctuation">:</span>
              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">8080</span>
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>	<span class="token comment">#如果多个域名都使用https，再添加一个列表项即可</span>
  <span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;www.myapp1.com&quot;</span><span class="token punctuation">]</span>		<span class="token comment">#如果多个域名使用相同的证书，在这里的列表添加一个域名即可</span>
    <span class="token key atrule">secretName</span><span class="token punctuation">:</span> cert<span class="token punctuation">-</span>www.myapp1.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="m2IUC"></a></p><h4 id="_3-3-3-pod-中创建用于测试的目录和页面" tabindex="-1"><a class="header-anchor" href="#_3-3-3-pod-中创建用于测试的目录和页面" aria-hidden="true">#</a> 3.3.3 pod 中创建用于测试的目录和页面</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>
mkdir /data/tomcat/webapps/tls1
echo &quot;www.myapp1.com/tls1/index.html&quot; <span class="token punctuation">&gt;</span> /data/tomcat/webapps/tls1/index.html


mkdir /data/tomcat/webapps/tls2
echo &quot;www.myapp1.com/tls2/index.html&quot; <span class="token punctuation">&gt;</span> /data/tomcat/webapps/tls2/index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="oQtYJ"></a></p><h4 id="_3-3-4-访问测试" tabindex="-1"><a class="header-anchor" href="#_3-3-4-访问测试" aria-hidden="true">#</a> 3.3.4 访问测试</h4><p><img src="http://cdn1.ryanxin.live/1676444292477-d1741e62-31dd-4c06-8e05-ff85d8fb18e2.png" alt="" loading="lazy"><br><img src="http://cdn1.ryanxin.live/1676444442373-03d6e130-fea0-4e91-8f83-7121b860019d.png" alt="" loading="lazy"></p><p><a name="xadme"></a></p><h3 id="_3-4-证书更新" tabindex="-1"><a class="header-anchor" href="#_3-4-证书更新" aria-hidden="true">#</a> 3.4 证书更新</h3><p>假设网站的https证书即将过期，在不影响业务的前提下，可以直接更新其引用的Secret中保存的证书来实现网站https证书更新。在生产环境需要提前做好计划，并选择合适时间执行。</p><p>首先重新签发一套证书</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl genrsa <span class="token parameter variable">-out</span> www.myapp1.com-new.key <span class="token number">4096</span>
openssl req <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-new</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-subj</span> <span class="token string">&quot;/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=www.linux.io&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-key</span> www.myapp1.com-new.key <span class="token punctuation">\\</span>
<span class="token parameter variable">-out</span> www.myapp1.com-new.csr
openssl x509 <span class="token parameter variable">-req</span> <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-days</span> <span class="token number">100</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-CA</span> ca.crt <span class="token parameter variable">-CAkey</span> ca.key <span class="token parameter variable">-CAcreateserial</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-in</span> www.myapp1.com-new.csr <span class="token punctuation">\\</span>
<span class="token parameter variable">-out</span> www.myapp1.com-new.crt
<span class="token function">rm</span> <span class="token parameter variable">-f</span> www.myapp1.com-new.csr

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将证书和key的内容进行base64编码，然后编辑相应的Secret对象，修改tls.key和tls.crt的值为编码后的内容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master-01:~/resources/ingress-cert<span class="token comment"># base64 www.myapp1.com-new.key -w 0</span>
LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.ZLS0tLS0K
root@master-01:~/resources/ingress-cert<span class="token comment"># base64 www.myapp1.com-new.crt -w 0</span>
LS0tLS1CRUdJTiBDRVJ<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>FTkQgQ0VSVElGSUNBVEUtLS0tLQo<span class="token operator">=</span>
root@master-01:~<span class="token comment"># kubectl edit secret/cert-www.myapp1.com</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/1676445008460-e809acd8-60e2-4ef6-ac23-1faa36ddf2cc.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>和之前的访问结果进行对比，可以看到证书已经被更新</p>`,21);function S(P,I){const a=c("ExternalLinkIcon");return p(),l("div",null,[r,s("p",null,[n("Ingress官方文档："),s("a",u,[n("https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/"),e(a)]),d,n("Ingress控制器官方文档："),s("a",k,[n("https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress-controllers/"),e(a)])]),m,s("p",null,[n("目前可选择使用的Ingress控制器有很多，可以参考官方介绍："),s("a",v,[n("https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress-controllers/"),e(a)]),n(" ，下面以nginx Ingress控制器为例进行部署。")]),s("p",null,[n("nginx Ingress控制器github地址："),s("a",b,[n("https://github.com/kubernetes/ingress-nginx"),e(a)]),g,n("nginx Ingress控制器官方文档："),s("a",h,[n("https://kubernetes.github.io/ingress-nginx/"),e(a)])]),y,s("p",null,[s("a",x,[n("将访问www.app1.com"),e(a)]),n(" 域名的流量转发至tomcat-app1-svc，Ingress部署文件如下：")]),f,s("p",null,[s("a",w,[n("首先准备www.myapp1.com"),e(a)]),n(" 域名的证书，然后将证书保存为Secret")]),_])}const T=i(o,[["render",S],["__file","kubernetes-12.html.vue"]]);export{T as default};
