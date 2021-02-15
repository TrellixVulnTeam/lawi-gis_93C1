import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/explore",
    name: "Explore",
    component: () => import("../views/ExploreMapView.vue")
  },
  {
    path: "/drawmap",
    name: "DrawMap",
    component: () => import("../views/DrawMapView.vue")
  },
  {
    path: "/grid/:gridId",
    name: "Grid",
    component: () => import("../views/grid/_id/index.vue")
  },
  {
    path: "/user/:userId",
    name: "User",
    component: () => import("../views/user/_id/index.vue")
  },

  {
    path: "/user/:userId/fields",
    name: "UserFields",
    component: () => import("../views/user/_id/fields/index.vue")
  },
  {
    path: "/field/:fieldId",
    name: "Field",
    component: () => import("../views/field/_id/index.vue")
  },
  {
    path: "/testing",
    name: "Testing",
    component: () => import("../views/TestView.vue")
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("../views/errors/notFound.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
