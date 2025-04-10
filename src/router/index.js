import { createRouter, createWebHashHistory } from "vue-router";
import { getStorage } from "../utils/storage";

import LoginPage from "@/views/LoginPage/index.vue";
import LayoutPage from "../layout/index.vue";
import HomePage from "@/views/HomePage/index.vue";
import TemplatePage from "@/views/TemplatePage/index.vue";

const routes = [
  {
    path: "/",
    redirect: "/layout/homePage",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/layout",
    redirect: "/layout/homePage",
    component: LayoutPage,
    children: [
      {
        path: "/layout/homePage",
        name: "HomePage",
        component: HomePage,
        meta: {
          label: "系统首页",
          roles: [],
        },
      },
    ],
  },
  {
    path: "/layout",
    redirect: "/layout/templatePage",
    component: LayoutPage,
    children: [
      {
        path: "/layout/TemplatePage",
        name: "TemplatePage",
        component: TemplatePage,
        meta: {
          label: "模板页面",
          roles: [],
        },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const token = getStorage("token");
  const username = getStorage("username");

  if (to.name === "Login") {
    next();
  } else {
    if (token && username) {
      next();
    } else {
      next({
        path: "/login",
      });
    }
  }
});

router.afterEach((to, from, failure) => {
  console.log(failure);
});

export default router;
