import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

// 引入uView提供的对vuex的简写法文件
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

import store from '@/store';
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif