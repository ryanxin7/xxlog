<template><div><p><a href="https://kubernetes.io/zh-cn/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh-cn/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/<ExternalLinkIcon/></a><br />Pod调度运⾏时，如果应⽤不需要任何稳定的标示、有序的部署、删除和扩展，则应该使⽤⼀组⽆状态副本的控制<br />器来部署应⽤，例如 Deployment 或 ReplicaSet更适合⽆状态服务需求，⽽StatefulSet适合管理所有有状态的服<br />务，⽐如MySQL、 MongoDB集群等。</p>
<p><strong>运行一个有状态的应用程序：</strong><br /><a href="https://kubernetes.io/zh-cn/docs/tasks/run-application/run-replicated-stateful-application/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/zh-cn/docs/tasks/run-application/run-replicated-stateful-application/<ExternalLinkIcon/></a></p>
<p><br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1675045229487-bc9ccd32-8c67-4f4c-8097-e358c394297b.png#averageHue=%23e4ead3&amp;clientId=u07032b4b-04a2-4&amp;from=paste&amp;height=601&amp;id=u15957a54&amp;name=image.png&amp;originHeight=601&amp;originWidth=866&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=63834&amp;status=done&amp;style=none&amp;taskId=u5e782982-70a8-4b14-bdf8-eddfe74d71d&amp;title=&amp;width=866" alt="image.png" loading="lazy"></p>
<p>**StatefulSet **本质上是Deployment的⼀种变体，在v1.9版本中已成为GA版本，它为了解决有状态服务的问题，<strong>它所管理的Pod拥有固定的Pod名称，启停顺序，在StatefulSet中， Pod名字称为⽹络标识(hostname)，还必须要⽤到共享存储。</strong></p>
<p><strong>在Deployment中，与之对应的服务是service，⽽在StatefulSet中与之对应的headless service</strong>， headless<br />service，即<strong>⽆头服务</strong>，与service的区别就是它没有Cluster IP，解析它的名称时将返回该Headless Service 对应的全部Pod的Endpoint列表。 <br /></p>
<p><strong>StatefulSet 特点</strong></p>
<ul>
<li>给每个pod分配固定且唯⼀的⽹络标识符</li>
<li>给每个pod分配固定且持久化的外部存储</li>
<li>对pod进⾏有序的部署和扩展</li>
<li>对pod进有序的删除和终⽌</li>
<li>对pod进有序的⾃动滚动更新<br /> <br />
<a name="R6bQg"></a></li>
</ul>
<h2 id="statefulset-的组成部分" tabindex="-1"><a class="header-anchor" href="#statefulset-的组成部分" aria-hidden="true">#</a> StatefulSet 的组成部分</h2>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p><strong>Headless Service</strong>：⽤来定义Pod⽹络标识( DNS domain)，指的是短的serfvice(丢失了domainname)。直接解析到pod。<br /><strong>StatefulSet</strong>：定义具体应⽤，有多少个Pod副本，并为每个Pod定义了⼀个域名。</p>
<p><strong>volumeClaimTemplates</strong>： 存储卷申请模板，创建PVC，指定pvc名称⼤⼩，将⾃动创建pvc，且pvc必须由存储类供应。</p>
</div>
<p><a name="wUv0K"></a></p>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
<p><a name="PLSgV"></a></p>
<h2 id="镜像准备" tabindex="-1"><a class="header-anchor" href="#镜像准备" aria-hidden="true">#</a> <br /> 镜像准备 <br /></h2>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token comment">#准备xtrabackup镜像</span>
root@harbor01<span class="token punctuation">[</span><span class="token datetime number">11:17:56</span><span class="token punctuation">]</span>~ <span class="token comment">#:docker pull registry.cn-hangzhou.aliyuncs.com/hxpdocker/xtrabackup:1.0</span>
root@harbor01<span class="token punctuation">[</span><span class="token datetime number">10:27:39</span><span class="token punctuation">]</span>~ <span class="token comment">#:docker tag registry.cn-hangzhou.aliyuncs.com/hxpdocker/xtrabackup:1.0 harbor.ceamg.com/databases/xtrabackup:1.0</span>
root@harbor01<span class="token punctuation">[</span><span class="token datetime number">10:29:24</span><span class="token punctuation">]</span>~ <span class="token comment">#:docker push harbor.ceamg.com/databases/xtrabackup:1.0</span>



<span class="token comment">#准备mysql 镜像</span>
root@harbor01<span class="token punctuation">[</span><span class="token datetime number">10:30:00</span><span class="token punctuation">]</span>~ <span class="token comment">#:docker pull mysql:5.7</span>
root@harbor01<span class="token punctuation">[</span><span class="token datetime number">10:31:09</span><span class="token punctuation">]</span>~ <span class="token comment">#:docker tag mysql:5.7 harbor.ceamg.com/databases/mysql:5.7</span>
root@harbor01<span class="token punctuation">[</span><span class="token datetime number">10:31:42</span><span class="token punctuation">]</span>~ <span class="token comment">#:docker push harbor.ceamg.com/databases/mysql:5.7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="evTC9"></a></p>
<h2 id="创建pv" tabindex="-1"><a class="header-anchor" href="#创建pv" aria-hidden="true">#</a> 创建PV <br /></h2>
<p>pvc会⾃动基于PV创建，只需要有多个可⽤的PV即可， PV数量取决于计划启动多少个mysql pod，本次创建5个PV，也就是最多启动5个mysql pod 。</p>
<p><a name="EvOus"></a></p>
<h3 id="创建nfs共享存储目录" tabindex="-1"><a class="header-anchor" href="#创建nfs共享存储目录" aria-hidden="true">#</a> 创建nfs共享存储目录</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@harbor01<span class="token punctuation">[</span><span class="token number">10</span>:35:02<span class="token punctuation">]</span>/data/k8s <span class="token comment">#:mkdir /data/k8s/mysqldata/mysql-datadir-1 </span>
root@harbor01<span class="token punctuation">[</span><span class="token number">10</span>:35:20<span class="token punctuation">]</span>/data/k8s <span class="token comment">#:mkdir /data/k8s/mysqldata/mysql-datadir-2</span>
root@harbor01<span class="token punctuation">[</span><span class="token number">10</span>:35:22<span class="token punctuation">]</span>/data/k8s <span class="token comment">#:mkdir /data/k8s/mysqldata/mysql-datadir-3</span>
root@harbor01<span class="token punctuation">[</span><span class="token number">10</span>:35:23<span class="token punctuation">]</span>/data/k8s <span class="token comment">#:mkdir /data/k8s/mysqldata/mysql-datadir-4</span>
root@harbor01<span class="token punctuation">[</span><span class="token number">10</span>:35:24<span class="token punctuation">]</span>/data/k8s <span class="token comment">#:mkdir /data/k8s/mysqldata/mysql-datadir-5</span>


<span class="token function">vim</span> /etc/exports
/data/k8s/xinzk *<span class="token punctuation">(</span>rw,sync,no_root_squash<span class="token punctuation">)</span>
/data/k8s/web1 *<span class="token punctuation">(</span>rw,sync,no_root_squash<span class="token punctuation">)</span>
/data/k8s/mysqldata *<span class="token punctuation">(</span>rw,sync,no_root_squash<span class="token punctuation">)</span>

root@harbor01<span class="token punctuation">[</span><span class="token number">10</span>:36:33<span class="token punctuation">]</span>/data/k8s <span class="token comment">#:systemctl restart nfs-server.service</span>

root@harbor01<span class="token punctuation">[</span><span class="token number">10</span>:36:41<span class="token punctuation">]</span>/data/k8s <span class="token comment">#:showmount -e</span>
Export list <span class="token keyword">for</span> harbor01:
/data/k8s/mysqldata *
/data/k8s/web1      *
/data/k8s/xinzk     *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="VjEOq"></a></p>
<h3 id="创建pv-yaml文件" tabindex="-1"><a class="header-anchor" href="#创建pv-yaml文件" aria-hidden="true">#</a> <br /> 创建PV yaml文件</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span><span class="token number">1</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 50Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s/mysqldata/mysql<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span><span class="token number">1</span> 
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.1.0.38


<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span><span class="token number">2</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 50Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s/mysqldata/mysql<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span><span class="token number">2</span> 
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.1.0.38


<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span><span class="token number">3</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 50Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s/mysqldata/mysql<span class="token punctuation">-</span>datadir<span class="token punctuation">-</span><span class="token number">3</span> 
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.1.0.38
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>检查pv状态</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">12</span>:06:23<span class="token punctuation">]</span>~/mysql-sts-yaml <span class="token comment">#:kubectl apply -f mysql-persistentvolume.yaml </span>
persistentvolume/mysql-datadir-1 created
persistentvolume/mysql-datadir-2 created
persistentvolume/mysql-datadir-3 created


root@master01<span class="token punctuation">[</span><span class="token number">12</span>:06:51<span class="token punctuation">]</span>~/mysql-sts-yaml <span class="token comment">#:kubectl get pv </span>
NAME                     CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM                            STORAGECLASS   REASON   AGE
mysql-datadir-1          50Gi       RWO            Retain           Available                                                            27s
mysql-datadir-2          50Gi       RWO            Retain           Available                                                            27s
mysql-datadir-3          50Gi       RWO            Retain           Available                                                            27s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="DANON"></a></p>
<h2 id="创建-configmap" tabindex="-1"><a class="header-anchor" href="#创建-configmap" aria-hidden="true">#</a> 创建 ConfigMap</h2>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>sts
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">app.kubernetes.io/name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">primary.cnf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    [mysqld]
    log-bin</span>
  <span class="token key atrule">replica.cnf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    [mysqld]
    super-read-only</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> mysql-configmap.yaml 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个 ConfigMap 提供 my.cnf 覆盖设置，使你可以独立控制 MySQL 主服务器和副本服务器的配置。 在这里，你希望主服务器能够将复制日志提供给副本服务器， 并且希望副本服务器拒绝任何不是通过复制进行的写操作。</p>
<p><a name="oKIFZ"></a></p>
<h2 id="创建-无头服务" tabindex="-1"><a class="header-anchor" href="#创建-无头服务" aria-hidden="true">#</a> 创建 无头服务</h2>
<p>Headless Service⽆头服务，与service的<strong>区别就是它没有Cluster IP</strong>，解析它的名称时将返回该Headless Service对应的全部Pod的Endpoint列表。</p>
<p><strong>客户端 Service 为 mysql-read，是一种常规 Service</strong>，具有其自己的集群 IP。 该集群 IP 在报告就绪的所有 MySQL Pod 之间分配连接。 可能的端点集合包括 MySQL 主节点和所有副本节点。  <br />**mysql-read是给slave pod使用的mysql只读服务，以此实现读写分离。  **</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>sts
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">app.kubernetes.io/name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>read
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>sts
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">app.kubernetes.io/name</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">readonly</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> mysql-services.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="VXg8e"></a></p>
<h2 id="创建-statefulset" tabindex="-1"><a class="header-anchor" href="#创建-statefulset" aria-hidden="true">#</a> 创建 StatefulSet</h2>
<p><strong>创建MySQL一主多从集群，每个pod分别执行4个容器。具体作用如下：</strong></p>
<ol>
<li><strong>初始化容器1</strong>：根据mysql-0数字标记为master，其它为slave，并分发不同配置文件。</li>
<li><strong>初始化容器2</strong>：mysql-0不动，mysql-1从mysql-0全量拷贝数据，mysql-2再从mysql-1全量拷贝，以此类推。</li>
<li><strong>主容器mysql</strong>：数据库主程序，都有读写功能。读写分离依靠mysql和mysql-read服务实现。</li>
<li><strong>主容器xtrabackup</strong>：实现主从复制自动备份，除刚创建外都从mysql-0拷贝。开放3307端口供后一位pod全量复制。</li>
</ol>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StatefulSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>sts
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
      <span class="token key atrule">app.kubernetes.io/name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
        <span class="token key atrule">app.kubernetes.io/name</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">initContainers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> init<span class="token punctuation">-</span>mysql
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/databases/mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> bash
        <span class="token punctuation">-</span> <span class="token string">"-c"</span>
        <span class="token punctuation">-</span> <span class="token punctuation">|</span><span class="token scalar string">
          set -ex
          # 基于 Pod 序号生成 MySQL 服务器的 ID。
          [[ $HOSTNAME =~ -([0-9]+)$ ]] || exit 1
          ordinal=${BASH_REMATCH[1]}
          echo [mysqld] > /mnt/conf.d/server-id.cnf
          # 添加偏移量以避免使用 server-id=0 这一保留值。
          echo server-id=$((100 + $ordinal)) >> /mnt/conf.d/server-id.cnf
          # 将合适的 conf.d 文件从 config-map 复制到 emptyDir。
          if [[ $ordinal -eq 0 ]]; then
            cp /mnt/config-map/primary.cnf /mnt/conf.d/
          else
            cp /mnt/config-map/replica.cnf /mnt/conf.d/
          fi          </span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> conf
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /mnt/conf.d
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>map
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /mnt/config<span class="token punctuation">-</span>map
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> clone<span class="token punctuation">-</span>mysql
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/databases/xtrabackup<span class="token punctuation">:</span><span class="token number">1.0</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> bash
        <span class="token punctuation">-</span> <span class="token string">"-c"</span>
        <span class="token punctuation">-</span> <span class="token punctuation">|</span><span class="token scalar string">
          set -ex
          # 如果已有数据，则跳过克隆。
          [[ -d /var/lib/mysql/mysql ]] &amp;&amp; exit 0
          # 跳过主实例（序号索引 0）的克隆。
          [[ `hostname` =~ -([0-9]+)$ ]] || exit 1
          ordinal=${BASH_REMATCH[1]}
          [[ $ordinal -eq 0 ]] &amp;&amp; exit 0
          # 从原来的对等节点克隆数据。
          ncat --recv-only mysql-$(($ordinal-1)).mysql 3307 | xbstream -x -C /var/lib/mysql
          # 准备备份。
          xtrabackup --prepare --target-dir=/var/lib/mysql          </span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> data
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql
          <span class="token key atrule">subPath</span><span class="token punctuation">:</span> mysql
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> conf
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/mysql/conf.d
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/databases/mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ALLOW_EMPTY_PASSWORD
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"1"</span>
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
          <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> data
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql
          <span class="token key atrule">subPath</span><span class="token punctuation">:</span> mysql
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> conf
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/mysql/conf.d
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 500m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 1Gi
        <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">exec</span><span class="token punctuation">:</span>
            <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"mysqladmin"</span><span class="token punctuation">,</span> <span class="token string">"ping"</span><span class="token punctuation">]</span>
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
          <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
        <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">exec</span><span class="token punctuation">:</span>
            <span class="token comment"># 检查我们是否可以通过 TCP 执行查询（skip-networking 是关闭的）。</span>
            <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"mysql"</span><span class="token punctuation">,</span> <span class="token string">"-h"</span><span class="token punctuation">,</span> <span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token string">"-e"</span><span class="token punctuation">,</span> <span class="token string">"SELECT 1"</span><span class="token punctuation">]</span>
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
          <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xtrabackup
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/databases/xtrabackup<span class="token punctuation">:</span><span class="token number">1.0</span>
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xtrabackup
          <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3307</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> bash
        <span class="token punctuation">-</span> <span class="token string">"-c"</span>
        <span class="token punctuation">-</span> <span class="token punctuation">|</span><span class="token scalar string">
          set -ex
          cd /var/lib/mysql</span>

          <span class="token comment"># 确定克隆数据的 binlog 位置（如果有的话）。</span>
          if <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token punctuation">-</span>f xtrabackup_slave_info <span class="token important">&amp;&amp;</span> "x$(&lt;xtrabackup_slave_info)" <span class="token tag">!=</span> "x" <span class="token punctuation">]</span><span class="token punctuation">]</span>; then
            <span class="token comment"># XtraBackup 已经生成了部分的 “CHANGE MASTER TO” 查询</span>
            <span class="token comment"># 因为我们从一个现有副本进行克隆。(需要删除末尾的分号!)</span>
            cat xtrabackup_slave_info <span class="token punctuation">|</span> sed <span class="token punctuation">-</span>E 's/;$//g' <span class="token punctuation">></span> change_master_to.sql.in
            <span class="token comment"># 在这里要忽略 xtrabackup_binlog_info （它是没用的）。</span>
            rm <span class="token punctuation">-</span>f xtrabackup_slave_info xtrabackup_binlog_info
          elif <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token punctuation">-</span>f xtrabackup_binlog_info <span class="token punctuation">]</span><span class="token punctuation">]</span>; then
            <span class="token comment"># 我们直接从主实例进行克隆。解析 binlog 位置。</span>
            <span class="token punctuation">[</span><span class="token punctuation">[</span> `cat xtrabackup_binlog_info` =~ ^(.<span class="token important">*?)</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token punctuation">:</span>space<span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">]</span>+(.<span class="token important">*?)$</span> <span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">|</span><span class="token punctuation">|</span> exit 1
            rm <span class="token punctuation">-</span>f xtrabackup_binlog_info xtrabackup_slave_info
            echo "CHANGE MASTER TO MASTER_LOG_FILE='$<span class="token punctuation">{</span>BASH_REMATCH<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">}</span>'<span class="token punctuation">,</span>\
                  MASTER_LOG_POS=$<span class="token punctuation">{</span>BASH_REMATCH<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">}</span>" <span class="token punctuation">></span> change_master_to.sql.in
          fi

          <span class="token comment"># 检查我们是否需要通过启动复制来完成克隆。</span>
          if <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token punctuation">-</span>f change_master_to.sql.in <span class="token punctuation">]</span><span class="token punctuation">]</span>; then
            echo "Waiting for mysqld to be ready (accepting connections)"
            until mysql <span class="token punctuation">-</span>h 127.0.0.1 <span class="token punctuation">-</span>e "SELECT 1"; do sleep 1; done

            echo "Initializing replication from clone position"
            mysql <span class="token punctuation">-</span>h 127.0.0.1 \
                  <span class="token punctuation">-</span>e "$(&lt;change_master_to.sql.in)<span class="token punctuation">,</span> \
                          MASTER_HOST='mysql<span class="token punctuation">-</span>0.mysql'<span class="token punctuation">,</span> \
                          MASTER_USER='root'<span class="token punctuation">,</span> \
                          MASTER_PASSWORD=''<span class="token punctuation">,</span> \
                          MASTER_CONNECT_RETRY=10; \
                        START SLAVE;" <span class="token punctuation">|</span><span class="token punctuation">|</span> exit 1
            <span class="token comment"># 如果容器重新启动，最多尝试一次。</span>
            mv change_master_to.sql.in change_master_to.sql.orig
          fi

          <span class="token comment"># 当对等点请求时，启动服务器发送备份。</span>
          exec ncat <span class="token punctuation">-</span><span class="token punctuation">-</span>listen <span class="token punctuation">-</span><span class="token punctuation">-</span>keep<span class="token punctuation">-</span>open <span class="token punctuation">-</span><span class="token punctuation">-</span>send<span class="token punctuation">-</span>only <span class="token punctuation">-</span><span class="token punctuation">-</span>max<span class="token punctuation">-</span>conns=1 3307 <span class="token punctuation">-</span>c \
            "xtrabackup <span class="token punctuation">-</span><span class="token punctuation">-</span>backup <span class="token punctuation">-</span><span class="token punctuation">-</span>slave<span class="token punctuation">-</span>info <span class="token punctuation">-</span><span class="token punctuation">-</span>stream=xbstream <span class="token punctuation">-</span><span class="token punctuation">-</span>host=127.0.0.1 <span class="token punctuation">-</span><span class="token punctuation">-</span>user=root"          
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> data
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql
          <span class="token key atrule">subPath</span><span class="token punctuation">:</span> mysql
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> conf
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/mysql/conf.d
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 100Mi
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> conf
        <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>map
        <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">volumeClaimTemplates</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> data
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"ReadWriteOnce"</span><span class="token punctuation">]</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>
        <span class="token key atrule">requests</span><span class="token punctuation">:</span>
          <span class="token key atrule">storage</span><span class="token punctuation">:</span> 10Gi

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="FAAep"></a></p>
<h3 id="运行mysql服务" tabindex="-1"><a class="header-anchor" href="#运行mysql服务" aria-hidden="true">#</a> 运⾏mysql服务 <br /></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01<span class="token punctuation">[</span><span class="token number">13</span>:33:35<span class="token punctuation">]</span>~/mysql-sts-yaml <span class="token comment">#:kubectl get pod -n mysql-sts</span>
NAME      READY   STATUS    RESTARTS   AGE
mysql-0   <span class="token number">2</span>/2     Running   <span class="token number">0</span>          102s
mysql-1   <span class="token number">2</span>/2     Running   <span class="token number">0</span>          64s
mysql-2   <span class="token number">1</span>/2     Running   <span class="token number">0</span>          18s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1675321021708-f97227f0-ef0f-484e-977a-eb4be4d79421.png#averageHue=%23191817&amp;clientId=ua2ee9124-b043-4&amp;from=paste&amp;height=450&amp;id=u1edee1ee&amp;name=image.png&amp;originHeight=450&amp;originWidth=842&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=48737&amp;status=done&amp;style=none&amp;taskId=u8ae37fb0-9dd9-4534-b24a-091947a13cf&amp;title=&amp;width=842" alt="image.png" loading="lazy">
<a name="B4xbl"></a></p>
<h3 id="验证mysql主从同步是否正常" tabindex="-1"><a class="header-anchor" href="#验证mysql主从同步是否正常" aria-hidden="true">#</a> 验证MySQL主从同步是否正常 <br /></h3>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1675063510415-a66964a9-27e4-466f-92d9-1185adfa1ce7.png#averageHue=%230f111a&amp;clientId=u07032b4b-04a2-4&amp;from=paste&amp;height=515&amp;id=u3e103252&amp;name=image.png&amp;originHeight=515&amp;originWidth=913&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=53430&amp;status=done&amp;style=none&amp;taskId=uad162b22-417a-416e-a83c-4f60767ebfa&amp;title=&amp;width=913" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
</div></template>


