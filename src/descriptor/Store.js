const getApp = () => import("../main");
function toRow(proxy) {
  let obj = {};
  for (let i in proxy) {
    obj[i] = proxy[i];
  }
  return obj;
}
export const Store = function ({ module, commit }) {
  /**
   * @param target 对应 methods 这个对象
   * @param name 对应属性方法的名称
   * @param descriptor 对应属性方法的修饰符
   */
  if (!module) {
    console.warn("moudle is a necessary param");
    return () => {};
  }
  let that = null;
  let proxyData = null;
  const moudleName = module.replace(/\s+/g, "");
  getApp().then((res) => {
    that = res.default;
    const store = that.config.globalProperties.$store;
    module = module && store.state[module];
    module = toRow(module);
    proxyData = new Proxy(module, {
      get(target, key, receiver) {
        return target[key];
      },
      set(target, key, val, receiver) {
        let commitName = commit ?? moudleName + "/" + "_new" + key;
        store.commit(commitName, val);
        target[key] = val;
        return val; // 是否设置成功，为一个布尔值
      },
    });
  });
  return function (target, Name, descriptor) {
    console.log(proxyData);
    const fn = descriptor.value;
    descriptor.value = function (params) {
      params = proxyData;
      console.log(params);
      fn.call(this, params);
    };
  };
};
