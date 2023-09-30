<template>
  <div>
    <div class="rating mt-2 flex items-center">
      <span class="text-gray-500">Rating:</span>
      <span
        v-for="star in totalStars"
        :key="star"
        @click="token ? setRating(star) : ''"
      >
        <svg
          v-if="star <= currentRating"
          class="star fill-green-400 w-6 h-6 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L15.09 8.45L22 9.27L17.32 14.14L18.55 21L12 17.77L5.45 21L6.68 14.14L2 9.27L8.91 8.45L12 2Z"
          />
        </svg>
        <svg
          v-else
          class="star fill-green-200 w-6 h-6 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 9L15.94 8.46L12 4L8.06 8.46L3 9L7.04 12.54L6 17L12 14.81L18 17L16.96 12.54L21 9Z"
          />
        </svg>
      </span>
    </div>
    <div
      v-if="shouldDisplayCommentSection"
      class="comment flex items-center mt-2"
    >
      <textarea
        v-model="ingredientSearch"
        type="text"
        placeholder="comment (optional)"
        class="px-4 py-1 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-blue-500"
      />

      <button
        @click="saveRating"
        class="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md"
      >
        comment
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getToken } from "../utils/auth";

const props = defineProps({
  initialRating: {
    type: Number,
    default: 0,
  },
  totalStars: {
    type: Number,
    default: 5,
  },
});

const token = ref(null);
token.value = getToken();
const currentRating = ref(props.initialRating);
const shouldDisplayCommentSection = computed(() => currentRating.value > 1);

const setRating = (rating) => {
  currentRating.value = rating;
};

const saveRating = () => {
  console.log(currentRating.value);
};
</script>

<style scoped></style>
