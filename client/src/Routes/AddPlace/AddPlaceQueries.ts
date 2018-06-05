import gql from "graphql-tag";

export const ADD_PLACE = gql`
  mutation addPlace(
    $address: String!
    $name: String!
    $latlong: String!
    $fav: Boolean!
  ) {
    addPlace(address: $address, name: $name, latlong: $latlong, fav: $fav) {
      ok
      place
      error
    }
  }
`;
