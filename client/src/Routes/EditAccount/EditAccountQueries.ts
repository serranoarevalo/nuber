import gql from "graphql-tag";

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
