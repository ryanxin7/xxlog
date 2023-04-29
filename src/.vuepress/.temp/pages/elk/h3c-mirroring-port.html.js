export const data = JSON.parse("{\"key\":\"v-770c5c15\",\"path\":\"/elk/h3c-mirroring-port.html\",\"title\":\"核心交换机数据引流\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"核心交换机数据引流\",\"date\":\"2021-09-29T19:24:11.000Z\",\"category\":[\"运维技术栈\"],\"tag\":[\"运维实战\",\"h3c\"],\"description\":\"核心交换机数据引流 镜像源 镜像源是指被监控的对象，该对象可以是端口或单板上的 CPU，我们将之依次称为源端口和源 CPU。 经由被监控的对象收发的报文会被复制一份到与数据监测设备相连的端口，用户就可以对这些报文 （称为镜像报文）进行监控和分析了。镜像源所在的设备就称为源设备。 镜像目的 镜像目的是指镜像报文所要到达的目的地，即与数据监测设备相连的那个端口，我们称之为目的端口，目的端口所在的设备就称为目的设备。目的端口会将镜像报文转发给与之相连的数据监测设备。 由于一个目的端口可以同时监控多个镜像源，因此在某些组网环境下，目的端口可能收到对同一报 文的多份拷贝。例如，目的端口 Port 1 同时监控同一台设备上的源端口 Port 2 和 Port 3 收发的报文， 如果某报文从 Port 2 进入该设备后又从 Port 3 发送出去，那么该报文将被复制两次给 Port 1。\"},\"headers\":[{\"level\":3,\"title\":\"镜像源\",\"slug\":\"镜像源\",\"link\":\"#镜像源\",\"children\":[]},{\"level\":3,\"title\":\"镜像目的\",\"slug\":\"镜像目的\",\"link\":\"#镜像目的\",\"children\":[]},{\"level\":3,\"title\":\"镜像方向\",\"slug\":\"镜像方向\",\"link\":\"#镜像方向\",\"children\":[]},{\"level\":3,\"title\":\"镜像组\",\"slug\":\"镜像组\",\"link\":\"#镜像组\",\"children\":[]},{\"level\":3,\"title\":\"反射端口、出端口和远程镜像VLAN\",\"slug\":\"反射端口、出端口和远程镜像vlan\",\"link\":\"#反射端口、出端口和远程镜像vlan\",\"children\":[]},{\"level\":3,\"title\":\"端口镜像的分类和实现方式\",\"slug\":\"端口镜像的分类和实现方式\",\"link\":\"#端口镜像的分类和实现方式\",\"children\":[]},{\"level\":3,\"title\":\"二层远程端口镜像\",\"slug\":\"二层远程端口镜像\",\"link\":\"#二层远程端口镜像\",\"children\":[]},{\"level\":3,\"title\":\"配置实战\",\"slug\":\"配置实战\",\"link\":\"#配置实战\",\"children\":[]},{\"level\":3,\"title\":\"效果验证\",\"slug\":\"效果验证\",\"link\":\"#效果验证\",\"children\":[]}],\"readingTime\":{\"minutes\":6,\"words\":1799},\"filePathRelative\":\"elk/h3c-mirroring-port.md\",\"localizedDate\":\"2021年9月30日\",\"excerpt\":\"<h1> 核心交换机数据引流</h1>\\n<h3> 镜像源</h3>\\n<p>镜像源是指被监控的对象，该对象可以是端口或单板上的 CPU，我们将之依次称为源端口和源 CPU。 经由被监控的对象收发的报文会被复制一份到与数据监测设备相连的端口，用户就可以对这些报文 （称为镜像报文）进行监控和分析了。镜像源所在的设备就称为源设备。</p>\\n<br>\\n<h3> 镜像目的</h3>\\n<p>镜像目的是指镜像报文所要到达的目的地，即与数据监测设备相连的那个端口，我们称之为目的端口，目的端口所在的设备就称为目的设备。目的端口会将镜像报文转发给与之相连的数据监测设备。 由于一个目的端口可以同时监控多个镜像源，因此在某些组网环境下，目的端口可能收到对同一报 文的多份拷贝。例如，目的端口 Port 1 同时监控同一台设备上的源端口 Port 2 和 Port 3 收发的报文， 如果某报文从 Port 2 进入该设备后又从 Port 3 发送出去，那么该报文将被复制两次给 Port 1。</p>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
