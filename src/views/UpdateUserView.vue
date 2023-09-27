<template>
  <div class="flex items-center justify-center h-screen bg-login-image mt-20">
    <div
      class="max-w-xl w-full mx-4 border bg-white border-blue-100 rounded-md shadow-md"
    >
      <form @submit.prevent="updateUser" class="bg-white rounded p-8 my-4">
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
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
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
            update profile
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
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter, useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { watchEffect, computed } from "vue";
import { UPDATE_USER, getUser_Query } from "../constants/graphql";

export default {
  //   components: { UserList },
  setup() {
    const firstname = ref("");
    const lastname = ref("");
    const email = ref("");
    const password = ref("");

    const route = useRoute();
    const router = useRouter();
    const userId = route.params.id;

    const { mutate } = useMutation(UPDATE_USER);

    const { result, loading, error } = useQuery(getUser_Query);
    const user = computed(() => result.value?.user[0]);
    watchEffect(() => {
      if (user.value) {
        try {
          const response = user.value;
          firstname.value = response.firstname;
          lastname.value = response.lastname;
          email.value = response.email;
          password.value = response.password;
          console.log(user.value);
        } catch (error) {
          console.error("Error retrieving user:", error);
        }
      }
    });

    const updateUser = async () => {
      try {
        const response = await mutate({
          id: userId,
          firstname: firstname.value,
          lastname: lastname.value,
          email: email.value,
          password: password.value,
        });
        console.log("User inserted:", response);

        alert("user updated successful!");
        router.push({ path: "/profile/" + userId });

        firstname.value = "";
        lastname.value = "";
        email.value = "";
        password.value = "";
      } catch (error) {
        console.error("Error inserting user:", error);
      }
    };

    return {
      firstname,
      lastname,
      email,
      password,
      updateUser,
    };
  },
};
</script>

<style scoped>
.bg-login-image {
  background-image: url("../assets/images/food.png");
  background-size: cover;
  background-position: center;
}
</style>
