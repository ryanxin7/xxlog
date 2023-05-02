export const data = JSON.parse("{\"key\":\"v-691c70df\",\"path\":\"/elk/log/Grok-patterns.html\",\"title\":\"日志处理-Grok正则捕获\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"日志处理-Grok正则捕获\",\"tag\":[\"Ubuntu\",\"运维实战\",\"日志收集\"],\"category\":[\"ElasticStack\"],\"date\":\"2021-10-21T15:13:02.000Z\",\"banner_img\":\"/img/bg1.png\",\"comment\":\"bool\",\"description\":\"一般系统或服务生成的日志都是一大长串。每个字段之间用空格隔开。logstash在获取日志是整个一串获取，如果把日志中每个字段代表的意思分割开来在传给elasticsearch。这样呈现出来的数据更加清晰，而且也能让kibana更方便的绘制图形。 Grok 是 Logstash 最重要的插件。它的主要作用就是将文本格式的字符串，转换成为具体的结构化的数据，配合正则表达式使用。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/elk/log/Grok-patterns.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"日志处理-Grok正则捕获\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"一般系统或服务生成的日志都是一大长串。每个字段之间用空格隔开。logstash在获取日志是整个一串获取，如果把日志中每个字段代表的意思分割开来在传给elasticsearch。这样呈现出来的数据更加清晰，而且也能让kibana更方便的绘制图形。 Grok 是 Logstash 最重要的插件。它的主要作用就是将文本格式的字符串，转换成为具体的结构化的数据，配合正则表达式使用。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-04-29T00:24:48.000Z\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Ubuntu\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"运维实战\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"日志收集\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-10-21T15:13:02.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-04-29T00:24:48.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"日志处理-Grok正则捕获\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-10-21T15:13:02.000Z\\\",\\\"dateModified\\\":\\\"2023-04-29T00:24:48.000Z\\\",\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"grok-patterns\",\"slug\":\"grok-patterns\",\"link\":\"#grok-patterns\",\"children\":[]},{\"level\":2,\"title\":\"案例实践\",\"slug\":\"案例实践\",\"link\":\"#案例实践\",\"children\":[{\"level\":3,\"title\":\"下面针对Apache日志来分割处理\",\"slug\":\"下面针对apache日志来分割处理\",\"link\":\"#下面针对apache日志来分割处理\",\"children\":[]},{\"level\":3,\"title\":\"Httpd\",\"slug\":\"httpd\",\"link\":\"#httpd\",\"children\":[]},{\"level\":3,\"title\":\"java\",\"slug\":\"java\",\"link\":\"#java\",\"children\":[]},{\"level\":3,\"title\":\"Grok Debugger\",\"slug\":\"grok-debugger\",\"link\":\"#grok-debugger\",\"children\":[]}]},{\"level\":2,\"title\":\"自定义grok表达式\",\"slug\":\"自定义grok表达式\",\"link\":\"#自定义grok表达式\",\"children\":[{\"level\":3,\"title\":\"常用正则\",\"slug\":\"常用正则\",\"link\":\"#常用正则\",\"children\":[]},{\"level\":3,\"title\":\"grok截取字符中指定长度的内容\",\"slug\":\"grok截取字符中指定长度的内容\",\"link\":\"#grok截取字符中指定长度的内容\",\"children\":[]}]}],\"readingTime\":{\"minutes\":12.22,\"words\":3666},\"filePathRelative\":\"elk/log/Grok-patterns.md\",\"localizedDate\":\"2021年10月21日\",\"excerpt\":\"<p>一般系统或服务生成的日志都是一大长串。每个字段之间用空格隔开。logstash在获取日志是整个一串获取，如果把日志中每个字段代表的意思分割开来在传给elasticsearch。这样呈现出来的数据更加清晰，而且也能让kibana更方便的绘制图形。</p>\\n<p>Grok 是 Logstash 最重要的插件。它的主要作用就是将文本格式的字符串，转换成为具体的结构化的数据，配合正则表达式使用。</p>\\n\",\"autoDesc\":true,\"git\":{\"createdTime\":1682727888000,\"updatedTime\":1682727888000,\"contributors\":[{\"name\":\"ryanxin7\",\"email\":\"xinxincn0506@outlook.com\",\"commits\":1}]}}")

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
