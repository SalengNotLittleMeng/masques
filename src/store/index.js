import { createStore } from "vuex";

let ms = require.context("./modules", false, /\.js$/);
let modules = {};

ms.keys().forEach((item) => {
  let name = item.substring(2, item.length - 3);

  modules[name] = ms(item).default;
});
for (let m in modules) {
  let { state, mutations } = modules[m];
  for (let i in state) {
    let nameStr = "_new" + i;
    mutations[nameStr] = function (state, val) {
      state.num = val;
    };
  }
}
const store = createStore({ modules });

export default store;
