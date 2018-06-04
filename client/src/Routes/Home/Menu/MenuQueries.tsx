import gql from "graphql-tag";

export const ME = gql`
  query me {
    me {
      ok
      user {
        fullName
        profilePhoto
        verifiedPhoneNumber
      }
    }
  }
`;
