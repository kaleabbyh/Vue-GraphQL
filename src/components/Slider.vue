<template>
  <div class="card w-100 h-70 border border-gray-300 rounded overflow-hidden">
    <div class="main-image-container relative">
      <img
        src="../assets/images/Previous.png"
        alt="Left Icon"
        class="icon left-icon absolute top-1/2 left-0 w-8 h-8 transform -translate-y-1/2 cursor-pointer"
        @click="selectPreviousImage"
      />
      <img
        src="../assets/images/next.png"
        alt="Right Icon"
        class="icon right-icon absolute top-1/2 right-0 w-8 h-8 transform -translate-y-1/2 cursor-pointer"
        @click="selectNextImage"
      />

      <img
        :src="mainImage || placeholderImage"
        alt="Main Image"
        class="recipe-image object-cover rounded-lg w-full"
        style="min-width: 100%; max-width: 500px; max-height: 500px"
      />
    </div>
    <div
      class="thumbnail-container h-10 flex justify-between gap-2 p-1 bg-gray-200"
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

<style>
.icon {
  z-index: 1;
}
</style>
<script>
export default {
  name: "ImageCard",
  data() {
    return {
      mainImage: "",
      thumbnailImages: [
        "https://th.bing.com/th/id/OIP.8_GJE3mBavuXiGblgMcNvgHaLH?pid=ImgDet&rs=1",
        "https://pupswithchopsticks.com/wp-content/uploads/thai-meatballs-3.jpg",
        "https://th.bing.com/th/id/OIP.8_GJE3mBavuXiGblgMcNvgHaLH?pid=ImgDet&rs=1",
      ],
      placeholderImage:
        "https://th.bing.com/th/id/OIP.8_GJE3mBavuXiGblgMcNvgHaLH?pid=ImgDet&rs=1",
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

<style></style>
