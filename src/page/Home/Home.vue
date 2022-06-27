<template>
  <!-- <div v-infinite-scroll="doPost" id="outer">
        <div v-for="item in  arrData" id="innerbox">{{item}}</div>
    </div> -->
  <button @click="doRoute">点我</button>
</template>

<script>
import { Api } from "../../descriptor/Api";
import { Router } from "../../descriptor/Router";
export default {
  data() {
    return {
      direct: "bottom",
      time: 1000,
      arrData: 30,
    };
  },
  mounted() {
    localStorage.setItem("token", "123");
    this.doStore();
  },
  methods: {
    doRoute() {
      // this.doRouter({id:123})
      this.$router.push({ name: "UserInfo" });
      console.log(this.$router);
    },
    @Router({ path: "/UserInfo" })
    doRouter(params) {
      console.log(this.$route);
    },
    doStore() {
      console.log(this.$store.state.moudlesA);
    },
    // params是请求参数，res是回调参数
    // @Api({ module: "homeApi", url: "/toLogin" })
    // doPost(params, res) {
    //   this.resData = res;
    //   console.log(this.resData);
    // },
  },
};
</script>

<style>
img {
  position: relative;
  top: 1000px;
}
#top {
  height: 60px;
  width: 800px;
  /* background: red; */
}
#outer {
  width: 500px;
  height: 500px;
  background: blue;
  overflow: scroll;
}
#innerbox {
  width: 100px;
  height: 30px;
  margin: 32px;
  background: red;
}
</style>
