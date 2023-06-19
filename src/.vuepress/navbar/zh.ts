import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  { text: "归档🗂️", icon: "beaker", link: "/category/" },
  { text: "文章🌱", icon: "beaker", link: "/article/" },
  { text: "时间线⏰", icon: "beaker", link: "/timeline/" },
  { text: "关于🤷", icon: "beaker", link: "/about/" },
  {
    text: "小记📌",
    //icon: "more",
    prefix: "/xj/",
    children: [
      {
      text: "小记",
      ////icon: "exercise",
      //refix: "/xj/",
      children: ["",
		],
		////children: ["", { text: "图片压缩", icon: "more", link: "https://imageresizer.com/" }],
		//
      },
	  //],
	  
      {
        text: "常用工具",
        icon: "config",
        //prefix: "",
        children: [ { text: "图片压缩", icon: "more", link: "https://imageresizer.com/" },
		            { text: "免费图标素材", icon: "more", link: "https://www.flaticon.com/" },
					{ text: "emojipedia", icon: "more", link: "https://emojipedia.org/" },
					{ text: "processon", icon: "more", link: "https://www.processon.com/" },
					{ text: "Epic Games Store 每周免费游戏", icon: "more", link: "https://indienova.com/gamedb/list/121/p/1" },
					
		]
		                  //
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
