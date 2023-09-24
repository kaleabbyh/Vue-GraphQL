<!-- <template>
  <div
    class="recipe-details flex flex-col md:flex-row justify-center items-center mt-20"
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
</script> -->

<template>
  <div class="container mx-auto px-4 py-20">
    <h1 class="text-3xl font-bold mt-10 mb-4 ml-10">
      Delicious Chocolate Chip Cookies
    </h1>
    <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-1/2 lg:w-2/3 px-4">
        <!-- <img
          src="../assets/images/food.png"
          alt="Chocolate Chip Cookies"
          class="w-full rounded-lg mb-4"
        /> -->
        <Slider />
        <p class="text-gray-700 mb-4">
          These chocolate chip cookies are a classic favorite. They are soft,
          chewy, and packed with chocolatey goodness. Follow the recipe below to
          make your own batch of delicious cookies.
        </p>
        <h2 class="text-2xl font-bold mb-2">Ingredients</h2>
        <ul class="list-disc ml-6">
          <li>1 cup unsalted butter, softened</li>
          <li>1 cup granulated sugar</li>
          <li>1 cup packed brown sugar</li>
          <li>2 large eggs</li>
          <li>1 teaspoon vanilla extract</li>
          <li>3 cups all-purpose flour</li>
          <li>1 teaspoon baking soda</li>
          <li>1/2 teaspoon salt</li>
          <li>2 cups chocolate chips</li>
        </ul>
        <h2 class="text-2xl font-bold mt-6 mb-2">Instructions</h2>
        <ol class="list-decimal ml-6">
          <li>
            Preheat the oven to 375°F (190°C). Line baking sheets with parchment
            paper.
          </li>
          <li>
            In a large bowl, cream together the butter, granulated sugar, and
            brown sugar until light and fluffy.
          </li>
          <li>
            Add the eggs one at a time, beating well after each addition. Stir
            in the vanilla extract.
          </li>
          <li>
            In a separate bowl, combine the flour, baking soda, and salt.
            Gradually add the dry ingredients to the butter mixture, mixing
            until just blended.
          </li>
          <li>Stir in the chocolate chips.</li>
          <li>
            Drop rounded tablespoons of dough onto the prepared baking sheets.
          </li>
          <li>
            Bake for 8 to 10 minutes, or until golden brown. Allow the cookies
            to cool on the baking sheets for a few minutes before transferring
            them to wire racks to cool completely.
          </li>
          <li>Enjoy!</li>
        </ol>
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
export default {
  components: {
    Slider,
  },
};
</script>
<style>
img {
  max-width: 100%;
}
</style>
