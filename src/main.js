import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Panel from '@/components/Panel.vue';
import Divider from '@/components/Divider.vue';


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component('pf-panel', Panel);
Vue.component('pf-divider', Divider);

router.beforeEach((to, from, next) => {
  if (to.path != "/" && to.path != "/Home" && !store.state.accessToken) {
    console.log("to.path", to.path)
    location.href = '/';
    return;
  }
  next();
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
