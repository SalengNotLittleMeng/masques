// // eslint-disabed -file
// import axios from 'axios';
// import { ElMessage } from 'element-plus';
// let baseURL = null;
// switch (process.env.NODE_ENV) {
//   // 生产环境
//   case 'production':
//     baseURL = 'http://localhost:8888/production';
//     break;
//   // 测试环境
//   case 'test':
//     baseURL = 'http://localhost:8888/test';
//     break;
//   // 开发环境
//   default:
//     baseURL = 'http://localhost:8888';
// }
// const instance = axios.create({
//   // 基础路径
//   baseURL,
//   // 请求限时
//   timeout: 5000,
// });

// instance.interceptors.request.use((config) => {
//   const auth = {
//     username: 'admin',
//     password: 'password',
//   };
//   config.auth = auth;
//   const token = localStorage.getItem('__axiosToken__');
//   if (token && typeof window !== 'undefined') {
//     config.headers.Authorization = token;
//   }
//   return config;
// });
// instance.interceptors.response.use(
//   (response) => {
//     // 移除map中的cancelToken
//     removePending(response.config);
//     // 关闭loading
//     const isLoading = response.config.loading;
//     isLoading && closeLoading(isLoading);
//     // if (response.data?.code != 200) {
//     //   ElMessage.error("好像出了一点问题哦~");
//     // }
//     return response.data;
//   },
//   (error) => {
//     const { config, response } = error;
//     config && removePending(config, Boolean(config?.retryTimes));
//     const isLoading = config?.loading;
//     isLoading && closeLoading(isLoading);
//     // 进行重连
//     if (config?.retryTimes) {
//       const { _retryCount = 0, retryDelay = 3000, retryTimes } = config;
//       config._retryCount = _retryCount;
//       if (_retryCount >= retryTimes) {
//         return responseStatus(response, error);
//       }
//       config._retryCount++;
//       // 延时处理
//       const delay = new Promise((resolve) => {
//         setTimeout(() => {
//           console.log(_retryCount);
//           resolve();
//         }, retryDelay);
//       });
//       // 重新发起请求
//       delay.then(function () {
//         return instance(config);
//       });
//     }
//     return responseStatus(response, error);
//   }
// );
// function responseStatus(response, error) {
//   let { errorText } = error?.config;
//   let errorTextDefault = '';
//   if (response) {
//     // 请求不成功但返回结果
//     switch (response.status) {
//       case 401:
//         errorTextDefault = '请先登录哦~';
//         break;
//       case 403:
//         errorTextDefault = '登录信息已过期~';
//         break;
//       case 404:
//         errorTextDefault = '没有找到信息';
//         break;
//       case 500:
//         errorTextDefault = '服务器好像有点忙碌哦';
//         break;
//       default:
//         errorTextDefault = '好像有点问题哦';
//     }
//     errorText = errorText ? errorText : errorTextDefault;
//     ElMessage.error(errorText);
//   } else {
//     // 服务器完全没有返回结果（网络问题或服务器崩溃）
//     if (!window.navigator.onLine) {
//       // 断网处理，跳转404页面
//       ElMessage.error('网络好像有一点问题哦~');
//     }
//   }
//   return Promise.reject(error);
// }
// function myAxios(config) {
//   if (Object.prototype.toString.call(config) === '[object Object]') {
//     return instance(config);
//   }
//   return;
// }
// export default myAxios;
