/**验证不能包含字母
 * @param { string } value
 * @returns {boolean}
 */
export const isNoWord = (value) => /^[^A-Za-z]*$/g.test(value);
/**验证邮政编码
 * @param { string } value
 * @returns {boolean}
 */
export const isPostcode = (value) =>
  /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(
    value
  );
/**验证微信号
 * @param { string } value
 * @returns {boolean}
 */
export const isWeChatNum = (value) =>
  /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/g.test(value);
/**验证16进制颜色
 * @param { string } value
 * @returns {boolean}
 */
export const isColor16 = (value) =>
  /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(value);
/**验证网址
 *  @param { string } value
 * @returns {boolean}
 */
export const isRightWebsite = (value) =>
  /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(
    value
  );
/**验证文件夹路径（window）
 *  @param { string } value
 * @returns {boolean}
 */
export const isWindowsFolderPath = (value) =>
  /^[a-zA-Z]:\\(?:\w+\\?)*$/g.test(value);

/**验证window下"文件"路径
 *  @param { string } value
 * @returns {boolean}
 */
export const isWindowsFilePath = (value) =>
  /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/g.test(value);
/**
验证图片链接地址（图片格式可按需增删）
 *  @param { string } value
* @returns {boolean} 
 */
export const isImageUrl = (value) =>
  /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(
    value
  );

/**验证中文姓名
 * @param { string } value
 * @returns {boolean}
 */
export const isChineseName = (value) =>
  /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value);
/**验证英文姓名
 * @param { string } value
 * @returns {boolean}
 */
export const isEnglishName = (value) =>
  /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value);
/**验证手机号（中国）
 * @param { string } value
 * @returns {boolean}
 */
export const isMPRelaxed = (value) =>
  /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value);
/**验证邮箱
 * @param { string } value
 * @returns {boolean}
 */
export const isEmail = (value) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(
    value
  );
/**验证QQ号
 * @param { string } value
 * @returns {boolean}
 */
export const isQQNum = (value) => /^[1-9][0-9]{4,10}$/g.test(value);
