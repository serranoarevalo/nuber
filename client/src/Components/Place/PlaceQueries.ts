import gql from "graphql-tag";

export const TOGGLE_FAV = gql`
  mutation editPlace($id: Int!, $fav: Boolean!) {
    editPlace(placeId: $id, fav: $fav) {
      ok
      error
    }
  }
`;
