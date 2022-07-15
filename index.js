// 给你两个二进制字符串，返回它们的和（用二进制表示）。

const { split } = require("lodash");

// 输入为 非空 字符串且只包含数字1和0。

// 示例1:

// 输入: a = "11", b = "1"
// 输出: "100"

// 示例2:

// 输入: a = "1010", b = "1011"
// 输出: "10101"

function add(a, b) {
  let arr1 = a.split("");
  let arr2 = b.split("");
  let temp = 0;
  let len = arr1.length > arr2.length ? arr1.length : arr2.length;
  if (arr1.length == len) {
    for (let i = 0; i < len - arr2.length; i++) {
      arr2.unshift(0);
    }
  } else {
    for (let i = 0; i < len - arr1.length; i++) {
      arr1.unshift(0);
    }
  }
  arr1 = arr1.map((item) => {
    return (item = Number(item));
  });
  arr2 = arr2.map((item) => {
    return (item = Number(item));
  });
  let sum = [];
  for (let i = 0; i < len; i++) {
    let a1 = arr1.pop();
    let a2 = arr2.pop();
    let a3 = null;
    if (a1 + a2 + temp > 1) {
      temp = a1 + a2 + temp - 1;
      a3 = 0;
    } else {
      a3 = a1 + a2 + temp;
    }
    console.log(sum);
    sum.unshift(a3);
  }
  if (temp !== 0) {
    sum.unshift(1);
  }
  return sum.join("");
}

console.log(add("11", "1"));
