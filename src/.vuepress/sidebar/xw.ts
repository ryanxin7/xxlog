import { sidebar } from "vuepress-theme-hope";

export const xwSidebar = sidebar({
  "/xw/": [
    "",
    {
      icon: "discover",
      text: "案例",
      prefix: "xw/yf",
      //link: "xw/",
      children: "structure",
    },
    //"slides",
  ],
});
