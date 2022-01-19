import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/views/Home")
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("@/views/Login")
  },
  {
    name: "RegisterPage",
    path: "/register",
    component: () => import("@/views/Register")
  },
  {
    name: "ListPage",
    path: "/list",
    component: () => import("@/views/List")
  },
  {
    name: "SettingsPage",
    path: "/settings",
    component: () => import("@/views/Settings")
  },
  {
    name: "FastTypingPage",
    path: "/fasttyping",
    component: () => import("@/views/FastTyping")
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to, _, next) => {
  const authRequiredRoutes = ["HomePage", "ListPage", "SettingsPage", "FastTypingPage"];
  const authNotRequiredRoutes = ["LoginPage", "RegisterPage"];
  const _isAuthenticated = store.getters._isAuthenticated;

  if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false);

  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (_isAuthenticated) next();
    else next({ name: "LoginPage" });
  } else {
    next();
  }
});

export default router;