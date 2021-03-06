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
    name: "Wallet",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Wallet.vue")
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Expenses.vue")
  },
  {
    path: "/Categories",
    name: "Categories",
    component: () => import("@/views/Categories.vue")
  },
  {
    path: "/Income",
    name: "Income",
    component: () => import("@/views/Income.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
