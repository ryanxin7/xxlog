export const data = JSON.parse("{\"key\":\"v-61b238bb\",\"path\":\"/k8s/log/kubernetes-8.html\",\"title\":\"8.实战案例-基于StatefulSetMySQL主从架构\",\"lang\":\"zh-CN\",\"frontmatter\":{\"Author\":\"Ryan\",\"title\":\"8.实战案例-基于StatefulSetMySQL主从架构\",\"tag\":[\"k8s进阶训练营\"],\"category\":[\"k8s\"],\"date\":\"2022-06-08T12:12:22.000Z\",\"lastUpdated\":true,\"breadcrumb\":false,\"description\":\"https://kubernetes.io/zh-cn/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/ (https://kubernetes.io/zh-cn/docs/tutorials/stateful-application/mysql-wordpre...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/k8s/log/kubernetes-8.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"8.实战案例-基于StatefulSetMySQL主从架构\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"https://kubernetes.io/zh-cn/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/ (https://kubernetes.io/zh-cn/docs/tutorials/stateful-application/mysql-wordpre...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-02-27T01:57:51.000Z\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"k8s进阶训练营\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-06-08T12:12:22.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-02-27T01:57:51.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"8.实战案例-基于StatefulSetMySQL主从架构\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-06-08T12:12:22.000Z\\\",\\\"dateModified\\\":\\\"2023-02-27T01:57:51.000Z\\\",\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"StatefulSet 的组成部分\",\"slug\":\"statefulset-的组成部分\",\"link\":\"#statefulset-的组成部分\",\"children\":[]},{\"level\":2,\"title\":\"\",\"slug\":\"\",\"link\":\"#\",\"children\":[]},{\"level\":2,\"title\":\"镜像准备\",\"slug\":\"镜像准备\",\"link\":\"#镜像准备\",\"children\":[]},{\"level\":2,\"title\":\"创建PV\",\"slug\":\"创建pv\",\"link\":\"#创建pv\",\"children\":[{\"level\":3,\"title\":\"创建nfs共享存储目录\",\"slug\":\"创建nfs共享存储目录\",\"link\":\"#创建nfs共享存储目录\",\"children\":[]},{\"level\":3,\"title\":\"创建PV yaml文件\",\"slug\":\"创建pv-yaml文件\",\"link\":\"#创建pv-yaml文件\",\"children\":[]}]},{\"level\":2,\"title\":\"创建 ConfigMap\",\"slug\":\"创建-configmap\",\"link\":\"#创建-configmap\",\"children\":[]},{\"level\":2,\"title\":\"创建 无头服务\",\"slug\":\"创建-无头服务\",\"link\":\"#创建-无头服务\",\"children\":[]},{\"level\":2,\"title\":\"创建 StatefulSet\",\"slug\":\"创建-statefulset\",\"link\":\"#创建-statefulset\",\"children\":[{\"level\":3,\"title\":\"运⾏mysql服务\",\"slug\":\"运行mysql服务\",\"link\":\"#运行mysql服务\",\"children\":[]},{\"level\":3,\"title\":\"验证MySQL主从同步是否正常\",\"slug\":\"验证mysql主从同步是否正常\",\"link\":\"#验证mysql主从同步是否正常\",\"children\":[]}]}],\"readingTime\":{\"minutes\":7.31,\"words\":2194},\"filePathRelative\":\"k8s/log/kubernetes-8.md\",\"localizedDate\":\"2022年6月8日\",\"autoDesc\":true,\"git\":{\"createdTime\":1677227810000,\"updatedTime\":1677463071000,\"contributors\":[{\"name\":\"Ryanxin\",\"email\":\"ryanxin@xx9z@outlook.com\",\"commits\":3}]},\"excerpt\":\"\"}")

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
