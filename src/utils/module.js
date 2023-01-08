export function importAll(path, regexp, isRecursion = false) {
  const ms = require.context(path, isRecursion, regexp);
  const modules = {};

  ms.keys().forEach((item) => {
    const name = item.substring(2, item.length - 3);

    modules[name] = ms(item).default;
  });
  return modules;
}
