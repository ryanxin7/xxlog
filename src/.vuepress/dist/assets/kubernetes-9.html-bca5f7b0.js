import{_ as n,V as s,W as a,Z as e}from"./framework-91fce522.js";const t={},i=e(`<p>本次以jenkins.war 包部署⽅式为例运⾏ ，java war包或jar包，且要求jenkins的数据保存⾄外部存储(NFS或者PVC)，其他java应⽤看实际需求是否需要将数据保存⾄外部存储。 <br></p><p><a name="PyFag"></a></p><h2 id="构建镜像" tabindex="-1"><a class="header-anchor" href="#构建镜像" aria-hidden="true">#</a> 构建镜像</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#Jenkins Version 2.319.3</span>
FROM harbor.ceamg.com/pub-images/jdk8:3411

MAINTAINER zcc zcc@qq.com

ADD jenkins-2.319.3.war /apps/jenkins/
ADD run_jenkins.sh /usr/bin/

EXPOSE <span class="token number">8080</span>

CMD <span class="token punctuation">[</span><span class="token string">&quot;/usr/bin/run_jenkins.sh&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">cd</span> /apps/jenkins <span class="token operator">&amp;&amp;</span> jave <span class="token parameter variable">-server</span> <span class="token parameter variable">-Xms1024m</span> <span class="token parameter variable">-Xmx1024m</span> <span class="token parameter variable">-Xss512k</span> <span class="token parameter variable">-jar</span> jenkins-2.319.3.war <span class="token parameter variable">--webroot</span><span class="token operator">=</span>/apps/jenkins/jenkins-data <span class="token parameter variable">--httpPort</span><span class="token operator">=</span><span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看Jenkins 支持的参数</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-jar</span> jenkins.war <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#!/bin/bash</span>
docker build <span class="token punctuation">-</span>t  harbor.ceamg.com/pub<span class="token punctuation">-</span>images/jenkins<span class="token punctuation">:</span>v2.319.3 .
echo &quot;镜像制作完成，即将上传至Harbor服务器&quot;
sleep 1
docker push harbor.ceamg.com/pub<span class="token punctuation">-</span>images/jenkins<span class="token punctuation">:</span>v2.319.3
echo &quot;镜像上传完成&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01<span class="token punctuation">[</span><span class="token number">16</span>:45:23<span class="token punctuation">]</span>/dockerfile/jenkins <span class="token comment">#:bash build-command.sh </span>
Sending build context to Docker daemon  <span class="token number">72</span>.26MB
Step <span class="token number">1</span>/6 <span class="token builtin class-name">:</span> FROM harbor.ceamg.com/pub-images/jdk8:3411
---<span class="token operator">&gt;</span> 1328b4d79a67
Step <span class="token number">2</span>/6 <span class="token builtin class-name">:</span> MAINTAINER zcc zcc@qq.com
---<span class="token operator">&gt;</span> Using cache
---<span class="token operator">&gt;</span> 35ad6bb5a267
Step <span class="token number">3</span>/6 <span class="token builtin class-name">:</span> ADD jenkins-2.319.3.war /apps/jenkins/
---<span class="token operator">&gt;</span> d83e0dff6896
Step <span class="token number">4</span>/6 <span class="token builtin class-name">:</span> ADD run_jenkins.sh /usr/bin/
---<span class="token operator">&gt;</span> 4f60478bd327
Step <span class="token number">5</span>/6 <span class="token builtin class-name">:</span> EXPOSE <span class="token number">8080</span>
---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 84bcd1400981
Removing intermediate container 84bcd1400981
---<span class="token operator">&gt;</span> d01106084f38
Step <span class="token number">6</span>/6 <span class="token builtin class-name">:</span> CMD <span class="token punctuation">[</span><span class="token string">&quot;/usr/bin/run_jenkins.sh&quot;</span><span class="token punctuation">]</span>
---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 9eaaf7204543
Removing intermediate container 9eaaf7204543
---<span class="token operator">&gt;</span> 0c48f0d81550
Successfully built 0c48f0d81550
Successfully tagged harbor.ceamg.com/pub-images/jenkins:v2.319.3
镜像制作完成，即将上传至Harbor服务器
The push refers to repository <span class="token punctuation">[</span>harbor.ceamg.com/pub-images/jenkins<span class="token punctuation">]</span>
d74d542bfbb2: Pushed 
ba3e041a4025: Pushed 
3ad8c5bef187: Mounted from pub-images/tomcat-base 
f4442a8d89b4: Mounted from pub-images/tomcat-base 
c185ef053da5: Mounted from pub-images/tomcat-base 
0002c93bdb37: Mounted from pub-images/tomcat-base 
v2.319.3: digest: sha256:fbaa1f61491042ddc6ab2dc3e2183900daaeee1d57ecc772c33ac7dfb39f895a size: <span class="token number">1575</span>
镜像上传完成
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="ujHOo"></a></p><h2 id="创建pv" tabindex="-1"><a class="header-anchor" href="#创建pv" aria-hidden="true">#</a> 创建pv</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pv
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 100Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.1.0.38
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s/jenkins/jenkins<span class="token punctuation">-</span>data

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>root<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pv
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 100Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.1.0.38
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s/jenkins/jenkins<span class="token punctuation">-</span>root<span class="token punctuation">-</span>data

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="IlX60"></a></p><h3 id="nfs服务器创建应用数据目录" tabindex="-1"><a class="header-anchor" href="#nfs服务器创建应用数据目录" aria-hidden="true">#</a> NFS服务器创建应用数据目录</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01<span class="token punctuation">[</span><span class="token number">16</span>:52:33<span class="token punctuation">]</span>/data/k8s <span class="token comment">#:mkdir /data/k8s/jenkins/jenkins-data -p</span>
root@harbor01<span class="token punctuation">[</span><span class="token number">16</span>:52:47<span class="token punctuation">]</span>/data/k8s <span class="token comment">#:mkdir /data/k8s/jenkins/jenkins-root-data -p</span>

<span class="token function">vim</span> /etx/exports
/data/k8s/jenkins *<span class="token punctuation">(</span>rw,sync,no_root_squash<span class="token punctuation">)</span>
root@harbor01<span class="token punctuation">[</span><span class="token number">16</span>:54:13<span class="token punctuation">]</span>/data/k8s/jenkins <span class="token comment">#:systemctl restart nfs-server.service</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">16</span>:57:33<span class="token punctuation">]</span>~/jenkins-yaml <span class="token comment">#:kubectl apply -f jenkins-pv.yaml </span>
persistentvolume/jenkins-datadir-pv created
persistentvolume/jenkins-root-datadir-pv created

root@master01<span class="token punctuation">[</span><span class="token number">16</span>:57:38<span class="token punctuation">]</span>~/jenkins-yaml <span class="token comment">#:kubectl get pv </span>
NAME                      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM                            STORAGECLASS   REASON   AGE
jenkins-datadir-pv        100Gi      RWO            Retain           Available                                                            5s
jenkins-root-datadir-pv   100Gi      RWO            Retain           Available                                                            5s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="y9AX6"></a></p><h2 id="创建pvc" tabindex="-1"><a class="header-anchor" href="#创建pvc" aria-hidden="true">#</a> 创建PVC</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pvc
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>xin
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">volumeName</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pv
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 80Gi

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>root<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pvc
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>xin
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">volumeName</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>root<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pv
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 80Gi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">16</span>:58:41<span class="token punctuation">]</span>~/jenkins-yaml <span class="token comment">#:kubectl apply -f jenkins-pvc.yaml </span>
persistentvolumeclaim/jenkins-datadir-pvc created
persistentvolumeclaim/jenkins-root-datadir-pvc created
root@master01<span class="token punctuation">[</span><span class="token number">16</span>:58:28<span class="token punctuation">]</span>~/jenkins-yaml <span class="token comment">#:kubectl create namespace jenkins-xin</span>
namespace/jenkins-xin created
root@master01<span class="token punctuation">[</span><span class="token number">16</span>:58:52<span class="token punctuation">]</span>~/jenkins-yaml <span class="token comment">#:kubectl get pvc -n jenkins-xin</span>
NAME                       STATUS   VOLUME                    CAPACITY   ACCESS MODES   STORAGECLASS   AGE
jenkins-datadir-pvc        Bound    jenkins-datadir-pv        100Gi      RWO                           23s
jenkins-root-datadir-pvc   Bound    jenkins-root-datadir-pv   100Gi      RWO                           23s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="oiVvZ"></a></p><h2 id="创建jenkins-pod服务" tabindex="-1"><a class="header-anchor" href="#创建jenkins-pod服务" aria-hidden="true">#</a> 创建Jenkins Pod服务</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span><span class="token number">319</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>319<span class="token punctuation">-</span>deployment
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>xin
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span><span class="token number">319</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span><span class="token number">319</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>319<span class="token punctuation">-</span>container
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/pub<span class="token punctuation">-</span>images/jenkins<span class="token punctuation">:</span>v2.319.3 
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
        <span class="token comment">#imagePullPolicy: Always</span>
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
          <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
          <span class="token key atrule">name</span><span class="token punctuation">:</span> http
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> <span class="token string">&quot;/apps/jenkins/jenkins-data/&quot;</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>app<span class="token punctuation">-</span>datadir
        <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> <span class="token string">&quot;/root/.jenkins&quot;</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>root<span class="token punctuation">-</span>datadir
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>app<span class="token punctuation">-</span>datadir
          <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
            <span class="token key atrule">claimName</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pvc
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>root<span class="token punctuation">-</span>datadir
          <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
            <span class="token key atrule">claimName</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>root<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span>pvc

<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span><span class="token number">319</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>319<span class="token punctuation">-</span>service
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>xin
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">38080</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span><span class="token number">319</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="DYGEm"></a></p><h3 id="验证服务状态" tabindex="-1"><a class="header-anchor" href="#验证服务状态" aria-hidden="true">#</a> 验证服务状态</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">10</span>:36:43<span class="token punctuation">]</span>~/jenkins-yaml <span class="token comment">#:kubectl apply -f jenkins-deployment.yaml </span>
deployment.apps/jenkins-319-deployment created
service/jenkins-319-service created

root@master01<span class="token punctuation">[</span><span class="token number">10</span>:39:03<span class="token punctuation">]</span>~/jenkins-yaml <span class="token comment">#:kubectl get pod -n  jenkins-xin </span>
NAME                                      READY   STATUS    RESTARTS   AGE
jenkins-319-deployment-67cb4bf4c9-wnvqb   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          24s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="aZGVN"></a></p><h3 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> service</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">10</span>:39:16<span class="token punctuation">]</span>~/jenkins-yaml <span class="token comment">#:kubectl get service -n jenkins-xin </span>
NAME                  TYPE       CLUSTER-IP    EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE
jenkins-319-service   NodePort   <span class="token number">10.10</span>.24.94   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>:38080/TCP   41s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/1675140260595-e7f2ee78-f004-4dfd-afb3-ab7473eb824b.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>获取密码<br><img src="http://cdn1.ryanxin.live/1675140354511-98828f8d-9a2c-4692-a714-a750401805d7.png" alt="获取密码" loading="lazy"></p><figure><img src="http://cdn1.ryanxin.live/1675150017505-dc2f9866-e03f-47ce-9c94-89f18fc539fb.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,32),p=[i];function l(c,u){return s(),a("div",null,p)}const r=n(t,[["render",l],["__file","kubernetes-9.html.vue"]]);export{r as default};
