<template>
  <div class="body-box">
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      a: 1,
    };
  },
};
</script>

<style></style>
