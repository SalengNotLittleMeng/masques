const getApp = () => import('../main');
const routesMap = new Map();
// 收集所有路由
function getAllRoutes(routes) {
  function getItem(item) {
    const path = item.path.replace(/\s+/g, '').replace(/("|')/g, '');
    const name = item.name ?? path.replace(/("|')/g, '');
    // 读入map结构，保证匹配的多样性
    routesMap.set(path, name);
    routesMap.set(name, path);
  }
  routes.forEach((item) => {
    getItem(item);
    if (item.children) {
      getAllRoutes(item.children);
    }
  });
}
export const Router = function ({ path, name, type }) {
  /**
   * @param target 对应 methods 这个对象
   * @param name 对应属性方法的名称
   * @param descriptor 对应属性方法的修饰符
   */
  let that = null;
  let routerFun = () => {};
  let paramsType = 'params';
  const method = 'push';
  // 根据注解的参数进行匹配
  path = path ? path.replace(/\s+/g, '') : null;
  name = name ? name.replace(/\s+/g, '') : null;
  if (type === 'query') {
    paramsType = 'query';
  }
  // 当没有配置相关参数时进行警告并直接返回
  if (!path && !name) {
    console.warn('至少要使用name或path之中的一种参数哦');
    return;
  }
  getApp().then((res) => {
    that = res.default;
    const router = that.config.globalProperties.$router;
    getAllRoutes(router.options.routes);
    routerFun = router[method];
  });
  return function (target, Name, descriptor) {
    const fn = descriptor.value;
    descriptor.value = function (params, ...rest) {
      if (!path) {
        path = routesMap.get(name);
      }
      if (!name) {
        name = routesMap.get(path);
      }
      // 考虑在dom中绑定传入默认参数
      if (params instanceof PointerEvent) {
        params = null;
      }
      if (paramsType === 'params') {
        console.log(name, params);
        routerFun({ name, params });
      } else {
        routerFun({ path, query: params });
      }
      fn.call(this, params, ...rest);
    };
  };
};
