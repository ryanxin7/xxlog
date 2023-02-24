<template><div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>
root@harbor01:~<span class="token comment"># echo "10.1.0.38 harbor.ceamg.com >> /etc/hosts"</span>


<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/cert
<span class="token builtin class-name">cd</span> /data/cert

openssl genrsa <span class="token parameter variable">-out</span> ca.key <span class="token number">4096</span>
openssl req <span class="token parameter variable">-x509</span> <span class="token parameter variable">-new</span> <span class="token parameter variable">-nodes</span> <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-days</span> <span class="token number">7300</span> <span class="token parameter variable">-subj</span> <span class="token string">"/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=harbor.ceamg.com"</span> <span class="token parameter variable">-key</span> ca.key <span class="token parameter variable">-out</span> ca.crt
openssl genrsa <span class="token parameter variable">-out</span> harbor.ceamg.com.key <span class="token number">4096</span>
openssl req <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-new</span> <span class="token parameter variable">-subj</span> <span class="token string">"/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=harbor.ceamg.com"</span> <span class="token parameter variable">-key</span> harbor.ceamg.com.key <span class="token parameter variable">-out</span> harbor.ceamg.com.csr

<span class="token function">cat</span> <span class="token operator">></span> v3.ext <span class="token operator">&lt;&lt;-</span><span class="token string">EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1=harbor.ceamg.com
DNS.2=harbor
DNS.3=ks-allinone
EOF</span>

openssl x509 <span class="token parameter variable">-req</span> <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-days</span> <span class="token number">7300</span> <span class="token parameter variable">-extfile</span> v3.ext <span class="token parameter variable">-CA</span> ca.crt <span class="token parameter variable">-CAkey</span> ca.key <span class="token parameter variable">-CAcreateserial</span> <span class="token parameter variable">-in</span> harbor.ceamg.com.csr <span class="token parameter variable">-out</span> harbor.ceamg.com.crt

openssl x509 <span class="token parameter variable">-inform</span> PEM <span class="token parameter variable">-in</span> harbor.ceamg.com.crt <span class="token parameter variable">-out</span> harbor.ceamg.com.cert








root@harbor01:/data/cert<span class="token comment"># cp harbor.ceamg.com.crt /usr/local/share/ca-certificates/</span>
root@harbor01:/data/cert<span class="token comment"># </span>
root@harbor01:/data/cert<span class="token comment"># update-ca-certificates </span>
Updating certificates <span class="token keyword">in</span> /etc/ssl/certs<span class="token punctuation">..</span>.
rehash: warning: skipping ca-certificates.crt,it does not contain exactly one certificate or CRL
<span class="token number">1</span> added, <span class="token number">0</span> removed<span class="token punctuation">;</span> done.
Running hooks <span class="token keyword">in</span> /etc/ca-certificates/update.d<span class="token punctuation">..</span>.
done.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cp</span> /data/cert/harbor.ceamg.com.cert /etc/docker/certs.d/harbor.ceamg.com/
<span class="token function">cp</span> /data/cert/harbor.ceamg.com.key /etc/docker/certs.d/harbor.ceamg.com/
<span class="token function">cp</span> /data/cert/ca.crt /etc/docker/certs.d/harbor.ceamg.com/


<span class="token comment"># 进入harbor目录，停止harbor</span>
<span class="token builtin class-name">cd</span> /opt/harbor/
<span class="token comment"># 停止harbor</span>
<span class="token function">docker-compose</span> down
<span class="token comment"># 删除/etc/docker/daemon.json中配置的地址，防止干扰</span>
<span class="token function">vi</span> /etc/docker/daemon.json
<span class="token comment"># 重启docker</span>
systemctl restart docker.service


 重新生成配置文件,增加上其他chart功能等
./prepare --with-notary --with-trivy --with-chartmuseum

<span class="token comment"># 启动</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>root@master01:/etc/containerd/certs.d/harbor.ceamg.com<span class="token comment"># ls</span>
ca.crt  harbor.ceamg.com.cert  harbor.ceamg.com.crt  harbor.ceamg.com.key

root@master01:/etc/containerd/certs.d/harbor.ceamg.com<span class="token comment"># nerdctl login harbor.ceamg.com</span>
WARNING: Your password will be stored uned <span class="token keyword">in</span> /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/<span class="token comment">#credentials-store</span>

Login Succeeded


root@master01:/etc/containerd/certs.d/harbor.ceamg.com<span class="token comment"># nerdctl images</span>
REPOSITORY                        TAG       IMAGE ID        CREATED        PLATFORM       SIZE         BLOB SIZE
nginx                             latest    0047b729188a    <span class="token number">4</span> hours ago    linux/amd64    <span class="token number">149.4</span> MiB    <span class="token number">54.2</span> MiB
harbor.ceamg.com/library/nginx    latest    0047b729188a    <span class="token number">3</span> hours ago    linux/amd64    <span class="token number">149.4</span> MiB    <span class="token number">54.2</span> MiB
root@master01:/etc/containerd/certs.d/harbor.ceamg.com<span class="token comment"># nerdctl push harbor.ceamg.com/library/nginx</span>
INFO<span class="token punctuation">[</span>0000<span class="token punctuation">]</span> pushing as a reduced-platform image <span class="token punctuation">(</span>application/vnd.docker.distribution.manifest.list.v2+json, sha256:3f727bfae5cee62f35f014637b350dbc1d0b416bdd1717b61c5ce5b036771aa0<span class="token punctuation">)</span> 
index-sha256:3f727bfae5cee62f35f014637b350dbc1d0b416bdd1717b61c5ce5b036771aa0:    <span class="token keyword">done</span>           <span class="token operator">|</span>++++++++++++++++++++++++++++++++++++++<span class="token operator">|</span> 
manifest-sha256:9a821cadb1b13cb782ec66445325045b2213459008a41c72d8d87cde94b33c8c: <span class="token keyword">done</span>           <span class="token operator">|</span>++++++++++++++++++++++++++++++++++++++<span class="token operator">|</span> 
config-sha256:1403e55ab369cd1c8039c34e6b4d47ca40bbde39c371254c7cba14756f472f52:   <span class="token keyword">done</span>           <span class="token operator">|</span>++++++++++++++++++++++++++++++++++++++<span class="token operator">|</span> 
elapsed: <span class="token number">1.1</span> s                                                                    total:  <span class="token number">9.3</span> Ki <span class="token punctuation">(</span><span class="token number">8.5</span> KiB/s<span class="token punctuation">)</span>          
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


