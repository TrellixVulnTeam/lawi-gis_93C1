import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue")
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import("../views/Contact.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
