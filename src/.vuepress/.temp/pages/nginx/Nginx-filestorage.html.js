export const data = JSON.parse("{\"key\":\"v-554eea3b\",\"path\":\"/nginx/Nginx-filestorage.html\",\"title\":\"使用Nginx构建文件仓库\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"使用Nginx构建文件仓库\",\"date\":\"2020-06-01T11:11:22.000Z\",\"category\":[\"运维技术栈\"],\"tag\":[\"Nginx\",\"运维实战\"],\"description\":\"使用Nginx构建文件仓库 使用Nginx autoindex 配置一个文件下载站点，将一些常用的安装包放上去，以提供用户下载，适用于公司部门内部软件分享这种类似的工作，比 FTP 配置简单，能实现限制速度等，只是上传需要手动上传到服务器。 编译安装Nginx 服务器版本为：Ubuntu 20.4 1、新建项目目录，其规划如下： mkdir -p /data/{logs,packages,services,backup,shell}\"},\"headers\":[{\"level\":2,\"title\":\"编译安装Nginx\",\"slug\":\"编译安装nginx\",\"link\":\"#编译安装nginx\",\"children\":[]},{\"level\":2,\"title\":\"定制归档前端主题\",\"slug\":\"定制归档前端主题\",\"link\":\"#定制归档前端主题\",\"children\":[{\"level\":3,\"title\":\"添加模块\",\"slug\":\"添加模块\",\"link\":\"#添加模块\",\"children\":[]},{\"level\":3,\"title\":\"重新编译\",\"slug\":\"重新编译\",\"link\":\"#重新编译\",\"children\":[]},{\"level\":3,\"title\":\"备份旧版本并替换\",\"slug\":\"备份旧版本并替换\",\"link\":\"#备份旧版本并替换\",\"children\":[]},{\"level\":3,\"title\":\"4、查看编译参数并重载：\",\"slug\":\"_4、查看编译参数并重载\",\"link\":\"#_4、查看编译参数并重载\",\"children\":[]}]},{\"level\":2,\"title\":\"服务配置文件\",\"slug\":\"服务配置文件\",\"link\":\"#服务配置文件\",\"children\":[{\"level\":3,\"title\":\"初始状态\",\"slug\":\"初始状态\",\"link\":\"#初始状态\",\"children\":[]},{\"level\":3,\"title\":\"UI美化\",\"slug\":\"ui美化\",\"link\":\"#ui美化\",\"children\":[]},{\"level\":3,\"title\":\"UI高级定制\",\"slug\":\"ui高级定制\",\"link\":\"#ui高级定制\",\"children\":[]},{\"level\":3,\"title\":\"4、其他说明\",\"slug\":\"_4、其他说明\",\"link\":\"#_4、其他说明\",\"children\":[]}]}],\"readingTime\":{\"minutes\":6.23,\"words\":1869},\"filePathRelative\":\"nginx/Nginx-filestorage.md\",\"localizedDate\":\"2020年6月1日\",\"excerpt\":\"<h1> 使用Nginx构建文件仓库</h1>\\n<p>使用<code>Nginx autoindex</code> 配置一个文件下载站点，将一些常用的安装包放上去，以提供用户下载，适用于公司部门内部软件分享这种类似的工作，比 FTP 配置简单，能实现限制速度等，只是上传需要手动上传到服务器。</p>\\n<h2> 编译安装Nginx</h2>\\n<p>服务器版本为：Ubuntu 20.4</p>\\n<p>1、新建项目目录，其规划如下：</p>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-ext=\\\"sh\\\"><pre class=\\\"language-bash\\\"><code><span class=\\\"token function\\\">mkdir</span> <span class=\\\"token parameter variable\\\">-p</span> /data/<span class=\\\"token punctuation\\\">{</span>logs,packages,services,backup,shell<span class=\\\"token punctuation\\\">}</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true,\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

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
