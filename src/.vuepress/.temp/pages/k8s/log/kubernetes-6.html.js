export const data = JSON.parse("{\"key\":\"v-5e48877d\",\"path\":\"/k8s/log/kubernetes-6.html\",\"title\":\"6.k8s使用ceph实现数据持久化\",\"lang\":\"zh-CN\",\"frontmatter\":{\"Author\":\"Ryan\",\"title\":\"6.k8s使用ceph实现数据持久化\",\"tag\":[\"k8s进阶训练营\"],\"category\":[\"k8s\"],\"date\":\"2022-06-06T12:12:22.000Z\",\"lastUpdated\":true,\"breadcrumb\":false,\"description\":\"rbd结合k8s提供存储卷及动态存储卷使用案例 目的： 让k8s 中的 pod 可以访问 ceph中rbd 提供的镜像作为存储设备。 需要在 ceph 创建rbd并且让 k8s node 节点能够通过 ceph 的认证k8s在使用 ceph 作为动态存储卷的时候，需要 kube-controller-manager 组件能够访问ceph，因此需要在包括...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/k8s/log/kubernetes-6.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"6.k8s使用ceph实现数据持久化\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"rbd结合k8s提供存储卷及动态存储卷使用案例 目的： 让k8s 中的 pod 可以访问 ceph中rbd 提供的镜像作为存储设备。 需要在 ceph 创建rbd并且让 k8s node 节点能够通过 ceph 的认证k8s在使用 ceph 作为动态存储卷的时候，需要 kube-controller-manager 组件能够访问ceph，因此需要在包括...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-02-27T01:57:51.000Z\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"k8s进阶训练营\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-06-06T12:12:22.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-02-27T01:57:51.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"6.k8s使用ceph实现数据持久化\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-06-06T12:12:22.000Z\\\",\\\"dateModified\\\":\\\"2023-02-27T01:57:51.000Z\\\",\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"rbd结合k8s提供存储卷及动态存储卷使用案例\",\"slug\":\"rbd结合k8s提供存储卷及动态存储卷使用案例\",\"link\":\"#rbd结合k8s提供存储卷及动态存储卷使用案例\",\"children\":[]},{\"level\":2,\"title\":\"1.创建初始化RBD\",\"slug\":\"_1-创建初始化rbd\",\"link\":\"#_1-创建初始化rbd\",\"children\":[]},{\"level\":2,\"title\":\"2 创建image\",\"slug\":\"_2-创建image\",\"link\":\"#_2-创建image\",\"children\":[]},{\"level\":2,\"title\":\"客户端安装ceph-common\",\"slug\":\"客户端安装ceph-common\",\"link\":\"#客户端安装ceph-common\",\"children\":[]},{\"level\":2,\"title\":\"创建ceph 用户与授权\",\"slug\":\"创建ceph-用户与授权\",\"link\":\"#创建ceph-用户与授权\",\"children\":[]},{\"level\":2,\"title\":\"通过 keyring 文件挂载 rbd\",\"slug\":\"通过-keyring-文件挂载-rbd\",\"link\":\"#通过-keyring-文件挂载-rbd\",\"children\":[{\"level\":3,\"title\":\"通过 keyring 文件直接挂载-busybox\",\"slug\":\"通过-keyring-文件直接挂载-busybox\",\"link\":\"#通过-keyring-文件直接挂载-busybox\",\"children\":[]}]},{\"level\":2,\"title\":\"通过secret 挂载rbd\",\"slug\":\"通过secret-挂载rbd\",\"link\":\"#通过secret-挂载rbd\",\"children\":[{\"level\":3,\"title\":\"创建secret\",\"slug\":\"创建secret\",\"link\":\"#创建secret\",\"children\":[]}]},{\"level\":2,\"title\":\"ceph 持久化存储\",\"slug\":\"ceph-持久化存储\",\"link\":\"#ceph-持久化存储\",\"children\":[{\"level\":3,\"title\":\"创建存储类\",\"slug\":\"创建存储类\",\"link\":\"#创建存储类\",\"children\":[]},{\"level\":3,\"title\":\"创建 secret\",\"slug\":\"创建-secret\",\"link\":\"#创建-secret\",\"children\":[]},{\"level\":3,\"title\":\"创建pvc\",\"slug\":\"创建pvc\",\"link\":\"#创建pvc\",\"children\":[]}]},{\"level\":2,\"title\":\"cephFs\",\"slug\":\"cephfs\",\"link\":\"#cephfs\",\"children\":[{\"level\":3,\"title\":\"配置cephfs\",\"slug\":\"配置cephfs\",\"link\":\"#配置cephfs\",\"children\":[]},{\"level\":3,\"title\":\"创建nginx pod同时挂载cephfs\",\"slug\":\"创建nginx-pod同时挂载cephfs\",\"link\":\"#创建nginx-pod同时挂载cephfs\",\"children\":[]}]}],\"readingTime\":{\"minutes\":6.07,\"words\":1820},\"filePathRelative\":\"k8s/log/kubernetes-6.md\",\"localizedDate\":\"2022年6月6日\",\"autoDesc\":true,\"git\":{\"createdTime\":1677227810000,\"updatedTime\":1677463071000,\"contributors\":[{\"name\":\"Ryanxin\",\"email\":\"ryanxin@xx9z@outlook.com\",\"commits\":3}]},\"excerpt\":\"\"}")

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
