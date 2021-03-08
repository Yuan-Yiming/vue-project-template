import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview'
import '_u/rem'
import '_a/css/reset.css'
import 'iview/dist/styles/iview.css'
import '_c/iview/config/iview.less';

Vue.use(iView)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
