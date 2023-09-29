import { createApp, provide, h } from "vue";
import { DefaultApolloClient, ApolloClients } from "@vue/apollo-composable";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import App from "./App.vue";
import { setContext } from "@apollo/client/link/context";
import router from "./router";
import "./assets/tailwind.css";
// import dotenv from "dotenv";

// dotenv.config();

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret":
        "FV3YGvvYSM5qACsePMZBr7YMBJqehx4jzKmFqtoRRkLVtvVMGADLo315227YEXbq",
    },
  };
});

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "https://foodrecipe-minlab.hasura.app/v1/graphql",
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});
app.use(router);
app.mount("#app");
