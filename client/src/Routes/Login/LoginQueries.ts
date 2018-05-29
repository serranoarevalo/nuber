import gql from "graphql-tag";

export const FACEBOOK_CONNECT = gql`
  mutation facebookConnect(
    $email: String
    $firstName: String!
    $lastName: String!
    $userID: String!
  ) {
    facebookConnect(
      email: $email
      firstName: $firstName
      lastName: $lastName
      userID: $userID
    ) {
      ok
      token
      error
    }
  }
`;

export const REQUEST_PHONE_SIGNIN = gql`
  mutation phoneSignIn($phoneNumber: String!) {
    requestPhoneSignIn(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;
