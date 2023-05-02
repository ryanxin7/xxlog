const e=JSON.parse(`{"key":"v-5929fda0","path":"/k8s/log/kubernetes-3.html","title":"3. yaml文件语法基础","lang":"zh-CN","frontmatter":{"Author":"Ryan","title":"3. yaml文件语法基础","tag":["k8s进阶训练营"],"category":["k8s"],"date":"2022-06-03T12:12:22.000Z","lastUpdated":true,"breadcrumb":false,"description":"1. yaml格式 人员名单: 张三: 年龄: 18 # 职业: Linux运维工程师 爱好: - 看书 - 学习 - 加班 李四: 年龄: 20 职业: Java开发工程师 # 这是职业 爱好: - 开源技术 - 微服务 - 分布式存储 大小写敏感 使用缩进表示层级关系 缩进时不允许使用Tal键，只允许使用空格 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可 使用”#” 表示注释，从这个字符一直到行尾，都会被解析器忽略 比json更适用于配置文件","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/k8s/log/kubernetes-3.html"}],["meta",{"property":"og:site_name","content":"Ryan's Notebook"}],["meta",{"property":"og:title","content":"3. yaml文件语法基础"}],["meta",{"property":"og:description","content":"1. yaml格式 人员名单: 张三: 年龄: 18 # 职业: Linux运维工程师 爱好: - 看书 - 学习 - 加班 李四: 年龄: 20 职业: Java开发工程师 # 这是职业 爱好: - 开源技术 - 微服务 - 分布式存储 大小写敏感 使用缩进表示层级关系 缩进时不允许使用Tal键，只允许使用空格 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可 使用”#” 表示注释，从这个字符一直到行尾，都会被解析器忽略 比json更适用于配置文件"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-01T10:28:19.000Z"}],["meta",{"property":"article:tag","content":"k8s进阶训练营"}],["meta",{"property":"article:published_time","content":"2022-06-03T12:12:22.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-01T10:28:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"3. yaml文件语法基础\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-03T12:12:22.000Z\\",\\"dateModified\\":\\"2023-03-01T10:28:19.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1. yaml格式","slug":"_1-yaml格式","link":"#_1-yaml格式","children":[{"level":3,"title":"yaml文件主要特性","slug":"yaml文件主要特性","link":"#yaml文件主要特性","children":[]}]},{"level":2,"title":"2.yaml与json对比","slug":"_2-yaml与json对比","link":"#_2-yaml与json对比","children":[{"level":3,"title":"json特点","slug":"json特点","link":"#json特点","children":[]}]},{"level":2,"title":"3. 实践-4创建namespace yaml文件","slug":"_3-实践-4创建namespace-yaml文件","link":"#_3-实践-4创建namespace-yaml文件","children":[]},{"level":2,"title":"","slug":"","link":"#","children":[]},{"level":2,"title":"4.nginx yaml文件详解","slug":"_4-nginx-yaml文件详解","link":"#_4-nginx-yaml文件详解","children":[]},{"level":2,"title":"5.pod 资源清单详细解读","slug":"_5-pod-资源清单详细解读","link":"#_5-pod-资源清单详细解读","children":[]}],"readingTime":{"minutes":9.99,"words":2996},"filePathRelative":"k8s/log/kubernetes-3.md","localizedDate":"2022年6月3日","excerpt":"<p><a name=\\"OkmdV\\"></a></p>\\n<h2> 1. yaml格式</h2>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code>人员名单:\\n  张三:\\n    年龄: <span class=\\"token number\\">18</span> <span class=\\"token comment\\">#</span>\\n    职业: Linux运维工程师\\n    爱好:\\n      - 看书\\n      - 学习\\n      - 加班\\n     \\n  李四:\\n    年龄: <span class=\\"token number\\">20</span>\\n    职业: Java开发工程师 <span class=\\"token comment\\"># 这是职业</span>\\n    爱好:\\n      - 开源技术\\n      - 微服务\\n      - 分布式存储\\n\\n\\n大小写敏感\\n使用缩进表示层级关系\\n 缩进时不允许使用Tal键，只允许使用空格\\n 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可\\n 使用”<span class=\\"token comment\\">#” 表示注释，从这个字符一直到行尾，都会被解析器忽略</span>\\n 比json更适用于配置文件\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true,"git":{"createdTime":1677227810000,"updatedTime":1677666499000,"contributors":[{"name":"Ryanxin","email":"ryanxin@xx9z@outlook.com","commits":3},{"name":"ryanxin7","email":"xinxincn0506@outlook.com","commits":1}]}}`);export{e as data};