import gql from "graphql-tag";

export const UPDATE_LOCATION = gql`
  mutation reportLocation($lat: Float, $lng: Float, $lastOrientation: Float) {
    updateUser(
      lastLat: $lat
      lastLng: $lng
      lastOrientation: $lastOrientation
    ) {
      ok
    }
  }
`;

export const GET_DRIVERS = gql`
  query getDrivers {
    getDrivers {
      drivers {
        lastLat
        lastLng
        id
        lastOrientation
      }
    }
  }
`;

export const GET_NEW_DRIVER = gql`
  subscription getNewDriver {
    getDriver {
      id
      lastLat
      lastLng
      lastOrientation
    }
  }
`;

export const REQUEST_RIDE = gql`
  mutation requestRide(
    $pickUpLocation: String!
    $dropOffLocation: String!
    $price: Float!
    $distance: String!
    $duration: String!
    $pickUpLat: Float!
    $pickUpLng: Float!
    $dropOffLat: Float!
    $dropOffLng: Float!
  ) {
    requestRide(
      pickUpLocation: $pickUpLocation
      dropOffLocation: $dropOffLocation
      pickUpLat: $pickUpLat
      pickUpLng: $pickUpLng
      dropOffLat: $dropOffLat
      dropOffLng: $dropOffLng
      price: $price
      distance: $distance
      duration: $duration
    ) {
      ok
      ride {
        id
      }
      error
    }
  }
`;

export const GET_RIDE_REQUEST = gql`
  query getRideRequest {
    getRideRequest {
      ok
      ride {
        passenger {
          profilePhoto
        }
        pickUpLocation
        dropOffLocation
        price
      }
      error
    }
  }
`;

export const RIDE_REQUEST_SUBSCRIPTION = gql`
  subscription rideRequestsSubscription {
    rideRequest {
      pickUpLat
      pickUpLng
      dropOffLat
      dropOffLng
    }
  }
`;
