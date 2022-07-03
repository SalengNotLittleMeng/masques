export default {
  state: {
    num: 12,
    bol: true,
  },
  mutations: {
    newNumber(state, val) {
      state.num = val;
    },
  },
  actions: {},
  namespaced: true,
};
