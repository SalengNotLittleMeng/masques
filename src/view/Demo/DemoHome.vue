<template>
  <div>
    <p>更快，更便捷，开箱即用的Vue脚手架</p>
    <img @click="getData" class="logo-img" src="@/assets/img/logo.png" alt="" />
    <h1>Handy-Vue-Cli</h1>
    <div class="type-main">
      <div class="type-main-item" v-for="item in typeList">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$api.homeApi.getMsg().then((res) => {
      console.log(res);
    });
    console.log('helo');
  },
  methods: {},
  data() {
    return {
      typeList: [
        '对 axios 进行了模块化的二次封装',
        '对动画进行了 promise 封装使其可以进行链式调用',
        '将 iconfoot 封装成了组件，可以通过对组件传参的方式调用',
        '设置了 eachart,element 的全局调用',
        '对 Vuex 进行了模块化处理。',
        'Vue-router 的全局守卫',
        '添加了 Mock 的封装来模拟数据',
        '添加了 less 的全局遍历，公用类，全局混入',
        '添加了常用工具函数',
        '添加了常用注解',
        '添加了常用自定义指令',
        '设置了 prettier 进行代码格式化',
        '设置了 gitHooks 和 commitlint,提交时自动格式化并保证 commit 风格统一',
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.logo-img {
  display: block;
  margin: 30px auto;
}
h1 {
  display: block;
  margin: 0 auto;
  width: 300px;
  text-align: center;
}
p {
  width: 500px;
  margin: 30px auto;
  margin-bottom: 0;
  width: 300px;
  text-align: center;
}
.type-main {
  width: 600px;
  margin: 30px auto;
  text-align: center;
}
.type-main-item {
  line-height: 25px;
  color: #42b983;
}
</style>
