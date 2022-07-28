import myAxios from "./http";
export default {
  getMsg(params) {
    return myAxios({
      url: "http://localhost:8888/findByName",
      method: "get",
      params: params.data,
      errorText: `这是自定义的错误提示文字，并可以传参${params.errorText}`,
    });
  },
};
