export const data = JSON.parse("{\"key\":\"v-55c04c62\",\"path\":\"/k8s/log/kubernetes-1.html\",\"title\":\"1.kubernetes 二进制部署\",\"lang\":\"zh-CN\",\"frontmatter\":{\"Author\":\"Ryan\",\"title\":\"1.kubernetes 二进制部署\",\"tag\":[\"k8s进阶训练营\"],\"category\":[\"k8s\"],\"date\":\"2022-06-01T12:12:22.000Z\",\"lastUpdated\":true,\"breadcrumb\":false,\"description\":\"k8s-实战案例_v1.21.x-部署.pdf 1.基础环境配置 1.1 时间同步 ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime cat /etc/default/locale LANG=en_US.UTF-8 LC_TIME=en_DK.UTF-8 */5 * * * * /usr/sbin/ntpdate time1.aliyun.com &amp;&gt; /dev/null &amp;&amp; hwclock -w/usr/sbin/ntpdate\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/k8s/log/kubernetes-1.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"1.kubernetes 二进制部署\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"k8s-实战案例_v1.21.x-部署.pdf 1.基础环境配置 1.1 时间同步 ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime cat /etc/default/locale LANG=en_US.UTF-8 LC_TIME=en_DK.UTF-8 */5 * * * * /usr/sbin/ntpdate time1.aliyun.com &amp;&gt; /dev/null &amp;&amp; hwclock -w/usr/sbin/ntpdate\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-03-01T10:28:19.000Z\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"k8s进阶训练营\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-06-01T12:12:22.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-03-01T10:28:19.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"1.kubernetes 二进制部署\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-06-01T12:12:22.000Z\\\",\\\"dateModified\\\":\\\"2023-03-01T10:28:19.000Z\\\",\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"1.基础环境配置\",\"slug\":\"_1-基础环境配置\",\"link\":\"#_1-基础环境配置\",\"children\":[{\"level\":3,\"title\":\"1.1 时间同步\",\"slug\":\"_1-1-时间同步\",\"link\":\"#_1-1-时间同步\",\"children\":[]},{\"level\":3,\"title\":\"1.2  安裝docker\",\"slug\":\"_1-2-安裝docker\",\"link\":\"#_1-2-安裝docker\",\"children\":[]},{\"level\":3,\"title\":\"1.3 安装ansible\",\"slug\":\"_1-3-安装ansible\",\"link\":\"#_1-3-安装ansible\",\"children\":[]},{\"level\":3,\"title\":\"1.4 配置集群免秘钥登录\",\"slug\":\"_1-4-配置集群免秘钥登录\",\"link\":\"#_1-4-配置集群免秘钥登录\",\"children\":[]},{\"level\":3,\"title\":\"1.5 部署节点下载kubeasz部署项⽬及组件\",\"slug\":\"_1-5-部署节点下载kubeasz部署项目及组件\",\"link\":\"#_1-5-部署节点下载kubeasz部署项目及组件\",\"children\":[]}]},{\"level\":2,\"title\":\"2.部署 harbor 镜像仓库\",\"slug\":\"_2-部署-harbor-镜像仓库\",\"link\":\"#_2-部署-harbor-镜像仓库\",\"children\":[{\"level\":3,\"title\":\"2.1 创建自签ssl证书\",\"slug\":\"_2-1-创建自签ssl证书\",\"link\":\"#_2-1-创建自签ssl证书\",\"children\":[]},{\"level\":3,\"title\":\"2.2 修改harbor配置\",\"slug\":\"_2-2-修改harbor配置\",\"link\":\"#_2-2-修改harbor配置\",\"children\":[]},{\"level\":3,\"title\":\"2.3 安装harbor\",\"slug\":\"_2-3-安装harbor\",\"link\":\"#_2-3-安装harbor\",\"children\":[]},{\"level\":3,\"title\":\"2.4 harbor 调试\",\"slug\":\"_2-4-harbor-调试\",\"link\":\"#_2-4-harbor-调试\",\"children\":[]}]},{\"level\":2,\"title\":\"3.创建集群配置实例\",\"slug\":\"_3-创建集群配置实例\",\"link\":\"#_3-创建集群配置实例\",\"children\":[{\"level\":3,\"title\":\"3.1 ⽣成k8s集群 hosts⽂件\",\"slug\":\"_3-1-生成k8s集群-hosts文件\",\"link\":\"#_3-1-生成k8s集群-hosts文件\",\"children\":[]},{\"level\":3,\"title\":\"3.1 ⽣成k8s集群 config ⽂件\",\"slug\":\"_3-1-生成k8s集群-config-文件\",\"link\":\"#_3-1-生成k8s集群-config-文件\",\"children\":[]}]},{\"level\":2,\"title\":\"4.步骤1-基础环境初始化\",\"slug\":\"_4-步骤1-基础环境初始化\",\"link\":\"#_4-步骤1-基础环境初始化\",\"children\":[]},{\"level\":2,\"title\":\"5.步骤2-部署etcd集群\",\"slug\":\"_5-步骤2-部署etcd集群\",\"link\":\"#_5-步骤2-部署etcd集群\",\"children\":[]},{\"level\":2,\"title\":\"6.步骤3-部署运行时环境\",\"slug\":\"_6-步骤3-部署运行时环境\",\"link\":\"#_6-步骤3-部署运行时环境\",\"children\":[{\"level\":3,\"title\":\"6.1 kubeasz 集成安装 containerd\",\"slug\":\"_6-1-kubeasz-集成安装-containerd\",\"link\":\"#_6-1-kubeasz-集成安装-containerd\",\"children\":[]},{\"level\":3,\"title\":\"6.2 配置containerd 对接私有harbor仓库\",\"slug\":\"_6-2-配置containerd-对接私有harbor仓库\",\"link\":\"#_6-2-配置containerd-对接私有harbor仓库\",\"children\":[]},{\"level\":3,\"title\":\"6.3 containerd 使用证书对接harbor实现上传下载\",\"slug\":\"_6-3-containerd-使用证书对接harbor实现上传下载\",\"link\":\"#_6-3-containerd-使用证书对接harbor实现上传下载\",\"children\":[]}]},{\"level\":2,\"title\":\"7.步骤4-部署master\",\"slug\":\"_7-步骤4-部署master\",\"link\":\"#_7-步骤4-部署master\",\"children\":[]},{\"level\":2,\"title\":\"8.步骤5-部署node节点\",\"slug\":\"_8-步骤5-部署node节点\",\"link\":\"#_8-步骤5-部署node节点\",\"children\":[]},{\"level\":2,\"title\":\"9.步骤6-部署网络组件\",\"slug\":\"_9-步骤6-部署网络组件\",\"link\":\"#_9-步骤6-部署网络组件\",\"children\":[{\"level\":3,\"title\":\"9.1 使⽤calico⽹络组件\",\"slug\":\"_9-1-使用calico网络组件\",\"link\":\"#_9-1-使用calico网络组件\",\"children\":[]},{\"level\":3,\"title\":\"9.2 验证calico网络\",\"slug\":\"_9-2-验证calico网络\",\"link\":\"#_9-2-验证calico网络\",\"children\":[]},{\"level\":3,\"title\":\"9.3 查看所有calico节点状态\",\"slug\":\"_9-3-查看所有calico节点状态\",\"link\":\"#_9-3-查看所有calico节点状态\",\"children\":[]},{\"level\":3,\"title\":\"9.4 创建容器测试网络通信\",\"slug\":\"_9-4-创建容器测试网络通信\",\"link\":\"#_9-4-创建容器测试网络通信\",\"children\":[]}]},{\"level\":2,\"title\":\"10.步骤7-安装集群插件-coredns\",\"slug\":\"_10-步骤7-安装集群插件-coredns\",\"link\":\"#_10-步骤7-安装集群插件-coredns\",\"children\":[{\"level\":3,\"title\":\"10.1 下载二进制包\",\"slug\":\"_10-1-下载二进制包\",\"link\":\"#_10-1-下载二进制包\",\"children\":[]},{\"level\":3,\"title\":\"10.2 修改配置文件\",\"slug\":\"_10-2-修改配置文件\",\"link\":\"#_10-2-修改配置文件\",\"children\":[]},{\"level\":3,\"title\":\"10.3 下载镜像并推送到harbor\",\"slug\":\"_10-3-下载镜像并推送到harbor\",\"link\":\"#_10-3-下载镜像并推送到harbor\",\"children\":[]},{\"level\":3,\"title\":\"10.4 安装coredns\",\"slug\":\"_10-4-安装coredns\",\"link\":\"#_10-4-安装coredns\",\"children\":[]},{\"level\":3,\"title\":\"10.5 启动容器测试域名解析\",\"slug\":\"_10-5-启动容器测试域名解析\",\"link\":\"#_10-5-启动容器测试域名解析\",\"children\":[]},{\"level\":3,\"title\":\"10.6 测试 prometheus 监控项\",\"slug\":\"_10-6-测试-prometheus-监控项\",\"link\":\"#_10-6-测试-prometheus-监控项\",\"children\":[]}]},{\"level\":2,\"title\":\"11. 步骤8-安装集群插件-dashboard\",\"slug\":\"_11-步骤8-安装集群插件-dashboard\",\"link\":\"#_11-步骤8-安装集群插件-dashboard\",\"children\":[{\"level\":3,\"title\":\"11.1 下载对应kubernetes版本的dashboard\",\"slug\":\"_11-1-下载对应kubernetes版本的dashboard\",\"link\":\"#_11-1-下载对应kubernetes版本的dashboard\",\"children\":[]},{\"level\":3,\"title\":\"11.2 修改service暴露方式\",\"slug\":\"_11-2-修改service暴露方式\",\"link\":\"#_11-2-修改service暴露方式\",\"children\":[]},{\"level\":3,\"title\":\"11.3 下载镜像推送到harbor\",\"slug\":\"_11-3-下载镜像推送到harbor\",\"link\":\"#_11-3-下载镜像推送到harbor\",\"children\":[]},{\"level\":3,\"title\":\"11.4 修改镜像地址\",\"slug\":\"_11-4-修改镜像地址\",\"link\":\"#_11-4-修改镜像地址\",\"children\":[]},{\"level\":3,\"title\":\"11.5 安装dashboard组件\",\"slug\":\"_11-5-安装dashboard组件\",\"link\":\"#_11-5-安装dashboard组件\",\"children\":[]},{\"level\":3,\"title\":\"11.6 查看组件运行状态\",\"slug\":\"_11-6-查看组件运行状态\",\"link\":\"#_11-6-查看组件运行状态\",\"children\":[]},{\"level\":3,\"title\":\"11.7 获取登陆 token\",\"slug\":\"_11-7-获取登陆-token\",\"link\":\"#_11-7-获取登陆-token\",\"children\":[]},{\"level\":3,\"title\":\"11.8 登录测试\",\"slug\":\"_11-8-登录测试\",\"link\":\"#_11-8-登录测试\",\"children\":[]}]},{\"level\":2,\"title\":\"12. 集群管理\",\"slug\":\"_12-集群管理\",\"link\":\"#_12-集群管理\",\"children\":[{\"level\":3,\"title\":\"12.1 添加node节点\",\"slug\":\"_12-1-添加node节点\",\"link\":\"#_12-1-添加node节点\",\"children\":[]},{\"level\":3,\"title\":\"12.2 添加master 节点\",\"slug\":\"_12-2-添加master-节点\",\"link\":\"#_12-2-添加master-节点\",\"children\":[]},{\"level\":3,\"title\":\"12.3 验证当前节点\",\"slug\":\"_12-3-验证当前节点\",\"link\":\"#_12-3-验证当前节点\",\"children\":[]}]},{\"level\":2,\"title\":\"13. 集群升级\",\"slug\":\"_13-集群升级\",\"link\":\"#_13-集群升级\",\"children\":[{\"level\":3,\"title\":\"13.1 升级master节点\",\"slug\":\"_13-1-升级master节点\",\"link\":\"#_13-1-升级master节点\",\"children\":[]},{\"level\":3,\"title\":\"13.2 升级node节点\",\"slug\":\"_13-2-升级node节点\",\"link\":\"#_13-2-升级node节点\",\"children\":[]}]}],\"readingTime\":{\"minutes\":35.1,\"words\":10529},\"filePathRelative\":\"k8s/log/kubernetes-1.md\",\"localizedDate\":\"2022年6月1日\",\"excerpt\":\"<p><a href=\\\"https://www.yuque.com/attachments/yuque/0/2023/pdf/33538388/1672721011349-4455b094-61ee-4956-a375-07ad6fc387a1.pdf\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">k8s-实战案例_v1.21.x-部署.pdf</a></p>\\n<p><a name=\\\"lXlPc\\\"></a></p>\\n<h2> 1.基础环境配置</h2>\\n<p><a name=\\\"jRBYX\\\"></a></p>\\n<h3> 1.1 时间同步</h3>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-ext=\\\"sh\\\"><pre class=\\\"language-bash\\\"><code><span class=\\\"token function\\\">ln</span> <span class=\\\"token parameter variable\\\">-sf</span> /usr/share/zoneinfo/Asia/Shanghai /etc/localtime\\n\\n<span class=\\\"token function\\\">cat</span> /etc/default/locale\\n<span class=\\\"token assign-left variable\\\"><span class=\\\"token environment constant\\\">LANG</span></span><span class=\\\"token operator\\\">=</span>en_US.UTF-8\\n<span class=\\\"token assign-left variable\\\"><span class=\\\"token environment constant\\\">LC_TIME</span></span><span class=\\\"token operator\\\">=</span>en_DK.UTF-8 \\n\\n\\n*/5 * * * * /usr/sbin/ntpdate time1.aliyun.com <span class=\\\"token operator\\\">&amp;&gt;</span> /dev/null <span class=\\\"token operator\\\">&amp;&amp;</span> hwclock -w/usr/sbin/ntpdate\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true,\"git\":{\"createdTime\":1677227810000,\"updatedTime\":1677666499000,\"contributors\":[{\"name\":\"Ryanxin\",\"email\":\"ryanxin@xx9z@outlook.com\",\"commits\":3},{\"name\":\"ryanxin7\",\"email\":\"xinxincn0506@outlook.com\",\"commits\":1}]}}")
