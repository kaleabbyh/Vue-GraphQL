<template>
  <div class="recipe-registration py-20 md:py-32">
    <h1 class="text-2xl text-center font-semibold">Add Recipe</h1>
    <form
      @submit.prevent="addRecipe"
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

      <div class="mb-6">
        <label for="image1" class="block font-medium mb-1"
          >Image One:
          <span class="px-2 text-gray-500 text-xs mt-1">
            Please ensure the image size is less than or equal to 1MB.
          </span></label
        >
        <div class="w-full px-2 border border-gray-300 rounded">
          <ImageUpload
            class="max-w-lg mx-auto"
            @imageUploaded="uploadedImage1"
          />
        </div>
      </div>
      <div class="mb-6">
        <label for="image1" class="block font-medium mb-1"
          >Image Two:
          <span class="px-2 text-gray-500 text-xs mt-1">
            Please ensure the image size is less than or equal to 1MB.
          </span></label
        >
        <div class="w-full px-2 border border-gray-300 rounded">
          <ImageUpload
            class="max-w-lg mx-auto"
            @imageUploaded="uploadedImage2"
          />
        </div>
      </div>
      <div class="mb-6">
        <label for="image1" class="block font-medium mb-1"
          >Image Three:
          <span class="px-2 text-gray-500 text-xs mt-1">
            Please ensure the image size is less than or equal to 1MB.
          </span></label
        >
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
        Add Recipe
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { getToken } from "../utils/auth";
import { ADD_RECIPE, GET_CATEGORIES } from "../api/graphql";
import ImageUpload from "@/components/ImageUpload.vue";

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

const token = ref(null);
const isAuthenticated = ref(false);
token.value = getToken();
let user_id = token.value;

const { result } = useQuery(GET_CATEGORIES);
const categories = computed(() => result.value?.category);

const categoryList = ref([]);

watchEffect(() => {
  if (categories.value) {
    try {
      categoryList.value = categories.value;
      isAuthenticated.value = user_id ? true : false;
    } catch (error) {
      console.error("Error retrieving categories:", error);
    }
  }
});

const showAlert = ref(false);
const router = useRouter();
const { mutate } = useMutation(ADD_RECIPE);

const addRecipe = async () => {
  try {
    const response = await mutate({
      title: title.value,
      category_id: category_id.value,
      user_id: user_id,
      description: description.value,
      image1: image1.value,
      image2: image2.value,
      image3: image3.value,
      cooking_time: cooking_time.value,
      preparation_time: preparation_time.value,
    });

    const id = response.data.insert_recipe.returning[0].id;
    alert("recipe added successfully!");
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
