<template>
  <div class="recipe-registration w-full pt-20 md:pt-32">
    <h1 class="mx-10 text-2xl font-medium">Add Recipe</h1>
    <form @submit.prevent="registerRecipe" class="form">
      <div class="form-group">
        <label for="recipeName">Recipe Name:</label>
        <input type="text" id="recipeName" v-model="recipeName" required />
      </div>

      <div class="form-group">
        <label for="ingredients">Ingredients:</label>
        <select
          id="ingredients"
          v-model="selectedIngredients"
          multiple
          required
        >
          <option
            v-for="ingredient in ingredients"
            :key="ingredient.id"
            :value="ingredient.id"
          >
            {{ ingredient.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="instructions">Instructions:</label>
        <textarea id="instructions" v-model="instructions" required></textarea>
      </div>

      <button type="submit" class="submit-button">Register Recipe</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RecipeRegistration",
  data() {
    return {
      recipeName: "",
      selectedIngredients: [],
      instructions: "",
      ingredients: [], // Placeholder for the list of ingredients
    };
  },
  mounted() {
    // Make an API call to retrieve the list of ingredients from the database
    this.fetchIngredients();
  },
  methods: {
    fetchIngredients() {
      // Simulate API call to retrieve ingredients from the database
      // Replace this with your actual API call
      setTimeout(() => {
        // Sample data for ingredients
        const ingredients = [
          { id: 1, name: "Ingredient 1" },
          { id: 2, name: "Ingredient 2" },
          { id: 3, name: "Ingredient 3" },
        ];
        this.ingredients = ingredients;
      }, 500);
    },
    registerRecipe() {
      // Perform the recipe registration logic here
      const recipe = {
        name: this.recipeName,
        ingredients: this.selectedIngredients,
        instructions: this.instructions,
      };
      console.log("Recipe:", recipe);

      // Reset the form fields
      this.recipeName = "";
      this.selectedIngredients = [];
      this.instructions = "";
    },
  },
};
</script>

<style scoped>
.recipe-registration {
  max-width: 700px;
  margin: auto;
}

.form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.submit-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
