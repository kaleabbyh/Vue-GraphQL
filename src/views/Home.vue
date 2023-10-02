<template>
  <div class="bg-image bg-cover bg-opacity-50 bg-center bg-fixed py-0 mt-20">
    <div>
      <div class="w-full h-96"></div>
      <div
        class="overlay absolute inset-0 flex flex-col items-center justify-center text-white p-8"
      >
        <h1 class="text-4xl font-bold mb-4">Special Foods Recipes</h1>
        <p class="text-3xl">Explore our latest food recipes</p>
      </div>
    </div>

    <div class="relative" style="z-index: 1; overflow-y: scroll">
      <div class="bg-gray-100 py-5">
     
          <h1 class="text-3xl font-bold mb-4 flex items-center justify-center">
            Welcome to KRecipes
          </h1>
          <p class="text-gray-600 mb-8 flex items-center justify-center">
            Discover delicious recipes for every occasion
          </p>

          <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 py-5 md:px-20  gap-5"
          >
            <RecipeCard
              v-for="recipe in recipeList"
              :key="recipe.id"
              :recipe="recipe"
            />
          </div>
       
      </div>
    </div>
  </div>
</template>

<script setup>
import RecipeCard from "../components/RecipeCard.vue";
import { watchEffect, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_RECIPES } from "../api/graphql";

const { result } = useQuery(GET_RECIPES);
const recipeList = ref([]);

watchEffect(() => {
  if (result.value) {
    try {
      recipeList.value = result.value?.recipe;
    } catch (error) {
      console.error("Error retrieving Recipes:", error);
    }
  }
});
</script>

<style scoped>
.bg-image {
  background-image: url("@/assets/images/food2.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
