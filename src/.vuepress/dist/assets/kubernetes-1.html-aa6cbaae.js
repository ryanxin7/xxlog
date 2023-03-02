import{_ as o,V as l,W as p,$ as n,a0 as s,Y as e,Z as t,C as i}from"./framework-91fce522.js";const c={},r={href:"https://www.yuque.com/attachments/yuque/0/2023/pdf/33538388/1672721011349-4455b094-61ee-4956-a375-07ad6fc387a1.pdf",target:"_blank",rel:"noopener noreferrer"},u=t(`<p><a name="lXlPc"></a></p><h2 id="_1-基础环境配置" tabindex="-1"><a class="header-anchor" href="#_1-基础环境配置" aria-hidden="true">#</a> 1.基础环境配置</h2><p><a name="jRBYX"></a></p><h3 id="_1-1-时间同步" tabindex="-1"><a class="header-anchor" href="#_1-1-时间同步" aria-hidden="true">#</a> 1.1 时间同步</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ln</span> <span class="token parameter variable">-sf</span> /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

<span class="token function">cat</span> /etc/default/locale
<span class="token assign-left variable"><span class="token environment constant">LANG</span></span><span class="token operator">=</span>en_US.UTF-8
<span class="token assign-left variable"><span class="token environment constant">LC_TIME</span></span><span class="token operator">=</span>en_DK.UTF-8 


*/5 * * * * /usr/sbin/ntpdate time1.aliyun.com <span class="token operator">&amp;&gt;</span> /dev/null <span class="token operator">&amp;&amp;</span> hwclock -w/usr/sbin/ntpdate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="EzULz"></a></p><h3 id="_1-2-安裝docker" tabindex="-1"><a class="header-anchor" href="#_1-2-安裝docker" aria-hidden="true">#</a> 1.2 安裝docker</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/home/ceamg<span class="token comment"># cd /apps/docker/</span>
root@master01:/apps/docker<span class="token comment"># tar xvf docker-19.03.15-binary-install.tar.gz</span>
root@master01:/apps/docker<span class="token comment"># ll</span>
total <span class="token number">153128</span>
drwxr-xr-x <span class="token number">2</span> root root     <span class="token number">4096</span> Apr <span class="token number">11</span>  <span class="token number">2021</span> ./
drwxr-xr-x <span class="token number">3</span> root root     <span class="token number">4096</span> Jan  <span class="token number">2</span> 03:52 <span class="token punctuation">..</span>/
-rw-r--r-- <span class="token number">1</span> root root      <span class="token number">647</span> Apr <span class="token number">11</span>  <span class="token number">2021</span> containerd.service
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">78156440</span> Jan  <span class="token number">2</span> 03:57 docker-19.03.15-binary-install.tar.gz
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">62436240</span> Feb  <span class="token number">5</span>  <span class="token number">2021</span> docker-19.03.15.tgz
-rwxr-xr-x <span class="token number">1</span> root root <span class="token number">16168192</span> Jun <span class="token number">24</span>  <span class="token number">2019</span> docker-compose-Linux-x86_64_1.24.1*
-rwxr-xr-x <span class="token number">1</span> root root     <span class="token number">2708</span> Apr <span class="token number">11</span>  <span class="token number">2021</span> docker-install.sh*
-rw-r--r-- <span class="token number">1</span> root root     <span class="token number">1683</span> Apr <span class="token number">11</span>  <span class="token number">2021</span> docker.service
-rw-r--r-- <span class="token number">1</span> root root      <span class="token number">197</span> Apr <span class="token number">11</span>  <span class="token number">2021</span> docker.socket
-rw-r--r-- <span class="token number">1</span> root root      <span class="token number">454</span> Apr <span class="token number">11</span>  <span class="token number">2021</span> limits.conf
-rw-r--r-- <span class="token number">1</span> root root      <span class="token number">257</span> Apr <span class="token number">11</span>  <span class="token number">2021</span> sysctl.conf

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">DIR</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">pwd</span><span class="token variable">\`</span></span>
<span class="token assign-left variable">PACKAGE_NAME</span><span class="token operator">=</span><span class="token string">&quot;docker-19.03.15.tgz&quot;</span>
<span class="token assign-left variable">DOCKER_FILE</span><span class="token operator">=</span><span class="token variable">\${DIR}</span>/<span class="token variable">\${PACKAGE_NAME}</span>
<span class="token function-name function">centos_install_docker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">grep</span> <span class="token string">&quot;Kernel&quot;</span> /etc/issue <span class="token operator">&amp;&gt;</span> /dev/null
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    /bin/echo  <span class="token string">&quot;当前系统是<span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> /etc/redhat-release<span class="token variable">\`</span></span>,即将开始系统初始化、配置docker-compose与安装docker&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sleep</span> <span class="token number">1</span>
    systemctl stop firewalld <span class="token operator">&amp;&amp;</span> systemctl disable firewalld <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;防火墙已关闭&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sleep</span> <span class="token number">1</span>
    systemctl stop NetworkManager <span class="token operator">&amp;&amp;</span> systemctl disable NetworkManager <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;NetworkManager&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sleep</span> <span class="token number">1</span>
    <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/SELINUX=enforcing/SELINUX=disabled/g&#39;</span> /etc/sysconfig/selinux <span class="token operator">&amp;&amp;</span> setenforce  <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;selinux 已关闭&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sleep</span> <span class="token number">1</span>
    <span class="token punctuation">\\</span>cp <span class="token variable">\${DIR}</span>/limits.conf /etc/security/limits.conf
    <span class="token punctuation">\\</span>cp <span class="token variable">\${DIR}</span>/sysctl.conf /etc/sysctl.conf

    /bin/tar xvf <span class="token variable">\${DOCKER_FILE}</span>
    <span class="token punctuation">\\</span>cp docker/*  /usr/bin

    <span class="token punctuation">\\</span>cp containerd.service /lib/systemd/system/containerd.service
    <span class="token punctuation">\\</span>cp docker.service  /lib/systemd/system/docker.service
    <span class="token punctuation">\\</span>cp docker.socket /lib/systemd/system/docker.socket

    <span class="token punctuation">\\</span>cp <span class="token variable">\${DIR}</span>/docker-compose-Linux-x86_64_1.24.1 /usr/bin/docker-compose

    <span class="token function">groupadd</span> <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> <span class="token function">useradd</span> <span class="token function">docker</span> <span class="token parameter variable">-g</span> <span class="token function">docker</span>
    <span class="token function">id</span> <span class="token parameter variable">-u</span>  magedu <span class="token operator">&amp;&gt;</span> /dev/null
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
      <span class="token function">useradd</span> magedu
      <span class="token function">usermod</span> magedu <span class="token parameter variable">-G</span> <span class="token function">docker</span>
    <span class="token keyword">fi</span>
    systemctl  <span class="token builtin class-name">enable</span> containerd.service <span class="token operator">&amp;&amp;</span> systemctl  restart containerd.service
    systemctl  <span class="token builtin class-name">enable</span> docker.service <span class="token operator">&amp;&amp;</span> systemctl  restart docker.service
    systemctl  <span class="token builtin class-name">enable</span> docker.socket <span class="token operator">&amp;&amp;</span> systemctl  restart docker.socket
  <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token function-name function">ubuntu_install_docker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">grep</span> <span class="token string">&quot;Ubuntu&quot;</span> /etc/issue <span class="token operator">&amp;&gt;</span> /dev/null
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    /bin/echo  <span class="token string">&quot;当前系统是<span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> /etc/issue<span class="token variable">\`</span></span>,即将开始系统初始化、配置docker-compose与安装docker&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sleep</span> <span class="token number">1</span>
    <span class="token punctuation">\\</span>cp <span class="token variable">\${DIR}</span>/limits.conf /etc/security/limits.conf
    <span class="token punctuation">\\</span>cp <span class="token variable">\${DIR}</span>/sysctl.conf /etc/sysctl.conf

    /bin/tar xvf <span class="token variable">\${DOCKER_FILE}</span>
    <span class="token punctuation">\\</span>cp docker/*  /usr/bin

    <span class="token punctuation">\\</span>cp containerd.service /lib/systemd/system/containerd.service
    <span class="token punctuation">\\</span>cp docker.service  /lib/systemd/system/docker.service
    <span class="token punctuation">\\</span>cp docker.socket /lib/systemd/system/docker.socket

    <span class="token punctuation">\\</span>cp <span class="token variable">\${DIR}</span>/docker-compose-Linux-x86_64_1.24.1 /usr/bin/docker-compose
    <span class="token builtin class-name">ulimit</span>  <span class="token parameter variable">-n</span> <span class="token number">1000000</span>
    /bin/su <span class="token parameter variable">-c</span> -  ceamg <span class="token string">&quot;ulimit -n 1000000&quot;</span>
    /bin/echo <span class="token string">&quot;docker 安装完成!&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sleep</span> <span class="token number">1</span>
    <span class="token function">id</span> <span class="token parameter variable">-u</span>  magedu <span class="token operator">&amp;&gt;</span> /dev/null
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
      <span class="token function">groupadd</span>  <span class="token parameter variable">-r</span> <span class="token function">docker</span>
      <span class="token function">useradd</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-m</span> <span class="token parameter variable">-g</span> <span class="token function">docker</span> <span class="token function">docker</span>
    <span class="token keyword">fi</span>
    systemctl  <span class="token builtin class-name">enable</span> containerd.service <span class="token operator">&amp;&amp;</span> systemctl  restart containerd.service
    systemctl  <span class="token builtin class-name">enable</span> docker.service <span class="token operator">&amp;&amp;</span> systemctl  restart docker.service
    systemctl  <span class="token builtin class-name">enable</span> docker.socket <span class="token operator">&amp;&amp;</span> systemctl  restart docker.socket
  <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  centos_install_docker
  ubuntu_install_docker
<span class="token punctuation">}</span>

main

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;
{
  &quot;registry-mirrors&quot;: [&quot;https://lc2kkql3.mirror.aliyuncs.com&quot;],
   &quot;storage-driver&quot;: &quot;overlay&quot;,
   &quot;data-root&quot;: &quot;/data/docker&quot;
}
EOF</span>
<span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:~<span class="token comment"># cat /etc/sysctl.conf </span>
<span class="token assign-left variable">net.ipv4.ip_forward</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">vm.max_map_count</span><span class="token operator">=</span><span class="token number">262144</span>
<span class="token assign-left variable">kernel.pid_max</span><span class="token operator">=</span><span class="token number">4194303</span>
fs.file-max<span class="token operator">=</span><span class="token number">1000000</span>
<span class="token assign-left variable">net.ipv4.tcp_max_tw_buckets</span><span class="token operator">=</span><span class="token number">6000</span>
<span class="token assign-left variable">net.netfilter.nf_conntrack_max</span><span class="token operator">=</span><span class="token number">2097152</span>

net.bridge.bridge-nf-call-ip6tables <span class="token operator">=</span> <span class="token number">1</span>
net.bridge.bridge-nf-call-iptables <span class="token operator">=</span> <span class="token number">1</span>
<span class="token assign-left variable">vm.swappiness</span><span class="token operator">=</span><span class="token number">0</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/apps/docker<span class="token comment"># bash docker-install.sh </span>
当前系统是Ubuntu <span class="token number">20.04</span>.3 LTS <span class="token punctuation">\\</span>n <span class="token punctuation">\\</span>l,即将开始系统初始化、配置docker-compose与安装docker
docker/
docker/dockerd
docker/docker-proxy
docker/containerd-shim
docker/docker-init
docker/docker
docker/runc
docker/ctr
docker/containerd
su: user jack does not exist
<span class="token function">docker</span> 安装完成<span class="token operator">!</span>
Created symlink /etc/systemd/system/multi-user.target.wants/containerd.service → /lib/systemd/system/containerd.service.
Created symlink /etc/systemd/system/multi-user.target.wants/docker.service → /lib/systemd/system/docker.service.
Created symlink /etc/systemd/system/sockets.target.wants/docker.socket → /lib/systemd/system/docker.socket.

<span class="token function">reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="hX7ex"></a></p><h3 id="_1-3-安装ansible" tabindex="-1"><a class="header-anchor" href="#_1-3-安装ansible" aria-hidden="true">#</a> 1.3 安装ansible</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#部署节点安装ansible</span>
root@master01:~<span class="token comment"># apt  install python3-pip git</span>
root@master01:~<span class="token comment"># pip3 install ansible -i https://mirrors.aliyun.com/pypi/simple/</span>
root@master01:~<span class="token comment"># ansible --version</span>
ansible <span class="token punctuation">[</span>core <span class="token number">2.13</span>.7<span class="token punctuation">]</span>
  config <span class="token function">file</span> <span class="token operator">=</span> None
  configured module search path <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;/root/.ansible/plugins/modules&#39;</span>, <span class="token string">&#39;/usr/share/ansible/plugins/modules&#39;</span><span class="token punctuation">]</span>
  ansible python module location <span class="token operator">=</span> /usr/local/lib/python3.8/dist-packages/ansible
  ansible collection location <span class="token operator">=</span> /root/.ansible/collections:/usr/share/ansible/collections
  executable location <span class="token operator">=</span> /usr/local/bin/ansible
  python version <span class="token operator">=</span> <span class="token number">3.8</span>.10 <span class="token punctuation">(</span>default, Nov <span class="token number">14</span> <span class="token number">2022</span>, <span class="token number">12</span>:59:47<span class="token punctuation">)</span> <span class="token punctuation">[</span>GCC <span class="token number">9.4</span>.0<span class="token punctuation">]</span>
  jinja version <span class="token operator">=</span> <span class="token number">3.1</span>.2
  libyaml <span class="token operator">=</span> True
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="sNEU4"></a></p><h3 id="_1-4-配置集群免秘钥登录" tabindex="-1"><a class="header-anchor" href="#_1-4-配置集群免秘钥登录" aria-hidden="true">#</a> 1.4 配置集群免秘钥登录</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#⽣成密钥对</span>

root@k8s-master1:~<span class="token comment"># ssh-keygen </span>

<span class="token comment">#安装sshpass命令⽤于同步公钥到各k8s服务器</span>

<span class="token comment"># apt-get install sshpass </span>
<span class="token comment">#分发公钥脚本：</span>

root@k8s-master1:~<span class="token comment"># cat scp-key.sh </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#⽬标主机列表</span>
<span class="token assign-left variable">IP</span><span class="token operator">=</span><span class="token string">&quot;
10.1.0.32
10.1.0.33
10.1.0.34
10.1.0.35
10.1.0.38
&quot;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">node</span> <span class="token keyword">in</span> <span class="token variable">\${IP}</span><span class="token punctuation">;</span><span class="token keyword">do</span>
  sshpass <span class="token parameter variable">-p</span> ceamg.com ssh-copy-id <span class="token variable">\${node}</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">StrictHostKeyChecking</span><span class="token operator">=</span>no
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${node}</span> 秘钥copy完成&quot;</span>
  <span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${node}</span> 秘钥copy失败&quot;</span>
  <span class="token keyword">fi</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="ZmDPR"></a></p><h3 id="_1-5-部署节点下载kubeasz部署项目及组件" tabindex="-1"><a class="header-anchor" href="#_1-5-部署节点下载kubeasz部署项目及组件" aria-hidden="true">#</a> 1.5 部署节点下载kubeasz部署项⽬及组件</h3>`,21),d=n("br",null,null,-1),m={href:"https://github.com/easzlab/kubeasz",target:"_blank",rel:"noopener noreferrer"},k=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@k8s-master1:~<span class="token comment"># export release=3.3.1</span>
root@k8s-master1:~<span class="token comment"># curl -C- -fLO --retry 3 https://github.com/easzlab/kubeasz/releases/download/\${release}/ezdown</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:~<span class="token comment"># chmod a+x ezdown </span>

root@master01:~<span class="token comment"># ./ezdown -D</span>
<span class="token number">2023</span>-01-02 <span class="token number">13</span>:28:24 INFO Action begin: download_all
<span class="token number">2023</span>-01-02 <span class="token number">13</span>:28:24 INFO downloading <span class="token function">docker</span> binaries, version <span class="token number">19.03</span>.15
--2023-01-02 <span class="token number">13</span>:28:24--  https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/static/stable/x86_64/docker-19.03.15.tgz
Resolving mirrors.tuna.tsinghua.edu.cn <span class="token punctuation">(</span>mirrors.tuna.tsinghua.edu.cn<span class="token punctuation">)</span><span class="token punctuation">..</span>. <span class="token number">101.6</span>.15.130, <span class="token number">2402</span>:f000:1:400::2
Connecting to mirrors.tuna.tsinghua.edu.cn <span class="token punctuation">(</span>mirrors.tuna.tsinghua.edu.cn<span class="token punctuation">)</span><span class="token operator">|</span><span class="token number">101.6</span>.15.130<span class="token operator">|</span>:443<span class="token punctuation">..</span>. connected.
HTTP request sent, awaiting response<span class="token punctuation">..</span>. <span class="token number">200</span> OK
Length: <span class="token number">62436240</span> <span class="token punctuation">(</span>60M<span class="token punctuation">)</span> <span class="token punctuation">[</span>application/octet-stream<span class="token punctuation">]</span>
Saving to: ‘docker-19.03.15.tgz’

docker-19.03.15.tgz                                   <span class="token number">100</span>%<span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">&gt;</span><span class="token punctuation">]</span>  <span class="token number">59</span>.54M  <span class="token number">11</span>.2MB/s    <span class="token keyword">in</span> <span class="token number">5</span>.5s    

<span class="token number">2023</span>-01-02 <span class="token number">13</span>:28:29 <span class="token punctuation">(</span><span class="token number">10.9</span> MB/s<span class="token punctuation">)</span> - ‘docker-19.03.15.tgz’ saved <span class="token punctuation">[</span><span class="token number">62436240</span>/62436240<span class="token punctuation">]</span>

<span class="token number">2023</span>-01-02 <span class="token number">13</span>:28:31 WARN <span class="token function">docker</span> is already running.
<span class="token number">2023</span>-01-02 <span class="token number">13</span>:28:31 INFO downloading kubeasz: <span class="token number">3.3</span>.1
<span class="token number">2023</span>-01-02 <span class="token number">13</span>:28:31 DEBUG  run a temporary container
Unable to <span class="token function">find</span> image <span class="token string">&#39;easzlab/kubeasz:3.3.1&#39;</span> locally
<span class="token number">3.3</span>.1: Pulling from easzlab/kubeasz



Status: Image is up to <span class="token function">date</span> <span class="token keyword">for</span> easzlab/kubeasz:3.3.1
docker.io/easzlab/kubeasz:3.3.1
<span class="token number">2023</span>-01-02 <span class="token number">13</span>:41:44 INFO Action successed: download_all


root@master01:~<span class="token comment"># cd /etc/kubeasz/</span>
root@master01:/etc/kubeasz/down<span class="token comment"># ll</span>
total <span class="token number">1136932</span>
drwxr-xr-x  <span class="token number">2</span> root root      <span class="token number">4096</span> Jan  <span class="token number">2</span> <span class="token number">13</span>:41 ./
drwxrwxr-x <span class="token number">12</span> root root      <span class="token number">4096</span> Jan  <span class="token number">2</span> <span class="token number">13</span>:32 <span class="token punctuation">..</span>/
-rw-------  <span class="token number">1</span> root root <span class="token number">383673856</span> Jan  <span class="token number">2</span> <span class="token number">13</span>:35 calico_v3.19.4.tar
-rw-------  <span class="token number">1</span> root root  <span class="token number">48941568</span> Jan  <span class="token number">2</span> <span class="token number">13</span>:36 coredns_1.9.3.tar
-rw-------  <span class="token number">1</span> root root <span class="token number">246784000</span> Jan  <span class="token number">2</span> <span class="token number">13</span>:39 dashboard_v2.5.1.tar
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">62436240</span> Feb  <span class="token number">1</span>  <span class="token number">2021</span> docker-19.03.15.tgz
-rw-------  <span class="token number">1</span> root root <span class="token number">106171392</span> Jan  <span class="token number">2</span> <span class="token number">13</span>:37 k8s-dns-node-cache_1.21.1.tar
-rw-------  <span class="token number">1</span> root root <span class="token number">179129856</span> Jan  <span class="token number">2</span> <span class="token number">13</span>:41 kubeasz_3.3.1.tar
-rw-------  <span class="token number">1</span> root root  <span class="token number">43832320</span> Jan  <span class="token number">2</span> <span class="token number">13</span>:40 metrics-scraper_v1.0.8.tar
-rw-------  <span class="token number">1</span> root root  <span class="token number">65683968</span> Jan  <span class="token number">2</span> <span class="token number">13</span>:41 metrics-server_v0.5.2.tar
-rw-------  <span class="token number">1</span> root root    <span class="token number">721408</span> Jan  <span class="token number">2</span> <span class="token number">13</span>:41 pause_3.7.tar
-rw-------  <span class="token number">1</span> root root  <span class="token number">26815488</span> Jan  <span class="token number">2</span> <span class="token number">13</span>:32 registry-2.tar


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述脚本运行成功后，所有文件（kubeasz代码、二进制、离线镜像）均已整理好放入目录/etc/kubeasz</p><p><a name="G4hdX"></a></p><h2 id="_2-部署-harbor-镜像仓库" tabindex="-1"><a class="header-anchor" href="#_2-部署-harbor-镜像仓库" aria-hidden="true">#</a> 2.部署 harbor 镜像仓库</h2><p><a name="VgFWs"></a></p><h3 id="_2-1-创建自签ssl证书" tabindex="-1"><a class="header-anchor" href="#_2-1-创建自签ssl证书" aria-hidden="true">#</a> 2.1 创建自签ssl证书</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#本地解析</span>
root@harbor01:~<span class="token comment"># echo &quot;10.1.0.38 harbor.ceamg.com &gt;&gt; /etc/hosts&quot;</span>


<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/cert
<span class="token builtin class-name">cd</span> /data/cert

<span class="token comment">#创建ca和harbor证书请求</span>
openssl genrsa <span class="token parameter variable">-out</span> ca.key <span class="token number">4096</span>
openssl req <span class="token parameter variable">-x509</span> <span class="token parameter variable">-new</span> <span class="token parameter variable">-nodes</span> <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-days</span> <span class="token number">7300</span> <span class="token parameter variable">-subj</span> <span class="token string">&quot;/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=harbor.ceamg.com&quot;</span> <span class="token parameter variable">-key</span> ca.key <span class="token parameter variable">-out</span> ca.crt
openssl genrsa <span class="token parameter variable">-out</span> harbor.ceamg.com.key <span class="token number">4096</span>
openssl req <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-new</span> <span class="token parameter variable">-subj</span> <span class="token string">&quot;/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=harbor.ceamg.com&quot;</span> <span class="token parameter variable">-key</span> harbor.ceamg.com.key <span class="token parameter variable">-out</span> harbor.ceamg.com.csr


<span class="token comment">#创建v3文件</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> v3.ext <span class="token operator">&lt;&lt;-</span><span class="token string">EOF
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

<span class="token comment">#使用v3文件签发harbor证书</span>
openssl x509 <span class="token parameter variable">-req</span> <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-days</span> <span class="token number">7300</span> <span class="token parameter variable">-extfile</span> v3.ext <span class="token parameter variable">-CA</span> ca.crt <span class="token parameter variable">-CAkey</span> ca.key <span class="token parameter variable">-CAcreateserial</span> <span class="token parameter variable">-in</span> harbor.ceamg.com.csr <span class="token parameter variable">-out</span> harbor.ceamg.com.crt


<span class="token comment">#转换成cert</span>
openssl x509 <span class="token parameter variable">-inform</span> PEM <span class="token parameter variable">-in</span> harbor.ceamg.com.crt <span class="token parameter variable">-out</span> harbor.ceamg.com.cert


<span class="token comment">#添加根证书让系统信任证书</span>
root@harbor01:/data/cert<span class="token comment"># cp harbor.ceamg.com.crt /usr/local/share/ca-certificates/</span>

root@harbor01:/data/cert<span class="token comment"># update-ca-certificates </span>
Updating certificates <span class="token keyword">in</span> /etc/ssl/certs<span class="token punctuation">..</span>.
rehash: warning: skipping ca-certificates.crt,it does not contain exactly one certificate or CRL
<span class="token number">1</span> added, <span class="token number">0</span> removed<span class="token punctuation">;</span> done.
Running hooks <span class="token keyword">in</span> /etc/ca-certificates/update.d<span class="token punctuation">..</span>.
done.


<span class="token comment">#update-ca-certificates命令将PEM格式的根证书内容附加到/etc/ssl/certs/ca-certificates.crt ，而/etc/ssl/certs/ca-certificates.crt 包含了系统自带的各种可信根证书.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="F5iRD"></a></p><h3 id="_2-2-修改harbor配置" tabindex="-1"><a class="header-anchor" href="#_2-2-修改harbor配置" aria-hidden="true">#</a> 2.2 修改harbor配置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01:/apps/harbor/harbor<span class="token comment"># cp harbor.yml.tmpl harbor.yml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01:/apps/harbor/harbor<span class="token comment"># grep -v &quot;#&quot; harbor.yml | grep -v &quot;^$&quot;</span>
hostname: harbor.ceamg.com
http:
  port: <span class="token number">80</span>
https:
  port: <span class="token number">443</span>
  certificate: /data/cert/harbor.ceamg.com.crt
  private_key: /apps/harbor/certs/harbor.ceamg.com.key
harbor_admin_password: ceamg.com
database:
  password: root123
  max_idle_conns: <span class="token number">100</span>
  max_open_conns: <span class="token number">900</span>
  conn_max_lifetime: 5m
  conn_max_idle_time: <span class="token number">0</span>
data_volume: /data
trivy:
  ignore_unfixed: <span class="token boolean">false</span>
  skip_update: <span class="token boolean">false</span>
  offline_scan: <span class="token boolean">false</span>
  security_check: vuln
  insecure: <span class="token boolean">false</span>
jobservice:
  max_job_workers: <span class="token number">10</span>
notification:
  webhook_job_max_retry: <span class="token number">10</span>
chart:
  absolute_url: disabled
log:
  level: info
  local:
    rotate_count: <span class="token number">50</span>
    rotate_size: 200M
    location: /var/log/harbor
_version: <span class="token number">2.7</span>.0
proxy:
  http_proxy:
  https_proxy:
  no_proxy:
  components:
    - core
    - jobservice
    - trivy
upload_purging:
  enabled: <span class="token boolean">true</span>
  age: 168h
  interval: 24h
  dryrun: <span class="token boolean">false</span>
cache:
  enabled: <span class="token boolean">false</span>
  expire_hours: <span class="token number">24</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="nKiGV"></a></p><h3 id="_2-3-安装harbor" tabindex="-1"><a class="header-anchor" href="#_2-3-安装harbor" aria-hidden="true">#</a> 2.3 安装harbor</h3>`,14),v={href:"https://goharbor.io/docs/2.3.0/install-config/reconfigure-manage-lifecycle/",target:"_blank",rel:"noopener noreferrer"},b=n("br",null,null,-1),h=n("code",null,"–with-trivy",-1),g=n("code",null,"–with-notary",-1),y=n("code",null,"–with-chartmuseum",-1),f=n("code",null,"–with-clair",-1),_=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#更新配置文件</span>

root@harbor01:/apps/harbor/harbor<span class="token comment"># ./prepare </span>
root@harbor01:/apps/harbor/harbor<span class="token comment"># ./install.sh --with-notary --with-trivy --with-chartmuseum</span>

<span class="token punctuation">[</span>Step <span class="token number">0</span><span class="token punctuation">]</span>: checking <span class="token keyword">if</span> <span class="token function">docker</span> is installed <span class="token punctuation">..</span>.

Note: <span class="token function">docker</span> version: <span class="token number">19.03</span>.15

<span class="token punctuation">[</span>Step <span class="token number">1</span><span class="token punctuation">]</span>: checking <span class="token function">docker-compose</span> is installed <span class="token punctuation">..</span>.

Note: <span class="token function">docker-compose</span> version: <span class="token number">1.24</span>.1

<span class="token punctuation">[</span>Step <span class="token number">2</span><span class="token punctuation">]</span>: loading Harbor images <span class="token punctuation">..</span>.
8991ee7e1c66: Loading layer <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">&gt;</span><span class="token punctuation">]</span>  <span class="token number">37</span>.72MB/37.72MB
caef0c5d2fe0: Loading layer <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">&gt;</span><span class="token punctuation">]</span>  <span class="token number">43</span>.84MB/43.84MB
d0ae0913849c: Loading layer <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">&gt;</span><span class="token punctuation">]</span>  <span class="token number">66</span>.03MB/66.03MB
d6c3137fc4e6: Loading layer <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">&gt;</span><span class="token punctuation">]</span>   <span class="token number">18</span>.2MB/18.2MB
db156fb6962c: Loading layer <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">&gt;</span><span class="token punctuation">]</span>  <span class="token number">65</span>.54kB/65.54kB
578a990cf79f: Loading layer <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">&gt;</span><span class="token punctuation">]</span>   <span class="token number">2</span>.56kB/2.56kB
9415b3c8b317: Loading layer <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">&gt;</span><span class="token punctuation">]</span>  <span class="token number">1</span>.536kB/1.536kB
bdb2dfba8b17: Loading layer <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">&gt;</span><span class="token punctuation">]</span>  <span class="token number">12</span>.29kB/12.29kB
6a1b6c491cd2: Loading layer <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">&gt;</span><span class="token punctuation">]</span>  <span class="token number">2</span>.613MB/2.613MB
c35c2488b48b: Loading layer <span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">&gt;</span><span class="token punctuation">]</span>    407kB/407kB
Loaded image: goharbor/prepare:v2.7.0
Loaded image: goharbor/harbor-db:v2.7.0
Loaded image: goharbor/harbor-core:v2.7.0
Loaded image: goharbor/harbor-log:v2.7.0
Loaded image: goharbor/harbor-exporter:v2.7.0
Loaded image: goharbor/nginx-photon:v2.7.0
Loaded image: goharbor/chartmuseum-photon:v2.7.0
Loaded image: goharbor/harbor-portal:v2.7.0
Loaded image: goharbor/harbor-jobservice:v2.7.0
Loaded image: goharbor/harbor-registryctl:v2.7.0
Loaded image: goharbor/registry-photon:v2.7.0
Loaded image: goharbor/notary-server-photon:v2.7.0
Loaded image: goharbor/redis-photon:v2.7.0
Loaded image: goharbor/notary-signer-photon:v2.7.0
Loaded image: goharbor/trivy-adapter-photon:v2.7.0


<span class="token punctuation">[</span>Step <span class="token number">3</span><span class="token punctuation">]</span>: preparing environment <span class="token punctuation">..</span>.

<span class="token punctuation">[</span>Step <span class="token number">4</span><span class="token punctuation">]</span>: preparing harbor configs <span class="token punctuation">..</span>.
prepare base <span class="token function">dir</span> is <span class="token builtin class-name">set</span> to /apps/harbor/harbor
Generated configuration file: /config/portal/nginx.conf
Generated configuration file: /config/log/logrotate.conf
Generated configuration file: /config/log/rsyslog_docker.conf
Generated configuration file: /config/nginx/nginx.conf
Generated configuration file: /config/core/env
Generated configuration file: /config/core/app.conf
Generated configuration file: /config/registry/config.yml
Generated configuration file: /config/registryctl/env
Generated configuration file: /config/registryctl/config.yml
Generated configuration file: /config/db/env
Generated configuration file: /config/jobservice/env
Generated configuration file: /config/jobservice/config.yml
Generated and saved secret to file: /data/secret/keys/secretkey
Successfully called func: create_root_cert
Generated configuration file: /config/trivy-adapter/env
Generated configuration file: /compose_location/docker-compose.yml
Clean up the input <span class="token function">dir</span>


Note: stopping existing Harbor instance <span class="token punctuation">..</span>.
Removing network harbor_harbor
WARNING: Network harbor_harbor not found.


<span class="token punctuation">[</span>Step <span class="token number">5</span><span class="token punctuation">]</span>: starting Harbor <span class="token punctuation">..</span>.
Creating network <span class="token string">&quot;harbor_harbor&quot;</span> with the default driver
Creating harbor-log <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Creating redis         <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Creating harbor-portal <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Creating registry      <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Creating harbor-db     <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Creating registryctl   <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Creating trivy-adapter <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Creating harbor-core   <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Creating harbor-jobservice <span class="token punctuation">..</span>. <span class="token keyword">done</span>
Creating nginx             <span class="token punctuation">..</span>. <span class="token keyword">done</span>
✔ ----Harbor has been installed and started successfully.----
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="atgJF"></a></p><h3 id="_2-4-harbor-调试" tabindex="-1"><a class="header-anchor" href="#_2-4-harbor-调试" aria-hidden="true">#</a> 2.4 harbor 调试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#关闭 harbor</span>
$~ <span class="token function">sudo</span> <span class="token function">docker-compose</span> down <span class="token parameter variable">-v</span>

<span class="token comment">#更新配置</span>
<span class="token function">vim</span> /apps/harbor.yml
prepare 

<span class="token comment">#重新生成配置文件,增加上其他chart功能等</span>
<span class="token function">sudo</span> prepare --with-notary --with-trivy --with-chartmuseum

<span class="token comment">#启动 harbor</span>
$~ <span class="token function">sudo</span> <span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="l5j1t"></a></p><p><a name="MlcUL"></a></p><p><a name="FZ0m4"></a></p><h2 id="_3-创建集群配置实例" tabindex="-1"><a class="header-anchor" href="#_3-创建集群配置实例" aria-hidden="true">#</a> 3.创建集群配置实例</h2><p><a name="cV5Z6"></a></p><h3 id="_3-1-生成k8s集群-hosts文件" tabindex="-1"><a class="header-anchor" href="#_3-1-生成k8s集群-hosts文件" aria-hidden="true">#</a> 3.1 ⽣成k8s集群 hosts⽂件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/etc/kubeasz<span class="token comment"># ./ezctl new k8s-01</span>
<span class="token number">2023</span>-01-03 04:52:33 DEBUG generate custom cluster files <span class="token keyword">in</span> /etc/kubeasz/clusters/k8s-01
<span class="token number">2023</span>-01-03 04:52:33 DEBUG <span class="token builtin class-name">set</span> versions
<span class="token number">2023</span>-01-03 04:52:33 DEBUG cluster k8s-01: files successfully created.
<span class="token number">2023</span>-01-03 04:52:33 INFO next steps <span class="token number">1</span>: to config <span class="token string">&#39;/etc/kubeasz/clusters/k8s-01/hosts&#39;</span>
<span class="token number">2023</span>-01-03 04:52:33 INFO next steps <span class="token number">2</span>: to config <span class="token string">&#39;/etc/kubeasz/clusters/k8s-01/config.yml&#39;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># &#39;NEW_INSTALL&#39;: &#39;true&#39; to install a harbor server; &#39;false&#39; to integrate with existed one</span>
<span class="token punctuation">[</span>harbor<span class="token punctuation">]</span>
<span class="token number">10.1</span>.0.38 <span class="token assign-left variable">NEW_INSTALL</span><span class="token operator">=</span>false

<span class="token comment"># [optional] loadbalance for accessing k8s from outside</span>
<span class="token punctuation">[</span>ex_lb<span class="token punctuation">]</span>
<span class="token comment">#192.168.1.6 LB_ROLE=backup EX_APISERVER_VIP=192.168.1.250 EX_APISERVER_PORT=8443</span>
<span class="token comment">#192.168.1.7 LB_ROLE=master EX_APISERVER_VIP=192.168.1.250 EX_APISERVER_PORT=8443</span>

<span class="token comment"># [optional] ntp server for the cluster</span>
<span class="token punctuation">[</span>chrony<span class="token punctuation">]</span>
<span class="token comment">#192.168.1.1</span>

<span class="token punctuation">[</span>all:vars<span class="token punctuation">]</span>
<span class="token comment"># --------- Main Variables ---------------</span>
<span class="token comment"># Secure port for apiservers</span>
<span class="token assign-left variable">SECURE_PORT</span><span class="token operator">=</span><span class="token string">&quot;6443&quot;</span>

<span class="token comment"># Cluster container-runtime supported: docker, containerd</span>
<span class="token comment"># if k8s version &gt;= 1.24, docker is not supported</span>
<span class="token assign-left variable">CONTAINER_RUNTIME</span><span class="token operator">=</span><span class="token string">&quot;containerd&quot;</span>

<span class="token comment"># Network plugins supported: calico, flannel, kube-router, cilium, kube-ovn</span>
<span class="token assign-left variable">CLUSTER_NETWORK</span><span class="token operator">=</span><span class="token string">&quot;calico&quot;</span>

<span class="token comment"># Service proxy mode of kube-proxy: &#39;iptables&#39; or &#39;ipvs&#39;</span>
<span class="token assign-left variable">PROXY_MODE</span><span class="token operator">=</span><span class="token string">&quot;ipvs&quot;</span>

<span class="token comment"># K8S Service CIDR, not overlap with node(host) networking</span>
<span class="token assign-left variable">SERVICE_CIDR</span><span class="token operator">=</span><span class="token string">&quot;10.10.0.0/16&quot;</span>

<span class="token comment"># Cluster CIDR (Pod CIDR), not overlap with node(host) networking</span>
<span class="token assign-left variable">CLUSTER_CIDR</span><span class="token operator">=</span><span class="token string">&quot;10.20.0.0/16&quot;</span>

<span class="token comment"># NodePort Range</span>
<span class="token assign-left variable">NODE_PORT_RANGE</span><span class="token operator">=</span><span class="token string">&quot;30000-65535&quot;</span>

<span class="token comment"># Cluster DNS Domain</span>
<span class="token assign-left variable">CLUSTER_DNS_DOMAIN</span><span class="token operator">=</span><span class="token string">&quot;ceamg.local&quot;</span>

<span class="token comment"># -------- Additional Variables (don&#39;t change the default value right now) ---</span>
<span class="token comment"># Binaries Directory</span>
<span class="token assign-left variable">bin_dir</span><span class="token operator">=</span><span class="token string">&quot;/usr/local/bin&quot;</span>

<span class="token comment"># Deploy Directory (kubeasz workspace)</span>
<span class="token assign-left variable">base_dir</span><span class="token operator">=</span><span class="token string">&quot;/etc/kubeasz&quot;</span>

<span class="token comment"># Directory for a specific cluster</span>
<span class="token assign-left variable">cluster_dir</span><span class="token operator">=</span><span class="token string">&quot;{{ base_dir }}/clusters/k8s-01&quot;</span>

<span class="token comment"># CA and other components cert/key Directory</span>
<span class="token assign-left variable">ca_dir</span><span class="token operator">=</span><span class="token string">&quot;/etc/kubernetes/ssl&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="kbYzM"></a></p><h3 id="_3-1-生成k8s集群-config-文件" tabindex="-1"><a class="header-anchor" href="#_3-1-生成k8s集群-config-文件" aria-hidden="true">#</a> 3.1 ⽣成k8s集群 config ⽂件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/etc/kubeasz<span class="token comment"># vim /etc/kubeasz/clusters/k8s-01/config.yml </span>

<span class="token comment">############################</span>
<span class="token comment"># prepare</span>
<span class="token comment">############################</span>
<span class="token comment"># 可选离线安装系统软件包 (offline|online)</span>
INSTALL_SOURCE: <span class="token string">&quot;online&quot;</span>

<span class="token comment"># 可选进行系统安全加固 github.com/dev-sec/ansible-collection-hardening</span>
OS_HARDEN: <span class="token boolean">false</span>


<span class="token comment">############################</span>
<span class="token comment"># role:deploy</span>
<span class="token comment">############################</span>
<span class="token comment"># default: ca will expire in 100 years</span>
<span class="token comment"># default: certs issued by the ca will expire in 50 years</span>
CA_EXPIRY: <span class="token string">&quot;876000h&quot;</span>
CERT_EXPIRY: <span class="token string">&quot;438000h&quot;</span>

<span class="token comment"># kubeconfig 配置参数</span>
CLUSTER_NAME: <span class="token string">&quot;cluster1&quot;</span>
CONTEXT_NAME: <span class="token string">&quot;context-{{ CLUSTER_NAME }}&quot;</span>

<span class="token comment"># k8s version</span>
K8S_VER: <span class="token string">&quot;1.24.2&quot;</span>

<span class="token comment">############################</span>
<span class="token comment"># role:etcd</span>
<span class="token comment">############################</span>
<span class="token comment"># 设置不同的wal目录，可以避免磁盘io竞争，提高性能</span>
ETCD_DATA_DIR: <span class="token string">&quot;/var/lib/etcd&quot;</span>
ETCD_WAL_DIR: <span class="token string">&quot;&quot;</span>


<span class="token comment">############################</span>
<span class="token comment"># role:runtime [containerd,docker]</span>
<span class="token comment">############################</span>
<span class="token comment"># ------------------------------------------- containerd</span>
<span class="token comment"># [.]启用容器仓库镜像</span>
ENABLE_MIRROR_REGISTRY: <span class="token boolean">true</span>

<span class="token comment"># [containerd]基础容器镜像</span>
SANDBOX_IMAGE: <span class="token string">&quot;easzlab.io.local:5000/easzlab/pause:3.7&quot;</span>

<span class="token comment"># [containerd]容器持久化存储目录</span>
CONTAINERD_STORAGE_DIR: <span class="token string">&quot;/var/lib/containerd&quot;</span>

<span class="token comment"># ------------------------------------------- docker</span>
<span class="token comment"># [docker]容器存储目录</span>
DOCKER_STORAGE_DIR: <span class="token string">&quot;/var/lib/docker&quot;</span>

<span class="token comment"># [docker]开启Restful API</span>
ENABLE_REMOTE_API: <span class="token boolean">false</span>

<span class="token comment"># [docker]信任的HTTP仓库</span>
INSECURE_REG: <span class="token string">&#39;[&quot;http://easzlab.io.local:5000&quot;]&#39;</span>


<span class="token comment">############################</span>
<span class="token comment"># role:kube-master</span>
<span class="token comment">############################</span>
<span class="token comment"># k8s 集群 master 节点证书配置，可以添加多个ip和域名（比如增加公网ip和域名）</span>
MASTER_CERT_HOSTS:
  - <span class="token string">&quot;10.1.1.1&quot;</span>
  - <span class="token string">&quot;k8s.easzlab.io&quot;</span>
  <span class="token comment">#- &quot;www.test.com&quot;</span>

<span class="token comment"># node 节点上 pod 网段掩码长度（决定每个节点最多能分配的pod ip地址）</span>
<span class="token comment"># 如果flannel 使用 --kube-subnet-mgr 参数，那么它将读取该设置为每个节点分配pod网段</span>
<span class="token comment"># https://github.com/coreos/flannel/issues/847</span>
NODE_CIDR_LEN: <span class="token number">24</span>


<span class="token comment">############################</span>
<span class="token comment"># role:kube-node</span>
<span class="token comment">############################</span>
<span class="token comment"># Kubelet 根目录</span>
KUBELET_ROOT_DIR: <span class="token string">&quot;/var/lib/kubelet&quot;</span>

<span class="token comment"># node节点最大pod 数</span>
MAX_PODS: <span class="token number">300</span>

<span class="token comment"># 配置为kube组件（kubelet,kube-proxy,dockerd等）预留的资源量</span>
<span class="token comment"># 数值设置详见templates/kubelet-config.yaml.j2</span>
KUBE_RESERVED_ENABLED: <span class="token string">&quot;yes&quot;</span>

<span class="token comment"># k8s 官方不建议草率开启 system-reserved, 除非你基于长期监控，了解系统的资源占用状况；</span>
<span class="token comment"># 并且随着系统运行时间，需要适当增加资源预留，数值设置详见templates/kubelet-config.yaml.j2</span>
<span class="token comment"># 系统预留设置基于 4c/8g 虚机，最小化安装系统服务，如果使用高性能物理机可以适当增加预留</span>
<span class="token comment"># 另外，集群安装时候apiserver等资源占用会短时较大，建议至少预留1g内存</span>
SYS_RESERVED_ENABLED: <span class="token string">&quot;no&quot;</span>


<span class="token comment">############################</span>
<span class="token comment"># role:network [flannel,calico,cilium,kube-ovn,kube-router]</span>
<span class="token comment">############################</span>
<span class="token comment"># ------------------------------------------- flannel</span>
<span class="token comment"># [flannel]设置flannel 后端&quot;host-gw&quot;,&quot;vxlan&quot;等</span>
FLANNEL_BACKEND: <span class="token string">&quot;vxlan&quot;</span>
DIRECT_ROUTING: <span class="token boolean">false</span>

<span class="token comment"># [flannel] flanneld_image: &quot;quay.io/coreos/flannel:v0.10.0-amd64&quot;</span>
flannelVer: <span class="token string">&quot;v0.15.1&quot;</span>
flanneld_image: <span class="token string">&quot;easzlab.io.local:5000/easzlab/flannel:{{ flannelVer }}&quot;</span>

<span class="token comment"># ------------------------------------------- calico</span>
<span class="token comment"># [calico]设置 CALICO_IPV4POOL_IPIP=“off”,可以提高网络性能，条件限制详见 docs/setup/calico.md</span>
CALICO_IPV4POOL_IPIP: <span class="token string">&quot;Always&quot;</span>

<span class="token comment"># [calico]设置 calico-node使用的host IP，bgp邻居通过该地址建立，可手工指定也可以自动发现</span>
IP_AUTODETECTION_METHOD: <span class="token string">&quot;can-reach={{ groups[&#39;kube_master&#39;][0] }}&quot;</span>

<span class="token comment"># [calico]设置calico 网络 backend: brid, vxlan, none</span>
CALICO_NETWORKING_BACKEND: <span class="token string">&quot;brid&quot;</span>

<span class="token comment"># [calico]设置calico 是否使用route reflectors</span>
<span class="token comment"># 如果集群规模超过50个节点，建议启用该特性</span>
CALICO_RR_ENABLED: <span class="token boolean">false</span>

<span class="token comment"># CALICO_RR_NODES 配置route reflectors的节点，如果未设置默认使用集群master节点 </span>
<span class="token comment"># CALICO_RR_NODES: [&quot;192.168.1.1&quot;, &quot;192.168.1.2&quot;]</span>
CALICO_RR_NODES: <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token comment"># [calico]更新支持calico 版本: [v3.3.x] [v3.4.x] [v3.8.x] [v3.15.x]</span>
calico_ver: <span class="token string">&quot;v3.19.4&quot;</span>

<span class="token comment"># [calico]calico 主版本</span>
calico_ver_main: <span class="token string">&quot;{{ calico_ver.split(&#39;.&#39;)[0] }}.{{ calico_ver.split(&#39;.&#39;)[1] }}&quot;</span>

<span class="token comment"># ------------------------------------------- cilium</span>
<span class="token comment"># [cilium]镜像版本</span>
cilium_ver: <span class="token string">&quot;1.11.6&quot;</span>
cilium_connectivity_check: <span class="token boolean">true</span>
cilium_hubble_enabled: <span class="token boolean">false</span>
cilium_hubble_ui_enabled: <span class="token boolean">false</span>

<span class="token comment"># ------------------------------------------- kube-ovn</span>
<span class="token comment"># [kube-ovn]选择 OVN DB and OVN Control Plane 节点，默认为第一个master节点</span>
OVN_DB_NODE: <span class="token string">&quot;{{ groups[&#39;kube_master&#39;][0] }}&quot;</span>

<span class="token comment"># [kube-ovn]离线镜像tar包</span>
kube_ovn_ver: <span class="token string">&quot;v1.5.3&quot;</span>

<span class="token comment"># ------------------------------------------- kube-router</span>
<span class="token comment"># [kube-router]公有云上存在限制，一般需要始终开启 ipinip；自有环境可以设置为 &quot;subnet&quot;</span>
OVERLAY_TYPE: <span class="token string">&quot;full&quot;</span>

<span class="token comment"># [kube-router]NetworkPolicy 支持开关</span>
FIREWALL_ENABLE: <span class="token boolean">true</span>

<span class="token comment"># [kube-router]kube-router 镜像版本</span>
kube_router_ver: <span class="token string">&quot;v0.3.1&quot;</span>
busybox_ver: <span class="token string">&quot;1.28.4&quot;</span>


<span class="token comment">############################</span>
<span class="token comment"># role:cluster-addon</span>
<span class="token comment">############################</span>
<span class="token comment"># coredns 自动安装</span>
dns_install: <span class="token string">&quot;no&quot;</span>
corednsVer: <span class="token string">&quot;1.9.3&quot;</span>
ENABLE_LOCAL_DNS_CACHE: <span class="token boolean">false</span>
dnsNodeCacheVer: <span class="token string">&quot;1.21.1&quot;</span>
<span class="token comment"># 设置 local dns cache 地址</span>
LOCAL_DNS_CACHE: <span class="token string">&quot;169.254.20.10&quot;</span>

<span class="token comment"># metric server 自动安装</span>
metricsserver_install: <span class="token string">&quot;no&quot;</span>
metricsVer: <span class="token string">&quot;v0.5.2&quot;</span>

<span class="token comment"># dashboard 自动安装</span>
dashboard_install: <span class="token string">&quot;no&quot;</span>
dashboardVer: <span class="token string">&quot;v2.5.1&quot;</span>
dashboardMetricsScraperVer: <span class="token string">&quot;v1.0.8&quot;</span>

<span class="token comment"># prometheus 自动安装</span>
prom_install: <span class="token string">&quot;no&quot;</span>
prom_namespace: <span class="token string">&quot;monitor&quot;</span>
prom_chart_ver: <span class="token string">&quot;35.5.1&quot;</span>

<span class="token comment"># nfs-provisioner 自动安装</span>
nfs_provisioner_install: <span class="token string">&quot;no&quot;</span>
nfs_provisioner_namespace: <span class="token string">&quot;kube-system&quot;</span>
nfs_provisioner_ver: <span class="token string">&quot;v4.0.2&quot;</span>
nfs_storage_class: <span class="token string">&quot;managed-nfs-storage&quot;</span>
nfs_server: <span class="token string">&quot;192.168.1.10&quot;</span>
nfs_path: <span class="token string">&quot;/data/nfs&quot;</span>

<span class="token comment"># network-check 自动安装</span>
network_check_enabled: <span class="token boolean">false</span>
network_check_schedule: <span class="token string">&quot;*/5 * * * *&quot;</span>

<span class="token comment">############################</span>
<span class="token comment"># role:harbor</span>
<span class="token comment">############################</span>
<span class="token comment"># harbor version，完整版本号</span>
HARBOR_VER: <span class="token string">&quot;v2.1.3&quot;</span>
HARBOR_DOMAIN: <span class="token string">&quot;harbor.easzlab.io.local&quot;</span>
HARBOR_TLS_PORT: <span class="token number">8443</span>

<span class="token comment"># if set &#39;false&#39;, you need to put certs named harbor.pem and harbor-key.pem in directory &#39;down&#39;</span>
HARBOR_SELF_SIGNED_CERT: <span class="token boolean">true</span>

<span class="token comment"># install extra component</span>
HARBOR_WITH_NOTARY: <span class="token boolean">false</span>
HARBOR_WITH_TRIVY: <span class="token boolean">false</span>
HARBOR_WITH_CLAIR: <span class="token boolean">false</span>
HARBOR_WITH_CHARTMUSEUM: <span class="token boolean">true</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="dwcT1"></a></p><h2 id="_4-步骤1-基础环境初始化" tabindex="-1"><a class="header-anchor" href="#_4-步骤1-基础环境初始化" aria-hidden="true">#</a> 4.步骤1-基础环境初始化</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/etc/kubeasz<span class="token comment"># ./ezctl help setup</span>
Usage: ezctl setup <span class="token operator">&lt;</span>cluster<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>step<span class="token operator">&gt;</span>
available steps:
    01  prepare            to prepare CA/certs <span class="token operator">&amp;</span> kubeconfig <span class="token operator">&amp;</span> other system settings 
    02  etcd               to setup the etcd cluster
    03  container-runtime  to setup the container runtime<span class="token punctuation">(</span>docker or containerd<span class="token punctuation">)</span>
    04  kube-master        to setup the master nodes
    05  kube-node          to setup the worker nodes
    06  network            to setup the network plugin
    07  cluster-addon      to setup other useful plugins
    <span class="token number">90</span>  all                to run 01~07 all at once
    <span class="token number">10</span>  ex-lb              to <span class="token function">install</span> external loadbalance <span class="token keyword">for</span> accessing k8s from outside
    <span class="token number">11</span>  harbor             to <span class="token function">install</span> a new harbor server or to integrate with an existed one

examples: ./ezctl setup test-k8s 01  <span class="token punctuation">(</span>or ./ezctl setup test-k8s prepare<span class="token punctuation">)</span>
	  ./ezctl setup test-k8s 02  <span class="token punctuation">(</span>or ./ezctl setup test-k8s etcd<span class="token punctuation">)</span>
          ./ezctl setup test-k8s all
          ./ezctl setup test-k8s 04 <span class="token parameter variable">-t</span> restart_master

<span class="token function">vim</span> playbooks/01.prepare.yml 
<span class="token comment">#系统基础初始化主机配置</span>

root@master01:/etc/kubeasz<span class="token comment"># ./ezctl setup k8s-01 01</span>
<span class="token comment">#准备CA和基础系统设置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="QkYNt"></a></p><h2 id="_5-步骤2-部署etcd集群" tabindex="-1"><a class="header-anchor" href="#_5-步骤2-部署etcd集群" aria-hidden="true">#</a> 5.步骤2-部署etcd集群</h2><p>可更改启动脚本路径及版本等⾃定义配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/etc/kubeasz<span class="token comment"># ./ezctl setup k8s-01 02</span>
ansible-playbook <span class="token parameter variable">-i</span> clusters/k8s-01/hosts <span class="token parameter variable">-e</span> @clusters/k8s-01/config.yml  playbooks/02.etcd.yml
<span class="token number">2023</span>-01-03 <span class="token number">13</span>:39:13 INFO cluster:k8s-01 setup step:02 begins <span class="token keyword">in</span> 5s, press any key to abort


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>健康检查</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">NODE_IPS</span><span class="token operator">=</span><span class="token string">&quot;10.1.0.34 10.1.0.35&quot;</span>

root@etcd01:~<span class="token comment"># for ip in \${NODE_IPS}; do ETCDCTL_API=3 /usr/local/bin/etcdctl --endpoints=https://\${ip}:2379 --cacert=/etc/kubernetes/ssl/ca.pem --cert=/etc/kubernetes/ssl/etcd.pem --key=/etc/kubernetes/ssl/etcd-key.pem endpoint health; done</span>
https://10.1.0.34:2379 is healthy: successfully committed proposal: took <span class="token operator">=</span> <span class="token number">14</span>.95631ms
https://10.1.0.35:2379 is healthy: successfully committed proposal: took <span class="token operator">=</span> <span class="token number">15</span>.037491ms

注：以上返回信息表示etcd集群运⾏正常，否则异常！
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部署containerd</p><p>同步docker证书脚本：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#⽬标主机列表</span>
<span class="token assign-left variable">IP</span><span class="token operator">=</span><span class="token string">&quot;
10.1.0.32
10.1.0.33
10.1.0.34
10.1.0.35
&quot;</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">node</span> <span class="token keyword">in</span> <span class="token variable">\${IP}</span><span class="token punctuation">;</span><span class="token keyword">do</span>
  sshpass <span class="token parameter variable">-p</span> ceamg.com ssh-copy-id <span class="token variable">\${node}</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">StrictHostKeyChecking</span><span class="token operator">=</span>no
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${node}</span> 秘钥copy完成&quot;</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${node}</span> 秘钥copy完成,准备环境初始化.....&quot;</span>
   <span class="token function">ssh</span> <span class="token variable">\${node}</span> <span class="token string">&quot;mkdir /etc/containerd/certs.d/harbor.ceamg.com -p&quot;</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;Harbor 证书创建成功!&quot;</span>
   <span class="token function">scp</span> /etc/containerd/certs.d/harbor.ceamg.com/harbor.ceamg.com.cert  /etc/containerd/certs.d/harbor.ceamg.com/harbor.ceamg.com.crt /etc/containerd/certs.d/harbor.ceamg.com/harbor.ceamg.com.key /etc/containerd/certs.d/harbor.ceamg.com/ca.crt <span class="token variable">\${node}</span>:/etc/containerd/certs.d/harbor.ceamg.com/
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;Harbor 证书拷贝成功!&quot;</span>
  <span class="token function">ssh</span> <span class="token variable">\${node}</span> <span class="token string">&quot;echo &quot;</span><span class="token number">10.1</span>.0.38 harbor.ceamg.com<span class="token string">&quot; &gt;&gt; /etc/hosts&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;host 解析添加完成&quot;</span>
<span class="token comment">#scp -r /root/.docker \${node}:/root/</span>
<span class="token comment">#echo &quot;Harbor 认证件拷完成!&quot;</span>
<span class="token keyword">else</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${node}</span> 秘钥copy失败&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">done</span>
<span class="token comment">#执⾏脚本进⾏证书分发</span>
root@k8s-master1:/etc/kubeasz<span class="token comment"># bash /root/scp-key.sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="wVKDt"></a></p><h2 id="_6-步骤3-部署运行时环境" tabindex="-1"><a class="header-anchor" href="#_6-步骤3-部署运行时环境" aria-hidden="true">#</a> 6.步骤3-部署运行时环境</h2><p>项目根据k8s版本提供不同的默认容器运行时：</p><ul><li>k8s 版本 &lt; 1.24 时，支持docker containerd 可选</li><li>k8s 版本 &gt;= 1.24 时，仅支持 containerd <a name="ELUXT"></a></li></ul><h3 id="_6-1-kubeasz-集成安装-containerd" tabindex="-1"><a class="header-anchor" href="#_6-1-kubeasz-集成安装-containerd" aria-hidden="true">#</a> 6.1 kubeasz 集成安装 containerd</h3><p><br> 注意：k8s 1.24以后，项目已经设置默认容器运行时为 containerd，无需手动修改</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./ezctl setup k8s-01 05
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="P0enu"></a></p><h3 id="_6-2-配置containerd-对接私有harbor仓库" tabindex="-1"><a class="header-anchor" href="#_6-2-配置containerd-对接私有harbor仓库" aria-hidden="true">#</a> 6.2 配置containerd 对接私有harbor仓库</h3><p>修改role模板文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> roles/containerd/templates/config.toml.j2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>主要修改如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry<span class="token punctuation">]</span>

      <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.auths<span class="token punctuation">]</span>

      <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.configs<span class="token punctuation">]</span>
        <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.configs.<span class="token string">&quot;https://harbor.ceamg.com&quot;</span><span class="token punctuation">]</span>
           username <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span>
           password <span class="token operator">=</span> <span class="token string">&quot;ceamg.com&quot;</span>

        <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.configs.<span class="token string">&quot;easzlab.io.local:5000&quot;</span>.tls<span class="token punctuation">]</span>
          insecure_skip_verify <span class="token operator">=</span> <span class="token boolean">true</span>

        <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.configs.<span class="token string">&quot;harbor.ceamg.com&quot;</span>.tls<span class="token punctuation">]</span>
          insecure_skip_verify <span class="token operator">=</span> <span class="token boolean">true</span>
          ca_file <span class="token operator">=</span> <span class="token string">&quot;/etc/containerd/certs.d/harbor.ceamg.com/ca.crt&quot;</span>
          cert_file <span class="token operator">=</span> <span class="token string">&quot;/etc/containerd/certs.d/harbor.ceamg.com/harbor.ceamg.com.cert&quot;</span>
          key_file <span class="token operator">=</span> <span class="token string">&quot;/etc/containerd/certs.d/harbor.ceamg.com/harbor.ceamg.com.key&quot;</span>

      <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.headers<span class="token punctuation">]</span>

      <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.mirrors<span class="token punctuation">]</span>
        <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.mirrors.<span class="token string">&quot;easzlab.io.local:5000&quot;</span><span class="token punctuation">]</span>
          endpoint <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;http://easzlab.io.local:5000&quot;</span><span class="token punctuation">]</span>
        <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.mirrors.<span class="token string">&quot;harbor.ceamg.com&quot;</span><span class="token punctuation">]</span>
          endpoint <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;https://harbor.ceamg.com&quot;</span><span class="token punctuation">]</span>
        <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.mirrors.<span class="token string">&quot;docker.io&quot;</span><span class="token punctuation">]</span>
          endpoint <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;https://lc2kkql3.mirror.aliyuncs.com&quot;</span>,<span class="token string">&quot;https://docker.mirrors.ustc.edu.cn&quot;</span>, <span class="token string">&quot;http://hub-mirror.c.163.com&quot;</span><span class="token punctuation">]</span>
        <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.mirrors.<span class="token string">&quot;gcr.io&quot;</span><span class="token punctuation">]</span>
          endpoint <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;https://gcr.mirrors.ustc.edu.cn&quot;</span><span class="token punctuation">]</span>
        <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.mirrors.<span class="token string">&quot;k8s.gcr.io&quot;</span><span class="token punctuation">]</span>
          endpoint <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;https://gcr.mirrors.ustc.edu.cn/google-containers/&quot;</span><span class="token punctuation">]</span>
        <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.mirrors.<span class="token string">&quot;quay.io&quot;</span><span class="token punctuation">]</span>
          endpoint <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;https://quay.mirrors.ustc.edu.cn&quot;</span><span class="token punctuation">]</span>

      <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.registry.auths.<span class="token string">&quot;https://harbor.ceamg.com&quot;</span><span class="token punctuation">]</span>

    <span class="token punctuation">[</span>plugins.<span class="token string">&quot;io.containerd.grpc.v1.cri&quot;</span>.x509_key_pair_streaming<span class="token punctuation">]</span>
      tls_cert_file <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>
      tls_key_file <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="xwPVy"></a></p><h3 id="_6-3-containerd-使用证书对接harbor实现上传下载" tabindex="-1"><a class="header-anchor" href="#_6-3-containerd-使用证书对接harbor实现上传下载" aria-hidden="true">#</a> 6.3 containerd 使用证书对接harbor实现上传下载</h3><p><a name="maN07"></a></p><h4 id="_6-3-1-使用脚本同步证书到客户端" tabindex="-1"><a class="header-anchor" href="#_6-3-1-使用脚本同步证书到客户端" aria-hidden="true">#</a> 6.3.1 使用脚本同步证书到客户端</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#目标主机列表</span>
<span class="token assign-left variable">IP</span><span class="token operator">=</span><span class="token string">&quot;
10.1.0.32
10.1.0.33
10.1.0.34
10.1.0.35
&quot;</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">node</span> <span class="token keyword">in</span> <span class="token variable">\${IP}</span><span class="token punctuation">;</span><span class="token keyword">do</span>
  sshpass <span class="token parameter variable">-p</span> ceamg.com ssh-copy-id <span class="token variable">\${node}</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">StrictHostKeyChecking</span><span class="token operator">=</span>no
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${node}</span> 秘钥copy完成&quot;</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${node}</span> 秘钥copy完成,准备环境初始化.....&quot;</span>
   <span class="token function">ssh</span> <span class="token variable">\${node}</span> <span class="token string">&quot;mkdir /etc/containerd/certs.d/harbor.ceamg.com -p&quot;</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;Harbor 证书创建成功!&quot;</span>
   <span class="token function">scp</span> /etc/containerd/certs.d/harbor.ceamg.com/harbor.ceamg.com.cert  /etc/containerd/certs.d/harbor.ceamg.com/harbor.ceamg.com.crt /etc/containerd/certs.d/harbor.ceamg.com/harbor.ceamg.com.key /etc/containerd/certs.d/harbor.ceamg.com/ca.crt <span class="token variable">\${node}</span>:/etc/containerd/certs.d/harbor.ceamg.com/
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;Harbor 证书拷贝成功!&quot;</span>
  <span class="token function">ssh</span> <span class="token variable">\${node}</span> <span class="token string">&quot;echo &quot;</span><span class="token number">10.1</span>.0.38 harbor.ceamg.com<span class="token string">&quot; &gt;&gt; /etc/hosts&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;host 解析添加完成&quot;</span>
<span class="token comment">#scp -r /root/.docker \${node}:/root/</span>
<span class="token comment">#echo &quot;Harbor 认证件拷完成!&quot;</span>
<span class="token keyword">else</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${node}</span> 秘钥copy失败&quot;</span>
<span class="token keyword">fi</span>
<span class="token keyword">done</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="OXGSR"></a></p><h4 id="_6-3-2-测试containerd-客户端使用证书登录harbor" tabindex="-1"><a class="header-anchor" href="#_6-3-2-测试containerd-客户端使用证书登录harbor" aria-hidden="true">#</a> 6.3.2 测试containerd 客户端使用证书登录harbor</h4>`,47),q=n("br",null,null,-1),x={href:"https://www.yuque.com/attachments/yuque/0/2023/pdf/33538388/1672731322660-c020aeef-2273-40b3-877c-c28089c7d7b0.pdf?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2023%2Fpdf%2F33538388%2F1672731322660-c020aeef-2273-40b3-877c-c28089c7d7b0.pdf%22%2C%22name%22%3A%22nerdctl.pdf%22%2C%22size%22%3A28536832%2C%22ext%22%3A%22pdf%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22type%22%3A%22application%2Fpdf%22%2C%22mode%22%3A%22title%22%2C%22taskId%22%3A%22u2d812840-191c-45c4-aec0-85144ca300b%22%2C%22taskType%22%3A%22upload%22%2C%22__spacing%22%3A%22both%22%2C%22id%22%3A%22TItzJ%22%2C%22margin%22%3A%7B%22top%22%3Atrue%2C%22bottom%22%3Atrue%7D%2C%22card%22%3A%22file%22%7D",target:"_blank",rel:"noopener noreferrer"},w=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/etc/containerd/certs.d/harbor.ceamg.com<span class="token comment"># ls</span>
ca.crt  harbor.ceamg.com.cert  harbor.ceamg.com.crt  harbor.ceamg.com.key

root@master01:/etc/containerd/certs.d/harbor.ceamg.com<span class="token comment"># nerdctl login harbor.ceamg.com</span>
WARNING: Your password will be stored unencrypted <span class="token keyword">in</span> /root/.docker/config.json.
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="fw4ob"></a></p><h2 id="_7-步骤4-部署master" tabindex="-1"><a class="header-anchor" href="#_7-步骤4-部署master" aria-hidden="true">#</a> 7.步骤4-部署master</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> playbooks/04.kube-master.yml
- hosts: kube_master
  roles:
  - kube-lb        <span class="token comment"># 四层负载均衡，监听在127.0.0.1:6443，转发到真实master节点apiserver服务</span>
  - kube-master    <span class="token comment">#</span>
  - kube-node      <span class="token comment"># 因为网络、监控等daemonset组件，master节点也推荐安装kubelet和kube-proxy服务</span>
  <span class="token punctuation">..</span>. 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/etc/kubeasz<span class="token comment"># ./ezctl setup k8s-01 04</span>
ansible-playbook <span class="token parameter variable">-i</span> clusters/k8s-01/hosts <span class="token parameter variable">-e</span> @clusters/k8s-01/config.yml  playbooks/04.kube-master.yml
<span class="token number">2023</span>-01-03 <span class="token number">14</span>:07:04 INFO cluster:k8s-01 setup step:04 begins <span class="token keyword">in</span> 5s, press any key to abort:

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="Kin0Z"></a></p><p><strong>验证 master 集群</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看进程状态</span>
systemctl status kube-apiserver
systemctl status kube-controller-manager
systemctl status kube-scheduler
<span class="token comment"># 查看进程运行日志</span>
journalctl <span class="token parameter variable">-u</span> kube-apiserver
journalctl <span class="token parameter variable">-u</span> kube-controller-manager
journalctl <span class="token parameter variable">-u</span> kube-scheduler
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 <code>kubectl get componentstatus</code> 可以看到</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/etc/kubeasz<span class="token comment"># kubectl get componentstatus</span>
Warning: v1 ComponentStatus is deprecated <span class="token keyword">in</span> v1.19+
NAME                 STATUS    MESSAGE                         ERROR
scheduler            Healthy   ok                              
controller-manager   Healthy   ok                              
etcd-1               Healthy   <span class="token punctuation">{</span><span class="token string">&quot;health&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>,<span class="token string">&quot;reason&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">}</span>   
etcd-0               Healthy   <span class="token punctuation">{</span><span class="token string">&quot;health&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span>,<span class="token string">&quot;reason&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;&quot;</span><span class="token punctuation">}</span>   

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="bxoWT"></a></p><h2 id="_8-步骤5-部署node节点" tabindex="-1"><a class="header-anchor" href="#_8-步骤5-部署node节点" aria-hidden="true">#</a> 8.步骤5-部署node节点</h2><p><strong>kube_node</strong> 是集群中运行工作负载的节点，前置条件需要先部署好kube_master节点，它需要部署如下组件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> playbooks/05.kube-node.yml
- hosts: kube_node
  roles:
  - <span class="token punctuation">{</span> role: kube-lb, when: <span class="token string">&quot;inventory_hostname not in groups[&#39;kube_master&#39;]&quot;</span> <span class="token punctuation">}</span>
  - <span class="token punctuation">{</span> role: kube-node, when: <span class="token string">&quot;inventory_hostname not in groups[&#39;kube_master&#39;]&quot;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>kube-lb：由nginx裁剪编译的四层负载均衡，用于将请求转发到主节点的 apiserver服务</li><li>kubelet：kube_node上最主要的组件</li><li>kube-proxy： 发布应用服务与负载均衡</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/etc/kubeasz<span class="token comment"># ./ezctl setup k8s-01 05</span>
ansible-playbook <span class="token parameter variable">-i</span> clusters/k8s-01/hosts <span class="token parameter variable">-e</span> @clusters/k8s-01/config.yml  playbooks/05.kube-node.yml
<span class="token number">2023</span>-01-04 09:06:25 INFO cluster:k8s-01 setup step:05 begins <span class="token keyword">in</span> 5s, press any key to abort:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="vdFZC"></a></p><p><strong>验证 node 状态</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl status kubelet	<span class="token comment"># 查看状态</span>
systemctl status kube-proxy
journalctl <span class="token parameter variable">-u</span> kubelet		<span class="token comment"># 查看日志</span>
journalctl <span class="token parameter variable">-u</span> kube-proxy 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行<code> kubectl get node</code> 可以看到类似</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@worker01:/etc/containerd/certs.d/harbor.ceamg.com<span class="token comment"># kubectl get nodes</span>
NAME        STATUS                     ROLES    AGE   VERSION
<span class="token number">10.1</span>.0.31   Ready,SchedulingDisabled   master   21h   v1.24.2
<span class="token number">10.1</span>.0.32   Ready                      <span class="token function">node</span>     21h   v1.24.2
<span class="token number">10.1</span>.0.33   Ready                      <span class="token function">node</span>     21h   v1.24.2

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="Tikl3"></a></p><h2 id="_9-步骤6-部署网络组件" tabindex="-1"><a class="header-anchor" href="#_9-步骤6-部署网络组件" aria-hidden="true">#</a> 9.步骤6-部署网络组件</h2><p>首先回顾下K8S网络设计原则，在配置集群网络插件或者实践K8S 应用/服务部署请牢记这些原则：</p><ul><li>1.每个Pod都拥有一个独立IP地址，Pod内所有容器共享一个网络命名空间</li><li>2.集群内所有Pod都在一个直接连通的扁平网络中，可通过IP直接访问 <ul><li>所有容器之间无需NAT就可以直接互相访问</li><li>所有Node和所有容器之间无需NAT就可以直接互相访问</li><li>容器自己看到的IP跟其他容器看到的一样</li></ul></li><li>3.Service cluster IP只可在集群内部访问，外部请求需要通过NodePort、LoadBalance或者Ingress来访问</li></ul><p>calico 是k8s社区最流行的网络插件之一，也是k8s-conformance test 默认使用的网络插件，功能丰富，支持network policy；是当前kubeasz项目的默认网络插件。 <br> 如果需要安装calico，请在<strong>clusters/xxxx/hosts</strong>文件中设置变量 <code>CLUSTER_NETWORK=&quot;calico&quot;</code></p><p><a name="B2TM4"></a></p><h3 id="_9-1-使用calico网络组件" tabindex="-1"><a class="header-anchor" href="#_9-1-使用calico网络组件" aria-hidden="true">#</a> 9.1 使⽤calico⽹络组件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> clusters/k8s-01/config.yml
<span class="token comment"># ------------------------------------------- calico</span>
<span class="token comment"># [calico]设置 CALICO_IPV4POOL_IPIP=“off”,可以提高网络性能，条件限制详见 docs/setup/calico.md</span>
CALICO_IPV4POOL_IPIP: <span class="token string">&quot;Always&quot;</span>

<span class="token comment"># [calico]设置 calico-node使用的host IP，bgp邻居通过该地址建立，可手工指定也可以自动发现</span>
IP_AUTODETECTION_METHOD: <span class="token string">&quot;can-reach={{ groups[&#39;kube_master&#39;][0] }}&quot;</span>

<span class="token comment"># [calico]设置calico 网络 backend: brid, vxlan, none</span>
CALICO_NETWORKING_BACKEND: <span class="token string">&quot;brid&quot;</span>

<span class="token comment"># [calico]设置calico 是否使用route reflectors</span>
<span class="token comment"># 如果集群规模超过50个节点，建议启用该特性</span>
CALICO_RR_ENABLED: <span class="token boolean">false</span>

<span class="token comment"># CALICO_RR_NODES 配置route reflectors的节点，如果未设置默认使用集群master节点 </span>
<span class="token comment"># CALICO_RR_NODES: [&quot;192.168.1.1&quot;, &quot;192.168.1.2&quot;]</span>
CALICO_RR_NODES: <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token comment"># [calico]更新支持calico 版本: [v3.3.x] [v3.4.x] [v3.8.x] [v3.15.x]</span>
calico_ver: <span class="token string">&quot;v3.19.4&quot;</span>

<span class="token comment"># [calico]calico 主版本</span>
calico_ver_main: <span class="token string">&quot;{{ calico_ver.split(&#39;.&#39;)[0] }}.{{ calico_ver.split(&#39;.&#39;)[1] }}&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./ezctl setup k8s-01 06
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="yQBko"></a></p><h3 id="_9-2-验证calico网络" tabindex="-1"><a class="header-anchor" href="#_9-2-验证calico网络" aria-hidden="true">#</a> 9.2 验证calico网络</h3><p>执行calico安装成功后可以验证如下：(需要等待镜像下载完成，有时候即便上一步已经配置了docker国内加速，还是可能比较慢，请确认以下容器运行起来以后，再执行后续验证步骤)</p><p><a name="uSZT6"></a></p><h3 id="_9-3-查看所有calico节点状态" tabindex="-1"><a class="header-anchor" href="#_9-3-查看所有calico节点状态" aria-hidden="true">#</a> 9.3 查看所有calico节点状态</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/etc/kubeasz<span class="token comment"># kubectl get pod -A -o wide</span>
NAMESPACE     NAME                                       READY   STATUS    RESTARTS   AGE     IP          NODE        NOMINATED NODE   READINESS GATES
kube-system   calico-kube-controllers-5c8bb696bb-hf2cp   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          6m10s   <span class="token number">10.1</span>.0.33   <span class="token number">10.1</span>.0.33   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   calico-node-6nlt6                          <span class="token number">1</span>/1     Running   <span class="token number">0</span>          6m10s   <span class="token number">10.1</span>.0.32   <span class="token number">10.1</span>.0.32   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   calico-node-fd6rj                          <span class="token number">1</span>/1     Running   <span class="token number">0</span>          6m10s   <span class="token number">10.1</span>.0.33   <span class="token number">10.1</span>.0.33   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   calico-node-lhgh4                          <span class="token number">1</span>/1     Running   <span class="token number">0</span>          6m10s   <span class="token number">10.1</span>.0.31   <span class="token number">10.1</span>.0.31   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/etc/kubeasz<span class="token comment"># calicoctl node status</span>
Calico process is running.

IPv4 BGP status
+--------------+-------------------+-------+----------+-------------+
<span class="token operator">|</span> PEER ADDRESS <span class="token operator">|</span>     PEER TYPE     <span class="token operator">|</span> STATE <span class="token operator">|</span>  SINCE   <span class="token operator">|</span>    INFO     <span class="token operator">|</span>
+--------------+-------------------+-------+----------+-------------+
<span class="token operator">|</span> <span class="token number">10.1</span>.0.32    <span class="token operator">|</span> node-to-node mesh <span class="token operator">|</span> up    <span class="token operator">|</span> 04:16:44 <span class="token operator">|</span> Established <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">10.1</span>.0.33    <span class="token operator">|</span> node-to-node mesh <span class="token operator">|</span> up    <span class="token operator">|</span> 04:16:43 <span class="token operator">|</span> Established <span class="token operator">|</span>
+--------------+-------------------+-------+----------+-------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="gcdLh"></a></p><h3 id="_9-4-创建容器测试网络通信" tabindex="-1"><a class="header-anchor" href="#_9-4-创建容器测试网络通信" aria-hidden="true">#</a> 9.4 创建容器测试网络通信</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/etc/kubeasz<span class="token comment"># kubectl run net-test1 --image=harbor.ceamg.com/library/alpine sleep 360000</span>
pod/net-test1 created
root@master01:/etc/kubeasz<span class="token comment"># kubectl run net-test2 --image=harbor.ceamg.com/library/alpine sleep 360000</span>
pod/net-test2 created
root@master01:/etc/kubeasz<span class="token comment"># kubectl run net-test3 --image=harbor.ceamg.com/library/alpine sleep 360000</span>
pod/net-test3 created


root@master01:/etc/kubeasz<span class="token comment"># kubectl get pod -o wide</span>
NAME        READY   STATUS    RESTARTS   AGE   IP            NODE        NOMINATED NODE   READINESS GATES
net-test1   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          19s   <span class="token number">10.20</span>.5.3     <span class="token number">10.1</span>.0.32   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
net-test2   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          15s   <span class="token number">10.20</span>.30.67   <span class="token number">10.1</span>.0.33   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
net-test3   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          12s   <span class="token number">10.20</span>.30.68   <span class="token number">10.1</span>.0.33   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
<span class="token builtin class-name">test</span>        <span class="token number">1</span>/1     Running   <span class="token number">0</span>          16m   <span class="token number">10.20</span>.5.1     <span class="token number">10.1</span>.0.32   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/etc/kubeasz<span class="token comment"># kubectl exec -it net-test1 -- sh</span>
/ <span class="token comment"># ping 10.20.30.67</span>
PING <span class="token number">10.20</span>.30.67 <span class="token punctuation">(</span><span class="token number">10.20</span>.30.67<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">10.20</span>.30.67: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">62</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.481</span> ms
^C
--- <span class="token number">10.20</span>.30.67 <span class="token function">ping</span> statistics ---
<span class="token number">1</span> packets transmitted, <span class="token number">1</span> packets received, <span class="token number">0</span>% packet loss
round-trip min/avg/max <span class="token operator">=</span> <span class="token number">0.481</span>/0.481/0.481 ms
/ <span class="token comment"># ping 10.20.30.68</span>
PING <span class="token number">10.20</span>.30.68 <span class="token punctuation">(</span><span class="token number">10.20</span>.30.68<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">10.20</span>.30.68: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">62</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.631</span> ms
<span class="token number">64</span> bytes from <span class="token number">10.20</span>.30.68: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">62</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">1.360</span> ms
<span class="token number">64</span> bytes from <span class="token number">10.20</span>.30.68: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">62</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.420</span> ms
^C
--- <span class="token number">10.20</span>.30.68 <span class="token function">ping</span> statistics ---
<span class="token number">3</span> packets transmitted, <span class="token number">3</span> packets received, <span class="token number">0</span>% packet loss
round-trip min/avg/max <span class="token operator">=</span> <span class="token number">0.420</span>/0.803/1.360 ms
/ <span class="token comment"># ping 223.5.5.5</span>
PING <span class="token number">223.5</span>.5.5 <span class="token punctuation">(</span><span class="token number">223.5</span>.5.5<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">223.5</span>.5.5: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">114</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">7.597</span> ms
<span class="token number">64</span> bytes from <span class="token number">223.5</span>.5.5: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">114</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">7.072</span> ms
<span class="token number">64</span> bytes from <span class="token number">223.5</span>.5.5: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">114</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">7.583</span> ms
^C
--- <span class="token number">223.5</span>.5.5 <span class="token function">ping</span> statistics ---
<span class="token number">3</span> packets transmitted, <span class="token number">3</span> packets received, <span class="token number">0</span>% packet loss
round-trip min/avg/max <span class="token operator">=</span> <span class="token number">7.072</span>/7.417/7.597 ms
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="UB4Vd"></a></p><h2 id="_10-步骤7-安装集群插件-coredns" tabindex="-1"><a class="header-anchor" href="#_10-步骤7-安装集群插件-coredns" aria-hidden="true">#</a> 10.步骤7-安装集群插件-coredns</h2><p>DNS 是 k8s 集群首要部署的组件，它为集群中的其他 pods 提供域名解析服务；主要可以解析 集群服务名 SVC 和 Pod hostname；目前建议部署 coredns。</p><p><a name="HM66U"></a></p><h3 id="_10-1-下载二进制包" tabindex="-1"><a class="header-anchor" href="#_10-1-下载二进制包" aria-hidden="true">#</a> 10.1 下载二进制包</h3>`,46),R={href:"https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.24.md#downloads-for-v1249",target:"_blank",rel:"noopener noreferrer"},E=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/usr/local/src<span class="token comment"># ll</span>
total <span class="token number">489740</span>
drwxr-xr-x  <span class="token number">2</span> root root      <span class="token number">4096</span> Jan  <span class="token number">4</span> <span class="token number">13</span>:09 ./
drwxr-xr-x <span class="token number">13</span> root root      <span class="token number">4096</span> Jan  <span class="token number">1</span> <span class="token number">13</span>:20 <span class="token punctuation">..</span>/
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">30495559</span> Jan  <span class="token number">4</span> <span class="token number">13</span>:09 kubernetes-client-linux-amd64.tar.gz
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">123361203</span> Jan  <span class="token number">4</span> <span class="token number">13</span>:09 kubernetes-node-linux-amd64.tar.gz
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">347075448</span> Jan  <span class="token number">4</span> <span class="token number">13</span>:09 kubernetes-server-linux-amd64.tar.gz
-rw-r--r--  <span class="token number">1</span> root root    <span class="token number">532769</span> Jan  <span class="token number">4</span> <span class="token number">13</span>:09 kubernetes.tar.gz

<span class="token comment">#解压后</span>
root@master01:/usr/local/src/kubernetes<span class="token comment"># ll</span>
total <span class="token number">36996</span>
drwxr-xr-x <span class="token number">10</span> root root     <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 ./
drwxr-xr-x  <span class="token number">3</span> root root     <span class="token number">4096</span> Jan  <span class="token number">4</span> <span class="token number">13</span>:11 <span class="token punctuation">..</span>/
drwxr-xr-x  <span class="token number">2</span> root root     <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 addons/
drwxr-xr-x  <span class="token number">3</span> root root     <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 client/
drwxr-xr-x  <span class="token number">9</span> root root     <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 cluster/
drwxr-xr-x  <span class="token number">2</span> root root     <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 docs/
drwxr-xr-x  <span class="token number">3</span> root root     <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 hack/
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">37826576</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 kubernetes-src.tar.gz
drwxr-xr-x  <span class="token number">4</span> root root     <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 LICENSES/
drwxr-xr-x  <span class="token number">3</span> root root     <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:25 node/
-rw-r--r--  <span class="token number">1</span> root root     <span class="token number">4443</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 README.md
drwxr-xr-x  <span class="token number">3</span> root root     <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 server/
-rw-r--r--  <span class="token number">1</span> root root        <span class="token number">8</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 version

<span class="token comment">#插件目录</span>

root@master01:/usr/local/src/kubernetes/cluster/addons<span class="token comment"># ll</span>
total <span class="token number">80</span>
drwxr-xr-x <span class="token number">18</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 ./
drwxr-xr-x  <span class="token number">9</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 <span class="token punctuation">..</span>/
drwxr-xr-x  <span class="token number">2</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 addon-manager/
drwxr-xr-x  <span class="token number">3</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 calico-policy-controller/
drwxr-xr-x  <span class="token number">3</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 cluster-loadbalancing/
drwxr-xr-x  <span class="token number">3</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 device-plugins/
drwxr-xr-x  <span class="token number">5</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 dns/
drwxr-xr-x  <span class="token number">2</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 dns-horizontal-autoscaler/
drwxr-xr-x  <span class="token number">4</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 fluentd-gcp/
drwxr-xr-x  <span class="token number">3</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 ip-masq-agent/
drwxr-xr-x  <span class="token number">2</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 kube-proxy/
drwxr-xr-x  <span class="token number">3</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 metadata-agent/
drwxr-xr-x  <span class="token number">3</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 metadata-proxy/
drwxr-xr-x  <span class="token number">2</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 metrics-server/
drwxr-xr-x  <span class="token number">5</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 node-problem-detector/
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">104</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 OWNERS
drwxr-xr-x  <span class="token number">8</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 rbac/
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">1655</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 README.md
drwxr-xr-x  <span class="token number">8</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 storage-class/
drwxr-xr-x  <span class="token number">4</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 volumesnapshots/


root@master01:/usr/local/src/kubernetes/cluster/addons/dns/coredns<span class="token comment"># ll</span>
total <span class="token number">44</span>
drwxr-xr-x <span class="token number">2</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 ./
drwxr-xr-x <span class="token number">5</span> root root <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 <span class="token punctuation">..</span>/
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">5060</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 coredns.yaml.base
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">5110</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 coredns.yaml.in
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">5112</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 coredns.yaml.sed
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">1075</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 Makefile
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">344</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 transforms2salt.sed
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">287</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 transforms2sed.sed


<span class="token function">cp</span> coredns.yaml.base /root/

<span class="token function">mv</span> /root/coredns.yaml.base  /root/coredns-ceamg.yaml

<span class="token function">vim</span> /root/coredns-ceamg.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="ISh01"></a></p><h3 id="_10-2-修改配置文件" tabindex="-1"><a class="header-anchor" href="#_10-2-修改配置文件" aria-hidden="true">#</a> 10.2 修改配置文件</h3><p><strong>主要配置参数：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>error: <span class="token comment">#错误⽇志输出到stdout。</span>
health： <span class="token comment">#CoreDNS的运⾏状况报告为http://localhost:8080/health.</span>
cache： <span class="token comment">#启⽤coredns缓存。</span>
reload：<span class="token comment">#配置⾃动重新加载配置⽂件，如果修改了ConfigMap的配置，会在两分钟后⽣效.</span>
loadbalance：<span class="token comment">#⼀个域名有多个记录会被轮询解析。</span>
cache <span class="token number">30</span> <span class="token comment">#缓存时间</span>
kubernetes：<span class="token comment">#CoreDNS将根据指定的service domain名称在Kubernetes SVC中进⾏域名解析。</span>
forward： <span class="token comment">#不是Kubernetes集群域内的域名查询都进⾏转发指定的服务器（/etc/resolv.conf）</span>
prometheus：<span class="token comment">#CoreDNS的指标数据可以配置Prometheus 访问http://coredns svc:9153/metrics 进⾏收集。</span>
ready：<span class="token comment">#当coredns 服务启动完成后会进⾏在状态监测，会有个URL 路径为/ready返回200状态码，否则返回报错。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>kubernetes __DNS__DOMAIN_</code>是 <code>clusters/k8s-01/hosts</code> 中填写的内容<code>CLUSTER_DNS_DOMAIN</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Cluster DNS Domain</span>
<span class="token assign-left variable">CLUSTER_DNS_DOMAIN</span><span class="token operator">=</span><span class="token string">&quot;ceamg.local&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>212 <code>clusterIP: __DNS__SERVER__</code>是<code>clusters/k8s-01/hosts</code> 中填写的内容<code>SERVICE_CIDR</code> 第二个IP 也就是 10.10.0.2</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># K8S Service CIDR, not overlap with node(host) networking</span>
<span class="token assign-left variable">SERVICE_CIDR</span><span class="token operator">=</span>&quot;10.10.0.0/16


/ <span class="token comment"># cat /etc/resolv.conf </span>
search default.svc.ceamg.local svc.ceamg.local ceamg.local
nameserver <span class="token number">10.10</span>.0.2

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改如下行内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">77</span>         kubernetes ceamg.local in-addr.arpa ip6.arpa <span class="token punctuation">{</span>
<span class="token number">83</span>         forward <span class="token builtin class-name">.</span> <span class="token number">192.168</span>.0.15 <span class="token punctuation">{</span>
<span class="token number">142</span>         image: harbor.ceamg.com/baseimages/coredns:v1.8.6
<span class="token number">145</span>           limits:
<span class="token number">146</span>             memory: 2048Mi
<span class="token number">147</span>           requests:
<span class="token number">148</span>             cpu: 1000m
<span class="token number">149</span>             memory: 1024Mi
<span class="token number">212</span>   clusterIP: <span class="token number">10.10</span>.0.2


<span class="token number">209</span> spec:
<span class="token number">210</span>   type: NodePort
<span class="token number">211</span>   selector:
<span class="token number">212</span>     k8s-app: kube-dns
<span class="token number">213</span>   clusterIP: <span class="token number">10.10</span>.0.2
<span class="token number">214</span>   ports:
<span class="token number">215</span>   - name: dns
<span class="token number">216</span>     port: <span class="token number">53</span>
<span class="token number">217</span>     protocol: UDP
<span class="token number">218</span>   - name: dns-tcp
<span class="token number">219</span>     port: <span class="token number">53</span>
<span class="token number">220</span>     protocol: TCP
<span class="token number">221</span>   - name: metrics
<span class="token number">222</span>     port: <span class="token number">9153</span>
<span class="token number">223</span>     protocol: TCP
<span class="token number">224</span>     targetPort: <span class="token number">9153</span>
<span class="token number">225</span>     nodePort: <span class="token number">30009</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>查看资源格式： kubectl explain</p></blockquote><p><a name="lxLe9"></a></p><h3 id="_10-3-下载镜像并推送到harbor" tabindex="-1"><a class="header-anchor" href="#_10-3-下载镜像并推送到harbor" aria-hidden="true">#</a> 10.3 下载镜像并推送到harbor</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/usr/local/src/kubernetes/cluster/addons/dns/coredns<span class="token comment"># nerdctl pull registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:v1.8.6</span>
root@master01:/usr/local/src/kubernetes/cluster/addons/dns/coredns<span class="token comment"># nerdctl tag registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:v1.8.6 harbor.ceamg.com/baseimages/coredns:v1.8.6</span>
root@master01:/usr/local/src/kubernetes/cluster/addons/dns/coredns<span class="token comment"># nerdctl push harbor.ceamg.com/baseimages/coredns:v1.8.6</span>
INFO<span class="token punctuation">[</span>0000<span class="token punctuation">]</span> pushing as a reduced-platform image <span class="token punctuation">(</span>application/vnd.docker.distribution.manifest.list.v2+json, sha256:53011ff05d62cd740ae785a98f646ace63374073b0e564a35d4cea008f040940<span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="wibT3"></a></p><h3 id="_10-4-安装coredns" tabindex="-1"><a class="header-anchor" href="#_10-4-安装coredns" aria-hidden="true">#</a> 10.4 安装coredns</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/usr/local/src/kubernetes/cluster/addons/dns/coredns<span class="token comment"># kubectl apply -f /root/coredns-ceamg.yaml </span>
serviceaccount/coredns created
clusterrole.rbac.authorization.k8s.io/system:coredns created
clusterrolebinding.rbac.authorization.k8s.io/system:coredns created
configmap/coredns created
deployment.apps/coredns created
service/kube-dns created

root@master01:~<span class="token comment"># kubectl get pod -A</span>
NAMESPACE     NAME                                       READY   STATUS    RESTARTS      AGE
default       net-test1                                  <span class="token number">1</span>/1     Running   <span class="token number">0</span>             25m
default       net-test2                                  <span class="token number">1</span>/1     Running   <span class="token number">0</span>             25m
default       net-test3                                  <span class="token number">1</span>/1     Running   <span class="token number">0</span>             25m
default       net-test4                                  <span class="token number">1</span>/1     Running   <span class="token number">0</span>             49m
kube-system   calico-kube-controllers-5c8bb696bb-hf2cp   <span class="token number">1</span>/1     Running   <span class="token number">1</span> <span class="token punctuation">(</span>57m ago<span class="token punctuation">)</span>   151m
kube-system   calico-node-6nlt6                          <span class="token number">1</span>/1     Running   <span class="token number">0</span>             151m
kube-system   calico-node-fd6rj                          <span class="token number">1</span>/1     Running   <span class="token number">0</span>             151m
kube-system   calico-node-lhgh4                          <span class="token number">1</span>/1     Running   <span class="token number">0</span>             151m
kube-system   coredns-6c496b89f6-hd8vf                   <span class="token number">1</span>/1     Running   <span class="token number">0</span>             3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="cULzt"></a></p><h3 id="_10-5-启动容器测试域名解析" tabindex="-1"><a class="header-anchor" href="#_10-5-启动容器测试域名解析" aria-hidden="true">#</a> 10.5 启动容器测试域名解析</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:~<span class="token comment"># kubectl exec -it net-test1 </span>
error: you must specify at least one <span class="token builtin class-name">command</span> <span class="token keyword">for</span> the container
root@master01:~<span class="token comment"># kubectl exec -it net-test1  -- sh</span>
/ <span class="token comment"># </span>
/ <span class="token comment"># ping www.baidu.com</span>
PING www.baidu.com <span class="token punctuation">(</span><span class="token number">110.242</span>.68.3<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">110.242</span>.68.3: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">49</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">9.778</span> ms

--- www.baidu.com <span class="token function">ping</span> statistics ---
<span class="token number">1</span> packets transmitted, <span class="token number">1</span> packets received, <span class="token number">0</span>% packet loss
round-trip min/avg/max <span class="token operator">=</span> <span class="token number">9.778</span>/9.778/9.778 ms
/ <span class="token comment"># </span>
/ <span class="token comment"># cat /etc/resolv.conf </span>
search default.svc.ceamg.local svc.ceamg.local ceamg.local
nameserver <span class="token number">10.10</span>.0.2
options ndots:5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="RvzW5"></a></p><h3 id="_10-6-测试-prometheus-监控项" tabindex="-1"><a class="header-anchor" href="#_10-6-测试-prometheus-监控项" aria-hidden="true">#</a> 10.6 测试 prometheus 监控项</h3>`,23),N={href:"http://10.1.0.31:30009/metrics",target:"_blank",rel:"noopener noreferrer"},A=n("br",null,null,-1),I=n("img",{src:"http://cdn1.ryanxin.live/1672815227326-157edf5d-ca34-48af-be12-9e8c529e0271.png",alt:"prometheus监控项接口访问",loading:"lazy"},null,-1),D=n("p",null,[n("a",{name:"qCMg3"})],-1),S=n("h2",{id:"_11-步骤8-安装集群插件-dashboard",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_11-步骤8-安装集群插件-dashboard","aria-hidden":"true"},"#"),s(" 11. 步骤8-安装集群插件-dashboard")],-1),C={href:"https://github.com/kubernetes/dashboard",target:"_blank",rel:"noopener noreferrer"},O=n("a",{name:"JL93f"},null,-1),L=t(`<h3 id="_11-1-下载对应kubernetes版本的dashboard" tabindex="-1"><a class="header-anchor" href="#_11-1-下载对应kubernetes版本的dashboard" aria-hidden="true">#</a> 11.1 下载对应kubernetes版本的dashboard</h3><p><strong>Compatibility</strong></p><table><thead><tr><th>Kubernetes version</th><th>1.21</th><th>1.22</th><th>1.23</th><th>1.24</th></tr></thead><tbody><tr><td>Compatibility</td><td>?</td><td>?</td><td>?</td><td>✓</td></tr></tbody></table><ul><li>✓ Fully supported version range.</li><li>? Due to breaking changes between Kubernetes API versions, some features might not work correctly in the Dashboard.</li></ul><figure><img src="http://cdn1.ryanxin.live/1672820696762-d1dfdf70-772d-43c6-9047-43d17459f886.png" alt="2.6.1版本" tabindex="0" loading="lazy"><figcaption>2.6.1版本</figcaption></figure><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># Copyright 2017 The Kubernetes Authors.</span>
<span class="token comment">#</span>
<span class="token comment"># Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);</span>
<span class="token comment"># you may not use this file except in compliance with the License.</span>
<span class="token comment"># You may obtain a copy of the License at</span>
<span class="token comment">#</span>
<span class="token comment">#     http://www.apache.org/licenses/LICENSE-2.0</span>
<span class="token comment">#</span>
<span class="token comment"># Unless required by applicable law or agreed to in writing, software</span>
<span class="token comment"># distributed under the License is distributed on an &quot;AS IS&quot; BASIS,</span>
<span class="token comment"># WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</span>
<span class="token comment"># See the License for the specific language governing permissions and</span>
<span class="token comment"># limitations under the License.</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Namespace
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8443</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>certs
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>csrf
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">csrf</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>key<span class="token punctuation">-</span>holder
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>settings
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token comment"># Allow Dashboard to get, update and delete Dashboard exclusive secrets.</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;secrets&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resourceNames</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;kubernetes-dashboard-key-holder&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;kubernetes-dashboard-certs&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;kubernetes-dashboard-csrf&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;delete&quot;</span><span class="token punctuation">]</span>
    <span class="token comment"># Allow Dashboard to get and update &#39;kubernetes-dashboard-settings&#39; config map.</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;configmaps&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resourceNames</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;kubernetes-dashboard-settings&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">]</span>
    <span class="token comment"># Allow Dashboard to get metrics.</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;services&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resourceNames</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;heapster&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dashboard-metrics-scraper&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;proxy&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;services/proxy&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resourceNames</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;heapster&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http:heapster:&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;https:heapster:&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dashboard-metrics-scraper&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http:dashboard-metrics-scraper&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token comment"># Allow Metrics Scraper to get metrics from the Metrics server</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;metrics.k8s.io&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pods&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;nodes&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">revisionHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">10</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
        <span class="token key atrule">seccompProfile</span><span class="token punctuation">:</span>
          <span class="token key atrule">type</span><span class="token punctuation">:</span> RuntimeDefault
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
          <span class="token key atrule">image</span><span class="token punctuation">:</span> kubernetesui/dashboard<span class="token punctuation">:</span>v2.6.1
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8443</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
          <span class="token key atrule">args</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>auto<span class="token punctuation">-</span>generate<span class="token punctuation">-</span>certificates
            <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>namespace=kubernetes<span class="token punctuation">-</span>dashboard
            <span class="token comment"># Uncomment the following line to manually specify Kubernetes API server Host</span>
            <span class="token comment"># If not specified, Dashboard will attempt to auto discover the API server and connect</span>
            <span class="token comment"># to it. Uncomment only if the default does not work.</span>
            <span class="token comment"># - --apiserver-host=http://my-address:port</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>certs
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /certs
              <span class="token comment"># Create on-disk volume to store exec logs</span>
            <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /tmp
              <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>volume
          <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
              <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTPS
              <span class="token key atrule">path</span><span class="token punctuation">:</span> /
              <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8443</span>
            <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
            <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
          <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
            <span class="token key atrule">allowPrivilegeEscalation</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
            <span class="token key atrule">readOnlyRootFilesystem</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
            <span class="token key atrule">runAsUser</span><span class="token punctuation">:</span> <span class="token number">1001</span>
            <span class="token key atrule">runAsGroup</span><span class="token punctuation">:</span> <span class="token number">2001</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>certs
          <span class="token key atrule">secret</span><span class="token punctuation">:</span>
            <span class="token key atrule">secretName</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>certs
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>volume
          <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
      <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
        <span class="token key atrule">&quot;kubernetes.io/os&quot;</span><span class="token punctuation">:</span> linux
      <span class="token comment"># Comment the following tolerations if Dashboard must not be deployed on master</span>
      <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span>role.kubernetes.io/master
          <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoSchedule

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8000</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8000</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper

<span class="token punctuation">---</span>

<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">revisionHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">10</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
        <span class="token key atrule">seccompProfile</span><span class="token punctuation">:</span>
          <span class="token key atrule">type</span><span class="token punctuation">:</span> RuntimeDefault
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper
          <span class="token key atrule">image</span><span class="token punctuation">:</span> kubernetesui/metrics<span class="token punctuation">-</span>scraper<span class="token punctuation">:</span>v1.0.8
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8000</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
          <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
              <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
              <span class="token key atrule">path</span><span class="token punctuation">:</span> /
              <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8000</span>
            <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
            <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /tmp
            <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>volume
          <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
            <span class="token key atrule">allowPrivilegeEscalation</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
            <span class="token key atrule">readOnlyRootFilesystem</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
            <span class="token key atrule">runAsUser</span><span class="token punctuation">:</span> <span class="token number">1001</span>
            <span class="token key atrule">runAsGroup</span><span class="token punctuation">:</span> <span class="token number">2001</span>
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
      <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
        <span class="token key atrule">&quot;kubernetes.io/os&quot;</span><span class="token punctuation">:</span> linux
      <span class="token comment"># Comment the following tolerations if Dashboard must not be deployed on master</span>
      <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span>role.kubernetes.io/master
          <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoSchedule
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>volume
          <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="yuxNQ"></a></p><h3 id="_11-2-修改service暴露方式" tabindex="-1"><a class="header-anchor" href="#_11-2-修改service暴露方式" aria-hidden="true">#</a> 11.2 修改service暴露方式</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">32 kind</span><span class="token punctuation">:</span> Service
 <span class="token key atrule">33 apiVersion</span><span class="token punctuation">:</span> v1
 <span class="token key atrule">34 metadata</span><span class="token punctuation">:</span>
 <span class="token key atrule">35   labels</span><span class="token punctuation">:</span>
 <span class="token key atrule">36     k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
 <span class="token key atrule">37   name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
 <span class="token key atrule">38   namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
 <span class="token key atrule">39 spec</span><span class="token punctuation">:</span>
 <span class="token key atrule">40   type</span><span class="token punctuation">:</span> NodePort
 <span class="token key atrule">41   ports</span><span class="token punctuation">:</span>
 <span class="token key atrule">42     - port</span><span class="token punctuation">:</span> <span class="token number">443</span>
 <span class="token key atrule">43       targetPort</span><span class="token punctuation">:</span> <span class="token number">8443</span>
 <span class="token key atrule">44       nodePort</span><span class="token punctuation">:</span> <span class="token number">30010</span>
 <span class="token key atrule">45   selector</span><span class="token punctuation">:</span>
 <span class="token key atrule">46     k8s-app</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="miyGC"></a></p><h3 id="_11-3-下载镜像推送到harbor" tabindex="-1"><a class="header-anchor" href="#_11-3-下载镜像推送到harbor" aria-hidden="true">#</a> 11.3 下载镜像推送到harbor</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>root@master01<span class="token punctuation">:</span><span class="token null important">~</span><span class="token comment"># cat k8s-dashboard-ceamg.yml | grep image</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> kubernetesui/dashboard<span class="token punctuation">:</span>v2.6.1
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
          <span class="token key atrule">image</span><span class="token punctuation">:</span> kubernetesui/metrics<span class="token punctuation">-</span>scraper<span class="token punctuation">:</span>v1.0.8


root@master01<span class="token punctuation">:</span><span class="token null important">~</span><span class="token comment">#nerdctl pull kubernetesui/dashboard:v2.6.1</span>
root@master01<span class="token punctuation">:</span><span class="token null important">~</span><span class="token comment"># nerdctl pull kubernetesui/metrics-scraper:v1.0.8</span>


root@master01<span class="token punctuation">:</span><span class="token null important">~</span><span class="token comment"># nerdctl tag kubernetesui/dashboard:v2.6.1 harbor.ceamg.com/baseimages/dashboard:v2.6.1</span>
root@master01<span class="token punctuation">:</span><span class="token null important">~</span><span class="token comment"># nerdctl push harbor.ceamg.com/baseimages/dashboard:v2.6.1</span>
INFO<span class="token punctuation">[</span><span class="token number">0000</span><span class="token punctuation">]</span> pushing as a reduced<span class="token punctuation">-</span>platform image (application/vnd.docker.distribution.manifest.list.v2+json<span class="token punctuation">,</span> sha256<span class="token punctuation">:</span>f12df071f8bad3e1965b5246095bd3f78df0eb76ceabcc0878d42849d33e4a10) 
<span class="token key atrule">index-sha256:f12df071f8bad3e1965b5246095bd3f78df0eb76ceabcc0878d42849d33e4a10</span><span class="token punctuation">:</span>    done           <span class="token punctuation">|</span>++++++++++++++++++++++++++++++++++++++<span class="token punctuation">|</span> 
<span class="token key atrule">manifest-sha256:d95e1adbe846450bf9451f9c95ab33865115909cf3962960af5983bb916cf320</span><span class="token punctuation">:</span> done           <span class="token punctuation">|</span>++++++++++++++++++++++++++++++++++++++<span class="token punctuation">|</span> 
<span class="token key atrule">config-sha256:783e2b6d87ed93a9f9fee34e84c2b029b7a9572b2f41f761437e58af9c26827f</span><span class="token punctuation">:</span>   done           <span class="token punctuation">|</span>++++++++++++++++++++++++++++++++++++++<span class="token punctuation">|</span> 
<span class="token key atrule">elapsed</span><span class="token punctuation">:</span> <span class="token key atrule">3.2 s                                                                    total</span><span class="token punctuation">:</span>  2.5 Ki (814.0 B/s)                                       
root@master01<span class="token punctuation">:</span><span class="token null important">~</span><span class="token comment"># </span>
root@master01<span class="token punctuation">:</span><span class="token null important">~</span><span class="token comment"># nerdctl tag kubernetesui/metrics-scraper:v1.0.8 harbor.ceamg.com/baseimages/metrics-scraper:v1.0.8</span>
root@master01<span class="token punctuation">:</span><span class="token null important">~</span><span class="token comment"># nerdctl push harbor.ceamg.com/baseimages/metrics-scraper:v1.0.8</span>
INFO<span class="token punctuation">[</span><span class="token number">0000</span><span class="token punctuation">]</span> pushing as a reduced<span class="token punctuation">-</span>platform image (application/vnd.docker.distribution.manifest.list.v2+json<span class="token punctuation">,</span> sha256<span class="token punctuation">:</span>9fdef455b4f9a8ee315a0aa3bd71787cfd929e759da3b4d7e65aaa56510d747b) 
<span class="token key atrule">index-sha256:9fdef455b4f9a8ee315a0aa3bd71787cfd929e759da3b4d7e65aaa56510d747b</span><span class="token punctuation">:</span>    done           <span class="token punctuation">|</span>++++++++++++++++++++++++++++++++++++++<span class="token punctuation">|</span> 
<span class="token key atrule">manifest-sha256:43227e8286fd379ee0415a5e2156a9439c4056807e3caa38e1dd413b0644807a</span><span class="token punctuation">:</span> done           <span class="token punctuation">|</span>++++++++++++++++++++++++++++++++++++++<span class="token punctuation">|</span> 
<span class="token key atrule">config-sha256:115053965e86b2df4d78af78d7951b8644839d20a03820c6df59a261103315f7</span><span class="token punctuation">:</span>   done           <span class="token punctuation">|</span>++++++++++++++++++++++++++++++++++++++<span class="token punctuation">|</span> 
<span class="token key atrule">elapsed</span><span class="token punctuation">:</span> <span class="token key atrule">0.8 s        total</span><span class="token punctuation">:</span>  2.2 Ki (2.7 KiB/s)                                   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="j86UC"></a></p><h3 id="_11-4-修改镜像地址" tabindex="-1"><a class="header-anchor" href="#_11-4-修改镜像地址" aria-hidden="true">#</a> 11.4 修改镜像地址</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">195           image</span><span class="token punctuation">:</span> harbor.ceamg.com/baseimages/dashboard<span class="token punctuation">:</span>v2.6.1
<span class="token key atrule">280           image</span><span class="token punctuation">:</span> harbor.ceamg.com/baseimages/metrics<span class="token punctuation">-</span>scraper<span class="token punctuation">:</span>v1.0.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="KF19j"></a></p><h3 id="_11-5-安装dashboard组件" tabindex="-1"><a class="header-anchor" href="#_11-5-安装dashboard组件" aria-hidden="true">#</a> 11.5 安装dashboard组件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> k8s-dashboard-ceamg.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="HQ93h"></a></p><h3 id="_11-6-查看组件运行状态" tabindex="-1"><a class="header-anchor" href="#_11-6-查看组件运行状态" aria-hidden="true">#</a> 11.6 查看组件运行状态</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>root@master01<span class="token punctuation">:</span><span class="token null important">~</span><span class="token comment"># kubectl get pod -A</span>
NAMESPACE              NAME                                        READY   STATUS    RESTARTS       AGE
default                net<span class="token punctuation">-</span>test1                                   1/1     Running   0              99m
default                net<span class="token punctuation">-</span>test2                                   1/1     Running   0              99m
default                net<span class="token punctuation">-</span>test3                                   1/1     Running   0              99m
default                net<span class="token punctuation">-</span>test4                                   1/1     Running   0              123m
kube<span class="token punctuation">-</span>system            calico<span class="token punctuation">-</span>kube<span class="token punctuation">-</span>controllers<span class="token punctuation">-</span>5c8bb696bb<span class="token punctuation">-</span>hf2cp    1/1     Running   1 (131m ago)   3h45m
kube<span class="token punctuation">-</span>system            calico<span class="token punctuation">-</span>node<span class="token punctuation">-</span>6nlt6                           1/1     Running   0              3h45m
kube<span class="token punctuation">-</span>system            calico<span class="token punctuation">-</span>node<span class="token punctuation">-</span>fd6rj                           1/1     Running   0              3h45m
kube<span class="token punctuation">-</span>system            calico<span class="token punctuation">-</span>node<span class="token punctuation">-</span>lhgh4                           1/1     Running   0              3h45m
kube<span class="token punctuation">-</span>system            coredns<span class="token punctuation">-</span>6c496b89f6<span class="token punctuation">-</span>hd8vf                    1/1     Running   0              73m
kubernetes<span class="token punctuation">-</span>dashboard   dashboard<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>scraper<span class="token punctuation">-</span>8b9c56ffb<span class="token punctuation">-</span>tjjc4   1/1     Running   0              14s
kubernetes<span class="token punctuation">-</span>dashboard   kubernetes<span class="token punctuation">-</span>dashboard<span class="token punctuation">-</span>6f9f585c48<span class="token punctuation">-</span>vv2pz       1/1     Running   0              14s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="BQVpO"></a></p><h3 id="_11-7-获取登陆-token" tabindex="-1"><a class="header-anchor" href="#_11-7-获取登陆-token" aria-hidden="true">#</a> 11.7 获取登陆 token</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin<span class="token punctuation">-</span>user
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin<span class="token punctuation">-</span>user
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin<span class="token punctuation">-</span>user
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard


root@master01<span class="token punctuation">:</span><span class="token null important">~</span><span class="token comment"># kubectl apply -f admin-user.yml </span>
serviceaccount/admin<span class="token punctuation">-</span>user created
clusterrolebinding.rbac.authorization.k8s.io/admin<span class="token punctuation">-</span>user created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p><strong>注意</strong>：v1.24.0 更新之后进行创建 ServiceAccount 不会自动生成 Secret 需要对其手动创建</p></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建token</span>
root@master01:~<span class="token comment"># kubectl -n kubernetes-dashboard create token admin-user --duration 604800s</span>
eyJhbGciOiJSUzI1NiIsImtpZCI6ImptTldRRDRZZVVSdXRhaU1RNUtyQmJUSmVTbW55VThqNHhLU1l6U3B4R28ifQ.eyJhdWQiOlsiYXBpIiwiaXN0aW8tY2EiXSwiZXhwIjoxNjczNDI1MDI3LCJpYXQiOjE2NzI4MjAyMjcsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2YyIsImt1YmVybmV0ZXMuaW8iOnsibmFtZXNwYWNlIjoia3ViZXJuZXRlcy1kYXNoYm9hcmQiLCJzZXJ2aWNlYWNjb3VudCI6eyJuYW1lIjoiYWRtaW4tdXNlciIsInVpZCI6IjdhNTAzN2E4LTQ2MGEtNGM3YS05NWQ5LTNjM2JkNGQ0YTUyZSJ9fSwibmJmIjoxNjcyODIwMjI3LCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6YWRtaW4tdXNlciJ9.ciX6c6hUe8NqPHWp7GteAecZ75L50sKL0l0jk6hETJM9xUVkE-knhm-wQWogOCq1vJMWtg_qeYqsyxfFAMbXdnGgXUXH3tuLVe0NcSHfGVa0BBfjUqODODoAcKdEWJJqdTO_QCfzHTTGkBDZoPgqjALBFzMVh_anlUdeSehRtTh6y2L0dsMRbWuEp1YI8phXumRGIbsrRDOenCycfyPh2AUEChMhD_uYS85z2tDVbno-1y4sSoSiPPn-awUEAxo-ly7zIOUz_b6ZiMhM6nGTuJ-7Jyxq4A8f2pj-iyXA_ve3g1Y4AaInd1aaZhCQ_82rOpmHP0Idyzg_lqEneltBaw
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式二<br>手动创建secrit</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/zookeeper<span class="token comment"># kubectl apply -f secrit </span>
secret/admin-user created

apiVersion: v1
kind: Secret
type: kubernetes.io/service-account-token
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
  annotations:
    kubernetes.io/service-account.name: <span class="token string">&quot;admin-user&quot;</span>



root@master01:/zookeeper<span class="token comment"># kubectl -n kubernetes-dashboard describe sa admin-user</span>
Name:                admin-user
Namespace:           kubernetes-dashboard
Labels:              <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:         <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Image pull secrets:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Mountable secrets:   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Tokens:              admin-user
Events:              <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
root@master01:/zookeeper<span class="token comment"># kubectl -n kubernetes-dashboard describe secrets admin-user</span>
Name:         admin-user
Namespace:    kubernetes-dashboard
Labels:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:  kubernetes.io/service-account.name: admin-user
              kubernetes.io/service-account.uid: 7a5037a8-460a-4c7a-95d9-3c3bd4d4a52e

Type:  kubernetes.io/service-account-token

Data
<span class="token operator">==</span><span class="token operator">==</span>
namespace:  <span class="token number">20</span> bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6ImptTldRRDRZZVVSdXRhaU1RNUtyQmJUSmVTbW55VThqNHhLU1l6U3B4R28ifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI3YTUwMzdhOC00NjBhLTRjN2EtOTVkOS0zYzNiZDRkNGE1MmUiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6YWRtaW4tdXNlciJ9.YIZ1UepKs7WzebxKMOVIPkmz0KLkIyV59S7D0x4sBpefqseX6lSfV_YbhDjQv0dm6ne9HJ85dHzF1-qmSJEO_EW3m-aNOfmem7jkqr8XDUIgHceeKZimauTodKvApsWWD_Flsk7r2nin-MoNkOJ5mi6g5Pu3iQuKhQINl3G9Wwch5c-5FV0l-RBWR1rw9rVby6fh1jfkAhMWGL7lWKJeAA6fE2dTJVSJ-ZhW_bzwPTTDKNhIlpRsyKEnFXwWmK9Jqoxq8y5H0iJIhbvkYCxwUG2Gjjfi6jIWhJvWo20_kTq5Cy-7BNXafBI5D6VKmFwHFyOLBQcvkntN2IpVRNcfbA
ca.crt:     <span class="token number">1302</span> bytes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),z={href:"https://blog.csdn.net/qq_41619571/article/details/127217339",target:"_blank",rel:"noopener noreferrer"},T=t(`<p><a name="LVYtG"></a></p><h3 id="_11-8-登录测试" tabindex="-1"><a class="header-anchor" href="#_11-8-登录测试" aria-hidden="true">#</a> 11.8 登录测试</h3><figure><img src="http://cdn1.ryanxin.live/1672820370137-de794fe7-65da-418b-85a4-b92f3b8b3e42.png" alt="输入token" tabindex="0" loading="lazy"><figcaption>输入token</figcaption></figure><figure><img src="http://cdn1.ryanxin.live/1672820388726-cab07cf9-cbb9-4db3-bb1d-ef6ecfab21ff.png" alt="界面展示" tabindex="0" loading="lazy"><figcaption>界面展示</figcaption></figure><p><a name="F03jb"></a></p><h2 id="_12-集群管理" tabindex="-1"><a class="header-anchor" href="#_12-集群管理" aria-hidden="true">#</a> 12. 集群管理</h2><p>集群管理主要是添加master、添加node、删除master与删除node等节点管理及监控</p><p><a name="K5WEr"></a></p><h3 id="_12-1-添加node节点" tabindex="-1"><a class="header-anchor" href="#_12-1-添加node节点" aria-hidden="true">#</a> 12.1 添加node节点</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./ezctl add-node k8s-01 <span class="token number">10.1</span>.0.39
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="wkLu3"></a></p><h3 id="_12-2-添加master-节点" tabindex="-1"><a class="header-anchor" href="#_12-2-添加master-节点" aria-hidden="true">#</a> 12.2 添加master 节点</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/etc/kubeasz<span class="token comment"># ./ezctl add-master k8s-01 10.1.0.30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>master 节点添加后会向 node节点 <code>/etc/kube-lb/conf/kube-lb.conf</code> 中添加反向代理节点</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>user root<span class="token punctuation">;</span>
worker_processes <span class="token number">1</span><span class="token punctuation">;</span>

error_log  /etc/kube-lb/logs/error.log warn<span class="token punctuation">;</span>

events <span class="token punctuation">{</span>
    worker_connections  <span class="token number">3000</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

stream <span class="token punctuation">{</span>
    upstream backend <span class="token punctuation">{</span>
        server <span class="token number">10.1</span>.0.30:6443    <span class="token assign-left variable">max_fails</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">fail_timeout</span><span class="token operator">=</span>3s<span class="token punctuation">;</span>
        server <span class="token number">10.1</span>.0.31:6443    <span class="token assign-left variable">max_fails</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">fail_timeout</span><span class="token operator">=</span>3s<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    server <span class="token punctuation">{</span>
        listen <span class="token number">127.0</span>.0.1:6443<span class="token punctuation">;</span>
        proxy_connect_timeout 1s<span class="token punctuation">;</span>
        proxy_pass backend<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="laKNR"></a></p><h3 id="_12-3-验证当前节点" tabindex="-1"><a class="header-anchor" href="#_12-3-验证当前节点" aria-hidden="true">#</a> 12.3 验证当前节点</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master02:~<span class="token comment"># kubectl get nodes</span>
NAME        STATUS                     ROLES    AGE   VERSION
<span class="token number">10.1</span>.0.30   Ready,SchedulingDisabled   master   15m   v1.24.2
<span class="token number">10.1</span>.0.31   Ready,SchedulingDisabled   master   44h   v1.24.2
<span class="token number">10.1</span>.0.32   Ready                      <span class="token function">node</span>     44h   v1.24.2
<span class="token number">10.1</span>.0.33   Ready                      <span class="token function">node</span>     44h   v1.24.2


root@master02:~<span class="token comment"># calicoctl node status</span>
Calico process is running.

IPv4 BGP status
+--------------+-------------------+-------+----------+-------------+
<span class="token operator">|</span> PEER ADDRESS <span class="token operator">|</span>     PEER TYPE     <span class="token operator">|</span> STATE <span class="token operator">|</span>  SINCE   <span class="token operator">|</span>    INFO     <span class="token operator">|</span>
+--------------+-------------------+-------+----------+-------------+
<span class="token operator">|</span> <span class="token number">10.1</span>.0.31    <span class="token operator">|</span> node-to-node mesh <span class="token operator">|</span> up    <span class="token operator">|</span> 02:47:43 <span class="token operator">|</span> Established <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">10.1</span>.0.32    <span class="token operator">|</span> node-to-node mesh <span class="token operator">|</span> up    <span class="token operator">|</span> 02:47:12 <span class="token operator">|</span> Established <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">10.1</span>.0.33    <span class="token operator">|</span> node-to-node mesh <span class="token operator">|</span> up    <span class="token operator">|</span> 02:47:31 <span class="token operator">|</span> Established <span class="token operator">|</span>
+--------------+-------------------+-------+----------+-------------+

IPv6 BGP status
No IPv6 peers found.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="pHeKZ"></a></p><h2 id="_13-集群升级" tabindex="-1"><a class="header-anchor" href="#_13-集群升级" aria-hidden="true">#</a> 13. 集群升级</h2><p>先升级master 保证集群中至少有一个master节点可用 ，在node节点nginx反向代理中注释掉要升级的master节点。</p><figure><img src="http://cdn1.ryanxin.live/1672892592550-0602394c-6d2e-4912-b773-459e3460253a.jpg" alt="1672892592550-0602394c-6d2e-4912-b773-459e3460253a" tabindex="0" loading="lazy"><figcaption>1672892592550-0602394c-6d2e-4912-b773-459e3460253a</figcaption></figure><p><a name="ZaisC"></a></p><h3 id="_13-1-升级master节点" tabindex="-1"><a class="header-anchor" href="#_13-1-升级master节点" aria-hidden="true">#</a> 13.1 升级master节点</h3><p>在各个node节点反向代理配置中注释掉要升级的master节点</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/kube-lb/conf/kube-lb.conf

user root<span class="token punctuation">;</span>
worker_processes <span class="token number">1</span><span class="token punctuation">;</span>

error_log  /etc/kube-lb/logs/error.log warn<span class="token punctuation">;</span>

events <span class="token punctuation">{</span>
    worker_connections  <span class="token number">3000</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

stream <span class="token punctuation">{</span>
    upstream backend <span class="token punctuation">{</span>
        <span class="token comment">#server 10.1.0.30:6443    max_fails=2 fail_timeout=3s;</span>
        server <span class="token number">10.1</span>.0.31:6443    <span class="token assign-left variable">max_fails</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">fail_timeout</span><span class="token operator">=</span>3s<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    server <span class="token punctuation">{</span>
        listen <span class="token number">127.0</span>.0.1:6443<span class="token punctuation">;</span>
        proxy_connect_timeout 1s<span class="token punctuation">;</span>
        proxy_pass backend<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#重启服务</span>
root@worker01:~<span class="token comment"># systemctl restart kube-lb.service</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>node节点升级需要停服务，需要关闭kubelet 和 kube-proxy服务替换二进制文件</p><ul><li>kube-apiserver</li><li>kube-controller-manager</li><li>kubectl</li><li>kubelet</li><li>kube-proxy</li><li>kube-scheduler</li></ul><p>去github找到想要升级的版本下载二进制文件：</p>`,29),P={href:"https://github.com/kubernetes/kubernetes/releases",target:"_blank",rel:"noopener noreferrer"},M=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/usr/local/src<span class="token comment"># ll</span>
total <span class="token number">489744</span>
drwxr-xr-x  <span class="token number">3</span> root root      <span class="token number">4096</span> Jan  <span class="token number">4</span> <span class="token number">13</span>:11 ./
drwxr-xr-x <span class="token number">13</span> root root      <span class="token number">4096</span> Jan  <span class="token number">1</span> <span class="token number">13</span>:20 <span class="token punctuation">..</span>/
drwxr-xr-x <span class="token number">10</span> root root      <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 kubernetes/
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">30495559</span> Jan  <span class="token number">4</span> <span class="token number">13</span>:09 kubernetes-client-linux-amd64.tar.gz
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">123361203</span> Jan  <span class="token number">4</span> <span class="token number">13</span>:09 kubernetes-node-linux-amd64.tar.gz
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">347075448</span> Jan  <span class="token number">4</span> <span class="token number">13</span>:09 kubernetes-server-linux-amd64.tar.gz
-rw-r--r--  <span class="token number">1</span> root root    <span class="token number">532769</span> Jan  <span class="token number">4</span> <span class="token number">13</span>:09 kubernetes.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>二进制文件在/server/bin目录下面</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/usr/local/src/kubernetes/server/bin<span class="token comment"># ll -ls</span>
total <span class="token number">1090008</span>
     <span class="token number">4</span> drwxr-xr-x <span class="token number">2</span> root root      <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 ./
     <span class="token number">4</span> drwxr-xr-x <span class="token number">3</span> root root      <span class="token number">4096</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:31 <span class="token punctuation">..</span>/
 <span class="token number">54176</span> -rwxr-xr-x <span class="token number">1</span> root root  <span class="token number">55476224</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 apiextensions-apiserver*
 <span class="token number">43380</span> -rwxr-xr-x <span class="token number">1</span> root root  <span class="token number">44421120</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 kubeadm*
 <span class="token number">48408</span> -rwxr-xr-x <span class="token number">1</span> root root  <span class="token number">49569792</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 kube-aggregator*
<span class="token number">123032</span> -rwxr-xr-x <span class="token number">1</span> root root <span class="token number">125980672</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 kube-apiserver*
     <span class="token number">4</span> -rw-r--r-- <span class="token number">1</span> root root         <span class="token number">8</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:25 kube-apiserver.docker_tag
<span class="token number">128092</span> -rw------- <span class="token number">1</span> root root <span class="token number">131165184</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:25 kube-apiserver.tar
<span class="token number">112896</span> -rwxr-xr-x <span class="token number">1</span> root root <span class="token number">115605504</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 kube-controller-manager*
     <span class="token number">4</span> -rw-r--r-- <span class="token number">1</span> root root         <span class="token number">8</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:25 kube-controller-manager.docker_tag
<span class="token number">117960</span> -rw------- <span class="token number">1</span> root root <span class="token number">120790016</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:25 kube-controller-manager.tar
 <span class="token number">44680</span> -rwxr-xr-x <span class="token number">1</span> root root  <span class="token number">45752320</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 kubectl*
 <span class="token number">53796</span> -rwxr-xr-x <span class="token number">1</span> root root  <span class="token number">55085992</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 kubectl-convert*
<span class="token number">113376</span> -rwxr-xr-x <span class="token number">1</span> root root <span class="token number">116095704</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 kubelet*
  <span class="token number">1452</span> -rwxr-xr-x <span class="token number">1</span> root root   <span class="token number">1486848</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 kube-log-runner*
 <span class="token number">40820</span> -rwxr-xr-x <span class="token number">1</span> root root  <span class="token number">41799680</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 kube-proxy*
     <span class="token number">4</span> -rw-r--r-- <span class="token number">1</span> root root         <span class="token number">8</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:25 kube-proxy.docker_tag
<span class="token number">109280</span> -rw------- <span class="token number">1</span> root root <span class="token number">111901184</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:25 kube-proxy.tar
 <span class="token number">46096</span> -rwxr-xr-x <span class="token number">1</span> root root  <span class="token number">47202304</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 kube-scheduler*
     <span class="token number">4</span> -rw-r--r-- <span class="token number">1</span> root root         <span class="token number">8</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:25 kube-scheduler.docker_tag
 <span class="token number">51160</span> -rw------- <span class="token number">1</span> root root  <span class="token number">52386816</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:25 kube-scheduler.tar
  <span class="token number">1380</span> -rwxr-xr-x <span class="token number">1</span> root root   <span class="token number">1413120</span> Dec  <span class="token number">8</span> <span class="token number">18</span>:26 mounter*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/usr/local/src/kubernetes/server/bin<span class="token comment"># ./kube-apiserver --version</span>
Kubernetes v1.24.9
<span class="token comment">#当前版本</span>
root@master01:/usr/local/src/kubernetes/server/bin<span class="token comment"># /etc/kubeasz/bin/kube-apiserver --version</span>
Kubernetes v1.24.2


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>停止服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl stop kube-proxy kube-controller-manager kubelet kube-scheduler kube-apiserver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>替换二进制文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/usr/local/src/kubernetes/server/bin<span class="token comment"># scp kube-apiserver kube-controller-manager kubelet kube-scheduler kube-proxy 10.1.0.30:/usr/local/bin</span>
kube-apiserver                                                                                                                                                                              <span class="token number">100</span>%  120MB <span class="token number">129</span>.5MB/s   00:00    
kube-controller-manager                                                                                                                                                                     <span class="token number">100</span>%  110MB <span class="token number">128</span>.8MB/s   00:00    
kubelet                                                                                                                                                                                     <span class="token number">100</span>%  111MB <span class="token number">137</span>.1MB/s   00:00    
kube-scheduler                                                                                                                                                                              <span class="token number">100</span>%   45MB <span class="token number">128</span>.5MB/s   00:00    
kube-proxy                                                                                                                                                                                  <span class="token number">100</span>%   40MB <span class="token number">132</span>.0MB/s   00:00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl start kube-proxy kube-controller-manager kubelet kube-scheduler kube-apiserver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>验证版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master02:~<span class="token comment"># kubectl get nodes</span>
NAME        STATUS                     ROLES    AGE    VERSION
<span class="token number">10.1</span>.0.30   Ready,SchedulingDisabled   master   136m   v1.24.9
<span class="token number">10.1</span>.0.31   Ready,SchedulingDisabled   master   46h    v1.24.2
<span class="token number">10.1</span>.0.32   Ready                      <span class="token function">node</span>     46h    v1.24.2
<span class="token number">10.1</span>.0.33   Ready                      <span class="token function">node</span>     46h    v1.24.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在另外的master节点上重复以上操作</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/usr/local/src/kubernetes/server/bin<span class="token comment"># systemctl stop kube-proxy kube-controller-manager kubelet kube-scheduler kube-apiserver</span>
root@master01:/usr/local/src/kubernetes/server/bin<span class="token comment"># \\cp kube-apiserver kube-controller-manager kubelet kube-scheduler kube-proxy /usr/local/bin</span>


root@master01:/usr/local/src/kubernetes/server/bin<span class="token comment"># kubectl get nodes</span>
NAME        STATUS                     ROLES    AGE    VERSION
<span class="token number">10.1</span>.0.30   Ready,SchedulingDisabled   master   142m   v1.24.9
<span class="token number">10.1</span>.0.31   Ready,SchedulingDisabled   master   47h    v1.24.9
<span class="token number">10.1</span>.0.32   Ready                      <span class="token function">node</span>     46h    v1.24.2
<span class="token number">10.1</span>.0.33   Ready                      <span class="token function">node</span>     46h    v1.24.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>各node节点kube-lb取消upstream注释</p><p><a name="z1OjH"></a></p><h3 id="_13-2-升级node节点" tabindex="-1"><a class="header-anchor" href="#_13-2-升级node节点" aria-hidden="true">#</a> 13.2 升级node节点</h3><p>node节点只需要替换kubelet 和 kube-proxy 两个</p><p>关闭服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@worker01:~<span class="token comment"># systemctl stop kubelet.service kube-proxy.service</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>替换二进制文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01:/usr/local/src/kubernetes/server/bin<span class="token comment"># scp kubelet kube-proxy 10.1.0.32:/usr/local/bin</span>
kubelet                                                                                                                                                                                     <span class="token number">100</span>%  111MB <span class="token number">134</span>.8MB/s   00:00    
kube-proxy      <span class="token number">100</span>%   40MB <span class="token number">139</span>.3MB/s   00:00

root@master01:/usr/local/src/kubernetes/server/bin<span class="token comment"># scp kubelet kube-proxy 10.1.0.33:/usr/local/bin</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@worker01:~<span class="token comment"># systemctl start kubelet.service kube-proxy.service</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>验证版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master02:~<span class="token comment"># kubectl get nodes</span>
NAME        STATUS                     ROLES    AGE    VERSION
<span class="token number">10.1</span>.0.30   Ready,SchedulingDisabled   master   157m   v1.24.9
<span class="token number">10.1</span>.0.31   Ready,SchedulingDisabled   master   47h    v1.24.9
<span class="token number">10.1</span>.0.32   Ready                      <span class="token function">node</span>     46h    v1.24.9
<span class="token number">10.1</span>.0.33   Ready                      <span class="token function">node</span>     46h    v1.24.9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26);function V(B,G){const a=i("ExternalLinkIcon");return l(),p("div",null,[n("p",null,[n("a",r,[s("k8s-实战案例_v1.21.x-部署.pdf"),e(a)])]),u,n("p",null,[s("使⽤ **master01 **作为部署节点"),d,n("a",m,[s("GitHub - easzlab/kubeasz: 使用Ansible脚本安装K8S集群，介绍组件交互原理，方便直接，不受国内网络环境影响"),e(a)])]),k,n("p",null,[n("a",v,[s("Harbor – Reconfigure Harbor and Manage the Harbor Lifecycle"),e(a)]),b,s(" 有扫描"),h,s(" ,有认证"),g,s("，有helm charts 模块退出"),y,s(" 其中"),f,s("已弃用")]),_,n("p",null,[s("推送镜像 "),q,n("a",x,[s("nerdctl.pdf"),e(a)])]),w,n("p",null,[n("a",R,[s("kubernetes/CHANGELOG-1.24.md at master · kubernetes/kubernetes"),e(a)])]),E,n("p",null,[n("a",N,[s("http://10.1.0.31:30009/metrics"),e(a)]),A,I]),D,S,n("p",null,[n("a",C,[s("https://github.com/kubernetes/dashboard"),e(a)]),O]),L,n("p",null,[n("a",z,[s("https://blog.csdn.net/qq_41619571/article/details/127217339"),e(a)])]),T,n("p",null,[n("a",P,[s("https://github.com/kubernetes/kubernetes/releases"),e(a)])]),M])}const W=o(c,[["render",V],["__file","kubernetes-1.html.vue"]]);export{W as default};
