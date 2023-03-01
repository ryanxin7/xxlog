export const data = JSON.parse("{\"key\":\"v-5ffd601c\",\"path\":\"/k8s/log/kubernetes-7.html\",\"title\":\"7.Pod的状态和探针\",\"lang\":\"zh-CN\",\"frontmatter\":{\"Author\":\"Ryan\",\"title\":\"7.Pod的状态和探针\",\"tag\":[\"k8s进阶训练营\"],\"category\":[\"k8s\"],\"date\":\"2022-06-07T12:12:22.000Z\",\"lastUpdated\":true,\"breadcrumb\":false,\"description\":\"Pod状态!Pod状态 (http://cdn1.ryanxin.live/1674895053415-2477036f-d642-41c9-90c7-942d1a238360.png) 第一阶段 1. Pending 正在创建Pod但是Pod中的容器还没有全部被创建完成=[处于此状态的Pod应该检查Pod依赖的存储是否有权限挂载、镜像是否可以下载、调...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/k8s/log/kubernetes-7.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"7.Pod的状态和探针\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Pod状态!Pod状态 (http://cdn1.ryanxin.live/1674895053415-2477036f-d642-41c9-90c7-942d1a238360.png) 第一阶段 1. Pending 正在创建Pod但是Pod中的容器还没有全部被创建完成=[处于此状态的Pod应该检查Pod依赖的存储是否有权限挂载、镜像是否可以下载、调...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-02-27T01:57:51.000Z\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"k8s进阶训练营\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-06-07T12:12:22.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-02-27T01:57:51.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"7.Pod的状态和探针\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-06-07T12:12:22.000Z\\\",\\\"dateModified\\\":\\\"2023-02-27T01:57:51.000Z\\\",\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"Pod 探针\",\"slug\":\"pod-探针\",\"link\":\"#pod-探针\",\"children\":[{\"level\":3,\"title\":\"探针简介\",\"slug\":\"探针简介\",\"link\":\"#探针简介\",\"children\":[]}]},{\"level\":2,\"title\":\"配置探针\",\"slug\":\"配置探针\",\"link\":\"#配置探针\",\"children\":[{\"level\":3,\"title\":\"探针类型\",\"slug\":\"探针类型\",\"link\":\"#探针类型\",\"children\":[]},{\"level\":3,\"title\":\"探针配置\",\"slug\":\"探针配置\",\"link\":\"#探针配置\",\"children\":[]},{\"level\":3,\"title\":\"HTTP 探测器可以在 httpGet 上配置额外的字段\",\"slug\":\"http-探测器可以在-httpget-上配置额外的字段\",\"link\":\"#http-探测器可以在-httpget-上配置额外的字段\",\"children\":[]},{\"level\":3,\"title\":\"HTTP探针示例\",\"slug\":\"http探针示例\",\"link\":\"#http探针示例\",\"children\":[]},{\"level\":3,\"title\":\"TCP 探针示例\",\"slug\":\"tcp-探针示例\",\"link\":\"#tcp-探针示例\",\"children\":[]},{\"level\":3,\"title\":\"ExecAction探针\",\"slug\":\"execaction探针\",\"link\":\"#execaction探针\",\"children\":[]},{\"level\":3,\"title\":\"livenessProbe和readinessProbe的对⽐\",\"slug\":\"livenessprobe和readinessprobe的对比\",\"link\":\"#livenessprobe和readinessprobe的对比\",\"children\":[]}]},{\"level\":2,\"title\":\"Pod重启策略\",\"slug\":\"pod重启策略\",\"link\":\"#pod重启策略\",\"children\":[]},{\"level\":2,\"title\":\"镜像拉取策略\",\"slug\":\"镜像拉取策略\",\"link\":\"#镜像拉取策略\",\"children\":[]}],\"readingTime\":{\"minutes\":7.77,\"words\":2330},\"filePathRelative\":\"k8s/log/kubernetes-7.md\",\"localizedDate\":\"2022年6月7日\",\"autoDesc\":true,\"git\":{\"createdTime\":1677227810000,\"updatedTime\":1677463071000,\"contributors\":[{\"name\":\"Ryanxin\",\"email\":\"ryanxin@xx9z@outlook.com\",\"commits\":3}]},\"excerpt\":\"\"}")

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
