export const data = JSON.parse("{\"key\":\"v-1468127c\",\"path\":\"/mysql/log/dba07-1.html\",\"title\":\"物理备份与恢复 XBK\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"物理备份与恢复 XBK\",\"tag\":[\"DBA\",\"RDBMS\"],\"category\":[\"DBA\"],\"date\":\"2020-07-19T02:13:01.000Z\",\"description\":\"物理备份与恢复 XBK 1.上节回顾 1.1 mysqldump核心参数 -A 全备 -B 单表备份 库 表 备份 --master-data=2 (1) 以注释的形式记录二进制日志信息 (2) 自动开启锁表的功能 记录二进制日志在备份时的起点号 （就是到23.59分截止的binlog日志position号 ）由于备份时不开启二进制日志所以记录的是备份开始时的起点号用作恢复起点\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/mysql/log/dba07-1.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"物理备份与恢复 XBK\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"物理备份与恢复 XBK 1.上节回顾 1.1 mysqldump核心参数 -A 全备 -B 单表备份 库 表 备份 --master-data=2 (1) 以注释的形式记录二进制日志信息 (2) 自动开启锁表的功能 记录二进制日志在备份时的起点号 （就是到23.59分截止的binlog日志position号 ）由于备份时不开启二进制日志所以记录的是备份开始时的起点号用作恢复起点\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-04-29T00:24:48.000Z\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"DBA\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"RDBMS\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2020-07-19T02:13:01.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-04-29T00:24:48.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"物理备份与恢复 XBK\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2020-07-19T02:13:01.000Z\\\",\\\"dateModified\\\":\\\"2023-04-29T00:24:48.000Z\\\",\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"1.上节回顾\",\"slug\":\"_1-上节回顾\",\"link\":\"#_1-上节回顾\",\"children\":[{\"level\":3,\"title\":\"1.1 mysqldump核心参数\",\"slug\":\"_1-1-mysqldump核心参数\",\"link\":\"#_1-1-mysqldump核心参数\",\"children\":[]}]},{\"level\":2,\"title\":\"2. Xtrabackup\",\"slug\":\"_2-xtrabackup\",\"link\":\"#_2-xtrabackup\",\"children\":[{\"level\":3,\"title\":\"2.1 备份的过程\",\"slug\":\"_2-1-备份的过程\",\"link\":\"#_2-1-备份的过程\",\"children\":[]},{\"level\":3,\"title\":\"2.2 恢复过程\",\"slug\":\"_2-2-恢复过程\",\"link\":\"#_2-2-恢复过程\",\"children\":[]},{\"level\":3,\"title\":\"2.3. XBK全备和恢复体验\",\"slug\":\"_2-3-xbk全备和恢复体验\",\"link\":\"#_2-3-xbk全备和恢复体验\",\"children\":[]},{\"level\":3,\"title\":\"2.4 innobackupex 命令使用\",\"slug\":\"_2-4-innobackupex-命令使用\",\"link\":\"#_2-4-innobackupex-命令使用\",\"children\":[]},{\"level\":3,\"title\":\"2.5 全备的恢复\",\"slug\":\"_2-5-全备的恢复\",\"link\":\"#_2-5-全备的恢复\",\"children\":[]}]},{\"level\":2,\"title\":\"3. 增量备份 Incremental\",\"slug\":\"_3-增量备份-incremental\",\"link\":\"#_3-增量备份-incremental\",\"children\":[{\"level\":3,\"title\":\"3.1 备份产生的文件介绍\",\"slug\":\"_3-1-备份产生的文件介绍\",\"link\":\"#_3-1-备份产生的文件介绍\",\"children\":[]},{\"level\":3,\"title\":\"3.2  物理备份过程\",\"slug\":\"_3-2-物理备份过程\",\"link\":\"#_3-2-物理备份过程\",\"children\":[]},{\"level\":3,\"title\":\"3.3 模拟数据库崩溃安全演练\",\"slug\":\"_3-3-模拟数据库崩溃安全演练\",\"link\":\"#_3-3-模拟数据库崩溃安全演练\",\"children\":[]}]},{\"level\":2,\"title\":\"4. 旧版数据迁移到新版\",\"slug\":\"_4-旧版数据迁移到新版\",\"link\":\"#_4-旧版数据迁移到新版\",\"children\":[{\"level\":3,\"title\":\"4.1 搭建5.6的测试环境\",\"slug\":\"_4-1-搭建5-6的测试环境\",\"link\":\"#_4-1-搭建5-6的测试环境\",\"children\":[]},{\"level\":3,\"title\":\"4.2 迁移5.6 数据到 5.7\",\"slug\":\"_4-2-迁移5-6-数据到-5-7\",\"link\":\"#_4-2-迁移5-6-数据到-5-7\",\"children\":[]}]}],\"readingTime\":{\"minutes\":8.29,\"words\":2488},\"filePathRelative\":\"mysql/log/dba07-1.md\",\"localizedDate\":\"2020年7月19日\",\"excerpt\":\"<h1> 物理备份与恢复 XBK</h1>\\n<h2> 1.上节回顾</h2>\\n<br>\\n<h3> 1.1 mysqldump核心参数</h3>\\n<ul>\\n<li>-A  全备</li>\\n<li>-B  单表备份</li>\\n<li>库 表  备份</li>\\n</ul>\\n<p><code>--master-data=2</code></p>\\n<p>(1) 以注释的形式记录二进制日志信息</p>\\n<p>(2) 自动开启锁表的功能</p>\\n<p>记录二进制日志在备份时的起点号 （就是到23.59分截止的binlog日志position号 ）由于备份时不开启二进制日志所以记录的是备份开始时的起点号用作恢复起点</p>\",\"autoDesc\":true,\"git\":{\"createdTime\":1682727888000,\"updatedTime\":1682727888000,\"contributors\":[{\"name\":\"ryanxin7\",\"email\":\"xinxincn0506@outlook.com\",\"commits\":1}]}}")

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
