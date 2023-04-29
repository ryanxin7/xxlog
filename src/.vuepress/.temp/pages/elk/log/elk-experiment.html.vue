<template><div><h1 id="elk-综合实践" tabindex="-1"><a class="header-anchor" href="#elk-综合实践" aria-hidden="true">#</a> ELK 综合实践</h1>
<h2 id="实践案例" tabindex="-1"><a class="header-anchor" href="#实践案例" aria-hidden="true">#</a> 实践案例</h2>
<p>项目实现效果图</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211116154018274.png" alt="image-20211116154018274" tabindex="0" loading="lazy"><figcaption>image-20211116154018274</figcaption></figure>
<br>
<h3 id="需求简介" tabindex="-1"><a class="header-anchor" href="#需求简介" aria-hidden="true">#</a> 需求简介</h3>
<p>在我们的项目中，日志信息会输出到定制的目录里面了，那么接下来，我们就以nignx的日志数据为对象，使用filebeat来获取这些日志，将其输入到logstash中，logstash接收到数据后，定制显示格式，将其输入到elasticsearch中，kibana从elasticsearch中获取数据，并展示到当前界面。</p>
<br>
<h3 id="流程分析" tabindex="-1"><a class="header-anchor" href="#流程分析" aria-hidden="true">#</a> 流程分析</h3>
<ol>
<li>确定nginx的日志文件</li>
<li>filebeat 读取本机的nginx日志，并传输到 logstash</li>
<li>logstash 接收到数据后，定制输出格式，将数据转交给 elasticsearch</li>
<li>kibana 根据定制的索引名称，从 elasticsearch中获取数据。</li>
</ol>
<br>
<p><strong>关键点分析</strong></p>
<p><strong>准备工作</strong>：</p>
<ul>
<li>
<p>nginx 日志文件径在<code v-pre>/var/log/nginx/access.log</code>，我们来获取.log格式文件数据</p>
</li>
<li>
<p>filebeat数据收集</p>
<p>基于默认的 input 方式确定数据文件，output 方式选择 logstash <br></p>
<p>注意： input 内部的 nabled 必须开启<br></p>
</li>
<li>
<p>logstash传输</p>
<p>基于 input 属性获取 filebeat 的内容，基于output属性将数据发送给es</p>
</li>
<li>
<p>kibana展示</p>
<p>基于索引名称到 elasticsearch 获取数据，然后在discover中确认数据</p>
</li>
</ul>
<br>
<p><strong>实践步骤</strong></p>
<ol>
<li>环境还原 清空filebeat程序 关闭kibana程序 清空elasticsearch索引</li>
<li>定制filebeat  编写配置文件 启动filebeat</li>
<li>定制logstash  定制logstash文件 启动logstash</li>
<li>定制kibana 配置查询索引 验证效果</li>
</ol>
<br>
<h3 id="项目实践" tabindex="-1"><a class="header-anchor" href="#项目实践" aria-hidden="true">#</a> 项目实践</h3>
<p>环境还原</p>
<div class="language-basic line-numbers-mode" data-ext="basic"><pre v-pre class="language-basic"><code>清除所有的index

<span class="token keyword">for</span> index <span class="token function">in</span> $<span class="token punctuation">(</span>curl <span class="token operator">-</span>s http<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span><span class="token number">192.168</span><span class="token number">.8</span><span class="token number">.12</span><span class="token punctuation">:</span><span class="token number">9200</span><span class="token operator">/</span>_cat<span class="token operator">/</span>indices | awk '{<span class="token function">print</span> 
$<span class="token number">3</span>}'<span class="token punctuation">)</span>
<span class="token keyword">do</span>
curl <span class="token operator">-</span>XDELETE <span class="token number">192.168</span><span class="token number">.8</span><span class="token number">.12</span><span class="token punctuation">:</span><span class="token number">9200</span><span class="token operator">/</span>$index
done

filebeat主机安装nginx
apt install <span class="token operator">-</span>y nginx

关闭所有服务
systemctl <span class="token keyword">stop</span> logstash
systemctl <span class="token keyword">stop</span> filebeat
systemctl <span class="token keyword">stop</span> kibana
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>编写 filebeat 配置文件</strong></p>
<div class="language-basic line-numbers-mode" data-ext="basic"><pre v-pre class="language-basic"><code>定制配置文件
# cd <span class="token operator">/</span>etc<span class="token operator">/</span>filebeat<span class="token operator">/</span>
# cat filebeat.yaml 
filebeat.inputs<span class="token punctuation">:</span>
<span class="token operator">-</span> <span class="token keyword">type</span><span class="token punctuation">:</span> <span class="token function">log</span>
 paths<span class="token punctuation">:</span>
   <span class="token operator">-</span> <span class="token operator">/</span>var<span class="token operator">/</span><span class="token function">log</span><span class="token operator">/</span>nginx<span class="token operator">/</span><span class="token operator">*</span>.<span class="token function">log</span>
<span class="token function">output</span>.logstash<span class="token punctuation">:</span>
 hosts<span class="token punctuation">:</span> [<span class="token string">"192.168.8.13:5044"</span>]
启动filebeat
systemctl start filebeat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>编写 logstash 配置文件</strong></p>
<div class="language-basic line-numbers-mode" data-ext="basic"><pre v-pre class="language-basic"><code># cd <span class="token operator">/</span>etc<span class="token operator">/</span>logstash<span class="token operator">/</span>conf.d
# vim logstash.conf
<span class="token keyword">input</span> {
 beats {
   port <span class="token operator">=</span><span class="token operator">></span> <span class="token number">5044</span>
 }
}
<span class="token function">output</span>{
 elasticsearch {
   hosts <span class="token operator">=</span><span class="token operator">></span> [<span class="token string">"192.168.8.12:9200"</span>]
   index <span class="token operator">=</span><span class="token operator">></span> "nginx<span class="token operator">-</span>%{<span class="token operator">+</span>YYYY.MM.dd}"
 }
}
重启logstash
systemctl start logstash
检查效果
curl <span class="token number">192.168</span><span class="token number">.8</span><span class="token number">.12</span><span class="token punctuation">:</span><span class="token number">9200</span><span class="token operator">/</span>_cat<span class="token operator">/</span>indices 
查看日志
tail <span class="token operator">-</span>f <span class="token operator">/</span>var<span class="token operator">/</span><span class="token function">log</span><span class="token operator">/</span>logstash<span class="token operator">/</span>logstash<span class="token operator">-</span>plain.<span class="token function">log</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p><strong>启动 kibana</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl start kibana
<span class="token function">netstat</span> <span class="token parameter variable">-tnulp</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br>
<p>浏览器登录到 192.168.8.14:5601，点击左上角的logo图标，进入到home页面</p>
<br>
<p>通过以下方式进入：</p>
<ol>
<li>选择 左边栏的 Stack Management</li>
<li>点击 kibana 栏的 索引模式</li>
</ol>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211116155122354.png" alt="image-20211116155122354" tabindex="0" loading="lazy"><figcaption>image-20211116155122354</figcaption></figure>
<p><strong>点击 创建索引模式</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211116155136008.png" alt="image-20211116155136008" tabindex="0" loading="lazy"><figcaption>image-20211116155136008</figcaption></figure>
<p>在索引模式中，输入正则表达式，看是否能够匹配现有的日志，匹配到的话，点击下一步</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211116155146517.png" alt="image-20211116155146517" tabindex="0" loading="lazy"><figcaption>image-20211116155146517</figcaption></figure>
<p>时间字段选择 默认的 @timestamp 字段，然后点击右下角的 创建索引模式</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211116155156697.png" alt="image-20211116155156697" tabindex="0" loading="lazy"><figcaption>image-20211116155156697</figcaption></figure>
<p>我们收集到的数据中，包含58个字段，当我们点击某些属性的时候，还会显示简单的排序，到此为止，我们的kibana从elasticsearch中获取数据就配置完毕了</p>
<p>点击左边栏的第一个&quot;Discover&quot;按钮,点击&quot;Add ﬁlter&quot;的下拉框，选择nginx-*索引名，在&quot;Refresh&quot;右侧选择日志的时间范围，就可以实时的查看到说有数据的获取效果</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211116155212628.png" alt="image-20211116155212628" tabindex="0" loading="lazy"><figcaption>image-20211116155212628</figcaption></figure>
<br>
<p><strong>界面解析</strong></p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211116155244331.png" alt="image-20211116155244331" tabindex="0" loading="lazy"><figcaption>image-20211116155244331</figcaption></figure>
<p>Filters 部分的规则，其实就是日志中的键名是否包含某些关键信息，等同于 KQL的示例 message is 200。</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211116155305504.png" alt="image-20211116155305504" tabindex="0" loading="lazy"><figcaption>image-20211116155305504</figcaption></figure>
<p>点开每条记录旁边的&quot;&gt;&quot;表示查看该条日志的具体信息</p>
<figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211116155312321.png" alt="image-20211116155312321" tabindex="0" loading="lazy"><figcaption>image-20211116155312321</figcaption></figure>
</div></template>


