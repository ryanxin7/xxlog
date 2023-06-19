import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      icon: "discover",
      //text: "容器",
      prefix: "k8s/log/",
      //link: "k8s/log/",
      children: "structure",
    },
  ],
  "/ExamClasses/": [
    "",
    {
      icon: "discover",
      //text: "直播课笔记",
      prefix: "",
      //link: "yf/",
	  children: "structure",
      //children: ['yf','wx'],
    },
  ],
  "/haproxy/": [
    "",
    {
      icon: "discover",
      //text: "HAproxy 笔记",
      prefix: "log/",
	  children: "structure",
    },
  ],
    "/redis/": [
    "",
    {
      //icon: "discover",
      //text: "HAproxy 笔记",
      prefix: "log/",
	  children: "structure",
    },
  ],
      "/ceph/": [
    "",
    {
      //icon: "discover",
      //text: "HAproxy 笔记",
      prefix: "log/",
	  children: "structure",
    },
  ],
        "/elk/": [
    "",
    {
      //icon: "discover",
      //text: "HAproxy 笔记",
      prefix: "log/",
	  children: "structure",
    },
  ],
          "/linux/": [
    "",
    {
      //icon: "discover",
      //text: "HAproxy 笔记",
      prefix: "log/",
	  children: "structure",
    },
  ],
          "/mysql/": [
    "",
    {
      //icon: "discover",
      //text: "HAproxy 笔记",
      prefix: "log/",
	  children: "structure",
    },
  ],
          "/nginx/": [
    "",
    {
      //icon: "discover",
      //text: "HAproxy 笔记",
      prefix: "log/",
	  children: "structure",
    },
  ],
          "/zookeeper/": [
    "",
    {
      //icon: "discover",
      //text: "HAproxy 笔记",
      prefix: "log/",
	  children: "structure",
    },
  ],
          "/prometheus/": [
    "",
    {
      //icon: "discover",
      //text: "HAproxy 笔记",
      prefix: "log/",
	  children: "structure",
    },
  ],
          "/xj/": [
    "",
    {
      //icon: "discover",
      //text: "小记",
      prefix: "log/",
	  children: "structure",
    },
  ],
          "/CICD/": [
    "",
    {
      //icon: "discover",
      //text: "小记",
      prefix: "log/",
	  children: "structure",
    },
  ],
});
