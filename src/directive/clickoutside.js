/** 点击添加自定义指令元素以外的地方之后触发事件
 * @param {Function} bind.value ：要触发的函数名,如果不填默认是使添加指令的元素消失
 */
// 调用方式
// 点击其他区域后触发doPost事件
/* <div class="test" v-clickoutside="doPost">hello </div> */
// 点击其他区域后当前元素消失
/* <div class="test" v-clickoutside>hello</div> */
export default {
  beforeMount(el, binding) {
    document.addEventListener(
      'click',
      (e) => {
        if (!el.contains(e.target)) {
          const func =
            binding.value ||
            function () {
              el.style.display = 'none';
            };
          func();
        }
      },
      false
    );
  },
  unmounted() {
    document.removeEventListener('click', () => {});
  },
};
