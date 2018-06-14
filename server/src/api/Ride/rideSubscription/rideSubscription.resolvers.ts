import { withFilter } from "graphql-yoga";

const resolvers = {
  Subscription: {
    getRide: {
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
            getRide: { pickUpCoords }
          } = payload;
          return (
            lastLat >= pickUpCoords.lat - 0.05 &&
            lastLat <= pickUpCoords.lat + 0.05 &&
            lastLng >= pickUpCoords.lng - 0.05 &&
            lastLng <= pickUpCoords.lng + 0.05
          );
        }
      )
    }
  }
};

export default resolvers;
