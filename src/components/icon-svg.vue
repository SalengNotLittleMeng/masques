<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
    :style="{
      color: color,
      width: size,
      height: size,
      cursor: pointer ? 'pointer' : 'default',
    }"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "icon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    color: {
      // 字体颜色
      type: String,
      default: "#000",
    },
    size: {
      type: String,
      default: "20px",
    },
    pointer: {
      // 默认不开启鼠标手状
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
  },
};
</script>

<style>
.svg-icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
