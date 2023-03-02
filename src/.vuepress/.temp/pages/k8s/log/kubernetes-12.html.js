export const data = JSON.parse("{\"key\":\"v-65e5f57e\",\"path\":\"/k8s/log/kubernetes-12.html\",\"title\":\"12.ingress 实现基于域名的多虚拟主机,URL转发及多域名HTTPS实现案例\",\"lang\":\"zh-CN\",\"frontmatter\":{\"Author\":\"Ryan\",\"title\":\"12.ingress 实现基于域名的多虚拟主机,URL转发及多域名HTTPS实现案例\",\"tag\":[\"k8s进阶训练营\"],\"category\":[\"k8s\"],\"date\":\"2022-06-12T12:12:22.000Z\",\"lastUpdated\":true,\"breadcrumb\":false,\"description\":\"Ingress和Ingress控制器介绍 在k8s中将一个服务暴露出去通常会使用NodePort或LoadBalancer类型的Service，但随着服务数量的增多，使用NodePort会存在一些问题，可用作NodePort的端口是一个有限的范围，不容易记忆，不好管理。另外， 如果在公有云使用LoadBalancer类型的Service上会产生额外的成...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/k8s/log/kubernetes-12.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"12.ingress 实现基于域名的多虚拟主机,URL转发及多域名HTTPS实现案例\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Ingress和Ingress控制器介绍 在k8s中将一个服务暴露出去通常会使用NodePort或LoadBalancer类型的Service，但随着服务数量的增多，使用NodePort会存在一些问题，可用作NodePort的端口是一个有限的范围，不容易记忆，不好管理。另外， 如果在公有云使用LoadBalancer类型的Service上会产生额外的成...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-03-01T10:28:19.000Z\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"k8s进阶训练营\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-06-12T12:12:22.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-03-01T10:28:19.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"12.ingress 实现基于域名的多虚拟主机,URL转发及多域名HTTPS实现案例\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-06-12T12:12:22.000Z\\\",\\\"dateModified\\\":\\\"2023-03-01T10:28:19.000Z\\\",\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"Ingress和Ingress控制器介绍\",\"slug\":\"ingress和ingress控制器介绍\",\"link\":\"#ingress和ingress控制器介绍\",\"children\":[{\"level\":3,\"title\":\"Ingress控制器\",\"slug\":\"ingress控制器\",\"link\":\"#ingress控制器\",\"children\":[]}]},{\"level\":2,\"title\":\"Ingress Controller部署\",\"slug\":\"ingress-controller部署\",\"link\":\"#ingress-controller部署\",\"children\":[{\"level\":3,\"title\":\"1. 以Deployment方式部署Ingress控制器Pod资源\",\"slug\":\"_1-以deployment方式部署ingress控制器pod资源\",\"link\":\"#_1-以deployment方式部署ingress控制器pod资源\",\"children\":[]},{\"level\":3,\"title\":\"2.以DaemonSet方式部署Ingress控制器\",\"slug\":\"_2-以daemonset方式部署ingress控制器\",\"link\":\"#_2-以daemonset方式部署ingress控制器\",\"children\":[]},{\"level\":3,\"title\":\"3. Deployment方式部署\",\"slug\":\"_3-deployment方式部署\",\"link\":\"#_3-deployment方式部署\",\"children\":[]},{\"level\":3,\"title\":\"4.DaemonSet方式部署\",\"slug\":\"_4-daemonset方式部署\",\"link\":\"#_4-daemonset方式部署\",\"children\":[]}]},{\"level\":2,\"title\":\"3.Ingress示例\",\"slug\":\"_3-ingress示例\",\"link\":\"#_3-ingress示例\",\"children\":[{\"level\":3,\"title\":\"3.1 Ingress资源规范\",\"slug\":\"_3-1-ingress资源规范\",\"link\":\"#_3-1-ingress资源规范\",\"children\":[]},{\"level\":3,\"title\":\"3.2 单域名访问示例\",\"slug\":\"_3-2-单域名访问示例\",\"link\":\"#_3-2-单域名访问示例\",\"children\":[]},{\"level\":3,\"title\":\"3.3 Ingress 配置TLS\",\"slug\":\"_3-3-ingress-配置tls\",\"link\":\"#_3-3-ingress-配置tls\",\"children\":[]},{\"level\":3,\"title\":\"3.4 证书更新\",\"slug\":\"_3-4-证书更新\",\"link\":\"#_3-4-证书更新\",\"children\":[]}]}],\"readingTime\":{\"minutes\":12.23,\"words\":3669},\"filePathRelative\":\"k8s/log/kubernetes-12.md\",\"localizedDate\":\"2022年6月12日\",\"autoDesc\":true,\"git\":{\"createdTime\":1677227810000,\"updatedTime\":1677666499000,\"contributors\":[{\"name\":\"Ryanxin\",\"email\":\"ryanxin@xx9z@outlook.com\",\"commits\":3},{\"name\":\"ryanxin7\",\"email\":\"xinxincn0506@outlook.com\",\"commits\":1}]},\"excerpt\":\"\"}")

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
