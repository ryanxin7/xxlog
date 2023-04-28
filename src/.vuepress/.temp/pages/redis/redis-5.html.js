export const data = JSON.parse("{\"key\":\"v-235d3dba\",\"path\":\"/redis/redis-5.html\",\"title\":\"Redis 持久复制\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis 持久复制\",\"date\":\"2020-08-04T21:12:31.000Z\",\"category\":[\"数据库\"],\"tag\":[\"Redis\",\"DBA\"],\"description\":\"Redis 持久复制 Redis虽然是一个内存级别的缓存程序，但是其可以将内存的数据按照一定的策略保存到硬盘上，从而实现数据持久保存的目的。 目前，redis支持两种不同方式的数据持久化保存机制： RDB 基于时间，生成某个时间点的快照文件，默认只保留最近的一次快照。 恢复速度非常快，但是可能丢失之前的快照数据，非实时同步。 AOF AppendOnlyFile(日志追加模式),基于Redis协议格式保存信息到指定日志文件的末尾 基于写时复制的机制，每隔x秒将新执行的命令同步到对应的文件中 默认是禁用的，需要开启数据保存全，时间过长导致文件过大，恢复时候速度比RDB慢。\"},\"headers\":[{\"level\":3,\"title\":\"RDB原理\",\"slug\":\"rdb原理\",\"link\":\"#rdb原理\",\"children\":[]},{\"level\":3,\"title\":\"AOF 原理\",\"slug\":\"aof-原理\",\"link\":\"#aof-原理\",\"children\":[]},{\"level\":2,\"title\":\"简单实践\",\"slug\":\"简单实践\",\"link\":\"#简单实践\",\"children\":[]}],\"readingTime\":{\"minutes\":4.3,\"words\":1290},\"filePathRelative\":\"redis/redis-5.md\",\"localizedDate\":\"2020年8月5日\",\"excerpt\":\"<h1> Redis 持久复制</h1>\\n<p>Redis虽然是一个内存级别的缓存程序，但是其可以将内存的数据按照一定的策略保存到硬盘上，从而实现数据持久保存的目的。</p>\\n<p>目前，redis支持两种不同方式的数据持久化保存机制：</p>\\n<p><strong>RDB</strong></p>\\n<ul>\\n<li>\\n<p>基于时间，生成某个时间点的快照文件，默认只保留最近的一次快照。</p>\\n</li>\\n<li>\\n<p>恢复速度非常快，但是可能丢失之前的快照数据，非实时同步。</p>\\n</li>\\n</ul>\\n<p><strong>AOF</strong></p>\\n<ul>\\n<li>AppendOnlyFile(日志追加模式),基于Redis协议格式保存信息到指定日志文件的末尾</li>\\n<li>基于写时复制的机制，每隔x秒将新执行的命令同步到对应的文件中</li>\\n<li>默认是禁用的，需要开启数据保存全，时间过长导致文件过大，恢复时候速度比RDB慢。</li>\\n</ul>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
