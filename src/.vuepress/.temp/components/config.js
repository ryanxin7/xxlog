import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "D:/xxlog/node_modules/vuepress-plugin-components/lib/client/shared.js";
import { h } from "vue";

import { useStyleTag } from "D:/xxlog/node_modules/vuepress-plugin-components/lib/client/vueuse.js";
import Badge from "D:/xxlog/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import FontIcon from "D:/xxlog/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import BackToTop from "D:/xxlog/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";


import "D:/xxlog/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    
  },
  setup: () => {
      useStyleTag(`\
      @import url("//at.alicdn.com/t/c/font_3912379_hn9q3qj34w6.css");
      `);
  },
  rootComponents: [
    () => h(BackToTop, { threshold: 300 }),
    
  ],
});
