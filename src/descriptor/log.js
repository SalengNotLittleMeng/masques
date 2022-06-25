export const log = function () {
  /**
   * @param target 对应 methods 这个对象
   * @param name 对应属性方法的名称
   * @param descriptor 对应属性方法的修饰符
   */

  function isDom(obj) {
    return typeof HTMLElement === "object"
      ? obj instanceof HTMLElement
      : obj &&
          typeof obj === "object" &&
          obj.nodeType === 1 &&
          typeof obj.nodeName === "string";
  }
  return function (target, name, descriptor) {
    console.log(target, name, descriptor);
    const fn = descriptor.value;
    descriptor.value = function (...rest) {
      console.log(this);
      const type = fn.call(this, ...rest);
      if (
        type instanceof Array ||
        Object.prototype.toString.call(type) == "[Object Object]"
      ) {
        console.table(type);
      }
      console.log(isDom(type));
      if (isDom(type)) {
        console.dir(type);
      }
    };
  };
};
