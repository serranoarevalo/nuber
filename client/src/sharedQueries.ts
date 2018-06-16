import gql from "graphql-tag";

export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const GET_PLACES = gql`
  query {
    getPlaces {
      places {
        id
        name
        address
        fav
      }
    }
  }
`;

export const ME = gql`
  query me {
    me {
      ok
      user {
        id
        fullName
        firstName
        lastName
        phoneNumber
        email
        profilePhoto
        verifiedPhoneNumber
        isDriving
        currentRideId
      }
      error
    }
  }
`;

export const RIDE_EVENTS_SUBSCRIPTION = gql`
  subscription rideUpdate {
    rideUpdate {
      status
    }
  }
`;

export const UPDATE_RIDE = gql`
  mutation updateRide(
    $rideId: Int!
    $status: String!
    $driverRating: Float
    $passengerRating: Float
    $driverId: Int
  ) {
    updateRide(
      rideId: $rideId
      status: $status
      driverRating: $driverRating
      passengerRating: $passengerRating
      driverId: $driverId
    ) {
      ok
    }
  }
`;

export const GET_RIDE = gql`
  query getRide($rideId: Int, $skip: Boolean!) {
    getRide(rideId: $rideId) @skip(if: $skip) {
      ok
      error
      ride {
        id
        passenger {
          profilePhoto
          fullName
          email
          phoneNumber
        }
        driver {
          profilePhoto
          fullName
          email
          phoneNumber
        }
        price
        pickUpLocation
        dropOffLocation
        price
      }
      isDriver
    }
  }
`;
