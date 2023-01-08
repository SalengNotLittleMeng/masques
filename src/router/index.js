import { createRouter, createWebHashHistory } from 'vue-router';
import { isAuthenticated } from '../utils/login';
import { importAll } from '../utils/module';
import { addRouterHooks } from './hooks/index';
// 模块化引入路由信息
const modules = importAll(require.context('./modules', false, /\.js$/));
const routes = Object.values(modules);
const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});
addRouterHooks(router);
export default router;
