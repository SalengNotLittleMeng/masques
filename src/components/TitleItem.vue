<template>
  <div>
    <div class="title-box">
      <div class="title-box-before" v-if="hasBefore"></div>
      <div class="title-box-main" :class="{ WhiteLine: hasWhiteLine }">
        <slot></slot>
        <icon
          :iconClass="iconName"
          color="white"
          class="icon-box"
          size="18px"
        ></icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleItem",
  props: {
    iconName: String,
    hasBefore: {
      type: Boolean,
      default: true,
    },
    hasWhiteLine: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.WhiteLine {
  border-top: 2px solid;
}
.icon-box {
  position: relative;
  left: 0;
}
.title-box {
  position: relative;
  display: flex;
  width: 400px * @topx;
  height: 40px * @topx;
  margin-bottom: 3px;
}
.title-box-before {
  width: 7px * @topx;
  height: 35px * @topx;
  margin-right: 5px;
  background: linear-gradient(
    180deg,
    rgba(228, 189, 162, 0.3) 0%,
    #ee995e 100%
  );
  mix-blend-mode: normal;
}
.title-box-main {
  width: 371px * @topx;
  height: 35px * @topx;
  padding-left: 10px;
  background: linear-gradient(
    90deg,
    #ee995e 29.82%,
    rgba(229, 191, 162, 0) 50%
  );
  border-image: linear-gradient(90deg, white 29.82%, rgba(229, 191, 162, 0) 50%)
    1;
  // border-top:2px solid ;
  color: white;
  padding-left: 10px * @topx;
  box-sizing: border-box;
  line-height: 32px * @topx;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 5px;
}
</style>
