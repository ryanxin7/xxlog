<template><div><h1 id="nosql-基础知识" tabindex="-1"><a class="header-anchor" href="#nosql-基础知识" aria-hidden="true">#</a> NoSQL 基础知识</h1>
<p>一类新出现的数据库(not only sql)</p>
<h2 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h2>
<ul>
<li>泛指非关系型的数据库</li>
<li>不支持SQL语法</li>
<li>存储结构跟传统关系型数据库中的那种关系表完全不同，nosql中存储的数据都是KV形式</li>
<li>NoSQL的世界中没有一种通用的语言，每种nosql数据库都有自己的api和语法，以及擅长的业务场景</li>
</ul>
<h2 id="相关软件" tabindex="-1"><a class="header-anchor" href="#相关软件" aria-hidden="true">#</a> <strong>相关软件</strong></h2>
<p><strong>Redis</strong></p>
<p>简介：开源的内存结构数据库</p>
<p>官网：<a href="https://redis.io/" target="_blank" rel="noopener noreferrer">https://redis.io/<ExternalLinkIcon/></a></p>
<p>最新版本：6.2.5</p>
<p><strong>Mongodb</strong></p>
<p>简介：分布式文档存储数据库，旨在为WEB应用提供可扩展的高性能数据存储解决方案。</p>
<p>官网：<a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer">https://www.mongodb.com/<ExternalLinkIcon/></a></p>
<p>最新版本：4.4</p>
<p><strong>CouchDB</strong></p>
<p>简介：开源的面向文档的数据库管理系统，可以通过 RESTful API 方式访问。</p>
<p>官网：<a href="https://couchdb.apache.org/" target="_blank" rel="noopener noreferrer">https://couchdb.apache.org/<ExternalLinkIcon/></a></p>
<p>版本：3.1.1</p>
<h2 id="nosql-vs-sql" tabindex="-1"><a class="header-anchor" href="#nosql-vs-sql" aria-hidden="true">#</a> NoSQL VS SQL</h2>
<h3 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h3>
<p>SQL (Structured Query Language) 关系型数据库。
主要代表：SQL Server，Oracle，MySQL(开源)，PostgreSQL(开源)。</p>
<p>NoSQL（Not Only SQL）泛指非关系型数据库。
主要代表：MongoDB，Redis，CouchDB。</p>
<br>
<h3 id="存储方式" tabindex="-1"><a class="header-anchor" href="#存储方式" aria-hidden="true">#</a> 存储方式</h3>
<p>SQL数据存在特定结构的表中，通常以数据库表形式存储数据。</p>
<p>NoSQL存储方式比较灵活，web场景中，通常以json样式来进行数据的承载。</p>
<p>​	
<strong>数据的存储样式</strong>：
​	SQL - 二维表样式
​	Nosql	
​		本质上都是以 k/v 样式来存储，但是在应用的时候，各有特点
​		web开发场景以json为主
​		自动化测试场景，以 xml 为主(我说的)</p>
<h2 id="存储理论" tabindex="-1"><a class="header-anchor" href="#存储理论" aria-hidden="true">#</a> 存储理论</h2>
<p>在实际情况下，网站的数据存储不可能在一台主机上实现亿万级用户的访问。在大数据量场景中我们的数据都是以集群的方式进行存储。此时面临一个问题就是集群中的主机之间数据存储如何达到一个可和谐稳定运行状态。因此演变出的各种各样的理论下面主要以ACID、BASE、CAP方面介绍。</p>
<h3 id="acid" tabindex="-1"><a class="header-anchor" href="#acid" aria-hidden="true">#</a> ACID</h3>
<p>对于一个关系型数据库来说，有一个非常重要的基本属性：ACID</p>
<p>ACID，是指数据库管理系统（DBMS）在写入或更新资料的过程中，为保证事务（transaction）是正确可靠的，所必须具备的四个特性.</p>
<p>注意：
事务是由一些列对系统数据进行访问或者更新操作组成的一个程序执行单元，狭义的事务指的是数据库事务，这里主要来说分布式场景的事务</p>
<table>
<thead>
<tr>
<th>特性</th>
<th>解释</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>原子性 (atomicity)</td>
<td>一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。</td>
<td></td>
</tr>
<tr>
<td>一致性 (consistency)</td>
<td>在事务开始之前和事务结束以后，数据库的完整性没有被破坏，侧重于整体。</td>
<td></td>
</tr>
<tr>
<td>隔离性 (isolation)</td>
<td>数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。</td>
<td></td>
</tr>
<tr>
<td>持久性 (durability)</td>
<td>事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。</td>
<td></td>
</tr>
</tbody>
</table>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/acid.jpg" alt="acid" tabindex="0" loading="lazy"><figcaption>acid</figcaption></figure>
<br>
<h3 id="cap" tabindex="-1"><a class="header-anchor" href="#cap" aria-hidden="true">#</a> CAP</h3>
<p>对于数据库来说，因为受到主机资源、容量配置等限制，导致我们无法用一个数据库、一台主机来存储所有的数据，所以在实际的工作中，我们的所有信息都是分散的存储在不同的主机上，这就是 -- 分布式数据存储。</p>
<p>对于分布式数据存储来说，传统的ACID就不太适合了，所以针对当前环境的特性就梳理出来一种为事务服务的理论 CAP -- 它是指在一个分布式系统中，一致性、可用性、容错性三者不可兼得。</p>
<table>
<thead>
<tr>
<th>特性</th>
<th>解释</th>
</tr>
</thead>
<tbody>
<tr>
<td>一致性 (Consistency)</td>
<td>更新操作成功后，所有节点在同一时间的数据完全一致。</td>
</tr>
<tr>
<td>可用性 (Availability)</td>
<td>用户访问数据时，系统是否能在正常响应时间返回结果。</td>
</tr>
<tr>
<td>容错性(Partition Tolerance)</td>
<td>分布式系统在遇到某节点或网络分区故障的时候，仍然能够对外提供满足一致性和可用性的服务。</td>
</tr>
</tbody>
</table>
<p>基于CAP三种特性的两两组合，可以将我们之前所说的各种数据库来进行简单的划分归类</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/CAP.jpg" alt="CAP" tabindex="0" loading="lazy"><figcaption>CAP</figcaption></figure>
<p>CAP理论告诉我们 一个分布式系统不可能同时满足一致性可用性和分区容错性这三个基本需求，最多同时满足.
这三个当中的两项
一般来说：我们都是在一致性和分区容错性之间寻找所谓的平衡</p>
<br>
<h3 id="base" tabindex="-1"><a class="header-anchor" href="#base" aria-hidden="true">#</a> BASE</h3>
<p>BASE 理论是针对 NoSQL 数据库而言的，它是对 CAP 理论中一致性（C）和可用性（A）进行权衡的结果，源于提出者自己在大规模分布式系统上实践的总结。其核心思想是无法做到强一致性，但每个应用都可以根据
自身的特点，采用适当方式达到最终一致性。</p>
<p>BASE理论是由eBay的架构师提出。</p>
<table>
<thead>
<tr>
<th>特性</th>
<th>解释</th>
</tr>
</thead>
<tbody>
<tr>
<td>基本可用 (BasicallyAvailable)</td>
<td>分布式系统在出现不可预知故障时，系统允许损失部分可用性，即保证核心功能或者当前最重要功能可用。比如说：访问的网页速度稍微降低一些，用户量大的时候，实时限流等</td>
</tr>
<tr>
<td>软状态 (Softstate)</td>
<td>允许系统数据存在中间状态，但不会影响系统的整体可用性，即允许不同节点的副本之间存在暂时的不一致情况。比如：集群系统的多个节点之间运行xx秒是数据同步延迟。</td>
</tr>
<tr>
<td>最终一致 (EventuallyConsistent)</td>
<td>这是三个特点中最重要的，它强调的是系统中所有主机的数据副本，在一段时间同步后，最终能够达到一致状态，而不需要实时保证数据副本一致</td>
</tr>
</tbody>
</table>
<br>
<p>最终一致性是 BASE 原理的核心，也是 NoSQL 数据库的主要特点，通过弱化一致性，提高系统的可伸缩性、可靠性和可用性。而且对于大多数 Web 应用，其实并不需要强一致性，因此牺牲一致性而换取高可用性，是多数分布式数据库产品的方向。</p>
<hr>
<p><strong>小结</strong></p>
<p>前提：
一台主机的资源，无法抗住大量用户数据的操作，所以我们需要以集群的方式，来对数据进行管理</p>
<p>问题：
如果保证 集群主机 数据是一致的，对用户来说无所谓</p>
<p>话题：
事务
在一些业务场景中，一个操作需要多个sql才能够完成指定的功能
-- 这个整体操作就是一个事务</p>
<p><strong>ACID</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
	A 原子性  -- 对于事务操作来说(多条命令)，要么成功，要么一起失败还原
	B 一致性  -- 事务操作前 和后 ，对于数据库本身的数据访问功能没有影响
	C 隔离性  -- 同一个数据集群内部的多个事务操作，彼此间无交叉影响
	D 持久性  -- 数据的落地
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>CAP</strong>
<strong>前提</strong>：
在分布式集群场景中，无法做到单台主机能够实现的 ACID，那么就做一个缓冲</p>
<pre><code>C -- 集群间所有主机数据是一致的
  -- 数据库集群的同步
A -- 集群整体提供的服务对用户来说，可用
	-- 
P -- 集群提供服务的过程中，允许出现一些错误数据，或者过期数据，
   -- 访问课程数据的时候，运行是一个月前的过期数据
</code></pre>
<p><strong>BASE</strong>
前提：
我已经确定了，集群环境中，不可能不存异常故障，接下来只能从CAP 里面的 C一致性 和 A可用性 之间来找平衡</p>
<pre><code>BA	基本可用
	-- 无论任何时候，我们的网站服务是正常，虽然效果没有预期的那么好
S	软状态
	-- 针对的是 集群内部的主机 状态转换的时候 -- 一个中间过渡
E   最终一致性
	-- 即使集群内部出现故障了，但是最终故障恢复后，要与其他主机数据进行同步
</code></pre>
</div></template>


