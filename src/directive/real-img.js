    // 判断一个图片是否存在, 注意是异步行为
    function imageIsExist(url) {
      return new Promise(resolve => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
          if(img.complete) {
            resolve(true);
            img = null;
          }
        }
        img.onerror = () => {
          resolve(false);
          img = null;
        }
      })
    }
export default {
  async beforeMount(el, binding) {
    const imgURL = binding.value;
    if (imgURL) {
      const exist = await imageIsExist(imgURL);
      console.log(exist)
      !exist && el.setAttribute('src', imgURL);
    }
  }
}