export default class FormCheck {
  constructor(options = {}) {
    this.allCallBack = options.allCallBack || function () {};
    this.errorCallBack = options.errorCallBack || function () {};
    this.callBack = options.callBack || function () {};
    this.eventList = [];
    this.map = new Map();
  }
  watch(vm, key, id) {
    if (!vm.$watch) {
      return;
    }
    console.log(key);
    vm.$watch(
      () => vm[`${key}`],
      (newVal) => {
        this.update(id, newVal);
      },
      { deep: true }
    );
  }
  getValue(vm, key) {
    return vm[key];
  }
  add(options) {
    const { vm, value, id, check, callBack, required = true } = options;
    if (!id) {
      id = value;
    }
    options.value = this.getValue(vm, value);
    this.watch(vm, value, id);
    if (!this.map.has(id)) {
      this.eventList.push(options);
    } else {
      this.eventList[this.eventList.findIndex((item) => item.id == id)] = options;
    }
    this.map.set(id, options);
  }
  update(id, value) {
    if (!this.map.has(id)) {
      return;
    }
    this.eventList[
      this.eventList.findIndex((item) => {
        return item.id == id;
      })
    ].value = value;
    let options = this.eventList[this.eventList.findIndex((item) => item.id == id)];
    this.map.set(id, options);
  }
  setCallBack(resolve, reject, cb) {
    this.allCallBack = resolve || this.allCallBack || function () {};
    this.errorCallBack = reject || this.errorCallBack || function () {};
    this.callBack = cb || options.callBack || function () {};
  }
  emit() {
    let flag = true;
    let result = [];
    let lastError = null;
    this.eventList.forEach((item) => {
      let { value, check, callBack, required } = item;
      if (!check instanceof Function) {
        throw Error('check shouled be a function');
      }
      if (!check) {
        check = function (value) {
          return value !== '';
        };
      }
      let boolean = check(value);
      callBack.call(this, item, boolean);
      if (!boolean && required) {
        flag ? (lastError = item) : null;
        flag = false;
      }
      result.push(item);
    });
    if (flag) {
      this.allCallBack.call(this, result);
    } else {
      this.errorCallBack.call(this, lastError);
    }
    this.callBack.call(this, result);
  }
  init(value) {}
}
