<template>
  <div
    class="bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
  >
    <img
      :src="recipe.image1"
      :alt="recipe.title"
      class="w-full h-48 object-cover rounded-t-lg"
    />
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">{{ recipe.title }}</h2>
      <p class="text-gray-600 mb-1">
        {{
          recipe.description?.length > 100
            ? recipe.description?.slice(0, 100) + "..."
            : recipe.description
        }}
      </p>
      <div class="flex items-center justify-between">
        <router-link
          v-if="recipe.description?.length > 100"
          :to="`/recipedetails/${recipe.id}`"
          class="text-blue-500 hover:underline"
          >Read More</router-link
        >
        <router-link
          v-else
          :to="`/recipedetails/${recipe.id}`"
          class="text-blue-500 hover:underline"
          >Details</router-link
        >
        <div class="flex items-center text-sm font-bold text-gray-700">
          <span>{{ average }} </span>
          <svg
            class="star fill-yellow-500 w-4 h-4 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2L15.09 8.45L22 9.27L17.32 14.14L18.55 21L12 17.77L5.45 21L6.68 14.14L2 9.27L8.91 8.45L12 2Z"
            />
          </svg>
        </div>
      </div>
      <Rating
        :initialRating="0"
        :totalStars="5"
        :recipe_id="recipe?.id"
        :isUserRatedBefore="isUserRatedBefore"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Rating from "./Rating.vue";
import { getAccessToken, extractIdFromToken } from "../utils/auth";
const { recipe } = defineProps(["recipe"]);

const token = ref(getAccessToken());
const id = extractIdFromToken(token.value);
token.value = id;

const ratings = recipe.ratings;

let isUserRatedBefore = false;
for (let i = 0; i < ratings.length; i++) {
  const rating = ratings[i];

  if (rating.user.id === Number(token.value)) {
    isUserRatedBefore = true;
    break;
  }
}

const totalRatings = ratings.length;
let sum = 0;
let average = 1.0;
if (totalRatings) {
  ratings.forEach((rating) => {
    sum += Number(rating.value);
  });

  average = (sum / totalRatings).toFixed(1);
} else {
  average = 1.0;
}
</script>

<style scoped></style>
