// import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    getDrivers: {
      subscribe: (_, __, { rawReq, pubsub }) => {
        console.log(rawReq);
        return pubsub.asyncIterator("newDriver");
      }
    }
  }
};

export default resolvers;
