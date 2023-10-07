<template>
  <div class="mb-10 max-w-lg">
    <div class="relative">
      <!-- Previous and Next icons -->
      <img
        src="@/assets/images/Previous.png"
        alt="Left Icon"
        class="icon left-icon absolute top-1/2 left-0 w-8 h-8 transform -translate-y-1/2 cursor-pointer"
        @click="selectPreviousImage"
      />
      <img
        src="@/assets/images/next.png"
        alt="Right Icon"
        class="icon right-icon absolute top-1/2 right-0 w-8 h-8 transform -translate-y-1/2 cursor-pointer"
        @click="selectNextImage"
      />

      <!-- Main Image -->
      <img
        :src="mainImage || placeholderImage"
        alt="Main Image"
        class="w-full max-h-96 rounded-lg mb-2"
      />
    </div>
    <div
      class="thumbnail-container h-20 w-full flex justify-between gap-2 p-1 bg-gray-200"
    >
      <!-- Thumbnail Images -->
      <img
        v-for="(image, index) in thumbnailImages"
        :key="index"
        :src="image"
        alt="Thumbnail Image"
        class="thumbnail w-full object-cover cursor-pointer"
        @click="selectThumbnail(index)"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import FoodImage from "@/assets/images/foodicon.png";

export default {
  name: "Slider",
  props: {
    mainImage: {
      type: String,
      required: true,
    },
    thumbnailImages: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const mainImage = ref(props.mainImage);
    const placeholderImage = FoodImage;
    const currentIndex = ref(0);

    const selectThumbnail = (index) => {
      currentIndex.value = index;
      mainImage.value = props.thumbnailImages[index];
    };

    const selectPreviousImage = () => {
      currentIndex.value =
        (currentIndex.value - 1 + props.thumbnailImages.length) %
        props.thumbnailImages.length;
      mainImage.value = props.thumbnailImages[currentIndex.value];
    };

    const selectNextImage = () => {
      currentIndex.value =
        (currentIndex.value + 1) % props.thumbnailImages.length;
      mainImage.value = props.thumbnailImages[currentIndex.value];
    };

    watch(
      () => props.mainImage,
      (newMainImage) => {
        mainImage.value = newMainImage;
      }
    );

    return {
      mainImage,
      placeholderImage,
      currentIndex,
      selectThumbnail,
      selectPreviousImage,
      selectNextImage,
    };
  },
};
</script>

<style>
.icon {
  z-index: 1;
}
</style>
