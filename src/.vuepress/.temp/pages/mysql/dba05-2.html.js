export const data = JSON.parse("{\"key\":\"v-05ee8772\",\"path\":\"/mysql/dba05-2.html\",\"title\":\"InnoDB 核心特性\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"InnoDB 核心特性\",\"date\":\"2020-07-15T23:13:01.000Z\",\"category\":[\"DBA\"],\"tag\":[\"DBA\",\"RDBMS\"],\"description\":\"InnoDB 核心特性 1. 事务 事务保证金融交易类服务的安全性完整性和公平性。 1.1 事务的 ACID 特性 Atomic（原子性） 所有语句作为一个单元全部成功执行或全部取消。不能出现中间状态。 Consistent（一致性） 如果数据库在事务开始时处于一致状态，则在执行该事务期间将保留一致状态。 Isolated（隔离性）\"},\"headers\":[{\"level\":2,\"title\":\"1. 事务\",\"slug\":\"_1-事务\",\"link\":\"#_1-事务\",\"children\":[{\"level\":3,\"title\":\"1.1 事务的 ACID 特性\",\"slug\":\"_1-1-事务的-acid-特性\",\"link\":\"#_1-1-事务的-acid-特性\",\"children\":[]},{\"level\":3,\"title\":\"1.2 事务控制语句\",\"slug\":\"_1-2-事务控制语句\",\"link\":\"#_1-2-事务控制语句\",\"children\":[]},{\"level\":3,\"title\":\"1.3 事务自动提交机制 （autocommit）\",\"slug\":\"_1-3-事务自动提交机制-autocommit\",\"link\":\"#_1-3-事务自动提交机制-autocommit\",\"children\":[]},{\"level\":3,\"title\":\"1.4  隐式提交的情况\",\"slug\":\"_1-4-隐式提交的情况\",\"link\":\"#_1-4-隐式提交的情况\",\"children\":[]}]},{\"level\":2,\"title\":\"2. 事务的ACID 特性如何保证\",\"slug\":\"_2-事务的acid-特性如何保证\",\"link\":\"#_2-事务的acid-特性如何保证\",\"children\":[{\"level\":3,\"title\":\"2.1 相关概念名词 （初步了解）\",\"slug\":\"_2-1-相关概念名词-初步了解\",\"link\":\"#_2-1-相关概念名词-初步了解\",\"children\":[]},{\"level\":3,\"title\":\"2.2 事务日志—— Redo 重做日志\",\"slug\":\"_2-2-事务日志——-redo-重做日志\",\"link\":\"#_2-2-事务日志——-redo-重做日志\",\"children\":[]},{\"level\":3,\"title\":\"2.3 Undo 日志说明\",\"slug\":\"_2-3-undo-日志说明\",\"link\":\"#_2-3-undo-日志说明\",\"children\":[]},{\"level\":3,\"title\":\"2.4 锁\",\"slug\":\"_2-4-锁\",\"link\":\"#_2-4-锁\",\"children\":[]},{\"level\":3,\"title\":\"2.5 隔离级别\",\"slug\":\"_2-5-隔离级别\",\"link\":\"#_2-5-隔离级别\",\"children\":[]}]}],\"readingTime\":{\"minutes\":11.52,\"words\":3456},\"filePathRelative\":\"mysql/dba05-2.md\",\"localizedDate\":\"2020年7月16日\",\"excerpt\":\"<h1> InnoDB 核心特性</h1>\\n<h2> 1. 事务</h2>\\n<br>\\n<p>事务保证金融交易类服务的安全性完整性和公平性。</p>\\n<br>\\n<h3> 1.1 事务的 ACID 特性</h3>\\n<br>\\n<ul>\\n<li><strong>Atomic（原子性）</strong></li>\\n</ul>\\n<p>所有语句作为一个单元全部成功执行或全部取消。不能出现中间状态。</p>\\n<ul>\\n<li><strong>Consistent（一致性）</strong></li>\\n</ul>\\n<p>如果数据库在事务开始时处于一致状态，则在执行该事务期间将保留一致状态。</p>\\n<ul>\\n<li><strong>Isolated（隔离性）</strong></li>\\n</ul>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
