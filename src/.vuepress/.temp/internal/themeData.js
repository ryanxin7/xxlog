export const themeData = JSON.parse("{\"encrypt\":{\"config\":{\"/demo/\":[\"$2a$10$Uh5AkbetVm3EJArPKvXA8OCTjXqML2HQv74byYD0GdeKTwKLg/TDu\"],\"/zh/demo/encrypt.html\":[\"$2a$10$4iDROkM.GHAIXI4KVUEt8ONsNVcUL4fY3QYVEdQJv5RQ5KKCidt86\"],\"/xj/\":[\"$2a$10$Xi49daTZI/PXaufWxHRW.ONUI7JYNL4K0zR3qZYVlfJ0d0lFOfEAu\"]}},\"locales\":{\"/\":{\"lang\":\"zh-CN\",\"navbarLocales\":{\"langName\":\"简体中文\",\"selectLangAriaLabel\":\"选择语言\"},\"metaLocales\":{\"author\":\"作者\",\"date\":\"写作日期\",\"origin\":\"原创\",\"views\":\"访问量\",\"category\":\"分类\",\"tag\":\"标签\",\"readingTime\":\"阅读时间\",\"words\":\"字数\",\"toc\":\"此页内容\",\"prev\":\"上一页\",\"next\":\"下一页\",\"lastUpdated\":\"上次编辑于\",\"contributors\":\"贡献者\",\"editLink\":\"在 GitHub 上编辑此页\"},\"outlookLocales\":{\"themeColor\":\"主题色\",\"darkmode\":\"外观\",\"fullscreen\":\"全屏\"},\"encryptLocales\":{\"iconLabel\":\"文章已加密\",\"placeholder\":\"输入密码\",\"remember\":\"记住密码\",\"errorHint\":\"请输入正确的密码\"},\"routeLocales\":{\"skipToContent\":\"跳至主要內容\",\"notFoundTitle\":\"页面不存在\",\"notFoundMsg\":[\"这里什么也没有\",\"我们是怎么来到这儿的？\",\"这 是 四 零 四 !\",\"看起来你访问了一个失效的链接\"],\"back\":\"返回上一页\",\"home\":\"带我回家\",\"openInNewWindow\":\"Open in new window\"},\"author\":{\"name\":\"Ryan\",\"url\":\"http://ryanxin.live\"},\"logo\":\"/logo.svg\",\"repo\":\"ryanxin7/xxlog\",\"docsDir\":\"xxlog/src/\",\"navbar\":[\"/\",{\"text\":\"实战进阶⚗️\",\"icon\":\"beaker\",\"link\":\"/demo/\"},{\"text\":\"小记🥳\",\"children\":[{\"text\":\"小记\",\"refix\":\"/xj/\",\"children\":[\"/xj/\"]},{\"text\":\"常用工具\",\"icon\":\"config\",\"children\":[{\"text\":\"图片压缩\",\"icon\":\"more\",\"link\":\"https://imageresizer.com/\"},{\"text\":\"免费图标素材\",\"icon\":\"more\",\"link\":\"https://www.flaticon.com/\"}]}]}],\"sidebar\":{\"/\":[\"\",{\"icon\":\"discover\",\"text\":\"容器\",\"prefix\":\"k8s/\",\"children\":\"structure\"}],\"/xw/\":[\"\",{\"icon\":\"discover\",\"text\":\"直播课笔记\",\"prefix\":\"\",\"children\":\"structure\"}],\"/haproxy/\":[\"\",{\"icon\":\"discover\",\"text\":\"HAproxy笔记\",\"prefix\":\"\",\"children\":\"structure\"}]},\"footer\":\"Ryan's Notebook\",\"displayFooter\":true,\"editLink\":false}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
