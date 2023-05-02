<template><div><h1 id="服务器动态上下线监听案例" tabindex="-1"><a class="header-anchor" href="#服务器动态上下线监听案例" aria-hidden="true">#</a> 服务器动态上下线监听案例</h1>
<p>某分布式系统中，主节点可以有多台，可以动态上下线，任意一台客户端都能实时感知 到主节点服务器的上下线。</p>
<br>
<h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> <strong>代码实现</strong></h2>
<h3 id="服务端代码" tabindex="-1"><a class="header-anchor" href="#服务端代码" aria-hidden="true">#</a> 服务端代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>atguigu<span class="token punctuation">.</span>zkcase1</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>zookeeper<span class="token punctuation">.</span></span><span class="token class-name">CreateMode</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>zookeeper<span class="token punctuation">.</span></span><span class="token class-name">WatchedEvent</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>zookeeper<span class="token punctuation">.</span></span><span class="token class-name">Watcher</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>zookeeper<span class="token punctuation">.</span></span><span class="token class-name">ZooKeeper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>zookeeper<span class="token punctuation">.</span></span><span class="token class-name">ZooDefs</span><span class="token punctuation">.</span><span class="token class-name">Ids</span></span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DistributeServer</span> <span class="token punctuation">{</span>
 <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> connectString <span class="token operator">=</span> 
<span class="token string">"hadoop102:2181,hadoop103:2181,hadoop104:2181"</span><span class="token punctuation">;</span>
 <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> sessionTimeout <span class="token operator">=</span> <span class="token number">2000</span><span class="token punctuation">;</span>
 <span class="token keyword">private</span> <span class="token class-name">ZooKeeper</span> zk <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
 <span class="token keyword">private</span> <span class="token class-name">String</span> parentNode <span class="token operator">=</span> <span class="token string">"/servers"</span><span class="token punctuation">;</span>

<span class="token comment">// 创建到 zk 的客户端连接</span>
 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getConnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">{</span>

    zk <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZooKeeper</span><span class="token punctuation">(</span>connectString<span class="token punctuation">,</span> sessionTimeout<span class="token punctuation">,</span> <span class="token keyword">new</span> 
<span class="token class-name">Watcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">WatchedEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token comment">// 注册服务器</span>
 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">registServer</span><span class="token punctuation">(</span><span class="token class-name">String</span> hostname<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">{</span>
 
    <span class="token class-name">String</span> create <span class="token operator">=</span> zk<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>parentNode <span class="token operator">+</span> <span class="token string">"/server"</span><span class="token punctuation">,</span> 
hostname<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Ids</span><span class="token punctuation">.</span><span class="token constant">OPEN_ACL_UNSAFE</span><span class="token punctuation">,</span> 
<span class="token class-name">CreateMode</span><span class="token punctuation">.</span><span class="token constant">EPHEMERAL_SEQUENTIAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>hostname <span class="token operator">+</span><span class="token string">" is online "</span><span class="token operator">+</span> create<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 业务功能</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">business</span><span class="token punctuation">(</span><span class="token class-name">String</span> hostname<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">{</span>
   <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>hostname <span class="token operator">+</span> <span class="token string">" is working ..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   
   <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

 <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>

<span class="token comment">// 1 获取 zk 连接</span>
    <span class="token class-name">DistributeServer</span> server <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DistributeServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    server<span class="token punctuation">.</span><span class="token function">getConnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 2 利用 zk 连接注册服务器信息</span>
    server<span class="token punctuation">.</span><span class="token function">registServer</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 3 启动业务功能</span>
    server<span class="token punctuation">.</span><span class="token function">business</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="客户端代码" tabindex="-1"><a class="header-anchor" href="#客户端代码" aria-hidden="true">#</a> 客户端代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>atguigu<span class="token punctuation">.</span>zkcase1</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>zookeeper<span class="token punctuation">.</span></span><span class="token class-name">WatchedEvent</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>zookeeper<span class="token punctuation">.</span></span><span class="token class-name">Watcher</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>zookeeper<span class="token punctuation">.</span></span><span class="token class-name">ZooKeeper</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DistributeClient</span> <span class="token punctuation">{</span>
 
 <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> connectString <span class="token operator">=</span> 
<span class="token string">"hadoop102:2181,hadoop103:2181,hadoop104:2181"</span><span class="token punctuation">;</span>
 <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> sessionTimeout <span class="token operator">=</span> <span class="token number">2000</span><span class="token punctuation">;</span>
 <span class="token keyword">private</span> <span class="token class-name">ZooKeeper</span> zk <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
 <span class="token keyword">private</span> <span class="token class-name">String</span> parentNode <span class="token operator">=</span> <span class="token string">"/servers"</span><span class="token punctuation">;</span>

<span class="token comment">// 创建到 zk 的客户端连接</span>
 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getConnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
 
    zk <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ZooKeeper</span><span class="token punctuation">(</span>connectString<span class="token punctuation">,</span> sessionTimeout<span class="token punctuation">,</span> <span class="token keyword">new</span> 
<span class="token class-name">Watcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
       <span class="token annotation punctuation">@Override</span>
       <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">WatchedEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>

          <span class="token comment">// 再次启动监听</span>
          <span class="token keyword">try</span> <span class="token punctuation">{</span>
             <span class="token function">getServerList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
             e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 
<span class="token comment">// 获取服务器列表信息</span>
 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getServerList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
   <span class="token comment">// 1 获取服务器子节点信息，并且对父节点进行监听</span>
   <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> children <span class="token operator">=</span> zk<span class="token punctuation">.</span><span class="token function">getChildren</span><span class="token punctuation">(</span>parentNode<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">// 2 存储服务器信息列表</span>
   <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> servers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">// 3 遍历所有节点，获取节点中的主机名称信息</span>
   <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> child <span class="token operator">:</span> children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> data <span class="token operator">=</span> zk<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span>parentNode <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> child<span class="token punctuation">,</span> 
<span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        servers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
 
 <span class="token comment">// 4 打印服务器列表信息</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>servers<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 业务功能</span>
 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">business</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">{</span>
 
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"client is working ..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

 <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>

  <span class="token comment">// 1 获取 zk 连接</span>
  <span class="token class-name">DistributeClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DistributeClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  client<span class="token punctuation">.</span><span class="token function">getConnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 2 获取 servers 的子节点信息，从中获取服务器信息列表</span>
  client<span class="token punctuation">.</span><span class="token function">getServerList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token comment">//3 业务进程启动</span>
   client<span class="token punctuation">.</span><span class="token function">business</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


