import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { toast } from "react-toastify";

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      ...headers,
      "X-JWT": token || ""
    }
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      toast.error(`Unexpected error: ${message}`);
    });
  }
  if (networkError) {
    toast.error(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  defaults: {
    auth: {
      __typename: "Auth",
      isLoggedIn: Boolean(localStorage.getItem("jwt")) || false
    }
  },
  resolvers: {
    Mutation: {
      logUserOut: (_, __, { cache: localCache }) => {
        localStorage.removeItem("jwt");
        localCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: false
            }
          }
        });
        location.reload();
        return null;
      },
      logUserIn: (_, { token }, { cache: localCache }) => {
        localStorage.setItem("jwt", token);
        localCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: true
            }
          }
        });
        return null;
      }
    }
  },
  cache
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, localStateLink, authLink.concat(httpLink)]),
  cache
});

export default client;
