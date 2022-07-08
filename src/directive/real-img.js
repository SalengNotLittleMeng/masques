export default {
  async beforeMount(el, binding) {
    useRealImg(el, binding);
  },
  async updated(el, binding) {
    useRealImg(el, binding);
  },
};
async function useRealImg(el, binding) {
  if (binding.value == el.src) {
    return;
  }
  const imgURL = binding.value;
  if (imgURL) {
    const exist = await imageIsExist(imgURL);
    exist && el.setAttribute("src", imgURL);
  }
}
// 判断一个图片是否存在, 注意是异步行为
function imageIsExist(url) {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = url;
    img.onload = () => {
      if (img.complete) {
        resolve(true);
        img = null;
      }
    };
    img.onerror = () => {
      resolve(false);
      img = null;
    };
  });
}
