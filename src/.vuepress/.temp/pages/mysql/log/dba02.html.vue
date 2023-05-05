<template><div><h1 id="体系结构及管理" tabindex="-1"><a class="header-anchor" href="#体系结构及管理" aria-hidden="true">#</a> 体系结构及管理</h1>
<h2 id="_1-mysql-c-s结构介绍" tabindex="-1"><a class="header-anchor" href="#_1-mysql-c-s结构介绍" aria-hidden="true">#</a> 1. MySQL C/S结构介绍</h2>
<br>
<p><strong>两种连接方式：</strong></p>
<p><strong>TCP/IP：</strong><code v-pre>mysql -uroot -xin123 -h 10.0.0.51 -P3306</code></p>
<p><strong>Socket：</strong><code v-pre>mysql -uroot -xin123 -S /tmp/mysql.sock</code></p>
<br>
<br>
<h2 id="_2-mysql实例的构成" tabindex="-1"><a class="header-anchor" href="#_2-mysql实例的构成" aria-hidden="true">#</a> 2. MySQL实例的构成</h2>
<br>
<p><strong>举例说明：</strong></p>
<p><strong>公司：</strong> 老板 + 经理 + 员工 + 办公区</p>
<p><strong>实例：</strong> mysqld + master thread + 干活的Thread + 预分配的内存</p>
<br>
<h2 id="_3-mysql中-mysqld-进程结构" tabindex="-1"><a class="header-anchor" href="#_3-mysql中-mysqld-进程结构" aria-hidden="true">#</a> 3. MySQL中 mysqld 进程结构</h2>
<br>
<h3 id="_3-1-sql语句引入" tabindex="-1"><a class="header-anchor" href="#_3-1-sql语句引入" aria-hidden="true">#</a> <strong>3.1 SQL语句引入</strong></h3>
<p><strong>结构化的查询语言:</strong></p>
<ul>
<li>DQL 数据查询语言</li>
<li>DDL 数据定义语言</li>
<li>DML 数据操作语言</li>
<li>DCL 数据控制语言</li>
</ul>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">select</span> <span class="token keyword">user</span><span class="token punctuation">,</span>host <span class="token keyword">from</span> mysql<span class="token punctuation">.</span><span class="token keyword">user</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<h3 id="_3-2-连接层" tabindex="-1"><a class="header-anchor" href="#_3-2-连接层" aria-hidden="true">#</a> <strong>3.2</strong> <strong>连接层</strong></h3>
<br>
<ol>
<li><strong>提供连接协议</strong> (两种方式)</li>
</ol>
<p>​      Socket</p>
<p>​      TCPIP</p>
<ol start="2">
<li>
<p>验证用户名（<code v-pre>root@localhost</code>）密码合法性，进行匹配专门的授权表。</p>
</li>
<li>
<p>派生一个专用连接线程（接收SQL，返回结果）</p>
</li>
</ol>
<p>​      使用命令  <code v-pre>mysql&gt; show processlist;</code> 查看</p>
<br>
<p><strong>思考：</strong></p>
<p><strong>忘记密码的参数在哪做的手脚？</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>--skip-grant-tables
--skip-networking
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_3-3-sql层-在优化方面至关重要" tabindex="-1"><a class="header-anchor" href="#_3-3-sql层-在优化方面至关重要" aria-hidden="true">#</a> 3.3 SQL层（在优化方面至关重要）</h3>
<br>
<ul>
<li>验证SQL语法和SQL_MODE</li>
<li>验证语义</li>
<li>验证权限</li>
<li>解析器进行语句解析，生成执行计划（解析树）</li>
<li>优化器（各种算法，基于执行代价），根据算法，找到代价最低的执行计划。代价是指：CPU 磁盘 IO</li>
<li>执行器按照优化器选择执行计划，执行SQL语句，得出获取数据的方法。</li>
<li>提供query cache(默认不开)，一般不开，会用redis</li>
<li>记录操作日志（binlog），默认没开</li>
</ul>
<br>
<h3 id="_3-4-存储引擎层" tabindex="-1"><a class="header-anchor" href="#_3-4-存储引擎层" aria-hidden="true">#</a> <strong>3.4</strong> <strong>存储引擎层</strong></h3>
<p><strong>真正和磁盘打交道的一个层次</strong></p>
<p>根据SQL层提供的取数据的方法，拿到数据，返回给SQL，结构化成表，再又连接层线程返回给用户。</p>
<br>
<h3 id="_3-5-mysql逻辑存储结构" tabindex="-1"><a class="header-anchor" href="#_3-5-mysql逻辑存储结构" aria-hidden="true">#</a> <strong>3.5 MySQL逻辑存储结构</strong></h3>
<br>
<p>数据库逻辑结构与操作系统结构对照表：</p>
<table>
<thead>
<tr>
<th><img width=115/>数据库逻辑结构<img width=115/></th>
<th style="text-align:center"><img width=115/>操作系统<img width=115/></th>
</tr>
</thead>
<tbody>
<tr>
<td>库</td>
<td style="text-align:center">Linux 目录</td>
</tr>
<tr>
<td>create database wordpress charset utf8mb4;</td>
<td style="text-align:center">mkdir /wordpress</td>
</tr>
<tr>
<td>show databases;</td>
<td style="text-align:center">ls /</td>
</tr>
<tr>
<td>use wordpress;</td>
<td style="text-align:center">cd /wordpress</td>
</tr>
<tr>
<td>表</td>
<td style="text-align:center">Linux 的文件</td>
</tr>
<tr>
<td>列（字段）</td>
<td style="text-align:center">无</td>
</tr>
<tr>
<td>列属性</td>
<td style="text-align:center">无</td>
</tr>
<tr>
<td>数据行（记录）</td>
<td style="text-align:center">Linux数据行</td>
</tr>
<tr>
<td>表属性（元数据）</td>
<td style="text-align:center">Linux 文件属性</td>
</tr>
</tbody>
</table>
<br>
<br>
<h3 id="_3-6-mysql物理存储结构" tabindex="-1"><a class="header-anchor" href="#_3-6-mysql物理存储结构" aria-hidden="true">#</a> <strong>3.6 MySQL物理存储结构</strong></h3>
<br>
<br>
<p><strong>库：</strong> 使用文件系统上的目录来表示</p>
<br>
<p><strong>表：</strong></p>
<ul>
<li><strong>MyISAM(类似ext2)</strong><br>
user.frm ： 存储的表结构（列，列属性）<br>
user.MYD : 存储的数据记录<br>
user.MYI ： 存储索引<br></li>
</ul>
<br>
<ul>
<li><strong>InnoDB(类似XFS)<br></strong>
time_zone.frm ： 存储的表结构（列，列属性）<br>
time_zone.ibd ： 存储的数据记录和索引<br>
ibdata1 : 数据字典信息<br></li>
</ul>
<br>
<h3 id="_3-7-innodb-段-区-页概念" tabindex="-1"><a class="header-anchor" href="#_3-7-innodb-段-区-页概念" aria-hidden="true">#</a> <strong>3.7 innodb</strong> 段 区 页概念</h3>
<br>
<ul>
<li>一般情况下（非分区表）</li>
<li>一个表就是一个段</li>
<li>一个段由多个区构成</li>
<li>一个区在（16k），64个连续的页，1M大小</li>
</ul>
<br>
<h2 id="_4-用户和权限管理" tabindex="-1"><a class="header-anchor" href="#_4-用户和权限管理" aria-hidden="true">#</a> 4. 用户和权限管理</h2>
<h3 id="_4-1作用" tabindex="-1"><a class="header-anchor" href="#_4-1作用" aria-hidden="true">#</a> 4.1作用</h3>
<br>
<ul>
<li>
<p>登录MySQL</p>
</li>
<li>
<p>管理MySQL</p>
<br>
</li>
</ul>
<h3 id="_4-2-用户的定义" tabindex="-1"><a class="header-anchor" href="#_4-2-用户的定义" aria-hidden="true">#</a> <strong>4.2</strong> 用户的定义</h3>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">--用户名@'白名单'</span>
wordpress<span class="token variable">@'%'</span>
wordpress<span class="token variable">@'localhost'</span>
wordpress<span class="token variable">@'127.0.0.1'</span>
wordpress<span class="token variable">@'10.0.0.%'</span>
wordpress<span class="token variable">@'10.0.0.5%'</span>
wordpress<span class="token variable">@'10.0.0.0/255.255.254.0'</span>
wordpress<span class="token variable">@'10.0.%'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_4-3-用户的操作" tabindex="-1"><a class="header-anchor" href="#_4-3-用户的操作" aria-hidden="true">#</a> 4.3 用户的操作</h3>
<h4 id="_4-3-1-创建用户" tabindex="-1"><a class="header-anchor" href="#_4-3-1-创建用户" aria-hidden="true">#</a> 4.3.1 创建用户</h4>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">create</span> <span class="token keyword">user</span> oldboy<span class="token variable">@'10.0.0.%'</span> identified <span class="token keyword">by</span> <span class="token string">'123'</span><span class="token punctuation">;</span>
Query OK<span class="token punctuation">,</span> <span class="token number">0</span> <span class="token keyword">rows</span> affected <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>说明：</strong></p>
<p>8.0以前，可以自动创建用户并授权</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">grant</span> <span class="token keyword">all</span> <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> oldguo<span class="token variable">@'10.0.0.%'</span> identified <span class="token keyword">by</span> <span class="token string">'123'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<h4 id="_4-3-2-查询用户" tabindex="-1"><a class="header-anchor" href="#_4-3-2-查询用户" aria-hidden="true">#</a> 4.3.2 查询用户</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">select</span> <span class="token keyword">user</span><span class="token punctuation">,</span>host <span class="token keyword">from</span> mysql<span class="token punctuation">.</span><span class="token keyword">user</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<h4 id="_4-3-3-修改用户密码" tabindex="-1"><a class="header-anchor" href="#_4-3-3-修改用户密码" aria-hidden="true">#</a> 4.3.3 修改用户密码</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">alter</span> <span class="token keyword">user</span> oldguo<span class="token variable">@'10.0.0.%'</span> identified <span class="token keyword">by</span> <span class="token string">'123456'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<h4 id="_4-3-4-删除用户" tabindex="-1"><a class="header-anchor" href="#_4-3-4-删除用户" aria-hidden="true">#</a> 4.3.4 删除用户</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">drop</span> <span class="token keyword">user</span> oldguo<span class="token variable">@'10.0.0.%'</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<h3 id="_4-4-权限管理" tabindex="-1"><a class="header-anchor" href="#_4-4-权限管理" aria-hidden="true">#</a> 4.4 权限管理</h3>
<h4 id="_4-4-1-权限列表" tabindex="-1"><a class="header-anchor" href="#_4-4-1-权限列表" aria-hidden="true">#</a> 4.4.1 权限列表</h4>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALL</span> 
<span class="token keyword">SELECT</span><span class="token punctuation">,</span><span class="token keyword">INSERT</span><span class="token punctuation">,</span> <span class="token keyword">UPDATE</span><span class="token punctuation">,</span> <span class="token keyword">DELETE</span><span class="token punctuation">,</span> <span class="token keyword">CREATE</span><span class="token punctuation">,</span> <span class="token keyword">DROP</span><span class="token punctuation">,</span> RELOAD<span class="token punctuation">,</span> <span class="token keyword">SHUTDOWN</span><span class="token punctuation">,</span> PROCESS<span class="token punctuation">,</span> <span class="token keyword">FILE</span><span class="token punctuation">,</span> <span class="token keyword">REFERENCES</span><span class="token punctuation">,</span> <span class="token keyword">INDEX</span><span class="token punctuation">,</span> <span class="token keyword">ALTER</span><span class="token punctuation">,</span> <span class="token keyword">SHOW</span> <span class="token keyword">DATABASES</span><span class="token punctuation">,</span> SUPER<span class="token punctuation">,</span> <span class="token keyword">CREATE</span> <span class="token keyword">TEMPORARY</span> <span class="token keyword">TABLES</span><span class="token punctuation">,</span> <span class="token keyword">LOCK</span> <span class="token keyword">TABLES</span><span class="token punctuation">,</span> <span class="token keyword">EXECUTE</span><span class="token punctuation">,</span> <span class="token keyword">REPLICATION</span> SLAVE<span class="token punctuation">,</span> <span class="token keyword">REPLICATION</span> CLIENT<span class="token punctuation">,</span> <span class="token keyword">CREATE</span> <span class="token keyword">VIEW</span><span class="token punctuation">,</span> <span class="token keyword">SHOW</span> <span class="token keyword">VIEW</span><span class="token punctuation">,</span> <span class="token keyword">CREATE</span> <span class="token keyword">ROUTINE</span><span class="token punctuation">,</span> <span class="token keyword">ALTER</span> <span class="token keyword">ROUTINE</span><span class="token punctuation">,</span> <span class="token keyword">CREATE</span> <span class="token keyword">USER</span><span class="token punctuation">,</span> EVENT<span class="token punctuation">,</span> <span class="token keyword">TRIGGER</span><span class="token punctuation">,</span> <span class="token keyword">CREATE</span> <span class="token keyword">TABLESPACE</span>
<span class="token keyword">with</span> <span class="token keyword">grant</span> <span class="token keyword">option</span> <span class="token comment">--授权管理权限</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br> 
<h4 id="_4-4-2-授权命令" tabindex="-1"><a class="header-anchor" href="#_4-4-2-授权命令" aria-hidden="true">#</a> 4.4.2 授权命令</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">grant</span> <span class="token keyword">all</span> <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> oldguo<span class="token variable">@'10.0.0.%'</span> identified <span class="token keyword">by</span> <span class="token string">'123'</span> <span class="token keyword">with</span> <span class="token keyword">grant</span> <span class="token keyword">option</span><span class="token punctuation">;</span>
 
<span class="token keyword">grant</span> 权限 <span class="token keyword">on</span> 作用目标 <span class="token keyword">to</span> 用户 identified <span class="token keyword">by</span> 密码 <span class="token keyword">with</span> <span class="token keyword">grant</span> <span class="token keyword">option</span><span class="token punctuation">;</span>
 
<span class="token keyword">grant</span> <span class="token keyword">SELECT</span><span class="token punctuation">,</span><span class="token keyword">INSERT</span><span class="token punctuation">,</span> <span class="token keyword">UPDATE</span><span class="token punctuation">,</span> <span class="token keyword">DELETE</span><span class="token punctuation">,</span> <span class="token keyword">CREATE</span> <span class="token keyword">on</span> wordpress<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> 
 
<span class="token comment">-- 作用目标:</span>
<span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span>
wordpress<span class="token punctuation">.</span><span class="token operator">*</span> 
worpress<span class="token punctuation">.</span>t1 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h4 id="_4-4-3-授权需求" tabindex="-1"><a class="header-anchor" href="#_4-4-3-授权需求" aria-hidden="true">#</a> 4.4.3 授权需求</h4>
<br>
<ol>
<li>创建一个管理员用户root，可以通过10网段，管理数据库.</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">grant</span> <span class="token keyword">all</span> <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> root<span class="token variable">@'10.0.0.%'</span> identified <span class="token keyword">by</span> <span class="token string">'123'</span> <span class="token keyword">with</span> <span class="token keyword">grant</span> <span class="token keyword">option</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>创建一个应用用户wordpress，可以通过10网段，wordpress库下的所有表进行 <code v-pre>SELECT,INSERT, UPDATE, DELETE</code> 操作</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">grant</span> <span class="token keyword">SELECT</span><span class="token punctuation">,</span><span class="token keyword">INSERT</span><span class="token punctuation">,</span> <span class="token keyword">UPDATE</span><span class="token punctuation">,</span> <span class="token keyword">DELETE</span> <span class="token keyword">on</span> wordpress<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> wordpress<span class="token variable">@'10.0.0.%'</span> identified <span class="token keyword">by</span> <span class="token string">'123'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<h4 id="_4-4-4-回收权限" tabindex="-1"><a class="header-anchor" href="#_4-4-4-回收权限" aria-hidden="true">#</a> 4.4.4 回收权限</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> grants <span class="token keyword">for</span> wordpress<span class="token variable">@'10.0.0.%'</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">revoke</span> <span class="token keyword">delete</span> <span class="token keyword">on</span> wordpress<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">'wordpress'</span><span class="token variable">@'10.0.0.%'</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">show</span> grants <span class="token keyword">for</span> wordpress<span class="token variable">@'10.0.0.%'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h4 id="_4-4-5-关于生产中开用户" tabindex="-1"><a class="header-anchor" href="#_4-4-5-关于生产中开用户" aria-hidden="true">#</a> 4.4.5 关于生产中开用户</h4>
<br>
<p><strong>如何沟通开用户</strong></p>
<ul>
<li>是否有邮件批复</li>
<li>对哪些库和表做操作</li>
<li>做什么操作</li>
<li>从什么地址来登录</li>
</ul>
<br>
<p><strong>开发人员找你要root用户密码？</strong></p>
<ul>
<li>走流程拒绝他</li>
<li>如果是金融类的公司</li>
</ul>
<br>
<br>
<ul>
<li><strong>原则上是不允许任何非DBA人员持有或申请root</strong></li>
<li><strong>如果有人私下索要root密码，及时举报。</strong></li>
</ul>
<br>
<br>
<h2 id="_5-mysql的启动和关闭" tabindex="-1"><a class="header-anchor" href="#_5-mysql的启动和关闭" aria-hidden="true">#</a> 5. MySQL的启动和关闭</h2>
<br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section2-2-1.png" alt="MySQL的启动和关闭" tabindex="0" loading="lazy"><figcaption>MySQL的启动和关闭</figcaption></figure>
<p><strong>把 mysql.server 拷贝到了 init.d下</strong></p>
<br>
<br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section2-2-2.png" alt="把 mysql.server 拷贝到了 init.d" tabindex="0" loading="lazy"><figcaption>把 mysql.server 拷贝到了 init.d</figcaption></figure>
<br>
<h3 id="_5-1-日常启停" tabindex="-1"><a class="header-anchor" href="#_5-1-日常启停" aria-hidden="true">#</a> 5.1 日常启停</h3>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>sys <span class="token operator">-</span>v 启动方式 mysql<span class="token punctuation">.</span>server <span class="token keyword">start</span> 脚本   启动过程：调用<span class="token comment">---> mysqld_safe --->启动实例 mysqld </span>
mysql<span class="token punctuation">.</span>service   <span class="token comment">---> mysqld 直接调用 mysqld 指定配置文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section2-2-3.png" alt="调用mysqld&quot;" tabindex="0" loading="lazy"><figcaption>调用mysqld&quot;</figcaption></figure>
<p>需要依赖于 <strong>/etc/my.cnf</strong></p>
<br>
<h3 id="_5-2-维护性的任务方式启动" tabindex="-1"><a class="header-anchor" href="#_5-2-维护性的任务方式启动" aria-hidden="true">#</a> 5.2 维护性的任务方式启动</h3>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysqld_safe <span class="token comment">--skip-grant-tables --skip-networking &amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<ul>
<li>
<p>启动时在命令行临时加入命令。</p>
</li>
<li>
<p>我们一般会将我们需要的参数临时加到命令行。也会读取<code v-pre>/etc/my.cnf</code> 的内容,但是如果冲突,命令行优先级最高。</p>
<br>
</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> mysqld_safe <span class="token operator">&amp;</span>
 mysqladmin <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123</span> <span class="token function">shutdown</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_5-3-初始化配置" tabindex="-1"><a class="header-anchor" href="#_5-3-初始化配置" aria-hidden="true">#</a> 5.3 初始化配置</h3>
<br>
<h4 id="_5-3-1-作用" tabindex="-1"><a class="header-anchor" href="#_5-3-1-作用" aria-hidden="true">#</a> 5.3.1 作用</h4>
<ul>
<li>影响数据库的启动</li>
<li>影响到客户端的功能</li>
</ul>
<br>
<h4 id="_5-3-2-初始化配置的方法" tabindex="-1"><a class="header-anchor" href="#_5-3-2-初始化配置的方法" aria-hidden="true">#</a> 5.3.2 初始化配置的方法</h4>
<br>
<ul>
<li>初始化配置文件(例如<code v-pre>/etc/my.cnf</code>)</li>
<li>启动命令行上进行设置(例如:<code v-pre>mysqld_safe mysqld</code>)</li>
<li>预编译时设置(仅限于编译安装时设置)
<br></li>
</ul>
<h4 id="_5-2-3-初始化配置文件的书写格式" tabindex="-1"><a class="header-anchor" href="#_5-2-3-初始化配置文件的书写格式" aria-hidden="true">#</a> 5.2.3 初始化配置文件的书写格式</h4>
<br>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>标签<span class="token punctuation">]</span>
<span class="token assign-left variable">xxx</span><span class="token operator">=</span>xxx
<span class="token punctuation">[</span>标签<span class="token punctuation">]</span>
<span class="token assign-left variable">xxx</span><span class="token operator">=</span>xxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h4 id="_5-2-4-配置文件标签的归类" tabindex="-1"><a class="header-anchor" href="#_5-2-4-配置文件标签的归类" aria-hidden="true">#</a> 5.2.4 配置文件标签的归类</h4>
<br>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">服务器端</span><span class="token punctuation">:</span>
<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token punctuation">[</span>mysqld_safe<span class="token punctuation">]</span>
<span class="token punctuation">[</span>server<span class="token punctuation">]</span>
 
<span class="token key atrule">客户端</span><span class="token punctuation">:</span> 
<span class="token punctuation">[</span>mysql<span class="token punctuation">]</span>
<span class="token punctuation">[</span>mysqladmin<span class="token punctuation">]</span>
<span class="token punctuation">[</span>mysqldump<span class="token punctuation">]</span>
<span class="token punctuation">[</span>client<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h4 id="_5-2-5-配置文件设置样板-5-7版本" tabindex="-1"><a class="header-anchor" href="#_5-2-5-配置文件设置样板-5-7版本" aria-hidden="true">#</a> 5.2.5 配置文件设置样板（5.7版本)</h4>
<br>
<p><strong>服务器端配置</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token comment">#用户</span>
<span class="token assign-left variable">user</span><span class="token operator">=</span>mysql  
<span class="token comment">#软件安装目录        </span>
<span class="token assign-left variable">basedir</span><span class="token operator">=</span>/application/mysql 
<span class="token comment">#数据路径</span>
<span class="token assign-left variable">datadir</span><span class="token operator">=</span>/data/mysql/data 
<span class="token comment">#socket文件位置</span>
<span class="token assign-left variable">socket</span><span class="token operator">=</span>/tmp/mysql.sock
<span class="token comment">#服务器id号 用于主备</span>
<span class="token assign-left variable">server_id</span><span class="token operator">=</span><span class="token number">6</span>
<span class="token comment">#端口号</span>
<span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">3306</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>客户端配置</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>mysql<span class="token punctuation">]</span>
<span class="token comment">#socket文件位置</span>
<span class="token assign-left variable">socket</span><span class="token operator">=</span>/tmp/mysql.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_5-4-配置文件读取顺序" tabindex="-1"><a class="header-anchor" href="#_5-4-配置文件读取顺序" aria-hidden="true">#</a> 5.4 配置文件读取顺序</h3>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysqld <span class="token comment">--help --verbose |grep my.cnf</span>
<span class="token operator">/</span>etc<span class="token operator">/</span>my<span class="token punctuation">.</span>cnf <span class="token operator">/</span>etc<span class="token operator">/</span>mysql<span class="token operator">/</span>my<span class="token punctuation">.</span>cnf <span class="token operator">/</span>usr<span class="token operator">/</span><span class="token keyword">local</span><span class="token operator">/</span>mysql<span class="token operator">/</span>etc<span class="token operator">/</span>my<span class="token punctuation">.</span>cnf <span class="token operator">~</span><span class="token operator">/</span><span class="token punctuation">.</span>my<span class="token punctuation">.</span>cnf 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>强制使用自定义配置文件</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">--defautls-file </span>
mysqld_safe <span class="token comment">--defaults-file=/tmp/aa.txt &amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_5-5-mysql的连接管理" tabindex="-1"><a class="header-anchor" href="#_5-5-mysql的连接管理" aria-hidden="true">#</a> 5.5 MySQL的连接管理</h3>
<br>
<h4 id="_5-5-1-mysql-命令" tabindex="-1"><a class="header-anchor" href="#_5-5-1-mysql-命令" aria-hidden="true">#</a> 5.5.1 mysql 命令</h4>
<br>
<p><strong>注意:提前应该将用户授权做好</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">grant</span> <span class="token keyword">all</span> <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> root<span class="token variable">@'10.0.0.%'</span> identified <span class="token keyword">by</span> <span class="token string">'123'</span><span class="token punctuation">;</span>
TCPIP :
mysql <span class="token operator">-</span>uroot <span class="token operator">-</span>p <span class="token operator">-</span>h <span class="token number">10.0</span><span class="token number">.0</span><span class="token number">.51</span> <span class="token operator">-</span>P3306 
Socket 
mysql <span class="token operator">-</span>uroot <span class="token operator">-</span>p <span class="token operator">-</span>S <span class="token operator">/</span>tmp<span class="token operator">/</span>mysql<span class="token punctuation">.</span>sock
<span class="token keyword">show</span> processlist<span class="token punctuation">;</span> 查看登录情况
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h4 id="_5-5-2-客户端工具" tabindex="-1"><a class="header-anchor" href="#_5-5-2-客户端工具" aria-hidden="true">#</a> 5.5.2 客户端工具</h4>
<ul>
<li><strong>sqlyog</strong></li>
<li><strong>navicat</strong></li>
</ul>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section2-2-4.png" alt="客户端工具" loading="lazy">
<br></p>
<br>
<h2 id="_6-多实例管理" tabindex="-1"><a class="header-anchor" href="#_6-多实例管理" aria-hidden="true">#</a> 6. 多实例管理</h2>
<br>
<h3 id="_6-1-准备环境" tabindex="-1"><a class="header-anchor" href="#_6-1-准备环境" aria-hidden="true">#</a> 6.1 准备环境</h3>
<br>
<p><strong>准备多个目录</strong></p>
<br>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/330<span class="token punctuation">{</span><span class="token number">7,8</span>,9<span class="token punctuation">}</span>/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<p><strong>准备多个配置文件</strong></p>
<br>
<p><strong>实例一配置文件</strong></p>
<div class="language-php line-numbers-mode" data-ext="php"><pre v-pre class="language-php"><code>cat <span class="token operator">></span> <span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3307</span><span class="token operator">/</span>my<span class="token operator">.</span>cnf <span class="token operator">&lt;&lt;</span><span class="token constant">EOF</span>

<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>

basedir<span class="token operator">=</span><span class="token operator">/</span>application<span class="token operator">/</span>mysql

datadir<span class="token operator">=</span><span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3307</span><span class="token operator">/</span>data

socket<span class="token operator">=</span><span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3307</span><span class="token operator">/</span>mysql<span class="token operator">.</span>sock

log_error<span class="token operator">=</span><span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3307</span><span class="token operator">/</span>mysql<span class="token operator">.</span>log

port<span class="token operator">=</span><span class="token number">3307</span>

server_id<span class="token operator">=</span><span class="token number">7</span>

log_bin<span class="token operator">=</span><span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3307</span><span class="token operator">/</span>mysql<span class="token operator">-</span>bin

<span class="token constant">EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>实例二配置文件</strong></p>
<div class="language-php line-numbers-mode" data-ext="php"><pre v-pre class="language-php"><code>cat <span class="token operator">></span> <span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3308</span><span class="token operator">/</span>my<span class="token operator">.</span>cnf <span class="token operator">&lt;&lt;</span><span class="token constant">EOF</span>

<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>

basedir<span class="token operator">=</span><span class="token operator">/</span>application<span class="token operator">/</span>mysql

datadir<span class="token operator">=</span><span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3308</span><span class="token operator">/</span>data

socket<span class="token operator">=</span><span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3308</span><span class="token operator">/</span>mysql<span class="token operator">.</span>sock

log_error<span class="token operator">=</span><span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3308</span><span class="token operator">/</span>mysql<span class="token operator">.</span>log

port<span class="token operator">=</span><span class="token number">3308</span>

server_id<span class="token operator">=</span><span class="token number">8</span>

log_bin<span class="token operator">=</span><span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3308</span><span class="token operator">/</span>mysql<span class="token operator">-</span>bin

<span class="token constant">EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>实例三配置文件</strong></p>
<div class="language-php line-numbers-mode" data-ext="php"><pre v-pre class="language-php"><code>实例三配置文件 

cat <span class="token operator">></span> <span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3309</span><span class="token operator">/</span>my<span class="token operator">.</span>cnf <span class="token operator">&lt;&lt;</span><span class="token constant">EOF</span>

<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>

basedir<span class="token operator">=</span><span class="token operator">/</span>application<span class="token operator">/</span>mysql

datadir<span class="token operator">=</span><span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3309</span><span class="token operator">/</span>data

socket<span class="token operator">=</span><span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3309</span><span class="token operator">/</span>mysql<span class="token operator">.</span>sock

log_error<span class="token operator">=</span><span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3309</span><span class="token operator">/</span>mysql<span class="token operator">.</span>log

port<span class="token operator">=</span><span class="token number">3309</span>

server_id<span class="token operator">=</span><span class="token number">9</span>

log_bin<span class="token operator">=</span><span class="token operator">/</span>data<span class="token operator">/</span><span class="token number">3309</span><span class="token operator">/</span>mysql<span class="token operator">-</span>bin

<span class="token constant">EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_6-2-初始化三套数据" tabindex="-1"><a class="header-anchor" href="#_6-2-初始化三套数据" aria-hidden="true">#</a> 6.2 初始化三套数据</h3>
<br>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mv</span> /etc/my.cnf /etc/my.cnf.bak
mysqld --initialize-insecure <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql <span class="token parameter variable">--datadir</span><span class="token operator">=</span>/data/3307/data <span class="token parameter variable">--basedir</span><span class="token operator">=</span>/application/mysql
mysqld --initialize-insecure <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql <span class="token parameter variable">--datadir</span><span class="token operator">=</span>/data/3308/data <span class="token parameter variable">--basedir</span><span class="token operator">=</span>/application/mysql
mysqld --initialize-insecure <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql <span class="token parameter variable">--datadir</span><span class="token operator">=</span>/data/3309/data <span class="token parameter variable">--basedir</span><span class="token operator">=</span>/application/mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_6-3-systemd-命令管理多实例" tabindex="-1"><a class="header-anchor" href="#_6-3-systemd-命令管理多实例" aria-hidden="true">#</a> 6.3 Systemd 命令管理多实例</h3>
<br>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /etc/systemd/system

<span class="token function">cp</span> mysqld.service mysqld3307.service

<span class="token function">cp</span> mysqld.service mysqld3308.service

<span class="token function">cp</span> mysqld.service mysqld3309.service

 

<span class="token function">vim</span> mysqld3307.service

<span class="token comment"># 修改为:</span>

<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/application/mysql/bin/mysqld --defaults-file<span class="token operator">=</span>/data/3307/my.cnf

<span class="token function">vim</span> mysqld3308.service

<span class="token comment"># 修改为:</span>

<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/application/mysql/bin/mysqld --defaults-file<span class="token operator">=</span>/data/3308/my.cnf

<span class="token function">vim</span> mysqld3309.service

<span class="token comment"># 修改为:</span>

<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/application/mysql/bin/mysqld --defaults-file<span class="token operator">=</span>/data/3309/my.cnf


<span class="token punctuation">[</span>root@db01 system<span class="token punctuation">]</span><span class="token comment"># grep "ExecStart" mysqld3309.service</span>

<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/application/mysql/bin/mysqld --defaults-file<span class="token operator">=</span>/data/3309/my.cnf

<span class="token punctuation">[</span>root@db01 system<span class="token punctuation">]</span><span class="token comment"># grep "ExecStart" mysqld3308.service</span>

<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/application/mysql/bin/mysqld --defaults-file<span class="token operator">=</span>/data/3308/my.cnf

<span class="token punctuation">[</span>root@db01 system<span class="token punctuation">]</span><span class="token comment"># grep "ExecStart" mysqld3307.service</span>

<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/application/mysql/bin/mysqld --defaults-file<span class="token operator">=</span>/data/3307/my.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>对目录授权</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql.mysql /data/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<h3 id="_6-4-启动多实例" tabindex="-1"><a class="header-anchor" href="#_6-4-启动多实例" aria-hidden="true">#</a> 6.4 启动多实例</h3>
<br>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl start mysqld3307.service
systemctl start mysqld3308.service
systemctl start mysqld3309.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p><strong>验证多实例</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">netstat</span> -lnp<span class="token operator">|</span><span class="token function">grep</span> <span class="token number">330</span>

mysql <span class="token parameter variable">-S</span> /data/3307/mysql.sock <span class="token parameter variable">-e</span> <span class="token string">"select @@server_id"</span>
mysql <span class="token parameter variable">-S</span> /data/3308/mysql.sock <span class="token parameter variable">-e</span> <span class="token string">"select @@server_id"</span>
mysql <span class="token parameter variable">-S</span> /data/3309/mysql.sock <span class="token parameter variable">-e</span> <span class="token string">"select @@server_id"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


