export const data = JSON.parse("{\"key\":\"v-186de3bb\",\"path\":\"/linux/log/linux3.html\",\"title\":\"Keepalived 高可用服务部署\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Keepalived 高可用服务部署\",\"tag\":[\"Linux 学习之旅\",\"高可用\",\"Linux 服务\"],\"category\":[\"linux\"],\"date\":\"2019-11-20T23:45:01.000Z\",\"description\":\"Keepalived 高可用服务部署 ​ Keepalived 软件最早是配合 LVS 负载均衡软件而设计的，用来管理并监控LVS集群系统中各个服务节点的状态，后来又加入了VRRP 协议可以实现高可用的功能。 软件主要是通过 VRRP 协议实现高可用功能的,VRRP 是Virtual Router Redundancy Protocol（虚拟路由器冗余协议）的缩写，VRRP出现的目的就是为了解决静态路由单点故障问题的，它能够保证当个别节点宕机时，整个网络可以不间断地运行 一、Keepalived 软件工作原理 ​\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/linux/log/linux3.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Keepalived 高可用服务部署\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Keepalived 高可用服务部署 ​ Keepalived 软件最早是配合 LVS 负载均衡软件而设计的，用来管理并监控LVS集群系统中各个服务节点的状态，后来又加入了VRRP 协议可以实现高可用的功能。 软件主要是通过 VRRP 协议实现高可用功能的,VRRP 是Virtual Router Redundancy Protocol（虚拟路由器冗余协议）的缩写，VRRP出现的目的就是为了解决静态路由单点故障问题的，它能够保证当个别节点宕机时，整个网络可以不间断地运行 一、Keepalived 软件工作原理 ​\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Linux 学习之旅\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"高可用\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Linux 服务\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2019-11-20T23:45:01.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Keepalived 高可用服务部署\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2019-11-20T23:45:01.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"一、Keepalived 软件工作原理\",\"slug\":\"一、keepalived-软件工作原理\",\"link\":\"#一、keepalived-软件工作原理\",\"children\":[]},{\"level\":2,\"title\":\"二、Keepalived 高可用服务部署\",\"slug\":\"二、keepalived-高可用服务部署\",\"link\":\"#二、keepalived-高可用服务部署\",\"children\":[{\"level\":3,\"title\":\"1.确认反向代理服务是否工作正常\",\"slug\":\"_1-确认反向代理服务是否工作正常\",\"link\":\"#_1-确认反向代理服务是否工作正常\",\"children\":[]},{\"level\":3,\"title\":\"2.在浏览器上测试访问kl1和kl2 域名\",\"slug\":\"_2-在浏览器上测试访问kl1和kl2-域名\",\"link\":\"#_2-在浏览器上测试访问kl1和kl2-域名\",\"children\":[]}]},{\"level\":2,\"title\":\"三、安装 Keepalived 服务软件\",\"slug\":\"三、安装-keepalived-服务软件\",\"link\":\"#三、安装-keepalived-服务软件\",\"children\":[]},{\"level\":2,\"title\":\"四、部署高可用服务时遇到的问题\",\"slug\":\"四、部署高可用服务时遇到的问题\",\"link\":\"#四、部署高可用服务时遇到的问题\",\"children\":[]},{\"level\":2,\"title\":\"五、利用shell脚本实现监控管理\",\"slug\":\"五、利用shell脚本实现监控管理\",\"link\":\"#五、利用shell脚本实现监控管理\",\"children\":[]},{\"level\":2,\"title\":\"六、Nginx反向代理监听虚拟IP地址\",\"slug\":\"六、nginx反向代理监听虚拟ip地址\",\"link\":\"#六、nginx反向代理监听虚拟ip地址\",\"children\":[]},{\"level\":2,\"title\":\"七、将高可用和反向代理服务建立联系\",\"slug\":\"七、将高可用和反向代理服务建立联系\",\"link\":\"#七、将高可用和反向代理服务建立联系\",\"children\":[]},{\"level\":2,\"title\":\"八、实现高可用集群架构中双主配置\",\"slug\":\"八、实现高可用集群架构中双主配置\",\"link\":\"#八、实现高可用集群架构中双主配置\",\"children\":[]}],\"readingTime\":{\"minutes\":5.4,\"words\":1621},\"filePathRelative\":\"linux/log/linux3.md\",\"localizedDate\":\"2019年11月21日\",\"excerpt\":\"<h1> Keepalived 高可用服务部署</h1>\\n<p>​    Keepalived 软件最早是配合 LVS 负载均衡软件而设计的，用来管理并监控LVS集群系统中各个服务节点的状态，后来又加入了VRRP 协议可以实现高可用的功能。</p>\\n<p>软件主要是通过 VRRP 协议实现高可用功能的,VRRP 是Virtual Router Redundancy Protocol（虚拟路由器冗余协议）的缩写，VRRP出现的目的就是为了解决静态路由单点故障问题的，它能够保证当个别节点宕机时，整个网络可以不间断地运行</p>\\n<h2> 一、Keepalived 软件工作原理</h2>\\n<p>​</p>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
