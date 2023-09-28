<template>
  <div class="recipe-registration py-20 md:py-32">
    <h1 class="text-2xl text-center font-semibold">Add Step</h1>
    <form
      @submit.prevent="addStep"
      class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <div class="mb-6">
        <label for="step_number" class="block font-medium mb-1"
          >Step Number:</label
        >
        <input
          v-model="step_number"
          type="number"
          id="step_number"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
      </div>

      <div class="mb-6">
        <label for="description" class="block font-medium mb-1"
          >Step description:</label
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
        Add Step
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useRouter, useRoute } from "vue-router";
import { ADD_STEP } from "../constants/graphql";

export default {
  components: {},
  setup() {
    const step_number = ref(null);
    const description = ref("");

    const router = useRouter();
    const route = useRoute();
    const recipe_id = route.params.recipe_id;

    const { mutate } = useMutation(ADD_STEP);

    const addStep = async () => {
      try {
        const response = await mutate({
          step_number: step_number.value,
          description: description.value,
          recipe_id: recipe_id,
        });

        console.log(response.data);
        alert("Step added successfully!");
        router.push("/recipedetails/" + recipe_id);

        step_number.value = "";
        description.value = "";
      } catch (error) {
        console.error("Error adding step:", error);
      }
    };

    return {
      step_number,
      description,
      addStep,
    };
  },
};
</script>
