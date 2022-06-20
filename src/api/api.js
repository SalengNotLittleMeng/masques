let ms = require.context("./", false, /\w+Api.js$/);
let modules = {};
ms.keys().forEach((item) => {
  let name = item.substring(2, item.length - 3);
  modules[name] = ms(item).default;
});
export default modules
