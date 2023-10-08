import { createRouter, createWebHistory } from "vue-router";
import RegisterUserView from "../views/RegisterUserView.vue";
import LoginUserView from "../views/LoginUserView.vue";
import RecipeDetailsView from "../views/RecipeDetailsView.vue";
import AboutUsView from "../views/AboutUsView.vue";
import ContactUsView from "../views/ContactUsView.vue";
import AddRecipeView from "../views/AddRecipeView.vue";
import ProfileView from "../views/ProfileView.vue";
import UpdateUserView from "../views/UpdateUserView.vue";
import AddIngredientView from "../views/AddIngredientView.vue";
import AddStepView from "../views/AddStepView.vue";
import RecipesView from "../views/RecipesView.vue";
import UpdateRecipeView from "../views/UpdateRecipeView.vue";
import AddCategoryView from "../views/AddCategoryView.vue";
import CategoryView from "../views/CategoryView.vue";
import RecipesByCategoryView from "../views/RecipesByCategoryView.vue";

import ImageUpload from "../components/ImageUpload.vue";

import { isAuthenticated } from "../utils/auth";

import Home from "../views/Home.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterUserView,
    },
    {
      path: "/updateuser/:id",
      name: "updateuser",
      component: UpdateUserView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginUserView,
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: ProfileView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/recipedetails/:id",
      name: "recipedetails",
      component: RecipeDetailsView,
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
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/updaterecipe/:id",
      name: "updaterecipe",
      component: UpdateRecipeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/addingredient/:recipe_id",
      name: "addingredient",
      component: AddIngredientView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/addcategory",
      name: "addcategory",
      component: AddCategoryView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/addstep/:recipe_id",
      name: "addstep",
      component: AddStepView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/recipes",
      name: "recipes",
      component: RecipesView,
    },
    {
      path: "/recipes/:category_id",
      name: "recipesbycategory",
      component: RecipesByCategoryView,
    },
    {
      path: "/categories",
      name: "categories",
      component: CategoryView,
    },
    {
      path: "/image",
      name: "image",
      component: ImageUpload,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
