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

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import UserList from "../components/UserList.vue";
import { ADD_USER } from "../constants/graphql";

export default {
  components: { UserList },
  setup() {
    const name = ref("");

    const { mutate } = useMutation(ADD_USER);

    const insertUser = async () => {
      try {
        const response = await mutate({ name: name.value });
        console.log("User inserted:", response);
        name.value = "";
      } catch (error) {
        console.error("Error inserting user:", error);
      }
    };

    return {
      name,
      insertUser,
    };
  },
};
</script>
