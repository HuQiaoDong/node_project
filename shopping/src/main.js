import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/axios";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.prototype.staticUrl = 'http://112.74.45.214:9000'

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
