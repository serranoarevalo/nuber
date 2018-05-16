import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import Ride from "../../../entities/Ride";

interface IArgs {
  rideId: number;
}

const resolvers: Resolvers = {
  Query: {
    getRide: makeMiddleware(authMiddleware, async (_, args: IArgs, { req }) => {
      const ride: Ride = await Ride.findOne({ id: args.rideId });
      if (ride) {
        return {
          ok: true,
          ride,
          error: null
        };
      } else {
        return {
          ok: false,
          ride: null,
          error: "Couldn't find ride"
        };
      }
    })
  }
};

export default resolvers;
