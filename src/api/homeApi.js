import myAxios from "./http";

function uploadImg(params) {
  return myAxios({
    url: "/upload",
    method: "post",
    data: params,
    type: "formData",
  });
}

function getMsg(params) {
  return myAxios({
    url: "/findByName",
    method: "post",
    data: params,
  });
}

function getList(params) {
  return myAxios({
    url: "/toLogin",
    method: "post",
    data: params,
    retryTimes: 3,
    repeat_request_cancel: false,
  });
}
function findPage(params) {
  //params是pagesize和pagenum
  return myAxios("/message/findPage", { params });
}

export default {
  //在这里导出所有函数
  uploadImg,
  getMsg,
  getList,
  findPage,
};
