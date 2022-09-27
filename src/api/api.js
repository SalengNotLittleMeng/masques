const ms = require.context('./', false, /\w+Api.js$/);
const modules = {};
ms.keys().forEach((item) => {
  const name = item.substring(2, item.length - 3);
  modules[name] = ms(item).default;
});
export default modules;
