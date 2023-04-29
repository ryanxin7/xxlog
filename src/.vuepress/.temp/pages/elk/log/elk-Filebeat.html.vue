<template><div><p><strong>轻量型数据采集器</strong> Beats 是一个免费且开放的平台，集合了多种单一用途数据采集器。它们从成百上千或成千上万台机器和系统向 Logstash 或 Elasticsearch 发送数据。Beats 是数据采集的得力工具。将 Beats 和您的容器一起置于服务器上，或者将 Beats 作为功能加以部署，然后便可在 Elasticsearch 中集中处理数据。Beats 能够采集符合 <a href="https://www.elastic.co/guide/en/ecs/current/index.html" target="_blank" rel="noopener noreferrer">Elastic Common Schema (ECS)<ExternalLinkIcon/></a> 要求的数据，如果您希望拥有更加强大的处理能力，Beats 能够将数据转发至 Logstash 进行转换和解析。</p>
<!-- more -->
<h2 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识" aria-hidden="true">#</a> 基础知识</h2>
<h3 id="功能简介" tabindex="-1"><a class="header-anchor" href="#功能简介" aria-hidden="true">#</a> 功能简介</h3>
<p>根据我们对ELK的经典架构的了解，他的数据收集和处理流程是：beats - logstash -
elasticsearch - kibana。Beats 默认提供了很多中场景的组件，最常见的就是FileBeat</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211116143335268.png" alt="image-20211116143335268" tabindex="0" loading="lazy"><figcaption>image-20211116143335268</figcaption></figure>
<br>
<p><strong>运行环境</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>安装java8环境
apt install openjdk-8-jdk
检查效果
java -version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/beats.jpg" alt="beats" tabindex="0" loading="lazy"><figcaption>beats</figcaption></figure>
<br>
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
<span class="token function">apt</span> <span class="token function">install</span> filebeat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>软件包安装</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.14.0-
amd64.deb
<span class="token function">wget</span> https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.14.0-
amd64.deb.sha512
shasum <span class="token parameter variable">-a</span> <span class="token number">512</span> <span class="token parameter variable">-c</span> filebeat-7.14.0-amd64.deb.sha512
dpkg <span class="token parameter variable">-i</span> filebeat-7.14.0-amd64.deb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>配置查看</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>查看配置文件
<span class="token comment"># dpkg -L filebeat</span>
/.
/etc
/etc/init.d
/etc/init.d/filebeat
/etc/filebeat
/etc/filebeat/filebeat.yml 核心配置文件
<span class="token punctuation">..</span>.
/etc/filebeat/filebeat.reference.yml
/etc/filebeat/fields.yml
<span class="token punctuation">..</span>.
/usr/share/filebeat/bin
/usr/share/filebeat/bin/filebeat
/usr/share/filebeat/bin/filebeat-god
/usr/share/doc
/usr/share/doc/filebeat
/usr/share/doc/filebeat/changelog.gz
/usr/bin
/usr/bin/filebeat
/lib
/lib/systemd
/lib/systemd/system
/lib/systemd/system/filebeat.service 服务启动文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看配置文件</strong></p>
<div class="language-basic line-numbers-mode" data-ext="basic"><pre v-pre class="language-basic"><code># grep <span class="token operator">-</span>Env '#|<span class="token operator">^</span>$' <span class="token operator">/</span>etc<span class="token operator">/</span>filebeat<span class="token operator">/</span>filebeat.yml
<span class="token number">15</span><span class="token punctuation">:</span>filebeat.inputs<span class="token punctuation">:</span> 数据的采集
<span class="token number">21</span><span class="token punctuation">:</span><span class="token operator">-</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token function">log</span>
<span class="token number">24</span><span class="token punctuation">:</span> enabled<span class="token punctuation">:</span> false 默认该功能没有开启
<span class="token number">27</span><span class="token punctuation">:</span> paths<span class="token punctuation">:</span>
<span class="token number">28</span><span class="token punctuation">:</span> <span class="token operator">-</span> <span class="token operator">/</span>var<span class="token operator">/</span><span class="token function">log</span><span class="token operator">/</span><span class="token operator">*</span>.<span class="token function">log</span>
<span class="token number">66</span><span class="token punctuation">:</span><span class="token operator">-</span> <span class="token keyword">type</span><span class="token punctuation">:</span> filestream
<span class="token number">69</span><span class="token punctuation">:</span> enabled<span class="token punctuation">:</span> false
<span class="token number">72</span><span class="token punctuation">:</span> paths<span class="token punctuation">:</span>
<span class="token number">73</span><span class="token punctuation">:</span> <span class="token operator">-</span> <span class="token operator">/</span>var<span class="token operator">/</span><span class="token function">log</span><span class="token operator">/</span><span class="token operator">*</span>.<span class="token function">log</span>
<span class="token number">96</span><span class="token punctuation">:</span>filebeat.config.modules<span class="token punctuation">:</span>
<span class="token number">98</span><span class="token punctuation">:</span> path<span class="token punctuation">:</span> ${path.config}<span class="token operator">/</span>modules.d<span class="token operator">/</span><span class="token operator">*</span>.yml
<span class="token number">101</span><span class="token punctuation">:</span> reload.enabled<span class="token punctuation">:</span> false
<span class="token number">108</span><span class="token punctuation">:</span>setup.<span class="token function">template</span>.settings<span class="token punctuation">:</span>
<span class="token number">109</span><span class="token punctuation">:</span> index.number_of_shards<span class="token punctuation">:</span> <span class="token number">1</span> 默认的数据分片个数是 <span class="token number">1</span>
<span class="token number">145</span><span class="token punctuation">:</span>setup.kibana<span class="token punctuation">:</span>
<span class="token number">176</span><span class="token punctuation">:</span><span class="token function">output</span>.elasticsearch<span class="token punctuation">:</span> 数据的输出
<span class="token number">178</span><span class="token punctuation">:</span> hosts<span class="token punctuation">:</span> [<span class="token string">"localhost:9200"</span>]
<span class="token number">204</span><span class="token punctuation">:</span>processors<span class="token punctuation">:</span>
<span class="token number">205</span><span class="token punctuation">:</span> <span class="token operator">-</span> add_host_metadata<span class="token punctuation">:</span>
<span class="token number">206</span><span class="token punctuation">:</span> <span class="token function">when</span>.<span class="token operator">not</span>.contains.tags<span class="token punctuation">:</span> forwarded
<span class="token number">207</span><span class="token punctuation">:</span> <span class="token operator">-</span> add_cloud_metadata<span class="token punctuation">:</span> ~
<span class="token number">208</span><span class="token punctuation">:</span> <span class="token operator">-</span> add_docker_metadata<span class="token punctuation">:</span> ~
<span class="token number">209</span><span class="token punctuation">:</span> <span class="token operator">-</span> add_kubernetes_metadata<span class="token punctuation">:</span> ~

结果显示：
filebeat.yml 这就是filebeat的配置文件，里面有<span class="token number">12</span>部分的配置，而我们重点关心的就
是<span class="token string">"Filebeat inputs"</span> 和 <span class="token string">"Outputs"</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>定制环境变量</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">'export PATH=/usr/share/kibana/bin:$PATH'</span> <span class="token operator">></span> /etc/profile.d/kibana.sh
<span class="token builtin class-name">source</span> /etc/profile.d/kibana.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="简单实践" tabindex="-1"><a class="header-anchor" href="#简单实践" aria-hidden="true">#</a> 简单实践</h3>
<p>定制配置文件</p>
<div class="language-basic line-numbers-mode" data-ext="basic"><pre v-pre class="language-basic"><code>备份配置文件
cd <span class="token operator">/</span>etc<span class="token operator">/</span>filebeat<span class="token operator">/</span>
cp filebeat.yml filebeat.yml<span class="token operator">-</span>bak
定制配置文件
filebeat.inputs<span class="token punctuation">:</span>
<span class="token operator">-</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token function">log</span>
paths<span class="token punctuation">:</span>
<span class="token operator">-</span> <span class="token operator">/</span>var<span class="token operator">/</span><span class="token function">log</span><span class="token operator">/</span>syslog
setup.<span class="token function">template</span>.settings<span class="token punctuation">:</span>
index.number_of_shards<span class="token punctuation">:</span> <span class="token number">5</span>
<span class="token function">output</span>.elasticsearch<span class="token punctuation">:</span>
hosts<span class="token punctuation">:</span> [<span class="token string">"192.168.8.12:9200"</span>]
<span class="token function">template</span>.<span class="token keyword">name</span><span class="token punctuation">:</span> <span class="token string">"filebeat"</span>
属性解析：
enabled<span class="token punctuation">:</span> true 表示启用这条配置
<span class="token function">template</span>.<span class="token keyword">name</span> 在将数据传入到elasticsearch的时候，自动添加一个索引，名称是filebeat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>启动服务</strong></p>
<div class="language-basic line-numbers-mode" data-ext="basic"><pre v-pre class="language-basic"><code>启动服务
systemctl start filebeat.service
systemctl <span class="token function">status</span> filebeat.service

查看效果
# curl <span class="token number">192.168</span><span class="token number">.8</span><span class="token number">.12</span><span class="token punctuation">:</span><span class="token number">9200</span><span class="token operator">/</span>_cat<span class="token operator">/</span>indices
green <span class="token keyword">open</span> filebeat<span class="token operator">-</span><span class="token number">7.14</span><span class="token number">.0</span><span class="token operator">-</span><span class="token number">2021.08</span><span class="token number">.15</span><span class="token operator">-</span><span class="token number">000001</span> yTq8KQtGSpOyGohS4kcLhQ <span class="token number">5</span> <span class="token number">1</span> <span class="token number">730</span> <span class="token number">0</span>
<span class="token number">348.5</span>kb <span class="token number">587</span>b

结果显示：
在elasticsearch中多了好几条索引数据
索引命名格式："自定义索引名<span class="token operator">-</span>版本号<span class="token operator">-</span>日期<span class="token operator">-</span><span class="token number">6</span>位编号"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<hr>
<p><strong>小结：</strong></p>
<ul>
<li>
<p>核心的配置
input
output
modules
elasticsearch
....</p>
</li>
<li>
<p>实践
只获取指定文件内部包含 404 的文件内容
输出的时候，设定索引名称</p>
</li>
<li>
<p>要点
如果需要filebeat 定制es的索引名称的话，需要自己设定模板</p>
</li>
</ul>
</div></template>


