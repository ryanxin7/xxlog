export const data = JSON.parse("{\"key\":\"v-4058401a\",\"path\":\"/mysql/dba09.html\",\"title\":\"MHA 高可用部署\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MHA 高可用部署\",\"date\":\"2020-07-22T02:13:01.000Z\",\"category\":[\"DBA\"],\"tag\":[\"DBA\",\"RDBMS\",\"MHA\"],\"description\":\"MHA 高可用部署 1.搭建MHA (1) 配置关键程序软连接 ln -s /data/mysql/bin/mysqlbinlog /usr/bin/mysqlbinlog ln -s /data/mysql/bin/mysql /usr/bin/mysql\"},\"headers\":[{\"level\":2,\"title\":\"1.搭建MHA\",\"slug\":\"_1-搭建mha\",\"link\":\"#_1-搭建mha\",\"children\":[]},{\"level\":2,\"title\":\"2. MHA 架构软件结构说明\",\"slug\":\"_2-mha-架构软件结构说明\",\"link\":\"#_2-mha-架构软件结构说明\",\"children\":[]},{\"level\":2,\"title\":\"3. MHA软件的构成(perl语言)\",\"slug\":\"_3-mha软件的构成-perl语言\",\"link\":\"#_3-mha软件的构成-perl语言\",\"children\":[]},{\"level\":2,\"title\":\"4.MHA 配置过程细节说明\",\"slug\":\"_4-mha-配置过程细节说明\",\"link\":\"#_4-mha-配置过程细节说明\",\"children\":[{\"level\":3,\"title\":\"4.1  软连接\",\"slug\":\"_4-1-软连接\",\"link\":\"#_4-1-软连接\",\"children\":[]},{\"level\":3,\"title\":\"4.2 互信 多节点直接不需要用密码 ：\",\"slug\":\"_4-2-互信-多节点直接不需要用密码\",\"link\":\"#_4-2-互信-多节点直接不需要用密码\",\"children\":[]},{\"level\":3,\"title\":\"4.3 安装软件包(所有节点)\",\"slug\":\"_4-3-安装软件包-所有节点\",\"link\":\"#_4-3-安装软件包-所有节点\",\"children\":[]},{\"level\":3,\"title\":\"4.4 在db01主库中创建mha需要的用户\",\"slug\":\"_4-4-在db01主库中创建mha需要的用户\",\"link\":\"#_4-4-在db01主库中创建mha需要的用户\",\"children\":[]},{\"level\":3,\"title\":\"4.5  Manager软件安装（db03）\",\"slug\":\"_4-5-manager软件安装-db03\",\"link\":\"#_4-5-manager软件安装-db03\",\"children\":[]},{\"level\":3,\"title\":\"4.6 配置文件准备(db03)\",\"slug\":\"_4-6-配置文件准备-db03\",\"link\":\"#_4-6-配置文件准备-db03\",\"children\":[]}]},{\"level\":2,\"title\":\"4.MHA FailOver 过程详解\",\"slug\":\"_4-mha-failover-过程详解\",\"link\":\"#_4-mha-failover-过程详解\",\"children\":[{\"level\":3,\"title\":\"4.1 什么是Failover?\",\"slug\":\"_4-1-什么是failover\",\"link\":\"#_4-1-什么是failover\",\"children\":[]},{\"level\":3,\"title\":\"4.2 MHA的Failover如何实现?\",\"slug\":\"_4-2-mha的failover如何实现\",\"link\":\"#_4-2-mha的failover如何实现\",\"children\":[]}]},{\"level\":2,\"title\":\"5.应用透明\",\"slug\":\"_5-应用透明\",\"link\":\"#_5-应用透明\",\"children\":[]},{\"level\":2,\"title\":\"6.MHA 故障邮件提醒\",\"slug\":\"_6-mha-故障邮件提醒\",\"link\":\"#_6-mha-故障邮件提醒\",\"children\":[]},{\"level\":2,\"title\":\"7.额外的数据补偿服务器\",\"slug\":\"_7-额外的数据补偿服务器\",\"link\":\"#_7-额外的数据补偿服务器\",\"children\":[]},{\"level\":2,\"title\":\"8.故障模拟及故障处理\",\"slug\":\"_8-故障模拟及故障处理\",\"link\":\"#_8-故障模拟及故障处理\",\"children\":[{\"level\":3,\"title\":\"8.1 宕掉 db01 数据库\",\"slug\":\"_8-1-宕掉-db01-数据库\",\"link\":\"#_8-1-宕掉-db01-数据库\",\"children\":[]},{\"level\":3,\"title\":\"8.2 恢复故障\",\"slug\":\"_8-2-恢复故障\",\"link\":\"#_8-2-恢复故障\",\"children\":[]}]}],\"readingTime\":{\"minutes\":9.3,\"words\":2789},\"filePathRelative\":\"mysql/dba09.md\",\"localizedDate\":\"2020年7月22日\",\"excerpt\":\"<h1> MHA 高可用部署</h1>\\n<h2> 1.搭建MHA</h2>\\n<br>\\n<p>(1) <strong>配置关键程序软连接</strong></p>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-ext=\\\"sh\\\"><pre class=\\\"language-bash\\\"><code><span class=\\\"token function\\\">ln</span> <span class=\\\"token parameter variable\\\">-s</span> /data/mysql/bin/mysqlbinlog    /usr/bin/mysqlbinlog\\n<span class=\\\"token function\\\">ln</span> <span class=\\\"token parameter variable\\\">-s</span> /data/mysql/bin/mysql          /usr/bin/mysql\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}