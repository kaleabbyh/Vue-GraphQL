<template>
  <div>
    <div></div>
    <form @submit.prevent="insertUser">
      <input v-model="name" type="text" placeholder="Name" />
      <button type="submit">Add User</button>
    </form>
    <UserList />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import UserList from "../components/UserList.vue";
import { REGISTER_USER } from "../constants/graphql";

const fname = ref("");

const { mutate } = useMutation(REGISTER_USER);

const insertUser = async () => {
  try {
    const response = await mutate({ fname: fname.value });
    console.log("User inserted:", response);
    fname.value = "";
  } catch (error) {
    console.error("Error inserting user:", error);
  }
};
</script>
