import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
// echart图标
import * as echarts from 'echarts';
// Element
import ElementPlus from 'element-plus';
// import "element-plus/dist/index.css";
// import './themes/element-theme/index.css'
// less
import less from 'less';
// axios封装
import api from './api/api';
// iconfont组件封装
import './assets/icon/iconfoot';
import component from './components/components';
// 引入字体
// import "./assets/font/font.css";
// 引入自定义指令
import directive from './directive/index';
// 引入mock
import './Mock/index';
const app = createApp(App);
// 将axios的二次封装（api）挂载到全局
app.config.globalProperties.$api = api;
app.config.globalProperties.$echarts = echarts;
// 生产环境下取消警告机制
if (process.env.NODE_ENV === 'production') {
  app.config.warnHandler = () => null;
}
app.use(store).use(router).use(less).use(ElementPlus).use(echarts).use(component).use(directive);
if (document.querySelector('#app').childNodes.length === 0) {
  app.mount('#app');
} else {
  app.mount('#app', false);
}
export default app;
