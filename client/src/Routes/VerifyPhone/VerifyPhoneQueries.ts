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

export const CONFIRM_PHONE = gql`
  mutation verifyPhone($key: String!) {
    verifyPhone(key: $key) {
      ok
      error
    }
  }
`;

export const USER_FRAGMENT = gql`
  fragment userPhone on User {
    verifiedPhoneNumber
    phoneNumber
  }
`;
