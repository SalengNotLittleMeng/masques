import myAxios from "./http";

function uploadImg(params) {
  return myAxios({
    url: "/upload",
    method: "post",
    data: params,
    type: "formData",
  });
}

function getmsg(params) {
  return myAxios(
    {
      url: "/findByName",
      method: "get",
      data: params,
    },
    {
      text: "hello",
    }
  );
}

function getList(params) {
  return myAxios({
    url: "/toLogin",
    method: "post",
    data: params,
  });
}
function findPage(params) {
  //params是pagesize和pagenum
  return myAxios("/message/findPage", { params });
}

export default {
  //在这里导出所有函数
  uploadImg,
  getmsg,
  getList,
  findPage,
};
