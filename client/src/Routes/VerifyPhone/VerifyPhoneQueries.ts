import gql from "graphql-tag";

export const VERIFY_KEY = gql`
  mutation completePhoneSignIn($key: String!, $phone: String!) {
    completePhoneSignIn(key: $key, phone: $phone) {
      ok
      token
      error
    }
  }
`;
