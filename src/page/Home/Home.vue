<template>
  <div>
        <span>hello home</span> <br>
              <input type="file" ref="files" @change="uploadImg" /> <br>
      <button >点我</button> <br>
    <input v-focus type="text" placeholder="自定义指令">
    <div v-fixed:[direct]="100" id="top"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            direct:'bottom'
        }
    },
  mounted() {
    console.log('hello')
    // this.$loading()
    // this.$api.homeApi.getmsg({ id: 1 }).then((res) => {
    //   console.log(res);
    // });
    // this.$api.homeApi
    //   .getList({ email: "1111", password: "111" })
    //   .then((res) => {
    //     console.log(res);
    //   });
  },
  methods: {
    uploadImg() {
    //   let img = this.$refs.files.files[0];
    //   console.log(img);
    //   this.$api.homeApi.uploadImg({ file: img, name: "小明" }).then((res) => {
    //     console.log(res);
    //   });
    },
    doPost() {
    //   this.$api.homeApi.getmsg({ id: 1 }).then((res) => {
    //     console.log(res);
    //   });
    },
  },
}
</script>

<style>
#top{
    height: 60px;
    width: 800px;
    background: red;
}
</style>