<template>
  <div class="bg-image bg-cover bg-opacity-50 bg-center bg-fixed py-0 mt-20">
    <div class="relative" style="z-index: 1; overflow-y: scroll">
      <div class="bg-gray-100 p-10 bg-opacity-90">
        <div
          class="flex flex-col items-center justify-center text-gray-900 p-8"
        >
          <p class="text-3xl my-5 font-bold capitalize">
            {{ category?.name }} food recipe category
          </p>
        </div>
        <div class="flex items-center justify-center mb-6">
          <div
            class="flex flex-col md:flex-row items-center shadow-lg rounded-lg"
          >
            <div class="h-full p-10">
              <router-link :to="`/recipes/${category.id}`">
                <img
                  :src="category.image"
                  class="h-60 w-60 rounded-full p-2 transition-transform duration-300 hover:scale-110 m-5"
                  alt=""
                />
              </router-link>
            </div>
            <div class="rounded-lg p-10 ml-4">
              <h2 class="text-xl font-bold mb-4 capitalize">
                Category Name: {{ category?.name }}
              </h2>
              <h3 class="text-lg font-semibold mb-2">Description:</h3>
              <div class="text-lg max-w-lg">
                {{ category?.description }}
              </div>
            </div>
          </div>
        </div>
        <h1
          class="text-2xl font-bold my-10 flex items-center justify-center capitalize"
        >
          {{ category?.name }} Category Recipes
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
      </div>
    </div>
  </div>
</template>

<script setup>
import RecipeCard from "../components/RecipeCard.vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_RECIPE_BY_CATEGORY, GET_CATEGORy } from "../api/graphql";
import { ref, watchEffect, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const category_id = route.params.category_id;
const category = ref({});

const { result } = useQuery(GET_RECIPE_BY_CATEGORY, {
  category_id: category_id,
});
const { result: singleCategory } = useQuery(GET_CATEGORy, {
  id: category_id,
});

const recipeList = ref([]);

watchEffect(() => {
  if (result.value) {
    try {
      const recipes = result.value?.recipe;
      recipeList.value = recipes.slice(0, 9);
      category.value = singleCategory?.value?.category[0];
      console.log(category.value);
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
