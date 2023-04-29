<template><div><h1 id="mha-高可用部署" tabindex="-1"><a class="header-anchor" href="#mha-高可用部署" aria-hidden="true">#</a> MHA 高可用部署</h1>
<h2 id="_1-搭建mha" tabindex="-1"><a class="header-anchor" href="#_1-搭建mha" aria-hidden="true">#</a> 1.搭建MHA</h2>
<br>
<p>(1) <strong>配置关键程序软连接</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ln</span> <span class="token parameter variable">-s</span> /data/mysql/bin/mysqlbinlog    /usr/bin/mysqlbinlog
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /data/mysql/bin/mysql          /usr/bin/mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因为MHA软件里面默认路径就是/usr/bin下。</p>
<br>
<p>(2) <strong>配置互信</strong></p>
<p><strong>db01</strong>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">rm</span> <span class="token parameter variable">-rf</span> /root/.ssh 
ssh-keygen
<span class="token builtin class-name">cd</span> /root/.ssh 
<span class="token function">mv</span> id_rsa.pub authorized_keys
<span class="token function">scp</span>  <span class="token parameter variable">-r</span>  /root/.ssh  <span class="token number">10.0</span>.0.52:/root 
<span class="token function">scp</span>  <span class="token parameter variable">-r</span>  /root/.ssh  <span class="token number">10.0</span>.0.53:/root 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>各节点验证</strong></p>
<br>
<p>db01:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ssh</span> <span class="token number">10.0</span>.0.51 <span class="token function">date</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.52 <span class="token function">date</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.53 <span class="token function">date</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p>db02:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ssh</span> <span class="token number">10.0</span>.0.51 <span class="token function">date</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.52 <span class="token function">date</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.53 <span class="token function">date</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><br>db03:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ssh</span> <span class="token number">10.0</span>.0.51 <span class="token function">date</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.52 <span class="token function">date</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.53 <span class="token function">date</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p>(3)安装软件包 (所有节点)</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> perl-DBD-MySQL <span class="token parameter variable">-y</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mha4mysql-node-0.56-0.el6.noarch.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p>(4) 在db01主库中创建mha需要的用户</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">grant</span> <span class="token keyword">all</span> <span class="token keyword">privileges</span> <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> mha<span class="token variable">@'10.0.0.%'</span> identified <span class="token keyword">by</span> <span class="token string">'mha'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<p>(5) Manager 节点软件安装（db03）</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>yum install <span class="token operator">-</span>y perl<span class="token operator">-</span>Config<span class="token operator">-</span>Tiny epel<span class="token operator">-</span><span class="token keyword">release</span> perl<span class="token operator">-</span>Log<span class="token operator">-</span>Dispatch perl<span class="token operator">-</span>Parallel<span class="token operator">-</span>ForkManager perl<span class="token operator">-</span><span class="token keyword">Time</span><span class="token operator">-</span>HiRes
rpm <span class="token operator">-</span>ivh mha4mysql<span class="token operator">-</span>manager<span class="token operator">-</span><span class="token number">0.56</span><span class="token operator">-</span><span class="token number">0.</span>el6<span class="token punctuation">.</span>noarch<span class="token punctuation">.</span>rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p>(6) 配置文件准备(db03)</p>
<p>创建配置文件目录</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/mha
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建日志目录</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/log/mha/app1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>​	
编辑mha配置文件</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /etc/mha/app1.cnf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[server default]
manager_log=/var/log/mha/app1/manager        
manager_workdir=/var/log/mha/app1            
master_binlog_dir=/data/binlog       
user=mha                                   
password=mha                               
ping_interval=2
repl_password=123
repl_user=repl
ssh_user=root                               
[server1]                                   
hostname=10.0.0.51
port=3306                                  
[server2]            
hostname=10.0.0.52
port=3306
[server3]
hostname=10.0.0.53
port=3306
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(7)  状态检查(db03)</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> masterha_check_ssh  <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf 
 masterha_check_repl  <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>(8) 开启MHA(db03)：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">nohup</span> masterha_manager <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf <span class="token parameter variable">--remove_dead_master_conf</span> <span class="token parameter variable">--ignore_last_failover</span>  <span class="token operator">&lt;</span> /dev/null<span class="token operator">></span> /var/log/mha/app1/manager.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>(9)  查看MHA状态</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>masterha_check_status <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<h2 id="_2-mha-架构软件结构说明" tabindex="-1"><a class="header-anchor" href="#_2-mha-架构软件结构说明" aria-hidden="true">#</a> 2. MHA 架构软件结构说明</h2>
<p><strong>节点规划</strong>:</p>
<ul>
<li>
<p><strong>manager端</strong>: db03</p>
</li>
<li>
<p><strong>node端</strong>: db01,db02,db03 装node软件</p>
</li>
<li>
<p>数据库节点, 必须至少是1主2从,独立数据库实例</p>
</li>
<li>
<p>MHA 管理节点，最好是独立一台机器</p>
</li>
</ul>
<br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-1.png" alt="MHA节点构架" tabindex="0" loading="lazy"><figcaption>MHA节点构架</figcaption></figure>
<p>MHA-Manager 管理节点 管理所有数据库节点：</p>
<p>最终达到目的 管理节点对所有数据库节点进行检测，当主库宕机时</p>
<br>
<h2 id="_3-mha软件的构成-perl语言" tabindex="-1"><a class="header-anchor" href="#_3-mha软件的构成-perl语言" aria-hidden="true">#</a> 3. MHA软件的构成(perl语言)</h2>
<br>
<p><strong>Manager 工具包主要包括以下几个工具</strong>：</p>
<p><code v-pre>mha4mysql-manager-0.56-0.el6.noarch.rpm</code></p>
<p><strong>脚本</strong>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>masterha_manger             <span class="token comment">#启动MHA </span>
masterha_stop <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf <span class="token comment">#关闭MHA</span>
masterha_check_ssh          <span class="token comment">#检查MHA的SSH配置状况 </span>
masterha_check_repl         <span class="token comment">#检查MySQL复制状况 </span>
masterha_master_monitor     <span class="token comment">#检测master是否宕机 </span>
masterha_check_status       <span class="token comment">#检测当前MHA运行状态 </span>
masterha_master_switch  	<span class="token comment">#控制故障转移（自动或者手动）</span>
masterha_conf_host      	<span class="token comment">#添加或删除配置的server信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>Node工具包主要包括以下几个工具</strong>：</p>
<p><code v-pre>mha4mysql-node-0.56-0.el6.noarch.rpm</code></p>
<p>这些工具通常由MHA Manager的脚本触发，无需人为操作</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>save_binary_logs            <span class="token comment">#保存和复制master的二进制日志 </span>
apply_diff_relay_logs       <span class="token comment">#识别差异的中继日志事件并将其差异的事件应用于其他的</span>
purge_relay_logs            <span class="token comment">#清除中继日志（不会阻塞SQL线程）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h2 id="_4-mha-配置过程细节说明" tabindex="-1"><a class="header-anchor" href="#_4-mha-配置过程细节说明" aria-hidden="true">#</a> 4.MHA 配置过程细节说明</h2>
<h3 id="_4-1-软连接" tabindex="-1"><a class="header-anchor" href="#_4-1-软连接" aria-hidden="true">#</a> 4.1  软连接</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">\</span>rm <span class="token parameter variable">-rf</span> /usr/bin/mysqlbinlog
<span class="token punctuation">\</span>rm <span class="token parameter variable">-rf</span> /usr/bin/mysql
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /application/mysql/bin/mysqlbinlog    /usr/bin/mysqlbinlog
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /application/mysql/bin/mysql          /usr/bin/mysql
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /usr/bin/mysql
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /usr/bin/mysqlbinlog 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_4-2-互信-多节点直接不需要用密码" tabindex="-1"><a class="header-anchor" href="#_4-2-互信-多节点直接不需要用密码" aria-hidden="true">#</a> 4.2 互信 多节点直接不需要用密码 ：</h3>
<br>
<p>实现脚本免交互</p>
<p>db01：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">rm</span> <span class="token parameter variable">-rf</span> /root/.ssh 
ssh-keygen
<span class="token builtin class-name">cd</span> /root/.ssh 
<span class="token function">mv</span> id_rsa.pub authorized_keys <span class="token comment">#默认定义的公钥名字</span>
<span class="token function">scp</span>  <span class="token parameter variable">-r</span>  /root/.ssh  <span class="token number">10.0</span>.0.52:/root 
<span class="token function">scp</span>  <span class="token parameter variable">-r</span>  /root/.ssh  <span class="token number">10.0</span>.0.53:/root 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p>更改公钥默认文件名:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/ssh/sshd_config 
AuthorizedKeysFile  .ssh/authorized_key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>各节点验证</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#db01:</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.51 <span class="token function">date</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.52 <span class="token function">date</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.53 <span class="token function">date</span>

<span class="token comment">#db02:</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.51 <span class="token function">date</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.52 <span class="token function">date</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.53 <span class="token function">date</span>

<span class="token comment">#db03:</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.51 <span class="token function">date</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.52 <span class="token function">date</span>
<span class="token function">ssh</span> <span class="token number">10.0</span>.0.53 <span class="token function">date</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_4-3-安装软件包-所有节点" tabindex="-1"><a class="header-anchor" href="#_4-3-安装软件包-所有节点" aria-hidden="true">#</a> 4.3 安装软件包(所有节点)</h3>
<br>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>yum install perl-DBD-MySQL -y
rpm -ivh mha4mysql-node-0.56-0.el6.noarch.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_4-4-在db01主库中创建mha需要的用户" tabindex="-1"><a class="header-anchor" href="#_4-4-在db01主库中创建mha需要的用户" aria-hidden="true">#</a> 4.4 在db01主库中创建mha需要的用户</h3>
<br>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>grant all privileges on *.* to mha@'10.0.0.%' identified by 'mha';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<h3 id="_4-5-manager软件安装-db03" tabindex="-1"><a class="header-anchor" href="#_4-5-manager软件安装-db03" aria-hidden="true">#</a> 4.5  Manager软件安装（db03）</h3>
<br>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>yum install -y perl-Config-Tiny epel-release perl-Log-Dispatch perl-Parallel-ForkManager perl-Time-HiRes
rpm -ivh mha4mysql-manager-0.56-0.el6.noarch.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_4-6-配置文件准备-db03" tabindex="-1"><a class="header-anchor" href="#_4-6-配置文件准备-db03" aria-hidden="true">#</a> 4.6 配置文件准备(db03)</h3>
<br>
<p>-- 创建配置文件目录</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>mkdir -p /etc/mha
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>-- 创建日志目录</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>mkdir -p /var/log/mha/app1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>-- 编辑mha配置文件</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /etc/mha/app1.cnf <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token comment">#名字 目录随便定义</span></span>
[server default] #默认配置
manager_log=/var/log/mha/app1/manager  #记录日志文件       核心日志
manager_workdir=/var/log/mha/app1      #启动日志      
master_binlog_dir=/data/binlog #主库binlog （所有节点都要打开二进制日志并且目录名要一样）   
user=mha             #管理用户                     
password=mha         #密码                   
ping_interval=2      #探测心跳的间隔时间 一共给三次机会 也就是最多6秒无响应就算宕机
repl_password=123    #构建主从时的用户密码
repl_user=repl       #构建主从时的用户
ssh_user=root        #各节点互信用户                            

[server1]            #后端的三个节点（自动检测谁是主库）             
hostname=10.0.0.51
port=3306                                  
[server2]            #如果无压力的状况下根据顺序选中新主
hostname=10.0.0.52
port=3306
[server3]
hostname=10.0.0.53
port=3306
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p>一台 Manager 节点可以负责多个业务组，通过多个不同的配置文件区分如：</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-2.png" alt="MHA节点构架2" tabindex="0" loading="lazy"><figcaption>MHA节点构架2</figcaption></figure>
<br>
<p>4.7 状态检查(db03)</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>masterha_check_ssh  <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf 
masterha_check_repl  <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p>4.8 开启MHA(db03)：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">nohup</span> masterha_manager <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf <span class="token parameter variable">--remove_dead_master_conf</span> <span class="token parameter variable">--ignore_last_failover</span>  <span class="token operator">&lt;</span> /dev/null<span class="token operator">></span> /var/log/mha/app1/manager.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>

<span class="token parameter variable">--remove_dead_master_conf</span>  <span class="token comment">#自动在配置文件中去掉宕机的节点</span>
<span class="token parameter variable">--ignore_last_failover</span>   <span class="token comment">#忽略上一次故障切换</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h2 id="_4-mha-failover-过程详解" tabindex="-1"><a class="header-anchor" href="#_4-mha-failover-过程详解" aria-hidden="true">#</a> 4.MHA FailOver 过程详解</h2>
<h3 id="_4-1-什么是failover" tabindex="-1"><a class="header-anchor" href="#_4-1-什么是failover" aria-hidden="true">#</a> 4.1 什么是Failover?</h3>
<p><strong>故障转移</strong><br></p>
<p>主库宕机一直到业务恢复正常的处理过程(自动)</p>
<br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-3.png" alt="收到和执行了多少事务" tabindex="0" loading="lazy"><figcaption>收到和执行了多少事务</figcaption></figure>
<p>收到和执行了多少事务对比。</p>
<br>
<br>
<h3 id="_4-2-mha的failover如何实现" tabindex="-1"><a class="header-anchor" href="#_4-2-mha的failover如何实现" aria-hidden="true">#</a> 4.2 MHA的Failover如何实现?</h3>
<p>从启动---&gt;故障---&gt;转移---&gt;业务恢复</p>
<ol>
<li>
<p>MHA通过<code v-pre>masterha_manger</code>脚本启动MHA的功能.</p>
</li>
<li>
<p>在manager启动之前,会自动检查ssh互信(<code v-pre>masterha_check_ssh</code>)和主从状态(<code v-pre>masterha_check_repl</code>)</p>
</li>
<li>
<p>MHA-manager 通过 <code v-pre>masterha_master_monitor</code>脚本(每隔<code v-pre>ping_interval</code>秒配置文件中)</p>
</li>
<li>
<p><code v-pre>masterha_master_monitor</code> 探测主库3次无心跳之后,就认为主库宕机了.</p>
</li>
<li>
<p>进行选主过程采用如下</p>
<ul>
<li>
<p>算法一:
读取配置文件中是否有强制选主的参数?<br>
<code v-pre>candidate_master=1</code> 优先竞选<br>
<code v-pre>check_repl_delay=0</code>  跳过检查差异<br>
加在相应主机标签下面<br></p>
</li>
<li>
<p>算法二:
自动判断所有从库的日志量.将最接近主库数据的从库作为新主.<br></p>
</li>
<li>
<p>算法三:
按照配置文件先后顺序的进行选新主.<br></p>
</li>
</ul>
</li>
<li>
<p>数据补偿，判断主库SSH的连通性在SSH能连的情况下调用 save_binary_logs脚本,立即保存缺失部分的binlog到各个从节点,恢复，针对主库缺失部分进行补全 GTID号判断。</p>
<p>SSH无法连接调用 apply_diff_relay_logs 脚本,计算从库的relaylog的差异,恢复到2号从库，在其他从库 尽快能找到差异恢复一部分数据。</p>
</li>
<li>
<p>解除从库身份</p>
</li>
<li>
<p>剩余从库和新主库建立主从关系</p>
</li>
<li>
<p>应用透明</p>
</li>
<li>
<p>故障提醒</p>
</li>
</ol>
<br>
<br>
<ul>
<li>
<p>算法一:
读取配置文件中是否有强制选主的参数?<br>
<code v-pre>candidate_master=1</code> 优先竞选<br>
<code v-pre>check_repl_delay=0</code>  跳过检查差异<br>
加在相应主机标签下面<br></p>
</li>
<li>
<p>算法二:
自动判断所有从库的日志量.将最接近主库数据的从库作为新主.<br></p>
</li>
<li>
<p>算法三:
按照配置文件先后顺序的进行选新主.<br></p>
</li>
</ul>
<p><strong>扩展一下</strong>: 强制选主应用场景<br>
<code v-pre>candidate_master=1</code> 应用场景?<br></p>
<p>(1) MHA+KeepAlive VIP(早期MHA架构) <br>
(2) 多地多中心 facebook架构 多节点在不同的机房<br></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-4.png" alt="多数据中心" tabindex="0" loading="lazy"><figcaption>多数据中心</figcaption></figure>
<br>
<br>
<h2 id="_5-应用透明" tabindex="-1"><a class="header-anchor" href="#_5-应用透明" aria-hidden="true">#</a> 5.应用透明</h2>
<br>
<p><strong>db03:</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cp</span> /root/master_ip_failover.txt /usr/local/bin/master_ip_failover <span class="token comment">#vip切换脚本</span>
<span class="token function">vim</span> /usr/local/bin/master_ip_failover
my <span class="token variable">$vip</span> <span class="token operator">=</span> <span class="token string">'10.0.0.55/24'</span><span class="token punctuation">;</span> <span class="token comment">#设定那个地址为VIP</span>
my <span class="token variable">$key</span> <span class="token operator">=</span> <span class="token string">'1'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p>这里的变量 key 是指 <code v-pre>ifconfig eth0:1 10.0.0.55/24</code> 的那个网卡别名</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>my <span class="token variable">$ssh_start_vip</span> <span class="token operator">=</span> <span class="token string">"/sbin/ifconfig eth0:<span class="token variable">$key</span> <span class="token variable">$vip</span>"</span><span class="token punctuation">;</span>  <span class="token comment">#生成地址 注意网卡名称</span>
<span class="token comment">#等于 </span>
<span class="token function">ifconfig</span> eth0:1 <span class="token number">10.0</span>.0.55/24
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>my <span class="token variable">$ssh_stop_vip</span> <span class="token operator">=</span> <span class="token string">"/sbin/ifconfig eth0:<span class="token variable">$key</span> down"</span><span class="token punctuation">;</span> <span class="token comment">#注意网卡名称</span>
<span class="token comment">#等于 </span>
<span class="token function">ifconfig</span> eth0:1 down
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p>上下线地址</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> dos2unix
dos2unix /usr/local/bin/master_ip_failover 转换掉中文字符
<span class="token function">chmod</span> +x /usr/local/bin/master_ip_failover 
<span class="token function">vim</span> /etc/mha/app1.cnf
<span class="token comment">#在[server default] 下面加 在主库宕机时才会掉用</span>
<span class="token assign-left variable">master_ip_failover_script</span><span class="token operator">=</span>/usr/local/bin/master_ip_failover  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p><strong>db01主库:手工添加 vip</strong></p>
<p><strong>查看是主库</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>masterha_check_status <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/wordpress.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#db01:添加VIP</span>
<span class="token function">ifconfig</span> eth0:1 <span class="token number">10.0</span>.0.55/24
 
<span class="token comment">#db03:重启MHA</span>
masterha_stop <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/wordpress.cnf
<span class="token function">nohup</span> masterha_manager <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf <span class="token parameter variable">--remove_dead_master_conf</span> <span class="token parameter variable">--ignore_last_failover</span> <span class="token operator">&lt;</span> /dev/null<span class="token operator">></span> /var/log/mha/app1/manager.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
<span class="token comment">#db03:检查</span>
masterha_check_status <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf
app1 <span class="token punctuation">(</span>pid:14410<span class="token punctuation">)</span> is running<span class="token punctuation">(</span><span class="token number">0</span>:PING_OK<span class="token punctuation">)</span>, master:10.0.0.51
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h2 id="_6-mha-故障邮件提醒" tabindex="-1"><a class="header-anchor" href="#_6-mha-故障邮件提醒" aria-hidden="true">#</a> 6.MHA 故障邮件提醒</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>[root@db03 ~]# cp -a email/* /usr/local/bin/
[root@db03 ~]# cd /usr/local/bin/
[root@db03 ]# chmod +x *

[root@db03 bin]# vim /etc/mha/app1.cnf 
report_script=/usr/local/bin/send
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-5.png" alt="故障提醒" tabindex="0" loading="lazy"><figcaption>故障提醒</figcaption></figure>
<p><strong>重启MHA</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>masterha_stop <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf
<span class="token function">nohup</span> masterha_manager <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf <span class="token parameter variable">--remove_dead_master_conf</span> <span class="token parameter variable">--ignore_last_failover</span> <span class="token operator">&lt;</span> /dev/null<span class="token operator">></span> /var/log/mha/app1/manager.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h2 id="_7-额外的数据补偿服务器" tabindex="-1"><a class="header-anchor" href="#_7-额外的数据补偿服务器" aria-hidden="true">#</a> 7.额外的数据补偿服务器</h2>
<p>(binlog_server) 节点用于在SSH无法连接到主库时做额外的数据补偿</p>
<br>
<p>找一台额外的机器，必须要有5.6以上的版本，支持gtid并开启，这里我们直接用的第二个slave（db03）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/mha/app1.cnf 
<span class="token punctuation">[</span>binlog1<span class="token punctuation">]</span>         <span class="token comment">#添加新节点</span>
<span class="token assign-left variable">no_master</span><span class="token operator">=</span><span class="token number">1</span> <span class="token comment">#不参与切换</span>
<span class="token assign-left variable">hostname</span><span class="token operator">=</span><span class="token number">10.0</span>.0.53
<span class="token assign-left variable">master_binlog_dir</span><span class="token operator">=</span>/data/mysql/binlog <span class="token comment">#日志路径</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-6.png" alt="数据补偿服务器" tabindex="0" loading="lazy"><figcaption>数据补偿服务器</figcaption></figure>
<br>
<p><strong>(2) 创建必要目录</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/mysql/binlog
<span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql.mysql /data/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>(3) 实时拉取主库binlog日志</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /data/mysql/binlog     <span class="token comment">#必须进入到自己创建好的目录</span>
mysqlbinlog  <span class="token parameter variable">-R</span> <span class="token parameter variable">--host</span><span class="token operator">=</span><span class="token number">10.0</span>.0.51 <span class="token parameter variable">--user</span><span class="token operator">=</span>mha <span class="token parameter variable">--password</span><span class="token operator">=</span>mha <span class="token parameter variable">--raw</span>  --stop-never mysql-bin.000001 <span class="token operator">&amp;</span> <span class="token comment">#主库一单有变动就来取</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在切换新日志时也会实时抓取</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section9-7.png" alt="在切换新日志时也会实时抓取" tabindex="0" loading="lazy"><figcaption>在切换新日志时也会实时抓取</figcaption></figure>
<br>
<p><strong>注意</strong>：
拉取日志的起点,需要按照目前主库正在使用的binlog为起点.</p>
<p><strong>(4) 重启MHA-manager</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#db03</span>
masterha_stop <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf
<span class="token function">nohup</span> masterha_manager <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf <span class="token parameter variable">--remove_dead_master_conf</span> <span class="token parameter variable">--ignore_last_failover</span>  <span class="token operator">&lt;</span> /dev/null<span class="token operator">></span> /var/log/mha/app1/manager.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h2 id="_8-故障模拟及故障处理" tabindex="-1"><a class="header-anchor" href="#_8-故障模拟及故障处理" aria-hidden="true">#</a> 8.故障模拟及故障处理</h2>
<br>
<p>因为MHA故障转移是一次性的宕掉的节点不会自动添加回来，所有就需要实施监控并启动故障节点。</p>
<br>
<h3 id="_8-1-宕掉-db01-数据库" tabindex="-1"><a class="header-anchor" href="#_8-1-宕掉-db01-数据库" aria-hidden="true">#</a> 8.1 宕掉 db01 数据库</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#db01</span>
/etc/init.d/mysqld stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_8-2-恢复故障" tabindex="-1"><a class="header-anchor" href="#_8-2-恢复故障" aria-hidden="true">#</a> 8.2 恢复故障</h3>
<p><strong>(1) 启动故障节点</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#db01</span>
/etc/init.d/mysqld start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>(2) 恢复1主2从(db01)模式</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">grep</span> <span class="token string">"CHANGE MASTER TO"</span>  /var/log/mha/app1/manager <span class="token comment">#这时已经切到slave2节点</span>
Thu Jul <span class="token number">18</span> <span class="token number">18</span>:31:54 <span class="token number">2019</span> - <span class="token punctuation">[</span>info<span class="token punctuation">]</span>  All other slaves should start replication from here. Statement should be: CHANGE MASTER TO <span class="token assign-left variable">MASTER_HOST</span><span class="token operator">=</span><span class="token string">'10.0.0.52'</span>, <span class="token assign-left variable">MASTER_PORT</span><span class="token operator">=</span><span class="token number">3306</span>, <span class="token assign-left variable">MASTER_AUTO_POSITION</span><span class="token operator">=</span><span class="token number">1</span>, <span class="token assign-left variable">MASTER_USER</span><span class="token operator">=</span><span class="token string">'repl'</span>, <span class="token assign-left variable">MASTER_PASSWORD</span><span class="token operator">=</span><span class="token string">'xxx'</span><span class="token punctuation">;</span>
<span class="token comment">#重新添加db01到Manager中</span>
db01 <span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span>CHANGE MASTER TO <span class="token assign-left variable">MASTER_HOST</span><span class="token operator">=</span><span class="token string">'10.0.0.52'</span>, <span class="token assign-left variable">MASTER_PORT</span><span class="token operator">=</span><span class="token number">3306</span>, <span class="token assign-left variable">MASTER_AUTO_POSITION</span><span class="token operator">=</span><span class="token number">1</span>, <span class="token assign-left variable">MASTER_USER</span><span class="token operator">=</span><span class="token string">'repl'</span>, <span class="token assign-left variable">MASTER_PASSWORD</span><span class="token operator">=</span><span class="token string">'123'</span><span class="token punctuation">;</span>
db01 <span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span>start slave<span class="token punctuation">;</span> <span class="token comment">#启动线程</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>(3) 恢复配置文件(db03)</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>server1<span class="token punctuation">]</span>
<span class="token assign-left variable">hostname</span><span class="token operator">=</span><span class="token number">10.0</span>.0.51
<span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">3306</span>
<span class="token punctuation">[</span>server2<span class="token punctuation">]</span>
<span class="token assign-left variable">hostname</span><span class="token operator">=</span><span class="token number">10.0</span>.0.52
<span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">3306</span>
<span class="token punctuation">[</span>server3<span class="token punctuation">]</span>
<span class="token assign-left variable">hostname</span><span class="token operator">=</span><span class="token number">10.0</span>.0.53
<span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">3306</span>
<span class="token assign-left variable">report_script</span><span class="token operator">=</span>/usr/local/bin/send
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>(4) 启动MHA</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#db03</span>
<span class="token function">nohup</span> masterha_manager <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf <span class="token parameter variable">--remove_dead_master_conf</span> <span class="token parameter variable">--ignore_last_failover</span>  <span class="token operator">&lt;</span> /dev/null<span class="token operator">></span> /var/log/mha/app1/manager.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token number">16543</span>
<span class="token comment">#db03</span>
masterha_check_status <span class="token parameter variable">--conf</span><span class="token operator">=</span>/etc/mha/app1.cnf
app1 <span class="token punctuation">(</span>pid:16543<span class="token punctuation">)</span> is running<span class="token punctuation">(</span><span class="token number">0</span>:PING_OK<span class="token punctuation">)</span>, master:10.0.0.52
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>(5)恢复 binlogserver</strong></p>
<p>更换抓取目标</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#binlogserver</span>
<span class="token builtin class-name">cd</span> /data/mysql/binlog    
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /data/mysql/binlog/*
mysqlbinlog  <span class="token parameter variable">-R</span> <span class="token parameter variable">--host</span><span class="token operator">=</span><span class="token number">10.0</span>.0.52 <span class="token parameter variable">--user</span><span class="token operator">=</span>mha <span class="token parameter variable">--password</span><span class="token operator">=</span>mha <span class="token parameter variable">--raw</span>  --stop-never mysql-bin.000001 <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


