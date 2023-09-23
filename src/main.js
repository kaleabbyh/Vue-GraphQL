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

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret":
        "mnPUv2pIIEEoT3I6OBsIIUNLwwCRFZigB0tE8u21tRLKrGaezoIg2I3d8QSBc7vH",
    },
  };
});

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "https://kaleab.hasura.app/v1/graphql",
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
