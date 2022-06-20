// 这个模块管理卡尺组件的索引(每次变化的状态索引)以及相关联的颜色参数
export default {
  state: {
    index: 0,
    activeColor: false,
  },
  mutations: {
    indexChange(state, val) {
      if (val || val == 0) {
        state.index = val;
        return;
      }
      state.index = state.index == 3 ? 0 : ++state.index;
    },
    colorChange(state, val) {
      state.activeColor = val;
    },
  },
  actions: {},
  namespaced: true,
};
