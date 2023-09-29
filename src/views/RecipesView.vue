<template>
  <div class="bg-image bg-cover bg-center bg-fixed py-0 mt-20">
    <div class="relative bg-opacity-90" style="z-index: 1; overflow-y: scroll">
      <div class="bg-gray-100 bg-opacity-90">
        <div class="container py-8 px-6">
          <h1 class="text-3xl font-bold mb-4 flex items-center justify-center">
            Welcome to KRecipes
          </h1>
          <p class="text-gray-600 mb-8 flex items-center justify-center">
            Discover delicious recipes for every occasion
          </p>
          <div class="flex justify-center mb-4">
            <input
              v-model="categorySearch"
              type="text"
              placeholder="Search by category"
              class="px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              @click="searchRecipes"
              class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Search
            </button>
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 gap-8"
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
  </div>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";
import { watchEffect, computed } from "vue";
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_RECIPES, SEARCH_RECIPE_BY_CATEGORY } from "../constants/graphql";

export default {
  name: "RECIPES",
  components: { RecipeCard },
  setup() {
    const recipeList = ref([]);
    const categorySearch = ref("");
    const { result } = useQuery(GET_RECIPES);
    // const { result: fruitCategory } = useQuery(SEARCH_RECIPE_BY_CATEGORY, {
    //   category_name: `%${categorySearch.value}%`,
    // });

    watchEffect(() => {
      if (result.value) {
        try {
          recipeList.value = result.value?.recipe;
        } catch (error) {
          console.error("Error retrieving Recipes:", error);
        }
      }
    });

    const searchRecipes = () => {
      const searchTerm = categorySearch.value?.toLowerCase();
      const filtered = recipeList.value.filter((recipe) =>
        recipe.category?.name?.toLowerCase().includes(searchTerm)
      );
      console.log(filtered);
    };

    return {
      recipeList,
      categorySearch,
      searchRecipes,
    };
  },
};
</script>

<style scoped>
.bg-image {
  background-image: url("@/assets/images/food2.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
