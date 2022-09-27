/** 给元素加上水印
 ** 这个指令需要元素具有足够的宽高，否则看起来没有效果
 * @param {object} bind.value ：p配置参数，可以配置字体，字体颜色，水印文字
 */
// 使用方式：
//     <div class="test-block" v-waterMarker="{font:'18px',text:'版权所有',textColor:'rgba(180, 180, 180, 0.9)'}"></div>
export default {
  mounted(el, binding) {
    addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor);
  },
};
function addWaterMarker(str, parentNode, font, textColor) {
  // 水印文字，父元素，字体，文字颜色；
  const can = document.createElement('canvas');
  parentNode.appendChild(can);
  can.width = 200;
  can.height = 150;
  can.style.display = 'none';
  const cans = can.getContext('2d');
  cans.rotate((-20 * Math.PI) / 180);
  cans.font = font || '16px Microsoft JhengHei';
  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)';
  cans.textAlign = 'left';
  cans.textBaseline = 'Middle';
  cans.fillText(str, can.width / 10, can.height / 2);
  parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
}
