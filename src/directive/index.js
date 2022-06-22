let ms = require.context("./", false, /\w.js$/);
let modules = {};
ms.keys().forEach((item) => {
  let name = item.substring(2, item.length - 3);
  if(name=='index'){return}
  modules[name] = ms(item).default;
});
export default {
    install:(app)=>{
    for(let item in modules){
        app.directive(item,modules[item])
    }
        }
}