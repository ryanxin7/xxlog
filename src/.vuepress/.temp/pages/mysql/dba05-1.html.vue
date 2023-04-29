<template><div><h1 id="innodb-存储引擎物理存储结构" tabindex="-1"><a class="header-anchor" href="#innodb-存储引擎物理存储结构" aria-hidden="true">#</a> <strong>InnoDB 存储引擎物理存储结构</strong></h1>
<p><strong>最直观的存储方式</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ll /data/mysql/data
ibdata1：<span class="token comment">#系统数据字典信息(统计信息)，UNDO表空间等数据 </span>
ib_logfile0 ~ ib_logfile1: <span class="token comment">#REDO日志文件，事务日志文件。</span>
ibtmp1： <span class="token comment">#临时表空间磁盘位置，存储临时表</span>
frm：<span class="token comment">#存储表的列信息</span>
ibd：<span class="token comment">#表的数据行和索引</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h2 id="_1-表空间-tablespace" tabindex="-1"><a class="header-anchor" href="#_1-表空间-tablespace" aria-hidden="true">#</a> 1. 表空间 Tablespace</h2>
<br>
<p>源于 Oracle</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section5-2-1.png" alt="表空间1" tabindex="0" loading="lazy"><figcaption>表空间1</figcaption></figure>
<p><strong>表空间数据问题</strong></p>
<ul>
<li>
<p><strong>ibdata1</strong> : 存储整个库的统计信息+Undo 日志信息</p>
</li>
<li>
<p><strong>ibd</strong>  : 存储数据行和索引</p>
<br>
<br>
</li>
</ul>
<h3 id="_1-1-共享表空间-ibdata1-n" tabindex="-1"><a class="header-anchor" href="#_1-1-共享表空间-ibdata1-n" aria-hidden="true">#</a> 1.1 共享表空间 (ibdata1~N)</h3>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section5-2-2.png" alt="表空间2" tabindex="0" loading="lazy"><figcaption>表空间2</figcaption></figure>
<p>5.5 版本的默认模式, 5.6 中转换为了独立表空间 <br></p>
<p>需要将所有数据存储到同一个表空间中 ，文件比较大 管理混乱<br></p>
<br>
<ul>
<li>5.5版本出现的管理模式，也是默认的管理模式。</li>
<li>5.6版本以，共享表空间保留，只用来存储:数据字典信息,undo,临时表。</li>
<li>5.7 版本,临时表被独立出来了</li>
<li>8.0版本,undo也被独立出去了</li>
</ul>
 <br>
<p><strong>具体变化参考官方文档:</strong></p>
<ul>
<li><a href="https://dev.mysql.com/doc/refman/5.6/en/innodb-architecture.html" target="_blank" rel="noopener noreferrer">https://dev.mysql.com/doc/refman/5.6/en/innodb-architecture.html<ExternalLinkIcon/></a></li>
<li><a href="https://dev.mysql.com/doc/refman/5.7/en/innodb-architecture.html" target="_blank" rel="noopener noreferrer">https://dev.mysql.com/doc/refman/5.7/en/innodb-architecture.html<ExternalLinkIcon/></a></li>
<li><a href="https://dev.mysql.com/doc/refman/5.8/en/innodb-architecture.html" target="_blank" rel="noopener noreferrer">https://dev.mysql.com/doc/refman/5.8/en/innodb-architecture.html<ExternalLinkIcon/></a></li>
</ul>
<h3 id="_1-2-共享表空间设置" tabindex="-1"><a class="header-anchor" href="#_1-2-共享表空间设置" aria-hidden="true">#</a> 1.2 共享表空间设置</h3>
<p>在搭建MySQL时，初始化数据之前设置到参数文件中。
<br></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span><span class="token keyword">select</span> @<span class="token variable">@innodb_data_file_path</span><span class="token punctuation">;</span>
<span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span><span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">'%extend%'</span><span class="token punctuation">;</span>
innodb_data_file_path<span class="token operator">=</span>ibdata1:<span class="token number">512</span>M:ibdata2:<span class="token number">512</span>M:autoextend
innodb_autoextend_increment<span class="token operator">=</span><span class="token number">64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div> <br>
<p><strong>例如:</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysqld --initialize-insecure <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql <span class="token parameter variable">--basedir</span><span class="token operator">=</span>xxxxxx<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
<span class="token assign-left variable">innodb_data_file_path</span><span class="token operator">=</span>ibdata1:512M:ibdata2:512M:autoextend
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>共享表空间重点了解</strong></p>
<ul>
<li>知道共享表空间存储的什么东西</li>
<li>初始化之前在配置文件提前定义大小</li>
</ul>
<p><br> <br></p>
<h3 id="_1-3-独立表空间" tabindex="-1"><a class="header-anchor" href="#_1-3-独立表空间" aria-hidden="true">#</a> 1.3 独立表空间</h3>
 <br>
<p><strong>独立每一个表</strong></p>
  <br>
<p><strong>从 5.6版本之后，默认表空间不再使用共享表空间，替换为独立表空间。</strong></p>
<p><strong>存储特点为</strong>：一个表一个ibd文件，存储数据行和索引信息。</p>
<p>一张 InnoDB 表是由  <strong>frm （表结构列）</strong>+ <strong>idb（数据行索引）</strong>+ <strong>ibdata1（统计信息元数据）</strong> 组成</p>
<br>
  <br>
<p><strong>MySQL的存储引擎日志</strong></p>
<p><strong>Redo Log</strong>: <code v-pre>ib_logfile0</code> <code v-pre>ib_logfile1</code>，重做日志<br></p>
<p><strong>Undo Log</strong>: <code v-pre>ibdata1</code> <code v-pre>ibdata2</code> (存储在共享表空间中)，回滚日志<br></p>
<br>
<p><strong>临时表: ibtmp1，在做多表联合查询 join union 操作产生临时数据，用完就自动清理</strong></p>
<br>
<p><strong>独立表空间设置</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>db01 <span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span><span class="token keyword">select</span> @<span class="token variable">@innodb_file_per_table</span><span class="token punctuation">;</span> <span class="token comment">--每张表一个文件 改成0就变成共享表空间了，不会影响之前表的空间设置</span>
<span class="token operator">+</span><span class="token comment">-------------------------+</span>
<span class="token operator">|</span> @<span class="token variable">@innodb_file_per_table</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------------------+</span>
<span class="token operator">|</span>           <span class="token number">1</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------------------+</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>独立表空间迁移</strong></p>
<br>
<p><strong>目标</strong>：把一个100万行的数据表迁移到另一个数据库实例内。</p>
<p><strong>设想</strong>：把data目录下test数据库下面的 t100w.frm t100w.ibd文件直接拷贝过去使用。</p>
<p><strong>结论</strong>： 原因没有表的元数据，无法识别表。生成元数据需要找到原表的建表语句</p>
<br>
<p>(1) 创建和原表结构一致的空表</p>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> t100w <span class="token punctuation">(</span>
<span class="token operator">-</span><span class="token operator">></span> id <span class="token keyword">int</span><span class="token punctuation">,</span>
<span class="token operator">-</span><span class="token operator">></span> num <span class="token keyword">int</span><span class="token punctuation">,</span>
<span class="token operator">-</span><span class="token operator">></span> k1 <span class="token keyword">char</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token operator">-</span><span class="token operator">></span> k2 <span class="token keyword">char</span> <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token operator">-</span><span class="token operator">></span> dt <span class="token keyword">timestamp</span>
<span class="token operator">-</span><span class="token operator">></span> <span class="token punctuation">)</span> <span class="token keyword">charset</span> utf8mb4 <span class="token keyword">collate</span> utf8mb4_bin<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(2) 将空表的ibd文件删除</p>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">table</span> t100w <span class="token keyword">discard</span> <span class="token keyword">tablespace</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<ol start="3">
<li>将原表的ibd拷贝过来,并且修改权限</li>
</ol>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>cp <span class="token operator">-</span>a t100w<span class="token punctuation">.</span>ibd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span><span class="token number">3307</span><span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>test
chown <span class="token operator">-</span>R mysql<span class="token punctuation">.</span>mysql <span class="token operator">*</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>(4) 将原表ibd进行导入</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">table</span> city <span class="token keyword">import</span> <span class="token keyword">tablespace</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询表数据</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> count（<span class="token operator">*</span>） <span class="token keyword">from</span> t100w<span class="token punctuation">;</span>
<span class="token number">1030346</span>
<span class="token number">1</span> <span class="token keyword">row</span> <span class="token operator">in</span> <span class="token keyword">set</span> <span class="token punctuation">(</span><span class="token number">0.99</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


