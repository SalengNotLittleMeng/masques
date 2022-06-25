function getStyle(el, attr) {
  return el.currentStyle
    ? el.currentStyle[attr]
    : window.getComputedStyle(el, false)[attr];
}
function getScrollWidth() {
  let noScroll,
    scroll,
    oDiv = document.createElement("DIV");
  oDiv.style.cssText =
    "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
  noScroll = document.body.appendChild(oDiv).clientWidth;
  oDiv.style.overflowY = "scroll";
  scroll = oDiv.clientWidth;
  document.body.removeChild(oDiv);
  let isExsit =
    document.body.scrollHeight >
    (window.innerHeight || document.documentElement.clientHeight);
  return isExsit ? noScroll - scroll : 0;
}
export default {
  mounted(el, binding) {
    // 设置目标元素基础属性
    el.style.cursor = "move";
    el.style.position = "fixed";
    // 获取容器宽高
    const containerId = binding.arg || null;
    let containerWidth = window.innerWidth - getScrollWidth();
    let containerHeight = window.innerHeight;
    // 存在父级容器
    if (containerId) {
      const containerEle = document.getElementById(containerId);
      let { width, height } = containerEle.getBoundingClientRect();
      containerWidth = width;
      containerHeight = height;
      if (
        !["fixed", "absolute", "relative"].includes(
          getStyle(containerEle, "position")
        )
      ) {
        containerEle.style.position = "relative";
      }
      el.style.position = "absolute";
    }

    // 鼠标在目标元素上按下
    el.addEventListener("mousedown", (e) => {
      let { width, height } = el.getBoundingClientRect();
      // 当前目标元素的left与top
      const left = el.offsetLeft;
      const top = el.offsetTop;
      // 保存按下的鼠标的X与Y
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      // 计算边界值
      const leftLimit = left;
      const rightLimit = containerWidth - left - width;
      const topLimit = top;
      const bottomLimit = containerHeight - top - height;

      // 监听鼠标移动
      document.onmousemove = (e) => {
        // 鼠标移动的距离
        let disX = e.clientX - mouseX;
        let disY = e.clientY - mouseY;
        // 左右边界
        if (disX < 0 && disX <= -leftLimit) {
          el.style.left = left - leftLimit + "px";
        } else if (disX > 0 && disX >= rightLimit) {
          el.style.left = left + rightLimit + "px";
        } else {
          el.style.left = left + disX + "px";
        }
        // 上下边界
        if (disY < 0 && disY <= -topLimit) {
          el.style.top = top - topLimit + "px";
        } else if (disY > 0 && disY >= bottomLimit) {
          el.style.top = top + bottomLimit + "px";
        } else {
          el.style.top = top + disY + "px";
        }
        binding.value(e);
        return false;
      };

      // 监听鼠标抬起
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    });
  },
};
