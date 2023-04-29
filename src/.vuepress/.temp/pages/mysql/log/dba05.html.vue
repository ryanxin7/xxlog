<template><div><h1 id="存储引擎介绍与企业案例" tabindex="-1"><a class="header-anchor" href="#存储引擎介绍与企业案例" aria-hidden="true">#</a> 存储引擎介绍与企业案例</h1>
<h2 id="_1-前情回顾案例补充" tabindex="-1"><a class="header-anchor" href="#_1-前情回顾案例补充" aria-hidden="true">#</a> 1. 前情回顾案例补充</h2>
<p><strong>explain (desc) 使用场景</strong></p>
<p>相关问题：</p>
<ul>
<li>
<p>你做过哪些优化?</p>
</li>
<li>
<p>你用过什么优化工具? <strong>explain</strong></p>
</li>
<li>
<p>你对索引这块怎么优化的?</p>
<br>
</li>
</ul>
<p><strong>题目意思: 我们公司业务慢,请你从数据库的角度分析原因</strong></p>
<ul>
<li><strong>mysql出现性能问题,有两种情况:</strong></li>
</ul>
<br>
<p>第一种情况：应急性的慢：突然夯住  <strong>突然慢</strong></p>
<p>应急情况:数据库卡了,资源耗尽</p>
<p><strong>处理过程:</strong></p>
<ol>
<li>
<p><code v-pre>show processlist;</code> （把当前会话所做的操作列出来） 获取到导致数据库卡住的语句</p>
</li>
<li>
<p>使用 <code v-pre>explain</code> 分析SQL的执行计划,可能有没有走索引的,索引的类型情况。</p>
</li>
<li>
<p>建索引,改语句</p>
</li>
</ol>
<p>第二种情况：一段时间慢(持续性的):<strong>每天都慢</strong> 9-11点</p>
<p><strong>处理过程:</strong></p>
<ol>
<li>记录慢日志 <code v-pre>slowlog</code>,分析<code v-pre>slowlog</code></li>
<li>explain 分析SQL的执行计划,有没有走索引,索引的类型情况</li>
<li>建索引,改语句</li>
</ol>
<br>
<br>
<h3 id="_1-1-索引应用规范" tabindex="-1"><a class="header-anchor" href="#_1-1-索引应用规范" aria-hidden="true">#</a> 1.1 索引应用规范</h3>
<div class="hint-container tip">
<p class="hint-container-title">建立索引的原则（DBA运维规范）</p>
<ul>
<li>
<p>建表必须要有主键,一般是无关列,自增长</p>
</li>
<li>
<p>经常做为 <code v-pre>where</code> 条件列 <code v-pre>order by</code> <code v-pre>group by</code> <code v-pre>join on</code>, <code v-pre>distinct</code> 的条件</p>
</li>
<li>
<p>最好使用唯一值多的列作为联合索引前导列,其他的按照联合索引优化细节来做</p>
</li>
<li>
<p>列值长度较长的索引列,我们建议使用前缀索引.</p>
</li>
<li>
<p>降低索引条目,一方面不要创建没用索引,不常使用的索引清理,<code v-pre>percona</code> <code v-pre>toolkit</code></p>
</li>
<li>
<p>索引维护要避开业务繁忙期</p>
</li>
<li>
<p>小表不建索引</p>
</li>
</ul>
</div>
<br>
<br>
<p>使用 <strong>SQLyog</strong> 工具自动找出<strong>使用率不高的索引</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/dba05-1.png" alt="dba05-1.png" tabindex="0" loading="lazy"><figcaption>dba05-1.png</figcaption></figure>
<br>
<br>
<p><br><br></p>
<h3 id="_1-2-不走索引的情况" tabindex="-1"><a class="header-anchor" href="#_1-2-不走索引的情况" aria-hidden="true">#</a> <strong>1.2</strong> 不走索引的情况</h3>
<div class="hint-container tip">
<p class="hint-container-title">不走索引的情况（开发规范）</p>
<ul>
<li>没有查询条件，或者查询条件没有建立索引</li>
</ul>
<p><code v-pre>select * from city;</code></p>
<p><code v-pre>select * from city where 1=1;</code></p>
<ul>
<li>
<p>查询结果集是原表中的大部分数据，应该是25％以上。</p>
</li>
<li>
<p>索引本身失效，统计数据不真实</p>
</li>
</ul>
<p><strong>面试题: 同一个语句突然变慢?</strong></p>
<p>可能是因为统计信息过旧,导致的索引失效。</p>
<ul>
<li>查询条件使用函数在索引列上，或者对索引列进行运算，运算包括(<code v-pre>+，-，*，/，!</code> 等)</li>
</ul>
<p><code v-pre>mysql&gt; desc select * from city where id-99=1;</code></p>
<ul>
<li>
<p>隐式转换导致索引失效.</p>
</li>
<li>
<p><code v-pre>! = ，not in</code> 不走索引（辅助索引）</p>
</li>
<li>
<p>like &quot;%aa&quot;` 百分号在最前面不走</p>
</li>
<li>
<p>联合索引</p>
</li>
</ul>
</div>
<h2 id="_2-存储引擎简介" tabindex="-1"><a class="header-anchor" href="#_2-存储引擎简介" aria-hidden="true">#</a> <strong>2. 存储引擎简介</strong></h2>
<br>
<p>相当于Linux文件系统，只不过比文件系统强大</p>
<br>
<p><strong>存储引擎功能</strong></p>
<ul>
<li>数据读写</li>
<li>数据安全和一致性</li>
<li>提高性能</li>
<li>热备份</li>
<li>自动故障恢复</li>
<li>高可用方面支持</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> engies<span class="token punctuation">;</span> <span class="token comment">--查看存储引擎支持种类</span>
CSV        
MRG_MYISAM    
MyISAM      
BLACKHOLE     
PERFORMANCE_SCHEMA
MEMORY      
ARCHIVE      
<span class="token keyword">InnoDB</span>      
FEDERATED  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/dba05-2.png" alt="dba05-2.png" tabindex="0" loading="lazy"><figcaption>dba05-2.png</figcaption></figure>
<br>
<p><strong>笔试题</strong>：<strong>例举你了解的存储引擎</strong></p>
<p><strong>答：InnoDB（新版本） ,MyISAM（老版本） ,MEMORY, CSV</strong></p>
 <br>
<ul>
<li>
<p><strong>Mysql 5.7 默认的存储引擎:InnoDB</strong></p>
</li>
<li>
<p><strong>PerconaDB:默认是XtraDB</strong></p>
</li>
<li>
<p><strong>MariaDB:默认是InnoDB</strong></p>
</li>
</ul>
 <br>
<p><strong>插件式 第三方的存储引擎:</strong></p>
<ul>
<li>RocksDB</li>
<li>MyRocks</li>
<li>TokuDB</li>
</ul>
<p><strong>区别</strong>：压缩比较高,数据的插入性能高.其他功能和 InnoDB 没差。</p>
<br>
<br>
<h3 id="_2-1-存储引擎的查看" tabindex="-1"><a class="header-anchor" href="#_2-1-存储引擎的查看" aria-hidden="true">#</a> 2.1 存储引擎的查看</h3>
<br> 
<p><strong>查看存储引擎设置</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code> 
mysql<span class="token operator">></span> <span class="token keyword">show</span> engines<span class="token punctuation">;</span> <span class="token comment">--查看支持的存储引擎</span>
mysql<span class="token operator">></span> <span class="token keyword">SELECT</span> @<span class="token variable">@default_storage_engine</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修改默认存储引擎</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> 
<span class="token function">vim</span> /etc/my.cnf   --修改配置文件
<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token assign-left variable">default_storage_engine</span><span class="token operator">=</span>InnoDB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看表存储引擎状态</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code> 
mysql<span class="token operator">></span> <span class="token keyword">show</span> <span class="token keyword">create</span> <span class="token keyword">table</span> t1<span class="token punctuation">;</span> 
 
mysql<span class="token operator">></span> <span class="token keyword">SHOW</span> <span class="token keyword">TABLE</span> <span class="token keyword">STATUS</span> <span class="token operator">LIKE</span> <span class="token string">'CountryLanguage'</span>\G
 
mysql<span class="token operator">></span><span class="token keyword">select</span> table_schema<span class="token punctuation">,</span>table_name <span class="token punctuation">,</span><span class="token keyword">engine</span> <span class="token keyword">from</span> information_schema<span class="token punctuation">.</span><span class="token keyword">tables</span> <span class="token keyword">where</span> table_schema <span class="token operator">not</span> <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token string">'sys'</span><span class="token punctuation">,</span><span class="token string">'mysql'</span><span class="token punctuation">,</span><span class="token string">'information_schema'</span><span class="token punctuation">,</span><span class="token string">'performance_schema'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<br>
<h3 id="_2-2-存储引擎的修改" tabindex="-1"><a class="header-anchor" href="#_2-2-存储引擎的修改" aria-hidden="true">#</a> <strong>2.2 存储引擎的修改</strong></h3>
<br>
<p><strong>修改存储引擎为innodb</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code> 
mysql<span class="token operator">></span> <span class="token keyword">alter</span> <span class="token keyword">table</span> t1<span class="token operator">=</span> <span class="token keyword">engine</span><span class="token operator">=</span><span class="token keyword">innodb</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">show</span> <span class="token keyword">create</span> <span class="token keyword">table</span> t1<span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><br><br></p>
<p><strong>整理碎片</strong></p>
<p>在执行删除操作后原来占用的空间不会被立即释放掉会产生碎片，就需要通过命令进行碎片整理。</p>
<br>
<p><strong>有两种方法：</strong></p>
<ol>
<li><code v-pre>mysql&gt; alter table t111 engine=innodb; innodb</code> 命令 再执行一遍更改存储引擎命令 对业务影响小。</li>
<li>把原表导入 把表<code v-pre>drop</code>掉在重新导入回来 干净 但有风险。</li>
</ol>
 <br>
<h3 id="_2-3-企业真实碎片处理案例" tabindex="-1"><a class="header-anchor" href="#_2-3-企业真实碎片处理案例" aria-hidden="true">#</a> <strong>2.3 企业真实碎片处理案例</strong></h3>
<p><br><strong>环境:</strong> centos7.4,MySQL 5.7.20,InnoDB存储引擎</p>
<p><strong>业务特点</strong>：数据量级较大,经常需要按月删除历史数据.</p>
<p><strong>问题:</strong> 磁盘空间占用很大,不释放</p>
 <br>
<p><strong>处理方法:</strong></p>
<p><br><strong>以前:</strong> 将数据逻辑导出,手工 <code v-pre>truncate</code> 表,然后导入进去。</p>
<br>
<p><strong>现在:</strong></p>
<p>对表进行按月进行分表(<strong>partition,中间件</strong>)。</p>
<p>业务替换为 <strong>truncate</strong> 方式。</p>
<p>定期进行碎片整理。</p>
 <br>
<br>
<p><strong>批量替换 Zabbix 100 多张存储引擎 <code v-pre>innodb</code> 的表为 <code v-pre>tokudb</code>引擎</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code> 
<span class="token keyword">alter</span> <span class="token keyword">table</span> zabbix<span class="token punctuation">.</span>a <span class="token keyword">engine</span><span class="token operator">=</span>tokudb<span class="token punctuation">;</span> <span class="token comment">-- 改一张表的命令</span>

<span class="token keyword">select</span> concat<span class="token punctuation">(</span><span class="token string">"alter table "</span><span class="token punctuation">,</span>table_schema<span class="token punctuation">,</span><span class="token string">"."</span><span class="token punctuation">,</span>table_name<span class="token punctuation">,</span><span class="token string">" engine=tokudb;"</span><span class="token punctuation">)</span> <span class="token keyword">from</span> information_schema<span class="token punctuation">.</span><span class="token keyword">tables</span> 
<span class="token keyword">where</span> table_schema<span class="token operator">=</span><span class="token string">'zabbix'</span><span class="token punctuation">;</span> <span class="token comment">--使用拼接语句</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<br>
<h2 id="_3-企业真实案例更换存储引擎" tabindex="-1"><a class="header-anchor" href="#_3-企业真实案例更换存储引擎" aria-hidden="true">#</a> 3. 企业真实案例更换存储引擎</h2>
 <br>
 <br>
<h3 id="_3-1-zabbix-监控系统架构整改" tabindex="-1"><a class="header-anchor" href="#_3-1-zabbix-监控系统架构整改" aria-hidden="true">#</a> 3.1   Zabbix  监控系统架构整改</h3>
<p><strong>环境:</strong> zabbix 3.2  mariaDB 5.5 centos 7.3</p>
<p><strong>现象 :</strong> zabbix卡的要死 , 每隔3-4个月,都要重新搭建一遍 zabbix,存储空间经常爆满.</p>
<br>
<p><strong>分析得出问题 :</strong></p>
<ul>
<li>
<p>Zabbix 版本</p>
</li>
<li>
<p><strong>数据库版本</strong></p>
</li>
<li>
<p>Zabbix数据库500G,全部存在一个文件里</p>
</li>
</ul>
 <br>
<br>
<p><strong>优化建议:</strong></p>
<p>1.数据库版本升级到mariaDB最新版本,Zabbix升级更高版本</p>
<p>2.存储引擎改为 <strong>tokudb</strong></p>
<p>3.监控数据按月份进行切割(二次开发Zabbix 数据保留机制功能重写,数据库分表)</p>
<p>4.关闭binlog和双1</p>
<p>5.参数调整</p>
<br>
<p><strong>优化结果</strong>: 解决卡顿问题，监控状态良好</p>
 <br>
<br>
<p><strong>解决思路 ?</strong></p>
<ol>
<li>
<p>原生态支持 TokuDB,另外经过测试环境,<strong>10版本要比5.5 版本性能 高 2-3倍</strong></p>
</li>
<li>
<p><strong>TokuDB:insert 数据比 Innodb 快的多，数据压缩比要 Innodb 高</strong></p>
</li>
<li>
<p>监控数据按月份进行切割,为了能够truncate每个分区表,立即释放空间</p>
</li>
<li>
<p><strong>关闭 binlog  减少无关日志的记录。</strong></p>
</li>
<li>
<p>参数调整  安全性参数关闭,提高性能。</p>
</li>
</ol>
<br>
<br>
<h3 id="_3-2-存储引擎的替换" tabindex="-1"><a class="header-anchor" href="#_3-2-存储引擎的替换" aria-hidden="true">#</a> <strong>3.2 存储引擎的替换</strong></h3>
<p><strong>环境:</strong> centos 5.8 ,MySQL 5.0版本,MyISAM存储引擎,网站业务(LNMP),数据量50G左右</p>
<p><strong>现象问题:</strong> 业务压力大的时候,非常卡;经历过宕机,会有部分数据丢失.</p>
<p><strong>问题分析:</strong></p>
<p>1.MyISAM存储引擎表级锁,在高并发时,会有很高锁等待</p>
<p>2.MyISAM存储引擎不支持事务,在断电时,会有可能丢失数据</p>
<p><strong>实际问题：</strong></p>
<p>1.监控锁的情况:有很多的表锁等待</p>
<p>2.存储引擎查看:所有表默认是MyISAM</p>
<p><strong>解决方案:</strong></p>
<ol>
<li>
<p>升级MySQL 5.6.10版本</p>
</li>
<li>
<p>迁移所有表到新环境</p>
</li>
<li>
<p>开启双1安全参数</p>
</li>
</ol>
<h2 id="_4-innodb-存储引擎核心特性说明" tabindex="-1"><a class="header-anchor" href="#_4-innodb-存储引擎核心特性说明" aria-hidden="true">#</a> <strong>4. InnoDB 存储引擎核心特性说明</strong></h2>
<br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/dba05-3.png" alt="dba05-3.png" tabindex="0" loading="lazy"><figcaption>dba05-3.png</figcaption></figure>
<ol>
<li>支持事务</li>
<li>行级锁定</li>
<li>MVCC   并发控制</li>
<li>外键</li>
<li>ACSR自动故障恢复</li>
<li>热备 复制方面提供 (多线程,GTID,MTS)</li>
</ol>
</div></template>


