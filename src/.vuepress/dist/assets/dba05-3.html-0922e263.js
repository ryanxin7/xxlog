import{_ as n,V as e,W as o,Z as r}from"./framework-91fce522.js";const s={},a=r(`<h1 id="innodb-核心参数介绍" tabindex="-1"><a class="header-anchor" href="#innodb-核心参数介绍" aria-hidden="true">#</a> InnoDB 核心参数介绍</h1><h2 id="_1-上节知识点回顾" tabindex="-1"><a class="header-anchor" href="#_1-上节知识点回顾" aria-hidden="true">#</a> 1.上节知识点回顾</h2><h3 id="_1-1-表空间说明" tabindex="-1"><a class="header-anchor" href="#_1-1-表空间说明" aria-hidden="true">#</a> 1.1 表空间说明</h3><ul><li>独立表空间 : 5.6 开始的默认表空间,一个表一个ibd文件,存储数据行和索引</li><li>共享表空间 : 5.5 默认的模式, 所有表的行和索引都存储到ibdata1</li></ul><br><p><strong>说明</strong>:</p><ul><li>从5.6 开始,不再使用共享表空间模式</li><li>5.6版本 数据字典信息 ➕ UNDO ➕ TMP 5.7版本 把 TMP 独立了 8.0版本 把 UNDO 独立</li></ul><br><h3 id="_1-2-表空间迁移" tabindex="-1"><a class="header-anchor" href="#_1-2-表空间迁移" aria-hidden="true">#</a> 1.2 表空间迁移</h3><br><p>创建和原表结构相同的表</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">table</span> t1 <span class="token keyword">discard</span> <span class="token keyword">tablespace</span> <span class="token punctuation">;</span><span class="token comment">-- 把新建表的 ibd 删除</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>拷贝原表ibd到新位置</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">table</span> t1 <span class="token keyword">import</span> <span class="token keyword">tablespace</span><span class="token punctuation">;</span> <span class="token comment">---导入ibd到新表</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><br><h3 id="_1-3-有关表扩容问题" tabindex="-1"><a class="header-anchor" href="#_1-3-有关表扩容问题" aria-hidden="true">#</a> 1.3 有关表扩容问题</h3><br><p>​ 共享表空间是可以扩容的，但是独立表空间一个表就是一个文件，表的可用大小就要看放置磁盘的容量了。磁盘一旦满了说明数据量级已经很大了 在 MySQL中更加推荐使用进行分布式存储，进行分库分表。数据量级在很大的状态下使用 MySQL单实例解决问题是不太现实的。</p><p>​ 我们的处理逻辑就要把一个大表拆分到不同的数据库实例的进行读写，多实例处理并发访问。而不是说继续找几块磁盘扩容，这样操作实际上还是单实例运行没有任何意义。MySQL 更善于从架构方面来解决数据量级大的问题，所以说它不在使用共享表空间。</p><br><br><h3 id="_1-4-事务-acid" tabindex="-1"><a class="header-anchor" href="#_1-4-事务-acid" aria-hidden="true">#</a> 1.4 事务 ACID</h3><br><ul><li><p><strong>Atomic（原子性）</strong> undo回滚 未提交的事务要取消掉 所有语句作为一个单元全部成功执行或全部取消。不能出现中间状态。</p></li><li><p><strong>Consistent（一致性）</strong> redo undo 保证一致性 开始是10块钱 结束也是10块钱 如果数据库在事务开始时处于一致状态，则在执行该事务期间将保留一致状态。</p></li><li><p><strong>Isolated（隔离性）</strong> 行级锁 隔离级别 事务之间不相互影响。</p></li><li><p><strong>Durable（持久性）</strong> rudo 日志优先性写 优先记录而不是数据直接写入磁盘 事务成功完成后，所做的所有更改都会准确地记录在数据库中。所做的更改不会丢失。</p></li></ul><br><br><h3 id="_1-5-redo" tabindex="-1"><a class="header-anchor" href="#_1-5-redo" aria-hidden="true">#</a> 1.5 Redo</h3><br><p>(1) 记录 内存数据页变化日志<br> (2) 提供 快速的事务的提交(commit)<br> (3) CSR redo提供的前滚的功能<br></p><br><br><h3 id="_1-6-undo" tabindex="-1"><a class="header-anchor" href="#_1-6-undo" aria-hidden="true">#</a> 1.6 Undo</h3><br><p>(1) 记录 数据修改之前的状态<br> (2) 提供 事务工作过过程中回滚操作(rollback)<br> (3) CSR 中将未提交的事务进行回滚<br></p><br><br><h3 id="_1-7-隔离级别" tabindex="-1"><a class="header-anchor" href="#_1-7-隔离级别" aria-hidden="true">#</a> 1.7 隔离级别</h3><br><p>RU 读未提交,会有脏读 , 幻读 ,不可重复读<br> RC 读已提交,会有 幻读,不可重复读. 在大部分互联网企业中是可以容忍的.<br> RR 可重复读:(MVCC ,undo快照)防止不可重复读, 有可能出现幻读,通过GAP+Next LOCK来防止幻读(索引).<br> SR 可串行化: 串行执行事务 一般不会使用 一个事务执行完了才能执行下一个.<br></p><br><br><h2 id="_2-innodb-核心参数介绍" tabindex="-1"><a class="header-anchor" href="#_2-innodb-核心参数介绍" aria-hidden="true">#</a> 2. InnoDB 核心参数介绍</h2><br><p><strong>设置存储引擎默认设置</strong></p><p><code>default_storage_engine=innodb</code></p><p><strong>设置表空间模式</strong></p><p><code>innodb_file_per_table=1</code> 使用独立表空间,动态参数。</p><p><strong>设置共享表空间文件个数和大小</strong></p><p><code>innodb_data_file_path=ibdata1:512M:ibdata2:512M:autoextend</code></p><p><strong>&quot;双一&quot; 标准的其中一个 （重要知识点）</strong> ⭐⭐⭐⭐⭐</p><p><strong>控制刷写rudo日志到磁盘的策略</strong></p><p><code>innodb_flush_log_at_trx_commit=1</code> 在事务提交时刷写redo 到磁盘策略</p><p><strong>查询当前策略</strong></p><p><code>select @@innodb_flush_log_at_trx_commit;</code></p><br><p><strong>redo 日志写入磁盘过程</strong>：数据库内存数据 ➡️ 刷写文件系统缓存 ➡️ 写入磁盘</p><br><p>例：<code>innodb_flush_log_at_trx_commit=1</code></p><ul><li>为1 时 每次事务提交时立即将mysql内存中数据刷到os文件系统并立即写入磁盘，保证每次事务提交都会写到磁盘。</li><li>为0 时 事务每秒刷写到磁盘不管提交没提交，但是每秒发生无数事务 断电可能导致事务丢失。</li><li>为2 时 每次事务提交 只保证提交到os文件系统缓存，然后每秒刷一次事务到磁盘。主机断电也可能丢失数据。</li></ul><br><p><strong>小结</strong>：如果追求性能 设置为 <code>0</code> 安全则设置为<code>1</code></p><div class="hint-container tip"><p class="hint-container-title">Discribe</p><p>The default setting of 1 is required for full ACID compliance. Logs are written and flushed to disk at each transaction commit.</p><p>With a setting of 0, logs are written and flushed to disk once per second. Transactions for which logs have not been flushed can be lost in a crash.</p><p>With a setting of 2, logs are written after each transaction commit and flushed to disk once per second. Transactions for which logs have not been flushed can be lost in a crash.</p></div><br><br><p><strong>Innodb_flush_method=(O_DIRECT, fsync)（重要知识点）</strong> ⭐⭐⭐⭐</p><p><strong>作用</strong>: 控制的是 Redo buffer 和 buffer pool</p><br><p><strong>默认参数</strong> <strong>fsync</strong> : 常规层级刷写都会经过中间层</p><p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section5-3-13.png" alt="fsync默认模式" loading="lazy"><br></p><p><strong>O_DIRECT :</strong> 建议模式 redo buffer不变 buffter pool 直接写入硬盘</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section5-3-14.png" alt="fsync默认模式" tabindex="0" loading="lazy"><figcaption>fsync默认模式</figcaption></figure><br><p><strong>O_DSYNC</strong> : buffter pool不变 redo日志时间写入磁盘</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section5-3-15.png" alt="fsync默认模式" tabindex="0" loading="lazy"><figcaption>fsync默认模式</figcaption></figure><br><p><strong>小结</strong>：</p><p><strong>最高安全模式</strong></p><p><code>innodb_flush_log_at_trx_commit=1</code><code>Innodb_flush_method=O_DIRECT</code></p><p>防止经过os 文件系统缓存 导致数据写入磁盘不全，减少操作系统文件系统缓存内存占用</p><p><strong>最高性能模式</strong></p><p><code>innodb_flush_log_at_trx_commit=0</code><code>Innodb_flush_method=fsync</code></p><p>先把部分数据写入内存在写入磁盘 经过缓存速度快但是比较占内存</p><br><p><strong>Redo日志设置有关的参数</strong></p><p><code>innodb_log_buffer_size=16777216</code> 缓存区大小</p><p><code>innodb_log_file_size=50331648</code> 日志大小默认 50M</p><p><code>innodb_log_files_in_group = 3</code> redo 文件3个</p><p>按照要求调整日志文件大小或数量并写入到my.cnf文件中</p><br><br><p><strong>脏页刷写策略参数</strong></p><p><code>innodb_max_dirty_pages_pct=75</code> 在buffter 中如果脏页占用超过75% 时会立即写入磁盘</p><br><p><strong>还有哪些机制会直接触发写入磁盘?</strong></p><ol><li>CSR</li><li>redo 空间满了</li></ol>`,96),t=[a];function i(d,c){return e(),o("div",null,t)}const p=n(s,[["render",i],["__file","dba05-3.html.vue"]]);export{p as default};