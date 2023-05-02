import{_ as s,V as n,W as a,Z as e}from"./framework-91fce522.js";const t={},i=e(`<h1 id="gtid-记录模式管理" tabindex="-1"><a class="header-anchor" href="#gtid-记录模式管理" aria-hidden="true">#</a> GTID 记录模式管理</h1><h2 id="_1-gtid-介绍" tabindex="-1"><a class="header-anchor" href="#_1-gtid-介绍" aria-hidden="true">#</a> 1. GTID 介绍</h2><ul><li><p>对于binlog中的每一个事务,都会生成一个GTID号码</p></li><li><p>DDL ,DCL 一个event就是一个事务,就会有一个GTID号.</p></li><li><p>DML语句来讲,begin到commit,是一个事务,就是一个GTID号</p></li></ul><br><h2 id="_2-gtid-组成" tabindex="-1"><a class="header-anchor" href="#_2-gtid-组成" aria-hidden="true">#</a> 2. GTID 组成</h2><p>由两部分组成 <strong>severi_uuid:TID</strong> 事务的号码</p><p><strong>severi_uuid</strong> 在 <code>auto.cnf</code> 中查看</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 data<span class="token punctuation">]</span><span class="token comment"># cat auto.cnf </span>
<span class="token punctuation">[</span>auto<span class="token punctuation">]</span>
server-uuid<span class="token operator">=</span>d60b549f-9e10-11e9-ab04-000c294a1b3b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**TID **是一个自增长的数据,从1开始 如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>d60b549f-9e10-11e9-ab04-000c294a1b3b:1-15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><br><h2 id="_3-gtid-幂等性" tabindex="-1"><a class="header-anchor" href="#_3-gtid-幂等性" aria-hidden="true">#</a> 3. GTID 幂等性</h2><p>如果拿有GTID的日志去恢复时,检查当前系统中是否有相同GTID号,有相同的就自动跳过</p><p>同Ansible剧本跳过同理会影响到binlog恢复和主从复制。</p><br><br><h2 id="_4-gtid-开启和配置" tabindex="-1"><a class="header-anchor" href="#_4-gtid-开启和配置" aria-hidden="true">#</a> 4. GTID 开启和配置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/my.cnf
gtid-mode<span class="token operator">=</span>on
enforce-gtid-consistency<span class="token operator">=</span>true 强制gtid一致性
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-17.png" alt="GTID" tabindex="0" loading="lazy"><figcaption>GTID</figcaption></figure><p><strong>注意</strong>：开启后止影响以后的事务 以前的管不着</p><br><br><h3 id="_4-1-查看gtid信息" tabindex="-1"><a class="header-anchor" href="#_4-1-查看gtid信息" aria-hidden="true">#</a> 4.1 查看GTID信息</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>mysql<span class="token operator">&gt;</span> <span class="token keyword">create</span> <span class="token keyword">database</span> gtid <span class="token keyword">charset</span> utf8mb4<span class="token punctuation">;</span> 创建一个库
mysql<span class="token operator">&gt;</span> <span class="token keyword">show</span> master <span class="token keyword">status</span><span class="token punctuation">;</span> 查看gtid号码 已经产生gtid
mysql<span class="token operator">&gt;</span> <span class="token keyword">use</span> gtid<span class="token punctuation">;</span>
mysql<span class="token operator">&gt;</span> <span class="token keyword">create</span> <span class="token keyword">table</span> t1<span class="token punctuation">(</span>id <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 创建一个表
mysql<span class="token operator">&gt;</span> <span class="token keyword">show</span> master <span class="token keyword">status</span><span class="token punctuation">;</span>  查看gtid号码 已经产生gtid <span class="token number">1</span><span class="token operator">-</span><span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-18.png" alt="GTID2" tabindex="0" loading="lazy"><figcaption>GTID2</figcaption></figure><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>mysql<span class="token operator">&gt;</span> <span class="token keyword">insert</span> <span class="token keyword">into</span> t1 <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mysql<span class="token operator">&gt;</span> <span class="token keyword">commit</span><span class="token punctuation">;</span>
mysql<span class="token operator">&gt;</span> <span class="token keyword">show</span> master <span class="token keyword">status</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提交之后才算一个事务</strong></p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-19.png" alt="GTID3" tabindex="0" loading="lazy"><figcaption>GTID3</figcaption></figure><br><p><strong>开了GTID 后的日志信息</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>mysql<span class="token operator">&gt;</span> <span class="token keyword">show</span> binlog events <span class="token operator">in</span> <span class="token string">&#39;mysql-bin.000005&#39;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-20.png" alt="GTID3" tabindex="0" loading="lazy"><figcaption>GTID3</figcaption></figure><br><br><h3 id="_4-2-基于gtid-恢复数据" tabindex="-1"><a class="header-anchor" href="#_4-2-基于gtid-恢复数据" aria-hidden="true">#</a> 4.2 基于GTID 恢复数据</h3><p>开启GTID 后只需截取GTID日志就可以了，GTID是全局事务唯一标号。</p><br><h4 id="截取日志" tabindex="-1"><a class="header-anchor" href="#截取日志" aria-hidden="true">#</a> 截取日志</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 data<span class="token punctuation">]</span><span class="token comment"># cd /data/binlog/</span>
<span class="token punctuation">[</span>root@db01 binlog<span class="token punctuation">]</span><span class="token comment"># mysqlbinlog --include-gtids=&#39;d60b549f-9e10-11e9-ab04-000c294a1b3b:1-3&#39; mysql-bin.000005 &gt;/tmp/gtid.sql</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br><br><h4 id="恢复数据" tabindex="-1"><a class="header-anchor" href="#恢复数据" aria-hidden="true">#</a> 恢复数据</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>mysql<span class="token operator">&gt;</span> <span class="token keyword">set</span> sql_log_bin<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> 暂时关闭日志
mysql<span class="token operator">&gt;</span> source <span class="token operator">/</span>tmp<span class="token operator">/</span>gtid<span class="token punctuation">.</span><span class="token keyword">sql</span> 恢复
mysql<span class="token operator">&gt;</span> <span class="token keyword">set</span> sql_log_bin<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> 开启日志
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-21.png" alt="GTID恢复" tabindex="0" loading="lazy"><figcaption>GTID恢复</figcaption></figure><br><h4 id="报错" tabindex="-1"><a class="header-anchor" href="#报错" aria-hidden="true">#</a> 报错</h4><h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>ERROR <span class="token number">1049</span> <span class="token punctuation">(</span><span class="token number">42000</span><span class="token punctuation">)</span>: Unknown <span class="token keyword">database</span> <span class="token string">&#39;gtid&#39;</span>
Query OK<span class="token punctuation">,</span> <span class="token number">0</span> <span class="token keyword">rows</span> affected <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>
ERROR <span class="token number">1046</span> <span class="token punctuation">(</span><span class="token number">3</span>D000<span class="token punctuation">)</span>: <span class="token keyword">No</span> <span class="token keyword">database</span> selected
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section6-1-22.png" alt="GTID恢复报错" tabindex="0" loading="lazy"><figcaption>GTID恢复报错</figcaption></figure><br><p><strong>为什么报错?</strong></p><p>因为幂等性的检查,1-3事务已经做过了。</p><p><strong>正确的做法</strong>：</p><p>在导出的时候应该忽略GTID的幂等性。 当成新的事务来对待 1-4 跳过并记录新ID号</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysqlbinlog --skip-gtids --include-gtids<span class="token operator">=</span><span class="token string">&#39;d60b549f-9e10-11e9-ab04-000c294a1b3b:1-3&#39;</span> mysql-bin.000005 <span class="token operator">&gt;</span>/tmp/gtid.sql
--skip-gtids 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>作用</strong>:在导出时,忽略原有的gtid信息,恢复时生成最新的 GTID 信息</p><p><strong>恢复数据</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">set</span> sql_log_bin<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
source <span class="token operator">/</span>tmp<span class="token operator">/</span>gtid<span class="token punctuation">.</span><span class="token keyword">sql</span>
<span class="token keyword">set</span> sql_log_bin<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p><strong>GTID相关的参数</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>--skip-gtids <span class="token comment">#忽略原有的GTID 信息,恢复时生成最新的 GTID 信息</span>
--include-gtids<span class="token operator">=</span><span class="token string">&#39;d60b549f-9e10-11e9-ab04-000c294a1b3b:6&#39;</span>,<span class="token string">&#39;d60b549f-9e10-11e9-ab04-000c294a1b3b:8&#39;</span> <span class="token comment">#只截取6和8</span>
--exclude-gtids<span class="token operator">=</span><span class="token string">&#39;d60b549f-9e10-11e9-ab04-000c294a1b3b:6&#39;</span>,<span class="token string">&#39;d60b549f-9e10-11e9-ab04-000c294a1b3b:8&#39;</span> <span class="token comment">#排除</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><br>`,64),o=[i];function p(l,c){return n(),a("div",null,o)}const r=s(t,[["render",p],["__file","dba06-1.html.vue"]]);export{r as default};