import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddUserView from "../views/AddUserView.vue";
import RegisterUserView from "../views/RegisterUserView.vue";
import LoginUserView from "../views/LoginUserView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/adduser",
      name: "adduser",
      component: AddUserView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterUserView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginUserView,
    },
  ],
});

export default router;
