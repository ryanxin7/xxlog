import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      icon: "discover",
      text: "k8s",
      prefix: "k8s/",
      //link: "k8s/log/",
      children: "structure",
    },
    //{
    //  text: "Docs",
    //  icon: "note",
    //  prefix: "guide/",
    //  children: "structure",
    //},
    //"slides",
  ],
});
