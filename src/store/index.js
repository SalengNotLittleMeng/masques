import { createStore } from "vuex";

let ms = require.context("./modules", false, /\.js$/);
let modules = {};
ms.keys().forEach((item) => {
  let name = item.substring(2, item.length - 3);
  modules[name] = ms(item).default;
});
const store = createStore({
  modules,
});

export default store;
