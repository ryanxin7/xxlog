<template><div><h1 id="慢日志分析" tabindex="-1"><a class="header-anchor" href="#慢日志分析" aria-hidden="true">#</a> 慢日志分析</h1>
<p><strong>作用</strong>：<strong>slow-log</strong> 记录运行较慢的语句,优化过程中常用的工具日志。</p>
<br>
<h2 id="_1-慢日志配置" tabindex="-1"><a class="header-anchor" href="#_1-慢日志配置" aria-hidden="true">#</a> 1. 慢日志配置</h2>
<br>
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
<h2 id="_2-模拟慢查询分析日志" tabindex="-1"><a class="header-anchor" href="#_2-模拟慢查询分析日志" aria-hidden="true">#</a> 2. 模拟慢查询分析日志</h2>
<br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-24.png" alt="慢日志分析" tabindex="0" loading="lazy"><figcaption>慢日志分析</figcaption></figure>
<br>
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
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-25.png" alt="慢日志分析" tabindex="0" loading="lazy"><figcaption>慢日志分析</figcaption></figure>
<br>
<p><strong>超过01秒的和不走索引的语句</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-26.png" alt="慢日志分析" tabindex="0" loading="lazy"><figcaption>慢日志分析</figcaption></figure>
<p><strong>结论</strong>：以查询时间和运行次数为分析结论</p>
<p>1.运行次数
2.时间</p>
<h2 id="_3-第三方工具" tabindex="-1"><a class="header-anchor" href="#_3-第三方工具" aria-hidden="true">#</a> 3.  第三方工具</h2>
<br>
<p><a href="https://www.percona.com/downloads/percona-toolkit/LATEST/" target="_blank" rel="noopener noreferrer">Percona Toolkit 3.2.0<ExternalLinkIcon/></a></p>
<p>Pt-query-digest是用于分析MySQL慢查询的一个工具，它也可以分析binlog、General log、slowlog，也可以通过SHOWPROCESSLIST或者通过tcpdump抓取的MySQL协议数据来进行分析。可以把分析结果输出到文件中，分析过程是先对查询语句的条件进行参数化，然后对参数化以后的查询进行分组统计，统计出各查询的执行时间、次数、占比等，可以借助分析结果找出问题进行优化。</p>
<br>
<br>
<h3 id="_3-1-下载安装" tabindex="-1"><a class="header-anchor" href="#_3-1-下载安装" aria-hidden="true">#</a> 3.1 下载安装</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://www.percona.com/downloads/percona-toolkit/3.2.0/binary/redhat/7/x86_64/percona-toolkit-3.2.0-1.el7.x86_64.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>安装依赖
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> perl-DBI perl-DBD-MySQL perl-Time-HiRes perl-IO-Socket-SSL perl-Digest-MD5
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> percona-toolkit-3.2.0-1.el7.x86_64.rpm 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_3-2-使用说明" tabindex="-1"><a class="header-anchor" href="#_3-2-使用说明" aria-hidden="true">#</a> 3.2 使用说明</h3>
<br>
<p><code v-pre>shell&gt; pt-query-digest [OPTIONS] [DSN]</code></p>
<p><strong>详情可参考</strong></p>
<p><code v-pre>shell&gt;pt-query-digest --help</code></p>
<h3 id="_3-3-常用参数" tabindex="-1"><a class="header-anchor" href="#_3-3-常用参数" aria-hidden="true">#</a> 3.3 常用参数</h3>
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
<h3 id="_3-4-使用示例" tabindex="-1"><a class="header-anchor" href="#_3-4-使用示例" aria-hidden="true">#</a> 3.4 使用示例</h3>
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
<h2 id="_4-分析结果可视化" tabindex="-1"><a class="header-anchor" href="#_4-分析结果可视化" aria-hidden="true">#</a> 4. 分析结果可视化</h2>
<br>
<h3 id="_4-1-原理介绍" tabindex="-1"><a class="header-anchor" href="#_4-1-原理介绍" aria-hidden="true">#</a> 4.1 原理介绍</h3>
<p>使用pt-query-digest分析慢查询日志并将查询分析数据保存到MySQL数据库表中，然后使用应用程序来展示分析结果.</p>
<p>目前有基于LAMP的Query-Digest-UI、Anemometer开源项目支持。</p>
<br>
<br>
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
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-34.png" alt="Anemomete构架图" tabindex="0" loading="lazy"><figcaption>Anemomete构架图</figcaption></figure>
<br>
<h3 id="_4-2-环境搭建" tabindex="-1"><a class="header-anchor" href="#_4-2-环境搭建" aria-hidden="true">#</a> 4.2 环境搭建</h3>
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
<h3 id="_4-3-安装anemometer" tabindex="-1"><a class="header-anchor" href="#_4-3-安装anemometer" aria-hidden="true">#</a> 4.3 安装Anemometer</h3>
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
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-40.png" alt="修改配置文件3" tabindex="0" loading="lazy"><figcaption>修改配置文件3</figcaption></figure>
<br>
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
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-33.png" alt="web界面2&quot;" tabindex="0" loading="lazy"><figcaption>web界面2&quot;</figcaption></figure>
<p><strong>Query-Digest-UI</strong> 应用</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-31.png" alt="Query-Digest-UI" tabindex="0" loading="lazy"><figcaption>Query-Digest-UI</figcaption></figure>
<br>
<h3 id="_4-4-踩坑问题解决" tabindex="-1"><a class="header-anchor" href="#_4-4-踩坑问题解决" aria-hidden="true">#</a> 4.4 踩坑问题解决</h3>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-5-慢查询可视化帮助文档" tabindex="-1"><a class="header-anchor" href="#_4-5-慢查询可视化帮助文档" aria-hidden="true">#</a> 4.5 慢查询可视化帮助文档</h3>
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
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-37.png" alt="界面1" tabindex="0" loading="lazy"><figcaption>界面1</figcaption></figure>
<br>
<br>
<p><strong>2.点击checksum值进入分析页面</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-38.png" alt="界面2" tabindex="0" loading="lazy"><figcaption>界面2</figcaption></figure>
<br>
<p><strong>下面图形是该页面的中间部分</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-39.png" alt="Section6-1-39.png" tabindex="0" loading="lazy"><figcaption>Section6-1-39.png</figcaption></figure>
<p>test Jenkin🛰️</p>
</div></template>


