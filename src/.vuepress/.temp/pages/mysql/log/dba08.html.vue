<template><div><h1 id="mysql-replication" tabindex="-1"><a class="header-anchor" href="#mysql-replication" aria-hidden="true">#</a> MySQL Replication</h1>
<p>#高可用架构方案</p>
<ul>
<li>负载均衡：有一个定的高可用性</li>
</ul>
<p>​       LVS  Nginx</p>
<ul>
<li>主备系统：有高可用性，但是需要别换，是单活的构架</li>
</ul>
<p>​       KA ， MHA ,MMM</p>
<ul>
<li>真正的高可用（多活系统）</li>
</ul>
<p>​       NDB Cluster Oracle RAC Sysbase cluster ，InnoDB Cluster （MGR） ，PXC , MGC</p>
<br>
<h2 id="_1-职责介绍" tabindex="-1"><a class="header-anchor" href="#_1-职责介绍" aria-hidden="true">#</a> 1. 职责介绍</h2>
<ul>
<li>搭建主从复制</li>
<li>主从原理熟悉</li>
<li>主从的故障处理</li>
<li>主从延时</li>
<li>主从的特殊架构的配置使用</li>
<li>主从架构的演变</li>
</ul>
<br>
<br>
<h2 id="_2-主从复制介绍" tabindex="-1"><a class="header-anchor" href="#_2-主从复制介绍" aria-hidden="true">#</a> 2. 主从复制介绍</h2>
<p>(1) 主从复制基于binlog来实现的
(2) 主库发生新的操作,都会记录binlog
(3) 从库取得主库的binlog进行回放
(4) 主从复制的过程是异步</p>
<br>
<br>
<h2 id="_3-主从复制的前提-搭建主从复制" tabindex="-1"><a class="header-anchor" href="#_3-主从复制的前提-搭建主从复制" aria-hidden="true">#</a> 3. 主从复制的前提 (搭建主从复制)</h2>
<p>(1) 2个或以上的数据库实例
(2) 主库需要开启二进制日志
(3) server_id要不同,区分不同的节点
(4) 主库需要建立专用的复制用户 (replication slave)
(5) 从库应该通过备份主库,恢复的方法进行&quot;补课&quot;
(6) 人为告诉从库一些复制信息(ip port user pass,二进制日志起点)
(7) 从库应该开启专门的复制线程</p>
<br>
<br>
<h2 id="_4-主从复制搭建过程-生产" tabindex="-1"><a class="header-anchor" href="#_4-主从复制搭建过程-生产" aria-hidden="true">#</a> 4.主从复制搭建过程(生产)</h2>
<h3 id="_4-1-准备多实例" tabindex="-1"><a class="header-anchor" href="#_4-1-准备多实例" aria-hidden="true">#</a> 4.1 准备多实例</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pkill</span> mysqld 
systemctl start mysqld3307
<span class="token punctuation">\</span>rm <span class="token parameter variable">-rf</span> /data/3308/data/*
<span class="token punctuation">\</span>rm <span class="token parameter variable">-rf</span> /data/3308/mysql-bin.*
mysqld --initialize-insecure <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql <span class="token parameter variable">--basedir</span><span class="token operator">=</span>/application/mysql <span class="token parameter variable">--datadir</span><span class="token operator">=</span>/data/3308/data 初始化数据库
systemctl start mysqld3308
mysql <span class="token parameter variable">-S</span> /data/3308/mysql.sock <span class="token parameter variable">-e</span> <span class="token string">"select @@port"</span>   查看端口
mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123</span> <span class="token parameter variable">-S</span> /data/3307/mysql.sock <span class="token parameter variable">-e</span> <span class="token string">"select @@port"</span><span class="token punctuation">;</span> 

<span class="token number">3307</span>主库 <span class="token number">3308</span>从库
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_4-2-检查配置文件" tabindex="-1"><a class="header-anchor" href="#_4-2-检查配置文件" aria-hidden="true">#</a> 4.2 检查配置文件</h3>
<p><strong>主库</strong>: 二进制日志是否开启</p>
<p>两个节点: <code v-pre>server_id</code></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /data/3308/my.cnf 
<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token assign-left variable">basedir</span><span class="token operator">=</span>/application/mysql
<span class="token assign-left variable">datadir</span><span class="token operator">=</span>/data/3308/data
<span class="token assign-left variable">socket</span><span class="token operator">=</span>/data/3308/mysql.sock
<span class="token assign-left variable">log_error</span><span class="token operator">=</span>/data/3308/mysql.log
<span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">3308</span>
<span class="token assign-left variable">server_id</span><span class="token operator">=</span><span class="token number">8</span>
<span class="token assign-left variable">log_bin</span><span class="token operator">=</span>/data/3308/mysql-bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /data/3307/my.cnf 
<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token assign-left variable">basedir</span><span class="token operator">=</span>/application/mysql
<span class="token assign-left variable">datadir</span><span class="token operator">=</span>/data/3307/data
<span class="token assign-left variable">socket</span><span class="token operator">=</span>/data/3307/mysql.sock
<span class="token assign-left variable">log_error</span><span class="token operator">=</span>/data/3307/mysql.log
<span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">3307</span>
<span class="token assign-left variable">server_id</span><span class="token operator">=</span><span class="token number">7</span>  主库要小些
<span class="token assign-left variable">log_bin</span><span class="token operator">=</span>/data/3307/mysql-bin
<span class="token punctuation">[</span>root@db01 data<span class="token punctuation">]</span><span class="token comment"># </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_4-3-主库创建复制用户" tabindex="-1"><a class="header-anchor" href="#_4-3-主库创建复制用户" aria-hidden="true">#</a> 4.3 主库创建复制用户</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123</span> <span class="token parameter variable">-S</span> /data/3307/mysql.sock <span class="token parameter variable">-e</span> <span class="token string">"grant replication slave on *.* to repl@'10.0.0.%' identified by '123'"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<br>
<h3 id="_4-4-补课" tabindex="-1"><a class="header-anchor" href="#_4-4-补课" aria-hidden="true">#</a> 4.4 补课</h3>
<p>主库数据做备份恢复到从库</p>
<p><strong>主</strong>:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysqldump <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123</span> <span class="token parameter variable">-S</span> /data/3307/mysql.sock <span class="token parameter variable">-A</span> --master-data<span class="token operator">=</span><span class="token number">2</span> --single-transaction <span class="token parameter variable">-R</span> <span class="token parameter variable">-E</span> <span class="token parameter variable">--triggers</span> <span class="token operator">></span>/tmp/full.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>从</strong>:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysql <span class="token parameter variable">-S</span> /data/3308/mysql.sock 
mysql<span class="token operator">></span> <span class="token builtin class-name">set</span> <span class="token assign-left variable">sql_log_bin</span><span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token builtin class-name">source</span> /tmp/full.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_4-5-告诉从库信息" tabindex="-1"><a class="header-anchor" href="#_4-5-告诉从库信息" aria-hidden="true">#</a> 4.5 告诉从库信息</h3>
<p>从库：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">help</span> change master to
mysql <span class="token parameter variable">-S</span> /data/3308/mysql.sock 

CHANGE MASTER TO 
<span class="token assign-left variable">MASTER_HOST</span><span class="token operator">=</span><span class="token string">'10.0.0.51'</span>, 地址或域名
<span class="token assign-left variable">MASTER_USER</span><span class="token operator">=</span><span class="token string">'repl'</span>, 用户名
<span class="token assign-left variable">MASTER_PASSWORD</span><span class="token operator">=</span><span class="token string">'123'</span>,  密码
<span class="token assign-left variable">MASTER_PORT</span><span class="token operator">=</span><span class="token number">3307</span>,  端口号
<span class="token assign-left variable">MASTER_LOG_FILE</span><span class="token operator">=</span><span class="token string">'mysql-bin.000004'</span>, 二进制日志
<span class="token assign-left variable">MASTER_LOG_POS</span><span class="token operator">=</span><span class="token number">444</span>,
<span class="token assign-left variable">MASTER_CONNECT_RETRY</span><span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">;</span> 自动重连次数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /tmp/full.sql 查看日志提取备份记录点
-- CHANGE MASTER TO <span class="token assign-left variable">MASTER_LOG_FILE</span><span class="token operator">=</span><span class="token string">'mysql-bin.000004'</span>, <span class="token assign-left variable">MASTER_LOG_POS</span><span class="token operator">=</span><span class="token number">444</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_4-6-从库开启复制线程-io-sql" tabindex="-1"><a class="header-anchor" href="#_4-6-从库开启复制线程-io-sql" aria-hidden="true">#</a> 4.6 从库开启复制线程(IO,SQL)</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysql <span class="token parameter variable">-S</span> /data/3308/mysql.sock 
mysql<span class="token operator">></span> start slave<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-7-检查主从复制状态" tabindex="-1"><a class="header-anchor" href="#_4-7-检查主从复制状态" aria-hidden="true">#</a> 4.7 检查主从复制状态</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysql <span class="token parameter variable">-S</span> /data/3308/mysql.sock 
mysql<span class="token operator">></span> show slave status <span class="token punctuation">\</span>G
            Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主库:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123</span> <span class="token parameter variable">-S</span> /data/3307/mysql.sock <span class="token parameter variable">-e</span> <span class="token string">"create database alexsb"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从库:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysql <span class="token parameter variable">-S</span> /data/3308/mysql.sock <span class="token parameter variable">-e</span> <span class="token string">"show databases"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<br>
<h2 id="_5-主从复制原理" tabindex="-1"><a class="header-anchor" href="#_5-主从复制原理" aria-hidden="true">#</a> 5.主从复制原理</h2>
<br>
<h3 id="_5-1-主从复制中涉及的文件" tabindex="-1"><a class="header-anchor" href="#_5-1-主从复制中涉及的文件" aria-hidden="true">#</a> 5.1 主从复制中涉及的文件</h3>
<br>
<p><strong>主库</strong>:
<code v-pre>binlog</code></p>
<p><strong>从库</strong>:
<code v-pre>relaylog</code>  中继日志
<code v-pre>master.info</code>  主库信息文件
<code v-pre>relaylog.info relaylog</code>   从库应用的信息</p>
<h3 id="_5-2-主从复制中涉及的线程" tabindex="-1"><a class="header-anchor" href="#_5-2-主从复制中涉及的线程" aria-hidden="true">#</a> 5.2 主从复制中涉及的线程</h3>
<p><strong>主库</strong>:
<code v-pre>Binlog_Dump Thread : DUMP_T</code></p>
<p><strong>从库</strong>:
<code v-pre>SLAVE_IO_THREAD     : IO_T</code>
<code v-pre>SLAVE_SQL_THREAD    : SQL_T</code></p>
<br>
<br>
<h3 id="_5-3-主从复制工作-过程-原理" tabindex="-1"><a class="header-anchor" href="#_5-3-主从复制工作-过程-原理" aria-hidden="true">#</a> 5.3 主从复制工作(过程)原理</h3>
<br>
<ol>
<li>从库执行change master to 命令(主库的连接信息+复制的起点)</li>
<li>从库会将以上信息,记录到master.info文件</li>
<li>从库执行 start slave 命令,立即开启IO_T和SQL_T</li>
<li>从库 IO_T,读取master.info文件中的信息获取到IP,PORT,User,Pass,binlog的位置信息</li>
<li>从库IO_T请求连接主库,主库专门提供一个DUMP_T,负责和IO_T交互</li>
<li>IO_T根据binlog的位置信息(mysql-bin.000004 , 444),请求主库新的binlog</li>
<li>主库通过DUMP_T将最新的binlog,通过网络TP给从库的IO_T</li>
<li>IO_T接收到新的binlog日志,存储到TCP/IP缓存,立即返回ACK给主库,<a href="http://xn--master-2p1ln19bkvc.info" target="_blank" rel="noopener noreferrer">并更新master.info<ExternalLinkIcon/></a></li>
<li>IO_T将TCP/IP缓存中数据,转储到磁盘relaylog中.</li>
<li>SQL_T读取relay.info中的信息,获取到上次已经应用过的relaylog的位置信息</li>
<li>SQL_T会按照上次的位置点回放最新的relaylog,再次更新relay.info信息</li>
<li>从库会自动purge应用过relay进行定期清理</li>
</ol>
<br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section8-1.png" alt="主从搭建原理" tabindex="0" loading="lazy"><figcaption>主从搭建原理</figcaption></figure>
<br>
<p><strong>补充说明</strong>:</p>
<p>一旦主从复制构建成功,主库当中发生了新的变化,都会通过dump_T发送信号给IO_T,增强了主从复制的实时性.</p>
<h3 id="_5-4-主从复制监控" tabindex="-1"><a class="header-anchor" href="#_5-4-主从复制监控" aria-hidden="true">#</a> 5.4 主从复制监控</h3>
<br>
<p>命令:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> slave <span class="token keyword">status</span> \G 从库执行

主库有关的信息<span class="token punctuation">(</span>master<span class="token punctuation">.</span>info<span class="token punctuation">)</span>:
Master_Host: <span class="token number">10.0</span><span class="token number">.0</span><span class="token number">.51</span>
Master_User: repl
Master_Port: <span class="token number">3307</span>
Connect_Retry: <span class="token number">10</span>
<span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span>
Master_Log_File: mysql<span class="token operator">-</span>bin<span class="token punctuation">.</span><span class="token number">000004</span>
Read_Master_Log_Pos: <span class="token number">609</span>
<span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section8-1-1.png" alt="主从状态监控" tabindex="0" loading="lazy"><figcaption>主从状态监控</figcaption></figure>
<br>
<br>
<p><strong>从库relay应用信息有关的</strong>(<code v-pre>relay.info</code>):</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Relay_Log_File: db01-relay-bin.000002
Relay_Log_Pos: <span class="token number">320</span>  <span class="token comment">#上次已经运行到320</span>
Relay_Master_Log_File: mysql-bin.000004 <span class="token comment">#对应主库binlog文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>从库线程运行状态(排错)</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Slave_IO_Running: Yes
Slave_SQL_Running: Yes
Last_IO_Errno: <span class="token number">0</span>
Last_IO_Error: 
Last_SQL_Errno: <span class="token number">0</span>
Last_SQL_Error: 	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​		<br></p>
<br>			
**过滤复制有关的信息**:			
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>Replicate_Do_DB: 
Replicate_Ignore_DB: 
Replicate_Do_Table: 
Replicate_Ignore_Table: 
Replicate_Wild_Do_Table: 
Replicate_Wild_Ignore_Table: 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
**从库延时主库的时间(秒)**:  
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Seconds_Behind_Master: <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>				
<p><strong>延时从库</strong>:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>SQL_Delay: <span class="token number">0</span>
SQL_Remaining_Delay: NULL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>GTID复制有关的状态信息</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Retrieved_Gtid_Set: 
Executed_Gtid_Set: 
Auto_Position: <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_5-5-主从复制故障" tabindex="-1"><a class="header-anchor" href="#_5-5-主从复制故障" aria-hidden="true">#</a> 5.5 主从复制故障</h3>
<br>
<h4 id="_5-5-1-io-线程故障" tabindex="-1"><a class="header-anchor" href="#_5-5-1-io-线程故障" aria-hidden="true">#</a> 5.5.1 IO 线程故障</h4>
<p>(1) 连接主库: connecting</p>
<p>网络,连接信息错误或变更了,防火墙,连接数上线</p>
<p><strong>排查思路</strong>:</p>
<ol>
<li>使用复制用户手工登录</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysql <span class="token parameter variable">-urepl</span> <span class="token parameter variable">-p12321321</span> <span class="token parameter variable">-h</span> <span class="token number">10.0</span>.0.51 <span class="token parameter variable">-P</span> <span class="token number">3307</span>
mysql: <span class="token punctuation">[</span>Warning<span class="token punctuation">]</span> Using a password on the <span class="token builtin class-name">command</span> line interface can be insecure.
ERROR <span class="token number">1045</span> <span class="token punctuation">(</span><span class="token number">28000</span><span class="token punctuation">)</span>: Access denied <span class="token keyword">for</span> user <span class="token string">'repl'</span>@<span class="token string">'db01'</span> <span class="token punctuation">(</span>using password: YES<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>密码错误</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysql <span class="token parameter variable">-urep</span> <span class="token parameter variable">-p123</span> <span class="token parameter variable">-h</span> <span class="token number">10.0</span>.0.51 <span class="token parameter variable">-P</span> <span class="token number">3307</span>
mysql: <span class="token punctuation">[</span>Warning<span class="token punctuation">]</span> Using a password on the <span class="token builtin class-name">command</span> line interface can be insecure.
ERROR <span class="token number">1045</span> <span class="token punctuation">(</span><span class="token number">28000</span><span class="token punctuation">)</span>: Access denied <span class="token keyword">for</span> user <span class="token string">'rep'</span>@<span class="token string">'db01'</span> <span class="token punctuation">(</span>using password: YES<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用户名错误</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysql <span class="token parameter variable">-urepl</span> <span class="token parameter variable">-p123</span> <span class="token parameter variable">-h</span> <span class="token number">10.0</span>.0.52 <span class="token parameter variable">-P</span> <span class="token number">3307</span>
mysql: <span class="token punctuation">[</span>Warning<span class="token punctuation">]</span> Using a password on the <span class="token builtin class-name">command</span> line interface can be insecure.
ERROR <span class="token number">2003</span> <span class="token punctuation">(</span>HY000<span class="token punctuation">)</span>: Can<span class="token string">'t connect to MySQL server on '</span><span class="token number">10.0</span>.0.52' <span class="token punctuation">(</span><span class="token number">113</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ip地址错误</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysql <span class="token parameter variable">-urepl</span> <span class="token parameter variable">-p123</span> <span class="token parameter variable">-h</span> <span class="token number">10.0</span>.0.51 <span class="token parameter variable">-P</span> <span class="token number">3309</span>
mysql: <span class="token punctuation">[</span>Warning<span class="token punctuation">]</span> Using a password on the <span class="token builtin class-name">command</span> line interface can be insecure.
ERROR <span class="token number">2003</span> <span class="token punctuation">(</span>HY000<span class="token punctuation">)</span>: Can<span class="token string">'t connect to MySQL server on '</span><span class="token number">10.0</span>.0.51' <span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span>root@db01 data<span class="token punctuation">]</span><span class="token comment"># </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>端口错误</p>
<p>解决:</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>stop slave 
reset slave <span class="token keyword">all</span><span class="token punctuation">;</span> 清空 master<span class="token punctuation">.</span>info信息
change master <span class="token keyword">to</span> 
<span class="token keyword">start</span> slave
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(2) 请求Binlog</p>
<p>binlog 没开
binlog 损坏,不存在，不完整</p>
<p>主库 reset master 处理: （清理binlog日志）
从库</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>stop slave <span class="token punctuation">;</span>
reset slave <span class="token keyword">all</span><span class="token punctuation">;</span> 
CHANGE MASTER <span class="token keyword">TO</span> 
MASTER_HOST<span class="token operator">=</span><span class="token string">'10.0.0.51'</span><span class="token punctuation">,</span>
MASTER_USER<span class="token operator">=</span><span class="token string">'repl'</span><span class="token punctuation">,</span>
MASTER_PASSWORD<span class="token operator">=</span><span class="token string">'123'</span><span class="token punctuation">,</span>
MASTER_PORT<span class="token operator">=</span><span class="token number">3307</span><span class="token punctuation">,</span>
MASTER_LOG_FILE<span class="token operator">=</span><span class="token string">'mysql-bin.000001'</span><span class="token punctuation">,</span>
MASTER_LOG_POS<span class="token operator">=</span><span class="token number">154</span><span class="token punctuation">,</span>
MASTER_CONNECT_RETRY<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">start</span> slave<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(3) 存储binlog到relaylog</p>
<br>
<h4 id="_5-5-2-sql线程故障" tabindex="-1"><a class="header-anchor" href="#_5-5-2-sql线程故障" aria-hidden="true">#</a> 5.5.2 SQL线程故障</h4>
<ul>
<li>relay-log 损坏</li>
<li>回放 relaylog</li>
</ul>
<p><strong>实际上就是 研究一条SQL语句为什么执行失败</strong>?</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">delete</span>  <span class="token keyword">update</span>     <span class="token comment">---> t1 表 不存在</span>
<span class="token keyword">create</span> <span class="token keyword">table</span>  xin     <span class="token comment">--->  xin 已存在</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>约束冲突(主键,唯一键,非空..)</strong></p>
<p><strong>合理处理方法</strong>:
把握一个原则,一切以主库为准进行解决.
如果出现问题,尽量进行反操作
最直接稳妥办法,重新构建主从</p>
<p><strong>暴力的解决方法</strong>
方法一：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>stop slave<span class="token punctuation">;</span> 
<span class="token builtin class-name">set</span> global sql_slave_skip_counter <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
start slave<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>#将同步指针向下移动一个，如果多次不同步，可以重复操作。
start slave;</p>
<p>方法二： 直接写在配置文件里面 跳过以下错误</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>/etc/my.cnf
slave-skip-errors <span class="token operator">=</span> <span class="token number">1032,1062</span>,1007

<span class="token comment">#常见错误代码:</span>
<span class="token number">1007</span>:对象已存在
<span class="token number">1032</span>:无法执行DML
<span class="token number">1062</span>:主键冲突,或约束冲突
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，以上操作有时是有<strong>风险</strong>的，最安全的做法就是重新构建主从。把握一个原则,一切以主库为主.</p>
<br>
<p><strong>对于主键冲突问题</strong>：</p>
<p>错误的在从库插入的已有数据行的主键值重复导致主从不同步</p>
<p><strong>解决方法</strong>：找到主从两个数据库手动改为一致后 跳过</p>
<br>
<br>
<p><strong>为了很大程度的避免SQL线程故障</strong></p>
<p>(1) 从库只读</p>
<p><strong>read_only</strong>
<strong>super_read_only</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section8-1-2.png" alt="从库只读" tabindex="0" loading="lazy"><figcaption>从库只读</figcaption></figure>
<p>(2) 使用读写分离中间件</p>
<ul>
<li>atlas</li>
<li>mycat</li>
<li>ProxySQL</li>
<li>MaxScale</li>
</ul>
<p>写得数据发往主库，读的操作发往从库</p>
<h2 id="_6-主从延时监控及原因" tabindex="-1"><a class="header-anchor" href="#_6-主从延时监控及原因" aria-hidden="true">#</a> 6. 主从延时监控及原因</h2>
<h3 id="_6-1-主库方面原因" tabindex="-1"><a class="header-anchor" href="#_6-1-主库方面原因" aria-hidden="true">#</a> 6.1 主库方面原因</h3>
<p>(1) binlog写入不及时</p>
<p><code v-pre>sync_binlog=1</code> 直接刷写到磁盘</p>
<p>(2) 默认情况下dump_t 是串行传输 binlog
在并发事务量大时或者大事务,由于dump_t 是串型工作的,导致传送日志较慢</p>
<p>由于串行工作大事务导致阻塞会越堆越多</p>
<p><strong>如何解决问题</strong>?
必须GTID,使用<strong>Group commit</strong>方式.可以支持DUMP_T并行</p>
<p>(3) 主库极其繁忙
慢语句
锁等待
从库个数
网络延时</p>
<h3 id="_6-2-从库方面原因" tabindex="-1"><a class="header-anchor" href="#_6-2-从库方面原因" aria-hidden="true">#</a> 6.2 从库方面原因</h3>
<p>(1) 传统复制(Classic)中</p>
<p>主库并发事务，但是从库SQL还是单线程。</p>
<p>如果主库并发事务量很大,或者出现大事务
由于从库是单SQL线程,导致,不管传的日志有多少,只能一次执行一个事务.
5.6 版本,有了GTID,可以实现多SQL线程,但是只能基于不同库的事务进行并发回放.(database)  （不能保证同一库内事务无法保证顺序按一定逻辑顺序执行）</p>
<p>所以在 5.7 版本中,有了增强的GTID,增加了seq_no（通线程下的序列号码）标记,增加了新型的并发SQL线程模式(logical_clock),MTS技术   逻辑时钟</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section8-1-3.png" alt="从库的SQL工作线程" tabindex="0" loading="lazy"><figcaption>从库的SQL工作线程</figcaption></figure>
<p>从库的SQL工作线程</p>
<p>(2) 主从硬件差异太大
(3) 主从的参数配置
(4) 从库和主库的索引不一致
(5) 版本有差异</p>
<br>
<h2 id="_7-主从延时的监控" tabindex="-1"><a class="header-anchor" href="#_7-主从延时的监控" aria-hidden="true">#</a> 7. 主从延时的监控</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> slave  <span class="token keyword">status</span>\G
Seconds_Behind_Master: <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>主库方面原因的监控</strong></p>
<p><strong>主库</strong>: 传输了这些</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>mysql> show master status ;
File: mysql-bin.000001
Position: 1373
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>从库</strong>: 接收了这些</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>Master_Log_File: mysql<span class="token operator">-</span>bin<span class="token punctuation">.</span><span class="token number">000001</span>
Read_Master_Log_Pos: <span class="token number">1373</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>主库对应从库的Position 号是否一致</strong></p>
<p><strong>从库方面原因监控</strong>:</p>
<p>拿了多少:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Master_Log_File: mysql-bin.000001
Read_Master_Log_Pos: 691688
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>看的是binlaog  从库对应的Relay_log 号 找对应关系</p>
<p>执行了多少:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Relay_Log_File: db01-relay-bin.000004
Relay_Log_Pos: 690635
Exec_Master_Log_Pos: 691688
Relay_Log_Space: 690635
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


