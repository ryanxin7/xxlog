export const data = JSON.parse("{\"key\":\"v-1ff38c7c\",\"path\":\"/redis/redis-6.html\",\"title\":\"Redis 主从同步\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis 主从同步\",\"date\":\"2020-08-06T19:24:11.000Z\",\"category\":[\"数据库\"],\"tag\":[\"Redis\",\"DBA\"],\"description\":\"Redis 主从同步 redis 作为一个分布式的数据缓存平台，我们可以借助于redis的多实例机制，让多个实例间的数据， 达成一个同步的效果，这样即使某个实例出现异常，也不影响数据整体的使用。 基础知识 复制特性 redis 如果想要实现主从复制的效果，我们需要为它划分 主角色和从角色，实现数据 由主向从的单向传递。 对于 从redis，一旦发现 主redis 更换了，那么将本地数据清空，从新主上同步数据。 如果 从redis 仅仅是断开了 主redis，那么不会删除已经同步过的数据。\"},\"headers\":[{\"level\":3,\"title\":\"基础知识\",\"slug\":\"基础知识\",\"link\":\"#基础知识\",\"children\":[]},{\"level\":3,\"title\":\"实践操作\",\"slug\":\"实践操作\",\"link\":\"#实践操作\",\"children\":[]}],\"readingTime\":{\"minutes\":3.31,\"words\":992},\"filePathRelative\":\"redis/redis-6.md\",\"localizedDate\":\"2020年8月7日\",\"excerpt\":\"<h1> Redis 主从同步</h1>\\n<p>redis 作为一个分布式的数据缓存平台，我们可以借助于redis的多实例机制，让多个实例间的数据，\\n达成一个同步的效果，这样即使某个实例出现异常，也不影响数据整体的使用。</p>\\n<h3> 基础知识</h3>\\n<h4> 复制特性</h4>\\n<p %=\\\"\\\" note=\\\"\\\" primary=\\\"\\\"></p>\\n<ul %=\\\"\\\" endnote=\\\"\\\">\\n<li>redis 如果想要实现主从复制的效果，我们需要为它划分 主角色和从角色，实现数据 由主向从的单向传递。</li>\\n<li>对于 从redis，一旦发现 主redis 更换了，那么将本地数据清空，从新主上同步数据。</li>\\n<li>如果 从redis 仅仅是断开了 主redis，那么不会删除已经同步过的数据。</li>\\n</ul>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
