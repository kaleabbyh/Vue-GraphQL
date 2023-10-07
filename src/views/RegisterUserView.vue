<template>
  <div class="flex items-center justify-center h-screen bg-login-image">
    <div class="bg-gray-100 bg-opacity-90 py-8 min-h-screen flex min-w-full">
      <div
        class="max-w-xl w-full mx-auto border bg-white rounded-md mt-20 shadow-md"
      >
        <div
          v-if="showAlert"
          class="alert bg-green-100 border border-green-200 text-green-600 px-4 py-2 text-center rounded"
        >
          <p>Registration successful!</p>
        </div>
        <form @submit.prevent="insertUser" class="bg-white rounded p-8 my-4">
          <div class="mb-4">
            <label
              for="firstname"
              class="block text-gray-700 text-sm font-bold mb-2"
              >First Name</label
            >
            <input
              v-model="firstname"
              type="text"
              id="firstname"
              placeholder="Enter your firstname"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-100"
            />
          </div>

          <div class="mb-4">
            <label
              for="lastname"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Last Name</label
            >
            <input
              v-model="lastname"
              type="text"
              id="lastname"
              placeholder="Enter your lastname"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-100"
            />
          </div>
          <div class="mb-4">
            <label
              for="email"
              class="block text-gray-700 text-sm font-bold mb-2"
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
              for="password"
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
              Sign Up
            </button>
          </div>
          <p class="text-center mt-4 text-gray-600">
            Already have an account?
            <router-link to="/login" class="text-blue-500 hover:underline"
              >Login</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { REGISTER } from "../api/graphql";
import { setAccessToken } from "../utils/auth";

const firstname = ref("");
const lastname = ref("");
const email = ref("");
const password = ref("");
const showAlert = ref(false);
const router = useRouter();

const { mutate } = useMutation(REGISTER);

const insertUser = async () => {
  try {
    const response = await mutate({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
    });

    if (response.data) {
      console.log(response.data);
      setAccessToken(response.data?.Register?.token);
    }
    showAlert.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/");

    firstname.value = "";
    lastname.value = "";
    email.value = "";
    password.value = "";
  } catch (error) {
    console.error("Error inserting user:", error);
  }
};
</script>

<style scoped>
.bg-login-image {
  background-image: url("../assets/images/food.png");
  background-size: cover;
  background-position: center;
}
</style>
