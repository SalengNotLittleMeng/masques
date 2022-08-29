const targetCalleeName = ["log", "info", "error", "debug"].map(
  (item) => `console.${item}`
);
const generate = require("@babel/generator").default;
const types = require("@babel/types");
const template = require("@babel/template").default;
const path = require("path");
module.exports = function ({ types, template }) {
  return {
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
