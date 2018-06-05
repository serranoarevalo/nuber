import gql from "graphql-tag";

export const PLACES = gql`
  query getPlaces {
    getPlaces {
      places {
        name
        address
        fav
      }
    }
  }
`;
