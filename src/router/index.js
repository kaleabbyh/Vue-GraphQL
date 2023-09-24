import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddUserView from "../views/AddUserView.vue";
import RegisterUserView from "../views/RegisterUserView.vue";
import LoginUserView from "../views/LoginUserView.vue";
import RecipeDetailsView from "../views/RecipeDetailsView.vue";
import AboutUsView from "../views/AboutUsView.vue";
import ContactUsView from "../views/ContactUsView.vue";
import AddRecipeView from "../views/AddRecipeView.vue";
import ProfileView from "../views/ProfileView.vue";
import Home from "../views/Home.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "homeview",
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
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/recipedetails/:id",
      name: "recipedetails",
      component: RecipeDetailsView,
    },
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/aboutus",
      name: "about",
      component: AboutUsView,
    },
    {
      path: "/contactus",
      name: "contact",
      component: ContactUsView,
    },
    {
      path: "/addrecipe",
      name: "addrecipe",
      component: AddRecipeView,
    },
  ],
});

export default router;
