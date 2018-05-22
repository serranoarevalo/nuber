import ApolloClient, { Operation } from "apollo-boost";
import { ApolloCache } from "apollo-cache";

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
        logUserIn: (
          { parent }: { parent: any },
          { isLoggedIn }: { isLoggedIn: boolean },
          { cache }: { cache: ApolloCache<any> }
        ) => {
          cache.writeData({
            data: { user: { __typename: "User", isLoggedIn } }
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
