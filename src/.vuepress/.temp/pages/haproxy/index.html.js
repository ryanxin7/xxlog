export const data = JSON.parse("{\"key\":\"v-4a0dc89a\",\"path\":\"/haproxy/\",\"title\":\"HAProxy\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"HAProxy\",\"icon\":\"fuzaijunheng\",\"tag\":[\"HAproxy\"],\"description\":\"一、负载均衡简介 负载均衡(Load Balance，简称LB)是一种服务或基于硬件设备等实现的高可用反向代理技术，负载均衡将特定的业务(web服务、网络流量等)分担给指定的一个或多个后端特定的服务器或设备，从而提高了公司业务的并发处理能力、保证了业务的高可用性、方便了业务后期的水平动态扩展 。 1.1 为什么使用负载均衡 Web服务器的动态水平扩展--&gt;对用户无感知 增加业务并发访问及处理能力--&gt;解决单服务器瓶颈问题 节约公网IP地址--&gt;降低IT支出成本 隐藏内部服务器IP--&gt;提高内部服务器安全性 配置简单--&gt;固定格式的配置文件 功能丰富--&gt;支持四层和七层，支持动态下线主机 性能较强--&gt;并发数万甚至数十万\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/haproxy/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"HAProxy\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"一、负载均衡简介 负载均衡(Load Balance，简称LB)是一种服务或基于硬件设备等实现的高可用反向代理技术，负载均衡将特定的业务(web服务、网络流量等)分担给指定的一个或多个后端特定的服务器或设备，从而提高了公司业务的并发处理能力、保证了业务的高可用性、方便了业务后期的水平动态扩展 。 1.1 为什么使用负载均衡 Web服务器的动态水平扩展--&gt;对用户无感知 增加业务并发访问及处理能力--&gt;解决单服务器瓶颈问题 节约公网IP地址--&gt;降低IT支出成本 隐藏内部服务器IP--&gt;提高内部服务器安全性 配置简单--&gt;固定格式的配置文件 功能丰富--&gt;支持四层和七层，支持动态下线主机 性能较强--&gt;并发数万甚至数十万\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-04-28T04:09:45.000Z\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"HAproxy\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-04-28T04:09:45.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"HAProxy\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":\\\"2023-04-28T04:09:45.000Z\\\",\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"一、负载均衡简介\",\"slug\":\"一、负载均衡简介\",\"link\":\"#一、负载均衡简介\",\"children\":[{\"level\":3,\"title\":\"1.1 为什么使用负载均衡\",\"slug\":\"_1-1-为什么使用负载均衡\",\"link\":\"#_1-1-为什么使用负载均衡\",\"children\":[]},{\"level\":3,\"title\":\"1.2 负载均衡类型\",\"slug\":\"_1-2-负载均衡类型\",\"link\":\"#_1-2-负载均衡类型\",\"children\":[]},{\"level\":3,\"title\":\"1.3 应用场景\",\"slug\":\"_1-3-应用场景\",\"link\":\"#_1-3-应用场景\",\"children\":[]}]},{\"level\":2,\"title\":\"二、HAProxy介绍\",\"slug\":\"二、haproxy介绍\",\"link\":\"#二、haproxy介绍\",\"children\":[{\"level\":3,\"title\":\"2.1 企业版：\",\"slug\":\"_2-1-企业版\",\"link\":\"#_2-1-企业版\",\"children\":[]},{\"level\":3,\"title\":\"2.2 社区版\",\"slug\":\"_2-2-社区版\",\"link\":\"#_2-2-社区版\",\"children\":[]},{\"level\":3,\"title\":\"2.3 版本对比\",\"slug\":\"_2-3-版本对比\",\"link\":\"#_2-3-版本对比\",\"children\":[]},{\"level\":3,\"title\":\"HAProxy功能\",\"slug\":\"haproxy功能\",\"link\":\"#haproxy功能\",\"children\":[]}]}],\"readingTime\":{\"minutes\":2.7,\"words\":809},\"filePathRelative\":\"haproxy/README.md\",\"excerpt\":\"<p><a name=\\\"rwDmz\\\"></a></p>\\n<h2> 一、负载均衡简介 <br></h2>\\n<p>负载均衡(Load Balance，简称LB)是一种服务或基于硬件设备等实现的高可用反向代理技术，负载均衡将特定的业务(web服务、网络流量等)分担给指定的一个或多个后端特定的服务器或设备，从而提高了公司业务的并发处理能力、保证了业务的高可用性、方便了业务后期的水平动态扩展 。</p>\\n<p><a name=\\\"yfLnN\\\"></a></p>\\n<h3> 1.1 为什么使用负载均衡 <br></h3>\\n<ul>\\n<li>Web服务器的动态水平扩展--&gt;对用户无感知</li>\\n<li>增加业务并发访问及处理能力--&gt;解决单服务器瓶颈问题</li>\\n<li>节约公网IP地址--&gt;降低IT支出成本</li>\\n<li>隐藏内部服务器IP--&gt;提高内部服务器安全性</li>\\n<li>配置简单--&gt;固定格式的配置文件</li>\\n<li>功能丰富--&gt;支持四层和七层，支持动态下线主机</li>\\n<li>性能较强--&gt;并发数万甚至数十万 <br> <br>\\n<a name=\\\"EO2f2\\\"></a></li>\\n</ul>\",\"autoDesc\":true,\"git\":{\"createdTime\":1678244413000,\"updatedTime\":1682654985000,\"contributors\":[{\"name\":\"ryanxin7\",\"email\":\"xinxincn0506@outlook.com\",\"commits\":2}]}}")
