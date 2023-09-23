<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="max-w-xl w-full mx-4 border border-blue-100 rounded-md shadow-md"
    >
      <form @submit.prevent="submitForm" class="bg-white rounded p-8 my-4">
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

<script>
export default {
  // Component code...
};
</script>
