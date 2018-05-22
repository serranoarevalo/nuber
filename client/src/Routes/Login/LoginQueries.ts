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

export const GET_USER = gql`
  query user {
    user @client {
      isLoggedIn
    }
  }
`;

export const LOG_USER_IN = gql`
  mutation {
    logUserIn @client
  }
`;
