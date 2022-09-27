/** 数组扁平化
 * @param { Array }  arr
 * @returns {Array}
 */
export const deepFlatten = (arr) =>
  [].concat(...arr.map((v) => (Array.isArray(v) ? deepFlatten(v) : v)));
/** 删除不合规的值
 * @param { Array }  arr
 * @param { Function }  func 过滤的方法（返回布尔值）
 * @returns {Array}  arr
 */
export const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) {
    arr = arr.slice(1);
  }
  return arr;
};

/** 返回某个值的全部索引
 * @param { Array }  arr
 * @param { any }  val
 * @returns {Array}  arr
 */
export const indexOfAll = (arr, val) =>
  arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

/** 打乱数组
 * @param { Array }  arr 打乱前的数组
 * @returns {Array}  arr  打乱后的数组
 */
export const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
/** 约等于
 * @param { number }  v1 第一个数据
 * @param { number }  v2 第二个数据
 * @param { number }  epsilon 精度范围，一个小数
 * @returns {boolean}  是否近似相等
 */
export const approximatelyEqual = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon;
/** 某个值出现的次数
 * @param { Array }  arr 数组
 * @param { any }  val 检测的值
 * @returns {number}  值在数组中出现的次数
 */
export const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
