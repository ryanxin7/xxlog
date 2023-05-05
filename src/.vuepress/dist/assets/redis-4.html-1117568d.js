import{_ as t,V as i,W as o,Y as s,Z as n,a0 as e,X as p,C as c}from"./framework-8eb1d601.js";const l={},u=p(`<h1 id="应用redis-python-web-session实践" tabindex="-1"><a class="header-anchor" href="#应用redis-python-web-session实践" aria-hidden="true">#</a> 应用Redis python-Web Session实践</h1><p>我们在后面是准备在python web项目中应用redis，所以我们需要在python虚拟环境中安装redis的模块插件，然后才可以正常的应用。redis-py提供两个类Redis和StrictRedis用于实现Redis的命令，StrictRedis用于实现大部分官方的命令，并使用官方的语法和命令，Redis是StrictRedis的子类，用于向后兼容旧版本的redis-py。</p><br><h3 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> <strong>环境准备</strong></h3><p>需要创建一个虚拟环境，为什么要用虚拟环境呢？ 默认情况下在当前操作系统下里面，安装一个版本为3.7的Python 再安装一个版本为3.9的Python 那么就会把之前的版本覆盖掉，那么如果再当前主机中有多个项目时，每个应用都有不同的功能，一个有遗留代码依赖于2.7版本，一个依赖于3.5版本，新的项目要求3.9版本，那么现在如果想要在一个主机把三个app全部运行起来该怎么办？ 那么就需要Python虚拟环境基于目录方式实现多个python版本共存。</p><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/python虚拟环境.png" alt="python虚拟环境" tabindex="0" loading="lazy"><figcaption>python虚拟环境</figcaption></figure><h4 id="软件安装" tabindex="-1"><a class="header-anchor" href="#软件安装" aria-hidden="true">#</a> <strong>软件安装</strong></h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apt install virtualenv 
apt install virtualenvwrapper
定制bash级别的环境变量
cd 
vim .bashrc 
export WORKON_HOME=$HOME/.virtualenvs
source /usr/share/virtualenvwrapper/virtualenvwrapper.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="虚拟环境命令" tabindex="-1"><a class="header-anchor" href="#虚拟环境命令" aria-hidden="true">#</a> <strong>虚拟环境命令</strong></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> workon  切换到指定的虚拟环境
 deactivate 退出虚拟环境
 mkvirtualenv  指定python版本创建虚拟环境
 rmvirtualenv  删除指定的python版本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建虚拟环境" tabindex="-1"><a class="header-anchor" href="#创建虚拟环境" aria-hidden="true">#</a> <strong>创建虚拟环境</strong></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mkvirtualenv <span class="token parameter variable">-p</span> /usr/bin/python2.7 python_v2.7
在指定目录下创建对应版本的python
site-packages
mkvirtualenv <span class="token parameter variable">-p</span> /usr/bin/python3.8 python_v3.8
mkvirtualenv <span class="token parameter variable">-p</span> /usr/bin/python3.9 python_v3.9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="模块安装" tabindex="-1"><a class="header-anchor" href="#模块安装" aria-hidden="true">#</a> <strong>模块安装</strong></h3><div class="language-bawsh line-numbers-mode" data-ext="bawsh"><pre class="language-bawsh"><code>pip install redispy
#python工具集
pip install ipython
#查看安装的package
pip list 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code> WARNING<span class="token punctuation">:</span> Retrying <span class="token punctuation">(</span>Retry<span class="token punctuation">(</span>total<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">,</span> connect<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> read<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> redirect<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> status<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">)</span> after connection broken by <span class="token string">&#39;NewConnectionError(&#39;</span><span class="token operator">&lt;</span>urllib3<span class="token punctuation">.</span>connection<span class="token punctuation">.</span>VerifiedHTTPSConnection <span class="token builtin">object</span> at <span class="token number">0x7fe6924bdcd0</span><span class="token operator">&gt;</span><span class="token punctuation">:</span> Failed to establish a new connection<span class="token punctuation">:</span> <span class="token punctuation">[</span>Errno <span class="token number">101</span><span class="token punctuation">]</span> Network <span class="token keyword">is</span> unreachable<span class="token string">&#39;)&#39;</span><span class="token punctuation">:</span> <span class="token operator">/</span>simple<span class="token operator">/</span>redispy<span class="token operator">/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>出现以上告警，更换pip源为国内源</p>`,17),r={href:"http://mirrors.aliyun.com/pypi/simple/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://pypi.mirrors.ustc.edu.cn/simple/",target:"_blank",rel:"noopener noreferrer"},k={href:"http://pypi.douban.com/simple/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://pypi.tuna.tsinghua.edu.cn/simple/",target:"_blank",rel:"noopener noreferrer"},m={href:"http://pypi.mirrors.ustc.edu.cn/simple/",target:"_blank",rel:"noopener noreferrer"},b=p(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>临时使用： 
可以在使用pip的时候在后面加上-i参数，指定pip源

pip <span class="token function">install</span> scrapy <span class="token parameter variable">-i</span> https://pypi.tuna.tsinghua.edu.cn/simple

<span class="token comment">#注：pip/pip.conf” E212: Cannot open file for writing 问题是要先创建 ~/.pip 文件夹。</span>


永久修改： 
linux: 
修改 ~/.pip/pip.conf <span class="token punctuation">(</span>没有就创建一个<span class="token punctuation">)</span>， 内容如下：

<span class="token comment">#增加配置文件</span>
<span class="token function">mkdir</span> ~/.pip
<span class="token function">vim</span> .pip/pip.conf
<span class="token punctuation">[</span>global<span class="token punctuation">]</span>
  
index-url <span class="token operator">=</span> https://pypi.tuna.tsinghua.edu.cn/simple

<span class="token comment">#pip版本查询</span>
pip <span class="token parameter variable">--version</span>
pip <span class="token number">20.0</span>.2 from /root/.virtualenvs/python_v3.8/lib/python3.8/site-packages/pip <span class="token punctuation">(</span>python <span class="token number">3.8</span><span class="token punctuation">)</span>


windows: 
<span class="token comment">#直接在user目录中创建一个pip目录，如：C:\\Users\\xx\\pip，在pip 目录下新建文件pip.ini，</span>
<span class="token comment">#或者按照网友的建议：win+R 打开用户目录%HOMEPATH%，在此目录下创建 pip 文件夹，在 pip 目录下创建 pip.ini 文件, 内容如下</span>


<span class="token punctuation">[</span>global<span class="token punctuation">]</span>
 
<span class="token function">timeout</span> <span class="token operator">=</span> <span class="token number">6000</span>
 
index-url <span class="token operator">=</span> https://pypi.tuna.tsinghua.edu.cn/simple
 
trusted-host <span class="token operator">=</span> pypi.tuna.tsinghua.edu.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h4 id="简单操作-以string为例" tabindex="-1"><a class="header-anchor" href="#简单操作-以string为例" aria-hidden="true">#</a> 简单操作 - 以String为例</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 导入模块
import redis
# 方法1
r = redis.Redis(host=&#39;127.0.0.1&#39;, port=6379, db=2)
# 方法2
r = redis.StrictRedis(host=&#39;127.0.0.1&#39;, port=6379, db=2)
redis-py使用connection pool来管理对一个redis server的所有连接，避免每次建立、释放连接的开
销。默认，每个Redis实例都会维护一个自己的连接池。当然，我们还可以直接建立一个连接池，然后作为参
数Redis，这样就可以实现多个Redis实例共享一个连接池
# 方法3
pool = redis.ConnectionPool(host=&#39;127.0.0.1&#39;, port=6379)
r = redis.Redis(connection_pool=pool)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/rpy1.png" alt="rpy1" tabindex="0" loading="lazy"><figcaption>rpy1</figcaption></figure><figure><img src="https://xin997.oss-cn-beijing.aliyuncs.com/xinblogs/webimg-Linux/elks/rpy2.png" alt="rpy2" tabindex="0" loading="lazy"><figcaption>rpy2</figcaption></figure><br><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 导入模块</span>
<span class="token keyword">import</span> redis
<span class="token comment"># 创建对象</span>
redis_obj <span class="token operator">=</span> redis<span class="token punctuation">.</span>Redis<span class="token punctuation">(</span>host<span class="token operator">=</span><span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span>port<span class="token operator">=</span><span class="token number">6379</span><span class="token punctuation">,</span>db<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">#调用设置key值</span>
redis_obj<span class="token punctuation">.</span><span class="token builtin">set</span><span class="token punctuation">(</span><span class="token string">&#39;key&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;value&#39;</span><span class="token punctuation">)</span>
<span class="token comment">#获取key值</span>
redis_obj<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;key&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#单值实践</span>
r<span class="token punctuation">.</span><span class="token builtin">set</span><span class="token punctuation">(</span><span class="token string">&#39;key&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">,</span> ex<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span>
或
r<span class="token punctuation">.</span>setex<span class="token punctuation">(</span><span class="token string">&quot;key1&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">&quot;value1&quot;</span><span class="token punctuation">)</span>
r<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;key&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 多值实践</span>
r<span class="token punctuation">.</span>mset<span class="token punctuation">(</span>k1<span class="token operator">=</span><span class="token string">&quot;v1&quot;</span><span class="token punctuation">,</span> k2<span class="token operator">=</span><span class="token string">&quot;v2&quot;</span><span class="token punctuation">)</span>
r<span class="token punctuation">.</span>mset<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&#39;k3&#39;</span><span class="token punctuation">:</span><span class="token string">&quot;v3&quot;</span><span class="token punctuation">,</span> <span class="token string">&#39;k4&#39;</span><span class="token punctuation">:</span><span class="token string">&quot;v4&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
r<span class="token punctuation">.</span>mget<span class="token punctuation">(</span><span class="token string">&#39;k1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;k2&#39;</span><span class="token punctuation">)</span>
r<span class="token punctuation">.</span>mget<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;k3&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;k4&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment"># 自增自减</span>
r<span class="token punctuation">.</span><span class="token builtin">set</span><span class="token punctuation">(</span><span class="token string">&#39;num&#39;</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span>
r<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;num&#39;</span><span class="token punctuation">)</span>
r<span class="token punctuation">.</span>incr<span class="token punctuation">(</span><span class="token string">&#39;num&#39;</span><span class="token punctuation">)</span>
r<span class="token punctuation">.</span>incr<span class="token punctuation">(</span><span class="token string">&#39;num&#39;</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>
r<span class="token punctuation">.</span>incrby<span class="token punctuation">(</span><span class="token string">&#39;num&#39;</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">)</span>
r<span class="token punctuation">.</span>decr<span class="token punctuation">(</span><span class="token string">&#39;num&#39;</span><span class="token punctuation">)</span>
r<span class="token punctuation">.</span>decr<span class="token punctuation">(</span><span class="token string">&#39;num&#39;</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span> 注意：没有decrby
<span class="token comment"># 删除操作</span>
r<span class="token punctuation">.</span>delete<span class="token punctuation">(</span><span class="token string">&#39;num&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 判断存在</span>
r<span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token string">&#39;num&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 模糊匹配</span>
r<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span>
r<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token string">&#39;k*&#39;</span><span class="token punctuation">)</span>
r<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token string">&#39;*2&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 查询数据量</span>
r<span class="token punctuation">.</span>dbsize<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简单实践" tabindex="-1"><a class="header-anchor" href="#简单实践" aria-hidden="true">#</a> 简单实践</h2><p>对于各种web框架来说，只要涉及到redis，基本上都提供了相关的 属性配置，我们这里以简单的 Flask web框架为例。</p><br><h4 id="安装模块" tabindex="-1"><a class="header-anchor" href="#安装模块" aria-hidden="true">#</a> 安装模块</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>pip install Flask
pip install flask<span class="token operator">-</span>session
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br><p><strong>测试运行框架</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token punctuation">(</span>python_v3<span class="token punctuation">.</span><span class="token number">8</span><span class="token punctuation">)</span> root@elkserver<span class="token punctuation">:</span><span class="token operator">~</span><span class="token comment"># vim python_flask.py </span>

<span class="token comment">#导入模块</span>
<span class="token keyword">from</span> flask <span class="token keyword">import</span> Flask

<span class="token comment"># 创建应用对象</span>

app <span class="token operator">=</span> Flask<span class="token punctuation">(</span>__name__<span class="token punctuation">)</span>

<span class="token comment"># 定制路由策略</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token string">&quot;hello-flask app web&quot;</span>

<span class="token comment"># 启动应用</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    app<span class="token punctuation">.</span>run<span class="token punctuation">(</span>host<span class="token operator">=</span><span class="token string">&#39;192.168.10.110&#39;</span><span class="token punctuation">)</span>
    
<span class="token punctuation">(</span>python_v3<span class="token punctuation">.</span><span class="token number">8</span><span class="token punctuation">)</span> root@elkserver<span class="token punctuation">:</span><span class="token operator">~</span><span class="token comment"># python python_flask.py</span>
 <span class="token operator">*</span> Serving Flask app <span class="token string">&#39;python_flask&#39;</span> <span class="token punctuation">(</span>lazy loading<span class="token punctuation">)</span>
 <span class="token operator">*</span> Environment<span class="token punctuation">:</span> production
   WARNING<span class="token punctuation">:</span> This <span class="token keyword">is</span> a development server<span class="token punctuation">.</span> Do <span class="token keyword">not</span> use it <span class="token keyword">in</span> a production deployment<span class="token punctuation">.</span>
   Use a production WSGI server instead<span class="token punctuation">.</span>
 <span class="token operator">*</span> Debug mode<span class="token punctuation">:</span> off
 <span class="token operator">*</span> Running on http<span class="token punctuation">:</span><span class="token operator">//</span><span class="token number">192.168</span><span class="token number">.10</span><span class="token number">.110</span><span class="token punctuation">:</span><span class="token number">5000</span><span class="token operator">/</span> <span class="token punctuation">(</span>Press CTRL<span class="token operator">+</span>C to quit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),g={href:"https://flask-session.readthedocs.io/en/latest/",target:"_blank",rel:"noopener noreferrer"},h=p(`<p><strong>session常用的方法如下</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>get：用来从session中获取指定值。
pop：从session中删除一个值。
keys：从session中获取所有的键。
items：从session中获取所有的值。
clear：清除当前这个用户的session数据。
flush：删除session并且删除在浏览器中存储的session_id，一般在注销的时候用得比较多。
set_expiry(value)：设置过期时间。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#导入模块</span>
<span class="token keyword">from</span> flask <span class="token keyword">import</span> Flask<span class="token punctuation">,</span> session
<span class="token keyword">from</span> flask_session <span class="token keyword">import</span> Session
<span class="token keyword">import</span> redis

<span class="token comment"># 创建应用对象</span>

app <span class="token operator">=</span> Flask<span class="token punctuation">(</span>__name__<span class="token punctuation">)</span>

app<span class="token punctuation">.</span>debug <span class="token operator">=</span> <span class="token boolean">True</span>
app<span class="token punctuation">.</span>secret_key <span class="token operator">=</span> <span class="token string">&#39;x123asdaczxdasd&#39;</span>
app<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&#39;SESSION_TYPE&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;redis&#39;</span>
app<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&#39;SESSION_PERMANENT&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">True</span>
app<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&#39;SESSION_USE_SIGNER&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">False</span>
app<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&#39;SESSION_KEY_PREFIX&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;session:&#39;</span>
app<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&#39;SESSION_REDIS&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> redis<span class="token punctuation">.</span>Redis<span class="token punctuation">(</span>host<span class="token operator">=</span><span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span> port<span class="token operator">=</span><span class="token string">&#39;6379&#39;</span><span class="token punctuation">,</span> db<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">)</span>

Session<span class="token punctuation">(</span>app<span class="token punctuation">)</span>
<span class="token comment"># 定制路由策略</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token string">&quot;hello-flask app web&quot;</span>


<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;/set&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">set_key</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        session<span class="token punctuation">[</span><span class="token string">&#39;user_name&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;zhangsan&quot;</span>
        <span class="token keyword">return</span> <span class="token string">&#39;ok&#39;</span>


<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;/get&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">get_key</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;user_name&#39;</span><span class="token punctuation">,</span><span class="token string">&quot;没有设置username key&quot;</span><span class="token punctuation">)</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;/pop&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">pop_key</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    session<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token string">&#39;user_name&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;user_name&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;pop key&#39;</span><span class="token punctuation">)</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;/clean&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">clean_key</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    session<span class="token punctuation">.</span>clear<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;user_name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;clear key&#39;</span><span class="token punctuation">)</span>


<span class="token comment"># 启动应用</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    app<span class="token punctuation">.</span>run<span class="token punctuation">(</span>host<span class="token operator">=</span><span class="token string">&#39;192.168.10.110&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>启动flask</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>python flask_redis<span class="token punctuation">.</span>py
<span class="token operator">*</span> Serving Flask app <span class="token string">&quot;flask_redis&quot;</span> <span class="token punctuation">(</span>lazy loading<span class="token punctuation">)</span>
<span class="token operator">*</span> Environment<span class="token punctuation">:</span> production
WARNING<span class="token punctuation">:</span> This <span class="token keyword">is</span> a development server<span class="token punctuation">.</span> Do <span class="token keyword">not</span> use it <span class="token keyword">in</span> a production
deployment<span class="token punctuation">.</span>
Use a production WSGI server instead<span class="token punctuation">.</span>
<span class="token operator">*</span> Debug mode<span class="token punctuation">:</span> on
<span class="token operator">*</span> Running on http<span class="token punctuation">:</span><span class="token operator">//</span><span class="token number">0.0</span><span class="token number">.0</span><span class="token number">.0</span><span class="token punctuation">:</span><span class="token number">5000</span><span class="token operator">/</span> <span class="token punctuation">(</span>Press CTRL<span class="token operator">+</span>C to quit<span class="token punctuation">)</span>
<span class="token operator">*</span> Restarting <span class="token keyword">with</span> stat
<span class="token operator">*</span> Debugger <span class="token keyword">is</span> active!
<span class="token operator">*</span> Debugger PIN<span class="token punctuation">:</span> <span class="token number">170</span><span class="token operator">-</span><span class="token number">146</span><span class="token operator">-</span><span class="token number">674</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),y={href:"http://0.0.0.0:5000/index",target:"_blank",rel:"noopener noreferrer"},_=p(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
http<span class="token punctuation">:</span><span class="token operator">//</span><span class="token number">192.168</span><span class="token number">.10</span><span class="token number">.110</span><span class="token punctuation">:</span><span class="token number">5000</span><span class="token operator">/</span><span class="token builtin">set</span>
http<span class="token punctuation">:</span><span class="token operator">//</span><span class="token number">192.168</span><span class="token number">.10</span><span class="token number">.110</span><span class="token punctuation">:</span><span class="token number">5000</span><span class="token operator">/</span>get
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token operator">&gt;</span> select <span class="token number">4</span>
OK
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> KEYS <span class="token operator">*</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;session:8b6dd8af-fca8-4874-b92e-9ef13936287e&quot;</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> get <span class="token string">&quot;session:8b6dd8af-fca8-4874-b92e-9ef13936287e&quot;</span>
<span class="token string">&quot;\\x80\\x04\\x95*\\x00\\x00\\x00\\x00\\x00\\x00\\x00}\\x94(\\x8c\\n_permanent\\x94\\x88\\x8c\\tuser_name\\x94\\x8c\\bzhangsan\\x94u.&quot;</span>


http<span class="token punctuation">:</span><span class="token operator">//</span><span class="token number">192.168</span><span class="token number">.10</span><span class="token number">.110</span><span class="token punctuation">:</span><span class="token number">5000</span><span class="token operator">/</span>pop
get <span class="token string">&quot;session:8b6dd8af-fca8-4874-b92e-9ef13936287e&quot;</span>
<span class="token string">&quot;\\x80\\x04\\x95\\x12\\x00\\x00\\x00\\x00\\x00\\x00\\x00}\\x94\\x8c\\n_permanent\\x94\\x88s.&quot;</span>


http<span class="token punctuation">:</span><span class="token operator">//</span><span class="token number">192.168</span><span class="token number">.10</span><span class="token number">.110</span><span class="token punctuation">:</span><span class="token number">5000</span><span class="token operator">/</span>clean
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token punctuation">:</span><span class="token number">6379</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> KEYS <span class="token operator">*</span>
<span class="token punctuation">(</span>empty array<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function f(x,w){const a=c("ExternalLinkIcon");return i(),o("div",null,[u,s("p",null,[n("阿里云 "),s("a",r,[n("http://mirrors.aliyun.com/pypi/simple/"),e(a)]),n("   中国科技大学 "),s("a",d,[n("https://pypi.mirrors.ustc.edu.cn/simple/"),e(a)]),n("   豆瓣(douban) "),s("a",k,[n("http://pypi.douban.com/simple/"),e(a)]),n("   清华大学 "),s("a",v,[n("https://pypi.tuna.tsinghua.edu.cn/simple/"),e(a)]),n("   中国科学技术大学 "),s("a",m,[n("http://pypi.mirrors.ustc.edu.cn/simple/"),e(a)])]),b,s("p",null,[n("Flask session 官方文档："),s("a",g,[n("https://flask-session.readthedocs.io/en/latest/"),e(a)])]),h,s("p",null,[n("浏览器刷新 "),s("a",y,[n("http://0.0.0.0:5000/index"),e(a)]),n(" ，查看效果")]),_])}const S=t(l,[["render",f],["__file","redis-4.html.vue"]]);export{S as default};
