<template><div><h1 id="第三章回顾-补充元数据查询部分" tabindex="-1"><a class="header-anchor" href="#第三章回顾-补充元数据查询部分" aria-hidden="true">#</a> 第三章回顾 补充元数据查询部分</h1>
<h2 id="_1-上节回顾" tabindex="-1"><a class="header-anchor" href="#_1-上节回顾" aria-hidden="true">#</a> 1.上节回顾</h2>
<h3 id="_1-1-group-by-name-分组-排序-对比-去重" tabindex="-1"><a class="header-anchor" href="#_1-1-group-by-name-分组-排序-对比-去重" aria-hidden="true">#</a> 1.1 group by name  分组   排序 对比 去重</h3>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-1.png" alt="day04-1.png" tabindex="0" loading="lazy"><figcaption>day04-1.png</figcaption></figure>
<h3 id="_1-2-关于group-by-的sql-mode" tabindex="-1"><a class="header-anchor" href="#_1-2-关于group-by-的sql-mode" aria-hidden="true">#</a> 1.2 关于group by 的sql_mode</h3>
<div class="hint-container tip">
<p class="hint-container-title">说明</p>
<p><code v-pre>only_full_group_by </code> 参数</p>
<ul>
<li>在5.7版本中MySQL sql_mode参数中自带，5.6和8.0都没有</li>
<li>在带有group by 字句的select中，select 后的条件列（非主键列），</li>
<li>要么是group by后的列，要么需要在函数中包裹</li>
</ul>
</div>
<p><strong>关掉限制：</strong> 编辑配置文件时去掉 <code v-pre>ONLY_FULL_GROUP_BY</code></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-2.png" alt="day04-2.png" tabindex="0" loading="lazy"><figcaption>day04-2.png</figcaption></figure>
<h3 id="_1-3-group-concat-多列-转为一行" tabindex="-1"><a class="header-anchor" href="#_1-3-group-concat-多列-转为一行" aria-hidden="true">#</a> 1.3 group_concat 多列 转为一行</h3>
<br>
<p><strong>列转行聚合函数</strong></p>
<div class="language-plsql line-numbers-mode" data-ext="plsql"><pre v-pre class="language-plsql"><code>mysql<span class="token operator">></span> <span class="token keyword">select</span> user<span class="token punctuation">,</span>group_concat<span class="token punctuation">(</span>host<span class="token punctuation">)</span> <span class="token keyword">from</span> mysql<span class="token punctuation">.</span>user <span class="token keyword">group</span> <span class="token keyword">by</span> user<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-3.png" alt="day04-3.png" tabindex="0" loading="lazy"><figcaption>day04-3.png</figcaption></figure>
<br>
<h3 id="_1-4-concat-拼接语句-列值拼接" tabindex="-1"><a class="header-anchor" href="#_1-4-concat-拼接语句-列值拼接" aria-hidden="true">#</a> <strong>1.4 concat</strong>  <strong>拼接语句</strong> 列值拼接</h3>
<br>
<p><strong>做列值拼接</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">select</span> concat<span class="token punctuation">(</span><span class="token keyword">user</span><span class="token punctuation">,</span><span class="token string">"@"</span><span class="token punctuation">,</span>host<span class="token punctuation">)</span> <span class="token keyword">from</span> mysql<span class="token punctuation">.</span><span class="token keyword">user</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-4.png" alt="day04-4.png" tabindex="0" loading="lazy"><figcaption>day04-4.png</figcaption></figure>
<h3 id="_1-5-关于多表连接语法规则" tabindex="-1"><a class="header-anchor" href="#_1-5-关于多表连接语法规则" aria-hidden="true">#</a> <strong>1.5</strong> 关于多表连接语法规则</h3>
<div class="hint-container tip">
<p class="hint-container-title">多表连接语法规则</p>
<ul>
<li>
<p>1.首先找涉及到的所有表</p>
</li>
<li>
<p>2.找到表和表之间的关联列</p>
</li>
<li>
<p>3.关联条件写在 <code v-pre>on</code> 后面 <code v-pre>A join B on</code> 关联列</p>
</li>
<li>
<p>4.所有需要查询的信息放在select后</p>
</li>
<li>
<p>5.其他的过滤条件 <code v-pre>where group by having order by limit</code> 往最后放</p>
</li>
<li>
<p>注意：对多表连接中，驱动表选择数据行少的表。后续所有表的关联列尽量是主键或唯一键（表设计），至少建立一个索引。</p>
</li>
</ul>
</div>
<div class="hint-container warning">
<p class="hint-container-title">注意 ❗</p>
<p>数据行较少的放在左边（驱动表） 因为他要拿整表的数据和右边的表进行关联</p>
</div>
<h3 id="_1-6-创建别名" tabindex="-1"><a class="header-anchor" href="#_1-6-创建别名" aria-hidden="true">#</a> <strong>1.6</strong> 创建别名</h3>
<p><strong>表别名</strong></p>
<p><strong>列别名</strong></p>
<p>count</p>
<p>oldguo  linux  a,b,c,d</p>
<p>oldguo  python x，y,z</p>
<p>oldboy  linux  10</p>
<p>hsw   python 11</p>
<h3 id="_1-7-distinct-去重复" tabindex="-1"><a class="header-anchor" href="#_1-7-distinct-去重复" aria-hidden="true">#</a> <strong>1.7 distinct</strong> <strong>去重复</strong></h3>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token keyword">distinct</span> countrycode<span class="token punctuation">)</span> <span class="token keyword">from</span> city<span class="token punctuation">;</span> 
<span class="token comment">//在城市表中 查看所有国家代号 去重复</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_1-8-select-执行顺序" tabindex="-1"><a class="header-anchor" href="#_1-8-select-执行顺序" aria-hidden="true">#</a> <strong>1.8 select</strong> <strong>执行顺序</strong></h3>
<br>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token keyword">user</span> <span class="token punctuation">,</span><span class="token function">count</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token keyword">from</span> 表  <span class="token keyword">where</span> 列  <span class="token keyword">group</span> <span class="token keyword">by</span> <span class="token keyword">user</span> <span class="token keyword">having</span> 列  <span class="token keyword">order</span> <span class="token keyword">by</span> 列 <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">查询语句执行顺序</p>
<p>没有索引的情况下会把整表数据加载到内存中，进行过滤过滤后在内存中只留下满足条件的数据。 针对满足条件的数据进行分组 （group by ），在根据select 的条件列取列产生新的结果集，having会对结果集再进行一次过滤。order by 对列数据进行比较大小排列顺序 最后显示。</p>
</div>
<br>
<h2 id="_2-扩展类内容-元数据获取" tabindex="-1"><a class="header-anchor" href="#_2-扩展类内容-元数据获取" aria-hidden="true">#</a> <strong>2.</strong> 扩展类内容 元数据获取</h2>
<br>
<h3 id="_2-1-元数据介绍及获取介绍" tabindex="-1"><a class="header-anchor" href="#_2-1-元数据介绍及获取介绍" aria-hidden="true">#</a> <strong>2.1</strong> <strong>元数据介绍及获取介绍</strong></h3>
<br>
<div class="hint-container tip">
<p class="hint-container-title">元数据</p>
<p>元数据是存储在&quot;基表&quot;中。</p>
<p>通过专用的DDL语句，DCL语句进行修改</p>
<p>通过专用视图和命令进行元数据的查询</p>
<p><code v-pre>information_schema</code>中保存了大量元数据查询的试图</p>
<p><code v-pre>show</code>  命令是封装好功能，提供元数据查询基础功能</p>
</div>
<br>
<p><strong>创建视图：</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-5.png" alt="day04-5.png" tabindex="0" loading="lazy"><figcaption>day04-5.png</figcaption></figure>
<br>
<br>
<p><strong>查询视图：</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-6.png" alt="day04-6.png" tabindex="0" loading="lazy"><figcaption>day04-6.png</figcaption></figure>
<p><strong>2.1 information_schema 的基本应用</strong></p>
<p><strong>tables 视图的应用:</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">use</span> information_schema<span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">desc</span> <span class="token keyword">tables</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-7.png" alt="day04-7.png" tabindex="0" loading="lazy"><figcaption>day04-7.png</figcaption></figure>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-8.png" alt="day04-8.png" tabindex="0" loading="lazy"><figcaption>day04-8.png</figcaption></figure>
<br>
<p><strong>TABLES 和表有关的元数据</strong></p>
<br>
<table>
<thead>
<tr>
<th><img width=100/>TABLE_SCHEMA<img width=100/></th>
<th style="text-align:center"><img width=100/>表所在的库名<img width=100/></th>
</tr>
</thead>
<tbody>
<tr>
<td>TABLE_NAME</td>
<td style="text-align:center">表名</td>
</tr>
<tr>
<td>ENGINE</td>
<td style="text-align:center">存储引擎</td>
</tr>
<tr>
<td>TABLE_ROWS</td>
<td style="text-align:center">数据行</td>
</tr>
<tr>
<td>AVG_ROW_LENGTH</td>
<td style="text-align:center">平均行长度</td>
</tr>
<tr>
<td>INDEX_LENGTH</td>
<td style="text-align:center">索引长度</td>
</tr>
</tbody>
</table>
<p><strong>举例说明：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>USE information_schema; 
DESC TABLES;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>显示所有的库和表的信息</strong></li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> table_schema<span class="token punctuation">,</span>table_name <span class="token keyword">FROM</span> information_schema<span class="token punctuation">.</span><span class="token keyword">tables</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>显示所有的库和表的信息（结果集多行转成一行）</strong></li>
</ul>
<p>world 库下  <code v-pre>city,country,country,language</code></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> table_schema<span class="token punctuation">,</span>GROUP_CONCAT<span class="token punctuation">(</span>table_name<span class="token punctuation">)</span> 
<span class="token keyword">FROM</span> information_schema<span class="token punctuation">.</span><span class="token keyword">tables</span>
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> table_schema<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>查询所有<strong>innodb</strong>引擎的表</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> table_schema<span class="token punctuation">,</span>table_name <span class="token punctuation">,</span><span class="token keyword">ENGINE</span>
<span class="token keyword">FROM</span> information_schema<span class="token punctuation">.</span><span class="token keyword">tables</span> 
<span class="token keyword">WHERE</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token string">'innodb'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>统计world下的city表占用空间大小</strong></li>
</ul>
<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>公式：表的数据量</mtext><mo>=</mo><mtext>平均行长度</mtext><mo>∗</mo><mtext>行数</mtext><mo>+</mo><mtext>索引长度</mtext></mrow><annotation encoding="application/x-tex">
公式：表的数据量=平均行长度*行数+索引长度
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord cjk_fallback">公式：表的数据量</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord cjk_fallback">平均行长度</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord cjk_fallback">行数</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord cjk_fallback">索引长度</span></span></span></span></span></p>
<p><code v-pre>AVG_ROW_LENGTH*TABLE_ROWS+INDEX_LENGTH</code>  统计整个city 表的真实数据量大小</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> table_name<span class="token punctuation">,</span><span class="token punctuation">(</span>AVG_ROW_LENGTH<span class="token operator">*</span>TABLE_ROWS<span class="token operator">+</span>INDEX_LENGTH<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">1024</span> <span class="token comment">//kb显示</span>
<span class="token keyword">FROM</span> information_schema<span class="token punctuation">.</span><span class="token keyword">TABLES</span>
<span class="token keyword">WHERE</span> table_schema<span class="token operator">=</span><span class="token string">'world'</span> <span class="token operator">AND</span> table_name<span class="token operator">=</span><span class="token string">'city'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>统计每个库的数据量大小，并按数据量从大到小排序</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> table_schema<span class="token punctuation">,</span><span class="token function">SUM</span><span class="token punctuation">(</span><span class="token punctuation">(</span>AVG_ROW_LENGTH<span class="token operator">*</span>TABLE_ROWS<span class="token operator">+</span>INDEX_LENGTH<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">1024</span> <span class="token keyword">AS</span> total_KB    <span class="token punctuation">(</span> 库中有多个表 所以需要加一起 使用 SUM 函数<span class="token punctuation">)</span>
<span class="token keyword">FROM</span> information_schema<span class="token punctuation">.</span><span class="token keyword">TABLES</span>
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> table_schema 库名排队
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token keyword">AS</span> total_KB <span class="token keyword">DESC</span> <span class="token punctuation">;</span> 排序
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-配合concat-函数拼接语句或命令" tabindex="-1"><a class="header-anchor" href="#_2-2-配合concat-函数拼接语句或命令" aria-hidden="true">#</a> <strong>2.2.</strong> <strong>配合concat( )函数拼接语句或命令</strong></h3>
<p><strong>举例说明：</strong></p>
<ul>
<li>模仿以下语句,进行数据库的分库分表备份。</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysqldump <span class="token operator">-</span>uroot <span class="token operator">-</span>p123 world city <span class="token operator">></span><span class="token operator">/</span>bak<span class="token operator">/</span>world_city<span class="token punctuation">.</span><span class="token keyword">sql</span>  <span class="token comment">//分库分表备份</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>拼接语句：</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
CONCAT<span class="token punctuation">(</span><span class="token string">"mysqldump -uroot -p123 "</span><span class="token punctuation">,</span>table_schema<span class="token punctuation">,</span><span class="token string">" "</span><span class="token punctuation">,</span>table_name
<span class="token punctuation">,</span><span class="token string">" >/bak/"</span><span class="token punctuation">,</span>table_schema<span class="token punctuation">,</span><span class="token string">"_"</span><span class="token punctuation">,</span>table_name<span class="token punctuation">,</span><span class="token string">".sql"</span><span class="token punctuation">)</span>
<span class="token keyword">FROM</span> information_schema<span class="token punctuation">.</span><span class="token keyword">tables</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-9.png" alt="day04-9.png" tabindex="0" loading="lazy"><figcaption>day04-9.png</figcaption></figure>
<ul>
<li><strong>模仿以下语句,进行批量生成对world库下所有表进行操作</strong></li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> world<span class="token punctuation">.</span>city <span class="token keyword">DISCARD</span> <span class="token keyword">TABLESPACE</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>拼接语句：</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 
CONCAT<span class="token punctuation">(</span><span class="token string">"ALTER TABLE "</span><span class="token punctuation">,</span>table_schema<span class="token punctuation">,</span><span class="token string">"."</span><span class="token punctuation">,</span>table_name<span class="token punctuation">,</span><span class="token string">" DISCARD TABLESPACE;"</span><span class="token punctuation">)</span>
<span class="token keyword">FROM</span> information_schema<span class="token punctuation">.</span><span class="token keyword">tables</span>
<span class="token keyword">WHERE</span> table_schema<span class="token operator">=</span><span class="token string">'world'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-show-常用命令介绍" tabindex="-1"><a class="header-anchor" href="#_2-3-show-常用命令介绍" aria-hidden="true">#</a> <strong>2.3 show 常用命令介绍</strong></h3>
<table>
<thead>
<tr>
<th style="text-align:left"><img width=136/>主要命令<img width=136/></th>
<th><img width=136/>作用说明<img width=136/></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">show databases;</td>
<td>查看数据库名</td>
</tr>
<tr>
<td style="text-align:left">show tables;</td>
<td>查看表名</td>
</tr>
<tr>
<td style="text-align:left">show create database xx;</td>
<td>查看建库语句</td>
</tr>
<tr>
<td style="text-align:left">show create table xx;</td>
<td>查看建表语句</td>
</tr>
<tr>
<td style="text-align:left">show processlist;</td>
<td>查看所有用户连接情况</td>
</tr>
<tr>
<td style="text-align:left">show charset;</td>
<td>查看支持的字符集</td>
</tr>
<tr>
<td style="text-align:left">show collation;</td>
<td>查看所有支持的校对规则</td>
</tr>
<tr>
<td style="text-align:left">show grants for xx;</td>
<td>查看用户的权限信息</td>
</tr>
<tr>
<td style="text-align:left">show variables like '%xx%'</td>
<td>查看参数信息</td>
</tr>
<tr>
<td style="text-align:left">show engines;</td>
<td>查看所有支持的存储引擎类型</td>
</tr>
<tr>
<td style="text-align:left">show index from xxx</td>
<td>查看表的索引信息</td>
</tr>
<tr>
<td style="text-align:left">show engine innodb status\G</td>
<td>查看innoDB引擎详细状态信息</td>
</tr>
<tr>
<td style="text-align:left">show binary logs</td>
<td>查看二进制日志的列表信息</td>
</tr>
<tr>
<td style="text-align:left">show binlog events in '二进制文件名'</td>
<td>查看二进制日志的事件信息</td>
</tr>
<tr>
<td style="text-align:left">show master status ;</td>
<td>查看mysql当前使用二进制日志信息</td>
</tr>
<tr>
<td style="text-align:left">show slave status\G</td>
<td>查看从库状态信息</td>
</tr>
<tr>
<td style="text-align:left">show status like ''</td>
<td>查看数据库整体状态信息</td>
</tr>
<tr>
<td style="text-align:left">help show ;</td>
<td>查看更多</td>
</tr>
<tr>
<td style="text-align:left">show relaylog events in ''</td>
<td>查看中继日志的事件信息</td>
</tr>
</tbody>
</table>
</div></template>


