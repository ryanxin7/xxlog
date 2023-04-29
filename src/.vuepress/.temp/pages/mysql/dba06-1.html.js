export const data = JSON.parse("{\"key\":\"v-6c1adbb2\",\"path\":\"/mysql/dba06-1.html\",\"title\":\"GTID 记录模式管理\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"GTID 记录模式管理\",\"date\":\"2020-07-16T02:13:01.000Z\",\"category\":[\"DBA\"],\"tag\":[\"DBA\",\"RDBMS\"],\"description\":\"GTID 记录模式管理 1. GTID 介绍 对于binlog中的每一个事务,都会生成一个GTID号码 DDL ,DCL 一个event就是一个事务,就会有一个GTID号. DML语句来讲,begin到commit,是一个事务,就是一个GTID号 2. GTID 组成 由两部分组成 severi_uuid:TID 事务的号码 severi_uuid 在 auto.cnf 中查看\"},\"headers\":[{\"level\":2,\"title\":\"1. GTID 介绍\",\"slug\":\"_1-gtid-介绍\",\"link\":\"#_1-gtid-介绍\",\"children\":[]},{\"level\":2,\"title\":\"2. GTID 组成\",\"slug\":\"_2-gtid-组成\",\"link\":\"#_2-gtid-组成\",\"children\":[]},{\"level\":2,\"title\":\"3. GTID 幂等性\",\"slug\":\"_3-gtid-幂等性\",\"link\":\"#_3-gtid-幂等性\",\"children\":[]},{\"level\":2,\"title\":\"4. GTID 开启和配置\",\"slug\":\"_4-gtid-开启和配置\",\"link\":\"#_4-gtid-开启和配置\",\"children\":[{\"level\":3,\"title\":\"4.1 查看GTID信息\",\"slug\":\"_4-1-查看gtid信息\",\"link\":\"#_4-1-查看gtid信息\",\"children\":[]},{\"level\":3,\"title\":\"4.2 基于GTID 恢复数据\",\"slug\":\"_4-2-基于gtid-恢复数据\",\"link\":\"#_4-2-基于gtid-恢复数据\",\"children\":[]}]}],\"readingTime\":{\"minutes\":2.55,\"words\":764},\"filePathRelative\":\"mysql/dba06-1.md\",\"localizedDate\":\"2020年7月16日\",\"excerpt\":\"<h1> GTID 记录模式管理</h1>\\n<h2> 1. GTID 介绍</h2>\\n<ul>\\n<li>\\n<p>对于binlog中的每一个事务,都会生成一个GTID号码</p>\\n</li>\\n<li>\\n<p>DDL ,DCL 一个event就是一个事务,就会有一个GTID号.</p>\\n</li>\\n<li>\\n<p>DML语句来讲,begin到commit,是一个事务,就是一个GTID号</p>\\n</li>\\n</ul>\\n<br>\\n<h2> 2. GTID 组成</h2>\\n<p>由两部分组成\\n<strong>severi_uuid:TID</strong> 事务的号码</p>\\n<p><strong>severi_uuid</strong> 在 <code>auto.cnf</code> 中查看</p>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
