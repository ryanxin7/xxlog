<template><div><h1 id="常用日志文件类型介绍" tabindex="-1"><a class="header-anchor" href="#常用日志文件类型介绍" aria-hidden="true">#</a> 常用日志文件类型介绍</h1>
<h2 id="日志管理" tabindex="-1"><a class="header-anchor" href="#日志管理" aria-hidden="true">#</a> 日志管理</h2>
<br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1.png" alt="日志管理1" tabindex="0" loading="lazy"><figcaption>日志管理1</figcaption></figure>
<br>
<ul>
<li>错误日志是用来拍错</li>
<li>慢速查询用来调优</li>
<li>二进制日志恢复数据另外与主从复制相关</li>
</ul>
<br>
<h3 id="_1-错误日志" tabindex="-1"><a class="header-anchor" href="#_1-错误日志" aria-hidden="true">#</a> <strong>1. 错误日志</strong></h3>
<h4 id="_1-1-作用" tabindex="-1"><a class="header-anchor" href="#_1-1-作用" aria-hidden="true">#</a> 1.1 作用</h4>
<p>用来排查 MySQL 服务运行过程中的故障。</p>
<br>
<br>
<h4 id="_1-2-默认配置" tabindex="-1"><a class="header-anchor" href="#_1-2-默认配置" aria-hidden="true">#</a> 1.2 默认配置</h4>
<p><strong>默认开启</strong></p>
<p><strong>默认路径和名字</strong>: <code v-pre>datadir/hostname.err</code></p>
<p><strong>查看方法</strong>: <code v-pre>[ERROR]</code> 重点关注</p>
<br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-2.png" alt="日志管理2" tabindex="0" loading="lazy"><figcaption>日志管理2</figcaption></figure>
<br>
<h4 id="_1-3-自定义日志存储位置" tabindex="-1"><a class="header-anchor" href="#_1-3-自定义日志存储位置" aria-hidden="true">#</a> 1.3 自定义日志存储位置</h4>
<p>建议异地存放，日志位置和数据存储分开，避免目录磁盘坏了时日志文件也丢失了可能导致无法恢复。</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-3.png" alt="日志管理3" tabindex="0" loading="lazy"><figcaption>日志管理3</figcaption></figure>
<p><code v-pre>vim /etc/my.cnf</code>  添加到配置文件</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-4.png" alt="日志管理4" tabindex="0" loading="lazy"><figcaption>日志管理4</figcaption></figure>
<p>可以看到已经有这个文件了</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-5.png" alt="日志管理5" tabindex="0" loading="lazy"><figcaption>日志管理5</figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>log_error<span class="token operator">=</span><span class="token operator">/</span>tmp<span class="token operator">/</span>mysql3306<span class="token punctuation">.</span>log <span class="token comment">-- 重启生效</span>
<span class="token keyword">select</span> @<span class="token variable">@log_error</span><span class="token punctuation">;</span> <span class="token comment">--查询错误日志位置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<ol>
<li>
<h3 id="二进制日志-重要知识点" tabindex="-1"><a class="header-anchor" href="#二进制日志-重要知识点" aria-hidden="true">#</a> 二进制日志（重要知识点🌟）</h3>
</li>
</ol>
<br>
<h4 id="_2-1-作用" tabindex="-1"><a class="header-anchor" href="#_2-1-作用" aria-hidden="true">#</a> 2.1 作用</h4>
<ul>
<li>部署主从复制依赖二进制日志</li>
<li>数据恢复时需要依赖于二进制日志</li>
</ul>
<h3 id="_2-2-如何配置" tabindex="-1"><a class="header-anchor" href="#_2-2-如何配置" aria-hidden="true">#</a> 2.2 如何配置？</h3>
<p>(1) 参数介绍</p>
<p>默认没有开启需要手动定义开启。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">server_id</span><span class="token operator">=</span><span class="token number">6</span>    一共65535
<span class="token assign-left variable">log_bin</span><span class="token operator">=</span>/data/binlog/mysql-bin  设置二进制日志的位置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>说明</strong>：</p>
<p><code v-pre>/data/binlog</code> : 提前定制好的目录, 而且要有<code v-pre>mysql.mysql</code> 的权限
<code v-pre>mysql-bin</code> 	 : 二进制日志文件名的前缀
例如: <code v-pre>mysql-bin.000001</code>  ,<code v-pre>mysql-bin.000002</code> ......</p>
<p>(2) 参数配置</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">server_id</span><span class="token operator">=</span><span class="token number">6</span>
<span class="token assign-left variable">log_bin</span><span class="token operator">=</span>/data/binlog/mysql-bin
<span class="token assign-left variable">binlog_format</span><span class="token operator">=</span>row
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(3) 创建目录和授权</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/binlog/
<span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql.mysql /data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>(4)重启生效</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 tmp<span class="token punctuation">]</span><span class="token comment"># /etc/init.d/mysqld restart</span>
Shutting down MySQL<span class="token punctuation">..</span> SUCCESS<span class="token operator">!</span> 
Starting MySQL. SUCCESS<span class="token operator">!</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_3-二进制文件记录了什么" tabindex="-1"><a class="header-anchor" href="#_3-二进制文件记录了什么" aria-hidden="true">#</a> 3. 二进制文件记录了什么？</h3>
<h4 id="_3-1-概括" tabindex="-1"><a class="header-anchor" href="#_3-1-概括" aria-hidden="true">#</a> 3.1 概括</h4>
<p>记录的数据库所有变更类的操作日志  如：</p>
<ul>
<li>DDL 以语句的方式,原模原样的记录.</li>
<li>DCL 以语句的方式,原模原样的记录.</li>
<li>DML insert  update delete 操作 （记录的已提交的事务DML语句）</li>
</ul>
<p>DML记录格式(statement,row,mixed),通过<code v-pre>binlog_format=row</code>参数控制</p>
<br>
<p><strong>说明:</strong></p>
<ul>
<li><strong>statement</strong>:SBR,语句模式记录日志,做什么命令,记录什么命令.</li>
<li><strong>row</strong>  :RBR,行模式, 记录数据行的变化 记录数据行 由A=1 变成 A=2的变化过程 redo是记录数据页的变化</li>
<li><strong>mixed</strong>:MBR,混合模式由MySQL自己调整决定用那种模式 。 一般不用</li>
</ul>
<br>
<p><strong>面试问题:</strong> SBR和RBR什么区别?  怎么选择?</p>
<p><strong>SBR</strong>:  可读性较强,对于范围操作日志量少,但是可能会出现记录不准确的情况.</p>
<p><strong>如</strong>：<code v-pre>update t1 set name='zs'  where id &gt; 5</code> 对五行数据进行修改，但只记录命令。</p>
<p><code v-pre>instart into t1 values （1，'zs',now()）</code>; 时间列录入时是以前的时间，有可能出现记录不准确问题</p>
<br>
<p><strong>RBR</strong>:  可读性较弱,对于范围操作日志大,不会出现记录错误.</p>
<p>高可用环境中的新特性要依赖于RBR</p>
<p><strong>如</strong>：同一个语句要记录5行操作  哪一行变动了就记录几行</p>
<p>我们公司对数据的严谨性要求较高,也用用到了新型的架构,所以选择RBR。</p>
<br>
<br>
<h3 id="_4-二进制日志记录单元" tabindex="-1"><a class="header-anchor" href="#_4-二进制日志记录单元" aria-hidden="true">#</a> 4  二进制日志记录单元</h3>
<h4 id="_4-1-event-事件" tabindex="-1"><a class="header-anchor" href="#_4-1-event-事件" aria-hidden="true">#</a> 4.1 event 事件</h4>
<p>二进制日志的最小单元</p>
<br>
<p><strong>如</strong>：DDL   <code v-pre>create database xin;</code>  事件1</p>
<p>对于DDL等语句是每一个语句就是一个事件</p>
<br>
<p>而 DML: 一个事务包含了多个语句</p>
<p><code v-pre>begin;</code>     事件1
<code v-pre>a</code> 			事件2
<code v-pre>b</code>			 事件3
<code v-pre>commit;</code>   事件4</p>
<br>
<h4 id="_4-2-event-事件的开始和结束位置" tabindex="-1"><a class="header-anchor" href="#_4-2-event-事件的开始和结束位置" aria-hidden="true">#</a> 4.2 event 事件的开始和结束位置</h4>
<p>方便我们从日志中截取我们想要的日志事件.</p>
<br>
<br>
<h3 id="_5-二进制日志的管理" tabindex="-1"><a class="header-anchor" href="#_5-二进制日志的管理" aria-hidden="true">#</a> 5. 二进制日志的管理</h3>
<h4 id="_5-1-查看二进制日志存储位置" tabindex="-1"><a class="header-anchor" href="#_5-1-查看二进制日志存储位置" aria-hidden="true">#</a> 5.1 查看二进制日志存储位置</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">'%log_bin%'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-6.png" alt="Section6-1-6.png" tabindex="0" loading="lazy"><figcaption>Section6-1-6.png</figcaption></figure>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-7.png" alt="Section6-1-7.png" loading="lazy">
<br></p>
<h4 id="_5-2-查看所有已存在的二进制日志" tabindex="-1"><a class="header-anchor" href="#_5-2-查看所有已存在的二进制日志" aria-hidden="true">#</a> 5.2 查看所有已存在的二进制日志</h4>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> <span class="token keyword">binary</span> logs<span class="token punctuation">;</span>
flush logs<span class="token punctuation">;</span> <span class="token comment">--滚动一个新的日志</span>
<span class="token keyword">show</span> <span class="token keyword">binary</span> logs<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-8.png" alt="Section6-1-8.png" tabindex="0" loading="lazy"><figcaption>Section6-1-8.png</figcaption></figure>
<br>
<p><strong>查看正在使用的二进制日志</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">show</span> master <span class="token keyword">status</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-9.png" alt="Section6-1-9.png" loading="lazy">
<br></p>
<p><strong>查看二进制日志事件</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>模拟建表操作
mysql<span class="token operator">></span> <span class="token keyword">create</span> <span class="token keyword">database</span> binlog <span class="token keyword">charset</span> utf8mb4<span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">use</span> binlog
mysql<span class="token operator">></span> <span class="token keyword">create</span> <span class="token keyword">table</span> t1<span class="token punctuation">(</span>id <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">insert</span> <span class="token keyword">into</span> t1 <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🛠️注意：二进制日志只记录事务提交后的日志</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">show</span> master <span class="token keyword">status</span> <span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">------------------+----------+--------------+------------------+-------------------+</span>
<span class="token operator">|</span> <span class="token keyword">File</span>       <span class="token operator">|</span> Position <span class="token operator">|</span> Binlog_Do_DB <span class="token operator">|</span> Binlog_Ignore_DB <span class="token operator">|</span> Executed_Gtid_Set <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">------------------+----------+--------------+------------------+-------------------+</span>
<span class="token operator">|</span> mysql<span class="token operator">-</span>bin<span class="token punctuation">.</span><span class="token number">000004</span> <span class="token operator">|</span>   <span class="token number">501</span> <span class="token operator">|</span>       <span class="token operator">|</span>         <span class="token operator">|</span>          <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">------------------+----------+--------------+------------------+-------------------+</span>
<span class="token number">1</span> <span class="token keyword">row</span> <span class="token operator">in</span> <span class="token keyword">set</span> <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看日志：</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">show</span> binlog events <span class="token operator">in</span> <span class="token string">'mysql-bin.000004'</span> <span class="token keyword">limit</span> <span class="token number">5</span><span class="token punctuation">;</span> 只看前五行内容
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>前两行为二进制文件的头部格式信息何版本信息</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-10.png" alt="Section6-1-10.png" tabindex="0" loading="lazy"><figcaption>Section6-1-10.png</figcaption></figure>
<p>经过查找从第三行开始</p>
<p>根据Position号码截取事务 219-335 标识事务开始位置和结束位置</p>
<p>只记录事务提交后的日志提交后：</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-11.png" alt="Section6-1-11.png" tabindex="0" loading="lazy"><figcaption>Section6-1-11.png</figcaption></figure>
<h4 id="_5-3-查看二进制文件内容" tabindex="-1"><a class="header-anchor" href="#_5-3-查看二进制文件内容" aria-hidden="true">#</a> 5.3 <strong>查看二进制文件内容</strong></h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysqlbinlog mysql-bin.000004 <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token string">'^SET'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-12.png" alt="Section6-1-12.png" tabindex="0" loading="lazy"><figcaption>Section6-1-12.png</figcaption></figure>
<p><strong>翻译一下：</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysqlbinlog --base64-output<span class="token operator">=</span>decode-rows <span class="token parameter variable">-vvv</span> mysql-bin.000004 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>sssss</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-13.png" alt="Section6-1-13.png" tabindex="0" loading="lazy"><figcaption>Section6-1-13.png</figcaption></figure>
<p>意思是 在1号列插入值1</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysqlbinlog <span class="token parameter variable">-d</span> haoge mysql-bin.000004 按库过滤日志 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<h4 id="_5-4-截取二进制日志" tabindex="-1"><a class="header-anchor" href="#_5-4-截取二进制日志" aria-hidden="true">#</a> 5.4 截取二进制日志</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 binlog<span class="token punctuation">]</span><span class="token comment"># mysqlbinlog --start-position=219 --stop-position=335 mysql-bin.000004 >/tmp/a.sql</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<h4 id="_5-5-通过binlog恢复数据" tabindex="-1"><a class="header-anchor" href="#_5-5-通过binlog恢复数据" aria-hidden="true">#</a> 5.5 通过binlog恢复数据</h4>
<p>只要二进制日志全就会恢复任何时间点的数据，因为记录日志还做一遍就恢复了</p>
<p><strong>(1) 模拟数据</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">create</span> <span class="token keyword">database</span> test11 <span class="token keyword">charset</span> utf8mb4<span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">use</span> haoge<span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">create</span> <span class="token keyword">table</span> t1<span class="token punctuation">(</span>id <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">insert</span> <span class="token keyword">into</span> t1 <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">commit</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>(2)模拟故障</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">drop</span> <span class="token keyword">database</span> test11<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>(3)分析和截取 binlog</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">show</span> master <span class="token keyword">status</span> <span class="token punctuation">;</span>    		<span class="token comment">--->确认使用的是哪一个日志 确认是004号日志文件</span>
mysql<span class="token operator">></span> <span class="token keyword">show</span> binlog events <span class="token operator">in</span> <span class="token string">'mysql-bin.000004'</span> <span class="token punctuation">;</span>   <span class="token comment">--->查看事件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-14.png" alt="日志截取" tabindex="0" loading="lazy"><figcaption>日志截取</figcaption></figure>
<p><strong>说明:</strong> 找到起点和终点,进行截取</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysqlbinlog --start-position<span class="token operator">=</span><span class="token number">823</span> --stop-position<span class="token operator">=</span><span class="token number">1420</span> /data/binlog/mysql-bin.000004 <span class="token operator">></span>/tmp/bin.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-15.png" alt="日志截取2" tabindex="0" loading="lazy"><figcaption>日志截取2</figcaption></figure>
<p><strong>(4) 恢复binlog</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">set</span> sql_log_bin<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>    <span class="token comment">--->在此会话中临时关闭二进制日志    避免恢复时产生的新日志</span>
mysql<span class="token operator">></span> source <span class="token operator">/</span>tmp<span class="token operator">/</span>bin<span class="token punctuation">.</span><span class="token keyword">sql</span>
mysql<span class="token operator">></span> <span class="token keyword">set</span> sql_log_bin<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token keyword">set</span> sql_log_bin<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>    <span class="token comment">--->改回来</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-16.png" alt="日志截取" tabindex="0" loading="lazy"><figcaption>日志截取</figcaption></figure>
<p><strong>问题来了， 如果业务跑了两年了，怎么找日志？</strong></p>
<p>二进制虽然可以数据恢复，但是它的功能性上是有缺陷的导致它只能作为数据恢复的辅助手段</p>
<p><strong>如</strong>： 全备份 +二进制日志恢复，先找到最新的全备份然后在用二进制日志恢复到今天的数据就行。</p>
<br>
<br>
<h3 id="_6-gtid-记录模式管理" tabindex="-1"><a class="header-anchor" href="#_6-gtid-记录模式管理" aria-hidden="true">#</a> 6. GTID 记录模式管理  ⭐</h3>
<h4 id="_6-1-gtid-介绍" tabindex="-1"><a class="header-anchor" href="#_6-1-gtid-介绍" aria-hidden="true">#</a> 6.1 GTID 介绍</h4>
<ul>
<li>
<p>对于binlog中的每一个事务,都会生成一个GTID号码</p>
</li>
<li>
<p>DDL ,DCL 一个event就是一个事务,就会有一个GTID号.</p>
</li>
<li>
<p>DML语句来讲,begin到commit,是一个事务,就是一个GTID号</p>
</li>
</ul>
<br>
<h4 id="_6-2-gtid的组成" tabindex="-1"><a class="header-anchor" href="#_6-2-gtid的组成" aria-hidden="true">#</a> <strong>6.2 GTID的组成</strong></h4>
<p>由两部分组成
<strong>severi_uuid:TID</strong> 事务的号码</p>
<p><strong>severi_uuid</strong> 在 <code v-pre>auto.cnf</code> 中查看</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 data<span class="token punctuation">]</span><span class="token comment"># cat auto.cnf </span>
<span class="token punctuation">[</span>auto<span class="token punctuation">]</span>
server-uuid<span class="token operator">=</span>d60b549f-9e10-11e9-ab04-000c294a1b3b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**TID **是一个自增长的数据,从1开始  如：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>d60b549f-9e10-11e9-ab04-000c294a1b3b:1-15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<br>
<h4 id="_6-3-gtid的幂等性" tabindex="-1"><a class="header-anchor" href="#_6-3-gtid的幂等性" aria-hidden="true">#</a> 6.3 GTID的幂等性</h4>
<p>如果拿有GTID的日志去恢复时,检查当前系统中是否有相同GTID号,有相同的就自动跳过</p>
<p>同Ansible剧本跳过同理会影响到binlog恢复和主从复制。</p>
<br>
<br>
<h4 id="_6-4-gtid的开启和配置" tabindex="-1"><a class="header-anchor" href="#_6-4-gtid的开启和配置" aria-hidden="true">#</a> 6.4 GTID的开启和配置</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/my.cnf
gtid-mode<span class="token operator">=</span>on
enforce-gtid-consistency<span class="token operator">=</span>true 强制gtid一致性
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-17.png" alt="GTID" tabindex="0" loading="lazy"><figcaption>GTID</figcaption></figure>
<p><strong>注意</strong>：开启后止影响以后的事务 以前的管不着</p>
<br>
<h4 id="_6-5-查看gtid信息" tabindex="-1"><a class="header-anchor" href="#_6-5-查看gtid信息" aria-hidden="true">#</a> 6.5 查看GTID信息</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">create</span> <span class="token keyword">database</span> gtid <span class="token keyword">charset</span> utf8mb4<span class="token punctuation">;</span> 创建一个库
mysql<span class="token operator">></span> <span class="token keyword">show</span> master <span class="token keyword">status</span><span class="token punctuation">;</span> 查看gtid号码 已经产生gtid
mysql<span class="token operator">></span> <span class="token keyword">use</span> gtid<span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">create</span> <span class="token keyword">table</span> t1<span class="token punctuation">(</span>id <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 创建一个表
mysql<span class="token operator">></span> <span class="token keyword">show</span> master <span class="token keyword">status</span><span class="token punctuation">;</span>  查看gtid号码 已经产生gtid <span class="token number">1</span><span class="token operator">-</span><span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-18.png" alt="GTID2" tabindex="0" loading="lazy"><figcaption>GTID2</figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">insert</span> <span class="token keyword">into</span> t1 <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">commit</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">show</span> master <span class="token keyword">status</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提交之后才算一个事务</strong></p>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-19.png" alt="GTID3" loading="lazy">
<br></p>
<p><strong>开了GTID 后的日志信息</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">show</span> binlog events <span class="token operator">in</span> <span class="token string">'mysql-bin.000005'</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-20.png" alt="GTID3" tabindex="0" loading="lazy"><figcaption>GTID3</figcaption></figure>
<br>
<br>
<h3 id="_7-基于gtid-恢复数据" tabindex="-1"><a class="header-anchor" href="#_7-基于gtid-恢复数据" aria-hidden="true">#</a> 7. 基于GTID 恢复数据</h3>
<p>开启GTID 后只需截取GTID日志就可以了，GTID是全局事务唯一标号。</p>
<br>
<h4 id="_7-1-截取日志" tabindex="-1"><a class="header-anchor" href="#_7-1-截取日志" aria-hidden="true">#</a> 7.1 <strong>截取日志</strong></h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 data<span class="token punctuation">]</span><span class="token comment"># cd /data/binlog/</span>
<span class="token punctuation">[</span>root@db01 binlog<span class="token punctuation">]</span><span class="token comment"># mysqlbinlog --include-gtids='d60b549f-9e10-11e9-ab04-000c294a1b3b:1-3' mysql-bin.000005 >/tmp/gtid.sql</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h4 id="_7-2-恢复数据" tabindex="-1"><a class="header-anchor" href="#_7-2-恢复数据" aria-hidden="true">#</a> 7.2 恢复数据</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">set</span> sql_log_bin<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> 暂时关闭日志
mysql<span class="token operator">></span> source <span class="token operator">/</span>tmp<span class="token operator">/</span>gtid<span class="token punctuation">.</span><span class="token keyword">sql</span> 恢复
mysql<span class="token operator">></span> <span class="token keyword">set</span> sql_log_bin<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> 开启日志
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-21.png" alt="GTID恢复" loading="lazy">
<br></p>
<br>
<h4 id="_7-3-报错" tabindex="-1"><a class="header-anchor" href="#_7-3-报错" aria-hidden="true">#</a> 7.3 报错</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>ERROR <span class="token number">1049</span> <span class="token punctuation">(</span><span class="token number">42000</span><span class="token punctuation">)</span>: Unknown <span class="token keyword">database</span> <span class="token string">'gtid'</span>
Query OK<span class="token punctuation">,</span> <span class="token number">0</span> <span class="token keyword">rows</span> affected <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>
ERROR <span class="token number">1046</span> <span class="token punctuation">(</span><span class="token number">3</span>D000<span class="token punctuation">)</span>: <span class="token keyword">No</span> <span class="token keyword">database</span> selected
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-22.png" alt="GTID恢复报错" loading="lazy">
<br></p>
<p><strong>为什么报错?</strong></p>
<p>因为幂等性的检查,1-3事务已经做过了。</p>
<p><strong>正确的做法</strong>：</p>
<p>在导出的时候应该忽略GTID的幂等性。 当成新的事务来对待 1-4  跳过并记录新ID号</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysqlbinlog --skip-gtids --include-gtids<span class="token operator">=</span><span class="token string">'d60b549f-9e10-11e9-ab04-000c294a1b3b:1-3'</span> mysql-bin.000005 <span class="token operator">></span>/tmp/gtid.sql
--skip-gtids 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>作用</strong>:在导出时,忽略原有的gtid信息,恢复时生成最新的 GTID 信息</p>
<p><strong>恢复数据</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> sql_log_bin<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
source <span class="token operator">/</span>tmp<span class="token operator">/</span>gtid<span class="token punctuation">.</span><span class="token keyword">sql</span>
<span class="token keyword">set</span> sql_log_bin<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>GTID相关的参数</strong>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>--skip-gtids <span class="token comment">#忽略原有的GTID 信息,恢复时生成最新的 GTID 信息</span>
--include-gtids<span class="token operator">=</span><span class="token string">'d60b549f-9e10-11e9-ab04-000c294a1b3b:6'</span>,<span class="token string">'d60b549f-9e10-11e9-ab04-000c294a1b3b:8'</span> <span class="token comment">#只截取6和8</span>
--exclude-gtids<span class="token operator">=</span><span class="token string">'d60b549f-9e10-11e9-ab04-000c294a1b3b:6'</span>,<span class="token string">'d60b549f-9e10-11e9-ab04-000c294a1b3b:8'</span> <span class="token comment">#排除</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_8-慢日志-slow-log" tabindex="-1"><a class="header-anchor" href="#_8-慢日志-slow-log" aria-hidden="true">#</a> 8. 慢日志 （slow-log ）</h3>
<br>
<p><strong>作用</strong>：记录运行较慢的语句,优化过程中常用的工具日志。</p>
<h4 id="_8-1-慢日志配置" tabindex="-1"><a class="header-anchor" href="#_8-1-慢日志配置" aria-hidden="true">#</a> 8.1 慢日志配置</h4>
<p><strong>开关</strong></p>
<p><code v-pre>slow_query_log=1</code></p>
<p><strong>文件位置及名字</strong></p>
<p><code v-pre>slow_query_log_file=/data/mysql/slow.log</code></p>
<p><strong>设定慢查询时间</strong></p>
<p><code v-pre>long_query_time=0.1</code></p>
<p><strong>没走索引的语句也记录</strong></p>
<p><code v-pre>log_queries_not_using_indexes</code></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/my.cnf
<span class="token assign-left variable">slow_query_log</span><span class="token operator">=</span><span class="token number">1</span> 
<span class="token assign-left variable">slow_query_log_file</span><span class="token operator">=</span>/data/mysql/slow.log
<span class="token assign-left variable">long_query_time</span><span class="token operator">=</span><span class="token number">0.1</span>
log_queries_not_using_indexes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认定义慢语句的时间 十秒</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-23.png" alt="GTID恢复报错" tabindex="0" loading="lazy"><figcaption>GTID恢复报错</figcaption></figure>
<br>
<br>
<h4 id="_8-2-模拟慢查询分析日志" tabindex="-1"><a class="header-anchor" href="#_8-2-模拟慢查询分析日志" aria-hidden="true">#</a> 8.2 模拟慢查询分析日志</h4>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-24.png" alt="慢日志分析" loading="lazy">
<br></p>
<p><strong>分析慢日志</strong></p>
<p><code v-pre>mysqldumpslow -s c -t 10 /data/mysql/slow.log</code>  优化前十个 自动以时间为第二维度
<code v-pre>-s</code>  排序
<code v-pre>-c</code> 次数
<code v-pre>-t</code> 前十个记录</p>
<ul>
<li>不显示重复的 最慢的优先处理</li>
<li>优先处理优化使用次数最多的语句</li>
</ul>
<br>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-25.png" alt="慢日志分析" loading="lazy">
<br></p>
<p><strong>超过01秒的和不走索引的语句</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-26.png" alt="慢日志分析2" tabindex="0" loading="lazy"><figcaption>慢日志分析2</figcaption></figure>
<p><strong>结论</strong>：以查询时间和运行次数为分析结论</p>
<p>1.运行次数
2.时间</p>
<h3 id="_9-第三方工具" tabindex="-1"><a class="header-anchor" href="#_9-第三方工具" aria-hidden="true">#</a> 9.  第三方工具</h3>
<br>
<p><a href="https://www.percona.com/downloads/percona-toolkit/LATEST/" target="_blank" rel="noopener noreferrer">Percona Toolkit 3.2.0<ExternalLinkIcon/></a></p>
<p>Pt-query-digest是用于分析MySQL慢查询的一个工具，它也可以分析binlog、General log、slowlog，也可以通过SHOWPROCESSLIST或者通过tcpdump抓取的MySQL协议数据来进行分析。可以把分析结果输出到文件中，分析过程是先对查询语句的条件进行参数化，然后对参数化以后的查询进行分组统计，统计出各查询的执行时间、次数、占比等，可以借助分析结果找出问题进行优化。</p>
<br>
<br>
<h4 id="_9-1-下载安装" tabindex="-1"><a class="header-anchor" href="#_9-1-下载安装" aria-hidden="true">#</a> 9.1 下载安装</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://www.percona.com/downloads/percona-toolkit/3.2.0/binary/redhat/7/x86_64/percona-toolkit-3.2.0-1.el7.x86_64.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>安装依赖
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> perl-DBI perl-DBD-MySQL perl-Time-HiRes perl-IO-Socket-SSL perl-Digest-MD5
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> percona-toolkit-3.2.0-1.el7.x86_64.rpm 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h4 id="_9-2-使用说明" tabindex="-1"><a class="header-anchor" href="#_9-2-使用说明" aria-hidden="true">#</a> 9.2 使用说明</h4>
<br>
<p><code v-pre>shell&gt; pt-query-digest [OPTIONS] [DSN]</code></p>
<p><strong>详情可参考</strong></p>
<p><code v-pre>shell&gt;pt-query-digest --help</code></p>
<p><strong>常用参数</strong>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>--create-review-table ：当使用--review参数把分析结果输出到表中时，如果没有表就自动创建。
--create-history-table：当使用--history参数把分析结果输出到表中时，如果没有表就自动创建。
<span class="token parameter variable">--filter</span> ： 对输入的慢查询按指定的字符串进行匹配过滤后再进行分析
--limit：限制输出结果百分比或数量，默认值是20,即将最慢的20条语句输出，如果是95%则按总响应时间占比从大到小排序，输出到总和达到95%位置截止。
<span class="token parameter variable">--log</span><span class="token operator">=</span>s ：指定输出的日志文件
<span class="token parameter variable">--history</span> 将分析结果保存到表中，分析结果比较详细，下次再使用--history时，如果存在相同的语句，且查询所在的时间区间和历史表中的不同，则会记录到数据表中，可以通过查询同一CHECKSUM来比较某类型查询的历史变化。
--review：将分析结果保存到表中，这个分析只是对查询条件进行参数化，一个类型的查询一条记录，比较简单。当下次使用--review时，如果存在相同的语句分析，就不会记录到数据表中。
<span class="token parameter variable">--output</span> 分析结果输出类型，值可以是report<span class="token punctuation">(</span>标准分析报告<span class="token punctuation">)</span>、slowlog<span class="token punctuation">(</span>Mysql slow log<span class="token punctuation">)</span>、json、json-anon，一般使用report，以便于阅读。
--since：从该指定日期开始分析。
--until：截止时间，配合—since可以分析一段时间内的慢查询。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p><strong>9.3 使用示例</strong></p>
<br>
<p><strong>Toolkit工具包中的命令:</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>pt-query-diagest  /data/mysql/slow.log
<span class="token comment">#pt-query-digest分析慢查询日志</span>
shell<span class="token operator">></span> pt-query-digest <span class="token parameter variable">--report</span> slow.log
<span class="token comment">#报告最近半个小时的慢查询：</span>
shell<span class="token operator">></span> pt-query-digest <span class="token parameter variable">--report</span> <span class="token parameter variable">--since</span> 1800s slow.log
<span class="token comment">#报告一个时间段的慢查询：</span>
shell<span class="token operator">></span> pt-query-digest <span class="token parameter variable">--report</span> <span class="token parameter variable">--since</span> <span class="token string">'2013-02-10 21:48:59'</span> <span class="token parameter variable">--until</span> <span class="token string">'2013-02-16 02:33:50'</span> slow.log
<span class="token comment">#报告只含select语句的慢查询:</span>
shell<span class="token operator">></span> pt-query-digest <span class="token parameter variable">--filter</span> <span class="token string">'$event->{fingerprint} =~ m/^select/i'</span> slow.log
<span class="token comment">#报告针对某个用户的慢查询:</span>
shell<span class="token operator">></span> pt-query-digest <span class="token parameter variable">--filter</span> <span class="token string">'($event->{user} || "") =~ m/^root/i'</span> slow.log
<span class="token comment">#报告所有的全表扫描或full join的慢查询:</span>
shell<span class="token operator">></span> pt-query-digest <span class="token parameter variable">--filter</span> <span class="token string">'(($event->{Full_scan} || "") eq "yes") || (($event->{Full_join} || "") eq "yes")'</span> slow.log
<span class="token comment">#把查询保存到query_review表</span>
shell<span class="token operator">></span> pt-query-digest <span class="token parameter variable">--user</span><span class="token operator">=</span>root –password<span class="token operator">=</span>abc123 <span class="token parameter variable">--review</span> <span class="token assign-left variable">h</span><span class="token operator">=</span>localhost,D<span class="token operator">=</span>test,t<span class="token operator">=</span>query_review --create-review-table  slow.log
<span class="token comment">#把查询保存到query_history表</span>
shell<span class="token operator">></span> pt-query-digest <span class="token parameter variable">--user</span><span class="token operator">=</span>root –password<span class="token operator">=</span>abc123 <span class="token parameter variable">--history</span>  <span class="token assign-left variable">h</span><span class="token operator">=</span>localhost,D<span class="token operator">=</span>test,t<span class="token operator">=</span>query_history --create-history-table  slow.log
<span class="token comment">#通过tcpdump抓取mysql的tcp协议数据，然后再分析</span>
shell<span class="token operator">></span> tcpdump <span class="token parameter variable">-s</span> <span class="token number">65535</span> <span class="token parameter variable">-x</span> <span class="token parameter variable">-nn</span> <span class="token parameter variable">-q</span> <span class="token parameter variable">-tttt</span> <span class="token parameter variable">-i</span> any <span class="token parameter variable">-c</span> <span class="token number">1000</span> port <span class="token number">3306</span> <span class="token operator">></span> mysql.tcp.txt
shell<span class="token operator">></span> pt-query-digest <span class="token parameter variable">--type</span> tcpdump mysql.tcp.txt<span class="token operator">></span> slow_report.log
<span class="token comment">#分析binlog</span>
shell<span class="token operator">></span> mysqlbinlog mysql-bin.000093 <span class="token operator">></span> mysql-bin000093.sql
shell<span class="token operator">></span> pt-query-digest <span class="token parameter variable">--type</span><span class="token operator">=</span>binlog mysql-bin000093.sql <span class="token operator">></span> slow_report.log
<span class="token comment">#分析general log</span>
shell<span class="token operator">></span> pt-query-digest <span class="token parameter variable">--type</span><span class="token operator">=</span>genlog localhost.log <span class="token operator">></span> slow_report.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p>如下为输入结果示例：</p>
<br>
<br>
<h4 id="_9-4-将分析结果可视化" tabindex="-1"><a class="header-anchor" href="#_9-4-将分析结果可视化" aria-hidden="true">#</a> 9.4 将分析结果可视化</h4>
<p><strong>原理</strong>：使用pt-query-digest分析慢查询日志并将查询分析数据保存到MySQL数据库表中，然后使用应用程序来展示分析结果.</p>
<p>目前有基于LAMP的Query-Digest-UI、Anemometer开源项目支持。</p>
<br>
<br>
<p><strong>介绍：</strong></p>
<p><a href="https://github.com/box/Anemometer" target="_blank" rel="noopener noreferrer">Anemometer<ExternalLinkIcon/></a> 是一个图形化显示MySQL慢日志的工具。</p>
<p>结合Percona-toolkit中pt-query-digest，Anemometer可以很轻松的帮你去分析慢查询日志，让你很容易就能找到哪些SQL需要优化。</p>
<br>
<p><strong>需要安装的步骤如下：</strong></p>
<ol>
<li>percona-toolkit工具的安装</li>
<li>php web环境的搭建</li>
<li>安装Anemometer并配置</li>
<li>导入慢查询日志</li>
<li>访问界面，查看慢查询</li>
<li>其他相关和问题解决</li>
</ol>
<br>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-34.png" alt="Anemomete构架图" loading="lazy">
<br></p>
<br>
<p><strong>php&amp;web环境的搭建</strong></p>
<p><strong>LAMP环境的安装</strong></p>
<br>
<p><strong>安装apache</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> httpd httpd-devel <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<p><strong>安装php</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> php php-mysql php-common php-bcmath php-dba php-cli php-gd php-mbstring php-mcrypt php-devel php-xml php-pdo <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<p><strong>修改时区</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/php.ini，
<span class="token comment">#修改为 </span>
date.timezone <span class="token operator">=</span> PRC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>LAMP环境启动</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl start httpd
systemctl stop httpd
systemctl restart httpd
systemctl status httpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p><strong>安装Anemometer并配置</strong></p>
<p><strong>1.下载安装</strong></p>
<p><strong>下载地址</strong>：<a href="https://github.com/box/Anemometer" target="_blank" rel="noopener noreferrer">https://github.com/box/Anemometer<ExternalLinkIcon/></a></p>
<br>
<p><strong>下载后上传到服务器并解压</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">unzip</span> Anemometer.master.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<p><strong>移动到web根目录</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mv</span> Anemometer /var/www/html/anemometer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<p><strong>2.授予权限</strong></p>
<p>目标慢查询数据库上需要授予Anemometer主机对应的权限，用于分析目标慢查询数据库<strong>explain</strong>执行计划</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">grant</span> <span class="token keyword">select</span> <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> <span class="token string">'anemometer'</span><span class="token variable">@'$ip'</span> identified <span class="token keyword">by</span> <span class="token string">'123456'</span><span class="token punctuation">;</span>
flush <span class="token keyword">privileges</span><span class="token punctuation">;</span>  <span class="token comment">--（$ip为Anemometer主机对应ip地址）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p><strong>3.修改配置文件</strong></p>
<p>增加<strong>explain</strong>读取用户密码信息</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cp</span> conf/sample.config.inc.php conf/config.inc.php
<span class="token function">vim</span> conf/config.inc.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-28.png" alt="修改配置文件2" tabindex="0" loading="lazy"><figcaption>修改配置文件2</figcaption></figure>
<br>
<p>修改配置文件指向数据源文件</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-41.png" alt="修改配置文件2" tabindex="0" loading="lazy"><figcaption>修改配置文件2</figcaption></figure>
<p>初始化数据源的数据库表的配置</p>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-40.png" alt="修改配置文件3" loading="lazy">
<br></p>
<p><strong>4.推送慢语句分析</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>pt-query-digest <span class="token parameter variable">--user</span><span class="token operator">=</span>slowlog <span class="token parameter variable">--password</span><span class="token operator">=</span><span class="token number">1</span> 
<span class="token parameter variable">--review</span> <span class="token assign-left variable">h</span><span class="token operator">=</span><span class="token number">10.0</span>.0.51,D<span class="token operator">=</span>slow_query_log,t<span class="token operator">=</span>global_query_review
<span class="token parameter variable">--history</span> <span class="token assign-left variable">h</span><span class="token operator">=</span><span class="token number">10.0</span>.0.51,D<span class="token operator">=</span>slow_query_log,t<span class="token operator">=</span>global_query_review_history --no-report 
<span class="token parameter variable">--limit</span><span class="token operator">=</span><span class="token number">0</span>% <span class="token parameter variable">--filter</span><span class="token operator">=</span><span class="token string">" \<span class="token variable">$event</span>->{Bytes} = length(\<span class="token variable">$event</span>->{arg}) and \<span class="token variable">$event</span>->{hostname}=<span class="token entity" title="\&quot;">\"</span><span class="token environment constant">$HOSTNAME</span><span class="token entity" title="\&quot;">\"</span>"</span> 
slow.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p><strong>5.访问网页，查看慢语句可视化分析</strong></p>
<p><a href="http://127.0.0.1/anemometer" target="_blank" rel="noopener noreferrer">http://127.0.0.1/anemometer<ExternalLinkIcon/></a></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-32.png" alt="web界面1" tabindex="0" loading="lazy"><figcaption>web界面1</figcaption></figure>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-33.png" alt="web界面2" tabindex="0" loading="lazy"><figcaption>web界面2</figcaption></figure>
<p><strong>Query-Digest-UI</strong> 应用</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-31.png" alt="Query-Digest-UI" tabindex="0" loading="lazy"><figcaption>Query-Digest-UI</figcaption></figure>
<br>
<br>
<p><strong>6.踩坑问题解决</strong></p>
<p><strong>MySQL 5.7 时间格式问题</strong></p>
<p>MySQL升级5.7后，出现异常<code v-pre>Invalid default value for 'create_time'</code> <br></p>
<p>5.7之后版本 datetime 默认值设置 '0000-00-00'<br></p>
<br>
<p><strong>解决方案</strong>：</p>
<p>打开MySQL安装位置，找到<code v-pre>my.ini</code>配置文件，添加或修改如下配置：<br></p>
<p>在 <code v-pre>[mysqld]</code> 中添加<br></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>sql-mode<span class="token operator">=</span>ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,
NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div> <br>
<p><strong>临时解决方案</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">set</span> <span class="token keyword">session</span> sql_mode<span class="token operator">=</span><span class="token string">'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><br>  <br></p>
<p><code v-pre>Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggre</code> 问题解决</p>
<p><strong>问题出现的原因：</strong></p>
<p><strong>MySQL 5.7.5及以上功能依赖检测功能。如果启用了ONLY_FULL_GROUP_BY SQL模式（默认情况下），MySQL将拒绝选择列表，HAVING条件或ORDER BY列表的查询引用在GROUP BY子句中既未命名的非集合列，也不在功能上依赖于它们。（5.7.5之前，MySQL没有检测到功能依赖关系，默认情况下不启用ONLY_FULL_GROUP_BY。有关5.7.5之前的行为的说明，请参见“MySQL 5.6参考手册”。）</strong></p>
<p><strong>解决方法一：</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> @<span class="token variable">@global.sql_mode</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询出来的值为：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token string">'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>去掉 <strong>ONLY_FULL_GROUP_BY</strong>，重新设置值。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> @<span class="token variable">@global.sql_mode</span> <span class="token operator">=</span><span class="token string">'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>解决方法二：</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> <span class="token function">vim</span> /etc/mysql/conf.d/mysql.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span> 
<span class="token assign-left variable">sql_mode</span><span class="token operator">=</span>STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
<span class="token function">service</span> mysqld restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p><strong>3.时间不同步问题</strong></p>
<p><strong>问题描述</strong>：MySQL 5.7 开启慢日志后发现日志的时间与系统时间相差8小时</p>
<br>
<p><strong>Time</strong>: <strong>2020-08-05T05:35:50.667976K</strong>，实际时间应该是<strong>12:24:30</strong><br></p>
<p>这是由于<strong>log_timestamps</strong>这个参数设置造成的，查询当前设置<br></p>
<br> 
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">'%log_time%'</span><span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">----------------+-------+</span>
<span class="token operator">|</span> Variable_name <span class="token operator">|</span> <span class="token keyword">Value</span>  <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------+-------+</span>
<span class="token operator">|</span> log_timestamps <span class="token operator">|</span> UTC   <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------+-------+</span>
<span class="token number">1</span> <span class="token keyword">row</span> <span class="token operator">in</span> <span class="token keyword">set</span> <span class="token punctuation">(</span><span class="token number">0.01</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>UTC</strong>是世界统一时间，而现在的系统为北京时间是东八区，比<strong>UTC</strong>早了8个小时，所以这里设置为<strong>SYSTEM</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">set</span> <span class="token keyword">global</span> log_timestamps<span class="token operator">=</span>SYSTEM<span class="token punctuation">;</span>

Query OK<span class="token punctuation">,</span> <span class="token number">0</span> <span class="token keyword">rows</span> affected <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>

 mysql<span class="token operator">></span> <span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">'%log_time%'</span><span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">----------------+--------+</span>
<span class="token operator">|</span> Variable_name <span class="token operator">|</span> <span class="token keyword">Value</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------+--------+</span>
<span class="token operator">|</span> log_timestamps <span class="token operator">|</span> SYSTEM <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------+--------+</span>
<span class="token number">1</span> <span class="token keyword">row</span> <span class="token operator">in</span> <span class="token keyword">set</span> <span class="token punctuation">(</span><span class="token number">0.01</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  <br>
<br>
<p>Mysql 5.7 时间字段不得为空或0000-00-00 00:00:00</p>
<p><strong>问题原因：</strong></p>
<p><code v-pre>NO_ZERO_IN_DATE</code>,<code v-pre>NO_ZERO_DATE</code> 限制无法默认为 <code v-pre>0000-00-00 00:00:</code>00</p>
<p><code v-pre>NO_ZERO_IN_DATE</code>：在严格模式下，不接受月或日部分为0的日期</p>
<p><code v-pre>NO_ZERO_DATE</code>：在严格模式，<code v-pre>0000-00-00</code>报错</p>
 <br>
<br>
<p><strong>解决方法：</strong></p>
<p>1、使用root登陆数据库，命令界面执行 ，查看sql_mode</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> @<span class="token variable">@sql_mode</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回结果如下：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token string">'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改 <code v-pre>sql_mode</code></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SET</span> <span class="token keyword">GLOBAL</span> sql_mode<span class="token operator">=</span><span class="token string">'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_10-慢查询可视化帮助文档" tabindex="-1"><a class="header-anchor" href="#_10-慢查询可视化帮助文档" aria-hidden="true">#</a> 10. 慢查询可视化帮助文档</h3>
<p><a href="https://www.jianshu.com/p/092fd6359e43" target="_blank" rel="noopener noreferrer">文章来源<ExternalLinkIcon/></a></p>
<p>该系统使用pt-query-digest搜集慢查询日志，目前策略是每10分钟搜集分析一次。</p>
<p>将数据存储在两张表中：该系统使用pt-query-digest搜集慢查询日志，目前策略是每10分钟搜集分析一次。将数据存储在两张表中：<code v-pre>global_query_review</code> 和 <code v-pre>global_query_review_history</code>。将数据展现出来，方便查询分析。</p>
<br>
<p>表结构</p>
<p><code v-pre>global_query_review</code> 表结构：</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-35.png" alt="表结构1" tabindex="0" loading="lazy"><figcaption>表结构1</figcaption></figure>
<p><br><br></p>
<p><strong>主要字段说明</strong>：</p>
<ul>
<li>checksum : 主键，是按fingerprint算出来的hash值</li>
<li>finger : 是每条sql语句的指纹，去掉了一些变化的值同一类型的sql语句，条件值不一样在该表中只会存在一条记录</li>
<li>sample: 符合finger的一条sql示例</li>
</ul>
<br>
<br>
<p><code v-pre>global_query_review_history</code> 表结构</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-36.png" alt="表结构2" tabindex="0" loading="lazy"><figcaption>表结构2</figcaption></figure>
<p><strong>主要字段说明</strong>：</p>
<ul>
<li><strong>hostname_max</strong> :  MySQL服务所在主机名称</li>
<li><strong>db_max</strong>: 数据库名称</li>
<li><strong>checksum</strong> :     同global_query_review表中的checksum，两张表通过该值关联</li>
<li><strong>sample</strong> : sql示例</li>
<li><strong>ts_min</strong> :     本次统计(每10分钟一次)该类型sql语句出现的最小时间</li>
<li><strong>ts_max</strong>:     本次统计(每10分钟一次)该类型sql语句出现的最大时间</li>
<li><strong>ts_cnt</strong> :     本次统计该sql语句出现的次数</li>
<li><strong>Query_time_sum</strong> :     本次统计该类型sql语句花费的总时间</li>
<li><strong>Query_time_min</strong> :     本次统计该类型sql语句执行最快的那个sql语句花费的时间</li>
<li><strong>Query_time_max</strong>:     本次统计该类型sql语句执行最慢的那个sql语句花费的时间</li>
<li><strong>Query_time_pct_95</strong>:     本次统计该类型sql语句执行时间位于95%分位的sql执行时间</li>
<li><strong>Query_time_stddev</strong>:     本次统计该类型sql语句执行时间标准差（统计学概念）</li>
<li><strong>Query_time_median</strong>:     本次统计该类型sql语句执行时间位于中位数位置的sql执行时间</li>
<li><strong>index_ratio</strong>：表示的是扫描的行数/返回的结果行数</li>
</ul>
<p><br><br></p>
<p><strong>Anemometer</strong> 应用</p>
<p><strong>1.主页面说明如下</strong></p>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-37.png" alt="界面1" loading="lazy">
<br></p>
<p><strong>2.点击checksum值进入分析页面</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-38.png" alt="界面2" tabindex="0" loading="lazy"><figcaption>界面2</figcaption></figure>
<br>
<p><strong>下面图形是该页面的中间部分</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-39.png" alt="界面3" tabindex="0" loading="lazy"><figcaption>界面3</figcaption></figure>
</div></template>


