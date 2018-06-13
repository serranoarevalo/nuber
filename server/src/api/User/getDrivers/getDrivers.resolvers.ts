import { withFilter } from "graphql-yoga";
// import User from "../../../entities/User";
// import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

const resolvers = {
  Subscription: {
    getDrivers: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator("newDriver"),
        () => true
      )
    }
  }
};

export default resolvers;
