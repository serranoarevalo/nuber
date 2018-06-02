import { gql } from "apollo-boost";

export const isLoggedIn = gql`
  {
    user {
      isLoggedIn @client
    }
  }
`;
