<template>
  <div class="bg-gray-100">
    <div class="mx-20 flex items-center justify-center mt-24">
      <h1 class="text-4xl font-semibold text-gray-700 pt-10">Categories</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mx-10 md:mx-20 my-5 p-10">
      <div
        v-for="category in categories"
        :key="category.id"
        class="bg-white rounded-lg shadow-sm flex items-center"
      >
        <div class="w-1/3 rounded-full">
          <img
            :src="category.image"
            class="object-cover h-full w-full p-3 rounded-full border border-r-20"
            :alt="category.name"
          />
        </div>
        <div class="p-4 w-2/3">
          <h2 class="text-lg font-medium mb-2 uppercase">
            {{ category.name }}
          </h2>
          <p class="text-gray-600 my-5">
            {{ category.description.slice(0, 100) }}...
          </p>
          <router-link
            :to="`/recipes/${category.id}`"
            class="text-blue-500 hover:underline text-lg"
          >
            Recipes
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { GET_CATEGORIES } from "../api/graphql";
import { useQuery } from "@vue/apollo-composable";
import { ref, watchEffect } from "vue";
const categories = ref([]);
const { result } = useQuery(GET_CATEGORIES);

watchEffect(() => {
  if (result.value) {
    try {
      categories.value = result.value?.category;
    } catch (error) {
      console.error("Error retrieving Recipes:", error);
    }
  }
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
