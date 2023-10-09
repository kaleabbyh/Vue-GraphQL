<template>
  <div
    class="bg-transparent bg-gray-200 opacity-80 shadow-lg border border-gray-200 rounded-lg"
  >
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div class="md:flex md:justify-between">
        <div class="flex flex-row items-center">
          <router-link to="/" class="flex items-center">
            <img
              src="../assets/images/recipe-logo.png"
              class="h-8 md:h-12 mr-3 transition-transform duration-300 hover:scale-110"
              alt="KRecipe Logo"
            />
          </router-link>
        </div>
        <div class="flex flex-row items-center">
          <router-link to="/categories">
            <img
              src="../assets/images/mix.png"
              class="h-12 md:h-20 rounded-full bg-white p-2 transition-transform duration-300 hover:scale-110"
              alt=""
            />
          </router-link>
          <router-link to="/recipes">
            <img
              src="../assets/images/recipe-book.png"
              class="h-12 md:h-16 rounded-full bg-white p-2 transition-transform duration-300 hover:scale-110"
              alt=""
            />
          </router-link>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 class="mb-3 text-md font-bold uppercase text-gray-900">
              Categories
            </h2>
            <ul class="text-gray-900 font-medium">
              <li
                v-for="category in categories"
                :key="category.id"
                class="mb-4"
              >
                <router-link
                  :to="`/recipes/${category.id}`"
                  class="hover:text-yellow-700 capitalize"
                  >{{ category.name }}</router-link
                >
              </li>
              <li class="mb-4">
                <router-link
                  to="/categories"
                  class="hover:text-yellow-700 capitalize"
                  >all categories</router-link
                >
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-3 text-md font-bold uppercase text-gray-900">
              Contact Us
            </h2>
            <ul class="text-gray-900 font-medium">
              <li class="mb-4">
                <router-link to="/" class="hover:text-yellow-700"
                  >GitHub</router-link
                >
              </li>
              <li>
                <router-link to="/" class="hover:text-yellow-700"
                  >LinkedIn</router-link
                >
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-3 text-md font-bold uppercase text-gray-900">
              Legal
            </h2>
            <ul class="text-gray-900 font-medium">
              <li class="mb-4">
                <a href="#" class="hover:text-yellow-700">Privacy Policy</a>
              </li>
              <li>
                <a href="#" class="hover:text-yellow-700"
                  >Terms &amp; Conditions</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="my-6 sm:mx-auto border-gray-300 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-center">
        <span class="text-sm text-gray-900 stext-gray-900">
          © 2023 KRecipe. All Rights Reserved.
        </span>
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
      const allCategories = result.value?.category;
      categories.value = allCategories.slice(0, 3);
    } catch (error) {
      console.error("Error retrieving Recipes:", error);
    }
  }
});
</script>

<style lang="scss" scoped></style>
