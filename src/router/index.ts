import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { asyncRoutes, basicRoutes } from "./routes";
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });

getRouteNames(basicRoutes);
; // 测试代码
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes.concat(asyncRoutes) as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router);
}
