<template><div><p><strong>Pod状态</strong><br /><img src="http://cdn1.ryanxin.live/1674895053415-2477036f-d642-41c9-90c7-942d1a238360.png" alt="Pod状态" loading="lazy"></p>
<blockquote>
<p>**第一阶段 **</p>
<ol>
<li>**Pending  **正在创建Pod但是Pod中的容器还没有全部被创建完成=[处于此状态的Pod应该检查Pod依赖的存储是否有权限挂载、镜像是否可以下载、调度是否正常等。</li>
<li>**Failed **Pod中有容器启动失败而导致pod工作异常。</li>
<li>**Unknown **由于某种原因无法获得pod的当前状态，通常是由于与pod所在的node节点通信错误。</li>
<li><strong>Succeeded</strong> Pod中的所有容器都被成功终止即pod里所有的containers均已terminated.</li>
</ol>
</blockquote>
<blockquote>
<p><strong>第二阶段</strong></p>
<ol>
<li>**Unschedulable **Pod不能被调度，kube-scheduler没有匹配到合适的node节点。</li>
<li><strong>Podscheduled</strong> pod正处于调度中，在kube-scheduler刚开始调度的时候，还没有将pod分配到指定的node，在筛选出合适的节点后就会更新etcd数据，将pod分配到指定的node。</li>
<li><strong>Initialized <strong>所有pod中的初始化容器已经完成了</strong>。</strong></li>
<li>**ImagePullBackoff **Pod所在的node节点下载镜像失败</li>
<li>**Running **Pod内部的容器已经被创建并且启动。</li>
<li>**Ready **表示pod中的容器已经可以提供访问服务</li>
</ol>
</blockquote>
<figure><img src="http://cdn1.ryanxin.live/1674895376985-f56a789b-45f8-418b-836c-22314b8775f4.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Error: <span class="token comment">#pod 启动过程中发生错误</span>
NodeLost: <span class="token comment">#Pod 所在节点失联</span>
Unkown: <span class="token comment">#Pod 所在节点失联或其它未知异常</span>
waiting: <span class="token comment">#Pod 等待启动</span>
Pending: <span class="token comment">#Pod 等待被调度</span>
Terminating: <span class="token comment">#Pod 正在被销毁</span>
CrashLoopBackoff: <span class="token comment">#pod，但是kubelet正在将它重启</span>
InvalidImageName: <span class="token comment">#node节点无法解析镜像名称导致的镜像无法下载</span>
ImageInspectError: <span class="token comment">#无法校验镜像，镜像不完整导致</span>
ErrImageNeverPull: <span class="token comment">#策略禁止拉取镜像，镜像中心权限是私有等</span>
ImagePullBackoff: <span class="token comment">#镜像拉取失败，但是正在重新拉取</span>
RegistryUnavailable: <span class="token comment">#镜像服务器不可用，网络原因或harbor宕机</span>
ErrImagePull: <span class="token comment">#镜像拉取出错，超时或下载被强制终止</span>
CreateContainerConfigError: <span class="token comment">#不能创建kubelet使用的容器配置</span>
CreateContainerError: <span class="token comment">#创建容器失败</span>
PreStartContainer: <span class="token comment">#执行prestart hook报错，Pod hook(钩子)是由 Kubernetes 管理的 kubelet 发起的，当容器中的进程启动前或者容器中的进程终止之前运行，比如容器创建完成后里面的服务启动之前可以检查一下依赖的其它服务是否启动，或者容器退出之前可以把容器中的服务先通过命令停止。</span>
PoststartHookError: <span class="token comment">#执行 poststart hook 报错</span>

RunContainerError: <span class="token comment">#pod运行失败，容器中没有初始化PID为1的守护进程等</span>
ContainersNotInitialized: <span class="token comment">#pod没有初始化完毕</span>
ContainersNotReady: <span class="token comment">#pod没有准备完毕</span>
ContainerCreating: <span class="token comment">#pod正在创建中</span>
PodInitializing: <span class="token comment">#pod正在初始化中</span>
DockerDaemonNotReady: <span class="token comment">#node节点decker服务没有启动</span>
NetworkPluginNotReady: <span class="token comment">#网络插件还没有完全启动</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="G2mEC"></a></p>
<h2 id="pod-探针" tabindex="-1"><a class="header-anchor" href="#pod-探针" aria-hidden="true">#</a> Pod 探针</h2>
<p><a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/<ExternalLinkIcon/></a></p>
<p><a name="BKb32"></a></p>
<h3 id="探针简介" tabindex="-1"><a class="header-anchor" href="#探针简介" aria-hidden="true">#</a> 探针简介</h3>
<p>探针 是由 kubelet 对容器执行的定期诊断，以保证Pod的状态始终处于运行状态，要执行诊断，kubelet 调用由容器实现的Handler(处理程序)，有三种类型的处理程序:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ExecAction
<span class="token comment">#在容器内执行指定命令，如果命令退出时返回码为0则认为诊断成功。</span>

TcPSocketAction
<span class="token comment">#对指定端口上的容器的IP地址进行TCP检查，如果端口打开，则诊断被认为是成功的。</span>

HTTPGetAction
<span class="token comment">#对指定的端口和路径上的容器的IP地址执行HTTPGet请求，如果响应的状态码大于等于200且小于 400，则诊断被认为是成功的。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>每次探测都将获得以下三种结果之一：</strong></p>
<ul>
<li>成功: 容器通过了诊断</li>
<li>失败: 容器未通过诊断</li>
<li>未知: 诊断失败，因此不会采取任何行动</li>
</ul>
<p><a name="chN72"></a></p>
<h2 id="配置探针" tabindex="-1"><a class="header-anchor" href="#配置探针" aria-hidden="true">#</a> 配置探针</h2>
<p>实现对Pod的状态检测</p>
<p><a name="QYrCG"></a></p>
<h3 id="探针类型" tabindex="-1"><a class="header-anchor" href="#探针类型" aria-hidden="true">#</a> 探针类型</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>livenessProbe
<span class="token comment">#存活探针，检测容器容器是否正在运行，如果存活探测失败，则kubelet会杀死容器，并且容器将受到其重启策略的影响，如果容器不提供存活探针，则默认状态为 Success，livenessProbe用于控制是否重启pod。</span>

readinessProbe
<span class="token comment">#就绪探针，如果就绪探测失败，端点控制器将从与Pod匹配的所有Service的端点中删除该Pod的IP地址，初始延迟之前的就绪状态默认为Failure(失败)，如果容器不提供就绪探针，则默认状态为 Success，readinessProbe用于控制pod是否添加至service。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="yfbZa"></a></p>
<h3 id="探针配置" tabindex="-1"><a class="header-anchor" href="#探针配置" aria-hidden="true">#</a> 探针配置</h3>
<p><a href="https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/<ExternalLinkIcon/></a><br />探针有很多配置字段，可以使用这些字段精确的控制存活和就绪检测的行为</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>initialDelaySeconds: <span class="token number">120</span>
<span class="token comment">#初始化延迟时间，告诉kubelet在执行第一次探测前应该等待多少秒，默认是0秒，最小值是0</span>

periodseconds: <span class="token number">60</span>
<span class="token comment">#探测周期间隔时间，指定了kubelet应该每多少秒秒执行一次存活探测，默认是 10 秒。最小值是 1</span>

timeoutseconds: <span class="token number">5</span>
<span class="token comment">#单次探测超时时间，探测的超时后等待多少秒，默认值是1秒，最小值是1。</span>

successThreshold: <span class="token number">1</span>
<span class="token comment">#从失败转为成功的重试次数，探测器在失败后，被视为成功的最小连续成功数，默认值是1，存活探测的这个值必须是1，最小值是 1。</span>

failureThreshold: <span class="token number">3</span> 
<span class="token comment">#从成功转为失败的重试次数，当Pod启动了并目探测到失败，Kubernetes的重试次数，存活探测情况下的放弃就意味着重新启动容器，就绪探测情况下的放弃Pod 会被打上未就绪的标签，默认值是3，最小值是1。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="OZqi3"></a></p>
<h3 id="http-探测器可以在-httpget-上配置额外的字段" tabindex="-1"><a class="header-anchor" href="#http-探测器可以在-httpget-上配置额外的字段" aria-hidden="true">#</a> HTTP 探测器可以在 httpGet 上配置额外的字段</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>
host:
<span class="token comment">#连接使用的主机名，默认是Pod的 IP，也可以在HTTP头中设置 “Host” 来代替</span>

scheme: http
<span class="token comment">#用于设置连接主机的方式 (HTTP 还是 HTTPS)，默认是 HTTP。</span>

path: /monitor/index.html
<span class="token comment">#访问 HTTP 服务的路径。</span>

httpHeaders <span class="token builtin class-name">:</span>
<span class="token comment">#请求中自定义的 HTTP 头，HTTP 头字段允许重复</span>

port: <span class="token number">80</span>
<span class="token comment">#访问容器的端口号或者端口名，如果数字必须在 1 ~ 65535 之间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="YXQF3"></a></p>
<h3 id="http探针示例" tabindex="-1"><a class="header-anchor" href="#http探针示例" aria-hidden="true">#</a> HTTP探针示例</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token comment">#apiVersion: extensions/v1beta1</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span> <span class="token comment">#rs or deployment</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
    <span class="token comment">#matchExpressions:</span>
    <span class="token comment"># - {key: app, operator: In, values: [ng-deploy-80,ng-rs-81]}</span>
   <span class="token key atrule">template</span><span class="token punctuation">:</span>
     <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
       <span class="token key atrule">labels</span><span class="token punctuation">:</span>
         <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
     <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.5
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
        <span class="token comment">#readinessProbe:</span>
        <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
            <span class="token comment">#path: /monitor/monitor.html</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /index.html
            <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">3</span>
          <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
          <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span>
          <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>

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
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">40012</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证http探针： <br /> <img src="http://cdn1.ryanxin.live/1674961913237-ed82df48-ae02-4275-aa5c-2099f4fd5fae.png" alt="" loading="lazy"></p>
<p><a name="NhUhS"></a></p>
<h3 id="tcp-探针示例" tabindex="-1"><a class="header-anchor" href="#tcp-探针示例" aria-hidden="true">#</a> TCP 探针示例</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span> <span class="token comment">#rs or deployment</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
    <span class="token comment">#matchExpressions:</span>
    <span class="token comment"># - {key: app, operator: In, values: [ng-deploy-80,ng-rs-81]}</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.17.5
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
        <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
        <span class="token comment">#readinessProbe:</span>
          <span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
            <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
            <span class="token comment">#port: 8080</span>
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">3</span>
          <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
          <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span>
          <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>

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
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">40012</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> ng<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="ByqZI"></a></p>
<h3 id="execaction探针" tabindex="-1"><a class="header-anchor" href="#execaction探针" aria-hidden="true">#</a> ExecAction探针 <br /></h3>
<p>可以基于指定的命令对Pod进⾏特定的状态检查。</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span> <span class="token comment">#rs or deployment</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">6379</span>
    <span class="token comment">#matchExpressions:</span>
    <span class="token comment"># - {key: app, operator: In, values: [redis-deploy-6379,ng-rs-81]}</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">6379</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">6379</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
        <span class="token key atrule">ports</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">6379</span>
      <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
      <span class="token comment">#readinessProbe:</span>
        <span class="token key atrule">exec</span><span class="token punctuation">:</span>
          <span class="token key atrule">command</span><span class="token punctuation">:</span>
          <span class="token comment">#- /apps/redis/bin/redis-cli</span>
          <span class="token punctuation">-</span> /usr/local/bin/redis<span class="token punctuation">-</span>cli
          <span class="token punctuation">-</span> quit
        <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
        <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">3</span>
        <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
        <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span>
        <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">6379</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">40016</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span><span class="token number">6379</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果端⼝检测连续超过指定的三次都没有通过，则Pod状态如下： <br /> <img src="http://cdn1.ryanxin.live/1674961899934-85e91869-b0af-44bb-ad5b-21f9466b891b.png" alt="" loading="lazy"></p>
<p><a name="iTPbt"></a></p>
<h3 id="livenessprobe和readinessprobe的对比" tabindex="-1"><a class="header-anchor" href="#livenessprobe和readinessprobe的对比" aria-hidden="true">#</a> livenessProbe和readinessProbe的对⽐ <br /><br /></h3>
<blockquote>
<ol>
<li><strong>配置参数⼀样</strong></li>
<li>livenessProbe <strong>连续探测失败会重启、重建pod， readinessProbe不会执⾏重启或者重建Pod操作</strong><br />livenessProbe <strong>连续检测指定次数失败后会将容器置于(Crash Loop BackOff)且不可⽤，readinessProbe不会</strong></li>
<li>readinessProbe <strong>连续探测失败会从service的endpointd中删除该Pod， livenessProbe不具备此功能，但是会将容器挂起livenessProbe</strong></li>
</ol>
</blockquote>
<blockquote>
<ol start="4">
<li><strong>livenessProbe⽤户控制是否重启pod， readinessProbe⽤于控制pod是否添加⾄service</strong></li>
</ol>
</blockquote>
<blockquote></blockquote>
<p>**建议：<br />两个探针都配置 **</p>
<p><a name="HKHSU"></a></p>
<h2 id="pod重启策略" tabindex="-1"><a class="header-anchor" href="#pod重启策略" aria-hidden="true">#</a> Pod重启策略</h2>
<p>k8s在Pod出现异常的时候会⾃动将Pod重启以恢复Pod中的服务。 <br />
:::success
<strong>restartPolicy</strong><br /><strong>Always</strong>：<strong>当容器异常时， k8s⾃动重启该容器， ReplicationController/Replicaset/Deployment。</strong><br /><strong>OnFailure</strong>：<strong>当容器失败时(容器停⽌运⾏且退出码不为0)， k8s⾃动重启该容器。</strong><br /><strong>Never</strong>：<strong>不论容器运⾏状态如何都不会重启该容器,Job或CronJob。</strong>
:::
<a name="fEK6r"></a></p>
<h2 id="镜像拉取策略" tabindex="-1"><a class="header-anchor" href="#镜像拉取策略" aria-hidden="true">#</a> 镜像拉取策略</h2>
<blockquote>
<p><strong>IfNotPresent</strong> <strong>node节点没有此镜像就去指定的镜像仓库拉取， node有就使⽤node本地镜像。</strong><br /><strong>Always</strong> <strong>每次重建pod都会重新拉取镜像</strong><br /><strong>Never</strong> **从不到镜像中⼼拉取镜像，只使⽤本地镜像 **</p>
</blockquote>
</div></template>


