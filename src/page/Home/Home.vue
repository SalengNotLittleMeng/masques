<template>
  <div>
        <span>hello home</span> <br>
              <input type="file" ref="files" @change="uploadImg" /> <br>
      <button @click="doPost">点我</button>
    </div>
</template>

<script>
export default {
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
      this.$api.homeApi.uploadImg({ file: img, name: "小明" }).then((res) => {
        console.log(res);
      });
    },
    doPost() {
      this.$api.homeApi.getmsg({ id: 1 }).then((res) => {
        console.log(res);
      });
    },
  },
}
</script>

<style>

</style>