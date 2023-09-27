<template>
  <nav class="bg-white shadow-lg fixed w-full z-10">
    <div class="container mx-auto px-6 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <router-link to="/" class="ml-2">
            <img
              class="h-8 md:h-12"
              src="../assets/images/recipe-logo.png"
              alt="Logo"
              style="width: auto"
          /></router-link>
        </div>
        <div class="flex items-center">
          <div class="hidden md:flex items-center">
            <router-link
              class="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md"
              to="/"
              >Home</router-link
            >
            <a
              class="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md"
              href="#"
              >Recipes</a
            >
            <router-link
              class="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md"
              to="/aboutus"
              >About</router-link
            >
            <router-link
              class="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md"
              to="/contactus"
              >Contact</router-link
            >

            <router-link
              class="text-lg font-semibold text-indigo-900 hover:text-gray-600 px-3 py-2 rounded-md"
              to="/login"
            >
              <img
                src="../assets/images/person.png"
                alt="Image"
                class="w-6 h-6"
              />
            </router-link>
            <router-link
              class="text-lg font-semibold text-indigo-900 hover:text-gray-600 px-3 py-2 rounded-md"
              to="/profile/1"
            >
              profile
            </router-link>
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
        <a
          class="block text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md"
          href="#"
          >Home</a
        >
        <a
          class="block text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md"
          href="#"
          >Recipes</a
        >
        <a
          class="block text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md"
          href="#"
          >About</a
        >
        <a
          class="block text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md"
          href="#"
          >Contact</a
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      showMobileMenu: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
  },
};
</script>

<style>
/* Add custom styles here if needed */
</style>
