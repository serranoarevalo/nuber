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

export const UPDATE_ACCOUNT = gql`
  mutation updateUser(
    $email: String
    $firstName: String
    $lastName: String
    $phoneNumber: String
    $password: String
  ) {
    updateUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      password: $password
    ) {
      ok
      error
      user {
        firstName
        lastName
        phoneNumber
        email
      }
    }
  }
`;

export const USER_FRAGMENT = gql`
  fragment user on User {
    firstName
    lastName
    phoneNumber
    email
  }
`;
