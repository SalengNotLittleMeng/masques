export default {
  state: {
    num: 12,
  },
  mutations: {
    newNumber(state, val) {
      state.num = val;
    },
  },
  actions: {},
  namespaced: true,
};
