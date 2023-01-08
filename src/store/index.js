import { createStore } from 'vuex';
import { importAll } from '@/src/utils/module';
const modules = importAll('./modules', /\.js$/);
for (const m in modules) {
  const { state, mutations } = modules[m];
  for (const i in state) {
    const nameStr = '_new' + i;
    mutations[nameStr] = function (state, val) {
      state[i] = val;
    };
  }
}
const store = createStore({ modules });

export default store;
