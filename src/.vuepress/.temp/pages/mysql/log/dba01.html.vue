<template><div><p class="note note-primary">   数据库是数据管理的有效技术，是由一批数据构成的有序集合，这些数据被存放在结构化的数据表里。数据表之间相互关联，反映客观事物间的本质联系。数据库能有效地帮助一个组织或企业科学地管理各类信息资源。数据是数据库中存储的基本对象，是按一定顺序排列组合的物理符号。
    数据有多种表现形式，可以是数字、文字、图像，甚至是音频或视频，它们都可以经过数字化后存入计算机。数据库是数据的集合，具有统一的结构形式并存放于统一的存储介质内，是多种应用数据的集成，并可被各个应用程序所共享。</p>
<!-- more -->
<h2 id="_1-dba-职业素养" tabindex="-1"><a class="header-anchor" href="#_1-dba-职业素养" aria-hidden="true">#</a> 1. DBA 职业素养</h2>
<p><strong>人品</strong>:  权利越大责任越大，要禁得住诱惑，严禁私自偷卖企业数据或向他人泄露秘钥信息。</p>
<p><strong>严谨</strong>:  操作数据库执行修改、删除类的命令时再三考虑，同事安排工作落实到笔头上，要有理论或者实践的支撑没测试过的参数绝对不能上生产环境。</p>
<p><strong>细心</strong>：请收起好奇心，做到敏感内容不听、不看、不问学会保护自己，把最简单的事情做的最漂亮，最专业。</p>
<p><strong>心态</strong>：在压力较大环境下做到不慌不乱，别惹事，出事别怕事。操作失误第一时间上报领导，不要自作主张操作。</p>
<br>
<h3 id="_1-1-职业技能" tabindex="-1"><a class="header-anchor" href="#_1-1-职业技能" aria-hidden="true">#</a> <strong>1.1 职业技能</strong></h3>
<ul>
<li>熟悉操作系统</li>
<li>熟悉公司业务</li>
<li>产品的功能</li>
<li>用户的行为(热功能,热数据）</li>
</ul>
<h3 id="_1-2-熟悉行业" tabindex="-1"><a class="header-anchor" href="#_1-2-熟悉行业" aria-hidden="true">#</a> <strong>1.2 熟悉行业</strong></h3>
<ul>
<li>熟悉行业发展趋势</li>
<li>了解版本新特性及使用率</li>
<li>数据库产品类型</li>
<li>定期参加 <a href="https://db-engines.com/en/ranking" target="_blank" rel="noopener noreferrer">数据库大会<ExternalLinkIcon/></a></li>
</ul>
<br>
<p><strong>喜欢数据库</strong>：体验很重要</p>
<br>
<p><strong>其实成功的门槛并不拥挤，因为大部分人在路上就放弃了。</strong>—— <a href="https://www.jianshu.com/u/44068ed972c7" target="_blank" rel="noopener noreferrer">Oldguo<ExternalLinkIcon/></a></p>
<br>
<br>
<h2 id="_2-数据库产品" tabindex="-1"><a class="header-anchor" href="#_2-数据库产品" aria-hidden="true">#</a> 2. 数据库产品</h2>
<p>4.1 什么是数据？</p>
<p>4.2 DBMS 数据库管理系统</p>
<p>RDBMS ： Oracle ，MySQL ，PG，MSSQL</p>
<p>NoSQL ： MongoDB ，Redis ，ES</p>
<p>NEWSQL （分布式）： TiDB，Spanner ，AliSQL(RDS+DRDS) ，OB ，PolarDB</p>
<h3 id="_2-1-mysql-版本选择" tabindex="-1"><a class="header-anchor" href="#_2-1-mysql-版本选择" aria-hidden="true">#</a> 2.1 MySQL 版本选择</h3>
<table>
<thead>
<tr>
<th>现阶段企业生产主要版本</th>
<th>更新版本</th>
</tr>
</thead>
<tbody>
<tr>
<td>5.6</td>
<td>5.6.34 ， 5.6.36 ，<strong>5.6.38</strong>（2017913） ，5.6.40</td>
</tr>
<tr>
<td>5.7</td>
<td>5.7.18 ，<strong>5.7.20</strong>（2017913） ，5.7.24 ，<strong>5.7.26</strong></td>
</tr>
<tr>
<td>8.0</td>
<td>8.0.14， 8.0.15 ，<strong>8.0.16</strong></td>
</tr>
</tbody>
</table>
<p><a href="https://downloads.mysql.com/archives/community/" target="_blank" rel="noopener noreferrer">官网下载地址<ExternalLinkIcon/></a></p>
<br>
<br>
<h3 id="_2-2-mysql安装方式" tabindex="-1"><a class="header-anchor" href="#_2-2-mysql安装方式" aria-hidden="true">#</a> <strong>2.2 MySQL安装方式</strong></h3>
<ol>
<li><strong>二进制文件安装：</strong> 💗 <code v-pre>较多使用</code></li>
</ol>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day01-1.png" alt="二进制文件安装" tabindex="0" loading="lazy"><figcaption>二进制文件安装</figcaption></figure>
<ol>
<li><strong>RHEL RPM 包安装：</strong></li>
</ol>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day01-2.png" alt="二进制文件安装" tabindex="0" loading="lazy"><figcaption>二进制文件安装</figcaption></figure>
<ol>
<li><strong>源代码编译</strong></li>
</ol>
<p><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day01-3.png" alt="源代码编译" loading="lazy">
<br></p>
<br>
<h2 id="_3-mysql-二进制版本安装" tabindex="-1"><a class="header-anchor" href="#_3-mysql-二进制版本安装" aria-hidden="true">#</a> 3. MySQL 二进制版本安装</h2>
<br>
<h3 id="_3-1-下载并上传软件至目录" tabindex="-1"><a class="header-anchor" href="#_3-1-下载并上传软件至目录" aria-hidden="true">#</a> 3.1 <strong>下载并上传软件至目录</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># mkdir -p /server/tools</span>

<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># cd /server/tools/</span>

<span class="token punctuation">[</span>root@m01 /server/tools<span class="token punctuation">]</span><span class="token comment"># yum install -y lrzsz</span>

<span class="token punctuation">[</span>root@m01 /server/tools<span class="token punctuation">]</span><span class="token comment"># ls</span>

mysql-5.7.26-linux-glibc2.12-x86_64.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解压软件移动软件目录</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@m01 /server/tools<span class="token punctuation">]</span><span class="token comment"># tar xf mysql-5.7.26-linux-glibc2.12-x86_64.tar.gz </span>

<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># mkdir /application</span>

<span class="token punctuation">[</span>root@m01 /server/tools<span class="token punctuation">]</span><span class="token comment"># mv mysql-5.7.26-linux-glibc2.12-x86_64 /application/mysql</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>用户的创建处理原始环境</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># yum remove mariadb-libs-5.5.64-1.el7.x86_64  #卸载mariadb软件包</span>

<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># rpm -qa |grep mariadb</span>

<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># useradd -s /sbin/nologin mysql</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>数据和软件部分独立开 (贴近生产)</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day01-4.png" alt="数据和软件部分独立开" tabindex="0" loading="lazy"><figcaption>数据和软件部分独立开</figcaption></figure>
<h3 id="_3-2-设置环境变量" tabindex="-1"><a class="header-anchor" href="#_3-2-设置环境变量" aria-hidden="true">#</a> <strong>3.2 设置环境变量</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/profile
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/application/mysql/bin:<span class="token environment constant">$PATH</span>

<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># source /etc/profile</span>
<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># mysql -V   #测试安装成功</span>
mysql Ver <span class="token number">14.14</span> Distrib <span class="token number">5.7</span>.26, <span class="token keyword">for</span> linux-glibc2.12 <span class="token punctuation">(</span>x86_64<span class="token punctuation">)</span> using EditLine wrapper
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-创建数据路径并授权" tabindex="-1"><a class="header-anchor" href="#_3-3-创建数据路径并授权" aria-hidden="true">#</a> <strong>3.3 创建数据路径并授权</strong></h3>
<p><strong>添加一块新磁盘模拟数据盘，格式化并挂载磁盘。</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># mkfs.xfs /dev/sdc</span>
<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># mkdir /data</span>
<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># blkid  #查看硬盘UUID</span>
<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/fstab </span>
<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># UUID="b7fde522-aa37-412a-9584-8313a673c5cc" /data xfs defaults 0 0</span>
<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># mount -a</span>
<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># df -h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>对目录授权</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> <span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql.mysql /application/*
 <span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql.mysql /data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-初始化数据-创建系统数据" tabindex="-1"><a class="header-anchor" href="#_3-4-初始化数据-创建系统数据" aria-hidden="true">#</a> <strong>3.4 初始化数据（创建系统数据）</strong></h3>
<p>5.6 版本 数据库初始化命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> /application/mysql/scripts/mysql_install_db 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>5.7 版本及之后版本数据库初始化命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># mkdir /data/mysql/data -p </span>
<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># chown -R mysql.mysql /data</span>
<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># mysqld --initialize --user=mysql --basedir=/application/mysql --datadir=/data/mysql/data </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p>{% note success %}
<strong>5.7 版本说明</strong></p>
<p><strong>--initialize 参数：</strong> <strong>做了什么？</strong></p>
<p><strong>对于密码复杂度进行定制：12位，4种</strong></p>
<p><strong>密码过期时间：180天</strong></p>
<p %="" endnote="" %=""><strong>给root@localhost用户设置临时密码</strong></p>
<br>
<br>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>报错:mysqld: error <span class="token keyword">while</span> loading shared libraries: libaio.so.1: cannot <span class="token function">open</span> shared object file: No such <span class="token function">file</span> or directory

解决：<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># yum install -y libaio-devel</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># mysqld --initialize --user=mysql --basedir=/application/mysql --datadir=/data/mysql/data</span>
<span class="token number">2020</span>-02-13T05:22:37.726244Z <span class="token number">1</span> <span class="token punctuation">[</span>Note<span class="token punctuation">]</span> A temporary password is generated <span class="token keyword">for</span> root@localhost: <span class="token operator">=</span>srV_<span class="token punctuation">)</span><span class="token number">56</span><span class="token punctuation">)</span>s4s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<p><strong>无临时密码方式 初始化方式</strong>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@m01 /data/mysql/data<span class="token punctuation">]</span><span class="token comment"># \rm -rf /data/mysql/data/*</span>
<span class="token punctuation">[</span>root@m01 ~<span class="token punctuation">]</span><span class="token comment"># mysqld --initialize-insecure --user=mysql --basedir=/application/mysql --datadir=/data/mysql/data</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>数据库配置文件的编写</strong></p>
<br>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/my.cnf 
<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token assign-left variable">user</span><span class="token operator">=</span>mysql
<span class="token assign-left variable">basedir</span><span class="token operator">=</span>/application/mysql
<span class="token assign-left variable">datadir</span><span class="token operator">=</span>/data/mysql/data
<span class="token assign-left variable">socket</span><span class="token operator">=</span>/tmp/mysql.sock
<span class="token assign-left variable">server_id</span><span class="token operator">=</span><span class="token number">6</span> 
<span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">3306</span>
<span class="token punctuation">[</span>mysql<span class="token punctuation">]</span>
<span class="token assign-left variable">socket</span><span class="token operator">=</span>/tmp/mysql.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="_3-5-启动数据库" tabindex="-1"><a class="header-anchor" href="#_3-5-启动数据库" aria-hidden="true">#</a> <strong>3.5 启动数据库</strong>：</h3>
<p>两种方式启动：</p>
<p><strong>1. sys-v</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 /etc/init.d<span class="token punctuation">]</span><span class="token comment"># cp /application/mysql/support-files/mysql.server /etc/init.d/mysqld </span>
<span class="token punctuation">[</span>root@db01 /etc/init.d<span class="token punctuation">]</span><span class="token comment"># service mysqld restart</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. systemd</strong></p>
<p>注意： sysv方式启动过的话，需要先提前关闭，才能以下方式登录</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span>/etc/systemd/system/mysqld.service <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[Unit]
Description=MySQL Server
Documentation=man:mysqld(8)
Documentation=http://dev.mysql.com/doc/refman/en/using-systemd.html
After=network.target
After=syslog.target
[Install]
WantedBy=multi-user.target
[Service]
User=mysql
Group=mysql
ExecStart=/application/mysql/bin/mysqld --defaults-file=/etc/my.cnf
LimitNOFILE = 5000
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<br>
<h3 id="_3-6-如何分析处理无法启动问题" tabindex="-1"><a class="header-anchor" href="#_3-6-如何分析处理无法启动问题" aria-hidden="true">#</a> <strong>3.6 如何分析处理无法启动问题</strong></h3>
<p>without updating PID 类似错误</p>
<p><strong>查看日志：</strong></p>
<p><code v-pre>/data/mysql/data/主机名.err</code></p>
<p><strong>[ERROR] 上下文</strong></p>
<p><strong>可能情况：</strong></p>
<p><code v-pre>/etc/my.cnf</code>  路径不对等</p>
<p><code v-pre>/tmp/mysql.sock </code>文件修改过 或 删除过</p>
<p>数据目录权限不是 mysql</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-DBA/day01-5.png" alt="数据目录权限不是 mysql" tabindex="0" loading="lazy"><figcaption>数据目录权限不是 mysql</figcaption></figure>
<p><strong>第二种排错方法：</strong></p>
<p>数据库启动不了直接使用命令行启动 ，会把启动过程打印到屏幕</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>/application/mysql/bin/mysql --defaults-file<span class="token operator">=</span>/etc/my.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-7-本地管理员密码的设定" tabindex="-1"><a class="header-anchor" href="#_3-7-本地管理员密码的设定" aria-hidden="true">#</a> <strong>3.7 本地管理员密码的设定</strong></h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># mysqladmin -uroot -p password xin123</span>
Enter password: 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>管理员用户密码忘记了？</strong></p>
<p>临时性方法</p>
<p><code v-pre>--skip-grant-tables 跳过授权表</code></p>
<p><code v-pre>--skip-networking  跳过远程登录</code></p>
<p><strong>关闭数据库</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># /etc/init.d/mysqld stop</span>
Shutting down MySQL<span class="token punctuation">..</span> SUCCESS<span class="token operator">!</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>启动数据库到维护模式</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>[root@db01 ~]# mysqld_safe --skip-grant-tables --skip-networking &amp;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>登录数据库内并修改密码</strong></p>
<p><strong>第一种方法</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token keyword">user</span><span class="token punctuation">,</span>host<span class="token punctuation">,</span>authentication_string <span class="token keyword">from</span> mysql<span class="token punctuation">.</span><span class="token keyword">user</span>；
mysql<span class="token punctuation">.</span>userflush <span class="token keyword">privileges</span><span class="token punctuation">;</span>
<span class="token keyword">grant</span> <span class="token keyword">all</span> <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> root<span class="token variable">@'localhost'</span> identified <span class="token keyword">by</span> <span class="token string">'1'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二种方法：</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>mysql<span class="token operator">></span> <span class="token keyword">alter</span> <span class="token keyword">user</span> root<span class="token variable">@'localhost'</span> identified <span class="token keyword">by</span> <span class="token string">'1'</span><span class="token punctuation">;</span>
ERROR <span class="token number">1290</span> <span class="token punctuation">(</span>HY000<span class="token punctuation">)</span>: The MySQL server <span class="token operator">is</span> running <span class="token keyword">with</span> the <span class="token comment">--skip-grant-tables option so it cannot execute this statement</span>
mysql<span class="token operator">></span> flush <span class="token keyword">privileges</span><span class="token punctuation">;</span>
mysql<span class="token operator">></span> <span class="token keyword">alter</span> <span class="token keyword">user</span> root<span class="token variable">@'localhost'</span> identified <span class="token keyword">by</span> <span class="token string">'1'</span><span class="token punctuation">;</span>

Query OK<span class="token punctuation">,</span> <span class="token number">0</span> <span class="token keyword">rows</span> affected <span class="token punctuation">(</span><span class="token number">0.01</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div> <br>
<br>
<p><strong>关闭数据库，正常启动验证</strong></p>
</div></template>


