<template>
  <div class="my-4">
    <input type="file" ref="fileInput" @change="uploadImage" />
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const selectedFile = ref(null);
const emit = defineEmits(["imageUploaded"]);

const uploadImage = async (event) => {
  selectedFile.value = event.target.files[0];

  const cloudName = "dqljcai0w";
  const uploadPreset = "kal-upload";

  const formData = new FormData();
  formData.append("file", selectedFile.value);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log("Upload successful. Image URL:", data?.secure_url);

    // Emit the imageUploaded event with the URL
    emit("imageUploaded", data.secure_url);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
</script>

<style scoped></style>
