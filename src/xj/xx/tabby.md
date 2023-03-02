---
title: updating
icon: config
order: 3
category:
  - Guide
tag:
  - disable

#navbar: false
sidebar: false

breadcrumb: false
pageInfo: false
contributors: false
editLink: false
lastUpdated: false
prev: false
next: false
comment: false
footer: false
backtotop: false
---





TABBY 配置


```yaml
version: 3
profiles:
  - type: ssh
    name: bq-worker-03
    icon: fas fa-desktop
    options:
      host: 192.168.100.101
      algorithms:
        hmac:
          - hmac-sha1
          - hmac-sha1-etm@openssh.com
          - hmac-sha2-256
          - hmac-sha2-256-etm@openssh.com
          - hmac-sha2-512
          - hmac-sha2-512-etm@openssh.com
        kex:
          - curve25519-sha256
          - curve25519-sha256@libssh.org
          - diffie-hellman-group-exchange-sha256
          - diffie-hellman-group14-sha256
          - diffie-hellman-group15-sha512
          - diffie-hellman-group16-sha512
          - diffie-hellman-group17-sha512
          - diffie-hellman-group18-sha512
          - ecdh-sha2-nistp256
          - ecdh-sha2-nistp384
          - ecdh-sha2-nistp521
        cipher:
          - aes128-ctr
          - aes128-gcm
          - aes128-gcm@openssh.com
          - aes192-ctr
          - aes256-ctr
          - aes256-gcm
          - aes256-gcm@openssh.com
        serverHostKey:
          - ecdsa-sha2-nistp256
          - ecdsa-sha2-nistp384
          - ecdsa-sha2-nistp521
          - rsa-sha2-256
          - rsa-sha2-512
          - ssh-ed25519
          - ssh-rsa
      scripts: []
      privateKeys: []
      forwardedPorts: []
    weight: -1
    group: 北京汽车报
    id: ssh:custom:192.168.100.101:96c5986e-30a1-46c2-813d-0d08aeb0a3ee
  - type: ssh
    name: bq-worker-02
    icon: fas fa-desktop
    options:
      host: 192.168.100.88
      algorithms: {}
    weight: -1
    group: 北京汽车报
    id: ssh:custom:192.168.100.88:d998967f-f970-4b8c-b92a-58e6cfefb72b
  - type: ssh
    name: bq-front-01
    icon: fas fa-desktop
    options:
      host: 172.16.0.83
      algorithms:
        hmac:
          - hmac-sha1
          - hmac-sha1-etm@openssh.com
          - hmac-sha2-256
          - hmac-sha2-256-etm@openssh.com
          - hmac-sha2-512
          - hmac-sha2-512-etm@openssh.com
        kex:
          - curve25519-sha256
          - curve25519-sha256@libssh.org
          - diffie-hellman-group-exchange-sha256
          - diffie-hellman-group14-sha256
          - diffie-hellman-group15-sha512
          - diffie-hellman-group16-sha512
          - diffie-hellman-group17-sha512
          - diffie-hellman-group18-sha512
          - ecdh-sha2-nistp256
          - ecdh-sha2-nistp384
          - ecdh-sha2-nistp521
        cipher:
          - aes128-ctr
          - aes128-gcm
          - aes128-gcm@openssh.com
          - aes192-ctr
          - aes256-ctr
          - aes256-gcm
          - aes256-gcm@openssh.com
        serverHostKey:
          - ecdsa-sha2-nistp256
          - ecdsa-sha2-nistp384
          - ecdsa-sha2-nistp521
          - rsa-sha2-256
          - rsa-sha2-512
          - ssh-ed25519
          - ssh-rsa
      privateKeys: []
      forwardedPorts: []
      scripts: []
    weight: -1
    group: 北京汽车报
    id: ssh:custom:172.16.0.83:47794286-fd66-4644-af8d-ba5f69c205a9
  - type: ssh
    icon: fas fa-desktop
    options:
      host: 192.168.100.87
      algorithms: {}
    weight: -1
    group: 北京汽车报
    name: 'bq-worker-01 '
    id: ssh:custom:192.168.100.87:17c9e828-1993-4112-a3d2-cf76cce5bafc
  - type: ssh
    icon: fas fa-desktop
    options:
      host: 101.201.145.223
      algorithms:
        hmac:
          - hmac-sha1
          - hmac-sha1-etm@openssh.com
          - hmac-sha2-256
          - hmac-sha2-256-etm@openssh.com
          - hmac-sha2-512
          - hmac-sha2-512-etm@openssh.com
        kex:
          - curve25519-sha256
          - curve25519-sha256@libssh.org
          - diffie-hellman-group-exchange-sha256
          - diffie-hellman-group14-sha256
          - diffie-hellman-group15-sha512
          - diffie-hellman-group16-sha512
          - diffie-hellman-group17-sha512
          - diffie-hellman-group18-sha512
          - ecdh-sha2-nistp256
          - ecdh-sha2-nistp384
          - ecdh-sha2-nistp521
        cipher:
          - aes128-ctr
          - aes128-gcm
          - aes128-gcm@openssh.com
          - aes192-ctr
          - aes256-ctr
          - aes256-gcm
          - aes256-gcm@openssh.com
        serverHostKey:
          - ecdsa-sha2-nistp256
          - ecdsa-sha2-nistp384
          - ecdsa-sha2-nistp521
          - rsa-sha2-256
          - rsa-sha2-512
          - ssh-ed25519
          - ssh-rsa
      privateKeys:
        - file://C:\Users\xx9z\Desktop\桌面\人民信产\zhangxinxin-rmxc_rsa
      auth: publicKey
      forwardedPorts: []
      scripts: []
    weight: -1
    name: jenkins
    group: 人民信产
    id: ssh:custom:jenkins:f707e184-6097-4cdf-b0c4-b55dd2dda26e
  - type: ssh
    name: docker-proxy
    icon: fas fa-desktop
    options:
      host: 103.61.39.116
      algorithms:
        hmac:
          - hmac-sha1
          - hmac-sha1-etm@openssh.com
          - hmac-sha2-256
          - hmac-sha2-256-etm@openssh.com
          - hmac-sha2-512
          - hmac-sha2-512-etm@openssh.com
        kex:
          - curve25519-sha256
          - curve25519-sha256@libssh.org
          - diffie-hellman-group-exchange-sha256
          - diffie-hellman-group14-sha256
          - diffie-hellman-group15-sha512
          - diffie-hellman-group16-sha512
          - diffie-hellman-group17-sha512
          - diffie-hellman-group18-sha512
          - ecdh-sha2-nistp256
          - ecdh-sha2-nistp384
          - ecdh-sha2-nistp521
        cipher:
          - aes128-ctr
          - aes128-gcm
          - aes128-gcm@openssh.com
          - aes192-ctr
          - aes256-ctr
          - aes256-gcm
          - aes256-gcm@openssh.com
        serverHostKey:
          - ecdsa-sha2-nistp256
          - ecdsa-sha2-nistp384
          - ecdsa-sha2-nistp521
          - rsa-sha2-256
          - rsa-sha2-512
          - ssh-ed25519
          - ssh-rsa
      privateKeys:
        - file://C:\Users\xx9z\Downloads\kp-ezls5cun
      auth: publicKey
      forwardedPorts: []
      scripts: []
    weight: -1
    group: docker-proxy
    id: ssh:custom:docker-proxy:f6f954fa-ebfc-4371-9e19-3607d854af0b
  - type: telnet
    name: ces57
    icon: fas fa-network-wired
    options:
      host: 39.106.209.162
      port: 30366
      inputMode: readline
      scripts: []
    id: telnet:custom:ces57:95a0c8b8-6fd7-43e1-8b6b-847e1814a4ce
  - type: ssh
    icon: fas fa-desktop
    options:
      host: 39.106.209.162
      algorithms:
        hmac:
          - hmac-sha1
          - hmac-sha1-etm@openssh.com
          - hmac-sha2-256
          - hmac-sha2-256-etm@openssh.com
          - hmac-sha2-512
          - hmac-sha2-512-etm@openssh.com
        kex:
          - curve25519-sha256
          - curve25519-sha256@libssh.org
          - diffie-hellman-group-exchange-sha256
          - diffie-hellman-group14-sha256
          - diffie-hellman-group15-sha512
          - diffie-hellman-group16-sha512
          - diffie-hellman-group17-sha512
          - diffie-hellman-group18-sha512
          - ecdh-sha2-nistp256
          - ecdh-sha2-nistp384
          - ecdh-sha2-nistp521
        cipher:
          - aes128-ctr
          - aes128-gcm
          - aes128-gcm@openssh.com
          - aes192-ctr
          - aes256-ctr
          - aes256-gcm
          - aes256-gcm@openssh.com
        serverHostKey:
          - ecdsa-sha2-nistp256
          - ecdsa-sha2-nistp384
          - ecdsa-sha2-nistp521
          - rsa-sha2-256
          - rsa-sha2-512
          - ssh-ed25519
          - ssh-rsa
      privateKeys:
        - file://C:\Users\xx9z\Desktop\桌面\人民信产\zhangxinxin-rmxc_rsa
      auth: publicKey
      port: 61228
      forwardedPorts: []
      scripts: []
    weight: -1
    group: 人民信产
    name: k8s出口服务器
    id: ssh:custom:k8s:e68cd01b-2624-4957-8fbe-c8aad736711f
  - type: ssh
    icon: fas fa-desktop
    options:
      host: 172.21.10.157
      algorithms:
        hmac:
          - hmac-sha1
          - hmac-sha1-etm@openssh.com
          - hmac-sha2-256
          - hmac-sha2-256-etm@openssh.com
          - hmac-sha2-512
          - hmac-sha2-512-etm@openssh.com
        kex:
          - curve25519-sha256
          - curve25519-sha256@libssh.org
          - diffie-hellman-group-exchange-sha256
          - diffie-hellman-group14-sha256
          - diffie-hellman-group15-sha512
          - diffie-hellman-group16-sha512
          - diffie-hellman-group17-sha512
          - diffie-hellman-group18-sha512
          - ecdh-sha2-nistp256
          - ecdh-sha2-nistp384
          - ecdh-sha2-nistp521
        cipher:
          - aes128-ctr
          - aes128-gcm
          - aes128-gcm@openssh.com
          - aes192-ctr
          - aes256-ctr
          - aes256-gcm
          - aes256-gcm@openssh.com
        serverHostKey:
          - ecdsa-sha2-nistp256
          - ecdsa-sha2-nistp384
          - ecdsa-sha2-nistp521
          - rsa-sha2-256
          - rsa-sha2-512
          - ssh-ed25519
          - ssh-rsa
      privateKeys: []
      forwardedPorts: []
      scripts: []
    weight: -1
    group: 中资集团融媒体
    name: 前端服务器-zz-front-01
    id: ssh:custom:zz-front-01:c376e81f-c242-466d-8ad4-02bd59837edc
  - type: ssh
    name: xx-k8s-harbor01
    icon: fa fa-bell
    options:
      host: 10.1.0.38
      algorithms:
        hmac:
          - hmac-sha1
          - hmac-sha1-etm@openssh.com
          - hmac-sha2-256
          - hmac-sha2-256-etm@openssh.com
          - hmac-sha2-512
          - hmac-sha2-512-etm@openssh.com
        kex:
          - curve25519-sha256
          - curve25519-sha256@libssh.org
          - diffie-hellman-group-exchange-sha256
          - diffie-hellman-group14-sha256
          - diffie-hellman-group15-sha512
          - diffie-hellman-group16-sha512
          - diffie-hellman-group17-sha512
          - diffie-hellman-group18-sha512
          - ecdh-sha2-nistp256
          - ecdh-sha2-nistp384
          - ecdh-sha2-nistp521
        cipher:
          - aes128-ctr
          - aes128-gcm
          - aes128-gcm@openssh.com
          - aes192-ctr
          - aes256-ctr
          - aes256-gcm
          - aes256-gcm@openssh.com
        serverHostKey:
          - ecdsa-sha2-nistp256
          - ecdsa-sha2-nistp384
          - ecdsa-sha2-nistp521
          - rsa-sha2-256
          - rsa-sha2-512
          - ssh-ed25519
          - ssh-rsa
      auth: password
      privateKeys: []
      forwardedPorts: []
      scripts: []
    weight: -1
    group: xx-k8s
    color: '#4169E1'
    id: ssh:custom:xx-k8s-harbor01:a5e3e535-db07-4536-a751-57654bcc90e3
  - type: ssh
    name: xx-k8s-etcd02
    icon: fa fa-bell
    options:
      host: 10.1.0.35
      algorithms:
        hmac:
          - hmac-sha1
          - hmac-sha1-etm@openssh.com
          - hmac-sha2-256
          - hmac-sha2-256-etm@openssh.com
          - hmac-sha2-512
          - hmac-sha2-512-etm@openssh.com
        kex:
          - curve25519-sha256
          - curve25519-sha256@libssh.org
          - diffie-hellman-group-exchange-sha256
          - diffie-hellman-group14-sha256
          - diffie-hellman-group15-sha512
          - diffie-hellman-group16-sha512
          - diffie-hellman-group17-sha512
          - diffie-hellman-group18-sha512
          - ecdh-sha2-nistp256
          - ecdh-sha2-nistp384
          - ecdh-sha2-nistp521
        cipher:
          - aes128-ctr
          - aes128-gcm
          - aes128-gcm@openssh.com
          - aes192-ctr
          - aes256-ctr
          - aes256-gcm
          - aes256-gcm@openssh.com
        serverHostKey:
          - ecdsa-sha2-nistp256
          - ecdsa-sha2-nistp384
          - ecdsa-sha2-nistp521
          - rsa-sha2-256
          - rsa-sha2-512
          - ssh-ed25519
          - ssh-rsa
      auth: password
      privateKeys: []
      forwardedPorts: []
      scripts: []
    weight: -1
    group: xx-k8s
    color: '#4169E1'
    id: ssh:custom:xx-k8s-etcd02:edf3e600-fea9-4b3b-926e-7ea467fbc8e0
  - type: ssh
    name: xx-k8s-etcd01
    icon: fa fa-bell
    options:
      host: 10.1.0.34
      algorithms:
        hmac:
          - hmac-sha1
          - hmac-sha1-etm@openssh.com
          - hmac-sha2-256
          - hmac-sha2-256-etm@openssh.com
          - hmac-sha2-512
          - hmac-sha2-512-etm@openssh.com
        kex:
          - curve25519-sha256
          - curve25519-sha256@libssh.org
          - diffie-hellman-group-exchange-sha256
          - diffie-hellman-group14-sha256
          - diffie-hellman-group15-sha512
          - diffie-hellman-group16-sha512
          - diffie-hellman-group17-sha512
          - diffie-hellman-group18-sha512
          - ecdh-sha2-nistp256
          - ecdh-sha2-nistp384
          - ecdh-sha2-nistp521
        cipher:
          - aes128-ctr
          - aes128-gcm
          - aes128-gcm@openssh.com
          - aes192-ctr
          - aes256-ctr
          - aes256-gcm
          - aes256-gcm@openssh.com
        serverHostKey:
          - ecdsa-sha2-nistp256
          - ecdsa-sha2-nistp384
          - ecdsa-sha2-nistp521
          - rsa-sha2-256
          - rsa-sha2-512
          - ssh-ed25519
          - ssh-rsa
      auth: password
      privateKeys: []
      forwardedPorts: []
      scripts: []
    weight: -1
    group: xx-k8s
    color: '#4169E1'
    id: ssh:custom:xx-k8s-etcd01:427c9688-893b-40d5-8484-a2e1edb94f39
  - type: ssh
    name: xx-k8s-worker02
    icon: fa fa-bell
    options:
      host: 10.1.0.33
      algorithms:
        hmac:
          - hmac-sha1
          - hmac-sha1-etm@openssh.com
          - hmac-sha2-256
          - hmac-sha2-256-etm@openssh.com
          - hmac-sha2-512
          - hmac-sha2-512-etm@openssh.com
        kex:
          - curve25519-sha256
          - curve25519-sha256@libssh.org
          - diffie-hellman-group-exchange-sha256
          - diffie-hellman-group14-sha256
          - diffie-hellman-group15-sha512
          - diffie-hellman-group16-sha512
          - diffie-hellman-group17-sha512
          - diffie-hellman-group18-sha512
          - ecdh-sha2-nistp256
          - ecdh-sha2-nistp384
          - ecdh-sha2-nistp521
        cipher:
          - aes128-ctr
          - aes128-gcm
          - aes128-gcm@openssh.com
          - aes192-ctr
          - aes256-ctr
          - aes256-gcm
          - aes256-gcm@openssh.com
        serverHostKey:
          - ecdsa-sha2-nistp256
          - ecdsa-sha2-nistp384
          - ecdsa-sha2-nistp521
          - rsa-sha2-256
          - rsa-sha2-512
          - ssh-ed25519
          - ssh-rsa
      auth: password
      privateKeys: []
      forwardedPorts: []
      scripts: []
    weight: -1
    group: xx-k8s
    color: '#4169E1'
    id: ssh:custom:xx-k8s-worker02:69ce4b33-d6d1-4f29-8acf-f247eafc82b9
  - type: ssh
    name: xx-k8s-worker01
    icon: fa fa-bell
    options:
      host: 10.1.0.32
      algorithms:
        hmac:
          - hmac-sha1
          - hmac-sha1-etm@openssh.com
          - hmac-sha2-256
          - hmac-sha2-256-etm@openssh.com
          - hmac-sha2-512
          - hmac-sha2-512-etm@openssh.com
        kex:
          - curve25519-sha256
          - curve25519-sha256@libssh.org
          - diffie-hellman-group-exchange-sha256
          - diffie-hellman-group14-sha256
          - diffie-hellman-group15-sha512
          - diffie-hellman-group16-sha512
          - diffie-hellman-group17-sha512
          - diffie-hellman-group18-sha512
          - ecdh-sha2-nistp256
          - ecdh-sha2-nistp384
          - ecdh-sha2-nistp521
        cipher:
          - aes128-ctr
          - aes128-gcm
          - aes128-gcm@openssh.com
          - aes192-ctr
          - aes256-ctr
          - aes256-gcm
          - aes256-gcm@openssh.com
        serverHostKey:
          - ecdsa-sha2-nistp256
          - ecdsa-sha2-nistp384
          - ecdsa-sha2-nistp521
          - rsa-sha2-256
          - rsa-sha2-512
          - ssh-ed25519
          - ssh-rsa
      auth: password
      privateKeys: []
      forwardedPorts: []
      scripts: []
    weight: -1
    group: xx-k8s
    color: '#4169E1'
    id: ssh:custom:xx-k8s-worker01:7c7d1970-d689-4a4f-aeab-fb5fa04240be
  - type: ssh
    name: xx-k8s-master02
    icon: fa fa-bell
    options:
      host: 10.1.0.30
      algorithms:
        hmac:
          - hmac-sha1
          - hmac-sha1-etm@openssh.com
          - hmac-sha2-256
          - hmac-sha2-256-etm@openssh.com
          - hmac-sha2-512
          - hmac-sha2-512-etm@openssh.com
        kex:
          - curve25519-sha256
          - curve25519-sha256@libssh.org
          - diffie-hellman-group-exchange-sha256
          - diffie-hellman-group14-sha256
          - diffie-hellman-group15-sha512
          - diffie-hellman-group16-sha512
          - diffie-hellman-group17-sha512
          - diffie-hellman-group18-sha512
          - ecdh-sha2-nistp256
          - ecdh-sha2-nistp384
          - ecdh-sha2-nistp521
        cipher:
          - aes128-ctr
          - aes128-gcm
          - aes128-gcm@openssh.com
          - aes192-ctr
          - aes256-ctr
          - aes256-gcm
          - aes256-gcm@openssh.com
        serverHostKey:
          - ecdsa-sha2-nistp256
          - ecdsa-sha2-nistp384
          - ecdsa-sha2-nistp521
          - rsa-sha2-256
          - rsa-sha2-512
          - ssh-ed25519
          - ssh-rsa
      privateKeys: []
      forwardedPorts: []
      scripts: []
    weight: -1
    group: xx-k8s
    color: '#4169E1'
    id: ssh:custom:xx-k8s-master02:78cb87f8-76dc-4392-bfca-c1f2386c4ae1
  - type: ssh
    name: xx-k8s-master01
    icon: fa fa-bell
    options:
      host: 10.1.0.31
      algorithms:
        hmac:
          - hmac-sha1
          - hmac-sha1-etm@openssh.com
          - hmac-sha2-256
          - hmac-sha2-256-etm@openssh.com
          - hmac-sha2-512
          - hmac-sha2-512-etm@openssh.com
        kex:
          - curve25519-sha256
          - curve25519-sha256@libssh.org
          - diffie-hellman-group-exchange-sha256
          - diffie-hellman-group14-sha256
          - diffie-hellman-group15-sha512
          - diffie-hellman-group16-sha512
          - diffie-hellman-group17-sha512
          - diffie-hellman-group18-sha512
          - ecdh-sha2-nistp256
          - ecdh-sha2-nistp384
          - ecdh-sha2-nistp521
        cipher:
          - aes128-ctr
          - aes128-gcm
          - aes128-gcm@openssh.com
          - aes192-ctr
          - aes256-ctr
          - aes256-gcm
          - aes256-gcm@openssh.com
        serverHostKey:
          - ecdsa-sha2-nistp256
          - ecdsa-sha2-nistp384
          - ecdsa-sha2-nistp521
          - rsa-sha2-256
          - rsa-sha2-512
          - ssh-ed25519
          - ssh-rsa
      privateKeys: []
      forwardedPorts: []
      scripts: []
    weight: -1
    group: xx-k8s
    color: '#4169E1'
    id: ssh:custom:xx-k8s-master01:d6168438-7277-4aaf-9acf-3cd8f18d96cb
hotkeys:
  toggle-window:
    - Ctrl-Space
  copy-current-path: []
  ctrl-c:
    - Ctrl-C
  copy:
    - Ctrl-Shift-C
  paste:
    - Ctrl-Shift-V
    - Shift-Insert
  select-all:
    - Ctrl-Shift-A
  clear: []
  zoom-in:
    - Ctrl-=
    - Ctrl-Shift-=
  zoom-out:
    - Ctrl--
    - Ctrl-Shift--
  reset-zoom:
    - Ctrl-0
  home:
    - Home
  end:
    - End
  previous-word:
    - Ctrl-Left
  next-word:
    - Ctrl-Right
  delete-previous-word:
    - Ctrl-Backspace
  delete-line:
    - Ctrl-Shift-Backspace
  delete-next-word:
    - Ctrl-Delete
  search:
    - Ctrl-Shift-F
  pane-focus-all:
    - Ctrl-Shift-I
  focus-all-tabs:
    - Ctrl-Alt-Shift-I
  scroll-to-top:
    - Ctrl-PageUp
  scroll-up:
    - Alt-PageUp
  scroll-down:
    - Alt-PageDown
  scroll-to-bottom:
    - Ctrl-PageDown
  restart-telnet-session: []
  restart-ssh-session: []
  launch-winscp: []
  settings-tab: {}
  settings:
    - Ctrl-,
  serial:
    - Alt-K
  restart-serial-session: []
  new-window:
    - Ctrl-Shift-N
  new-tab:
    - Ctrl-Shift-T
  profile: {}
  profile-selectors: {}
  toggle-fullscreen:
    - F11
    - Alt-Enter
  close-tab:
    - Ctrl-Shift-W
  reopen-tab:
    - Ctrl-Shift-Z
  toggle-last-tab: []
  rename-tab:
    - Ctrl-Shift-R
  next-tab:
    - Ctrl-Shift-Right
    - Ctrl-Tab
  previous-tab:
    - Ctrl-Shift-Left
    - Ctrl-Shift-Tab
  move-tab-left:
    - Ctrl-Shift-PageUp
  move-tab-right:
    - Ctrl-Shift-PageDown
  rearrange-panes:
    - Ctrl-Shift
  duplicate-tab: []
  restart-tab: []
  explode-tab:
    - Ctrl-Shift-.
  combine-tabs:
    - Ctrl-Shift-,
  tab-1:
    - Alt-1
  tab-2:
    - Alt-2
  tab-3:
    - Alt-3
  tab-4:
    - Alt-4
  tab-5:
    - Alt-5
  tab-6:
    - Alt-6
  tab-7:
    - Alt-7
  tab-8:
    - Alt-8
  tab-9:
    - Alt-9
  tab-10:
    - Alt-0
  tab-11: []
  tab-12: []
  tab-13: []
  tab-14: []
  tab-15: []
  tab-16: []
  tab-17: []
  tab-18: []
  tab-19: []
  tab-20: []
  split-right:
    - Ctrl-Shift-S
  split-bottom:
    - Ctrl-Shift-D
  split-left: []
  split-top: []
  pane-nav-right:
    - Ctrl-Alt-Right
  pane-nav-down:
    - Ctrl-Alt-Down
  pane-nav-up:
    - Ctrl-Alt-Up
  pane-nav-left:
    - Ctrl-Alt-Left
  pane-nav-previous:
    - Ctrl-Alt-[
  pane-nav-next:
    - Ctrl-Alt-]
  pane-nav-1: []
  pane-nav-2: []
  pane-nav-3: []
  pane-nav-4: []
  pane-nav-5: []
  pane-nav-6: []
  pane-nav-7: []
  pane-nav-8: []
  pane-nav-9: []
  pane-maximize:
    - Ctrl-Alt-Enter
  close-pane: []
  pane-increase-vertical: []
  pane-decrease-vertical: []
  pane-increase-horizontal: []
  pane-decrease-horizontal: []
  switch-profile:
    - Ctrl-Alt-T
  profile-selector:
    - Ctrl-Shift-E
  command-selector:
    - Ctrl-Shift-P
terminal:
  searchOptions: {}
  colorScheme:
    name: Snazzy
    foreground: '#eff0eb'
    background: '#282a36'
    cursor: '#ffffff'
    colors:
      - '#232323'
      - '#ff5c57'
      - '#5af78e'
      - '#f3f99d'
      - '#57c7ff'
      - '#ff6ac1'
      - '#9aedfe'
      - '#ffffff'
      - '#444444'
      - '#ff5c57'
      - '#5af78e'
      - '#f3f99d'
      - '#57c7ff'
      - '#ff6ac1'
      - '#9aedfe'
      - '#ffffff'
  customColorSchemes: []
  background: colorScheme
ssh:
  knownHosts:
    - host: 10.1.0.31
      port: 22
      type: ecdsa-sha2-nistp256
      digest: lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    - host: 10.1.0.30
      port: 22
      type: ecdsa-sha2-nistp256
      digest: lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    - host: 10.1.0.32
      port: 22
      type: ecdsa-sha2-nistp256
      digest: lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    - host: 10.1.0.33
      port: 22
      type: ecdsa-sha2-nistp256
      digest: lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    - host: 10.1.0.34
      port: 22
      type: ecdsa-sha2-nistp256
      digest: lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    - host: 10.1.0.35
      port: 22
      type: ecdsa-sha2-nistp256
      digest: lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    - host: 10.1.0.38
      port: 22
      type: ecdsa-sha2-nistp256
      digest: lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    - host: 172.21.10.157
      port: 22
      type: ecdsa-sha2-nistp256
      digest: dTYT0yvuI5Tk7NkES7tNBSKZ0Tv+4Jnq+oYKTQieoqs=
    - host: 39.106.209.162
      port: 61228
      type: ecdsa-sha2-nistp256
      digest: 9JlI/ZeUvj1qwurChGfa8HKrthVgmhU6a5Ry3wF+dAk=
    - host: 103.61.38.114
      port: 22
      type: ecdsa-sha2-nistp256
      digest: Quz3HOTt4xxUIrA3m2NRhAmLRl9/Olpu7uYfOYGj4p4=
    - host: 10.1.0.6
      port: 22
      type: ecdsa-sha2-nistp256
      digest: tWqlUsxnnUOh2aDJpViAlLCVxVOMFXoDOpFT9uZR820=
    - host: 10.1.0.39
      port: 22
      type: ecdsa-sha2-nistp256
      digest: lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    - host: 10.1.0.40
      port: 22
      type: ecdsa-sha2-nistp256
      digest: lhRjKQBhgEhjbqcfKBb6oyle8C9EIOzu48QUoaeISIE=
    - host: 101.201.145.223
      port: 22
      type: ecdsa-sha2-nistp256
      digest: hxtzDkN0R9og1/5WO9aMA16OabytK7Btc61+kxH1J6U=
  warnOnClose: true
configSync:
  parts: {}
  host: ''
clickableLinks: {}
accessibility: {}
appearance:
  flexTabs: true
hacks: {}
language: zh-CN
enableWelcomeTab: false
pluginBlacklist: []
profileDefaults:
  ssh:
    disableDynamicTitle: true
