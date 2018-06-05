import gql from "graphql-tag";

export const ME = gql`
  query me {
    me {
      ok
      user {
        profilePhoto
        fullName
        phoneNumber
        email
        places {
          name
          address
        }
      }
      error
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
