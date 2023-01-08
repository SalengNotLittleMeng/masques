export function importAll(modulesMessage) {
  const modules = {};
  modulesMessage.keys().forEach((item) => {
    const name = item.substring(2, item.length - 3);

    modules[name] = modulesMessage(item).default;
  });
  return modules;
}
