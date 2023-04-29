<template><div><p><strong>Logstash</strong> 能够动态地采集、转换和传输数据，不受格式或复杂度的影响。Logstash 采用可插拔框架，拥有 200 多个插件。您可以将不同的输入选择、过滤器和输出选择混合搭配、精心安排，让它们在管道中和谐地运行。利用 Grok 从非结构化数据中派生出结构，从 IP 地址解码出地理坐标，匿名化或排除敏感字段，并简化整体处理过程。Logstash 提供<a href="https://www.elastic.co/guide/en/logstash/current/output-plugins.html" target="_blank" rel="noopener noreferrer">众多输出选择<ExternalLinkIcon/></a>，您可以将数据发送到您要指定的地方，并且能够灵活地解锁众多下游用例。</p>
<!-- more -->
<h2 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识" aria-hidden="true">#</a> 基础知识</h2>
<h3 id="功能简介" tabindex="-1"><a class="header-anchor" href="#功能简介" aria-hidden="true">#</a> 功能简介</h3>
<p>logstash 就是借助于大量的功能插件，实现从数据源获取数据，然后将数据传输到elasticsearch。</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/ELK-logstash.jpg" alt="ELK-logstash" tabindex="0" loading="lazy"><figcaption>ELK-logstash</figcaption></figure>
<br>
<p>在图中我们可以明显看到，logstash组件至少包含两个插件：input和output，这两个主要用于信息的接入和输出。</p>
<p><strong>注意：</strong>
logstash 软件本身无序安装，它仅仅是一个软件运行命令程序，但是该软件的运行依赖于java环境</p>
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
<span class="token builtin class-name">echo</span> <span class="token string">"deb https://artifacts.elastic.co/packages/7.x/apt stable main"</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> –a /etc/apt/sources.list.d/elastic-7.x.list
<span class="token function">apt</span> update

安装软件
<span class="token function">apt</span> <span class="token function">install</span> logstash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>软件包安装</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://artifacts.elastic.co/downloads/logstash/logstash-7.14.0-amd64.deb
<span class="token function">wget</span> https://artifacts.elastic.co/downloads/logstash/logstash-7.14.0-
amd64.deb.sha512
shasum <span class="token parameter variable">-a</span> <span class="token number">512</span> <span class="token parameter variable">-c</span> logstash-7.14.0-amd64.deb.sha512
dpkg <span class="token parameter variable">-i</span> logstash-7.14.0-amd64.deb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>配置查看</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>dpkg <span class="token parameter variable">-L</span> logstash
/.
/usr
/usr/share
/usr/share/logstash
<span class="token punctuation">..</span>.
/etc
/etc/logstash
/etc/logstash/conf.d
/etc/logstash/log4j2.properties
/etc/logstash/startup.options 服务启动环境变量文件
/etc/logstash/jvm.options jvm相关配置
/etc/logstash/logstash.yml 服务配置文件
/etc/logstash/logstash-sample.conf 应用配置文件模板
/etc/logstash/pipelines.yml
<span class="token punctuation">..</span>.
/usr/share/logstash/bin
/usr/share/logstash/bin/benchmark.bat
/usr/share/logstash/bin/benchmark.sh
/usr/share/logstash/bin/cpdump
/usr/share/logstash/bin/dependencies-report
/usr/share/logstash/bin/ingest-convert.bat
/usr/share/logstash/bin/ingest-convert.sh
/usr/share/logstash/bin/logstash
/usr/share/logstash/bin/logstash-keystore
/usr/share/logstash/bin/logstash-keystore.bat
/usr/share/logstash/bin/logstash-plugin
/usr/share/logstash/bin/logstash-plugin.bat
/usr/share/logstash/bin/logstash.bat
/usr/share/logstash/bin/logstash.lib.sh
/usr/share/logstash/bin/pqcheck
/usr/share/logstash/bin/pqcheck.bat
/usr/share/logstash/bin/pqrepair
/usr/share/logstash/bin/pqrepair.bat
/usr/share/logstash/bin/ruby
/usr/share/logstash/bin/setup.bat
/usr/share/logstash/bin/system-install 生成系统管理配置文件
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>定制环境变量</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">'export PATH=/usr/share/logstash/bin:$PATH'</span> <span class="token operator">></span> /etc/profile.d/logstash.sh
<span class="token builtin class-name">source</span> /etc/profile.d/logstash.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="简单实践" tabindex="-1"><a class="header-anchor" href="#简单实践" aria-hidden="true">#</a> 简单实践</h3>
<p>命令格式</p>
<div class="language-basic line-numbers-mode" data-ext="basic"><pre v-pre class="language-basic"><code>logstash <span class="token operator">-</span>e '启动参数'
启动参数：
<span class="token keyword">input</span> {
stdin {}
}
<span class="token function">output</span> {
stdout {}
}

参数解析：
<span class="token keyword">input</span> {} 用于接受信息的输入
<span class="token function">output</span> {} 用于对内部的数据输出
stdin {} 表示屏幕上的标准输入
stdout {} 表示屏幕的标准输出
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>实践1 - 简单的输入输出测试</strong></p>
<div class="language-basic line-numbers-mode" data-ext="basic"><pre v-pre class="language-basic"><code># logstash <span class="token operator">-</span>e '<span class="token keyword">input</span> { stdin { } } <span class="token function">output</span> { stdout {} }'
...
[INFO ] <span class="token number">2021</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">15</span> <span class="token number">18</span><span class="token punctuation">:</span><span class="token number">03</span><span class="token punctuation">:</span><span class="token number">54.011</span> [Api Webserver] agent <span class="token operator">-</span> Successfully started
Logstash API endpoint {<span class="token punctuation">:</span>port<span class="token operator">=</span><span class="token operator">></span><span class="token number">9600</span>}
# 看到上面准备好的信息后，接下来我们在屏幕上随便输入一段信息

nihao logstash
# 信息输入完毕后，他会自动格式化的输出一些内容

{
<span class="token string">"host"</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token string">"ubuntu"</span><span class="token punctuation">,</span> # 当前的主机信息
"@timestamp" <span class="token operator">=</span><span class="token operator">></span> <span class="token number">2021</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">15</span>T10<span class="token punctuation">:</span><span class="token number">04</span><span class="token punctuation">:</span><span class="token number">32.873</span>Z<span class="token punctuation">,</span> # 该条信息的时间戳
<span class="token string">"message"</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token string">"nihao logstash"</span><span class="token punctuation">,</span> # 我们输入的内容
"@version<span class="token string">" => "</span><span class="token number">1</span>" # 版本信息
}

结果展示：
信息展示出来的内容，其实包含两部分： index<span class="token punctuation">(</span>搜索数据时候的索引<span class="token punctuation">)</span>和value<span class="token punctuation">(</span>具体的数据内容<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>实践2 - 信息传递到es</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>配置logstash将信息输出到es中
# logstash -e 'input { stdin{} } output { elasticsearch { hosts =>
["192.168.10.106:9200"] index => "message" } }'
...
[2021-08-15 18:07:51.678][INFO ][logstash.agent ] Successfully started
Logstash API endpoint {:port=>9600}
# 看到上面准备好的信息后，接下来我们在屏幕上随便输入一段信息
hello elasticsearch


     结果展示：
           因为我们将信息输入到es中了，所以这里看不到信息输入



es检查查看效果
# curl 192.168.10.106:9200/_cat/indices
green open message x3JlhXwBQsmGYITwOnlWEw 1 1 1 0 10.8kb 5.3kb


# curl 192.168.10.106:9200/message?pretty
{

"message" : {
...,
        "number_of_shards" : "1",
        "provided_name" : "message",
        "creation_date" : "1629022162762",
        "number_of_replicas" : "1",
        "uuid" : "x3JlhXwBQsmGYITwOnlWEw",
        "version" : {
        "created" : "7140099"
          }
        }
      }
   }
}

查看内容信息
# curl 192.168.10.106:9200/message/_search?pretty
{
"took" : 88,
"timed_out" : false,
"_shards" : {
"total" : 1,
"successful" : 1,
"skipped" : 0,
"failed" : 0
},
"hits" : {
"total" : {
"value" : 1,
"relation" : "eq"
},
"max_score" : 1.0,
"hits" : [
{
"_index" : "message",
"_type" : "_doc",
"_id" : "3UZJSXsBvfqpwa_-kJ8V",
"_score" : 1.0,
"_source" : {
"host" : "python-auto",
"@timestamp" : "2021-08-15T10:09:22.359Z",
"message" : "hello elasticsearch",
"@version" : "1"
              }
             }
           ]
         }
       }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>实践3 - 读取日志文件到es</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>模块简介
    logstash的信息采集模块支持file模块，可以通过指定日志文件，直接从文件中读取相关信息。

参考资料：
    https://www.elastic.co/guide/en/logstash/7.14/plugins-inputs-file.html

基本属性：
    path 指定文件路径
    start_position 设定从文件的那个位置开始读取，可选值 -- beginning, end(默认)
    type 传递信息的时候，增加一个额外的属性字段

配置示例：
    file {
       path => "/var/log/syslog"
       start_position => "beginning"
       type => "elasticsearch"
}

从系统日志文件中读取信息，输出到es中
# logstash -e 'input { file{path => "/var/log/syslog" start_position =>
"beginning" type => "elasticsearch"} } output { elasticsearch { hosts =>
["192.168.10.106"] index => "message" } }'
...
[INFO ] 2021-08-15 18:32:50.789 [[main]-pipeline-manager] elasticsearch - New
Elasticsearch output {:class=>"LogStash::Outputs::ElasticSearch", :hosts=>
["//192.168.8.12:9200"]}
...
[INFO ] 2021-08-15 18:32:54.992 [[main]-pipeline-manager] file - No sincedb_path
set, generating one based on the "path" setting
{:sincedb_path=>"/usr/share/logstash/data/plugins/inputs/file/.sincedb_f5fdf6ea0
ea92860c6a6b2b354bfcbbc", :path=>["/var/log/syslog"]}


在head插件中查看日志效果
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<h3 id="服务文件方式" tabindex="-1"><a class="header-anchor" href="#服务文件方式" aria-hidden="true">#</a> 服务文件方式</h3>
<p>生成配置文件</p>
<p>​    以命令行的方式来进行启动太繁琐，我们最好还是以配置文件的方式来进行服务的启动管理，对于
logstash来说，它提供好了一个专门用于生成配置文件的命令 <code v-pre>system-install</code>，我们只需要按照既定的
配置文件规则，定制应用配置，最后执行该命令，即可实现服务脚本的配置。</p>
<br>
<p><strong>服务启动参数</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>进入应用目录
cd /etc/logstash
编辑启动参数文件

# vim startup.options
...
# Arguments to pass to logstash
LS_OPTS="--path.settings ${LS_SETTINGS_DIR} -f /etc/logstash/conf.d"
     注意： -f 指定的是 logstash的应用配置文件(比如 logstash.conf)存放到的目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>定制配置文件信息输入到es的配置文件</strong></p>
<div class="language-basic line-numbers-mode" data-ext="basic"><pre v-pre class="language-basic"><code>生成配置文件
cp logstash<span class="token operator">-</span>sample.conf conf.d<span class="token operator">/</span>logstash.conf


修改配置文件 conf.d<span class="token operator">/</span>logstash.conf
# Sample Logstash configuration <span class="token keyword">for</span> creating a simple
# Beats <span class="token operator">-</span><span class="token operator">></span> Logstash <span class="token operator">-</span><span class="token operator">></span> Elasticsearch pipeline.


#输入部分
<span class="token keyword">input</span> {
# beats {
# port <span class="token operator">=</span><span class="token operator">></span> <span class="token number">5044</span>
# }

#插件
file {
path <span class="token operator">=</span><span class="token operator">></span> [<span class="token string">"/var/log/syslog"</span>]
start_position <span class="token operator">=</span><span class="token operator">></span> <span class="token string">"beginning"</span>
<span class="token keyword">type</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token string">"elasticsearch"</span>
}
}

#输出部分
<span class="token function">output</span> {
elasticsearch {
hosts <span class="token operator">=</span><span class="token operator">></span> [<span class="token string">"http://192.168.8.12:9200"</span>]
index <span class="token operator">=</span><span class="token operator">></span> "logstash<span class="token operator">-</span>test<span class="token operator">-</span>%{<span class="token operator">+</span>YYYY.MM.dd}"
}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>生成配置文件</strong></p>
<div class="language-basic line-numbers-mode" data-ext="basic"><pre v-pre class="language-basic"><code>以root用户执行下面的命令
<span class="token keyword">system</span><span class="token operator">-</span>install


查看生成的服务配置文件
# ls <span class="token operator">/</span>etc<span class="token operator">/</span>systemd<span class="token operator">/</span><span class="token keyword">system</span><span class="token operator">/</span>logstash.service
<span class="token operator">/</span>etc<span class="token operator">/</span>systemd<span class="token operator">/</span><span class="token keyword">system</span><span class="token operator">/</span>logstash.service


查看服务配置文件内容
# cat <span class="token operator">/</span>etc<span class="token operator">/</span>systemd<span class="token operator">/</span><span class="token keyword">system</span><span class="token operator">/</span>logstash.service
[Unit]
Description<span class="token operator">=</span>logstash
[Service]
<span class="token keyword">Type</span><span class="token operator">=</span>simple
User<span class="token operator">=</span>logstash
Group<span class="token operator">=</span>logstash
# Load env vars from <span class="token operator">/</span>etc<span class="token operator">/</span>default<span class="token operator">/</span> <span class="token operator">and</span> <span class="token operator">/</span>etc<span class="token operator">/</span>sysconfig<span class="token operator">/</span> <span class="token keyword">if</span> they exist.
# Prefixing the path <span class="token function">with</span> '<span class="token operator">-</span>' makes it try <span class="token keyword">to</span> load<span class="token punctuation">,</span> but <span class="token keyword">if</span> the file doesn't
# exist<span class="token punctuation">,</span> it continues onward.
EnvironmentFile<span class="token operator">=</span><span class="token operator">-</span><span class="token operator">/</span>etc<span class="token operator">/</span>default<span class="token operator">/</span>logstash
EnvironmentFile<span class="token operator">=</span><span class="token operator">-</span><span class="token operator">/</span>etc<span class="token operator">/</span>sysconfig<span class="token operator">/</span>logstash
ExecStart<span class="token operator">=</span><span class="token operator">/</span>usr<span class="token operator">/</span>share<span class="token operator">/</span>logstash<span class="token operator">/</span>bin<span class="token operator">/</span>logstash <span class="token string">"--path.settings"</span> <span class="token string">"/etc/logstash"</span> "<span class="token operator">-</span>
f<span class="token string">" "</span><span class="token operator">/</span>etc<span class="token operator">/</span>logstash<span class="token operator">/</span>conf.d"
Restart<span class="token operator">=</span>always
WorkingDirectory<span class="token operator">=</span><span class="token operator">/</span>
Nice<span class="token operator">=</span><span class="token number">19</span>
LimitNOFILE<span class="token operator">=</span><span class="token number">16384</span>
# <span class="token function">When</span> stopping<span class="token punctuation">,</span> how <span class="token keyword">long</span> <span class="token keyword">to</span> <span class="token keyword">wait</span> before giving up <span class="token operator">and</span> sending SIGKILL?
# Keep <span class="token function">in</span> mind that SIGKILL <span class="token keyword">on</span> a process can <span class="token function">cause</span> <span class="token keyword">data</span> loss.
TimeoutStopSec<span class="token operator">=</span>infinity
[Install]
WantedBy<span class="token operator">=</span>multi<span class="token operator">-</span>user.target

注意：
由于服务启动的时候，用户名和用户组都是 logstash ，所以，我们采集数据的文件必须是具备查看的权限
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>启动服务</strong></p>
<div class="language-basic line-numbers-mode" data-ext="basic"><pre v-pre class="language-basic"><code>重载服务
systemctl daemon<span class="token operator">-</span>reload


启动服务
systemctl start logstash.service
systemctl <span class="token function">status</span> logstash.service


查看效果
# netstat <span class="token operator">-</span>tnulp | egrep 'Add|java'
Proto Recv<span class="token operator">-</span>Q Send<span class="token operator">-</span>Q Local Address Foreign Address State PID<span class="token operator">/</span><span class="token function">Program</span>
<span class="token keyword">name</span>
tcp6 <span class="token number">0</span> <span class="token number">0</span> <span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">9600</span> <span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">*</span> LISTEN <span class="token number">88794</span><span class="token operator">/</span>java
tcp6 <span class="token number">0</span> <span class="token number">0</span> <span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token number">9200</span> <span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">*</span> LISTEN <span class="token number">87210</span><span class="token operator">/</span>java
tcp6 <span class="token number">0</span> <span class="token number">0</span> <span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token number">9300</span> <span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">*</span> LISTEN <span class="token number">87210</span><span class="token operator">/</span>java


结果显示：
logstash的默认端口是 <span class="token number">9600</span>


查看日志
tail <span class="token operator">-</span>f <span class="token operator">/</span>var<span class="token operator">/</span><span class="token function">log</span><span class="token operator">/</span>logstash<span class="token operator">/</span>logstash<span class="token operator">-</span>plain.<span class="token function">log</span>


可以看到默认报错：
[<span class="token number">2021</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">15</span>T18<span class="token punctuation">:</span><span class="token number">44</span><span class="token punctuation">:</span><span class="token number">08</span><span class="token punctuation">,</span><span class="token number">643</span>][WARN ]
[filewatch.tailmode.handlers.createinitial][main]
[cc34021140e2525e95d5755b6135b9801f3595239bcda82a1cca03a1d0f857d6] failed <span class="token keyword">to</span>
<span class="token keyword">open</span> file {<span class="token punctuation">:</span>path<span class="token operator">=</span><span class="token operator">></span><span class="token string">"/var/log/syslog"</span><span class="token punctuation">,</span> <span class="token punctuation">:</span>exception<span class="token operator">=</span><span class="token operator">></span>Errno<span class="token punctuation">:</span><span class="token punctuation">:</span>EACCES<span class="token punctuation">,</span>
<span class="token punctuation">:</span>message<span class="token operator">=</span><span class="token operator">></span><span class="token string">"Permission denied - /var/log/syslog"</span>}


临时增加一个 logstash 允许访问的权限
chown logstash.logstash <span class="token operator">/</span>var<span class="token operator">/</span><span class="token function">log</span><span class="token operator">/</span>syslog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>通过head插件查看数据传递效果</strong></p>
<br>
<hr>
<p><strong>小结：</strong></p>
<ul>
<li>
<p>定位
数据的采集和传递<br></p>
</li>
<li>
<p>组成：
核心：input - filter - output<br>
辅助：codec <br></p>
</li>
<li>
<p>特点：
每个部分都有对应业务场景的插件来实现功能</p>
</li>
<li>
<p><strong>守护进程方式运行logstash</strong><br>
定制服务的启动参数<br>
system-install 生成服务启动文件<br>
应用服务启动文件<br></p>
</li>
<li>
<p><strong>临时测试文件的方式</strong>
logstash -f xxx.conf</p>
</li>
</ul>
</div></template>


