import gql from "graphql-tag";

export const ADD_PLACE = gql`
  mutation addPlace(
    $address: String!
    $name: String!
    $lat: Float!
    $lng: Float!
    $fav: Boolean!
  ) {
    addPlace(address: $address, name: $name, lat: $lat, lng: $lng, fav: $fav) {
      ok
      place {
        id
        name
        address
        fav
      }
      error
    }
  }
`;
