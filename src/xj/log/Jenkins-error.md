---
Author: Ryan
title: 安装 Jenkins 遇到的问题
tag: 
    - CI/CD
category: 
   - Jenkins
date: 2023-5-16 12:12:22
lastUpdated: true
#sidebar: false
breadcrumb: false
#contributors: false
---

## 安装 Jenkins 遇到的问题



## **问题一**

```bash
root@server:/apps# systemctl restart jenkins.service 
Job for jenkins.service failed because the control process exited with error code.
See "systemctl status jenkins.service" and "journalctl -xe" for details.
root@server:/apps# 
root@server:/apps# systemctl status jenkins.service
● jenkins.service - Jenkins Continuous Integration Server
     Loaded: loaded (/lib/systemd/system/jenkins.service; enabled; vendor preset: enabled)
     Active: failed (Result: exit-code) since Tue 2023-05-16 16:36:43 CST; 5s ago
    Process: 168567 ExecStart=/usr/bin/jenkins (code=exited, status=1/FAILURE)
   Main PID: 168567 (code=exited, status=1/FAILURE)

May 16 16:36:43 server systemd[1]: jenkins.service: Scheduled restart job, restart counter is at 5.
May 16 16:36:43 server systemd[1]: Stopped Jenkins Continuous Integration Server.
May 16 16:36:43 server systemd[1]: jenkins.service: Start request repeated too quickly.
May 16 16:36:43 server systemd[1]: jenkins.service: Failed with result 'exit-code'.
May 16 16:36:43 server systemd[1]: Failed to start Jenkins Continuous Integration Server.
```



网上查询解决方法 修改`/lib/systemd/system/jenkins.service`

```bash
# The Java home directory. When left empty, JENKINS_JAVA_CMD and PATH are consulted.
Environment="JAVA_HOME=/usr/local/jdk/"

systemctl daemon-reload 
```



修改后仍然`Failed to start Jenkins Continuous Integration Server`



**经过在官网查询** <br>

**2.361.1 以后的版本需要 java 11 或 java 17 ，java 8 无法正常使用。**

![image-20230516174854447](http://cdn1.ryanxin.live/image-20230516174854447.png)

**更换java 17** 

```bash
root@server:/apps# rm /usr/local/jdk
root@server:/apps# rm /usr/bin/java 


root@server:/apps# ln -sv /apps/jdk-17.0.6/ /usr/local/jdk
'/usr/local/jdk' -> '/apps/jdk-17.0.6/'

root@server:/apps# ln -sv /apps/jdk-17.0.6/bin/java  /usr/bin/java
'/usr/bin/java' -> '/apps/jdk-17.0.6/bin/java'


#查看版本
java version "17.0.6" 2023-01-17 LTS
Java(TM) SE Runtime Environment (build 17.0.6+9-LTS-190)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.6+9-LTS-190, mixed mode, sharing)
```





## 问题二：

启动 **直接卡住**半天 🤣

```
root@server:/apps# systemctl start jenkins.service




^C
```



<br>



**查看日志**

也看不出来啥

```bash
root@server:/apps# journalctl -xe
May 16 16:53:44 server jenkins[300962]:         at java.desktop/sun.font.SunFontManager$2.run(SunFontManager.java:358)
May 16 16:53:44 server jenkins[300962]:         at java.desktop/sun.font.SunFontManager$2.run(SunFontManager.java:315)
May 16 16:53:44 server jenkins[300962]:         at java.base/java.security.AccessController.doPrivileged(AccessController.java:318)
May 16 16:53:44 server jenkins[300962]:         at java.desktop/sun.font.SunFontManager.<init>(SunFontManager.java:315)
May 16 16:53:44 server jenkins[300962]:         at java.desktop/sun.awt.FcFontManager.<init>(FcFontManager.java:35)
May 16 16:53:44 server jenkins[300962]:         at java.desktop/sun.awt.X11FontManager.<init>(X11FontManager.java:56)
May 16 16:53:44 server jenkins[300962]: Caused: java.lang.reflect.InvocationTargetException
May 16 16:53:44 server jenkins[300962]:         at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
May 16 16:53:44 server jenkins[300962]:         at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:77)
May 16 16:53:44 server jenkins[300962]:         at java.base/jdk.internal.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
May 16 16:53:44 server jenkins[300962]:         at java.base/java.lang.reflect.Constructor.newInstanceWithCaller(Constructor.java:499)
May 16 16:53:44 server jenkins[300962]:         at java.base/java.lang.reflect.Constructor.newInstance(Constructor.java:480)
May 16 16:53:44 server jenkins[300962]:         at java.desktop/sun.font.FontManagerFactory$1.run(FontManagerFactory.java:85)
May 16 16:53:44 server jenkins[300962]: Caused: java.lang.InternalError
May 16 16:53:44 server jenkins[300962]:         at java.desktop/sun.font.FontManagerFactory$1.run(FontManagerFactory.java:87)
May 16 16:53:44 server jenkins[300962]:         at java.base/java.security.AccessController.doPrivileged(AccessController.java:318)
May 16 16:53:44 server jenkins[300962]:         at java.desktop/sun.font.FontManagerFactory.getInstance(FontManagerFactory.java:75)
May 16 16:53:44 server jenkins[300962]:         at java.desktop/java.awt.Font.getFont2D(Font.java:526)
May 16 16:53:44 server jenkins[300962]:         at java.desktop/java.awt.Font.getFamily(Font.java:1436)
May 16 16:53:44 server jenkins[300962]:         at java.desktop/java.awt.Font.getFamily_NoClientCode(Font.java:1410)
May 16 16:53:44 server jenkins[300962]:         at java.desktop/java.awt.Font.getFamily(Font.java:1402)
May 16 16:53:44 server jenkins[300962]:         at java.desktop/java.awt.Font.toString(Font.java:1895)
May 16 16:53:44 server jenkins[300962]:         at hudson.util.ChartUtil.<clinit>(ChartUtil.java:270)
May 16 16:53:44 server jenkins[300962]:         at hudson.WebAppMain.contextInitialized(WebAppMain.java:217)
May 16 16:53:44 server jenkins[300962]: Caused: hudson.util.AWTProblem
May 16 16:53:44 server jenkins[300962]:         at hudson.WebAppMain.contextInitialized(WebAppMain.java:218)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.server.handler.ContextHandler.callContextInitialized(ContextHandler.java:1048)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.servlet.ServletContextHandler.callContextInitialized(ServletContextHandler.java:624)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.server.handler.ContextHandler.contextInitialized(ContextHandler.java:983)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.servlet.ServletHandler.initialize(ServletHandler.java:740)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.servlet.ServletContextHandler.startContext(ServletContextHandler.java:392)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.webapp.WebAppContext.startContext(WebAppContext.java:1304)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.server.handler.ContextHandler.doStart(ContextHandler.java:900)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.servlet.ServletContextHandler.doStart(ServletContextHandler.java:306)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.webapp.WebAppContext.doStart(WebAppContext.java:532)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.util.component.AbstractLifeCycle.start(AbstractLifeCycle.java:93)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.util.component.ContainerLifeCycle.start(ContainerLifeCycle.java:171)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.server.Server.start(Server.java:470)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.util.component.ContainerLifeCycle.doStart(ContainerLifeCycle.java:114)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.server.handler.AbstractHandler.doStart(AbstractHandler.java:89)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.server.Server.doStart(Server.java:415)
May 16 16:53:44 server jenkins[300962]:         at org.eclipse.jetty.util.component.AbstractLifeCycle.start(AbstractLifeCycle.java:93)
May 16 16:53:44 server jenkins[300962]:         at winstone.Launcher.<init>(Launcher.java:168)
May 16 16:53:44 server jenkins[300962]:         at winstone.Launcher.main(Launcher.java:390)
May 16 16:53:44 server jenkins[300962]:         at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
May 16 16:53:44 server jenkins[300962]:         at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77)
May 16 16:53:44 server jenkins[300962]:         at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
May 16 16:53:44 server jenkins[300962]:         at java.base/java.lang.reflect.Method.invoke(Method.java:568)
May 16 16:53:44 server jenkins[300962]:         at executable.Main.main(Main.java:347)
May 16 16:53:45 server jenkins[300962]: 2023-05-16 08:53:45.172+0000 [id=1]        INFO        o.e.j.s.handler.ContextHandler#doStart: Started w.@11841b15{Jenkins v2.387.3,/,file:///var/cache/jenkins/war/,AVAILABLE}{/var/cache/jenkins/war}
May 16 16:53:45 server jenkins[300962]: 2023-05-16 08:53:45.185+0000 [id=1]        INFO        o.e.j.server.AbstractConnector#doStart: Started ServerConnector@1da51a35{HTTP/1.1, (http/1.1)}{0.0.0.0:80}
May 16 16:53:45 server jenkins[300962]: 2023-05-16 08:53:45.196+0000 [id=1]        INFO        org.eclipse.jetty.server.Server#doStart: Started Server@2d127a61{STARTING}[10.0.13,sto=0] @1745ms
May 16 16:53:45 server jenkins[300962]: 2023-05-16 08:53:45.197+0000 [id=26]        INFO        winstone.Logger#logInternal: Winstone Servlet Engine running: controlPort=disabled
```



**经过大量的查询终于找到解决方法**：

是需要下载安装字体fontconfig

```bash
#Centos
yum install fontconfig

#Ubuntu
apt-get install fontconfig
```



**注意：要先停掉Jenkins  在安装字体否则安装不上。**





## **问题三：**



Jenkins 一直卡在 Please wait while Jenkins is getting ready to work ...

![](http://cdn1.ryanxin.live/xxlog/image-20230516201248296.png)

```bash
find / -name *.UpdateCenter.xml 
/var/lib/jenkins/hudson.model.UpdateCenter.xml
find: ‘/proc/1834928’: No such file or directory
find: ‘/proc/1834940’: No such file or directory
find: ‘/proc/1834942’: No such file or directory
```

`https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json`

该url是国内的清华大学的镜像地址（建议使用清华大学的镜像服务器，修改后刷新页面即可.

```bash

vim /var/lib/jenkins/hudson.model.UpdateCenter.xml
<?xml version='1.1' encoding='UTF-8'?>
<sites>
  <site>
    <id>default</id>
    <url>https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json</url>
  </site>
</sites>
```







