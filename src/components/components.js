import icon from "./icon-svg.vue";
import TitleItem from "./TitleItem.vue";
export default {
  install(app) {
    // 此处形参为main.js文件中use()方法自动传进来的Vue实例
    app.component("icon", icon);
    app.component("TitleItem", TitleItem);
  },
};
