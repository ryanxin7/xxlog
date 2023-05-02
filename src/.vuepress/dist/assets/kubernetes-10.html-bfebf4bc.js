import{_ as t,V as l,W as p,$ as s,a0 as n,Y as e,Z as i,C as o}from"./framework-91fce522.js";const c={},u={href:"https://cn.wordpress.org/download/releases/",target:"_blank",rel:"noopener noreferrer"},r=i(`<p><a name="m05Oo"></a></p><h2 id="_1-准备php镜像" tabindex="-1"><a class="header-anchor" href="#_1-准备php镜像" aria-hidden="true">#</a> 1.准备PHP镜像</h2><p><a name="q3lxf"></a></p><h3 id="官方php镜像" tabindex="-1"><a class="header-anchor" href="#官方php镜像" aria-hidden="true">#</a> 官方PHP镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01<span class="token punctuation">[</span>09:20:39<span class="token punctuation">]</span>/dockerfile/web/wordpress <span class="token comment">#:docker pull php:5.6.40-fpm</span>

root@harbor01<span class="token punctuation">[</span>09:21:35<span class="token punctuation">]</span>/dockerfile/web/wordpress <span class="token comment">#:docker tag php:5.6.40-fpm harbor.ceamg.com/baseimages/php-fpm:5.6.40</span>
root@harbor01<span class="token punctuation">[</span>09:23:12<span class="token punctuation">]</span>/dockerfile/web/wordpress <span class="token comment">#:docker push harbor.ceamg.com/baseimages/php-fpm:5.6.40</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="meuII"></a></p><h3 id="自制php镜像" tabindex="-1"><a class="header-anchor" href="#自制php镜像" aria-hidden="true">#</a> 自制PHP镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01<span class="token punctuation">[</span><span class="token number">12</span>:28:25<span class="token punctuation">]</span>/dockerfile/web/php <span class="token comment">#:ls</span>
build_image_command.sh  Dockerfile  php.ini  run_php.sh  sources.list  www.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="utRos"></a></p><h4 id="编写dockerfile" tabindex="-1"><a class="header-anchor" href="#编写dockerfile" aria-hidden="true">#</a> 编写Dockerfile</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#PHP Base Image</span>
FROM harbor.ceamg.com/baseimages/ubuntu:20.04

RUN <span class="token function">apt</span> update <span class="token parameter variable">-y</span>  <span class="token punctuation">\\</span>
 <span class="token operator">&amp;&amp;</span> <span class="token function">apt</span> <span class="token function">install</span>  ca-certificates <span class="token parameter variable">-y</span> <span class="token punctuation">\\</span>
 <span class="token operator">&amp;&amp;</span> <span class="token function">useradd</span> nginx <span class="token parameter variable">-u</span> <span class="token number">2023</span> <span class="token parameter variable">-s</span> /sbin/nologin <span class="token punctuation">\\</span>
 <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> /run/php

COPY sources.list /etc/apt/sources.list

RUN <span class="token function">apt</span> update <span class="token parameter variable">-y</span> <span class="token operator">&amp;&amp;</span> <span class="token function">apt-get</span> <span class="token function">install</span> php7.4-fpm php7.4-mysql <span class="token parameter variable">-y</span>

COPY www.conf /etc/php/7.4/fpm/pool.d/
COPY php.ini /etc/php/7.4/fpm/

ADD run_php.sh /usr/local/bin/run_php.sh

EXPOSE <span class="token number">9000</span>

CMD <span class="token punctuation">[</span><span class="token string">&quot;/usr/local/bin/run_php.sh&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="yUWAL"></a></p><h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">TAG</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token function">docker</span>  build <span class="token parameter variable">-t</span> harbor.ceamg.com/baseimages/php7.4-wordpress:<span class="token variable">\${TAG}</span> <span class="token builtin class-name">.</span>
<span class="token function">docker</span> push harbor.ceamg.com/baseimages/php7.4-wordpress:<span class="token variable">\${TAG}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
php-fpm7.4 <span class="token parameter variable">--nodaemonize</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>PHP<span class="token punctuation">]</span>

<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span> About php.ini   <span class="token punctuation">;</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span> PHP<span class="token string">&#39;s initialization file, generally called php.ini, is responsible for
; configuring many of the aspects of PHP&#39;</span>s behavior.

<span class="token punctuation">;</span> PHP attempts to <span class="token function">find</span> and load this configuration from a number of locations.
<span class="token punctuation">;</span> The following is a summary of its search order:
<span class="token punctuation">;</span> <span class="token number">1</span>. SAPI module specific location.
<span class="token punctuation">;</span> <span class="token number">2</span>. The PHPRC environment variable. <span class="token punctuation">(</span>As of PHP <span class="token number">5.2</span>.0<span class="token punctuation">)</span>
<span class="token punctuation">;</span> <span class="token number">3</span>. A number of predefined registry keys on Windows <span class="token punctuation">(</span>As of PHP <span class="token number">5.2</span>.0<span class="token punctuation">)</span>
<span class="token punctuation">;</span> <span class="token number">4</span>. Current working directory <span class="token punctuation">(</span>except CLI<span class="token punctuation">)</span>
<span class="token punctuation">;</span> <span class="token number">5</span>. The web server<span class="token string">&#39;s directory (for SAPI modules), or directory of PHP
; (otherwise in Windows)
; 6. The directory from the --with-config-file-path compile time option, or the
; Windows directory (usually C:\\windows)
; See the PHP docs for more specific information.
; http://php.net/configuration.file

; The syntax of the file is extremely simple.  Whitespace and lines
; beginning with a semicolon are silently ignored (as you probably guessed).
; Section headers (e.g. [Foo]) are also silently ignored, even though
; they might mean something in the future.

; Directives following the section heading [PATH=/www/mysite] only
; apply to PHP files in the /www/mysite directory.  Directives
; following the section heading [HOST=www.example.com] only apply to
; PHP files served from www.example.com.  Directives set in these
; special sections cannot be overridden by user-defined INI files or
; at runtime. Currently, [PATH=] and [HOST=] sections only work under
; CGI/FastCGI.
; http://php.net/ini.sections

; Directives are specified using the following syntax:
; directive = value
; Directive names are *case sensitive* - foo=bar is different from FOO=bar.
; Directives are variables used to configure PHP or PHP extensions.
; There is no name validation.  If PHP can&#39;</span>t <span class="token function">find</span> an expected
<span class="token punctuation">;</span> directive because it is not <span class="token builtin class-name">set</span> or is mistyped, a default value will be used.

<span class="token punctuation">;</span> The value can be a string, a number, a PHP constant <span class="token punctuation">(</span>e.g. E_ALL or M_PI<span class="token punctuation">)</span>, one
<span class="token punctuation">;</span> of the INI constants <span class="token punctuation">(</span>On, Off, True, False, Yes, No and None<span class="token punctuation">)</span> or an expression
<span class="token punctuation">;</span> <span class="token punctuation">(</span>e.g. E_ALL <span class="token operator">&amp;</span> ~E_NOTICE<span class="token punctuation">)</span>, a quoted string <span class="token punctuation">(</span><span class="token string">&quot;bar&quot;</span><span class="token punctuation">)</span>, or a reference to a
<span class="token punctuation">;</span> previously <span class="token builtin class-name">set</span> variable or directive <span class="token punctuation">(</span>e.g. <span class="token variable">\${foo}</span><span class="token punctuation">)</span>

<span class="token punctuation">;</span> Expressions <span class="token keyword">in</span> the INI <span class="token function">file</span> are limited to bitwise operators and parentheses:
<span class="token punctuation">;</span> <span class="token operator">|</span>  bitwise OR
<span class="token punctuation">;</span> ^  bitwise XOR
<span class="token punctuation">;</span> <span class="token operator">&amp;</span>  bitwise AND
<span class="token punctuation">;</span> ~  bitwise NOT
<span class="token punctuation">;</span> <span class="token operator">!</span>  boolean NOT

<span class="token punctuation">;</span> Boolean flags can be turned on using the values <span class="token number">1</span>, On, True or Yes.
<span class="token punctuation">;</span> They can be turned off using the values <span class="token number">0</span>, Off, False or No.

<span class="token punctuation">;</span> An empty string can be denoted by simply not writing anything after the equal
<span class="token punctuation">;</span> sign, or by using the None keyword:

<span class="token punctuation">;</span> foo <span class="token operator">=</span>         <span class="token punctuation">;</span> sets foo to an empty string
<span class="token punctuation">;</span> foo <span class="token operator">=</span> None    <span class="token punctuation">;</span> sets foo to an empty string
<span class="token punctuation">;</span> foo <span class="token operator">=</span> <span class="token string">&quot;None&quot;</span>  <span class="token punctuation">;</span> sets foo to the string <span class="token string">&#39;None&#39;</span>

<span class="token punctuation">;</span> If you use constants <span class="token keyword">in</span> your value, and these constants belong to a
<span class="token punctuation">;</span> dynamically loaded extension <span class="token punctuation">(</span>either a PHP extension or a Zend extension<span class="token punctuation">)</span>,
<span class="token punctuation">;</span> you may only use these constants *after* the line that loads the extension.

<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span> About this <span class="token function">file</span> <span class="token punctuation">;</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span> PHP comes packaged with two INI files. One that is recommended to be used
<span class="token punctuation">;</span> <span class="token keyword">in</span> production environments and one that is recommended to be used <span class="token keyword">in</span>
<span class="token punctuation">;</span> development environments.

<span class="token punctuation">;</span> php.ini-production contains settings <span class="token function">which</span> hold security, performance and
<span class="token punctuation">;</span> best practices at its core. But please be aware, these settings may <span class="token builtin class-name">break</span>
<span class="token punctuation">;</span> compatibility with older or <span class="token function">less</span> security conscience applications. We
<span class="token punctuation">;</span> recommending using the production ini <span class="token keyword">in</span> production and testing environments.

<span class="token punctuation">;</span> php.ini-development is very similar to its production variant, except it is
<span class="token punctuation">;</span> much <span class="token function">more</span> verbose when it comes to errors. We recommend using the
<span class="token punctuation">;</span> development version only <span class="token keyword">in</span> development environments, as errors shown to
<span class="token punctuation">;</span> application <span class="token function">users</span> can inadvertently leak otherwise secure information.

<span class="token punctuation">;</span> This is the php.ini-production INI file.

<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span> Quick Reference <span class="token punctuation">;</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span> The following are all the settings <span class="token function">which</span> are different <span class="token keyword">in</span> either the production
<span class="token punctuation">;</span> or development versions of the INIs with respect to PHP<span class="token string">&#39;s default behavior.
; Please see the actual settings later in the document for more details as to why
; we recommend these changes in PHP&#39;</span>s behavior.

<span class="token punctuation">;</span> display_errors
<span class="token punctuation">;</span>   Default Value: On
<span class="token punctuation">;</span>   Development Value: On
<span class="token punctuation">;</span>   Production Value: Off

<span class="token punctuation">;</span> display_startup_errors
<span class="token punctuation">;</span>   Default Value: Off
<span class="token punctuation">;</span>   Development Value: On
<span class="token punctuation">;</span>   Production Value: Off

<span class="token punctuation">;</span> error_reporting
<span class="token punctuation">;</span>   Default Value: E_ALL <span class="token operator">&amp;</span> ~E_NOTICE <span class="token operator">&amp;</span> ~E_STRICT <span class="token operator">&amp;</span> ~E_DEPRECATED
<span class="token punctuation">;</span>   Development Value: E_ALL
<span class="token punctuation">;</span>   Production Value: E_ALL <span class="token operator">&amp;</span> ~E_DEPRECATED <span class="token operator">&amp;</span> ~E_STRICT

<span class="token punctuation">;</span> log_errors
<span class="token punctuation">;</span>   Default Value: Off
<span class="token punctuation">;</span>   Development Value: On
<span class="token punctuation">;</span>   Production Value: On

<span class="token punctuation">;</span> max_input_time
<span class="token punctuation">;</span>   Default Value: <span class="token parameter variable">-1</span> <span class="token punctuation">(</span>Unlimited<span class="token punctuation">)</span>
<span class="token punctuation">;</span>   Development Value: <span class="token number">60</span> <span class="token punctuation">(</span><span class="token number">60</span> seconds<span class="token punctuation">)</span>
<span class="token punctuation">;</span>   Production Value: <span class="token number">60</span> <span class="token punctuation">(</span><span class="token number">60</span> seconds<span class="token punctuation">)</span>

<span class="token punctuation">;</span> output_buffering
<span class="token punctuation">;</span>   Default Value: Off
<span class="token punctuation">;</span>   Development Value: <span class="token number">4096</span>
<span class="token punctuation">;</span>   Production Value: <span class="token number">4096</span>

<span class="token punctuation">;</span> register_argc_argv
<span class="token punctuation">;</span>   Default Value: On
<span class="token punctuation">;</span>   Development Value: Off
<span class="token punctuation">;</span>   Production Value: Off

<span class="token punctuation">;</span> request_order
<span class="token punctuation">;</span>   Default Value: None
<span class="token punctuation">;</span>   Development Value: <span class="token string">&quot;GP&quot;</span>
<span class="token punctuation">;</span>   Production Value: <span class="token string">&quot;GP&quot;</span>

<span class="token punctuation">;</span> session.gc_divisor
<span class="token punctuation">;</span>   Default Value: <span class="token number">100</span>
<span class="token punctuation">;</span>   Development Value: <span class="token number">1000</span>
<span class="token punctuation">;</span>   Production Value: <span class="token number">1000</span>

<span class="token punctuation">;</span> session.sid_bits_per_character
<span class="token punctuation">;</span>   Default Value: <span class="token number">4</span>
<span class="token punctuation">;</span>   Development Value: <span class="token number">5</span>
<span class="token punctuation">;</span>   Production Value: <span class="token number">5</span>

<span class="token punctuation">;</span> short_open_tag
<span class="token punctuation">;</span>   Default Value: On
<span class="token punctuation">;</span>   Development Value: Off
<span class="token punctuation">;</span>   Production Value: Off

<span class="token punctuation">;</span> variables_order
<span class="token punctuation">;</span>   Default Value: <span class="token string">&quot;EGPCS&quot;</span>
<span class="token punctuation">;</span>   Development Value: <span class="token string">&quot;GPCS&quot;</span>
<span class="token punctuation">;</span>   Production Value: <span class="token string">&quot;GPCS&quot;</span>

<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span> php.ini Options  <span class="token punctuation">;</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span> Name <span class="token keyword">for</span> user-defined php.ini <span class="token punctuation">(</span>.htaccess<span class="token punctuation">)</span> files. Default is <span class="token string">&quot;.user.ini&quot;</span>
<span class="token punctuation">;</span>user_ini.filename <span class="token operator">=</span> <span class="token string">&quot;.user.ini&quot;</span>

<span class="token punctuation">;</span> To disable this feature <span class="token builtin class-name">set</span> this option to an empty value
<span class="token punctuation">;</span>user_ini.filename <span class="token operator">=</span>

<span class="token punctuation">;</span> TTL <span class="token keyword">for</span> user-defined php.ini files <span class="token punctuation">(</span>time-to-live<span class="token punctuation">)</span> <span class="token keyword">in</span> seconds. Default is <span class="token number">300</span> seconds <span class="token punctuation">(</span><span class="token number">5</span> minutes<span class="token punctuation">)</span>
<span class="token punctuation">;</span>user_ini.cache_ttl <span class="token operator">=</span> <span class="token number">300</span>

<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span> Language Options <span class="token punctuation">;</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>

<span class="token punctuation">;</span> Enable the PHP scripting language engine under Apache.
<span class="token punctuation">;</span> http://php.net/engine
engine <span class="token operator">=</span> On

<span class="token punctuation">;</span> This directive determines whether or not PHP will recognize code between
<span class="token punctuation">;</span> <span class="token operator">&lt;</span>? and ?<span class="token operator">&gt;</span> tag as PHP <span class="token builtin class-name">source</span> <span class="token function">which</span> should be processed as such. It is
<span class="token punctuation">;</span> generally recommended that <span class="token operator">&lt;</span>?php and ?<span class="token operator">&gt;</span> should be used and that this feature
<span class="token punctuation">;</span> should be disabled, as enabling it may result <span class="token keyword">in</span> issues when generating XML
<span class="token punctuation">;</span> documents, however this remains supported <span class="token keyword">for</span> backward compatibility reasons.
<span class="token punctuation">;</span> Note that this directive does not control the <span class="token operator">&lt;</span>?<span class="token operator">=</span> shorthand tag, <span class="token function">which</span> can be
<span class="token punctuation">;</span> used regardless of this directive.
<span class="token punctuation">;</span> Default Value: On
<span class="token punctuation">;</span> Development Value: Off
<span class="token punctuation">;</span> Production Value: Off
<span class="token punctuation">;</span> http://php.net/short-open-tag
short_open_tag <span class="token operator">=</span> Off

<span class="token punctuation">;</span> The number of significant digits displayed <span class="token keyword">in</span> floating point numbers.
<span class="token punctuation">;</span> http://php.net/precision
precision <span class="token operator">=</span> <span class="token number">14</span>

<span class="token punctuation">;</span> Output buffering is a mechanism <span class="token keyword">for</span> controlling how much output data
<span class="token punctuation">;</span> <span class="token punctuation">(</span>excluding headers and cookies<span class="token punctuation">)</span> PHP should keep internally before pushing that
<span class="token punctuation">;</span> data to the client. If your application<span class="token string">&#39;s output exceeds this setting, PHP
; will send that data in chunks of roughly the size you specify.
; Turning on this setting and managing its maximum buffer size can yield some
; interesting side-effects depending on your application and web server.
; You may be able to send headers and cookies after you&#39;</span>ve already sent output
<span class="token punctuation">;</span> through print or echo. You also may see performance benefits <span class="token keyword">if</span> your server is
<span class="token punctuation">;</span> emitting <span class="token function">less</span> packets due to buffered output versus PHP streaming the output
<span class="token punctuation">;</span> as it gets it. On production servers, <span class="token number">4096</span> bytes is a good setting <span class="token keyword">for</span> performance
<span class="token punctuation">;</span> reasons.
<span class="token punctuation">;</span> Note: Output buffering can also be controlled via Output Buffering Control
<span class="token punctuation">;</span>   functions.
<span class="token punctuation">;</span> Possible Values:
<span class="token punctuation">;</span>   On <span class="token operator">=</span> Enabled and buffer is unlimited. <span class="token punctuation">(</span>Use with caution<span class="token punctuation">)</span>
<span class="token punctuation">;</span>   Off <span class="token operator">=</span> Disabled
<span class="token punctuation">;</span>   Integer <span class="token operator">=</span> Enables the buffer and sets its maximum size <span class="token keyword">in</span> bytes.
<span class="token punctuation">;</span> Note: This directive is hardcoded to Off <span class="token keyword">for</span> the CLI SAPI
<span class="token punctuation">;</span> Default Value: Off
<span class="token punctuation">;</span> Development Value: <span class="token number">4096</span>
<span class="token punctuation">;</span> Production Value: <span class="token number">4096</span>
<span class="token punctuation">;</span> http://php.net/output-buffering
output_buffering <span class="token operator">=</span> <span class="token number">4096</span>

<span class="token punctuation">;</span> You can redirect all of the output of your scripts to a function.  For
<span class="token punctuation">;</span> example, <span class="token keyword">if</span> you <span class="token builtin class-name">set</span> output_handler to <span class="token string">&quot;mb_output_handler&quot;</span>, character
<span class="token punctuation">;</span> encoding will be transparently converted to the specified encoding.
<span class="token punctuation">;</span> Setting any output handler automatically turns on output buffering.
<span class="token punctuation">;</span> Note: People <span class="token function">who</span> wrote portable scripts should not depend on this ini
<span class="token punctuation">;</span>   directive. Instead, explicitly <span class="token builtin class-name">set</span> the output handler using ob_start<span class="token punctuation">(</span><span class="token punctuation">)</span>.
<span class="token punctuation">;</span>   Using this ini directive may cause problems unless you know what script
<span class="token punctuation">;</span>   is doing.
<span class="token punctuation">;</span> Note: You cannot use both <span class="token string">&quot;mb_output_handler&quot;</span> with <span class="token string">&quot;ob_iconv_handler&quot;</span>
<span class="token punctuation">;</span>   and you cannot use both <span class="token string">&quot;ob_gzhandler&quot;</span> and <span class="token string">&quot;zlib.output_compression&quot;</span><span class="token builtin class-name">.</span>
<span class="token punctuation">;</span> Note: output_handler must be empty <span class="token keyword">if</span> this is <span class="token builtin class-name">set</span> <span class="token string">&#39;On&#39;</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token operator">!</span><span class="token operator">!</span>
<span class="token punctuation">;</span>   Instead you must use zlib.output_handler.
<span class="token punctuation">;</span> http://php.net/output-handler
<span class="token punctuation">;</span>output_handler <span class="token operator">=</span>

<span class="token punctuation">;</span> URL rewriter <span class="token keyword">function</span> rewrites URL on the fly by using
<span class="token punctuation">;</span> output buffer. You can <span class="token builtin class-name">set</span> target tag by this configuration.
<span class="token punctuation">;</span> <span class="token string">&quot;form&quot;</span> tag is special tag. It will <span class="token function">add</span> hidden input tag to pass values.
<span class="token punctuation">;</span> Refer to session.trans_sid_tag <span class="token keyword">for</span> usage.
<span class="token punctuation">;</span> Default Value: <span class="token string">&quot;form=&quot;</span>
<span class="token punctuation">;</span> Development Value: <span class="token string">&quot;form=&quot;</span>
<span class="token punctuation">;</span> Production Value: <span class="token string">&quot;form=&quot;</span>
<span class="token punctuation">;</span>url_rewriter.tag

<span class="token punctuation">;</span> URL rewriter will not rewrite absolute URL nor form by default. To <span class="token builtin class-name">enable</span>
<span class="token punctuation">;</span> absolute URL rewrite, allowed hosts must be defined at RUNTIME.
<span class="token punctuation">;</span> Refer to session.trans_sid_hosts <span class="token keyword">for</span> <span class="token function">more</span> details.
<span class="token punctuation">;</span> Default Value: <span class="token string">&quot;&quot;</span>
<span class="token punctuation">;</span> Development Value: <span class="token string">&quot;&quot;</span>
<span class="token punctuation">;</span> Production Value: <span class="token string">&quot;&quot;</span>
<span class="token punctuation">;</span>url_rewriter.hosts

<span class="token punctuation">;</span> Transparent output compression using the zlib library
<span class="token punctuation">;</span> Valid values <span class="token keyword">for</span> this option are <span class="token string">&#39;off&#39;</span>, <span class="token string">&#39;on&#39;</span>, or a specific buffer size
<span class="token punctuation">;</span> to be used <span class="token keyword">for</span> compression <span class="token punctuation">(</span>default is 4KB<span class="token punctuation">)</span>
<span class="token punctuation">;</span> Note: Resulting chunk size may vary due to nature of compression. PHP
<span class="token punctuation">;</span>   outputs chunks that are few hundreds bytes each as a result of
<span class="token punctuation">;</span>   compression. If you prefer a larger chunk size <span class="token keyword">for</span> better
<span class="token punctuation">;</span>   performance, <span class="token builtin class-name">enable</span> output_buffering <span class="token keyword">in</span> addition.
<span class="token punctuation">;</span> Note: You need to use zlib.output_handler instead of the standard
<span class="token punctuation">;</span>   output_handler, or otherwise the output will be corrupted.
<span class="token punctuation">;</span> http://php.net/zlib.output-compression
zlib.output_compression <span class="token operator">=</span> Off

<span class="token punctuation">;</span> http://php.net/zlib.output-compression-level
<span class="token punctuation">;</span>zlib.output_compression_level <span class="token operator">=</span> <span class="token parameter variable">-1</span>

<span class="token punctuation">;</span> You cannot specify additional output handlers <span class="token keyword">if</span> zlib.output_compression
<span class="token punctuation">;</span> is activated here. This setting does the same as output_handler but <span class="token keyword">in</span>
<span class="token punctuation">;</span> a different order.
<span class="token punctuation">;</span> http://php.net/zlib.output-handler
<span class="token punctuation">;</span>zlib.output_handler <span class="token operator">=</span>

<span class="token punctuation">;</span> Implicit flush tells PHP to tell the output layer to flush itself
<span class="token punctuation">;</span> automatically after every output block.  This is equivalent to calling the
<span class="token punctuation">;</span> PHP <span class="token keyword">function</span> flush<span class="token punctuation">(</span><span class="token punctuation">)</span> after each and every call to print<span class="token punctuation">(</span><span class="token punctuation">)</span> or echo<span class="token punctuation">(</span><span class="token punctuation">)</span> and each
<span class="token punctuation">;</span> and every HTML block.  Turning this option on has serious performance
<span class="token punctuation">;</span> implications and is generally recommended <span class="token keyword">for</span> debugging purposes only.
<span class="token punctuation">;</span> http://php.net/implicit-flush
<span class="token punctuation">;</span> Note: This directive is hardcoded to On <span class="token keyword">for</span> the CLI SAPI
implicit_flush <span class="token operator">=</span> Off

<span class="token punctuation">;</span> The unserialize callback <span class="token keyword">function</span> will be called <span class="token punctuation">(</span>with the undefined class<span class="token string">&#39;
; name as parameter), if the unserializer finds an undefined class
; which should be instantiated. A warning appears if the specified function is
; not defined, or if the function doesn&#39;</span>t include/implement the missing class.
<span class="token punctuation">;</span> So only <span class="token builtin class-name">set</span> this entry, <span class="token keyword">if</span> you really want to implement such a
<span class="token punctuation">;</span> callback-function.
unserialize_callback_func <span class="token operator">=</span>

<span class="token punctuation">;</span> The unserialize_max_depth specifies the default depth limit <span class="token keyword">for</span> unserialized
<span class="token punctuation">;</span> structures. Setting the depth limit too high may result <span class="token keyword">in</span> stack overflows
<span class="token punctuation">;</span> during unserialization. The unserialize_max_depth ini setting can be
<span class="token punctuation">;</span> overridden by the max_depth option on individual unserialize<span class="token punctuation">(</span><span class="token punctuation">)</span> calls.
<span class="token punctuation">;</span> A value of <span class="token number">0</span> disables the depth limit.
<span class="token punctuation">;</span>unserialize_max_depth <span class="token operator">=</span> <span class="token number">4096</span>

<span class="token punctuation">;</span> When floats <span class="token operator">&amp;</span> doubles are serialized, store serialize_precision significant
<span class="token punctuation">;</span> digits after the floating point. The default value ensures that when floats
<span class="token punctuation">;</span> are decoded with unserialize, the data will remain the same.
<span class="token punctuation">;</span> The value is also used <span class="token keyword">for</span> json_encode when encoding double values.
<span class="token punctuation">;</span> If <span class="token parameter variable">-1</span> is used, <span class="token keyword">then</span> dtoa mode <span class="token number">0</span> is used <span class="token function">which</span> automatically <span class="token keyword">select</span> the best
<span class="token punctuation">;</span> precision.
serialize_precision <span class="token operator">=</span> <span class="token parameter variable">-1</span>

<span class="token punctuation">;</span> open_basedir, <span class="token keyword">if</span> set, limits all <span class="token function">file</span> operations to the defined directory
<span class="token punctuation">;</span> and below.  This directive makes <span class="token function">most</span> sense <span class="token keyword">if</span> used <span class="token keyword">in</span> a per-directory
<span class="token punctuation">;</span> or per-virtualhost web server configuration file.
<span class="token punctuation">;</span> Note: disables the realpath cache
<span class="token punctuation">;</span> http://php.net/open-basedir
<span class="token punctuation">;</span>open_basedir <span class="token operator">=</span>

<span class="token punctuation">;</span> This directive allows you to disable certain functions <span class="token keyword">for</span> security reasons.
<span class="token punctuation">;</span> It receives a comma-delimited list of <span class="token keyword">function</span> names.
<span class="token punctuation">;</span> http://php.net/disable-functions
disable_functions <span class="token operator">=</span> pcntl_alarm,pcntl_fork,pcntl_waitpid,pcntl_wait,pcntl_wifexited,pcntl_wifstopped,pcntl_wifsignaled,pcntl_wifcontinued,pcntl_wexitstatus,pcntl_wtermsig,pcntl_wstopsig,pcntl_signal,pcntl_signal_get_handler,pcntl_signal_dispatch,pcntl_get_last_error,pcntl_strerror,pcntl_sigprocmask,pcntl_sigwaitinfo,pcntl_sigtimedwait,pcntl_exec,pcntl_getpriority,pcntl_setpriority,pcntl_async_signals,pcntl_unshare,

<span class="token punctuation">;</span> This directive allows you to disable certain classes <span class="token keyword">for</span> security reasons.
<span class="token punctuation">;</span> It receives a comma-delimited list of class names.
<span class="token punctuation">;</span> http://php.net/disable-classes
disable_classes <span class="token operator">=</span>

<span class="token punctuation">;</span> Colors <span class="token keyword">for</span> Syntax Highlighting mode.  Anything that<span class="token string">&#39;s acceptable in
; &lt;span style=&quot;color: ???????&quot;&gt; would work.
; http://php.net/syntax-highlighting
;highlight.string  = #DD0000
;highlight.comment = #FF9900
;highlight.keyword = #007700
;highlight.default = #0000BB
;highlight.html    = #000000

; If enabled, the request will be allowed to complete even if the user aborts
; the request. Consider enabling it if executing long requests, which may end up
; being interrupted by the user or a browser timing out. PHP&#39;</span>s default behavior
<span class="token punctuation">;</span> is to disable this feature.
<span class="token punctuation">;</span> http://php.net/ignore-user-abort
<span class="token punctuation">;</span>ignore_user_abort <span class="token operator">=</span> On

<span class="token punctuation">;</span> Determines the size of the realpath cache to be used by PHP. This value should
<span class="token punctuation">;</span> be increased on systems where PHP opens many files to reflect the quantity of
<span class="token punctuation">;</span> the <span class="token function">file</span> operations performed.
<span class="token punctuation">;</span> Note: <span class="token keyword">if</span> open_basedir is set, the cache is disabled
<span class="token punctuation">;</span> http://php.net/realpath-cache-size
<span class="token punctuation">;</span>realpath_cache_size <span class="token operator">=</span> 4096k

<span class="token punctuation">;</span> Duration of time, <span class="token keyword">in</span> seconds <span class="token keyword">for</span> <span class="token function">which</span> to cache realpath information <span class="token keyword">for</span> a given
<span class="token punctuation">;</span> <span class="token function">file</span> or directory. For systems with rarely changing files, consider increasing this
<span class="token punctuation">;</span> value.
<span class="token punctuation">;</span> http://php.net/realpath-cache-ttl
<span class="token punctuation">;</span>realpath_cache_ttl <span class="token operator">=</span> <span class="token number">120</span>

<span class="token punctuation">;</span> Enables or disables the circular reference collector.
<span class="token punctuation">;</span> http://php.net/zend.enable-gc
zend.enable_gc <span class="token operator">=</span> On

<span class="token punctuation">;</span> If enabled, scripts may be written <span class="token keyword">in</span> encodings that are incompatible with
<span class="token punctuation">;</span> the scanner.  CP936, Big5, CP949 and Shift_JIS are the examples of such
<span class="token punctuation">;</span> encodings.  To use this feature, mbstring extension must be enabled.
<span class="token punctuation">;</span> Default: Off
<span class="token punctuation">;</span>zend.multibyte <span class="token operator">=</span> Off

<span class="token punctuation">;</span> Allows to <span class="token builtin class-name">set</span> the default encoding <span class="token keyword">for</span> the scripts.  This value will be used
<span class="token punctuation">;</span> unless <span class="token string">&quot;declare(encoding=...)&quot;</span> directive appears at the <span class="token function">top</span> of the script.
<span class="token punctuation">;</span> Only affects <span class="token keyword">if</span> zend.multibyte is set.
<span class="token punctuation">;</span> Default: <span class="token string">&quot;&quot;</span>
<span class="token punctuation">;</span>zend.script_encoding <span class="token operator">=</span>

<span class="token punctuation">;</span> Allows to include or exclude arguments from stack traces generated <span class="token keyword">for</span> exceptions
<span class="token punctuation">;</span> Default: Off
<span class="token punctuation">;</span> In production, it is recommended to turn this setting on to prohibit the output 
<span class="token punctuation">;</span> of sensitive information <span class="token keyword">in</span> stack traces
zend.exception_ignore_args <span class="token operator">=</span> On

<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span> Miscellaneous <span class="token punctuation">;</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>

<span class="token punctuation">;</span> Decides whether PHP may expose the fact that it is installed on the server
<span class="token punctuation">;</span> <span class="token punctuation">(</span>e.g. by adding its signature to the Web server header<span class="token punctuation">)</span>.  It is no security
<span class="token punctuation">;</span> threat <span class="token keyword">in</span> any way, but it makes it possible to determine whether you use PHP
<span class="token punctuation">;</span> on your server or not.
<span class="token punctuation">;</span> http://php.net/expose-php
expose_php <span class="token operator">=</span> Off

<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span> Resource Limits <span class="token punctuation">;</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>

<span class="token punctuation">;</span> Maximum execution <span class="token function">time</span> of each script, <span class="token keyword">in</span> seconds
<span class="token punctuation">;</span> http://php.net/max-execution-time
<span class="token punctuation">;</span> Note: This directive is hardcoded to <span class="token number">0</span> <span class="token keyword">for</span> the CLI SAPI
max_execution_time <span class="token operator">=</span> <span class="token number">600</span>

<span class="token punctuation">;</span> Maximum amount of <span class="token function">time</span> each script may spend parsing request data. It<span class="token string">&#39;s a good
; idea to limit this time on productions servers in order to eliminate unexpectedly
; long running scripts.
; Note: This directive is hardcoded to -1 for the CLI SAPI
; Default Value: -1 (Unlimited)
; Development Value: 60 (60 seconds)
; Production Value: 60 (60 seconds)
; http://php.net/max-input-time
max_input_time = 600

; Maximum input variable nesting level
; http://php.net/max-input-nesting-level
;max_input_nesting_level = 64

; How many GET/POST/COOKIE input variables may be accepted
;max_input_vars = 1000

; Maximum amount of memory a script may consume (128MB)
; http://php.net/memory-limit
memory_limit = 256M

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; Error handling and logging ;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

; This directive informs PHP of which errors, warnings and notices you would like
; it to take action for. The recommended way of setting values for this
; directive is through the use of the error level constants and bitwise
; operators. The error level constants are below here for convenience as well as
; some common settings and their meanings.
; By default, PHP is set to take action on all errors, notices and warnings EXCEPT
; those related to E_NOTICE and E_STRICT, which together cover best practices and
; recommended coding standards in PHP. For performance reasons, this is the
; recommend error reporting setting. Your production server shouldn&#39;</span>t be wasting
<span class="token punctuation">;</span> resources complaining about best practices and coding standards. That<span class="token string">&#39;s what
; development servers and development settings are for.
; Note: The php.ini-development file has this setting as E_ALL. This
; means it pretty much reports everything which is exactly what you want during
; development and early testing.
;
; Error Level Constants:
; E_ALL             - All errors and warnings (includes E_STRICT as of PHP 5.4.0)
; E_ERROR           - fatal run-time errors
; E_RECOVERABLE_ERROR  - almost fatal run-time errors
; E_WARNING         - run-time warnings (non-fatal errors)
; E_PARSE           - compile-time parse errors
; E_NOTICE          - run-time notices (these are warnings which often result
;                     from a bug in your code, but it&#39;</span>s possible that it was
<span class="token punctuation">;</span>                     intentional <span class="token punctuation">(</span>e.g., using an uninitialized variable and
<span class="token punctuation">;</span>                     relying on the fact it is automatically initialized to an
<span class="token punctuation">;</span>                     empty string<span class="token punctuation">)</span>
<span class="token punctuation">;</span> E_STRICT          - run-time notices, <span class="token builtin class-name">enable</span> to have PHP suggest changes
<span class="token punctuation">;</span>                     to your code <span class="token function">which</span> will ensure the best interoperability
<span class="token punctuation">;</span>                     and forward compatibility of your code
<span class="token punctuation">;</span> E_CORE_ERROR      - fatal errors that occur during PHP<span class="token string">&#39;s initial startup
; E_CORE_WARNING    - warnings (non-fatal errors) that occur during PHP&#39;</span>s
<span class="token punctuation">;</span>                     initial startup
<span class="token punctuation">;</span> E_COMPILE_ERROR   - fatal compile-time errors
<span class="token punctuation">;</span> E_COMPILE_WARNING - compile-time warnings <span class="token punctuation">(</span>non-fatal errors<span class="token punctuation">)</span>
<span class="token punctuation">;</span> E_USER_ERROR      - user-generated error message
<span class="token punctuation">;</span> E_USER_WARNING    - user-generated warning message
<span class="token punctuation">;</span> E_USER_NOTICE     - user-generated notice message
<span class="token punctuation">;</span> E_DEPRECATED      - warn about code that will not work <span class="token keyword">in</span> future versions
<span class="token punctuation">;</span>                     of PHP
<span class="token punctuation">;</span> E_USER_DEPRECATED - user-generated deprecation warnings
<span class="token punctuation">;</span>
<span class="token punctuation">;</span> Common Values:
<span class="token punctuation">;</span>   E_ALL <span class="token punctuation">(</span>Show all errors, warnings and notices including coding standards.<span class="token punctuation">)</span>
<span class="token punctuation">;</span>   E_ALL <span class="token operator">&amp;</span> ~E_NOTICE  <span class="token punctuation">(</span>Show all errors, except <span class="token keyword">for</span> notices<span class="token punctuation">)</span>
<span class="token punctuation">;</span>   E_ALL <span class="token operator">&amp;</span> ~E_NOTICE <span class="token operator">&amp;</span> ~E_STRICT  <span class="token punctuation">(</span>Show all errors, except <span class="token keyword">for</span> notices and coding standards warnings.<span class="token punctuation">)</span>
<span class="token punctuation">;</span>   E_COMPILE_ERROR<span class="token operator">|</span>E_RECOVERABLE_ERROR<span class="token operator">|</span>E_ERROR<span class="token operator">|</span>E_CORE_ERROR  <span class="token punctuation">(</span>Show only errors<span class="token punctuation">)</span>
<span class="token punctuation">;</span> Default Value: E_ALL <span class="token operator">&amp;</span> ~E_NOTICE <span class="token operator">&amp;</span> ~E_STRICT <span class="token operator">&amp;</span> ~E_DEPRECATED
<span class="token punctuation">;</span> Development Value: E_ALL
<span class="token punctuation">;</span> Production Value: E_ALL <span class="token operator">&amp;</span> ~E_DEPRECATED <span class="token operator">&amp;</span> ~E_STRICT
<span class="token punctuation">;</span> http://php.net/error-reporting
error_reporting <span class="token operator">=</span> E_ALL <span class="token operator">&amp;</span> ~E_DEPRECATED <span class="token operator">&amp;</span> ~E_STRICT

<span class="token punctuation">;</span> This directive controls whether or not and where PHP will output errors,
<span class="token punctuation">;</span> notices and warnings too. Error output is very useful during development, but
<span class="token punctuation">;</span> it could be very dangerous <span class="token keyword">in</span> production environments. Depending on the code
<span class="token punctuation">;</span> <span class="token function">which</span> is triggering the error, sensitive information could potentially leak
<span class="token punctuation">;</span> out of your application such as database usernames and passwords or worse.
<span class="token punctuation">;</span> For production environments, we recommend logging errors rather than
<span class="token punctuation">;</span> sending them to STDOUT.
<span class="token punctuation">;</span> Possible Values:
<span class="token punctuation">;</span>   Off <span class="token operator">=</span> Do not display any errors
<span class="token punctuation">;</span>   stderr <span class="token operator">=</span> Display errors to STDERR <span class="token punctuation">(</span>affects only CGI/CLI binaries<span class="token operator">!</span><span class="token punctuation">)</span>
<span class="token punctuation">;</span>   On or stdout <span class="token operator">=</span> Display errors to STDOUT
<span class="token punctuation">;</span> Default Value: On
<span class="token punctuation">;</span> Development Value: On
<span class="token punctuation">;</span> Production Value: Off
<span class="token punctuation">;</span> http://php.net/display-errors
display_errors <span class="token operator">=</span> Off

<span class="token punctuation">;</span> The display of errors <span class="token function">which</span> occur during PHP<span class="token string">&#39;s startup sequence are handled
; separately from display_errors. PHP&#39;</span>s default behavior is to suppress those
<span class="token punctuation">;</span> errors from clients. Turning the display of startup errors on can be useful <span class="token keyword">in</span>
<span class="token punctuation">;</span> debugging configuration problems. We strongly recommend you
<span class="token punctuation">;</span> <span class="token builtin class-name">set</span> this to <span class="token string">&#39;off&#39;</span> <span class="token keyword">for</span> production servers.
<span class="token punctuation">;</span> Default Value: Off
<span class="token punctuation">;</span> Development Value: On
<span class="token punctuation">;</span> Production Value: Off
<span class="token punctuation">;</span> http://php.net/display-startup-errors
display_startup_errors <span class="token operator">=</span> Off

<span class="token punctuation">;</span> Besides displaying errors, PHP can also log errors to locations such as a
<span class="token punctuation">;</span> server-specific log, STDERR, or a location specified by the error_log
<span class="token punctuation">;</span> directive found below. While errors should not be displayed on productions
<span class="token punctuation">;</span> servers they should still be monitored and logging is a great way to <span class="token keyword">do</span> that.
<span class="token punctuation">;</span> Default Value: Off
<span class="token punctuation">;</span> Development Value: On
<span class="token punctuation">;</span> Production Value: On
<span class="token punctuation">;</span> http://php.net/log-errors
log_errors <span class="token operator">=</span> On

<span class="token punctuation">;</span> Set maximum length of log_errors. In error_log information about the <span class="token builtin class-name">source</span> is
<span class="token punctuation">;</span> added. The default is <span class="token number">1024</span> and <span class="token number">0</span> allows to not apply any maximum length at all.
<span class="token punctuation">;</span> http://php.net/log-errors-max-len
log_errors_max_len <span class="token operator">=</span> <span class="token number">1024</span>

<span class="token punctuation">;</span> Do not log repeated messages. Repeated errors must occur <span class="token keyword">in</span> same <span class="token function">file</span> on same
<span class="token punctuation">;</span> line unless ignore_repeated_source is <span class="token builtin class-name">set</span> true.
<span class="token punctuation">;</span> http://php.net/ignore-repeated-errors
ignore_repeated_errors <span class="token operator">=</span> Off

<span class="token punctuation">;</span> Ignore <span class="token builtin class-name">source</span> of message when ignoring repeated messages. When this setting
<span class="token punctuation">;</span> is On you will not log errors with repeated messages from different files or
<span class="token punctuation">;</span> <span class="token builtin class-name">source</span> lines.
<span class="token punctuation">;</span> http://php.net/ignore-repeated-source
ignore_repeated_source <span class="token operator">=</span> Off

<span class="token punctuation">;</span> If this parameter is <span class="token builtin class-name">set</span> to Off, <span class="token keyword">then</span> memory leaks will not be shown <span class="token punctuation">(</span>on
<span class="token punctuation">;</span> stdout or <span class="token keyword">in</span> the log<span class="token punctuation">)</span>. This is only effective <span class="token keyword">in</span> a debug compile, and <span class="token keyword">if</span>
<span class="token punctuation">;</span> error reporting includes E_WARNING <span class="token keyword">in</span> the allowed list
<span class="token punctuation">;</span> http://php.net/report-memleaks
report_memleaks <span class="token operator">=</span> On

<span class="token punctuation">;</span> This setting is on by default.
<span class="token punctuation">;</span>report_zend_debug <span class="token operator">=</span> <span class="token number">0</span>

<span class="token punctuation">;</span> Store the last error/warning message <span class="token keyword">in</span> <span class="token variable">$php_errormsg</span> <span class="token punctuation">(</span>boolean<span class="token punctuation">)</span>. Setting this value
<span class="token punctuation">;</span> to On can assist <span class="token keyword">in</span> debugging and is appropriate <span class="token keyword">for</span> development servers. It should
<span class="token punctuation">;</span> however be disabled on production servers.
<span class="token punctuation">;</span> This directive is DEPRECATED.
<span class="token punctuation">;</span> Default Value: Off
<span class="token punctuation">;</span> Development Value: Off
<span class="token punctuation">;</span> Production Value: Off
<span class="token punctuation">;</span> http://php.net/track-errors
<span class="token punctuation">;</span>track_errors <span class="token operator">=</span> Off

<span class="token punctuation">;</span> Turn off normal error reporting and emit XML-RPC error XML
<span class="token punctuation">;</span> http://php.net/xmlrpc-errors
<span class="token punctuation">;</span>xmlrpc_errors <span class="token operator">=</span> <span class="token number">0</span>

<span class="token punctuation">;</span> An XML-RPC faultCode
<span class="token punctuation">;</span>xmlrpc_error_number <span class="token operator">=</span> <span class="token number">0</span>

<span class="token punctuation">;</span> When PHP displays or logs an error, it has the capability of formatting the
<span class="token punctuation">;</span> error message as HTML <span class="token keyword">for</span> easier reading. This directive controls whether
<span class="token punctuation">;</span> the error message is formatted as HTML or not.
<span class="token punctuation">;</span> Note: This directive is hardcoded to Off <span class="token keyword">for</span> the CLI SAPI
<span class="token punctuation">;</span> http://php.net/html-errors
<span class="token punctuation">;</span>html_errors <span class="token operator">=</span> On

<span class="token punctuation">;</span> If html_errors is <span class="token builtin class-name">set</span> to On *and* docref_root is not empty, <span class="token keyword">then</span> PHP
<span class="token punctuation">;</span> produces clickable error messages that direct to a page describing the error
<span class="token punctuation">;</span> or <span class="token keyword">function</span> causing the error <span class="token keyword">in</span> detail.
<span class="token punctuation">;</span> You can download a copy of the PHP manual from http://php.net/docs
<span class="token punctuation">;</span> and change docref_root to the base URL of your <span class="token builtin class-name">local</span> copy including the
<span class="token punctuation">;</span> leading <span class="token string">&#39;/&#39;</span><span class="token builtin class-name">.</span> You must also specify the <span class="token function">file</span> extension being used including
<span class="token punctuation">;</span> the dot. PHP<span class="token string">&#39;s default behavior is to leave these settings empty, in which
; case no links to documentation are generated.
; Note: Never use this feature for production boxes.
; http://php.net/docref-root
; Examples
;docref_root = &quot;/phpmanual/&quot;

; http://php.net/docref-ext
;docref_ext = .html

; String to output before an error message. PHP&#39;</span>s default behavior is to leave
<span class="token punctuation">;</span> this setting blank.
<span class="token punctuation">;</span> http://php.net/error-prepend-string
<span class="token punctuation">;</span> Example:
<span class="token punctuation">;</span>error_prepend_string <span class="token operator">=</span> <span class="token string">&quot;&lt;span style=&#39;color: #ff0000&#39;&gt;&quot;</span>

<span class="token punctuation">;</span> String to output after an error message. PHP<span class="token string">&#39;s default behavior is to leave
; this setting blank.
; http://php.net/error-append-string
; Example:
;error_append_string = &quot;&lt;/span&gt;&quot;

; Log errors to specified file. PHP&#39;</span>s default behavior is to leave this value
<span class="token punctuation">;</span> empty.
<span class="token punctuation">;</span> http://php.net/error-log
<span class="token punctuation">;</span> Example:
<span class="token punctuation">;</span>error_log <span class="token operator">=</span> php_errors.log
<span class="token punctuation">;</span> Log errors to syslog <span class="token punctuation">(</span>Event Log on Windows<span class="token punctuation">)</span>.
<span class="token punctuation">;</span>error_log <span class="token operator">=</span> syslog

<span class="token punctuation">;</span> The syslog ident is a string <span class="token function">which</span> is prepended to every message logged
<span class="token punctuation">;</span> to syslog. Only used when error_log is <span class="token builtin class-name">set</span> to syslog.
<span class="token punctuation">;</span>syslog.ident <span class="token operator">=</span> php

<span class="token punctuation">;</span> The syslog facility is used to specify what <span class="token builtin class-name">type</span> of program is logging
<span class="token punctuation">;</span> the message. Only used when error_log is <span class="token builtin class-name">set</span> to syslog.
<span class="token punctuation">;</span>syslog.facility <span class="token operator">=</span> user

<span class="token punctuation">;</span> Set this to disable filtering control characters <span class="token punctuation">(</span>the default<span class="token punctuation">)</span>.
<span class="token punctuation">;</span> Some loggers only accept NVT-ASCII, others accept anything that<span class="token string">&#39;s not
; control characters. If your logger accepts everything, then no filtering
; is needed at all.
; Allowed values are:
;   ascii (all printable ASCII characters and NL)
;   no-ctrl (all characters except control characters)
;   all (all characters)
;   raw (like &quot;all&quot;, but messages are not split at newlines)
; http://php.net/syslog.filter
;syslog.filter = ascii

;windows.show_crt_warning
; Default value: 0
; Development value: 0
; Production value: 0

;;;;;;;;;;;;;;;;;
; Data Handling ;
;;;;;;;;;;;;;;;;;

; The separator used in PHP generated URLs to separate arguments.
; PHP&#39;</span>s default setting is <span class="token string">&quot;&amp;&quot;</span><span class="token builtin class-name">.</span>
<span class="token punctuation">;</span> http://php.net/arg-separator.output
<span class="token punctuation">;</span> Example:
<span class="token punctuation">;</span>arg_separator.output <span class="token operator">=</span> <span class="token string">&quot;&amp;amp;&quot;</span>

<span class="token punctuation">;</span> List of separator<span class="token punctuation">(</span>s<span class="token punctuation">)</span> used by PHP to parse input URLs into variables.
<span class="token punctuation">;</span> PHP<span class="token string">&#39;s default setting is &quot;&amp;&quot;.
; NOTE: Every character in this directive is considered as separator!
; http://php.net/arg-separator.input
; Example:
;arg_separator.input = &quot;;&amp;&quot;

; This directive determines which super global arrays are registered when PHP
; starts up. G,P,C,E &amp; S are abbreviations for the following respective super
; globals: GET, POST, COOKIE, ENV and SERVER. There is a performance penalty
; paid for the registration of these arrays and because ENV is not as commonly
; used as the others, ENV is not recommended on productions servers. You
; can still get access to the environment variables through getenv() should you
; need to.
; Default Value: &quot;EGPCS&quot;
; Development Value: &quot;GPCS&quot;
; Production Value: &quot;GPCS&quot;;
; http://php.net/variables-order
variables_order = &quot;GPCS&quot;

; This directive determines which super global data (G,P &amp; C) should be
; registered into the super global array REQUEST. If so, it also determines
; the order in which that data is registered. The values for this directive
; are specified in the same manner as the variables_order directive,
; EXCEPT one. Leaving this value empty will cause PHP to use the value set
; in the variables_order directive. It does not mean it will leave the super
; globals array REQUEST empty.
; Default Value: None
; Development Value: &quot;GP&quot;
; Production Value: &quot;GP&quot;
; http://php.net/request-order
request_order = &quot;GP&quot;

; This directive determines whether PHP registers $argv &amp; $argc each time it
; runs. $argv contains an array of all the arguments passed to PHP when a script
; is invoked. $argc contains an integer representing the number of arguments
; that were passed when the script was invoked. These arrays are extremely
; useful when running scripts from the command line. When this directive is
; enabled, registering these variables consumes CPU cycles and memory each time
; a script is executed. For performance reasons, this feature should be disabled
; on production servers.
; Note: This directive is hardcoded to On for the CLI SAPI
; Default Value: On
; Development Value: Off
; Production Value: Off
; http://php.net/register-argc-argv
register_argc_argv = Off

; When enabled, the ENV, REQUEST and SERVER variables are created when they&#39;</span>re
<span class="token punctuation">;</span> first used <span class="token punctuation">(</span>Just In Time<span class="token punctuation">)</span> instead of when the script starts. If these
<span class="token punctuation">;</span> variables are not used within a script, having this directive on will result
<span class="token punctuation">;</span> <span class="token keyword">in</span> a performance gain. The PHP directive register_argc_argv must be disabled
<span class="token punctuation">;</span> <span class="token keyword">for</span> this directive to have any effect.
<span class="token punctuation">;</span> http://php.net/auto-globals-jit
auto_globals_jit <span class="token operator">=</span> On

<span class="token punctuation">;</span> Whether PHP will <span class="token builtin class-name">read</span> the POST data.
<span class="token punctuation">;</span> This option is enabled by default.
<span class="token punctuation">;</span> Most likely, you won<span class="token string">&#39;t want to disable this option globally. It causes $_POST
; and $_FILES to always be empty; the only way you will be able to read the
; POST data will be through the php://input stream wrapper. This can be useful
; to proxy requests or to process the POST data in a memory efficient fashion.
; http://php.net/enable-post-data-reading
;enable_post_data_reading = Off

; Maximum size of POST data that PHP will accept.
; Its value may be 0 to disable the limit. It is ignored if POST data reading
; is disabled through enable_post_data_reading.
; http://php.net/post-max-size
post_max_size = 64M

; Automatically add files before PHP document.
; http://php.net/auto-prepend-file
auto_prepend_file =

; Automatically add files after PHP document.
; http://php.net/auto-append-file
auto_append_file =

; By default, PHP will output a media type using the Content-Type header. To
; disable this, simply set it to be empty.
;
; PHP&#39;</span>s built-in default media <span class="token builtin class-name">type</span> is <span class="token builtin class-name">set</span> to text/html.
<span class="token punctuation">;</span> http://php.net/default-mimetype
default_mimetype <span class="token operator">=</span> <span class="token string">&quot;text/html&quot;</span>

<span class="token punctuation">;</span> PHP<span class="token string">&#39;s default character set is set to UTF-8.
; http://php.net/default-charset
default_charset = &quot;UTF-8&quot;

; PHP internal character encoding is set to empty.
; If empty, default_charset is used.
; http://php.net/internal-encoding
;internal_encoding =

; PHP input character encoding is set to empty.
; If empty, default_charset is used.
; http://php.net/input-encoding
;input_encoding =

; PHP output character encoding is set to empty.
; If empty, default_charset is used.
; See also output_buffer.
; http://php.net/output-encoding
;output_encoding =

;;;;;;;;;;;;;;;;;;;;;;;;;
; Paths and Directories ;
;;;;;;;;;;;;;;;;;;;;;;;;;

; UNIX: &quot;/path1:/path2&quot;
;include_path = &quot;.:/usr/share/php&quot;
;
; Windows: &quot;\\path1;\\path2&quot;
;include_path = &quot;.;c:\\php\\includes&quot;
;
; PHP&#39;</span>s default setting <span class="token keyword">for</span> include_path is <span class="token string">&quot;.;/path/to/php/pear&quot;</span>
<span class="token punctuation">;</span> http://php.net/include-path

<span class="token punctuation">;</span> The root of the PHP pages, used only <span class="token keyword">if</span> nonempty.
<span class="token punctuation">;</span> <span class="token keyword">if</span> PHP was not compiled with FORCE_REDIRECT, you SHOULD <span class="token builtin class-name">set</span> doc_root
<span class="token punctuation">;</span> <span class="token keyword">if</span> you are running php as a CGI under any web server <span class="token punctuation">(</span>other than IIS<span class="token punctuation">)</span>
<span class="token punctuation">;</span> see documentation <span class="token keyword">for</span> security issues.  The alternate is to use the
<span class="token punctuation">;</span> cgi.force_redirect configuration below
<span class="token punctuation">;</span> http://php.net/doc-root
doc_root <span class="token operator">=</span>

<span class="token punctuation">;</span> The directory under <span class="token function">which</span> PHP opens the script using /~username used only
<span class="token punctuation">;</span> <span class="token keyword">if</span> nonempty.
<span class="token punctuation">;</span> http://php.net/user-dir
user_dir <span class="token operator">=</span>

<span class="token punctuation">;</span> Directory <span class="token keyword">in</span> <span class="token function">which</span> the loadable extensions <span class="token punctuation">(</span>modules<span class="token punctuation">)</span> reside.
<span class="token punctuation">;</span> http://php.net/extension-dir
<span class="token punctuation">;</span>extension_dir <span class="token operator">=</span> <span class="token string">&quot;./&quot;</span>
<span class="token punctuation">;</span> On windows:
<span class="token punctuation">;</span>extension_dir <span class="token operator">=</span> <span class="token string">&quot;ext&quot;</span>

<span class="token punctuation">;</span> Directory where the temporary files should be placed.
<span class="token punctuation">;</span> Defaults to the system default <span class="token punctuation">(</span>see sys_get_temp_dir<span class="token punctuation">)</span>
<span class="token punctuation">;</span>sys_temp_dir <span class="token operator">=</span> <span class="token string">&quot;/tmp&quot;</span>

<span class="token punctuation">;</span> Whether or not to <span class="token builtin class-name">enable</span> the dl<span class="token punctuation">(</span><span class="token punctuation">)</span> function.  The dl<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">function</span> does NOT work
<span class="token punctuation">;</span> properly <span class="token keyword">in</span> multithreaded servers, such as IIS or Zeus, and is automatically
<span class="token punctuation">;</span> disabled on them.
<span class="token punctuation">;</span> http://php.net/enable-dl
enable_dl <span class="token operator">=</span> Off

<span class="token punctuation">;</span> cgi.force_redirect is necessary to provide security running PHP as a CGI under
<span class="token punctuation">;</span> <span class="token function">most</span> web servers.  Left undefined, PHP turns this on by default.  You can
<span class="token punctuation">;</span> turn it off here AT YOUR OWN RISK
<span class="token punctuation">;</span> **You CAN safely turn this off <span class="token keyword">for</span> IIS, <span class="token keyword">in</span> fact, you MUST.**
<span class="token punctuation">;</span> http://php.net/cgi.force-redirect
<span class="token punctuation">;</span>cgi.force_redirect <span class="token operator">=</span> <span class="token number">1</span>

<span class="token punctuation">;</span> <span class="token keyword">if</span> cgi.nph is enabled it will force cgi to always sent Status: <span class="token number">200</span> with
<span class="token punctuation">;</span> every request. PHP<span class="token string">&#39;s default behavior is to disable this feature.
;cgi.nph = 1

; if cgi.force_redirect is turned on, and you are not running under Apache or Netscape
; (iPlanet) web servers, you MAY need to set an environment variable name that PHP
; will look for to know it is OK to continue execution.  Setting this variable MAY
; cause security issues, KNOW WHAT YOU ARE DOING FIRST.
; http://php.net/cgi.redirect-status-env
;cgi.redirect_status_env =

; cgi.fix_pathinfo provides *real* PATH_INFO/PATH_TRANSLATED support for CGI.  PHP&#39;</span>s
<span class="token punctuation">;</span> previous behaviour was to <span class="token builtin class-name">set</span> PATH_TRANSLATED to SCRIPT_FILENAME, and to not grok
<span class="token punctuation">;</span> what PATH_INFO is.  For <span class="token function">more</span> information on PATH_INFO, see the cgi specs.  Setting
<span class="token punctuation">;</span> this to <span class="token number">1</span> will cause PHP CGI to fix its paths to conform to the spec.  A setting
<span class="token punctuation">;</span> of zero causes PHP to behave as before.  Default is <span class="token number">1</span>.  You should fix your scripts
<span class="token punctuation">;</span> to use SCRIPT_FILENAME rather than PATH_TRANSLATED.
<span class="token punctuation">;</span> http://php.net/cgi.fix-pathinfo
<span class="token punctuation">;</span><span class="token assign-left variable">cgi.fix_pathinfo</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">;</span> <span class="token keyword">if</span> cgi.discard_path is enabled, the PHP CGI binary can safely be placed outside
<span class="token punctuation">;</span> of the web tree and people will not be able to circumvent .htaccess security.
<span class="token punctuation">;</span><span class="token assign-left variable">cgi.discard_path</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">;</span> FastCGI under IIS supports the ability to impersonate
<span class="token punctuation">;</span> security tokens of the calling client.  This allows IIS to define the
<span class="token punctuation">;</span> security context that the request runs under.  mod_fastcgi under Apache
<span class="token punctuation">;</span> does not currently support this feature <span class="token punctuation">(</span>03/17/2002<span class="token punctuation">)</span>
<span class="token punctuation">;</span> Set to <span class="token number">1</span> <span class="token keyword">if</span> running under IIS.  Default is zero.
<span class="token punctuation">;</span> http://php.net/fastcgi.impersonate
<span class="token punctuation">;</span>fastcgi.impersonate <span class="token operator">=</span> <span class="token number">1</span>

<span class="token punctuation">;</span> Disable logging through FastCGI connection. PHP<span class="token string">&#39;s default behavior is to enable
; this feature.
;fastcgi.logging = 0

; cgi.rfc2616_headers configuration option tells PHP what type of headers to
; use when sending HTTP response code. If set to 0, PHP sends Status: header that
; is supported by Apache. When this option is set to 1, PHP will send
; RFC2616 compliant header.
; Default is zero.
; http://php.net/cgi.rfc2616-headers
;cgi.rfc2616_headers = 0

; cgi.check_shebang_line controls whether CGI PHP checks for line starting with #!
; (shebang) at the top of the running script. This line might be needed if the
; script support running both as stand-alone script and via PHP CGI&lt;. PHP in CGI
; mode skips this line and ignores its content if this directive is turned on.
; http://php.net/cgi.check-shebang-line
;cgi.check_shebang_line=1

;;;;;;;;;;;;;;;;
; File Uploads ;
;;;;;;;;;;;;;;;;

; Whether to allow HTTP file uploads.
; http://php.net/file-uploads
file_uploads = On

; Temporary directory for HTTP uploaded files (will use system default if not
; specified).
; http://php.net/upload-tmp-dir
upload_tmp_dir = /tmp

; Maximum allowed size for uploaded files.
; http://php.net/upload-max-filesize
upload_max_filesize = 64M

; Maximum number of files that can be uploaded via a single request
max_file_uploads = 20

;;;;;;;;;;;;;;;;;;
; Fopen wrappers ;
;;;;;;;;;;;;;;;;;;

; Whether to allow the treatment of URLs (like http:// or ftp://) as files.
; http://php.net/allow-url-fopen
allow_url_fopen = On

; Whether to allow include/require to open URLs (like http:// or ftp://) as files.
; http://php.net/allow-url-include
allow_url_include = Off

; Define the anonymous ftp password (your email address). PHP&#39;</span>s default setting
<span class="token punctuation">;</span> <span class="token keyword">for</span> this is empty.
<span class="token punctuation">;</span> http://php.net/from
<span class="token punctuation">;</span><span class="token assign-left variable">from</span><span class="token operator">=</span><span class="token string">&quot;john@doe.com&quot;</span>

<span class="token punctuation">;</span> Define the User-Agent string. PHP<span class="token string">&#39;s default setting for this is empty.
; http://php.net/user-agent
;user_agent=&quot;PHP&quot;

; Default timeout for socket based streams (seconds)
; http://php.net/default-socket-timeout
default_socket_timeout = 60

; If your scripts have to deal with files from Macintosh systems,
; or you are running on a Mac and need to deal with files from
; unix or win32 systems, setting this flag will cause PHP to
; automatically detect the EOL character in those files so that
; fgets() and file() will work regardless of the source of the file.
; http://php.net/auto-detect-line-endings
;auto_detect_line_endings = Off

;;;;;;;;;;;;;;;;;;;;;;
; Dynamic Extensions ;
;;;;;;;;;;;;;;;;;;;;;;

; If you wish to have an extension loaded automatically, use the following
; syntax:
;
;   extension=modulename
;
; For example:
;
;   extension=mysqli
;
; When the extension library to load is not located in the default extension
; directory, You may specify an absolute path to the library file:
;
;   extension=/path/to/extension/mysqli.so
;
; Note : The syntax used in previous PHP versions (&#39;</span><span class="token assign-left variable">extension</span><span class="token operator">=</span><span class="token operator">&lt;</span>ext<span class="token operator">&gt;</span>.so<span class="token string">&#39; and
; &#39;</span>extension<span class="token operator">=</span><span class="token string">&#39;php_&lt;ext&gt;.dll&#39;</span><span class="token punctuation">)</span> is supported <span class="token keyword">for</span> legacy reasons and may be
<span class="token punctuation">;</span> deprecated <span class="token keyword">in</span> a future PHP major version. So, when it is possible, please
<span class="token punctuation">;</span> move to the new <span class="token punctuation">(</span><span class="token string">&#39;extension=&lt;ext&gt;) syntax.
;
; Notes for Windows environments :
;
; - Many DLL files are located in the extensions/ (PHP 4) or ext/ (PHP 5+)
;   extension folders as well as the separate PECL DLL download (PHP 5+).
;   Be sure to appropriately set the extension_dir directive.
;
;extension=bz2
;extension=curl
;extension=ffi
;extension=ftp
;extension=fileinfo
;extension=gd2
;extension=gettext
;extension=gmp
;extension=intl
;extension=imap
;extension=ldap
;extension=mbstring
;extension=exif      ; Must be after mbstring as it depends on it
;extension=mysqli
;extension=oci8_12c  ; Use with Oracle Database 12c Instant Client
;extension=odbc
;extension=openssl
;extension=pdo_firebird
;extension=pdo_mysql
;extension=pdo_oci
;extension=pdo_odbc
;extension=pdo_pgsql
;extension=pdo_sqlite
;extension=pgsql
;extension=shmop

; The MIBS data available in the PHP distribution must be installed.
; See http://www.php.net/manual/en/snmp.installation.php
;extension=snmp

;extension=soap
;extension=sockets
;extension=sodium
;extension=sqlite3
;extension=tidy
;extension=xmlrpc
;extension=xsl

;;;;;;;;;;;;;;;;;;;
; Module Settings ;
;;;;;;;;;;;;;;;;;;;

[CLI Server]
; Whether the CLI web server uses ANSI color coding in its terminal output.
cli_server.color = On

[Date]
; Defines the default timezone used by the date functions
; http://php.net/date.timezone
;date.timezone =

; http://php.net/date.default-latitude
;date.default_latitude = 31.7667

; http://php.net/date.default-longitude
;date.default_longitude = 35.2333

; http://php.net/date.sunrise-zenith
;date.sunrise_zenith = 90.583333

; http://php.net/date.sunset-zenith
;date.sunset_zenith = 90.583333

[filter]
; http://php.net/filter.default
;filter.default = unsafe_raw

; http://php.net/filter.default-flags
;filter.default_flags =

[iconv]
; Use of this INI entry is deprecated, use global input_encoding instead.
; If empty, default_charset or input_encoding or iconv.input_encoding is used.
; The precedence is: default_charset &lt; input_encoding &lt; iconv.input_encoding
;iconv.input_encoding =

; Use of this INI entry is deprecated, use global internal_encoding instead.
; If empty, default_charset or internal_encoding or iconv.internal_encoding is used.
; The precedence is: default_charset &lt; internal_encoding &lt; iconv.internal_encoding
;iconv.internal_encoding =

; Use of this INI entry is deprecated, use global output_encoding instead.
; If empty, default_charset or output_encoding or iconv.output_encoding is used.
; The precedence is: default_charset &lt; output_encoding &lt; iconv.output_encoding
; To use an output encoding conversion, iconv&#39;</span>s output handler must be <span class="token builtin class-name">set</span>
<span class="token punctuation">;</span> otherwise output encoding conversion cannot be performed.
<span class="token punctuation">;</span>iconv.output_encoding <span class="token operator">=</span>

<span class="token punctuation">[</span>imap<span class="token punctuation">]</span>
<span class="token punctuation">;</span> rsh/ssh logins are disabled by default. Use this INI entry <span class="token keyword">if</span> you want to
<span class="token punctuation">;</span> <span class="token builtin class-name">enable</span> them. Note that the IMAP library does not filter mailbox names before
<span class="token punctuation">;</span> passing them to rsh/ssh command, thus passing untrusted data to this <span class="token keyword">function</span>
<span class="token punctuation">;</span> with rsh/ssh enabled is insecure.
<span class="token punctuation">;</span><span class="token assign-left variable">imap.enable_insecure_rsh</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">[</span>intl<span class="token punctuation">]</span>
<span class="token punctuation">;</span>intl.default_locale <span class="token operator">=</span>
<span class="token punctuation">;</span> This directive allows you to produce PHP errors when some error
<span class="token punctuation">;</span> happens within intl functions. The value is the level of the error produced.
<span class="token punctuation">;</span> Default is <span class="token number">0</span>, <span class="token function">which</span> does not produce any errors.
<span class="token punctuation">;</span>intl.error_level <span class="token operator">=</span> E_WARNING
<span class="token punctuation">;</span>intl.use_exceptions <span class="token operator">=</span> <span class="token number">0</span>

<span class="token punctuation">[</span>sqlite3<span class="token punctuation">]</span>
<span class="token punctuation">;</span> Directory pointing to SQLite3 extensions
<span class="token punctuation">;</span> http://php.net/sqlite3.extension-dir
<span class="token punctuation">;</span>sqlite3.extension_dir <span class="token operator">=</span>

<span class="token punctuation">;</span> SQLite defensive mode flag <span class="token punctuation">(</span>only available from SQLite <span class="token number">3.26</span>+<span class="token punctuation">)</span>
<span class="token punctuation">;</span> When the defensive flag is enabled, language features that allow ordinary
<span class="token punctuation">;</span> SQL to deliberately corrupt the database <span class="token function">file</span> are disabled. This forbids
<span class="token punctuation">;</span> writing directly to the schema, shadow tables <span class="token punctuation">(</span>eg. FTS data tables<span class="token punctuation">)</span>, or
<span class="token punctuation">;</span> the sqlite_dbpage virtual table.
<span class="token punctuation">;</span> https://www.sqlite.org/c3ref/c_dbconfig_defensive.html
<span class="token punctuation">;</span> <span class="token punctuation">(</span>for older SQLite versions, this flag has no use<span class="token punctuation">)</span>
<span class="token punctuation">;</span>sqlite3.defensive <span class="token operator">=</span> <span class="token number">1</span>

<span class="token punctuation">[</span>Pcre<span class="token punctuation">]</span>
<span class="token punctuation">;</span> PCRE library backtracking limit.
<span class="token punctuation">;</span> http://php.net/pcre.backtrack-limit
<span class="token punctuation">;</span><span class="token assign-left variable">pcre.backtrack_limit</span><span class="token operator">=</span><span class="token number">100000</span>

<span class="token punctuation">;</span> PCRE library recursion limit.
<span class="token punctuation">;</span> Please note that <span class="token keyword">if</span> you <span class="token builtin class-name">set</span> this value to a high number you may consume all
<span class="token punctuation">;</span> the available process stack and eventually crash PHP <span class="token punctuation">(</span>due to reaching the
<span class="token punctuation">;</span> stack size limit imposed by the Operating System<span class="token punctuation">)</span>.
<span class="token punctuation">;</span> http://php.net/pcre.recursion-limit
<span class="token punctuation">;</span><span class="token assign-left variable">pcre.recursion_limit</span><span class="token operator">=</span><span class="token number">100000</span>

<span class="token punctuation">;</span> Enables or disables JIT compilation of patterns. This requires the PCRE
<span class="token punctuation">;</span> library to be compiled with JIT support.
<span class="token punctuation">;</span><span class="token assign-left variable">pcre.jit</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">[</span>Pdo<span class="token punctuation">]</span>
<span class="token punctuation">;</span> Whether to pool ODBC connections. Can be one of <span class="token string">&quot;strict&quot;</span>, <span class="token string">&quot;relaxed&quot;</span> or <span class="token string">&quot;off&quot;</span>
<span class="token punctuation">;</span> http://php.net/pdo-odbc.connection-pooling
<span class="token punctuation">;</span><span class="token assign-left variable">pdo_odbc.connection_pooling</span><span class="token operator">=</span>strict

<span class="token punctuation">;</span>pdo_odbc.db2_instance_name

<span class="token punctuation">[</span>Pdo_mysql<span class="token punctuation">]</span>
<span class="token punctuation">;</span> Default socket name <span class="token keyword">for</span> <span class="token builtin class-name">local</span> MySQL connects.  If empty, uses the built-in
<span class="token punctuation">;</span> MySQL defaults.
<span class="token assign-left variable">pdo_mysql.default_socket</span><span class="token operator">=</span>

<span class="token punctuation">[</span>Phar<span class="token punctuation">]</span>
<span class="token punctuation">;</span> http://php.net/phar.readonly
<span class="token punctuation">;</span>phar.readonly <span class="token operator">=</span> On

<span class="token punctuation">;</span> http://php.net/phar.require-hash
<span class="token punctuation">;</span>phar.require_hash <span class="token operator">=</span> On

<span class="token punctuation">;</span>phar.cache_list <span class="token operator">=</span>

<span class="token punctuation">[</span>mail function<span class="token punctuation">]</span>
<span class="token punctuation">;</span> For Win32 only.
<span class="token punctuation">;</span> http://php.net/smtp
SMTP <span class="token operator">=</span> localhost
<span class="token punctuation">;</span> http://php.net/smtp-port
smtp_port <span class="token operator">=</span> <span class="token number">25</span>

<span class="token punctuation">;</span> For Win32 only.
<span class="token punctuation">;</span> http://php.net/sendmail-from
<span class="token punctuation">;</span>sendmail_from <span class="token operator">=</span> me@example.com

<span class="token punctuation">;</span> For Unix only.  You may supply arguments as well <span class="token punctuation">(</span>default: <span class="token string">&quot;sendmail -t -i&quot;</span><span class="token punctuation">)</span>.
<span class="token punctuation">;</span> http://php.net/sendmail-path
<span class="token punctuation">;</span>sendmail_path <span class="token operator">=</span>

<span class="token punctuation">;</span> Force the addition of the specified parameters to be passed as extra parameters
<span class="token punctuation">;</span> to the <span class="token function">sendmail</span> binary. These parameters will always replace the value of
<span class="token punctuation">;</span> the 5th parameter to mail<span class="token punctuation">(</span><span class="token punctuation">)</span>.
<span class="token punctuation">;</span>mail.force_extra_parameters <span class="token operator">=</span>

<span class="token punctuation">;</span> Add X-PHP-Originating-Script: that will include uid of the script followed by the filename
mail.add_x_header <span class="token operator">=</span> Off

<span class="token punctuation">;</span> The path to a log <span class="token function">file</span> that will log all mail<span class="token punctuation">(</span><span class="token punctuation">)</span> calls. Log entries include
<span class="token punctuation">;</span> the full path of the script, line number, To address and headers.
<span class="token punctuation">;</span>mail.log <span class="token operator">=</span>
<span class="token punctuation">;</span> Log mail to syslog <span class="token punctuation">(</span>Event Log on Windows<span class="token punctuation">)</span>.
<span class="token punctuation">;</span>mail.log <span class="token operator">=</span> syslog

<span class="token punctuation">[</span>ODBC<span class="token punctuation">]</span>
<span class="token punctuation">;</span> http://php.net/odbc.default-db
<span class="token punctuation">;</span>odbc.default_db    <span class="token operator">=</span>  Not yet implemented

<span class="token punctuation">;</span> http://php.net/odbc.default-user
<span class="token punctuation">;</span>odbc.default_user  <span class="token operator">=</span>  Not yet implemented

<span class="token punctuation">;</span> http://php.net/odbc.default-pw
<span class="token punctuation">;</span>odbc.default_pw    <span class="token operator">=</span>  Not yet implemented

<span class="token punctuation">;</span> Controls the ODBC cursor model.
<span class="token punctuation">;</span> Default: SQL_CURSOR_STATIC <span class="token punctuation">(</span>default<span class="token punctuation">)</span>.
<span class="token punctuation">;</span>odbc.default_cursortype

<span class="token punctuation">;</span> Allow or prevent persistent links.
<span class="token punctuation">;</span> http://php.net/odbc.allow-persistent
odbc.allow_persistent <span class="token operator">=</span> On

<span class="token punctuation">;</span> Check that a connection is still valid before reuse.
<span class="token punctuation">;</span> http://php.net/odbc.check-persistent
odbc.check_persistent <span class="token operator">=</span> On

<span class="token punctuation">;</span> Maximum number of persistent links.  <span class="token parameter variable">-1</span> means no limit.
<span class="token punctuation">;</span> http://php.net/odbc.max-persistent
odbc.max_persistent <span class="token operator">=</span> <span class="token parameter variable">-1</span>

<span class="token punctuation">;</span> Maximum number of links <span class="token punctuation">(</span>persistent + non-persistent<span class="token punctuation">)</span>.  <span class="token parameter variable">-1</span> means no limit.
<span class="token punctuation">;</span> http://php.net/odbc.max-links
odbc.max_links <span class="token operator">=</span> <span class="token parameter variable">-1</span>

<span class="token punctuation">;</span> Handling of LONG fields.  Returns number of bytes to variables.  <span class="token number">0</span> means
<span class="token punctuation">;</span> passthru.
<span class="token punctuation">;</span> http://php.net/odbc.defaultlrl
odbc.defaultlrl <span class="token operator">=</span> <span class="token number">4096</span>

<span class="token punctuation">;</span> Handling of binary data.  <span class="token number">0</span> means passthru, <span class="token number">1</span> <span class="token builtin class-name">return</span> as is, <span class="token number">2</span> convert to char.
<span class="token punctuation">;</span> See the documentation on odbc_binmode and odbc_longreadlen <span class="token keyword">for</span> an explanation
<span class="token punctuation">;</span> of odbc.defaultlrl and odbc.defaultbinmode
<span class="token punctuation">;</span> http://php.net/odbc.defaultbinmode
odbc.defaultbinmode <span class="token operator">=</span> <span class="token number">1</span>

<span class="token punctuation">[</span>MySQLi<span class="token punctuation">]</span>

<span class="token punctuation">;</span> Maximum number of persistent links.  <span class="token parameter variable">-1</span> means no limit.
<span class="token punctuation">;</span> http://php.net/mysqli.max-persistent
mysqli.max_persistent <span class="token operator">=</span> <span class="token parameter variable">-1</span>

<span class="token punctuation">;</span> Allow accessing, from PHP<span class="token string">&#39;s perspective, local files with LOAD DATA statements
; http://php.net/mysqli.allow_local_infile
;mysqli.allow_local_infile = On

; Allow or prevent persistent links.
; http://php.net/mysqli.allow-persistent
mysqli.allow_persistent = On

; Maximum number of links.  -1 means no limit.
; http://php.net/mysqli.max-links
mysqli.max_links = -1

; Default port number for mysqli_connect().  If unset, mysqli_connect() will use
; the $MYSQL_TCP_PORT or the mysql-tcp entry in /etc/services or the
; compile-time value defined MYSQL_PORT (in that order).  Win32 will only look
; at MYSQL_PORT.
; http://php.net/mysqli.default-port
mysqli.default_port = 3306

; Default socket name for local MySQL connects.  If empty, uses the built-in
; MySQL defaults.
; http://php.net/mysqli.default-socket
mysqli.default_socket =

; Default host for mysqli_connect() (doesn&#39;</span>t apply <span class="token keyword">in</span> safe mode<span class="token punctuation">)</span>.
<span class="token punctuation">;</span> http://php.net/mysqli.default-host
mysqli.default_host <span class="token operator">=</span>

<span class="token punctuation">;</span> Default user <span class="token keyword">for</span> mysqli_connect<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>doesn<span class="token string">&#39;t apply in safe mode).
; http://php.net/mysqli.default-user
mysqli.default_user =

; Default password for mysqli_connect() (doesn&#39;</span>t apply <span class="token keyword">in</span> safe mode<span class="token punctuation">)</span>.
<span class="token punctuation">;</span> Note that this is generally a *bad* idea to store passwords <span class="token keyword">in</span> this file.
<span class="token punctuation">;</span> *Any* user with PHP access can run <span class="token string">&#39;echo get_cfg_var(&quot;mysqli.default_pw&quot;)
; and reveal this password!  And of course, any users with read access to this
; file will be able to reveal the password as well.
; http://php.net/mysqli.default-pw
mysqli.default_pw =

; Allow or prevent reconnect
mysqli.reconnect = Off

[mysqlnd]
; Enable / Disable collection of general statistics by mysqlnd which can be
; used to tune and monitor MySQL operations.
mysqlnd.collect_statistics = On

; Enable / Disable collection of memory usage statistics by mysqlnd which can be
; used to tune and monitor MySQL operations.
mysqlnd.collect_memory_statistics = Off

; Records communication from all extensions using mysqlnd to the specified log
; file.
; http://php.net/mysqlnd.debug
;mysqlnd.debug =

; Defines which queries will be logged.
;mysqlnd.log_mask = 0

; Default size of the mysqlnd memory pool, which is used by result sets.
;mysqlnd.mempool_default_size = 16000

; Size of a pre-allocated buffer used when sending commands to MySQL in bytes.
;mysqlnd.net_cmd_buffer_size = 2048

; Size of a pre-allocated buffer used for reading data sent by the server in
; bytes.
;mysqlnd.net_read_buffer_size = 32768

; Timeout for network requests in seconds.
;mysqlnd.net_read_timeout = 31536000

; SHA-256 Authentication Plugin related. File with the MySQL server public RSA
; key.
;mysqlnd.sha256_server_public_key =

[OCI8]

; Connection: Enables privileged connections using external
; credentials (OCI_SYSOPER, OCI_SYSDBA)
; http://php.net/oci8.privileged-connect
;oci8.privileged_connect = Off

; Connection: The maximum number of persistent OCI8 connections per
; process. Using -1 means no limit.
; http://php.net/oci8.max-persistent
;oci8.max_persistent = -1

; Connection: The maximum number of seconds a process is allowed to
; maintain an idle persistent connection. Using -1 means idle
; persistent connections will be maintained forever.
; http://php.net/oci8.persistent-timeout
;oci8.persistent_timeout = -1

; Connection: The number of seconds that must pass before issuing a
; ping during oci_pconnect() to check the connection validity. When
; set to 0, each oci_pconnect() will cause a ping. Using -1 disables
; pings completely.
; http://php.net/oci8.ping-interval
;oci8.ping_interval = 60

; Connection: Set this to a user chosen connection class to be used
; for all pooled server requests with Oracle 11g Database Resident
; Connection Pooling (DRCP).  To use DRCP, this value should be set to
; the same string for all web servers running the same application,
; the database pool must be configured, and the connection string must
; specify to use a pooled server.
;oci8.connection_class =

; High Availability: Using On lets PHP receive Fast Application
; Notification (FAN) events generated when a database node fails. The
; database must also be configured to post FAN events.
;oci8.events = Off

; Tuning: This option enables statement caching, and specifies how
; many statements to cache. Using 0 disables statement caching.
; http://php.net/oci8.statement-cache-size
;oci8.statement_cache_size = 20

; Tuning: Enables statement prefetching and sets the default number of
; rows that will be fetched automatically after statement execution.
; http://php.net/oci8.default-prefetch
;oci8.default_prefetch = 100

; Compatibility. Using On means oci_close() will not close
; oci_connect() and oci_new_connect() connections.
; http://php.net/oci8.old-oci-close-semantics
;oci8.old_oci_close_semantics = Off

[PostgreSQL]
; Allow or prevent persistent links.
; http://php.net/pgsql.allow-persistent
pgsql.allow_persistent = On

; Detect broken persistent links always with pg_pconnect().
; Auto reset feature requires a little overheads.
; http://php.net/pgsql.auto-reset-persistent
pgsql.auto_reset_persistent = Off

; Maximum number of persistent links.  -1 means no limit.
; http://php.net/pgsql.max-persistent
pgsql.max_persistent = -1

; Maximum number of links (persistent+non persistent).  -1 means no limit.
; http://php.net/pgsql.max-links
pgsql.max_links = -1

; Ignore PostgreSQL backends Notice message or not.
; Notice message logging require a little overheads.
; http://php.net/pgsql.ignore-notice
pgsql.ignore_notice = 0

; Log PostgreSQL backends Notice message or not.
; Unless pgsql.ignore_notice=0, module cannot log notice message.
; http://php.net/pgsql.log-notice
pgsql.log_notice = 0

[bcmath]
; Number of decimal digits for all bcmath functions.
; http://php.net/bcmath.scale
bcmath.scale = 0

[browscap]
; http://php.net/browscap
;browscap = extra/browscap.ini

[Session]
; Handler used to store/retrieve data.
; http://php.net/session.save-handler
session.save_handler = files

; Argument passed to save_handler.  In the case of files, this is the path
; where data files are stored. Note: Windows users have to change this
; variable in order to use PHP&#39;</span>s session functions.
<span class="token punctuation">;</span>
<span class="token punctuation">;</span> The path can be defined as:
<span class="token punctuation">;</span>
<span class="token punctuation">;</span>     session.save_path <span class="token operator">=</span> <span class="token string">&quot;N;/path&quot;</span>
<span class="token punctuation">;</span>
<span class="token punctuation">;</span> where N is an integer.  Instead of storing all the session files <span class="token keyword">in</span>
<span class="token punctuation">;</span> /path, what this will <span class="token keyword">do</span> is use subdirectories N-levels deep, and
<span class="token punctuation">;</span> store the session data <span class="token keyword">in</span> those directories.  This is useful <span class="token keyword">if</span>
<span class="token punctuation">;</span> your OS has problems with many files <span class="token keyword">in</span> one directory, and is
<span class="token punctuation">;</span> a <span class="token function">more</span> efficient layout <span class="token keyword">for</span> servers that handle many sessions.
<span class="token punctuation">;</span>
<span class="token punctuation">;</span> NOTE <span class="token number">1</span>: PHP will not create this directory structure automatically.
<span class="token punctuation">;</span>         You can use the script <span class="token keyword">in</span> the ext/session <span class="token function">dir</span> <span class="token keyword">for</span> that purpose.
<span class="token punctuation">;</span> NOTE <span class="token number">2</span>: See the section on garbage collection below <span class="token keyword">if</span> you choose to
<span class="token punctuation">;</span>         use subdirectories <span class="token keyword">for</span> session storage
<span class="token punctuation">;</span>
<span class="token punctuation">;</span> The <span class="token function">file</span> storage module creates files using mode <span class="token number">600</span> by default.
<span class="token punctuation">;</span> You can change that by using
<span class="token punctuation">;</span>
<span class="token punctuation">;</span>     session.save_path <span class="token operator">=</span> <span class="token string">&quot;N;MODE;/path&quot;</span>
<span class="token punctuation">;</span>
<span class="token punctuation">;</span> where MODE is the octal representation of the mode. Note that this
<span class="token punctuation">;</span> does not overwrite the process<span class="token string">&#39;s umask.
; http://php.net/session.save-path
;session.save_path = &quot;/var/lib/php/sessions&quot;

; Whether to use strict session mode.
; Strict session mode does not accept an uninitialized session ID, and
; regenerates the session ID if the browser sends an uninitialized session ID.
; Strict mode protects applications from session fixation via a session adoption
; vulnerability. It is disabled by default for maximum compatibility, but
; enabling it is encouraged.
; https://wiki.php.net/rfc/strict_sessions
session.use_strict_mode = 0

; Whether to use cookies.
; http://php.net/session.use-cookies
session.use_cookies = 1

; http://php.net/session.cookie-secure
;session.cookie_secure =

; This option forces PHP to fetch and use a cookie for storing and maintaining
; the session id. We encourage this operation as it&#39;</span>s very helpful <span class="token keyword">in</span> combating
<span class="token punctuation">;</span> session hijacking when not specifying and managing your own session id. It is
<span class="token punctuation">;</span> not the be-all and end-all of session hijacking defense, but it<span class="token string">&#39;s a good start.
; http://php.net/session.use-only-cookies
session.use_only_cookies = 1

; Name of the session (used as cookie name).
; http://php.net/session.name
session.name = PHPSESSID

; Initialize session on request startup.
; http://php.net/session.auto-start
session.auto_start = 0

; Lifetime in seconds of cookie or, if 0, until browser is restarted.
; http://php.net/session.cookie-lifetime
session.cookie_lifetime = 0

; The path for which the cookie is valid.
; http://php.net/session.cookie-path
session.cookie_path = /

; The domain for which the cookie is valid.
; http://php.net/session.cookie-domain
session.cookie_domain =

; Whether or not to add the httpOnly flag to the cookie, which makes it
; inaccessible to browser scripting languages such as JavaScript.
; http://php.net/session.cookie-httponly
session.cookie_httponly =

; Add SameSite attribute to cookie to help mitigate Cross-Site Request Forgery (CSRF/XSRF)
; Current valid values are &quot;Lax&quot; or &quot;Strict&quot;
; https://tools.ietf.org/html/draft-west-first-party-cookies-07
session.cookie_samesite =

; Handler used to serialize data. php is the standard serializer of PHP.
; http://php.net/session.serialize-handler
session.serialize_handler = php

; Defines the probability that the &#39;</span>garbage collection<span class="token string">&#39; process is started on every
; session initialization. The probability is calculated by using gc_probability/gc_divisor,
; e.g. 1/100 means there is a 1% chance that the GC process starts on each request.
; Default Value: 1
; Development Value: 1
; Production Value: 1
; http://php.net/session.gc-probability
session.gc_probability = 0

; Defines the probability that the &#39;</span>garbage collection<span class="token string">&#39; process is started on every
; session initialization. The probability is calculated by using gc_probability/gc_divisor,
; e.g. 1/100 means there is a 1% chance that the GC process starts on each request.
; For high volume production servers, using a value of 1000 is a more efficient approach.
; Default Value: 100
; Development Value: 1000
; Production Value: 1000
; http://php.net/session.gc-divisor
session.gc_divisor = 1000

; After this number of seconds, stored data will be seen as &#39;</span>garbage<span class="token string">&#39; and
; cleaned up by the garbage collection process.
; http://php.net/session.gc-maxlifetime
session.gc_maxlifetime = 1440

; NOTE: If you are using the subdirectory option for storing session files
;       (see session.save_path above), then garbage collection does *not*
;       happen automatically.  You will need to do your own garbage
;       collection through a shell script, cron entry, or some other method.
;       For example, the following script would is the equivalent of
;       setting session.gc_maxlifetime to 1440 (1440 seconds = 24 minutes):
;          find /path/to/sessions -cmin +24 -type f | xargs rm

; Check HTTP Referer to invalidate externally stored URLs containing ids.
; HTTP_REFERER has to contain this substring for the session to be
; considered as valid.
; http://php.net/session.referer-check
session.referer_check =

; Set to {nocache,private,public,} to determine HTTP caching aspects
; or leave this empty to avoid sending anti-caching headers.
; http://php.net/session.cache-limiter
session.cache_limiter = nocache

; Document expires after n minutes.
; http://php.net/session.cache-expire
session.cache_expire = 180

; trans sid support is disabled by default.
; Use of trans sid may risk your users&#39;</span> security.
<span class="token punctuation">;</span> Use this option with caution.
<span class="token punctuation">;</span> - User may send URL contains active session ID
<span class="token punctuation">;</span>   to other person via. email/irc/etc.
<span class="token punctuation">;</span> - URL that contains active session ID may be stored
<span class="token punctuation">;</span>   <span class="token keyword">in</span> publicly accessible computer.
<span class="token punctuation">;</span> - User may access your site with the same session ID
<span class="token punctuation">;</span>   always using URL stored <span class="token keyword">in</span> browser<span class="token string">&#39;s history or bookmarks.
; http://php.net/session.use-trans-sid
session.use_trans_sid = 0

; Set session ID character length. This value could be between 22 to 256.
; Shorter length than default is supported only for compatibility reason.
; Users should use 32 or more chars.
; http://php.net/session.sid-length
; Default Value: 32
; Development Value: 26
; Production Value: 26
session.sid_length = 26

; The URL rewriter will look for URLs in a defined set of HTML tag.
; &lt;form&gt; is special; if you include them here, the rewriter will
; add a hidden &lt;input&gt; field with the info which is otherwise appended
; to URLs. &lt;form&gt; tag&#39;</span>s action attribute URL will not be modified
<span class="token punctuation">;</span> unless it is specified.
<span class="token punctuation">;</span> Note that all valid entries require a <span class="token string">&quot;=&quot;</span>, even <span class="token keyword">if</span> no value follows.
<span class="token punctuation">;</span> Default Value: <span class="token string">&quot;a=href,area=href,frame=src,form=&quot;</span>
<span class="token punctuation">;</span> Development Value: <span class="token string">&quot;a=href,area=href,frame=src,form=&quot;</span>
<span class="token punctuation">;</span> Production Value: <span class="token string">&quot;a=href,area=href,frame=src,form=&quot;</span>
<span class="token punctuation">;</span> http://php.net/url-rewriter.tag
session.trans_sid_tag <span class="token operator">=</span> <span class="token string">&quot;a=href,area=href,frame=src,form=&quot;</span>

<span class="token punctuation">;</span> URL rewriter does not rewrite absolute URLs by default.
<span class="token punctuation">;</span> To <span class="token builtin class-name">enable</span> rewrites <span class="token keyword">for</span> absolute paths, target hosts must be specified
<span class="token punctuation">;</span> at RUNTIME. i.e. use ini_set<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">;</span> <span class="token operator">&lt;</span>form<span class="token operator">&gt;</span> tag is special. PHP will check action attribute<span class="token string">&#39;s URL regardless
; of session.trans_sid_tag setting.
; If no host is defined, HTTP_HOST will be used for allowed host.
; Example value: php.net,www.php.net,wiki.php.net
; Use &quot;,&quot; for multiple hosts. No spaces are allowed.
; Default Value: &quot;&quot;
; Development Value: &quot;&quot;
; Production Value: &quot;&quot;
;session.trans_sid_hosts=&quot;&quot;

; Define how many bits are stored in each character when converting
; the binary hash data to something readable.
; Possible values:
;   4  (4 bits: 0-9, a-f)
;   5  (5 bits: 0-9, a-v)
;   6  (6 bits: 0-9, a-z, A-Z, &quot;-&quot;, &quot;,&quot;)
; Default Value: 4
; Development Value: 5
; Production Value: 5
; http://php.net/session.hash-bits-per-character
session.sid_bits_per_character = 5

; Enable upload progress tracking in $_SESSION
; Default Value: On
; Development Value: On
; Production Value: On
; http://php.net/session.upload-progress.enabled
;session.upload_progress.enabled = On

; Cleanup the progress information as soon as all POST data has been read
; (i.e. upload completed).
; Default Value: On
; Development Value: On
; Production Value: On
; http://php.net/session.upload-progress.cleanup
;session.upload_progress.cleanup = On

; A prefix used for the upload progress key in $_SESSION
; Default Value: &quot;upload_progress_&quot;
; Development Value: &quot;upload_progress_&quot;
; Production Value: &quot;upload_progress_&quot;
; http://php.net/session.upload-progress.prefix
;session.upload_progress.prefix = &quot;upload_progress_&quot;

; The index name (concatenated with the prefix) in $_SESSION
; containing the upload progress information
; Default Value: &quot;PHP_SESSION_UPLOAD_PROGRESS&quot;
; Development Value: &quot;PHP_SESSION_UPLOAD_PROGRESS&quot;
; Production Value: &quot;PHP_SESSION_UPLOAD_PROGRESS&quot;
; http://php.net/session.upload-progress.name
;session.upload_progress.name = &quot;PHP_SESSION_UPLOAD_PROGRESS&quot;

; How frequently the upload progress should be updated.
; Given either in percentages (per-file), or in bytes
; Default Value: &quot;1%&quot;
; Development Value: &quot;1%&quot;
; Production Value: &quot;1%&quot;
; http://php.net/session.upload-progress.freq
;session.upload_progress.freq =  &quot;1%&quot;

; The minimum delay between updates, in seconds
; Default Value: 1
; Development Value: 1
; Production Value: 1
; http://php.net/session.upload-progress.min-freq
;session.upload_progress.min_freq = &quot;1&quot;

; Only write session data when session data is changed. Enabled by default.
; http://php.net/session.lazy-write
;session.lazy_write = On

[Assertion]
; Switch whether to compile assertions at all (to have no overhead at run-time)
; -1: Do not compile at all
;  0: Jump over assertion at run-time
;  1: Execute assertions
; Changing from or to a negative value is only possible in php.ini! (For turning assertions on and off at run-time, see assert.active, when zend.assertions = 1)
; Default Value: 1
; Development Value: 1
; Production Value: -1
; http://php.net/zend.assertions
zend.assertions = -1

; Assert(expr); active by default.
; http://php.net/assert.active
;assert.active = On

; Throw an AssertionError on failed assertions
; http://php.net/assert.exception
;assert.exception = On

; Issue a PHP warning for each failed assertion. (Overridden by assert.exception if active)
; http://php.net/assert.warning
;assert.warning = On

; Don&#39;</span>t bail out by default.
<span class="token punctuation">;</span> http://php.net/assert.bail
<span class="token punctuation">;</span>assert.bail <span class="token operator">=</span> Off

<span class="token punctuation">;</span> User-function to be called <span class="token keyword">if</span> an assertion fails.
<span class="token punctuation">;</span> http://php.net/assert.callback
<span class="token punctuation">;</span>assert.callback <span class="token operator">=</span> <span class="token number">0</span>

<span class="token punctuation">;</span> Eval the expression with current error_reporting<span class="token punctuation">(</span><span class="token punctuation">)</span>.  Set to <span class="token boolean">true</span> <span class="token keyword">if</span> you want
<span class="token punctuation">;</span> error_reporting<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> around the eval<span class="token punctuation">(</span><span class="token punctuation">)</span>.
<span class="token punctuation">;</span> http://php.net/assert.quiet-eval
<span class="token punctuation">;</span>assert.quiet_eval <span class="token operator">=</span> <span class="token number">0</span>

<span class="token punctuation">[</span>COM<span class="token punctuation">]</span>
<span class="token punctuation">;</span> path to a <span class="token function">file</span> containing GUIDs, IIDs or filenames of files with TypeLibs
<span class="token punctuation">;</span> http://php.net/com.typelib-file
<span class="token punctuation">;</span>com.typelib_file <span class="token operator">=</span>

<span class="token punctuation">;</span> allow Distributed-COM calls
<span class="token punctuation">;</span> http://php.net/com.allow-dcom
<span class="token punctuation">;</span>com.allow_dcom <span class="token operator">=</span> <span class="token boolean">true</span>

<span class="token punctuation">;</span> autoregister constants of a component<span class="token string">&#39;s typlib on com_load()
; http://php.net/com.autoregister-typelib
;com.autoregister_typelib = true

; register constants casesensitive
; http://php.net/com.autoregister-casesensitive
;com.autoregister_casesensitive = false

; show warnings on duplicate constant registrations
; http://php.net/com.autoregister-verbose
;com.autoregister_verbose = true

; The default character set code-page to use when passing strings to and from COM objects.
; Default: system ANSI code page
;com.code_page=

[mbstring]
; language for internal character representation.
; This affects mb_send_mail() and mbstring.detect_order.
; http://php.net/mbstring.language
;mbstring.language = Japanese

; Use of this INI entry is deprecated, use global internal_encoding instead.
; internal/script encoding.
; Some encoding cannot work as internal encoding. (e.g. SJIS, BIG5, ISO-2022-*)
; If empty, default_charset or internal_encoding or iconv.internal_encoding is used.
; The precedence is: default_charset &lt; internal_encoding &lt; iconv.internal_encoding
;mbstring.internal_encoding =

; Use of this INI entry is deprecated, use global input_encoding instead.
; http input encoding.
; mbstring.encoding_translation = On is needed to use this setting.
; If empty, default_charset or input_encoding or mbstring.input is used.
; The precedence is: default_charset &lt; input_encoding &lt; mbsting.http_input
; http://php.net/mbstring.http-input
;mbstring.http_input =

; Use of this INI entry is deprecated, use global output_encoding instead.
; http output encoding.
; mb_output_handler must be registered as output buffer to function.
; If empty, default_charset or output_encoding or mbstring.http_output is used.
; The precedence is: default_charset &lt; output_encoding &lt; mbstring.http_output
; To use an output encoding conversion, mbstring&#39;</span>s output handler must be <span class="token builtin class-name">set</span>
<span class="token punctuation">;</span> otherwise output encoding conversion cannot be performed.
<span class="token punctuation">;</span> http://php.net/mbstring.http-output
<span class="token punctuation">;</span>mbstring.http_output <span class="token operator">=</span>

<span class="token punctuation">;</span> <span class="token builtin class-name">enable</span> automatic encoding translation according to
<span class="token punctuation">;</span> mbstring.internal_encoding setting. Input chars are
<span class="token punctuation">;</span> converted to internal encoding by setting this to On.
<span class="token punctuation">;</span> Note: Do _not_ use automatic encoding translation <span class="token keyword">for</span>
<span class="token punctuation">;</span>       portable libs/applications.
<span class="token punctuation">;</span> http://php.net/mbstring.encoding-translation
<span class="token punctuation">;</span>mbstring.encoding_translation <span class="token operator">=</span> Off

<span class="token punctuation">;</span> automatic encoding detection order.
<span class="token punctuation">;</span> <span class="token string">&quot;auto&quot;</span> detect order is changed according to mbstring.language
<span class="token punctuation">;</span> http://php.net/mbstring.detect-order
<span class="token punctuation">;</span>mbstring.detect_order <span class="token operator">=</span> auto

<span class="token punctuation">;</span> substitute_character used when character cannot be converted
<span class="token punctuation">;</span> one from another
<span class="token punctuation">;</span> http://php.net/mbstring.substitute-character
<span class="token punctuation">;</span>mbstring.substitute_character <span class="token operator">=</span> none

<span class="token punctuation">;</span> overload<span class="token punctuation">(</span>replace<span class="token punctuation">)</span> single byte functions by mbstring functions.
<span class="token punctuation">;</span> mail<span class="token punctuation">(</span><span class="token punctuation">)</span>, ereg<span class="token punctuation">(</span><span class="token punctuation">)</span>, etc are overloaded by mb_send_mail<span class="token punctuation">(</span><span class="token punctuation">)</span>, mb_ereg<span class="token punctuation">(</span><span class="token punctuation">)</span>,
<span class="token punctuation">;</span> etc. Possible values are <span class="token number">0,1</span>,2,4 or combination of them.
<span class="token punctuation">;</span> For example, <span class="token number">7</span> <span class="token keyword">for</span> overload everything.
<span class="token punctuation">;</span> <span class="token number">0</span>: No overload
<span class="token punctuation">;</span> <span class="token number">1</span>: Overload mail<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">function</span>
<span class="token punctuation">;</span> <span class="token number">2</span>: Overload str*<span class="token punctuation">(</span><span class="token punctuation">)</span> functions
<span class="token punctuation">;</span> <span class="token number">4</span>: Overload ereg*<span class="token punctuation">(</span><span class="token punctuation">)</span> functions
<span class="token punctuation">;</span> http://php.net/mbstring.func-overload
<span class="token punctuation">;</span>mbstring.func_overload <span class="token operator">=</span> <span class="token number">0</span>

<span class="token punctuation">;</span> <span class="token builtin class-name">enable</span> strict encoding detection.
<span class="token punctuation">;</span> Default: Off
<span class="token punctuation">;</span>mbstring.strict_detection <span class="token operator">=</span> On

<span class="token punctuation">;</span> This directive specifies the regex pattern of content types <span class="token keyword">for</span> <span class="token function">which</span> mb_output_handler<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">;</span> is activated.
<span class="token punctuation">;</span> Default: <span class="token assign-left variable">mbstring.http_output_conv_mimetype</span><span class="token operator">=</span>^<span class="token punctuation">(</span>text/<span class="token operator">|</span>application/xhtml<span class="token punctuation">\\</span>+xml<span class="token punctuation">)</span>
<span class="token punctuation">;</span><span class="token assign-left variable">mbstring.http_output_conv_mimetype</span><span class="token operator">=</span>

<span class="token punctuation">;</span> This directive specifies maximum stack depth <span class="token keyword">for</span> mbstring regular expressions. It is similar
<span class="token punctuation">;</span> to the pcre.recursion_limit <span class="token keyword">for</span> PCRE.
<span class="token punctuation">;</span> Default: <span class="token number">100000</span>
<span class="token punctuation">;</span><span class="token assign-left variable">mbstring.regex_stack_limit</span><span class="token operator">=</span><span class="token number">100000</span>

<span class="token punctuation">;</span> This directive specifies maximum retry count <span class="token keyword">for</span> mbstring regular expressions. It is similar
<span class="token punctuation">;</span> to the pcre.backtrack_limit <span class="token keyword">for</span> PCRE.
<span class="token punctuation">;</span> Default: <span class="token number">1000000</span>
<span class="token punctuation">;</span><span class="token assign-left variable">mbstring.regex_retry_limit</span><span class="token operator">=</span><span class="token number">1000000</span>

<span class="token punctuation">[</span>gd<span class="token punctuation">]</span>
<span class="token punctuation">;</span> Tell the jpeg decode to ignore warnings and try to create
<span class="token punctuation">;</span> a gd image. The warning will <span class="token keyword">then</span> be displayed as notices
<span class="token punctuation">;</span> disabled by default
<span class="token punctuation">;</span> http://php.net/gd.jpeg-ignore-warning
<span class="token punctuation">;</span>gd.jpeg_ignore_warning <span class="token operator">=</span> <span class="token number">1</span>

<span class="token punctuation">[</span>exif<span class="token punctuation">]</span>
<span class="token punctuation">;</span> Exif UNICODE user comments are handled as UCS-2BE/UCS-2LE and JIS as JIS.
<span class="token punctuation">;</span> With mbstring support this will automatically be converted into the encoding
<span class="token punctuation">;</span> given by corresponding encode setting. When empty mbstring.internal_encoding
<span class="token punctuation">;</span> is used. For the decode settings you can distinguish between motorola and
<span class="token punctuation">;</span> intel byte order. A decode setting cannot be empty.
<span class="token punctuation">;</span> http://php.net/exif.encode-unicode
<span class="token punctuation">;</span>exif.encode_unicode <span class="token operator">=</span> ISO-8859-15

<span class="token punctuation">;</span> http://php.net/exif.decode-unicode-motorola
<span class="token punctuation">;</span>exif.decode_unicode_motorola <span class="token operator">=</span> UCS-2BE

<span class="token punctuation">;</span> http://php.net/exif.decode-unicode-intel
<span class="token punctuation">;</span>exif.decode_unicode_intel    <span class="token operator">=</span> UCS-2LE

<span class="token punctuation">;</span> http://php.net/exif.encode-jis
<span class="token punctuation">;</span>exif.encode_jis <span class="token operator">=</span>

<span class="token punctuation">;</span> http://php.net/exif.decode-jis-motorola
<span class="token punctuation">;</span>exif.decode_jis_motorola <span class="token operator">=</span> JIS

<span class="token punctuation">;</span> http://php.net/exif.decode-jis-intel
<span class="token punctuation">;</span>exif.decode_jis_intel    <span class="token operator">=</span> JIS

<span class="token punctuation">[</span>Tidy<span class="token punctuation">]</span>
<span class="token punctuation">;</span> The path to a default tidy configuration <span class="token function">file</span> to use when using tidy
<span class="token punctuation">;</span> http://php.net/tidy.default-config
<span class="token punctuation">;</span>tidy.default_config <span class="token operator">=</span> /usr/local/lib/php/default.tcfg

<span class="token punctuation">;</span> Should tidy clean and repair output automatically?
<span class="token punctuation">;</span> WARNING: Do not use this option <span class="token keyword">if</span> you are generating non-html content
<span class="token punctuation">;</span> such as dynamic images
<span class="token punctuation">;</span> http://php.net/tidy.clean-output
tidy.clean_output <span class="token operator">=</span> Off

<span class="token punctuation">[</span>soap<span class="token punctuation">]</span>
<span class="token punctuation">;</span> Enables or disables WSDL caching feature.
<span class="token punctuation">;</span> http://php.net/soap.wsdl-cache-enabled
<span class="token assign-left variable">soap.wsdl_cache_enabled</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">;</span> Sets the directory name where SOAP extension will put cache files.
<span class="token punctuation">;</span> http://php.net/soap.wsdl-cache-dir
<span class="token assign-left variable">soap.wsdl_cache_dir</span><span class="token operator">=</span><span class="token string">&quot;/tmp&quot;</span>

<span class="token punctuation">;</span> <span class="token punctuation">(</span>time to live<span class="token punctuation">)</span> Sets the number of second <span class="token keyword">while</span> cached <span class="token function">file</span> will be used
<span class="token punctuation">;</span> instead of original one.
<span class="token punctuation">;</span> http://php.net/soap.wsdl-cache-ttl
<span class="token assign-left variable">soap.wsdl_cache_ttl</span><span class="token operator">=</span><span class="token number">86400</span>

<span class="token punctuation">;</span> Sets the size of the cache limit. <span class="token punctuation">(</span>Max. number of WSDL files to cache<span class="token punctuation">)</span>
soap.wsdl_cache_limit <span class="token operator">=</span> <span class="token number">5</span>

<span class="token punctuation">[</span>sysvshm<span class="token punctuation">]</span>
<span class="token punctuation">;</span> A default size of the shared memory segment
<span class="token punctuation">;</span>sysvshm.init_mem <span class="token operator">=</span> <span class="token number">10000</span>

<span class="token punctuation">[</span>ldap<span class="token punctuation">]</span>
<span class="token punctuation">;</span> Sets the maximum number of <span class="token function">open</span> links or <span class="token parameter variable">-1</span> <span class="token keyword">for</span> unlimited.
ldap.max_links <span class="token operator">=</span> <span class="token parameter variable">-1</span>

<span class="token punctuation">[</span>dba<span class="token punctuation">]</span>
<span class="token punctuation">;</span><span class="token assign-left variable">dba.default_handler</span><span class="token operator">=</span>

<span class="token punctuation">[</span>opcache<span class="token punctuation">]</span>
<span class="token punctuation">;</span> Determines <span class="token keyword">if</span> Zend OPCache is enabled
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.enable</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">;</span> Determines <span class="token keyword">if</span> Zend OPCache is enabled <span class="token keyword">for</span> the CLI version of PHP
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.enable_cli</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">;</span> The OPcache shared memory storage size.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.memory_consumption</span><span class="token operator">=</span><span class="token number">128</span>

<span class="token punctuation">;</span> The amount of memory <span class="token keyword">for</span> interned strings <span class="token keyword">in</span> Mbytes.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.interned_strings_buffer</span><span class="token operator">=</span><span class="token number">8</span>

<span class="token punctuation">;</span> The maximum number of keys <span class="token punctuation">(</span>scripts<span class="token punctuation">)</span> <span class="token keyword">in</span> the OPcache <span class="token builtin class-name">hash</span> table.
<span class="token punctuation">;</span> Only numbers between <span class="token number">200</span> and <span class="token number">1000000</span> are allowed.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.max_accelerated_files</span><span class="token operator">=</span><span class="token number">10000</span>

<span class="token punctuation">;</span> The maximum percentage of <span class="token string">&quot;wasted&quot;</span> memory <span class="token keyword">until</span> a restart is scheduled.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.max_wasted_percentage</span><span class="token operator">=</span><span class="token number">5</span>

<span class="token punctuation">;</span> When this directive is enabled, the OPcache appends the current working
<span class="token punctuation">;</span> directory to the script key, thus eliminating possible collisions between
<span class="token punctuation">;</span> files with the same name <span class="token punctuation">(</span>basename<span class="token punctuation">)</span>. Disabling the directive improves
<span class="token punctuation">;</span> performance, but may <span class="token builtin class-name">break</span> existing applications.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.use_cwd</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">;</span> When disabled, you must reset the OPcache manually or restart the
<span class="token punctuation">;</span> webserver <span class="token keyword">for</span> changes to the filesystem to take effect.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.validate_timestamps</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">;</span> How often <span class="token punctuation">(</span>in seconds<span class="token punctuation">)</span> to check <span class="token function">file</span> timestamps <span class="token keyword">for</span> changes to the shared
<span class="token punctuation">;</span> memory storage allocation. <span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span> means validate once per second, but only
<span class="token punctuation">;</span> once per request. <span class="token string">&quot;0&quot;</span> means always validate<span class="token punctuation">)</span>
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.revalidate_freq</span><span class="token operator">=</span><span class="token number">2</span>

<span class="token punctuation">;</span> Enables or disables <span class="token function">file</span> search <span class="token keyword">in</span> include_path optimization
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.revalidate_path</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">;</span> If disabled, all PHPDoc comments are dropped from the code to reduce the
<span class="token punctuation">;</span> size of the optimized code.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.save_comments</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">;</span> Allow <span class="token function">file</span> existence override <span class="token punctuation">(</span>file_exists, etc.<span class="token punctuation">)</span> performance feature.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.enable_file_override</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">;</span> A bitmask, where each bit enables or disables the appropriate OPcache
<span class="token punctuation">;</span> passes
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.optimization_level</span><span class="token operator">=</span>0x7FFFBFFF

<span class="token punctuation">;</span><span class="token assign-left variable">opcache.dups_fix</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">;</span> The location of the OPcache blacklist <span class="token function">file</span> <span class="token punctuation">(</span>wildcards allowed<span class="token punctuation">)</span>.
<span class="token punctuation">;</span> Each OPcache blacklist <span class="token function">file</span> is a text <span class="token function">file</span> that holds the names of files
<span class="token punctuation">;</span> that should not be accelerated. The <span class="token function">file</span> <span class="token function">format</span> is to <span class="token function">add</span> each filename
<span class="token punctuation">;</span> to a new line. The filename may be a full path or just a <span class="token function">file</span> prefix
<span class="token punctuation">;</span> <span class="token punctuation">(</span>i.e., /var/www/x  blacklists all the files and directories <span class="token keyword">in</span> /var/www
<span class="token punctuation">;</span> that start with <span class="token string">&#39;x&#39;</span><span class="token punctuation">)</span>. Line starting with a <span class="token punctuation">;</span> are ignored <span class="token punctuation">(</span>comments<span class="token punctuation">)</span>.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.blacklist_filename</span><span class="token operator">=</span>

<span class="token punctuation">;</span> Allows exclusion of large files from being cached. By default all files
<span class="token punctuation">;</span> are cached.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.max_file_size</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">;</span> Check the cache checksum each N requests.
<span class="token punctuation">;</span> The default value of <span class="token string">&quot;0&quot;</span> means that the checks are disabled.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.consistency_checks</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">;</span> How long to <span class="token function">wait</span> <span class="token punctuation">(</span>in seconds<span class="token punctuation">)</span> <span class="token keyword">for</span> a scheduled restart to begin <span class="token keyword">if</span> the cache
<span class="token punctuation">;</span> is not being accessed.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.force_restart_timeout</span><span class="token operator">=</span><span class="token number">180</span>

<span class="token punctuation">;</span> OPcache error_log <span class="token function">file</span> name. Empty string assumes <span class="token string">&quot;stderr&quot;</span><span class="token builtin class-name">.</span>
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.error_log</span><span class="token operator">=</span>

<span class="token punctuation">;</span> All OPcache errors go to the Web server log.
<span class="token punctuation">;</span> By default, only fatal errors <span class="token punctuation">(</span>level <span class="token number">0</span><span class="token punctuation">)</span> or errors <span class="token punctuation">(</span>level <span class="token number">1</span><span class="token punctuation">)</span> are logged.
<span class="token punctuation">;</span> You can also <span class="token builtin class-name">enable</span> warnings <span class="token punctuation">(</span>level <span class="token number">2</span><span class="token punctuation">)</span>, info messages <span class="token punctuation">(</span>level <span class="token number">3</span><span class="token punctuation">)</span> or
<span class="token punctuation">;</span> debug messages <span class="token punctuation">(</span>level <span class="token number">4</span><span class="token punctuation">)</span>.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.log_verbosity_level</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">;</span> Preferred Shared Memory back-end. Leave empty and <span class="token builtin class-name">let</span> the system decide.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.preferred_memory_model</span><span class="token operator">=</span>

<span class="token punctuation">;</span> Protect the shared memory from unexpected writing during script execution.
<span class="token punctuation">;</span> Useful <span class="token keyword">for</span> internal debugging only.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.protect_memory</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">;</span> Allows calling OPcache API functions only from PHP scripts <span class="token function">which</span> path is
<span class="token punctuation">;</span> started from specified string. The default <span class="token string">&quot;&quot;</span> means no restriction
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.restrict_api</span><span class="token operator">=</span>

<span class="token punctuation">;</span> Mapping base of shared memory segments <span class="token punctuation">(</span>for Windows only<span class="token punctuation">)</span>. All the PHP
<span class="token punctuation">;</span> processes have to map shared memory into the same address space. This
<span class="token punctuation">;</span> directive allows to manually fix the <span class="token string">&quot;Unable to reattach to base address&quot;</span>
<span class="token punctuation">;</span> errors.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.mmap_base</span><span class="token operator">=</span>

<span class="token punctuation">;</span> Facilitates multiple OPcache instances per user <span class="token punctuation">(</span>for Windows only<span class="token punctuation">)</span>. All PHP
<span class="token punctuation">;</span> processes with the same cache ID and user share an OPcache instance.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.cache_id</span><span class="token operator">=</span>

<span class="token punctuation">;</span> Enables and sets the second level cache directory.
<span class="token punctuation">;</span> It should improve performance when SHM memory is full, at server restart or
<span class="token punctuation">;</span> SHM reset. The default <span class="token string">&quot;&quot;</span> disables <span class="token function">file</span> based caching.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.file_cache</span><span class="token operator">=</span>

<span class="token punctuation">;</span> Enables or disables opcode caching <span class="token keyword">in</span> shared memory.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.file_cache_only</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">;</span> Enables or disables checksum validation when script loaded from <span class="token function">file</span> cache.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.file_cache_consistency_checks</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">;</span> Implies <span class="token assign-left variable">opcache.file_cache_only</span><span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">for</span> a certain process that failed to
<span class="token punctuation">;</span> reattach to the shared memory <span class="token punctuation">(</span>for Windows only<span class="token punctuation">)</span>. Explicitly enabled <span class="token function">file</span>
<span class="token punctuation">;</span> cache is required.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.file_cache_fallback</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">;</span> Enables or disables copying of PHP code <span class="token punctuation">(</span>text segment<span class="token punctuation">)</span> into HUGE PAGES.
<span class="token punctuation">;</span> This should improve performance, but requires appropriate OS configuration.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.huge_code_pages</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">;</span> Validate cached <span class="token function">file</span> permissions.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.validate_permission</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">;</span> Prevent name collisions <span class="token keyword">in</span> chroot&#39;ed environment.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.validate_root</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">;</span> If specified, it produces opcode dumps <span class="token keyword">for</span> debugging different stages of
<span class="token punctuation">;</span> optimizations.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.opt_debug_level</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">;</span> Specifies a PHP script that is going to be compiled and executed at server
<span class="token punctuation">;</span> start-up.
<span class="token punctuation">;</span> http://php.net/opcache.preload
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.preload</span><span class="token operator">=</span>

<span class="token punctuation">;</span> Preloading code as root is not allowed <span class="token keyword">for</span> security reasons. This directive
<span class="token punctuation">;</span> facilitates to <span class="token builtin class-name">let</span> the preloading to be run as another user.
<span class="token punctuation">;</span> http://php.net/opcache.preload_user
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.preload_user</span><span class="token operator">=</span>

<span class="token punctuation">;</span> Prevents caching files that are <span class="token function">less</span> than this number of seconds old. It
<span class="token punctuation">;</span> protects from caching of incompletely updated files. In <span class="token keyword">case</span> all <span class="token function">file</span> updates
<span class="token punctuation">;</span> on your site are atomic, you may increase performance by setting it to <span class="token string">&quot;0&quot;</span><span class="token builtin class-name">.</span>
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.file_update_protection</span><span class="token operator">=</span><span class="token number">2</span>

<span class="token punctuation">;</span> Absolute path used to store shared lockfiles <span class="token punctuation">(</span>for *nix only<span class="token punctuation">)</span>.
<span class="token punctuation">;</span><span class="token assign-left variable">opcache.lockfile_path</span><span class="token operator">=</span>/tmp

<span class="token punctuation">[</span>curl<span class="token punctuation">]</span>
<span class="token punctuation">;</span> A default value <span class="token keyword">for</span> the CURLOPT_CAINFO option. This is required to be an
<span class="token punctuation">;</span> absolute path.
<span class="token punctuation">;</span>curl.cainfo <span class="token operator">=</span>

<span class="token punctuation">[</span>openssl<span class="token punctuation">]</span>
<span class="token punctuation">;</span> The location of a Certificate Authority <span class="token punctuation">(</span>CA<span class="token punctuation">)</span> <span class="token function">file</span> on the <span class="token builtin class-name">local</span> filesystem
<span class="token punctuation">;</span> to use when verifying the identity of SSL/TLS peers. Most <span class="token function">users</span> should
<span class="token punctuation">;</span> not specify a value <span class="token keyword">for</span> this directive as PHP will attempt to use the
<span class="token punctuation">;</span> OS-managed cert stores <span class="token keyword">in</span> its absence. If specified, this value may still
<span class="token punctuation">;</span> be overridden on a per-stream basis via the <span class="token string">&quot;cafile&quot;</span> SSL stream context
<span class="token punctuation">;</span> option.
<span class="token punctuation">;</span><span class="token assign-left variable">openssl.cafile</span><span class="token operator">=</span>

<span class="token punctuation">;</span> If openssl.cafile is not specified or <span class="token keyword">if</span> the CA <span class="token function">file</span> is not found, the
<span class="token punctuation">;</span> directory pointed to by openssl.capath is searched <span class="token keyword">for</span> a suitable
<span class="token punctuation">;</span> certificate. This value must be a correctly hashed certificate directory.
<span class="token punctuation">;</span> Most <span class="token function">users</span> should not specify a value <span class="token keyword">for</span> this directive as PHP will
<span class="token punctuation">;</span> attempt to use the OS-managed cert stores <span class="token keyword">in</span> its absence. If specified,
<span class="token punctuation">;</span> this value may still be overridden on a per-stream basis via the <span class="token string">&quot;capath&quot;</span>
<span class="token punctuation">;</span> SSL stream context option.
<span class="token punctuation">;</span><span class="token assign-left variable">openssl.capath</span><span class="token operator">=</span>

<span class="token punctuation">[</span>ffi<span class="token punctuation">]</span>
<span class="token punctuation">;</span> FFI API restriction. Possible values:
<span class="token punctuation">;</span> <span class="token string">&quot;preload&quot;</span> - enabled <span class="token keyword">in</span> CLI scripts and preloaded files <span class="token punctuation">(</span>default<span class="token punctuation">)</span>
<span class="token punctuation">;</span> <span class="token string">&quot;false&quot;</span>   - always disabled
<span class="token punctuation">;</span> <span class="token string">&quot;true&quot;</span>    - always enabled
<span class="token punctuation">;</span><span class="token assign-left variable">ffi.enable</span><span class="token operator">=</span>preload

<span class="token punctuation">;</span> List of headers files to preload, wildcard patterns allowed.
<span class="token punctuation">;</span><span class="token assign-left variable">ffi.preload</span><span class="token operator">=</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">;</span> Start a new pool named <span class="token string">&#39;www&#39;</span><span class="token builtin class-name">.</span>
<span class="token punctuation">;</span> the variable <span class="token variable">$pool</span> can be used <span class="token keyword">in</span> any directive and will be replaced by the
<span class="token punctuation">;</span> pool name <span class="token punctuation">(</span><span class="token string">&#39;www&#39;</span> here<span class="token punctuation">)</span>
<span class="token punctuation">[</span>www<span class="token punctuation">]</span>

<span class="token punctuation">;</span> Per pool prefix
<span class="token punctuation">;</span> It only applies on the following directives:
<span class="token punctuation">;</span> - <span class="token string">&#39;access.log&#39;</span>
<span class="token punctuation">;</span> - <span class="token string">&#39;slowlog&#39;</span>
<span class="token punctuation">;</span> - <span class="token string">&#39;listen&#39;</span> <span class="token punctuation">(</span>unixsocket<span class="token punctuation">)</span>
<span class="token punctuation">;</span> - <span class="token string">&#39;chroot&#39;</span>
<span class="token punctuation">;</span> - <span class="token string">&#39;chdir&#39;</span>
<span class="token punctuation">;</span> - <span class="token string">&#39;php_values&#39;</span>
<span class="token punctuation">;</span> - <span class="token string">&#39;php_admin_values&#39;</span>
<span class="token punctuation">;</span> When not set, the global prefix <span class="token punctuation">(</span>or /usr<span class="token punctuation">)</span> applies instead.
<span class="token punctuation">;</span> Note: This directive can also be relative to the global prefix.
<span class="token punctuation">;</span> Default Value: none
<span class="token punctuation">;</span>prefix <span class="token operator">=</span> /path/to/pools/<span class="token variable">$pool</span>

<span class="token punctuation">;</span> Unix user/group of processes
<span class="token punctuation">;</span> Note: The user is mandatory. If the group is not set, the default user<span class="token string">&#39;s group
;       will be used.

user = nginx
group = nginx


; The address on which to accept FastCGI requests.
; Valid syntaxes are:
;   &#39;</span>ip.add.re.ss:port<span class="token string">&#39;    - to listen on a TCP socket to a specific IPv4 address on
;                            a specific port;
;   &#39;</span><span class="token punctuation">[</span>ip:6:addr:ess<span class="token punctuation">]</span>:port<span class="token string">&#39; - to listen on a TCP socket to a specific IPv6 address on
;                            a specific port;
;   &#39;</span>port<span class="token string">&#39;                 - to listen on a TCP socket to all addresses

                                                                                                                                   
;                            (IPv6 and IPv4-mapped) on a specific port;
;   &#39;</span>/path/to/unix/socket<span class="token string">&#39; - to listen on a unix socket.
; Note: This value is mandatory.
listen = 0.0.0.0:9000

; Set listen(2) backlog.
; Default Value: 511 (-1 on FreeBSD and OpenBSD)
;listen.backlog = 511

; Set permissions for unix socket, if one is used. In Linux, read/write
; permissions must be set in order to allow connections from a web server. Many
; BSD-derived systems allow connections regardless of permissions.
; Default Values: user and group are set as the running user
;                 mode is set to 0660
listen.owner = nobody
listen.group = nobody
;listen.mode = 0660

; When POSIX Access Control Lists are supported you can set them using
; these options, value is a comma separated list of user/group names.
; When set, listen.owner and listen.group are ignored
;listen.acl_users =
;listen.acl_groups =

; List of addresses (IPv4/IPv6) of FastCGI clients which are allowed to connect.
; Equivalent to the FCGI_WEB_SERVER_ADDRS environment variable in the original
; PHP FCGI (5.2.2+). Makes sense only with a tcp listening socket. Each address
; must be separated by a comma. If this value is left blank, connections will be
; accepted from any ip address.
; Default Value: any
;listen.allowed_clients = 127.0.0.1

; Specify the nice(2) priority to apply to the pool processes (only if set)
; The value can vary from -19 (highest priority) to 20 (lower priority)
; Note: - It will only work if the FPM master process is launched as root
;       - The pool processes will inherit the master process priority
;         unless it specified otherwise
; Default Value: no set
; process.priority = -19

; Set the process dumpable flag (PR_SET_DUMPABLE prctl) even if the process user
; or group is differrent than the master process user. It allows to create process
; core dump and ptrace the process for the pool user.
; Default Value: no
; process.dumpable = yes

; Choose how the process manager will control the number of child processes.
; Possible Values:
;   static  - a fixed number (pm.max_children) of child processes;
;   dynamic - the number of child processes are set dynamically based on the
;             following directives. With this process management, there will be
;             always at least 1 children.
;             pm.max_children      - the maximum number of children that can
;                                    be alive at the same time.
;             pm.start_servers     - the number of children created on startup.
;             pm.min_spare_servers - the minimum number of children in &#39;</span>idle<span class="token string">&#39;
;                                    state (waiting to process). If the number
;                                    of &#39;</span>idle<span class="token string">&#39; processes is less than this
;                                    number then some children will be created.
;             pm.max_spare_servers - the maximum number of children in &#39;</span>idle<span class="token string">&#39;
;                                    state (waiting to process). If the number
;                                    of &#39;</span>idle<span class="token string">&#39; processes is greater than this
;                                    number then some children will be killed.
;  ondemand - no children are created at startup. Children will be forked when
;             new requests will connect. The following parameter are used:
;             pm.max_children           - the maximum number of children that
;                                         can be alive at the same time.
;             pm.process_idle_timeout   - The number of seconds after which
;                                         an idle process will be killed.
; Note: This value is mandatory.
pm = dynamic

; The number of child processes to be created when pm is set to &#39;</span>static<span class="token string">&#39; and the
; maximum number of child processes when pm is set to &#39;</span>dynamic<span class="token string">&#39; or &#39;</span>ondemand<span class="token string">&#39;.
; This value sets the limit on the number of simultaneous requests that will be
; served. Equivalent to the ApacheMaxClients directive with mpm_prefork.
; Equivalent to the PHP_FCGI_CHILDREN environment variable in the original PHP
; CGI. The below defaults are based on a server without much resources. Don&#39;</span>t
<span class="token punctuation">;</span> forget to tweak pm.* to fit your needs.
<span class="token punctuation">;</span> Note: Used when pm is <span class="token builtin class-name">set</span> to <span class="token string">&#39;static&#39;</span>, <span class="token string">&#39;dynamic&#39;</span> or <span class="token string">&#39;ondemand&#39;</span>
<span class="token punctuation">;</span> Note: This value is mandatory.
pm.max_children <span class="token operator">=</span> <span class="token number">50</span>

<span class="token punctuation">;</span> The number of child processes created on startup.
<span class="token punctuation">;</span> Note: Used only when pm is <span class="token builtin class-name">set</span> to <span class="token string">&#39;dynamic&#39;</span>
<span class="token punctuation">;</span> Default Value: <span class="token punctuation">(</span>min_spare_servers + max_spare_servers<span class="token punctuation">)</span> / <span class="token number">2</span>
pm.start_servers <span class="token operator">=</span> <span class="token number">15</span>

<span class="token punctuation">;</span> The desired minimum number of idle server processes.
<span class="token punctuation">;</span> Note: Used only when pm is <span class="token builtin class-name">set</span> to <span class="token string">&#39;dynamic&#39;</span>
<span class="token punctuation">;</span> Note: Mandatory when pm is <span class="token builtin class-name">set</span> to <span class="token string">&#39;dynamic&#39;</span>
pm.min_spare_servers <span class="token operator">=</span> <span class="token number">5</span>
<span class="token punctuation">;</span> The desired maximum number of idle server processes.
<span class="token punctuation">;</span> Note: Used only when pm is <span class="token builtin class-name">set</span> to <span class="token string">&#39;dynamic&#39;</span>
<span class="token punctuation">;</span> Note: Mandatory when pm is <span class="token builtin class-name">set</span> to <span class="token string">&#39;dynamic&#39;</span>
pm.max_spare_servers <span class="token operator">=</span> <span class="token number">35</span>

<span class="token punctuation">;</span> The number of seconds after <span class="token function">which</span> an idle process will be killed.
<span class="token punctuation">;</span> Note: Used only when pm is <span class="token builtin class-name">set</span> to <span class="token string">&#39;ondemand&#39;</span>
<span class="token punctuation">;</span> Default Value: 10s
<span class="token punctuation">;</span>pm.process_idle_timeout <span class="token operator">=</span> 10s<span class="token punctuation">;</span>

<span class="token punctuation">;</span> The number of requests each child process should execute before respawning.
<span class="token punctuation">;</span> This can be useful to work around memory leaks <span class="token keyword">in</span> 3rd party libraries. For
<span class="token punctuation">;</span> endless request processing specify <span class="token string">&#39;0&#39;</span><span class="token builtin class-name">.</span> Equivalent to PHP_FCGI_MAX_REQUESTS.
<span class="token punctuation">;</span> Default Value: <span class="token number">0</span>
<span class="token punctuation">;</span>pm.max_requests <span class="token operator">=</span> <span class="token number">500</span>

<span class="token punctuation">;</span> The URI to view the FPM status page. If this value is not set, no URI will be
<span class="token punctuation">;</span> recognized as a status page. It shows the following informations:
<span class="token punctuation">;</span>   pool                 - the name of the pool<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   process manager      - static, dynamic or ondemand<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   start <span class="token function">time</span>           - the <span class="token function">date</span> and <span class="token function">time</span> FPM has started<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   start since          - number of seconds since FPM has started<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   accepted conn        - the number of request accepted by the pool<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   listen queue         - the number of request <span class="token keyword">in</span> the queue of pending
<span class="token punctuation">;</span>                          connections <span class="token punctuation">(</span>see backlog <span class="token keyword">in</span> listen<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span>   max listen queue     - the maximum number of requests <span class="token keyword">in</span> the queue
<span class="token punctuation">;</span>                          of pending connections since FPM has started<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   listen queue len     - the size of the socket queue of pending connections<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   idle processes       - the number of idle processes<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   active processes     - the number of active processes<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   total processes      - the number of idle + active processes<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   max active processes - the maximum number of active processes since FPM
<span class="token punctuation">;</span>                          has started<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   max children reached - number of times, the process limit has been reached,
<span class="token punctuation">;</span>                          when pm tries to start <span class="token function">more</span> children <span class="token punctuation">(</span>works only <span class="token keyword">for</span>
<span class="token punctuation">;</span>                          pm <span class="token string">&#39;dynamic&#39;</span> and <span class="token string">&#39;ondemand&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span> Value are updated <span class="token keyword">in</span> real time.
<span class="token punctuation">;</span> Example output:
<span class="token punctuation">;</span>   pool:                 www
<span class="token punctuation">;</span>   process manager:      static
<span class="token punctuation">;</span>   start time:           01/Jul/2011:17:53:49 +0200
<span class="token punctuation">;</span>   start since:          <span class="token number">62636</span>
<span class="token punctuation">;</span>   accepted conn:        <span class="token number">190460</span>
<span class="token punctuation">;</span>   listen queue:         <span class="token number">0</span>
<span class="token punctuation">;</span>   max listen queue:     <span class="token number">1</span>
<span class="token punctuation">;</span>   listen queue len:     <span class="token number">42</span>
<span class="token punctuation">;</span>   idle processes:       <span class="token number">4</span>
<span class="token punctuation">;</span>   active processes:     <span class="token number">11</span>
<span class="token punctuation">;</span>   total processes:      <span class="token number">15</span>
<span class="token punctuation">;</span>   max active processes: <span class="token number">12</span>
<span class="token punctuation">;</span>   max children reached: <span class="token number">0</span>
<span class="token punctuation">;</span>
<span class="token punctuation">;</span> By default the status page output is formatted as text/plain. Passing either
<span class="token punctuation">;</span> <span class="token string">&#39;html&#39;</span>, <span class="token string">&#39;xml&#39;</span> or <span class="token string">&#39;json&#39;</span> <span class="token keyword">in</span> the query string will <span class="token builtin class-name">return</span> the corresponding
<span class="token punctuation">;</span> output syntax. Example:
<span class="token punctuation">;</span>   http://www.foo.bar/status
<span class="token punctuation">;</span>   http://www.foo.bar/status?json
<span class="token punctuation">;</span>   http://www.foo.bar/status?html
<span class="token punctuation">;</span>   http://www.foo.bar/status?xml
<span class="token punctuation">;</span>
<span class="token punctuation">;</span> By default the status page only outputs short status. Passing <span class="token string">&#39;full&#39;</span> <span class="token keyword">in</span> the
<span class="token punctuation">;</span> query string will also <span class="token builtin class-name">return</span> status <span class="token keyword">for</span> each pool process.
<span class="token punctuation">;</span> Example:
<span class="token punctuation">;</span>   http://www.foo.bar/status?full
<span class="token punctuation">;</span>   http://www.foo.bar/status?json<span class="token operator">&amp;</span>full
<span class="token punctuation">;</span>   http://www.foo.bar/status?html<span class="token operator">&amp;</span>full
<span class="token punctuation">;</span>   http://www.foo.bar/status?xml<span class="token operator">&amp;</span>full
<span class="token punctuation">;</span> The Full status returns <span class="token keyword">for</span> each process:
<span class="token punctuation">;</span>   pid                  - the PID of the process<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   state                - the state of the process <span class="token punctuation">(</span>Idle, Running, <span class="token punctuation">..</span>.<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span>   start <span class="token function">time</span>           - the <span class="token function">date</span> and <span class="token function">time</span> the process has started<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   start since          - the number of seconds since the process has started<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   requests             - the number of requests the process has served<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   request duration     - the duration <span class="token keyword">in</span> µs of the requests<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   request method       - the request method <span class="token punctuation">(</span>GET, POST, <span class="token punctuation">..</span>.<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span>   request URI          - the request URI with the query string<span class="token punctuation">;</span>
<span class="token punctuation">;</span>   content length       - the content length of the request <span class="token punctuation">(</span>only with POST<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span>   user                 - the user <span class="token punctuation">(</span>PHP_AUTH_USER<span class="token punctuation">)</span> <span class="token punctuation">(</span>or <span class="token string">&#39;-&#39;</span> <span class="token keyword">if</span> not <span class="token builtin class-name">set</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span>   script               - the main script called <span class="token punctuation">(</span>or <span class="token string">&#39;-&#39;</span> <span class="token keyword">if</span> not <span class="token builtin class-name">set</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">;</span>   last request cpu     - the %cpu the last request consumed
<span class="token punctuation">;</span>                          it<span class="token string">&#39;s always 0 if the process is not in Idle state
;                          because CPU calculation is done when the request
;                          processing has terminated;
;   last request memory  - the max amount of memory the last request consumed
;                          it&#39;</span>s always <span class="token number">0</span> <span class="token keyword">if</span> the process is not <span class="token keyword">in</span> Idle state
<span class="token punctuation">;</span>                          because memory calculation is <span class="token keyword">done</span> when the request
<span class="token punctuation">;</span>                          processing has terminated<span class="token punctuation">;</span>
<span class="token punctuation">;</span> If the process is <span class="token keyword">in</span> Idle state, <span class="token keyword">then</span> informations are related to the
<span class="token punctuation">;</span> last request the process has served. Otherwise informations are related to
<span class="token punctuation">;</span> the current request being served.
<span class="token punctuation">;</span> Example output:
<span class="token punctuation">;</span>   ************************
<span class="token punctuation">;</span>   pid:                  <span class="token number">31330</span>
<span class="token punctuation">;</span>   state:                Running
<span class="token punctuation">;</span>   start time:           01/Jul/2011:17:53:49 +0200
<span class="token punctuation">;</span>   start since:          <span class="token number">63087</span>
<span class="token punctuation">;</span>   requests:             <span class="token number">12808</span>
<span class="token punctuation">;</span>   request duration:     <span class="token number">1250261</span>
<span class="token punctuation">;</span>   request method:       GET
<span class="token punctuation">;</span>   request URI:          /test_mem.php?N<span class="token operator">=</span><span class="token number">10000</span>
<span class="token punctuation">;</span>   content length:       <span class="token number">0</span>
<span class="token punctuation">;</span>   user:                 -
<span class="token punctuation">;</span>   script:               /home/fat/web/docs/php/test_mem.php
<span class="token punctuation">;</span>   last request cpu:     <span class="token number">0.00</span>
<span class="token punctuation">;</span>   last request memory:  <span class="token number">0</span>
<span class="token punctuation">;</span>
<span class="token punctuation">;</span> Note: There is a real-time FPM status monitoring sample web page available
<span class="token punctuation">;</span>       It<span class="token string">&#39;s available in: /usr/share/php/7.4/fpm/status.html
;
; Note: The value must start with a leading slash (/). The value can be
;       anything, but it may not be a good idea to use the .php extension or it
;       may conflict with a real PHP file.
; Default Value: not set
;pm.status_path = /status

; The ping URI to call the monitoring page of FPM. If this value is not set, no
; URI will be recognized as a ping page. This could be used to test from outside
; that FPM is alive and responding, or to
; - create a graph of FPM availability (rrd or such);
; - remove a server from a group if it is not responding (load balancing);
; - trigger alerts for the operating team (24/7).
; Note: The value must start with a leading slash (/). The value can be
;       anything, but it may not be a good idea to use the .php extension or it
;       may conflict with a real PHP file.
; Default Value: not set
;ping.path = /ping

; This directive may be used to customize the response of a ping request. The
; response is formatted as text/plain with a 200 response code.
; Default Value: pong
;ping.response = pong

; The access log file
; Default: not set
;access.log = log/$pool.access.log

; The access log format.
; The following syntax is allowed
;  %%: the &#39;</span>%<span class="token string">&#39; character
;  %C: %CPU used by the request
;      it can accept the following format:
;      - %{user}C for user CPU only
;      - %{system}C for system CPU only
;      - %{total}C  for user + system CPU (default)
;  %d: time taken to serve the request
;      it can accept the following format:
;      - %{seconds}d (default)
;      - %{miliseconds}d
;      - %{mili}d
;      - %{microseconds}d
;      - %{micro}d
;  %e: an environment variable (same as $_ENV or $_SERVER)
;      it must be associated with embraces to specify the name of the env
;      variable. Some exemples:
;      - server specifics like: %{REQUEST_METHOD}e or %{SERVER_PROTOCOL}e
;      - HTTP headers like: %{HTTP_HOST}e or %{HTTP_USER_AGENT}e
;  %f: script filename
;  %l: content-length of the request (for POST request only)
;  %m: request method
;  %M: peak of memory allocated by PHP
;      it can accept the following format:
;      - %{bytes}M (default)
;      - %{kilobytes}M
;      - %{kilo}M
;      - %{megabytes}M
;      - %{mega}M
;  %n: pool name
;  %o: output header
;      it must be associated with embraces to specify the name of the header:
;      - %{Content-Type}o
;      - %{X-Powered-By}o
;      - %{Transfert-Encoding}o
;      - ....
;  %p: PID of the child that serviced the request
;  %P: PID of the parent of the child that serviced the request
;  %q: the query string
;  %Q: the &#39;</span>?<span class="token string">&#39; character if query string exists
;  %r: the request URI (without the query string, see %q and %Q)
;  %R: remote IP address
;  %s: status (response code)
;  %t: server time the request was received
;      it can accept a strftime(3) format:
;      %d/%b/%Y:%H:%M:%S %z (default)
;      The strftime(3) format must be encapsuled in a %{&lt;strftime_format&gt;}t tag
;      e.g. for a ISO8601 formatted timestring, use: %{%Y-%m-%dT%H:%M:%S%z}t
;  %T: time the log has been written (the request has finished)
;      it can accept a strftime(3) format:
;      %d/%b/%Y:%H:%M:%S %z (default)
;      The strftime(3) format must be encapsuled in a %{&lt;strftime_format&gt;}t tag
;      e.g. for a ISO8601 formatted timestring, use: %{%Y-%m-%dT%H:%M:%S%z}t
;  %u: remote user
;
; Default: &quot;%R - %u %t \\&quot;%m %r\\&quot; %s&quot;
;access.format = &quot;%R - %u %t \\&quot;%m %r%Q%q\\&quot; %s %f %{mili}d %{kilo}M %C%%&quot;

; The log file for slow requests
; Default Value: not set
; Note: slowlog is mandatory if request_slowlog_timeout is set
;slowlog = log/$pool.log.slow

; The timeout for serving a single request after which a PHP backtrace will be
; dumped to the &#39;</span>slowlog<span class="token string">&#39; file. A value of &#39;</span>0s<span class="token string">&#39; means &#39;</span>off<span class="token string">&#39;.
; Available units: s(econds)(default), m(inutes), h(ours), or d(ays)
; Default Value: 0
;request_slowlog_timeout = 0

; Depth of slow log stack trace.
; Default Value: 20
;request_slowlog_trace_depth = 20

; The timeout for serving a single request after which the worker process will
; be killed. This option should be used when the &#39;</span>max_execution_time<span class="token string">&#39; ini option
; does not stop script execution for some reason. A value of &#39;</span><span class="token number">0</span><span class="token string">&#39; means &#39;</span>off<span class="token string">&#39;.
; Available units: s(econds)(default), m(inutes), h(ours), or d(ays)
; Default Value: 0
;request_terminate_timeout = 0

; The timeout set by &#39;</span>request_terminate_timeout<span class="token string">&#39; ini option is not engaged after
; application calls &#39;</span>fastcgi_finish_request<span class="token string">&#39; or when application has finished and
; shutdown functions are being called (registered via register_shutdown_function).
; This option will enable timeout limit to be applied unconditionally
; even in such cases.
; Default Value: no
;request_terminate_timeout_track_finished = no

; Set open file descriptor rlimit.
; Default Value: system defined value
;rlimit_files = 1024

; Set max core size rlimit.
; Possible Values: &#39;</span>unlimited<span class="token string">&#39; or an integer greater or equal to 0
; Default Value: system defined value
;rlimit_core = 0

; Chroot to this directory at the start. This value must be defined as an
; absolute path. When this value is not set, chroot is not used.
; Note: you can prefix with &#39;</span><span class="token variable">$prefix</span><span class="token string">&#39; to chroot to the pool prefix or one
; of its subdirectories. If the pool prefix is not set, the global prefix
; will be used instead.
; Note: chrooting is a great security feature and should be used whenever
;       possible. However, all PHP paths will be relative to the chroot
;       (error_log, sessions.save_path, ...).
; Default Value: not set
;chroot =

; Chdir to this directory at the start.
; Note: relative path can be used.
; Default Value: current directory or / when chroot
;chdir = /var/www

; Redirect worker stdout and stderr into main error log. If not set, stdout and
; stderr will be redirected to /dev/null according to FastCGI specs.
; Note: on highloaded environement, this can cause some delay in the page
; process time (several ms).
; Default Value: no
;catch_workers_output = yes

; Decorate worker output with prefix and suffix containing information about
; the child that writes to the log and if stdout or stderr is used as well as
; log level and time. This options is used only if catch_workers_output is yes.
; Settings to &quot;no&quot; will output data as written to the stdout or stderr.
; Default value: yes
;decorate_workers_output = no

; Clear environment in FPM workers
; Prevents arbitrary environment variables from reaching FPM worker processes
; by clearing the environment in workers before env vars specified in this
; pool configuration are added.
; Setting to &quot;no&quot; will make all environment variables available to PHP code
; via getenv(), $_ENV and $_SERVER.
; Default Value: yes
;clear_env = no

; Limits the extensions of the main script FPM will allow to parse. This can
; prevent configuration mistakes on the web server side. You should only limit
; FPM to .php extensions to prevent malicious users to use other extensions to
; execute php code.
; Note: set an empty value to allow all extensions.
; Default Value: .php
;security.limit_extensions = .php .php3 .php4 .php5 .php7

; Pass environment variables like LD_LIBRARY_PATH. All $VARIABLEs are taken from
; the current environment.
; Default Value: clean env
;env[HOSTNAME] = $HOSTNAME
;env[PATH] = /usr/local/bin:/usr/bin:/bin
;env[TMP] = /tmp
;env[TMPDIR] = /tmp
;env[TEMP] = /tmp

; Additional php.ini defines, specific to this pool of workers. These settings
; overwrite the values previously defined in the php.ini. The directives are the
; same as the PHP SAPI:
;   php_value/php_flag             - you can set classic ini defines which can
;                                    be overwritten from PHP call &#39;</span>ini_set<span class="token string">&#39;.
;   php_admin_value/php_admin_flag - these directives won&#39;</span>t be overwritten by
<span class="token punctuation">;</span>                                     PHP call <span class="token string">&#39;ini_set&#39;</span>
<span class="token punctuation">;</span> For php_*flag, valid values are on, off, <span class="token number">1</span>, <span class="token number">0</span>, true, false, <span class="token function">yes</span> or no.

<span class="token punctuation">;</span> Defining <span class="token string">&#39;extension&#39;</span> will load the corresponding shared extension from
<span class="token punctuation">;</span> extension_dir. Defining <span class="token string">&#39;disable_functions&#39;</span> or <span class="token string">&#39;disable_classes&#39;</span> will not
<span class="token punctuation">;</span> overwrite previously defined php.ini values, but will append the new value
<span class="token punctuation">;</span> instead.

<span class="token punctuation">;</span> Note: path INI options can be relative and will be expanded with the prefix
<span class="token punctuation">;</span> <span class="token punctuation">(</span>pool, global or /usr<span class="token punctuation">)</span>

<span class="token punctuation">;</span> Default Value: nothing is defined by default except the values <span class="token keyword">in</span> php.ini and
<span class="token punctuation">;</span>                specified at startup with the <span class="token parameter variable">-d</span> argument
<span class="token punctuation">;</span>php_admin_value<span class="token punctuation">[</span>sendmail_path<span class="token punctuation">]</span> <span class="token operator">=</span> /usr/sbin/sendmail <span class="token parameter variable">-t</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-f</span> www@my.domain.com
<span class="token punctuation">;</span>php_flag<span class="token punctuation">[</span>display_errors<span class="token punctuation">]</span> <span class="token operator">=</span> off
<span class="token punctuation">;</span>php_admin_value<span class="token punctuation">[</span>error_log<span class="token punctuation">]</span> <span class="token operator">=</span> /var/log/fpm-php.www.log
<span class="token punctuation">;</span>php_admin_flag<span class="token punctuation">[</span>log_errors<span class="token punctuation">]</span> <span class="token operator">=</span> on
<span class="token punctuation">;</span>php_admin_value<span class="token punctuation">[</span>memory_limit<span class="token punctuation">]</span> <span class="token operator">=</span> 32M

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse</span>
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse</span>
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse</span>
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="YGAb2"></a></p><h3 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a></h3><p><a name="QB0Q2"></a></p><h4 id="打包镜像" tabindex="-1"><a class="header-anchor" href="#打包镜像" aria-hidden="true">#</a> 打包镜像</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01<span class="token punctuation">[</span><span class="token number">12</span>:32:54<span class="token punctuation">]</span>/dockerfile/web/php <span class="token comment">#:bash build_image_command.sh v1</span>
Sending build context to Docker daemon  <span class="token number">99</span>.84kB
Step <span class="token number">1</span>/9 <span class="token builtin class-name">:</span> FROM harbor.ceamg.com/baseimages/ubuntu:20.04
 ---<span class="token operator">&gt;</span> d5447fc01ae6
Step <span class="token number">2</span>/9 <span class="token builtin class-name">:</span> RUN <span class="token function">apt</span> update <span class="token parameter variable">-y</span>   <span class="token operator">&amp;&amp;</span> <span class="token function">apt</span> <span class="token function">install</span>  ca-certificates <span class="token parameter variable">-y</span>  <span class="token operator">&amp;&amp;</span> <span class="token function">useradd</span> nginx <span class="token parameter variable">-u</span> <span class="token number">2023</span> <span class="token parameter variable">-s</span> /sbin/nologin  <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> /run/php
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> d00499d15478
Step <span class="token number">3</span>/9 <span class="token builtin class-name">:</span> COPY sources.list /etc/apt/sources.list
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> 4b22bb5df136
Step <span class="token number">4</span>/9 <span class="token builtin class-name">:</span> RUN <span class="token function">apt</span> update <span class="token parameter variable">-y</span> <span class="token operator">&amp;&amp;</span> <span class="token function">apt-get</span> <span class="token function">install</span> php7.4-fpm php7.4-mysql <span class="token parameter variable">-y</span>
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> 1d827f2430fe
Step <span class="token number">5</span>/9 <span class="token builtin class-name">:</span> COPY www.conf /etc/php/7.4/fpm/pool.d/
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> 47bb226c528b
Step <span class="token number">6</span>/9 <span class="token builtin class-name">:</span> COPY php.ini /etc/php/7.4/fpm/
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> 4e1d1d47bb8e
Step <span class="token number">7</span>/9 <span class="token builtin class-name">:</span> ADD run_php.sh /usr/local/bin/run_php.sh
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> b8b7aacc06e0
Step <span class="token number">8</span>/9 <span class="token builtin class-name">:</span> EXPOSE <span class="token number">9000</span>
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> a3a4c49d3987
Step <span class="token number">9</span>/9 <span class="token builtin class-name">:</span> CMD <span class="token punctuation">[</span><span class="token string">&quot;/usr/local/bin/run_php.sh&quot;</span><span class="token punctuation">]</span>
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> 167baff20de6
Successfully built 167baff20de6
Successfully tagged harbor.ceamg.com/baseimages/php7.4-wordpress:v1
The push refers to repository <span class="token punctuation">[</span>harbor.ceamg.com/baseimages/php7.4-wordpress<span class="token punctuation">]</span>
e3b90ad599ab: Layer already exists 
861aac09aa7f: Layer already exists 
77abd2e639b1: Layer already exists 
5020b1aebc94: Layer already exists 
301ecd0cc403: Layer already exists 
6df28fa92c54: Layer already exists 
0002c93bdb37: Layer already exists 
v1: digest: sha256:4a5236c50f567e10cbe90f5b8b4eaf7b93261ecf6191838741aa5c4e729fe66c size: <span class="token number">1784</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="tElNv"></a></p><h4 id="测试镜像" tabindex="-1"><a class="header-anchor" href="#测试镜像" aria-hidden="true">#</a> 测试镜像</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01<span class="token punctuation">[</span><span class="token number">12</span>:24:31<span class="token punctuation">]</span>/dockerfile/web/php <span class="token comment">#:docker run --rm -it harbor.ceamg.com/baseimages/php7.4-wordpress:v1</span>

<span class="token punctuation">[</span>01-Feb-2023 04:25:02<span class="token punctuation">]</span> NOTICE: fpm is running, pid <span class="token number">6</span>
<span class="token punctuation">[</span>01-Feb-2023 04:25:02<span class="token punctuation">]</span> NOTICE: ready to handle connections
<span class="token punctuation">[</span>01-Feb-2023 04:25:02<span class="token punctuation">]</span> NOTICE: systemd monitor interval <span class="token builtin class-name">set</span> to 10000ms
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="ypscU"></a></p><h2 id="_2-准备nginx镜像" tabindex="-1"><a class="header-anchor" href="#_2-准备nginx镜像" aria-hidden="true">#</a> 2. 准备nginx镜像</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01<span class="token punctuation">[</span>09:50:02<span class="token punctuation">]</span>/dockerfile/web/nginx <span class="token comment">#:ls</span>
build_image_command.sh  Dockerfile  nginx.conf  run_nginx.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="EXBv6"></a></p><h3 id="编写-dockefile" tabindex="-1"><a class="header-anchor" href="#编写-dockefile" aria-hidden="true">#</a> 编写 Dockefile</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#nginx wordpress </span>

FROM harbor.ceamg.com/pub-images/nginx-base:1.22.1

MAINTAINER admin@163.com

COPY nginx.conf /usr/local/nginx/conf/

ADD run_nginx.sh /usr/local/nginx/sbin/

RUN <span class="token function">useradd</span> nginx <span class="token parameter variable">-u</span> <span class="token number">2023</span>

RUN <span class="token function">mkdir</span> /usr/local/nginx/html/wordpress

RUN <span class="token function">chown</span> nginx:nginx /usr/local/nginx/html/wordpress/

EXPOSE <span class="token number">80</span> <span class="token number">443</span>

CMD <span class="token punctuation">[</span><span class="token string">&quot;/usr/local/nginx/sbin/run_nginx.sh&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">TAG</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;开始镜像构建&quot;</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> harbor.ceamg.com/wordpress/nginx-wordpress:<span class="token variable">\${TAG}</span> <span class="token builtin class-name">.</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;镜像构建成功，开始上传镜像&quot;</span>
<span class="token function">docker</span> push harbor.ceamg.com/wordpress/nginx-wordpress:<span class="token variable">\${TAG}</span>
   <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;镜像上传成功&quot;</span>
   <span class="token keyword">else</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;镜像上传失败&quot;</span>
   <span class="token keyword">fi</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;镜像构建失败,请检查输出&quot;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>user  nginx nginx<span class="token punctuation">;</span>
worker_processes  auto<span class="token punctuation">;</span>

<span class="token comment">#error_log  logs/error.log;</span>
<span class="token comment">#error_log  logs/error.log  notice;</span>
<span class="token comment">#error_log  logs/error.log  info;</span>

<span class="token comment">#pid        logs/nginx.pid;</span>

<span class="token comment">#daemon off;</span>

events <span class="token punctuation">{</span>
    worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


http <span class="token punctuation">{</span>
    include       mime.types<span class="token punctuation">;</span>
    default_type  application/octet-stream<span class="token punctuation">;</span>

    <span class="token comment">#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
    <span class="token comment">#                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
    <span class="token comment">#                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span>

    <span class="token comment">#access_log  logs/access.log  main;</span>

    sendfile        on<span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>

    keepalive_timeout  <span class="token number">65</span><span class="token punctuation">;</span>
    client_max_body_size 10M<span class="token punctuation">;</span>
    client_body_buffer_size 16k<span class="token punctuation">;</span>
    client_body_temp_path  /usr/local/nginx/tmp   <span class="token number">1</span> <span class="token number">2</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token function">gzip</span>  on<span class="token punctuation">;</span>


    server <span class="token punctuation">{</span>
        listen       <span class="token number">80</span><span class="token punctuation">;</span>
        server_name  blog.ceamg.com<span class="token punctuation">;</span>

        <span class="token comment">#charset koi8-r;</span>

        <span class="token comment">#access_log  logs/host.access.log  main;</span>



        location / <span class="token punctuation">{</span>
            root    /usr/local/nginx/html/wordpress<span class="token punctuation">;</span>
            index   index.php index.html index.htm<span class="token punctuation">;</span>
            <span class="token comment">#if ($http_user_agent ~ &quot;ApacheBench|WebBench|TurnitinBot|Sogou web spider|Grid Service&quot;) {</span>
            <span class="token comment">#    proxy_pass http://www.baidu.com;</span>
            <span class="token comment">#    #return 403;</span>
            <span class="token comment">#}</span>
        <span class="token punctuation">}</span>

        location ~ <span class="token punctuation">\\</span>.php$ <span class="token punctuation">{</span>
            root           /usr/local/nginx/html/wordpress<span class="token punctuation">;</span>
            fastcgi_pass   <span class="token number">127.0</span>.0.1:9000<span class="token punctuation">;</span>
            fastcgi_index  index.php<span class="token punctuation">;</span>
            <span class="token comment">#fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span>
            fastcgi_param  SCRIPT_FILENAME  <span class="token variable">$document_root</span><span class="token variable">$fastcgi_script_name</span><span class="token punctuation">;</span>
             include        fastcgi_params<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>


        <span class="token comment">#error_page  404              /404.html;</span>

        <span class="token comment"># redirect server error pages to the static page /50x.html</span>
        <span class="token comment">#</span>
        error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span>
        location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
nginx
<span class="token function">tail</span> <span class="token parameter variable">-f</span> /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="qDGT7"></a></p><h3 id="打包镜像-1" tabindex="-1"><a class="header-anchor" href="#打包镜像-1" aria-hidden="true">#</a> 打包镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01<span class="token punctuation">[</span>09:45:23<span class="token punctuation">]</span>/dockerfile/web/nginx <span class="token comment">#:bash build_image_command.sh v1.1</span>
开始镜像构建
Sending build context to Docker daemon  <span class="token number">6</span>.656kB
Step <span class="token number">1</span>/9 <span class="token builtin class-name">:</span> FROM harbor.ceamg.com/pub-images/nginx-base:1.22.1
 ---<span class="token operator">&gt;</span> c055772e4c77
Step <span class="token number">2</span>/9 <span class="token builtin class-name">:</span> MAINTAINER admin@163.com
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> c339760b111a
Step <span class="token number">3</span>/9 <span class="token builtin class-name">:</span> COPY nginx.conf /usr/local/nginx/conf/
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> fd62ef4ba6d3
Step <span class="token number">4</span>/9 <span class="token builtin class-name">:</span> ADD run_nginx.sh /usr/local/nginx/sbin/
 ---<span class="token operator">&gt;</span> 0333f9c88d67
Step <span class="token number">5</span>/9 <span class="token builtin class-name">:</span> RUN <span class="token function">useradd</span> nginx <span class="token parameter variable">-u</span> <span class="token number">2023</span>
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> b477510d6ec6
Removing intermediate container b477510d6ec6
 ---<span class="token operator">&gt;</span> 18217eeee991
Step <span class="token number">6</span>/9 <span class="token builtin class-name">:</span> RUN <span class="token function">mkdir</span> /usr/local/nginx/html/wordpress
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 0b3fa2320f66
Removing intermediate container 0b3fa2320f66
 ---<span class="token operator">&gt;</span> 0d05360ddcfc
Step <span class="token number">7</span>/9 <span class="token builtin class-name">:</span> RUN <span class="token function">chown</span> nginx:nginx /usr/local/nginx/html/wordpress/
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 16e255057567
Removing intermediate container 16e255057567
 ---<span class="token operator">&gt;</span> 5acd10a728cd
Step <span class="token number">8</span>/9 <span class="token builtin class-name">:</span> EXPOSE <span class="token number">80</span> <span class="token number">443</span>
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 09164687f69f
Removing intermediate container 09164687f69f
 ---<span class="token operator">&gt;</span> c65586dcb037
Step <span class="token number">9</span>/9 <span class="token builtin class-name">:</span> CMD <span class="token punctuation">[</span><span class="token string">&quot;/usr/local/nginx/sbin/run_nginx.sh&quot;</span><span class="token punctuation">]</span>
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> ffe14b4816df
Removing intermediate container ffe14b4816df
 ---<span class="token operator">&gt;</span> 657c22de8b70
Successfully built 657c22de8b70
Successfully tagged harbor.ceamg.com/wordpress/nginx-wordpress:v1.1
镜像构建成功，开始上传镜像
The push refers to repository <span class="token punctuation">[</span>harbor.ceamg.com/wordpress/nginx-wordpress<span class="token punctuation">]</span>
591ed3250639: Pushed 
04c9fd3db048: Pushed 
0252a86a3ed5: Pushed 
f771a2872392: Pushed 
644965591cf9: Layer already exists 
d8949178f619: Layer already exists 
da95977bca7c: Layer already exists 
03477dd36445: Layer already exists 
fb82b029bea0: Layer already exists 
v1.1: digest: sha256:c5bce69a5ec505fac1424a33abca32713cf5844eaabfaba4e4338f3bdbc0514d size: <span class="token number">2200</span>
镜像上传成功
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="JnFuz"></a></p><h2 id="_3-创建pv-pvc" tabindex="-1"><a class="header-anchor" href="#_3-创建pv-pvc" aria-hidden="true">#</a> 3. 创建PV/PVC</h2><p><a name="i51jj"></a></p><h3 id="nfs服务器" tabindex="-1"><a class="header-anchor" href="#nfs服务器" aria-hidden="true">#</a> NFS服务器</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>root@harbor01<span class="token punctuation">[</span><span class="token datetime number">09:52:06</span><span class="token punctuation">]</span>/data/k8s/wordpress <span class="token comment">#:mkdir /data/k8s/wordpress/ -p</span>
root@harbor01<span class="token punctuation">[</span><span class="token datetime number">09:52:21</span><span class="token punctuation">]</span>/data/k8s/wordpress <span class="token comment">#:vim /etc/exports </span>
/data/k8s/wordpress <span class="token important">*(rw</span><span class="token punctuation">,</span>sync<span class="token punctuation">,</span>no_root_squash)
root@harbor01<span class="token punctuation">[</span><span class="token datetime number">09:53:34</span><span class="token punctuation">]</span>/data/k8s/wordpress <span class="token comment">#:systemctl restart nfs-server.service </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="q68at"></a></p><h3 id="pv-pvc-yaml文件" tabindex="-1"><a class="header-anchor" href="#pv-pvc-yaml文件" aria-hidden="true">#</a> pv/pvc yaml文件</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> wordpress<span class="token punctuation">-</span>data<span class="token punctuation">-</span>pv
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;ReadWriteMany&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 50Gi
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.1.0.38
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s/wordpress/

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> wordpress<span class="token punctuation">-</span>data<span class="token punctuation">-</span>pvc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;ReadWriteMany&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 40Gi
    <span class="token key atrule">limits</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 40Gi
  <span class="token key atrule">volumeName</span><span class="token punctuation">:</span> wordpress<span class="token punctuation">-</span>data<span class="token punctuation">-</span>pv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>root@master01<span class="token punctuation">[</span><span class="token datetime number">09:57:42</span><span class="token punctuation">]</span>~/wordpress<span class="token punctuation">-</span>yaml <span class="token comment">#:kubectl create namespace wordpress-xin</span>
namespace/wordpress<span class="token punctuation">-</span>xin created

root@master01<span class="token punctuation">[</span><span class="token datetime number">09:55:58</span><span class="token punctuation">]</span>~/wordpress<span class="token punctuation">-</span>yaml <span class="token comment">#:vim wordpress-pv-pvc.yaml</span>
root@master01<span class="token punctuation">[</span><span class="token datetime number">09:56:14</span><span class="token punctuation">]</span>~/wordpress<span class="token punctuation">-</span>yaml <span class="token comment">#:kubectl apply -f wordpress-pv-pvc.yaml </span>
persistentvolume/wordpress<span class="token punctuation">-</span>data<span class="token punctuation">-</span>pv created
persistentvolumeclaim/wordpress<span class="token punctuation">-</span>data<span class="token punctuation">-</span>pvc created

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="idvah"></a></p><h3 id="查看pv状态" tabindex="-1"><a class="header-anchor" href="#查看pv状态" aria-hidden="true">#</a> 查看pv状态</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@master01<span class="token punctuation">[</span>09:58:21<span class="token punctuation">]</span>~/wordpress-yaml <span class="token comment">#:kubectl get pv </span>
NAME                      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                                  STORAGECLASS   REASON   AGE
jenkins-datadir-pv        100Gi      RWO            Retain           Bound    jenkins-xin/jenkins-datadir-pvc                                2d17h
jenkins-root-datadir-pv   100Gi      RWO            Retain           Bound    jenkins-xin/jenkins-root-datadir-pvc                           2d17h
mysql-datadir-1           50Gi       RWO            Retain           Bound    mysql-sts/data-mysql-1                                         2d20h
mysql-datadir-2           50Gi       RWO            Retain           Bound    mysql-sts/data-mysql-2                                         2d20h
mysql-datadir-3           50Gi       RWO            Retain           Bound    mysql-sts/data-mysql-0                                         2d20h
wordpress-data-pv         50Gi       RWX            Retain           Bound    wordpress-xin/wordpress-data-pvc                               74s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="tPzjn"></a></p><h2 id="部署wordpress" tabindex="-1"><a class="header-anchor" href="#部署wordpress" aria-hidden="true">#</a> 部署wordpress</h2><p>部署文件如下</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> wordpress<span class="token punctuation">-</span>deploy
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> wordpress<span class="token punctuation">-</span>server
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> wordpress<span class="token punctuation">-</span>server
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/wordpress/nginx<span class="token punctuation">-</span>wordpress<span class="token punctuation">:</span>v1.1
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
          <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> https
          <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">443</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> wordpress<span class="token punctuation">-</span>data
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/local/nginx/html/wordpress
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> php
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.ceamg.com/baseimages/php7.4<span class="token punctuation">-</span>wordpress<span class="token punctuation">:</span>v1
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> php
          <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">9000</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> wordpress<span class="token punctuation">-</span>data
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/local/nginx/html/wordpress
          <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> wordpress<span class="token punctuation">-</span>data
        <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
          <span class="token key atrule">claimName</span><span class="token punctuation">:</span> wordpress<span class="token punctuation">-</span>data<span class="token punctuation">-</span>pvc

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> wordpress<span class="token punctuation">-</span>svc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> wordpress<span class="token punctuation">-</span>server
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30013</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> https
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">443</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30014</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="xwe5q"></a></p><h3 id="查看pod状态" tabindex="-1"><a class="header-anchor" href="#查看pod状态" aria-hidden="true">#</a> 查看Pod状态</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>root@master01<span class="token punctuation">[</span><span class="token datetime number">10:19:10</span><span class="token punctuation">]</span>~/wordpress<span class="token punctuation">-</span>yaml <span class="token comment">#:kubectl apply -f wordpress-server.yaml </span>
deployment.apps/wordpress<span class="token punctuation">-</span>deploy created
service/wordpress<span class="token punctuation">-</span>svc created

root@master01<span class="token punctuation">[</span><span class="token datetime number">10:19:22</span><span class="token punctuation">]</span>~/wordpress<span class="token punctuation">-</span>yaml <span class="token comment">#:kubectl get pod -n wordpress-xin </span>
NAME                               READY   STATUS    RESTARTS   AGE
wordpress<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>dd645ccf9<span class="token punctuation">-</span>v4k7j   2/2     Running   0          11s


root@master01<span class="token punctuation">[</span><span class="token datetime number">10:20:06</span><span class="token punctuation">]</span>~/wordpress<span class="token punctuation">-</span>yaml <span class="token comment">#:kubectl get svc -n wordpress-xin </span>
NAME            TYPE       CLUSTER<span class="token punctuation">-</span>IP     EXTERNAL<span class="token punctuation">-</span>IP   PORT(S)                      AGE
wordpress<span class="token punctuation">-</span>svc   NodePort   10.10.165.34   &lt;none<span class="token punctuation">&gt;</span>        80<span class="token punctuation">:</span>30013/TCP<span class="token punctuation">,</span>443<span class="token punctuation">:</span>30014/TCP   64s


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="gzWqn"></a></p><h2 id="初始化安装配置wordpress" tabindex="-1"><a class="header-anchor" href="#初始化安装配置wordpress" aria-hidden="true">#</a> 初始化安装配置wordpress</h2>`,59),d={href:"https://so.csdn.net/so/search?q=nfs&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},v=s("br",null,null,-1),m={href:"https://cn.wordpress.org/download/releases/",target:"_blank",rel:"noopener noreferrer"},b=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@harbor01<span class="token punctuation">[</span><span class="token number">10</span>:48:28<span class="token punctuation">]</span>/data/k8s/wordpress <span class="token comment">#:tar -xf wordpress-5.9.2-zh_CN.tar.gz </span>
root@harbor01<span class="token punctuation">[</span><span class="token number">10</span>:48:43<span class="token punctuation">]</span>/data/k8s/wordpress <span class="token comment">#:mv wordpress/* ./</span>
root@harbor01<span class="token punctuation">[</span><span class="token number">10</span>:49:05<span class="token punctuation">]</span>/data/k8s/wordpress <span class="token comment">#:rm wordpress -rf</span>

root@harbor01<span class="token punctuation">[</span><span class="token number">10</span>:49:37<span class="token punctuation">]</span>/data/k8s/wordpress <span class="token comment">#:ls</span>
index.php    wordpress-5.9.2-zh_CN.tar.gz  wp-blog-header.php    wp-content   wp-links-opml.php  wp-mail.php      wp-trackback.php
license.txt  wp-activate.php               wp-comments-post.php  wp-cron.php  wp-load.php        wp-settings.php  xmlrpc.php
readme.html  wp-admin                      wp-config-sample.php  wp-includes  wp-login.php       wp-signup.php



<span class="token function">chown</span> <span class="token parameter variable">-R</span> <span class="token number">2023.2023</span> /data/k8s/wordpress
<span class="token comment">#修改目录所属者为Pod的容器里的nginx用户，否则可能会出现权限不足无法读写的问题</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/1675306401503-693d21f8-8ebe-4869-9783-073eb5e9693f.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="http://cdn1.ryanxin.live/1675313682044-a7289353-554f-444f-90a6-dcd96649781d.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><a name="WSxwE"></a></p><h3 id="初始化数据库" tabindex="-1"><a class="header-anchor" href="#初始化数据库" aria-hidden="true">#</a> 初始化数据库</h3><figure><img src="http://cdn1.ryanxin.live/1675320414058-e6a2f9bc-87d1-4a0c-a0eb-c6bfa6ba4dfd.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>mysql<span class="token operator">&gt;</span> <span class="token keyword">create</span> <span class="token keyword">database</span> wordpress<span class="token punctuation">;</span>
mysql<span class="token operator">&gt;</span> <span class="token keyword">grant</span> <span class="token keyword">all</span> <span class="token keyword">on</span> wordpress<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> <span class="token string">&quot;wordpress&quot;</span><span class="token variable">@&quot;%&quot;</span> identified <span class="token keyword">by</span> <span class="token string">&#39;wordpresspassword@123&#39;</span><span class="token punctuation">;</span>
Query OK<span class="token punctuation">,</span> <span class="token number">0</span> <span class="token keyword">rows</span> affected<span class="token punctuation">,</span> <span class="token number">1</span> warning <span class="token punctuation">(</span><span class="token number">0.01</span> sec<span class="token punctuation">)</span>
mysql<span class="token operator">&gt;</span> flush <span class="token keyword">privileges</span><span class="token punctuation">;</span>
Query OK<span class="token punctuation">,</span> <span class="token number">0</span> <span class="token keyword">rows</span> affected <span class="token punctuation">(</span><span class="token number">0.03</span> sec<span class="token punctuation">)</span>


mysql<span class="token operator">-</span>sts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/1675321030190-9a01f092-6ed1-4756-9815-3924a3a7efc0.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>wordpress 数据库填为主库<code>mysql.mysql-sts.svc.ceamg.local</code></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>mysql<span class="token punctuation">.</span>mysql<span class="token operator">-</span>sts<span class="token punctuation">.</span>svc<span class="token punctuation">.</span>ceamg<span class="token punctuation">.</span><span class="token keyword">local</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="http://cdn1.ryanxin.live/1675321235287-df1c21c2-c188-42ae-b107-6a6e1ae59ede.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="http://cdn1.ryanxin.live/1675321258457-801ba4b1-8e81-407f-bc0d-c67b1b28f7ff.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="http://cdn1.ryanxin.live/1675321343851-d9406dc5-561d-476e-a1ec-66d6e5e598f4.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="http://cdn1.ryanxin.live/1675321376969-12df2786-7951-4147-bbf2-44faa61357c0.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><a name="OSgH6"></a></p><h3 id="测试上传图片" tabindex="-1"><a class="header-anchor" href="#测试上传图片" aria-hidden="true">#</a> 测试上传图片</h3><figure><img src="http://cdn1.ryanxin.live/1675321605147-1ff82115-8cf0-489f-956a-203cf92212da.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,17);function k(h,f){const a=o("ExternalLinkIcon");return l(),p("div",null,[s("p",null,[s("a",u,[n("https://cn.wordpress.org/download/releases/"),e(a)])]),r,s("p",null,[n("下载wordpress安装包，将安装包中文件放置到Pod使用的"),s("a",d,[n("nfs"),e(a)]),n(" pv对应的目录"),v,n("安装包下载地址："),s("a",m,[n("https://cn.wordpress.org/download/releases/"),e(a)])]),b])}const y=t(c,[["render",k],["__file","kubernetes-10.html.vue"]]);export{y as default};
