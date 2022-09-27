import { createStore } from 'vuex';

const ms = require.context('./modules', false, /\.js$/);
const modules = {};

ms.keys().forEach((item) => {
  const name = item.substring(2, item.length - 3);

  modules[name] = ms(item).default;
});
for (const m in modules) {
  const { state, mutations } = modules[m];
  for (const i in state) {
    const nameStr = '_new' + i;
    mutations[nameStr] = function (state, val) {
      state[i] = val;
    };
  }
}
const store = createStore({ modules });

export default store;
