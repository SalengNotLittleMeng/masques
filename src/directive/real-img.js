/** 当图片加载失败时使用备用图片作为替代
 * @param {string} bind.value ：备用图片的url
 */
// 使用方法：
//  <img :src="img" v-real-img="'https://www.keaidian.com/uploads/allimg/190424/24110307_23.jpg'" alt=""></img>
export default {
  async beforeMount(el, binding) {
    useRealImg(el, binding);
  },
  async updated(el, binding) {
    useRealImg(el, binding);
  },
};
async function useRealImg(el, binding) {
  if (binding.value === el.src) {
    return;
  }
  const imgURL = binding.value;
  if (imgURL) {
    const exist = await imageIsExist(el.src);
    !exist && el.setAttribute('src', imgURL);
  }
}
// 判断一个图片是否存在, 注意是异步行为；
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
