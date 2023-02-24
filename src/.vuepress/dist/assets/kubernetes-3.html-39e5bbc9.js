import{_ as t,V as p,W as c,Z as n,a0 as s,Y as l,$ as a,C as o}from"./framework-7e159c24.js";const i={},u=a(`<p><a name="OkmdV"></a></p><h2 id="_1-yaml格式" tabindex="-1"><a class="header-anchor" href="#_1-yaml格式" aria-hidden="true">#</a> 1. yaml格式</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>人员名单:
  张三:
    年龄: <span class="token number">18</span> <span class="token comment">#</span>
    职业: Linux运维工程师
    爱好:
      - 看书
      - 学习
      - 加班
     
  李四:
    年龄: <span class="token number">20</span>
    职业: Java开发工程师 <span class="token comment"># 这是职业</span>
    爱好:
      - 开源技术
      - 微服务
      - 分布式存储


大小写敏感
使用缩进表示层级关系
 缩进时不允许使用Tal键，只允许使用空格
 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可
 使用”<span class="token comment">#” 表示注释，从这个字符一直到行尾，都会被解析器忽略</span>
 比json更适用于配置文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="XQ7VV"></a></p><h3 id="yaml文件主要特性" tabindex="-1"><a class="header-anchor" href="#yaml文件主要特性" aria-hidden="true">#</a> yaml文件主要特性</h3><p>k8s中的yaml文件以及其他场景的yaml文件， 大部分都是以下类型：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>上下级关系列表
键值对<span class="token punctuation">(</span>也称为maps， 即key：value格式的键值对数据<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>容器在运行时是基于宿主机的内核的namespace隔离环境 pid ，如果只有环境没有服务就退出了</p><p><a name="tZK7l"></a></p><h2 id="_2-yaml与json对比" tabindex="-1"><a class="header-anchor" href="#_2-yaml与json对比" aria-hidden="true">#</a> 2.yaml与json对比</h2>`,10),k={href:"http://www.bejson.com/validators/yaml_editor/",target:"_blank",rel:"noopener noreferrer"},m=n("br",null,null,-1),r=n("strong",null,"json格式",-1),d=a(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">{</span> <span class="token key atrule">&#39;人员名单&#39;</span><span class="token punctuation">:</span> 
	<span class="token punctuation">{</span> <span class="token key atrule">&#39;张三&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token key atrule">&#39;年龄&#39;</span><span class="token punctuation">:</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token key atrule">&#39;职业&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Linux运维工程师&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">&#39;爱好&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;看书&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;学习&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;加班&#39;</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
	  <span class="token key atrule">&#39;李四&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token key atrule">&#39;年龄&#39;</span><span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token key atrule">&#39;职业&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Java开发工程师&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">&#39;爱好&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&#39;开源技术&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;微服务&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;分布式存 储&#39;</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="iDvWw"></a></p><h3 id="json特点" tabindex="-1"><a class="header-anchor" href="#json特点" aria-hidden="true">#</a> json特点</h3><p><br>json 不能注释<br>json 可读性较差<br>json 语法很严格<br>比较适用于API 返回值，也可用于配置文件</p><p><a name="IIdee"></a></p><h2 id="_3-实践-4创建namespace-yaml文件" tabindex="-1"><a class="header-anchor" href="#_3-实践-4创建namespace-yaml文件" aria-hidden="true">#</a> 3. 实践-4创建namespace yaml文件</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#cat namespaces.yaml </span>
apiVersion：v1 <span class="token comment">#API版本</span>
kind：Namespace <span class="token comment">#类型为namespac </span>
metadata： <span class="token comment">#定义元数据</span>
  name：xin<span class="token punctuation">-</span>k8s <span class="token comment">#namespace名称</span>
<span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">-</span>
root@master02<span class="token punctuation">:</span><span class="token null important">~</span><span class="token comment"># mkdir /xin-yaml</span>
root@master02<span class="token punctuation">:</span><span class="token null important">~</span><span class="token comment"># cd /xin-yaml/</span>
root@master02<span class="token punctuation">:</span>/xin<span class="token punctuation">-</span>yaml<span class="token comment"># vim namespaces.yaml</span>
root@master02<span class="token punctuation">:</span>/xin<span class="token punctuation">-</span>yaml<span class="token comment"># kubectl apply -f namespaces.yaml </span>
namespace/xin<span class="token punctuation">-</span>k8s created
root@master02<span class="token punctuation">:</span>/xin<span class="token punctuation">-</span>yaml<span class="token comment"># </span>
root@master02<span class="token punctuation">:</span>/xin<span class="token punctuation">-</span>yaml<span class="token comment"># kubectl get ns </span>
NAME                   STATUS   AGE
default                Active   2d20h
kube<span class="token punctuation">-</span>node<span class="token punctuation">-</span>lease        Active   2d20h
kube<span class="token punctuation">-</span>public            Active   2d20h
kube<span class="token punctuation">-</span>system            Active   2d20h
kubernetes<span class="token punctuation">-</span>dashboard   Active   42h
xin<span class="token punctuation">-</span>k8s                Active   7s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="cEyPk"></a></p><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2><p><a name="tLjj3"></a></p><h2 id="_4-nginx-yaml文件详解" tabindex="-1"><a class="header-anchor" href="#_4-nginx-yaml文件详解" aria-hidden="true">#</a> 4.nginx yaml文件详解</h2><br><p>可以使用kubectl explain deployment 查看版本信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master02:/xin-yaml<span class="token comment"># kubectl explain deploy</span>
KIND:     Deployment
VERSION:  apps/v1

DESCRIPTION:
     Deployment enables declarative updates <span class="token keyword">for</span> Pods and ReplicaSets.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># cat nginx.yaml </span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment  <span class="token comment">#类型，是deployment控制器，kubectl explain  Deployment</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1  <span class="token comment">#API版本，# kubectl explain  Deployment.apiVersion</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment">#pod的元数据信息，kubectl explain  Deployment.metadata</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#自定义pod的标签，# kubectl explain  Deployment.metadata.labels</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> xin01<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>deployment<span class="token punctuation">-</span>label <span class="token comment">#标签名称为app值为linux36-nginx-deployment-label，后面会用到此标签 </span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> xin01<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>deployment <span class="token comment">#pod的名称</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span><span class="token number">01</span> <span class="token comment">#pod的namespace，默认是defaule</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment">#定义deployment中容器的详细信息，kubectl explain  Deployment.spec</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span> <span class="token comment">#创建出的pod的副本数，即多少个pod，默认值为1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment">#定义标签选择器</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span> <span class="token comment">#定义匹配的标签，必须要设置</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> xin01<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>deployment<span class="token punctuation">-</span>label <span class="token comment">#匹配的目标标签，</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span> <span class="token comment">#定义模板，必须定义，模板是起到描述要创建的pod的作用</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment">#定义模板元数据</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#定义模板label，Deployment.spec.template.metadata.labels</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> xin01<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>deployment<span class="token punctuation">-</span>label <span class="token comment">#定义标签，等于Deployment.spec.selector.matchLabels</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment">#定义pod信息</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span> <span class="token comment">#定义pod中容器列表，可以多个至少一个，pod不能动态增减容器</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>container <span class="token comment">#容器名称</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.20.1 <span class="token comment">#镜像地址</span>
        <span class="token comment">#command: [&quot;/apps/tomcat/bin/run_tomcat.sh&quot;] #容器启动执行的命令或脚本</span>
        <span class="token comment">#imagePullPolicy: IfNotPresent</span>
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always <span class="token comment">#拉取镜像策略</span>
        <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token comment">#定义容器端口列表</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span> <span class="token comment">#定义一个端口</span>
          <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP <span class="token comment">#端口协议</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> http <span class="token comment">#端口名称</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">443</span> <span class="token comment">#定义一个端口</span>
          <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP <span class="token comment">#端口协议</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> https <span class="token comment">#端口名称</span>
        <span class="token key atrule">env</span><span class="token punctuation">:</span> <span class="token comment">#配置环境变量</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;password&quot;</span> <span class="token comment">#变量名称。必须要用引号引起来</span>
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;123456&quot;</span> <span class="token comment">#当前变量的值</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;age&quot;</span> <span class="token comment">#另一个变量名称</span>
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;18&quot;</span> <span class="token comment">#另一个变量的值</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token comment">#对资源的请求设置和限制设置</span>
          <span class="token key atrule">limits</span><span class="token punctuation">:</span> <span class="token comment">#资源限制设置，上限</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 500m  <span class="token comment">#cpu的限制，单位为core数，可以写0.5或者500m等CPU压缩值</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 1Gi <span class="token comment">#内存限制，单位可以为Mib/Gib，将用于docker run --memory参数</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span> <span class="token comment">#资源请求的设置</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 200m <span class="token comment">#cpu请求数，容器启动的初始可用数量,可以写0.5或者500m等CPU压缩值</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 512Mi <span class="token comment">#内存请求大小，容器启动的初始可用数量，用于调度pod时候使用</span>
    
          
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service <span class="token comment">#类型为service</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1 <span class="token comment">#service API版本， service.apiVersion</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment">#定义service元数据，service.metadata</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#自定义标签，service.metadata.labels</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> xin01<span class="token punctuation">-</span>nginx <span class="token comment">#定义service标签的内容</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> xin01<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>spec <span class="token comment">#定义service的名称，此名称会被DNS解析</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> xin<span class="token punctuation">-</span><span class="token number">01</span> <span class="token comment">#该service隶属于的namespaces名称，即把service创建到哪个namespace里面</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment">#定义service的详细信息，service.spec</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort <span class="token comment">#service的类型，定义服务的访问方式，默认为ClusterIP， service.spec.type</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token comment">#定义访问端口， service.spec.ports</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http <span class="token comment">#定义一个端口名称</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span> <span class="token comment">#service 80端口</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP <span class="token comment">#协议类型</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span> <span class="token comment">#目标pod的端口</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30001</span> <span class="token comment">#node节点暴露的端口</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> https <span class="token comment">#SSL 端口</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span> <span class="token comment">#service 443端口</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP <span class="token comment">#端口协议</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">443</span> <span class="token comment">#目标pod端口</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30043</span> <span class="token comment">#node节点暴露的SSL端口</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment">#service的标签选择器，定义要访问的目标pod</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> xin01<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>deployment<span class="token punctuation">-</span>label <span class="token comment">#将流量路到选择的pod上，须等于Deployment.spec.selector.matchLabels</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="V7D8v"></a></p><h2 id="_5-pod-资源清单详细解读" tabindex="-1"><a class="header-anchor" href="#_5-pod-资源清单详细解读" aria-hidden="true">#</a> 5.pod 资源清单详细解读</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1 <span class="token comment">#版本号，例如 v1</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod <span class="token comment">#资源类型，如 Pod</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment">#元数据</span>
 <span class="token key atrule">name</span><span class="token punctuation">:</span> string <span class="token comment"># Pod 名字</span>
 <span class="token key atrule">namespace</span><span class="token punctuation">:</span> string <span class="token comment"># Pod 所属的命名空间</span>
 <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#自定义标签</span>
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string <span class="token comment">#自定义标签名字</span>
 <span class="token key atrule">annotations</span><span class="token punctuation">:</span> <span class="token comment">#自定义注释列表</span>
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment"># Pod 中容器的详细定义</span>
 <span class="token key atrule">containers</span><span class="token punctuation">:</span> <span class="token comment"># Pod 中容器列表</span>
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string <span class="token comment">#容器名称</span>
 <span class="token key atrule">image</span><span class="token punctuation">:</span> string <span class="token comment">#容器的镜像名称</span>
 <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>Always <span class="token punctuation">|</span> Never <span class="token punctuation">|</span> IfNotPresent<span class="token punctuation">]</span> <span class="token comment">#获取镜像的策略 Alawys 表示下载镜像 IfnotPresent 表示优先使用本地镜像，否则下载镜像，Nerver 表示仅使用本地镜像</span>
 <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>string<span class="token punctuation">]</span> <span class="token comment">#容器的启动命令列表，如不指定，使用打包时使用的启动命令</span>
 <span class="token key atrule">args</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>string<span class="token punctuation">]</span> <span class="token comment">#容器的启动命令参数列表</span>
 <span class="token key atrule">workingDir</span><span class="token punctuation">:</span> string <span class="token comment">#容器的工作目录</span>
 <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span> <span class="token comment">#挂载到容器内部的存储卷配置</span>
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string <span class="token comment">#引用 pod 定义的共享存储卷的名称，需用 volumes[]部分定义的的卷名</span>
 <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> string <span class="token comment">#存储卷在容器内 mount 的绝对路径，应少于 512 字符</span>
 <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> boolean <span class="token comment">#是否为只读模式</span>
 <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token comment">#需要暴露的端口库号</span>
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string <span class="token comment">#端口号名称</span>
 <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> int <span class="token comment">#容器需要监听的端口号</span>
 <span class="token key atrule">hostPort</span><span class="token punctuation">:</span> int <span class="token comment">#容器所在主机需要监听的端口号，默认与 Container 相同</span>
 <span class="token key atrule">protocol</span><span class="token punctuation">:</span> string <span class="token comment">#端口协议，支持 TCP 和 UDP，默认 TCP</span>
 <span class="token key atrule">env</span><span class="token punctuation">:</span> <span class="token comment">#容器运行前需设置的环境变量列表</span>
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string <span class="token comment">#环境变量名称</span>
 <span class="token key atrule">value</span><span class="token punctuation">:</span> string <span class="token comment">#环境变量的值</span>
 <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token comment">#资源限制和请求的设置</span>
 <span class="token key atrule">limits</span><span class="token punctuation">:</span> <span class="token comment">#资源限制的设置</span>
 <span class="token key atrule">cpu</span><span class="token punctuation">:</span> string <span class="token comment">#cpu 的限制，单位为 core 数</span>
 <span class="token key atrule">memory</span><span class="token punctuation">:</span> string <span class="token comment">#内存限制，单位可以为 Mib/Gib</span>
 <span class="token key atrule">requests</span><span class="token punctuation">:</span> <span class="token comment">#资源请求的设置</span>
 <span class="token key atrule">cpu</span><span class="token punctuation">:</span> string <span class="token comment">#cpu 请求，容器启动的初始可用数量</span>
 <span class="token key atrule">memory</span><span class="token punctuation">:</span> string <span class="token comment">#内存请求，容器启动的初始可用内存</span>
 <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span> <span class="token comment">#对 Pod 内个容器健康检查的设置，当探测无响应几次后将自动重启该容器，检查方法有 exec、httpGet 和 tcpSocket，对一个容器只需设置其中一种方法即可</span>
 <span class="token key atrule">exec</span><span class="token punctuation">:</span> <span class="token comment">#对 Pod 容器内检查方式设置为 exec 方式</span>
 <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>string<span class="token punctuation">]</span> <span class="token comment">#exec 方式需要制定的命令或脚本</span>
 <span class="token key atrule">httpGet</span><span class="token punctuation">:</span> <span class="token comment">#对 Pod 内个容器健康检查方法设置为 HttpGet，需要制定 Path、port</span>
 <span class="token key atrule">path</span><span class="token punctuation">:</span> string
 <span class="token key atrule">port</span><span class="token punctuation">:</span> number
 <span class="token key atrule">host</span><span class="token punctuation">:</span> string
 <span class="token key atrule">scheme</span><span class="token punctuation">:</span> string
 <span class="token key atrule">HttpHeaders</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string
 <span class="token key atrule">value</span><span class="token punctuation">:</span> string
 <span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span> <span class="token comment">#对 Pod 内个容器健康检查方式设置为 tcpSocket 方式</span>
 <span class="token key atrule">port</span><span class="token punctuation">:</span> number
 <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token comment">#容器启动完成后首次探测的时间，单位为秒</span>
 <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token comment">#对容器健康检查探测等待响应的超时时间，单位秒，默认 1 秒</span>
 <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token comment">#对容器监控检查的定期探测时间设置，单位秒，默认 10 秒一次</span>
 <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">0</span>
 <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">0</span>
 <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
 privileged<span class="token punctuation">:</span><span class="token boolean important">false</span>
 <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>Always <span class="token punctuation">|</span> Never <span class="token punctuation">|</span> OnFailure<span class="token punctuation">]</span><span class="token comment">#Pod 的重启策略，Always 表示一旦不管以何种方式终止运行，kubelet 都将重启，OnFailure 表示只有 Pod 以非 0 退出码退出才重启，Nerver 表示不再重启该 Pod</span>
 <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span> obeject <span class="token comment">#设置 NodeSelector 表示将该 Pod 调度到包含这个 label 的 node上，以 key：value 的格式指定</span>
 <span class="token key atrule">imagePullSecrets</span><span class="token punctuation">:</span> <span class="token comment">#Pull 镜像时使用的 secret 名称，以 key：secretkey 格式指定</span>
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string
 hostNetwork<span class="token punctuation">:</span><span class="token boolean important">false</span> <span class="token comment">#是否使用主机网络模式，默认为 false，如果设置为 true，表示使用宿主机网络</span>
 <span class="token key atrule">volumes</span><span class="token punctuation">:</span> <span class="token comment">#在该 pod 上定义共享存储卷列表</span>
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> string <span class="token comment">#共享存储卷名称 （volumes 类型有很多种）</span>
 <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">#类型为 emtyDir 的存储卷，与 Pod 同生命周期的一个临时目录。为空值</span>
 <span class="token key atrule">hostPath</span><span class="token punctuation">:</span> string <span class="token comment">#类型为 hostPath 的存储卷，表示挂载 Pod 所在宿主机的目录</span>
 <span class="token key atrule">path</span><span class="token punctuation">:</span> string <span class="token comment">#Pod 所在宿主机的目录，将被用于同期中 mount 的目录</span>
 <span class="token key atrule">secret</span><span class="token punctuation">:</span> <span class="token comment">#类型为 secret 的存储卷，挂载集群与定义的 secre 对象到容器内部</span>
 <span class="token key atrule">scretname</span><span class="token punctuation">:</span> string 
 <span class="token key atrule">items</span><span class="token punctuation">:</span> 
 <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> string
 <span class="token key atrule">path</span><span class="token punctuation">:</span> string
 <span class="token key atrule">configMap</span><span class="token punctuation">:</span> <span class="token comment">#类型为 configMap 的存储卷，挂载预定义的 configMap 对象到容器内部</span>
 <span class="token key atrule">name</span><span class="token punctuation">:</span> string
 <span class="token key atrule">items</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> string
 <span class="token key atrule">path</span><span class="token punctuation">:</span> string


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#test-pod </span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1 <span class="token comment">#指定api版本，此值必须在kubectl apiversion中   </span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod <span class="token comment">#指定创建资源的角色/类型   </span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment">#资源的元数据/属性   </span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>pod <span class="token comment">#资源的名字，在同一个namespace中必须唯一   </span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#设定资源的标签 </span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> apache   
    <span class="token key atrule">version</span><span class="token punctuation">:</span> v1   
    <span class="token key atrule">kubernetes.io/cluster-service</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>   
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>            <span class="token comment">#自定义注解列表   </span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> String        <span class="token comment">#自定义注解名字   </span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment">#specification of the resource content 指定该资源的内容   </span>
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always <span class="token comment">#表明该容器一直运行，默认k8s的策略，在此容器退出后，会立即创建一个相同的容器   </span>
  <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>     <span class="token comment">#节点选择，先给主机打标签kubectl label nodes kube-node1 zone=node1   </span>
    <span class="token key atrule">zone</span><span class="token punctuation">:</span> node1   
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>   
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>pod <span class="token comment">#容器的名字   </span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> 10.192.21.18<span class="token punctuation">:</span>5000/test/chat<span class="token punctuation">:</span>latest <span class="token comment">#容器使用的镜像地址   </span>
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Never <span class="token comment">#三个选择Always、Never、IfNotPresent，每次启动时检查和更新（从registery）images的策略， </span>
                           <span class="token comment"># Always，每次都检查 </span>
                           <span class="token comment"># Never，每次都不检查（不管本地是否有） </span>
                           <span class="token comment"># IfNotPresent，如果本地有就不检查，如果没有就拉取 </span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">]</span> <span class="token comment">#启动容器的运行命令，将覆盖容器中的Entrypoint,对应Dockefile中的ENTRYPOINT   </span>
    <span class="token key atrule">args</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;$(str)&quot;</span><span class="token punctuation">]</span> <span class="token comment">#启动容器的命令参数，对应Dockerfile中CMD参数   </span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span> <span class="token comment">#指定容器中的环境变量   </span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> str <span class="token comment">#变量的名字   </span>
      <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;/etc/run.sh&quot;</span> <span class="token comment">#变量的值   </span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token comment">#资源管理 </span>
      <span class="token key atrule">requests</span><span class="token punctuation">:</span> <span class="token comment">#容器运行时，最低资源需求，也就是说最少需要多少资源容器才能正常运行   </span>
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token number">0.1</span> <span class="token comment">#CPU资源（核数），两种方式，浮点数或者是整数+m，0.1=100m，最少值为0.001核（1m） </span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> 32Mi <span class="token comment">#内存使用量   </span>
      <span class="token key atrule">limits</span><span class="token punctuation">:</span> <span class="token comment">#资源限制   </span>
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token number">0.5</span>   
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> 1000Mi   
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>   
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span> <span class="token comment">#容器开发对外的端口 </span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd  <span class="token comment">#名称 </span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP   
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span> <span class="token comment">#pod内容器健康检查的设置 </span>
      <span class="token key atrule">httpGet</span><span class="token punctuation">:</span> <span class="token comment">#通过httpget检查健康，返回200-399之间，则认为容器正常   </span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> / <span class="token comment">#URI地址   </span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>   
        <span class="token comment">#host: 127.0.0.1 #主机地址   </span>
        <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP   
      <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">180</span> <span class="token comment">#表明第一次检测在容器启动后多长时间后开始   </span>
      <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span> <span class="token comment">#检测的超时时间   </span>
      <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">15</span>  <span class="token comment">#检查间隔时间   </span>
      <span class="token comment">#也可以用这种方法   </span>
      <span class="token comment">#exec: 执行命令的方法进行监测，如果其退出码不为0，则认为容器正常   </span>
      <span class="token comment">#  command:   </span>
      <span class="token comment">#    - cat   </span>
      <span class="token comment">#    - /tmp/health   </span>
      <span class="token comment">#也可以用这种方法   </span>
      <span class="token comment">#tcpSocket: //通过tcpSocket检查健康    </span>
      <span class="token comment">#  port: number    </span>
    <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span> <span class="token comment">#生命周期管理   </span>
      <span class="token key atrule">postStart</span><span class="token punctuation">:</span> <span class="token comment">#容器运行之前运行的任务   </span>
        <span class="token key atrule">exec</span><span class="token punctuation">:</span>   
          <span class="token key atrule">command</span><span class="token punctuation">:</span>   
            <span class="token punctuation">-</span> <span class="token string">&#39;sh&#39;</span>   
            <span class="token punctuation">-</span> <span class="token string">&#39;yum upgrade -y&#39;</span>   
      preStop<span class="token punctuation">:</span><span class="token comment">#容器关闭之前运行的任务   </span>
        <span class="token key atrule">exec</span><span class="token punctuation">:</span>   
          <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;service httpd stop&#39;</span><span class="token punctuation">]</span>   
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>  <span class="token comment">#挂载持久存储卷 </span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume <span class="token comment">#挂载设备的名字，与volumes[*].name 需要对应     </span>
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data <span class="token comment">#挂载到容器的某个路径下   </span>
      <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">True</span>   
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span> <span class="token comment">#定义一组挂载设备   </span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume <span class="token comment">#定义一个挂载设备的名字   </span>
    <span class="token comment">#meptyDir: {}   </span>
    <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>   
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /opt <span class="token comment">#挂载设备类型为hostPath，路径为宿主机下的/opt,这里设备类型支持很多种 </span>
    <span class="token comment">#nfs</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19);function v(b,y){const e=o("ExternalLinkIcon");return p(),c("div",null,[u,n("p",null,[s("在线yaml与json编辑器："),n("a",k,[s("http://www.bejson.com/validators/yaml_editor/"),l(e)]),m,r]),d])}const g=t(i,[["render",v],["__file","kubernetes-3.html.vue"]]);export{g as default};
