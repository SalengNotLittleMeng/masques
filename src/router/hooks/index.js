import config from '../../config/myConfig';
export function addRouterHooks(router) {
  router.beforeEach(async (to) => {
    // 修改不同路由的页面标题
    const hasTitle = to?.meta?.title;
    document.title = hasTitle ? hasTitle : '项目名';
    if (!config.useBeforeEach) {
      return;
    }
    if (
      // 该路由是否只有登录用户才能访问
      to.meta.requiresAuth &&
      // 检查用户是否已登录
      !isAuthenticated() &&
      //  避免无限重定向
      to.name !== 'Login'
    ) {
      // 将用户重定向到登录页面
      return { name: 'Login' };
    }
  });
}
