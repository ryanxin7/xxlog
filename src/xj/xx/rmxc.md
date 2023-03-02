## 人民信产信息



## helm 仓库

```bash
bash-4.2$ helm repo list
NAME	URL                                      
rmxc	https://harbor.rmxc.tech/chartrepo/charts
```





## 阿里云

```
阿里云：
https://www.aliyun.com/ 
账号：itpeopleenergy
密码：Renmin@2022
```



| 名称         | root用户密码     | 描述                                                         | 公网IP          | 内网IP         | CPU  | 内存  | 带宽 |
| ------------ | ---------------- | ------------------------------------------------------------ | --------------- | -------------- | ---- | ----- | ---- |
| sms-mongo-01 | 0vX0QxTHjx03     | 短信平台MongoDB服务器；docker部署                            |                 | 172.16.142.238 | 4    | 16384 | 0    |
| sms-mq-01    | e9uVGJXDRumQN    | 短信平台消息队列；docker部署                                 |                 | 172.16.142.237 | 8    | 16384 | 0    |
| worker-02    | RiTXKKsrxELVYyQ9 | 短信平台程序；/home/apps                                     |                 | 172.16.128.111 | 8    | 32768 | 0    |
| worker-03    | RXwhqSt0CNjb     | 短信平台数据库；docker部署                                   |                 | 172.16.128.112 | 8    | 32768 | 0    |
| worker-07    | cRq2PAWhIUvQNK   | k8s集群节点                                                  |                 | 172.16.142.234 | 4    | 16384 | 0    |
| worker-06    | j9PVtPlii3eML    | k8s集群节点                                                  |                 | 172.16.142.233 | 4    | 16384 | 0    |
| worker-05    | JDmp9VvMtBjqF    | k8s集群节点                                                  |                 | 172.16.142.232 | 4    | 16384 | 0    |
| worker-04    | 6pTm2iP2PCrz9    | k8s集群节点；敦煌研究院网站（外包部署运维）                  |                 | 172.16.142.231 | 4    | 16384 | 0    |
| gateway-01   | kGBAPHWN4kK      | k8s集群统一出入口                                            | 39.106.209.162  | 172.16.128.100 | 2    | 4096  | 100  |
| master-01    | R3K3Q7i9tSGjXWg  | k8s集群master节点                                            |                 | 172.16.128.101 | 2    | 4096  | 0    |
| worker-01    | 0gB5bptSxLKXB    | k8s集群节点                                                  |                 | 172.16.128.110 | 4    | 16384 | 0    |
| app-04       | grcZiSSRhhzu     | Jenkins服务器                                                | 101.201.145.223 | 172.17.167.116 | 4    | 16384 | 100  |
| bck-01       | Nv9TxYNXi3qXtk   | 生产环境：/home/soft_admin/runspace 人民城市年票 ；city-ticket 大屏缓存服务；fcloud 第三方接口中转服务；tstation 联合国小程序；un-minip 爬虫服务；rake | 47.93.210.2     | 172.17.167.115 | 4    | 16384 | 25   |
| app-03       | uwYiXEZq7izH     | 融媒体生产环境和SaaS服务： /home/soft_admin/runspace         | 47.93.205.240   | 172.17.167.112 | 4    | 32768 | 50   |
| db-01        | tsFS1hCTtLtqQA   | 生产环境MySQL数据库、ES                                      |                 | 172.17.167.110 | 4    | 16384 | 0    |







