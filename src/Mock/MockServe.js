import Mock from "mockjs";
import config from "../config/myConfig";
import { isRightWebsite } from "../utils/check";
const { baseurl, useMock } = config;
Mock.setup({
  // 设置时延,需要观测数据的变化时可以增大数值
  timeout: "300-600",
});
export function MockServe(url, params, method = "post") {
  if (!useMock) {
    return false;
  }
  let allUrl = isRightWebsite(url) ? url : baseurl + url;
  let baseObject = {
    code: 200,
    message: "成功",
  };
  if (!params.data) {
    const temp = params;
    params = {};
    params.data = temp;
  }
  let ajaxRespose = { ...baseObject, ...params };
  Mock.mock(allUrl, method, ajaxRespose);
  return true;
}
