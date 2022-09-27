const ms = require.context('./', false, /\w.js$/);
const modules = {};
ms.keys().forEach((item) => {
  const name = item.substring(2, item.length - 3);
  if (name === 'index') {
    return;
  }
  modules[name] = ms(item).default;
});
export default {
  install: (app) => {
    for (const item in modules) {
      app.directive(item, modules[item]);
    }
  },
};
