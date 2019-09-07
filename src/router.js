import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/User",
      name: "user",
      component: () => import("./views/user/Index.vue")
    },
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
      path: "/resource/Apply",
      name: "resource-apply",
      component: () => import("./views/resource/Apply.vue")
    },
    {
      path: "/apply/Index",
      name: "apply-index",
      component: () => import("./views/apply/Index.vue")
    },
    {
      path: "/approval/Index",
      name: "approval-index",
      component: () => import("./views/approval/Index.vue")
    },
  ]
});
