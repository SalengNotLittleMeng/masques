import axios from "axios";
import Qs from "qs";
import { ElLoading, ElMessage } from "element-plus";
import Baseconfig from "../config/myConfig";
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
    // 添加auth凭证
    Baseconfig.auth && (config.auth = Baseconfig.auth);
    // 取消重复请求
    config.repeat_request_cancel &&
      removePending(config, Boolean(config.retryTimes));
    addPending(config);
    // 添加loading组件
    if (config.loading) {
      LoadingInstance._count++;
      if (LoadingInstance._count === 1) {
        LoadingInstance._target = ElLoading.service(config.loadingConfig);
      }
    }
    // 登录功能扩展时携带token，这个token需要自己存入localstorage
    let token = localStorage.getItem(Baseconfig.tokenName);
    // 如果携带token
    if (token && typeof window !== "undefined") {
      config.headers[Baseconfig.headerToken] = token;
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
    // 移除map中的cancelToken，收到响应后不能取消
    removePending(response.config);
    //关闭loading，取消加载动画
    const isLoading = response.config.loading;
    isLoading && closeLoading(isLoading);
    // if (response.data?.code != 200) {
    //   ElMessage.error("好像出了一点问题哦~");
    // }
    return response.data;
  },
  // 统一错误处理
  (error) => {
    let { config, response } = error;
    config && removePending(config, Boolean(config?.retryTimes));
    const isLoading = config?.loading;
    isLoading && closeLoading(isLoading);
    // 进行重连
    if (config?.retryTimes) {
      const { _retryCount = 0, retryDelay = 3000, retryTimes } = config;
      config._retryCount = _retryCount;
      if (_retryCount >= retryTimes) {
        return responseStatus(response, error);
      }
      config._retryCount++;
      // 延时处理
      const delay = new Promise((resolve) => {
        setTimeout(() => {
          console.log(_retryCount);
          resolve();
        }, retryDelay);
      });
      // 重新发起请求
      delay.then(function () {
        return instance(config);
      });
    }
    return responseStatus(response, error);
  }
);
function responseStatus(response, error) {
  if (response) {
    //请求不成功但返回结果
    let { errorText } = error?.config;
    let errorTextDefault = "";
    switch (response.status) {
      case 401:
        errorTextDefault = "请先登录哦~";
        break;
      case 403:
        errorTextDefault = "登录信息已过期~";
        break;
      case 404:
        errorTextDefault = "没有找到信息";
        break;
      case 500:
        errorTextDefault = "服务器好像有点忙碌哦";
        break;
      default:
        errorTextDefault = "好像有点问题哦";
    }
    errorText = errorText ? errorText : errorTextDefault;
    ElMessage.error(errorText);
  } else {
    //服务器完全没有返回结果（网络问题或服务器崩溃）
    if (!window.navigator.onLine) {
      //断网处理，跳转404页面
      ElMessage.error("网络好像有一点问题哦~");
    } else {
      ElMessage.error("服务器维护中，请稍后再试");
    }
  }
  return Promise.reject(error);
}
// 取消请求
/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
function getPendingKey(config) {
  let { url, method, params, data } = config;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      // catch部分处理表单格式的参数
      data = data;
    }
  } // response里面返回的config.data是个字符串对象
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
function removePending(config, delKey = false) {
  const pendingKey = getPendingKey(config);
  if (delKey) {
    return;
  }
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
// 封装一些统一操作
function myAxios(config, loadingConfig = {}) {
  // 判断是否传参
  if (Object.prototype.toString.call(config) === "[object Object]") {
    const defaultConfig = {
      method: "post",
      type: "json",
    };
    // 参数类型修改请求头并调整参数
    // 根据
    config = Object.assign(defaultConfig, config);
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
            return Qs.stringify(data);
          },
        ];
        break;
      default:
        break;
    }
    if (config.method == "get") {
      config.params = config.data;
    }
    return instance(config);
  }
}
export default myAxios;
