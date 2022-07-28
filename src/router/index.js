import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import "../utils/login";
import { isAuthenticated } from "../utils/login";
import config from "../config/myConfig";
import Home from "../view/Demo/DemoHome.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "主页",
    },
    children: [],
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});
// 全局路由守卫
router.beforeEach(async (to, from) => {
  // 修改不同路由的页面标题
  let hasTitle = to?.meta?.title;
  document.title = hasTitle ? hasTitle : "项目名";
  if (!config.useBeforeEach) {
    return;
  }
  if (
    // 该路由是否只有登录用户才能访问
    to.meta.requiresAuth &&
    // 检查用户是否已登录
    !isAuthenticated() &&
    //  避免无限重定向
    to.name !== "Login"
  ) {
    // 将用户重定向到登录页面
    return { name: "Login" };
  }
});
export default router;
