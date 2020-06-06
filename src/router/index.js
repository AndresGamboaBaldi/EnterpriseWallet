import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Loggin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Loggin",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue")
  },
  {
    path: "/wallet",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Wallet.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
