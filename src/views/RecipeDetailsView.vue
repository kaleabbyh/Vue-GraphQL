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

        <br />
        <div class="flex items-center">
          <h2 class="text-2xl font-bold mb-2 mr-2">Steps</h2>
          <router-link :to="`/addstep/${recipe?.id}`">
            <img class="h-7 w-auto" src="../assets/images/add.png" alt="Logo" />
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
        <div class="flex items-center">
          <h2 class="text-2xl font-bold mb-2 mr-2">Ingredients</h2>
          <router-link :to="`/addingredient/${recipe?.id}`">
            <img class="h-7 w-auto" src="../assets/images/add.png" alt="Logo" />
          </router-link>
        </div>

        <ul
          v-for="ingredient in recipe?.ingredients"
          :key="ingredient.id"
          class="list-disc ml-6"
        >
          <li>{{ ingredient.amount }} {{ ingredient.name }}</li>
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
