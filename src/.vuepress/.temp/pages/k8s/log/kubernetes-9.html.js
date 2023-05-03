export const data = JSON.parse("{\"key\":\"v-6367115a\",\"path\":\"/k8s/log/kubernetes-9.html\",\"title\":\"9.实战案例-运行java应用\",\"lang\":\"zh-CN\",\"frontmatter\":{\"Author\":\"Ryan\",\"title\":\"9.实战案例-运行java应用\",\"tag\":[\"k8s进阶训练营\"],\"category\":[\"k8s\"],\"date\":\"2022-06-09T12:12:22.000Z\",\"lastUpdated\":true,\"breadcrumb\":false,\"description\":\"本次以jenkins.war 包部署⽅式为例运⾏ ，java war包或jar包，且要求jenkins的数据保存⾄外部存储(NFS或者PVC)，其他java应⽤看实际需求是否需要将数据保存⾄外部存储。 构建镜像 #Jenkins Version 2.319.3 FROM harbor.ceamg.com/pub-images/jdk8:3411 MAINTAINER zcc zcc@qq.com ADD jenkins-2.319.3.war /apps/jenkins/ ADD run_jenkins.sh /usr/bin/ EXPOSE 8080 CMD [\\\"/usr/bin/run_jenkins.sh\\\"]\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/k8s/log/kubernetes-9.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"9.实战案例-运行java应用\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本次以jenkins.war 包部署⽅式为例运⾏ ，java war包或jar包，且要求jenkins的数据保存⾄外部存储(NFS或者PVC)，其他java应⽤看实际需求是否需要将数据保存⾄外部存储。 构建镜像 #Jenkins Version 2.319.3 FROM harbor.ceamg.com/pub-images/jdk8:3411 MAINTAINER zcc zcc@qq.com ADD jenkins-2.319.3.war /apps/jenkins/ ADD run_jenkins.sh /usr/bin/ EXPOSE 8080 CMD [\\\"/usr/bin/run_jenkins.sh\\\"]\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-03-01T10:28:19.000Z\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"k8s进阶训练营\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-06-09T12:12:22.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-03-01T10:28:19.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"9.实战案例-运行java应用\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-06-09T12:12:22.000Z\\\",\\\"dateModified\\\":\\\"2023-03-01T10:28:19.000Z\\\",\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"构建镜像\",\"slug\":\"构建镜像\",\"link\":\"#构建镜像\",\"children\":[]},{\"level\":2,\"title\":\"创建pv\",\"slug\":\"创建pv\",\"link\":\"#创建pv\",\"children\":[{\"level\":3,\"title\":\"NFS服务器创建应用数据目录\",\"slug\":\"nfs服务器创建应用数据目录\",\"link\":\"#nfs服务器创建应用数据目录\",\"children\":[]}]},{\"level\":2,\"title\":\"创建PVC\",\"slug\":\"创建pvc\",\"link\":\"#创建pvc\",\"children\":[]},{\"level\":2,\"title\":\"创建Jenkins Pod服务\",\"slug\":\"创建jenkins-pod服务\",\"link\":\"#创建jenkins-pod服务\",\"children\":[{\"level\":3,\"title\":\"验证服务状态\",\"slug\":\"验证服务状态\",\"link\":\"#验证服务状态\",\"children\":[]},{\"level\":3,\"title\":\"service\",\"slug\":\"service\",\"link\":\"#service\",\"children\":[]}]}],\"readingTime\":{\"minutes\":3.21,\"words\":962},\"filePathRelative\":\"k8s/log/kubernetes-9.md\",\"localizedDate\":\"2022年6月9日\",\"excerpt\":\"<p>本次以jenkins.war 包部署⽅式为例运⾏ ，java war包或jar包，且要求jenkins的数据保存⾄外部存储(NFS或者PVC)，其他java应⽤看实际需求是否需要将数据保存⾄外部存储。 <br></p>\\n<p><a name=\\\"PyFag\\\"></a></p>\\n<h2> 构建镜像</h2>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-ext=\\\"sh\\\"><pre class=\\\"language-bash\\\"><code><span class=\\\"token comment\\\">#Jenkins Version 2.319.3</span>\\nFROM harbor.ceamg.com/pub-images/jdk8:3411\\n\\nMAINTAINER zcc zcc@qq.com\\n\\nADD jenkins-2.319.3.war /apps/jenkins/\\nADD run_jenkins.sh /usr/bin/\\n\\nEXPOSE <span class=\\\"token number\\\">8080</span>\\n\\nCMD <span class=\\\"token punctuation\\\">[</span><span class=\\\"token string\\\">\\\"/usr/bin/run_jenkins.sh\\\"</span><span class=\\\"token punctuation\\\">]</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true,\"git\":{\"createdTime\":1677227810000,\"updatedTime\":1677666499000,\"contributors\":[{\"name\":\"Ryanxin\",\"email\":\"ryanxin@xx9z@outlook.com\",\"commits\":4},{\"name\":\"ryanxin7\",\"email\":\"xinxincn0506@outlook.com\",\"commits\":1}]}}")
