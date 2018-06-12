import gql from "graphql-tag";

export const TOGGLE_DRIVING = gql`
  mutation toggleDriving($isDriving: Boolean) {
    updateUser(isDriving: $isDriving) {
      ok
      error
      user {
        isDriving
      }
    }
  }
`;
