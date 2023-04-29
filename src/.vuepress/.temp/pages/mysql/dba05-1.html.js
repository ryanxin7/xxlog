export const data = JSON.parse("{\"key\":\"v-0439aed3\",\"path\":\"/mysql/dba05-1.html\",\"title\":\"InnoDB 存储引擎物理存储结构\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"InnoDB 存储引擎物理存储结构\",\"date\":\"2020-07-16T03:13:01.000Z\",\"category\":[\"DBA\"],\"tag\":[\"DBA\",\"RDBMS\"],\"description\":\"InnoDB 存储引擎物理存储结构 最直观的存储方式 ll /data/mysql/data ibdata1：#系统数据字典信息(统计信息)，UNDO表空间等数据 ib_logfile0 ~ ib_logfile1: #REDO日志文件，事务日志文件。 ibtmp1： #临时表空间磁盘位置，存储临时表 frm：#存储表的列信息 ibd：#表的数据行和索引\"},\"headers\":[{\"level\":2,\"title\":\"1. 表空间 Tablespace\",\"slug\":\"_1-表空间-tablespace\",\"link\":\"#_1-表空间-tablespace\",\"children\":[{\"level\":3,\"title\":\"1.1 共享表空间 (ibdata1~N)\",\"slug\":\"_1-1-共享表空间-ibdata1-n\",\"link\":\"#_1-1-共享表空间-ibdata1-n\",\"children\":[]},{\"level\":3,\"title\":\"1.2 共享表空间设置\",\"slug\":\"_1-2-共享表空间设置\",\"link\":\"#_1-2-共享表空间设置\",\"children\":[]},{\"level\":3,\"title\":\"1.3 独立表空间\",\"slug\":\"_1-3-独立表空间\",\"link\":\"#_1-3-独立表空间\",\"children\":[]}]}],\"readingTime\":{\"minutes\":3.01,\"words\":902},\"filePathRelative\":\"mysql/dba05-1.md\",\"localizedDate\":\"2020年7月16日\",\"excerpt\":\"<h1> <strong>InnoDB 存储引擎物理存储结构</strong></h1>\\n<p><strong>最直观的存储方式</strong></p>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-ext=\\\"sh\\\"><pre class=\\\"language-bash\\\"><code>ll /data/mysql/data\\nibdata1：<span class=\\\"token comment\\\">#系统数据字典信息(统计信息)，UNDO表空间等数据 </span>\\nib_logfile0 ~ ib_logfile1: <span class=\\\"token comment\\\">#REDO日志文件，事务日志文件。</span>\\nibtmp1： <span class=\\\"token comment\\\">#临时表空间磁盘位置，存储临时表</span>\\nfrm：<span class=\\\"token comment\\\">#存储表的列信息</span>\\nibd：<span class=\\\"token comment\\\">#表的数据行和索引</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
