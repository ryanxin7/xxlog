<template><div><h1 id="索引原理介绍创建与执行计划分析" tabindex="-1"><a class="header-anchor" href="#索引原理介绍创建与执行计划分析" aria-hidden="true">#</a> 索引原理介绍创建与执行计划分析</h1>
<h2 id="_1-索引的作用" tabindex="-1"><a class="header-anchor" href="#_1-索引的作用" aria-hidden="true">#</a> 1.索引的作用</h2>
<p>类似书的目录,起到优化查询的作用</p>
<h2 id="_2-索引的分类-算法" tabindex="-1"><a class="header-anchor" href="#_2-索引的分类-算法" aria-hidden="true">#</a> <strong>2.</strong> 索引的分类(算法)</h2>
<ul>
<li>
<p>B树  默认使用的索引类型</p>
</li>
<li>
<p>R树 基本不用</p>
</li>
<li>
<p>Hash 自适应 自动优化不需要设置</p>
</li>
<li>
<p>FullText  全文索引 类似ES数据库</p>
</li>
<li>
<p>GIS 索引 5.7版本 用于存储地理位置信息</p>
</li>
</ul>
<h2 id="_3-btree索引算法演变" tabindex="-1"><a class="header-anchor" href="#_3-btree索引算法演变" aria-hidden="true">#</a> 3. BTREE索引算法演变</h2>
<h3 id="_3-1-顺序查找法" tabindex="-1"><a class="header-anchor" href="#_3-1-顺序查找法" aria-hidden="true">#</a> 3.1 顺序查找法</h3>
<p>顺序查找，顾名思义，就是从头到尾遍历的查找，直到找到要找的元素x为止，所以这种方法对于有n个元素的线性表而言，在最坏情况下需要n次比较。</p>
<h3 id="_3-2-二分查找法" tabindex="-1"><a class="header-anchor" href="#_3-2-二分查找法" aria-hidden="true">#</a> 3.2 二分查找法</h3>
<p>使用二分查找法的前提是要查找的序列是已经排序好的，所以若序列不是顺序的，应先对其进行排序，或者从小到大，或者从大到小。这种方法的特点是无论怎样查找，每次都只是在一半的数据中查找。</p>
<h3 id="_3-3-二叉排序树查找" tabindex="-1"><a class="header-anchor" href="#_3-3-二叉排序树查找" aria-hidden="true">#</a> 3.3 二叉排序树查找</h3>
<p>二叉树是一种很有用的非线性结构。在二叉树中，每一个结点的度最大为2，二叉树中的每个结点的子树被分为左子树和右子树。在二叉树中，一个结点可以只有左子树而没有右子树，也可以只有右子树而没有左子树。当一个结点既没有左子树也没有右子树时，该结点即为叶子结点。</p>
<h3 id="_3-4-平衡二叉树" tabindex="-1"><a class="header-anchor" href="#_3-4-平衡二叉树" aria-hidden="true">#</a> 3.4 平衡二叉树</h3>
<p>平衡二叉树 是在 二叉树上 进一步限制,在向树种添加节点时,牺牲一定的时间和空间,通过若干次旋转,达到一定的平衡;以提高查询的性能。</p>
<h3 id="_3-5-btree" tabindex="-1"><a class="header-anchor" href="#_3-5-btree" aria-hidden="true">#</a> 3.5 Btree</h3>
<p>英文名字叫做B-tree，中间的短线是英文连接符，只是翻译的时候将短线翻译成了减号。<strong>全称Balance-tree(平衡多路查找树)</strong>，<strong>平衡</strong>的意思是左边和右边分布均匀。<strong>多路</strong>的意思是相对于二叉树而言的，二叉树就是二路查找树，查找时只有两条路，而B-tree有多条路，即父节点有多个子节点。使用B-tree结构可以<strong>显著减少定位</strong>记录时所经历的中间<strong>过程</strong>，从而加快存取速度。这个数据结构一般用于<strong>数据库的索引</strong>，综合效率较高。</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-10.png" alt="Btree " tabindex="0" loading="lazy"><figcaption>Btree </figcaption></figure>
<div class="hint-container tip">
<p class="hint-container-title">Btree 演变</p>
<p><strong>b-树</strong> 上层节点保存的下层节点的最小值。</p>
<p><strong>b+树</strong> （ 对范围查询优化） 有可能在相邻的叶子节点 ，查询完第一个叶子节点直接查询相邻的叶子节点避免了重新遍历根节点省去IO资源。</p>
<p><strong>b*树</strong> 在普通b数上增加了 叶子节点和支节点的双向指针机制，进一步对范围查询优化如： <code v-pre>like</code>  <code v-pre>&gt;</code> <code v-pre>&lt;</code> 等语句。</p>
<p>目前版本数据库使用<strong>b*树</strong></p>
</div>
<h2 id="_4-btree索引功能上的分类" tabindex="-1"><a class="header-anchor" href="#_4-btree索引功能上的分类" aria-hidden="true">#</a> 4. Btree索引功能上的分类</h2>
<br>
<br>
<br>
<h3 id="_4-1辅助索引-二级索引" tabindex="-1"><a class="header-anchor" href="#_4-1辅助索引-二级索引" aria-hidden="true">#</a> 4.1辅助索引 （二级索引）</h3>
<br>
<p>(1) 提取索引列的所有值,进行排序</p>
<p>(2) 将排好序的值,均匀的存放在叶子节点,  进一步生成枝节点和根节点</p>
<p>(3) 在叶子节点中的值,都会对应存储主键ID</p>
<br>
<br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-11.png" alt="day04-11.png" tabindex="0" loading="lazy"><figcaption>day04-11.png</figcaption></figure>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-12.png" alt="day04-12.png" loading="lazy">
<br></p>
<br>
<p>这时如果书的页码不按顺序写页码是乱的，辅助索引会也会性能降低。</p>
<br>
<h3 id="_4-2-聚集索引" tabindex="-1"><a class="header-anchor" href="#_4-2-聚集索引" aria-hidden="true">#</a> 4.2 聚集索引</h3>
<br>
<p>(1) MySQL 会自动选择主键作为聚集索引列,没有主键会选择唯一键,如果都没有会生成隐藏的.主键</p>
<p>(2) MySQL进行存储数据时,会按照聚集索引列值得顺序,有序存储数据行</p>
<p>(3) 聚集索引直接将原表数据页,作为叶子节点,然后提取聚集索引列向上生成枝和根</p>
<br>
<div class="hint-container tip">
<p class="hint-container-title">聚集索引</p>
<p><strong>聚集索引一般是主键列</strong> ，创建表的时候创建主键。比如写书时就已经框定了页码 、章节的书写顺序规则，这样有顺序找页码的时候就更加好找。</p>
<p>在用户输入数据时，按照<strong>主键的顺序</strong>在磁盘上规划和存储数据行。</p>
<p><strong>聚集索引是自动维护的，数据在写入的时候就已经有序了</strong></p>
<p><strong>聚集索引</strong> 直接将整行数据按照顺序存储到了叶子节点当中，上层节点依旧取下层节点的最小值。</p>
</div>
<h3 id="_4-3-聚集索引和辅助索引共同使用" tabindex="-1"><a class="header-anchor" href="#_4-3-聚集索引和辅助索引共同使用" aria-hidden="true">#</a> 4.3 聚集索引和辅助索引共同使用</h3>
<br>
<div class="hint-container tip">
<p class="hint-container-title">例如：查询一个 name列 张三 的流程：</p>
<p>1.管理员设置 name 列为索引</p>
<p>2.数据库自动将系列值取出来</p>
<p>3.将排好序的值,均匀的存放在叶子节点</p>
<p>4.进一步生成枝节点和根节点</p>
<p>5.在叶子节点中的值,都会对应存储主键ID</p>
<p>6.MySQL 会自动选择主键作为聚集索引列,没有主键会选择唯一键,如果都没有会生成隐藏的主键</p>
<p>7.聚集索引直接将原表数据页,作为叶子节点,然后提取聚集索引列向上生成枝和根</p>
<p>8.聚集索引中遍历对应的存储主键ID</p>
<p>9.找到包含张三的数据行输出</p>
</div>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-13.png" alt="day04-13.png" tabindex="0" loading="lazy"><figcaption>day04-13.png</figcaption></figure>
<h3 id="_4-4-聚集索引和辅助索引的区别" tabindex="-1"><a class="header-anchor" href="#_4-4-聚集索引和辅助索引的区别" aria-hidden="true">#</a> <strong>4.4</strong> <strong>聚集索引和辅助索引的区别</strong></h3>
<br>
<p><strong>辅助索引是自己创建的</strong> <strong>where name</strong>  有序值、ID的主键值</p>
<p><strong>聚集索引是自动生成的</strong>  <strong>where id</strong> ID</p>
<br>
<ul>
<li>
<p>表中任何一个列都可以创建辅助索引,在你有需要的时候可以有多个辅助索引,只要名字不同即可</p>
</li>
<li>
<p>在一张表中,聚集索引只能有一个,一般是主键</p>
</li>
<li>
<p>辅助索引,叶子节点只存储索引列的有序值+聚集索（ID的主键值）引列值</p>
</li>
<li>
<p>聚集索引,叶子节点存储的是有序的整行数据.</p>
</li>
<li>
<p>MySQL 的表数据存储是聚集索引组织表</p>
</li>
</ul>
<h2 id="_5-辅助索引细分" tabindex="-1"><a class="header-anchor" href="#_5-辅助索引细分" aria-hidden="true">#</a> <strong>5.</strong> <strong>辅助索引细分</strong></h2>
<br>
<p>单列辅助索引 随便选一列</p>
<p>联合索引(覆盖索引)</p>
<p>唯一索引 索引列的值都是唯一的</p>
<br>
<h2 id="_6-索引树高度" tabindex="-1"><a class="header-anchor" href="#_6-索引树高度" aria-hidden="true">#</a> <strong>6.</strong> <strong>索引树高度</strong></h2>
<br>
<p>索引树高度应当越低越好,一般维持在3-4最佳</p>
<div class="hint-container tip">
<p class="hint-container-title">影响索引树高度的因素：</p>
<p>数据行数较多： 解决方法 分表 : parttion 用的比较少了（分片,分布式架构）</p>
<p>字段长度：解决方法 业务允许,尽量选择字符长度短的列作为索引列；业务不允许,采用前缀索引</p>
<p>数据类型： <code v-pre>char</code> 和 <code v-pre>varchar</code>  <code v-pre>char</code>比<code v-pre>varchar</code> 叶子节点消耗大，使用enum  作为索引列 （类似 12345） 索引树更简洁扫描起来更高效。</p>
</div>
<p>​</p>
<h2 id="_7-索引的命令操作" tabindex="-1"><a class="header-anchor" href="#_7-索引的命令操作" aria-hidden="true">#</a> <strong>7.</strong> <strong>索引的命令操作</strong></h2>
 <br>
<h3 id="_7-1-查询索引" tabindex="-1"><a class="header-anchor" href="#_7-1-查询索引" aria-hidden="true">#</a> 7.1 查询索引</h3>
 <br>
<p>PRI  主键索引 聚集索引</p>
<p>MUL   辅助索引</p>
<p>UNI  唯一索引</p>
<br>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-14.png" alt="day04-14.png" loading="lazy">
<br></p>
<p>查看索引信息：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">show</span> <span class="token keyword">index</span> <span class="token keyword">from</span> city\G 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-15.png" alt="day04-15.png" tabindex="0" loading="lazy"><figcaption>day04-15.png</figcaption></figure>
<br>
<h3 id="_7-2-创建索引" tabindex="-1"><a class="header-anchor" href="#_7-2-创建索引" aria-hidden="true">#</a> <strong>7.2 创建索引</strong></h3>
<br>
<p><strong>单列的辅助索引:</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">alter</span> <span class="token keyword">table</span> city <span class="token keyword">add</span> <span class="token keyword">index</span> idx_name<span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">--（DDL操作 锁表）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-16.png" alt="day04-16.png" loading="lazy">
<br></p>
<p><strong>多列的联合索引:</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">alter</span> <span class="token keyword">table</span> city <span class="token keyword">add</span> <span class="token keyword">index</span> idx_c_p<span class="token punctuation">(</span>countrycode<span class="token punctuation">,</span>population<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<p><strong>唯一索引:</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">alter</span> <span class="token keyword">table</span> city <span class="token keyword">add</span> <span class="token keyword">unique</span> <span class="token keyword">index</span> uidx_dis<span class="token punctuation">(</span>district<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-17.png" alt="day04-17.png" tabindex="0" loading="lazy"><figcaption>day04-17.png</figcaption></figure>
<div class="hint-container danger">
<p class="hint-container-title">有重复报错</p>
<p>唯一索引数据行中不能有重复</p>
</div>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>去除重复
mysql<span class="token operator">></span> <span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span>district<span class="token punctuation">)</span> <span class="token keyword">from</span> city<span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token keyword">distinct</span> district<span class="token punctuation">)</span> <span class="token keyword">from</span> city<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>前缀索引</strong>：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code> 只能建在 字符串列
 mysql<span class="token operator">></span> <span class="token keyword">alter</span> <span class="token keyword">table</span> city <span class="token keyword">add</span> <span class="token keyword">index</span> idx_dis<span class="token punctuation">(</span>district<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">--只取前五个字符</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_7-3-删除索引" tabindex="-1"><a class="header-anchor" href="#_7-3-删除索引" aria-hidden="true">#</a> 7.3 删除索引</h3>
<br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">show</span> <span class="token keyword">index</span> <span class="token keyword">from</span> city
mysql<span class="token operator">></span> <span class="token keyword">alter</span> <span class="token keyword">table</span> city <span class="token keyword">drop</span> <span class="token keyword">index</span> idx_name<span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">alter</span> <span class="token keyword">table</span> city <span class="token keyword">drop</span> <span class="token keyword">index</span> idx_c_p<span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">alter</span> <span class="token keyword">table</span> city <span class="token keyword">drop</span> <span class="token keyword">index</span> idx_dis<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h2 id="_8-索引压力测试-对比索引前后效果" tabindex="-1"><a class="header-anchor" href="#_8-索引压力测试-对比索引前后效果" aria-hidden="true">#</a> <strong>8.</strong> 索引压力测试 （对比索引前后效果）</h2>
<br>
<p>压力测试准备：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">use</span> test <span class="token comment">--导入数据</span>

mysql<span class="token operator">></span> source <span class="token operator">/</span>tmp<span class="token operator">/</span>t100w<span class="token punctuation">.</span><span class="token keyword">sql</span>

<span class="token keyword">select</span> count（<span class="token operator">*</span>） <span class="token keyword">from</span> t100w； <span class="token comment">--查询数据行数量</span>

<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> t100w <span class="token keyword">limit</span> <span class="token number">10</span>；<span class="token comment">--查询前10行数据</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-18.png" alt="day04-18.png" tabindex="0" loading="lazy"><figcaption>day04-18.png</figcaption></figure>
<br>
<br>
<h3 id="_8-1-未做优化之前测试" tabindex="-1"><a class="header-anchor" href="#_8-1-未做优化之前测试" aria-hidden="true">#</a> 8.1 未做优化之前测试</h3>
<br>
<p>模拟<strong>100个用户</strong>进行了<strong>2000次查询</strong></p>
<p>选k2列中的一个数据进行查询。</p>
<p><strong>测试命令</strong>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysqlslap --defaults-file<span class="token operator">=</span>/etc/my.cnf <span class="token punctuation">\</span>
<span class="token parameter variable">--concurrency</span><span class="token operator">=</span><span class="token number">100</span> <span class="token parameter variable">--iterations</span><span class="token operator">=</span><span class="token number">1</span> --create-schema<span class="token operator">=</span><span class="token string">'test'</span> <span class="token punctuation">\</span>
<span class="token parameter variable">--query</span><span class="token operator">=</span><span class="token string">"select * from test.t100w where k2='MN89'"</span> <span class="token assign-left variable">engine</span><span class="token operator">=</span>innodb <span class="token punctuation">\</span>
--number-of-queries<span class="token operator">=</span><span class="token number">2000</span> <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123</span> <span class="token parameter variable">-verbose</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p><strong>未设置索引测试结果：755.861 秒</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># mysqlslap --defaults-file=/etc/my.cnf \</span>
<span class="token operator">></span> <span class="token parameter variable">--concurrency</span><span class="token operator">=</span><span class="token number">100</span> <span class="token parameter variable">--iterations</span><span class="token operator">=</span><span class="token number">1</span> --create-schema<span class="token operator">=</span><span class="token string">'test'</span> <span class="token punctuation">\</span>
<span class="token operator">></span> <span class="token parameter variable">--query</span><span class="token operator">=</span><span class="token string">"select * from test.t100w where k2='MN89'"</span> <span class="token assign-left variable">engine</span><span class="token operator">=</span>innodb <span class="token punctuation">\</span>
<span class="token operator">></span> --number-of-queries<span class="token operator">=</span><span class="token number">2000</span> <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123</span> <span class="token parameter variable">-verbose</span>
mysqlslap: <span class="token punctuation">[</span>Warning<span class="token punctuation">]</span> Using a password on the <span class="token builtin class-name">command</span> line interface can be insecure.
Benchmark
Running <span class="token keyword">for</span> engine rbose
Average number of seconds to run all queries: <span class="token number">755.861</span> seconds
Minimum number of seconds to run all queries: <span class="token number">755.861</span> seconds
Maximum number of seconds to run all queries: <span class="token number">755.861</span> seconds
Number of clients running queries: <span class="token number">100</span>
Average number of queries per client: <span class="token number">20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2索引优化后" tabindex="-1"><a class="header-anchor" href="#_8-2索引优化后" aria-hidden="true">#</a> 8.2索引优化后</h3>
<br>
<p><strong>创建辅助索引</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">alter</span> <span class="token keyword">table</span> t100w <span class="token keyword">add</span> <span class="token keyword">index</span> idx_k2<span class="token punctuation">(</span>k2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-19.png" alt="day04-19.png" tabindex="0" loading="lazy"><figcaption>day04-19.png</figcaption></figure>
<br>
<br>
<p><strong>未设置索引测试结果：1.678 秒</strong>  相差700倍</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># mysqlslap --defaults-file=/etc/my.cnf \</span>
<span class="token operator">></span> <span class="token parameter variable">--concurrency</span><span class="token operator">=</span><span class="token number">100</span> <span class="token parameter variable">--iterations</span><span class="token operator">=</span><span class="token number">1</span> --create-schema<span class="token operator">=</span><span class="token string">'test'</span> <span class="token punctuation">\</span>
<span class="token operator">></span> <span class="token parameter variable">--query</span><span class="token operator">=</span><span class="token string">"select * from test.t100w where k2='MN89'"</span> <span class="token assign-left variable">engine</span><span class="token operator">=</span>innodb <span class="token punctuation">\</span>
<span class="token operator">></span> --number-of-queries<span class="token operator">=</span><span class="token number">2000</span> <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123</span> <span class="token parameter variable">-verbose</span>
mysqlslap: <span class="token punctuation">[</span>Warning<span class="token punctuation">]</span> Using a password on the <span class="token builtin class-name">command</span> line interface can be insecure.
Benchmark
Running <span class="token keyword">for</span> engine rbose
Average number of seconds to run all queries: <span class="token number">1.678</span> seconds
Minimum number of seconds to run all queries: <span class="token number">1.678</span> seconds
Maximum number of seconds to run all queries: <span class="token number">1.678</span> seconds
Number of clients running queries: <span class="token number">100</span>
Average number of queries per client: <span class="token number">20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h2 id="_9-执行计划分析" tabindex="-1"><a class="header-anchor" href="#_9-执行计划分析" aria-hidden="true">#</a> <strong>9.</strong> <strong>执行计划分析</strong></h2>
<br>
<h3 id="_9-1-执行计划的作用" tabindex="-1"><a class="header-anchor" href="#_9-1-执行计划的作用" aria-hidden="true">#</a> <strong>9.1</strong> <strong>执行计划的作用</strong></h3>
<br>
<p>将优化器 选择后的执行计划 截取出来.便于管理管理员判断语句得执行效率。</p>
<br>
<h3 id="_9-2-获取执行" tabindex="-1"><a class="header-anchor" href="#_9-2-获取执行" aria-hidden="true">#</a> <strong>9.2</strong> <strong>获取执行</strong></h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">desc</span>  <span class="token comment">--SQL语句</span>
<span class="token keyword">explain</span> <span class="token comment">--SQL 语句</span>
mysql<span class="token operator">></span> <span class="token keyword">desc</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> test<span class="token punctuation">.</span>t100w <span class="token keyword">where</span> k2<span class="token operator">=</span><span class="token string">'MN89'</span><span class="token punctuation">;</span> <span class="token comment">--获取语句的计划</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取语句的计划：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">desc</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> test<span class="token punctuation">.</span>t100w <span class="token keyword">where</span> k2<span class="token operator">=</span><span class="token string">'MN89'</span><span class="token punctuation">;</span> <span class="token comment">--获取语句的计划</span>
<span class="token operator">+</span><span class="token comment">----+-------------+-------+------------+------+---------------+------+---------+------+---------+----------+-------------+</span>
<span class="token operator">|</span> id <span class="token operator">|</span> select_type <span class="token operator">|</span> <span class="token keyword">table</span> <span class="token operator">|</span> partitions <span class="token operator">|</span> <span class="token keyword">type</span> <span class="token operator">|</span> possible_keys <span class="token operator">|</span> <span class="token keyword">key</span> <span class="token operator">|</span> key_len <span class="token operator">|</span> ref <span class="token operator">|</span> <span class="token keyword">rows</span>  <span class="token operator">|</span> filtered <span class="token operator">|</span> Extra    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+-------------+-------+------------+------+---------------+------+---------+------+---------+----------+-------------+</span>
<span class="token operator">|</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token keyword">SIMPLE</span>   <span class="token operator">|</span> t100w <span class="token operator">|</span> <span class="token boolean">NULL</span>    <span class="token operator">|</span> <span class="token keyword">ALL</span> <span class="token operator">|</span> <span class="token boolean">NULL</span>     <span class="token operator">|</span> <span class="token boolean">NULL</span> <span class="token operator">|</span> <span class="token boolean">NULL</span>  <span class="token operator">|</span> <span class="token boolean">NULL</span> <span class="token operator">|</span> <span class="token number">1027638</span> <span class="token operator">|</span>  <span class="token number">10.00</span> <span class="token operator">|</span> <span class="token keyword">Using</span> <span class="token keyword">where</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+-------------+-------+------------+------+---------------+------+---------+------+---------+----------+-------------+</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_9-3-分析执行计划" tabindex="-1"><a class="header-anchor" href="#_9-3-分析执行计划" aria-hidden="true">#</a> <strong>9.3</strong> <strong>分析执行计划</strong></h3>
<h4 id="_9-3-1-table-列" tabindex="-1"><a class="header-anchor" href="#_9-3-1-table-列" aria-hidden="true">#</a> <strong>9.3.1 table</strong> 列</h4>
<p>table 表名</p>
<h4 id="_9-3-2-type列" tabindex="-1"><a class="header-anchor" href="#_9-3-2-type列" aria-hidden="true">#</a> <strong>9.3.2 type</strong>列</h4>
<p>查询的类型:</p>
<p>全表扫描  : ALL
索引扫描 级别 : index,range,ref,eq_ref,const(system),NULL  <strong>从左到右性能越好</strong>。</p>
 <br>
<br>
<p><strong>索引扫描级别分类说明：</strong></p>
<p><strong>index:</strong> <strong>全索引扫描</strong> ，需要遍历整个索引树才能获取到数据 ,<strong>性能比全表扫描ALL好</strong>。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">desc</span> <span class="token keyword">select</span> countrycode <span class="token keyword">from</span> city<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<br>
<p><strong>range:</strong> <strong>索引范围扫描</strong>  <code v-pre>&gt; &lt; &gt;= &lt;= , between and ,or,in,like</code>  （<strong>范围查询</strong>）</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">desc</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> city <span class="token keyword">where</span> id<span class="token operator">></span><span class="token number">2000</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">desc</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> city <span class="token keyword">where</span> countrycode <span class="token operator">like</span> <span class="token string">'CH%'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>B树 对连续数据查询有优化，可以享受到B树 叶子节点双向指针的优化 。</strong></p>
<p>所以 <code v-pre>or in range</code>性能 比 <code v-pre>&gt; &lt; &gt;= &lt;= , between and like </code>要低</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">desc</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> city <span class="token keyword">where</span> countrycode<span class="token operator">=</span><span class="token string">'CHN'</span> <span class="token operator">or</span> countrycode<span class="token operator">=</span><span class="token string">'USA'</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">desc</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> city <span class="token keyword">where</span> countrycode <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token string">'CHN'</span><span class="token punctuation">,</span><span class="token string">'USA'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>对于辅助索引来讲,<code v-pre>!=</code>（不等于） 和<code v-pre>not in</code>等语句是不走索引的</strong></p>
<p><strong>对于主键索引列来讲,<code v-pre>!=</code> 和<code v-pre>not in</code>等语句是走 range索引</strong></p>
<p><strong><code v-pre>in or</code> 一般改写为 <code v-pre>union all</code>  进行语句优化：</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">desc</span> <span class="token keyword">select</span>  <span class="token operator">*</span> <span class="token keyword">from</span> city <span class="token keyword">where</span> countrycode<span class="token operator">=</span><span class="token string">'CHN'</span> <span class="token operator">or</span> countrycode<span class="token operator">=</span><span class="token string">'USA'</span><span class="token punctuation">;</span><span class="token comment">--改写为：</span>
<span class="token keyword">desc</span> 
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> city <span class="token keyword">where</span> countrycode<span class="token operator">=</span><span class="token string">'CHN'</span> 
<span class="token keyword">union</span> <span class="token keyword">all</span> 
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> city <span class="token keyword">where</span> countrycode<span class="token operator">=</span><span class="token string">'USA'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p><strong>ref: 辅助索引等值查询</strong></p>
<p><code v-pre>in or</code>  改写后的  <code v-pre>union all</code>  语句 变成了等值查询 ref 。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">desc</span> 
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> city <span class="token keyword">where</span> countrycode<span class="token operator">=</span><span class="token string">'CHN'</span> 
<span class="token keyword">union</span> <span class="token keyword">all</span> 
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> city <span class="token keyword">where</span> countrycode<span class="token operator">=</span><span class="token string">'USA'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p><strong>eq_ref : 多表连接时,子表使用主键列或唯一列作为连接条件</strong></p>
<p>A join B   时 <strong>B就是子表</strong></p>
<p>on a.x = B.y   <strong>B.y 列是主键或唯一键时 走eq_ref</strong></p>
<div class="hint-container tip">
<p class="hint-container-title">优化多表连接要求</p>
<p>在优化多表连接查询时，第一保证驱动表（左边）的数据量级是最小的因为它不能走索引，它是全表数据和别的表进行对比第二张表开始可以走索引。</p>
<p>建议被连接的表它的连接列<code v-pre>on</code> 的条件<code v-pre>B.y</code>最好是主键或唯一键，实在不行是辅助索引。</p>
<p>在表的设计阶段就应该设计好的。</p>
</div>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">desc</span> <span class="token keyword">select</span> b<span class="token punctuation">.</span>name<span class="token punctuation">,</span>a<span class="token punctuation">.</span>name <span class="token punctuation">,</span>a<span class="token punctuation">.</span>population 
<span class="token keyword">from</span> city <span class="token keyword">as</span> a 
<span class="token keyword">join</span> country <span class="token keyword">as</span> b 
<span class="token keyword">on</span> a<span class="token punctuation">.</span>countrycode<span class="token operator">=</span>b<span class="token punctuation">.</span>code 
<span class="token keyword">where</span> a<span class="token punctuation">.</span>population<span class="token operator">&lt;</span><span class="token number">100</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><br>city 是条件列</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-20.png" alt="day04-20.png" tabindex="0" loading="lazy"><figcaption>day04-20.png</figcaption></figure>
<br>
<br>
<p><strong>const(system) : 主键或者唯一键的等值查询</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">desc</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> city <span class="token keyword">where</span> id<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-21.png" alt="day04-21.png" tabindex="0" loading="lazy"><figcaption>day04-21.png</figcaption></figure>
<br>
<p><strong>NULL 性能最高因为没有这个数据行查不到。</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day04-22.png" alt="day04-22.png" tabindex="0" loading="lazy"><figcaption>day04-22.png</figcaption></figure>
</div></template>


