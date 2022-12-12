<template>
  <div>hello: <input type="text" @input="changeValue" :value="modelValue" /></div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$attrs);
  },
  props: ['modelValue'],
  methods: {
    changeValue(e) {
      this.$emit('update:modelValue', e.target.value);
    },
  },
};
</script>

<style></style>
