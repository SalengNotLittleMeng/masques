<template>
  <div>
    账号：<input type="text" :value="getNumber" /><br />
    密码：<input type="text" v-model="password" />
    <button @click="confirm">按钮</button>
  </div>
</template>

<script>
import check from '../../data/checkForm';
export default {
  mounted() {
    check.add({
      vm: this,
      id: 'name',
      value: 'number',
      callBack: (item) => {
        console.log(item);
      },
    });

    check.add({
      vm: this,
      id: 'pass',
      value: 'password',
      callBack: (item) => {
        console.log(item);
      },
    });
  },
  methods: {
    confirm() {
      check.emit();
    },
  },
  computed: {
    getNumber() {
      // check.update('name',this.number)
      return this.number;
    },
    getPassword: {
      get() {
        return this.password;
      },
      set(val) {
        check.update('pass', this.password);
        this.password = val;
      },
    },
  },
  data() {
    return {
      number: 12,
      password: 122,
    };
  },
};
</script>

<style></style>
