import gql from "graphql-tag";

export const ADD_PHONE = gql`
  mutation addPhone($phoneNumber: String!) {
    addPhone(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;
