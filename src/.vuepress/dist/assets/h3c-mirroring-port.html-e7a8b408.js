import{_ as i,V as n,W as e,Z as a}from"./framework-91fce522.js";const r={},s=a(`<h1 id="核心交换机数据引流" tabindex="-1"><a class="header-anchor" href="#核心交换机数据引流" aria-hidden="true">#</a> 核心交换机数据引流</h1><h3 id="镜像源" tabindex="-1"><a class="header-anchor" href="#镜像源" aria-hidden="true">#</a> 镜像源</h3><p>镜像源是指被监控的对象，该对象可以是端口或单板上的 CPU，我们将之依次称为源端口和源 CPU。 经由被监控的对象收发的报文会被复制一份到与数据监测设备相连的端口，用户就可以对这些报文 （称为镜像报文）进行监控和分析了。镜像源所在的设备就称为源设备。</p><br><h3 id="镜像目的" tabindex="-1"><a class="header-anchor" href="#镜像目的" aria-hidden="true">#</a> 镜像目的</h3><p>镜像目的是指镜像报文所要到达的目的地，即与数据监测设备相连的那个端口，我们称之为目的端口，目的端口所在的设备就称为目的设备。目的端口会将镜像报文转发给与之相连的数据监测设备。 由于一个目的端口可以同时监控多个镜像源，因此在某些组网环境下，目的端口可能收到对同一报 文的多份拷贝。例如，目的端口 Port 1 同时监控同一台设备上的源端口 Port 2 和 Port 3 收发的报文， 如果某报文从 Port 2 进入该设备后又从 Port 3 发送出去，那么该报文将被复制两次给 Port 1。</p><br><h3 id="镜像方向" tabindex="-1"><a class="header-anchor" href="#镜像方向" aria-hidden="true">#</a> 镜像方向</h3><p>镜像方向是指在镜像源上可复制哪些方向的报文：</p><ul><li>入方向：是指仅复制镜像源收到的报文。</li><li>出方向：是指仅复制镜像源发出的报文。</li><li>双向：是指对镜像源收到和发出的报文都进行复制。</li></ul><br><h3 id="镜像组" tabindex="-1"><a class="header-anchor" href="#镜像组" aria-hidden="true">#</a> 镜像组</h3><p>镜像组是一个逻辑上的概念，镜像源和镜像目的都要属于某一个镜像组。根据具体的实现方式不同， 镜像组可分为本地镜像组、远程源镜像组和远程目的镜像组三类。</p><br><h3 id="反射端口、出端口和远程镜像vlan" tabindex="-1"><a class="header-anchor" href="#反射端口、出端口和远程镜像vlan" aria-hidden="true">#</a> 反射端口、出端口和远程镜像VLAN</h3><p>反射端口、出端口和远程镜像VLAN都是在二层远程端口镜像的实现过程中用到的概念。远程镜像 VLAN是将镜像报文从源设备传送至目的设备的专用VLAN；反射端口和出端口都位于源设备上，都 用来将镜像报文发送到远程镜像VLAN中。</p><br><h3 id="端口镜像的分类和实现方式" tabindex="-1"><a class="header-anchor" href="#端口镜像的分类和实现方式" aria-hidden="true">#</a> 端口镜像的分类和实现方式</h3><p>根据镜像源与镜像目的是否位于同一台设备上，可以将端口镜像分为本地端口镜像和远程端口镜像 两大类。</p><ol><li><p>本地端口镜像 当源设备与数据监测设备直接相连时，源设备可以同时作为目的设备，即由本设备将镜像报文转发 至数据检测设备，这种方式实现的端口镜像称为本地端口镜像。对于本地端口镜像，镜像源和镜像 目的属于同一台设备上的同一个镜像组，该镜像组称为本地镜像组。</p></li><li><p>远程端口镜像 当源设备与数据监测设备不直接相连时，与数据监测设备直接相连的设备作为目的设备，源设备需 要将镜像报文复制一份至目的设备，然后由目的设备将镜像报文转发至数据监测设备，这种方式实 现的端口镜像称为远程端口镜像。对于远程端口镜像，镜像源和镜像目的分属于不同设备上的不同 镜像组：镜像源所在的镜像组称为远程源镜像组，镜像目的所在的镜像组称为远程目的镜像组，而 位于源设备与目的设备之间的设备则统称为中间设备。</p></li></ol><p>根据源设备与目的设备之间的连接关系，又可将远程端口镜像细分为：</p><p>• 二层远程端口镜像：源设备与目的设备之间通过二层网络进行连接。</p><p>• 三层远程端口镜像：源设备与目的设备之间通过三层网络进行连接。</p><br><h3 id="二层远程端口镜像" tabindex="-1"><a class="header-anchor" href="#二层远程端口镜像" aria-hidden="true">#</a> 二层远程端口镜像</h3><p>二层远程端口镜像的实现方式包括：反射端口方式和出端口方式。</p><p>• <strong>反射端口方式</strong>：</p><p>源设备将进入源端口（或源 CPU）的报文复制一份给反射端口，再由该端口 将镜像报文在远程镜像 VLAN 中广播，最终镜像报文经由中间设备转发至目的设备。目的设 1-3 备收到该报文后判别其 VLAN ID，若与远程镜像 VLAN 的 VLAN ID 相同，就将镜像报文通过 目的端口转发给数据监测设备。过程如下图所示。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211229142927190.png" alt="反射端口方式" tabindex="0" loading="lazy"><figcaption>反射端口方式</figcaption></figure><ul><li><p><strong>出端口方式</strong>：</p><p>源设备将进入源端口（或源 CPU）的报文复制一份给出端口，该端口将镜像报 文转发给中间设备，再由中间设备在远程镜像 VLAN 中广播，最终到达目的设备。目的设备 收到该报文后判别其 VLAN ID，若与远程镜像 VLAN 的 VLAN ID 相同，就将镜像报文通过目 的端口转发给数据监测设备。过程如下图所示。</p></li></ul><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211229143016134.png" alt="出端口方式" tabindex="0" loading="lazy"><figcaption>出端口方式</figcaption></figure><h3 id="配置实战" tabindex="-1"><a class="header-anchor" href="#配置实战" aria-hidden="true">#</a> 配置实战</h3><p>现有两套态势感知设备需要接入内部网络，需要将办公网、内外网业务流量进行收集汇总后将流量复制一份到与态势感知设备。</p><p><strong>对接设备</strong>：</p><ul><li><p>H3C框式 核心交换机</p></li><li><p>奇安信 天眼新一代威胁感知系统</p></li><li><p>深信服 安全感知平台SIP</p></li></ul><br><h4 id="核心交换机配置" tabindex="-1"><a class="header-anchor" href="#核心交换机配置" aria-hidden="true">#</a> 核心交换机配置</h4><p><strong>本地端口镜像方式</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mirroring-group <span class="token number">1</span> <span class="token builtin class-name">local</span>
mirroring-group <span class="token number">1</span> mirroring-port g1/1/0/1 to g1/1/0/8 both
mirroring-group <span class="token number">1</span> monitor-port g1/1/0/10

//引g1/1/0/1到8口的流量到 g1/1/0/10
dis mirroring-group all
Mirroring group <span class="token number">1</span>:
    Type: <span class="token builtin class-name">local</span>
    Status: Active
    Mirroring port:
        GigabitEthernet1/1/0/1  Both
        GigabitEthernet1/1/0/2  Both
        GigabitEthernet1/1/0/3  Both
        GigabitEthernet1/1/0/4  Both
        GigabitEthernet1/1/0/5  Both
        GigabitEthernet1/1/0/6  Both
        GigabitEthernet1/1/0/7  Both
        GigabitEthernet1/1/0/8  Both
    Monitor-port: GigabitEthernet1/1/0/10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p><strong>远程端口镜像方式</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mirroring-group <span class="token number">2</span> remote-source
mirroring-group <span class="token number">2</span> mirroring-port g2/2/0/1 to g2/2/0/8 both
mirroring-group <span class="token number">2</span> reflector-port g2/2/0/10  //反射端口
vlan <span class="token number">130</span>   //镜像数据广播VLAN
port g2/2/0/11 to g2/2/0/12  //审计设备互联接口
mirroring-group <span class="token number">2</span> remote-probe vlan <span class="token number">130</span>

dis mirroring-group all
Mirroring group <span class="token number">1</span>:
    Type: Remote <span class="token builtin class-name">source</span>
    Status: Active
    Mirroring port:
        GigabitEthernet2/2/0/1  Both
        GigabitEthernet2/2/0/2  Both
        GigabitEthernet2/2/0/3  Both
        GigabitEthernet2/2/0/4  Both
        GigabitEthernet2/2/0/5  Both
        GigabitEthernet2/2/0/6  Both
        GigabitEthernet2/2/0/7  Both
        GigabitEthernet2/2/0/8  Both
    Reflector port: GigabitEthernet1/4/0/10
    Remote probe VLAN: <span class="token number">130</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="设备接口调整" tabindex="-1"><a class="header-anchor" href="#设备接口调整" aria-hidden="true">#</a> 设备接口调整</h4><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211229152453185.png" alt="安全感知平台SIP" tabindex="0" loading="lazy"><figcaption>安全感知平台SIP</figcaption></figure><br><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211229152552258.png" alt="天眼新一代威胁感知系统" tabindex="0" loading="lazy"><figcaption>天眼新一代威胁感知系统</figcaption></figure><h3 id="效果验证" tabindex="-1"><a class="header-anchor" href="#效果验证" aria-hidden="true">#</a> 效果验证</h3><p>数据成功引入</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211229153923313.png" alt="镜像流量" tabindex="0" loading="lazy"><figcaption>镜像流量</figcaption></figure>`,50),t=[s];function l(d,o){return n(),e("div",null,t)}const p=i(r,[["render",l],["__file","h3c-mirroring-port.html.vue"]]);export{p as default};
