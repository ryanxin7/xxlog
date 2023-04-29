export const data = JSON.parse("{\"key\":\"v-07a36011\",\"path\":\"/mysql/dba05-3.html\",\"title\":\"InnoDB 核心参数介绍\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"InnoDB 核心参数介绍\",\"date\":\"2020-07-15T23:33:01.000Z\",\"category\":[\"DBA\"],\"tag\":[\"DBA\",\"RDBMS\"],\"description\":\"InnoDB 核心参数介绍 1.上节知识点回顾 1.1 表空间说明 独立表空间 : 5.6 开始的默认表空间,一个表一个ibd文件,存储数据行和索引 共享表空间 : 5.5 默认的模式, 所有表的行和索引都存储到ibdata1 说明: 从5.6 开始,不再使用共享表空间模式 5.6版本 数据字典信息 ➕ UNDO ➕ TMP 5.7版本 把 TMP 独立了 8.0版本 把 UNDO 独立\"},\"headers\":[{\"level\":2,\"title\":\"1.上节知识点回顾\",\"slug\":\"_1-上节知识点回顾\",\"link\":\"#_1-上节知识点回顾\",\"children\":[{\"level\":3,\"title\":\"1.1 表空间说明\",\"slug\":\"_1-1-表空间说明\",\"link\":\"#_1-1-表空间说明\",\"children\":[]},{\"level\":3,\"title\":\"1.2 表空间迁移\",\"slug\":\"_1-2-表空间迁移\",\"link\":\"#_1-2-表空间迁移\",\"children\":[]},{\"level\":3,\"title\":\"1.3 有关表扩容问题\",\"slug\":\"_1-3-有关表扩容问题\",\"link\":\"#_1-3-有关表扩容问题\",\"children\":[]},{\"level\":3,\"title\":\"1.4 事务 ACID\",\"slug\":\"_1-4-事务-acid\",\"link\":\"#_1-4-事务-acid\",\"children\":[]},{\"level\":3,\"title\":\"1.5 Redo\",\"slug\":\"_1-5-redo\",\"link\":\"#_1-5-redo\",\"children\":[]},{\"level\":3,\"title\":\"1.6 Undo\",\"slug\":\"_1-6-undo\",\"link\":\"#_1-6-undo\",\"children\":[]},{\"level\":3,\"title\":\"1.7 隔离级别\",\"slug\":\"_1-7-隔离级别\",\"link\":\"#_1-7-隔离级别\",\"children\":[]}]},{\"level\":2,\"title\":\"2. InnoDB 核心参数介绍\",\"slug\":\"_2-innodb-核心参数介绍\",\"link\":\"#_2-innodb-核心参数介绍\",\"children\":[]}],\"readingTime\":{\"minutes\":5.25,\"words\":1576},\"filePathRelative\":\"mysql/dba05-3.md\",\"localizedDate\":\"2020年7月16日\",\"excerpt\":\"<h1> InnoDB 核心参数介绍</h1>\\n<h2> 1.上节知识点回顾</h2>\\n<h3> 1.1 表空间说明</h3>\\n<ul>\\n<li>独立表空间 : 5.6 开始的默认表空间,一个表一个ibd文件,存储数据行和索引</li>\\n<li>共享表空间 : 5.5 默认的模式, 所有表的行和索引都存储到ibdata1</li>\\n</ul>\\n<br>\\n<p><strong>说明</strong>:</p>\\n<ul>\\n<li>从5.6 开始,不再使用共享表空间模式</li>\\n<li>5.6版本  数据字典信息 ➕ UNDO ➕ TMP\\n5.7版本  把 TMP 独立了\\n8.0版本  把 UNDO 独立</li>\\n</ul>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
