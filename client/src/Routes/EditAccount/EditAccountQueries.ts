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
        profilePhoto
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
    $profilePhoto: String
  ) {
    updateUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      password: $password
      profilePhoto: $profilePhoto
    ) {
      ok
      error
      user {
        firstName
        lastName
        phoneNumber
        email
        profilePhoto
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
    profilePhoto
  }
`;
