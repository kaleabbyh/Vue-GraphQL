<template>
  <div class="bg-transparent bg-gray-200 opacity-80">
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
          <router-link to="/">
            <img
              src="../assets/images/mix.png"
              class="h-12 md:h-16 rounded-full bg-white p-2 transition-transform duration-300 hover:scale-110"
              alt=""
            />
          </router-link>
          <router-link to="/">
            <img
              src="../assets/images/recipe-book.png"
              class="h-12 md:h-16 rounded-full bg-white p-2 transition-transform duration-300 hover:scale-110"
              alt=""
            />
          </router-link>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 class="mb-6 text-sm font-bold uppercase text-gray-900">
              Discover
            </h2>
            <ul class="text-gray-900 font-medium">
              <li class="mb-4">
                <a href="/" class="hover:text-yellow-700">Category1</a>
              </li>
              <li>
                <a href="/" class="hover:text-yellow-700">Category2</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-bold uppercase text-gray-900">
              Contact Us
            </h2>
            <ul class="text-gray-900 font-medium">
              <li class="mb-4">
                <a href="/contactus" class="hover:text-yellow-700">GitHub</a>
              </li>
              <li>
                <a href="#" class="hover:text-yellow-700">linkedIn</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-bold uppercase text-gray-900">
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
      categories.value = allCategories.slice(0, 4);
      console.log(allCategories.slice(0, 4));
    } catch (error) {
      console.error("Error retrieving Recipes:", error);
    }
  }
});
</script>

<style lang="scss" scoped></style>
