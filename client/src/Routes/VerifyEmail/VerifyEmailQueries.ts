import gql from "graphql-tag";

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($key: String!) {
    verifyEmail(key: $key) {
      ok
      error
    }
  }
`;
