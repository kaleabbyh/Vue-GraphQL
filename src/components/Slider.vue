<template>
  <div class="mb-10">
    <div class="relative">
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

      <img
        :src="mainImage || placeholderImage"
        alt="Main Image"
        class="w-full rounded-lg mb-2"
      />
    </div>
    <div
      class="thumbnail-container h-20 w-full flex justify-between gap-2 p-1 bg-gray-200"
    >
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
import PreviousIcon from "@/assets/images/Previous.png";
import NextIcon from "@/assets/images/next.png";
import FoodImage from "@/assets/images/food.png";
import FoodImage2 from "@/assets/images/food2.png";

export default {
  name: "ImageCard",
  data() {
    return {
      mainImage: "",
      thumbnailImages: [FoodImage, FoodImage2, FoodImage],
      placeholderImage: FoodImage,
      currentIndex: 0,
    };
  },
  methods: {
    selectThumbnail(index) {
      this.mainImage = this.thumbnailImages[index];
      this.currentIndex = index;
    },
    selectPreviousImage() {
      this.currentIndex =
        (this.currentIndex - 1 + this.thumbnailImages.length) %
        this.thumbnailImages.length;
      this.mainImage = this.thumbnailImages[this.currentIndex];
    },
    selectNextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.thumbnailImages.length;
      this.mainImage = this.thumbnailImages[this.currentIndex];
    },
  },
};
</script>

<style>
.icon {
  z-index: 1;
}
</style>
