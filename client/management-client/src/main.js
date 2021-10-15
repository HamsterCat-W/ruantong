import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "@/plugins/element-ui";
import "@/utils/md5.js";
import axiosInstance from "@/utils/axios.js";

Vue.prototype.$request = axiosInstance.request;
Vue.prototype.$axiosInstance = axiosInstance;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
