<template><div><h1 id="ddl-语句的应用" tabindex="-1"><a class="header-anchor" href="#ddl-语句的应用" aria-hidden="true">#</a> DDL 语句的应用</h1>
<h2 id="_1-对库的定义" tabindex="-1"><a class="header-anchor" href="#_1-对库的定义" aria-hidden="true">#</a> 1. 对库的定义</h2>
 <br>
<p><strong>作用：</strong> 对数据库 逻辑对象库或表的定义操作</p>
  <br>
  <br>
<p><strong>创建数据库</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> zabbix <span class="token keyword">CHARSET</span> utf8mb4 <span class="token keyword">COLLATE</span> utf8mb4_bin<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看库信息</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SHOW</span> <span class="token keyword">DATABASES</span><span class="token punctuation">;</span>
<span class="token keyword">SHOW</span> <span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> zabbix<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div> <br>
<p><strong>删除数据库</strong></p>
<p>生产中危险操作 ⚠️</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">DATABASE</span> xin<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>  <br>
 <br>
 <br>
<p><strong>修改数据库字符集</strong></p>
<p><strong>注意</strong>: 字符集一定是 <strong>从小往大了改</strong>，比如utf8修改成utf8mb4</p>
<p>目标字符集一定是源字符集的超集。</p>
  <br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> xin<span class="token punctuation">;</span>
<span class="token keyword">SHOW</span> <span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> xin<span class="token punctuation">;</span>
<span class="token keyword">ALTER</span> <span class="token keyword">DATABASE</span> xin <span class="token keyword">CHARSET</span> utf8mb4<span class="token punctuation">;</span>    <span class="token comment">--更改字符集</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>   <br>
  <br>
<h3 id="_1-1-关于库定义规范" tabindex="-1"><a class="header-anchor" href="#_1-1-关于库定义规范" aria-hidden="true">#</a> 1.1 关于库定义规范</h3>
   <br>
<div class="hint-container tip">
<p class="hint-container-title">库定义规范</p>
<ul>
<li>
<p>库名使用小写字符</p>
</li>
<li>
<p>库名不能以数字开头</p>
</li>
<li>
<p>不能是数据库内部的关键字</p>
</li>
<li>
<p>必须设置字符集</p>
</li>
</ul>
</div>
   <br>
  <br>
<h2 id="_2-对表的定义" tabindex="-1"><a class="header-anchor" href="#_2-对表的定义" aria-hidden="true">#</a> 2. 对表的定义</h2>
  <br>
<p><strong>建表需要定义以下属性：</strong></p>
<ul>
<li>
<p>表名</p>
</li>
<li>
<p>列名</p>
</li>
<li>
<p>列属性</p>
</li>
<li>
<p>表属性</p>
 <br>
</li>
</ul>
<p><strong>使用数据库工具建表</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section3-2-1.png" alt="使用数据库工具建表" tabindex="0" loading="lazy"><figcaption>使用数据库工具建表</figcaption></figure>
<p><strong>建表语句建表</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section3-2-2.png" alt="使用数据库工具建表2" tabindex="0" loading="lazy"><figcaption>使用数据库工具建表2</figcaption></figure>
   <br>
   <br>
<h3 id="_2-1-列属性" tabindex="-1"><a class="header-anchor" href="#_2-1-列属性" aria-hidden="true">#</a> 2.1 列属性</h3>
   <br>
<p><code v-pre>PRIMARY KEY</code> : 主键 约束,功能：表中只能有一个主键,主键列非空且唯一   <br>
<code v-pre>NOT NULL</code>  : 非空 约束,不允许空值   <br>
<code v-pre>UNIQUE KEY</code> : 唯一键约束,不允许重复值 （常用手机号，微信号唯一） 可以为空   <br></p>
   <br>
<p><strong>以上三个最常用</strong>
<br></p>
<p><code v-pre>DEFAULT</code>   : 一般配合 NOT NULL 一起使用. 生成定义好的默认值   <br>
<code v-pre>UNSIGNED</code>  : 无符号,一般是配合数字列,非负数   <br>
<code v-pre>COMMENT</code>   : 注释   <br>
<code v-pre>AUTO_INCREMENT</code> : 自增长的列，无需插入数据   <br></p>
  <br>
<p><strong>例子：建表语句设置列属性</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> stu <span class="token punctuation">(</span>
id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">COMMENT</span> <span class="token string">'学号'</span><span class="token punctuation">,</span>
sname <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'姓名'</span><span class="token punctuation">,</span>
age <span class="token keyword">TINYINT</span> <span class="token keyword">UNSIGNED</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token number">0</span> <span class="token keyword">COMMENT</span> <span class="token string">'年龄'</span><span class="token punctuation">,</span>
gender <span class="token keyword">ENUM</span><span class="token punctuation">(</span><span class="token string">'m'</span><span class="token punctuation">,</span><span class="token string">'f'</span><span class="token punctuation">,</span><span class="token string">'n'</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">'n'</span> <span class="token keyword">COMMENT</span> <span class="token string">'性别'</span><span class="token punctuation">,</span>
intime <span class="token keyword">DATETIME</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">COMMENT</span> <span class="token string">'入学时间'</span>
<span class="token punctuation">)</span><span class="token keyword">ENGINE</span> <span class="token keyword">INNODB</span> <span class="token keyword">CHARSET</span> utf8mb4<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>   <br>
  <br>
<h3 id="_2-2-建表规范" tabindex="-1"><a class="header-anchor" href="#_2-2-建表规范" aria-hidden="true">#</a> <strong>2.2 建表规范</strong></h3>
  <br>
<p><strong>知识点等级</strong>​ 🌟🌟🌟🌟🌟</p>
<div class="hint-container tip">
<p class="hint-container-title">注意​</p>
<ul>
<li>表名小写字母,不能数字开头,</li>
<li>不能是保留字符,使用和业务有关的表名</li>
<li>选择合适的数据类型及长度</li>
<li>每个列设置 NOT NULL + DEFAULT .对于数字0填充,对于字符使用有效字符串填充</li>
<li>每个列设置注释</li>
<li>表必须设置存储引擎和字符集</li>
<li>主键列尽量是无关列数字列,最好是自增长</li>
<li>enum类型不要保存数字,只能是字符串类型</li>
</ul>
</div>
  <br>
 <br>
<h3 id="_2-3-表的常规操作" tabindex="-1"><a class="header-anchor" href="#_2-3-表的常规操作" aria-hidden="true">#</a> 2.3 表的常规操作</h3>
 <br>
<p><strong>查询建表信息</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SHOW</span> <span class="token keyword">TABLES</span><span class="token punctuation">;</span>
<span class="token keyword">SHOW</span> <span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> stu<span class="token punctuation">;</span>
<span class="token keyword">DESC</span> stu<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  <br>
<p><strong>创建一个表结构一样的表</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> test <span class="token operator">LIKE</span> stu<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>   <br>
<p><strong>删表</strong>  生产中危险操作 ⚠️</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> test<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>​    <br></p>
<p><strong>修改添加新列</strong></p>
<p>例如：在stu 表中添加QQ号信息列</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DESC</span> stu<span class="token punctuation">;</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> stu <span class="token keyword">ADD</span> qq <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'qq号'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>​    <br></p>
<div class="hint-container tip">
<p class="hint-container-title">表操作要注意</p>
<ul>
<li>在线的DDL操作要尽量避免业务繁忙期</li>
<li>表数据量大的话会长时间锁表</li>
<li>解决锁表情况可以使用pt-osc 工具 在线DDL或者 percona-toolkits Online 等第三方工具</li>
</ul>
</div>
<p><strong>在sname列后加微信列</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> stu <span class="token keyword">ADD</span> wechat <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">UNIQUE</span> <span class="token keyword">COMMENT</span> <span class="token string">'微信号'</span> <span class="token keyword">AFTER</span> sname<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>​     <br></p>
<p><strong>在id列前加一个新列num</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> stu <span class="token keyword">ADD</span> num <span class="token keyword">INT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">UNIQUE</span> <span class="token keyword">COMMENT</span> <span class="token string">'身份证'</span> <span class="token keyword">FIRST</span> <span class="token punctuation">;</span>
<span class="token keyword">DESC</span> stu<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>​     <br></p>
<p><strong>把刚才添加的列都删掉</strong> （危险操作）</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> stu <span class="token keyword">DROP</span> num<span class="token punctuation">;</span>
<span class="token keyword">DESC</span> stu<span class="token punctuation">;</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> stu <span class="token keyword">DROP</span> qq<span class="token punctuation">;</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> stu <span class="token keyword">DROP</span> wechat<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​      <br></p>
<p><strong>修改snam数据类型的属性</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DESC</span> stu<span class="token punctuation">;</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> stu <span class="token keyword">MODIFY</span> sname <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'姓名'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div> <br>
<p><strong>将gender改为 sex 数据类型改为 CHAR类型</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> stu CHANGE gender sex <span class="token keyword">CHAR</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'性别'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-dcl-语句应用" tabindex="-1"><a class="header-anchor" href="#_3-dcl-语句应用" aria-hidden="true">#</a> 3. DCL 语句应用</h2>
<p><strong>DCL</strong>(Data Control Language)语句：数据控制语句，用于控制不同数据段直接的许可和访问级别的语句。这些语句定义了数据库、表、字段、用户的访问权限和安全级别。</p>
<p>DCL语句主要作用：<strong>用户权限控制</strong></p>
 <br>
<p><code v-pre>grant</code>  授权</p>
<p><code v-pre>revoke </code> 回收权限</p>
  <br>
<h3 id="_3-1-查看用户权限" tabindex="-1"><a class="header-anchor" href="#_3-1-查看用户权限" aria-hidden="true">#</a> 3.1 查看用户权限</h3>
 <br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">SHOW</span> GRANTS <span class="token keyword">FOR</span> xin<span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">-------------------------------------------+</span>
<span class="token operator">|</span> Grants <span class="token keyword">for</span> xin@<span class="token operator">%</span>                         <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------------------------------------+</span>
<span class="token operator">|</span> <span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token keyword">ON</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">'xin'</span><span class="token variable">@'%'</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------------------------------------------+ </span>
<span class="token number">1</span> <span class="token keyword">row</span> <span class="token operator">in</span> <span class="token keyword">set</span> <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div> <br>
<h3 id="_3-2-用户授权" tabindex="-1"><a class="header-anchor" href="#_3-2-用户授权" aria-hidden="true">#</a> 3.2 用户授权</h3>
 <br>
<p>对于新建的MySQL用户，必须给它授权，可以用<code v-pre>GRANT</code>语句来实现对新建用户的授权。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 授予数据库db1的所有权限给指定账户 </span>
<span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">ON</span> db1<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">'user1'</span><span class="token variable">@'localhost'</span><span class="token punctuation">;</span> 
<span class="token comment">-- 授予角色给指定的账户 </span>
<span class="token keyword">GRANT</span> <span class="token string">'role1'</span><span class="token punctuation">,</span> <span class="token string">'role2'</span> <span class="token keyword">TO</span> <span class="token string">'user1'</span><span class="token variable">@'localhost'</span><span class="token punctuation">,</span> <span class="token string">'user2'</span><span class="token variable">@'localhost'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div> <br>
<div class="hint-container tip">
<p class="hint-container-title">数据库权限类型</p>
<ul>
<li><code v-pre>SELECT</code>：表示授予用户可以使用 SELECT 语句访问特定数据库中所有表和视图的权限。</li>
<li><code v-pre>INSERT</code>：表示授予用户可以使用 INSERT 语句向特定数据库中所有表添加数据行的权限。</li>
<li><code v-pre>DELETE</code>：表示授予用户可以使用 DELETE 语句删除特定数据库中所有表的数据行的权限。</li>
<li><code v-pre>UPDATE</code>：表示授予用户可以使用 UPDATE 语句更新特定数据库中所有数据表的值的权限。</li>
<li><code v-pre>REFERENCES</code>：表示授予用户可以创建指向特定的数据库中的表外键的权限。</li>
<li><code v-pre>CREATE</code>：表示授权用户可以使用 CREATE TABLE 语句在特定数据库中创建新表的权限。</li>
<li><code v-pre>ALTER</code>：表示授予用户可以使用 ALTER TABLE 语句修改特定数据库中所有数据表的权限。</li>
<li><code v-pre>SHOW VIEW</code>：表示授予用户可以查看特定数据库中已有视图的视图定义的权限。</li>
<li><code v-pre>CREATE ROUTINE</code>：表示授予用户可以为特定的数据库创建存储过程和存储函数的权限。</li>
<li><code v-pre>ALTER ROUTINE</code>：表示授予用户可以更新和删除数据库中已有的存储过程和存储函数的权限。</li>
<li><code v-pre>INDEX</code>：表示授予用户可以在特定数据库中的所有数据表上定义和删除索引的权限。</li>
<li><code v-pre>DROP</code>：表示授予用户可以删除特定数据库中所有表和视图的权限。</li>
<li><code v-pre>CREATE TEMPORARY TABLES</code>：表示授予用户可以在特定数据库中创建临时表的权限。</li>
<li><code v-pre>CREATE VIEW</code>：表示授予用户可以在特定数据库中创建新的视图的权限。</li>
<li><code v-pre>EXECUTE ROUTINE</code>：表示授予用户可以调用特定数据库的存储过程和存储函数的权限。</li>
<li><code v-pre>LOCK TABLES</code>：表示授予用户可以锁定特定数据库的已有数据表的权限。</li>
<li><code v-pre>SHOW DATABASES</code>：表示授权可以使用<code v-pre>SHOW DATABASES</code>查看所有已有的数据库的定义权限。</li>
<li><code v-pre>ALL</code>或<code v-pre>ALL PRIVILEGES</code>：表示以上所有权限。</li>
</ul>
</div>
 <br>
<div class="hint-container tip">
<p class="hint-container-title">表权限类型</p>
<ul>
<li><code v-pre>SELECT</code>：授予用户可以使用 SELECT 语句进行访问特定表的权限。</li>
<li><code v-pre>INSERT</code>：授予用户可以使用 INSERT 语句向一个特定表中添加数据行的权限。</li>
<li><code v-pre>DELETE</code>：授予用户可以使用 DELETE 语句从一个特定表中删除数据行的权限。</li>
<li><code v-pre>DROP</code>：授予用户可以删除数据表的权限。</li>
<li><code v-pre>UPDATE</code>：授予用户可以使用 UPDATE 语句更新特定数据表的权限。</li>
<li><code v-pre>ALTER</code>：授予用户可以使用 ALTER TABLE 语句修改数据表的权限。</li>
<li><code v-pre>REFERENCES</code>：授予用户可以创建一个外键来参照特定数据表的权限。</li>
<li><code v-pre>CREATE</code>：授予用户可以使用特定的名字创建一个数据表的权限。</li>
<li><code v-pre>INDEX</code>：授予用户可以在表上定义索引的权限。</li>
<li><code v-pre>ALL</code>或<code v-pre>ALL PRIVILEGES</code>：所有的权限名。</li>
</ul>
</div>
 <br>
 <br>
<h3 id="_3-3-权限回收" tabindex="-1"><a class="header-anchor" href="#_3-3-权限回收" aria-hidden="true">#</a> <strong>3.3 权限回收</strong></h3>
 <br>
<p><code v-pre>REVOKE</code>语句主要用于撤销权限。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">revoke</span> <span class="token keyword">all</span> <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">from</span> wang<span class="token variable">@'192.168.1.150'</span><span class="token punctuation">;</span>         
mysql<span class="token operator">></span> <span class="token keyword">revoke</span> <span class="token keyword">all</span> <span class="token keyword">privileges</span> <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">from</span> wang<span class="token variable">@'192.168.1.%'</span><span class="token punctuation">;</span>       
mysql<span class="token operator">></span> <span class="token keyword">revoke</span> <span class="token keyword">insert</span><span class="token punctuation">,</span><span class="token keyword">select</span><span class="token punctuation">,</span><span class="token keyword">update</span><span class="token punctuation">,</span><span class="token keyword">delete</span><span class="token punctuation">,</span><span class="token keyword">drop</span>，<span class="token keyword">create</span>，<span class="token keyword">alter</span> <span class="token keyword">on</span> huanqiu<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">from</span> wang<span class="token variable">@'%'</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> flush <span class="token keyword">privileges</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div> <br>
 <br>
<h2 id="_4-dml语句应用" tabindex="-1"><a class="header-anchor" href="#_4-dml语句应用" aria-hidden="true">#</a> 4. DML语句应用</h2>
 <br> 
<p><strong>主要作用：对数据行增删改</strong></p>
  <br>
<h3 id="_4-1-数据录入" tabindex="-1"><a class="header-anchor" href="#_4-1-数据录入" aria-hidden="true">#</a> 4.1 数据录入</h3>
  <br>
<p><strong>INSERT 语句 两种方法：</strong></p>
<p><strong>最偷懒</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> stu <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">'zs'</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">,</span><span class="token string">'m'</span><span class="token punctuation">,</span><span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> stu<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>最规范</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> stu<span class="token punctuation">(</span>id<span class="token punctuation">,</span>sname<span class="token punctuation">,</span>age<span class="token punctuation">,</span>sex<span class="token punctuation">,</span>intime<span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">'ls'</span><span class="token punctuation">,</span><span class="token number">19</span><span class="token punctuation">,</span><span class="token string">'f'</span><span class="token punctuation">,</span><span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>   <br>
<h4 id="_4-1-1-针对性的录入数据" tabindex="-1"><a class="header-anchor" href="#_4-1-1-针对性的录入数据" aria-hidden="true">#</a> 4.1.1 针对性的录入数据</h4>
  <br>
<p><strong>默认值的列不写</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> stu<span class="token punctuation">(</span>sname<span class="token punctuation">,</span>age<span class="token punctuation">,</span>sex<span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'w5'</span><span class="token punctuation">,</span><span class="token number">11</span><span class="token punctuation">,</span><span class="token string">'m'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>   <br>
<h4 id="_4-1-2-一次性录入多行" tabindex="-1"><a class="header-anchor" href="#_4-1-2-一次性录入多行" aria-hidden="true">#</a> 4.1.2 一次性录入多行</h4>
  <br>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> stu<span class="token punctuation">(</span>sname<span class="token punctuation">,</span>age<span class="token punctuation">,</span>sex<span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> 
<span class="token punctuation">(</span><span class="token string">'aa'</span><span class="token punctuation">,</span><span class="token number">11</span><span class="token punctuation">,</span><span class="token string">'m'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">'bb'</span><span class="token punctuation">,</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token string">'f'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">'cc'</span><span class="token punctuation">,</span><span class="token number">13</span><span class="token punctuation">,</span><span class="token string">'m'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>   <br>
  <br>
<br>
<h3 id="_4-2-数据行更新数据" tabindex="-1"><a class="header-anchor" href="#_4-2-数据行更新数据" aria-hidden="true">#</a> 4.2 数据行更新数据</h3>
  <br>
<p><strong>update 语句 (一定要加where条件)</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">UPDATE</span> stu <span class="token keyword">SET</span> sname<span class="token operator">=</span><span class="token string">'aaa'</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> stu<span class="token punctuation">;</span>
<span class="token keyword">UPDATE</span> stu <span class="token keyword">SET</span> sname<span class="token operator">=</span><span class="token string">'bb'</span> <span class="token keyword">WHERE</span> id<span class="token operator">=</span><span class="token number">6</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>delete 语句删除数据行数据 (一定要有where条件)</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> stu<span class="token punctuation">;</span>
<span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> stu <span class="token keyword">WHERE</span> id<span class="token operator">=</span><span class="token number">9</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div> <br>
<br>
<p><strong>生产中屏蔽delete功能，使用update 语句替代delete 语句操作</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> stu <span class="token keyword">ADD</span> is_del <span class="token keyword">TINYINT</span> <span class="token keyword">DEFAULT</span> <span class="token number">0</span> <span class="token punctuation">;</span>
<span class="token keyword">UPDATE</span> stu <span class="token keyword">SET</span> is_del<span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">WHERE</span> id<span class="token operator">=</span><span class="token number">7</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> stu <span class="token keyword">WHERE</span> is_del<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


