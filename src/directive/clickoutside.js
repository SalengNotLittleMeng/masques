export default {
  beforeMount(el, binding) {
    document.addEventListener(
      "click",
      (e) => {
        !el.contains(e.target) && binding.value();
      },
      false
    );
  },
  unmounted() {
    document.removeEventListener("click", () => {});
  },
};
