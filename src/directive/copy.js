/** 点击添加自定义指令的元素后复制参数中的值到剪贴板
 * @param {Function | string } bind.value ：要复制到剪贴板的内容，可以是一段文字，也可以是methods或computed；
 * @param {Function} bind.arg ：复制成功后调用的方法
 */
// 调用方式
// 直接复制文字
// <div class="test" v-copy="'12345'">hello</div>
// 利用computed
//  <div class="test" v-copy="getString">hello</div>
//   computed:{
//     getString(){
//         return `hello ${this.direct}`
//     }
//   }
// 复制成功后的回调函数（可选）
// <div class="test" v-copy:[fun]="getString">hello</div>
// fun(text){
//  复制成功后的回调函数有一个参数text，这个参数表示复制的文本内容
//     console.log(text)
// }
export default {
  beforeMount(el, binding) {
    el.targetContent = binding.value;
    el.addEventListener('click', () => {
      if (!el.targetContent) {
        return console.warn('没有需要复制的目标内容');
      }
      // 创建textarea标签
      const textarea = document.createElement('textarea');
      // 设置相关属性
      textarea.readOnly = 'readonly';
      textarea.style.position = 'fixed';
      textarea.style.top = '-99999px';
      // 把目标内容赋值给它的value属性
      textarea.value = el.targetContent;
      // 插入到页面
      document.body.appendChild(textarea);
      // 调用onselect()方法
      textarea.select();
      // 把目标内容复制进剪贴板, 该API会返回一个Boolean
      const res = document.execCommand('Copy');
      const success = binding.arg;
      res && success ? success(el.targetContent) : console.log('复制内容：' + el.targetContent);
      // 移除textarea标签
      document.body.removeChild(textarea);
    });
  },
  updated(el, binding) {
    // 实时更新最新的目标内容
    el.targetContent = binding.value;
  },
  unmounted(el) {
    el.removeEventListener('click', () => {});
  },
};
