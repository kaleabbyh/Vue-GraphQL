<template>
  <div class="flex items-center justify-center h-screen bg-login-image">
    <div
      class="max-w-xl w-full mx-4 border bg-white border-blue-100 rounded-md shadow-md"
    >
      <div
        v-if="showAlert"
        class="bg-red-100 text-red-600 py-2 px-4 mb-4 text-center font-bold rounded-md"
      >
        Invalid credentials
      </div>
      <form @submit.prevent="submitForm" class="bg-white rounded-md p-8 my-4">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
            >Email</label
          >
          <input
            v-model="email"
            type="text"
            id="email"
            placeholder="Enter your email"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-100"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div class="flex justify-center">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            login
          </button>
        </div>
        <p class="text-center mt-4 text-gray-600">
          Don't have an account?
          <router-link to="/register" class="text-blue-500 hover:underline"
            >Sign up</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { setToken } from "../utils/auth";

import { GET_USER } from "../api/graphql";

const email = ref("");
const password = ref("");
const isFormSubmitted = ref(false);
const showAlert = ref(false);
const router = useRouter();

const { result, refetch } = useQuery(GET_USER);

const submitForm = () => {
  isFormSubmitted.value = true;
};

watch(
  [email, password, isFormSubmitted],
  ([newEmail, newPassword, newIsFormSubmitted]) => {
    if (newIsFormSubmitted) {
      refetch({ email: newEmail, password: newPassword }).then(() => {
        if (result.value && result.value.user.length > 0) {
          setToken(result.value.user[0].id);
          router.push("/");
        } else {
          showAlert.value = true;
        }
        isFormSubmitted.value = false; // Reset the form submission flag
      });
    }
  }
);
</script>

<style scoped>
.bg-login-image {
  background-image: url("../assets/images/food.png");
  background-size: cover;
  background-position: center;
}
</style>
