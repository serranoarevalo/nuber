import gql from "graphql-tag";

export const ACCOUNT_QUERY = gql`
  query {
    me {
      ok
      user {
        profilePhoto
        fullName
        phoneNumber
        email
      }
      error
    }
    getPlaces {
      places {
        name
        address
        fav
      }
      ok
      error
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
