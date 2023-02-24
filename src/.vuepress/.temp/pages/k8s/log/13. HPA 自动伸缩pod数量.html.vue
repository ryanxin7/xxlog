<template><div><p><a name="aiJuT"></a></p>
<h2 id="_1-hpa简介" tabindex="-1"><a class="header-anchor" href="#_1-hpa简介" aria-hidden="true">#</a> 1.HPA简介</h2>
<p>HPA（Horizontal Pod Autoscaler），Pod水平自动缩放器，可以根据Pod的负载动态调整Pod的副本数量，业务高峰期自动扩容Pod副本以满足业务请求。在业务低峰期自动缩容Pod，实现节约资源的目的。</p>
<p>与HPA相对的是VPA （Vertical Pod Autoscaler），Pod垂直自动缩放器，可以基于Pod的资源利用率，调整对单个Pod的最大资源限制，不能与HPA同时使用。</p>
<p>HPA隶属于autoscaling API群组目前主要有v1和v2两个版本：</p>
<table>
<thead>
<tr>
<th>版本</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>autoscaling/v1</td>
<td>只支持基于CPU指标的缩放</td>
</tr>
<tr>
<td>autoscaling/v2</td>
<td>支持基于Resource Metrics（资源指标，例如Pod 的CPU和内存）、Custom Metrics（自定义指标）和External Metrics（额外指标）的缩放</td>
</tr>
</tbody>
</table>
<p><a name="BkLHa"></a></p>
<h2 id="_2-部署-metrics-server" tabindex="-1"><a class="header-anchor" href="#_2-部署-metrics-server" aria-hidden="true">#</a> 2.部署 metrics Server</h2>
<p>HPA需要通过Metrics Server来获取Pod的资源利用率，所以需要先部署Metrics Server。</p>
<p>Metrics Server是Kubernetes 集群核心监控数据的聚合器，它负责从kubelet收集资源指标，然后对这些指标监控数据进行聚合，并通过<strong>Metrics API</strong>将它们暴露在Kubernetes apiserver中，供水平Pod Autoscaler和垂直Pod Autoscaler使用。也可以通过kubectl top node/pod查看指标数据。</p>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676516280565-5ee4d1cd-bc2d-4c5e-8973-b0fd7a8a7e98.png#averageHue=%23d3a876&amp;clientId=u67668d2c-bcdc-4&amp;from=paste&amp;height=357&amp;id=ub3a28c73&amp;name=image.png&amp;originHeight=357&amp;originWidth=846&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=32855&amp;status=done&amp;style=none&amp;taskId=u79b9bdc4-c92d-4488-a074-d36ffe8cb01&amp;title=&amp;width=846" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p><a name="M29Y1"></a></p>
<h3 id="_2-1-准备镜像" tabindex="-1"><a class="header-anchor" href="#_2-1-准备镜像" aria-hidden="true">#</a> 2.1 准备镜像</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#从代理服务器上下载好镜像</span>

root@harbor01<span class="token punctuation">[</span><span class="token number">13</span>:32:22<span class="token punctuation">]</span>/proxy-images <span class="token comment">#:docker tag k8s.gcr.io/metrics-server/metrics-server:v0.6.2  harbor.ceamg.com/k8s-base/metrics-server:v0.6.2</span>

root@harbor01<span class="token punctuation">[</span><span class="token number">13</span>:32:59<span class="token punctuation">]</span>/proxy-images <span class="token comment">#:docker push harbor.ceamg.com/k8s-base/metrics-server:v0.6.2</span>
The push refers to repository <span class="token punctuation">[</span>harbor.ceamg.com/k8s-base/metrics-server<span class="token punctuation">]</span>
dc5ecd167a15: Pushed 
9fce6bd02a21: Pushed 
v0.6.2: digest: sha256:0542aeb0025f6dd4f75e100ca14d7abdbe0725c75783d13c35e82d391f4735bc size: <span class="token number">739</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下载yaml文件 <a href="https://github.com/kubernetes-sigs/metrics-server/releases" target="_blank" rel="noopener noreferrer">Metrics Server releases<ExternalLinkIcon/></a>.</p>
<p><strong>V6.0.2</strong> <a href="https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.6.2/components.yaml" target="_blank" rel="noopener noreferrer">https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.6.2/components.yaml<ExternalLinkIcon/></a></p>
<p>修改文件中的镜像地址为私有仓库</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">rbac.authorization.k8s.io/aggregate-to-admin</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
    <span class="token key atrule">rbac.authorization.k8s.io/aggregate-to-edit</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
    <span class="token key atrule">rbac.authorization.k8s.io/aggregate-to-view</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>aggregated<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>reader
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> metrics.k8s.io
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> pods
  <span class="token punctuation">-</span> nodes
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> get
  <span class="token punctuation">-</span> list
  <span class="token punctuation">-</span> watch
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>metrics<span class="token punctuation">-</span>server
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">""</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> nodes/metrics
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> get
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">""</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> pods
  <span class="token punctuation">-</span> nodes
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> get
  <span class="token punctuation">-</span> list
  <span class="token punctuation">-</span> watch
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server<span class="token punctuation">-</span>auth<span class="token punctuation">-</span>reader
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> extension<span class="token punctuation">-</span>apiserver<span class="token punctuation">-</span>authentication<span class="token punctuation">-</span>reader
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server<span class="token punctuation">:</span>system<span class="token punctuation">:</span>auth<span class="token punctuation">-</span>delegator
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>auth<span class="token punctuation">-</span>delegator
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>metrics<span class="token punctuation">-</span>server
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>metrics<span class="token punctuation">-</span>server
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> https
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> https
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
      <span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> <span class="token number">0</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">args</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>cert<span class="token punctuation">-</span>dir=/tmp
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>secure<span class="token punctuation">-</span>port=4443
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>kubelet<span class="token punctuation">-</span>preferred<span class="token punctuation">-</span>address<span class="token punctuation">-</span>types=InternalIP<span class="token punctuation">,</span>ExternalIP<span class="token punctuation">,</span>Hostname
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>kubelet<span class="token punctuation">-</span>use<span class="token punctuation">-</span>node<span class="token punctuation">-</span>status<span class="token punctuation">-</span>port
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>metric<span class="token punctuation">-</span>resolution=15s
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/k8s<span class="token punctuation">-</span>base/metrics<span class="token punctuation">-</span>server<span class="token punctuation">:</span>v0.6.2
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
        <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>
          <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /livez
            <span class="token key atrule">port</span><span class="token punctuation">:</span> https
            <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTPS
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">4443</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> https
          <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
        <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>
          <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /readyz
            <span class="token key atrule">port</span><span class="token punctuation">:</span> https
            <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTPS
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">20</span>
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
        <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
          <span class="token key atrule">allowPrivilegeEscalation</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
          <span class="token key atrule">readOnlyRootFilesystem</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">runAsNonRoot</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">runAsUser</span><span class="token punctuation">:</span> <span class="token number">1000</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /tmp
          <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>dir
      <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
        <span class="token key atrule">kubernetes.io/os</span><span class="token punctuation">:</span> linux
      <span class="token key atrule">priorityClassName</span><span class="token punctuation">:</span> system<span class="token punctuation">-</span>cluster<span class="token punctuation">-</span>critical
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>dir
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiregistration.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> APIService
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> v1beta1.metrics.k8s.io
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> metrics.k8s.io
  <span class="token key atrule">groupPriorityMinimum</span><span class="token punctuation">:</span> <span class="token number">100</span>
  <span class="token key atrule">insecureSkipTLSVerify</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
  <span class="token key atrule">version</span><span class="token punctuation">:</span> v1beta1
  <span class="token key atrule">versionPriority</span><span class="token punctuation">:</span> <span class="token number">100</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="R3cX7"></a></p>
<h3 id="_2-2-创建pod" tabindex="-1"><a class="header-anchor" href="#_2-2-创建pod" aria-hidden="true">#</a> 2.2 创建pod</h3>
<p>创建之后查看Pod状态：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">13</span>:41:51<span class="token punctuation">]</span>~/metrics <span class="token comment">#:kubectl apply -f metrics-v6.0.2.yaml </span>
serviceaccount/metrics-server created
clusterrole.rbac.authorization.k8s.io/system:aggregated-metrics-reader created
clusterrole.rbac.authorization.k8s.io/system:metrics-server created
rolebinding.rbac.authorization.k8s.io/metrics-server-auth-reader created
clusterrolebinding.rbac.authorization.k8s.io/metrics-server:system:auth-delegator created
clusterrolebinding.rbac.authorization.k8s.io/system:metrics-server created
service/metrics-server created
deployment.apps/metrics-server created
apiservice.apiregistration.k8s.io/v1beta1.metrics.k8s.io created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">13</span>:41:55<span class="token punctuation">]</span>~/metrics <span class="token comment">#:kubectl get pod -n kube-system </span>
NAME                                       READY   STATUS    RESTARTS      AGE
calico-kube-controllers-5c8bb696bb-hf2cp   <span class="token number">1</span>/1     Running   <span class="token number">1</span> <span class="token punctuation">(</span>42d ago<span class="token punctuation">)</span>   43d
calico-node-4ntd2                          <span class="token number">1</span>/1     Running   <span class="token number">0</span>             42d
calico-node-dwnq5                          <span class="token number">1</span>/1     Running   <span class="token number">0</span>             42d
calico-node-nskdq                          <span class="token number">1</span>/1     Running   <span class="token number">0</span>             42d
calico-node-slx2b                          <span class="token number">1</span>/1     Running   <span class="token number">0</span>             42d
coredns-6c496b89f6-hd8vf                   <span class="token number">1</span>/1     Running   <span class="token number">0</span>             42d
metrics-server-5cd7bd59b4-tzx2b            <span class="token number">1</span>/1     Running   <span class="token number">0</span>             2m24s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="KSUne"></a></p>
<h3 id="_2-3-验证资源指标" tabindex="-1"><a class="header-anchor" href="#_2-3-验证资源指标" aria-hidden="true">#</a> 2.3 验证资源指标</h3>
<p>验证metrics-server是否工作</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">13</span>:44:57<span class="token punctuation">]</span>~/metrics <span class="token comment">#:kubectl top node</span>
NAME        CPU<span class="token punctuation">(</span>cores<span class="token punctuation">)</span>   CPU%   MEMORY<span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>   MEMORY%   
<span class="token number">10.1</span>.0.30   229m         <span class="token number">2</span>%     3731Mi          <span class="token number">51</span>%       
<span class="token number">10.1</span>.0.31   323m         <span class="token number">4</span>%     3481Mi          <span class="token number">47</span>%       
<span class="token number">10.1</span>.0.32   417m         <span class="token number">5</span>%     4713Mi          <span class="token number">64</span>%       
<span class="token number">10.1</span>.0.33   331m         <span class="token number">4</span>%     5453Mi          <span class="token number">75</span>% 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676526546778-814391aa-f544-40cb-b538-c2996ac10d20.png#averageHue=%23e2c9a3&amp;clientId=u261faa54-159e-4&amp;from=paste&amp;height=917&amp;id=u220cc817&amp;name=image.png&amp;originHeight=917&amp;originWidth=1919&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=178404&amp;status=done&amp;style=none&amp;taskId=u2554f322-32ed-4572-9c97-b9e6d2bd56e&amp;title=&amp;width=1919" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>可以获取node和pod的资源指标就表示metrics-server可以正常工作</p>
<p><a name="tL0k8"></a></p>
<h2 id="_3-hpa配置参数" tabindex="-1"><a class="header-anchor" href="#_3-hpa配置参数" aria-hidden="true">#</a> 3. HPA配置参数</h2>
<p>HPA控制器有一些重要配置参数，用于控制Pod缩放的行为，这些参数都可以在kube-controller的启动参数中配置：</p>
<ul>
<li><code v-pre>**–horizontal-pod-autoscaler-sync-period**</code>：查询Pod资源利用率的时间间隔，默认15s查询一次</li>
<li><code v-pre>**–horizontal-pod-autoscaler-downscale-stabilization**</code>：两次缩容操作之间的最小间隔周期，默认5m</li>
<li><code v-pre>**–horizontal-pod-autoscaler-cpu-initialization-period**</code>：初始化延迟时间，在此期间内Pod的CPU指标将不生效，默认5m</li>
<li><code v-pre>**–horizontal-pod-autoscaler-initial-readiness-delay**</code>：用于设置Pod初始化时间，在此期间内内的Pod被认为未就绪不会被采集数据，默认30s</li>
<li><code v-pre>**–horizontal-pod-autoscaler-tolerance**</code>：HPA控制器能容忍的数据差异（浮点数，默认0.1），即当前指标与阈值的差异要在0.1之内，比如阈值设置的是CPU利率50%，如果当前CPU利用率为80%，那么80/50=1.6&gt;1.1，就会触发扩容；如果当前CPU利用率为40%，40/50=0.8&lt;0.9，就会触发缩容。大于1.1扩容，小于0.9缩容</li>
</ul>
<p><a name="aernP"></a></p>
<h3 id="_3-1-hpa示例" tabindex="-1"><a class="header-anchor" href="#_3-1-hpa示例" aria-hidden="true">#</a> 3.1 HPA示例</h3>
<p>下面使用HAP v1版本通过CPU指标实现Pod自动扩缩容。
<a name="XinNq"></a></p>
<h4 id="_3-1-1-自动缩容示例" tabindex="-1"><a class="header-anchor" href="#_3-1-1-自动缩容示例" aria-hidden="true">#</a> 3.1.1 自动缩容示例</h4>
<p>先部署一个5副本的nginx deployment，再通过HPA实现缩容：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deploy
  labels:
    app: nginx
spec:
  replicas: <span class="token number">5</span>
  selector:
    matchExpressions:
    - <span class="token punctuation">{</span>key: <span class="token string">"app"</span>, operator: In, values: <span class="token punctuation">[</span><span class="token string">"nginx"</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: harbor.ceamg.com/pub-images/nginx-base:1.22.1
        ports:
        - name: http
          containerPort: <span class="token number">80</span>
        resources:	<span class="token comment">#如果要通过hpa实现pod的自动扩缩容，在必须对Pod设置资源限制，否则pod不会被hpa统计</span>
          requests:
            cpu: 500m
            memory: 512Mi
          limits:
            cpu: <span class="token number">1</span>
            memory: 1Gi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">13</span>:56:32<span class="token punctuation">]</span>~/metrics/test <span class="token comment">#:kubectl get pod </span>
NAME                            READY   STATUS    RESTARTS        AGE
emptydirtest                    <span class="token number">1</span>/1     Running   <span class="token number">4</span> <span class="token punctuation">(</span>6h40m ago<span class="token punctuation">)</span>   16d
net-test2                       <span class="token number">1</span>/1     Running   <span class="token number">10</span> <span class="token punctuation">(</span>31h ago<span class="token punctuation">)</span>    42d
net-test3                       <span class="token number">1</span>/1     Running   <span class="token number">10</span> <span class="token punctuation">(</span>31h ago<span class="token punctuation">)</span>    42d
net-test4                       <span class="token number">1</span>/1     Running   <span class="token number">10</span> <span class="token punctuation">(</span>31h ago<span class="token punctuation">)</span>    42d
nginx-deploy-74d4966b8c-2qs8m   <span class="token number">1</span>/1     Running   <span class="token number">0</span>               33s
nginx-deploy-74d4966b8c-7fcpl   <span class="token number">1</span>/1     Running   <span class="token number">0</span>               33s
nginx-deploy-74d4966b8c-pn6nx   <span class="token number">1</span>/1     Running   <span class="token number">0</span>               33s
nginx-deploy-74d4966b8c-qtdps   <span class="token number">1</span>/1     Running   <span class="token number">0</span>               33s
nginx-deploy-74d4966b8c-rhgm4   <span class="token number">1</span>/1     Running   <span class="token number">0</span>               33s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>hpa部署文件如下，在hpa中定义了Pod cpu利用率阈值为80%，最小副本数为3，最大副本数为10：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> autoscaling/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> HorizontalPodAutoscaler
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>autoscaler<span class="token punctuation">-</span>demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">minReplicas</span><span class="token punctuation">:</span> <span class="token number">3</span>	<span class="token comment">#最小副本数</span>
  <span class="token key atrule">maxReplicas</span><span class="token punctuation">:</span> <span class="token number">10</span>	<span class="token comment">#最大副本数</span>
  <span class="token key atrule">scaleTargetRef</span><span class="token punctuation">:</span>	<span class="token comment">#hpa监控的资源对象</span>
    <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deploy
  <span class="token key atrule">targetCPUUtilizationPercentage</span><span class="token punctuation">:</span> <span class="token number">80</span>	<span class="token comment">#cpu利用率阈值</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建完成后，查看hpa资源：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">15</span>:23:46<span class="token punctuation">]</span>~/metrics/test <span class="token comment">#:kubectl get hpa -o wide                                    </span>
NAME                  REFERENCE                 TARGETS   MINPODS   MAXPODS   REPLICAS   AGE       
pod-autoscaler-demo   Deployment/nginx-deploy   <span class="token number">0</span>%/80%    <span class="token number">3</span>         <span class="token number">10</span>        <span class="token number">5</span>          21s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为之前创建的nginx pod访问量较低，cpul利用率肯定不超过80%，所以等待一段时间就会触发缩容  <br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676532911192-26193a95-e0a2-4179-bf88-8e266f44b84a.png#averageHue=%232b2e39&amp;clientId=u261faa54-159e-4&amp;from=paste&amp;height=392&amp;id=ue5c00e22&amp;name=image.png&amp;originHeight=392&amp;originWidth=1142&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=48363&amp;status=done&amp;style=none&amp;taskId=u83a25ebb-431d-41c4-9b05-233c4ead160&amp;title=&amp;width=1142" alt="image.png" loading="lazy"></p>
<p>因为在hpa中定义的最小副本数为3，所以缩容到3个Pod就不会缩容了</p>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676532937099-f0a2d6da-da9e-4509-a36d-da0886cc412d.png#averageHue=%2332343f&amp;clientId=u261faa54-159e-4&amp;from=paste&amp;height=193&amp;id=u1e7a2f8f&amp;name=image.png&amp;originHeight=193&amp;originWidth=640&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=28156&amp;status=done&amp;style=none&amp;taskId=u8665b884-333a-4b6d-b620-7487758b605&amp;title=&amp;width=640" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p><a name="NH9Rb"></a></p>
<h4 id="_3-1-2-自动扩容示例" tabindex="-1"><a class="header-anchor" href="#_3-1-2-自动扩容示例" aria-hidden="true">#</a> 3.1.2 自动扩容示例</h4>
<p>使用stress-ng镜像部署3个pod来测试自动扩容，stress-ng是一个压测工具</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> stress<span class="token punctuation">-</span>ng<span class="token punctuation">-</span>deploy
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> stress<span class="token punctuation">-</span>ng
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token punctuation">{</span><span class="token key atrule">key</span><span class="token punctuation">:</span> <span class="token string">"app"</span><span class="token punctuation">,</span> <span class="token key atrule">operator</span><span class="token punctuation">:</span> In<span class="token punctuation">,</span> <span class="token key atrule">values</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"stress-ng"</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> stress<span class="token punctuation">-</span>ng
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> stress<span class="token punctuation">-</span>ng
        <span class="token key atrule">image</span><span class="token punctuation">:</span> lorel/docker<span class="token punctuation">-</span>stress<span class="token punctuation">-</span>ng
        <span class="token key atrule">args</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"--vm"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"--vm-bytes"</span><span class="token punctuation">,</span> <span class="token string">"512M"</span><span class="token punctuation">]</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 500m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 512Mi
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token number">1</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 1Gi

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><br />```</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>root@master01[16:34:20]~/metrics/test #:kubectl get pod                                                                                                                                                                                                                     
NAME                                READY   STATUS    RESTARTS       AGE                                                                                                                                                                                                                                                                                                                                                                                                     
stress-ng-deploy-5c9d6db588-dmwh8   1/1     Running   0              30s                                                                                                                                                                                                    
stress-ng-deploy-5c9d6db588-mfr7m   1/1     Running   0              30s                                                                                                                                                                                                    
stress-ng-deploy-5c9d6db588-vg82w   1/1     Running   0              30s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>hpa部署文件如下：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> autoscaling/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> HorizontalPodAutoscaler
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>autoscaler<span class="token punctuation">-</span>demo1
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">minReplicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">maxReplicas</span><span class="token punctuation">:</span> <span class="token number">10</span>
  <span class="token key atrule">scaleTargetRef</span><span class="token punctuation">:</span>
    <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
    <span class="token key atrule">name</span><span class="token punctuation">:</span> stress<span class="token punctuation">-</span>ng<span class="token punctuation">-</span>deploy
  <span class="token key atrule">targetCPUUtilizationPercentage</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看hpa资源：  <br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676536647445-101ff26a-c0fe-4bb2-94d9-3107defa651d.png#averageHue=%23343743&amp;clientId=u261faa54-159e-4&amp;from=paste&amp;height=69&amp;id=uc080ded6&amp;name=image.png&amp;originHeight=69&amp;originWidth=707&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=12938&amp;status=done&amp;style=none&amp;taskId=ua5e942bd-1b3a-4cd8-b36e-67766b6e4ba&amp;title=&amp;width=707" alt="image.png" loading="lazy"><br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676536873005-3161c453-e717-4da2-a40f-3fb3ef15d72a.png#averageHue=%232b2d39&amp;clientId=u261faa54-159e-4&amp;from=paste&amp;height=496&amp;id=uf4d9a50c&amp;name=image.png&amp;originHeight=496&amp;originWidth=1886&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=75328&amp;status=done&amp;style=none&amp;taskId=ud8cb4b54-17db-4833-9ea1-de2c9273627&amp;title=&amp;width=1886" alt="image.png" loading="lazy"><br /> stress-ng会将Pod的cpu利用率打满，所以等待一段时间hpa就会逐步提高pod的副本数，如下图所示，但是在hpa中定义的最大副本数为10，所以最多扩容到10个Pod就不会扩容了  <br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676536708283-cc4704cc-5098-49bf-bac3-3cdcebdf987b.png#averageHue=%2332343f&amp;clientId=u261faa54-159e-4&amp;from=paste&amp;height=327&amp;id=u2ed43d87&amp;name=image.png&amp;originHeight=327&amp;originWidth=714&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=51077&amp;status=done&amp;style=none&amp;taskId=u1eb37a76-c00a-4fc3-86a2-b6cd3757cad&amp;title=&amp;width=714" alt="image.png" loading="lazy"></p>
<p>删除一直处于Terminating 状态的pod</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">16</span>:54:36<span class="token punctuation">]</span>~/metrics/test <span class="token comment">#:kubectl get pod </span>
NAME                                READY   STATUS        RESTARTS       AGE
emptydirtest                        <span class="token number">1</span>/1     Terminating   <span class="token number">4</span> <span class="token punctuation">(</span>9h ago<span class="token punctuation">)</span>     17d
net-test2                           <span class="token number">1</span>/1     Terminating   <span class="token number">10</span> <span class="token punctuation">(</span>34h ago<span class="token punctuation">)</span>   43d
net-test3                           <span class="token number">1</span>/1     Terminating   <span class="token number">10</span> <span class="token punctuation">(</span>34h ago<span class="token punctuation">)</span>   43d
net-test4                           <span class="token number">1</span>/1     Running       <span class="token number">10</span> <span class="token punctuation">(</span>35h ago<span class="token punctuation">)</span>   43d
nginx-deploy-74d4966b8c-2qs8m       <span class="token number">1</span>/1     Running       <span class="token number">0</span>              3h5m
nginx-deploy-74d4966b8c-k28hh       <span class="token number">1</span>/1     Running       <span class="token number">0</span>              14m
nginx-deploy-74d4966b8c-pn6nx       <span class="token number">1</span>/1     Terminating   <span class="token number">0</span>              3h5m
nginx-deploy-74d4966b8c-rhgm4       <span class="token number">1</span>/1     Running       <span class="token number">0</span>              3h5m
stress-ng-deploy-5c9d6db588-7q4hq   <span class="token number">1</span>/1     Terminating   <span class="token number">0</span>              24m
stress-ng-deploy-5c9d6db588-dmwh8   <span class="token number">1</span>/1     Terminating   <span class="token number">0</span>              27m
stress-ng-deploy-5c9d6db588-m952t   <span class="token number">1</span>/1     Terminating   <span class="token number">0</span>              24m
stress-ng-deploy-5c9d6db588-mwbgd   <span class="token number">1</span>/1     Terminating   <span class="token number">0</span>              24m
stress-ng-deploy-5c9d6db588-vg82w   <span class="token number">1</span>/1     Terminating   <span class="token number">0</span>              27m
stress-ng-deploy-5c9d6db588-z8n2r   <span class="token number">0</span>/1     Terminating   <span class="token number">0</span>              24m
tomcat-app1-6fd79cfbd4-8tg64        <span class="token number">1</span>/1     Terminating   <span class="token number">0</span>              2d
tomcat-app1-6fd79cfbd4-sts9v        <span class="token number">1</span>/1     Running       <span class="token number">0</span>              14m
tomcat-app2-54b548dfbf-zsgpd        <span class="token number">1</span>/1     Running       <span class="token number">0</span>              2d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@etcd01<span class="token punctuation">[</span><span class="token number">17</span>:03:05<span class="token punctuation">]</span>~ <span class="token comment">#:/usr/local/bin/etcdctl get /registry/pods/default/stress --prefix --keys-only</span>
/registry/pods/default/stress-ng-deploy-5c9d6db588-7q4hq

/registry/pods/default/stress-ng-deploy-5c9d6db588-dmwh8

/registry/pods/default/stress-ng-deploy-5c9d6db588-m952t

/registry/pods/default/stress-ng-deploy-5c9d6db588-mwbgd

/registry/pods/default/stress-ng-deploy-5c9d6db588-vg82w

/registry/pods/default/stress-ng-deploy-5c9d6db588-z8n2r
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 删除 namespace下的pod名为pod-to-be-deleted-0</span>
    <span class="token builtin class-name">export</span> <span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">3</span> 
etcdctl del /registry/pods/default/stress-ng-deploy-5c9d6db588-z8n2r
etcdctl del  /registry/pods/default/stress-ng-deploy-5c9d6db588-7q4hq
etcdctl del /registry/pods/default/stress-ng-deploy-5c9d6db588-dmwh8
etcdctl del /registry/pods/default/stress-ng-deploy-5c9d6db588-mwbgd
etcdctl del /registry/pods/default/stress-ng-deploy-5c9d6db588-vg82w
etcdctl del /registry/pods/default/stress-ng-deploy-5c9d6db588-m952t
            
root@etcd01<span class="token punctuation">[</span><span class="token number">17</span>:03:37<span class="token punctuation">]</span>~ <span class="token comment">#:etcdctl del /registry/pods/default/stress-ng-deploy-5c9d6db588-z8n2r</span>
<span class="token number">1</span>
root@etcd01<span class="token punctuation">[</span><span class="token number">17</span>:04:54<span class="token punctuation">]</span>~ <span class="token comment">#:etcdctl del  /registry/pods/default/stress-ng-deploy-5c9d6db588-7q4hq</span>
<span class="token number">1</span>
root@etcd01<span class="token punctuation">[</span><span class="token number">17</span>:04:54<span class="token punctuation">]</span>~ <span class="token comment">#:etcdctl del /registry/pods/default/stress-ng-deploy-5c9d6db588-dmwh8</span>
<span class="token number">1</span>
root@etcd01<span class="token punctuation">[</span><span class="token number">17</span>:04:54<span class="token punctuation">]</span>~ <span class="token comment">#:etcdctl del /registry/pods/default/stress-ng-deploy-5c9d6db588-mwbgd</span>
<span class="token number">1</span>
root@etcd01<span class="token punctuation">[</span><span class="token number">17</span>:04:54<span class="token punctuation">]</span>~ <span class="token comment">#:etcdctl del /registry/pods/default/stress-ng-deploy-5c9d6db588-vg82w</span>
<span class="token number">1</span>
root@etcd01<span class="token punctuation">[</span><span class="token number">17</span>:04:54<span class="token punctuation">]</span>~ <span class="token comment">#:etcdctl del /registry/pods/default/stress-ng-deploy-5c9d6db588-m952t</span>
<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除后查看</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@etcd01<span class="token punctuation">[</span><span class="token number">17</span>:05:07<span class="token punctuation">]</span>~ <span class="token comment">#:/usr/local/bin/etcdctl get /registry/pods/default/ --prefix --keys-only</span>
/registry/pods/default/emptydirtest

/registry/pods/default/net-test2

/registry/pods/default/net-test3

/registry/pods/default/net-test4

/registry/pods/default/nginx-deploy-74d4966b8c-2qs8m

/registry/pods/default/nginx-deploy-74d4966b8c-k28hh

/registry/pods/default/nginx-deploy-74d4966b8c-pn6nx

/registry/pods/default/nginx-deploy-74d4966b8c-rhgm4

/registry/pods/default/tomcat-app1-6fd79cfbd4-8tg64

/registry/pods/default/tomcat-app1-6fd79cfbd4-sts9v

/registry/pods/default/tomcat-app2-54b548dfbf-zsgpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


