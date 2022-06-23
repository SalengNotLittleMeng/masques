<template>
  <div>
        <img src="" alt="">
        <span v-longpress="uploadImg">hello home</span> <br>
              <input type="file" ref="files" @change="uploadImg" /> <br>
      <button v-debounce:[time]="uploadImg" >点我</button> <br>
    <input v-focus type="text" placeholder="自定义指令">
    <div   v-waterMarker="{text:'lzg版权所有',textColor:'rgba(180, 180, 180, 0.4)'}" id="top"></div>
    </div>
     <div></div>
</template>

<script>
export default {
    data(){
        return {
            direct:'bottom',
            time:2000
        }
    },
  mounted() {
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
        console.log('hellooo')
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
    /* background: red; */
}
</style>