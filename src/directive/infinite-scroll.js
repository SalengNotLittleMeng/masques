import { update } from "lodash";

export default {
  mounted(el, binding) {
    el.addEventListener("scroll", () => {
      const clientHeight = el.clientHeight;
      const scrollTop = Math.round(el.scrollTop);
      const scrollHeight = el.scrollHeight;
      console.log(clientHeight, scrollTop, scrollHeight);
      if (clientHeight + scrollTop === scrollHeight) {
        binding.value?.();
      }
    });
  },
  unmounted(el) {
    // 停止监听工作
    el.el.removeEventListener("scroll", () => {});
  },
};
