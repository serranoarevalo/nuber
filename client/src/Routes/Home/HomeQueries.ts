import gql from "graphql-tag";

export const UPDATE_LOCATION = gql`
  mutation reportLocation($lat: Float!, $lng: Float!) {
    updateUser(lastLat: $lat, lastLng: $lng) {
      ok
    }
  }
`;
