import icon from './icon-svg.vue';
import checkForm from './checkForm.vue';
export default {
  install(app) {
    // 此处形参为main.js文件中use()方法自动传进来的Vue实例
    app.component('VueIcon', icon);
    app.component('CheckForm', checkForm);
  },
};
