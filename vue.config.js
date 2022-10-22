const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, dir);
}
const userProxy = true;
const icon = './favicon.ico';
let config = {
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/themes/themes.less')],
    },
  },
  configureWebpack: (config) => {
    // 配置@为根目录
    config.resolve.alias['@'] = resolve('src');
    config.resolve = {
      ...config.resolve,
      // 指明node_modules的路径
      modules: [path.resolve(__dirname, './node_modules')],
      // 当引入不带后缀名时，仅查询是否存在js和vue文件
      extensions: ['.js', '.vue'],
    };
    config.externals = {
      // 如果有通过cdn引入的库，可以再次忽略此库的打包
    };
    // 兼容使用mjs的第三方库
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';
      // 将每个依赖包打包成单独的js文件
      if (true) {
        config.plugins = [
          ...config.plugins,
          // 开启gizp压缩
          new CompressionPlugin({
            test: /\.js$|\.html$|.\css/, //匹配文件名
            threshold: 10240, //对超过10k的数据压缩
            deleteOriginalAssets: false, //不删除源文件
          }),
        ];
      }
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';
    }
  },
  pwa: {
    iconPaths: {
      favicon32: './favicon.ico',
      favicon16: './favicon.ico',
      appleTouchIcon: './favicon.ico',
      maskIcon: './favicon.ico',
      msTileImage: './favicon.ico',
    },
  },
  devServer: {
    proxy: {
      //配置跨域
      '/api': {
        target: 'http://localhost:8888', //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true, //允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          '^/api': '',
        },
      },
    },
  },
};
if (!userProxy) {
  config.devServer = {};
}
module.exports = config;
