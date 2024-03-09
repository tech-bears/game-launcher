import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import './plugins/element.js'
import store from './store.js'
import {Message} from 'element-ui'
import axios from 'axios'


Vue.config.productionTip = false
Vue.prototype.$message = Message

Vue.use(Router)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
