---
Author: Ryan
title: 8.实战案例-基于StatefulSetMySQL主从架构
tag: 
    - k8s进阶训练营
category: 
   - k8s
date: 2022-6-8 12:12:22
lastUpdated: true
sidebar: false
##breadcrumb: false
contributors: false
---



[https://kubernetes.io/zh-cn/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/](https://kubernetes.io/zh-cn/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/)<br />Pod调度运⾏时，如果应⽤不需要任何稳定的标示、有序的部署、删除和扩展，则应该使⽤⼀组⽆状态副本的控制<br />器来部署应⽤，例如 Deployment 或 ReplicaSet更适合⽆状态服务需求，⽽StatefulSet适合管理所有有状态的服<br />务，⽐如MySQL、 MongoDB集群等。 

**运行一个有状态的应用程序：**<br />[https://kubernetes.io/zh-cn/docs/tasks/run-application/run-replicated-stateful-application/](https://kubernetes.io/zh-cn/docs/tasks/run-application/run-replicated-stateful-application/)

 <br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33538388/1675045229487-bc9ccd32-8c67-4f4c-8097-e358c394297b.png#averageHue=%23e4ead3&clientId=u07032b4b-04a2-4&from=paste&height=601&id=u15957a54&name=image.png&originHeight=601&originWidth=866&originalType=binary&ratio=1&rotation=0&showTitle=false&size=63834&status=done&style=none&taskId=u5e782982-70a8-4b14-bdf8-eddfe74d71d&title=&width=866)



**StatefulSet **本质上是Deployment的⼀种变体，在v1.9版本中已成为GA版本，它为了解决有状态服务的问题，**它所管理的Pod拥有固定的Pod名称，启停顺序，在StatefulSet中， Pod名字称为⽹络标识(hostname)，还必须要⽤到共享存储。**

**在Deployment中，与之对应的服务是service，⽽在StatefulSet中与之对应的headless service**， headless<br />service，即**⽆头服务**，与service的区别就是它没有Cluster IP，解析它的名称时将返回该Headless Service 对应的全部Pod的Endpoint列表。 <br /> 

**StatefulSet 特点**

- 给每个pod分配固定且唯⼀的⽹络标识符
- 给每个pod分配固定且持久化的外部存储
- 对pod进⾏有序的部署和扩展
- 对pod进有序的删除和终⽌
- 对pod进有序的⾃动滚动更新<br /> <br /> 
<a name="R6bQg"></a>
## StatefulSet 的组成部分 
:::info
**Headless Service**：⽤来定义Pod⽹络标识( DNS domain)，指的是短的serfvice(丢失了domainname)。直接解析到pod。<br />**StatefulSet**：定义具体应⽤，有多少个Pod副本，并为每个Pod定义了⼀个域名。

**volumeClaimTemplates**： 存储卷申请模板，创建PVC，指定pvc名称⼤⼩，将⾃动创建pvc，且pvc必须由存储类供应。 
:::
<a name="wUv0K"></a>
##  
<a name="PLSgV"></a>
## <br /> 镜像准备 <br /> 
```yaml
#准备xtrabackup镜像
root@harbor01[11:17:56]~ #:docker pull registry.cn-hangzhou.aliyuncs.com/hxpdocker/xtrabackup:1.0
root@harbor01[10:27:39]~ #:docker tag registry.cn-hangzhou.aliyuncs.com/hxpdocker/xtrabackup:1.0 harbor.ceamg.com/databases/xtrabackup:1.0
root@harbor01[10:29:24]~ #:docker push harbor.ceamg.com/databases/xtrabackup:1.0



#准备mysql 镜像
root@harbor01[10:30:00]~ #:docker pull mysql:5.7
root@harbor01[10:31:09]~ #:docker tag mysql:5.7 harbor.ceamg.com/databases/mysql:5.7
root@harbor01[10:31:42]~ #:docker push harbor.ceamg.com/databases/mysql:5.7
```


<a name="evTC9"></a>
## 创建PV <br /> 


pvc会⾃动基于PV创建，只需要有多个可⽤的PV即可， PV数量取决于计划启动多少个mysql pod，本次创建5个PV，也就是最多启动5个mysql pod 。

<a name="EvOus"></a>
### 创建nfs共享存储目录
```bash
root@harbor01[10:35:02]/data/k8s #:mkdir /data/k8s/mysqldata/mysql-datadir-1 
root@harbor01[10:35:20]/data/k8s #:mkdir /data/k8s/mysqldata/mysql-datadir-2
root@harbor01[10:35:22]/data/k8s #:mkdir /data/k8s/mysqldata/mysql-datadir-3
root@harbor01[10:35:23]/data/k8s #:mkdir /data/k8s/mysqldata/mysql-datadir-4
root@harbor01[10:35:24]/data/k8s #:mkdir /data/k8s/mysqldata/mysql-datadir-5


vim /etc/exports
/data/k8s/xinzk *(rw,sync,no_root_squash)
/data/k8s/web1 *(rw,sync,no_root_squash)
/data/k8s/mysqldata *(rw,sync,no_root_squash)

root@harbor01[10:36:33]/data/k8s #:systemctl restart nfs-server.service

root@harbor01[10:36:41]/data/k8s #:showmount -e
Export list for harbor01:
/data/k8s/mysqldata *
/data/k8s/web1      *
/data/k8s/xinzk     *
```
<a name="VjEOq"></a>
### <br /> 创建PV yaml文件
```yaml
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mysql-datadir-1
spec:
  capacity:
    storage: 50Gi
  accessModes:
    - ReadWriteOnce
  nfs:
    path: /data/k8s/mysqldata/mysql-datadir-1 
    server: 10.1.0.38


---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mysql-datadir-2
spec:
  capacity:
    storage: 50Gi
  accessModes:
    - ReadWriteOnce
  nfs:
    path: /data/k8s/mysqldata/mysql-datadir-2 
    server: 10.1.0.38


---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mysql-datadir-3
spec:
  capacity:
    storage: 50Gi
  accessModes:
    - ReadWriteOnce
  nfs:
    path: /data/k8s/mysqldata/mysql-datadir-3 
    server: 10.1.0.38
```


 **检查pv状态**
```bash
root@master01[12:06:23]~/mysql-sts-yaml #:kubectl apply -f mysql-persistentvolume.yaml 
persistentvolume/mysql-datadir-1 created
persistentvolume/mysql-datadir-2 created
persistentvolume/mysql-datadir-3 created


root@master01[12:06:51]~/mysql-sts-yaml #:kubectl get pv 
NAME                     CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM                            STORAGECLASS   REASON   AGE
mysql-datadir-1          50Gi       RWO            Retain           Available                                                            27s
mysql-datadir-2          50Gi       RWO            Retain           Available                                                            27s
mysql-datadir-3          50Gi       RWO            Retain           Available                                                            27s
```


<a name="DANON"></a>
## 创建 ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql
  namespace: mysql-sts
  labels:
    app: mysql
    app.kubernetes.io/name: mysql
data:
  primary.cnf: |
    [mysqld]
    log-bin
  replica.cnf: |
    [mysqld]
    super-read-only
```
```bash
$ kubectl apply -f mysql-configmap.yaml 
```


 这个 ConfigMap 提供 my.cnf 覆盖设置，使你可以独立控制 MySQL 主服务器和副本服务器的配置。 在这里，你希望主服务器能够将复制日志提供给副本服务器， 并且希望副本服务器拒绝任何不是通过复制进行的写操作。  



<a name="oKIFZ"></a>
## 创建 无头服务

 Headless Service⽆头服务，与service的**区别就是它没有Cluster IP**，解析它的名称时将返回该Headless Service对应的全部Pod的Endpoint列表。

**客户端 Service 为 mysql-read，是一种常规 Service**，具有其自己的集群 IP。 该集群 IP 在报告就绪的所有 MySQL Pod 之间分配连接。 可能的端点集合包括 MySQL 主节点和所有副本节点。  <br />**mysql-read是给slave pod使用的mysql只读服务，以此实现读写分离。  **

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
  namespace: mysql-sts
  labels:
    app: mysql
    app.kubernetes.io/name: mysql
spec:
  ports:
  - name: mysql
    port: 3306
  clusterIP: None
  selector:
    app: mysql

---
apiVersion: v1
kind: Service
metadata:
  name: mysql-read
  namespace: mysql-sts
  labels:
    app: mysql
    app.kubernetes.io/name: mysql
    readonly: "true"
spec:
  ports:
  - name: mysql
    port: 3306
  selector:
    app: mysql
```
```bash
kubectl apply -f mysql-services.yaml
```


<a name="VXg8e"></a>
##  创建 StatefulSet
**创建MySQL一主多从集群，每个pod分别执行4个容器。具体作用如下：**

1. **初始化容器1**：根据mysql-0数字标记为master，其它为slave，并分发不同配置文件。
2. **初始化容器2**：mysql-0不动，mysql-1从mysql-0全量拷贝数据，mysql-2再从mysql-1全量拷贝，以此类推。
3. **主容器mysql**：数据库主程序，都有读写功能。读写分离依靠mysql和mysql-read服务实现。
4. **主容器xtrabackup**：实现主从复制自动备份，除刚创建外都从mysql-0拷贝。开放3307端口供后一位pod全量复制。

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
  namespace: mysql-sts
spec:
  selector:
    matchLabels:
      app: mysql
      app.kubernetes.io/name: mysql
  serviceName: mysql
  replicas: 3
  template:
    metadata:
      labels:
        app: mysql
        app.kubernetes.io/name: mysql
    spec:
      initContainers:
      - name: init-mysql
        image: harbor.ceamg.com/databases/mysql:5.7
        command:
        - bash
        - "-c"
        - |
          set -ex
          # 基于 Pod 序号生成 MySQL 服务器的 ID。
          [[ $HOSTNAME =~ -([0-9]+)$ ]] || exit 1
          ordinal=${BASH_REMATCH[1]}
          echo [mysqld] > /mnt/conf.d/server-id.cnf
          # 添加偏移量以避免使用 server-id=0 这一保留值。
          echo server-id=$((100 + $ordinal)) >> /mnt/conf.d/server-id.cnf
          # 将合适的 conf.d 文件从 config-map 复制到 emptyDir。
          if [[ $ordinal -eq 0 ]]; then
            cp /mnt/config-map/primary.cnf /mnt/conf.d/
          else
            cp /mnt/config-map/replica.cnf /mnt/conf.d/
          fi          
        volumeMounts:
        - name: conf
          mountPath: /mnt/conf.d
        - name: config-map
          mountPath: /mnt/config-map
      - name: clone-mysql
        image: harbor.ceamg.com/databases/xtrabackup:1.0
        command:
        - bash
        - "-c"
        - |
          set -ex
          # 如果已有数据，则跳过克隆。
          [[ -d /var/lib/mysql/mysql ]] && exit 0
          # 跳过主实例（序号索引 0）的克隆。
          [[ `hostname` =~ -([0-9]+)$ ]] || exit 1
          ordinal=${BASH_REMATCH[1]}
          [[ $ordinal -eq 0 ]] && exit 0
          # 从原来的对等节点克隆数据。
          ncat --recv-only mysql-$(($ordinal-1)).mysql 3307 | xbstream -x -C /var/lib/mysql
          # 准备备份。
          xtrabackup --prepare --target-dir=/var/lib/mysql          
        volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
          subPath: mysql
        - name: conf
          mountPath: /etc/mysql/conf.d
      containers:
      - name: mysql
        image: harbor.ceamg.com/databases/mysql:5.7
        env:
        - name: MYSQL_ALLOW_EMPTY_PASSWORD
          value: "1"
        ports:
        - name: mysql
          containerPort: 3306
        volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
          subPath: mysql
        - name: conf
          mountPath: /etc/mysql/conf.d
        resources:
          requests:
            cpu: 500m
            memory: 1Gi
        livenessProbe:
          exec:
            command: ["mysqladmin", "ping"]
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
        readinessProbe:
          exec:
            # 检查我们是否可以通过 TCP 执行查询（skip-networking 是关闭的）。
            command: ["mysql", "-h", "127.0.0.1", "-e", "SELECT 1"]
          initialDelaySeconds: 5
          periodSeconds: 2
          timeoutSeconds: 1
      - name: xtrabackup
        image: harbor.ceamg.com/databases/xtrabackup:1.0
        ports:
        - name: xtrabackup
          containerPort: 3307
        command:
        - bash
        - "-c"
        - |
          set -ex
          cd /var/lib/mysql

          # 确定克隆数据的 binlog 位置（如果有的话）。
          if [[ -f xtrabackup_slave_info && "x$(<xtrabackup_slave_info)" != "x" ]]; then
            # XtraBackup 已经生成了部分的 “CHANGE MASTER TO” 查询
            # 因为我们从一个现有副本进行克隆。(需要删除末尾的分号!)
            cat xtrabackup_slave_info | sed -E 's/;$//g' > change_master_to.sql.in
            # 在这里要忽略 xtrabackup_binlog_info （它是没用的）。
            rm -f xtrabackup_slave_info xtrabackup_binlog_info
          elif [[ -f xtrabackup_binlog_info ]]; then
            # 我们直接从主实例进行克隆。解析 binlog 位置。
            [[ `cat xtrabackup_binlog_info` =~ ^(.*?)[[:space:]]+(.*?)$ ]] || exit 1
            rm -f xtrabackup_binlog_info xtrabackup_slave_info
            echo "CHANGE MASTER TO MASTER_LOG_FILE='${BASH_REMATCH[1]}',\
                  MASTER_LOG_POS=${BASH_REMATCH[2]}" > change_master_to.sql.in
          fi

          # 检查我们是否需要通过启动复制来完成克隆。
          if [[ -f change_master_to.sql.in ]]; then
            echo "Waiting for mysqld to be ready (accepting connections)"
            until mysql -h 127.0.0.1 -e "SELECT 1"; do sleep 1; done

            echo "Initializing replication from clone position"
            mysql -h 127.0.0.1 \
                  -e "$(<change_master_to.sql.in), \
                          MASTER_HOST='mysql-0.mysql', \
                          MASTER_USER='root', \
                          MASTER_PASSWORD='', \
                          MASTER_CONNECT_RETRY=10; \
                        START SLAVE;" || exit 1
            # 如果容器重新启动，最多尝试一次。
            mv change_master_to.sql.in change_master_to.sql.orig
          fi

          # 当对等点请求时，启动服务器发送备份。
          exec ncat --listen --keep-open --send-only --max-conns=1 3307 -c \
            "xtrabackup --backup --slave-info --stream=xbstream --host=127.0.0.1 --user=root"          
        volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
          subPath: mysql
        - name: conf
          mountPath: /etc/mysql/conf.d
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
      volumes:
      - name: conf
        emptyDir: {}
      - name: config-map
        configMap:
          name: mysql
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi

```


<a name="FAAep"></a>
### 运⾏mysql服务 <br /> 
```bash
root@master01[13:33:35]~/mysql-sts-yaml #:kubectl get pod -n mysql-sts
NAME      READY   STATUS    RESTARTS   AGE
mysql-0   2/2     Running   0          102s
mysql-1   2/2     Running   0          64s
mysql-2   1/2     Running   0          18s
```

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33538388/1675321021708-f97227f0-ef0f-484e-977a-eb4be4d79421.png#averageHue=%23191817&clientId=ua2ee9124-b043-4&from=paste&height=450&id=u1edee1ee&name=image.png&originHeight=450&originWidth=842&originalType=binary&ratio=1&rotation=0&showTitle=false&size=48737&status=done&style=none&taskId=u8ae37fb0-9dd9-4534-b24a-091947a13cf&title=&width=842)
<a name="B4xbl"></a>
### 验证MySQL主从同步是否正常 <br /> 
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33538388/1675063510415-a66964a9-27e4-466f-92d9-1185adfa1ce7.png#averageHue=%230f111a&clientId=u07032b4b-04a2-4&from=paste&height=515&id=u3e103252&name=image.png&originHeight=515&originWidth=913&originalType=binary&ratio=1&rotation=0&showTitle=false&size=53430&status=done&style=none&taskId=uad162b22-417a-416e-a83c-4f60767ebfa&title=&width=913)
