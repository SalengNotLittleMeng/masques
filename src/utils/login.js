import config from '../config/myConfig';
/** 判断用户是否登录
 * @returns {string}
 */
export function isAuthenticated() {
  return !localStorage.getItem(config.tokenName) === '';
}
