export const data = JSON.parse("{\"key\":\"v-1c89db3e\",\"path\":\"/redis/redis-7.html\",\"title\":\"Redis Sentinel（哨兵）\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis Sentinel（哨兵）\",\"date\":\"2020-08-06T19:24:11.000Z\",\"category\":[\"数据库\"],\"tag\":[\"Redis\",\"DBA\"],\"description\":\"Redis Sentinel（哨兵） 简介 主从复制奠定了Redis分布式的基础，但是普通的主从复制并不能达到高可用的状态。在普通的主从复制模式下，如果主服务器宕机，就只能通过运维人员手动切换主服务器，很显然这种方案并不可取。 针对上述情况，Redis官方推出了可抵抗节点故障的高可用方案——Redis Sentinel（哨兵）。Redis Sentinel（哨兵）：由一个或多个Sentinel实例组成的Sentinel系统，它可以监视任意多个主从服务器，当监视的主服务器宕机时，自动下线主服务器，并且择优选取从服务器升级为新的主服务器。\"},\"headers\":[{\"level\":3,\"title\":\"简介\",\"slug\":\"简介\",\"link\":\"#简介\",\"children\":[]},{\"level\":3,\"title\":\"实践操作\",\"slug\":\"实践操作\",\"link\":\"#实践操作\",\"children\":[]}],\"readingTime\":{\"minutes\":6.31,\"words\":1893},\"filePathRelative\":\"redis/redis-7.md\",\"localizedDate\":\"2020年8月7日\",\"excerpt\":\"<h1> Redis Sentinel（哨兵）</h1>\\n<h3> 简介</h3>\\n<p>主从复制奠定了Redis分布式的基础，但是普通的主从复制并不能达到高可用的状态。在普通的主从复制模式下，如果主服务器宕机，就只能通过运维人员手动切换主服务器，很显然这种方案并不可取。</p>\\n<p>针对上述情况，Redis官方推出了可抵抗节点故障的高可用方案——Redis Sentinel（哨兵）。Redis Sentinel（哨兵）：由一个或多个Sentinel实例组成的Sentinel系统，它可以监视任意多个主从服务器，当监视的主服务器宕机时，自动下线主服务器，并且择优选取从服务器升级为新的主服务器。</p>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
