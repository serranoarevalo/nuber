import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

// import { withFilter } from "graphql-yoga";
// import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

// import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    getDrivers: {
      subscribe: makeMiddleware(authMiddleware, (_, __, { req, pubsub }) => {
        return pubsub.asyncIterator("newDriver");
      })
    }
  }
};

export default resolvers;
