<template><div><p><a href="https://so.csdn.net/so/search?q=Harbor&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">Harbor<ExternalLinkIcon/></a>的高可用方案大致可以分为下面两种，一种依赖共享存储来保存镜像数据，另一种基于不同Harbor服务器间的镜像复制实现。如下图所示：  <br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427480989-6d06f6b2-a81d-443c-9445-eedc4964cc30.png#averageHue=%23f1f1e9&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=557&amp;id=u3a43c4e0&amp;name=0daa134ec1d24be7a9449b3a383a9af9.png&amp;originHeight=557&amp;originWidth=666&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=41662&amp;status=done&amp;style=none&amp;taskId=u59dcd69d-8706-49a7-b3d6-53a1cd9f7c1&amp;title=&amp;width=666" alt="0daa134ec1d24be7a9449b3a383a9af9.png" loading="lazy"></p>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427492025-3636b521-a363-4c25-b889-75b1c688f054.png#averageHue=%23f4f4e8&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=442&amp;id=u95219d46&amp;name=b2b5315433e34bcdbee99d2f5215437f.png&amp;originHeight=442&amp;originWidth=615&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=41471&amp;status=done&amp;style=none&amp;taskId=udc3d1eea-8129-4c69-b7eb-29bc17d3467&amp;title=&amp;width=615" alt="b2b5315433e34bcdbee99d2f5215437f.png" tabindex="0" loading="lazy"><figcaption>b2b5315433e34bcdbee99d2f5215437f.png</figcaption></figure>
<p><a name="sSCfg"></a></p>
<h3 id="主机规划" tabindex="-1"><a class="header-anchor" href="#主机规划" aria-hidden="true">#</a> 主机规划</h3>
<p>本文基于第二种方案实现Harbor的高可用部署，使用主机如下：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>192.168.122.10 harbor<span class="token punctuation">-</span>server1.linux.io 2C4G Ubuntu20.04	harbor服务器1
192.168.122.11 harbor<span class="token punctuation">-</span>server2.linux.io 2C4G Ubuntu20.04  harbor服务器2
192.168.122.12 haproxy<span class="token punctuation">-</span>server1.linux.io 2C2G Ubuntu20.04  haproxy+keepalived服务器1
192.168.122.13 haproxy<span class="token punctuation">-</span>server2.linux.io 2C2G Ubuntu20.04  haproxy+keepalived服务器2
192.168.122.188(VIP) harbor.linux.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="DoiZ5"></a></p>
<h3 id="harbor部署" tabindex="-1"><a class="header-anchor" href="#harbor部署" aria-hidden="true">#</a> Harbor部署</h3>
<p>先配置<a href="https://so.csdn.net/so/search?q=%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">域名解析<ExternalLinkIcon/></a>hosts文件，步骤略<br />在两个harbor-server节点部署Docker，步骤略<br />然后在两个harbor节点上部署harbor，步骤如下：</p>
<p><a name="Pup7D"></a></p>
<h4 id="生成证书" tabindex="-1"><a class="header-anchor" href="#生成证书" aria-hidden="true">#</a> 生成证书</h4>
<p>两个harbor使用同一套证书</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /apps/harbor/cert <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> /apps/harbor/cert
<span class="token comment">#生成根证书</span>
openssl genrsa <span class="token parameter variable">-out</span> ca.key <span class="token number">4096</span>
openssl req <span class="token parameter variable">-x509</span> <span class="token parameter variable">-new</span> <span class="token parameter variable">-nodes</span> <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-days</span> <span class="token number">3650</span> <span class="token punctuation">\</span>
 <span class="token parameter variable">-subj</span> <span class="token string">"/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=linux.io"</span> <span class="token punctuation">\</span>
 <span class="token parameter variable">-key</span> ca.key <span class="token punctuation">\</span>
 <span class="token parameter variable">-out</span> ca.crt

<span class="token comment">#生成harbor使用的证书</span>
openssl genrsa <span class="token parameter variable">-out</span> harbor-server.key <span class="token number">4096</span>
openssl req <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-new</span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-subj</span> <span class="token string">"/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=linux.io"</span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-key</span> harbor-server.key <span class="token punctuation">\</span>
    <span class="token parameter variable">-out</span> harbor-server.csr
<span class="token function">cat</span> <span class="token operator">></span> v3.ext <span class="token operator">&lt;&lt;-</span><span class="token string">EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1=linux.io
DNS.2=harbor-server.linux.io
DNS.3=harbor-server1.linux.io
DNS.4=harbor-server2.linux.io
EOF</span>
openssl x509 <span class="token parameter variable">-req</span> <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-days</span> <span class="token number">3650</span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-extfile</span> v3.ext <span class="token punctuation">\</span>
    <span class="token parameter variable">-CA</span> ca.crt <span class="token parameter variable">-CAkey</span> ca.key <span class="token parameter variable">-CAcreateserial</span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-in</span> harbor-server.csr <span class="token punctuation">\</span>
    <span class="token parameter variable">-out</span> harbor-server.crt
<span class="token function">rm</span> <span class="token parameter variable">-f</span> harbor-server.csr	<span class="token comment">#删除证书请求文件 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后将证书拷贝到两个harbor-server</p>
<p><a name="Jlwgh"></a></p>
<h4 id="下载安装包" tabindex="-1"><a class="header-anchor" href="#下载安装包" aria-hidden="true">#</a> 下载安装包</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://github.com/goharbor/harbor/releases/download/v2.5.3/harbor-offline-installer-v2.5.3.tgz
<span class="token function">tar</span> xf installer-v2.5.3.tgz
<span class="token builtin class-name">cd</span> harbor/
<span class="token function">cp</span> harbor.yml.tmpl harbor.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="Sqz68"></a></p>
<h4 id="修改配置" tabindex="-1"><a class="header-anchor" href="#修改配置" aria-hidden="true">#</a> 修改配置</h4>
<p>修改两个节点上harbor/harbor.yml，两个节点的配置不同之处只有hostname配置项修改为和各自的hostname一致即可</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>hostname: harbor-server1.linux.io	<span class="token comment">#</span>
http:
  port: <span class="token number">80</span>
https:
  <span class="token comment"># https port for harbor, default is 443</span>
  port: <span class="token number">443</span>
  <span class="token comment"># The path of cert and key files for nginx</span>
  certificate: /apps/harbor/cert/harbor-server.crt
  private_key: /apps/harbor/cert/harbor-server.key
harbor_admin_password: Passw0rd		<span class="token comment">#harbor界面的密码</span>

data_volume: /data	<span class="token comment">#上传到harbor的镜像的保存目录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="VfMg9"></a></p>
<h4 id="启动harbor" tabindex="-1"><a class="header-anchor" href="#启动harbor" aria-hidden="true">#</a> 启动harbor</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>./install.sh --with-trivy --with-chartmuseum
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="O4IFr"></a></p>
<h4 id="配置镜像同步" tabindex="-1"><a class="header-anchor" href="#配置镜像同步" aria-hidden="true">#</a> 配置镜像同步</h4>
<p>先在两个harbor-server上创建相同的项目base-images</p>
<p><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427644497-cd7a4967-0112-417c-b37d-8e0b4da69dcc.png#averageHue=%23d4a481&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=1019&amp;id=uedfdfaf0&amp;name=9a03b48d4c9840079c9b6876eb8ea741.png&amp;originHeight=1019&amp;originWidth=1917&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=171310&amp;status=done&amp;style=none&amp;taskId=uab507f82-e7d0-44fd-90ec-6c65c9e7689&amp;title=&amp;width=1917" alt="9a03b48d4c9840079c9b6876eb8ea741.png" loading="lazy"><br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427657736-86c8ce09-f47f-4e55-87e6-2a4db8da6ee7.png#averageHue=%23d3a17b&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=1016&amp;id=u1d3e6313&amp;name=553b0cff4300499294cfdffc02577f9b.png&amp;originHeight=1016&amp;originWidth=1919&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=170988&amp;status=done&amp;style=none&amp;taskId=u68fd5c57-56f3-4fd9-96a2-2fad44d874b&amp;title=&amp;width=1919" alt="553b0cff4300499294cfdffc02577f9b.png" loading="lazy"></p>
<p>在harbor-server1上配置指向harbor-server2的复制规则</p>
<p><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427670561-3579e764-2d41-40c8-bc7a-d051b7e91211.png#averageHue=%23e0bb8d&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=880&amp;id=u60ae451e&amp;name=c88142e88d6743bcab9be62115699f23.png&amp;originHeight=880&amp;originWidth=1920&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=126689&amp;status=done&amp;style=none&amp;taskId=ubffe6419-0639-4fea-a8b0-2ee4a55ded0&amp;title=&amp;width=1920" alt="c88142e88d6743bcab9be62115699f23.png" loading="lazy"><br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427677510-25504869-cfef-40df-a7a5-2b1e3207215e.png#averageHue=%23a8a8a8&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=1020&amp;id=uc30e54d3&amp;name=07df6e94fcdc4aa2b5ec09681da915f6.png&amp;originHeight=1020&amp;originWidth=1919&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=154436&amp;status=done&amp;style=none&amp;taskId=ue81756e5-c22a-4292-b7b8-6a9cdea6366&amp;title=&amp;width=1919" alt="07df6e94fcdc4aa2b5ec09681da915f6.png" loading="lazy"></p>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427682095-ff932a3a-fc6e-4168-b604-02a8d4ec78aa.png#averageHue=%23cad1af&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=962&amp;id=u36052eb2&amp;name=acaad6621cf54ac591d5ecdfc103efec.png&amp;originHeight=962&amp;originWidth=1919&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=158233&amp;status=done&amp;style=none&amp;taskId=u16f63290-fd16-460f-84e2-176b0490447&amp;title=&amp;width=1919" alt="acaad6621cf54ac591d5ecdfc103efec.png" tabindex="0" loading="lazy"><figcaption>acaad6621cf54ac591d5ecdfc103efec.png</figcaption></figure>
<p><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427686790-183a31b0-47f1-4268-be18-b85723556517.png#averageHue=%23dbb68d&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=962&amp;id=u483db06d&amp;name=222247afe60c4c4da56d5a85d75b5539.png&amp;originHeight=962&amp;originWidth=1919&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=141546&amp;status=done&amp;style=none&amp;taskId=ud10e4a01-05b6-4fd0-b582-f04f626ad06&amp;title=&amp;width=1919" alt="222247afe60c4c4da56d5a85d75b5539.png" loading="lazy"><br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427693491-b6c9ef01-6656-4843-a086-a84c8d305c65.png#averageHue=%23adabab&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=954&amp;id=u1f8418fe&amp;name=19315923d3b34ff89586630e92e1448e.png&amp;originHeight=954&amp;originWidth=1916&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=141173&amp;status=done&amp;style=none&amp;taskId=u3bc0c6da-0379-4c77-b12f-bad2ee86543&amp;title=&amp;width=1916" alt="19315923d3b34ff89586630e92e1448e.png" loading="lazy"></p>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427703480-e19a6fb7-0a42-4e51-8b89-f7e06b1eec8a.png#averageHue=%23acaaaa&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=968&amp;id=u489d0039&amp;name=817e5b6906a945638ebaf84f852b8e47.png&amp;originHeight=968&amp;originWidth=1920&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=154198&amp;status=done&amp;style=none&amp;taskId=u9c8e73f0-fa42-4a3b-862d-7fe96d2fb45&amp;title=&amp;width=1920" alt="817e5b6906a945638ebaf84f852b8e47.png" tabindex="0" loading="lazy"><figcaption>817e5b6906a945638ebaf84f852b8e47.png</figcaption></figure>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427708057-fd114cd0-b784-4411-bcde-c7bf1ba708c9.png#averageHue=%23deedcd&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=956&amp;id=ufde15413&amp;name=f535e301eae648a392b6dc564cd415a1.png&amp;originHeight=956&amp;originWidth=1920&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=148285&amp;status=done&amp;style=none&amp;taskId=uf4882a63-43e2-4f9a-a49c-04718752586&amp;title=&amp;width=1920" alt="f535e301eae648a392b6dc564cd415a1.png" tabindex="0" loading="lazy"><figcaption>f535e301eae648a392b6dc564cd415a1.png</figcaption></figure>
<p>在harbor-server2上配置指向harbor-server1的复制规则，步骤和上面一样，只需要把目标地址改为harbor-server1的地址192.168.122.10即可  <br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427721834-795f2355-7482-49af-8904-c40ca4df43fa.png#averageHue=%23d7b386&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=958&amp;id=ua75cf76a&amp;name=4a6b2c70500a44ee9c5b746e88fe19a8.png&amp;originHeight=958&amp;originWidth=1920&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=146548&amp;status=done&amp;style=none&amp;taskId=uc765909c-0d60-4374-ad2d-2261b7572d6&amp;title=&amp;width=1920" alt="4a6b2c70500a44ee9c5b746e88fe19a8.png" loading="lazy"></p>
<p><a name="avTZa"></a></p>
<h3 id="部署haproxy-keepalived" tabindex="-1"><a class="header-anchor" href="#部署haproxy-keepalived" aria-hidden="true">#</a> 部署haproxy+keepalived</h3>
<p><a name="kucJL"></a></p>
<h4 id="安装haproxy-keepalived" tabindex="-1"><a class="header-anchor" href="#安装haproxy-keepalived" aria-hidden="true">#</a> 安装haproxy+keepalived</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">apt</span> <span class="token parameter variable">-y</span> <span class="token function">install</span> haproxy keepalived
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="gwb0D"></a></p>
<h4 id="修改haproxy配置文件" tabindex="-1"><a class="header-anchor" href="#修改haproxy配置文件" aria-hidden="true">#</a> 修改haproxy配置文件</h4>
<p>修改/etc/haproxy/haproxy.cfg，添加下面内容，两个节点一样</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>listen harbor_80
       <span class="token builtin class-name">bind</span> <span class="token number">192.168</span>.122.188:80
       option tcplog
       mode tcp
       balance <span class="token builtin class-name">source</span>
       server harbor1 <span class="token number">192.168</span>.122.10:80 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
       server harbor2 <span class="token number">192.168</span>.122.11:80 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
listen harbor_443
       <span class="token builtin class-name">bind</span> <span class="token number">192.168</span>.122.188:443
       option tcplog
       mode tcp
       balance <span class="token builtin class-name">source</span>
       server harbor1 <span class="token number">192.168</span>.122.10:443 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
       server harbor2 <span class="token number">192.168</span>.122.11:443 check inter <span class="token number">2000</span> fall <span class="token number">3</span> rise <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="BPQ5n"></a></p>
<h4 id="修改keepalived配置文件" tabindex="-1"><a class="header-anchor" href="#修改keepalived配置文件" aria-hidden="true">#</a> 修改keepalived配置文件</h4>
<p>修改/etc/keepalived/keepalived.conf，haproxy-server1内容如下</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>global_defs <span class="token punctuation">{</span>
   notification_email <span class="token punctuation">{</span>
     acassen
   <span class="token punctuation">}</span>
   notification_email_from Alexandre.Cassen@firewall.loc
   smtp_server <span class="token number">192.168</span>.200.1
   smtp_connect_timeout <span class="token number">30</span>
   router_id harbor-lvs1
<span class="token punctuation">}</span>

vrrp_instance VI_1 <span class="token punctuation">{</span>
    state MASTER
    interface enp1s0
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
        <span class="token number">192.168</span>.122.188

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>haproxy-server2内容如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>global_defs <span class="token punctuation">{</span>
   notification_email <span class="token punctuation">{</span>
     acassen
   <span class="token punctuation">}</span>
   notification_email_from Alexandre.Cassen@firewall.loc
   smtp_server <span class="token number">192.168</span>.200.1
   smtp_connect_timeout <span class="token number">30</span>
   router_id harbor-lvs2
<span class="token punctuation">}</span>

vrrp_instance VI_1 <span class="token punctuation">{</span>
    state BACKUP
    interface enp1s0
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
        <span class="token number">192.168</span>.122.188

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="kgwpW"></a></p>
<h4 id="启动服务" tabindex="-1"><a class="header-anchor" href="#启动服务" aria-hidden="true">#</a> 启动服务</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl start haproxy <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> haproxy
systemctl start keepalived <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> keepalived
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="onL7c"></a></p>
<h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3>
<p>配置docker使用https访问harbor，将harbor的证书分发至docker</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /etc/docker/certs.d/harbor-server.linux.io/
<span class="token function">cp</span> /apps/harbor/cert/harbor-server.crt /etc/docker/certs.d/harbor-server.linux.io/harbor-server.cert
<span class="token function">cp</span> /apps/harbor/cert/harbor-server.key /etc/docker/certs.d/harbor-server.linux.io/harbor-server.key
<span class="token function">cp</span> /apps/harbor/cert/ca.crt /etc/docker/certs.d/harbor-server.linux.io/ca.crt 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上传镜像</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> login harbor.server.linux.i
<span class="token function">docker</span> pull rockylinx:9.0
<span class="token function">docker</span> image tag rockylinux:9.0 harbor-server.linux.io/base-images/rockylinux:9.0
<span class="token function">docker</span> push harbor-server.linux.io/base-images/rockylinux:9.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看镜像是否同步  <br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427815252-333392f8-b86e-4589-9496-6f446a45632d.png#averageHue=%23dbb38b&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=929&amp;id=u699d0707&amp;name=33421c7f4d6f4176b486322163505dfb.png&amp;originHeight=929&amp;originWidth=1920&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=146202&amp;status=done&amp;style=none&amp;taskId=u70e3b317-67c1-470a-ba59-fd0807db373&amp;title=&amp;width=1920" alt="33421c7f4d6f4176b486322163505dfb.png" loading="lazy"></p>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427819035-0a011988-5d69-4e95-a0a8-43a91bff3e01.png#averageHue=%23dbb489&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=961&amp;id=ua48b1a12&amp;name=c64df6acf236400184b1fa34031f8fa5.png&amp;originHeight=961&amp;originWidth=1918&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=150548&amp;status=done&amp;style=none&amp;taskId=uf18c8a76-6dd2-4d9c-bddd-da7c48fbb81&amp;title=&amp;width=1918" alt="c64df6acf236400184b1fa34031f8fa5.png" tabindex="0" loading="lazy"><figcaption>c64df6acf236400184b1fa34031f8fa5.png</figcaption></figure>
<p>在两个harbor-server节点上都有这个镜像，说明镜像同步成功<br />关闭harbor-server1的harbor服务<br /><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427827473-05344cb4-1fae-4f78-ba08-feed0d1f395d.png#averageHue=%23110f0e&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=91&amp;id=u11f60c1c&amp;name=cf5d68a60ca943f68e6aac6701dcc215.png&amp;originHeight=91&amp;originWidth=923&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=25677&amp;status=done&amp;style=none&amp;taskId=u66b94750-f920-43d0-a870-35d804a2ead&amp;title=&amp;width=923" alt="cf5d68a60ca943f68e6aac6701dcc215.png" loading="lazy"></p>
<p>再下载镜像测试</p>
<figure><img src="https://cdn.nlark.com/yuque/0/2023/png/33538388/1676427835175-1cbf4511-9842-4dbf-ad24-59df4b348703.png#averageHue=%2313110f&amp;clientId=u648ab006-62c2-4&amp;from=paste&amp;height=212&amp;id=uf21b52d9&amp;name=fa9775712cbf40b6ab9cb2c85fa5c6ad.png&amp;originHeight=212&amp;originWidth=1294&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=81289&amp;status=done&amp;style=none&amp;taskId=u39a5679d-f368-47a2-87e3-7888480fc5b&amp;title=&amp;width=1294" alt="fa9775712cbf40b6ab9cb2c85fa5c6ad.png" tabindex="0" loading="lazy"><figcaption>fa9775712cbf40b6ab9cb2c85fa5c6ad.png</figcaption></figure>
<p>下载成功表示高可用没问题</p>
</div></template>


