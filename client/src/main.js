import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import EventHub from "vue-event-hub";

Vue.use(EventHub);
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
