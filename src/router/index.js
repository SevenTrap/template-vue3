import { createRouter, createWebHashHistory } from "vue-router";
import { getStorage } from "../utils/storage";

import LayoutPage from "../layout/index.vue";
import HomePage from "@/views/HomePage/index.vue";
import AboutPage from "@/views/AboutPage/index.vue";
import LoginPage from "@/views/LoginPage/index.vue";
import ServerList from "@/views/ServerList/index.vue";
import MenuFour from "@/views/MenuFour/index.vue";

const routes = [
  {
    path: "/",
    redirect: "/layout/ServerList",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },

  {
    path: "/layout",
    name: "Layout",
    redirect: "/layout/ServerList",
    component: LayoutPage,
    children: [
      {
        path: "/layout/homepage",
        name: "HomePage",
        component: HomePage,
        meta: {
          label: "数据预览",
          roles: [],
        },
      },
      {
        path: "/layout/aboutpage",
        name: "AboutPage",
        component: AboutPage,
        meta: {
          label: "数据处理进度",
          roles: [],
        },
      },
      {
        path: "/layout/ServerList",
        name: "ServerList",
        component: ServerList,
        meta: {
          label: "服务列表",
          roles: [],
        },
      },
      {
        path: "/layout/menufour",
        name: "MenuFour",
        component: MenuFour,
        meta: {
          label: "菜单四",
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
