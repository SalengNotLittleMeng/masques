<template>
  <div>
    <span v-longpress="uploadImg">hello home</span> <br />
    <input type="file" ref="files" @change="uploadImg" /> <br />
    <button v-debounce:[time]="doPost">点我</button> <br />
    <input v-focus type="text" placeholder="自定义指令" />
    <div
      v-waterMarker="{
        text: 'lzg版权所有',
        textColor: 'rgba(180, 180, 180, 0.4)',
      }"
      id="top"
    ></div>
  </div>
  <!-- <div v-infinite-scroll="doPost" id="outer">
        <div v-for="item in  arrData" id="innerbox">{{item}}</div>
    </div> -->
  <button @click="doPost">点我</button>
</template>

<script>
import homeApi from "../../api/homeApi";
import { Api } from "../../descriptor/Api";
import { log } from "../../descriptor/log";
export default {
  data() {
    return {
      direct: "bottom",
      time: 1000,
      arrData: 30,
    };
  },
  mounted() {
    this.doPost({ email: 3, password: 123 });
  },
  methods: {
    // params是请求参数，res是回调参数
    @Api({ module: "homeApi", url: "/toLogin" })
    doPost(params, res) {
      this.resData = res;
      console.log(this.resData);
    },
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
