<template>
  <div class="flex items-center justify-center h-screen bg-login-image">
    <div class="bg-gray-100 bg-opacity-90 py-8 min-h-screen flex min-w-full">
      <div
        class="max-w-xl w-full mx-auto border bg-white rounded-md mt-20 shadow-md"
      >
        <div
          v-if="!showAlert && isFormSubmitted"
          class="bg-red-100 text-red-600 py-2 px-4 mb-4 text-center font-bold rounded-md"
        >
          Invalid credentials
        </div>
        <div
          v-if="showAlert && isFormSubmitted"
          class="bg-green-100 border border-green-200 text-green-600 py-2 px-4 mb-4 text-center font-bold rounded-md"
        >
          Login successful!
        </div>
        <form @submit.prevent="loginUser" class="bg-white rounded-md p-8 my-4">
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
            <label
              for="email"
              class="block text-gray-700 text-sm font-bold mb-2"
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
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMutation } from "@vue/apollo-composable";
import {
  setAccessToken,
  getAccessToken,
  extractIdFromToken,
} from "../utils/auth";

import { LOGIN } from "../api/graphql";

const email = ref("");
const password = ref("");
const showAlert = ref(false);
const router = useRouter();
const isFormSubmitted = ref(false);
const token = getAccessToken();
const id = extractIdFromToken(token);
console.log("ID:", id);

const { mutate } = useMutation(LOGIN);
const loginUser = async () => {
  try {
    const response = await mutate({
      email: email.value,
      password: password.value,
    });

    if (response.data) {
      console.log(response.data);
      showAlert.value = true;
      setAccessToken(response.data?.Login?.token);
    }
    showAlert.value = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/");
    email.value = "";
    password.value = "";
  } catch (error) {
    console.error("Error login user:", error);
  }
  isFormSubmitted.value = true;
};
</script>

<style scoped>
.bg-login-image {
  background-image: url("../assets/images/food.png");
  background-size: cover;
  background-position: center;
}
</style>
