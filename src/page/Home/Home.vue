<template>
  <!-- <div v-infinite-scroll="doPost" id="outer">
        <div v-for="item in  arrData" id="innerbox">{{item}}</div>
    </div> -->
  <!-- <button @click="doStore">登录</button> -->
  <!-- <div v-for="typeItem in typeAll">
        <span  v-for="(Item,index) in typeItem">{{Item}}{{typeItem.length-1==index?"":"/"}}</span>
    </div> -->
  <div>hello</div>
</template>

<script>
import { Api } from "../../descriptor/Api";
import { Router } from "../../descriptor/Router";
import { Store } from "../../descriptor/Store";
export default {
  data() {
    return {
      direct: "bottom",
      time: 1000,
      arrData: 30,
      typeAll: [
        ["电子", "美容", "电子"],
        ["电子", "美容", "电子", "美容"],
        ["电子", "美容", "电子", "美容"],
        ["电子", "美容", "电子", "美容"],
      ],
    };
  },
  mounted() {
    this.$api.homeApi.getList({ email: 123 }).then((res) => {
      console.log(res);
    });
  },
  methods: {},
};
</script>

<style>
.drop-box {
  width: 100px;
  height: 30px;
  margin: 32px;
  background: red;
}
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
