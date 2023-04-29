<template><div><h1 id="网卡文件配置文件详解" tabindex="-1"><a class="header-anchor" href="#网卡文件配置文件详解" aria-hidden="true">#</a> 网卡文件配置文件详解</h1>
<h5 id="文件路径" tabindex="-1"><a class="header-anchor" href="#文件路径" aria-hidden="true">#</a> 文件路径：</h5>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>//etc/sysconfig/network-scripts/ifcfg-eth0  为网卡文件路径 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br>
<table>
<thead>
<tr>
<th>配置参数</th>
<th>参数详解</th>
</tr>
</thead>
<tbody>
<tr>
<td>DEVICE=eth0</td>
<td>网卡名字</td>
</tr>
<tr>
<td><strong>HWADDR=00:0c:29:bc:1f:24</strong></td>
<td>Hardware address 硬件地址</td>
</tr>
<tr>
<td><strong>TYPE=Ethernet</strong></td>
<td>网络类型 因特网</td>
</tr>
<tr>
<td>UUID=1c340c4c-e0ec-4672-81e7-a5f4110dd1f9</td>
<td>UUID系统中唯一的标识</td>
</tr>
<tr>
<td>ONBOOT=yes</td>
<td>boot on 在重启时候是否开启网卡 自动运行</td>
</tr>
<tr>
<td>NM_CONTROLLED=yes</td>
<td>是否通过network软件进行管理</td>
</tr>
<tr>
<td>BOOTPROTO=none</td>
<td>网卡获取IP地址的方式 static ip地址固 dhcp 自动获取</td>
</tr>
<tr>
<td>IPADDR=10.0.0.200</td>
<td>IP地址</td>
</tr>
<tr>
<td>NETMASK=255.255.255.0</td>
<td>子网掩码</td>
</tr>
<tr>
<td>GATEWAY=10.0.0.2</td>
<td>网关 默认的出口</td>
</tr>
<tr>
<td>USERCTL=no</td>
<td>是否允许普通用户管理网卡  开 关 重启</td>
</tr>
<tr>
<td>PEERDNS=yes</td>
<td>DNS 优先性</td>
</tr>
<tr>
<td>IPV6INIT=no</td>
<td>IPv6</td>
</tr>
<tr>
<td>DNS1=223.5.5.5</td>
<td>DNS地址</td>
</tr>
<tr>
<td>DNS2=223.6.6.6</td>
<td>DNS地址</td>
</tr>
</tbody>
</table>
</div></template>


