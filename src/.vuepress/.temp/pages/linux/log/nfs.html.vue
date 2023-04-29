<template><div><h1 id="nfs共享存储" tabindex="-1"><a class="header-anchor" href="#nfs共享存储" aria-hidden="true">#</a> nfs共享存储</h1>
<h2 id="_1-nfs基本概述" tabindex="-1"><a class="header-anchor" href="#_1-nfs基本概述" aria-hidden="true">#</a> 1.NFS基本概述</h2>
<h3 id="_1-1-什么是nfs" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是nfs" aria-hidden="true">#</a> 1.1 什么是NFS?</h3>
<p>NFS是Network File System的缩写及网络文件系统。[ 通常我们称NFS为共享存储]</p>
<br>
<br>
<h3 id="_1-2-nfs能干什么" tabindex="-1"><a class="header-anchor" href="#_1-2-nfs能干什么" aria-hidden="true">#</a> 1.2 NFS能干什么?</h3>
<p>NFS的主要功能是通过局域网络让不同主机系统之间可以共享目录。</p>
<br>
<br>
<h3 id="_1-3-为什么要使用nfs" tabindex="-1"><a class="header-anchor" href="#_1-3-为什么要使用nfs" aria-hidden="true">#</a> 1.3 为什么要使用NFS?</h3>
<p>在网站集群架构中如果没有共享存储的情况如下:</p>
<ol>
<li>A用户上传图片经过负载均衡，负载均衡将上传请求调度至WEB1服务器上。</li>
<li>B用户访问A用户上传的图片，此时B用户被负载均衡调度至WEB2_上，因为WEB2_ 上没有这张图片，所以B用户无法看到A用户传的图片。</li>
</ol>
<br>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/为什么要使用NFS.jpg" alt="为什么要使用NFS" loading="lazy">
<br></p>
<p>在网站集群架构中如果有共享存储的情况如下:</p>
<ol>
<li>A用户上传图片无论被负载均衡调度至WEB1还是WEB2,最终数据都被写入至共享存储</li>
<li>B用户访问A用户上传图片时，无论调度至WEB1还是WEB2，最终都会上共享存储访问对应的文件，这样就可以访问到资源了</li>
</ol>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/为什么要使用NFS2.jpg" alt="为什么要使用NFS2" tabindex="0" loading="lazy"><figcaption>为什么要使用NFS2</figcaption></figure>
<br>
<br>
<h3 id="_1-4-使用nfs共享存储能解决集群架构的什么问题" tabindex="-1"><a class="header-anchor" href="#_1-4-使用nfs共享存储能解决集群架构的什么问题" aria-hidden="true">#</a> 1.4 使用NFS共享存储能解决集群架构的什么问题?</h3>
<ul>
<li>解决多台web静态资源的共享(所有客户端都挂载服务端，看到的数据都- -样)</li>
<li>解决多台web静态资源-致性(如果客户端A删除NFS服务上的test文件，客户端B. 上也会看不见test文件)</li>
<li>解决多台web磁盘空间的浪费</li>
</ul>
<br>
<br>
<h3 id="_1-5-企业使用nfs注意事项" tabindex="-1"><a class="header-anchor" href="#_1-5-企业使用nfs注意事项" aria-hidden="true">#</a> 1.5 企业使用NFS注意事项</h3>
<ol>
<li>由于用户请求静态资源每次都需要web连接NFS服务获取，那么势必会带来-定的网络开销、以及网络延时、所以增加NFS服务并不能给网站带来访问速度的提升。</li>
<li>如果希望对上传的图片、附件等静资源进行加速，建议将静态资源统-存放至NFS服务端。这样便于后期统一推送至CDN, 以此来实现资源的加速。</li>
</ol>
<br>
<br>
<h2 id="_2-nfs原理" tabindex="-1"><a class="header-anchor" href="#_2-nfs原理" aria-hidden="true">#</a> 2.NFS原理</h2>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/nfs原理.jpg" alt="nfs原理" loading="lazy">
<br></p>
<h3 id="_2-1-本地文件操作方式" tabindex="-1"><a class="header-anchor" href="#_2-1-本地文件操作方式" aria-hidden="true">#</a> 2.1 本地文件操作方式</h3>
<ol>
<li>当用户执行mkdir命令, BashShell无法完成该命令操作，会将其翻译给内核。</li>
<li>Kernel内核解析完成后会驱动对应的磁盘设备，完成创建目录的操作。</li>
</ol>
<h3 id="nfs实现原理" tabindex="-1"><a class="header-anchor" href="#nfs实现原理" aria-hidden="true">#</a> NFS实现原理</h3>
<p>需要先了解 程序|进程|线程<br></p>
<ol>
<li>NFS客户端执行增、删等操作，客户端会使用不同的函数对该操作进行封装。</li>
<li>NFS客户端会通过TCP/IP的方式传递给NFS服务端。</li>
<li>NFS服务端接收到请求后，会先 调用portmap进程进行端C映射。</li>
<li>nfsd进程用于判断NFS客户端是否拥有权限连接NFS服务端。</li>
<li>Rpc.mount进程判断客户端是否有对应的权限进行验证。</li>
<li>idmap进程实现用户映射和压缩。</li>
<li>最后NFS服务端会将客户端的函数转换为本地能执行的命令，然后将命令传递至内核，由内核</li>
</ol>
<p><strong>驱动硬件</strong> <br>
<strong>注意</strong>:rpc是 一个远程过程调用，那么使用nfs必须有rpc服务<br></p>
<br>
<br>
<h2 id="_3-nfs服务安装" tabindex="-1"><a class="header-anchor" href="#_3-nfs服务安装" aria-hidden="true">#</a> 3.NFS服务安装</h2>
<br>
<table>
<thead>
<tr>
<th>服务器系统</th>
<th>角色</th>
<th>外网IP</th>
<th>内网IP</th>
</tr>
</thead>
<tbody>
<tr>
<td>CentOS 7.6</td>
<td>NFS服务端</td>
<td>eth0:10.0.0.31</td>
<td>eth1:172.16.1.31</td>
</tr>
<tr>
<td>CentOS 7.6</td>
<td>NFS客户端</td>
<td>eth0:10.0.0.41</td>
<td>eth1:172.16.1.41</td>
</tr>
</tbody>
</table>
<br>
<h3 id="_3-1-环境配置" tabindex="-1"><a class="header-anchor" href="#_3-1-环境配置" aria-hidden="true">#</a> 3.1 环境配置</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#关闭Firewalld防火墙</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># systemctL disable firewalld</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># systemctl stop firewalld</span>

<span class="token comment">#关闭selinux</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># sed -ri ' #^SEL INUX=#cSEL INUX=Disabled' /etc/selinux/config</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># setenforce 0</span>

<span class="token comment">#安装nfs-server服务</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> nfs-utils

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_3-2配置nfs服务" tabindex="-1"><a class="header-anchor" href="#_3-2配置nfs服务" aria-hidden="true">#</a> 3.2配置nfs服务</h3>
<p>nfs服务程序的配置文件为<code v-pre>/etc/exports</code>，需要严格按照共享目录的路径允许访问的NFS客户端(共享权限参数)格式书写，<br>
定义要共享的目录与相应的权限，具体书写方式如下图所示。<br></p>
<br>
<br>
<h3 id="_3-3-使用场景" tabindex="-1"><a class="header-anchor" href="#_3-3-使用场景" aria-hidden="true">#</a> 3.3.使用场景</h3>
<p>将nfs服务端的 <code v-pre>/data</code> 目录共享给 <code v-pre>172.16.1.0/24</code> 网段内的所有主机<br></p>
<ol>
<li>所有客户端主机都拥有读写权限</li>
<li>在将数据写入到NFS服务器的硬盘中后才会结束操作，最大限度保证数据不丢失</li>
<li>将所有用户映射为本地的匿名用户(nfsnobody)</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#NFS客户端地址与权限之间没有空格</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/exports</span>
/data
<span class="token number">172.16</span>.1.0/24<span class="token punctuation">(</span>rw, <span class="token function">sync</span> , all_ squash<span class="token punctuation">)</span>

<span class="token comment">#在NFS服务器上建立用于NFS文件共享的目录，并设置对应权限</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># mkdir /data</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># chown -R nfsnobody. nfsnobody /data</span>
<span class="token comment">#NFS共享目录会记录至/var/lib/nfs/etab,如果该目录不存在共享信息，请检查/etc/exports是否配置错误</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_3-4-安装rpc" tabindex="-1"><a class="header-anchor" href="#_3-4-安装rpc" aria-hidden="true">#</a> 3.4 安装RPC</h3>
<p>在使用NFS服务进行文件共享之前，需要使用RPC (Remote Procedure Call 远程过程调用服务
将NFS服务器的IP地址和端口号信息发送给客户端。因此，在启动NFS服务之前，需要先重启并.</p>
<br>
<p>启用rpcbind服务程序,同时都加入开机自启动</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#加入开机自启</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># systemctL enable rpcbind nfs -server</span>
<span class="token comment">#启动服务</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart rpcbind nfs-server</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h2 id="_4-nfs客户端挂载卸载" tabindex="-1"><a class="header-anchor" href="#_4-nfs客户端挂载卸载" aria-hidden="true">#</a> 4.NFS客户端挂载卸载</h2>
<h3 id="_4-1-查看远程共享目录" tabindex="-1"><a class="header-anchor" href="#_4-1-查看远程共享目录" aria-hidden="true">#</a> 4.1 查看远程共享目录</h3>
<p>NFS客户端的配置步骤也+分简单。先使用showmount命令，查询NFS服务器的远程共享信息，其输出格式为“<code v-pre>共享的目录名称允许使用客户端地址</code>”。</p>
<br>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#安装客户端工具，安装nfs-utils即可， 会自动启动rpcbind服务。</span>
<span class="token punctuation">[</span>root@nfs-client ~<span class="token punctuation">]</span><span class="token comment"># yum -y install nfs-utils</span>
<span class="token comment">#客户端使用showmount -e查看远程服务器rpc提供的可挂载nfs信息.</span>
<span class="token punctuation">[</span>root@nfs-client ~<span class="token punctuation">]</span><span class="token comment"># showmount -e 172.16.1.31</span>
Export list <span class="token keyword">for</span> <span class="token number">172.16</span>.1.31:
/data <span class="token number">172.16</span>.1.0/24
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_4-2-挂载远程共享目录" tabindex="-1"><a class="header-anchor" href="#_4-2-挂载远程共享目录" aria-hidden="true">#</a> 4.2 挂载远程共享目录</h3>
<p>在NFS客户端创建一个挂载目录,使用<code v-pre>mount</code>命令并结合<code v-pre>-t</code>参数,指定要挂载的文件系统的类型,并在命令后面写上服务器的IP地址,以及服务器上的共享目录,最后需要写上要挂载到本地系统(客户端)的目录。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@nfs-client ~<span class="token punctuation">]</span><span class="token comment"># mkdir /nfsdir</span>
<span class="token punctuation">[</span>root@nfs-client ~<span class="token punctuation">]</span><span class="token comment"># mount -t nfs 172. 16.1.31:/data /nfsdir</span>
<span class="token comment">#查看挂载信息(mount也可以查看)</span>
<span class="token punctuation">[</span>root@nfs-client ~<span class="token punctuation">]</span><span class="token comment"># df -h</span>
Filesystem   Size  Used Avail Use% Mounted on
/dev/sda3    62G   845M  58G   <span class="token number">2</span>%   
/tmpfs       244M   <span class="token number">0</span>    244M  <span class="token number">0</span>%  /dev/shm
/dev/sda1    190M  26M   155M  <span class="token number">14</span>% /boot
<span class="token number">172</span>. <span class="token number">16.1</span>.31:/data 62G  880M  58G  <span class="token number">2</span>% /nfsdir

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_4-3-客户端远程共享目录操作" tabindex="-1"><a class="header-anchor" href="#_4-3-客户端远程共享目录操作" aria-hidden="true">#</a> 4.3 客户端远程共享目录操作</h3>
<p>挂载成功后可以进行增删改操作</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#使用客户端往nfs存储写入</span>
<span class="token punctuation">[</span>root@nfs-client ~<span class="token punctuation">]</span><span class="token comment"># echo "nfs-client" >> /mnt/test. txt</span>


<span class="token comment">#检查nfs服务端是否存在客户端创建的新文件</span>
<span class="token punctuation">[</span>root@nfs-client ~<span class="token punctuation">]</span><span class="token comment"># cat /data/test. txt</span>
nfs-client

<span class="token comment">#如果希望NFS文件共享服务能一直有效，则需要将其写入到fstab文件中</span>
<span class="token punctuation">[</span>root@nfs-client ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/fstab</span>
<span class="token number">172.16</span>.1.31: /data /nfsdir nfs defaults <span class="token number">0</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_4-4-客户端卸载" tabindex="-1"><a class="header-anchor" href="#_4-4-客户端卸载" aria-hidden="true">#</a> 4.4 客户端卸载</h3>
<p>如果不希望使用NFS共享,可进行卸载</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">umount</span> /nfsdir
<span class="token comment">#注意:卸载的时候如果提示”umount. nfs: /nfsdir: device is busy”</span>
<span class="token comment">#切换至其他目录，然后在进行卸载。</span>

<span class="token comment">#NFS Server宕机，强制卸载</span>
<span class="token function">umount</span> <span class="token parameter variable">-lf</span> /nfsdir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_4-5-客户端安全参数" tabindex="-1"><a class="header-anchor" href="#_4-5-客户端安全参数" aria-hidden="true">#</a> 4.5 客户端安全参数</h3>
<p>在企业工作场景，通常情况NFS服务器共享的只是普通静态数据(图片、附件、视频)，不需
要执行suid、exec 等权限，挂载的这个文件系统只能作为数据存取之用，无法执行程序，对于
客户端来讲增加了安全性。</p>
<br>
<p>例如:很多木马篡改站点文件都是由上传入口上传的程序到存储目录。然后执行的。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#通过mount -o指定挂载参数，禁止使用suid, exec, 增加安全性能</span>
<span class="token punctuation">[</span>root@nfs-client ~<span class="token punctuation">]</span><span class="token comment"># mount -t nfs -。 nosuid, noexec, nodev 172. 16. 1.31:/data /mnt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>有时也需要考虑性能相关参数[可选]</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>
<span class="token comment">#通过mount -o指定挂载参数，禁止更新目录及文件时间戳挂载</span>
<span class="token punctuation">[</span>root@nfs-client ~<span class="token punctuation">]</span><span class="token comment"># mount -t nfs -0 noatime, nodiratime 172. 16.1.31:/data /mnt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h2 id="_5-nfs配置详解" tabindex="-1"><a class="header-anchor" href="#_5-nfs配置详解" aria-hidden="true">#</a> 5.NFS配置详解</h2>
<table>
<thead>
<tr>
<th>nfs共享参数</th>
<th>参数作用</th>
</tr>
</thead>
<tbody>
<tr>
<td>rw*</td>
<td>读写权限</td>
</tr>
<tr>
<td>ro</td>
<td>只读权限</td>
</tr>
<tr>
<td>root_ squash</td>
<td>当NFS客户端以root管理员访问时，映射为NFS服务器的匿名用户(不常用)</td>
</tr>
<tr>
<td>no_ root_ squash</td>
<td>当NFS客户端以root管理员访问时，映射为NFS服务器的root管理员(不常用)</td>
</tr>
<tr>
<td>all squash</td>
<td>无论NFS客户端使用什么账户访问，均映射为NFS服务器的匿名用户(常用)</td>
</tr>
<tr>
<td>no_ all squash</td>
<td>无论NFS客户端使用什么账户访问，都不进行压缩</td>
</tr>
<tr>
<td>sync*</td>
<td>同时将数据写入到内存与硬盘中，保证不丢失数据</td>
</tr>
<tr>
<td>async</td>
<td>优先将数据保存到内存，然后再写入硬盘; 这样效率更高，但可能会丢失数据</td>
</tr>
<tr>
<td>anonuid*</td>
<td>配置all_ squash使用,指定NFS的用户UID,必须存在系统</td>
</tr>
<tr>
<td>anongid*</td>
<td>配置all_ squash使用，指定NFS的用户UID,必须存在系统</td>
</tr>
</tbody>
</table>
<br>
<h2 id="_6-nfs权限实践" tabindex="-1"><a class="header-anchor" href="#_6-nfs权限实践" aria-hidden="true">#</a> 6.NFS权限实践</h2>
<h3 id="_6-1-验证ro权限实践" tabindex="-1"><a class="header-anchor" href="#_6-1-验证ro权限实践" aria-hidden="true">#</a> 6.1 验证ro权限实践</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>
<span class="token comment">#服务端修改rw为ro参数</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/exports</span>
/data <span class="token number">172.16</span>.1. <span class="token number">0</span>/24<span class="token punctuation">(</span>ro, <span class="token function">sync</span> ,all_ squash<span class="token punctuation">)</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart nfs -server</span>


<span class="token comment">#客户端验证</span>
<span class="token punctuation">[</span>root@nfs-client ~<span class="token punctuation">]</span><span class="token comment"># mount -t nfs 172. 16.1.31:/data /mnt</span>
<span class="token punctuation">[</span>root@nfs-client ~<span class="token punctuation">]</span><span class="token comment"># df -h</span>
Filesystem
Size
Used Avail Use% Mounted on
<span class="token number">172.16</span>.1.31: /data 98G  <span class="token number">1</span>.7G 97G  <span class="token number">2</span>% /mnt

<span class="token comment">#发现无法正常写入文件</span>
<span class="token punctuation">[</span>root@backup mnt<span class="token punctuation">]</span><span class="token comment"># touch file</span>
touch: cannot <span class="token function">touch</span> <span class="token string">'file'</span> <span class="token builtin class-name">:</span> Read-only <span class="token function">file</span> system

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-验证all-squash、anonuid、-anongid权限" tabindex="-1"><a class="header-anchor" href="#_6-2-验证all-squash、anonuid、-anongid权限" aria-hidden="true">#</a> 6.2 验证all squash、anonuid、 anongid权限</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#NFS服务端配置</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/exports</span>
/data <span class="token number">172.16</span>.1.0/24<span class="token punctuation">(</span>rw,sync,all_squash,anonuid<span class="token operator">=</span><span class="token number">666</span>,anongid<span class="token operator">=</span><span class="token number">666</span><span class="token punctuation">)</span>

<span class="token comment">#服务端需要创建对应的用户</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># groupadd -g 666 ww</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># useradd -u 666 -g 666 www</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># id www</span>
<span class="token assign-left variable">uid</span><span class="token operator">=</span><span class="token number">666</span><span class="token punctuation">(</span>www<span class="token punctuation">)</span> <span class="token assign-left variable">gid</span><span class="token operator">=</span><span class="token number">666</span><span class="token punctuation">(</span>www<span class="token punctuation">)</span> <span class="token assign-left variable">groups</span><span class="token operator">=</span><span class="token number">666</span><span class="token punctuation">(</span>www<span class="token punctuation">)</span>

<span class="token comment">#重载nfs-server</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart nfs -server</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># cat /var/lib/nfs/etab</span>
/data    <span class="token number">172.16</span>.1.0/ <span class="token number">24</span><span class="token punctuation">(</span>rw, sync,wdelay,hide,nocrossmnt,secure,root_squash,all_squash,
no_subtree_check,secure_locks,acl,no_ pnfs,anonuid<span class="token operator">=</span><span class="token number">666</span>,anongid<span class="token operator">=</span><span class="token number">666</span>,sec<span class="token operator">=</span>sys,secure,ro 
ot_squash,all_squash<span class="token punctuation">)</span>


<span class="token comment">#授权共享目录为www</span>
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># chown -R www. www</span>
/data/
<span class="token punctuation">[</span>root@nfs ~<span class="token punctuation">]</span><span class="token comment"># ll -d /data/</span>
drwxr-xr-x <span class="token number">3</span> wwW WWW <span class="token number">53</span> Sep <span class="token number">3</span> 02:08 /data/

<span class="token comment">#客户端验证</span>
<span class="token punctuation">[</span>root@backup ~<span class="token punctuation">]</span><span class="token comment"># umount /mnt/</span>
<span class="token punctuation">[</span>root@backup ~<span class="token punctuation">]</span><span class="token comment"># mount -t nfs 172. 16.1.31:/data /mnt</span>

<span class="token comment">#客户端查看到的文件，身份是666</span>
<span class="token punctuation">[</span>root@backup ~<span class="token punctuation">]</span><span class="token comment"># Ll /mnt/</span>
drwxr-xr-x <span class="token number">2</span> <span class="token number">666</span> <span class="token number">666</span> <span class="token number">6</span> Sep3 02:08 rsync_ dir-rw-r--r-- <span class="token number">1</span> <span class="token number">666</span> <span class="token number">666</span> <span class="token number">0</span> Sep <span class="token number">3</span> 02:08 rsync_ <span class="token function">file</span>
<span class="token comment">#客户端依旧能往/mnt目录下写文件</span>
<span class="token punctuation">[</span>root@backup mnt<span class="token punctuation">]</span><span class="token comment"># touch fff</span>
<span class="token punctuation">[</span>root@backup mnt<span class="token punctuation">]</span><span class="token comment"># mkdir 111</span>
<span class="token punctuation">[</span>root@backup mnt<span class="token punctuation">]</span><span class="token comment"># ll</span>
drwxr-xr-x <span class="token number">2</span> <span class="token number">666</span> <span class="token number">666</span> <span class="token number">6</span> Sep3 03:05 <span class="token number">111</span> 
-rw-r--r-- <span class="token number">1</span> <span class="token number">666</span> <span class="token number">666</span> <span class="token number">0</span> Sep3 03:05 fff
<span class="token comment">#建议:将客户端也创建一个uid为666, gid为666， 统一身份,避免后续出现权限不足的情况</span>
<span class="token punctuation">[</span>root@backup mnt<span class="token punctuation">]</span><span class="token comment"># groupadd -g 666 Www</span>
<span class="token punctuation">[</span>root@backup mnt<span class="token punctuation">]</span><span class="token comment"># useradd -g 666 -u 666 Www</span>
<span class="token punctuation">[</span>root@backup mnt<span class="token punctuation">]</span><span class="token comment"># id www</span>
<span class="token assign-left variable">uid</span><span class="token operator">=</span><span class="token number">666</span><span class="token punctuation">(</span>www<span class="token punctuation">)</span> <span class="token assign-left variable">gid</span><span class="token operator">=</span><span class="token number">666</span><span class="token punctuation">(</span>www<span class="token punctuation">)</span> <span class="token assign-left variable">groups</span><span class="token operator">=</span><span class="token number">666</span><span class="token punctuation">(</span> www<span class="token punctuation">)</span>

<span class="token comment">#最后检查文件的身份</span>
<span class="token punctuation">[</span>root@backup mnt<span class="token punctuation">]</span><span class="token comment"># ll /mnt/</span>
total <span class="token number">4</span>
drwxr-xr-x <span class="token number">2</span> wwW WWW <span class="token number">6</span> Sep <span class="token number">3</span> 03:05 <span class="token number">111</span>
-rw-r--r-- <span class="token number">1</span> WwW wwW <span class="token number">0</span> Sep <span class="token number">3</span> 03:05 fff

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h2 id="_7-nfs存储总结" tabindex="-1"><a class="header-anchor" href="#_7-nfs存储总结" aria-hidden="true">#</a> 7.NFS存储总结</h2>
<ol>
<li>NFS存储优点</li>
</ol>
<ul>
<li>NFS简单易用、方便部署数据可靠、服务稳定、满足中小企业需求。</li>
<li>NFS的数据都在文件系统之上，所有数据都是能看得见。</li>
</ul>
<ol start="2">
<li>NFS存储局限</li>
</ol>
<ul>
<li>存在单点故障,如果构建高可用维护麻烦web- &gt;nfs( )- &gt;backup</li>
<li>NFS数据都是明文，并不对数据 做任何校验，也没有密码验证(强烈建议内网使用)。</li>
</ul>
<ol start="3">
<li>NFS应用建议</li>
</ol>
<ul>
<li>生产场景应将静态数据(ipg\png\mp4\av\cssjs)尽可能放置CDN场景进行环境以此来减少后端存储压力</li>
<li>如果没有缓存或架构、代码等,本身历史遗留问题太大，在多存储也没意义</li>
</ul>
</div></template>



<style>
table th:first-of-type {
    width:33%;
}

table th:nth-of-type(2) {
    width:33%;
}
table th:nth-of-type(3){
    width:33%
}
</style>