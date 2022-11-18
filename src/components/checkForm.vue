<script>
export default {
  name: 'checkForm',
  abstract: true, //标记为抽象组件
  render() {
    let vnode = this.$slots.default(); // 子组件的vnode 这里只用与包裹一层input组件故取[0]
    return vnode;
  },
};
</script>
