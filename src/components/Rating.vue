<template>
  <div>
    <div class="rating mt-4 flex items-center">
      <span class="text-gray-500 pr-2">Rate:</span>
      <span
        v-for="star in totalStars"
        :key="star"
        @click="token && !isUserRatedBefore ? setRating(star) : ''"
      >
        <svg
          v-if="star <= currentRating"
          class="star fill-yellow-400 w-4 h-4 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L15.09 8.45L22 9.27L17.32 14.14L18.55 21L12 17.77L5.45 21L6.68 14.14L2 9.27L8.91 8.45L12 2Z"
          />
        </svg>
        <svg
          v-else
          class="star fill-yellow-200 w-6 h-6 cursor-pointer"
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
      v-if="shouldDisplayCommentSection && !isUserRatedBefore"
      class="comment flex items-center mt-2"
    >
      <textarea
        v-model="commentContent"
        type="text"
        placeholder="comment (optional)"
        class="px-4 py-1 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-blue-500"
      />

      <button
        @click="addRating"
        class="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md"
      >
        comment
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getAccessToken, extractIdFromToken } from "../utils/auth";
import { useMutation } from "@vue/apollo-composable";
import { ADD_RATING } from "../api/graphql";

const props = defineProps({
  initialRating: {
    type: Number,
    default: 0,
  },
  totalStars: {
    type: Number,
    default: 5,
  },
  recipe_id: {
    type: Number,
  },
  isUserRatedBefore: {
    type: Boolean,
  },
});

const token = ref(getAccessToken());
const id = extractIdFromToken(token.value);
token.value = id;

const currentRating = ref(props.initialRating);
const commentContent = ref(null);
const isUserRatedBefore = props.isUserRatedBefore;

const shouldDisplayCommentSection = computed(() => currentRating.value > 1);

const setRating = (rating) => {
  currentRating.value = rating;
};

const { mutate } = useMutation(ADD_RATING);

const addRating = async () => {
  try {
    const response = await mutate({
      value: currentRating.value,
      comment: commentContent.value,
      recipe_id: props.recipe_id,
      user_id: token.value,
    });

    console.log(response.data);
    window.location.reload();

    value.value = null;
    comment.value = "";
  } catch (error) {
    console.error("Error adding rating:", error);
  }
};
</script>

<style scoped></style>
