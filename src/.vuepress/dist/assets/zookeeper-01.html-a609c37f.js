import{_ as l,V as d,W as r,Y as n,Z as e,a0 as i,X as s,C as t}from"./framework-8eb1d601.js";const o={},c=s('<h1 id="zookeeper-基础与安装" tabindex="-1"><a class="header-anchor" href="#zookeeper-基础与安装" aria-hidden="true">#</a> ZooKeeper 基础与安装</h1><h2 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识" aria-hidden="true">#</a> 基础知识</h2><h3 id="开发框架" tabindex="-1"><a class="header-anchor" href="#开发框架" aria-hidden="true">#</a> 开发框架</h3><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/kfkj.jpg" alt="开发框架" tabindex="0" loading="lazy"><figcaption>开发框架</figcaption></figure><ul><li><p>ORM - 一台主机承载所有的业务应用</p></li><li><p>MVC - 多台主机分别承载业务应用的不同功能，通过简单的网络通信实现业务的正常访问</p></li><li><p>RPC - 应用业务拆分、多应用共用功能、核心业务功能 独立部署，基于远程过程调用技术(RPC)的分布式服</p></li><li><p>务框架 提高业务功能复用及项目的整合</p></li><li><p>SOA - 粗放型的RPC分布式实现了大量的资源浪费，提高机器利用率的 资源调度和治理中心(SOA) ，基于</p><p>现有资源的高效利用，进一步提高服务的能力</p></li><li><p>微服务 - 随着互联网的发展、各种技术的平台工具出现、编程语言的升级、开发规范的标准化等因素，中小</p><p>型企业也有了相应的能力来发展更轻量级的SOA模式。</p></li></ul><br><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/微服务.jpg" alt="微服务" tabindex="0" loading="lazy"><figcaption>微服务</figcaption></figure><p>在微服务架构的场景中，有一个组件服务Service Registry,它是整个&quot;微服务架构&quot;中的核心，主要提供了 四个功能：服务注册和服务发现、下线处理、健康检测等。<br></p><p>服务注册：当服务启动后，将当前服务的相关配置信息都注册到一个公共的组件 -- Service Registry中。 服务发现：当客户端调用操作某些已注册服务 或者 服务的新增或删除等，通过从Service Registry中读取这些 服务配置的过程。</p><br><p>目前，Service Registry的最佳解决方案就是Zookeeper。这就是我们要学习Zookeeper的目的之一。</p><br><h3 id="分布式特性" tabindex="-1"><a class="header-anchor" href="#分布式特性" aria-hidden="true">#</a> 分布式特性</h3><p>目前来说，随着互联网的发展，各种软件技术，尤其是设备计算能力的提升，所以很多企业在项目的开启就应 用了 分布式架构。在分布式系统中各个节点之间的协作是通过高效网络进行消息数据传递，实现业务内部多 个服务的通信和协调，基于服务本地设备的性能实现资源的高效利用。</p><br><p><strong>分布式系统的设计目标通常包括几个方面</strong>：</p><ul><li>可用性：可用性是分布式系统的核心需求，衡量了一个分布式系统持续对外提供服务的能力。</li><li>可扩展性：增加及其后不会改变或者极少改变系统行为，并且获得相似的线性的性能提升</li><li>容错性：系统发生错误时，具有对错误进行规避以及从错误中恢复的能力</li><li>性能：对外服务的响应延时和吞吐率要满足用户的需求</li></ul><br><h3 id="一致性协议" tabindex="-1"><a class="header-anchor" href="#一致性协议" aria-hidden="true">#</a> 一致性协议</h3><p>我们为了满足分布式的各种场景需求，先后提出了 ACID、CAP、BASE等理论，其目的就是 在项目架构正常的运行过程中，即时出现各种问题，也能够保证业务保持基本可用的目标。</p><p>那么，我们在 项目架构在运行过程中 为了保证 业务保持基本可用 过程中定制的各种规约或者通信格 式，都可以将其称为 一致性协议。 一般情况下，我们会基于 集群的方式实现分布式的 可用性、可扩展性、容错性等的目标，那么我们如 何保证集群中的数据的一致性呢？</p><br><p>一般情况下，我们会基于 集群的方式实现分布式的 可用性、可扩展性、容错性等的目标，这个时候， 集群中各个主机之间的通信信息是否一致的就非常重要了。所谓的一致性是集群内部各个主机系统对外呈现的状态是否一致，即时业务出现问题的时候，这是所有的节点也要达成一个错误的共识。如果各个主机之间通信的数据不一致，就会导致各种分布式的场景问题。</p><p>在一个集群系统中，为了保证所有的主机系统能够处于一种相对的平衡状态，我们一般会基于传递数据本 身和主机角色的方式来实现，所以我们可以从两个方面来进行分析：<br> 数据本身：将所有的更新数据，同步到整个集群系统，保证数据的最终一致性。<br> 主机角色：client向多个server主机系统发起访问(包括并行访问)请求时，如何获取相同的更新后数据。<br></p><table><thead><tr><th>分类</th><th>解析</th></tr></thead><tbody><tr><td>状态复制机<br>(StateMachineReplication)</td><td>一个服务端集群，有多个server主机组成，每个server主机的更新都在本地实现。每个服务端都有一个一致性模块来接收客户端请求，没接收一次用户请求，一致性模块的状态就发生改变，通过 状态机系统 对所有的一致性模块的状态进行管控，只要所有的模块状态是一样的，那么server主机本地执行后的最终数据值就是一样的，从而实现服务的容错效果。GFS、HDFS、Chubby、ZooKeeper和etcd等分布式系统都是基于复制状态机模型实现的。</td></tr><tr><td>拜占庭将军问题<br>(Byzantine Failures)</td><td>一个服务端集群，有多个server主机组成,每个server主机接收到client请求后，根据自己本身的特性进行分析并给出执行的策略，多个server主机通过专用的通讯方式来进行协商，并达成最终的共识结果(少数服从多数)，然后按照最终的结果进行操作执行，从而实现服务的容错效果。</td></tr><tr><td>FLP定理<br>(Fischer,Lynch ,Patterson)</td><td>三位科学家在1985年发表的分布式理论，最小化异步网络通信场景下，因为消息通信是延迟的，所以可能会出现 只有一个节点故障(没被其他节点发现)时，其他节点不能达成一致。这证明了在异步场景中永远无法避免的一种现象。比如：三台主机ABC异步方式通信，在正常协商之间，因为C主机突然网络故障，导致无法实现剩余两台的少数服从多数，从而导致业务终止执行。</td></tr></tbody></table><h2 id="zookeeper-简介" tabindex="-1"><a class="header-anchor" href="#zookeeper-简介" aria-hidden="true">#</a> ZooKeeper 简介</h2><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211223160002493.png" alt="zookeeperlogo" tabindex="0" loading="lazy"><figcaption>zookeeperlogo</figcaption></figure><p>Zookeeper，英文字面意思就是&quot;动物管理员&quot;，因为动物园里面的所有动物的特殊性，需要管理员必须具备 观察动物状态和管理动物行为等方面的协调的能力，为动物们建立友好生存的生活环境。Zookeeper就是纷乱 的软件服务世界中的一名管理者，为繁杂的软件服务环境提供统一的协调管理服务。</p><p>可以想象为 Pig hive hadoop HAMA 等框架的logo都是动物的象形,zookeeper 相当于铲屎官，帮他们解决大小便</p><br><p>Zookeeper是Yahoo基于 Google的 Chubby 论文实现的一款解决分布式数据一致性问题的开源实现，它 是使用Java语言开发的，目前是Hadoop项目中的一个子项目。它在Hadoop、HBase、Kafka、Dubbo等技 术中充当了非常重要的核心组件角色。</p>',31),u={href:"https://zookeeper.apache.org/",target:"_blank",rel:"noopener noreferrer"},v=s(`<h3 id="环境安装" tabindex="-1"><a class="header-anchor" href="#环境安装" aria-hidden="true">#</a> 环境安装</h3><h4 id="搭建java环境" tabindex="-1"><a class="header-anchor" href="#搭建java环境" aria-hidden="true">#</a> 搭建java环境</h4><p>zookeeper 是依赖于java环境的，所以我们需要提前定制java环境</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>

创建目录
<span class="token function">mkdir</span> /data/<span class="token punctuation">{</span>softs,server<span class="token punctuation">}</span> <span class="token parameter variable">-p</span>
<span class="token builtin class-name">cd</span> /data/softs
下载java或者上传java
<span class="token function">ls</span> /data/softs

安装java
<span class="token function">tar</span> xf jdk-8u121-linux-x64.tar.gz <span class="token parameter variable">-C</span> /data/server
<span class="token builtin class-name">cd</span> /data/server/
<span class="token function">ln</span> <span class="token parameter variable">-s</span> jdk1.8.0_121 <span class="token function">java</span>

配置java环境变量
<span class="token builtin class-name">echo</span> <span class="token string">&#39;export JAVA_HOME=/data/server/java&#39;</span> <span class="token operator">&gt;&gt;</span> /etc/profile
<span class="token builtin class-name">echo</span> <span class="token string">&#39;export JRE_HOME=$JAVA_HOME/jre&#39;</span> <span class="token operator">&gt;&gt;</span> /etc/profile
<span class="token builtin class-name">echo</span> <span class="token string">&#39;export CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar&#39;</span> <span class="token operator">&gt;&gt;</span>
/etc/profile
<span class="token builtin class-name">echo</span> <span class="token string">&#39;export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH&#39;</span> <span class="token operator">&gt;&gt;</span> /etc/profile
<span class="token builtin class-name">source</span> /etc/profile

检查效果
<span class="token function">java</span> <span class="token parameter variable">-version</span>
检查java目录效果
tree <span class="token parameter variable">-L</span> <span class="token number">1</span> /data/server/java/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="安装软件" tabindex="-1"><a class="header-anchor" href="#安装软件" aria-hidden="true">#</a> 安装软件</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>软件准备
cd /data/softs
wget http://archive.apache.org/dist/zookeeper/zookeeper-3.7.0/apache-zookeeper-3.7.0-bin.tar.gz
wget http://archive.apache.org/dist/zookeeper/zookeeper-3.7.0/apache-zookeeper-3.7.0-bin.tar.gz.asc

校验软件
gpg --verify apache-zookeeper-3.7.0-bin.tar.gz.asc
对比 MD5 码一致后进行解压安装
tar zxvf apache-zookeeper-3.7.0-bin.tar.gz -C /data/server

cd /data/server
ln -s apache-zookeeper-3.7.0-bin zookeeper
echo &#39;export PATH=/data/server/zookeeper/bin:$PATH&#39; &gt; /etc/profile.d/zk.sh
source /etc/profile.d/zk.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改配置文件" tabindex="-1"><a class="header-anchor" href="#修改配置文件" aria-hidden="true">#</a> 修改配置文件</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>查看配置模板文件
cat zookeeper/conf/zoo_sample.cfg
grep -ni &#39;^[a-Z]&#39; zookeeper/conf/zoo_sample.cfg

设置配置文件
cp conf/zoo_sample.cfg conf/zoo.cfg
默认读取配置文件名 zoo.cfg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>配置文件常用参数</strong></p><ol><li>tickTime ：&quot;滴答时间&quot;，用于配置 Zookeeper中最小的时间单元长度，单位毫秒，是其他时间配置的基础</li><li>initLimit：初始化时间，包含启动和数据同步，其值是tickTime的倍数</li><li>syncLimit ：正常工作，心跳监测的时间间隔，其值是tickTime的倍数</li><li>dataDir ：配置Zookeeper服务存储数据的目录</li><li>clientPort：配置当前Zookeeper服务对外暴露的端口，用户客户端和服务端建立连接会话</li></ol><h4 id="启动服务" tabindex="-1"><a class="header-anchor" href="#启动服务" aria-hidden="true">#</a> 启动服务</h4><p>在Zookeeper的bin目录下有很多执行文件，其中zkServer.sh是启动服务的脚本文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ls</span> bin/
查看帮助信息
bin/zkServer.sh
命令参数功能详解
start：用于后台启动Zookeeper服务器
start-foreground：用于前台启动Zookeeper服务器，常用来排查失败原因
stop：用于关闭Zookeeper服务器
restart：用于重启Zookeeper服务器
status：用于查看Zookeeper服务器状态
upgrade：用于升级Zookeeper服务器
print-cmd：用于打印Zookeeper程序命令行及其相关启动参数
启动服务
bin/zkServer.sh start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="检查服务状态" tabindex="-1"><a class="header-anchor" href="#检查服务状态" aria-hidden="true">#</a> 检查服务状态</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Zookeeper的检查有很多种方式，主要有以下四种：端口、服务、进程、连接
端口检查
netstat -tnulp | grep 2181
服务检查
bin/zkServer.sh status
进程检查
ps aux | grep zoo
连接检查
bin/zkCli.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="进阶实践" tabindex="-1"><a class="header-anchor" href="#进阶实践" aria-hidden="true">#</a> 进阶实践</h4><p>在生产中，我们一般会讲Zookeeper的数据目录和日志目录都放在一个专用的路径下，而我们刚才实践 的效果是数据目录在临时文件夹/tmp下，而且没有设置日志文件配置信息，那么接下来我们就按照生产环境的 部署方法先来做一个单机版的Zookeeper环境。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>关闭刚才的服务
bin/zkServer.sh stop

创建专用的数据和日志目录
<span class="token builtin class-name">cd</span> /data/server/zookeeper
<span class="token function">mkdir</span> <span class="token punctuation">{</span>data,logs<span class="token punctuation">}</span>


在默认的配置文件中，没有日志的配置项，日志的配置项是dataLogDir
<span class="token comment"># vim conf/zoo.cfg</span>
<span class="token comment"># grep -ni &#39;^[a-Z]&#39; conf/zoo.cfg</span>
<span class="token number">2</span>:tickTime<span class="token operator">=</span><span class="token number">2000</span>
<span class="token number">5</span>:initLimit<span class="token operator">=</span><span class="token number">10</span>
<span class="token number">8</span>:syncLimit<span class="token operator">=</span><span class="token number">5</span>
<span class="token number">12</span>:dataDir<span class="token operator">=</span>/data/server/zookeeper/data
<span class="token number">13</span>:dataLogDir<span class="token operator">=</span>/data/server/zookeeper/logs
<span class="token number">15</span>:clientPort<span class="token operator">=</span><span class="token number">2181</span>


启动之前注意权限
ll
<span class="token function">chown</span> <span class="token number">1000.1000</span> <span class="token parameter variable">-R</span> /data/server/zookeeper*

启动当前Zookeeper的服务
bin/zkServer.sh start

三种方式查看不同的关注点
bin/zkServer.sh status
<span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> zoo
bin/zkCli.sh

查看产生的数据
<span class="token function">ls</span> /data/server/zookeeper/data/
<span class="token function">ls</span> /data/server/zookeeper/logs/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="本地连接服务" tabindex="-1"><a class="header-anchor" href="#本地连接服务" aria-hidden="true">#</a> 本地连接服务</h4><p>当Zookeeper服务器正常启动后，我们就可以使用Zookeeper自带的zkCli.sh脚本，以命令行的方式 连接到Zookeeper。使用方法非常简单：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>bin/zkCli.sh
如果出现下面信息，就表示命令行客户端已经成功连入到Zookeeper
WATCHER::
WatchedEvent state:SyncConnected type:None path:null
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">0</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="远程连接服务" tabindex="-1"><a class="header-anchor" href="#远程连接服务" aria-hidden="true">#</a> 远程连接服务</h4>`,22),p={href:"http://zkCli.sh",target:"_blank",rel:"noopener noreferrer"},b=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>zkCli.sh 脚本还提供了远程连接非本地的Zookeeper服务器的参数 -server，使用这个参数就可以连接
到远程的Zookeeper服务主机

命令格式：
bin/zkCli.sh -server &lt;zk_ip&gt;:&lt;zk_port&gt;

远程连接
bin/zkCli.sh -server 192.168.8.14:2181
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="命令帮助" tabindex="-1"><a class="header-anchor" href="#命令帮助" aria-hidden="true">#</a> 命令帮助</h4><p>当客户端成功的连接到Zookeeper服务后，我们可以输入任意非法的命令都可以获取Zookeeper客户端 相关的命令使用方法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>连接到Zookeeper服务后，输入help查看相关命令
ZooKeeper -server host:port cmd args 宿主机命令行执行Zookeeper客户端命令
stat path [watch] 查看节点状态或者判断结点是否存在
set path data [version] 设置节点数据
ls path [watch] 列出节点信息
delquota [-n|-b] path 删除节点个数(-n)或数据长度(-b)配额
ls2 path [watch] ls命令的加强版，列出更多信息
setAcl path acl 设置节点的权限信息
setquota -n|-b val path 设置节点个数(-n)或数据长度(-b)的配额
history 列出最近的命令历史，可以和redo配合使用
redo cmdid 再次执行某个命令，结合history使用
printwatches on|off 设置和显示监视状态
delete path [version] 删除节点，不可删除有子节点的节点
sync path 强制数据同步
listquota path 显示节点资源配额信息
rmr path 强制删除节点
get path [watch] 获取节点数据
create [-s] [-e] path data acl 创建顺序(-s)或临时(-e)结点
addauth scheme auth 配置节点认证信息
quit 退出连接
getAcl path 获取节点的权限信息
close 断开当前Zookeeper连接
connect host:port 连接Zookeeper服务端



使用close命令可以关闭当前的连接
使用quit命令可以退出Zookeeper服务
使用connect host:port命令可以重新连接Zookeeper服务  connect 192.168.8.14:2181

这些命令主要分为五大类：基本信息查看、节点基本操作、资源配额、权限设置、其他操作等
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="信息查看" tabindex="-1"><a class="header-anchor" href="#信息查看" aria-hidden="true">#</a> 信息查看</h4><h5 id="节点列表" tabindex="-1"><a class="header-anchor" href="#节点列表" aria-hidden="true">#</a> 节点列表</h5><p>关于节点列表主要有两种命令ls和ls2，他们的意思都是&quot;获取路径下的节点信息&quot; 命令格式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ls</span> path 显示当前的节点列表
注意：
此path路径为绝对路径


显示普通效果
<span class="token punctuation">[</span>zk: <span class="token number">127.0</span>.0.1:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">4</span><span class="token punctuation">]</span> <span class="token function">ls</span> /
<span class="token punctuation">[</span>zookeeper<span class="token punctuation">]</span>


注意：
该结果表示Zookeeper服务端的根目录下有一个Zookeeper的子节点，
它是Zookeeper的保留节点，一般不用。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="节点状态" tabindex="-1"><a class="header-anchor" href="#节点状态" aria-hidden="true">#</a> 节点状态</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stat命令作用：判断节点是否存在，节点不存在则报错，否则显示节点的状态信息，
命令格式：
<span class="token function">stat</span> <span class="token punctuation">[</span> <span class="token parameter variable">-w</span> <span class="token punctuation">]</span> path

注意：
注意事项同ls
查看未知节点
<span class="token punctuation">[</span>zk: <span class="token number">127.0</span>.0.1:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">7</span><span class="token punctuation">]</span> <span class="token function">stat</span> /nihao

Node does not exist: /nihao
查看已知节点
<span class="token punctuation">[</span>zk: <span class="token number">127.0</span>.0.1:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">8</span><span class="token punctuation">]</span> <span class="token function">stat</span> /zookeeper
cZxid <span class="token operator">=</span> 0x0 节点创建时的zxid
ctime <span class="token operator">=</span> Thu Jan 01 08:00:00 CST <span class="token number">1970</span> 节点创建时间
mZxid <span class="token operator">=</span> 0x0 节点最近一次更新时的zxid
mtime <span class="token operator">=</span> Thu Jan 01 08:00:00 CST <span class="token number">1970</span> 节点最近一次更新的时间
pZxid <span class="token operator">=</span> 0x0 父节点创建时的zxid
cversion <span class="token operator">=</span> <span class="token parameter variable">-1</span> 子节点数据更新次数
dataVersion <span class="token operator">=</span> <span class="token number">0</span> 本节点数据更新次数
aclVersion <span class="token operator">=</span> <span class="token number">0</span> 节点ACL<span class="token punctuation">(</span>授权信息<span class="token punctuation">)</span>的更新次数
ephemeralOwner <span class="token operator">=</span> 0x0 持久节点值为0，临时节点值为sessionid
dataLength <span class="token operator">=</span> <span class="token number">0</span> 节点数据长度
numChildren <span class="token operator">=</span> <span class="token number">1</span> 子节点个数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="zookeeper-工作机制" tabindex="-1"><a class="header-anchor" href="#zookeeper-工作机制" aria-hidden="true">#</a> Zookeeper 工作机制</h3><p>Zookeeper 从设计模式的角度理解：是一个基于观察者模式设计的分布式服务管理框架（监工），它负责存储和管理大家都关心的数据，然后接受观察者的注册，一旦这些数据的状态发生变化，Zookeeper就将负责通知已经在Zookeeper上注册的哪些观察者做出相应的反应。</p><p>Zookeeper作为一个典型的分布式数据一致性解决方案，依赖Zookeeper的分布式应用程序，可以基于Zookeeper实现数据发布/订阅、负载均衡、命名服务、服务注册与发现、分布式协调/事件通知、集群管理、Leader 选举、 分布式锁和队列 等功能。</p><h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h3><ul><li>Zookeeper：一个领导者（Leader），多个跟随者（Follower）组成的集群。</li><li>集群中只要有半数以上节点存活，Zookeeper集群就能正常服务。所 以Zookeeper适合安装奇数台服务器。</li><li>全局数据一致：每个Server保存一份相同的数据副本，Client无论连接到哪个Server，数据都是一致的。</li><li>更新请求顺序执行，来自同一个Client的更新请求按其发送顺序依次执行。</li><li>数据更新原子性，一次数据更新要么成功，要么失败。</li><li>实时性，在一定时间范围内，Client能读到最新数据。</li></ul><h3 id="角色" tabindex="-1"><a class="header-anchor" href="#角色" aria-hidden="true">#</a> 角色</h3><p>基本上所有的集群模式中的主机都有自己的角色，最为典型的集群模式就是 M/S 主备模式。在这种模式下， 我们把处于主要地位(处理写操作)的主机称为 Master 节点，处于次要地位(处理读操作)的主机称为 Slave 节点，生产中读取的方式一般是以异步复制方式来实现的。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/jues.jpg" alt="jues" tabindex="0" loading="lazy"><figcaption>jues</figcaption></figure><p>Zookeeper集群就是这种M/S的模型，集群通常由2n+1台Server节点组成，每个Server都知道彼此的存 在。对于2n+1台server，只要有&gt;=(n+1)台server节点可用，整个Zookeeper系统保持可用。</p><table><thead><tr><th>角色</th><th>描述</th></tr></thead><tbody><tr><td>领导者 (Leader)</td><td>领导者不接受client读请求，负责进行投票发起和决议，更新系统状态</td></tr><tr><td>跟随者 (Follower)</td><td>接收客户请求并向客户端返回结果，在选Leader过程中参与投票</td></tr><tr><td>观察者 (Observer)</td><td>转交客户端写请求给leader节点，和同步leader状态，不参与选主投票</td></tr><tr><td>学习者(Learner)</td><td>和leader进行状态同步的节点统称Learner，Follower和Observer 都是</td></tr><tr><td>客户端(client)</td><td>请求发起方</td></tr></tbody></table><br><p>Zookeeper集群系统启动时，集群中的主机会选举出一台主机为Leader，其它的就作为Learner(包括 Follower和Observer)。接着由follower来服务client的请求，对于不改变系统一致性状态的读操作， 由follower的本地内存数据库直接给client返回结果；对于会改变Zookeeper系统状态的更新操作，则交 由Leader进行提议投票，超过半数通过后返回将结果给client。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/xuanj.jpg" alt="xuanj" tabindex="0" loading="lazy"><figcaption>xuanj</figcaption></figure><h3 id="zab协议" tabindex="-1"><a class="header-anchor" href="#zab协议" aria-hidden="true">#</a> ZAB协议</h3><p>（Zookeeper Atomic Broadcast，Zookeeper原子广播协议）来保证主从节点数据一致性的，ZAB协议支持「崩溃恢复和消息广播」两种模式，很好解决了这两个问题：</p><ul><li><p>崩溃恢复：</p><p>Leader挂了，进入该模式，选一个新的leader出来,接着，新的Leader服务器与集群中Follower服务进行数据同步，当集群中超过半数机器与该 Leader服务器完成数据同步之后，退出恢复模式进入消息广播模式。</p></li><li><p>消息广播：</p><p>把更新的数据，从Leader同步到所有Follower Leader 服务器开始接收客户端的事务请求生成事务Proposal进行事务请求处理。</p></li></ul><h3 id="事务id" tabindex="-1"><a class="header-anchor" href="#事务id" aria-hidden="true">#</a> 事务id</h3><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211223163121965.png" alt="事务" tabindex="0" loading="lazy"><figcaption>事务</figcaption></figure><p>所谓的事务id -- zxid。ZooKeeper的在选举时通过比较各结点的zxid和机器ID选出新的主结点的。 zxid由Leader节点生成，有新写入事件时，Leader生成新zxid并随提案一起广播，每个结点本地都保存了 当前最近一次事务的zxid，zxid是递增的，所以谁的zxid越大，就表示谁的数据是最新的。</p><p>ZXID有两部分组成： 任期：完成本次选举后，直到下次选举前，由同一Leader负责协调写入； 事务计数器：单调递增，每生效一次写入，计数器加一。 --同一任期内，ZXID是连续的，每个结点又都保存着自身最新生效的ZXID，通过对比新提案的ZXID与 自身最新ZXID是否相差“1”，来保证事务严格按照顺序生效的。</p><h3 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构" aria-hidden="true">#</a> 数据结构</h3><p>ZooKeeper 数据模型的结构与 Unix 文件系统很类似，整体上可以看作是一棵树，每个 节点称做一个 ZNode。每一个 ZNode 默认能够存储 1MB 的数据，每个 ZNode 都可以通过 其路径唯一标识。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211223163619043.png" alt="image-20211223163619043" tabindex="0" loading="lazy"><figcaption>image-20211223163619043</figcaption></figure><p>Zookeeper使用这个基于内存的树状模型来存储分布式数据，正因为所有数据都存放在内存中，所以 才能实现高性能的目的，提高数据的吞吐率。特别是在集群主机节点间的数据同步。</p><p>Znode包含了 存储数据(data)、访问权限(acl)、子节点引用(child)、节点状态(stat)信息等信息</p><p>注意： 为了保证高吞吐和低延迟，以及数据的一致性，znode只适合存储非常小的数据，不能超过1M，最好都 小于1K</p><h3 id="节点类型解析" tabindex="-1"><a class="header-anchor" href="#节点类型解析" aria-hidden="true">#</a> 节点类型解析</h3><p>虽然ZNode的样式跟Linux文件系统类似，根据节点的生命周期，在Zookeeper中的ZNode有四种独有的特 性,有时候页称为四种类型：</p><p><strong>基本节点</strong>： Persistent(持久节点)：会话断开后，除非主动进行移除操作，否则该节点一直存在 Ephemeral(临时节点)：会话断开后，该节点被删除</p><p><strong>序列节点</strong>： <strong>Persistent Sequential</strong>:按顺序编号的持久节点该节点被创建的时候，Zookeeper 会自动在其子节点名上，加一个由父节点维护的、自增整数的后缀。</p><p><strong>Ephemeral Sequential</strong>：按顺序编号的临时节点该节点被创建的时候，Zookeeper 会自动在其子节点名上，加一个由父节点维护的、自增整数的后缀</p><p><strong>注意</strong>：<br> 只有持久性节点(持久节点和顺序持久节点)才有资格创建子节点</p><p><strong>自增后缀格式</strong>： <br> 10位10进制数的序号</p><p><strong>有序和无序区别</strong>： 多个客户端同时创建同一无序ZNode节点时，只有一个可创建成功，其它匀失败。并且创建出的节点名称 与创建时指定的节点名完全一样。<br></p><p>多个客户端同时创建同一有序ZNode节点时，都能创建成功，只是序号不同。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211224100447737.png" alt="zookeeper节点类型解析" tabindex="0" loading="lazy"><figcaption>zookeeper节点类型解析</figcaption></figure><h3 id="stat-数据结构" tabindex="-1"><a class="header-anchor" href="#stat-数据结构" aria-hidden="true">#</a> Stat 数据结构</h3><p>Zookeeper 的 ZNode 上都会存储数据，对应于每个 ZNode，Zookeeper 都会为其维护一个叫做 Stat 的数据结构。<br></p><p><strong>Stat 中记录了这个 ZNode 的三个数据版本</strong>：</p><ul><li>dataversion 当前 ZNode 数据内容的版本</li><li>cversion 当前 ZNode 子节点的版本</li><li>aversion 当前 ZNode 的 ACL 变更版本。</li></ul><p>这里的版本起到了控制 Zookeeper 操作原子性的作用，基于这些功能，才能更好实现了分布式锁的功能。</p><br><h3 id="节点实践" tabindex="-1"><a class="header-anchor" href="#节点实践" aria-hidden="true">#</a> 节点实践</h3><h4 id="节点创建" tabindex="-1"><a class="header-anchor" href="#节点创建" aria-hidden="true">#</a> <strong>节点创建</strong></h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>使用create命令可以来创建一个节点，命令格式如下：
create [-s] [-e] [-c] [-t ttl] path [data] [acl]
注意：
-s 表示创建的节点是顺序节点。
-e 表示创建的节点是临时节点，这个是create的默认参数。
acl 用于权限控制，Zookeeper的权限控制很强大，默认不使用。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="分别创建2个普通节点-永久节点-不带序号" tabindex="-1"><a class="header-anchor" href="#分别创建2个普通节点-永久节点-不带序号" aria-hidden="true">#</a> <strong>分别创建2个普通节点（永久节点 + 不带序号）</strong></h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[zk: localhost:2181(CONNECTED) 3] create /sanguo &quot;diaochan&quot;
Created /sanguo
[zk: localhost:2181(CONNECTED) 4] create /sanguo/shuguo
&quot;liubei&quot;
Created /sanguo/shuguo
注意：创建节点时，要赋值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="获得节点的值" tabindex="-1"><a class="header-anchor" href="#获得节点的值" aria-hidden="true">#</a> <strong>获得节点的值</strong></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">5</span><span class="token punctuation">]</span> get <span class="token parameter variable">-s</span> /sanguo
diaochan
cZxid <span class="token operator">=</span> 0x100000003
ctime <span class="token operator">=</span> Wed Aug <span class="token number">29</span> 00:03:23 CST <span class="token number">2018</span>
mZxid <span class="token operator">=</span> 0x100000003
mtime <span class="token operator">=</span> Wed Aug <span class="token number">29</span> 00:03:23 CST <span class="token number">2018</span>
pZxid <span class="token operator">=</span> 0x100000004
cversion <span class="token operator">=</span> <span class="token number">1</span>
dataVersion <span class="token operator">=</span> <span class="token number">0</span>
aclVersion <span class="token operator">=</span> <span class="token number">0</span>
ephemeralOwner <span class="token operator">=</span> 0x0
dataLength <span class="token operator">=</span> <span class="token number">7</span> 
numChildren <span class="token operator">=</span> <span class="token number">1</span> 
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">6</span><span class="token punctuation">]</span> get <span class="token parameter variable">-s</span> /sanguo/shuguo 
liubei 
cZxid <span class="token operator">=</span> 0x100000004 
ctime <span class="token operator">=</span> Wed Aug <span class="token number">29</span> 00:04:35 CST <span class="token number">2018</span> 
mZxid <span class="token operator">=</span> 0x100000004 
mtime <span class="token operator">=</span> Wed Aug <span class="token number">29</span> 00:04:35 CST <span class="token number">2018</span> 
pZxid <span class="token operator">=</span> 0x100000004 
cversion <span class="token operator">=</span> <span class="token number">0</span> 
dataVersion <span class="token operator">=</span> <span class="token number">0</span> 
aclVersion <span class="token operator">=</span> <span class="token number">0</span> 
ephemeralOwner <span class="token operator">=</span> 0x0 
dataLength <span class="token operator">=</span> <span class="token number">6</span> 
numChildren <span class="token operator">=</span> <span class="token number">0</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建带序号的节点-永久节点-带序号" tabindex="-1"><a class="header-anchor" href="#创建带序号的节点-永久节点-带序号" aria-hidden="true">#</a> <strong>创建带序号的节点（永久节点 + 带序号）</strong></h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>（1）先创建一个普通的根节点/sanguo/weiguo
[zk: localhost:2181(CONNECTED) 1] create/sanguo/weiguo &quot;caocao&quot; 
Created /sanguo/weiguo 

（2）创建带序号的节点 
[zk: localhost:2181(CONNECTED) 2] create -s /sanguo/weiguo/zhangliao &quot;zhangliao&quot; 
Created /sanguo/weiguo/zhangliao0000000000 
[zk: localhost:2181(CONNECTED) 3] create -s /sanguo/weiguo/zhangliao &quot;zhangliao&quot; 
Created /sanguo/weiguo/zhangliao0000000001 
[zk: localhost:2181(CONNECTED) 4] create -s /sanguo/weiguo/xuchu &quot;xuchu&quot; 
Created /sanguo/weiguo/xuchu0000000002 
如果原来没有序号节点，序号从0 开始依次递增。如果原节点下已有2 个节点，则再排序时从2 开始，以此类推。 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建短暂节点-短暂节点-不带序号-or-带序号" tabindex="-1"><a class="header-anchor" href="#创建短暂节点-短暂节点-不带序号-or-带序号" aria-hidden="true">#</a> <strong>创建短暂节点（短暂节点 + 不带序号 or 带序号）</strong></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>（1）创建短暂的不带序号的节点
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">7</span><span class="token punctuation">]</span> create <span class="token parameter variable">-e</span> /sanguo/wuguo <span class="token string">&quot;zhouyu&quot;</span> 
Created /sanguo/wuguo 

（2）创建短暂的带序号的节点
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">2</span><span class="token punctuation">]</span> create <span class="token parameter variable">-e</span> <span class="token parameter variable">-s</span> /sanguo/wuguo 
<span class="token string">&quot;zhouyu&quot;</span> 
Created /sanguo/wuguo0000000001 
（3）在当前客户端是能查看到的 
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">3</span><span class="token punctuation">]</span> <span class="token function">ls</span> /sanguo 
<span class="token punctuation">[</span>wuguo, wuguo0000000001, shuguo<span class="token punctuation">]</span> 
退出当前客户端然后再重启客户端
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">12</span><span class="token punctuation">]</span> quit 
<span class="token punctuation">[</span>atguigu@hadoop104 zookeeper-3.5.7<span class="token punctuation">]</span>$ bin/zkCli.sh 
（5）再次查看根目录下短暂节点已经删除 
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">0</span><span class="token punctuation">]</span> <span class="token function">ls</span> /sanguo 
<span class="token punctuation">[</span>shuguo<span class="token punctuation">]</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改节点数据值" tabindex="-1"><a class="header-anchor" href="#修改节点数据值" aria-hidden="true">#</a> <strong>修改节点数据值</strong></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">6</span><span class="token punctuation">]</span> <span class="token builtin class-name">set</span> /sanguo/weiguo <span class="token string">&quot;simayi&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看状态" tabindex="-1"><a class="header-anchor" href="#查看状态" aria-hidden="true">#</a> <strong>查看状态</strong></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>查看三者的状态信息
<span class="token punctuation">[</span>zk: <span class="token number">127.0</span>.0.1:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">19</span><span class="token punctuation">]</span> <span class="token function">stat</span> /sswang
<span class="token punctuation">..</span>.
ephemeralOwner <span class="token operator">=</span> 0x0
<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>zk: <span class="token number">127.0</span>.0.1:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">20</span><span class="token punctuation">]</span> <span class="token function">stat</span> /sswang2
<span class="token punctuation">..</span>.
ephemeralOwner <span class="token operator">=</span> 0x16454e2c6580007 <span class="token comment"># 这是临时节点的特点</span>
<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>zk: <span class="token number">127.0</span>.0.1:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">21</span><span class="token punctuation">]</span> <span class="token function">stat</span> /sswang10000000001
<span class="token punctuation">..</span>.
ephemeralOwner <span class="token operator">=</span> 0x0
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="节点删除与查看" tabindex="-1"><a class="header-anchor" href="#节点删除与查看" aria-hidden="true">#</a> 节点删除与查看</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1）	删除节点
[zk: localhost:2181(CONNECTED) 4] delete /sanguo/jin
2）	递归删除节点
[zk: localhost:2181(CONNECTED) 15] deleteall /sanguo/shuguo
3）	查看节点状态
[zk: localhost:2181(CONNECTED) 17] stat /sanguo
cZxid = 0x100000003
ctime = Wed Aug 29 00:03:23 CST 2018 
mZxid = 0x100000011 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="资源配额" tabindex="-1"><a class="header-anchor" href="#资源配额" aria-hidden="true">#</a> 资源配额</h4><h5 id="查看资源配额" tabindex="-1"><a class="header-anchor" href="#查看资源配额" aria-hidden="true">#</a> 查看资源配额</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>使用listquotat命令可以获取节点数据，命令格式如下：
listquota path
注意：
注意事项同ls
查看指定结点的资源
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">28</span><span class="token punctuation">]</span> create /sswang sswang
Created /sswang
<span class="token punctuation">[</span>zk: localhost:2181<span class="token punctuation">(</span>CONNECTED<span class="token punctuation">)</span> <span class="token number">29</span><span class="token punctuation">]</span> listquota /sswang
absolute path is /zookeeper/quota/sswang/zookeeper_limits
<span class="token function">quota</span> <span class="token keyword">for</span> /sswang does not exist.
可以看到：
默认新创建的结点资源，是没有资源配额的。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="设置资源配额" tabindex="-1"><a class="header-anchor" href="#设置资源配额" aria-hidden="true">#</a> 设置资源配额</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>使用listquotat命令可以获取节点资源配额数据，命令格式如下：
setquota -n|-b|-N|-B val path
注意：
-n 设置节点的节点个数
-b 设置节点的数据长度
如果超出了配置限制，不会停止行为操作，只是ZooKeeper将会在log日志中打印WARN日志。
其他注意事项同ls
设置节点的数量资源
[zk: localhost:2181(CONNECTED) 34] setquota -n 2 /sswang
Comment: the parts are option -n val 2 path /sswang
[zk: localhost:2181(CONNECTED) 35] listquota /sswang
absolute path is /zookeeper/quota/sswang/zookeeper_limits
Output quota for /sswang count=2,bytes=-1
Output stat for /sswang count=1,bytes=6

可以看到：
Output stat 后面的 count 表示的是总数量，bytes指定的是数据总长度，包括的子节点的数据长度
指定数量的话，数据长度默认没有限制


测试效果：
在/sswang节点下创建多个子节点
create /sswang/child1 1
create /sswang/child2 1
create /sswang/child3 1
create /sswang/child4 1
查看zookeeper-root-server-python-auto.out文件信息，会有WARN提示信息
2021-07-01 20:07:30,649 [myid:] - WARN [SyncThread:0:DataTree@301] - Quota
exceeded: /sswang count=3 limit=2
2021-07-01 20:08:06,715 [myid:] - WARN [SyncThread:0:DataTree@301] - Quota
exceeded: /sswang count=4 limit=2

设置节点的数据长度资源
[zk: localhost:2181(CONNECTED) 54] create /sswang1 sswang
Created /sswang1
[zk: localhost:2181(CONNECTED) 57] setquota -b 8 /sswang1
Comment: the parts are option -b val 8 path /sswang1
[zk: localhost:2181(CONNECTED) 58] listquota /sswang1
absolute path is /zookeeper/quota/sswang1/zookeeper_limits
Output quota for /sswang1 count=-1,bytes=8
Output stat for /sswang1 count=1,bytes=6


可以看到：
指定数据长度的话，节点数量默认没有限制
测试效果
修改/sswang1的数据长度
set /sswang1 777777779
set /sswang1 7777777790
查看zookeeper-root-server-python-auto.out文件信息，会有WARN提示信息
2021-07-01 20:15:00,763 [myid:] - WARN [SyncThread:0:DataTree@347] - Quota
exceeded: /sswang1 bytes=9 limit=8
2021-07-01 20:15:17,330 [myid:] - WARN [SyncThread:0:DataTree@347] - Quota
exceeded: /sswang1 bytes=10 limit=8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="删除资源配额" tabindex="-1"><a class="header-anchor" href="#删除资源配额" aria-hidden="true">#</a> 删除资源配额</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>使用delquota命令可以删除节点资源配额数据，命令格式如下：
delquota [-n|-b] path
注意：
-n 删除节点的节点个数
-b 删除节点的数据长度
其他注意事项同ls

删除资源配额
[zk: localhost:2181(CONNECTED) 11] delquota -n /sswang
[zk: localhost:2181(CONNECTED) 12] delquota -b /sswang1

检查效果
[zk: localhost:2181(CONNECTED) 14] listquota /sswang
[zk: localhost:2181(CONNECTED) 15] listquota /sswang1
补充：
资源限额可以给Znode节点设置，也可以局部给子节点设置。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h3><p>Zookeeper 提供的服务包括：统一命名服务、统一配置管理、统一集群管理、服务器节点动态上下 线、软负载均衡等</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211224094216540.png" alt="image-20211224094216540" tabindex="0" loading="lazy"><figcaption>image-20211224094216540</figcaption></figure><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211224094232521.png" alt="image-20211224094232521" tabindex="0" loading="lazy"><figcaption>image-20211224094232521</figcaption></figure><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211224094255259.png" alt="image-20211224094255259" tabindex="0" loading="lazy"><figcaption>image-20211224094255259</figcaption></figure><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211224094304321.png" alt="image-20211224094304321" tabindex="0" loading="lazy"><figcaption>image-20211224094304321</figcaption></figure><br><h3 id="watcher-事件监听器" tabindex="-1"><a class="header-anchor" href="#watcher-事件监听器" aria-hidden="true">#</a> Watcher 事件监听器</h3><p>Watcher(事件监听器)是 Zookeeper 提供的一种 发布/订阅的机制。</p><p>Zookeeper 允许客户端在指定的集群数据节点上注册一些 Watcher，当发生ZNode存储数据的修改， 子节点目录的变化等情况的时候，Zookeeper 服务端会将事件通知给监听的客户端，然后客户端根据 Watcher通知状态和事件类型做出业务上的改变。</p><p>客户端注册监听它关心的目录节点，当目录节点发生变化（数据改变、节点删除、子目 录节点增加删除）时，ZooKeeper 会通知客户端。监听机制保证 ZooKeeper 保存的任何的数 据的任何改变都能快速的响应到监听了该节点的应用程序。</p><p>该机制是 Zookeeper 实现分布式协调的重要特性，也是Zookeeper的核心特性,Zookeeper的很多 功能都是基于这个特性实现的。这个过程是异步的。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211224095316418.png" alt="Zookeeper监听" tabindex="0" loading="lazy"><figcaption>Zookeeper监听</figcaption></figure><p>Zookeeper的监听机制主要有三个关键点：整体触发、发送方式、局部触发。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211224095428631.png" alt="Zookeeper的监听机制" tabindex="0" loading="lazy"><figcaption>Zookeeper的监听机制</figcaption></figure><ul><li><p><strong>整体触发:</strong></p><p>当设置监视的数据发生改变时，该监视事件会被发送到客户端，常见的就是监控ZNode中的数据或子目录发生变化。</p></li><li><p><strong>发送方式：</strong></p><p>Zookeeper服务端被触发的时候，会基于会话给客户端发送信息，但是由于网络的原因，经常会出现网络延迟的因素，造成客户端接收的结构不一致，而Zookeeper有一个很重要的特点就是:一致性，为了达到这个目标，Zookeeper的监听机制在信息发送的方式上，就有了一个发送特点：所有的监视事件被触发后，不会立即发送至客户端，而是以异步的方式发送至监视者的，而且Zookeeper 本身提供了顺序保证。效果就是：客户端首先看到监视事件，然后才会感知到它所设置监视的znode发生了变化。这样就达到了，虽然不同的客户端在不同的时刻感知到了监视事件，但是客户端所看到的效果都是真实一致的。</p></li><li><p><strong>局部触发</strong></p><p>当客户端监视的Zookeeper节点ZNode内部有比较多的子目录数据的时候，这种场景下，我们只需要监视其中的一个小部分重要的数据，其他的数据是一些无关紧要的，所以就没有必要监视全部的ZNode数据变化，这意味着znode节点本身就应该具有不同的触发事件方式：即支持对ZNode数据事件的局部触发。</p></li></ul><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/zookeeper监听流程.jpg" alt="zookeeper监听流程" tabindex="0" loading="lazy"><figcaption>zookeeper监听流程</figcaption></figure><h3 id="监听器实践" tabindex="-1"><a class="header-anchor" href="#监听器实践" aria-hidden="true">#</a> 监听器实践</h3><p><strong>1.节点的值变化监听</strong></p><p>在hadoop104 主机上注册监听/sanguo 节点数据变化</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[zk: localhost:2181(CONNECTED) 26] get -w /sanguo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在hadoop103 主机上修改/sanguo 节点的数据</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[zk: localhost:2181(CONNECTED) 1] set /sanguo &quot;xisi&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>观察hadoop104 主机收到数据变化的监听</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>WATCHER::
WatchedEvent state:SyncConnected type:NodeDataChanged
path:/sanguo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：在hadoop103再多次修改/sanguo的值，hadoop104上不会再收到监听。因为注册 一次，只能监听一次。想再次监听，需要再次注册。</p><br><p><strong>2.节点的子节点变化监听（路径变化）</strong></p><p>在hadoop104 主机上注册监听/sanguo 节点的子节点变化</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[zk: localhost:2181(CONNECTED) 1] ls -w /sanguo 
[shuguo, weiguo]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在hadoop103 主机/sanguo 节点上创建子节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[zk: localhost:2181(CONNECTED) 2] create /sanguo/jin &quot;simayi&quot; 
Created /sanguo/jin 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>观察hadoop104 主机收到子节点变化的监听</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>WATCHER:: 
WatchedEvent state:SyncConnected type:NodeChildrenChanged 
path:/sanguo 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：节点的路径变化，也是注册一次，生效一次。想多次生效，就需要多次注册。</p><br><h4 id="日志实践" tabindex="-1"><a class="header-anchor" href="#日志实践" aria-hidden="true">#</a> 日志实践</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>zookeeper服务器会产生三类日志：事务日志、快照日志和系统日志。

我们可以在zookeeper的配置文件zoo.cfg中 通过
dataDir 设定数据快照日志的存储位置
dataLogDir 设定事务日志的存储位置，如果不设置该项，这默认保存在 dataDir目录下


注意：
事务日志和快照日志都会保存在 指定目录的 version-2 子目录下。
我们倾向于 dataLogDir 和 dataLog 单独配置，因为zookeeper集群频繁读写操作，
可能会产生大龄日志，有可能影响系统性能，可以根据日志的特性，使用不同的存储介质
zookeeper的系统运行日志是可以通过三个位置来进行设置


1 在log4j.properties文件中 通过
zookeeper.log.dir=. 来设置，这里的&#39;.&#39;指的是zkServer.sh坐在的目录

2 在 zkEnv.sh 文件中通过
ZOO_LOG_DIR=&quot;$ZOOKEEPER_PREFIX/logs&quot; 来设置

3 在 zkServer.sh 文件中 通过
ZOO_LOG_FILE=zookeeper-$USER-server-$HOSTNAME.log
_ZOO_DAEMON_OUT=&quot;$ZOO_LOG_DIR/zookeeper-$USER-server-$HOSTNAME.out&quot;
来指定
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="事务日志" tabindex="-1"><a class="header-anchor" href="#事务日志" aria-hidden="true">#</a> 事务日志</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>日志简介
事务日志是指 Zookeeper 系统在正常运行过程中，针对所有的更新操作，在返回客户端 更新成功 的
响应前，Zookeeper 会保证已经将本次更新操作的事务日志写到磁盘上，只有这样，整个更新操作才会生
效。

日志查看
zookeeper的事务日志为二进制文件，不能通过vim等工具直接访问,可以通过zookeeper自带的功能
文件读取事务日志文件。


       对于3.5.5 之前的zookeeper需要借助于大量的jar包来实现日志的查看，比如
       <span class="token function">java</span> <span class="token parameter variable">-cp</span> .:zookeeper-3.7.0.jar:slf4j-api-1.7.30.jar
org.apache.zookeeper.server.LogFormatter log.1



      zookeeper 从 <span class="token number">3.5</span>.5 版本之后，就取消的LogFormatter ，使用了一个更好的 TxnLogToolkit
工具,这个工具放置在了 bin/ 目录下，文件名是 zkTxnLogToolkit.sh
使用方式： zkTxnLogToolkit.sh log_file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="快照日志" tabindex="-1"><a class="header-anchor" href="#快照日志" aria-hidden="true">#</a> 快照日志</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>日志简介
     
     zookeeper的数据在内存中是以树形结构进行存储的，而快照就是每隔一段时间就会把整个DataTree
的数据序列化后存储在磁盘中。


日志查看
同样在 3.5.5 版本之后, 我们可以基于 zkSnapShotToolkit.sh 命令来进行快照日志的查看
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看日志实践" tabindex="-1"><a class="header-anchor" href="#查看日志实践" aria-hidden="true">#</a> 查看日志实践</h4><p>日志文件查看</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
# ls logs/version-2/ -lh
总用量 24K
-rw-r--r-- 1 root root 65M 8月 10 16:38 log.100000005
-rw-r--r-- 1 root root 65M 8月 10 16:06 log.800000001
-rw-r--r-- 1 root root 65M 8月 10 16:23 log.b00000001

结果显示：
每个日志文件大小是 65M，文件名规则 &#39;log.9个字符&#39;,这9个字符指的是事务id


日志内容查看
# ./bin/zkTxnLogToolkit.sh logs/version-2/log.b00000001
ZooKeeper Transactional Log File with dbid 0 txnlog format version 2
# 这是每个事务日志文件都有的日志头，输出了 dbid 还有 version等信息
2021-08-10 17:07:23,272 [myid:] - INFO [main:ZookeeperBanner@42] -
...
2021-08-10 17:07:23,289 [myid:] - INFO [main:ZooKeeperServer@260] -
zookeeper.intBufferStartingSizeBytes = 1024
21-8-10 下午04时23分21秒 session 0x100009bc0f50000 cxid 0x0 zxid 0xb00000001
closeSession v{}

# 这是xx时候，sessionid 请求类型为 closeSession，表示关闭了会话
EOF reached after 1 txns.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="快照日志查看" tabindex="-1"><a class="header-anchor" href="#快照日志查看" aria-hidden="true">#</a> 快照日志查看</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>日志文件查看
# ls data/version-2/ -lh
总用量 20K
-rw-r--r-- 1 root root 2 8月 10 16:45 acceptedEpoch
-rw-r--r-- 1 root root 2 8月 10 16:45 currentEpoch
-rw-r--r-- 1 root root 2.1K 8月 10 16:05 snapshot.600000000
-rw-r--r-- 1 root root 2.1K 8月 10 16:06 snapshot.700000000
-rw-r--r-- 1 root root 2.0K 8月 10 16:15 snapshot.800000001

结果显示：
快照日志的命名规则为&#39;snapshot.9个字符&#39;,
这9个字符表示zookeeper触发快照的那个瞬间，提交的最后一个事务的ID。
日志内容查看
#

./bin/zkSnapShotToolkit.sh data/version-2/snapshot.800000001
2021-08-10 17:08:25,876 [myid:] - INFO [main:SnapStream@61] -
zookeeper.snapshot.compression.method = CHECKED
...


----
/zookeeper/quota/sswang2/zookeeper_stats 路径
cZxid = 0x00000000000051 创建节点时的 Zxid
ctime = Tue Aug 10 14:44:11 CST 2021 创建节点的时间
mZxid = 0x00000000000051 节点最近一次更新对应的 Zxid
mtime = Tue Aug 10 14:44:11 CST 2021 节点最近一次更新的时间
pZxid = 0x00000000000051 父节点的 Zxid
cversion = 0 子节点更新次数
dataVersion = 0 数据更新次数
aclVersion = 0 节点 acl 更新次数
ephemeralOwner = 0x00000000000000 节点的 sessionid值
dataLength = 16 存储的数据长度
----


这里表达的是当前抓取快照日志文件的时间记录
Session Details (sid, timeout, ephemeralCount):
0x1000048d7820002, 30000, 0
0x100009bc0f50000, 30000, 0
----
Last zxid: 0x800000001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>系统日志查看</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>日志查看
# ls bin/zook*
bin/zookeeper_audit.log
# ls logs/zook*
logs/zookeeper_audit.log logs/zookeeper-root-server-python-auto.out
查看集群运行日志
# cat logs/zookeeper-root-server-python-auto.out
...
2021-08-10 16:45:54,068 [myid:1] - INFO [NIOWorkerThread-2:Learner@158] -
Revalidating client: 0x1000048d7820002
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基础配置" tabindex="-1"><a class="header-anchor" href="#基础配置" aria-hidden="true">#</a> 基础配置</h3><table><thead><tr><th>配置</th><th>解析</th></tr></thead><tbody><tr><td>tickTime（SS / CS）</td><td>用来指示 服务器之间或客户端与服务器之间维护心跳机制的 最小时间单元，Session 最小过期时间默认为两倍的 tickTime（default：2000ms）</td></tr><tr><td>initLimit（LF）</td><td>集群中的 Leader 节点和 Follower 节点之间初始连接时能容忍的最多心跳数（default：10 tickTime）</td></tr><tr><td>syncLimit（LF）</td><td>集群中的 Leader 节点和 Follower 节点之间请求和应答时能容忍的最多心跳数（default：5 tickTime）</td></tr><tr><td>dataDir</td><td>Zookeeper 保存服务器存储快照文件的目录，默认情况，Zookeeper将 写数据的日志文件也保存在这个目录里（default：/tmp/zookeeper）</td></tr><tr><td>clientPort</td><td>客户端连接 Zookeeper 服务器的端口，Zookeeper 会监听这个端口，接受客户端的访问请求（default：2181）</td></tr><tr><td>dataLogDir</td><td>用来存储服务器事务日志</td></tr><tr><td>minSessionTimeout<br>&amp;maxSessionTimeout</td><td>默认分别是 2 * tickTime ~ 20 * tickTime，来用控制 客户端设置的Session 超时时间。如果超出或者小于，将自动被服务端强制设置为最大或者最小</td></tr></tbody></table><h3 id="集群配置" tabindex="-1"><a class="header-anchor" href="#集群配置" aria-hidden="true">#</a> 集群配置</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>为了配置 Zookeeper 集群，会在配置文件末尾增加如下格式的服务器节点配置
格式：server.&lt;myid&gt;=&lt;server_ip&gt;:&lt;LF_Port&gt;:&lt;L_Port&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="格式解析" tabindex="-1"><a class="header-anchor" href="#格式解析" aria-hidden="true">#</a> 格式解析</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;myid&gt;
表示节点编号，是该节点在集群中唯一的编号，取值范围是1~255之间的整数，而且我们必须在
dataDir目录下创建一个myid的文件，将节点对应的&lt;myid&gt;值输入到该节点的myid文件。

&lt;server_ip&gt;
表示集群中的节点ip地址，可以使用主机名或ip来表示，生产中如果配置好内部dns的话，推荐使用主
机名，本机地址的表示方法是：127.0.0.1或者localhost

&lt;LF_Port&gt;
表示Leader节点和Follower节点进行心跳检测与数据同步所使用的端口。

&lt;L_Port&gt;
表示进行领导选举过程中，用于投票通信的端口。

注意：
这些端口可以随机自己定义。
真正的生产环境中，不同主机上的clientPort、LF_Port、L_Port三个端口一般可以配置成一样，因
为生产集群中每个server主机都分布在不同的主机上，都有独立的ip地址，不会造成端口冲突
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,132);function m(h,g){const a=t("ExternalLinkIcon");return d(),r("div",null,[c,n("p",null,[e("官方网站："),n("a",u,[e("https://zookeeper.apache.org/"),i(a)]),e(" 最新版本：3.7.0")]),v,n("p",null,[n("a",p,[e("zkCli.sh"),i(a)]),e(" 脚本还提供了远程连接非本地的Zookeeper服务器的参数 -server，使用这个参数就可以连接 到远程的Zookeeper服务主机")]),b])}const x=l(o,[["render",m],["__file","zookeeper-01.html.vue"]]);export{x as default};
