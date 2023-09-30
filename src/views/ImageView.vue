<template>
  <div class="mt-20 flex items-center">
    <span v-for="star in totalStars" :key="star" @click="setRating(star)">
      <svg
        v-if="star <= currentRating"
        class="star fill-yellow-400 w-6 h-6 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2L15.09 8.45L22 9.27L17.32 14.14L18.55 21L12 17.77L5.45 21L6.68 14.14L2 9.27L8.91 8.45L12 2Z"
        />
      </svg>
      <svg
        v-else
        class="star fill-gray-400 w-6 h-6 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M21 9L15.94 8.46L12 4L8.06 8.46L3 9L7.04 12.54L6 17L12 14.81L18 17L16.96 12.54L21 9Z"
        />
      </svg>
    </span>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    initialRating: {
      type: Number,
      default: 0,
    },
    totalStars: {
      type: Number,
      default: 5,
    },
  },
  setup(props) {
    const currentRating = ref(props.initialRating);

    const setRating = (rating) => {
      currentRating.value = rating;
      console.log(currentRating.value);
    };

    return {
      currentRating,
      setRating,
    };
  },
};
</script>

<style scoped></style>

<!-- <template>
  <div class="mt-20 flex items-center">
    <span v-for="star in totalStars" :key="star" @click="setRating(star)">
      <svg
        v-if="star <= currentRating"
        class="star fill-yellow-400 w-6 h-6 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2L15.09 8.45L22 9.27L17.32 14.14L18.55 21L12 17.77L5.45 21L6.68 14.14L2 9.27L8.91 8.45L12 2Z"
        />
      </svg>
      <svg
        v-else
        class="star fill-gray-400 w-6 h-6 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M21 9L15.94 8.46L12 4L8.06 8.46L3 9L7.04 12.54L6 17L12 14.81L18 17L16.96 12.54L21 9Z"
        />
      </svg>
    </span>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const totalStars = 5;
    const currentRating = ref(0);

    const setRating = (rating) => {
      currentRating.value = rating;
      console.log(currentRating.value);
    };

    return {
      totalStars,
      currentRating,
      setRating,
    };
  },
};
</script>

<style scoped></style> -->
