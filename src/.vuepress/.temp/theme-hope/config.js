import { defineClientConfig } from "@vuepress/client";

import HopeIcon from "@theme-hope/components/HopeIcon";
import Layout from "C:/Users/xx9z/Desktop/新建文件夹/xxlog/node_modules/vuepress-theme-hope/lib/client/layouts/Layout.js";
import NotFound from "C:/Users/xx9z/Desktop/新建文件夹/xxlog/node_modules/vuepress-theme-hope/lib/client/layouts/NotFound.js";

import { useScrollPromise } from "@theme-hope/composables/index";
import { injectDarkmode, setupDarkmode } from "@theme-hope/modules/outlook/composables/index";
import { setupSidebarItems } from "@theme-hope/modules/sidebar/composables/index";

import "C:/Users/xx9z/Desktop/新建文件夹/xxlog/node_modules/vuepress-theme-hope/lib/client/styles/index.scss";

import GlobalEncrypt from "@theme-hope/modules/encrypt/components/GlobalEncrypt";
import LocalEncrypt from "@theme-hope/modules/encrypt/components/LocalEncrypt";
import Slide from "C:/Users/xx9z/Desktop/新建文件夹/xxlog/node_modules/vuepress-theme-hope/lib/client/layouts/Slide.js";

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkmode(app);

    // render icon for auto-catalog
    app.component("HopeIcon", HopeIcon);

    app.component("GlobalEncrypt", GlobalEncrypt);
    app.component("LocalEncrypt", LocalEncrypt);
    
  },
  setup: () => {
    setupDarkmode();
    setupSidebarItems();
    
  },
  layouts: {
    Layout,
    NotFound,
    Slide,
      }
});