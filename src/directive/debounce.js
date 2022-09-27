/** 将添加了自定义指令的元素进行防抖
 * @param {Function | string } bind.value ：点击这个元素后调用的方法（进行了防抖处理）
 * @param {number} bind.arg ：防抖的时间参数，默认为1s；
 */
// 使用方法：
//   <div class="test" v-debounce="fun">hello</div>
// 如果要配置防抖时间：
//   <div class="test" v-debounce:3000="fun">hello</div>
export default {
  mounted(el, binding) {
    let timer = null;
    el.addEventListener('click', () => {
      timer && clearTimeout(timer);
      if (!timer) {
        binding.value();
      }
      timer = setTimeout(() => {
        timer = null;
      }, binding.arg || 1000);
    });
  },
};
