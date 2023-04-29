export const data = JSON.parse("{\"key\":\"v-8cd49140\",\"path\":\"/mysql/log/dba07.html\",\"title\":\"逻辑备份与恢复\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"逻辑备份与恢复\",\"date\":\"2020-07-20T02:13:01.000Z\",\"category\":[\"DBA\"],\"tag\":[\"DBA\",\"RDBMS\"],\"description\":\"逻辑备份与恢复 1. 上节回顾 1.1 日志 binlog 如何开启? binlog_format=row SBR 模式参数 RBR 与 SBR 模式之间的区别： 例如要更新大于2000的数据行 ，此时需要更新1000行数据，RBR记录每一行的变化，SBR则只记录这一条命令，但是SBR有可能会记录错误的日志，如在函数 now 当前时间的命令会有错误。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/mysql/log/dba07.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"逻辑备份与恢复\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"逻辑备份与恢复 1. 上节回顾 1.1 日志 binlog 如何开启? binlog_format=row SBR 模式参数 RBR 与 SBR 模式之间的区别： 例如要更新大于2000的数据行 ，此时需要更新1000行数据，RBR记录每一行的变化，SBR则只记录这一条命令，但是SBR有可能会记录错误的日志，如在函数 now 当前时间的命令会有错误。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"DBA\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"RDBMS\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2020-07-20T02:13:01.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"逻辑备份与恢复\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2020-07-20T02:13:01.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"1. 上节回顾\",\"slug\":\"_1-上节回顾\",\"link\":\"#_1-上节回顾\",\"children\":[{\"level\":3,\"title\":\"1.1  日志\",\"slug\":\"_1-1-日志\",\"link\":\"#_1-1-日志\",\"children\":[]},{\"level\":3,\"title\":\"1.2 二进制日志清理\",\"slug\":\"_1-2-二进制日志清理\",\"link\":\"#_1-2-二进制日志清理\",\"children\":[]},{\"level\":3,\"title\":\"1.2.1 自动清理\",\"slug\":\"_1-2-1-自动清理\",\"link\":\"#_1-2-1-自动清理\",\"children\":[]},{\"level\":3,\"title\":\"1.2.2 手动清理\",\"slug\":\"_1-2-2-手动清理\",\"link\":\"#_1-2-2-手动清理\",\"children\":[]},{\"level\":3,\"title\":\"1.3 日志如何滚动\",\"slug\":\"_1-3-日志如何滚动\",\"link\":\"#_1-3-日志如何滚动\",\"children\":[]},{\"level\":3,\"title\":\"1.4 slow log 慢语句分析\",\"slug\":\"_1-4-slow-log-慢语句分析\",\"link\":\"#_1-4-slow-log-慢语句分析\",\"children\":[]},{\"level\":3,\"title\":\"1.5 innodb 核心参数\",\"slug\":\"_1-5-innodb-核心参数\",\"link\":\"#_1-5-innodb-核心参数\",\"children\":[]}]},{\"level\":2,\"title\":\"2. 在备份恢复中的职责\",\"slug\":\"_2-在备份恢复中的职责\",\"link\":\"#_2-在备份恢复中的职责\",\"children\":[{\"level\":3,\"title\":\"2.1 备份策略的设计\",\"slug\":\"_2-1-备份策略的设计\",\"link\":\"#_2-1-备份策略的设计\",\"children\":[]},{\"level\":3,\"title\":\"2.2 检查备份可用性\",\"slug\":\"_2-2-检查备份可用性\",\"link\":\"#_2-2-检查备份可用性\",\"children\":[]},{\"level\":3,\"title\":\"2.3 数据恢复\",\"slug\":\"_2-3-数据恢复\",\"link\":\"#_2-3-数据恢复\",\"children\":[]},{\"level\":3,\"title\":\"2.4 数据迁移\",\"slug\":\"_2-4-数据迁移\",\"link\":\"#_2-4-数据迁移\",\"children\":[]},{\"level\":3,\"title\":\"2.5 备份情况介绍\",\"slug\":\"_2-5-备份情况介绍\",\"link\":\"#_2-5-备份情况介绍\",\"children\":[]}]},{\"level\":2,\"title\":\"3 . 逻辑备份操作\",\"slug\":\"_3-逻辑备份操作\",\"link\":\"#_3-逻辑备份操作\",\"children\":[{\"level\":3,\"title\":\"mysqldump 参数介绍\",\"slug\":\"mysqldump-参数介绍\",\"link\":\"#mysqldump-参数介绍\",\"children\":[]},{\"level\":3,\"title\":\"3.1  连接数据库参数\",\"slug\":\"_3-1-连接数据库参数\",\"link\":\"#_3-1-连接数据库参数\",\"children\":[]},{\"level\":3,\"title\":\"3.2 基础备份参数\",\"slug\":\"_3-2-基础备份参数\",\"link\":\"#_3-2-基础备份参数\",\"children\":[]},{\"level\":3,\"title\":\"3.3 特殊备份参数\",\"slug\":\"_3-3-特殊备份参数\",\"link\":\"#_3-3-特殊备份参数\",\"children\":[]},{\"level\":3,\"title\":\"3.4 恢复 binlog\",\"slug\":\"_3-4-恢复-binlog\",\"link\":\"#_3-4-恢复-binlog\",\"children\":[]}]},{\"level\":2,\"title\":\"4. 恢复案例\",\"slug\":\"_4-恢复案例\",\"link\":\"#_4-恢复案例\",\"children\":[{\"level\":3,\"title\":\"4.1 背景环境\",\"slug\":\"_4-1-背景环境\",\"link\":\"#_4-1-背景环境\",\"children\":[]},{\"level\":3,\"title\":\"4.2 备份策略\",\"slug\":\"_4-2-备份策略\",\"link\":\"#_4-2-备份策略\",\"children\":[]},{\"level\":3,\"title\":\"4.3 故障时间点\",\"slug\":\"_4-3-故障时间点\",\"link\":\"#_4-3-故障时间点\",\"children\":[]},{\"level\":3,\"title\":\"4.4  思路\",\"slug\":\"_4-4-思路\",\"link\":\"#_4-4-思路\",\"children\":[]},{\"level\":3,\"title\":\"4.5  故障模拟演练\",\"slug\":\"_4-5-故障模拟演练\",\"link\":\"#_4-5-故障模拟演练\",\"children\":[]},{\"level\":3,\"title\":\"4.6 恢复过程\",\"slug\":\"_4-6-恢复过程\",\"link\":\"#_4-6-恢复过程\",\"children\":[]}]},{\"level\":2,\"title\":\"5.恢复练习\",\"slug\":\"_5-恢复练习\",\"link\":\"#_5-恢复练习\",\"children\":[]},{\"level\":2,\"title\":\"6.扩展参数\",\"slug\":\"_6-扩展参数\",\"link\":\"#_6-扩展参数\",\"children\":[]}],\"readingTime\":{\"minutes\":8.76,\"words\":2627},\"filePathRelative\":\"mysql/log/dba07.md\",\"localizedDate\":\"2020年7月20日\",\"excerpt\":\"<h1> 逻辑备份与恢复</h1>\\n<h2> 1. 上节回顾</h2>\\n<br>\\n<h3> 1.1  日志</h3>\\n<p><strong>binlog</strong> 如何开启?</p>\\n<p><code>binlog_format=row</code>    SBR 模式参数</p>\\n<br>\\n<p><strong>RBR 与 SBR  模式之间的区别</strong>：</p>\\n<p>例如要更新大于2000的数据行 ，此时需要更新1000行数据，RBR记录每一行的变化，SBR则只记录这一条命令，但是SBR有可能会记录错误的日志，如在函数 now 当前时间的命令会有错误。</p>\\n <br>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
