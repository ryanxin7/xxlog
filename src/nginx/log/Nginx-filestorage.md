---
title: 使用Nginx构建文件仓库
tag: 
    - Nginx
    - 运维实战
category: 
   - 运维技术栈
date: 2020-6-1 11:11:22
---

# 使用Nginx构建文件仓库



使用`Nginx autoindex` 配置一个文件下载站点，将一些常用的安装包放上去，以提供用户下载，适用于公司部门内部软件分享这种类似的工作，比 FTP 配置简单，能实现限制速度等，只是上传需要手动上传到服务器。



## 编译安装Nginx

服务器版本为：Ubuntu 20.4

1、新建项目目录，其规划如下：

```bash
mkdir -p /data/{logs,packages,services,backup,shell}
```

目录规划说明如下：

```go
/data/       // 用户工作目录
├── backup   // 文件，数据备份目录
├── logs     // 日志目录
├── packages // 安装包存放目录
├── services // 服务安装目录
└── shell    // 脚本存放目录
```

2、安装服务编译所需依赖：

```bash
apt-get install -y  zip unzip gcc gcc-c++ automake autoconf libtool make glibc gd-devel pcre-devel libmcrypt-devel mhash-devel libxslt-devel libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel libxml2 libxml2-devel zlib zlib-devel glibc glibc-devel glib2 glib2-devel bzip2 bzip2-devel ncurses ncurses-devel curl curl-devel e2fsprogs e2fsprogs-devel krb5 krb5-devel libidn libidn-devel openssl openssl-devel libevent libevent-devel GeoIP GeoIP-devel GeoIP-data 
libssl-dev
```

3、下载安装包并查看参数：

 使用当前最新稳定版 `nginx 1.20.2`

```
# 创建下载目录并下载安装包
cd /data/packages/
mkdir nginx-1.20.2
cd nginx-1.20.2/
wget http://nginx.org/download/nginx-1.20.2.tar.gz

# 解压并查看编译参数
tar -zxf nginx-1.20.2.tar.gz 
cd nginx-1.20.2
./configure --help
```

4、需要准备的其它包

```
# PCRE
https://ftp.pcre.org/pub/pcre/

# Zlib
http://www.zlib.net/

# Openssl
https://www.openssl.org/source/
```

至此，安装包包含如下：

```
/data/packages/
└── nginx-1.20.2
    ├── nginx-1.20.2.tar.gz
    ├── openssl-3.0.1.tar.gz
    ├── pcre-8.45.tar.gz
    └── zlib-1.2.11.tar.gz
```

5、基本的编译安装参数：

```sh
# 解压依赖包
cd /data/packages/
tar -zxf pcre-8.45.tar.gz 
tar -zxf openssl-3.0.1.tar.gz 
tar -zxf zlib-1.2.11.tar.gz 
cd nginx-1.20.2
```

6、编译安装

```
# 编译安装
./configure --prefix=/data/services/nginx \
--user=root \
--group=root \
--with-http_stub_status_module \
--with-http_gzip_static_module \
--with-http_secure_link_module \
--with-http_flv_module \
--with-http_ssl_module \
--with-http_mp4_module \
--with-stream \
--with-http_realip_module \
--with-http_geoip_module \
--with-http_v2_module \
--with-http_sub_module \
--with-http_image_filter_module \
--with-pcre=/data/packages/nginx-1.20.2/pcre-8.45 \
--with-openssl=/data/packages/nginx-1.20.2/openssl-1.1.1g \
--with-zlib=/data/packages/nginx-1.20.2/zlib-1.2.11
make && make install
```

7、启动服务并访问测试：

```
/data/services/nginx/sbin/nginx
```



## 定制归档前端主题

### 添加模块

```sh
# 文件下载界面美化模块
https://github.com/aperezdc/ngx-fancyindex
unzip ngx-fancyindex-master.zip
```

### 重新编译

`不安装，不安装，不安装`

```
./configure --prefix=/data/services/nginx \
--user=root \
--group=root \
--with-http_stub_status_module \
--with-http_gzip_static_module \
--with-http_secure_link_module \
--with-http_flv_module \
--with-http_ssl_module \
--with-http_mp4_module \
--with-stream \
--with-http_realip_module \
--with-http_geoip_module \
--with-http_v2_module \
--with-http_sub_module \
--with-http_image_filter_module \
--with-pcre=/data/packages/nginx-1.20.2/pcre-8.45 \
--with-openssl=/data/packages/nginx-1.20.2/openssl-3.0.1 \
--with-zlib=/data/packages/nginx-1.20.2/zlib-1.2.11 \
--add-module=/data/packages/nginx-1.20.2/ngx-fancyindex-master

# 只编译，不安装
make
```

### 备份旧版本并替换

```sh
cd /data/services/nginx/sbin/
mv nginx nginx_$(date +%F)
cp /data/packages/nginx-1.20.2/nginx-1.20.2/objs/nginx .
```

### 4、查看编译参数并重载：

```
# 查看编译参数
/data/services/nginx/sbin/nginx -V

# 停止服务再启动，否则模块可能无法加载
/data/services/nginx/sbin/nginx -s stop
/data/services/nginx/sbin/nginx
到此，动态添加编译参数完成！
```

5、编译参数说明

| 配置                            | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| --prefix=PATH                   | 指定安装路径，默认 /usr/local/nginx                          |
| --sbin-path=PATH                | 指定二进制命令的路径，默认安装目录下 sbin 目录               |
| --modules-path=PATH             | 指定模块的路径，默认安装目录下 modules 目录                  |
| --conf-path=PATH                | 指定 nginx.conf 配置文件路径，默认安装目录下 conf 目录       |
| --error-log-path=PATH           | 指定错误日志路径，默认安装目录下 logs 目录                   |
| --pid-path=PATH                 | 指定 nginx.pid 路径，默认安装目录下 logs 目录                |
| --lock-path=PATH                | 指定 nginx.lock 路径，默认安装目录下 logs 目录               |
| --user=USER                     | 指定运行用户                                                 |
| --group=GROUP                   | 指定运行用户组                                               |
| --with-threads                  | 使用线程池                                                   |
| --with-file-aio                 | Linux 上允许使用异步文件I/O（AIO）                           |
| --with-http_ssl_module          | 启用 SSL 模块                                                |
| --with-http_v2_module           | 支持 HTTP/2                                                  |
| --with-http_realip_module       | 将客户端IP更改为指定的头字段中发送的地址                     |
| --with-http_addition_module     | 在响应前后加上text的功能                                     |
| --with-http_xslt_module         | 过滤转换 XML 请求                                            |
| --with-http_image_filter_module | 传输 JPEG/GIF/PNG 图片的一个过滤器                           |
| --with-http_geoip_module        | 创建变量，使用预编译的MaxMind数据库解析客户端IP地址，得到变量值 |
| --with-http_sub_module          | 通过指定一个字符串替换另外一个字符串达到修改响应的目的       |
| --with-http_dav_module          | 通过WebDAV的提供的管理协议自动化文件                         |
| --with-http_flv_module          | 为闪存视频（FLV）提供文件伪流式服务器端                      |
| --with-http_mp4_module          | 为MP4提供文件伪流式服务器端                                  |
| --with-http_gunzip_module       | 为不支持 gzip 编码方法的客户端提供解压缩响应                 |
| --with-http_gzip_static_module  | 使用 gz 在线实时压缩输出数据流                               |
| --with-http_auth_request_module | 客户端授权认证模块                                           |
| --with-http_random_index_module | 处理以斜线字符 / 结尾的请求，并在目录中选择一个随机文件作为索引文件 |
| --with-http_secure_link_module  | 计算和检查要求所需的安全链接网址                             |
| --with-http_degradation_module  | 允许在内存不足的情况下返回204或444码                         |
| --with-http_slice_module        | 将请求拆分为子请求                                           |
| --with-http_stub_status_module  | 访问基本状态信息                                             |
| --with-http_perl_module         | 启动perl模块                                                 |
| --with-perl_modules_path=PATH   | 指定perl模块路径                                             |
| --with-perl=PATH                | 配置 perl 二进制路径                                         |
| --http-log-path=PATH            | 指定 access log 路径                                         |
| --with-mail                     | 启用邮件 POP3/IMAP4/SMTP 代理                                |
| --with-mail_ssl_module          | 启用邮件 SSL 模块                                            |
| --with-stream                   | 启用 TCP/UDP 代理                                            |
| --with-stream_ssl_module        | 启用 TCP/UDP SSL 代理                                        |
| --with-stream_realip_module     | 启用 TCP/UDP realip 模块                                     |
| --with-stream_geoip_module      | 启用 TCP/UDP geoip 模块                                      |
| --add-module=PATH               | 添加扩展模块                                                 |
| --with-pcre                     | 强制使用PCRE库                                               |
| --with-pcre=DIR                 | 设置 pcre 位置                                               |
| --with-zlib=DIR                 | 设置 zlib 位置                                               |
| --with-openssl=DIR              | 设置 openssl 位置                                            |

<br>

## 服务配置文件

### 初始状态

```sh
server {
    listen      80;
    server_name localhost;

    location ^~ /download {
        charset utf-8;
        alias   /data/packages/nginx-1.20.2;
        # 目录索引和时间配置
        autoindex             on;
        autoindex_exact_size  on;
        autoindex_localtime   on;

        # 下载文件类型限制，我们这里允许常见的文档，压缩包下载
        if ($request_filename ~* ^.*?\.(txt|log|pdf|doc|docx|xls|xlsx|ppt|pptx|rar|zip|tar.gz|tar.xz|bz2|iso)$ ) {
            add_header  Content-Disposition attachment;
        }
    }

    location / {
        return 403;
    }
}
```

<br>

### UI美化

在安装 Nginx 的时候加入了 `ngx-fancyindex` 包，这个包就主要用于界面美化，新增配置如下：

```sh
server {
    listen      80;
    server_name localhost;

    location ^~ /download {
        charset utf-8;
        alias   /data/packages/nginx-1.20.2;
        
        # 目录索引和时间配置
        fancyindex             on;
        fancyindex_exact_size  on;
        fancyindex_localtime   on;

        # 下载文件类型限制，我们这里允许常见的文档，压缩包下载
        if ($request_filename ~* ^.*?\.(txt|log|pdf|doc|docx|xls|xlsx|ppt|pptx|rar|zip|tar.gz|tar.xz|bz2|iso)$ ) {
            add_header  Content-Disposition attachment;
        }
    }

    location / {
        return 403;
    }
}
```

<br>

### UI高级定制

这个主题是个人根据 GITHUB 别人分享的进行修改的，原主题的地址为：

> https://github.com/alehaa/nginx-fancyindex-flat-theme

修改后的主题下载地址：

> https://gitee.com/KU4NG/nginx-fancyindex-theme



**使用方法**：

1、下载代码，将目录中的 theme 目录上传到 nginx 的根目录：

2、增加 nginx 配置：

```sh
    server {
    listen      80;
    server_name localhost;

    location ^~ /download {
        charset utf-8;
        alias   /data/packages/nginx-1.20.2;
        
        fancyindex             on;
        fancyindex_header      "/theme/header.html";
        fancyindex_footer      "/theme/footer.html";
        fancyindex_show_path   off;
        fancyindex_name_length 255;
        fancyindex_exact_size  off;
        fancyindex_localtime   on;

        # 下载文件类型限制，我们这里允许常见的文档，压缩包下载
        if ($request_filename ~* ^.*?\.(txt|log|pdf|doc|docx|xls|xlsx|ppt|pptx|rar|zip|tar.gz|tar.xz|bz2|iso)$ ) {
            add_header  Content-Disposition attachment;
        }
    }

    location /theme {
        alias  /data/services/nginx/theme;
    }

    location / {
        return 403;
    }
}
配置主要增加了 theme 目录所在的位置，头文件和底部文件的引入。
```

<br>

### 4、其他说明

**关于自定义说明**：

- 如果想要修改顶部和底部的文字，可以修改 header.html 和 footer.html。
- 如果想要修改 CSS，可以修改 theme 目录下的 theme.css。
- 如果想修改 logo 可以替换 theme 目录下的图片。

转自 [美化文件下载 (ezops.cn)](http://nginx.ezops.cn/#/src/01/美化文件下载)