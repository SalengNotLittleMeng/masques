# 脚手架使用文档

vue-cli 版本:4.5.0

本脚手架在 Vue-cli 的基础上增加了如下功能：

- 对 axios 进行了模块化的二次封装
- 对动画进行了 promise 封装使其可以进行链式调用
- 对动画的函数进行封装，可以使用函数的方式代替贝塞尔曲线来确定动画的执行速度曲线
- 将 iconfoot 封装成了组件，可以通过对组件传参的方式调用
- 设置了 less,eachart,element 的全局调用
- 对 Vuex 进行了模块化处理。
- 设置了 prettier 进行代码格式化
- 设置了 gitHooks 和 commitlint,提交时自动格式化并保证 commit 风格统一

## 目录结构

- .husky:处理 githook 的文件夹
- public:ico,index.html 等网页配置相关文件的文件夹
- src：核心代码文件夹

  - animator:对动画的封装，使用时要手动引入这个文件
  - api:axios 封装的文件夹，封装代码在 http.js,最后暴露出来的模块在 api.js,自己写对应的功能时要新建对应的 JS 文件并将接口函数暴露到 api.js 中
  - components:通用组件文件夹，一些整个项目中需要用到的组件放在此处
  - assets:静态文件文件夹，处理图片，iconfoot,svg 等文件，其中 icon 中的 JS 代码是下载的 iconfoot 的 symbol 文件
  - page:页面文件夹，在这个目录下建立自己对应页面的文件夹，在里面写 Vue 文件即可
  - plugins:通用插件文件夹，默认只有 element 的注册使用
  - router：路由文件夹，管理页面的跳转
  - store:vuex 文件夹，统一状态管理，其中 index.js 负责将所有模块暴露，使用时建立一个自己的模块，按 Vuex 的用法使用即可
  - themes:less 通用配置文件夹，在此配置项目的主题色，通用字体大小，字体，通用类。
  - App.vue:Vue 的主组件，进入项目后见到的第一个组件
  - main.js:Vue 的主文件，在此进行 Vue 的通用配置

- babel.config.js:配置使用 babel 进行代码兼容
- commitlint.config.js:配置 git commit 时对提交信息的检测
- vue.config.js；vue 配置文件

## axios 封装

axios 封装的代码在 src/api/http.js 中，主要对请求的拦截器，默认配置，取消请求和错误统一处理进行了封装，如果有生产和开发环境的 baseurl 不同，也可以进行配置，底部的错误码统一处理可以按需配置

axois 进行了模块化划分和自动装配，每个模块开发时新建一个**以Api.js 结尾的文件**（比如 homeApi.js）,先从 http.js 中引入封装好的 axios,然后将对应接口写成函数并暴露出来，在api.js中，会执行模块自动装配，将所有暴露出来的函数按模块放入一个对象并暴露出来

基本用法：

```js
import myAxios from "./http";

function getList(params) {
  return myAxios({
    url: "/toLogin",
    method: "post",
    data: params,
  });
}

export default {
  //在这里导出所有函数
  getList
};
```
其中参数url是必选的，method不填默认为get,data是请求参数，已在内部做了处理，不论get方法还是post方法都只需要传递data即可，如果需要进行文件上传，只需要添加配置type："formData",并将文件放在一个对象中传给data即可
```js
// homeApi.js
    function uploadImg(params) {
  return myAxios({
    url: "/upload",
    method: "post",
    data: params,
    type: "formData",
  });
    // 调用方法
        let img = this.$refs.files.files[0];
      console.log(img);
      this.$api.homeApi.getImg({ file: img, name: "小明" }).then((res) => {
        console.log(res);
      });
}
```
在axios的封装中，会根据参数**type**来添加请求头并作出响应的处理,具体包括：

    * json(默认)： "Content-Type": "application/json",

    * "formData":"Content-Type": "multipart/form-data",
        如果配置了type:"formData",那么参数仍然只需要传递一个params对象即可，封装的内部会将这个对象的所有参数注入到一个FormData对象中并将这个formData对象作为参数发送到后端.
    * "urlencoded":"Content-Type": "application/x-www-form-urlencoded"
        如果配置了form-urlencoded，那么封装的内部会将其序列化

也可以直接在参数内部添加其他请求头，但如果这样做，那么封装的内部不会进行其他处理

myAxios的参数会在处理后直接传给axios，因此你可以在里面添加任何axios合法的配置

```js
    return myAxios({
    url: '/api/login',
    method: 'post',
    data: paramsList,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      (data) => {
        // ...
      }
    ],
  });

```

对axios的封装**默认会取消重复请求**，当浏览器连续发出多个相同的请求时，axios会将那些相同，且还没有到达服务器的请求取消掉，这一行为可以避免服务器收到过多连续的请求，但并不意味着会完全屏蔽短时间内的相同请求，如果用户网络状况良好的话依然会发出连续请求。因此必要时依然要进行节流和防抖处理

如果在一些场合（比如根据用户的输入不断向服务器发出请求，返回提示信息），你需要进行连续重复请求，可以在参数中添加 repeat_request_cancel:false来阻止取消重复请求的行为。
```js
     return myAxios({
    url: "/toLogin",
    method: "post",
    data: params,
    repeat_request_cancel:false
  });
```

axios的封装中包含了对element-ui中loading的封装，可以通过添加loading:true来开启加载动画，在请求开始时渲染加载动画，在请求完成时结束动画
```js
function getList(params) {
  return myAxios({
    url: "/toLogin",
    method: "post",
    data: params,
    loading:true
  });
}
```
如果想对加载动画进行个性化处理，可以对myAxios传入第二个参数，这个参数是一个对象，里面可以添加所有elemnet-ui中loading组件的合法配置,具体可以参考element-plus的配置文档

https://element-plus.org/zh-CN/component/loading.html#%E9%85%8D%E7%BD%AE%E9%A1%B9

```js
    return myAxios(
    {
      url: "/findByName",
      method: "get",
      data: params,
    },
    {
      text: "hello",
    }
  );
```

api.js 这个文件会接收所有模块暴露出来的函数，并将他们统一暴露出去，在 main.js 中，会将 api.js 这个文件作为$api 这个变量引入并挂载到全局。在整个项目中的任意位置无需引入即可使用。

调用示例：

```js
this.$api.homeApi.getmsg({ hi: "vue" }).then(function (res) {
  console.log(res);
});
```

基本格式：this.$api+模块名+接口函数名（传参）+.then 执行回调函数

## Vuex 的模块化处理

本脚手架对 Vuexj 进行了模块化封装，在 src/store/modules 下按照 modulesA.js 的格式建立 JS 文件即可，index.js 会自动解析这个目录下的所有文件并将他们作为模块挂载到 Vuex 上，模块名为 js 文件名。

```js
export default {
  state: {
    num: 12,
  },
  mutations: {
    newNumber(state, val) {
      state.num = val;
    },
  },
  actions: {},
  namespaced: true,
};
```

使用时注意在变量前加上模块名，比如获取 moudlesA 中的 num 变量的值，可以使用：

```js
this.$store.state.moudlesA.num;
```

如果使用 mapState, mapActions 的话，写法为：

```js
    computed: {
    ...mapState({
      num:(state)=>state.moudlesA.num
    })
  },
```

修改值则需要在 commit 中函数名前加上/模块名，例如：

```js
this.$store.commit("moudlesA/newNumber", 5);
```

## iconfoot 的使用

iconfoot 已经被封装成组件并挂载到全局，在任意组件中无需引入即可使用

```js
<icon iconClass="bofang" color="red"></icon>
```

iconClass 是一个必选项，要根据 iconfoot 官网中项目的名字来写,名字前去掉 icon，其余可以传的属性还包括：

color,width,height,cursor

对于 icon 这个组件封装的思路是引入了 iconfoot 上生成的 symbol 代码，因此只能使用项目中的 icon，如果要新增 icon，则要重新生成 symbol 代码并将生成的代码复制到 src/assets/icon/iconfoot.js 中

## 全局组件注册

当涉及全局组件的注册时，要在 src/components/components.js 中引入组件并按照以下方法进行注册

```js
install(app) {
    app.component("icon", icon);
  },
```

## 动画的封装

src/animator/animator.js 这个文件对动画进行了 promise 封装，使其可以进行链式调用，并用 requestAnimationFrame 提升动画性能。封装后的动画可以用函数代替贝塞尔曲线来控制运动

这个函数在使用前需要手动引入文件

第一个参数是动画的持续时间，第二个参数是一个函数，表示每一帧执行的更新事件。

如果函数中的 p 没有使用，第一个参数会失效，动画事件将按照 CSS 的设置来执行，但仍可以进行链式调用

```js
let func = new Animator(500, function (p) {
  document.getElementsByClassName("func")[0].style.opacity = 1;
});
```

如果函数中的参数 p 被使用，那么第一个参数会生效，此时我们可以通过函数来控制动画的轨迹，比如下面这个例子，dom 宽度的变化速率会按照 400 _ p _ (2-p)这个函数进行变化（p 为时间），我们还可以同各国给函数设置常数来确定初始值

```js
let line = new Animator(500, function (p) {
  let ty = 400 * p * (2 - p);
  document.getElementById("hrline").style.width = ty + "px";
});
```

## less 的封装

less 已经被挂载到全局，我们可以在 src/themes/themes.LESS 这个文件里定义一些全局 less 变量，这些变量可以在全局的 less 中被访问

## prettier 格式化

脚手架中已经配置好了 prettier，执行 npm run format 即可将所有 js 和 vue 文件进行格式化，你也可以按照 prettier 的命令，对任意文件进行单独格式化

在 git-hooks 中，prettier 会被执行，确保每一次提交前都完成代码格式化
<<<<<<< HEAD

## gitHooks 与 commitlint

本脚手架的 gitHooks 会在代码提交前，格式化所有代码并使用 commitlint 对提交信息进行检验,如果提交信息非法会拒绝提交代码

commitlint.config.js 这个文件中配置了提交规范，提交信息必须包含配置的内容

为了确保提交信息规范，更建议用 npm run commit 代替 git commit,在 git add .后，使用 npm run commit 命令会自动出现选项界面，选择对应的修改类型并填写信息，commitlint 就可以自动生成符合规范的提交信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/cb79acf8933640c0b6461a87e4d6bde4.png)

# 选项的英文看不懂可以参考 commitlint.config.js 中的注释

## gitHooks 与 commitlint

本脚手架的 gitHooks 会在代码提交前，格式化所有代码并使用 commitlint 对提交信息进行检验,如果提交信息非法会拒绝提交代码

commitlint.config.js 这个文件中配置了提交规范，提交信息必须包含配置的内容

为了确保提交信息规范，更建议用 npm run commit 代替 git commit,在 git add .后，使用 npm run commit 命令会自动出现选项界面，选择对应的修改类型并填写信息，commitlint 就可以自动生成符合规范的提交信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/cb79acf8933640c0b6461a87e4d6bde4.png)

选项的英文看不懂可以参考 commitlint.config.js 中的注释

> > > > > > > 7a70e1764101e38193eecfb19c98bb6c8dac79b4

