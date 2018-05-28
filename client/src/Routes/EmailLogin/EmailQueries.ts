import gql from "graphql-tag";

export const EMAIL_LOGIN = gql`
  mutation emailLogin($email: String!, $password: String!) {
    emailSignIn(email: $email, password: $password) {
      ok
      token
      error
    }
  }
`;
