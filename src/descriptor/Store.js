const getApp = () => import("../main");
export const Store = function ({ moudle }) {
  /**
   * @param target 对应 methods 这个对象
   * @param name 对应属性方法的名称
   * @param descriptor 对应属性方法的修饰符
   */
  if (moudle) {
    console.warn("moudle is a necessary param");
    return;
  }
  getApp().then((res) => {
    that = res.default;
    const store = that.config.globalProperties.$store;
    moudle = moudle && store.state[moudle];
  });
  return function (target, Name, descriptor) {
    const fn = descriptor.value;
    descriptor.value = function (params, ...rest) {
      fn.call(this, params, ...rest);
    };
  };
};
