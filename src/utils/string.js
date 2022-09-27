/** 首字母大写
 * @param { string } str 待处理字符串
 */
export const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');
/** 每个单词的首字母大写
 * @param { string } str 待处理字符串
 */
export const capitalizeEveryWord = (str) => str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
/** 去除空格
 * @param { string } str 待处理字符串
 * @param  { number } type 去除空格类型 1-所有空格  2-前后空格  3-前空格 4-后空格 默认为1
 */
export function trim(str, type = 1) {
  if (type && type !== 1 && type !== 2 && type !== 3 && type !== 4) {
    return;
  }
  switch (type) {
    case 1:
      return str.replace(/\s/g, '');
    case 2:
      return str.replace(/(^\s)|(\s*$)/g, '');
    case 3:
      return str.replace(/(^\s)/g, '');
    case 4:
      return str.replace(/(\s$)/g, '');
    default:
      return str;
  }
}
