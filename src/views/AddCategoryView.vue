<template>
  <div class="recipe-registration py-20 md:py-32">
    <h1 class="text-2xl text-center font-semibold">Add Category</h1>

    <form
      @submit.prevent="addCategory"
      class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <div class="mb-6">
        <label for="name" class="block font-medium mb-1">Category name:</label>
        <input
          v-model="name"
          type="text"
          id="name"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
      </div>

      <div class="mb-6">
        <label for="description" class="block font-medium mb-1"
          >Category description:</label
        >
        <input
          v-model="description"
          type="text"
          id="description"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Category
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter, useRoute } from "vue-router";
import { ADD_CATEGORY } from "../api/graphql";

const name = ref("");
const description = ref("");

const router = useRouter();
const route = useRoute();
const recipe_id = route.params.recipe_id;

const { mutate } = useMutation(ADD_CATEGORY);

const addCategory = async () => {
  try {
    const response = await mutate({
      name: name.value,
      description: description.value,
    });

    router.push("/addrecipe");

    name.value = "";
    description.value = "";
  } catch (error) {
    console.error("Error adding category:", error);
  }
};
</script>

<style scoped></style>
