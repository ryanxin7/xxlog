export const data = JSON.parse("{\"key\":\"v-080856db\",\"path\":\"/ceph/log/5.%20CephX%E8%AE%A4%E8%AF%81%E6%9C%BA%E5%88%B6.html\",\"title\":\"5.CephX 认证机制\",\"lang\":\"zh-CN\",\"frontmatter\":{\"Author\":\"Ryan\",\"title\":\"5.CephX 认证机制\",\"tag\":[\"分布式存储\"],\"category\":[\"Ceph\"],\"date\":\"2023-01-04T12:12:22.000Z\",\"lastUpdated\":true,\"breadcrumb\":false,\"description\":\"Ceph使用cephx协议对客户端进行身份认证cephx用于对ceph保存的数据进行认证访问和授权，用于对访问ceph的请求进行认证和授权检测，与mon通信的请求都要经过ceph认证通过，但是也可以在mon节点关闭cephx认证，但是关闭认证之后任何访问都将被允许，因此无法保证数据的安全性, 5.1 授权流程 每个mon节点都可以对客户端进行身份认证并分发秘钥，因此多个mon节点就不存在单点故障和认证性能瓶颈。mon节点会返回用于身份认证的数据结构，其中包含获取ceph服务时用到的session key,session key通过客户端秘钥进行加密，秘钥是在客户端提前配置好的，/etc/ceph/ceph.client.admin.keyring\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/ceph/log/5.%20CephX%E8%AE%A4%E8%AF%81%E6%9C%BA%E5%88%B6.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"5.CephX 认证机制\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Ceph使用cephx协议对客户端进行身份认证cephx用于对ceph保存的数据进行认证访问和授权，用于对访问ceph的请求进行认证和授权检测，与mon通信的请求都要经过ceph认证通过，但是也可以在mon节点关闭cephx认证，但是关闭认证之后任何访问都将被允许，因此无法保证数据的安全性, 5.1 授权流程 每个mon节点都可以对客户端进行身份认证并分发秘钥，因此多个mon节点就不存在单点故障和认证性能瓶颈。mon节点会返回用于身份认证的数据结构，其中包含获取ceph服务时用到的session key,session key通过客户端秘钥进行加密，秘钥是在客户端提前配置好的，/etc/ceph/ceph.client.admin.keyring\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-04-28T14:51:58.000Z\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"分布式存储\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-01-04T12:12:22.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-04-28T14:51:58.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"5.CephX 认证机制\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-01-04T12:12:22.000Z\\\",\\\"dateModified\\\":\\\"2023-04-28T14:51:58.000Z\\\",\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":3,\"title\":\"5.1 授权流程\",\"slug\":\"_5-1-授权流程\",\"link\":\"#_5-1-授权流程\",\"children\":[]},{\"level\":2,\"title\":\"5.2 访问流程\",\"slug\":\"_5-2-访问流程\",\"link\":\"#_5-2-访问流程\",\"children\":[]},{\"level\":2,\"title\":\"5.3 ceph用户\",\"slug\":\"_5-3-ceph用户\",\"link\":\"#_5-3-ceph用户\",\"children\":[{\"level\":3,\"title\":\"5.3.1 列出指定用户信息:\",\"slug\":\"_5-3-1-列出指定用户信息\",\"link\":\"#_5-3-1-列出指定用户信息\",\"children\":[]}]},{\"level\":2,\"title\":\"5.4 ceph授权和使能\",\"slug\":\"_5-4-ceph授权和使能\",\"link\":\"#_5-4-ceph授权和使能\",\"children\":[]},{\"level\":2,\"title\":\"5.5 ceph用户管理\",\"slug\":\"_5-5-ceph用户管理\",\"link\":\"#_5-5-ceph用户管理\",\"children\":[{\"level\":3,\"title\":\"5.5.1 ceph auth add\",\"slug\":\"_5-5-1-ceph-auth-add\",\"link\":\"#_5-5-1-ceph-auth-add\",\"children\":[]},{\"level\":3,\"title\":\"5.5.2 ceph auth get-or-create\",\"slug\":\"_5-5-2-ceph-auth-get-or-create\",\"link\":\"#_5-5-2-ceph-auth-get-or-create\",\"children\":[]},{\"level\":3,\"title\":\"5.5.3 ceph auth get-or-create-key\",\"slug\":\"_5-5-3-ceph-auth-get-or-create-key\",\"link\":\"#_5-5-3-ceph-auth-get-or-create-key\",\"children\":[]},{\"level\":3,\"title\":\"5.5.4  ceph auth print-key\",\"slug\":\"_5-5-4-ceph-auth-print-key\",\"link\":\"#_5-5-4-ceph-auth-print-key\",\"children\":[]},{\"level\":3,\"title\":\"5.5.5 修改用户能力\",\"slug\":\"_5-5-5-修改用户能力\",\"link\":\"#_5-5-5-修改用户能力\",\"children\":[]},{\"level\":3,\"title\":\"5.5.6 删除用户\",\"slug\":\"_5-5-6-删除用户\",\"link\":\"#_5-5-6-删除用户\",\"children\":[]}]},{\"level\":2,\"title\":\"5.6 秘钥环管理\",\"slug\":\"_5-6-秘钥环管理\",\"link\":\"#_5-6-秘钥环管理\",\"children\":[{\"level\":3,\"title\":\"5.6.1 通过秘钥环文件备份与恢复用户\",\"slug\":\"_5-6-1-通过秘钥环文件备份与恢复用户\",\"link\":\"#_5-6-1-通过秘钥环文件备份与恢复用户\",\"children\":[]},{\"level\":3,\"title\":\"5.6.2 从keyring文件恢复用户认证信息\",\"slug\":\"_5-6-2-从keyring文件恢复用户认证信息\",\"link\":\"#_5-6-2-从keyring文件恢复用户认证信息\",\"children\":[]},{\"level\":3,\"title\":\"5.6.3 秘钥环文件添加多用户\",\"slug\":\"_5-6-3-秘钥环文件添加多用户\",\"link\":\"#_5-6-3-秘钥环文件添加多用户\",\"children\":[]}]}],\"readingTime\":{\"minutes\":11.82,\"words\":3546},\"filePathRelative\":\"ceph/log/5. CephX认证机制.md\",\"localizedDate\":\"2023年1月4日\",\"excerpt\":\"<p><strong>Ceph使用cephx协议对客户端进行身份认证</strong><br>cephx用于对ceph保存的数据进行认证访问和授权，用于对访问ceph的请求进行认证和授权检测，与mon通信的请求都要经过ceph认证通过，但是也可以在mon节点关闭cephx认证，但是关闭认证之后任何访问都将被允许，因此无法保证数据的安全性,</p>\\n<h3> 5.1 授权流程</h3>\\n<p>每个mon节点都可以对客户端进行身份认证并分发秘钥，因此多个mon节点就不存在单点故障和认证性能瓶颈。<br>mon节点会返回用于身份认证的数据结构，其中包含获取ceph服务时用到的<strong>session key</strong>,<br><strong>session key</strong>通过客户端秘钥进行加密，秘钥是在客户端提前配置好的，<br><code>/etc/ceph/ceph.client.admin.keyring</code></p>\",\"autoDesc\":true,\"git\":{\"createdTime\":1682693518000,\"updatedTime\":1682693518000,\"contributors\":[{\"name\":\"ryanxin7\",\"email\":\"xinxincn0506@outlook.com\",\"commits\":1}]}}")

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
