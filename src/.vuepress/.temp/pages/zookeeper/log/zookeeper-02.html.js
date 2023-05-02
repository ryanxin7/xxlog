export const data = JSON.parse("{\"key\":\"v-44f83fef\",\"path\":\"/zookeeper/log/zookeeper-02.html\",\"title\":\"zookeeper 集群部署\",\"lang\":\"zh-CN\",\"frontmatter\":{\"Author\":\"Ryan\",\"title\":\"zookeeper 集群部署\",\"tag\":[\"中间件\"],\"category\":[\"zookeeper\"],\"date\":\"2021-10-06T22:13:01.000Z\",\"description\":\"集群部署 Zookeeper为了更好的实现生产的业务场景，一般都会采用分布式的集群架构。集群通常由2n+1台Server节点组成，每个Server都知道彼此的存在。每个server都维护的内存状态镜像以及持久化存储的事务日志和快照。 对于2n+1台server，只要有&gt;=(n+1)台server节点可用，整个Zookeeper系统保持可用。 为了维护集群内部所有主机信息的一致性，他们自己参考Paxos协议自己设计了一个更加轻量级的协议:Zab(Zookeeper Atomic Broadcast)来解决集群数据一致性的问题。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/zookeeper/log/zookeeper-02.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"zookeeper 集群部署\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"集群部署 Zookeeper为了更好的实现生产的业务场景，一般都会采用分布式的集群架构。集群通常由2n+1台Server节点组成，每个Server都知道彼此的存在。每个server都维护的内存状态镜像以及持久化存储的事务日志和快照。 对于2n+1台server，只要有&gt;=(n+1)台server节点可用，整个Zookeeper系统保持可用。 为了维护集群内部所有主机信息的一致性，他们自己参考Paxos协议自己设计了一个更加轻量级的协议:Zab(Zookeeper Atomic Broadcast)来解决集群数据一致性的问题。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"中间件\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-10-06T22:13:01.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"zookeeper 集群部署\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-10-06T22:13:01.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"集群流程\",\"slug\":\"集群流程\",\"link\":\"#集群流程\",\"children\":[]},{\"level\":2,\"title\":\"通信机制\",\"slug\":\"通信机制\",\"link\":\"#通信机制\",\"children\":[]},{\"level\":2,\"title\":\"集群部署\",\"slug\":\"集群部署-1\",\"link\":\"#集群部署-1\",\"children\":[{\"level\":3,\"title\":\"软件安装\",\"slug\":\"软件安装\",\"link\":\"#软件安装\",\"children\":[]},{\"level\":3,\"title\":\"配置管理\",\"slug\":\"配置管理\",\"link\":\"#配置管理\",\"children\":[]},{\"level\":3,\"title\":\"启动服务\",\"slug\":\"启动服务\",\"link\":\"#启动服务\",\"children\":[]},{\"level\":3,\"title\":\"服务检查\",\"slug\":\"服务检查\",\"link\":\"#服务检查\",\"children\":[]},{\"level\":3,\"title\":\"专用检测\",\"slug\":\"专用检测\",\"link\":\"#专用检测\",\"children\":[]}]},{\"level\":2,\"title\":\"集群操作命令\",\"slug\":\"集群操作命令\",\"link\":\"#集群操作命令\",\"children\":[{\"level\":3,\"title\":\"常见命令\",\"slug\":\"常见命令\",\"link\":\"#常见命令\",\"children\":[]},{\"level\":3,\"title\":\"命令实践\",\"slug\":\"命令实践\",\"link\":\"#命令实践\",\"children\":[]}]},{\"level\":2,\"title\":\"集群管理\",\"slug\":\"集群管理\",\"link\":\"#集群管理\",\"children\":[]}],\"readingTime\":{\"minutes\":11.86,\"words\":3558},\"filePathRelative\":\"zookeeper/log/zookeeper-02.md\",\"localizedDate\":\"2021年10月7日\",\"excerpt\":\"<h1> 集群部署</h1>\\n<p>Zookeeper为了更好的实现生产的业务场景，一般都会采用分布式的集群架构。集群通常由2n+1台Server节点组成，每个Server都知道彼此的存在。每个server都维护的内存状态镜像以及持久化存储的事务日志和快照。</p>\\n<br>\\n<p>对于2n+1台server，只要有&gt;=(n+1)台server节点可用，整个Zookeeper系统保持可用。</p>\\n<p>为了维护集群内部所有主机信息的一致性，他们自己参考Paxos协议自己设计了一个更加轻量级的协议:Zab(Zookeeper Atomic Broadcast)来解决集群数据一致性的问题。</p>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
