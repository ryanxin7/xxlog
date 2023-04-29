export const data = JSON.parse("{\"key\":\"v-3bdd3570\",\"path\":\"/mysql/dba08-1.html\",\"title\":\"主从复制高级进阶\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"主从复制高级进阶\",\"date\":\"2020-07-22T02:13:01.000Z\",\"category\":[\"DBA\"],\"tag\":[\"DBA\",\"RDBMS\",\"主从复制\"],\"description\":\"主从复制高级进阶 1.上节回顾 1.1 binlog_format SBR update t1 set name='zs' where id&gt;50; 更新50条数据 记录1条命令 RBR 记录50行日志 MBR 由系统自动选择 1.2 主从故障 IO线程故障 连主库 取日志 存到 relaylog\"},\"headers\":[{\"level\":2,\"title\":\"1.上节回顾\",\"slug\":\"_1-上节回顾\",\"link\":\"#_1-上节回顾\",\"children\":[{\"level\":3,\"title\":\"1.1   binlog_format\",\"slug\":\"_1-1-binlog-format\",\"link\":\"#_1-1-binlog-format\",\"children\":[]},{\"level\":3,\"title\":\"1.2  主从故障\",\"slug\":\"_1-2-主从故障\",\"link\":\"#_1-2-主从故障\",\"children\":[]},{\"level\":3,\"title\":\"1.3  主从延时\",\"slug\":\"_1-3-主从延时\",\"link\":\"#_1-3-主从延时\",\"children\":[]},{\"level\":3,\"title\":\"1.4 主从延时的监控\",\"slug\":\"_1-4-主从延时的监控\",\"link\":\"#_1-4-主从延时的监控\",\"children\":[]}]},{\"level\":2,\"title\":\"2. 主从复制高级进阶\",\"slug\":\"_2-主从复制高级进阶\",\"link\":\"#_2-主从复制高级进阶\",\"children\":[{\"level\":3,\"title\":\"2.1 延时从库\",\"slug\":\"_2-1-延时从库\",\"link\":\"#_2-1-延时从库\",\"children\":[]},{\"level\":3,\"title\":\"2.2  延时从库处理逻辑故障\",\"slug\":\"_2-2-延时从库处理逻辑故障\",\"link\":\"#_2-2-延时从库处理逻辑故障\",\"children\":[]},{\"level\":3,\"title\":\"2.3 过滤复制\",\"slug\":\"_2-3-过滤复制\",\"link\":\"#_2-3-过滤复制\",\"children\":[]},{\"level\":3,\"title\":\"2.4  GTID 复制\",\"slug\":\"_2-4-gtid-复制\",\"link\":\"#_2-4-gtid-复制\",\"children\":[]},{\"level\":3,\"title\":\"2.5 GTID复制配置过程\",\"slug\":\"_2-5-gtid复制配置过程\",\"link\":\"#_2-5-gtid复制配置过程\",\"children\":[]},{\"level\":3,\"title\":\"2.6 GTID 复制和普通复制的区别\",\"slug\":\"_2-6-gtid-复制和普通复制的区别\",\"link\":\"#_2-6-gtid-复制和普通复制的区别\",\"children\":[]}]},{\"level\":2,\"title\":\"3.半同步\",\"slug\":\"_3-半同步\",\"link\":\"#_3-半同步\",\"children\":[]}],\"readingTime\":{\"minutes\":6.64,\"words\":1992},\"filePathRelative\":\"mysql/dba08-1.md\",\"localizedDate\":\"2020年7月22日\",\"excerpt\":\"<h1> 主从复制高级进阶</h1>\\n<h2> 1.上节回顾</h2>\\n<h3> 1.1   binlog_format</h3>\\n<ul>\\n<li>\\n<p>SBR   update t1 set name='zs' where id&gt;50; 更新50条数据 记录1条命令</p>\\n</li>\\n<li>\\n<p>RBR  记录50行日志</p>\\n</li>\\n<li>\\n<p>MBR  由系统自动选择</p>\\n</li>\\n</ul>\\n<br>\\n<br>\\n<h3> 1.2  主从故障</h3>\\n<br>\\n<p><strong>IO线程故障</strong></p>\\n<ul>\\n<li>连主库\\n取日志\\n存到 relaylog</li>\\n</ul>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
