<template>
  <div class="recipe-registration py-20 md:py-32">
    <h1 class="text-2xl text-center font-semibold">Add Ingredient</h1>

    <form
      @submit.prevent="addIngredient"
      class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <div class="mb-6">
        <label for="name" class="block font-medium mb-1"
          >Ingredient name:</label
        >
        <input
          v-model="name"
          type="text"
          id="name"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
      </div>

      <div class="mb-6">
        <label for="amount" class="block font-medium mb-1"
          >Ingredient amount:</label
        >
        <input
          v-model="amount"
          type="text"
          id="amount"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Ingredient
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter, useRoute } from "vue-router";
import { ADD_INGREDIENT } from "../api/graphql";

const name = ref("");
const amount = ref("");

const router = useRouter();
const route = useRoute();
const recipe_id = route.params.recipe_id;

const { mutate } = useMutation(ADD_INGREDIENT);

const addIngredient = async () => {
  try {
    const response = await mutate({
      name: name.value,
      amount: amount.value,
      recipe_id: recipe_id,
    });

    router.push("/recipedetails/" + recipe_id);

    name.value = "";
    amount.value = "";
  } catch (error) {
    console.error("Error adding ingredients:", error);
  }
};
</script>

<style scoped></style>
