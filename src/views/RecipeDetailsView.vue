<template>
  <div
    class="recipe-details flex flex-col md:flex-row justify-center items-center mt-8"
  >
    <div
      class="image-container mb-10 rounded-lg overflow-hidden flex justify-center items-center"
    >
      <Slider />
    </div>
    <div class="details-container ml-12 mb-10">
      <h1 class="recipe-title text-3xl font-bold mb-4">{{ recipe.title }}</h1>
      <p class="recipe-description text-lg mb-4">{{ recipe.description }}</p>
      <div class="recipe-ingredients mb-6">
        <h2 class="text-xl font-bold mb-2">Ingredients</h2>
        <ul class="list-disc pl-6">
          <li
            v-for="(ingredient, index) in recipe.ingredients"
            :key="index"
            class="mb-1"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>
      <div class="recipe-instructions">
        <h2 class="text-xl font-bold mb-2">Instructions</h2>
        <ol class="list-decimal pl-6">
          <li
            v-for="(step, index) in recipe.instructions"
            :key="index"
            class="mb-2"
          >
            {{ step }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
import Slider from "../components/slider.vue";

export default {
  components: {
    Slider,
  },
  data() {
    return {
      recipe: {
        title: "Delicious Recipe",
        image:
          "https://th.bing.com/th/id/OIP.8_GJE3mBavuXiGblgMcNvgHaLH?pid=ImgDet&rs=1",
        description:
          "This is a mouthwatering recipe that will delight your taste buds.",
        ingredients: [
          "Ingredient 1",
          "Ingredient 2",
          "Ingredient 3",
          "Ingredient 4",
          "Ingredient 5",
        ],
        instructions: [
          "Step 1: Do this",
          "Step 2: Do that",
          "Step 3: Add the ingredients",
          "Step 4: Cook for 30 minutes",
          "Step 5: Enjoy your delicious meal!",
        ],
      },
    };
  },
};
</script>
