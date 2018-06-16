import { withFilter } from "graphql-yoga";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    rideUpdate: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator("rideUpdate"),
        (payload, __, { rawReq }) => {
          const user: User = rawReq.connection.context;

          const ride: Ride = payload;

          const { driver, passenger } = ride;

          return user.id === driver.id || user.id === passenger.id;
        }
      )
    }
  }
};

export default resolvers;
