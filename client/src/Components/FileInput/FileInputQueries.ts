import gql from "graphql-tag";

export const SIGN_S3_URL = gql`
  mutation signS3URL($fileName: String!, $fileType: String!) {
    signS3URL(fileName: $fileName, fileType: $fileType) {
      ok
      signedUrl
      fileUrl
      error
    }
  }
`;
