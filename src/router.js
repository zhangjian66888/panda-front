import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/Home",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/app/Index",
      name: "app-index",
      component: () => import("./views/app/Index.vue")
    },
    {
      path: "/permission/Apply",
      name: "permission-apply",
      component: () => import("./views/permission/Apply.vue")
    },
    {
      path: "/permission/Approval",
      name: "permission-approval",
      component: () => import("./views/permission/Approval.vue")
    },
  ]
});
