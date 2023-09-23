<script>
import { useQuery } from "@vue/apollo-composable";
import { watchEffect, computed } from "vue";
import { getUser_Query, USERS_QUERY } from "../constants/graphql";

export default {
  name: "HomeView",
  setup() {
    const { result, loading, error } = useQuery(USERS_QUERY);
    const GETUSER = useQuery(getUser_Query);

    const users = computed(() => result.value?.users ?? []);
    const user = computed(() => GETUSER.result.value?.users ?? []);

    watchEffect(() => {
      if (result && result.value && result.value.users) {
        console.log(result.value.users[0].name);
      }
    });

    return {
      user,
      users,
      result,
      loading,
      error,
    };
  },
};
</script>

<template>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <p v-else v-for="user in users" :key="user.id">
    {{ user.name }}
  </p>
  {{ user }}
</template>

<style scoped></style>
