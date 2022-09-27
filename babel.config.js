const insertLogMessagePlugin = require('./src/babel/log');
const path = require('path');
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // entry，usage
        corejs: 3,
      },
    ],
  ],
  //   plugins: [insertLogMessagePlugin],
};
