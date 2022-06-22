 export default {
  mounted(el,binding){
    let timer
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, binding.arg || 1000)
    })
  },
  updated(el,binding){
    let timer
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, binding.arg || 1000)
    })
  }
}