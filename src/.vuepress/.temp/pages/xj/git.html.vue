<template><div><h2 id="git常用命令与常见问题" tabindex="-1"><a class="header-anchor" href="#git常用命令与常见问题" aria-hidden="true">#</a> Git常用命令与常见问题</h2>
<h3 id="git-error-your-local-changes-to-the-following-files-would-be-overwritten-by-merge-解决方案" tabindex="-1"><a class="header-anchor" href="#git-error-your-local-changes-to-the-following-files-would-be-overwritten-by-merge-解决方案" aria-hidden="true">#</a> git error: Your local changes to the following files would be overwritten by merge 解决方案</h3>
<p>背景</p>
<p>团队其他成员修改了某文件并已提交入库，你在pull之前修改了本地该文件，等你修改完代码再pull时，这时会报错如下错误：</p>
<p><code v-pre>error: Your local changes to the following files would be overwritten by merge</code></p>
<p>解决方案</p>
<p>根据是否要保存本地修改，有以下两种解决方案</p>
<ol>
<li><strong>保留修改</strong></li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#执行以下三条命令</span>
<span class="token function">git</span> stash <span class="token comment">#封存修改</span>
<span class="token function">git</span> pull origin master
<span class="token function">git</span> stash pop <span class="token comment">#把修改还原</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p>
<p><code v-pre>git stash</code>：备份当前工作区内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前工作区内容保存到Git栈中</p>
<p><code v-pre>git pull</code>：拉取服务器上当前分支代码。</p>
<p><code v-pre>git stash pop</code>：从Git栈中读取最近一次保存的内容，恢复工作区相关内容。同时，用户可能进行多次stash操作，需要保证后stash的最先被取到，所以用栈（先进后出）来管理；pop取栈顶的内容并恢复</p>
<p><code v-pre>git stash list</code>：显示Git栈内的所有备份，可以利用这个列表来决定从那个地方恢复。</p>
<p><code v-pre>git stash clear</code>：清空Git栈</p>
<p>2.<strong>废弃修改</strong></p>
<p>核心思想就是版本回退，具体命令如下</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> reset <span class="token parameter variable">--hard</span>
<span class="token function">git</span> pull origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注：不建议使用第二种。除非你再三确定不需要本地的修改了。</p>
<h3 id="使用git时显示untracked-files-未监控-解决办法" tabindex="-1"><a class="header-anchor" href="#使用git时显示untracked-files-未监控-解决办法" aria-hidden="true">#</a> 使用git时显示untracked files（未监控）解决办法</h3>
<p>问题：
<strong>git status</strong> 时除了显示自己修改的文件，还多了两个文件，显示如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> status
On branch main
Your branch is up to <span class="token function">date</span> with <span class="token string">'origin/main'</span><span class="token builtin class-name">.</span>

Untracked files:
  <span class="token punctuation">(</span>use <span class="token string">"git add &lt;file>..."</span> to include <span class="token keyword">in</span> what will be committed<span class="token punctuation">)</span>
        .package-lock.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在编译git库拉下来的代码时，往往会产生一些中间文件，这些文件我们根本不需要，尤其是在成产环节做<a href="https://so.csdn.net/so/search?q=%E9%A2%84%E7%BC%96%E8%AF%91&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">预编译<ExternalLinkIcon/></a>，检查代码提交是否能编译通过这种case时，我们往往需要编译完成后不管正确与否，还原现场，以方便下次sync代码时不受上一次的编译影响。</p>
<p>解决办法：删除git库中untracked files（未监控）的文件：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#1.删除 untracked files：</span>
<span class="token function">git</span> clean <span class="token parameter variable">-f</span>

<span class="token comment">#2.连 untracked 的目录也一起删掉：</span>
<span class="token function">git</span> clean <span class="token parameter variable">-fd</span>

<span class="token comment">#3.连 gitignore 的untrack 文件/目录也一起删掉 （慎用，一般这个是用来删掉编译出来的 .o之类的文件用的）</span>
<span class="token function">git</span> clean <span class="token parameter variable">-xfd</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong></p>
<p>在用上述 <code v-pre>git clean</code> 前，强烈建议加上 <code v-pre>-n</code> 参数来先看看会删掉哪些文件，防止重要文件被误删：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>git clean -nxfd
git clean -nf
git clean -nfd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


