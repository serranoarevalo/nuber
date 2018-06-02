import gql from "graphql-tag";

export const ME = gql`
  query me {
    me {
      ok
      user {
        firstName
        lastName
        phoneNumber
        email
      }
      error
    }
  }
`;
