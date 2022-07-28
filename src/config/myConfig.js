const config = {
  // 存入本地的token名
  tokenName: "token",
  //请求头上验证的token名（后端提供）
  headerToken: "Authorization",
  // 基本地址
  baseurl: "http://localhost:8888",
  //  是否启用mock模拟数据
  useMock: true,
  // 是否启用路由拦截
  useBeforeEach: false,
  auth: {
    username: "testeradmin",
    password: "testerpassword",
  },
};
export default config;
