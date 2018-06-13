import gql from "graphql-tag";

export const UPDATE_LOCATION = gql`
  mutation reportLocation($lat: Float!, $lng: Float!) {
    uptateUser(lastLat: $lat, lastLng: $lng)
  }
`;
