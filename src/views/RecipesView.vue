<template>
  <div class="bg-image bg-cover bg-center bg-fixed py-0">
    <div class="relative bg-opacity-90">
      <div class="bg-gray-100 bg-opacity-90 py-24 md:pt-28 min-h-screen">
        <div class="flex items-center justify-center mb-6">
          <div class="flex flex-col md:flex-row items-center rounded-lg">
            <div class="rounded-lg p-10 ml-4 max-w-sm text-gray-700">
              <h2 class="text-xl mb-4">Explore your favourite Recipes</h2>
              <h3 class="text-lg mb-10">Add your own recipes here</h3>
              <router-link
                to="/addrecipe"
                class="ml-2 px-4 py-2 items-center bg-blue-500 text-white rounded-md"
              >
                Add New Recipe
              </router-link>
            </div>
            <div class="h-full p-10">
              <router-link to="#">
                <img
                  src="../assets/images/habeshan.png"
                  class="h-full rounded-lg p-2 transition-transform duration-300 hover:scale-110 m-5"
                  alt=""
                />
              </router-link>
            </div>
          </div>
        </div>

        <p class="text-gray-600 text-xl mb-4 flex items-center justify-center">
          Discover our recipes for every occasion
        </p>

        <div class="flex justify-center mb-10">
          <select
            class="px-4 py-2 mx-2 text-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
            v-model="selectedOption"
          >
            <option value="Filter">Filter by</option>
            <option value="Title" selected>Title</option>
            <option value="PreparationTime">PreparationTime</option>
            <option value="Ingredients">Ingredients</option>
          </select>

          <div v-if="selectedOption === 'Title'">
            <input
              v-model="searchTitle"
              type="text"
              placeholder="Search by title"
              class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
            />
            <button class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
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
            <button class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
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
            <button class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
              Search
            </button>
          </div>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 md:px-20 gap-5"
        >
          <RecipeCard
            v-for="recipe in paginatedRecipes"
            :key="recipe.id"
            :recipe="recipe"
          />
        </div>

        <div class="flex items-center justify-center mt-4 md:mt-8">
          <button
            class="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-100"
            :disabled="currentPage === 1"
            @click="previousPage"
          >
            Previous
          </button>
          <div class="flex items-center mx-4">
            <button
              v-for="page in totalPages"
              :key="page"
              :class="[
                'px-3 py-2 rounded-full',
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100',
              ]"
              @click="setCurrentPage(page)"
            >
              {{ page }}
            </button>
          </div>
          <button
            class="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-100"
            :disabled="currentPage >= totalPages"
            @click="nextPage"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RecipeCard from "@/components/RecipeCard.vue";
import { watchEffect, ref, computed, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import {
  GET_RECIPES,
  GET_RECIPE_BY_TITLE,
  GET_RECIPE_BY_INGREDIENT,
  GET_RECIPE_BY_PREPARATIONTIME,
} from "../api/graphql";

const selectedOption = ref("Filter");
const preparationTimeSearch = ref(null);
const ingredientSearch = ref("");
const searchTitle = ref("");

const recipeList = ref([]);

const currentPage = ref(1);
const itemsPerPage = 6;

const { result } = useQuery(GET_RECIPES);

////////////////////
const { result: recipeByTitle, refetch: titleRefetch } = useQuery(
  GET_RECIPE_BY_TITLE,
  {
    title: `%${searchTitle.value}%`,
  }
);
watch(searchTitle, () => {
  titleRefetch({
    title: `%${searchTitle.value}%`,
  });
});

///////////////////////
const { result: recipeByIngredient, refetch: ingredientRefetch } = useQuery(
  GET_RECIPE_BY_INGREDIENT,
  {
    ingredient: `%${ingredientSearch.value}%`,
  }
);
watch(ingredientSearch, () => {
  ingredientRefetch({
    name: `%${ingredientSearch.value}%`,
  });
});

//////////////////////////////
const { result: recipeByPreparationTime, refetch: preparationTimeRefetch } =
  useQuery(GET_RECIPE_BY_PREPARATIONTIME, {
    preparation_time: preparationTimeSearch?.value,
  });
watch(preparationTimeSearch, () => {
  preparationTimeRefetch({
    preparation_time: preparationTimeSearch.value,
  });
});

////////////////////////////////
watchEffect(() => {
  if (selectedOption?.value == "Filter" || selectedOption?.value == "") {
    try {
      recipeList.value = result?.value?.recipe;
    } catch (error) {
      console.error("Error retrieving Recipes:", error);
    }
  } else if (selectedOption?.value == "Title") {
    try {
      recipeList.value = recipeByTitle?.value?.recipe;
    } catch (error) {
      console.error("Error retrieving Recipes:", error);
    }
  } else if (selectedOption?.value == "Ingredients") {
    try {
      recipeList.value = recipeByIngredient?.value?.recipe;
    } catch (error) {
      console.error("Error retrieving Recipes:", error);
    }
  } else if (selectedOption?.value == "PreparationTime") {
    if (preparationTimeSearch.value == null) {
      recipeList.value = recipeList.value;
    } else {
      try {
        recipeList.value = recipeByPreparationTime?.value?.recipe;
      } catch (error) {
        console.error("Error retrieving Recipes:", error);
      }
    }
  }
});

const totalPages = computed(() => {
  const list = recipeList.value;
  if (!list || list.length === 0) {
    return 0;
  }
  return Math.ceil(list.length / itemsPerPage);
});

const paginatedRecipes = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return recipeList?.value?.slice(startIndex, endIndex);
});

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function setCurrentPage(page) {
  currentPage.value = page;
}
</script>

<style scoped>
.bg-image {
  background-image: url("@/assets/images/food2.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
