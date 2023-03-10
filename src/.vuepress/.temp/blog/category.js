export const categoryMap = {"category":{"/":{"path":"/category/","map":{"Guide":{"path":"/category/guide/","keys":["v-03082396","v-2d0acde4","v-0a9e18b8"]},"持续集成":{"path":"/category/%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90/","keys":["v-b8d923aa"]},"k8s":{"path":"/category/k8s/","keys":["v-694fa6bc","v-679ace1d","v-65e5f57e","v-64311cdf","v-627c4440","v-6367115a","v-61b238bb","v-5ffd601c","v-5e48877d","v-5c93aede","v-5aded63f","v-5929fda0","v-57752501","v-55c04c62"]}}}},"tag":{"/":{"path":"/tag/","map":{"HAproxy":{"path":"/tag/haproxy/","keys":["v-4a0dc89a"]},"disable":{"path":"/tag/disable/","keys":["v-03082396","v-2d0acde4","v-0a9e18b8"]},"Git":{"path":"/tag/git/","keys":["v-b8d923aa"]},"k8s进阶训练营":{"path":"/tag/k8s%E8%BF%9B%E9%98%B6%E8%AE%AD%E7%BB%83%E8%90%A5/","keys":["v-694fa6bc","v-679ace1d","v-65e5f57e","v-64311cdf","v-627c4440","v-6367115a","v-61b238bb","v-5ffd601c","v-5e48877d","v-5c93aede","v-5aded63f","v-5929fda0","v-57752501","v-55c04c62"]},"K8S 训练营":{"path":"/tag/k8s-%E8%AE%AD%E7%BB%83%E8%90%A5/","keys":["v-c9abf226"]}}}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap);
  });


