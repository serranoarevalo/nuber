import { gql } from "apollo-boost";

const isLoggedIn = gql`
  {
    user {
      isLoggedIn @client
    }
  }
`;

export default isLoggedIn;
