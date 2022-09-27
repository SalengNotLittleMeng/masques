// 自动给console添加位置信息
const targetCalleeName = ['log', 'info', 'error', 'debug'].map((item) => `console.${item}`);
const generate = require('@babel/generator').default;
module.exports = function ({ types, template }) {
  console.log(types);
  return {
    // babel插件需要visitor属性来运行
    visitor: {
      CallExpression(path, state) {
        if (path.node.isNew) {
          return;
        }
        const calleeName = generate(path.node.callee).code;
        if (targetCalleeName.includes(calleeName)) {
          const { line, column } = path.node.loc.start;
          const newNode = template.expression(
            `console.log("${state.filename}: (${line}, ${column})")`
          )();
          newNode.isNew = true;
          path.insertBefore(newNode);
        }
      },
    },
  };
};
