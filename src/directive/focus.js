/** 让元素在进入页面是就进入聚焦状态（主要用于input元素）
 */
export default {
  mounted(el) {
    el.focus();
  },
};
