---
Author: Ryan
title: Git常用命令与常见问题
tag: 
    - Git
category: 
   - 持续集成
date: 2022-6-2 12:12:22
lastUpdated: true
#sidebar: false
breadcrumb: false
#contributors: false
---



## Git常用命令与常见问题









### git error: Your local changes to the following files would be overwritten by merge 解决方案



背景

团队其他成员修改了某文件并已提交入库，你在pull之前修改了本地该文件，等你修改完代码再pull时，这时会报错如下错误：

`error: Your local changes to the following files would be overwritten by merge`



解决方案

根据是否要保存本地修改，有以下两种解决方案



1. **保留修改**

```bash
#执行以下三条命令
git stash #封存修改
git pull origin master
git stash pop #把修改还原
```



注：

`git stash`：备份当前工作区内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前工作区内容保存到Git栈中

`git pull`：拉取服务器上当前分支代码。

`git stash pop`：从Git栈中读取最近一次保存的内容，恢复工作区相关内容。同时，用户可能进行多次stash操作，需要保证后stash的最先被取到，所以用栈（先进后出）来管理；pop取栈顶的内容并恢复

`git stash list`：显示Git栈内的所有备份，可以利用这个列表来决定从那个地方恢复。

`git stash clear`：清空Git栈



 2.**废弃修改**

核心思想就是版本回退，具体命令如下

```bash
git reset --hard
git pull origin master
```

注：不建议使用第二种。除非你再三确定不需要本地的修改了。






### 使用git时显示untracked files（未监控）解决办法

问题：
**git status** 时除了显示自己修改的文件，还多了两个文件，显示如下：

```bash
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .package-lock.json
```



在编译git库拉下来的代码时，往往会产生一些中间文件，这些文件我们根本不需要，尤其是在成产环节做[预编译](https://so.csdn.net/so/search?q=预编译&spm=1001.2101.3001.7020)，检查代码提交是否能编译通过这种case时，我们往往需要编译完成后不管正确与否，还原现场，以方便下次sync代码时不受上一次的编译影响。



解决办法：删除git库中untracked files（未监控）的文件：

```bash
#1.删除 untracked files：
git clean -f

#2.连 untracked 的目录也一起删掉：
git clean -fd

#3.连 gitignore 的untrack 文件/目录也一起删掉 （慎用，一般这个是用来删掉编译出来的 .o之类的文件用的）
git clean -xfd

```



**注意：**

在用上述 `git clean` 前，强烈建议加上 `-n` 参数来先看看会删掉哪些文件，防止重要文件被误删：

```
git clean -nxfd
git clean -nf
git clean -nfd
```



