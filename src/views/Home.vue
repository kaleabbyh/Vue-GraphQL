<template>
  <div class="mt-20 pt-2">
    <img
      src="../assets/images/food.png"
      alt="Background Image"
      class="object-cover w-full h-96 opacity-70 bg-cover"
    />
    <div
      class="overlay absolute inset-0 flex flex-col items-center justify-center text-white p-8"
    >
      <h1 class="text-4xl font-bold mb-4">Special Foods Recipes</h1>
      <p class="text-lg">Explore delicious food recipes</p>
    </div>
  </div>

  <div class="relative" style="z-index: 1; overflow-y: scroll">
    <div class="bg-gray-100">
      <div class="container py-8 px-6">
        <h1 class="text-3xl font-bold mb-4 flex items-center justify-center">
          Welcome to KRecipes
        </h1>
        <p class="text-gray-600 mb-8 flex items-center justify-center">
          Discover delicious recipes for every occasion
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RecipeCard
            v-for="recipe in recipes"
            :key="recipe.id"
            :recipe="recipe"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RecipeCard from "../components/RecipeCard.vue";
import { recipes } from "../constants/recipes";

export default {
  name: "HomePage",
  components: { RecipeCard },
  data() {
    return {
      recipes: recipes,
    };
  },
};
</script>

<style>
/* Add custom styles here if needed */
</style>
