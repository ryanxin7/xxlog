import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      icon: "discover",
      text: "容器",
      prefix: "k8s/",
      //link: "k8s/log/",
      children: "structure",
    },
  ],
  "/xw/": [
    "",
    {
      icon: "discover",
      text: "直播课笔记",
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
      text: "HAproxy笔记",
      prefix: "",
	  children: "structure",
    },
  ],
});
