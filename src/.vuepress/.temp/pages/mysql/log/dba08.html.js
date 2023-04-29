export const data = JSON.parse("{\"key\":\"v-896ae002\",\"path\":\"/mysql/log/dba08.html\",\"title\":\"高可用架构方案\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"高可用架构方案\",\"date\":\"2020-07-21T02:13:01.000Z\",\"category\":[\"DBA\"],\"tag\":[\"DBA - RDBMS - 高可用\"],\"description\":\"MySQL Replication #高可用架构方案 负载均衡：有一个定的高可用性 ​ LVS Nginx 主备系统：有高可用性，但是需要别换，是单活的构架 ​ KA ， MHA ,MMM 真正的高可用（多活系统） ​ NDB Cluster Oracle RAC Sysbase cluster ，InnoDB Cluster （MGR） ，PXC , MGC\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/mysql/log/dba08.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"高可用架构方案\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"MySQL Replication #高可用架构方案 负载均衡：有一个定的高可用性 ​ LVS Nginx 主备系统：有高可用性，但是需要别换，是单活的构架 ​ KA ， MHA ,MMM 真正的高可用（多活系统） ​ NDB Cluster Oracle RAC Sysbase cluster ，InnoDB Cluster （MGR） ，PXC , MGC\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"DBA - RDBMS - 高可用\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2020-07-21T02:13:01.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"高可用架构方案\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2020-07-21T02:13:01.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"1. 职责介绍\",\"slug\":\"_1-职责介绍\",\"link\":\"#_1-职责介绍\",\"children\":[]},{\"level\":2,\"title\":\"2. 主从复制介绍\",\"slug\":\"_2-主从复制介绍\",\"link\":\"#_2-主从复制介绍\",\"children\":[]},{\"level\":2,\"title\":\"3. 主从复制的前提 (搭建主从复制)\",\"slug\":\"_3-主从复制的前提-搭建主从复制\",\"link\":\"#_3-主从复制的前提-搭建主从复制\",\"children\":[]},{\"level\":2,\"title\":\"4.主从复制搭建过程(生产)\",\"slug\":\"_4-主从复制搭建过程-生产\",\"link\":\"#_4-主从复制搭建过程-生产\",\"children\":[{\"level\":3,\"title\":\"4.1 准备多实例\",\"slug\":\"_4-1-准备多实例\",\"link\":\"#_4-1-准备多实例\",\"children\":[]},{\"level\":3,\"title\":\"4.2 检查配置文件\",\"slug\":\"_4-2-检查配置文件\",\"link\":\"#_4-2-检查配置文件\",\"children\":[]},{\"level\":3,\"title\":\"4.3 主库创建复制用户\",\"slug\":\"_4-3-主库创建复制用户\",\"link\":\"#_4-3-主库创建复制用户\",\"children\":[]},{\"level\":3,\"title\":\"4.4 补课\",\"slug\":\"_4-4-补课\",\"link\":\"#_4-4-补课\",\"children\":[]},{\"level\":3,\"title\":\"4.5 告诉从库信息\",\"slug\":\"_4-5-告诉从库信息\",\"link\":\"#_4-5-告诉从库信息\",\"children\":[]},{\"level\":3,\"title\":\"4.6 从库开启复制线程(IO,SQL)\",\"slug\":\"_4-6-从库开启复制线程-io-sql\",\"link\":\"#_4-6-从库开启复制线程-io-sql\",\"children\":[]},{\"level\":3,\"title\":\"4.7 检查主从复制状态\",\"slug\":\"_4-7-检查主从复制状态\",\"link\":\"#_4-7-检查主从复制状态\",\"children\":[]}]},{\"level\":2,\"title\":\"5.主从复制原理\",\"slug\":\"_5-主从复制原理\",\"link\":\"#_5-主从复制原理\",\"children\":[{\"level\":3,\"title\":\"5.1 主从复制中涉及的文件\",\"slug\":\"_5-1-主从复制中涉及的文件\",\"link\":\"#_5-1-主从复制中涉及的文件\",\"children\":[]},{\"level\":3,\"title\":\"5.2 主从复制中涉及的线程\",\"slug\":\"_5-2-主从复制中涉及的线程\",\"link\":\"#_5-2-主从复制中涉及的线程\",\"children\":[]},{\"level\":3,\"title\":\"5.3 主从复制工作(过程)原理\",\"slug\":\"_5-3-主从复制工作-过程-原理\",\"link\":\"#_5-3-主从复制工作-过程-原理\",\"children\":[]},{\"level\":3,\"title\":\"5.4 主从复制监控\",\"slug\":\"_5-4-主从复制监控\",\"link\":\"#_5-4-主从复制监控\",\"children\":[]},{\"level\":3,\"title\":\"5.5 主从复制故障\",\"slug\":\"_5-5-主从复制故障\",\"link\":\"#_5-5-主从复制故障\",\"children\":[]}]},{\"level\":2,\"title\":\"6. 主从延时监控及原因\",\"slug\":\"_6-主从延时监控及原因\",\"link\":\"#_6-主从延时监控及原因\",\"children\":[{\"level\":3,\"title\":\"6.1 主库方面原因\",\"slug\":\"_6-1-主库方面原因\",\"link\":\"#_6-1-主库方面原因\",\"children\":[]},{\"level\":3,\"title\":\"6.2 从库方面原因\",\"slug\":\"_6-2-从库方面原因\",\"link\":\"#_6-2-从库方面原因\",\"children\":[]}]},{\"level\":2,\"title\":\"7. 主从延时的监控\",\"slug\":\"_7-主从延时的监控\",\"link\":\"#_7-主从延时的监控\",\"children\":[]}],\"readingTime\":{\"minutes\":8.44,\"words\":2533},\"filePathRelative\":\"mysql/log/dba08.md\",\"localizedDate\":\"2020年7月21日\",\"excerpt\":\"<h1> MySQL Replication</h1>\\n<p>#高可用架构方案</p>\\n<ul>\\n<li>负载均衡：有一个定的高可用性</li>\\n</ul>\\n<p>​       LVS  Nginx</p>\\n<ul>\\n<li>主备系统：有高可用性，但是需要别换，是单活的构架</li>\\n</ul>\\n<p>​       KA ， MHA ,MMM</p>\\n<ul>\\n<li>真正的高可用（多活系统）</li>\\n</ul>\\n<p>​       NDB Cluster Oracle RAC Sysbase cluster ，InnoDB Cluster （MGR） ，PXC , MGC</p>\\n<br>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
