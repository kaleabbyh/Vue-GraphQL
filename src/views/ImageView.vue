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
    console.log("Upload successful. Image URL:", data.secure_url);

    // Emit the imageUploaded event with the URL
    emit("imageUploaded", data.secure_url);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
</script>

<style scoped></style>

<!-- <template>
  <div class="mt-20">
    <input type="file" ref="fileInput" @change="handleFileUpload" />
    <button @click="uploadImage">Upload</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const selectedFile = ref(null);

function handleFileUpload(event) {
  selectedFile.value = event.target.files[0];
}

const uploadImage = async () => {
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
    console.log("Upload successful. Image URL:", data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
</script>

<style scoped></style> -->

<!-- <template>
  <div class="mt-20">
    images
    <div>
      <button @click="openUplaodWidget()">uplaod</button>
    </div>
  </div>
</template>

<script setup>
const widget = window.cloudniary.createUploadWidget(
  { cloud_name: "dqljcai0w", upload_preset: "kal-upload" },
  (error, result) => {
    if (!error && result) {
      console.log(result);
    } else {
      console.log(error);
    }
    console.log(error);
  }
);
function openUplaodWidget() {
  widget.open();
}
</script>

<style scoped></style> -->
