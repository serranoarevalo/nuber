import gql from "graphql-tag";

export const ADD_PLACE = gql`
  mutation addPlace(
    $address: String!
    $name: String!
    $lat: String!
    $long: String!
    $fav: Boolean!
  ) {
    addPlace(
      address: $address
      name: $name
      lat: $lat
      long: $long
      fav: $fav
    ) {
      ok
      place
      error
    }
  }
`;
