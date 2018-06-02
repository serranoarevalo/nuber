import gql from "graphql-tag";

export const ME = gql`
  mutation me {
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
