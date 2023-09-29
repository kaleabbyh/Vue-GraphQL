<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <button @click="uploadImage">Upload Image</button>
    <div v-if="images.length > 0">
      <h3>Images:</h3>
      <ul>
        <li v-for="image in images" :key="image.id">
          <img :src="image.imgUrl" alt="Image" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default {
  name: "ImageUploader",
  setup() {
    const file = ref(null);
    const images = ref([]);

    const { result: imagesResult } = useQuery(gql`
      query MyQuery {
        images {
          id
          imgUrl
        }
      }
    `);

    const { mutate: uploadImageMutation } = useMutation(gql`
      mutation UploadImage($file: Upload!) {
        uploadImage(file: $file) {
          id
          imgUrl
        }
      }
    `);

    const handleFileChange = (event) => {
      file.value = event.target.files[0];
    };

    const uploadImage = async () => {
      if (file.value) {
        const response = await uploadImageMutation({ file: file.value });
        const uploadedImage = response.data.uploadImage;
        images.value.push(uploadedImage);
        file.value = null;
      }
    };

    const handleImagesResult = () => {
      if (imagesResult.value && imagesResult.value.data) {
        images.value = imagesResult.value.data.images;
      }
    };

    handleImagesResult();

    return {
      handleFileChange,
      uploadImage,
      images,
    };
  },
};
</script>
