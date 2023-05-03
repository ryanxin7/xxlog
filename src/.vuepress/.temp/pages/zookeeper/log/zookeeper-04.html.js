export const data = JSON.parse("{\"key\":\"v-4861f12d\",\"path\":\"/zookeeper/log/zookeeper-04.html\",\"title\":\"ZooKeeper 分布式锁案例\",\"lang\":\"zh-CN\",\"frontmatter\":{\"Author\":\"Ryan\",\"title\":\"ZooKeeper 分布式锁案例\",\"tag\":[\"zookeeper\"],\"category\":[\"运维技术栈\"],\"date\":\"2021-10-08T21:13:01.000Z\",\"description\":\"ZooKeeper 分布式锁案例 什么叫做分布式锁呢？ 比如说\\\"进程 1\\\"在使用该资源的时候，会先去获得锁，\\\"进程 1\\\"获得锁以后会对该资源保持独占，这样其他进程就无法访问该资源，\\\"进程 1\\\"用完该资源以后就将锁释放掉，让其 他进程来获得锁，那么通过这个锁机制，我们就能保证了分布式系统中多个进程能够有序的 访问该临界资源。那么我们把这个分布式环境下的这个锁叫作分布式锁。 分布式锁案例\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/zookeeper/log/zookeeper-04.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Ryan's Notebook\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"ZooKeeper 分布式锁案例\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"ZooKeeper 分布式锁案例 什么叫做分布式锁呢？ 比如说\\\"进程 1\\\"在使用该资源的时候，会先去获得锁，\\\"进程 1\\\"获得锁以后会对该资源保持独占，这样其他进程就无法访问该资源，\\\"进程 1\\\"用完该资源以后就将锁释放掉，让其 他进程来获得锁，那么通过这个锁机制，我们就能保证了分布式系统中多个进程能够有序的 访问该临界资源。那么我们把这个分布式环境下的这个锁叫作分布式锁。 分布式锁案例\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-05-02T00:25:35.000Z\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"zookeeper\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-10-08T21:13:01.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-05-02T00:25:35.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"ZooKeeper 分布式锁案例\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-10-08T21:13:01.000Z\\\",\\\"dateModified\\\":\\\"2023-05-02T00:25:35.000Z\\\",\\\"author\\\":[]}\"]]},\"headers\":[{\"level\":2,\"title\":\"Curator 框架实现分布式锁案例\",\"slug\":\"curator-框架实现分布式锁案例\",\"link\":\"#curator-框架实现分布式锁案例\",\"children\":[{\"level\":3,\"title\":\"原生的 Java API 开发存在的问题\",\"slug\":\"原生的-java-api-开发存在的问题\",\"link\":\"#原生的-java-api-开发存在的问题\",\"children\":[]},{\"level\":3,\"title\":\"Curator 案例实操\",\"slug\":\"curator-案例实操\",\"link\":\"#curator-案例实操\",\"children\":[]}]}],\"readingTime\":{\"minutes\":2.25,\"words\":675},\"filePathRelative\":\"zookeeper/log/zookeeper-04.md\",\"localizedDate\":\"2021年10月9日\",\"excerpt\":\"<h1> ZooKeeper 分布式锁案例</h1>\\n<p>什么叫做分布式锁呢？ 比如说\\\"进程 1\\\"在使用该资源的时候，会先去获得锁，\\\"进程 1\\\"获得锁以后会对该资源保持独占，这样其他进程就无法访问该资源，\\\"进程 1\\\"用完该资源以后就将锁释放掉，让其 他进程来获得锁，那么通过这个锁机制，我们就能保证了分布式系统中多个进程能够有序的 访问该临界资源。那么我们把这个分布式环境下的这个锁叫作分布式锁。</p>\\n<figure><img src=\\\"https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/image-20211221142619853.png\\\" alt=\\\"分布式锁案例\\\" tabindex=\\\"0\\\" loading=\\\"lazy\\\"><figcaption>分布式锁案例</figcaption></figure>\",\"autoDesc\":true,\"git\":{\"createdTime\":1682987135000,\"updatedTime\":1682987135000,\"contributors\":[{\"name\":\"ryanxin7\",\"email\":\"xinxincn0506@outlook.com\",\"commits\":1}]}}")
