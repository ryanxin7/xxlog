import{_ as t,V as l,W as o,$ as c,Y as n,Z as s,a0 as i,X as a,C as p}from"./framework-8eb1d601.js";const r={},d=n("p",null,"在等保2.0 测评单位对业务系统进行评测后，给出整改意见中提出：",-1),u=n("p",null,"应启用安全审计功能，审计覆盖到每个用户，对重要的用户行为和重要安全事件进行审计；建议对启用安全审计功能，对所有用户操作行为及系统安全事件进行审计记录。",-1),m=n("p",null,"应对审计记录进行保护，定期备份，避免受到未预期的删除、修改或覆盖等。建议定期对审计记录进行备份，保证审计记录不会受到未预期的删除、修改或覆盖。",-1),v=a(`<h1 id="搭建elk平台收集各系统日志" tabindex="-1"><a class="header-anchor" href="#搭建elk平台收集各系统日志" aria-hidden="true">#</a> 搭建ELK平台收集各系统日志</h1><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2><p>要收集的设备清单如下：</p><ul><li>深信服防火墙设备</li><li>H3C 核心交换机</li><li>深信服SSL VPN 设备</li><li>业务通用服务器</li></ul><br><h3 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h3><p>因为日志量不大所以使用四台服务器搭建ELK，部署情况如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>192.168.10.106  部署ES + head 插件 用来处理日志数据

192.168.10.107  部署Logstash 收集filebeat数据并将数据传送给ES 

192.168.10.108  部署Kibana 将数据从ES中读取出进行可视化展示

192.168.10.109  部署rsyslog + filebeat 收集汇总各系统日志文件并将日志文件传送给logstash

系统版本为：Ubuntu 20.04.3 LTS 
ELK组件版本：7.14.x
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="rsyslog-部署" tabindex="-1"><a class="header-anchor" href="#rsyslog-部署" aria-hidden="true">#</a> Rsyslog 部署</h2><p>rsyslog用于收集对端系统的日志推送</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#替换源</span>
<span class="token function">vim</span> /etc/apt/sources.list
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse

deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse

<span class="token comment">#安装rsyslog</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> rsyslog

<span class="token comment">#编辑配置文件</span>
<span class="token function">vim</span> /etc/rsyslog.conf

<span class="token comment">#设置日志收集目录，以主机名+IP+时间的格式 并排除本机的日志</span>
<span class="token variable">$template</span> Remote,<span class="token string">&quot;/var/log/attack-syslog/%hostname%_%fromhost-ip%/log_%<span class="token variable">$YEAR</span>%-%<span class="token variable">$MONTH</span>%-%<span class="token variable">$DAY</span>%.log&quot;</span>   <span class="token comment">#定义模板，接受日志文件路径，区分了不同主机的日志                                   </span>
:fromhost-ip, <span class="token operator">!</span>isequal, <span class="token string">&quot;127.0.0.1&quot;</span> ?Remote       <span class="token comment"># 过滤server 本机的日志</span>

<span class="token comment">#开启udp tcp 传输</span>
<span class="token variable">$ModLoad</span> imudp
<span class="token variable">$UDPServerRun</span> <span class="token number">514</span>
 
<span class="token variable">$ModLoad</span> imtcp
<span class="token variable">$InputTCPServerRun</span> <span class="token number">514</span>

<span class="token comment">#然后,以root身份修改rsyslog启动配置文件(Ubuntu在/etc/default/rsyslog下)</span>
<span class="token comment"># Options to syslogd</span>
<span class="token comment"># -m 0 disables &#39;MARK&#39; messages.</span>
<span class="token comment"># -r enables logging from remote machines</span>
<span class="token comment"># -x disables DNS lookups on messages recieved with -r //禁用掉dns记录项不够齐全或其他的日志中心的日志</span>

<span class="token comment"># See syslogd(8) for more details</span>
<span class="token comment"># </span>
<span class="token assign-left variable">SYSLOGD_OPTIONS</span><span class="token operator">=</span><span class="token string">&quot;-r&quot;</span> 
<span class="token comment">#SYSLOGD_OPTIONS=&quot;-r -x -m 180&quot; </span>
<span class="token comment"># 加 -r 选项以允许接受外来日志消息</span>
<span class="token comment"># 加 -x 禁用掉dns记录项不够齐全或其他的日志中心的日志# </span>
<span class="token comment"># 加 -m 修改syslog的内部mark消息写入间隔时间（0为关闭）。例如-m 180，表示每隔180分钟（每天8次）在日志文件里增加一行时间戳消息</span>
<span class="token comment"># 加 -h 默认情况下，syslog不会发送从远端接受过来的消息到其他主机，而使用该选项，则把该开关打开，所有接受到的信息都可根据syslog.conf中定义的@主机转发过去。</span>
<span class="token comment"># Options to klogd</span>
<span class="token comment"># -2 prints all kernel oops messages twice; once for klogd to decode, and</span>
<span class="token comment">#    once for processing with &#39;ksymoops&#39;</span>
<span class="token comment"># -x disables all klogd processing of oops messages entirely</span>
<span class="token comment"># See klogd(8) for more detailsKLOGD_OPTIONS=&quot;-x&quot;</span>
<span class="token comment">#SYSLOG_UMASK=077# set this to a umask value to use for all log files as in umask(1).</span>
<span class="token comment"># By default, all permissions are removed for &quot;group&quot; and &quot;other&quot;. </span>

<span class="token comment">#重启rsyslog</span>
<span class="token function">service</span> rsyslog restart

<span class="token comment">#查看其是否启动</span>
<span class="token function">netstat</span> <span class="token parameter variable">-nultp</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">514</span>

<span class="token comment">#验证</span>
<span class="token comment">#在rsyslog server端,用tail动态查看</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/host/<span class="token string">&#39;hostname&#39;</span>_<span class="token string">&#39;ip&#39;</span>/log_<span class="token string">&#39;y&#39;</span>_<span class="token string">&#39;m&#39;</span>_<span class="token string">&#39;d&#39;</span>.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/rsyslog.png" alt="rsyslog" tabindex="0" loading="lazy"><figcaption>rsyslog</figcaption></figure><br><h3 id="对端深信服防火墙配置" tabindex="-1"><a class="header-anchor" href="#对端深信服防火墙配置" aria-hidden="true">#</a> 对端深信服防火墙配置</h3><p><code>版本号：AF 8.0.45</code></p><p>在监控—&gt; 日志—&gt;设置 中开启行为审计日志选项，配置对端syslog服务器地址和端口号。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119143240455.png" alt="image-20211119143240455" tabindex="0" loading="lazy"><figcaption>image-20211119143240455</figcaption></figure><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119142929809.png" alt="image-20211119142929809" tabindex="0" loading="lazy"><figcaption>image-20211119142929809</figcaption></figure><br><h3 id="对端深信服ssl-vpn配置" tabindex="-1"><a class="header-anchor" href="#对端深信服ssl-vpn配置" aria-hidden="true">#</a> 对端深信服SSL VPN配置</h3><p><code>版本号： SSL 7.6.9R1</code></p><p>在系统设置—&gt; 系统配置—&gt; 数据中心中启用Syslog 设置添加对端服务器地址</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119143328696.png" alt="image-20211119143328696" tabindex="0" loading="lazy"><figcaption>image-20211119143328696</figcaption></figure><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119143710182.png" alt="image-20211119143710182" tabindex="0" loading="lazy"><figcaption>image-20211119143710182</figcaption></figure><p>点击测试连通性测试对端服务器连接状况</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119143907307.png" alt="image-20211119143907307" tabindex="0" loading="lazy"><figcaption>image-20211119143907307</figcaption></figure><p>设置日志输出类型，注意根据实际需求选择相应日志等级，避免不必要的资源浪费。</p><h3 id="对端h3c核心交换机配置" tabindex="-1"><a class="header-anchor" href="#对端h3c核心交换机配置" aria-hidden="true">#</a> 对端H3C核心交换机配置</h3><p><code>设备型号：H3C S7503E-M </code></p>`,30),b={href:"https://www.h3c.com/cn/d_202109/1466386_30005_0.htm",target:"_blank",rel:"noopener noreferrer"},g=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[Intranet-CSW-S7503E]info-center enable 
#开启信息中心
[Intranet-CSW-S7503E]info-center loghost 192.168.10.109 port 514 facility 
local5
#配置发送日志信息到IP地址为192.168.10.109端口为514的日志主机，日志主机记录工具为local5。
[Intranet-CSW-S7503E]info-center source default loghost deny
# 关闭loghost方向所有模块日志信息的输出开关。
[Intranet-CSW-S7503E]info-center source ftp loghost level notification
# 配置输出规则：允许FTP模块的、等级高于等于notification的日志信息输出到日志主机（注意：允许输出信息的模块由产品决定）。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119144942011.png" alt="image-20211119144942011" tabindex="0" loading="lazy"><figcaption>image-20211119144942011</figcaption></figure><p>由于系统对各方向允许输出的日志信息的缺省情况不一样，所以配置前必须将所有模块的需求方向（本例为loghost）上日志信息的输出开关关闭，再根据当前的需求配置输出规则，以免输出太多不需要的信息。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119150315381.png" alt="image-20211119150315381" tabindex="0" loading="lazy"><figcaption>image-20211119150315381</figcaption></figure><br><p>完成对端设备日志的推送设置后，相关日志保存在109本地服务器对应目录下的。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119151217426.png" alt="image-20211119151217426" tabindex="0" loading="lazy"><figcaption>image-20211119151217426</figcaption></figure><p>可见 防火墙日志中记录了之前在服务器中指定收集的日志类型</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119151333025.png" alt="image-20211119151333025" tabindex="0" loading="lazy"><figcaption>image-20211119151333025</figcaption></figure><p>至此rsyslog收集工作结束</p><h2 id="filebeat-组件配置" tabindex="-1"><a class="header-anchor" href="#filebeat-组件配置" aria-hidden="true">#</a> Filebeat 组件配置</h2><p><strong>环境变量配置</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/profile.d/filebeat.sh
<span class="token comment">#/bin/bash</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/usr/share/filebeat/bin:<span class="token environment constant">$PATH</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过配置rsyslog服务，已经收集到了各业务系统的日志文件，下一步工作就是收集到的文件通过ELK中的Filebeat组件对日志进行初步加工。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#编辑配置文件</span>
vim /etc/filebeat/filebeat.yml


<span class="token comment">#filebeat inputs 部分 设置日志的所在目录位置</span>
<span class="token comment">#一定要注意格式 特别是插件前后顺序和-的位置。</span>
<span class="token comment">#经过实践踩坑大部分问题都是因为格式导致的。 </span>

<span class="token key atrule">filebeat.inputs</span><span class="token punctuation">:</span>

<span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> log

  <span class="token comment"># Change to true to enable this input configuration.</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

  <span class="token comment"># Paths that should be crawled and fetched. Glob based paths.</span>
  <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> /var/log/attack<span class="token punctuation">-</span>syslog/localhost_10.123.0.2/<span class="token important">*.log</span>
  <span class="token key atrule">fields</span><span class="token punctuation">:</span>
   <span class="token key atrule">logtype1</span><span class="token punctuation">:</span> <span class="token string">&quot;sangfor-af&quot;</span>
    <span class="token comment">#- c:\\programdata\\elasticsearch\\logs\\*</span>

<span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> log
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> /var/log/attack<span class="token punctuation">-</span>syslog/sslvpn_10.123.0.27/<span class="token important">*.log</span>
  <span class="token key atrule">fields</span><span class="token punctuation">:</span>
   <span class="token key atrule">logtype1</span><span class="token punctuation">:</span> <span class="token string">&quot;sangfor-sslvpn&quot;</span>

<span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> log
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> /var/log/attack<span class="token punctuation">-</span>syslog/sslvpn_10.123.0.28/<span class="token important">*.log</span>
  <span class="token key atrule">fields</span><span class="token punctuation">:</span>
   <span class="token key atrule">logtype1</span><span class="token punctuation">:</span> <span class="token string">&quot;sangfor-sslvpn&quot;</span>

<span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> log
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> /var/log/attack<span class="token punctuation">-</span>syslog/2021_192.168.10.254/<span class="token important">*.log</span>
  <span class="token key atrule">fields</span><span class="token punctuation">:</span>
   <span class="token key atrule">logtype1</span><span class="token punctuation">:</span> <span class="token string">&quot;hc-nwhx&quot;</span>

<span class="token comment">#抓取数据并对日志进行打标签，后续通过标签建立独自的索引</span>



<span class="token comment">#Outputs部分</span>
<span class="token comment">#注释 Elasticsearch Output 配置Logstash Output</span>
<span class="token key atrule">output.logstash</span><span class="token punctuation">:</span>
  <span class="token comment"># The Logstash hosts</span>
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;192.168.10.107:5044&quot;</span><span class="token punctuation">]</span>

<span class="token comment">#可选项</span>
  <span class="token comment"># Optional SSL. By default is off.</span>
  <span class="token comment"># List of root certificates for HTTPS server verifications</span>
  <span class="token comment">#ssl.certificate_authorities: [&quot;/etc/pki/root/ca.pem&quot;]</span>

  <span class="token comment"># Certificate for SSL client authentication</span>
  <span class="token comment">#ssl.certificate: &quot;/etc/pki/client/cert.pem&quot;</span>

  <span class="token comment"># Client Certificate Key</span>
  <span class="token comment">#ssl.key: &quot;/etc/pki/client/cert.key&quot;</span>
  
  <span class="token comment">#启动</span>
  systemctl start filebeat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="filebeat-组件排错方法" tabindex="-1"><a class="header-anchor" href="#filebeat-组件排错方法" aria-hidden="true">#</a> Filebeat 组件排错方法</h3><p>在发生错误时，服务仍在运行状态时使用<code>systemctl status filebeat</code> 能看到的错误信息很少，通过前端手动指定运行日志的方式更易于问题的定位。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>filebeat <span class="token parameter variable">-c</span> /etc/filebeat/filebeat.yml <span class="token parameter variable">-path.home</span> /usr/share/filebeat <span class="token parameter variable">-path.config</span> /etc/filebeat <span class="token parameter variable">-path.data</span> /var/lib/filebeat <span class="token parameter variable">-path.logs</span> /var/log/filebeat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119155142314.png" alt="image-20211119155142314" tabindex="0" loading="lazy"><figcaption>image-20211119155142314</figcaption></figure><br><h3 id="logstash-组件配置" tabindex="-1"><a class="header-anchor" href="#logstash-组件配置" aria-hidden="true">#</a> Logstash 组件配置</h3><p><strong>环境变量定制</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;export PATH=/usr/share/logstash/bin:$PATH&#39;</span> <span class="token operator">&gt;</span> /etc/profile.d/logstash.sh
<span class="token builtin class-name">source</span> /etc/profile.d/logstash.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>生成配置文件</strong></p><p>以命令行的方式来进行启动太繁琐，我们最好还是以配置文件的方式来进行服务的启动管理，对于 logstash来说，它提供好了一个专门用于生成配置文件的命令 system-install，我们只需要按照既定的 配置文件规则，定制应用配置，最后执行该命令，即可实现服务脚本的配置。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#进入应用目录</span>
<span class="token builtin class-name">cd</span> /etc/logstash
<span class="token comment">#编辑启动参数文件</span>
<span class="token comment"># vim startup.options</span>
<span class="token punctuation">..</span>.
<span class="token comment"># Arguments to pass to logstash</span>
<span class="token assign-left variable">LS_OPTS</span><span class="token operator">=</span><span class="token string">&quot;--path.settings <span class="token variable">\${LS_SETTINGS_DIR}</span> -f /etc/logstash/conf.d&quot;</span>
 <span class="token comment">#注意： -f 指定的是 logstash的应用配置文件(比如 logstash.conf)存放到的目录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#以root用户执行下面的命令</span>
system-install
<span class="token comment">#查看生成的服务配置文件</span>
<span class="token comment"># ls /etc/systemd/system/logstash.service</span>
/etc/systemd/system/logstash.service
<span class="token comment">#查看服务配置文件内容</span>
<span class="token comment"># cat /etc/systemd/system/logstash.service</span>
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>logstash
<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>simple
<span class="token assign-left variable">User</span><span class="token operator">=</span>logstash
<span class="token assign-left variable">Group</span><span class="token operator">=</span>logstash
<span class="token comment"># Load env vars from /etc/default/ and /etc/sysconfig/ if they exist.</span>
<span class="token comment"># Prefixing the path with &#39;-&#39; makes it try to load, but if the file doesn&#39;t</span>
<span class="token comment"># exist, it continues onward.</span>
<span class="token assign-left variable">EnvironmentFile</span><span class="token operator">=</span>-/etc/default/logstash
<span class="token assign-left variable">EnvironmentFile</span><span class="token operator">=</span>-/etc/sysconfig/logstash
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/share/logstash/bin/logstash <span class="token string">&quot;--path.settings&quot;</span> <span class="token string">&quot;/etc/logstash&quot;</span> <span class="token string">&quot;-
f&quot;</span> <span class="token string">&quot;/etc/logstash/conf.d&quot;</span>
<span class="token assign-left variable">Restart</span><span class="token operator">=</span>always
<span class="token assign-left variable">WorkingDirectory</span><span class="token operator">=</span>/
<span class="token assign-left variable">Nice</span><span class="token operator">=</span><span class="token number">19</span>
<span class="token assign-left variable">LimitNOFILE</span><span class="token operator">=</span><span class="token number">16384</span>
<span class="token comment"># When stopping, how long to wait before giving up and sending SIGKILL?</span>
<span class="token comment"># Keep in mind that SIGKILL on a process can cause data loss.</span>
<span class="token assign-left variable">TimeoutStopSec</span><span class="token operator">=</span>infinity
<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target

<span class="token comment">#注意：</span>
<span class="token comment"># 由于服务启动的时候，用户名和用户组都是 logstash ，所以，我们采集数据的文件必须是具备查看的</span>
<span class="token comment">#权限</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),k={href:"http://localhost:4000/2021/10/21/Grok-patterns/",target:"_blank",rel:"noopener noreferrer"},h=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/logstash/conf.d/logstash.conf

<span class="token comment">#input 部分 </span>
<span class="token comment">#读取filebeat主机推送到5044端口的数据</span>

input <span class="token punctuation">{</span>
beats <span class="token punctuation">{</span>
port <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token number">5044</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

filter <span class="token punctuation">{</span>
    grok <span class="token punctuation">{</span>
        match <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;message&quot;</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&quot;%{TIMESTAMP_ISO8601:times} %{HOSTNAME:hosts} %{USERNAME:logtype}: message repeated %{INT:repetition_times} times: \\[ 日志类型:(?&lt;Operation_type&gt;(?&lt;=)(.{4})), (?&lt;Operation_typ1e&gt;(?&lt;=)(.{2})):%{USER:user}\\(%{HOSTNAME:connection_method}\\)\\(%{HOSTNAME:connection_method}\\), IP地址:%{IPV4:connection_ip}, 操作对象:%{GREEDYDATA:Action_log}, 操作类型:(?&lt;behaviour_t&gt;(?&lt;=)(.{4})), 描述:(?&lt;Behavior_performance&gt;(?&lt;=)(.{4}))\\]&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#output 部分</span>


<span class="token comment">#注意if后需要加 [fields]并添加之前filebeat中定制的字段[logtype1]，经测试直接加logtype1不好使。</span>
output <span class="token punctuation">{</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span>fields<span class="token punctuation">]</span><span class="token punctuation">[</span>logtype1<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;sangfor-af&quot;</span> <span class="token punctuation">{</span>
elasticsearch <span class="token punctuation">{</span>
hosts <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">[</span><span class="token string">&quot;http://localhost:9200&quot;</span><span class="token punctuation">]</span>
index <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&quot;sangfor-af01-%{+YYYY.MM.dd}&quot;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span>fields<span class="token punctuation">]</span><span class="token punctuation">[</span>logtype1<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;hc-nwhx&quot;</span> <span class="token punctuation">{</span>
elasticsearch <span class="token punctuation">{</span>
hosts <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">[</span><span class="token string">&quot;http://localhost:9200&quot;</span><span class="token punctuation">]</span>
index <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&quot;hc-nwhx-%{+YYYY.MM.dd}&quot;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span>fields<span class="token punctuation">]</span><span class="token punctuation">[</span>logtype1<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;sangfor-sslvpn&quot;</span> <span class="token punctuation">{</span>
elasticsearch <span class="token punctuation">{</span>
hosts <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">[</span><span class="token string">&quot;http://localhost:9200&quot;</span><span class="token punctuation">]</span>
index <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&quot;sangfor-sslvpn-%{+YYYY.MM.dd}&quot;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p><strong>启动服务</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>重载服务
systemctl daemon-reload
启动服务
systemctl start logstash.service
systemctl status logstash.service
查看效果
<span class="token comment"># netstat -tnulp | egrep &#39;Add|java&#39;</span>
Proto Recv-Q Send-Q Local Address     Foreign Address   State       PID/Program 
name  
tcp6       <span class="token number">0</span>     <span class="token number">0</span> <span class="token number">127.0</span>.0.1:9600   :::*               LISTEN     <span class="token number">88794</span>/java 
       
tcp6       <span class="token number">0</span>     <span class="token number">0</span> :::9200           :::*               LISTEN     <span class="token number">87210</span>/java 
       
tcp6       <span class="token number">0</span>     <span class="token number">0</span> :::9300           :::*               LISTEN     <span class="token number">87210</span>/java

结果显示：
 logstash的默认端口是 <span class="token number">9600</span> 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="logstash-排错" tabindex="-1"><a class="header-anchor" href="#logstash-排错" aria-hidden="true">#</a> logstash 排错</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看日志：</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/logstash/logstash-plain.log
 
<span class="token comment">#可以看到默认报错：</span>
 <span class="token punctuation">[</span><span class="token number">2021</span>-08-15T18:44:08,643<span class="token punctuation">]</span><span class="token punctuation">[</span>WARN <span class="token punctuation">]</span>
<span class="token punctuation">[</span>filewatch.tailmode.handlers.createinitial<span class="token punctuation">]</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span>
<span class="token punctuation">[</span>cc34021140e2525e95d5755b6135b9801f3595239bcda82a1cca03a1d0f857d6<span class="token punctuation">]</span> failed to 
<span class="token function">open</span> <span class="token function">file</span> <span class="token punctuation">{</span>:path<span class="token operator">=</span><span class="token operator">&gt;</span><span class="token string">&quot;/var/log/syslog&quot;</span>, :exception<span class="token operator">=</span><span class="token operator">&gt;</span>Errno::EACCES, 
:message<span class="token operator">=</span><span class="token operator">&gt;</span><span class="token string">&quot;Permission denied - /var/log/syslog&quot;</span><span class="token punctuation">}</span>
 
 
<span class="token comment">#临时增加一个 logstash 允许访问的权限</span>
<span class="token function">chown</span> logstash.logstash /var/log/syslog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通过head插件查看数据传递效果</strong></p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119161952112.png" alt="image-20211119161952112" tabindex="0" loading="lazy"><figcaption>image-20211119161952112</figcaption></figure><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119162040416.png" alt="SSL VPN日志索引" tabindex="0" loading="lazy"><figcaption>SSL VPN日志索引</figcaption></figure><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119162131164.png" alt="防火墙日志索引" tabindex="0" loading="lazy"><figcaption>防火墙日志索引</figcaption></figure><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211119162152721.png" alt="交换机日志索引" tabindex="0" loading="lazy"><figcaption>交换机日志索引</figcaption></figure>`,11);function f(y,x){const e=p("ExternalLinkIcon");return l(),o("div",null,[d,u,m,c(" more "),v,n("p",null,[n("a",b,[s("详情见交换机配置手册-15-信息中心配置-新华三集团-H3C"),i(e)])]),g,n("p",null,[s("日志在经过filebeat组件的初步改造，将各系统收集到的日志打上了type类型，Logstash根据类型创建不同的索引文件。这里通过grok插件对日志进行了字段自定义改造。以便后续在kibana中更好的绘图展示。"),n("a",k,[s("详情见 grok插件用法"),i(e)])]),h])}const q=t(r,[["render",f],["__file","elk-practice.html.vue"]]);export{q as default};
