// import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    getDrivers: {
      resolve: (payload, _, context) => {
        const {
          rawReq: {
            connection: {
              context: { currentUser }
            }
          }
        } = context;
        console.log(payload, currentUser);
        return payload;
      },
      subscribe: (_, __, { rawReq, pubsub }) => {
        return pubsub.asyncIterator("newDriver");
      }
    }
  }
};

export default resolvers;
