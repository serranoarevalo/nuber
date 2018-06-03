import ApolloClient, { Operation } from "apollo-boost";

const client = new ApolloClient({
  clientState: {
    defaults: {
      user: {
        __typename: "User",
        isLoggedIn: localStorage.getItem("jwt") === null ? false : true
      }
    },
    resolvers: {
      Mutation: {
        logUserOut: (_, __, { cache }) => {
          localStorage.removeItem("jwt");
          cache.writeData({
            data: {
              user: {
                __typename: "User",
                isLoggedIn: false
              }
            }
          });
          location.reload();
          return null;
        },
        logUserIn: (_, { token }, { cache }) => {
          localStorage.setItem("jwt", token);
          cache.writeData({
            data: {
              user: {
                __typename: "User",
                isLoggedIn: true
              }
            }
          });
          return null;
        }
      }
    }
  },
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        "X-JWT": localStorage.getItem("jwt") || ""
      }
    });
  },
  uri: "http://localhost:4000/graphql"
});

export default client;
