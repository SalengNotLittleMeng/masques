import axios from "axios";
import { ElLoading } from "element-plus";

// 保存取消请求的Map对象
const pendingMap = new Map();
// 保存loading相关参数
const LoadingInstance = {
  _target: null, // 保存Loading实例
  _count: 0,
};
// 根据环境变量区分接口默认地址
// switch(process.env.NODE_ENV){
//     case 'production'  :
//         axios.defaults.baseURL = '';
//         break;
//     case 'test':
//         axios.defaults.baseURL = '';
//         break;
//     default:
//         axios.defaults.baseURL = '';
// }
// 根据后端返回格式确定是否开启序列化
// axios.defaults.transformRequest = data => qs.stringify(data);

// 创建实例
const instance = axios.create({
  //基础路径
  baseURL: "http://localhost:8888",
  // 请求限时
  timeout: 5000,
});
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 取消重复请求
    config.repeat_request_cancel && removePending(config);
    addPending(config);
    // 添加loading组件
    if (config.loading) {
      LoadingInstance._count++;
      if (LoadingInstance._count === 1) {
        LoadingInstance._target = ElLoading.service(config.loadingConfig);
      }
    }
    // 登录功能扩展时携带token，这个token需要自己存入localstorage
    let token = localStorage.getItem("token");
    // 如果携带token
    if (token && typeof window !== "undefined") {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 移除map中的cancelToken
    removePending(response.config);
    //关闭loading
    const isLoading = response.config.loading;
    isLoading && closeLoading(isLoading);
    return response.data;
  },
  (error) => {
    error.config && removePending(error.config);
    const isLoading = error?.config?.loading;
    isLoading && closeLoading(isLoading);
    let { response } = error;
    if (response) {
      //请求不成功但返回结果
      switch (response.status) {
        case 401:
          console.log("权限不足，请登录");
          break;
        case 403:
          console.log("登录已过期");
          break;
        case 404:
          console.log("当前接口不存在");
          break;
      }
    } else {
      //服务器完全没有返回结果（网络问题或服务器崩溃）
      if (!window.navigator.onLine) {
        //断网处理，跳转404页面
        console.log("断网了！");
      }
      return Promise.reject(error);
    }
  }
);

// 取消请求
/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
function getPendingKey(config) {
  let { url, method, params, data } = config;
  if (typeof data === "string") data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
function addPending(config) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}
/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}
/**
 * 关闭loading动画
 * @param {boolean} isloading
 */
function closeLoading(isloading) {
  if (isloading && LoadingInstance._count > 0) LoadingInstance._count--;
  if (LoadingInstance._count === 0) {
    LoadingInstance._target.close();
    LoadingInstance._target = null;
  }
}

/**
 * 处理配置并执行请求函数
 * @param {*} config
 * @returns Promise
 */
function myAxios(config, loadingConfig = {}) {
  // 判断是否传参
  if (JSON.stringify(loadingConfig) != "{}") {
    config.loading = true;
  }
  config.loadingConfig = loadingConfig;
  let { method, data, type, repeat_request_cancel } = config;
  config.repeat_request_cancel =
    repeat_request_cancel === undefined ? true : repeat_request_cancel;
  if (Object.prototype.toString.call(config) === "[object Object]") {
    config.method = method ? method : "get";
    config.type = type ? type : "json";
    switch (config.type) {
      case "json":
        config.headers = {
          "Content-Type": "application/json",
        };
        break;
      case "formData":
        config.headers = {
          "Content-Type": "multipart/form-data",
        };
        let params = data;
        let newParams = null;
        if (params) {
          newParams = new FormData();
          for (let i in params) {
            newParams.append(i, params[i]);
          }
        }
        config.data = newParams;
        break;
      case "urlencoded":
        config.headers = {
          "Content-Type": "application/x-www-form-urlencoded",
        };
        config.transformRequest = [
          (data) => {
            let result = "";
            for (let key in data) {
              result +=
                encodeURIComponent(key) +
                "=" +
                encodeURIComponent(data[key]) +
                "&";
            }
            return result.slice(0, result.length - 1);
          },
        ];
        break;
      default:
        break;
    }
    if ((config, method == "get")) {
      config.params = config.data;
    }
    return instance(config);
  }
}
export default myAxios;
