<template>
  <div class="bg-image bg-cover bg-opacity-50 bg-center bg-fixed py-0 mt-18">
    <div>
      <div class="w-full h-96 bg-gray-700 opacity-50"></div>
      <div
        class="overlay absolute inset-0 flex flex-col items-center justify-center text-white p-8"
      >
        <h1 class="text-4xl font-bold mb-4">Special Food Recipes</h1>
        <p class="text-3xl mb-10">Explore our latest food recipes</p>
        <div class="w-full h-20"></div>
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
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 py-5 md:px-20 gap-5"
        >
          <RecipeCard
            v-for="recipe in recipeList"
            :key="recipe.id"
            :recipe="recipe"
          />
        </div>

        <div class="flex items-center justify-center my-6">
          <div
            class="flex flex-col md:flex-row items-center shadow-lg rounded-lg"
          >
            <div class="h-full p-10">
              <router-link to="/">
                <img
                  src="../assets/images/habeshan.png"
                  class="h-full rounded-full p-2 transition-transform duration-300 hover:scale-110 m-5"
                  alt=""
                />
              </router-link>
            </div>
            <div class="rounded-lg p-10 ml-4">
              <h2 class="text-xl font-bold mb-4">Habesha Meat (Tibs)</h2>
              <h3 class="text-lg font-semibold mb-2">Ingredients:</h3>
              <ul class="text-lg">
                <li>1 pound of beef or lamb, cubed</li>
                <li>2 tablespoons of clarified butter or oil</li>
                <li>1 onion, thinly sliced</li>
                <li>2 cloves of garlic, minced</li>
                <li>1 teaspoon of berbere spice</li>
                <li>Salt and pepper to taste</li>
              </ul>
              <h3 class="text-lg font-semibold mb-2">Steps:</h3>
              <ol>
                <li>
                  Heat the butter or oil in a large skillet over medium heat.
                </li>
                <li>
                  Add the sliced onions and minced garlic, and sauté until
                  golden brown.
                </li>
                <li>Add the cubed meat and cook until browned on all sides.</li>
                <li>
                  Sprinkle the berbere spice, salt, and pepper over the meat,
                  and stir well to coat.
                </li>
                <li>
                  Cover the skillet and simmer for about 30 minutes, or until
                  the meat is tender.
                </li>
                <li>Serve hot with injera or rice.</li>
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
import { GET_RECIPES } from "../api/graphql";
import { ref, watchEffect, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const { result } = useQuery(GET_RECIPES);
const recipeList = ref([]);

watchEffect(() => {
  if (result.value) {
    try {
      const recipes = result.value?.recipe;
      recipeList.value = recipes.slice(0, 3);
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
