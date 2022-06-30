// 首字母大写
const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join("");
// 每个单词的首字母大写
const capitalizeEveryWord = (str) =>
  str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
