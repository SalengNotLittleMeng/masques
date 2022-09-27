import { MockServe } from '../MockServe';

const tologin = MockServe(
  '/getMessage',
  {
    data: {
      // 生成十个如下格式的数据
      'list|10': [
        {
          'id|+1': 1, // 数字从当前数开始依次 +1
          'age|18-40': 20, // 年龄为18-40之间的随机数字
          'sex|1': ['男', '女'], // 性别是数组中随机的一个
          name: '@cname', // 名字为随机中文名字
          email: '@email', // 随机邮箱
          isShow: '@boolean', // 随机获取boolean值
        },
      ],
    },
  },
  'get'
);
const findByName = MockServe('/findByName', {
  data: {
    // 生成十个如下格式的数据
    'list|10': [
      {
        'id|+1': 1, // 数字从当前数开始依次 +1
        'age|18-40': 20, // 年龄为18-40之间的随机数字
        'sex|1': ['男', '女'], // 性别是数组中随机的一个
        name: '@cname', // 名字为随机中文名字
        email: '@email', // 随机邮箱
        isShow: '@boolean', // 随机获取boolean值
      },
    ],
  },
});
// Mock执行就会拦截，因此暴露出去不是必要的，只要在src/Mock/index.js中遍历过目录，Mock就会执行
export default {
  tologin,
  findByName,
};
