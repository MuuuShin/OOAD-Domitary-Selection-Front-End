// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue,{ createApp }  from 'vue'
import App from './App'

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import router from './router'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
createApp(App).mount("#app");
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
