<script>
import { useQuery } from "@vue/apollo-composable";
import { watchEffect, computed } from "vue";
import { USERS_QUERY } from "../constants/graphql";

export default {
  setup() {
    const { result, loading, error } = useQuery(USERS_QUERY);
    const users = computed(() => result.value?.users ?? []);
    watchEffect(() => {
      if (result && result.value && result.value.users) {
        console.log(result.value.users[0].name);
      }
    });

    return {
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
</template>

<style scoped></style>
