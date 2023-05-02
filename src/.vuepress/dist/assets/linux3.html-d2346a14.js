import{_ as n,V as e,W as i,Z as s}from"./framework-91fce522.js";const a={},l=s(`<h1 id="keepalived-高可用服务部署" tabindex="-1"><a class="header-anchor" href="#keepalived-高可用服务部署" aria-hidden="true">#</a> Keepalived 高可用服务部署</h1><p>​ Keepalived 软件最早是配合 LVS 负载均衡软件而设计的，用来管理并监控LVS集群系统中各个服务节点的状态，后来又加入了VRRP 协议可以实现高可用的功能。</p><p>软件主要是通过 VRRP 协议实现高可用功能的,VRRP 是Virtual Router Redundancy Protocol（虚拟路由器冗余协议）的缩写，VRRP出现的目的就是为了解决静态路由单点故障问题的，它能够保证当个别节点宕机时，整个网络可以不间断地运行</p><h2 id="一、keepalived-软件工作原理" tabindex="-1"><a class="header-anchor" href="#一、keepalived-软件工作原理" aria-hidden="true">#</a> 一、Keepalived 软件工作原理</h2><p>​</p><p>启初 VRRP 的出现是为了解决静态路由的单点故障。VRRP 是用过IP多播的方式实现高可用对之间通信的。工作时主服务器节点发包，备服务器节点接包，当备服务器节点接收不到主服务器节点发的数据包的时候，就启动接管程序接管主服务器节点的资源。备服务器节点可以有多个，通过优先级竞选。优先级数值越大优先级越大。</p><h2 id="二、keepalived-高可用服务部署" tabindex="-1"><a class="header-anchor" href="#二、keepalived-高可用服务部署" aria-hidden="true">#</a> 二、Keepalived 高可用服务部署</h2><h3 id="_1-确认反向代理服务是否工作正常" tabindex="-1"><a class="header-anchor" href="#_1-确认反向代理服务是否工作正常" aria-hidden="true">#</a> 1.确认反向代理服务是否工作正常</h3><p>在kl1和kl02服务器上测试web服务器是否可以正常（最好有3台反向代理功能的Web服务器）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  <span class="token function">curl</span> <span class="token parameter variable">-H</span> host:www.rxinxin.org <span class="token number">192.168</span>.10.10/webserver.html
  <span class="token function">curl</span> <span class="token parameter variable">-H</span> host:www.rxinxin.org <span class="token number">192.168</span>.10.11/webserver.html
  <span class="token function">curl</span> <span class="token parameter variable">-H</span> host:www.rxinxin.org <span class="token number">192.168</span>.10.11/webserver.html
  systemctl <span class="token builtin class-name">enable</span> mariadb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-在浏览器上测试访问kl1和kl2-域名" tabindex="-1"><a class="header-anchor" href="#_2-在浏览器上测试访问kl1和kl2-域名" aria-hidden="true">#</a> 2.在浏览器上测试访问kl1和kl2 域名</h3><p>解析hosts文件，将域名解析为192.168.10.20，进行测试访问</p><p>解析hosts文件，将域名解析为192.168.10.30，进行测试访问</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>测试前同步kl1和kl2的 Nginx 配置文件
<span class="token function">scp</span> <span class="token parameter variable">-rp</span> /app/nginx/conf/nginx.conf <span class="token number">192.168</span>.10.30:/app/nginx/conf/  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、安装-keepalived-服务软件" tabindex="-1"><a class="header-anchor" href="#三、安装-keepalived-服务软件" aria-hidden="true">#</a> 三、安装 Keepalived 服务软件</h2><p>第一步：安装软件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> keepalived
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第二步：编写keepalived配置文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vim /etc/keepalived/keepalived.conf
man keepalived.conf   //查看文件说明信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件结构：</p><div class="language-bashba line-numbers-mode" data-ext="bashba"><pre class="language-bashba"><code>GLOBAL CONFIGURATION  --- 全局配置
VRRPD CONFIGURATION   --- vrrp配置
LVS CONFIGURATION     --- LVS服务相关配置 （可以删掉不用） 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>kl1主 负载均衡器配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>global_defs <span class="token punctuation">{</span>    //全局配置
router_id kl1   //定义路由标识信息，相同局域网唯一
       <span class="token punctuation">}</span>
       
vrrp_instance klg1 <span class="token punctuation">{</span>  //Vrrp 配置
state MASTER    //定义实例中主备状态的角色（MASTER/BACKUP）
interface eth0  //设置主备服务器虚拟IP地址放置网卡位置
virtual_router_id <span class="token number">31</span> //虚拟路由ID标识，不同实例不同，主备相同
priority <span class="token number">150</span>   //设置抢占优先级，数值越大越优先
advert_int <span class="token number">1</span>  //主备间通讯时间间隔
authentication <span class="token punctuation">{</span>  //主备间通过认证建立连接
auth_type PASS
auth_pass <span class="token number">1111</span>
<span class="token punctuation">}</span>
virtual_ipaddress <span class="token punctuation">{</span>   定义主备服务器之间使用的虚拟IP地址信息
<span class="token number">192.168</span>.10.60/24 dev eth0 label eth0:1
           <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

/etc/init.d/keepalived reload  //平滑重启 Keeplived 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>kl2备 负载均衡器配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>global_defs <span class="token punctuation">{</span>
router_id kl2
       <span class="token punctuation">}</span>
vrrp_instance klg1 <span class="token punctuation">{</span>
state BACKUP
interface eth0
virtual_router_id <span class="token number">31</span>
priority <span class="token number">100</span>
advert_int <span class="token number">1</span>
authentication <span class="token punctuation">{</span>
auth_type PASS
auth_pass <span class="token number">1111</span>
<span class="token punctuation">}</span>
virtual_ipaddress <span class="token punctuation">{</span>
<span class="token number">192.168</span>.10.60/24 dev eth0 label eth0:1
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
/etc/init.d/keepalived reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、部署高可用服务时遇到的问题" tabindex="-1"><a class="header-anchor" href="#四、部署高可用服务时遇到的问题" aria-hidden="true">#</a> 四、部署高可用服务时遇到的问题</h2><p>同时在keepalived高可用集群中，出现了两个虚拟IP地址信息，这种情况就称为脑裂</p><p>脑裂情况出现原因：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  1. 心跳线出现问题
     网卡配置有问题
     交换设备有问题
     线缆连接有问题
  2. 有防火墙软件阻止问题
  3. virtual_router_id
     配置数值不正确  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总之：只要备服务器收不到主服务器发出的组播包，就会成为主服务器，而主服务器资源没有释放，备服务器要篡位就会出现脑裂。</p><h2 id="五、利用shell脚本实现监控管理" tabindex="-1"><a class="header-anchor" href="#五、利用shell脚本实现监控管理" aria-hidden="true">#</a> 五、利用shell脚本实现监控管理</h2><pre><code>备设备有 VIP 就是表示不正常
</code></pre><ol><li>真正实现主备切换 2. 出现脑裂情况了</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash
check_info=$(ip a|grep -c 192.168.10.60) //定义一个参数为VIP地址 .60
if [ $check_info -ne 0 ]  //如果等于 0 
then
echo &quot;keepalived server error!!!&quot; //打印告警提示 keepalived 服务出现错误
fi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、nginx反向代理监听虚拟ip地址" tabindex="-1"><a class="header-anchor" href="#六、nginx反向代理监听虚拟ip地址" aria-hidden="true">#</a> 六、Nginx反向代理监听虚拟IP地址</h2><ol><li>编写nginx反向代理配置</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
listen      192.168.10.60:80;
server_name  www.rxinxin.org;
root   html;
index  index.html index.htm;
location / {
proxy_pass http://xinxin;
proxy_set_header host $host;
proxy_set_header X-Forwarded-For $remote_addr;
      }
}
server {
listen       192.168.10.60:80;
server_name  bbs.rxinxin.org;
root   html;
index  index.html index.htm;
location / {
proxy_pass http://xinxin;
proxy_set_header host $host;
proxy_set_header X-Forwarded-For $remote_addr;
     }
  }
/application/nginx/sbin/nginx -s stop //Nginx 更改ip 一定要重启
/application/nginx/sbin/nginx
netstat -lntup|grep nginx //查看端口
tcp        0      0 192.168.10.60:80                 0.0.0.0:*                   LISTEN      53334/nginx  虚拟IP地址
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p>实现监听本地网卡上没有的IP地址</p><p><code>echo &#39;net.ipv4.ip_nonlocal_bind = 1&#39; &gt;&gt;/etc/sysctl.conf 更改内核</code></p><p><code>sysctl -p</code></p><h2 id="七、将高可用和反向代理服务建立联系" tabindex="-1"><a class="header-anchor" href="#七、将高可用和反向代理服务建立联系" aria-hidden="true">#</a> 七、将高可用和反向代理服务建立联系</h2><p>因为Nginx 反向代理服务处于异常状态下，keepalived服务并没有从主服务器切换到备服务器，所以客户访问网站时反向代理服务一直处于挂了的异常状态导致网站无法正常访问。</p><p>实现的目的：Nginx反向代理服务停止，Keepalived服务也停止</p><ol><li>编写脚本</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash
web_info=$(ps -ef|grep [n]ginx|wc -l) //当Nginx进程小于2时
if [ $web_info -lt 2 ]
then
/etc/init.d/keepalived stop   //关闭keepalived 服务
fi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.运行脚本，实现监控nginx服务</p><p>编辑keepalived服务配置文件</p><div class="language-vrrp_script line-numbers-mode" data-ext="vrrp_script"><pre class="language-vrrp_script"><code>#定义一个监控脚本，脚本必须有执行权限
script &quot;/server/scripts/check_web.sh&quot;    
#指定脚本间隔时间
interval 2   
#脚本执行完成，让优先级值和权重值进行运算，从而实现主备切换		
weight 2                                                                            
}
track_script {
check_web
}	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>chmod +x check_kls.sh 给予脚本可执行权限</p><h2 id="八、实现高可用集群架构中双主配置" tabindex="-1"><a class="header-anchor" href="#八、实现高可用集群架构中双主配置" aria-hidden="true">#</a> 八、实现高可用集群架构中双主配置</h2><p><strong>互为主备配置配置</strong></p><p>由于企业实际环境，很少等主服务器挂掉才调用备服务器，所以会将Web服务分配给两节点或多个集群并行使用节约成本。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kl1
vrrp_instance klg1 {
 state MASTER
 interface eth0
 virtual_router_id 31
 priority 150
 advert_int 1
 authentication {
 auth_type PASS
 auth_pass 1111
    }
virtual_ipaddress {
 192.168.10.60/24 dev eth0 label eth0:1
    }
    }
vrrp_instance klg2 {
  state BACKUP
  interface eth0
  virtual_router_id 32
  priority 100
  advert_int 1
  authentication {
  auth_type PASS
  auth_pass 1111
    }
virtual_ipaddress {
  192.168.10.80/24 dev eth0 label eth0:1
    }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  kl2
vrrp_instance klg1 <span class="token punctuation">{</span>
  state BACKUP
  interface eth0
  virtual_router_id <span class="token number">31</span>
  priority <span class="token number">100</span>
  advert_int <span class="token number">1</span>
  authentication <span class="token punctuation">{</span>
  auth_type PASS
  auth_pass <span class="token number">1111</span>
    <span class="token punctuation">}</span>
  virtual_ipaddress <span class="token punctuation">{</span>
  <span class="token number">192.168</span>.10.60/24 dev eth0 label eth0:1
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  vrrp_instance klg2 <span class="token punctuation">{</span>
    state MASTER
    interface eth0
    virtual_router_id <span class="token number">32</span>
    priority <span class="token number">150</span>
    advert_int <span class="token number">1</span>
    authentication <span class="token punctuation">{</span>
    auth_type PASS
    auth_pass <span class="token number">1111</span>
    <span class="token punctuation">}</span>
    virtual_ipaddress <span class="token punctuation">{</span>
    <span class="token number">192.168</span>.10.80/24 dev eth0 label eth0:1
    <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>	 
	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后修改 Nginx 反向代理服务配置文件的监听IP地址信息 完成对 Keepalived 互为主备节点的配置部署。</p>`,56),d=[l];function r(v,t){return e(),i("div",null,d)}const u=n(a,[["render",r],["__file","linux3.html.vue"]]);export{u as default};
