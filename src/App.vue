<template>
  <div class="body-box">
    <div>
      <input type="file" ref="files" @change="uploadImg" />
      <button @click="doPost">点我</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    // this.$loading()
    this.$api.homeApi.getmsg({ id: 1 }).then((res) => {
      console.log(res);
    });
    this.$api.homeApi
      .getList({ email: "1111", password: "111" })
      .then((res) => {
        console.log(res);
      });
  },
  methods: {
    uploadImg() {
      let img = this.$refs.files.files[0];
      console.log(img);
      this.$api.homeApi.getImg({ file: img, name: "小明" }).then((res) => {
        console.log(res);
      });
    },
    doPost() {
      this.$api.homeApi.getmsg({ id: 1 }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
}
.body-center-box {
  position: absolute;
  width: 1440px;
  height: 100vh;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

a {
  color: black;
  text-decoration: none;
}
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  height: 3px;
}
::-webkit-scrollbar-track {
  height: 3px;
  max-height: 5px;
}
::-webkit-scrollbar-track-piece {
  background-color: transparent;
}
</style>
