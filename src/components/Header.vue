<template>
  <nav class="bg-white shadow-lg py-3 fixed w-full z-10">
    <div class="mx-4 py-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <router-link to="/" class="ml-2">
            <img
              class="h-6 md:h-10"
              src="../assets/images/recipe-logo.png"
              alt="Logo"
              style="width: auto"
            />
          </router-link>
        </div>
        <div class="flex items-center">
          <div class="hidden md:flex items-center">
            <router-link
              class="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md"
              to="/"
              >Home</router-link
            >
            <router-link
              class="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md"
              to="/recipes"
              >Recipes</router-link
            >
            <router-link
              class="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md"
              to="/categories"
              >Categories</router-link
            >
            <router-link
              class="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md"
              to="/contactus"
              >Contact</router-link
            >
            <router-link
              class="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md"
              to="/aboutus"
              >About</router-link
            >

            <router-link
              to="/login"
              v-if="!isLoggedIn"
              class="text-lg font-semibold text-indigo-900 hover:text-gray-600 px-3 py-2 rounded-md"
            >
              login
            </router-link>
            <div v-if="isLoggedIn" class="relative">
              <button
                @click="toggleDropdown"
                class="text-lg font-semibold text-indigo-900 hover:text-gray-600 px-3 py-2 rounded-md"
              >
                <img
                  src="../assets/images/person.png"
                  alt="Image"
                  class="w-6 h-6"
                />
              </button>
              <div
                v-show="showDropdown"
                @click.away="showDropdown = false"
                class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-20"
              >
                <!-- Dropdown content here -->
                <router-link
                  :to="`/profile/${id}`"
                  class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </router-link>
                <router-link
                  :to="`/profile/${id}`"
                  class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </router-link>
                <a
                  @click="logout"
                  class="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
          <div class="md:hidden">
            <button
              @click="toggleMobileMenu"
              class="text-gray-800 hover:text-gray-600 focus:outline-none block md:hidden"
            >
              <div>
                <div v-if="!showMobileMenu">
                  <img
                    class="h-6 w-auto"
                    src="../assets/images/menu.png"
                    alt="Logo"
                  />
                </div>
                <div v-else>
                  <img
                    class="h-6 w-auto"
                    src="../assets/images/close.png"
                    alt="Logo"
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div v-if="showMobileMenu" class="md:hidden mt-3">
        <router-link
          @click="toggleMobileMenu"
          class="block text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md"
          to="/"
          >Home</router-link
        >
        <router-link
          @click="toggleMobileMenu"
          class="block text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md"
          to="/recipes"
          >Recipes</router-link
        >

        <router-link
          @click="toggleMobileMenu"
          class="block text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md"
          to="/categories"
          >Categories</router-link
        >

        <router-link
          @click="toggleMobileMenu"
          class="block text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md"
          to="/aboutus"
          >About</router-link
        >
        <router-link
          @click="toggleMobileMenu"
          class="block text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md"
          to="/contactus"
          >Contact</router-link
        >

        <router-link
          @click="toggleMobileMenu"
          to="/login"
          v-if="!isLoggedIn"
          class="text-lg font-semibold text-indigo-900 hover:text-gray-600 px-3 py-2 rounded-md"
        >
          Login
        </router-link>
        <div v-if="isLoggedIn" class="relative">
          <button
            @click="toggleDropdown"
            class="block text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md"
          >
            <img
              src="../assets/images/person.png"
              alt="Image"
              class="w-6 h-6"
            />
          </button>
          <div
            v-show="showDropdown"
            @click.away="showDropdown = false"
            class="block text-gray-800 mr-10 bg-indigo-100 hover:text-gray-600 px-4 py-2 rounded-md"
          >
            <!-- Dropdown content here -->
            <router-link
              @click="toggleMobileMenu"
              :to="`/profile/${id}`"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Profile
            </router-link>
            <router-link
              @click="toggleMobileMenu"
              :to="`/profile/${id}`"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Settings
            </router-link>
            <a
              @click="logout"
              class="block px-4 py-2 cursor-pointer text-gray-800 hover:bg-gray-100"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import {
  getAccessToken,
  extractIdFromToken,
  removeAccessToken,
} from "../utils/auth";
import { useRouter } from "vue-router";

const showMobileMenu = ref(false);
const showDropdown = ref(false);
const isLoggedIn = ref(false);
//const token = ref(null);
const token = getAccessToken();
const id = ref(extractIdFromToken(token));
// console.log("ID:", id.value);

const router = useRouter();

isLoggedIn.value = getAccessToken() ? true : false;

const logout = () => {
  removeAccessToken();
  router.push("/");
  // window.location.reload();
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
</script>

<style scoped></style>
