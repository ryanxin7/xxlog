---
title: K8S集群证书到期问题
icon: exercise
order: 3
category:
  - kubernetes
tag:
  - K8S问题汇总
---



















## 前情回顾：

开发在Jenkins发版出现问题

![](http://cdn1.ryanxin.live/1684134967131.png)

然后更新了一下证书时间

![](http://cdn1.ryanxin.live/0daf32a5ed056ed3b8b3ee286dfffa4.png)

Jenkins 还是无法更新，这次是timeout

![](http://cdn1.ryanxin.live/image-20230515153404275.png)



于是查看helm 执行历史，还是timed out 

![](http://cdn1.ryanxin.live/image-20230515160912584.png)





## **思路一** 

重新创建一个sa 账号

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: rmxc-jenkinss
  namespace: rmxc-prod

# 授权namespace rmxc-dev给rmxc-jenkins
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: rmxc-jenkins-rolebinding
  namespace: rmxc-dev
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: edit
subjects:
  - kind: ServiceAccount
    name: rmxc-jenkins
    namespace: rmxc-prod
```





获取token 填写到 context中

![](http://cdn1.ryanxin.live/7246559e5e920a77f638c7064cf9081.png)



ServiceAccount 的Secrets 是空的 🤮



- 1.20（含1.20）之前的版本，在创建sa时会自动创建一个secret，然后这个会把这个secret通过投射卷挂载到pod里。

- 1.21~1.23这几个版本，在创建sa时也会自动创建secret，但是在pod里并不会使用secret里的token，而是由kubelet到token Request api去申请一个token。

- 1.24版本，在创建sa时不再自动创建secret了，是由kubelet 到 tokenRequest api去申请token。

  

  <br>

  

  在1.21到1.23的版本里，当我们创建了一个service account之后，系统也会自动创建一个secret。

  这个secret里会有一个永不过期的token。但是在pod里并不会使用secret的这个token。

  

  可是当前集群环境是 v1.21.1 应该自动创建才对,然而并没有自动创建🤮

  ```
  [root@master-01 kubernetes]# realkubeadm version
  kubeadm version: &version.Info{Major:"1", Minor:"21", GitVersion:"v1.21.1", GitCommit:"5e58841cce77d4bc13713ad2b91fa0d961e69192", GitTreeState:"clean", BuildDate:"2021-05-12T14:17:27Z", GoVersion:"go1.16.4", Compiler:"gc", Platform:"linux/amd64"}
  ```



**1.24.x 手动创建secret方法：**

让k8s帮我们填好永不过期token

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-sa-sample
  annotations:
    kubernetes.io/service-account.name: "sa-name"
type: kubernetes.io/service-account-token
```







## 思路二

此时已经感觉K8S集群有点不对劲，跟被什么东西卡住了一样🙃,开始排查四大金刚

![](http://cdn1.ryanxin.live/image-20230515162428235.png)



这时发现

**kube-controller-manager**

```bash
2023-05-15T06:05:01.346Z | W0515 06:05:01.346004 1 garbagecollector.go:703] failed to discover some groups: map[metrics.k8s.io/v1beta1:the server is currently unable to handle the request]
2023-05-15T06:05:30.134Z | E0515 06:05:30.134484 1 resource_quota_controller.go:409] unable to retrieve the complete list of server APIs: metrics.k8s.io/v1beta1: the server is currently unable to handle the request
2023-05-15T06:05:31.374Z | W0515 06:05:31.373915 1 garbagecollector.go:703] failed to discover some groups: map[metrics.k8s.io/v1beta1:the server is currently unable to handle the request]
2023-05-15T06:06:00.149Z | E0515 06:06:00.148786 1 resource_quota_controller.go:409] unable to retrieve the complete list of server APIs: metrics.k8s.io/v1beta1: the server is currently unable to handle the request
2023-05-15T06:06:01.406Z | W0515 06:06:01.406088 1 garbagecollector.go:703] failed to discover some groups: map[metrics.k8s.io/v1beta1:the server is currently unable to handle the request]
2023-05-15T06:06:30.163Z | E0515 06:06:30.162904 1 resource_quota_controller.go:409] unable to retrieve the complete list of server APIs: metrics.k8s.io/v1beta1: the server is currently unable to handle the request
2023-05-15T06:06:31.435Z | W0515 06:06:31.435710 1 garbagecollector.go:703] failed to discover some groups: map[metrics.k8s.io/v1beta1:the server is currently unable to handle the request]
2023-05-15T06:07:00.233Z | E0515 06:07:00.233046 1 resource_quota_controller.go:409] unable to retrieve the complete list of server APIs: metrics.k8s.io/v1beta1: the server is currently unable to handle the request
```





**kube-scheduler**

```bash
2023-05-15T05:47:31.747Z | E0515 05:47:31.746995 1 reflector.go:138] k8s.io/client-go/informers/factory.go:134: Failed to watch *v1beta1.CSIStorageCapacity: failed to list *v1beta1.CSIStorageCapacity: Unauthorized
2023-05-15T05:47:37.761Z | E0515 05:47:37.761643 1 reflector.go:138] k8s.io/client-go/informers/factory.go:134: Failed to watch *v1.Node: failed to list *v1.Node: Unauthorized
2023-05-15T05:47:38.024Z | E0515 05:47:38.024302 1 reflector.go:138] k8s.io/client-go/informers/factory.go:134: Failed to watch *v1.ReplicationController: failed to list *v1.ReplicationController: Unauthorized
2023-05-15T05:47:41.673Z | E0515 05:47:41.673742 1 reflector.go:138] k8s.io/client-go/informers/factory.go:134: Failed to watch *v1.Pod: failed to list *v1.Pod: Unauthorized
2023-05-15T05:47:44.933Z | E0515 05:47:44.933850 1 reflector.go:138] k8s.io/client-go/informers/factory.go:134: Failed to watch *v1.StatefulSet: failed to list *v1.StatefulSet: Unauthorized
2023-05-15T05:47:46.148Z | E0515 05:47:46.148038 1 reflector.go:138] k8s.io/client-go/informers/factory.go:134: Failed to watch *v1.PersistentVolumeClaim: failed to list *v1.PersistentVolumeClaim: Unauthorized
2023-05-15T05:47:51.624Z | E0515 05:47:51.624779 1 reflector.go:138] k8s.io/client-go/informers/factory.go:134: Failed to watch *v1.ReplicaSet: failed to list *v1.ReplicaSet: Unauthorized
2023-05-15T05:47:55.284Z | E0515 05:47:55.284566 1 reflector.go:138] k8s.io/client-go/informers/factory.go:134: Failed to watch *v1.PodDisruptionBudget: failed to list *v1.PodDisruptionBudget: Unauthorized
2023-05-15T05:47:55.736Z | E0515 05:47:55.736620 1 reflector.go:138] k8s.io/client-go/informers/factory.go:134: Failed to watch *v1.Service: failed to list *v1.Service: Unauthorized
2023-05-15T05:47:56.893Z | E0515 05:47:56.893650 1 reflector.go:138] k8s.io/client-go/informers/factory.go:134: Failed to watch *v1.StorageClass: failed to list *v1.StorageClass: Unauthorized
```



**kube-apiserver**

```bash
2023-05-15T05:20:00.977Z | E0515 05:20:00.976949 1 authentication.go:63] "Unable to authenticate the request" err="[x509: certificate has expired or is not yet valid: current time 2023-05-15T05:20:00Z is after 2023-05-14T05:49:22Z, verifying certificate SN=7385935559219004232, SKID=, AKID=9A:A4:90:20:28:E3:8C:F6:35:07:07:0F:17:AA:73:39:B5:8B:38:06 failed: x509: certificate has expired or is not yet valid: current time 2023-05-15T05:20:00Z is after 2023-05-14T05:49:22Z]"
2023-05-15T05:20:02.121Z | E0515 05:20:02.120790 1 authentication.go:63] "Unable to authenticate the request" err="[x509: certificate has expired or is not yet valid: current time 2023-05-15T05:20:02Z is after 2023-05-14T05:49:21Z, verifying certificate SN=6259688787785297613, SKID=, AKID=9A:A4:90:20:28:E3:8C:F6:35:07:07:0F:17:AA:73:39:B5:8B:38:06 failed: x509: certificate has expired or is not yet valid: current time 2023-05-15T05:20:02Z is after 2023-05-14T05:49:21Z]"
2023-05-15T05:20:03.512Z | E0515 05:20:03.512554 1 authentication.go:63] "Unable to authenticate the request" err="[x509: certificate has expired or is not yet valid: current time 2023-05-15T05:20:03Z is after 2023-05-14T05:49:22Z, verifying certificate SN=7385935559219004232, SKID=, AKID=9A:A4:90:20:28:E3:8C:F6:35:07:07:0F:17:AA:73:39:B5:8B:38:06 failed: x509: certificate has expired or is not yet valid: current time 2023-05-15T05:20:03Z is after 2023-05-14T05:49:22Z]"
2023-05-15T05:20:04.409Z | E0515 05:20:04.409506 1 available_controller.go:508] v1beta1.metrics.k8s.io failed with: failing or missing response from https://10.111.116.94:443/apis/metrics.k8s.io/v1beta1: Get "https://10.111.116.94:443/apis/metrics.k8s.io/v1beta1": net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
2023-05-15T05:20:05.530Z | E0515 05:20:05.529651 1 authentication.go:63] "Unable to authenticate the request" err="[x509: certificate has expired or is not yet valid: current time 2023-05-15T05:20:05Z is after 2023-05-14T05:49:21Z, verifying certificate SN=6259688787785297613, SKID=, AKID=9A:A4:90:20:28:E3:8C:F6:35:07:07:0F:17:AA:73:39:B5:8B:38:06 failed: x509: certificate has expired or is not yet valid: current time 2023-05-15T05:20:05Z is after
```



还好etcd没啥事，定时备份做起来 

```bash
2023-05-15T05:15:11.204Z | 2023-05-15 05:15:11.203956 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:15:21.204Z | 2023-05-15 05:15:21.204496 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:15:31.204Z | 2023-05-15 05:15:31.204452 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:15:41.214Z | 2023-05-15 05:15:41.209069 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:15:51.204Z | 2023-05-15 05:15:51.204050 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:16:01.203Z | 2023-05-15 05:16:01.203693 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:16:11.204Z | 2023-05-15 05:16:11.204467 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:16:21.203Z | 2023-05-15 05:16:21.203753 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:16:31.204Z | 2023-05-15 05:16:31.204200 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:16:41.204Z | 2023-05-15 05:16:41.204258 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:16:51.204Z | 2023-05-15 05:16:51.204486 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:17:01.204Z | 2023-05-15 05:17:01.204352 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:17:11.204Z | 2023-05-15 05:17:11.204092 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:19:37.618Z | 2023-05-15 05:19:37.618346 I | etcdserver/api/etcdhttp: /health OK (status code 200)
2023-05-15T05:20:07.955Z | 2023-05-15 05:20:07.949254 I | mvcc: store.index: compact 282255379
2023-05-15T05:20:08.021Z | 2023-05-15 05:20:08.019609 I | mvcc: finished scheduled compaction at 282255379 (took 65.070512ms)
```







## 解决方法

经过以上日志分析应该是证书更新成功了，但是服务组件开发没重启到位。



干脆在来一遍。



### 一、检查证书有效期

**1.通过 kubeadm 安装的 Kubernetes 集群的证书有效期为 1 年，可以使用相关命令查看证书的有效期：**

```bash
[root@master-01 kubernetes]# realkubeadm certs check-expiration
[check-expiration] Reading configuration from the cluster...
[check-expiration] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'

CERTIFICATE                EXPIRES                  RESIDUAL TIME   CERTIFICATE AUTHORITY   EXTERNALLY MANAGED
admin.conf                 May 14, 2024 04:15 UTC   364d                                    no      
apiserver                  May 14, 2024 03:18 UTC   364d            ca                      no      
apiserver-etcd-client      May 14, 2024 03:18 UTC   364d            etcd-ca                 no      
apiserver-kubelet-client   May 14, 2024 03:18 UTC   364d            ca                      no      
controller-manager.conf    May 14, 2024 04:15 UTC   364d                                    no      
etcd-healthcheck-client    May 14, 2024 03:18 UTC   364d            etcd-ca                 no      
etcd-peer                  May 14, 2024 03:18 UTC   364d            etcd-ca                 no      
etcd-server                May 14, 2024 03:18 UTC   364d            etcd-ca                 no      
front-proxy-client         May 14, 2024 03:18 UTC   364d            front-proxy-ca          no      
scheduler.conf             May 14, 2024 04:15 UTC   364d                                    no      

CERTIFICATE AUTHORITY   EXPIRES                  RESIDUAL TIME   EXTERNALLY MANAGED
ca                      May 28, 2031 15:52 UTC   8y              no      
etcd-ca                 May 28, 2031 15:52 UTC   8y              no      
front-proxy-ca          May 28, 2031 15:52 UTC   8y              no  
```



可以看到除了 ca 证书，其他证书的有效期都是一年。如果证书到期，则整个集群都会挂掉。

解决这个问题的办法一般有两种：

1. 如果还没有安装集群，可以通过修改源码设置证书有效期。
2. 如果集群已经运行，可以通过重新签发有效期更长的证书。



### 二、更新证书



**为了更新的安全性，更新之前可以将所有 Master 节点的配置目录做一个备份**：

```bash
cp -r /etc/kubernetes /etc/kubernetes_$(date +%F)
cp -r /var/lib/etcd /var/lib/etcd_$(date +%F)
```



通过执行证书更新命令查看：

```bash
kubeadm certs renew --help
```



可以看到证书更新是支持更新指定服务的证书，也可以更新单个服务的证书，但都是集群服务的证书。

```
# 所有 Master 节点更新所有证书
kubeadm certs renew all
systemctl restart kubelet  systremctl restart containerd
```



![](http://cdn1.ryanxin.live/824941-20221010172857637-35455519.png)

可以看到提示让重启 kube-apiserver, kube-controller-manager, kube-scheduler 和 etcd 服务证书才能生效。



```bash
# 重启组件
for i in $(kubectl get pods -A | grep -E "etcd|kube-apiserver|kube-controller-manager|kube-scheduler" | awk '{print $2}');do
    kubectl delete pod $i -n kube-system
    sleep 3
done
```



此时查看证书已经是新的了，也可以通过命令查看：

```bash
echo | openssl s_client -showcerts -connect 127.0.0.1:6443 -servername api 2>/dev/null | openssl x509 -noout -enddate
```

同时，由于在初始化 Master 集群的时候采用的是设置环境变量 `export KUBECONFIG=/etc/kubernetes/admin.conf` 的方法，不需要再更新该文件。如果不是该方法，还需要使用新的 admin.conf 替换掉复制的 `/root/.kube/config` 配置文件。





**重启containerd 运行镜像**

![](http://cdn1.ryanxin.live/image-20230515164716199.png)



```
crictl stop 9731cb9e5b723
crictl stop 977896873866e
crictl stop 24430601db1d1
crictl stop 7a7bad1c7dd70
```



重启后,查看相关日志

![](http://cdn1.ryanxin.live/image-20230515164818560.png)



服务正常了

![](http://cdn1.ryanxin.live/image-20230515165658387.png)



token也出来了

![](http://cdn1.ryanxin.live/image-20230515165731075.png)





Jenkins 构建也成功了 😆

![](http://cdn1.ryanxin.live/image-20230515165900088.png)