import{_ as e,V as a,W as r,Z as p}from"./framework-91fce522.js";const d={},t=p('<h1 id="企业面试真题-面试重点" tabindex="-1"><a class="header-anchor" href="#企业面试真题-面试重点" aria-hidden="true">#</a> 企业面试真题（面试重点）</h1><h2 id="选举机制" tabindex="-1"><a class="header-anchor" href="#选举机制" aria-hidden="true">#</a> 选举机制</h2><p>半数机制，超过半数的投票通过，即通过。</p><p>（1）第一次启动选举规则： 投票过半数时，服务器 id 大的胜出<br></p><p>（2）第二次启动选举规则：<br></p><p>①EPOCH 大的直接胜出 <br></p><p>②EPOCH 相同，事务 id 大的胜出<br></p><p>③事务 id 相同，服务器 id 大的胜出<br></p><br><h2 id="生产集群安装多少-zk-合适" tabindex="-1"><a class="header-anchor" href="#生产集群安装多少-zk-合适" aria-hidden="true">#</a> 生产集群安装多少 zk 合适？</h2><p>安装奇数台。</p><p>生产经验：</p><p>⚫ 10 台服务器：3 台 zk；</p><p>⚫ 20 台服务器：5 台 zk；</p><p>⚫ 100 台服务器：11 台 zk；</p><p>⚫ 200 台服务器：11 台 zk</p><p>服务器台数多：好处，提高可靠性；坏处：提高通信延时</p><br><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><p>ls、get、create、delete</p>',20),h=[t];function i(c,n){return a(),r("div",null,h)}const s=e(d,[["render",i],["__file","zookeeper-05.html.vue"]]);export{s as default};