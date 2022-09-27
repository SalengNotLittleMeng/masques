/** 对input输入的值进行处理，清除不合规的值
 * @param {string} bind.arg ：定义规则类型；
 */
// 使用方法：
//
export default {
  mounted(el, binding) {
    const _type = binding.arg;
    const types = ['number', 'decimal', 'decimal_2', 'customize'];
    if (!_type || !types.includes(_type)) {
      return console.log(
        `使用v-input指令需要选择特定功能：v-input:type="inputValue";  type = ${types.join('/')}.`
      );
    }
    el.$handler = (el) => {
      switch (_type) {
        // 数字
        case 'number':
          el.value = el.value.replace(/[^\d]/, '');
          break;
        // 数字+小数
        case 'decimal':
          el.value = el.value.replace(/[^\d.]/g, ''); // 清除数字和'.'以外的字符
          el.value = el.value.replace(/\.{2,}/g, '.'); // 连续两个'.', 只保留第一个'.'
          el.value = el.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.'); // 隔着字符, 也保证只有一个'.'
          el.value.indexOf('.') < 0 && el.value !== '' && (el.value = parseFloat(el.value)); // 保证不会出现重复的: 00, 01, 02 ...
          el.value.indexOf('.') > -1 && el.value.length === 1 && (el.value = ''); // 第一位不能以'.'开头
          break;
        // 数字+两位小数
        case 'decimal_2':
          el.value = el.value.replace(/[^\d.]/g, '');
          el.value = el.value.replace(/\.{2,}/g, '.');
          el.value = el.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
          el.value = el.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两位小数
          el.value.indexOf('.') < 0 && el.value !== '' && (el.value = parseFloat(el.value));
          el.value.indexOf('.') > -1 && el.value.length === 1 && (el.value = '');
          break;
        // 自定义, 由data-rule提供规则
        case 'customize':
          const rule = el.dataset.rule && eval(el.dataset.rule); // 字符串正则转正则表达式
          el.value = el.value.replace(rule, '');
          break;
      }
      trigger(el, 'input');
    };
    el.$handler(el);
  },
  beforeUpdate(el) {
    el.$handler && el.$handler(el);
  },
};
// 派发自定义事件
const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};
