import { withFilter } from "graphql-yoga";

// import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    getDriver: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator("newDriver"),
        (payload, __, { rawReq }) => {
          const {
            connection: {
              context: { currentUser }
            }
          } = rawReq;
          const { lastLat, lastLng } = currentUser;
          const {
            getDriver: { lastLat: driverLat, lastLng: driverLng }
          } = payload;
          return (
            driverLat >= lastLat - 0.05 &&
            driverLat <= lastLat + 0.05 &&
            driverLng >= lastLng - 0.05 &&
            driverLng <= lastLng + 0.05
          );
        }
      )
    }
  }
};

export default resolvers;
