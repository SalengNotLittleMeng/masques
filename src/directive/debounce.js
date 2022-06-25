export default {
  mounted(el, binding) {
    let timer = null;
    el.addEventListener("click", () => {
      if (!timer) {
        binding.value();
      }
      timer = setTimeout(() => {
        timer = null;
      }, binding.arg || 1000);
      clearTimeout(timer);
    });
  },
  updated(el, binding) {
    let timer = null;
    el.addEventListener("click", () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        binding.value();
      }, binding.arg || 1000);
    });
  },
};
