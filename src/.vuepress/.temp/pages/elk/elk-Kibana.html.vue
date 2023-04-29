<template><div><p><strong>一张图片胜过千万行日志</strong>，Kibana 让您能够自由地选择如何呈现自己的数据。Kibana 是一个免费且开放的用户界面，能够让您对 Elasticsearch 数据进行可视化，并让您在 Elastic Stack 中进行导航。您可以进行各种操作，从跟踪查询负载，到理解请求如何流经您的整个应用，都能轻松完成。</p>
<!-- more -->
<h2 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识" aria-hidden="true">#</a> 基础知识</h2>
<h3 id="功能简介" tabindex="-1"><a class="header-anchor" href="#功能简介" aria-hidden="true">#</a> 功能简介</h3>
<p>Kibana 是一个开源的分析和可视化平台，设计用于和Elasticsearch一起工作。Kibana来搜索，查看，并和存储在Elasticsearch索引中的数据进行交互。可以轻松地执行高级数据分析，并且以各种图标、表格和地图的形式可视化数据。Kibana使得理解大量数据变得很容易。它简单的、基于浏览器的界面使你能够快速创建和共享动态仪表板，实时显示Elasticsearch查询的变化。</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/kabina.jpg" alt="kabina" tabindex="0" loading="lazy"><figcaption>kabina</figcaption></figure>
<br>
<p><strong>运行环境</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>安装java8环境
apt install openjdk-8-jdk
检查效果
java -version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="软件安装" tabindex="-1"><a class="header-anchor" href="#软件安装" aria-hidden="true">#</a> <strong>软件安装</strong></h3>
<p><strong>apt源码方式</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>获取软件源
<span class="token function">wget</span> <span class="token parameter variable">-qO</span> - https://artifacts.elastic.co/GPG-KEY-elasticsearch <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span>
-
<span class="token function">apt</span> <span class="token function">install</span> apt-transport-https
<span class="token builtin class-name">echo</span> <span class="token string">"deb https://artifacts.elastic.co/packages/7.x/apt stable main"</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span>
–a /etc/apt/sources.list.d/elastic-7.x.list
<span class="token function">apt</span> update
安装软件
<span class="token function">apt</span> <span class="token function">install</span> kibana
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>软件包安装</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://artifacts.elastic.co/downloads/kibana/kibana-7.14.0-amd64.deb
<span class="token function">wget</span> https://artifacts.elastic.co/downloads/kibana/kibana-7.14.0-
amd64.deb.sha512
shasum <span class="token parameter variable">-a</span> <span class="token number">512</span> <span class="token parameter variable">-c</span> kibana-7.14.0-amd64.deb.sha512
dpkg <span class="token parameter variable">-i</span> kibana-7.14.0-amd64.deb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>配置查看</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># dpkg -L kibana</span>
/.
/etc
/etc/default
/etc/default/kibana
/etc/init.d
/etc/init.d/kibana
/etc/kibana kibana家目录
/etc/kibana/kibana.yml
/etc/kibana/node.options
/etc/systemd
/etc/systemd/system
/etc/systemd/system/kibana.service 服务启动文件
/usr
/usr/share
/usr/share/kibana
<span class="token punctuation">..</span>.
/usr/share/kibana/bin 执行命令目录文件
/usr/share/kibana/bin/kibana-encryption-keys
/usr/share/kibana/bin/kibana-plugin
/usr/share/kibana/bin/kibana
/usr/share/kibana/bin/kibana-keystore
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>定制环境变量</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">'export PATH=/usr/share/kibana/bin:$PATH'</span> <span class="token operator">></span> /etc/profile.d/kibana.sh
<span class="token builtin class-name">source</span> /etc/profile.d/kibana.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="简单实践" tabindex="-1"><a class="header-anchor" href="#简单实践" aria-hidden="true">#</a> 简单实践</h3>
<p>命令格式</p>
<div class="language-basic line-numbers-mode" data-ext="basic"><pre v-pre class="language-basic"><code>修改配置文件
# vim <span class="token operator">/</span>etc<span class="token operator">/</span>kibana<span class="token operator">/</span>kibana.yml
# 设定kibana对外开放的通信端口
server.port<span class="token punctuation">:</span> <span class="token number">5601</span>
# 设定可以访问kibana的主机地址
server.host<span class="token punctuation">:</span> <span class="token string">"0.0.0.0"</span>
# 设定elasticsearch的主机地址
elasticsearch.hosts<span class="token punctuation">:</span> [<span class="token string">"http://192.168.8.12:9200"</span>]
# 设定kibana的数据索引
kibana.index<span class="token punctuation">:</span> <span class="token string">".kibana"</span>
# 设定中文显示格式
i18n.locale<span class="token punctuation">:</span> <span class="token string">"zh-CN"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>启动服务</strong></p>
<div class="language-basic line-numbers-mode" data-ext="basic"><pre v-pre class="language-basic"><code>启动服务
systemctl start kibana.service
systemctl <span class="token function">status</span> kibana.service

查看端口
# netstat <span class="token operator">-</span>tnulp | egrep 'Add|node'
Proto Recv<span class="token operator">-</span>Q Send<span class="token operator">-</span>Q Local Address Foreign Address State
PID<span class="token operator">/</span><span class="token function">Program</span> <span class="token keyword">name</span>
tcp <span class="token number">0</span> <span class="token number">0</span> <span class="token number">0.0</span><span class="token number">.0</span><span class="token number">.0</span><span class="token punctuation">:</span><span class="token number">5601</span> <span class="token number">0.0</span><span class="token number">.0</span><span class="token number">.0</span><span class="token punctuation">:</span><span class="token operator">*</span> LISTEN
<span class="token number">31992</span><span class="token operator">/</span>node

结果显示：
kibana默认端口是 <span class="token number">5601</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>浏览器查看效果</strong> <a href="http://192.168.10.108:5601" target="_blank" rel="noopener noreferrer">http://192.168.10.108:5601<ExternalLinkIcon/></a></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/ka.jpg" alt="ka" tabindex="0" loading="lazy"><figcaption>ka</figcaption></figure>
<p>kibana默认帮我们提供了非常多的示例数据</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/ka1.jpg" alt="ka1" tabindex="0" loading="lazy"><figcaption>ka1</figcaption></figure>
<hr>
<p><strong>小结：</strong></p>
<ul>
<li>
<p>定位
数据的可视化平台</p>
</li>
<li>
<p>部署
安装软件
配置文件
启动查看效果</p>
</li>
<li>
<p>注意：
默认的地图虽然支持中文，但是国家地图有问题，</p>
</li>
<li>
<p>核心点：
1 数据采集
2 数据可视化</p>
</li>
</ul>
</div></template>


