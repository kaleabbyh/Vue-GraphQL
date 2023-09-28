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
        <div class="flex justify-between">
          <h2 class="text-2xl font-bold mb-2">Ingredients</h2>
          <router-link
            :to="`/addingredient/${recipe?.id}`"
            class="bg-indigo-500 text-white py-1 px-2 rounded right-0 bottom-0 mr-4"
          >
            add ingredients
          </router-link>
        </div>

        <ul
          v-for="ingredient in recipe?.ingredients"
          :key="ingredient.id"
          class="list-disc ml-6"
        >
          <li>{{ ingredient.amount }} {{ ingredient.name }}</li>
        </ul>

        <div class="flex justify-between">
          <h2 class="text-2xl font-bold mb-2">steps</h2>
          <router-link
            :to="`/addstep/${recipe?.id}`"
            class="bg-indigo-500 text-white py-1 px-2 rounded right-0 bottom-0 mr-4"
          >
            add step
          </router-link>
        </div>

        <div
          v-for="step in recipe?.steps"
          :key="step.id"
          class="list-decimal ml-6"
        >
          <span>{{ step.step_number }}). {{ step.description }}</span>
        </div>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 px-4">
        <h2 class="text-2xl font-bold mb-2">Nutritional Information</h2>
        <ul class="list-disc ml-6">
          <li>Calories: 180</li>
          <li>Total Fat: 9g</li>
          <li>Saturated Fat: 5g</li>
          <li>Cholesterol: 30mg</li>
          <li>Sodium: 120mg</li>
          <li>Total Carbohydrate: 24g</li>
          <li>Dietary Fiber: 1g</li>
          <li>Sugars: 15g</li>
          <li>Protein: 2g</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Slider from "../components/slider.vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { GET_RECIPE } from "../constants/graphql";
import { ref, watchEffect } from "vue";

export default {
  components: { Slider },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const recipeId = route.params.id;

    const { result } = useQuery(GET_RECIPE, { id: recipeId });
    const recipe = ref();

    watchEffect(() => {
      if (result.value) {
        try {
          recipe.value = result.value?.recipe?.[0];
          console.log(recipe.value);
        } catch (error) {
          console.error("Error retrieving Recipes:", error);
        }
      }
    });

    return {
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
