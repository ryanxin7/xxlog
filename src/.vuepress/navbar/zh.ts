import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  { text: "实战进阶", icon: "discover", link: "/demo/" },
  {
    text: "小记",
    icon: "creative",
    prefix: "/guide/",
    children: [
      {
        text: "Bar",
        icon: "creative",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "more", link: "" }],
      },
      {
        text: "Foo",
        icon: "config",
        prefix: "foo/",
        children: ["ray", { text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
		                  { text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  { text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  { text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  { text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  { text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  { text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  { text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  { text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  ],
		
      },
    ],
  },
  //{
    //text: "V2 文档",
    //icon: "note",
    //link: "https://imageresizer.com/",
  //},
]);
