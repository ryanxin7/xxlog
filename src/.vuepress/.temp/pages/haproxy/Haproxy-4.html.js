export const data = JSON.parse("{\"key\":\"v-6ab73b70\",\"path\":\"/haproxy/Haproxy-4.html\",\"title\":\"4.HAProxy-https实现\",\"lang\":\"zh-CN\",\"frontmatter\":{\"Author\":\"Ryan\",\"title\":\"4.HAProxy-https实现\",\"date\":\"2023-02-07T12:12:22.000Z\",\"lastUpdated\":true,\"breadcrumb\":false,\"description\":\"六、HAProxy https实现 ```bash #配置HAProxy支持https协议，支持ssl会话； bind *:443 ssl crt /PATH/TO/SOMEPEMFILE #crt 后证书文件为PEM格式，且同时包含证书和所有私钥 cat demo.crt demo.key > demo.pem #把80端口的请求重向定443 bin...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/haproxy/Haproxy-4.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"4.HAProxy-https实现\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"六、HAProxy https实现 ```bash #配置HAProxy支持https协议，支持ssl会话； bind *:443 ssl crt /PATH/TO/SOMEPEMFILE #crt 后证书文件为PEM格式，且同时包含证书和所有私钥 cat demo.crt demo.key > demo.pem #把80端口的请求重向定443 bin...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-02-07T12:12:22.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"4.HAProxy-https实现\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-02-07T12:12:22.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"六、HAProxy https实现\",\"slug\":\"六、haproxy-https实现\",\"link\":\"#六、haproxy-https实现\",\"children\":[{\"level\":3,\"title\":\"6.1 证书制作\",\"slug\":\"_6-1-证书制作\",\"link\":\"#_6-1-证书制作\",\"children\":[]},{\"level\":3,\"title\":\"6.2 https配置示例\",\"slug\":\"_6-2-https配置示例\",\"link\":\"#_6-2-https配置示例\",\"children\":[]}]}],\"readingTime\":{\"minutes\":1.93,\"words\":580},\"filePathRelative\":\"haproxy/Haproxy-4.md\",\"localizedDate\":\"2023年2月7日\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"excerpt\":\"\"}")

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
