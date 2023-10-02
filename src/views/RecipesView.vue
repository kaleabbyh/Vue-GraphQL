<template>
  <div class="bg-image bg-cover bg-center bg-fixed py-0 mt-20">
    <div class="relative bg-opacity-90" >
      <div class="bg-gray-100 bg-opacity-90 min-h-screen">
        
          <h1 class="text-3xl font-bold mb-4 flex items-center justify-center">
            Welcome to KRecipes
          </h1>
          <p class="text-gray-600 mb-4 flex items-center justify-center">
            Discover delicious recipes for every occasion
          </p>
          <div class="flex justify-center mb-10">
            <select
              class="px-4 py-2 mx-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
              v-model="selectedOption"
            >
              <option value="">Filter by</option>
              <option value="Title" selected>Title</option>
              <option value="Category">Category</option>
              <option value="PreparationTime">PreparationTime</option>
              <option value="Ingredients">Ingredients</option>
            </select>

            <div v-if="selectedOption === 'Title'">
              <input
                v-model="titleSearch"
                type="text"
                placeholder="Search by title"
                class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
              />
              <button
                @click="searchRecipesByTitle"
                class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Search
              </button>
            </div>
            <div v-if="selectedOption === 'Category'">
              <input
                v-model="categorySearch"
                type="text"
                placeholder="Search by category"
                class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
              />
              <button
                @click="searchRecipesByCategory"
                class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Search
              </button>
            </div>

            <div v-if="selectedOption === 'PreparationTime'">
              <input
                v-model="preparationTimeSearch"
                type="number"
                placeholder="Search by preparation time"
                class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
              />
              <button
                @click="searchRecipesByPreparationTime"
                class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Search
              </button>
            </div>

            <div v-if="selectedOption === 'Ingredients'">
              <input
                v-model="ingredientSearch"
                type="text"
                placeholder="Search by ingredient"
                class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
              />
              <button
                @click="searchRecipesByIngredient"
                class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Search
              </button>
            </div>

            <router-link
              v-if="selectedOption === ''"
              to="/addrecipe"
              class="ml-2 px-4 py-2 items-center bg-blue-500 text-white rounded-md"
            >
              Add New Recipe
            </router-link>
          </div>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 md:px-20  gap-5"
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
import RecipeCard from "@/components/RecipeCard.vue";
import { watchEffect, watch, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_RECIPES } from "../api/graphql";

const selectedOption = ref("");
const recipeList = ref([]);
const categorySearch = ref("");
const titleSearch = ref("");
const preparationTimeSearch = ref(null);
const ingredientSearch = ref("");
const { result } = useQuery(GET_RECIPES);

//get

watchEffect(() => {
  if (result.value) {
    try {
      recipeList.value = result.value?.recipe;
    } catch (error) {
      console.error("Error retrieving Recipes:", error);
    }
  }
});

//watcher functions
watch([titleSearch], (newVal) => {
  if (!newVal) {
    recipeList.value = result.value?.recipe || [];
  } else {
    searchRecipesByTitle();
  }
});

watch([preparationTimeSearch], (newVal) => {
  if (!newVal) {
    recipeList.value = result.value?.recipe || [];
  } else {
    searchRecipesByPreparationTime();
  }
});

watch([categorySearch], (newVal) => {
  if (!newVal) {
    recipeList.value = result.value?.recipe || [];
  } else {
    searchRecipesByCategory();
  }
});

watch([ingredientSearch], (newVal) => {
  if (!newVal) {
    recipeList.value = result.value?.recipe || [];
  } else {
    searchRecipesByIngredient();
  }
});

const searchRecipesByCategory = () => {
  const searchItem = categorySearch.value?.toLowerCase();
  const filtered = result.value?.recipe.filter((recipe) =>
    recipe.category?.name?.toLowerCase().includes(searchItem)
  );
  recipeList.value = filtered || [];
};

const searchRecipesByTitle = () => {
  const searchItem = titleSearch.value?.toLowerCase();
  const filtered = result.value?.recipe.filter((recipe) =>
    recipe.title?.toLowerCase().includes(searchItem)
  );
  recipeList.value = filtered || [];
};

const searchRecipesByPreparationTime = () => {
  const searchItem = preparationTimeSearch?.value;
  const filtered = result.value?.recipe.filter(
    (recipe) => Number(recipe?.preparation_time) <= Number(searchItem)
  );

  recipeList.value = filtered || [];
};

const searchRecipesByIngredient = () => {
  const searchItem = ingredientSearch.value?.toLowerCase();
  const filtered = result.value?.recipe.filter((recipe) =>
    recipe.ingredients.some((ingredient) =>
      ingredient.name.toLowerCase().includes(searchItem)
    )
  );
  console.log(searchItem);
  recipeList.value = filtered || [];
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
