<template><div><p>Ceph中独立的服务如果不用可以不启用。 类似阿里云OSS对象存储。遵循亚马逊S3标准数据存在bucket中</p>
<p>官方文档：<code v-pre>http:/docs.ceph.org.cn/radosgw/</code><br />数据不需要放置在目录层次结构中，而是存在于平面地址空间内的同一级别，<br />应用通过唯一地址来识别每个单独数据对象。访问的时候传递的URL是固定的。<br />每个对象可包含有助于检索的元数据通过<strong>RESTful API</strong>在应用级别(而非用户级别)进行访问</p>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670115995731-8365768d-7000-4b53-bb69-720c439963c1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670116247558-c32d04a1-0d4b-49f5-af1a-32badd4bbf66.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_8-1-radosgw对象存储简介" tabindex="-1"><a class="header-anchor" href="#_8-1-radosgw对象存储简介" aria-hidden="true">#</a> 8.1 RadosGW对象存储简介</h3>
<p><strong>RadosGW</strong>是对象存储(<strong>OSS,Object Storage Service</strong>)的一种实现方式，** RADOS<strong>网关也称为Ceph对象网关、<strong>RadosGW、RGW</strong>,是-种服务， 使客户端能够利用标准对象存储API来访问Ceph集群，它支持</strong>AWSS3<strong>和</strong>SwiftAPI**，在ceph0.8版本之后使用<strong>Civetweb</strong>(<a href="https://github.com/civetweb/civetweb" target="_blank" rel="noopener noreferrer">https://github.com/civetweb/civetweb)<ExternalLinkIcon/></a>)的web服务器来响应api请求，客户端使用<strong>http/https</strong>协议通过<strong>RESTful API</strong>与<strong>RGW</strong>通信默认端口7480，而RGW则通过<strong>librados</strong>与ceph集群通信，RGW客户端通过s3或者swift api使用RGW用户进行身份验证，然后RGW网关代表用户利用cephx与ceph存储进行身份验证.<br />S3由Amazon于2006年推出，全称为Simple Storage Service,S3定义了对象存储，是对象存储事实上的标准，从某种意义上说，S3 就是对象存储，对象存储就是S3,它是对象存储市场的霸主，后续的对象存储都是对S3的模仿。</p>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670119694230-3d7210c2-0667-49ee-a769-8842df34eb41.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="_8-2-对象存储特点" tabindex="-1"><a class="header-anchor" href="#_8-2-对象存储特点" aria-hidden="true">#</a> 8.2 对象存储特点</h2>
<p><strong>通过对象存储将数据存储为对象，每个对象除了包含数据，还包含数据自身的元数据。</strong></p>
<ol>
<li>
<p>对象通过<strong>Object ID</strong>来检索，无法通过普通文件系统的方式通过文件路径及文件名称操作来直接访问对象，只能通过API来访问，或者第三方客户端(实际上也是对API的封装)。</p>
</li>
<li>
<p>对象存储中的对象不整理到目录树中，而是存储在扁平的命名空间中，Amazon S3将这个扁平命名空间称为<strong>bucket</strong>,而swift则将其称为容器。无论是bucket还是容器，都不能嵌套。</p>
</li>
<li>
<p>bucket需要被授权才能访问到，一个帐户可以对多个bucket授权，而权限可以不同。方便横向扩展、快速检索数据。</p>
</li>
<li>
<p>不支持客户端挂载，且需要客户端在访问的时候指定文件名称。不是很适用于文件过于频繁修改及删除的场景。</p>
</li>
<li>
<p><strong>ceph</strong>使用<strong>bucket</strong>作为存储桶(存储空间)，实现对象数据的存储和多用户隔离，数据存储在bucket中，用户的权限也是针对bucket进行授权，可以设置用户对不同的bucket拥有不同的权限，以实现权限管理。</p>
</li>
</ol>
<p>基于bucket对项目隔离</p>
<p>对象存储运维需要做的事情：<br />启用RGW<br />做好RGW的高可用<br />创建bucket<br />创建用户并授权<br />做好监控</p>
<h3 id="_8-2-1-bucket-特性" tabindex="-1"><a class="header-anchor" href="#_8-2-1-bucket-特性" aria-hidden="true">#</a> 8.2.1 bucket 特性</h3>
<p><strong>存储空间是用于存储对象(Object) 的容器</strong>，所有的对象都必须隶属于某个存储空间，可以设置和修改存储空间属性用来控制地域、访问权限、生命周期等，这些属性设置直接作用于该存储空间内所有对象，因此可以通过灵活创建不同的存储空间来完成不同的管理功能。</p>
<p>同一个存储空间的内部是扁平的，没有文件系统的目录等概念，所有的对象都直接隶属于其对应的存储空间。</p>
<p>每个用户可以拥有多个存储空间</p>
<p>存储空间的名称在OSS范围内必须是全局唯一的，一旦创建之后无法修改名称。</p>
<p>存储空间内部的对象数目没有限制。</p>
<h3 id="_8-2-2-bucket命名规范" tabindex="-1"><a class="header-anchor" href="#_8-2-2-bucket命名规范" aria-hidden="true">#</a> 8.2.2 bucket命名规范</h3>
<p><a href="https://docs.amazonaws.cn/AmazonS3/latest/userguide/bucketnamingrules.html" target="_blank" rel="noopener noreferrer">https://docs.amazonaws.cn/AmazonS3/latest/userguide/bucketnamingrules.html<ExternalLinkIcon/></a></p>
<ul>
<li>只能包括小写字母、数字和短横线(-)</li>
<li>必须以小写字母或者数字开头和结尾.</li>
<li>长度必须在3-63字节之间。</li>
<li>存储桶名称不能使用用IP地址格式.</li>
<li>Bucket名称必须全局唯一</li>
</ul>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670120818609-bec75cff-4423-45e6-bb82-48d409f94331.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670120832980-020b94b7-78bc-40f0-8711-0b3b5ab2ffb9.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_8-3-对象存储访问对比" tabindex="-1"><a class="header-anchor" href="#_8-3-对象存储访问对比" aria-hidden="true">#</a> 8.3 对象存储访问对比</h3>
<p>目前主流有三种访问标准：</p>
<p><strong>AmEizon S3</strong>:提供了user、bucket 和object分别表示用户、存储桶和对象，其中bucket<br />隶属于user,可以针对user设置不同bucket的名称空间的访问权限，而且不同用户允许访问相同的bucket。<br />（使用最多-最广泛）</p>
<p><strong>OpenStack Swift</strong>:提供了user、 container 和object分别对应于用户、存储桶和对象，不过它还额外为user提供了父级组件account, account用于表示一个项目或租户(OpenStack用户)，因此一个account中可包含一到多个user,它们可共享使用同一组 container, 并为container提供名称空间。</p>
<p><strong>RadosGW</strong>: 提供了user、 subuser、bucket 和object,其中的user对应于S3的user,而subuser则对应于Swift的user,不过user和subuser都不支持为bucket提供名称空间，<br />因此，不同用户的存储桶也不允许同名;不过，自Jewel版本起，RadosGW引入了tenant(租户)用于为user和bucket提供名称空间，但它是个可选组件，RadosGW 基于ACL为不同的用户设置不同的权限控制，如:<br />Read读权限<br />Write写权限<br />Readwrite读写权限<br />full-control全部控制权限</p>
<h2 id="_8-4-部署radosgw服务" tabindex="-1"><a class="header-anchor" href="#_8-4-部署radosgw服务" aria-hidden="true">#</a> 8.4 部署RadosGW服务</h2>
<p>将ceph-mgr1、ceph-mgr2 服务器部署为高可用的radosGW服务</p>
<h3 id="_8-4-1-安装radosgw服务并初始化" tabindex="-1"><a class="header-anchor" href="#_8-4-1-安装radosgw服务并初始化" aria-hidden="true">#</a> 8.4.1 安装radosgw服务并初始化</h3>
<p><strong>Ubuntu</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#apt install radosgw</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>CentOS</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-mgr1 ~<span class="token punctuation">]</span><span class="token comment"># yum install ceph-radosgw</span>
<span class="token punctuation">[</span>root@ceph-mgr2 ~<span class="token punctuation">]</span><span class="token comment"># yum install ceph-radosgw</span>

<span class="token comment">#在ceph deploy服务器将ceph-mgr1初始化为radosGW服务:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ~<span class="token punctuation">]</span>$ <span class="token builtin class-name">cd</span> ceph-cluster/
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph-deploy rgw create ceph-mgr2
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph-deploy rgw create ceph-mgr1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-4-2-验证radosgw服务状态" tabindex="-1"><a class="header-anchor" href="#_8-4-2-验证radosgw服务状态" aria-hidden="true">#</a> 8.4.2 验证radosgw服务状态</h3>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670121760972-179031b2-cd45-4060-8484-5f88dc719934.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_8-4-3-验证radosgw服务进程" tabindex="-1"><a class="header-anchor" href="#_8-4-3-验证radosgw服务进程" aria-hidden="true">#</a> 8.4.3 验证radosgw服务进程</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> radosgw
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_8-4-4-radosgw的存储池类型" tabindex="-1"><a class="header-anchor" href="#_8-4-4-radosgw的存储池类型" aria-hidden="true">#</a> 8.4.4 radosgw的存储池类型</h3>
<p>启动radosgw 服务自动创建default zone区域存储池，这些存储池的功能是不一样的</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># ceph osd pool ls</span>
device_health_metrics
cephfs-metadata
cephfs-data
.rgw.root
default.rgw.log
default.rgw.control
default.rgw.meta
default.rgw.buckets.index
default.rgw.buckets.data

root@ceph-deploy:~<span class="token comment"># ceph osd pool get default.rgw.buckets.data crush_rule</span>
crush_rule: replicated_rule <span class="token comment">#默认是副本池</span>

root@ceph-deploy:~<span class="token comment"># ceph osd pool get default.rgw.buckets.data size</span>
size: <span class="token number">3</span> <span class="token comment">#默认的副本数</span>

root@ceph-deploy:~<span class="token comment"># ceph osd pool get default.rgw.buckets.data pgp_num</span>
pgp_num: <span class="token number">32</span> <span class="token comment">#默认的pgp数量</span>
root@ceph-deploy:~<span class="token comment"># ceph osd pool get default.rgw.buckets.data pg_num</span>
pg_num: <span class="token number">32</span> <span class="token comment">#默认的pg数量</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-4-5-rgw存储池功能" tabindex="-1"><a class="header-anchor" href="#_8-4-5-rgw存储池功能" aria-hidden="true">#</a> 8.4.5 RGW存储池功能</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~ <span class="token comment"># ceph osd lspools</span>
<span class="token number">1</span> device_health_metrics
<span class="token number">3</span> cephfs-metadata
<span class="token number">4</span> cephfs-data
<span class="token number">9</span>.rgw.root
<span class="token number">10</span> default.rgw.log
<span class="token number">11</span> default.rgw.control
<span class="token number">12</span> default.rgw.meta
<span class="token number">13</span> default.rgw.buckets.index
<span class="token number">14</span> default.rgw.buckets.data
<span class="token number">15</span> default.rgw.buckets.non-ec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>.rgw.root</code>: 包含 realm(领域信息)，比如<strong>zone</strong>和<strong>zonegroup</strong>。（用于不同区域多机房之间）<br />default.rgw.log: 存储日志信息，用于记录各种log信息。<br /><code v-pre>default.rgw.control</code>: 系统控制池，在有数据更新时，通知其它RGW更新缓存。<br /><code v-pre>default.rgw.meta</code>: 元数据存储池，通过不同的名称空间分别存储不同的rados对象，这<br />些名称空间包括<strong>用户UID</strong>及其bucket映射信息的名称空间<strong>users.uid</strong>、用户的密钥名称空间<br /><strong>users.keys</strong>、用戶的email名称空间<strong>users.email</strong>、用户的subuser的名称空间<strong>users. swift</strong><br />、以及<strong>bucket</strong>的名称空间<strong>root</strong>等。<br /><code v-pre>default.rgw.buckets.index</code>: 存放 bucket到object的索引信息。<br /><code v-pre>default.rgw.buckets.data</code>: 存放对象的数据 。<br /><code v-pre>default.rgw. buckets.non-ec</code> ：数据的额外信息存储池。</p>
<h3 id="_8-4-6-验证rgw-zone信息" tabindex="-1"><a class="header-anchor" href="#_8-4-6-验证rgw-zone信息" aria-hidden="true">#</a> 8.4.6 验证RGW zone信息 <br /><br /></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@ceph-deploy:~<span class="token comment"># radosgw-admin zone get --rgw-zone=default</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-5-radosgw服务高可用配置" tabindex="-1"><a class="header-anchor" href="#_8-5-radosgw服务高可用配置" aria-hidden="true">#</a> 8.5 radosgw服务高可用配置</h2>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1670125550434-c8a038af-8737-4c7b-9458-790da79c1582.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_8-5-1-radosgw-http高可用" tabindex="-1"><a class="header-anchor" href="#_8-5-1-radosgw-http高可用" aria-hidden="true">#</a> 8.5.1 radosgw http高可用</h3>
<h4 id="_8-5-1-1-自定义http端口" tabindex="-1"><a class="header-anchor" href="#_8-5-1-1-自定义http端口" aria-hidden="true">#</a> 8.5.1.1 自定义http端口</h4>
<p>配置文件可以在ceph deploy服务器修改然后统一推送，或者单独修改每个radosgw服务器的配置为统一配置，然后重启RGW服务。</p>
<p><a href="https://docs" target="_blank" rel="noopener noreferrer">https://docs<ExternalLinkIcon/></a>. <a href="http://ceph.com/en/latest/radosaw/frontends/" target="_blank" rel="noopener noreferrer">ceph.com/en/latest/radosaw/frontends/<ExternalLinkIcon/></a><br />[链接](<a href="https://docs" target="_blank" rel="noopener noreferrer">https://docs<ExternalLinkIcon/></a>. <a href="http://ceph.com/en/latest/radosaw/frontends/" target="_blank" rel="noopener noreferrer">ceph.com/en/latest/radosaw/frontends/<ExternalLinkIcon/></a>)</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-mgr2 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/ceph/ceph.conf</span>
<span class="token punctuation">[</span>client.rgw.ceph-mgr2<span class="token punctuation">]</span> <span class="token comment">#在最后面添加针对当前节点的自定义配置如下:</span>
<span class="token assign-left variable">rgw_host</span><span class="token operator">=</span>ceph-mgr2
<span class="token assign-left variable">rrgw_frontends</span><span class="token operator">=</span>civetweb <span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">9900</span>
<span class="token comment">#重启服务</span>
<span class="token punctuation">[</span>root@ceph-mgr2 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart ceph-radosgw@rgw.ceph-mgr2.service</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/xxlog/1670132303596-46c8cb2e-5090-49da-bd8a-21ba8b7cf6f6.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h4 id="_8-5-1-3-测试http反向代理" tabindex="-1"><a class="header-anchor" href="#_8-5-1-3-测试http反向代理" aria-hidden="true">#</a> 8.5.1.3 测试http反向代理</h4>
<p>使用haproxy代理 rgw两个节点</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> haproxy 

<span class="token function">vim</span> /etc/haproxy/haproxy.cfg



listen ceph-rgw 
  <span class="token builtin class-name">bind</span> <span class="token number">172.31</span>.6.201:80
  mode tcp
  server rgw1 <span class="token number">172.31</span>.6.104:7480 check inter 3s fall <span class="token number">3</span> rise <span class="token number">5</span>
  server rgw2 <span class="token number">172.31</span>.6.105:7480 check inter 3s fall <span class="token number">3</span> rise <span class="token number">5</span>

systemctl restart haproxy.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/xxlog/1670132456616-18c0f457-d9f4-4b0f-abb0-66ab5b3e7e46.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_8-5-2-radosgw-https" tabindex="-1"><a class="header-anchor" href="#_8-5-2-radosgw-https" aria-hidden="true">#</a> 8.5.2 radosgw https</h3>
<p>在rgw节点生成签名证书并配置radosgw启用SSL<br /><strong>方式一： 在反向代理配置SSL证书</strong><br /><strong>方式二： 内置自签证书（浏览器提升不安全证书）</strong></p>
<h4 id="_8-5-2-1-自签名证书" tabindex="-1"><a class="header-anchor" href="#_8-5-2-1-自签名证书" aria-hidden="true">#</a> 8.5.2.1 自签名证书</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-mgr2 ~<span class="token punctuation">]</span><span class="token comment"># cd /etc/ceph/</span>
<span class="token punctuation">[</span>root@ceph-mgr2 ceph<span class="token punctuation">]</span><span class="token comment"># mkdir certs</span>
<span class="token punctuation">[</span>root@ceph-mgr2 ceph<span class="token punctuation">]</span><span class="token comment"># cd certs/</span>
<span class="token comment">#生成key</span>
root@ceph-mgr2 certs<span class="token punctuation">]</span><span class="token comment"># openssl genrsa -out civetweb.key 2048</span>

<span class="token comment">#自签发</span>
<span class="token punctuation">[</span>root@ceph-mgr2 certs<span class="token punctuation">]</span><span class="token comment"># openssl req -new -x509 -key civetweb.key -out civetweb.crt -subj "/CN=rgw.magedu.net"</span>
<span class="token comment">#将key和私钥放一块</span>
<span class="token punctuation">[</span>root@ceph-mgr2 certs<span class="token punctuation">]</span><span class="token comment"># cat civetweb.key civetweb.crt > civetweb.pem</span>
<span class="token punctuation">[</span>root@ceph-mgr2 certs<span class="token punctuation">]</span><span class="token comment"># tree</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-5-2-2-ssl配置" tabindex="-1"><a class="header-anchor" href="#_8-5-2-2-ssl配置" aria-hidden="true">#</a> 8.5.2.2 SSL配置</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-mgr2 certs<span class="token punctuation">]</span><span class="token comment"># vim /etc/ceph/ceph.conf</span>
<span class="token punctuation">[</span>client.rgw.ceph-mgr2<span class="token punctuation">]</span>
rgw_host <span class="token operator">=</span> ceph-mgr2
rgw_frontends <span class="token operator">=</span>  <span class="token string">"civetweb port-9900+9443s ssl_certificate=/etc/ceph/certs/civetweb.pem"</span>
root@ceph-mgr2 certs<span class="token punctuation">]</span><span class="token comment"># systemctl restart ceph-radosgw@rgw.ceph-mgr2.service</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-5-2-3-验证https端口" tabindex="-1"><a class="header-anchor" href="#_8-5-2-3-验证https端口" aria-hidden="true">#</a> 8.5.2.3 验证https端口</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ss <span class="token parameter variable">-tnl</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_8-5-3-radosgw-https高可用" tabindex="-1"><a class="header-anchor" href="#_8-5-3-radosgw-https高可用" aria-hidden="true">#</a> 8.5.3 radosgw https高可用</h3>
<p>通过负载均衡对radosgw进行反向代理，实现高可用</p>
<h4 id="_8-5-3-1-域名解析至vip" tabindex="-1"><a class="header-anchor" href="#_8-5-3-1-域名解析至vip" aria-hidden="true">#</a> 8.5.3.1 域名解析至VIP</h4>
<p>先将域名解析至负裁均衡的IP<br />172.31.6.201 <a href="http://rgw.magedu.net" target="_blank" rel="noopener noreferrer">rgw.magedu.net<ExternalLinkIcon/></a></p>
<h4 id="_8-5-3-2-负载均衡配置" tabindex="-1"><a class="header-anchor" href="#_8-5-3-2-负载均衡配置" aria-hidden="true">#</a> 8.5.3.2 负载均衡配置</h4>
<p>负载均衡配置监听及realserver ,把SSL证书放在了rgw节点上面（也放在负载均衡上面）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#ceph http access</span>
listen ceph-rgw
<span class="token builtin class-name">bind</span> <span class="token number">172.31</span>.6.201:80
mode tcp
server <span class="token number">172.31</span>.6.104 <span class="token number">172.31</span>.6.104:9900 check inter 3s fall <span class="token number">3</span> rise <span class="token number">5</span>
server <span class="token number">172.31</span>.6.105 <span class="token number">172.31</span>.6.105:9900 check inter 3s fall <span class="token number">3</span> rise <span class="token number">5</span> 


<span class="token comment">#ceph https access</span>
listen ceph-rgw
<span class="token builtin class-name">bind</span> <span class="token number">172.31</span>.6.201:443
mode tcp
server <span class="token number">172.31</span>.6.104 <span class="token number">172.31</span> .6.104:9443 check inter 3s fall <span class="token number">3</span> rise <span class="token number">5</span>
server <span class="token number">172.31</span>.6.105 <span class="token number">172.31</span> .6.105:9443 check inter 3s fall <span class="token number">3</span> rise <span class="token number">5</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-5-3-3-重启负载均衡" tabindex="-1"><a class="header-anchor" href="#_8-5-3-3-重启负载均衡" aria-hidden="true">#</a> 8.5.3.3 重启负载均衡</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ceph-client1-centos7 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart haproxy</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_8-5-3-4-测试访问" tabindex="-1"><a class="header-anchor" href="#_8-5-3-4-测试访问" aria-hidden="true">#</a> 8.5.3.4 测试访问</h4>
<h3 id="_8-5-4-日志及其它优化配置" tabindex="-1"><a class="header-anchor" href="#_8-5-4-日志及其它优化配置" aria-hidden="true">#</a> 8.5.4 日志及其它优化配置 <br /><br /></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#创建日志目录:</span>
<span class="token punctuation">[</span>root@ceph-mgr2 certs<span class="token punctuation">]</span><span class="token comment"># mkdir /var/log/radosgw</span>
<span class="token punctuation">[</span>root@ceph-mgr2 certs<span class="token punctuation">]</span><span class="token comment"># chown ceph.ceph /var/log/radosgw</span>


<span class="token comment">#当前配置</span>
<span class="token punctuation">[</span>root@ceph-mgr2 ceph<span class="token punctuation">]</span><span class="token comment"># vim ceph.conf</span>
<span class="token punctuation">[</span>client.rgw.ceph-mgr2<span class="token punctuation">]</span>
rgw_host <span class="token operator">=</span> ceph-mgr2
rgw_frontends <span class="token operator">=</span> <span class="token string">"civetweb port=9900+8443s
ssl_certificate=/etc/ceph/certs/civetweb.pem
error_log_file=/var/log/radosgw/civetweb.error.log
access_log_file=/var/log/radosgw/civetweb.access.log
request_timeout_ms=30000  num_threads=200"</span>
<span class="token comment">#请求超过30s 报超时    #100线程 每个显示处理一个请求（2000）</span>

<span class="token comment">#https://docs.ceph.com/en/mimic/radosgw/config-ref/</span>
num_threads默认值等于 <span class="token assign-left variable">rgw_thread_pool_size</span><span class="token operator">=</span><span class="token number">100</span>


<span class="token comment">#重启服务</span>
<span class="token punctuation">[</span>root@ceph-mgr2 certs<span class="token punctuation">]</span><span class="token comment"># systemctl restart ceph-radosgw@rgw.ceph-mgr2.service</span>

<span class="token comment">#访问测试:</span>
<span class="token punctuation">[</span>root@ceph-mgr2 certs<span class="token punctuation">]</span><span class="token comment"># curl -k https://172.31.6.108:8443</span>

<span class="token comment">#验证日志</span>
<span class="token function">tail</span> /var/log/radosgw/civetweb/access.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-6-测试数据读写" tabindex="-1"><a class="header-anchor" href="#_8-6-测试数据读写" aria-hidden="true">#</a> 8.6 测试数据读写</h2>
<h4 id="_8-6-1-rgw-server配置" tabindex="-1"><a class="header-anchor" href="#_8-6-1-rgw-server配置" aria-hidden="true">#</a> 8.6.1 RGW Server配置:</h4>
<p>在实际的生产环境，RGW1和RGW的配置参数是完全一样的.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jack@ceph-mgr2:-$ <span class="token function">sudo</span> <span class="token function">cat</span> /etc/ceph/ceph.conf
<span class="token punctuation">[</span>global<span class="token punctuation">]</span> 
fsid <span class="token operator">=</span> 1883278f-95fe-4f85-b027-3a6eba444861
public_network <span class="token operator">=</span> <span class="token number">172.31</span>.0.0/21
cluster_network <span class="token operator">=</span> <span class="token number">192.168</span>.0.0/21
mon_initial members <span class="token operator">=</span> ceph-mon1
<span class="token assign-left variable">mon_host</span><span class="token operator">=</span> <span class="token number">172.31</span>.6.101
auth_cluster_required <span class="token operator">=</span> cephx
auth_service_required <span class="token operator">=</span> cephx
auth_client_required <span class="token operator">=</span> cephx



<span class="token punctuation">[</span>client.rgw.ceph-mgr1<span class="token punctuation">]</span>
rgw_host <span class="token operator">=</span> ceph-mgr1
rgw_frontends <span class="token operator">=</span> civetweb port:<span class="token operator">=</span><span class="token number">9900</span>
rgw_dns_name <span class="token operator">=</span> rgw.magedu.net

<span class="token punctuation">[</span>client.rgw.ceph-mgr2<span class="token punctuation">]</span>
rgw_host <span class="token operator">=</span> ceph-mgr2
rgw_frontends <span class="token operator">=</span> civetweb port:<span class="token operator">=</span><span class="token number">9900</span>
rgw_dns_name <span class="token operator">=</span> rgw.magedu.net
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-6-2-创建rgw-账号" tabindex="-1"><a class="header-anchor" href="#_8-6-2-创建rgw-账号" aria-hidden="true">#</a> 8.6.2 创建RGW 账号</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph@ceph-deploy:/home/ceph/ceph cluster$ rdosgw admin user create <span class="token parameter variable">--uid</span><span class="token operator">=</span><span class="token string">"user1"</span> --display-name<span class="token operator">=</span><span class="token string">"user1"</span>

<span class="token comment">#创建用户会生成key 是访问SGW存储的凭证</span>

<span class="token string">"keys"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
         <span class="token string">"user"</span> <span class="token builtin class-name">:</span> <span class="token string">""</span>use1<span class="token string">""</span>,
         <span class="token string">"access_key"</span><span class="token builtin class-name">:</span> <span class="token string">"T119RIWTRMMI9BBJEC66"</span>，
         <span class="token string">"secret_key"</span><span class="token builtin class-name">:</span> <span class="token string">"r8kwaYi9hdZJyCKW23hucEUABli 5xOAXSGs8worB"</span>
<span class="token punctuation">}</span>
<span class="token punctuation">]</span>,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-6-3-安装s3cmd客户端" tabindex="-1"><a class="header-anchor" href="#_8-6-3-安装s3cmd客户端" aria-hidden="true">#</a> 8.6.3 安装s3cmd客户端</h3>
<p>s3cmd 是一个通过命令行访问ceph RGW实现创建存储同桶、上传、下载以及管理数据到对象存储的命令行客户端工具。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph@ceph-deploy:/home/ceph/ceph-cluster$ <span class="token function">sudo</span> <span class="token function">apt-cache</span> madison s3cmd
ceph@ceph-deploy:/home/ceph/ceph-cluster$ <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> s3cmd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-6-4-配置客户端执行环境" tabindex="-1"><a class="header-anchor" href="#_8-6-4-配置客户端执行环境" aria-hidden="true">#</a> 8.6.4 配置客户端执行环境</h3>
<h4 id="_8-6-4-1-s3cmd客户端添加域名解析" tabindex="-1"><a class="header-anchor" href="#_8-6-4-1-s3cmd客户端添加域名解析" aria-hidden="true">#</a> 8.6.4.1 s3cmd客户端添加域名解析</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/hosts
<span class="token number">127.0</span>.0.1   localhost
<span class="token number">127.0</span>.1.1  ubuntu.example.local  ubuntu

<span class="token number">172.31</span>.6.108 ceph-node3.example.local ceph-node3
<span class="token number">172.31</span>.6.109 ceph-node4.example.local ceph-node4
<span class="token number">172.31</span>.6.201 rgw.magedu.net
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-6-4-2-配置命令执行环境" tabindex="-1"><a class="header-anchor" href="#_8-6-4-2-配置命令执行环境" aria-hidden="true">#</a> 8.6.4.2 配置命令执行环境</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jack@ceph-deploy:~$ <span class="token function">sudo</span> <span class="token function">su</span> - root
root@ceph-deploy:~<span class="token comment"># s3cmd --help</span>
root@ceph-deploy:~<span class="token comment"># s3cmd --configure</span>

Enter new values or accept defaults <span class="token keyword">in</span> brackets with Enter.
Refer to user manual <span class="token keyword">for</span> detailed description of all options.

Access key and Secret key are your identifiers <span class="token keyword">for</span> Amazon S3. Leave them empty <span class="token keyword">for</span>
using the <span class="token function">env</span> variables.

Access Key: JIJX25OFEJ40JEBECDZV <span class="token comment">#输入用户 access key</span>
Secret Key: vBa23pj4AhGk9GPeSrhL9NLaldShudVfjQ4AC90E <span class="token comment">#输入用户secret key</span>
Default Region <span class="token punctuation">[</span>US<span class="token punctuation">]</span>: <span class="token comment">#region 选项</span>

Use <span class="token string">"s3.amazonaws.com"</span> <span class="token keyword">for</span> S3 Endpoint and not modify it to the target Amazon S3.
S3 Endpoint <span class="token punctuation">[</span>s3.amazonaws.com<span class="token punctuation">]</span>: rgw.magedu.net:9900 <span class="token comment">#RGW 域名</span>
Use  <span class="token string">"%(bucket)s.s3.amazonaws.com"</span> to the target Amazon S3. <span class="token string">"%(bucket)s"</span> and <span class="token string">"%(location)s"</span> vars can be used
<span class="token keyword">if</span> the target S3 system supports dns based buckets.
DNS-style bucket+hostname:port template <span class="token keyword">for</span> accessing a bucket
<span class="token punctuation">[</span>%<span class="token punctuation">(</span>bucket<span class="token punctuation">)</span>s.s3.amazonaws.com<span class="token punctuation">]</span>: rgw.magedu.net:9900/%<span class="token punctuation">(</span>bucket<span class="token punctuation">)</span> <span class="token comment">#bucket城名格式</span>
Encryption password is used to protect your files from reading
by unauthorized persons <span class="token keyword">while</span> <span class="token keyword">in</span> transfer to S3
Encryption password <span class="token builtin class-name">:</span> <span class="token comment">#秘钥是否使用密码加密</span>
Path to GPG program <span class="token punctuation">[</span>/usr/bin/gpg<span class="token punctuation">]</span>: <span class="token comment">#使用gpg进行加密（系统自带不需要安装）</span>

<span class="token comment">#是否使用HTTPS</span>
When using secure HTTPS protocol all communication with Amazon S3
servers is protected from 3rd party eavesdropping. This method is
slower than plain HTTP, and can only be proxied with Python <span class="token number">2.7</span> or newe r
Use HTTPS protocol <span class="token punctuation">[</span>Yes<span class="token punctuation">]</span>: No  

<span class="token comment">##是否使用代理服务器</span>
On some networks all internet access must go through a HTTP proxy.
Try setting it here <span class="token keyword">if</span> you can<span class="token string">'t connect to S3 directly
HTTP Proxy server name :

#生成的信息
New settings: 
Access Key: T119RIWTRMMI9BBJEC66
Secret Key: r8kWaY i9hdZJyCKW23hucEUABli5x0AXSGs8worB
Default Region: US
S3 Endpoint: rgw.magedu.net:9900
DNS-style bucket+hostname:port template for accessing a bucket: rgw.magedu.net:9900/%(bucket)
Enc ryption password:
Path to GPG prog ram:/usr/bin/gpg
Use HTTPS protocol: False
HTTP Proxy server name:
HTTP Proxy server port: 0
Test access with supplied credentials? [Y/n]] Y #测试连接
PLease wait, attempting to list all buckets.. .
Success. Your access key and secret key worked fine :-) #如果连接成功就弹出保存配置
Now verifying that encryption works. . .
Not conf igured. Never mind.
Save settings? [y/N] y
Configuration saved to '</span>/root/.s3cfg'

<span class="token comment">#测试命令 </span>
s3cmd la
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-6-5-命令行客户端s3cmd-验证数据上传" tabindex="-1"><a class="header-anchor" href="#_8-6-5-命令行客户端s3cmd-验证数据上传" aria-hidden="true">#</a> 8.6.5 命令行客户端s3cmd 验证数据上传</h3>
<h4 id="_8-6-5-1-查看帮助信息" tabindex="-1"><a class="header-anchor" href="#_8-6-5-1-查看帮助信息" aria-hidden="true">#</a> 8.6.5.1 查看帮助信息</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>s3cmd <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_8-6-5-2-创建bucket-以验证权限" tabindex="-1"><a class="header-anchor" href="#_8-6-5-2-创建bucket-以验证权限" aria-hidden="true">#</a> 8.6.5.2 创建bucket 以验证权限</h4>
<p>存储空间(Bucket) 是用于存储对象(Object) 的容器， 在上传任意类型的Object前，您需要先创建Bucket.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Make bucket
s3cmd mb s3://BUCKET
-------------------------------------------------

root@ceph-deploy:~<span class="token comment"># s3cmd mb s3://mybucket</span>
Bucket <span class="token string">'s3://mybucket/'</span> created

root@ceph-deploy:~<span class="token comment"># s3cmd mb s3://css</span>
Bucket <span class="token string">'s3://css/'</span> created

root@ceph-deploy:~<span class="token comment"># s3cmd mb s3://images</span>
Bucket <span class="token string">'s3://images/'</span> created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-6-5-3-验证上传数据" tabindex="-1"><a class="header-anchor" href="#_8-6-5-3-验证上传数据" aria-hidden="true">#</a> 8.6.5.3 验证上传数据</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> Put <span class="token function">file</span> into bucket
       s3cmd put FILE <span class="token punctuation">[</span>FILE<span class="token punctuation">..</span><span class="token punctuation">]</span> s3://BUCKET<span class="token punctuation">[</span>/PREFIX<span class="token punctuation">]</span>

root@ceph-deploy:~<span class="token comment"># wget http://www.magedu.com/wp-content/uploads/2019/07/2019070508503489.png</span>
<span class="token comment">#上传数据</span>


root@ceph-deploy:~<span class="token comment"># s3cmd put 2019070508503489.png s3://mages/</span>
upload: <span class="token string">'2019070508503489.png -> '</span>s3://images/2019070508503489.png<span class="token string">' [1 of 1] 40703 of 40703 100% in  0s  1911.84 kB/s done

root@ceph-deploy:~# s3cmd put 2019070508503489.png s3://images/png/
upload: '</span><span class="token number">2019070508503489</span>.png<span class="token string">' -> '</span>s3://images/png/2019070508503489.png' <span class="token punctuation">[</span><span class="token number">1</span> of <span class="token number">1</span><span class="token punctuation">]</span> <span class="token number">40703</span> of <span class="token number">40703</span> <span class="token number">100</span>% <span class="token keyword">in</span> 2s <span class="token number">16.24</span> kB/s <span class="token keyword">done</span>



<span class="token comment">#验证数据</span>
root@ceph-deploy:~<span class="token comment"># s3cmd ls s3://images/</span>
                      DIR s3://images/png/
<span class="token number">2021</span>-08-26 <span class="token number">13</span>:35    <span class="token number">40703</span> s3://images/2019070508503489.png
root@ceph-deploy:~<span class="token comment"># s3cmd ls s3://images/png/</span>
<span class="token number">2021</span>-08-26 <span class="token number">13</span>:35    <span class="token number">40703</span> s3://images/png/2019070508503489.png

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-6-5-4-验证下载文件" tabindex="-1"><a class="header-anchor" href="#_8-6-5-4-验证下载文件" aria-hidden="true">#</a> 8.6.5.4 验证下载文件</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Get <span class="token function">file</span> from bucket

    s3cmd get s3://BUCKET/OBJECT LOCAL_FILE
------------------------------------------------------------------------
root@ceph-deploy:~<span class="token comment"># s3cmd get s3://images/2019070508503489.png /opt/</span>
download: <span class="token string">'s3://images/2019070508503489.png'</span> -<span class="token operator">></span> /opt/2019070508503489.png' <span class="token punctuation">[</span>1of <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token number">40703</span> of <span class="token number">40703</span> <span class="token number">100</span>% <span class="token keyword">in</span>  0s  <span class="token number">5.80</span> MB/s <span class="token keyword">done</span>

root@ceph-deploy:~<span class="token comment"># ls /opt/2019070508503489.png</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-6-5-5-删除文件" tabindex="-1"><a class="header-anchor" href="#_8-6-5-5-删除文件" aria-hidden="true">#</a> 8.6.5.5 删除文件</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Delete <span class="token function">file</span> from bucket <span class="token punctuation">(</span>alias <span class="token keyword">for</span> del<span class="token punctuation">)</span>
s3cmd <span class="token function">rm</span> s3://BUCKET/OBJECT
---------------------------------------------------
root@ceph-deploy: ~<span class="token comment"># s3cmd ls s3://images/ #验证当前文件</span>
                      DIR s3://images/png/
<span class="token number">2021</span>-08-26 <span class="token number">13</span>:35  <span class="token number">40703</span>   s3://images/2019070508503489.png



root@ceph-deploy: ~<span class="token comment"># s3cmd rm s3://images/2019070508503489.png #删除文件</span>
delete: <span class="token string">'s3://images/2019070508503489.png'</span>


root@ceph-deploy:~<span class="token comment"># s3cmd ls s3://images/ #验证是否被删除</span>
                      DIR s3://images/png/
<span class="token comment">#查看存储池pg</span>
ceph pg ls-by-pool default.rgw.buckets.data <span class="token function">awk</span> <span class="token string">'{print $1, $2, $15}'</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


