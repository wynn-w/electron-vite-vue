import { PageEnum } from "@/enums/pageEnum";
import { AppRouteModule, AppRouteRecordRaw } from "@/router/types";

const modules = import.meta.glob("./modules/**/*.ts", { eager: true });
const routeModuleList: AppRouteModule[] = [];

// Push to route list
Object.keys(modules).forEach((key) => {
  const mod = (modules as Recordable)[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [...routeModuleList];

// Root route
export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/sys/login/Login.vue"),
  meta: {
    title: "Login",
  },
};

// Basic routing without permission
export const basicRoutes = [LoginRoute, RootRoute];
