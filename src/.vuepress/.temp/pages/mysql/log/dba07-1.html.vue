<template><div><h1 id="物理备份与恢复-xbk" tabindex="-1"><a class="header-anchor" href="#物理备份与恢复-xbk" aria-hidden="true">#</a> 物理备份与恢复 XBK</h1>
<h2 id="_1-上节回顾" tabindex="-1"><a class="header-anchor" href="#_1-上节回顾" aria-hidden="true">#</a> 1.上节回顾</h2>
<br>
<h3 id="_1-1-mysqldump核心参数" tabindex="-1"><a class="header-anchor" href="#_1-1-mysqldump核心参数" aria-hidden="true">#</a> 1.1 mysqldump核心参数</h3>
<ul>
<li>-A  全备</li>
<li>-B  单表备份</li>
<li>库 表  备份</li>
</ul>
<p><code v-pre>--master-data=2</code></p>
<p>(1) 以注释的形式记录二进制日志信息</p>
<p>(2) 自动开启锁表的功能</p>
<p>记录二进制日志在备份时的起点号 （就是到23.59分截止的binlog日志position号 ）由于备份时不开启二进制日志所以记录的是备份开始时的起点号用作恢复起点</p>
 <br>
<br>
<p><code v-pre>--single-transaction</code> 针对InnoDB进行快照备份</p>
<p><code v-pre>-R</code></p>
<p><code v-pre>-E</code></p>
<p><code v-pre>--triggers</code></p>
<p><code v-pre>--set-gtid-purged=AUTO/ON/OFF</code></p>
<p>默认是auto，主从复制忽略此参数普通备份,可以设置为OFF。</p>
<p><code v-pre>-F</code> 每次备份刷新出一个新的二进制日志，但是在数据库多的时候会刷一堆出来</p>
 <br>
<br>
<h2 id="_2-xtrabackup" tabindex="-1"><a class="header-anchor" href="#_2-xtrabackup" aria-hidden="true">#</a> 2. Xtrabackup</h2>
<h3 id="_2-1-备份的过程" tabindex="-1"><a class="header-anchor" href="#_2-1-备份的过程" aria-hidden="true">#</a> 2.1 备份的过程</h3>
<ul>
<li>非InnoDB表,进行短暂的锁表,然后Copy数据文件</li>
<li>对于InnoDB表,立即出发checkpoint,会立即记录一个LSN,COPY数据文件</li>
<li>将备份过程中产生的redo进行截取和保存,并记录此时最新的LSN</li>
</ul>
<br>
<br>
<h3 id="_2-2-恢复过程" tabindex="-1"><a class="header-anchor" href="#_2-2-恢复过程" aria-hidden="true">#</a> 2.2 恢复过程</h3>
<ul>
<li>模拟了CSR的全过程,在恢复之前,将数据的LSN号和redo LSN号追平</li>
<li>恢复方法就是直接cp回去即可</li>
</ul>
 <br>
<br>
<h3 id="_2-3-xbk全备和恢复体验" tabindex="-1"><a class="header-anchor" href="#_2-3-xbk全备和恢复体验" aria-hidden="true">#</a> 2.3. XBK全备和恢复体验</h3>
<p>MySQL 物理备份工具  xtrabackup(XBK、Xbackup)</p>
<br>
<p><strong>安装依赖包</strong>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> perl perl-devel libaio libaio-devel perl-Time-HiRes perl-DBD-MySQL libev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>下载软件并安装</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://www.percona.com/downloads/XtraBackup/Percona-XtraBackup-2.4.12/binary/redhat/7/x86_64/percona-xtrabackup-24-2.4.12-1.el7.x86_64.rpm
<span class="token function">wget</span> https://www.percona.com/downloads/XtraBackup/Percona-XtraBackup-2.4.4/binary/redhat/6/x86_64/percona-xtrabackup-24-2.4.4-1.el6.x86_64.rpm
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> percona-xtrabackup-24-2.4.4-1.el7.x86_64.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>备份命令</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>innobackupex <span class="token parameter variable">--user</span><span class="token operator">=</span>root <span class="token parameter variable">--password</span><span class="token operator">=</span><span class="token number">123</span>  /data/backup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div> <br>
<br>
<p><strong>面试题</strong>： xbk 在innodb表备份恢复的流程</p>
<ul>
<li>对于非Innodb表（比如 myisam）是，锁表cp数据文件，属于一种温备份。</li>
<li>对于Innodb的表（支持事务的），不锁表，拷贝数据页，最终以数据文件的方式保存下来，把一部分redo和undo一并备走，属于热备方式。</li>
</ul>
 <br>
<br>
<h3 id="_2-4-innobackupex-命令使用" tabindex="-1"><a class="header-anchor" href="#_2-4-innobackupex-命令使用" aria-hidden="true">#</a> 2.4 innobackupex 命令使用</h3>
<p><strong>全备</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>innobackupex <span class="token parameter variable">--user</span><span class="token operator">=</span>root <span class="token parameter variable">--password</span><span class="token operator">=</span><span class="token number">123</span> /data/backup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>参数介绍</strong>：</p>
<p><strong>自主定制备份路径名</strong></p>
<p>全备时有2个比较有意思的参数</p>
<p><code v-pre>--no-timestamp</code>：自定义备份的名字</p>
<p><code v-pre>--defaults-file</code>：读取想要的<code v-pre>my.cnf</code></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>innobackupex <span class="token parameter variable">--user</span><span class="token operator">=</span>root <span class="token parameter variable">--password</span><span class="token operator">=</span><span class="token number">123</span> --no-timestamp /data/backup/full
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>  <br>
<br>
<p><strong>备份集中多出来的文件：</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>-rw-r----- <span class="token number">1</span> root root    <span class="token number">24</span> Jun <span class="token number">29</span> 09:59 xtrabackup_binlog_info
-rw-r----- <span class="token number">1</span> root root   <span class="token number">119</span> Jun <span class="token number">29</span> 09:59 xtrabackup_checkpoints
-rw-r----- <span class="token number">1</span> root root   <span class="token number">489</span> Jun <span class="token number">29</span> 09:59 xtrabackup_info
-rw-r----- <span class="token number">1</span> root root   <span class="token number">2560</span> Jun <span class="token number">29</span> 09:59 xtrabackup_logfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>xtrabackup_binlog_info</code> ：（备份时刻的binlog位置）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> xtrabackup_binlog_info
mysql-bin.000003  <span class="token number">536749</span>
79de40d3-5ff3-11e9-804a-000c2928f5dd:1-7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>记录的是备份时刻，binlog的文件名字和当时的结束的position，可以用来作为截取 binlog 时的起点。</p>
 <br>
<p><code v-pre>xtrabackup_checkpoints</code> ：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>backup_type <span class="token operator">=</span> <span class="token keyword">full</span><span class="token operator">-</span>backuped
from_lsn <span class="token operator">=</span> <span class="token number">0</span>     <span class="token comment">--上次所到达的LSN号(对于全备就是从0开始,对于增量有别的显示方法)</span>
to_lsn <span class="token operator">=</span> <span class="token number">160683027</span>  <span class="token comment">--备份开始时间(ckpt)点数据页的LSN</span>
last_lsn <span class="token operator">=</span> <span class="token number">160683036</span>  <span class="token comment">--备份结束后，redo日志最终的LSN</span>
compact <span class="token operator">=</span> <span class="token number">0</span>
recover_binlog_info <span class="token operator">=</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>备份时刻，立即将已经commit过的，内存中的数据页刷新到磁盘(CKPT).开始备份数据，数据文件的LSN会停留在to_lsn位置。</li>
<li>备份时刻有可能会有其他的数据写入，已备走的数据文件就不会再发生变化了。</li>
<li>在备份过程中，备份软件会一直监控着redo的undo，如果一旦有变化会将日志也一并备走，并记录LSN到last_lsn。</li>
<li>从to_lsn ----&gt; last_lsn 就是，备份过程中产生的数据变化。</li>
</ul>
 <br>
 <br>
<h3 id="_2-5-全备的恢复" tabindex="-1"><a class="header-anchor" href="#_2-5-全备的恢复" aria-hidden="true">#</a> 2.5 全备的恢复</h3>
  <br>
<p><strong>准备备份（Prepared）</strong></p>
<p>将redo进行重做，已提交的写到数据文件，未提交的使用undo回滚掉。模拟了CSR的过程</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>innobackupex --apply-log /backup/full
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>apply-log-only</code> 参数（only 指的就是只回放 redo log 阶段，跳过 undo 阶段），避免未完成事务的回滚。</p>
  <br>
<p><strong>恢复备份</strong></p>
<p><strong>前提</strong>：</p>
<ul>
<li>被恢复的目录是空</li>
<li>被恢复的数据库的实例是关闭</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl stop mysqld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>创建新目录</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /data/mysql1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>数据授权</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql.mysql /data/mysql1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>恢复备份</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cp</span> <span class="token parameter variable">-a</span> /backup/full/* /data/mysql1/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>启动数据库</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/my.cnf
<span class="token assign-left variable">datadir</span><span class="token operator">=</span>/data/mysql1
<span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql.mysql /data/mysql1
systemctl start mysqld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  <br>
  <br>
<h2 id="_3-增量备份-incremental" tabindex="-1"><a class="header-anchor" href="#_3-增量备份-incremental" aria-hidden="true">#</a> 3. 增量备份 Incremental</h2>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-2-2.png" alt="&quot;增量备份" tabindex="0" loading="lazy"><figcaption>&quot;增量备份</figcaption></figure>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>innobackupex <span class="token parameter variable">--user</span><span class="token operator">=</span>root <span class="token parameter variable">--password</span><span class="token operator">=</span><span class="token number">123</span> --no-timestamp /backup/full 
innobackupex --apply-log /backup/full 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-备份产生的文件介绍" tabindex="-1"><a class="header-anchor" href="#_3-1-备份产生的文件介绍" aria-hidden="true">#</a> 3.1 备份产生的文件介绍</h3>
   <br>
<p><code v-pre>xtrabackup_binlog_info</code></p>
<p>记录备份时刻的二进制日志信息. 可以作为binlog截取的起点.</p>
  <br>
<p><code v-pre>xtrabackup_checkpoints</code></p>
<p>可以检测备份对不对</p>
<p><code v-pre>from</code> : 备份中包含的LSN号的起点,全备:0,增量:上次备份的结束位置</p>
<p><code v-pre>to</code>     : ckpt 时的LSN</p>
<p><code v-pre>last-9</code> : 备份结束时的LSN.下次增量备份的起始位置. 预留了9个 说明没有</p>
  <br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-2-1.png" alt="xtrabackup_checkpoints" tabindex="0" loading="lazy"><figcaption>xtrabackup_checkpoints</figcaption></figure>
  <br>
  <br>
<h3 id="_3-2-物理备份过程" tabindex="-1"><a class="header-anchor" href="#_3-2-物理备份过程" aria-hidden="true">#</a> 3.2  物理备份过程</h3>
<h4 id="_3-2-1-清空备份路径" tabindex="-1"><a class="header-anchor" href="#_3-2-1-清空备份路径" aria-hidden="true">#</a> 3.2.1 清空备份路径</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">\</span>rm <span class="token parameter variable">-rf</span> /backup/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>  <br>
<h4 id="_3-2-2-模拟数据" tabindex="-1"><a class="header-anchor" href="#_3-2-2-模拟数据" aria-hidden="true">#</a> 3.2.2 模拟数据</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">database</span> <span class="token keyword">full</span> <span class="token keyword">charset</span> utf8mb4<span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token keyword">full</span><span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> t1 <span class="token punctuation">(</span>id <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> t1 <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">commit</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  <br>
<h4 id="_3-2-3-进行周日的全备" tabindex="-1"><a class="header-anchor" href="#_3-2-3-进行周日的全备" aria-hidden="true">#</a> 3.2.3 进行周日的全备</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>innobackupex <span class="token comment">--user=root --password=123 --no-timestamp /backup/full</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>  <br>
<h4 id="_3-2-4-模拟周一的数据变化" tabindex="-1"><a class="header-anchor" href="#_3-2-4-模拟周一的数据变化" aria-hidden="true">#</a> 3.2.4 模拟周一的数据变化</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">database</span> inc1 <span class="token keyword">charset</span> utf8mb4<span class="token punctuation">;</span>
<span class="token keyword">use</span> inc1<span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> t1 <span class="token punctuation">(</span>id <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> t1 <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">commit</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  <br>
<h4 id="_3-2-5-进行周一的增量备份" tabindex="-1"><a class="header-anchor" href="#_3-2-5-进行周一的增量备份" aria-hidden="true">#</a> 3.2.5 进行周一的增量备份</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>innobackupex  <span class="token parameter variable">--user</span><span class="token operator">=</span>root <span class="token parameter variable">--password</span><span class="token operator">=</span><span class="token number">123</span> --no-timestamp <span class="token parameter variable">--incremental</span> --incremental-basedir<span class="token operator">=</span>/backup/full /backup/inc1 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>  <br>
<p><strong>说明</strong>:
<code v-pre>--incremental</code>    开关 开启增量备份
<code v-pre>--incremental-basedir=/backup/full</code> 基于哪个备份进行增量
<code v-pre>/backup/inc1</code>     增量备份的位置点</p>
  <br>
  <br>
<h4 id="_3-2-6-检查备份的lsn" tabindex="-1"><a class="header-anchor" href="#_3-2-6-检查备份的lsn" aria-hidden="true">#</a> 3.2.6 检查备份的LSN</h4>
  <br>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /backup/full/xtrabackup_checkpoints <span class="token comment">#全备的</span>
backup_type <span class="token operator">=</span> full-backuped
from_lsn <span class="token operator">=</span> <span class="token number">0</span>
to_lsn <span class="token operator">=</span> <span class="token number">217478672</span> <span class="token comment">#结束位置</span>
last_lsn <span class="token operator">=</span> <span class="token number">217478681</span> <span class="token comment">#默认间隔9个</span>
compact <span class="token operator">=</span> <span class="token number">0</span>
recover_binlog_info <span class="token operator">=</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  <br>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /backup/inc1/xtrabackup_checkpoints <span class="token comment">#增量备份1的</span>
backup_type <span class="token operator">=</span> incremental
from_lsn <span class="token operator">=</span> <span class="token number">217478672</span>  <span class="token comment">#全备结束位置</span>
to_lsn <span class="token operator">=</span> <span class="token number">217484653</span>
last_lsn <span class="token operator">=</span> <span class="token number">217484662</span> <span class="token comment">#默认间隔9个</span>
compact <span class="token operator">=</span> <span class="token number">0</span>
recover_binlog_info <span class="token operator">=</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-2-3.png" alt="xtrabackup_checkpoints对应图" tabindex="0" loading="lazy"><figcaption>xtrabackup_checkpoints对应图</figcaption></figure>
<h4 id="_3-2-7-模拟周二数据变化" tabindex="-1"><a class="header-anchor" href="#_3-2-7-模拟周二数据变化" aria-hidden="true">#</a> 3.2.7 模拟周二数据变化</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">database</span> inc2 <span class="token keyword">charset</span> utf8mb4<span class="token punctuation">;</span>
<span class="token keyword">use</span> inc2<span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> t1 <span class="token punctuation">(</span>id <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> t1 <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">commit</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-8-周二的增量备份" tabindex="-1"><a class="header-anchor" href="#_3-2-8-周二的增量备份" aria-hidden="true">#</a> 3.2.8  周二的增量备份</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>innobackupex  <span class="token parameter variable">--user</span><span class="token operator">=</span>root <span class="token parameter variable">--password</span><span class="token operator">=</span><span class="token number">123</span> --no-timestamp <span class="token parameter variable">--incremental</span> --incremental-basedir<span class="token operator">=</span>/backup/inc1 /backup/inc2 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-2-9-周三的数据变化" tabindex="-1"><a class="header-anchor" href="#_3-2-9-周三的数据变化" aria-hidden="true">#</a> 3.2.9 周三的数据变化</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">database</span> inc3 <span class="token keyword">charset</span> utf8mb4<span class="token punctuation">;</span>
<span class="token keyword">use</span> inc3<span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> t1 <span class="token punctuation">(</span>id <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> t1 <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">commit</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-2-4.png" alt="xtrabackup_checkpoints对应图" tabindex="0" loading="lazy"><figcaption>xtrabackup_checkpoints对应图</figcaption></figure>
<br>
<h3 id="_3-3-模拟数据库崩溃安全演练" tabindex="-1"><a class="header-anchor" href="#_3-3-模拟数据库崩溃安全演练" aria-hidden="true">#</a> 3.3 模拟数据库崩溃安全演练</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pkill</span> mysqld 
<span class="token punctuation">\</span>rm <span class="token parameter variable">-rf</span> /data/mysql/data/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-1-恢复思路" tabindex="-1"><a class="header-anchor" href="#_3-3-1-恢复思路" aria-hidden="true">#</a> 3.3.1 恢复思路</h4>
<ol>
<li>
<p>停业务,挂维护页</p>
</li>
<li>
<p>查找可用备份并处理备份:full+inc1+inc2</p>
</li>
<li>
<p>binlog: inc2 到 故障时间点的binlog</p>
</li>
<li>
<p>恢复全备+增量+binlog</p>
</li>
<li>
<p>验证数据</p>
</li>
<li>
<p>起业务,撤维护页</p>
  <br>
  <br>
</li>
</ol>
<h4 id="_3-3-2-恢复前的准备" tabindex="-1"><a class="header-anchor" href="#_3-3-2-恢复前的准备" aria-hidden="true">#</a> 3.3.2 恢复前的准备</h4>
<p>(1) 整理full</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>innobackupex --apply-log --redo-only  /backup/full   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>apply-log</code>  把rudo undo 都应用一下 CSR过程</p>
<p><code v-pre>redo-only</code> 这个选项在整理全备和所有的增量备份合并时使用 除了最后一次增量 ,不做UNDO</p>
 <br>
<p>(2) 合并inc1到full,并整理备份</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>innobackupex --apply-log --redo-only --incremental-dir<span class="token operator">=</span>/backup/inc1 /backup/full 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>(3) 合并inc2到full,并整理备份</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>innobackupex --apply-log --incremental-dir<span class="token operator">=</span>/backup/inc2 /backup/full 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-2-5.png" alt="last_lsn追上了" tabindex="0" loading="lazy"><figcaption>last_lsn追上了</figcaption></figure>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-2-6.png" alt="last_lsn追上了" tabindex="0" loading="lazy"><figcaption>last_lsn追上了</figcaption></figure>
<p>合并后可以看到 last_lsn的号码都一致了</p>
<p>(4) 最后一次整理full</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>innobackupex --apply-log /backup/full
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时已经恢复到周二晚上的备份</p>
<br>
<br>
<h4 id="_3-3-3-截取二进制日志恢复" tabindex="-1"><a class="header-anchor" href="#_3-3-3-截取二进制日志恢复" aria-hidden="true">#</a> 3.3.3 截取二进制日志恢复</h4>
<br>
<p>首先要确认昨晚的备份到今天数据库宕机之前的binlog 起点和终点用于恢复</p>
<p><strong>起点</strong>: 参数记录的</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /backup/inc2/xtrabackup_binlog_info
mysql-bin.000031	<span class="token number">1997</span>	aa648280-a6a6-11e9-949f-000c294a1b3b:1-17,
e16db3fd-a6e8-11e9-aee9-000c294a1b3b:1-9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>终点</strong>: 查询当前二进制日志文件</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysqlbinlog /data/binlog/mysql-bin.000031 <span class="token operator">|</span><span class="token function">grep</span> <span class="token string">'SET'</span>
SET @@<span class="token environment constant">SESSION</span>.GTID_NEXT<span class="token operator">=</span> <span class="token string">'e16db3fd-a6e8-11e9-aee9-000c294a1b3b:12'</span>/*<span class="token operator">!</span>*/<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/Section7-2-7.png" alt="确定终点" tabindex="0" loading="lazy"><figcaption>确定终点</figcaption></figure>
<br>
<p>通过分析得到 是从10号开始到12号结束，截取二进制文件得到昨晚到今天宕机之前的数据</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysqlbinlog --skip-gtids --include-gtids<span class="token operator">=</span><span class="token string">'e16db3fd-a6e8-11e9-aee9-000c294a1b3b:10-12'</span> /data/binlog/mysql-bin.00003<span class="token operator"><span class="token file-descriptor important">1</span>></span>/backup/binlog.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<h4 id="_3-3-4-恢复备份数据" tabindex="-1"><a class="header-anchor" href="#_3-3-4-恢复备份数据" aria-hidden="true">#</a> 3.3.4 恢复备份数据</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cp</span> <span class="token parameter variable">-a</span> /backup/full/* /data/mysql/data/
<span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql. /data/
/etc/init.d/mysqld start
mysql<span class="token operator">></span> <span class="token builtin class-name">set</span> <span class="token assign-left variable">sql_log_bin</span><span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token builtin class-name">source</span> /backup/binlog.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div> <br>
<p><strong>验证数据</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">full</span><span class="token punctuation">.</span>t1<span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> inc1<span class="token punctuation">.</span>t1<span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> inc2<span class="token punctuation">.</span>t1<span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> inc3<span class="token punctuation">.</span>t1<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div> <br>
 <br>
<h2 id="_4-旧版数据迁移到新版" tabindex="-1"><a class="header-anchor" href="#_4-旧版数据迁移到新版" aria-hidden="true">#</a> 4. 旧版数据迁移到新版</h2>
<p>(5.6.44  ---&gt;  5.7.26) 版本</p>
<h3 id="_4-1-搭建5-6的测试环境" tabindex="-1"><a class="header-anchor" href="#_4-1-搭建5-6的测试环境" aria-hidden="true">#</a> 4.1 搭建5.6的测试环境</h3>
<p>(1)创建必须的目录</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /data/mysql/data  <span class="token parameter variable">-p</span> 
<span class="token function">mkdir</span> /application/ <span class="token parameter variable">-p</span>
<span class="token function">mkdir</span> /data/binlog <span class="token parameter variable">-p</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上传软件至 <code v-pre>/application</code> 下并解压</p>
<p>上传软件至 <code v-pre>/application</code> 下并解压</p>
<p>(2) 建用户,改权限</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">useradd</span> mysql
<span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql. /data /application/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>(3) 修改环境变量</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/profile
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/application/mysql/bin:<span class="token environment constant">$PATH</span>
<span class="token builtin class-name">source</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(4)数据初始化</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum remove mariadb-libs
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> libaio-devel
<span class="token punctuation">\</span>rm <span class="token parameter variable">-rf</span> /data/mysql/data/*
/application/mysql/scripts/mysql_install_db <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql <span class="token parameter variable">--basedir</span><span class="token operator">=</span>/application/mysql <span class="token parameter variable">--datadir</span><span class="token operator">=</span>/data/mysql/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(5) 准备配置文件和启动脚本</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /etc/my.cnf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[mysqld]
basedir=/application/mysql 
datadir=/data/mysql/data 
server_id=99
user=mysql
log_bin=/data/binlog/mysql-bin
binlog_format=row
socket=/tmp/mysql.sock 
[mysql]
socket=/tmp/mysql.sock
EOF</span>

<span class="token function">cp</span>  /application/mysql/support-files/mysql.server /etc/init.d/mysqld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(5) 启动数据库</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>/etc/init.d/mysqld start
mysqladmin <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p</span> password <span class="token number">123</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-迁移5-6-数据到-5-7" tabindex="-1"><a class="header-anchor" href="#_4-2-迁移5-6-数据到-5-7" aria-hidden="true">#</a> 4.2 迁移5.6 数据到 5.7</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">--导入t100w数据</span>
<span class="token keyword">select</span> count（<span class="token operator">*</span>）<span class="token keyword">from</span> t100w<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>(1) 5.6 数据库备份</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysqldump <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123</span> <span class="token parameter variable">-A</span> --master-data<span class="token operator">=</span><span class="token number">2</span> --single-transaction <span class="token parameter variable">-R</span> <span class="token parameter variable">-E</span> <span class="token parameter variable">--triggers</span> <span class="token operator">></span>/tmp/full.sql
<span class="token function">scp</span> /tmp/full.sql <span class="token number">10.0</span>.0.51:/data/3308 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>(2)恢复数据到 5.7版本数据库</p>
<div class="language-powershell line-numbers-mode" data-ext="powershell"><pre v-pre class="language-powershell"><code>systemctl <span class="token function">start</span> mysqld3308
mysql <span class="token operator">-</span>S <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>3308/mysql<span class="token punctuation">.</span>sock
mysql> source <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>3308/full<span class="token punctuation">.</span>sql
mysql_upgrade  <span class="token operator">-</span>uroot <span class="token operator">-</span>p123 <span class="token operator">-</span>S <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>3308/mysql<span class="token punctuation">.</span>sock <span class="token operator">--</span>数据升级到新版本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后通过不断追加新的二进制日志在数据同步的差不多时候，停业务业务割接,恢复剩余的binlog，原始库一般要静止2月。</p>
</div></template>


