<template>
  <!-- <div v-infinite-scroll="doPost" id="outer">
        <div v-for="item in  arrData" id="innerbox">{{item}}</div>
    </div> -->
  <!-- <button @click="doStore">登录</button> -->
  <!-- <div v-for="typeItem in typeAll">
        <span  v-for="(Item,index) in typeItem">{{Item}}{{typeItem.length-1==index?"":"/"}}</span>
    </div> -->
  <div>
    <div v-draggble class="drop-box"></div>
  </div>
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
    //    this.doPost({email:"3094969938@qq.com",password:12345})
  },
  methods: {
    // @Router({ path: "/UserInfo" })
    // doRouter(params) {},
    // @Store({module:"moudlesA"})
    // doStore(store){
    //   store.num=this.resData
    // },
    // // params是请求参数，res是回调参数
    // @Api({ module: "homeApi", url: "/toLogin" })
    doPost(params, res) {
      console.log("a");
      //   this.resData = res;
      //   doStore();
      //   doRouter()
    },
  },
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
