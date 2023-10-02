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

        <p class="border-t border-gray-300 py-2 text-gray-700 mb-4">
          {{ recipe?.description }}
        </p>

        <div class="flex items-center py-2 my-3">
          <h3 class="text-md font-bold mr-2">Category</h3>
          <div
            class="flex items-center ml-4 bg-blue-500 text-white px-5 py-1 rounded-full text-sm font-semibold mr-2"
          >
            {{ recipe?.category?.name }}
          </div>
        </div>
        <div
          v-for="rating in ratings"
          :key="rating.id"
          class="bg-gray-100 p-4 my-4"
        >
          <div class="text-lg font-bold">
            {{ rating.user?.firstname }} {{ rating.user?.lastname }}
          </div>
          <div class="text-gray-600 my-2">{{ rating.comment }}</div>

          <Rating
            :initialRating="rating.value"
            :totalStars="5"
            :recipe_id="recipe?.id"
            :isUserRatedBefore="true"
          />
        </div>
      </div>
      <div class="w-full md:w-1/2 px-4">
        <div class="flex items-center py-2 border-t border-gray-300">
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

        <div class="flex items-center mt-6 py-2 border-t border-gray-300">
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
          <span>{{ step.step_number }}. {{ step.description }}</span>
        </div>
        <h3 class="text-md font-bold py-2 mt-6 mr-2 border-t border-gray-300">
          Cooking Time
        </h3>
        <div class="list-decimal ml-6">
          <span>recipe cooking time: {{ recipe?.cooking_time }} minutes</span>
        </div>
        <h3 class="text-md font-bold py-2 mt-6 mr-2 border-t border-gray-300">
          Cooking Time
        </h3>
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
            @click="deleteRecipe"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Slider from "@/components/slider.vue";
import Rating from "@/components/Rating.vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { GET_RECIPE, DELETE_RECIPE } from "../api/graphql";
import { getToken } from "../utils/auth";
import { ref, watchEffect, watch } from "vue";

const route = useRoute();
const router = useRouter();
const token = ref(null);
const isAuthorized = ref(false);
const recipe = ref();
const recipeId = route.params.id;
const recipeId1 = ref(route.params.id);
token.value = getToken();
const ratings = ref([]);

const { result } = useQuery(GET_RECIPE, { id: recipeId1.value });
const { mutate } = useMutation(DELETE_RECIPE);

const fetchRecipeDetails = async () => {
  if (result) {
    try {
      recipe.value = result.value?.recipe?.[0];
      ratings.value = recipe.value?.ratings;
      isAuthorized.value =
        String(recipe.value?.user_id) === String(token?.value);

      console.log(ratings.value);
    } catch (error) {
      console.error("Error retrieving Recipes:", error);
    }
  }
};

const deleteRecipe = async () => {
  try {
    const response = await mutate({ id: recipeId });
    const affectedRows = response.data.delete_recipe.affected_rows;
    console.log(`Deleted ${affectedRows} recipe(s).`);
    router.push("/");
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
};

watchEffect(() => {
  fetchRecipeDetails();
});

watch(
  () => route.params.id,
  (newId) => {
    recipeId1.value = newId;
    fetchRecipeDetails();
    window.location.reload();
  }
);
</script>

<style>
img {
  max-width: 100%;
}
</style>
