<template><div><p><strong>Ceph使用cephx协议对客户端进行身份认证</strong><br />cephx用于对ceph保存的数据进行认证访问和授权，用于对访问ceph的请求进行认证和授权检测，与mon通信的请求都要经过ceph认证通过，但是也可以在mon节点关闭cephx认证，但是关闭认证之后任何访问都将被允许，因此无法保证数据的安全性,</p>
<h3 id="_5-1-授权流程" tabindex="-1"><a class="header-anchor" href="#_5-1-授权流程" aria-hidden="true">#</a> 5.1 授权流程</h3>
<p>每个mon节点都可以对客户端进行身份认证并分发秘钥，因此多个mon节点就不存在单点故障和认证性能瓶颈。<br />mon节点会返回用于身份认证的数据结构，其中包含获取ceph服务时用到的<strong>session key</strong>,<br /><strong>session key</strong>通过客户端秘钥进行加密，秘钥是在客户端提前配置好的，<br /><code v-pre>/etc/ceph/ceph.client.admin.keyring</code></p>
<p>客户端使用<strong>session key</strong>向mon请求所需要的服务，mon 向客户端提供一个tiket, 用于向实际处理数据的OSD等服务验证客户端身份，MON和OSD共享同一个secret,因此OSD会信任所有MON发放的tiket<br />tiket存在有效期</p>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>注意:<br />CephX身份验证功能仅限制在Ceph的各组件之间，不能扩展到其他非ceph组件<br />Ceph 只负责认证授权，不能解决数据传输的加密问题</p>
</div>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1669880681089-7d7ac090-141d-4258-9cd2-362cff88d9ac.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="_5-2-访问流程" tabindex="-1"><a class="header-anchor" href="#_5-2-访问流程" aria-hidden="true">#</a> 5.2 访问流程</h2>
<p>无论ceph客户端是哪种类型，例如块设备、对象存储、文件系统，ceph 都会在存储池中将所有数据存储为对象: <br /><strong>ceph用户需要拥有存储池访问权限，才能读取和写入数据</strong><br /><strong>ceph用户必须拥有执行权限才能使用ceph的管理命令</strong></p>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1669887090529-269fdedb-ce5f-4e1e-b436-7ec9eb8a9ccf.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<figure><img src="http://cdn1.ryanxin.live/xxlog/1669887247816-2873ce26-50ff-4f30-a6e0-50011624a5e9.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>查看key</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>cephaceph-dep Loy:~/ ceph-cluster$ <span class="token function">cat</span> ceph. C lient <span class="token builtin class-name">.</span> admin. key ring
<span class="token punctuation">[</span>client. admin<span class="token punctuation">]</span>
         key <span class="token operator">=</span> AQA3dhdhMd/UABAAr 2SNpJ+hcK1dD5 L2Hj <span class="token assign-left variable">5XMg</span><span class="token operator">==</span>
         caps mds <span class="token operator">=</span> <span class="token string">"allow *"</span>
         caps mgr <span class="token operator">=</span> <span class="token string">"allow *"</span>
         caps mon <span class="token operator">=</span> <span class="token string">"allow *"</span>
         caps osd <span class="token operator">=</span> <span class="token string">"allow *"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-3-ceph用户" tabindex="-1"><a class="header-anchor" href="#_5-3-ceph用户" aria-hidden="true">#</a> 5.3 ceph用户</h2>
<p>用户是指个人(ceph管理者)或系统参与者**(MON/OSD/MDS)**.<br />通过创建用户，可以控制用户或哪个参与者能够访问ceph存储集群、以及可访问的存储池及存储池中的数据。<br />ceph支持多种类型的用户，但可管理的用户都属于client类型区分用户类型的原因在于, <strong>MON/OSD/MDS 等系统组件特使用cephx协议</strong>,但是它们为非客户端。</p>
<p>通过点号来分割用户类型和用户名，格式为<strong><a href="http://TYPE.ID" target="_blank" rel="noopener noreferrer">TYPE.ID<ExternalLinkIcon/></a></strong>,例如<strong>client. admin</strong>   通常容器和服务器使用client类型</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>cephaceph-dep Loy:~/ ceph-cluster$ <span class="token function">cat</span> ceph.Client.admin.key ring
<span class="token punctuation">[</span>client.admin<span class="token punctuation">]</span>
         key <span class="token operator">=</span> AQA3dhdhMd/UABAAr 2SNpJ+hcK1dD5 L2Hj <span class="token assign-left variable">5XMg</span><span class="token operator">==</span>
         caps mds <span class="token operator">=</span> <span class="token string">"allow *"</span>
         caps mgr <span class="token operator">=</span> <span class="token string">"allow *"</span>
         caps mon <span class="token operator">=</span> <span class="token string">"allow *"</span>
         caps osd <span class="token operator">=</span> <span class="token string">"allow *"</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-1-列出指定用户信息" tabindex="-1"><a class="header-anchor" href="#_5-3-1-列出指定用户信息" aria-hidden="true">#</a> 5.3.1 列出指定用户信息:<br /><br /></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth get osd.10
exported keyring <span class="token keyword">for</span> osd.10
<span class="token punctuation">[</span>osd.10<span class="token punctuation">]</span>
key <span class="token operator">=</span> AQCKF6JfL aEpBRAAbY/P +cHPFPUtnkzljruyXw<span class="token operator">==</span>
caps mgr <span class="token operator">=</span> <span class="token string">"allow profile osd"</span>
caps mon <span class="token operator">=</span> <span class="token string">"allow profile osd"</span>
caps osd <span class="token operator">=</span> <span class="token string">"allow



[ceph@ceph-deploy ceph-cluter$ ceph auth get client.admin
exported keyring for client.admin
[client.admin]
          key = AQAGDKJfQk/dAxAA3Y +9xoE/p8in6QjoHeXmeg==
          caps mds = "</span>allow *<span class="token string">"
          caps mgr = "</span>allow *<span class="token string">"
          caps mon = "</span>allow *<span class="token string">"
          caps osd = "</span>allow *"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-4-ceph授权和使能" tabindex="-1"><a class="header-anchor" href="#_5-4-ceph授权和使能" aria-hidden="true">#</a> 5.4 ceph授权和使能</h2>
<p><strong>ceph基于使能/能力(Capabilities,简称caps )<strong>来描述用户可针对</strong>MON/OSD或MDS</strong>使用的授权范围或级别，<br />通用的语法格式: <code v-pre>daemon-type 'allow caps' [...]</code></p>
<p><strong>能力一览表:</strong></p>
<p><code v-pre>r</code>: 向用户授子读取权限，访问监视器(mon)以检索CRUSH运行图时需具有此能力。<br /><code v-pre>W</code>: 向用户授子针对对象的写人权限。<br /><code v-pre>x</code>: 授予用户调用类方法(包括读取和写人)的能力，以及在监视器中执行auth操作的能力。<br /><code v-pre>*</code>:  授予用户对特定守护进程/存储池的读取、写入和执行权限，以及执行管理命令的能力</p>
<p><code v-pre>class-read</code>:授子用户调用类读取方法的能力，属于是x 能力的子集.<br /><code v-pre>class-write</code>:授子用户调用类写人方法的能力，属于是x 能力的子集。</p>
<p>集群组件权限<br /><code v-pre>profile osd</code>: 授予用户以某个OSD身份连接到其他OSD或监视器的权限.授予OSD权限，使OSD 能够处理复制检测信号流量和状态报告(获取OSD的状态信息).<br /><code v-pre>profile mds</code>: 授予用户以某个MDS身份连接到其他MDS或监视器的权限。<br /><code v-pre>profile bootstrap-osd</code>: 授予用户引导OSD的权限(初始化OSD并将OSD加人ceph集群)，授权给部署工具，使其在引导OSD时有权添加密钥。<br /><code v-pre>profile bootstrap-mds</code>: 授子用户引导元数据服务器的权限，授权部署工具权限，使其在引导元数据服务器时有权添加密钥.</p>
<p><strong>MON能力:</strong><br />包括r/w/x和allow profile cap(ceph的运行图)<br />例如:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mon <span class="token string">'allow rwx'</span>
mon <span class="token string">'allow profile osd'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>OSD能力:</strong><br />包括r、w、 x、class-read、 class-write(类读取) 和profile osd(类写入)，另外OSD能力还允许进行存储池和名称空间设置。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>osd <span class="token string">'llow capability'</span> <span class="token punctuation">[</span>pool<span class="token operator">=</span>poolname<span class="token punctuation">]</span> <span class="token punctuation">[</span>namespace <span class="token operator">=</span>namespace-name<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>MDS能力:</strong><br />只需要allow 或空都表示允许.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mds <span class="token string">'allow'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-5-ceph用户管理" tabindex="-1"><a class="header-anchor" href="#_5-5-ceph用户管理" aria-hidden="true">#</a> 5.5 ceph用户管理</h2>
<p><br />用户管理功能可让 Ceph集群管理员能够直接在 Ceph集群中创建更新和删除用户。<br />在Ceph集群中创建或删除用户时，可能需要将密钥分发到客户端，以便将密钥添加到密钥环文件中<code v-pre>/etc/ceph/ceph.client.admin.keyring</code>，此文件中可以包含一个或 者多个用户认证信息，凡是拥有此文件的节点，将具备访问ceph的权限，而且可以使用其中任何一个账户的权限，此文件类似于linux系统的中的**/etc/passwd**文件.</p>
<blockquote>
<p>注意: TYPEID 表示法针对用户采用<strong><a href="http://TYPE.ID" target="_blank" rel="noopener noreferrer">TYPE.ID<ExternalLinkIcon/></a></strong>表示法
例如osd.0指定是osd类并且ID为0的用户(节点),
client.admin是client类型的用户，其ID为admin,
另请注意，每个项包含一个 key=xxx项，以及一个或多个caps项。
可以结合使用-0文件名选项和ceph auth list 将输出保存到某个文件,
[ceph@ceph-deploy ceph-cluster]$ ceph auth list -o 123.key</p>
</blockquote>
<p>添加一个用户会创建用户名(<strong><a href="http://TYPE.ID" target="_blank" rel="noopener noreferrer">TYPE.ID<ExternalLinkIcon/></a></strong>). 机密密钥，以及包含在命令中用于创建该用户的所有能力,用户可使用其密钥向Ceph 存储集群进行身份验证。<br />用户的能力授予该用户在<strong>Ceph monitor (mon)</strong>、<strong>Ceph OSD (osd)<strong>或</strong>Ceph元数据服务器(mds)</strong> 上进行读取、写入或执行的能力,可以使用以下几个命令来添加用户:</p>
<h3 id="_5-5-1-ceph-auth-add" tabindex="-1"><a class="header-anchor" href="#_5-5-1-ceph-auth-add" aria-hidden="true">#</a> 5.5.1 ceph auth add</h3>
<p>此命令是添加用户的规范方法。它会创建用户、生成密钥，并添加所有指定的能力。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth <span class="token parameter variable">-h</span>
auth <span class="token function">add</span> <span class="token operator">&lt;</span>entity<span class="token operator">></span> <span class="token punctuation">{</span><span class="token operator">&lt;</span>caps<span class="token operator">></span><span class="token punctuation">[</span><span class="token operator">&lt;</span>caps<span class="token operator">></span><span class="token punctuation">..</span>.<span class="token punctuation">]</span><span class="token punctuation">}</span>

<span class="token comment">#添加认证key: </span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth <span class="token function">add</span> client.tom mon <span class="token string">'allow r'</span> osd <span class="token string">'allow rwx pool=mypool'</span>
added key <span class="token keyword">for</span> client.tom

<span class="token comment">#tom用户只能在mypool存储池对mon有读权限、对osd有读写执行权限</span>

<span class="token comment">#验证key</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth get client.tom
exported keyring <span class="token keyword">for</span> client.tom
<span class="token punctuation">[</span>client.tom<span class="token punctuation">]</span>
key <span class="token operator">=</span> AQCErsdftuumL BAADUiAfQUI42ZIX1e/4PjpdA<span class="token operator">==</span>
  caps mon <span class="token operator">=</span> <span class="token string">"allow r"</span>
  caps osd <span class="token operator">=</span> <span class="token string">"allow rwx  pool=mypool"</span>
  exported keyring <span class="token keyword">for</span> client.tom
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-2-ceph-auth-get-or-create" tabindex="-1"><a class="header-anchor" href="#_5-5-2-ceph-auth-get-or-create" aria-hidden="true">#</a> 5.5.2 ceph auth get-or-create</h3>
<p><code v-pre>ceph auth get-or-create</code>此命令是创建用户较为常见的方式之一, 它会返回包含用户名(在方括号中)和密钥的密钥文，如果该用户已存在，此命令只以密钥文件格式返回用户名和密钥，还可以使用 -o 指定文件名选项将输出保存到某个文件。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#创建用户</span>

<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth get-or-create client,jack mon <span class="token string">'allow r osd '</span>allow rwx <span class="token assign-left variable">pool</span><span class="token operator">=</span>mypool<span class="token string">'
[client.jack]
     key = AQAtr8dfi37XMhAADbHWEZOshY1QZ5A8eBpeoQ==

#验证用户

[ceph@ceph-deploy ceph-clusterI$ ceph auth get client.jack
exported keyring for cliet,jack
[client.jack]
     key = AQAtr8dfi37XMhAADbHWEZOshY1QZ5A8eBpeoQ==
     caps mon="allow r"
     caps osd ="allow rwx  pool=mypool"

#再次创建就不会创建了会打印key信息

 [ceph@ceph-deploy ceph-cluster]$ ceph auth get-or-create client.jack mon '</span>allow r
osd 'allow rwx <span class="token assign-left variable">pool</span><span class="token operator">=</span>mypool
<span class="token punctuation">[</span>client.jack<span class="token punctuation">]</span>
     key <span class="token operator">=</span> <span class="token assign-left variable">AQAtr8dfiI37XMhAADbHWEZ0shY1QZ5A8eBpeoQ</span><span class="token operator">==</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-3-ceph-auth-get-or-create-key" tabindex="-1"><a class="header-anchor" href="#_5-5-3-ceph-auth-get-or-create-key" aria-hidden="true">#</a> 5.5.3 ceph auth get-or-create-key</h3>
<p>此命令是创建用户并仅返回用户密钥，对于只需要密钥的客户端(例如libvirt) ，此命令非常有用。<br />如果该用户已存在，此命令只返回密钥。您可以使用-o文件名选项将输出保存到某个文件。</p>
<p>创建客户端用户时，可以创建不具有能力的用户.不具有能力的用户可以进行身份验证，但不能执行其他操作，此类客户端无法从监视器检索集群地图,但是,如果希望稍后再添加能力，可以使用<code v-pre>ceph auth caps</code>命令创建一个不具有能力的用户。<br />典型的用户至少对Ceph monitor具有读取功能，并对Ceph OSD具有读取和写人功能.此外，用户的OSD 权限通常限制为只能访问特定的存储池。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth get-or-create-key client.jack mon <span class="token string">'allow r'</span> osd <span class="token string">'allow rwx pool=mypool'</span>
<span class="token assign-left variable">AQAtr8dfi37XMhAADbHWEZ0shY1QZ5A8eBpeoQ</span><span class="token operator">==</span> <span class="token comment">#用户有key就显示没有就创建</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-4-ceph-auth-print-key" tabindex="-1"><a class="header-anchor" href="#_5-5-4-ceph-auth-print-key" aria-hidden="true">#</a> 5.5.4  ceph auth print-key</h3>
<p>只获取单个指定用户的key信息</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster$ ceph auth print-key client.jack
AQAtr8dfi37XMhAADbHWEZ0shY <span class="token assign-left variable">1QZ5A8eBpeoQ</span><span class="token operator">==</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-5-修改用户能力" tabindex="-1"><a class="header-anchor" href="#_5-5-5-修改用户能力" aria-hidden="true">#</a> 5.5.5 修改用户能力</h3>
<p>使用<code v-pre>ceph auth caps</code>命令可以指定用户以及更改该用户的能力，设置新能力会完全覆盖当前的能力，因此要加上之前的用户已经拥有的能和新的能力，如果看当前能力，可以运行<code v-pre>ceph auth get USERTYPE.USERID</code>,如果要添加能力，使用以下格式时还需要指定现有能力:</p>
<p><strong>权限修改后立即生效</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#查看用户当前权限</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth get client.jack
exported keyring <span class="token keyword">for</span> client.jack
<span class="token punctuation">[</span>client.jack<span class="token punctuation">]</span>
     key <span class="token operator">=</span> <span class="token assign-left variable">AQAtr8dfi37XMhAADbHWEZ0shY1QZ5A8eBpeoQ</span><span class="token operator">==</span>
     caps mon <span class="token operator">=</span> <span class="token string">"allow r"</span>
     caps osd <span class="token operator">=</span> <span class="token string">"allw rwx pool=mypool"</span>


<span class="token comment">#修改用户权限</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth caps client.jack mon <span class="token string">'allow r'</span> osd <span class="token string">'allow rw pool=mypool'</span>
updated caps <span class="token keyword">for</span> client.jack
<span class="token comment">#再次验证权限</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth get client.jack
exported keyring <span class="token keyword">for</span> client.jack

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-6-删除用户" tabindex="-1"><a class="header-anchor" href="#_5-5-6-删除用户" aria-hidden="true">#</a> 5.5.6 删除用户</h3>
<p>要删除用户使用<code v-pre>ceph auth del TYPE.ID</code>,其中TYPE是client. osd. mon 或mds之一,<br />ID是用户名或守护进程的ID.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth del client.tom
updated
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-6-秘钥环管理" tabindex="-1"><a class="header-anchor" href="#_5-6-秘钥环管理" aria-hidden="true">#</a> 5.6 秘钥环管理</h2>
<p>ceph的秘钥环是一个保存了<strong>secrets、keys 、certificates</strong>并且能够让客户端通认证访问ceph<br />的<strong>keyring file</strong>(集合文件），一个<strong>keyring file</strong>可以保存一个或者多个认证信息，每一个 key都<br />有一个实体名称加权限，类型为:<br /><code v-pre>{client、mon、mds、osd)}.name</code></p>
<p><strong>当客户端访问ceph集群时，ceph 会按顺序依次使用以下四个密钥环文件预设置密钥环设置:</strong><br /><strong>集群名词 + 用户类型 +用户ID+固定后缀</strong><br /><code v-pre>/etc/ceph/&lt;$cluster name&gt;.&lt;user $type&gt;.&lt;user $id&gt;.keyring</code> 保存单个用户的keyring<br /><code v-pre>/etc/ceph/cluster.keyring</code> 保存多个用户的keyring<br /><code v-pre>/etc/ceph/keyring</code> 未定义集群名称的多个用户的keyring<br /><code v-pre>/etc/ceph/keyring.bin</code>  编译后的二进制文件</p>
<h3 id="_5-6-1-通过秘钥环文件备份与恢复用户" tabindex="-1"><a class="header-anchor" href="#_5-6-1-通过秘钥环文件备份与恢复用户" aria-hidden="true">#</a> 5.6.1 通过秘钥环文件备份与恢复用户</h3>
<p>如果误删除账号可以通过秘钥环恢复用户，<strong>主要是key不会变（k8s 几十几百个pod）</strong><br />使用<code v-pre>ceph auth add</code>等命令添加的用户还需要额外使用<code v-pre>ceph-authtool</code>命令为其创建用户秘<br />钥环文件.<br />先创建空 keyring文件命令格式:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ceph-authtool --create-keyring FILE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>导出用户认证信息至keyring文件:</strong><br />将用户信息导出至keyring文件，对用户信息进行备份。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#创建用户:</span>
<span class="token punctuation">(</span>ceph@ceph-deploy ceph cluster<span class="token punctuation">]</span>$ ceph auth get-or-create client.user1 mon <span class="token string">'allow r'</span> osd <span class="token string">'allow *pool=mypool'</span>
<span class="token punctuation">[</span>client.user1<span class="token punctuation">]</span>
          key <span class="token operator">=</span>AQAUUchfjpMqGRAARV6h0ofdDEneuaRnxuHjoQ<span class="token operator">==</span>

<span class="token comment">#验证用户</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-clusterl$ ceph auth get client.user1
exported keyring <span class="token keyword">for</span> client.user1
<span class="token punctuation">[</span>client.user1<span class="token punctuation">]</span>
          key <span class="token operator">=</span> <span class="token assign-left variable">AQAUUchfjpMqGRAARV6hOofdDEneuaRnxuHjoQ</span><span class="token operator">==</span>
          caps mon <span class="token operator">=</span> <span class="token string">"allow r"</span>
          caps osd <span class="token operator">=</span> <span class="token string">"allow *pool=mypool"</span>

<span class="token comment">#创建keyring文件:</span>
<span class="token punctuation">(</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph-authtool --create-keyring ceph.client.user1.keyring


<span class="token comment">#验证keyring文件:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ <span class="token function">cat</span> ceph.client.user1.keyring
<span class="token comment">#是个空文件</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ <span class="token function">file</span> ceph.client.user1.keyring
ceph.client.user1.keyring: empty

<span class="token comment">#导出keyring至指定文件</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span><span class="token variable">$ceph</span> auth get client.user1 <span class="token parameter variable">-o</span> ceph.client.user1.keyring
exported keyring <span class="token keyword">for</span> client.user1

<span class="token comment">#验证指定用户的keyring文件:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ <span class="token function">cat</span> ceph.client.user1.keyring
<span class="token punctuation">[</span>client.user1<span class="token punctuation">]</span>
     key <span class="token operator">=</span> <span class="token assign-left variable">AQAUUchfjpMqGRAARV6hOofdDEneuaRnxuHjoQ</span><span class="token operator">==</span>
     caps mon <span class="token operator">=</span> <span class="token string">"allow r"</span>
     caps osd <span class="token operator">=</span> <span class="token string">"allow * pool=mypool"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在创建包含单个用户的密钥环时，通常建议使用ceph集群名称、用户类型和用户名及<br />keyring来命名，并将其保存在**/etc/ceph** 目录中，例如为<strong>client.user1</strong>用户创建<br /><strong>ceph.client.user1.keyring</strong></p>
<h3 id="_5-6-2-从keyring文件恢复用户认证信息" tabindex="-1"><a class="header-anchor" href="#_5-6-2-从keyring文件恢复用户认证信息" aria-hidden="true">#</a> 5.6.2 从keyring文件恢复用户认证信息</h3>
<p>可以使用<strong>ceph auth import +指定keyring文件</strong>并导人到ceph,其实就是起到用户备份和恢复的目的:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph auth <span class="token function">import</span> <span class="token parameter variable">-i</span> ceph.client.user1.keyring
<span class="token comment">#导入用户</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-6-3-秘钥环文件添加多用户" tabindex="-1"><a class="header-anchor" href="#_5-6-3-秘钥环文件添加多用户" aria-hidden="true">#</a> 5.6.3 秘钥环文件添加多用户</h3>
<p>一个keyring文件中可以包含多个不同用户的认证文件。<br /><strong>将多用户导出至秘钥环:</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#创建keyring文件:</span>
$ ceph-authtool --create-keyring ceph.client.user.keyring <span class="token comment">#创建空的keyring文件</span>
creating ceph.client.user.keyring

<span class="token comment">#把指定的admin用户的keyring文件内容导人到user用户的keyring文件:</span>
<span class="token variable">$ceph</span>-authtool ./ceph.client.user.keyring --import-keyring ./ceph.client.admin.keyring
importing contents of ./ceph.client.admin.keyring into ./ceph.client.user.keyring

<span class="token comment">#验证keyring文件:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph-authtool <span class="token parameter variable">-I</span> ./ceph.client.user.keyring
<span class="token punctuation">[</span>client.admin<span class="token punctuation">]</span>
    key <span class="token operator">=</span> AQAGDKJfQk/dAxAA3Y +9xoE/p8in6QjoHeXmeg<span class="token operator">==</span>
    caps mds <span class="token operator">=</span> <span class="token string">"allow *"</span>
    caps mgr <span class="token operator">=</span> <span class="token string">"allow *"</span>
    caps mon <span class="token operator">=</span> <span class="token string">"allow *"</span>
    caps osd <span class="token operator">=</span> <span class="token string">"allow *"</span>

<span class="token comment">#再导入一个其他用户的keyring:</span>
<span class="token punctuation">(</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span><span class="token variable">$ceph</span>-authtool ./ceph.client.user.keyring --import-kevring ./ceph.client.user1.kevring


<span class="token comment">#再次验证keyring文件是否包含多个用户的认证信息:</span>
<span class="token punctuation">[</span>ceph@ceph-deploy ceph-cluster<span class="token punctuation">]</span>$ ceph- authtool <span class="token parameter variable">-I</span> ./ceph.client.user.keyring
<span class="token punctuation">[</span>client.admin<span class="token punctuation">]</span>
     key <span class="token operator">=</span> AQAGDKJfQk/dAxAA3Y +9xoE/p8in6QjoHeXmeg<span class="token operator">==</span>
     caps mds <span class="token operator">=</span> <span class="token string">"allow *"</span>
     caps mgr <span class="token operator">=</span> <span class="token string">"allow *"</span>
     caps mon <span class="token operator">=</span> <span class="token string">"allow *"</span>
     caps osd <span class="token operator">=</span> <span class="token string">"allow *"</span>
<span class="token punctuation">[</span>client.user1<span class="token punctuation">]</span>
key <span class="token operator">=</span> <span class="token assign-left variable">AQAUUchfjpMqGRAARV6h0ofdDEneuaRnxuHjoQ</span><span class="token operator">==</span>
     caps mon <span class="token operator">=</span> <span class="token string">"allow r"</span>
     caps osd <span class="token operator">=</span> <span class="token string">"allow * pool=mypool"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


