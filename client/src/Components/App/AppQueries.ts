import gql from "graphql-tag";

export const isLoggedIn = gql`
  {
    user {
      isLoggedIn @client
    }
  }
`;
