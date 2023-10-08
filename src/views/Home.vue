<template>
  <div class="bg-image bg-cover bg-opacity-50 bg-center bg-fixed py-0 mt-18">
    <div>
      <div class="w-full h-96 bg-gray-900 opacity-60"></div>
      <div class="w-full h-56 bg-gray-900 opacity-60"></div>
      <div
        class="overlay absolute inset-0 flex flex-col items-center justify-center text-white p-8"
      >
        <h1 class="text-4xl font-bold mt-20 mb-4">Special Food Recipes</h1>
        <p class="text-3xl mb-20">Explore our latest food recipes</p>
        <div
          class="w-full mt-20 sm:gap-2 md:gap-10 flex flex-row items-center justify-center"
        >
          <div
            v-for="category in categoryList"
            :key="category.id"
            class="rounded-full flex-col flex items-center sm:gap-1 md:gap-4 mx-2 justify-center"
          >
            <router-link
              :to="`/recipes/${category.id}`"
              class="rounded-full flex-col flex items-center gap-0 sm:gap-1 md:gap-4 justify-center"
            >
              <div
                class="rounded-full transition-transform duration-300 hover:scale-110 border-4 border-white border-solid bg-indigo-800 h-8 w-8 sm:w-12 sm:h-12 md:w-20 md:h-20 flex items-center justify-center"
              >
                <img
                  :src="category.image"
                  alt="Category Icon"
                  class="rounded-full"
                />
              </div>
              <h1
                class="text-center text-lg transition-transform duration-300 hover:scale-110"
              >
                {{ category.name.slice(0, 10) }}
              </h1>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="relative" style="z-index: 1; overflow-y: scroll">
      <div class="bg-gray-100 p-10 bg-opacity-90">
        <h1 class="text-3xl font-bold mb-4 flex items-center justify-center">
          Welcome to KRecipes
        </h1>
        <p class="text-gray-600 mb-8 flex items-center justify-center">
          Discover our latest recipes for every occasion
        </p>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-5 py-5 md:px-20 gap-5"
        >
          <RecipeCard
            v-for="recipe in recipeList"
            :key="recipe.id"
            :recipe="recipe"
          />
        </div>
        <div
          class="border shadow-md rounded-md flex flex-col items-center justify-center text-gray-900 p-8"
        >
          <p class="text-3xl my-2 font-bold capitalize">
            {{ recipeList[0]?.title }} recipe
          </p>
        </div>
        <div class="flex items-center justify-center mb-6">
          <div
            class="flex flex-col md:flex-row items-center shadow-lg rounded-lg"
          >
            <div class="h-full p-10">
              <router-link to="/">
                <img
                  :src="recipeList[0]?.image1"
                  class="h-full rounded-lg p-2 transition-transform duration-300 hover:scale-110 m-5"
                  alt=""
                />
              </router-link>
            </div>
            <div class="rounded-lg p-10 ml-4">
              <h2 class="text-xl font-bold mb-4">
                {{ recipeList[0]?.title }} Recipe
              </h2>
              <h3 class="text-lg font-semibold mb-2">Ingredients:</h3>
              <ul class="text-lg max-w-md">
                <li v-for="ingredient in ingredients" :key="ingredient?.id">
                  {{ ingredient?.amount }} {{ ingredient?.name }}
                </li>
              </ul>
              <h3 class="text-lg font-semibold mb-2 mt-4">Steps:</h3>
              <ol>
                <ul class="text-lg max-w-md">
                  <li v-for="step in steps" :key="step?.id">
                    {{ step?.description }}
                  </li>
                </ul>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RecipeCard from "../components/RecipeCard.vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_RECIPES, GET_CATEGORIES } from "../api/graphql";
import { ref, watchEffect, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const { result } = useQuery(GET_RECIPES);
const { result: categories } = useQuery(GET_CATEGORIES);
const recipeList = ref([]);
const categoryList = ref([]);
const steps = ref([]);
const ingredients = ref([]);

watchEffect(() => {
  if (result.value) {
    try {
      const recipes = result.value?.recipe;
      recipeList.value = recipes.slice(0, 3);

      steps.value = recipeList.value[0].steps;
      ingredients.value = recipeList.value[0].ingredients;
      console.log(ingredients.value);

      const allCategories = categories?.value?.category;
      categoryList.value = allCategories.slice(0, 4);
    } catch (error) {
      console.error("Error retrieving Recipes:", error);
    }
  }
});

watch(
  () => route,
  () => {
    window.location.reload();
  }
);
</script>

<style scoped>
.bg-image {
  background-image: url("@/assets/images/food2.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
