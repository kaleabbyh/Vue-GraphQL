<template>
  <div class="recipe-registration py-20 md:py-32">
    <h1 class="text-2xl text-center font-semibold">Update Recipe</h1>
    <form
      @submit.prevent="updateRecipe"
      class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <div class="mb-6">
        <label for="title" class="block font-medium mb-1">Recipe Title:</label>
        <input
          v-model="title"
          type="text"
          id="title"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
      </div>

      <div class="mb-6">
        <label for="category" class="block font-medium mb-1"
          >Recipe Category:</label
        >
        <select
          v-model="category_id"
          id="category"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        >
          <option disabled value="">Select Category</option>
          <option
            v-for="category in categoryList"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="mb-6">
        <label for="description" class="block font-medium mb-1"
          >description:</label
        >
        <textarea
          v-model="description"
          id="description"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        ></textarea>
      </div>

      <!-- <div class="mb-6">
        <label for="image1" class="block font-medium mb-1">Image 1:</label>
        <input
          v-model="image1"
          type="text"
          id="image1"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
      </div>
      <div class="mb-6">
        <label for="image2" class="block font-medium mb-1">Image 2:</label>
        <input
          v-model="image2"
          type="text"
          id="image2"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
      </div>

      <div class="mb-6">
        <label for="image3" class="block font-medium mb-1">Image 3:</label>
        <input
          v-model="image3"
          type="text"
          id="image3"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
      </div> -->

      <div class="mb-6">
        <label for="image1" class="block font-medium mb-1">Image One:</label>
        <div class="w-full px-2 border border-gray-300 rounded">
          <ImageUpload
            class="max-w-lg mx-auto"
            @imageUploaded="uploadedImage1"
          />
        </div>
      </div>
      <div class="mb-6">
        <label for="image1" class="block font-medium mb-1">Image Two:</label>
        <div class="w-full px-2 border border-gray-300 rounded">
          <ImageUpload
            class="max-w-lg mx-auto"
            @imageUploaded="uploadedImage2"
          />
        </div>
      </div>
      <div class="mb-6">
        <label for="image1" class="block font-medium mb-1">Image Three:</label>
        <div class="w-full px-2 border border-gray-300 rounded">
          <ImageUpload
            class="max-w-lg mx-auto"
            @imageUploaded="uploadedImage3"
          />
        </div>
      </div>

      <div class="mb-6">
        <label for="cooking_time" class="block font-medium mb-1"
          >Cooking Time:</label
        >
        <input
          v-model="cooking_time"
          type="number"
          id="cooking_time"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
      </div>

      <div class="mb-6">
        <label for="preparation_time" class="block font-medium mb-1"
          >Preparation time:</label
        >
        <input
          v-model="preparation_time"
          type="number"
          id="preparation_time"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Update Recipe
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useRouter, useRoute } from "vue-router";
import ImageUpload from "@/components/ImageUpload.vue";
import { UPDATE_RECIPE, GET_RECIPE, GET_CATEGORIES } from "../api/graphql";

const title = ref("");
const description = ref("");
const image1 = ref("");
const image2 = ref("");
const image3 = ref("");
const cooking_time = ref("");
const preparation_time = ref("");
const category_id = ref(null);

const uploadedImage1 = (url) => {
  image1.value = url;
};
const uploadedImage2 = (url) => {
  image2.value = url;
};
const uploadedImage3 = (url) => {
  image3.value = url;
};

const route = useRoute();
const router = useRouter();
const recipe_id = route.params.id;

const { result: allCategory } = useQuery(GET_CATEGORIES);
const categories = computed(() => allCategory.value?.category);

const categoryList = ref([]);

const { result: myRecipe } = useQuery(GET_RECIPE, { id: Number(recipe_id) });
const recipe = ref();

watchEffect(() => {
  if (recipe) {
    try {
      categoryList.value = categories?.value;
      recipe.value = myRecipe.value?.recipe?.[0];
      title.value = recipe.value?.title;
      description.value = recipe.value?.description;
      image1.value = recipe.value?.image1;
      image2.value = recipe.value?.image2;
      image3.value = recipe.value?.image3;
      cooking_time.value = recipe.value?.cooking_time;
      preparation_time.value = recipe.value?.preparation_time;
      category_id.value = null;
    } catch (error) {
      console.error("Error retrieving categories:", error);
    }
  }
});

const showAlert = ref(false);
const { mutate } = useMutation(UPDATE_RECIPE);

const updateRecipe = async () => {
  try {
    const response = await mutate({
      id: recipe_id,
      title: title.value,
      category_id: category_id.value,
      description: description.value,
      image1: image1.value,
      image2: image2.value,
      image3: image3.value,
      cooking_time: cooking_time.value,
      preparation_time: preparation_time.value,
    });

    const id = response.data.update_recipe.returning[0].id;
    // alert("recipe added successfully!");
    router.push("/recipedetails/" + id);

    title.value = "";
    description.value = "";
    image1.value = "";
    image2.value = "";
    image3.value = "";
    cooking_time.value = "";
    cooking_time.value = "";
    category_id.value = null;
  } catch (error) {
    console.error("Error adding recipe:", error);
  }
};
</script>
