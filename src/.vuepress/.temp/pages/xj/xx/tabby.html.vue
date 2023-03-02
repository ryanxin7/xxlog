<template><div><p>TABBY 配置</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">3</span>
<span class="token key atrule">profiles</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">name</span><span class="token punctuation">:</span> bq<span class="token punctuation">-</span>worker<span class="token punctuation">-</span><span class="token number">03</span>
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fas fa<span class="token punctuation">-</span>desktop
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 192.168.100.101
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span>
        <span class="token key atrule">hmac</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>256<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>512<span class="token punctuation">-</span>etm@openssh.com
        <span class="token key atrule">kex</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256@libssh.org
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group<span class="token punctuation">-</span>exchange<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group14<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group15<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group16<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group17<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group18<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
        <span class="token key atrule">cipher</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm@openssh.com
          <span class="token punctuation">-</span> aes192<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm@openssh.com
        <span class="token key atrule">serverHostKey</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>ed25519
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>rsa
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">privateKeys</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">forwardedPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> 北京汽车报
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>192.168.100.101<span class="token punctuation">:</span>96c5986e<span class="token punctuation">-</span>30a1<span class="token punctuation">-</span>46c2<span class="token punctuation">-</span>813d<span class="token punctuation">-</span>0d08aeb0a3ee
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">name</span><span class="token punctuation">:</span> bq<span class="token punctuation">-</span>worker<span class="token punctuation">-</span><span class="token number">02</span>
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fas fa<span class="token punctuation">-</span>desktop
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 192.168.100.88
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> 北京汽车报
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>192.168.100.88<span class="token punctuation">:</span>d998967f<span class="token punctuation">-</span>f970<span class="token punctuation">-</span>4b8c<span class="token punctuation">-</span>b92a<span class="token punctuation">-</span>58e6cfefb72b
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">name</span><span class="token punctuation">:</span> bq<span class="token punctuation">-</span>front<span class="token punctuation">-</span><span class="token number">01</span>
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fas fa<span class="token punctuation">-</span>desktop
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 172.16.0.83
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span>
        <span class="token key atrule">hmac</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>256<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>512<span class="token punctuation">-</span>etm@openssh.com
        <span class="token key atrule">kex</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256@libssh.org
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group<span class="token punctuation">-</span>exchange<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group14<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group15<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group16<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group17<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group18<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
        <span class="token key atrule">cipher</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm@openssh.com
          <span class="token punctuation">-</span> aes192<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm@openssh.com
        <span class="token key atrule">serverHostKey</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>ed25519
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>rsa
      <span class="token key atrule">privateKeys</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">forwardedPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> 北京汽车报
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>172.16.0.83<span class="token punctuation">:</span>47794286<span class="token punctuation">-</span>fd66<span class="token punctuation">-</span>4644<span class="token punctuation">-</span>af8d<span class="token punctuation">-</span>ba5f69c205a9
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fas fa<span class="token punctuation">-</span>desktop
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 192.168.100.87
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> 北京汽车报
    <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">'bq-worker-01 '</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>192.168.100.87<span class="token punctuation">:</span>17c9e828<span class="token punctuation">-</span>1993<span class="token punctuation">-</span>4112<span class="token punctuation">-</span>a3d2<span class="token punctuation">-</span>cf76cce5bafc
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fas fa<span class="token punctuation">-</span>desktop
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 101.201.145.223
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span>
        <span class="token key atrule">hmac</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>256<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>512<span class="token punctuation">-</span>etm@openssh.com
        <span class="token key atrule">kex</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256@libssh.org
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group<span class="token punctuation">-</span>exchange<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group14<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group15<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group16<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group17<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group18<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
        <span class="token key atrule">cipher</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm@openssh.com
          <span class="token punctuation">-</span> aes192<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm@openssh.com
        <span class="token key atrule">serverHostKey</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>ed25519
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>rsa
      <span class="token key atrule">privateKeys</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> file<span class="token punctuation">:</span>//C<span class="token punctuation">:</span>\Users\xx9z\Desktop\桌面\人民信产\zhangxinxin<span class="token punctuation">-</span>rmxc_rsa
      <span class="token key atrule">auth</span><span class="token punctuation">:</span> publicKey
      <span class="token key atrule">forwardedPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins
    <span class="token key atrule">group</span><span class="token punctuation">:</span> 人民信产
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>jenkins<span class="token punctuation">:</span>f707e184<span class="token punctuation">-</span>6097<span class="token punctuation">-</span>4cdf<span class="token punctuation">-</span>b0c4<span class="token punctuation">-</span>b55dd2dda26e
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">name</span><span class="token punctuation">:</span> docker<span class="token punctuation">-</span>proxy
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fas fa<span class="token punctuation">-</span>desktop
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 103.61.39.116
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span>
        <span class="token key atrule">hmac</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>256<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>512<span class="token punctuation">-</span>etm@openssh.com
        <span class="token key atrule">kex</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256@libssh.org
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group<span class="token punctuation">-</span>exchange<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group14<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group15<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group16<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group17<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group18<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
        <span class="token key atrule">cipher</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm@openssh.com
          <span class="token punctuation">-</span> aes192<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm@openssh.com
        <span class="token key atrule">serverHostKey</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>ed25519
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>rsa
      <span class="token key atrule">privateKeys</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> file<span class="token punctuation">:</span>//C<span class="token punctuation">:</span>\Users\xx9z\Downloads\kp<span class="token punctuation">-</span>ezls5cun
      <span class="token key atrule">auth</span><span class="token punctuation">:</span> publicKey
      <span class="token key atrule">forwardedPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> docker<span class="token punctuation">-</span>proxy
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>docker<span class="token punctuation">-</span>proxy<span class="token punctuation">:</span>f6f954fa<span class="token punctuation">-</span>ebfc<span class="token punctuation">-</span>4371<span class="token punctuation">-</span>9e19<span class="token punctuation">-</span>3607d854af0b
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> telnet
    <span class="token key atrule">name</span><span class="token punctuation">:</span> ces57
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fas fa<span class="token punctuation">-</span>network<span class="token punctuation">-</span>wired
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 39.106.209.162
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">30366</span>
      <span class="token key atrule">inputMode</span><span class="token punctuation">:</span> readline
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> telnet<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>ces57<span class="token punctuation">:</span>95a0c8b8<span class="token punctuation">-</span>6fd7<span class="token punctuation">-</span>43e1<span class="token punctuation">-</span>8b6b<span class="token punctuation">-</span>847e1814a4ce
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fas fa<span class="token punctuation">-</span>desktop
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 39.106.209.162
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span>
        <span class="token key atrule">hmac</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>256<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>512<span class="token punctuation">-</span>etm@openssh.com
        <span class="token key atrule">kex</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256@libssh.org
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group<span class="token punctuation">-</span>exchange<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group14<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group15<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group16<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group17<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group18<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
        <span class="token key atrule">cipher</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm@openssh.com
          <span class="token punctuation">-</span> aes192<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm@openssh.com
        <span class="token key atrule">serverHostKey</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>ed25519
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>rsa
      <span class="token key atrule">privateKeys</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> file<span class="token punctuation">:</span>//C<span class="token punctuation">:</span>\Users\xx9z\Desktop\桌面\人民信产\zhangxinxin<span class="token punctuation">-</span>rmxc_rsa
      <span class="token key atrule">auth</span><span class="token punctuation">:</span> publicKey
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">61228</span>
      <span class="token key atrule">forwardedPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> 人民信产
    <span class="token key atrule">name</span><span class="token punctuation">:</span> k8s出口服务器
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>k8s<span class="token punctuation">:</span>e68cd01b<span class="token punctuation">-</span>2624<span class="token punctuation">-</span>4957<span class="token punctuation">-</span>8fbe<span class="token punctuation">-</span>c8aad736711f
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fas fa<span class="token punctuation">-</span>desktop
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 172.21.10.157
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span>
        <span class="token key atrule">hmac</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>256<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>512<span class="token punctuation">-</span>etm@openssh.com
        <span class="token key atrule">kex</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256@libssh.org
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group<span class="token punctuation">-</span>exchange<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group14<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group15<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group16<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group17<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group18<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
        <span class="token key atrule">cipher</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm@openssh.com
          <span class="token punctuation">-</span> aes192<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm@openssh.com
        <span class="token key atrule">serverHostKey</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>ed25519
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>rsa
      <span class="token key atrule">privateKeys</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">forwardedPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> 中资集团融媒体
    <span class="token key atrule">name</span><span class="token punctuation">:</span> 前端服务器<span class="token punctuation">-</span>zz<span class="token punctuation">-</span>front<span class="token punctuation">-</span><span class="token number">01</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>zz<span class="token punctuation">-</span>front<span class="token punctuation">-</span>01<span class="token punctuation">:</span>c376e81f<span class="token punctuation">-</span>c242<span class="token punctuation">-</span>466d<span class="token punctuation">-</span>8ad4<span class="token punctuation">-</span>02bd59837edc
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">name</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>harbor01
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fa fa<span class="token punctuation">-</span>bell
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.38
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span>
        <span class="token key atrule">hmac</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>256<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>512<span class="token punctuation">-</span>etm@openssh.com
        <span class="token key atrule">kex</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256@libssh.org
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group<span class="token punctuation">-</span>exchange<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group14<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group15<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group16<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group17<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group18<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
        <span class="token key atrule">cipher</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm@openssh.com
          <span class="token punctuation">-</span> aes192<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm@openssh.com
        <span class="token key atrule">serverHostKey</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>ed25519
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>rsa
      <span class="token key atrule">auth</span><span class="token punctuation">:</span> password
      <span class="token key atrule">privateKeys</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">forwardedPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s
    <span class="token key atrule">color</span><span class="token punctuation">:</span> <span class="token string">'#4169E1'</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>harbor01<span class="token punctuation">:</span>a5e3e535<span class="token punctuation">-</span>db07<span class="token punctuation">-</span>4536<span class="token punctuation">-</span>a751<span class="token punctuation">-</span>57654bcc90e3
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">name</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>etcd02
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fa fa<span class="token punctuation">-</span>bell
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.35
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span>
        <span class="token key atrule">hmac</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>256<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>512<span class="token punctuation">-</span>etm@openssh.com
        <span class="token key atrule">kex</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256@libssh.org
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group<span class="token punctuation">-</span>exchange<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group14<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group15<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group16<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group17<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group18<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
        <span class="token key atrule">cipher</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm@openssh.com
          <span class="token punctuation">-</span> aes192<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm@openssh.com
        <span class="token key atrule">serverHostKey</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>ed25519
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>rsa
      <span class="token key atrule">auth</span><span class="token punctuation">:</span> password
      <span class="token key atrule">privateKeys</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">forwardedPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s
    <span class="token key atrule">color</span><span class="token punctuation">:</span> <span class="token string">'#4169E1'</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>etcd02<span class="token punctuation">:</span>edf3e600<span class="token punctuation">-</span>fea9<span class="token punctuation">-</span>4b3b<span class="token punctuation">-</span>926e<span class="token punctuation">-</span>7ea467fbc8e0
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">name</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>etcd01
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fa fa<span class="token punctuation">-</span>bell
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.34
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span>
        <span class="token key atrule">hmac</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>256<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>512<span class="token punctuation">-</span>etm@openssh.com
        <span class="token key atrule">kex</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256@libssh.org
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group<span class="token punctuation">-</span>exchange<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group14<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group15<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group16<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group17<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group18<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
        <span class="token key atrule">cipher</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm@openssh.com
          <span class="token punctuation">-</span> aes192<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm@openssh.com
        <span class="token key atrule">serverHostKey</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>ed25519
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>rsa
      <span class="token key atrule">auth</span><span class="token punctuation">:</span> password
      <span class="token key atrule">privateKeys</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">forwardedPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s
    <span class="token key atrule">color</span><span class="token punctuation">:</span> <span class="token string">'#4169E1'</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>etcd01<span class="token punctuation">:</span>427c9688<span class="token punctuation">-</span>893b<span class="token punctuation">-</span>40d5<span class="token punctuation">-</span>8484<span class="token punctuation">-</span>a2e1edb94f39
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">name</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>worker02
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fa fa<span class="token punctuation">-</span>bell
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.33
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span>
        <span class="token key atrule">hmac</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>256<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>512<span class="token punctuation">-</span>etm@openssh.com
        <span class="token key atrule">kex</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256@libssh.org
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group<span class="token punctuation">-</span>exchange<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group14<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group15<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group16<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group17<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group18<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
        <span class="token key atrule">cipher</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm@openssh.com
          <span class="token punctuation">-</span> aes192<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm@openssh.com
        <span class="token key atrule">serverHostKey</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>ed25519
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>rsa
      <span class="token key atrule">auth</span><span class="token punctuation">:</span> password
      <span class="token key atrule">privateKeys</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">forwardedPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s
    <span class="token key atrule">color</span><span class="token punctuation">:</span> <span class="token string">'#4169E1'</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>worker02<span class="token punctuation">:</span>69ce4b33<span class="token punctuation">-</span>d6d1<span class="token punctuation">-</span>4f29<span class="token punctuation">-</span>8acf<span class="token punctuation">-</span>f247eafc82b9
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">name</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>worker01
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fa fa<span class="token punctuation">-</span>bell
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.32
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span>
        <span class="token key atrule">hmac</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>256<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>512<span class="token punctuation">-</span>etm@openssh.com
        <span class="token key atrule">kex</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256@libssh.org
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group<span class="token punctuation">-</span>exchange<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group14<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group15<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group16<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group17<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group18<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
        <span class="token key atrule">cipher</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm@openssh.com
          <span class="token punctuation">-</span> aes192<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm@openssh.com
        <span class="token key atrule">serverHostKey</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>ed25519
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>rsa
      <span class="token key atrule">auth</span><span class="token punctuation">:</span> password
      <span class="token key atrule">privateKeys</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">forwardedPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s
    <span class="token key atrule">color</span><span class="token punctuation">:</span> <span class="token string">'#4169E1'</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>worker01<span class="token punctuation">:</span>7c7d1970<span class="token punctuation">-</span>d689<span class="token punctuation">-</span>4a4f<span class="token punctuation">-</span>aeab<span class="token punctuation">-</span>fb5fa04240be
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">name</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>master02
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fa fa<span class="token punctuation">-</span>bell
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.30
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span>
        <span class="token key atrule">hmac</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>256<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>512<span class="token punctuation">-</span>etm@openssh.com
        <span class="token key atrule">kex</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256@libssh.org
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group<span class="token punctuation">-</span>exchange<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group14<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group15<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group16<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group17<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group18<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
        <span class="token key atrule">cipher</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm@openssh.com
          <span class="token punctuation">-</span> aes192<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm@openssh.com
        <span class="token key atrule">serverHostKey</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>ed25519
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>rsa
      <span class="token key atrule">privateKeys</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">forwardedPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s
    <span class="token key atrule">color</span><span class="token punctuation">:</span> <span class="token string">'#4169E1'</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>master02<span class="token punctuation">:</span>78cb87f8<span class="token punctuation">-</span>76dc<span class="token punctuation">-</span>4392<span class="token punctuation">-</span>bfca<span class="token punctuation">-</span>c1f2386c4ae1
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> ssh
    <span class="token key atrule">name</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>master01
    <span class="token key atrule">icon</span><span class="token punctuation">:</span> fa fa<span class="token punctuation">-</span>bell
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.31
      <span class="token key atrule">algorithms</span><span class="token punctuation">:</span>
        <span class="token key atrule">hmac</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha1<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>256<span class="token punctuation">-</span>etm@openssh.com
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> hmac<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>512<span class="token punctuation">-</span>etm@openssh.com
        <span class="token key atrule">kex</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> curve25519<span class="token punctuation">-</span>sha256@libssh.org
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group<span class="token punctuation">-</span>exchange<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group14<span class="token punctuation">-</span>sha256
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group15<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group16<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group17<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> diffie<span class="token punctuation">-</span>hellman<span class="token punctuation">-</span>group18<span class="token punctuation">-</span>sha512
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdh<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
        <span class="token key atrule">cipher</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes128<span class="token punctuation">-</span>gcm@openssh.com
          <span class="token punctuation">-</span> aes192<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>ctr
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm
          <span class="token punctuation">-</span> aes256<span class="token punctuation">-</span>gcm@openssh.com
        <span class="token key atrule">serverHostKey</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp384
          <span class="token punctuation">-</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp521
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">256</span>
          <span class="token punctuation">-</span> rsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span><span class="token number">512</span>
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>ed25519
          <span class="token punctuation">-</span> ssh<span class="token punctuation">-</span>rsa
      <span class="token key atrule">privateKeys</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">forwardedPorts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token key atrule">scripts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">-1</span>
    <span class="token key atrule">group</span><span class="token punctuation">:</span> xx<span class="token punctuation">-</span>k8s
    <span class="token key atrule">color</span><span class="token punctuation">:</span> <span class="token string">'#4169E1'</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> ssh<span class="token punctuation">:</span>custom<span class="token punctuation">:</span>xx<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>master01<span class="token punctuation">:</span>d6168438<span class="token punctuation">-</span>7277<span class="token punctuation">-</span>4aaf<span class="token punctuation">-</span>9acf<span class="token punctuation">-</span>3cd8f18d96cb
<span class="token key atrule">hotkeys</span><span class="token punctuation">:</span>
  <span class="token key atrule">toggle-window</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Space
  <span class="token key atrule">copy-current-path</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">ctrl-c</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>C
  <span class="token key atrule">copy</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>C
  <span class="token key atrule">paste</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>V
    <span class="token punctuation">-</span> Shift<span class="token punctuation">-</span>Insert
  <span class="token key atrule">select-all</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>A
  <span class="token key atrule">clear</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">zoom-in</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>=
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>=
  <span class="token key atrule">zoom-out</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span><span class="token punctuation">-</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span><span class="token punctuation">-</span>
  <span class="token key atrule">reset-zoom</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span><span class="token number">0</span>
  <span class="token key atrule">home</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Home
  <span class="token key atrule">end</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> End
  <span class="token key atrule">previous-word</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Left
  <span class="token key atrule">next-word</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Right
  <span class="token key atrule">delete-previous-word</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Backspace
  <span class="token key atrule">delete-line</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>Backspace
  <span class="token key atrule">delete-next-word</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Delete
  <span class="token key atrule">search</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>F
  <span class="token key atrule">pane-focus-all</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>I
  <span class="token key atrule">focus-all-tabs</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Alt<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>I
  <span class="token key atrule">scroll-to-top</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>PageUp
  <span class="token key atrule">scroll-up</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span>PageUp
  <span class="token key atrule">scroll-down</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span>PageDown
  <span class="token key atrule">scroll-to-bottom</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>PageDown
  <span class="token key atrule">restart-telnet-session</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">restart-ssh-session</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">launch-winscp</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">settings-tab</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token key atrule">settings</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span><span class="token punctuation">,</span>
  <span class="token key atrule">serial</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span>K
  <span class="token key atrule">restart-serial-session</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">new-window</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>N
  <span class="token key atrule">new-tab</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>T
  <span class="token key atrule">profile</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token key atrule">profile-selectors</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token key atrule">toggle-fullscreen</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> F11
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span>Enter
  <span class="token key atrule">close-tab</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>W
  <span class="token key atrule">reopen-tab</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>Z
  <span class="token key atrule">toggle-last-tab</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">rename-tab</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>R
  <span class="token key atrule">next-tab</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>Right
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Tab
  <span class="token key atrule">previous-tab</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>Left
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>Tab
  <span class="token key atrule">move-tab-left</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>PageUp
  <span class="token key atrule">move-tab-right</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>PageDown
  <span class="token key atrule">rearrange-panes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift
  <span class="token key atrule">duplicate-tab</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">restart-tab</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">explode-tab</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>.
  <span class="token key atrule">combine-tabs</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span><span class="token punctuation">,</span>
  <span class="token key atrule">tab-1</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span><span class="token number">1</span>
  <span class="token key atrule">tab-2</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span><span class="token number">2</span>
  <span class="token key atrule">tab-3</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span><span class="token number">3</span>
  <span class="token key atrule">tab-4</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span><span class="token number">4</span>
  <span class="token key atrule">tab-5</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span><span class="token number">5</span>
  <span class="token key atrule">tab-6</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span><span class="token number">6</span>
  <span class="token key atrule">tab-7</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span><span class="token number">7</span>
  <span class="token key atrule">tab-8</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span><span class="token number">8</span>
  <span class="token key atrule">tab-9</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span><span class="token number">9</span>
  <span class="token key atrule">tab-10</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Alt<span class="token punctuation">-</span><span class="token number">0</span>
  <span class="token key atrule">tab-11</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">tab-12</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">tab-13</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">tab-14</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">tab-15</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">tab-16</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">tab-17</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">tab-18</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">tab-19</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">tab-20</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">split-right</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>S
  <span class="token key atrule">split-bottom</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>D
  <span class="token key atrule">split-left</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">split-top</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-nav-right</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Alt<span class="token punctuation">-</span>Right
  <span class="token key atrule">pane-nav-down</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Alt<span class="token punctuation">-</span>Down
  <span class="token key atrule">pane-nav-up</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Alt<span class="token punctuation">-</span>Up
  <span class="token key atrule">pane-nav-left</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Alt<span class="token punctuation">-</span>Left
  <span class="token key atrule">pane-nav-previous</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Alt<span class="token punctuation">-</span><span class="token punctuation">[</span>
  <span class="token key atrule">pane-nav-next</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Alt<span class="token punctuation">-</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-nav-1</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-nav-2</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-nav-3</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-nav-4</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-nav-5</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-nav-6</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-nav-7</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-nav-8</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-nav-9</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-maximize</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Alt<span class="token punctuation">-</span>Enter
  <span class="token key atrule">close-pane</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-increase-vertical</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-decrease-vertical</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-increase-horizontal</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">pane-decrease-horizontal</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">switch-profile</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Alt<span class="token punctuation">-</span>T
  <span class="token key atrule">profile-selector</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>E
  <span class="token key atrule">command-selector</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Ctrl<span class="token punctuation">-</span>Shift<span class="token punctuation">-</span>P
<span class="token key atrule">terminal</span><span class="token punctuation">:</span>
  <span class="token key atrule">searchOptions</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token key atrule">colorScheme</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Snazzy
    <span class="token key atrule">foreground</span><span class="token punctuation">:</span> <span class="token string">'#eff0eb'</span>
    <span class="token key atrule">background</span><span class="token punctuation">:</span> <span class="token string">'#282a36'</span>
    <span class="token key atrule">cursor</span><span class="token punctuation">:</span> <span class="token string">'#ffffff'</span>
    <span class="token key atrule">colors</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">'#232323'</span>
      <span class="token punctuation">-</span> <span class="token string">'#ff5c57'</span>
      <span class="token punctuation">-</span> <span class="token string">'#5af78e'</span>
      <span class="token punctuation">-</span> <span class="token string">'#f3f99d'</span>
      <span class="token punctuation">-</span> <span class="token string">'#57c7ff'</span>
      <span class="token punctuation">-</span> <span class="token string">'#ff6ac1'</span>
      <span class="token punctuation">-</span> <span class="token string">'#9aedfe'</span>
      <span class="token punctuation">-</span> <span class="token string">'#ffffff'</span>
      <span class="token punctuation">-</span> <span class="token string">'#444444'</span>
      <span class="token punctuation">-</span> <span class="token string">'#ff5c57'</span>
      <span class="token punctuation">-</span> <span class="token string">'#5af78e'</span>
      <span class="token punctuation">-</span> <span class="token string">'#f3f99d'</span>
      <span class="token punctuation">-</span> <span class="token string">'#57c7ff'</span>
      <span class="token punctuation">-</span> <span class="token string">'#ff6ac1'</span>
      <span class="token punctuation">-</span> <span class="token string">'#9aedfe'</span>
      <span class="token punctuation">-</span> <span class="token string">'#ffffff'</span>
  <span class="token key atrule">customColorSchemes</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">background</span><span class="token punctuation">:</span> colorScheme
<span class="token key atrule">ssh</span><span class="token punctuation">:</span>
  <span class="token key atrule">knownHosts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.31
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.30
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.32
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.33
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.34
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.35
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.38
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 172.21.10.157
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> dTYT0yvuI5Tk7NkES7tNBSKZ0Tv+4Jnq+oYKTQieoqs=
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 39.106.209.162
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">61228</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> 9JlI/ZeUvj1qwurChGfa8HKrthVgmhU6a5Ry3wF+dAk=
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 103.61.38.114
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> Quz3HOTt4xxUIrA3m2NRhAmLRl9/Olpu7uYfOYGj4p4=
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.6
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> tWqlUsxnnUOh2aDJpViAlLCVxVOMFXoDOpFT9uZR820=
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.39
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.1.0.40
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 101.201.145.223
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> ecdsa<span class="token punctuation">-</span>sha2<span class="token punctuation">-</span>nistp256
      <span class="token key atrule">digest</span><span class="token punctuation">:</span> hxtzDkN0R9og1/5WO9aMA16OabytK7Btc61+kxH1J6U=
  <span class="token key atrule">warnOnClose</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">configSync</span><span class="token punctuation">:</span>
  <span class="token key atrule">parts</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token key atrule">host</span><span class="token punctuation">:</span> <span class="token string">''</span>
<span class="token key atrule">clickableLinks</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token key atrule">accessibility</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token key atrule">appearance</span><span class="token punctuation">:</span>
  <span class="token key atrule">flexTabs</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">hacks</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token key atrule">language</span><span class="token punctuation">:</span> zh<span class="token punctuation">-</span>CN
<span class="token key atrule">enableWelcomeTab</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">pluginBlacklist</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token key atrule">profileDefaults</span><span class="token punctuation">:</span>
  <span class="token key atrule">ssh</span><span class="token punctuation">:</span>
    <span class="token key atrule">disableDynamicTitle</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


