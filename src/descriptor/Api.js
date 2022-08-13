// 装饰器的编译在main.js执行之前，因此要异步引入
const getApp = () => import("../main");
const ApiMap = new Map();
function urlMapMaker(apiObj) {
  // 扫描注册的api并集成为map对象
  for (let i in apiObj) {
    let funStr = apiObj[i].toString().replace(/\s*/g, "");
    let val = funStr.match(/url:("|')[A-Za-z0-9\/]+("|')/);
    if (val) {
      val = val[0].slice(6, -1);
    } else {
      val = funStr.match(/("|')\/[^\/][A-Za-z0-9\/]+/);
      val = val[0]?.slice(2);
    }
    val && ApiMap.set(val, i);
    val && ApiMap.set("/" + val, i);
  }
}
export const Api = function ({ module, url, params }) {
  /**
   * @param target 对应 methods 这个对象
   * @param name 对应属性方法的名称
   * @param descriptor 对应属性方法的修饰符
   */
  let that = null;
  let ajaxFun = () => {};
  // 通过注解字段查找并调用封装的axios方法
  getApp().then((res) => {
    that = res.default;
    const api = that.config.globalProperties.$api[module];
    urlMapMaker(api);
    let ajaxFunName = ApiMap.get(url);
    ajaxFun = api[ajaxFunName];
  });
  return function (target, name, descriptor) {
    let fn = descriptor.value;
    descriptor.value = function (params, res, ...rest) {
      ajaxFun(params).then((_res) => {
        res = _res;
        fn.call(this, params, res, ...rest);
      });
    };
  };
};
