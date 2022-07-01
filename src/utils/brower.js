/**获取当前url
 * @returns {string}  当前url
 */
export const currentURL = () => window.location.href;

/**当前浏览器可视范围高度
 * @returns {number}  当前浏览器可视范围高度
 */
export function getClientHeight() {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }
  return clientHeight;
}
/**当前浏览器可视范围宽度
 * @returns {number}  当前浏览器可视范围宽度
 */
export function getPageViewWidth() {
  let d = document,
    a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
  return a.clientWidth;
}
/**开启全屏
 * @param {*} element
 */
export function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}
/**关闭全屏
 */
export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**返回滚动条位置
 * @param {document} element
 * @returns {object}  当前x轴和y轴滚动条的位置
 */
export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});
/**滚动到某一位置
 * @param {document} element
 * @returns {object}  当前x轴和y轴滚动条的位置
 */
export const smoothScroll = (element) => {
  document.querySelector(element).scrollIntoView({
    behavior: "smooth",
  });
};
/**滚动到页面顶部
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

/**判断平台是android还是ios
 * @returns {string} 平台名称
 */
export function getOSType() {
  let u = navigator.userAgent,
    app = navigator.appVersion;
  let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) {
    return "ios";
  }
  if (isAndroid) {
    return "android";
  }
  return "other";
}
