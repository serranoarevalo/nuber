import gql from "graphql-tag";

export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const GET_PLACES = gql`
  query {
    getPlaces {
      places {
        name
        address
        fav
      }
    }
  }
`;

export const ME = gql`
  query me {
    me {
      ok
      user {
        fullName
        firstName
        lastName
        phoneNumber
        email
        profilePhoto
        verifiedPhoneNumber
      }
      error
    }
  }
`;
