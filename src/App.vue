<template>
  <div class="body-box">
    <div>
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
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
