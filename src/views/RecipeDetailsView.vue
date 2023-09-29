<template>
  <div class="container mx-auto md:mx-20 px-4 py-20">
    <h1 class="text-2xl font-bold mt-10 mb-4 ml-10">
      {{ recipe?.title }}
    </h1>
    <div class="flex flex-wrap mx-4">
      <div class="w-full md:w-1/2 px-4">
        <Slider
          :mainImage="recipe?.image1"
          :thumbnailImages="[recipe?.image1, recipe?.image2, recipe?.image3]"
        />

        <p class="text-gray-700 mb-4">
          {{ recipe?.description }}
        </p>

        <div class="flex items-center my-3">
          <h3 class="text-md font-bold mr-2">Category</h3>
          <div class="flex items-center ml-4">
            <div
              class="bg-blue-500 text-white px-5 py-1 rounded-full text-sm font-semibold mr-2"
            >
              {{ recipe?.category?.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 px-4">
        <div class="flex items-center">
          <h2 class="text-lg font-bold mb-2 mr-2">Ingredients</h2>

          <router-link
            v-if="isAuthorized"
            :to="`/addingredient/${recipe?.id}`"
            class="relative group flex items-center"
          >
            <img
              class="h-6 w-auto mr-2"
              src="../assets/images/add.png"
              alt="Logo"
            />
            <div
              class="opacity-0 group-hover:opacity-100 bg-green-500 text-white text-xs rounded py-1 px-2 absolute top-1/2 left-full transform -translate-y-1/2 whitespace-nowrap max-w-xs truncate transition-opacity duration-300"
            >
              Add Ingredients
            </div>
          </router-link>
        </div>

        <ul
          v-for="ingredient in recipe?.ingredients"
          :key="ingredient.id"
          class="list-disc ml-6"
        >
          <li>{{ ingredient.amount }} {{ ingredient.name }}</li>
        </ul>

        <div class="flex items-center mt-6">
          <h2 class="text-lg font-bold mb-2 mr-2">Steps</h2>
          <router-link
            v-if="isAuthorized"
            :to="`/addstep/${recipe?.id}`"
            class="relative group flex items-center"
          >
            <img
              class="h-6 w-auto mr-2"
              src="../assets/images/add.png"
              alt="Logo"
            />
            <div
              class="opacity-0 group-hover:opacity-100 bg-green-600 text-white text-xs rounded py-1 px-2 absolute top-1/2 left-full transform -translate-y-1/2 whitespace-nowrap max-w-xs truncate transition-opacity duration-300"
            >
              Add Step
            </div>
          </router-link>
        </div>

        <div
          v-for="step in recipe?.steps"
          :key="step.id"
          class="list-decimal ml-6"
        >
          <span>{{ step.step_number }}). {{ step.description }}</span>
        </div>
        <h3 class="text-md font-bold mt-6 mr-2">Cooking Time</h3>
        <div class="list-decimal ml-6">
          <span>recipe cooking time: {{ recipe?.cooking_time }} minutes</span>
        </div>
        <h3 class="text-md font-bold mt-6 mr-2">Cooking Time</h3>
        <div class="list-decimal ml-6">
          <span
            >recipe cooking time: {{ recipe?.preparation_time }} minutes</span
          >
        </div>

        <div class="mt-6 flex space-x-2">
          <router-link
            v-if="isAuthorized"
            :to="`/updaterecipe/${recipe?.id}`"
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </router-link>
          <button
            v-if="isAuthorized"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="deleteCookingTime"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Slider from "../components/slider.vue";
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { GET_RECIPE } from "../constants/graphql";
import { getToken } from "../utils/auth";
import { ref, watchEffect } from "vue";

export default {
  components: { Slider },
  setup() {
    const route = useRoute();
    const token = ref(null);
    const isAuthorized = ref(false);
    token.value = getToken();
    const recipeId = route.params.id;

    const { result } = useQuery(GET_RECIPE, { id: recipeId });
    const recipe = ref();

    watchEffect(() => {
      if (result.value) {
        try {
          recipe.value = result.value?.recipe?.[0];
          isAuthorized.value =
            String(recipe.value.user_id) === String(token.value);
          console.log(isAuthorized.value);
          console.log(recipe.value.category_id);
        } catch (error) {
          console.error("Error retrieving Recipes:", error);
        }
      }
    });

    return {
      isAuthorized,
      recipe,
    };
  },
};
</script>
<style>
img {
  max-width: 100%;
}
</style>
