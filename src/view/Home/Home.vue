<template>
  <div>{{ $store.state.moudlesA.num }}</div>
  <div id="outer" v-infinite-scroll="fun">
    <div v-for="(item, index) in arr">{{ index }}</div>
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
      img: "../Home/Admine/img",
      arr: [1, 2, 3],
    };
  },
  mounted() {
    this.doPost({ email: 123 });
    this.$store.commit("moudlesA/_newbol", false);
    this.doStore();
  },
  computed: {
    getString() {
      console.log(`hello world`);
    },
  },
  methods: {
    fun() {
      this.arr.push("1");
    },
    @Api({ module: "homeApi", url: "/toLogin" })
    doPost(params, res) {
      console.log(res);
    },
    @Store({ module: "moudlesA" })
    doStore(state) {
      this.time = state;
      setTimeout(() => {
        this.time.num = 5;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.test {
  width: 30px;
  .roundClass(30px);
  .ellipsis();
  color: @boder-color;
  background: red;
}
.test-block {
  width: 300px;
  height: 90px;
  margin: 32px;
  background: white;
}
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
  height: 50px;
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
