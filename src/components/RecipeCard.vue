<template>
  <div
    class="bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
  >
    <img
      :src="recipe.image1"
      :alt="recipe.title"
      class="w-full h-48 object-cover rounded-t-lg"
    />
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">{{ recipe.title }}</h2>
      <p class="text-gray-600 mb-4">
        {{
          recipe.description?.length > 100
            ? recipe.description?.slice(0, 100) + "..."
            : recipe.description
        }}
      </p>
      <div class="flex items-center justify-between mb-4">
        <button class="text-blue-500 hover:underline" @click="toggleBookmark">
          {{ isBookmarked ? "Unbookmark" : "Bookmark" }}
        </button>
        <div>
          <select class="mr-2" v-model="selectedRating" @change="rateRecipe">
            <option value="" disabled>Select Rating</option>
            <option v-for="rating in ratings" :key="rating" :value="rating">
              {{ rating }}
            </option>
          </select>
          <button
            class="text-blue-500 hover:underline"
            @click="openCommentModal"
          >
            Comment
          </button>
        </div>
      </div>
      <router-link
        :to="`/recipedetails/${recipe.id}`"
        class="text-blue-500 hover:underline"
        >Read More</router-link
      >
    </div>
  </div>
</template>

<script setup>
const { recipe } = defineProps(["recipe"]);
</script>

<style lang="scss" scoped></style>
