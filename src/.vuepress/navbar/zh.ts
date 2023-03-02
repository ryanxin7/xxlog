import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  { text: "实战进阶⚗️", icon: "beaker", link: "/demo/" },
  {
    text: "小记🥳",
    //icon: "more",
    //prefix: "/xj/",
    children: [
      {
        text: "小记",
        //icon: "exercise",
        refix: "/xj/",
        children: ["/xj/",
		],
		//children: ["", { text: "图片压缩", icon: "more", link: "https://imageresizer.com/" }],
		
      },
	  //],
	  
      {
        text: "常用工具",
        icon: "config",
        //prefix: "",
        children: [ { text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
		            { text: "免费图标素材", icon: "more", link: "https://www.flaticon.com/" },
		]
		                  //{ text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  //{ text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  //{ text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  //{ text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  //{ text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  //{ text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  //{ text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  //{ text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
						  //],
		
      },
    ],
  },
  //{
    //text: "V2 文档",
    //icon: "note",
    //link: "https://imageresizer.com/",
  //},
]);
