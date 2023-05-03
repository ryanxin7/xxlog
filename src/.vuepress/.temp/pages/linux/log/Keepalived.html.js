export const data = JSON.parse("{\"key\":\"v-a1e2ac04\",\"path\":\"/linux/log/Keepalived.html\",\"title\":\"Keepalived 高可用服务部署\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Keepalived 高可用服务部署\",\"intro\":\"通过 VRRP 协议实现高可用功能\",\"featured_image\":\"ss8.jpg\",\"tag\":[\"Linux 学习之旅\",\"高可用\",\"Linux 服务\"],\"category\":[\"linux\"],\"date\":\"2019-11-20T23:45:01.000Z\",\"description\":\"Keepalived 高可用服务部署 Keepalived 软件最早是配合 LVS 负载均衡软件而设计的， 用来管理并监控LVS集群系统中各个服务节点的状态，后来又加入了VRRP 协议可以实现高可用的功能。 Keepalived软件主要是通过 VRRP 协议实现高可用功能的。VRRP 是Virtual Router Redundancy Protocol（虚拟路由器冗余协议）的缩写，VRRP出现的目的就是为了解决静态路由单点故障问题的，它能够保证当个别节点宕机时，整个网络可以不间断地运行 Keepalived 软件工作原理 期初 VRRP 的出现是为了解决静态路由的单点故障。 VRRP 是用过IP多播的方式实现高可用对之间通信的。 工作时主服务器节点发包，备服务器节点接包，当备服务器节点接收不到主服务器节点发的数据包的时候， 就启动接管程序接管主服务器节点的资源。备服务器节点可以有多个，通过优先级竞选。优先级数值越大优先级越大。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/linux/log/Keepalived.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Keepalived 高可用服务部署\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Keepalived 高可用服务部署 Keepalived 软件最早是配合 LVS 负载均衡软件而设计的， 用来管理并监控LVS集群系统中各个服务节点的状态，后来又加入了VRRP 协议可以实现高可用的功能。 Keepalived软件主要是通过 VRRP 协议实现高可用功能的。VRRP 是Virtual Router Redundancy Protocol（虚拟路由器冗余协议）的缩写，VRRP出现的目的就是为了解决静态路由单点故障问题的，它能够保证当个别节点宕机时，整个网络可以不间断地运行 Keepalived 软件工作原理 期初 VRRP 的出现是为了解决静态路由的单点故障。 VRRP 是用过IP多播的方式实现高可用对之间通信的。 工作时主服务器节点发包，备服务器节点接包，当备服务器节点接收不到主服务器节点发的数据包的时候， 就启动接管程序接管主服务器节点的资源。备服务器节点可以有多个，通过优先级竞选。优先级数值越大优先级越大。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-05-02T00:25:35.000Z\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Linux 学习之旅\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"高可用\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Linux 服务\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2019-11-20T23:45:01.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-05-02T00:25:35.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Keepalived 高可用服务部署\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2019-11-20T23:45:01.000Z\\\",\\\"dateModified\\\":\\\"2023-05-02T00:25:35.000Z\\\",\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"Keepalived 高可用服务部署\",\"slug\":\"keepalived-高可用服务部署\",\"link\":\"#keepalived-高可用服务部署\",\"children\":[]},{\"level\":2,\"title\":\"Keepalived 软件工作原理\",\"slug\":\"keepalived-软件工作原理\",\"link\":\"#keepalived-软件工作原理\",\"children\":[]},{\"level\":2,\"title\":\"Keepalived 高可用服务部署\",\"slug\":\"keepalived-高可用服务部署-1\",\"link\":\"#keepalived-高可用服务部署-1\",\"children\":[{\"level\":3,\"title\":\"安装 Keepalived 服务软件\",\"slug\":\"安装-keepalived-服务软件\",\"link\":\"#安装-keepalived-服务软件\",\"children\":[]},{\"level\":3,\"title\":\"部署高可用服务时遇到的问题\",\"slug\":\"部署高可用服务时遇到的问题\",\"link\":\"#部署高可用服务时遇到的问题\",\"children\":[]},{\"level\":3,\"title\":\"利用shell脚本实现监控管理\",\"slug\":\"利用shell脚本实现监控管理\",\"link\":\"#利用shell脚本实现监控管理\",\"children\":[]},{\"level\":3,\"title\":\"Nginx反向代理监听虚拟IP地址\",\"slug\":\"nginx反向代理监听虚拟ip地址\",\"link\":\"#nginx反向代理监听虚拟ip地址\",\"children\":[]},{\"level\":3,\"title\":\"将高可用和反向代理服务建立联系\",\"slug\":\"将高可用和反向代理服务建立联系\",\"link\":\"#将高可用和反向代理服务建立联系\",\"children\":[]},{\"level\":3,\"title\":\"实现高可用集群架构中双主配置（互为主备配置）\",\"slug\":\"实现高可用集群架构中双主配置-互为主备配置\",\"link\":\"#实现高可用集群架构中双主配置-互为主备配置\",\"children\":[]}]}],\"readingTime\":{\"minutes\":5.42,\"words\":1627},\"filePathRelative\":\"linux/log/Keepalived.md\",\"localizedDate\":\"2019年11月21日\",\"excerpt\":\"<h2> Keepalived 高可用服务部署</h2>\\n<br>\\nKeepalived 软件最早是配合 LVS 负载均衡软件而设计的，\\n用来管理并监控LVS集群系统中各个服务节点的状态，后来又加入了VRRP 协议可以实现高可用的功能。\\n<br>\\nKeepalived软件主要是通过 VRRP 协议实现高可用功能的。VRRP 是Virtual Router Redundancy Protocol（虚拟路由器冗余协议）的缩写，VRRP出现的目的就是为了解决静态路由单点故障问题的，它能够保证当个别节点宕机时，整个网络可以不间断地运行\\n<h2> Keepalived 软件工作原理</h2>\\n<br>\\n        期初 VRRP 的出现是为了解决静态路由的单点故障。\\n    VRRP 是用过IP多播的方式实现高可用对之间通信的。\\n    工作时主服务器节点发包，备服务器节点接包，当备服务器节点接收不到主服务器节点发的数据包的时候，\\n    就启动接管程序接管主服务器节点的资源。备服务器节点可以有多个，通过优先级竞选。优先级数值越大优先级越大。\\n\",\"autoDesc\":true,\"git\":{\"createdTime\":1682727888000,\"updatedTime\":1682987135000,\"contributors\":[{\"name\":\"ryanxin7\",\"email\":\"xinxincn0506@outlook.com\",\"commits\":2}]}}")
