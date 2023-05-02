const l=JSON.parse(`{"key":"v-9de50776","path":"/mysql/log/dba02.html","title":"体系结构及管理","lang":"zh-CN","frontmatter":{"title":"体系结构及管理","tag":["DBA","RDBMS"],"category":["DBA"],"date":"2020-07-12T12:43:01.000Z","description":"体系结构及管理 1. MySQL C/S结构介绍 两种连接方式： TCP/IP：mysql -uroot -xin123 -h 10.0.0.51 -P3306 Socket：mysql -uroot -xin123 -S /tmp/mysql.sock 2. MySQL实例的构成 举例说明：","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/mysql/log/dba02.html"}],["meta",{"property":"og:site_name","content":"Ryan's Notebook"}],["meta",{"property":"og:title","content":"体系结构及管理"}],["meta",{"property":"og:description","content":"体系结构及管理 1. MySQL C/S结构介绍 两种连接方式： TCP/IP：mysql -uroot -xin123 -h 10.0.0.51 -P3306 Socket：mysql -uroot -xin123 -S /tmp/mysql.sock 2. MySQL实例的构成 举例说明："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-02T00:25:35.000Z"}],["meta",{"property":"article:tag","content":"DBA"}],["meta",{"property":"article:tag","content":"RDBMS"}],["meta",{"property":"article:published_time","content":"2020-07-12T12:43:01.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-02T00:25:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"体系结构及管理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-07-12T12:43:01.000Z\\",\\"dateModified\\":\\"2023-05-02T00:25:35.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1. MySQL C/S结构介绍","slug":"_1-mysql-c-s结构介绍","link":"#_1-mysql-c-s结构介绍","children":[]},{"level":2,"title":"2. MySQL实例的构成","slug":"_2-mysql实例的构成","link":"#_2-mysql实例的构成","children":[]},{"level":2,"title":"3. MySQL中 mysqld 进程结构","slug":"_3-mysql中-mysqld-进程结构","link":"#_3-mysql中-mysqld-进程结构","children":[{"level":3,"title":"3.1 SQL语句引入","slug":"_3-1-sql语句引入","link":"#_3-1-sql语句引入","children":[]},{"level":3,"title":"3.2 连接层","slug":"_3-2-连接层","link":"#_3-2-连接层","children":[]},{"level":3,"title":"3.3 SQL层（在优化方面至关重要）","slug":"_3-3-sql层-在优化方面至关重要","link":"#_3-3-sql层-在优化方面至关重要","children":[]},{"level":3,"title":"3.4 存储引擎层","slug":"_3-4-存储引擎层","link":"#_3-4-存储引擎层","children":[]},{"level":3,"title":"3.5 MySQL逻辑存储结构","slug":"_3-5-mysql逻辑存储结构","link":"#_3-5-mysql逻辑存储结构","children":[]},{"level":3,"title":"3.6 MySQL物理存储结构","slug":"_3-6-mysql物理存储结构","link":"#_3-6-mysql物理存储结构","children":[]},{"level":3,"title":"3.7 innodb 段 区 页概念","slug":"_3-7-innodb-段-区-页概念","link":"#_3-7-innodb-段-区-页概念","children":[]}]},{"level":2,"title":"4. 用户和权限管理","slug":"_4-用户和权限管理","link":"#_4-用户和权限管理","children":[{"level":3,"title":"4.1作用","slug":"_4-1作用","link":"#_4-1作用","children":[]},{"level":3,"title":"4.2 用户的定义","slug":"_4-2-用户的定义","link":"#_4-2-用户的定义","children":[]},{"level":3,"title":"4.3 用户的操作","slug":"_4-3-用户的操作","link":"#_4-3-用户的操作","children":[]},{"level":3,"title":"4.4 权限管理","slug":"_4-4-权限管理","link":"#_4-4-权限管理","children":[]}]},{"level":2,"title":"5. MySQL的启动和关闭","slug":"_5-mysql的启动和关闭","link":"#_5-mysql的启动和关闭","children":[{"level":3,"title":"5.1 日常启停","slug":"_5-1-日常启停","link":"#_5-1-日常启停","children":[]},{"level":3,"title":"5.2 维护性的任务方式启动","slug":"_5-2-维护性的任务方式启动","link":"#_5-2-维护性的任务方式启动","children":[]},{"level":3,"title":"5.3 初始化配置","slug":"_5-3-初始化配置","link":"#_5-3-初始化配置","children":[]},{"level":3,"title":"5.4 配置文件读取顺序","slug":"_5-4-配置文件读取顺序","link":"#_5-4-配置文件读取顺序","children":[]},{"level":3,"title":"5.5 MySQL的连接管理","slug":"_5-5-mysql的连接管理","link":"#_5-5-mysql的连接管理","children":[]}]},{"level":2,"title":"6. 多实例管理","slug":"_6-多实例管理","link":"#_6-多实例管理","children":[{"level":3,"title":"6.1 准备环境","slug":"_6-1-准备环境","link":"#_6-1-准备环境","children":[]},{"level":3,"title":"6.2 初始化三套数据","slug":"_6-2-初始化三套数据","link":"#_6-2-初始化三套数据","children":[]},{"level":3,"title":"6.3 Systemd 命令管理多实例","slug":"_6-3-systemd-命令管理多实例","link":"#_6-3-systemd-命令管理多实例","children":[]},{"level":3,"title":"6.4 启动多实例","slug":"_6-4-启动多实例","link":"#_6-4-启动多实例","children":[]}]}],"readingTime":{"minutes":7.25,"words":2174},"filePathRelative":"mysql/log/dba02.md","localizedDate":"2020年7月12日","excerpt":"<h1> 体系结构及管理</h1>\\n<h2> 1. MySQL C/S结构介绍</h2>\\n<br>\\n<p><strong>两种连接方式：</strong></p>\\n<p><strong>TCP/IP：</strong><code>mysql -uroot -xin123 -h 10.0.0.51 -P3306</code></p>\\n<p><strong>Socket：</strong><code>mysql -uroot -xin123 -S /tmp/mysql.sock</code></p>\\n<br>\\n<br>\\n<h2> 2. MySQL实例的构成</h2>\\n<br>\\n<p><strong>举例说明：</strong></p>","autoDesc":true,"git":{"createdTime":1682727888000,"updatedTime":1682987135000,"contributors":[{"name":"ryanxin7","email":"xinxincn0506@outlook.com","commits":2}]}}`);export{l as data};