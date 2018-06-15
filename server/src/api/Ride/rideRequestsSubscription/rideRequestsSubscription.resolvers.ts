import { withFilter } from "graphql-yoga";

const resolvers = {
  Subscription: {
    rideRequest: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator("newRide"),
        (payload, __, { rawReq }) => {
          const {
            connection: {
              context: { currentUser }
            }
          } = rawReq;
          const { lastLat, lastLng } = currentUser;
          const {
            rideRequest: { pickUpLat, pickUpLng }
          } = payload;
          return (
            pickUpLat >= lastLat - 0.05 &&
            pickUpLat <= lastLat + 0.05 &&
            pickUpLng >= lastLng - 0.05 &&
            pickUpLng <= lastLng + 0.05
          );
        }
      )
    }
  }
};

export default resolvers;
